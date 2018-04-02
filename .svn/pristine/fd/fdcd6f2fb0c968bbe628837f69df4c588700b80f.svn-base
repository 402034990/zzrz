package com.zhiwei.credit.model.creditFlow.mortage;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * 
 * @author 
 *
 */
/**
 * CsProcreditMortgageRecord Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class CsProcreditMortgageRecord extends com.zhiwei.core.model.BaseModel {

    protected Long id;
	protected Long mortgageId;
	protected java.util.Date storehouseDate;
	protected Short storehouseStatus;
	protected Long storehousePersonId;
	protected String storehouseSite;
	protected String storehouseRemark;
	protected java.util.Date operateDate;


	/**
	 * Default Empty Constructor for class CsProcreditMortgageRecord
	 */
	public CsProcreditMortgageRecord () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CsProcreditMortgageRecord
	 */
	public CsProcreditMortgageRecord (
		 Long in_id
        ) {
		this.setId(in_id);
    }

    

	/**
	 * 主键	 * @return Long
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
	 * cs_procredit_mortgage表主键	 * @return Long
	 * @hibernate.property column="mortgageId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getMortgageId() {
		return this.mortgageId;
	}
	
	/**
	 * Set the mortgageId
	 */	
	public void setMortgageId(Long aValue) {
		this.mortgageId = aValue;
	}	

	/**
	 * 入库/出库时间	 * @return java.util.Date
	 * @hibernate.property column="storehouseDate" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getStorehouseDate() {
		return this.storehouseDate;
	}
	
	/**
	 * Set the storehouseDate
	 */	
	public void setStorehouseDate(java.util.Date aValue) {
		this.storehouseDate = aValue;
	}	

	/**
	 * 状态(0未入库，1已入库，2已出库)	 * @return Short
	 * @hibernate.property column="storehouseStatus" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getStorehouseStatus() {
		return this.storehouseStatus;
	}
	
	/**
	 * Set the storehouseStatus
	 */	
	public void setStorehouseStatus(Short aValue) {
		this.storehouseStatus = aValue;
	}	

	/**
	 * 办理人id	 * @return Long
	 * @hibernate.property column="storehousePersonId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getStorehousePersonId() {
		return this.storehousePersonId;
	}
	
	/**
	 * Set the storehousePersonId
	 */	
	public void setStorehousePersonId(Long aValue) {
		this.storehousePersonId = aValue;
	}	

	/**
	 * 存放位置	 * @return String
	 * @hibernate.property column="storehouseSite" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getStorehouseSite() {
		return this.storehouseSite;
	}
	
	/**
	 * Set the storehouseSite
	 */	
	public void setStorehouseSite(String aValue) {
		this.storehouseSite = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="storehouseRemark" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getStorehouseRemark() {
		return this.storehouseRemark;
	}
	
	/**
	 * Set the storehouseRemark
	 */	
	public void setStorehouseRemark(String aValue) {
		this.storehouseRemark = aValue;
	}	

	/**
	 * 操作日期	 * @return java.util.Date
	 * @hibernate.property column="operateDate" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getOperateDate() {
		return this.operateDate;
	}
	
	/**
	 * Set the operateDate
	 */	
	public void setOperateDate(java.util.Date aValue) {
		this.operateDate = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CsProcreditMortgageRecord)) {
			return false;
		}
		CsProcreditMortgageRecord rhs = (CsProcreditMortgageRecord) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.mortgageId, rhs.mortgageId)
				.append(this.storehouseDate, rhs.storehouseDate)
				.append(this.storehouseStatus, rhs.storehouseStatus)
				.append(this.storehousePersonId, rhs.storehousePersonId)
				.append(this.storehouseSite, rhs.storehouseSite)
				.append(this.storehouseRemark, rhs.storehouseRemark)
				.append(this.operateDate, rhs.operateDate)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.mortgageId) 
				.append(this.storehouseDate) 
				.append(this.storehouseStatus) 
				.append(this.storehousePersonId) 
				.append(this.storehouseSite) 
				.append(this.storehouseRemark) 
				.append(this.operateDate) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("mortgageId", this.mortgageId) 
				.append("storehouseDate", this.storehouseDate) 
				.append("storehouseStatus", this.storehouseStatus) 
				.append("storehousePersonId", this.storehousePersonId) 
				.append("storehouseSite", this.storehouseSite) 
				.append("storehouseRemark", this.storehouseRemark) 
				.append("operateDate", this.operateDate) 
				.toString();
	}



}
