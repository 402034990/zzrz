package com.zhiwei.credit.dao.creditFlow.common.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Hibernate;
import org.hibernate.transform.Transformers;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.dao.creditFlow.common.BpDicAccountTitleSetIndexDao;
import com.zhiwei.credit.model.creditFlow.common.BpDicAccountTitleSetIndex;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class BpDicAccountTitleSetIndexDaoImpl extends BaseDaoImpl<BpDicAccountTitleSetIndex> implements BpDicAccountTitleSetIndexDao{

	public BpDicAccountTitleSetIndexDaoImpl() {
		super(BpDicAccountTitleSetIndex.class);
	}

	@Override
	public List<BpDicAccountTitleSetIndex> listByType(String listType) {
		// TODO Auto-generated method stub
		String hql=" from BpDicAccountTitleSetIndex b where b.listType=? ";
		return (List<BpDicAccountTitleSetIndex>) this.getSession().createQuery(hql).setParameter(0, listType).list();
	}

	@Override
	public void findIndexProjectList(
			PageBean<BpDicAccountTitleSetIndex> pageBean) {
		// TODO Auto-generated method stub
		HttpServletRequest request = pageBean.getRequest();
		String listName=request.getParameter("listName");
		StringBuffer sb=new StringBuffer(" SELECT" +
				" d.id," +
				" d.listName," +
				" d.listType," +
				" d.remark," +
				" (SELECT COUNT(*) FROM bp_dic_account_title_set s WHERE s.listId = d.id ) AS listCount" +
				" FROM" +
				" bp_dic_account_title_set_index d" +
				" WHERE 1=1" 
				);
		StringBuffer totalCounts = new StringBuffer ("select count(*) from ( ");
		if(null!=listName && !"".equals(listName)){
			sb.append(" and d.listName like '%"+listName+"%'");
		}
		totalCounts.append(sb).append(") as b");
	//	System.out.println("-->>"+sb.toString());
		List list = this.getSession().createSQLQuery(sb.toString())
		.addScalar("id",Hibernate.LONG)
		.addScalar("listName", Hibernate.STRING)
		.addScalar("listType", Hibernate.STRING)
		.addScalar("remark", Hibernate.STRING)
		.addScalar("listCount", Hibernate.INTEGER)
		.setResultTransformer(Transformers.aliasToBean(BpDicAccountTitleSetIndex.class)).setFirstResult(pageBean.getStart()).setMaxResults(pageBean.getLimit()).list();
		pageBean.setResult(list);
		BigInteger total =   (BigInteger) this.getSession().createSQLQuery(totalCounts.toString()).uniqueResult();
		pageBean.setTotalCounts(total.intValue());
		
		
	}

}