package com.zhiwei.credit.service.agentAproval.impl;



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
import com.zhiwei.credit.action.flow.FlowRunInfo;
import com.zhiwei.credit.dao.agentAproval.AgentAprovalDao;
import com.zhiwei.credit.dao.flow.ProcessFormDao;
import com.zhiwei.credit.model.agentAproval.AgentAproval;
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
import com.zhiwei.credit.service.agentAproval.AgentAprovalService;
import com.zhiwei.credit.service.creditFlow.common.CreditProjectService;

public class AgentAprovalServiceImpl extends BaseServiceImpl<AgentAproval>
		implements AgentAprovalService {//
	
	@SuppressWarnings("unused")
	private AgentAprovalDao dao;
	@Resource
	private ProcessFormDao processFormDao;
	@Resource
	private CreditProjectService creditProjectService;
	public AgentAprovalServiceImpl(AgentAprovalDao dao) {
		super(dao);
		this.dao=dao;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Integer saveProjectAndGoNext(FlowRunInfo flowRunInfo) {
		try {
			if (flowRunInfo.isBack()) {
				return 1;
			} else {
				String agentAprovalId=flowRunInfo.getRequest().getParameter("agentAproval.id");
				String loanId=flowRunInfo.getRequest().getParameter("loanId");
				String flag=flowRunInfo.getRequest().getParameter("flag");
				String transitionName = flowRunInfo.getTransitionName();
				if (transitionName != null && !"".equals(transitionName)) {
					AgentAproval p=dao.get(Long.valueOf(agentAprovalId));
					Map<String, Object> vars = new HashMap<String, Object>();
					if (transitionName.contains("终止") || transitionName.contains("结束")) {//2016-05-06，此流程的结束即表示审批完成，后面的流程改不改就不好说了，仁兄只能帮你到这了
						flowRunInfo.setStop(true);
						AgentAproval project=dao.get(Long.valueOf(agentAprovalId));
						project.setProjectStatue(Constants.PROJECT_STATUS_COMPLETE);
						dao.merge(project);
					} else {
						ProcessForm currentForm = processFormDao.getByTaskId(flowRunInfo.getTaskId());
						if (currentForm != null) {
							boolean isToNextTask = creditProjectService.compareTaskSequence(currentForm.getRunId(), currentForm.getActivityName(),transitionName);
							if (!isToNextTask) {// true表示流程正常往下流转,false则表示打回。
								flowRunInfo.setAfresh(true);// 表示打回重做
								vars.put("nextTaskAssignId", "true");// 表示为打回重做，需要设置打回的目标任务处理人
								vars.put("targetActivityName", transitionName);// 打回的目标任务名称
							}else{
								String thisTaskName=flowRunInfo.getRequest().getParameter("thisTaskName");
								if(null!=thisTaskName && thisTaskName.equals("saveInfo")){
									AgentAproval agent=p;
									if(p==null){
										agent=new AgentAproval();
									}
									BeanUtil.populateEntity(flowRunInfo.getRequest(), agent, "agentAproval");
									BeanUtil.copyNotNullProperties(p, agent);
									this.dao.merge(agent);
									}
								if(null!=thisTaskName && thisTaskName.equals("sxfxzs")){
									AgentAproval agent=p;
									if(p==null){
										agent=new AgentAproval();
									}
									BeanUtil.populateEntity(flowRunInfo.getRequest(), agent, "agentAproval");
									BeanUtil.copyNotNullProperties(p, agent);
									agent.setProjectStatue(Short.valueOf("2"));
									this.dao.merge(agent);
									}
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
	public List<AgentAproval> listByAgentId(HttpServletRequest request,Long agentId) {
		// TODO Auto-generated method stub
		return dao.listByAgentId(request,agentId);
	}
	
}
