businessPlanCustomizationFrom = Ext.extend(Ext.Window, {
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
		businessPlanCustomizationFrom.superclass.constructor.call(this, {
			id : 'businessManagementFrom'+this.operationType,
			iconCls : 'btn-tree-team30',
			layout : 'form',
			items : [this.gridPanel],
			modal : true,
			frame:true,
			autoScroll:true,
			autoHeight:true,
			width : 900,
			maximizable : true,
			frame:true,
			resizable:false,
			title : '业务方案制定',
			buttonAlign : 'center'
		});
	},
	initComponents : function() {
		
		this.topbar = new Ext.Toolbar({
			items : [{
				iconCls : 'btn-add',
				text : '增加',
				xtype : 'button',
				scope : this,
				hidden : false,
				handler : function() {
					new editbusinessPlanCustomization().show();
				}
			}, new Ext.Toolbar.Separator({
				hidden : !isGranted('ApproveProject_edit_' + this.projectStatus)
			}), {
				iconCls : 'btn-edit',
				text : '编辑',
				xtype : 'button',
				hidden : isGranted('ApproveProject_edit_' + this.projectStatus)
						? false
						: true,
				scope : this,
				handler : function() {
					seeProjectInfoByFileName(this.gridPanel,'ApproveProjectInfoPanel','edit')
				}
			}, new Ext.Toolbar.Separator({
				hidden : !isGranted('ApproveProject_seeAgreements_' + this.projectStatus)
			}), {
				iconCls : 'btn-close',
				text : '删除',
				xtype : 'button',
				hidden : isGranted('ApproveProject_remove_' + this.projectStatus)? false: true,
				scope : this,
				handler : function() {
					var selRs = this.gridPanel.getSelectionModel().getSelections();
					if (selRs.length == 0) {
						Ext.ux.Toast.msg('操作信息', '请选择一条记录！');
						return;
					}
					if (selRs.length > 1) {
						Ext.ux.Toast.msg('操作信息', '只能选择一条记录！');
						return;
					}
					var record = this.gridPanel.getSelectionModel().getSelected();
					if(record.data.activityName=='项目资料录入'){
						Ext.Ajax.request({
							url : __ctxPath + '/creditFlow/endCreditProject.do',
							params : {
								taskId : record.data.taskId,
								runId : record.data.runId,
								projectId : record.data.projectId,
								businessType : record.data.businessType,
								comments : ''
							},
							scope : this,
							method : 'post',
							success : function(resp, op) {
								var res = Ext.util.JSON.decode(resp.responseText);
								if (res.success) {
									Ext.ux.Toast.msg('信息提示', '成功删除项目！');
									win.close();
									closeProjectInfoTab(this.projectId, this.idPrefix,this.idPrefix_edit);
									ZW.refreshTaskPanelView();
								} else {
									Ext.ux.Toast.msg('信息提示', '出错，请联系管理员！');
								}
							},
							failure : function() {
								Ext.ux.Toast.msg('信息提示', '出错，请联系管理员！');
							}
						});
					}else{
						Ext.ux.Toast.msg('操作信息', '已提交过【项目资料录入节点】,不允许删除!')
					}
				}
			}, new Ext.Toolbar.Separator({
				hidden : !isGranted('ApproveProject_remove_' + this.projectStatus)
			}),{
				iconCls : 'btn-detail',
				text : '查看借款意向',
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
				width : 160,
				dataIndex : 'orgName'
			}, {
				header : '贷款机构',
				width : 160,
				dataIndex : 'projectNumber'
			}, {
				header : '机构客户经理',
				width : 160,
				dataIndex : 'projectName'
			},{
				header : '借款金额',
				width : 160,
				dataIndex : 'productTypeName'
			},{
				header : '备注',
				width : 200,
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