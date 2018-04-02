package com.zhiwei.credit.service.creditFlow.finance.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.core.util.DateUtil;
import com.zhiwei.core.web.paging.PagingBean;
import com.zhiwei.credit.dao.creditFlow.finance.BpFundIntentDao;
import com.zhiwei.credit.model.creditFlow.finance.BpFundIntent;
import com.zhiwei.credit.model.creditFlow.finance.FundIntent;
import com.zhiwei.credit.model.creditFlow.finance.fundintentmerge.BpFundIntentPeriod;
import com.zhiwei.credit.model.creditFlow.finance.fundintentmerge.SlFundIntentPeriod;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidInfo;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidPlan;
import com.zhiwei.credit.model.creditFlow.fund.project.BpFundProject;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;
import com.zhiwei.credit.model.customer.InvestPersonInfo;
import com.zhiwei.credit.service.creditFlow.finance.BpFundIntentService;
import com.zhiwei.credit.service.creditFlow.finance.FundIntentService;
import com.zhiwei.credit.service.creditFlow.financingAgency.PlBidInfoService;
import com.zhiwei.credit.service.creditFlow.smallLoan.project.SlSmallloanProjectService;
import com.zhiwei.credit.service.customer.InvestPersonInfoService;
import com.zhiwei.credit.service.system.DictionaryIndependentService;

public class BpFundIntentServiceImpl extends BaseServiceImpl<BpFundIntent> implements BpFundIntentService {
	private BpFundIntentDao dao;
	@Resource
	private SlSmallloanProjectService slSmallloanProjectService; 
	@Resource
	private InvestPersonInfoService investPersonInfoService;
	@Resource
	private FundIntentService fundIntentService;
	@Resource
	private DictionaryIndependentService dictionaryIndependentService;
	@Resource
	private PlBidInfoService plBidInfoService;
	
	public BpFundIntentServiceImpl(BpFundIntentDao dao) {
		super(dao);
		this.dao=dao;
		
	}
	@Override
	public BigDecimal getInterest(Long preceptId, Long investPersonId) {
		return null;
	}
	@Override
	public BigDecimal getPrincipal(Long preceptId, Long investPersonId) {
		return null;
	}
	@Override
	public List<BpFundIntent> getByBidPlanId(Long bidPlanId) {
		String hql = "from BpFundIntent bf where bf.bidPlanId=?";
		return dao.findByHql(hql, new Object[]{bidPlanId});
	}
	@Override
	public List<BpFundIntent> getBpBidPlanId(Long bidPlanId, String fundType) {
		String hql = "from BpFundIntent bf where bf.bidPlanId=? and bf.fundType = ?";
		return dao.findByHql(hql, new Object[]{bidPlanId,fundType});
	}
	@Override
	public List<BpFundIntent> getListBysql(HttpServletRequest request,Integer start ,Integer limit ) {
		// TODO Auto-generated method stub
		return dao.getListBysql(request , start ,limit);
	}
	/*
	 * 修改款项状态
	 * 
	 * ***/
	@Override
	public boolean updateState(String orderNo, Short state, String fundType) {
		String hql1 = "from BpFundIntent as bf where bf.orderNo = ? and bf.fundType = ?";
		List<BpFundIntent> list = dao.findByHql(hql1, new Object[]{orderNo,fundType});
		if(list!=null&&list.size()!=0){
			for(int i=0;i<list.size();i++){
				BpFundIntent intent = list.get(i);
				if(null!=intent){
					intent.setNotMoney(new BigDecimal(0));
					if("principalLending".equals(fundType)){
						intent.setAfterMoney(intent.getPayMoney());
					}else{
						intent.setAfterMoney(intent.getIncomeMoney());
					}
					intent.setFactDate(new Date());
					intent.setIsCheck(state);
					dao.merge(intent);
				}
				
			}
			
		}
		//String hql = "update BpFundIntent as bf set bf.notMoney = 0 ";
		return false;
	}
	@Override
	public List<BpFundIntent> getByPlanIdAndPeriod(Long bidId,Integer payintentPeriod,String fundType) {
		String hql1="";
		if(fundType!=null&&!fundType.equals("")&&fundType.equals("notCommoninterest")){
			 hql1 = "from BpFundIntent as bf where bf.bidPlanId = ? and bf.payintentPeriod = ? and bf.fundType in ('couponInterest','principalCoupons','subjoinInterest')";
			 List<BpFundIntent> list = dao.findByHql(hql1, new Object[]{bidId,payintentPeriod});
				return list;
		}else{
			 hql1 = "from BpFundIntent as bf where bf.bidPlanId = ? and bf.payintentPeriod = ? and bf.fundType=?";
			 List<BpFundIntent> list = dao.findByHql(hql1, new Object[]{bidId,payintentPeriod,fundType});
				return list;
		}
		
		
	}
	@Override
	public List<BpFundIntent> getByPlanIdA(Long bidId, Long preceptId,
			String  orderNo, String fundType) {
		// TODO Auto-generated method stub
		if(preceptId==null&&orderNo==null){
			String hql1="";
			if(fundType!=null&&!fundType.equals("")&&fundType.equals("coupons")){
				 hql1 = "from BpFundIntent as bf where bf.bidPlanId = ?  and bf.fundType in ('principalCoupons','couponInterest','subjoinInterest') and bf.factDate is null";
			}else{
				 hql1 = "from BpFundIntent as bf where bf.bidPlanId = ?  and bf.fundType in ('"+fundType+"') and bf.factDate is null";
			}
			
			List<BpFundIntent> list = dao.findByHql(hql1, new Object[]{bidId});
			return list;
		}else{
			String hql1 = "from BpFundIntent as bf where bf.bidPlanId = ? and bf.orderNo = ? and bf.fundType in ("+fundType+")";
			List<BpFundIntent> list = dao.findByHql(hql1, new Object[]{bidId,orderNo});
			return list;
		}
		
	}
	@Override
	public List<BpFundIntent> getByPlanIdAndPeriod(Long bidId,
			Integer payintentPeriod, String fundType, Long personId,String orderNum) {
		// TODO Auto-generated method stub
		return dao.getByPlanIdAndPeriod( bidId,
				 payintentPeriod,  fundType,  personId,orderNum);
	}
	
	@Override
	public List<BpFundIntentPeriod> getRaiseBpfundIntent(Long bidId) {
		// TODO Auto-generated method stub
		return dao.getRaiseBpfundIntent(bidId);
	}
	
	@Override
	public List<SlFundIntentPeriod> getCouponsIncome(PagingBean pb) {
		// TODO Auto-generated method stub
		return dao.getCouponsIncome(pb);
	}
	@Override
	public List<BpFundIntent> listOfInverstPerson(String orderNo,
			String fundTypes) {
		// TODO Auto-generated method stub
		return dao.listOfInverstPerson(orderNo, fundTypes);
	}
	
	@Override
	public List<BpFundIntent> getdistributeMoney(Long planId,
			Long payintentPeriod, String fundType, String remak) {
		// TODO Auto-generated method stub
		return dao.getdistributeMoney(planId, payintentPeriod, fundType, remak);
	}
	/**
	 * 根据投资人的id获得投资人当期应该受到的钱是多少
	 * @param temp
	 * @param planId
	 * @param peridId
	 * @param object
	 * @return
	 */
	@Override
	public BigDecimal getByPlanIdAndOtherRequest(String temp, String planId,
			String peridId, String type) {
		// TODO Auto-generated method stub
		return dao.getByPlanIdAndOtherRequest(temp,planId,peridId,type);
	}
	@Override
	public void createPunishByTiming(){
		List<String> fundtypelist=new ArrayList<String>();
		fundtypelist.add("principalRepayment");
		fundtypelist.add("loanInterest");
		
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd",Locale.CHINESE);
		Calendar cal=Calendar.getInstance();
		cal.setTime(new Date());
		//cal.add(Calendar.DATE,-5);
		List<BpFundIntent> listbyOwe=	dao.listbyOwe("SmallLoan",fundtypelist,cal.getTime());
		for(BpFundIntent owe:listbyOwe){
			BigDecimal overduerate=new BigDecimal("0");
			SlSmallloanProject slSmallloanProject=slSmallloanProjectService.get(owe.getProjectId());
			if(owe.getFundType().equals("principalRepayment")){
				if(null!=slSmallloanProject.getOverdueRateLoan()){
					overduerate=slSmallloanProject.getOverdueRateLoan();
				}
			}else{
				if(null!=slSmallloanProject.getOverdueRate()){
					overduerate=slSmallloanProject.getOverdueRate();
				}
			}
			Long days=DateUtil.compare_date(owe.getIntentDate(),(owe.getFactDate()==null?new Date():owe.getFactDate()));
		      Long sortday = days-5; 
			  BigDecimal day1 = new BigDecimal((sortday>0?days:0));
		      BigDecimal OverdueMoney = overduerate.multiply(day1);
		      BigDecimal  sortoverdueMoney = OverdueMoney.multiply(owe.getNotMoney()).divide(new BigDecimal(100),2,BigDecimal.ROUND_HALF_UP);
		      owe.setAccrualMoney(sortoverdueMoney);
		      owe.setPunishDays(days.intValue());
		      dao.merge(owe);
		}
		
	
	}
	@Override
	public void saveFundIntent(String fundIntentJson, PlBidPlan plan,
			BpFundProject project, Short isCheck) {
		dao.saveFundIntent(fundIntentJson, plan, project, isCheck);
		
	}
		
	@Override
	public List<BpFundIntent> getByRequestNo(String requestNo) {
		// TODO Auto-generated method stub
		return dao.getByRequestNo(requestNo);
	}
	@Override
	public List<BpFundIntent> getCouponsIntent(String planId, String peridId,String requestNo,String fundType) {
		// TODO Auto-generated method stub
		return dao.getCouponsIntent(planId, peridId,requestNo,fundType);
	}
	@Override
	public BigDecimal getPrincipalMoney(Long bidPlanId, String date,String orderNo) {
		
		return dao.getPrincipalMoney(bidPlanId, date,orderNo);
	}
	@Override
	public List<BpFundIntent> listByEarlyDate(Long bidPlanId, String orderNo,
			String earlyDate,String fundType) {
	
		return dao.listByEarlyDate(bidPlanId, orderNo, earlyDate,fundType);
	}
	@Override
	public List<BpFundIntent> listbySlEarlyRepaymentId(Long bidPlanId,
			Long slEarlyRepaymentId) {
		
		return dao.listbySlEarlyRepaymentId(bidPlanId, slEarlyRepaymentId);
	}
	@Override
	public void saveCommonFundIntent(String fundIntentJson, PlBidPlan plan,
			BpFundProject project, Short isCheck) {
		dao.saveCommonFundIntent(fundIntentJson, plan, project, isCheck);
		
	}
	@Override
	public List<BpFundIntent> listOfInvestAndEarlyId(String orderNo,
			String fundTypes, Long slEarlyRepaymentId) {
		
		return dao.listOfInvestAndEarlyId(orderNo, fundTypes, slEarlyRepaymentId);
	}
	@Override
	public List<BpFundIntent> listByOrderNoAndEarlyId(String orderNo,
			String fundTypes, Long slEarlyRepaymentId) {
		
		return dao.listByOrderNoAndEarlyId(orderNo, fundTypes, slEarlyRepaymentId);
	}
	@Override
	public List<BpFundIntent> listByOrderNo(Long bidPlanId, String orderNo) {
		
		return dao.listByOrderNo(bidPlanId, orderNo);
	}

	@Override
	public List<BpFundIntentPeriod> listByBidPlanIdAndpayintentPeriodAndorerNo(
			PagingBean pb, Map<String, String> map) {
		
		List<BpFundIntentPeriod> list=	dao.listByBidPlanIdAndpayintentPeriodAndorerNo(pb, map);
		int j=0;
		if(null!=pb){
			for(BpFundIntentPeriod  l:list){
				List<BpFundIntent>	bpfundlist=dao.getByBidPlanIdAndIntentDate(l.getPlanId(), l.getIntentDate(), l.getOrderNo());
				l.initBpFundIntentPeriod(bpfundlist);
				j++;
			}
		}
		return list;
	}
	@Override
	public List<FundIntent> getLoanPersonIntentList(String preceptId ,Long bidPlanId) {
		
		Long slEarlyRepaymentId = null;
		
		List<FundIntent> list = new ArrayList<FundIntent>();
		List<FundIntent> list1 = new ArrayList<FundIntent>();
		
		
		List<InvestPersonInfo> li = new ArrayList<InvestPersonInfo>();
		if(null!=bidPlanId){
			li = investPersonInfoService.getByBidPlanId(bidPlanId);
		}else{
			li = investPersonInfoService.getByMoneyPlanId(Long.parseLong(preceptId));
		}
		
	
		if(li!=null&&li.size()!=0){
		
			int i=1;
			for(InvestPersonInfo person:li){
				List<BpFundIntent> filist = new ArrayList<BpFundIntent>();
				
				if(null!=slEarlyRepaymentId){
					filist=listOfInvestAndEarlyId(person.getOrderNo(), "",slEarlyRepaymentId);
				}else{
					filist=listOfInverstPerson(person.getOrderNo(), "");
				}
			   if(i==1){
				   
				   list1.addAll(filist);
				   
			   }else{
				   for(int j=0;j<list1.size();j++){
					   fundIntentService.evict(list1.get(j));
					   if(list1.get(j).getIncomeMoney().compareTo(new BigDecimal("0"))==1){
						   list1.get(j).setIncomeMoney( list1.get(j).getIncomeMoney().add(filist.get(j).getIncomeMoney()));
						   list1.get(j).setNotMoney( list1.get(j).getIncomeMoney());
					   }else{
						   list1.get(j).setPayMoney( list1.get(j).getPayMoney().add(filist.get(j).getPayMoney()));
						   list1.get(j).setNotMoney( list1.get(j).getPayMoney());
					   }
					   list1.get(j).setFundTypeName(dictionaryIndependentService.getByDicKey(list1.get(j).getFundType()).get(0).getItemValue());
				   }
				   
			   }
				i++;
			}
		}
		
		return list1;
		
	}
	
	@Override
	public List bidFundList(Long bidPlanId) {
		
		return dao.bidFundList(bidPlanId);
	}
	@Override
	public void deleteFundIntent(Long bidPlanId) {
		dao.deleteFundIntent(bidPlanId);
		
	}
	@Override
	public void deleteFundType(String fundType,Long bidPlanId) {
		dao.deleteFundType(fundType,bidPlanId);
		
	}
	@Override
	public void saveFundIntent(List<BpFundIntent> list,Long bidPlanId) {
		dao.saveFundIntent(list,bidPlanId);
	}
	@Override
	public BigDecimal getPrincipalAndInterest(Long bidPlanId) {
		
		return dao.getPrincipalAndInterest(bidPlanId);
	}
	@Override
	public List bidFundListByOrderNo(Long bidPlanId, String orderNo) {
		
		return dao.bidFundListByOrderNo(bidPlanId, orderNo);
	}
	
	@Override
	public List<BpFundIntent> listInterest(Long bidPlanId) {
		String hql = " from BpFundIntent where bidPlanId = ? and fundType in ('subjoinInterest','couponInterest','principalCoupons','commoninterest','raiseinterest') ";
		List<BpFundIntent> list = dao.findByHql(hql, new Object[]{bidPlanId});
		
		return list;
	}
	
	/**
	 *根据投资人ID统计已还款金额
	 * @param temp
	 * @param planId
	 * @param peridId
	 * @param object
	 * @return
	 */
	@Override
	public BigDecimal getAfterMoney(String temp, String planId,
			String peridId, String type) {
		// TODO Auto-generated method stub
		return dao.getAfterMoney(temp,planId,peridId,type);
	}
	@Override
	public List<BpFundIntent> getNotMoneyInfoByBidId(Long bidPlanId) {
		String hql = "from BpFundIntent bf where bf.bidPlanId=? and bf.fundType<> 'principalLending' and bf.isCheck=0 and bf.isValid=0 and bf.notMoney>0";
		return dao.findByHql(hql, new Object[]{bidPlanId});
	}
	@Override
	public BigDecimal getPrincipalAndInterest(Long bidPlanId, String orderNo) {
		return dao.getPrincipalAndInterest(bidPlanId,orderNo);
	}
	@Override
	public List<BpFundIntent> bidFundList2(Long bidId) {
		return dao.bidFundList2(bidId);
	}

}