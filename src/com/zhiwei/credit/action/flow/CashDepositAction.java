package com.zhiwei.credit.action.flow;

import javax.annotation.Resource;

import com.zhiwei.core.web.action.BaseAction;

import com.zhiwei.credit.model.entityhbm.CashDeposit;
import com.zhiwei.credit.service.entityhbm.CashDepositService;

public class CashDepositAction extends BaseAction{
	
	@Resource 
	private CashDepositService cashdepositservice;
	private  CashDeposit  CashDeposit;
	
	public String addCash(){
		
		String adfad=CashDeposit.getCustormerName();
		cashdepositservice.addCashDeposit(CashDeposit);
		return SUCCESS;
	}
	public CashDepositService getCashdepositservice() {
		return cashdepositservice;
	}
	public void setCashdepositservice(CashDepositService cashdepositservice) {
		this.cashdepositservice = cashdepositservice;
	}
	public CashDeposit getCashDeposit() {
		return CashDeposit;
	}
	public void setCashDeposit(CashDeposit cashDeposit) {
		CashDeposit = cashDeposit;
	}
}
