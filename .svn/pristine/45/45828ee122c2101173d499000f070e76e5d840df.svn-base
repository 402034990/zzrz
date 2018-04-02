package com.zhiwei.credit.action.document;
/*
 *  北京互融时代软件有限公司 OA办公管理系统   --  http://www.hurongtime.com
 *  Copyright (C) 2008-2011 zhiwei Software Company
*/
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.credit.proj.entity.VProcreditDictionary;
import com.credit.proj.mortgage.morservice.service.MortgageService;
import com.google.gson.Gson;
import com.webServices.mortgage.ProcreditMortgageService;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.model.creditFlow.car.CarWarningInfo;
import com.zhiwei.credit.model.creditFlow.customer.person.CsPersonCar;
import com.zhiwei.credit.model.system.MapDetail;
import com.zhiwei.credit.service.creditFlow.car.CarWarningInfoService;
import com.zhiwei.credit.service.creditFlow.common.CreditProjectService;
import com.zhiwei.credit.service.creditFlow.customer.person.CsPersonCarService;
import com.zhiwei.credit.util.WebClient;

public class MapDetailAction extends BaseAction{

	private String url="http://www.sky200.com/open/openapi.php";
	private String access_token="Nzg1OUQ2QUFGN0YwMEEyNzEzMTVEMkIzOEYzODIxNDNBOEJDNzI5RDFFNTVDNUY2MjE5QjA2MTUxNEVBQzEzMg"	;//String	是	用户的 token 。
	private String action="monitor";	//String	是	请求数据的类型,需要获取实时信息，填写"monitor" 。
	
	protected transient final Log logger = LogFactory.getLog(getClass());
	private MapDetail mapDetail;
	private String carLicenseNumber;
	//private String imei="354188046651548";
	private String imei;
	private Integer mortgageid;
	private Long projectId;
	private CarWarningInfo carWarningInfo ;
	@Resource
	private CsPersonCarService csPersonCarService;
	@Resource
	private CreditProjectService creditProjectService;
	@Resource
	private CarWarningInfoService carWarningInfoService;
	@Resource
	private ProcreditMortgageService procreditMortgageService;
	@Resource
	private MortgageService mortgageService;
	//private String carNumber;
	public String getImei() {
		return imei;
	}

	public void setImei(String imei) {
		this.imei = imei;
	}

	public Integer getMortgageid() {
		return mortgageid;
	}

	public void setMortgageid(Integer mortgageid) {
		this.mortgageid = mortgageid;
	}

	public MapDetail getMapDetail() {
		return mapDetail;
	}

	public void setMapDetail(MapDetail mapDetail) {
		this.mapDetail = mapDetail;
	}
	

	public String getCarLicenseNumber() {
		return carLicenseNumber;
	}

	public void setCarLicenseNumber(String carLicenseNumber) {
		this.carLicenseNumber = carLicenseNumber;
	}


	public CarWarningInfo getCarWarningInfo() {
		return carWarningInfo;
	}

	public void setCarWarningInfo(CarWarningInfo carWarningInfo) {
		this.carWarningInfo = carWarningInfo;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	@Override
	public String execute()  {
		
		//StringBuffer json=new StringBuffer("\"{\"code\":");
		String json="";
		if(imei!=null&&!access_token.equals("")&&!imei.equals("")){
			//String params="access_token="+access_token+"&action="+action+"&imei="+imei;
			//imei="354188046651548";
			String params="access_token="+access_token+"&action="+action+"&imei="+imei;
			try {
				json=WebClient.getWebContentByPost(url, params, "utf-8", 120000);
				//json="{\"ret\":0,\"imei\":\"354188123456789\",\"lat\": \""+carWarningInfo.getWarningOccurDimension()+"\",\"lng\": \""+carWarningInfo.getWarningOccurLongitude()+"\",\"gpsTime\":\""+warnDate+"\",\"serverTime\":\"1399362660\",\"speed\": 500,\"course\": 19100,\"status\":1}";
			} catch (IOException e) {
				e.printStackTrace();
			}
		}else{
		 //json="{\"ret\":0,\"imei\":\"354188123456789\",\"lat\": \"22.123456\",\"lng\": \"113.1234564\",\"gpsTime\":\"1399362660\",\"serverTime\":\"1399362660\",\"speed\": 500,\"course\": 19100,\"status\":1}";
		}
		System.out.println("========================="+json);
		Gson gson=new Gson();
		 mapDetail = gson.fromJson(json, MapDetail.class);
		 if(mapDetail == null){
			 //JsonUtil.responseJsonString("{success:true,exsit:true,msg :'更新成功',newId:'"+person.getId()+"'}");
		 }else{
			 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			 String gpsTimes = mapDetail.getGpsTime();
			 String gpsTime = "";
			 if(gpsTimes!=null&&!gpsTimes.equals("")){
				 gpsTime = sdf.format(Long.valueOf(gpsTimes)*1000);//设备的定位时间
			 }
			 mapDetail.setGpsTime(gpsTime);
			 String serverTimes = mapDetail.getServerTime();
			 String serverTime = "";
			 if(serverTimes!=null&&!serverTimes.equals("")){
				 serverTime = sdf.format(Long.valueOf(serverTimes)*1000);//服务器接收时间
			 }
			 String speeds = mapDetail.getSpeed();
			 if(speeds!=null&&!speeds.equals("")){
				 mapDetail.setSpeed(String.valueOf(Double.parseDouble(speeds)/10));
			 }
			 mapDetail.setServerTime(serverTime);
			 mapDetail.setCarNumber(carLicenseNumber);
			 if(mapDetail.getStatus()!=null){
				 if(Integer.parseInt(mapDetail.getStatus()) == 0){
					 mapDetail.setStatus("离线");
					 if(mortgageid!=null){
						 
						 VProcreditDictionary vp =mortgageService.getVProcreditDictionaryByMortgageId(mortgageid.toString());
						 CsPersonCar csPersonCar  = csPersonCarService.getUserIdByDeviceId(imei);
						 List<CarWarningInfo> carWarningInfo1 = carWarningInfoService.getAllListByNumberAndImei(carLicenseNumber,imei);
							 if(carWarningInfo1!=null&&carWarningInfo1.size()>0){
								 //车辆离线的话需报警
								 CarWarningInfo carWarningInfo=carWarningInfo1.get(0);
								 /*carWarningInfo.setDeviceNumber(imei);
								 carWarningInfo.setWarningInfoType(mapDetail.getLat());
								 carWarningInfo.setWarningOccurDate(mapDetail.getLng());
								 carWarningInfo.setRemarks1(new Date());
								 carWarningInfo.setWarningOccurLongitude(gpsTime);
								 carWarningInfo.setWarningOccurDimension(serverTime);
								 carWarningInfo.setCarLicenseNumber(carLicenseNumber);//车牌号
								  */
								 Integer sum = carWarningInfo.getSumAwayLine();
								 //carWarningInfo.setProjectId(projectId);
								 carWarningInfo.setCarProjectId(projectId);
								 carWarningInfo.setWarningInfoType("离线报警!（车辆离线）");
								 carWarningInfo.setCustomerName(vp.getAssureofnameEnterOrPerson());
								 
								 carWarningInfo.setDeviceNumber(imei);//imei编号
								 carWarningInfo.setCarLicenseNumber(carLicenseNumber);//车牌号
								 carWarningInfo.setWarningOccurLongitude(mapDetail.getLat());//经度
								 carWarningInfo.setWarningOccurDimension(mapDetail.getLng());//纬度
								 carWarningInfo.setWarningOccurDate(gpsTime);//设备检测时间
								 carWarningInfo.setRemarks(serverTime);//服务器接收报警时间
								 carWarningInfo.setRemarks1(new Date());//查询信息返回时间
								 carWarningInfo.setAwayLineStatus("0");//离线
								 carWarningInfo.setSumAwayLine(sum+1);//有过记录的在原基础上加1
								 carWarningInfoService.merge(carWarningInfo);
							 }else{
								 //车辆离线的话需报警
								 CarWarningInfo carWarningInfo=new CarWarningInfo();
								 carWarningInfo.setProjectId(projectId);
								 carWarningInfo.setCarProjectId(vp.getProjid());
								 carWarningInfo.setWarningInfoType("离线报警!（车辆离线）");
								 carWarningInfo.setCustomerName(vp.getAssureofnameEnterOrPerson());
								 carWarningInfo.setDeviceNumber(imei);//imei编号
								 carWarningInfo.setCarLicenseNumber(carLicenseNumber);//车牌号
								 carWarningInfo.setWarningOccurLongitude(mapDetail.getLat());//经度
								 carWarningInfo.setWarningOccurDimension(mapDetail.getLng());//纬度
								 carWarningInfo.setWarningOccurDate(gpsTime);//设备检测时间
								 carWarningInfo.setRemarks(serverTime);//服务器接收报警时间
								 carWarningInfo.setRemarks1(new Date());//查询信息返回时间 
								 carWarningInfo.setAwayLineStatus("0");//离线
								 carWarningInfo.setSumAwayLine(1);//第一次时直接设为0；
								 carWarningInfoService.save(carWarningInfo);
							 }
			
					 }
					 
					 //String result1 = creditProjectService.startCarWarnFlow(carWarningInfo);
					 //logger.error("启动警报流程成功=========="+result1);
					
				 }else{
					 mapDetail.setStatus("在线");
				 }
			 }
			// BigDecimal lat = new BigDecimal(mapDetail.getLat());
			// BigDecimal lng = new BigDecimal(mapDetail.getLng());
			// BigDecimal lat1 = lat.add(new BigDecimal(0.00374531687912)).setScale(8, BigDecimal.ROUND_HALF_UP); //0.00374531687912    0.00381798
			// BigDecimal lng1 = lng.add(new BigDecimal(0.008774687519)).setScale(8, BigDecimal.ROUND_HALF_UP); //0.008774687519                0.01096540
			 //double lng=Double.parseDouble(mapDetail.getLng())+0.008774687519;
			// mapDetail.setLat(lat1.toString());
			// mapDetail.setLng(lng1.toString());
			// System.out.println(mapDetail.getLat()+"   "+mapDetail.getLng());
			 
			 //120.2346074  3025725198
			 // 获取 位置信息
			String mapUrl="http://api.map.baidu.com/geocoder/v2/?ak=y0xHvE9T3SKcdPdtM6jMvP99&callback=renderReverse&location="+mapDetail.getLat()+","+mapDetail.getLng()+"&output=json&pois=1";
			String addJson="";
			try {
				 addJson=WebClient.getWebContentByPost(mapUrl, "", "utf-8", 120000);
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			  String[] address = addJson.split("\\(\\{");
	          String[] addrJson1 = address[1].split("\\}\\)");
	          if(addrJson1!=null&&!"".equals(addrJson1)){
		          JSONObject jsonObject = JSONObject.fromObject("{"+addrJson1[0]+"}");
		          Object result = jsonObject.get("result");
		          if(result!=null){
			          JSONObject addressComponent = jsonObject.getJSONObject("result"); 
			          
			          String carAddress= addressComponent.getString("formatted_address");
			          mapDetail.setCarAddress(carAddress);
		          }
	          }else{
	        	  logger.error("返回信息为空==========");
	          }
		 }
          //JSONObject addressComponent = jsonObject.getJSONObject("result").getJSONObject("addressComponent");
          //String city = addressComponent.getString("city");
         // String district = addressComponent.getString("district");
          //System.out.println(city +"   " +district);
		 //setJsonString(addJson);
		 return SUCCESS;
	}
}
