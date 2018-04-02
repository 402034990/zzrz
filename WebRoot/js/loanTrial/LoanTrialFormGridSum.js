/**
 * @author penglili
 * @createtime
 * @class LoanTrialFormGridSum
 * @extends Ext.Panel
 * @description LoanTrialFormGridSum表单
 * @company 互融软件
 */
LoanTrialFormGridSum = Ext.extend(Ext.Panel,{
	// 构造函数
	defineForm:'bpFundIntentInitParameter',
	payintentPeriod : null,
	isManagerHidden : false,//随期费率1行
	isFinaceHidden : false,//随期费率2行
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		if (typeof(_cfg.defineForm) != "undefined") {
			this.defineForm = _cfg.defineForm;
		}
		if (typeof(_cfg.payintentPeriod) != "undefined") {
			this.payintentPeriod = _cfg.payintentPeriod;
		}
		if (typeof(_cfg.isManagerHidden) != "undefined") {
			this.isManagerHidden = _cfg.isManagerHidden;
		}
		if (typeof(_cfg.isFinaceHidden) != "undefined") {
			this.isFinaceHidden = _cfg.isFinaceHidden;
		}
		// 必须先初始化组件
		this.initUIComponents();
		LoanTrialFormGridSum.superclass.constructor.call(this, {
			layout:'anchor',
	        anchor : '100%',
			items : [
				this.gridPanel
			]
		});

	},// end of the constructor
	// 初始化组件

	initUIComponents : function() {
		
		
		var summary = new Ext.ux.grid.GridSummary();
		function totalMoney(v, params, data) {
			return '总计(元)';
		}
		this.datafield=new Ext.form.DateField( {
					format : 'Y-m-d',
					allowBlank : false,
					readOnly:true
				})
		var params1={
					     flag1:1,
					     businessType:this.businessType,
					     payintentPeriod:this.payintentPeriod
					};
		
		
		this.gridPanel = new HT.EditorGridPanel( {
			border : false,
			region : 'center',
			tbar : this.topbar,
			clicksToEdit : 1,
			showPaging : false,
			autoHeight : true,
			autoLoad : false, 
         	plugins: [summary],
			id : 'LoanTrialFormGrideditGrid2',
			url :__ctxPath + '/common/loanTrial/getSynthesizeListLoanTrial.do',	
			baseParams :params1,
			fields : [ {
				name : 'payintentPeriod'
			},{
				name : 'interestStarTime'
			},{
				name : 'interestEndTime'
			}, {
				name : 'interestDays'
			}, {
				name : 'intentDate'
			}, {
				name : 'lendIncomMoney'
			}, {
				name : 'backIncomMoney'
			}, {
				name : 'interestIncomMoney'
			}, {
				name : 'consultatioIncomMoney'
			}, {
				name : 'financeServiceIncomMoney'
			}, {
				name : 'sumMoney'
			}],
			columns : [{
				header : '期数',
				dataIndex : 'payintentPeriod',
				width :60,
				renderer : function(value, metaData, record, rowIndex,colIndex, store){
					
					return '<font">第'+value+'期</font>'
							
				}
			}, {
				header : '计息开始日期',
				dataIndex : 'interestStarTime',
				format : 'Y-m-d',
				editor :this.datafield,
				renderer : ZW.ux.dateRenderer(this.datafield)
			}, {
				header : '计息结束日期',
				dataIndex : 'interestEndTime',
				format : 'Y-m-d',
				 editor :this.datafield,
				 renderer : ZW.ux.dateRenderer(this.datafield)
			}, {
				header : '计息天数',
				dataIndex : 'interestDays',
				summaryType: 'sum',
				width :80,
				editor : {
					xtype : 'numberfield',
					readOnly:true
				},
				renderer : function(value,metaData, record,rowIndex, colIndex,store){
					if(value!=null){
						return value+"天";
					}
								  
				}
			
			}, {
				header : '计划到账日',
				format : 'Y-m-d',
				dataIndex : 'intentDate',
				sortable : true,
				renderer : ZW.ux.dateRenderer(this.datafield),
				editor :this.datafield
			}, {
				header : '贷款本金',
				dataIndex : 'backIncomMoney',
				align : 'right',
				summaryType: 'sum',
				editor : {
					xtype : 'numberfield',
					readOnly:true
				},
				renderer : function(value,metaData, record,rowIndex, colIndex,store){
					if(value!=null){
						return Ext.util.Format.number(value,',000,000,000.00')+"元";
					}
				}
			}, {
				header : '贷款利息',
				dataIndex : 'interestIncomMoney',
				align : 'right',
				summaryType: 'sum',
				editor : {
					xtype : 'numberfield',
					readOnly:true
				},
				renderer : function(value,metaData, record,rowIndex, colIndex,store){
					if(value!=null){
						return Ext.util.Format.number(value,',000,000,000.00')+"元";
					}
				}
			
			}, {
				header : '随期收费1',
				dataIndex : 'consultatioIncomMoney',
				align : 'right',
				summaryType: 'sum',
				hidden : this.isManagerHidden,
				editor : {
					xtype : 'numberfield',
					readOnly:true
				},
				renderer : function(value,metaData, record,rowIndex, colIndex,store){
					if(value!=null){
						return Ext.util.Format.number(value,',000,000,000.00')+"元";
					}
								  
				}
			
			}, {
				header : '随期收费2',
				dataIndex : 'financeServiceIncomMoney',
				align : 'right',
				summaryType: 'sum',
				hidden : this.isFinaceHidden,
				editor : {
					xtype : 'numberfield',
					readOnly:true
				},
				renderer : function(value,metaData, record,rowIndex, colIndex,store){
					if(value!=null){
						return Ext.util.Format.number(value,',000,000,000.00')+"元";
					}
				}
			
			}, {
				header : '当期合计',
				dataIndex : 'sumMoney',
				align : 'right',
				summaryType: 'sum',
				editor : {
					xtype : 'numberfield',
					readOnly:true
				},
				renderer : function(value,metaData, record,rowIndex, colIndex,store){
					if(value!=null){
						return Ext.util.Format.number(value,',000,000,000.00')+"元";
					}
				}
			
			}]
		});
		
	},
	autocreate : function() {
		var  parentObject = this.ownerCt.get(0);
		var gridPanel1 = this.gridPanel;
		var	startDate = null;//贷款开始日期
		var projectMoney = null;  //贷款金额
		var payIntentPeriod = null;  //贷款期限
		var intentDate = null;  //贷款截至日期
		var endDate = null;//贷款结束日期
		var yearModel = null;//月模型
		var monthModel = null;//年模型
		var headTailModel = null;//还款模型
		var accrualtype = null;//还款方式
		var payaccrualType = null;//还款周期 
		var dayOfEveryPeriod = null;//自定义周期天数
		var isPreposePayAccrual = null;//前置付息
		var isInterestByOneTime = null;//一次性支付全部利息
		var isStartDatePay = null;//计划还款日类型
		var payintentPerioDate = null;//固定日
		var yearAccrualRate = null;//年化利率
		var fixedAccrualRate = null;//利息固定金额
		var yearManagementConsultingOfRate = null;//管理咨询费率
		var fixedManagementConsultingOfRate = null;//管理费固定金额
		var yearFinanceServiceOfRate = null;//财务服务费率
		var fixedFinanceServiceOfRate = null;//服务费固定金额
		if(parentObject){
			startDate = parentObject.getCmpByName(this.defineForm+'.startDate').getValue();//贷款开始日期
			projectMoney = parentObject.getCmpByName('projectMoney1').hiddenField.value;  //贷款金额
			payintentPeriod = parentObject.getCmpByName(this.defineForm+'.payintentPeriod').getValue();  //贷款期限
			intentDate = parentObject.getCmpByName(this.defineForm+'.intentDate').getValue();  //贷款截至日期
			yearModel = parentObject.getCmpByName(this.defineForm+'.yearModel').getValue();//年华
			monthModel = parentObject.getCmpByName(this.defineForm+'.monthModel').getValue();//月息
			headTailModel = parentObject.getCmpByName(this.defineForm+'.headTailModel').getValue();//头尾
			accrualtype = parentObject.getCmpByName(this.defineForm+'.accrualtype').getValue();//还款方式
			payaccrualType = parentObject.getCmpByName(this.defineForm+'.payaccrualType').getValue();//还款周期 
			dayOfEveryPeriod = parentObject.getCmpByName(this.defineForm+'.dayOfEveryPeriod').getValue();//自定义周期天数
			isPreposePayAccrual = parentObject.getCmpByName(this.defineForm+'.isPreposePayAccrual').getValue();//前置付息
			isInterestByOneTime = parentObject.getCmpByName(this.defineForm+'.isInterestByOneTime').getValue();//一次性支付全部利息
			isStartDatePay = parentObject.getCmpByName(this.defineForm+'.isStartDatePay').getValue();//计划还款日类型
			payintentPerioDate = parentObject.getCmpByName(this.defineForm+'.payintentPerioDate').getValue();//固定日
			yearAccrualRate = parentObject.getCmpByName(this.defineForm+'.yearAccrualRate').getValue();//年化利率
			fixedAccrualRate = parentObject.getCmpByName('fixedAccrualRate1').hiddenField.value;  //利息固定金额
			yearManagementConsultingOfRate = parentObject.getCmpByName(this.defineForm+'.yearManagementConsultingOfRate').getValue();//管理咨询费率
			fixedManagementConsultingOfRate = parentObject.getCmpByName('fixedManagementConsultingOfRate1').hiddenField.value;  //管理费固定金额
			yearFinanceServiceOfRate = parentObject.getCmpByName(this.defineForm+'.yearFinanceServiceOfRate').getValue();//财务服务费率
			fixedFinanceServiceOfRate = parentObject.getCmpByName('fixedFinanceServiceOfRate1').hiddenField.value;  //服务费固定金额
		}
		var message = "";
		if (projectMoney == "" || projectMoney == null) {
			message += "本金总额、";
		}
		if (payintentPeriod == "" || payintentPeriod == null) {
			message += "贷款期数、";
		}
		if (startDate == "" || startDate == null) {
			message += "放款日期、";
		}
		if (intentDate == "" || intentDate == null) {
			message += "到期日期、";
		}
		if (yearModel == "" || yearModel == null) {
			message += "年模型、";
		}
		if (monthModel == "" || monthModel == null) {
			message += "月模型、";
		}
		if ((headTailModel == "" || headTailModel == null)&&headTailModel!=0) {
			message += "还款模型、";
		}
		if (accrualtype == "" || accrualtype == null) {
			message += "还款方式、";
		}
		if (payaccrualType == "" || payaccrualType == null) {
			message += "还款周期 、";
		}
		if (isStartDatePay == "" || isStartDatePay == null) {
			message += "计划还款日类型、";
		}else{
			if (isStartDatePay == 1) {
				if (payintentPerioDate == "" || payintentPerioDate == null) {
					message += "固定日、";
				}
			}
		}
		if (message != "") {
			Ext.MessageBox.show({
				title : '操作信息',
				msg : message + '不能为空',
				buttons : Ext.MessageBox.OK,
				icon : 'ext-mb-error'
			});
			return null;
		}
		var params1 = {
			'bpFundIntentInitParameter.startDate' : startDate,
			'bpFundIntentInitParameter.projectMoney' : projectMoney,
			'bpFundIntentInitParameter.intentDate' : intentDate,
			'bpFundIntentInitParameter.payintentPeriod' : payintentPeriod,
			'bpFundIntentInitParameter.businessType' : 'SmallLoan',
			'bpFundIntentInitParameter.yearModel' :yearModel,//月模型
			'bpFundIntentInitParameter.monthModel' :monthModel,//年模型
			'bpFundIntentInitParameter.headTailModel' :headTailModel,//还款模型
			'bpFundIntentInitParameter.accrualtype' :accrualtype,//还款方式
			'bpFundIntentInitParameter.payaccrualType' :payaccrualType,//还款周期 
			'bpFundIntentInitParameter.dayOfEveryPeriod' :dayOfEveryPeriod,//自定义周期天数
			'bpFundIntentInitParameter.isPreposePayAccrual' :isPreposePayAccrual,//前置付息
			'bpFundIntentInitParameter.isInterestByOneTime' :isInterestByOneTime,//一次性支付全部利息
			'bpFundIntentInitParameter.isStartDatePay' :isStartDatePay,//计划还款日类型
			'bpFundIntentInitParameter.payintentPerioDate' :payintentPerioDate,//固定日
			'bpFundIntentInitParameter.yearAccrualRate' :yearAccrualRate,//年化利率
			'bpFundIntentInitParameter.fixedAccrualRate' :fixedAccrualRate,//利息固定金额
			'bpFundIntentInitParameter.yearManagementConsultingOfRate' :yearManagementConsultingOfRate,//管理咨询费率
			'bpFundIntentInitParameter.fixedManagementConsultingOfRate' :fixedManagementConsultingOfRate,//管理费固定金额
			'bpFundIntentInitParameter.yearFinanceServiceOfRate' :yearFinanceServiceOfRate,//财务服务费率
			'bpFundIntentInitParameter.fixedFinanceServiceOfRate' :fixedFinanceServiceOfRate//服务费固定金额
		}


		var gridstore = gridPanel1.getStore();
		gridstore.on('beforeload', function(gridstore, o) {
					Ext.apply(o.params, params1);
				});
		var url = __ctxPath+ "/common/loanTrial/createSynthesizeFundListLoanTrial.do";
		gridstore.proxy.conn.url = url;
		gridPanel1.getStore().reload();
		gridstore.on('load', function(gridstore, o) {
			var vRecords = gridstore.getRange(0,gridstore.getCount());
			var vCount = vRecords.length; // 得到记录长度
			if (vCount > 0) {
				
				var interestMoney=0;
				var consultationMoney=0;
				var serviceMoney=0;
				var allMoney=0;
				for ( var i = 0; i < vCount; i++) {
					if(vRecords[i].data.interestIncomMoney!=null){
						interestMoney=interestMoney+parseFloat(vRecords[i].data.interestIncomMoney);
					}
					if(vRecords[i].data.consultatioIncomMoney){
						consultationMoney=consultationMoney+parseFloat(vRecords[i].data.consultatioIncomMoney);
					}
					if(vRecords[i].data.financeServiceIncomMoney){
						serviceMoney=serviceMoney+parseFloat(vRecords[i].data.financeServiceIncomMoney);
					}
				}
				allMoney = parseFloat(interestMoney)+parseFloat(consultationMoney)+parseFloat(serviceMoney);
				parentObject.getCmpByName('sumAllAccrualRate').setValue(Ext.util.Format.number(interestMoney, '0,000.00'));
				parentObject.getCmpByName('sumAllManagementConsultingOfRate').setValue(Ext.util.Format.number(consultationMoney, '0,000.00'));
				parentObject.getCmpByName('sumAllFinanceServiceOfRate').setValue(Ext.util.Format.number(serviceMoney, '0,000.00'));
				parentObject.getCmpByName('sumAllRateMoney').setValue(Ext.util.Format.number(allMoney, '0,000.00'));
			}
		});

	},
	autocreatePrincipal : function() {
		var parentObject = this.ownerCt.get(0);
		var gridPanel1 = this.gridPanel;
		var	startDate = null;//贷款开始日期
		var projectMoney = null;  //贷款金额
		var payIntentPeriod = null;  //贷款期限
		var intentDate = null;  //贷款截至日期
		var endDate = null;//贷款结束日期
		var yearModel = null;//月模型
		var monthModel = null;//年模型
		var headTailModel = null;//还款模型
		var accrualtype = null;//还款方式
		var payaccrualType = null;//还款周期 
		var dayOfEveryPeriod = null;//自定义周期天数
		var isPreposePayAccrual = null;//前置付息
		var isInterestByOneTime = null;//一次性支付全部利息
		var isStartDatePay = null;//计划还款日类型
		var payintentPerioDate = null;//固定日
		var yearAccrualRate = null;//年化利率
		var yearManagementConsultingOfRate = null;//管理咨询费率
		var yearFinanceServiceOfRate = null;//财务服务费率
		var payaccrualTypePayPrincipal = null;//本金还款周期 
		var dayOfEveryPeriodPayPrincipal = null;//本金自定义周期天数
		if(parentObject){
			startDate = parentObject.getCmpByName(this.defineForm+'.startDate').getValue();//贷款开始日期
			projectMoney = parentObject.getCmpByName('projectMoney1').hiddenField.value;  //贷款金额
			payintentPeriod = parentObject.getCmpByName(this.defineForm+'.payintentPeriod').getValue();  //贷款期限
			intentDate = parentObject.getCmpByName(this.defineForm+'.intentDate').getValue();  //贷款截至日期
			yearModel = parentObject.getCmpByName(this.defineForm+'.yearModel').getValue();//年华
			monthModel = parentObject.getCmpByName(this.defineForm+'.monthModel').getValue();//月息
			headTailModel = parentObject.getCmpByName(this.defineForm+'.headTailModel').getValue();//头尾
			accrualtype = parentObject.getCmpByName(this.defineForm+'.accrualtype').getValue();//还款方式
			payaccrualType = parentObject.getCmpByName(this.defineForm+'.payaccrualType').getValue();//还款周期 
			dayOfEveryPeriod = parentObject.getCmpByName(this.defineForm+'.dayOfEveryPeriod').getValue();//自定义周期天数
			isPreposePayAccrual = parentObject.getCmpByName(this.defineForm+'.isPreposePayAccrual').getValue();//前置付息
			isInterestByOneTime = parentObject.getCmpByName(this.defineForm+'.isInterestByOneTime').getValue();//一次性支付全部利息
			isStartDatePay = parentObject.getCmpByName(this.defineForm+'.isStartDatePay').getValue();//计划还款日类型
			payintentPerioDate = parentObject.getCmpByName(this.defineForm+'.payintentPerioDate').getValue();//固定日
			yearAccrualRate = parentObject.getCmpByName(this.defineForm+'.yearAccrualRate').getValue();//年化利率
			yearManagementConsultingOfRate = parentObject.getCmpByName(this.defineForm+'.yearManagementConsultingOfRate').getValue();//管理咨询费率
			yearFinanceServiceOfRate = parentObject.getCmpByName(this.defineForm+'.yearFinanceServiceOfRate').getValue();//财务服务费率
			payaccrualTypePrincipal = parentObject.getCmpByName(this.defineForm+'.payaccrualTypePrincipal').getValue();//本金还款周期 
			dayOfEveryPeriodPrincipal = parentObject.getCmpByName(this.defineForm+'.dayOfEveryPeriodPrincipal').getValue();//本金自定义周期天数
		}
		var message = "";
		if (projectMoney == "" || projectMoney == null) {
			message += "本金总额、";
		}
		if (payintentPeriod == "" || payintentPeriod == null) {
			message += "贷款期数、";
		}
		if (startDate == "" || startDate == null) {
			message += "放款日期、";
		}
		if (intentDate == "" || intentDate == null) {
			message += "到期日期、";
		}
		if (yearModel == "" || yearModel == null) {
			message += "年模型、";
		}
		if (monthModel == "" || monthModel == null) {
			message += "月模型、";
		}
		if ((headTailModel == "" || headTailModel == null)&&headTailModel!=0) {
			message += "还款模型、";
		}
		if (accrualtype == "" || accrualtype == null) {
			message += "还款方式、";
		}
		if (payaccrualType == "" || payaccrualType == null) {
			message += "还款周期 、";
		}else{
			if (payaccrualType == "owerPay") {
				if (dayOfEveryPeriod == "" || dayOfEveryPeriod == null) {
					message += "自定义   每期/日、";
				}
			}
		}
		if (isStartDatePay == "" || isStartDatePay == null) {
			message += "计划还款类型、";
		}else{
			if (isStartDatePay == 1) {
				if (payintentPerioDate == "" || payintentPerioDate == null) {
					message += "固定日、";
				}
			}
		}
		if (payaccrualTypePrincipal == "" || payaccrualTypePrincipal == null) {
			message += "本金还款周期 、";
		}else{
			if (payaccrualTypePrincipal == "owerPay") {
				if (dayOfEveryPeriodPrincipal == "" || dayOfEveryPeriodPrincipal == null) {
					message += "本金自定义   每期/日、";
				}
			}
		}

		if (message != "") {
			Ext.MessageBox.show({
						title : '操作信息',
						msg : message + '不能为空',
						buttons : Ext.MessageBox.OK,
						icon : 'ext-mb-error'
					});
			return null;
		}
		var params1 = {
			'bpFundIntentInitParameter.startDate' : startDate,
			'bpFundIntentInitParameter.projectMoney' : projectMoney,
			'bpFundIntentInitParameter.intentDate' : intentDate,
			'bpFundIntentInitParameter.payintentPeriod' : payintentPeriod,
			'bpFundIntentInitParameter.businessType' : 'SmallLoan',
			'bpFundIntentInitParameter.yearModel' :yearModel,//月模型
			'bpFundIntentInitParameter.monthModel' :monthModel,//年模型
			'bpFundIntentInitParameter.headTailModel' :headTailModel,//还款模型
			'bpFundIntentInitParameter.accrualtype' :accrualtype,//还款方式
			'bpFundIntentInitParameter.payaccrualType' :payaccrualType,//还款周期 
			'bpFundIntentInitParameter.dayOfEveryPeriod' :dayOfEveryPeriod,//自定义周期天数
			'bpFundIntentInitParameter.isPreposePayAccrual' :isPreposePayAccrual,//前置付息
			'bpFundIntentInitParameter.isInterestByOneTime' :isInterestByOneTime,//一次性支付全部利息
			'bpFundIntentInitParameter.isStartDatePay' :isStartDatePay,//计划还款日类型
			'bpFundIntentInitParameter.payintentPerioDate' :payintentPerioDate,//固定日
			'bpFundIntentInitParameter.yearAccrualRate' :yearAccrualRate,//年化利率
			'bpFundIntentInitParameter.yearManagementConsultingOfRate' :yearManagementConsultingOfRate,//管理咨询费率
			'bpFundIntentInitParameter.yearFinanceServiceOfRate' :yearFinanceServiceOfRate,//财务服务费率
			'bpFundIntentInitParameter.payaccrualTypePrincipal' :payaccrualTypePrincipal,//本金还款周期 
			'bpFundIntentInitParameter.dayOfEveryPeriodPrincipal' :dayOfEveryPeriodPrincipal,//本金自定义周期天数
			'bpFundIntentInitParameter.principalLendingType' :"rentalCostsPaid",//本金发放类型
			'bpFundIntentInitParameter.principalRepaymentType' :"leasePrincipalRepayment",//本金回收类型
			'bpFundIntentInitParameter.accrualRateType' :"leaseFeeCharging",//利息类型
			'bpFundIntentInitParameter.managementConsultingOfRateType' :"rentalFeeCharging",//管理咨询费类型
			'bpFundIntentInitParameter.managementConsultingOfRateMoney' :100,//管理咨询费金额
			'bpFundIntentInitParameter.isOneManagementConsultingOfRate' :"yes",//是否一次性支付咨询管理费
			'bpFundIntentInitParameter.financeServiceOfRateType' :"marginCollection",//财务服务费类型
			'bpFundIntentInitParameter.financeServiceOfRateMoney' :100,//财务服务费金额
			'bpFundIntentInitParameter.isOneFinanceServiceOfRate' :"yes",//是否一次性支付财务服务费
			'bpFundIntentInitParameter.leaseObjectRetentionFeeMoney' :100//财务服务费金额
		}


		var gridstore = gridPanel1.getStore();
		gridstore.on('beforeload', function(gridstore, o) {
					Ext.apply(o.params, params1);
				});
		var url = __ctxPath+ "/common/loanTrial/createPrincipalSynthesizeFundListLoanTrial.do";
		gridstore.proxy.conn.url = url;
		gridPanel1.getStore().reload();
		gridstore.on('load', function(gridstore, o) {
			var vRecords = gridstore.getRange(0,gridstore.getCount());
			var vCount = vRecords.length; // 得到记录长度
			if (vCount > 0) {
				
				var interestMoney=0;
				var consultationMoney=0;
				var serviceMoney=0;
				var allMoney=0;
				for ( var i = 0; i < vCount; i++) {
					if(vRecords[i].data.interestIncomMoney!=null){
						interestMoney=interestMoney+parseFloat(vRecords[i].data.interestIncomMoney);
					}
					if(vRecords[i].data.consultatioIncomMoney){
						consultationMoney=consultationMoney+parseFloat(vRecords[i].data.consultatioIncomMoney);
					}
					if(vRecords[i].data.financeServiceIncomMoney){
						serviceMoney=serviceMoney+parseFloat(vRecords[i].data.financeServiceIncomMoney);
					}
				}
				allMoney = parseFloat(interestMoney)+parseFloat(consultationMoney)+parseFloat(serviceMoney);
				parentObject.getCmpByName('sumAllAccrualRate').setValue(Ext.util.Format.number(interestMoney, '0,000.00'));
				parentObject.getCmpByName('sumAllManagementConsultingOfRate').setValue(Ext.util.Format.number(consultationMoney, '0,000.00'));
				parentObject.getCmpByName('sumAllFinanceServiceOfRate').setValue(Ext.util.Format.number(serviceMoney, '0,000.00'));
				parentObject.getCmpByName('sumAllRateMoney').setValue(Ext.util.Format.number(allMoney, '0,000.00'));
			}
		});

	},
	toExcelautocreate : function() {
		var  parentObject = this.ownerCt.get(0);
		var gridPanel1 = this.gridPanel
		var	startDate = null;//贷款开始日期
		var projectMoney = null;  //贷款金额
		var payIntentPeriod = null;  //贷款期限
		var intentDate = null;  //贷款截至日期
		var endDate = null;//贷款结束日期
		var yearModel = null;//月模型
		var monthModel = null;//年模型
		var headTailModel = null;//还款模型
		var accrualtype = null;//还款方式
		var payaccrualType = null;//还款周期 
		var dayOfEveryPeriod = null;//自定义周期天数
		var isPreposePayAccrual = null;//前置付息
		var isInterestByOneTime = null;//一次性支付全部利息
		var isStartDatePay = null;//计划还款日类型
		var payintentPerioDate = null;//固定日
		var yearAccrualRate = null;//年化利率
		var yearManagementConsultingOfRate = null;//管理咨询费率
		var yearFinanceServiceOfRate = null;//财务服务费率
		if(parentObject){
			startDate = parentObject.getCmpByName(this.defineForm+'.startDate').getValue();//放款日期
			projectMoney = parentObject.getCmpByName('projectMoney1').hiddenField.value;  //贷款金额
			payintentPeriod = parentObject.getCmpByName(this.defineForm+'.payintentPeriod').getValue();  //贷款期限
			intentDate = parentObject.getCmpByName(this.defineForm+'.intentDate').getValue();  //还款日期
			yearModel = parentObject.getCmpByName(this.defineForm+'.yearModel').getValue();//年模型
			monthModel = parentObject.getCmpByName(this.defineForm+'.monthModel').getValue();//月模型
			headTailModel = parentObject.getCmpByName(this.defineForm+'.headTailModel').getValue();//还款模型
			accrualtype = parentObject.getCmpByName(this.defineForm+'.accrualtype').getValue();//还款方式
			payaccrualType = parentObject.getCmpByName(this.defineForm+'.payaccrualType').getValue();//还款周期 
			dayOfEveryPeriod = parentObject.getCmpByName(this.defineForm+'.dayOfEveryPeriod').getValue();//自定义周期天数
			isPreposePayAccrual = parentObject.getCmpByName(this.defineForm+'.isPreposePayAccrual').getValue();//前置付息
			isInterestByOneTime = parentObject.getCmpByName(this.defineForm+'.isInterestByOneTime').getValue();//一次性支付全部利息
			isStartDatePay = parentObject.getCmpByName(this.defineForm+'.isStartDatePay').getValue();//计划还款日类型
			payintentPerioDate = parentObject.getCmpByName(this.defineForm+'.payintentPerioDate').getValue();//固定日
			yearAccrualRate = parentObject.getCmpByName(this.defineForm+'.yearAccrualRate').getValue();//年化利率
			yearManagementConsultingOfRate = parentObject.getCmpByName(this.defineForm+'.yearManagementConsultingOfRate').getValue();//管理咨询费率
			yearFinanceServiceOfRate = parentObject.getCmpByName(this.defineForm+'.yearFinanceServiceOfRate').getValue();//财务服务费率
		}
		var message = "";
		if (projectMoney == "" || projectMoney == null) {
			message += "本金总额、";
		}
		if (payintentPeriod == "" || payintentPeriod == null) {
			message += "贷款期数、";
		}
		if (startDate == "" || startDate == null) {
			message += "放款日期、";
		}
		if (intentDate == "" || intentDate == null) {
			message += "到期日期、";
		}
		if (yearModel == "" || yearModel == null) {
			message += "年模型、";
		}
		if (monthModel == "" || monthModel == null) {
			message += "月模型、";
		}
		if ((headTailModel == "" || headTailModel == null)&&headTailModel!=0) {
			message += "还款模型、";
		}
		if (accrualtype == "" || accrualtype == null) {
			message += "还款方式、";
		}
		if (payaccrualType == "" || payaccrualType == null) {
			message += "还款周期 、";
		}
		if (isStartDatePay == "" || isStartDatePay == null) {
			message += "计划还款日类型、";
		}
		if (message != "") {
			Ext.MessageBox.show({
						title : '操作信息',
						msg : message + '不能为空',
						buttons : Ext.MessageBox.OK,
						icon : 'ext-mb-error'
					});
			return null;
		}
		if(startDate!=null&&startDate!=""){
			startDate = startDate.format("Y-m-d");
		}
		if(intentDate!=null&&intentDate!=""){
			intentDate = intentDate.format("Y-m-d");
		}
		window.open(__ctxPath + '/common/loanTrial/toExcelCreateFundListLoanTrial.do?' +
				'bpFundIntentInitParameter.startDate='+startDate +
				'&bpFundIntentInitParameter.projectMoney='+projectMoney +
				'&bpFundIntentInitParameter.intentDate='+intentDate  +
				'&bpFundIntentInitParameter.payintentPeriod='+payintentPeriod +
				'&bpFundIntentInitParameter.businessType="SmallLoan"'+
				'&bpFundIntentInitParameter.yearModel='+yearModel +//月模型
				'&bpFundIntentInitParameter.monthModel='+monthModel +//年模型
				'&bpFundIntentInitParameter.headTailModel='+headTailModel +//还款模型
				'&bpFundIntentInitParameter.accrualtype='+accrualtype +//还款方式
				'&bpFundIntentInitParameter.payaccrualType='+payaccrualType +//还款周期 
				'&bpFundIntentInitParameter.dayOfEveryPeriod='+dayOfEveryPeriod +//自定义周期天数
				'&bpFundIntentInitParameter.isPreposePayAccrual='+isPreposePayAccrual +//前置付息
				'&bpFundIntentInitParameter.isInterestByOneTime='+isInterestByOneTime +//一次性支付全部利息
				'&bpFundIntentInitParameter.isStartDatePay='+isStartDatePay +//计划还款日类型
				'&bpFundIntentInitParameter.payintentPerioDate='+payintentPerioDate +//固定日
				'&bpFundIntentInitParameter.yearAccrualRate='+yearAccrualRate +//年化利率
				'&bpFundIntentInitParameter.yearManagementConsultingOfRate='+yearManagementConsultingOfRate +//管理咨询费率
				'&bpFundIntentInitParameter.yearFinanceServiceOfRate='+yearFinanceServiceOfRate//财务服务费率
				,'_blank');
	},
	toExcelSumautocreate : function() {
		var parentObject = this.ownerCt.get(0);
		var gridPanel1 = this.gridPanel
		var	startDate = null;//贷款开始日期
		var projectMoney = null;  //贷款金额
		var payIntentPeriod = null;  //贷款期限
		var intentDate = null;  //贷款截至日期
		var endDate = null;//贷款结束日期
		var yearModel = null;//月模型
		var monthModel = null;//年模型
		var headTailModel = null;//还款模型
		var accrualtype = null;//还款方式
		var payaccrualType = null;//还款周期 
		var dayOfEveryPeriod = null;//自定义周期天数
		var isPreposePayAccrual = null;//前置付息
		var isInterestByOneTime = null;//一次性支付全部利息
		var isStartDatePay = null;//计划还款日类型
		var payintentPerioDate = null;//固定日
		var yearAccrualRate = null;//年化利率
		var yearManagementConsultingOfRate = null;//管理咨询费率
		var yearFinanceServiceOfRate = null;//财务服务费率
		if(parentObject){
			startDate = parentObject.getCmpByName(this.defineForm+'.startDate').getValue();//放款日期
			projectMoney = parentObject.getCmpByName('projectMoney1').hiddenField.value;  //贷款金额
			payintentPeriod = parentObject.getCmpByName(this.defineForm+'.payintentPeriod').getValue();  //贷款期限
			intentDate = parentObject.getCmpByName(this.defineForm+'.intentDate').getValue();  //还款日期
			yearModel = parentObject.getCmpByName(this.defineForm+'.yearModel').getValue();//年模型
			monthModel = parentObject.getCmpByName(this.defineForm+'.monthModel').getValue();//月模型
			headTailModel = parentObject.getCmpByName(this.defineForm+'.headTailModel').getValue();//还款模型
			accrualtype = parentObject.getCmpByName(this.defineForm+'.accrualtype').getValue();//还款方式
			payaccrualType = parentObject.getCmpByName(this.defineForm+'.payaccrualType').getValue();//还款周期 
			dayOfEveryPeriod = parentObject.getCmpByName(this.defineForm+'.dayOfEveryPeriod').getValue();//自定义周期天数
			isPreposePayAccrual = parentObject.getCmpByName(this.defineForm+'.isPreposePayAccrual').getValue();//前置付息
			isInterestByOneTime = parentObject.getCmpByName(this.defineForm+'.isInterestByOneTime').getValue();//一次性支付全部利息
			isStartDatePay = parentObject.getCmpByName(this.defineForm+'.isStartDatePay').getValue();//计划还款日类型
			payintentPerioDate = parentObject.getCmpByName(this.defineForm+'.payintentPerioDate').getValue();//固定日
			yearAccrualRate = parentObject.getCmpByName(this.defineForm+'.yearAccrualRate').getValue();//年化利率
			yearManagementConsultingOfRate = parentObject.getCmpByName(this.defineForm+'.yearManagementConsultingOfRate').getValue();//管理咨询费率
			yearFinanceServiceOfRate = parentObject.getCmpByName(this.defineForm+'.yearFinanceServiceOfRate').getValue();//财务服务费率
		}
		var message = "";
		if (projectMoney == "" || projectMoney == null) {
			message += "本金总额、";
		}
		if (payintentPeriod == "" || payintentPeriod == null) {
			message += "贷款期数、";
		}
		if (startDate == "" || startDate == null) {
			message += "放款日期、";
		}
		if (intentDate == "" || intentDate == null) {
			message += "到期日期、";
		}
		if (yearModel == "" || yearModel == null) {
			message += "年模型、";
		}
		if (monthModel == "" || monthModel == null) {
			message += "月模型、";
		}
		if ((headTailModel == "" || headTailModel == null)&&headTailModel!=0) {
			message += "还款模型、";
		}
		if (accrualtype == "" || accrualtype == null) {
			message += "还款方式、";
		}
		if (payaccrualType == "" || payaccrualType == null) {
			message += "还款周期 、";
		}
		if (isStartDatePay == "" || isStartDatePay == null) {
			message += "计划还款日类型、";
		}
		if (message != "") {
			Ext.MessageBox.show({
						title : '操作信息',
						msg : message + '不能为空',
						buttons : Ext.MessageBox.OK,
						icon : 'ext-mb-error'
					});
			return null;
		}
		if(startDate!=null&&startDate!=""){
			startDate = startDate.format("Y-m-d");
		}
		if(intentDate!=null&&intentDate!=""){
			intentDate = intentDate.format("Y-m-d");
		}
		window.open(__ctxPath + '/common/loanTrial/toExcelSumCreateFundListLoanTrial.do?' +
				'bpFundIntentInitParameter.startDate='+startDate +
				'&bpFundIntentInitParameter.projectMoney='+projectMoney +
				'&bpFundIntentInitParameter.intentDate='+intentDate  +
				'&bpFundIntentInitParameter.payintentPeriod='+payintentPeriod +
				'&bpFundIntentInitParameter.businessType="SmallLoan"'+
				'&bpFundIntentInitParameter.yearModel='+yearModel +//月模型
				'&bpFundIntentInitParameter.monthModel='+monthModel +//年模型
				'&bpFundIntentInitParameter.headTailModel='+headTailModel +//还款模型
				'&bpFundIntentInitParameter.accrualtype='+accrualtype +//还款方式
				'&bpFundIntentInitParameter.payaccrualType='+payaccrualType +//还款周期 
				'&bpFundIntentInitParameter.dayOfEveryPeriod='+dayOfEveryPeriod +//自定义周期天数
				'&bpFundIntentInitParameter.isPreposePayAccrual='+isPreposePayAccrual +//前置付息
				'&bpFundIntentInitParameter.isInterestByOneTime='+isInterestByOneTime +//一次性支付全部利息
				'&bpFundIntentInitParameter.isStartDatePay='+isStartDatePay +//计划还款日类型
				'&bpFundIntentInitParameter.payintentPerioDate='+payintentPerioDate +//固定日
				'&bpFundIntentInitParameter.yearAccrualRate='+yearAccrualRate +//年化利率
				'&bpFundIntentInitParameter.yearManagementConsultingOfRate='+yearManagementConsultingOfRate +//管理咨询费率
				'&bpFundIntentInitParameter.yearFinanceServiceOfRate='+yearFinanceServiceOfRate//财务服务费率
				,'_blank');
	}
	
	
});