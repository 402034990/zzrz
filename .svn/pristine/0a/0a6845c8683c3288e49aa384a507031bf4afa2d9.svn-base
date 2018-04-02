/**
 * 选择客户信息放大镜
 * @param {} funName
 */
function customerInfoSelectWin(funName){
	//查询面板
	var anchor='95%';	
	//排版
	var searchPanel = new HT.SearchPanel({
					layout : 'form',
					border : false,
					anchor : '100%',
					keys : [{
						key : Ext.EventObject.ENTER,
						fn : this.search,
						scope : this
					}, {
						key : Ext.EventObject.ESC,
						fn : this.reset,
						scope : this
					}],
					defaults : {
					autoWidth : true,
					autoHeight : true,
					labelWidth : 60,
					labelAlign:'right'
				},
				items : [{
							layout : 'column',
							
							items : [{
										columnWidth : .333,
										layout : 'form',
										defaults : {
											anchor : anchor
										},
										items : [{
													xtype : 'textfield',
													fieldLabel : '客户标签',
													name : 'resource.name',
													allowBlank : true
												}, {
													fieldLabel : '创建时间',
													name : '',
													format:'Y-m-d',
													editable : false,
													xtype : 'datefield'
												}]
									}, {
										columnWidth : .333,
										layout : 'form',
										defaults : {
											anchor : anchor
										},
										items : [{
													xtype : 'textfield',
													fieldLabel : '客户姓名',
													name : 'resource.name',
													allowBlank : true
												}, {
													xtype : 'datefield',
													editable : false,
													format:'Y-m-d',
													name : '',
													fieldLabel : '至'
												}]
									}, {
										columnWidth : .333,
										layout : 'form',
										defaults : {
											anchor : anchor
										},
										items : [{
													xtype : 'textfield',
													fieldLabel : '电话号码',
													name : 'resource.name',
													allowBlank : true
												}]
									}]
						}, {
							columnWidth : 1,
							layout : 'column',
							defaults : {
								anchor : anchor,
								columnWidth:.333
							},
							items : [{
										labelAlign : 'right',
										xtype : 'container',
										layout : 'form',
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
									}, {
										labelAlign : 'right',
										xtype : 'container',
										layout : 'form',
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
													fieldLabel : '客户性别'
												}]
									}, {
										columnWidth:.18,
										labelAlign : 'right',
										xtype : 'container',
										layout : 'form',
										defaults : {
											anchor : '80%'
										},
										items : [{
													text : '查询',
													xtype : 'button',
													fieldLabel : ' ',
													labelSeparator : '',
													iconCls : 'btn-search',
													name : 'resource.orderList',
													allowBlank : true
												}]
									},{
										columnWidth:.14,
										labelAlign : 'right',
										xtype : 'container',
										layout : 'form',
										labelWidth : 35,
										defaults : {
											anchor : '80%'
										},
										items : [{
													text : '重置',
													xtype : 'button',
													fieldLabel : ' ',
													labelSeparator : '',
													iconCls : 'btn-reset',
													name : 'resource.resourceGrade',
													allowBlank : true
												}]
									}]}]

				}); // 查询面板结束
	// 数据源
	var store_customerInfoSelect = new Ext.data.JsonStore({
					/*url : __ctxPath
							+ '/creditFlow/customer/person/perQueryListPerson.do?isAll='
							+ isGranted('_detail_sygrkh'),
					totalProperty : 'totalProperty',
					root : 'topics',
					remoteSort : true,*/
					fields : [{
								name : 'id'
							}, {
								name : 'ly'
							}, {
								name : 'lx'
							}, {
								name : 'xb'
							},{
								name : 'name'
							}, {
								name : 'bq'
							}, {
								name : 'dq'
							}
							],
							
						//测试数据
						data : [{
							id : "1",
							ly : "微信",
							lx : "正常",
							xb:'男',
							name : "尚小亮",
							bq : "sxl",
							dq : "北京"
						}, {
							id : "2",
							ly : "微信",
							lx : "非正常",
							name : "王晓瑞",
							xb:'男',
							bq : "wxr",
							dq : "北京"
						}]
				});
	//数据表
	var gPanel_customerInfoSelect = new HT.GridPanel({
					region : 'center',
					clicksToEdit : 1,
					height:300,
					store : store_customerInfoSelect,
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
								dataIndex : 'ly'
							},{
								header : "客户类型",
								width : 100,
								sortable : true,
								dataIndex : 'lx'
							},{
								header : "姓名",
								width : 100,
								sortable : true,
								dataIndex : 'name'
							}, {
								header : "客户标签",
								width : 120,
								sortable : true,
								dataIndex : 'bq'
							}, {
								header : "性别",
								width : 50,
								sortable : true,
								dataIndex : 'xb'
							}, {
								header : "地区",
								width : 100,
								sortable : true,
								dataIndex : 'dq'
							}],
					defaults : {
						sortable : true,
						menuDisabled : false,
						width : 100
					},
					viewConfig : {
						forceFit : true,
						autoFill : true
					},
					listeners : {
						'rowdblclick' : function(grid, rowIndex, e) {
							var selected = grid.getStore().getAt(rowIndex);
							callbackFun(selected, funName);
							window_customerInfoSelect.destroy();
						}
					}
				});
				
	//panel
	var panel_customerInfoSelect = new Ext.Panel({
		id : 'panel_customerInfoSelect',
		frame : true,
		border: false,
		autoScroll : true,
		collapsible : false,
		autoHeight:true,
		titleCollapse : false,
		items : [searchPanel,gPanel_customerInfoSelect]
			
	});

	
	var window_customerInfoSelect = new Ext.Window({
				title : '客户信息',
				border : false,
				width : 700,
				iconCls : 'btn-search',
				autoHeight:true,
				collapsible : true,
				modal : true,
				constrainHeader : true,
				items : [panel_customerInfoSelect],
				layout : 'fit',
				buttonAlign : 'center'
			});
	window_customerInfoSelect.show();
	
	var callbackFun = function(selected, funName) {
		enterpriseJsonObj = {
			name : selected.get('name'),
			sex : selected.get('xb'),
			address : selected.get('dq')
			
		}
		funName(enterpriseJsonObj);
	}
	

	
}