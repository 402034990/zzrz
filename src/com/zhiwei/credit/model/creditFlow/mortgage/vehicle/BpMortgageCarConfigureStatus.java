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
 * BpMortgageCarConfigureStatus Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class BpMortgageCarConfigureStatus extends com.zhiwei.core.model.BaseModel {

    protected Integer id;
	protected String carDoorConfigure;
	protected String siren;
	protected String instrument;
	protected String tvMonitor;
	protected String gasbag;
	protected String steeringDevice;
	protected String lockClosedDevice;
	protected String airConditioning;
	protected String brake;
	protected String electricChair;
	protected String drainageSystem;
	protected String carWindowDevice;
	protected String coolingSystem;
	protected String soundDevice;
	protected String transmissionDevice;
	protected String carLamp;
	protected String engine;
	protected Integer mortgageid;
	protected String drMirror;
	protected String machine;
	protected String driveMachine;


	/**
	 * Default Empty Constructor for class BpMortgageCarConfigureStatus
	 */
	public BpMortgageCarConfigureStatus () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BpMortgageCarConfigureStatus
	 */
	public BpMortgageCarConfigureStatus (
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
	 * @hibernate.property column="carDoorConfigure" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getCarDoorConfigure() {
		return this.carDoorConfigure;
	}
	
	/**
	 * Set the carDoorConfigure
	 */	
	public void setCarDoorConfigure(String aValue) {
		this.carDoorConfigure = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="siren" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getSiren() {
		return this.siren;
	}
	
	/**
	 * Set the siren
	 */	
	public void setSiren(String aValue) {
		this.siren = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="instrument" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getInstrument() {
		return this.instrument;
	}
	
	/**
	 * Set the instrument
	 */	
	public void setInstrument(String aValue) {
		this.instrument = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="tvMonitor" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getTvMonitor() {
		return this.tvMonitor;
	}
	
	/**
	 * Set the tvMonitor
	 */	
	public void setTvMonitor(String aValue) {
		this.tvMonitor = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="gasbag" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getGasbag() {
		return this.gasbag;
	}
	
	/**
	 * Set the gasbag
	 */	
	public void setGasbag(String aValue) {
		this.gasbag = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="steeringDevice" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getSteeringDevice() {
		return this.steeringDevice;
	}
	
	/**
	 * Set the steeringDevice
	 */	
	public void setSteeringDevice(String aValue) {
		this.steeringDevice = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="lockClosedDevice" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getLockClosedDevice() {
		return this.lockClosedDevice;
	}
	
	/**
	 * Set the lockClosedDevice
	 */	
	public void setLockClosedDevice(String aValue) {
		this.lockClosedDevice = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="airConditioning" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getAirConditioning() {
		return this.airConditioning;
	}
	
	/**
	 * Set the airConditioning
	 */	
	public void setAirConditioning(String aValue) {
		this.airConditioning = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="brake" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getBrake() {
		return this.brake;
	}
	
	/**
	 * Set the brake
	 */	
	public void setBrake(String aValue) {
		this.brake = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="electricChair" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getElectricChair() {
		return this.electricChair;
	}
	
	/**
	 * Set the electricChair
	 */	
	public void setElectricChair(String aValue) {
		this.electricChair = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="drainageSystem" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getDrainageSystem() {
		return this.drainageSystem;
	}
	
	/**
	 * Set the drainageSystem
	 */	
	public void setDrainageSystem(String aValue) {
		this.drainageSystem = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="carWindowDevice" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getCarWindowDevice() {
		return this.carWindowDevice;
	}
	
	/**
	 * Set the carWindowDevice
	 */	
	public void setCarWindowDevice(String aValue) {
		this.carWindowDevice = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="coolingSystem" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getCoolingSystem() {
		return this.coolingSystem;
	}
	
	/**
	 * Set the coolingSystem
	 */	
	public void setCoolingSystem(String aValue) {
		this.coolingSystem = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="soundDevice" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getSoundDevice() {
		return this.soundDevice;
	}
	
	/**
	 * Set the soundDevice
	 */	
	public void setSoundDevice(String aValue) {
		this.soundDevice = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="transmissionDevice" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getTransmissionDevice() {
		return this.transmissionDevice;
	}
	
	/**
	 * Set the transmissionDevice
	 */	
	public void setTransmissionDevice(String aValue) {
		this.transmissionDevice = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="carLamp" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getCarLamp() {
		return this.carLamp;
	}
	
	/**
	 * Set the carLamp
	 */	
	public void setCarLamp(String aValue) {
		this.carLamp = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="engine" type="java.lang.String" length="255" not-null="false" unique="false"
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
	 * 	 * @return String
	 * @hibernate.property column="drMirror" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getDrMirror() {
		return this.drMirror;
	}
	
	/**
	 * Set the drMirror
	 */	
	public void setDrMirror(String aValue) {
		this.drMirror = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="machine" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getMachine() {
		return this.machine;
	}
	
	/**
	 * Set the machine
	 */	
	public void setMachine(String aValue) {
		this.machine = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="driveMachine" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getDriveMachine() {
		return this.driveMachine;
	}
	
	/**
	 * Set the driveMachine
	 */	
	public void setDriveMachine(String aValue) {
		this.driveMachine = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BpMortgageCarConfigureStatus)) {
			return false;
		}
		BpMortgageCarConfigureStatus rhs = (BpMortgageCarConfigureStatus) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.carDoorConfigure, rhs.carDoorConfigure)
				.append(this.siren, rhs.siren)
				.append(this.instrument, rhs.instrument)
				.append(this.tvMonitor, rhs.tvMonitor)
				.append(this.gasbag, rhs.gasbag)
				.append(this.steeringDevice, rhs.steeringDevice)
				.append(this.lockClosedDevice, rhs.lockClosedDevice)
				.append(this.airConditioning, rhs.airConditioning)
				.append(this.brake, rhs.brake)
				.append(this.electricChair, rhs.electricChair)
				.append(this.drainageSystem, rhs.drainageSystem)
				.append(this.carWindowDevice, rhs.carWindowDevice)
				.append(this.coolingSystem, rhs.coolingSystem)
				.append(this.soundDevice, rhs.soundDevice)
				.append(this.transmissionDevice, rhs.transmissionDevice)
				.append(this.carLamp, rhs.carLamp)
				.append(this.engine, rhs.engine)
				.append(this.mortgageid, rhs.mortgageid)
				.append(this.drMirror, rhs.drMirror)
				.append(this.machine, rhs.machine)
				.append(this.driveMachine, rhs.driveMachine)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.carDoorConfigure) 
				.append(this.siren) 
				.append(this.instrument) 
				.append(this.tvMonitor) 
				.append(this.gasbag) 
				.append(this.steeringDevice) 
				.append(this.lockClosedDevice) 
				.append(this.airConditioning) 
				.append(this.brake) 
				.append(this.electricChair) 
				.append(this.drainageSystem) 
				.append(this.carWindowDevice) 
				.append(this.coolingSystem) 
				.append(this.soundDevice) 
				.append(this.transmissionDevice) 
				.append(this.carLamp) 
				.append(this.engine) 
				.append(this.mortgageid) 
				.append(this.drMirror) 
				.append(this.machine) 
				.append(this.driveMachine) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("carDoorConfigure", this.carDoorConfigure) 
				.append("siren", this.siren) 
				.append("instrument", this.instrument) 
				.append("tvMonitor", this.tvMonitor) 
				.append("gasbag", this.gasbag) 
				.append("steeringDevice", this.steeringDevice) 
				.append("lockClosedDevice", this.lockClosedDevice) 
				.append("airConditioning", this.airConditioning) 
				.append("brake", this.brake) 
				.append("electricChair", this.electricChair) 
				.append("drainageSystem", this.drainageSystem) 
				.append("carWindowDevice", this.carWindowDevice) 
				.append("coolingSystem", this.coolingSystem) 
				.append("soundDevice", this.soundDevice) 
				.append("transmissionDevice", this.transmissionDevice) 
				.append("carLamp", this.carLamp) 
				.append("engine", this.engine) 
				.append("mortgageid", this.mortgageid) 
				.append("drMirror", this.drMirror) 
				.append("machine", this.machine) 
				.append("driveMachine", this.driveMachine) 
				.toString();
	}



}
