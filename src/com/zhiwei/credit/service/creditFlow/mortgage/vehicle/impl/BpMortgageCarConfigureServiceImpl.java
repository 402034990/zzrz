package com.zhiwei.credit.service.creditFlow.mortgage.vehicle.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.credit.dao.creditFlow.mortgage.vehicle.BpMortgageCarConfigureDao;
import com.zhiwei.credit.model.creditFlow.mortgage.vehicle.BpMortgageCarConfigure;
import com.zhiwei.credit.service.creditFlow.mortgage.vehicle.BpMortgageCarConfigureService;

/**
 * 
 * @author 
 *
 */
public class BpMortgageCarConfigureServiceImpl extends BaseServiceImpl<BpMortgageCarConfigure> implements BpMortgageCarConfigureService{
	@SuppressWarnings("unused")
	private BpMortgageCarConfigureDao dao;
	
	public BpMortgageCarConfigureServiceImpl(BpMortgageCarConfigureDao dao) {
		super(dao);
		this.dao=dao;
	}

}