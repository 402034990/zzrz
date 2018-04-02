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
import com.zhiwei.core.web.paging.PageBean;


import com.zhiwei.credit.model.creditFlow.common.BpDicAccountTitleSetIndex;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpDicAccountTitle;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;
import com.zhiwei.credit.service.creditFlow.common.BpDicAccountTitleSetIndexService;
/**
 * 
 * @author 
 *
 */
public class BpDicAccountTitleSetIndexAction extends BaseAction{
	@Resource
	private BpDicAccountTitleSetIndexService bpDicAccountTitleSetIndexService;
	private BpDicAccountTitleSetIndex bpDicAccountTitleSetIndex;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BpDicAccountTitleSetIndex getBpDicAccountTitleSetIndex() {
		return bpDicAccountTitleSetIndex;
	}

	public void setBpDicAccountTitleSetIndex(BpDicAccountTitleSetIndex bpDicAccountTitleSetIndex) {
		this.bpDicAccountTitleSetIndex = bpDicAccountTitleSetIndex;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		PageBean<BpDicAccountTitleSetIndex> pageBean = new PageBean<BpDicAccountTitleSetIndex>(start, limit,getRequest());
		bpDicAccountTitleSetIndexService.findIndexProjectList(pageBean);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pageBean.getTotalCounts()).append(",result:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(pageBean.getResult()));
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
				bpDicAccountTitleSetIndexService.remove(new Long(id));
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
		BpDicAccountTitleSetIndex bpDicAccountTitleSetIndex=bpDicAccountTitleSetIndexService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bpDicAccountTitleSetIndex));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bpDicAccountTitleSetIndex.getId()==null){
			bpDicAccountTitleSetIndexService.save(bpDicAccountTitleSetIndex);
		}else{
			BpDicAccountTitleSetIndex orgBpDicAccountTitleSetIndex=bpDicAccountTitleSetIndexService.get(bpDicAccountTitleSetIndex.getId());
			try{
				BeanUtil.copyNotNullProperties(orgBpDicAccountTitleSetIndex, bpDicAccountTitleSetIndex);
				bpDicAccountTitleSetIndexService.save(orgBpDicAccountTitleSetIndex);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public String getTypeJson(){
		List<BpDicAccountTitleSetIndex> list=bpDicAccountTitleSetIndexService.listByType("Customer");
		if(null!=list && list.size()>0){
			StringBuffer buff = new StringBuffer("[");
			for (BpDicAccountTitleSetIndex bpDicAccountTitleSetIndex : list) {
				buff.append("['").append(bpDicAccountTitleSetIndex.getId()).append("','").append(bpDicAccountTitleSetIndex.getListName()).append("'],");
			}
			if (list.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);
			}
			buff.append("]");
			setJsonString(buff.toString());
			//System.out.println("-->>"+buff.toString());
		}
		
		return SUCCESS;
	}
}
