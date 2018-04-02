package com.zhiwei.credit.service.creditFlow.customer.enterprise;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.BpDicAccountTitle;

/**
 * 
 * @author 
 *
 */
public interface BpDicAccountTitleService extends BaseService<BpDicAccountTitle>{
	public List<BpDicAccountTitle> listClassName();
	public List<BpDicAccountTitle> listTitle(String className);
	public BpDicAccountTitle findByKeyName(String keyName);
}


