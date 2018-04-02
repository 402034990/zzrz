package com.zhiwei.credit.service.creditFlow.smallLoan.finance.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.io.StringReader;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.hurong.core.util.BeanUtil;
import com.sdicons.json.mapper.JSONMapper;
import com.sdicons.json.parser.JSONParser;
import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.ContextUtil;
import com.zhiwei.credit.action.flow.FlowRunInfo;
import com.zhiwei.credit.dao.creditFlow.finance.BpFundIntentDao;
import com.zhiwei.credit.dao.creditFlow.finance.SlFundIntentDao;
import com.zhiwei.credit.dao.creditFlow.financingAgency.PlBidPlanDao;
import com.zhiwei.credit.dao.creditFlow.fund.project.BpFundProjectDao;
import com.zhiwei.credit.dao.creditFlow.smallLoan.finance.SlEarlyRepaymentRecordDao;
import com.zhiwei.credit.dao.flow.ProDefinitionDao;
import com.zhiwei.credit.dao.flow.ProcessFormDao;
import com.zhiwei.credit.dao.flow.ProcessRunDao;
import com.zhiwei.credit.dao.system.OrganizationDao;
import com.zhiwei.credit.model.creditFlow.finance.BpFundIntent;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidPlan;
import com.zhiwei.credit.model.creditFlow.fund.project.BpFundProject;
import com.zhiwei.credit.model.creditFlow.smallLoan.finance.SlEarlyRepaymentRecord;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;
import com.zhiwei.credit.model.flow.ProDefinition;
import com.zhiwei.credit.model.flow.ProcessForm;
import com.zhiwei.credit.model.flow.ProcessRun;
import com.zhiwei.credit.model.system.AppUser;
import com.zhiwei.credit.model.system.Organization;
import com.zhiwei.credit.service.creditFlow.common.CreditProjectService;
import com.zhiwei.credit.service.creditFlow.finance.SlFundIntentService;
import com.zhiwei.credit.service.creditFlow.smallLoan.finance.SlEarlyRepaymentRecordService;
import com.zhiwei.credit.service.creditFlow.smallLoan.project.SlSmallloanProjectService;
import com.zhiwei.credit.service.flow.JbpmService;
import com.zhiwei.credit.service.flow.TaskService;

/**
 * 
 * @author 
 *
 */
public class SlEarlyRepaymentRecordServiceImpl extends BaseServiceImpl<SlEarlyRepaymentRecord> implements SlEarlyRepaymentRecordService{
	@SuppressWarnings("unused")
	private SlEarlyRepaymentRecordDao dao;
	@Resource
	private ProcessFormDao processFormDao;
	@Resource
	private CreditProjectService creditProjectService;
	@Resource
	private PlBidPlanDao plBidPlanDao;
	@Resource
	private BpFundProjectDao bpFundProjectDao;
	@Resource
	private BpFundIntentDao bpFundIntentDao;
	@Resource
	private SlFundIntentDao slFundIntentDao;
	@Resource
	private OrganizationDao organizationDao;
	@Resource
	private ProDefinitionDao proDefinitionDao;
	@Resource
	private ProcessRunDao processRunDao;
	@Resource
	private JbpmService jbpmService;
	@Resource
	private TaskService flowTaskService;
	@Resource
	private SlFundIntentService slFundIntentService;
	@Resource
	private SlSmallloanProjectService slSmallloanProjectService;
	public SlEarlyRepaymentRecordServiceImpl(SlEarlyRepaymentRecordDao dao) {
		super(dao);
		this.dao=dao;
	}
	public List<SlEarlyRepaymentRecord> getByProjectId(Long projectId) {
		return dao.getByProjectId(projectId);
	}
	@Override
	public List<SlEarlyRepaymentRecord> listByProIdAndType(Long projectId,
			String businessType) {
		
		return dao.listByProIdAndType(projectId, businessType);
	}
	@Override
	public Integer updateEarlyProjectInfoNextStep(FlowRunInfo flowRunInfo) {
		try {
			if (flowRunInfo.isBack()) {
				return 1;
			} else {
				String transitionName = flowRunInfo.getTransitionName();
				SlEarlyRepaymentRecord slEarlyRepaymentRecord=new SlEarlyRepaymentRecord();
				BeanUtil.populateEntity(flowRunInfo.getRequest(), slEarlyRepaymentRecord,"slEarlyRepaymentRecord");
				SlEarlyRepaymentRecord record=dao.get(slEarlyRepaymentRecord.getSlEarlyRepaymentId());
				if (transitionName != null && !"".equals(transitionName)) {
					Map<String, Object> vars = new HashMap<String, Object>();
					if (transitionName.contains("终止") || transitionName.contains("结束")) {
						flowRunInfo.setStop(true);
						record.setCheckStatus(3);
						dao.merge(record);
					} else {
						ProcessForm currentForm = processFormDao.getByTaskId(flowRunInfo.getTaskId());
						if (currentForm != null) {
							boolean isToNextTask = creditProjectService.compareTaskSequence(currentForm.getRunId(), currentForm.getActivityName(),transitionName);
							if (!isToNextTask) {// true表示流程正常往下流转,false则表示打回。
								flowRunInfo.setAfresh(true);// 表示打回重做
								vars.put("nextTaskAssignId", "true");// 表示为打回重做，需要设置打回的目标任务处理人
								vars.put("targetActivityName", transitionName);// 打回的目标任务名称
							}else{
								String bidPlanId=flowRunInfo.getRequest().getParameter("bidPlanId");
								String fundsJson=flowRunInfo.getRequest().getParameter("fundsJson");
								String isCheck=flowRunInfo.getRequest().getParameter("isCheck");
								String fundProjectId=flowRunInfo.getRequest().getParameter("fundProjectId");
								PlBidPlan plan=plBidPlanDao.get(Long.valueOf(bidPlanId));
								BpFundProject fundProject = bpFundProjectDao.get(Long.valueOf(fundProjectId));
								
								BeanUtil.copyNotNullProperties(record, slEarlyRepaymentRecord);
								
								if(null!=fundsJson && !fundsJson.equals("")){
									List<BpFundIntent> list=bpFundIntentDao.listbySlEarlyRepaymentId(Long.valueOf(bidPlanId),slEarlyRepaymentRecord.getSlEarlyRepaymentId());
									for(BpFundIntent f:list){
										if(f.getAfterMoney().compareTo(new BigDecimal(0))==0){
											bpFundIntentDao.remove(f);
										}
									}
									//投资人的放款收息表
									bpFundIntentDao.saveCommonFundIntent(fundsJson, plan, fundProject, Short.valueOf(isCheck));
								}
								if(transitionName.equals("完成")){
									List<BpFundIntent> list=bpFundIntentDao.listbySlEarlyRepaymentId(Long.valueOf(bidPlanId),slEarlyRepaymentRecord.getSlEarlyRepaymentId());
									for(BpFundIntent f:list){
										f.setIsCheck(Short.valueOf("0"));
										bpFundIntentDao.merge(f);
									} 
									List<BpFundIntent> flist=bpFundIntentDao.listByBidPlanId(Long.valueOf(bidPlanId));
									for(BpFundIntent bf:flist){
										if(bf.getSlEarlyRepaymentId()==null || !bf.getSlEarlyRepaymentId().toString().equals(slEarlyRepaymentRecord.getSlEarlyRepaymentId().toString())){
											if(bf.getIntentDate().compareTo(slEarlyRepaymentRecord.getEarlyDate())>0){
												bf.setIsValid(Short.valueOf("1"));
												bpFundIntentDao.merge(bf);
											}
										}
									}
									plan.setIsOtherFlow(Short.valueOf("0"));
									plBidPlanDao.merge(plan);
									record.setCheckStatus(1);
								}
								dao.merge(record);
							}
						}
					}
					vars.put("decisionResult", transitionName);
					flowRunInfo.getVariables().putAll(vars);
				}
				return 1;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	@Override
	public List allList(HttpServletRequest request, Integer start, Integer limit) {
		
		return dao.allList(request, start, limit);
	}
	@Override
	public Long allListCount(HttpServletRequest request) {
		
		return dao.allListCount(request);
	}
	@Override
	public String startSlEarlyRepaymentProcess(Long projectId) {
		String customerName = "";
		BpFundProject project = this.bpFundProjectDao.get(projectId);
		SlSmallloanProject pr = slSmallloanProjectService.get(project.getProjectId());
//		SlFundIntent  sl=slFundIntentService.get
		project.setIsOtherFlow(Short.valueOf("2"));
		AppUser user = ContextUtil.getCurrentUser();
		SlEarlyRepaymentRecord slEarlyRepaymentRecord = new SlEarlyRepaymentRecord();
		slEarlyRepaymentRecord.setProjectId(project.getId());
		slEarlyRepaymentRecord.setBusinessType(project.getBusinessType());
		slEarlyRepaymentRecord.setCheckStatus(0);
		slEarlyRepaymentRecord.setOpTime(new Date());
		slEarlyRepaymentRecord.setCreator(user.getFullname());
		this.dao.save(slEarlyRepaymentRecord);
		// 提前还款流程里面的自有资金
		project.setOwnJointMoney(pr.getProjectMoney());
		this.bpFundProjectDao.merge(project);
		FlowRunInfo newFlowRunInfo = new FlowRunInfo();
		ProDefinition pdf = null;// 流程定义key值
		// Map<String, String> mapNew =null;
		// 不能从session中获取companyId,总公司的人员为分公司启动展期流程的时候,这样获取启动的却是总公司的展期流程.
		// 而是从项目表中获取对应的companyId
		// Long companyId=ContextUtil.getLoginCompanyId();
		Long companyId = project.getCompanyId();
		Organization org = organizationDao.get(companyId);
		String isGroupVersion = AppUtil.getSystemIsGroupVersion();
		if (isGroupVersion != null && Boolean.valueOf(isGroupVersion)) {
			pdf = proDefinitionDao.getByProcessName("repaymentAheadOfTimeFlow_"
					+ org.getKey());
		} else {
			pdf = proDefinitionDao.getByProcessName("repaymentAheadOfTimeFlow");
		}

		List<ProcessRun> processRunList = processRunDao.getByProcessNameProjectId(projectId,project.getBusinessType(), project.getFlowType());
		if (processRunList != null && processRunList.size() != 0) {
			customerName = processRunList.get(0).getCustomerName();
		}
		// mapNew =
		// this.getProjectInfo(project,"repaymentAheadOfTimeFlow_"+org.getKey());
		Long branchCompanyId = pdf.getBranchCompanyId();
		Map<String, Object> newVars = new HashMap<String, Object>();
		newVars.put("projectId", project.getProjectId());
		newVars.put("fundProjectId", project.getId());
		newVars.put("slEarlyRepaymentId", slEarlyRepaymentRecord
				.getSlEarlyRepaymentId());
		newVars.put("oppositeType", project.getOppositeType());
		newVars.put("oppositeID",project.getOppositeID());
		newVars.put("businessType", project.getBusinessType());
		newVars.put("customerName", customerName); //
		newVars.put("projectNumber", project.getProjectNumber()); //
		
		newFlowRunInfo.getVariables().putAll(newVars);
		newFlowRunInfo.setBusMap(newVars);
		newFlowRunInfo.setDefId(String.valueOf(pdf.getDefId()));
		
//		
//		newFlowRunInfo.setFlowSubject(project.getProjectName() + "-"
//				+ project.getProjectNumber());
		//修改提前还款时，生成流程编号数据信息
		newFlowRunInfo.setFlowSubject(project.getProjectName());
		ProcessRun run = this.jbpmService.doStartProcess(newFlowRunInfo);
		String str = "";
		if (run != null && run.getPiId() != null) {
			str = flowTaskService.currentTaskIsStartFlowUser(run.getPiId(),user.getUserId().toString(), project.getProjectName());
		
		}
		return str;
	}
	
	public Integer savePrepaymentInfoNextStep(FlowRunInfo flowRunInfo){
		try {
			if (flowRunInfo.isBack()) {
				return 1;
			} else {
				String slEarlyRepaymentId=flowRunInfo.getRequest().getParameter("slEarlyRepaymentId");
				SlEarlyRepaymentRecord record=dao.get(Long.valueOf(slEarlyRepaymentId));
				String fundProjectId=flowRunInfo.getRequest().getParameter("fundProjectId");
				BpFundProject project=bpFundProjectDao.get(Long.valueOf(fundProjectId));
				SimpleDateFormat sd=new SimpleDateFormat("yyyy-MM-dd");
				String transitionName = flowRunInfo.getTransitionName();
				if (transitionName != null && !"".equals(transitionName)) {
					Map<String, Object> vars = new HashMap<String, Object>();
					if (transitionName.contains("终止") || transitionName.contains("结束")) {
						flowRunInfo.setStop(true);
						record.setCheckStatus(3);
						dao.merge(record);
						project.setIsOtherFlow(Short.valueOf("0"));
						bpFundProjectDao.merge(project);
					} else {
						ProcessForm currentForm = processFormDao.getByTaskId(flowRunInfo.getTaskId());
						if (currentForm != null) {
							boolean isToNextTask = creditProjectService.compareTaskSequence(currentForm.getRunId(), currentForm.getActivityName(),transitionName);
							if (!isToNextTask) {// true表示流程正常往下流转,false则表示打回。
								flowRunInfo.setAfresh(true);// 表示打回重做
								vars.put("nextTaskAssignId", "true");// 表示为打回重做，需要设置打回的目标任务处理人
								vars.put("targetActivityName", transitionName);// 打回的目标任务名称
							}else{
								Long taskSequence=creditProjectService.getOrder(currentForm.getProcessRun().getProDefinition().getDeployId(), currentForm.getActivityName());
								
								SlEarlyRepaymentRecord slEarlyRepaymentRecord=new SlEarlyRepaymentRecord();
								BeanUtil.populateEntity(flowRunInfo.getRequest(), slEarlyRepaymentRecord, "slEarlyRepaymentRecord");
								BeanUtil.copyNotNullProperties(record, slEarlyRepaymentRecord);
								if(null!=taskSequence && taskSequence>=2000){
									record.setCheckStatus(1);
									List<SlFundIntent> slist=slFundIntentDao.listByDateAndEarlyId(project.getProjectId(), project.getBusinessType(), sd.format(slEarlyRepaymentRecord.getEarlyDate()), record.getSlEarlyRepaymentId(), project.getId());
									for(SlFundIntent s:slist){
										s.setIsValid(Short.valueOf("1"));
										s.setIsCheck(Short.valueOf("1"));
										slFundIntentDao.merge(s);
									}
								}
								
								System.out.println(" ---------------------------------------------------------------------------------");
								//保存款项信息
								String fundIntentJsonData=flowRunInfo.getRequest().getParameter("earlyFundIntentJsonData");
								if (null != fundIntentJsonData && !"".equals(fundIntentJsonData)) {
									List<SlFundIntent> oldList = slFundIntentDao.getlistbyslEarlyRepaymentId(record.getSlEarlyRepaymentId(), project.getBusinessType(), project.getProjectId());
									for (SlFundIntent sfi : oldList) {
										if (sfi.getAfterMoney().compareTo(new BigDecimal(0)) == 0) {
											slFundIntentDao.remove(sfi);
										}
									}
									String[] shareequityArr = fundIntentJsonData.split("@");
									for (int i = 0; i < shareequityArr.length; i++) {
										String fundIntentstr = shareequityArr[i];
										JSONParser parser = new JSONParser(new StringReader(fundIntentstr));
								
										SlFundIntent SlFundIntent1 = (SlFundIntent) JSONMapper.toJava(parser.nextValue(), SlFundIntent.class);
										SlFundIntent1.setProjectId(project.getProjectId());
										SlFundIntent1.setProjectName(project.getProjectName());
										SlFundIntent1.setProjectNumber(project.getProjectNumber());

										if (null == SlFundIntent1.getFundIntentId()) {

											BigDecimal lin = new BigDecimal(0.00);
											if (SlFundIntent1.getIncomeMoney().compareTo(lin) == 0) {
												SlFundIntent1.setNotMoney(SlFundIntent1.getPayMoney());
											} else {
												SlFundIntent1.setNotMoney(SlFundIntent1.getIncomeMoney());
											}
											SlFundIntent1.setAfterMoney(new BigDecimal(0));
											SlFundIntent1.setAccrualMoney(new BigDecimal(0));
											SlFundIntent1.setFlatMoney(new BigDecimal(0));
											Short isvalid = 0;
											SlFundIntent1.setIsValid(isvalid);
											/*if (SlFundIntent1.getFundType().equals("principalLending")) {
												SlFundIntent1.setIsCheck(Short.valueOf("0"));
											} else {*/
											SlFundIntent1.setIsCheck((null!=taskSequence && taskSequence>=2000)?Short.valueOf("0"):Short.valueOf("1"));
											//}
											SlFundIntent1.setBusinessType(project.getBusinessType());
											SlFundIntent1.setCompanyId(project.getCompanyId());
											slFundIntentDao.save(SlFundIntent1);
										} else {
											BigDecimal lin = new BigDecimal(0.00);
											if (SlFundIntent1.getIncomeMoney().compareTo(lin) == 0) {
												SlFundIntent1.setNotMoney(SlFundIntent1.getPayMoney());
											} else {
												SlFundIntent1.setNotMoney(SlFundIntent1.getIncomeMoney());
											}
											SlFundIntent1.setBusinessType(project.getBusinessType());
											SlFundIntent1.setCompanyId(project.getCompanyId());
											/*if (SlFundIntent1.getFundType().equals(
													"principalLending")) {
												SlFundIntent1.setIsCheck(Short.valueOf("0"));
											} else {*/
											SlFundIntent1.setIsCheck((null!=taskSequence && taskSequence>=2000)?Short.valueOf("0"):Short.valueOf("1"));
											//}
											SlFundIntent slFundIntent2 = slFundIntentDao.get(SlFundIntent1.getFundIntentId());
											BeanUtil.copyNotNullProperties(slFundIntent2,SlFundIntent1);

											slFundIntentDao.merge(slFundIntent2);

										}
										
									}
								}
								
								if(transitionName.contains("完成")){
									project.setIsOtherFlow(Short.valueOf("0"));
								}
								bpFundProjectDao.merge(project);
								dao.merge(record);
							}
						}
					}
					vars.put("decisionResult", transitionName);
					flowRunInfo.getVariables().putAll(vars);
				}
				return 1;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
}