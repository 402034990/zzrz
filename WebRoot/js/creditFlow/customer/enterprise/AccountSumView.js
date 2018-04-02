/**
 * @author
 * @class  AccountSumView
 * @extends Ext.Panel
 * @description [ AccountSumView]管理
 * @company 互融软件
 * @createtime:
 */
 AccountSumView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		 AccountSumView.superclass.constructor.call(this, {
					id : ' AccountSumView',
				    layout : 'anchor',
					anchor : '100%',
					autoHeight : true,
					items : [this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		url= __ctxPath	+ "/creditFlow/customer/enterprise/listBpCustEntAccountSum.do?Q_indexId_L_EQ=0";
	   if(!Ext.isEmpty(this.indexId)){
		    url=__ctxPath	+ "/creditFlow/customer/enterprise/listBpCustEntAccountSum.do?Q_indexId_L_EQ="+this.indexId
		}	
		
		this.topbar = new Ext.Toolbar({
					items : [{
								iconCls : 'btn-add',
								text : '增加',
								xtype : 'button',
								scope : this,
								hidden : this.isHiddenAdd,
								handler : this.createRs
							},  {
								iconCls : 'btn-detail',
								text : '查看',
								xtype : 'button',
								scope : this,
								hidden : this.isHiddenSee,
								handler : this.seeRs
							},{
								iconCls : 'btn-edit',
								text : '修改',
								xtype : 'button',
								scope : this,
								hidden : this.isHiddenEdit,
								handler : this.editRs
							}, {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								scope : this,
								hidden : this.isHiddenDel,
								handler : this.removeSelRs
							}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			showPaging:false,
			autoHeight : true,
			// 使用RowActions
			rowActions : false,
			//id : 'CsCooperationEnterpriseGrid',
			url : url,
			fields : [{
						name : 'id',
						type : 'int'
					}, 'indexId', 'keyName', 'subTitle', 'startMoney','endMoney',
					'createrId','createrName','updateDate','remark','title','titleClassName'],
			columns : [{
						header : 'id',
						dataIndex : 'id',
						hidden : true
					}, {
						header : '一级分类',
						dataIndex : 'titleClassName'
					}, {
						header : '一级名称',
						dataIndex : 'title'
					},{
						header : '二级科目',
						dataIndex : 'subTitle'
					}, {
						header : '期初余额',
						dataIndex : 'startMoney'
					}, {
						header : '期末余额',
						dataIndex : 'endMoney'
					},  {
						header : '备注',
						dataIndex : 'remark'
					}, {
						header : '录入人',
						dataIndex : 'createrName'
					},{
						header : '录入时间',
						dataIndex : 'updateDate'
					}]
				// end of columns
		});

		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
					new CsCooperationEnterpriseForm({
								id : rec.data.id
							}).show();
				});
	},
	// 创建记录
	createRs : function() {
		var gridPanel=this.gridPanel;
		new AccountSumForm({
			indexId:this.indexId,
			gridPanel : gridPanel
		}).show();
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
			url : __ctxPath
					+ '/creditFlow/customer/enterprise/multiDelBpCustEntAccountSum.do',
			ids : id,
			grid : this.gridPanel
		});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
			url : __ctxPath
					+ '/creditFlow/customer/enterprise/multiDelBpCustEntAccountSum.do',
			grid : this.gridPanel,
			idName : 'id'
		});
	},
	// 编辑Rs
	editRs : function(record) {
		var gridPanel=this.gridPanel;
		var sel = this.gridPanel.getSelectionModel().selections;
		if(sel.length>1){
			Ext.ux.Toast.msg('操作信息','只能选择一条记录');
		}else{
			var record = sel.get(0);
			new AccountSumForm({
				id : record.data.id,
				gridPanel : gridPanel
			}).show();
		}
	},
	// 查看Rs
	seeRs : function(record) {
		var sel = this.gridPanel.getSelectionModel().selections;
		if(sel.length>1){
			Ext.ux.Toast.msg('操作信息','只能选择一条记录');
		}else{		 
			var record = sel.get(0);
			new AccountSumForm({
				id : record.data.id,
				readOnly : true
			}).show();
		}
	}
});
