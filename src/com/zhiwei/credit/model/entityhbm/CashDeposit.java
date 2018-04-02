package com.zhiwei.credit.model.entityhbm;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 保证金实体类
 * @author XiRuiJie
 *
 */
public class CashDeposit  {
	
	 private Long id;
	 private String cashName;//保证金账户名
	 private BigDecimal cashmoney;//保证金金额
	 private BigDecimal cashrate;//保证金创建比率
	 private BigDecimal cashzhanyong;//保证金占用金额
	 private BigDecimal cashshengyu;//保证金剩余金额
	 private Long custormerId;//客户主键
	 private String custormerType;//客户类型
	 private Date cashdate;//保证金创建时间
	 private String custormerName;//客户名称
	 private String custormerNum;//客户编号
	 private String cashMobilphone;//客户联系方式
	 private Long cashLegalRepresentativeId;//法定代表人主键
	 private String cashLegalRepresentative;//法定代表人
	 private Long cashCountId;//开户人主键
	 private String cashCount;//开户人
	 
	 /**
	 * 推送流水号
	 */
	 private String requestNo;
	 
	public String getCustormerType() {
		return custormerType;
	}
	public void setCustormerType(String custormerType) {
		this.custormerType = custormerType;
	}
	public String getCustormerNum() {
		return custormerNum;
	}
	public void setCustormerNum(String custormerNum) {
		this.custormerNum = custormerNum;
	}
	public Long getCashLegalRepresentativeId() {
		return cashLegalRepresentativeId;
	}
	public void setCashLegalRepresentativeId(Long cashLegalRepresentativeId) {
		this.cashLegalRepresentativeId = cashLegalRepresentativeId;
	}
	public Long getCashCountId() {
		return cashCountId;
	}
	public void setCashCountId(Long cashCountId) {
		this.cashCountId = cashCountId;
	}
	public String getCashCount() {
		return cashCount;
	}
	public void setCashCount(String cashCount) {
		this.cashCount = cashCount;
	}
	public String getCashLegalRepresentative() {
		return cashLegalRepresentative;
	}
	public void setCashLegalRepresentative(String cashLegalRepresentative) {
		this.cashLegalRepresentative = cashLegalRepresentative;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCashName() {
		return cashName;
	}
	public void setCashName(String cashName) {
		this.cashName = cashName;
	}
	
	public String getCashMobilphone() {
		return cashMobilphone;
	}
	public void setCashMobilphone(String cashMobilphone) {
		this.cashMobilphone = cashMobilphone;
	}

	public BigDecimal getCashmoney() {
		return cashmoney;
	}
	public void setCashmoney(BigDecimal cashmoney) {
		this.cashmoney = cashmoney;
	}
	public BigDecimal getCashrate() {
		return cashrate;
	}
	public void setCashrate(BigDecimal cashrate) {
		this.cashrate = cashrate;
	}
	public BigDecimal getCashzhanyong() {
		return cashzhanyong;
	}
	public void setCashzhanyong(BigDecimal cashzhanyong) {
		this.cashzhanyong = cashzhanyong;
	}
	public BigDecimal getCashshengyu() {
		return cashshengyu;
	}
	public void setCashshengyu(BigDecimal cashshengyu) {
		this.cashshengyu = cashshengyu;
	}
	public Long getCustormerId() {
		return custormerId;
	}
	public void setCustormerId(Long custormerId) {
		this.custormerId = custormerId;
	}

	public Date getCashdate() {
		return cashdate;
	}
	public void setCashdate(Date cashdate) {
		this.cashdate = cashdate;
	}
	public String getCustormerName() {
		return custormerName;
	}
	public void setCustormerName(String custormerName) {
		this.custormerName = custormerName;
	}
	public String getRequestNo() {
		return requestNo;
	}
	public void setRequestNo(String requestNo) {
		this.requestNo = requestNo;
	}
	 
	 
	

}
