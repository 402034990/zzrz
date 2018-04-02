package com.zhiwei.credit.action.p2p;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.httpclient.HttpException;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Type;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.util.AppUtil;
import com.zhiwei.credit.service.creditFlow.fileUploads.FileFormService;
import com.zhiwei.credit.service.p2p.FTPIoadFileService;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.web.action.BaseAction;


import com.zhiwei.credit.model.creditFlow.fileUploads.FileForm;
import com.zhiwei.credit.model.p2p.article.Article;
import com.zhiwei.credit.model.p2p.article.Articlecategory;
import com.zhiwei.credit.service.p2p.ArticleService;
import com.zhiwei.credit.util.Common;
import com.zhiwei.credit.util.HibernateProxyTypeAdapter;
import com.zhiwei.credit.util.WebClient;
/**
 * 
 * @author 
 *
 */
public class ArticleAction extends BaseAction{
	@Resource
	private ArticleService articleService;
	private Article article;
	
	private Long id;

	
	public String themeUrl;
	
	
	public String getThemeUrl() {
		return themeUrl;
	}

	public void setThemeUrl(String themeUrl) {
		this.themeUrl = themeUrl;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}
	//songwj
	@Resource
	private FTPIoadFileService fTPIoadFileService;
    //svn:song
    private  File  myUpload;
	
	// svn:songwj
	public String mark ;// 表字段
	// svn:songwj
	public String extendname;// 后缀名
	// svn:songwj
	public String tablename;// 后缀名
	
	public String setname;
	 
	public int creatorid;
	
	
	
	public String getSetname() {
		return setname;
	}

	public void setSetname(String setname) {
		this.setname = setname;
	}

	public int getCreatorid() {
		return creatorid;
	}

	public void setCreatorid(int creatorid) {
		this.creatorid = creatorid;
	}
	
	//songwj
	@Resource
	private FileFormService fileFormService;
	
	//贷款材料上传
	public String upLoadFiles(){
		System.out.println("sadddddddddddddd");
		System.out.println("myUpload.getName()------"+myUpload.getName());
		System.out.println("tablename--------------"+tablename);
		System.out.println("extendname---------------"+extendname);
	 
 
		String tablenameFirst = tablename;//获得第一个表的名称
		String tablenameTwo = "";
		String appointFileSetFolder ="p2p_article";//指定文件存放的路径
		  String selectId =Common.getRandomNum(32).toString();
		
		@SuppressWarnings("unused") 
		Map<String ,String > map = new  HashMap<String ,String >();
		map=fTPIoadFileService.ftpUploadFile(myUpload,appointFileSetFolder, tablenameFirst,tablenameTwo, selectId, extendname, setname, creatorid);
		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd").registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY).create() ;
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,webPath:'"+AppUtil.getConfigMap().get("fileURL")+map.get("webpath")+"'}");
//		sb.append(gson.toJson(AppUtil.getP2pUrl()+"/"+map.get("webpath")));
//		sb.append("}");
		setJsonString(sb.toString());
//		String jsonString = "{success : true, id_file : '"+fileinfo.getFileid()+"' }";
		System.out.println("sb.toString()---------------"+sb.toString());
		return SUCCESS;
	}
	

	public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<Article> list= articleService.getAll(filter);
		
		Type type=new TypeToken<List<Article>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd").registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY).create() ;
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				articleService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		Article article=articleService.get(id);
		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd").registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY).create() ;

		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(article));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		Long pid=Long.valueOf(this.getRequest().getParameter("parentId"));
		String isPublication=this.getRequest().getParameter("isPublication");
		String isRecommend=this.getRequest().getParameter("isRecommend");
		String isTop=this.getRequest().getParameter("isTop");
		
		System.out.println("isTop------------"+isTop);
		System.out.println("isRecommend------------"+isRecommend);
		System.out.println("isPublication------------"+isPublication);
		System.out.println("themeUrl================="+themeUrl);
		if(themeUrl!=null && !"".equals(themeUrl)){
			
			String[] arr = themeUrl.split("attachFiles");
			System.out.println(arr[0]);
			System.out.println(arr[1]);
			themeUrl = "attachFiles"+arr[1];
			System.out.println(themeUrl);
		}
		
		if(article.getId()==null){
			article.setIsPublication(isPublication);
			article.setIsRecommend(isRecommend);
			article.setIsTop(isTop);
			Articlecategory	articlecategory = new Articlecategory();
			articlecategory.setId(pid);
			article.setArticlecategory(articlecategory);
			article.setSingle(0);
			article.setHits(50);
			article.setPageCount(0);
			
			article.setThemeFtpUrl(themeUrl);
			article.setCreateDate(new Date());
			article.setModifyDate(new Date());
			articleService.save(article);
		}else{
			Article orgArticle=articleService.get(article.getId());
			try{
				article.setIsTop(isTop);
				article.setIsPublication(isPublication);
				article.setIsRecommend(isRecommend);
				
				article.setThemeFtpUrl(themeUrl);
				BeanUtil.copyNotNullProperties(orgArticle, article);
				
				System.out.println("isPublication------------"+orgArticle.getIsPublication());
				System.out.println("isTop------------"+orgArticle.getIsTop());
				System.out.println("isRecommend------------"+orgArticle.getIsRecommend());
				orgArticle.setModifyDate(new Date());
				articleService.save(orgArticle);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	
	public File getMyUpload() {
		return myUpload;
	}

	public void setMyUpload(File myUpload) {
		this.myUpload = myUpload;
	}

	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

	public String getExtendname() {
		return extendname;
	}

	public void setExtendname(String extendname) {
		this.extendname = extendname;
	}
}
