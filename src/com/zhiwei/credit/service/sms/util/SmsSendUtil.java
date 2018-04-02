package com.zhiwei.credit.service.sms.util;

import java.math.BigDecimal;
import java.util.Map;

import javax.annotation.Resource;

import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.service.sms.MessageStrategyService;

/**
 * 发送短信
 * @author songwenjie
 *
 */
public class SmsSendUtil extends BaseAction {
	
	
	 ///////////////////////////一元夺宝发送短信/////////////////////////////
	
	/**--流标发送短信的方法
	 * 尊敬的用户${loginName}，您夺宝的${product}宝物夺宝失败，如有疑问，请致电：4000-903-910。回复TD拒收。
	 * @param phone
	 * @param shortName
	 * @return
	 */
	public String sms_flowProject(String phone ,String loginName,String  product){
	    
	   	Map configMap=AppUtil.getConfigMap();
	   	String content = "";
	   	// 获得短信发送模板
			String temp = configMap.get("sms_flowProject").toString();
			System.out.println("temp短信发送模板==="+temp);
			if(temp!=null && !"".equals(temp)){
				content = temp
				.replace("${loginName}", loginName)
				.replace("${product}", product)
				.replace("${phone}", configMap.get("phone")==null ? "":configMap.get("phone").toString())
				.replace("${subject}", configMap.get("subject")==null?"":configMap.get("subject").toString());
				System.out.println("content==="+content);
			}
		sendMsg(phone,content);
		return "";
   }
	/**--后台发送确认地址的方法
	 * 尊敬的用户${loginName}，您的地址还未确认哦，请尽快确认，以免影响您的宝贝到家！回复TD拒收。
	 * @param phone
	 * @param shortName
	 * @return
	 */
	public String sms_noticeAddress(String phone,String  loginName  ){
		Map configMap=AppUtil.getConfigMap();
	   	String content = "";
	   	// 获得短信发送模板
			String temp = configMap.get("sms_noticeAddress").toString();
			System.out.println("temp短信发送模板==="+temp);
			if(temp!=null && !"".equals(temp)){
				content = temp.replace("${loginName}", loginName)
				.replace("${phone}", configMap.get("phone")==null ? "":configMap.get("phone").toString())
				.replace("${subject}", configMap.get("subject")==null?"":configMap.get("subject").toString());
				System.out.println("content==="+content);
			}
		sendMsg(phone,content);
		return "";
   }
	/**
	 * ----延迟发货
	 * 尊敬的用户${loginName},因不可抗力因素导致发货延误，给您的带来的不便，请谅解，最新商品咨询，详见网站！回复TD拒收。
	 * @param phone
	 * @param shortName
	 * @return
	 */
	public String sms_delaySend(String phone,String loginName){
		Map configMap=AppUtil.getConfigMap();
	   	String content = "";
	   	// 获得短信发送模板
			String temp = configMap.get("sms_delaySend").toString();
			System.out.println("temp短信发送模板==="+temp);
			if(temp!=null && !"".equals(temp)){
				content = temp.replace("${loginName}", loginName)
				.replace("${phone}", configMap.get("phone")==null ? "":configMap.get("phone").toString())
				.replace("${subject}", configMap.get("subject")==null?"":configMap.get("subject").toString());
				System.out.println("content==="+content);
			}
		sendMsg(phone,content);
		return "";
   }
	/**
	 * ----发货通知
	 * 尊敬的用户${loginName}，“您在互融云购平台上获得的奖品，已经开始配送，快递单号网上录入可能会有延后。拍照分享，分享喜悦！回复TD拒收。
	 * @param phone
	 * @param shortName
	 * @return
	 */
	public String sms_sendProduct(String phone,String loginName){
		Map configMap=AppUtil.getConfigMap();
	   	String content = "";
	   	// 获得短信发送模板
			String temp = configMap.get("sms_sendProduct").toString();
			System.out.println("temp短信发送模板==="+temp);
			if(temp!=null && !"".equals(temp)){
				content = temp.replace("${loginName}", loginName)
				.replace("${phone}", configMap.get("phone")==null ? "":configMap.get("phone").toString())
				.replace("${subject}", configMap.get("subject")==null?"":configMap.get("subject").toString());
				System.out.println("content==="+content);
			}
		sendMsg(phone,content);
		return "";
   }
	/**
	 * ----开奖后发送短信信息
	 *  尊敬的用户${loginName}，恭喜您在“互融夺宝”成功获得商品，请您于7日内至互融夺宝会员中心提交/确认收货地址！如有疑问，请致电：${phone}回复TD拒收。
	 * @param phone
	 * @param shortName
	 * @return
	 */
	public String sms_afterWin(String phone,String  loginName){
		Map configMap=AppUtil.getConfigMap();
	   	String content = "";
	   	// 获得短信发送模板
			String temp = configMap.get("sms_afterWin").toString();
			System.out.println("temp短信发送模板==="+temp);
			if(temp!=null && !"".equals(temp)){
				content = temp.replace("${loginName}", loginName)
				.replace("${phone}", configMap.get("phone")==null ? "":configMap.get("phone").toString())
				.replace("${subject}", configMap.get("subject")==null?"":configMap.get("subject").toString());
				System.out.println("content==="+content);
			}
		sendMsg(phone,content);
		return "";
   }
//	 MessageStrategyService messageStrategy=AppUtil.getSysConfig().get("sms_benname")==null?(MessageStrategyService) AppUtil.getBean(AppUtil.getSysConfig().get("hXSmsManagerService").toString()):(MessageStrategyService) AppUtil.getBean(AppUtil.getSysConfig().get("sms_benname").toString());
	
	/***************************** 会员成功注册后发送短信*******************************/
	 
	
	//会员成功注册时信息发送
	//svn:songwj
   @SuppressWarnings({ "unchecked", "static-access" })
	public String vIPRegistrationSend(String phone){
	   Map configMap=AppUtil.getConfigMap();
	   	String content = "";
	   	// 获得短信发送模板
			String temp = configMap.get("sms_VipSegistration").toString();
			System.out.println("temp短信发送模板==="+temp);
			if(temp!=null && !"".equals(temp)){
				content = temp.replace("${phone}", configMap.get("phone")==null ? "":configMap.get("phone").toString())
				.replace("${subject}", configMap.get("subject")==null?"":configMap.get("subject").toString());
				System.out.println("content==="+content);
			}
			sendMsg(phone,content);
			return "";
   }
   
   /***************************** 银行卡绑定后发送短信*******************************/
   
   /**
    * 银行卡绑定后发送短信
    * BpCustMember:账号绑定人员信息
    * svn：songw
    */
   @SuppressWarnings({ "unchecked", "static-access" })
	public String bankCardBindingSend(String cardNum,String phone){
	   	
	   Map configMap=AppUtil.getConfigMap();
	   	
	   	
	   	//1 取出银行卡的后四位
	   	//2 设置发送信息的内容
	   	String content  = "";
	   	if(cardNum != null && !"".equals(cardNum) && phone!=null && !"".equals(phone)){
	   		String lastFourNum = "";
	   		lastFourNum = cardNum.substring(cardNum.length()-4, cardNum.length());
	    
	   		 
		    	// 获得短信发送模板
		 		String temp = configMap.get("sms_BankCardBinding").toString();
				System.out.println("temp短信发送模板==="+temp);//打印模板
				if(temp!=null && !"".equals(temp)){
					content = temp.replace("${lastFourNum}", lastFourNum)//拼接发送的内容
					.replace("${phone}", configMap.get("phone")==null ? "":configMap.get("phone").toString())
					.replace("${subject}", configMap.get("subject")==null?"":configMap.get("subject").toString());
					System.out.println("content==="+content);
				}
				sendMsg(phone,content);
	   	}
		return "";
   }
   
   /*****************************主动投标后发送短信*******************************/
   
   /**
    * 主动投标后发送短信
    * BpCustMember:账号绑定人员信息
    * svn：songw
    */
   @SuppressWarnings({ "unchecked", "static-access" })
	public String initiativeBid(String project,String money,String phone){
	   Map configMap=AppUtil.getConfigMap();
	   	//1 取出银行卡的后四位
	   	//2 设置发送信息的内容
	   	String content  = "";
	   	if(project != null && !"".equals(project) &&  money!=null && !"".equals(money) && phone!=null && !"".equals(phone)){
		    	 
		    	// 获得短信发送模板
		 		String temp = configMap.get("sms_InitiativeBid").toString();
				if(temp!=null && !"".equals(temp)){
					content = temp.replace("${project}", project)
					.replace("${money}", money)
					.replace("${phone}", configMap.get("phone")==null ? "":configMap.get("phone").toString())
					.replace("${subject}", configMap.get("subject")==null?"":configMap.get("subject").toString());
					System.out.println("content==="+content);
				}
	   	}
	   	sendMsg(phone,content);
		return "";
   }
   
   /*****************************发送短信验证码********************************/
   
  /**
   * 发送优惠券短信提醒
   */
   
   @SuppressWarnings({ "static-access", "unchecked" })
    public String sendCode(String userTelephone,BigDecimal couponValue,String couponNumber,String endTime,String telphone,String project,String couponType){
   	
	   
	   	String dw="";
		if(couponType.equals("1")||couponType.equals("2")){
			dw="元";
		}else if(couponType.equals("3")){
			dw="%";
		}
	   	String content  = "";
	   	if(userTelephone != null && !"".equals(userTelephone)){
	   	 Map configMap=AppUtil.getConfigMap();
		    	// 获得短信发送模板
		 		String temp = configMap.get("sms_bpCoupons").toString();
				if(temp!=null && !"".equals(temp)){
					content = temp.replace("${parValue}", couponValue.setScale(2)+dw).replace("${couponNumber}", couponNumber).replace("${endTime}", 
							endTime).replace("${telphone}", telphone).replace("${project}", project);
				}
	   	}
	    sendMsg(userTelephone,content);
	   	System.out.println("content="+content);
	   	return "";
   }
   /**
    * 优惠券提过期醒
    * @param telephone
    * @param codeStr
    * @return
    */

   @SuppressWarnings({ "static-access", "unchecked" })
   public String sendBpcoupons(String userphone,String couponValue,String endTime,String telphone,String project){
	   
	   
	   String content  = "";
	   if(userphone != null && !"".equals(userphone)){
		   Map configMap=AppUtil.getConfigMap();
		   // 获得短信发送模板
		   String temp = configMap.get("sms_endTimeCoupons").toString();
		   if(temp!=null && !"".equals(temp)){
				content = temp.replace("${parValue}", couponValue).replace("${endTime}", 
						endTime).replace("${telphone}", telphone).replace("${project}", project);
		   }
	   }
	   sendMsg(userphone,content);
	   return "";
   }

   /***************************** 还款催收--发送短信*******************************/
	//现尚余${money}元将于${year}年${month}月${day}日到期，请抓紧筹措资金按期归还借款，如到期未还，我公司即依照借款合同有关规定予以处理。【${subject}】
   public String sms_huankuancuishou(String phone,String money,String  year,String month ,String day){
	   
	   Map configMap=AppUtil.getConfigMap();
	   String content = "";
	  // 获得短信发送模板
	   String temp = configMap.get("sms_huankuancuishou").toString();
	   System.out.println("temp短信发送模板==="+temp);
	   if(temp!=null && !"".equals(temp)){
			content = temp
			.replace("${year}", year)
			.replace("${month}", month)
			.replace("${day}", day)
			.replace("${money}", money)
			.replace("${phone}", configMap.get("phone")==null ? "":configMap.get("phone").toString())
			.replace("${subject}", configMap.get("subject")==null?"":configMap.get("subject").toString());
			System.out.println("content==="+content);
	   }
	   sendMsg(phone,content);
	   return "";
   }
		   
	/***************************** 项目通过、终止、结束--发送短信*******************************/
	/*审批通过短信：
	您好！你参与的【${projectName}】已通过了【${flowName}】,请知悉;

	项目终止短信：
	您好！你参与的【${projectName}】已终止【${flowName}】,请知悉;

	项目结束短信：
	您好！你参与的【${projectName}】已结束【${flowName}】,请知悉;*/
	 
	public String sms_projectFinish(String phone,String projectName,String  flowName,String flag){
		   	
		  Map configMap=AppUtil.getConfigMap();
	   	String content = "";
	   	// 获得短信发送模板
	    	String temp = "";
	    	if(null!=flag && "1".equals(flag)){
	    		temp = configMap.get("sms_flowpass").toString();
	    		
	    	}
	    	else if(null!=flag && "2".equals(flag)){
	    		temp = configMap.get("sms_flowfinish").toString();
	    	}
	    	else{
	    		temp = configMap.get("sms_flowstop").toString();
	    		
	    	}
			System.out.println("temp短信发送模板==="+temp);
			if(temp!=null && !"".equals(temp)){
				content = temp
				.replace("${projectName}", projectName)
				.replace("${flowName}", flowName)
				
				//.replace("${phone}", configMap.get("phone")==null ? "":configMap.get("phone").toString())
				.replace("${subject}", configMap.get("subject")==null?"":configMap.get("subject").toString());
				System.out.println("content==="+content);
			}
			sendMsg(phone,content);
			return "";
    }
			   
    /***************************** 下一节点提醒短信--发送短信*******************************/
    //您好！【${projectName}】流转到【${signalName}】节点,请及时处理";
	public String sms_nextNodeRemind(String phone,String projectName,String  signalName){
	   	
		  Map configMap=AppUtil.getConfigMap();
	   	String content = "";
	   	// 获得短信发送模板
	    	String 	temp = configMap.get("sms_nextnoderemind").toString();
	    		
	   
			System.out.println("temp短信发送模板==="+temp);
			if(temp!=null && !"".equals(temp)){
				content = temp
				.replace("${projectName}", projectName)
				.replace("${signalName}", signalName)
				
				//.replace("${phone}", configMap.get("phone")==null ? "":configMap.get("phone").toString())
				.replace("${subject}", configMap.get("subject")==null?"":configMap.get("subject").toString());
				System.out.println("content==="+content);
			}
			 sendMsg(phone,content);
			return "";
	}
				
   /**
    * 流标发送短信
    * @param telephone
    * @param codeStr
    * @return
    */

   @SuppressWarnings({ "static-access", "unchecked" })
	public String sms_flowStandard(String telphone,String truename,String money,String projName){
	   
	   String content  = "";
	   if (telphone != null && !"".equals(telphone)) {
		   Map configMap=AppUtil.getConfigMap();
			// 获得短信发送模板
			String temp = configMap.get("sms_flowStandard").toString();
			if (temp != null && !"".equals(temp)) {
				content = temp.replace("${name}", truename)
				              .replace("${code}", money)
				              .replace("${projName}",projName)
				              .replace("${phone4}",configMap.get("phone") == null ? "" : configMap.get("phone").toString())
							  .replace("${subject}",configMap.get("subject") == null ? "" : configMap.get("subject").toString());
			System.out.println("*****流标成功发送内容=" + content);
			}
	   }
	   sendMsg(telphone,content);
	   return "";
	}	
   
   /**
    * 回款提醒
    * @param telephone
    * @param codeStr
    * @return
    */

   @SuppressWarnings({ "static-access", "unchecked" })
	public String sms_paymentRemind(String telphone,String truename,String RepaymentMoney,String loanInterestMoney,String projName){
	  
	   String content  = "";
	   if (telphone != null && !"".equals(telphone)) {
		   Map configMap=AppUtil.getConfigMap();
			// 获得短信发送模板
			String temp = configMap.get("sms_paymentRemind").toString();
			if (temp != null && !"".equals(temp)) {
				content = temp.replace("${name}", truename)
				              .replace("${investInterest}", RepaymentMoney)
				              .replace("${investPrincipal}", loanInterestMoney)
				              .replace("${projName}",projName)
				              .replace("${phone4}",configMap.get("phone") == null ? "" : configMap.get("phone").toString())
							  .replace("${subject}",configMap.get("subject") == null ? "" : configMap.get("subject").toString());
			System.out.println("*****回款成功发送内容=" + content);
			}
	   }
	   sendMsg(telphone,content);
	   return "";
	}
   /**
    * 发送短信
    * @param telphone
    * @param content
    * @return
    */
   public  String  sendMsg(String  telphone,String content){
		 MessageStrategyService messageStrategy=
			 (MessageStrategyService) AppUtil.getBean(AppUtil.getConfigMap().get("sms_benname").toString());
		messageStrategy.sendMsg(telphone,content);
		return  "";
   }				
}


