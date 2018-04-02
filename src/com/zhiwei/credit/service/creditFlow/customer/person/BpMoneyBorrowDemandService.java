package com.zhiwei.credit.service.creditFlow.customer.person;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.credit.model.creditFlow.customer.person.BpMoneyBorrowDemand;

/**
 * 
 * @author 
 *
 */
public interface BpMoneyBorrowDemandService extends BaseService<BpMoneyBorrowDemand>{
	public List<BpMoneyBorrowDemand> getMessageByProjectID(Long projectID);
	
	public BpMoneyBorrowDemand getByBorrowId(Integer borrowId);
	/***
	 * 通过项目ID查询记录
	 * @param projectId
	 * @return
	 */
	public BpMoneyBorrowDemand getByProjectId(Long projectId);
}


