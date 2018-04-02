package com.zhiwei.credit.model.system;

/*
 *  北京互融时代软件有限公司 OA办公管理系统   --  http://www.hurongtime.com
 *  Copyright (C) 2008-2011 zhiwei Software Company
 */

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.google.gson.annotations.Expose;

@SuppressWarnings("serial")
public class MapDetail extends com.zhiwei.core.model.BaseModel {
	protected String ret;//	String	返回码:0: 正确返回 其它: 失败。公共返回码说明
	protected String imei	;//String	设备的IMEI
	protected String lat	;//String	设备返回的GPS纬度
	protected String lng	;//String	设备返回的GPS经度
	protected String gpsTime	;//String	设备的定位的UTC时间戳
	protected String serverTime	;//String	服务器收到数据的UTC时间戳
	protected String speed	;//Number	速度。速度需要除以10。才是 km/h
	protected String course	;//Number	角度。数据需要除以100。正北是 0°，角度按顺时针旋转
	protected String status;//	Number	设备状态 0 离线 1在线
	protected String carNumber;
	protected String carAddress;

		public String getRet() {
		return ret;
	}
		public MapDetail(){
			
		}
	
	public MapDetail(String ret, String imei, String lat, String lng,
				String gpsTime, String serverTime, String speed, String course,
				String status,String carNumber,String carAddress) {
			super();
			this.ret = ret;
			this.imei = imei;
			this.lat = lat;
			this.lng = lng;
			this.gpsTime = gpsTime;
			this.serverTime = serverTime;
			this.speed = speed;
			this.course = course;
			this.status = status;
			this.carNumber=carNumber;
			this.carAddress=carAddress;
		}

	public void setRet(String ret) {
		this.ret = ret;
	}
	public String getImei() {
		return imei;
	}
	public void setImei(String imei) {
		this.imei = imei;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public String getLng() {
		return lng;
	}
	public void setLng(String lng) {
		this.lng = lng;
	}
	public String getGpsTime() {
		return gpsTime;
	}
	public void setGpsTime(String gpsTime) {
		this.gpsTime = gpsTime;
	}
	public String getServerTime() {
		return serverTime;
	}
	public void setServerTime(String serverTime) {
		this.serverTime = serverTime;
	}
	public String getSpeed() {
		return speed;
	}
	public void setSpeed(String speed) {
		this.speed = speed;
	}
	public String getCourse() {
		return course;
	}
	public void setCourse(String course) {
		this.course = course;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCarNumber() {
		return carNumber;
	}
	public void setCarNumber(String carNumber) {
		this.carNumber = carNumber;
	}
	public String getCarAddress() {
		return carAddress;
	}
	public void setCarAddress(String carAddress) {
		this.carAddress = carAddress;
	}
	

	
	
}
