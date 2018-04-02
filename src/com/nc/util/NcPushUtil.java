package com.nc.util;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;

import com.nc.model.NcPushMoney;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;
import com.zhiwei.credit.service.creditFlow.finance.SlFundIntentService;
import com.zhiwei.credit.util.Common;


public class NcPushUtil {
	@Resource
	private SlFundIntentService slFundIntentService;
	/**
	 * 取值：年月日时分秒毫秒+一位随机数
	 * 第三方及系统交易流水号共18位
	 * @return 交易流水号
	 */
	public static String createRn() {
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		return sdf.format(date)+Common.getRandomNum(1);
	}
	
	/**
	 * 
	 * 通过还款周期，贷款期限计算贷款类型编码
	 * @return credittype
	 */
	public static String returnCredittype(String type ,Integer number) {
		String credittype = "";
		if(type.equals("dayPay")){//日
			if(number <= 365){
				credittype = NcPushMoney.CREDITTYPE_A1;
			}else{
				credittype = NcPushMoney.CREDITTYPE_A2;
			}
		}else if(type.equals("monthPay")){//月
			if(number <= 12){
				credittype = NcPushMoney.CREDITTYPE_A1;
			}else{
				credittype = NcPushMoney.CREDITTYPE_A2;
			}
		}else if(type.equals("seasonPay")){//季
			if(number <= 4){
				credittype = NcPushMoney.CREDITTYPE_A1;
			}else{
				credittype = NcPushMoney.CREDITTYPE_A2;
			}
		}else if(type.equals("yearPay")){//年
			if(number <= 1){
				credittype = NcPushMoney.CREDITTYPE_A1;
			}else{
				credittype = NcPushMoney.CREDITTYPE_A2;
			}
		}
		return credittype;
	}
	/**
	 * 
	 * 通过担保方式得出担保方式编码
	 * @return guarant
	 */
	public static String returnGuarant(String type) {
		String guarant = "";
		if(type.equals("815")){
			guarant = NcPushMoney.GUARANT_B2;
		}else if(type.equals("816")){
			guarant = NcPushMoney.GUARANT_B3;
		}else if(type.equals("817")){
			guarant = NcPushMoney.GUARANT_B1;
		}else if(type.equals("818")){
			guarant = NcPushMoney.GUARANT_B4;
		}
		return guarant;
	}
	
	public final static String format(Date  date){
		SimpleDateFormat sf =  new SimpleDateFormat("yyyy-MM-dd");
		return sf.format(date);
	}
	
	public final static Date parse(Object  date){
		SimpleDateFormat sf =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			return sf.parse((String) date);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public final static String setScale(Double  d){
		DecimalFormat df = new DecimalFormat("#.00");  
		return df.format(d);
	}
	
	
	
	public static void main(String[] args) {
		System.out.println(parse("2016-06-29 14:29:33"));
	}

}
