package com.zhiwei.credit.action.creditFlow.common;
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


import com.zhiwei.credit.model.creditFlow.common.BpDicAccountTitleSet;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpCustEntAccountSum;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpDicAccountTitle;
import com.zhiwei.credit.service.creditFlow.common.BpDicAccountTitleSetService;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.BpDicAccountTitleService;
/**
 * 
 * @author 
 *
 */
public class BpDicAccountTitleSetAction extends BaseAction{
	@Resource
	private BpDicAccountTitleSetService bpDicAccountTitleSetService;
	@Resource
	private BpDicAccountTitleService bpDicAccountTitleService;
	private BpDicAccountTitleSet bpDicAccountTitleSet;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BpDicAccountTitleSet getBpDicAccountTitleSet() {
		return bpDicAccountTitleSet;
	}

	public void setBpDicAccountTitleSet(BpDicAccountTitleSet bpDicAccountTitleSet) {
		this.bpDicAccountTitleSet = bpDicAccountTitleSet;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BpDicAccountTitleSet> list= bpDicAccountTitleSetService.getAll(filter);
		
		if(null!=list && list.size()>0){
			for(BpDicAccountTitleSet b:list){
				if(null!=b.getKeyName() && !"".equals(b.getKeyName())){
					BpDicAccountTitle  title=bpDicAccountTitleService.findByKeyName(b.getKeyName());
				    b.setTitle(title.getTitle());
					b.setTitleClassName(title.getTitleClass());
				}
			}
		}
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
				bpDicAccountTitleSetService.remove(new Long(id));
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
		BpDicAccountTitleSet bpDicAccountTitleSet=bpDicAccountTitleSetService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bpDicAccountTitleSet));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bpDicAccountTitleSet.getId()==null){
			bpDicAccountTitleSetService.save(bpDicAccountTitleSet);
		}else{
			BpDicAccountTitleSet orgBpDicAccountTitleSet=bpDicAccountTitleSetService.get(bpDicAccountTitleSet.getId());
			try{
				BeanUtil.copyNotNullProperties(orgBpDicAccountTitleSet, bpDicAccountTitleSet);
				bpDicAccountTitleSetService.save(orgBpDicAccountTitleSet);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
