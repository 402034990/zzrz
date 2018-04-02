package com.zhiwei.credit.action.system;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.zhiwei.core.log.LogResource;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.model.system.Dictionary;
import com.zhiwei.credit.model.system.GlobalType;
import com.zhiwei.credit.service.system.DictionaryService;
import com.zhiwei.credit.service.system.GlobalTypeService;
import com.zhiwei.credit.util.HttpClientUtil;

import flexjson.JSONSerializer;

/**
 * 
 * @author
 * 
 */
public class DictionaryAction extends BaseAction {
	@Resource
	private DictionaryService dictionaryService;
	@Resource
	private GlobalTypeService globalTypeService;

	private Dictionary dictionary;

	private Long dicId;

	private String itemName;

	private String dicKey;
	
	private String nodeKey;
	
	private String leaf;
	
	
	
	public String getLeaf() {
		return leaf;
	}

	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}

	public String getNodeKey() {
		return nodeKey;
	}

	public void setNodeKey(String nodeKey) {
		this.nodeKey = nodeKey;
	}

	public String getDicKey() {
		return dicKey;
	}

	public void setDicKey(String dicKey) {
		this.dicKey = dicKey;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Long getDicId() {
		return dicId;
	}

	public void setDicId(Long dicId) {
		this.dicId = dicId;
	}

	public Dictionary getDictionary() {
		return dictionary;
	}

	public void setDictionary(Dictionary dictionary) {
		this.dictionary = dictionary;
	}
	@LogResource(description = "添加或修改单级数据字典")
	public String mulSave() {
		String data = getRequest().getParameter("data");

		if (StringUtils.isNotEmpty(data)) {
			Gson gson = new Gson();
			Dictionary[] dics = gson.fromJson(data, Dictionary[].class);

			for (int i = 0; i < dics.length; i++) {
				Dictionary dic = dictionaryService.get(dics[i].getDicId());
		
				try {
					BeanUtil.copyNotNullProperties(dic, dics[i]);

					dictionaryService.save(dic);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
				;
			}
		}

		jsonString = "{success:true}";
		return SUCCESS;
	}

	/**
	 * 显示列表
	 */
	public String list() {
		long totalCount=0;
		List<Dictionary> list=null;
		String sParentId = getRequest().getParameter("parentId");
        if(null!=leaf && leaf.equals("true") && null!=sParentId){
        	list=dictionaryService.getListByProTypeId(Long.parseLong(sParentId),start,limit);
        	totalCount=dictionaryService.getDicNumByProTypeId(Long.parseLong(sParentId));
           
        }else if(null!=sParentId){
        	list=dictionaryService.getByParentId(Long.parseLong(sParentId),start,limit);
            totalCount=dictionaryService.getDicNumByParentId(Long.parseLong(sParentId));
        }
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(totalCount).append(",result:");

		JSONSerializer json = new JSONSerializer();
		buff.append(json.serialize(list));
		
		buff.append("}");
		jsonString = buff.toString();
	/*	QueryFilter filter = new QueryFilter(getRequest());
		String sParentId = getRequest().getParameter("parentId");
		if (StringUtils.isNotEmpty(sParentId) && !"0".equals(sParentId)) {
			GlobalType globalType = globalTypeService.get(new Long(sParentId));
			filter.addFilter("Q_globalType.path_S_LFK", globalType.getPath());
		}
		if(null!=sParentId){
			List<Dictionary> dlist = dictionaryService.getAll(filter);
			List<Dictionary> list=new ArrayList<Dictionary>();
			for(Dictionary dic:dlist){
				if("0".equals(dic.getStatus())){
					list.add(dic);
				}
			}
			Type type = new TypeToken<List<Dictionary>>() {
			}.getType();
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(filter.getPagingBean().getTotalItems()).append(
							",result:");
	
			JSONSerializer json = new JSONSerializer();
			buff.append(json.serialize(list));
	
			buff.append("}");
			jsonString = buff.toString();
			}else{
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':0,result:[]}");
			jsonString = buff.toString();
		}*/
		

		return SUCCESS;
	}
	   public String loadpp(){
		    String url="";
		    String addJson = "";
//		    StringBuffer jsonObjectBrandList = new StringBuffer("[");
		    String jsonObjectBrandList="";
			List<NameValuePair> params = new ArrayList<NameValuePair>();
			try{
				params.add(new BasicNameValuePair("token", "158c70473eaaa184148838042fabcea6"));
				url = "http://300.zdxrchina.com/service/getCarBrandList";
				addJson=HttpClientUtil.get(url, params);
				if(addJson != null && !"".equals(addJson)){
					 String[] address = addJson.split("\\r");
					 JSONObject jsonObject = JSONObject.fromObject(address[0]);
			         // JSONObject addressComponent = jsonObject.getJSONObject("data");
			         String jsonObjectBrandListS = jsonObject.getString("brand_list");
			          if(jsonObjectBrandListS!=null&&!"".equals(jsonObjectBrandListS)){
			        	  Gson gson=new Gson();
			        	  //String jsonString = jsonObjectBrandListS.replaceAll("\\[", "{").replaceAll("\\]", "}");
			        	  System.out.println(jsonObjectBrandListS);
			        	  System.out.println(jsonString);
//			        	  brandModelList = (List<BrandModel>) gson.fromJson(jsonObjectBrandListS, BrandModel.class);
			        	  jsonObjectBrandList = jsonObjectBrandListS.replaceAll("\\{", "[").replaceAll("\\}", "]").replaceAll(":", ",");
			        	  
			          }
				}
			}  catch (Exception e1) {
				e1.printStackTrace();
			}
			setJsonString(jsonObjectBrandList);
		  return SUCCESS;
	   }
	 //获得车辆类型
	   public String loadCarStyle(){
		   String ppid = getRequest().getParameter("ppid");
		   if(ppid!=null&&!"".equals(ppid)&&!"请选择品牌".equals(ppid)){
			   String url="";
			    String styleJson = "";
//			    StringBuffer jsonObjectBrandList = new StringBuffer("[");
			    String jsonObjectBrandList="";
				List<NameValuePair> params = new ArrayList<NameValuePair>();
			    params.add(new BasicNameValuePair("token", "158c70473eaaa184148838042fabcea6"));
			    params.add(new BasicNameValuePair("brandId",ppid));
				url = "http://300.zdxrchina.com/service/getCarSeriesList";
				styleJson=HttpClientUtil.get(url, params);
				if(styleJson != null && !"".equals(styleJson)){
					 String[] address = styleJson.split("\\r");
					 JSONObject jsonObject = JSONObject.fromObject(address[0]);
			         // JSONObject addressComponent = jsonObject.getJSONObject("data");
			         String jsonObjectBrandListS = jsonObject.getString("series_list");
			          if(jsonObjectBrandListS!=null&&!"".equals(jsonObjectBrandListS)){
//			        	  List<BrandModel>  brandModelList = new ArrayList<BrandModel>() ;
			        	  Gson gson=new Gson();
			        	  //String jsonString = jsonObjectBrandListS.replaceAll("\\[", "{").replaceAll("\\]", "}");
			        	  System.out.println(jsonObjectBrandListS);
			        	  System.out.println(jsonString);
//			        	  brandModelList = (List<BrandModel>) gson.fromJson(jsonObjectBrandListS, BrandModel.class);
			        	  jsonObjectBrandList = jsonObjectBrandListS.replaceAll("\\{", "[").replaceAll("\\}", "]").replaceAll(":", ",");
			        	  
			          }
				}
				setJsonString(jsonObjectBrandList);
			   
		   }
		   
		   return SUCCESS;
	   }
	   public String loadCity(){

		    String url="";
		    String addJson = "";
//		    StringBuffer jsonObjectBrandList = new StringBuffer("[");
		    String jsonObjectBrandList="";
			List<NameValuePair> params = new ArrayList<NameValuePair>();
			try{
				params.add(new BasicNameValuePair("token", "158c70473eaaa184148838042fabcea6"));
				url = "http://300.zdxrchina.com/service/getAllCity";
				addJson=HttpClientUtil.get(url, params);
				if(addJson != null && !"".equals(addJson)){
					 String[] address = addJson.split("\\r");
					 JSONObject jsonObject = JSONObject.fromObject(address[0]);
			         // JSONObject addressComponent = jsonObject.getJSONObject("data");
			         String jsonObjectBrandListS = jsonObject.getString("city_list");
			          if(jsonObjectBrandListS!=null&&!"".equals(jsonObjectBrandListS)){
			        	  Gson gson=new Gson();
			        	  //String jsonString = jsonObjectBrandListS.replaceAll("\\[", "{").replaceAll("\\]", "}");
			        	  System.out.println(jsonObjectBrandListS);
			        	  System.out.println(jsonString);
//			        	  brandModelList = (List<BrandModel>) gson.fromJson(jsonObjectBrandListS, BrandModel.class);
			        	  jsonObjectBrandList = jsonObjectBrandListS.replaceAll("\\{", "[").replaceAll("\\}", "]").replaceAll(":", ",");
			        	  
			          }
				}
			}  catch (Exception e1) {
				e1.printStackTrace();
			}
			setJsonString(jsonObjectBrandList);
		  return SUCCESS;
	   }
	   //车辆型号
	   public String loadCarModel(){
		   String carStyleId = getRequest().getParameter("carStyleId");
		  
		   if(carStyleId!=null&&!"".equals(carStyleId)){
			   String url="";
			    String styleJson = "";
//			    StringBuffer jsonObjectBrandList = new StringBuffer("[");
			    String jsonObjectBrandList="";
				List<NameValuePair> params = new ArrayList<NameValuePair>();
			    params.add(new BasicNameValuePair("token", "158c70473eaaa184148838042fabcea6"));
			    try{
			    params.add(new BasicNameValuePair("seriesId",carStyleId));
				url = "http://300.zdxrchina.com/service/getCarModelList";
				styleJson=HttpClientUtil.get(url, params);
				if(styleJson != null && !"".equals(styleJson)){
					 String[] address = styleJson.split("\\r");
					 JSONObject jsonObject = JSONObject.fromObject(address[0]);
			         // JSONObject addressComponent = jsonObject.getJSONObject("data");
			         String jsonObjectBrandListS = jsonObject.getString("model_list");
			          if(jsonObjectBrandListS!=null&&!"".equals(jsonObjectBrandListS)){
//			        	  List<BrandModel>  brandModelList = new ArrayList<BrandModel>() ;
			        	  Gson gson=new Gson();
			        	  jsonObjectBrandList = jsonObjectBrandListS.replaceAll("\\{", "[").replaceAll("\\}", "]").replaceAll(":", ",");
			        	  System.out.println(jsonObjectBrandList);
			          }
				}
			    }  catch (Exception e1) {
					e1.printStackTrace();
				}
				setJsonString(jsonObjectBrandList);
			   
		   }
		   
		   return SUCCESS;
	   }
	/**
	 * 根据条目查询出字典的value并返回数组
	 * 
	 * @return
	 */
	public String load() {
		List<String> list = dictionaryService.getAllByItemName(itemName);
		StringBuffer buff = new StringBuffer("[");
		for (String itemName : list) {
			buff.append("'").append(itemName).append("',");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	public String loadItem() {
		List<Dictionary> list = dictionaryService.getByItemName(itemName);
		StringBuffer buff = new StringBuffer("[");
		for (Dictionary dic : list) {
			buff.append("[").append(dic.getDicId()).append(",'")
					.append(dic.getItemValue()).append("'],");

		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	public String loadItemRecord() {
		List<Dictionary> list = dictionaryService.getByItemName(itemName);
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(list));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String typeChange() {
		String dicIds = getRequest().getParameter("dicIds");
		String dicTypeId = getRequest().getParameter("dicTypeId");

		if (StringUtils.isNotEmpty(dicIds) && StringUtils.isNotEmpty(dicTypeId)) {
			GlobalType globalType = globalTypeService.get(new Long(dicTypeId));

			String[] ids = dicIds.split("[,]");
			if (ids != null) {
				for (String id : ids) {
					Dictionary dic = dictionaryService.get(new Long(id));
					dic.setGlobalType(globalType);
					dic.setItemName(globalType.getTypeName());

					dictionaryService.save(dic);
				}
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	@LogResource(description = "删除单级数据字典")
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				Dictionary dictionary=dictionaryService.get(new Long(id));
				dictionary.setStatus("1");
				dictionaryService.save(dictionary);
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		Dictionary dictionary = dictionaryService.get(dicId);

		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(dictionary));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
        if(dictionary.getDicKey()!=null && !"".equals(dictionary.getDicKey())){
        	List<Dictionary> list=null;
        	if(dictionary.getDicId()==null){
        	     list=dictionaryService.getByDicKey(dictionary.getDicKey());
        	}else{
        		Dictionary orgDic = dictionaryService.get(dictionary.getDicId());

					if(!dictionary.getDicKey().equals(orgDic.getDicKey())){
						list=dictionaryService.getByDicKey(dictionary.getDicKey());
					}
				
        	}
        	if(null!=list && list.size()>0){
        		setJsonString("{success:true,mag:false}");
        	}else{
        		if (dictionary.getDicId() != null) {
        			Dictionary orgDic = dictionaryService.get(dictionary.getDicId());
        			try {
        				
        				BeanUtil.copyNotNullProperties(orgDic, dictionary);
        				dictionaryService.save(orgDic);
        			} catch (Exception ex) {
        				logger.error(ex.getMessage());
        			}
        		} else {
        			String parentId = getRequest().getParameter("parentId");
        			if (StringUtils.isNotEmpty(parentId)) {
        				GlobalType globalType = globalTypeService.get(new Long(parentId));
        				dictionary.setGlobalType(globalType);
        			}
        			dictionaryService.save(dictionary);
        		}
        		setJsonString("{success:true}");
        	}
        }
		
		return SUCCESS;
	}

	/**
	 * 获得条目
	 * 
	 * @return
	 */
	public String items() {
		List<String> list = dictionaryService.getAllItems();
		StringBuffer buff = new StringBuffer("[");
		for (String str : list) {
			buff.append("'").append(str).append("',");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}
/**
 * 根据nodeKey得到字典项
 */
   public String loadItemByNodeKey(){
	   List<GlobalType> list=globalTypeService.getByNodeKey(nodeKey);
	   if(null!=list && list.size()>0){
		   List<Dictionary> list1=dictionaryService.getByProTypeId(list.get(0).getProTypeId());
		   StringBuffer buff = new StringBuffer("[");
			for (Dictionary dic : list1) {
				buff.append("[").append(dic.getDicId()).append(",'")
						.append(dic.getItemValue()).append("'],");

			}
			if (list.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);
			}
			buff.append("]");
			setJsonString(buff.toString());
	   }
	   return SUCCESS;
   }
   
   public String loadItemByNodeKey2(){
	   List<GlobalType> list=globalTypeService.getByNodeKey(nodeKey);
	   if(null!=list && list.size()>0){
		   List<Dictionary> list1=dictionaryService.getByProTypeId(list.get(0).getProTypeId());
		   StringBuffer buff = new StringBuffer("[");
			for (Dictionary dic : list1) {
				buff.append("['").append(dic.getDicKey()).append("','").append(dic.getItemValue()).append("'],");
			}
			if (list.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);
			}
			buff.append("]");
			setJsonString(buff.toString());
	   }
	   return SUCCESS;
   }
   
   public String loadItemByNodeKey1(){
	   List<GlobalType> list=globalTypeService.getByNodeKey(nodeKey);
	   if(null!=list && list.size()>0){
		   List<Dictionary> list1=dictionaryService.getByProTypeId(list.get(0).getProTypeId());
		   StringBuffer buff = new StringBuffer("[");
			for (Dictionary dic : list1) {
				buff.append("['").append(dic.getItemValue()).append("','")
						.append(dic.getItemValue()).append("'],");

			}
			if (list.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);
			}
			buff.append("]");
			setJsonString(buff.toString());
	   }
	 
	   return SUCCESS;
   }
   
   public String queryDicValue(){
		String dicId = this.getRequest().getParameter("dicId");
		String dicValue = dictionaryService.queryDic(dicId);
        StringBuffer buff = new StringBuffer("{success:true,result:'");
        buff.append(dicValue+"'}");
		jsonString = buff.toString();
		return SUCCESS;
	
   }
   
	/**
	 * 根据globeltype来获取数据字典类型列表
	 */
	public String listbyglobleType() {
	   List<GlobalType> list=globalTypeService.getByNodeKey(nodeKey);
	   long totalCount=0;
		List<Dictionary> list1=null;
	   if(null!=list && list.size()>0){
		  list1=dictionaryService.getListByProTypeId(list.get(0).getProTypeId(),start,limit);
	       totalCount=dictionaryService.getDicNumByProTypeId(list.get(0).getProTypeId());
	       
	   }
	   StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(totalCount).append(",result:");
		JSONSerializer json = new JSONSerializer();
		buff.append(json.serialize(list1));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 保存数据字典类型
	 * @return
	 */
	public String saveType(){
        	List<Dictionary> list=null;
        	if(dictionary.getDicId()==null){
        	     list=dictionaryService.getByDicKey(dictionary.getDicKey());
        	}else{
        		Dictionary orgDic = dictionaryService.get(dictionary.getDicId());
				if(!dictionary.getDicKey().equals(orgDic.getDicKey())){
					list=dictionaryService.getByDicKey(dictionary.getDicKey());
				}
        	}
        	if(null!=list && list.size()>0){
        		setJsonString("{success:true,mag:false}");
        	}else{
        		if (dictionary.getDicId() != null&&!"".equals(dictionary.getDicId())) {
        			Dictionary orgDic = dictionaryService.get(dictionary.getDicId());
        			try {
        				BeanUtil.copyNotNullProperties(orgDic, dictionary);
        				dictionaryService.save(orgDic);
        			} catch (Exception ex) {
        				logger.error(ex.getMessage());
        			}
        		} else {
        			String parentId = getRequest().getParameter("dicKey");
        			if (StringUtils.isNotEmpty(parentId)) {
        				List<GlobalType> globalType = globalTypeService.getByNodeKey(parentId);
        				if(globalType!=null&&list.size()<=0){
        					dictionary.setGlobalType(globalType.get(0));
        					dictionary.setItemName(globalType.get(0).getTypeName());
        					dictionary.setProTypeId(globalType.get(0).getProTypeId());
        				    dictionaryService.save(dictionary);
        				    setJsonString("{success:true}");
        				}else{
        					setJsonString("{success:true,mag:false}");
        				}
        			}else{
        				setJsonString("{success:true,mag:false}");
        			}
        		}
        	}
		return SUCCESS;
	
	}
}
