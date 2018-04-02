package com.bankIntermediary.model;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.math.BigDecimal;
//import java.util.Date;
//
//import org.apache.commons.lang.builder.EqualsBuilder;
//import org.apache.commons.lang.builder.HashCodeBuilder;
//import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhiwei.core.model.BaseModel;


@SuppressWarnings("serial")
public class CooperativeOrganization  extends BaseModel  implements  java.io.Serializable  {
	public CooperativeOrganization() {
		super();
	}
	public  Long id	;// 表主键
	public  String organizationName;//	机构名称
	public  Short  orgTypeId;//	机构类型id
	public  String orgTypeName;//	机构类型名称
	public  Short orgSourceId;//	机构来源id
	public  String  orgSourceName;//	机构来源名称
	public  String  busnessLicense;//	营业执照号码
	public  String  orgCode;//	组织机构号码
	public  String 	orgPhone;//	公司电话
	public  String  fax;//	传真
	protected BigDecimal orgCapital;//	注册资本
	public  java.util.Date buildDate;//	公司成立日期
	public  java.util.Date	beginTime	;//合作公司开始时间
	public  String   adress;//公司地址
	public  Short  commissionTypeId;//	渠道佣金类型id
	public  String   commissionTypeName	;//渠道佣金类型名称
	protected BigDecimal commissionRate;//	渠道佣金利率
	public  String  comProfile;//	公司简介
	public  String comLinker;//	公司联系人
	public  Short  sex;//	性别 0 女 1 男
	public  String  linkerTel	;//联系人电话
	public  String  appellation;//	称谓
	public  String email;//	邮箱
	public  String 	cardId;//	身份证号码
	public  java.util.Date createtime;//	创建时间
	public  Long operationId	;//操作人id
	public  String	operationName;//	操作人姓名
	
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getOrganizationName() {
		return organizationName;
	}
	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}
	public Short getOrgTypeId() {
		return orgTypeId;
	}
	public void setOrgTypeId(Short orgTypeId) {
		this.orgTypeId = orgTypeId;
	}
	public String getOrgTypeName() {
		return orgTypeName;
	}
	public void setOrgTypeName(String orgTypeName) {
		this.orgTypeName = orgTypeName;
	}
	public Short getOrgSourceId() {
		return orgSourceId;
	}
	public void setOrgSourceId(Short orgSourceId) {
		this.orgSourceId = orgSourceId;
	}
	public String getOrgSourceName() {
		return orgSourceName;
	}
	public void setOrgSourceName(String orgSourceName) {
		this.orgSourceName = orgSourceName;
	}
	public String getBusnessLicense() {
		return busnessLicense;
	}
	public void setBusnessLicense(String busnessLicense) {
		this.busnessLicense = busnessLicense;
	}
	public String getOrgCode() {
		return orgCode;
	}
	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}
	public String getOrgPhone() {
		return orgPhone;
	}
	public void setOrgPhone(String orgPhone) {
		this.orgPhone = orgPhone;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public BigDecimal getOrgCapital() {
		return orgCapital;
	}
	public void setOrgCapital(BigDecimal orgCapital) {
		this.orgCapital = orgCapital;
	}
	public java.util.Date getBuildDate() {
		return buildDate;
	}
	public void setBuildDate(java.util.Date buildDate) {
		this.buildDate = buildDate;
	}
	public java.util.Date getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(java.util.Date beginTime) {
		this.beginTime = beginTime;
	}
	public String getAdress() {
		return adress;
	}
	public void setAdress(String adress) {
		this.adress = adress;
	}
	public Short getCommissionTypeId() {
		return commissionTypeId;
	}
	public void setCommissionTypeId(Short commissionTypeId) {
		this.commissionTypeId = commissionTypeId;
	}
	public String getCommissionTypeName() {
		return commissionTypeName;
	}
	public void setCommissionTypeName(String commissionTypeName) {
		this.commissionTypeName = commissionTypeName;
	}
	public BigDecimal getCommissionRate() {
		return commissionRate;
	}
	public void setCommissionRate(BigDecimal commissionRate) {
		this.commissionRate = commissionRate;
	}
	public String getComProfile() {
		return comProfile;
	}
	public void setComProfile(String comProfile) {
		this.comProfile = comProfile;
	}
	public String getComLinker() {
		return comLinker;
	}
	public void setComLinker(String comLinker) {
		this.comLinker = comLinker;
	}
	public Short getSex() {
		return sex;
	}
	public void setSex(Short sex) {
		this.sex = sex;
	}
	public String getLinkerTel() {
		return linkerTel;
	}
	public void setLinkerTel(String linkerTel) {
		this.linkerTel = linkerTel;
	}
	public String getAppellation() {
		return appellation;
	}
	public void setAppellation(String appellation) {
		this.appellation = appellation;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCardId() {
		return cardId;
	}
	public void setCardId(String cardId) {
		this.cardId = cardId;
	}
	public java.util.Date getCreatetime() {
		return createtime;
	}
	public void setCreatetime(java.util.Date createtime) {
		this.createtime = createtime;
	}
	public Long getOperationId() {
		return operationId;
	}
	public void setOperationId(Long operationId) {
		this.operationId = operationId;
	}
	public String getOperationName() {
		return operationName;
	}
	public void setOperationName(String operationName) {
		this.operationName = operationName;
	}

	 
}