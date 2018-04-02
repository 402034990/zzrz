/**
 * 佣金管理列表
 * 
 * @class commissionManage
 * @extends Ext.Panel
 */

commissionManage = Ext.extend(Ext.Panel, {
	constructor : function(config) {
		Ext.applyIf(this, config);
		this.initUIComponents();
		commissionManage.superclass.constructor.call(this, {
					id : 'commission',
					title : '佣金核算管理',
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
							}]
				});
		var person_store = this.store;
		this.myMask = new Ext.LoadMask(Ext.getBody(), {
					msg : "加载数据中······,请稍后······"
				});


		// 查询面板
		this.searchPanel = new Ext.form.FormPanel({
			height : 75,
			// labelWidth : 55,
			region : "north",
			bodyStyle : 'padding:7px 0px 7px 10px',
			border : false,
			width : '100%',
			monitorValid : true,
			layout : 'column',
			defaults : {
				layout : 'form',
				border : false,
				bodyStyle : 'padding:5px 0px 0px 20px'
			},
			items : [isShow ? {
				columnWidth : 0.2,
				labelWidth : 65,
				bodyStyle : 'padding:5px 0px 0px 0px',
				items : [{
					xtype : "combo",
					anchor : "100%",
					fieldLabel : '所属分公司',
					hiddenName : "companyId",
					displayField : 'companyName',
					valueField : 'companyId',
					triggerAction : 'all',
					store : new Ext.data.SimpleStore({
								autoLoad : true,
								url : __ctxPath
										+ '/system/getControlNameOrganization.do',
								fields : ['companyId', 'companyName']
							})
				}]
			}
					: {
						columnWidth : 0.01
					}, {
				columnWidth : isShow ? 0.15 : 0.15,
				labelWidth : 40,
				// bodyStyle : 'padding:5px 0px 0px 0px',
				items : [{
							xtype : 'textfield',
							fieldLabel : '姓名',
							name : 'name',
							anchor : '100%'
						}]
					}, {
				columnWidth : isShow ? 0.12 : 0.14,
				labelWidth : 40,
				items : [{
							xtype : 'dickeycombo',
							fieldLabel : '性别',
							hiddenName : 'sex',
							nodeKey : 'sex_key',
							anchor : '100%'
						}]
			}, {
				columnWidth : isShow ? 0.15 : 0.17,
				labelWidth : 55,
				items : [{
							xtype : "dickeycombo",
							nodeKey : 'card_type_key',
							hiddenName : "cardtype",
							fieldLabel : "证件类型",
							anchor : '100%',
							editable : true,
							listeners : {
								scope : this,
								afterrender : function(combox) {
									var st = combox.getStore();
									st.on("load", function() {
												combox.setValue(combox
														.getValue());
												combox.clearInvalid();
											})
								}
							}
						}]

			}, {
				columnWidth : isShow ? 0.2 : 0.2,
				labelWidth : 55,
				items : [{
							xtype : 'textfield',
							fieldLabel : '证件号码',
							name : 'cardnumber',
							anchor : '100%'
						}]

			}, {
				columnWidth : 0.07,
				items : [{
							id : 'searchButton',
							xtype : 'button',
							text : '查询',
							tooltip : '根据查询条件过滤',
							iconCls : 'btn-search',
							width : 60,
							formBind : true,
							scope : this,
							handler : function() {
								this.searchByCondition();
							}
						}]
			}, {

				columnWidth : 0.07,
				items : [{
							xtype : 'button',
							text : '重置',
							width : 60,
							scope : this,
							iconCls : 'btn-reset',
							handler : this.reset
						}]

			}]
		}); // 查询面板结束

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
			items : [ {
				text : '佣金核算',
				iconCls : 'btn-readdocument',
				scope : this,
				hidden : isGranted('_See_grkh') ? false : true,
				handler : function() {
					var rows = this.centerPanel.getSelectionModel()
							.getSelections();
					if (rows.length == 0) {
						Ext.ux.Toast.msg('操作信息', '请选择记录!');
						return;
					} else if (rows.length > 1) {
						Ext.ux.Toast.msg('操作信息', '只能选择一条记录!');
						return;
					} else {
						//佣金核算
						new	commissionCalculation({
//							record : "123"
						}).show();
					}

				}
			}
			]
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
							},{
								header : "银行专员",
								width : 160,
								sortable : true,
								hidden : RoleType == "control" ? false : true,
								dataIndex : '???'
							}, {
								header : "客户经理",
								width : 100,
								sortable : true,
								dataIndex : ''
							},{
								header : "客户编号",
								width : 100,
								sortable : true,
								dataIndex : 'personNumber'
							}, {
								header : "客户来源",
								width : 50,
								sortable : true,
								dataIndex : ''
							},{
								header : "姓名",
								width : 100,
								sortable : true,
								dataIndex : ''
							}, {
								header : "借款金额",
								width : 120,
								sortable : true,
								dataIndex : ''
							}, {
								header : "借款期限",
								width : 100,
								sortable : true,
								dataIndex : ''
							}, {
								header : "申请产品",
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
	// 添加p2p账户
	addP2pUser : function(obj, e) {
		var selections = this.centerPanel.getSelectionModel().getSelections();
		var grid = this.centerPanel;
		var bStr = obj.ptype;
		var len = selections.length;
		if (len > 1) {
			Ext.ux.Toast.msg('状态', '只能选择一条记录');
			return;
		} else if (0 == len) {
			Ext.ux.Toast.msg('状态', '请选择一条记录');
			return;
		}
		var personId = selections[0].data.id;
		var cellphone = selections[0].data.cellphone;
		var selfemail = selections[0].data.selfemail;
		var cardnumber = selections[0].data.cardnumber;
		new BpCustRelationForm({
			type : "p_loan",
			pType : '1',
			bStr : bStr,
			userId : personId,
			cellphone:cellphone,
			selfemail:selfemail,
			cardnumber:cardnumber
		}).show();
	},
	addBlackList : function() {
		var selections = this.centerPanel.getSelectionModel().getSelections();
		var grid = this.centerPanel;
		var len = selections.length;
		if (len > 1) {
			Ext.ux.Toast.msg('状态', '只能选择一条记录');
			return;
		} else if (0 == len) {
			Ext.ux.Toast.msg('状态', '请选择一条记录');
			return;
		}
		var personId = selections[0].data.id;
		var fp = new Ext.FormPanel({
					frame : true,
					labelAlign : 'right',
					bodyStyle : 'padding:5px 5px 5px 5px',
					labelWidth : 60,
					border : false,
					url : __ctxPath
							+ '/creditFlow/customer/person/addBlackPerson.do?id='
							+ personId,
					items : [{
								xtype : 'textarea',
								fieldLabel : '原因说明',
								allowBlank : false,
								name : 'blackReason',
								anchor : '100%'
							}]
				})
		var window = new Ext.Window({
					title : '加入黑名单',
					width : 400,
					height : 150,
					modal : true,
					items : fp,
					buttonAlign : 'center',
					buttons : [{
								text : '提交',
								iconCls : 'btn-save',
								handler : function() {
									fp.getForm().submit({
												waitMsg : '正在提交...',
												method : 'post',
												success : function(form, action) {
													Ext.ux.Toast.msg('状态',
															'添加成功');
													window.close();
													grid.getStore().reload()
												},
												failure : function(form, action) {
													Ext.ux.Toast.msg('状态',
															'添加失败');
												}
											})
								}
							}, {
								text : '取消',
								iconCls : 'btn-cancel',
								handler : function() {
									window.destroy()
								}
							}]
				})
		window.show()
	}
});