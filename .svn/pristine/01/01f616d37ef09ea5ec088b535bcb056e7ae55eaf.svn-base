package com.zhiwei.credit.action.creditFlow.financingAgency.persion;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.util.JsonUtil;

import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.web.action.BaseAction;


import com.zhiwei.credit.model.creditFlow.financingAgency.business.BpBusinessOrPro;
import com.zhiwei.credit.model.creditFlow.financingAgency.persion.BpPersionDirPro;
import com.zhiwei.credit.service.creditFlow.financingAgency.persion.BpPersionDirProService;

import flexjson.JSONSerializer;
/**
 * 
 * @author 
 *
 */
public class BpPersionDirProAction extends BaseAction{
	@Resource
	private BpPersionDirProService bpPersionDirProService;
	private BpPersionDirPro bpPersionDirPro;
	
	private Long pdirProId;

	public Long getPdirProId() {
		return pdirProId;
	}

	public void setPdirProId(Long pdirProId) {
		this.pdirProId = pdirProId;
	}

	public BpPersionDirPro getBpPersionDirPro() {
		return bpPersionDirPro;
	}

	public void setBpPersionDirPro(BpPersionDirPro bpPersionDirPro) {
		this.bpPersionDirPro = bpPersionDirPro;
	}
	
	/**
	 * 统计发标情况
	 */
	@SuppressWarnings("null")
	public String listPublish() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("createTime", "DESC");
		List<BpPersionDirPro> list = bpPersionDirProService.getAll(filter);
		List<BpPersionDirPro> listCurr = new ArrayList<BpPersionDirPro>();
		for (BpPersionDirPro pack : list) {
			// 计算打包项目的剩余金额
			pack = bpPersionDirProService.residueMoneyMeth(pack);
			listCurr.add(pack);
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer serializer = JsonUtil.getJSONSerializer("singleTime",
				"createTime","bidTime", "updateTime");
		buff.append(serializer.exclude(new String[] { "class" }).serialize(
				listCurr));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("createTime", "DESC");
		List<BpPersionDirPro> list= bpPersionDirProService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer = JsonUtil.getJSONSerializer("loanStarTime",
		"createTime", "updateTime","loanEndTime","bidTime");
		buff.append(serializer.exclude(new String[] { "class" }).serialize(list));
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
				bpPersionDirProService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	/**
	 * 获取剩余招标金额 招标人数等信息
	 * 
	 * @return
	 */
	public String getBidInfo() {
		BpPersionDirPro bpPersionDirPro=bpPersionDirProService.get(pdirProId);

		bpPersionDirPro = bpPersionDirProService.residueMoneyMeth(bpPersionDirPro);
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer serializer = JsonUtil.getJSONSerializer(
				"singleTime","bidTime", "createTime",
				"updateTime");
		sb.append(serializer.exclude(
				new String[] { "class"}).serialize(
						bpPersionDirPro));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		BpPersionDirPro bpPersionDirPro=bpPersionDirProService.get(pdirProId);
		if(null == bpPersionDirPro.getDisclosureCreateDate() || "".equals(bpPersionDirPro.getDisclosureCreateDate())){
			bpPersionDirPro.setDisclosureCreateDate(new Date());
		}
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer serializer = JsonUtil.getJSONSerializer( "createDate","updateDate","disclosureCreateDate","disclosureUpdateDate") ;
		sb.append(serializer.exclude(new String[] { "class" }).serialize(bpPersionDirPro));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bpPersionDirPro.getPdirProId()==null){
			bpPersionDirProService.save(bpPersionDirPro);
		}else{
			BpPersionDirPro orgBpPersionDirPro=bpPersionDirProService.get(bpPersionDirPro.getPdirProId());
			try{
				BeanUtil.copyNotNullProperties(orgBpPersionDirPro, bpPersionDirPro);
				bpPersionDirProService.save(orgBpPersionDirPro);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
