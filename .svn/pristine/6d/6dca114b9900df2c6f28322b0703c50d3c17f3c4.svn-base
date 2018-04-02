package com.bankIntermediary.model;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * 
 * @author 
 * 银行中介 - 个人 - 房产信息
 */
/**
 * CsPersonHouse Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 */
@SuppressWarnings("serial")
public class CsPersonHouseIntermediary extends com.zhiwei.core.model.BaseModel {

    protected Long id;
    //-----------------------------新添字段
    public String propertyName;//楼盘名称
    public Long  housePropertyId;//楼盘性质id
    public String housePropertyName;//楼盘性质名称
    public Long houseStateId;//房屋状态id
    public  String houseStateName;//房屋状态名称
    public  Integer houseAge;//房龄
    /////---------------------------------
	protected String propertyOwner;//产权人
	protected Double floorSpace;//房屋面积（平方米）
	protected String address;//地址
	protected String isMortgage;//是否按揭 0 否 1 是
	protected Long hoseValue;//房产总之.万元
	protected Long loanMoney;//贷款余额*万元
	protected Long houseFactValue;//房产净价值*万元
	protected java.util.Date purchaseTime;//购买时间
	protected Long marketValue;//市场价值
//	protected Integer houseType;
	protected String houseType;//房子类型
	protected Long purchasePrice;//按揭商品房，全款商品房，按揭集体小产全房，全款小产全集体房，抵债房
	protected Long propertyScale;//购房面积
	protected String monthlyPayments;//月供*万元
	protected Integer loanPeriod;//贷款年限
	protected String coment1;//说明1
	protected String coment2;//说明2
	protected String coment3;//说明3
	protected Integer personId;
	protected Integer purchaseType;
	
	protected PersonIntermediary person;

	protected String isDoubleBalloon;
	protected String isSchoolDistrict;
	protected String isOverstory;
	protected String isFitment;
	
	
	

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	public Long getHousePropertyId() {
		return housePropertyId;
	}

	public void setHousePropertyId(Long housePropertyId) {
		this.housePropertyId = housePropertyId;
	}

	public String getHousePropertyName() {
		return housePropertyName;
	}

	public void setHousePropertyName(String housePropertyName) {
		this.housePropertyName = housePropertyName;
	}

	public Long getHouseStateId() {
		return houseStateId;
	}

	public void setHouseStateId(Long houseStateId) {
		this.houseStateId = houseStateId;
	}

	public String getHouseStateName() {
		return houseStateName;
	}

	public void setHouseStateName(String houseStateName) {
		this.houseStateName = houseStateName;
	}

	public Integer getHouseAge() {
		return houseAge;
	}

	public void setHouseAge(Integer houseAge) {
		this.houseAge = houseAge;
	}

	public String getIsDoubleBalloon() {
		return isDoubleBalloon;
	}

	public void setIsDoubleBalloon(String isDoubleBalloon) {
		this.isDoubleBalloon = isDoubleBalloon;
	}

	public String getIsSchoolDistrict() {
		return isSchoolDistrict;
	}

	public void setIsSchoolDistrict(String isSchoolDistrict) {
		this.isSchoolDistrict = isSchoolDistrict;
	}

	public String getIsOverstory() {
		return isOverstory;
	}

	public void setIsOverstory(String isOverstory) {
		this.isOverstory = isOverstory;
	}

	public String getIsFitment() {
		return isFitment;
	}

	public void setIsFitment(String isFitment) {
		this.isFitment = isFitment;
	}

	/**
	 * Default Empty Constructor for class CsPersonHouse
	 */
	public CsPersonHouseIntermediary () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CsPersonHouse
	 */
	public CsPersonHouseIntermediary (
		 Long in_id
        ) {
		this.setId(in_id);
    }

    

	/**
	 * 	 * @return Integer
     * @hibernate.id column="id" type="java.lang.Integer" generator-class="native"
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
	 * 所有权人	 * @return String
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

	/**
	 * 房屋面积	 * @return Double
	 * @hibernate.property column="floorSpace" type="java.lang.Double" length="22" not-null="false" unique="false"
	 */
	public Double getFloorSpace() {
		return this.floorSpace;
	}
	
	/**
	 * Set the floorSpace
	 */	
	public void setFloorSpace(Double aValue) {
		this.floorSpace = aValue;
	}	

	/**
	 * 地址	 * @return String
	 * @hibernate.property column="address" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getAddress() {
		return this.address;
	}
	
	/**
	 * Set the address
	 */	
	public void setAddress(String aValue) {
		this.address = aValue;
	}	

	/**
	 * 是否抵押	 * @return String
	 * @hibernate.property column="isMortgage" type="java.lang.String" length="255" not-null="false" unique="false"
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
	 * 房产总价值	 * @return Long
	 * @hibernate.property column="hoseValue" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getHoseValue() {
		return this.hoseValue;
	}
	
	/**
	 * Set the hoseValue
	 */	
	public void setHoseValue(Long aValue) {
		this.hoseValue = aValue;
	}	

	/**
	 * 贷款余额	 * @return Long
	 * @hibernate.property column="loanMoney" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getLoanMoney() {
		return this.loanMoney;
	}
	
	/**
	 * Set the loanMoney
	 */	
	public void setLoanMoney(Long aValue) {
		this.loanMoney = aValue;
	}	

	/**
	 * 房产现在价值	 * @return Long
	 * @hibernate.property column="houseFactValue" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getHouseFactValue() {
		return this.houseFactValue;
	}
	
	/**
	 * Set the houseFactValue
	 */	
	public void setHouseFactValue(Long aValue) {
		this.houseFactValue = aValue;
	}	

	/**
	 * 贷款时间	 * @return java.util.Date
	 * @hibernate.property column="purchaseTime" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getPurchaseTime() {
		return this.purchaseTime;
	}
	
	/**
	 * Set the purchaseTime
	 */	
	public void setPurchaseTime(java.util.Date aValue) {
		this.purchaseTime = aValue;
	}	

	/**
	 * 市场价值	 * @return Long
	 * @hibernate.property column="marketValue" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getMarketValue() {
		return this.marketValue;
	}
	
	/**
	 * Set the marketValue
	 */	
	public void setMarketValue(Long aValue) {
		this.marketValue = aValue;
	}	

	/**
	 * 房屋类型	 * @return Integer
	 * @hibernate.property column="houseType" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public String getHouseType() {
		return this.houseType;
	}
	
	/**
	 * Set the houseType
	 */	
	public void setHouseType(String aValue) {
		this.houseType = aValue;
	}	

	/**
	 * 购房单价	 * @return Long
	 * @hibernate.property column="purchasePrice" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getPurchasePrice() {
		return this.purchasePrice;
	}
	
	/**
	 * Set the purchasePrice
	 */	
	public void setPurchasePrice(Long aValue) {
		this.purchasePrice = aValue;
	}	

	/**
	 * 产权比例	 * @return Long
	 * @hibernate.property column="propertyScale" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getPropertyScale() {
		return this.propertyScale;
	}
	
	/**
	 * Set the propertyScale
	 */	
	public void setPropertyScale(Long aValue) {
		this.propertyScale = aValue;
	}	

	/**
	 * 月供	 * @return String
	 * @hibernate.property column="monthlyPayments" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getMonthlyPayments() {
		return this.monthlyPayments;
	}
	
	/**
	 * Set the monthlyPayments
	 */	
	public void setMonthlyPayments(String aValue) {
		this.monthlyPayments = aValue;
	}	

	/**
	 * 贷款年限	 * @return Integer
	 * @hibernate.property column="loanPeriod" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getLoanPeriod() {
		return this.loanPeriod;
	}
	
	/**
	 * Set the loanPeriod
	 */	
	public void setLoanPeriod(Integer aValue) {
		this.loanPeriod = aValue;
	}	

	/**
	 * 注释1	 * @return String
	 * @hibernate.property column="coment1" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getComent1() {
		return this.coment1;
	}
	
	/**
	 * Set the coment1
	 */	
	public void setComent1(String aValue) {
		this.coment1 = aValue;
	}	

	/**
	 * 注释2	 * @return String
	 * @hibernate.property column="coment2" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getComent2() {
		return this.coment2;
	}
	
	/**
	 * Set the coment2
	 */	
	public void setComent2(String aValue) {
		this.coment2 = aValue;
	}	

	/**
	 * 注释3	 * @return String
	 * @hibernate.property column="coment3" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getComent3() {
		return this.coment3;
	}
	
	/**
	 * Set the coment3
	 */	
	public void setComent3(String aValue) {
		this.coment3 = aValue;
	}	

	/**
	 * 关联personId	 * @return Integer
	 * @hibernate.property column="personId" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
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
	 * 购房方式	 * @return Integer
	 * @hibernate.property column="purchaseType" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getPurchaseType() {
		return this.purchaseType;
	}
	
	/**
	 * Set the purchaseType
	 */	
	public void setPurchaseType(Integer aValue) {
		this.purchaseType = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CsPersonHouseIntermediary)) {
			return false;
		}
		CsPersonHouseIntermediary rhs = (CsPersonHouseIntermediary) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.propertyOwner, rhs.propertyOwner)
				.append(this.floorSpace, rhs.floorSpace)
				.append(this.address, rhs.address)
				.append(this.isMortgage, rhs.isMortgage)
				.append(this.hoseValue, rhs.hoseValue)
				.append(this.loanMoney, rhs.loanMoney)
				.append(this.houseFactValue, rhs.houseFactValue)
				.append(this.purchaseTime, rhs.purchaseTime)
				.append(this.marketValue, rhs.marketValue)
				.append(this.houseType, rhs.houseType)
				.append(this.purchasePrice, rhs.purchasePrice)
				.append(this.propertyScale, rhs.propertyScale)
				.append(this.monthlyPayments, rhs.monthlyPayments)
				.append(this.loanPeriod, rhs.loanPeriod)
				.append(this.coment1, rhs.coment1)
				.append(this.coment2, rhs.coment2)
				.append(this.coment3, rhs.coment3)
				.append(this.personId, rhs.personId)
				.append(this.purchaseType, rhs.purchaseType)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.propertyOwner) 
				.append(this.floorSpace) 
				.append(this.address) 
				.append(this.isMortgage) 
				.append(this.hoseValue) 
				.append(this.loanMoney) 
				.append(this.houseFactValue) 
				.append(this.purchaseTime) 
				.append(this.marketValue) 
				.append(this.houseType) 
				.append(this.purchasePrice) 
				.append(this.propertyScale) 
				.append(this.monthlyPayments) 
				.append(this.loanPeriod) 
				.append(this.coment1) 
				.append(this.coment2) 
				.append(this.coment3) 
				.append(this.personId) 
				.append(this.purchaseType) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("propertyOwner", this.propertyOwner) 
				.append("floorSpace", this.floorSpace) 
				.append("address", this.address) 
				.append("isMortgage", this.isMortgage) 
				.append("hoseValue", this.hoseValue) 
				.append("loanMoney", this.loanMoney) 
				.append("houseFactValue", this.houseFactValue) 
				.append("purchaseTime", this.purchaseTime) 
				.append("marketValue", this.marketValue) 
				.append("houseType", this.houseType) 
				.append("purchasePrice", this.purchasePrice) 
				.append("propertyScale", this.propertyScale) 
				.append("monthlyPayments", this.monthlyPayments) 
				.append("loanPeriod", this.loanPeriod) 
				.append("coment1", this.coment1) 
				.append("coment2", this.coment2) 
				.append("coment3", this.coment3) 
				.append("personId", this.personId) 
				.append("purchaseType", this.purchaseType) 
				.toString();
	}

	public PersonIntermediary getPerson() {
		return person;
	}

	public void setPerson(PersonIntermediary person) {
		this.person = person;
	}



}
