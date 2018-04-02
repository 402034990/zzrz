/**
 * 客户管理
 * @class CustomerManagement
 * @extends Ext.Panel
 */
CustomerManagement = Ext.extend(Ext.Panel, {
	constructor : function(config) {
		Ext.applyIf(this, config);
		this.initUIComponents();
		CustomerManagement.superclass.constructor.call(this, {
					id : 'CustomerManagement',
					title : '客户管理',
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
						items : [ {
							columnWidth : .33,
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
							columnWidth : .33,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								xtype : 'textfield',
								name:'',
								fieldLabel : '姓名'
							}]
						},{
							columnWidth : .33,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								xtype : 'textfield',
								name:'',
								fieldLabel : '电话号码'
							}]
						},{
							columnWidth : .33,
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
							columnWidth : .33,
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
						}, {
							columnWidth : .09,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 5,
							defaults : {
								xtype : 'button'
							},
							items : [{
								text : '重置',
								fieldLabel : '',
								labelSeparator : "",
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}]
						}/*,{
							columnWidth : .33,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								xtype : 'combo',
								mode : 'local',
								valueField : 'value',
								editable : false,
								displayField : 'value',
								store : new Ext.data.SimpleStore({
									fields : ["value"],
									data : [["400"], ["线下"]]
								}),
								triggerAction : "all",
								name : '',
								fieldLabel : '客户来源'
		
							}]
						},{
							columnWidth : .33,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								xtype : 'combo',
								mode : 'local',
								valueField : 'value',
								editable : false,
								displayField : 'value',
								store : new Ext.data.SimpleStore({
									fields : ["value"],
									data : [["男"], ["女"]]
								}),
								triggerAction : "all",
								name : '',
								fieldLabel : '性别'
							}]
						}*/]
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
			items : [{
				text : '添加',
				iconCls : 'btn-add',
				hidden : isGranted('_create_grkh') ? false : true,
				scope : this,
				handler : function() {
					var randomId = rand(100000);
					var id = "add_person" + randomId;
					var url = __ctxPath
							+ '/creditFlow/customer/person/addInfoPerson.do';
					var window_add = new Ext.Window({
								title : '新增个人客户详细信息',
								height : 460,
								constrainHeader : true,
								collapsible : true,
								frame : true,
								iconCls : 'btn-add',
								border : false,
								bodyStyle : 'overflowX:hidden',
								buttonAlign : 'right',
								iconCls : 'newIcon',
								width : (screen.width - 180) * 0.7 + 160,
								resizable : true,
								layout : 'fit',
								autoScroll : false,
								constrain : true,
								closable : true,
								modal : true,
								items : [new personObj({
											personData : null,
											url : url,
											id : id
										})],
								tbar : [new Ext.Button({
											text : '保存',
											tooltip : '保存基本信息',
											iconCls : 'submitIcon',
											hideMode : 'offsets',
											handler : function() {
												var vDates = "";
												var panel_add = window_add
														.get(0);
												formSavePersonObj(panel_add,
														window_add, personStore);
											}
										})],
								listeners : {
									'beforeclose' : function(panel) {
										window_add.destroy();
									}
								}
							});
					window_add.show();

				}
			}, new Ext.Toolbar.Separator({
						hidden : isGranted('_create_grkh') ? false : true
			}), {
				text : '查看',
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
						Ext.Ajax.request({
							url : __ctxPath
									+ '/creditFlow/customer/person/seeInfoPerson.do',
							method : 'POST',
							scope : this,
							success : function(response, request) {
								obj = Ext.util.JSON
										.decode(response.responseText);
								var personData = obj.data;
								var randomId = rand(100000);
								var id = "see_person" + randomId;
								var anchor = '100%';
								var window_see = new Ext.Window({
											title : '查看个人客户详细信息',
											layout : 'fit',
											width : (screen.width - 180) * 0.7
													+ 160,
											maximizable : true,
											height : 460,
											closable : true,
											modal : true,
											plain : true,
											border : false,
											items : [new personObj({
														url : null,
														id : id,
														personData : personData,
														isReadOnly : true
													})],
											listeners : {
												'beforeclose' : function(panel) {
													window_see.destroy();
												}
											}
										});
								window_see.show();
							},
							failure : function(response) {
								Ext.ux.Toast.msg('状态', '操作失败，请重试');
							},
							params : {
								id : rows[0].data.id
							}
						});
					}

				}
			}, new Ext.Toolbar.Separator({
						hidden : isGranted('_See_grkh') ? false : true
					}), {
				text : '编辑',
				iconCls : 'btn-edit',
				scope : this,
				hidden : isGranted('_edit_grkh') ? false : true,
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
						Ext.Ajax.request({
							url : __ctxPath
									+ '/creditFlow/customer/person/seeInfoPerson.do',
							method : 'POST',
							scope : this,
							success : function(response, request) {
								obj = Ext.util.JSON
										.decode(response.responseText);
								var personData = obj.data;
								var randomId = rand(100000);
								var id = "update_person" + randomId;
								var url = __ctxPath
										+ '/creditFlow/customer/person/updateInfoPerson.do';
								var window_update = new Ext.Window({
									title : '编辑个人客户详细信息',
									height : 460,
									constrainHeader : true,
									collapsible : true,
									frame : true,
									iconCls : 'btn-edit',
									border : false,
									bodyStyle : 'overflowX:hidden',
									buttonAlign : 'right',
									iconCls : 'newIcon',
									width : (screen.width - 180) * 0.7 + 160,
									resizable : true,
									layout : 'fit',
									autoScroll : false,
									constrain : true,
									closable : true,
									modal : true,
									items : [new personObj({
												personData : personData,
												url : url,
												isReadSome:true,
												id : id
											})],
									tbar : [new Ext.Button({
										text : '更新',
										tooltip : '更新基本信息',
										iconCls : 'submitIcon',
										hideMode : 'offsets',
										handler : function() {
											var vDates = "";
											var panel_add = window_update
													.get(0);
											formSavePersonObj(panel_add,
													window_update, personStore);
										}
									})],
									listeners : {
										'beforeclose' : function(panel) {
											window_update.destroy();
										}
									}
								});
								window_update.show();
							},
							failure : function(response) {
								Ext.ux.Toast.msg('状态', '操作失败，请重试');
							},
							params : {
								id : rows[0].data.id
							}
						});
					}

				}
			}, /*new Ext.Toolbar.Separator({
						hidden : isGranted('_edit_grkh') ? false : true
					}), {
				text : '删除',
				iconCls : 'btn-del',
				hidden : isGranted('_remove_grkh') ? false : true,
				scope : this,
				handler : function() {
					var selected = this.centerPanel.getSelectionModel()
							.getSelections();
					var thisPanel = this.centerPanel;
					var len = selected.length;
					var list = "";
					for (var j = 0; j < len; j++) {
						if (j == (len - 1)) {
							list += selected[j].id;
						} else
							list += selected[j].id + ",";
					}
					if (0 == len) {
						Ext.MessageBox.alert('状态', '请选择一条记录!');
					} else {
						Ext.MessageBox.confirm('确认删除', '您确认要删除所选记录吗？',
								function(btn) {
									if (btn == 'yes') {
										Ext.Ajax.request({
											url : __ctxPath
													+ '/creditFlow/customer/person/deletePerson.do',
											method : 'POST',
											scope : this,
											success : function(response,
													request) {
												var object = Ext.util.JSON
														.decode(response.responseText);
												if (object.flag == 'false') {
													Ext.ux.Toast.msg('状态',
															object.msg);
												} else {
													Ext.ux.Toast.msg('状态',
															'删除成功!');
												}
												thisPanel.getStore().reload();
											},
											failure : function(result, action) {
												Ext.ux.Toast.msg('状态', '删除失败!');
											},
											params : {
												listId : list
											}
										});
									}
								});
					}

				}
			},*/{
				iconCls : 'btn-people',
				text : '跟进',
				xtype : 'button',
				scope : this,
				handler : function(){
					new CustomerFollowView().show();
				}
			},{
				iconCls : 'btn-people',
				text : '客户标签',
				xtype : 'button',
				scope : this,
				handler : function(){
					//new CustomerLabel().show();
					new CustomerLabel({
						single : false,
						type : 'branch',
						title : "选择项目经理",
						callback : function(uId, uname) {
						}
					}).show();
				}
			},new Ext.Toolbar.Separator({
						hidden : (isGranted('_detail_ywwl') ? false : true)
								|| (isGranted('_export_grkh') ? false : true)
					}), {
				text : '导出到Excel',
				iconCls : 'btn-xls',
				scope : this,
				hidden : isGranted('_export_grkh') ? false : true,
				handler : function() {
					var companyId = (isShow==true?this.getCmpByName("companyId").getValue():null);//分公司id
					var sex=this.getCmpByName("sex").getValue();//性别
					var name = this.getCmpByName("name").getValue();//姓名
					var cardtype = this.getCmpByName("cardtype").getValue();//证件类型
					var cardnumber = this.getCmpByName("cardnumber").getValue();//证件号码
//					var shopId = this.getCmpByName("shopId").getValue();//门店id
					window.open(__ctxPath+ '/creditFlow/customer/person/outputExcelPerson.do?name='+name+'&sex='+sex
								+'&cardtype='+cardtype+"&cardnumber="+cardnumber+"&shopId="+shopId,'_blank');
				}
			},/* importButton, */
			{
				iconCls : 'btn-add',
				text : '加入黑名单',
				xtype : 'button',
				hidden : isGranted('_addBlack_grkh') ? false : true,

				scope : this,
				ptype : "1",
				handler : this.addBlackList
			},{
				iconCls : 'btn-people',
				text : '推荐产品',
				xtype : 'button',
				scope : this,
				handler : function(){
					new RecommendedProducts().show();
				}
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
								header : "客户来源",
								width : 100,
								sortable : true,
								dataIndex : ''
							},{
								header : "客户类型",
								width : 100,
								sortable : true,
								dataIndex : ''
							},{
								header : "姓名",
								width : 100,
								sortable : true,
								dataIndex : ''
							}, {
								header : "客户标签",
								width : 120,
								sortable : true,
								dataIndex : ''
							}, {
								header : "性别",
								width : 50,
								sortable : true,
								dataIndex : 'sexvalue'
							}, {
								header : "地区",
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
		/*
		 * this.store.baseParams.job =
		 * this.searchPanel.getForm().findField('job').getValue();
		 * this.store.baseParams.cellphone =
		 * this.searchPanel.getForm().findField('cellphone').getValue();
		 * this.store.baseParams.customerLevel =
		 * this.searchPanel.getForm().findField('customerLevel').getValue();
		 */
		if (null != this.searchPanel.getForm().findField('companyId')) {
			this.store.baseParams.companyId = this.searchPanel.getForm()
					.findField('companyId').getValue();
		}
//		this.store.baseParams.shopId = this.searchPanel.getForm()
//				.findField('shopId').getValue();
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
		/*
		 * this.store.baseParams.job =
		 * this.searchPanel.getForm().findField('job').getValue();
		 * this.store.baseParams.cellphone =
		 * this.searchPanel.getForm().findField('cellphone').getValue();
		 * this.store.baseParams.customerLevel =
		 * this.searchPanel.getForm().findField('customerLevel').getValue();
		 */
		if (null != this.searchPanel.getForm().findField('companyId')) {
			this.store.baseParams.companyId = this.searchPanel.getForm()
					.findField('companyId').getValue();
		}
//		this.store.baseParams.shopId = this.searchPanel.getForm()
//				.findField('shopId').getValue();
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
				});
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
													grid.getStore().reload();
												},
												failure : function(form, action) {
													Ext.ux.Toast.msg('状态',
															'添加失败');
												}
											});
								}
							}, {
								text : '取消',
								iconCls : 'btn-cancel',
								handler : function() {
									window.destroy();
								}
							}]
				});
		window.show();
	}
});