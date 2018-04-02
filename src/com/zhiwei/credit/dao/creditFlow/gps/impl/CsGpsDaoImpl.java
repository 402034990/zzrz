package com.zhiwei.credit.dao.creditFlow.gps.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.credit.dao.creditFlow.gps.CsGpsDao;
import com.zhiwei.credit.model.creditFlow.gps.CsGps;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class CsGpsDaoImpl extends BaseDaoImpl<CsGps> implements CsGpsDao{

	public CsGpsDaoImpl() {
		super(CsGps.class);
	}

	@Override
	public List<CsGps> getByMortgageId(Long mortgageId) {
		  String hql = "from CsGps where mortgageId="+mortgageId;
			return this.getSession().createQuery(hql).list();
	}

}