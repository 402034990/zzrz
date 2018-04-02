package com.zhiwei.credit.util;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HeaderElement;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import com.zhiwei.credit.core.creditUtils.StringUtils;

public class HttpClientUtil {
	
	 private static HttpClient hc = new DefaultHttpClient();
	 /**
     * Get请求
     * @param url
     * @param params
     * @return
     */
    public static String get(String url, List<NameValuePair> params) {
        String body = null;
        try {
            // Get请求
            HttpGet httpget = new HttpGet(url);
            //httpget.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");
            //httpget.getParams().setContentCharset("GBK");
            httpget.addHeader( "User-Agent", "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31");   
            String charset = "gbk";
            // 设置参数
            if(params!=null){
            	String str = EntityUtils.toString(new UrlEncodedFormEntity(params));
            	httpget.setURI(new URI(httpget.getURI().toString() + "?" + str));
            }else{
            	httpget.setURI(new URI(httpget.getURI().toString()));
            }
            
           synchronized (hc) {
        	   // 获取返回数据
        	   HttpResponse response = hc.execute(httpget);   
        	   HttpEntity entity = response.getEntity();   
        	   if (entity != null) {   
        		   charset = getContentCharSet(entity);  
        		   // 使用EntityUtils的toString方法，传递编码，默认编码是ISO-8859-1   
        		   body = EntityUtils.toString(entity, charset);   
        	   }
          }   

           /* HttpEntity entity = httpresponse.getEntity();
            body = EntityUtils.toString(entity);
            
            if (entity != null) {
                entity.consumeContent();
            }*/
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return body;
    }
 
    /**
     * // Post请求
     * @param url
     * @param params
     * @return
     */
    public static String post(String url, List<NameValuePair> params) {
        String body = null;
        try {
            // Post请求
            HttpPost httppost = new HttpPost(url);
            // 设置参数
            httppost.setEntity(new UrlEncodedFormEntity(params));
            // 发送请求
            HttpResponse httpresponse = hc.execute(httppost);
            // 获取返回数据
            HttpEntity entity = httpresponse.getEntity();
            body = EntityUtils.toString(entity);
            if (entity != null) {
                entity.consumeContent();
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return body;
    }
    
    public static String getContentCharSet(final HttpEntity entity)  throws ParseException {   

    if (entity == null) {   
        throw new IllegalArgumentException("HTTP entity may not be null");   
    }   
    String charset = null;   
    if (entity.getContentType() != null) {    
        HeaderElement values[] = entity.getContentType().getElements();   
        if (values.length > 0) {   
            NameValuePair param = values[0].getParameterByName("charset" );   
            if (param != null) {   
                charset = param.getValue();   
            }   
        }   
    }   
     
    if(StringUtils.isEmpty(charset)){  
        charset = "gbk";  
    }  
    return charset;   
}  
    /**
     * @param args
     */
    public static void main(String[] args) {
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        params.add(new BasicNameValuePair("provinceID", "浙江"));
        params.add(new BasicNameValuePair("zoneID", "杭州"));
        params.add(new BasicNameValuePair("vehicleKey", "BMW 05CG"));
        params.add(new BasicNameValuePair("distance", "2500.0"));
        params.add(new BasicNameValuePair("vehicleCondition", "2"));
        params.add(new BasicNameValuePair("productPriceType", "evaluatePrice"));
 
        String url = "http://www.51auto.com/service/MarketPriceInterface";
        String body = get(url, params);
       // String body = post(url, params);
        System.out.println(body);
    }
}
