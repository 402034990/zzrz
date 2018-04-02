editbusinessPlanCustomization = Ext.extend(Ext.Window, {
	operationType:null,
	userId:null,
	userType:null,
	isAllReadOnly:false,
	isNameReadOnly:false,
	isProductReadOnly:false,
	productId:null,
	isHiddernShop:false,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.type) != "undefined") {
			 
			this.type = _cfg.type;
		}
		
		Ext.applyIf(this, _cfg);
		this.initComponents();
		editbusinessPlanCustomization.superclass.constructor.call(this, {
			id : 'editbusinessPlanCustomization'+this.operationType,
			iconCls : 'btn-tree-team30',
			layout : 'form',
			items : this.formPanel,
			modal : true,
			frame:true,
			autoScroll:true,
			autoHeight:true,
			width : 530,
			maximizable : true,
			frame:true,
			resizable:false,
			title : '增加业务办理'
		});
	},
	initComponents : function() {
		
		this.formPanel = new Ext.form.FormPanel({
			id : "createNewSLFunctionForm",
			url : 'resource!save.action',
			monitorValid : true,
			autoWidth : true,
			autoScroll : true,
			labelAlign : 'right',
			buttonAlign : 'center',
			frame : true,
			defaults : {
				anchor : '97%',
				autoHeight : true,
				border : true
			},
			items : [{
				layout : 'column',
				items : [{
					columnWidth : .5,
					layout : 'form',
					labelWidth : 85,
					defaults : {
						anchor : anchor
					},
					items : [{
						xtype : "combo",
						triggerClass : 'x-form-search-trigger',
						hiddenName : "slSmallloanProject.appUserName",
						editable : false,
						fieldLabel : "产品选择",
						allowBlank : false,
						listeners : {
							scope : this,
							'afterRender' : function(combo) {
							}
						},
						onTriggerClick : function(cc) {
							var obj = this;
							var appuerIdObj = obj.nextSibling();
							var userIds = appuerIdObj.getValue();
							if (null == obj.getValue() || "" == obj.getValue()) {
								userIds = "";
							}
							new productChooseWindow({}).show();

						}
					}, {
						xtype : 'textfield',
						fieldLabel : '贷款机构',
						name : 'resource.orderList',
						allowBlank : false,
						blankText : '必填信息'
					}, {
						xtype : 'hidden',
						id : 'id_isSystem',
						name : 'resource.isSystem',
						value : false
					}]
				}, {
					columnWidth : .5,
					layout : 'form',
					labelWidth : 85,
					defaults : {
						anchor : anchor
					},
					items : [{
								xtype : 'textfield',
								fieldLabel : '机构客户经理',
								name : 'resource.resourceType',
								allowBlank : false,
								blankText : '必填信息'
							}, {
								xtype : 'textfield',
								fieldLabel : '借款金额',
								name : 'resource.description'
							}]
				}]
			}],
			buttons : [{
				id : 'submit',
				text : '保存',
				iconCls : 'submitIcon',
				formBind : true,
				handler : function() {
					fPanel_add.getForm().submit({
								method : 'POST',
								waitTitle : '连接',
								waitMsg : '消息发送中...',
								success : function(form, action) {
									Ext.Msg.alert('状态', '添加成功!', function(btn,
													text) {
												Ext.getCmp('addWin').close();
												if (node == null) {
													refreshNode(tree_Root);
												} else {
													refreshNode(node);
												}
											});

								},
								failure : function(form, action) {
									if (action.response.status == 0) {
										Ext.Msg.alert('状态', '连接失败，请保证服务已开启');
									} else if (action.response.status == -1) {
										Ext.Msg.alert('状态', '连接超时，请重试!');
									} else {
										Ext.Msg.alert('状态', '添加失败!');
									}
								}
							});
				}
			}, {
				text : '取消',
				iconCls : 'cancelIcon',
				handler : function() {
					Ext.getCmp('addWin').close();
				}
			}]
		});
	
		
		
	},
	/**
	 * 启动项目
	 */
	save : function(formPanel, window) {
	
	},
	reset : function(formPanel) {
		formPanel.getForm().reset();
	},
	cancel : function(win) {
		win.close()
	}
})