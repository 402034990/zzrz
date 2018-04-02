function bankInfoWin(customerId,isReadOnly,isInvest,isEnterprise,fn){
	var pageSize = 10 ;
	var anchor = '100%';
	
        	var enterpriseId = customerId;
			var jStore_bankInfo = new CS.data.JsonStore( {
				url : __ctxPath + '/creditFlow/customer/common/queryListEnterpriseBank.do',
				fields : [ {
					
				
					
					name : 'id'
				},{
					name : 'enterpriseid'
				}, {
					name : 'bankid'
				}, {
					name : 'bankname'
				}, {
					name : 'accountnum'
				}, {
					name : 'openType'
				},{
					name : 'accountType'
				},{
					name : 'iscredit'
				},{
					name : 'creditnum'
				},{
					name : 'creditpsw'
				},{
					name : 'remarks'
				},{
					name : 'isEnterprise'
				},{
					name : 'openCurrency'
				},{
					name : 'name'
				},{
				    name : 'outletsname'
				},{
					name : 'areaName'
				},{
					name : 'bankOutletsName'
				}],
				baseParams : {
					id : enterpriseId,
				  isEnterpriseStr:isEnterprise,
				  isInvest:isInvest
				},
				listeners : {
					'load':function(){
						gPanel_enterpriseBank.getSelectionModel().selectFirstRow() ;
					},
					'loadexception' : function(){
						Ext.ux.Toast.msg('提示','数据加载失败，请保证网络畅通！');			
					}
				}
			});
			var button_add_debt = new CS.button.AButton({
				handler : function() {
					var fPanel_addBank = new CS.form.FormPanel({
						url:__ctxPath + '/creditFlow/customer/common/addEnterpriseBank.do',
						labelWidth : 90,
						monitorValid : true,
						bodyStyle:'padding:10px',
						width : 488,
						height : 278,
						items : [ {
				            layout:'column',
				            items:[{
									columnWidth : .5,
									layout : 'form',
									labelWidth : 73,
									items : [{					
										fieldLabel : "银行名称",
										xtype : "combo",
										displayField : 'itemName',
										valueField : 'itemId',
										allowBlank:false,
										triggerAction : 'all',
										store : new Ext.data.ArrayStore({
											url : __ctxPath+ '/creditFlow/common/getBankListCsBank.do',
											fields : ['itemId', 'itemName'],
											autoLoad : true
										}),
										mode : 'remote',
										hiddenName : "enterpriseBank.bankid",
										editable : false,
										blankText : "银行名称不能为空，请正确填写!",
										anchor : "96%",
										listeners : {
											scope : this,
											afterrender : function(combox) {
												var st = combox.getStore();
												st.on("load", function() {
													combox.setValue(combox.getValue());
													
												})
												combox.clearInvalid();
											}
										}
									}]
								},{
									columnWidth : .5,
									layout : 'form',
									labelWidth : 73,
									items : [{
										name : 'enterpriseBank.areaId',
										xtype:'hidden'
									},{					
										name : 'enterpriseBank.areaName',
									    hiddenName : 'enterpriseBank.areaName',
										fieldLabel : '开户地区',	
										anchor : '96%',
//										allowBlank:false,
				                      	xtype:'trigger',
										triggerClass :'x-form-search-trigger',
										editable : false,
										scope : this,
										onTriggerClick : function(){
											var com=this
											var selectBankLinkMan = function(array){
												var str="";
												var idStr=""
												for(var i=array.length-1;i>=0;i--){
													str=str+array[i].text+"-"
													idStr=idStr+array[i].id+","
												}
												if(str!=""){
													str=str.substring(0,str.length-1);
												}
												if(idStr!=""){
													idStr=idStr.substring(0,idStr.length-1)
												}
												com.previousSibling().setValue(idStr)
												com.setValue(str);
											};
											selectDictionary('area',selectBankLinkMan);
										}
									}]
								},{
									columnWidth : 1,
									layout : 'form',
									labelWidth : 73,
									items : [{
										fieldLabel : "网点名称",
	                                    name : 'enterpriseBank.bankOutletsName',
									    xtype:'textfield',
									    anchor : '98%',
									    allowBlank:false
									}]
								},{
								 	columnWidth : .5,
								  	labelWidth : 73,
								 	layout : 'form',
								 	items :[{
										fieldLabel : '开户姓名',	
	                              		name : 'enterpriseBank.name',
										xtype:'textfield',
										anchor : '96%',
										allowBlank:false
								 	}]
								 },{
									 columnWidth : .5,
									 labelWidth : 98,
								     layout : 'form',
								     items :[{
										fieldLabel : '账号',	
									 	name : 'enterpriseBank.accountnum',
										maxLength: 100,
										xtype:'textfield',
										anchor : '96%',
										allowBlank:false,
										listeners : {
											scope:this,
											'blur' : function(f) {
												var accountnum = f.getValue();
												var id = 0;
												Ext.Ajax.request({
								                   url:  __ctxPath + '/creditFlow/customer/common/queryAlreadyAccountEnterpriseBank.do',
								                   method : 'POST',
								                   params : {
														accountnum : accountnum,
														id:id
													},
								                  	success : function(response,request) {
														var obj=Ext.util.JSON.decode(response.responseText);
					                            		if(obj.msg){					                            			
					                            			Ext.ux.Toast.msg('操作信息',"该卡号已存在，请重新输入");
					                            			f.setValue("");
					                            		}
							                      	}
					                             });
											}
										}
									}]
								},{
					              	columnWidth : 1,
									layout : 'form',
								  	labelWidth : 73,
									items :[{
										xtype : 'textarea',
									 	anchor : '98%',
										fieldLabel : '备注',
										height : 80,
										name : 'enterpriseBank.remarks'
									}]
				              },{
				              	xtype : 'hidden',
								name : 'enterpriseBank.enterpriseid',
								value : enterpriseId
				              },{
				              	xtype : 'hidden',
								name : 'enterpriseBank.isEnterprise',
								value : isEnterprise
				              }, {
								xtype : 'hidden',
								name : 'enterpriseBank.isInvest',
								value : isInvest
							}]
				        } ],
						buttons : [ {
							text : '保存',
							iconCls : 'submitIcon',
							formBind : true,
							handler : function() {
								fPanel_addBank.getForm().submit({
									method : 'POST',
									waitTitle : '连接',
									waitMsg : '消息发送中...',
									success : function(form,action) {
										obj = Ext.util.JSON.decode(action.response.responseText);
										Ext.ux.Toast.msg('状态', '保存成功！');
										win_add_company.destroy();
										jStore_bankInfo.reload();
									},
									failure : function(form, action) {
										if(action.response.status==0){
											Ext.ux.Toast.msg('状态','连接失败，请保证服务已开启');
										}else if(action.response.status==-1){
											Ext.ux.Toast.msg('状态','连接超时，请重试!');
										}else{
											Ext.ux.Toast.msg('状态','添加失败!');	
										}
									}
								});
							}
						}]
					});
					var win_add_company = new Ext.Window({
						id : 'win_addBankInfo',
						title: '新增开户银行信息',
						layout : 'fit',
						width :(screen.width-180)*0.55,
						height : 310,
						closable : true,
						resizable : false,
						constrainHeader : true ,
						collapsible : true, 
						plain : true,
						border : false,
						modal : true,
						buttonAlign: 'center',
						bodyStyle : 'overflowX:hidden',
						items :[fPanel_addBank]
//						listeners : {
//							'beforeclose' : function(){
//								if(fPanel_addBank != null){
//									if(fPanel_addBank.getForm().isDirty()){
//										Ext.Msg.confirm('操作提示','数据被修改过,是否保存',function(btn){
//											if(btn=='yes'){
//												fPanel_addBank.buttons[0].handler.call() ;
//											}else{
//												fPanel_addBank.getForm().reset() ;
//												win_add_company.destroy() ;
//											}
//										}) ;
//										return false ;
//									}
//								}
//							}
//						}
					});
					win_add_company.show();
				}
			});
			var button_update_company = new CS.button.UButton({
				handler : function() {
					var selected = gPanel_enterpriseBank.getSelectionModel().getSelected();
					if (null == selected) {
						Ext.ux.Toast.msg('状态', '请选择一条记录!');
					}else{
						var id = selected.get('id');
						Ext.Ajax.request({
							url : __ctxPath + '/creditFlow/customer/common/findEnterpriseBank.do',
							method : 'POST',
							success : function(response,request) {
								var obj = Ext.decode(response.responseText);
								var bankData = obj.data ;
								var fPanel_updateBankInfo = new CS.form.FormPanel({
									url:__ctxPath + '/creditFlow/customer/common/updateEnterpriseBank.do',
									bodyStyle : 'padding:10px;',
									width : 488,
									height : 278,
									labelWidth : 90,
									monitorValid : true,
									items : [ {
				            layout:'column',
				            items:[{
									columnWidth : .5,
									layout : 'form',
									labelWidth : 73,
									items : [{					
										fieldLabel : "银行名称",
										xtype : "combo",
										displayField : 'itemName',
										valueField : 'itemId',
										triggerAction : 'all',	
										allowBlank:false,
										store : new Ext.data.ArrayStore({
											url : __ctxPath+ '/creditFlow/common/getBankListCsBank.do',
											fields : ['itemId', 'itemName'],
											autoLoad : true
										}),
										mode : 'remote',
										hiddenName : "enterpriseBank.bankid",
										value : bankData.bankid,
										editable : false,
										blankText : "银行名称不能为空，请正确填写!",
										anchor : "96%",
										listeners : {
											scope : this,
											afterrender : function(combox) {
												var st = combox.getStore();
												st.on("load", function() {
													combox.setValue(combox.getValue());
												})
												combox.clearInvalid();
											}
										}
									}]
								},{
									columnWidth : .5,
									layout : 'form',
									labelWidth : 73,
									items : [{
										name : 'enterpriseBank.areaId',
										value : bankData.areaId,
										xtype:'hidden'
									},{					
										name : 'enterpriseBank.areaName',
									    hiddenName : 'enterpriseBank.areaName',
									    value : bankData.areaName,
										fieldLabel : '开户地区',	
										anchor : '96%',
//										allowBlank:false,
				                      	xtype:'trigger',
										triggerClass :'x-form-search-trigger',
										editable : false,
										scope : this,
										onTriggerClick : function(){
											var com=this
											var selectBankLinkMan = function(array){
												var str="";
												var idStr=""
												for(var i=array.length-1;i>=0;i--){
													str=str+array[i].text+"-"
													idStr=idStr+array[i].id+","
												}
												if(str!=""){
													str=str.substring(0,str.length-1);
												}
												if(idStr!=""){
													idStr=idStr.substring(0,idStr.length-1)
												}
												com.previousSibling().setValue(idStr)
												com.setValue(str);
											};
											selectDictionary('area',selectBankLinkMan);
										}
									}]
								},{
									columnWidth : 1,
									layout : 'form',
									labelWidth : 73,
									items : [{
									fieldLabel : "网点名称",
	                                    name : 'enterpriseBank.bankOutletsName',
									    xtype:'textfield',
									    anchor : '98%',
									     value : bankData.bankOutletsName,
									     allowBlank:false
									}]
								},{
								 	columnWidth : .5,
								  	labelWidth : 73,
								 	layout : 'form',
								 	items :[{
										fieldLabel : '开户姓名',	
		                              	name : 'enterpriseBank.name',
		                                value : bankData.name,
										xtype:'textfield',
										anchor : '96%',
										allowBlank:false
								 	}]
								 },{
									columnWidth : .5,
									labelWidth : 98,
								    layout : 'form',
								    items :[{
										fieldLabel : '账号',	
									 	name : 'enterpriseBank.accountnum',
								 	  	value : bankData.accountnum,
									  	maxLength: 100,
									  	xtype:'textfield',
									  	anchor : '96%',
									  	allowBlank:false,
									  	listeners : {
											scope:this,
											'beforerender':function(com){},
											'blur' : function(f) {
												var accountnum = f.getValue();
												Ext.Ajax.request({
								                   url:  __ctxPath + '/creditFlow/customer/common/queryAlreadyAccountEnterpriseBank.do',
								                   method : 'POST',
								                   params : {
														accountnum : accountnum,
														id:id
													},
								                  	success : function(response,request) {
														var obj=Ext.util.JSON.decode(response.responseText);
					                            		if(obj.msg){					                            			
					                            			Ext.ux.Toast.msg('操作信息',"该卡号已存在，请重新输入");
					                            			f.setValue("");
					                            		}
							                      	}
					                            });
											}
										}
									}]
								},{
				              		columnWidth : 1,
									layout : 'form',
								  	labelWidth : 73,
									items :[{
										xtype : 'textarea',
									 	anchor : '98%',
										fieldLabel : '备注',
										height : 80,
										name : 'enterpriseBank.remarks',
									  	value : bankData.remarks
									}]
				              },{
				              	xtype : 'hidden',
								name : 'enterpriseBank.enterpriseid',
								  value : bankData.enterpriseid,
								value : enterpriseId
				              },{
				              	xtype : 'hidden',
								name : 'enterpriseBank.isEnterprise',
								value : isEnterprise
				              },{
				              	xtype : 'hidden',
								name : 'enterpriseBank.companyId',
								value :  bankData.companyId
				              },{
				              	xtype : 'hidden',
								name : 'enterpriseBank.id',
								value :bankData.id
				              }, {
								xtype : 'hidden',
								name : 'enterpriseBank.isInvest',
								value : isInvest
							}]
							        	} ],
									buttons : [ {
										text : '保存',
										iconCls : 'submitIcon',
										formBind : true,
										handler : function() {
											fPanel_updateBankInfo.getForm().submit({
												method : 'POST',
												waitTitle : '连接',
												waitMsg : '消息发送中...',
												success : function(form,action) {
													obj = Ext.util.JSON.decode(action.response.responseText);
													/*if(obj.exsit == false){
														Ext.Msg.confirm('信息确认', obj.msg, function(btn){
														if(btn=="yes") {
															window_update.destroy();
															jStore_bankInfo.reload();
														}
													})*/
													Ext.ux.Toast.msg('状态', '保存成功!');
													window_update.destroy();
													jStore_bankInfo.reload();
																	
												//}
													/*Ext.ux.Toast.msg('状态', '编辑成功!');
																	jStore_bankInfo.reload();
																	window_update.destroy();*/
												},
												failure : function(form, action) {
													if(action.response.status==0){
														Ext.ux.Toast.msg('状态','连接失败，请保证服务已开启');
													}else if(action.response.status==-1){
														Ext.ux.Toast.msg('状态','连接超时，请重试!');
													}else{
														Ext.ux.Toast.msg('状态','编辑失败!');	
													}
												}
											});
										}
									}]
								});	
								var window_update = new Ext.Window({
									id : 'win_updateBankInfo',
									title: '编辑开户银行信息',
									layout : 'fit',
									width :(screen.width-180)*0.55,
									height : 310,
									closable : true,
									resizable : false,
									constrainHeader : true ,
									collapsible : true, 
									plain : true,
									border : false,
									modal : true,
									bodyStyle : 'overflowX:hidden',
									buttonAlign: 'center',
									items: [fPanel_updateBankInfo],
									listeners : {
									'beforeclose' : function(){
										if(fPanel_updateBankInfo != null){
											if(fPanel_updateBankInfo.getForm().isDirty()){
												Ext.Msg.confirm('操作提示','数据被修改过,是否保存',function(btn){
													if(btn=='yes'){
														fPanel_updateBankInfo.buttons[0].handler.call() ;
													}else{
														fPanel_updateBankInfo.getForm().reset() ;
														window_update.destroy() ;
													}
												}) ;
												return false ;
											}
										}
									}
								}
								});
								window_update.show();			
							},
							failure : function(response) {					
									Ext.ux.Toast.msg('状态','操作失败，请重试');		
							},
							params: { id: id }
						});	
					}
				}
			});
			var button_delete = new CS.button.DButton({
				handler : function() {
					var selected = gPanel_enterpriseBank.getSelectionModel().getSelected();
					if (null == selected) {
						Ext.ux.Toast.msg('状态', '请选择一条记录!');
					}else{
						var id = selected.get('id');
						Ext.MessageBox.confirm('确认删除', '是否确认执行删除 ', function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									url : __ctxPath + '/creditFlow/customer/common/deleteRsEnterpriseBank.do',
									method : 'POST',
									success : function() {
										Ext.ux.Toast.msg('状态', '删除成功!');
										jStore_bankInfo.reload() ;
									},
									failure : function(result, action) {
										if(response.status==0){
											Ext.ux.Toast.msg('状态','连接失败，请保证服务已开启');
										}else if(response.status==-1){
											Ext.ux.Toast.msg('状态','连接超时，请重试!');
										}else{
											Ext.ux.Toast.msg('状态','删除失败!');	
										}
									},
									params: { id: id }
								});
							}
						});
					}
				}
			});
			var button_see = new CS.button.SButton({
				handler : function() {
					var selected = gPanel_enterpriseBank.getSelectionModel().getSelected();
					if (null == selected) {
						Ext.ux.Toast.msg('状态', '请选择一条记录!');
					}else{
						var id = selected.get('id');
						seeEnterpriseCompany(id);
					}
			}
			});
			var cModel_enterpriseCompany = new Ext.grid.ColumnModel(
					[
							new Ext.grid.RowNumberer(),
							{
								header : "银行名称",
								width : 160,
								sortable : true,
								dataIndex : 'bankname'
							}, {
								header : "网点名称",
								width : 110,
								sortable : true,
								dataIndex : 'bankOutletsName'
							}, {
								header : "开户地区",
								width : 110,
								sortable : true,
								dataIndex : 'areaName'
							},{
								header : "开户名称",
								width : 100,
								sortable : true,
								dataIndex : 'name'
							},{
								header : "账号",
								width : 150,
								sortable : true,
								dataIndex : 'accountnum'
							}]);
			var gPanel_enterpriseBank = new Ext.grid.GridPanel( {
				pageSize : pageSize ,
				store : jStore_bankInfo,
				stripeRows : true,
				border : false ,
				autoWidth : true,
				height:350,
				colModel : cModel_enterpriseCompany,
				selModel : new Ext.grid.RowSelectionModel(),
				//autoExpandColumn : 8,
				tbar :isReadOnly?[button_see]:[button_add_debt,button_see,button_update_company,button_delete],
				loadMask : new Ext.LoadMask(Ext.getBody(), {
					msg : "加载数据中······,请稍后······"
				}),
				bbar : new Ext.PagingToolbar({
					pageSize : pageSize,
					autoWidth : false ,
					//width : 100 ,
					style : '',
					displayInfo : true,
					displayMsg : '当前第{0} - {1}条，共 {2} 条记录',
					emptyMsg : '没有符合条件的记录',
					store : jStore_bankInfo
				}),
				listeners : {
					'rowdblclick' : function(grid,index,e){
//						seeEnterpriseCompany(id);
						var selected = grid.getSelectionModel().getSelected();
						fn({
							id : selected.get('id'),
							name : selected.get('name'),
							accountnum : selected.get('accountnum'),
							bankid:selected.get('bankid'),
							bankOutletsName:selected.get('bankOutletsName'),
							areaId:selected.get('areaId'),
							areaName:selected.get('areaName')
						});
						Ext.getCmp('bankListWin').close();
					}
				}
			});
			var seeEnterpriseCompany = function(id){
				Ext.Ajax.request({
					url : __ctxPath + '/creditFlow/customer/common/findEnterpriseBank.do',
					method : 'POST',
					success : function(response,request) {
						var obj = Ext.util.JSON.decode(response.responseText);
						bankData = obj.data ;
						var panel_see = new CS.form.FormPanel({
							bodyStyle : 'padding:10px;',
							width : 488,
							height : 258,
							labelWidth : 90,
							items : [ {
				            layout:'column',
				            items:[{
									columnWidth : .5,
									layout : 'form',
									labelWidth : 73,
									items : [{					
										fieldLabel : "银行名称",
										xtype : "combo",
										displayField : 'itemName',
										valueField : 'itemId',
										triggerAction : 'all',	
										readOnly : true,
										allowBlank:false,
										store : new Ext.data.ArrayStore({
											url : __ctxPath+ '/creditFlow/common/getBankListCsBank.do',
											fields : ['itemId', 'itemName'],
											autoLoad : true
										}),
										mode : 'remote',
										hiddenName : "enterpriseBank.bankid",
										value : bankData.bankid,
										editable : false,
										blankText : "银行名称不能为空，请正确填写!",
										anchor : "96%",
										listeners : {
											scope : this,
											afterrender : function(combox) {
												var st = combox.getStore();
												st.on("load", function() {
													combox.setValue(combox.getValue());
												})
												combox.clearInvalid();
											}
										}
									}]
								},{
									columnWidth : .5,
									layout : 'form',
									labelWidth : 73,
									items : [{
										name : 'enterpriseBank.areaId',
										value : bankData.areaId,
										xtype:'hidden'
									},{						
										name : 'enterpriseBank.areaName',
									    hiddenName : 'enterpriseBank.areaName',
									    value : bankData.areaName,
										fieldLabel : '开户地区',	
										anchor : '96%',
										readOnly:true,
				                      	xtype:'trigger',
										triggerClass :'x-form-search-trigger',
										editable : false,
										scope : this,
										allowBlank:false,
										onTriggerClick : function(){
											var com=this
											var selectBankLinkMan = function(array){
												var str="";
												var idStr=""
												for(var i=array.length-1;i>=0;i--){
													str=str+array[i].text+"-"
													idStr=idStr+array[i].id+","
												}
												if(str!=""){
													str=str.substring(0,str.length-1);
												}
												if(idStr!=""){
													idStr=idStr.substring(0,idStr.length-1)
												}
												com.previousSibling().setValue(idStr)
												com.setValue(str);
											};
											selectDictionary('area',selectBankLinkMan);
										}
									}]
								},{
									columnWidth : 1,
									layout : 'form',
									labelWidth : 73,
									items : [{
									fieldLabel : "网点名称",
	                                    name : 'enterpriseBank.bankOutletsName',
									    xtype:'textfield',
									    anchor : '98%',
									    readOnly  : true,
									    value : bankData.bankOutletsName,
									    allowBlank:false
									}]
								},{
								 	columnWidth : .5,
								  	labelWidth : 73,
									layout : 'form',
									items :[{
										fieldLabel : '开户名称',	
	                              		name : 'enterpriseBank.name',
		                                value : bankData.name,
										xtype:'textfield',
									    readOnly  : true,
									    allowBlank:false,
										anchor : '96%'
								 	}]
								 },{
									 columnWidth : .5,
									 labelWidth : 98,
								     layout : 'form',
								     items :[{
										fieldLabel : '账号',	
									 	name : 'enterpriseBank.accountnum',
								 	  	value : bankData.accountnum,
										maxLength: 100,
										xtype:'textfield',
										anchor : '96%',
										allowBlank:false,
								     	readOnly  : true
									}]
								},{
					              	columnWidth : 1,
									layout : 'form',
								  	labelWidth : 73,
									items :[{
										xtype : 'textarea',
									 	anchor : '98%',
										fieldLabel : '备注',
									    readOnly  : true,
										height : 80,
										name : 'enterpriseBank.remarks',
									  	value : bankData.remarks
									}]
				              	}]
					        }]
						});
						var window_see = new Ext.Window({
							id : 'win_seeBankInfo',
							title: '查看开户银行信息',
							layout : 'fit',
							//width : 500,
							width :(screen.width-180)*0.55,
							height : 290,
							closable : true,
							resizable : true,
							constrainHeader : true ,
							collapsible : true, 
							plain : true,
							border : false,
							modal : true,
							bodyStyle : 'overflowX:hidden',
							items :[panel_see]
						});
						window_see.show();	
					},
					failure : function(response) {					
							Ext.ux.Toast.msg('状态','操作失败，请重试');		
					},
					params: { id: id }
				});	
			}
			jStore_bankInfo.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});
			var win_listEnterpriseBankInfo = new CS.Window({
				title : '银行开户信息',
				//((screen.width-180)*0.5;  550
				id:'bankListWin',
				width :(screen.width-180)*0.55 + 30,
				height : 400,
				buttonAlign : 'center',
				layout : 'fit',
				border : true,
				modal : true,
				maximizable : true,
				autoScroll : true ,
				constrainHeader : true ,
				collapsible : true, 
				items :[gPanel_enterpriseBank]
			}).show();
     
}