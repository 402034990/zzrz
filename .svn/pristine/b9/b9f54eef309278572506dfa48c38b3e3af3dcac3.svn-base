businessStatusRegisterFrom = Ext.extend(Ext.Window, {
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
		businessStatusRegisterFrom.superclass.constructor.call(this, {
			id : 'businessManagementFrom'+this.operationType,
			iconCls : 'btn-tree-team30',
			layout : 'form',
			items : [this.gridPanel],
			modal : true,
			frame:true,
			autoScroll:true,
			autoHeight:true,
			autowidth : true,
			maximizable : true,
			frame:true,
			resizable:false,
			title : '业务状态登记',
			buttonAlign : 'center'
		});
	},
	initComponents : function() {
		
		//查看借款意向
		this.seeBorrowingIntentions =function(){
		
			//打开借款意向界面
			new seeBorrowingIntentionsWindow().show();
			
		}
		
		this.topbar = new Ext.Toolbar({
			items : [{
				iconCls : 'btn-detail',
				text : '查看借款意向',
				xtype : 'button',
				scope : this,
				hidden : false,
				handler : this.seeBorrowingIntentions
						
			}, new Ext.Toolbar.Separator({
				hidden : !isGranted('ApproveProject_edit_' + this.projectStatus)
			}), {
				iconCls : 'btn-detail',
				text : '查看产品手册',
				xtype : 'button',
				scope : this,
				hidden : isGranted('ApproveProject_seeAgreements_'+ this.projectStatus)
									? false
									: true,
				handler : this.flowRecords
						
			}]
		});
		
		this.gridPanel = new HT.GridPanel({
			name : 'SmallProjectGrid',
			region : 'center',
			tbar : this.topbar,
			notmask : true,
			height:500,
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
				header : '贷款产品',
				width : 120,
				dataIndex : 'orgName'
			}, {
				header : '贷款机构',
				width : 120,
				dataIndex : 'projectNumber'
			}, {
				header : '机构客户经理',
				width : 120,
				dataIndex : 'projectName'
			},{
				header : '借款金额',
				width : 120,
				dataIndex : 'productTypeName'
			},{
				header : '办理状态',
				width : 120,
				dataIndex : 'productTypeName'
			},{
				header : '进件日期',
				width : 120,
				dataIndex : 'productTypeName'
			},{
				header : '审批日期',
				width : 120,
				dataIndex : 'productTypeName'
			},{
				header : '放款日期',
				width : 120,
				dataIndex : 'productTypeName'
			},{
				header : '放款金额',
				width : 120,
				dataIndex : 'productTypeName'
			},{
				header : '备注',
				width : 150,
				dataIndex : 'productTypeName'
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