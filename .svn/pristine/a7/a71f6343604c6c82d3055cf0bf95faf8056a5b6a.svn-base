package com.zhiwei.credit.action.entityhbm;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.nc.service.NcPushRecordService;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.model.entityhbm.CashDeposit;
import com.zhiwei.credit.model.entityhbm.CashDetail;
import com.zhiwei.credit.model.p2p.BpCustMember;
import com.zhiwei.credit.service.entityhbm.CashDepositService;
import com.zhiwei.credit.service.entityhbm.CashDetailService;

public class CashDepositAction extends BaseAction{
	@Resource
	private CashDepositService cashetService;
	@Resource
	private NcPushRecordService ncPushRecordService;
	
	private  CashDeposit  cashDeposit;
	
	@Resource
    private CashDetailService cashdetailService;
	
	
	public  String selectAll(){
    	List<CashDeposit> list=cashetService.selectAll();
		return SUCCESS;
    }
	private Long id;
	
	//////////////////////////////保存方法、、、、、、、、、、、、、、、、、
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String  rg = this.getRequest() .getParameter("rg");
		String  date = this.getRequest() .getParameter("cashDeposit.createDate");
		SimpleDateFormat dateTimeFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date	dateTime = new Date() ;
		try {
			dateTime = dateTimeFormat.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		if(rg!=null && !"".equals(rg)){
			if(rg.equals("1")){
				cashDeposit.setCustormerType("company_customer");
			}else if(rg.equals("2")){
				cashDeposit.setCustormerType("person_customer");
			}
		}
		//将数据转成JSON格式
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_custormerType_S_EQ", cashDeposit.getCustormerType());
		filter.addFilter("Q_custormerId_L_EQ", cashDeposit.getCustormerId());
		
		if(dateTime!=null   &&!"".equals(dateTime)){
			cashDeposit.setCashdate(dateTime);
		}else{
			cashDeposit.setCashdate(new Date());
		}
		
		List<CashDeposit> list1=cashetService.getAll(filter);
		if(list1.size()>0){
			CashDeposit cashDeposit1=cashetService.get(list1.get(0).getId());
			try{
				BeanUtil.copyNotNullProperties(cashDeposit1, cashDeposit);
				cashetService.save(cashDeposit1);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}else{
			cashetService.save(cashDeposit);
		}
		
		//NC调用推送
		ncPushRecordService.guarantorPush(cashDeposit.getCustormerType(),cashDeposit.getId().toString());
		
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 保证金的查询
	 */
	public  String  list(){
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		//将数据转成JSON格式
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("cashdate","desc");
		List<CashDeposit> list1=cashetService.getAll(filter);
		Type type=new TypeToken<List<BpCustMember>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list1!=null?list1.size():0).append(",result:");
		buff.append(gson.toJson(list1, type));
		buff.append("}");
		jsonString=buff.toString();
		return  SUCCESS;
	}
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		CashDeposit cashDeposit=cashetService.get(id);
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(cashDeposit));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/**
	 * 进行保存
	 * @return
	 */
	public String  saveDetail(){
		String  type =this.getRequest().getParameter("cashDeposit.type");//保证金的操作方式 1 为充值 2 支出
		String  cashDepositId =this.getRequest().getParameter("cashDeposit.id");//获取添加保证金的金额
		String  cashmoney =this.getRequest().getParameter("cashDetail.cashmoney");//获取添加保证金的金额
		String  oprateName = this.getRequest().getParameter("cashDetail.oprateName");//获取添加保证金的操作人
		String  oprateNameId = this.getRequest().getParameter("cashDetail.oprateNameId");//获取添加保证金的操作人
		
		BigDecimal    addMoney = new BigDecimal(cashmoney);
		CashDeposit  cashDeposit=	cashetService.get(Long.valueOf(cashDepositId));//查询保证金的信息
		if(cashDeposit!=null){
			//进行保证金信息的添加操作
			BigDecimal allMoney = null;
			BigDecimal shenyuMoney = null;
			if(cashDeposit.getCashmoney()!=null&&!"".equals(cashDeposit.getCashmoney())){
				allMoney = cashDeposit.getCashmoney();
			}else{
				allMoney = new BigDecimal("0");
			}
			if(cashDeposit.getCashshengyu()   !=null&&!"".equals(cashDeposit.getCashshengyu())){
				shenyuMoney = cashDeposit.getCashshengyu();
			}else{
				shenyuMoney = new BigDecimal("0");
			}
			//进行保存保证金的操作记录添加
			CashDetail  cashdetail = new  CashDetail();
			
			//现在增加保证金的时候不修改保证金账户的保证金金额和保证金剩余金额,只有在对账的时候才修改
			if(type.equals("1")){//充值
				cashDeposit.setCashmoney(allMoney.add(addMoney));//添加总金额
				//cashDeposit.setCashshengyu(shenyuMoney.add(addMoney));//在对账的时候加入
				cashdetail.setCashType(1);//操作类型
				cashdetail.setDeclibtion("保证金充值");//说明
			}else if(type.equals("2")){//支出
				cashDeposit.setCashmoney(allMoney.subtract(addMoney));//总金额减去支出的金额
				//cashDeposit.setCashshengyu(shenyuMoney.subtract(addMoney));//剩余金额减去支出的金额//在对账的时候加入
				cashdetail.setCashType(2);//操作类型
				cashdetail.setDeclibtion("保证金支出");//说明
			}
			cashdetail.setAfterMoney(new BigDecimal(0));//已对账金额
			cashdetail.setNotMoney(addMoney);//未对账金额
			cashDeposit.setCashdate(new Date());//保证金最新操作时间
			cashetService.merge(cashDeposit);
			cashdetail.setCashdepositid(Long.valueOf(cashDepositId));//保证金主键
			cashdetail.setCashmoney(addMoney);//操作金额
			cashdetail.setCreateDate(new  Date());//操作日期
			cashdetail.setOprateName(oprateName);//操作人
			cashdetail.setOprateNameId(Long.valueOf(oprateNameId));
			cashdetail.setState(0);//设置状态
			cashdetailService.save(cashdetail);
		}
		return SUCCESS;
	}
	
    public String saveCashDeposit(){
    	cashetService.saveCashDeposit(cashDeposit);
 		return SUCCESS;
    }
     
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}

    public CashDeposit getCashDeposit() {
		return cashDeposit;
	}
	public void setCashDeposit(CashDeposit cashDeposit) {
		this.cashDeposit = cashDeposit;
	}
}