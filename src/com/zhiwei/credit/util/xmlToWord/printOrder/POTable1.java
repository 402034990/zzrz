package com.zhiwei.credit.util.xmlToWord.printOrder;

public class POTable1 {
	
	private String productName = "";
	
	/**
	 * 本期年化收益率
	 */
	private String productRate = "";
	
	/**
	 * 出账日期
	 */
	private String planDate = "";
	
	/**
	 * 债权收益
	 */
	private String creditorIncomeMoney = "";

	public String getProductRate() {
		return productRate;
	}

	public void setProductRate(String productRate) {
		this.productRate = productRate;
	}

	public String getPlanDate() {
		return planDate;
	}

	public void setPlanDate(String planDate) {
		this.planDate = planDate;
	}

	public String getCreditorIncomeMoney() {
		return creditorIncomeMoney;
	}

	public void setCreditorIncomeMoney(String creditorIncomeMoney) {
		this.creditorIncomeMoney = creditorIncomeMoney;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	
}
