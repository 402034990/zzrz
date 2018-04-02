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


import com.zhiwei.credit.model.creditFlow.mortgage.vehicle.BpMortgageCarConfigure;
import com.zhiwei.credit.service.creditFlow.mortgage.vehicle.BpMortgageCarConfigureService;
/**
 * 
 * @author 
 *
 */
public class BpMortgageCarConfigureAction extends BaseAction{
	@Resource
	private BpMortgageCarConfigureService bpMortgageCarConfigureService;
	private BpMortgageCarConfigure bpMortgageCarConfigure;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BpMortgageCarConfigure getBpMortgageCarConfigure() {
		return bpMortgageCarConfigure;
	}

	public void setBpMortgageCarConfigure(BpMortgageCarConfigure bpMortgageCarConfigure) {
		this.bpMortgageCarConfigure = bpMortgageCarConfigure;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BpMortgageCarConfigure> list= bpMortgageCarConfigureService.getAll(filter);
		
		Type type=new TypeToken<List<BpMortgageCarConfigure>>(){}.getType();
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
				bpMortgageCarConfigureService.remove(new Long(id));
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
		BpMortgageCarConfigure bpMortgageCarConfigure=bpMortgageCarConfigureService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bpMortgageCarConfigure));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bpMortgageCarConfigure.getId()==null){
			bpMortgageCarConfigureService.save(bpMortgageCarConfigure);
		}else{
			BpMortgageCarConfigure orgBpMortgageCarConfigure=bpMortgageCarConfigureService.get(Long.valueOf(bpMortgageCarConfigure.getId()));
			try{
				BeanUtil.copyNotNullProperties(orgBpMortgageCarConfigure, bpMortgageCarConfigure);
				bpMortgageCarConfigureService.save(orgBpMortgageCarConfigure);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
