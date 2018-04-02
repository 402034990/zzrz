package com.zhiwei.credit.model.creditFlow.gps;
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
 * CsGps Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class CsGps extends com.zhiwei.core.model.BaseModel {

    protected Long id;
	protected Long projectId;
	protected Long mortgageId;
	protected String isgps;
	protected String handlePerson;
	protected java.util.Date handleDate;
	protected String gpsModel;
	protected String remark;
	protected String imei;
	protected String gpsState;
	/**
	 * Default Empty Constructor for class CsGps
	 */
	public CsGps () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CsGps
	 */
	public CsGps (
		 Long in_id
        ) {
		this.setId(in_id);
    }

    

	public String getGpsState() {
		return gpsState;
	}

	public void setGpsState(String gpsState) {
		this.gpsState = gpsState;
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

	public String getImei() {
		return imei;
	}

	public void setImei(String imei) {
		this.imei = imei;
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
	 * 	 * @return Long
	 * @hibernate.property column="mortgageId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getMortgageId() {
		return this.mortgageId;
	}
	
	/**
	 * Set the mortgageId
	 */	
	public void setMortgageId(Long aValue) {
		this.mortgageId = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="isgps" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getIsgps() {
		return this.isgps;
	}
	
	/**
	 * Set the isgps
	 */	
	public void setIsgps(String aValue) {
		this.isgps = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="handlePerson" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getHandlePerson() {
		return this.handlePerson;
	}
	
	/**
	 * Set the handlePerson
	 */	
	public void setHandlePerson(String aValue) {
		this.handlePerson = aValue;
	}	

	/**
	 * 	 * @return java.util.Date
	 * @hibernate.property column="handleDate" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getHandleDate() {
		return this.handleDate;
	}
	
	/**
	 * Set the handleDate
	 */	
	public void setHandleDate(java.util.Date aValue) {
		this.handleDate = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="gpsModel" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getGpsModel() {
		return this.gpsModel;
	}
	
	/**
	 * Set the gpsModel
	 */	
	public void setGpsModel(String aValue) {
		this.gpsModel = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="remark" type="java.lang.String" length="255" not-null="false" unique="false"
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
		if (!(object instanceof CsGps)) {
			return false;
		}
		CsGps rhs = (CsGps) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.projectId, rhs.projectId)
				.append(this.mortgageId, rhs.mortgageId)
				.append(this.isgps, rhs.isgps)
				.append(this.handlePerson, rhs.handlePerson)
				.append(this.handleDate, rhs.handleDate)
				.append(this.gpsModel, rhs.gpsModel)
				.append(this.remark, rhs.remark)
				.append(this.imei, rhs.imei)
				.append(this.gpsState, rhs.gpsState)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.projectId) 
				.append(this.mortgageId) 
				.append(this.isgps) 
				.append(this.handlePerson) 
				.append(this.handleDate) 
				.append(this.gpsModel) 
				.append(this.remark) 
				.append(this.imei) 
				.append(this.gpsState) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("projectId", this.projectId) 
				.append("mortgageId", this.mortgageId) 
				.append("isgps", this.isgps) 
				.append("handlePerson", this.handlePerson) 
				.append("handleDate", this.handleDate) 
				.append("gpsModel", this.gpsModel) 
				.append("remark", this.remark) 
				.append("imei", this.imei)
				.append("gpsState", this.gpsState)
				.toString();
	}

}
