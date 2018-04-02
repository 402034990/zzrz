package com.zhiwei.credit.action.creditFlow.agent;

import java.math.BigDecimal;

import javax.annotation.Resource;

import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.model.creditFlow.agent.SlBailRcord;
import com.zhiwei.credit.model.system.Organization;
import com.zhiwei.credit.service.creditFlow.agent.SlBailRcordService;
import com.zhiwei.credit.service.system.OrganizationService;

public class SlBailRcordAction extends BaseAction {

	private SlBailRcord SlBailRcord;
	private Organization organization;
	@Resource
	private SlBailRcordService SlBailRcordService;
	@Resource
	private OrganizationService organizationService;
	public SlBailRcord getSlBailRcord() {
		return SlBailRcord;
	}
	public void setSlBailRcord(SlBailRcord slBailRcord) {
		SlBailRcord = slBailRcord;
	}
	public String save(){
		if(SlBailRcord!=null){
			SlBailRcord.setId(null);
			SlBailRcord.setOrganizeId(organization.getOrgId());
			SlBailRcordService.save(SlBailRcord);
		}
		if(organization.getOrgId()!=null){
			organization=organizationService.get(organization.getOrgId());
			if(organization.getSumBailMoney()==null||"".equals(organization.getSumBailMoney())){
				organization.setSumBailMoney(SlBailRcord.getBailMoney());
			}else{
				BigDecimal sumMoney=organization.getSumBailMoney();
				organization.setSumBailMoney(SlBailRcord.getBailMoney().add(sumMoney));
			}
			organizationService.merge(organization);
		}
		return SUCCESS;
	}
	public Organization getOrganization() {
		return organization;
	}
	public void setOrganization(Organization organization) {
		this.organization = organization;
	}
}
