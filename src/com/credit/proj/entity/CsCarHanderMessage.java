package com.credit.proj.entity;

import java.util.Date;

import com.google.gson.annotations.Expose;


/**
 * CsProcreditMortgageCar entity. @author MyEclipse Persistence Tools
 */

public class CsCarHanderMessage  implements java.io.Serializable {
	 
	private Long  id;//表的主键
	private Short type;//类型 1 入库 2 出库 3 置换
	private Date handertime;//类型
	private String handermark;//处理说明
	private Long handerId;//处理人的主键
	private String handername;//处理人姓名
	private String handernum;//处理编号
	private String contractidStr;//合同主键集合
	private  Long  carId;//车辆主键
	
	/** default constructor */
	public CsCarHanderMessage() {
		
	}
	/** full constructor */
	public CsCarHanderMessage( Long  id,Short type,Date  handertime,
			String  handermark,Long  handerId,String  handername,
			String handernum,String contractidStr,Long  carId) {
		this.id  =  id;
		this.type = type;
		this.handertime = handertime;
		this.handermark = handermark;
		this.handerId = handerId;
		this.handername = handername;
		this.handernum  = handernum;
		this.contractidStr = contractidStr;
		this.carId = carId;
	}
	
	
	public Long getCarId() {
		return carId;
	}
	public void setCarId(Long carId) {
		this.carId = carId;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Short getType() {
		return type;
	}
	public void setType(Short type) {
		this.type = type;
	}
	public Date getHandertime() {
		return handertime;
	}
	public void setHandertime(Date handertime) {
		this.handertime = handertime;
	}
	 
	public String getHandermark() {
		return handermark;
	}
	public void setHandermark(String handermark) {
		this.handermark = handermark;
	}
	public Long getHanderId() {
		return handerId;
	}
	public void setHanderId(Long handerId) {
		this.handerId = handerId;
	}
	public String getHandername() {
		return handername;
	}
	public void setHandername(String handername) {
		this.handername = handername;
	}
	public String getHandernum() {
		return handernum;
	}
	public void setHandernum(String handernum) {
		this.handernum = handernum;
	}
	public String getContractidStr() {
		return contractidStr;
	}
	public void setContractidStr(String contractidStr) {
		this.contractidStr = contractidStr;
	}
}