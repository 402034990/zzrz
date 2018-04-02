package com.zhiwei.credit.service.creditFlow.common.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.dao.creditFlow.common.BpDicAccountTitleSetIndexDao;
import com.zhiwei.credit.model.creditFlow.common.BpDicAccountTitleSetIndex;
import com.zhiwei.credit.service.creditFlow.common.BpDicAccountTitleSetIndexService;

/**
 * 
 * @author 
 *
 */
public class BpDicAccountTitleSetIndexServiceImpl extends BaseServiceImpl<BpDicAccountTitleSetIndex> implements BpDicAccountTitleSetIndexService{
	@SuppressWarnings("unused")
	private BpDicAccountTitleSetIndexDao dao;
	
	public BpDicAccountTitleSetIndexServiceImpl(BpDicAccountTitleSetIndexDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<BpDicAccountTitleSetIndex> listByType(String listType) {
		// TODO Auto-generated method stub
		return dao.listByType(listType);
	}

	@Override
	public void findIndexProjectList(
			PageBean<BpDicAccountTitleSetIndex> pageBean) {
		// TODO Auto-generated method stub
		dao.findIndexProjectList(pageBean);
	}

}