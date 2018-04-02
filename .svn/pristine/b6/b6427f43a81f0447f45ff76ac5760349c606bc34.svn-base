package com.nc.model;

import java.math.BigDecimal;
import java.util.Date;
/**
 * 资金推送信息
 * @author huanggh
 *
 */
public class NcPushMoney {
	/**
	 * 公司编码 默认值
	 */
	public static final String CORP_1002 = "1002";
	
	
	/**
	 * 贷款类型  --- 短期贷款
	 */
	public static final String CREDITTYPE_A1 = "A1";
	/**
	 * 贷款类型  --- 长期贷款
	 */
	public static final String CREDITTYPE_A2 = "A2";
	
	
	/**
	 * 担保方式  --- 信用
	 */
	public static final String GUARANT_B1 = "B1";
	/**
	 * 担保方式  --- 抵押
	 */
	public static final String GUARANT_B2 = "B2";
	/**
	 * 担保方式  --- 质押
	 */
	public static final String GUARANT_B3 = "B3";
	/**
	 * 担保方式  --- 保证 
	 */
	public static final String GUARANT_B4 = "B4";
	
	
	/**
	 * 操作类型  --- 放款
	 */
	public static final Integer OPTTYPE_1 = 1;
	/**
	 * 操作类型  --- 还款
	 */
	public static final Integer OPTTYPE_2 = 2;
	/**
	 * 操作类型  --- 保证金收取
	 */
	public static final Integer OPTTYPE_3 = 3;
	/**
	 * 操作类型  --- 保证金退还
	 */
	public static final Integer OPTTYPE_4 = 4;
	/**
	 * 操作类型  --- 手续费收取
	 */
	public static final Integer OPTTYPE_5 = 5;
	
	/**
	 * 交易类型  --- 记账
	 */
	public static final Integer UNDO_1 = 1;
	/**
	 * 交易类型  --- 撤销记账
	 */
	public static final Integer UNDO_2 = 2;
	
	
	
	
	
	/**
	 * 业务流水号
	 */
	protected String busid; 
	/**
	 * 公司编码
	 * 1002(默认)
	 */
	protected String corp; 
	/**
	 * 贷款类型
	 * 短期贷款(小于等于12个月) ： A1
	 * 长期贷款(大于12个月)：A2
	 */
	protected String credittype; 
	/**
	 * 担保方式
	 * 信用 ： B1
	 * 抵押 ：B2
	 * 质押 ：B3
	 * 保证 ：B4
	 */
	protected String guarant; 
	/**
	 * 放款金额
	 */
	protected BigDecimal amount; 
	/**
	 * 放款日期
	 */
	protected String busidate; 
	/**
	 * 银行账户
	 */
	protected String corpaccount; 
	/**
	 * 借款人ID
	 */
	protected String custid; 
	/**
	 * 借款人
	 */
	protected String cust; 
	/**
	 * 实收本金
	 */
	protected BigDecimal principal; 
	/**
	 * 实收利息
	 */
	protected BigDecimal accrual; 
	/**
	 * 实收逾期贷款息
	 */
	protected BigDecimal overaccrual; 
	/**
	 * 实收罚息
	 */
	protected BigDecimal penalty; 
	/**
	 * 实收违约金
	 */
	protected BigDecimal defaultmny; 
	/**
	 * 实收代理费
	 */
	protected BigDecimal entrustamount; 
	/**
	 * 利息税
	 */
	protected BigDecimal acctax; 
	/**
	 * 逾期利息税
	 */
	protected BigDecimal overacctax; 
	/**
	 * 罚息税
	 */
	protected BigDecimal pentax; 
	/**
	 * 代理费税
	 */
	protected BigDecimal entrustax; 
	/**
	 * 手续费税
	 */
	protected BigDecimal fee; 
	/**
	 * 操作类型
	 * 放款：1
	 * 还款：2
	 * 保证金收取：3
	 * 保证金退还：4
	 * 手续费收取：5
	 */
	protected Integer opttype; 
	/**
	 * 交易类型
	 * 1: 表示记账
	 * 2: 表示撤销记账
	 */
	protected Integer undo;
	/**
	 * 对账人姓名
	 */
	protected String voperatorid;
	
	
	public String getBusid() {
		return busid;
	}
	public void setBusid(String busid) {
		this.busid = busid;
	}
	public String getCorp() {
		return corp;
	}
	public void setCorp(String corp) {
		this.corp = corp;
	}
	public String getCredittype() {
		return credittype;
	}
	public void setCredittype(String credittype) {
		this.credittype = credittype;
	}
	public String getGuarant() {
		return guarant;
	}
	public void setGuarant(String guarant) {
		this.guarant = guarant;
	}
	public String getCorpaccount() {
		return corpaccount;
	}
	public void setCorpaccount(String corpaccount) {
		this.corpaccount = corpaccount;
	}
	public String getCustid() {
		return custid;
	}
	public void setCustid(String custid) {
		this.custid = custid;
	}
	public String getCust() {
		return cust;
	}
	public void setCust(String cust) {
		this.cust = cust;
	}
	public Integer getOpttype() {
		return opttype;
	}
	public void setOpttype(Integer opttype) {
		this.opttype = opttype;
	}
	public Integer getUndo() {
		return undo;
	}
	public void setUndo(Integer undo) {
		this.undo = undo;
	}
	public String getBusidate() {
		return busidate;
	}
	public void setBusidate(String busidate) {
		this.busidate = busidate;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public BigDecimal getPrincipal() {
		return principal;
	}
	public void setPrincipal(BigDecimal principal) {
		this.principal = principal;
	}
	public BigDecimal getAccrual() {
		return accrual;
	}
	public void setAccrual(BigDecimal accrual) {
		this.accrual = accrual;
	}
	public BigDecimal getOveraccrual() {
		return overaccrual;
	}
	public void setOveraccrual(BigDecimal overaccrual) {
		this.overaccrual = overaccrual;
	}
	public BigDecimal getPenalty() {
		return penalty;
	}
	public void setPenalty(BigDecimal penalty) {
		this.penalty = penalty;
	}
	public BigDecimal getDefaultmny() {
		return defaultmny;
	}
	public void setDefaultmny(BigDecimal defaultmny) {
		this.defaultmny = defaultmny;
	}
	public BigDecimal getEntrustamount() {
		return entrustamount;
	}
	public void setEntrustamount(BigDecimal entrustamount) {
		this.entrustamount = entrustamount;
	}
	public BigDecimal getAcctax() {
		return acctax;
	}
	public void setAcctax(BigDecimal acctax) {
		this.acctax = acctax;
	}
	public BigDecimal getOveracctax() {
		return overacctax;
	}
	public void setOveracctax(BigDecimal overacctax) {
		this.overacctax = overacctax;
	}
	public BigDecimal getPentax() {
		return pentax;
	}
	public void setPentax(BigDecimal pentax) {
		this.pentax = pentax;
	}
	public BigDecimal getEntrustax() {
		return entrustax;
	}
	public void setEntrustax(BigDecimal entrustax) {
		this.entrustax = entrustax;
	}
	public BigDecimal getFee() {
		return fee;
	}
	public void setFee(BigDecimal fee) {
		this.fee = fee;
	}
	public String getVoperatorid() {
		return voperatorid;
	}
	public void setVoperatorid(String voperatorid) {
		this.voperatorid = voperatorid;
	} 
	
}
