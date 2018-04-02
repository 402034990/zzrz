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

import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.web.action.BaseAction;


import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpCustEntAccountSum;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpDicAccountTitle;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.BpCustEntAccountSumService;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.BpDicAccountTitleService;
/**
 * 
 * @author 
 *
 */
public class BpCustEntAccountSumAction extends BaseAction{
	@Resource
	private BpCustEntAccountSumService bpCustEntAccountSumService;
	@Resource
	private BpDicAccountTitleService bpDicAccountTitleService;
	private BpCustEntAccountSum bpCustEntAccountSum;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BpCustEntAccountSum getBpCustEntAccountSum() {
		return bpCustEntAccountSum;
	}

	public void setBpCustEntAccountSum(BpCustEntAccountSum bpCustEntAccountSum) {
		this.bpCustEntAccountSum = bpCustEntAccountSum;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BpCustEntAccountSum> list= bpCustEntAccountSumService.getAll(filter);
		if(null!=list && list.size()>0){
			for(BpCustEntAccountSum b:list){
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
				bpCustEntAccountSumService.remove(new Long(id));
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
		BpCustEntAccountSum bpCustEntAccountSum=bpCustEntAccountSumService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bpCustEntAccountSum));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bpCustEntAccountSum.getId()==null){
			bpCustEntAccountSum.setUpdateDate(new Date());
			bpCustEntAccountSumService.save(bpCustEntAccountSum);
		}else{
			BpCustEntAccountSum orgBpCustEntAccountSum=bpCustEntAccountSumService.get(bpCustEntAccountSum.getId());
			try{
				BeanUtil.copyNotNullProperties(orgBpCustEntAccountSum, bpCustEntAccountSum);
				bpCustEntAccountSumService.save(orgBpCustEntAccountSum);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
