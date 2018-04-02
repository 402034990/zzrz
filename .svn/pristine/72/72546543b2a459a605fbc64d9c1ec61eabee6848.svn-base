package com.contract;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;

import com.credit.proj.entity.ProcreditMortgageCar;
import com.zhiwei.credit.model.creditFlow.finance.BpFundIntent;
import com.zhiwei.credit.model.creditFlow.finance.SlFundIntent;
import com.zhiwei.credit.model.customer.InvestPersonInfo;
import com.zhiwei.credit.service.creditFlow.finance.BpFundIntentService;

/**
 * 创建表格数据模板类
 * @author zhangcb
 *
 */
public class SignTableList {
	
	public static SimpleDateFormat sd=new SimpleDateFormat("yyyy-MM-dd");
	
	/**
	 * 投资人款项计划
	 * 序号-期数-资金类型-计划收入金额-计划支出金额-计划到账日期
	 * @param jkrFundList
	 * @return
	 */
	public static List<List<String>> tzrFundIntentTable(List<BpFundIntent> jkrFundList){
		List<List<String>> resultList = new ArrayList<List<String>>();
		if(null!=jkrFundList && jkrFundList.size()>0){
			List<String> headerList = new ArrayList<String>();
			headerList.add("序号");
			headerList.add("期数");
			headerList.add("资金类型");
			headerList.add("计划收入金额");
			headerList.add("计划到账日期");
			resultList.add(headerList);
			for (int i = 1; i <= jkrFundList.size(); i++) {
				BpFundIntent  f = jkrFundList.get(i-1);
				List<String> list = new ArrayList<String>();
				list.add("" + i);
				list.add("第"+f.getPayintentPeriod()+"期");
				list.add(f.getFundType());
				list.add((null==f.getIncomeMoney()?"0":f.getIncomeMoney())+"元");
				list.add(null!=f.getIntentDate()?sd.format(f.getIntentDate()):"");
				resultList.add(list);
			}
		}
		return resultList;
	}
	
	/**
	 * 放款收息表
	 * 期数-本金-利息-随期收费一-随期收费二-计划到账日期
	 * @param 
	 * @return
	 */
	public static List<List<String>> fksSlFundIntentTable(List<SlFundIntent> jkrFundList){
		List<List<String>> resultList = new ArrayList<List<String>>();
		if(null!=jkrFundList && jkrFundList.size()>0){
			List<String> headerList = new ArrayList<String>();
//			headerList.add("序号");
			headerList.add("期数");
			headerList.add("本金");
			headerList.add("利息");
			headerList.add("随期收费1");
			headerList.add("随期收费2");
			headerList.add("计划到账日期");
			resultList.add(headerList);
			
			int  qishu=1;
			Boolean  flag = true;
			Boolean  sl = true;
			List<String> list = null;
			List<Map> 	list1 = new ArrayList<Map>();
			Map<String,Object>  map =null;
			for (int i = 0; i <jkrFundList.size(); i++) {
				if(jkrFundList.get(i).getPayintentPeriod()>=1){
					SlFundIntent  f = jkrFundList.get(i);
					if(flag){
						map  = new  HashMap<String,Object>();
						flag = false;
						map.put("qishu", "第"+f.getPayintentPeriod()+"期");
//						list.add("第"+f.getPayintentPeriod()+"期");
						map.put("huankuanri", null!=f.getIntentDate()?sd.format(f.getIntentDate()):"");
//						list.add(null!=f.getIntentDate()?sd.format(f.getIntentDate()):"");
					} 
//					if(jkrFundList.get(i).getPayintentPeriod()>qishu){
//					
//						qishu = jkrFundList.get(i).getPayintentPeriod();
//					}
				         // 本金
					if(f.getFundType().equals("principalRepayment")){   //本金
						map.put("benjijn", (f.getIncomeMoney())+"元");
//						list.add((f.getIncomeMoney())+"元");
					}else if(f.getFundType().equals("loanInterest")){
						map.put("lixi", f.getIncomeMoney().toString());
//						list.add(f.getIncomeMoney().toString());
					}else   if(f.getFundType().equals("consultationMoney")){  // 随1
						map.put("suiji1", f.getIncomeMoney().toString());
//						list.add(f.getIncomeMoney().toString());
					}else  if(f.getFundType().equals("serviceMoney")){   //随2
						map.put("suiji2", f.getIncomeMoney().toString());
//						list.add(f.getIncomeMoney().toString());
					}
						if((i+1)==jkrFundList.size()){
							list1.add(map);
//							    resultList.add(list);  // 
						}else{
							if(jkrFundList.get(i).getPayintentPeriod().toString().equals(jkrFundList.get(i+1).getPayintentPeriod().toString())){
								
							}else {
								list1.add(map);
								flag = true;
								qishu = jkrFundList.get(i+1).getPayintentPeriod();
							}
						}
//					list.add((null==f.getIncomeMoney()?"0":f.getIncomeMoney())+"元");
//					list.add(null!=f.getIntentDate()?sd.format(f.getIntentDate()):"");
				}
				
			}
			for(int j=0;j<list1.size();j++){
				list = new ArrayList<String>();
				Map<String,Object>  map1  = list1.get(j);
				list.add(map1.get("qishu").toString());
				if(map1.get("benjijn")!=null && !"".equals(map1.get("benjijn"))){
					list.add(map1.get("benjijn").toString());
				}else  {
					list.add("0.00");
				}
				list.add((String)map1.get("lixi"));
				list.add((String)map1.get("suiji1"));
				list.add((String)map1.get("suiji2"));
				list.add((String)map1.get("huankuanri"));
				resultList.add(list);
				
			}
			
			
		}
		return resultList;
	}
	
	@Test
	public  void  test(){
		Map<String,Object>  map1 = new HashMap<String,Object>();
		
		map1.put("qishu", 1);
		System.out.println(map1.get("1212"));
	
	}
	
	/**
	 * 抵质押物列表
	 * 序号-厂牌型号-车牌型号-发动机号-车架号-所有权登记证书编号-行驶证正副证
	 * @param jkrFundList
	 * @return
	 */
	public static List<List<String>> dzyMortgageTable(List<ProcreditMortgageCar> jkrFundList){
		List<List<String>> resultList = new ArrayList<List<String>>();
		if(null!=jkrFundList && jkrFundList.size()>0){
			List<String> headerList = new ArrayList<String>();
			headerList.add("序号");
			headerList.add("厂牌型号");
			headerList.add("车牌号");
			headerList.add("发动机号");
			headerList.add("车架号");
			headerList.add("所有权登记证书编号");
			headerList.add("行驶证正副证");
			resultList.add(headerList);
			for (int i = 1; i <= jkrFundList.size(); i++) {
				ProcreditMortgageCar  f = jkrFundList.get(i-1);
				List<String> list = new ArrayList<String>();
				list.add("" + i);
				list.add(null!=f.getModelName()?f.getModelName():"");
				list.add(null!=f.getCarNumber()?f.getCarNumber():"");
				list.add(null!=f.getEngineNo()?f.getEngineNo():"");
				list.add(null!=f.getVin()?f.getVin():"");
				list.add(null!=f.getPledgenumber()?f.getPledgenumber():"");
				list.add("齐全,有效	");
				resultList.add(list);
			}
		}
		return resultList;
	}
	
	/**
	 * 借款人还款计划
	 * @param esList  款项记录
	 * @return
	 */
	public static List<List<String>> jkrBpFundIntentTable(List<BpFundIntent> esList){
		List<List<String>> resultList = new ArrayList<List<String>>();
		if(null!=esList && esList.size()>0){
			List<String> headerList = new ArrayList<String>();
			headerList.add("还款日");
			headerList.add("本金");
			headerList.add("利息");
			headerList.add("财务服务费");
			headerList.add("管理咨询费");
			headerList.add("合计");
			resultList.add(headerList);
			for (int i = 1; i <= esList.size(); i++) {
				BpFundIntent  es = esList.get(i-1);
				List<String> list = new ArrayList<String>();
				list.add(sd.format(es.getIntentDate()).toString());
				if(null==es.getPrincipal()){
					es.setPrincipal(new BigDecimal("0"));
				}
				list.add(es.getPrincipal().toString());
				if(null==es.getInterest()){
					es.setInterest(new BigDecimal("0"));
				}
				list.add(es.getInterest().toString());
				if(null==es.getConsultationMoney()){
					es.setConsultationMoney(new BigDecimal("0"));
				}
				list.add(es.getConsultationMoney().toString());
				if(null==es.getServiceMoney()){
					es.setServiceMoney(new BigDecimal("0"));
				}
				list.add(es.getServiceMoney().toString());
				list.add(es.getPrincipal().add(es.getInterest()).add(es.getConsultationMoney()).add(es.getServiceMoney()).toString());
				resultList.add(list);
			}
		}
		return resultList;
	}
	
	/**
	 * 投资人列表
	 * 序号-资金来源-投资方-投资金额-应收本息
	 * @param plist 投资人投资记录
	 * @return
	 */
	public static List<List<String>> investPersonTable(List<InvestPersonInfo> plist,BpFundIntentService service){
		List<List<String>> resultList = new ArrayList<List<String>>();
		if(null!=plist && plist.size()>0){
			List<String> headerList = new ArrayList<String>();
			headerList.add("序号");
			headerList.add("资金来源");
			headerList.add("投资方");
			headerList.add("投资金额");
			headerList.add("应收本息");
			resultList.add(headerList);
			for (int i = 1; i <= plist.size(); i++) {
				InvestPersonInfo  p = plist.get(i-1);
				BigDecimal money= service.getPrincipalAndInterest(p.getBidPlanId(),p.getOrderNo());
				List<String> list = new ArrayList<String>();
				list.add(i+"");
				list.add("个人");
				list.add(p.getInvestPersonName());
				list.add((null==p.getInvestMoney()?0:p.getInvestMoney())+"元");
				list.add((null==money?0:money)+"元");
				resultList.add(list);
			}
		}
		return resultList;
	}
}
