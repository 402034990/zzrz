package com.zhiwei.credit.model.entityhbm;

import java.math.BigDecimal;
import java.util.Date;

import com.zhiwei.credit.model.creditFlow.finance.SlFundQlide;

public class CashDetail   {
	
    private Long id;//表主键
	private Long cashdepositid;//保证金标的主键
	private Date createDate;//创建日期
	private Integer cashType;//操作类型 1 充值 2 支出 3 占用 4 释放
    private Long projectId;//项目表主键
    private String 	projectName;//项目名称
	private Integer state;//状态 1 成功 2 失败 ,0未对账
	private String declibtion;//说明
	private BigDecimal cashmoney;//操作金额
	private String oprateName;//操作人
	private Long oprateNameId;//操作人id
	private  String  projectNum;//项目编号
	
	private Date factDate;//实际到账日
	private BigDecimal afterMoney;//已对账金额
	private BigDecimal notMoney;//未对账金额
	protected SlFundQlide slFundQlide;//流水
	
	/**
	 *推送流水号
	 */
	private String requestNo;
	
	//不与数据库映射字段--------开始--------
	private String cashName;//保证金账户名称
	private String customerName;//客户名称
	private BigDecimal incomeMoney;//收入金额
	private BigDecimal payMoney;//支出金额
	
	private String myAccount;//银行流水账号
	private String currency;//币种
	//不与数据库映射字段--------结束--------
	
	public String getProjectNum() {
		return projectNum;
	}
	public void setProjectNum(String projectNum) {
		this.projectNum = projectNum;
	}
	public Long getOprateNameId() {
		return oprateNameId;
	}
	public void setOprateNameId(Long oprateNameId) {
		this.oprateNameId = oprateNameId;
	}
	public String getOprateName() {
		return oprateName;
	}
	public void setOprateName(String oprateName) {
		this.oprateName = oprateName;
	}
	public BigDecimal getCashmoney() {
		return cashmoney;
	}
	public void setCashmoney(BigDecimal cashmoney) {
		this.cashmoney = cashmoney;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCashdepositid() {
		return cashdepositid;
	}
	public void setCashdepositid(Long cashdepositid) {
		this.cashdepositid = cashdepositid;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Integer getCashType() {
		return cashType;
	}
	public void setCashType(Integer cashType) {
		this.cashType = cashType;
	}
	public Long getProjectId() {
		return projectId;
	}
	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public String getDeclibtion() {
		return declibtion;
	}
	public void setDeclibtion(String declibtion) {
		this.declibtion = declibtion;
	}
	public Date getFactDate() {
		return factDate;
	}
	public void setFactDate(Date factDate) {
		this.factDate = factDate;
	}
	public BigDecimal getAfterMoney() {
		return afterMoney;
	}
	public void setAfterMoney(BigDecimal afterMoney) {
		this.afterMoney = afterMoney;
	}
	public BigDecimal getNotMoney() {
		return notMoney;
	}
	public void setNotMoney(BigDecimal notMoney) {
		this.notMoney = notMoney;
	}
	public SlFundQlide getSlFundQlide() {
		return slFundQlide;
	}
	public void setSlFundQlide(SlFundQlide slFundQlide) {
		this.slFundQlide = slFundQlide;
	}
	public String getCashName() {
		return cashName;
	}
	public void setCashName(String cashName) {
		this.cashName = cashName;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public BigDecimal getIncomeMoney() {
		return incomeMoney;
	}
	public void setIncomeMoney(BigDecimal incomeMoney) {
		this.incomeMoney = incomeMoney;
	}
	public BigDecimal getPayMoney() {
		return payMoney;
	}
	public void setPayMoney(BigDecimal payMoney) {
		this.payMoney = payMoney;
	}
	public String getMyAccount() {
		return myAccount;
	}
	public void setMyAccount(String myAccount) {
		this.myAccount = myAccount;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getRequestNo() {
		return requestNo;
	}
	public void setRequestNo(String requestNo) {
		this.requestNo = requestNo;
	}

}
