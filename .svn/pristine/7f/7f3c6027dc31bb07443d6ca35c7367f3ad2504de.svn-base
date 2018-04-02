package com.zhiwei.credit.dao.creditFlow.finance;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.dao.BaseDao;
import com.zhiwei.credit.model.creditFlow.finance.SlPunishInterest;

/**
 * 
 * @author 
 *
 */
public interface SlPunishInterestDao extends BaseDao<SlPunishInterest>{
	/**
	 * 
	 * @param fundIntentId   款项ID
	 * @param flag           用来区分是逾期(1)还是罚息(0)
	 * @return
	 */
	public List<SlPunishInterest> listbyisInitialorId( Long fundIntentId, String flag);
}