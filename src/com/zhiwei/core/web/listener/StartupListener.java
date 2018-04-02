package com.zhiwei.core.web.listener;
/*
 *  北京互融时代软件有限公司 OA办公管理系统   -- http://www.hurongtime.com
 *  Copyright (C) 2008-2011 zhiwei Software Company
*/

import javax.servlet.ServletContextEvent;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.springframework.web.context.ContextLoaderListener;

import com.zhiwei.core.util.AppUtil;
import com.zhiwei.credit.service.creditFlow.bonusSystem.gradeSet.MemberGradeSetService;
import com.zhiwei.credit.service.creditFlow.bonusSystem.setting.WebBonusSettingService;

public class StartupListener extends ContextLoaderListener {
	
	private static Log logger=LogFactory.getLog(StartupListener.class);
	
	public void contextInitialized(ServletContextEvent event) {

		super.contextInitialized(event);
		//初始化应用程序工具类
		AppUtil.init(event.getServletContext());
		
		//是否同步菜单
		boolean isAynMenu=AppUtil.getIsSynMenu();
		
		if(isAynMenu){
			AppUtil.synMenu();
		}
		
		
	//	System.out.println("***********初始化5条会员等级信息*************");
		MemberGradeSetService memberGradeSetService =(MemberGradeSetService) AppUtil.getBean("memberGradeSetService");
		memberGradeSetService.initData();
	//	System.out.println("***********初始化积分规则信息*************");
		WebBonusSettingService webBonusSettingService =(WebBonusSettingService) AppUtil.getBean("webBonusSettingService");
		webBonusSettingService.initDate();
		
		
		
	}
}
