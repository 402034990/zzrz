package com.zhiwei.credit.model.creditFlow.creditmanagement;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.zhiwei.core.model.BaseModel;

public class Options extends BaseModel{
	/**
	 * 主键
	 */
	private int id;
	/**
	 * 指标库Id
	 */
	private int indicatorId;
	/**
	 * 序号
	 */
	private int sortNo;
	/**
	 * 选项名称
	 */
	private String optionName;
	/**
	 * 分值
	 */
	private int score;
	/**
	 * 分类
	 * dl：定量，dx：定性
	 */
	private String ptype;//用来区分 各种指标的文件
	
	

	public String getPtype() {
		return ptype;
	}

	public void setPtype(String ptype) {
		this.ptype = ptype;
	}

	public Options() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getIndicatorId() {
		return indicatorId;
	}

	public void setIndicatorId(int indicatorId) {
		this.indicatorId = indicatorId;
	}

	public int getSortNo() {
		return sortNo;
	}

	public void setSortNo(int sortNo) {
		this.sortNo = sortNo;
	}

	public String getOptionName() {
		return optionName;
	}

	public void setOptionName(String optionName) {
		this.optionName = optionName;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}
	 public String  getComparableValue(){
		String regEx="[^0-9]";   
		Pattern p = Pattern.compile(regEx);   
		Matcher m = p.matcher(getOptionName()); 
		System.out.println(m.replaceAll("").trim());
		return m.replaceAll("").trim();
	 }
	
}
