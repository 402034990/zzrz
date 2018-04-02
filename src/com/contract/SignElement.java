package com.contract;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.Test;

import com.credit.proj.entity.ProcreditMortgage;
import com.credit.proj.entity.ProcreditMortgageBusiness;
import com.credit.proj.entity.ProcreditMortgageBusinessandlive;
import com.credit.proj.entity.ProcreditMortgageEducation;
import com.credit.proj.entity.ProcreditMortgageHouse;
import com.credit.proj.entity.ProcreditMortgageHouseground;
import com.credit.proj.entity.ProcreditMortgageIndustry;
import com.credit.proj.entity.ProcreditMortgageOfficebuilding;
import com.credit.proj.entity.VProjMortBusAndLive;
import com.credit.proj.entity.VProjMortBusiness;
import com.credit.proj.entity.VProjMortHouseGround;
import com.credit.proj.entity.VProjMortIndustry;
import com.credit.proj.entity.VProjMortOfficeBuilding;
import com.credit.proj.entity.VProjMortProduct;
import com.credit.proj.mortgage.business.service.BusinessServMort;
import com.credit.proj.mortgage.businessandlive.service.BusinessandliveService;
import com.credit.proj.mortgage.houseground.service.HousegroundService;
import com.credit.proj.mortgage.industry.service.IndustryService;
import com.credit.proj.mortgage.officebuilding.service.OfficebuildingService;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.DateUtil;
import com.zhiwei.credit.core.commons.CreditBaseDao;
import com.zhiwei.credit.core.util.MoneyFormat;
import com.zhiwei.credit.model.creditFlow.common.CsBank;
import com.zhiwei.credit.model.creditFlow.contract.Element;
import com.zhiwei.credit.model.creditFlow.contract.ProcreditContract;
import com.zhiwei.credit.model.creditFlow.customer.common.EnterpriseBank;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.Enterprise;
import com.zhiwei.credit.model.creditFlow.customer.person.Person;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;
import com.zhiwei.credit.model.creditFlow.finance.SlPunishInterest;
import com.zhiwei.credit.model.creditFlow.smallLoan.finance.SlEarlyRepaymentRecord;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;
import com.zhiwei.credit.model.creditFlow.smallLoan.supervise.SlSuperviseRecord;
import com.zhiwei.credit.model.system.Dictionary;
import com.zhiwei.credit.service.creditFlow.common.CsBankService;
import com.zhiwei.credit.service.creditFlow.contract.ProcreditContractService;
import com.zhiwei.credit.service.creditFlow.customer.common.EnterpriseBankService;
import com.zhiwei.credit.service.creditFlow.finance.SlActualToChargeService;
import com.zhiwei.credit.service.creditFlow.finance.SlFundIntentService;
import com.zhiwei.credit.service.creditFlow.finance.SlPunishInterestService;
import com.zhiwei.credit.service.creditFlow.smallLoan.finance.SlEarlyRepaymentRecordService;
import com.zhiwei.credit.service.creditFlow.smallLoan.supervise.SlSuperviseRecordService;
import com.zhiwei.credit.util.financeUtil.FundIntentComparator;

import edu.emory.mathcs.backport.java.util.Collections;

/**
 * 该类主要实现为系统要素中需要为计算的要素赋值提供统一入口
 * @author zhangcb
 *
 */
public class SignElement {
	
	private List<?> list1=null;
	
	private List<SlFundIntent> listloanInterest=null;
	
	private List<SlFundIntent>	listprincipalt=null;
	
	@Resource
	private IndustryService industryService;
	@Resource
	private BusinessServMort businessServMort;
	@Resource
	private HousegroundService housegroundService;
	@Resource
	private SlFundIntentService slFundIntentService;
	@Resource
	private OfficebuildingService officebuildingService;
	@Resource
	private BusinessandliveService businessandliveService;
	@Resource
	private SlActualToChargeService slActualToChargeService;
	@Resource
	private SlPunishInterestService slPunishInterestService;
	@Resource
	private SlSuperviseRecordService slSuperviseRecordService;
	@Resource
	private ProcreditContractService procreditContractService;
	@Resource
	private SlEarlyRepaymentRecordService slEarlyRepaymentRecordService;
	
	private static SimpleDateFormat sd=new SimpleDateFormat("yyyy-MM-dd");
	
	private static DecimalFormat myFormatter = new DecimalFormat("####.#");
	
	/**
	 * 为系统要素赋值
	 * @param project    项目信息
	 * @param map        需要计算的要素集合
	 * @param contractId 合同id
	 * @param list  存放要素的集合
	 */
	public void signElementValue(SlSmallloanProject project,CreditBaseDao baseDao,Map<String,Element> map,int contractId,List<Element> list){
		try {
			ProcreditContract contract=null;//合同主体
			ProcreditMortgage mortgage=null;//抵质押物、担保
			SlSuperviseRecord slSuperviseRecord=null;//展期记录
			BigDecimal totalCharge=new BigDecimal(0);//展期手续费总额
			BigDecimal ruiService=new BigDecimal(0);//睿本管理费
			DateFormat format2= new SimpleDateFormat("yyyy年MM月dd日 ");
			Iterator<?> ite=map.keySet().iterator();
			String depict=null;
//			for(int i=0;i<list.size();i++){        
//				System.out.println(list.get(i).getDepict()+"-------费用类型");
//				if("管理费".equals(list.get(i).getDepict())){
//					if(list.get(i).getValue()!=null&&!"".equals(list.get(i).getValue())){
//						ruiService=new BigDecimal(list.get(i).getValue());
//					}
//				}
//			}
			while(ite.hasNext()){
				Element element=map.get(ite.next());
				depict=element.getDepict();
				System.out.println("要素名称==="+depict);
				if("币种".equals(depict) && null!=project.getCurrency()){
					Dictionary dictionary =(Dictionary)baseDao.getById(Dictionary.class,project.getCurrency());
					if(null!=dictionary){
						element.setValue(dictionary.getItemValue());
					}
				}
				if("借款用途".equals(depict) && null!=project.getPurposeType()){
					Dictionary dictionary =(Dictionary)baseDao.getById(Dictionary.class,project.getPurposeType());
					if(null!=dictionary){
						element.setValue(dictionary.getItemValue());
					}
				}
				if("担保方式".equals(depict) && null!=project.getAssuretypeid()){
					Dictionary dictionary =(Dictionary)baseDao.getById(Dictionary.class,project.getAssuretypeid());
					if(null!=dictionary){
						element.setValue(dictionary.getItemValue());
					}
				}
				if("当前日期".equals(depict)){
					element.setValue(format2.format(new Date()));
				}
				if("贷款月利率".equals(depict)){
					element.setValue(project.getAccrual().setScale(2,RoundingMode.HALF_UP)+BaseConstants.DWLL);
				}
				if("贷款日利率".equals(depict)){
					element.setValue(project.getDayAccrualRate().setScale(2,RoundingMode.HALF_UP)+BaseConstants.DWLL);
				}
				if("贷款年利率".equals(depict)){
					element.setValue(project.getYearAccrualRate().setScale(2,RoundingMode.HALF_UP)+BaseConstants.DWLL);
				}
				if("贷款金额大写".equals(depict) || "贷款金额小写".equals(depict)){
					BigDecimal projectMoney = project.getProjectMoney();
					if("贷款金额大写".equals(depict)){
						element.setValue(MoneyFormat.getInstance().hangeToBig(projectMoney)/*+BaseConstants.DWDX*/);
					}else if("贷款金额小写".equals(depict)){
						element.setValue(myFormatter.format(projectMoney).toString()+BaseConstants.DWXX);
					}
				}
				if("等本贷款本金小写".equals(depict) || "等本贷款本金大写".equals(depict)){
					BigDecimal dengbdkje= new BigDecimal(0);
					BigDecimal projectMoney = project.getProjectMoney();
					BigDecimal	periodMoney=slFundIntentService.getByProjectId5(project.getProjectId(),"SmallLoan");
					// 月息
					BigDecimal  payintentPeriod=new BigDecimal(project.getPayintentPeriod());
					dengbdkje=(projectMoney.add(periodMoney.multiply(payintentPeriod)));
					if("等本贷款本金大写".equals(depict)){
						element.setValue(MoneyFormat.getInstance().hangeToBig(dengbdkje)/*+BaseConstants.DWDX*/);
					}else if("等本贷款本金小写".equals(depict)){
						element.setValue(myFormatter.format(dengbdkje).toString()+BaseConstants.DWXX);
					}
				}
				if("贷款到期日期".equals(depict)){
					if(project.getAccrualtype().equals("ontTimeAccrual")){
						element.setValue(format2.format(project.getIntentDate()));
					}else{
						if(project.getPayaccrualType().equals("monthPay")){
							Date intentDate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(project.getStartDate(),project.getPayintentPeriod()),-1);
							element.setValue(format2.format(intentDate));
						}else if(project.getPayaccrualType().equals("monthPay")){
							Date intentDate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(project.getStartDate(),project.getPayintentPeriod()*3),-1);
							element.setValue(format2.format(intentDate));
						}else if(project.getPayaccrualType().equals("yearPay")){
							Date intentDate=DateUtil.addDaysToDate(DateUtil.addMonthsToDate(project.getStartDate(),project.getPayintentPeriod()*12),-1);
							element.setValue(format2.format(intentDate));
						}else if(project.getPayaccrualType().equals("dayPay")){
							Date intentDate=DateUtil.addDaysToDate(project.getStartDate(),project.getPayintentPeriod()-1);
							element.setValue(format2.format(intentDate));
						}else if(project.getPayaccrualType().equals("owerPay")){
							Date intentDate=DateUtil.addDaysToDate(project.getStartDate(),project.getPayintentPeriod()*project.getDayOfEveryPeriod()-1);
							element.setValue(format2.format(intentDate));
						}
					}
				}
				if("贷款起始日期".equals(depict)){
					element.setValue(format2.format(project.getStartDate()));
				}
				if("每期还款日".equals(depict)){
					String st=sd.format(project.getIntentDate()).toString();
					String sr[]=st.split("-");
					String so=sr[2];
//					st=sr.getClass(sr.length-1);
					element.setValue(so);
				}
				if("贷款期限".equals(depict) && null!=project.getPayaccrualType() && null!=project.getPayintentPeriod()){
					if(project.getPayaccrualType().equals("monthPay")){
						element.setValue(project.getPayintentPeriod()+BaseConstants.DWQX1);
					}else if(project.getPayaccrualType().equals("seasonPay")){
						element.setValue(project.getPayintentPeriod()*3+BaseConstants.DWQX1);
					}else if(project.getPayaccrualType().equals("yearPay")){
						element.setValue(project.getPayintentPeriod()*12+BaseConstants.DWQX1);
					}else if(project.getPayaccrualType().equals("dayPay")){
						element.setValue(project.getPayintentPeriod()+BaseConstants.DWQX2);
					}else if(project.getPayaccrualType().equals("owerPay")){
						if(null!=project.getDayOfEveryPeriod()){
							 element.setValue(project.getPayintentPeriod()*project.getDayOfEveryPeriod()+BaseConstants.DWQX2);
						}
					}
				}
				if("还款方式".equals(depict) && null!=project.getAccrualtype()){
					if("sameprincipal".equals(project.getAccrualtype())) {
						element.setValue(BaseConstants.HKFS1);
					}else if ("sameprincipalandInterest".equals(project.getAccrualtype())){
						element.setValue(BaseConstants.HKFS2);
					}else if ("singleInterest".equals(project.getAccrualtype())){
						element.setValue(BaseConstants.HKFS3);
					}else if ("ontTimeAccrual".equals(project.getAccrualtype())){
						element.setValue(BaseConstants.HKFS4);
					}
				}
				if("违约金".equals(depict) && null!=project.getAccrualtype()){
					if("sameprincipalsameInterest".equals(project.getAccrualtype())) {  //等本等息
						BigDecimal projectMoney = project.getProjectMoney();
						element.setValue((projectMoney.multiply(new BigDecimal(0.08))).setScale(2,BigDecimal.ROUND_HALF_UP).toString());
						
					}else if ("singleInterest".equals(project.getAccrualtype())){ // 先息后本 (按期收息到期还本)
						BigDecimal projectMoney = project.getProjectMoney();
						element.setValue((projectMoney.multiply(new BigDecimal(0.008))).setScale(2,BigDecimal.ROUND_HALF_UP).toString());
					}
				}
				if("先息贷款日期一".equals(depict)){
					List<SlFundIntent> fundPayList7=slFundIntentService.getByProjectId7(project.getProjectId(),"SmallLoan");
					fundPayList7.get(1).getIntentDate();
					System.out.println("先息一期计划到账日=="+fundPayList7.get(1).getIntentDate());
					String s1=format2.format(fundPayList7.get(1).getIntentDate()).toString();
					element.setValue(s1);
					
				}
				if("先息贷款日期二".equals(depict)){
					List<SlFundIntent> fundPayList7=slFundIntentService.getByProjectId7(project.getProjectId(),"SmallLoan");
					if(fundPayList7.size()>2){
						System.out.println("先息二期计划到账日=="+fundPayList7.get(2).getIntentDate());
						String s2=format2.format(fundPayList7.get(2).getIntentDate()).toString();
						element.setValue(s2);
					}
				}
				if("先息贷款日期三".equals(depict)){
					String s3=format2.format(project.getIntentDate()).toString();
					element.setValue(s3);
				}
				if("先息贷款金额一".equals(depict)){
					BigDecimal loanMoney1=slFundIntentService.getByProjectId8(project.getProjectId(), "SmallLoan", 1);
					System.out.println("先息一期计划到账日金额=="+loanMoney1);
					element.setValue(loanMoney1.toString()+BaseConstants.DWXX);
				}
				if("先息贷款金额二".equals(depict)){
					BigDecimal loanMoney2=slFundIntentService.getByProjectId8(project.getProjectId(), "SmallLoan", 2);
					System.out.println("先息二期计划到账日金额=="+loanMoney2);
					element.setValue(loanMoney2.toString()+BaseConstants.DWXX);
				}
				if("先息贷款金额三".equals(depict)){
//					BigDecimal loanMoney3=slFundIntentService.getByProjectId8(project.getProjectId(), "SmallLoan", 3);
//					System.out.println("先息三期计划到账日金额=="+loanMoney3);
					element.setValue(project.getProjectMoney()+BaseConstants.DWXX);
				}
				if("违约金大写".equals(depict) && null!=project.getAccrualtype()){
					Double weiyue = 0.00;
					if("sameprincipalsameInterest".equals(project.getAccrualtype())) {  //等本等息
						BigDecimal projectMoney = project.getProjectMoney();
						weiyue=(projectMoney.multiply(new BigDecimal(0.08))).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						element.setValue(MoneyFormat.getInstance().hangeToBig(new BigDecimal(weiyue))/*+BaseConstants.DWDX*/);
						
					}else if ("singleInterest".equals(project.getAccrualtype())){ // 先息后本 (按期收息到期还本)
						BigDecimal projectMoney = project.getProjectMoney();
						weiyue=(projectMoney.multiply(new BigDecimal(0.008))).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						element.setValue(MoneyFormat.getInstance().hangeToBig(new BigDecimal(weiyue))/*+BaseConstants.DWDX*/);
					}
				}
				if("贷款余额小写".equals(depict) || "贷款余额大写".equals(depict)){
					Double yueMoney = 0.0;
					if(null!=project.getProjectMoney() && null!=project.getPayProjectMoney()){
						Double projectMoney = project.getProjectMoney().doubleValue();
						Double payProjectMoney = project.getPayProjectMoney().doubleValue();
						yueMoney = projectMoney - payProjectMoney;
						if("贷款余额小写".equals(depict)){
							element.setValue(yueMoney.toString()+BaseConstants.DWXX);
						}else if("贷款余额大写".equals(depict)){
							element.setValue(MoneyFormat.getInstance().hangeToBig(new BigDecimal(yueMoney))+BaseConstants.DWDX);
						}
					}
				}
				if("期还本息总额小写".equals(depict) || "期还本息总额大写".equals(depict)){
					BigDecimal periodMoney = BigDecimal.ZERO;
					BigDecimal dengbdkje= BigDecimal.ZERO;
					periodMoney=slFundIntentService.getByProjectId5(project.getProjectId(),"SmallLoan");
					List<SlFundIntent> fundPayList=slFundIntentService.getByProjectId4(project.getProjectId(),"SmallLoan");
					BigDecimal projectMoney = project.getProjectMoney();
					if("sameprincipalsameInterest".equals(project.getAccrualtype())){ // 客户要求 等本等息加上利息
//						// 第一期的本金
//						projectMoney=slFundIntentService.getByProjectId6(project.getProjectId(),"SmallLoan");
//						//第一期的本息和
//						projectMoney=projectMoney.add(periodMoney);
						periodMoney= new BigDecimal(0);
						List<SlFundIntent> fundPayList1=slFundIntentService.getByProjectId4(project.getProjectId(),"SmallLoan");
						Collections.sort(fundPayList1,new FundIntentComparator());
						for(SlFundIntent sfi : fundPayList){
							if(sfi.getPayintentPeriod()==null){
								continue;
							}
							if(sfi.getFundType().equals("loanInterest")){
								periodMoney = periodMoney.add(sfi.getIncomeMoney());
							}
						}
						BigDecimal payintentPeriod=new BigDecimal(project.getPayintentPeriod());
						dengbdkje=(((projectMoney.add(periodMoney))).divide(payintentPeriod, 2, RoundingMode.HALF_UP));
						projectMoney=dengbdkje;
					}
					if("期还本息总额小写".equals(depict)){
						element.setValue(projectMoney.setScale(2,BigDecimal.ROUND_HALF_UP).toString());
					}else if("期还本息总额大写".equals(depict)){
						element.setValue(MoneyFormat.getInstance().hangeToBig(projectMoney.setScale(2,BigDecimal.ROUND_CEILING)));
					}
				}
				if("财务服务费总额小写".equals(depict) || "财务服务费总额大写".equals(depict)){
					BigDecimal cwfwfMoney = BigDecimal.ZERO;
					List<SlFundIntent> fundPayList=slFundIntentService.getByProjectId4(project.getProjectId(),"SmallLoan");
					Collections.sort(fundPayList,new FundIntentComparator());
					for(SlFundIntent sfi : fundPayList){
						if(sfi.getPayintentPeriod()==null){
							continue;
						}
						if(sfi.getFundType().equals("serviceMoney")){
							cwfwfMoney = cwfwfMoney.add(sfi.getIncomeMoney());
						}
					}
					if("财务服务费总额小写".equals(depict)){
						element.setValue(cwfwfMoney.setScale(0,BigDecimal.ROUND_UP).toString());
					}else if("财务服务费总额大写".equals(depict)){
						element.setValue(MoneyFormat.getInstance().hangeToBig(cwfwfMoney.setScale(2,BigDecimal.ROUND_CEILING)));
					}
				}
				if("月还本息一天罚息".equals(depict) || "月还本息十天罚息".equals(depict) || "月还本息逾期违约金".equals(depict)){
					BigDecimal period = new BigDecimal(project.getPayintentPeriod()).setScale(2);
					BigDecimal monthpayMoney = project.getProjectMoney().divide(period,2,BigDecimal.ROUND_HALF_UP).add(project.getProjectMoney().multiply(project.getAccrual()).divide(new BigDecimal(100)));
					BigDecimal monthpayMoneyRoundUp = monthpayMoney.setScale(0, BigDecimal.ROUND_UP);
					if("月还本息一天罚息".equals(depict)){
						element.setValue(monthpayMoneyRoundUp.multiply(new BigDecimal(0.0075)).setScale(2, BigDecimal.ROUND_UP).toString());
					}else if("月还本息十天罚息".equals(depict)){
						element.setValue(monthpayMoneyRoundUp.multiply(new BigDecimal(0.075)).setScale(2, BigDecimal.ROUND_UP).toString());
					}else if("月还本息逾期违约金".equals(depict)){
						element.setValue(((monthpayMoneyRoundUp.divide(new BigDecimal(10))).compareTo(new BigDecimal(100))>0?monthpayMoneyRoundUp.divide(new BigDecimal(10)).setScale(2, BigDecimal.ROUND_UP):new BigDecimal(100)).toString());
					}
				}
				boolean flag1=("利息余额大写".equals(depict) || "利息余额小写".equals(depict));
				boolean flag2=("罚息余额大写".equals(depict) || "罚息余额小写".equals(depict));
				boolean flag3=("合计余额大写".equals(depict) || "合计余额小写".equals(depict));
				if(flag1 || flag2 || flag3){
					//本金余额
					BigDecimal  principalMoney=new BigDecimal("0");
					//利息余额
					BigDecimal  loanInterestMoney=new BigDecimal("0");
					//罚息余额
					BigDecimal  punishMoney=new BigDecimal("0");
					//合计余额
					BigDecimal  sumMoney=new BigDecimal("0");
					if(null==listloanInterest){
						listloanInterest=slFundIntentService.listbyOwe("SmallLoan",project.getProjectId(), "('loanInterest','consultationMoney','serviceMoney')");
					}
					for(SlFundIntent inte:listloanInterest){
						loanInterestMoney=loanInterestMoney.add(inte.getNotMoney());
						if("罚息余额大写".equals(depict) || "罚息余额小写".equals(depict)){
							List<SlPunishInterest> listpunish=slPunishInterestService.listbyisInitialorId(inte.getFundIntentId(),"0");
							for(SlPunishInterest pun:listpunish){
								punishMoney=punishMoney.add(pun.getNotMoney());
							}
						}
					}
					if(null==listprincipalt){
						listprincipalt=slFundIntentService.listbyOwe("SmallLoan",project.getProjectId(), "('principalRepayment')");
					}
					for(SlFundIntent pri:listprincipalt){
						principalMoney=principalMoney.add(pri.getNotMoney());
						if("罚息余额大写".equals(depict) || "罚息余额小写".equals(depict)){
							List<SlPunishInterest> listpunish=slPunishInterestService.listbyisInitialorId(pri.getFundIntentId(),"0");
							for(SlPunishInterest pun:listpunish){
								punishMoney=punishMoney.add(pun.getNotMoney());
							}	
						}
					}
					if("利息余额大写".equals(depict)){
						element.setValue(loanInterestMoney.doubleValue()==0?BaseConstants.DWDX2:MoneyFormat.getInstance().hangeToBig(loanInterestMoney)+BaseConstants.DWDX);
					}else if("利息余额小写".equals(depict)){
						element.setValue(loanInterestMoney.doubleValue()+BaseConstants.DWXX);
					}else if("罚息余额大写".equals(depict)){
						element.setValue(punishMoney.doubleValue()==0?BaseConstants.DWDX2:MoneyFormat.getInstance().hangeToBig(punishMoney)+BaseConstants.DWDX);
					}else if("罚息余额小写".equals(depict)){
						element.setValue(punishMoney.doubleValue()+BaseConstants.DWXX);
					}else if("合计余额大写".equals(depict)){
						element.setValue(sumMoney.doubleValue()==0?BaseConstants.DWDX2:MoneyFormat.getInstance().hangeToBig(sumMoney)+BaseConstants.DWDX);
					}else if("利息余额小写".equals(depict)){
						element.setValue(sumMoney.toString()+BaseConstants.DWXX);
					}
				}
				
				if("提前还款种类".equals(depict)){
					List<SlEarlyRepaymentRecord> elist=slEarlyRepaymentRecordService.getByProjectId(project.getProjectId());
					if(null!=elist && elist.size()>0){
						SlEarlyRepaymentRecord slEarlyRepaymentRecord=elist.get(0);
						if(slEarlyRepaymentRecord.getEarlyProjectMoney().compareTo(project.getProjectMoney())==0){
							element.setValue("全部提前结清");
						}else{
							element.setValue("部分提前还款");
						}
					}
				}
				
				//展期信息
				if("展期金额大写".equals(depict) || "展期金额".equals(depict)){
					if(null==slSuperviseRecord){
//						slSuperviseRecord=slSuperviseRecordService.get(project.getClauseId());
					}
					if(null!=slSuperviseRecord){
						if("展期金额大写".equals(depict)){
							element.setValue(MoneyFormat.getInstance().hangeToBig(slSuperviseRecord.getContinuationMoney())+BaseConstants.DWDX);
						}else if("展期金额".equals(depict)){
							element.setValue(myFormatter.format(slSuperviseRecord.getContinuationMoney())+BaseConstants.DWXX);
						}
					}
				}
				
				if("展期手续费率".equals(depict) || "展期手续费大写".equals(depict) || "展期手续费小写".equals(depict)){
					/*if(totalCharge.compareTo(new BigDecimal(0))==0){
						List<SlActualToCharge>  chargeList=slActualToChargeService.getlistbyslSuperviseRecordId(project.getClauseId(),project.getBusinessType(),project.getProjectId());
						for(SlActualToCharge c:chargeList){
							if(null!=c.getIncomeMoney() && !"".equals(c.getIncomeMoney())){
								totalCharge=totalCharge.add(c.getIncomeMoney());
							}else{
								totalCharge=totalCharge.add(new BigDecimal(c.getChargeStandard()));
							}
						}
					}
					if(null==slSuperviseRecord){
						slSuperviseRecord=slSuperviseRecordService.get(project.getClauseId());
					}*/
					if(null!=slSuperviseRecord){
						if("展期手续费大写".equals(depict)){
							element.setValue(MoneyFormat.getInstance().hangeToBig(totalCharge));
						}else if("展期手续费小写".equals(depict)){
							element.setValue(myFormatter.format(totalCharge.doubleValue())+BaseConstants.DWXX);
						}else if("展期手续费率".equals(depict)){
							element.setValue(totalCharge.multiply(new BigDecimal(100)).divide(slSuperviseRecord.getContinuationMoney(),2)+BaseConstants.DWLL);
						}
					}
				}
				if(null==contract){
					contract=procreditContractService.getById(contractId);
				}
				if("借款合同编号".equals(depict)){
					//1.如果生成的合同恰好是借款合同则直接读取
					if(BaseConstants.LOANCONTRACT.equals(contract.getHtType())){
						element.setValue(contract.getContractNumber());
					}else{
					//2.生成其他类的合同时默认读取该项目下的第一条借款合同编号
						QueryFilter filter =new QueryFilter();
						filter.addFilter("Q_projId_S_EQ",project.getProjectId());
						filter.addFilter("Q_htType_S_EQ",BaseConstants.LOANCONTRACT);
						List<ProcreditContract> loanList=procreditContractService.getAll(filter);
						if(null!=loanList && loanList.size()>0){
							element.setValue(loanList.get(0).getContractNumber());
						}
					}
				}
				if(null!=contract){
//					if(null==mortgage){
//						mortgage=(ProcreditMortgage)baseDao.getById(ProcreditMortgage.class,contract.getMortgageId());
//					}
					mortgage=(ProcreditMortgage)baseDao.getById(ProcreditMortgage.class,contract.getMortgageId());
					if(null!=mortgage){
						if(BaseConstants.BZID2==mortgage.getPersonType()){//保证人——个人
							Person p=(Person)baseDao.getById(Person.class,mortgage.getAssureofname());
							if(null!=p){
								if(("保证人证件种类".equals(depict) || "出质人证件种类".equals(depict) || "抵押人证件种类".equals(depict)) && null!=p.getCardtype()){
									Dictionary dic=(Dictionary)baseDao.getById(Dictionary.class,Long.valueOf(p.getCardtype()));
									if(null!=dic){
										element.setValue(dic.getItemValue());
									}
								}
								if("保证人电话".equals(depict) || "出质人电话".equals(depict) || "抵押人电话".equals(depict)){
									if(null!= p.getCellphone() && !"".equals(p.getCellphone())){
										element.setValue(p.getCellphone());
									}
									if(null!= p.getTelphone() && !"".equals(p.getTelphone())){
										if(null!=element.getValue() && !"".equals(element.getValue())){
											element.setValue(element.getValue()+"/"+p.getTelphone());
										}else{
											element.setValue(p.getTelphone());
										}
									}
								}
								if("保证人账号开户行".equals(depict) || "保证人银行账号".equals(depict)){
									EnterpriseBankService ebankService=(EnterpriseBankService)AppUtil.getBean("enterpriseBankService");
									if(null!=ebankService){
										List<EnterpriseBank> bankList = ebankService.getBankList(p.getId(),(short)1,(short)0,(short)0);
										if(bankList!=null && bankList.size()>0){
											EnterpriseBank ebank = bankList.get(0);
											if(null!=ebank && null!=ebank.getBankid()){
												CsBankService cbankService=(CsBankService)AppUtil.getBean("csBankService");
												CsBank cBank = cbankService.get(ebank.getBankid());
												if(null!=cBank){
													if(ebank.getBankOutletsName()!=null&&cBank.getBankname()!=null){
														element.setValue(cBank.getBankname()+" "+ebank.getBankOutletsName());
													}
												}
											}
										}
									}
								}
							}
						}else if(BaseConstants.BZID1==mortgage.getPersonType()){//保证人——企业
							Enterprise e=(Enterprise)baseDao.getById(Enterprise.class,mortgage.getAssureofname());
							if(null!=e){
								Person p=(Person)baseDao.getById(Person.class,e.getLegalpersonid());
								if(null!=p){
									if("保证人证件种类".equals(depict) || "出质人证件种类".equals(depict) || "抵押人证件种类".equals(depict)){
										Dictionary	dic=(Dictionary)baseDao.getById(Dictionary.class,Long.valueOf(p.getCardtype()));
										element.setValue(dic.getItemValue());
									}
									if(("保证方法定代表人职务".equals(depict) || "出质方法定代表人职务".equals(depict) || "抵押方法定代表人职务".equals(depict)) && null!=p.getJob()){
										Dictionary dic=(Dictionary)baseDao.getById(Dictionary.class,Long.valueOf(p.getJob()));
										if(null!=dic){
											element.setValue(dic.getItemValue());
										}
									}
								}
								if("保证人电话".equals(depict) || "出质人电话".equals(depict) || "抵押人电话".equals(depict)){
									element.setValue(e.getTelephone());
								}
								if("保证人账号开户行".equals(depict) || "保证人银行账号".equals(depict)){
									EnterpriseBankService ebankService=(EnterpriseBankService)AppUtil.getBean("enterpriseBankService");
									if(null!=ebankService){
										List<EnterpriseBank> bankList = ebankService.getBankList(e.getId(),(short)0,(short)0,(short)0);
										if(bankList!=null && bankList.size()>0){
											EnterpriseBank ebank = bankList.get(0);
											if(null!=ebank && null!=ebank.getBankid()){
												CsBankService cbankService=(CsBankService)AppUtil.getBean("csBankService");
												CsBank cBank = cbankService.get(ebank.getBankid());
												if(null!=cBank){
													if(ebank.getBankOutletsName()!=null&&cBank.getBankname()!=null){
														element.setValue(cBank.getBankname()+" "+ebank.getBankOutletsName());
													}
												}
											}
										}
									}
								}
							}
						}
						//抵、质押物
						if(mortgage.getAssuretypeid() == BaseConstants.BZID3 || mortgage.getAssuretypeid() == BaseConstants.BZID4) {
							//抵质押物名称
							if("抵质押物名称".equals(depict)){
								element.setValue(mortgage.getMortgagepersontypeforvalue());
							}
						}
						
						if(mortgage.getMortgagenametypeid()!=0){
							if(mortgage.getMortgagenametypeid()==6){//存货商品
								if(null==list1){
									String hql = "from VProjMortProduct where mortgageid ="+mortgage.getId();
									list1 = baseDao.queryHql(hql);
								}
								if(list != null && list.size()>0){
									VProjMortProduct pmb = (VProjMortProduct)list1.get(0);
									if(null!=pmb){
										if("抵质押物数量".equals(depict)){
											element.setValue(pmb.getAmount().toString());
										}else if("质押物存放地点".equals(depict)){
											element.setValue(pmb.getDepositary());
										}
									}
								}
							}else if((mortgage.getMortgagenametypeid()==7 || mortgage.getMortgagenametypeid()==15 || mortgage.getMortgagenametypeid()==16 || mortgage.getMortgagenametypeid()==17)){
								//住宅、公寓、联排别墅、独栋别墅
								if(null==list1){
									String hql1 = "from ProcreditMortgageHouse where mortgageid="+mortgage.getId();
									list1 =  baseDao.queryHql(hql1);
								}
								if(null!=list1 && list1.size()>0){
									ProcreditMortgageHouse pmb = (ProcreditMortgageHouse)list1.get(0);
									if(null!=pmb){
										if("抵质押物权证编号".equals(depict)){
											element.setValue(pmb.getCertificatenumber());
										}else if("抵押物共有人".equals(depict)){
											element.setValue(pmb.getMutualofperson());
										}else if("抵质押物所在地".equals(depict)){
											element.setValue(pmb.getHouseaddress());
										}else if("住宅地址".equals(depict)){
											element.setValue(pmb.getHouseaddress());
										}else if("产权编号".equals(depict)){
											element.setValue(pmb.getCertificatenumber());
										}else if("住宅面积".equals(depict)){
											element.setValue(pmb.getBuildacreage().toString());
										}
									}
								}
							}else if(mortgage.getMortgagenametypeid()==8){//商铺写字楼
								if("产权人".equals(depict)){
									list1=officebuildingService.seeOfficebuilding(mortgage.getId());
									if(null!=list && list.size()>0){
										VProjMortOfficeBuilding office=(VProjMortOfficeBuilding) list1.get(0);
										if(null!=office){
											element.setValue(office.getPropertyperson());
										}
									}
								}else if("抵质押物所在地".equals(depict)){
									String hql = "from ProcreditMortgageOfficebuilding where mortgageid="+mortgage.getId();
									list1 = baseDao.queryHql(hql);
									if(null!=list1 && list1.size()>0){
										ProcreditMortgageOfficebuilding pmb = (ProcreditMortgageOfficebuilding)list1.get(0);
										if(null!=pmb){
											element.setValue(pmb.getHouseaddress());
										}
									}
								}
							}else if(mortgage.getMortgagenametypeid()==9){//住宅用地
								if("产权人".equals(depict)){
									list1=housegroundService.seeHouseground(mortgage.getId());
									if(null!=list && list.size()>0){
										VProjMortHouseGround houseGround=(VProjMortHouseGround) list1.get(0);
										if(null!=houseGround){
											element.setValue(houseGround.getPropertyperson());
										}
									}
								}else{
									String hql = "from ProcreditMortgageHouseground where mortgageid="+mortgage.getId();
									list1 = baseDao.queryHql(hql);
									if(null!=list1 && list1.size()>0){
										ProcreditMortgageHouseground pmb = (ProcreditMortgageHouseground)list1.get(0);
										if(null!=pmb){
											if("抵质押物权证编号".equals(depict)){
												element.setValue(pmb.getCertificatenumber());
											}else if("抵质押物所在地".equals(depict)){
												element.setValue(pmb.getAddress());
											}
										}
									}
								}
							}else if(mortgage.getMortgagenametypeid()==10){//商业用地
								if("产权人".equals(depict)){
									list1=businessServMort.seeBusiness(mortgage.getId());
									if(null!=list && list.size()>0){
										VProjMortBusiness business=(VProjMortBusiness) list1.get(0);
										if(null!=business){
											element.setValue(business.getPropertyperson());
										}
									}
								}else{
									String hql = "from ProcreditMortgageBusiness where mortgageid="+mortgage.getId();
									list1 = baseDao.queryHql(hql);
									if(null!=list1 && list1.size()>0){
										ProcreditMortgageBusiness pmb = (ProcreditMortgageBusiness)list1.get(0);
										if("抵质押物权证编号".equals(depict)){
											element.setValue(pmb.getCertificatenumber());
										}else if("抵质押物所在地".equals(depict)){
											element.setValue(pmb.getAddress());
										}
									}
								}
							}else if(mortgage.getMortgagenametypeid()==11){//商住用地
								if("产权人".equals(depict)){
									list1=businessandliveService.seeBusinessandlive(mortgage.getId());
									if(null!=list && list.size()>0){
										VProjMortBusAndLive bus=(VProjMortBusAndLive) list1.get(0);
										if(null!=bus){
											element.setValue(bus.getPropertyperson());
										}
									}
								}else{
									String hql = "from ProcreditMortgageBusinessandlive where mortgageid="+mortgage.getId();
									list1 = baseDao.queryHql(hql);
									if(null!=list1 && list1.size()>0){
										ProcreditMortgageBusinessandlive pmb = (ProcreditMortgageBusinessandlive)list1.get(0);
										if("抵质押物权证编号".equals(depict)){
											element.setValue(pmb.getCertificatenumber());
										}else if("抵质押物所在地".equals(depict)){
											element.setValue(pmb.getAddress());
										}
									}
								}
							}else if(mortgage.getMortgagenametypeid()==12){//教育用地
								String hql = "from ProcreditMortgageEducation where mortgageid="+mortgage.getId();
								list1 = baseDao.queryHql(hql);
								if(null!=list1 && list1.size()>0){
									ProcreditMortgageEducation pmb = (ProcreditMortgageEducation)list1.get(0);
									if("抵质押物权证编号".equals(depict)){
										element.setValue(pmb.getCertificatenumber());
									}else if("抵质押物所在地".equals(depict)){
										element.setValue(pmb.getAddress());
									}
								}
							}else if(mortgage.getMortgagenametypeid()==13){//工业用地
								if("产权人".equals(depict)){
									list1=industryService.seeIndustry(mortgage.getId());
									if(null!=list && list.size()>0){
										VProjMortIndustry industry=(VProjMortIndustry) list1.get(0);
										if(null!=industry){
											element.setValue(industry.getPropertyperson());
										}
									}
								}else{
									String hql = "from ProcreditMortgageIndustry where mortgageid="+mortgage.getId();
									list1 = baseDao.queryHql(hql);
									if(null!=list1 && list1.size()>0){
										ProcreditMortgageIndustry pmb = (ProcreditMortgageIndustry)list1.get(0);
										if("抵质押物权证编号".equals(depict)){
											element.setValue(pmb.getCertificatenumber());
										}else if("抵质押物所在地".equals(depict)){
											element.setValue(pmb.getAddress());
										}
									}
								}
							}
						}
					}
				}
				list.add(element);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}