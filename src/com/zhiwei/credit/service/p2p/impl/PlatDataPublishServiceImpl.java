package com.zhiwei.credit.service.p2p.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.credit.dao.p2p.PlatDataPublishDao;
import com.zhiwei.credit.model.p2p.PlatDataPublish;
import com.zhiwei.credit.service.p2p.PlatDataPublishService;

/**
 * 
 * @author 
 *
 */
public class PlatDataPublishServiceImpl extends BaseServiceImpl<PlatDataPublish> implements PlatDataPublishService{
	@SuppressWarnings("unused")
	private PlatDataPublishDao dao;
	
	public PlatDataPublishServiceImpl(PlatDataPublishDao dao) {
		super(dao);
		this.dao=dao;
	}

}