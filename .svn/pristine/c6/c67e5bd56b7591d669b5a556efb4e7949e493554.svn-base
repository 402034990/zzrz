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
 * BpDicAccountTitleSetIndex Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class BpDicAccountTitleSetIndex extends com.zhiwei.core.model.BaseModel {

    protected Long id;
	protected String listType;
	protected String listName;
	protected String remark;

    /**
     * 该字段不与数据库相关联,账套配置下的科目数量
     */
	protected int listCount;
	
	public int getListCount() {
		return listCount;
	}

	public void setListCount(int listCount) {
		this.listCount = listCount;
	}

	/**
	 * Default Empty Constructor for class BpDicAccountTitleSetIndex
	 */
	public BpDicAccountTitleSetIndex () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BpDicAccountTitleSetIndex
	 */
	public BpDicAccountTitleSetIndex (
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
	 * listType	 * @return String
	 * @hibernate.property column="listType" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getListType() {
		return this.listType;
	}
	
	/**
	 * Set the listType
	 */	
	public void setListType(String aValue) {
		this.listType = aValue;
	}	

	/**
	 * listName	 * @return String
	 * @hibernate.property column="listName" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getListName() {
		return this.listName;
	}
	
	/**
	 * Set the listName
	 */	
	public void setListName(String aValue) {
		this.listName = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="remark" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getRemark() {
		return this.remark;
	}
	
	/**
	 * Set the remark
	 */	
	public void setRemark(String aValue) {
		this.remark = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BpDicAccountTitleSetIndex)) {
			return false;
		}
		BpDicAccountTitleSetIndex rhs = (BpDicAccountTitleSetIndex) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.listType, rhs.listType)
				.append(this.listName, rhs.listName)
				.append(this.remark, rhs.remark)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.listType) 
				.append(this.listName) 
				.append(this.remark) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("listType", this.listType) 
				.append("listName", this.listName) 
				.append("remark", this.remark) 
				.toString();
	}



}
