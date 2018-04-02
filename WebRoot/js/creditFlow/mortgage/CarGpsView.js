/**
 * @author
 * @class  CarGpsView
 * @extends Ext.Panel
 * @description [ CarGpsView]管理
 * @company 互融软件
 * @createtime:
 */
 CarGpsView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		if (typeof(_cfg.gpsAdd) != "undefined") {
			this.gpsAdd = _cfg.gpsAdd;
		}
		if (typeof(_cfg.projectId) != "undefined") {
			this.projectId = _cfg.projectId;
		}
		if (typeof(_cfg.isAllReadOnly) != "undefined") {
			this.isAllReadOnly = _cfg.isAllReadOnly;
		}
		if (typeof(_cfg.mortgageId) != "undefined") {
			this.mortgageId = _cfg.mortgageId;
		}
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		 CarGpsView.superclass.constructor.call(this, {
					id : ' CarGpsView',
				    layout : 'anchor',
					anchor : '100%',
					autoHeight : true,
					items : [this.gridPanel]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		this.topbar = new Ext.Toolbar({
					items : [{
								iconCls : 'btn-add',
								text : '增加',
								xtype : 'button',
								scope : this,
								hidden : this.isAllReadOnly?true:false,
								handler : this.createRs
							}, {
								iconCls : 'btn-edit',
								text : '修改',
								xtype : 'button',
								scope : this,
								hidden : this.isAllReadOnly?true:false,
								handler : this.editRs
							}, {
								iconCls : 'btn-detail',
								text : '查看',
								xtype : 'button',
								scope : this,
								hidden : this.isHiddenSee,
								handler : this.seeRs
							},{
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								scope : this,
								hidden : this.isAllReadOnly?true:false,
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
//			url : __ctxPath+ '/creditFlow/gps/listCsGps.do?mortgageId='+ this.mortgageId,
			url : __ctxPath+ '/creditFlow/gps/byMortgageIdCsGps.do?mortgageId='+ this.mortgageId,
			fields : [{
						name : 'id',
						type : 'int'
					}, 'projectId', 'isgps', 'handlePerson', 'handleDate','gpsModel','imei',
					'remark'],
			columns : [{
						header : 'id',
						dataIndex : 'id',
						hidden : true
					}, {
						header : '办理人',
						width : 250,
						dataIndex : 'handlePerson'
					}, {
						header : '办理时间',
						width : 150,
						dataIndex : 'handleDate'
					}, {
						header : 'gps型号',
						width : 140,
						dataIndex : 'gpsModel'
					}, {
						header : 'IMEI',
						width : 240,
						dataIndex : 'imei'
					},{
						header : '备注',
						width : 240,
						dataIndex : 'remark'
					}]
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
		new CsGpsForm({
			projectId:this.projectId,
			isEite:this.isEite,
			mortgageId : this.mortgageId,
			gridPanel : gridPanel
		}).show();
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel({
			url : __ctxPath+ '/creditFlow/gps/multiDelCsGps.do',
			ids : id,
			grid : this.gridPanel
		});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
			url : __ctxPath+ '/creditFlow/gps/multiDelCsGps.do',
			grid : this.gridPanel,
			idName : 'id'
		});
	},
	// 编辑Rs
	editRs : function(record) {
		var gridPanel=this.gridPanel;
		var sel = this.gridPanel.getSelectionModel().selections;
		if(sel==0){
			Ext.ux.Toast.msg('操作信息','请选择一条记录');
		}else if(sel.length>1){
			Ext.ux.Toast.msg('操作信息','只能选择一条记录');
		}else{
			var record = sel.get(0);
			var gridPanel=this.gridPanel;
		    new CsGpsForm({
			id : record.data.id,
			isEite:this.isEite,
			gridPanel : gridPanel
		}).show();
		}
	},
	// 查看Rs
	seeRs : function(record) {
		var gridPanel=this.gridPanel;
		var sel = this.gridPanel.getSelectionModel().selections;
		if(sel==0){
			Ext.ux.Toast.msg('操作信息','请选择一条记录');
		}else if(sel.length>1){
			Ext.ux.Toast.msg('操作信息','只能选择一条记录');
		}else{
			var record = sel.get(0);
			var gridPanel=this.gridPanel;
		    new CsGpsForm({
			id : record.data.id,
			isAllReadOnly : true,
			gridPanel : gridPanel
		}).show();
		}
	}
});
