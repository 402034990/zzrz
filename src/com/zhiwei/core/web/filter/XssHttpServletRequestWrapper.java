package com.zhiwei.core.web.filter;


import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;

import com.google.gson.JsonParser;





public class XssHttpServletRequestWrapper  extends HttpServletRequestWrapper{
	private static Properties urlFilterProperties =null;
	private static Map urlMap = null;
	static HttpServletRequest orgRequest = null;
	public XssHttpServletRequestWrapper(HttpServletRequest request) {
		super(request);
		 orgRequest = request;
	}
	   /**
	    * 转义	
	    * @param name
	    * @return
	    */
	   private String format(String name) {
		 //过滤json字符串
      	 boolean checkJson = isGoodJson(name);
      	 if(!checkJson){
      		 return StringEscapeUtils.escapeHtml4(name);//过滤html代码
      	 }else{
      		 return name;
      	 }
	   }
	public Object getAttribute(String name) {
        Object value = super.getAttribute(name);
        if (value instanceof String) {
            value = format(String.valueOf(value));
        }
        return value;
    }
	/**
	 * 覆盖getParameter方法，将参数名和参数值都做xss过滤。
	 * 如果需要获得原始的值，则通过super.getParameterValues(name)来获取
	 * getParameterNames,getParameterValues和getParameterMap也可能需要覆盖
	 */
	 @Override
	 public String getParameter(String name) {
	        String value = super.getParameter(name);
	        if (value == null)
	            return null;
	        return format(value);
	    }
	   public String[] getParameterValues(String name) {
	        String[] values = super.getParameterValues(name);
	        if (values != null) {
	            for (int i = 0; i < values.length; i++) {
	                values[i] = format(values[i]);
	            }
	        }
	        return values;
	    }
	   /**
	    * 得到请求的参数
	    */
   public Map getParameterMap() {
	   HashMap paramMap = (HashMap) super.getParameterMap();
        paramMap = (HashMap) paramMap.clone();
        //过滤路径
		boolean reqUrl = checkUrl();
	    if(reqUrl){
	    	 for (Iterator iterator = paramMap.entrySet().iterator(); iterator.hasNext(); ) {
	             Map.Entry entry = (Map.Entry) iterator.next();
	             String [] values = (String[]) entry.getValue();
	             for (int i = 0; i < values.length; i++) {
	                 if(values[i] instanceof String){
	                	values[i] = format(values[i]);
	                 }
	             }
	             entry.setValue(values);
	         }
	    }
        return paramMap;
    }
	 /**
	 * 过滤路径
	 */
	 private static boolean checkUrl() { 
		 boolean requrl = true;
		 try{
		 	//转为HttpServletRequest
			HttpServletRequest req = orgRequest;
			//项目名称
			String contextPath = req.getContextPath();
			//带项目名称的相对路径
			String requestURI = req.getRequestURI();
			//得到不过滤的路径
			String src = XssHttpServletRequestWrapper.class.getClassLoader().getResource("urlfilter.properties").getPath();
			Properties props=new Properties();
    		FileInputStream fis=new FileInputStream(src);
    		Reader r = new InputStreamReader(fis, "UTF-8"); 
    		props.load(r);
    		Iterator it= props.keySet().iterator();
    		while(it.hasNext()){
    			String keystr=(String)it.next();
    			int num = requestURI.indexOf(keystr);
    			if(num>0){
    				requrl = false;
    				break;
    			}
    		}
		 }catch (Exception e) {
			e.printStackTrace();
		}
		return requrl;
	 }
	 /**
		 * 判断是不是json串
		 * 是返回true
		 * 不是返回false
		 */
		public static boolean isGoodJson(String json) {  
	        if (json==null||"".equals(json)) {  
	            return false;  
	        }  
	        try {  
	            new JsonParser().parse(json);  
	            return true;  
	        } catch (Exception e) {  
	            return false;  
	        }  
		}
	 /**
	 * 获取最原始的request
	 * 
	 * @return
	 */
	 public HttpServletRequest getOrgRequest() {
	 return orgRequest;
	 }

	 /**
	 * 获取最原始的request的静态方法
	 * 
	 * @return
	 */
	 public static HttpServletRequest getOrgRequest(HttpServletRequest req) {
	 if (req instanceof XssHttpServletRequestWrapper) {
	 return ((XssHttpServletRequestWrapper) req).getOrgRequest();
	 }

	 return req;
	 }
}
