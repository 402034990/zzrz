package com.zhiwei.credit.dao.customer.impl;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.math.BigDecimal;
import java.util.List;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.credit.dao.customer.InvestPersonInfoDao;
import com.zhiwei.credit.model.customer.InvestPersonInfo;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class InvestPersonInfoDaoImpl extends BaseDaoImpl<InvestPersonInfo> implements InvestPersonInfoDao{

	public InvestPersonInfoDaoImpl() {
		super(InvestPersonInfo.class);
	}

	/**
	 * 获取投资人Id列表
	 * @return
	 */
	public List<InvestPersonInfo> getByPersonId(Long personId){
		String hql = "from InvestPersonInfo i where i.investPersonId=?";
		return findByHql(hql, new Object[]{personId});
	}

	@Override
	public List<InvestPersonInfo> getByMoneyPlanId(Long moneyPlanId) {
		String hql = "from InvestPersonInfo i where i.moneyPlanId=?";
		return findByHql(hql, new Object[]{moneyPlanId});
	}

	@Override
	public List<InvestPersonInfo> getByBidPlanId(Long bidPlanId) {
		String hql = "from InvestPersonInfo i  where i.bidPlanId=?";
		return findByHql(hql, new Object[]{bidPlanId});
	}
	
	@Override
	public List<InvestPersonInfo> getByRequestNumber(String requestNo) {
		String hql = "from InvestPersonInfo i where i.orderNo=?";
		return this.getSession().createQuery(hql).setParameter(0, requestNo).list();
	}
	@Override
	public BigDecimal getInvestTotalMoney(Long bidId) {
		return (BigDecimal)this.getSession().createSQLQuery("SELECT SUM(investMoney) from invest_person_info where bidPlanId=?").setLong(0, bidId).uniqueResult();
	}
}