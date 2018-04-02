package com.zhiwei.credit.service.system.product;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.credit.proj.entity.ProcreditMortgage;
import com.zhiwei.core.service.BaseService;
import com.zhiwei.credit.model.creditFlow.assuretenet.OurProcreditAssuretenet;
import com.zhiwei.credit.model.creditFlow.finance.SlActualToCharge;
import com.zhiwei.credit.model.creditFlow.materials.OurProcreditMaterialsEnterprise;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;
import com.zhiwei.credit.model.system.product.BpProductParameter;

/**
 * 
 * @author 
 *
 */
public interface BpProductParameterService extends BaseService<BpProductParameter>{

	public Integer saveOrUpdate(BpProductParameter bpProductParameter,List<OurProcreditMaterialsEnterprise> listMaterials,
						  List<OurProcreditAssuretenet> listAssuretenet, List<ProcreditMortgage> listMortgage,List<SlActualToCharge> listActualToCharge);

	public List<ProcreditMortgage> getByProductId(String productId,String type);
	/***
	 * 查询是否有重复的产品编号
	 * @param productNumber
	 * @return
	 */
	public Boolean findProductNumber(String productNumber);
	/***
	 * 通过角色获取产品
	 * @param roleIds
	 * @return
	 */
	public List<BpProductParameter> getAllByRolers(Set<Object> roleIds,HttpServletRequest request);
	/**
	 * 
	 * @param p 产品配置表信息
	 * @param project 项目表信息
	 */
	public void initSmallloanProject(BpProductParameter bpProductParameter,SlSmallloanProject project);
	
}


