package com.zhiwei.credit.service.entityhbm;

import java.util.List;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.model.entityhbm.CashDetail;

public interface CashDetailService extends BaseService<CashDetail>{
	
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
    
    /**
     * 保证金收入支出台账查询方法
     * @param pageBean
     */
	void queryList(PageBean<CashDetail> pageBean);
	
	/**
	 * 查看保证金对账明细
	 * @param cashDetailId  保证金账户id
	 * @return
	 */
	List<CashDetail> getCheckDetail(Long cashDetailId);

}
