package com.zhiwei.credit.action.creditFlow.customer.enterprise;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.util.ContextUtil;

import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.web.action.BaseAction;


import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpCustEntAccountIndex;
import com.zhiwei.credit.model.system.AppUser;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.BpCustEntAccountIndexService;
/**
 * 
 * @author 
 *
 */
public class BpCustEntAccountIndexAction extends BaseAction{
	@Resource
	private BpCustEntAccountIndexService bpCustEntAccountIndexService;
	private BpCustEntAccountIndex bpCustEntAccountIndex;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BpCustEntAccountIndex getBpCustEntAccountIndex() {
		return bpCustEntAccountIndex;
	}

	public void setBpCustEntAccountIndex(BpCustEntAccountIndex bpCustEntAccountIndex) {
		this.bpCustEntAccountIndex = bpCustEntAccountIndex;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BpCustEntAccountIndex> list= bpCustEntAccountIndexService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(list));
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
			for(String id:ids){
				bpCustEntAccountIndexService.remove(new Long(id));
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
		BpCustEntAccountIndex bpCustEntAccountIndex=bpCustEntAccountIndexService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bpCustEntAccountIndex));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bpCustEntAccountIndex.getId()==null){
			AppUser user=ContextUtil.getCurrentUser();
			bpCustEntAccountIndex.setCreateDate(new Date());
			bpCustEntAccountIndex.setCreateId(user.getUserId());
			bpCustEntAccountIndex.setCreateName(user.getFullname());
			bpCustEntAccountIndexService.save(bpCustEntAccountIndex);
		}else{
			BpCustEntAccountIndex orgBpCustEntAccountIndex=bpCustEntAccountIndexService.get(bpCustEntAccountIndex.getId());
			try{
				BeanUtil.copyNotNullProperties(orgBpCustEntAccountIndex, bpCustEntAccountIndex);
				bpCustEntAccountIndexService.save(orgBpCustEntAccountIndex);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
