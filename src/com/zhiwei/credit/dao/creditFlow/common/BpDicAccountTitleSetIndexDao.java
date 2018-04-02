package com.zhiwei.credit.dao.creditFlow.common;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.dao.BaseDao;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.model.creditFlow.common.BpDicAccountTitleSetIndex;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpDicAccountTitle;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;

/**
 * 
 * @author 
 *
 */
public interface BpDicAccountTitleSetIndexDao extends BaseDao<BpDicAccountTitleSetIndex>{
	public List<BpDicAccountTitleSetIndex> listByType(String listType) ;
	/**
	 * 查询账套列表
	 * @param pageBean
	 */
	public void findIndexProjectList(PageBean<BpDicAccountTitleSetIndex> pageBean);
	
}