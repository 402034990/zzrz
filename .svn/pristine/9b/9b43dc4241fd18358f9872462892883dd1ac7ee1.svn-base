package com.zhiwei.credit.model.agentAproval;
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
 * BankCredit Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class BankCredit extends com.zhiwei.core.model.BaseModel {

    protected Long id;//主键
	protected Short bankCreditType;//授信类型  1 企业 2 个人
	protected Long bankCreditId;//被授信企业和个人的主键
	protected String bankCreditName;//被授信企业或个人名称
	
	
	
	protected java.math.BigDecimal creditMoney;//授信金额
	protected java.util.Date beginTime;//授信开始时间
	protected java.util.Date endTime;//授信结束时间
	protected java.util.Date createtime;//授信启动时间
	protected String bankCreditNum;//授信编号
	protected String businessTypeKey;//业务类型
	protected Short status;//授信状态  1启动授信 2 授信成功 3 授信失败
	protected String  creditName;//授信名称
	 
	protected Long oppositeID;
	public String  departMentName;//所属部门名称
	public Long  departId;//所属部门主键
	private   String  editType;//授信类型
	protected java.math.BigDecimal shengyuMoney;//剩余授信金额
	protected java.math.BigDecimal useMoney;//占用授信金额
	protected  String oppositeType;//客户类型 commer_person  commer_business
	private  String appUserName;//客户经理名称
	private  Long  appUserId;//客户经理id
	 //授信类型
	 public  String  ceditType;//授信类型   1 最高额授信  2 最高额抵押授信 3最高额质押授4最高额保证授信
	 private   Short ceditTypeId;//授信类型id
	 //我方主体
	 public  Long  	mineType;//我方主体名称主键
	 public String  mineName;//我方主体名称
	 public  String mineTypeId;//我方主体 类型标记号
	 public String mineTypeName;//我方主体 类型标记名称
	 public  String userName;//客户名称
	 public  String userNum;//客户编号
	 public  Short bankCreditWay;//授信方式  1 一次性授信  2 循环授信
	 public  String bankCreditWayName;//授信方式名称
	 
	 public String taskId;//流程主键
	 
	 
	 
	 /**********************************新添字段  不和数据库关联*********************************/
	 
	 public  Integer  isYes;//判断是否使用授信金额
	 
	 
	 
	 
	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getBankCreditWayName() {
		return bankCreditWayName;
	}

	public void setBankCreditWayName(String bankCreditWayName) {
		this.bankCreditWayName = bankCreditWayName;
	}

	public Short getBankCreditWay() {
		return bankCreditWay;
	}

	public void setBankCreditWay(Short bankCreditWay) {
		this.bankCreditWay = bankCreditWay;
	}

	public Integer getIsYes() {
		return isYes;
	}

	public void setIsYes(Integer isYes) {
		this.isYes = isYes;
	}

	public String getUserNum() {
		return userNum;
	}

	public void setUserNum(String userNum) {
		this.userNum = userNum;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public java.math.BigDecimal getUseMoney() {
		return useMoney;
	}

	public void setUseMoney(java.math.BigDecimal useMoney) {
		this.useMoney = useMoney;
	}

	public String getMineTypeId() {
		return mineTypeId;
	}

	public void setMineTypeId(String mineTypeId) {
		this.mineTypeId = mineTypeId;
	}

	public String getMineTypeName() {
		return mineTypeName;
	}

	public void setMineTypeName(String mineTypeName) {
		this.mineTypeName = mineTypeName;
	}

	public Long getMineType() {
		return mineType;
	}

	public void setMineType(Long mineType) {
		this.mineType = mineType;
	}

	public String getMineName() {
		return mineName;
	}

	public void setMineName(String mineName) {
		this.mineName = mineName;
	}

	public String getCeditType() {
		return ceditType;
	}

	public void setCeditType(String ceditType) {
		this.ceditType = ceditType;
	}

	public Long getDepartId() {
		return departId;
	}

	public void setDepartId(Long departId) {
		this.departId = departId;
	}

	public String getAppUserName() {
		return appUserName;
	}

	public void setAppUserName(String appUserName) {
		this.appUserName = appUserName;
	}

	public Long getAppUserId() {
		return appUserId;
	}

	public void setAppUserId(Long appUserId) {
		this.appUserId = appUserId;
	}

	public String getDepartMentName() {
		return departMentName;
	}

	public void setDepartMentName(String departMentName) {
		this.departMentName = departMentName;
	}

	 
	 

	public String getEditType() {
		return editType;
	}

	public void setEditType(String editType) {
		this.editType = editType;
	}

	public Short getCeditTypeId() {
		return ceditTypeId;
	}

	public void setCeditTypeId(Short ceditTypeId) {
		this.ceditTypeId = ceditTypeId;
	}

	public Long getOppositeID() {
		return oppositeID;
	}

	public void setOppositeID(Long oppositeID) {
		this.oppositeID = oppositeID;
	}

	

	
	

	public String getOppositeType() {
		return oppositeType;
	}

	public void setOppositeType(String oppositeType) {
		this.oppositeType = oppositeType;
	}

	public java.math.BigDecimal getShengyuMoney() {
		return shengyuMoney;
	}

	public void setShengyuMoney(java.math.BigDecimal shengyuMoney) {
		this.shengyuMoney = shengyuMoney;
	}

	/**
	 * Default Empty Constructor for class BankCredit
	 */
	public BankCredit () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BankCredit
	 */
	public BankCredit (
		 Long in_id
        ) {
		this.setId(in_id);
    }

    

	public String getCreditName() {
		return creditName;
	}

	public void setCreditName(String creditName) {
		this.creditName = creditName;
	}

	/**
	 * 表主键	 * @return Long
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
	 * 授信类型 1 企业 2 个人	 * @return Short
	 * @hibernate.property column="bankCreditType" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getBankCreditType() {
		return this.bankCreditType;
	}
	
	/**
	 * Set the bankCreditType
	 */	
	public void setBankCreditType(Short aValue) {
		this.bankCreditType = aValue;
	}	

	/**
	 * 被授信企业或个人的主键	 * @return Long
	 * @hibernate.property column="bankCreditId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getBankCreditId() {
		return this.bankCreditId;
	}
	
	/**
	 * Set the bankCreditId
	 */	
	public void setBankCreditId(Long aValue) {
		this.bankCreditId = aValue;
	}	

	/**
	 * 被授信企业或个人的名称	 * @return String
	 * @hibernate.property column="bankCreditName" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getBankCreditName() {
		return this.bankCreditName;
	}
	
	/**
	 * Set the bankCreditName
	 */	
	public void setBankCreditName(String aValue) {
		this.bankCreditName = aValue;
	}	

	/**
	 * 授信金额	 * @return java.math.BigDecimal
	 * @hibernate.property column="creditMoney" type="java.math.BigDecimal" length="14" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getCreditMoney() {
		return this.creditMoney;
	}
	
	/**
	 * Set the creditMoney
	 */	
	public void setCreditMoney(java.math.BigDecimal aValue) {
		this.creditMoney = aValue;
	}	

	/**
	 * 授信开始时间	 * @return java.util.Date
	 * @hibernate.property column="beginTime" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getBeginTime() {
		return this.beginTime;
	}
	
	/**
	 * Set the beginTime
	 */	
	public void setBeginTime(java.util.Date aValue) {
		this.beginTime = aValue;
	}	

	/**
	 * 授信结束时间	 * @return java.util.Date
	 * @hibernate.property column="endTime" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getEndTime() {
		return this.endTime;
	}
	
	/**
	 * Set the endTime
	 */	
	public void setEndTime(java.util.Date aValue) {
		this.endTime = aValue;
	}	

	/**
	 * 授信启动时间	 * @return java.util.Date
	 * @hibernate.property column="createtime" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getCreatetime() {
		return this.createtime;
	}
	
	/**
	 * Set the createtime
	 */	
	public void setCreatetime(java.util.Date aValue) {
		this.createtime = aValue;
	}	

	/**
	 * 授信编号	 * @return String
	 * @hibernate.property column="bankCreditNum" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getBankCreditNum() {
		return this.bankCreditNum;
	}
	
	/**
	 * Set the bankCreditNum
	 */	
	public void setBankCreditNum(String aValue) {
		this.bankCreditNum = aValue;
	}	

	/**
	 * 业务类型	 * @return String
	 * @hibernate.property column="businessTypeKey" type="java.lang.String" length="64" not-null="false" unique="false"
	 */
	public String getBusinessTypeKey() {
		return this.businessTypeKey;
	}
	
	/**
	 * Set the businessTypeKey
	 */	
	public void setBusinessTypeKey(String aValue) {
		this.businessTypeKey = aValue;
	}	

	/**
	 * 授信状态  1启动授信 2 授信成功 3 授信失败	 * @return Short
	 * @hibernate.property column="status" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}
	
	/**
	 * Set the status
	 */	
	public void setStatus(Short aValue) {
		this.status = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BankCredit)) {
			return false;
		}
		BankCredit rhs = (BankCredit) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.bankCreditType, rhs.bankCreditType)
				.append(this.bankCreditId, rhs.bankCreditId)
				.append(this.bankCreditName, rhs.bankCreditName)
				.append(this.creditMoney, rhs.creditMoney)
				.append(this.beginTime, rhs.beginTime)
				.append(this.endTime, rhs.endTime)
				.append(this.createtime, rhs.createtime)
				.append(this.bankCreditNum, rhs.bankCreditNum)
				.append(this.businessTypeKey, rhs.businessTypeKey)
				.append(this.status, rhs.status)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.bankCreditType) 
				.append(this.bankCreditId) 
				.append(this.bankCreditName) 
				.append(this.creditMoney) 
				.append(this.beginTime) 
				.append(this.endTime) 
				.append(this.createtime) 
				.append(this.bankCreditNum) 
				.append(this.businessTypeKey) 
				.append(this.status) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("bankCreditType", this.bankCreditType) 
				.append("bankCreditId", this.bankCreditId) 
				.append("bankCreditName", this.bankCreditName) 
				.append("creditMoney", this.creditMoney) 
				.append("beginTime", this.beginTime) 
				.append("endTime", this.endTime) 
				.append("createtime", this.createtime) 
				.append("bankCreditNum", this.bankCreditNum) 
				.append("businessTypeKey", this.businessTypeKey) 
				.append("status", this.status) 
				.toString();
	}



}
