package com.zhiwei.credit.core.project.impl;



import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.DateUtil;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;
import com.zhiwei.credit.model.creditFlow.fund.project.BpFundProject;
import com.zhiwei.credit.model.creditFlow.smallLoan.finance.SlEarlyRepaymentRecord;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;

public class FundPrepaymentFundIntentCreate {
	private  static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	
	/**
	 * 本金放贷
	 */
	public static final String ProjectLoadOut = "principalLending";
	/**
	 * 保证金
	 */
	public static final String ProjectRisk = "riskRate";
	/**
	 * 利息
	 */
	public static final String ProjectLoadAccrual = "loanInterest";
	/**
	 * 管理咨询费用收取
	 */
	public static final String ProjectManagementConsulting = "consultationMoney";
	/**
	 * 财务服务费用收取
	 */
	public static final String ProjectFinanceService = "serviceMoney";
	/**
	 * 余额管理费(随息收取，剩余本金*余额管理费率)
	 */
	public static final String ProjectSurplusManage = "surplusManageMoney";
	/**
	 * 本金偿还
	 */
	public static final String ProjectLoadRoot = "principalRepayment";
	/**
	 * 罚息
	 */
	public static final String ProjectInterestPenalty = "interestPenalty";
	/**
	 * 费用退回
	 */
	public static final String projectBackInterest="backInterest";
	/**
	 * 30天
	 */
	public BigDecimal thirty = new BigDecimal(30); 
	/**
	 * 还款方式
	 */
	private String  accrualType;
	/**
	 * 还款周期
	 */
	private String payaccrualType;
	/**
	 * 提前还款日期
	 */
	private Date earlyDate;
	/**
	 * 提前还款金额
	 */
	private BigDecimal earlyProjectMoney;
	/**
	 * 计息开始日期
	 */
	private Date startDate;
	/**
	 * 计息截止日期
	 */
	private Date intentDate;
	/**
	 * 咨询管理费
	 */
	private BigDecimal managementConsultingOfRate=new BigDecimal(0);
	/**
	 * 财务服务费
	 */
	private BigDecimal financeServiceOfRate=new BigDecimal(0);
	/**
	 * 利率
	 */
	private BigDecimal accrual=new BigDecimal(0);
	/**
	 * 合计利率
	 */
	private BigDecimal sumAccrual=new BigDecimal(0);
	/**
	 * 贷款金额
	 */
	private BigDecimal projectMoney;
	/**
	 * 是否前置付息 0否,1 是
	 */
	private Integer isPreposePayAccrual;
	/**
	 * 还款期数
	 */
	private Integer payintentPeriod;
	/**
	 * 是否按实际天数
	 */
	private String isActualDay;
	/**
	 * 是否按还款日还款
	 */
	private String isStartDatePay;
	/**
	 * 是否一次性支付利息  0否 	1 是
	 */
	private Integer isInterestByOneTime;
	/**
	 * 自定义天数
	 */
	private Integer dayOfEveryPeriod;
	/**
	 * 提前还款利息收取方式：0按提前还款金额、1按合同金额收取
	 */
	private Short prepayMoney;
	/**
	 * 违约金利率
	 */
	private BigDecimal prepayMoneyRate;
	/**
	 * 合同金额
	 */
	private BigDecimal projectMoneyPass;
	/**
	 * 提前还款利息收取方式：不足?天,按实际发生天数收,否则整日收
	 */
	private int prepayRateTypeA=0;
	/**
	 * 提前还款利息收取方式：最低收?天利息
	 */
	private int prepayRateTypeB=0;
	/**
	 * 放款日期
	 */
	private Date loanDate;
	/**
	 * 业务类型
	 */
	private String businessType;
	/**
	 * 项目Id
	 */
	private Long projectId;
	/**
	 * 项目名称
	 */
	private String projectName;
	/**
	 * 项目编号
	 */
	private String projectNumber;

	private String isHaveLin="no";
	/**
	 * 计划到账日
	 */
	private Date afterDate;
	
	private Date beforeDate;
	
	private Integer allPayintentPeriod;
	
	private String isccalculateFirstAndEnd;
	
	private SlFundIntent slFundIntent;
	
	/**
	 * 构造方法1
	 * @param project
	 * @param slEarlyRepaymentRecord
	 * @param payintentPeriod
	 * @param afterDate
	 * @param beforeDate
	 * @param principalMoney
	 * @param bf
	 */
	public FundPrepaymentFundIntentCreate(BpFundProject project,SlEarlyRepaymentRecord slEarlyRepaymentRecord,Integer payintentPeriod,Date afterDate,Date beforeDate,BigDecimal principalMoney,SlFundIntent bf){
		accrualType=project.getAccrualtype();
		payaccrualType=project.getPayaccrualType();
		earlyDate=slEarlyRepaymentRecord.getEarlyDate();
		earlyProjectMoney=slEarlyRepaymentRecord.getEarlyProjectMoney();
		startDate=project.getStartDate();
		intentDate=project.getIntentDate();
		if(null!=project.getManagementConsultingOfRate()){
			managementConsultingOfRate=project.getManagementConsultingOfRate();
		}
		if(null!=project.getFinanceServiceOfRate()){
			financeServiceOfRate=project.getFinanceServiceOfRate();
		}
		if(null!=project.getAccrual()){
			accrual=project.getAccrual();
		}
		sumAccrual=this.accrual.add( this.managementConsultingOfRate).add( this.financeServiceOfRate);
		allPayintentPeriod=project.getPayintentPeriod();
		isPreposePayAccrual=project.getIsPreposePayAccrual();
		businessType=project.getBusinessType();
		projectId=project.getProjectId();
		projectName=project.getProjectName();
		projectNumber=project.getProjectNumber();
		isStartDatePay=project.getIsStartDatePay();
		isInterestByOneTime=project.getIsInterestByOneTime();
		dayOfEveryPeriod=project.getDayOfEveryPeriod();
		isActualDay="yes";
		this.afterDate=afterDate;
		this.beforeDate=beforeDate;
		this.isccalculateFirstAndEnd=AppUtil.getInterest();  //算头不算尾0 算头又算尾1 AppUtil.getInterest()
		this.payintentPeriod=payintentPeriod;
		this.slFundIntent=bf;
		this.projectMoney=project.getOwnJointMoney().subtract(principalMoney); 
	}  
	
	/**
	 * 构造方法2
	 * @param project
	 * @param slEarlyRepaymentRecord
	 * @param payintentPeriod
	 * @param afterDate
	 * @param beforeDate
	 * @param principalMoney
	 * @param bf
	 * @param slSmallloanProject
	 */
	public FundPrepaymentFundIntentCreate(BpFundProject project,SlEarlyRepaymentRecord slEarlyRepaymentRecord,Integer payintentPeriod,Date afterDate,Date beforeDate,BigDecimal principalMoney,SlFundIntent bf,SlSmallloanProject slSmallloanProject){
		accrualType=project.getAccrualtype();
		payaccrualType=project.getPayaccrualType();
		earlyDate=slEarlyRepaymentRecord.getEarlyDate();
		earlyProjectMoney=slEarlyRepaymentRecord.getEarlyProjectMoney();
		
		startDate=project.getStartDate();
		intentDate=project.getIntentDate();
		if(null!=project.getManagementConsultingOfRate()){
			managementConsultingOfRate=project.getManagementConsultingOfRate();
		}
		if(null!=project.getFinanceServiceOfRate()){
			financeServiceOfRate=project.getFinanceServiceOfRate();
		}
		if(null!=project.getAccrual()){
			accrual=project.getAccrual();
		}
		sumAccrual=this.accrual.add( this.managementConsultingOfRate).add( this.financeServiceOfRate);
		
		allPayintentPeriod=project.getPayintentPeriod();
		isPreposePayAccrual=project.getIsPreposePayAccrual();
		businessType=project.getBusinessType();
		projectId=project.getProjectId();
		projectName=project.getProjectName();
		projectNumber=project.getProjectNumber();
		isStartDatePay=project.getIsStartDatePay();
		isInterestByOneTime=project.getIsInterestByOneTime();
		dayOfEveryPeriod=project.getDayOfEveryPeriod();
		isActualDay=slSmallloanProject.getIsActualDay();
		prepayMoney=slSmallloanProject.getPrepayMoney();
		prepayMoneyRate=slSmallloanProject.getPrepayMoneyRate();
		projectMoneyPass=slEarlyRepaymentRecord.getSurplusProjectMoney();
//		projectMoneyPass=slSmallloanProject.getProjectMoneyPass();
		prepayRateTypeA=slSmallloanProject.getPrepayRateTypeA();
		prepayRateTypeB=slSmallloanProject.getPrepayRateTypeB();
		loanDate=slSmallloanProject.getStartDate();
		
		this.afterDate=afterDate;
		this.beforeDate=beforeDate;
		this.isccalculateFirstAndEnd=AppUtil.getInterest();  //算头不算尾0 算头又算尾1 AppUtil.getInterest()
		this.payintentPeriod=payintentPeriod;
		this.slFundIntent=bf;
		this.projectMoney=project.getOwnJointMoney().subtract(principalMoney); 
	}  
	

    public void create(List<SlFundIntent> list){
	    BigDecimal breachMoney=new BigDecimal("0");//提前还款违约金
	    //根据提前还款利息收取方式：0按提前还款金额、1按合同金额收取  计算提前还款违约金
	    if(null!=prepayMoney && 0==prepayMoney){
		    breachMoney=earlyProjectMoney.multiply(this.prepayMoneyRate.divide(BigDecimal.valueOf(100),5,BigDecimal.ROUND_HALF_UP));
	    }else if(null!=prepayMoney && 1==prepayMoney){
		    breachMoney=projectMoneyPass.multiply(this.prepayMoneyRate.divide(BigDecimal.valueOf(100),5,BigDecimal.ROUND_HALF_UP));
	    }
	    //如果提前还款违约金>0则生成一条款项
	    if(breachMoney.compareTo(new BigDecimal(0))>0){
		   SlFundIntent sf=calculslfundintent(ProjectInterestPenalty,this.earlyDate,earlyDate,intentDate,BigDecimal.valueOf(0),breachMoney,payintentPeriod);
		   list.add(sf);
	    }
	    //生成一条提前还款本金偿还记录
	    if(earlyProjectMoney.compareTo(new BigDecimal(0))!=0){
	    	SlFundIntent sf=calculslfundintent(ProjectLoadRoot,this.earlyDate,beforeDate,earlyDate,BigDecimal.valueOf(0),earlyProjectMoney,payintentPeriod);
	    	list.add(sf);
	    	
	    }
		BigDecimal everybaseMoney=projectMoney.subtract(earlyProjectMoney);//剩余本金
		//判断是否是前置付息(0否,1是)
		if(isPreposePayAccrual==0){
			// 不管是不是一次性都走一下四行代码 公共代码开始
			if(earlyDate.compareTo(afterDate)!=0){
				//本期提前还款日之前的利息
				thirty=earlyRepaymentInterest();
				createList(list,this.earlyDate,beforeDate,earlyDate,projectMoney,payintentPeriod);
				//本期提起还款日之后的利息
				thirty=this.getfirstPerioddays(earlyDate,afterDate );
				createList(list,afterDate,earlyDate,afterDate,everybaseMoney,payintentPeriod);
			}
		}else{
			BigDecimal days=this.getfirstPerioddays(beforeDate, afterDate);
			//正常情况下收取的全部的利息+各种服务费之和
			BigDecimal allMoney=this.projectMoney.multiply(this.accrual.add(this.managementConsultingOfRate).add(this.financeServiceOfRate)).divide(new BigDecimal(3000),5,BigDecimal.ROUND_HALF_UP).multiply(days);
		    //计息开始日期至提前还款日期应收的利息+各种服务费之和
			BigDecimal money1=this.projectMoney.multiply(this.accrual.add(this.managementConsultingOfRate).add(this.financeServiceOfRate)).divide(new BigDecimal(3000),5,BigDecimal.ROUND_HALF_UP).multiply(this.getfirstPerioddays(beforeDate, earlyDate));
		    //未提前还款的本金应收取的利息+各种服务费之和
			BigDecimal money2=everybaseMoney.multiply(this.accrual.add(this.managementConsultingOfRate).add(this.financeServiceOfRate)).divide(new BigDecimal(3000),5,BigDecimal.ROUND_HALF_UP).multiply(this.getfirstPerioddays(earlyDate,afterDate ));
		    //生成退费的一条款项
			SlFundIntent s=calculslfundintent(projectBackInterest,this.earlyDate,beforeDate,afterDate,allMoney.subtract(money1).subtract(money2),BigDecimal.valueOf(0),payintentPeriod);
			if(s.getPayMoney().compareTo(new BigDecimal(0))!=0){
				list.add(s);
			}
		}
	    //等本等息，用得30（*3或*12）*日化利率 即按期算利息(用实际日期没意义，要的就是等本等息。没有有固定日需要日化*实际天数，没有算头算尾加一天)
	    if(accrualType.equals("sameprincipalsameInterest") && payaccrualType.equals("monthPay")){//等本等息，按月
	   		createOfSameprincipalsameInterestAndMonthPay(list);
	   	}
	    if (accrualType.equals("sameprincipalsameInterest") && payaccrualType.equals("seasonPay")){//等本等息，按季
	    	createOfSameprincipalsameInterestAndSeasonPay(list);
	    }
	    if (accrualType.equals("sameprincipalsameInterest") && payaccrualType.equals("yearPay")){//等本等息，按年
	    	createOfSameprincipalsameInterestAndYearPay(list);
	   	}
	    if (accrualType.equals("sameprincipalsameInterest") && payaccrualType.equals("dayPay")){//等本等息，按日
	   		createOfSameprincipalsameInterestAndDayPay(list);
	    }
	    if (accrualType.equals("sameprincipalsameInterest") && payaccrualType.equals("owerPay")){//等本等息，按自定义
	   		createOfSameprincipalsameInterestAndOwerPay(list);
	   	}
	   	//按期收息，到期还本，用的是每期的实际日期（开始日期-结束日期）*日化利率即按实际天数算利息（可以乘30天，算头算尾加一天）
		if (accrualType.equals("singleInterest") && payaccrualType.equals("monthPay")) {//按期收息，按月
			createOfSingleInterestAndMonthPay(list);
	   	}
		if (accrualType.equals("singleInterest") && payaccrualType.equals("seasonPay")) {// 按期收息，按季
			createOfSingleInterestAndSeasonPay(list);
	   	}
		if (accrualType.equals("singleInterest") && payaccrualType.equals("yearPay")) {// 按期收息，按年
			createOfSingleInterestAndYearPay(list);
	   	}
		if (accrualType.equals("singleInterest") && payaccrualType.equals("dayPay")) {// 按期收息，按日
	   		createOfSingleInterestAndDayPay(list);
	   	}
		if (accrualType.equals("singleInterest") && payaccrualType.equals("owerPay")) {// 按期收息，按自定义
			createOfSingleInterestAndOwerPay(list);
	   	}
		//等本本金，用得30*日化利率 即按期算利息,实际天数没意义
		if (accrualType.equals("sameprincipal") && payaccrualType.equals("monthPay")) {// 等额本金，按月
			createOfSameprincipalAndMonthPay(list);
		}
		//等额本息，用得30*日化利率 即按期算利息，实际天数没意义
		if (accrualType.equals("sameprincipalandInterest") && payaccrualType.equals("monthPay")) {//等额本息， 按月
   		    createOfSameprincipalandInterestAndMonthPay(list);
    	}
    }
    
    /**
     * 等额本息， 按月
     * @param list
     */
    public void createOfSameprincipalandInterestAndMonthPay(List<SlFundIntent> list){
		try{
			BigDecimal everybaseMoney=projectMoney.subtract(earlyProjectMoney);
			/*if(null!=this.slFundIntent && earlyDate.compareTo(afterDate)!=0){
				SlFundIntent bf1=this.slFundIntent;
				if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
					list.add(bf1);
				}
				everybaseMoney=everybaseMoney.subtract(bf1.getIncomeMoney());
			}*/
			Integer period=allPayintentPeriod-payintentPeriod;
			BigDecimal periodtimemoney=periodtimemoney(this.sumAccrual.divide(new BigDecimal(100)),everybaseMoney,period).divide(new BigDecimal(1),5,BigDecimal.ROUND_HALF_UP);
			/**
			 * 日对日   非一次性
			 */
			if(isStartDatePay.equals("2") && isInterestByOneTime == 0){
				if(everybaseMoney.compareTo(new BigDecimal(0))==1){
//					BigDecimal money=everybaseMoney.multiply(this.accrual.multiply(thirty).divide(BigDecimal.valueOf(3000),10,BigDecimal.ROUND_HALF_UP)).setScale(2,BigDecimal.ROUND_HALF_UP);
//					BigDecimal bjmoney=periodtimemoney.subtract(money);
					//剩余金额
					SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,afterDate,earlyDate,afterDate,BigDecimal.valueOf(0),everybaseMoney.setScale(5,BigDecimal.ROUND_HALF_UP),payintentPeriod);
					if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))>0){
						list.add(bf1);
					}
				}
				for(int i=payintentPeriod+1;i<=allPayintentPeriod;i++){
					Date edate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, i), -1);
					Date lastintentDate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, i-1), -1);
					this.thirty=new BigDecimal(30);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i);
					BigDecimal money=everybaseMoney.multiply(this.sumAccrual.divide(new BigDecimal(100)));
					BigDecimal bjmoney=periodtimemoney.subtract(money);
					//剩余金额
					SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,BigDecimal.valueOf(0),bjmoney.setScale(5,BigDecimal.ROUND_HALF_UP),i);
					if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))>0){
						list.add(bf1);
					}
					everybaseMoney=everybaseMoney.subtract(bjmoney);
				}
			}
			if(isStartDatePay.equals("1") && isInterestByOneTime==0){
				for(int i=1;i<=allPayintentPeriod-payintentPeriod-1;i++){
					Date edate=DateUtil.addMonthsToDate(afterDate, i);
					Date lastintentDate=DateUtil.addMonthsToDate(afterDate, i-1);
					this.thirty=new BigDecimal(30);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i+payintentPeriod);
					BigDecimal money=everybaseMoney.multiply(this.sumAccrual.divide(new BigDecimal(100)));
					BigDecimal bjmoney=periodtimemoney.subtract(money);
					SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,BigDecimal.valueOf(0),bjmoney.setScale(5,BigDecimal.ROUND_HALF_UP),i+1);
					if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
						list.add(bf1);
					}
					everybaseMoney=everybaseMoney.subtract(bjmoney);
				}
				Date sdate=DateUtil.addMonthsToDate(afterDate, allPayintentPeriod-payintentPeriod-1);
				thirty=this.getfirstPerioddays(sdate,intentDate );
				createList(list,(isPreposePayAccrual==0?intentDate:sdate),sdate,intentDate,everybaseMoney,allPayintentPeriod);
				BigDecimal comsumDayaccrualMoney=everybaseMoney.multiply(this.sumAccrual.divide(new BigDecimal(100)));
				BigDecimal bjmoney=periodtimemoney.subtract(comsumDayaccrualMoney);
				SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?intentDate:sdate),sdate,intentDate,BigDecimal.valueOf(0),bjmoney,allPayintentPeriod);
				if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
					list.add(bf1);
				}
				everybaseMoney=everybaseMoney.subtract(bjmoney);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
    
    /**
     * 等额本金，按月
     * @param list
     */
    public void createOfSameprincipalAndMonthPay(List<SlFundIntent> list){
		try{
			BigDecimal everybaseMoney=projectMoney.subtract(earlyProjectMoney);
			Integer period=allPayintentPeriod-payintentPeriod;
			if(earlyDate.compareTo(afterDate)!=0){
				period=period+1;
			}
			BigDecimal sameMoney=everybaseMoney.divide(new BigDecimal(period),5,BigDecimal.ROUND_HALF_UP);
			if(earlyDate.compareTo(afterDate)!=0){
				SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?afterDate:beforeDate),beforeDate,afterDate,BigDecimal.valueOf(0),sameMoney,payintentPeriod);
				if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
					list.add(bf1);
				}
				everybaseMoney=everybaseMoney.subtract(sameMoney);
			}
			/**
			 * 日对日   非一次性
			 */
			if(isStartDatePay.equals("2") && isInterestByOneTime == 0){
				for(int i=payintentPeriod+1;i<=allPayintentPeriod;i++){
					Date edate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, i),-1);
					Date lastintentDate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, i-1),-1);
					this.thirty=getActualdays(lastintentDate,edate,0,i);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i);
					//剩余金额
					SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,BigDecimal.valueOf(0),sameMoney,i);
					if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
						list.add(bf1);
					}
					everybaseMoney=everybaseMoney.subtract(sameMoney);
				}
			}
			if(isStartDatePay.equals("1") && isInterestByOneTime==0){
				for(int i=1;i<=allPayintentPeriod-payintentPeriod-1;i++){
					Date edate=DateUtil.addMonthsToDate(afterDate, i);
					Date lastintentDate=DateUtil.addMonthsToDate(afterDate, i-1);
					thirty=getActualdays(lastintentDate,edate,0,i);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i+payintentPeriod);
					SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,BigDecimal.valueOf(0),sameMoney,i+1);
					if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
						list.add(bf1);
					}
					everybaseMoney=everybaseMoney.subtract(sameMoney);
				}
				Date sdate=DateUtil.addMonthsToDate(afterDate, allPayintentPeriod-payintentPeriod-1);
				thirty=this.getfirstPerioddays(sdate,intentDate );
				createList(list,(isPreposePayAccrual==0?intentDate:sdate),sdate,intentDate,everybaseMoney,allPayintentPeriod);
				SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?intentDate:sdate),sdate,intentDate,BigDecimal.valueOf(0),sameMoney,allPayintentPeriod);
				if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
					list.add(bf1);
				}
				everybaseMoney=everybaseMoney.subtract(sameMoney);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
    
    /**
     * 等本等息，按日
     * @param list
     */
    public void createOfSameprincipalsameInterestAndDayPay(List<SlFundIntent> list){
		try{
			BigDecimal everybaseMoney=projectMoney.subtract(earlyProjectMoney);
			/**
			 * 日对日   非一次性
			 */
			Integer period=allPayintentPeriod-payintentPeriod;
			if(earlyDate.compareTo(afterDate)!=0){
				period=period+1;
			}
			BigDecimal sameMoney=everybaseMoney.divide(new BigDecimal(period),5,BigDecimal.ROUND_HALF_UP);
			if(isStartDatePay.equals("2") && isInterestByOneTime == 0){
				for(int i=payintentPeriod+1;i<=allPayintentPeriod;i++){
					Date edate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, i),-1);
					Date lastintentDate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, i-1),-1);
					thirty=BigDecimal.valueOf(1);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i);
					SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,BigDecimal.valueOf(0),sameMoney,i);
					if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
						list.add(bf1);
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
    
    /**
     * 等本等息，按月
     * @param list
     */
    public void createOfSameprincipalsameInterestAndMonthPay(List<SlFundIntent> list){
		try{
			BigDecimal everybaseMoney=projectMoney.subtract(earlyProjectMoney);
			Integer period=allPayintentPeriod-payintentPeriod;
			if(earlyDate.compareTo(afterDate)!=0){
				period=period+1;
			}
			BigDecimal sameMoney=everybaseMoney.divide(new BigDecimal(period),5,BigDecimal.ROUND_HALF_UP);
			if(earlyDate.compareTo(afterDate)!=0){
				SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?afterDate:DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, payintentPeriod-1),-1)),earlyDate,afterDate,BigDecimal.valueOf(0),sameMoney,payintentPeriod);
				if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
					list.add(bf1);
				}
			}
			/**
			 * 日对日   非一次性
			 */
			if(isStartDatePay.equals("2") && isInterestByOneTime == 0){
				for(int i=payintentPeriod+1;i<=allPayintentPeriod;i++){
					Date edate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, i),-1);
					Date lastintentDate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, i-1),-1);
					thirty=BigDecimal.valueOf(30);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i);
					SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,BigDecimal.valueOf(0),sameMoney,i);
					if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
						list.add(bf1);
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}

    /**
     * 等本等息，按季
     * @param list
     */
    public void createOfSameprincipalsameInterestAndSeasonPay(List<SlFundIntent> list){
		try{
			BigDecimal everybaseMoney=projectMoney.subtract(earlyProjectMoney);
			Integer period=allPayintentPeriod-payintentPeriod;
			if(earlyDate.compareTo(afterDate)!=0){
				period=period+1;
			}
			BigDecimal sameMoney=everybaseMoney.divide(new BigDecimal(period),5,BigDecimal.ROUND_HALF_UP);
			if(earlyDate.compareTo(afterDate)!=0){
				SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?afterDate:DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, (payintentPeriod-1)*3),-1)),earlyDate,afterDate,BigDecimal.valueOf(0),sameMoney,payintentPeriod);
				if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
					list.add(bf1);
				}
			}
			/**
			 * 日对日   非一次性
			 */
			if(isStartDatePay.equals("2") && isInterestByOneTime == 0){
				for(int i=payintentPeriod+1;i<=allPayintentPeriod;i++){
					Date edate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, i*3),-1);
					Date lastintentDate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, (i-1)*3),-1);
					thirty=BigDecimal.valueOf(90);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i);
					SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,BigDecimal.valueOf(0),sameMoney,i);
					if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
						list.add(bf1);
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
    
    /**
     * 等本等息，按年
     * @param list
     */
    public void createOfSameprincipalsameInterestAndYearPay(List<SlFundIntent> list){
		try{
			BigDecimal everybaseMoney=projectMoney.subtract(earlyProjectMoney);
			Integer period=allPayintentPeriod-payintentPeriod;
			if(earlyDate.compareTo(afterDate)!=0){
				period=period+1;
			}
			BigDecimal sameMoney=everybaseMoney.divide(new BigDecimal(period),5,BigDecimal.ROUND_HALF_UP);
			if(earlyDate.compareTo(afterDate)!=0){
				SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?afterDate:DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, (payintentPeriod-1)*12),-1)),earlyDate,afterDate,BigDecimal.valueOf(0),sameMoney,payintentPeriod);
				if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
					list.add(bf1);
				}
			}
			/**
			 * 日对日   非一次性
			 */
			if(isStartDatePay.equals("2") && isInterestByOneTime == 0){
				for(int i=payintentPeriod+1;i<=allPayintentPeriod;i++){
					Date edate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, i*12),-1);
					Date lastintentDate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, (i-1)*12),-1);
					thirty=BigDecimal.valueOf(360);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i);
					SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,BigDecimal.valueOf(0),sameMoney,i);
					if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
						list.add(bf1);
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
    
    /**
     * 等本等息，按自定义
     * @param list
     */
    public void createOfSameprincipalsameInterestAndOwerPay(List<SlFundIntent> list){
		try{
			BigDecimal everybaseMoney=projectMoney.subtract(earlyProjectMoney);
			if(isPreposePayAccrual==0){
				Integer period=allPayintentPeriod-payintentPeriod;
				if(earlyDate.compareTo(afterDate)!=0){
					period=period+1;
				}
				BigDecimal sameMoney=everybaseMoney.divide(new BigDecimal(period),5,BigDecimal.ROUND_HALF_UP);
				if(earlyDate.compareTo(afterDate)!=0){
					SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?afterDate:DateUtil.addDaysToDate(startDate, (payintentPeriod-1)*this.dayOfEveryPeriod)),earlyDate,afterDate,BigDecimal.valueOf(0),sameMoney,payintentPeriod);
					if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
						list.add(bf1);
					}
				}
				/**
				 * 日对日   非一次性
				 */
				if(isStartDatePay.equals("2") && isInterestByOneTime == 0){
					for(int i=payintentPeriod+1;i<=allPayintentPeriod;i++){
						Date edate=DateUtil.addDaysToDate(startDate, i*this.dayOfEveryPeriod);
						Date lastintentDate=DateUtil.addDaysToDate(startDate, (i-1)*this.dayOfEveryPeriod);
						thirty=BigDecimal.valueOf(this.dayOfEveryPeriod);
						createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i);
						SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,BigDecimal.valueOf(0),sameMoney,i);
						if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
							list.add(bf1);
						}
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
    
    /**
     * 按期收息，按月
     * @param list
     */
	public void createOfSingleInterestAndMonthPay(List<SlFundIntent> list){
		try{
			BigDecimal everybaseMoney=projectMoney.subtract(earlyProjectMoney);
			/**
			 * 日对日   非一次性
			 */
			if(isStartDatePay.equals("2") && isInterestByOneTime == 0){
				for(int i=payintentPeriod+1;i<=allPayintentPeriod;i++){
					Date edate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, i),-1);
					Date lastintentDate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, i-1),-1);
					thirty=getActualdays(lastintentDate,edate,1,i);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i);
				}
			}
			if(isStartDatePay.equals("1") && isInterestByOneTime==0){
				for(int i=1;i<=allPayintentPeriod-payintentPeriod-1;i++){
					Date edate=DateUtil.addMonthsToDate(afterDate, i);
					Date lastintentDate=DateUtil.addMonthsToDate(afterDate, i-1);
					thirty=getActualdays(lastintentDate,edate,1,i);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i+payintentPeriod);
				}
				Date sdate=DateUtil.addMonthsToDate(afterDate, allPayintentPeriod-payintentPeriod-1);
				thirty=this.getfirstPerioddays(sdate,intentDate );
				createList(list,(isPreposePayAccrual==0?intentDate:sdate),sdate,intentDate,everybaseMoney,allPayintentPeriod);
			}
			//剩余金额
			SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,intentDate,startDate,intentDate,BigDecimal.valueOf(0),everybaseMoney,allPayintentPeriod);
			if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
				list.add(bf1);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 按期收息，按季
	 * @param list
	 */
	public void createOfSingleInterestAndSeasonPay(List<SlFundIntent> list){
		try{
			BigDecimal everybaseMoney=projectMoney.subtract(earlyProjectMoney);
			/**
			 * 日对日   非一次性
			 */
			if(isStartDatePay.equals("2") && isInterestByOneTime == 0){
				for(int i=payintentPeriod+1;i<=allPayintentPeriod;i++){
					Date edate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, i*3),-1);
					Date lastintentDate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(startDate, (i-1)*3),-1);
					thirty=getActualdays(lastintentDate,edate,3,i);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i);
				}
			}
			if(isStartDatePay.equals("1") && isInterestByOneTime==0){
				for(int i=1;i<=allPayintentPeriod-payintentPeriod-1;i++){
					Date edate=DateUtil.addMonthsToDate(afterDate, i*3);
					Date lastintentDate=DateUtil.addMonthsToDate(afterDate, (i-1)*3);
					thirty=getActualdays(lastintentDate,edate,3,i);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i+payintentPeriod);
				}
				Date sdate=DateUtil.addMonthsToDate(afterDate, (allPayintentPeriod-payintentPeriod-1)*3);
				thirty=this.getfirstPerioddays(sdate,intentDate );
				createList(list,(isPreposePayAccrual==0?intentDate:sdate),sdate,intentDate,everybaseMoney,allPayintentPeriod);
			}
			//剩余金额
			SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,intentDate,startDate,intentDate,BigDecimal.valueOf(0),everybaseMoney,allPayintentPeriod);
			if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
				list.add(bf1);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 按期收息，按年
	 * @param list
	 */
	public void createOfSingleInterestAndYearPay(List<SlFundIntent> list){
		try{
			BigDecimal everybaseMoney=projectMoney.subtract(earlyProjectMoney);
			/**
			 * 日对日   非一次性
			 */
			if(isStartDatePay.equals("2") && isInterestByOneTime == 0){
				for(int i=payintentPeriod+1;i<=allPayintentPeriod;i++){
					Date edate=DateUtil.addMonthsToDate(startDate, i*12,-1);
					Date lastintentDate=DateUtil.addMonthsToDate(startDate, (i-1)*12,-1);
					thirty=getActualdays(lastintentDate,edate,12,i);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i);
				}
			}
			if(isStartDatePay.equals("1") && isInterestByOneTime==0){
				for(int i=1;i<=allPayintentPeriod-payintentPeriod-1;i++){
					Date edate=DateUtil.addMonthsToDate(afterDate, i*12);
					Date lastintentDate=DateUtil.addMonthsToDate(afterDate, (i-1)*12);
					thirty=getActualdays(lastintentDate,edate,12,i);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i+payintentPeriod);
				}
				Date sdate=DateUtil.addMonthsToDate(afterDate, (allPayintentPeriod-payintentPeriod-1)*12);
				thirty=this.getfirstPerioddays(sdate,intentDate );
				createList(list,(isPreposePayAccrual==0?intentDate:sdate),sdate,intentDate,everybaseMoney,allPayintentPeriod);
			}
			//剩余金额
			SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,intentDate,startDate,intentDate,BigDecimal.valueOf(0),everybaseMoney,allPayintentPeriod);
			if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
				list.add(bf1);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 按期收息，按日
	 * @param list
	 */
	public void createOfSingleInterestAndDayPay(List<SlFundIntent> list){
		try{
			BigDecimal everybaseMoney=projectMoney.subtract(earlyProjectMoney);
			/**
			 * 日对日   非一次性
			 */
			if(isStartDatePay.equals("2") && isInterestByOneTime == 0){
				for(int i=payintentPeriod+1;i<=allPayintentPeriod;i++){
					Date edate=DateUtil.addDaysToDate(startDate, i);
					Date lastintentDate=DateUtil.addDaysToDate(startDate, i-1);
					thirty=getDayfirstPerioddays(new BigDecimal(1),i);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i);
				}
			}
			//剩余金额
			SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,intentDate,startDate,intentDate,BigDecimal.valueOf(0),everybaseMoney,allPayintentPeriod);
			if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
				list.add(bf1);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 按期收息，按自定义
	 * @param list
	 */
	public void createOfSingleInterestAndOwerPay(List<SlFundIntent> list){
		try{
			BigDecimal everybaseMoney=projectMoney.subtract(earlyProjectMoney);
			/**
			 * 日对日   非一次性
			 */
			if(isStartDatePay.equals("2") && isInterestByOneTime == 0){
				for(int i=payintentPeriod+1;i<=allPayintentPeriod;i++){
					Date edate=DateUtil.addDaysToDate(startDate, i*dayOfEveryPeriod);
					Date lastintentDate=DateUtil.addDaysToDate(startDate, (i-1)*dayOfEveryPeriod);
					thirty=getDayfirstPerioddays(new BigDecimal(dayOfEveryPeriod),i);
					createList(list,(isPreposePayAccrual==0?edate:lastintentDate),lastintentDate,edate,everybaseMoney,i);
				}
			}
			//剩余金额
			SlFundIntent bf1=calculslfundintent(ProjectLoadRoot,intentDate,startDate,intentDate,BigDecimal.valueOf(0),everybaseMoney,allPayintentPeriod);
			if(bf1.getIncomeMoney().compareTo(new BigDecimal(0))!=0){
				list.add(bf1);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 通用方法
	 * @param list
	 * @param intentdate
	 * @param lastintentDate
	 * @param nextintentDate
	 * @param everybaseMoney
	 * @param payintentPeriod
	 */
	public void createList(List<SlFundIntent> list,Date intentdate,Date lastintentDate,Date nextintentDate,BigDecimal everybaseMoney,Integer payintentPeriod){
		SlFundIntent sf1 = calculslfundintent(ProjectLoadAccrual,intentdate,lastintentDate,nextintentDate,BigDecimal.valueOf(0),everybaseMoney.multiply(this.accrual.multiply(thirty).divide(BigDecimal.valueOf(3000),10,BigDecimal.ROUND_HALF_UP)).setScale(2,BigDecimal.ROUND_HALF_UP),payintentPeriod) ;
		SlFundIntent sf2 = calculslfundintent(ProjectManagementConsulting,intentdate,lastintentDate,nextintentDate,BigDecimal.valueOf(0), everybaseMoney.multiply(this.managementConsultingOfRate.multiply(thirty).divide(BigDecimal.valueOf(3000),10,BigDecimal.ROUND_HALF_UP)).setScale(2,BigDecimal.ROUND_HALF_UP),payintentPeriod);
		SlFundIntent sf3 = calculslfundintent(ProjectFinanceService,intentdate,lastintentDate,nextintentDate,BigDecimal.valueOf(0), everybaseMoney.multiply(this.financeServiceOfRate.multiply(thirty).divide(BigDecimal.valueOf(3000),10,BigDecimal.ROUND_HALF_UP)).setScale(2,BigDecimal.ROUND_HALF_UP),payintentPeriod);
		if(sf1.getIncomeMoney().compareTo(new BigDecimal(0))>0){
			list.add(sf1);
		}
		if(sf2.getIncomeMoney().compareTo(new BigDecimal(0))>0){
			list.add(sf2);
		}
		if(sf3.getIncomeMoney().compareTo(new BigDecimal(0))>0){
			list.add(sf3);
		}
	}
	
    public  BigDecimal periodtimemoney(BigDecimal accrual,BigDecimal projectMoney,int period) {
		BigDecimal   periodtimemoney=new  BigDecimal("0");
		periodtimemoney=projectMoney.multiply(accrual).multiply(mnfang(accrual.add(new BigDecimal(1)),period)).divide((mnfang(accrual.add(new BigDecimal(1)),period).subtract(new BigDecimal(1))),100,BigDecimal.ROUND_HALF_UP);
		return periodtimemoney;
	}
    
    public  BigDecimal mnfang(BigDecimal m,int n){
		BigDecimal s=m;
		for(int i=1;i<n;i++){
			s=s.multiply(m);
		}
		return s;
	}
	
    /**
     * 通用方法
     * @param fundType
     * @param intentdate
     * @param lastintentDate
     * @param nextintentDate
     * @param paymoney
     * @param incomemoeny
     * @param payintentPeriod
     * @return
     */
	public  SlFundIntent calculslfundintent(String fundType,Date intentdate,Date lastintentDate,Date nextintentDate,BigDecimal paymoney,BigDecimal incomemoeny,int payintentPeriod){
		SlFundIntent sf1=new SlFundIntent();
		sf1.setFundType(fundType);// 资金类型
		sf1.setIntentDate(intentdate);
		sf1.setPayMoney(paymoney); // 支出金额
		sf1.setIncomeMoney(incomemoeny); // 收入金额
		sf1.setAfterMoney(new BigDecimal("0"));
		sf1.setFlatMoney(new BigDecimal("0"));
		sf1.setAccrualMoney(new BigDecimal("0"));
		sf1.setNotMoney(paymoney.compareTo(new BigDecimal("0"))==0?incomemoeny:paymoney);
		sf1.setRemark("");
		sf1.setBusinessType(businessType);
		sf1.setPayintentPeriod(payintentPeriod);
		sf1.setProjectId(projectId);
		sf1.setProjectName(projectName);
		sf1.setProjectNumber(projectNumber);
	    Date interestStarTime=null;
	    Date interestEndTime=null;
	    
	    if(!fundType.equals("principalLending")){
	    	if(payintentPeriod==0){
		    	isHaveLin="yes";
		    }
		    if(this.isccalculateFirstAndEnd.equals("0")){
		    	if(this.isPreposePayAccrual==0){
		    		interestStarTime=lastintentDate;
		    	    interestEndTime=DateUtil.addDaysToDate(nextintentDate,-1);
		    	}else{
		    		interestStarTime=intentdate;
		    		interestEndTime=DateUtil.addDaysToDate(nextintentDate,-1);
		    	}
		    	if(fundType.equals("principalRepayment")&& accrualType.equals("singleInterest")){
			    	interestStarTime=startDate;
			    	interestEndTime=DateUtil.addDaysToDate(nextintentDate,-1);;
			    }
		    }else{
		    	if(this.isPreposePayAccrual==0){
		    		if(intentdate.equals(startDate) || (isHaveLin.equals("no")&&payintentPeriod==1)|| (isHaveLin.equals("yes")&&payintentPeriod==0)){
		    			interestStarTime=lastintentDate;  //第一期的时候不减加一天
		    		}else{
		    		   interestStarTime=DateUtil.addDaysToDate(lastintentDate,1);
		    		}
		    		interestEndTime=nextintentDate;
			    }else{
		    		if(intentdate.equals(startDate)|| (isHaveLin.equals("no")&&payintentPeriod==1)|| (isHaveLin.equals("yes")&&payintentPeriod==0)){
		    			interestStarTime=lastintentDate;  //第一期的时候不加一天
		    		}else{
		    		   interestStarTime=DateUtil.addDaysToDate(lastintentDate,1);
		    		}
		    		interestEndTime=nextintentDate;
			    }
		    	if(fundType.equals("principalRepayment")&& accrualType.equals("singleInterest")){
			    	interestStarTime=startDate;
			    	interestEndTime=nextintentDate;
			    }
		    }
		    sf1.setInterestStarTime(interestStarTime);
			sf1.setInterestEndTime(interestEndTime);
	    }
		return  sf1;
	}

	/**
	 * 单利，循环体里面计算天数（其中对日有算头算尾)
	 * @param startactualdate
	 * @param endctualdate
	 * @param n
	 * @param payintentPeriod
	 * @return
	 */
	public BigDecimal getActualdays(Date startactualdate,Date endctualdate,int n,int payintentPeriod){
		BigDecimal actualdays=new BigDecimal(Integer.valueOf(DateUtil.getDaysBetweenDate( sdf.format(startactualdate), sdf.format(endctualdate))).toString());
		if("no".equals(isActualDay)){
			actualdays=new BigDecimal("30").multiply(new BigDecimal(n));
		}else{
			if(this.isccalculateFirstAndEnd.equals("1")){ //对日，会走这里
				if(startactualdate.equals(startDate)){
					actualdays=actualdays.add(new BigDecimal(1));
				}
			}
		}
		return actualdays;
	}
	
	/**
	 * 单利（日，自定义）首期的天数(都有算头算尾)
	 * @param actualdays
	 * @param payintentPeriod
	 * @return
	 */
	public BigDecimal getDayfirstPerioddays(BigDecimal actualdays,int payintentPeriod ){
		if(this.isccalculateFirstAndEnd.equals("1")){ //对日，会走这里
			if(payintentPeriod==1){
				actualdays=actualdays.add(new BigDecimal(1));
			}
		}
		return actualdays;
	}
	
	/**
	 * 固定日（单利，等额本金，等额本息）首期的天数(都有算头算尾)
	 * @param startactualdate
	 * @param endctualdate
	 * @return
	 */
	public BigDecimal getfirstPerioddays(Date startactualdate,Date endctualdate){
		BigDecimal actualdays=new BigDecimal(Integer.valueOf(DateUtil.getDaysBetweenDate( sdf.format(startactualdate), sdf.format(endctualdate))).toString());
		if(this.isccalculateFirstAndEnd.equals("1")){ //对日，会走这里
			if(startactualdate.equals(startDate)){
				actualdays=actualdays.add(new BigDecimal(1));
			}
		}
		return actualdays;
	}
	
    /**
     * 通过计算两种产品配置的提前还款的方式多收取的利息，比较大小后返回应该计算的天数
     * @return
     */
    public  BigDecimal earlyRepaymentInterest() {
    	BigDecimal  interestDays=new BigDecimal("0");
    	
    	if(new BigDecimal(prepayRateTypeA).compareTo(new BigDecimal("0"))>0){//配置了 每期的计息起日与提前还款日期对比，如果小于等于？天，按实际发生日算，大于？天按一个月算
    		BigDecimal  interestDays1=this.getfirstPerioddays(beforeDate, earlyDate).add(new BigDecimal("1"));
    		if(interestDays1.compareTo(new BigDecimal(prepayRateTypeA) )>0){
    			interestDays=new BigDecimal("30");
        	}else{
        		interestDays=interestDays1;
        	}
    	}
    	if(new BigDecimal(prepayRateTypeB).compareTo(new BigDecimal("0"))>0){//配置了 （最低收?天利息）
    		//2、最少缴纳?天利息（?天内提前还款也收?天，超过?天按实际发生日计算）
    		BigDecimal  interestDays2=this.getfirstPerioddays(loanDate, earlyDate).add(new BigDecimal("1"));
    		if(interestDays2.compareTo(new BigDecimal(prepayRateTypeB) )>0){
    			interestDays=interestDays2;
        	}else{
        		interestDays=new BigDecimal(prepayRateTypeB);
        	}
    	}
	    return interestDays;
	}
}