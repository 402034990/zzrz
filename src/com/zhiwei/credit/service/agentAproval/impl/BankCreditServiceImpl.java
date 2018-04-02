package com.zhiwei.credit.service.agentAproval.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.io.StringReader;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.sdicons.json.mapper.JSONMapper;
import com.sdicons.json.parser.JSONParser;
import com.zhiwei.core.Constants;
import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.action.flow.FlowRunInfo;
import com.zhiwei.credit.dao.agentAproval.BankCreditDao;
import com.zhiwei.credit.dao.creditFlow.customer.person.PersonDao;
import com.zhiwei.credit.dao.flow.ProcessFormDao;
import com.zhiwei.credit.model.agentAproval.BankCredit;
import com.zhiwei.credit.model.creditFlow.customer.common.EnterpriseBank;
import com.zhiwei.credit.model.creditFlow.customer.person.BpMoneyBorrowDemand;
import com.zhiwei.credit.model.creditFlow.customer.person.Person;
import com.zhiwei.credit.model.creditFlow.customer.person.Spouse;
import com.zhiwei.credit.model.creditFlow.customer.person.workcompany.WorkCompany;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidPlan;
import com.zhiwei.credit.model.creditFlow.financingAgency.persion.BpPersionDirPro;
import com.zhiwei.credit.model.creditFlow.financingAgency.persion.BpPersionOrPro;
import com.zhiwei.credit.model.creditFlow.fund.project.BpFundProject;
import com.zhiwei.credit.model.creditFlow.personrelation.netcheck.BpPersonNetCheckInfo;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;
import com.zhiwei.credit.model.flow.ProcessForm;
import com.zhiwei.credit.model.p2p.BpFinanceApplyUser;
import com.zhiwei.credit.service.agentAproval.BankCreditService;
import com.zhiwei.credit.service.creditFlow.common.CreditProjectService;
import com.zhiwei.credit.service.creditFlow.customer.common.EnterpriseBankService;

/**
 * 
 * @author 
 *
 */
public class BankCreditServiceImpl extends BaseServiceImpl<BankCredit> implements BankCreditService{
	@SuppressWarnings("unused")
	private BankCreditDao dao;
	
	public BankCreditServiceImpl(BankCreditDao dao) {
		super(dao);
		this.dao=dao;
	}
	@Resource
	private ProcessFormDao processFormDao;
	@Resource
	private CreditProjectService creditProjectService;
	@Resource
	private PersonDao personDao;
	/**
	 * 获取编号
	 */
	public   BankCredit getByNum(String creditNum){
		return dao.getByNum(creditNum);
	}
	/**
	 * 计算查询数据的长度
	 */
	public  Integer dataCount(HttpServletRequest request){
		return dao.dataCount(request);
	}
	
	@Override
	public Integer savebankCreditServiceNextStep(FlowRunInfo flowRunInfo){

		try {
			if (flowRunInfo.isBack()) {
				return 1;
			} else {
				String taskId=flowRunInfo.getRequest().getParameter("taskId");
				
				String projectId=flowRunInfo.getRequest().getParameter("slprojectId");
		 
				String loanId=flowRunInfo.getRequest().getParameter("loanId");
				String flag=flowRunInfo.getRequest().getParameter("flag");
				String transitionName = flowRunInfo.getTransitionName();
				
				
				System.out.println("transitionName--------------"+transitionName);
				if (transitionName != null && !"".equals(transitionName)) {
					BankCredit bankCredit=dao.get(Long.valueOf(projectId));
					Map<String, Object> vars = new HashMap<String, Object>();
					if (transitionName.contains("终止") || transitionName.contains("完成")) {
						if(transitionName.contains("终止")){
							flowRunInfo.setStop(true);
						}
						BankCredit bankCreditFormPage=new BankCredit();
						BeanUtil.populateEntity(flowRunInfo.getRequest(), bankCreditFormPage, "bankCredit");
						
						//保证金使用--开始
						System.out.println("授信流程结束开始操作--------------------------");
						if(transitionName.contains("终止")){//授信流程非正常结束--授信失败
							bankCredit.setStatus(Short.valueOf("3"));//设置失败状态
						} 
						this.dao.merge(bankCredit);
						//保证金使用--结束
					} else {
						Person p1=new Person();
						BeanUtil.populateEntity(flowRunInfo.getRequest(), p1, "person");
						ProcessForm currentForm = processFormDao.getByTaskId(flowRunInfo.getTaskId());
						if (currentForm != null) {
							boolean isToNextTask = creditProjectService.compareTaskSequence(currentForm.getRunId(), currentForm.getActivityName(),transitionName);
							if (!isToNextTask) {// true表示流程正常往下流转,false则表示打回。
								flowRunInfo.setAfresh(true);// 表示打回重做
								vars.put("nextTaskAssignId", "true");// 表示为打回重做，需要设置打回的目标任务处理人
								vars.put("targetActivityName", transitionName);// 打回的目标任务名称
							}else{
								//出来业务
								String thisTaskName=flowRunInfo.getRequest().getParameter("thisTaskName");
								 
								SlSmallloanProject slSmallloanProject=new SlSmallloanProject();
								BankCredit bankCreditcopy=new BankCredit();
								BeanUtil.populateEntity(flowRunInfo.getRequest(), bankCreditcopy, "bankCredit");
								BeanUtil.copyNotNullProperties(bankCredit, bankCreditcopy);
								BeanUtil.populateEntity(flowRunInfo.getRequest(), slSmallloanProject, "slSmallloanProject");
								String projectMoney2=flowRunInfo.getRequest().getParameter("slSmallloanProject.projectMoney2");
								
								Person person=new Person();
								BeanUtil.populateEntity(flowRunInfo.getRequest(), person, "person");
								Spouse spouse=new Spouse();
								BeanUtil.populateEntity(flowRunInfo.getRequest(), spouse, "spouse");
								personDao.savePersonInfo(person, spouse, ((null!=thisTaskName && thisTaskName.equals("saveInfo"))?null:null));
								bankCredit.setTaskId(taskId);//保存流程主键信息
								if(thisTaskName.equals("shouxinzhongshen")){
									bankCredit.setShengyuMoney(bankCredit.getCreditMoney());//设置授信金额
									bankCredit.setStatus(Short.valueOf("2"));//设置授信成功状态
								}
								dao.merge(bankCredit);
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
	public void findList(PageBean<BankCredit> pageBean, String userIdsStr) {
		dao.findList(pageBean,userIdsStr);
	}
}