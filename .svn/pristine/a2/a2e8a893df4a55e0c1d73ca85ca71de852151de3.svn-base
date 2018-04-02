package com.zhiwei.credit.service.creditFlow.creditRecord.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.credit.dao.creditFlow.creditRecord.CsPersonCreditRecordDao;
import com.zhiwei.credit.model.creditFlow.creditRecord.CreditRecord;
import com.zhiwei.credit.model.creditFlow.creditRecord.CsPersonCreditRecord;
import com.zhiwei.credit.service.creditFlow.creditRecord.CsPersonCreditRecordService;

/**
 * 
 * @author 
 *
 */
public class CsPersonCreditRecordServiceImpl extends BaseServiceImpl<CsPersonCreditRecord> implements CsPersonCreditRecordService{
	@SuppressWarnings("unused")
	private CsPersonCreditRecordDao dao;
	
	public CsPersonCreditRecordServiceImpl(CsPersonCreditRecordDao dao) {
		super(dao);
		this.dao=dao;
	}
	@Override
	public List<CsPersonCreditRecord> getByProjectIdType(Long projectId, String type) {
		
		return dao.getByProjectIdType(projectId,type);
	}

}