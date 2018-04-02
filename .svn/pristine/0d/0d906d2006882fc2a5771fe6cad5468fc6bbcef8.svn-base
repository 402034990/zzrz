package com.zhiwei.credit.dao.agentAproval;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.dao.BaseDao;
import com.zhiwei.core.web.paging.PageBean;
 
import com.zhiwei.credit.model.agentAproval.BankCredit;

/**
 * 
 * @author 
 *
 */
public interface BankCreditDao extends BaseDao<BankCredit>{
	
	/**
	 * 获取编号
	 */
	public   BankCredit getByNum(String creditNum);
	
	public  Integer dataCount(HttpServletRequest request 	);
	
	/**
	 * 根据客户类型/客户主键/授信类型 查询授信纪录
	 */
	public  List<BankCredit> getBankCredit(String oppositeType ,Long oppositeID,Short  ceditTypeId );

	public void findList(PageBean<BankCredit> pageBean, String userIdsStr);
	
}