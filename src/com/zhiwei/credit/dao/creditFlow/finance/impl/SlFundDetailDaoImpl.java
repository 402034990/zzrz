package com.zhiwei.credit.dao.creditFlow.finance.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.transform.Transformers;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.credit.dao.creditFlow.finance.SlFundDetailDao;
import com.zhiwei.credit.model.creditFlow.finance.SlFundDetail;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class SlFundDetailDaoImpl extends BaseDaoImpl<SlFundDetail> implements SlFundDetailDao{

	public SlFundDetailDaoImpl() {
		super(SlFundDetail.class);
	}

	@Override
	public List<SlFundDetail> getlistbySlFundIntentId(Long slFundIntentId,String type) {
//		String hql = "from SlFundDetail s where s.iscancel = null and s.slFundIntent.fundIntentId="+slFundIntentId;
		StringBuffer sql  = new StringBuffer();
		sql.append("(select" +
				" sq.myAccount as qlidemyAccount," +
				" sq.currency as qlidecurrency," +
				" sfd.factDate," +
				" sq.incomeMoney as qlideincomeMoney," +
				" sq.payMoney as qlidepayMoney," +
				" sfd.afterMoney," +
				" sfd.iscancel," +
				" sfd.cancelremark," +
				" IF(sfd.overdueAccrual,sfd.overdueAccrual,0) as overdueAccrual," +
				" IF(sfd.penaltyAccrual,sfd.penaltyAccrual,0) as penaltyAccrual," +
				" sfd.overdueNum" +
				" from sl_fund_detail as sfd " +
				" LEFT JOIN sl_fund_qlide as sq on sq.fundQlideId=sfd.fundQlideId" +
				" where sfd.fundIntentId="+slFundIntentId +" order by sfd.factDate desc)");
		if("0".equals(type)){
			sql.append(" UNION ");
			sql.append("(select" +
					" sq.myAccount as qlidemyAccount," +
					" sq.currency as qlidecurrency," +
					" spd.factDate," +
					" sq.incomeMoney as qlideincomeMoney," +
					" sq.payMoney as qlidepayMoney," +
					" spd.afterMoney," +
					" spd.iscancel," +
					" spd.cancelremark," +
					" 0 as overdueAccrual," +
					" 0 as penaltyAccrual," +
					" 0 as overdueNum" +
					" from sl_punish_interest as sp " +
					" LEFT JOIN sl_punish_detail as spd on spd.punishInterestId=sp.punishInterestId" +
					" LEFT JOIN sl_fund_qlide as sq on sq.fundQlideId=spd.fundQlideId" +
					" where sp.fundIntentId="+slFundIntentId+" order by sfd.factDate desc)");
		}
		List list = this.getSession().createSQLQuery(sql.toString())
			.addScalar("qlidemyAccount", Hibernate.STRING)
			.addScalar("qlidecurrency", Hibernate.STRING)
			.addScalar("cancelremark", Hibernate.STRING)
			.addScalar("factDate", Hibernate.DATE)
			.addScalar("iscancel", Hibernate.SHORT)
			.addScalar("qlideincomeMoney", Hibernate.BIG_DECIMAL)
			.addScalar("qlidepayMoney", Hibernate.BIG_DECIMAL)
			.addScalar("afterMoney", Hibernate.BIG_DECIMAL)
			.addScalar("penaltyAccrual", Hibernate.BIG_DECIMAL)
			.addScalar("overdueAccrual", Hibernate.BIG_DECIMAL)
			.addScalar("overdueNum", Hibernate.LONG)
			.setResultTransformer(Transformers.aliasToBean(SlFundDetail.class)).list();
		return list;
	}
	@Override
	public List<SlFundDetail> getlistbyProject(String type,String projectId,String payintentPeriod, String businessType ){
		StringBuffer sql  = new StringBuffer();
		sql.append("(select" +
				" sq.myAccount as qlidemyAccount," +
				" sq.currency as qlidecurrency," +
				" sfd.factDate," +
				" sq.incomeMoney as qlideincomeMoney," +
				" sq.payMoney as qlidepayMoney," +
				" sfd.afterMoney," +
				" sfd.iscancel," +
				" sfd.cancelremark," +
				" IF(sfd.overdueAccrual,sfd.overdueAccrual,0) as overdueAccrual," +
				" IF(sfd.penaltyAccrual,sfd.penaltyAccrual,0) as penaltyAccrual," +
				" sfd.overdueNum" +
				" from sl_fund_detail as sfd " +
				" LEFT JOIN sl_fund_qlide as sq on sq.fundQlideId=sfd.fundQlideId" +
				" where sfd.fundIntentId " +
				"	IN (SELECT  fundIntentId FROM sl_fund_intent WHERE projectId="+projectId +"" +" AND businessType='"+businessType+"'AND (isValid = 0 and isCheck = 0) AND payintentPeriod="+payintentPeriod+")"+
				" order by sfd.factDate desc)");
		if("0".equals(type)){
			sql.append(" UNION ");
			sql.append("(select" +
					" sq.myAccount as qlidemyAccount," +
					" sq.currency as qlidecurrency," +
					" spd.factDate," +
					" sq.incomeMoney as qlideincomeMoney," +
					" sq.payMoney as qlidepayMoney," +
					" spd.afterMoney," +
					" spd.iscancel," +
					" spd.cancelremark," +
					" 0 as overdueAccrual," +
					" 0 as penaltyAccrual," +
					" 0 as overdueNum" +
					" from sl_punish_interest as sp " +
					" LEFT JOIN sl_punish_detail as spd on spd.punishInterestId=sp.punishInterestId" +
					" LEFT JOIN sl_fund_qlide as sq on sq.fundQlideId=spd.fundQlideId" +
					" where sp.fundIntentId "+
					" IN (SELECT  fundIntentId FROM sl_fund_intent WHERE projectId="+projectId +"" +" AND businessType='"+businessType+"'AND (isValid = 0 and isCheck = 0) AND payintentPeriod="+payintentPeriod+")"+
					" order by sfd.factDate desc)");
		}
		List<SlFundDetail> list = this.getSession().createSQLQuery(sql.toString())
			.addScalar("qlidemyAccount", Hibernate.STRING)
			.addScalar("qlidecurrency", Hibernate.STRING)
			.addScalar("cancelremark", Hibernate.STRING)
			.addScalar("factDate", Hibernate.DATE)
			.addScalar("iscancel", Hibernate.SHORT)
			.addScalar("qlideincomeMoney", Hibernate.BIG_DECIMAL)
			.addScalar("qlidepayMoney", Hibernate.BIG_DECIMAL)
			.addScalar("afterMoney", Hibernate.BIG_DECIMAL)
			.addScalar("penaltyAccrual", Hibernate.BIG_DECIMAL)
			.addScalar("overdueAccrual", Hibernate.BIG_DECIMAL)
			.addScalar("overdueNum", Hibernate.LONG)
			.setResultTransformer(Transformers.aliasToBean(SlFundDetail.class)).list();
		return list;
	}
	@Override
	public List<SlFundDetail> getallbycompanyId() {
		// TODO Auto-generated method stub
		return null;
	}

	 

}