/**
 * @author
 * @class  BpDicAccountTitleSetView
 * @extends Ext.Panel
 * @description [ BpDicAccountTitleSetView]管理
 * @company 互融软件
 * @createtime:
 */
 BpDicAccountTitleSetView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		 BpDicAccountTitleSetView.superclass.constructor.call(this, {
					id : ' BpDicAccountTitleSetView',
				    layout : 'anchor',
					anchor : '100%',
					autoHeight : true,
					items : [this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		url= __ctxPath	+ "/creditFlow/common/listBpDicAccountTitleSet.do?Q_listId_L_EQ=0";
	   if(!Ext.isEmpty(this.listId)){
		    url=__ctxPath	+ "/creditFlow/common/listBpDicAccountTitleSet.do?Q_listId_L_EQ="+this.listId
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
					}, 'listId', 'keyName', 'keyId', 'title','subTitle','titleClassName',
					'subKey'],
			columns : [{
						header : 'id',
						dataIndex : 'id',
						hidden : true
					}, {
						header : '一级科目编号',
						dataIndex : 'keyName'
					},{
						header : '一级科目分类',
						dataIndex : 'titleClassName'
					}, {
						header : '一级科目名称',
						dataIndex : 'title'
					},{
						header : '二级科目编号',
						dataIndex : 'subKey'
					},{
						header : '二级科目名称',
						dataIndex : 'subTitle'
					}]
				// end of columns
		});

		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},
	// 创建记录
	createRs : function() {
		var gridPanel=this.gridPanel;
		new BpDicAccountTitleSetForm({
			listId:this.listId,
			gridPanel : gridPanel
		}).show();
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
			url : __ctxPath
					+ '/creditFlow/common/multiDelBpDicAccountTitleSet.do',
			ids : id,
			grid : this.gridPanel
		});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
			url : __ctxPath
					+ '/creditFlow/common/multiDelBpDicAccountTitleSet.do',
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
			new BpDicAccountTitleSetForm({
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
			new BpDicAccountTitleSetForm({
				id : record.data.id,
				readOnly : true
			}).show();
		}
	}
});
