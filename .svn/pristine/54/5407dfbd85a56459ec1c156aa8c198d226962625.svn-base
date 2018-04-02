package com.zhiwei.credit.action.creditFlow.archives;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.model.creditFlow.archives.PlArchives;
import com.zhiwei.credit.model.creditFlow.archives.VProjectArchives;
import com.zhiwei.credit.service.creditFlow.archives.PlArchivesService;
import com.zhiwei.credit.service.creditFlow.archives.PlProjectArchivesService;
import com.zhiwei.credit.service.creditFlow.archives.VProjectArchivesService;
/**
 * 
 * @author 
 *
 */
public class VProjectArchivesAction extends BaseAction{
	@Resource
	private VProjectArchivesService vProjectArchivesService;
	@Resource
	private PlArchivesService plArchivesService;
	@Resource
	private PlProjectArchivesService plProjectArchivesService;
	private VProjectArchives vProjectArchives;
	private String businessType;
	private Long projtoarchiveId;
	private Long projectId;

	public Long getProjtoarchiveId() {
		return projtoarchiveId;
	}

	public void setProjtoarchiveId(Long projtoarchiveId) {
		this.projtoarchiveId = projtoarchiveId;
	}



	public PlArchivesService getPlArchivesService() {
		return plArchivesService;
	}

	public void setPlArchivesService(PlArchivesService plArchivesService) {
		this.plArchivesService = plArchivesService;
	}

	public VProjectArchives getvProjectArchives() {
		return vProjectArchives;
	}

	public void setvProjectArchives(VProjectArchives vProjectArchives) {
		this.vProjectArchives = vProjectArchives;
	}

	public String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<VProjectArchives> list= vProjectArchivesService.getAll(filter);
		
		Type type=new TypeToken<List<VProjectArchives>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	public String projectlist(){
		SimpleDateFormat sd=new SimpleDateFormat("yyyy-MM-dd");
		List list=plProjectArchivesService.projectList(businessType, this.getRequest(),start,limit);
		Long count=plProjectArchivesService.projectCount(businessType, this.getRequest());
		StringBuffer buff=new StringBuffer("{success:true,'totalCounts':"+count+",result:[");
		if(null!=businessType && businessType.equals("SmallLoan")){
			for(int i=0;i<list.size();i++){
				Object[] obj=(Object[]) list.get(i);
				buff.append("{\"fundProjectId\":");
				buff.append(obj[1]);
				buff.append(",\"projectId\":");
				buff.append(obj[1]);
				buff.append(",\"projectName\":'");
				buff.append(obj[2]);
				buff.append("',\"projectNumber\":'");
				buff.append(obj[3]);
				buff.append("',\"projectMoney\":");
				buff.append(obj[4]);
				buff.append(",\"appUserName\":'");
				buff.append(obj[5]);
				buff.append("',\"createDate\":'");
				if(null!=obj[6]){
					buff.append(sd.format(obj[6]));
				}
				buff.append("',\"isArchives\":");
				buff.append(obj[7]);
				buff.append(",\"oppositeType\":'");
				buff.append(obj[8]);
				buff.append("',\"projtoarchiveId\":");
				buff.append(obj[9]);
				buff.append(",\"isIntStroage\":'");
				buff.append(obj[11]);
				buff.append("',\"handerName\":'");
				if(obj[14]!=null  && !"".equals(obj[14])){
					buff.append(obj[14]);
				}else{
					buff.append("");
				}
				buff.append("',\"businessType\":'");
				buff.append(obj[10]);
				buff.append("',\"productName\":\'");
				buff.append(obj[13]);
				buff.append("\'},");
			}
		}else{
			for(int i=0;i<list.size();i++){
				Object[] obj=(Object[]) list.get(i);
				buff.append("{\"projectId\":");
				buff.append(obj[0]);
				buff.append(",\"projectName\":'");
				buff.append(obj[1]);
				buff.append("',\"projectNumber\":'");
				buff.append(obj[2]);
				buff.append("',\"projectMoney\":");
				buff.append(obj[3]);
				buff.append(",\"appUserName\":'");
				buff.append(obj[4]);
				buff.append("',\"createDate\":'");
				if(null!=obj[5]){
					buff.append(sd.format(obj[5]));
				}
				buff.append("',\"isArchives\":");
				buff.append(obj[6]);
				buff.append(",\"oppositeType\":'");
				buff.append(obj[7]);
				buff.append("',\"projtoarchiveId\":");
				buff.append(obj[8]);
				buff.append(",\"businessType\":'");
				buff.append(obj[9]);
				buff.append("'},");
			}
		}
		if(null!=list && list.size()>0){
			buff.deleteCharAt(buff.length()-1);
		}
		
		buff.append("]}");
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
				vProjectArchivesService.remove(new Long(id));
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
		 vProjectArchives=vProjectArchivesService.get(projtoarchiveId);
		PlArchives plArchives= plArchivesService.get(vProjectArchives.getPlarchivesId());
	//	vProjectArchives.setCheckername(plArchivesService.get(plArchives.getParentid()).getName()+"-"+plArchives.getCode());
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(vProjectArchives));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	public String getbyprojectId(){
		List<VProjectArchives> list=vProjectArchivesService.getbyproject(projectId, businessType);
		if(null !=list &&list.size()>0){
			vProjectArchives=vProjectArchivesService.getbyproject(projectId, businessType).get(0);
		}
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(vProjectArchives));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */

}
