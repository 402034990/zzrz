package com.nc.model;

/**
 * 客户/保证人推送信息
 * @author huanggh
 *
 */

public class NcPushCustomer {
	/**
	 * 操作类型 --- 客户新增
	 */
	public static final Integer OPTTYPE_1 = 1;
	/**
	 * 操作类型 --- 保证人新增
	 */
	public static final Integer OPTTYPE_2 = 2;
	
	/**
	 * 客户类型 ---个人
	 */
	public static final Integer CUSTKIND_1 = 1;
	/**
	 * 客户类型 ---企业
	 */
	public static final Integer CUSTKIND_2 = 2;
	
	
	
	/**
	 * 业务流水号
	 */
	protected String busid; 
	/**
	 * 客户/保证人ID
	 */
	protected String vcode; 
	/**
	 * 客户/保证人姓名
	 */
	protected String vname; 
	/**
	 * 客户类型
	 * 1：个人   
	 * 2：企业
	 */
	protected String custkind; 
	/**
	 * 操作类型
	 */
	protected String opttype;
	
	public String getBusid() {
		return busid;
	}
	public void setBusid(String busid) {
		this.busid = busid;
	}
	public String getVcode() {
		return vcode;
	}
	public void setVcode(String vcode) {
		this.vcode = vcode;
	}
	public String getVname() {
		return vname;
	}
	public void setVname(String vname) {
		this.vname = vname;
	}
	public String getCustkind() {
		return custkind;
	}
	public void setCustkind(String custkind) {
		this.custkind = custkind;
	}
	public String getOpttype() {
		return opttype;
	}
	public void setOpttype(String opttype) {
		this.opttype = opttype;
	} 
	

}
