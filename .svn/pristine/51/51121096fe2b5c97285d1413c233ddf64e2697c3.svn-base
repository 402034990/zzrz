package com.zhiwei.credit.service.entityhbm.impl;

import java.util.List;
import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.credit.dao.document.DocFolderDao;
import com.zhiwei.credit.dao.entityhbm.CashDepositDao;
import com.zhiwei.credit.model.entityhbm.CashDeposit;
import com.zhiwei.credit.service.entityhbm.CashDepositService;

public class CashDepositServiceImpl extends BaseServiceImpl<CashDeposit> implements CashDepositService {
	private CashDepositDao dao;
	public CashDepositServiceImpl(CashDepositDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	@Override
	public void saveCashDeposit(CashDeposit v) {
	   dao.saveCashDeposit(v);
	}

	@Override
	public void addCashDeposit(CashDeposit v) {
		dao.addCashDeposit(v);
		
	}

	@Override
	public List<CashDeposit> selectAll() {
		
		return dao.selectAll();
	} 
  
	@Override
	public void updateCashDeposit(CashDeposit v) {
		dao.updateCashDeposit(v);
		
	}

	

}
