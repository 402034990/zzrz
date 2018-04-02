package com.zhiwei.credit.dao.creditFlow.finance.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.transform.Transformers;
import org.junit.Test;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.ContextUtil;
import com.zhiwei.core.util.DateUtil;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.core.web.paging.PagingBean;
import com.zhiwei.credit.dao.creditFlow.finance.SlFundIntentDao;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class SlFundIntentDaoImpl extends BaseDaoImpl<SlFundIntent> implements SlFundIntentDao{

	public SlFundIntentDaoImpl() {
		super(SlFundIntent.class);
	}

	@Override
	public int updateOverdue(SlFundIntent s) {
		
		
//		String hql="UPDATE sl_fund_intent SET sl_fund_intent.isOverdue=?";
//		 Object[] params ={s.getIsOverdue()};
		 return getSession().createQuery("UPDATE SlFundIntent f SET f.isOverdue='"+s.getIsOverdue()+"' where f.fundIntentId='"+s.getFundIntentId()+"'").executeUpdate();
//		update(hql,params);
//		return 0;
}

	@Override
	public int updateFlatMoney(SlFundIntent s) {
		
		return getSession().createQuery("UPDATE SlFundIntent f SET f.flatMoney='"+s.getFlatMoney()+"',f.notMoney='"+s.getNotMoney()+"' where f.fundIntentId='"+s.getFundIntentId()+"'").executeUpdate();
	}
	@Override
	public int updateIntent(SlFundIntent s) {
		// TODO Auto-generated method stub
		  SimpleDateFormat sd=new SimpleDateFormat("yyyy-MM-dd");
		 String factDatehql="";
		 String intentDate="";
		 if(s.getFactDate()!=null){
			 factDatehql= "',f.factDate='"+sd.format(s.getFactDate());
		 }
		 if(s.getIntentDate()!=null){
			 intentDate=sd.format(s.getIntentDate());
		 }
		 return getSession().createQuery("UPDATE SlFundIntent f SET f.fundType='"+s.getFundType()+
				 "',f.intentDate='"+intentDate
				 +factDatehql+
				 "',f.incomeMoney='"+s.getIncomeMoney()+
				 "',f.payMoney='"+s.getPayMoney()+
				 "' where f.fundIntentId='"+s.getFundIntentId()+"'").executeUpdate();
	}
	@Override
	public List<SlFundIntent> getByProjectId(Long projectId,String businessType) {
		String hql = "from SlFundIntent s where s.fundType !='principalDivert' and s.projectId="+projectId+" and s.businessType='"+businessType+"' and (s.isValid = 0 or s.isValid = 1) ORDER BY intentDate ASC";
		return findByHql(hql);
	}
	@Override
	public List<SlFundIntent> getByProjectIdAsc(Long projectId,String businessType) {
		String hql = "from SlFundIntent s where s.fundType !='principalDivert' and s.projectId="+projectId+" and s.businessType='"+businessType+"' and (s.isValid = 0 or s.isValid = 1) order by s.intentDate asc";
		return findByHql(hql);
	}
	@Override
	public List<SlFundIntent> getListByBidPlanId(Long bidPlanId){
		String hql = "from SlFundIntent s where s.fundType !='principalDivert' and s.bidPlanId="+bidPlanId+" and (s.isValid = 0 or s.isValid = 1) order by s.intentDate asc";
		return findByHql(hql);
	}
	@Override
	public List<SlFundIntent> getByProjectId(Long projectId,String businessType,String fundResource) {
		String hql = "from SlFundIntent s where s.fundType !='principalDivert' and s.projectId="+projectId+" and s.businessType='"+businessType+"'" 
				   + " and s.fundResource='"+fundResource+"' and (s.isValid = 0 or s.isValid = 1) order by s.intentDate asc";
		return findByHql(hql);
	}
	@Override
	public List<SlFundIntent> getByProjectId1(Long projectId,String businessType) {
		String hql = "from SlFundIntent s where s.fundType !='principalDivert' and s.projectId="+projectId+" and s.isValid = 0  and s.businessType='"+businessType+"' order by s.intentDate asc";
		  
		List<SlFundIntent> findByHql = findByHql(hql);
		
		 return findByHql;
	}
	@Override
	public List<SlFundIntent> getByProjectId2(Long projectId,
			String businessType) {
		String hql = "from SlFundIntent s where s.fundType !='principalDivert' and s.projectId="+projectId+" and s.businessType='"+businessType+"' order by s.intentDate asc";
		return findByHql(hql);
	}
	@Override
	public List<SlFundIntent> getByProjectId3(Long projectId,
			String businessType,String fundType) {
		String hql = "from SlFundIntent s where s.projectId="+projectId+" and s.isValid = 0 and s.isCheck = 0 and s.businessType='"+businessType+"' and s.fundType='"+fundType+"' order by s.intentDate asc";
		return findByHql(hql);
	}

	public List<SlFundIntent> getByProjectIdAndFundType(Long projectId, Integer fundType) {
		String hql = "from SlFundIntent s where s.projectId="+projectId+" and s.fundType="+fundType;
		return findByHql(hql);
	}

	@Override
	public int searchsize(Map<String, String> map,String businessType) {
		String hql="";
		if(businessType.equals("all")){
			hql="from SlFundIntent  q where s.fundType !='principalDivert' and q.isValid = 0 and q.isCheck = 0 ";// and q.businessType='smallLoan'";
		}
		
		Integer startpage=Integer.parseInt(map.get("start"));
		Integer pagesize=Integer.parseInt(map.get("limit"));
		if(map.size()!=3){
		String projNum=map.get("Q_projNum_N_EQ");
		String projName=map.get("Q_proj_Name_N_EQ");
		String fundType=map.get("Q_fundType_N_EQ");
		String isOverdue=map.get("Q_isOverdue_S_E");
		String notMoneyle=map.get("Q_notMoney_BD_LE");
		String intentDatege=map.get("Q_intentDate_D_GE");
		String intentDatele=map.get("Q_intentDate_D_LE");
		String operationType=map.get("Q_operationType_N_EQ");
		
		if(!projNum.equals("")){
			hql=hql+" and q.projectNumber like '%/"+projNum.toString()+"%'  escape '/' ";
		}
		if(!projName.equals("")){
			hql=hql+" and q.projectName like '%/"+projName+"%'  escape '/' ";
		}
		if(!operationType.equals("")){
			hql=hql+" and q.businessType  = '"+operationType+"'";
		}
		if(!fundType.equals("")){
			hql=hql+" and q.fundType = '"+fundType+"'";
		}
		if(!notMoneyle.equals("")&&notMoneyle.equals("0")){
			hql=hql+" and  q.notMoney = 0";
		}
		
		if(!notMoneyle.equals("")&&notMoneyle.equals("1")){
			hql=hql+" and  q.notMoney !=0 ";
		}
		if(!intentDatege.equals("")){
			hql=hql+" and  q.intentDate >= '"+intentDatege+"'";
		}
		
		if(!intentDatele.equals("")){
			hql=hql+" and  q.intentDate <= '"+intentDatele+"'";
		}
		if(!isOverdue.equals("")){
			hql=hql+" and q.isOverdue = '"+isOverdue+"'";
			hql=hql+" and q.fundType != '1748'";
		}
		}else{
			hql=hql+" and  q.notMoney !=0 ";
			
		}
	    Query query = getSession().createQuery(hql);
		
		 return  query.list().size();
	}

	@Override
	public List<SlFundIntent> search(Map<String, String> map,String businessType) {
		// TODO Auto-generated method stub
		String hql="";
		if(businessType.equals("all")){
		 hql="from SlFundIntent q  where s.fundType !='principalDivert' and q.isValid = 0 and q.isCheck = 0 ";//and q.businessType='smallLoan' ";
		}
		Integer startpage=Integer.parseInt(map.get("start"));
		Integer pagesize=Integer.parseInt(map.get("limit"));
		if(map.size()!=3){
		String projNum=map.get("Q_projNum_N_EQ");
		String projName=map.get("Q_proj_Name_N_EQ");
		String fundType=map.get("Q_fundType_N_EQ");
		String isOverdue=map.get("Q_isOverdue_S_E");
		String notMoneyle=map.get("Q_notMoney_BD_LE");
		String intentDatege=map.get("Q_intentDate_D_GE");
		String intentDatele=map.get("Q_intentDate_D_LE");
		String operationType=map.get("Q_operationType_N_EQ");
		
		if(!projNum.equals("")){
			hql=hql+" and q.projectNumber like '%/"+projNum+"%'  escape '/' ";
		}
		if(!projName.equals("")){
			hql=hql+" and q.projectName like '%/"+projName+"%'  escape '/' ";
		}
		if(!operationType.equals("")){
			hql=hql+" and q.businessType  = '"+operationType+"'";
		}
		if(!fundType.equals("")){
			hql=hql+" and q.fundType = '"+fundType+"'";
		}
		if(!notMoneyle.equals("")&&notMoneyle.equals("0")){
			hql=hql+" and  q.notMoney = 0";
		}
		
		if(!notMoneyle.equals("")&&notMoneyle.equals("1")){
			hql=hql+" and  q.notMoney !=0 ";
		}
		if(!intentDatege.equals("")){
			hql=hql+" and  q.intentDate >= '"+intentDatege+"'";
		}
		
		if(!intentDatele.equals("")){
			hql=hql+" and  q.intentDate <= '"+intentDatele+"'";
		}
		if(!isOverdue.equals("")){
			hql=hql+" and q.isOverdue = '"+isOverdue+"'";
			hql=hql+" and q.fundType != '1748'";
		}
		}else{
			hql=hql+" and  q.notMoney !=0 ";
		}
		hql=hql+" order by q.intentDate asc";
	    Query query = getSession().createQuery(hql).setFirstResult(startpage).setMaxResults(pagesize);
		
		 return  query.list();
	}

	@Override
	public Map<String, BigDecimal> saveProjectfiance(Long projectId,
			String businessType) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<SlFundIntent> getlistbyslSuperviseRecordId(
			Long slSuperviseRecordId, String businessType,Long projectId) {
		String hql = "from SlFundIntent s where s.slSuperviseRecordId="+slSuperviseRecordId+" and s.businessType='"+businessType+"' and s.projectId="+projectId;
		return findByHql(hql);
	}

	@Override
	public List<SlFundIntent> getByisvalidAndaftercheck(Long projectId,
			String businessType) {
		String hql = "from SlFundIntent s where s.projectId="+projectId+" and s.businessType='"+businessType+"' and s.isValid = 1 and s.afterMoney !=0 ";
		return findByHql(hql);
	}

	@Override
	public List<SlFundIntent> getByaftercheck(Long projectId,
			String businessType) {
		String hql = "from SlFundIntent s where s.projectId="+projectId+" and s.businessType='"+businessType+"' and s.afterMoney !=0 ";
		return findByHql(hql);
	}

	@Override
	public int searchsizeurge(String projectIdStr,Map<String, String> map, String businessType) {
		String hql="from SlFundIntent q where  1=1";
		String strs=ContextUtil.getBranchIdsStr();//39,40
		if(null!=strs && !"".equals(strs)){
			hql+=" and q.companyId in ("+strs+")"; //
		}
		if (projectIdStr !=null && !projectIdStr.equals("")) {
			hql+=" and q.projectId in ("+projectIdStr+") ";
		}else if(projectIdStr !=null && projectIdStr.equals("")){
			hql+="  and q.projectId in ('')";
		}
		/*if(businessType.equals("all")){
			hql+=" and  q.isValid = 0 and q.isCheck = 0 and q.payMoney =0 and q.afterMoney !=q.incomeMoney";//and q.businessType='smallLoan' ";
		}*/
		/*if(("SmallLoan".equals(businessType))){//最初版本
			hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.payMoney =0 and q.afterMoney !=q.incomeMoney and q.businessType='"+businessType+"'";
		}
		if("Financing".equals(businessType)){
			hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.incomeMoney =0 and q.afterMoney !=q.payMoney and q.businessType='"+businessType+"'";
		}*/
		
		/*if("SmallLoan".equals(businessType)){//改动1  update by gao
			hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.payMoney =0 and q.afterMoney !=q.incomeMoney and q.businessType='"+businessType+"'";
		}else if("Financing".equals(businessType)){
			hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.incomeMoney =0 and q.afterMoney !=q.payMoney and q.businessType='"+businessType+"'";
		}else if("LeaseFinance".equals(businessType)){
			hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.incomeMoney =0 and q.afterMoney !=q.payMoney and q.businessType='"+businessType+"'";
		}*/
		if(null!=businessType&&!"all".equals(businessType)){//改动2 update by gao
			if(businessType.equals("Financing")){
				hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.incomeMoney =0 and q.afterMoney !=q.payMoney and q.businessType='"+businessType+"'";
			}else{
				hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.payMoney =0 and q.afterMoney !=q.incomeMoney and q.businessType='"+businessType+"'";
			}
		}
		
		String tabflag=map.get("tabflag");
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd",Locale.CHINESE);
		String str = simpleDateFormat.format(new Date());
		if(tabflag.equals("coming")){
			hql=hql+" and  q.intentDate >= '"+str+"'";
		}
        if(tabflag.equals("overdue")){
        	hql=hql+" and  q.intentDate < '"+str+"'";
		}
		Integer startpage=Integer.parseInt(map.get("start"));
		Integer pagesize=Integer.parseInt(map.get("limit"));
		if(map.size()!=4){
		String projNum=map.get("Q_projNum_N_EQ");
		String projName=map.get("Q_proj_Name_N_EQ");
		String intentType=map.get("Q_intentType_SN_EQ");
		String oppositeName=map.get("Q_oppositeName_N_EQ");
		String intentDatege=map.get("Q_intentDate_D_GE");
		String intentDatele=map.get("Q_intentDate_D_LE");
		String incomemoneyge=map.get("Q_incomemoney_S_GE");
		String incomemoneyle=map.get("Q_incomemoney_D_LE");
		String companyId=map.get("companyId");
		
		
		if(null !=companyId&&!companyId.equals("")){
			hql=hql+" and q.companyId="+companyId;
		}
		if(null != projNum&&!projNum.equals("")){
			hql=hql+" and q.projectNumber like '%/"+projNum+"%'  escape '/' ";
		}
		if(null != projName&&!projName.equals("")){
			hql=hql+" and q.projectName like '%/"+projName+"%'  escape '/' ";
		}
		if(null != oppositeName&&!oppositeName.equals("")){
			hql=hql+" and q.projectName like '%/"+oppositeName+"%'  escape '/' ";
		}
		if(null != intentType&&!intentType.equals("")){
			if(null!=businessType && businessType.equals("SmallLoan")){
				if(intentType.equals("0")){
					hql=hql+" and  q.fundType !='principalLending'";
				}
				if(intentType.equals("1")){
					hql=hql+" and  q.fundType = 'principalRepayment'";
				}
				if(intentType.equals("2")){
					hql=hql+" and  q.fundType != 'principalRepayment' and q.fundType != 'principalLending' and q.fundType != 'principalDivert'";
				}
			}else if(null!=businessType && businessType.equals("Financing")){
				if(intentType.equals("0")){
					hql=hql+" and  q.fundType !='Financingborrow'";
				}
				if(intentType.equals("1")){
					hql=hql+" and  q.fundType = 'FinancingRepay'";
				}
				if(intentType.equals("2")){
					hql=hql+" and  q.fundType != 'Financingborrow' and q.fundType != 'FinancingRepay' and q.fundType != 'principalDivert'";
				}
			}else if(null!=businessType && businessType.equals("Pawn")){
				if(intentType.equals("0")){
					hql=hql+" and  q.fundType !='pawnPrincipalLending'";
				}
				if(intentType.equals("1")){
					hql=hql+" and  q.fundType = 'pawnPrincipalRepayment'";
				}
				if(intentType.equals("2")){
					hql=hql+" and  q.fundType != 'pawnPrincipalLending' and q.fundType != 'pawnPrincipalRepayment'";
				}
			}else if("LeaseFinance".equals(intentType)){
					hql=hql+" and  q.fundType = '" + intentType + "' ";
			}
		}
		
		if(null != intentDatege&&!intentDatege.equals("")){
			hql=hql+" and  q.intentDate >= '"+intentDatege+"'";
		}
		
		if(null != intentDatele&&!intentDatele.equals("")){
			hql=hql+" and  q.intentDate <= '"+intentDatele+"'";
		}
		if(null != incomemoneyge && !incomemoneyge.equals("")){
			if(null!=businessType && businessType.equals("SmallLoan")){
				hql=hql+" and  q.incomeMoney >= "+incomemoneyge+"";
			}else if(null!=businessType && businessType.equals("Financing")){
				hql=hql+" and  q.payMoney >= "+incomemoneyge+"";
			}
		}
		
		if(null != incomemoneyle && !incomemoneyle.equals("")){
			if(null!=businessType && businessType.equals("SmallLoan")){
				hql=hql+" and  q.incomeMoney <= "+incomemoneyle+"";
			}else if(null!=businessType && businessType.equals("Financing")){
				hql=hql+" and  q.payMoney <= "+incomemoneyle+"";
			}
		}
		}else{
			//hql=hql+" and q.payMoney is null";
		}
		hql=hql+" order by q.intentDate asc";
	    Query query = getSession().createQuery(hql);
		
		 return  query.list().size();
	}

	@Override 
	public void searchurge(PageBean<SlFundIntent> pageBean,Map<String, String> map, String businessType) {
		/*--------查询总条数---------*/
		StringBuffer totalCounts = new StringBuffer ("select count(*) from " +
				"(" +
				"select s.projectId from sl_fund_intent as s");
		
		StringBuffer temp=new StringBuffer("select " +
				" s.fundIntentId," +
				" s.projectName," +
				" s.projectNumber," +
				" s.accrualMoney," +
				" s.overdureMoney," +
				" s.incomeMoney," +
				" dic.itemValue as fundTypeName," +
				" s.intentDate," +
				" s.payMoney," +
				" s.factDate," +
				" s.fundType," +
				" s.afterMoney," +
				" s.notMoney," +
				" s.flatMoney," +
				" s.isOverdue," +
				" s.businessType," +
				" s.projectId," +
				" urge.urgeTime as lastslFundintentUrgeTime," +
				" org.org_name as orgName," +
				" s.isValid,"+
				" s.isCheck," +
				" s.companyId"+
				" from sl_fund_intent as s " +
				" left join dictionary_independent as dic on dic.dicKey=s.fundType" +
				" left join organization as org on org.org_id=s.companyId" +
				" left join sl_fundintent_urge as urge on urge.slFundintentUrgeId=s.lastslFundintentUrgeId ");
		
		StringBuffer sql  = new StringBuffer();
		sql.append("select " +
				" intent.*," +
				" pro.projectMoney as payInMoney," +
				" IFNULL(pro.overdueRate,0) as overdueRate," +
				" ( case pro.oppositeType " +
				"	when 'company_customer' then (select e.enterprisename from cs_enterprise as e where e.id=pro.oppositeID)" +
				"   else (select p.name from cs_person as p where p.id=pro.oppositeID)" +
				"	end " +
				" )as oppositeName," +
				" ( case pro.oppositeType " +
				"	when 'company_customer' then (select e.telephone from cs_enterprise as e where e.id=pro.oppositeID)" +
				"   else (select p.cellphone from cs_person as p where p.id=pro.oppositeID)" +
				"	end " +
				" )as opposittelephone," +
				" pro.startDate as projectStartDate," +
				" pro.appUserId" +
				" from ( ");
		
		if(null!=businessType && !"all".equals(businessType)){//改动2 update by gao
			if(businessType.equals("Financing")){
				temp.append(" where  s.isValid = 0 and s.isCheck = 0 and s.incomeMoney =0 and s.afterMoney !=s.payMoney and s.businessType='"+businessType+"'");
				totalCounts.append(" where  s.isValid = 0 and s.isCheck = 0 and s.incomeMoney =0 and s.afterMoney !=s.payMoney and s.businessType='"+businessType+"'");
			}else{
				temp.append(" where  s.isValid = 0 and s.isCheck = 0 and s.payMoney =0 and s.afterMoney !=s.incomeMoney and s.businessType='"+businessType+"'");
				totalCounts.append(" where  s.isValid = 0 and s.isCheck = 0 and s.payMoney =0 and s.afterMoney !=s.incomeMoney and s.businessType='"+businessType+"'");
			}
		}
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd",Locale.CHINESE);
		String str = simpleDateFormat.format(new Date());
		if(map.get("tabflag").equals("coming")){
			temp.append(" and  s.intentDate >= '"+str+"'");
			totalCounts.append(" and  s.intentDate >= '"+str+"'");
		}
        if(map.get("tabflag").equals("overdue")){
        	temp.append(" and  s.intentDate < '"+str+"'");
        	totalCounts.append(" and  s.intentDate < '"+str+"'");
		}
       
		if(map.size()!=4){
			if(null !=map.get("companyId")&&!map.get("companyId").equals("")){
				temp.append(" and s.companyId in("+map.get("companyId")+")");
				totalCounts.append(" and s.companyId in("+map.get("companyId")+")");
			}
			if(null != map.get("Q_projNum_N_EQ")&&!map.get("Q_projNum_N_EQ").equals("")){
				temp.append(" and s.projectNumber like '%/"+map.get("Q_projNum_N_EQ")+"%'  escape '/' ");
				totalCounts.append(" and s.projectNumber like '%/"+map.get("Q_projNum_N_EQ")+"%'  escape '/' ");
			}
			if(null != map.get("Q_proj_Name_N_EQ")&&!map.get("Q_proj_Name_N_EQ").equals("")){
				temp.append(" and s.projectName like '%/"+map.get("Q_proj_Name_N_EQ")+"%'  escape '/' ");
				totalCounts.append(" and s.projectName like '%/"+map.get("Q_proj_Name_N_EQ")+"%'  escape '/' ");
			}
			if(null != map.get("Q_oppositeName_N_EQ")&&!map.get("Q_oppositeName_N_EQ").equals("")){
				temp.append(" and s.projectName like '%/"+map.get("Q_oppositeName_N_EQ")+"%'  escape '/' ");
				totalCounts.append(" and s.projectName like '%/"+map.get("Q_oppositeName_N_EQ")+"%'  escape '/' ");
			}
			if(null != map.get("Q_intentType_SN_EQ")&&!map.get("Q_intentType_SN_EQ").equals("")){
				if(null!=businessType && businessType.equals("SmallLoan")){
					if(map.get("Q_intentType_SN_EQ").equals("0")){
						temp.append(" and  s.fundType !='principalLending'");
						totalCounts.append(" and  s.fundType !='principalLending'");
					}
					if(map.get("Q_intentType_SN_EQ").equals("1")){
						temp.append(" and  s.fundType = 'principalRepayment'");
						totalCounts.append(" and  s.fundType = 'principalRepayment'");
					}
					if(map.get("Q_intentType_SN_EQ").equals("2")){
						temp.append(" and  s.fundType != 'principalRepayment' and s.fundType != 'principalLending' and s.fundType != 'principalDivert'");
						totalCounts.append(" and  s.fundType != 'principalRepayment' and s.fundType != 'principalLending' and s.fundType != 'principalDivert'");
					}
				}else if(null!=businessType && businessType.equals("Financing")){
					if(map.get("Q_intentType_SN_EQ").equals("0")){
						temp.append(" and  s.fundType !='Financingborrow'");
						totalCounts.append(" and  s.fundType !='Financingborrow'");
					}
					if(map.get("Q_intentType_SN_EQ").equals("1")){
						temp.append(" and  s.fundType = 'FinancingRepay'");
						totalCounts.append(" and  s.fundType = 'FinancingRepay'");
					}
					if(map.get("Q_intentType_SN_EQ").equals("2")){
						temp.append(" and  s.fundType != 'Financingborrow' and q.fundType != 'FinancingRepay' and q.fundType != 'principalDivert'");
						totalCounts.append(" and  s.fundType != 'Financingborrow' and q.fundType != 'FinancingRepay' and q.fundType != 'principalDivert'");
					}
				}else if(null!=businessType && businessType.equals("Pawn")){
					if(map.get("Q_intentType_SN_EQ").equals("0")){
						temp.append(" and  s.fundType !='pawnPrincipalLending'");
						totalCounts.append(" and  s.fundType !='pawnPrincipalLending'");
					}
					if(map.get("Q_intentType_SN_EQ").equals("1")){
						temp.append(" and  s.fundType = 'pawnPrincipalRepayment'");
						totalCounts.append(" and  s.fundType = 'pawnPrincipalRepayment'");
					}
					if(map.get("Q_intentType_SN_EQ").equals("2")){
						temp.append(" and  s.fundType != 'pawnPrincipalLending' and q.fundType != 'pawnPrincipalRepayment'");
						totalCounts.append(" and  s.fundType != 'pawnPrincipalLending' and q.fundType != 'pawnPrincipalRepayment'");
					}
				}else if("LeaseFinance".equals(map.get("Q_intentType_SN_EQ"))){
					temp.append(" and  s.fundType = '" + map.get("Q_intentType_SN_EQ") + "' ");
					totalCounts.append(" and  s.fundType = '" + map.get("Q_intentType_SN_EQ") + "' ");
				}
			}
			
			if(null != map.get("Q_intentDate_D_GE")&&!map.get("Q_intentDate_D_GE").equals("")){
				temp.append(" and  s.intentDate >= '"+map.get("Q_intentDate_D_GE")+"'");
				totalCounts.append(" and  s.intentDate >= '"+map.get("Q_intentDate_D_GE")+"'");
			}
			
			if(null != map.get("Q_intentDate_D_LE")&&!map.get("Q_intentDate_D_LE").equals("")){
				temp.append(" and  s.intentDate <= '"+map.get("Q_intentDate_D_LE")+"'");
				totalCounts.append(" and  s.intentDate <= '"+map.get("Q_intentDate_D_LE")+"'");
			}
			if(null != map.get("Q_incomemoney_S_GE") && !map.get("Q_incomemoney_S_GE").equals("")){
				if(null!=businessType && businessType.equals("SmallLoan")){
					temp.append(" and  s.incomeMoney >= "+map.get("Q_incomemoney_S_GE"));
					totalCounts.append(" and  s.incomeMoney >= "+map.get("Q_incomemoney_S_GE"));
				}else if(null!=businessType && businessType.equals("Financing")){
					temp.append(" and  s.payMoney >= "+map.get("Q_incomemoney_S_GE"));
					totalCounts.append(" and  s.incomeMoney >= "+map.get("Q_incomemoney_S_GE"));
				}
			}
			if(null != map.get("Q_incomemoney_D_LE") && !map.get("Q_incomemoney_D_LE").equals("")){
				if(null!=businessType && businessType.equals("SmallLoan")){
					temp.append(" and  s.incomeMoney <= "+map.get("Q_incomemoney_D_LE"));
					totalCounts.append(" and  s.incomeMoney <= "+map.get("Q_incomemoney_D_LE"));
				}else if(null!=businessType && businessType.equals("Financing")){
					temp.append(" and  s.payMoney <= "+map.get("Q_incomemoney_D_LE")+"");
					totalCounts.append(" and  s.payMoney <= "+map.get("Q_incomemoney_D_LE")+"");
				}
			}
		}
		
		sql.append(temp);
		sql.append(" order  by  s.intentDate  asc ");
		sql.append(" LIMIT "+pageBean.getStart()+","+pageBean.getLimit());
		sql.append(" ) as intent");
		sql.append(" LEFT JOIN sl_smallloan_project AS pro ON intent.projectId = pro.projectId ");
		
		totalCounts.append(" order  by  s.intentDate  asc");
		totalCounts.append(")as intent");
		totalCounts.append(" LEFT JOIN sl_smallloan_project AS pro ON intent.projectId = pro.projectId ");
		
		String userIds= map.get("userId");
		if(null!=userIds && !userIds.equals("")){
			sql.append(" where fn_check_repeat(pro.appUserId,'"+userIds+"') = 1");
			totalCounts.append(" where fn_check_repeat(pro.appUserId,'"+userIds+"') = 1");
		}
		System.out.println("还款催收流程查询"+sql);
		List list=this.getSession().createSQLQuery(sql.toString())
			.addScalar("fundIntentId",Hibernate.LONG)
			.addScalar("projectName", Hibernate.STRING)
			.addScalar("projectNumber", Hibernate.STRING)
			.addScalar("incomeMoney", Hibernate.BIG_DECIMAL)
			.addScalar("payMoney", Hibernate.BIG_DECIMAL)
			.addScalar("payInMoney", Hibernate.BIG_DECIMAL)
			.addScalar("afterMoney", Hibernate.BIG_DECIMAL)
			.addScalar("notMoney", Hibernate.BIG_DECIMAL)
			.addScalar("flatMoney", Hibernate.BIG_DECIMAL)
			.addScalar("overdueRate", Hibernate.BIG_DECIMAL)
			.addScalar("accrualMoney", Hibernate.BIG_DECIMAL)
			.addScalar("fundTypeName", Hibernate.STRING)
			.addScalar("isOverdue", Hibernate.STRING)
			.addScalar("fundType", Hibernate.STRING)
			.addScalar("businessType", Hibernate.STRING)
			.addScalar("oppositeName", Hibernate.STRING)
			.addScalar("opposittelephone", Hibernate.STRING)
			.addScalar("orgName", Hibernate.STRING)
			.addScalar("projectId", Hibernate.LONG)
			.addScalar("intentDate", Hibernate.DATE)
			.addScalar("factDate", Hibernate.DATE)
			.addScalar("projectStartDate", Hibernate.DATE)
			.addScalar("lastslFundintentUrgeTime", Hibernate.DATE)
			.addScalar("overdureMoney", Hibernate.BIG_DECIMAL)
			.setResultTransformer(Transformers.aliasToBean(SlFundIntent.class)).list();
		
		pageBean.setResult(list);
		BigInteger total =   (BigInteger) this.getSession().createSQLQuery(totalCounts.toString()).uniqueResult();
		pageBean.setTotalCounts(total.intValue());
	}

	@Override
	public List<SlFundIntent> getlistbyslEarlyRepaymentId(
			Long slEarlyRepaymentId, String businessType, Long projectId) {
			String hql = "from SlFundIntent s where s.slEarlyRepaymentId="+slEarlyRepaymentId+" and s.businessType='"+businessType+"' and s.projectId="+projectId;
			return findByHql(hql);
	}

	@Override
	public List<SlFundIntent> getlistbyslslAlteraccrualRecordId(
			Long slAlteraccrualRecordId, String businessType, Long projectId) {
			String hql = "from SlFundIntent s where s.slAlteraccrualRecordId="+slAlteraccrualRecordId+" and s.businessType='"+businessType+"' and s.projectId="+projectId;
			return findByHql(hql);
	}

	@Override
	public void listbyLedger(PageBean<SlFundIntent> pageBean,String businessType,String fundType,String typetab, PagingBean pb, Map<String, String> map) {
		/*--------查询总条数---------*/
		StringBuffer tempCount=new StringBuffer("SELECT count(*) FROM " +
				" ( SELECT q.projectId FROM sl_fund_intent AS q where 1=1");
		
		StringBuffer sb=new StringBuffer("select " +
				" q.fundIntentId," +
				" q.projectName," +
				" q.projectNumber," +
				" q.incomeMoney," +
				" q.intentDate," +
				" q.factDate," +
				" q.payMoney," +
				" q.afterMoney," +
				" q.notMoney," +
				" q.flatMoney," +
				" q.accrualMoney," +
				" q.fundType," +
				" q.businessType," +
				" q.projectId," +
				" q.graceDay," +
				" q.continueDay," +
				" q.faxiAfterMoney," +
				" q.interestStarTime," +
				" q.interestEndTime," +
				" q.payintentPeriod," +
				" q.overdureMoney," +
				" q.overdueAfterMoney," +
				" q.companyId," +
				" q.remark," +
				" sp1.notMoney AS fxnotMoney,"+
				" sp2.notMoney AS overNotMoney," +
				" o.org_name as orgName," +
				" di.itemValue as fundTypeName," +
				" q.interestTax" +
				" from sl_fund_intent as q " +
				" LEFT JOIN organization as o on q.companyId=o.org_id " +
				" LEFT JOIN dictionary_independent as di on di.dicKey=q.fundType" +
				" LEFT JOIN sl_punish_interest as sp1 on sp1.fundIntentId = q.fundIntentId and sp1.type = 0"+
				" LEFT JOIN sl_punish_interest as sp2 on sp2.fundIntentId = q.fundIntentId and sp1.type = 1 where 1=1");
		sb.append(" and  q.isValid = 0 and q.isCheck = 0 and q.businessType='"+businessType+"' and q.fundType in "+fundType);
		tempCount.append(" and  q.isValid = 0 and q.isCheck = 0 and q.businessType='"+businessType+"' and q.fundType in "+fundType);
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd",Locale.CHINESE);
		String str = simpleDateFormat.format(new Date());
		if(fundType.equals("principalLending")||fundType.equals("constBack")){
		    if(typetab.equals("should")){
	        	sb.append(" and q.notMoney !=0");
	        	tempCount.append(" and q.notMoney !=0");
			}
	        if(typetab.equals("actual")){
	        	sb.append(" and  q.notMoney =0");
	        	tempCount.append(" and  q.notMoney =0");
			}
		}else{
	        if(typetab.equals("should")){
	        	sb.append(" and  q.intentDate >= '"+str+"' and q.notMoney !=0"); //计划日期大于或等于今天
	        	tempCount.append(" and  q.intentDate >= '"+str+"' and q.notMoney !=0"); //计划日期大于或等于今天
			}
	        if(typetab.equals("owe")){
	        	sb.append(" and  q.intentDate < '"+str+"' and q.notMoney !=0");
	        	tempCount.append(" and  q.intentDate < '"+str+"' and q.notMoney !=0");
			}
	        if(typetab.equals("actual")){
	        	sb.append(" and  q.notMoney =0");
	        	tempCount.append(" and  q.notMoney =0");
			}
        }
		if(map.size()!=5){
			String synthesize=map.get("synthesize");
			String projNum=map.get("Q_projNum_N_EQ");
			String projName=map.get("Q_proj_Name_N_EQ");
			String intentDatege=map.get("Q_intentDate_D_GE");
			String intentDatele=map.get("Q_intentDate_D_LE");
			String operationType=map.get("Q_operationType_N_EQ");
			String companyId=map.get("companyId");
			String projectProperties=map.get("properties");
			String startFactDate=map.get("startFactDate");
			String endFactDate=map.get("endFactDate");
			String flagMoney = map.get("flagMoney");
			if(flagMoney!=null&&!flagMoney.equals("")){
				if(flagMoney.equals("notMoney")){
					sb.append(" and q.notMoney !=0");
					tempCount.append(" and q.notMoney !=0");
				}else if(flagMoney.equals("isMoney")){
					sb.append(" and q.notMoney =0");
					tempCount.append(" and q.notMoney =0");
				}else if(flagMoney.equals("overdueMoney")){
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					Date d = new Date();
					sb.append(" and  q.intentDate < '"+sdf.format(d)+"'");
					tempCount.append(" and  q.intentDate < '"+sdf.format(d)+"'");
				}
			}
			
			if(null !=companyId&&!companyId.equals("")){
				sb.append(" and q.companyId="+companyId);
				tempCount.append(" and q.companyId="+companyId);
			}
			if(null!=projNum && !projNum.equals("")){
				sb.append(" and q.projectNumber like '%"+projNum+"%'");
				tempCount.append(" and q.projectNumber like '%"+projNum+"%'");
			}
			if(null!=projName && !projName.equals("")){
				sb.append(" and q.projectName like '%"+projName+"%'");
				tempCount.append(" and q.projectName like '%"+projName+"%'");
			}
			if(null!=operationType && !operationType.equals("")){
				sb.append(" and q.businessType  = '"+operationType+"'");
				tempCount.append(" and q.businessType  = '"+operationType+"'");
			}
			if(null!=intentDatege && !intentDatege.equals("")){
				sb.append(" and  q.intentDate >= '"+intentDatege+"'");
				tempCount.append(" and  q.intentDate >= '"+intentDatege+"'");
			}
			if(null!=intentDatele && !intentDatele.equals("")){
				sb.append(" and  q.intentDate <= '"+intentDatele+"'");
				tempCount.append(" and  q.intentDate <= '"+intentDatele+"'");
			}
			if(null!=startFactDate && !"".equals(startFactDate) && (null==endFactDate || "".equals(endFactDate))){
				sb.append(" and q.factDate>='"+startFactDate+"'");
				tempCount.append(" and q.factDate>='"+startFactDate+"'");
			}
			if(null!=endFactDate && !"".equals(endFactDate) && (null==startFactDate || "".equals(startFactDate))){
				sb.append(" and q.factDate<='"+endFactDate+"'");
				tempCount.append(" and q.factDate<='"+endFactDate+"'");
			}
			if(null!=startFactDate && !"".equals(startFactDate) && null!=endFactDate && !"".equals(endFactDate)){
				sb.append(" and q.factDate>='"+startFactDate+"' and q.factDate<='"+endFactDate+"'");
				tempCount.append(" and q.factDate>='"+startFactDate+"' and q.factDate<='"+endFactDate+"'");
			}
			if(null!=projectProperties && !projectProperties.equals("")){
				if(null!=businessType && !"SmallLoan".equals(businessType)){			
					sb.append(" and q.projectId in (select s.projectId from sl_smallloan_project as s where s.projectProperties in ("+projectProperties+"))");
					tempCount.append(" and q.projectId in (select s.projectId from sl_smallloan_project as s where s.projectProperties in ("+projectProperties+"))");
				}
			}
			if(synthesize!=null&&!synthesize.equals("")){
				sb.append(" ORDER BY q.fundIntentId");
			}
		}
		
		tempCount.append(") as b");
		sb.append(" limit "+pageBean.getStart()+","+pageBean.getLimit());
		
		List list = this.getSession().createSQLQuery(sb.toString())
			.addScalar("fundIntentId",Hibernate.LONG)
			.addScalar("projectId",Hibernate.LONG)
			.addScalar("companyId",Hibernate.LONG)
			.addScalar("projectName", Hibernate.STRING)
			.addScalar("projectNumber", Hibernate.STRING)
			.addScalar("fundTypeName", Hibernate.STRING)
			.addScalar("businessType", Hibernate.STRING)
			.addScalar("fundType", Hibernate.STRING)
			.addScalar("remark", Hibernate.STRING)
			.addScalar("graceDay", Hibernate.STRING)
			.addScalar("continueDay", Hibernate.STRING)
			.addScalar("incomeMoney", Hibernate.BIG_DECIMAL)
			.addScalar("payMoney", Hibernate.BIG_DECIMAL)
			.addScalar("afterMoney", Hibernate.BIG_DECIMAL)
			.addScalar("notMoney", Hibernate.BIG_DECIMAL)
			.addScalar("flatMoney", Hibernate.BIG_DECIMAL)
			.addScalar("accrualMoney", Hibernate.BIG_DECIMAL)
			.addScalar("faxiAfterMoney", Hibernate.BIG_DECIMAL)
			.addScalar("overdureMoney", Hibernate.BIG_DECIMAL)
			.addScalar("overdueAfterMoney", Hibernate.BIG_DECIMAL)
			.addScalar("fxnotMoney", Hibernate.BIG_DECIMAL)
			.addScalar("overNotMoney", Hibernate.BIG_DECIMAL)
			.addScalar("intentDate", Hibernate.DATE)
			.addScalar("factDate", Hibernate.DATE)
			.addScalar("interestStarTime", Hibernate.DATE)
			.addScalar("interestEndTime", Hibernate.DATE)
			.addScalar("payintentPeriod", Hibernate.INTEGER)
			.addScalar("interestTax", Hibernate.BIG_DECIMAL)//利息税
			.setResultTransformer(Transformers.aliasToBean(SlFundIntent.class)).list();
			pageBean.setResult(list);
			
			BigInteger total =   (BigInteger) this.getSession().createSQLQuery(tempCount.toString()).uniqueResult();
			pageBean.setTotalCounts(total.intValue());
	}
	@Override
	public Long sizebyLedger(String businessType, String fundType,
			String typetab, PagingBean pb, Map<String, String> map) {
		String hql="select count(*) from SlFundIntent q where  1=1";
		String strs=ContextUtil.getBranchIdsStr();//39,40
		if(null!=strs && !"".equals(strs)){
			hql+=" and q.companyId in ("+strs+")"; //
		}
		hql+=" and  q.isValid = 0 and q.isCheck = 0 and q.businessType='"+businessType+"' and q.fundType in "+fundType;
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd",Locale.CHINESE);
		String str = simpleDateFormat.format(new Date());
		if(fundType.equals("principalLending")){
		    if(typetab.equals("should")){
	        	hql=hql+" and q.notMoney !=0";
			}
	       
	        if(typetab.equals("actual")){
	        	hql=hql+" and  q.notMoney =0";
			}
		}else{
	        if(typetab.equals("should")){
	        	hql=hql+" and  q.intentDate >= '"+str+"' and q.notMoney !=0";
			}
	        if(typetab.equals("owe")){
	        	hql=hql+" and  q.intentDate < '"+str+"' and q.notMoney !=0";
			}
	        if(typetab.equals("actual")){
	        	hql=hql+" and  q.notMoney =0";
			}
        }
		String synthesize="";
		if(map.size()!=5){
			synthesize=map.get("synthesize");
			String projNum=map.get("Q_projNum_N_EQ");
			String projName=map.get("Q_proj_Name_N_EQ");
			String isOverdue=map.get("Q_isOverdue_S_E");
			String notMoneyle=map.get("Q_notMoney_BD_LE");
			String intentDatege=map.get("Q_intentDate_D_GE");
			String intentDatele=map.get("Q_intentDate_D_LE");
			String operationType=map.get("Q_operationType_N_EQ");
			String companyId=map.get("companyId");
			String projectProperties=map.get("properties");
			String startFactDate=map.get("startFactDate");
			String endFactDate=map.get("endFactDate");
			String flagMoney = map.get("flagMoney");
			
			if(flagMoney!=null&&!flagMoney.equals("")){
				if(flagMoney.equals("notMoney")){
					hql=hql+" and q.notMoney !=0";
				}else if(flagMoney.equals("isMoney")){
					hql=hql+" and q.notMoney =0";
				}else if(flagMoney.equals("overdueMoney")){
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					Date d = new Date();
					hql=hql+" and  q.intentDate < '"+sdf.format(d)+"'";
				}
			}
			if(null !=companyId&&!companyId.equals("")){
				hql=hql+" and q.companyId="+companyId;
			}
			if(null!=projNum && !projNum.equals("")){
				hql=hql+" and q.projectNumber like '%/"+projNum+"%'  escape '/' ";
			}
			if(null!=projName && !projName.equals("")){
				hql=hql+" and q.projectName like '%/"+projName+"%'  escape '/' ";
			}
			if(null!=operationType && !operationType.equals("")){
				hql=hql+" and q.businessType  = '"+operationType+"'";
			}
			
			if(null!=intentDatege && !intentDatege.equals("")){
				hql=hql+" and  q.intentDate >= '"+intentDatege+"'";
			}
			
			if(null!=intentDatele && !intentDatele.equals("")){
				hql=hql+" and  q.intentDate <= '"+intentDatele+"'";
			}
			if(null!=startFactDate && !"".equals(startFactDate) && (null==endFactDate || "".equals(endFactDate))){
				hql=hql+" and q.factDate>='"+startFactDate+"'";
			}
			if(null!=endFactDate && !"".equals(endFactDate) && (null==startFactDate || "".equals(startFactDate))){
				hql=hql+" and q.factDate<='"+endFactDate+"'";
			}
			if(null!=startFactDate && !"".equals(startFactDate) && null!=endFactDate && !"".equals(endFactDate)){
				hql=hql+" and q.factDate>='"+startFactDate+"' and q.factDate<='"+endFactDate+"'";
			}
			if(null!=projectProperties && !projectProperties.equals("")){
				if(null!=businessType && !"SmallLoan".equals(businessType)){
					hql=hql+" and q.projectId in (select s.projectId from SlSmallloanProject as s where s.projectProperties in ("+projectProperties+"))";
				}
			}
		}else{
			//hql=hql+" and q.payMoney is null";
		}
		hql=hql+" order by q.intentDate asc";
		String sql="";
		if(synthesize!=null&&!synthesize.equals("")){
			sql="select COUNT(*) from ( select * from sl_fund_intent q where  1=1 and q.companyId in (1) and  q.isValid = 0 and q.isCheck = 0 " +
					" and q.businessType='SmallLoan' and q.fundType in ('loanInterest','consultationMoney','serviceMoney','principalRepayment')  " +
					" GROUP BY  payintentPeriod , projectId  ) as a";
			long count=0;
			Query query =  this.getSession().createSQLQuery(sql);
			List<Object> list = query.list();
			if(null!=list && list.size()>0){
				String num = list.get(0).toString();
				count=Long.valueOf(num).longValue();
			}
			return count;
		}else{
			long count=0;
			List list;
			if(pb == null) {
				list= findByHql(hql.toString());
			} else {
				list= findByHql(hql.toString(), null, pb);
			}
			if(null!=list && list.size()>0){
				count=(Long)list.get(0);
			}
			return count;
		}
		
	}
	@Override
	public List<SlFundIntent> listbyfundType(String businessType, Long projectId,String fundType, Long isInitialorId) {
		String hql="from SlFundIntent q  where q.isValid = 0 and  q.projectId="+projectId+" and q.businessType='"+businessType+"' and q.fundType='"+fundType+"'";
		if(null!=isInitialorId){
			hql=hql+" and isInitialorId="+isInitialorId;
		}
		return findByHql(hql.toString());
	}

	@Override
	public List<SlFundIntent> listbyOwe(String businessType,String fundType, Long isInitialorId) {
		String hql="from SlFundIntent q where 1=1";
		String strs=ContextUtil.getBranchIdsStr();//39,40
		if(null!=strs && !"".equals(strs)){
			hql+=" and q.companyId in ("+strs+")"; //
		}
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd",Locale.CHINESE);
		String str = simpleDateFormat.format(new Date());
		hql+=" and  q.fundType in "+fundType+" and q.isValid = 0 and q.isCheck = 0 and q.businessType='"+businessType+"' and  q.intentDate < '"+str+"' and q.notMoney !=0 and isInitialorId="+isInitialorId;
		return findByHql(hql.toString());
	}
	@Override
	public List<SlFundIntent> listbyOweTiming(String businessType,String fundType, Long isInitialorId) {
		String hql="from SlFundIntent q where 1=1";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd",Locale.CHINESE);
		String str = simpleDateFormat.format(new Date());
		hql+=" and  q.fundType in "+fundType+" and q.isValid = 0 and q.isCheck = 0 and q.businessType='"+businessType+"' and  q.graceDay < '"+str+"' and q.notMoney !=0 and isInitialorId="+isInitialorId;
		return findByHql(hql.toString());
	}

	@Override
	public List<SlFundIntent> listbyisInitialorId(Long isInitialorId) {
		String hql="from SlFundIntent q  where  q.isInitialorId="+isInitialorId;
		return findByHql(hql.toString());
	}

	@Override
	public List<SlFundIntent> getallbycompanyId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<SlFundIntent> wsgetByPrincipalLending(Long projectId,
			String businessType) {
		String hql="from SlFundIntent s where 1=1";
		String strs=ContextUtil.getLoginCompanyId().toString();
		if(null!=strs && !"".equals(strs)){
			hql+=" and s.companyId in ("+strs+")"; //
		}
		hql+=" and  s.fundType='principalLending' and s.projectId="+projectId+" and s.businessType='"+businessType+"' order by s.intentDate asc";
		return findByHql(hql);
	}

	@Override
	public List<SlFundIntent> wsgetByInterestAccrued(Long projectId,
			String businessType) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<SlFundIntent> wsgetByInterestPlan(Long projectId,
			String businessType,String factDate,String fundType) {
		String hql="from SlFundIntent s where 1=1";
		String strs=ContextUtil.getLoginCompanyId().toString();
		if(null!=strs && !"".equals(strs)){
			hql+=" and s.companyId in ("+strs+")"; //
		}
		hql+=" and   s.isValid = 0 and s.isCheck = 0 and  s.fundType='"+fundType+"' and s.businessType='"+businessType+"' and s.projectId="+projectId+" and s.intentDate='"+factDate+"'";
		return findByHql(hql);
	}



	@Override
	public List<SlFundIntent> wsgetByPrincipalRepayOverdue(Long projectId,
			String businessType) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<SlFundIntent> wsgetByRealInterest(Long projectId,
			String businessType) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<SlFundIntent> wsgetByRealPunishInterest(Long projectId,
			String businessType) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<SlFundIntent> wsgetByRealpPrincipalPepay(Long projectId,
			String businessType) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<SlFundIntent> listbyOwe(String businessType, Long projectId,
			String fundType) {
		String hql="from SlFundIntent q where q.projectId="+projectId;

		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd",Locale.CHINESE);
		String str = simpleDateFormat.format(new Date());
		hql+=" and  q.fundType in "+fundType+" and q.isValid = 0 and q.isCheck = 0 and q.businessType='"+businessType+"' and  q.intentDate < '"+str+"' and q.notMoney !=0 order by q.intentDate asc";
		return findByHql(hql.toString());
	}

	@Override
	public List<SlFundIntent> getListByFundType(Long projectId,String businessType, String fundType,Long getListByFundType,Long preceptId) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.fundType=? and (s.slSuperviseRecordId is null or s.slSuperviseRecordId!=?) and s.isValid = 0";
		if(null!=preceptId){
			hql=hql+" and s.preceptId="+preceptId;
		}
		hql=hql+" order by s.intentDate desc";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, fundType).setParameter(3, getListByFundType).list();
	}

	@Override
	public List<SlFundIntent> getListByIntentDate(Long projectId,
			String businessType, String date,Long slSuperviseRecordId) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.intentDate"+date+"'";
		if(null==slSuperviseRecordId){
			hql=hql+" and s.slSuperviseRecordId is null";
		}else{
			hql=hql+" and s.slSuperviseRecordId="+slSuperviseRecordId;
		}
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).list();
	}
	//add by liny  2013-2-28   查找共有多少条本金偿还
	@Override
	public List<SlFundIntent> findLastPrincipal(Long projectId,
			String businessType) {
		// TODO Auto-generated method stub
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=?  and s.fundType='principalRepayment' order by s.intentDate asc";
		List<SlFundIntent> list =getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).list();
		return list;
	}

	@Override
	public List<SlFundIntent> getByProjectId4(Long projectId,
			String businessType) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=?";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).list();
	}
	@Override
	public List<SlFundIntent> getByProjectId7(Long projectId,
			String businessType) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? GROUP BY payintentPeriod";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).list();
	}
	@Override
	public List<SlFundIntent> getListOfSupervise(Long projectId,
			String businessType,Date intentDate, Long slSuperviseRecordId) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.intentDate<=? and s.isValid=0";
		if(null!=slSuperviseRecordId){
			hql=hql+" and s.slSuperviseRecordId="+slSuperviseRecordId;
		}
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, intentDate).list();
	}

	@Override
	public List<SlFundIntent> getByFundType(Long projectId,
			String businessType, String fundType) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.fundType=? and s.slEarlyRepaymentId is null and s.slAlteraccrualRecordId is null";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, fundType).list();
	}

	@Override
	public List<SlFundIntent> getByIntentPeriod(Long projectId,
			String businessType, String fundType, Long slSuperviseRecordId,Integer payIntentPeriod) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.fundType=? and s.payintentPeriod=?";
		if(null!=slSuperviseRecordId){
			hql=hql+" and s.slSuperviseRecordId="+slSuperviseRecordId;
		}
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, fundType).setParameter(3, payIntentPeriod).list();
	}

	@Override
	public List<SlFundIntent> getOfEarly(Long projectId, String businessType,
			String fundType,Long slSuperviseRecordId) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.fundType=? and s.slEarlyRepaymentId is not null";
		if(null!=slSuperviseRecordId){
			hql=hql+" and s.slSuperviseRecordId="+slSuperviseRecordId;
		}
		hql=hql+" order by s.intentDate desc";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, fundType).list();
	}

	@Override
	public List<SlFundIntent> dynamicGetData(Long projectId,
			String businessType, String[] str) {
		StringBuffer hql=new StringBuffer("from SlFundIntent as s where s.projectId=? and s.businessType=?  and (");
		
		if(str!=null){
			for(int i=0;i<str.length;i++){
				if((i+1)!=str.length){
				hql.append("s.fundType='"+str[i]+"' or ");
				}else{
				hql.append("s.fundType='"+str[i]+"' ");
				}
			}
		}
		hql.append(") order by s.intentDate asc");
		List<SlFundIntent> list =getSession().createQuery(hql.toString()).setParameter(0, projectId).setParameter(1, businessType).list();
		return list;
	}

	public List<SlFundIntent> getListOfHistory(Long projectId,String businessType,Date intentDate) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.intentDate>? and s.isValid=0";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, intentDate).list();
	}
	public List<SlFundIntent> listByProjectId(Long projectId,String businessType) {
		String hql = "from SlFundIntent s where s.fundType !='principalDivert' and s.projectId="+projectId+" and s.businessType='"+businessType+"' order by s.intentDate asc";
		return findByHql(hql);
	}
	   //用来导出贷款催收的记录 add by  liny
	@Override
	public List<SlFundIntent> listOutExcel(String projectIdStr,Map<String, String> map,String businessType) {
		String hql="from SlFundIntent q where  1=1";
		String strs=ContextUtil.getBranchIdsStr();//39,40
		if(null!=strs && !"".equals(strs)){
			hql+=" and q.companyId in ("+strs+")"; //
		}
		if (projectIdStr !=null && !projectIdStr.equals("")) {
			hql+=" and q.projectId in ("+projectIdStr+") ";
		}else if(projectIdStr !=null && projectIdStr.equals("")){
			hql+="  and q.projectId in ('')";
		}
		/*if(businessType.equals("all")){
			hql+=" and  q.isValid = 0 and q.isCheck = 0 and q.payMoney =0 and q.afterMoney !=q.incomeMoney";//and q.businessType='smallLoan' ";
		}*/
		/*if(("SmallLoan".equals(businessType))){//最初版本
			hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.payMoney =0 and q.afterMoney !=q.incomeMoney and q.businessType='"+businessType+"'";
		}
		if("Financing".equals(businessType)){
			hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.incomeMoney =0 and q.afterMoney !=q.payMoney and q.businessType='"+businessType+"'";
		}*/
		
		/*if("SmallLoan".equals(businessType)){//改动1  update by gao
			hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.payMoney =0 and q.afterMoney !=q.incomeMoney and q.businessType='"+businessType+"'";
		}else if("Financing".equals(businessType)){
			hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.incomeMoney =0 and q.afterMoney !=q.payMoney and q.businessType='"+businessType+"'";
		}else if("LeaseFinance".equals(businessType)){
			hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.incomeMoney =0 and q.afterMoney !=q.payMoney and q.businessType='"+businessType+"'";
		}*/
		if(null!=businessType&&!"all".equals(businessType)){//改动2 update by gao
			if(businessType.equals("Financing")){
				hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.incomeMoney =0 and q.afterMoney !=q.payMoney and q.businessType='"+businessType+"'";
			}else{
				hql=hql+" and  q.isValid = 0 and q.isCheck = 0 and q.payMoney =0 and q.afterMoney !=q.incomeMoney and q.businessType='"+businessType+"'";
			}
		}
		
		String tabflag=map.get("tabflag");
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd",Locale.CHINESE);
		String str = simpleDateFormat.format(new Date());
		if(tabflag.equals("coming")){
			hql=hql+" and  q.intentDate >= '"+str+"'";
		}
        if(tabflag.equals("overdue")){
        	hql=hql+" and  q.intentDate < '"+str+"'";
		}
		if(map.size()!=4){
		String projNum=map.get("projNum");
		String projName=map.get("projectName");
		String intentType=map.get("intentType");
		String oppositeName=map.get("oppositeName");
		String intentDatege=map.get("intentDate_S");
		String intentDatele=map.get("intentDate_D_LE");
		String incomemoneyge=map.get("incomemoney_S");
		String incomemoneyle=map.get("incomemoney_D");
		String companyId=map.get("companyId");
		
		
		if(null !=companyId&&!companyId.equals("")){
			hql=hql+" and q.companyId="+companyId;
		}
		if(null != projNum&&!projNum.equals("")){
			hql=hql+" and q.projectNumber like '%/"+projNum+"%'  escape '/' ";
		}
		if(null != projName&&!projName.equals("")){
			hql=hql+" and q.projectName like '%/"+projName+"%'  escape '/' ";
		}
		if(null != oppositeName&&!oppositeName.equals("")){
			hql=hql+" and q.projectName like '%/"+oppositeName+"%'  escape '/' ";
		}
		if(null != intentType&&!intentType.equals("")){
			if(null!=businessType && businessType.equals("SmallLoan")){
				if(intentType.equals("0")){
					hql=hql+" and  q.fundType !='principalLending'";
				}
				if(intentType.equals("1")){
					hql=hql+" and  q.fundType = 'principalRepayment'";
				}
				if(intentType.equals("2")){
					hql=hql+" and  q.fundType != 'principalRepayment' and q.fundType != 'principalLending' and q.fundType != 'principalDivert'";
				}
			}else if(null!=businessType && businessType.equals("Financing")){
				if(intentType.equals("0")){
					hql=hql+" and  q.fundType !='Financingborrow'";
				}
				if(intentType.equals("1")){
					hql=hql+" and  q.fundType = 'FinancingRepay'";
				}
				if(intentType.equals("2")){
					hql=hql+" and  q.fundType != 'Financingborrow' and q.fundType != 'FinancingRepay' and q.fundType != 'principalDivert'";
				}
			}else if(null!=businessType && businessType.equals("Pawn")){
				if(intentType.equals("0")){
					hql=hql+" and  q.fundType !='pawnPrincipalLending'";
				}
				if(intentType.equals("1")){
					hql=hql+" and  q.fundType = 'pawnPrincipalRepayment'";
				}
				if(intentType.equals("2")){
					hql=hql+" and  q.fundType != 'pawnPrincipalLending' and q.fundType != 'pawnPrincipalRepayment'";
				}
			}else if("LeaseFinance".equals(intentType)){
					hql=hql+" and  q.fundType = '" + intentType + "' ";
			}
		}
		
		if(null != intentDatege&&!intentDatege.equals("")){
			hql=hql+" and  q.intentDate >= '"+intentDatege+"'";
		}
		
		if(null != intentDatele&&!intentDatele.equals("")){
			hql=hql+" and  q.intentDate <= '"+intentDatele+"'";
		}
		if(null != incomemoneyge && !incomemoneyge.equals("")){
			if(null!=businessType && businessType.equals("SmallLoan")){
				hql=hql+" and  q.incomeMoney >= "+incomemoneyge+"";
			}else if(null!=businessType && businessType.equals("Financing")){
				hql=hql+" and  q.payMoney >= "+incomemoneyge+"";
			}
		}
		
		if(null != incomemoneyle && !incomemoneyle.equals("")){
			if(null!=businessType && businessType.equals("SmallLoan")){
				hql=hql+" and  q.incomeMoney <= "+incomemoneyle+"";
			}else if(null!=businessType && businessType.equals("Financing")){
				hql=hql+" and  q.payMoney <= "+incomemoneyle+"";
			}
		}
		}else{
			//hql=hql+" and q.payMoney is null";
		}
		hql=hql+" order by q.intentDate asc";
	    Query query = getSession().createQuery(hql);
		
		 return  query.list();
	}

	@Override
	public BigDecimal getSumMoney(Long projectId, String businessType,
			String fundType) {
		SimpleDateFormat sd=new SimpleDateFormat("yyyy-MM-dd");
		String hql=" from SlFundIntent as s where s.projectId=? and s.businessType=? and s.fundType=? and ((s.factDate is null and s.intentDate<'"+sd.format(new Date())+"') or (s.factDate is not null and s.intentDate<s.factDate)) and s.notMoney!=0";
		List<SlFundIntent> list=getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, fundType).list();
		BigDecimal money=new BigDecimal(0);
		for(SlFundIntent s:list){
			if(null!=s.getNotMoney()){
				money=money.add(s.getNotMoney());
			}
		}
		return money;
	}
	@Override
	public List<SlFundIntent> getListByOperateId(Long projectId,
			String businessType, Long operateId, String status) {
		String hql="from SlFundIntent as f where f.projectId=? and f.businessType=? and f.operateId=? and f.isValid"+status;
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, operateId).list();
	}

	@Override
	public List<SlFundIntent> getListByEarlyOperateId(Long projectId,
			String businessType, Long earlyOperateId, String status) {
		String hql="from SlFundIntent as f where f.projectId=? and f.businessType=? and f.earlyOperateId=? and f.isValid"+status;
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, earlyOperateId).list();
	}

	@Override
	public List<SlFundIntent> getListByAlteraccrualOperateId(Long projectId,
			String businessType, Long alteraccrualOperateId, String status) {
		String hql="from SlFundIntent as f where f.projectId=? and f.businessType=? and f.alteraccrualOperateId=? and f.isValid"+status;
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, alteraccrualOperateId).list();
	}

	@Override
	public List<SlFundIntent> getListByFundType(Long projectId,
			String businessType, String fundType) {
		String hql="from SlFundIntent as f where f.projectId=? and f.businessType=? and f.fundType=? order by f.intentDate asc";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, fundType).list();
	}
	@Override
	public List<SlFundIntent> getListByTypeAndDate(Long projectId,
			String businessType, String fundType, String intentDate) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.fundType=? and s.isValid=0 and s.intentDate"+intentDate+" order by s.intentDate asc";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, fundType).list();
	}

	@Override
	public List<SlFundIntent> getyqList(Long projectId, String businessType,
			String intentDate) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.isValid=0 and (s.intentDate<'"+intentDate+"' or s.intentDate<s.factDate)";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).list();
	}

	@Override
	public List<SlFundIntent> getListByProjectId(Long projectId,
			String businessType) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.isValid=0 order by s.intentDate asc";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).list();
	}

	@Override
	public List<SlFundIntent> getList(String fundType, String intentDate,String companyId) {
		String hql="from SlFundIntent as s where s.fundType=? and s.isValid=0 and s.isCheck=0 and s.intentDate<'"+intentDate+"'";
		String str=ContextUtil.getBranchIdsStr();
		if(null!=companyId && !"".equals(companyId)){
			str=companyId;
		}
		if(null!=str && !str.equals("")){
			hql=hql+" and s.companyId in ("+str+")";
		}
		return getSession().createQuery(hql).setParameter(0, fundType).list();
	}

	@Override
	public List<SlFundIntent> getListByType(Long projectId,	String businessType, String fundType, String intentDate) {
		if("synthesize".equals(fundType)){
			int payintentPeriod = new Long(businessType).intValue();  
			String hql="from SlFundIntent as s where s.projectId=?  and s.payintentPeriod=? and s.intentDate='"+intentDate+"'";
			return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, (payintentPeriod)).list();
		}else{
			
			String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.fundType=? and s.isValid=0 and s.intentDate"+intentDate+" order by s.intentDate asc";
			return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, fundType).list();
		}
	}

	@Override
	public List<SlFundIntent> getByProjectAsc(Long projectId,String businessType,Long preceptId) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=?";
		if(null!=preceptId){
			hql=hql+" and s.preceptId="+preceptId;
		}
		hql=hql+"   order by s.intentDate asc";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).list();
	}
	/*@Override
	public List<SlFundIntent> getByProjectAsc(Long projectId,String businessType,String fundResource) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.fundResource=? order by s.intentDate asc";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, fundResource).list();
	}*/
	//用来查询出来充值还是取现的台账
	@Override
	public List<SlFundIntent> findAccountFundIntent(Long accountId,Long investPersonId, Long dealInfoId, int i) {
		// TODO Auto-generated method stub
		String hql =" from SlFundIntent as sl where sl.investPersonId=? and sl.systemAccountId=? and sl.accountDealInfoId=? and sl.afterMoney=0";
		if(i==0){//充值
			hql=hql+" and sl.fundType like '%accountRecharge%'";
		}else if(i==1){//取现
			hql=hql+" and sl.fundType like '%accountEnchashment%'";
		}
		return  getSession().createQuery(hql).setParameter(0, investPersonId).setParameter(1, accountId).setParameter(2, dealInfoId).list();
		}
	//查出已经债权人购买债权没有对账的款项信息
	@Override
	public List<SlFundIntent> getListByTreeIdUn(Long obligationId,
			Long investMentPersonId, Long id) {
		// TODO Auto-generated method stub
		String hql =" from SlFundIntent as sl where (sl.afterMoney=0 or sl.afterMoney=null )";
		if(obligationId!=0&&obligationId!=null&&!"".equals(obligationId)){
			hql=hql+" and sl.obligationId ="+obligationId;
		}if(investMentPersonId!=0&&investMentPersonId!=null&&!"".equals(investMentPersonId)){
			hql=hql+" and sl.investPersonId ="+investMentPersonId;
		}if(id!=0&&id!=null&&!"".equals(id)){
			hql=hql+" and sl.obligationInfoId ="+id;
		}
		hql =hql+" order by sl.investPersonId asc";
		List<SlFundIntent> list=getSession().createQuery(hql).list();
		return  getSession().createQuery(hql).list();
	}
	//查出债权人已经对过账的利息收益
	@Override
	public List<SlFundIntent> getListByTreeIdUn(Long obligationId,
			Long investMentPersonId, Long id, String investaccrual) {
		// TODO Auto-generated method stub
		String hql =" from SlFundIntent as sl where (sl.notMoney=0 or sl.notMoney=null )  and sl.fundType='"+investaccrual+"'";
		if(obligationId!=0&&obligationId!=null&&!"".equals(obligationId)){
			hql=hql+" and sl.obligationId ="+obligationId;
		}if(investMentPersonId!=0&&investMentPersonId!=null&&!"".equals(investMentPersonId)){
			hql=hql+" and sl.investPersonId ="+investMentPersonId;
		}if(id!=0&&id!=null&&!"".equals(id)){
			hql=hql+" and sl.obligationInfoId ="+id;
		}
		hql =hql+" order by sl.investPersonId asc";
		List<SlFundIntent> list=getSession().createQuery(hql).list();
		return  getSession().createQuery(hql).list();
	}
	 //查出一个债权人购买一个债权记录产生的款项信息
	@Override
	public List<SlFundIntent> getListByTreeId(Long projectId,
			Long investMentPersonId, Long id) {
		// TODO Auto-generated method stub
		String hql =" from SlFundIntent as sl where 1=1 ";
		if(projectId!=null&&projectId!=0&&!"".equals(projectId)){
			hql=hql+" and sl.obligationId ="+projectId;
		}if(investMentPersonId!=0&&investMentPersonId!=null&&!"".equals(investMentPersonId)){
			hql=hql+" and sl.investPersonId ="+investMentPersonId;
		}if(id!=0&&id!=null&&!"".equals(id)){
			hql=hql+" and sl.obligationInfoId ="+id;
		}
		hql =hql+" order by sl.investPersonId asc";
		List<SlFundIntent> list=getSession().createQuery(hql).list();
		return  getSession().createQuery(hql).list();
	}

	@Override
	public List<SlFundIntent> listOfInverstPerson(Long inverstPersonId,Long projectId, String businessType) {
		if("synthesize".equals(businessType)){
			int payintentPeriod = new Long(inverstPersonId).intValue();  
			String hql="from SlFundIntent as s where s.projectId=?  and s.payintentPeriod=?";
			return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, (payintentPeriod)).list();
		}else{
			String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.investPersonId=?";
			return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, inverstPersonId).list();
		}
	}

	@Override
	public List<SlFundIntent> getbyPreceptId(Long preceptId) {
		String hql="from SlFundIntent as s where s.preceptId=?  order by s.intentDate asc";
		return getSession().createQuery(hql).setParameter(0,preceptId).list();
	}

	@Override
	public List<SlFundIntent> getByprincipalRepayment(Long projectId,
			String businessType) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=?  and s.fundType=? order by s.intentDate asc";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2,"principalRepayment").list();
	}

	@Override
	public List<SlFundIntent> getListByIntentDate(Date itentDate,java.lang.Short isUrge) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
/*		principalRepayment  本金偿还
		loanInterest		利息偿还
		consultationMoney	咨询管理费
		serviceMoney		服务费
*/
		Date today = new Date();
		if(isUrge==null){
			String hql = "from SlFundIntent where intentDate >= '"+sdf.format(itentDate)+" 00:00:00' and intentDate <= '"+sdf.format(itentDate)+" 23:59:59' and afterMoney = 0";
			return super.findByHql(hql);
		}else if(isUrge==0){
			String hql = "from SlFundIntent where intentDate >= '"+sdf.format(today)+" 00:00:00' and intentDate <= '"+sdf.format(itentDate)+" 23:59:59' and afterMoney = 0 and (isUrge = "+isUrge+" or isUrge is null)  and fundType in ('principalRepayment','loanInterest','consultationMoney','serviceMoney')";
			return super.findByHql(hql);
		}else{
			String hql = "from SlFundIntent where intentDate >= '"+sdf.format(itentDate)+" 00:00:00' and intentDate <= '"+sdf.format(itentDate)+" 23:59:59' and afterMoney = 0 and isUrge = "+isUrge;
			return super.findByHql(hql);
		}
		
	}
	

	@Override
	public SlFundIntent getFundIntent(Long projectId, Integer payintentPeriod,
			String fundType, Long bidPlanId) {
		String hql="from SlFundIntent as s where s.projectId=? and s.payintentPeriod=? and s.fundType=? and s.bidPlanId=?";
		Object[] params={projectId,payintentPeriod,fundType,bidPlanId};
		return (SlFundIntent)findUnique(hql, params);
	}
	@Override
	public List<SlFundIntent> listByDateAndEarlyId(Long projectId,
			String businessType, String earlyDate, Long slEarlyRepaymentId,Long preceptId) {
		String hql="from SlFundIntent as f where f.projectId=? and f.businessType=? and f.preceptId=? and (f.slEarlyRepaymentId is null or f.slEarlyRepaymentId!=?) and f.intentDate>'"+earlyDate+"'";
		return this.findByHql(hql, new Object[]{projectId,businessType,preceptId,slEarlyRepaymentId});
	}
	@Override
	public BigDecimal getPrincipalMoney(Long projectId, String businessType,
			String earlyDate,Long preceptId) {
		String hql="select sum(f.incomeMoney) from SlFundIntent as f where f.isValid=0 and f.isCheck=0 and f.fundType='principalRepayment' and f.projectId=? and f.businessType=? and f.preceptId=? and f.intentDate<='"+earlyDate+"'";
		List list=getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, preceptId).list();
		BigDecimal money=new BigDecimal(0);
		if(null!=list && list.size()>0){
			if(null!=list.get(0)){
				money=(BigDecimal) list.get(0);
			}
		}
		return money;
	}
	@Override
	public List<SlFundIntent> listByEarlyDate(Long projectId,String businessType,
			String earlyDate,String fundType,Long preceptId) {
		SimpleDateFormat sd=new SimpleDateFormat("yyyy-MM-dd");
//		String hql="from SlFundIntent as f where f.projectId=? and f.businessType=? and f.fundType=? and f.preceptId=? and f.isValid=0 and f.isCheck=0 and f.interestStarTime<='"+earlyDate+"'";
		
		String hql="from SlFundIntent as f where f.projectId=? and f.businessType=? and f.fundType=?  and f.isValid=0 and f.isCheck=0 and f.interestStarTime<='"+earlyDate+"'";
		if(AppUtil.getInterest().equals("0")){
			hql=hql+" and f.interestEndTime>='"+sd.format(DateUtil.addDaysToDate(DateUtil.parseDate(earlyDate,"yyyy-MM-dd"), -1))+"'";
		}else{
			hql=hql+" and f.interestEndTime>='"+earlyDate+"'";
		}
		return this.findByHql(hql, new Object[]{projectId,businessType,fundType});
//		return this.findByHql(hql, new Object[]{projectId,businessType,fundType,preceptId})
	}

	@Override
	public List<SlFundIntent> listByAlelrtDate(Long projectId,
			String businessType, String alelrtDate, String fundType,
			Long preceptId, Long slAlteraccrualRecordId) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and s.intentDate>'"+alelrtDate+"' and (s.slAlteraccrualRecordId is null or s.slAlteraccrualRecordId!=?) and s.fundType in"+fundType;
		if(null!=preceptId && !preceptId.equals("")){
			hql=hql+" and s.preceptId="+Long.valueOf(preceptId);
		}
		return this.findByHql(hql, new Object[]{projectId,businessType,slAlteraccrualRecordId});
	}
	@Override
	public List<SlFundIntent> listByCurrentDate(String currentDate) {
		String hql="from SlFundIntent as s where s.intentDate<'"+currentDate+"' and s.isValid=0 and s.isCheck=0 and s.notMoney!=0  and s.fundType!='principalLending'";
		return this.findByHql(hql);
	}

	@Override
	public List<SlFundIntent> listByPreceptIdAndDate(Long projectId,
			String businessType,Long preceptId, String date, String fundType) {
		String hql="from SlFundIntent as s where s.isValid=0 and s.isCheck=0 and s.projectId=? and s.businessType=? and s.preceptId=? and s.fundType=? and s.intentDate>='"+date+"' order by s.intentDate asc";
		return this.findByHql(hql, new Object[]{projectId,businessType,preceptId,fundType});
	}
	
	@Override
	public List<SlFundIntent> getOverdueProjectId(Long projectId,String businessType) {
		String hql = "from SlFundIntent s where s.projectId="+projectId+" and s.businessType='"+businessType+"' and s.isValid=0 and s.isCheck=0 and s.notMoney>0 and s.intentDate<NOW() and s.fundType !='principalLending'";
		return findByHql(hql);
	}

	@Override
	public List<SlFundIntent> findSlSuperviseByFundType(Long projectId,
			Long slSuperviseRecordId, String businessType, String fundType) {
		// TODO Auto-generated method stub
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=?  and s.fundType=?  and s.slSuperviseRecordId=? order by s.intentDate asc";
		return getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2,fundType).setParameter(3, slSuperviseRecordId).list();
	}

	@Override
	public void projectList(PageBean<SlFundIntent> pageBean,Map<String, String> map) {
		List list=null;
		
		StringBuffer tempCount=new StringBuffer("SELECT count(*) FROM " +
				" (" +
				" SELECT intent.projectId" +
				" FROM sl_fund_intent AS intent" +
				" where fundType !='principalLending' AND intent.isCheck = 0 AND intent.isValid = 0 ");
		
		StringBuffer temp=new StringBuffer("select" +
				" intent.projectId as projectId ," +
				" intent.payintentPeriod as payintentPeriod," +
				" SUM(ifnull(intent.afterMoney,0) + ifnull(intent.faxiAfterMoney,0) + ifnull(intent.overdueAfterMoney,0)) as synthesizeAfterMoney," +
				" intent.intentDate as intentDate," +
				" intent.factDate as factDate," +
				" max(intent.punishDays) as punishDays," +
				" sum(ifnull(intent.notMoney,0) +ifnull(intent.accrualMoney,0) +ifnull(intent.overdureMoney,0) -ifnull(intent.faxiAfterMoney,0) -ifnull(intent.overdueAfterMoney,0)) as notSynthesizeMoney," +
				" SUM(ifnull(intent.accrualMoney,0)) as punishMoney," +
				" SUM(ifnull(intent.overdureMoney,0)) as overdureMoney," +
				" sum(CASE when intent.fundType = 'principalRepayment' then ifnull(intent.incomeMoney,0) else 0 end) as principalRepayment," +
				" sum(CASE when intent.fundType = 'loanInterest' then ifnull(intent.incomeMoney,0) else 0 end) as loanInterest," +
				" sum(CASE when intent.fundType = 'consultationMoney' then ifnull(intent.incomeMoney,0) else 0 end) as consultationMoney," +
				" (IF(intent.intentDate< NOW() ,1,0)) as isOverdue," +
				" SUM(IFNULL(intent.accrualMoney,0) + IFNULL(intent.overdureMoney, 0)+" +
				" (CASE when intent.fundType = 'principalRepayment' then ifnull(intent.incomeMoney,0) else 0 end)+" +
				" (CASE when intent.fundType = 'loanInterest' then ifnull(intent.incomeMoney,0) else 0 end)+" +
				" (CASE when intent.fundType = 'consultationMoney' then ifnull(intent.incomeMoney,0) else 0 end)+" +
				" (CASE when intent.fundType = 'serviceMoney' then ifnull(intent.incomeMoney,0) else 0 end)) as synthesizeMoney," +
				" intent.fundIntentId," +
				" intent.interestTax," +
				" intent.penaltyTax," +
				" intent.overdureTax,"+
				" sum(CASE when 	intent.fundType = 'serviceMoney' then ifnull(intent.incomeMoney,0) else 0 end) as serviceMoney from sl_fund_intent as intent " +
				" where fundType !='principalLending' AND intent.isCheck = 0 AND intent.isValid = 0");
		
		StringBuffer sql  = new StringBuffer();
		sql.append("select " +
				" intent.*," +
				" pro.projectNumber," +
				" pro.projectName" +
				" from ( ");
	
		
		if(map.get("Q_proj_Name_N_EQ")!=null &&!"".equals(map.get("Q_proj_Name_N_EQ").toString())){
			temp.append(" and intent.projectName like '%"+map.get("Q_proj_Name_N_EQ").toString()+"%'");
			tempCount.append(" and intent.projectName like '%"+map.get("Q_proj_Name_N_EQ").toString()+"%'");
		}
		if(map.get("Q_projNum_N_EQ")!=null && !"".equals(map.get("Q_projNum_N_EQ").toString())){
			temp.append(" and intent.projectNumber like '%"+map.get("Q_projNum_N_EQ").toString()+"%'");
			tempCount.append(" and intent.projectNumber like '%"+map.get("Q_projNum_N_EQ").toString()+"%'");
		}
		if(map.get("Q_intentDate_D_GE")!=null && !"".equals(map.get("Q_intentDate_D_GE").toString())){
			temp.append(" and  intent.intentDate >= '"+map.get("Q_intentDate_D_GE").toString()+"'");
			tempCount.append(" and  intent.intentDate >= '"+map.get("Q_intentDate_D_GE").toString()+"'");
		}
		if(map.get("Q_intentDate_D_LE")!=null && !"".equals(map.get("Q_intentDate_D_LE").toString())){
			temp.append(" and  intent.intentDate <= '"+map.get("Q_intentDate_D_LE").toString()+"'");
			tempCount.append(" and  intent.intentDate <= '"+map.get("Q_intentDate_D_LE").toString()+"'");
		}
		if(map.get("startFactDate")!=null && !"".equals(map.get("startFactDate").toString()) ){
			temp.append(" and  intent.factDate >= '"+map.get("startFactDate").toString()+"'");
			tempCount.append(" and  intent.factDate >= '"+map.get("startFactDate").toString()+"'");
		}
		if(map.get("endFactDate")!=null && !"".equals(map.get("endFactDate").toString())){
			temp.append(" and  intent.factDate <= '"+map.get("endFactDate").toString()+"'");
			tempCount.append(" and  intent.factDate <= '"+map.get("endFactDate").toString()+"'");
		}
		if(map.get("flagMoney")!=null &&!"".equals(map.get("flagMoney").toString())){
			if(map.get("flagMoney").toString().equals("isMoney")){//已还款
				temp.append(" and intent.factDate is not null ");
				tempCount.append(" and intent.factDate is not null ");
			}else if(map.get("flagMoney").toString().equals("notMoney")){//未还款
				temp.append(" and intent.factDate is null ");
				tempCount.append(" and intent.factDate is null ");
			}else if(map.get("flagMoney").toString().equals("overdueMoney")){//已逾期
				temp.append(" and intent.isOverdue = 1 ");
				tempCount.append(" and intent.isOverdue = 1 ");
			}
		}
		tempCount.append(" GROUP BY intent.projectId,intent.payintentPeriod ) as b");
		
		sql.append(temp);
		sql.append(" GROUP BY intent.projectId,intent.payintentPeriod ");
		sql.append(" LIMIT "+pageBean.getStart()+","+pageBean.getLimit());
		sql.append(" ) as intent");
		sql.append(" LEFT JOIN bp_fund_project AS pro ON intent.projectId = pro.projectId ");
		System.out.println(" sql查询------"+sql);
	//	sql.append(" ORDER BY intent.intentDate DESC");
		list = this.getSession().createSQLQuery(sql.toString())
			.addScalar("fundIntentId", Hibernate.LONG)//款项id
			.addScalar("projectId", Hibernate.LONG)//项目id
			.addScalar("projectNumber", Hibernate.STRING)//项目编号
			.addScalar("projectName", Hibernate.STRING)//项目名称
			.addScalar("payintentPeriod",Hibernate.INTEGER)//款项期数
			.addScalar("punishMoney",Hibernate.BIG_DECIMAL)//罚息金额
			.addScalar("overdureMoney",Hibernate.BIG_DECIMAL)//逾期金额
			.addScalar("synthesizeAfterMoney",Hibernate.BIG_DECIMAL)//已到账金额
			.addScalar("punishDays", Hibernate.INTEGER)//罚息天数
			.addScalar("notSynthesizeMoney", Hibernate.BIG_DECIMAL)//未对账金额
			.addScalar("intentDate",Hibernate.DATE)//计划还款日
			.addScalar("factDate", Hibernate.DATE)//实际到账日期
			.addScalar("punishMoney", Hibernate.BIG_DECIMAL)//罚息金额
			.addScalar("loanInterest", Hibernate.BIG_DECIMAL)//利息
			.addScalar("consultationMoney", Hibernate.BIG_DECIMAL)//咨询费
			.addScalar("serviceMoney", Hibernate.BIG_DECIMAL)//服务费
			.addScalar("principalRepayment", Hibernate.BIG_DECIMAL)//本金
			.addScalar("synthesizeMoney", Hibernate.BIG_DECIMAL)//合计金额
			.addScalar("interestTax", Hibernate.BIG_DECIMAL)//利息税
			.addScalar("penaltyTax", Hibernate.BIG_DECIMAL)//罚息税
			.addScalar("overdureTax", Hibernate.BIG_DECIMAL)//逾期利息税
			.setResultTransformer(Transformers.aliasToBean(SlFundIntent.class)).list();
		pageBean.setResult(list);
		BigInteger total = (BigInteger) this.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(tempCount.toString()).uniqueResult();
		pageBean.setTotalCounts(total.intValue());
	}

	@Override
	public List<SlFundIntent> getComplexList(String projectId,String payintentPeriod, String businessType) {
		String hql = "from SlFundIntent s where s.projectId="+projectId+" and s.businessType='"+businessType+"' and (s.isValid = 0 and s.isCheck = 0) and s.payintentPeriod="+payintentPeriod;
		return findByHql(hql);
	}
	public List<SlFundIntent> getFundListByParams(Map params)
	  {
	    StringBuffer hql = new StringBuffer("from SlFundIntent as f where 1=1");
	    if ((params.get("projectId") != null) && (!"".equals(params.get("projectId")))) {
	      hql.append(" and f.projectId = " + params.get("projectId"));
	    }
	    if ((params.get("businessType") != null) && (!"".equals(params.get("businessType")))) {
	      hql.append(" and f.businessType = '" + params.get("businessType") + "'");
	    }
	    return getSession().createQuery(hql.toString()).list();
	  }

	@Override
	public BigDecimal getByProjectId5(Long projectId, String businessType) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and payintentPeriod=1 and fundType='loanInterest'";
		List<SlFundIntent> list=getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).list();
		BigDecimal money=new BigDecimal(0);
		for(SlFundIntent s:list){
			if(null!=s.getNotMoney()){
				money=money.add(s.getNotMoney());
			}
		}
		return money;
	}
	@Override
	public BigDecimal getByProjectId8(Long projectId, String businessType,Integer payintentPeriod) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and payintentPeriod=?";
		List<SlFundIntent> list=getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).setParameter(2, payintentPeriod).list();
		BigDecimal money=new BigDecimal(0);
		for(SlFundIntent s:list){
			if(null!=s.getNotMoney()){
				money=money.add(s.getNotMoney());
			}
		}
		return money;
	}
	@Override
	public BigDecimal getByProjectId6(Long projectId, String businessType) {
		String hql="from SlFundIntent as s where s.projectId=? and s.businessType=? and payintentPeriod=1 and fundType='principalRepayment'";
		List<SlFundIntent> list=getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).list();
		BigDecimal money=new BigDecimal(0);
		for(SlFundIntent s:list){
			if(null!=s.getNotMoney()){
				money=money.add(s.getNotMoney());
			}
		}
		return money;
	}
	@Override
	public BigDecimal getPrincipalMoney1(Long projectId, String businessType,
			String earlyDate) {
		String hql="select sum(f.incomeMoney) from SlFundIntent as f where f.isValid=0 and f.isCheck=0 and f.fundType='principalRepayment' and f.projectId=? and f.businessType=?  and f.intentDate>='"+earlyDate+"'";
		List list=getSession().createQuery(hql).setParameter(0, projectId).setParameter(1, businessType).list();
		BigDecimal money=new BigDecimal(0);
		if(null!=list && list.size()>0){
			if(null!=list.get(0)){
				money=(BigDecimal) list.get(0);
			}
		}
		return money;
	}

	@Override
	public List<SlFundIntent> overdueMoneys() {
		List list=null;
		StringBuffer sql  = new StringBuffer();
		sql.append("select fundIntentId ," +"( case  when p.oppositeType = 'person_customer' then  "+
				"(select  cp.`name` from cs_person as cp where cp.id = p.oppositeID ) "+
				"when p.oppositeType = 'company_customer' then (select enterprisename from cs_enterprise where id = p.oppositeID)"+
				"else '' end) as customerName,"+
//				"(SELECT  modelName FROM cs_procredit_mortgage_car as cs where cs.mortgageid=(SELECT  id FROM cs_procredit_mortgage as ce where ce.projid=p.projectId)) as modelName,"+
				"p.oppositeType as oppositeType, "+
				"p.carNo as carNo, "+
				"p.projectMoney as projectMoney, "+
				"p.startDate as startDate, "+
				"sl.intentDate as intentDate, "+
				"p.accrualtype as accrualtype, "+
				"p.yewu as yewu, "+
				"p.teamManagerName as teamManagerName, "+
				"p.departMentName as departMentName, "+
				"sl.intentDate as intentDate, "+
				"cr.modelName as modelName, "+
				"( datediff(now(),sl.intentDate)) as tinashu, "+
				"sl.notMoney as notMoney, "+
				"(p.projectMoney*0.08) as yuqipayMoney "+
				" from sl_fund_intent as sl " +
				" left join sl_smallloan_project as p   on p.projectId=sl.projectId" +
				" left join cs_procredit_mortgage as ce   on p.projectId=ce.projid " +
				" left join cs_procredit_mortgage_car as cr  on  cr.mortgageid=ce.id "+
				" where sl.isValid=0 and sl.isCheck=0 and sl.fundType='principalRepayment'" +" and sl.notMoney>0"+
				" and  sl.intentDate<NOW() ORDER BY sl.fundIntentId desc"
				);
		System.out.println(" sql查询------"+sql);
		list = this.getSession().createSQLQuery(sql.toString())
			.addScalar("fundIntentId", Hibernate.LONG)//款项id
			.addScalar("customerName", Hibernate.STRING)//客户名称
			.addScalar("oppositeType", Hibernate.STRING)//客户类型
			.addScalar("yewu", Hibernate.STRING)//业务员
			.addScalar("teamManagerName", Hibernate.STRING)//客户经理
			.addScalar("departMentName", Hibernate.STRING)//门店
			.addScalar("carNo", Hibernate.STRING)//车牌号
			.addScalar("projectMoney",Hibernate.BIG_DECIMAL)//贷款金额
			.addScalar("startDate",Hibernate.DATE)//贷款开始日期
			.addScalar("intentDate",Hibernate.DATE)//计划到账日期
			.addScalar("accrualtype",Hibernate.STRING)//还款方式
			.addScalar("notMoney", Hibernate.BIG_DECIMAL)//逾期金额
			.addScalar("tinashu", Hibernate.STRING)//逾期天数
			.addScalar("yuqipayMoney",Hibernate.BIG_DECIMAL)//计划还款日
			.addScalar("modelName",Hibernate.STRING)
//			.addScalar("factDate", Hibernate.DATE)//实际到账日期
//			.addScalar("punishMoney", Hibernate.BIG_DECIMAL)//罚息金额
//			.addScalar("loanInterest", Hibernate.BIG_DECIMAL)//利息
//			.addScalar("consultationMoney", Hibernate.BIG_DECIMAL)//咨询费
//			.addScalar("serviceMoney", Hibernate.BIG_DECIMAL)//服务费
//			.addScalar("principalRepayment", Hibernate.BIG_DECIMAL)//本金
//			.addScalar("synthesizeMoney", Hibernate.BIG_DECIMAL)//合计金额
//			.addScalar("interestTax", Hibernate.BIG_DECIMAL)//利息税
//			.addScalar("penaltyTax", Hibernate.BIG_DECIMAL)//罚息税
//			.addScalar("overdureTax", Hibernate.BIG_DECIMAL)//逾期利息税
			.setResultTransformer(Transformers.aliasToBean(SlFundIntent.class)).list();
//		BigInteger total = (BigInteger) this.getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(tempCount.toString()).uniqueResult();
       
	return list;	
	}
	@Test
	public  void uiui(){
		List list=null;
		StringBuffer sql  = new StringBuffer();
		sql.append("select fundIntentId ," +"( case  when p.oppositeType = 'person_customer' then  "+
				"(select  cp.`name` from cs_person as cp where cp.id = p.oppositeID ) "+
				"when p.oppositeType = 'company_customer' then (select enterprisename from cs_enterprise where id = p.oppositeID)"+
				"else '' end) as customerName,"+
//				"(SELECT  modelName FROM cs_procredit_mortgage_car as cs where cs.mortgageid=(SELECT  id FROM cs_procredit_mortgage as ce where ce.projid=p.projectId)) as modelName,"+
				"p.oppositeType as oppositeType, "+
				"p.carNo as carNo, "+
				"p.projectMoney as projectMoney, "+
				"p.startDate as startDate, "+
				"sl.intentDate as intentDate, "+
				"p.accrualtype as accrualtype, "+
				"cr.modelName as modelName, "+
				"sl.intentDate as intentDate, "+
				"( datediff(now(),sl.intentDate)) as tinashu, "+
				"sl.payMoney as payMoney, "+
				"(p.projectMoney*0.08) as yuqipayMoney "+
				" from sl_fund_intent as sl " +
				"left join sl_smallloan_project as p   on p.projectId=sl.projectId " +
				"left join cs_procredit_mortgage as ce   on p.projectId=ce.projid " +
				"left join cs_procredit_mortgage_car as cr  on  cr.mortgageid=ce.id"+
				" where sl.isValid=0 and sl.isCheck=0 and sl.fundType='principalRepayment' and  sl.intentDate<NOW()"
				);
     System.out.println(sql+"-- 查询语句");
	}
}