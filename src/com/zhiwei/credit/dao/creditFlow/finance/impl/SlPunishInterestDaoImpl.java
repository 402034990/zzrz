package com.zhiwei.credit.dao.creditFlow.finance.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.transform.Transformers;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.credit.dao.creditFlow.finance.SlPunishInterestDao;
import com.zhiwei.credit.model.creditFlow.finance.SlPunishInterest;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class SlPunishInterestDaoImpl extends BaseDaoImpl<SlPunishInterest> implements SlPunishInterestDao{

	public SlPunishInterestDaoImpl() {
		super(SlPunishInterest.class);
	}

	@Override
	public List<SlPunishInterest> listbyisInitialorId(Long fundIntentId,String flag) {
		/*StringBuffer hql=new StringBuffer("from SlPunishInterest q  where  q.fundIntentId="+fundIntentId);
		if(null!=flag && !"".equals(flag)){
			hql.append(" and q.type="+Short.valueOf(flag));
		}
		return findByHql(hql.toString());*/
		List list=null;
		StringBuffer sql  = new StringBuffer("select " +
				" sp.punishInterestId," +
				" sp.incomeMoney," +
				" sp.intentDate," +
				" sp.payMoney," +
				" sp.factDate," +
				" sp.afterMoney," +
				" sp.notMoney," +
				" sp.businessType," +
				" sp.companyId," +
				" sp.fundType," +
				" sp.flatMoney," +
				" sf.penaltyTax," +
				" sf.overdureTax," +
				" sp.projectId," +
				" sp.fundIntentId," +
				" sp.punishDays," +
				" sp.type" +
				" from sl_punish_interest as sp" +
				" LEFT JOIN sl_fund_intent as sf on sp.fundIntentId=sf.fundIntentId" +
				" where sp.fundIntentId="+fundIntentId);
		if(null!=flag && !"".equals(flag)){
			sql.append(" and sp.type="+Short.valueOf(flag));
		}
		list = this.getSession().createSQLQuery(sql.toString())
			.addScalar("punishInterestId", Hibernate.LONG)
			.addScalar("projectId", Hibernate.LONG)
			.addScalar("fundIntentId", Hibernate.LONG)
			.addScalar("incomeMoney", Hibernate.BIG_DECIMAL)
			.addScalar("payMoney", Hibernate.BIG_DECIMAL)
			.addScalar("afterMoney", Hibernate.BIG_DECIMAL)
			.addScalar("notMoney", Hibernate.BIG_DECIMAL)
			.addScalar("flatMoney", Hibernate.BIG_DECIMAL)
			.addScalar("penaltyTax", Hibernate.BIG_DECIMAL)
			.addScalar("overdureTax", Hibernate.BIG_DECIMAL)
			.addScalar("intentDate", Hibernate.DATE)
			.addScalar("factDate", Hibernate.DATE)
			.addScalar("businessType", Hibernate.STRING)
			.addScalar("fundType", Hibernate.STRING)
			.addScalar("companyId", Hibernate.LONG)
			.addScalar("type", Hibernate.SHORT)
			.setResultTransformer(Transformers.aliasToBean(SlPunishInterest.class)).list();
		return list;
	}
}