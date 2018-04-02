package com.credit.proj.mortgage.morservice.service.impl;

 
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.credit.proj.entity.CsCarHanderMessage;
import com.credit.proj.entity.ProcreditMortgage;
import com.credit.proj.entity.ProcreditMortgageIndustry;
import com.credit.proj.mortgage.industry.service.IndustryService;
import com.credit.proj.mortgage.morservice.service.CsCarHanderMessageService;
import com.credit.proj.mortgage.morservice.service.MortgageService;
import com.credit.proj.mortgage.vehicle.service.VehicleService;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.credit.core.commons.CreditBaseDao;
import com.zhiwei.credit.core.creditUtils.JsonUtil;
import com.zhiwei.credit.dao.creditFlow.pawn.pawnItems.PawnItemsListDao;
import com.zhiwei.credit.model.creditFlow.pawn.pawnItems.PawnItemsList;
import com.zhiwei.credit.service.creditFlow.materials.SlProcreditMaterialsService;

@SuppressWarnings("all")
public class CsCarHanderMessageServiceImpl implements  CsCarHanderMessageService{

	//private final Log log = LogFactory.getLog(getClass());
	private static final Log logger=LogFactory.getLog(CsCarHanderMessageServiceImpl.class);
	private CreditBaseDao creditBaseDao ;
	
	public Boolean addCsCarHanderMessage(CsCarHanderMessage csCarHanderMessage){
		
		Boolean  flag = false;
		try {
			   flag = creditBaseDao.saveDatas(csCarHanderMessage);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return flag;
	}
	
	public CreditBaseDao getCreditBaseDao() {
		return creditBaseDao;
	}
	public void setCreditBaseDao(CreditBaseDao creditBaseDao) {
		this.creditBaseDao = creditBaseDao;
	}

	 
	 
}
