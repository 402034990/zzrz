package com.zhiwei.credit.action.creditFlow.mortgage.vehicle;
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


import com.zhiwei.credit.model.creditFlow.mortgage.vehicle.BpMortgageCarConfigureStatus;
import com.zhiwei.credit.service.creditFlow.mortgage.vehicle.BpMortgageCarConfigureStatusService;
/**
 * 
 * @author 
 *
 */
public class BpMortgageCarConfigureStatusAction extends BaseAction{
	@Resource
	private BpMortgageCarConfigureStatusService bpMortgageCarConfigureStatusService;
	private BpMortgageCarConfigureStatus bpMortgageCarConfigureStatus;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BpMortgageCarConfigureStatus getBpMortgageCarConfigureStatus() {
		return bpMortgageCarConfigureStatus;
	}

	public void setBpMortgageCarConfigureStatus(BpMortgageCarConfigureStatus bpMortgageCarConfigureStatus) {
		this.bpMortgageCarConfigureStatus = bpMortgageCarConfigureStatus;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BpMortgageCarConfigureStatus> list= bpMortgageCarConfigureStatusService.getAll(filter);
		
		Type type=new TypeToken<List<BpMortgageCarConfigureStatus>>(){}.getType();
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
				bpMortgageCarConfigureStatusService.remove(new Long(id));
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
		BpMortgageCarConfigureStatus bpMortgageCarConfigureStatus=bpMortgageCarConfigureStatusService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bpMortgageCarConfigureStatus));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bpMortgageCarConfigureStatus.getId()==null){
			bpMortgageCarConfigureStatusService.save(bpMortgageCarConfigureStatus);
		}else{
			BpMortgageCarConfigureStatus orgBpMortgageCarConfigureStatus=bpMortgageCarConfigureStatusService.get(Long.valueOf(bpMortgageCarConfigureStatus.getId()));
			try{
				BeanUtil.copyNotNullProperties(orgBpMortgageCarConfigureStatus, bpMortgageCarConfigureStatus);
				bpMortgageCarConfigureStatusService.save(orgBpMortgageCarConfigureStatus);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
