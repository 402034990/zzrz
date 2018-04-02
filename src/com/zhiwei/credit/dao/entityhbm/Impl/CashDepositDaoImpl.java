package com.zhiwei.credit.dao.entityhbm.Impl;

import java.util.List;


import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.core.web.paging.PagingBean;
import com.zhiwei.credit.dao.entityhbm.CashDepositDao;
import com.zhiwei.credit.model.entityhbm.CashDeposit;


public class CashDepositDaoImpl extends BaseDaoImpl<CashDeposit>implements CashDepositDao{

   public CashDepositDaoImpl() {
		super(CashDeposit.class);
		
	}

   @Override
	public void addCashDeposit(CashDeposit v) {
		
		getHibernateTemplate().saveOrUpdate(v);
	}

	@Override
	public void saveCashDeposit(CashDeposit v) {
	       super.save(v);
	}


	@Override
	public void updateCashDeposit(CashDeposit v) {
		String hql  = "from CashDeposit bp where bp.id= ? ";
		super.update(hql, v.getId());
		
	}

    @Override
	public List<CashDeposit> selectAll() {
		
		return super.getAll();
	}




	



	



	



	



}
