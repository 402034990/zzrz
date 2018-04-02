package com.zhiwei.credit.model.creditFlow.mortgage.vehicle;
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
 * BpMortgageCarSurface Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class BpMortgageCarSurface extends com.zhiwei.core.model.BaseModel {

    protected Integer id;
	protected String leftFrontWheel;
	protected String rightFrontWheel;
	protected String leftAfterWheel;
	protected String rightAfterWheel;
	protected String frontSecureBar;
	protected String leftFrontPlate;
	protected String engine;
	protected String rightFrontPlate;
	protected String leftFrontDoor;
	protected String rightFrontDoor;
	protected String leftAfterDoor;
	protected String rightAfterDoor;
	protected String leftAfterPlate;
	protected String rightAfterPlate;
	protected String afterSecureBar;
	protected Integer mortgageid;


	/**
	 * Default Empty Constructor for class BpMortgageCarSurface
	 */
	public BpMortgageCarSurface () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BpMortgageCarSurface
	 */
	public BpMortgageCarSurface (
		 Integer in_id
        ) {
		this.setId(in_id);
    }

    

	/**
	 * 	 * @return Integer
     * @hibernate.id column="id" type="java.lang.Integer" generator-class="native"
	 */
	public Integer getId() {
		return this.id;
	}
	
	/**
	 * Set the id
	 */	
	public void setId(Integer aValue) {
		this.id = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="leftFrontWheel" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getLeftFrontWheel() {
		return this.leftFrontWheel;
	}
	
	/**
	 * Set the leftFrontWheel
	 */	
	public void setLeftFrontWheel(String aValue) {
		this.leftFrontWheel = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="rightFrontWheel" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getRightFrontWheel() {
		return this.rightFrontWheel;
	}
	
	/**
	 * Set the rightFrontWheel
	 */	
	public void setRightFrontWheel(String aValue) {
		this.rightFrontWheel = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="leftAfterWheel" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getLeftAfterWheel() {
		return this.leftAfterWheel;
	}
	
	/**
	 * Set the leftAfterWheel
	 */	
	public void setLeftAfterWheel(String aValue) {
		this.leftAfterWheel = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="rightAfterWheel" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getRightAfterWheel() {
		return this.rightAfterWheel;
	}
	
	/**
	 * Set the rightAfterWheel
	 */	
	public void setRightAfterWheel(String aValue) {
		this.rightAfterWheel = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="frontSecureBar" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getFrontSecureBar() {
		return this.frontSecureBar;
	}
	
	/**
	 * Set the frontSecureBar
	 */	
	public void setFrontSecureBar(String aValue) {
		this.frontSecureBar = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="leftFrontPlate" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getLeftFrontPlate() {
		return this.leftFrontPlate;
	}
	
	/**
	 * Set the leftFrontPlate
	 */	
	public void setLeftFrontPlate(String aValue) {
		this.leftFrontPlate = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="engine" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getEngine() {
		return this.engine;
	}
	
	/**
	 * Set the engine
	 */	
	public void setEngine(String aValue) {
		this.engine = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="rightFrontPlate" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getRightFrontPlate() {
		return this.rightFrontPlate;
	}
	
	/**
	 * Set the rightFrontPlate
	 */	
	public void setRightFrontPlate(String aValue) {
		this.rightFrontPlate = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="leftFrontDoor" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getLeftFrontDoor() {
		return this.leftFrontDoor;
	}
	
	/**
	 * Set the leftFrontDoor
	 */	
	public void setLeftFrontDoor(String aValue) {
		this.leftFrontDoor = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="rightFrontDoor" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getRightFrontDoor() {
		return this.rightFrontDoor;
	}
	
	/**
	 * Set the rightFrontDoor
	 */	
	public void setRightFrontDoor(String aValue) {
		this.rightFrontDoor = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="leftAfterDoor" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getLeftAfterDoor() {
		return this.leftAfterDoor;
	}
	
	/**
	 * Set the leftAfterDoor
	 */	
	public void setLeftAfterDoor(String aValue) {
		this.leftAfterDoor = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="rightAfterDoor" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getRightAfterDoor() {
		return this.rightAfterDoor;
	}
	
	/**
	 * Set the rightAfterDoor
	 */	
	public void setRightAfterDoor(String aValue) {
		this.rightAfterDoor = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="leftAfterPlate" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getLeftAfterPlate() {
		return this.leftAfterPlate;
	}
	
	/**
	 * Set the leftAfterPlate
	 */	
	public void setLeftAfterPlate(String aValue) {
		this.leftAfterPlate = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="rightAfterPlate" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getRightAfterPlate() {
		return this.rightAfterPlate;
	}
	
	/**
	 * Set the rightAfterPlate
	 */	
	public void setRightAfterPlate(String aValue) {
		this.rightAfterPlate = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="afterSecureBar" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getAfterSecureBar() {
		return this.afterSecureBar;
	}
	
	/**
	 * Set the afterSecureBar
	 */	
	public void setAfterSecureBar(String aValue) {
		this.afterSecureBar = aValue;
	}	

	/**
	 * 	 * @return Integer
	 * @hibernate.property column="mortgageid" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getMortgageid() {
		return this.mortgageid;
	}
	
	/**
	 * Set the mortgageid
	 */	
	public void setMortgageid(Integer aValue) {
		this.mortgageid = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BpMortgageCarSurface)) {
			return false;
		}
		BpMortgageCarSurface rhs = (BpMortgageCarSurface) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.leftFrontWheel, rhs.leftFrontWheel)
				.append(this.rightFrontWheel, rhs.rightFrontWheel)
				.append(this.leftAfterWheel, rhs.leftAfterWheel)
				.append(this.rightAfterWheel, rhs.rightAfterWheel)
				.append(this.frontSecureBar, rhs.frontSecureBar)
				.append(this.leftFrontPlate, rhs.leftFrontPlate)
				.append(this.engine, rhs.engine)
				.append(this.rightFrontPlate, rhs.rightFrontPlate)
				.append(this.leftFrontDoor, rhs.leftFrontDoor)
				.append(this.rightFrontDoor, rhs.rightFrontDoor)
				.append(this.leftAfterDoor, rhs.leftAfterDoor)
				.append(this.rightAfterDoor, rhs.rightAfterDoor)
				.append(this.leftAfterPlate, rhs.leftAfterPlate)
				.append(this.rightAfterPlate, rhs.rightAfterPlate)
				.append(this.afterSecureBar, rhs.afterSecureBar)
				.append(this.mortgageid, rhs.mortgageid)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.leftFrontWheel) 
				.append(this.rightFrontWheel) 
				.append(this.leftAfterWheel) 
				.append(this.rightAfterWheel) 
				.append(this.frontSecureBar) 
				.append(this.leftFrontPlate) 
				.append(this.engine) 
				.append(this.rightFrontPlate) 
				.append(this.leftFrontDoor) 
				.append(this.rightFrontDoor) 
				.append(this.leftAfterDoor) 
				.append(this.rightAfterDoor) 
				.append(this.leftAfterPlate) 
				.append(this.rightAfterPlate) 
				.append(this.afterSecureBar) 
				.append(this.mortgageid) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("leftFrontWheel", this.leftFrontWheel) 
				.append("rightFrontWheel", this.rightFrontWheel) 
				.append("leftAfterWheel", this.leftAfterWheel) 
				.append("rightAfterWheel", this.rightAfterWheel) 
				.append("frontSecureBar", this.frontSecureBar) 
				.append("leftFrontPlate", this.leftFrontPlate) 
				.append("engine", this.engine) 
				.append("rightFrontPlate", this.rightFrontPlate) 
				.append("leftFrontDoor", this.leftFrontDoor) 
				.append("rightFrontDoor", this.rightFrontDoor) 
				.append("leftAfterDoor", this.leftAfterDoor) 
				.append("rightAfterDoor", this.rightAfterDoor) 
				.append("leftAfterPlate", this.leftAfterPlate) 
				.append("rightAfterPlate", this.rightAfterPlate) 
				.append("afterSecureBar", this.afterSecureBar) 
				.append("mortgageid", this.mortgageid) 
				.toString();
	}



}
