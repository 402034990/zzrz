//var formulatestore = new HT.JsonStore({
//	url : __ctxPath + "/finance/listSlFundIntent.do"	
//});

projectArchives = Ext.extend(Ext.Panel,
				{
				constructor : function(_cfg) {
					if(typeof(_cfg.readonly)!="undefined")
						{
						      this.readonly=_cfg.readonly;
						}
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				var companyId =this.companyId
				projectArchives.superclass.constructor.call(this, {
                        layout:'column',
							bodyStyle : 'padding:10px',
							border : false,
							autoScroll : true,
							monitorValid : true,
					//		frame : true,
							plain : true,
							labelAlign : "right",
							//id : 'PlProjectArchivesForm',
							defaults : {
								anchor : '96%',
								labelWidth : 80,
								columnWidth : 1,
							    layout : 'column'
							},
							items : [{
								name : 'plProjectArchives.projtoarchiveId',
								xtype : 'hidden',
								value : this.projtoarchiveId == null ? '' : this.projtoarchiveId
							}
																																																	,{
																fieldLabel : '',
																xtype : 'hidden',
														//		id :'archivescherkerid',
								 								name : 'plProjectArchives.plarchivesId'
								 							}
																																										,{
																
																fieldLabel : '',	
																xtype : 'hidden',
								 								name : 'plProjectArchives.projectId'
								 							}
																
								 							,{  columnWidth : .25,
																 labelWidth : 90,
																 layout : 'form',
																 items :[{
																		fieldLabel : '项目相关文件',	
										 								name : 'isArchives',
										 						//		id :'isArchives',
										 								readOnly :this.readonly,
										 								disabled:this.readonly,
										 								xtype : 'checkbox',
										 								boxLabel :'是否归档',
										 								 listeners:{
																           'check':function(box,checked){
																           	var obj1=this.ownerCt.ownerCt.ownerCt;
																               if(checked==true){
																                  obj1.getCmpByName("plProjectArchives.isArchives").setValue(1);
																               }else{
																               
																                obj1.getCmpByName("plProjectArchives.isArchives").setValue(0);
																               }
																               
																           }
																        }
								 								},
								 								{
										 								name : 'plProjectArchives.isArchives',
										 					//			id :'plProjectArchives.isArchives',
										 								xtype : 'hidden',
										 								value :0
								 								}]
								 							},{  columnWidth : .2,
																 labelWidth : 90,
																 layout : 'form',
																 items :[{
																		fieldLabel : '归档时间',	
										 								name : 'plProjectArchives.archivesTime',
										 								format :'Y-m-d',
										 								allowBlank:false,
										 								readOnly :this.readonly,
										 								xtype : 'datefield'
								 								}]
								 							}, {
																columnWidth : .5, // 该列在整行中所占的百分比
																layout : "form", // 从上往下的布局
																labelWidth : 85,
																items : [{
																	xtype : "combo",
																	triggerClass : 'x-form-search-trigger',
																	hiddenName : "plProjectArchives.handerName",
																	editable : false,
																	fieldLabel :"操作人",
																	blankText : "操作人，请正确填写!",
																	allowBlank : false,
																	readOnly : this.readonly,
																	anchor : "100%",
																	listeners : {
																		scope : this,
																		// 设置默认用户
																		'afterRender' : function(combo) {
																			this.getCmpByName('plProjectArchives.handerName')
																					.setValue(currentUserFullName);
																			this.getCmpByName('plProjectArchives.handerId')
																					.setValue(currentUserId);
																		}
																	},
																	onTriggerClick : function(cc) {
																		
																		var obj = this;
																		var appuerIdObj = obj.nextSibling();
																		var userIds = appuerIdObj.getValue();
																		if (null == obj.getValue() || "" == obj.getValue()) {
																			userIds = "";
																		}
																		new UserDialog({
																			userIds : userIds,
																			userName : obj.getValue(),
																			single : false,
																			type : 'branch',
																			title : "选择项目经理",
																			callback : function(uId, uname) {
																				obj.setValue(uname);
																				// obj.setRawValue(uname);
																				appuerIdObj.setValue(uId);
																			}
																		}).show();
																	}
																}, {
																	xtype : "hidden",
																	name : "plProjectArchives.handerId"
																}]
															}
//								 							,{  columnWidth : .55,
//																 labelWidth : 90,
//																 layout : 'form',
//																 items :[{
//																		
//										 						//			id:'archivescherkername',
//																			fieldLabel : '档案柜',	
//																			//value : '中国银行',
//																			submitValue:false,
//																			readOnly :this.readonly,
//																		 	name : 'plProjectArchives.plarchivesname',
//														                    xtype:'trigger',
//																			triggerClass :'x-form-search-trigger',
//																			emptyText : '点击选择----------------',
//																			editable : false,
//																			onTriggerClick : function(){
//																				var obj1=this.ownerCt.ownerCt.ownerCt;
//																				var selectavrchives=function(obj){
//																				 obj1.getCmpByName("plProjectArchives.plarchivesname").setValue(obj.pathname);
//																				 obj1.getCmpByName("plProjectArchives.plarchivesId").setValue(obj.id);
//																					
//																				}
//																				selectArchiveschecker(selectavrchives,companyId);
//																			},
//																			anchor : '93%'
//								 								}]}
								 								,{
								 								 columnWidth : 1,
																 labelWidth : 90,
																 layout : 'form',
																 items :[{
																		
										 								fieldLabel : '归档备注',	
										 								name : 'plProjectArchives.remark',
										 								readOnly :this.readonly,
										 								xtype : 'textarea',
										 								anchor : '96%'
								 								}]
								 							}
															
																																			]
						});
					if (this.projtoarchiveId != null && this.projtoarchiveId != 'undefined') {
                    this.loadData({
						url : __ctxPath + '/creditFlow/archives/getPlProjectArchives.do?projtoarchiveId='+ this.projtoarchiveId,
								root : 'data',
								preName : 'plProjectArchives',
								scope:this,
								success:function(resp,options){
									var obj1=this;
             						var result=Ext.decode(resp.responseText);
//             						obj1.getCmpByName('plProjectArchives.plarchivesname').setValue(result.data.checkername);
             						if(result.data.isArchives==0){
             						  obj1.getCmpByName('isArchives').setValue(false);
             						   obj1.getCmpByName('plProjectArchives.isArchives').setValue(0);
             						}else{
             						  obj1.getCmpByName('isArchives').setValue(true);
             						  obj1.getCmpByName('plProjectArchives.isArchives').setValue(1);
             						}
             						
             						
             						}
							});	
					}
			},//end of the constructor
			//初始化组件
		
			save : function() {
				$postForm({
						formPanel:this.formPanel,
						scope:this,
						url:__ctxPath + '/creditFlow/archives/savePlProjectArchives.do',
						params : {
							businessType : this.businessType,
							projectId : this.projectId
						},
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('PlProjectArchivesGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save
				});
		