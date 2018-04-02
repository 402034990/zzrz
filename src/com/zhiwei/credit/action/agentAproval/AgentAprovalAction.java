package com.zhiwei.credit.action.agentAproval;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.hurong.core.util.BeanUtil;
import com.zhiwei.core.util.JsonUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.model.agentAproval.AgentAproval;
import com.zhiwei.credit.model.flow.ProcessForm;
import com.zhiwei.credit.model.p2p.BpCustMember;
import com.zhiwei.credit.service.agentAproval.AgentAprovalService;
import com.zhiwei.credit.service.creditFlow.common.CreditProjectService;
import com.zhiwei.credit.service.flow.ProcessFormService;

import flexjson.JSONSerializer;

public class AgentAprovalAction extends BaseAction{//
	@Resource
	private CreditProjectService creditProjectService;
	@Resource
	private ProcessFormService processFormService;
	@Resource
	private AgentAprovalService agentAprovalService;
	
	private AgentAproval agentAproval;
	private String agentId;
	
	public AgentAproval getAgentAproval() {
		return agentAproval;
	}
	public void setAgentAproval(AgentAproval agentAproval) {
		this.agentAproval = agentAproval;
	}
	public String getAgentId() {
		return agentId;
	}
	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}
	public String getProjectInfo(){
		Map<String,Object> map=new HashMap<String, Object>();
		String taskId=this.getRequest().getParameter("taskId");
		if(agentId!=null&&!"".equals(agentId)){
			AgentAproval agentAproval=agentAprovalService.get(Long.valueOf(agentId));
			map.put("agentAproval", agentAproval);
		}
		if (null != taskId && !"".equals(taskId)) {
			ProcessForm pform = processFormService.getByTaskId(taskId);
			if (pform == null) {
				pform = creditProjectService.getCommentsByTaskId(taskId);
			}
			if (pform != null && pform.getComments() != null
					&& !"".equals(pform.getComments())) {
				map.put("comments", pform.getComments());
			}
		}
		doJson(map);
		return SUCCESS;
	}
	public String saveProjectInfo(){
		try {
			String agentId=this.getRequest().getParameter("agentAproval.id");
			if(agentAproval!=null&&agentId!=null&&!"".equals(agentId)){
				AgentAproval agent=agentAprovalService.get(Long.valueOf(agentId));
				BeanUtil.copyNotNullProperties(agent, agentAproval);
				agentAprovalService.merge(agent);
			}
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	public String listByAnentId(){
		String agentId=this.getRequest().getParameter("agentId");
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		if(agentId!=null&&!"".equals(agentId)){
			List<AgentAproval> list=agentAprovalService.listByAgentId(this.getRequest(),Long.valueOf(agentId));
			Type type=new TypeToken<List<AgentAproval>>(){}.getType();
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
			.append(list!=null?list.size():0).append(",result:");
			buff.append(gson.toJson(list, type));
			buff.append("}");
			jsonString=buff.toString();
		}
		return SUCCESS;
	}
}
