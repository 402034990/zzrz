package com.zhiwei.credit.action.creditFlow.financingAgency;

/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
 */
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hurong.credit.config.HtmlConfig;
import com.hurong.credit.util.Common;
import com.zhiwei.core.Constants;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.util.ContextUtil;
import com.zhiwei.core.util.DateUtil;
import com.zhiwei.core.util.JsonUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.core.web.paging.PagingBean;
import com.zhiwei.credit.core.creditUtils.ExportExcel;
import com.zhiwei.credit.model.creditFlow.auto.PlBidAuto;
import com.zhiwei.credit.model.creditFlow.creditAssignment.bank.ObAccountDealInfo;
import com.zhiwei.credit.model.creditFlow.creditAssignment.bank.ObSystemAccount;
import com.zhiwei.credit.model.creditFlow.finance.BpFundIntent;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidInfo;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidPlan;
import com.zhiwei.credit.model.creditFlow.financingAgency.business.BpBusinessDirPro;
import com.zhiwei.credit.model.creditFlow.financingAgency.business.BpBusinessOrPro;
import com.zhiwei.credit.model.creditFlow.financingAgency.business.PlBusinessDirProKeep;
import com.zhiwei.credit.model.creditFlow.financingAgency.persion.BpPersionDirPro;
import com.zhiwei.credit.model.creditFlow.financingAgency.persion.BpPersionOrPro;
import com.zhiwei.credit.model.creditFlow.financingAgency.persion.PlPersionDirProKeep;
import com.zhiwei.credit.model.creditFlow.financingAgency.typeManger.PlKeepProtype;
import com.zhiwei.credit.model.creditFlow.fund.project.BpFundProject;
import com.zhiwei.credit.model.customer.BpCustRelation;
import com.zhiwei.credit.model.customer.InvestPersonInfo;
import com.zhiwei.credit.model.p2p.BpCustMember;
import com.zhiwei.credit.model.p2p.BpFinanceApplyUser;
import com.zhiwei.credit.model.system.UploadLog;
import com.zhiwei.credit.model.thirdInterface.YeePayReponse;
import com.zhiwei.credit.service.creditFlow.auto.PlBidAutoService;
import com.zhiwei.credit.service.creditFlow.contract.ProcreditContractService;
import com.zhiwei.credit.service.creditFlow.creditAssignment.bank.ObAccountDealInfoService;
import com.zhiwei.credit.service.creditFlow.creditAssignment.bank.ObSystemAccountService;
import com.zhiwei.credit.service.creditFlow.finance.BpFundIntentService;
import com.zhiwei.credit.service.creditFlow.financingAgency.PlBidInfoService;
import com.zhiwei.credit.service.creditFlow.financingAgency.PlBidPlanService;
import com.zhiwei.credit.service.creditFlow.financingAgency.business.BpBusinessDirProService;
import com.zhiwei.credit.service.creditFlow.financingAgency.business.BpBusinessOrProService;
import com.zhiwei.credit.service.creditFlow.financingAgency.business.PlBusinessDirProKeepService;
import com.zhiwei.credit.service.creditFlow.financingAgency.persion.BpPersionDirProService;
import com.zhiwei.credit.service.creditFlow.financingAgency.persion.BpPersionOrProService;
import com.zhiwei.credit.service.creditFlow.financingAgency.persion.PlPersionDirProKeepService;
import com.zhiwei.credit.service.creditFlow.financingAgency.typeManger.PlBiddingTypeService;
import com.zhiwei.credit.service.creditFlow.financingAgency.typeManger.PlKeepProtypeService;
import com.zhiwei.credit.service.creditFlow.fund.project.BpFundProjectService;
import com.zhiwei.credit.service.creditFlow.smallLoan.project.SlSmallloanProjectService;
import com.zhiwei.credit.service.customer.BpCustRelationService;
import com.zhiwei.credit.service.customer.InvestPersonInfoService;
import com.zhiwei.credit.service.flow.JbpmService;
import com.zhiwei.credit.service.flow.ProcessRunService;
import com.zhiwei.credit.service.flow.ProcessService;
import com.zhiwei.credit.service.p2p.BpCustMemberService;
import com.zhiwei.credit.service.p2p.BpFinanceApplyUserService;
import com.zhiwei.credit.service.sms.util.SmsSendUtil;
import com.zhiwei.credit.service.system.BuildHtml2Web;
import com.zhiwei.credit.service.system.ResultWebPmsService;
import com.zhiwei.credit.service.system.UploadLogService;
import com.zhiwei.credit.util.JsonUtils;

import flexjson.JSONSerializer;

/**
 * 
 * @author
 * 
 */
public class PlBidPlanAction extends BaseAction {
	@Resource
	private PlBidPlanService plBidPlanService;

	@Resource
	private BuildHtml2Web buildHtml2WebService;
	@Resource
	private ResultWebPmsService resultWebPmsService;
	private static final int PUBLISHSTAT = 1; // 已经发布
	private PlBidPlan plBidPlan;
	@Resource
	private PlBusinessDirProKeepService plBusinessDirProKeepService;
	@Resource
	private PlPersionDirProKeepService plPersionDirProKeepService;
	@Resource
	private ObSystemAccountService obSystemAccountService;
	@Resource
	private BpBusinessDirProService bpBusinessDirProService;
	@Resource
	private BpBusinessOrProService bpBusinessOrProService;
	@Resource
	private InvestPersonInfoService investPersonInfoService;
	@Resource
	private BpPersionDirProService bpPersionDirProService;
	@Resource
	private BpPersionOrProService bpPersionOrProService;
	@Resource
	private SlSmallloanProjectService slSmallloanProjectService;
	@Resource
	private ProcessService processService;
	@Resource
	private JbpmService jbpmService;
	@Resource
	private ProcessRunService processRunService;
	@Resource
	private ObAccountDealInfoService obAccountDealInfoService;
	@Resource
	private PlBidInfoService plBidInfoService;
	@Resource
	private BpCustMemberService bpCustMemberService;
	@Resource
	private PlBidAutoService plBidAutoService;
	@Resource
	private BpFundProjectService bpFundProjectService;
	@Resource
	private BpFundIntentService bpFundIntentService;
	@Resource
	private PlBiddingTypeService plBiddingTypeService;
	@Resource
	private UploadLogService uploadLogService;
	@Resource
	private ProcreditContractService procreditContractService;
	@Resource
	private PlKeepProtypeService plKeepProtypeService;
	@Resource
	private BpCustRelationService bpCustRelationService;
	// 得到整个系统全部的config.properties读取的所有资源
	
	SmsSendUtil smsSendUtil= new SmsSendUtil();
	@Resource
	private BpFinanceApplyUserService bpFinanceApplyUserService;
	
	//得到整个系统全部的config.properties读取的所有资源
	private static Map configMap = AppUtil.getConfigMap();

	private Long bidId;
	/**
	 * 	标记多个状态的表查询的状态值,11代表全部；12代表招标中，已到期，已满标；13代表已满标，已到期
	 */

	private int state;

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public Long getBidId() {
		return bidId;
	}

	public void setBidId(Long bidId) {
		this.bidId = bidId;
	}

	public PlBidPlan getPlBidPlan() {
		return plBidPlan;
	}

	public void setPlBidPlan(PlBidPlan plBidPlan) {
		this.plBidPlan = plBidPlan;
	}

	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		// 标的类型
		String Q_proType_S_EQ = this.getRequest()
				.getParameter("Q_proType_S_EQ");

		String Q_state_N_EQ = getRequest().getParameter("Q_state_N_EQ");
		String flag = getRequest().getParameter("flag");
		// 已过期的列表
		if (null != Q_state_N_EQ && "".equals(Q_state_N_EQ)) {

			// 先判断标是否已经手动关闭
			filter.addFilter("Q_state_N_EQ", "-1");
			// 查询出招标中的标信息，再按时间排序
			// filter.addFilter("Q_state_N_EQ", "1");
			filter.addFilter("Q_proType_S_EQ", Q_proType_S_EQ);
			filter.addFilter("Q_bidEndTime_DG_LE", sdf.format(new Date()));
		} else {
			SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			// filter.addFilter("Q_state_N_EQ", Q_state_N_EQ);
			filter.addFilter("Q_proType_S_EQ", Q_proType_S_EQ);
			if (null != Q_state_N_EQ && !Q_state_N_EQ.isEmpty()) {
				if (null != flag && flag.equals("21")) {
					filter.addFilter("Q_prepareSellTime_D_GT", sdf1
							.format(new Date()));
				}
				if (null != flag && flag.equals("22")) {
					filter.addFilter("Q_prepareSellTime_D_LE", sdf1
							.format(new Date()));
					filter.addFilter("Q_publishSingeTime_D_GT", sdf1
							.format(new Date()));

				}
				if (null != flag && flag.equals("23")) {
					filter.addFilter("Q_publishSingeTime_D_LE", sdf1
							.format(new Date()));
				}
			}
		}
		String publishSingeTime_GE = this.getRequest().getParameter("publishSingeTime_GE");
		String publishSingeTime_LE = this.getRequest().getParameter("publishSingeTime_LE");
		String bidEndTime_GE = this.getRequest().getParameter("bidEndTime_GE");
		String bidEndTime_LE = this.getRequest().getParameter("bidEndTime_LE");
		if(null != publishSingeTime_GE && !"".equals(publishSingeTime_GE)){
			filter.addFilter("Q_publishSingeTime_D_GE", publishSingeTime_GE+" 00:00:00");
		}
		if(null != publishSingeTime_LE && !"".equals(publishSingeTime_LE)){
			filter.addFilter("Q_publishSingeTime_D_LE", publishSingeTime_LE+" 23:59:59");		
		}
		if(null != bidEndTime_GE && !"".equals(bidEndTime_GE)){
			filter.addFilter("Q_bidEndTime_D_GE", bidEndTime_GE+" 00:00:00");
		}
		if(null != bidEndTime_LE && !"".equals(bidEndTime_LE)){
			filter.addFilter("Q_bidEndTime_D_LE", bidEndTime_LE+" 23:59:59");		
		}
		filter.addSorted("createtime", "DESC");
		List<PlBidPlan> list = plBidPlanService.getAll(filter);
		for (PlBidPlan plan : list) {
			plBidPlanService.evict(plan);
			BigDecimal money = new BigDecimal(0);
			/*List<InvestPersonInfo> plist = investPersonInfoService.getByBidPlanId(plan.getBidId());
			for (InvestPersonInfo p : plist) {
				money = money.add(p.getInvestMoney());
			}*/
			
			Map<String, String> map = new HashMap<String, String>();
			map.put("bidId", plan.getBidId().toString());
			map.put("state", "1,2");
			List<PlBidInfo> infoList = plBidInfoService.getInfo(map);
			for (PlBidInfo p : infoList) {
				money = money.add(p.getUserMoney());
			}
			plan.setInvestMoney(money);
			//只有未发布和招标中的按计划招标金额计算占比，其他状态按实际投资金额计算占比
			if(!"0,1".contains(plan.getState().toString()) ){
				if(plan.getProType().equals("P_Dir")){
					BpPersionDirPro bpPersionDirPro = bpPersionDirProService.get(plan.getPDirProId());
					plan.setBidMoneyScale(money.divide(bpPersionDirPro.getBidMoney(), 8,
							BigDecimal.ROUND_HALF_UP).multiply(new BigDecimal(100)).doubleValue());
				}else if(plan.getProType().equals("B_Dir")){
					BpBusinessDirPro bpBusinessDirPro = bpBusinessDirProService.get(plan.getBdirProId());
					plan.setBidMoneyScale(money.divide(bpBusinessDirPro.getBidMoney(), 8,
							BigDecimal.ROUND_HALF_UP).multiply(new BigDecimal(100)).doubleValue());
				}else if(plan.getProType().equals("P_Or")){
					BpPersionOrPro bpPersionOrPro = bpPersionOrProService.get(plan.getPOrProId());
					plan.setBidMoneyScale(money.divide(bpPersionOrPro.getBidMoney(), 8,
							BigDecimal.ROUND_HALF_UP).multiply(new BigDecimal(100)).doubleValue());
				}else if(plan.getProType().equals("B_Or")){
					BpBusinessOrPro bpBusinessOrPro = bpBusinessOrProService.get(plan.getBorProId());
					plan.setBidMoneyScale(money.divide(bpBusinessOrPro.getBidMoney(), 8,
							BigDecimal.ROUND_HALF_UP).multiply(new BigDecimal(100)).doubleValue());
				}
			}
			
			if (plan.getBidMoney().compareTo(new BigDecimal(0)) != 0) {
				plan.setBidSchedule(money.divide(plan.getBidMoney(), 2,
								BigDecimal.ROUND_HALF_UP).multiply(
								new BigDecimal(100)));
			} else {
				plan.setBidSchedule(new BigDecimal(0));
			}

		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer serializer = JsonUtil.getJSONSerializer(
				"publishSingeTime", "bidEndTime", "updatetime", "createtime",
				"prepareSellTime");
		buff.append(serializer.exclude(new String[] { "class" })
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}
	/**
	 * 显示标列表
	 */
	public String bidList() {
		int [] bidStates = null;
		PagingBean pb = new PagingBean(start, limit);
		switch (state) {
		case 11:
			bidStates = new int[] { -1,1,2,3,4,5,6,7,9,10};
			break;
		case 12:
			bidStates = new int[] { 1,2,4};
			break;
		case 13:
			bidStates = new int[] { 2,4};
			break;
	    default:
	       bidStates = new int[] { state};
	
		}
		String bstate=this.getRequest().getParameter("bstate");
		if(null!=bstate  && !"".equals(bstate) ){
			bidStates = new int[] { Integer.valueOf(bstate)};
		}
		List<PlBidPlan> list = new ArrayList<PlBidPlan>();
		Long count=new Long(0);
		String proType=this.getRequest().getParameter("proType");
		if(null!=proType && "P_Dir".equals(proType)){
			 list = plBidPlanService.pdBidPlanList(getRequest(), pb, bidStates);
			 count=plBidPlanService.countPdBidPlanList(getRequest(), null, bidStates);
		}
		if(null!=proType && "B_Dir".equals(proType)){
			 list = plBidPlanService.bdBidPlanList(getRequest(), pb, bidStates);
			 count=plBidPlanService.countbdBidPlanList(getRequest(), null, bidStates);
		}
		if(null!=proType && "P_Or".equals(proType)){
			 list = plBidPlanService.poBidPlanList(getRequest(), pb, bidStates);
			 count=plBidPlanService.countPoBidPlanList(getRequest(), null, bidStates);
		}
		if(null!=proType && "B_Or".equals(proType)){
			 list = plBidPlanService.boBidPlanList(getRequest(), pb, bidStates);
			 count=plBidPlanService.countboBidPlanList(getRequest(), null, bidStates);
		}
		for (PlBidPlan plan : list) {
			BigDecimal money = new BigDecimal(0);
			List<InvestPersonInfo> plist = investPersonInfoService
					.getByBidPlanId(plan.getBidId());
			for (InvestPersonInfo p : plist) {
				money = money.add(p.getInvestMoney());
			}
			if (plan.getBidMoney().compareTo(new BigDecimal(0)) != 0) {
				plan
						.setBidSchedule(money.divide(plan.getBidMoney(), 2,
								BigDecimal.ROUND_HALF_UP).multiply(
								new BigDecimal(100)));
			} else {
				plan.setBidSchedule(new BigDecimal(0));
			}

		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(count).append(
						",result:");
		JSONSerializer serializer = JsonUtil.getJSONSerializer(
				"publishSingeTime", "bidEndTime", "updatetime", "createtime",
				"prepareSellTime");
		buff.append(serializer.exclude(new String[] { "class" })
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}
	/**
	 * 会员借款项目
	 * @return
	 */
	public String borrowPlbidPlan(){
		QueryFilter filter = new QueryFilter(getRequest());
		String userName = this.getRequest().getParameter("userName");
		String bidName = this.getRequest().getParameter("bidName");
		String bidProNumber = this.getRequest().getParameter("bidProNumber");
		if(bidName!=null&&!bidName.equals("")){
			filter.addFilter("Q_bidProName_S_EQ", bidName);
		}
		if(bidProNumber!=null&&!bidProNumber.equals("")){
			filter.addFilter("Q_bidProNumber_S_EQ", bidProNumber);
		}
		filter.addSorted("createtime", "DESC");
		List<PlBidPlan> list = plBidPlanService.getAll(filter);
		List<PlBidPlan> listSize = plBidPlanService.getAll();
		for (PlBidPlan plan : list) {
			plBidPlanService.evict(plan);
			if(plan.getBpPersionDirPro()!=null){
			}else{
				plan.setBpPersionDirPro(new BpPersionDirPro());
			}
			if(plan.getBpBusinessDirPro()!=null){
			}else{
				plan.setBpBusinessDirPro(new BpBusinessDirPro());
			}
			
			if(plan.getProType().equals("P_Dir")){
				plan.setInterestPeriod(Integer.valueOf(plan.getBpPersionDirPro().getLoanLife()));
				plan.setYearInterestRate(plan.getBpPersionDirPro().getYearInterestRate());
				plan.setMoneyPlanId(plan.getBpPersionDirPro().getMoneyPlanId());
				plan.setProjId(plan.getBpPersionDirPro().getProId());
				plan.setOppositeType("person_customer");
			}
			if(plan.getProType().equals("B_Dir")){
				plan.setInterestPeriod(Integer.valueOf(plan.getBpBusinessDirPro().getLoanLife()));
				plan.setYearInterestRate(plan.getBpBusinessDirPro().getYearInterestRate());
				plan.setMoneyPlanId(plan.getBpBusinessDirPro().getMoneyPlanId());
				plan.setProjId(plan.getBpBusinessDirPro().getProId());
				plan.setOppositeType("company_customer");
			}
			
			BpCustMember bp = plBidPlanService.getLoanMember(plan);
			if(bp!=null){
				plan.setLoginName(bp.getLoginname());
			}
		}
		List<PlBidPlan> userList = new ArrayList<PlBidPlan>();
		if(userName!=null&&!userName.equals("")){
			for (PlBidPlan plan : list) {
				String loginName = plan.getLoginName();
				if(plan.getLoginName()!=null){
					if(loginName.equals(userName)){
						userList.add(plan);
					}
				}
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(listSize.size()).append(",result:");
		JSONSerializer json = JsonUtil.getJSONSerializerDateByFormate("yyyy-MM-dd");
		//serializer.exclude(new String[]{"*.handler","*.hibernateLazyInitializer"})  ;
		if(userName!=null&&!userName.equals("")){
			buff.append(json.exclude(new String[]{"*.handler","*.hibernateLazyInitializer"}).serialize(userList));
		}else{
			buff.append(json.exclude(new String[]{"*.handler","*.hibernateLazyInitializer"}).serialize(list));
		}
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	/**
	 * 导出
	 */
	   public void borrowPlbidPlanToexcel(){
		   QueryFilter filter = new QueryFilter(getRequest());
			String userName = this.getRequest().getParameter("userName");
			String bidName = this.getRequest().getParameter("bidName");
			String bidProNumber = this.getRequest().getParameter("bidProNumber");
			if(bidName!=null&&!bidName.equals("")){
				filter.addFilter("Q_bidProName_S_EQ", bidName);
			}
			if(bidProNumber!=null&&!bidProNumber.equals("")){
				filter.addFilter("Q_bidProNumber_S_EQ", bidProNumber);
			}
			filter.addSorted("createtime", "DESC");
			List<PlBidPlan> list = plBidPlanService.getAll(filter);
			for (PlBidPlan plan : list) {
				plBidPlanService.evict(plan);
				if(plan.getBpPersionDirPro()!=null){
					plan.setInterestPeriod(Integer.valueOf(plan.getBpPersionDirPro().getLoanLife()));
				}else{
					plan.setBpPersionDirPro(new BpPersionDirPro());
				}
				if(plan.getBpBusinessDirPro()!=null){
					plan.setInterestPeriod(Integer.valueOf(plan.getBpBusinessDirPro().getLoanLife()));
				}else{
					plan.setBpBusinessDirPro(new BpBusinessDirPro());
				}
				BpCustMember bp = plBidPlanService.getLoanMember(plan);
				if(bp!=null){
					plan.setLoginName(bp.getLoginname());
				}
			}
			List<PlBidPlan> userList = new ArrayList<PlBidPlan>();
			if(userName!=null&&!userName.equals("")){
				for (PlBidPlan plan : list) {
					String loginName = plan.getLoginName();
					if(plan.getLoginName()!=null){
						if(loginName.equals(userName)){
							userList.add(plan);
						}
					}
				}
			}
			if(userList.size()>0){
				for(PlBidPlan pl:userList){
					if(pl.getState()==0){
						pl.setStateRemark("待发标");
					}else if(pl.getState()==1){
						pl.setStateRemark("招标中");
					}else if(pl.getState()==2){
						pl.setStateRemark("已满标");
					}else if(pl.getState()==3){
						pl.setStateRemark("已流标");
					}else if(pl.getState()==4){
						pl.setStateRemark("已过期");
					}else if(pl.getState()==5){
						pl.setStateRemark("起息办理中");
					}else if(pl.getState()==6){
						pl.setStateRemark("起息办理中");
					}else if(pl.getState()==7){
						pl.setStateRemark("还款中");
					}else if(pl.getState()==10){
						pl.setStateRemark("已完成");
					}else if(pl.getState()==-1){
						pl.setStateRemark("已关闭");
					}
					if(pl.getBpPersionDirPro().getYearInterestRate()!=null){
						pl.setYearInterestRate(pl.getBpPersionDirPro().getYearInterestRate());
					}
					if(pl.getBpBusinessDirPro().getYearInterestRate()!=null){
						pl.setYearInterestRate(pl.getBpBusinessDirPro().getYearInterestRate());
					}
				}
			}else{
				for(PlBidPlan pl:list){
					if(pl.getState()==0){
						pl.setStateRemark("待发标");
					}else if(pl.getState()==1){
						pl.setStateRemark("招标中");
					}else if(pl.getState()==2){
						pl.setStateRemark("已满标");
					}else if(pl.getState()==3){
						pl.setStateRemark("已流标");
					}else if(pl.getState()==4){
						pl.setStateRemark("已过期");
					}else if(pl.getState()==5){
						pl.setStateRemark("起息办理中");
					}else if(pl.getState()==6){
						pl.setStateRemark("起息办理中");
					}else if(pl.getState()==7){
						pl.setStateRemark("还款中");
					}else if(pl.getState()==10){
						pl.setStateRemark("已完成");
					}else if(pl.getState()==-1){
						pl.setStateRemark("已关闭");
					}
					if(pl.getBpPersionDirPro().getYearInterestRate()!=null){
						pl.setYearInterestRate(pl.getBpPersionDirPro().getYearInterestRate());
					}
					if(pl.getBpBusinessDirPro().getYearInterestRate()!=null){
						pl.setYearInterestRate(pl.getBpBusinessDirPro().getYearInterestRate());
					}
				}
				
			}
			String[] tableHeader = { "序号", "借款人", "招标名称","项目编号","招标金额","年化利率(%)","招标截止日期","项目状态","起息日","项目期限(月)" };
			String[] fields = {"loginName","bidProName","bidProNumber","bidMoney","yearInterestRate","bidEndTime","stateRemark","startIntentDate","interestPeriod"};
			try {
				if(userList.size()>0){
					ExportExcel.export(tableHeader, fields, userList,"会员借款信息", PlBidPlan.class);
				}else{
					ExportExcel.export(tableHeader, fields, list,"会员借款信息", PlBidPlan.class);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				plBidPlanService.remove(new Long(id));
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		PlBidPlan plBidPlan = plBidPlanService.get(bidId);

		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer serializer = JsonUtil.getJSONSerializer(
				"publishSingeTime", "createtime", "updateTime", "bidEndTime",
				"prepareSellTime");
		sb.append(serializer.exclude(new String[] { "class" }).serialize(
				plBidPlan));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {//Ext.getCmp('residueMoney').setValue(residueMoney-currMoney);
		return SUCCESS;
	}

	/**
	 * 更新方案状态 是否 已经发布完成
	 * 
	 * @param plBidPlan
	 */
	private void updatePlanStat(PlBidPlan plBidPlan) {
		if (plBidPlan.getProType().equals("B_Dir")) {
			BpBusinessDirPro bdirpro = bpBusinessDirProService.get(plBidPlan
					.getBdirProId());
			PlBusinessDirProKeep plBusinessDirProKeep=plBusinessDirProKeepService.getByType("B_Dir", bdirpro.getBdirProId());
			bdirpro = bpBusinessDirProService.residueMoneyMeth(bdirpro);
			
			plBidPlan.setReceiverName(bdirpro.getReceiverName());
			plBidPlan.setReceiverP2PAccountNumber(bdirpro.getReceiverP2PAccountNumber());
			plBidPlan.setProKeepType(plBusinessDirProKeep.getPlKeepProtype().getName());//标的类型
			plBidPlan.setKeepCreditlevelName(plBusinessDirProKeep.getPlKeepCreditlevel().getName());//信用等级
			plBidPlan.setPayMoneyTime(bdirpro.getLoanLife());//借款期限
			plBidPlan.setPayMoneyTimeType(bdirpro.getPayAcctualType());//还款时间方式
			if (bdirpro.getRate() >= 100) {
				bdirpro.setSchemeStat(1);
				bpBusinessDirProService.save(bdirpro);
			}
		} else if (plBidPlan.getProType().equals("B_Or")) {
			BpBusinessOrPro borpro = bpBusinessOrProService.get(plBidPlan
					.getBorProId());
			PlBusinessDirProKeep plBusinessDirProKeep=plBusinessDirProKeepService.getByType("B_Or", borpro.getBorProId());
			BpFundProject bpFundProject=bpFundProjectService.get(borpro.getMoneyPlanId());
			borpro = bpBusinessOrProService.residueMoneyMeth(borpro);
			
			plBidPlan.setReceiverName(borpro.getReceiverName());
			plBidPlan.setReceiverP2PAccountNumber(borpro.getReceiverP2PAccountNumber());
			plBidPlan.setProKeepType(plBusinessDirProKeep.getPlKeepProtype().getName());//标的类型
			plBidPlan.setKeepCreditlevelName(plBusinessDirProKeep.getPlKeepCreditlevel().getName());//信用等级
			plBidPlan.setPayMoneyTime(bpFundProject.getPayintentPeriod());//借款期限
			plBidPlan.setPayMoneyTimeType(bpFundProject.getPayaccrualType());//还款时间方式
			if (borpro.getRate() >= 100) {
				borpro.setSchemeStat(1);
				bpBusinessOrProService.save(borpro);
			}
		} else if (plBidPlan.getProType().equals("P_Dir")) {
			BpPersionDirPro pdirpro = bpPersionDirProService.get(plBidPlan
					.getPDirProId());
			PlPersionDirProKeep persionDirProKeep=plPersionDirProKeepService.getByType("P_Dir", pdirpro.getPdirProId());
			pdirpro = bpPersionDirProService.residueMoneyMeth(pdirpro);
			plBidPlan.setReceiverName(pdirpro.getReceiverName());
			plBidPlan.setReceiverP2PAccountNumber(pdirpro.getReceiverP2PAccountNumber());
			plBidPlan.setProKeepType(persionDirProKeep.getPlKeepProtype().getName());//标的类型
			plBidPlan.setKeepCreditlevelName(persionDirProKeep.getPlKeepCreditlevel().getName());//信用等级
			plBidPlan.setPayMoneyTime(pdirpro.getLoanLife());//借款期限
			plBidPlan.setPayMoneyTimeType(pdirpro.getPayAcctualType());//还款时间方式
			if (pdirpro.getRate() >= 100) {
				pdirpro.setSchemeStat(1);
				bpPersionDirProService.save(pdirpro);
			}
		} else if (plBidPlan.getProType().equals("P_Or")) {
			BpPersionOrPro porpro = bpPersionOrProService.get(plBidPlan
					.getPOrProId());
			PlPersionDirProKeep persionDirProKeep=plPersionDirProKeepService.getByType("P_Or", porpro.getPorProId());
			BpFundProject bpFundProject=bpFundProjectService.get(porpro.getMoneyPlanId());
			porpro = bpPersionOrProService.residueMoneyMeth(porpro);
			
			plBidPlan.setReceiverName(porpro.getReceiverName());
			plBidPlan.setReceiverP2PAccountNumber(porpro.getReceiverP2PAccountNumber());
			plBidPlan.setProKeepType(persionDirProKeep.getPlKeepProtype().getName());//标的类型
			plBidPlan.setKeepCreditlevelName(persionDirProKeep.getPlKeepCreditlevel().getName());//信用等级
			plBidPlan.setPayMoneyTime(bpFundProject.getPayintentPeriod());//借款期限
			plBidPlan.setPayMoneyTimeType(bpFundProject.getPayaccrualType());//还款时间方式
			if (porpro.getRate() >= 100) {
				porpro.setSchemeStat(1);
				bpPersionOrProService.save(porpro);
			}
		}
		//更新 标 的 借款人信息
		plBidPlanService.merge(plBidPlan);
	}


	// 针对已流标的关闭
	public String closeBidInfo() {
		try {
			String state = this.getRequest().getParameter("state");
			plBidPlan = plBidPlanService.get(bidId);
			plBidPlan.setState(Integer.valueOf(state));
			plBidPlanService.save(plBidPlan);
			if (state != null && state.equals("-1")) {
				Set<PlBidInfo> info = plBidPlan.getPlBidInfos();
				Iterator iterator = info.iterator();
				while (iterator.hasNext()) {
					PlBidInfo temp = (PlBidInfo) iterator.next();
					temp.setState(Short.valueOf("4"));
					plBidInfoService.save(temp);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**
	 * 如果是线上申请  则需要修改申请记录的状态
	 * @param plBidPlan
	 */
	public void changeApplyState(PlBidPlan plBidPlan){
		BpFinanceApplyUser apply=null;
		if("P_Dir".equals(plBidPlan.getProType())){//个人直投标
        	BpPersionDirPro pro=bpPersionDirProService.get(plBidPlan.getPDirProId());
        	if(null!=pro && null!=pro.getLoanId()){
        		apply=bpFinanceApplyUserService.get(pro.getLoanId());
        	}
        }else if("B_Dir".equals(plBidPlan.getProType())){//企业直投
        	BpBusinessDirPro pro=bpBusinessDirProService.get(plBidPlan.getBdirProId());
        	if(null!=pro && null!=pro.getLoanId()){
        		apply=bpFinanceApplyUserService.get(pro.getLoanId());
        	}
        }
		if(null!=apply){
			apply.setState("6");
			bpFinanceApplyUserService.merge(apply);
		}
	}

	/**
	 * 预览发标信息 isPublish 是否发布 true 发布 false 不发布
	 */
	public String previewPublish() {
		return SUCCESS;
	}
	/**
	 * 
	 * @param plBidPlan 标的信息
	 * @return
	 */
	private Object[] checkPreviewPublishCondition(PlBidPlan plBidPlan2) {
		Object[] ret=new Object[2];
		if(checkProjectEdit(plBidPlan2)){
			BpCustMember member = plBidPlanService.getLoanMember(plBidPlan2);
			if(member!=null){
				if(configMap.get("thirdPayType").toString().equals("0")){
					if(member.getThirdPayFlagId()!=null&&!"".equals(member.getThirdPayFlagId())){
						if(member.getThirdPayStatus()!=null&&member.getThirdPayStatus().equals(BpCustMember.THIRDPAY_DEACCTIVED)){//第三方账户未激活
							ret[0]=false;
							ret[1]="招标项目的借款人或债权持有者第三支付账户未激活，请等待账户激活后发布项目";
						}else{
							plBidPlan2.setReceiverName(member.getTruename());
							plBidPlan2.setReceiverP2PAccountNumber(member.getLoginname());
							ret[0]=true;
							ret[1]="招标项目可以发布";
						}
						
					}else{
						ret[0]=false;
						ret[1]="招标项目的借款人或债权持有者必须开通第三支付账户";
					}
				}else{
					ret[0]=true;
					ret[1]="招标项目可以发布";
				}
			}else{
				ret[0]=false;
				ret[1]="招标项目必须有借款人或者债权持有人";
			}
		}else{
			ret[0]=false;
			ret[1]="招标项目没有维护，请先维护项目";
		}
		return ret;
	}
	
	
	/**
	 * 检查招标项目是否维护
	 * @param plBidPlan2
	 * @return
	 */
	private boolean checkProjectEdit(PlBidPlan plBidPlan2) {
		Boolean flag=false;
		if (plBidPlan2.getProType().equals("B_Dir")) {
			BpBusinessDirPro dirPro = bpBusinessDirProService.get(plBidPlan.getBdirProId());
			if (dirPro.getKeepStat() != 0) {//已经维护了项目
				flag=true;
			}
		} else if (plBidPlan2.getProType().equals("B_Or")) {
			BpBusinessOrPro orPro=bpBusinessOrProService.get(plBidPlan.getBorProId());
			if (orPro.getKeepStat() != 0) {//已经维护了项目
				flag=true;
			}
		} else if (plBidPlan2.getProType().equals("P_Dir")) {
			BpPersionDirPro dirPro = bpPersionDirProService.get(plBidPlan.getPDirProId());
			if (dirPro.getKeepStat() != 0) {//已经维护了项目
				flag=true;
			}
		} else if (plBidPlan2.getProType().equals("P_Or")) {
			BpPersionOrPro dirPro = bpPersionOrProService.get(plBidPlan.getPOrProId());
			if (dirPro.getKeepStat() != 0) {//已经维护了项目
				flag=true;
			}
		}
		return flag;
	}

	/**
	 * 启动资金匹配流程
	 * */
	public String startMatchingFundsFlow() {
		PlBidPlan plBidPlan = plBidPlanService.get(bidId);
		// plBidPlan.get
		// 验证 是否已经启动过该流程
		if (plBidPlan.getState() == PlBidPlan.STATE6) {
			jsonString = "{success:false,\"msg\":\"已经启动过不能重复启动!\"}";
		} else {
			List<InvestPersonInfo> list = investPersonInfoService
					.getByBidPlanId(bidId);
			if (null == list || list.size() == 0) {
				jsonString = "{success:true,msg:'该标的投资金额为0，不能启动办理流程!'}";
				return SUCCESS;
			}
			String str = slSmallloanProjectService
					.startMatchingFunds(
							bidId,
							((plBidPlan.getProType().equals("B_Dir") || plBidPlan
									.getProType().equals("P_Dir")) ? "matchingfundsflow"
									: "transferMatchingfundsflow"));
			jsonString = "{success:true," + str + "}";
			/******
			 * 通过配置----决定流程所走的vm路径 *
			 ****/
			/*
			 * if(projectId!=null){ SlSmallloanProject project =
			 * slSmallloanProjectService.get(projectId);
			 * if(project.getFlowType().equals("drySmallloanFlow")){ String str
			 * = slSmallloanProjectService.completeMatchingTask(projectId,
			 * bidId)+""; jsonString="{success:true,"+str+"}"; }else {
			 */
			// if(plBidPlan.getProType().equals("B_Dir")||plBidPlan.getProType().equals("P_Dir")){

			/*
			 * }else if(plBidPlan.getProType().equals("B_Or")){ str =
			 * slSmallloanProjectService.startMatchingFunds(projectId,
			 * bidId,"BondEnterpriseMatchFlow"); }else
			 * if(plBidPlan.getProType().equals("P_Or")){ str =
			 * slSmallloanProjectService.startMatchingFunds(projectId,
			 * bidId,"BondMatchFlow"); }
			 */
			// String str =
			// slSmallloanProjectService.startMatchingFunds(projectId,
			// bidId,"matchingfundsflow");

			/*
			 * }else if(project.getFlowType().equals("BondTransferFlow")){
			 * String str =
			 * slSmallloanProjectService.startMatchingFunds(projectId,
			 * bidId,"matchingfundsflow"); jsonString="{success:true,"+str+"}";
			 * }else if(project.getFlowType().equals("zftCreditFlow")){ String
			 * str = slSmallloanProjectService.startMatchingFunds(projectId,
			 * bidId,"BondMatchFlow"); jsonString="{success:true,"+str+"}"; } }
			 */

			// list();//重新刷新数据
		}
		return SUCCESS;
	}

	/**
	 * 预览发布 生成 html 页面
	 * 
	 * @param isPublish
	 *            是否发布 true 发布 false 不发布
	 * @return
	 */
	public String[] buildHtml(boolean isPublish) {
		String[] ret = new String[3];
		Map<String, Object> data = buildHtml2WebService.getCommonData();
		String htmlFilePath = "";
		HtmlConfig htmlConfig = null;
		boolean isFirst = false;// 是否已经存在页面
		try {
			plBidPlan = plBidPlanService.get(bidId);
			// 获取动态信息 如 投标进度 投标人数 投标剩余金额
			plBidPlan = plBidPlanService.bidDynamic(plBidPlan);
			PlPersionDirProKeep keep=null;
			PlBusinessDirProKeep bkeep=null;
			if (plBidPlan.getProType().equals("B_Dir")) {
				// htmlConfig =
				// resultWebPmsService.findHtmlCon(HtmlConfig.BUSINESSDIRBID_CONTENT);
				bkeep=plBusinessDirProKeepService.getByType(plBidPlan.getProType(),plBidPlan.getBdirProId());
				plBidPlan.setLoanTotalMoney(new BigDecimal(plBidPlanService
						.findLoanTotalMoneyBySQL(plBidPlan
								.getBpBusinessDirPro().getProId().toString())));
				plBidPlan.setOrgMoney(new BigDecimal(plBidPlanService
						.findOrgMoneyBySQL(plBidPlan.getBpBusinessDirPro()
								.getProId().toString(), "1")));

			} else if (plBidPlan.getProType().equals("B_Or")) {
				// htmlConfig =
				// resultWebPmsService.findHtmlCon(HtmlConfig.BUSINESSORBID_CONTENT);
				bkeep=plBusinessDirProKeepService.getByType(plBidPlan.getProType(),plBidPlan.getBorProId());
				plBidPlan.setLoanTotalMoney(new BigDecimal(plBidPlanService
						.findLoanTotalMoneyBySQL(plBidPlan.getBpBusinessOrPro()
								.getProId().toString())));
				plBidPlan.setOrgMoney(new BigDecimal(plBidPlanService
						.findOrgMoneyBySQL(plBidPlan.getBpBusinessOrPro()
								.getProId().toString(), "1")));
			} else if (plBidPlan.getProType().equals("P_Dir")) {
				// htmlConfig =
				// resultWebPmsService.findHtmlCon(HtmlConfig.PERSIONDIRBID_CONTENT);
				keep=plPersionDirProKeepService.getByType(plBidPlan.getProType(),plBidPlan.getPDirProId());
				plBidPlan.setLoanTotalMoney(new BigDecimal(plBidPlanService
						.findLoanTotalMoneyBySQL(plBidPlan.getBpPersionDirPro()
								.getProId().toString())));
				plBidPlan.setOrgMoney(new BigDecimal(plBidPlanService
						.findOrgMoneyBySQL(plBidPlan.getBpPersionDirPro()
								.getProId().toString(), "1")));
			} else if (plBidPlan.getProType().equals("P_Or")) {
				// htmlConfig =
				// resultWebPmsService.findHtmlCon(HtmlConfig.PERSIONORBID_CONTENT);
				keep=plPersionDirProKeepService.getByType(plBidPlan.getProType(),plBidPlan.getPOrProId());
				plBidPlan.setLoanTotalMoney(new BigDecimal(plBidPlanService
						.findLoanTotalMoneyBySQL(plBidPlan.getBpPersionOrPro()
								.getProId().toString())));
				plBidPlan.setOrgMoney(new BigDecimal(plBidPlanService
						.findOrgMoneyBySQL(plBidPlan.getBpPersionOrPro()
								.getProId().toString(), "1")));

			}
			if(null!=keep){
				PlKeepProtype protype=plKeepProtypeService.get(keep.getTypeId());
				if(null!=protype){
					plBidPlan.setProKeepType(protype.getName());
				}
			}
			findPlanProjInfo(data, plBidPlan);
			if (plBidPlan.getHtmlPath() != null
					&& !plBidPlan.getHtmlPath().equals("")) {
				htmlFilePath = plBidPlan.getHtmlPath();
				isFirst = true;
			} else {
				// htmlFilePath = htmlConfig.getHtmlFilePath();
			}
			String templateFilePath = "";
			data.put("htmlFilePath", htmlFilePath);
			data.put("templateFilePath", templateFilePath);
			data.put("plan", JsonUtils.getJson(plBidPlan, JsonUtils.TYPE_OBJ));
			findPlanProjInfo(data, plBidPlan);
			// buildHtml2WebService.buildHtml(Constants.BUILDHTML_FORMAT_JSON,AppUtil.getWebServiceUrlRs(),
			// "htmlService","signSchemeContentBuildHtml", data);
			if (!isFirst) {
				plBidPlan.setHtmlPath(htmlFilePath);
				plBidPlanService.save(plBidPlan);
			}
			// 是否发布
			if (isPublish) {
				BpCustMember bploaner = plBidPlanService.getLoanMember(plBidPlan);
				plBidPlan.setState(PUBLISHSTAT);
				// 发布时间
				Date d = new Date();
				plBidPlanService.save(plBidPlan);
				ret[0] = "88";
				ret[1] = "生成成功";
				ret[2] = htmlFilePath;

			} else {
				ret[0] = "00";
				ret[1] = "尚未发布";
				ret[2] = "";
			}

		} catch (Exception e) {
			e.printStackTrace();
			ret[0] = "00";
			ret[1] = "生成失败,可能未维护项目";
			ret[2] = "";
		}
		return ret;
	}

	private Map<String, Object> findPlanProjInfo(Map<String, Object> data,
			PlBidPlan plBidPlan) {
		Object planPro = null;
		Object planKeep = null;
		QueryFilter filter = new QueryFilter(this.getRequest());
		if (plBidPlan.getProType().equals("B_Dir")) {
			planPro = bpBusinessDirProService.get(plBidPlan.getBdirProId());
			filter.addFilter("Q_bpBusinessDirPro.bdirProId_L_EQ", plBidPlan
					.getBdirProId().toString());
			planKeep = plBusinessDirProKeepService.getAll(filter).get(0);

		} else if (plBidPlan.getProType().equals("B_Or")) {
			planPro = bpBusinessOrProService.get(plBidPlan.getBorProId());

			filter.addFilter("Q_bpBusinessOrPro.borProId_L_EQ", plBidPlan
					.getBorProId().toString());
			planKeep = plBusinessDirProKeepService.getAll(filter).get(0);

		} else if (plBidPlan.getProType().equals("P_Dir")) {
			planPro = bpPersionDirProService.get(plBidPlan.getPDirProId());

			filter.addFilter("Q_bpPersionDirPro.pdirProId_L_EQ", plBidPlan
					.getPDirProId().toString());
			planKeep = plPersionDirProKeepService.getAll(filter).get(0);

		} else if (plBidPlan.getProType().equals("P_Or")) {
			planPro = bpPersionOrProService.get(plBidPlan.getPOrProId());
			BpPersionOrPro pop = (BpPersionOrPro) planPro;
			if (pop.getLoanStarTime() != null && pop.getLoanEndTime() != null) {
				String month = loanLife(pop.getLoanStarTime(), pop
						.getLoanEndTime());
				pop.setLoanLife(month);
			}
			filter.addFilter("Q_bpPersionOrPro.porProId_L_EQ", plBidPlan
					.getPOrProId().toString());
			planKeep = plPersionDirProKeepService.getAll(filter).get(0);

		}
		data.put("planPro", JsonUtils.getJson(planPro, JsonUtils.TYPE_OBJ));
		data.put("planKeep", JsonUtils.getJson(planKeep, JsonUtils.TYPE_OBJ));
		return data;
	}

	public String loanLife(Date startDate, Date endDate) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Map<Integer, Integer> map = DateUtil.getMonthAndDaysBetweenDate(sdf
				.format(startDate), sdf.format(endDate));
		if (map != null) {
			Integer month = map.get(1);
			return month + "";
		}
		return null;
	}

	public String bidFailed(){
		return SUCCESS;
	}

	

	/**
	 * 保存投标信息到队列表
	 * 
	 * @param plan
	 * @param mem
	 * @param state
	 * @param orderNo
	 * @param userMoney
	 */
	private void saveBidInfo(PlBidPlan plan, BpCustMember mem, Short state,
			String orderNo, BigDecimal userMoney) {
		PlBidInfo bidInfo = new PlBidInfo();
		bidInfo.setBidName(plan.getBidProName());
		bidInfo.setBidtime(new Date());
		bidInfo.setOrderNo(orderNo);
		bidInfo.setBidId(plan.getBidId());
		bidInfo.setState(state);
		bidInfo.setUserId(mem.getId());
		bidInfo.setUserName(mem.getLoginname());
		bidInfo.setUserMoney(userMoney);
		bidInfo.setPreAuthorizationNum(orderNo);
		plBidInfoService.save(bidInfo);
	}

	/**
	 * 获取自动投标符合的list
	 * 
	 * @return
	 */
	private List<PlBidAuto> autoList(PlBidPlan plBidPlan) {
		QueryFilter filter = new QueryFilter(this.getRequest());
		filter.addFilter("Q_isOpen_N_EQ", PlBidAuto.OPEN);
		filter.addFilter("Q_periodStart_N_LE", plBidPlan.getInterestPeriod().toString());
		filter.addFilter("Q_periodEnd_N_GE", plBidPlan.getInterestPeriod().toString());
		filter.addFilter("Q_interestStart_N_LE", plBidPlan.getYearRate().toString());
		filter.addFilter("Q_interestEnd_N_GE", plBidPlan.getYearRate().toString());
		filter.addFilter("Q_rateStart_S_LE", plBidPlan.getCreditLeveId().toString());
		filter.addFilter("Q_rateEnd_S_GE", plBidPlan.getCreditLeveId().toString());
		filter.addFilter("Q_banned_N_GE", "0");
		filter.addSorted("orderTime", QueryFilter.ORDER_ASC);
		filter.getPagingBean().setPageSize(10000000);
		List<PlBidAuto> autolist = plBidAutoService.getAll(filter);
		List<PlBidAuto> list=new ArrayList<PlBidAuto>();
		for(PlBidAuto plbidAuto : autolist){
			//是否可投条件：投资起点金额<=每次投标金额<=单笔投资上限     且  （每次投标金额-起投金额）/递增金额 等于 整数
			String[] riseOk=plbidAuto.getBidMoney().subtract(plBidPlan.getStartMoney()).divide(plBidPlan.getRiseMoney()).setScale(5).toString().split("[.]");
			if(plbidAuto.getBidMoney().compareTo(plBidPlan.getStartMoney())>=0 && 
					plbidAuto.getBidMoney().compareTo(plBidPlan.getMaxMoney())<=0 &&
					Long.valueOf(riseOk[1])==0
			){
				list.add(plbidAuto);
			}
		}
		return list;
	}

	/** 获取已经齐标数量 */
	public String getBidSum() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_state_N_EQ", "2");
		List<PlBidPlan> list = plBidPlanService.getAll(filter);
		if (list == null) {
			setJsonString("{success:true,data:'" + 0 + "'}");
		} else {
			setJsonString("{success:true,data:'" + list.size() + "'}");
		}
		return SUCCESS;
	}

	public String allLoanedList() {
		try {
			PagingBean pb = new PagingBean(start, limit);
			List<PlBidPlan> list = plBidPlanService.allLoanedList(this
					.getRequest(), pb);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(pb.getTotalItems()).append(",result:");
			JSONSerializer serializer = JsonUtil.getJSONSerializer(
					"publishSingeTime", "bidEndTime", "updatetime",
					"createtime", "startIntentDate", "endIntentDate");
			buff.append(serializer.exclude(new String[] { "class" }).serialize(
					list));
			buff.append("}");
			jsonString = buff.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 获得借款人未还的本金
	 */
	public String getSurplusProjectMoney() {
		try {
			StringBuffer buff = new StringBuffer("{success:true");
			String earlyDate = this.getRequest().getParameter("earlyDate");
			String earlyProjectMoney = this.getRequest().getParameter(
					"earlyProjectMoney");
			String penaltyDays = this.getRequest().getParameter("penaltyDays");
			PlBidPlan plBidPlan = plBidPlanService.get(bidId);
			Long projectId = null;
			if (plBidPlan.getProType().equals("B_Dir")) {
				BpBusinessDirPro bdirpro = bpBusinessDirProService
						.get(plBidPlan.getBdirProId());
				projectId = bdirpro.getMoneyPlanId();
			} else if (plBidPlan.getProType().equals("B_Or")) {
				BpBusinessOrPro borpro = bpBusinessOrProService.get(plBidPlan
						.getBorProId());
				projectId = borpro.getMoneyPlanId();
			} else if (plBidPlan.getProType().equals("P_Dir")) {
				BpPersionDirPro pdirpro = bpPersionDirProService.get(plBidPlan
						.getPDirProId());
				projectId = pdirpro.getMoneyPlanId();
			} else if (plBidPlan.getProType().equals("P_Or")) {
				BpPersionOrPro porpro = bpPersionOrProService.get(plBidPlan
						.getPOrProId());
				projectId = porpro.getMoneyPlanId();
			}
			BpFundProject project = bpFundProjectService.get(projectId);
			if (null != earlyDate && !earlyDate.equals("")
					&& null != earlyProjectMoney
					&& !earlyProjectMoney.equals("")) {
				BigDecimal principalMoney = bpFundIntentService
						.getPrincipalMoney(bidId, earlyDate, null);
				BigDecimal money = plBidPlan.getBidMoney().subtract(
						new BigDecimal(earlyProjectMoney));
				if (null != principalMoney) {
					money = money.subtract(principalMoney);
				}
				buff.append(",surplusProjectMoney:" + money);
				if (null != penaltyDays && !penaltyDays.equals("")) {
					BigDecimal penaltyMoney = new BigDecimal(earlyProjectMoney)
							.multiply(new BigDecimal(penaltyDays)).multiply(
									project.getAccrual().divide(
											new BigDecimal(3000), 5,
											BigDecimal.ROUND_HALF_UP));
					buff.append(",penaltyMoney:" + penaltyMoney);
				}
			}
			buff.append("}");
			jsonString = buff.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 散标贷后查询
	 */
	public String findPlbidplanLoanAfter() {

		PagingBean pb = new PagingBean(start, limit);
		List<PlBidPlan> list = plBidPlanService.findPlbidplanLoanAfter(
				getRequest(), pb);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(pb.getTotalItems()).append(",result:");
		JSONSerializer serializer = JsonUtil.getJSONSerializer("endIntentDate",
				"payMoneyTime", "startIntentDate", "bidEndTime", "updatetime",
				"createtime");

		buff.append(serializer.exclude(new String[] { "class" })
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}
	
	/**
	 * 散标贷后查询
	 */
	public String findByState() {

		PagingBean pb = new PagingBean(start, limit);
		/*List<PlBidPlan> list = plBidPlanService.findPlbidplanLoanAfter(
				getRequest(), pb);*/
		List<PlBidPlan> list = plBidPlanService.getByStateList(getRequest(), pb);
		List<PlBidPlan> listCount = plBidPlanService.getByStateList(getRequest(), null);
		//Integer listCount = plBidPlanService.countList(getRequest(), null);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(listCount!=null?listCount.size():0).append(",result:");

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	public String updateInfo() {
		try {
			PlBidPlan plan = plBidPlanService.get(plBidPlan.getBidId());
			BeanUtil.copyNotNullProperties(plan, plBidPlan);
			plBidPlanService.merge(plan);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	public String bidPlanVerification() {
		try {
			PlBidPlan plan = plBidPlanService.get(bidId);
			if (null == plan.getIsLoan() || plan.getIsLoan() != 1) {
				jsonString = "{success:true,isLoan:false}";
				return SUCCESS;
			}
			List<UploadLog> list = uploadLogService.listBybBidId(bidId
					.toString());
			Integer num = 0;
			for (UploadLog log : list) {
				if (null != log.getSuccessCount()) {
					num = num + log.getSuccessCount();
				}
			}
			Long count = procreditContractService.countByBidId(bidId);

			if (count.intValue() > num) {
				jsonString = "{success:true,isUpload:false}";
				return SUCCESS;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	public String allList() {
		try {
			QueryFilter filter = new QueryFilter(this.getRequest());
			List<PlBidPlan> list = plBidPlanService.getAll(filter);
			for (PlBidPlan plan : list) {
				BigDecimal money = new BigDecimal(0);
				List<InvestPersonInfo> plist = investPersonInfoService
						.getByBidPlanId(plan.getBidId());
				for (InvestPersonInfo p : plist) {
					money = money.add(p.getInvestMoney());
				}
				if (plan.getBidMoney().compareTo(new BigDecimal(0)) != 0) {
					plan.setBidSchedule(money.divide(plan.getBidMoney(), 2,
							BigDecimal.ROUND_HALF_UP).multiply(
							new BigDecimal(100)));
				} else {
					plan.setBidSchedule(new BigDecimal(0));
				}

			}
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(filter.getPagingBean().getTotalItems()).append(
							",result:");
			JSONSerializer serializer = JsonUtil.getJSONSerializer(
					"publishSingeTime", "bidEndTime", "updatetime",
					"createtime", "prepareSellTime");
			buff.append(serializer.exclude(new String[] { "class" }).serialize(
					list));
			buff.append("}");

			jsonString = buff.toString();
			System.out.println("---" + buff.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public BpCustMember getLoanerP2PAccount(PlBidPlan bidplan){
		BpCustMember member = null;
		// 借款人关系 获取 网站注册用户信息
		BpCustRelation custRelation = new BpCustRelation();
		// 网站注册用户
		BpCustMember custMamber = new BpCustMember();
		// 项目类型 企业直投 B_Dir 企业 债权 B_Or 个人直投 P_Dir 个人债权 P_Or * @return String
		String loanUserType = "";
		Long loanUserId = null;
		Long custMamberId = null;
		if (bidplan.getProType().equals("B_Dir")) {
			loanUserType = "b_loan";
			loanUserId = bidplan.getBpBusinessDirPro().getBusinessId();
		} else if (bidplan.getProType().equals("B_Or")) {
			loanUserType = "b_loan";
			loanUserId = bidplan.getBpBusinessOrPro().getBusinessId();

		} else if (bidplan.getProType().equals("P_Dir")) {
			loanUserType = "p_loan";
			Long BpPersionOrProId=bidplan.getBpPersionDirPro().getPdirProId();
			loanUserId = bpPersionDirProService.get(BpPersionOrProId).getPersionId();
			//loanUserId = bidplan.getBpPersionDirPro().getPersionId();

		} else if (bidplan.getProType().equals("P_Or")) {
			loanUserType = "p_loan";
			Long BpPersionOrProId=bidplan.getBpPersionOrPro().getPorProId();
			loanUserId = bpPersionOrProService.get(BpPersionOrProId).getPersionId();

		}
		if (loanUserId != null) {
			BpCustRelation bpCustRelation = bpCustRelationService
					.getByLoanTypeAndId(loanUserType, loanUserId);
			if (bpCustRelation != null) {
				custMamberId = bpCustRelation.getP2pCustId();
			}
		}
		if (custMamberId != null && !custMamberId.equals("")) {
			member = bpCustMemberService.get(custMamberId);
		}
		return member;
	}
	
	public String getToTimeDate() {
		PlBidPlan plBidPlan = plBidPlanService.get(bidId);

		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer json = JsonUtil
		.getJSONSerializerDateByFormate("yyyy-MM-dd HH:mm:ss");
		sb.append(json.serialize(plBidPlan));
		sb.append("}");
		jsonString = sb.toString();

		return SUCCESS;
	}
	/**
	 * 将标导出到Excel中
	 */
	public void allExportExcel(){ 
		try {
			QueryFilter filter = new QueryFilter(getRequest());
			// 标的类型
			String Q_proType_S_EQ = this.getRequest()
					.getParameter("Q_proType_S_EQ");

			String Q_state_N_EQ = getRequest().getParameter("Q_state_N_EQ");
			String flag = getRequest().getParameter("flag");
			// 已过期的列表
			if (null != Q_state_N_EQ && "".equals(Q_state_N_EQ)) {

				// 先判断标是否已经手动关闭
				filter.addFilter("Q_state_N_EQ", "-1");
				// 查询出招标中的标信息，再按时间排序
				// filter.addFilter("Q_state_N_EQ", "1");
				filter.addFilter("Q_proType_S_EQ", Q_proType_S_EQ);
				filter.addFilter("Q_bidEndTime_DG_LE", sdf.format(new Date()));
			} else {
				SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				// filter.addFilter("Q_state_N_EQ", Q_state_N_EQ);
				filter.addFilter("Q_proType_S_EQ", Q_proType_S_EQ);
				if (null != Q_state_N_EQ && !Q_state_N_EQ.isEmpty()) {
					if (null != flag && flag.equals("21")) {
						filter.addFilter("Q_prepareSellTime_D_GT", sdf1
								.format(new Date()));
					}
					if (null != flag && flag.equals("22")) {
						filter.addFilter("Q_prepareSellTime_D_LE", sdf1
								.format(new Date()));
						filter.addFilter("Q_publishSingeTime_D_GT", sdf1
								.format(new Date()));

					}
					if (null != flag && flag.equals("23")) {
						filter.addFilter("Q_publishSingeTime_D_LE", sdf1
								.format(new Date()));
					}
				}
			}
			String publishSingeTime_GE = this.getRequest().getParameter("publishSingeTime_GE");
			String publishSingeTime_LE = this.getRequest().getParameter("publishSingeTime_LE");
			String bidEndTime_GE = this.getRequest().getParameter("bidEndTime_GE");
			String bidEndTime_LE = this.getRequest().getParameter("bidEndTime_LE");
			if(null != publishSingeTime_GE && !"".equals(publishSingeTime_GE)){
				filter.addFilter("Q_publishSingeTime_D_GE", publishSingeTime_GE+" 00:00:00");
			}
			if(null != publishSingeTime_LE && !"".equals(publishSingeTime_LE)){
				filter.addFilter("Q_publishSingeTime_D_LE", publishSingeTime_LE+" 23:59:59");		
			}
			if(null != bidEndTime_GE && !"".equals(bidEndTime_GE)){
				filter.addFilter("Q_bidEndTime_D_GE", bidEndTime_GE+" 00:00:00");
			}
			if(null != bidEndTime_LE && !"".equals(bidEndTime_LE)){
				filter.addFilter("Q_bidEndTime_D_LE", bidEndTime_LE+" 23:59:59");		
			}
			filter.addSorted("createtime", "DESC");
			List<PlBidPlan> list = plBidPlanService.getAll(filter);
			for(PlBidPlan pl:list){
				if(null!=pl.getProType() && "P_Dir".equals(pl.getProType())){
					pl.setYearInterestRate(pl.getBpPersionDirPro().getYearInterestRate());
				}
				if(null!=pl.getProType() && "B_Dir".equals(pl.getProType())){
					pl.setYearInterestRate(pl.getBpBusinessDirPro().getYearInterestRate());
				}
				if(null!=pl.getProType() && "P_Or".equals(pl.getProType())){
					pl.setYearInterestRate(pl.getBpPersionOrPro().getYearInterestRate());
				}
				if(null!=pl.getProType() && "B_Or".equals(pl.getProType())){
					pl.setYearInterestRate(pl.getBpBusinessOrPro().getYearInterestRate());
				}
			}
			String[] tableHeader = { "序号", "招标名称","招标编号","招标金额","年利率(%)","预售公告时间","开始投标时间" ,"招标截止时间"};
			String[] fields = {"bidProName","bidProNumber","bidMoney","yearInterestRate","prepareSellTime","publishSingeTime","bidEndTime"};
			try {
			   {
					ExportExcel.export(tableHeader, fields, list,"标的台账列表", PlBidPlan.class);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	//工作桌面展示满标项目
	public String display(){
		String count=this.getRequest().getParameter("limitCount");
		PagingBean pb=new PagingBean(0, 7);//获取前七条数据
		Map map =ContextUtil.createResponseMap(this.getRequest());
		//List<TaskInfo> tasks=flowTaskService.getTaskInfosByUserId(ContextUtil.getCurrentUserId().toString(),pb);
		List<PlBidPlan> tasks=plBidPlanService.getPlanByStatusList(Short.valueOf("2"), pb,map);
		getRequest().setAttribute("plBidPlanList", tasks);
		return "display";
	}
	/**
	 * 查询此借款项目是否有进入还款中或者已完成的标的
	 * @return
	 */
	public String isAfterLoan(){
		Enumeration paramEnu = getRequest().getParameterNames();
		Map<String, String> map = new HashMap<String, String>();
		while(paramEnu.hasMoreElements()){
			String paramName = (String)paramEnu.nextElement();
			String paramValue = (String)getRequest().getParameter(paramName);
			map.put(paramName, paramValue);
		}
		List<PlBidPlan> list = null;
		list=plBidPlanService.getByProType(map);
		if(null !=list && list.size()>0){
			setJsonString("{success:true,msg:'此借款项目有还款中或者已完成的标的，可以进行贷后披露!'}");
		}else{
			setJsonString("{success:false,msg:'此借款项目没有还款中或者已完成的标的，不能进行贷后披露!'}");
		}
		return SUCCESS;
	}
	
	
}
