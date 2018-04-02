package com.zhiwei.credit.action.agentAproval;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
 
import java.io.StringReader;
import java.lang.reflect.InvocationTargetException;
 
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.sdicons.json.mapper.JSONMapper;
import com.sdicons.json.parser.JSONParser;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.util.DateUtil;
import com.zhiwei.core.util.GroupUtil;
import com.zhiwei.core.util.JsonUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.action.flow.FlowRunInfo;
import com.zhiwei.credit.model.agentAproval.BankCredit;
import com.zhiwei.credit.model.creditFlow.customer.common.EnterpriseBank;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.Enterprise;
import com.zhiwei.credit.model.creditFlow.customer.person.BpMoneyBorrowDemand;
import com.zhiwei.credit.model.creditFlow.customer.person.Person;
import com.zhiwei.credit.model.creditFlow.customer.person.Spouse;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;
import com.zhiwei.credit.model.creditFlow.fund.project.BpFundProject;
import com.zhiwei.credit.model.creditFlow.multiLevelDic.AreaDic;
import com.zhiwei.credit.model.creditFlow.smallLoan.finance.BorrowerInfo;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;
import com.zhiwei.credit.model.entityhbm.CashDeposit;
import com.zhiwei.credit.model.flow.ProcessForm;
import com.zhiwei.credit.model.system.CsHoliday;
import com.zhiwei.credit.service.agentAproval.BankCreditService;
import com.zhiwei.credit.service.creditFlow.common.CreditProjectService;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.EnterpriseService;
import com.zhiwei.credit.service.creditFlow.customer.person.PersonService;
import com.zhiwei.credit.service.creditFlow.customer.person.SpouseService;
import com.zhiwei.credit.service.creditFlow.multiLevelDic.AreaDicService;
import com.zhiwei.credit.service.flow.ProcessFormService;

import flexjson.JSONSerializer;
/**
 * 
 * @author 
 *
 */
public class BankCreditAction extends BaseAction{
	@Resource
	private BankCreditService bankCreditService;
	@Resource
	private EnterpriseService enterpriseService ;
	@Resource
	private PersonService personService;
	@Resource
	private SpouseService spouseService;
	@Resource
	private ProcessFormService processFormService;
	@Resource
	private CreditProjectService creditProjectService;
	private BankCredit bankCredit;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BankCredit getBankCredit() {
		return bankCredit;
	}

	public void setBankCredit(BankCredit bankCredit) {
		this.bankCredit = bankCredit;
	}
	//授信信息快速保存操作
	public String savebcInfo( ){
		try{
			String projectId = this.getRequest().getParameter("slprojectId");
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			//授信信息
			BankCredit  bank = new BankCredit();
			BeanUtil.populateEntity(this.getRequest(), bank, "bankCredit");
			BankCredit orgBankCredit = bankCreditService.get(Long.valueOf(projectId));
			try{
				BeanUtil.copyNotNullProperties(orgBankCredit, bankCredit);
				bankCreditService.save(orgBankCredit);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	
	
	public  String   getBankCreditName(Short typeId){
		String retStr = "";
		if(typeId == 0){
			retStr ="最高额授信";
		}
		if(typeId == 1){
			retStr ="最高额抵押授信";
		}
		if(typeId == 2){
			retStr ="最高额质押授信";
		}
		if(typeId == 3){
			retStr ="最高额保证授信";
		}
		return  retStr;
	}
	

	/**
	 * 查询数据列表
	 */
	public String  getDataArray(){
		//是否是企业版，显示所有公司
		String personId = this.getRequest().getParameter("personId");//企业或个人主键
		String oppositeType =  this.getRequest().getParameter("oppositeType");//企业或个人的类型
		//String corparationName = "";
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_oppositeType_S_LK", oppositeType);
		filter.addFilter("Q_oppositeID_L_EQ", personId);
		filter.addFilter("Q_status_SN_EQ", Short.valueOf("2"));
		List<BankCredit> list = bankCreditService.getAll(filter);
		//List<SlCompanyMain> list= slCompanyMainService.getAll(filter);
//		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
//		.append(list.size()).append(",result:[");
//		StringBuffer buff = new StringBuffer("[");
//		for(BankCredit scm:list){
////			buff.append("{\"creditTypeId\":");
////			buff.append(scm.getCeditTypeId());
////			buff.append(",\"creditType\":'");
//			buff.append("[\"creditType\":'");
//			buff.append(getBankCreditName(scm.getCeditTypeId()));
//			buff.append("',\"creditId\":'");
//			buff.append(scm.getId());
//			buff.append("'");
//		}
////		buff.append("}]}");
//		buff.append("]]");
		   SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(list.size()).append(",result:[");
		for(BankCredit scm:list){
			buff.append("{\"creditId\":'");
			buff.append(scm.getId());
			buff.append("',\"creditTypeId\":'").append(scm.getCeditTypeId());
			buff.append("',\"creditMoney\":'").append(scm.getCreditMoney());
			buff.append("',\"shengyuMoney\":'").append(scm.getShengyuMoney());
			buff.append("',\"beginTime\":'").append(sdf.format(scm.getBeginTime()));
			buff.append("',\"endTime\":'").append(sdf.format(scm.getEndTime()));
			buff.append("',\"creditType\":\"");
			buff.append(getBankCreditName(scm.getCeditTypeId()));
			buff.append("\"},");
		}
		if(null!=list && list.size()>0){
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}");
		
		
		
		System.out.println("buff.toString()==="+buff.toString());
		jsonString=buff.toString();
		
		return SUCCESS;
	}

	/**
	 * 显示列表
	 */
	public String listSelect(){
		String statustype=  this.getRequest().getParameter("type");
		String personId = this.getRequest().getParameter("personId");
		String oppositeType = this.getRequest().getParameter("oppositeType");
		QueryFilter filter=new QueryFilter(getRequest());
		SimpleDateFormat dateTimeFormat = new SimpleDateFormat("yyyy-MM-dd");
		 String  dateStr =  dateTimeFormat.format(new Date());
		if(statustype!=null){
			if(statustype.equals("2")){//放大镜查询
				filter.addFilter("Q_oppositeID_L_EQ", personId);
				filter.addFilter("Q_oppositeType_S_EQ", oppositeType);
				filter.addFilter("Q_status_SN_EQ", Short.valueOf(statustype));
				filter.addFilter("Q_endTime_D_GE",dateStr);//查询授信金额时间大于当前时间的
			}
		}
		List<BankCredit> list= bankCreditService.getAll(filter);
		Type type=new TypeToken<List<BankCredit>>(){}.getType();
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString=buff.toString();
		return SUCCESS;
	}
	/**  
	 * 显示列表
	 */
	public String list(){
		Object ids=this.getRequest().getSession().getAttribute("userIds");
		Map<String,String> map=GroupUtil.separateFactor(getRequest(),ids);
		String userIdsStr=map.get("userId");
		
		PageBean<BankCredit> pageBean = new PageBean<BankCredit>(start, limit,getRequest());
		bankCreditService.findList(pageBean,userIdsStr);
		
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
				bankCreditService.remove(new Long(id));
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
		BankCredit bankCredit=bankCreditService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bankCredit));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bankCredit.getId()==null){
			bankCreditService.save(bankCredit);
		}else{
			BankCredit orgBankCredit=bankCreditService.get(bankCredit.getId());
			try{
				BeanUtil.copyNotNullProperties(orgBankCredit, bankCredit);
				bankCreditService.save(orgBankCredit);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	/**
	 * 更新授信信息
	 */
	public  String updatebk(){
		String taskId = this.getRequest().getParameter("taskId");  //	任务ID 
		if(id!=null  && !"".equals(id)){
			BankCredit orgBankCredit=bankCreditService.get(id);//拷贝实体属性的值
			orgBankCredit.setTaskId(taskId);
			bankCreditService.merge(orgBankCredit);
		}
		return  SUCCESS;
	}
	
	
	/**********************************************************************/
	
	/********************************加载流程业务数据***************************************/
	@Resource
	protected AreaDicService areaDicService ;
	//加载流程业务数据
	public String getInfo(){
		String projectId=this.getRequest().getParameter("slProjectId");
		String taskId = this.getRequest().getParameter("slTaskId");  //	任务ID 
		
		BankCredit orgBankCredit=bankCreditService.get(Long.valueOf(projectId));
		Map<String, Object> map = new HashMap<String, Object>();
		
		if("company_customer".equals(orgBankCredit.getOppositeType())){//企业
			Enterprise enterprise1= enterpriseService.getById(orgBankCredit.getOppositeID().intValue());
			Person p=null;
			if(null!=enterprise1.getLegalpersonid()){
				p = this.personService.getById(enterprise1.getLegalpersonid());
			}
			//添加行业类型名称
			if(enterprise1.getHangyeType()!=null  &&!"".equals(enterprise1.getHangyeType())){
				//查询行业类别数据字段
				AreaDic  ac = 	areaDicService.getById(enterprise1.getHangyeType());
				if(ac.getText()!=null && !"".equals(ac.getText())){
					enterprise1.setHangyeName(ac.getText());
				}
			}
            map.put("enterprise", enterprise1);
            map.put("person", p);
		}else if("person_customer".equals(orgBankCredit.getOppositeType())){//个人
			Person p = this.personService.getById(orgBankCredit.getOppositeID().intValue());
			map.put("person", p);
			if (null != p) {
					if (null != p.getId()) {
						if (null != p.getMarry() && p.getMarry() == 317) {
							Spouse spouse = spouseService.getByPersonId(p.getId());
						if(null!=spouse){
							map.put("spouse", spouse);
						}
						}
					}
				}
		}
		
		if(null!=taskId && !"".equals(taskId)){
			ProcessForm pform = processFormService.getByTaskId(taskId);
			if(pform==null){
				pform = creditProjectService.getCommentsByTaskId(taskId);
			}
			if(pform!=null&&pform.getComments()!=null&&!"".equals(pform.getComments())){
				map.put("comments", pform.getComments());
			}
		}
		
		map.put("bankCredit", orgBankCredit);
		StringBuffer buff = new StringBuffer("{success:true,data:");
		JSONSerializer json = JsonUtil.getJSONSerializerDateByFormate("yyyy-MM-dd");
		buff.append(json.serialize(map));
		buff.append("}");
		jsonString=buff.toString();
		return SUCCESS;
	}
	
	
//	public String getTaskId() {
//		return taskId;
//	}
//
//	public void setTaskId(String taskId) {
//		this.taskId = taskId;
//	}
}
