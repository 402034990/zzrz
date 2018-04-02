productChooseWindow = Ext.extend(Ext.Window, {
	operationType:null,
	userId:null,
	userType:null,
	isAllReadOnly:false,
	isNameReadOnly:false,
	isProductReadOnly:false,
	productId:null,
	isHiddernShop:false,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.type) != "undefined") {
			 
			this.type = _cfg.type;
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		productChooseWindow.superclass.constructor.call(this, {
			id : 'productChooseWindow'+this.operationType,
			iconCls : 'btn-tree-team30',
			layout : 'form',
			items : [this.gridPanel1,this.gridPanel2],
			modal : true,
			frame:true,
			autoScroll:true,
			autoHeight:true,
			width : 900,
			maximizable : true,
			frame:true,
			resizable:false,
			title : '产品选择',
			buttonAlign : 'center'
		});
	},
	initComponents : function() {
		//推荐产品工具栏
		this.topbar1 = new Ext.Toolbar({
			items : [{xtype: 'tbtext', text: '推荐产品'}]
		});
		//推荐产品
		this.gridPanel1 = new HT.GridPanel({
			name : 'SmallProjectGrid',
			region : 'center',
			tbar : this.topbar1,
			notmask : true,
			height:300,
			rowActions : false,
      	    viewConfig:{
      	    	forceFit : false
      	    },
			url : __ctxPath + "/project/approveProjectListSlSmallloanProject.do",
			baseParams : {
				'projectStatus' : this.projectStatus,
				'isAll' : this.isGrantedShowAllProjects
			},
			fields : [{
				name : 'runId',
				type : 'int'
			}, 'projectId','appUserName','createDate'],
			columns : [{
				header : 'runId',
				dataIndex : 'runId',
				hidden : true
			},{
				header : '贷款机构',
				width : 290,
				dataIndex : 'orgName'
			}, {
				header : '贷款产品',
				width : 290,
				dataIndex : 'projectNumber'
			}, {
				header : '产品手册',
				width : 290,
				dataIndex : 'projectName'
			}]
		});
		
		
		//所有产品工具栏
		this.topbar2 = new Ext.Toolbar({
			items : [{xtype: 'tbtext', text: '所有产品'}]
		});
		//所有产品
		this.gridPanel2 = new HT.GridPanel({
			name : 'SmallProjectGrid',
			region : 'center',
			tbar : this.topbar2,
			notmask : true,
			height:300,
			rowActions : false,
      	    viewConfig:{
      	    	forceFit : false
      	    },
			url : __ctxPath + "/project/approveProjectListSlSmallloanProject.do",
			baseParams : {
				'projectStatus' : this.projectStatus,
				'isAll' : this.isGrantedShowAllProjects
			},
			fields : [{
				name : 'runId',
				type : 'int'
			}, 'projectId','appUserName','createDate'],
			columns : [{
				header : 'runId',
				dataIndex : 'runId',
				hidden : true
			},{
				header : '贷款机构',
				width : 290,
				dataIndex : 'orgName'
			}, {
				header : '贷款产品',
				width : 290,
				dataIndex : 'projectNumber'
			}, {
				header : '产品手册',
				width : 290,
				dataIndex : 'projectName'
			}]
		});
	},

	save : function(formPanel, window) {
	
	},
	reset : function(formPanel) {
		formPanel.getForm().reset();
	},
	cancel : function(win) {
		win.close()
	}
})