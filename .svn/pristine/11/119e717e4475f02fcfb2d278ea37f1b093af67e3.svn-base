var seeQualifiedCarInfo = function(mortgageid,businessType,mfinancingId){
		//处理特殊字符小于号
		var formatValue = function(obj){
			if(obj.indexOf("<")){
				//var firstElement = obj.indexOf("<");
				//alert("第一次出现<的位置："+firstElement);
				var lastValue = obj.substring(obj.indexOf("<")+1);//获取从'<'第次一出现的位置后第一个元素至末位的值
		        var startValue = obj.substring(0,obj.indexOf("<"));//获取从0开始至第一次出现'<'位置之间的值
		        //alert("获取从0开始至第一次出现'<'位置之间的值==="+start+"       获取从'<'开始至末位的值==="+len);
		        return startValue+'&lt'+lastValue;
			}else{
				return obj;
			}
		}
/*		viewer=function(mortgageId,talbeName){// 提取到DZYMortgageView.js by gao 2013-3-30
		     var mark=talbeName+mortgageId;
	         picViewer(mark,true);
		}*/
		
	var seeQualifiedCarInformation = function(MortgageData){
		var panel_seeCar = new Ext.form.FormPanel({
			id :'seeQualifiedVehicle',
			//labelAlign : 'left',
			buttonAlign : 'center',
			bodyStyle : 'overflowX:hidden',
			autoScroll : true ,
			//cls : 'align:right',
			frame : true,
			border : false,
			items : [baseMortgageInfo(MortgageData),{
				layout : 'column',
				xtype:'fieldset',
	            title: '查看<车辆车易贷(有合格证)>详细信息',
	            collapsible: true,
	            autoHeight:true,
	            anchor : '95%',
	            items : [{
	            	layout : 'column',
	            	columnWidth : 1,
					border : false,
					items : [{
						columnWidth : 1,
						defaults : {
							layout : 'form',
							anchor : '99%',
							height : 30
						},
						items : [{
							html : '<b>制造商：</b>' + MortgageData.vProjMortCar.carManufacturer
						}]
					},{
						columnWidth : .5,
						defaults : {
							layout : 'form',
							anchor : '99%',
							height : 30
						},
						items : [{
							html : '<b>车型：</b>' + MortgageData.vProjMortCar.carModel
						},{
							html : '<b>是否进口车：</b> '+ function(){if (MortgageData.vProjMortCar.isImport==1){return '是'}else{return '否'}}()
						},{
							html : '<b>钥匙数：</b>' + MortgageData.vProjMortCar.keyCount
						}]
					},{
						columnWidth : .5,
						defaults : {
							layout : 'form',
							anchor : '99%',
							height : 30
						},
						items : [{
							html : '<b>车架号：</b>' + MortgageData.vProjMortCar.vin
						},{
							html : '<b>是否现车：</b> '+ function(){if (MortgageData.vProjMortCar.isNowCar==1){return '是'}else{return '否'}}()
						},{
							html : '<b>颜色：</b> '+ function(){if (typeof(MortgageData.vProjMortCar.carColorValue)!='undefined'){return MortgageData.vProjMortCar.carColorValue}else{return ''}}()
						}]
					}]
	            }]
			}]/*,
			tbar : [{
				text : '关闭',
				iconCls : 'cancelIcon',
				handler : function(){
					Ext.getCmp('win_seeCarInfo').destroy();
				}
			}]*/
		});
		
	
		var win_seeQualifiedCarInfo = new Ext.Window({
			id : 'win_seeQualifiedCarInfo',
			title: '查看车辆车易贷(有合格证)信息',
			layout : 'fit',
			iconCls : 'btn-readdocument',
			//width:660,
			width : (screen.width-180)*0.6,
			height : 450,
			closable : true,
			collapsible : true,
			resizable : true,
			plain : true,
			border : false,
			autoScroll : true ,
			modal : true,
			buttonAlign: 'right',
			minHeight: 350,       
			minWidth: 560,
			bodyStyle:'overflowX:hidden',
			items : [panel_seeCar]
		});
			win_seeQualifiedCarInfo.show();
	}
	
	Ext.Ajax.request({
		url : __ctxPath +'/credit/mortgage/seeVehicleForUpdate.do',
		method : 'POST',
		success : function(response, request) {
			obj = Ext.util.JSON.decode(response.responseText);
			if(obj.success==true){
				seeQualifiedCarInformation(obj.data) ;
			}else{
				Ext.Msg.alert('状态', obj.msg);
			}
		},
		failure : function(response) {
			Ext.Msg.alert('状态', '操作失败，请重试');
		},
		params : {
			id : mortgageid,
			businessType : businessType,
			mfinancingId : mfinancingId
		}
	});
}