package com.nc.service.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.nc.dao.NcPushRecordDao;
import com.nc.model.NcPushCustomer;
import com.nc.model.NcPushMoney;
import com.nc.model.NcPushRecord;
import com.nc.service.NcPushRecordService;
import com.nc.util.InterSynConn;
import com.nc.util.NcPushUtil;
import com.zhiwei.core.Constants;
import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.core.util.ContextUtil;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.Enterprise;
import com.zhiwei.credit.model.creditFlow.customer.person.Person;
import com.zhiwei.credit.model.creditFlow.finance.SlActualToCharge;
import com.zhiwei.credit.model.creditFlow.finance.SlChargeDetail;
import com.zhiwei.credit.model.creditFlow.finance.SlFundDetail;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;
import com.zhiwei.credit.model.creditFlow.finance.SlFundQlide;
import com.zhiwei.credit.model.creditFlow.finance.SlPunishDetail;
import com.zhiwei.credit.model.creditFlow.finance.SlPunishInterest;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;
import com.zhiwei.credit.model.entityhbm.CashDeposit;
import com.zhiwei.credit.model.entityhbm.CashDetail;
import com.zhiwei.credit.model.system.AppUser;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.EnterpriseService;
import com.zhiwei.credit.service.creditFlow.customer.person.PersonService;
import com.zhiwei.credit.service.creditFlow.finance.SlActualToChargeService;
import com.zhiwei.credit.service.creditFlow.finance.SlChargeDetailService;
import com.zhiwei.credit.service.creditFlow.finance.SlFundDetailService;
import com.zhiwei.credit.service.creditFlow.finance.SlFundIntentService;
import com.zhiwei.credit.service.creditFlow.finance.SlFundQlideService;
import com.zhiwei.credit.service.creditFlow.finance.SlPunishDetailService;
import com.zhiwei.credit.service.creditFlow.finance.SlPunishInterestService;
import com.zhiwei.credit.service.creditFlow.smallLoan.project.SlSmallloanProjectService;
import com.zhiwei.credit.service.entityhbm.CashDepositService;
import com.zhiwei.credit.service.entityhbm.CashDetailService;

/**
 * 
 * @author 
 *
 */
public class NcPushRecordServiceImpl extends BaseServiceImpl<NcPushRecord> implements NcPushRecordService{
	@SuppressWarnings("unused")
	private NcPushRecordDao dao;
	
	@Resource
	private SlSmallloanProjectService slSmallloanProjectService;
	@Resource
	private SlFundDetailService slFundDetailService;
	@Resource
	private PersonService personService;
	@Resource
	private EnterpriseService enterpriseService;
	@Resource
	private SlPunishDetailService slPunishDetailService;
	@Resource
	private SlPunishInterestService slPunishInterestService;
	@Resource
	private SlFundQlideService slFundQlideService;
	@Resource
	private CashDetailService cashDetailService;
	@Resource
	private CashDepositService cashDepositService;
	@Resource
	private SlChargeDetailService slChargeDetailService;
	@Resource
	private SlFundIntentService slFundIntentService;
	@Resource
	private SlActualToChargeService slActualToChargeService;
	
	public NcPushRecordServiceImpl(NcPushRecordDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public void loanPush(SlFundDetail sd) {
		if(null != sd && !"".equals(sd) && null != sd.getFundDetailId()){
			//对账明细
			SlFundDetail slFundDetail = slFundDetailService.get(Long.valueOf(sd.getFundDetailId()));
			//资金明细
			SlFundIntent fundIntent = slFundIntentService.get(slFundDetail.getSlFundIntent().getFundIntentId());
			//流水明细
			SlFundQlide slFundQlide = slFundQlideService.get(slFundDetail.getSlFundQlide().getFundQlideId());
			//项目信息
			SlSmallloanProject project = slSmallloanProjectService.get(fundIntent.getProjectId());
			//客户信息
			String custid = "";
			String cust = "";
			if(project.getOppositeType().equals("person_customer")){//个人客户
				Person person = personService.getById(project.getOppositeID().intValue());
				custid = person.getPersonNumber();
				cust = person.getName();
			}else{//企业客户
				Enterprise enterprise = enterpriseService.getById(project.getOppositeID().intValue());
				custid = enterprise.getEnterpriseNumber();
				cust = enterprise.getEnterprisename();
			}
			String credittype = NcPushUtil.returnCredittype(project.getPayaccrualType(), project.getPayintentPeriod());
			
			String busid = NcPushUtil.createRn();
			//与对账明细表建立关联关系
			slFundDetail.setRequestNo(busid);
			slFundDetailService.merge(slFundDetail);
			
			NcPushMoney ncPushMoney = new NcPushMoney();
			ncPushMoney.setBusid(busid);
			ncPushMoney.setCorp(NcPushMoney.CORP_1002);
			ncPushMoney.setCredittype(credittype);
			if(project.getAssuretypeid()!=null && !project.getAssuretypeid().equals("")){
				String guarant = NcPushUtil.returnGuarant(project.getAssuretypeid());
				ncPushMoney.setGuarant(guarant);
			}
			ncPushMoney.setAmount(slFundDetail.getAfterMoney());
			ncPushMoney.setBusidate(NcPushUtil.format(slFundQlide.getFactDate()));
			ncPushMoney.setCorpaccount(slFundQlide.getMyAccount());
			ncPushMoney.setCustid(custid);
			ncPushMoney.setCust(cust);
			ncPushMoney.setPrincipal(new BigDecimal("0"));
			ncPushMoney.setAccrual(new BigDecimal("0"));
			ncPushMoney.setOveraccrual(new BigDecimal("0"));
			ncPushMoney.setPenalty(new BigDecimal("0"));
			ncPushMoney.setDefaultmny(new BigDecimal("0"));
			ncPushMoney.setEntrustamount(new BigDecimal("0"));
			ncPushMoney.setAcctax(new BigDecimal("0"));
			ncPushMoney.setOveracctax(new BigDecimal("0"));
			ncPushMoney.setPentax(new BigDecimal("0"));
			ncPushMoney.setEntrustax(new BigDecimal("0"));
			ncPushMoney.setFee(new BigDecimal("0"));
			ncPushMoney.setOpttype(NcPushMoney.OPTTYPE_1);
			ncPushMoney.setUndo(NcPushMoney.UNDO_1);
			ncPushMoney.setVoperatorid(slFundDetail.getCheckuser());
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("busid",busid);
			JSONArray json = JSONArray.fromObject(ncPushMoney); 
			map.put("json", json);
			map.put("serviceType", NcPushRecord.HRY_1000);
			//插入推送记录表
			this.insertRecord(map);
		}
	}
	
	@Override
	public void repaymentPush(SlFundDetail sd) {
		if(null != sd && !"".equals(sd) && null != sd.getFundDetailId()){
			//对账明细
			SlFundDetail slFundDetail = slFundDetailService.get(sd.getFundDetailId());
			//资金明细
			SlFundIntent fundIntent = slFundIntentService.get(slFundDetail.getSlFundIntent().getFundIntentId());
			//流水明细
			SlFundQlide slFundQlide = slFundQlideService.get(slFundDetail.getSlFundQlide().getFundQlideId());
			//项目信息
			SlSmallloanProject project = slSmallloanProjectService.get(fundIntent.getProjectId());
			//客户信息
			String custid = "";
			String cust = "";
			if(project.getOppositeType().equals("person_customer")){//个人客户
				Person person = personService.getById(project.getOppositeID().intValue());
				custid = person.getPersonNumber();
				cust = person.getName();
			}else{//企业客户
				Enterprise enterprise = enterpriseService.getById(project.getOppositeID().intValue());
				custid = enterprise.getEnterpriseNumber();
				cust = enterprise.getEnterprisename();
			}
			String credittype = NcPushUtil.returnCredittype(project.getPayaccrualType(), project.getPayintentPeriod());
			String guarant = NcPushUtil.returnGuarant(project.getAssuretypeid());
			String busid = NcPushUtil.createRn();
			//与对账明细表建立关联关系
			slFundDetail.setRequestNo(busid);
			slFundDetailService.merge(slFundDetail);
			NcPushMoney ncPushMoney = new NcPushMoney();
			ncPushMoney.setBusid(busid);
			ncPushMoney.setCorp(NcPushMoney.CORP_1002);
			ncPushMoney.setCredittype(credittype);
			ncPushMoney.setGuarant(guarant);
			ncPushMoney.setBusidate(NcPushUtil.format(slFundQlide.getFactDate()));
			ncPushMoney.setCorpaccount(slFundQlide.getMyAccount());
			ncPushMoney.setCustid(custid);
			ncPushMoney.setCust(cust);
			
			
			if(fundIntent.getFundType().equals("principalRepayment")){//本金偿还
				ncPushMoney.setAmount(slFundDetail.getAfterMoney());
				ncPushMoney.setPrincipal(slFundDetail.getAfterMoney());
				ncPushMoney.setAccrual(new BigDecimal("0"));
				ncPushMoney.setAcctax(new BigDecimal("0"));
				ncPushMoney.setDefaultmny(new BigDecimal("0"));
			}else if(fundIntent.getFundType().equals("interestPenalty")){//提前还款违约金
				ncPushMoney.setAmount(slFundDetail.getAfterMoney());
				ncPushMoney.setPrincipal(new BigDecimal("0"));
				ncPushMoney.setAccrual(new BigDecimal("0"));
				ncPushMoney.setAcctax(new BigDecimal("0"));
				ncPushMoney.setDefaultmny(slFundDetail.getAfterMoney());
			}else{//利息偿还
				ncPushMoney.setAmount(slFundDetail.getAfterMoney());
				ncPushMoney.setPrincipal(new BigDecimal("0"));
				ncPushMoney.setAccrual(slFundDetail.getAfterMoney());
				ncPushMoney.setAcctax(slFundDetail.getAfterMoney().multiply(Constants.TAX).setScale(2, BigDecimal.ROUND_HALF_UP));
				ncPushMoney.setDefaultmny(new BigDecimal("0"));
			}
			ncPushMoney.setOveraccrual(new BigDecimal("0"));
			ncPushMoney.setPenalty(new BigDecimal("0"));
			ncPushMoney.setEntrustamount(new BigDecimal("0"));
			ncPushMoney.setOveracctax(new BigDecimal("0"));
			ncPushMoney.setPentax(new BigDecimal("0"));
			ncPushMoney.setEntrustax(new BigDecimal("0"));
			ncPushMoney.setFee(new BigDecimal("0"));
			ncPushMoney.setOpttype(NcPushMoney.OPTTYPE_2);
			ncPushMoney.setUndo(NcPushMoney.UNDO_1);
			ncPushMoney.setVoperatorid(slFundDetail.getCheckuser());
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("busid",busid);
			JSONArray json = JSONArray.fromObject(ncPushMoney); 
			map.put("json", json);
			map.put("serviceType", NcPushRecord.HRY_1001);
			//插入推送记录表
			this.insertRecord(map);
		}
	}
	
	@Override
	public void penaltyPush(SlPunishDetail spd) {
		if(null !=spd && !"".equals(spd) && null != spd.getPunishDetailId()){
			//罚息对账明细
			SlPunishDetail slPunishDetail = slPunishDetailService.get(spd.getPunishDetailId());
			//罚息资金明细
			SlPunishInterest slPunishInterest = slPunishInterestService.get(slPunishDetail.getPunishInterestId());
			//流水明细
			SlFundQlide slFundQlide = slFundQlideService.get(slPunishDetail.getFundQlideId());
			//项目信息
			SlSmallloanProject project = slSmallloanProjectService.get(slPunishInterest.getProjectId());
			//客户信息
			String custid = "";
			String cust = "";
			if(project.getOppositeType().equals("person_customer")){//个人客户
				Person person = personService.getById(project.getOppositeID().intValue());
				custid = person.getPersonNumber();
				cust = person.getName();
			}else{//企业客户
				Enterprise enterprise = enterpriseService.getById(project.getOppositeID().intValue());
				custid = enterprise.getEnterpriseNumber();
				cust = enterprise.getEnterprisename();
			}
			String credittype = NcPushUtil.returnCredittype(project.getPayaccrualType(), project.getPayintentPeriod());
			
			String busid = NcPushUtil.createRn();
			//与罚息对账表建立关联关系
			slPunishDetail.setRequestNo(busid);
			slPunishDetailService.merge(slPunishDetail);
			
			
			NcPushMoney ncPushMoney = new NcPushMoney();
			ncPushMoney.setBusid(busid);
			ncPushMoney.setCorp(NcPushMoney.CORP_1002);
			ncPushMoney.setCredittype(credittype);
			if(project.getAssuretypeid()!=null && !project.getAssuretypeid().equals("")){
				String guarant = NcPushUtil.returnGuarant(project.getAssuretypeid());
				ncPushMoney.setGuarant(guarant);
			}
			ncPushMoney.setBusidate(NcPushUtil.format(slFundQlide.getFactDate()));
			ncPushMoney.setCorpaccount(slFundQlide.getMyAccount());
			ncPushMoney.setCustid(custid);
			ncPushMoney.setCust(cust);
			
			if(slPunishInterest.getType().compareTo(Short.valueOf("1"))==0){//逾期
				ncPushMoney.setAmount(slPunishDetail.getAfterMoney());
				ncPushMoney.setOveraccrual(slPunishDetail.getAfterMoney());
				ncPushMoney.setOveracctax(slPunishDetail.getAfterMoney().multiply(Constants.TAX).setScale(2, BigDecimal.ROUND_HALF_UP));
				ncPushMoney.setPenalty(new BigDecimal("0"));
				ncPushMoney.setPentax(new BigDecimal("0"));
			}else{//罚息
				ncPushMoney.setAmount(slPunishDetail.getAfterMoney());
				ncPushMoney.setOveraccrual(new BigDecimal("0"));
				ncPushMoney.setOveracctax(new BigDecimal("0"));
				ncPushMoney.setPenalty(slPunishDetail.getAfterMoney());
				ncPushMoney.setPentax(slPunishDetail.getAfterMoney().multiply(Constants.TAX).setScale(2, BigDecimal.ROUND_HALF_UP));
			}
			
			ncPushMoney.setPrincipal(new BigDecimal("0"));
			ncPushMoney.setAccrual(new BigDecimal("0"));
			ncPushMoney.setDefaultmny(new BigDecimal("0"));
			ncPushMoney.setEntrustamount(new BigDecimal("0"));
			ncPushMoney.setAcctax(new BigDecimal("0"));
			ncPushMoney.setEntrustax(new BigDecimal("0"));
			ncPushMoney.setFee(new BigDecimal("0"));
			ncPushMoney.setOpttype(NcPushMoney.OPTTYPE_2);
			ncPushMoney.setUndo(NcPushMoney.UNDO_1);
			ncPushMoney.setVoperatorid(slPunishDetail.getCheckuser());
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("busid",busid);
			
			JSONArray json = JSONArray.fromObject(ncPushMoney); 
			map.put("json", json);
			map.put("serviceType", NcPushRecord.HRY_1001);
			//插入推送记录表
			this.insertRecord(map);
		}
	}
	
	
	@Override
	public void bondCollectPush(CashDetail cd) {
		if(null != cd && !"".equals(cd) && null != cd.getId()){
			//保证金与对账明细
			CashDetail cashDetail = cashDetailService.get(cd.getId());
			//流水明细
			SlFundQlide slFundQlide = slFundQlideService.get(cashDetail.getSlFundQlide().getFundQlideId());
			//保证金账户信息
			CashDeposit cashDeposit = cashDepositService.get(cashDetail.getCashdepositid());
			String busid = NcPushUtil.createRn();
			//与保证金对账明细建立关联关系
			cashDetail.setRequestNo(busid);
			cashDetailService.merge(cashDetail);
			
			
			NcPushMoney ncPushMoney = new NcPushMoney();
			ncPushMoney.setBusid(busid);
			ncPushMoney.setCorp(NcPushMoney.CORP_1002);
			ncPushMoney.setCredittype("");
			ncPushMoney.setGuarant("");
			ncPushMoney.setAmount(cashDetail.getAfterMoney());
			ncPushMoney.setBusidate(NcPushUtil.format(slFundQlide.getFactDate()));
			ncPushMoney.setCorpaccount(slFundQlide.getMyAccount());
			ncPushMoney.setCustid(cashDeposit.getCustormerNum());
			ncPushMoney.setCust(cashDeposit.getCustormerName());
			ncPushMoney.setPrincipal(new BigDecimal("0"));
			ncPushMoney.setAccrual(new BigDecimal("0"));
			ncPushMoney.setOveraccrual(new BigDecimal("0"));
			ncPushMoney.setPenalty(new BigDecimal("0"));
			ncPushMoney.setDefaultmny(new BigDecimal("0"));
			ncPushMoney.setEntrustamount(new BigDecimal("0"));
			ncPushMoney.setAcctax(new BigDecimal("0"));
			ncPushMoney.setOveracctax(new BigDecimal("0"));
			ncPushMoney.setPentax(new BigDecimal("0"));
			ncPushMoney.setEntrustax(new BigDecimal("0"));
			ncPushMoney.setFee(new BigDecimal("0"));
			ncPushMoney.setOpttype(NcPushMoney.OPTTYPE_3);
			ncPushMoney.setUndo(NcPushMoney.UNDO_1);
			
			AppUser appUser = ContextUtil.getCurrentUser();
			String pushUserName = "";
			if(null != appUser && !"".equals(appUser)){
				pushUserName = appUser.getFullname();
			}
			ncPushMoney.setVoperatorid(pushUserName);
			
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("busid",busid);
			JSONArray json = JSONArray.fromObject(ncPushMoney); 
			map.put("json", json);
			map.put("serviceType", NcPushRecord.HRY_1002);
			//插入推送记录表
			this.insertRecord(map);
		}
	}

	@Override
	public void bondReturnPush(CashDetail cd) {
		if(null != cd && !"".equals(cd) && null != cd.getId()){
			//保证金与对账明细
			CashDetail cashDetail = cashDetailService.get(cd.getId());
			//流水明细
			SlFundQlide slFundQlide = slFundQlideService.get(cashDetail.getSlFundQlide().getFundQlideId());
			//保证金账户信息
			CashDeposit cashDeposit = cashDepositService.get(cashDetail.getCashdepositid());
			String busid = NcPushUtil.createRn();
			//与保证金对账明细建立关联关系
			cashDetail.setRequestNo(busid);
			cashDetailService.merge(cashDetail);
			
			NcPushMoney ncPushMoney = new NcPushMoney();
			ncPushMoney.setBusid(busid);
			ncPushMoney.setCorp(NcPushMoney.CORP_1002);
			ncPushMoney.setCredittype("");
			ncPushMoney.setGuarant("");
			ncPushMoney.setAmount(cashDetail.getAfterMoney());
			ncPushMoney.setBusidate(NcPushUtil.format(slFundQlide.getFactDate()));
			ncPushMoney.setCorpaccount(slFundQlide.getMyAccount());
			ncPushMoney.setCustid(cashDeposit.getCustormerNum());
			ncPushMoney.setCust(cashDeposit.getCustormerName());
			ncPushMoney.setPrincipal(new BigDecimal("0"));
			ncPushMoney.setAccrual(new BigDecimal("0"));
			ncPushMoney.setOveraccrual(new BigDecimal("0"));
			ncPushMoney.setPenalty(new BigDecimal("0"));
			ncPushMoney.setDefaultmny(new BigDecimal("0"));
			ncPushMoney.setEntrustamount(new BigDecimal("0"));
			ncPushMoney.setAcctax(new BigDecimal("0"));
			ncPushMoney.setOveracctax(new BigDecimal("0"));
			ncPushMoney.setPentax(new BigDecimal("0"));
			ncPushMoney.setEntrustax(new BigDecimal("0"));
			ncPushMoney.setFee(new BigDecimal("0"));
			ncPushMoney.setOpttype(NcPushMoney.OPTTYPE_4);
			ncPushMoney.setUndo(NcPushMoney.UNDO_1);
			
			AppUser appUser = ContextUtil.getCurrentUser();
			String pushUserName = "";
			if(null != appUser && !"".equals(appUser)){
				pushUserName = appUser.getFullname();
			}
			ncPushMoney.setVoperatorid(pushUserName);
			
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("busid",busid);
			JSONArray json = JSONArray.fromObject(ncPushMoney); 
			map.put("json", json);
			map.put("serviceType", NcPushRecord.HRY_1003);
			//插入推送记录表
			this.insertRecord(map);
		}
	}
	
	@Override
	public void chargePush(SlChargeDetail scd) {
		if(null != scd && !"".equals(scd) && null != scd.getChargeDetailId()){
			//费用对账明细
			SlChargeDetail slChargeDetail = slChargeDetailService.get(scd.getChargeDetailId());
			//流水明细
			SlFundQlide slFundQlide = slFundQlideService.get(slChargeDetail.getSlFundQlide().getFundQlideId());
			//费用明细
			SlActualToCharge slActualToCharge = slActualToChargeService.get(slChargeDetail.getSlActualToCharge().getActualChargeId());
			//项目信息
			SlSmallloanProject project = slSmallloanProjectService.get(slActualToCharge.getProjectId());
			//客户信息
			String custid = "";
			String cust = "";
			if(project.getOppositeType().equals("person_customer")){//个人客户
				Person person = personService.getById(project.getOppositeID().intValue());
				custid = person.getPersonNumber();
				cust = person.getName();
			}else{//企业客户
				Enterprise enterprise = enterpriseService.getById(project.getOppositeID().intValue());
				custid = enterprise.getEnterpriseNumber();
				cust = enterprise.getEnterprisename();
			}
			String busid = NcPushUtil.createRn();
			//与费用对账明细建立关联关系
			slChargeDetail.setRequestNo(busid);
			slChargeDetailService.merge(slChargeDetail);
			
			NcPushMoney ncPushMoney = new NcPushMoney();
			ncPushMoney.setBusid(busid);
			ncPushMoney.setCorp(NcPushMoney.CORP_1002);
			ncPushMoney.setCredittype("");
			ncPushMoney.setGuarant("");
			ncPushMoney.setAmount(slChargeDetail.getAfterMoney());
			ncPushMoney.setBusidate(NcPushUtil.format(slFundQlide.getFactDate()));
			ncPushMoney.setCorpaccount(slFundQlide.getMyAccount());
			ncPushMoney.setCustid(custid);
			ncPushMoney.setCust(cust);
			ncPushMoney.setPrincipal(new BigDecimal("0"));
			ncPushMoney.setAccrual(new BigDecimal("0"));
			ncPushMoney.setOveraccrual(new BigDecimal("0"));
			ncPushMoney.setPenalty(new BigDecimal("0"));
			ncPushMoney.setDefaultmny(new BigDecimal("0"));
			ncPushMoney.setEntrustamount(new BigDecimal("0"));
			ncPushMoney.setAcctax(new BigDecimal("0"));
			ncPushMoney.setOveracctax(new BigDecimal("0"));
			ncPushMoney.setPentax(new BigDecimal("0"));
			ncPushMoney.setEntrustax(new BigDecimal("0"));
			ncPushMoney.setFee(new BigDecimal("0"));
			ncPushMoney.setOpttype(NcPushMoney.OPTTYPE_5);
			ncPushMoney.setUndo(NcPushMoney.UNDO_1);
			ncPushMoney.setVoperatorid(slChargeDetail.getCheckuser());
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("busid",busid);
			JSONArray json = JSONArray.fromObject(ncPushMoney); 
			map.put("json", json);
			map.put("serviceType", NcPushRecord.HRY_1004);
			//插入推送记录表
			this.insertRecord(map);
		}
	}
	
	@Override
	public void newCustomersPush(String customerType, String id) {
		if(null != customerType && !"".equals(customerType) && null !=id && !"".equals(id)){
			//客户信息
			String vcode = "";
			String vname = "";
			Integer custkind = 1;
			String busid = NcPushUtil.createRn();
			if(customerType.equals("person_customer")){//个人客户
				Person person = personService.getById(Integer.valueOf(id));
				vcode = person.getPersonNumber();
				vname = person.getName();
				custkind = NcPushCustomer.CUSTKIND_1;
				person.setRequestNo(busid);
				personService.merge(person);
			}else{//企业客户
				Enterprise enterprise = enterpriseService.getById(Integer.valueOf(id));
				vcode = enterprise.getEnterpriseNumber();
				vname = enterprise.getEnterprisename();
				custkind = NcPushCustomer.CUSTKIND_2;
				enterprise.setRequestNo(busid);
				enterpriseService.merge(enterprise);
			}
			
			//与客户表建立关联关系
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("busid",busid);
			map.put("vcode",vcode);
			map.put("vname",vname);
			map.put("custkind",custkind);
			map.put("opttype",NcPushCustomer.OPTTYPE_1);
			JSONArray json = JSONArray.fromObject(map); 
			map.put("json", json);
			map.put("serviceType", NcPushRecord.HRY_1005);
			//插入推送记录表
			this.insertRecord(map);
		}
	}
	
	@Override
	public void guarantorPush(String customerType, String id) {
		if(null != customerType && !"".equals(customerType) && null !=id && !"".equals(id)){
			//客户信息
			CashDeposit cashDeposit = cashDepositService.get(Long.valueOf(id));
			String vcode = "";
			String vname = "";
			Integer custkind = 1;
			if(cashDeposit.getCustormerType().equals("person_customer")){//个人客户
				custkind = NcPushCustomer.CUSTKIND_1;
			}else{//企业客户
				custkind = NcPushCustomer.CUSTKIND_2;
			}
			
			vcode = cashDeposit.getCustormerNum();
			vname = cashDeposit.getCustormerName();
			String busid = NcPushUtil.createRn();
			cashDeposit.setRequestNo(busid);
			cashDepositService.merge(cashDeposit);
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("busid",busid);
			map.put("vcode",vcode);
			map.put("vname",vname);
			map.put("custkind",custkind);
			map.put("opttype",NcPushCustomer.OPTTYPE_2);
			JSONArray json = JSONArray.fromObject(map); 
			map.put("json", json);
			map.put("serviceType", NcPushRecord.HRY_1006);
			//插入推送记录表
			this.insertRecord(map);
		}
	}
	
	
	@Override
	public void backoutPush(String requestNo) {
		if(null !=requestNo && !"".equals(requestNo)){
			List<NcPushRecord> ncList = dao.getByRequestNo(requestNo,null);
			if(null !=ncList && ncList.size()>0){
				String pushData = ncList.get(0).getPushData();
				Map<String, Object> data = new HashMap<String, Object>();  
				JSONObject jsonObject = JSONObject.fromObject(pushData.substring(1, pushData.length()-1)); 
				Iterator it = jsonObject.keys();  
				//遍历jsonObject数据，添加到Map对象  
				while (it.hasNext()){
			        String key = String.valueOf(it.next());  
			        Object value = jsonObject.get(key);  
			        data.put(key, value);  
			    }
				data.put("undo", 2);
				JSONArray json = JSONArray.fromObject(data);
				data.put("id", ncList.get(0).getId());
				data.put("json", json);
				data.put("serviceType", NcPushRecord.HRY_1009);
				this.insertRecord(data);
			}
		}
	}

	
	

	@Override
	public void insertRecord(Map<String, Object> map) {
		NcPushRecord ncPushRecord = new NcPushRecord();
		ncPushRecord.setServiceType(map.get("serviceType").toString());
		ncPushRecord.setPushData(map.get("json").toString());
		ncPushRecord.setRequestNo(map.get("busid").toString());
		ncPushRecord.setPushNumber(0);
		AppUser appUser = ContextUtil.getCurrentUser();
		String pushUserName = "自动推送";
		Long pushUserId = null;
		if(null != appUser && !"".equals(appUser)){
			pushUserName = appUser.getFullname();
			pushUserId = appUser.getUserId();
		}
		ncPushRecord.setPushUserName(pushUserName);
		ncPushRecord.setPushUserId(pushUserId);
		ncPushRecord.setCreateDate(new Date());
		ncPushRecord.setUpdateDate(new Date());
		ncPushRecord.setState(NcPushRecord.STATE_2);
		//如果为撤销对账，建立内部关联关系
		if(ncPushRecord.getServiceType().equals(NcPushRecord.HRY_1009)){
			ncPushRecord.setInsideId(Long.valueOf(map.get("id").toString()));
		}
		dao.save(ncPushRecord);
		
		//调用推送方法
		this.pushNc(ncPushRecord);
	}
	
	@Override
	public void updateRecord(Map<String, Object> map) {
		if(map.containsKey("busid") && null !=map.get("busid")){
			String busid = map.get("busid").toString();
			String code = map.get("code").toString();
			String statusInfo = map.get("statusInfo").toString();
			String returndate = map.get("returndate").toString();
			
			List<NcPushRecord> ncList = dao.getByRequestNo(busid,null);
			if(null != ncList && ncList.size()==1){//对账推送
				NcPushRecord ncPushRecord = ncList.get(0);
				ncPushRecord.setPushNumber(ncPushRecord.getPushNumber()+1);
				ncPushRecord.setUpdateDate(new Date());
				ncPushRecord.setReturnCode(code);
				ncPushRecord.setReturnMsg(statusInfo);
				ncPushRecord.setReturnDate(NcPushUtil.parse(returndate));
				try {
					dao.merge(ncPushRecord);
					dao.flush();
				} catch (Exception e) {
					e.printStackTrace();
				}
				
			}else{//撤销对账推送
				for(NcPushRecord nr : ncList){
					if(nr.getServiceType().equals(NcPushRecord.HRY_1009)){
						nr.setPushNumber(nr.getPushNumber()+1);
						nr.setUpdateDate(new Date());
						nr.setReturnCode(code);
						nr.setReturnMsg(statusInfo);
						nr.setReturnDate(NcPushUtil.parse(returndate));
						dao.merge(nr);
						dao.flush();
					}else{
						nr.setState(NcPushRecord.STATE_1);
						dao.merge(nr);
						dao.flush();
					}
				}
			}
		}
	}

	@Override
	public void automaticPush() {
		this.again(null);
	}

	@Override
	public Map<String, Object> manualPush(Long id) {
		Map<String, Object> resultMap = this.again(id);
		return resultMap;
	}
	
	public Map<String, Object> again(Long id) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<NcPushRecord> urList = new ArrayList<NcPushRecord>();
		if(null != id && !"".equals(id)){
			urList.add(dao.get(id));
		}else{
			urList = dao.getByFail();
		}
		if(urList.size()>0){
			for(NcPushRecord ncPushRecord : urList){
				//返回状态码是200和300的不能再次推送
				if(null ==ncPushRecord.getReturnCode() || (!ncPushRecord.getReturnCode().equals("200") && !ncPushRecord.getReturnCode().equals("300"))){
					//再次推送之前先查询下是否NC方已经记录，如果没有记录，再进行推送，反之，直接修改本地记录，不再再次推送
					Map<String, Object> queryMap = this.queryNc(ncPushRecord);
					if(queryMap.containsKey("code") && !queryMap.get("code").equals("200")){
						resultMap = this.pushNc(ncPushRecord);
					}else if(queryMap.containsKey("code") && queryMap.get("code").equals("200")){
						resultMap.put("code", "1000");
					}
				}
			}
		}
		return resultMap;
	}

	@Override
	public void listAll(PageBean<NcPushRecord> pageBean) {
		dao.listAll(pageBean);
	}
	
	/**
	 * 通过webService调用NC推送
	 * @param ncPushRecord
	 */
	public Map<String, Object> pushNc(NcPushRecord ncPushRecord) {
		//通过webService调用NC推送
		Map<String, Object> resultMap = new HashMap<String, Object>();  
		try {
			InterSynConn service = new InterSynConn();
			String methodName = "";
			if(ncPushRecord.getServiceType().equals(NcPushRecord.HRY_1005) 
					|| ncPushRecord.getServiceType().equals(NcPushRecord.HRY_1006)){//客户类型方法
				methodName = "synCustData";
			}else{
				methodName = "synData";
			}
			String applyret = service.invoke(methodName, ncPushRecord.getPushData());
			System.out.print("返回数据"+applyret);
			//处理返回结果
			if(applyret != null){
				JSONObject jsonObject = JSONObject.fromObject(applyret.substring(1, applyret.length()-1)); 
				Iterator it = jsonObject.keys();  
				//遍历jsonObject数据，添加到Map对象  
				while (it.hasNext()){
			        String key = String.valueOf(it.next());  
			        Object value = jsonObject.get(key);  
			        resultMap.put(key, value);  
			    }
				//根据返回码处理业务
				this.updateRecord(resultMap);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * 通过webService调用NC查询
	 * @param ncPushRecord
	 */
	public Map<String, Object> queryNc(NcPushRecord ncPushRecord) {
		//通过webService调用NC推送
		Map<String, Object> resultMap = new HashMap<String, Object>();  
		try {
			Map<String, Object> dataMap = new HashMap<String, Object>();  
			InterSynConn service = new InterSynConn();
			String methodName = "";
			if(ncPushRecord.getServiceType().equals(NcPushRecord.HRY_1005) 
					|| ncPushRecord.getServiceType().equals(NcPushRecord.HRY_1006)){//客户类型查询方法
				methodName = "qryCustData";
				NcPushCustomer npc = (NcPushCustomer) JSONObject.toBean(JSONObject.fromObject(
						ncPushRecord.getPushData().substring(1, ncPushRecord.getPushData().length()-1)), NcPushCustomer.class);
				dataMap.put("busid", npc.getBusid());
				dataMap.put("vcode", npc.getVcode());
				dataMap.put("opttype", npc.getOpttype());
			}else{//财务类查询方法
				methodName = "qryData";
				//把推送数据json转换为对象，查询对应参数
				NcPushMoney npm = (NcPushMoney) JSONObject.toBean(JSONObject.fromObject(
						ncPushRecord.getPushData().substring(1, ncPushRecord.getPushData().length()-1)), NcPushMoney.class);
				dataMap.put("busid", npm.getBusid());
				dataMap.put("opttype", npm.getOpttype());
			}
			
			JSONArray json = JSONArray.fromObject(dataMap); 
			String applyret = service.invoke(methodName, json.toString());
			System.out.print("返回数据"+applyret);
			//处理返回结果
			if(applyret != null){
				JSONObject jsonObject = JSONObject.fromObject(applyret.substring(1, applyret.length()-1)); 
				Iterator it = jsonObject.keys();  
				//遍历jsonObject数据，添加到Map对象  
				while (it.hasNext()){
			        String key = String.valueOf(it.next());  
			        Object value = jsonObject.get(key);  
			        resultMap.put(key, value);  
			    }
				//根据返回码处理业务
				if(resultMap.get("code").equals("200")){//查询成功的的时候才需要处理业务
					this.updateRecord(resultMap);
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultMap;
	}
	
	
	
	public static void main(String[] args) {
        try {
	       /* Service service = new Service();
	        Call call = (Call) service.createCall();
	        call.setTargetEndpointAddress("http://192.168.46.44:8888/uapws/service/nc.itf.mc.ISynDataService?wsdl");
	        call.setOperationName("synCustData");
	        call.addParameter("request", XMLType.XSD_STRING,ParameterMode.IN);
	        call.setReturnType(XMLType.XSD_STRING);
	        String request = "";
	        System.out.println(call.invoke(new Object[] {request}));*/
        	InterSynConn service = new InterSynConn();
			String applyret = service.invoke("qryCustData", "[{\"opttype\":1,\"vcode\":\"10000007\",\"busid\":\"251606291846116011\"}]");
        	//String applyret = service.invoke("qryData", "[{\"opttype\":3,\"busid\":\"201606291840546375\"}]");
			System.out.print("返回数据"+applyret);
		} catch (Exception e) {
	        e.printStackTrace();
	    }
	}
	

}