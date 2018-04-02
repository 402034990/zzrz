package com.zhiwei.credit.service.p2p.redMoney;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.math.BigDecimal;
import java.util.List;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.credit.model.p2p.redMoney.BpCustRedMember;

/**
 * 
 * @author 
 *
 */
public interface BpCustRedMemberService extends BaseService<BpCustRedMember>{
	public String[] saveredmembers(String reddatas,Long redId);
	public List <BpCustRedMember> listbyredId(Long redId,String type);
	public BpCustRedMember bymemberId(Long memberId);
	
	public List<BpCustRedMember> getActivityNumber(String activityNumber,String bpCustMemberId, String remark);
}


