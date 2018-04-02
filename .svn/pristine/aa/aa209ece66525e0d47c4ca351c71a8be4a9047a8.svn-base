package com.zhiwei.credit.service.creditFlow.archives.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.service.impl.BaseServiceImpl;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.credit.dao.creditFlow.archives.PlProjectArchivesDao;
import com.zhiwei.credit.model.creditFlow.archives.PlProjectArchives;
import com.zhiwei.credit.service.creditFlow.archives.PlProjectArchivesService;

/**
 * 
 * @author 
 *
 */
public class PlProjectArchivesServiceImpl extends BaseServiceImpl<PlProjectArchives> implements PlProjectArchivesService{
	@SuppressWarnings("unused")
	private PlProjectArchivesDao dao;
	
	public PlProjectArchivesServiceImpl(PlProjectArchivesDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List searchproject(Map<String, String> map, String businessType) {
		// TODO Auto-generated method stub
		return dao.searchproject(map, businessType);
	}

	@Override
	public int searchprojectsize(Map<String, String> map, String businessType) {
		// TODO Auto-generated method stub
		return dao.searchprojectsize(map, businessType);
	}

	@Override
	public List<PlProjectArchives> getbyproject(Long projectId,
			String businessType) {
		// TODO Auto-generated method stub
		return dao.getbyproject(projectId, businessType);
	}

	@Override
	public Long projectCount(String businessType, HttpServletRequest request) {
		
		return dao.projectCount(businessType, request);
	}

	@Override
	public List projectList(String businessType, HttpServletRequest request,int start,int limit) {
	
		return dao.projectList(businessType, request,start,limit);
	}

	@Override
	public void putInStorage(HttpServletRequest request) {
		try {
			String projectIds=request.getParameter("projectIds");
			String businessTypes=request.getParameter("businessTypes");
			PlProjectArchives p=new PlProjectArchives();
			BeanUtil.populateEntity(request, p, "plProjectArchives");
			if(projectIds!=null&&!"".equals(projectIds)){
				String strProjectIds[]=projectIds.split(",");
				String strBusinessTypes[]=businessTypes.split(",");
				for (int i = 0; i < strProjectIds.length; i++) {
					Long projectId=Long.valueOf(strProjectIds[i]);
					String businessType=strBusinessTypes[i];
					List<PlProjectArchives> li=this.dao.getbyproject(projectId, businessType);
					if(!li.isEmpty()){
						for (PlProjectArchives plProjectArchives : li) {
							plProjectArchives.setIsIntStroage(p.getIsIntStroage());
							plProjectArchives.setInStorageDate(p.getInStorageDate());
							plProjectArchives.setProjectId(projectId);
							plProjectArchives.setIsArchives(Short.valueOf("1"));
							plProjectArchives.setBusinessType(businessType);
							plProjectArchives.setInStorageRemark(p.getInStorageRemark());
							plProjectArchives.setHanderId(p.getHanderId());
							plProjectArchives.setHanderName(p.getHanderName());
							this.dao.merge(plProjectArchives);
						}
					}else{
						PlProjectArchives plProjectArchives=new PlProjectArchives();
						plProjectArchives.setIsIntStroage(p.getIsIntStroage());
						plProjectArchives.setInStorageDate(p.getInStorageDate());
						plProjectArchives.setProjectId(projectId);
						plProjectArchives.setBusinessType(businessType);
						plProjectArchives.setIsArchives(Short.valueOf("1"));
						plProjectArchives.setInStorageRemark(p.getInStorageRemark());
						plProjectArchives.setHanderId(p.getHanderId());
						plProjectArchives.setHanderName(p.getHanderName());
						this.dao.save(plProjectArchives);
					}
				}
			}
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}