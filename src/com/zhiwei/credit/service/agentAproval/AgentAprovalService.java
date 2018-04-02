package com.zhiwei.credit.service.agentAproval;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.credit.action.flow.FlowRunInfo;
import com.zhiwei.credit.model.agentAproval.AgentAproval;

public interface AgentAprovalService extends BaseService<AgentAproval> {
	/***
	 * 保存数据并执行下一步
	 * @return
	 */
	public Integer saveProjectAndGoNext(FlowRunInfo flowRunInfo);
	/***
	 * 查找代理商的授信记录
	 * @param request 
	 * @param valueOf
	 * @return
	 */
	public List<AgentAproval> listByAgentId(HttpServletRequest request, Long agentId);

}
