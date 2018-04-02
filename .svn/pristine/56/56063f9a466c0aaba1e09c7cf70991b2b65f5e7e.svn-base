package com.zhiwei.credit.dao.creditFlow.creditRecord.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.credit.dao.creditFlow.creditRecord.CsPersonCreditRecordDao;
import com.zhiwei.credit.model.creditFlow.creditRecord.CreditRecord;
import com.zhiwei.credit.model.creditFlow.creditRecord.CsPersonCreditRecord;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class CsPersonCreditRecordDaoImpl extends BaseDaoImpl<CsPersonCreditRecord> implements CsPersonCreditRecordDao{

	public CsPersonCreditRecordDaoImpl() {
		super(CsPersonCreditRecord.class);
	}
	
	@Override
	public List<CsPersonCreditRecord> getByProjectIdType(Long projectId, String type) {
		
		String hql="from CsPersonCreditRecord as cr where cr.projectId=? and cr.type=?";
		
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, type).list();
	}

}