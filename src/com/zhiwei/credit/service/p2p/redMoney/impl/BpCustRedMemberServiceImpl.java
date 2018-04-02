package com.zhiwei.credit.service.p2p.redMoney.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.io.StringReader;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.zhiwei.core.Constants;
import com.zhiwei.core.util.DateUtil;
import com.zhiwei.credit.model.creditFlow.creditAssignment.bank.ObAccountDealInfo;
import com.zhiwei.credit.model.creditFlow.creditAssignment.bank.ObSystemAccount;
import com.zhiwei.credit.util.Common;
import com.sdicons.json.mapper.JSONMapper;
import com.sdicons.json.parser.JSONParser;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.credit.dao.p2p.redMoney.BpCustRedMemberDao;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;
import com.zhiwei.credit.model.p2p.BpCustMember;
import com.zhiwei.credit.model.p2p.redMoney.BpCustRedEnvelope;
import com.zhiwei.credit.model.p2p.redMoney.BpCustRedMember;
import com.zhiwei.credit.service.creditFlow.creditAssignment.bank.ObAccountDealInfoService;
import com.zhiwei.credit.service.p2p.BpCustMemberService;
import com.zhiwei.credit.service.p2p.redMoney.BpCustRedEnvelopeService;
import com.zhiwei.credit.service.p2p.redMoney.BpCustRedMemberService;

/**
 * 
 * @author 
 *
 */
public class BpCustRedMemberServiceImpl extends BaseServiceImpl<BpCustRedMember> implements BpCustRedMemberService{
	@SuppressWarnings("unused")
	private BpCustRedMemberDao dao;
	@Resource
	private BpCustRedEnvelopeService bpCustRedEnvelopeService;
	
	@Resource
	private BpCustMemberService bpCustMemberService;
	@Resource
	private ObAccountDealInfoService obAccountDealInfoService;
	
	public BpCustRedMemberServiceImpl(BpCustRedMemberDao dao) {
		super(dao);
		this.dao=dao;
	}
	@Override
	public List<BpCustRedMember> getActivityNumber(String activityNumber,
			String bpCustMemberId, String remark) {
		// TODO Auto-generated method stub
		return dao.getActivityNumber(activityNumber, bpCustMemberId, remark);
	}

	@Override
	public String[] saveredmembers(String reddatas, Long redId) {
		String[] ret=new String[2];
		BigDecimal sumredMoney=new BigDecimal(0);
		Integer count=0;
		
			if (null != reddatas && !"".equals(reddatas)) {
				;
				QueryFilter filter=new QueryFilter( ServletActionContext.getRequest());
				filter.addFilter("Q_redId_L_EQ", redId.toString());
				List<BpCustRedMember> list= dao.getAll(filter);
				for(BpCustRedMember a:list){
					dao.remove(a);
				}
				String[] reddatasArr = reddatas.split("@");
	
				for (int i = 0; i < reddatasArr.length; i++) {
					String str = reddatasArr[i];
					JSONParser parser = new JSONParser(new StringReader(str));
	
					try {
	
						BpCustRedMember bpCustRedMember = (BpCustRedMember) JSONMapper
								.toJava(parser.nextValue(), BpCustRedMember.class);
				
							
						if (null ==bpCustRedMember.getRedTopersonId()||bpCustRedMember.getRedTopersonId().compareTo(new Long(0))==0) {
							bpCustRedMember.setRedTopersonId(null);
							bpCustRedMember.setRedId(redId);
							bpCustRedMember.setEdredMoney(new BigDecimal(0));
							dao.save(bpCustRedMember);
							sumredMoney=sumredMoney.add(bpCustRedMember.getRedMoney());
							count++;
						} else {

							 bpCustRedMember.setEdredMoney(new BigDecimal(0));
							   BpCustRedMember bpCustRedMember2 = dao.get(bpCustRedMember.getRedTopersonId());
								BeanUtil.copyNotNullProperties(bpCustRedMember2,
										bpCustRedMember);
								dao.save(bpCustRedMember2);
								sumredMoney=sumredMoney.add(bpCustRedMember.getRedMoney());
								count++;
							}
						
	
					} catch (Exception e) {
						e.printStackTrace();
						logger.error(" 保存出错:"+e.getMessage());
						
						return ret;
					}
	
					
				}
				
			}	
			ret[0]=sumredMoney.toString();
			ret[1]=count.toString();
			return ret;
			}

	@Override
	public List<BpCustRedMember> listbyredId(Long redId,String type) {
		// TODO Auto-generated method stub
		return dao.listbyredId(redId,type);
	}

	@Override
	public BpCustRedMember bymemberId(Long memberId) {
		// TODO Auto-generated method stub
		StringBuffer hql=new StringBuffer(" from BpCustRedMember a where a.bpCustMemberId=? ");
		List<BpCustRedMember> list= dao.findByHql(hql.toString(), new Object[]{memberId});
		if(null !=list&&list.size()>0){
			
			return list.get(0);
		}
		return null;
	}

}