package com.bankIntermediary.model;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.Date;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * 
 * @author 
 * 银行中介 - 个人 - 车辆信息
 */
/**
 * CsPersonCar Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 */
@SuppressWarnings("serial")
public class CsPersonCarIntermediary extends com.zhiwei.core.model.BaseModel {

    protected Long id;
//	protected Long personId;
	protected String carSystemType;
	protected String carType;//车型
	protected String isMortgage;//是否按揭
	protected java.math.BigDecimal newCarValue;//新车价格.万元
	protected java.math.BigDecimal loanMoney;//贷款余额.万元
	protected java.math.BigDecimal carFactValue;//车辆净价值.万元
	protected String yearOfCarUse;//使用年限
	protected java.math.BigDecimal finalCertificationPrice;//市场评估价值.万元
	protected String propertyOwner;//所有人
	protected String carLicenseNumber;//车牌号
	protected PersonIntermediary person;
	public  java.math.BigDecimal numOfKilometers;//形成公里数
	public  Date  buyDate;//买车年份
	public   java.math.BigDecimal bareCarPrices;//裸车价格

	/**
	 * Default Empty Constructor for class CsPersonCar
	 */
	public CsPersonCarIntermediary () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CsPersonCar
	 */
	public CsPersonCarIntermediary (
		 Long in_id
        ) {
		this.setId(in_id);
    }

    

	public java.math.BigDecimal getNumOfKilometers() {
		return numOfKilometers;
	}

	public void setNumOfKilometers(java.math.BigDecimal numOfKilometers) {
		this.numOfKilometers = numOfKilometers;
	}

	public Date getBuyDate() {
		return buyDate;
	}

	public void setBuyDate(Date buyDate) {
		this.buyDate = buyDate;
	}

	public java.math.BigDecimal getBareCarPrices() {
		return bareCarPrices;
	}

	public void setBareCarPrices(java.math.BigDecimal bareCarPrices) {
		this.bareCarPrices = bareCarPrices;
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
	 * 	 * @return Long
	 * @hibernate.property column="personId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
//	public Long getPersonId() {
//		return this.personId;
//	}
//	
//	/**
//	 * Set the personId
//	 */	
//	public void setPersonId(Long aValue) {
//		this.personId = aValue;
//	}	

	public PersonIntermediary getPerson() {
		return person;
	}

	public void setPerson(PersonIntermediary person) {
		this.person = person;
	}
	
	public Integer getPersonId(){
		return this.getPerson()==null?null:this.getPerson().getId();
	}
	
	public void setPersonId(Integer aValue){
		if(aValue==null){
			person = null;
		}else if(person == null){
			person = new PersonIntermediary(aValue);
		}else{
			person.setId(aValue);
		}
	}
	
	/**
	 * 	 * @return String
	 * @hibernate.property column="carSystemType" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getCarSystemType() {
		return this.carSystemType;
	}
	
	/**
	 * Set the carSystemType
	 */	
	public void setCarSystemType(String aValue) {
		this.carSystemType = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="carType" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getCarType() {
		return this.carType;
	}
	
	/**
	 * Set the carType
	 */	
	public void setCarType(String aValue) {
		this.carType = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="isMortgage" type="java.lang.String" length="1" not-null="false" unique="false"
	 */
	public String getIsMortgage() {
		return this.isMortgage;
	}
	
	/**
	 * Set the isMortgage
	 */	
	public void setIsMortgage(String aValue) {
		this.isMortgage = aValue;
	}	

	/**
	 * 	 * @return java.math.BigDecimal
	 * @hibernate.property column="newCarValue" type="java.math.BigDecimal" length="20" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getNewCarValue() {
		return this.newCarValue;
	}
	
	/**
	 * Set the newCarValue
	 */	
	public void setNewCarValue(java.math.BigDecimal aValue) {
		this.newCarValue = aValue;
	}	

	/**
	 * 	 * @return java.math.BigDecimal
	 * @hibernate.property column="loanMoney" type="java.math.BigDecimal" length="20" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getLoanMoney() {
		return this.loanMoney;
	}
	
	/**
	 * Set the loanMoney
	 */	
	public void setLoanMoney(java.math.BigDecimal aValue) {
		this.loanMoney = aValue;
	}	

	/**
	 * 	 * @return java.math.BigDecimal
	 * @hibernate.property column="carFactValue" type="java.math.BigDecimal" length="20" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getCarFactValue() {
		return this.carFactValue;
	}
	
	/**
	 * Set the carFactValue
	 */	
	public void setCarFactValue(java.math.BigDecimal aValue) {
		this.carFactValue = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="yearOfCarUse" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getYearOfCarUse() {
		return this.yearOfCarUse;
	}
	
	/**
	 * Set the yearOfCarUse
	 */	
	public void setYearOfCarUse(String aValue) {
		this.yearOfCarUse = aValue;
	}	

	/**
	 * 	 * @return java.math.BigDecimal
	 * @hibernate.property column="finalCertificationPrice" type="java.math.BigDecimal" length="20" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getFinalCertificationPrice() {
		return this.finalCertificationPrice;
	}
	
	/**
	 * Set the finalCertificationPrice
	 */	
	public void setFinalCertificationPrice(java.math.BigDecimal aValue) {
		this.finalCertificationPrice = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="propertyOwner" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getPropertyOwner() {
		return this.propertyOwner;
	}
	
	/**
	 * Set the propertyOwner
	 */	
	public void setPropertyOwner(String aValue) {
		this.propertyOwner = aValue;
	}	

	
	public String getCarLicenseNumber() {
		return carLicenseNumber;
	}

	public void setCarLicenseNumber(String carLicenseNumber) {
		this.carLicenseNumber = carLicenseNumber;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CsPersonCarIntermediary)) {
			return false;
		}
		CsPersonCarIntermediary rhs = (CsPersonCarIntermediary) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.carSystemType, rhs.carSystemType)
				.append(this.carType, rhs.carType)
				.append(this.isMortgage, rhs.isMortgage)
				.append(this.newCarValue, rhs.newCarValue)
				.append(this.loanMoney, rhs.loanMoney)
				.append(this.carFactValue, rhs.carFactValue)
				.append(this.yearOfCarUse, rhs.yearOfCarUse)
				.append(this.finalCertificationPrice, rhs.finalCertificationPrice)
				.append(this.propertyOwner, rhs.propertyOwner)
				.append(this.carLicenseNumber, rhs.carLicenseNumber)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.carSystemType) 
				.append(this.carType) 
				.append(this.isMortgage) 
				.append(this.newCarValue) 
				.append(this.loanMoney) 
				.append(this.carFactValue) 
				.append(this.yearOfCarUse) 
				.append(this.finalCertificationPrice) 
				.append(this.propertyOwner) 
				.append(this.carLicenseNumber) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("carSystemType", this.carSystemType) 
				.append("carType", this.carType) 
				.append("isMortgage", this.isMortgage) 
				.append("newCarValue", this.newCarValue) 
				.append("loanMoney", this.loanMoney) 
				.append("carFactValue", this.carFactValue) 
				.append("yearOfCarUse", this.yearOfCarUse) 
				.append("finalCertificationPrice", this.finalCertificationPrice) 
				.append("propertyOwner", this.propertyOwner) 
				.append("carLicenseNumber", this.carLicenseNumber) 
				.toString();
	}



}
