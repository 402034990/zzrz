package com.zhiwei.credit.dao.agentAproval.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Hibernate;
import org.hibernate.transform.Transformers;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.dao.agentAproval.BankCreditDao;
import com.zhiwei.credit.model.agentAproval.BankCredit;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class BankCreditDaoImpl extends BaseDaoImpl<BankCredit> implements BankCreditDao{

	public BankCreditDaoImpl() {
		super(BankCredit.class);
	}
	
	/**
	 * 获取数据的条数
	 */
	public  Integer dataCount(HttpServletRequest request){
		String useNum = request.getParameter("Q_userNum_S_L");//客户编号
		String userName =request.getParameter("Q_userName_S_L");//客户名称
		String status =request.getParameter("ceditTypeId");//客户名称
		
		String  sql = "select  count(bc.id)  from  bank_credit  as  bc where 1=1  ";
		
		if(useNum!=null && !"".equals(useNum)){
			sql = sql + "   and  bc.userNum like '%"+useNum+"%'";
		}
	    if (userName!=null  && !"".equals(userName)){
	    	sql = sql + "   and  bc.userName like '%"+userName+"%'";
	    }
	    if(status !=null  &&  !"".equals(status)){
	    	sql = sql + "   and  bc.status = "+status;
	    	
	    }
		BigInteger list1 = (BigInteger)this.getSession().createSQLQuery(sql).uniqueResult();
		Integer  list = list1.intValue();
		return list;
	}
	
	
	/**
	 * 根据客户类型/客户主键/授信类型 查询授信纪录
	 */
	public  List<BankCredit> getBankCredit(String oppositeType ,Long oppositeID,Short  ceditTypeId ){
		String  hql = "from  BankCredit  where  oppositeType = '"+oppositeType+"'"
		+"  and  oppositeID= "+oppositeID+"   and  status=2  and ceditTypeId = '"+ ceditTypeId +"  order by createtime desc ";
		List<BankCredit> list=this.getSession().createQuery(hql).list();
		return  list;
	}
	
	
	
	
	public   BankCredit getByNum(String creditNum){
		String  hql = "from  BankCredit  where  bankCreditNum like  '%"+creditNum+"%'";
		List<BankCredit> list=this.getSession().createQuery(hql).list();
		if(!list.isEmpty()){
			return list.get(list.size()-1);
		}else{
			return null;
		}
	}

	@Override
	public void findList(PageBean<BankCredit> pageBean, String userIdsStr) {

	 	HttpServletRequest request = pageBean.getRequest();
		String ceditTypeId = request.getParameter("ceditTypeId");
		String userNum = request.getParameter("userNum");
		String userName = request.getParameter("userName");
		
	
		StringBuffer sb = new StringBuffer ("select " +
				" a.id," +
				" a.oppositeID," +
				" a.userName," +
				" a.userNum," +
				" a.bankCreditNum," +
				" a.appUserName," +
				" a.taskId," +
				" a.oppositeType," +
				" a.creditMoney," +
				" a.useMoney," +
				" a.shengyuMoney," +
				" a.createtime," +
				" a.endTime," +
				" a.beginTime," +
				" a.status" +
				" from bank_credit as a where 1=1 ");
		
		/*--------查询总条数---------*/
		StringBuffer totalCounts = new StringBuffer ("select count(*) from ( ");
		if(null!=userIdsStr && !userIdsStr.equals("")){
			sb.append(" and fn_check_repeat(a.appUserId,'"+userIdsStr+"') = 1");
		}
		
		if(null!=ceditTypeId && !"".equals(ceditTypeId)){
			sb.append(" and a.status="+ceditTypeId);
		}
		if(null!=userNum && !"".equals(userNum)){
			sb.append(" and a.userNum like '%"+userNum+"%'");
		}
		if(null!=userName && !"".equals(userName)){
			sb.append(" and a.userName like '%"+userName+"%'");
		}
		
		
		sb.append(" ORDER BY a.createtime DESC");
		totalCounts.append(sb).append(") as b");
		List list = this.getSession().createSQLQuery(sb.toString())
		.addScalar("id",Hibernate.LONG)
		.addScalar("oppositeID",Hibernate.LONG)
		.addScalar("userName", Hibernate.STRING)
		.addScalar("userNum", Hibernate.STRING)
		.addScalar("bankCreditNum", Hibernate.STRING)
		.addScalar("appUserName", Hibernate.STRING)
		.addScalar("taskId", Hibernate.STRING)
		.addScalar("oppositeType", Hibernate.STRING)
		.addScalar("creditMoney", Hibernate.BIG_DECIMAL)
		.addScalar("useMoney", Hibernate.BIG_DECIMAL)
		.addScalar("shengyuMoney", Hibernate.BIG_DECIMAL)
		.addScalar("createtime", Hibernate.DATE)
		.addScalar("endTime", Hibernate.DATE)
		.addScalar("beginTime", Hibernate.DATE)
		.addScalar("status", Hibernate.SHORT)
		.setResultTransformer(Transformers.aliasToBean(BankCredit.class)).setFirstResult(pageBean.getStart()).setMaxResults(pageBean.getLimit()).list();
		pageBean.setResult(list);
		
		BigInteger total =   (BigInteger) this.getSession().createSQLQuery(totalCounts.toString()).uniqueResult();
		pageBean.setTotalCounts(total.intValue());
	}

}