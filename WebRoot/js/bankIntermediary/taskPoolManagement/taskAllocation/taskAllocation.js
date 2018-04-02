/**
 * 导航－金融中介管理
 * 	   ---审批项目查询
 * @extends Ext.Panel
 */
taskAllocation = Ext.extend(Ext.Panel, {
	projectStatus : 0,
	// 构造函数
	constructor : function(_cfg) {
	 
		switch (this.projectStatus) {
			case 0 :
				this.titlePrefix = "待办任务分配";
				this.tabIconCls = "btn-tree-team17";
				this.isHiddenBd = false;
				this.isHiddenAn = false;
				break;
		}
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();

		// 调用父类构造
		taskAllocation.superclass.constructor.call(this, {
			id : 'ApproveProjectManager_' + this.projectStatus,
			title : this.titlePrefix,
			region : 'center',
			layout : 'border',
			iconCls : this.tabIconCls,
			items : [{
				xtype : 'label',
				text : '对不起，您能查看的项目数为0。如有错误，请与系统管理员联系，看您的上下级关系是否设置正确!(查询授权规律为：您可以查看自己或您下属的项目)',
				hidden : true
			}, this.searchPanel, this.gridPanel]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var anchor = '100%';
		var startDate = {
			columnWidth : .14,
			labelAlign : 'right',
			xtype : 'container',
			layout : 'form',
			labelWidth : 60,
			defaults : {
				anchor : anchor
			},
			items : [{
				fieldLabel : this.dateLabel,
				name : this.startDateName,
				xtype : 'datefield',
				format : 'Y-m-d'

			}]
		};
		var endDate = {
			columnWidth : .112,
			labelAlign : 'right',
			xtype : 'container',
			layout : 'form',
			labelWidth : 25,
			defaults : {
				anchor : anchor
			},
			items : [{
				fieldLabel : '到',
				name : this.endDateName,
				xtype : 'datefield',
				labelSeparator : "",
				format : 'Y-m-d'
			}]
		};
		this.isHiddenBranch = true;
		if (RoleType == "control") {// 此用户角色为管控角色
			this.isHiddenBranch = false;
		}
		this.searchPanel = new Ext.FormPanel({
			layout : 'column',
			region : 'north',
			border : false,
			height : 80,
			anchor : '96%',
			layoutConfig: {
               align:'middle'
            },
             bodyStyle : 'padding:10px 10px 10px 10px',
            items : [{
					name : 'projectStatus',
					xtype : 'hidden',
					value : this.projectStatus
				}, {
					name : 'isAll',
					xtype : 'hidden',
					value : this.isGrantedShowAllProjects
				},{
		     		columnWidth :.25,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items : [{
						fieldLabel : '项目编号',
						name : 'projectNumber',
						anchor : "100%",
						xtype : 'textfield'
					}]
		     	},{
		     		columnWidth :.25,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items :[{
						fieldLabel : '项目名称',
						name : 'projectName',
						anchor : "98%",
						xtype : 'textfield'
					}]
		     	},{
		     		columnWidth :.25,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items:[{
						xtype : 'combo',
						mode : 'local',
						valueField : 'id',
						editable : false,
						displayField : 'value',
						store : new Ext.data.SimpleStore({
							fields : ["value","id"],
							data : [["企业","company_customer"], ["个人","person_customer"]]
						}),
						triggerAction : "all",
						hiddenName : 'oppositeTypeValue',
						anchor : "98%",
						fieldLabel : '客户类别'
					}]
	     		},{
	     			columnWidth :.2,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items : [{
						fieldLabel : '客户',
						name : 'customerName',
						anchor : "100%",
						xtype : 'textfield'
					}]
	     		},{
	     			columnWidth :this.isHiddenBranch ?.05:.25,
					layout : 'form',
					border : false,
					items :[{
						text : '查询',
						xtype : 'button',
						scope : this,
						width : 30,
						style : 'margin-left:5px',
						iconCls : 'btn-reset',
						handler : this.search
					}]
	     		},{
	     			columnWidth :.14,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items :[{
						fieldLabel : '金额范围',
						name : 'projectMoneyMin',
						anchor : "100%",
						xtype : 'numberfield'
					}]
	     		},{
	     			columnWidth :.11,
					layout : 'form',
					labelWidth : 20,
					labelAlign : 'right',
					border : false,
					items :[{
						fieldLabel : '到',
						labelSeparator : "",
						name : 'projectMoneyMax',
						anchor : "100%",
						xtype : 'numberfield'
					}]
	     		},{
	     			columnWidth :.25,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items :[{
					//	name : 'businessManager',
						xtype : 'trigger',
						fieldLabel : '客户经理',
						submitValue : true,
						triggerClass : 'x-form-search-trigger',
						editable : false,
						scope : this,
						anchor : "100%",
						onTriggerClick : function() {
							var obj = this;
							var appuerIdObj = obj.nextSibling();
							var userIds = appuerIdObj.getValue();
							if ("" == obj.getValue()) {
								userIds = "";
							}
							new UserDialog({
								userIds : userIds,
								userName : obj.getValue(),
								single : false,
								title : "选择客户经理",
								callback : function(uId, uname) {
									obj.setValue(uId);
									obj.setRawValue(uname);
									appuerIdObj.setValue(uId);
								}
							}).show();

						}
					}, {
						xtype : "hidden",
						name : 'businessManager'
					}]
	     		},{
					columnWidth :.25,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items : [{
						fieldLabel : '所属部门',
						xtype : "combo",
						anchor : "98%",
						hiddenName : "departId",
						displayField : 'orgName',
						editable : false,
						mode : 'remote',
//						name :"orgUserId",
						valueField : 'orgId',
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath+ '/system/getOrgListOrganization.do',
							fields : ['orgId', 'orgName']
						})
					}]
				},{
	     			columnWidth :.2,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items : [{
						xtype:'hidden',
						name:'productId'
					},{
						xtype : 'combo',
						fieldLabel : '产品名称',
						hiddenName : 'productName',
						displayField : 'productName',
						valueField : 'productName',
						fieldLabel : "产品类型",
						editable : false,
						anchor : "100%",
						triggerAction : 'all',
						/*store : new Ext.data.JsonStore({
							url : __ctxPath+ "/system/list2BpProductParameter.do",
							totalProperty : 'totalCounts',
							autoLoad : true,
							root : 'result',
							fields : [{
									name : 'id'
								}, {
									name : 'productName'
								}]
							}),*/
						listeners : {
							scope : this,
							select : function(combox, record) {
								var st = combox.getStore();
								var obj = this.getCmpByName("productId");
								obj.setValue(record.data.id);
							}
						}
					}]
	     		}/*,{
					columnWidth : .2,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					hidden:true,
					items : [{
						xtype : "dickeycombo",
						hiddenName : "archivesBelonging",
						nodeKey : 'archivesBelonging', // xx代表分类名称
						fieldLabel : "档案归属地",
						readOnly : this.isRead,
						editable : false,
						anchor : "100%",
						listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									combox.setValue(combox.getValue());
									combox.clearInvalid();
								})
					       }
						}
				
					}]
				}, this.isHiddenBranch == false ?{
					columnWidth :.18,
					layout : 'form',
					labelWidth : 80,
					labelAlign : 'right',
					border : false,
					items : [{
						fieldLabel : '所属分公司',
						xtype : "combo",
						anchor : "100%",
						hiddenName : "companyId",
						displayField : 'companyName',
						name :"companyId",
						valueField : 'companyId',
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath
									+ '/system/getControlNameOrganization.do',
							fields : ['companyId', 'companyName']
						})
					}]
				}:{ 
					columnWidth:0.001,
			     	border:false
		     	}*/,{
	     			columnWidth :this.isHiddenBranch ?.05:.25,
					layout : 'form',
					border : false,
					items :[{
						text : '重置',
						xtype : 'button',
						scope : this,
						width : 30,
						style : 'margin-left:5px',
						iconCls : 'btn-reset',
						handler : this.reset
					}]
	     		}]
		});

		this.topbar = new Ext.Toolbar({
			items : [{
				iconCls : 'btn-edit',
				text : '分配',
				xtype : 'button',
				scope : this,
				hidden : isGranted('ApproveProject_see_' + this.projectStatus)? false: true,
				handler : function() {
					seeProjectInfoByFileName(this.gridPanel,'ApproveProjectInfoPanel',"see")
				}
			}, new Ext.Toolbar.Separator({
				hidden : !isGranted('ApproveProject_edit_' + this.projectStatus)
			}), {
				iconCls : 'btn-edit',
				text : '转让',
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
				iconCls : 'btn-edit',
				text : '业务方案制定',
				xtype : 'button',
				hidden : false,
				scope : this,
				handler : function() {
					new businessPlanCustomizationFrom().show();
					//打开业务定制页面
					
					/*var selRs = this.gridPanel.getSelectionModel().getSelections();
					if (selRs.length == 0) {
						Ext.ux.Toast.msg('操作信息', '请选择一条记录！');
						return;
					}
					if (selRs.length > 1) {
						Ext.ux.Toast.msg('操作信息', '只能选择一条记录！');
						return;
					}*/
					
					//var record = this.gridPanel.getSelectionModel().getSelected();
				}
			}]
		});
		
		this.gridPanel = new HT.GridPanel({
			name : 'SmallProjectGrid',
			region : 'center',
			tbar : this.topbar,
			notmask : true,
			// 不适用RowActions
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
			}, {
				header : 'projectId',
				dataIndex : 'projectId',
				hidden : true
			},{
				header : '银行专员',
				width : 180,
				align:'center',
				dataIndex : 'orgName'
			}, {
				header : '客户经理',
				width : 180,
				align:'center',
				dataIndex : 'projectNumber'
			}, {
				header : '客户来源',
				width : 180,
				align:'center',
				dataIndex : 'projectName'
			},{
				header : '姓名',
				width : 180,
				align:'center',
				dataIndex : 'productTypeName'
			},{
				header : '借款金额',
				width : 180,
				align:'center',
				dataIndex : 'oppositeType'
			}, {
				header : '借款期限',
				width : 180,
				align:'center',
				dataIndex : 'customerName'
			},{
				header : '申请产品',
				width : 180,
				align:'center',
				dataIndex : 'customerName'
			}, {
				header : '有无房产',
				width : 180,
				align:'center',
				dataIndex : 'appUserName'
			}]
		});
		this.gridPanel.addListener('afterrender', function() {/*
			this.loadMask1 = new Ext.LoadMask(this.gridPanel.getEl(), {
				msg : '正在加载数据中······,请稍候······',
				store : this.gridPanel.store,
				removeMask : true
					// 完成后移除
					});
			this.loadMask1.show(); // 显示

		*/}, this);

	},// end of the initComponents()
	
		// 查看意见与说明记录 
	flowRecords : function() {
		var selRs = this.gridPanel.getSelectionModel().getSelections();
		if (selRs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择记录！');
			return;
		}
		if (selRs.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选择一条记录！');
			return;
		}
		var runId =selRs[0].get('runId');
		var businessType=selRs[0].get('businessType');
		new SlProcessRunView({
						runId : runId,
						businessType : businessType
					}).show();
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
