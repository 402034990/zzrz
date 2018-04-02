package com.zhiwei.credit.model.agentAproval;
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
 * BankCreditUserLog Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class BankCreditUserLog extends com.zhiwei.core.model.BaseModel {

    protected Long id;//主键
	protected Long projectId;//项目主键
	protected String projectName;//项目名称
	protected  String  projectNum;//项目编号
	protected Short creditType;//授信类型
	protected java.math.BigDecimal creditMoney;//使用授信金额
	protected String commerType;//客户类型
	protected Long commerId;//客户类型id
	protected Short status;//状态  1 授信释放 2 占用中  3 失败
	protected  Date  createtime;//创建时间
	protected String oprateName;//操作人
	protected Long oprateNameId;//操作人id

	protected Long bankCreditId;//授信表的主键
	
	/////////////////////////添加字段 不和表关联////////////////////
	private  String bankCreditWayName;
	
	
	
	
	public String getBankCreditWayName() {
		return bankCreditWayName;
	}

	public void setBankCreditWayName(String bankCreditWayName) {
		this.bankCreditWayName = bankCreditWayName;
	}

	public String getOprateName() {
		return oprateName;
	}

	public void setOprateName(String oprateName) {
		this.oprateName = oprateName;
	}

	public Long getOprateNameId() {
		return oprateNameId;
	}

	public void setOprateNameId(Long oprateNameId) {
		this.oprateNameId = oprateNameId;
	}

	public Long getBankCreditId() {
		return bankCreditId;
	}

	public void setBankCreditId(Long bankCreditId) {
		this.bankCreditId = bankCreditId;
	}

	public String getProjectNum() {
		return projectNum;
	}

	public void setProjectNum(String projectNum) {
		this.projectNum = projectNum;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	/**
	 * Default Empty Constructor for class BankCreditUserLog
	 */
	public BankCreditUserLog () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BankCreditUserLog
	 */
	public BankCreditUserLog (
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
	 * 	 * @return Long
	 * @hibernate.property column="projectId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getProjectId() {
		return this.projectId;
	}
	
	/**
	 * Set the projectId
	 */	
	public void setProjectId(Long aValue) {
		this.projectId = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="projectName" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getProjectName() {
		return this.projectName;
	}
	
	/**
	 * Set the projectName
	 */	
	public void setProjectName(String aValue) {
		this.projectName = aValue;
	}	

	/**
	 * 	 * @return Short
	 * @hibernate.property column="creditType" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCreditType() {
		return this.creditType;
	}
	
	/**
	 * Set the creditType
	 */	
	public void setCreditType(Short aValue) {
		this.creditType = aValue;
	}	

	/**
	 * 使用金额	 * @return java.math.BigDecimal
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
	 * 授信类型	 * @return String
	 * @hibernate.property column="commerType" type="java.lang.String" length="16" not-null="false" unique="false"
	 */
	public String getCommerType() {
		return this.commerType;
	}
	
	/**
	 * Set the commerType
	 */	
	public void setCommerType(String aValue) {
		this.commerType = aValue;
	}	

	/**
	 * 客户主键	 * @return Long
	 * @hibernate.property column="commerId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getCommerId() {
		return this.commerId;
	}
	
	/**
	 * Set the commerId
	 */	
	public void setCommerId(Long aValue) {
		this.commerId = aValue;
	}	

	/**
	 * 状态	 * @return Short
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
		if (!(object instanceof BankCreditUserLog)) {
			return false;
		}
		BankCreditUserLog rhs = (BankCreditUserLog) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.projectId, rhs.projectId)
				.append(this.projectName, rhs.projectName)
				.append(this.creditType, rhs.creditType)
				.append(this.creditMoney, rhs.creditMoney)
				.append(this.commerType, rhs.commerType)
				.append(this.commerId, rhs.commerId)
				.append(this.status, rhs.status)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.projectId) 
				.append(this.projectName) 
				.append(this.creditType) 
				.append(this.creditMoney) 
				.append(this.commerType) 
				.append(this.commerId) 
				.append(this.status) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("projectId", this.projectId) 
				.append("projectName", this.projectName) 
				.append("creditType", this.creditType) 
				.append("creditMoney", this.creditMoney) 
				.append("commerType", this.commerType) 
				.append("commerId", this.commerId) 
				.append("status", this.status) 
				.toString();
	}



}
