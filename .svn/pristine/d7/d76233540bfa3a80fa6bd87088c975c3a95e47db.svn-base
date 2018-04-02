/**
 * 客户合并
 * @class CustomerMerger
 * @extends Ext.Window
 */
CustomerMerger = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		CustomerMerger.superclass.constructor.call(this, {
					title : '客户合并',
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
		this.searchPanel = new Ext.FormPanel({
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
					columnWidth : .2,
					labelAlign : 'right',
					xtype : 'container',
					layout : 'form',
					labelWidth : 60,
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
					columnWidth : .2,
					labelAlign : 'right',
					xtype : 'container',
					layout : 'form',
					labelWidth : 60,
					defaults : {
						anchor : anchor
					},
					items : [{
						fieldLabel : '姓名',
						name : '',
						xtype : 'textfield'
					}]
				}, {
					columnWidth : .2,
					labelAlign : 'right',
					xtype : 'container',
					layout : 'form',
					labelWidth : 60,
					defaults : {
						anchor : anchor
					},
					items : [{
						fieldLabel : '手机号',
						name : '',
						xtype : 'textfield'
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
					columnWidth : .05,
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
			tbar:this.topbar,
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
					header : '客户类型',
					sortable : true,
					dataIndex : ''
				}, {
					header : '客户来源',
					dataIndex : ''
				}, {
					header : '姓名',
					dataIndex : ''
				}, {
					header : '客户标签',
					dataIndex : ''
				}, {
					header : '性别',
					dataIndex : ''
				}, {
					header : '地区',
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
	},
});