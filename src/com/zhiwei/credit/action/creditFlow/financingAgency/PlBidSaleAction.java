package com.zhiwei.credit.action.creditFlow.financingAgency;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import java.lang.reflect.Type;
import java.math.BigDecimal;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.hurong.credit.util.Common;
import com.zhiwei.core.Constants;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.util.DateUtil;
import com.zhiwei.core.util.JsonUtil;

import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.core.web.paging.PagingBean;


import com.zhiwei.credit.dao.creditFlow.finance.BpFundIntentDao;
import com.zhiwei.credit.model.creditFlow.finance.BpFundIntent;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidInfo;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidPlan;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidSale;
import com.zhiwei.credit.model.creditFlow.creditAssignment.bank.ObAccountDealInfo;
import com.zhiwei.credit.model.creditFlow.creditAssignment.bank.ObSystemAccount;
import com.zhiwei.credit.model.p2p.BpCustMember;
import com.zhiwei.credit.service.creditFlow.creditAssignment.bank.ObAccountDealInfoService;
import com.zhiwei.credit.service.creditFlow.finance.BpFundIntentService;
import com.zhiwei.credit.service.creditFlow.financingAgency.PlBidInfoService;
import com.zhiwei.credit.service.creditFlow.financingAgency.PlBidSaleService;
import com.zhiwei.credit.service.p2p.BpCustMemberService;
import com.zhiwei.credit.util.MyUserSession;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author 
 *
 */
public class PlBidSaleAction extends BaseAction{
	@Resource
	private PlBidSaleService plBidSaleService;
	@Resource
	private PlBidInfoService plBidInfoService;
	@Resource
	private BpFundIntentService bpFundIntentService;
	@Resource
	private BpFundIntentDao bpFundIntentDao;
	@Resource
	private ObAccountDealInfoService obAccountDealInfoService;
	@Resource
	private BpCustMemberService bpCustMemberService;
	private PlBidSale plBidSale;
	private Long id;
	private String listtype;
	public String getListtype() {
		return listtype;
	}

	public void setListtype(String listtype) {
		this.listtype = listtype;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



	public PlBidSale getPlBidSale() {
		return plBidSale;
	}

	public void setPlBidSale(PlBidSale plBidSale) {
		this.plBidSale = plBidSale;
	}

   
   
   
 public String list(){
	 Map<String, String> map=new HashMap<String, String>();
	 List<PlBidSale> list = new ArrayList<PlBidSale>();
	 QueryFilter filter = new QueryFilter(getRequest());
	 Enumeration paramEnu = getRequest().getParameterNames();
		while (paramEnu.hasMoreElements()) {
			String paramName = (String) paramEnu.nextElement();
			String paramValue = (String) getRequest().getParameter(paramName);
			map.put(paramName, paramValue);

		}
	  if(listtype.equals("transferingList")){
		 list= plBidSaleService.transferingList(null,filter.getPagingBean(), map);
		 
		 
	 }else if(listtype.equals("transferedList")){
		 map.put("saleStatus", "4");//交易成功
		 list= plBidSaleService.outTransferingList(null,filter.getPagingBean(), map);
		 
	 }else if(listtype.equals("closeedList")){
		 map.put("saleStatus", "9,10");//手动关闭
		 
		 list= plBidSaleService.outTransferingList(null,filter.getPagingBean(), map);
		 
	 }else if(listtype.equals("ingTransferList")){
		 map.put("saleStatus", "3");//正在交易中的
		 
		 list= plBidSaleService.outTransferingList(null,filter.getPagingBean(), map);
		 
	 }else if(listtype.equals("transfereToOrList")){
		 map.put("saleStatus", "7");//转到债权中的
		 
		 list= plBidSaleService.outTransferingList(null,filter.getPagingBean(), map);
		 
	 }else if(listtype.equals("transferFianceList")){
		 map.put("saleStatus", "1,4");//挂牌成功和交易成功
		 
		 list= plBidSaleService.outTransferingList(null,filter.getPagingBean(), map);
		 
	 }else if(listtype.equals("all")){
		 map.put("saleStatus", "1,3,4,7,9,10");//查询全部
		 
		 list= plBidSaleService.outTransferingList(null,filter.getPagingBean(), map);
	 }
    	 
	 StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(
				",result:");
	JSONSerializer serializer = JsonUtil.getJSONSerializer(
			"saleStartTime", "saleCloseTime", "saleDealTime", "saleSuccessTime","intentDate");
	serializer.transform(new DateTransformer("yyyy-MM-dd"),new String[]{"intentDate"});
	buff.append(serializer.exclude(new String[] { "class" })
			.serialize(list));
	buff.append("}");
	
	jsonString = buff.toString();
	return SUCCESS;
     }
 
  
	/**
    * 获取挂牌交易的信息，确认预收费用转实收费用  并完成退款
    * @return
    */
	public String get(){
		try{
			PlBidSale orgPlBidSale=plBidSaleService.getMoreinfoById(id);
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			// 将数据转成JSON格式
			StringBuffer sb = new StringBuffer("{success:true,data:");
			sb.append(gson.toJson(orgPlBidSale));
			sb.append("}");
			setJsonString(sb.toString());
		}catch(Exception e){
			e.printStackTrace();
		}
		System.out.println();
		return SUCCESS;
	}
	
	

}
