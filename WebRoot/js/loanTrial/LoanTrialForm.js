/**
 * @author penglili
 * @createtime
 * @class LoanTrialForm
 * @extends Ext.Window
 * @description LoanTrialForm表单
 * @company 互融软件
 */
LoanTrialForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		LoanTrialForm.superclass.constructor.call(this, {
			id:'LoanTrialFormPanel',
			iconCls:'menu-product',
			border : false,
            title: "贷款试算器", 
            autoScroll: true, 
            maximizable :true,
            height:550,
            width:1000,  
            modal : false,
            labelWidth:45,  
            plain:true,  
            resizable:true,  
            frame:true,
            closable:true,
            items:[
	                 this.formPanel
	            ],
			buttonAlign : 'center',
			buttons : [{
				text : '生成合计',
				iconCls : 'btn-ok',
				handler : this.autocreate.createCallback(this.formPanel, this)
			}, '-',{
				text : '生成分录',
				iconCls : 'btn-ok',
				handler : this.autocreateSum.createCallback(this.formPanel, this)
			}, '-', {
				text : '重置',
				iconCls : 'btn-reset',
				handler : this.reset.createCallback(this.formPanel)
			}, '-', {
				text : '分录导出',
				iconCls : 'btn-xls',
				handler : this.toExcelautocreate.createCallback(this.formPanel,this)
			}, '-', {
				text : '合计导出',
				iconCls : 'btn-xls',
				handler : this.toExcelSumautocreate.createCallback(this.formPanel,this)
			}]

		});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		
		var projectInfoFinance= new LoanTrialFormPanel({//
			isSumReadOnly:false,
			isModelHidden:true,
			isCheckHidden : true,
			isFixedHidden:true,
			isPayaccrualTypeHidden : true
		});
		var gridPanel = new LoanTrialFormGrid({
			defineForm:'bpFundIntentInitParameter',
			hiddenGrid : true,
			hiddenbbar : true
		});
		var gridPanelSum = new LoanTrialFormGridSum({
			defineForm:'bpFundIntentInitParameter'
		});
		this.formPanel=  new Ext.FormPanel({
			modal : true,
			labelWidth : 100,
			frame:true,
			layout : 'form',
			border : false,
			autoHeight: true,  
			defaults : {
				anchor : '100%',
				xtype : 'fieldset',
				columnWidth : 1,
				labelAlign : 'right',
				collapsible : true,
				autoHeight : true
			},
			items : [{
				title : '资金款项信息',
				xtype : 'fieldset',
				autoHeight : true,
				name:"historyfinance",
				collapsible : true,
				width : '100%',
				bodyStyle : 'padding-left:8px',
				items : [ projectInfoFinance,gridPanelSum,gridPanel]
			}]
        })
	},
	//生成合计
	autocreate : function(formPanelData,thisPanel) {
		var intentobj=formPanelData.items.get(0).get(1);
		var intentobj2=formPanelData.items.get(0).get(2);
		intentobj2.hide();
		intentobj.show();
		intentobj.autocreate();
	},
	//生成分录
	autocreateSum : function(formPanelData,thisPanel) {
		var intentobj=formPanelData.items.get(0).get(2);
		var intentobj2=formPanelData.items.get(0).get(1);
		intentobj2.hide();
		intentobj.show();
		intentobj.autocreate();
	},
	//重置
	reset : function(formPanelData) {
		var financeObj=formPanelData.items.get(0).get(0);
		
		financeObj.getCmpByName("bpFundIntentInitParameter.yearModel").setValue(null);
		financeObj.getCmpByName("bpFundIntentInitParameter.monthModel").setValue(null);
		financeObj.getCmpByName("bpFundIntentInitParameter.headTailModel").setValue(null);
		financeObj.getCmpByName("projectMoney1").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.startDate").setValue(null);
		financeObj.getCmpByName("bpFundIntentInitParameter.payintentPeriod").setValue(null);
		financeObj.getCmpByName("bpFundIntentInitParameter.intentDate").setValue(null);
		financeObj.getCmpByName("bpFundIntentInitParameter.accrual").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.managementConsultingOfRate").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.isPreposePayAccrual").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.isInterestByOneTime").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.yearAccrualRate").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.dayAccrualRate").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.sumAccrualRate").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.yearManagementConsultingOfRate").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.dayManagementConsultingOfRate").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.sumManagementConsultingOfRate").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.yearFinanceServiceOfRate").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.dayFinanceServiceOfRate").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.sumFinanceServiceOfRate").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.financeServiceOfRate").setValue(0);
		financeObj.getCmpByName("bpFundIntentInitParameter.payaccrualType").setValue("monthPay");
		Ext.getCmp("jixizq2"+financeObj.idDefinition).setValue(true);
		Ext.getCmp("jixizq1"+financeObj.idDefinition).setValue(false);
		Ext.getCmp("jixizq3"+financeObj.idDefinition).setValue(false);
		Ext.getCmp("jixizq4"+financeObj.idDefinition).setValue(false);
		Ext.getCmp("jixizq6"+financeObj.idDefinition).setValue(false);
		Ext.getCmp("meiqihkrq1"+financeObj.idDefinition).setValue(false);
		Ext.getCmp("meiqihkrq2"+financeObj.idDefinition).setValue(true);
		financeObj.getCmpByName('bpFundIntentInitParameter.payintentPerioDate').setDisabled(true);
		financeObj.getCmpByName('bpFundIntentInitParameter.isStartDatePay').setValue("2");
		financeObj.getCmpByName("bpFundIntentInitParameter.accrualtype").setValue("singleInterest");
		Ext.getCmp("jixifs3"+financeObj.idDefinition).setValue(true);
		Ext.getCmp("jixifs1"+financeObj.idDefinition).setValue(false);
		Ext.getCmp("jixifs2"+financeObj.idDefinition).setValue(false);
							
	},
	//导出分录视图
	toExcelautocreate : function(formPanelData,thisPanel) {
		var intentobj=formPanelData.items.get(0).get(1);
		intentobj.toExcelautocreate();
	},
	//导出合计视图
	toExcelSumautocreate : function(formPanelData,thisPanel) {
		var intentobj=formPanelData.items.get(0).get(1);
		intentobj.toExcelSumautocreate();
	}
});

