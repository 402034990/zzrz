package com.nc.service;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.Map;

import com.nc.model.NcPushRecord;
import com.zhiwei.core.service.BaseService;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.model.creditFlow.finance.SlChargeDetail;
import com.zhiwei.credit.model.creditFlow.finance.SlFundDetail;
import com.zhiwei.credit.model.creditFlow.finance.SlPunishDetail;
import com.zhiwei.credit.model.entityhbm.CashDetail;

/**
 * 
 * @author 
 *
 */
public interface NcPushRecordService extends BaseService<NcPushRecord>{
	/**
	 * 插入推送记录
	 */
	public void insertRecord(Map<String, Object> map);
	/**
	 * 更新推送记录
	 */
	public void updateRecord(Map<String, Object> map);
	/**
	 * 放款推送
	 */
	public void loanPush(SlFundDetail slFundDetail);
	/**
	 * 还款推送
	 */
	public void repaymentPush(SlFundDetail slFundDetail);
	/**
	 * 罚息推送
	 */
	public void penaltyPush(SlPunishDetail slPunishDetail);
	/**
	 * 保证金收取推送
	 */
	public void bondCollectPush(CashDetail cd);
	/**
	 * 保证金退还推送
	 */
	public void bondReturnPush(CashDetail cd);
	/**
	 * 手续费收取推送
	 */
	public void chargePush(SlChargeDetail scd);
	/**
	 * 新增客户推送
	 */
	public void newCustomersPush(String customerType ,String id);
	/**
	 * 保证人推送
	 */
	public void guarantorPush(String customerType ,String id);
	/**
	 * 撤销对账
	 */
	public void backoutPush(String requestNo);
	/**
	 * 定时器自动推送
	 */
	public void automaticPush();
	/**
	 * 手动推送
	 */
	public Map<String, Object> manualPush(Long id);
	/**
	 * 查询列表
	 * @param pageBean
	 */
	public void listAll(PageBean<NcPushRecord> pageBean);
}


