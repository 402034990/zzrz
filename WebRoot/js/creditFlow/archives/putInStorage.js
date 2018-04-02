/**
 * @author 
 * @createtime 
 * @class OurProcreditMaterialsForm
 * @extends Ext.Window
 * @description OurProcreditMaterials表单
 * @company 智维软件
 */
putInStorage = Ext.extend(Ext.Window, {
	operateGrid:null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		if(_cfg.operateGrid)
		this.operateGrid=_cfg.operateGrid;
		if(_cfg.businessTypes!=null){
			this.businessTypes=_cfg.businessTypes;
		}
		if(_cfg.projectIds!=null){
			this.projectIds=_cfg.projectIds;
		}
		this.initUIComponents();
		putInStorage.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height:200,
					width : 500,
					border : false,
					maximizable : true,
					title : "归档办理",
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : '重置',
								iconCls : 'btn-reset',
								scope : this,
								handler : this.reset
							}, {
								text : '取消',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}]
				});
	},//end of the constructor
	//初始化组件
	initUIComponents : function() {
				this.formPanel = new Ext.FormPanel({
							layout : 'column',
							border : false,
							scope : this,
							bodyStyle : 'padding:10px',
							//defaultType : 'column',
							items : [{
									    columnWidth : 0.5,
										layout : 'form',
										border : false,
										labelWidth : 80,
										labelAlign : 'right',
										items : [ {
													xtype : 'combo',
													hiddenName : 'plProjectArchives.isIntStroage',
													anchor : '100%',
													fieldLabel:'是否归档',
//													fieldLabel:'是否入库',
													readOnly : this.isRead,
													mode : 'local',
													forceSelection : true, 
													displayField : 'typeValue',
													valueField : 'typeId',
													editable : false,
													triggerAction : 'all',
													value : personData == null
															? null
															: personData.careerType,
													store : new Ext.data.SimpleStore({
														data : [['是',1],['否',0]],
														fields:['typeValue','typeId']
													})
									}] 
									},{
									    columnWidth : 0.5,
										layout : 'form',
										border : false,
										labelWidth : 80,
										labelAlign : 'right',
										items : [ {
//												     fieldLabel : '入库日期',
										     fieldLabel : '归档日期',
										     labelSeparator : '',
										     allowBlank : false,
												name : 'plProjectArchives.inStorageDate',
												xtype : 'datefield',
												format : 'Y-m-d H:i:s',
												value : new Date(),
												anchor : '100%'
												
											}] 
									},
									{
//									    columnWidth : 0.51,
//										layout : 'form',
//										border : false,
//										labelWidth : 80,
//										labelAlign : 'right',
//										items : [ {
////										`	 fieldLabel : '入库日期',
//										     fieldLabel : '操作人',
//										     labelSeparator : '',
//										     allowBlank : false,
//												name : 'plProjectArchives.inStorageDate',
//												xtype : 'datefield',
//												format : 'Y-m-d H:i:s',
//												value : new Date(),
//												anchor : '100%'
//											}] 
//											
										labelAlign : 'right',
										border:false,
										columnWidth : .50, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 80,
										items : [{
											xtype : "combo",
											triggerClass : 'x-form-search-trigger',
											hiddenName : "plProjectArchives.handerName",
											editable : false,
											fieldLabel :  "操作人" ,
											blankText : "操作人不能为空，请正确填写!",
											allowBlank : false,
//											readOnly : this.isAllReadOnly,
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
									}, {
		 								 columnWidth : 1,
										 labelWidth : 80,
										 border : false,
										 labelAlign : 'right',
										 layout : 'form',
										 items :[{
												
				 								fieldLabel : '归档备注',	
				 								name : 'plProjectArchives.inStorageRemark',
				 								readOnly :this.readonly,
				 								xtype : 'textarea',
				 								anchor : '100%'
		 								}]
		 							} ,
//		 							{
//		 							
//		 								 columnWidth : 1,
//										 labelWidth : 80,
//										 border : false,
//										 labelAlign : 'right',
//										 layout : 'form',
//										 items :[{
//												
//				 								fieldLabel : '入库备注',	
//				 								name : 'plProjectArchives.inStorageRemark',
//				 								readOnly :this.readonly,
//				 								xtype : 'textarea',
//				 								anchor : '100%'
//		 								}]
//		 							
//		 							
//		 							},
									  {
										name : 'projectIds',
										xtype : 'hidden',
										value : this.projectIds == null ? '' : this.projectIds
									}, {
										name : 'businessTypes',
										xtype : 'hidden',
										value : this.businessTypes == null ? '' : this.businessTypes
									}
								]
						});

	},//end of the initcomponents

	/**
	 * 重置
	 * @param {} formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * @param {} window
	 */
	cancel : function() {
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
					formPanel : this.formPanel,
					scope : this,	
				    url : __ctxPath+'/creditFlow/archives/putInStoragePlProjectArchives.do',
					callback : function(fp, action) {
						var obj=action.result;
							var scope=this.scope?this.scope:this;
							var tabs = Ext.getCmp('centerTabPanel');
							var gridPanel = Ext.getCmp('PlProjectArchivesGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
							Ext.ux.Toast.msg("操作信息", obj.msg);
					}
				});
	}//end of save

});