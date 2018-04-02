package com.nc.model;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * 
 * @author 
 *
 */
/**
 * UPushRecord Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * NC推送记录表
 */
public class NcPushRecord extends com.zhiwei.core.model.BaseModel {
	
	
	
	//serviceType操作类型
	/**
	 * 放款
	 */
	public static final String HRY_1000 = "hry_1000";
	/**
	 * 还款
	 */
	public static final String HRY_1001 = "hry_1001";
	/**
	 * 保证金收取
	 */
	public static final String HRY_1002 = "hry_1002";
	/**
	 * 保证金退还
	 */
	public static final String HRY_1003 = "hry_1003";
	/**
	 * 手续费收取
	 */
	public static final String HRY_1004 = "hry_1004";
	/**
	 * 客户新增
	 */
	public static final String HRY_1005 = "hry_1005";
	/**
	 * 保证人新增
	 */
	public static final String HRY_1006 = "hry_1006";
	/**
	 * 查询财务
	 */
	public static final String HRY_1007 = "hry_1007";
	/**
	 * 查询客户
	 */
	public static final String HRY_1008 = "hry_1008";
	/**
	 * 撤销记账
	 */
	public static final String HRY_1009 = "hry_1009";
	/**
	 * 备用
	 */
	public static final String HRY_1010 = "hry_1010";
	
	// state 是否有效
	/**
	 * 是否有效----无效
	 */
	public static final Integer STATE_1 = 1;
	/**
	 * 是否有效----有效
	 */
	public static final Integer STATE_2 = 2;
	

    protected Long id;
	protected String serviceType;
	protected String pushData;
	protected String requestNo;
	protected Integer pushNumber;
	protected String pushUserName;
	protected Long pushUserId;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected String returnCode;
	protected String returnMsg;
	protected java.util.Date returnDate;
	protected Integer state;
	protected Long insideId;


	/**
	 * Default Empty Constructor for class UPushRecord
	 */
	public NcPushRecord () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UPushRecord
	 */
	public NcPushRecord (
		 Long in_id
        ) {
		this.setId(in_id);
    }

    

	/**
	 * 	 * @return Long
     * @hibernate.id column="id" type="java.lang.Long" generator-class="native"
	 */
	public Long getId() {
		return this.id;
	}
	
	/**
	 * Set the id
	 */	
	public void setId(Long aValue) {
		this.id = aValue;
	}	

	/**
	 * 操作类型	 * @return Integer
	 * @hibernate.property column="serviceType" type="java.lang.String" length="10" not-null="false" unique="false"
	 */
	public String getServiceType() {
		return this.serviceType;
	}
	
	/**
	 * Set the serviceType
	 */	
	public void setServiceType(String aValue) {
		this.serviceType = aValue;
	}	

	/**
	 * 推送数据包	 * @return String
	 * @hibernate.property column="pushData" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getPushData() {
		return this.pushData;
	}
	
	/**
	 * Set the pushData
	 */	
	public void setPushData(String aValue) {
		this.pushData = aValue;
	}	

	/**
	 * 业务流水号	 * @return String
	 * @hibernate.property column="requestNo" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getRequestNo() {
		return this.requestNo;
	}
	
	/**
	 * Set the requestNo
	 */	
	public void setRequestNo(String aValue) {
		this.requestNo = aValue;
	}	

	/**
	 * 推送次数	 * @return Integer
	 * @hibernate.property column="pushNumber" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getPushNumber() {
		return this.pushNumber;
	}
	
	/**
	 * Set the pushNumber
	 */	
	public void setPushNumber(Integer aValue) {
		this.pushNumber = aValue;
	}	

	/**
	 * 推送人员姓名	 * @return String
	 * @hibernate.property column="pushUserName" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getPushUserName() {
		return this.pushUserName;
	}
	
	/**
	 * Set the pushUserName
	 */	
	public void setPushUserName(String aValue) {
		this.pushUserName = aValue;
	}	

	/**
	 * 推送人员Id	 * @return Long
	 * @hibernate.property column="pushUserId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getPushUserId() {
		return this.pushUserId;
	}
	
	/**
	 * Set the pushUserId
	 */	
	public void setPushUserId(Long aValue) {
		this.pushUserId = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="createDate" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getCreateDate() {
		return this.createDate;
	}
	
	/**
	 * Set the createDate
	 */	
	public void setCreateDate(java.util.Date aValue) {
		this.createDate = aValue;
	}	

	/**
	 * 修改时间	 * @return java.util.Date
	 * @hibernate.property column="updateDate" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getUpdateDate() {
		return this.updateDate;
	}
	
	/**
	 * Set the updateDate
	 */	
	public void setUpdateDate(java.util.Date aValue) {
		this.updateDate = aValue;
	}	

	/**
	 * 状态码	 * @return String
	 * @hibernate.property column="returnCode" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getReturnCode() {
		return this.returnCode;
	}
	
	/**
	 * Set the returnCode
	 */	
	public void setReturnCode(String aValue) {
		this.returnCode = aValue;
	}	

	/**
	 * 返回信息说明	 * @return String
	 * @hibernate.property column="returnMsg" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getReturnMsg() {
		return this.returnMsg;
	}
	
	/**
	 * Set the returnMsg
	 */	
	public void setReturnMsg(String aValue) {
		this.returnMsg = aValue;
	}	

	/**
	 * 返回时间	 * @return java.util.Date
	 * @hibernate.property column="returnDate" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getReturnDate() {
		return this.returnDate;
	}
	
	/**
	 * Set the returnDate
	 */	
	public void setReturnDate(java.util.Date aValue) {
		this.returnDate = aValue;
	}	

	/**
	 * 是否有效	 * @return Integer
	 * @hibernate.property column="state" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getState() {
		return this.state;
	}
	
	/**
	 * Set the state
	 */	
	public void setState(Integer aValue) {
		this.state = aValue;
	}	

	/**
	 * 内部关联Id	 * @return Long
	 * @hibernate.property column="insideId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getInsideId() {
		return this.insideId;
	}
	
	/**
	 * Set the insideId
	 */	
	public void setInsideId(Long aValue) {
		this.insideId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof NcPushRecord)) {
			return false;
		}
		NcPushRecord rhs = (NcPushRecord) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.serviceType, rhs.serviceType)
				.append(this.pushData, rhs.pushData)
				.append(this.requestNo, rhs.requestNo)
				.append(this.pushNumber, rhs.pushNumber)
				.append(this.pushUserName, rhs.pushUserName)
				.append(this.pushUserId, rhs.pushUserId)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.returnCode, rhs.returnCode)
				.append(this.returnMsg, rhs.returnMsg)
				.append(this.returnDate, rhs.returnDate)
				.append(this.state, rhs.state)
				.append(this.insideId, rhs.insideId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.serviceType) 
				.append(this.pushData) 
				.append(this.requestNo) 
				.append(this.pushNumber) 
				.append(this.pushUserName) 
				.append(this.pushUserId) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.returnCode) 
				.append(this.returnMsg) 
				.append(this.returnDate) 
				.append(this.state) 
				.append(this.insideId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("serviceType", this.serviceType) 
				.append("pushData", this.pushData) 
				.append("requestNo", this.requestNo) 
				.append("pushNumber", this.pushNumber) 
				.append("pushUserName", this.pushUserName) 
				.append("pushUserId", this.pushUserId) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("returnCode", this.returnCode) 
				.append("returnMsg", this.returnMsg) 
				.append("returnDate", this.returnDate) 
				.append("state", this.state) 
				.append("insideId", this.insideId) 
				.toString();
	}



}
