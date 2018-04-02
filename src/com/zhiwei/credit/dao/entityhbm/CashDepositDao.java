package com.zhiwei.credit.dao.entityhbm;

import java.util.List;


import com.zhiwei.core.dao.BaseDao;
import com.zhiwei.credit.model.entityhbm.CashDeposit;


public interface CashDepositDao  extends BaseDao<CashDeposit>{
	/*
	 * 创建保证金表
	 */
	void addCashDeposit(CashDeposit v);
	/**
	 * 
	 * 查询
	 */
    List<CashDeposit> selectAll();
    
    /**
     * 更新保证金
     */
    void updateCashDeposit(CashDeposit v);
    
    void saveCashDeposit(CashDeposit v);
}
