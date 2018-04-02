package com.zhiwei.credit.model.creditFlow.creditRecord;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.Date;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * 
 * @author 
 *
 */
/**
 * CsPersonCreditRecord Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class CsPersonCreditRecord extends com.zhiwei.core.model.BaseModel {

    protected Long id;
	protected Long projectId;//项目Id
	protected Integer personId;//人物Id
	protected String nameKey;
	protected String nameValue;//三方返回json
	protected String type;//接口类型
	//protected String explain;
	protected String interfaceSign;//接口名称
	protected Date reqDate;//请求时间


	/**
	 * Default Empty Constructor for class CsPersonCreditRecord
	 */
	public CsPersonCreditRecord () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CsPersonCreditRecord
	 */
	public CsPersonCreditRecord (
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
	 * 项目id	 * @return Long
	 * @hibernate.property column="projectId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getProjectId() {
		return this.projectId;
	}
	
	public String getInterfaceSign() {
		return interfaceSign;
	}

	public void setInterfaceSign(String interfaceSign) {
		this.interfaceSign = interfaceSign;
	}

	/**
	 * Set the projectId
	 */	
	public void setProjectId(Long aValue) {
		this.projectId = aValue;
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="personId" type="java.lang.Integer" length="19" not-null="false" unique="false"
	 */
	public Integer getPersonId() {
		return this.personId;
	}
	
	/**
	 * Set the personId
	 */	
	public void setPersonId(Integer aValue) {
		this.personId = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="nameKey" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getNameKey() {
		return this.nameKey;
	}
	
	/**
	 * Set the nameKey
	 */	
	public void setNameKey(String aValue) {
		this.nameKey = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="nameValue" type="java.lang.String" length="65535" not-null="false" unique="false"
	 */
	public String getNameValue() {
		return this.nameValue;
	}
	
	/**
	 * Set the nameValue
	 */	
	public void setNameValue(String aValue) {
		this.nameValue = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="type" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getType() {
		return this.type;
	}
	
	/**
	 * Set the type
	 */	
	public void setType(String aValue) {
		this.type = aValue;
	}	

	

	public Date getReqDate() {
		return reqDate;
	}

	public void setReqDate(Date reqDate) {
		this.reqDate = reqDate;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CsPersonCreditRecord)) {
			return false;
		}
		CsPersonCreditRecord rhs = (CsPersonCreditRecord) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.projectId, rhs.projectId)
				.append(this.personId, rhs.personId)
				.append(this.nameKey, rhs.nameKey)
				.append(this.nameValue, rhs.nameValue)
				.append(this.type, rhs.type)
				.append(this.reqDate, rhs.reqDate)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.projectId) 
				.append(this.personId) 
				.append(this.nameKey) 
				.append(this.nameValue) 
				.append(this.type) 
				.append(this.reqDate) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("projectId", this.projectId) 
				.append("personId", this.personId) 
				.append("nameKey", this.nameKey) 
				.append("nameValue", this.nameValue) 
				.append("type", this.type) 
				.append("reqDate", this.reqDate) 
				.toString();
	}



}
