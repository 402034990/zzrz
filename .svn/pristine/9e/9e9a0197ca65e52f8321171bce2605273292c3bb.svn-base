package com.zhiwei.credit.dao.creditFlow.common.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.credit.dao.creditFlow.common.BpDicAccountTitleSetDao;
import com.zhiwei.credit.model.creditFlow.common.BpDicAccountTitleSet;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class BpDicAccountTitleSetDaoImpl extends BaseDaoImpl<BpDicAccountTitleSet> implements BpDicAccountTitleSetDao{

	public BpDicAccountTitleSetDaoImpl() {
		super(BpDicAccountTitleSet.class);
	}

	@Override
	public List<BpDicAccountTitleSet> listByListId(Long listId) {
		// TODO Auto-generated method stub
		String hql=" from BpDicAccountTitleSet b where b.listId=?";
		return this.getSession().createQuery(hql).setParameter(0, listId).list();
	}

}