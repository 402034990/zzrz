package com.zhiwei.credit.model.creditFlow.customer.enterprise;
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
 * BpCustEntAccountSumIndex Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class BpCustEntAccountSumIndex extends com.zhiwei.core.model.BaseModel {

    protected Long id;
	protected String customerType;
	protected Long customerId;
	protected String year;
	protected String month;
	protected java.util.Date startDate;
	protected java.util.Date endDate;
	protected Long createrId;
	protected String createrName;
	protected java.util.Date updateDate;
	protected String remark;
	/**
	 * 账套Id
	 */
	protected Long listId;

	public Long getListId() {
		return listId;
	}

	public void setListId(Long listId) {
		this.listId = listId;
	}

	/**
	 * Default Empty Constructor for class BpCustEntAccountSumIndex
	 */
	public BpCustEntAccountSumIndex () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BpCustEntAccountSumIndex
	 */
	public BpCustEntAccountSumIndex (
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
	 * 客户类别	 * @return String
	 * @hibernate.property column="customerType" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getCustomerType() {
		return this.customerType;
	}
	
	/**
	 * Set the customerType
	 */	
	public void setCustomerType(String aValue) {
		this.customerType = aValue;
	}	

	/**
	 * 客户ID	 * @return Long
	 * @hibernate.property column="customerId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getCustomerId() {
		return this.customerId;
	}
	
	/**
	 * Set the customerId
	 */	
	public void setCustomerId(Long aValue) {
		this.customerId = aValue;
	}	

	/**
	 * year	 * @return String
	 * @hibernate.property column="year" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getYear() {
		return this.year;
	}
	
	/**
	 * Set the year
	 */	
	public void setYear(String aValue) {
		this.year = aValue;
	}	

	/**
	 * month	 * @return String
	 * @hibernate.property column="month" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getMonth() {
		return this.month;
	}
	
	/**
	 * Set the month
	 */	
	public void setMonth(String aValue) {
		this.month = aValue;
	}	

	/**
	 * 开始日期	 * @return java.util.Date
	 * @hibernate.property column="startDate" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getStartDate() {
		return this.startDate;
	}
	
	/**
	 * Set the startDate
	 */	
	public void setStartDate(java.util.Date aValue) {
		this.startDate = aValue;
	}	

	/**
	 * 结束日期	 * @return java.util.Date
	 * @hibernate.property column="endDate" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getEndDate() {
		return this.endDate;
	}
	
	/**
	 * Set the endDate
	 */	
	public void setEndDate(java.util.Date aValue) {
		this.endDate = aValue;
	}	

	/**
	 * 创建人ID	 * @return Long
	 * @hibernate.property column="createrId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getCreaterId() {
		return this.createrId;
	}
	
	/**
	 * Set the createrId
	 */	
	public void setCreaterId(Long aValue) {
		this.createrId = aValue;
	}	

	/**
	 * 创建人	 * @return String
	 * @hibernate.property column="createrName" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getCreaterName() {
		return this.createrName;
	}
	
	/**
	 * Set the createrName
	 */	
	public void setCreaterName(String aValue) {
		this.createrName = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
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
	 * 备注	 * @return String
	 * @hibernate.property column="remark" type="java.lang.String" length="65535" not-null="false" unique="false"
	 */
	public String getRemark() {
		return this.remark;
	}
	
	/**
	 * Set the remark
	 */	
	public void setRemark(String aValue) {
		this.remark = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BpCustEntAccountSumIndex)) {
			return false;
		}
		BpCustEntAccountSumIndex rhs = (BpCustEntAccountSumIndex) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.customerType, rhs.customerType)
				.append(this.customerId, rhs.customerId)
				.append(this.year, rhs.year)
				.append(this.month, rhs.month)
				.append(this.startDate, rhs.startDate)
				.append(this.endDate, rhs.endDate)
				.append(this.createrId, rhs.createrId)
				.append(this.createrName, rhs.createrName)
				.append(this.updateDate, rhs.updateDate)
				.append(this.remark, rhs.remark)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.customerType) 
				.append(this.customerId) 
				.append(this.year) 
				.append(this.month) 
				.append(this.startDate) 
				.append(this.endDate) 
				.append(this.createrId) 
				.append(this.createrName) 
				.append(this.updateDate) 
				.append(this.remark) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("customerType", this.customerType) 
				.append("customerId", this.customerId) 
				.append("year", this.year) 
				.append("month", this.month) 
				.append("startDate", this.startDate) 
				.append("endDate", this.endDate) 
				.append("createrId", this.createrId) 
				.append("createrName", this.createrName) 
				.append("updateDate", this.updateDate) 
				.append("remark", this.remark) 
				.toString();
	}



}
