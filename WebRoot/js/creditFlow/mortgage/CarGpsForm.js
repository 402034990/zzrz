/**
 * @author 
 * @createtime 
 * @class CsGpsForm
 * @extends Ext.Window
 * @company 智维软件
 */
CsGpsForm = Ext.extend(Ext.Window, {
	//构造函数
	isEite:true,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		if (typeof(_cfg.isEite) != "undefined") {
			this.isEite = _cfg.isEite;
		}
		//必须先初始化组件
		this.initUIComponents();
		CsGpsForm.superclass.constructor.call(this, {
					id : 'CsGpsForm',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 280,
					width : 700,
					maximizable : true,
					title : '办理信息详情',
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								hidden : this.isAllReadOnly?true:false,
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
			        bodyStyle : 'padding:10px 10px 10px 0',
					layout : 'form',
					autoScroll : true,
					frame : true,
					anchor : '100%',
					labelAlign : 'right',
					defaults : {
						anchor : '96%',
						labelWidth : 80
					},
					items : [{
								columnWidth : 1,
								layout : 'form',
								labelWidth : 80,
								labelAlign : 'right',
								border : false,
								items : [
										{
											layout : "column",
											border : false,
											scope : this,
											items:[{
													name : 'csGps.id',
													xtype : 'hidden',
													value:this.id
												},{
													name : 'csGps.projectId',
													xtype : 'hidden',
													value:this.projectId
												},{
													name : 'csGps.mortgageId',
													xtype : 'hidden',
													value:this.mortgageId
												},{
													columnWidth :.5,
													layout : 'form',
													labelWidth : 90,
													labelAlign : 'right',
													border : false,
													items : [{
															xtype : 'combo',
															fieldLabel : 'GPS是否安装',
															readOnly : this.isAllReadOnly,
															editable : false,
															mode : 'local',
															displayField : 'name',
															allowBlank : false,
															valueField : 'value',
															width : 70,
															store : new Ext.data.SimpleStore({
																		fields : ["name",
																				"value"],
																		data : [["是", "0"],
																				["否", "1"]]
																	}),
															triggerAction : "all",
															anchor : "100%",
															hiddenName : 'csGps.isgps'
														}]
												},{
													columnWidth :.5,
													layout : 'form',
													labelWidth : 80,
													labelAlign : 'right',
													border : false,
													items : [{
													      	xtype : "textfield",
													      	anchor : '100%',
													      	fieldLabel:'办理人',
													      	editable : false,
													      	allowBlank : false,
															name : "csGps.handlePerson",
															readOnly : this.isAllReadOnly,
														    anchor : "100%"
													   }]
												},{
													columnWidth :.5,
													layout : 'form',
													labelWidth : 90,
													labelAlign : 'right',
													border : false,
													items : [{
													      	xtype : "textfield",
													      	anchor : '100%',
													      	fieldLabel:'GPS型号',
													      	editable : false,
													      	allowBlank : false,
															name : "csGps.gpsModel",
															readOnly : this.isAllReadOnly,
														    anchor : "100%"
													   }]
												},{
													columnWidth :.5,
													layout : 'form',
													labelWidth : 80,
													labelAlign : 'right',
													border : false,
													items : [{
													      	xtype : "textfield",
													      	anchor : '100%',
													      	fieldLabel:'IMEI',
													      	allowBlank : false,
													      	editable : false,
															name : "csGps.imei",
															readOnly : this.isAllReadOnly,
														    anchor : "100%"
													   }]
												},{
													columnWidth :.5,
													layout : 'form',
													labelWidth : 90,
													labelAlign : 'right',
													border : false,
													items : [{
															fieldLabel : '办理时间',
															readOnly : this.isAllReadOnly,
															allowBlank : false,
															editable : false,
															format:'Y-m-d',
															name : 'csGps.handleDate',
															anchor : "100%",
															xtype : 'datefield'
													}]
												},{
													columnWidth :.5,
													layout : 'form',
													labelWidth : 90,
													labelAlign : 'right',
													hidden:this.isEite,
													border : false,
													items : [{
															fieldLabel : 'GPS状态',
															readOnly : this.isAllReadOnly,
//															allowBlank : false,
															editable : false,
															name : 'csGps.gpsState',
															anchor : "100%",
															xtype : 'textfield'
													}]
												},{
				                                   columnWidth : 0.99, // 该列在整行中所占的百分比
				                                   layout : "form", // 从上往下的布局
				                                   labelWidth : 90,
				                                   border : false,
				                                   items : [{
							                               fieldLabel : "备注",
								                           xtype : "textarea",
								                           name : 'csGps.remark',
								                           readOnly : this.isAllReadOnly,
								                           anchor : "100%",
								                           allowBlank : true
							                             }]
			                                     }
											]
										}
									]
									
								}]
				});
		//加载表单对应的数据	
		if (this.id != null && this.id != 'undefined') {
			this.formPanel.loadData({
								url : __ctxPath
										+ '/creditFlow/gps/getCsGps.do?id='
										+ this.id,
								root : 'data',
								preName : 'csGps'
							});
		}

	},

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
		var gridPanel=this.gridPanel;
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath + '/creditFlow/gps/saveCsGps.do',
					callback : function(fp, action) {
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}//end of save

});