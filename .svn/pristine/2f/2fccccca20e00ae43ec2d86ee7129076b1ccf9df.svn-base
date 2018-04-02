package com.zhiwei.credit.action.entityhbm;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.nc.service.NcPushRecordService;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.util.JsonUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.model.creditFlow.finance.SlFundQlide;
import com.zhiwei.credit.model.entityhbm.CashDeposit;
import com.zhiwei.credit.model.entityhbm.CashDetail;
import com.zhiwei.credit.service.creditFlow.finance.SlFundQlideService;
import com.zhiwei.credit.service.entityhbm.CashDepositService;
import com.zhiwei.credit.service.entityhbm.CashDetailService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

public class CashdetailAction extends BaseAction{
	@Resource
    private CashDetailService cashdetailService;
	@Resource
	private CashDepositService cashetService;
	@Resource
	private SlFundQlideService slFundQlideService;
	@Resource
	private NcPushRecordService ncPushRecordService;
	
	private  CashDeposit  cashDeposit;
	private CashDetail cashDetail;
	
	/**
	 * 显示列表
	 */
	public String list(){
		String  cashId = this.getRequest().getParameter("cashId");
		String  createDateBegin = this.getRequest().getParameter("createDateBegin");
		String  createDateEnd = this.getRequest().getParameter("createDateEnd");
		String  moneyMin = this.getRequest().getParameter("moneyMin");
		String  moneyMax = this.getRequest().getParameter("moneyMax");
		QueryFilter filter=new QueryFilter(getRequest());
		if(moneyMin!=null &&!"".equals(moneyMin)){
			filter.addFilter("Q_cashmoney_BD_GE", new BigDecimal(moneyMin));
		}
		if(moneyMax!=null &&!"".equals(moneyMax)){
			filter.addFilter("Q_cashmoney_BD_LE", new BigDecimal(moneyMax));
		}
		if(createDateBegin!=null  &&!"".equals(createDateBegin)){
			filter.addFilter("Q_createDate_D_GT", createDateBegin);//添加起始时间
		}
		if(createDateEnd!=null  &&!"".equals(createDateEnd)){
			filter.addFilter("Q_createDate_D_LE", createDateEnd);//添加起始时间
		}
		filter.addFilter("Q_cashdepositid_L_EQ", Long.valueOf(cashId));
		List<CashDetail> list= cashdetailService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		JSONSerializer json = JsonUtil.getJSONSerializer();
		buff.append(json.serialize(list));
		buff.append("}");
		 
		jsonString=buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 保证金收入支出台账查询方法
	 * @return
	 */
	public String queryList(){
		PageBean<CashDetail> pageBean = new PageBean<CashDetail>(start,limit,getRequest());
		cashdetailService.queryList(pageBean);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(pageBean.getTotalCounts()).append(",result:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(pageBean.getResult()));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 保证金对账
	 * @return
	 */
	public String check(){
		BigDecimal money=new BigDecimal(0);//本次对账金额
		String cashDetailId=this.getRequest().getParameter("cashDetailId");//保证金款项id
		String qlideId=this.getRequest().getParameter("qlideId");//流水id
		CashDetail  cashdetail=cashdetailService.get(Long.valueOf(cashDetailId));
		SlFundQlide oldSlFundQlide = slFundQlideService.get(Long.valueOf(qlideId));//流水记录
		//1.比较流水未对账金额和本次对账金额
		if(oldSlFundQlide.getNotMoney().compareTo(cashdetail.getNotMoney())>0){
			money=cashdetail.getNotMoney();
		}else{
			money=oldSlFundQlide.getNotMoney();
		}
		oldSlFundQlide.setAfterMoney(oldSlFundQlide.getAfterMoney().add(money));
		oldSlFundQlide.setNotMoney(oldSlFundQlide.getNotMoney().subtract(money));
		
		//2.修改保证金款项
		cashdetail.setAfterMoney(cashdetail.getAfterMoney().add(money));
		cashdetail.setNotMoney(cashdetail.getNotMoney().subtract(money));
		cashdetail.setFactDate(new Date());
		cashdetail.setSlFundQlide(oldSlFundQlide);
		if(cashdetail.getNotMoney().compareTo(new BigDecimal("0"))==0){
			cashdetail.setState(1);//设置状态
		}
		
		//3.修改保证金账户
		CashDeposit  cashDeposit=cashetService.get(cashdetail.getCashdepositid());
		if(null==cashDeposit.getCashmoney()){
			cashDeposit.setCashmoney(new BigDecimal(0));
		}
		if(null==cashDeposit.getCashshengyu()){
			cashDeposit.setCashshengyu(new BigDecimal(0));
		}
		//根据流失判断是收入还是支出
		if(null!=oldSlFundQlide.getPayMoney() && oldSlFundQlide.getPayMoney().compareTo(new BigDecimal(0))>0){//支出
			cashDeposit.setCashmoney(cashDeposit.getCashmoney().subtract(money));
			cashDeposit.setCashshengyu(cashDeposit.getCashshengyu().subtract(money));
		}else{
			cashDeposit.setCashmoney(cashDeposit.getCashmoney().add(money));
			cashDeposit.setCashshengyu(cashDeposit.getCashshengyu().add(money));
		}
		cashDeposit.setCashdate(new Date());//保证金最新操作时间
		
		slFundQlideService.merge(oldSlFundQlide);
		cashdetailService.merge(cashdetail);
		cashetService.merge(cashDeposit);
		
		//根据流失判断是收入还是支出
		if(null!=oldSlFundQlide.getPayMoney() && oldSlFundQlide.getPayMoney().compareTo(new BigDecimal(0))>0){//支出
			ncPushRecordService.bondReturnPush(cashdetail);
		}else{
			ncPushRecordService.bondCollectPush(cashdetail);
		}
		
		return SUCCESS;
	}
	
	/**
	 * 查看保证金记录对账明细
	 * @return
	 */
	public String getCheckDetail(){
		String cashDetailId=this.getRequest().getParameter("cashdepositid");//保证金款项id
		List<CashDetail> list =cashdetailService.getCheckDetail(Long.valueOf(cashDetailId));
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		JSONSerializer json = JsonUtil.getJSONSerializer("createDate","factDate");
		json.transform(new DateTransformer("yyyy-MM-dd"),new String[]{"createDate","factDate"});
		buff.append(json.serialize(list));
		buff.append("}");
		jsonString = buff.toString();
		
		return SUCCESS;
	}
	
	public String saveCashdetail(){
		cashetService.updateCashDeposit(cashDeposit);
	    cashdetailService.save(cashDetail);
	    return SUCCESS;
	}
	
	public CashDetail getCashDetail() {
		return cashDetail;
	}
	public void setCashDetail(CashDetail cashDetail) {
		this.cashDetail = cashDetail;
	}
	public CashDeposit getCashDeposit() {
		return cashDeposit;
	}
	public void setCashDeposit(CashDeposit cashDeposit) {
		this.cashDeposit = cashDeposit;
	}
}