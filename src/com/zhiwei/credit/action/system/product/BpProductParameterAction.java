package com.zhiwei.credit.action.system.product;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.compass.core.util.reader.StringReader;

import com.credit.proj.entity.ProcreditMortgage;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.sdicons.json.mapper.JSONMapper;
import com.sdicons.json.parser.JSONParser;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.util.ContextUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.core.creditUtils.JsonUtil;
import com.zhiwei.credit.model.creditFlow.contract.DocumentTemplet;
import com.zhiwei.credit.model.creditFlow.contract.VProcreditContract;
import com.zhiwei.credit.model.creditFlow.finance.SlPlansToCharge;
import com.zhiwei.credit.model.entityhbm.CashDeposit;
import com.zhiwei.credit.model.entityhbm.CashDetail;
import com.zhiwei.credit.model.system.AppRole;
import com.zhiwei.credit.model.system.AppUser;
import com.zhiwei.credit.model.system.product.BpProductParameter;
import com.zhiwei.credit.service.creditFlow.assuretenet.OurProcreditAssuretenetService;
import com.zhiwei.credit.service.creditFlow.contract.DocumentTempletService;
import com.zhiwei.credit.service.creditFlow.finance.SlPlansToChargeService;
import com.zhiwei.credit.service.creditFlow.materials.OurProcreditMaterialsEnterpriseService;
import com.zhiwei.credit.service.entityhbm.CashDepositService;
import com.zhiwei.credit.service.entityhbm.CashDetailService;
import com.zhiwei.credit.service.system.product.BpProductParameterService;

/**
 * s
 * @author 
 *
 */
public class BpProductParameterAction extends BaseAction{
	@Resource
	private CashDepositService cashetService;
	private  CashDeposit  cashDeposit;
	@Resource
	private CashDetailService cashdetailService;
	private CashDetail cashDetail;
	public CashDetail getCashDetail() {
		return cashDetail;
	}

	public void setCashDetail(CashDetail cashDetail) {
		this.cashDetail = cashDetail;
	}
	@Resource
	private DocumentTempletService documentTempletService;
	@Resource
	private BpProductParameterService bpProductParameterService;
	@Resource
	private OurProcreditMaterialsEnterpriseService ourProcreditMaterialsEnterpriseService;
	@Resource
	private OurProcreditAssuretenetService ourProcreditAssuretenetService;
	@Resource
	private SlPlansToChargeService slplansToChargeService;
	private BpProductParameter bpProductParameter;
	
	private String productNumber;//产品编号
	
	private long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public CashDeposit getCashDeposit() {
		return cashDeposit;
	}

	public void setCashDeposit(CashDeposit cashDeposit) {
		this.cashDeposit = cashDeposit;
	}
	public BpProductParameter getBpProductParameter() {
		return bpProductParameter;
	}

	public void setBpProductParameter(BpProductParameter bpProductParameter) {
		this.bpProductParameter = bpProductParameter;
	}
	public String findProductNumber(){
		if(productNumber!=null&&!"".equals(productNumber)){
			Boolean state=bpProductParameterService.findProductNumber(productNumber);
			jsonString="{success:true,state:"+state+"}";
		}
		return SUCCESS;
	}
	/**
	 * 保存保证金
	 * @return
	 */
	public String saveCashDeposit(){
		cashetService.saveCashDeposit(cashDeposit);
		return SUCCESS;
	}
	
	public  String saveCashdetail(){
		cashdetailService.save(cashDetail);
		return SUCCESS;
	}
	/**
	 * 查询保证金
	 */
	public String selectCashDeposit(){
		List<CashDeposit> selectList=cashetService.selectAll();
		return SUCCESS;
	}
	/***
	 * 合同保存方法
	 * @return
	 */
	public String saveContract(){
		String contractId=this.getRequest().getParameter("contractId");
		String productId=this.getRequest().getParameter("productId");
		if(productId!=null&&!"".equals(productId)&&!"undefined".equals(productId)){
			BpProductParameter product=bpProductParameterService.get(Long.valueOf(productId));
			if(product!=null){
				if(contractId!=null&&!"".equals(contractId)&&!"undefined".equals(contractId)){
					if(product.getContractId()!=null&&!"".equals(product.getContractId())){
						String conId=product.getContractId();
						conId=conId+","+contractId;
						product.setContractId(conId);
					}else{
						product.setContractId(contractId);
					}
				}
				bpProductParameterService.merge(product);
			}
		}
		return SUCCESS;
	}
	/***
	 * 合同列表获取方法
	 * @return
	 */
	public String getContract(){
		try {
			String productId=this.getRequest().getParameter("productId");
			if(productId!=null&&!"".equals(productId)&&!"undefined".equals(productId)){
				BpProductParameter product=bpProductParameterService.get(Long.valueOf(productId));
				if(product!=null){
					String conId=product.getContractId();
					if(conId!=null){
						List<VProcreditContract> li=new ArrayList<VProcreditContract>();
						String cons[]=conId.split(",");
						for (int i=0;i<cons.length;i++) {
							if(!"".equals(cons[i])){
								VProcreditContract vProcreditContract=new VProcreditContract();
								vProcreditContract.setId(i);
								DocumentTemplet contract=documentTempletService.getById(Integer.valueOf(cons[i]));
								if(contract!=null){
									DocumentTemplet parent=documentTempletService.getById(Integer.valueOf(contract.getParentid()));
									if(parent!=null){
										vProcreditContract.setContractCategoryText(contract.getText());
										vProcreditContract.setContractCategoryTypeText(parent.getText());
										vProcreditContract.setTemplateId(Integer.valueOf(cons[i]));
										li.add(vProcreditContract);
									}
								}
							}
						}
						JsonUtil.jsonFromList(li);
					}
				}
			}
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/***
	 * 合同列表获取方法
	 * @return
	 */			  
	public String deleteContract(){
		try {
			String productId=this.getRequest().getParameter("productId");
			String contractId=this.getRequest().getParameter("contractId");
			List<String> list=new ArrayList<String>();
			String conID="";
			if(productId!=null&&!"".equals(productId)&&!"undefined".equals(productId)){
				BpProductParameter product=bpProductParameterService.get(Long.valueOf(productId));
				if(product!=null){
					String conId=product.getContractId();
					if(conId!=null){
						String cons[]=conId.split(",");
						String[] pc=contractId.split(",");
						for (int i=0;i<cons.length;i++) {
							boolean flag=true;
							for(int j=0;j<pc.length;j++){
								if(cons[i].equals(pc[j])){
									flag=false;
									break;
								}
							}
							if(flag){
								conID+=cons[i]+",";
							}
 						}
						if(!"".equals(conID)){
							conID=conID.substring(0,conID.length()-1);
						}
						product.setContractId(conID);
						bpProductParameterService.save(product);
					}
				}
			}
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 显示列表
	 */
	public String list(){
		QueryFilter filter=new QueryFilter(getRequest());
		List<BpProductParameter> list= bpProductParameterService.getAll(filter);
		Type type=new TypeToken<List<BpProductParameter>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(list.size()).append(",result:");
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list2(){
		AppUser user= ContextUtil.getCurrentUser();
		Set<AppRole> rolers=user.getRoles();
		Set<Object> roleIds=new HashSet<Object>();
		Iterator iter=rolers.iterator();
//		while(iter.hasNext()){  产品类型不做门店区分
//			AppRole role=(AppRole) iter.next();
//			if(role!=null&&role.getRoleId()!=-1){
//				roleIds.add(role.getRoleId());
//			}
//		}
		List<BpProductParameter> list= bpProductParameterService.getAllByRolers(roleIds,this.getRequest());
		Type type=new TypeToken<List<BpProductParameter>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(list.size()).append(",result:");
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				ourProcreditMaterialsEnterpriseService.deleteByProductId(id);
				ourProcreditAssuretenetService.deleteByProductId(id);
				bpProductParameterService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		BpProductParameter bpProductParameter=bpProductParameterService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("bpProductParameter", bpProductParameter);
		//将数据转成JSON格式
		doJson(map);
		return SUCCESS;
	}
	
	public String getByProductId(){
		String productId=this.getRequest().getParameter("productId");
		String type=this.getRequest().getParameter("type");
		List<ProcreditMortgage> list= bpProductParameterService.getByProductId(productId,type);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':");
		if(null!=list){
			buff.append(list.size()).append(",result:");
		}else{
			buff.append(0).append(",result:");
		}
		Gson gson=new Gson();
		buff.append(gson.toJson(list));
		buff.append("}");
		jsonString=buff.toString();
		return SUCCESS;
    }
	
	public  String  businessType;
	
	
	public String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}

	/**
	 * 添加及保存操作
	 */
	public String save(){
		try{
			/*String materialsJsonData=this.getRequest().getParameter("materialsJsonData");
			String assuretenetJsonData=this.getRequest().getParameter("assuretenetJsonData");
			String mortgageJsonData=this.getRequest().getParameter("mortgageJsonData");
			String slActualToChargeJsonData=this.getRequest().getParameter("slActualToChargeJsonData");
			List<OurProcreditMaterialsEnterprise> listMaterials = new ArrayList<OurProcreditMaterialsEnterprise>(); // 材料清单
			List<OurProcreditAssuretenet> listAssuretenet = new ArrayList<OurProcreditAssuretenet>(); // 准入原则
			List<ProcreditMortgage> listMortgage = new ArrayList<ProcreditMortgage>(); // 保证、抵质押物担保
			List<SlActualToCharge> listActualToCharge = new ArrayList<SlActualToCharge>(); // 手续费用
			if (null != materialsJsonData && !"".equals(materialsJsonData)) {
				String[] materialsArr = materialsJsonData.split("@");
				for (int i = 0; i < materialsArr.length; i++) {
					String str = materialsArr[i];
					JSONParser parser = new JSONParser(new StringReader(str));
					OurProcreditMaterialsEnterprise ourProcreditMaterials = (OurProcreditMaterialsEnterprise) JSONMapper.toJava(parser.nextValue(),OurProcreditMaterialsEnterprise.class);
					listMaterials.add(ourProcreditMaterials);
				}
			}
			if (null != assuretenetJsonData && !"".equals(assuretenetJsonData)) {
				String[] assuretenetsArr = assuretenetJsonData.split("@");
				for (int i = 0; i < assuretenetsArr.length; i++) {
					String str = assuretenetsArr[i];
					JSONParser parser = new JSONParser(new StringReader(str));
					OurProcreditAssuretenet ourProcreditAssuretenet = (OurProcreditAssuretenet) JSONMapper.toJava(parser.nextValue(),OurProcreditAssuretenet.class);
					listAssuretenet.add(ourProcreditAssuretenet);
				}
			}
			if (null != mortgageJsonData && !"".equals(mortgageJsonData)) {
				String[] dZYMortgagesArr = mortgageJsonData.split("@");
				for (int i = 0; i < dZYMortgagesArr.length; i++) {
					String str = dZYMortgagesArr[i];
					JSONParser parser = new JSONParser(new StringReader(str));
					ProcreditMortgage procreditMortgage = (ProcreditMortgage) JSONMapper.toJava(parser.nextValue(),ProcreditMortgage.class);
					listMortgage.add(procreditMortgage);
				}
			}
			if (null != bzMortgageJsonData && !"".equals(bzMortgageJsonData)) {
				String[] bzMortgagesArr = bzMortgageJsonData.split("@");
				for (int i = 0; i < bzMortgagesArr.length; i++) {
					String str = bzMortgagesArr[i];
					JSONParser parser = new JSONParser(new StringReader(str));
					ProcreditMortgage procreditMortgage = (ProcreditMortgage) JSONMapper.toJava(parser.nextValue(),ProcreditMortgage.class);
					listMortgage.add(procreditMortgage);
				}
			}
			if (null != slActualToChargeJsonData && !"".equals(slActualToChargeJsonData)) {
				String[] slActualToChargeArr = slActualToChargeJsonData.split("@");
				for (int i = 0; i < slActualToChargeArr.length; i++) {
					String str = slActualToChargeArr[i];
					JSONParser parser = new JSONParser(new StringReader(str));
					SlActualToCharge slActualToCharge = (SlActualToCharge) JSONMapper.toJava(parser.nextValue(),SlActualToCharge.class);
					listActualToCharge.add(slActualToCharge);
				}
			}*/
			List<SlPlansToCharge> PlansToCharge = new ArrayList<SlPlansToCharge>(); // 手续费用
			String SlPlansToChargeDates=this.getRequest().getParameter("SlPlansToChargeDates");
			if (null != SlPlansToChargeDates && !"".equals(SlPlansToChargeDates)) {
				String[] SlPlansToChargeArr = SlPlansToChargeDates.split("@");
				for (int i = 0; i < SlPlansToChargeArr.length; i++) {
					String str = SlPlansToChargeArr[i];
					JSONParser parser = new JSONParser(new StringReader(str));
					SlPlansToCharge slActualToCharge = (SlPlansToCharge) JSONMapper.toJava(parser.nextValue(),SlPlansToCharge.class);
					PlansToCharge.add(slActualToCharge);
				}
			}
			if(null !=PlansToCharge && PlansToCharge.size()>0){
				for(int i=0;i<PlansToCharge.size();i++){
					SlPlansToCharge Charge=PlansToCharge.get(i);
					SlPlansToCharge oldChrge=null;
					if(null !=Charge.getPlansTochargeId() && !"".equals(Charge.getPlansTochargeId())){
						oldChrge=slplansToChargeService.get(Charge.getPlansTochargeId());
					}
					BeanUtil.copyNotNullProperties(oldChrge,Charge);
					slplansToChargeService.merge(oldChrge);
				}
			}
			String rolerName=this.getRequest().getParameter("bpProductParameter.rolerName");
			String rolerId=this.getRequest().getParameter("bpProductParameter.roleId");
			
			if(businessType!=null  &&!"".equals(businessType)){
				bpProductParameter.setBusinessType(businessType);
			}
			bpProductParameter.setRolerName(rolerName);
			bpProductParameter.setRolerId(rolerId);
			Integer flag =bpProductParameterService.saveOrUpdate(bpProductParameter,null,null,null,null);
			if(1==flag){
				setJsonString("{success:true}");
			}else{
				setJsonString("{success:false}");
			}
		}catch(Exception e){
			e.printStackTrace();
			setJsonString("{success:false}");
		}
		return SUCCESS;
	}

	public void setProductNumber(String productNumber) {
		this.productNumber = productNumber;
	}

	public String getProductNumber() {
		return productNumber;
	}
}
