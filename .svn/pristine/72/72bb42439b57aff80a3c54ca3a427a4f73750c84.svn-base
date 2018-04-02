package com.zhiwei.credit.action.creditFlow.car;
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


import com.zhiwei.credit.model.creditFlow.car.CarWarningInfo;
import com.zhiwei.credit.service.creditFlow.car.CarWarningInfoService;
/**
 * 
 * @author 
 *
 */
public class CarWarningInfoAction extends BaseAction{
	@Resource
	private CarWarningInfoService carWarningInfoService;
	private CarWarningInfo carWarningInfo;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public CarWarningInfo getCarWarningInfo() {
		return carWarningInfo;
	}

	public void setCarWarningInfo(CarWarningInfo carWarningInfo) {
		this.carWarningInfo = carWarningInfo;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CarWarningInfo> list= carWarningInfoService.getAll(filter);
		
		Type type=new TypeToken<List<CarWarningInfo>>(){}.getType();
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
				carWarningInfoService.remove(new Long(id));
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
		CarWarningInfo carWarningInfo=carWarningInfoService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(carWarningInfo));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(carWarningInfo.getId()==null){
			carWarningInfoService.save(carWarningInfo);
		}else{
			CarWarningInfo orgCarWarningInfo=carWarningInfoService.get(carWarningInfo.getId());
			try{
				BeanUtil.copyNotNullProperties(orgCarWarningInfo, carWarningInfo);
				carWarningInfoService.save(orgCarWarningInfo);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
