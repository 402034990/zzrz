package com.zhiwei.credit.dao.creditFlow.customer.enterprise.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.transform.Transformers;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.credit.dao.creditFlow.customer.enterprise.BpDicAccountTitleDao;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpDicAccountTitle;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class BpDicAccountTitleDaoImpl extends BaseDaoImpl<BpDicAccountTitle> implements BpDicAccountTitleDao{

	public BpDicAccountTitleDaoImpl() {
		super(BpDicAccountTitle.class);
	}

	@Override
	public List<BpDicAccountTitle> listClassName() {
		// TODO Auto-generated method stub
		String sql="select * from bp_dic_account_title d GROUP BY d.titleClass ORDER BY d.keyName " ;
		List list = this.getSession().createSQLQuery(sql)
			.addScalar("id", Hibernate.LONG)
			.addScalar("keyName", Hibernate.STRING)
			.addScalar("titleClass", Hibernate.STRING)
			.addScalar("title", Hibernate.STRING)
			.addScalar("remark", Hibernate.STRING)
			.setResultTransformer(Transformers.aliasToBean(BpDicAccountTitle.class)).list();
          return list;
	}

	@Override
	public List<BpDicAccountTitle> listTitle(String className) {
		// TODO Auto-generated method stub
		String sql="select * from bp_dic_account_title d  where 1=1" ;
		if(null!=className && !"".equals(className)){
			
			sql=sql+" and d.titleClass like '%"+className+"%' ";
		}
		List list = this.getSession().createSQLQuery(sql)
			.addScalar("id", Hibernate.LONG)
			.addScalar("keyName", Hibernate.STRING)
			.addScalar("titleClass", Hibernate.STRING)
			.addScalar("title", Hibernate.STRING)
			.addScalar("remark", Hibernate.STRING)
			.setResultTransformer(Transformers.aliasToBean(BpDicAccountTitle.class)).list();
          return list;
	}

	@Override
	public BpDicAccountTitle findByKeyName(String keyName) {
		// TODO Auto-generated method stub
		String hql="from BpDicAccountTitle as sl where sl.keyName=? ";
		return (BpDicAccountTitle) getSession().createQuery(hql).setParameter(0, keyName).uniqueResult();
	}

}