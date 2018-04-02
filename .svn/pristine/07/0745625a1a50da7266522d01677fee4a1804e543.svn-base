package com.zhiwei.credit.dao.system.product;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.dao.BaseDao;
import com.zhiwei.credit.model.system.product.BpProductParameter;

/**
 * 
 * @author 
 *
 */
public interface BpProductParameterDao extends BaseDao<BpProductParameter>{

	Boolean findProductNumber(String productNumber);
	/***
	 * 通过角色获取产品集合
	 * @param roleIds
	 * @return
	 */
	List<BpProductParameter> getAllByRolers(Set<Object> roleIds,HttpServletRequest request);
	
}