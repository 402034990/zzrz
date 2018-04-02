package com.zhiwei.credit.action.creditFlow.mortage;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.model.creditFlow.mortage.CsProcreditMortgageRecord;
import com.zhiwei.credit.service.creditFlow.mortage.CsProcreditMortgageRecordService;
/**
 * 
 * @author 
 *
 */
public class CsProcreditMortgageRecordAction extends BaseAction{
	@Resource
	private CsProcreditMortgageRecordService csProcreditMortgageRecordService;
	
	private CsProcreditMortgageRecord csProcreditMortgageRecord;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public CsProcreditMortgageRecord getCsProcreditMortgageRecord() {
		return csProcreditMortgageRecord;
	}

	public void setCsProcreditMortgageRecord(CsProcreditMortgageRecord csProcreditMortgageRecord) {
		this.csProcreditMortgageRecord = csProcreditMortgageRecord;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CsProcreditMortgageRecord> list= csProcreditMortgageRecordService.getAll(filter);
		
		Type type=new TypeToken<List<CsProcreditMortgageRecord>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
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
				csProcreditMortgageRecordService.remove(new Long(id));
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
		CsProcreditMortgageRecord csProcreditMortgageRecord=csProcreditMortgageRecordService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(csProcreditMortgageRecord));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(csProcreditMortgageRecord.getId()==null){
			csProcreditMortgageRecordService.save(csProcreditMortgageRecord);
		}else{
			CsProcreditMortgageRecord orgCsProcreditMortgageRecord=csProcreditMortgageRecordService.get(csProcreditMortgageRecord.getId());
			try{
				BeanUtil.copyNotNullProperties(orgCsProcreditMortgageRecord, csProcreditMortgageRecord);
				csProcreditMortgageRecordService.save(orgCsProcreditMortgageRecord);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	/**
	 * 批量入库、出库保存方法
	 */
	public String multiSave(){
		String[] ids=this.getRequest().getParameter("ids").split(",");
		for(String id:ids){
			CsProcreditMortgageRecord record=new CsProcreditMortgageRecord();
			try{
				BeanUtil.copyNotNullProperties(record, csProcreditMortgageRecord);
				record.setMortgageId(Long.valueOf(id));
				record.setOperateDate(new Date());
				csProcreditMortgageRecordService.save(record);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
