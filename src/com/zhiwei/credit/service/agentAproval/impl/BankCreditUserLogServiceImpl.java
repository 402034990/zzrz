package com.zhiwei.credit.service.agentAproval.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.credit.dao.agentAproval.BankCreditUserLogDao;
import com.zhiwei.credit.model.agentAproval.BankCreditUserLog;
import com.zhiwei.credit.service.agentAproval.BankCreditUserLogService;
 
/**
 * 
 * @author 
 *
 */
public class BankCreditUserLogServiceImpl extends BaseServiceImpl<BankCreditUserLog> implements BankCreditUserLogService{
	@SuppressWarnings("unused")
	private BankCreditUserLogDao dao;
	
	public BankCreditUserLogServiceImpl(BankCreditUserLogDao dao) {
		super(dao);
		this.dao=dao;
	}
	public  Integer  getDataCount(HttpServletRequest  request){
		return dao.getDataCount(request);
	}
	
	
	public    List<BankCreditUserLog> getListBankCreditUserLog(String commerType,Long  commerId,
			Long bankCreditId
			,Short creditType,Long projectId){
		
		return  dao.getListBankCreditUserLog(commerType, commerId, bankCreditId, creditType, projectId);
		
	}
}