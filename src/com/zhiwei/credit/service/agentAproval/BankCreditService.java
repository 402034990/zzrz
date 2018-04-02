package com.zhiwei.credit.service.agentAproval;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.action.flow.FlowRunInfo;
import com.zhiwei.credit.model.agentAproval.BankCredit;

/**
 * 
 * @author 
 *
 */
public interface BankCreditService extends BaseService<BankCredit>{
	
	public   BankCredit getByNum(String creditNum);


	Integer savebankCreditServiceNextStep(FlowRunInfo flowRunInfo);
	
	/**
	 * 计算查询数据的长度
	 */
	public  Integer dataCount(HttpServletRequest request);


	public void findList(PageBean<BankCredit> pageBean, String userIdsStr);
	
}


