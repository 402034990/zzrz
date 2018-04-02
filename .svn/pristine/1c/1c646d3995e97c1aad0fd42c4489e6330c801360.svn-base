/**
 * @author
 * @class CsPersonCreditRecordView
 * @extends Ext.Panel
 * @description [CsPersonCreditRecord]管理
 * @company 智维软件
 * @createtime:
 */
CsPersonCreditRecordView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		if (typeof(_cfg.id) != "undefined") {
			this.id = _cfg.id;
		}
		if (typeof(_cfg.title) != "undefined") {
			this.title = _cfg.title;
		}
		if (typeof(_cfg.json) != "undefined") {
			this.json = _cfg.json;
		}
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		CsPersonCreditRecordView.superclass.constructor.call(this, {
					id : 'CsPersonCreditRecordView'+this.id,
					title : this.title,
					region : 'center',
					layout : 'border',
					items : [ this.searchPanel,this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel
		this.searchPanel = new HT.SearchPanel({
			layout : 'column',
			style : 'padding-left:5px;padding-right:5px;padding-top:5px;',
			region : 'north',
			height : 20,
			anchor : '96%',
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
				align : 'middle',
				padding : '5px'

			},
			items : [{
				columnWidth : 0.33,
				layout : 'form',
				border : false,
				labelWidth : 60,
				labelAlign : 'right',
				items : [{
					fieldLabel : '返回参数',
					name : 'Q_nameKey_S_EQ',
					flex : 1,
					editable : false,
					width : 105,
					xtype : 'textfield',
					anchor : '100%'
				}]
			}, {
				columnWidth : .07,
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
				}]
			}, {
				columnWidth : .07,
				xtype : 'container',
				layout : 'form',
				defaults : {
					xtype : 'button'
				},
				style : 'padding-left:10px;',
				items : [ {
					text : '重置',
					scope : this,
					iconCls : 'btn-reset',
					handler : this.reset
				}]
			}]
		});

		this.topbar = new Ext.Toolbar({
					items : [{
								iconCls : 'btn-add',
								text : '查看第三方返回参数',
								xtype : 'button',
								scope : this,
								handler : this.createRs
							}/*, {
								iconCls : 'btn-del',
								text : '删除[CsPersonCreditRecord]',
								xtype : 'button',
								scope : this,
								handler : this.removeSelRs
							}*/]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			//使用RowActions
			rowActions : true,
			id : 'CsPersonCreditRecordGrid'+this.id,
			//url : __ctxPath+ "/creditFlow/creditRecord/listCsPersonCreditRecord.do",
			url : __ctxPath+ "/creditFlow/creditRecord/list1CsPersonCreditRecord.do?id="+this.json.id+'&projectId='+this.json.projectId+'&type='+this.json.type,
			fields : [{
						name : 'id',
						type : 'int'
					}, 'projectId', 'personId', 'nameKey', 'nameValue', 'type','valueText','signText'],
			columns : [{
						header : 'id',
						dataIndex : 'id',
						hidden : true
					}/*, {
						header : 'projectId',
						dataIndex : 'projectId'
					}, {
						header : 'personId',
						dataIndex : 'personId'
					}*/, {
						//header : 'nameKey',
						header : '返回参数',
						width : 60,
						dataIndex : 'nameKey'
					},{
						//header : 'signText',
						header : '参数说明',
						dataIndex :'signText'
					}, {
						//header : 'nameValue',
						header : '参数对应值',
						width : 40,
						dataIndex : 'nameValue'
					}, {
						//header : 'valueText',
						header : '参数值说明',
						dataIndex : 'valueText'
					}/*, {
						header : 'type',
						dataIndex : 'type'
					}*/, new Ext.ux.grid.RowActions({
								header : '管理',
								width : 100,
								hidden : true,
								actions : [{
											iconCls : 'btn-del',
											qtip : '删除',
											style : 'margin:0 3px 0 3px'
										}, {
											iconCls : 'btn-edit',
											qtip : '编辑',
											style : 'margin:0 3px 0 3px'
										}],
								listeners : {
									scope : this,
									'action' : this.onRowAction
								}
							})]
				//end of columns
			});

		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	//重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	//按条件搜索
	search : function() {
		$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
	},
	//GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					new CsPersonCreditRecordForm({
								id : rec.data.id
							}).show();
				});
	},
	//创建记录
	createRs : function() {
		new CsPersonCreditRecordForm({id:this.id , json:this.json}).show();
	},
	//按ID删除记录
	removeRs : function(id) {
		$postDel({
			url : __ctxPath
					+ '/creditFlow/creditRecord/multiDelCsPersonCreditRecord.do',
			ids : id,
			grid : this.gridPanel
		});
	},
	//把选中ID删除
	removeSelRs : function() {
		$delGridRs({
			url : __ctxPath
					+ '/creditFlow/creditRecord/multiDelCsPersonCreditRecord.do',
			grid : this.gridPanel,
			idName : 'id'
		});
	},
	//编辑Rs
	editRs : function(record) {
		new CsPersonCreditRecordForm({
					id : record.data.id
				}).show();
	},
	//行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
			case 'btn-del' :
				this.removeRs.call(this, record.data.id);
				break;
			case 'btn-edit' :
				this.editRs.call(this, record);
				break;
			default :
				break;
		}
	}
});
