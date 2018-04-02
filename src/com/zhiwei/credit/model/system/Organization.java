package com.zhiwei.credit.model.system;
/*
 *  北京互融时代软件有限公司    -- http://www.hurongtime.com
 *  Copyright (C) 2008-2011 JinZhi WanWei Software Limited company.
*/
import java.math.BigDecimal;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.google.gson.annotations.Expose;

import flexjson.JSON;

/**
 * Organization Base Java Bean, base class for the.est.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class Organization extends com.zhiwei.core.model.BaseModel {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public final static Long PUBLIC_COMPANY_ID=new Long(-1);
	
	/**
	 * 集团
	 */
	public final static Short ORG_TYPE_GROUP=0;
	/**
	 * 公司
	 */
	public final static Short ORG_TYPE_COMPANY=1;
	/**
	 * 部门
	 */
	public final static Short ORG_TYPE_DEPARTMENT=2;
	/**
	 * 其他组织
	 */
	public final static Short ORG_TYPE_ORTHER_ORG=3;

	@Expose
	protected Long demId;
	@Expose
	protected String orgName;
	@Expose
	protected String orgDesc;
	@Expose
	protected Long orgSupId;
	@Expose
	protected String path;
	@Expose
	protected Long depth;
	@Expose
	protected String key;
	@Expose
	protected Short orgType;
	@Expose
	protected Long creatorId;
	@Expose
	protected java.util.Date createtime;
	@Expose
	protected Long updateId;
	@Expose
	protected java.util.Date updatetime;
	protected com.zhiwei.credit.model.system.Demension demension;
	
	protected Short delFlag; //0禁用 1激活
	
	@Expose
	protected String linkman; //分公司联系人
	
	@Expose
	protected String linktel; //分公司联系人电话
	
	@Expose
	protected String address; //分公司地址
	
	@Expose
	protected String fax; //分公司传真
	
	@Expose
	protected String postCode;
	
	@Expose
	protected String acronym; //分公司缩写 只有分公司有
	
	@Expose
	protected String branchNO;// 代理商编号
	
	protected Integer equityRelationship;

	protected Integer trusteeshipMode;
	@Expose
	protected BigDecimal capital;
	
	protected String vmName;//vm的访问名称和-分公司名称一致。分公司名称修改了该值也不修改。
	@Expose
	protected java.util.Date foundingTime;//成立时间
	@Expose
	protected String shopPhone;//门店电话
	//新加字段 add BY zzw
	private BigDecimal creditLines;//授信额度
	private BigDecimal securityDeposit;//保证金比例
	private String agentName;//代理商名称
	private String organizecode;//组织结构代码
	private String cciaa;//营业执照
	private String taxnum;//税务登记号
	private String telephone;//代理商联系电话
	private Short documentType;//代理商证件类型
	private String factaddress;//代理商地址
	private String postcoding;//代理商所在地邮政编码
	private String legalpersonName;//代理商法人
	private Integer legalpersonid;//代理商法人ID
	private String selfemail;//法人邮箱
	private Short legalpersonCardType;//法人证件类型
	private String cardnumber;//法人证件号
	private String cellphone;//法人电话
	private String legalpersonSex;//法人性别
	private BigDecimal userdCreditLines;//已用授信额度
	private BigDecimal notUsedCreditLines;//剩余授信额度
	private BigDecimal sumBailMoney;//保证金金额
	private BigDecimal usedBailMoney;//已用保证金金额
	private BigDecimal notUsedBailMoney;//剩余保证金金额
	public String getShopPhone() {
		return shopPhone;
	}

	public void setShopPhone(String shopPhone) {
		this.shopPhone = shopPhone;
	}

	public java.util.Date getFoundingTime() {
		return foundingTime;
	}

	public void setFoundingTime(java.util.Date foundingTime) {
		this.foundingTime = foundingTime;
	}

	public BigDecimal getCapital() {
		return capital;
	}

	public void setCapital(BigDecimal capital) {
		this.capital = capital;
	}

	public Short getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Short delFlag) {
		this.delFlag = delFlag;
	}

	public Integer getEquityRelationship() {
		return equityRelationship;
	}

	public void setEquityRelationship(Integer equityRelationship) {
		this.equityRelationship = equityRelationship;
	}

	public Integer getTrusteeshipMode() {
		return trusteeshipMode;
	}

	public void setTrusteeshipMode(Integer trusteeshipMode) {
		this.trusteeshipMode = trusteeshipMode;
	}

	public String getAcronym() {
		return acronym;
	}

	public void setAcronym(String acronym) {
		this.acronym = acronym;
	}

	public String getBranchNO() {
		return branchNO;
	}

	public void setBranchNO(String branchNO) {
		this.branchNO = branchNO;
	}

	public String getPostCode() {
		return postCode;
	}

	public void setPostCode(String postCode) {
		this.postCode = postCode;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getLinkman() {
		return linkman;
	}

	public void setLinkman(String linkman) {
		this.linkman = linkman;
	}

	public String getLinktel() {
		return linktel;
	}

	public void setLinktel(String linktel) {
		this.linktel = linktel;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	protected java.util.Set appUsers = new java.util.HashSet();
	protected java.util.Set userOrgs = new java.util.HashSet();

	protected String chargeUser;
	

	public String getChargeUser() {
		return chargeUser;
	}

	public void setChargeUser(String chargeUser) {
		this.chargeUser = chargeUser;
	}

	/**
	 * Default Empty Constructor for class Organization
	 */
	public Organization () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class Organization
	 */
	public Organization (
		 Long in_orgId
        ) {
		this.setOrgId(in_orgId);
    }

	@JSON(include=false)
	public com.zhiwei.credit.model.system.Demension getDemension () {
		return demension;
	}	
	
	public void setDemension (com.zhiwei.credit.model.system.Demension in_demension) {
		this.demension = in_demension;
	}
	@JSON(include=false)
	public java.util.Set getAppUsers () {
		return appUsers;
	}	
	
	public void setAppUsers (java.util.Set in_appUsers) {
		this.appUsers = in_appUsers;
	}
	@JSON(include=false)
	public java.util.Set getUserOrgs () {
		return userOrgs;
	}	
	
	public void setUserOrgs (java.util.Set in_userOrgs) {
		this.userOrgs = in_userOrgs;
	}
    

	/**
	 * 	 * @return Long
     * @hibernate.id column="ORG_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getOrgId() {
		return this.orgId;
	}
	
	/**
	 * Set the orgId
	 */	
	public void setOrgId(Long aValue) {
		this.orgId = aValue;
	}	

	/**
	 * 	 * @return Long
	 */
	public Long getDemId() {
		return this.getDemension()==null?null:this.getDemension().getDemId();
	}
	
	/**
	 * Set the demId
	 */	
	public void setDemId(Long aValue) {
	    if (aValue==null) {
	    	demension = null;
	    } else if (demension == null) {
	        demension = new com.zhiwei.credit.model.system.Demension(aValue);
	        demension.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			demension.setDemId(aValue);
	    }
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="ORG_NAME" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getOrgName() {
		return this.orgName;
	}
	
	/**
	 * Set the orgName
	 * @spring.validator type="required"
	 */	
	public void setOrgName(String aValue) {
		this.orgName = aValue;
	}	
	
	

	public String getOrgDesc() {
		return orgDesc;
	}

	public void setOrgDesc(String orgDesc) {
		this.orgDesc = orgDesc;
	}

	/**
	 * 	 * @return Long
	 * @hibernate.property column="ORG_SUP_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getOrgSupId() {
		return this.orgSupId;
	}
	
	/**
	 * Set the orgSupId
	 */	
	public void setOrgSupId(Long aValue) {
		this.orgSupId = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="PATH" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getPath() {
		return this.path;
	}
	
	/**
	 * Set the path
	 */	
	public void setPath(String aValue) {
		this.path = aValue;
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="DEPTH" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getDepth() {
		return this.depth;
	}
	
	/**
	 * Set the depth
	 */	
	public void setDepth(Long aValue) {
		this.depth = aValue;
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="ORG_TYPE" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Short getOrgType() {
		return this.orgType;
	}
	
	/**
	 * Set the orgType
	 */	
	public void setOrgType(Short aValue) {
		this.orgType = aValue;
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="CREATOR_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getCreatorId() {
		return this.creatorId;
	}
	
	/**
	 * Set the creatorId
	 */	
	public void setCreatorId(Long aValue) {
		this.creatorId = aValue;
	}	

	/**
	 * 	 * @return java.util.Date
	 * @hibernate.property column="CREATETIME" type="java.util.Date" length="7" not-null="false" unique="false"
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
	 * 	 * @return Long
	 * @hibernate.property column="UPDATE_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getUpdateId() {
		return this.updateId;
	}
	
	/**
	 * Set the updateId
	 */	
	public void setUpdateId(Long aValue) {
		this.updateId = aValue;
	}	

	/**
	 * 	 * @return java.util.Date
	 * @hibernate.property column="UPDATETIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getUpdatetime() {
		return this.updatetime;
	}
	
	/**
	 * Set the updatetime
	 */	
	public void setUpdatetime(java.util.Date aValue) {
		this.updatetime = aValue;
	}	

	public String getVmName() {
		return vmName;
	}

	public void setVmName(String vmName) {
		this.vmName = vmName;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof Organization)) {
			return false;
		}
		Organization rhs = (Organization) object;
		return new EqualsBuilder()
				.append(this.orgId, rhs.orgId)
						.append(this.orgName, rhs.orgName)
				.append(this.orgSupId, rhs.orgSupId)
				.append(this.path, rhs.path)
				.append(this.depth, rhs.depth)
				.append(this.orgType, rhs.orgType)
				.append(this.creatorId, rhs.creatorId)
				.append(this.createtime, rhs.createtime)
				.append(this.updateId, rhs.updateId)
				.append(this.updatetime, rhs.updatetime)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.orgId) 
						.append(this.orgName) 
				.append(this.orgSupId) 
				.append(this.path) 
				.append(this.depth) 
				.append(this.orgType) 
				.append(this.creatorId) 
				.append(this.createtime) 
				.append(this.updateId) 
				.append(this.updatetime) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("orgId", this.orgId) 
						.append("orgName", this.orgName) 
				.append("orgSupId", this.orgSupId) 
				.append("path", this.path) 
				.append("depth", this.depth) 
				.append("orgType", this.orgType) 
				.append("creatorId", this.creatorId) 
				.append("createtime", this.createtime) 
				.append("updateId", this.updateId) 
				.append("updatetime", this.updatetime) 
				.toString();
	}

	public BigDecimal getCreditLines() {
		return creditLines;
	}

	public void setCreditLines(BigDecimal creditLines) {
		this.creditLines = creditLines;
	}

	public BigDecimal getSecurityDeposit() {
		return securityDeposit;
	}

	public void setSecurityDeposit(BigDecimal securityDeposit) {
		this.securityDeposit = securityDeposit;
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	public String getOrganizecode() {
		return organizecode;
	}

	public void setOrganizecode(String organizecode) {
		this.organizecode = organizecode;
	}

	public String getCciaa() {
		return cciaa;
	}

	public void setCciaa(String cciaa) {
		this.cciaa = cciaa;
	}

	public String getTaxnum() {
		return taxnum;
	}

	public void setTaxnum(String taxnum) {
		this.taxnum = taxnum;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public Short getDocumentType() {
		return documentType;
	}

	public void setDocumentType(Short documentType) {
		this.documentType = documentType;
	}

	public String getFactaddress() {
		return factaddress;
	}

	public void setFactaddress(String factaddress) {
		this.factaddress = factaddress;
	}

	public String getPostcoding() {
		return postcoding;
	}

	public void setPostcoding(String postcoding) {
		this.postcoding = postcoding;
	}

	public String getLegalpersonName() {
		return legalpersonName;
	}

	public void setLegalpersonName(String legalpersonName) {
		this.legalpersonName = legalpersonName;
	}

	public Integer getLegalpersonid() {
		return legalpersonid;
	}

	public void setLegalpersonid(Integer legalpersonid) {
		this.legalpersonid = legalpersonid;
	}

	public String getSelfemail() {
		return selfemail;
	}

	public void setSelfemail(String selfemail) {
		this.selfemail = selfemail;
	}

	public Short getLegalpersonCardType() {
		return legalpersonCardType;
	}

	public void setLegalpersonCardType(Short legalpersonCardType) {
		this.legalpersonCardType = legalpersonCardType;
	}

	public String getCardnumber() {
		return cardnumber;
	}

	public void setCardnumber(String cardnumber) {
		this.cardnumber = cardnumber;
	}

	public String getCellphone() {
		return cellphone;
	}

	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}

	public String getLegalpersonSex() {
		return legalpersonSex;
	}

	public void setLegalpersonSex(String legalpersonSex) {
		this.legalpersonSex = legalpersonSex;
	}

	public BigDecimal getUserdCreditLines() {
		return userdCreditLines;
	}

	public void setUserdCreditLines(BigDecimal userdCreditLines) {
		this.userdCreditLines = userdCreditLines;
	}

	public BigDecimal getNotUsedCreditLines() {
		return notUsedCreditLines;
	}

	public void setNotUsedCreditLines(BigDecimal notUsedCreditLines) {
		this.notUsedCreditLines = notUsedCreditLines;
	}

	public BigDecimal getSumBailMoney() {
		return sumBailMoney;
	}

	public void setSumBailMoney(BigDecimal sumBailMoney) {
		this.sumBailMoney = sumBailMoney;
	}

	public BigDecimal getUsedBailMoney() {
		return usedBailMoney;
	}

	public void setUsedBailMoney(BigDecimal usedBailMoney) {
		this.usedBailMoney = usedBailMoney;
	}

	public BigDecimal getNotUsedBailMoney() {
		return notUsedBailMoney;
	}

	public void setNotUsedBailMoney(BigDecimal notUsedBailMoney) {
		this.notUsedBailMoney = notUsedBailMoney;
	}



}
