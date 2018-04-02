package com.zhiwei.credit.dao.creditFlow.customer.common.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.core.util.ContextUtil;
import com.zhiwei.credit.dao.creditFlow.customer.common.EnterpriseBankDao;
import com.zhiwei.credit.model.creditFlow.customer.common.EnterpriseBank;


@SuppressWarnings("unchecked")
@Repository
public class EnterpriseBankDaoImpl extends BaseDaoImpl<EnterpriseBank> implements EnterpriseBankDao{
	public EnterpriseBankDaoImpl() {
		super(EnterpriseBank.class);
	}

	@Override
	public List<EnterpriseBank> getBankList(Integer customerId,Short isEnterprise,Short iscredit,Short isInvest){
		// 主要借款账户，贷款人有好几个账户
		String hql = "from EnterpriseBank as e where e.enterpriseid=? and e.isEnterprise=? and e.iscredit=? and e.isInvest = ?";
//		String hql = "from EnterpriseBank as e where e.enterpriseid=? and e.isEnterprise=?  and e.isInvest = ?";
		return findByHql(hql,new Object[]{customerId,isEnterprise,iscredit,isInvest});
//		return findByHql(hql,new Object[]{customerId,isEnterprise,isInvest});
	}

	@Override
	public EnterpriseBank getById(Integer id) {
		String hql="from EnterpriseBank as e where id=?";
		return (EnterpriseBank) getSession().createQuery(hql).setParameter(0, id).uniqueResult();
	}
	@Override
	public List<EnterpriseBank> getList(Integer customerId, Short isEnterprise,
			Short isInvest, Integer start, Integer limit) {
		String hql="from EnterpriseBank as e where e.enterpriseid="+customerId+" and e.isEnterprise="+isEnterprise;
		if(isInvest != null ){
			if(isInvest==1){
				hql=hql+" and e.isInvest ="+isInvest;
			}else{
				hql=hql+" and (e.isInvest ="+isInvest+" or e.isInvest is null)";
			}
		}
		
		List<EnterpriseBank> list=null;
		try {
			if(null==start && null==limit){
				list=this.findByHql(hql);
			}else{
				list=this.findByHql(hql,new Object[]{}, start, limit);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public EnterpriseBank queryIscredit(Integer customerId, Short isEnterprise,
			Short isInvest) {
		String hql="from EnterpriseBank as e where e.iscredit=0 and e.enterpriseid="+customerId+" and e.isEnterprise="+isEnterprise;
		if(isInvest==1){
			hql=hql+" and e.isInvest ="+isInvest;
		}else{
			hql=hql+" and (e.isInvest ="+isInvest+" or e.isInvest is null)";
		}
		List<EnterpriseBank> list=this.findByHql(hql);
		EnterpriseBank e=null;
		if(null!=list && list.size()>0){
			e=list.get(0);
		}
		return e;
	}
	
	@Override
	public List<EnterpriseBank> queryAlreadyAccount(Integer id,String accountnum) {
		
		StringBuffer hql= new StringBuffer("from EnterpriseBank as e where e.accountnum ='"+accountnum+"'");
		if(id!=null){
			hql.append(" and e.id !="+id);
		}
		
		return  this.findByHql(hql.toString());
	}
	
	@Override
	public List<EnterpriseBank> querySomeList(EnterpriseBank enterpriseBank){
		StringBuffer hql= new StringBuffer("from EnterpriseBank as e where 1=1 ");
		if(enterpriseBank!=null){
			if(enterpriseBank.getAccountnum()!=null&&!enterpriseBank.getAccountnum().equals("")){
				hql.append(" and e.accountnum like '%"+enterpriseBank.getAccountnum()+"%'");
			}
			if(enterpriseBank.getName()!=null&&!enterpriseBank.getName().equals("")){
				hql.append(" and e.name like '%"+enterpriseBank.getName()+"%'");
			}
			if(enterpriseBank.getBankname()!=null&&!enterpriseBank.getBankname().equals("")){
				hql.append(" and e.bankname like '%"+enterpriseBank.getBankname()+"%'");
			}
			if(enterpriseBank.getIsEnterprise()!=null&&!enterpriseBank.getIsEnterprise().equals("")){
				hql.append(" and e.isEnterprise = "+enterpriseBank.getIsEnterprise());
			}
		}
		
		return  this.findByHql(hql.toString());
	}

	@Override
	public EnterpriseBank getByIdAndState(Integer personId, Short state) {
		String hql="from EnterpriseBank where enterpriseid = ? and iscredit = ? " ;
		List list=this.getSession().createQuery(hql).setParameter(0, personId).setParameter(1, state).list();
		if(null!=list && list.size()>0){
			return (EnterpriseBank)list.get(0);
		}else{
			return null;
		}
	}

	@Override
	public List<EnterpriseBank> getListByIdAndState(Integer personId,
			Short state) {
 
		String hql="from EnterpriseBank where enterpriseid = ? " ;
		if(state!=null){
			hql = hql+ " and iscredit = ?";
			return findByHql(hql,new Object[]{personId,state});
		}
		return findByHql(hql,new Object[]{personId});
	}

}
