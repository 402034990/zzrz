/**
 * 线下业绩明细表
 * @class OffLinePerformanceDetail
 * @extends Ext.Panel
 */

DbOffLinePerformanceDetail = Ext.extend(Ext.Panel, {
	constructor : function(config) {
		Ext.applyIf(this, config);
	
		this.initUIComponents();
		DbOffLinePerformanceDetail.superclass.constructor.call(this, {
			id : 'DbOffLinePerformanceDetail_'+this.type,
			height : 450,
			autoScroll : true,
			layout : 'border',
			title : this.type=='one'?'线下一级业绩明细表':'线下二级业绩明细表',
			iconCls : "btn-team23",
			items : [this.searchPanel, this.centerPanel]
		});
	},
	initUIComponents : function() {
		var isShow = false;
		if (RoleType == "control") {
			isShow = true;
		}
		this.pageSize = 25;
		this.store = new Ext.data.JsonStore({
			url : __ctxPath+ '/system/dbuserPerformanceListAppUser.do?type='+this.type,
			totalProperty : 'totalCounts',
			root : 'result',
			remoteSort : true,
			fields : [{name:'id'},{name : 'loginname'},{name:'bidNum'},{name:'bidPrice'},{name:'truename'},
					  {name:'truenameOne'},{name:'truenameSecond'},{name:'recommandPerson'},{name:'secondRecommandPerson'},
					  {name:'orgNameOne'},{name:'orgNameSecond'},{name:'roleName'}]
		});
		this.store.load({
			scope : this,
			params : {
				start : 0,
				limit : this.pageSize
			}
		});
		this.myMask = new Ext.LoadMask(Ext.getBody(), {
			msg : "加载数据中······,请稍后······"
		});

		// 查询面板
		this.searchPanel = new Ext.form.FormPanel({
			height : 45,
			region : "north",
			bodyStyle : 'padding:7px 0px 7px 10px',
			border : false,
			width : '100%',
			monitorValid : true,
			layout : 'column',
			defaults : {
				layout : 'form',
				border : false,
				bodyStyle : 'padding:5px 0px 0px 20px'
			},
			items : [isShow ? {
				columnWidth : 0.2,
				labelWidth : 65,
				bodyStyle : 'padding:5px 0px 0px 0px',
				items : [{
					xtype : "combo",
					anchor : "100%",
					fieldLabel : '所属分公司',
					hiddenName : "companyId",
					displayField : 'companyName',
					valueField : 'companyId',
					triggerAction : 'all',
					store : new Ext.data.SimpleStore({
						autoLoad : true,
						url : __ctxPath+ '/system/getControlNameOrganization.do',
						fields : ['companyId', 'companyName']
					})
				}]
			}: {columnWidth : 0.01}, {
				columnWidth : 0.15,
				labelWidth : 30,
				items : [{
					xtype : 'textfield',
					fieldLabel : '姓名',
					name : 'fullname',
					anchor : '90%'
				}]
			},{
				columnWidth : isShow ? 0.12 : 0.18,
				labelWidth : 70,
				items : [{
					xtype : 'textfield',
					fieldLabel : this.type=='one'?'一级推荐码':'二级推荐码',
					name : 'plainpassword',
					anchor : '100%'
				}]
			},{
				columnWidth : 0.18,
				layout : 'form',
				border : false,
				labelWidth : 50,
				labelAlign : 'right',
				items : [{
					name : 'registrationDate_GE',
					labelSeparator : '',
					xtype : 'datefield',
					format : 'Y-m-d',
					fieldLabel : '查询日期',
					anchor : '100%'
				}]
			}, {
				columnWidth : 0.13,
				layout : 'form',
				border : false,
				labelWidth : 10,
				labelAlign : 'right',
				items : [{
					name : 'registrationDate_LE',
					labelSeparator : '',
					xtype : 'datefield',
					format : 'Y-m-d',
					fieldLabel : '到',
					anchor : '100%'
				}]
			},{
				columnWidth : 0.07,
				items : [{
					xtype : 'button',
					text : '查询',
					tooltip : '根据查询条件过滤',
					iconCls : 'btn-search',
					width : 60,
					formBind : true,
					scope : this,
					handler : function() {
						this.searchByCondition();
					}
				}]
			}, {
				columnWidth : 0.07,
				items : [{
					xtype : 'button',
					text : '重置',
					width : 60,
					scope : this,
					iconCls : 'btn-reset',
					handler : this.reset
				}]
			}]
		}); // 查询面板结束

		// 加载数据
		/*this.store.load({
			scope : this,
			params : {
				start : 0,
				limit : this.pageSize,
				isAll : isGranted('_seeAll_erp')
			}
		});*/
		var personStore = this.store;
		var tbar = new Ext.Toolbar({
			items : [{
				text : '导出列表',
				iconCls : 'btn-xls',
				scope : this,
				hidden : isGranted('_exportPerformance_'+this.type) ? false : true,
				handler : function() {
					var companyId = (isShow==true?this.getCmpByName("companyId").getValue():null);
					var plainpassword=this.getCmpByName("plainpassword").getValue();//推荐码
					var fullname = this.getCmpByName("fullname").getValue();//姓名
					var registrationDateGE = this.getCmpByName("registrationDate_GE").getValue();
					var registrationDateLE = this.getCmpByName("registrationDate_LE").getValue();
					if(registrationDateGE){
						registrationDateGE=registrationDateGE.format('Y-m-d');
					}
					if(registrationDateLE){
						registrationDateLE=registrationDateLE.format('Y-m-d');
					}
					window.open(__ctxPath+ '/customer/exportDetailExcelBpCustRelation.do?type='+this.type+'&companyId='+companyId
								+'&plainpassword='+plainpassword+'&fullname='+fullname
								+'&registrationDateGE='+registrationDateGE
								+'&registrationDateLE='+registrationDateLE,'_blank');
				}
			}]
		});

		this.centerPanel = new HT.GridPanel({
			region : 'center',
			tbar : tbar,
			clicksToEdit : 1,
			store : this.store,
			isautoLoad:false,
			height : 450,
			loadMask : this.myMask,
			defaults : {
				sortable : true,
				menuDisabled : false
			},
			viewConfig : {
				forceFit : true,
				autoFill : true
			},
			columns : [{
				header : "所属分公司",
				width : 160,
				sortable : true,
				hidden : RoleType == "control" ? false : true,
				dataIndex : 'companyName'
			}, {
				header : "客户姓名",
				width : 100,
				sortable : true,
				dataIndex : 'truename'
			}, {
				header : "夺宝帐号",
				width : 100,
				sortable : true,
				dataIndex : 'loginname'
			}, {
				header : "夺宝次数",
				width : 100,
				sortable : true,
				dataIndex : 'bidNum'
			} ,{
				header : '人次',	
				dataIndex : 'bidPrice',
				width : 100
			},{
				hidden:this.type=='one'?false:true,
				header : this.type=='one'?"一级推荐人":'二级推荐人',
				width : 100,
				sortable : true,
				dataIndex : 'truenameOne'
			},{
				hidden:this.type=='one'?true:false,
				header : this.type=='one'?"一级推荐人":'二级推荐人',
				width : 100,
				sortable : true,
				dataIndex : 'truenameSecond'
			},{
				hidden:this.type=='one'?false:true,
				header : this.type=='one'?"一级推荐码":"二级推荐码",
				width : 100,
				sortable : true,
				dataIndex : 'recommandPerson'
			},{
				hidden:this.type=='one'?true:false,
				header : this.type=='one'?"一级推荐码":"二级推荐码",
				width : 100,
				sortable : true,
				dataIndex : 'secondRecommandPerson'
			},{
				header : "所属一级部门",
				width : 100,
				sortable : true,
				dataIndex : 'orgNameOne'
			},{
				header : "所属二级部门",
				width : 100,
				sortable : true,
				dataIndex : 'orgNameSecond'
			},{
				header : "角色",
				width : 100,
				sortable : true,
				dataIndex : 'roleName'
			}]
		});
	},

	// 查询
	searchByCondition : function() {
		this.store.baseParams.fullname = this.searchPanel.getForm().findField('fullname').getValue();
		this.store.baseParams.plainpassword = this.searchPanel.getForm().findField('plainpassword').getValue();
		this.store.baseParams.registrationDateGE = this.searchPanel.getForm().findField('registrationDate_GE').getValue();
		this.store.baseParams.registrationDateLE = this.searchPanel.getForm().findField('registrationDate_LE').getValue();
		if (null != this.searchPanel.getForm().findField('companyId')) {
			this.store.baseParams.companyId = this.searchPanel.getForm().findField('companyId').getValue();
		}
		this.store.load({
			scope : this,
			params : {
				start : 0,
				limit : this.pageSize
			}
		});
	},
	reset : function() {
		this.searchPanel.getForm().reset();
		debugger
		this.store.baseParams.fullname = this.searchPanel.getForm().findField('fullname').getValue();
		this.store.baseParams.plainpassword = this.searchPanel.getForm().findField('plainpassword').getValue();
		this.store.baseParams.registrationDateGE = this.searchPanel.getForm().findField('registrationDate_GE').getValue();
		this.store.baseParams.registrationDateLE = this.searchPanel.getForm().findField('registrationDate_LE').getValue();
		if (null != this.searchPanel.getForm().findField('companyId')) {
			this.store.baseParams.companyId = this.searchPanel.getForm().findField('companyId').getValue();
		}
		this.store.load({
			scope : this,
			params : {
				start : 0,
				limit : this.pageSize
			}
		});
	}
});