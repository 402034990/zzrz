package com.zhiwei.credit.service.creditFlow.finance;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.core.web.paging.PagingBean;
import com.zhiwei.credit.model.creditFlow.finance.BpFundIntent;
import com.zhiwei.credit.model.creditFlow.finance.FundIntent;
import com.zhiwei.credit.model.creditFlow.finance.fundintentmerge.BpFundIntentPeriod;
import com.zhiwei.credit.model.creditFlow.finance.fundintentmerge.SlFundIntentPeriod;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidPlan;
import com.zhiwei.credit.model.creditFlow.fund.project.BpFundProject;
import com.zhiwei.credit.model.customer.InvestPersonInfo;

public interface BpFundIntentService extends BaseService<BpFundIntent> {
	BigDecimal getInterest(Long preceptId,Long investPersonId);
	BigDecimal getPrincipal(Long preceptId,Long investPersonId);
	
	List<BpFundIntent> getByBidPlanId(Long bidPlanId);
	
	List<BpFundIntent> getBpBidPlanId(Long bidPlanId,String fundType );
	public  List<BpFundIntent> getListBysql(HttpServletRequest request,Integer start ,Integer limit );
	
	/*
	 * 修改款项状态
	 * 
	 * **/
	public boolean updateState(String investPersonId,Short state,String fundType);
	public List<BpFundIntent> getByPlanIdAndPeriod(Long bidId, Integer payintentPeriod,String fundType);
	public List<BpFundIntentPeriod> getRaiseBpfundIntent(Long bidId);
	public List<SlFundIntentPeriod> getCouponsIncome(PagingBean pb);
	public List<BpFundIntent> getByPlanIdAndPeriod(Long bidId, Integer payintentPeriod,String fundType,Long personId,String orderNum);
	public List<BpFundIntent> getByPlanIdA(Long bidId, Long preceptId,String orderNo,String fundType);
	public List<BpFundIntent> listOfInverstPerson(String orderNo,String fundTypes);
	public List<BpFundIntent> getdistributeMoney(Long planId, Long payintentPeriod,String fundType,String remak);
	
	/**
	 * 根据投资人的id获得投资人当期应该受到的钱是多少
	 * @param temp
	 * @param planId
	 * @param peridId
	 * @param object
	 * @return
	 */
	public BigDecimal getByPlanIdAndOtherRequest(String temp, String planId,String peridId, String type); 
	public void createPunishByTiming();
	/**
	 * 依据交易流水号查询款项记录
	 * @param requestNo
	 * @return
	 */
	public List<BpFundIntent> getByRequestNo(String requestNo);
	/**
	 * 查询平台奖励的台账
	 * @param planId
	 * @param peridId
	 * @return
	 */
	public List<BpFundIntent> getCouponsIntent(String planId,String peridId,String requestNo,String fundType);
	/**
	 * 
	 * 提前还款获得剩余本金
	 */
	public BigDecimal getPrincipalMoney(Long bidPlanId,String date,String orderNo);
	/**
	 * 获得提前还款日所在的期数
	 */
	public List<BpFundIntent> listByEarlyDate(Long bidPlanId,String orderNo,String earlyDate,String fundType);
	public List<BpFundIntent> listbySlEarlyRepaymentId(Long bidPlanId,Long slEarlyRepaymentId);
	public void saveCommonFundIntent(String fundIntentJson,PlBidPlan plan,BpFundProject project,Short isCheck);
	public List<BpFundIntent> listOfInvestAndEarlyId(String orderNo,String fundTypes,Long slEarlyRepaymentId);

	void saveFundIntent(String fundIntentJson, PlBidPlan plan,
			BpFundProject project, Short isCheck);
	public List<BpFundIntent> listByOrderNoAndEarlyId(String orderNo,String fundTypes,Long slEarlyRepaymentId);
	public List<BpFundIntent> listByOrderNo(Long bidPlanId,String orderNo);
	public List<BpFundIntentPeriod> listByBidPlanIdAndpayintentPeriodAndorerNo( PagingBean pb,
			Map<String, String> map);
	
	/**
	 * 得到借款人放款收息表
	 * @return
	 */
	public List<FundIntent> getLoanPersonIntentList(String preceptId ,Long bidPlanId);
	public List bidFundList(Long bidPlanId);
	public void deleteFundIntent(Long bidPlanId);
	public void deleteFundType(String fundType,Long bidPlanId);
	public void saveFundIntent(List<BpFundIntent> list,Long bidPlanId);
	public BigDecimal getPrincipalAndInterest(Long bidPlanId);
	public List bidFundListByOrderNo(Long bidPlanId, String orderNo);
	
	/**
	 * 查询所有的加息利息  --优惠券利息  
	 * @param valueOf
	 * @return
	 */
	public List<BpFundIntent> listInterest(Long bidPlanId);
	/**
	 * 根据投资人ID统计已还款金额
	 * @param temp
	 * @param planId
	 * @param peridId
	 * @param type
	 * @return
	 */
	public BigDecimal getAfterMoney(String temp, String planId,String peridId, String type);
	
	/**
	 * 根据标的id查询该标未对账的记录
	 * @param bidId
	 * @return
	 */
	List<BpFundIntent> getNotMoneyInfoByBidId(Long bidId);
	
	/**
	 * 根据标id和投资人订单获得应还本息
	 * @param bidPlanId
	 * @param orderNo
	 * @return
	 */
	BigDecimal getPrincipalAndInterest(Long bidPlanId, String orderNo);
	
	/**
	 * 查询该标的款项
	 * @param bidId
	 * @return
	 */
	List<BpFundIntent> bidFundList2(Long bidId);
	
}
