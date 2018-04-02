package com.zhiwei.credit.action.p2p.redMoney;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.ServletActionContext;

import java.io.File;
import java.lang.reflect.Type;
import java.math.BigDecimal;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.hurong.core.util.DateUtil;
import com.hurong.credit.util.Common;
import com.zhiwei.core.Constants;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.util.ContextUtil;
import com.zhiwei.core.util.JsonUtil;

import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.web.action.BaseAction;


import com.zhiwei.credit.core.creditUtils.ExcelHelper;
import com.zhiwei.credit.core.util.FileHelper;
import com.zhiwei.credit.model.creditFlow.creditAssignment.bank.ObAccountDealInfo;
import com.zhiwei.credit.model.creditFlow.creditAssignment.bank.ObSystemAccount;
import com.zhiwei.credit.model.p2p.BpCustMember;
import com.zhiwei.credit.model.p2p.redMoney.BpCustRedEnvelope;
import com.zhiwei.credit.model.p2p.redMoney.BpCustRedMember;
import com.zhiwei.credit.service.creditFlow.creditAssignment.bank.ObAccountDealInfoService;
import com.zhiwei.credit.service.creditFlow.creditAssignment.bank.ObSystemAccountService;
import com.zhiwei.credit.service.p2p.BpCustMemberService;
import com.zhiwei.credit.service.p2p.redMoney.BpCustRedEnvelopeService;
import com.zhiwei.credit.service.p2p.redMoney.BpCustRedMemberService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author 
 *
 */
public class BpCustRedEnvelopeAction extends BaseAction{
	@Resource
	private BpCustRedEnvelopeService bpCustRedEnvelopeService;
	@Resource
	private BpCustRedMemberService bpCustRedMemberService;
	@Resource
	private BpCustMemberService bpCustMemberService;
	@Resource
	private ObSystemAccountService obSystemAccountService;
	@Resource
	private ObAccountDealInfoService obAccountDealInfoService;
	private BpCustRedEnvelope bpCustRedEnvelope;
	private String reddatas;
	//得到config.properties读取的所有资源
	private static Map configMap = AppUtil.getConfigMap();
	private Long redId;
	public Long getRedId() {
		return redId;
	}

	public String getReddatas() {
		return reddatas;
	}

	public void setReddatas(String reddatas) {
		this.reddatas = reddatas;
	}


	public void setRedId(Long redId) {
		this.redId = redId;
	}

	public BpCustRedEnvelope getBpCustRedEnvelope() {
		return bpCustRedEnvelope;
	}

	public void setBpCustRedEnvelope(BpCustRedEnvelope bpCustRedEnvelope) {
		this.bpCustRedEnvelope = bpCustRedEnvelope;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BpCustRedEnvelope> list= bpCustRedEnvelopeService.getAll(filter);
		
	
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
        JSONSerializer json = JsonUtil.getJSONSerializer("distributeTime","createTime");
        json.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"), new String[] {"distributeTime","createTime"});
		buff.append(json.serialize(list));
		buff.append("}");
		jsonString = buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			bpCustRedEnvelopeService.delete(ids);
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
   

	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		BpCustRedEnvelope bpCustRedEnvelope=bpCustRedEnvelopeService.get(redId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bpCustRedEnvelope));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bpCustRedEnvelope.getRedId()==null){
			bpCustRedEnvelopeService.save(bpCustRedEnvelope);
			if(bpCustRedEnvelope.getRedId()!=null){
				String[] ret=bpCustRedMemberService.saveredmembers(reddatas, bpCustRedEnvelope.getRedId());
				bpCustRedEnvelope.setDistributemoney(new BigDecimal(ret[0]));
				bpCustRedEnvelope.setDistributecount(new Integer(ret[1]));
				bpCustRedEnvelope.setEddistributemoney(new BigDecimal(0));
				bpCustRedEnvelope.setCreateTime(new Date());
				bpCustRedEnvelopeService.save(bpCustRedEnvelope);
				
			}
		
		}else{
			BpCustRedEnvelope orgBpCustRedEnvelope=bpCustRedEnvelopeService.get(bpCustRedEnvelope.getRedId());
			try{
				BeanUtil.copyNotNullProperties(orgBpCustRedEnvelope, bpCustRedEnvelope);
			
				String[] ret=bpCustRedMemberService.saveredmembers(reddatas, bpCustRedEnvelope.getRedId());
				orgBpCustRedEnvelope.setDistributemoney(new BigDecimal(ret[0]));
				orgBpCustRedEnvelope.setDistributecount(new Integer(ret[1]));
				bpCustRedEnvelope.setEddistributemoney(new BigDecimal(0));
				bpCustRedEnvelopeService.save(orgBpCustRedEnvelope);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}

	public void outputExcel(){
	String bpcoupon = this.getRequest().getParameter("bpcoupon");
	if(bpcoupon!=null&&!bpcoupon.equals("")){
		String [] tableHeader = {"序号","用户名"};
		try {
		   List a=	new ArrayList();
		   a.add(1);
			ExcelHelper.export(a,tableHeader,"优惠券派发");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}else{}
	String [] tableHeader = {"序号","用户名","奖励金额"};
	try {
	   List a=	new ArrayList();
	   a.add(1);
		ExcelHelper.export(a,tableHeader,"红包奖励");
	} catch (Exception e) {
		e.printStackTrace();
	}
		
		
	}

}
