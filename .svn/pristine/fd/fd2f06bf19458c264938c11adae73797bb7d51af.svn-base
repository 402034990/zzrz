package com.zhiwei.credit.service.sms;

 
public interface SmsSendService {
	
	/**
	 * 流标发送短信
	 * @param telephone
	 * @param mail
	 * @param bpMemberId
	 * @param loginName
	 * @param product
	 * @param ifnew
	 * @param ifsms
	 * @param ifmail
	 * @return
	 */
	public String sms_flowProject(String telephone,String  mail,Long bpMemberId,String loginName,String  product,Boolean ifnew,Boolean ifsms,Boolean ifmail);
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
	public String sms_sendProduct(String telephone,String  mail  ,Long  bpMemberId,String  loginName,Boolean ifnew,Boolean ifsms,Boolean ifmail);
	
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
	public String sms_afterWin(String telephone,String  mail  ,Long  bpMemberId,String  loginName,Boolean ifnew,Boolean ifsms,Boolean ifmail);
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
	public String sms_noticeAddress(String telephone,String  mail,Long  bpMemberId,String  loginName,Boolean ifnew,Boolean ifsms,Boolean ifmail)	;
	
	
	/**
	 *延迟返货通知
	 * @param telephone   接收短信手机号
	 * @param shortName   宝物的短名称
	 * @param ifnew       是否发送站内信
	 * @param ifsms       是否发送短信
	 * @param ifmail      是否发送邮件
	 * @return
	 */
	public String sms_delaySend(String telephone,String  mail  ,Long  bpMemberId,String  loginName,Boolean ifnew,Boolean ifsms,Boolean ifmail);
}
