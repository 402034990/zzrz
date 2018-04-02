package com.zhiwei.credit.service.creditFlow.customer.enterprise.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.credit.dao.creditFlow.customer.enterprise.BpDicAccountTitleDao;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpDicAccountTitle;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.BpDicAccountTitleService;

/**
 * 
 * @author 
 *
 */
public class BpDicAccountTitleServiceImpl extends BaseServiceImpl<BpDicAccountTitle> implements BpDicAccountTitleService{
	@SuppressWarnings("unused")
	private BpDicAccountTitleDao dao;
	
	public BpDicAccountTitleServiceImpl(BpDicAccountTitleDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<BpDicAccountTitle> listClassName() {
		// TODO Auto-generated method stub
		return dao.listClassName();
	}

	@Override
	public List<BpDicAccountTitle> listTitle(String className) {
		// TODO Auto-generated method stub
		return dao.listTitle(className);
	}

	@Override
	public BpDicAccountTitle findByKeyName(String keyName) {
		// TODO Auto-generated method stub
		return dao.findByKeyName(keyName);
	}

}