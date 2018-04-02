//----------------------------报表相关--开始----------------------------------
var jq;
/**
 * 报表加载jsp方法
 * @param {} data 参数
 * @param {} id	  被渲染的div的id
 */
function commonReport(data,id){
	jq=jQuery.noConflict();
	Ext.Ajax.request({
		method:"post",
		url : __ctxPath + '/report/reportTemplate.jsp',
		params : data,
	    success : function(ret) {
	    	var totalHeight=jq('#centerTabPanel').height();
	    	var doc=document.getElementById(id);
	    	
	    	doc.setAttribute('style',"overflow:scroll;height:"+(totalHeight-100)+"px;");
	    	
	    	doc.innerHTML = ret.responseText;//动态的将页面加载
	    }
	});
}

/**
 * 公用方法
 * @param {} panel 
 * @param {} url 			请求URL
 * @param {} reportKey		报表key
 * @param {} reportType		报表类型(pdf、html、xls)
 */
function commomClick(panel,url,reportKey,reportType){
	jq=jQuery.noConflict();
	var parentObj=panel.form.getFieldValues();
	parentObj.reportKey=reportKey;
	parentObj.reportType=reportType;
	transform(parentObj);
	if(reportType=="xls" || reportType=="pdf"){
		testPost(url,parentObj,"post");
	}else if(reportType=="html"){
		openPostWindow(url,parentObj,"_blank");
	}else{
		Ext.Ajax.request({
			method:"post",
			url : url,
			params : parentObj,
		    success : function(ret) {
		    	var totalHeight=jq('#centerTabPanel').height();
		    	var doc=document.getElementById(reportKey);
		    	
		    	doc.setAttribute('style',"overflow:scroll;height:"+(totalHeight-100)+"px;");
		    	
		    	doc.innerHTML = ret.responseText;//动态的将页面加载
		    }
		});
	}
}

/**
 * 模拟post提交
 * @param {} path
 * @param {} params
 * @param {} method
 */
function testPost(path, params, method) {
    method = method || "post";

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    concatParams(params,form);//拼接参数

    document.body.appendChild(form);
    form.submit();
}

/**
 * 模拟post提交,打开新窗口
 * @param {} url
 * @param {} params
 * @param {} name
 */
function openPostWindow(url, params, name) { 
	var tempForm = document.createElement("form"); 
	tempForm.id="tempForm1"; 
	tempForm.method="post"; 
	tempForm.action=url; 
	tempForm.target=name; 
	
	concatParams(params,tempForm);//拼接参数
	
	tempForm.addEventListener("onsubmit",function(){
		window.open(name); 
	}); 
	document.body.appendChild(tempForm); 
	tempForm.submit(); 
	document.body.removeChild(tempForm); 
}

function transform(obj){
    for(var item in obj){
        if(obj[item] instanceof Date){
        	obj[item]=obj[item].toLocaleDateString()
        }
    }
}

/**
 * 拼接参数
 * @param {} params		参数
 * @param {} tempForm	form表单
 */
function concatParams(params,tempForm){
	for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            tempForm.appendChild(hiddenField);
         }
    }
}

//----------------------------报表相关--结束----------------------------------