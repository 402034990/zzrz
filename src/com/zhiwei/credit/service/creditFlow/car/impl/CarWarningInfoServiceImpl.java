package com.zhiwei.credit.service.creditFlow.car.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.credit.core.commons.CreditBaseDao;
import com.zhiwei.credit.dao.creditFlow.car.CarWarningInfoDao;
import com.zhiwei.credit.model.creditFlow.car.CarWarningInfo;
import com.zhiwei.credit.service.creditFlow.car.CarWarningInfoService;

/**
 * 
 * @author 
 *
 */
public class CarWarningInfoServiceImpl extends BaseServiceImpl<CarWarningInfo> implements CarWarningInfoService{
	@SuppressWarnings("unused")
	private CarWarningInfoDao dao;
	@Resource
	private CreditBaseDao creditBaseDao;
	public CarWarningInfoServiceImpl(CarWarningInfoDao dao) {
		super(dao);
		this.dao=dao;
	}
	public List<CarWarningInfo> getAllListByNumberAndImei(String carLicenseNumber,String imei){
		StringBuffer hql = new StringBuffer("from CarWarningInfo as cw where cw.awayLineStatus is not null  and cw.warningRelieveDate is null ");
		if(carLicenseNumber!=null&&!carLicenseNumber.equals("")){
			hql.append(" and cw.carLicenseNumber = '"+carLicenseNumber+"'");
		}
		if(imei!=null&&!imei.equals("")){
			hql.append(" and cw.deviceNumber = '"+imei+"'");
		}
		
		List<CarWarningInfo> list=new ArrayList<CarWarningInfo>();
		try {
			list =creditBaseDao.queryHql(hql.toString());
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
}