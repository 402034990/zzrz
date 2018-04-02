package com.zhiwei.credit.action.creditFlow.customer.enterprise;
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


import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpDicAccountTitle;
import com.zhiwei.credit.model.system.GlobalType;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.BpDicAccountTitleService;
/**
 * 
 * @author 
 *
 */
public class BpDicAccountTitleAction extends BaseAction{
	@Resource
	private BpDicAccountTitleService bpDicAccountTitleService;
	private BpDicAccountTitle bpDicAccountTitle;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BpDicAccountTitle getBpDicAccountTitle() {
		return bpDicAccountTitle;
	}

	public void setBpDicAccountTitle(BpDicAccountTitle bpDicAccountTitle) {
		this.bpDicAccountTitle = bpDicAccountTitle;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BpDicAccountTitle> list= bpDicAccountTitleService.getAll(filter);
		
		Type type=new TypeToken<List<BpDicAccountTitle>>(){}.getType();
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
				bpDicAccountTitleService.remove(new Long(id));
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
		BpDicAccountTitle bpDicAccountTitle=bpDicAccountTitleService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bpDicAccountTitle));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bpDicAccountTitle.getId()==null){
			bpDicAccountTitleService.save(bpDicAccountTitle);
		}else{
			BpDicAccountTitle orgBpDicAccountTitle=bpDicAccountTitleService.get(bpDicAccountTitle.getId());
			try{
				BeanUtil.copyNotNullProperties(orgBpDicAccountTitle, bpDicAccountTitle);
				bpDicAccountTitleService.save(orgBpDicAccountTitle);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public String getClassNameJson(){
		List<BpDicAccountTitle> list=bpDicAccountTitleService.listClassName();
		if(null!=list && list.size()>0){
			StringBuffer buff = new StringBuffer("[");
			for (BpDicAccountTitle bpDicAccountTitle : list) {
				buff.append("['").append(bpDicAccountTitle.getId()).append("','").append(bpDicAccountTitle.getTitleClass()).append("'],");
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
	public String getClassNameJson1(){
		List<BpDicAccountTitle> list=bpDicAccountTitleService.listClassName();
		if(null!=list && list.size()>0){
			StringBuffer buff = new StringBuffer("[");
			for (BpDicAccountTitle bpDicAccountTitle : list) {
				buff.append("['").append(bpDicAccountTitle.getTitleClass()).append("','").append(bpDicAccountTitle.getTitleClass()).append("'],");
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
	public String getTitleJson(){
		String className=this.getRequest().getParameter("className");
		List<BpDicAccountTitle> list=bpDicAccountTitleService.listTitle(className);
		if(null!=list && list.size()>0){
			StringBuffer buff = new StringBuffer("[");
			for (BpDicAccountTitle bpDicAccountTitle : list) {
				buff.append("['").append(bpDicAccountTitle.getKeyName()).append("','").append(bpDicAccountTitle.getKeyName()+" "+bpDicAccountTitle.getTitle()).append("'],");
			}
			if (list.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);
			}
			buff.append("]");
			setJsonString(buff.toString());
			//System.out.println("1111-->>"+buff.toString());
		}
		
		return SUCCESS;
	}
}
