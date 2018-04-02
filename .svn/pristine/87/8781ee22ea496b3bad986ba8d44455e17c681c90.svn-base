package com.zhiwei.credit.action.system;

/*
 *  北京互融时代软件有限公司 OA办公管理系统   --  http://www.hurongtime.com
 *  Copyright (C) 2008-2011 zhiwei Software Company
 */

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.jbpm.api.TaskService;
import org.jbpm.api.task.Task;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.Constants;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.log.LogResource;
import com.zhiwei.core.model.OnlineUser;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.util.ContextUtil;
import com.zhiwei.core.util.JsonUtil;
import com.zhiwei.core.util.StringUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.core.web.paging.PagingBean;
import com.zhiwei.credit.model.system.AppRole;
import com.zhiwei.credit.model.system.AppUser;
import com.zhiwei.credit.model.system.Department;
import com.zhiwei.credit.model.system.IndexDisplay;
import com.zhiwei.credit.model.system.Organization;
import com.zhiwei.credit.model.system.PanelItem;
import com.zhiwei.credit.model.system.RelativeUser;
import com.zhiwei.credit.model.system.SysConfig;
import com.zhiwei.credit.model.system.UserOrg;
import com.zhiwei.credit.model.system.UserPosition;
import com.zhiwei.credit.service.system.AppRoleService;
import com.zhiwei.credit.service.system.AppUserService;
import com.zhiwei.credit.service.system.DepartmentService;
import com.zhiwei.credit.service.system.IndexDisplayService;
import com.zhiwei.credit.service.system.OrganizationService;
import com.zhiwei.credit.service.system.PositionService;
import com.zhiwei.credit.service.system.RelativeUserService;
import com.zhiwei.credit.service.system.SysConfigService;
import com.zhiwei.credit.service.system.UserOrgService;
import com.zhiwei.credit.service.system.UserPositionService;
import com.zhiwei.credit.util.ExceptionManager;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author csx
 * 
 */
public class AppUserAction extends BaseAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Resource
	private TaskService taskService;
	@Resource
	private UserPositionService userPositionService;
	@Resource
	private PositionService positionService;
	@Resource
	private OrganizationService organizationService;
	@Resource
	UserOrgService userOrgService;

	private static Long SUPPER_MANAGER_ID = -1l;// 超级管理员角色ID
	@Resource
	private AppUserService appUserService;
	@Resource
	private DepartmentService departmentService;
	@Resource
	private AppRoleService appRoleService;

	@Resource
	private IndexDisplayService indexDisplayService;

	@Resource
	private SysConfigService sysConfigService;
	@Resource
	private RelativeUserService relativeUserService;
	private AppUser appUser;

	private Long userId;

	private Long depId;

	private Long roleId;

	private String taskId;

	private String type;

	public Long getDepId() {
		return depId;
	}

	public void setDepId(Long depId) {
		this.depId = depId;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	/**
	 * 显示当前用户,并且加载该用户的所有权限
	 * 
	 * @return
	 */
	public String getCurrent() {
		AppUser currentUser = ContextUtil.getCurrentUser();
		Department curDep = currentUser.getDepartment();
		if (curDep == null) {// 若所属部门为空，则设置一个缺省的部门 TODO
			curDep = new Department();
			curDep.setDepId(0l);
			curDep.setDepName(AppUtil.getCompanyName());
		}
		// 去掉公共权限
		// Iterator<String> publicIds = AppUtil.getPublicMenuIds().iterator();
		// StringBuffer publicIdSb = new StringBuffer();
		//
		// while (publicIds.hasNext()) {
		// publicIdSb.append(",").append(publicIds.next());
		// }
		List<IndexDisplay> list = indexDisplayService.findByUser(currentUser
				.getUserId());
		List<PanelItem> items = new ArrayList<PanelItem>();
		for (IndexDisplay id : list) {
			PanelItem pi = new PanelItem();
			pi.setPanelId(id.getPortalId());
			pi.setColumn(id.getColNum());
			pi.setRow(id.getRowNum());
			items.add(pi);
		}
		StringBuffer sb = new StringBuffer();
		sb.append("{success:true,user:{userId:'").append(
				currentUser.getUserId()).append("',fullname:'").append(
				currentUser.getFullname()).append("',username:'").append(
				currentUser.getUsername()).append("',depId:'").append(
				curDep.getDepId()).append("',depName:'").append(
				curDep.getDepName()).append("',rights:'");
		sb.append(currentUser.getRights().toString().replace("[", "").replace(
				"]", ""));
		// 去掉公共权限
		// if (!"".equals(currentUser.getRights()) && publicIdSb.length() > 0) {
		// sb.append(publicIdSb.toString());
		// }

		Gson gson = new Gson();
		sb.append("',topModules:");
		sb.append(gson.toJson(currentUser.getTopModules().values()));
		sb.append(",items:").append(gson.toJson(items).toString());
		sb.append("},sysConfigs:{");
		// 系统配置也在此时加载
		List<SysConfig> sysConfigs = sysConfigService.getAll();
		for (SysConfig sysConfig : sysConfigs) {
			sb.append("'").append(sysConfig.getConfigKey()).append("':'")
					.append(sysConfig.getDataValue()).append("',");
		}
		if (sysConfigs.size() > 0) {
			sb.deleteCharAt(sb.length() - 1);
		}
		sb.append("}}");

		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 显示当前用户,并且加载该用户的所有权限
	 * 
	 * @return
	 */
	public String getCurrentNew() {

		String returnValue = "";
		appUserService.getCurUserInfo();

		if ("enterprise".equals(type)) {
			returnValue = "enterpriseAppUser";
		} else if ("person".equals(type)) {
			returnValue = "personAppUser";
		} else if ("bank".equals(type)) {
			returnValue = "bankAppUser";
		}

		return returnValue;
		/*
		 * AppUser currentUser = ContextUtil.getCurrentUser(); Department curDep
		 * = currentUser.getDepartment(); if (curDep == null) {//
		 * 若所属部门为空，则设置一个缺省的部门 TODO curDep = new Department();
		 * curDep.setDepId(0l); curDep.setDepName(AppUtil.getCompanyName()); }
		 * //去掉公共权限 // Iterator<String> publicIds =
		 * AppUtil.getPublicMenuIds().iterator(); // StringBuffer publicIdSb =
		 * new StringBuffer(); // // while (publicIds.hasNext()) { //
		 * publicIdSb.append(",").append(publicIds.next()); // }
		 * List<IndexDisplay> list = indexDisplayService.findByUser(currentUser
		 * .getUserId()); List<PanelItem> items = new ArrayList<PanelItem>();
		 * for (IndexDisplay id : list) { PanelItem pi = new PanelItem();
		 * pi.setPanelId(id.getPortalId()); pi.setColumn(id.getColNum());
		 * pi.setRow(id.getRowNum()); items.add(pi); } StringBuffer sb = new
		 * StringBuffer(); sb.append("{success:true,user:{userId:'").append(
		 * currentUser.getUserId()).append("',fullname:'").append(
		 * currentUser.getFullname()).append("',username:'").append(
		 * currentUser.getUsername()).append("',depId:'").append(
		 * curDep.getDepId()).append("',depName:'").append(
		 * curDep.getDepName()).append("',rights:'");
		 * sb.append(currentUser.getRights().toString().replace("[",
		 * "").replace( "]", "")); //去掉公共权限 // if
		 * (!"".equals(currentUser.getRights()) && publicIdSb.length() > 0) { //
		 * sb.append(publicIdSb.toString()); // }
		 * 
		 * Gson gson = new Gson(); sb.append("',topModules:");
		 * sb.append(gson.toJson(currentUser.getTopModules().values()));
		 * sb.append(",items:").append(gson.toJson(items).toString());
		 * sb.append("},sysConfigs:{"); //系统配置也在此时加载 List<SysConfig> sysConfigs
		 * = sysConfigService.getAll(); for(SysConfig sysConfig : sysConfigs){
		 * sb.append("'") .append(sysConfig.getConfigKey()) .append("':'")
		 * .append(sysConfig.getDataValue()) .append("',"); }
		 * if(sysConfigs.size()>0){ sb.deleteCharAt(sb.length()-1); }
		 * sb.append("}}"); setJsonString(sb.toString());
		 * 
		 * getRequest().setAttribute("enterpriseAppUser", sb.toString()); return
		 * "enterpriseAppUser";
		 */
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED.toString());
		filter.addFilter("Q_userId_L_GT", "1"); //不显示管理员账户
		List<AppUser> list = appUserService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),new String[] { "accessionTime" });
		buff.append(serializer.exclude(new String[] { "password" }).serialize(list));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 根据部门查找列表
	 */
	public String select() {
		PagingBean pb = getInitPagingBean();
		String strDepId = getRequest().getParameter("depId");
		// 表示从上级目录开始进行查找
		String path = "0.";
		appUser = ContextUtil.getCurrentUser();
		if (StringUtils.isNotEmpty(strDepId)) {
			Long depId = Long.parseLong(strDepId);
			Department dep = departmentService.get(depId);
			if (dep != null) {
				path = dep.getPath();
			}
		} else {
			Department dep = appUser.getDepartment();
			if (dep != null) {
				path = dep.getPath();
			}
		}

		List<AppUser> list = appUserService.findByDepartment(path, pb);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(pb.getTotalItems()).append(",result:");

		Type type = new TypeToken<List<AppUser>>() {
		}.getType();
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(list, type));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	public String getByDepartment() {

		AppUser appUser = null;
		if (taskId != null) {
			Task task = taskService.getTask(taskId);
			if (task != null && task.getAssignee() != null) {
				appUser = appUserService.get(new Long(task.getAssignee()));
			} else {
				appUser = ContextUtil.getCurrentUser();
			}
		} else {
			appUser = ContextUtil.getCurrentUser();
		}

		PagingBean pb = getInitPagingBean();
		String path = "0.";
		if (appUser != null && appUser.getDepartment() != null) {
			Long parentId = appUser.getDepartment().getParentId();
			Department dep = departmentService.get(parentId);
			if (dep != null) {
				path = dep.getPath();
			}
		}

		List<AppUser> list = appUserService.findByDepartment(path, pb);
		if (list != null && list.size() != 0) {
			StringBuffer buff = new StringBuffer("[");
			for (int i = 0; i < list.size(); i++) {
				buff.append("[").append(list.get(i).getUserId()).append(",'")
						.append(list.get(i).getFullname()).append("'],");
			}
			if (list.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);
			}
			buff.append("]");
			setJsonString(buff.toString());
		}
		return SUCCESS;
	}

	/**
	 * 在线用户
	 * 
	 * @return
	 */
	public String online() {
		Map<String, OnlineUser> onlineUsers = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersByDep = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersByRole = new HashMap<String, OnlineUser>();

		onlineUsers = AppUtil.getOnlineUsers();// 获得所有在线用户

		// 按部门选择在线用户
		if (depId != null) {
			for (String sessionId : onlineUsers.keySet()) {
				OnlineUser onlineUser = new OnlineUser();
				onlineUser = onlineUsers.get(sessionId);
				// if(onlineUser.getDepId().equals(depId)){
				String path = "";
				if (!onlineUser.getUserId().equals(AppUser.SUPER_USER)) {
					path = onlineUser.getDepPath();
				}
				if (!depId.equals(new Long(0))) {
					if (java.util.regex.Pattern.compile("." + depId + ".")
							.matcher(path).find()) {
						onlineUsersByDep.put(sessionId, onlineUser);
					}
				} else {
					onlineUsersByDep.put(sessionId, onlineUser);
				}
			}
		}

		// 按角色选择在线用户
		if (roleId != null) {
			for (String sessionId : onlineUsers.keySet()) {
				OnlineUser onlineUser = new OnlineUser();
				onlineUser = onlineUsers.get(sessionId);
				if (java.util.regex.Pattern.compile("," + roleId + ",")
						.matcher(onlineUser.getRoleIds()).find()) {
					onlineUsersByRole.put(sessionId, onlineUser);
				}
			}
		}

		Type type = new TypeToken<java.util.Collection<OnlineUser>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(onlineUsers.size()).append(",result:");

		Gson gson = new Gson();
		if (depId != null) {
			buff.append(gson.toJson(onlineUsersByDep.values(), type));
		} else if (roleId != null) {
			buff.append(gson.toJson(onlineUsersByRole.values(), type));
		} else {
			buff.append(gson.toJson(onlineUsers.values(), type));
		}
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 
	 * 根据角色查询
	 */
	public String find() {
		String strRoleId = getRequest().getParameter("roleId");
		PagingBean pb = getInitPagingBean();
		if (StringUtils.isNotEmpty(strRoleId)) {
			List<AppUser> userList = appUserService.findByRole(Long
					.parseLong(strRoleId), pb);
			Type type = new TypeToken<List<AppUser>>() {
			}.getType();
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(pb.getTotalItems()).append(",result:");
			Gson gson = new GsonBuilder()
					.excludeFieldsWithoutExposeAnnotation().create();
			buff.append(gson.toJson(userList, type));
			buff.append("}");

			jsonString = buff.toString();
		} else {
			jsonString = "{success:false}";
		}
		return SUCCESS;
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	@LogResource(description = "删除账户")
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		StringBuffer buff = new StringBuffer("{success:true");
		if (ids != null) {
			buff.append(",msg:'");
			for (String id : ids) {
				AppUser delUser = appUserService.get(new Long(id));
				AppRole superManager = appRoleService.get(SUPPER_MANAGER_ID);
				if (delUser.getRoles().contains(superManager)) {
					buff.append("员工:").append(delUser.getUsername()).append(
							"是超级管理员,不能删除!<br><br/>");
				} else if (delUser.getUserId().equals(
						ContextUtil.getCurrentUserId())) {
					buff.append("不能删除自己!<br></br>");
				} else {
					delUser.setStatus(Constants.FLAG_DISABLE);
					delUser.setDelFlag(Constants.FLAG_DELETED);
					delUser.setUsername("__" + delUser.getUsername());
					appUserService.save(delUser);
				}
			}
			buff.append("'");
		}
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 显示详细信息 最后修改:shendx 不让显示后面的@数据
	 * 
	 * @return
	 */
	public String get() {
		AppUser appUser = null;
		JSONSerializer json = JsonUtil
				.getJSONSerializer(new String[] { "accessionTime" });
		if (userId != null) {
			appUser = appUserService.get(userId);
		} else {
			json.exclude(new String[] { "accessionTime", "department",
					"password", "status", "position" });
			appUser = appUserService.get(ContextUtil.getCurrentUserId());
		}
		String showUserName = "";
		if (appUser.getUsername().split("@").length > 1) {
			showUserName = appUser.getUsername().split("@")[0];
		} else {
			showUserName = appUser.getUsername();
		}
		appUser.setUsername(showUserName);
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:[");
		sb.append(JsonUtil.getJSONSerializer(new String[] { "accessionTime" })
				.serialize(appUser));
		sb.append("]}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 查询已有角色
	 */
	public String selectedRoles() {
		if (userId != null) {
			setAppUser(appUserService.get(userId));
			Set<AppRole> roles = appUser.getRoles();
			StringBuffer sb = new StringBuffer("[");
			for (AppRole role : roles) {
				sb.append("['" + role.getRoleId() + "','" + role.getRoleName()
						+ "'],");
			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("]");
			setJsonString(sb.toString());
		}
		return SUCCESS;
	}

	/**
	 * 为某一用户提供可选的角色
	 * 
	 * @return
	 */
	public String getRoles() {

		List<AppRole> list = new ArrayList<AppRole>();

		Boolean flag = Boolean.valueOf(AppUtil.getSystemIsGroupVersion());
		if (flag) {
			Long orgId = null;
			String companyKey = null;
			Organization og = null;
			String companyId = this.getRequest().getParameter("companyId");
			if (null != companyId && !"".equals(companyId)) {
				og = this.organizationService.get(Long.valueOf(companyId));
			} else {
				if (null != this.getSession().getAttribute("company")&&!"null".equals(this.getSession().getAttribute("company"))&&!"".equals(this.getSession().getAttribute("company"))) {
					companyKey = (String) this.getSession().getAttribute(
							"company");
					og = this.organizationService
							.getBranchCompanyByKey(companyKey);
				} else {
					og = this.organizationService.getGroupCompany();
				}
			}
			orgId = og.getOrgId();
			list = appRoleService.getListByOrgId(orgId, null, null, 0, 0);
		} else {
			list = appRoleService.getAll();
		}
		String userId = getRequest().getParameter("userId");

		List<AppRole> allRole = new ArrayList<AppRole>();

		Set curRoles = new HashSet();
		if (StringUtils.isNotEmpty(userId)) {
			AppUser user = appUserService.get(new Long(userId));
			curRoles = user.getRoles();
		}
		for (AppRole role : list) {
			if (!curRoles.contains(role)
					&& role.getStatus() != Constants.FLAG_DISABLE) {
				allRole.add(role);
			}
		}

		Type type = new TypeToken<List<AppRole>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,result:");
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		buff.append(gson.toJson(allRole, type));
		buff.append("}");
		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 返回某一用户已有的角色
	 * 
	 * @return
	 */
	public String getSelRoles() {
		String userId = getRequest().getParameter("userId");

		if (StringUtils.isNotEmpty(userId)) {
			AppUser user = appUserService.get(new Long(userId));
			Set<AppRole> curRoles = user.getRoles();

			Type type = new TypeToken<Set<AppRole>>() {
			}.getType();
			StringBuffer buff = new StringBuffer("{success:true,result:");
			Gson gson = new GsonBuilder()
					.excludeFieldsWithoutExposeAnnotation().create();
			buff.append(gson.toJson(curRoles, type));
			buff.append("}");
			jsonString = buff.toString();

		}
		return SUCCESS;
	}

	/**
	 * 按职位查找所有用户 信息
	 * 
	 * @return
	 */
	public String posUsers() {
		String posId = getRequest().getParameter("posId");
		QueryFilter filter = new QueryFilter(getRequest());
		if (StringUtils.isNotEmpty(posId) && !"0".equals(posId)) {
			filter.addFilter("Q_positions.posId_L_EQ", posId.trim());
		}

		filter
				.addFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED
						.toString());

		List<AppUser> users = appUserService.getAll(filter);

		Type type = new TypeToken<List<AppUser>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		// Gson gson = new
		// GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		// buff.append(gson.toJson(users, type));
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "accessionTime" });
		buff.append(serializer.exclude(new String[] { "password" }).serialize(
				users));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 查询可选角色
	 * 
	 * @return
	 */
	public String chooseRoles() {
		List<AppRole> chooseRoles = appRoleService.getAll();
		if (userId != null) {
			setAppUser(appUserService.get(userId));
			Set<AppRole> selectedRoles = appUser.getRoles();
			for (AppRole role : selectedRoles) {
				chooseRoles.remove(role);
			}
		}
		StringBuffer sb = new StringBuffer("[");
		for (AppRole role : chooseRoles) {
			if (role.getStatus() != 0) {
				sb.append("['" + role.getRoleId() + "','" + role.getRoleName()
						+ "'],");
			}
		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 修改密码
	 * 
	 * @return
	 */
	@LogResource(description = "修改密码")
	public String resetPassword() throws ExceptionManager {
		String userId = getRequest().getParameter("appUserUserId");
		/*String oldPassword = StringUtil.encryptSha256(getRequest()
				.getParameter("oldPassword"));*/
		String oldPassword = DigestUtils.md5Hex((getRequest()
                .getParameter("oldPassword")));
		String newPassword = getRequest().getParameter("newPassword");
		String againPassword = getRequest().getParameter("againPassword");
		if (StringUtils.isNotEmpty(userId)) {
			setAppUser(appUserService.get(new Long(userId)));
		} else {
			setAppUser(ContextUtil.getCurrentUser());
		}
		StringBuffer msg = new StringBuffer("{msg:'");
		boolean pass = false;
		if (oldPassword.equals(appUser.getPassword())) {
			if (newPassword.equals(againPassword)) {
				pass = true;
			} else
				msg.append("两次输入不一致.'");
		} else
			msg.append("旧密码输入不正确.'");
		if (pass) {
		    String newPassword1 = DigestUtils.md5Hex(newPassword);
			appUser.setPassword((newPassword1));
			appUserService.save(appUser);
			setJsonString("{success:true}");
		} else {
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}
		return SUCCESS;
	}

	/**
	 * 重置密码
	 * 
	 * @return
	 */
	@LogResource(description = "重置密码")
	public String createPassword() {
		String userId = getRequest().getParameter("appUserUserId");
		String newPassword = getRequest().getParameter("newpassword");
		String password = getRequest().getParameter("password");
		if(newPassword!=null){
			
		}
		StringBuffer msg = new StringBuffer("{msg:'");
		if (StringUtils.isNotEmpty(userId)) {
			setAppUser(appUserService.get(new Long(userId)));
		} else {
			setAppUser(ContextUtil.getCurrentUser());
		}
			
		if (newPassword.equals(password)) {
		    String password1 = DigestUtils.md5Hex(password);
			appUser.setPassword((password1));
			appUserService.save(appUser);
			setJsonString("{success:true}");
		} else {
			msg.append("重置失败!,两次输入的密码不一致,请重新输入!.'");
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}

		return SUCCESS;
	}

	/**
	 * 删除用户照片
	 * 
	 * @return
	 */
	public String photo() {
		setAppUser(appUserService.get(getUserId()));
		appUser.setPhoto("");
		appUserService.save(appUser);
		return SUCCESS;
	}

	/**
	 * 按部门查找合适做下属的用户
	 * 
	 * @return
	 */
	public String subAdepartment() {
		PagingBean pb = getInitPagingBean();
		String strDepId = getRequest().getParameter("depId");
		String path = "0.";
		AppUser user = ContextUtil.getCurrentUser();
		if (StringUtils.isNotEmpty(strDepId)) {
			Long depId = Long.parseLong(strDepId);
			Department dep = departmentService.get(depId);
			if (dep != null) {
				path = dep.getPath();
			}
		} else {
			Department dep = user.getDepartment();
			if (dep != null) {
				path = dep.getPath();
			}
		}
		if ("0.".equals(path)) {
			path = null;
		}
		Long uId = user.getUserId();

		// Set<Long> userIds = userSubService.findAllUpUser(uId);
		// List<Long> userIdsL = userSubService.subUsers(uId);

		// userIds.add(uId);
		// for (Long l : userIdsL) {
		// userIds.add(l);
		// }

		List<AppUser> list = appUserService.findSubAppUser(path, new HashSet(),
				pb);
		Type type = new TypeToken<List<AppUser>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(pb.getTotalItems()).append(",result:");
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 根据角色来选择合适做下属的用户
	 * 
	 * @return
	 */
	public String subArole() {
		String strRoleId = getRequest().getParameter("roleId");
		PagingBean pb = getInitPagingBean();
		AppUser user = ContextUtil.getCurrentUser();
		if (StringUtils.isNotEmpty(strRoleId)) {
			Long uId = user.getUserId();
			// Set<Long> userIds = userSubService.findAllUpUser(uId);
			// List<Long> userIdsL = userSubService.subUsers(uId);
			// userIds.add(uId);
			// for (Long l : userIdsL) {
			// userIds.add(l);
			// }
			// List<AppUser> userList = appUserService.findSubAppUserByRole(
			// new Long(strRoleId), userIds, pb);
			// List<AppUser>
			// userList=appUserService.findByRole(Long.parseLong(strRoleId),
			// pb);
			Type type = new TypeToken<List<AppUser>>() {
			}.getType();
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(pb.getTotalItems()).append(",result:");
			Gson gson = new GsonBuilder()
					.excludeFieldsWithoutExposeAnnotation().create();
			buff.append(gson.toJson(new ArrayList(), type));
			buff.append("}");
			jsonString = buff.toString();
		} else {
			jsonString = "{success:false}";
		}
		return SUCCESS;
	}

	/**
	 * 按在线查找合适当下属的用户
	 */

	public String onlineAsub() {
		Map<String, OnlineUser> onlineUsers = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersBySub = new HashMap<String, OnlineUser>();
		onlineUsers = AppUtil.getOnlineUsers();// 获得所有在线用户
		// 按在线用户
		AppUser user = ContextUtil.getCurrentUser();
		Long uId = user.getUserId();
		Set<Long> userIds = new HashSet();// userSubService.findAllUpUser(uId);
		userIds.add(uId);
		List<Long> userIdsL = new ArrayList();// userSubService.subUsers(uId);
		for (Long l : userIdsL) {
			userIds.add(l);
		}
		for (String sessionId : onlineUsers.keySet()) {
			OnlineUser onlineUser = new OnlineUser();
			onlineUser = onlineUsers.get(sessionId);
			if (!userIds.contains(onlineUser.getUserId())) {
				onlineUsersBySub.put(sessionId, onlineUser);
			}
		}
		Type type = new TypeToken<java.util.Collection<OnlineUser>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(onlineUsers.size()).append(",result:");
		Gson gson = new Gson();
		buff.append(gson.toJson(onlineUsersBySub.values(), type));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 上属
	 * 
	 * @return
	 */
	public String upUser() {
		Set<AppUser> set = relativeUserService.getUpUser(ContextUtil
				.getCurrentUserId());

		StringBuffer buff = new StringBuffer("[");
		for (Iterator it = set.iterator(); it.hasNext();) {
			AppUser user = (AppUser) it.next();
			buff.append("['" + user.getUserId().toString() + "','"
					+ user.getFullname() + "'],");
		}
		if (set.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 当前用户修改个人资料
	 * 
	 * @return
	 */
	@LogResource(description = "修改个人资料")
	public String profile() {

		AppUser curAppUser = ContextUtil.getCurrentUser();

		AppUser orgAppUser = appUserService.get(curAppUser.getUserId());

		orgAppUser.setFullname(appUser.getFullname());
		orgAppUser.setEmail(appUser.getEmail());
		orgAppUser.setTitle(appUser.getTitle());
		orgAppUser.setPhone(appUser.getPhone());
		orgAppUser.setMobile(appUser.getMobile());
		orgAppUser.setFax(appUser.getFax());
		orgAppUser.setAddress(appUser.getAddress());
		orgAppUser.setZip(appUser.getZip());
		orgAppUser.setPhoto(appUser.getPhoto());

		appUserService.save(orgAppUser);
		// 使其不需要重新登录都能正常显示已经修改过的用户名
		curAppUser.setFullname(orgAppUser.getFullname());

		jsonString = "{success:true}";
		return SUCCESS;
	}

	/**
	 * 
	 * @return
	 */
	public String bindDyPwd() {
		StringBuffer msg = new StringBuffer("{success:true,msg:'");
		String curDynamicPwd = getRequest().getParameter("curDynamicPwd");
		HashMap<String, String> input = new HashMap<String, String>();
		input.put("app", "demoauthapp");
		input.put("user", appUser.getDynamicPwd());
		input.put("pw", curDynamicPwd);

		String result = appUserService.initDynamicPwd(input, "bind");

		if (result.equals("ok")) {
			AppUser orgUser = appUserService.get(appUser.getUserId());
			orgUser.setDynamicPwd(appUser.getDynamicPwd());
			orgUser.setDyPwdStatus(AppUser.DYNPWD_STATUS_BIND);
			appUserService.save(orgUser);
			msg.append("成功绑定!");
		} else {
			msg.append(result);
		}
		msg.append("'}");
		setJsonString(msg.toString());
		return SUCCESS;
	}

	/**
	 * 
	 */
	public String unbindDyPwd() {
		StringBuffer msg = new StringBuffer("{success:true,msg:'");
		String curDynamicPwd = getRequest().getParameter("curDynamicPwd");
		HashMap<String, String> input = new HashMap<String, String>();
		input.put("app", "demoauthapp");
		input.put("user", appUser.getDynamicPwd());
		input.put("pw", curDynamicPwd);

		String result = appUserService.initDynamicPwd(input, "unbind");

		if (result.equals("ok")) {
			AppUser orgUser = appUserService.get(appUser.getUserId());
			orgUser.setDyPwdStatus(AppUser.DYNPWD_STATUS_UNBIND);
			appUserService.save(orgUser);
			msg.append("解绑成功!");
		} else {
			msg.append(result);
		}
		msg.append("'}");
		setJsonString(msg.toString());
		return SUCCESS;
	}

	/**
	 * 针对对话框的用户选择及条件过滤
	 * 
	 * @return
	 */
	public String dialog() {
		Boolean flag = Boolean.valueOf(AppUtil.getSystemIsGroupVersion());
		String userName = this.getRequest().getParameter("Q_fullname_S_LK");
		if (flag) {
			String tp = this.getRequest().getParameter("type");
			String searchMethod = this.getRequest()
					.getParameter("searchMethod");
			String companyId_ = this.getRequest().getParameter("companyId");
			if (null != companyId_ && !"".equals(companyId_)) {
				List<AppUser> userList = null;
				long count = 0;
				String orgId = this.getRequest().getParameter("Q_orgId_L_EQ");
				String orgType = this.getRequest().getParameter("orgType");
				if (null != orgId && !"".equals(orgId)) {
					userList = appUserService.getUserList(Long.valueOf(orgId),
							orgType, userName, start, limit);
					count = appUserService.getUserCount(Long.valueOf(orgId),
							orgType, userName);
				} else {
					Organization og = this.organizationService.get(Long
							.valueOf(companyId_));
					userList = appUserService.getUserList(og.getOrgId(), String
							.valueOf(og.getOrgType()), userName, start, limit);
					count = appUserService.getUserCount(og.getOrgId(), String
							.valueOf(og.getOrgType()), userName);
				}
				StringBuffer buff = new StringBuffer(
						"{success:true,'totalCounts':").append(count).append(
						",result:");
				Gson gson = new GsonBuilder()
						.excludeFieldsWithoutExposeAnnotation().create();
				Type type = new TypeToken<List<AppUser>>() {
				}.getType();
				buff.append(gson.toJson(userList, type));
				buff.append("}");
				jsonString = buff.toString();
			} else {

				if (null == searchMethod || "company".equals(searchMethod)) {
					String orgId = this.getRequest().getParameter(
							"Q_orgId_L_EQ");
					String orgType = this.getRequest().getParameter("orgType");
					if ((null != type && type.equals("branch"))
							|| type.equals("undefined")) {
						String roleType = ContextUtil.getRoleTypeSession();
						List<AppUser> userList = null;
						long count = 0;
						if (null == orgId || "".equals(orgId)) {
							if (null != roleType && "business".equals(roleType)) {
								Long companyId = ContextUtil
										.getLoginCompanyId();
								if (null != companyId) {
									Organization organization = organizationService
											.get(companyId);
									if (null != organization) {
										orgId = String.valueOf(companyId);
										orgType = String.valueOf(organization
												.getOrgType());
									}
								}
								userList = appUserService.getUserList(Long
										.valueOf(orgId), orgType, userName,
										start, limit);
								count = appUserService.getUserCount(Long
										.valueOf(orgId), orgType, userName);
							} else if (null != roleType
									&& "control".equals(roleType)) {
								userList = appUserService.getUserList(null,
										orgType, userName, start, limit);
								count = appUserService.getUserCount(null,
										orgType, userName);
							}
						} else {
							userList = appUserService.getUserList(Long
									.valueOf(orgId), orgType, userName, start,
									limit);
							count = appUserService.getUserCount(Long
									.valueOf(orgId), orgType, userName);
						}
						StringBuffer buff = new StringBuffer(
								"{success:true,'totalCounts':").append(count)
								.append(",result:");
						Gson gson = new GsonBuilder()
								.excludeFieldsWithoutExposeAnnotation()
								.create();
						Type type = new TypeToken<List<AppUser>>() {
						}.getType();
						buff.append(gson.toJson(userList, type));
						buff.append("}");
						jsonString = buff.toString();

					} else if (null != type && type.equals("all")) {
						List<AppUser> userList = null;
						long count = 0;
						if (null == orgId || "".equals(orgId)) {
							orgId = "1";
							orgType = "0";
							// userList=appUserService.getAllUserList(null,
							// orgType, start, limit);
							// count=appUserService.getAllUserCount(null,
							// orgType);
						}
						userList = appUserService.getAllUserList(Long
								.valueOf(orgId), orgType, userName, start,
								limit);
						count = appUserService.getAllUserCount(Long
								.valueOf(orgId), orgType, userName);

						StringBuffer buff = new StringBuffer(
								"{success:true,'totalCounts':").append(count)
								.append(",result:");
						Gson gson = new GsonBuilder()
								.excludeFieldsWithoutExposeAnnotation()
								.create();
						Type type = new TypeToken<List<AppUser>>() {
						}.getType();
						buff.append(gson.toJson(userList, type));
						buff.append("}");
						jsonString = buff.toString();
					} else if (null != type && type.equals("flow")) {
						List<AppUser> userList = null;
						long count = 0;
						if (null == orgId || "".equals(orgId)) {
							orgId = "1";
							orgType = "0";
						}
						userList = appUserService.getAllUserList(Long
								.valueOf(orgId), orgType, userName, start,
								limit);
						count = appUserService.getAllUserCount(Long
								.valueOf(orgId), orgType, userName);

						StringBuffer buff = new StringBuffer(
								"{success:true,'totalCounts':").append(count)
								.append(",result:");
						Gson gson = new GsonBuilder()
								.excludeFieldsWithoutExposeAnnotation()
								.create();
						Type type = new TypeToken<List<AppUser>>() {
						}.getType();
						buff.append(gson.toJson(userList, type));
						buff.append("}");
						jsonString = buff.toString();
					}
				} else if (null != searchMethod && "role".equals(searchMethod)) {
					String roleId = this.getRequest().getParameter(
							"Q_roles.roleId_L_EQ");
					String leaf = this.getRequest().getParameter("leaf");
					if (null != leaf && leaf.equals("true")) {
						if (null != roleId && !"".equals(roleId)) {
							AppRole role = appRoleService.get(Long
									.valueOf(roleId));
							Set<AppUser> users = role.getAppUsers();
							StringBuffer buff = new StringBuffer(
									"{success:true,result:");
							Gson gson = new GsonBuilder()
									.excludeFieldsWithoutExposeAnnotation()
									.create();
							Type type = new TypeToken<Set<AppUser>>() {
							}.getType();
							buff.append(gson.toJson(users, type));
							buff.append("}");
							jsonString = buff.toString();
						}
					}
				}
			}
		} else {
			List<AppUser> userList = null;
			long count = 0;
			String orgId = this.getRequest().getParameter("Q_orgId_L_EQ");
			String orgType = this.getRequest().getParameter("orgType");
			if (null == orgId || "".equals(orgId)) {
				orgId = "1";
				orgType = "0";
				// userList=appUserService.getAllUserList(null, orgType, start,
				// limit);
				// count=appUserService.getAllUserCount(null, orgType);
			}
			userList = appUserService.getAllUserList(Long.valueOf(orgId),
					orgType, userName, start, limit);
			if(userList.size()>0){
				for(int i=0;i<userList.size();i++){
					System.out.println("用户名==="+userList.get(i).getFullname()+"这是第"+i+"次");
					RelativeUser  re=relativeUserService.findSuperiorId(userList.get(i).getUserId());
					if(re!=null){
						if(re.getJobUser()!=null){
							userList.get(i).setJobUser(re.getJobUser().getFullname());
							userList.get(i).setJobUserId(re.getJobUser().getUserId());
						}
					}
					if(userList.get(i).getDepId()!=null){
						Organization organization=organizationService.get(userList.get(i).getDepId());
						if(organization!=null){
							userList.get(i).setShopName(organization.getOrgName());
						}
					}else if(userList.get(i).getDepartment()!=null){
						if(userList.get(i).getDepartment().getDepName()!=null&&!"".equals(userList.get(i).getDepartment().getDepName())){
							userList.get(i).setShopName(userList.get(i).getDepartment().getDepName());
							userList.get(i).setShopId(userList.get(i).getDepartment().getDepId());
						}
					}
					
				}
			}
			count = appUserService.getAllUserCount(Long.valueOf(orgId),
					orgType, userName);

			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(count).append(",result:");
			Gson gson = new GsonBuilder()
					.excludeFieldsWithoutExposeAnnotation().create();
			Type type = new TypeToken<List<AppUser>>() {
			}.getType();
			buff.append(gson.toJson(userList, type));
			buff.append("}");
			jsonString = buff.toString();
			/*
			 * QueryFilter filter=new QueryFilter(getRequest()); //是否为显示当前部门的员工
			 * String curDep=getRequest().getParameter("cuDep");
			 * if(StringUtils.isNotEmpty(curDep)){ AppUser
			 * curUser=ContextUtil.getCurrentUser();
			 * filter.addFilter("Q_orgId_L_EQ", curUser.getOrgId().toString());
			 * } //显示非删除的用户 filter.addFilter("Q_delFlag_SN_EQ", "0");
			 * List<AppUser> userList=appUserService.getAll(filter);
			 * StringBuffer buff = new
			 * StringBuffer("{success:true,'totalCounts':"
			 * ).append(filter.getPagingBean
			 * ().getTotalItems()).append(",result:"); Gson gson=new
			 * GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
			 * Type type = new TypeToken<List<AppUser>>() {}.getType();
			 * buff.append(gson.toJson(userList,type)); buff.append("}");
			 * jsonString = buff.toString();
			 */
		}
		return SUCCESS;
	}

	/**
	 * 保存并更新用户信息
	 */
	@LogResource(description = "更新或添加用户")
	public String saveOrUpdate() {
		String companyId = this.getRequest().getParameter("companyId");//分公司id
		String shopId = this.getRequest().getParameter("shopId");//门店id
		String userNumber = this.getRequest().getParameter("userNumber");//员工编号
		//判断是否是集团版系统
		Boolean flag = Boolean.valueOf(AppUtil.getSystemIsGroupVersion());
		String tempName="";
		Organization o=null;
		if (flag){
			o =organizationService.get(appUser.getCompanyId());
		}else{
			if(null==companyId || "".equals(companyId)){
				companyId="1";
			}
			o =organizationService.get(Long.valueOf(companyId));//单公司版公司id默认是1
		}
		appUser.setUserNumber(userNumber);
		if(null!=appUser.getUserId()){//更新用户
			try{
				AppUser oldUser = appUserService.get(appUser.getUserId());
				String companyKey = oldUser.getUsername().split("@")[1];//分公司后缀
				tempName=appUser.getUsername() + "@" +companyKey;//eg: zhangsan@jzww
				AppUser au = appUserService.findByName("username",tempName,o.getOrgId());
				if (null!=au && !tempName.equals(oldUser.getUsername())) {//判断用户名是否已存在
					jsonString = "{success:false,msg:'" + o.getOrgName() + "里该用户名已存在'}";
					return SUCCESS;
				}
				AppUser au2 = appUserService.findByName("userNumber",appUser.getUserNumber(),o.getOrgId());
				if (null!=au2 && !appUser.getUserNumber().equals(oldUser.getUserNumber())) {//判断员工编号是否已存在
					jsonString = "{success:false,msg:'" + o.getOrgName() + "里该编号已存在'}";
					return SUCCESS;
				}
				Long oldShopId=oldUser.getShopId();
				BeanUtil.populateEntity(getRequest(),oldUser,"appUser");
				oldUser.setUsername(tempName);
				if(null!=companyId && !"".equals(companyId)){
					oldUser.setCompanyId(Long.valueOf(companyId));
				}
				if(null!=oldShopId && !"".equals(oldShopId)){
					oldUser.setShopId(oldShopId);
				}
				appUser=oldUser;
			}catch(Exception e){
				e.printStackTrace();
			}
		}else{//新增用户
			tempName=appUser.getUsername() + "@" +o.getKey();//eg: zhangsan@jzww
			AppUser au = appUserService.findByName("username",tempName,o.getOrgId());
			if (null!=au) {//判断用户名是否已存在
				jsonString = "{success:false,msg:'" + o.getOrgName() + "里该用户名已存在'}";
				return SUCCESS;
			}
			AppUser au2 = appUserService.findByName("userNumber",appUser.getUserNumber(),o.getOrgId());
			if (null!=au2) {//判断员工编号是否已存在
				jsonString = "{success:false,msg:'" + o.getOrgName() + "里该编号已存在'}";
				return SUCCESS;
			}
			appUser.setUsername(appUser.getUsername() + "@"+ o.getKey());
			String password = this.getRequest().getParameter("passWord");
			appUser.setPassword(DigestUtils.md5Hex(password));
			appUser.setDelFlag(Constants.FLAG_UNDELETED);
			if(null!=companyId && !"".equals(companyId)){
				appUser.setCompanyId(Long.valueOf(companyId));
			}
			if(null!=shopId && !"".equals(shopId)){
				appUser.setShopId(Long.valueOf(shopId));
			}
		}
		appUserService.save(appUser);
		
		// 处理其对应的部门，用户等
		String roleIds = getRequest().getParameter("roleIds");
		String posIds = getRequest().getParameter("posIds");
		String orgIds = getRequest().getParameter("orgIds");

		logger.debug("roleIds:" + roleIds + " posIds:" + posIds + " orgIds:" + orgIds);
		if (StringUtils.isNotEmpty(roleIds)) {
			String[] roleIdArr = roleIds.split("[,]");
			// 处理该用户对应的角色
			if (roleIdArr != null) {
				appUser.setRoles(new HashSet<AppRole>());
				for (String roleId : roleIdArr) {
					AppRole role = appRoleService.get(new Long(roleId));
					appUser.getRoles().add(role);
				}
				appUserService.save(appUser);
			}
		}

		Gson gson = new Gson();
		if (StringUtils.isNotEmpty(posIds)) {
			UserPosition[] ups = (UserPosition[]) gson.fromJson(posIds,UserPosition[].class);
			if (ups != null) {
				// 检查该用户的Position是否存在，不存在，则添加
				for (UserPosition up : ups) {
					if (up.getUserPosId() == null) {// 若为新增加的
						up.setAppUser(appUser);
						up.setPosition(positionService.get(up.getPosId()));
						userPositionService.save(up);
					} else {//若为更新的
						UserPosition pos = userPositionService.get(up.getUserPosId());
						pos.setIsPrimary(up.getIsPrimary());
						userPositionService.save(pos);
					}
				}
			}
		}

		if (StringUtils.isNotEmpty(orgIds)) {
			// 处理orgIds
			UserOrg[] uos = (UserOrg[]) gson.fromJson(orgIds, UserOrg[].class);
			if (uos != null) {
				//首先移除原来的部门 start
				List<UserOrg> orgList=userOrgService.listByUserId(appUser.getUserId());
				if(null !=orgList && !"".equals(orgList)){
					for(UserOrg uog : orgList){
						userOrgService.remove(uog.getUserOrgId());
					}
				}
				//end
				
				for (UserOrg uo : uos) {
					uo.setAppUser(appUser);
					Organization organization = organizationService.get(uo.getOrgId());
					if (uo.getIsPrimary() == UserOrg.PRIMARY) {
						// 设置主部门
						Department dep = departmentService.get(uo.getOrgId());
						appUser.setDepartment(dep);
						// 更新其对应的所属公司ID
						String path = dep.getPath();
						if (path != null) {
							String[] ids = path.split("[.]");
							for (String id : ids) {
								if (!"0".equals(id)&& StringUtils.isNotEmpty(id)) {// 不为0
									Organization org = (Organization) organizationService.get(new Long(id));
									if (Organization.ORG_TYPE_COMPANY.equals(org.getOrgType())) {
										appUser.setOrgId(new Long(id));
										break;
									}
								}
							}
						}
						appUserService.save(appUser);
					}
					uo.setOrganization(organization);
					userOrgService.merge(uo);
				}
			}
		}
		return SUCCESS;
	}
	
	/**
	 * 查询当前用户数量
	 * @return
	 */
	public String loadCount(){
		String count=appUserService.findMaxMember();
		setJsonString("{success:true,size:'"+count+"'}");
		return SUCCESS;
	}

	/**
	 * 禁用功能
	 * @return
	 */
	public String forbidden(){
		String[] ids = getRequest().getParameterValues("ids");
		StringBuffer buff = new StringBuffer("{success:true");
		if (ids != null) {
			buff.append(",msg:'");
			for (String id : ids) {
				AppUser delUser = appUserService.get(new Long(id));
				delUser.setStatus(Constants.FLAG_DISABLE);
				appUserService.save(delUser);
			}
			buff.append("禁用成功！'");
		}
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	/**
	 * 加载表单实体
	 * 
	 * @return
	 */
	public String load() {
		AppUser appUser = appUserService.get(userId);
		if (appUser.getUsername().split("@").length > 1) {
			appUser.setUsername(appUser.getUsername().split("@")[0]);
		}
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.setDateFormat("yyyy-MM-dd").create();
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(appUser));
		sb.append("}");
		jsonString = sb.toString();
		return SUCCESS;
	}

	/**
	 * 删除选择择的角色
	 * 
	 * @return
	 */
	public String delRole() {
		String roleId = getRequest().getParameter("roleId");

		if (StringUtils.isNotEmpty(roleId)) {
			AppUser appUser = appUserService.get(userId);
			AppRole appRole = appRoleService.get(new Long(roleId));
			appUser.getRoles().remove(appRole);
			appUserService.save(appUser);
		}

		return SUCCESS;
	}

	public String getOrganizationUsers() {

		String depId = getRequest().getParameter("depId");
		String username = getRequest().getParameter("Q_username_S_LK");
		String fullname = getRequest().getParameter("Q_fullname_S_LK");
		PagingBean pb = getInitPagingBean();
		Map map = new HashMap();
		map.put("username", username == null ? "" : username);
		map.put("fullname", fullname == null ? "" : fullname);

		Organization org = null;
		if (StringUtils.isNotEmpty(depId) && !"0".equals(depId)) {
			org = organizationService.get(new Long(depId));
		}
		if (null == org) //
		{
			org = organizationService.getGroupCompany();
		}

		List<AppUser> users = new ArrayList<AppUser>();
		if (org.getOrgType() == 0) {
			List<Organization> orgs = this.organizationService
					.getDepartmentByCompany(org.getOrgId());
			for (Organization otemp : orgs) {
				List<AppUser> userst = appUserService.getDepUsers(otemp
						.getPath(), pb, map);
				for (AppUser a : userst) {
					users.add(a);
				}
			}
		} else {
			String orgPath = org == null ? "0." : org.getPath();
			users = appUserService.getDepUsers(orgPath, pb, map);
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(users.size()).append(",result:[ ");
		Gson gson = new Gson();
		if (users.size() > 0) {
			for (AppUser au : users) {
				buff.append("{");
				buff.append("\"userId\":")
						.append("\"" + au.getUserId() + "\",");
				buff.append("\"username\":").append(
						gson.toJson(au.getUsername()) + ",");
				buff.append("\"fullname\":").append(
						gson.toJson(au.getFullname()) + ",");
				buff.append("\"email\":").append(
						gson.toJson(au.getEmail()) + ",");
				buff.append("\"depNames\":").append(
						gson.toJson(au.getDepNames()) + ",");
				buff.append("\"posNames\":").append(
						gson.toJson(au.getPosNames()) + ",");
				buff.append("\"status\":").append(au.getStatus() + ",");
				buff.append("\"roleNames\":").append(
						gson.toJson(au.getRoleNames()) + ",");
				buff.append("\"accessionTime\":").append(
						gson.toJson(au.getAccessionTime().toString().substring(
								0, 10)));
				buff.append("},");
			}
		}
		jsonString = buff.toString().substring(0, buff.length() - 1) + "]}";
		return SUCCESS;

	}

	// 取得某个部门下的所有用户
	public String depUsers() {
		String depId = getRequest().getParameter("depId");
		String username = getRequest().getParameter("Q_username_S_LK");
		String fullname = getRequest().getParameter("Q_fullname_S_LK");
		PagingBean pb = getInitPagingBean();
		Organization org = null;
		if (StringUtils.isNotEmpty(depId) && !"0".equals(depId)) {
			org = organizationService.get(new Long(depId));
		}
		String orgPath = org == null ? "0." : org.getPath();
		Map<String, String> map = new HashMap<String, String>();
		map.put("username", username == null ? "" : username);
		map.put("fullname", fullname == null ? "" : fullname);
		List<AppUser> users = appUserService.getDepUsers(orgPath, pb, map);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(pb.getTotalItems()).append(",result:[ ");
		Gson gson = new Gson();
		if (users.size() > 0) {
			for (AppUser au : users) {
				buff.append("{");
				buff.append("\"userId\":")
						.append("\"" + au.getUserId() + "\",");
				buff.append("\"username\":").append(
						gson.toJson(au.getUsername()) + ",");
				buff.append("\"fullname\":").append(
						gson.toJson(au.getFullname()) + ",");
				buff.append("\"email\":").append(
						gson.toJson(au.getEmail()) + ",");
				buff.append("\"depNames\":").append(
						gson.toJson(au.getDepNames()) + ",");
				buff.append("\"posNames\":").append(
						gson.toJson(au.getPosNames()) + ",");
				buff.append("\"roleNames\":").append(
						gson.toJson(au.getRoleNames()) + ",");
				buff.append("\"accessionTime\":").append(
						gson.toJson(au.getAccessionTime().toString().substring(
								0, 10)));
				buff.append("},");
			}
		}
		jsonString = buff.toString().substring(0, buff.length() - 1) + "]}";

		return SUCCESS;
	}

	/**
	 * 取得总公司,分公司,部门下员工信息
	 * 
	 * @return
	 */
	public String depBranchUsers() {
		String depId = getRequest().getParameter("depId");
		String username = getRequest().getParameter("Q_username_S_LK");
		String fullname = getRequest().getParameter("Q_fullname_S_LK");
		PagingBean pb = getInitPagingBean();
		Map<String, String> map = new HashMap<String, String>();
		map.put("username", username == null ? "" : username);
		map.put("fullname", fullname == null ? "" : fullname);
		map.put("userId", "1"); //去掉Admin 管理员
		
		Organization org = null;
		if (StringUtils.isNotEmpty(depId) && !"0".equals(depId)) {
			org = organizationService.get(new Long(depId));
		} else {
			String companyKey = "henan";
			Object obj = this.getSession().getAttribute("company");
			if (null != obj && !obj.toString().equals("null")) {
				companyKey = (String) obj;
				org = organizationService.getBranchCompanyByKey(companyKey);
			} else {
				org = organizationService.getGroupCompany();
			}
		}
		List<AppUser> users = new ArrayList<AppUser>();
		if (org.getOrgType() == 0 || org.getOrgType() == 1) {
			List<Organization> orgs = this.organizationService
					.getOrganizationsGroup(org);
			if (orgs != null && orgs.size() > 0) {
				users = appUserService.getUsersByCompany(orgs, pb, map);
			}
		} else {
			List<Organization> orgs = new ArrayList<Organization>();
			orgs = this.organizationService.getOrganizationsGroup(org);
			orgs.add(org);
			users = appUserService.getUsersByCompany(orgs, pb, map);
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(
						users == null || users.size() == 0 ? 0 : pb
								.getTotalItems()).append(",result:[ ");
		Gson gson = new Gson();
		if (users.size() > 0) {
			for (AppUser au : users) {
				buff.append("{");
				buff.append("\"userId\":")
						.append("\"" + au.getUserId() + "\",");
				buff.append("\"status\":")
						.append("\"" + au.getStatus() + "\",");
				buff.append("\"username\":").append(
						gson.toJson(au.getUsername()) + ",");
				buff.append("\"fullname\":").append(
						gson.toJson(au.getFullname()) + ",");
				buff.append("\"email\":").append(
						gson.toJson(au.getEmail()) + ",");
				buff.append("\"depNames\":").append(
						gson.toJson(au.getDepNames()) + ",");
				buff.append("\"posNames\":").append(
						gson.toJson(au.getPosNames()) + ",");
				buff.append("\"roleNames\":").append(
						gson.toJson(au.getRoleNames()) + ",");
				if (au.getUserKey() == null || "".equals(au.getUserKey())) {
					buff.append("\"key\":").append(gson.toJson("") + ",");
				} else {
					buff.append("\"key\":").append(
							gson.toJson(au.getUserKey()) + ",");
				}
				if (au.getUserNumber() == null || "".equals(au.getUserNumber())) {
					buff.append("\"userNumber\":").append(gson.toJson("") + ",");
				} else {
					buff.append("\"userNumber\":").append(
							gson.toJson(au.getUserNumber()) + ",");
				}
				buff.append("\"accessionTime\":").append(
						gson.toJson(au.getAccessionTime().toString().substring(
								0, 10)));

				buff.append("},");
			}
		}
		jsonString = buff.toString().substring(0, buff.length() - 1) + "]}";
		return SUCCESS;
	}
	
	/**
	 * 查询有推荐码的ERP账号
	 * @return
	 */
	public String userList(){
		PageBean<AppUser> pageBean = new PageBean<AppUser>(start, limit,getRequest());
		appUserService.getUserList(pageBean);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(pageBean.getTotalCounts()).append(",result:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(pageBean.getResult()));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	/**
	 * 查询有推荐码的ERP账号
	 * @return
	 */
	public String dbuserList(){
		PageBean<AppUser> pageBean = new PageBean<AppUser>(start, limit,getRequest());
		appUserService.getDbUserList(pageBean);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(pageBean.getTotalCounts()).append(",result:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(pageBean.getResult()));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 线下业绩统计 
	 * @return
	 */
	public String userPerformanceList(){
		PageBean<AppUser> pageBean = new PageBean<AppUser>(start, limit,getRequest());
		appUserService.userPerformanceList(pageBean);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(pageBean.getTotalCounts()).append(",result:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(pageBean.getResult()));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 系统用户列表(没有生成推荐码的记录) 
	 * @return
	 */
	public String findUserList(){
		PageBean<AppUser> pageBean = new PageBean<AppUser>(start,limit,getRequest());
		appUserService.findUserList(pageBean);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(pageBean.getTotalCounts()).append(",result:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(pageBean.getResult()));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	/**
	 * 线下业绩统计 
	 * @return
	 */
	public String dbuserPerformanceList(){
		PageBean<AppUser> pageBean = new PageBean<AppUser>(start, limit,getRequest());
		appUserService.dbuserPerformanceList(pageBean);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(pageBean.getTotalCounts()).append(",result:");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		buff.append(gson.toJson(pageBean.getResult()));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	/**
	 * 保存用户选择的桌面功能
	 * @return
	 */
	public String grantDesk(){
		String desk = getRequest().getParameter("desk").replace(" ","");
		String userId = getRequest().getParameter("userId");
		String roleId = getRequest().getParameter("roleId");
		if(null!=userId && !"".equals(userId)){
			appUser=appUserService.get(Long.valueOf(userId));
			appUser.setDesks(desk);
			appUserService.merge(appUser);
			this.getRequest().getSession().setAttribute("userDesk",appUser.getDesks());
		}else if(null!=roleId && !"".equals(roleId)){
			AppRole appRole=appRoleService.get(Long.valueOf(roleId));
			appRole.setDesks(desk);
			appRoleService.merge(appRole);
		}
		return SUCCESS;
	}
}
