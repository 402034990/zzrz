package com.zhiwei.credit.service.creditFlow.financingAgency.impl;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.zhiwei.core.Constants;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidPlan;
import com.zhiwei.credit.model.customer.BpCustRelation;

import com.zhiwei.credit.service.creditFlow.financingAgency.PlBidPlanService;
import com.zhiwei.credit.service.customer.BpCustRelationService;
import com.zhiwei.credit.service.customer.InvestPersonInfoService;
import com.zhiwei.credit.service.p2p.BpCustMemberService;
import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.credit.dao.creditFlow.financingAgency.PlBidInfoDao;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidInfo;
import com.zhiwei.credit.model.p2p.BpCustMember;
import com.zhiwei.credit.model.thirdInterface.Fuiou;
import com.zhiwei.credit.service.creditFlow.financingAgency.PlBidInfoService;

/**
 * 
 * @author 
 *
 */
public class PlBidInfoServiceImpl extends BaseServiceImpl<PlBidInfo> implements PlBidInfoService{
	@SuppressWarnings("unused")
	private PlBidInfoDao dao;
	@Resource
	private InvestPersonInfoService investPersonInfoService;
	@Resource
	private BpCustRelationService bpCustRelationService;
	@Resource
	private BpCustMemberService bpCustMemberService;
	@Resource
	private PlBidPlanService plBidPlanService;
	
	//得到整个系统全部的config.properties读取的所有资源
	private static Map configMap = AppUtil.getConfigMap();
	public PlBidInfoServiceImpl(PlBidInfoDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public PlBidInfo getByOrderNo(String orderNum) {
		return dao.getByOrderNo(orderNum);
	}

	@Override
	public List<PlBidInfo> queryUserName(Map<String, String> map) {
		return dao.queryUserName(map);
	}

	@Override
	public List<PlBidInfo> getInfo(Map<String, String> map) {
		// TODO Auto-generated method stub
		return dao.getInfo(map);
	}
	

	
}