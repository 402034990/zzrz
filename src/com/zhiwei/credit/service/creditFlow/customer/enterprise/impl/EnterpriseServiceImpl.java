package com.zhiwei.credit.service.creditFlow.customer.enterprise.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeanUtils;

import com.nc.service.NcPushRecordService;
import com.zhiwei.core.log.LogServicesResource;
import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.core.web.paging.PagingBean;
import com.zhiwei.credit.core.commons.CreditBaseDao;
import com.zhiwei.credit.core.creditUtils.JDBCUtilHelper;
import com.zhiwei.credit.core.creditUtils.JsonUtil;
import com.zhiwei.credit.dao.creditFlow.common.EnterpriseShareequityDao;
import com.zhiwei.credit.dao.creditFlow.customer.enterprise.EnterpriseDao;
import com.zhiwei.credit.dao.creditFlow.customer.person.PersonDao;
import com.zhiwei.credit.dao.creditFlow.fileUploads.FileFormDao;
import com.zhiwei.credit.dao.creditFlow.ourmain.SlCompanyMainDao;
import com.zhiwei.credit.dao.creditFlow.smallLoan.project.SlSmallloanProjectDao;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.Enterprise;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.EnterpriseShareequity;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.EnterpriseView;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.VEnterprisePerson;
import com.zhiwei.credit.model.creditFlow.customer.person.Person;
import com.zhiwei.credit.model.creditFlow.multiLevelDic.AreaDic;
import com.zhiwei.credit.model.creditFlow.ourmain.SlCompanyMain;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.EnterpriseService;
import com.zhiwei.credit.service.creditFlow.multiLevelDic.AreaDicService;


public class EnterpriseServiceImpl extends BaseServiceImpl<Enterprise> implements EnterpriseService{
	private EnterpriseDao dao;
	@Resource
	private CreditBaseDao creditBaseDao;
	@Resource
	private FileFormDao fileFormDao;
	@Resource
	private EnterpriseShareequityDao enterpriseShareequityDao;
	@Resource
	private PersonDao personDao;
	@Resource
	private SlCompanyMainDao companyMainDao;
	@Resource
	private AreaDicService areaDicService;
	@Resource
	private SlSmallloanProjectDao slSmallloanProjectDao;
	@Resource
	private NcPushRecordService ncPushRecordService;
	
	private final Log log = LogFactory.getLog(getClass());
	public EnterpriseServiceImpl(EnterpriseDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public void ajaxQueryEnterprise(String searchCompanyId, String[] userIds,
			String enterprisename, String ownership, String shortname,
			String organizecode, String cciaa, int start, int limit,
			String sort, String dir, String customerLevel) {
		dao.ajaxQueryEnterprise(searchCompanyId, userIds, enterprisename, ownership, shortname, organizecode, cciaa, start, limit, sort, dir, customerLevel);
		
	}

	@LogServicesResource(description="添加企业")
	//ajax添加企业
	public void ajaxAddEnterprise(Enterprise enterprise,Person person,List<EnterpriseShareequity> listES,String personSFZZId,String personSFZFId,Map<String,String> enterpriseMap)throws Exception {
		boolean b = false ;
		String enterId = enterprise.getEnterId();
		String str="";
		if(enterprise.getId() != null)
		{
			String name = enterprise.getEnterprisename() ;
			Enterprise ent = queryEnterpriseName(name);
			if(null != ent && !enterprise.getId().toString().equals(ent.getId().toString())){
				JsonUtil.responseJsonString("{success:true,exsit:false,msg :'企业名称添加重复！'}");
				return ;
			}
			String organizecode = enterprise.getOrganizecode() ;
			Enterprise ent2 = isEmpty(organizecode);
			if(null != ent2 && !enterprise.getId().toString().equals(ent2.getId().toString())){
				JsonUtil.responseJsonString("{success:true,exsit:false,msg :'机构代码添加重复！'}");
				return ;
			}
			creditBaseDao.clearSession();
			Enterprise enter = dao.getById(enterprise.getId());
			if(null!=enter){
				BeanUtil.copyNotNullProperties(enter, enterprise);
				dao.merge(enter);
			}else{
				creditBaseDao.updateDatas(enterprise);
			}
			
			Integer personId=0;
			if(person.getId() == null){ 
				   personDao.save(person);
				   personId=person.getId();
			}
			else{
				  Person persistentPerson=this.personDao.getById(person.getId());
				  persistentPerson.setName(person.getName());
				  persistentPerson.setSex(person.getSex());
				  persistentPerson.setCardtype(person.getCardtype());
				  persistentPerson.setCardnumber(person.getCardnumber());
				  persistentPerson.setCellphone(person.getCellphone());
				  persistentPerson.setSelfemail(person.getSelfemail());
				  this.personDao.merge(persistentPerson);
				  personId=persistentPerson.getId();
			}
			String  enterpriseGsdjzId=enterpriseMap.get("enterpriseGsdjzId");
			String  enterpriseYyzzId=enterpriseMap.get("enterpriseYyzzId");
			String  enterpriseYyzzzId=enterpriseMap.get("enterpriseYyzzzId");
			String  enterpriseZzjgId=enterpriseMap.get("enterpriseZzjgId");
			String  enterpriseDsdjId=enterpriseMap.get("enterpriseDsdjId");
			String  enterprisetyjId=enterpriseMap.get("enterprisetyjId");
			
			
			
			enterprise.setLegalpersonid(personId);
			//b = creditBaseDao.saveDatas(enterprise) ;//添加企业
			this.dao.merge(enterprise);
			if(enterpriseGsdjzId != null && !enterpriseGsdjzId.equals("")){ //国税登记证
				fileFormDao.updateFile("cs_enterprise_gsdjz."+enterprise.getId(), Integer.parseInt(enterpriseGsdjzId));
			}
			if(enterpriseYyzzId != null && !enterpriseYyzzId.equals("")){ //营业执照
				fileFormDao.updateFile("cs_enterprise_yyzzfb."+enterprise.getId(), Integer.parseInt(enterpriseYyzzId));
			}
			if(enterpriseYyzzzId != null && !enterpriseYyzzzId.equals("")){ //营业执照正面
				fileFormDao.updateFile("cs_enterprise_yyzzzfb."+enterprise.getId(), Integer.parseInt(enterpriseYyzzzId));
			}
			if(enterpriseZzjgId != null && !enterpriseZzjgId.equals("")){   //组织机构代码
				fileFormDao.updateFile("cs_enterprise_zzjgdmz."+enterprise.getId(), Integer.parseInt(enterpriseZzjgId));
			}
			if(enterpriseDsdjId != null && !enterpriseDsdjId.equals("")){
				fileFormDao.updateFile("cs_enterprise_dsdjz."+enterprise.getId(), Integer.parseInt(enterpriseDsdjId));
			}
			if(enterprisetyjId != null && !enterprisetyjId.equals("")){
				fileFormDao.updateFile("cs_enterprise_tyshxydm."+enterprise.getId(), Integer.parseInt(enterprisetyjId));
			}
			if(personSFZZId != null && !personSFZZId.equals("")){  //身份证正面
				fileFormDao.updateFile("cs_person_sfzz."+personId, Integer.parseInt(personSFZZId));
			}
			if(personSFZFId != null && !personSFZFId.equals("")){  //身份证反面
				fileFormDao.updateFile("cs_person_sfzf."+personId, Integer.parseInt(personSFZFId));
			}
			if(listES.size()>0)
	   		 {
	   			 
	   			 for(int i=0;i<listES.size();i++)
	   			 {
	   				 EnterpriseShareequity es=listES.get(i);
	   				 if(es.getId()==null)
	   				 {
	   					es.setEnterpriseid(enterprise.getId());
	   					this.enterpriseShareequityDao.save(es);
	   				 }
	   				 else 
	   				 {
	   					 EnterpriseShareequity esPersistent=this.enterpriseShareequityDao.load(es.getId());
	   					 BeanUtils.copyProperties(es, esPersistent,new String[] {"id","enterpriseid"});
	   					 this.enterpriseShareequityDao.merge(esPersistent);
	   				 }
	   			 }
	   		 }
			
			//JsonUtil.responseJsonString("{success:true,exsit:false,msg :'业务系统企业信息保存成功 !      与财务系统对接信息："+str+"!',newId:'"+enterprise.getId()+"'}");
			JsonUtil.responseJsonString("{success:true,exsit:true,msg :'企业保存成功 !',enterpriseId:"+enterprise.getId()+",newId:"+enterprise.getLegalpersonid()+"}");
		}
		else
		{
			String name = enterprise.getEnterprisename() ;
			Enterprise ent = queryEnterpriseName(name);
			if(null != ent ){
				JsonUtil.responseJsonString("{success:true,exsit:false,msg :'企业名称添加重复！'}");
				return ;
			}
			String organizecode = enterprise.getOrganizecode() ;
			Enterprise ent2 = isEmpty(organizecode);
			if(null != ent2){
				JsonUtil.responseJsonString("{success:true,exsit:false,msg :'机构代码添加重复！'}");
				return ;
			}
			/*String shortname = enterprise.getShortname();
			Enterprise ent3 = getShortname(shortname);
			if(null != ent3){
				JsonUtil.responseJsonString("{success:true,exsit:false,msg :'企业简称添加重复！'}");
				return ;
			}*/
			Integer personId=0;
			if(person.getId() == null){ 
				
				   personDao.save(person);
				   personId=person.getId();
			}
			else{
				  Person persistentPerson=this.personDao.getById(person.getId());
				  persistentPerson.setName(person.getName());
				  persistentPerson.setSex(person.getSex());
				  persistentPerson.setCardtype(person.getCardtype());
				  persistentPerson.setCardnumber(person.getCardnumber());
				  persistentPerson.setCellphone(person.getCellphone());
				  persistentPerson.setSelfemail(person.getSelfemail());
				  this.personDao.merge(persistentPerson);
				  personId=persistentPerson.getId();
			}
			String  enterpriseGsdjzId=enterpriseMap.get("enterpriseGsdjzId");
			String  enterpriseYyzzId=enterpriseMap.get("enterpriseYyzzId");
			String  enterpriseYyzzzId=enterpriseMap.get("enterpriseYyzzzId");
			String  enterpriseZzjgId=enterpriseMap.get("enterpriseZzjgId");
			String  enterpriseDsdjId=enterpriseMap.get("enterpriseDsdjId");
			enterprise.setLegalpersonid(personId);
			b = creditBaseDao.saveDatas(enterprise) ;//添加企业
			if(enterpriseGsdjzId != null && !enterpriseGsdjzId.equals("")){ //国税登记证
			
				fileFormDao.updateFile("cs_enterprise_gsdjz."+enterprise.getId(), Integer.parseInt(enterpriseGsdjzId));
			}
			if(enterpriseYyzzId != null && !enterpriseYyzzId.equals("")){ //营业执照
				fileFormDao.updateFile("cs_enterprise_yyzzfb."+enterprise.getId(), Integer.parseInt(enterpriseYyzzId));
			}
			if(enterpriseYyzzzId != null && !enterpriseYyzzzId.equals("")){ //营业执照
				fileFormDao.updateFile("cs_enterprise_yyzzzfb."+enterprise.getId(), Integer.parseInt(enterpriseYyzzzId));
			}
			if(enterpriseZzjgId != null && !enterpriseZzjgId.equals("")){   //组织机构代码
				fileFormDao.updateFile("cs_enterprise_zzjgdmz."+enterprise.getId(), Integer.parseInt(enterpriseZzjgId));
			}
			if(enterpriseDsdjId != null && !enterpriseDsdjId.equals("")){
				fileFormDao.updateFile("cs_enterprise_dsdjz."+enterprise.getId(), Integer.parseInt(enterpriseDsdjId));
			}
			if(personSFZZId != null && !personSFZZId.equals("")){  //身份证正面
				fileFormDao.updateFile("cs_person_sfzz."+personId, Integer.parseInt(personSFZZId));
			}
			if(personSFZFId != null && !personSFZFId.equals("")){  //身份证反面
				fileFormDao.updateFile("cs_person_sfzf."+personId, Integer.parseInt(personSFZFId));
			}
	   		if(listES.size()>0)
	   		 {
	   			 
	   			 for(int i=0;i<listES.size();i++)
	   			 {
	   				 EnterpriseShareequity es=listES.get(i);
	   				 if(es.getId()==null)
	   				 {
	   					es.setEnterpriseid(enterprise.getId());
	   					this.enterpriseShareequityDao.save(es);
	   				 }
	   				 else 
	   				 {
	   					 EnterpriseShareequity esPersistent=this.enterpriseShareequityDao.load(es.getId());
	   					 BeanUtils.copyProperties(es, esPersistent,new String[] {"id","enterpriseid"});
	   					 this.enterpriseShareequityDao.merge(esPersistent);
	   				 }
	   			 }
	   		 }
	   
			if(b){
				log.info("添加企业成功");
				JsonUtil.responseJsonString("{success:true,exsit:true,msg :'添加企业成功',enterpriseId:'"+enterprise.getId()+"',newId:'"+enterprise.getLegalpersonid()+"'}") ;
				
				//NC调用推送
		   		ncPushRecordService.newCustomersPush("company_customer",enterprise.getId().toString());
				
				//JsonUtil.responseJsonString("{success:true,exsit:false,msg :'业务系统企业信息添加企业成功!       与财务系统对接信息:"+str+"',newId:'"+enterprise.getId()+"'}");
			}else{			
				log.info("添加企业失败");
				JsonUtil.responseJsonString("{success:false,exsit:true,msg :'添加企业失败'}") ;
				//JsonUtil.responseJsonString("{success:false,exsit:false,msg :'业务系统企业信息添加企业失败!       与财务系统对接信息:"+str+"'}");
			}
		}
	  if(enterprise.getId()!=null&&enterId!=null&&!"".equals(enterId)){
			Enterprise enter = dao.getById(Integer.parseInt(enterId));
			enter.setEnterId(null);
			String revIds = enter.getRevIds();
			if(revIds!=null&&revIds.length()!=0){
				enter.setRevIds(revIds+","+enterprise.getId());
			}else{
				enter.setRevIds(enterId+"");
			}
			dao.merge(enter);
		}
	}
	public Enterprise queryEnterpriseName(String name)throws Exception{
		return dao.queryEnterpriseName(name);
	}

	@Override
	public Enterprise isEmpty(String organizecode) throws Exception {
		
		return dao.isEmpty(organizecode);
	}

	@Override
	public Enterprise getById(int id) {
		
		return dao.getById(id);
	}

	@Override
	public List<Enterprise> getListByLegalPersonId(int legalpersonid) {
		return dao.getListByLegalPersonId(legalpersonid);
	};
	@Override
	public void ajaxDeleteEnterpriseWithId(String[] strTable ,String[] listId,String turl) throws Exception{
		JDBCUtilHelper.batchDelete(strTable, listId,turl);
		log.info("删除成功");
		JsonUtil.jsonFromObject(null, true);
	}
	@Override
	public void getSlCompanyInfo(int id){
		SlCompanyMain slCompanyMain = companyMainDao.get(new Long(id));
		if(slCompanyMain!=null){
			if(slCompanyMain.getHangyeType()!=null&&!"".equals(slCompanyMain.getHangyeType())){
				try {
					AreaDic dic = areaDicService.getById(slCompanyMain.getHangyeType());
					slCompanyMain.setHangyeTypeValue(dic.getText());
				} catch (Exception e) {
					e.printStackTrace();
				}
			}else{
				slCompanyMain.setHangyeTypeValue("");
			}
		}
		
		JsonUtil.jsonFromObject(slCompanyMain, true) ;
	}

	@Override
	public void getList(String customerType, String customerName,
			String cardNum, String companyId, int start, int limit) {
		dao.getList(customerType, customerName, cardNum, companyId, start, limit);
		
	}

	@Override
	public void ajaxQueryEnterpriseForCombo(String query, int start, int limit) {
		try{
			List<Enterprise> list=dao.ajaxQueryEnterpriseForCombo(query, start, limit);
			for(Enterprise e :list){
				dao.evict(e);
				e.setBpCustEntCashflowAndSaleIncomelist(null);
				e.setBpCustEntLawsuitlist(null);
				e.setBpCustEntUpanddownstreamlist(null);
				e.setBpCustEntUpanddowncontractlist(null);
				e.setBpCustEntPaytaxlist(null);
			}
			JsonUtil.jsonFromList(list) ;
		}catch(Exception e){
			e.printStackTrace() ;
			JsonUtil.responseJsonString("{success:false,msg:'请不要输入非法字符'}") ;
		}
	}

	@Override
	public EnterpriseView getByViewId(Integer id) {
		
		return dao.getByViewId(id);
	}
	public EnterpriseView setEnterpriseView(EnterpriseView enView) throws Exception{
		EnterpriseView ev = enView ;
		/*IsicRev4TextChinese isicRev = null ;
		String hql = "from IsicRev4TextChinese AS ir where ir.code=?" ;
		String code = enView.getTradetype();
		if(null != code && !"".equals(code)){
			String aray[] = code.split(",");
			int lenght = aray.length ;
			for(int i = 0 ; i < lenght ; i ++){
				if("" != aray[i] && i == 0 ){
					isicRev = (IsicRev4TextChinese)creditBaseDao.queryHql(hql, aray[i]).get(0);
					ev.setTest1(isicRev.getDescription());
				}else if("" != aray[i] && i == 1){
					isicRev = (IsicRev4TextChinese)creditBaseDao.queryHql(hql, aray[i]).get(0);
					ev.setTest2(isicRev.getDescription());
				}else if("" != aray[i] && i == 2){
					isicRev = (IsicRev4TextChinese)creditBaseDao.queryHql(hql, aray[i]).get(0);
					ev.setTest3(isicRev.getDescription());
				}else if("" != aray[i] && i == 3){
					isicRev = (IsicRev4TextChinese)creditBaseDao.queryHql(hql, aray[i]).get(0);
					ev.setTest4(isicRev.getDescription());
				}
			}
		}*/
		if(enView.getManagecity() != null && enView.getManagecity() != ""){
			AreaDic dic = null ; String dValue = "" ;
			String[] scity = enView.getManagecity().split(",");
			for(int j = 0 ; j < scity.length ; j ++){
				dic = (AreaDic)creditBaseDao.getById(AreaDic.class, Integer.parseInt(scity[j]));
				String s = dic.getText() ;
				if(j != scity.length - 1)
					dValue = dValue + s + "_";
				else
					dValue = dValue + s ;
			}
			ev.setManagecityvalue(dValue);
		}if(enView.getGslname() != null && enView.getGslname() != ""){
			AreaDic dic = null ; String dValue = "" ;
			String[] sgsln = enView.getGslname().split(",");
			for(int f = 0 ; f < sgsln.length ; f ++){
				dic = (AreaDic)creditBaseDao.getById(AreaDic.class, Integer.parseInt(sgsln[f]));
				String s = dic.getText() ;
				if(f != sgsln.length - 1)
					dValue = dValue + s + "_";
				else
					dValue = dValue + s ;
			}
			ev.setGslnamevalue(dValue);
		}
		return ev ;
	}

	@Override
	public void getEnterByProject(int personId) {
		List<EnterpriseView> list = new ArrayList<EnterpriseView>();
		String hql2="from EnterpriseView ep where ep.legalpersonid = ?";
		try {
			list = creditBaseDao.queryHql(hql2,new Object[]{personId});
		} catch (Exception e) {
			e.printStackTrace();
		}
		JsonUtil.jsonFromList(list, list.size()) ;
	}

	@Override
	public void getList(String enterIds, PagingBean pb,String type) {
		String hql ="";// "from Enterprise e where e.id in ("+enterIds+")";
		if(type.equals("1")){//获取关联企业
			hql += "from EnterpriseView e where e.id in ("+enterIds+")";
		}else if(type.equals("0")){//获取不关联企业
			hql+= "from EnterpriseView e where e.id not in ("+enterIds+")";;
		}
		dao.getList(enterIds, pb, type);
		//return null;//dao.findByHql(hql, new Object[]{}, pb);
	}
	
	@Override
	public void ajaxQueryEnterprise(String searchCompanyId, String[] userIds,
			String enterprisename, String ownership, String shortname,
			String organizecode, String cciaa, int start, int limit,
			String sort, String dir, String customerLevel,String orgUserIds) {
		dao.ajaxQueryEnterprise(searchCompanyId, userIds, enterprisename, ownership, shortname, organizecode, cciaa, start, limit, sort, dir, customerLevel,orgUserIds);
		
	}

	@Override
	public Enterprise saveSingleEnterprise(Enterprise enterprise,
			Person person, String gudongInfo) {
		
		return dao.saveSingleEnterprise(enterprise, person, gudongInfo);
	}

	@Override
	public Long entCount(HttpServletRequest request, String userIds) {
		return dao.entCount(request, userIds);
	}

	@Override
	public void entList(PageBean<Enterprise> pageBean,Map<String,String> map) {
		dao.entList(pageBean,map);
	}
	
	@Override
	public List<VEnterprisePerson> getBlackListToExcel(String customerType, String customerName,
			String cardNum, String companyId, int start, int limit) {
		return dao.getBlackListToExcel(customerType, customerName, cardNum, companyId, start, limit);
		
	}

	@Override
	public void ajaxQueryEnterprise(String searchCompanyId, String userIds,
			String enterprisename, String ownership, String shortname,
			String organizecode, String cciaa, int start, int limit,
			String sort, String dir, String customerLevel) {
		dao.ajaxQueryEnterprise(searchCompanyId, userIds, enterprisename, ownership, shortname, organizecode, cciaa, start, limit, sort, dir, customerLevel);
	}

	/* (non-Javadoc)
	 * @see com.zhiwei.credit.service.creditFlow.customer.enterprise.EnterpriseService#enterPriseList(java.lang.Integer, java.lang.Integer, javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public List<EnterpriseView> enterPriseList(Integer start, Integer limit,
			HttpServletRequest request,String userIdsStr) {
		// TODO Auto-generated method stub
		return dao.enterPriseList(start,limit,request, userIdsStr);
	}
	//查询企业客户资金账户表
	@Override
	public List<EnterpriseView> getAllAccountList(Map map, PagingBean pb) {
		// TODO Auto-generated method stub
		return dao.getAllAccountList(map,pb);
	}

	@Override
	public String findPersonNumber() {
		// TODO Auto-generated method stub
		return dao.findPersonNumber();
	}
}