package com.zhiwei.credit.action.p2p;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.util.ContextUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.core.web.paging.PagingBean;
import com.zhiwei.credit.model.creditFlow.bonusSystem.gradeSet.MemberGradeSet;
import com.zhiwei.credit.model.creditFlow.customer.person.Person;
import com.zhiwei.credit.model.creditFlow.customer.person.PersonRelation;
import com.zhiwei.credit.model.creditFlow.customer.person.Spouse;
import com.zhiwei.credit.model.customer.BpCustRelation;
import com.zhiwei.credit.model.p2p.BpCustMember;
import com.zhiwei.credit.service.creditFlow.bonusSystem.gradeSet.MemberGradeSetService;
import com.zhiwei.credit.service.creditFlow.creditAssignment.bank.ObSystemAccountService;
import com.zhiwei.credit.service.creditFlow.customer.person.PersonRelationService;
import com.zhiwei.credit.service.creditFlow.customer.person.PersonService;
import com.zhiwei.credit.service.creditFlow.customer.person.SpouseService;
import com.zhiwei.credit.service.creditFlow.multiLevelDic.AreaDicService;
import com.zhiwei.credit.service.customer.BpCustRelationService;
import com.zhiwei.credit.service.p2p.BpCustMemberService;
import com.zhiwei.credit.util.MD5;

/**
 * 
 * @author 
 *
 */
public class BpCustMemberAction extends BaseAction{
	@Resource
	private BpCustMemberService bpCustMemberService;
	@Resource
	private ObSystemAccountService obSystemAccountService;
	@Resource
	private PersonService personService;
	@Resource
	private BpCustRelationService bpCustRelationService;
	@Resource
	private PersonRelationService personRelationService;
	@Resource
	private AreaDicService areaDicService;
	@Resource
	private MemberGradeSetService memberGradeSetService;
	@Resource
	private SpouseService spouseService;
	private BpCustMember bpCustMember;
	
	private  String recommandPerson;
	
	
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BpCustMember getBpCustMember() {
		return bpCustMember;
	}

	public void setBpCustMember(BpCustMember bpCustMember) {
		this.bpCustMember = bpCustMember;
	}
	
	/**
	 * 刷新推荐用户数据
	 * svn:songwj
	 */
	public  void  refreshUserNum(){
		List<BpCustMember> list = bpCustMemberService.getBpCustMemberList();
		if(list!=null){
			for(int i=0;i<list.size();i++){
				BpCustMember bp= null;
				bp = bpCustMemberService.updateNum(list.get(i).getPlainpassword());
				if(list.get(i).getNum() != null && !"".equals(list.get(i).getNum())){
					int  num1 = 0;
					num1 = Integer.valueOf(list.get(i).getNum());
					bp.setRecommandNum(num1);
				}
				if(list.get(i).getNum2() != null && !"".equals(list.get(i).getNum2())){
					int  num2 = 0;
					num2 = Integer.valueOf(list.get(i).getNum2());
					bp.setSecondRecommandNum(num2);
				}
				
				bpCustMemberService.merge(bp);
			}
		}
		listCommand();
	}
	
	public  String plainpassword;
	
	
	public String getPlainpassword() {
		return plainpassword;
	}

	public void setPlainpassword(String plainpassword) {
		this.plainpassword = plainpassword;
	}

	/**
	 * 查询单个人推荐的会员信息
	 * 1、累计充值金额  totalRecharge     1
	 * 2、累计投资金额  totalInvestMoney  4
	 * 3、累计收益      totalprofitMoney  3
	 * 4、累计取现金额  totalEnchashment  2
	 * @return
	 */
	public String 	listRecommandPerson(){
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		
		
		List<BpCustMember> list = bpCustMemberService.getBpCustMemberByrecommandPerson(plainpassword);
		if(list  != null){
			for(int i=0;i<list.size();i++){
			 
				BpCustMember  bpCustMember = new BpCustMember();
				bpCustMember = list.get(i);
				bpCustMember = obSystemAccountService.getAccountSumMoney(bpCustMember);
			}
		}
		
		Type type=new TypeToken<List<BpCustMember>>(){}.getType();
		/*for(int i =0;i<list.size();i++){
			System.out.println(" i   = "+(i+1));
			System.out.println("list.size()  = "+list.size());
			System.out.println(" 累计收益金额   = "+list.get(i).getAllInterest());
			System.out.println(" 累计充值金额    = "+list.get(i).getTotalRecharge());
		}*/
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).
		append(",result:");
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString=buff.toString();
		return SUCCESS;
		
	}
	
	 /**
	  * 刷新要求数据总量
	  * SVN：songwj
	  * @return
	  */
	public String listCommand(){
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		//将数据转成JSON格式

		
		@SuppressWarnings("unused")
		QueryFilter filter=new QueryFilter(getRequest());

		List<BpCustMember> list1=bpCustMemberService.getAllList1(this.getRequest(),start,limit);
		List<BpCustMember> list2=bpCustMemberService.getAllList1(this.getRequest(),null,null);
		//List<BpCustMember> list1= bpCustMemberService.getAll(filter);
		List<BpCustMember> list = new ArrayList<BpCustMember>();
		if(list1!=null){
			for(int i=0;i<list1.size();i++){
				BpCustMember bpCustMember = list1.get(i);
				if(bpCustMember.getSex()!=null){
					int sex = bpCustMember.getSex();
					if(sex==0){
						bpCustMember.setSexname("男");
					}else{
						bpCustMember.setSexname("女");
					}
				}
				if(bpCustMember.getCardtype()!=null){
					int cardType = bpCustMember.getCardtype();
					if(cardType==0){
						bpCustMember.setCardtypename("身份证");
					}
				}
				list.add(bpCustMember);
			}
		} 
		
//		Type type=new TypeToken<List<BpCustMember>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		//.append(filter.getPagingBean().getTotalItems()).append(",result:");
		.append(list2!=null?list2.size():0).append(",result:");
		//Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(list1));
		buff.append("}");
		jsonString=buff.toString();
		return SUCCESS;
	}


	/**
	 * 显示列表
	 */
	public String list(){
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		//将数据转成JSON格式

		
		@SuppressWarnings("unused")
		QueryFilter filter=new QueryFilter(getRequest());

		List<BpCustMember> list1=bpCustMemberService.getAllList(this.getRequest(),start,limit);
		List<BpCustMember> list2=bpCustMemberService.getAllList(this.getRequest(),null,null);
		//List<BpCustMember> list1= bpCustMemberService.getAll(filter);
		List<BpCustMember> list = new ArrayList<BpCustMember>();
		if(list1!=null){
			for(int i=0;i<list1.size();i++){
				BpCustMember bpCustMember = list1.get(i);
				if(bpCustMember.getSex()!=null){
					int sex = bpCustMember.getSex();
					if(sex==0){
						bpCustMember.setSexname("男");
					}else{
						bpCustMember.setSexname("女");
					}
				}
				if(bpCustMember.getCardtype()!=null){
					int cardType = bpCustMember.getCardtype();
					if(cardType==0){
						bpCustMember.setCardtypename("身份证");
					}
				}else{
					bpCustMember.setCardtypename("身份证");
				}
				//查询会员等级
				if(bpCustMember.getScore()!=null){
					MemberGradeSet memberGradeSet=memberGradeSetService.findByUserScore(bpCustMember.getScore());
					if(memberGradeSet!=null){
						bpCustMember.setLevelMark(memberGradeSet.getLevelMark()!=null?memberGradeSet.getLevelMark():null);
					}

				}
				list.add(bpCustMember);
			}
		}
		
		Type type=new TypeToken<List<BpCustMember>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		//.append(filter.getPagingBean().getTotalItems()).append(",result:");
		.append(list2!=null?list2.size():0).append(",result:");
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString=buff.toString();
		return SUCCESS;
	}
	/**2014-08-06
	 * 显示该用户在p2p上传的信息
	 * @return
	 */
	public String getCustMem(){
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		long id=Long.parseLong(getRequest().getParameter("id"));
		BpCustMember bpCustMember=bpCustMemberService.get(id);
		if(bpCustMember!=null){
			if(bpCustMember.getHavehouse()==0){
				bpCustMember.setStrHouse("无");
			}else if(bpCustMember.getHavehouse()==1){
				bpCustMember.setStrHouse("有");
			}else{
				bpCustMember.setStrHouse("");
			}
			if(bpCustMember.getHavehouseloan()==0){
				bpCustMember.setStrHouseLoan("无");
			}else if(bpCustMember.getHavehouseloan()==1){
				bpCustMember.setStrHouseLoan("有");
			}else{
				bpCustMember.setStrHouseLoan("");
			}
			if(bpCustMember.getHavecar()==0){
				bpCustMember.setStrCar("无");
			}else if(bpCustMember.getHavecar()==1){
				bpCustMember.setStrCar("有");
			}else{
				bpCustMember.setStrCar("");
			}
			if(bpCustMember.getHavecarloan()==0){
				bpCustMember.setStrCarLoan("无");
			}else if(bpCustMember.getHavecarloan()==1){
				bpCustMember.setStrCarLoan("有");
			}else{
				bpCustMember.setStrCarLoan("");
			}
			/*if("未婚".equals(bpCustMember.getMarry())){
				bpCustMember.setStrMarry("未婚");
			}else if("已婚".equals(bpCustMember.getMarry())){
				bpCustMember.setStrMarry("已婚");
			}else{
				bpCustMember.setStrMarry("");
			}*/
			if(bpCustMember.getMarry()==0){
				bpCustMember.setStrMarry("未婚");
			}else if(bpCustMember.getMarry()==1){
				bpCustMember.setStrMarry("已婚");
			}else{
				bpCustMember.setStrMarry("");
			}
			if(bpCustMember.getHavechildren()==0){
				bpCustMember.setStrChildren("无");
			}else if(bpCustMember.getHavechildren()==1){
				bpCustMember.setStrChildren("有");
			}else{
				bpCustMember.setStrChildren("");
			}
		}
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bpCustMember));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	
	/**
	 * 批量删除
	 * @return
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				BpCustMember bpCustMember = bpCustMemberService.get(new Long(id));
				bpCustMember.setIsDelete(1);
				bpCustMemberService.merge(bpCustMember);
				//bpCustMemberService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 批量禁用
	 * @return
	 */
	public String multiForbi(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				BpCustMember bpCustMember = bpCustMemberService.get(new Long(id));
				String isForBidType=this.getRequest().getParameter("isForBidType");
				if(isForBidType!=null&&!"".equals(isForBidType)){
					bpCustMember.setIsForbidden(Integer.parseInt(isForBidType));//是否被禁用
				}
				bpCustMemberService.merge(bpCustMember);
				//bpCustMemberService.remove(new Long(id));
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
		long id=Long.parseLong(this.getRequest().getParameter("id"));
		BpCustMember bpCustMember=bpCustMemberService.get(id);
		if(bpCustMember.getHavecar()!=null){
			if(bpCustMember.getHavehouse()==0){
				bpCustMember.setStrHouse("无");
			}else if(bpCustMember.getHavehouse()==1){
				bpCustMember.setStrHouse("有");
			}else{
				bpCustMember.setStrHouse("");
			}
		}
		if(bpCustMember.getHavecarloan()!=null){
			if(bpCustMember.getHavehouseloan()==0){
				bpCustMember.setStrHouseLoan("无");
			}else if(bpCustMember.getHavehouseloan()==1){
				bpCustMember.setStrHouseLoan("有");
			}else{
				bpCustMember.setStrHouseLoan("");
			}
		}
		
		if(bpCustMember.getHavecar()!=null){
			if(bpCustMember.getHavecar()==0){
				bpCustMember.setStrCar("无");
			}else if(bpCustMember.getHavecar()==1){
				bpCustMember.setStrCar("有");
			}else{
				bpCustMember.setStrCar("");
			}
		}
		
		if(bpCustMember.getMarry()!=null){
			/*if("未婚".equals(bpCustMember.getMarry())){
				bpCustMember.setStrMarry("未婚");
			}else if("已婚".equals(bpCustMember.getMarry())){
				bpCustMember.setStrMarry("已婚");
			}else{
				bpCustMember.setStrMarry("");
			}*/
			if(bpCustMember.getMarry()==0){
				bpCustMember.setStrMarry("未婚");
			}else if(bpCustMember.getMarry()==1){
				bpCustMember.setStrMarry("已婚");
			}else{
				bpCustMember.setStrMarry("");
			}
		}
		if(bpCustMember.getHavechildren()!=null){
			if(bpCustMember.getHavechildren()==0){
				bpCustMember.setStrChildren("无");
			}else if(bpCustMember.getHavechildren()==1){
				bpCustMember.setStrChildren("有");
			}else{
				bpCustMember.setStrChildren("");
			}
		}
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(bpCustMember));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bpCustMember.getId()==null){
			bpCustMemberService.save(bpCustMember);
		}else{
			BpCustMember orgBpCustMember=bpCustMemberService.get(bpCustMember.getId());
			try{
				BeanUtil.copyNotNullProperties(orgBpCustMember, bpCustMember);
				bpCustMemberService.save(orgBpCustMember);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	public String updatePassword(){
		String id = getRequest().getParameter("custId");
		String password = getRequest().getParameter("password");
		if(null==id||"".equals(id)||null==password||"".equals(password)){
			setJsonString("{success:true,msg:'操作错误!'}");
		}else{
			BpCustMember member = bpCustMemberService.get(Long.parseLong(id));
			if(null==member){
				setJsonString("{success:true}");
			}else{
				MD5 md5 = new MD5();
				member.setPassword(md5.md5(password, "utf-8"));
				bpCustMemberService.merge(member);
				setJsonString("{success:true,msg:'操作成功'}");
			}
		}
		return SUCCESS;
	}
	/**
	 * 
	 * 注册用户
	 */
	public String custList(){
		try{
			PagingBean pb=new PagingBean(start,limit);
			List list=bpCustMemberService.cusrNumList(this.getRequest(), pb);
			Long count=bpCustMemberService.cusrNumSize(this.getRequest());
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(count).append(",result:[");
			if(list!=null&&list.size()>0){
				for(int i=0;i<list.size();i++){
					Object[] obj=(Object[]) list.get(i);
					buff.append("{\"p2pId\":'");
					if(null!=obj[0]){
						buff.append(obj[0]);
					}
					buff.append("',\"personId\":'");
					if(null!=obj[1]){
						buff.append(obj[1]);
					}
					buff.append("',\"loginname\":'");
					if(null!=obj[2]){
						buff.append(obj[2]);
					}
					buff.append("',\"p2pCardNum\":'");
					if(null!=obj[3]){
						buff.append(obj[3]);
					}
					buff.append("',\"cardtype\":'");
					if(null!=obj[4]){
						buff.append(obj[4]);
					}
					buff.append("',\"cardtypeValue\":'");
					if(null!=obj[5]){
						buff.append(obj[5]);
					}
					buff.append("',\"cardNum\":'");
					if(null!=obj[6]){
						buff.append(obj[6]);
					}
					buff.append("',\"truename\":'");
					if(null!=obj[7]){
						buff.append(obj[7]);
					}
					buff.append("',\"name\":'");
					if(null!=obj[8]){
						buff.append(obj[8]);
					}
					buff.append("',\"telphone\":'");
					if(null!=obj[9]){
						buff.append(obj[9]);
					}
					buff.append("',\"cellphone\":'");
					if(null!=obj[10]){
						buff.append(obj[10]);
					}
					buff.append("',\"email\":'");
					if(null!=obj[11]){
						buff.append(obj[11]);
					}
					buff.append("',\"selfemail\":'");
					if(null!=obj[12]){
						buff.append(obj[12]);
					}
					buff.append("'},");
				}
			}
			
			if(null!=list && list.size()>0){
				buff.deleteCharAt(buff.length()-1);
			}
			buff.append("]}");
			jsonString=buff.toString();
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String getPersonInfo(){
		try{
			BpCustMember member = bpCustMemberService.get(id);
			if(null!=member){
				Person person=personService.queryPersonCardnumber(member.getCardcode());
				if(null!=person){
					jsonString="{success:true,msg:'该客户已存在，请手动绑定P2P账户'}";
				}else{
					jsonString="{success:true}";
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String savePersonInfo(){
		try{
			BpCustMember member = bpCustMemberService.get(id);
			if(null!=member){
				Person person=new Person();
				person.setName(member.getTruename());
				person.setCardtype(309);
				person.setCardnumber(member.getCardcode());
				person.setCellphone(member.getTelphone());
				person.setSelfemail(member.getEmail());
				person.setCompanyId(Long.valueOf("1"));
				person.setCreatedate(new Date());
				person.setCreater(ContextUtil.getCurrentUser().getFullname());
				person.setBelongedId(ContextUtil.getCurrentUserId().toString());
				person.setCreaterId(ContextUtil.getCurrentUserId());
				person.setMarry(member.getMarry());
				person.setSex(member.getSex());
				person.setPostaddress(member.getRelationAddress());
				person.setDgree(member.getCollegeDegree());
				personService.save(person);
				BpCustRelation bpCustRelation=new BpCustRelation();
				bpCustRelation.setP2pCustId(id);
				bpCustRelation.setOfflineCusId(person.getId().longValue());
				bpCustRelation.setOfflineCustType("p_loan");
				bpCustRelationService.merge(bpCustRelation);
				jsonString="{success:true}";
				
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	public String updatePersonInfo(){
		try{
			BpCustMember member = bpCustMemberService.get(id);
			if(null!=member){
				String personId=this.getRequest().getParameter("personId");
				if(null!=personId && !personId.equals("")){
					Person p=personService.getById(Integer.valueOf(personId));
					if(null!=p){
						p.setName(member.getTruename());
						p.setSex(member.getSex());
						p.setCardtype(309);
						p.setCardnumber(member.getCardcode());
						p.setTelphone(member.getHomePhone());
						p.setCellphone(member.getTelphone());
						p.setFax(member.getFax());
						p.setPostcode(member.getPostCode());
						p.setPostaddress(member.getRelationAddress());
						if(null!=member.getCollegeDegree()){
							p.setDgree(member.getCollegeDegree());
						}
						if(member.getMarry()!=null){
							if(member.getMarry()==0){
								member.setStrMarry("未婚");
							}else if(member.getMarry()==1){
								member.setStrMarry("已婚");
							}else if(member.getMarry()==2){
								member.setStrMarry("离异");
							}else if(member.getMarry()==3){
								member.setStrMarry("丧偶");
							}else{
								member.setStrMarry("");
							}
						}
						
						p.setBirthday(member.getBirthday());
						if(null!=member.getNation()){
							p.setNationality(member.getNation());
						}	
						if(null!=member.getLiveProvice()){
						p.setParenthukou(member.getLiveProvice().toString());
						}
						if(null!=member.getLiveCity()){
							p.setHukou(member.getLiveCity().toString());
						}
						if(null!=member.getNativePlaceCity()){
							p.setHomeland(member.getNativePlaceCity());
						}
						p.setCurrentcompany(member.getHireCompanyname());
						if(null!=member.getHirePosition()){
							p.setJob(member.getHirePosition());
						}
						p.setGraduationunversity(member.getCollegename());
						if(null!=member.getHireStartyear()){
							p.setJobstarttime(member.getHireStartyear());
						}
						if(null!=member.getWebshopStartYear()){
							p.setWebstarttime(member.getWebshopStartYear());
						}
						if(null!=member.getBossStartYear()){
							p.setBossstarttime(member.getBossStartYear());
						}
						if(null!=member.getTeacherStartYear()){
							p.setTeacherStartYear(member.getTeacherStartYear().toString());
						}
						if(null!=member.getTeacherAddress()){
							p.setTeacherAddress(member.getTeacherAddress());
						}
						if(null!=member.getTeacherCity()){
							p.setTeacherCity(member.getTeacherCity());
						}
						if(null!=member.getTeacherCompanyName()){
							p.setTeacherCompanyName(member.getTeacherCompanyName());
						}
						if(null!=member.getTeacherCompanyPhone()){
							p.setTeacherCompanyPhone(member.getTeacherCompanyPhone());
						}
						if(null!=member.getTeacherEmail()){
							p.setTeacherEmail(member.getTeacherEmail());
						}
						if(null!=member.getTeacherPosition()){
							p.setTeacherPosition(member.getTeacherPosition());
						}
						if(null!=member.getTeacherMonthlyIncome()){
							p.setTeacherMonthlyIncome(member.getTeacherMonthlyIncome());
						}
						//网店信息注入
						if(null!=member.getWebshopMonthlyIncome()){
							p.setWebshopMonthlyIncome(member.getWebshopMonthlyIncome());
						}
						if(null!=member.getWebshopAddress()){
							p.setWebshopAddress(member.getWebshopAddress());
						}
						if(null!=member.getWebshopCity()){
							p.setWebshopCity(member.getWebshopCity());
						}
						if(null!=member.getWebshopEmail()){
							p.setWebshopEmail(member.getWebshopEmail());
						}
						if(null!=member.getWebshopName()){
							p.setWebshopName(member.getWebshopName());
						}
						if(null!=member.getWebshopPhone()){
							p.setWebshopPhone(member.getWebshopPhone());
						}
						if(null!=member.getWebshopProvince()){
							p.setWebshopProvince(member.getWebshopProvince());
						}
						if(null!=member.getWebshopStartYear()){
							p.setWebshopStartYear(member.getWebshopStartYear());
						}
						
						if(null!=member.getHireMonthlyincome()){
							p.setJobincome(Double.valueOf(member.getHireMonthlyincome().toString()));
							p.setJobYearincom(Double.valueOf(member.getHireMonthlyincome().multiply(new BigDecimal(12)).toString()));
						}
						p.setUnitaddress(member.getHireAddress());
						if(null!=member.getHireCompanytype()){
							p.setUnitproperties(member.getHireCompanytype());
						}
						p.setMarry(member.getMarry());
						p.setUnitphone(member.getHireCompanyphone());
						p.setSelfemail(member.getEmail());
						if(null!=member.getHavechildren()){
							p.setChildrenCount(member.getHavechildren().toString());
						}
						if(null!=member.getHireCompanycategory()){
							p.setHangyeType(member.getHireCompanycategory());
							if(null!=areaDicService.getById(Integer.valueOf(member.getHireCompanycategory()))){
								p.setHangyeName(areaDicService.getById(Integer.valueOf(member.getHireCompanycategory())).getText());
							}
						}
						p.setCompanyScale(String.valueOf(member.getHireCompanysize()));
						p.setCollegeYear(member.getCollegeYear());
						p.setHireEmail(member.getHireEmail());
						p.setHireCity(member.getHireCity());
						if(null!=member.getHavehouse()){
							p.setHavehouse(Boolean.valueOf(member.getHavehouse().toString()));
						}
						if(null!=member.getHavehouseloan()){
							p.setHavehouseloan(Boolean.valueOf(member.getHavehouseloan().toString()));
						}
						if(null!=member.getHavecar()){
							p.setHavecar(Boolean.valueOf(member.getHavecar().toString()));
						}
						if(null!=member.getHavecarloan()){
							p.setHavecarloan(Boolean.valueOf(member.getHavecarloan().toString()));
						}
						//p.setCareerType(member.getCareerType());
						p.setLiveCity(member.getLiveCity());
						personService.merge(p);
						
						//添加紧急联系人，家庭联系人,工作联系人，配偶信息
						addRersonRelation(member,p);
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * 添加紧急联系人，家庭联系人
	 * @param member
	 */
	public void addRersonRelation(BpCustMember member,Person p){
		//添加配偶信息
		if(member.getRelDirType()!=null&&member.getRelDirType()==954){
			QueryFilter filter = new QueryFilter(this.getRequest());
			filter.addFilter("Q_personId_IN_EQ", p.getId());
			filter.addFilter("Q_name_S_EQ", member.getRelDirName());
			List<Spouse> list=spouseService.getAll(filter);
			if(list.size()>0){
				
			}else{
				Spouse sp = new Spouse();
				sp.setName(member.getRelDirName());
				sp.setPersonId(p.getId());
				spouseService.save(sp);
			}
		}
		//家庭联系人
		if(member.getRelDirName()!=null){
			List<PersonRelation> list=personRelationService.getByNameAndFlag(member.getRelDirName(), "0", p.getId());
			if(list.size()>0){
				PersonRelation pr=list.get(0);
				pr.setRelationName(member.getRelDirName());
				if(member.getRelDirType()!=null){
					pr.setRelationShip(member.getRelDirType());
				}
				if(member.getRelDirPhone()!=null){
					pr.setRelationPhone(member.getRelDirPhone());
				}
				personRelationService.merge(pr);
			}else{
				PersonRelation relation = new PersonRelation();
				relation.setFlag("0");
				relation.setRelationName(member.getRelDirName());
				if(member.getRelDirType()!=null){
					relation.setRelationShip(member.getRelDirType());
				}
				if(member.getRelDirPhone()!=null){
					relation.setRelationPhone(member.getRelDirPhone());
				}
				relation.setPersonId(p.getId());
				personRelationService.save(relation);
			}
			
		}
		//其他亲属
		if(member.getRelOtherName()!=null){
			List<PersonRelation> list=personRelationService.getByNameAndFlag(member.getRelOtherName(), "0", p.getId());
			if(list.size()>0){
				PersonRelation pr=list.get(0);
				pr.setRelationName(member.getRelOtherName());
				if(member.getRelOtherType()!=null){
					pr.setRelationShip(member.getRelOtherType());
				}
				if(member.getRelOtherPhone()!=null){
					pr.setRelationPhone(member.getRelOtherPhone());
				}
				personRelationService.merge(pr);
			}else{
				PersonRelation relation1 = new PersonRelation();
				relation1.setFlag("0");
				relation1.setRelationName(member.getRelOtherName());
				if(member.getRelOtherType()!=null){
					relation1.setRelationShip(member.getRelOtherType());
				}
				if(member.getRelOtherPhone()!=null){
					relation1.setRelationPhone(member.getRelOtherPhone());
				}
				relation1.setPersonId(p.getId());
				personRelationService.save(relation1);
			}
			
		}
		//紧急联系人
		if(member.getRelFriendName()!=null&&member.getRelFriendType()!=null&&member.getRelFriendType()==955){//同学
			List<PersonRelation> list=personRelationService.getByNameAndFlag(member.getRelFriendName(), "2", p.getId());
			if(list.size()>0){
				PersonRelation pr=list.get(0);
				pr.setRelationName(member.getRelFriendName());
				pr.setRelationShip(member.getRelFriendType());
				if(member.getRelFriendPhone()!=null){
					pr.setRelationPhone(member.getRelFriendPhone());
				}
				personRelationService.merge(pr);
			}else{
				PersonRelation friendRelation = new PersonRelation();
				friendRelation.setFlag("2");
				if(member.getRelFriendName()!=null){
					friendRelation.setRelationName(member.getRelFriendName());
				}
				friendRelation.setRelationShip(member.getRelFriendType());
				if(member.getRelFriendPhone()!=null){
					friendRelation.setRelationPhone(member.getRelFriendPhone());
				}
				friendRelation.setPersonId(p.getId());
				personRelationService.save(friendRelation);
			}
			
		}
		if(member.getRelFriendName()!=null&&member.getRelFriendType()!=null&&member.getRelFriendType()==576){//朋友
			List<PersonRelation> list=personRelationService.getByNameAndFlag(member.getRelFriendName(), "2", p.getId());
			if(list.size()>0){
				PersonRelation pr=list.get(0);
				pr.setRelationName(member.getRelFriendName());
				pr.setRelationShip(member.getRelFriendType());
				if(member.getRelFriendPhone()!=null){
					pr.setRelationPhone(member.getRelFriendPhone());
				}
				personRelationService.merge(pr);
			}else{
				PersonRelation friendRelation = new PersonRelation();
				friendRelation.setFlag("2");
				if(member.getRelFriendName()!=null){
					friendRelation.setRelationName(member.getRelFriendName());
				}
				friendRelation.setRelationShip(member.getRelFriendType());
				if(member.getRelFriendPhone()!=null){
					friendRelation.setRelationPhone(member.getRelFriendPhone());
				}
				friendRelation.setPersonId(p.getId());
				personRelationService.save(friendRelation);
			}
			
		}
		//工作证明人
		if(member.getRelFriendName()!=null&&member.getRelFriendType()!=null&&member.getRelFriendType()==577){//同事
			List<PersonRelation> list=personRelationService.getByNameAndFlag(member.getRelFriendName(), "1", p.getId());
			if(list.size()>0){
				PersonRelation pr=list.get(0);
				pr.setRelationName(member.getRelFriendName());
				pr.setRelationShip(member.getRelFriendType());
				if(member.getRelFriendPhone()!=null){
					pr.setRelationPhone(member.getRelFriendPhone());
				}
				personRelationService.merge(pr);
			}else{
				PersonRelation friendRelation = new PersonRelation();
				friendRelation.setFlag("1");
				if(member.getRelFriendName()!=null){
					friendRelation.setRelationName(member.getRelFriendName());
				}
				friendRelation.setRelationShip(member.getRelFriendType());
				if(member.getRelFriendPhone()!=null){
					friendRelation.setRelationPhone(member.getRelFriendPhone());
				}
				friendRelation.setPersonId(p.getId());
				personRelationService.save(friendRelation);
			}
			
		}
	}
	/**
	 * 判断用户是否存在
	 */
	public String isExist() {
		String loginName=this.getRequest().getParameter("loginName");
		// 将数据转成JSON格式
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		StringBuffer sb = new StringBuffer();

		BpCustMember member = bpCustMemberService.isExist(loginName);

		if (member != null) {
			sb.append("{\"success\":true,\"errMsg\":");
			sb.append(gson.toJson("债权人P2P账号存在"));
			sb.append(",\"result\":1");
			sb.append("}");
		} else {
			sb.append("{\"success\":false,\"errMsg\":");
			sb.append(gson.toJson("债权人P2P账号不存在"));
			sb.append(",\"result\":0");
			sb.append("}");
		}
		
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/**
	 * 接口改造之后保存招标计划的时候必须保证借款用户开通了第三方账户
	 * @return
	 */
	public String chechIsOpenThird(){
		String customerId=this.getRequest().getParameter("customerId");
		String customerType=this.getRequest().getParameter("customerType");
		if(customerType.equals("p_loan") || customerType.equals("b_loan")){//直投标
			BpCustRelation bpCustRelation=bpCustRelationService.getByLoanTypeAndId(customerType,Long.valueOf(customerId));
			if(null==bpCustRelation){
				setJsonString("{success:false,msg:'借款人没有开通P2P账户!!!'}");
			}else{
				BpCustMember bpCustMember =bpCustMemberService.get(bpCustRelation.getP2pCustId());
				if(null!=bpCustMember){
					if(null!=bpCustMember.getThirdPayFlagId() && !"".equals(bpCustMember.getThirdPayFlagId())){
						setJsonString("{success:true,msg:'借款人已开通第三方!!!'}");
					}else{
						setJsonString("{success:false,msg:'借款人尚未开通第三方账户!!!'}");
					}
				}else{
					setJsonString("{success:false,msg:'借款人的P2P账户不存在!!!'}");
				}
			}
		}else if(customerType.equals("person") || customerType.equals("enterprise")){//债转标
			if(customerType.equals("person")){
				customerType = "p_cooperation";
			}else{
				customerType = "b_cooperation";
			}
			BpCustRelation bpCustRelation=bpCustRelationService.getByLoanTypeAndId(customerType,Long.valueOf(customerId));
			if(null==bpCustRelation){
				setJsonString("{success:false,msg:'债权持有人没有开通P2P账户!!!'}");
			}else{
				BpCustMember bpCustMember =bpCustMemberService.get(bpCustRelation.getP2pCustId());
				if(null!=bpCustMember){
					if(null!=bpCustMember.getThirdPayFlagId() && !"".equals(bpCustMember.getThirdPayFlagId())){
						setJsonString("{success:true,msg:'债权持有人已开通第三方!!!'}");
					}else{
						setJsonString("{success:false,msg:'债权持有人尚未开通第三方账户!!!'}");
					}
				}else{
					setJsonString("{success:false,msg:'债权持有人的P2P账户不存在!!!'}");
				}
			}
		}
		return SUCCESS;
	}
	
	public String getRecommandPerson() {
		return recommandPerson;
	}

	public void setRecommandPerson(String recommandPerson) {
		this.recommandPerson = recommandPerson;
	}
}
