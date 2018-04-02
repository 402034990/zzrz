package com.zhiwei.credit.service.sms.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

 
import com.zhiwei.core.jms.MailMessageProducer;
import com.zhiwei.core.model.MailModel;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.ContextUtil;
import com.zhiwei.credit.model.p2p.OaNewsMessage;
import com.zhiwei.credit.service.p2p.OaNewsMessageService;
import com.zhiwei.credit.service.sms.SmsSendService;
import com.zhiwei.credit.service.sms.util.AppSmsUtil;
import com.zhiwei.credit.service.sms.util.SmsSendUtil;

/**
 * 实现发送方法
 * @author XiRuiJie
 *
 */
public class SmsSendServiceImpl implements SmsSendService {
	
	/**
	 * 流标确认--短信
	 * @param telephone
	 * @param mail
	 * @param shortName
	 * @param ifnew
	 * @param ifsms
	 * @param ifmail
	 * @return
	 */
	public String sms_flowProject(String telephone,String  mail,Long bpMemberId,String loginName,String  product,Boolean ifnew,Boolean ifsms,Boolean ifmail){
			if(ifnew==true){
				
//				 * 尊敬的用户${loginName}，您夺宝的${product}宝物夺宝失败，如有疑问，请致电：4000-903-910。回复TD拒收。
				StringBuffer sb = new StringBuffer();
				sb.append("尊敬的用户").append(loginName).append("，您夺宝的").append(product).append("宝物夺宝失败，如有疑问，请致电：4000-903-910");
				saveOaNewMessage(sb.toString(), "流标失败提醒",bpMemberId);
			}
			if(ifsms==true){
				SmsSendUtil  ss  = new SmsSendUtil();
				ss.sms_flowProject(telephone,loginName,product);
			}
			if(ifmail==true){
				String  vmStr =  "mail/flowProject.vm";
				StringBuffer sb = new StringBuffer();
				sb.append("尊敬的用户").append(loginName).append("，您夺宝的").append(product).append("宝物夺宝失败，如有疑问，请致电：4000-903-910");
				String content = sb.toString(); 
				sendMail(mail, content, vmStr);
			}
		return "";
	}
	
	/**
	 *通知确认收货地址的通知
	 * @param telephone
	 * @param mail
	 * @param shortName
	 * @param ifnew
	 * @param ifsms
	 * @param ifmail
	 * @return
	 */
	public String sms_noticeAddress(String telephone,String  mail,Long  bpMemberId,String  loginName,Boolean ifnew,Boolean ifsms,Boolean ifmail){
			if(ifnew==true){
//				尊敬的用户${loginName}，您的地址还未确认哦，请尽快确认，以免影响您的宝贝到家！回复TD拒收。
				StringBuffer sb = new StringBuffer();
				sb.append("尊敬的用户").append(loginName).append(",您的地址还未确认哦，请尽快确认，以免影响您的宝贝到家！");
				saveOaNewMessage(sb.toString(), "确认地址",bpMemberId);
			}
			if(ifsms==true){
				SmsSendUtil  ss  = new SmsSendUtil();
				ss.sms_noticeAddress(telephone,loginName);
			}
			if(ifmail==true){
				String  vmStr =  "mail/noticeAddress.vm";
				StringBuffer sb = new StringBuffer();
				sb.append("尊敬的用户").append(loginName).append(",您的地址还未确认哦，请尽快确认，以免影响您的宝贝到家！");
				String content = sb.toString(); 
				sendMail(mail, content, vmStr);
			}
		return "";
	}
	
	/**
	 *延迟返货通知
	 * @param telephone   接收短信手机号
	 * @param shortName   宝物的短名称
	 * @param ifnew       是否发送站内信
	 * @param ifsms       是否发送短信
	 * @param ifmail      是否发送邮件
	 * @return
	 */
	public String sms_delaySend(String telephone,String  mail  ,Long  bpMemberId,String  loginName,Boolean ifnew,Boolean ifsms,Boolean ifmail){
		if(ifnew==true){
			StringBuffer sb = new StringBuffer();
			sb.append("尊敬的用户").append(loginName).append(",因不可抗力因素导致发货延误，给您的带来的不便，请谅解，最新商品咨询，详见网站!");
			saveOaNewMessage(sb.toString(), "延迟发货通知",bpMemberId);
		}
		if(ifsms==true){
			SmsSendUtil  ss  = new SmsSendUtil();
			ss.sms_delaySend(telephone , loginName);
		}
		if(ifmail==true){
			String  vmStr =  "mail/delaySend.vm";
			StringBuffer sb = new StringBuffer();
			sb.append("尊敬的用户").append(loginName).append(",因不可抗力因素导致发货延误，给您的带来的不便，请谅解，最新商品咨询，详见网站!");
			String content = sb.toString(); 
			sendMail(mail, content, vmStr);
		}
		return "";
	}

	
	/**
	 * “您在互融云购平台上获得的奖品，已经开始配送，快递单号网上录入可能会有延后。拍照分享，分享喜悦！回复TD拒收。
	 * 发货通知
	 * @param telephone   接收短信手机号
	 * @param shortName   宝物的短名称
	 * @param ifnew       是否发送站内信
	 * @param ifsms       是否发送短信
	 * @param ifmail      是否发送邮件
	 * @return
	 */
	public String sms_sendProduct(String telephone,String  mail  ,Long  bpMemberId,String  loginName,Boolean ifnew,Boolean ifsms,Boolean ifmail){
		if(ifnew==true){
//			尊敬的用户${loginName}，“您在互融云购平台上获得的奖品，已经开始配送，快递单号网上录入可能会有延后。拍照分享，分享喜悦！回复TD拒收。
			StringBuffer sb = new StringBuffer();
			sb.append("尊敬的用户").append(loginName).append(",您在互融云购平台上获得的奖品，已经开始配送，快递单号网上录入可能会有延后。拍照分享，分享喜悦！");
			saveOaNewMessage(sb.toString(), "发货通知",bpMemberId);
		}
		if(ifsms==true){
			SmsSendUtil  ss  = new SmsSendUtil();
			ss.sms_sendProduct(telephone,loginName);
		}
		if(ifmail==true){
			String  vmStr =  "mail/sendProduct.vm";
			StringBuffer sb = new StringBuffer();
			sb.append("您在互融云购平台上获得的奖品，已经开始配送，快递单号网上录入可能会有延后。拍照分享，分享喜悦！");
			String content = sb.toString(); 
			sendMail(mail, content, vmStr);
		}
		return "";
	}
	/**
	 * 恭喜您在“互融夺宝”成功获得商品，请您于7日内至互融夺宝会员中心提交/确认收货地址！如有疑问，请致电：${phone}回复TD拒收。
	 * 中奖信息通知
	 * @param telephone   接收短信手机号
	 * @param shortName   宝物的短名称
	 * @param ifnew       是否发送站内信
	 * @param ifsms       是否发送短信
	 * @param ifmail      是否发送邮件
	 * @return
	 */
	public String sms_afterWin(String telephone,String  mail  ,Long  bpMemberId,String  loginName,Boolean ifnew,Boolean ifsms,Boolean ifmail){
		if(ifnew==true){
			StringBuffer sb = new StringBuffer();
			sb.append("尊敬的用户").append(loginName).append("恭喜您在“互融夺宝”成功获得商品，请您于7日内至互融夺宝会员中心提交/确认收货地址！如有疑问，请致电：4000-903-910");
			saveOaNewMessage(sb.toString(), "发货通知",bpMemberId);
		}
		if(ifsms==true){
			SmsSendUtil  ss  = new SmsSendUtil();
			ss.sms_afterWin(telephone ,loginName );
		}
		if(ifmail==true){ 
			String  vmStr =  "mail/afterWin.vm";
			StringBuffer sb = new StringBuffer();
			sb.append("尊敬的用户").append(loginName).append("恭喜您在“互融夺宝”成功获得商品，请您于7日内至互融夺宝会员中心提交/确认收货地址！如有疑问，请致电：4000-903-910");
			String content = sb.toString(); 
			sendMail(mail, content, vmStr);
		}
		return "";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**********************************************发送站内信***************************************************/
	@Resource
	private  OaNewsMessageService oaNewsMessageService ;
	/**
	 * 保存站内信
	 * @param content   站内信内容
	 * @param recipient 
	 * @param title     标题
	 */
	public void  saveOaNewMessage(String content ,String title,Long  bpMemberId){
		OaNewsMessage 	amm = new OaNewsMessage();
		amm.setContent(content);//内容
		amm.setIsDelete("0");
		amm.setRecipient(bpMemberId);
		amm.setSendTime(new Date());
		amm.setOperator("系统");
		amm.setAddresser("系统");
		amm.setTitle(title);
		amm.setStatus("0");
	    oaNewsMessageService.save(amm);
	}
	
	/**
	 * 发送邮箱
	 * @param email
	 * @param content
	 * @param vmStr
	 * @return
	 */
	public  String  sendMail(String  email,String content,String vmStr){
		AppSmsUtil appSmsUtil  = new AppSmsUtil();
	   	appSmsUtil.init();
	   	Map configMap=AppUtil.getConfigMap();
	   	
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String project=configMap.get("subject").toString();
		String phone=configMap.get("phone").toString();
		Map configSmsMap=AppUtil.getConfigMap();
		String temp = configSmsMap.get("sms_bpCoupons").toString();
		content = content.replace("${phone}", phone).replace("${project}", project);
		String tempPath=vmStr;
		Map model=new HashMap();
		MailMessageProducer mailMessageProducerThread = (MailMessageProducer) AppUtil.getBean("mailMessageProducer");
		MailModel mailModel=new MailModel();
		model.put("content", content);
		model.put("project", project);
		mailModel.setMailTemplate(tempPath);
		mailModel.setTo(email);
		mailModel.setMailData(model);
		//把邮件加至发送列队中去
		mailMessageProducerThread.send(mailModel);
		return  "";
	}

	 
}
