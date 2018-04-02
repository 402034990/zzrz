package com.zhiwei.credit.service.agentAproval;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.credit.model.agentAproval.BankCreditUserLog;

/**
 * 
 * @author 
 *
 */
public interface BankCreditUserLogService extends BaseService<BankCreditUserLog>{
	
	/**
	 * 获取数据的总条数
	 * @return
	 */
	public  Integer  getDataCount(HttpServletRequest  request);	
	
	public    List<BankCreditUserLog> getListBankCreditUserLog(String commerType,Long  commerId,
			Long bankCreditId
			,Short creditType,Long projectId);
	
	
	
}


