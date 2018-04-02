package com.zhiwei.credit.service.system.product.impl;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.axis2.jaxws.context.utils.ContextUtils;

import com.credit.proj.entity.ProcreditMortgage;
import com.loanTrial.util.DateUtil;
import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.credit.core.commons.CreditBaseDao;
import com.zhiwei.credit.dao.creditFlow.assuretenet.OurProcreditAssuretenetDao;
import com.zhiwei.credit.dao.creditFlow.finance.SlActualToChargeDao;
import com.zhiwei.credit.dao.creditFlow.materials.OurProcreditMaterialsEnterpriseDao;
import com.zhiwei.credit.dao.system.product.BpProductParameterDao;
import com.zhiwei.credit.model.creditFlow.assuretenet.OurProcreditAssuretenet;
import com.zhiwei.credit.model.creditFlow.finance.SlActualToCharge;
import com.zhiwei.credit.model.creditFlow.materials.OurProcreditMaterialsEnterprise;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;
import com.zhiwei.credit.model.system.product.BpProductParameter;
import com.zhiwei.credit.service.system.product.BpProductParameterService;
import com.webServices.mortgage.ProcreditMortgageService;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class BpProductParameterServiceImpl extends BaseServiceImpl<BpProductParameter> implements BpProductParameterService{
	private BpProductParameterDao dao;
	@Resource
	private OurProcreditMaterialsEnterpriseDao ourProcreditMaterialsEnterpriseDao;
	@Resource
	private OurProcreditAssuretenetDao ourProcreditAssuretenetDao;
	@Resource
	private ProcreditMortgageService procreditMortgageService;
	@Resource
	private SlActualToChargeDao slActualToChargeDao;
	@Resource
	private CreditBaseDao creditBaseDao;
	
	public BpProductParameterServiceImpl(BpProductParameterDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Integer saveOrUpdate(BpProductParameter bpProductParameter,List<OurProcreditMaterialsEnterprise> listMaterials,
					List<OurProcreditAssuretenet> listAssuretenet,List<ProcreditMortgage> listMortgage,List<SlActualToCharge> listActualToCharge) {
		try{
			if(bpProductParameter.getId()==null){
				bpProductParameter.setCreateTime(new Date());
				dao.save(bpProductParameter);
			}else{
				BpProductParameter orgBpProductParameter=dao.get(bpProductParameter.getId());
				BeanUtil.copyNotNullProperties(orgBpProductParameter, bpProductParameter);
				orgBpProductParameter.setCreateTime(new Date());
				dao.merge(orgBpProductParameter);
			}
			if(null!=listMaterials && listMaterials.size()>0){
				for(int i=0;i<listMaterials.size();i++){
					OurProcreditMaterialsEnterprise materials=listMaterials.get(i);
					materials.setProductId(bpProductParameter.getId());
					if(materials.getMaterialsId()!=null){
						OurProcreditMaterialsEnterprise  old=ourProcreditMaterialsEnterpriseDao.get(materials.getMaterialsId());
						BeanUtil.copyNotNullProperties(old, materials);
						ourProcreditMaterialsEnterpriseDao.save(old);
					}else{
						if(materials.getProjectId()!=null){
							OurProcreditMaterialsEnterprise o =ourProcreditMaterialsEnterpriseDao.get(materials.getProjectId());
							if(o!=null){
								materials.setLeaf(o.getLeaf());
								materials.setParentId(o.getParentId());
								materials.setOperationTypeKey(o.getOperationTypeKey());
							}
						}else if(materials.getProjectId()==null&&materials.getParentId()!=null){
							OurProcreditMaterialsEnterprise o =ourProcreditMaterialsEnterpriseDao.get(Long.valueOf(materials.getParentId().toString()));
							if(o!=null){
								materials.setLeaf(1);
								materials.setOperationTypeKey(o.getOperationTypeKey());
							}
						}
						ourProcreditMaterialsEnterpriseDao.save(materials);
					}
				}
			}
			if(null!=listAssuretenet && listAssuretenet.size()>0){
				for(int i=0;i<listAssuretenet.size();i++){
					OurProcreditAssuretenet assuretenets=listAssuretenet.get(i);
					assuretenets.setProductId(bpProductParameter.getId());
					ourProcreditAssuretenetDao.save(assuretenets);
				}
			}
			if(null!=listMortgage && listMortgage.size()>0){
				for(int i=0;i<listMortgage.size();i++){
					ProcreditMortgage mortgages=listMortgage.get(i);
					mortgages.setProductId(bpProductParameter.getId());
					procreditMortgageService.save(mortgages);
				}
			}
			if(null!=listActualToCharge && listActualToCharge.size()>0){
				for(int i=0;i<listActualToCharge.size();i++){
					SlActualToCharge slActualToCharge=listActualToCharge.get(i);
					slActualToCharge.setProductId(bpProductParameter.getId());
					slActualToChargeDao.save(slActualToCharge);
				}
			}
		}catch(Exception e){
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public List<ProcreditMortgage> getByProductId(String productId,String type) {
		try {
			String hql="from ProcreditMortgage e where 1=1 ";
			if(null!=productId && !"".equals(productId) && !"null".equals(productId)){
				hql+=" and e.productId="+productId;
				if(null!=type && !"".equals(type) && !"null".equals(type)){
					hql+=" and e.assuretypeid="+type;
				}
				return  creditBaseDao.queryHql(hql);
			}else{
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Boolean findProductNumber(String productNumber) {
		
		return dao.findProductNumber(productNumber);
	}

	@Override
	public List<BpProductParameter> getAllByRolers(Set<Object> roleIds,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return dao.getAllByRolers(roleIds,request);
	}
	/**
	 * 
	 * @param p 产品配置表信息
	 * @param project 项目表信息
	 */
	@Override
	public void initSmallloanProject(BpProductParameter bpProductParameter,SlSmallloanProject project){
		//逾期收取方式
		project.setOverdueReceiveWay(bpProductParameter.getOverdueReceiveWay());
		//逾期利率
		project.setOverdueRateLoan(bpProductParameter.getOverdueRateLoan());
		//罚息收取方式
		project.setPenaltyReceiveWay(bpProductParameter.getPenaltyReceiveWay());
		//罚息利率
		project.setPenaltyReceiveRate(bpProductParameter.getPenaltyReceiveRate());
		//提前还款利息收取方式
		project.setPrepayMoney(bpProductParameter.getPrepayMoney());
		//违约金利率
		project.setPrepayMoneyRate(bpProductParameter.getPrepayMoneyRate());
		//提前还款利息收取方式
		project.setPrepayRateTypeA(bpProductParameter.getPrepayRateTypeA());
		project.setPrepayRateTypeB(bpProductParameter.getPrepayRateTypeB());
		//保证金释放方式
		project.setDepositsReleaseWay(bpProductParameter.getDepositsReleaseWay());
		//授信释放方式
		project.setCreditfreedType(bpProductParameter.getCreditfreedType());
		//主担保方式id
		project.setAssuretypeid(bpProductParameter.getAssuretypeid());
		//计息方式 0:按实际天数算,1:按30天算
		project.setIsActualDay(bpProductParameter.getIsActualDay());
		
		
		project.setMineType(bpProductParameter.getMineType());
		project.setMineId(bpProductParameter.getMineId());
		
		
		StringBuffer message = new StringBuffer();
		BigDecimal lin = new BigDecimal("0");
		//项目类型
		if(bpProductParameter.getBusinessType()!=null){
			project.setBusinessType(bpProductParameter.getBusinessType());
		}
		//固定日或按实际放款日还款
		if(bpProductParameter.getIsStartDatePay()!=null&&!"".equals(bpProductParameter.getIsStartDatePay())){
			project.setIsStartDatePay(bpProductParameter.getIsStartDatePay());
			//固定日
			if(bpProductParameter.getPayintentPerioDate()!=null&&!"".equals(bpProductParameter.getPayintentPerioDate())){
				project.setPayintentPerioDate(bpProductParameter.getPayintentPerioDate());
			}else{
				if(project.getIsStartDatePay().equals("1")){
					message.append("固定日、");
				}
			}
		}else{
			message.append("还款日、");
		}
		//算头不算尾或算头又算尾
		if(bpProductParameter.getHeadTailModel()!=null&&!"".equals(bpProductParameter.getHeadTailModel())){
			project.setHeadTailModel(bpProductParameter.getHeadTailModel());
		}else{
			project.setHeadTailModel(0);
		}
		Integer yearModel = bpProductParameter.getYearModel();//年模型
		if(yearModel==null||"".equals(yearModel)){
			yearModel = 365;
		}
		project.setYearModel(yearModel);
		Integer monthModel = bpProductParameter.getMonthModel();//月模型 1 按月化利率直接计算,2 按日化利率乘以实际天数计算,3 按日化利率乘以固定30天计算
		if(monthModel==null||"".equals(monthModel)){
			monthModel = 1;
		}
		project.setMonthModel(monthModel);
		//还款方式
		if(bpProductParameter.getAccrualtype()!=null&&!"".equals(bpProductParameter.getAccrualtype())){
			project.setAccrualtype(project.getAccrualtype());
		}else{
			message.append("还款方式、");
		}
		//还款周期
		if(bpProductParameter.getPayaccrualType()!=null&&!"".equals(bpProductParameter.getPayaccrualType())){
			project.setPayaccrualType(bpProductParameter.getPayaccrualType());
			//自定义周期天数
			if(bpProductParameter.getDayOfEveryPeriod()!=null&&!"".equals(bpProductParameter.getDayOfEveryPeriod())){
				project.setDayOfEveryPeriod(bpProductParameter.getDayOfEveryPeriod());
			}else{
				if(project.getPayaccrualType().equals("owerPay")){
					message.append("还款周期、");
				}
			}
		}else{
			message.append("还款周期、");
		}
		//是否一次性支付全部利息
		if(bpProductParameter.getIsInterestByOneTime()!=null&&!"".equals(bpProductParameter.getIsInterestByOneTime())){
			project.setIsInterestByOneTime(bpProductParameter.getIsInterestByOneTime());
		}
		//是否一次性付本
		if(bpProductParameter.getIsPrincipalByOneTime()!=null&&!"".equals(bpProductParameter.getIsPrincipalByOneTime())){
			project.setIsPrincipalByOneTime(bpProductParameter.getIsPrincipalByOneTime());
		}
		//是否前置付息0否 1 是
		if(bpProductParameter.getIsPreposePayAccrual()!=null&&!"".equals(bpProductParameter.getIsPreposePayAccrual())){
			project.setIsPreposePayAccrual(bpProductParameter.getIsPreposePayAccrual());
		}
		int betweenDay = 0;
		//利息年化利率
		BigDecimal yearAccrualRate = bpProductParameter.getYearAccrualRate();
		BigDecimal fixedAccrualRate = bpProductParameter.getFixedAccrualRate();//固定金额
		if((yearAccrualRate!=null&&!"".equals(yearAccrualRate))||(fixedAccrualRate!=null&&!"".equals(fixedAccrualRate))){
			if(fixedAccrualRate!=null&&!"".equals(fixedAccrualRate)
					&&fixedAccrualRate.compareTo(lin)>0){
				project.setFixedAccrualRate(fixedAccrualRate);
			}else{
				project.setYearAccrualRate(yearAccrualRate);
				//换算月利率和日利率
				BigDecimal monthAccrualRate = lin;
				monthAccrualRate = yearAccrualRate.divide(new BigDecimal("12"),20, BigDecimal.ROUND_HALF_UP).setScale(4, BigDecimal.ROUND_HALF_EVEN);
				project.setAccrual(monthAccrualRate);
				BigDecimal dayAccrualRate = lin;
				dayAccrualRate = yearAccrualRate.divide(new BigDecimal(yearModel),20, BigDecimal.ROUND_HALF_UP).setScale(4, BigDecimal.ROUND_HALF_EVEN);
				project.setDayAccrualRate(dayAccrualRate);
				BigDecimal sumAccrualRate = lin;
				sumAccrualRate = dayAccrualRate.multiply(new BigDecimal(betweenDay)).setScale(2, BigDecimal.ROUND_HALF_EVEN);
				project.setSumAccrualRate(sumAccrualRate);
			}
		}else{
			project.setYearAccrualRate(lin);
			project.setAccrual(lin);
			project.setDayAccrualRate(lin);
			project.setSumAccrualRate(lin);
		}
		//管理咨询年化利率
		BigDecimal yearManagementConsultingOfRate = bpProductParameter.getYearManagementConsultingOfRate();
		BigDecimal fixedManagementConsultingOfRate = bpProductParameter.getFixedManagementConsultingOfRate();//固定金额
		if((yearManagementConsultingOfRate!=null&&!"".equals(yearManagementConsultingOfRate))
				||(fixedManagementConsultingOfRate!=null&&!"".equals(fixedManagementConsultingOfRate))){
			if(fixedManagementConsultingOfRate!=null&&!"".equals(fixedManagementConsultingOfRate)
					&&fixedManagementConsultingOfRate.compareTo(lin)>0){
				project.setFixedManagementConsultingOfRate(fixedManagementConsultingOfRate);
			}else{
				project.setYearManagementConsultingOfRate(yearManagementConsultingOfRate);
				//换算月利率和日利率
				BigDecimal monthManagementConsultingOfRate = lin;
				monthManagementConsultingOfRate = yearManagementConsultingOfRate.divide(new BigDecimal("12"),20, BigDecimal.ROUND_HALF_UP).setScale(4, BigDecimal.ROUND_HALF_EVEN);
				project.setManagementConsultingOfRate(monthManagementConsultingOfRate);
				BigDecimal dayManagementConsultingOfRate = lin;
				dayManagementConsultingOfRate = yearManagementConsultingOfRate.divide(new BigDecimal(yearModel),20, BigDecimal.ROUND_HALF_UP).setScale(4, BigDecimal.ROUND_HALF_EVEN);
				project.setDayManagementConsultingOfRate(dayManagementConsultingOfRate);
				BigDecimal sumManagementConsultingOfRate = lin;
				sumManagementConsultingOfRate = dayManagementConsultingOfRate.multiply(new BigDecimal(betweenDay)).setScale(2, BigDecimal.ROUND_HALF_EVEN);
				project.setSumManagementConsultingOfRate(sumManagementConsultingOfRate);
			}
		}else{
			project.setYearManagementConsultingOfRate(lin);
			project.setManagementConsultingOfRate(lin);
			project.setDayManagementConsultingOfRate(lin);
			project.setSumManagementConsultingOfRate(lin);
		}
		//服务费年化利率
		BigDecimal yearFinanceServiceOfRate = bpProductParameter.getYearFinanceServiceOfRate();
		BigDecimal fixedFinanceServiceOfRate = bpProductParameter.getFixedFinanceServiceOfRate();//固定金额
		if((yearFinanceServiceOfRate!=null&&!"".equals(yearFinanceServiceOfRate))
				||(fixedFinanceServiceOfRate!=null&&!"".equals(fixedFinanceServiceOfRate))){
			if(fixedFinanceServiceOfRate!=null&&!"".equals(fixedFinanceServiceOfRate)
					&&fixedFinanceServiceOfRate.compareTo(lin)>0){
				project.setFixedFinanceServiceOfRate(fixedFinanceServiceOfRate);
			}else{
				project.setYearFinanceServiceOfRate(yearFinanceServiceOfRate);
				//换算月利率和日利率
				BigDecimal monthFinanceServiceOfRate = lin;
				monthFinanceServiceOfRate = yearFinanceServiceOfRate.divide(new BigDecimal("12"),20, BigDecimal.ROUND_HALF_UP).setScale(4, BigDecimal.ROUND_HALF_EVEN);
				project.setFinanceServiceOfRate(monthFinanceServiceOfRate);
				BigDecimal dayFinanceServiceOfRate = lin;
				dayFinanceServiceOfRate = yearFinanceServiceOfRate.divide(new BigDecimal(yearModel),20, BigDecimal.ROUND_HALF_UP).setScale(4, BigDecimal.ROUND_HALF_EVEN);
				project.setDayFinanceServiceOfRate(dayFinanceServiceOfRate);
				BigDecimal sumFinanceServiceOfRate = lin;
				sumFinanceServiceOfRate = dayFinanceServiceOfRate.multiply(new BigDecimal(betweenDay)).setScale(2, BigDecimal.ROUND_HALF_EVEN);
				project.setSumFinanceServiceOfRate(sumFinanceServiceOfRate);
			}
		}else{
			project.setYearFinanceServiceOfRate(lin);
			project.setFinanceServiceOfRate(lin);
			project.setDayFinanceServiceOfRate(lin);
		}
		
		//手续费费年化利率
		BigDecimal serviceChargeOfRate = bpProductParameter.getServiceChargeOfRate();
		if(serviceChargeOfRate!=null&&!"".equals(serviceChargeOfRate)){
			project.setServiceChargeOfRate(serviceChargeOfRate);
		}else{
			project.setServiceChargeOfRate(lin);
		}
		
		//贷款期数
		if(bpProductParameter.getPayintentPeriod()!=null&&!"".equals(bpProductParameter.getPayintentPeriod())){
			project.setPayintentPeriod(bpProductParameter.getPayintentPeriod());
		}else{
			message.append("贷款期数、");
		}
	}

}