package com.zhiwei.credit.model.creditFlow.common;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * 
 * @author 
 *
 */
/**
 * BpDicAccountTitleSet Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class BpDicAccountTitleSet extends com.zhiwei.core.model.BaseModel {

    protected Long id;
	protected Long listId;
	protected String keyName;
	protected String keyId;
	protected String title;
	protected String subTitle;
	protected String subKey;
    
	/**
	 * 以前字段不与数据库关联
	 */
	protected String titleClassName;
	


	public String getTitleClassName() {
		return titleClassName;
	}

	public void setTitleClassName(String titleClassName) {
		this.titleClassName = titleClassName;
	}

	/**
	 * Default Empty Constructor for class BpDicAccountTitleSet
	 */
	public BpDicAccountTitleSet () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BpDicAccountTitleSet
	 */
	public BpDicAccountTitleSet (
		 Long in_id
        ) {
		this.setId(in_id);
    }

    

	/**
	 * 	 * @return Long
     * @hibernate.id column="id" type="java.lang.Long" generator-class="native"
	 */
	public Long getId() {
		return this.id;
	}
	
	/**
	 * Set the id
	 */	
	public void setId(Long aValue) {
		this.id = aValue;
	}	

	/**
	 * 配置表ID	 * @return Long
	 * @hibernate.property column="listId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getListId() {
		return this.listId;
	}
	
	/**
	 * Set the listId
	 */	
	public void setListId(Long aValue) {
		this.listId = aValue;
	}	

	/**
	 * keyName	 * @return String
	 * @hibernate.property column="keyName" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getKeyName() {
		return this.keyName;
	}
	
	/**
	 * Set the keyName
	 */	
	public void setKeyName(String aValue) {
		this.keyName = aValue;
	}	

	/**
	 * keyId	 * @return String
	 * @hibernate.property column="keyId" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getKeyId() {
		return this.keyId;
	}
	
	/**
	 * Set the keyId
	 */	
	public void setKeyId(String aValue) {
		this.keyId = aValue;
	}	

	/**
	 * title	 * @return String
	 * @hibernate.property column="title" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getTitle() {
		return this.title;
	}
	
	/**
	 * Set the title
	 */	
	public void setTitle(String aValue) {
		this.title = aValue;
	}	

	/**
	 * 二级科目名称	 * @return String
	 * @hibernate.property column="subTitle" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getSubTitle() {
		return this.subTitle;
	}
	
	/**
	 * Set the subTitle
	 */	
	public void setSubTitle(String aValue) {
		this.subTitle = aValue;
	}	

	/**
	 * subKey	 * @return String
	 * @hibernate.property column="subKey" type="java.lang.String" length="100" not-null="false" unique="false"
	 */
	public String getSubKey() {
		return this.subKey;
	}
	
	/**
	 * Set the subKey
	 */	
	public void setSubKey(String aValue) {
		this.subKey = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BpDicAccountTitleSet)) {
			return false;
		}
		BpDicAccountTitleSet rhs = (BpDicAccountTitleSet) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.listId, rhs.listId)
				.append(this.keyName, rhs.keyName)
				.append(this.keyId, rhs.keyId)
				.append(this.title, rhs.title)
				.append(this.subTitle, rhs.subTitle)
				.append(this.subKey, rhs.subKey)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.listId) 
				.append(this.keyName) 
				.append(this.keyId) 
				.append(this.title) 
				.append(this.subTitle) 
				.append(this.subKey) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("listId", this.listId) 
				.append("keyName", this.keyName) 
				.append("keyId", this.keyId) 
				.append("title", this.title) 
				.append("subTitle", this.subTitle) 
				.append("subKey", this.subKey) 
				.toString();
	}



}
