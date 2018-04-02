package com.zhiwei.credit.service.creditFlow.customer.enterprise.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.credit.dao.creditFlow.customer.enterprise.BpCustEntAccountSumDao;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpCustEntAccountSum;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.BpCustEntAccountSumService;

/**
 * 
 * @author 
 *
 */
public class BpCustEntAccountSumServiceImpl extends BaseServiceImpl<BpCustEntAccountSum> implements BpCustEntAccountSumService{
	@SuppressWarnings("unused")
	private BpCustEntAccountSumDao dao;
	
	public BpCustEntAccountSumServiceImpl(BpCustEntAccountSumDao dao) {
		super(dao);
		this.dao=dao;
	}

}