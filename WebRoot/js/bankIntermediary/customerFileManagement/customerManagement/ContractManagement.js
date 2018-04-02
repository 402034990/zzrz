/***
 * 合同管理
 * @class ContractManagement
 * @extends Ext.Window
 */
ContractManagement = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		ContractManagement.superclass.constructor.call(this, {
					title : '合同管理',
					width : 1000,
					height : 425,
					modal : true,
					iconCls : 'menu-person',
					autoScroll : true,
					maximizable : true,
					//layout : 'fit',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel,this.gridPanel]

				});
	},
	initUIComponents : function() {
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
						items : [{
							columnWidth : .33,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								fieldLabel : '合同编号',
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
								xtype : "combo",
								triggerClass : 'x-form-search-trigger',
								hiddenName : "slSmallloanProject.appUserName",
								editable : false,
								fieldLabel : "业务经理",
								//blankText : "业务经理不能为空，请正确填写!",
								//allowBlank : false,
								anchor : "100%",
								listeners : {
								scope : this,
								// 设置默认用户
								'afterRender' : function(combo) {
									this.getCmpByName('slSmallloanProject.appUserName')
											.setValue(currentUserFullName);
									this.getCmpByName('slSmallloanProject.appUserId')
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
								name : "slSmallloanProject.appUserId"
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
								text : '重置',
								fieldLabel : ' ',
								labelSeparator : "",
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}]
						}]
					}]
				});
		this.topbar = new Ext.Toolbar({
			items : [{
				iconCls : 'btn-detail',
				text : '合并并转接',
				xtype : 'button',
				scope:this,
				handler : function() {
					var selRs = this.gridPanel.getSelectionModel()
							.getSelections();
					if (selRs.length == 0) {
						Ext.ux.Toast.msg('操作信息', '请选择一条记录！');
						return;
					}
					if (selRs.length > 1) {
						Ext.ux.Toast.msg('操作信息', '只能选择一条记录！');
						return;
					}
					var record = this.gridPanel.getSelectionModel()
							.getSelected();
					//this.detailInfo(record);
				}
			}]
		});
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			rowActions : false,
			//tbar:this.topbar,
//			loadMask : true,
			store : this.store,
			defaults : {
				anchor : '96%'
			},
			//url : __ctxPath + "",
			baseParams : {
				
			},
			//fields : [],
			border : false,
			columns : [{
					id : '',
					header : '合同编号',
					sortable : true,
					dataIndex : ''
				}, {
					header : '合同签订时间',
					dataIndex : ''
				}, {
					header : '金额',
					dataIndex : ''
				}, {
					header : '业务经理',
					dataIndex : ''
				}, {
					header : '合同',
					dataIndex : ''
				}]
		});
	},
	// 重置查询表单
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
	}
});