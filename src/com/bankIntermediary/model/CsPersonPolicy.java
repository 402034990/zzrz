package com.bankIntermediary.model;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.math.BigDecimal;
import java.util.Date;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhiwei.core.model.BaseModel;


@SuppressWarnings("serial")
public class CsPersonPolicy  extends BaseModel  implements  java.io.Serializable  {
	 
	public  Long  id;//	表主键
	public  String insurerName;//	保险人名称
	public  String insureCompany;//	保险公司
	public Integer paymentYear;//	已缴费年份
	public BigDecimal moneyOfYear	;//年缴费金额
	public  Long personId;//	借款人id
	public  java.util.Date createtime;//	创建时间 
	public  Short state;//	状态



	public boolean equals(Object object) {
		if (!(object instanceof CsPersonPolicy)) {
			return false;
		}
		CsPersonPolicy rhs = (CsPersonPolicy) object;
		return new EqualsBuilder()
		.append(this.id, rhs.id)
		.append(this.insurerName, rhs.insurerName)
		.append(this.insureCompany, rhs.insureCompany)
		.append(this.paymentYear, rhs.paymentYear)
		.append(this.moneyOfYear, rhs.moneyOfYear)
		.append(this.personId, rhs.personId)
		.append(this.createtime, rhs.createtime)
		.append(this.state, rhs.state)
		.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
		.append(this.insurerName) 
		.append(this.id  ) 
		.append(this.insureCompany) 
		.append(this.paymentYear) 
		.append(this.moneyOfYear) 
		.append(this.personId) 
		.append(this.createtime) 
		.append(this.state) 
		.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
		.append("insurerName", this.insurerName) 
		.append("id", this.id) 
		.append("insureCompany", this.insureCompany) 
		.append("paymentYear", this.paymentYear) 
		.append("moneyOfYear", this.moneyOfYear) 
		.append("personId", this.personId)
		.append("createtime", this.createtime) 
		.append("state", this.state) 
		.toString();
	}

	
	 
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getInsurerName() {
		return insurerName;
	}

	public void setInsurerName(String insurerName) {
		this.insurerName = insurerName;
	}

	public String getInsureCompany() {
		return insureCompany;
	}

	public void setInsureCompany(String insureCompany) {
		this.insureCompany = insureCompany;
	}

	public Integer getPaymentYear() {
		return paymentYear;
	}

	public void setPaymentYear(Integer paymentYear) {
		this.paymentYear = paymentYear;
	}

	public BigDecimal getMoneyOfYear() {
		return moneyOfYear;
	}

	public void setMoneyOfYear(BigDecimal moneyOfYear) {
		this.moneyOfYear = moneyOfYear;
	}

	public Long getPersonId() {
		return personId;
	}

	public void setPersonId(Long personId) {
		this.personId = personId;
	}

	public java.util.Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(java.util.Date createtime) {
		this.createtime = createtime;
	}

	public Short getState() {
		return state;
	}

	public void setState(Short state) {
		this.state = state;
	}
	 
}