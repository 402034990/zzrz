package com.report.LoanReport;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.hurong.core.util.DateUtil;
import com.report.ReportUtil;
import com.zhiwei.core.web.action.BaseAction;

public class LoanReportAction extends BaseAction{
	
	/**
	 * 贷款本息实收明细表 、贷款本息应收明细表、贷款到期明细表、贷款额度区间分析表、贷款即将还款明细表（不含逾期）(PAIMatureDetail)
	 * 后台传参方法
	 * @return
	 */
	public void financeEarning(){
		String reportType=this.getRequest().getParameter("reportType");
		String reportKey=this.getRequest().getParameter("reportKey");
		String intentDateGE=this.getRequest().getParameter("intentDate_GE");
		String intentDateLE=this.getRequest().getParameter("intentDate_LE");
		Map<String,String> map=new HashMap<String,String>();
		//拼接sql参数
		String sqlCondition="";
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			if("PAIMatureDetail".equals(reportKey) || "LoanCreditsDetail2".equals(reportKey)){
				intentDateGE=DateUtil.dateToStr(new Date(intentDateGE), "yyyy-MM-dd");
				sqlCondition=sqlCondition+" and p.intentDate>=\'"+intentDateGE+"\'";
			}else if("LoanCreditsDetail".equals(reportKey)){
				intentDateGE=DateUtil.dateToStr(new Date(intentDateGE), "yyyy-MM-dd");
				sqlCondition=sqlCondition+" and s.factDate>=\'"+intentDateGE+"\'";
			}else if("MaxLoanPerson".equals(reportKey) || "MaxLoanEnterprise".equals(reportKey) || "MaxLoanCustomerP".equals(reportKey) || "MaxLoanCustomerE".equals(reportKey) ){
				intentDateGE=DateUtil.dateToStr(new Date(intentDateGE), "yyyy-MM-dd");
				sqlCondition=sqlCondition+" and p.startDate>=\'"+intentDateGE+"\'";
			}else{
				intentDateGE=DateUtil.dateToStr(new Date(intentDateGE), "yyyy-MM-dd");
				sqlCondition=sqlCondition+" and p.factDate>=\'"+intentDateGE+"\'";
			}
		}
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			if("PAIMatureDetail".equals(reportKey) || "LoanCreditsDetail2".equals(reportKey)){
				intentDateLE=DateUtil.dateToStr(new Date(intentDateLE), "yyyy-MM-dd");
				sqlCondition=sqlCondition+" and p.intentDate<=\'"+intentDateLE+"\'";
			}else if("LoanCreditsDetail".equals(reportKey)){
				intentDateLE=DateUtil.dateToStr(new Date(intentDateLE), "yyyy-MM-dd");
				sqlCondition=sqlCondition+" and s.factDate<=\'"+intentDateLE+"\'";
			}else if("MaxLoanPerson".equals(reportKey) || "MaxLoanEnterprise".equals(reportKey) || "MaxLoanCustomerP".equals(reportKey) || "MaxLoanCustomerE".equals(reportKey)){
				intentDateLE=DateUtil.dateToStr(new Date(intentDateLE), "yyyy-MM-dd");
				sqlCondition=sqlCondition+" and  p.startDate<=\'"+intentDateLE+"\'";
			}else{
				intentDateLE=DateUtil.dateToStr(new Date(intentDateLE), "yyyy-MM-dd");
				sqlCondition=sqlCondition+" and p.factDate<=\'"+intentDateLE+"\'";
			}
		}
		if(!"".equals(sqlCondition)){
			map.put("sqlCondition", sqlCondition);
		}
		if(!"PAIMatureDetail".equals(reportKey)){
			if(null!=intentDateGE && !"".equals(intentDateGE)){
				map.put("intentDateGE", intentDateGE);
			}
			if(null!=intentDateLE && !"".equals(intentDateLE)){
				map.put("intentDateLE", intentDateLE);
			}
		}
		ReportUtil.createReportHtml(map,reportKey,reportType,  this.getRequest());
	}
	
	/**
	 * 贷款财务综合汇总表、贷款情况汇总表（月报）、收回逾期贷款明细 后台传参方法
	 * @return
	 */
	public String financeComplex(){
		String reportKey=this.getRequest().getParameter("reportKey");
		String factDate=this.getRequest().getParameter("factDate");
		StringBuffer param=new StringBuffer();
		StringBuffer sb=new StringBuffer("{success:true,data:'&reportKey="+reportKey);
		
		if(null!=factDate && !"".equals(factDate)){
			if("PAIComplexDetail".equals(reportKey)){
				param.append("&sqlCondition= and DATE_FORMAT(factDate,\"%Y\")=\"").append(factDate).append("\"");
			}else if("DKFFHZBMonth".equals(reportKey) || "DKFFHZBQuarter".equals(reportKey) || "FXFLHZBMonth".equals(reportKey) || "FXFLHZBQuarter".equals(reportKey)){
				param.append("&searchDate=").append(factDate);
			}else{
				param.append("&searchDate=").append(factDate+"-01");
			}
		}
		sb.append(param).append("'}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/**
	 * 贷款财务综合汇总表、贷款情况汇总表（月报）、收回逾期贷款明细 后台传参方法（防注入漏洞）
	 * @return
	 */
	public void financeComplex2(){
		String reportType=this.getRequest().getParameter("reportType");
		String reportKey=this.getRequest().getParameter("reportKey");
		String factDate=this.getRequest().getParameter("factDate");
		Map<String, String> map = new HashMap<String, String>();
		StringBuffer sqlCondition=new StringBuffer();
		
		if(null!=factDate && !"".equals(factDate)){
			if("PAIComplexDetail".equals(reportKey)){
				sqlCondition.append(" and DATE_FORMAT(factDate,\"%Y\")=\"").append(factDate).append("\"");
			}else if("DKFFHZBMonth".equals(reportKey) || "DKFFHZBQuarter".equals(reportKey) || "FXFLHZBMonth".equals(reportKey) || "FXFLHZBQuarter".equals(reportKey)){
				sqlCondition.append(" and searchDate=").append(factDate);
			}else{
				sqlCondition.append(" and searchDate=").append(factDate+"-01");
			}
			map.put("sqlCondition", sqlCondition.toString());
		}
		
		ReportUtil.createReportHtml(map,reportKey,reportType,  this.getRequest());
	}
	
	/**
	 * 发放贷款汇总表    后台传参方法
	 * @return
	 */
	public String getFFLoanSumDetail(){
		String reportKey=this.getRequest().getParameter("reportKey");
		String intentDateGE=this.getRequest().getParameter("intentDate_GE");//起始时间
		String intentDateLE=this.getRequest().getParameter("intentDate_LE");//截止时间
		String productName=this.getRequest().getParameter("productName");//产品名称
		String personType=this.getRequest().getParameter("personType");//借款人类型
		StringBuffer param=new StringBuffer();
		StringBuffer sb=new StringBuffer("{success:true,data:'&reportKey="+reportKey+"&sqlCondition=");
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			param.append(" and p.startDate>=\""+intentDateGE+"\"");
		}
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			param.append(" and p.intentDate<=\""+intentDateLE+"\"");
		}
		if(null!=personType && !"".equals(personType)){
			param.append(" and p.oppositeType=\""+personType+"\"");
		}
		if(null!=productName && !"".equals(productName)){
			param.append(" &sqlCondition1=and b.productName like \"%"+productName+"%\"");
		}
		sb.append(param).append("'}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/**
	 * 发放贷款汇总表    后台传参方法(防止sql注入)
	 * @return
	 */
	public void getFFLoanSumDetail2(){
		String reportType=this.getRequest().getParameter("reportType");
		String reportKey=this.getRequest().getParameter("reportKey");
		String intentDateGE=this.getRequest().getParameter("intentDate_GE");//起始时间
		String intentDateLE=this.getRequest().getParameter("intentDate_LE");//截止时间
		String productName=this.getRequest().getParameter("productName");//产品名称
		String personType=this.getRequest().getParameter("personType");//借款人类型
		
		Map<String, String> map = new HashMap<String, String>();
		StringBuffer sqlCondition=new StringBuffer();
		StringBuffer sqlCondition1= new StringBuffer();
		
		//起始时间
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			sqlCondition.append(" and p.startDate>=\""+intentDateGE+"\"");
		}
		//结束时间
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			sqlCondition.append(" and p.intentDate<=\""+intentDateLE+"\"");
		}
		//产品名称
		if(null!=productName && !"".equals(productName)){
			sqlCondition1.append(" and b.productName like \"%"+productName+"%\"");
		}
		//借款人类型
		if(null!=personType && !"".equals(personType)){
			sqlCondition.append(" and p.oppositeType=\""+personType+"\"");
		}
		
		if(!"".equals(sqlCondition)){
			map.put("sqlCondition", sqlCondition.toString());
		}
		if(!"".equals(sqlCondition1)){
			map.put("sqlCondition1", sqlCondition1.toString());
		}
		
		ReportUtil.createReportHtml(map,reportKey,reportType,  this.getRequest());
	}
	
	
	/**
	 *贷款收入明细表    后台传参方法
	 * @return
	 */
	public String getLoanIncomeDetail(){
		String reportKey=this.getRequest().getParameter("reportKey");
		String intentDateGE=this.getRequest().getParameter("intentDate_GE");//起始时间
		String intentDateLE=this.getRequest().getParameter("intentDate_LE");//截止时间
		String customerName=this.getRequest().getParameter("customerName");//借款人
		String customerManagerName=this.getRequest().getParameter("customerManagerName");//客户经理
		StringBuffer param=new StringBuffer();
		StringBuffer sb=new StringBuffer("{success:true,data:'&reportKey="+reportKey+"&sqlCondition=");
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			param.append(" and s.intentDate>=\""+intentDateGE+"\"");
		}
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			param.append(" and s.intentDate<=\""+intentDateLE+"\"");
		}
		if(null!=customerManagerName && !"".equals(customerManagerName)){
			param.append(" and u.fullname like \"%"+customerManagerName+"%\"");
		}
		if(null!=customerName && !"".equals(customerName)){
			param.append("&sqlCondition1=and s.customerName like \"%"+customerName+"%\"");
		}
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			param.append("&intentDateGe="+intentDateGE+"");
		}
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			param.append("&intentDateLe="+intentDateLE+"");
		}
		sb.append(param).append("'}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/**
	 *贷款收入明细表    后台传参方法(防注入漏洞)
	 * @return
	 */
	public void getLoanIncomeDetail2(){
		String reportType=this.getRequest().getParameter("reportType");
		String reportKey=this.getRequest().getParameter("reportKey");
		String intentDateGE=this.getRequest().getParameter("intentDate_GE");//起始时间
		String intentDateLE=this.getRequest().getParameter("intentDate_LE");//截止时间
		String customerName=this.getRequest().getParameter("customerName");//借款人
		String customerManagerName=this.getRequest().getParameter("customerManagerName");//客户经理
		StringBuffer sqlCondition=new StringBuffer();
		StringBuffer sqlCondition1=new StringBuffer();
		Map<String, String> map = new HashMap<String, String>();
		
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			sqlCondition.append(" and s.intentDate>=\""+intentDateGE+"\"");
		}
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			sqlCondition.append(" and s.intentDate<=\""+intentDateLE+"\"");
		}
		if(null!=customerManagerName && !"".equals(customerManagerName)){
			sqlCondition.append(" and u.fullname like \"%"+customerManagerName+"%\"");
		}
		if(null!=customerName && !"".equals(customerName)){
			sqlCondition1.append(" and s.customerName like \"%"+customerName+"%\"");
		}
		if(!"".equals(sqlCondition)){
			map.put("sqlCondition", sqlCondition.toString());
		}
		if(!"".equals(sqlCondition1)){
			map.put("sqlCondition1", sqlCondition1.toString());
		}
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			map.put("intentDateGe", intentDateGE);
		}
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			map.put("intentDateLe", intentDateLE);
		}
		
		ReportUtil.createReportHtml(map,reportKey,reportType,  this.getRequest());
	}
	
	/**
	 *贷款还款明细表    后台传参方法
	 * @return
	 */
	public String getLoanAfterBack(){
		String reportKey=this.getRequest().getParameter("reportKey");
		String factDateGE=this.getRequest().getParameter("factDate_GE");//起始时间
		String factDateLE=this.getRequest().getParameter("factDate_LE");//截止时间
		String intentDateGE=this.getRequest().getParameter("intentDate_GE");//到期日期
		String intentDateLE=this.getRequest().getParameter("intentDate_LE");//截止时间
		String customerName=this.getRequest().getParameter("customerName");//客户名称
		String projectNumber=this.getRequest().getParameter("projectNumber");//项目编号
		StringBuffer param=new StringBuffer();
		StringBuffer sb=new StringBuffer("{success:true,data:'&reportKey="+reportKey+"&sqlCondition=");
		if(null!=factDateGE && !"".equals(factDateGE)){
			if("ContractRegister".equals(reportKey)){//合同登记簿
				param.append(" and p.startDate>=\""+factDateGE+"\"");
			}else{
				param.append(" and d.factDate>=\""+factDateGE+"\"");
			}
		}
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			if("ContractRegister".equals(reportKey)){//合同登记簿
				param.append(" and p.intentDate>=\""+intentDateGE+"\"");
			}
		}
		if(null!=factDateLE && !"".equals(factDateLE)){
			if("ContractRegister".equals(reportKey)){//合同登记簿
				param.append(" and p.startDate<=\""+factDateLE+"\"");
			}else{
				param.append(" and d.factDate<=\""+factDateLE+"\"");
			}
		}
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			if("ContractRegister".equals(reportKey)){//合同登记簿
				param.append(" and p.intentDate<=\""+intentDateLE+"\"");
			}
		}
		if(null!=projectNumber && !"".equals(projectNumber)){
			if("ContractRegister".equals(reportKey)){//合同登记簿
				param.append(" and c.contractnumber like \"%"+projectNumber+"%\"");
			}else{
				param.append(" and p.projectNumber like \"%"+projectNumber+"%\"");
			}
		}
		if(null!=customerName && !"".equals(customerName)){
			param.append("&sqlCondition1=and s.customerName like \"%"+customerName+"%\"");
		}
		if(null!=factDateGE && !"".equals(factDateGE)){
			param.append("&intentDateGe="+factDateGE+"");
		}
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			param.append("&intentDateGe="+intentDateGE+"");
		}
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			param.append("&intentDateLe="+intentDateLE+"");
		}
		if(null!=factDateLE && !"".equals(factDateLE)){
			param.append("&intentDateLe="+factDateLE+"");
		}
		sb.append(param).append("'}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	
	/**
	 *贷款还款明细表    后台传参方法（防注入漏洞）
	 * @return
	 */
	public void getLoanAfterBack2(){
		String reportType=this.getRequest().getParameter("reportType");
		String reportKey=this.getRequest().getParameter("reportKey");
		String factDateGE=this.getRequest().getParameter("factDate_GE");//起始时间
		String factDateLE=this.getRequest().getParameter("factDate_LE");//截止时间
		String intentDateGE=this.getRequest().getParameter("intentDate_GE");//到期日期
		String intentDateLE=this.getRequest().getParameter("intentDate_LE");//截止时间
		String customerName=this.getRequest().getParameter("customerName");//客户名称
		String projectNumber=this.getRequest().getParameter("projectNumber");//项目编号
		
		StringBuffer sqlCondition = new StringBuffer();
		StringBuffer sqlCondition1 = new StringBuffer();
		Map<String, String> map =new HashMap<String, String>();

		if(null!=factDateGE && !"".equals(factDateGE)){
			if("ContractRegister".equals(reportKey)){//合同登记簿
				sqlCondition.append(" and p.startDate>=\""+factDateGE+"\"");
			}else{
				sqlCondition.append(" and d.factDate>=\""+factDateGE+"\"");
			}
		}
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			if("ContractRegister".equals(reportKey)){//合同登记簿
				sqlCondition.append(" and p.intentDate>=\""+intentDateGE+"\"");
			}
		}
		if(null!=factDateLE && !"".equals(factDateLE)){
			if("ContractRegister".equals(reportKey)){//合同登记簿
				sqlCondition.append(" and p.startDate<=\""+factDateLE+"\"");
			}else{
				sqlCondition.append(" and d.factDate<=\""+factDateLE+"\"");
			}
		}
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			if("ContractRegister".equals(reportKey)){//合同登记簿
				sqlCondition.append(" and p.intentDate<=\""+intentDateLE+"\"");
			}
		}
		if(null!=projectNumber && !"".equals(projectNumber)){
			if("ContractRegister".equals(reportKey)){//合同登记簿
				sqlCondition.append(" and c.contractnumber like \"%"+projectNumber+"%\"");
			}else{
				sqlCondition.append(" and p.projectNumber like \"%"+projectNumber+"%\"");
			}
		}
		if(null!=customerName && !"".equals(customerName)){
			sqlCondition1.append(" and s.customerName like \"%"+customerName+"%\"");
		}
		
		if(!"".equals(sqlCondition)){
			map.put("sqlCondition", sqlCondition.toString());
		}
		if(!"".equals(sqlCondition1)){
			map.put("sqlCondition1", sqlCondition1.toString());
		}
		if(null!=factDateGE && !"".equals(factDateGE)){
			map.put("intentDateGe",factDateGE);
		}
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			map.put("intentDateGe", intentDateGE);
		}
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			map.put("intentDateLe",intentDateLE);
		}
		if(null!=factDateLE && !"".equals(factDateLE)){
			map.put("intentDateLe", factDateLE);
		}
		ReportUtil.createReportHtml(map,reportKey,reportType,  this.getRequest());
	}
	
	/**
	 *贷款信息明细表    后台传参方法
	 * @return
	 */
	public String getLoanInfoDetail(){
		String reportKey=this.getRequest().getParameter("reportKey");
		String startDateGE=this.getRequest().getParameter("startDate_GE");//放款日期
		String startDateLE=this.getRequest().getParameter("startDate_LE");//截止时间
		String customerName=this.getRequest().getParameter("customerName");//客户名称
		String customerManagerName_EQ=this.getRequest().getParameter("customerManagerName_EQ");//项目经理
		
		StringBuffer param=new StringBuffer();
		StringBuffer sb=new StringBuffer("{success:true,data:{'reportKey':'"+reportKey+"','sqlCondition':'");
		if(null!=startDateGE && !"".equals(startDateGE)){
			param.append(" and p.startDate>=\\\""+startDateGE+"\\\"");
		}
		if(null!=startDateLE && !"".equals(startDateLE)){
			param.append(" and p.startDate<=\\\""+startDateLE+"\\\"");
		}
		if(null!=customerName && !"".equals(customerName)){
			param.append(" and p.customerName like \"%25"+customerName+"%25\"");
		}
		if(null!=startDateLE && !"".equals(startDateLE)){
			param.append(" and p.startDate<=\\\""+startDateLE+"\\\"");
		}
		if(null!=customerManagerName_EQ && !"".equals(customerManagerName_EQ)){
			param.append(" and p.precidentName=\""+customerManagerName_EQ+"\"");
		}
		if(null!=startDateGE && !"".equals(startDateGE)){
			param.append("','intentDateGe':'"+startDateGE+"");
		}
		if(null!=startDateLE && !"".equals(startDateLE)){
			param.append("','intentDateLe':'"+startDateLE+"");
		}
		sb.append(param).append("'}}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/**
	 *贷款信息明细表    后台传参方法(防注入漏洞)
	 * @return
	 */
	public void getLoanInfoDetail2(){
		String reportKey=this.getRequest().getParameter("reportKey");
		String startDateGE=this.getRequest().getParameter("startDate_GE");//放款日期
		String startDateLE=this.getRequest().getParameter("startDate_LE");//截止时间
		String customerName=this.getRequest().getParameter("customerName");//客户名称
		String customerManagerName_EQ=this.getRequest().getParameter("customerManagerName_EQ");//项目经理
		String reportType=this.getRequest().getParameter("reportType");
		Map<String, String> map = new HashMap<String, String>();
		StringBuffer sqlCondition=new StringBuffer();
		
		if(null!=startDateGE && !"".equals(startDateGE)){
			sqlCondition.append(" and p.startDate>=\""+startDateGE+"\"");
		}
		if(null!=startDateLE && !"".equals(startDateLE)){
			sqlCondition.append(" and p.startDate<=\""+startDateLE+"\"");
		}
		if(null!=customerName && !"".equals(customerName)){
			sqlCondition.append(" and p.customerName like \"%25"+customerName+"%25\"");
		}
		if(null!=startDateLE && !"".equals(startDateLE)){
			sqlCondition.append(" and p.startDate<=\""+startDateLE+"\"");
		}
		if(null!=customerManagerName_EQ && !"".equals(customerManagerName_EQ)){
			sqlCondition.append(" and p.precidentName=\""+customerManagerName_EQ+"\"");
		}
		if(null!=startDateGE && !"".equals(startDateGE)){
			map.put("intentDateGe", startDateGE);
		}
		if(null!=startDateLE && !"".equals(startDateLE)){
			map.put("intentDateLe", startDateLE);
		}
		map.put("sqlCondition", sqlCondition.toString());
		
		ReportUtil.createReportHtml(map,reportKey,reportType,  this.getRequest());
	}
	
	/**
	 * 贷款发放明细表   后台传参方法
	 * @return
	 */
	public String getLoanAllotDetail(){
		String reportKey=this.getRequest().getParameter("reportKey");
		StringBuffer param=new StringBuffer();
		StringBuffer sb=new StringBuffer("{success:true,data:'&reportKey="+reportKey+"&sqlCondition=");
		String startDateGE=this.getRequest().getParameter("startDate_GE");//放款日期
		String startDateLE=this.getRequest().getParameter("startDate_LE");//截止时间
		String customerName=this.getRequest().getParameter("customerName");//客户名称
		String customerManagerName_EQ=this.getRequest().getParameter("customerManagerName_EQ");//项目经理
		String projectName=this.getRequest().getParameter("projectName");//项目名称
		String projectNumber=this.getRequest().getParameter("projectNumber");//项目编号
		
		if(null!=customerName && !"".equals(customerName)){
			param.append(" and p.customerName like \"%"+customerName+"%\"");
		}
		if(null!=customerManagerName_EQ && !"".equals(customerManagerName_EQ)){
			param.append(" and p.appUserName=\""+customerManagerName_EQ+"\"");
		}
		if(null!=projectName && !"".equals(projectName)){
			param.append(" and p.projectName like \"%"+projectName+"%\"");
		}
		if(null!=projectNumber && !"".equals(projectNumber)){
			param.append(" and p.projectNumber like \"%"+projectNumber+"%\"");
		}
		if(null!=startDateGE && !"".equals(startDateGE)){
			if("LoanAllotDetail2".equals(reportKey)){
				param.append(" and p.startDate>=\""+startDateGE+"\"");
			}else{
				param.append("&sqlCondition1=and s.factDate>=\""+startDateGE+"\"");
			}
		}
		if(null!=startDateLE && !"".equals(startDateLE)){
			if("LoanAllotDetail2".equals(reportKey)){
				param.append(" and p.intentDate<=\""+startDateLE+"\"");
			}else{
				if(null!=startDateGE && !"".equals(startDateGE)){
					param.append(" and s.factDate<=\""+startDateLE+"\"");
				}else{
					param.append("&sqlCondition1=and s.factDate<=\""+startDateLE+"\"");
				}
			}
		}
		if(null!=startDateGE && !"".equals(startDateGE)){
			param.append("&intentDateGe="+startDateGE+"");
		}
		if(null!=startDateLE && !"".equals(startDateLE)){
			param.append("&intentDateLe="+startDateLE+"");
		}
		sb.append(param).append("'}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/**
	 * 贷款发放明细表   后台传参方法(防注入漏洞)
	 * @return
	 */
	public void getLoanAllotDetail2(){
		String reportKey=this.getRequest().getParameter("reportKey");
		String startDateGE=this.getRequest().getParameter("startDate_GE");//放款日期
		String startDateLE=this.getRequest().getParameter("startDate_LE");//截止时间
		String customerName=this.getRequest().getParameter("customerName");//客户名称
		String customerManagerName_EQ=this.getRequest().getParameter("customerManagerName_EQ");//项目经理
		String projectName=this.getRequest().getParameter("projectName");//项目名称
		String projectNumber=this.getRequest().getParameter("projectNumber");//项目编号
		String reportType=this.getRequest().getParameter("reportType");
		StringBuffer sqlCondition = new StringBuffer();
		StringBuffer sqlCondition1 = new StringBuffer();
		Map<String,String> map=new HashMap<String,String>();
		if(null!=customerName && !"".equals(customerName)){
			sqlCondition.append(" and p.customerName like \"%"+customerName+"%\"");
		}
		if(null!=customerManagerName_EQ && !"".equals(customerManagerName_EQ)){
			sqlCondition.append(" and p.appUserName=\""+customerManagerName_EQ+"\"");
		}
		if(null!=projectName && !"".equals(projectName)){
			sqlCondition.append(" and p.projectName like \"%"+projectName+"%\"");
		}
		if(null!=projectNumber && !"".equals(projectNumber)){
			sqlCondition.append(" and p.projectNumber like \"%"+projectNumber+"%\"");
		}
		if(null!=startDateGE && !"".equals(startDateGE)){
			if("LoanAllotDetail2".equals(reportKey)){
				sqlCondition.append(" and p.startDate>=\""+startDateGE+"\"");
			}else{
				sqlCondition1.append(" and s.factDate>=\""+startDateGE+"\"");
			}
		}
		if(null!=startDateLE && !"".equals(startDateLE)){
			if("LoanAllotDetail2".equals(reportKey)){
				sqlCondition.append(" and p.intentDate<=\""+startDateLE+"\"");
			}else{
				if(null!=startDateGE && !"".equals(startDateGE)){
					sqlCondition.append(" and p.factDate<=\""+startDateLE+"\"");
				}else{
					sqlCondition1.append(" and s.factDate<=\""+startDateLE+"\"");
				}
			}
		}
		
		map.put("sqlCondition", sqlCondition.toString());
		map.put("sqlCondition1", sqlCondition1.toString());
		
		if(null!=startDateGE && !"".equals(startDateGE)){
			map.put("intentDateGe", startDateGE);
		}
		if(null!=startDateLE && !"".equals(startDateLE)){
			map.put("intentDateLe", startDateLE);
		}
		
		ReportUtil.createReportHtml(map,reportKey,reportType,  this.getRequest());
	}
	
	public String financeFormal(){
		boolean flag=false;//标识json串最后是否拼接'
		String reportKey=this.getRequest().getParameter("reportKey");
		StringBuffer param=new StringBuffer();
		StringBuffer sb=new StringBuffer("{success:true,data:{'reportKey':'"+reportKey+"','sqlCondition':\"");
		String createDateGE=this.getRequest().getParameter("createDate_GE");//开始时间
		String createDateLE=this.getRequest().getParameter("createDate_LE");//截止时间
		String customerManagerName=this.getRequest().getParameter("customerManagerName");//客户经理
		String departMentName=this.getRequest().getParameter("departMentName");//门店
		String customerName=this.getRequest().getParameter("customerName");//客户名称
		
		if(null!=customerName && !"".equals(customerName)){
			if(reportKey.equals("FormalCustomerP")){
				param.append(" and p.name like \"%25"+customerName+"%25\"");
			}else{
				param.append(" and p.customerName like \"%25"+customerName+"%25\"");
			}
		}
		if(null!=customerManagerName && !"".equals(customerManagerName)){
			param.append(" and p.precident=\""+customerManagerName+"\"");
		}
		if(null!=departMentName && !"".equals(departMentName)){
			param.append(" and p.shopName like \"%25"+departMentName+"%25\"");
		}
		if(null!=createDateGE && !"".equals(createDateGE)){
			param.append(" and p.createdate BETWEEN \'"+createDateGE+"\'");
		}
		if(null!=createDateLE && !"".equals(createDateLE)){
			param.append(" and \'"+createDateLE+"\'");
		}
		if(null!=createDateGE && !"".equals(createDateGE)){
			param.append("\",'intentDateGe':'"+createDateGE+"'");
			flag=true;
		}
		if(null!=createDateLE && !"".equals(createDateLE)){
			param.append(",'intentDateLe':'"+createDateLE+"'");
			flag=true;
		}
		if(flag){
			sb.append(param).append("}}");
		}else{
			sb.append(param).append("'}}");
		}
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	
	@SuppressWarnings("deprecation")
	public void financeFormal2(){
		String reportType=this.getRequest().getParameter("reportType");
		String reportKey=this.getRequest().getParameter("reportKey");
		String createDateGE=this.getRequest().getParameter("createDate_GE");//开始时间
		//System.out.println();
		String createDateLE=this.getRequest().getParameter("createDate_LE");//截止时间
		String customerManagerName=this.getRequest().getParameter("customerManagerName");//客户经理
		String departMentName=this.getRequest().getParameter("departMentName");//门店
		String customerName=this.getRequest().getParameter("customerName");//客户名称
		Map<String,String> map=new HashMap<String,String>();
		//拼接sql参数
		String sqlCondition="";
		if(null!=customerName && !"".equals(customerName)){
			if(reportKey.equals("FormalCustomerP")){
				sqlCondition=sqlCondition+" and p.name like \"%"+customerName+"%\"";
			}else{
				sqlCondition=sqlCondition+" and p.customerName like \"%"+customerName+"%\"";
			}
		}
		if(null!=customerManagerName && !"".equals(customerManagerName)){
			sqlCondition=sqlCondition+" and p.precident=\""+customerManagerName+"\"";
		}
		if(null!=departMentName && !"".equals(departMentName)){
			sqlCondition=sqlCondition+" and p.shopName like \"%"+departMentName+"%\"";
		}
		if(null!=createDateGE && !"".equals(createDateGE)){
			createDateGE=DateUtil.dateToStr(new Date(createDateGE), "yyyy-MM-dd");
			sqlCondition=sqlCondition+" and p.createdate BETWEEN \'"+createDateGE+"\'";
		}
		if(null!=createDateLE && !"".equals(createDateLE)){
			createDateLE=DateUtil.dateToStr(new Date(createDateLE), "yyyy-MM-dd");
			sqlCondition=sqlCondition+" and \'"+createDateLE+"\'";
		}
		
		if(!"".equals(sqlCondition)){
			map.put("sqlCondition", sqlCondition);
		}
		if(null!=createDateGE && !"".equals(createDateGE)){
			//createDateGE=DateUtil.dateToStr(new Date(createDateGE), "yyyy-MM-dd");
			map.put("intentDateGe", createDateGE);
		}
		if(null!=createDateLE && !"".equals(createDateLE)){
			//createDateLE=DateUtil.dateToStr(new Date(createDateLE), "yyyy-MM-dd");
			map.put("intentDateLe", createDateLE);
		}
		
		ReportUtil.createReportHtml(map,reportKey,reportType,  this.getRequest());
	}
	
	/***
	 * 风险分类明细表
	 * @return
	 */
	public String getRiskType(){
		DateFormat df=new SimpleDateFormat("yyyy-MM-dd");
		String reportKey=this.getRequest().getParameter("reportKey");
		String customerManagerName=this.getRequest().getParameter("customerManagerName");//项目经理
		String projectName=this.getRequest().getParameter("projectName");//项目名称
		String projectNumber=this.getRequest().getParameter("projectNumber");//项目编号
		String riskType=this.getRequest().getParameter("riskType");//风险等级
		StringBuffer param=new StringBuffer();
		StringBuffer sb=new StringBuffer("{success:true,data:'&reportKey="+reportKey+"&sqlCondition=");
		if(null!=customerManagerName && !"".equals(customerManagerName)){
			param.append(" and p.appUserName=\""+customerManagerName+"\"");
		}
		if(null!=projectName && !"".equals(projectName)){
			param.append(" and p.projectName like \"%"+projectName+"%\"");
		}
		if(null!=riskType && !"".equals(riskType)){
			param.append(" and p.superViseType=\""+riskType+"\"");
		}
		if(null!=projectNumber && !"".equals(projectNumber)){
			param.append(" and p.projectNumber like \"%"+projectNumber+"%\"");
		}
		param.append("&searchDate="+df.format(new Date()));
		sb.append(param).append("'}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/***
	 * 风险分类明细表(方注入漏洞)
	 * @return
	 */
	public void getRiskType2(){
		DateFormat df=new SimpleDateFormat("yyyy-MM-dd");
		String reportKey=this.getRequest().getParameter("reportKey");
		String customerManagerName=this.getRequest().getParameter("customerManagerName");//项目经理
		String projectName=this.getRequest().getParameter("projectName");//项目名称
		String projectNumber=this.getRequest().getParameter("projectNumber");//项目编号
		String riskType=this.getRequest().getParameter("riskType");//风险等级
		String reportType=this.getRequest().getParameter("reportType");
		StringBuffer sqlCondition=new StringBuffer();
		Map<String,String> map=new HashMap<String,String>();
		if(null!=customerManagerName && !"".equals(customerManagerName)){
			sqlCondition.append(" and p.appUserName=\""+customerManagerName+"\"");
		}
		if(null!=projectName && !"".equals(projectName)){
			sqlCondition.append(" and p.projectName like \"%"+projectName+"%\"");
		}
		if(null!=riskType && !"".equals(riskType)){
			sqlCondition.append(" and p.superViseType=\""+riskType+"\"");
		}
		if(null!=projectNumber && !"".equals(projectNumber)){
			sqlCondition.append(" and p.projectNumber like \"%"+projectNumber+"%\"");
		}
		map.put("sqlCondition", sqlCondition.toString());
		map.put("searchDate", df.format(new Date()));
		
		ReportUtil.createReportHtml(map,reportKey,reportType,this.getRequest());
	}
	
	/***
	 * 合同到期统计表
	 * @return
	 */
	public String getContractDetail(){
		DateFormat df=new SimpleDateFormat("yyyy-MM-dd");
		String reportKey=this.getRequest().getParameter("reportKey");
		String intentDateGE=this.getRequest().getParameter("intentDate_GE");//还款日期
		String intentDateLE=this.getRequest().getParameter("intentDate_LE");//截止时间
		String customerName=this.getRequest().getParameter("customerName");//客户名称
		String contractNumber=this.getRequest().getParameter("contractNumber");//合同编号
		StringBuffer param=new StringBuffer();
		StringBuffer sb=new StringBuffer("{success:true,data:'&reportKey="+reportKey+"&sqlCondition=");
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			param.append(" and pps.intentDate>=\""+intentDateGE+"\"");
		}
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			param.append(" and pps.intentDate<=\""+intentDateLE+"\"");
		}
		if(null!=contractNumber && !"".equals(contractNumber)){
			param.append(" and csc.contractnumber like \"%"+contractNumber+"%\"");
		}
		if(null!=customerName && !"".equals(customerName)){
			param.append(" and (cp.name like \"%"+customerName+"%\" or cpe.enterprisename like \"%"+customerName+"%\")");
		}
		param.append("&makeDate="+df.format(new Date()));
		sb.append(param).append("'}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/***
	 * 合同到期统计表(防注入漏洞)
	 * @return
	 */
	public void getContractDetail2(){
		DateFormat df=new SimpleDateFormat("yyyy-MM-dd");
		String reportKey=this.getRequest().getParameter("reportKey");
		String intentDateGE=this.getRequest().getParameter("intentDate_GE");//还款日期
		String intentDateLE=this.getRequest().getParameter("intentDate_LE");//截止时间
		String customerName=this.getRequest().getParameter("customerName");//客户名称
		String contractNumber=this.getRequest().getParameter("contractNumber");//合同编号
		String reportType=this.getRequest().getParameter("reportType");
		StringBuffer sqlCondition=new StringBuffer();
		Map<String,String> map=new HashMap<String,String>();
		if(null!=intentDateGE && !"".equals(intentDateGE)){
			sqlCondition.append(" and pps.intentDate>=\""+intentDateGE+"\"");
		}
		if(null!=intentDateLE && !"".equals(intentDateLE)){
			sqlCondition.append(" and pps.intentDate<=\""+intentDateLE+"\"");
		}
		if(null!=contractNumber && !"".equals(contractNumber)){
			sqlCondition.append(" and csc.contractnumber like \"%"+contractNumber+"%\"");
		}
		if(null!=customerName && !"".equals(customerName)){
			sqlCondition.append(" and (cp.name like \"%"+customerName+"%\" or cpe.enterprisename like \"%"+customerName+"%\")");
		}
		
		map.put("sqlCondition", sqlCondition.toString());
		map.put("makeDate", df.format(new Date()));
		ReportUtil.createReportHtml(map,reportKey,reportType,this.getRequest());
		
	}
	
	/**
	 * 即将生日客户统计表
	 * add by linyan 2015-7-31
	 * @return
	 */
	/*public String customerBirthdayAnalysis(){
		String reportKey=this.getRequest().getParameter("reportKey");
		StringBuffer param=new StringBuffer();
		StringBuffer sb=new StringBuffer("{success:true,data:'&reportKey="+reportKey+"&sqlCondition=");
		String Day_GE=this.getRequest().getParameter("Day_GE");//距离天数开始
		String Day_LE=this.getRequest().getParameter("Day_LE");//距离天数截止
		String departMentName=this.getRequest().getParameter("departMentName");//门店
		
		//门店名称
		if(null!=departMentName && !"".equals(departMentName)){
			param.append(" and org.org_name like \"%"+departMentName+"%\"");
		}
		
		if(null!=Day_GE && !"".equals(Day_GE)){
			param.append(" and DATEDIFF(date(concat(year(CURDATE()),\"-\",month(p.birthday),\"-\",day(p.birthday))),CURDATE())>="+Integer.valueOf(Day_GE));
		}
		if(null!=Day_LE && !"".equals(Day_LE)){
			param.append(" and DATEDIFF(date(concat(year(CURDATE()),\"-\",month(p.birthday),\"-\",day(p.birthday))),CURDATE())<="+Integer.valueOf(Day_LE));
		}
		sb.append(param).append("'}");
		setJsonString(sb.toString());
		return SUCCESS;
	}*/
	public void customerBirthdayAnalysis(){
		String reportType=this.getRequest().getParameter("reportType");
		String reportKey=this.getRequest().getParameter("reportKey");
		String Day_GE=this.getRequest().getParameter("Day_GE");//距离天数开始
		String Day_LE=this.getRequest().getParameter("Day_LE");//距离天数截止
		String departMentName=this.getRequest().getParameter("departMentName");//门店
		Map<String,String> map=new HashMap<String,String>();
		//拼接sql参数
		String sqlCondition="";
		if(null!=departMentName && !"".equals(departMentName)){
			sqlCondition=sqlCondition+" and p.shopName like \"%"+departMentName+"%\"";
		}
		if(null!=Day_GE && !"".equals(Day_GE)){
			sqlCondition=sqlCondition+" and DATEDIFF(date(concat(year(CURDATE()),\"-\",month(p.birthday),\"-\",day(p.birthday))),CURDATE())>="+Integer.valueOf(Day_GE);
		}
		if(null!=Day_LE && !"".equals(Day_LE)){
			sqlCondition=sqlCondition+" and DATEDIFF(date(concat(year(CURDATE()),\"-\",month(p.birthday),\"-\",day(p.birthday))),CURDATE())<="+Integer.valueOf(Day_LE);
		}
		if(!"".equals(sqlCondition)){
			map.put("sqlCondition", sqlCondition);
		}
		ReportUtil.createReportHtml(map,reportKey,reportType,this.getRequest());
	}
	
	/**
	 * 贷款客户明细表
	 * add by linyan 2015-7-31
	 * @return
	 */
	public void loanCustomerDetail(){
		String reportType=this.getRequest().getParameter("reportType");
		String reportKey=this.getRequest().getParameter("reportKey");
		String createDateGE=this.getRequest().getParameter("createDate_GE");//开始时间
		String createDateLE=this.getRequest().getParameter("createDate_LE");//截止时间
		String customerManagerName=this.getRequest().getParameter("customerManagerName");//客户经理
		String departMentName=this.getRequest().getParameter("contractNumber");//合同编号
		String customerName=this.getRequest().getParameter("customerName");//客户名称
		Map<String, String> map = new HashMap<String, String>();
		String sqlCondition="";
		//客户名称
		if(null!=customerName && !"".equals(customerName)){
			sqlCondition=sqlCondition+" and IFNULL(cp.name,cpe.enterprisename) like \"%"+customerName+"%\"";
		}
		//客户经理
		if(null!=customerManagerName && !"".equals(customerManagerName)){
			sqlCondition=sqlCondition+" and bp.appUserName like \"%"+customerManagerName+"%\"";
		}
		//合同编号
		if(null!=departMentName && !"".equals(departMentName)){
			sqlCondition=sqlCondition+" and csc.contractnumber like \"%"+departMentName+"%\"";
		}
		//放款起始日期
		if(null!=createDateGE && !"".equals(createDateGE)){
			createDateGE=DateUtil.dateToStr(new Date(createDateGE), "yyyy-MM-dd");
			sqlCondition=sqlCondition+" and bp.startDate>=\""+createDateGE+"\"";
		}
		//放款结束日期
		if(null!=createDateLE && !"".equals(createDateLE)){
			sqlCondition=sqlCondition+" and bp.startDate<=\""+createDateLE+"\"";
		}
		if(!"".equals(sqlCondition)){
			map.put("sqlCondition", sqlCondition);
		}
		if(null!=createDateGE && !"".equals(createDateGE)){
			map.put("intentDateGe", createDateGE);
		}
		if(null!=createDateLE && !"".equals(createDateLE)){
			map.put("intentDateLe", createDateLE);
		}
		
		ReportUtil.createReportHtml(map,reportKey,reportType,  this.getRequest());
	}
	
	/**
	 * 单笔最大十户贷款统计表
	 * add by linyan 2015-7-31
	 * @return
	 */
	public void tenMaxLoanCustomer(){
		String reportType=this.getRequest().getParameter("reportType");
		String reportKey=this.getRequest().getParameter("reportKey");
		String createDateGE=this.getRequest().getParameter("createDate_GE");//开始时间
		String createDateLE=this.getRequest().getParameter("createDate_LE");//截止时间
		Map<String,String> map=new HashMap<String,String>();
		//拼接sql参数
		String sqlCondition="";
		if(null!=createDateGE && !"".equals(createDateGE)){
			createDateGE=DateUtil.dateToStr(new Date(createDateGE), "yyyy-MM-dd");
			sqlCondition=sqlCondition+" and bp.startDate>=\""+createDateGE+"\"";
		}
		if(null!=createDateLE && !"".equals(createDateLE)){
			createDateLE=DateUtil.dateToStr(new Date(createDateLE), "yyyy-MM-dd");
			sqlCondition=sqlCondition+" and bp.startDate<=\""+createDateLE+"\"";
		}
		if(!"".equals(sqlCondition)){
			map.put("sqlCondition", sqlCondition);
		}
		if(null!=createDateGE && !"".equals(createDateGE)){
			//createDateGE=DateUtil.dateToStr(new Date(createDateGE), "yyyy-MM-dd");
			map.put("intentDateGe", createDateGE);
		}
		if(null!=createDateLE && !"".equals(createDateLE)){
			//createDateLE=DateUtil.dateToStr(new Date(createDateLE), "yyyy-MM-dd");
			map.put("intentDateLe", createDateLE);
		}
		ReportUtil.createReportHtml(map,reportKey,reportType,  this.getRequest());
	}
}