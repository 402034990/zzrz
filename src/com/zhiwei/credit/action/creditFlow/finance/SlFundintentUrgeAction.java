package com.zhiwei.credit.action.creditFlow.finance;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.jms.MailMessageProducer;
import com.zhiwei.core.model.MailModel;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.ContextUtil;
import com.zhiwei.core.util.JsonUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.Enterprise;
import com.zhiwei.credit.model.creditFlow.customer.person.Person;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;
import com.zhiwei.credit.model.creditFlow.finance.SlFundintentUrge;
import com.zhiwei.credit.model.creditFlow.financeProject.FlFinancingProject;
import com.zhiwei.credit.model.creditFlow.fund.project.BpFundProject;
import com.zhiwei.credit.model.creditFlow.guarantee.project.GLGuaranteeloanProject;
import com.zhiwei.credit.model.system.AppUser;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.EnterpriseService;
import com.zhiwei.credit.service.creditFlow.customer.person.PersonService;
import com.zhiwei.credit.service.creditFlow.finance.SlFundIntentService;
import com.zhiwei.credit.service.creditFlow.finance.SlFundintentUrgeService;
import com.zhiwei.credit.service.creditFlow.financeProject.FlFinancingProjectService;
import com.zhiwei.credit.service.creditFlow.fund.project.BpFundProjectService;
import com.zhiwei.credit.service.creditFlow.guarantee.project.GLGuaranteeloanProjectService;
import com.zhiwei.credit.service.creditFlow.leaseFinance.project.FlLeaseFinanceProjectService;
import com.zhiwei.credit.service.creditFlow.pawn.project.PlPawnProjectService;
import com.zhiwei.credit.service.creditFlow.smallLoan.project.SlSmallloanProjectService;
import com.zhiwei.credit.service.sms.util.SmsSendUtil;
import com.zhiwei.credit.service.system.AppUserService;
import com.zhiwei.credit.util.HibernateProxyTypeAdapter;

import flexjson.JSONSerializer;
/**
 * 
 * @author 
 *
 */
public class SlFundintentUrgeAction extends BaseAction{
	@Resource
	private SlFundintentUrgeService slFundintentUrgeService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private SlSmallloanProjectService slSmallloanProjectService;

	@Resource
	private FlFinancingProjectService flFinancingProjectService;
	@Resource
	private GLGuaranteeloanProjectService glGuaranteeloanProjectService; //企业贷款
	@Resource
	private EnterpriseService enterpriseService;
	@Resource
	private PersonService personService;
	@Resource
	private SlFundIntentService slFundIntentService;
	@Resource
	private PlPawnProjectService plPawnProjectService;
	@Resource
	private FlLeaseFinanceProjectService flLeaseFinanceProjectService;
	@Resource
	private BpFundProjectService bpFundProjectService;
	private SlFundintentUrge slFundintentUrge;
	private Long projectId ;
	private String businessType;
	
	public String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}
	private Long slFundintentUrgeId;

	public Long getSlFundintentUrgeId() {
		return slFundintentUrgeId;
	}

	public void setSlFundintentUrgeId(Long slFundintentUrgeId) {
		this.slFundintentUrgeId = slFundintentUrgeId;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	public SlFundintentUrge getSlFundintentUrge() {
		return slFundintentUrge;
	}

	public void setSlFundintentUrge(SlFundintentUrge slFundintentUrge) {
		this.slFundintentUrge = slFundintentUrge;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<SlFundintentUrge> list= slFundintentUrgeService.getAll(filter);
		
		
		
		Type type=new TypeToken<List<SlFundintentUrge>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
public String listByfundIntentId(){
	String fundIntentId=(String)getRequest().getParameter("fundIntentId");
		QueryFilter filter=new QueryFilter(getRequest());
		List<SlFundintentUrge> list= slFundintentUrgeService.getlistbyfundintentId(Long.valueOf(fundIntentId));
          for(SlFundintentUrge f:list){
			
			f.setUrgePersonName(appUserService.get(f.getUrgePerson()).getFullname());
			if(f.getUrgeType().equals(Long.valueOf("1"))){
				f.setUrgeTypeName("发送邮件");
			}else if(f.getUrgeType().equals(Long.valueOf("2"))){
				f.setUrgeTypeName("发送短信");
			}else{
				
				f.setUrgeTypeName("电话催收");
				
			}
		}
		Type type=new TypeToken<List<SlFundintentUrge>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(list.size()).append(",result:");
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
public String listByprojectId(){

		List<SlFundintentUrge> list= slFundintentUrgeService.getListByProjectId(projectId);
          for(SlFundintentUrge f:list){
			
			f.setUrgePersonName(appUserService.get(f.getUrgePerson()).getFullname());
			if(f.getUrgeType().equals(Long.valueOf("1"))){
				f.setUrgeTypeName("发送邮件");
			}else if(f.getUrgeType().equals(Long.valueOf("2"))){
				f.setUrgeTypeName("发送短信");
			}else if(f.getUrgeType().equals(Long.valueOf("4"))){
				f.setUrgeTypeName("纸质邮件");
			}else{
				
				f.setUrgeTypeName("电话催收");
				
			}
		}
		Type type=new TypeToken<List<SlFundintentUrge>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(list.size()).append(",result:");
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
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
				slFundintentUrgeService.remove(new Long(id));
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
		SlFundintentUrge slFundintentUrge=slFundintentUrgeService.get(slFundintentUrgeId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(slFundintentUrge));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		AppUser user=ContextUtil.getCurrentUser();
		slFundintentUrge.setUrgePerson(user.getUserId());
		slFundintentUrge.setUrgeTime(new Date());
		slFundintentUrgeService.save(slFundintentUrge);
		if(null !=slFundintentUrge.getFundIntentId()){
			SlFundIntent sl= slFundIntentService.get(slFundintentUrge.getFundIntentId());
			sl.setLastslFundintentUrgeId(slFundintentUrge.getSlFundintentUrgeId());
			slFundIntentService.save(sl);
			MailMessageProducer mailMessageProducerThread = (MailMessageProducer) AppUtil.getBean("mailMessageProducer");
			String email="";
			String telephote="";
			BigDecimal projectMoney=new BigDecimal("0");
			BigDecimal notMoney=sl.getNotMoney();
			//催款金额+罚息金额
			if(sl.getAccrualMoney()!=null  &&  !"".equals(sl.getAccrualMoney())){
				notMoney.add(sl.getAccrualMoney());
			}
			//催款金额+逾期金额
			if(sl.getOverdureMoney()!=null  &&  !"".equals(sl.getOverdureMoney())){
				notMoney.add(sl.getOverdureMoney());
			}
			
			Date projectStartDate=new Date();
			Date intentDate=sl.getIntentDate();
			businessType=sl.getBusinessType();
			projectId=sl.getProjectId();
			String title=slFundintentUrge.getUrgeTitle();
			Long oppositeID=Long.valueOf("1");
			String oppositeType="";
			if(businessType.equals("SmallLoan")){
				BpFundProject bp=bpFundProjectService.getByProjectId(Long.valueOf(projectId),Short.parseShort("0"));
				oppositeID=bp.getOppositeID();
				oppositeType=bp.getOppositeType();
				projectStartDate=bp.getStartDate();
				projectMoney=bp.getOwnJointMoney();
				 
				
				
			}
			if(businessType.equals("Financing")){
				FlFinancingProject flp=flFinancingProjectService.get(projectId);
				oppositeID=flp.getOppositeID();
				oppositeType=flp.getOppositeType();
				projectStartDate=flp.getStartDate();
				projectMoney=flp.getProjectMoney();
			}
			if(businessType.equals("Guarantee")){
				GLGuaranteeloanProject glp=glGuaranteeloanProjectService.get(projectId);
				oppositeID=glp.getOppositeID();
				oppositeType=glp.getOppositeType();
				projectStartDate=glp.getAcceptDate();
				projectMoney=glp.getProjectMoney();
			}
			
			Enterprise enterprise1=new Enterprise();
			Person person=new Person();
			if(oppositeType.equals("company_customer")){
				enterprise1=this.enterpriseService.getById(oppositeID.intValue());
				email=enterprise1.getEmail();
				telephote=enterprise1.getTelephone();
			}else{
				person=this.personService.getById(oppositeID.intValue());
				email=person.getSelfemail();
				telephote=person.getCellphone();
			}
			if(slFundintentUrge.getUrgeType().equals(Long.valueOf("1"))){
				if(email !=null){
					if(logger.isDebugEnabled()){
						logger.info("Notice  by mail:" + email);
					}
					String tempPath="mail/urgeIntentMail.vm";
					Map model=new HashMap();
					model.put("projectStartDate", projectStartDate);
					model.put("projectMoney", projectMoney);
					model.put("notMoney", notMoney);
					model.put("intentDate", intentDate);
					model.put("title", projectMoney);
					model.put("content", "还款催收短信");
					String subject="提醒";
					
					MailModel mailModel=new MailModel();
					mailModel.setMailTemplate(tempPath);
					mailModel.setTo(email);
					mailModel.setSubject(subject);
					mailModel.setMailData(model);
					//把邮件加至发送列队中去
					mailMessageProducerThread.send(mailModel);
				}
				
			}else if(slFundintentUrge.getUrgeType().equals(Long.valueOf("2"))){
				if(telephote!=null && !telephote.equals("")){
					if(logger.isDebugEnabled()){
						logger.info("Notice by mobile:" + telephote);
					}
						
					/*	String cName="";//客户名称
						String content="现尚余"+notMoney+"元将于"+intentDate+"到期，请抓紧筹措资金按期归还借款，如到期未还，我公司即依照借款合同有关规定予以处理。";
						String ECCode=com.dmkj.webservice.PropertiesUtil.getProperty("companyCode");
						String AdminNum=com.dmkj.webservice.PropertiesUtil.getProperty("userName");
						String AdminPass=com.dmkj.webservice.PropertiesUtil.getProperty("passWord");
						String SmsType="0";
						String PhoneList=telephote;
					    WebServiceUtil aa = new WebServiceUtil();
				        aa.sendSms(ECCode,AdminNum,AdminPass,PhoneList,content,SmsType);*/
					  SimpleDateFormat dateformat1=new SimpleDateFormat("yyyy-MM-dd");
					  String a1=dateformat1.format(intentDate);
					  String [] ss=a1.split("-");
					  String year=ss[0];
					  String month=ss[1];
					  String day=ss[2];
					SmsSendUtil sms = new SmsSendUtil();
				    sms.sms_huankuancuishou(telephote,notMoney.toString(),year,month,day);  
				}
			}
		}
	setJsonString("{success:true}");
		return SUCCESS;
		
	}
	public String getUrgeCustom(){
		Long oppositeID=Long.valueOf("1");
		String oppositeType="";
		if(businessType.equals("SmallLoan")){
			oppositeID=slSmallloanProjectService.get(projectId).getOppositeID();
			oppositeType=slSmallloanProjectService.get(projectId).getOppositeType();
		}
		if(businessType.equals("Financing")){
			oppositeID=flFinancingProjectService.get(projectId).getOppositeID();
			oppositeType=flFinancingProjectService.get(projectId).getOppositeType();
		}
		if(businessType.equals("Guarantee")){
			oppositeID=glGuaranteeloanProjectService.get(projectId).getOppositeID();
			oppositeType=glGuaranteeloanProjectService.get(projectId).getOppositeType();
		}
		if(businessType.equals("Pawn")){
			oppositeID=plPawnProjectService.get(projectId).getOppositeID();
			oppositeType=plPawnProjectService.get(projectId).getOppositeType();
		}
		if(businessType.equals("LeaseFinance")){
			oppositeID=flLeaseFinanceProjectService.get(projectId).getOppositeID();
			oppositeType=flLeaseFinanceProjectService.get(projectId).getOppositeType();
		}
		if(oppositeType.equals("company_customer")){
		Enterprise enterprise1=this.enterpriseService.getById(oppositeID.intValue());
		}
		Enterprise enterprise1=new Enterprise();
		Person person=new Person();
		if(oppositeType.equals("company_customer")){
			enterprise1=this.enterpriseService.getById(oppositeID.intValue());
		}else{
			person=this.personService.getById(oppositeID.intValue());
			
		}
		//Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY).create();
		
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,oppositeID:"+oppositeID+",oppositeType:\""+oppositeType+"\",data:");

		JSONSerializer serializer = JsonUtil.getJSONSerializer();
		
		//setJsonString(sb.toString());
		if(oppositeType.equals("company_customer")){
			sb.append(serializer.exclude(
					new String[] { "class"}).serialize(
							enterprise1));
		}else{
			sb.append(serializer.exclude(
					new String[] { "class"}).serialize(
							person));
		}
		
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
		
	}
}
