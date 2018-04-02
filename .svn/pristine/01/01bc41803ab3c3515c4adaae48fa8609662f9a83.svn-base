/**
 * 客户跟进管理
 * @class CustomerFollowManagement
 * @extends Ext.Panel
 */
CustomerFollowManagement = Ext.extend(Ext.Panel, {
	constructor : function(config) {
		Ext.applyIf(this, config);
		this.initUIComponents();
		CustomerFollowManagement.superclass.constructor.call(this, {
					id : 'CustomerFollowManagement',
					title : '客户跟进管理',
					height : 450,
					autoScroll : true,
					layout : 'border',
					iconCls : 'btn-tree-team23',
					items : [this.searchPanel, this.centerPanel]
				});
	},
	initUIComponents : function() {
		var isShow = false;

		if (RoleType == "control") {
			isShow = true;

		}
		this.pageSize = 25;

		this.store = new Ext.data.JsonStore({
					url : __ctxPath
							+ '/creditFlow/customer/person/perQueryListPerson.do?isAll='
							+ isGranted('_detail_sygrkh'),
					totalProperty : 'totalProperty',
					root : 'topics',
					remoteSort : true,
					fields : [{
								name : 'id'
							}, {
								name : 'name'
							}, {
								name : 'sexvalue'
							}, {
								name : 'jobvalue'
							}, {
								name : 'cardtypevalue'
							}, {
								name : 'cardnumber'
							}, {
								name : 'cellphone'
							}, {
								name : 'birthday'
							}, {
								name : 'nationalityvalue'
							}, {
								name : 'peopletypevalue'
							}, {
								name : 'dgreevalue'
							}, {
								name : 'techpersonnel'
							}, {
								name : 'age'
							}, {
								name : 'marryvalue'
							}, {
								name : 'telphone'
							}, {
								name : 'englishname'
							}, {
								name : 'companyName'
							}, {
								name : 'shopId'
							}, {
								name : 'shopName'
							},{
								name:'selfemail'
							},
							  {
								name:'personNumber'
							  }
							]
				});
		var person_store = this.store;
		this.myMask = new Ext.LoadMask(Ext.getBody(), {
					msg : "加载数据中······,请稍后······"
				});

		var importButton = new Ext.Button({
			text : '导入个人数据',
			iconCls : 'addIcon',
			tooltip : '导入个人原始记录',
			scope : this,
			disabled : false,
			handler : function() {
				new Ext.Window({
					id : 'importEnterpriseWin',
					title : '导入数据',
					layout : 'fit',
					width : (screen.width - 180) * 0.6 - 150,
					height : 130,
					closable : true,
					resizable : true,
					plain : false,
					bodyBorder : false,
					border : false,
					modal : true,
					constrainHeader : true,
					bodyStyle : 'overflowX:hidden',
					buttonAlign : 'right',
					items : [new Ext.form.FormPanel({
						id : 'importEnterpriseFrom',
						monitorValid : true,
						labelAlign : 'right',
						url : __ctxPath
								+ '/creditFlow/customer/person/batchImportPBatchImportDatabase.do',
						buttonAlign : 'center',
						enctype : 'multipart/form-data',
						fileUpload : true,
						layout : 'column',
						frame : true,
						items : [{
									columnWidth : 1,
									layout : 'form',
									labelWidth : 90,
									defaults : {
										anchor : '95%'
									},
									items : [{}, {
												xtype : 'textfield',
												fieldLabel : '请选择文件',
												allowBlank : false,
												blankText : '文件不能为空',
												inputType : 'file',
												id : 'fileBatch',
												name : 'fileBatch'
											}]
								}],
						buttons : [{
							text : '导入',
							iconCls : 'uploadIcon',
							formBind : true,
							handler : function() {
								Ext.getCmp('importEnterpriseFrom').getForm()
										.submit({
											method : 'POST',
											waitTitle : '连接',
											waitMsg : '消息发送中...',
											success : function(form, action) {
												Ext.ux.Toast.msg('状态', '导入成功!');
												Ext
														.getCmp('importEnterpriseWin')
														.destroy();
												person_store.reload();

											},
											failure : function(form, action) {
												Ext.ux.Toast.msg('状态', '导入失败!');
											}
										});
							}
						}]
					})]
				}).show();
			}
		});
		// 查询面板
		 var anchor = '100%';
				// 初始化搜索条件Panel
				this.searchPanel = new HT.SearchPanel({
					layout : 'form',
					border : false,
					region : 'north',
					height : 43,
					anchor : '70%',
					keys : [{
						key : Ext.EventObject.ENTER,
						fn : this.search,
						scope : this
					}, {
						key : Ext.EventObject.ESC,
						fn : this.reset,
						scope : this
					}],
					items : [{
						border : false,
						layout : 'column',
						style : 'padding-left:5px;padding-right:5px;padding-top:10px;',
						layoutConfig : {
							align : 'middle',
							padding : '5px'
						},
						defaults : {
							xtype : 'label',
							anchor : anchor
						},
						items : [{
							columnWidth : .3,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								fieldLabel : '客户标签',
								name : '',
								xtype : 'textfield'
							}]
						},{
							columnWidth : .3,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								fieldLabel : '创建时间',
								name : '',
								editable : false,
								xtype : 'datefield'
							}]
						},{
							columnWidth : .3,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								xtype : 'datefield',
								editable : false,
								name:'',
								fieldLabel : '至'
							}]
						},{
							columnWidth : .09,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 5,
							defaults : {
								xtype : 'button'
							},
							// style : 'padding-left:60px;',
							items : [{
								text : '查询',
								fieldLabel : ' ',
								labelSeparator : "",
								scope : this,
								iconCls : 'btn-search',
								handler : this.search
							}]
						},{
							columnWidth : .3,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								fieldLabel : '联系电话',
								name : '',
								xtype : 'textfield'
							}]
						},{
							columnWidth : .3,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								fieldLabel : '下次跟进时间',
								name : '',
								editable : false,
								xtype : 'datefield'
							}]
						},{
							columnWidth : .3,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								xtype : 'datefield',
								editable : false,
								name:'',
								fieldLabel : '至'
							}]
						},{
							columnWidth : .09,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 5,
							defaults : {
								xtype : 'button'
							},
							// style : 'padding-left:60px;',
							items : [{
								text : '重置',
								fieldLabel : ' ',
								labelSeparator : "",
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}]
						},{
							columnWidth : .3,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								fieldLabel : '跟进状态',
								xtype : 'combo',
								mode : 'local',
								valueField : 'value',
								editable : false,
								displayField : 'value',
								store : new Ext.data.SimpleStore({
									fields : ["value"],
									data : [["待跟进"], ["已跟进"],["未跟进"]]
								}),
								triggerAction : "all",
								name : ''
							}]
						}]
					}]
				});
		// 查询面板结束

		// this.store.setDefaultSort('name');
		// 加载数据
		this.store.load({
					scope : this,
					params : {
						start : 0,
						limit : this.pageSize,
						isAll : isGranted('_detail_sygrkh')
					}
				});
		var personStore = this.store;
		var tbar = new Ext.Toolbar({
							items : [{
										iconCls : 'btn-people',
										text : '跟进',
										xtype : 'button',
										scope : this,
										handler : this.followRs
									},{
										iconCls : 'btn-people',
										text : '设置下次跟进时间',
										xtype : 'button',
										scope : this,
										handler : this.nextFollowTimeRs
									}]
						});

		this.centerPanel = new HT.GridPanel({
					region : 'center',
					// title:'个人客户信息',
					tbar : tbar,
					clicksToEdit : 1,
					store : this.store,
					loadMask : this.myMask,
					columns : [
					           {
								header : "ID",
								width : 160,
								sortable : true,
								hidden : true,
								dataIndex : 'id'
							}, {
								header : "客户名称",
								width : 100,
								sortable : true,
								dataIndex : ''
							},{
								header : "客户标签",
								width : 100,
								sortable : true,
								dataIndex : ''
							},{
								header : "创建人",
								width : 100,
								sortable : true,
								dataIndex : ''
							}, {
								header : "当前金融顾问",
								width : 120,
								sortable : true,
								dataIndex : ''
							}, {
								header : "操作人",
								width : 50,
								sortable : true,
								dataIndex : 'sexvalue'
							}, {
								header : "最新变动时间",
								width : 100,
								sortable : true,
								dataIndex : ''
							}],
					defaults : {
						sortable : true,
						menuDisabled : false,
						width : 100
					},
					height : 450,
					viewConfig : {
						forceFit : true,
						autoFill : true
					},
					listeners : {
						afteredit : function(e) {
						}
					}
				});
	},// end of initUIComponents

	// 查询
	searchByCondition : function() {
		this.store.baseParams.name = this.searchPanel.getForm()
				.findField('name').getValue();
		this.store.baseParams.sex = this.searchPanel.getForm().findField('sex')
				.getValue();
		// 修改查询按钮 添加了证件类型 证件号码 隐藏了职务 客户级别 电话号码
		this.store.baseParams.cardtype = this.searchPanel.getForm()
				.findField('cardtype').getValue();
		this.store.baseParams.cardnumber = this.searchPanel.getForm()
				.findField('cardnumber').getValue();
		if (null != this.searchPanel.getForm().findField('companyId')) {
			this.store.baseParams.companyId = this.searchPanel.getForm()
					.findField('companyId').getValue();
		}
		this.store.load({
					scope : this,
					params : {
						start : 0,
						limit : this.pageSize
					}
				});
	},
	reset : function() {
		this.searchPanel.getForm().reset();
		this.store.baseParams.name = this.searchPanel.getForm()
				.findField('name').getValue();
		this.store.baseParams.sex = this.searchPanel.getForm().findField('sex')
				.getValue();
		// 修改查询按钮 添加了证件类型 证件号码 隐藏了职务 客户级别 电话号码
		this.store.baseParams.cardtype = this.searchPanel.getForm()
				.findField('cardtype').getValue();
		this.store.baseParams.cardnumber = this.searchPanel.getForm()
				.findField('cardnumber').getValue();
		if (null != this.searchPanel.getForm().findField('companyId')) {
			this.store.baseParams.companyId = this.searchPanel.getForm()
					.findField('companyId').getValue();
		}
		this.store.load({
					scope : this,
					params : {
						start : 0,
						limit : this.pageSize
					}
				});
	},
	/**客户共享*/
	CustomerShare:function(){
		var idCustomerTypeStr = "";
		var belongedIdStr = "";
		var belongerStr = "";
		var selRs = this.centerPanel.getSelectionModel().getSelections();
		for (var i = 0; i < selRs.length; i++) {
			idCustomerTypeStr += selRs[i].data.idStr + ";" + selRs[i].data.customerType + ",";
			belongedIdStr += selRs[i].data.belongedId + ",";
			belongerStr += selRs[i].data.belonger + ",";
		}
		
		idCustomerTypeStr = idCustomerTypeStr.substring(0,idCustomerTypeStr.length - 1);
		belongedIdStr = belongedIdStr.substring(0, belongedIdStr.length - 1);
		belongerStr = belongerStr.substring(0, belongerStr.length - 1);
		new CustomerShare({
			single : false,
			title : "客户共享",
			userIds : selRs.length > 1?"":belongedIdStr,
			userName : selRs.length > 1?"":belongerStr,
			callback : function(uId, uname) {
				Ext.Msg.confirm('信息确认', '确认为选中的'+selRs.length+'位客户授权共享人吗？', function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
							url : __ctxPath
									+ "/customer/grantBelongerCustomer.do",
							method : "post",
							params : {
								idCustomerTypeStr : idCustomerTypeStr,
								userIdStr : uId
							},
							scope : this,
							success : function(response) {
								grid.getStore().reload();
								Ext.ux.Toast.msg('操作信息', '客户共享成功！');
							},
							failure : function() {
								Ext.ux.Toast.msg('操作信息', '客户共享失败！');
							}
						});
					}
				});
			}
		}).show();
	},
	//跟进
	followRs:function(){
		new CustomerFollowView().show();
	},
	//设置下次跟进时间
	nextFollowTimeRs:function(){
		new NextFollowTime().show();
	}
});