package com.zhiwei.credit.action.creditFlow.customer.enterprise;

import java.io.File;
import java.io.StringReader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.sdicons.json.mapper.JSONMapper;
import com.sdicons.json.parser.JSONParser;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.util.ContextUtil;
import com.zhiwei.core.util.DateUtil;
import com.zhiwei.core.util.GroupUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.core.web.paging.PagingBean;
import com.zhiwei.credit.core.creditUtils.ExcelHelper;
import com.zhiwei.credit.core.creditUtils.JsonUtil;
import com.zhiwei.credit.core.util.FileHelper;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.Enterprise;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.EnterpriseShareequity;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.EnterpriseView;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.VEnterprisePerson;
import com.zhiwei.credit.model.creditFlow.customer.person.CsPersonCar;
import com.zhiwei.credit.model.creditFlow.customer.person.CsPersonHouse;
import com.zhiwei.credit.model.creditFlow.customer.person.Person;
import com.zhiwei.credit.model.creditFlow.customer.person.VPersonDic;
import com.zhiwei.credit.model.creditFlow.fileUploads.FileForm;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;
import com.zhiwei.credit.model.system.AppUser;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.EnterpriseService;
import com.zhiwei.credit.service.creditFlow.customer.person.CsPersonCarService;
import com.zhiwei.credit.service.creditFlow.customer.person.CsPersonHouseService;
import com.zhiwei.credit.service.creditFlow.customer.person.PersonService;
import com.zhiwei.credit.service.creditFlow.fileUploads.FileFormService;
import com.zhiwei.credit.service.creditFlow.multiLevelDic.AreaDicService;
import com.zhiwei.credit.service.creditFlow.smallLoan.project.SlSmallloanProjectService;
import com.zhiwei.credit.service.system.AppUserService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author 
 *
 */
public class EnterpriseAction extends BaseAction{
	@Resource
	private AppUserService appUserService;
	@Resource
	private EnterpriseService enterpriseService;
	@Resource
	private FileFormService fileFormService;
	@Resource
	private SlSmallloanProjectService slSmallloanProjectService;
	@Resource
	private PersonService personService;
	@Resource
	private AreaDicService areaDicService;
	@Resource
	private CsPersonCarService csPersonCarService;
	@Resource
	private CsPersonHouseService csPersonHouseService;
	private Boolean isGrantedSeeAllEnterprises;
	private String enterprisename="";
	private String ownership=""; 
	private String shortname="";
	private String organizecode="";
	private String cciaa="";
	private String customerLevel="";
	private Enterprise enterprise;
	private Person person;
	private String extendname="";
	private File fileUpload;
	private String fileUploadFileName;
	public final int UPLOAD_SIZE = 1024 * 1024 * 10;
	private String listId ;
	private String blackReason;
	private Integer id;
	private String businessType;
	private Boolean isGrantedSeeAllBlackList;
	private String customerType;
	private String customerName="";
	private String cardNum="";
	private String customerId;
	private String query;
	private Boolean isAll;
	
	//查询客户旗下公司信息
	public void getEnterByProject(){
		String legalpersonid = getRequest().getParameter("legalpersonid");
		if(null!=legalpersonid && !"".equals(legalpersonid)){
			enterpriseService.getEnterByProject(Integer.parseInt(legalpersonid));
		}
	}
	
	/**
	 * ajax查询企业信息
	 */
	public String getList(){
		HttpServletRequest request = getRequest();
		QueryFilter filter = new QueryFilter(request);
		PagingBean pb = filter.getPagingBean();
		String enterId = request.getParameter("enterId");
		if(enterId==null||enterId.equals("")){
			return SUCCESS;
		}
		Enterprise enterprise = enterpriseService.getById(Integer.parseInt(enterId));
		String type = request.getParameter("type");
		if(type==null||"".equals(type)||"undefined".equals(type)){
			if(enterprise!=null){
				String revIds = enterprise.getRevIds();
				if(revIds!=null&&!"".equals(revIds)&&revIds.trim().length()!=0){
					//List<Enterprise> list = enterpriseService.getList(revIds, pb,"1");
					//JsonUtil.jsonFromList(list, pb.getTotalItems()) ;
					enterpriseService.getList(revIds, pb,"1");
				}
			}
		}else{
			if(enterprise!=null){
				String revIds = enterprise.getRevIds();
				StringBuffer buff = new StringBuffer("");
				if(revIds!=null&&!"".equals(revIds)){
					buff.append(revIds).append(",").append(enterprise.getId());
				}else{
					buff.append(enterprise.getId());
				}
				//List<Enterprise> list = enterpriseService.getList(buff.toString(), pb,"0");
				///JsonUtil.jsonFromList(list, pb.getTotalItems()) ;
				enterpriseService.getList(buff.toString(), pb,"0");
			}
		}
		
		return SUCCESS;
	}
	public void ajaxQuery() {
		Object ids=this.getRequest().getSession().getAttribute("userIds");
		Map<String,String> map=GroupUtil.separateFactor(getRequest(),ids);
		String companyId= map.get("companyId");
		String userIds= map.get("userId");
		enterpriseService.ajaxQueryEnterprise(companyId,userIds,enterprisename, ownership,shortname, organizecode,cciaa, start, limit,sort,dir,customerLevel);
	}
	
	public String entList(){
		try{
			Object ids=this.getRequest().getSession().getAttribute("userIds");
			Map<String,String> map=GroupUtil.separateFactor(getRequest(),ids);
			PageBean<Enterprise> pageBean = new PageBean<Enterprise>(start,limit,getRequest());
			enterpriseService.entList(pageBean,map);
			JsonUtil.jsonFromList(pageBean.getResult(),pageBean.getTotalCounts());
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * ajax方式新增企业
	 */
	
	public void ajaxAdd(){
		try {
			
			String shareequity=this.getRequest().getParameter("gudongInfo");
	   		List<EnterpriseShareequity> listES=new ArrayList<EnterpriseShareequity>(); //股东信息
        	if(null != shareequity && !"".equals(shareequity)) {
    				String[] shareequityArr = shareequity.split("@");
    				 for(int i=0; i<shareequityArr.length; i++) {
    						String str = shareequityArr[i];
    						JSONParser parser = new JSONParser(new StringReader(str));
    						try{
    							EnterpriseShareequity enterpriseShareequity = (EnterpriseShareequity)JSONMapper.toJava(parser.nextValue(),EnterpriseShareequity.class);
    							listES.add(enterpriseShareequity);
    						
    						} catch(Exception e) {
    							e.printStackTrace();
    						}
    					}
    		}
        	String enterpriseGsdjzId = super.getRequest().getParameter("enterpriseGsdjzId");
        	String enterpriseYyzzId = super.getRequest().getParameter("enterpriseYyzzId");
        	String enterpriseYyzzzId = super.getRequest().getParameter("enterpriseYyzzzId");
        	String enterpriseZzjgId = super.getRequest().getParameter("enterpriseZzjgId");
        	String enterpriseDsdjId = super.getRequest().getParameter("enterpriseDsdjId");
        	String enterprisetyjId =  super.getRequest().getParameter("enterprisetyjId");
            
        	Map<String,String> map= new HashMap<String, String>();
        	map.put("enterpriseGsdjzId", enterpriseGsdjzId);
        	map.put("enterpriseYyzzId", enterpriseYyzzId);
        	map.put("enterpriseYyzzzId", enterpriseYyzzzId);
        	map.put("enterpriseZzjgId", enterpriseZzjgId);
        	map.put("enterpriseDsdjId", enterpriseDsdjId);
        	map.put("enterprisetyjId", enterprisetyjId);
         	
        	String personSFZZId = super.getRequest().getParameter("personSFZZId");
        	String personSFZFId = super.getRequest().getParameter("personSFZFId");
        	String currentUserName = ContextUtil.getCurrentUser().getFullname(); 
        	Long currentUserId =  ContextUtil.getCurrentUserId();
        	
        	Long companyId = ContextUtil.getLoginCompanyId();
        	if(null!=companyId){
        		if(null==person.getCompanyId()){
        			person.setCompanyId(companyId);
        		}
        		if(null==enterprise.getCompanyId()){
        			enterprise.setCompanyId(companyId);
        		}
        	}
        	enterprise.setCreater(currentUserName);
        	if(null==enterprise.getId()){
        		enterprise.setEnterpriseNumber(AppUtil.createEnNum(enterpriseService));
        	}
        	enterprise.setCreaterId(currentUserId);
        	if("".equals(enterprise.getBelongedId())|| enterprise.getBelongedId()==null){
        		enterprise.setBelongedId(currentUserId.toString());
        	}
        	enterprise.setCreatedate(DateUtil.getNowDateTimeTs());
        	person.setCreater(currentUserName);
        	person.setCreaterId(currentUserId);
        	person.setBelongedId(currentUserId.toString());
        	person.setCreatedate(DateUtil.getNowDateTimeTs());
        	
			enterpriseService.ajaxAddEnterprise(enterprise,person,listES,personSFZZId,personSFZFId,map);
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void uploadPhoto(){
		HttpServletRequest request = getRequest();
		String mark = getRequest().getParameter("mark");
		String realPath = super.getRequest().getRealPath("/");
		File file = new File(realPath+"attachFiles\\uploads\\cs_enterprise_tx");
		if (!file.exists()) { 
			file.mkdirs();
        }
		String guid = UUID.randomUUID().toString();
		String webPath = "attachFiles/uploads/cs_enterprise_tx"+"/"+guid+extendname;
		String filepath = "attachFiles\\uploads\\cs_enterprise_tx"+"\\"+guid+extendname;
		file = new File(realPath+"attachFiles\\uploads\\cs_enterprise_tx"+"\\"+guid+extendname);
		boolean flag = FileHelper.fileUpload(fileUpload ,file , new byte[UPLOAD_SIZE]);
		FileForm fileinfo = new FileForm();
		if(flag){
			fileinfo.setMark(mark);
			fileinfo.setContentType("");
			fileinfo.setSetname(fileUploadFileName);
			fileinfo.setFilename("");
			fileinfo.setFilepath(filepath);
			fileinfo.setExtendname(extendname);
			fileinfo.setCreatetime(DateUtil.getNowDateTimeTs());
			Long sl=fileUpload.length();
			fileinfo.setFilesize(sl.intValue());
			fileinfo.setCreatorid(1);
			//fileinfo.setRemark("");
			fileinfo.setWebPath(webPath);
			fileFormService.save(fileinfo);
		}
		String jsonStr = "{success : true,fileid :"+fileinfo.getFileid()+",webPath :'"+fileinfo.getWebPath()+"'}";
		JsonUtil.responseJsonString(jsonStr,"text/html; charset=utf-8");
		
	}
	/*
	 * 删除关联企业
	 * **/
	public String ajaxDelete(){
		String enterId  = this.getRequest().getParameter("enterId");
		
		String listId = this.getRequest().getParameter("listId");
		
		if(null!=enterId&&!"".equals(enterId)&&null!=listId&&!"".equals(listId)){
			Enterprise enter = enterpriseService.getById(Integer.parseInt(enterId));
			if(null!=enter){
				String revIds = enter.getRevIds();
				String[] ids = listId.split(",");
				if(null!=ids&&ids.length!=0){
					for(int i= 0; i<ids.length;i++){
						String id = ids[i];
						if(null!=id&&!"".equals(id)){
							revIds = revIds.replace(","+id, "");//不在首位
							revIds = revIds.replace(id+",", "");//不在尾位
							revIds = revIds.replace(id, "");//单独一个
						}
					}
					if("".equals(revIds)||revIds.trim().length()==0){
						enter.setRevIds(null);
					}else{
						enter.setRevIds(revIds);
					}
					
					enterpriseService.merge(enter);
				}
			}
			
		}
		JsonUtil.responseJsonString("{success:true,flag:'true',msg:'删除成功!'}");
		return SUCCESS;
	}
	/**
	 * 根据id删除企业信息
	 */
	
	public void ajaxDeleteWithId() {
		/*String[] strTable = {"cs_enterprise-id","cs_enterprise_attachfile-enterpriseid",
				"cs_enterprise_bank-enterpriseid","cs_enterprise_creditor-enterpriseid",
				"cs_enterprise_debt-enterpriseid","cs_enterprise_lawsuit-enterpriseid",
				"cs_enterprise_leadteam-enterpriseid","cs_enterprise_managecase-enterpriseid",
				"cs_enterprise_outassure-enterpriseid","cs_enterprise_outinvest-enterpriseid",
				"cs_enterprise_prize-enterpriseid","cs_enterprise_relatecompany-enterpriseid",
				"cs_enterprise_relatedata-enterpriseid","cs_enterprise_relationperson-enterpriseid",
				"cs_enterprise_shareequity-enterpriseid"};*/
		String[] strTable = {"cs_enterprise-id",
				"cs_enterprise_bank-enterpriseid","cs_enterprise_creditor-enterpriseid",
				"cs_enterprise_debt-enterpriseid",/*"cs_enterprise_lawsuit-enterpriseid",*/
				"cs_enterprise_leadteam-enterpriseid","cs_enterprise_managecase-enterpriseid",
				"cs_enterprise_outassure-enterpriseid","cs_enterprise_outinvest-enterpriseid",
				"cs_enterprise_prize-enterpriseid","cs_enterprise_relatecompany-enterpriseid",
				"cs_enterprise_relatedata-enterpriseid","cs_enterprise_relationperson-enterpriseid",
				"cs_enterprise_shareequity-enterpriseid"};
		String [] listArrayId =listId.split(",");
		
		try {
			boolean flag=true;
			for(int i=0;i<listArrayId.length;i++){
				if(null!=listArrayId[i]){
					List<SlSmallloanProject> slist=slSmallloanProjectService.getListOfCustomer("company_customer", Long.valueOf(listArrayId[i]));
					if(null!=slist && slist.size()>0){
						flag=false;
						Enterprise e=enterpriseService.getById(Integer.valueOf(listArrayId[i]));
						JsonUtil.responseJsonString("{success:true,flag:'false',msg:'"+e.getEnterprisename()+"在项目中已被使用，不能删除'}");
					}
				}
			}
			if(flag==true){
				String  turl = super.getRequest().getRealPath("/");
				enterpriseService.ajaxDeleteEnterpriseWithId(strTable, listArrayId,turl);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public void isEntEmpty(){
		try {
			if("" == organizecode){
				JsonUtil.jsonFromObject(null, true);
			}else{
				Enterprise enterprise = enterpriseService.isEmpty(organizecode);
				enterpriseService.evict(enterprise);
				enterprise.setBpCustEntCashflowAndSaleIncomelist(null);
				enterprise.setBpCustEntLawsuitlist(null);
				enterprise.setBpCustEntUpanddownstreamlist(null);
				enterprise.setBpCustEntUpanddowncontractlist(null);
				enterprise.setBpCustEntPaytaxlist(null);
				JsonUtil.jsonFromObject(enterprise, true);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public void outputExcel(){
		String [] tableHeader = {"序号","企业名称","企业简称","组织机构代码","营业执照号码","法人","注册资金(万元)","联系电话","企业成立日期"};
		try {
			Object ids=this.getRequest().getSession().getAttribute("userIds");
			Map<String,String> map=GroupUtil.separateFactor(getRequest(),ids);
			PageBean<Enterprise> pageBean = new PageBean<Enterprise>(null,null,getRequest());
			enterpriseService.entList(pageBean,map);
			ExcelHelper.export(pageBean.getResult(),tableHeader,"企业客户列表");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public void addBlack(){
		String msg="";
		try {
			Enterprise ep=enterpriseService.getById(id);
			ep.setIsBlack(true);
			ep.setBlackReason(blackReason);
			enterpriseService.merge(ep);
			msg="{success:true}";
		} catch (Exception e) {
			msg="{success:false}";
			e.printStackTrace();
		}
		JsonUtil.responseJsonString(msg);
	}
	public void loadInfo() {
		try
		{
			if("Financing".equals(businessType)){
				enterpriseService.getSlCompanyInfo(id);
			}else{
				Enterprise enterprise1=this.enterpriseService.getById(id);
				Map<String, Object> mapObject = new HashMap<String, Object>();
				if(null != enterprise1.getHangyeType()) {
					  if(null!=areaDicService.getById(enterprise1.getHangyeType())){
						  
						  enterprise1.setHangyeName(areaDicService.getById(enterprise1.getHangyeType()).getText());
					  }
				}
				String belongedName = "";
				if(enterprise1.getBelongedId() != null && enterprise1.getBelongedId() != "") {
					String []belongedIds = enterprise1.getBelongedId().split(",");
					Set<AppUser> userSet = appUserService.getAppUserByStr(belongedIds);
					for(AppUser s:userSet){
						belongedName += s.getFamilyName() + ",";
					}
					if(!"".equals(belongedName)){
						belongedName = belongedName.substring(0,belongedName.length() - 1);
					}
				}
				enterprise1.setBelongedName(belongedName);
				if(null!=enterprise1.getManagecity() && !enterprise1.getManagecity().trim().equals("")){
					String[] regx=enterprise1.getManagecity().split(",");
					String rex="";
					for(int i=0;i<regx.length;i++){
						String temp=areaDicService.getById(Integer.valueOf(regx[i])).getText();
						if(i==(regx.length-1)){
							rex+=temp;
						}
						else{
							rex+=temp+"_";
						}
					}
					enterprise1.setManagecityName(rex);
				}
				
				FileForm fileForm1_enterprise = fileFormService.getFileByMark("cs_enterprise_dsdjz."+enterprise1.getId());
				FileForm fileForm2_enterprise = fileFormService.getFileByMark("cs_enterprise_gsdjz."+enterprise1.getId());
				FileForm fileForm3_enterprise = fileFormService.getFileByMark("cs_enterprise_yyzzfb."+enterprise1.getId());
				FileForm fileForm4_enterprise = fileFormService.getFileByMark("cs_enterprise_zzjgdmz."+enterprise1.getId());
				FileForm fileForm5_enterprise = fileFormService.getFileByMark("cs_enterprise_tyshxydm."+enterprise1.getId());
				FileForm fileForm6_enterprise = fileFormService.getFileByMark("cs_enterprise_yyzzzfb."+enterprise1.getId());
				
				
				if(fileForm1_enterprise != null){
					enterprise1.setEnterpriseDsdjId(fileForm1_enterprise.getFileid());
					enterprise1.setEnterpriseDsdjURL(fileForm1_enterprise.getWebPath());
					enterprise1.setEnterpriseDsdjExtendName(fileForm1_enterprise.getExtendname());
				}
	            if(fileForm2_enterprise != null){
	            	enterprise1.setEnterpriseGsdjzId(fileForm2_enterprise.getFileid());
	            	enterprise1.setEnterpriseGsdjzURL(fileForm2_enterprise.getWebPath());
	            	enterprise1.setEnterpriseGsdjzExtendName(fileForm2_enterprise.getExtendname());
				}
				if(fileForm3_enterprise != null){
							    
					enterprise1.setEnterpriseYyzzId(fileForm3_enterprise.getFileid());	
					enterprise1.setEnterpriseYyzzURL(fileForm3_enterprise.getWebPath());
					enterprise1.setEnterpriseYyzzExtendName(fileForm3_enterprise.getExtendname());
				}
				if(fileForm4_enterprise != null){
					enterprise1.setEnterpriseZzjgId(fileForm4_enterprise.getFileid());
					enterprise1.setEnterpriseZzjgURL(fileForm4_enterprise.getWebPath());
					enterprise1.setEnterpriseZzjgExtendName(fileForm4_enterprise.getExtendname());
				}
				
				//三证
				if(fileForm5_enterprise != null){
					enterprise1.setEnterprisetyjId(fileForm4_enterprise.getFileid());
					enterprise1.setTongyishehuixinyongdaimaURL(fileForm4_enterprise.getWebPath());
					enterprise1.setTongyishehuixinyongdaimaExtendName(fileForm4_enterprise.getExtendname());
				}
				// 营业正面
				if(fileForm6_enterprise != null){
					enterprise1.setEnterpriseYyzzzId(fileForm6_enterprise.getFileid());
					enterprise1.setEnterpriseYyzzzURL(fileForm6_enterprise.getWebPath());
					enterprise1.setEnterpriseYyzzzExtendName(fileForm6_enterprise.getExtendname());
				}
				this.enterpriseService.evict(enterprise1);
				enterprise1.setBpCustEntCashflowAndSaleIncomelist(null);
				enterprise1.setBpCustEntLawsuitlist(null);
				enterprise1.setBpCustEntUpanddownstreamlist(null);
				enterprise1.setBpCustEntPaytaxlist(null);
				enterprise1.setBpCustEntUpanddowncontractlist(null);
				mapObject.put("enterprise", enterprise1);
				
				if(null!=enterprise1.getLegalpersonid() && !"".equals(enterprise1.getLegalpersonid())){
					VPersonDic vPersonDic = personService.queryPerson(enterprise1.getLegalpersonid());
					if(null!=vPersonDic){
						FileForm fileForm2 = fileFormService.getFileByMark("cs_person_sfzz."+vPersonDic.getId());
						vPersonDic.setPersonSFZZId(fileForm2.getFileid());
						vPersonDic.setPersonSFZZUrl(fileForm2.getWebPath());
						FileForm fileForm3 = fileFormService.getFileByMark("cs_person_sfzf."+vPersonDic.getId());
						if(fileForm3 != null){
							vPersonDic.setPersonSFZFId(fileForm3.getFileid());
							vPersonDic.setPersonSFZFUrl(fileForm3.getWebPath());
						}
						mapObject.put("person",vPersonDic);
					}
				}
				JsonUtil.jsonFromObject(mapObject, true);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	
	}
	public void addRev(){
		String ids = getRequest().getParameter("ids");
		String enterId = getRequest().getParameter("enterId");
		if(enterId==null||enterId.equals("")){
			return;
		}
		if(ids==null||"".equals(ids)||ids.length()==0){
			
		}else{
			Enterprise enterprise = enterpriseService.getById(Integer.parseInt(enterId));
			if(enterprise!=null){
				String revIds = enterprise.getRevIds();
				if(revIds==null||revIds.equals("")){
					enterprise.setRevIds(ids.substring(0, ids.length()-1));
				}else{
					enterprise.setRevIds(ids+enterprise.getRevIds());
				}
				enterpriseService.merge(enterprise);
			}
		}
		
	}
	/**
	 * 黑名单列表
	 */
	public void getBlackList(){
		AppUser currentUser= ContextUtil.getCurrentUser();
		String RoleNames =currentUser.getRoleNames();
		String roles[]=RoleNames.split(",");
		Boolean RoleKey =false;//用来判断当前登陆者是不是超级管理员： true表示是超级管理员
		for(int i =0;i<roles.length;i++){
			if("超级管理员".equals(roles[i])){
				RoleKey=true;
			}
		}
		//授权查询全部客户的代码begin 在这里为companyId赋值
		Boolean flag=Boolean.valueOf(AppUtil.getSystemIsGroupVersion());//判断当前是否为集团版本 
	    String  roleType=ContextUtil.getRoleTypeSession();
		String companyId="";
		if(!RoleKey){
			if(flag){//表示为集团版本
				if(roleType.equals("control")){//具有管控角色
					companyId=ContextUtil.getBranchIdsStr();	
				}else{//不具有管控角色
					if(!isGrantedSeeAllBlackList){//不具有查看所有客户的权限
						companyId=String.valueOf(ContextUtil.getLoginCompanyId());
					}
				}
			
			}else {//表示不为集团版本
				if(!isGrantedSeeAllBlackList){
					companyId=String.valueOf(ContextUtil.getLoginCompanyId());
				}
		}
		}
		
		String customerType=getRequest().getParameter("customerType");
		if(customerType.equals("1")){
			customerType="person";
		}else{
			customerType="company";
		}
		
		//授权查询全部客户的代码end
		enterpriseService.getList(customerType, customerName, cardNum,companyId, start, limit);
	}
	/**
	 * 撤销黑名单
	 */
	public void RevocateBlack(){
	    String msg="";
		try {
			if(null!=customerType && customerType.equals("company")){
				Enterprise ep=enterpriseService.getById(Integer.parseInt(customerId));
				ep.setIsBlack(false);
				ep.setCustomerLevel(customerLevel);
				enterpriseService.save(ep);
				msg="{success:true}";
			}else if(null!=customerType && customerType.equals("person")){
				Person p=personService.getById(Integer.parseInt(customerId));
				p.setIsBlack(false);
				p.setCustomerLevel(customerLevel);
				personService.save(p);
				msg="{success:true}";
			}
		} catch (Exception e) {
			msg="{success:false}";
			e.printStackTrace();
		}
		JsonUtil.responseJsonString(msg);
	}
	 public void getHeaderInfo(){
	    	try{
		    	String enterpriseId=this.getRequest().getParameter("enterpriseId");
		    	if(null!=enterpriseId && !"".equals(enterpriseId)){
		    		Enterprise e=enterpriseService.getById(Integer.parseInt(enterpriseId));
		    		if(null!=e){
		    			Person p=null;
		    			if(null!=e.getHeaderId()){
				    		p=personService.getById(e.getHeaderId());
				    		
		    			}
		    			
//		    			JsonUtil.jsonFromObject(p, true);
		    			
//		    			JSONSerializer json = com.zhiwei.core.util.JsonUtil.getJSONSerializer();
//		    			json.transform(new DateTransformer("yyyy-MM-dd"), new String[] {});
//		    			JsonUtil.responseJsonString(json.serialize(p).toString());
		    			
		    			StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		    			JSONSerializer json = com.zhiwei.core.util.JsonUtil.getJSONSerializer();
		    			json.transform(new DateTransformer("yyyy-MM-dd"), new String[] {});
		    			buff.append(json.serialize(p));
		    			buff.append("}");
		    			JsonUtil.responseJsonString(buff.toString());
		    		}
		    	}
	    	}catch(Exception e){
	    		e.printStackTrace();
	    	}
	    	//return SUCCESS;
	    }
    public void addHeader(){
    	String msg="";
    	try{
    		String enterpriseId=this.getRequest().getParameter("enterpriseId");
    		String personId =this.getRequest().getParameter("personId");
			String personCarInfo =this.getRequest().getParameter("personCarInfo");
			String personHouseInfo =this.getRequest().getParameter("personHouseInfo");
			
    		if(null!=enterpriseId && !"".equals(enterpriseId)){
    			Enterprise e=enterpriseService.getById(Integer.parseInt(enterpriseId));
    			if(null==person.getCompanyId()){
    				Long companyId=ContextUtil.getLoginCompanyId();
    				
    				person.setCompanyId(companyId);
    			}
    			Person personOld=personService.getById(Integer.valueOf(personId));
    			if(personCarInfo!=null&&!"".equals(personCarInfo)){
					String[] personCarInfoArr = personCarInfo.split("@");
					for (int i = 0; i < personCarInfoArr.length; i++) {
						String str = personCarInfoArr[i];
						JSONParser parser = new JSONParser(new StringReader(str));
						CsPersonCar csPersonCar = (CsPersonCar) JSONMapper.toJava(
								parser.nextValue(), CsPersonCar.class);
						csPersonCar.setPersonId(Integer.valueOf(personId));
						if(csPersonCar.getId()==null||"".equals(csPersonCar.getId())){
							csPersonCarService.save(csPersonCar);
						}else{
							CsPersonCar temp=csPersonCarService.get(csPersonCar.getId());
							BeanUtil.copyNotNullProperties(temp, csPersonCar);
							csPersonCarService.save(temp);
						}
					}
					
				}
				if(personHouseInfo!=null&&!"".equals(personHouseInfo)){
					String[] personHouseInfoArr = personHouseInfo.split("@");
					for (int i = 0; i < personHouseInfoArr.length; i++) {
						String str = personHouseInfoArr[i];
						JSONParser parser = new JSONParser(new StringReader(str));
						CsPersonHouse csPersonHouse = (CsPersonHouse) JSONMapper.toJava(
								parser.nextValue(), CsPersonHouse.class);
						csPersonHouse.setPersonId(Integer.valueOf(personId));
						if(csPersonHouse.getId()==null||"".equals(csPersonHouse.getId())){
							csPersonHouseService.save(csPersonHouse);
						}else{
							CsPersonHouse tempHouse=csPersonHouseService.get(csPersonHouse.getId());
							BeanUtil.copyNotNullProperties(tempHouse, csPersonHouse);
							csPersonHouseService.save(tempHouse);
						}
					}
					
				}
				if(personOld!=null){
					BeanUtil.copyNotNullProperties(personOld, person);
				}
				personService.merge(personOld);
    			e.setHeaderId(person.getId());
    			enterpriseService.merge(e);
    			msg="{success:true}";
    		}
    	}catch(Exception e){
    		msg="{success:false}";
    		e.printStackTrace();
    	}
    	JsonUtil.responseJsonString(msg);

    }
    public void verificationOrganizecode(){
		try{
		String organizecode=this.getRequest().getParameter("organizecode");
		String enterpriseId=this.getRequest().getParameter("enterpriseId");
		if(null==enterpriseId || "".equals(enterpriseId) || "0".equals(enterpriseId)){
			Enterprise enterprise=enterpriseService.isEmpty(organizecode);
			if(null!=enterprise){
				JsonUtil.responseJsonString("{success:true,msg:false}");
			}
		}else{
			Enterprise e=enterpriseService.getById(Integer.parseInt(enterpriseId));
			if(!e.getOrganizecode().equals(organizecode)){
				Enterprise enterprise=enterpriseService.isEmpty(organizecode);
				if(null!=enterprise){
					JsonUtil.responseJsonString("{success:true,msg:false}");
				}
			}
		}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
    public void ajaxQueryForCombo(){
		enterpriseService.ajaxQueryEnterpriseForCombo(query, start, limit) ;
		
	}
    public String createNumber(){
		String personType=this.getRequest().getParameter("personType");
		String num3="";
		String num="";
		if(personType.equals("enterprise")){
			String personNum=enterpriseService.findPersonNumber();
			if(personNum!=null){
				String num1=personNum.substring(0,1);
				Long num2=Long.valueOf(personNum.substring(1));
				if(num2>0&&num2<9){
					num3="000000";
				}else if(num2>=9&&num2<99){
					num3="00000";
				}else if(num2>=99&&num2<999){
					num3="0000";
				}else if(num2>=999&&num2<9999){
					num3="000";
				}else if(num2>=9999&&num2<99999){
					num3="00";
				}else if(num2>=99999&&num2<999999){
					num3="0";
				}
				num2=num2+1;
				num="2"+num3+num2;
			}else{
				num="20000001";
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,data:");
		buff.append(num);
		buff.append("}");
		jsonString=buff.toString();
		return SUCCESS;
	}
    public void ajaxSee() {
    	try{
			if("Financing".equals(businessType)){
				enterpriseService.getSlCompanyInfo(id);
			}else{
				EnterpriseView ep =enterpriseService.getByViewId(id);
				ep = enterpriseService.setEnterpriseView(ep);
			
				if(null!=ep){
					JsonUtil.jsonFromObject(ep, true) ;
				}else{
					JsonUtil.jsonFromObject("没有查找到相应的企业信息", false) ;
				}
			}
    	}catch(Exception e){
    		e.printStackTrace();
    	}
	}
    
    public void getBlackListToExcel(){
    	try {
    		AppUser currentUser= ContextUtil.getCurrentUser();
    		String RoleNames =currentUser.getRoleNames();
    		String roles[]=RoleNames.split(",");
    		Boolean RoleKey =false;//用来判断当前登陆者是不是超级管理员： true表示是超级管理员
    		for(int i =0;i<roles.length;i++){
    			if("超级管理员".equals(roles[i])){
    				RoleKey=true;
    			}
    		}
    		//授权查询全部客户的代码begin 在这里为companyId赋值
    		Boolean flag=Boolean.valueOf(AppUtil.getSystemIsGroupVersion());//判断当前是否为集团版本 
    	    String  roleType=ContextUtil.getRoleTypeSession();
    		String companyId="";
    		if(!RoleKey){
    			if(flag){//表示为集团版本
    				if(roleType.equals("control")){//具有管控角色
    					companyId=ContextUtil.getBranchIdsStr();	
    				}else{//不具有管控角色
    					if(!isGrantedSeeAllBlackList){//不具有查看所有客户的权限
    						companyId=String.valueOf(ContextUtil.getLoginCompanyId());
    					}
    				}
    			
    			}else {//表示不为集团版本
    				if(!isGrantedSeeAllBlackList){
    					companyId=String.valueOf(ContextUtil.getLoginCompanyId());
    				}
    		}
    		}
    		
    		String customerType=getRequest().getParameter("customerType");
    		if(customerType.equals("1")){
    			customerType="person";
    		}else{
    			customerType="company";
    		}
    		
    		//授权查询全部客户的代码end
    		List<VEnterprisePerson> list= enterpriseService.getBlackListToExcel(customerType, customerName, cardNum,companyId, start, limit);
			//授权查询全部客户的代码end
			String [] tableHeader = {"序号","客户名称","证件号码","联系电话","原因说明"};
			ExcelHelper.exportAllBlackList(list,tableHeader,"黑名单客户");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    
    //查询企业户开通P2P账号情况
    public String list(){
		String userIdsStr = "";
		String roleTypeStr = ContextUtil.getRoleTypeSession();
		if (!isAll && !roleTypeStr.equals("control")) {// 如果用户不拥有查看所有项目信息的权限
			userIdsStr = appUserService.getUsersStr();// 当前登录用户以及其所有下属用户
		}
    	List<EnterpriseView> listEnterprise=enterpriseService.enterPriseList(start,limit,this.getRequest(),userIdsStr);
		List<EnterpriseView> listEnterpriseCount=enterpriseService.enterPriseList(null,null,this.getRequest(),userIdsStr);
		StringBuffer buff = new StringBuffer("{success:true,'totalProperty':")
		.append(listEnterpriseCount!=null?listEnterpriseCount.size():0).append(",topics:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd")
		/* .excludeFieldsWithoutExposeAnnotation() */.create();
		buff.append(gson.toJson(listEnterprise));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
    }
    
    //查询企业客户资金账户表
    public String fianceAccountList(){
    	String userIdsStr = "";
		String roleTypeStr = ContextUtil.getRoleTypeSession();
		if (!isAll && !roleTypeStr.equals("control")) {// 如果用户不拥有查看所有项目信息的权限
			userIdsStr = appUserService.getUsersStr();// 当前登录用户以及其所有下属用户
		}
    	PagingBean pb=new PagingBean(start,limit);
		Map map=ContextUtil.createResponseMap(this.getRequest());
		map.put("userIdsStr", userIdsStr);
		List<EnterpriseView> list= enterpriseService.getAllAccountList(map,pb);
		Type type=new TypeToken<List<EnterpriseView>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pb.getTotalItems()).append(",result:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(list));
		buff.append("}");
		jsonString = buff.toString();
    	return SUCCESS;
    }
    public String getQuery() {
		return query;
	}


	public void setQuery(String query) {
		this.query = query;
	}


	public String getCustomerId() {
		return customerId;
	}


	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}


	public String getCustomerType() {
		return customerType;
	}


	public void setCustomerType(String customerType) {
		this.customerType = customerType;
	}


	public String getCustomerName() {
		return customerName;
	}


	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}


	public String getCardNum() {
		return cardNum;
	}


	public void setCardNum(String cardNum) {
		this.cardNum = cardNum;
	}


	public Boolean getIsGrantedSeeAllBlackList() {
		return isGrantedSeeAllBlackList;
	}


	public void setIsGrantedSeeAllBlackList(Boolean isGrantedSeeAllBlackList) {
		this.isGrantedSeeAllBlackList = isGrantedSeeAllBlackList;
	}


	public String getBusinessType() {
		return businessType;
	}


	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getBlackReason() {
		return blackReason;
	}


	public void setBlackReason(String blackReason) {
		this.blackReason = blackReason;
	}


	public String getListId() {
		return listId;
	}


	public void setListId(String listId) {
		this.listId = listId;
	}


	public File getFileUpload() {
		return fileUpload;
	}


	public void setFileUpload(File fileUpload) {
		this.fileUpload = fileUpload;
	}


	public String getFileUploadFileName() {
		return fileUploadFileName;
	}


	public void setFileUploadFileName(String fileUploadFileName) {
		this.fileUploadFileName = fileUploadFileName;
	}


	public String getExtendname() {
		return extendname;
	}


	public void setExtendname(String extendname) {
		this.extendname = extendname;
	}


	public Enterprise getEnterprise() {
		return enterprise;
	}


	public void setEnterprise(Enterprise enterprise) {
		this.enterprise = enterprise;
	}


	public Person getPerson() {
		return person;
	}


	public void setPerson(Person person) {
		this.person = person;
	}


	public String getEnterprisename() {
		return enterprisename;
	}


	public void setEnterprisename(String enterprisename) {
		this.enterprisename = enterprisename;
	}


	public String getOwnership() {
		return ownership;
	}


	public void setOwnership(String ownership) {
		this.ownership = ownership;
	}


	public String getShortname() {
		return shortname;
	}


	public void setShortname(String shortname) {
		this.shortname = shortname;
	}


	public String getOrganizecode() {
		return organizecode;
	}


	public void setOrganizecode(String organizecode) {
		this.organizecode = organizecode;
	}


	public String getCciaa() {
		return cciaa;
	}


	public void setCciaa(String cciaa) {
		this.cciaa = cciaa;
	}


	public String getCustomerLevel() {
		return customerLevel;
	}


	public void setCustomerLevel(String customerLevel) {
		this.customerLevel = customerLevel;
	}


	public Boolean getIsGrantedSeeAllEnterprises() {
		return isGrantedSeeAllEnterprises;
	}


	public void setIsGrantedSeeAllEnterprises(Boolean isGrantedSeeAllEnterprises) {
		this.isGrantedSeeAllEnterprises = isGrantedSeeAllEnterprises;
	}

	public Boolean getIsAll() {
		return isAll;
	}

	public void setIsAll(Boolean isAll) {
		this.isAll = isAll;
	}
	
}
