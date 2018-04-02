package com.zhiwei.credit.dao.agentAproval.impl;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.credit.dao.agentAproval.AgentAprovalDao;
import com.zhiwei.credit.model.agentAproval.AgentAproval;

@SuppressWarnings("unchecked")
public class AgentAprovalDaoImpl extends BaseDaoImpl<AgentAproval> implements
		AgentAprovalDao {

	public AgentAprovalDaoImpl(){
		super(AgentAproval.class);
		
	}

	@Override
	public AgentAproval getProjectNumber(String projectNum) {
		String hql="FROM AgentAproval WHERE aprovalProjectNumber LIKE :projectNum";
		List<AgentAproval> list=this.getSession().createQuery(hql).setParameter("projectNum", "%"+projectNum+"%").list();
		if(!list.isEmpty()){
			return list.get(list.size()-1);
		}else{
			return null;
		}
		
	}

	@Override
	public List<AgentAproval> listByAgentId(HttpServletRequest request,Long agentId) {
		StringBuffer hql =new StringBuffer("FROM AgentAproval WHERE agentId = ?");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String aprovalType = request.getParameter("aprovalType");
		String approvalMoneyMin = request.getParameter("approvalMoneyMin");
		String approvalMoneyMax = request.getParameter("approvalMoneyMax");
		try {
			if(startDate!=null&&!"".equals(startDate)&&endDate!=null&&!"".equals(endDate)){
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
				Date date=sdf.parse(endDate);
				Calendar cal=Calendar.getInstance();
				cal.setTime(date);
				cal.add(Calendar.DAY_OF_YEAR,1);
				Date date2=cal.getTime();
				endDate=sdf.format(date2);
				hql.append(" AND createTime BETWEEN '"+startDate+"' AND '"+endDate+"'");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(aprovalType!=null&&!"".equals(aprovalType)){
			hql.append(" AND aprovalType = "+aprovalType);
		}
		if(approvalMoneyMin!=null&&!"".equals(approvalMoneyMin)){
			hql.append(" AND approvalMoney >= "+approvalMoneyMin+" ");
		}
		if(approvalMoneyMax!=null&&!"".equals(approvalMoneyMax)){
			hql.append(" AND approvalMoney <= "+approvalMoneyMax+" ");
		}
		return this.getSession().createQuery(hql.toString()).setParameter(0,agentId).list();
	}
	
}
