package com.zhiwei.credit.service.creditFlow.common.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.credit.dao.creditFlow.common.BpDicAccountTitleSetDao;
import com.zhiwei.credit.model.creditFlow.common.BpDicAccountTitleSet;
import com.zhiwei.credit.service.creditFlow.common.BpDicAccountTitleSetService;

/**
 * 
 * @author 
 *
 */
public class BpDicAccountTitleSetServiceImpl extends BaseServiceImpl<BpDicAccountTitleSet> implements BpDicAccountTitleSetService{
	@SuppressWarnings("unused")
	private BpDicAccountTitleSetDao dao;
	
	public BpDicAccountTitleSetServiceImpl(BpDicAccountTitleSetDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<BpDicAccountTitleSet> listByListId(Long listId) {
		// TODO Auto-generated method stub
		return dao.listByListId(listId);
	}

}