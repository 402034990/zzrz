package com.zhiwei.credit.dao.p2p.impl;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Hibernate;
import org.hibernate.transform.Transformers;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.core.web.paging.PagingBean;
import com.zhiwei.credit.dao.p2p.BpCustMemberDao;
import com.zhiwei.credit.model.p2p.BpCustMember;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class BpCustMemberDaoImpl extends BaseDaoImpl<BpCustMember> implements BpCustMemberDao{

	public BpCustMemberDaoImpl() {
		super(BpCustMember.class);
	}

	@Override
	public List<BpCustMember> get() {
		String hql = "from BpCustMember where (isDelete!=1 or isDelete is null) and (isForbidden!=1 or isForbidden is null)";
		List<BpCustMember> list = findByHql(hql);
		return list;
	}
	@Override
	public BpCustMember getMemberByPIdAndFlag(String flag, String pid) {

		String hql = "from BpCustMember cust where cust.moneymoremoreId=? ";
		Object[] params = {flag};
		return (BpCustMember)findUnique(hql, params);
	
	}

	@Override
	public BpCustMember getMemberUserName(String userName, String cardNum) {
		String hql = "from BpCustMember cust where cust.loginname=? and cust.cardcode=?";
		Object[] params = {userName,cardNum};
		return (BpCustMember)findUnique(hql, params);
	}
	/**
	 * 判断邀请的验证码是否存在
	 */
	@Override
	public BpCustMember isRecommandPerson(String recommandPerson) {
		BpCustMember bpCustMember=null;
		StringBuffer hql = new StringBuffer(" from BpCustMember ");
		hql.append(" where  plainpassword= '"+recommandPerson+"'");
		//hql.append(" where  id= '"+recommandPerson+"'");
		List<BpCustMember> list = findByHql(hql.toString());
		if(list.size()>0){
			bpCustMember=list.get(0);
		}
		return bpCustMember;
	}
	@Override
	public BpCustMember getMemberByFlagId(String userName) {
		String hql = "from BpCustMember cust where cust.thirdPayFlagId=? ";
		Object[] params = {userName};
		return (BpCustMember)findUnique(hql, params);
	}

	@Override
	public List<BpCustMember> getAllList(HttpServletRequest request,
			Integer start, Integer limit) {
		//System.out.println("进入dao层方法");
		String sql="SELECT bp.id as id," +
				"bp.loginname as loginname," +
				"bp.truename as truename, " +
				"bp.telphone as telphone, " +
				"bp.sex as sex, " +
				"bp.thirdPayFlagId as thirdPayFlagId, " +
				"bp.email as email, " +
				"bp.cardtype as cardtype, " +
				"bp.cardcode as cardcode, " +
				"bp.birthday as birthday, " +
				"bp.isForbidden as isForbidden, " +
				"bp.score as score, " +
				"bp.registrationDate as registrationDate, " +
				"b.loginname as directReferralsName, " +
				"b1.loginname as indirectReferenceName " +
				"from bp_cust_member as bp " +
				" left join bp_cust_member as b1 on bp.secondRecommandPerson=b1.plainpassword " +
				" left join bp_cust_member as b on bp.recommandPerson=b.plainpassword  where 1=1 ";
		if(request!=null){
			String isForBidType =request.getParameter("isForBidType");
			if(isForBidType!=null &&!"".equals(isForBidType)){
				if(isForBidType.equals("1")){
					sql =sql+" and bp.isForbidden="+Integer.parseInt(isForBidType);
				}else{
					sql =sql+" and (bp.isForbidden  is null or bp.isForbidden=0)";
				}
			}
			String  loginname=request.getParameter("Q_loginname_S_LK");
			if(loginname!=null &&!"".equals(loginname)){
				sql =sql+" and bp.loginname like '%"+loginname+"%'";
			}
			String  truename=request.getParameter("Q_truename_S_LK");
			if(truename!=null &&!"".equals(truename)){
				sql =sql+" and bp.truename like '%"+truename+"%'";
			}
			String  telphone=request.getParameter("Q_telphone_S_LQ");
			if(telphone!=null &&!"".equals(telphone)){
				sql =sql+" and bp.telphone like '%"+telphone+"%'";
			}
			String  cardcode=request.getParameter("Q_cardcode_S_LQ");
			if(cardcode!=null &&!"".equals(cardcode)){
				sql =sql+" and bp.cardcode like '%"+cardcode+"%'";
			}
		}
		List<BpCustMember> list =null;
		if(start==null|| limit==null){
			list=this.getSession().createSQLQuery(sql)
			.addScalar("id",Hibernate.LONG)
			.addScalar("loginname",Hibernate.STRING)
			.addScalar("truename",Hibernate.STRING)
			.addScalar("telphone",Hibernate.STRING)
			.addScalar("thirdPayFlagId",Hibernate.STRING)
			.addScalar("email",Hibernate.STRING)
			.addScalar("sex",Hibernate.INTEGER)
			.addScalar("cardtype",Hibernate.INTEGER)
			.addScalar("cardcode",Hibernate.STRING)
			.addScalar("birthday",Hibernate.DATE)
			.addScalar("isForbidden",Hibernate.INTEGER)
			.addScalar("score",Hibernate.LONG)
			.addScalar("registrationDate",Hibernate.TIMESTAMP)
			.addScalar("directReferralsName",Hibernate.STRING)
			.addScalar("indirectReferenceName",Hibernate.STRING)
			.setResultTransformer(Transformers.aliasToBean(BpCustMember.class)).list();
		}else{
			list=this.getSession().createSQLQuery(sql)
			.addScalar("id",Hibernate.LONG)
			.addScalar("loginname",Hibernate.STRING)
			.addScalar("truename",Hibernate.STRING)
			.addScalar("telphone",Hibernate.STRING)
			.addScalar("sex",Hibernate.INTEGER)
			.addScalar("thirdPayFlagId",Hibernate.STRING)
			.addScalar("email",Hibernate.STRING)
			.addScalar("cardtype",Hibernate.INTEGER)
			.addScalar("cardcode",Hibernate.STRING)
			.addScalar("birthday",Hibernate.DATE)
			.addScalar("isForbidden",Hibernate.INTEGER)
			.addScalar("score",Hibernate.LONG)
			.addScalar("registrationDate",Hibernate.TIMESTAMP)
			.addScalar("directReferralsName",Hibernate.STRING)
			.addScalar("indirectReferenceName",Hibernate.STRING)
			.setResultTransformer(Transformers.aliasToBean(BpCustMember.class))
			.setFirstResult(start).setMaxResults(limit).list();
		}
		return list;
	}

	@Override
	public BpCustMember getMemberUserName(String userName) {
		String hql = "from BpCustMember cust where cust.loginname=? ";
		Object[] params = {userName};
		return (BpCustMember)findUnique(hql, params);
	}
	
	//svn:songwj
	@Override
	public List<BpCustMember> getAllList1(HttpServletRequest request,
			Integer start, Integer limit) {
		//System.out.println("进入dao层方法");
		String sql="from BpCustMember as bp where 1=1 ";
		if(request!=null){
			String isForBidType =request.getParameter("isForBidType");
			if(isForBidType!=null &&!"".equals(isForBidType)){
				if(isForBidType.equals("1")){
					sql =sql+" and bp.isForbidden="+Integer.parseInt(isForBidType);
				}else{
					sql =sql+" and (bp.isForbidden  is null or bp.isForbidden=0)";
				}
			}
			String  loginname=request.getParameter("Q_loginname_S_LK");
			if(loginname!=null &&!"".equals(loginname)){
				sql =sql+" and bp.loginname like '%"+loginname+"%'";
			}
			String  truename=request.getParameter("Q_truename_S_LK");
			if(truename!=null &&!"".equals(truename)){
				sql =sql+" and bp.truename like '%"+truename+"%'";
			}
			String  recommandPerson=request.getParameter("Q_recommandPerson_S_LK");
			if(recommandPerson!=null &&!"".equals(recommandPerson)){
				sql =sql+" and bp.recommandPerson like '%"+recommandPerson+"%'";
			}
			String  cardcode=request.getParameter("Q_cardcode_S_EQ");
			if(cardcode!=null &&!"".equals(cardcode)){
				sql =sql+" and bp.cardcode= '"+cardcode+"'";
			}
			
			sql = sql + " order by recommandNum  desc";
		}
		
		List<BpCustMember> list =null;
		if(start==null|| limit==null){
			list=this.getSession().createQuery(sql).list();
		}else{
			list=this.getSession().createQuery(sql).setFirstResult(start).setMaxResults(limit).list();
		}
		return list;
	}
	
	
	/**
	 * 刷新邀请推荐用户数
	 * svn：songwj
	 * @return
	 */
	public List<BpCustMember> getBpCustMemberList(){
		String sql=	" select " +
				" bp.id,bp.plainpassword ," +
				" bp.recommandPerson," +
				" bp.loginname," +
				" bp.truename," +
				" bp.cardcode," +
				" bp.email," +
				" bp.telphone," +
				" tablenum.num," +
				" tablenum2.num2"+
				" from   bp_cust_member  bp  "+
				" LEFT join (select count(*) as num ,bp.plainpassword,bp.recommandPerson   from bp_cust_member bp   where   !ISNULL(bp.recommandPerson) GROUP BY bp.recommandPerson) as  tablenum   "+
				" on tablenum.recommandPerson = bp.plainpassword" +
				" LEFT join (select count(*) as num2 ,bp.plainpassword,bp.secondRecommandPerson   from bp_cust_member bp   where   !ISNULL(bp.secondRecommandPerson) GROUP BY bp.secondRecommandPerson) as  tablenum2   "+
				" on tablenum2.secondRecommandPerson = bp.plainpassword"+
				" ORDER BY tablenum.num DESC";
			List list=null;
			list=this.getSession().createSQLQuery(sql).
			 	addScalar("id",Hibernate.LONG).
				 addScalar("plainpassword",Hibernate.STRING).
				 addScalar("recommandPerson",Hibernate.STRING).
				 addScalar("loginname",Hibernate.STRING).
				 addScalar("truename",Hibernate.STRING).
				 addScalar("cardcode",Hibernate.STRING).
				 addScalar("email",Hibernate.STRING).
				 addScalar("telphone",Hibernate.STRING).
				 addScalar("num",Hibernate.STRING).
				 addScalar("num2",Hibernate.STRING).
				 setResultTransformer(Transformers.aliasToBean(BpCustMember.class)).list();
		return list;
	}

	/**
	 * 更新邀请数量的总数
	 * svn：songwj
	 */
	public BpCustMember updateNum(String recommandPerson){
		
//		System.out.println("aaaaaaaaaaaaaaaaaaaaa");
//		String  hql = "update bpCustMember bp set bp.recommandBNum =? where bp.recommandPerson = ?" ;
//		Object[] params = {num,recommandPerson};
//		findUnique(hql, params);
		
		String hql = "from BpCustMember cust where cust.plainpassword=? ";
		Object[] params = {recommandPerson};
		return   (BpCustMember) findUnique(hql, params);
//		BpCustMember b = 	 (BpCustMember)findUnique(hql, params);
//		System.out.println("cahkan   ----"+ b.getRecommandBNum());
//		b.setRecommandBNum(num);
//		merge(b);
	} 
	
	/**
	 * 按照邀请码查询邀请的人的数据信息
	 * svn：songwj
	 * @return
	 */
	public  List<BpCustMember> getBpCustMemberByrecommandPerson(String  recommandPerson){
//		System.out.println("dao类中的recommandPerson值===="+recommandPerson);
		String hql = "from BpCustMember where recommandPerson='"+recommandPerson+"'";
//		System.out.println("dao类中的hql值===="+hql);
		List<BpCustMember> list = findByHql(hql);
		return list;
	}

	@Override

	public List<BpCustMember> getByCardId(String userId) {
		String hql = "from BpCustMember where cardcode  like '%"+userId+"%' ";
		return this.getSession().createQuery(hql).list();

	}
	public List cusrNumList(HttpServletRequest request, PagingBean pb) {
		String sql="SELECT "
			+" CONCAT(c.id,'') ,"
			+" CONCAT(p.id,'') as personId,"
			+" c.loginname,"
			+" c.cardcode,"
			+" p.cardtype,"
			+" d.itemValue,"
			+" p.cardnumber,"
			+" c.truename,"
			+" p.`name`,"
			+" c.telphone,"
			+" p.cellphone,"
			+" c.email,"
			+" p.selfemail"
			+" FROM bp_cust_member AS c"
			+" LEFT JOIN bp_cust_relation AS r ON r.p2pCustId = c.id"
			+" AND r.offlineCustType = 'p_loan'"
			+" left join cs_person as p on p.id=r.offlineCusId"
			+" left join dictionary as d on d.dicId=p.cardtype"
			+" WHERE (c.isForbidden IS NULL OR c.isForbidden = 0)";
		
		String onlineCust=request.getParameter("online");//只查询来源于线上的个人借款客户信息
		if(null!=onlineCust && onlineCust.equals("0")){
			sql=sql+" and r.p2pCustId is not null ";
		}
		
		String loginname=request.getParameter("loginname");
		if(null!=loginname && !loginname.equals("")){
			sql=sql+" and c.loginname like '%"+loginname+"%'";
		}
		String truename=request.getParameter("truename");
		if(null!=truename && !truename.equals("")){
			sql=sql+" and c.truename like '%"+truename+"%'";
		}
		String telphone=request.getParameter("telphone");
		if(null!=telphone && !telphone.equals("")){
			sql=sql+" and c.telphone like '%"+telphone+"%'";
		}
		String cardcode=request.getParameter("cardcode");
		if(null!=cardcode && !cardcode.equals("")){
			sql=sql+" and c.cardcode like '%"+cardcode+"%'";
		}
		return this.getSession().createSQLQuery(sql).setFirstResult(pb.getStart()).setMaxResults(pb.getPageSize()).list();

	}


	@Override
	
	public Long cusrNumSize(HttpServletRequest request) {
		String sql="SELECT count(c.id)"
			+" FROM bp_cust_member AS c"
			+" LEFT JOIN bp_cust_relation AS r ON r.p2pCustId = c.id"
			+" AND r.offlineCustType = 'p_loan'"
			+" left join cs_person as p on p.id=r.offlineCusId"
			+" left join dictionary as d on d.dicId=p.cardtype"
			+" WHERE (c.isForbidden IS NULL OR c.isForbidden = 0)";
		String loginname=request.getParameter("loginname");
		if(null!=loginname && !loginname.equals("")){
			sql=sql+" and c.loginname like '%"+loginname+"%'";
		}
		String truename=request.getParameter("truename");
		if(null!=truename && !truename.equals("")){
			sql=sql+" and c.truename like '%"+truename+"%'";
		}
		String telphone=request.getParameter("telphone");
		if(null!=telphone && !telphone.equals("")){
			sql=sql+" and c.telphone like '%"+telphone+"%'";
		}
		String cardcode=request.getParameter("cardcode");
		if(null!=cardcode && !cardcode.equals("")){
			sql=sql+" and c.cardcode like '%"+cardcode+"%'";
		}
		Long count=0l;
		List list=this.getSession().createSQLQuery(sql).list();
		if(null!=list && list.size()>0){
			BigInteger size=(BigInteger) list.get(0);
			count=size.longValue();
		}
		return count;
	}

	public BpCustMember updateNum(String recommandPerson, Integer num) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<BpCustMember> listAccount(Map<String, String> map) {
		String sql = " SELECT " + 
				" bm.id,  " + 
				" bm.loginname, " + 
				" bm.truename, " + 
				" bm.telphone, " + 
				" bm.sex, " + 
				" bm.cardcode, " + 
				" bm.birthday, " + 
				" bm.email, " + 
				" bm.isForbidden, " + 
				" bm.score, " + 
				" bm.registrationDate " + 
				" FROM " + 
				" bp_cust_member bm " + 
				" LEFT JOIN bp_cust_relation  br on bm.id = br.p2pCustId " + 
				" WHERE " + 
				" br.offlineCustType = ? ";
		
/*		if(map.get("bidProName")!=null&&!"".equals(map.get("bidProName"))){
			sql += " and p.bidProName like '%"+map.get("bidProName")+"%' ";
		}
*/		
		return this.getSession().createSQLQuery(sql)
				.addScalar("id", Hibernate.LONG)
				.addScalar("loginname", Hibernate.STRING)
				.addScalar("truename", Hibernate.STRING)
				.addScalar("telphone", Hibernate.STRING)
				.addScalar("sex", Hibernate.INTEGER)
				.addScalar("cardcode", Hibernate.STRING)
				.addScalar("birthday", Hibernate.DATE)
				.addScalar("email", Hibernate.STRING)
				.addScalar("score", Hibernate.LONG)
				.addScalar("registrationDate", Hibernate.DATE)
				.setResultTransformer(Transformers.aliasToBean(BpCustMember.class))
				.setParameter(0, map.get("offlineCustType"))
				.setFirstResult(Integer.valueOf(map.get("start")))
				.setMaxResults(Integer.valueOf(map.get("limit"))).list();
		
	}

	@Override
	public Long listAccountNumber(Map<String, String> map) {
		String sql = " SELECT " + 
				" count(*) " + 
				" FROM " + 
				" bp_cust_member bm " + 
				" LEFT JOIN bp_cust_relation  br on bm.id = br.p2pCustId " + 
				" WHERE " + 
				" br.offlineCustType = ? ";
		
		Object uniqueResult = this.getSession().createSQLQuery(sql)
							  .setParameter(0, map.get("offlineCustType"))
							  .uniqueResult();
		return  ((BigInteger)uniqueResult).longValue();
		
	}
	
	@Override
	public BpCustMember isExist(String loginname) {
		BpCustMember bpCustMember=null;
		StringBuffer hql = new StringBuffer(" from BpCustMember ");
		hql.append(" where (isDelete!=1 or isDelete is null) and (isForbidden!=1 or isForbidden is null)  and loginname= '").append(loginname).append("'");
		List<BpCustMember> list = findByHql(hql.toString());
		if(list.size()>0){
			bpCustMember=list.get(0);
		}
		return bpCustMember;
	}

	@Override
	public void executeSql(String sql) {
		this.jdbcTemplate.update(sql);
	}

	@Override
	public BpCustMember getPlainpassword(String recommandPerson) {
		String hql = "from BpCustMember where plainpassword='"+recommandPerson+"'";
		System.out.println("dao类中的hql值===="+hql);
		List<BpCustMember> list = findByHql(hql);
		BpCustMember member=null;
		if(null !=list && !list.isEmpty()){
			member=list.get(0);
		}
		return member;
	}

	@Override
	public List<BpCustMember> getByTrueName(String trueName) {
		// TODO Auto-generated method stub
        String hql = "from BpCustMember where truename  like '%"+trueName+"%' ";
		return this.getSession().createQuery(hql).list();
	}

}