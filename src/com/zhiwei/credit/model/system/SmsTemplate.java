package com.zhiwei.credit.model.system;

public class SmsTemplate {
	/**
	 * 模板KEY
	 */
	public String key;
	/**
	 * 模板用途说明
	 */
	public String useExplain;
	/**
	 * 模板内容
	 */
	public String content;
	/**
	 * 备注
	 */
	public String remark;
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getUseExplain() {
		return useExplain;
	}
	public void setUseExplain(String useExplain) {
		this.useExplain = useExplain;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}

}
