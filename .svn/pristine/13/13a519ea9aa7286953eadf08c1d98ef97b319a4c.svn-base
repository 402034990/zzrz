package com.zhiwei.credit.service.creditFlow.customer.common;

import java.util.List;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.credit.model.creditFlow.customer.common.EnterpriseBank;

public interface EnterpriseBankService extends BaseService<EnterpriseBank> {
	public List<EnterpriseBank> getBankList(Integer customerId,Short isEnterprise,Short iscredit,Short isInvest);
	public EnterpriseBank getById(Integer id);
	public List<EnterpriseBank> getList(Integer customerId, Short isEnterprise,Short isInvest, Integer start, Integer limit);
	public void add(EnterpriseBank bank);
	public void update(EnterpriseBank bank);
	public EnterpriseBank queryIscredit(Integer customerId, Short isEnterprise,Short isInvest);
	public List<EnterpriseBank> queryAlreadyAccount(Integer id,String accountnum);
	public List<EnterpriseBank> querySomeList(EnterpriseBank enterpriseBank);
	/**
	 * 查找企业或个人的主贷款账户
	 * */
	public EnterpriseBank getByIdAndState(Integer id, Short valueOf);
	public List<EnterpriseBank> getListByIdAndState(Integer personId, Short state);
}
