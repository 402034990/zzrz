package com.nc.dao.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Session;

import com.nc.dao.NcPushRecordDao;
import com.nc.model.NcPushRecord;
import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.core.web.paging.PageBean;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class NcPushRecordDaoImpl extends BaseDaoImpl<NcPushRecord> implements NcPushRecordDao{

	public NcPushRecordDaoImpl() {
		super(NcPushRecord.class);
	}

	@Override
	public List<NcPushRecord> getByRequestNo(String requestNo,String serviceType) {
		StringBuffer sb = new StringBuffer("from NcPushRecord as ur where 1=1");
		if(null !=requestNo && !"".equals(requestNo)){
			sb.append(" and ur.requestNo='"+requestNo+"'"); 
		}
		if(null !=serviceType && !"".equals(serviceType)){
			sb.append(" and ur.serviceType='"+serviceType+"'"); 
		}
		return this.findByHql(sb.toString());
	}

	@Override
	public List<NcPushRecord> getByFail() {
		String hql = "from NcPushRecord as ur where ur.returnCode is NULL or ur.returnCode=400  and ur.state=2 and ur.pushNumber <=5";
		return this.findByHql(hql);
	}

	@Override
	public void listAll(PageBean<NcPushRecord> pageBean) {
		HttpServletRequest request = pageBean.getRequest();
		String serviceType = request.getParameter("serviceType");
		String createDate = request.getParameter("createDate");
		String returnCode = request.getParameter("returnCode");
		String state = request.getParameter("state");
		
		StringBuffer totalCounts = new StringBuffer("select count(*) from (");
		StringBuffer sb = new StringBuffer("select * from ");
		sb.append(" nc_push_record as nr where 1=1");
		if(null !=serviceType && !"".equals(serviceType)){
			sb.append(" and nr.serviceType='"+serviceType+"'");
		}
		if(null !=createDate && !"".equals(createDate)){
			sb.append(" and nr.createDate>'"+createDate+" 00:00:00'");	
			sb.append(" and nr.createDate<'"+createDate+" 23:59:59'");		
		}
		if(null !=returnCode && !"".equals(returnCode)){
			if(returnCode.equals("400")){//状态为400与null的都是失败状态
				sb.append(" and (nr.returnCode="+returnCode+" or nr.returnCode is NULL)");
			}else{
				sb.append(" and nr.returnCode='"+returnCode+"'");
			}
		}
		if(null !=state && !"".equals(state)){
			sb.append(" and nr.state='"+state+"'");
		}
		totalCounts.append(sb).append(")as a");
		
		Session session=this.getSession();
		List<NcPushRecord> list= session.createSQLQuery(sb.toString()).addEntity(NcPushRecord.class)
		.setFirstResult(pageBean.getStart()).setMaxResults(pageBean.getLimit()).list();
		pageBean.setResult(list);
		BigInteger total = (BigInteger) session.createSQLQuery(totalCounts.toString()).uniqueResult();
		pageBean.setTotalCounts(total.intValue());
		releaseSession(session);
		
	}

}