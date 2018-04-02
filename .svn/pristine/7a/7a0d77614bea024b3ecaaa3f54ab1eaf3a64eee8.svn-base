package com.zhiwei.credit.dao.system.product.impl;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.credit.dao.system.product.BpProductParameterDao;
import com.zhiwei.credit.model.system.product.BpProductParameter;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class BpProductParameterDaoImpl extends BaseDaoImpl<BpProductParameter> implements BpProductParameterDao{

	public BpProductParameterDaoImpl() {
		super(BpProductParameter.class);
	}

	@Override
	public Boolean findProductNumber(String productNumber) {
		String sql="SELECT COUNT(productNumber) FROM Bp_Product_Parameter GROUP BY productNumber having productNumber = ?";
		BigInteger count= (BigInteger) this.getSession().createSQLQuery(sql).setParameter(0, productNumber).uniqueResult();
		if(count!=null){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public List<BpProductParameter> getAllByRolers(Set<Object> roleIds,HttpServletRequest request) {
		Object[] strs=new Object[roleIds.size()];
		StringBuffer hql = new StringBuffer(
				"FROM BpProductParameter WHERE 1=1 ");
		Iterator<Object> iter=roleIds.iterator();
		for (int i = 0; i < roleIds.size(); i++) {
			if(i==0){
				hql.append(" AND rolerId like '%"+iter.next()+"%'");
			}else{
				hql.append(" OR rolerId like '%"+iter.next()+"%'");
			}
		}
		String  productName=request.getParameter("Q_productName_S_LK");
		if(productName!=null &&!"".equals(productName)){
			hql.append("   and productName like '%").append(productName).append("%'");
		}
		String  accrualtype=request.getParameter("Q_accrualtype_S_EQ");
		if(accrualtype!=null &&!"".equals(accrualtype)){
			hql.append("   and accrualtype like '% ").append(accrualtype).append("%'");
		}
		return this.getSession().createQuery(hql.toString()).list();
	}

}