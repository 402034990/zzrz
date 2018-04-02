package com.contract;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.poi.xwpf.converter.pdf.PdfConverter;
import org.apache.poi.xwpf.converter.pdf.PdfOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

 
/**
 * 将word转换成pdf
 * 注意:word的中文字体尽量用宋体
 * @author zhangcb
 */
public class WordToPdf {
 
    protected static final Logger logger = LoggerFactory.getLogger(WordToPdf.class);
     
    /**
     * 将word文档转换成pdf
     * @param filepath word文件路径
     * @param outpath  pdf输出路径
     * @throws Exception
     */
    public static boolean wordConverterToPdf(String filepath,String outpath){
    	InputStream source=null;
    	OutputStream target=null;
    	boolean flag=true;
		try {
			source = new FileInputStream(filepath);
		    target = new FileOutputStream(outpath);
		     
		    PdfOptions options = PdfOptions.create();
		        
			XWPFDocument doc = new XWPFDocument(source);
//			System.out.println("开始转换!!!");
			PdfConverter.getInstance().convert(doc,target,options);
//			System.out.println("转换成功!!!");
		} catch (IOException e) {
			flag=false;
//			System.out.println("转换失败!!!");
			logger.error("word转pdf出错：" + e.getMessage());
		} finally{
			try {
				if(null!=source){
					source.close();
				}
				if(null!=target){
					target.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return flag;
    }
}