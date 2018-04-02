package com.zhiwei.credit.service.creditFlow.finance;

/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
 */
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.core.web.paging.PagingBean;
import com.zhiwei.credit.action.flow.FlowRunInfo;
import com.zhiwei.credit.model.creditFlow.creditAssignment.bank.ObAccountDealInfo;
import com.zhiwei.credit.model.creditFlow.finance.SlFundDetail;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;
import com.zhiwei.credit.model.creditFlow.finance.fundintentmerge.SlFundIntentPeriod;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;

/**
 * 
 * @author
 * 
 */
public interface SlFundIntentService extends BaseService<SlFundIntent> {
	public List<SlFundIntent> getallbycompanyId();

	public int updateOverdue(SlFundIntent s);
	public List<SlFundIntent> getByProjectId7(Long projectId,
			String businessType);
	public int updateFlatMoney(SlFundIntent s);

	public int updateIntent(SlFundIntent s);
	public BigDecimal getByProjectId8(Long projectId, String businessType,Integer payintentPeriod);
	public List<SlFundIntent> getByProjectId(Long projectId, String businessType);

	public List<SlFundIntent> getByProjectId(Long projectId,
			String businessType, String fundResource);

	public List<SlFundIntent> getByProjectId1(Long projectId,
			String businessType);

	public List<SlFundIntent> getByProjectId2(Long projectId,
			String businessType);

	public List<SlFundIntent> getByProjectId3(Long projectId,
			String businessType, String fundType);

	public Map<String, BigDecimal> saveProjectfiance(Long projectId,
			String businessType);

	public Map<String, BigDecimal> saveFinancingProjectfiance(Long projectId,
			String businessType);

	public Map<String, BigDecimal> saveGuaranteeProjectfiance(Long projectId,
			String businessType);

	public Integer saveAfterFlow(FlowRunInfo flowRunInfo);

	public Integer saveAfterFlowcontract(FlowRunInfo flowRunInfo);

	public String savejson(String slFundIentJson, Long projectId,
			String businessType, Short flag, Long companyId, Long preceptId,
			String fundResource);

	public String savejson1(String slFundIentJson, Long projectId,
			String businessType, Short flag, Short isValid, Long companyId);

	public String savejsonloaned(String slFundIentJson, Long projectId,
			String businessType, Short flag, Short isValid, Long companyId,
			String isLoanedType, Long loanedId);

	public List<SlFundIntent> getByProjectIdAndFundType(Long projectId,
			Integer fundType);

	public int searchsize(Map<String, String> map, String businessType);

	public List<SlFundIntent> search(Map<String, String> map,
			String businessType);

	public List<SlFundIntent> getlistbyslSuperviseRecordId(
			Long slSuperviseRecordId, String businessType, Long projectId);

	public List<SlFundIntent> getByisvalidAndaftercheck(Long projectId,
			String businessType);

	public List<SlFundIntent> getByaftercheck(Long projectId,
			String businessType);

	public int searchsizeurge(String projectIdStr, Map<String, String> map,
			String businessType);

	public void searchurge(PageBean<SlFundIntent> pageBean,Map<String, String> map, String businessType);

	public String intentToeffective(Long projectId, String businessType);

	public List<SlFundIntent> getlistbyslEarlyRepaymentId(
			Long slEarlyRepaymentId, String businessType, Long projectId);

	public List<SlFundIntent> getlistbyslslAlteraccrualRecordId(
			Long slAlteraccrualRecordId, String businessType, Long projectId);

	public void listbyLedger(PageBean<SlFundIntent> pageBean, String businessType,
			String fundType, String typetab, PagingBean pb,
			Map<String, String> map);

	public Long sizebyLedger(String businessType, String fundType,
			String typetab, PagingBean pb, Map<String, String> map);

	public List<SlFundIntent> listbyfundType(String businessType,
			Long projectId, String fundType, Long isInitialorId);
	public List<SlFundIntent> overdueMoneys();
	public List<SlFundIntent> listbyOwe(String businessType, String fundType,
			Long isInitialorId);

	public List<SlFundIntent> listbyisInitialorId(Long isInitialorId);

	public void createPunishByTiming();

	public List<SlFundIntent> wsgetByPrincipalLending(Long projectId,
			String businessType);

	public List<SlFundIntent> wsgetByInterestAccrued(Long projectId,
			String businessType);

	public List<SlFundIntent> wsgetByInterestPlan(Long projectId,
			String businessType, String factDate, String fundType);

	public List<SlFundIntent> wsgetByPrincipalRepayOverdue(Long projectId,
			String businessType);

	public List<SlFundIntent> wsgetByRealInterest(Long projectId,
			String businessType);

	public List<SlFundIntent> wsgetByRealpPrincipalPepay(Long projectId,
			String businessType);

	public List<SlFundIntent> wsgetByRealPunishInterest(Long projectId,
			String businessType);

	public BigDecimal computeAccrual(String fundType, String businessType,
			Date factdate, SlFundIntent owe);

	public List<SlFundIntent> getListByFundType(Long projectId,
			String businessType, String fundType, Long slSuperviseRecordId,Long preceptId);

	public List<SlFundIntent> getListByIntentDate(Long projectId,
			String businessType, String date, Long slSuperviseRecordId);

	/**
	 * 
	 * 付息方式为一次性还本付息的提前还款
	 */
	public List<SlFundIntent> listOfOneTime(String startDate,
			String intentDate, String earlyDate, String accrualType,
			String payaccrualType, BigDecimal accrual,
			BigDecimal managementConsultingOfRate, BigDecimal earlyMoney,
			BigDecimal projectMoney, Integer payintentPerioDate,
			Boolean isPreposePayConsultingCheck);

	// add by liny 2013-2-28 查找共有多少条本金偿还
	public List<SlFundIntent> findLastPrincipal(Long projectId,
			String businessType);

	public List<SlFundIntent> getByProjectId4(Long projectId,
			String businessType);
	/**
	 * 
	 * 只查利息第一期的利息
	 */
	public BigDecimal getByProjectId5(Long projectId,
			String businessType);
	/**
	 * 
	 * 
	 * 只查本金
	 */
	public BigDecimal getByProjectId6(Long projectId,
			String businessType);
	public List<SlFundIntent> getListOfSupervise(Long projectId,
			String businessType, Date intentDate, Long slSuperviseRecordId);

	public List<SlFundIntent> getByFundType(Long projectId,
			String businessType, String fundType);

	public List<SlFundIntent> getByIntentPeriod(Long projectId,
			String businessType, String fundType, Long slSuperviseRecordId,
			Integer payIntentPeriod);

	public List<SlFundIntent> getOfEarly(Long projectId, String businessType,
			String fundType, Long slSuperviseRecordId);

	/**
	 * 动态获取记录
	 * 
	 * @param projectId
	 * @param businessType
	 * @param fundType
	 * @return
	 */
	public List<SlFundIntent> dynamicGetData(Long projectId,
			String businessType, String[] str);

	public List<SlFundIntent> getListOfHistory(Long projectId,
			String businessType, Date intentDate);

	public List<SlFundIntent> listByProjectId(Long projectId,
			String businessType);

	public List<SlFundIntent> listOutExcel(String projectIdStr,
			Map<String, String> map, String businessType);

	public BigDecimal getSumMoney(Long projectId, String businessType,
			String fundType);

	public List<SlFundIntent> getListByOperateId(Long projectId,
			String businessType, Long operateId, String status);

	public List<SlFundIntent> getListByEarlyOperateId(Long projectId,
			String businessType, Long earlyOperateId, String status);

	public List<SlFundIntent> getListByAlteraccrualOperateId(Long projectId,
			String businessType, Long alteraccrualOperateId, String status);

	public List<SlFundIntent> getListByFundType(Long projectId,
			String businessType, String fundType);

	public List<SlFundIntent> getListByTypeAndDate(Long projectId,
			String string, String string2, String string3);

	public List<SlFundIntent> getyqList(Long projectId, String businessType,
			String intentDate);

	// add by gao 提取自slSmallLoanprojectaction savejsonintent
	public List<SlFundIntent> savesmallLoanJsonIntent(
			String fundIntentJsonData, SlSmallloanProject slSmallloanProject,
			Short flag);

	public List<SlFundIntent> getListByProjectId(Long projectId,
			String businessType);

	public List<SlFundIntent> getList(String fundType, String intentDate,
			String companyId);

	public List<SlFundIntent> getListByType(Long projectId,
			String businessType, String fundType, String intentDate);

	public List<SlFundIntent> getByProjectAsc(Long projectId,
			String businessType,Long preceptId);

	/*public List<SlFundIntent> getByProjectAsc(Long projectId,
			String businessType, String fundResource);*/

	// 给充值和取现生成款项台账(债权转让业务)
	public void addreChargeInfo(ObAccountDealInfo info, int i);

	// 查出来取现和充值的款项
	public List<SlFundIntent> findAccountFundIntent(Long accountId,
			Long investPersonId, Long id, int i);

	// 查出债权人已经对过账的利息收益
	public List<SlFundIntent> getTreeIdAndFundType(Long obligationId,
			Long investMentPersonId, Long id, String investaccrual);

	// 查出一个债权人购买一个债权记录产生的款项信息(没有对账的款项)
	public List<SlFundIntent> getListByTreeIdUn(Long projectId,
			Long investMentPersonId, Long id);

	// 查出一个债权人购买一个债权记录产生的款项信息
	public List<SlFundIntent> getListByTreeId(Long projectId,
			Long investMentPersonId, Long id);

	public List<SlFundIntent> listOfInverstPerson(Long valueOf, Long projectId,
			String string);

	public List<SlFundIntent> getbyPreceptId(Long preceptId);

	public String savejson(String slFundIentJson, Long projectId,
			String string, short parseShort, Long companyId);

	// 根据bidPlanId获取放款收息表
	List<SlFundIntent> getListByBidPlanId(Long bidPlanId);

	List<SlFundIntent> getByProjectIdAsc(Long projectId, String businessType);
	
	boolean startUrgeFlow();
	
	/**
	 * 更新款项计划表
	 * fid:69:10.00_fid:70:10.00_fid:68:10.00_bfid:36:10.00
	 * @param params
	 */
	public void updateFinance(String params);
    /**
     * 获取借款人台帐
     * @param projectId 项目id
     * @param payintentPeriod 期数
     * @param fundType 款项台帐类型
     * @param bidPlanId 标id
     * @return
     */
	public SlFundIntent getFundIntent(Long projectId, Integer payintentPeriod,
			String fundType, Long bidPlanId);
	List<SlFundIntentPeriod> listByBidPlanIdAndpayintentPeriod( PagingBean pb,
			Map<String, String> map);
	List<SlFundIntentPeriod> getCouponsList( PagingBean pb,
			Map<String, String> map);
	List<SlFundIntentPeriod> getRaiseinterestList( PagingBean pb,
			Map<String, String> map);
	public List<SlFundIntent> listByDateAndEarlyId(Long projectId,String businessType,String earlyDate,Long slEarlyRepaymentId,Long preceptId);
	public BigDecimal getPrincipalMoney(Long projectId,String businessType,String earlyDate,Long preceptId);
	public BigDecimal getPrincipalMoney1(Long projectId,String businessType,String earlyDate);
	public List<SlFundIntent> listByEarlyDate(Long projectId,String businessType,String earlyDate,String fundType,Long preceptId);
	
	/**
	 * 计算罚息
	 * @param owe 款项对象
	 * @param slFundDetail 对账明细
	 */
	public void computeAccrualnew (SlFundIntent owe,SlFundDetail slFundDetail);
	/**
	 * 计算罚息
	 */
	public void calculatePenalty();
	//债权转让标生成款项得到借款人利息的到账日期表
	public List<SlFundIntent> listByPreceptIdAndDate(Long projectId,String businessType,Long preceptId,String date,String fundType);
	/**
	 * 查询逾期款项
	 */
	public List<SlFundIntent> getOverdueProjectId(Long projectId, String businessType);

	/**
	 * @param pb
	 * @param map
	 * @return
	 */
	public List<SlFundIntentPeriod> listOverDueByBidPlanIdAndpayintentPeriod(PagingBean pb, Map<String, String> map);

	public List<SlFundIntent> listbyOwe(String businessType, Long projectId,String fundType);
	
	/**
	 * 贷款结清时调用的保证金及授信释放方法
	 * @param businessType
	 * @param projectId
	 */
	public void releaseCashBank(String businessType, Long projectId);
	
	/**
	 * 释放项目的保证金并增加保证金的操作明细
	 * @param cashdepositid
	 * @param cashType
	 * @param projectId
	 * @param projectName
	 * @param declibtion
	 * @param cashmoney
	 * @param projectNum
	 */
	public void saveCashDetail(Long cashdepositid, Integer cashType,Long projectId,String projectName,String declibtion,BigDecimal cashmoney,String  projectNum);
	/**
	 * 释放项目的授信额度并增加授信的操作明细
	 * @param bankCreditId
	 * @param projectId
	 * @param projectName
	 * @param projectNum
	 * @param creditType
	 * @param creditMoney
	 * @param commerType
	 * @param commerId
	 */
	public void saveBankCreditUserLog(Long bankCreditId,Long projectId,String projectName,String projectNum,Short creditType,BigDecimal creditMoney,String commerType,Long commerId );
	/**
	 * 按还本金额调用的保证金及授信释放方法
	 * @param businessType
	 * @param fundIntentId
	 */
	public void releaseCashBankRepayment(String businessType, Long fundIntentId,Long fundDetailId);

	public void projectList(PageBean<SlFundIntent> pageBean,Map<String, String> map1);

	/**
	 * 综合款项台账流水对账方法
	 * @param projectId        项目Id
	 * @param payintentPeriod  期数
	 * @param businessType     业务类别
	 * @return
	 */
	public List<SlFundIntent> getComplexList(String projectId,String payintentPeriod, String businessType);
	
	public List<SlFundIntent> getFundListByParams(Map paramMap);
	
}
