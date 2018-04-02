package com.thirdPayInterface.baiRongJinFu;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

public class BaiRongUtil {
	/**
	 * 获取百融的环境参数
	 * @return
	 */
	public static Map BaiRongProperty(){
		Map baiRongConfigMap=new HashMap();
		try{
			InputStream in=null;
			//获取当前百融征信配置文件信息
			
		    in = BaiRongUtil.class.getResourceAsStream("baiRongCredit.properties"); 
			
			Properties props =  new  Properties(); 
			if(in!=null){
				props.load(in);
		    	Iterator it= props.keySet().iterator();
		    	while(it.hasNext()){
		    		String key=(String)it.next();
		    		baiRongConfigMap.put(key, props.getProperty(key));
		    	}
			}
		}catch(Exception ex){
			ex.printStackTrace();
    	}
		return baiRongConfigMap;
	}

}
