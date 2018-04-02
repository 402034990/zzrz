package com.zhiwei.credit.action.agentAproval;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.util.BeanUtil;

import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.web.action.BaseAction;


import com.zhiwei.credit.model.agentAproval.BankCredit;
import com.zhiwei.credit.model.agentAproval.BankCreditUserLog;
import com.zhiwei.credit.service.agentAproval.BankCreditService;
import com.zhiwei.credit.service.agentAproval.BankCreditUserLogService;
/**
 * 
 * @author 
 *
 */
public class BankCreditUserLogAction extends BaseAction{
	@Resource
	private BankCreditUserLogService bankCreditUserLogService;
	@Resource
	private BankCreditService bankCreditService;
	
	private BankCreditUserLog bankCreditUserLog;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BankCreditUserLog getBankCreditUserLog() {
		return bankCreditUserLog;
	}

	public void setBankCreditUserLog(BankCreditUserLog bankCreditUserLog) {
		this.bankCreditUserLog = bankCreditUserLog;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		String  bankCreditId= this.getRequest().getParameter("agentId");
		String  startDate = this.getRequest().getParameter("startDate");
		String endDate =  this.getRequest().getParameter("endDate");
		String  aprovalType = this.getRequest().getParameter("aprovalType");
		String approvalMoneyMin = this.getRequest().getParameter("approvalMoneyMin");
		String approvalMoneyMax = this.getRequest().getParameter("approvalMoneyMax");
 
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_bankCreditId_L_EQ", Long.valueOf(bankCreditId));
		filter.addFilter("Q_createtime_D_GT", startDate);//添加起始时间
		filter.addFilter("Q_createtime_D_LE", endDate);//添加结束时间
		filter.addFilter("Q_creditType_SN_EQ", aprovalType);//添加授信类型
		filter.addFilter("Q_creditMoney_BD_LE", approvalMoneyMin);//添加授信类型
		filter.addFilter("Q_creditMoney_BD_LE", approvalMoneyMax);//添加授信类型
		String  bankCreditWayname = "";
		BankCredit  bankCredit =	bankCreditService.get(Long.valueOf(bankCreditId));
		if(bankCredit.getBankCreditWayName()!=null  && !"".equals(bankCredit.getBankCreditWayName())){
			bankCreditWayname = bankCredit.getBankCreditWayName();
		} 	
		 
		
		
		List<BankCreditUserLog> list= bankCreditUserLogService.getAll(filter);
		if(list.size()>0){
			for(int i=0;i<list.size();i++){
				list.get(i).setBankCreditWayName(bankCreditWayname);
			}
		}
		
		Integer  dataCounts = bankCreditUserLogService.getDataCount(this.getRequest());
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		Type type=new TypeToken<List<BankCreditUserLog>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(dataCounts).append(",result:");
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				bankCreditUserLogService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		BankCreditUserLog bankCreditUserLog=bankCreditUserLogService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bankCreditUserLog));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bankCreditUserLog.getId()==null){
			bankCreditUserLogService.save(bankCreditUserLog);
		}else{
			BankCreditUserLog orgBankCreditUserLog=bankCreditUserLogService.get(bankCreditUserLog.getId());
			try{
				BeanUtil.copyNotNullProperties(orgBankCreditUserLog, bankCreditUserLog);
				bankCreditUserLogService.save(orgBankCreditUserLog);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
