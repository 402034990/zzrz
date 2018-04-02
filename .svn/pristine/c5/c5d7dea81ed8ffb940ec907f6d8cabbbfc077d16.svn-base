package com.nc.dao;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.nc.model.NcPushRecord;
import com.zhiwei.core.dao.BaseDao;
import com.zhiwei.core.web.paging.PageBean;

/**
 * 
 * @author 
 *
 */
public interface NcPushRecordDao extends BaseDao<NcPushRecord>{
	/**
	 * 根据请求流水号与业务类型调用
	 * @param requestNo
	 * @param serviceType
	 * @return
	 */
	public List<NcPushRecord> getByRequestNo(String requestNo,String serviceType);
	/**
	 * 查询推送失败的记录
	 * @return
	 */
	public List<NcPushRecord> getByFail();
	/**
	 * 查询列表
	 * @param pageBean
	 */
	public void listAll(PageBean<NcPushRecord> pageBean);
}