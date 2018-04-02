package com.credit.proj.entity;

import java.util.Date;

import com.google.gson.annotations.Expose;


/**
 * CsProcreditMortgageCar entity. @author MyEclipse Persistence Tools
 */

public class ProcreditMortgageCar implements java.io.Serializable {

	// Fields
	private Integer id;
	private Integer mortgageid;//抵质押物主键
	private String manufacturer;
	private String manufacturerName;
	//private String controller;
	//private Integer controlmodeid;
	private Integer enregisterinfoid;//登记情况
	//private String carenregisternumber;
	private java.util.Date leavefactorydate;
	//private String cartype;
	//private Double enginecapacity;
	private Double carprice;//新车价格.万元
	private Double haveusedtime;//使用时间.年
	private Double totalkilometres;//里程数.公里
	private Integer accidenttimes;//事故次数
	//private String statusvalue;
	private Integer carinfoid;//车况
	private Double exchangepriceone;//市场交易价格1.万元
	private Double exchangepricetow;//市场交易价格2.万元
	private Double modelrangeprice;//模型估价.万元
	//private Double finalprice;
	
	//2011.01.18新添加字段
	private String carNumber;//车牌号
	private String carStypeId;
	private String carStyle;//车系
	private String carModel;//车型
	private Integer displacement;//排量
	private String carDisplacement;//车辆排量
	private String configuration;//配置
	private Integer seating;//座位数
	private String carProduce;//车辆产地
	private String carManufacturer;//制造商
	
	private String engineNo;//发动机号
	private String vin;//车架号
	private String carColor;//车辆颜色
	private String objectType;//类型  典当物品:pawn,抵质押物:mortgage
	// Constructors
	
	private String storageNum;//入库编号
	private Short  isStorage;//是否入库 1 是 0 否
	private String outNum;//出库编号
	private Short  isOut;//是否出库 1 是 0 否
	private Short  isHander;//是否办理 1 是 0 否
	private Date  handerTime;//办理时间
	private Short  status;//抵押状态 0 抵押中  1 已置换
	
	private Short  isNowCar;//是否现车 1 是 0 否
	private Short  isImport;//是否进口 1 是 0 否
	
	private Integer  keyCount;//钥匙数
	private Integer  carCount;//车数
	private String carXi;//chexi
	private String provinceName; //省份
	private String carPhotoExtendName;
	// 睿本新加
	private String listingAddress;//上牌地点
	private java.util.Date listingDate;//上牌日期
	private String brandCar;//品牌 （暂时不用）
	private String modelId;//车型ID
	private String modelName;//车型名称
	private String zone;//城市ID
	private String zoneName;//城市名称
	private java.util.Date regDate;//车辆上牌日期
	private String workState;//车辆状态
	private Double mile; //车辆行驶里程
	private String color;//车辆颜色
	private String interior;//内饰状况
	private String surface;//漆面状况
	private String minDate;//最小上牌时间
	private String maxDate;//最大上牌时间
	private String marketPrice;		//市场价格
	private String bookingPrice;		//预售价格
	private Integer  statues;//1 表示成功/0 表示失败   （与质押冲突 换成statues）
	private Integer  isMortgageMoney;
	private String carPhotoId;
	private String imei;   // 设备号（gps定位用的）
	private String carModelrui; //  厂牌型号
	private String ownership;// 所有权
/****************************新添加的字段 -- 不参与数据表的映射************************************/
	
	private  String  projname;//项目名称
	private  Long  projid;//项目表的主键
	private  String  projnum;//项目编号
	private  String  assuretypeidValue;//担保类型
	public  String assureofnameEnterOrPerson;//所有权人
	private  Boolean isunchain;//是否解除
	private  Double finalprice;//最终估价(万元:)
	private Double assuremoney;//可担保额度(万元:)
	private  String  businessType;//业务类型
	private String pledgenumber;//抵质押登记号
	
	public String getPledgenumber() {
		return pledgenumber;
	}
	public void setPledgenumber(String pledgenumber) {
		this.pledgenumber = pledgenumber;
	}

	public String getCarDisplacement() {
		return carDisplacement;
	}
	public void setCarDisplacement(String carDisplacement) {
		this.carDisplacement = carDisplacement;
	}
	public String getCarModelrui() {
		return carModelrui;
	}
	public void setCarModelrui(String carModelrui) {
		this.carModelrui = carModelrui;
	}
	public String getOwnership() {
		return ownership;
	}
	public void setOwnership(String ownership) {
		this.ownership = ownership;
	}

	/**
	 * 抵质押物类型
	 */
	private String mortgageTypeName;
	
	public String getMortgageTypeName() {
		return mortgageTypeName;
	}
	public void setMortgageTypeName(String mortgageTypeName) {
		this.mortgageTypeName = mortgageTypeName;
	}
	/** default constructor */
	public ProcreditMortgageCar() {
		
	}
	/** full constructor */
	public ProcreditMortgageCar(Integer id,Integer mortgageid, String manufacturer, String manufacturerName,
			Integer enregisterinfoid,java.util.Date leavefactorydate,Double carprice,
			Double haveusedtime, Double totalkilometres, Integer accidenttimes,
			Integer carinfoid, Double exchangepriceone,
			Double exchangepricetow, Double modelrangeprice,String  projnum,
			String carNumber,
			/*,Integer carStyle,
			Integer carModel,Integer displacement,String configuration,Integer seating,*/
			String engineNo,String vin,String carColor,String  storageNum,Short isStorage,Short  status,
			String outNum,Short isOut,Short  isHander,Date  handerTime,String  projname, Long  projid
		   ,Boolean isunchain,String  assuretypeidValue,String assureofnameEnterOrPerson,String carPhotoExtendName,
		   String carPhotoId ,Double  finalprice,Double  assuremoney,String  businessType,String objectType,
		   String carProduce ,String marketPrice, String imei,String carStypeId,Integer isMortgageMoney,
		   String bookingPrice,String carModelrui,String ownership) {
		super();
		this.id = id;
		this.mortgageid = mortgageid;
		this.manufacturer = manufacturer;
		this.manufacturerName = manufacturerName;
		this.enregisterinfoid = enregisterinfoid;
		this.leavefactorydate = leavefactorydate;
		this.carprice = carprice;
		this.haveusedtime = haveusedtime;
		this.totalkilometres = totalkilometres;
		this.accidenttimes = accidenttimes;
		//this.statusvalue = statusvalue;
		this.carinfoid = carinfoid;
		this.exchangepriceone = exchangepriceone;
		this.exchangepricetow = exchangepricetow;
		this.modelrangeprice = modelrangeprice;
		this.carNumber = carNumber;
		//this.finalprice = finalprice;
		/*this.carNumber = carNumber;
		this.carStyle = carStyle;
		this.carModel = carModel;
		this.displacement = displacement;
		this.configuration = configuration;
		this.seating = seating;*/
		this.engineNo = engineNo;
		this.vin = vin;
		this.carColor = carColor;
		this.storageNum = storageNum;
		this.isStorage = isStorage;
		this.outNum = outNum;
		this.isOut =  isOut;
		this.isHander = isHander;
        this.handerTime = handerTime;
        this.status = status;
        this.projname  = projname;
        this.projid = projid;
        this.projnum = projnum;
        this.isunchain = isunchain;
        this.assuretypeidValue = assuretypeidValue;
        this.assureofnameEnterOrPerson = assureofnameEnterOrPerson;
        this.carPhotoId = carPhotoId;
        this.carPhotoExtendName = carPhotoExtendName;
        this.finalprice = finalprice;
        this.assuremoney = assuremoney;
        this.businessType = businessType;
        this.objectType = objectType;
        this.carProduce = carProduce;
        this.marketPrice = marketPrice;
        this.imei = imei;
        this.isMortgageMoney = isMortgageMoney;
        this.bookingPrice = bookingPrice;
        this.carModelrui = carModelrui;
        this.ownership = ownership;
        this.carStypeId = carStypeId;
	}
	

	public Integer getIsMortgageMoney() {
		return isMortgageMoney;
	}
	public void setIsMortgageMoney(Integer isMortgageMoney) {
		this.isMortgageMoney = isMortgageMoney;
	}
	public String getBookingPrice() {
		return bookingPrice;
	}
	public void setBookingPrice(String bookingPrice) {
		this.bookingPrice = bookingPrice;
	}
	public String getImei() {
		return imei;
	}
	public void setImei(String imei) {
		this.imei = imei;
	}
	public String getCarPhotoExtendName() {
		return carPhotoExtendName;
	}
	public void setCarPhotoExtendName(String carPhotoExtendName) {
		this.carPhotoExtendName = carPhotoExtendName;
	}
	public String getCarPhotoId() {
		return carPhotoId;
	}
	public void setCarPhotoId(String carPhotoId) {
		this.carPhotoId = carPhotoId;
	}
	public Integer getStatues() {
		return statues;
	}
	public void setStatues(Integer statues) {
		this.statues = statues;
	}
	public String getMarketPrice() {
		return marketPrice;
	}
	public void setMarketPrice(String marketPrice) {
		this.marketPrice = marketPrice;
	}
	public java.util.Date getRegDate() {
		return regDate;
	}
	public void setRegDate(java.util.Date regDate) {
		this.regDate = regDate;
	}
	public String getProvinceName() {
		return provinceName;
	}
	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}
	public String getWorkState() {
		return workState;
	}
	public void setWorkState(String workState) {
		this.workState = workState;
	}
	public Double getMile() {
		return mile;
	}
	public void setMile(Double mile) {
		this.mile = mile;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getInterior() {
		return interior;
	}
	public void setInterior(String interior) {
		this.interior = interior;
	}
	public String getSurface() {
		return surface;
	}
	public void setSurface(String surface) {
		this.surface = surface;
	}
	public String getMinDate() {
		return minDate;
	}
	public void setMinDate(String minDate) {
		this.minDate = minDate;
	}
	public String getMaxDate() {
		return maxDate;
	}
	public void setMaxDate(String maxDate) {
		this.maxDate = maxDate;
	}
	public String getZoneName() {
		return zoneName;
	}
	public void setZoneName(String zoneName) {
		this.zoneName = zoneName;
	}
	public String getZone() {
		return zone;
	}
	public void setZone(String zone) {
		this.zone = zone;
	}
	public String getModelName() {
		return modelName;
	}
	public void setModelName(String modelName) {
		this.modelName = modelName;
	}
	public String getModelId() {
		return modelId;
	}
	public void setModelId(String modelId) {
		this.modelId = modelId;
	}
	public String getCarXi() {
		return carXi;
	}
	public void setCarXi(String carXi) {
		this.carXi = carXi;
	}
	public String getCarStypeId() {
		return carStypeId;
	}
	public void setCarStypeId(String carStypeId) {
		this.carStypeId = carStypeId;
	}
	public String getManufacturerName() {
		return manufacturerName;
	}
	public void setManufacturerName(String manufacturerName) {
		this.manufacturerName = manufacturerName;
	}
	public String getListingAddress() {
		return listingAddress;
	}
	public void setListingAddress(String listingAddress) {
		this.listingAddress = listingAddress;
	}
	public java.util.Date getListingDate() {
		return listingDate;
	}
	public void setListingDate(java.util.Date listingDate) {
		this.listingDate = listingDate;
	}
	public String getBrandCar() {
		return brandCar;
	}
	public void setBrandCar(String brandCar) {
		this.brandCar = brandCar;
	}
	public Short getIsNowCar() {
		return isNowCar;
	}
	public void setIsNowCar(Short isNowCar) {
		this.isNowCar = isNowCar;
	}
	public Short getIsImport() {
		return isImport;
	}
	public void setIsImport(Short isImport) {
		this.isImport = isImport;
	}
	public Integer getKeyCount() {
		return keyCount;
	}
	public void setKeyCount(Integer keyCount) {
		this.keyCount = keyCount;
	}
    

	public Integer getCarCount() {
		return carCount;
	}
	public void setCarCount(Integer carCount) {
		this.carCount = carCount;
	}
	public String getBusinessType() {
		return businessType;
	}
	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}
	public Double getAssuremoney() {
		return assuremoney;
	}
	public void setAssuremoney(Double assuremoney) {
		this.assuremoney = assuremoney;
	}
	public Double getFinalprice() {
		return finalprice;
	}

	public void setFinalprice(Double finalprice) {
		this.finalprice = finalprice;
	}

	public String getAssureofnameEnterOrPerson() {
		return assureofnameEnterOrPerson;
	}

	public void setAssureofnameEnterOrPerson(String assureofnameEnterOrPerson) {
		this.assureofnameEnterOrPerson = assureofnameEnterOrPerson;
	}

	public String getAssuretypeidValue() {
		return assuretypeidValue;
	}

	public void setAssuretypeidValue(String assuretypeidValue) {
		this.assuretypeidValue = assuretypeidValue;
	}

	public Boolean getIsunchain() {
		return isunchain;
	}

	public void setIsunchain(Boolean isunchain) {
		this.isunchain = isunchain;
	}


	public String getProjnum() {
		return projnum;
	}

	public void setProjnum(String projnum) {
		this.projnum = projnum;
	}

	public String getProjname() {
		return projname;
	}

	public void setProjname(String projname) {
		this.projname = projname;
	}

	 

	public Long getProjid() {
		return projid;
	}

	public void setProjid(Long projid) {
		this.projid = projid;
	}

	public Short getStatus() {
		return status;
	}

	public void setStatus(Short status) {
		this.status = status;
	}

	public String getStorageNum() {
		return storageNum;
	}

	public void setStorageNum(String storageNum) {
		this.storageNum = storageNum;
	}

	public Short getIsStorage() {
		return isStorage;
	}

	public void setIsStorage(Short isStorage) {
		this.isStorage = isStorage;
	}

	public String getOutNum() {
		return outNum;
	}

	public void setOutNum(String outNum) {
		this.outNum = outNum;
	}

	public Short getIsOut() {
		return isOut;
	}

	public void setIsOut(Short isOut) {
		this.isOut = isOut;
	}

	public Short getIsHander() {
		return isHander;
	}

	public void setIsHander(Short isHander) {
		this.isHander = isHander;
	}

	public Date getHanderTime() {
		return handerTime;
	}

	public void setHanderTime(Date handerTime) {
		this.handerTime = handerTime;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public String getCarStyle() {
		return carStyle;
	}

	public void setCarStyle(String carStyle) {
		this.carStyle = carStyle;
	}

	public String getCarNumber() {
		return carNumber;
	}

	public void setCarNumber(String carNumber) {
		this.carNumber = carNumber;
	}

	public String getCarModel() {
		return carModel;
	}

	public void setCarModel(String carModel) {
		this.carModel = carModel;
	}

	public Integer getDisplacement() {
		return displacement;
	}

	public void setDisplacement(Integer displacement) {
		this.displacement = displacement;
	}

	public String getConfiguration() {
		return configuration;
	}

	public void setConfiguration(String configuration) {
		this.configuration = configuration;
	}

	public Integer getSeating() {
		return seating;
	}

	public void setSeating(Integer seating) {
		this.seating = seating;
	}

	public String getCarProduce() {
		return carProduce;
	}

	public void setCarProduce(String carProduce) {
		this.carProduce = carProduce;
	}

	public String getCarManufacturer() {
		return carManufacturer;
	}

	public void setCarManufacturer(String carManufacturer) {
		this.carManufacturer = carManufacturer;
	}

	// Property accessors
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getMortgageid() {
		return this.mortgageid;
	}

	public void setMortgageid(Integer mortgageid) {
		this.mortgageid = mortgageid;
	}


	public String getManufacturer() {
		return manufacturer;
	}

	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	public Integer getEnregisterinfoid() {
		return this.enregisterinfoid;
	}

	public void setEnregisterinfoid(Integer enregisterinfoid) {
		this.enregisterinfoid = enregisterinfoid;
	}


	public java.util.Date getLeavefactorydate() {
		return leavefactorydate;
	}

	public void setLeavefactorydate(java.util.Date leavefactorydate) {
		this.leavefactorydate = leavefactorydate;
	}


	public Double getCarprice() {
		return this.carprice;
	}

	public void setCarprice(Double carprice) {
		this.carprice = carprice;
	}

	
	public Double getHaveusedtime() {
		return haveusedtime;
	}

	public void setHaveusedtime(Double haveusedtime) {
		this.haveusedtime = haveusedtime;
	}

	public Double getTotalkilometres() {
		return totalkilometres;
	}

	public void setTotalkilometres(Double totalkilometres) {
		this.totalkilometres = totalkilometres;
	}

	public Integer getAccidenttimes() {
		return accidenttimes;
	}

	public void setAccidenttimes(Integer accidenttimes) {
		this.accidenttimes = accidenttimes;
	}

	public Integer getCarinfoid() {
		return this.carinfoid;
	}

	public void setCarinfoid(Integer carinfoid) {
		this.carinfoid = carinfoid;
	}

	public Double getExchangepriceone() {
		return this.exchangepriceone;
	}

	public void setExchangepriceone(Double exchangepriceone) {
		this.exchangepriceone = exchangepriceone;
	}

	public Double getExchangepricetow() {
		return this.exchangepricetow;
	}

	public void setExchangepricetow(Double exchangepricetow) {
		this.exchangepricetow = exchangepricetow;
	}

	public Double getModelrangeprice() {
		return this.modelrangeprice;
	}

	public void setModelrangeprice(Double modelrangeprice) {
		this.modelrangeprice = modelrangeprice;
	}


	public String getEngineNo() {
		return engineNo;
	}

	public void setEngineNo(String engineNo) {
		this.engineNo = engineNo;
	}

	public String getVin() {
		return vin;
	}

	public void setVin(String vin) {
		this.vin = vin;
	}

	public String getCarColor() {
		return carColor;
	}

	public void setCarColor(String carColor) {
		this.carColor = carColor;
	}

}