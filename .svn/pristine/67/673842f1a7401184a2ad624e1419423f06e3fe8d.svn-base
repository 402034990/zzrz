package com.zhiwei.credit.action.creditFlow.gps;
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


import com.zhiwei.credit.model.creditFlow.gps.CsGps;
import com.zhiwei.credit.service.creditFlow.gps.CsGpsService;
/**
 * 
 * @author 
 *
 */
public class CsGpsAction extends BaseAction{
	@Resource
	private CsGpsService csGpsService;
	private CsGps csGps;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public CsGps getCsGps() {
		return csGps;
	}

	public String getMortgageId() {
		return mortgageId;
	}

	public void setMortgageId(String mortgageId) {
		this.mortgageId = mortgageId;
	}

	public void setCsGps(CsGps csGps) {
		this.csGps = csGps;
	}
	
	public  String  mortgageId;

	/**
	 * 显示列表
	 */
	public String list(){
		QueryFilter filter=new QueryFilter(getRequest());
		String mortgageId1 =	this.getRequest().getParameter("mortgageId");
		if(mortgageId!=null&&!"".equals(mortgageId)){
			filter.addFilter("Q_mortgageId_L_EQ", mortgageId);
		}
		List<CsGps> list= csGpsService.getAll(filter);
		
		Type type=new TypeToken<List<CsGps>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
//		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	
	
	/**
	 * 查询显示
	 */
	public String byMortgageId(){
		List<CsGps> list=null;
		if(mortgageId!=null&&!"".equals(mortgageId)){
			 list= csGpsService.getByMortgageId(Long.valueOf(mortgageId));
		}
		
		Type type=new TypeToken<List<CsGps>>(){}.getType();

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list!=null?list.size():0).
		append(",result:");
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		//System.out.println("项目不编译了？？？");
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
				csGpsService.remove(new Long(id));
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
		CsGps csGps=csGpsService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(csGps));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(csGps.getId()==null){
			csGpsService.save(csGps);
		}else{
			CsGps orgCsGps=csGpsService.get(csGps.getId());
			try{
				BeanUtil.copyNotNullProperties(orgCsGps, csGps);
				csGpsService.save(orgCsGps);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
