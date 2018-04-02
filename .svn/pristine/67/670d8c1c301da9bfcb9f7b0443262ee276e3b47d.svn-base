package com.zhiwei.credit.dao.entityhbm;

import java.util.List;


import com.zhiwei.core.dao.BaseDao;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.model.entityhbm.CashDetail;


public interface CashDetailDao  extends BaseDao<CashDetail>{
	/*
	 * 创建保证金表
	 */
	void addCashDetail(CashDetail v);
	/**
	 * 
	 * 查询
	 */
    List<CashDetail> selectAll();
    
    /**
     * 更新保证金
     */
    void updateCashDetail(CashDetail v);
    
	void queryList(PageBean<CashDetail> pageBean);
	
	List<CashDetail> getCheckDetail(Long fundQlideId);
}
