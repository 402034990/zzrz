package com.zhiwei.credit.service.creditFlow.gps.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.credit.dao.creditFlow.gps.CsGpsDao;
import com.zhiwei.credit.model.creditFlow.gps.CsGps;
import com.zhiwei.credit.service.creditFlow.gps.CsGpsService;

/**
 * 
 * @author 
 *
 */
public class CsGpsServiceImpl extends BaseServiceImpl<CsGps> implements CsGpsService{
	@SuppressWarnings("unused")
	private CsGpsDao dao;
	
	public CsGpsServiceImpl(CsGpsDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<CsGps> getByMortgageId(Long mortgageId) {
		// TODO Auto-generated method stub
		return dao.getByMortgageId(mortgageId);
	}

}