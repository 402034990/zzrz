/**
 * 保证金收入支出台账
 * @class CashDetail
 * @extends Ext.panel
 */
BailLedger=Ext.extend(Ext.Panel,{
	constructor:function(_cfg){
		
		Ext.applyIf(this,_cfg);
		
		//初始化组件
		this.initUIComponents();
		
		//调用父类构造
		BailLedger.superclass.constructor.call(this,{
			id:'BailLedger',
			title : '保证金台账',
			region : 'center',
			layout : 'border',
			iconCls :'btn-team2',
			items : [this.searchPanel, this.gridPanel]
		});
	},
	initUIComponents:function(){
		
		this.searchPanel = new HT.SearchPanel({
			layout : 'column',
			region : 'north',
			height : 20,
			anchor : '100%',
			items:[{
				columnWidth : 0.22,
				layout : 'form',
				border : false,
				labelWidth : 100,
				labelAlign : 'right',
				items : [ {
					labelWidth:70,    
					fieldLabel : '保证金账户名',
					name : 'cashName',
					flex : 1,
					editable : false,
					width:105,
					xtype :'textfield',
					anchor : '96%'
				},{
					labelWidth:70,    
					fieldLabel : '客户名称',
					name : 'customerName',
					flex : 1,
					editable : false,
					width:105,
					xtype :'textfield',
					anchor : '96%'
				}] 
			},{   
				columnWidth : 0.22,
				layout : 'form',
				border : false,
				labelWidth : 100,
				labelAlign : 'right',
				items : [{
				    fieldLabel : '计划到账日期：从',
				    labelSeparator : '',
					name : 'intentDateGE',
					xtype : 'datefield',
					format : 'Y-m-d',
					anchor : '96%'
				},{
				    fieldLabel : '实际到账日期：从',
				    labelSeparator : '',
					name : 'startFactDate',
					xtype : 'datefield',
					format : 'Y-m-d',
					anchor : '96%'
				}] 
			},{   
				columnWidth : 0.22,
				layout : 'form',
				border : false,
				labelWidth : 100,
				labelAlign : 'right',
				items : [ {
				    fieldLabel : '到',
				    labelSeparator : '',
					name : 'intentDateLE',
					xtype : 'datefield',
					format : 'Y-m-d',
					anchor : '96%'
				},{
				    fieldLabel : '到',
				    labelSeparator : '',
					name : 'endFactDate',
					xtype : 'datefield',
					format : 'Y-m-d',
					anchor : '96%'
				}] 
			},{
				columnWidth : 0.22,
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
				},{
					style : 'padding-top:3px;',
					text : '重置',
					scope : this,
					iconCls : 'reset',
					handler : this.reset
				}]
			}]
		});
		
		this.topbar = new Ext.Toolbar({
			items : [{
				iconCls : 'btn-user-sel',
				text : '流水对账',
				xtype : 'button',
				scope : this,
				hidden : isGranted('_bailLedger_reconciliation') ? false : true,
				handler : this.openliushuiwin
			}/*, new Ext.Toolbar.Separator({
				hidden : isGranted('_bailLedger_reconciliation') ? false : true
			}),{
				iconCls : 'btn-detail',
				text : '查看对账明细',
				xtype : 'button',
				scope : this,
				hidden : isGranted('_see_reconciliation') ? false : true,
				handler : this.seeDetail
			}*/]
		});
		
		var summary = new Ext.ux.grid.GridSummary();
		function totalMoney(v, params, data) {
			return '总计';
		}
		
		this.gridPanel = new HT.GridPanel({
			bodyStyle : "width : 100%",
			region : 'center',
			tbar : this.topbar,
			isautoLoad:true,
			plugins : [summary],
			viewConfig: {  
            	forceFit:false  
            },
			rowActions : false,
			loadMask : true,
			width : 800,
			id : 'BailLedgerGridPanel',
			url : __ctxPath+ "/deatil/queryListCashdetail.do",
			fields : [{
				name : 'id',
				type : 'int'
			},'cashdepositid','cashName','customerName','incomeMoney','payMoney','createDate','factDate','afterMoney','notMoney'],
			columns : [{
				header:'id',
				dataIndex : 'id',
				hidden:true
			},{
				header : '保证金账户名',
				dataIndex : 'cashName',
				width : 135
			},{
				header : '客户名称',
				dataIndex : 'customerName',
				width : 135
			},{
				header : '缴纳金额(元)',
				dataIndex : 'incomeMoney',
				width : 135,
				renderer : function(v) {
					if (v != null) {
						return Ext.util.Format.number(v,',000,000,000.00')+ "元"
					} else {
						return v
					}
				}
			},{
				header : '支出金额(元)',
				dataIndex : 'payMoney',
				width : 132,
				renderer : function(v) {
					if (v != null) {
						return Ext.util.Format.number(v,',000,000,000.00')+ "元"
					} else {
						return v
					}
				}
			},{
				header : '计划日期',
				dataIndex : 'createDate',
				width : 140
			},{
				header : '实际到账日',
				dataIndex : 'factDate',
				width : 140
			},{
				header : '已对账金额(元)',
				dataIndex : 'afterMoney',
				width : 140,
				renderer : function(v) {
					if (v != null) {
						return Ext.util.Format.number(v,',000,000,000.00')+ "元"
					} else {
						return v
					}
				}
			},{
				header : '未对账金额(元)',
				dataIndex : 'notMoney',
				width : 140,
				renderer : function(v) {
					if (v != null) {
						return Ext.util.Format.number(v,',000,000,000.00')+ "元"
					} else {
						return v
					}
				}
			}]
		});
	},
	search : function() {
		$search({
			searchPanel : this.searchPanel,
			gridPanel : this.gridPanel
		});
	},
	reset : function() {
		this.searchPanel.getForm().reset();
		$search({
			searchPanel : this.searchPanel,
			gridPanel : this.gridPanel
		});
	},
	openliushuiwin : function() {
		var s = this.gridPanel.getSelectionModel().getSelections();
		if (s <= 0) {
			Ext.ux.Toast.msg('操作信息','请选中记录');
			return false;
		}else if(s.length>1){
			Ext.ux.Toast.msg('操作信息','每次只能选择一条记录进行对账');
			return false;
		}else if(s.length==1){
			var record = s[0];
			var flag = 0; //incomeMoney
			if (record.data.payMoney != 0) { //payMoney
				flag = 1;
			}
			if(record.data.notMoney==0){
				Ext.ux.Toast.msg('操作信息','该记录已对过账!');
			}else{
				new BailFundForm({
					fundIntentId : record.data.id,
					fundType : 'bail',
					notMoney : record.data.notMoney,
					flag : flag,
					businessType : "SmallLoan",
					companyId : 1,
					parentPanel:this.gridPanel
				}).show();
			}
		}
	},
	seeDetail:function(v){
		var s = this.gridPanel.getSelectionModel().getSelections();
		if (s <= 0) {
			Ext.ux.Toast.msg('操作信息','请选中记录');
			return false;
		}else if(s.length>1){
			Ext.ux.Toast.msg('操作信息','每次只能选择一条记录进行对账');
			return false;
		}else if(s.length==1){
			var record = s[0];
			if(record.data.notMoney>0){
				Ext.ux.Toast.msg('操作信息','该记录还未对账!');
				return;
			}else{
				new BailFundDetail({
					cashdepositid:record.data.cashdepositid
				}).show();
			}
		}
	}
});