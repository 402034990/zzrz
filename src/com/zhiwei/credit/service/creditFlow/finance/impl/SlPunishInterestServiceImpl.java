package com.zhiwei.credit.service.creditFlow.finance.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.credit.dao.creditFlow.finance.SlPunishInterestDao;
import com.zhiwei.credit.model.creditFlow.finance.SlPunishInterest;
import com.zhiwei.credit.service.creditFlow.finance.SlPunishInterestService;

/**
 * 
 * @author 
 *
 */
public class SlPunishInterestServiceImpl extends BaseServiceImpl<SlPunishInterest> implements SlPunishInterestService{
	
	private SlPunishInterestDao dao;
	
	public SlPunishInterestServiceImpl(SlPunishInterestDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<SlPunishInterest> listbyisInitialorId(Long fundIntentId,String type) {
		// TODO Auto-generated method stub
		return dao.listbyisInitialorId(fundIntentId,type);
	}

}