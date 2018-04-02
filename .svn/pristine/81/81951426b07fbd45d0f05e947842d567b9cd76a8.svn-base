package com.zhiwei.credit.dao.agentAproval;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.dao.BaseDao;
import com.zhiwei.credit.model.agentAproval.AgentAproval;

public interface AgentAprovalDao extends BaseDao<AgentAproval> {
	/***
	 * 查找是否有当天启动的项目
	 * @param string
	 * @return
	 */
	AgentAproval getProjectNumber(String projectNum);
	/***
	 * 查找代理商的授信记录
	 * @param request 
	 * @param agentId
	 * @return
	 */
	List<AgentAproval> listByAgentId(HttpServletRequest request, Long agentId);

}
