package com.zhiwei.credit.dao.entityhbm.Impl;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Hibernate;
import org.hibernate.transform.Transformers;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.dao.entityhbm.CashDetailDao;
import com.zhiwei.credit.model.entityhbm.CashDetail;

public class CashDetailDaoImpl extends BaseDaoImpl<CashDetail> implements CashDetailDao {

	public CashDetailDaoImpl() {
		super(CashDetail.class);
		
	}

	@Override
	public void addCashDetail(CashDetail cashDetail) {
		super.save(cashDetail);
		
	}

	@Override
	public List<CashDetail> selectAll() {
		
		return super.getAll();
	}

	@Override
	public void updateCashDetail(CashDetail v) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void queryList(PageBean<CashDetail> pageBean) {
		HttpServletRequest request=pageBean.getRequest();
		String cashName=request.getParameter("cashName");
		String customerName=request.getParameter("customerName");
		String intentDateGE=request.getParameter("intentDateGE");
		String intentDateLE=request.getParameter("intentDateLE");
		String startFactDate=request.getParameter("startFactDate");
		String endFactDate=request.getParameter("endFactDate");
		
		/*--------查询总条数---------*/
		StringBuffer totalCounts = new StringBuffer ("select count(*) from (");
		StringBuffer sql=new StringBuffer("select * from ( SELECT " +
				" det.id," +
				" det.cash_deposit_id as cashdepositid," +
				" dep.cash_name as cashName," +
				" (" +
				" CASE dep.custormer_type" +
				" WHEN 'person_customer' THEN (select cp.`name` from cs_person as cp where cp.id=dep.custormer_id)" +
				" WHEN 'company_customer' THEN (select ce.enterprisename from cs_enterprise as ce where ce.id=dep.custormer_id)" +
				" END" +
				" ) as customerName," +
				" IF(det.cash_type=1,det.cash_money,0) as incomeMoney," +
				" IF(det.cash_type=2,det.cash_money,0) as payMoney," +
				" DATE_FORMAT(det.create_date,'%Y-%m-%d') as createDate," +
				" det.factDate," +
				" det.afterMoney," +
				" det.notMoney" +
				" from cash_detail as det" +
				" LEFT JOIN cash_deposit as dep on dep.cash_deposit_id=det.cash_deposit_id ) as c where 1=1 ");
		if(null!=cashName && !"".equals(cashName)){
			sql.append(" and c.cashName like '%"+cashName+"%'");
		}
		if(null!=customerName && !"".equals(customerName)){
			sql.append(" and c.customerName like '%"+customerName+"%'");
		}
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			sql.append(" and c.createDate >='"+intentDateGE+"'");
		}
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			sql.append(" and c.createDate <='"+intentDateLE+"'");
		}
		if(null!=startFactDate && !"".equals(startFactDate)){
			sql.append(" and c.factDate >='"+startFactDate+"'");
		}
		if(null!=endFactDate && !"".equals(endFactDate)){
			sql.append(" and c.factDate <='"+endFactDate+"'");
		}
		
		sql.append(" order by c.id asc");
		totalCounts.append(sql).append(") as b");
		List list = this.getSession().createSQLQuery(sql.toString())
				.addScalar("id", Hibernate.LONG)
				.addScalar("cashdepositid", Hibernate.LONG)
				.addScalar("cashName", Hibernate.STRING)
				.addScalar("customerName", Hibernate.STRING)
				.addScalar("incomeMoney", Hibernate.BIG_DECIMAL)
				.addScalar("payMoney", Hibernate.BIG_DECIMAL)
				.addScalar("afterMoney", Hibernate.BIG_DECIMAL)
				.addScalar("notMoney", Hibernate.BIG_DECIMAL)
				.addScalar("createDate", Hibernate.DATE)
				.addScalar("factDate", Hibernate.DATE)
				.setResultTransformer(Transformers.aliasToBean(CashDetail.class)).setFirstResult(pageBean.getStart()).setMaxResults(pageBean.getLimit()).list();
		pageBean.setResult(list);
		BigInteger total = (BigInteger) this.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(totalCounts.toString()).uniqueResult();
		pageBean.setTotalCounts(total.intValue());
	}

	@Override
	public List<CashDetail> getCheckDetail(Long cashDetailId) {
		StringBuffer sql=new StringBuffer(" select" +
				" sq.myAccount," +
				" sq.currency," +
				" DATE_FORMAT(det.factDate,'%Y-%m-%d') as factDate," +
				" IF(det.cash_type=1,det.afterMoney,0) as incomeMoney," +
				" IF(det.cash_type=2,det.afterMoney,0) as payMoney" +
				" from cash_detail as det " +
				" LEFT JOIN sl_fund_qlide as sq on det.fundQlideId=sq.fundQlideId" +
				" where det.cash_deposit_id="+cashDetailId+" and det.notMoney=0 ");
		List list = this.getSession().createSQLQuery(sql.toString())
			.addScalar("myAccount", Hibernate.STRING)
			.addScalar("currency", Hibernate.STRING)
			.addScalar("incomeMoney", Hibernate.BIG_DECIMAL)
			.addScalar("payMoney", Hibernate.BIG_DECIMAL)
			.addScalar("factDate", Hibernate.DATE)
			.setResultTransformer(Transformers.aliasToBean(CashDetail.class)).list();
		return list;
	}

}