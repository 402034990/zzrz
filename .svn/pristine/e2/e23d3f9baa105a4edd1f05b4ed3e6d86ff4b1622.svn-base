package com.zhiwei.credit.service.creditFlow.finance;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.credit.model.creditFlow.finance.SlFundDetail;

/**
 * 
 * @author 
 *
 */
public interface SlFundDetailService extends BaseService<SlFundDetail>{
	public  List<SlFundDetail> getallbycompanyId();
	/**
	 * 查询对账明细
	 * @param slFundIntentId  款项Id
	 * @param type  标识查询资金明细的范围(0查所有既包括罚息、1只查相关款项)
	 * @return
	 */
	public List<SlFundDetail> getlistbySlFundIntentId(Long slFundIntentId, String type);
	/**
	 * @Description: 获取资金明细
	 * @param: type 标识查询资金明细的范围(0查所有既包括罚息、1只查相关款项)
	 * @param: projectId 项目ID
	 * @param: payintentPeriod 期数
	 * @param: businessType	业务类型
	 * @return List<SlFundDetail>   资金明细列表
	 * @date 2016-9-9
	 */
	public List<SlFundDetail> getlistbyProject(String type,String projectId,String payintentPeriod, String businessType );

}


