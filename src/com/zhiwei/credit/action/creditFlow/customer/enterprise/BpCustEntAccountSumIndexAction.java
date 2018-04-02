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


import com.zhiwei.credit.model.creditFlow.common.BpDicAccountTitleSet;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpCustEntAccountSum;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpCustEntAccountSumIndex;
import com.zhiwei.credit.model.system.AppUser;
import com.zhiwei.credit.service.creditFlow.common.BpDicAccountTitleSetService;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.BpCustEntAccountSumIndexService;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.BpCustEntAccountSumService;
/**
 * 
 * @author 
 *
 */
public class BpCustEntAccountSumIndexAction extends BaseAction{
	@Resource
	private BpCustEntAccountSumIndexService bpCustEntAccountSumIndexService;
	private BpCustEntAccountSumIndex bpCustEntAccountSumIndex;
	@Resource
	private BpDicAccountTitleSetService bpDicAccountTitleSetService;
	@Resource
	private BpCustEntAccountSumService bpCustEntAccountSumService;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BpCustEntAccountSumIndex getBpCustEntAccountSumIndex() {
		return bpCustEntAccountSumIndex;
	}

	public void setBpCustEntAccountSumIndex(BpCustEntAccountSumIndex bpCustEntAccountSumIndex) {
		this.bpCustEntAccountSumIndex = bpCustEntAccountSumIndex;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BpCustEntAccountSumIndex> list= bpCustEntAccountSumIndexService.getAll(filter);
		
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
				bpCustEntAccountSumIndexService.remove(new Long(id));
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
		BpCustEntAccountSumIndex bpCustEntAccountSumIndex=bpCustEntAccountSumIndexService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bpCustEntAccountSumIndex));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bpCustEntAccountSumIndex.getId()==null){
			AppUser user=ContextUtil.getCurrentUser();
			bpCustEntAccountSumIndex.setUpdateDate(new Date());
			bpCustEntAccountSumIndex.setCreaterId(user.getUserId());
			bpCustEntAccountSumIndex.setCreaterName(user.getFullname());
			bpCustEntAccountSumIndexService.save(bpCustEntAccountSumIndex);
			if(null!=bpCustEntAccountSumIndex.getListId() && !"".equals(bpCustEntAccountSumIndex.getListId())){
				List<BpDicAccountTitleSet> list=bpDicAccountTitleSetService.listByListId(bpCustEntAccountSumIndex.getListId());
				if(null!=list && list.size()>0){
					for(BpDicAccountTitleSet b :list){
						BpCustEntAccountSum sum =new BpCustEntAccountSum();
						sum.setIndexId(bpCustEntAccountSumIndex.getId());
						sum.setCreaterId(user.getUserId());
						sum.setCreaterName(user.getFullname());
						sum.setUpdateDate(new Date());
						sum.setKeyId(b.getKeyId());
						sum.setKeyName(b.getKeyName());
						sum.setSubTitle(b.getSubTitle());
						sum.setSubKey(b.getSubKey());
						bpCustEntAccountSumService.save(sum);
					}
					
				}
				
			}
			
		}else{
			BpCustEntAccountSumIndex orgBpCustEntAccountSumIndex=bpCustEntAccountSumIndexService.get(bpCustEntAccountSumIndex.getId());
			try{
				BeanUtil.copyNotNullProperties(orgBpCustEntAccountSumIndex, bpCustEntAccountSumIndex);
				bpCustEntAccountSumIndexService.save(orgBpCustEntAccountSumIndex);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
