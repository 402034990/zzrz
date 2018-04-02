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
 * BpCustEntAccountIndex Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class BpCustEntAccountIndex extends com.zhiwei.core.model.BaseModel {

    protected Long id;
	protected String customerType;
	protected Long customerId;
	protected String year;
	protected String month;
	protected Long createId;
	protected String createName;
	protected java.util.Date createDate;
	protected String remark;
	protected java.util.Date startDate;
	protected java.util.Date endDate;
    
	public java.util.Date getStartDate() {
		return startDate;
	}

	public void setStartDate(java.util.Date startDate) {
		this.startDate = startDate;
	}

	public java.util.Date getEndDate() {
		return endDate;
	}

	public void setEndDate(java.util.Date endDate) {
		this.endDate = endDate;
	}

	/**
	 * Default Empty Constructor for class BpCustEntAccountIndex
	 */
	public BpCustEntAccountIndex () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BpCustEntAccountIndex
	 */
	public BpCustEntAccountIndex (
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
	 * 创建人ID	 * @return Long
	 * @hibernate.property column="createId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getCreateId() {
		return this.createId;
	}
	
	/**
	 * Set the createId
	 */	
	public void setCreateId(Long aValue) {
		this.createId = aValue;
	}	

	/**
	 * 创建人	 * @return String
	 * @hibernate.property column="createName" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getCreateName() {
		return this.createName;
	}
	
	/**
	 * Set the createName
	 */	
	public void setCreateName(String aValue) {
		this.createName = aValue;
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
		if (!(object instanceof BpCustEntAccountIndex)) {
			return false;
		}
		BpCustEntAccountIndex rhs = (BpCustEntAccountIndex) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.customerType, rhs.customerType)
				.append(this.customerId, rhs.customerId)
				.append(this.year, rhs.year)
				.append(this.month, rhs.month)
				.append(this.createId, rhs.createId)
				.append(this.createName, rhs.createName)
				.append(this.createDate, rhs.createDate)
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
				.append(this.createId) 
				.append(this.createName) 
				.append(this.createDate) 
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
				.append("createId", this.createId) 
				.append("createName", this.createName) 
				.append("createDate", this.createDate) 
				.append("remark", this.remark) 
				.toString();
	}



}
