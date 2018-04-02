package com.zhiwei.credit.service.creditFlow.customer.enterprise;

import com.zhiwei.core.service.BaseService;

public interface AjaxValidatorService {

	public void existEnterName(String enterName,String msg) throws Exception;
	public void existEnterOrganizecode(String enterOrganizecode ,String msg) throws Exception;
	public void existEnterShortname(String enterShortname ,String msg) throws Exception;
	public void existCciaa(String enterOrganizecode ,String msg) throws Exception;
	
	
	//验证企业用户名称是否存在
	public void existEnterName(String enterName,String msg,Integer enterId) throws Exception;
}
