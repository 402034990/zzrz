package com.nc.action;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.nc.dao.NcPushRecordDao;
import com.nc.model.NcPushRecord;
import com.nc.service.NcPushRecordService;
import com.zhiwei.core.util.BeanUtil;

import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.model.creditFlow.finance.SlFundDetail;


/**
 * 
 * @author 
 *
 */
public class NcPushRecordAction extends BaseAction{
	@Resource
	private NcPushRecordService ncPushRecordService;
	@Resource
	private NcPushRecordDao dao;
	private NcPushRecord ncPushRecord;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public NcPushRecord getNcPushRecord() {
		return ncPushRecord;
	}

	public void setUPushRecord(NcPushRecord ncPushRecord) {
		this.ncPushRecord = ncPushRecord;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<NcPushRecord> list= ncPushRecordService.getAll(filter);
		
		Type type=new TypeToken<List<NcPushRecord>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new  GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String listAll(){
		
		PageBean<NcPushRecord> pageBean = new PageBean<NcPushRecord>(start,limit,getRequest());
		ncPushRecordService.listAll(pageBean);
		
		Type type=new TypeToken<List<NcPushRecord>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pageBean.getTotalCounts()).append(",result:");
		
		Gson gson=new  GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		buff.append(gson.toJson(pageBean.getResult(), type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		NcPushRecord uPushRecord=ncPushRecordService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(uPushRecord));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ncPushRecord.getId()==null){
			ncPushRecordService.save(ncPushRecord);
		}else{
			NcPushRecord orgNcPushRecord=ncPushRecordService.get(ncPushRecord.getId());
			try{
				BeanUtil.copyNotNullProperties(orgNcPushRecord, ncPushRecord);
				ncPushRecordService.save(orgNcPushRecord);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	
	public String updateTest(){
		NcPushRecord nc = ncPushRecordService.get(Long.valueOf(18));
		nc.setReturnCode("300");
		ncPushRecordService.merge(nc);
		return SUCCESS;
	}
	
	/**
	 * 添加及保存操作
	 */
	public String manualPush(){
		String msg = "";
		Map<String, Object> map = ncPushRecordService.manualPush(id);
		if(map.containsKey("code")){
			if(map.get("code").toString().compareTo("200")==0){
				msg = "推送成功！";
			}else if(map.get("code").toString().compareTo("300")==0){
				msg = "已记账不可删除";
			}else if(map.get("code").toString().compareTo("1000")==0){
				msg = "更新成功，无需再次推送！";
			}else{
				msg = "推送失败，请重试！";
			}
		}else{
			msg = "推送失败，请重试！";
		}
		setJsonString("{success:true,msg:\""+msg+"\"}");
		return SUCCESS;
	}
	
	public void loanPush(){
		
		ncPushRecordService.backoutPush("201606251801060410");
	}
	
	
}
