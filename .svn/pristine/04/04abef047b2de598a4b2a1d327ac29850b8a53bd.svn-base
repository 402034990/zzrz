package com.zhiwei.credit.dao.agentAproval.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.credit.dao.agentAproval.BankCreditUserLogDao;
import com.zhiwei.credit.model.agentAproval.BankCreditUserLog;
import com.zhiwei.credit.model.p2p.BpCustMember;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class BankCreditUserLogDaoImpl extends BaseDaoImpl<BankCreditUserLog> implements BankCreditUserLogDao{

	public BankCreditUserLogDaoImpl() {
		super(BankCreditUserLog.class);
	}
	
	/**
	 * commerType 客户类型
	 * commerId  客户主键
	 * bankCreditId 授信表的主键
	 * creditType  授信类型
	 * projectId  项目主键
	 */
	public    List<BankCreditUserLog> getListBankCreditUserLog(String commerType,Long  commerId,
			Long bankCreditId
			,Short creditType,Long projectId){
//		String hql = "from BankCreditUserLog where (isDelete!=1 or isDelete is null) and (isForbidden!=1 or isForbidden is null)";
		String hql = "from BankCreditUserLog where  projectId= "+projectId +
		"  and  commerType='"+commerType+"'  and commerId ="+commerId
		+"  and  bankCreditId ="+bankCreditId +"  and  creditType = "+creditType;
		
		System.out.println("--------------"+hql);
		List<BankCreditUserLog> list = findByHql(hql);
		return list;
	}
	public  Integer  getDataCount(HttpServletRequest  request){
		String  commerId= request.getParameter("agentId");
		String  startDate = request.getParameter("startDate");
		String endDate =  request.getParameter("endDate");
		String  aprovalType = request.getParameter("aprovalType");
		String approvalMoneyMin = request.getParameter("approvalMoneyMin");
		String approvalMoneyMax = request.getParameter("approvalMoneyMax");
		String  sql = "select  count(bc.id)  from  bank_credit_user_log  as  bc where 1=1  ";
		if(commerId!=null && !"".equals(commerId)){
			sql = sql + "   and  bc.bankCreditId ="+Long.valueOf(commerId);
		}
	    if (startDate!=null  && !"".equals(startDate)){
	    	sql = sql + "   and  bc.createtime > '"+startDate+"'";
	    }
	    if (endDate!=null  && !"".equals(endDate)){
	    	sql = sql + "   and  bc.createtime <='"+endDate+"'";
	    }
	    if(aprovalType!=null && !"".equals(aprovalType)){
			sql = sql + "   and  bc.creditType ="+Long.valueOf(aprovalType);
		} 
	    if (approvalMoneyMin!=null  && !"".equals(approvalMoneyMin)){
	    	sql = sql + "   and  bc.creditMoney > "+approvalMoneyMin;
	    }
	    if (approvalMoneyMax!=null  && !"".equals(approvalMoneyMax)){
	    	sql = sql + "   and  bc.creditMoney <="+approvalMoneyMax;
	    }
		BigInteger list1 = (BigInteger)this.getSession().createSQLQuery(sql).uniqueResult();
		Integer  list = list1.intValue();
		return list;
		
	}

}