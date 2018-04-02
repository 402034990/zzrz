package com.zhiwei.credit.action.creditFlow.creditRecord;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;

import com.bfd.facade.MerchantServer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.model.creditFlow.creditRecord.CreditRecord;
import com.zhiwei.credit.model.creditFlow.creditRecord.CsPersonCreditRecord;
import com.zhiwei.credit.model.creditFlow.customer.person.Person;
import com.zhiwei.credit.service.creditFlow.creditRecord.CreditRecordService;
import com.zhiwei.credit.service.creditFlow.customer.person.PersonService;
import com.zhiwei.credit.service.creditFlow.smallLoan.project.SlSmallloanProjectService;
/**
 * 
 * @author 
 *
 */
public class CreditRecordAction extends BaseAction{
	@Resource
	private CreditRecordService creditRecordService;
	@Resource
	private SlSmallloanProjectService slSmallloanProjectService;
	@Resource
	private PersonService personService;
	private CreditRecord creditRecord;
	private Long projectId;
	private String type;
	private Integer personId;
	
	private static final Object lock = new Object();
	private static String status;
	private static String tokenid;
	private static MerchantServer ms;
	

	static {
		ms = new MerchantServer();
	}
	
	public Integer getPersonId() {
		return personId;
	}

	public void setPersonId(Integer personId) {
		this.personId = personId;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public CreditRecord getCreditRecord() {
		return creditRecord;
	}

	public void setCreditRecord(CreditRecord creditRecord) {
		this.creditRecord = creditRecord;
	}

	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				creditRecordService.remove(new Long(id));
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
		CreditRecord creditRecord=creditRecordService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(creditRecord));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(creditRecord.getId()==null){
			creditRecordService.save(creditRecord);
		}else{
			CreditRecord orgCreditRecord=creditRecordService.get(creditRecord.getId());
			try{
				BeanUtil.copyNotNullProperties(orgCreditRecord, creditRecord);
				creditRecordService.save(orgCreditRecord);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CreditRecord> list= creditRecordService.getAll(filter);
		
		Type type=new TypeToken<List<CreditRecord>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	public String getMoreApplyReport(){
		List<CreditRecord> recordList=creditRecordService.getByProjectIdType(projectId, type);
		if(recordList!=null && recordList.size()>0){
			StringBuffer sb=new StringBuffer("{success:true,result:");
			sb.append(recordList.get(0).getNameValue());
			sb.append("}");
			setJsonString(sb.toString());
			System.out.println("json==="+sb.toString());
		}else{
			Person person=personService.getById(personId);
			if(person!=null){
				Map<String, String> map = getTokenid("zurzAPI","zurzAPI","LoginApi","3000814");
				if(map.get("status").equals("1")){
					if(type.equals("ApplyLoanMon")){//多次申请审核验证
						JSONObject jso = new JSONObject();
						JSONObject reqData = new JSONObject();
						jso.put("apiName", "BankServer4Api");//config配置文件对应的url地址。
						jso.put("tokenid", map.get("tokenid"));//
						
						reqData.put("name", person.getName());//姓名
						reqData.put("cell", person.getCellphone());//手机号
						reqData.put("id", person.getCardnumber());//身份证
						jso.put("reqData", reqData);
						try {
							String result = new CreditRecordAction().query(jso);
							if (result.contains("code")&& JSONObject.fromObject(result).getString("code").equals("100007")) {//100007代表tokenid过期
								result = new CreditRecordAction().query(jso);
							}
							if(JSONObject.fromObject(result).getString("code").equals("00")&&result.contains("swift_number")){
								CreditRecord record=new CreditRecord();
								record.setProjectId(projectId);
								record.setPersonId(personId);
								record.setType(type);
								record.setNameValue(result.replaceAll("\"", "\'"));
								creditRecordService.merge(record);
								
								StringBuffer sb=new StringBuffer("{success:true,result:");
								sb.append(result);
								sb.append("}");
								setJsonString(sb.toString());
							}
							System.out.println("result=="+result);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}else if(type.equals("TelCheck")){//手机三要素验证
						JSONObject jso2 = new JSONObject();
						JSONObject reqData2 = new JSONObject();
						jso2.put("apiName", "HainaApi");//config配置文件对应的url地址。
						jso2.put("tokenid", map.get("tokenid"));//
						
						reqData2.put("name", person.getName());//姓名
						reqData2.put("cell", person.getCellphone());//手机号
						reqData2.put("id", person.getCardnumber());//身份证
						jso2.put("reqData", reqData2);
						try {
							String result2 = new CreditRecordAction().query(jso2);
							if (result2.contains("code")&& JSONObject.fromObject(result2).getString("code").equals("100007")) {//100007代表tokenid过期
								result2 = new CreditRecordAction().query(jso2);
							}
							if(JSONObject.fromObject(result2).getString("code").equals("00") && result2.contains("swift_number")){
								CreditRecord record=new CreditRecord();
								record.setProjectId(projectId);
								record.setPersonId(personId);
								record.setType(type);
								record.setNameValue(result2.replaceAll("\"", "\'"));
								creditRecordService.merge(record);
								
								StringBuffer sb=new StringBuffer("{success:true,result:");
								sb.append(result2);
								sb.append("}");
								setJsonString(sb.toString());
							}
							System.out.println("result2=="+result2);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}else if(type.equals("IdTwo")){//身份证二要素验证
						JSONObject jso3 = new JSONObject();
						JSONObject reqData3 = new JSONObject();
						jso3.put("apiName", "HainaApi");//config配置文件对应的url地址。
						jso3.put("tokenid", map.get("tokenid"));//
						
						reqData3.put("name", person.getName());//姓名
						//reqData3.put("cell", person.getCellphone());//手机号
						reqData3.put("id", person.getCardnumber());//身份证
						jso3.put("reqData", reqData3);
						try {
							String result3 = new CreditRecordAction().query(jso3);
							if (result3.contains("code")&& JSONObject.fromObject(result3).getString("code").equals("100007")) {//100007代表tokenid过期
								result3 = new CreditRecordAction().query(jso3);
							}
							if(JSONObject.fromObject(result3).getString("code").equals("00") && result3.contains("swift_number")){
								CreditRecord record=new CreditRecord();
								record.setProjectId(projectId);
								record.setPersonId(personId);
								record.setType(type);
								record.setNameValue(result3.replaceAll("\"", "\'"));
								creditRecordService.merge(record);
								
								StringBuffer sb=new StringBuffer("{success:true,result:");
								sb.append(result3);
								sb.append("}");
								setJsonString(sb.toString());
							}
							System.out.println("result3=="+result3);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}else if(type.equals("KeyAttribution")){//身份证号手机号归属地
						
						JSONObject jso4 = new JSONObject();
						JSONObject reqData4 = new JSONObject();
						jso4.put("apiName", "BankServer4Api");//config配置文件对应的url地址。
						jso4.put("tokenid", map.get("tokenid"));//
						
						reqData4.put("name", person.getName());//姓名
						reqData4.put("cell", person.getCellphone());//手机号
						reqData4.put("id", person.getCardnumber());//身份证
						jso4.put("reqData", reqData4);
						try {
							String result4 = new CreditRecordAction().query(jso4);
							if (result4.contains("code")&& JSONObject.fromObject(result4).getString("code").equals("100007")) {//100007代表tokenid过期
								result4 = new CreditRecordAction().query(jso4);
							}
							if(JSONObject.fromObject(result4).getString("code").equals("00") && result4.contains("swift_number")){
								CreditRecord record=new CreditRecord();
								record.setProjectId(projectId);
								record.setPersonId(personId);
								record.setType(type);
								record.setNameValue(result4.replaceAll("\"", "\'"));
								creditRecordService.merge(record);
								
								StringBuffer sb=new StringBuffer("{success:true,result:");
								sb.append(result4);
								sb.append("}");
								setJsonString(sb.toString());
							}
							System.out.println("result4=="+result4);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					
				}else{
					System.out.println("map===="+map.toString());
					setJsonString("{success:false,msg:'百融金服登录失败！'}");
				}
			}else{
				setJsonString("{success:false,msg:'查询客户不存在，请核对信息！'}");
			}
		}
		
		return SUCCESS;
	}
	public String query(JSONObject json) throws Exception {
		String result = "";
		result = ms.getApiData(json.toString(),"3000814");
		if (result.contains("code")&& JSONObject.fromObject(result).getString("code").equals("100007")) {//100007代表tokenid过期
			tokenid = null;
		}
		return result;
	}
	
	public static Map<String,String> getTokenid(String apiCode,String userName,String password,String loginName) {
		Map<String,String> map = new HashMap<String,String>();
		if (StringUtils.isBlank(tokenid)) {
			synchronized (lock) {
				if (StringUtils.isBlank(tokenid)) {
					login(apiCode,userName,password,loginName);
				}
			}
		}
		map.put("tokenid", tokenid);
		map.put("status", status);
		return map;
	}
	public static void login(String userName,String password,String loginName,String apiCode) {
		try {
			String loginResult = ms.login(userName, password,loginName,apiCode);
			if(StringUtils.isNotBlank(loginResult)){
				JSONObject json = JSONObject.fromObject(loginResult);
				if(json.containsKey("tokenid")){
					tokenid = json.getString("tokenid");
					status = "1";
				}else{
					tokenid = loginResult;
					status = "0";
				}
			}else{
				tokenid = loginResult;
				status = "0";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
