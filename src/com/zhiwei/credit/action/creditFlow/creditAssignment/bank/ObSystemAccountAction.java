package com.zhiwei.credit.action.creditFlow.creditAssignment.bank;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.Constants;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.util.StringUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.dao.creditFlow.creditAssignment.bank.ObAccountDealInfoDao;
import com.zhiwei.credit.model.creditFlow.creditAssignment.bank.ObAccountDealInfo;
import com.zhiwei.credit.model.creditFlow.creditAssignment.bank.ObSystemAccount;
import com.zhiwei.credit.model.creditFlow.creditAssignment.customer.CsInvestmentperson;
import com.zhiwei.credit.model.p2p.BpCustMember;
import com.zhiwei.credit.model.thirdInterface.ThirdPayAccountDealInfo;
import com.zhiwei.credit.model.thirdInterface.YeePayReponse;
import com.zhiwei.credit.service.creditFlow.creditAssignment.bank.ObAccountDealInfoService;
import com.zhiwei.credit.service.creditFlow.creditAssignment.bank.ObObligationInvestInfoService;
import com.zhiwei.credit.service.creditFlow.creditAssignment.bank.ObSystemAccountService;
import com.zhiwei.credit.service.creditFlow.creditAssignment.customer.CsInvestmentpersonService;
import com.zhiwei.credit.service.creditFlow.finance.SlFundIntentService;
import com.zhiwei.credit.service.p2p.BpCustMemberService;
/**
 * 
 * @author 
 *
 */
public class ObSystemAccountAction extends BaseAction{
	@Resource
	private ObSystemAccountService obSystemAccountService;
	@Resource
	private ObObligationInvestInfoService obObligationInvestInfoService;
	@Resource
	private SlFundIntentService slFundIntentService;
	@Resource
	private CsInvestmentpersonService csInvestmentpersonService;
	@Resource
	private ObAccountDealInfoService  obAccountDealInfoService;
	@Resource
	private BpCustMemberService bpCustMemberService;
	@Resource
	private ObAccountDealInfoDao obAccountDealInfoDao;
	private ObSystemAccount obSystemAccount;
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ObSystemAccount getObSystemAccount() {
		return obSystemAccount;
	}

	public void setObSystemAccount(ObSystemAccount obSystemAccount) {
		this.obSystemAccount = obSystemAccount;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ObSystemAccount> list= obSystemAccountService.getAll(filter);
		
		Type type=new TypeToken<List<ObSystemAccount>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				obSystemAccountService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		ObSystemAccount obSystemAccount=obSystemAccountService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(obSystemAccount));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	
	 public String saveAccount(){
		 String  companyId=this.getRequest().getParameter("companyId");
		 String investName=this.getRequest().getParameter("investName");
		 String investId=this.getRequest().getParameter("investId");
		 String cardNumber=this.getRequest().getParameter("cardNumber");
		 String money=this.getRequest().getParameter("money");
		 String type=this.getRequest().getParameter("type");
		 investName=StringUtil.stringURLDecoderByUTF8(investName);
		 String[] ret=obSystemAccountService.saveAccount(companyId, investName, investId, cardNumber, money, type);
	    if(ret!=null&&ret[0].equals(Constants.CODE_SUCCESS)){
	    	jsonString = "{code:'"+Constants.CODE_SUCCESS+"',msg:'"+ret[1]+"'}";
	    }else{
	    	jsonString = "{code:'"+Constants.CODE_FAILED+"',msg:'"+ret[1]+"'}";
	    }
	    return SUCCESS;
	 }
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(obSystemAccount.getId()==null){
			obSystemAccountService.save(obSystemAccount);
		}else{
			ObSystemAccount orgObSystemAccount=obSystemAccountService.get(obSystemAccount.getId());
			try{
				BeanUtil.copyNotNullProperties(orgObSystemAccount, obSystemAccount);
				obSystemAccountService.save(orgObSystemAccount);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	// 查询出来投资人系统虚拟账户
	public String systemAccountList() {
		String investName = this.getRequest().getParameter("investPersonName");
		String accountType= this.getRequest().getParameter("accountType");
		List<ObSystemAccount> list = obSystemAccountService.findAccountList(investName,accountType,this.getRequest(),start,limit);
		List listcount= obSystemAccountService.findAccountList(investName,accountType,this.getRequest(),null,null);
		if(list != null && list.size() > 0){
			for(ObSystemAccount temp : list){
				BigDecimal freezMoney =obSystemAccountService.prefreezMoney(temp.getId(), null);
				if(freezMoney!=null){
					temp.setFreezeMoney(freezMoney);
					temp.setAvailableInvestMoney(temp.getTotalMoney().subtract(freezMoney));
				}else{
					temp.setAvailableInvestMoney(temp.getTotalMoney());
				}
				BigDecimal investTotalMoney =obSystemAccountService.typeTotalMoney(temp.getId(), ObAccountDealInfo.T_INVEST);
				temp.setTotalInvestMoney(investTotalMoney);
				BigDecimal profitTotalMoney =obSystemAccountService.typeTotalMoney(temp.getId(), ObAccountDealInfo.T_PROFIT);
				temp.setAllInterest(profitTotalMoney);
				BigDecimal princialBackTotalMoney =obSystemAccountService.typeTotalMoney(temp.getId(), ObAccountDealInfo.T_PRINCIALBACK);
				temp.setUnPrincipalRepayment(princialBackTotalMoney);
			}
		}
		/*if (list != null && list.size() > 0) {
			for (ObSystemAccount temp : list) {
				BigDecimal total = new BigDecimal(0);//累计投资额
				BigDecimal current = new BigDecimal(0);//目前投资额
				BigDecimal freeze = new BigDecimal(0);//预冻结投资额（投资尚未生效金额）
				BigDecimal unBackMoney =new BigDecimal(0);//待回收款
				BigDecimal unPrincipalRepayment =new BigDecimal(0);//待回收本金
				BigDecimal unInterest =new BigDecimal(0);//待回收利息
				BigDecimal allInterest =new BigDecimal(0);//累计收回利息
				BigDecimal expectAllInterest =new BigDecimal(0);//预期累计收回利息
				BigDecimal personInterestRate =new BigDecimal(0);//（累计收回利息/累计投资额）为累计收益率
				//表示当前投资人购买的已经全部回款和正在回款的债权记录（用来记录到目前为止这个账户的投资金额）
				List<ObObligationInvestInfo> listobigation = obObligationInvestInfoService.getListInvestPeonId(temp.getInvestmentPersonId(), "2");
				if (listobigation != null && listobigation.size() > 0) {
					for (ObObligationInvestInfo temp1 : listobigation) {
						total = total.add(temp1.getInvestMoney());
						List<SlFundIntent>  listSlFundInterest =slFundIntentService.getTreeIdAndFundType(temp1.getObligationId(), temp1.getInvestMentPersonId(), temp1.getId(),obligationFundIntenList.InvestAccrual);
						if(listSlFundInterest!=null&&listSlFundInterest.size()>0){
							for(SlFundIntent slf :listSlFundInterest){
								allInterest=allInterest.add(slf.getIncomeMoney());
							}
						}
					}
				}
				temp.setAllInterest(allInterest);//累计回收利息
				temp.setTotalInvestMoney(total);//累计投资额
				if(total.compareTo(new BigDecimal(0))==1){
					if(allInterest.compareTo(new BigDecimal(0))==1){
						personInterestRate =allInterest.divide(total,4,BigDecimal.ROUND_UP).multiply(new BigDecimal(100));
					}
				}
				temp.setPersonInterestRate(personInterestRate);//计算投资人收益率
				//表示当前投资人正在回款的债权购买记录（用来计算当前已经投资的金额）
				List<ObObligationInvestInfo> listobigationCu = obObligationInvestInfoService
						.getListInvestPeonId(temp.getInvestmentPersonId(), "1");
				if (listobigationCu != null && listobigationCu.size() > 0) {
					for (ObObligationInvestInfo temp2 : listobigationCu) {
						current = current.add(temp2.getInvestMoney());
						//查出没有对账的款项
						List<SlFundIntent>  listSlFund =slFundIntentService.getListByTreeIdUn(temp2.getObligationId(), temp2.getInvestMentPersonId(), temp2.getId());
						if(listSlFund!=null&&listSlFund.size()>0){
							for(SlFundIntent sl :listSlFund){//用来计算当前账户的未对账的款项
								if(sl.getFundType().equals(obligationFundIntenList.InvestAccrual)||sl.getFundType().equals(obligationFundIntenList.InvestRoot)){
									unBackMoney =unBackMoney.add(sl.getIncomeMoney());
									if(sl.getFundType().equals(obligationFundIntenList.InvestAccrual)){
										unInterest =unInterest.add(sl.getIncomeMoney());
									}else if(sl.getFundType().equals(obligationFundIntenList.InvestRoot)){
										unPrincipalRepayment =unPrincipalRepayment.add(sl.getIncomeMoney());
									}
								}
							}
						}
					}
				}
				temp.setUnBackMoney(unBackMoney);//待回收款
				temp.setUnInterest(unInterest);//待回收利息
				temp.setUnPrincipalRepayment(unPrincipalRepayment);//待回收本金
				expectAllInterest =unInterest.add(allInterest);//预期累计回收利息
				temp.setExpectAllInterest(expectAllInterest);//预期累计回收利息
				temp.setCurrentInvestMoney(current);
				//表示当前投资人正在还没有对账的债权购买记录（用来计算预冻结的投资记录）
				List<ObObligationInvestInfo> listobigationFr = obObligationInvestInfoService
						.getListInvestPeonId(temp.getInvestmentPersonId(), "0");
				if (listobigationFr != null && listobigationFr.size() > 0) {
					for (ObObligationInvestInfo temp3 : listobigationFr) {
						freeze = freeze.add(temp3.getInvestMoney());
					}
				}
				temp.setFreezeMoney(freeze);
				BigDecimal  avaible =temp.getTotalMoney().subtract(freeze);
				temp.setAvailableInvestMoney(avaible);
				
			}
		}*/
		Type type = new TypeToken<List<ObSystemAccount>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,totalCounts:")
				.append(listcount == null ? 0 : listcount.size()).append(",result:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	//根据投资人的id  查出来投资人的系统账户信息 以及投资人信息
	public String getInvestPersonInfo(){
		String msg ="";
		String  investPersonId =this.getRequest().getParameter("investId");
		ObSystemAccount obSystemAccount=obSystemAccountService.getByInvrstPersonId(Long.valueOf(investPersonId));
		CsInvestmentperson person =csInvestmentpersonService.get(Long.valueOf(investPersonId));
		if(person!=null){
			msg =msg+"投资人："+person.getInvestName()+"    身份证号："+person.getCardnumber();
			if(obSystemAccount!=null){
				msg =msg+"    账户金额："+obSystemAccount.getTotalMoney()+"元";
			}
			msg =msg+"    通讯地址："+person.getPostaddress();
		}
		jsonString = "{success:true,msg:'" + msg + "'}";
		return SUCCESS;
	}
	/**
	 * 线上取现申请调用方法
	 * add by linyan 
	 * Date 2014-5-16
	 * @return
	 */
	public String startEnchantedFlow(){
		String investPersonId=this.getRequest().getParameter("investPersonId");
		String resource=this.getRequest().getParameter("resource");
		if(null!=investPersonId &&!"".equals(investPersonId) &&null!=resource&&!"".equals(resource)){
			String[]ret=null;
			String transferType=this.getRequest().getParameter("transferType");
			System.out.println("transferType=="+transferType);
			
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("investPersonId",Long.valueOf(investPersonId));//投资人Id（必填）
			map.put("investPersonType",ObSystemAccount.type0);//投资人类型：0线上投资人，1线下投资人(参见ObSystemAccount中的常量) （必填）					
			map.put("transferType",ObAccountDealInfo.T_ENCHASHMENT);//交易类型:1表示充值，2表示取现,3收益，4投资，5还本(参见ObAccountDealInfo中的常量) （必填）
			map.put("money",new BigDecimal(this.getRequest().getParameter("money")));//交易金额	（必填）			 
			map.put("dealDirection",ObAccountDealInfo.DIRECTION_PAY);//交易方向:1收入，2支出（参见ObAccountDealInfo中的常量）（必填）
			map.put("dealType",ObAccountDealInfo.THIRDPAYDEAL);//交易方式：1表示现金交易，2表示银行卡交易，3表示第三方支付交易（参见ObAccountDealInfo中的常量）（必填）
			map.put("recordNumber",this.getRequest().getParameter("recordNumber"));//交易流水号	（必填）
			map.put("dealStatus",ObAccountDealInfo.DEAL_STATUS_1);//资金交易状态：1等待支付，2支付成功，3 支付失败。。。(参见ObAccountDealInfo中的常量)	（必填）
			ret =obAccountDealInfoService.operateAcountInfo(map);

			/*if(transferType.contains(",")){
				String[] s=transferType.split(",");
				ret=obAccountDealInfoService.newOpreaterDealInfo(investPersonId, s[0], this.getRequest().getParameter("money"), this.getRequest().getParameter("dealType"), resource, this.getRequest().getParameter("operateType"), this.getRequest().getParameter("accountType"), this.getRequest().getParameter("recordNumber"),s[1]);
			}else{
				ret=obAccountDealInfoService.operateAcountInfo(investPersonId, this.getRequest().getParameter("transferType"), this.getRequest().getParameter("money"), this.getRequest().getParameter("dealType"), resource, this.getRequest().getParameter("operateType"), this.getRequest().getParameter("accountType"), this.getRequest().getParameter("recordNumber"));
			}*/
			 
			if(null!=ret){
				jsonString = "{code:'"+ret[0]+"',msg:'" + ret[1] + "'}";
			}else{
				jsonString = "{code:'"+Constants.CODE_FAILED+"',msg:'没有返回值'}";
			}
		}else{
			jsonString = "{code:'"+Constants.CODE_FAILED+"',msg:'投资人ID和投资人类型不能为空'}";
		}
		
		return SUCCESS;
	}
	/**
	 *线上取现客户解冻账户交易信息
	 * @return
	 */
	public String updateAcountInfo(){
		String investPersonId=this.getRequest().getParameter("investPersonId");
		String resource=this.getRequest().getParameter("resource");
		if(null!=investPersonId &&!"".equals(investPersonId) &&null!=resource&&!"".equals(resource)){
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("investPersonId",Long.valueOf(investPersonId));//投资人Id
			map.put("investPersonType",ObSystemAccount.type0);//投资人类型：0线上投资人，1线下投资人(参见ObSystemAccount中的常量)
			map.put("transferType",ObAccountDealInfo.T_ENCHASHMENT);//交易类型:1表示充值，2表示取现,3收益，4投资，5还本(参见ObAccountDealInfo中的常量)
			map.put("money",new BigDecimal(this.getRequest().getParameter("money")));//交易金额
			map.put("dealDirection",ObAccountDealInfo.DIRECTION_PAY);//交易方向:1收入，2支出（参见ObAccountDealInfo中的常量）
			map.put("DealInfoId",null);//交易记录id，没有默认为null
			map.put("recordNumber",this.getRequest().getParameter("recordNumber"));//交易流水号
			map.put("dealStatus",this.getRequest().getParameter("dealRecordStatus"));//资金交易状态：1等待支付，2支付成功，3 支付失败。。。(参见ObAccountDealInfo中的常量)
			String[] ret =obAccountDealInfoService.updateAcountInfo(map);

			//String[] ret=obAccountDealInfoService.updateAcountInfo(Long.valueOf(investPersonId), this.getRequest().getParameter("transferType"), this.getRequest().getParameter("money"), resource, this.getRequest().getParameter("recordNumber"), null, this.getRequest().getParameter("dealRecordStatus"));
			if(null!=ret){
				jsonString = "{code:'"+ret[0]+"',msg:'" + ret[1] + "'}";
			}else{
				jsonString = "{code:'"+Constants.CODE_FAILED+"',msg:'没有返回值'}";
			}	
		}else{
			jsonString = "{code:'"+Constants.CODE_FAILED+"',msg:'投资人ID和投资人类型不能为空'}";
		}
		return SUCCESS;
	}
	
	/**
	 * 新的查询系统账户方法  展示第三方支付账户信息
	 * add by linyan
	 * @return
	 */
	public String newSystemAccountList(){
		List<ObSystemAccount> accountList=obSystemAccountService.getNewSystemAccountList(this.getRequest(),start,limit);
		List<ObSystemAccount> listcount=obSystemAccountService.getNewSystemAccountList(this.getRequest(),null,null);
		Type type = new TypeToken<List<ObSystemAccount>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,totalCounts:")
				.append(listcount == null ? 0 : listcount.size()).append(",result:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm:ss").create();
		buff.append(gson.toJson(accountList, type));
		buff.append("}");
		jsonString = buff.toString();
		System.out.println("jsonString=="+jsonString);
		return SUCCESS;
	}
	/**
	 * 新的方法  用来执行查询系统账户第三方账户信息以及及时刷新虚拟账户余额
	 * add by linyan
	 */
	public void refreshThirdPayAccountCheckFile(){
		String accountId=this.getRequest().getParameter("accountId");
		obSystemAccountService.refreshThirdPayAccountCheckFile(accountId);
	}
	/**
	 * 新方法  全部更新系统第三方账户信息及实时刷新虚拟账户余额
	 * add by linyan
	 */
	public void refreshAllThirdPayAccountCheckFile(){
		obSystemAccountService.mutiplyTreadRefreshThirdPayAccount();
	}
	
	/**
	 * 合作机构资金账户管理
	 * @return
	 */
	public String cooperationAccountList(){

		
		String accountName = this.getRequest().getParameter("accountName");
		String offlineCustType = this.getRequest().getParameter("offlineCustType");
		Map<String,String> map = new HashMap<String, String>();
		map.put("start", this.start.toString());
		map.put("limit", this.limit.toString());
		map.put("accountName",accountName);
		map.put("offlineCustType",offlineCustType);
		
		
		List<ObSystemAccount> accountList = obSystemAccountService.cooperationAccountList(map);
		Long count = obSystemAccountService.cooperationAccountListCount(map);
		
		
		Type type = new TypeToken<List<ObSystemAccount>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,totalCounts:").append(count == null ? 0 : count).append(",result:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm:ss").create();
		buff.append(gson.toJson(accountList, type));
		buff.append("}");
		jsonString = buff.toString();
		System.out.println("jsonString=="+jsonString);
		return SUCCESS;
		
	}
	
	// 查询出来线下投资人系统虚拟账户
	public String systemAccountDownList() {
		List<ObSystemAccount> list = obSystemAccountService.findDownAccount(this.getRequest(),start,limit);
		List listcount= obSystemAccountService.findDownAccount(this.getRequest(),null,null);
		if(list != null && list.size() > 0){
			for(ObSystemAccount temp : list){
				BigDecimal freezMoney =obSystemAccountService.prefreezMoney(temp.getId(), null);
				if(freezMoney!=null){
					temp.setFreezeMoney(freezMoney);
					temp.setAvailableInvestMoney(temp.getTotalMoney().subtract(freezMoney));
				}else{
					temp.setAvailableInvestMoney(temp.getTotalMoney());
				}
				BigDecimal investTotalMoney =obSystemAccountService.typeTotalMoney(temp.getId(), ObAccountDealInfo.T_INVEST);
				temp.setTotalInvestMoney(investTotalMoney);
				BigDecimal profitTotalMoney =obSystemAccountService.typeTotalMoney(temp.getId(), ObAccountDealInfo.T_PROFIT);
				temp.setAllInterest(profitTotalMoney);
				BigDecimal princialBackTotalMoney =obSystemAccountService.typeTotalMoney(temp.getId(), ObAccountDealInfo.T_PRINCIALBACK);
				temp.setUnPrincipalRepayment(princialBackTotalMoney);
			}
		}
		Type type = new TypeToken<List<ObSystemAccount>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,totalCounts:")
				.append(listcount == null ? 0 : listcount.size()).append(",result:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	

	
	
	
	
	
	
	
	
	
	
	
}
