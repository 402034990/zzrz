package com.zhiwei.credit.service.entityhbm.impl;

import java.util.List;

import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.dao.entityhbm.CashDetailDao;
import com.zhiwei.credit.model.entityhbm.CashDetail;
import com.zhiwei.credit.service.entityhbm.CashDetailService;

public class CashDetailServiceImpl extends BaseServiceImpl<CashDetail> implements CashDetailService{
    private CashDetailDao dao;
	
    public CashDetailServiceImpl(CashDetailDao dao) {
		super(dao);
		this.dao = dao;
	}
    
	@Override
	public void addCashDetail(CashDetail cashdetail) {
		dao.save(cashdetail);
		
	}
	@Override
	public List<CashDetail> selectAll() {
		
		return dao.getAll();  
	}
	@Override
	public void updateCashDetail(CashDetail v) {
	
		
	}
	@Override
	public void queryList(PageBean<CashDetail> pageBean) {
		dao.queryList(pageBean);
	}

	@Override
	public List<CashDetail> getCheckDetail(Long fundQlideId) {
		return dao.getCheckDetail(fundQlideId);
	}

}