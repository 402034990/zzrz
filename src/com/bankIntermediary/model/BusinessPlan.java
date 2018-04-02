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


public class   BusinessPlan   extends BaseModel  implements  java.io.Serializable  {
	
	
	
	public  Long  id;//	标主键
	public  Long projectId;//	项目id
	public Long productId;//	产品id
	public Long institutionalId;//	合作机构id
	public String remark;//	备注
	public Short state;//	办理状态
	public  Long institutionalAccountManager;//	机构客户经理
	public  java.math.BigDecimal projectMoney;//	借款金额
	public  java.util.Date incomeDate;//	进件日期
	public  java.util.Date approvalDate;//	审批日期
	public  java.util.Date loanDate;//	放款日期
	public  java.math.BigDecimal loanMoney;//放款金额
	public  java.util.Date createtime;//	创建时间

 
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Long getInstitutionalId() {
		return institutionalId;
	}

	public void setInstitutionalId(Long institutionalId) {
		this.institutionalId = institutionalId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Short getState() {
		return state;
	}

	public void setState(Short state) {
		this.state = state;
	}

	public Long getInstitutionalAccountManager() {
		return institutionalAccountManager;
	}

	public void setInstitutionalAccountManager(Long institutionalAccountManager) {
		this.institutionalAccountManager = institutionalAccountManager;
	}

	public java.math.BigDecimal getProjectMoney() {
		return projectMoney;
	}

	public void setProjectMoney(java.math.BigDecimal projectMoney) {
		this.projectMoney = projectMoney;
	}

	public java.util.Date getIncomeDate() {
		return incomeDate;
	}

	public void setIncomeDate(java.util.Date incomeDate) {
		this.incomeDate = incomeDate;
	}

	public java.util.Date getApprovalDate() {
		return approvalDate;
	}

	public void setApprovalDate(java.util.Date approvalDate) {
		this.approvalDate = approvalDate;
	}

	public java.util.Date getLoanDate() {
		return loanDate;
	}

	public void setLoanDate(java.util.Date loanDate) {
		this.loanDate = loanDate;
	}

	public java.math.BigDecimal getLoanMoney() {
		return loanMoney;
	}

	public void setLoanMoney(java.math.BigDecimal loanMoney) {
		this.loanMoney = loanMoney;
	}

	public java.util.Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(java.util.Date createtime) {
		this.createtime = createtime;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BusinessPlan)) {
			return false;
		}
		BusinessPlan rhs = (BusinessPlan) object;
		return new EqualsBuilder()
			.append(this.id, rhs.id)
			.append(this.projectId, rhs.projectId)
			.append(this.productId, rhs.productId)
			.append(this.institutionalId, rhs.institutionalId)
			.append(this.remark, rhs.remark)
			.append(this.state, rhs.state)
			.append(this.projectMoney, rhs.projectMoney)
			.append(this.institutionalAccountManager, rhs.institutionalAccountManager)
			.append(this.incomeDate, rhs.incomeDate)
			.append(this.approvalDate, rhs.approvalDate)
			.append(this.loanDate, rhs.loanDate)
			.append(this.loanMoney, rhs.loanMoney)
			.append(this.createtime, rhs.createtime)
			.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
			.append(this.id) 
			.append(this.projectId) 
			.append(this.productId) 
			.append(this.remark) 
			.append(this.institutionalId) 
			.append(this.state) 
			.append(this.projectMoney) 
			.append(this.institutionalAccountManager) 
			.append(this.incomeDate) 
			.append(this.approvalDate) 
			.append(this.loanDate) 
			.append(this.loanMoney) 
			.append(this.createtime) 
			.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("projectId", this.projectId) 
				.append("productId", this.productId) 
				.append("remark", this.remark) 
				.append("institutionalId", this.institutionalId) 
				.append("state", this.state)
				.append("projectMoney", this.projectMoney) 
				.append("institutionalAccountManager", this.institutionalAccountManager) 
				.append("incomeDate", this.incomeDate) 
				.append("approvalDate", this.approvalDate) 
				.append("loanDate", this.loanDate) 
				.append("loanMoney", this.loanMoney) 
				.append("createtime", this.createtime) 
				.toString();
	}
 
}