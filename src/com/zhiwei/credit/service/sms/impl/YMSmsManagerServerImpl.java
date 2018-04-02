package com.zhiwei.credit.service.sms.impl;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;

import org.apache.commons.httpclient.MultiThreadedHttpConnectionManager;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpConnectionManagerParams;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.log4j.Logger;

import com.zhiwei.core.util.AppUtil;
import com.zhiwei.credit.service.sms.MessageStrategyService;
import com.zhiwei.credit.service.sms.util.AppSmsUtil;


/**
 * 亿美短信接口
 * @author XiRuiJie
 */
public class YMSmsManagerServerImpl implements MessageStrategyService {
	
	//得到config.properties读取的所有资源
	private static Map configMap = AppUtil.getConfigMap();
	  private static Logger logger = Logger.getLogger(YMSmsManagerServerImpl.class);
	
	  private static HttpClient client = null;
	
	String  url = configMap.get("smsUrl") .toString();
	String  cdkey = configMap.get("smsAccountID") .toString();
	String  psd = configMap.get("smsPassword") .toString();
//	"http://hprpt2.eucp.b2m.cn:8080/sdkproxy/sendsms.action?";
//	String  cdkey ="0SDK-EBB-6699-RDRNT";
//	String psd ="360388";

	@Override
	public String sendMsg(String phone, String content) {
		String  retStr ="";
		String param = "";
		    try {
		    	content = URLEncoder.encode(content, "UTF-8");
				   String code = "888";
				    long seqId = System.currentTimeMillis();
				    param = "cdkey=" + cdkey + "&password=" + psd + "&phone="+phone+"&message=" + content + "&addserial=" + code + "&seqid=" + seqId;
				    System.out.println("////////////////////////////亿美软通发送参数/////////////////////////");
				    System.out.println("//账号："+cdkey+"//密码："+psd+"//接收的手机号："+phone+"//发送的信息:"+content);
				    retStr = send(url, param);
				    System.out.println("发送结果:" + retStr);
			} catch (Exception e) {
				e.printStackTrace();
			}
		return "";
	}
	
	 /**
	  * @param url
	  * @param param
	  * @return
	  */
     public String send(String url, String param) {
		MultiThreadedHttpConnectionManager httpConnectionManager = new MultiThreadedHttpConnectionManager();
		HttpConnectionManagerParams params = new HttpConnectionManagerParams();
		// 默认连接超时时间
		params.setConnectionTimeout(5000);
		// 默认读取超时时间
		params.setSoTimeout(10000);
		// 默认单个host最大连接数
		params.setDefaultMaxConnectionsPerHost(100);// very important!!
		// 最大总连接数
		params.setMaxTotalConnections(256);// very important!!
		httpConnectionManager.setParams(params);
		client = new HttpClient(httpConnectionManager);
		client.getParams().setConnectionManagerTimeout(3000);
		String response = "";
		HttpMethod httpmethod = new GetMethod(url+param);
		try {
		    int statusCode = client.executeMethod(httpmethod);
		    InputStream _InputStream = null;
		    if (statusCode == HttpStatus.SC_OK) {
			_InputStream = httpmethod.getResponseBodyAsStream();
		    }
		    if (_InputStream != null) {
			response = GetResponseString(_InputStream, "UTF-8");
		    }
		} catch (Exception e) {
		    logger.error("获取响应错误，原因：" + e.getMessage());
		    e.printStackTrace();
		}   finally {
		    httpmethod.releaseConnection();
		}
		return null;
	}
	
	/**
     * 
     * @param _InputStream
     * @param Charset
     * @return
     */
    public String GetResponseString(InputStream _InputStream, String Charset) {
	String response = "";
	try {
	    if (_InputStream != null) {
		StringBuffer buffer = new StringBuffer();
		InputStreamReader isr = new InputStreamReader(_InputStream, Charset);
		Reader in = new BufferedReader(isr);
		int ch;
		while ((ch = in.read()) > -1) {
		    buffer.append((char) ch);
		}
		response = buffer.toString();
		buffer = null;
	    }
	} catch (Exception e) {
	    logger.error("获取响应错误，原因：" + e.getMessage());
	    response = response + e.getMessage();
	    e.printStackTrace();
	}
	return response;
    }

}
