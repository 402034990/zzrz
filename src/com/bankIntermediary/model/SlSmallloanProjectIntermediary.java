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


public class SlSmallloanProjectIntermediary  extends BaseModel  implements  java.io.Serializable  {
	protected Long projectId;
	public String projectName;//项目名称
	protected String projectNumber;   //项目编号
	protected String oppositeType;   //对方主体类型  
	protected Long oppositeID;   //对方主体ID
	protected BigDecimal projectMoney;  //项目金额，也是每次的审批金额
	protected Integer payintentPeriod; //还款期数,
	protected String remarks;//资金款项修改情况备注
	
	
	
	
	private String customerName;//借款客户名称
	public Long loanProductId;//产品主键
	public  String loanProductName;//产品名称
	public  java.util.Date useTime;//用款时间
	public Long  loanWayId;//贷款方式主键
	public  String  loanWayName;//贷款方式名称
	public  Long  financialAdviserId;//金融顾问主键
	public String  financialAdviserName;//金融顾问姓名
	public  Long  bankComId;//银行专员主键
	public  String  bankComName;//银行专员名称
	public Long  distributionPersonId;//分配人主键
	public  String  distributionPersonName;//分配人名称
	public  java.util.Date distributionTime;//分配时间
	public  Short  flag;//标记  表示项目的不同状态
	
	
	
	

	private static final long serialVersionUID = 1L;

	protected String businessType; //  业务类别
	protected String operationType; //业务种类
	protected String flowType;   //流程类别 
	protected String mineType;    //我方主体类型
	protected Long mineId;      //我方主体ID
//	protected String oppositeType;   //对方主体类型  
	
	protected BigDecimal examineProjectMoney;  //贷款金额
	protected BigDecimal secondProjectMoney;//终审审批金额
	protected BigDecimal projectMoneyPass;  //最后的放款金额，生成款项所传金额
	protected Short loanType; 
	protected String dateMode;  //日期模型
	protected java.util.Date startDate; // 贷款日期
	protected java.util.Date intentDate; //原始的还款日期，如果展期到某天，就记录在展期表里
	

	protected Integer dayOfEveryPeriod; //自定义周期的天数,
	protected String isStartDatePay; //是否按还款日还款,
	protected Integer payintentPerioDate; //每期还款日,
	protected String accrualtype;  //还款方式
	protected java.math.BigDecimal accrual; //贷款利率
    protected String payaccrualType;   //还款周期
	protected String overdueRateType; //逾期费率的计算方式,1按日2，按期
	protected java.math.BigDecimal overdueRate; //逾期费率
	protected Short isAheadPay; //是否允许提前还款
	protected Short aheadDayNum;  //提前还款通知天数
	protected java.math.BigDecimal breachRate; //违约金比例
	protected String breachMoney; //违约金额
	protected Integer isPreposePayAccrual; //是否前置付息 0否 	1 是
    protected java.math.BigDecimal  dayOfAccrual; //日利化利息
    protected java.math.BigDecimal dayOfRate; //日利华率
    protected java.math.BigDecimal managementConsultingOfRate; //管理咨询费率
    protected String managementConsultingMineType;//管理咨询费率 我方主体类型
    protected Long managementConsultingMineId;// 管理咨询费率 我方主体Id
    protected java.math.BigDecimal consultationMoney; //咨询管理费用
    protected java.math.BigDecimal financeServiceOfRate; //财务服务费率
    protected String  financeServiceMineType;//财务服务费率 我方主体类型
    protected Long  financeServiceMineId;//财务服务费率 我方主体ID
	protected java.math.BigDecimal serviceMoney; //财务服务费
    protected Long currency;   //币种
	protected Long purposeType; //贷款用途
	protected String purposeTypeStr; //贷款用途  字符串，当需要手动录入的时候保存字符串
	protected String appUserName;//项目经理名字
	
	protected String breachComment;//违约说明
	
	protected String infosourceId;// 保存信息来源
	
	protected String investorIds;//投资人id
	
	protected Short states;//财务对接时项目方款状态 ：0表示未点击放款按钮；1表示已经点击了放款按钮；2表示银行账户错误
	protected String loanLimit;//贷款期限
	protected Short isOtherFlow;//是否属于处于利率变更，展期，提前还款的款项计划重新生成：默认为0表示没有贷后流程，1表示处于展期流程中；2表示提前还款流程；3表示利率变更流程,7
	protected String loanFormsId;//放款形式
	protected String businessCassify;//业务分类：虚拟业务、正常业务、特殊业务。
	private String personNum;//客户编号 企业客户：2XXXXXXX0、个人客户1XXXXXXX1
	/**
	 * 项目状态(projectStatus)
	 * 办理中贷款：0
	 * 放款后贷款：1
	 * 已完成贷款：2
	 * 提前终止贷款：3
	 * 展期申请中(未审批)：4
	 * 通过展期申请(展期状态)：5
	 * 未通过展期申请：6
	 * 贷后监管中(未审批):7
	 * 完成贷后监管(已提交任务):9
	 * 违约贷款：8
	 * 已挂起项目：10(与多个不同的项目表以及和任务相关的表状态一致,都为10,避免不同的地方是不同的值,而本身所代表的意思一样。)
	 */
	protected Short projectStatus;
	protected String mineName;   //我方主体名称  无映射   
	protected Date createDate; //项目创建时间
	protected java.math.BigDecimal accrualMoney; //利息总额
	protected java.util.Date payaccrualDate; //预计付息日
	protected java.math.BigDecimal payProjectMoney; //已还金额(本金)
	protected java.math.BigDecimal payAccrualMoney;//已还金额(利息)
	protected java.util.Date commitDate; //项目上报时间
	protected java.math.BigDecimal annualNetProfit;//年净化利率
	protected java.math.BigDecimal flatMoney; //平帐金额
	protected java.math.BigDecimal paychargeMoney;//杂项费用支出
	protected java.math.BigDecimal incomechargeMoney; //杂项费用收入
	protected java.math.BigDecimal payincomechargeMoney;//已还金额(杂项收入)
	protected java.math.BigDecimal paypaychargeMoney;//杂项费用支出
	protected java.math.BigDecimal flatincomechargeMoney; //平帐金额
	protected java.math.BigDecimal flatpaychargeMoney; //平帐金额

	protected String appUserId; //项目经理ID
	protected String recommendUser;//推荐人
    protected String appUsers; //项目经理名称 (临时获得)
	protected Date endDate; //项目结束时间
	protected String assuretypeid;//主担保方式
	protected String customerChannel;//客户渠道  
	protected  String productTypeId;//产品类别
	protected java.math.BigDecimal overdueRateLoan; //逾期贷款利率(逾期贷款利率默认 贷款综合利率2倍，此利率为本金逾期时处罚利率)

	protected BigDecimal accrualnew;//是什么东西
	
	protected Boolean isPreposePayConsultingCheck;//咨询服务费率是否一次性前置付息
	protected BigDecimal yearAccrualRate;
	protected BigDecimal dayAccrualRate;
	protected BigDecimal sumAccrualRate;
	protected BigDecimal yearManagementConsultingOfRate;
	protected BigDecimal dayManagementConsultingOfRate;
	protected BigDecimal sumManagementConsultingOfRate;
	protected BigDecimal yearFinanceServiceOfRate;
	protected BigDecimal dayFinanceServiceOfRate;
	protected BigDecimal sumFinanceServiceOfRate;
	protected Integer isInterestByOneTime; //是否一次性支付利息  0否 	1 是
	protected String projectProperties;//项目属性    常规:common，虚拟:invented,特殊:special
	
	protected BigDecimal riskRate;//风险保证金率
	
	protected String teamManagerId;//团队经理
	protected String teamManagerName;//团队经理姓名
	
	protected Long departId;//部门
	protected String departMentName;//门店名称
	protected Long branchId;//分公司
	
	
	protected Long bankId;//关联EnterpriseBankId  一个客户有好几关联的银行账户，所以需要保存，同时，如果未指定则默认回填  主放款银行账户
	protected String appUserIdB;//B角成员Id
	protected String appUserNameB;//B角成员名称   石药需要的
	
	protected String archivesBelonging;//档案归属地
	
	protected Short overdueReceiveWay;//逾期收取方式 ：0按应还未还金额收取、1按合同金额收取
	protected Short penaltyReceiveWay;//罚息收取方式：0按应还未还金额收取、1按合同金额收取
	protected BigDecimal penaltyReceiveRate;//罚息利率
	protected Short prepayMoney;//提前还款利息收取方式：0按提前还款金额、1按合同金额收取
	protected BigDecimal prepayMoneyRate;//违约金利率
	protected int prepayRateTypeA=0;//提前还款利息收取方式：不足?天,按实际发生天数收,否则整日收
	protected int prepayRateTypeB=0;//提前还款利息收取方式：最低收?天利息
	protected Short depositsReleaseWay;//保证金释放方式：0按应还本金释放、1按贷款结清
	protected Short creditfreedType;//授信释放方式：0按还本金额释放、1按贷款结清
	protected String isActualDay;//计息方式  yes:按实际天数算,no:按30天算
	
	//不与数据库关联
	private Long runId;
	private String orgName;
	private String activityName;
	private String executor;
	private String taskId;

	private String selectCreditorType;//选择债权方式
	private Date transferCreditorDate;//债权转让日期
	private String childType;//债权类型
	private  String  productTypeName;//产品类型名称
	
	
	///////
	private   String  ceditType;//授信类型
	private   Short ceditTypeId;//授信类型id
	
	
	public Long  bankCreditId;//授信表的主键
	public Long baozhengjinId;//保证金表的主键
	
	private BigDecimal cashrate;//保证金比率
	
	
	
	
	
	
	
	public String getBusinessType() {
		return businessType;
	}
	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}
	public Long getMineId() {
		return mineId;
	}
	public void setMineId(Long mineId) {
		this.mineId = mineId;
	}
	public Integer getDayOfEveryPeriod() {
		return dayOfEveryPeriod;
	}
	public void setDayOfEveryPeriod(Integer dayOfEveryPeriod) {
		this.dayOfEveryPeriod = dayOfEveryPeriod;
	}
	public String getPayaccrualType() {
		return payaccrualType;
	}
	public void setPayaccrualType(String payaccrualType) {
		this.payaccrualType = payaccrualType;
	}
	public String getOppositeType() {
		return oppositeType;
	}
	public void setOppositeType(String oppositeType) {
		this.oppositeType = oppositeType;
	}
	public Long getLoanProductId() {
		return loanProductId;
	}
	public void setLoanProductId(Long loanProductId) {
		this.loanProductId = loanProductId;
	}
	public String getLoanProductName() {
		return loanProductName;
	}
	public void setLoanProductName(String loanProductName) {
		this.loanProductName = loanProductName;
	}
	public java.util.Date getUseTime() {
		return useTime;
	}
	public void setUseTime(java.util.Date useTime) {
		this.useTime = useTime;
	}
	public Long getLoanWayId() {
		return loanWayId;
	}
	public void setLoanWayId(Long loanWayId) {
		this.loanWayId = loanWayId;
	}
	public String getLoanWayName() {
		return loanWayName;
	}
	public void setLoanWayName(String loanWayName) {
		this.loanWayName = loanWayName;
	}
	public Long getFinancialAdviserId() {
		return financialAdviserId;
	}
	public void setFinancialAdviserId(Long financialAdviserId) {
		this.financialAdviserId = financialAdviserId;
	}
	public String getFinancialAdviserName() {
		return financialAdviserName;
	}
	public void setFinancialAdviserName(String financialAdviserName) {
		this.financialAdviserName = financialAdviserName;
	}
	public Long getBankComId() {
		return bankComId;
	}
	public void setBankComId(Long bankComId) {
		this.bankComId = bankComId;
	}
	public String getBankComName() {
		return bankComName;
	}
	public void setBankComName(String bankComName) {
		this.bankComName = bankComName;
	}
	public Long getDistributionPersonId() {
		return distributionPersonId;
	}
	public void setDistributionPersonId(Long distributionPersonId) {
		this.distributionPersonId = distributionPersonId;
	}
	public String getDistributionPersonName() {
		return distributionPersonName;
	}
	public void setDistributionPersonName(String distributionPersonName) {
		this.distributionPersonName = distributionPersonName;
	}
	public java.util.Date getDistributionTime() {
		return distributionTime;
	}
	public void setDistributionTime(java.util.Date distributionTime) {
		this.distributionTime = distributionTime;
	}
	public Short getFlag() {
		return flag;
	}
	public void setFlag(Short flag) {
		this.flag = flag;
	}
	public String getProductTypeName() {
		return productTypeName;
	}
	public void setProductTypeName(String productTypeName) {
		this.productTypeName = productTypeName;
	}
	public BigDecimal getCashrate() {
		return cashrate;
	}
	public void setCashrate(BigDecimal cashrate) {
		this.cashrate = cashrate;
	}
	public Long getBankCreditId() {
		return bankCreditId;
	}
	public void setBankCreditId(Long bankCreditId) {
		this.bankCreditId = bankCreditId;
	}
	public Long getBaozhengjinId() {
		return baozhengjinId;
	}
	public void setBaozhengjinId(Long baozhengjinId) {
		this.baozhengjinId = baozhengjinId;
	}
	public String getCeditType() {
		return ceditType;
	}
	public void setCeditType(String ceditType) {
		this.ceditType = ceditType;
	}
	public Short getCeditTypeId() {
		return ceditTypeId;
	}
	public void setCeditTypeId(Short ceditTypeId) {
		this.ceditTypeId = ceditTypeId;
	}
	public String getSelectCreditorType() {
		return selectCreditorType;
	}
	public void setSelectCreditorType(String selectCreditorType) {
		this.selectCreditorType = selectCreditorType;
	}
	public Date getTransferCreditorDate() {
		return transferCreditorDate;
	}
	public void setTransferCreditorDate(Date transferCreditorDate) {
		this.transferCreditorDate = transferCreditorDate;
	}
	public String getArchivesBelonging() {
		return archivesBelonging;
	}
	public void setArchivesBelonging(String archivesBelonging) {
		this.archivesBelonging = archivesBelonging;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getAppUserIdB() {
		return appUserIdB;
	}
	public void setAppUserIdB(String appUserIdB) {
		this.appUserIdB = appUserIdB;
	}
	public String getAppUserNameB() {
		return appUserNameB;
	}
	public void setAppUserNameB(String appUserNameB) {
		this.appUserNameB = appUserNameB;
	}
	public Long getRunId() {
		return runId;
	}
	public void setRunId(Long runId) {
		this.runId = runId;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public String getActivityName() {
		return activityName;
	}
	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}
	public String getExecutor() {
		return executor;
	}
	public void setExecutor(String executor) {
		this.executor = executor;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getDepartMentName() {
		return departMentName;
	}
	public void setDepartMentName(String departMentName) {
		this.departMentName = departMentName;
	}
	public String getTeamManagerId() {
		return teamManagerId;
	}
	public void setTeamManagerId(String teamManagerId) {
		this.teamManagerId = teamManagerId;
	}
	public String getTeamManagerName() {
		return teamManagerName;
	}
	public void setTeamManagerName(String teamManagerName) {
		this.teamManagerName = teamManagerName;
	}
	public BigDecimal getRiskRate() {
		return riskRate;
	}
	public void setRiskRate(BigDecimal riskRate) {
		this.riskRate = riskRate;
	}
	protected String loanPurpose;
	protected String intentRateEnd;
	protected String intentRateStart;
	protected Date poupseDate;
	protected Integer poupsePeriod;
	protected BigDecimal money;
	
	protected String managementConsultingMineName;
	public String getManagementConsultingMineName() {
		return managementConsultingMineName;
	}
	public void setManagementConsultingMineName(String managementConsultingMineName) {
		this.managementConsultingMineName = managementConsultingMineName;
	}
	public String getFinanceServiceMineName() {
		return financeServiceMineName;
	}
	public void setFinanceServiceMineName(String financeServiceMineName) {
		this.financeServiceMineName = financeServiceMineName;
	}
	protected String financeServiceMineName;

	protected Long productId;//产品Id
	protected Date lastPresentDate;
	
	protected String availableType;//推介机构类型，目前是写死的
	protected Long availableId;//推介机构ID，
	protected String valilableName;//推介机构名称
	protected String credit;//申请时可用额度
	protected String laveCredit;//当前可用额度
	
	protected Date startInterestDate;//起息日
	
	protected BigDecimal balanceRate;//余额管理费率
	
	public BigDecimal getBalanceRate() {
		return balanceRate;
	}
	public void setBalanceRate(BigDecimal balanceRate) {
		this.balanceRate = balanceRate;
	}
	public Date getStartInterestDate() {
		return startInterestDate;
	}
	public void setStartInterestDate(Date startInterestDate) {
		this.startInterestDate = startInterestDate;
	}
	public String getCredit() {
		return credit;
	}
	public void setCredit(String credit) {
		this.credit = credit;
	}
	public String getValilableName() {
		return valilableName;
	}
	public void setValilableName(String valilableName) {
		this.valilableName = valilableName;
	}
	public String getLoanPurpose() {
		return loanPurpose;
	}
	public void setLoanPurpose(String loanPurpose) {
		this.loanPurpose = loanPurpose;
	}
	public String getIntentRateEnd() {
		return intentRateEnd;
	}
	public void setIntentRateEnd(String intentRateEnd) {
		this.intentRateEnd = intentRateEnd;
	}
	public String getIntentRateStart() {
		return intentRateStart;
	}
	public void setIntentRateStart(String intentRateStart) {
		this.intentRateStart = intentRateStart;
	}
	public Date getPoupseDate() {
		return poupseDate;
	}
	public void setPoupseDate(Date poupseDate) {
		this.poupseDate = poupseDate;
	}
	public Integer getPoupsePeriod() {
		return poupsePeriod;
	}
	public void setPoupsePeriod(Integer poupsePeriod) {
		this.poupsePeriod = poupsePeriod;
	}
	public BigDecimal getMoney() {
		return money;
	}
	public void setMoney(BigDecimal money) {
		this.money = money;
	}
	public String getProjectProperties() {
		return projectProperties;
	}
	public void setProjectProperties(String projectProperties) {
		this.projectProperties = projectProperties;
	}
	public BigDecimal getYearAccrualRate() {
		return yearAccrualRate;
	}
	public void setYearAccrualRate(BigDecimal yearAccrualRate) {
		this.yearAccrualRate = yearAccrualRate;
	}
	public BigDecimal getDayAccrualRate() {
		return dayAccrualRate;
	}
	public void setDayAccrualRate(BigDecimal dayAccrualRate) {
		this.dayAccrualRate = dayAccrualRate;
	}
	public BigDecimal getSumAccrualRate() {
		return sumAccrualRate;
	}
	public void setSumAccrualRate(BigDecimal sumAccrualRate) {
		this.sumAccrualRate = sumAccrualRate;
	}
	public BigDecimal getYearManagementConsultingOfRate() {
		return yearManagementConsultingOfRate;
	}
	public void setYearManagementConsultingOfRate(
			BigDecimal yearManagementConsultingOfRate) {
		this.yearManagementConsultingOfRate = yearManagementConsultingOfRate;
	}
	public BigDecimal getDayManagementConsultingOfRate() {
		return dayManagementConsultingOfRate;
	}
	public void setDayManagementConsultingOfRate(
			BigDecimal dayManagementConsultingOfRate) {
		this.dayManagementConsultingOfRate = dayManagementConsultingOfRate;
	}
	public BigDecimal getSumManagementConsultingOfRate() {
		return sumManagementConsultingOfRate;
	}
	public void setSumManagementConsultingOfRate(
			BigDecimal sumManagementConsultingOfRate) {
		this.sumManagementConsultingOfRate = sumManagementConsultingOfRate;
	}
	public BigDecimal getYearFinanceServiceOfRate() {
		return yearFinanceServiceOfRate;
	}
	public void setYearFinanceServiceOfRate(BigDecimal yearFinanceServiceOfRate) {
		this.yearFinanceServiceOfRate = yearFinanceServiceOfRate;
	}
	public BigDecimal getDayFinanceServiceOfRate() {
		return dayFinanceServiceOfRate;
	}
	public void setDayFinanceServiceOfRate(BigDecimal dayFinanceServiceOfRate) {
		this.dayFinanceServiceOfRate = dayFinanceServiceOfRate;
	}
	public BigDecimal getSumFinanceServiceOfRate() {
		return sumFinanceServiceOfRate;
	}
	public void setSumFinanceServiceOfRate(BigDecimal sumFinanceServiceOfRate) {
		this.sumFinanceServiceOfRate = sumFinanceServiceOfRate;
	}
	public Integer getIsInterestByOneTime() {
		return isInterestByOneTime;
	}
	public void setIsInterestByOneTime(Integer isInterestByOneTime) {
		this.isInterestByOneTime = isInterestByOneTime;
	}
	public Boolean getIsPreposePayConsultingCheck() {
		return isPreposePayConsultingCheck;
	}
	public void setIsPreposePayConsultingCheck(Boolean isPreposePayConsultingCheck) {
		this.isPreposePayConsultingCheck = isPreposePayConsultingCheck;
	}
	public BigDecimal getAccrualnew() {
		return accrualnew;
	}
	public void setAccrualnew(BigDecimal accrualnew) {
		this.accrualnew = accrualnew;
	}
	public java.math.BigDecimal getOverdueRateLoan() {
		return overdueRateLoan;
	}
	public void setOverdueRateLoan(java.math.BigDecimal overdueRateLoan) {
		this.overdueRateLoan = overdueRateLoan;
	}
	public String getProductTypeId() {
		return productTypeId;
	}
	public void setProductTypeId(String productTypeId) {
		this.productTypeId = productTypeId;
	}
	public String getCustomerChannel() {
		return customerChannel;
	}
	public void setCustomerChannel(String customerChannel) {
		this.customerChannel = customerChannel;
	}
	public String getAssuretypeid() {
		return assuretypeid;
	}
	public void setAssuretypeid(String assuretypeid) {
		this.assuretypeid = assuretypeid;
	}
	public java.math.BigDecimal getPayincomechargeMoney() {
		return payincomechargeMoney;
	}
	public void setPayincomechargeMoney(java.math.BigDecimal payincomechargeMoney) {
		this.payincomechargeMoney = payincomechargeMoney;
	}
	public String getRecommendUser() {
		return recommendUser;
	}
	public void setRecommendUser(String recommendUser) {
		this.recommendUser = recommendUser;
	}
	public Long getPurposeType() {
		return purposeType;
	}
	public void setPurposeType(Long purposeType) {
		this.purposeType = purposeType;
	}

	public Long getCurrency() {
		return currency;
	}

	public void setCurrency(Long currency) {
		this.currency = currency;
	}


	public String getLoanLimit() {
		return loanLimit;
	}
	public void setLoanLimit(String loanLimit) {
		this.loanLimit = loanLimit;
	}
	public String getOverdueRateType() {
		return overdueRateType;
	}
	public void setOverdueRateType(String overdueRateType) {
		this.overdueRateType = overdueRateType;
	}
	public String getIsStartDatePay() {
		return isStartDatePay;
	}
	public void setIsStartDatePay(String isStartDatePay) {
		this.isStartDatePay = isStartDatePay;
	}
	public Integer getPayintentPerioDate() {
		return payintentPerioDate;
	}
	public void setPayintentPerioDate(Integer payintentPerioDate) {
		this.payintentPerioDate = payintentPerioDate;
	}
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	
//	public Integer getDayOfEveryPeriod() {
//		return dayOfEveryPeriod;
//	}
//	public void setDayOfEveryPeriod(Integer dayOfEveryPeriod) {
//		this.dayOfEveryPeriod = dayOfEveryPeriod;
//	}
	public Integer getPayintentPeriod() {
		return payintentPeriod;
	}
	public void setPayintentPeriod(Integer payintentPeriod) {
		this.payintentPeriod = payintentPeriod;
	}
	public java.math.BigDecimal getPaypaychargeMoney() {
		return paypaychargeMoney;
	}
	public void setPaypaychargeMoney(java.math.BigDecimal paypaychargeMoney) {
		this.paypaychargeMoney = paypaychargeMoney;
	}
	public java.math.BigDecimal getFlatincomechargeMoney() {
		return flatincomechargeMoney;
	}
	public void setFlatincomechargeMoney(java.math.BigDecimal flatincomechargeMoney) {
		this.flatincomechargeMoney = flatincomechargeMoney;
	}
	public java.math.BigDecimal getFlatpaychargeMoney() {
		return flatpaychargeMoney;
	}
	public void setFlatpaychargeMoney(java.math.BigDecimal flatpaychargeMoney) {
		this.flatpaychargeMoney = flatpaychargeMoney;
	}
	public java.math.BigDecimal getConsultationMoney() {
		return consultationMoney;
	}
	public void setConsultationMoney(java.math.BigDecimal consultationMoney) {
		this.consultationMoney = consultationMoney;
	}
	public java.math.BigDecimal getServiceMoney() {
		return serviceMoney;
	}
	public void setServiceMoney(java.math.BigDecimal serviceMoney) {
		this.serviceMoney = serviceMoney;
	}
	public java.math.BigDecimal getManagementConsultingOfRate() {
		return managementConsultingOfRate;
	}

	public void setManagementConsultingOfRate(
			java.math.BigDecimal managementConsultingOfRate) {
		this.managementConsultingOfRate = managementConsultingOfRate;
	}
	public java.math.BigDecimal getFinanceServiceOfRate() {
		return financeServiceOfRate;
	}

	public void setFinanceServiceOfRate(java.math.BigDecimal financeServiceOfRate) {
		this.financeServiceOfRate = financeServiceOfRate;
	}

	public Integer getIsPreposePayAccrual() {
		return isPreposePayAccrual;
	}

	public void setIsPreposePayAccrual(Integer isPreposePayAccrual) {
		this.isPreposePayAccrual = isPreposePayAccrual;
	}

	public java.math.BigDecimal getDayOfAccrual() {
		return dayOfAccrual;
	}

	public void setDayOfAccrual(java.math.BigDecimal dayOfAccrual) {
		this.dayOfAccrual = dayOfAccrual;
	}

	public java.math.BigDecimal getDayOfRate() {
		return dayOfRate;
	}

	public void setDayOfRate(java.math.BigDecimal dayOfRate) {
		this.dayOfRate = dayOfRate;
	}

    

	public String getAppUsers() {
		return appUsers;
	}

	public void setAppUsers(String appUsers) {
		this.appUsers = appUsers;
	}

	public String getAppUserId() {
		return appUserId;
	}

	public void setAppUserId(String appUserId) {
		this.appUserId = appUserId;
	}


	public java.math.BigDecimal getAnnualNetProfit() {
		return annualNetProfit;
	}

	public void setAnnualNetProfit(java.math.BigDecimal annualNetProfit) {
		this.annualNetProfit = annualNetProfit;
	}

	public java.util.Date getPayaccrualDate() {
		return payaccrualDate;
	}

	public void setPayaccrualDate(java.util.Date payaccrualDate) {
		this.payaccrualDate = payaccrualDate;
	}

	public String getMineName() {
		return mineName;
	}

	public void setMineName(String mineName) {
		this.mineName = mineName;
	}
	

	public String getManagementConsultingMineType() {
		return managementConsultingMineType;
	}
	public void setManagementConsultingMineType(String managementConsultingMineType) {
		this.managementConsultingMineType = managementConsultingMineType;
	}
	public Long getManagementConsultingMineId() {
		return managementConsultingMineId;
	}
	public void setManagementConsultingMineId(Long managementConsultingMineId) {
		this.managementConsultingMineId = managementConsultingMineId;
	}
	public String getFinanceServiceMineType() {
		return financeServiceMineType;
	}
	public void setFinanceServiceMineType(String financeServiceMineType) {
		this.financeServiceMineType = financeServiceMineType;
	}
	public Long getFinanceServiceMineId() {
		return financeServiceMineId;
	}
	public void setFinanceServiceMineId(Long financeServiceMineId) {
		this.financeServiceMineId = financeServiceMineId;
	}
	@SuppressWarnings("unchecked")
	protected java.util.Set slFundIntents = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class SlSmallloanProject
	 */
	public SlSmallloanProjectIntermediary () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class SlSmallloanProject
	 */
	public SlSmallloanProjectIntermediary (
		 Long in_projectId
        ) {
		this.setProjectId(in_projectId);
    }


	public String getDateMode() {
		return dateMode;
	}

	public void setDateMode(String dateMode) {
		this.dateMode = dateMode;
	}

	public String getAccrualtype() {
		return accrualtype;
	}

	public void setAccrualtype(String accrualtype) {
		this.accrualtype = accrualtype;
	}

//	public String getPayaccrualType() {
//		return payaccrualType;
//	}
//
//	public void setPayaccrualType(String payaccrualType) {
//		this.payaccrualType = payaccrualType;
//	}

	public java.util.Set getSlFundIntents () {
		return slFundIntents;
	}	
	
	public void setSlFundIntents (java.util.Set in_slFundIntents) {
		this.slFundIntents = in_slFundIntents;
	}

	/**
	 * 	 * @return Long
     * @hibernate.id column="projectId" type="java.lang.Long" generator-class="native"
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
	 * 我方主体类型	 * @return Short
	 * @hibernate.property column="mineType" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */

	public String getMineType() {
		return mineType;
	}

	public void setMineType(String mineType) {
		this.mineType = mineType;
	}
	/**
	 * 我方主体表id	 * @return Long
	 * @hibernate.property column="mineId" type="java.lang.Long" length="19" not-null="true" unique="false"
	 */
//	public Long getMineId() {
//		return this.mineId;
//	}
//
//	/**
//	 * Set the mineId
//	 * @spring.validator type="required"
//	 */	
//	public void setMineId(Long aValue) {
//		this.mineId = aValue;
//	}	

     
/*	public String getOppositeType() {
		return oppositeType;
	}

	public void setOppositeType(String oppositeType) {
		this.oppositeType = oppositeType;
	}
*/
	/**
	 * 对方主体类型ID(客户表ID)	 * @return Long
	 * @hibernate.property column="oppositeID" type="java.lang.Long" length="19" not-null="true" unique="false"
	 */
	public Long getOppositeID() {
		return this.oppositeID;
	}
	
	/**
	 * Set the oppositeID
	 * @spring.validator type="required"
	 */	
	public void setOppositeID(Long aValue) {
		this.oppositeID = aValue;
	}	

	/**
	 * 项目名称	 * @return String
	 * @hibernate.property column="projectName" type="java.lang.String" length="250" not-null="true" unique="false"
	 */
	public String getProjectName() {
		return this.projectName;
	}
	
	/**
	 * Set the projectName
	 * @spring.validator type="required"
	 */	
	public void setProjectName(String aValue) {
		this.projectName = aValue;
	}	

	/**
	 * 项目编号	 * @return String
	 * @hibernate.property column="projectNumber" type="java.lang.String" length="50" not-null="true" unique="false"
	 */
	public String getProjectNumber() {
		return this.projectNumber;
	}
	
	/**
	 * Set the projectNumber
	 * @spring.validator type="required"
	 */	
	public void setProjectNumber(String aValue) {
		this.projectNumber = aValue;
	}	

	/**
	 * 担保方式	 * @return Short
	 * @hibernate.property column="loanType" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getLoanType() {
		return this.loanType;
	}
	
	/**
	 * Set the loanType
	 * @spring.validator type="required"
	 */	
	public void setLoanType(Short aValue) {
		this.loanType = aValue;
	}	


	/**
	 * 贷款起始日	 * @return java.util.Date
	 * @hibernate.property column="startDate" type="java.util.Date" length="19" not-null="true" unique="false"
	 */
	public java.util.Date getStartDate() {
		return this.startDate;
	}
	
	/**
	 * Set the startDate
	 * @spring.validator type="required"
	 */	
	public void setStartDate(java.util.Date aValue) {
		this.startDate = aValue;
	}	

	/**
	 * 预计还款日	 * @return java.util.Date
	 * @hibernate.property column="intentDate" type="java.util.Date" length="19" not-null="true" unique="false"
	 */
	public java.util.Date getIntentDate() {
		return this.intentDate;
	}
	
	/**
	 * Set the intentDate
	 * @spring.validator type="required"
	 */	
	public void setIntentDate(java.util.Date aValue) {
		this.intentDate = aValue;
	}	


	/**
	 * 利息	 * @return java.math.BigDecimal
	 * @hibernate.property column="accrual" type="java.math.BigDecimal" length="10" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getAccrual() {
		return this.accrual;
	}
	
	/**
	 * Set the accrual
	 * @spring.validator type="required"
	 */	
	public void setAccrual(java.math.BigDecimal aValue) {
		this.accrual = aValue;
	}	

	/**
	 * 逾期费率	 * @return java.math.BigDecimal
	 * @hibernate.property column="overdueRate" type="java.math.BigDecimal" length="10" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getOverdueRate() {
		return this.overdueRate;
	}
	
	/**
	 * Set the overdueRate
	 */	
	public void setOverdueRate(java.math.BigDecimal aValue) {
		this.overdueRate = aValue;
	}	

	/**
	 * 是否提前还款	 * @return Short
	 * @hibernate.property column="isAheadPay" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getIsAheadPay() {
		return this.isAheadPay;
	}
	
	/**
	 * Set the isAheadPay
	 */	
	public void setIsAheadPay(Short aValue) {
		this.isAheadPay = aValue;
	}	

	/**
	 * 提前天数	 * @return Short
	 * @hibernate.property column="aheadDayNum" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getAheadDayNum() {
		return this.aheadDayNum;
	}
	
	/**
	 * Set the aheadDayNum
	 */	
	public void setAheadDayNum(Short aValue) {
		this.aheadDayNum = aValue;
	}	

	/**
	 * 违约金比例	 * @return java.math.BigDecimal
	 * @hibernate.property column="breachRate" type="java.math.BigDecimal" length="10" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getBreachRate() {
		return this.breachRate;
	}
	
	/**
	 * Set the breachRate
	 */	
	public void setBreachRate(java.math.BigDecimal aValue) {
		this.breachRate = aValue;
	}	

    


	public String getBreachMoney() {
		return breachMoney;
	}

	public void setBreachMoney(String breachMoney) {
		this.breachMoney = breachMoney;
	}

	



	public java.math.BigDecimal getAccrualMoney() {
		return accrualMoney;
	}

	public void setAccrualMoney(java.math.BigDecimal accrualMoney) {
		this.accrualMoney = accrualMoney;
	}

	public java.math.BigDecimal getPayProjectMoney() {
		return payProjectMoney;
	}

	public void setPayProjectMoney(java.math.BigDecimal payProjectMoney) {
		this.payProjectMoney = payProjectMoney;
	}

	public java.math.BigDecimal getPayAccrualMoney() {
		return payAccrualMoney;
	}

	public void setPayAccrualMoney(java.math.BigDecimal payAccrualMoney) {
		this.payAccrualMoney = payAccrualMoney;
	}

	public java.math.BigDecimal getFlatMoney() {
		return flatMoney;
	}

	public void setFlatMoney(java.math.BigDecimal flatMoney) {
		this.flatMoney = flatMoney;
	}



	/**
	 * 项目上报时间	 * @return java.util.Date
	 * @hibernate.property column="commitDate" type="java.util.Date" length="19" not-null="true" unique="false"
	 */
	public java.util.Date getCommitDate() {
		return this.commitDate;
	}
	
	/**
	 * Set the commitDate
	 * @spring.validator type="required"
	 */	
	public void setCommitDate(java.util.Date aValue) {
		this.commitDate = aValue;
	}	

	public Short getProjectStatus() {
		return projectStatus;
	}

	public void setProjectStatus(Short projectStatus) {
		this.projectStatus = projectStatus;
	}
	
	public java.math.BigDecimal getProjectMoney() {
		return projectMoney;
	}

	public void setProjectMoney(java.math.BigDecimal projectMoney) {
		this.projectMoney = projectMoney;
	}

	public java.math.BigDecimal getPaychargeMoney() {
		return paychargeMoney;
	}
	public void setPaychargeMoney(java.math.BigDecimal paychargeMoney) {
		this.paychargeMoney = paychargeMoney;
	}
	public java.math.BigDecimal getIncomechargeMoney() {
		return incomechargeMoney;
	}
	public void setIncomechargeMoney(java.math.BigDecimal incomechargeMoney) {
		this.incomechargeMoney = incomechargeMoney;
	}
	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof SlSmallloanProjectIntermediary)) {
			return false;
		}
		SlSmallloanProjectIntermediary rhs = (SlSmallloanProjectIntermediary) object;
		return new EqualsBuilder()
				.append(this.projectId, rhs.projectId)
				.append(this.operationType, rhs.operationType)
				.append(this.flowType, rhs.flowType)
//				.append(this.mineType, rhs.mineType)
//				.append(this.mineId, rhs.mineId)
				//.append(this.oppositeType, rhs.oppositeType)
				.append(this.oppositeID, rhs.oppositeID)
				.append(this.projectName, rhs.projectName)
				.append(this.projectNumber, rhs.projectNumber)
				.append(this.projectMoney, rhs.projectMoney)
				.append(this.loanType, rhs.loanType)
				.append(this.dateMode, rhs.dateMode)
				.append(this.startDate, rhs.startDate)
				.append(this.intentDate, rhs.intentDate)
				.append(this.accrualtype, rhs.accrualtype)
				.append(this.accrual, rhs.accrual)
//				.append(this.payaccrualType, rhs.payaccrualType)
				.append(this.overdueRate, rhs.overdueRate)
				.append(this.isAheadPay, rhs.isAheadPay)
				.append(this.aheadDayNum, rhs.aheadDayNum)
				.append(this.breachRate, rhs.breachRate)
				.append(this.breachMoney, rhs.breachMoney)
				.append(this.commitDate, rhs.commitDate)
				.append(this.projectStatus, rhs.projectStatus)
				.append(this.overdueRateLoan, rhs.overdueRateLoan)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.projectId) 
				.append(this.operationType) 
				.append(this.flowType) 
//				.append(this.mineType) 
//				.append(this.mineId) 
				//.append(this.oppositeType) 
				.append(this.oppositeID) 
				.append(this.projectName) 
				.append(this.projectNumber) 
				.append(this.projectMoney) 
				.append(this.loanType) 
				.append(this.dateMode) 
				.append(this.startDate) 
				.append(this.intentDate) 
				.append(this.accrualtype) 
				.append(this.accrual) 
//				.append(this.payaccrualType) 
				.append(this.overdueRate) 
				.append(this.isAheadPay) 
				.append(this.aheadDayNum) 
				.append(this.breachRate) 
				.append(this.breachMoney) 
				.append(this.commitDate)
				.append(this.projectStatus)
				.append(this.overdueRateLoan)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("projectId", this.projectId) 
				.append("operationType", this.operationType) 
				.append("flowType", this.flowType) 
//				.append("mineType", this.mineType) 
//				.append("mineId", this.mineId) 
			//	.append("oppositeType", this.oppositeType) 
				.append("oppositeID", this.oppositeID) 
				.append("projectName", this.projectName) 
				.append("projectNumber", this.projectNumber)
				.append("projectMoney", this.projectMoney) 
				.append("loanType", this.loanType) 
				.append("dateMode", this.dateMode) 
				.append("startDate", this.startDate) 
				.append("intentDate", this.intentDate) 
				.append("accrualtype", this.accrualtype) 
				.append("accrual", this.accrual) 
//				.append("payaccrualType", this.payaccrualType) 
				.append("overdueRate", this.overdueRate) 
				.append("isAheadPay", this.isAheadPay) 
				.append("aheadDayNum", this.aheadDayNum) 
				.append("breachRate", this.breachRate) 
				.append("breachMoney", this.breachMoney) 
				.append("commitDate", this.commitDate) 
				.append("projectStatus", this.projectStatus)
				.append("overdueRateLoan",this.overdueRateLoan)
				.toString();
	}

//	public String getBusinessType() {
//		return businessType;
//	}
//
//	public void setBusinessType(String businessType) {
//		this.businessType = businessType;
//	}

	public String getOperationType() {
		return operationType;
	}

	public void setOperationType(String operationType) {
		this.operationType = operationType;
	}

	public String getFlowType() {
		return flowType;
	}

	public void setFlowType(String flowType) {
		this.flowType = flowType;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getAppUserName() {
		return appUserName;
	}
	public void setAppUserName(String appUserName) {
		this.appUserName = appUserName;
	}
	public String getInfosourceId() {
		return infosourceId;
	}
	public void setInfosourceId(String infosourceId) {
		this.infosourceId = infosourceId;
	}
	
	//财务对接时项目方款状态 ：0表示未点击放款按钮；1表示已经点击了放款按钮；2表示银行账户错误
	public Short getStates() {
		return states;
	}
	public void setStates(Short states) {
		this.states = states;
	}
	
	public String getBreachComment() {
		return breachComment;
	}
	public void setBreachComment(String breachComment) {
		this.breachComment = breachComment;
	}
	public java.math.BigDecimal getProjectMoneyPass() {
		return projectMoneyPass;
	}
	public void setProjectMoneyPass(java.math.BigDecimal projectMoneyPass) {
		this.projectMoneyPass = projectMoneyPass;
	}
	
	public Short getIsOtherFlow() {
		return isOtherFlow;
	}
	public void setIsOtherFlow(Short isOtherFlow) {
		this.isOtherFlow = isOtherFlow;
	}
	public String getLoanFormsId() {
		return loanFormsId;
	}
	public void setLoanFormsId(String loanFormsId) {
		this.loanFormsId = loanFormsId;
	}
	public String getBusinessCassify() {
		return businessCassify;
	}
	public void setBusinessCassify(String businessCassify) {
		this.businessCassify = businessCassify;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getInvestorIds() {
		return investorIds;
	}
	public void setInvestorIds(String investorIds) {
		this.investorIds = investorIds;
	}
	public Date getLastPresentDate() {
		return lastPresentDate;
	}
	public void setLastPresentDate(Date lastPresentDate) {
		this.lastPresentDate = lastPresentDate;
	}
	public String getAvailableType() {
		return availableType;
	}
	public void setAvailableType(String availableType) {
		this.availableType = availableType;
	}
	public Long getAvailableId() {
		return availableId;
	}
	public void setAvailableId(Long availableId) {
		this.availableId = availableId;
	}
	public String getLaveCredit() {
		return laveCredit;
	}
	public void setLaveCredit(String laveCredit) {
		this.laveCredit = laveCredit;
	}
	public Long getDepartId() {
		return departId;
	}
	public void setDepartId(Long departId) {
		this.departId = departId;
	}
	public Long getBranchId() {
		return branchId;
	}
	public void setBranchId(Long branchId) {
		this.branchId = branchId;
	}
	public String getPurposeTypeStr() {
		return purposeTypeStr;
	}
	public void setPurposeTypeStr(String purposeTypeStr) {
		this.purposeTypeStr = purposeTypeStr;
	}
	public Long getBankId() {
		return bankId;
	}
	public void setBankId(Long bankId) {
		this.bankId = bankId;
	}
	public String getChildType() {
		return childType;
	}
	public void setChildType(String childType) {
		this.childType = childType;
	}
	public java.math.BigDecimal getExamineProjectMoney() {
		return examineProjectMoney;
	}
	public void setExamineProjectMoney(java.math.BigDecimal examineProjectMoney) {
		this.examineProjectMoney = examineProjectMoney;
	}
	public void setPersonNum(String personNum) {
		this.personNum = personNum;
	}
	public String getPersonNum() {
		return personNum;
	}
	public Short getOverdueReceiveWay() {
		return overdueReceiveWay;
	}
	public void setOverdueReceiveWay(Short overdueReceiveWay) {
		this.overdueReceiveWay = overdueReceiveWay;
	}
	public Short getPenaltyReceiveWay() {
		return penaltyReceiveWay;
	}
	public void setPenaltyReceiveWay(Short penaltyReceiveWay) {
		this.penaltyReceiveWay = penaltyReceiveWay;
	}
	public BigDecimal getPenaltyReceiveRate() {
		return penaltyReceiveRate;
	}
	public void setPenaltyReceiveRate(BigDecimal penaltyReceiveRate) {
		this.penaltyReceiveRate = penaltyReceiveRate;
	}
	public Short getPrepayMoney() {
		return prepayMoney;
	}
	public void setPrepayMoney(Short prepayMoney) {
		this.prepayMoney = prepayMoney;
	}
	public BigDecimal getPrepayMoneyRate() {
		return prepayMoneyRate;
	}
	public void setPrepayMoneyRate(BigDecimal prepayMoneyRate) {
		this.prepayMoneyRate = prepayMoneyRate;
	}
	public Short getDepositsReleaseWay() {
		return depositsReleaseWay;
	}
	public void setDepositsReleaseWay(Short depositsReleaseWay) {
		this.depositsReleaseWay = depositsReleaseWay;
	}
	public Short getCreditfreedType() {
		return creditfreedType;
	}
	public void setCreditfreedType(Short creditfreedType) {
		this.creditfreedType = creditfreedType;
	}
	public java.math.BigDecimal getSecondProjectMoney() {
		return secondProjectMoney;
	}
	public void setSecondProjectMoney(java.math.BigDecimal secondProjectMoney) {
		this.secondProjectMoney = secondProjectMoney;
	}
	public int getPrepayRateTypeA() {
		return prepayRateTypeA;
	}
	public void setPrepayRateTypeA(int prepayRateTypeA) {
		this.prepayRateTypeA = prepayRateTypeA;
	}
	public int getPrepayRateTypeB() {
		return prepayRateTypeB;
	}
	public void setPrepayRateTypeB(int prepayRateTypeB) {
		this.prepayRateTypeB = prepayRateTypeB;
	}
	public String getIsActualDay() {
		return isActualDay;
	}
	public void setIsActualDay(String isActualDay) {
		this.isActualDay = isActualDay;
	}
}