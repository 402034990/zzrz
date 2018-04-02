package com.zhiwei.credit.service.sms.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

import javax.servlet.ServletContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.dom4j.Document;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;

import com.zhiwei.core.util.AppUtil;



/**
 * 发送短信专用Util，主要用于读取配置文件中的配置参数信息
 * @author dell
 *
 */
public class AppSmsUtil {
	
//	private static Log logger=LogFactory.getLog(AppSmsUtil.class);
//	
//	/**
//	 * 应用程序全局对象
//	 */
//	@SuppressWarnings("unused")
//	private static ServletContext servletContext=null;
//	
//	private static ApplicationContext appContext;
//	
//	@SuppressWarnings("static-access")
//	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
//		this.appContext=applicationContext;
//	}
//	
//	/**
//	 * 取得Bean
//	 * @param beanId
//	 * @return
//	 */
//	public static Object getBean(String beanId){
//		return appContext.getBean(beanId);
//	}
//	
//	
//	/**
//	 * 存放应用程序的配置,如邮件服务器等
//	 */
//	@SuppressWarnings("unchecked")
//	public static Map configMap=new HashMap();
//	
////	private static Properties properties =null;
////	
////	static{
////		properties = new Properties();
////		 try{
////			 properties.load(new FileReader(PropertiesUtil.class.getClassLoader().getResource("conf/sendmessage_config.properties").getPath()));
////			 configMap.putAll(properties);
////			 
////		 }catch (Exception e) {
////			 e.printStackTrace();
////		 }
////	}
//
//	
//	/**
//	 * 应用程序启动时调用
//	 * @param servletContext
//	 */
//	 @SuppressWarnings("unchecked")
//	public static void init(){
//		 
//		 System.out.println("-----------------------------------------");
//		 System.out.println("--------进入 init");
//		 
//		 	String appAbsolutePath = AppUtil.getAppAbsolutePath();
//	    	//读取来自公共的config.properties文件的配置,并且放入configMap内,应用程序共同使用
//	    	String configFilePath=appAbsolutePath+"WEB-INF/classes/conf/sendmessage_config.properties";
//	    	
//		/* ServletContext context=ServletActionContext.getServletContext();
//	    //读取来自公共的config.properties文件的配置,并且放入configMap内,应用程序共同使用
//	    String configFilePath=context.getRealPath("/")+"WEB-INF/classes/conf/sendmessage_config.properties";*/
//	    	 
//	    	
//	    	Properties props=new Properties();
//	    	try{
//	    		FileInputStream fis=new FileInputStream(configFilePath);
//	    		Reader r = new InputStreamReader(fis, "UTF-8"); 
//	    		props.load(r);
//	    		Iterator it= props.keySet().iterator();
//	    		while(it.hasNext()){
//	    			String key=(String)it.next();
//	    			configMap.put(key, props.get(key));
//	    		}
//	    	}catch(Exception ex){
//	    		logger.error(ex.getMessage());
//	    	}
//	  }
//	
//
//		@SuppressWarnings("unchecked")
//		public static Map getConfigMap() {
//			return configMap;
//		}
//
//
//		public static void setConfigMap(Map configMap) {
//			AppSmsUtil.configMap = configMap;
//		}
//
//		
//		/***************************获取配置文件中的信息******************************/
//		public static Document getSystemConfigXML(){
//			try{
//			   Document document = null;
//			   File configFile = null;
//			   String configFilePath = Thread.currentThread().getContextClassLoader().getResource("").toURI().getPath()+"zhiwei.xml";
//			   configFile = new File(configFilePath);
//			   SAXReader saxReader = new SAXReader();
//			   document = saxReader.read(configFile);
//			   return document;}
//			catch (Exception e) {
//				e.printStackTrace();
//				return null;
//			}
//		}
//		 /*
//		  * 项目 路径
//		  */
//		 public static String getProjStr(){
//			 try{
//					Document document=getSystemConfigXML();
//				    Node projStrNode = document.selectSingleNode("/zhiwei/systemConfig/projStr");
//				    return projStrNode.getText();
//				 }catch (Exception e) {
//					 e.printStackTrace();
//					 return "zhiweiConfig";
//				 }
//		 }
	
	

	
	private static Log logger=LogFactory.getLog(AppSmsUtil.class);
	
	/**
	 * 应用程序启动时调用
	 * @param servletContext
	 */
	@SuppressWarnings("unchecked")
	public static void init(){
	 	String appAbsolutePath = AppUtil.getAppAbsolutePath();
    	//读取来自公共的config.properties文件的配置,并且放入configMap内,应用程序共同使用
//    	String configFilePath=appAbsolutePath+"WEB-INF/classes/conf/sendmessage_config.properties";
//    	String filePath=servletContext.getRealPath("/WEB-INF/classes/conf/");
     	String filePath=AppUtil.getContext().getRealPath("/WEB-INF/classes/conf/");
    	Properties props=new Properties();
    	try{
    		FileInputStream fis=new FileInputStream(filePath+"sendmessage_config.properties");
    		Reader r = new InputStreamReader(fis, "UTF-8"); 
    		props.load(r);
    		Iterator it= props.keySet().iterator();
    		while(it.hasNext()){
    			String key=(String)it.next();
    			AppUtil.getConfigMap().put(key, props.get(key));
    		}
    	}catch(Exception ex){
    		logger.error(ex.getMessage());
    	}
	 }
		
	/***************************获取配置文件中的信息******************************/
	public static Document getSystemConfigXML(){
		try{
		   Document document = null;
		   File configFile = null;
		   String configFilePath = Thread.currentThread().getContextClassLoader().getResource("").toURI().getPath()+"zhiwei.xml";
		   configFile = new File(configFilePath);
		   SAXReader saxReader = new SAXReader();
		   document = saxReader.read(configFile);
		   return document;}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	 /*
	  * 项目 路径
	  */
	 public static String getProjStr(){
		 try{
			Document document=getSystemConfigXML();
		    Node projStrNode = document.selectSingleNode("/zhiwei/systemConfig/projStr");
		    return projStrNode.getText();
		 }catch (Exception e) {
			 e.printStackTrace();
			 return "zhiweiConfig";
		 }
	 }

}
