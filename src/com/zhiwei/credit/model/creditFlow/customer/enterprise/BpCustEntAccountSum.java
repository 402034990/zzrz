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
 * BpCustEntAccountSum Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class BpCustEntAccountSum extends com.zhiwei.core.model.BaseModel {

    protected Long id;
	protected Long indexId;
	protected String keyName;
	protected String subTitle;
	protected java.math.BigDecimal startMoney;
	protected java.math.BigDecimal endMoney;
	protected Long createrId;
	protected String createrName;
	protected java.util.Date updateDate;
	protected String remark;
	protected String title;
	protected String keyId;
	protected String subKey;
	/**
	 * 以前字段不与数据库关联
	 */
	protected String titleClassName;

    
	public String getSubKey() {
		return subKey;
	}

	public void setSubKey(String subKey) {
		this.subKey = subKey;
	}

	public Long getCreaterId() {
		return createrId;
	}

	public void setCreaterId(Long createrId) {
		this.createrId = createrId;
	}

	public String getCreaterName() {
		return createrName;
	}

	public void setCreaterName(String createrName) {
		this.createrName = createrName;
	}

	public String getTitleClassName() {
		return titleClassName;
	}

	public void setTitleClassName(String titleClassName) {
		this.titleClassName = titleClassName;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getKeyId() {
		return keyId;
	}

	public void setKeyId(String keyId) {
		this.keyId = keyId;
	}

	public String getKeyName() {
		return keyName;
	}

	public void setKeyName(String keyName) {
		this.keyName = keyName;
	}

	/**
	 * Default Empty Constructor for class BpCustEntAccountSum
	 */
	public BpCustEntAccountSum () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BpCustEntAccountSum
	 */
	public BpCustEntAccountSum (
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
	 * 汇总表ID	 * @return Long
	 * @hibernate.property column="indexId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getIndexId() {
		return this.indexId;
	}
	
	/**
	 * Set the indexId
	 */	
	public void setIndexId(Long aValue) {
		this.indexId = aValue;
	}	


	/**
	 * 二级科目名称	 * @return String
	 * @hibernate.property column="subTitle" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getSubTitle() {
		return this.subTitle;
	}
	
	/**
	 * Set the subTitle
	 */	
	public void setSubTitle(String aValue) {
		this.subTitle = aValue;
	}	

	/**
	 * 期初余额	 * @return java.math.BigDecimal
	 * @hibernate.property column="startMoney" type="java.math.BigDecimal" length="20" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getStartMoney() {
		return this.startMoney;
	}
	
	/**
	 * Set the startMoney
	 */	
	public void setStartMoney(java.math.BigDecimal aValue) {
		this.startMoney = aValue;
	}	

	/**
	 * 期末余额	 * @return java.math.BigDecimal
	 * @hibernate.property column="endMoney" type="java.math.BigDecimal" length="20" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getEndMoney() {
		return this.endMoney;
	}
	
	/**
	 * Set the endMoney
	 */	
	public void setEndMoney(java.math.BigDecimal aValue) {
		this.endMoney = aValue;
	}	



	/**
	 * 创建/更新时间	 * @return java.util.Date
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
		if (!(object instanceof BpCustEntAccountSum)) {
			return false;
		}
		BpCustEntAccountSum rhs = (BpCustEntAccountSum) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.indexId, rhs.indexId)
				.append(this.subTitle, rhs.subTitle)
				.append(this.startMoney, rhs.startMoney)
				.append(this.endMoney, rhs.endMoney)
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
				.append(this.indexId) 
				.append(this.subTitle) 
				.append(this.startMoney) 
				.append(this.endMoney) 
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
				.append("indexId", this.indexId) 
				.append("subTitle", this.subTitle) 
				.append("startMoney", this.startMoney) 
				.append("endMoney", this.endMoney) 
				.append("createId", this.createrId) 
				.append("createName", this.createrName) 
				.append("updateDate", this.updateDate) 
				.append("remark", this.remark) 
				.toString();
	}



}
