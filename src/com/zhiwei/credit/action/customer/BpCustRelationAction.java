package com.zhiwei.credit.action.customer;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.credit.core.creditUtils.ExcelHelper;
import com.zhiwei.credit.core.creditUtils.MD5;
import com.zhiwei.credit.model.creditFlow.creditAssignment.customer.CsInvestmentperson;
import com.zhiwei.credit.model.creditFlow.customer.cooperation.CsCooperationEnterprise;
import com.zhiwei.credit.model.creditFlow.customer.cooperation.CsCooperationPerson;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.Enterprise;
import com.zhiwei.credit.model.creditFlow.customer.person.Person;
import com.zhiwei.credit.model.customer.BpCustRelation;
import com.zhiwei.credit.model.p2p.BpCustMember;
import com.zhiwei.credit.model.system.AppUser;
import com.zhiwei.credit.service.creditFlow.auto.PlBidAutoService;
import com.zhiwei.credit.service.creditFlow.creditAssignment.bank.ObSystemAccountService;
import com.zhiwei.credit.service.creditFlow.creditAssignment.customer.CsInvestmentpersonService;
import com.zhiwei.credit.service.creditFlow.customer.cooperation.CsCooperationEnterpriseService;
import com.zhiwei.credit.service.creditFlow.customer.cooperation.CsCooperationPersonService;
import com.zhiwei.credit.service.creditFlow.customer.enterprise.EnterpriseService;
import com.zhiwei.credit.service.creditFlow.customer.person.PersonService;
import com.zhiwei.credit.service.customer.BpCustRelationService;
import com.zhiwei.credit.service.p2p.BpCustMemberService;
import com.zhiwei.credit.service.p2p.WebFinanceApplyUploadsService;
import com.zhiwei.credit.service.system.AppUserService;
import com.zhiwei.credit.util.MD5_T;
/**
 * 
 * @author 
 *
 */
public class BpCustRelationAction extends BaseAction{
	@Resource
	private BpCustRelationService bpCustRelationService;
	@Resource
	private  BpCustMemberService bpCustMemberService;
	@Resource
	private PersonService personService;
	@Resource
	private EnterpriseService enterpriseService;
	@Resource
	private CsInvestmentpersonService csInvestmentpersonService;
	@Resource
	private WebFinanceApplyUploadsService webFinanceApplyUploadsService;
	@Resource
	private PlBidAutoService plBidAutoService;
	private BpCustRelation bpCustRelation;
	@Resource
	private CsCooperationPersonService csCooperationPersonService;
	@Resource
	private CsCooperationEnterpriseService csCooperationEnterpriseService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private ObSystemAccountService obSystemAccountService;
	
	private Long relationId;

	public Long getRelationId() {
		return relationId;
	}

	public void setRelationId(Long relationId) {
		this.relationId = relationId;
	}

	public BpCustRelation getBpCustRelation() {
		return bpCustRelation;
	}

	public void setBpCustRelation(BpCustRelation bpCustRelation) {
		this.bpCustRelation = bpCustRelation;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BpCustRelation> list= bpCustRelationService.getAll(filter);
		
		Type type=new TypeToken<List<BpCustRelation>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
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
				bpCustRelationService.remove(new Long(id));
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
		BpCustRelation bpCustRelation=bpCustRelationService.get(relationId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bpCustRelation));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}

	
	/**
	 * 系统用户开通P2P账号
	 * @return
	 */
	public String saveP2P(){
		String userId =this.getRequest().getParameter("userId");
		String fullname =this.getRequest().getParameter("fullname");//p2p_truename
		String p2pAccount =this.getRequest().getParameter("p2pAccount");//p2p账号
		String password =this.getRequest().getParameter("password");//密码
		String email =this.getRequest().getParameter("email");//邮箱
		String mobile =this.getRequest().getParameter("mobile");//手机号
		String plainpassword =this.getRequest().getParameter("plainpassword");//推荐码
		String type =this.getRequest().getParameter("type");//标识是开通还是绑定(0开通,1绑定)
		String memberId =this.getRequest().getParameter("memberId");
		AppUser appUser = appUserService.get(Long.valueOf(userId));
		try{
			BpCustMember cust=null;
			if(type.equals("0")){
				cust=new BpCustMember();
				cust.setLoginname(p2pAccount);//用户名
				MD5 md5 = new MD5();
				cust.setPassword(md5.md5(password, "UTF-8"));//密码
				cust.setRegistrationDate(new Date());//日期
				cust.setTruename(fullname);//真实姓名
				cust.setTelphone(mobile);//手机号
				cust.setEmail(email);//邮箱
				cust.setPlainpassword(plainpassword);
				cust=bpCustMemberService.save(cust);
				if(null==appUser.getMobile() || "".equals(appUser.getMobile())){
					appUser.setMobile(mobile);
				}
			}else{
				cust=bpCustMemberService.get(Long.valueOf(memberId));
				BpCustRelation b=bpCustRelationService.getByTypeAndP2pCustId(cust.getId(), "p_staff");
				if(null!=b){
					setJsonString("{success:false,msg:'绑定p2p账号失败，该p2p账号已被其他员工绑定！'}");
					return SUCCESS;
				}
			//	cust.setPlainpassword(plainpassword);
				cust=bpCustMemberService.merge(cust);
				if(null==appUser.getMobile() || "".equals(appUser.getMobile())){
					appUser.setMobile(cust.getTelphone());
				}
			}
			appUserService.merge(appUser);
			bpCustRelation=new BpCustRelation();
			bpCustRelation.setOfflineCusId(Long.valueOf(userId));
			bpCustRelation.setOfflineCustType("p_staff");
			bpCustRelation.setP2pCustId(cust.getId());
			if(bpCustRelation.getRelationId()==null){
				bpCustRelationService.save(bpCustRelation);
			}
			if(type.equals("0")){
				setJsonString("{success:true,msg:'开通P2P账号成功!!!'}");
			}else{
				setJsonString("{success:true,msg:'绑定P2P账号成功!!!'}");
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error("开通/绑定系统用户P2P账号出错:" + e.getMessage());
			setJsonString("{success:false,msg:'开通/绑定P2P账号失败!!!'}");
		}
		return SUCCESS;
	}
	
	/**
	 * 修改p2p账号的状态
	 * @return
	 */
	public String changeP2PStatus(){
		try{
			String bpCustMemberId=this.getRequest().getParameter("bpCustMemberId");
			String isForbidden=this.getRequest().getParameter("isForbidden");
			BpCustMember cust=bpCustMemberService.get(Long.valueOf(bpCustMemberId));
			cust.setIsForbidden(Integer.valueOf(isForbidden));
			bpCustMemberService.merge(cust);
			setJsonString("{success:true,msg:'状态修改成功!!!'}");
		}catch(Exception e){
			e.printStackTrace();
			setJsonString("{success:false,msg:'状态修改失败!!!'}");
			logger.error("修改系统用户P2P账号状态出错:" + e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 判断手机号是否存在,判断P2P账号是否存在
	 * @return
	 */
	public String isExist(){
		QueryFilter filter=new QueryFilter(this.getRequest());
		List<BpCustMember> list=bpCustMemberService.getAll(filter);
		if(null!=list && list.size()>0){
			setJsonString("{success:true,memberId:"+list.get(0).getId()+"}");
		}else{
			setJsonString("{success:false}");
		}
		return SUCCESS;
	}
	
	/**
	 * 导出系统用户信息及p2p账号信息
	 */
	public void exportExcel(){
		//0代表导出推荐码，1代表导出推荐个数，2代表导出推荐业绩
		String type=this.getRequest().getParameter("type");
		String[] tableHeader=null;
		if("0".equals(type)){
			tableHeader = new String[]{"序号","姓名","工号","ERP账号","P2P账号","推荐码","手机号","邮箱"};
		}else if("1".equals(type)){
			tableHeader = new String[]{"序号","姓名","推荐码","手机号","邮箱","开通日期","一级推荐个数","二级推荐个数"};
		}else if("2".equals(type)){
			tableHeader = new String[]{"序号","姓名","推荐码","手机号","邮箱","开通日期","一级推荐金额","二级推荐金额"};
		}
		try{
			PageBean<AppUser> pageBean = new PageBean<AppUser>(null,null,getRequest());
			appUserService.getUserList(pageBean);
			String headerStr="";
			if("0".equals(type)){
				headerStr="系统账户列表";
			}else if("1".equals(type)){
				headerStr="推荐个数列表";
			}else if("2".equals(type)){
				headerStr="推荐业绩列表";
			}
			ExcelHelper.export(pageBean.getResult(),tableHeader,headerStr);
		}catch(Exception e){
			e.printStackTrace();
			logger.error("导出系统账号出错:" + e.getMessage());
		}
	}
	
	/**
	 * 导出线下推荐业绩明细
	 */
	public void exportDetailExcel(){
		//one代表一级 two代表二级
		String type=this.getRequest().getParameter("type");
		String[] tableHeader=null;
		if("one".equals(type)){
			tableHeader = new String[]{"序号","客户姓名","身份证号","投资次数","投资日期","投资类型","投资项目","金额","期限","一级推荐人","一级推荐码","所属一级部门","所属二级部门","角色"};
		}else{
			tableHeader = new String[]{"序号","客户姓名","身份证号","投资次数","投资日期","投资类型","投资项目","金额","期限","二级推荐人","二级推荐码","所属一级部门","所属二级部门","角色"};
		}
		try{
			PageBean<AppUser> pageBean = new PageBean<AppUser>(null,null,getRequest());
			appUserService.userPerformanceList(pageBean);
			String headerStr="";
			if("one".equals(type)){
				headerStr="线下一级业绩明细表";
			}else{
				headerStr="线下二级业绩明细表";
			}
			ExcelHelper.export(pageBean.getResult(),tableHeader,headerStr);
		}catch(Exception e){
			e.printStackTrace();
			logger.error("导出线下推荐业绩明细 出错:" + e.getMessage());
		}
	}
	
	/**2015-12-02   huangguohui
	 * 绑定p2p用户
	 * @return
	 */
	public String bindUser(){
		String username =this.getRequest().getParameter("username");
		//客户类型
		String customerType = this.getRequest().getParameter("customerType");
		//所选用户ID
		String userId = this.getRequest().getParameter("userId");
		//(1).检查是否存在用户
		boolean flag = true;
		if(null==username || username.equals("")){
			setJsonString("{success:false,msg:'用户名不能为空'}");
			flag = false;
		}
		//(2).判断用户名是否存在
		QueryFilter filter3=new QueryFilter(this.getRequest());
		filter3.addFilter("Q_loginname_S_EQ", username);
		List<BpCustMember> list3 =bpCustMemberService.getAll(filter3);
		String result="";
		if(null!=list3 && list3.size()>0){
			//(3).判断该p2p账号类型是否和当前erp账号类型相同(既个人只能绑定个人)
			if("b_loan".equals(customerType) || "b_cooperation".equals(customerType)){//企业客户、企业债权
				filter3.addFilter("Q_customerType_N_EQ",1);
				result="{success:false,msg:'请填写企业/企业债权p2p账号!!!'}";
			}else if("b_guarantee".equals(customerType)){//担保机构
				filter3.addFilter("Q_customerType_N_EQ",2);
				filter3.addFilter("Q_thirdPayFlagId_NOTNULL",null);
				result="{success:false,msg:'请填写已经开通了第三方的p2p账号!!!'}";
			}else{
				filter3.addFilter("Q_customerType_N_EQ",0);
				result="{success:false,msg:'请填写个人p2p账号!!!'}";
			}
			list3 =bpCustMemberService.getAll(filter3);
			if(null==list3 || list3.size()<=0){
				setJsonString(result);
				flag = false;
			}
		}else{
			setJsonString("{success:false,msg:'用户名不存在,请核实！'}");
			flag = false;
		}
		//(4).判断该用户是否已绑定p2p账号
		if(flag){
			QueryFilter filter0=new QueryFilter();
			filter0.addFilter("Q_offlineCustType_S_EQ", customerType);
			filter0.addFilter("Q_offlineCusId_L_EQ", userId);
			List<BpCustRelation> list0 =bpCustRelationService.getAll(filter0);
			if(list0!=null&&list0.size()>0){
				setJsonString("{success:false,msg:'该用户已绑定P2P账号'}");
				flag = false;
			}
		}
		//(5).验证通过,最终新增关联关系
		if(flag){
			//维护关系表
			BpCustMember bpCustMember = bpCustMemberService.getMemberUserName(username);
			BpCustRelation b=bpCustRelationService.getByTypeAndP2pCustId(bpCustMember.getId(), customerType);
			if(null!=b){
				setJsonString("{success:false,msg:'该P2P账号已被其他同类客户绑定'}");
			}
			else{
			bpCustRelation=new BpCustRelation();
			bpCustRelation.setOfflineCusId(Long.valueOf(userId));
			bpCustRelation.setOfflineCustType(customerType);
			bpCustRelation.setP2pCustId(bpCustMember.getId());
			if(bpCustRelation.getRelationId()==null){
				bpCustRelationService.save(bpCustRelation);
				setJsonString("{success:true,msg:'绑定成功'}");
			}
			if(customerType.equals("p_cooperation") || customerType.equals("p_financial")){//个人债权客户 || 个人理财顾问
				CsCooperationPerson csCooperationPerson = csCooperationPersonService.get(Long.valueOf(userId));
				csCooperationPerson.setIsOpenP2P("0");
				csCooperationPersonService.save(csCooperationPerson);
			}else if(customerType.equals("b_cooperation") || customerType.equals("b_guarantee")){//企业债权客户 || 担保机构客户
				CsCooperationEnterprise csCooperationEnterprise = csCooperationEnterpriseService.get(Long.valueOf(userId));
				csCooperationEnterprise.setIsOpenP2P("0");
				csCooperationEnterpriseService.save(csCooperationEnterprise);
			}
		  }
		}
		
		return SUCCESS;
	}
	
}
