/**
 * @author
 * @class SlFundQlideView
 * @extends Ext.Panel
 * @description [SlFundQlide]管理
 * @company 智维软件
 * @createtime:
 */
SlFundQlideView2 = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		SlFundQlideView2.superclass.constructor.call(this, {
			id : 'SlFundQlideView2',
			title : '银行流水录入',
			region : 'center',
			layout : 'border',
			iconCls : 'btn-team2',
			items : [this.searchPanel, this.gridPanel/*
														 * {border:false,region :
														 * 'center',autoScroll:true,items:this.gridPanel}
														 */]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel

		var isShow = false;
		if (RoleType == "control") {
			isShow = true;
		}
		this.searchPanel = new HT.SearchPanel({
			layout : 'column',
			region : 'north',
			height : 40,
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
			layoutConfig : {
				align : 'middle'
			},
			items : [

			isShow ? {
				columnWidth : 0.18,
				labelWidth : 80,
				layout : 'form',
				border : false,
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
				}, {
					name : 'Q_transactionType_D_LE',
					xtype : 'textfield',
					fieldLabel : '用途摘要',
					anchor : '100%'

				}]
			}
					: {
						columnWidth : 0.001,
						border : false
					}, {
				columnWidth : 0.18,
				layout : 'form',
				border : false,
				labelWidth : 60,
				labelAlign : 'right',

				items : [{
							fieldLabel : '我方账号',
							// submitValue:false,
							name : 'Q_myAccount_S_EQ',
							id : 'Q_dialAccounts_S_EQ',
							flex : 1,
							xtype : 'trigger',
							triggerClass : 'x-form-search-trigger',
							onTriggerClick : function() {
								selectAccountlForm(selectAccountkLinkMan);
							},
							anchor : '98%'
						}, {
							xtype : 'combo',
							mode : 'local',
							displayField : 'name',
							valueField : 'id',
							editable : false,
							store : new Ext.data.SimpleStore({
										fields : ["name", "id"],
										data : [["支出", "0"], ["收入", "1"]]

									}),
							triggerAction : "all",
							hiddenName : "Q_fundType_SN_EQ",
							fieldLabel : '金额方向',
							name : 'Q_fundType_SN_EQ',
							anchor : '98%'

						}]

			}, {
				columnWidth : 0.18,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
				items : [{
							name : 'Q_factDate_D_GE',
							labelSeparator : '',
							xtype : 'datefield',
							format : 'Y-m-d',
							fieldLabel : '到账日期：从',
							anchor : '99%'
						}, {
							name : 'Q_dialMoney_BD_GE',
							labelSeparator : '',
							xtype : 'textfield',
							width : 97,
							fieldLabel : '交易金额：从',
							anchor : '98%'

						}]

			}, {
				columnWidth : 0.13,
				layout : 'form',
				border : false,
				labelWidth : 10,
				labelAlign : 'right',
				items : [{
							name : 'Q_factDate_D_LE',
							labelSeparator : '',
							xtype : 'datefield',
							format : 'Y-m-d',
							fieldLabel : '到',
							anchor : '88%'
						}, {
							name : 'Q_dialMoney_BD_LE',
							labelSeparator : '',
							xtype : 'textfield',
							width : 97,
							fieldLabel : '到',
							anchor : '88%'

						}]

			}, {
				columnWidth : 0.18,
				layout : 'form',
				border : false,
				labelWidth : 85,
				labelAlign : 'right',
				items : [

				{
					labelWidth : 85,
					fieldLabel : '流水状态',
					name : 'Q_notMoney_BD_LE',
					width : 100,
					flex : 1,
					xtype : 'combo',
					mode : 'local',
					displayField : 'name',
					valueField : 'id',
					store : new Ext.data.SimpleStore({
								fields : ["name", "id"],
								data : [["不限", ""], ["已对清流水", "0"],
										["未对清流水", "1"]]
							}),
					triggerAction : "all",
					hiddenName : "Q_notMoney_BD_LE",
					anchor : '96%',
					value : 1
				}, {
					labelWidth : 85,
					fieldLabel : '是否项目相关',
					name : 'Q_isProject_BD_LE',
					width : 100,
					flex : 1,
					xtype : 'combo',
					mode : 'local',
					displayField : 'name',
					valueField : 'id',
					store : new Ext.data.SimpleStore({
								fields : ["name", "id"],
								data : [["不限", ""], ["是", "是"], ["否", "否"]]
							}),
					triggerAction : "all",
					hiddenName : "Q_isProject_BD_LE",
					anchor : '96%'
				}]
			}, isShow ? {
				columnWidth : 0.001,
				border : false
			} : {
				columnWidth : 0.18,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
				items : [{
							name : 'Q_transactionType_D_LE',
							xtype : 'textfield',
							fieldLabel : '用途摘要',
							anchor : '88%'

						}]
			}, {
				columnWidth : .08,
				xtype : 'container',
				layout : 'form',
				defaults : {
					xtype : 'button'
				},
				style : 'padding-left:10px;',
				items : [{
							text : '查询',
							scope : this,
							iconCls : 'btn-search',
							handler : this.search
						}, {
							style : 'padding-top:3px;',
							text : '重置',
							scope : this,
							iconCls : 'btn-reset',
							handler : this.reset
						}]
			}

			]
				// ,
				// buttons:[
				// {
				// text:'查询',
				// scope:this,
				// iconCls:'btn-search',
				// handler:this.search
				// },{
				// text:'重置',
				// scope:this,
				// iconCls:'btn-reset',
				// handler:this.reset
				// }
				// ]
		});// end of searchPanel

		this.topbar = new Ext.Toolbar({
					items : [{
								iconCls : 'btn-add',
								text : '添加己方账户资金互转记录',
								xtype : 'button',
								scope : this,
								hidden : isGranted('_creatednls_q')
										? false
										: true,
								handler : this.saveInternal
							}, new Ext.Toolbar.Separator({
										hidden : isGranted('_creatednls_q')
												? false
												: true
									}), {
								iconCls : 'btn-add',
								text : '添加业务往来资金记录',
								xtype : 'button',
								scope : this,
								hidden : isGranted('_createdwls_q')
										? false
										: true,
								handler : this.createRs
							}, new Ext.Toolbar.Separator({
										hidden : isGranted('_createdwls_q')
												? false
												: true
									}), {
								iconCls : 'btn-add',
								text : '批量添加业务往来资金记录',
								xtype : 'button',
								scope : this,
								hidden : isGranted('_createalldwls_q')
										? false
										: true,
								handler : this.savealot
							}, new Ext.Toolbar.Separator({
										hidden : isGranted('_createalldwls_q')
												? false
												: true
									}), {
								iconCls : 'btn-readdocument',
								text : '查看',
								xtype : 'button',
								scope : this,
								hidden : isGranted('_seels_q') ? false : true,
								handler : this.seeRs
							}, new Ext.Toolbar.Separator({
										hidden : isGranted('_seels_q')
												? false
												: true
									}), {
								iconCls : 'btn-edit',
								text : '编辑',
								xtype : 'button',
								scope : this,
								hidden : isGranted('_editls_q') ? false : true,
								handler : this.editRs
							}, new Ext.Toolbar.Separator({
										hidden : isGranted('_editls_q')
												? false
												: true
									}), {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								scope : this,
								hidden : isGranted('_removels_q')
										? false
										: true,
								handler : this.removeSelRs
								/*
								 * handler : function(){
								 *  }
								 */
							}, new Ext.Toolbar.Separator({
										hidden : isGranted('_removels_q')
												? false
												: true
									}), {
								iconCls : 'sldownIcon',
								text : '下载流水模板',
								xtype : 'button',
								scope : this,
								hidden : isGranted('_loadlsmb_q')
										? false
										: true,
								handler : this.load
							}, new Ext.Toolbar.Separator({
										hidden : (isGranted('_loadlsmb_q')
												? false
												: true)
												|| (isGranted('_uploadzjls_q')
														? false
														: true)
									}), {
								iconCls : 'slupIcon',
								text : '上传资金流水',
								xtype : 'button',
								scope : this,
								hidden : isGranted('_uploadzjls_q')
										? false
										: true,
								handler : this.upload
							}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : false,
			autoScroll : true,
			id : 'SlFundQlideGrid',
			viewConfig : {
				forceFit : false
			},
			url : __ctxPath + "/creditFlow/finance/list1SlFundQlide.do",
			fields : [{
						name : 'fundQlideId',
						type : 'int'
					}, 'glideNum', 'myAccount', 'dialMoney', 'afterMoney',
					'notMoney', 'factDate', 'opAccount', 'fundType',
					'currency', 'transactionType', 'bankName', 'openName',
					'incomeMoney', 'payMoney', 'opOpenName', 'opBankName',
					'isProject', 'bankTransactionTypeName', 'orgName'

			],
			columns : [{
						header : 'fundQlideId',
						dataIndex : 'fundQlideId',
						hidden : true
					}, {
						header : "所属分公司",
						sortable : true,
						hidden : RoleType == "control" ? false : true,
						dataIndex : 'orgName'
					}, {
						header : '我方开户银行',
						dataIndex : 'bankName',
						width : 120

					}, {
						header : '我方户名',
						dataIndex : 'openName',
						width : 120

					}

					, {
						header : '我方账号',
						dataIndex : 'myAccount',
						width : 160
					}, {
						header : '币种',
						dataIndex : 'currency',
						width : 70
					}, {
						header : '到账时间',
						dataIndex : 'factDate',
						sortable : true,
						width : 140
					}, {
						header : '收入金额',
						dataIndex : 'incomeMoney',
						align : 'right',
						width : 120,
						renderer : function(v) {
							if (v != null) {
								return Ext.util.Format.number(v,
										',000,000,000.00')
										+ "元"
							} else {
								return v
							}

						}
					}, {
						header : '支出金额',
						dataIndex : 'payMoney',
						align : 'right',
						width : 120,
						renderer : function(v) {
							if (v != null) {
								return Ext.util.Format.number(v,
										',000,000,000.00')
										+ "元"
								return v + "元"
							} else {
								return v
							}

						}
					}

					, {
						header : '未对账金额',
						dataIndex : 'notMoney',
						align : 'right',
						width : 120,
						renderer : function(v) {
							if (v != null) {
								return Ext.util.Format.number(v,
										',000,000,000.00')
										+ "元"
							} else {
								return v
							}

						}

					}, {
						header : '已对账金额',
						dataIndex : 'afterMoney',
						align : 'right',
						width : 120,
						renderer : function(v) {
							if (v != null) {
								return Ext.util.Format.number(v,
										',000,000,000.00')
										+ "元"
							} else {
								return v
							}

						}

					}, {
						header : "交易类型",
						dataIndex : "bankTransactionTypeName",
						width : 60

					}, {
						header : "是否项目相关",
						dataIndex : "isProject",
						align : 'center',
						width : 90

					}
					// , {
					// header : "对方开户银行",
					// dataIndex : "opBankName",
					// align : 'center'
					//
					// }
					, {
						header : "对方户名",
						dataIndex : "opOpenName",
						width : 120

					}, {
						header : "对方账号",
						dataIndex : "opAccount",
						width : 120

					}, {
						header : '用途摘要',
						dataIndex : 'transactionType',
						width : 120
					}]
				// end of columns
			});

		// this.gridPanel.addListener('rowdblclick',this.rowClick);

	},// end of the initComponents()
	// 重置查询表单

	load : function() {

		window.open( __ctxPath + '/creditFlow/finance/downloanExcelExeclToMysql.do','_blank');
		/*Ext.Ajax.request({
			url : __ctxPath
					+ '/contract/getByOnlymarkDocumentTemplet.do',
			method : 'GET',
			success : function(response, request) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					window.open(__ctxPath+ '/contract/ajaxGetReportTemplateDocumentTemplet.do?mark=zijing&businessType=SmallLoan','_blank');
				} else {
					Ext.ux.Toast.msg('状态', '未上传资金流水模板！');
				}

			},
			failure : function(response) {
				Ext.ux.Toast.msg('状态', '操作失败，请重试！');
			},
			params : {
				mark : "zijing",
				businessType : "SmallLoan"
			}
		})*/

		// alert("sdfa");
		// var ReportTemplate="zijing";//调查报告模板唯一标识
		// var templettype = 6;
		// window.location.href
		// =__ctxPath+'/credit/document/ajaxGetReportTemplate.do?mark='+ReportTemplate+'&templettype='+templettype;
		// alert("111");
	},
	upload : function() {
		new SlFundQlideView({
					gridPanel : this.gridPanel,
					flag : "qlideupload"
				}).show();

	},
	reset : function() {
		this.searchPanel.getForm().reset();
		$search({
			searchPanel : this.searchPanel,
			gridPanel : this.gridPanel
		});
	},
	// 按条件搜索
	search : function() {
		$search({
			searchPanel : this.searchPanel,
			gridPanel : this.gridPanel
		});
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					new SlFundQlideForm({
								fundQlideId : rec.data.fundQlideId
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		new SlFundQlideForm().show();
	},
	// 创建记录
	importBank : function() {

		var formPanel = new Ext.FormPanel({
					layout : 'column',
					border : false,
					region : 'north',
					height : 150,
					anchor : '100%',
					frame : true,
					layoutConfig : {
						align : 'middle'
					},
					bodyStyle : 'padding:10px 10px 10px 10px',
					items : [{
								columnWidth : 0.5,
								layout : 'form',
								border : false,
								labelWidth : 60,
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											fieldLabel : '开始日期',
											anchor : '100%',
											name : "startT"
										}]
							}, {
								columnWidth : 0.05,
								layout : 'form',
								border : false,
								html : '--'
							}, {
								columnWidth : 0.45,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											anchor : '100%',
											name : "endT",
											hideLabel : true
										}]
							}]
				})
		var win = new Ext.Window({
			title : '导入银行流水',
			modal : true,
			autoHeight : true,
			width : 400,
			items : [formPanel],
			buttons : [{
				text : '导入',
				iconCls : 'btn-save',
				scope : this,
				handler : function() {
					formPanel.getForm().submit({
					method : 'POST',
					scope :this,
					waitTitle : '连接',
					waitMsg : '消息发送中...',
					url:__ctxPath + '/webservice/importBankFundQlideFromWebService.do',
					success : function(form ,action) {
						objSubmit = Ext.util.JSON.decode(action.response.responseText);
						
						if(objSubmit.falg == true){
								 Ext.MessageBox.show({
										title : '操作信息',
										msg : objSubmit.result,
										buttons : Ext.MessageBox.OK
									
									});			
							var gridPanel = this.gridPanel;
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							win.close();
						}else{
						     Ext.MessageBox.show({
										title : '操作信息',
										msg : objSubmit.result,
										buttons : Ext.MessageBox.OK
										
									});
						}
					},
					failure : function(form ,action) {
						 Ext.MessageBox.show({
										title : '操作信息',
										msg : '导入出错，请联系管理员！',
										buttons : Ext.MessageBox.OK,
										icon : 'ext-mb-error'
									});
					}
				})
				}
			}, {
				text : '关闭',
				iconCls : 'btn-cancel',
				scope : this,
				handler : function() {
					win.close();
				}
			}]
		})
		win.show()

	},

	savealot : function() {
		new SlFundQlideAlotAdd().show();

	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
					url : __ctxPath
							+ '/creditFlow/finance/multiDelSlFundQlide.do',
					ids : id,
					grid : this.gridPanel,
					error : '确定要删除？'
				});
	},
	// 把选中ID删除
	removeSelRs : function(id) {
		var s = this.gridPanel.getSelectionModel().getSelections();
		record = s[0];
		var gridPanel = Ext.getCmp('SlFundQlideGrid');
		var gpanel=this.gridPanel
		var selectRecords = gridPanel.getSelectionModel().getSelections();

		if (selectRecords.length == 0) {
			Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
			return;
		}
		var ids = Array();
		for (var i = 0; i < selectRecords.length; i++) {
			ids.push(selectRecords[i].data.fundQlideId);
		}

		if (record.data.afterMoney == 0) {
			Ext.Ajax.request({
						url : __ctxPath
								+ '/creditFlow/finance/multiDelSlFundQlide.do',
						params : {
							ids : ids
						},
						method : 'post',
						success : function() {
							Ext.ux.Toast.msg("信息", "成功删除所选记录！");
							gpanel.getStore().reload()
						}
					});
		} else {
			Ext.MessageBox.show({
						title : '操作信息',
						msg : '此流水已经对过账不能删除！',
						buttons : Ext.MessageBox.OK,
						icon : 'ext-mb-error'
					});
			return false;
		}
		/*
		 * $delGridRs({ url : __ctxPath +
		 * '/creditFlow/finance/multiDelSlFundQlide.do', grid : this.gridPanel,
		 * idName : 'fundQlideId', error : '确定要删除？' });
		 */
	},
	// 查看Rs
	seeRs : function(record) {
		var s = this.gridPanel.getSelectionModel().getSelections();
		if (s <= 0) {
			Ext.ux.Toast.msg('操作信息', '请选中任何一条记录');
			return false;
		} else if (s.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
			return false;
		} else {
			record = s[0]
			new SlFundQlideForm({
						fundQlideId : record.data.fundQlideId,
						ischeck : true,
						isAllReadOnly : true
					}).show();

		}
	},
	// 编辑Rs
	editRs : function(record) {
		var s = this.gridPanel.getSelectionModel().getSelections();
		if (s <= 0) {
			Ext.ux.Toast.msg('操作信息', '请选中任何一条记录');
			return false;
		} else if (s.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
			return false;
		} else {
			record = s[0]
			if (record.data.afterMoney == 0) {
				new SlFundQlideForm({
							fundQlideId : record.data.fundQlideId,
							ischeck : false,
							isAllReadOnly : false
						}).show();

			} else {
				Ext.ux.Toast.msg('操作信息', '此流水已经对过账！');
				new SlFundQlideForm({
							fundQlideId : record.data.fundQlideId,
							ischeck : true,
							isAllReadOnly : false
						}).show();
			}
		}
	},
	saveInternal : function() {

		new SlFundQlideInternalForm().show();

	},
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.fundQlideId);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
var selectAccountkLinkMan = function(a) {
	Ext.getCmp('Q_dialAccounts_S_EQ').setValue(a);
}
var selectAccountkLinkMan1 = function(a) {
	Ext.getCmp('Q_recAccounts_S_EQ').setValue(a);
}