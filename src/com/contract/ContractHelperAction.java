package com.contract;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.CountDownLatch;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFHeader;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.struts2.ServletActionContext;

import com.credit.proj.entity.ProcreditMortgage;
import com.credit.proj.entity.ProcreditMortgageCar;
import com.credit.proj.mortgage.morservice.service.MortgageService;
import com.webServices.mortgage.ProcreditMortgageService;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.ContextUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.core.commons.CreditBaseDao;
import com.zhiwei.credit.core.creditUtils.DateUtil;
import com.zhiwei.credit.core.creditUtils.JsonUtil;
import com.zhiwei.credit.core.util.ElementUtil;
import com.zhiwei.credit.core.util.MoneyFormat;
import com.zhiwei.credit.model.admin.ContractElement;
import com.zhiwei.credit.model.creditFlow.common.CsBank;
import com.zhiwei.credit.model.creditFlow.contract.DocumentTemplet;
import com.zhiwei.credit.model.creditFlow.contract.Element;
import com.zhiwei.credit.model.creditFlow.contract.ProcreditContract;
import com.zhiwei.credit.model.creditFlow.customer.common.EnterpriseBank;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.Enterprise;
import com.zhiwei.credit.model.creditFlow.customer.person.Person;
import com.zhiwei.credit.model.creditFlow.customer.person.Spouse;
import com.zhiwei.credit.model.creditFlow.fileUploads.FileForm;
import com.zhiwei.credit.model.creditFlow.finance.BpFundIntent;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;
import com.zhiwei.credit.model.creditFlow.financeProject.FlFinancingProject;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidInfo;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidPlan;
import com.zhiwei.credit.model.creditFlow.fund.project.BpFundProject;
import com.zhiwei.credit.model.creditFlow.guarantee.project.GLGuaranteeloanProject;
import com.zhiwei.credit.model.creditFlow.leaseFinance.project.FlLeaseFinanceProject;
import com.zhiwei.credit.model.creditFlow.ourmain.SlCompanyMain;
import com.zhiwei.credit.model.creditFlow.ourmain.SlPersonMain;
import com.zhiwei.credit.model.creditFlow.pawn.project.PlPawnProject;
import com.zhiwei.credit.model.creditFlow.smallLoan.project.SlSmallloanProject;
import com.zhiwei.credit.model.creditFlow.smallLoan.supervise.SlSuperviseRecord;
import com.zhiwei.credit.model.customer.BpCustRelation;
import com.zhiwei.credit.model.customer.InvestPersonInfo;
import com.zhiwei.credit.model.p2p.BpCustMember;
import com.zhiwei.credit.model.system.FileAttach;
import com.zhiwei.credit.model.system.Organization;
import com.zhiwei.credit.model.system.product.BpProductParameter;
import com.zhiwei.credit.service.creditFlow.common.CsBankService;
import com.zhiwei.credit.service.creditFlow.contract.DocumentTempletService;
import com.zhiwei.credit.service.creditFlow.contract.ElementHandleService;
import com.zhiwei.credit.service.creditFlow.contract.ProcreditContractService;
import com.zhiwei.credit.service.creditFlow.contract.VProcreditContractService;
import com.zhiwei.credit.service.creditFlow.customer.common.EnterpriseBankService;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.EnterpriseService;
import com.zhiwei.credit.service.creditFlow.customer.person.PersonService;
import com.zhiwei.credit.service.creditFlow.customer.person.SpouseService;
import com.zhiwei.credit.service.creditFlow.fileUploads.FileFormService;
import com.zhiwei.credit.service.creditFlow.finance.BpFundIntentService;
import com.zhiwei.credit.service.creditFlow.finance.SlFundIntentService;
import com.zhiwei.credit.service.creditFlow.financeProject.FlFinancingProjectService;
import com.zhiwei.credit.service.creditFlow.financingAgency.PlBidInfoService;
import com.zhiwei.credit.service.creditFlow.financingAgency.PlBidPlanService;
import com.zhiwei.credit.service.creditFlow.fund.project.BpFundProjectService;
import com.zhiwei.credit.service.creditFlow.guarantee.project.GLGuaranteeloanProjectService;
import com.zhiwei.credit.service.creditFlow.smallLoan.project.SlSmallloanProjectService;
import com.zhiwei.credit.service.customer.BpCustRelationService;
import com.zhiwei.credit.service.customer.InvestPersonInfoService;
import com.zhiwei.credit.service.p2p.BpCustMemberService;
import com.zhiwei.credit.service.system.FileAttachService;
import com.zhiwei.credit.service.system.product.BpProductParameterService;
import com.zhiwei.credit.util.financeUtil.FundIntentComparator;

import edu.emory.mathcs.backport.java.util.Collections;

/**
 * @HT_version3.0
 * @author zhangcb
 * 合同通用action处理类
 */
@SuppressWarnings({ "unchecked", "deprecation" })
public class ContractHelperAction extends BaseAction{
	
	private static final Log logger=LogFactory.getLog(ContractHelperAction.class);
	
	@Resource
	private SignElement signElement;
	@Resource
	private CreditBaseDao creditBaseDao;
	@Resource
	private PersonService personService;
	@Resource
	private SpouseService spouseService;
	@Resource
	private CsBankService csBankService;
	@Resource
	private SignP2PElement signP2PElement;
	@Resource
	private FileFormService fileFormService;
	@Resource
	private MortgageService mortgageService;
	@Resource
	private PlBidPlanService plBidPlanService;
	@Resource
	private PlBidInfoService plBidInfoService;
	@Resource
	private EnterpriseService enterpriseService;
	@Resource
	private FileAttachService fileAttachService;
	@Resource
	private BpCustMemberService bpCustMemberService;
	@Resource
	private BpFundIntentService bpFundIntentService;
	@Resource
	private BpFundProjectService bpFundProjectService;
	@Resource
	private ElementHandleService elementHandleService;
	@Resource
	private BpCustRelationService bpCustRelationService;
	@Resource
	private EnterpriseBankService enterpriseBankService;
	@Resource
	private DocumentTempletService documentTempletService;
	@Resource
	private InvestPersonInfoService investPersonInfoService;
	@Resource
	private ProcreditContractService procreditContractService;
	@Resource
	private SlSmallloanProjectService slSmallloanProjectService;
	@Resource
	private BpProductParameterService bpProductParameterService;
	@Resource
	private FlFinancingProjectService flFinancingProjectService;
	@Resource
	private VProcreditContractService vProcreditContractService;   
	@Resource    
	private GLGuaranteeloanProjectService gLGuaranteeloanProjectService;
	@Resource
	private SlFundIntentService  slFundIntentService;
	@Resource
	private ProcreditMortgageService  procreditMortgageService;
	private int conId = 0;
	private int documentId;//文档id
	private int templateId;//模板id
	private String projId; //项目id
	private String contractType;//合同类别
	private String businessType;//业务类别
	private Long thirdRalationId;
	
	private String htlxdName;//合同类别名称
	private String htmcdName;//合同名称
	private String htType;//合同类别
	
	private Long clauseId;//展期记录id
	
	private int tempI=0;
	
	/**
	 * TODO 选择模板后查看模板下所有的要素和要素所对应的值,合同制作_会调用到该方法
	 * */
	public void findElement(){
		try {
			//1.根据模板id得到模板对象
			DocumentTemplet templet = documentTempletService.getById(documentId);
			//2.判断模板对象是否存在
			if (null == templet || !templet.isIsexist()) {
				JsonUtil.responseJsonString("{success:true,exsit:false,msg :'该文件已不存在,请重新上传!!!'}");
				return;
			} else {
				//3.获得模板对应的FileForm对象
				FileForm fileForm = fileFormService.getById(templet.getFileid());
				//4.判断fileForm对象是否存在
				if (null != fileForm) {
					//5.拼接文件全路径
					String path=super.getRequest().getRealPath("/")+fileForm.getFilepath();
					//6.获得文件
					File file = new File(path);
					//7.判断文件是否存在
					if (file.exists()){
						SlSmallloanProject project=(SlSmallloanProject)creditBaseDao.getById(SlSmallloanProject.class,Long.parseLong(projId));
						//8.定义封装模板要素对应实体对象id
						Map<String,Object> map=new HashMap<String,Object>();
						//9.封装id方法
						signNeedIds(project,map);
						//10.调用为模板要素赋值方法
						List<Element> list=ContractUtil.putContentToElements(signElement,project,creditBaseDao,path,map,businessType,conId);
						//11.返回结果
						JsonUtil.jsonFromList(list,null==list?0:list.size());
					} else{
						JsonUtil.responseJsonString("{success:true,exsit:false,msg :'合同上传出错，请重新上传'}");
					}
				}
			}
		} catch (Exception e) {
			JsonUtil.responseJsonString("{success:false}");
			logger.error("选择模板后查看模板下所有的要素和要素所对应的值出错:" + e.getMessage());
			e.printStackTrace();
		}
	}
	
	/**
	 * 封装要素对象id
	 * @param project
	 * @param map
	 * map的key是实体类的类名，所以必须首字母大写(区分大小写)
	 */
	private void signNeedIds(SlSmallloanProject project,Map<String, Object> map) {
		try {
			map.put("ProcreditContract",conId);
			map.put("SlSmallloanProject",project.getProjectId());
			//TODO 利率变更  待修改
			/*List<SlAlterAccrualRecord> alist=slAlterAccrualRecordService.getByProjectId(project.getProjectId(),"SmallLoan");
			if(null!=alist && alist.size()>0){
				SlAlterAccrualRecord record=alist.get(0);
				map.put("SlAlterAccrualRecord",record.getSlAlteraccrualRecordId());
			}*/
			
			//展期信息
			if(null!=clauseId && !"".equals(clauseId)){
				map.put("SlSuperviseRecord",clauseId);
//				project.setClauseId(clauseId);
			}
			
			if("person_customer".equals(project.getOppositeType())){
				Person p=personService.getById(Integer.valueOf(project.getOppositeID().toString()));
				if(null!=p){
					map.put("Person",p.getId());
					List<EnterpriseBank> bankList = enterpriseBankService.getBankList(p.getId(),(short)1,(short)0,(short)0);
					if(bankList!=null && bankList.size()>0){
						EnterpriseBank eBank = bankList.get(0);
						map.put("EnterpriseBank",eBank.getId());
						if(null!=eBank.getBankid()){
							CsBank cb=csBankService.get(eBank.getBankid());
							if(null!=cb){
								map.put("CsBank",cb.getBankid());
							}
						}
					}
				}
			}else if("company_customer".equals(project.getOppositeType())){
				Enterprise e=enterpriseService.getById(project.getOppositeID().intValue());
				if(null!=e){
					map.put("Enterprise",e.getId());
					
					//如果是客户是企业，查询法定代表人的信息
					if(e.getLegalpersonid()!=null  && !"".equals(e.getLegalpersonid())){
					   map.put("Person",e.getLegalpersonid());
					}
					//
					List<EnterpriseBank> bankList = enterpriseBankService.getBankList(e.getId(),(short)0,(short)0,(short)0);
					
					if(bankList!=null && bankList.size()>0){
						EnterpriseBank eBank = bankList.get(0);
						map.put("EnterpriseBank",eBank.getId());
						if(null!=eBank.getBankid()){
							CsBank cb=csBankService.get(eBank.getBankid());
							if(null!=cb){
								map.put("CsBank",cb.getBankid());
							}
						}
					}
				}
			}
			if(null!=project.getMineId() && project.getMineId()!=0){
				if(project.getMineType().equals("person_ourmain")){
					SlPersonMain personMain = (SlPersonMain)creditBaseDao.getById(SlPersonMain.class,project.getMineId());
					if(null!=personMain){
						map.put("SlPersonMain",personMain.getPersonMainId());
					}
				}else if(project.getMineType().equals("company_ourmain") && !"true".equals(AppUtil.getSystemIsGroupVersion())){
					SlCompanyMain companyMain=(SlCompanyMain)creditBaseDao.getById(SlCompanyMain.class,project.getMineId());
					if(null!=companyMain){
						map.put("SlCompanyMain",companyMain.getCompanyMainId());
					}
				}else{
					if(project.getCompanyId()!=0){
						Organization org=(Organization)creditBaseDao.getById(Organization.class,project.getCompanyId());
						if(null!=org){
							map.put("Organization",org.getOrgId());
						}
					}
				}
			}
			
			ProcreditContract contract=(ProcreditContract)creditBaseDao.getById(ProcreditContract.class,conId);
			if(null!=contract && null!=contract.getMortgageId()){
				ProcreditMortgage mortgage=(ProcreditMortgage)creditBaseDao.getById(ProcreditMortgage.class,contract.getMortgageId());
				//1.如果是借款合同则mortgage等于null,此时需要根据借款合同对应的项目信息查询相应的抵质押、保证信息
				List<ProcreditMortgage> pmList=new ArrayList<ProcreditMortgage>();
				if(null==mortgage){
					boolean flag1=true;
					boolean flag2=true;
					//查询该项目下的第一条抵质押物信息
					List<ProcreditMortgage>  mList=mortgageService.getByProjectId(project.getProjectId());
					if(null!=mList && mList.size()>0){
						for(ProcreditMortgage pm: mList){
							if(pm.getAssuretypeid()==606 && flag1){//保证
								pmList.add(pm);
								flag1=false;
							}
							if((pm.getAssuretypeid()==604 || pm.getAssuretypeid()==605)&& flag2){//抵质押
								pmList.add(pm);
								flag2=false;
							}
						}
					}
				}
				if(null!=pmList && pmList.size()>0){
					for(ProcreditMortgage pm:pmList){
						signMortgage(pm,map);
					}
				}else if(null!=mortgage){
					signMortgage(mortgage,map);
				}
			}
			
			//咨询管理费收取单位
			if(null!=project.getManagementConsultingMineId() && null!=project.getManagementConsultingMineType()){
				if("company_ourmain".equals(project.getManagementConsultingMineType())){
					SlCompanyMain companyMain=(SlCompanyMain)creditBaseDao.getById(SlCompanyMain.class,project.getManagementConsultingMineId());
					map.put(BaseConstants.GLFZT+"SlCompanyMain",companyMain.getCompanyMainId());
				}else if("person_ourmain".equals(project.getManagementConsultingMineType())){
					SlPersonMain personMain = (SlPersonMain)creditBaseDao.getById(SlPersonMain.class,project.getManagementConsultingMineId());
					map.put(BaseConstants.GLFZT+"SlPersonMain",personMain.getPersonMainId());
				}
			}
			//财务服务费收取单位
			if(null!=project.getFinanceServiceMineId() && null!=project.getFinanceServiceMineType()){
				if("company_ourmain".equals(project.getFinanceServiceMineType())){
					SlCompanyMain companyMain=(SlCompanyMain)creditBaseDao.getById(SlCompanyMain.class,project.getFinanceServiceMineId());
					map.put(BaseConstants.FWFZT+"SlCompanyMain",companyMain.getCompanyMainId());
				}else if("person_ourmain".equals(project.getFinanceServiceMineType())){
					SlPersonMain personMain = (SlPersonMain)creditBaseDao.getById(SlPersonMain.class,project.getFinanceServiceMineId());
					map.put(BaseConstants.FWFZT+"SlPersonMain",personMain.getPersonMainId());
				}
			}
			if(null!=project.getProductId()){
				BpProductParameter product=bpProductParameterService.get(project.getProductId());
				if(null!=product.getMineType() && null!=product.getMineId()){
					if("company_ourmain".equals(product.getMineType())){
						SlCompanyMain companyMain=(SlCompanyMain)creditBaseDao.getById(SlCompanyMain.class,product.getMineId());
						map.put(BaseConstants.CJZT+"SlCompanyMain",companyMain.getCompanyMainId());
					}else if("person_ourmain".equals(product.getMineType())){
						SlPersonMain personMain = (SlPersonMain)creditBaseDao.getById(SlPersonMain.class,product.getMineId());
						map.put(BaseConstants.CJZT+"SlPersonMain",personMain.getPersonMainId());
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void signMortgage(ProcreditMortgage mortgage,Map<String, Object> map){
		try{
			if(606==mortgage.getAssuretypeid()){//信用保证
				if(603==mortgage.getPersonType()){//保证人——个人
					Person p=(Person)creditBaseDao.getById(Person.class,mortgage.getAssureofname());
					map.put(BaseConstants.BZ+"Person",p.getId());
					map.put(BaseConstants.CZ+"Person",p.getId());
					if(null!=p){
						List<EnterpriseBank> bankList = enterpriseBankService.getBankList(p.getId(),(short)1,(short)0,(short)0);
						if(bankList!=null && bankList.size()>0){
							EnterpriseBank eBank = bankList.get(0);
							if(null!=eBank){
								map.put(BaseConstants.BZ+"EnterpriseBank",eBank.getId());
							}
						}
						Spouse spouse = spouseService.getByPersonId(p.getId());
						if(null!=spouse){
							map.put(BaseConstants.BZ+"Spouse",spouse.getSpouseId());
						}
					}
				}else{//保证人——企业
					Enterprise e=(Enterprise)creditBaseDao.getById(Enterprise.class,mortgage.getAssureofname());
					map.put(BaseConstants.BZ+"Enterprise",e.getId());
					map.put(BaseConstants.CZ+"Enterprise",e.getId());
					if(null!=e){
						Person p=(Person)creditBaseDao.getById(Person.class,e.getLegalpersonid());
						map.put(BaseConstants.BZ+"Person",p.getId());
						map.put(BaseConstants.CZ+"Person",p.getId());
						List<EnterpriseBank> bankList = enterpriseBankService.getBankList(e.getId(),(short)0,(short)0,(short)0);
						if(bankList!=null && bankList.size()>0){
							EnterpriseBank eBank = bankList.get(0);
							if(null!=eBank){
								map.put(BaseConstants.BZ+"EnterpriseBank",eBank.getId());
							}
						}
						if(null!=p){
							Spouse spouse = spouseService.getByPersonId(p.getId());
							if(null!=spouse){
								map.put(BaseConstants.BZ+"Spouse",spouse.getSpouseId());
							}
						}
					}
				}
			}
			//抵押、质押
			if(604==mortgage.getAssuretypeid() || 605==mortgage.getAssuretypeid()){
				map.put(BaseConstants.DY+"ProcreditMortgage",mortgage.getId());
				if(603==mortgage.getPersonType()){//个人
					Person p=(Person)creditBaseDao.getById(Person.class,mortgage.getAssureofname());
					map.put(BaseConstants.DY+"Person",p.getId());
					map.put(BaseConstants.CZ+"Person",p.getId());
				}else if(602==mortgage.getPersonType()){//企业
					Enterprise e=(Enterprise)creditBaseDao.getById(Enterprise.class,mortgage.getAssureofname());
					map.put(BaseConstants.DY+"Enterprise",e.getId());
					map.put(BaseConstants.CZ+"Enterprise",e.getId());
				}
				if(mortgage.getMortgagenametypeid()==1){//车辆信息
					String hql = "from ProcreditMortgageCar where mortgageid = " + mortgage.getId();
					List list1 = creditBaseDao.queryHql(hql);
					if(null!=list1 && list1.size()>0){
						ProcreditMortgageCar car = (ProcreditMortgageCar)list1.get(0);
						map.put(BaseConstants.DY+"ProcreditMortgageCar",car.getId());
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	/**
	 * TODO 合同模板制作_查看指定模板所包含的系统要素
	 */
	public void findElementTwo() {
		try {
			//1.根据模板id得到模板对象
			DocumentTemplet templet = documentTempletService.getById(documentId);
			//2.判断模板对象是否存在
			if (null == templet || !templet.isIsexist()) {
				JsonUtil.responseJsonString("{success:true,exsit:false,msg :'该文件已不存在,请重新上传!!!'}");
				return;
			} else {
				//3.获得模板对应的FileForm对象
				FileForm fileForm = fileFormService.getById(templet.getFileid());
				//4.判断fileForm对象是否存在
				if (null != fileForm) {
					//5.拼接文件全路径
					String path=super.getRequest().getRealPath("/")+fileForm.getFilepath();
					//6.获得文件
					File file = new File(path);
					//7.判断文件是否存在
					if (file.exists()) {
						//8.获得模板要素,并封装到list中
						List<Object> list = new ArrayList<Object>();
						Map<String,Object> map=WordPOI.getReplaceElementsInWord("0",path,null);
						Iterator<?> ite=map.keySet().iterator();
						while(ite.hasNext()){
							String temp=ite.next().toString();
							Element element =new Element();
							element.setElementType("系统要素");
							element.setDepict(temp);//要素描述
							element.setCode("${"+temp+"}");//要素编码
							list.add(element);
						}
						int total = (null!=list?list.size():0);
						//9.返回结果
						JsonUtil.jsonFromList(list, total);
					} else{
						JsonUtil.responseJsonString("{success:true,exsit:false,msg :'合同上传出错，请重新上传'}");
					}
				} else {
					JsonUtil.responseJsonString("{success:true,exsit:false,msg :'合同上传出错，请重新上传'}");
					return;
				}
			}
		} catch (Exception e) {
			JsonUtil.responseJsonString("{success:false}");
			logger.error("查看模板所包含的要素:" + e.getMessage());
			e.printStackTrace();
		}
	}
	
	/**
	 * TODO 根据业务类别查询所有系统要素,查看所有系统要素
	 */
	public void findElementList() {
		List list = BaseUtil.readPropertiesByType(businessType,false);
		JsonUtil.jsonFromList(list,null==list?0:list.size());
	}
	
	/**
	 * TODO 验证文档是否存在
	 */
	public void validationFileIsExist() {
		try {
			DocumentTemplet templet = documentTempletService.getById(documentId);
			if (null == templet) {
				JsonUtil.responseJsonString("{success:true,exsit:false,msg :'加载错误，未找到模板'}");
				return;
			} else {
				FileForm fileForm = fileFormService.getById(templet.getFileid());
				if (null != fileForm) {
					String path = super.getRequest().getRealPath("/")+ fileForm.getFilepath();
					File file = new File(path);
					if (file.exists()) {
						JsonUtil.responseJsonString("{success:true,exsit:true}");
					} else
						JsonUtil.responseJsonString("{success:true,exsit:false,msg :'加载错误，可能未上传模板'}");
				} else {
					JsonUtil.responseJsonString("{success:true,exsit:false,msg :'加载错误，可能未上传模板'}");
				}
			}
		} catch (Exception e) {
			logger.error("验证模板是否存在出错:" + e.getMessage());
			e.printStackTrace();
		}
	}
	
	/**
	 * TODO 以word格式下载模板文件,合同模板管理_查看模板文本内容
	 */
	public void seeTemplateOfHTML() {
		String path = "", fileName;
		HttpServletRequest request = getRequest();
		HttpServletResponse response = getResponse();
		int documentId = Integer.parseInt(request.getParameter("tempId"));
		try {
			DocumentTemplet templet = documentTempletService.getById(documentId);
			if (null == templet) {
				return;
			} else {
				FileForm fileForm = fileFormService.getById(templet.getFileid());
				if (null != fileForm) {
					path = super.getRequest().getRealPath("/")+ fileForm.getFilepath();
					path=path.replaceAll("\\\\","/");
					fileName = fileForm.getFilename().trim();
					File file = new File(path);
					if (file.exists()) {
						String newPath = path.substring(0,path.lastIndexOf("/") + 1)+ fileName;
						ElementUtil.downloadFile(newPath,response);
					} else
						JsonUtil.responseJsonString("{success:true,exsit:false,msg :'加载错误，可能未上传模板'}");
				} else {
					return;
				}
			}
		} catch (Exception e) {
			logger.error("以word格式下载模板文件出错:" + e.getMessage());
			e.printStackTrace();
		}
	}
	
	/**
	 * TODO 生成借款端合同
	 */
	public void createContract(){
		try {
			String serverPath = this.getRequest().getRealPath("/");
			DocumentTemplet templet = documentTempletService.getById(templateId);
			if (null == templet || !templet.isIsexist()) {
				JsonUtil.responseJsonString("{success:true,exsit:false,msg :'该文件已不存在,请重新上传!!!'}");
				return;
			} else {
				FileForm fileForm = fileFormService.getById(templet.getFileid());
//				FileForm fileForm = fileFormService.getById(Integer.valueOf("aa"));
				if (null != fileForm) {
					//1.拼接word源文件路径
					StringBuffer wordPath=new StringBuffer();
					wordPath.append(getRequest().getRealPath("/"));
					wordPath.append(fileForm.getFilepath());
					//2.判断word文件是否存在
					File file = new File(wordPath.toString());
					if (file.exists()) {
						//3.修改合同对象的相关信息(合同名称)
						int contractId=Integer.valueOf(this.getRequest().getParameter("contractId"));
						ProcreditContract pcontract = procreditContractService.getById(contractId);
						Map<String,Object> map_db=new HashMap<String,Object>();
						map_db.put("tempId",templateId);//模板id
						map_db.put("projId",projId);//项目id
						map_db.put("thirdRalationId",thirdRalationId);
						map_db.put("businessType",businessType);//业务类别
						map_db.put("searchRemark",this.getRequest().getParameter("searchRemark"));
						procreditContractService.newMakeUpload(map_db,pcontract);// 向合同表中添加数据
						
						String bidPlanId = this.getRequest().getParameter("bidPlanId");//标id
						String fileName=concatFileName(templet,true,bidPlanId,pcontract);
						
						//4.生成后的word文件路径
						StringBuffer newPath=new StringBuffer();
						newPath.append("attachFiles/projFile/contfolder/").append(fileName).append("/").append(templet.getParentid()).append("/").append(pcontract.getContractNumber()).append("/");
						String newsrc=newPath.toString()+fileName+BaseConstants.SUFIXDOCX;
						String dbpath=(serverPath+newsrc).replaceAll("\\\\","/");
						String pdfSrc=newPath.toString()+fileName+BaseConstants.SUFIXPDF;
						String pdfPath=(serverPath+pdfSrc).replaceAll("\\\\","/");
						
						//5.临时word文件路径
						StringBuffer tempPath=new StringBuffer();
						int index=fileForm.getFilepath().lastIndexOf("/");
						tempPath.append(fileForm.getFilepath().substring(0,index)).append("/");
						String temsrc=serverPath.replaceAll("\\\\","/")+(tempPath.toString()+fileName+BaseConstants.SUFIXDOCX);
						
						//6.生成word文件路径
						BaseUtil.createDir(dbpath.substring(0,dbpath.lastIndexOf("/")));
						//7.copy word文件到指定路径下
						BaseUtil.fileChannelCopy(wordPath.toString(),temsrc);
						
						//8.封装页面数据到valueMap中
						Map<String,Object> codeMap=new TreeMap<String,Object>();
						//页面封装的系统要素
						String vSysDatas = this.getRequest().getParameter("vSysDatas");
						if (!"".equals(vSysDatas)) {
							String[] data = vSysDatas.split("!");
							for (int i = 0; i < data.length; i++) {
								String[] str = data[i].split("@");
								codeMap.put(str[0].replace("${","").replace("}",""),str[1]);
							}
						}
						//页面封装自定义要素
						String vDatas = this.getRequest().getParameter("vDatas");
						if (!"".equals(vDatas)) {
							String[] data = vDatas.split("!");
							for (int i = 0; i < data.length; i++) {
								String[] str = data[i].split(",")[0].split("@");
								codeMap.put(str[1].trim(),str[2].trim());
							}
							saveToContractElement(pcontract, data,contractId);
						}
						String  iop=(String)codeMap.get("管理费小写");
						BigDecimal iops=BigDecimal.ZERO;
//						by liu 2017-3-8
							BigDecimal cwfwfMoney = BigDecimal.ZERO;
							BigDecimal firstMonthMoney = BigDecimal.ZERO;
							BigDecimal followingMonthMoney = BigDecimal.ZERO;
							BigDecimal endMonthMOney = BigDecimal.ZERO;
							BigDecimal interest=new BigDecimal(0.01);
							SlSmallloanProject project=slSmallloanProjectService.get(Long.valueOf(projId));
							//月利率
							cwfwfMoney=(project.getAccrual().multiply(interest)).setScale(4,BigDecimal.ROUND_HALF_DOWN);
							System.out.println("-----------------"+cwfwfMoney);
							String  ioj=(String)codeMap.get("管理费率");
							String  preMOney=(String)codeMap.get("预扣管理费");
							// 管理费
							if(iop!=null&&!"".equals(iop)){
								 iops = new BigDecimal(iop);
							}
							BigDecimal iojs=BigDecimal.ZERO;
							if(cwfwfMoney.compareTo(new BigDecimal(0.015))>0){
								// 服务费按照利率算
								if(ioj!=null&&!"".equals(ioj)){
									iojs= new BigDecimal(ioj);
								  // 首月
									firstMonthMoney=((cwfwfMoney.subtract(new BigDecimal(0.015))).multiply(project.getProjectMoney())
									.add(iojs.multiply(project.getProjectMoney()))).setScale(1,BigDecimal.ROUND_DOWN);
									// 次月
									followingMonthMoney=((cwfwfMoney.subtract(new BigDecimal(0.015))).multiply(project.getProjectMoney())).setScale(1,BigDecimal.ROUND_DOWN);
									// 末月
									endMonthMOney=((cwfwfMoney.subtract(new BigDecimal(0.015))).multiply(project.getProjectMoney())).setScale(1,BigDecimal.ROUND_DOWN);
								}else {
									firstMonthMoney=(((cwfwfMoney.subtract(new BigDecimal(0.015))).multiply(project.getProjectMoney())).add(iops)).setScale(1,BigDecimal.ROUND_DOWN);
									followingMonthMoney=((cwfwfMoney.subtract(new BigDecimal(0.015))).multiply(project.getProjectMoney())).setScale(1,BigDecimal.ROUND_DOWN);
									endMonthMOney=((cwfwfMoney.subtract(new BigDecimal(0.015))).multiply(project.getProjectMoney())).setScale(1,BigDecimal.ROUND_DOWN);
//									endMonthMOney=(project.getProjectMoney()).setScale(2,BigDecimal.ROUND_CEILING);
								}
							}else {
								if(ioj!=null&&!"".equals(ioj)){
									iojs= new BigDecimal(ioj);
									  // 首月
										firstMonthMoney=((iojs.multiply(project.getProjectMoney()))).setScale(2,BigDecimal.ROUND_DOWN);
									}else {
										firstMonthMoney=(iops);
									}
							}
							 if(project.getAccrualtype().equals("singleInterest")) { //  先息
									codeMap.put("首月管理费小写",firstMonthMoney);
									codeMap.put("首月管理费大写",MoneyFormat.getInstance().hangeToBig(firstMonthMoney));
									// 表示三期
									if(project.getPayintentPeriod()>2){
										codeMap.put("次月管理费大写",MoneyFormat.getInstance().hangeToBig(followingMonthMoney));
										codeMap.put("次月管理费小写",followingMonthMoney);
										codeMap.put("末月管理费小写",endMonthMOney);
										codeMap.put("末月管理费大写",MoneyFormat.getInstance().hangeToBig(endMonthMOney));
									}else if (project.getPayintentPeriod()==2){//   表示两期
										codeMap.put("次月管理费大写",MoneyFormat.getInstance().hangeToBig(followingMonthMoney));
										codeMap.put("次月管理费小写",followingMonthMoney);
										codeMap.put("先息贷款金额二",project.getProjectMoney());
										codeMap.put("先息贷款日期三",null);
										codeMap.put("先息贷款金额三",null);
									}else {
										codeMap.put("先息贷款金额一",project.getProjectMoney());
										codeMap.put("先息贷款日期二",null);
										codeMap.put("先息贷款金额二",null);
										codeMap.put("先息贷款日期三",null);
										codeMap.put("先息贷款金额三",null);
									}
									codeMap.put("管理费小写",null);
									codeMap.put("管理费率",null);
							}
						   if(project.getAccrualtype().equals("sameprincipalsameInterest")){
							   if(preMOney!=null&&!"".equals(preMOney)){
								   BigDecimal   pre = new BigDecimal(preMOney);
								   String  projectdenben=(String)codeMap.get("等本贷款本金小写");
								   projectdenben=projectdenben.substring(0, projectdenben.indexOf("元"));
								   BigDecimal preproject=new BigDecimal(projectdenben);
									codeMap.put("等本贷款本金小写",preproject.add(pre));
									codeMap.put("等本贷款本金大写",MoneyFormat.getInstance().hangeToBig( (preproject.add(pre))));
									codeMap.put("预扣管理费",null);
							   }
						   }
//						}
						//TODO 待修改 表格要素集
						//tableList key存放的是模板中表格的名称
//						Map<String,List<List<String>>> tableList=new HashMap<String,List<List<String>>>();
						Map<String,List<List<String>>> tableList=new TreeMap<String,List<List<String>>>();
//						
//						List<List<String>> resultList=null;//投资人列表
//						if(null!=bidPlanId && !"".equals(bidPlanId)){
//							List<InvestPersonInfo> personList=investPersonInfoService.getByBidPlanId(Long.parseLong(bidPlanId));
//							resultList=SignTableList.investPersonTable(personList,bpFundIntentService);
//							tableList.put(BaseConstants.TZRLB,resultList);
//						}
						
//						//借款人款项计划表
//						List<BpFundIntent> list1=bpFundIntentService.bidFundList2(Long.parseLong(bidPlanId));
//						List<List<String>> jkrFundList=SignTableList.jkrBpFundIntentTable(list1);
//						if(null!=jkrFundList && jkrFundList.size()>0){
//							tableList.put(BaseConstants.JKRHKJH,jkrFundList);
//						}
						//放款收息表
						List<SlFundIntent> list1=slFundIntentService.getByProjectId2(Long.valueOf(projId),businessType);
						List<List<String>> jkrFundList=SignTableList.fksSlFundIntentTable(list1);
						if(null!=jkrFundList && jkrFundList.size()>0){
							tableList.put(BaseConstants.FKSXB,jkrFundList);
						}
						
//						// 抵质押物
						List<ProcreditMortgageCar> list2=mortgageService.getByProjectIdCar(Long.valueOf(projId));
						List<List<String>> dzyProcreditMortgageCarList=SignTableList.dzyMortgageTable(list2);
						if(null!=dzyProcreditMortgageCarList && dzyProcreditMortgageCarList.size()>0){
							tableList.put(BaseConstants.DZYW,dzyProcreditMortgageCarList);
						}
						//9.替换word要素
						boolean flag=WordPOI.replaceAndGenerateWord(temsrc,dbpath,codeMap,true,tableList);
						if(flag){
							//10.删除临时文件
							File tempFile=new File(temsrc);
							if (tempFile.isFile() && tempFile.exists()){ 
								tempFile.delete();
							}
							//11.修改合同对象
							Object[] obj = {true,newPath.toString(),conId};
							elementHandleService.updateCon("update ProcreditContract set isUpload=?, url=? where id =?",obj);
							pcontract.setIsUpload(true);
							pcontract.setUrl(newsrc.split("\\.")[0]+BaseConstants.SUFIXDOCX);
							pcontract.setFileCount("0");
							
							//12.将word转成pdf
							try{
								boolean convertFlag=WordToPdf.wordConverterToPdf(dbpath,pdfPath);
								if(convertFlag){
									pcontract.setUrl(pdfSrc);
								}
							}catch(Exception e){
								System.out.println("pdf生成失败!!!");
							}
							
							procreditContractService.merge(pcontract);
							//13.修改附件表
							List<FileAttach> listfileAttach = fileAttachService.listByContractId(conId);
							if (null!=listfileAttach) {
								for (FileAttach f : listfileAttach) {
									f.setFilePath(newsrc);
									fileAttachService.merge(f);
								}
							} else {
								changeFileAttach(listfileAttach,dbpath,fileName,"doc");
							}
							//14.返回给客户端
							JsonUtil.jsonFromObject(pcontract,true);
						}else{
							JsonUtil.responseJsonString("{success:true,exsit:true,msg :'合同生成失败!'}");
						}
					} else{
						JsonUtil.responseJsonString("{success:true,exsit:false,msg :'文件已不存在，请重新上传'}");
					}
				}
			}
		} catch (Exception e) {
			JsonUtil.responseJsonString("{success:true,exsit:true,msg :'合同生成失败!'}");
			logger.error("选择模板后查看模板下所有的要素和要素所对应的值出错:" + e.getMessage());
		}
	}
	
	/**
	 * 保存及更新自定义要素
	 * @param p            ProcreditContract对象
	 * @param data         自定义要素
	 * @param contractId   合同ID
	 */
	public void saveToContractElement(ProcreditContract p,String[] data,int contractId){
		try{
			if (null == p.getContractName()) {
				for (int i = 0; i < data.length; i++) {
					// 判断合同是否已存在
					String[] str = data[i].split("@");
					ContractElement cElement = new ContractElement();
					cElement.setElementName(str[1]);
					cElement.setElementValue(str[2]);
					cElement.setContractId(contractId);
					cElement.setAddDate(new Date());
					creditBaseDao.saveDatas(cElement);
				}
			} else {
				List<ContractElement> list2 = vProcreditContractService.getListByCategoryId(contractId);
				if (null != list2 && list2.size()>0) {
					for (int k = 0; k < list2.size(); k++) {
						ContractElement cElement = (ContractElement) list2.get(k);
						String[] str = data[k].split("@");
						cElement.setElementName(str[1]);
						cElement.setElementValue(str[2]);
						cElement.setContractId(contractId);
						cElement.setAddDate(new Date());
						creditBaseDao.updateDatas(cElement);
					}
				} else {
					for (int i = 0; i < data.length; i++) {
						// 判断合同是否已存在
						String[] str = data[i].split("@");
						ContractElement cElement = new ContractElement();
						cElement.setElementName(str[1]);
						cElement.setElementValue(str[2]);
						cElement.setContractId(contractId);
						cElement.setAddDate(new Date());
						creditBaseDao.saveDatas(cElement);
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * TODO 生成p2p端合同,该方法分别用在生成【p2p投资人合同】和【p2p借款人合同】
	 */
	public void createP2pContract(){
		HttpServletRequest request = getRequest();
		String serverPath = request.getRealPath("/");
		String documenttempletId=request.getParameter("documenttempletId");//模板id
		
		DocumentTemplet dtemplet = documentTempletService.getById(Integer.valueOf(documenttempletId));
		FileForm fileForm = fileFormService.getById(dtemplet.getFileid());
		
		//1.拼接word源文件路径
		StringBuffer wordPath=new StringBuffer(serverPath).append(fileForm.getFilepath());
		//2.判断word文件是否存在
		File file = new File(wordPath.toString());
		if (file.exists()) {
			SimpleDateFormat df=new SimpleDateFormat("yyyyMMdd");
			String type = request.getParameter("type");//标识是生成借款人合同还是投资人合同
			String fundProjectId = request.getParameter("fundProjectId");//项目id
			String bidPlanId = request.getParameter("bidPlanId");//标id
			PlBidPlan plBidPlan=plBidPlanService.get(Long.valueOf(bidPlanId));
			BpFundProject bpFundProject =bpFundProjectService.get(Long.parseLong(fundProjectId));
			SlSmallloanProject sproject=slSmallloanProjectService.get(bpFundProject.getProjectId());
			//3.拼接生成后的word文件路径
			StringBuffer newPath=new StringBuffer("attachFiles/projFile/contfolder/");
			newPath.append(sproject.getProjectNumber()).append("/");
			newPath.append(plBidPlan.getBidProNumber()).append("_");
			newPath.append(plBidPlan.getBidId()).append("/p2pContract/");
			
			//4.临时word文件路径
			int index=fileForm.getFilepath().lastIndexOf("/");
			StringBuffer tempPath=new StringBuffer(fileForm.getFilepath().substring(0,index)).append("/");
			String temsrc=serverPath.replaceAll("\\\\","/")+(tempPath.toString());
			
			//5.获得该模板中合同要素
			//生成p2p合同要素的时候大多数要素都需要手动计算，所以传值为2。
			//如果codeMap没有模板中某个要素,则该要素是不会被替换掉的
			Map<String,Object> codeMap=WordPOI.getReplaceElementsInWord("2",wordPath.toString(),"InternetFinance");
			//6.拼接生成后的word文件名称
			if(null!=type && "loan".equals(type)){
				StringBuffer fileName=new StringBuffer();
				int contractId=Integer.valueOf(this.getRequest().getParameter("contractId"));//合同id
				ProcreditContract pcontract = procreditContractService.getById(contractId);
				codeMap.put("合同编号",pcontract.getContractNumber());
				if("person_customer".equals(sproject.getOppositeType())){//个人借款
					Person p=personService.getById(sproject.getOppositeID().intValue());
					if(null!=p){
						fileName.append(p.getName()).append("_");
					}
				}else{//企业借款
					Enterprise e=enterpriseService.get(sproject.getOppositeID());
					if(null!=e){
						fileName.append(e.getEnterprisename()).append("_");
					}
				}
				fileName.append(df.format(new Date()));
				fileName.append("_");
				fileName.append(pcontract.getId());
				fileName.append(BaseConstants.SUFIXDOCX);
				
				String newsrc=newPath.toString()+fileName;
				String dbpath=(serverPath+newsrc).replaceAll("\\\\","/");
				
				//7.生成word文件路径
				BaseUtil.createDir(dbpath.substring(0,dbpath.lastIndexOf("/")));
				//8.copy word文件到指定路径下
				temsrc+="p2pContractx.docx";
				BaseUtil.fileChannelCopy(wordPath.toString(),temsrc);
				
				signP2PElement.updateP2PCodeCommon(sproject,bpFundProject,plBidPlan,codeMap,this.getRequest());
				
				Map<String,List<List<String>>> tableList=new TreeMap<String,List<List<String>>>();
				List<List<String>> resultList=null;//投资人列表
				if(null!=bidPlanId && !"".equals(bidPlanId)){
					List<InvestPersonInfo> personList=investPersonInfoService.getByBidPlanId(Long.parseLong(bidPlanId));
					resultList=SignTableList.investPersonTable(personList,bpFundIntentService);
					tableList.put(BaseConstants.TZRLB,resultList);
				}
				
				//借款人款项计划表
				List<BpFundIntent> list1=bpFundIntentService.bidFundList2(Long.parseLong(bidPlanId));
				List<List<String>> jkrFundList=SignTableList.jkrBpFundIntentTable(list1);
				if(null!=jkrFundList && jkrFundList.size()>0){
					tableList.put(BaseConstants.JKRHKJH,jkrFundList);
				}
				
				//9.替换word要素
				boolean flag=WordPOI.replaceAndGenerateWord(temsrc,dbpath,codeMap,true,tableList);
				if(flag){
					//10.删除临时文件
					File tempFile=new File(temsrc);
					if (tempFile.isFile() && tempFile.exists()){ 
						tempFile.delete();
					}
					
					pcontract.setUrl(newsrc);
					pcontract.setIsUpload(true);
					pcontract.setFileCount("0");
					pcontract.setContractName(fileName.toString());
//					pcontract.setContractNumber(sproject.getProjectNumber());
					
					//11.将word转成pdf
					String pdfSrc=newsrc.split("\\.")[0]+BaseConstants.SUFIXPDF;
					String pdfPath=(serverPath+pdfSrc).replaceAll("\\\\","/");
					try{
						boolean convertFlag=WordToPdf.wordConverterToPdf(dbpath,pdfPath);
						if(convertFlag){
							pcontract.setUrl(pdfSrc);
						}
					}catch(Exception e){
						System.out.println("生成pdf失败!!!");
					}
					
					procreditContractService.merge(pcontract);
					
					// 向实体添加数据，返回给客户端
					JsonUtil.responseJsonString("{success:true}");
				}
			}else{
				List<InvestPersonInfo> list = investPersonInfoService.getByBidPlanId(Long.parseLong(bidPlanId));
				if(null!=list && list.size()>0){
					//7.不需要根据投资记录赋值的要素公用方法
					signP2PElement.updateP2PCodeCommon(sproject,bpFundProject,plBidPlan,codeMap,this.getRequest());
					//8.循环投资记录
					CountDownLatch latch = new CountDownLatch(list.size()) ;
					for(int j=0;j<list.size();j++){
						InvestPersonInfo investInfo=list.get(j);
						String threadName="P2P_"+plBidPlan.getBidId()+"_"+investInfo.getInvestPersonName()+"-"+j+BaseConstants.SUFIXDOCX;//线程名称
						
						//9.临时word文件
						String temp=temsrc+threadName;
						
						//10.最终word文件
						String newsrc=newPath.toString()+threadName;
						String dbpath=(serverPath+newsrc).replaceAll("\\\\","/");
						
						//11.用了多线程之后为了防止数据被更改每次都要新创建一个map变量
						Map<String,Object> tempMap=new TreeMap<String,Object>();
						tempMap.putAll(codeMap);
						
						//12.生成word文件路径
						if(j==0){
							BaseUtil.createDir(dbpath.substring(0,dbpath.lastIndexOf("/")));
						}
						
						//13.copy word文件到指定路径下
						BaseUtil.fileChannelCopy(wordPath.toString(),temp);
						
						//14.创建线程
						CommonThread t=new CommonThread(latch,bpFundProject,plBidPlan,investInfo,tempMap,newsrc,dbpath,serverPath,temp,wordPath.toString());
						t.start();
					}
					try {
			            latch.await();//阻塞当前线程，直到计时器的值为0
			            if(tempI==list.size()){
							System.out.println("全部转换成功!!!");
							// 向实体添加数据，返回给客户端
							JsonUtil.responseJsonString("{success:true}");
						}else{
							JsonUtil.responseJsonFailure();
						}
			        } catch (InterruptedException e) {
			            e.printStackTrace();
			        }
				}
			}
		}else{
			JsonUtil.responseJsonString("{success:false}");
		}
	}
	
	class CommonThread extends Thread{
		
		private BpFundProject bpFundProject;
		private PlBidPlan plBidPlan;
		private InvestPersonInfo investInfo;
		private Map<String,Object> codeMap;
		private String newsrc;
		private String dbpath;
		private String serverPath;
		private CountDownLatch latch;
		private String temp;
		
		public CommonThread(CountDownLatch latch,BpFundProject bpFundProject,PlBidPlan plBidPlan,InvestPersonInfo investInfo,Map<String,Object> codeMap
							,String newsrc,String dbpath,String serverPath,String temp,String wordPath){
			this.bpFundProject=bpFundProject;
			this.plBidPlan=plBidPlan;
			this.investInfo=investInfo;
			this.codeMap=codeMap;
			this.newsrc=newsrc;
			this.dbpath=dbpath;
			this.serverPath=serverPath;
			this.latch=latch;
			this.temp=temp;
		}
		
		@Override
		public void run(){
			try {
				Map<String,List<List<String>>> tableList=new TreeMap<String,List<List<String>>>();
				
				updateP2PCode(bpFundProject,plBidPlan,investInfo,codeMap);
				
				List<BpFundIntent> list1=updateCodeList(investInfo,codeMap);
				//投资人还款计划
				List<List<String>> tzrFundList=SignTableList.tzrFundIntentTable(list1);
				if(null!=tzrFundList && tzrFundList.size()>0){
					tableList.put(BaseConstants.TZRKXJH,tzrFundList);
				}
				//3.替换word要素
				boolean flag=WordPOI.replaceAndGenerateWord(temp,dbpath,codeMap,true,tableList);
				if(flag){
					tempI++;
					//4.删除临时文件
					File tempFile=new File(temp);
					if (tempFile.isFile() && tempFile.exists()){ 
						tempFile.delete();
					}
					investInfo.setContractUrls(newsrc);
					
					//5.将word转成pdf
					try{
						String pdfSrc=newsrc.split("\\.")[0]+BaseConstants.SUFIXPDF;
						String pdfPath=(serverPath+pdfSrc).replaceAll("\\\\","/");
						boolean convertFlag=WordToPdf.wordConverterToPdf(dbpath,pdfPath);
						if(convertFlag){
							investInfo.setContractUrls(pdfSrc);
						}
					}catch(Exception e){
						System.out.println("pdf生成失败!!!");
					}
					investPersonInfoService.save(investInfo);
				}
			}catch(Exception e){
				e.printStackTrace();
			}finally {
                latch.countDown();//当前线程调用此方法，计数减一
            }
		}
	}
	
	public List<BpFundIntent>  updateCodeList(InvestPersonInfo investInfo,Map<String,Object> map){
		List<BpFundIntent> list1=bpFundIntentService.getByPlanIdA(investInfo.getBidPlanId(),null,investInfo.getOrderNo(),"'loanInterest','principalRepayment'");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		for(BpFundIntent bf:list1){
			bpFundIntentService.evict(bf);
			if(bf.getFundType().equals("loanInterest")){
				bf.setFundType("利息");
				sdf.format(bf.getIntentDate());
			}else if(bf.getFundType().equals("principalRepayment")){
				bf.setFundType("本金");
			}
		}
		return list1;
	} 
	
	/**
	 * 为p2p部分要素赋值
	 * @param slSmallloanProject
	 * @param sloanProject
	 * @param investInfo
	 * @param map
	 */
	private synchronized void updateP2PCode(BpFundProject sloanProject,PlBidPlan plBidPlan,InvestPersonInfo investInfo,Map<String,Object> map){
		String dw = "元整";
		DecimalFormat myFormatter = new DecimalFormat("####.#");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
		if(null!=investInfo){
			Double projectMoney =investInfo.getInvestMoney().doubleValue();
			PlBidInfo plBidInfo=plBidInfoService.getByOrderNo(investInfo.getOrderNo());
			BpCustMember investPerson=bpCustMemberService.get(investInfo.getInvestPersonId());
			
			map.put("投资申请号","投-"+investInfo.getInvestId()+"-"+investInfo.getInvestPersonId());
			map.put("投资人注册号","投-"+investInfo.getInvestPersonName());
			map.put("投资人姓名",investPerson.getTruename());
			map.put("投资人注册账号",investPerson.getLoginname());
			map.put("投资人证件号码",investPerson.getCardcode());
			map.put("投资人手机号码",investPerson.getTelphone());
			map.put("投标日期",sd.format(plBidInfo.getBidtime()));
			map.put("贷款金额小写",myFormatter.format(projectMoney).toString()+"元");
			map.put("贷款金额大写",MoneyFormat.getInstance().hangeToBig(new BigDecimal(projectMoney))+dw);
			map.put("投资人投标金额小写",myFormatter.format(projectMoney).toString()+"元");
			map.put("投资人投标金额大写",MoneyFormat.getInstance().hangeToBig(new BigDecimal(projectMoney))+dw);
			//合同编号--发标时间-投资人编号-借款人编号
			map.put("借款合同编号",sdf.format(plBidPlan.getCreatetime())+"-"+investInfo.getInvestPersonId()+"-"+sloanProject.getOppositeID());
		}
	}
	
	/**
	 * 拼接filename(公用方法)
	 * @param templet    模板对象
	 * @param isSmall    是否是小贷
	 * @param bidPlanId  标id
	 * @return
	 */
	public String concatFileName(DocumentTemplet templet,boolean isSmall,String bidPlanId,ProcreditContract pcontract){
		SlSmallloanProject sloanProject = null;//原小贷项目实体类
		BpFundProject bpProject = null;//资金拆分方案实体类
		GLGuaranteeloanProject gloanProject = null;//担保实体类
		FlFinancingProject floanProject = null;//融资实体类
		PlPawnProject pawnProject = null;//典当实体类
		FlLeaseFinanceProject flLeaseFinance = null;//租赁实体类
		String projectNumber="";
		String shortName="";
		String fileName="";
		try{
			// 获得企业简称或个人的名字，由项目的客户类型决定
			if ("SmallLoan".equals(businessType)) {//小贷
				if(isSmall){
					sloanProject = slSmallloanProjectService.get(Long.valueOf(pcontract.getProjId()));
					projectNumber = sloanProject.getProjectNumber();
					if(sloanProject!=null){
						if(sloanProject.getOppositeType()!=null){
							if (sloanProject.getOppositeType().equals("company_customer")) {//企业
								Enterprise enterp = enterpriseService.getById(Integer.parseInt(sloanProject.getOppositeID().toString()));
								shortName = enterp.getEnterprisename().trim();
							} else if (sloanProject.getOppositeType().equals("person_customer")) {//个人
								Person person = personService.getById(Integer.parseInt(sloanProject.getOppositeID().toString()));
								shortName = person.getName().trim();
							}
						}
					}
				}else{
					bpProject = bpFundProjectService.get(Long.valueOf(pcontract.getProjId()));
					if(bpProject!=null){
						projectNumber = bpProject.getProjectNumber();
						if ((bpProject.getOppositeType()).equals("company_customer")) {//企业
							Enterprise enterp = enterpriseService.getById(Integer.parseInt(bpProject.getOppositeID().toString()));
							shortName = enterp.getEnterprisename().trim();
						} else if ((bpProject.getOppositeType()).equals("person_customer")) {//个人
							Person person = personService.getById(Integer.parseInt(bpProject.getOppositeID().toString()));
							shortName = person.getName().trim();
						}
					}
				}
			} else if ("Guarantee".equals(businessType)) {//担保
				gloanProject = gLGuaranteeloanProjectService.get(Long.valueOf(pcontract.getProjId()));
				projectNumber = gloanProject.getProjectNumber();
				if ((gloanProject.getOppositeType()).equals("company_customer")) {//企业
					Enterprise enterp = enterpriseService.getById(Integer.parseInt(gloanProject.getOppositeID().toString()));
					shortName = enterp.getEnterprisename().trim();
				} else if ((gloanProject.getOppositeType()).equals("person_customer")) {//个人
					Person person = personService.getById(Integer.parseInt(gloanProject.getOppositeID().toString()));
					shortName = person.getName().trim();
				}
			} else if ("Financing".equals(businessType)) {//融资
				floanProject = flFinancingProjectService.get(Long.valueOf(pcontract.getProjId()));
				projectNumber = floanProject.getProjectNumber();
				if ((floanProject.getOppositeType()).equals("company_customer")) {//企业
					Enterprise enterp = enterpriseService.getById(floanProject.getOppositeID().intValue());
					shortName = enterp.getEnterprisename().trim();
				} else if ((floanProject.getOppositeType()).equals("person_customer")) {//个人
					Person person = personService.getById(floanProject.getOppositeID().intValue());
					shortName = person.getName().trim();
				}
			} else if ("ExhibitionBusiness".equals(businessType)) {//展期
				SlSuperviseRecord slSuperviseRecord = (SlSuperviseRecord) creditBaseDao.getById(SlSuperviseRecord.class, Long.valueOf(pcontract.getProjId()));
				sloanProject = slSmallloanProjectService.get(slSuperviseRecord.getProjectId());
				projectNumber = sloanProject.getProjectNumber();
				if ((sloanProject.getOppositeType()).equals("company_customer")) {//企业
					Enterprise enterp = enterpriseService.getById(Integer.parseInt(sloanProject.getOppositeID().toString()));
					shortName = enterp.getEnterprisename().trim();
				} else if ((sloanProject.getOppositeType()).equals("person_customer")) {//个人
					Person person = personService.getById(Integer.parseInt(sloanProject.getOppositeID().toString()));
					shortName = person.getName().trim();
				}
			} else if ("Pawn".equals(businessType)) {//典当
				pawnProject = (PlPawnProject) creditBaseDao.getById(PlPawnProject.class, Long.valueOf(pcontract.getProjId()));
				projectNumber = pawnProject.getProjectNumber();
				if ((pawnProject.getOppositeType()).equals("company_customer")) {//企业
					Enterprise enterp = enterpriseService.getById(Integer.parseInt(pawnProject.getOppositeID().toString()));
					shortName = enterp.getEnterprisename().trim();
				} else if ((pawnProject.getOppositeType()).equals("person_customer")) {//个人
					Person person = personService.getById(Integer.parseInt(pawnProject.getOppositeID().toString()));
					shortName = person.getName().trim();
				}
			} else if ("LeaseFinance".equals(businessType)) {//租赁
				flLeaseFinance = (FlLeaseFinanceProject) creditBaseDao.getById(FlLeaseFinanceProject.class, Long.valueOf(pcontract.getProjId()));
				projectNumber = flLeaseFinance.getProjectNumber();
				if ((flLeaseFinance.getOppositeType()).equals("company_customer")) {//企业
					Enterprise enterp = enterpriseService.getById(Integer.parseInt(flLeaseFinance.getOppositeID().toString()));
					shortName = enterp.getEnterprisename().trim();
				} else if ((flLeaseFinance.getOppositeType()).equals("person_customer")) {//个人
					Person person = personService.getById(Integer.parseInt(flLeaseFinance.getOppositeID().toString()));
					shortName = person.getName().trim();
				}
			}
			if(null!=bidPlanId && !"".equals(bidPlanId) && !"undefined".equals(bidPlanId)){
				PlBidPlan plan=plBidPlanService.get(Long.valueOf(bidPlanId));
				BpCustRelation re=null;
				if(null!=sloanProject){
					re=bpCustRelationService.getByLoanTypeAndId(sloanProject.getOppositeType().equals("person_customer")?"p_loan":"b_loan",sloanProject.getOppositeID());
				}else{
					re=bpCustRelationService.getByLoanTypeAndId(bpProject.getOppositeType().equals("person_customer")?"p_loan":"b_loan",bpProject.getOppositeID());
				}
				if(null!=re){
					BpCustMember member=bpCustMemberService.get(re.getP2pCustId());
					fileName=plan.getBidProNumber()+"_"+member.getLoginname()+"_"+pcontract.getContractNumber();
				}
			}
			// 生成合同和合同文件的名字
			if (conId != 0) {
				fileName = pcontract.getContractName();
				if (null == fileName) {
					fileName = shortName + "-"+ projectNumber + "-"+ templet.getText();
				} else {
					fileName = shortName + "-"+ projectNumber + "-"+ templet.getText();
				}
			} else {
				fileName = shortName + "-"+ projectNumber + "-"+ templet.getText();
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return fileName;
	}
	
	/**
	 * 修改附件方法(公用方法)
	 * @param listfileAttach
	 * @param filePath  附件文件路径
	 * @param fileName  附件文件名称
	 * @param ext
	 */
	public void changeFileAttach(List<FileAttach> listfileAttach,String filePath,String fileName,String ext){
		if (null!=listfileAttach) {
			for (FileAttach f : listfileAttach) {
				f.setFilePath(filePath);
				fileAttachService.merge(f);
			}
		} else {
			// 智维附件表操作start...为的是可以在线编辑
			FileAttach fileAttach = new FileAttach();
			fileAttach.setFileName(fileName);
			fileAttach.setFilePath(filePath);
			fileAttach.setCreatetime(new Date());
			fileAttach.setExt(ext);
			fileAttach.setFileType("attachFiles/uploads");
			fileAttach.setCreatorId(Long.parseLong(ContextUtil.getCurrentUser().getId()));
			fileAttach.setCreator(ContextUtil.getCurrentUser().getFullname());
			fileAttach.setDelFlag(0);
			fileAttach.setCsContractId(conId);
			fileAttachService.save(fileAttach);
			// 智维附件表操作end...
		}
	}
	
	/**
	 * TODO 导出系统要素
	 */
	public void outputExcel(){
		try {
			String name = "";
			String[] tableHeader ={"序号","","要素描述","要素编码"};
			int size=0;//用来存放不同类别下合同属性文件的个数,小贷_9/p2p_6
			if("SmallLoan".equals(businessType)){
				size=BaseConstants.LOANSIZE;
				name = "小额贷款系统要素表";
			}else{
				size=BaseConstants.P2PSIZE;
				name = "P2P系统要素表";
			}
			List list=BaseUtil.readPropertiesByType(businessType,true);
			export(size,list,tableHeader,name+"-"+DateUtil.getNowDateTime().substring(0,DateUtil.getNowDateTime().lastIndexOf(" ")));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 导出数据到excel
	 * @param  size  合同要素属性文件个数
	 * @param  list  系统要素集合
	 * @param  tableHeader  表头
	 * @param  headerStr  文件名称
	 * @return
	 * @throws Exception
	 */
	public static String export(int size,List list,String[] tableHeader,String headerStr) throws Exception {
		//设置表头：对Excel每列取名(必须根据你取的数据编写)
		short cellNumber = (short) tableHeader.length;//表的列数
		HSSFWorkbook workbook = new HSSFWorkbook(); //创建一个excel
		HSSFCell cell = null; //Excel的列
		HSSFRow row = null; //Excel的行
		HSSFFont font = workbook.createFont(); //设置字体
		
		HSSFSheet sheet = workbook.createSheet("sheet1"); //创建一个sheet
		HSSFHeader header = sheet.getHeader();// 设置sheet的头
		
		HSSFCellStyle style = workbook.createCellStyle(); //设置类型
		style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		style.setBorderLeft((short)1);     //左边框
		style.setBorderRight((short)1);    //右边框
		style.setBorderBottom((short)1);   //下边框
		
		HSSFCellStyle style1 = workbook.createCellStyle(); // 设置数据类型
		style1.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		
		try {
			//根据是否取出数据，设置header信息
			if (list.size() < 1) {
				header.setCenter("查无资料");
			} else {
				header.setCenter(headerStr);
				row = sheet.createRow(0);
				row.setHeight((short) 400);
				//1.设置表头
				for (int k = 0; k < cellNumber; k++) {
					cell = row.createCell(k);// 创建第0行第k列
					cell.setCellValue(tableHeader[k]);// 设置第0行第k列的值
					switch(k){
						case 0 : sheet.setColumnWidth(k, 2000);// 设置列的宽度
						break;
						default : sheet.setColumnWidth(k, 7000);// 设置列的宽度
					}
					font.setColor(HSSFFont.COLOR_NORMAL); // 设置单元格字体的颜色.
					font.setFontHeight((short) 350); // 设置单元字体高度
					font.setFontHeightInPoints((short)11);   //表头字体大小 
					font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);   //字体加粗
					style1.setFont(font);// 设置字体风格
					style1.setFillForegroundColor(HSSFColor.ORANGE.index);//添加前景色,内容看的清楚 
					style1.setBorderLeft((short)1);     //左边框
					style1.setBorderRight((short)1);    //右边框
					style1.setBorderTop(HSSFCellStyle.BORDER_DOUBLE);    //顶边框
					style1.setBorderBottom((short)1);//下边框
					cell.setCellStyle(style1);
				}
				//2.给excel填充数据
				/**
				 * 因为list集合中多了几条记录,所以i不能从0开始
				 * eg:借款人    15
				 * eg:投资人信息  20
				 * 前面的值是单元格合并后的内容
				 * 后面的是该分类下的合同要素个数
				 */
				Element et1=null;
				int temp=size;//9
				int temp2=0;//
				for (int i = size; i < list.size()+size; i++) {
					//1.创建第i + 1-size行
					row = sheet.createRow((short) (i + 1-size));// 创建第i+1-size行
					row.setHeight((short) 400);// 设置行高
					//2.创建i + 1-size行第一列(序号列,第0列)
					cell = row.createCell(0);// 创建第i+1-size行第0列
					cell.setCellValue(i+1-size);// 设置第i+1-size行第0列的值
					cell.setCellStyle(setAlign(workbook, 1));// 设置风格
					//3.创建第一列
					cell = row.createCell(1); // 创建第i+1行第1列
					cell.setCellStyle(setAlign(workbook, 1)); // 设置风格
					
					boolean flag=false;
					
					if(i==temp){
						et1 = (Element) list.get(temp2);// 获取对象
						cell.setCellValue(et1.getDepict().split("_")[0]);// 设置第i+1行第1列的值
						temp2=(temp2+Integer.valueOf(et1.getDepict().split("_")[1])+1);
						temp=(temp+Integer.valueOf(et1.getDepict().split("_")[1])+1);
						flag=true;
					}else{
						cell.setCellValue("");// 设置第i+1行第1列的值
					}
					
					Element et = (Element) list.get(i-size);// 获取对象
					if (et.getDepict() != null) {
						cell = row.createCell(2); // 创建第i+1行第1列
						if(flag){
							cell.setCellValue("");
						}else{
							cell.setCellValue(et.getDepict());// 设置第i+1行第1列的值
						}
						cell.setCellStyle(style); // 设置风格
					}else{
						cell = row.createCell(2);
						cell.setCellStyle(style);
					}
					// 由于下面的和上面的基本相同，就不加注释了
					if (et.getCode() != null) {
						cell = row.createCell(3);
						cell.setCellValue(et.getCode());
						cell.setCellStyle(style);
					}else{
						cell = row.createCell(3);
						cell.setCellStyle(style);
					}
					//合并单元格
					CellRangeAddress range=new CellRangeAddress(temp-size-Integer.valueOf(et1.getDepict().split("_")[1]),temp-size,1,1);
					sheet.addMergedRegion(range);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("导出Excel出错:"+e.getMessage());
		}
		HttpServletResponse response = null;// 创建一个HttpServletResponse对象
		OutputStream out = null;// 创建一个输出流对象
		try {
			response = ServletActionContext.getResponse();// 初始化HttpServletResponse对象
			out = response.getOutputStream();//
	        headerStr =new String( headerStr.getBytes("gb2312"), "ISO8859-1" );//headerString为中文时转码
			response.setHeader("Content-disposition", "attachment; filename="+ headerStr+".xls");// filename是下载的xls的名，建议最好用英文
			response.setContentType("application/msexcel;charset=GB2312");// 设置类型
			response.setHeader("Pragma", "No-cache");// 设置头
			response.setHeader("Cache-Control", "no-cache");// 设置头
			response.setDateHeader("Expires", 0);// 设置日期头
			workbook.write(out);
			out.flush();
			workbook.write(out);
		} catch (IOException e) {
			e.printStackTrace();
			logger.error("导出Excel的IO出错:"+e.getMessage());
		} finally {
			try {
				if (out != null) {
					out.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	private static HSSFCellStyle setAlign(HSSFWorkbook workbook ,int align){
		HSSFCellStyle style2 = workbook.createCellStyle(); // 设置类型
		style2.setBorderLeft((short)1);     //左边框
		style2.setBorderRight((short)1);    //右边框
		style2.setBorderBottom((short)1);   //下边框
		if(align == 1){
			style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		}else if(align == 2){
			style2.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
		}else{
			style2.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		}
		return style2;
	}
	
	public void saveContract(){
		String serverPath = super.getRequest().getRealPath("/");
		HttpServletRequest requrst = getRequest();
		String projId = requrst.getParameter("projId");//项目id
		String bidPlanId=requrst.getParameter("bidPlanId");//标id
		int tempId = Integer.parseInt(requrst.getParameter("templateId"));//模板id
		String businessType = requrst.getParameter("businessType");
		String remark = requrst.getParameter("searchRemark"); //该字段用来存放合同编号
		
		DocumentTemplet templet = documentTempletService.getById(tempId);
		
		//-----生成合同编号开始-----
		if(null!=projId){
			int count=1;
			List<ProcreditContract> list=procreditContractService.findListByBidPlanId(Long.valueOf(projId),htType);
			if(null!=list && list.size()>0){
				count+=list.size();
			}
//			BpFundProject project = bpFundProjectService.get(Long.valueOf(projId));
			String strDdate = DateUtil.getNowDateTime("yyyyMMdd");
			String contractNo = templet.getText() + "_"+strDdate;
			String number = "";
			remark = contractNo +"_";
			if(count<10){
				number = "00"+count;
			}else if(count>=10&&count<100){
				number = "0"+count;
			}else{
				number = String.valueOf(count);
			}
			remark = remark+number;
		}
		//-----生成合同编号结束-----
		try {
			//(1)查询对应的模板文件是否上传
			if (null!=templet && templet.getIsexist() && templet.getFileid()!=0) {
				FileForm fileF = fileFormService.getById(templet.getFileid());
				if (null!=fileF) {
					File file = new File(serverPath+ fileF.getFilepath());
					if (!file.exists()) {
						JsonUtil.responseJsonFailure();
						return;
					}
				} else {
					JsonUtil.responseJsonFailure();
					return;
				}
			} else {
				JsonUtil.responseJsonFailure();
				return;
			}
			//(2)向ProcreditContract表中增加数据
			ProcreditContract p = new ProcreditContract();
			p.setHtType(htType);
			p.setTemptId(tempId);
			p.setTemplateId(tempId);
			p.setContractNumber(remark);
			p.setContractCategoryText(htmcdName);
			p.setIsApply(false);//展期合同有用
			DocumentTemplet parentDoc=documentTempletService.getById(templet.getParentid());
			if(null!=parentDoc){
				p.setContractCategoryTypeText(parentDoc.getText());
			}
			if(null!=bidPlanId && !bidPlanId.equals("")){
				p.setBidPlanId(Long.valueOf(bidPlanId));
			}
			if ("thirdContract".equals(htType) || "thirdRalationContract".equals(htType) ||
				"ourThirdContract".equals(htType) || "baozContract".equals(htType)) {
				p.setMortgageId(thirdRalationId.intValue());// 反担保ID
			} else {
				p.setMortgageId(0);
				thirdRalationId = Long.parseLong("0");
			}
			
			// 如果合同是增加操作则执行以下
			procreditContractService.add(p,projId,businessType);
			JsonUtil.jsonFromObject(p, true);
		} catch (Exception e) {
			JsonUtil.responseJsonFailure();
			logger.error("添加合同报错:" + e.getMessage());
			e.printStackTrace();
		}
	}

	public String getProjId() {
		return projId;
	}

	public void setProjId(String projId) {
		this.projId = projId;
	}

	public int getDocumentId() {
		return documentId;
	}

	public void setDocumentId(int documentId) {
		this.documentId = documentId;
	}

	public int getTemplateId() {
		return templateId;
	}

	public void setTemplateId(int templateId) {
		this.templateId = templateId;
	}

	public int getConId() {
		return conId;
	}

	public void setConId(int conId) {
		this.conId = conId;
	}

	public String getContractType() {
		return contractType;
	}

	public void setContractType(String contractType) {
		this.contractType = contractType;
	}

	public String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}

	public Long getThirdRalationId() {
		return thirdRalationId;
	}

	public void setThirdRalationId(Long thirdRalationId) {
		this.thirdRalationId = thirdRalationId;
	}

	public String getHtlxdName() {
		return htlxdName;
	}

	public void setHtlxdName(String htlxdName) {
		this.htlxdName = htlxdName;
	}

	public String getHtmcdName() {
		return htmcdName;
	}

	public void setHtmcdName(String htmcdName) {
		this.htmcdName = htmcdName;
	}

	public String getHtType() {
		return htType;
	}

	public void setHtType(String htType) {
		this.htType = htType;
	}

	public Long getClauseId() {
		return clauseId;
	}

	public void setClauseId(Long clauseId) {
		this.clauseId = clauseId;
	}
}