/**
 * @author
 * @class SlFundIntentView
 * @extends Ext.Panel
 * @description [SlFundIntent]管理
 * @company 智维软件
 * @createtime:
 */
WithinManager = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		if (typeof(_cfg.businessType) != "undefined") {
			this.businessType = _cfg.businessType;
		}
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		WithinManager.superclass.constructor.call(this, {
			id : 'WithinManager',
			title : '逾期查询',
			region : 'center',
			layout : 'border',
			iconCls : 'btn-team2',
			items : [/*this.searchPanel,*/ this.gridPanel]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel
		var businessType = this.businessType;
		var tabflag = this.tabflag;
		var labelsize = 70;
		var labelsize1 = 115;
		var isShow = false;
		if (RoleType == "control") {
			isShow = true;
		}
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
				columnWidth : 0.25,
				layout : 'form',
				border : false,
				labelWidth : labelsize,
				labelAlign : 'right',
				hidden : true,
				items : [{
					fieldLabel : '业务类别',
					name : 'Q_operationType_N_EQ',
					hiddenName : "Q_operationType_N_EQ",
					flex : 1,
					editable : false,
					width : 105,
					displayField : 'name',
					valueField : 'id',
					triggerAction : 'all',
					xtype : 'combo',
					mode : 'local',
					store : new Ext.data.SimpleStore({
						autoLoad : true,
						url : __ctxPath
								+ '/creditFlow/getBusinessTypeList1CreditProject.do',
						fields : ['id', 'name']
					}),
					anchor : '96%'
				}]
			}, {
				columnWidth : 0.24,
				layout : 'form',
				border : false,
				labelWidth : labelsize1,
				labelAlign : 'right',
				items : [{
					fieldLabel : '计划到账日：从',
					name : 'Q_intentDate_D_GE',
					labelSeparator : '',
					xtype : 'datefield',
					format : 'Y-m-d',
					anchor : '100%'
				}, {
					fieldLabel : '实际到账日：从',
					name : 'startFactDate',
					labelSeparator : '',
					xtype : 'datefield',
					format : 'Y-m-d',
					anchor : '100%'
				}]
			}, {
				columnWidth : 0.16,
				layout : 'form',
				border : false,
				labelWidth : 30,
				labelAlign : 'right',
				items : [{
					fieldLabel : '到',
					name : 'Q_intentDate_D_LE',
					labelSeparator : '',
					xtype : 'datefield',
					format : 'Y-m-d',
					anchor : '100%'
				}, {
					fieldLabel : '到',
					name : 'endFactDate',
					labelSeparator : '',
					xtype : 'datefield',
					format : 'Y-m-d',
					anchor : '100%'
				}]
			}, {
				columnWidth : 0.2,
				layout : 'form',
				border : false,
				labelWidth : labelsize,
				labelAlign : 'right',
				items : [{
					fieldLabel : '项目名称',
					name : 'Q_proj_Name_N_EQ',
					flex : 1,
					editable : false,
					width : 105,
					xtype : 'textfield',
					anchor : '100%'
				}, {
					fieldLabel : '项目编号',
					name : 'Q_projNum_N_EQ',
					flex : 1,
					editable : false,
					width : 105,
					xtype : 'textfield',
					anchor : '100%'
				}]
			}/*, {
				columnWidth : .2,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
				items : [this.businessType == 'SmallLoan' ? {
					xtype : 'lovcombo',
					fieldLabel : '项目属性',
					anchor : '96%',
					hiddenName : 'projectProperties',
					triggerAction : 'all',
					editable : false,
					readOnly : false,
					store : new Ext.data.ArrayStore({
						autoLoad : true,
						baseParams : {
							nodeKey : 'projectProperties'
						},
						url : __ctxPath+ '/system/loadIndepItemsDictionaryIndependent.do',
						fields : ['dicKey', 'itemValue']
					}),
					displayField : 'itemValue',
					valueField : 'dicKey',
					listeners : {
						afterrender : function(combox) {
							var st = combox.getStore();
						}
					}
				}: {
					border : false
				}, isShow ? {
					xtype : "combo",
					anchor : "96%",
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
				}: {
					border : false
				}]
			}*/, {
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
				}, {
					text : '重置',
					scope : this,
					iconCls : 'btn-reset',
					handler : this.reset
				}]
			}]
		});// end of searchPanel

		this.topbar = new Ext.Toolbar({
			items : [{
				iconCls : 'btn-user-sel',
				text : '流水对账',
				xtype : 'button',
				scope : this,
				hidden : isGranted('_liushui_f_interestIncome_'+ this.businessType) ? false : true,
				handler : this.openliushuiwin

			}, new Ext.Toolbar.Separator({
				hidden : isGranted('_liushui_f_interestIncome_'+ this.businessType) ? false : true
			}), {
				iconCls : 'btn-detail',
				text : '查看对账明细',
				xtype : 'button',
				scope : this,
				hidden : isGranted('_liushuisee_f_interestIncome_'+ this.businessType) ? false : true,
				handler : this.openliushuiwin1

			}, new Ext.Toolbar.Separator({
				hidden : isGranted('_liushuisee_f_interestIncome_'+ this.businessType) ? false : true
			}), {
				iconCls : 'btn-ok',
				text : '核销',
				xtype : 'button',
				scope : this,
				hidden : isGranted('_ping_f_interestIncome_'+ this.businessType) ? false : true,
				handler : this.pingAccount
			}, new Ext.Toolbar.Separator({
				hidden : isGranted('_ping_f_interestIncome_'+ this.businessType) ? false : true
			}), {
				iconCls : 'btn-tree-team28',
				text : '罚息对账',
				xtype : 'button',
				scope : this,
				type:0,
				hidden : isGranted('_fa_f_interestIncome_'+ this.businessType) ? false : true,
				handler : this.faxiAccount
			}, new Ext.Toolbar.Separator({
				hidden : isGranted('_fa_f_interestIncome_'+ this.businessType) ? false : true
			}), {
				iconCls : 'btn-tree-team28',
				text : '逾期对账',
				xtype : 'button',
				scope : this,
				type:1,
				hidden : isGranted('_YQ_f_interestIncome_'+ this.businessType) ? false : true,
				handler : this.faxiAccount
			}, new Ext.Toolbar.Separator({
				hidden : isGranted('_YQ_f_interestIncome_'+ this.businessType) ? false : true
			}), {
				iconCls : 'slupIcon',
				text : '上传/下载凭证',
				xtype : 'button',
				scope : this,
				hidden : isGranted('_uploaddownpz_f_interestIncome_'+ this.businessType) ? false : true,
				handler : this.upload
			}, new Ext.Toolbar.Separator({
				hidden : (isGranted('_uploaddownpz_f_interestIncome_'+ this.businessType) ? false : true)
						|| (isGranted('_previewpz_f_'+ this.businessType)? false: true)
			}), {
				iconCls : 'btn-setting',
				text : '预览凭证',
				xtype : 'button',
				scope : this,
				hidden : isGranted('_previewpz_f_interestIncome_'+ this.businessType) ? false : true,
				handler : this.preview
			}, {
				iconCls : 'btn-xls',
				text : '导出到Excel',
				xtype : 'button',
				scope : this,
				handler : this.exportExcel
			}]
		});
				
		var summary = new Ext.ux.grid.GridSummary();
		function totalMoney(v, params, data) {
			return '总计';
		}		
		
		this.gridPanel = new HT.GridPanel({
			bodyStyle : "width : 100%",
			region : 'center',
//			tbar : this.topbar,
//			plugins : [summary],
			viewConfig : {
				forceFit : false,
            	getRowClass: function(record, index,rp,ds) {
            	 	var v=record.get('factDate');
            	 	if(v!=null){
   						return ""
            	 	}else {
            	 		var intentDate=record.get('graceDay');
            	 		if(intentDate==null){
            	 			intentDate=record.get('intentDate');
            	 		}
	                    if(new Date(intentDate)<new Date()){
	                    	return 'x-grid-record-red';
	                    }else{
	                    	return ""
	                    }
            	 	}
		        }
			},
			rowActions : false,
			loadMask : true,
			id : 'SlFundIntentGrid1interestincome',
			isautoLoad : true,
			url : __ctxPath+ "/creditFlow/finance/overdueMoneySlFundIntent.do",
			fields : [{
						name : 'fundIntentId',
						type : 'int'
					},'customerName','carNo','modelName','oppositeType','projectMoney','startDate'
					 ,'intentDate','accrualtype','yuqipayMoney','tinashu','notMoney','yewu','teamManagerName','departMentName'
					],
			columns : [{
						header : 'fundIntentId',
						dataIndex : 'fundIntentId',
						hidden : true
					}, {
						header : "客户名称",
						sortable : true,
						width : 120,
//						hidden : RoleType == "control" ? false : true,
						dataIndex : 'customerName'
					}, {
						header : '车牌',
						dataIndex : 'carNo',
						width : 120
					}, {
						header : '车辆型号',
						dataIndex : 'modelName',
						width : 120
					}, {
						header : '客户类型',
						dataIndex : 'oppositeType',
						renderer:function(v){
							 if(v=="person_customer"){
							     return "个人";
							 }else {
							 	  return "企业";
							 }
						},
//						summaryType : 'count',
//						summaryRenderer : totalMoney,
						width : 120
					}, {
						header : '借款本金',
						dataIndex : 'projectMoney',
						align : 'right',
						width : 120,
						summaryType: 'sum',
						renderer : function(v) {
							return Ext.util.Format.number(v, ',000,000,000.00')+ "元"
						}
					}, {
						header : '借款日期',
						width : 120,
						dataIndex : 'startDate',
						format:'Y-m-d',
						align : 'center'
					}, {
						header : '还款日期',
						width : 120,
						dataIndex : 'intentDate'
					}, {
						header : '还款方式',
						dataIndex : 'accrualtype',
						renderer:function(v){
						 if(v=="singleInterest"){
							return "按期收息,期末收本";
							}else {
						    return"等本等息";
							}
						},
//						format : 'Y-m-d',
						width : 120
					},/* {
						header : '剩余期数',
						dataIndex : 'interestEndTime',
						format : 'Y-m-d',
						width : 120
					}, {
						header : '剩余本金',
						dataIndex : 'afterMoney',
						width : 120,
						align : 'right',
						summaryType: 'sum',
						renderer : function(v) {
							return Ext.util.Format.number(v, ',000,000,000.00')+ "元"
						}
					}, */{
						header : '逾期天数(天)',
						dataIndex : 'tinashu',
						align : 'right',
						width : 120,
						sortable : true
//						summaryType: 'sum',
//						renderer : function(v) {
//							return Ext.util.Format.number(v,',000,000,000.00')+ "元"
//						}
					}, {
						header : '逾期本金',
						dataIndex : 'notMoney',
						align : 'right',
						width : 120,
						summaryType: 'sum',
						renderer : function(v) {
							return Ext.util.Format.number(v, ',000,000,000.00')+ '元'
						}
					},{
						header : '逾期利息',
						dataIndex : 'yuqipayMoney',
						align : 'right',
						width : 120,
						summaryType: 'sum',
						renderer:function(v){
							if(v){
	                           return Ext.util.Format.number(v,',000,000,000.00')+"元";
							}else{
								return Ext.util.Format.number(0,',000,000,000.00')+"元";
							}
	                 	}	
					},/* {
						header : '逾期期数',
						dataIndex : 'continueDay',
						align : 'right',
						width : 120,
						renderer : function(v, metadata, record) {
							var d0 = record.get('intentDate');
							if (d0 == v) {
								return "无顺延";
							} else {
								return v;
							}
						}
					}, */{
						header : '审批人员初审',
						dataIndex : 'graceDay',
						align : 'right',
						width : 120
					}, {
						header : '催收人员',
						width : 120,
						dataIndex : 'accrualMoney',
						align : 'right',
						summaryType: 'sum',
						renderer : function(value, metadata, record, rowIndex,colIndex) {}
					}, {
						header : '业务员',
						width : 120,
						dataIndex : 'yewu',
						align : 'right'
//						summaryType: 'sum',
//						renderer : function(value, metadata, record, rowIndex,colIndex) {}
					}, {
						header : '团队长',
						width : 120,
						dataIndex : 'teamManagerName',
						align : 'right'
//						summaryType: 'sum',
//						renderer : function(value, metadata, record, rowIndex,colIndex) {}
					}, {
						header : '所属门店',
						width : 120,
						dataIndex : 'departMentName',
						align : 'right'
//						summaryType: 'sum',
//						renderer : function(value, metadata, record, rowIndex,colIndex) {}
					}, {
						header : '备注',
						width : 120,
						dataIndex : 'remark',
						align : 'center',
						hidden : false
					}]
		});

		this.gridPanel.addListener('cellclick', this.cellClick);

	},// end of the initComponents()
	reset : function() {},
	// 按条件搜索
	search : function() {},
	getfundType : function() {},
	//流水对账
	openliushuiwin : function() {},
	//单笔款项对账
	oneopenliushuiwin : function() {},
	//多笔款项对账
	manyInntentopenliushuiwin : function() {},
	//查看对账明细
	openliushuiwin1 : function(record, flag) {},
	//核销
	pingAccount : function(record) {},
	//罚息弹窗
	faxiAccount : function(v) {},
	upload : function(record) {},
	preview : function(record) {},
	exportExcel:function(){}
});