
LoanTrialFormPanelPrincipal = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	isAllReadOnly : false,
	isDiligenceReadOnly : false,
	idDefinition:'liucheng',
	defineForm:'bpFundIntentInitParameter',
	isProduct : false,
	isStartDateReadOnly : false,
	isMoneyReadOnly : false,
	isSumReadOnly : true,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.isAllReadOnly) != "undefined") {
			this.isAllReadOnly = _cfg.isAllReadOnly;
		}
		if (typeof(_cfg.isStartDateReadOnly) != "undefined") {
			this.isStartDateReadOnly = _cfg.isStartDateReadOnly;
		}
		if (typeof(_cfg.isMoneyReadOnly) != "undefined") {
			this.isMoneyReadOnly = _cfg.isMoneyReadOnly;
		}
		if (typeof(_cfg.idDefinition) != "undefined") {
			this.idDefinition = _cfg.idDefinition;
		}
		if (typeof(_cfg.defineForm) != "undefined") {
			this.defineForm = _cfg.defineForm;
		}
		if (typeof(_cfg.isProduct) != "undefined") {
			this.isProduct = _cfg.isProduct;
		}
		if (typeof(_cfg.isSumReadOnly) != "undefined") {
			this.isSumReadOnly = _cfg.isSumReadOnly;
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		var leftlabel = 100;
		var centerlabel = 100;
		var rightlabel = 100;
		
		var storepayintentPeriod="[";
	  	for (var i = 1; i < 31; i++) {
			storepayintentPeriod = storepayintentPeriod + "['每月" + i+ "日还款', " + i + "],";
		}
		storepayintentPeriod = storepayintentPeriod.substring(0,storepayintentPeriod.length - 1);
		storepayintentPeriod = storepayintentPeriod + "]";
		var obstorepayintentPeriod = Ext.decode(storepayintentPeriod);
		//校验是否为数字类型
		var regexNumber = function(localValue,selectType,objectPanel){
			if(isNaN(localValue)){
				objectPanel.getCmpByName(selectType).setValue(null);
				return false;
			}
			return true;
		}
		var isAllReadOnly = this.isAllReadOnly;
		//页面按钮是否可选控制
		var changeDisabled = function(selectType,dateType,objectPanel){
			if(selectType=="payaccrualType"){
				var payaccrualTypePan = 1;
				objectPanel.getCmpByName(objectPanel.defineForm+'.payaccrualType').setValue(dateType);
				if(dateType=="dayPay"||dateType=="owerPay"){
					objectPanel.getCmpByName(objectPanel.defineForm+'.isStartDatePay').setValue("2");
					objectPanel.getCmpByName('isStartDatePay1'+ objectPanel.idDefinition).setDisabled(true);
					objectPanel.getCmpByName('isStartDatePay1'+ objectPanel.idDefinition).setValue(false);
					objectPanel.getCmpByName('isStartDatePay2'+ objectPanel.idDefinition).setDisabled(true);
					objectPanel.getCmpByName('isStartDatePay2'+ objectPanel.idDefinition).setValue(true);
					if(dateType=="owerPay"){
						payaccrualTypePan = 5;
						objectPanel.getCmpByName('payaccrualType1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType5'+ objectPanel.idDefinition).setValue(true);
						
						objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriod').setDisabled(false);
					}else{
						payaccrualTypePan = 1;
						objectPanel.getCmpByName('payaccrualType1'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualType2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType5'+ objectPanel.idDefinition).setValue(false);
						
						objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriod').setDisabled(true);
						objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriod').setValue(null);
					}
				}else{
					if(dateType=="monthPay"){
						payaccrualTypePan = 2;
						objectPanel.getCmpByName('payaccrualType1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType2'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualType3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType5'+ objectPanel.idDefinition).setValue(false);
						
					}else if(dateType=="seasonPay"){
						payaccrualTypePan = 3;
						objectPanel.getCmpByName('payaccrualType1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType3'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualType4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType5'+ objectPanel.idDefinition).setValue(false);
						
					}else if(dateType=="yearPay"){
						payaccrualTypePan = 4;
						objectPanel.getCmpByName('payaccrualType1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType4'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualType5'+ objectPanel.idDefinition).setValue(false);
						
					}
					objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriod').setDisabled(true);
					objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriod').setValue(null);
					objectPanel.getCmpByName('isStartDatePay1'+ objectPanel.idDefinition).setDisabled(false);
					objectPanel.getCmpByName('isStartDatePay2'+ objectPanel.idDefinition).setDisabled(false);
				}
			}else if(selectType=="accrualtype"){
				objectPanel.getCmpByName(objectPanel.defineForm+'.accrualtype').setValue(dateType);
				if(dateType=="sameprincipal"){//等额本金
					objectPanel.getCmpByName('accrualtype1'+ objectPanel.idDefinition).setValue(true);
					objectPanel.getCmpByName('accrualtype2'+ objectPanel.idDefinition).setValue(false);
					objectPanel.getCmpByName('accrualtype3'+ objectPanel.idDefinition).setValue(false);
					objectPanel.getCmpByName('accrualtype4'+ objectPanel.idDefinition).setValue(false);
				}else if(dateType=="sameprincipalandInterest"){//等额本息的只能按照按月化利率  年化360天计算
					objectPanel.getCmpByName('accrualtype2'+ objectPanel.idDefinition).setValue(true);
					objectPanel.getCmpByName(objectPanel.defineForm+'.monthModel').setDisabled(true);
					objectPanel.getCmpByName(objectPanel.defineForm+'.monthModel').setValue(1);
					objectPanel.getCmpByName(objectPanel.defineForm+'.monthModel').setRawValue("按月化利率直接计算");
					objectPanel.getCmpByName(objectPanel.defineForm+'.yearModel').setDisabled(true);
					objectPanel.getCmpByName(objectPanel.defineForm+'.yearModel').setValue(360);
					objectPanel.getCmpByName(objectPanel.defineForm+'.yearModel').setRawValue("360天");
					objectPanel.getCmpByName('accrualtype1'+ objectPanel.idDefinition).setValue(false);
					objectPanel.getCmpByName('accrualtype3'+ objectPanel.idDefinition).setValue(false);
					objectPanel.getCmpByName('accrualtype4'+ objectPanel.idDefinition).setValue(false);
				}else if(dateType=="sameprincipalsameInterest"){//等本等息
					objectPanel.getCmpByName('accrualtype3'+ objectPanel.idDefinition).setValue(true);
					objectPanel.getCmpByName('accrualtype1'+ objectPanel.idDefinition).setValue(false);
					objectPanel.getCmpByName('accrualtype2'+ objectPanel.idDefinition).setValue(false);
					objectPanel.getCmpByName('accrualtype4'+ objectPanel.idDefinition).setValue(false);
				}else if(dateType=="singleInterest"){//按期收息,期末收本
					objectPanel.getCmpByName('accrualtype4'+ objectPanel.idDefinition).setValue(true);
					objectPanel.getCmpByName('accrualtype1'+ objectPanel.idDefinition).setValue(false);
					objectPanel.getCmpByName('accrualtype2'+ objectPanel.idDefinition).setValue(false);
					objectPanel.getCmpByName('accrualtype3'+ objectPanel.idDefinition).setValue(false);
				}
				if(dateType!="sameprincipalandInterest"){
					objectPanel.getCmpByName(objectPanel.defineForm+'.monthModel').setDisabled(false);
					objectPanel.getCmpByName(objectPanel.defineForm+'.yearModel').setDisabled(false);
				}
			}else if(selectType=="isStartDatePay"){
				objectPanel.getCmpByName(objectPanel.defineForm+'.isStartDatePay').setValue(dateType);
				if(dateType=="1"){//等额本息的只能按照按月化利率  年化360天计算
					objectPanel.getCmpByName('isStartDatePay1'+ objectPanel.idDefinition).setValue(true);
					objectPanel.getCmpByName('isStartDatePay2'+ objectPanel.idDefinition).setValue(false);
					objectPanel.getCmpByName(objectPanel.defineForm+'.payintentPerioDate').setDisabled(false);
				}else if(dateType=="2"){
					objectPanel.getCmpByName('isStartDatePay2'+ objectPanel.idDefinition).setValue(true);
					objectPanel.getCmpByName('isStartDatePay1'+ objectPanel.idDefinition).setValue(false);
					objectPanel.getCmpByName(objectPanel.defineForm+'.payintentPerioDate').setValue(null);
					objectPanel.getCmpByName(objectPanel.defineForm+'.payintentPerioDate').setDisabled(true);
				}
			}else if(selectType=="payaccrualTypePrincipal"){
				objectPanel.getCmpByName(objectPanel.defineForm+'.payaccrualTypePrincipal').setValue(dateType);
				if(dateType=="dayPay"||dateType=="owerPay"){
					if(dateType=="owerPay"){
						objectPanel.getCmpByName('payaccrualTypePrincipal1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal5'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualTypePrincipal6'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriodPrincipal').setDisabled(false);
					}else{
						objectPanel.getCmpByName('payaccrualTypePrincipal1'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualTypePrincipal2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal5'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal6'+ objectPanel.idDefinition).setValue(false);
						
						objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriodPrincipal').setDisabled(true);
						objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriodPrincipal').setValue(null);
					}
				}else{
					if(dateType=="monthPay"){
						objectPanel.getCmpByName('payaccrualTypePrincipal1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal2'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualTypePrincipal3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal5'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal6'+ objectPanel.idDefinition).setValue(false);
						
					}else if(dateType=="seasonPay"){
						objectPanel.getCmpByName('payaccrualTypePrincipal1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal3'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualTypePrincipal4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal5'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal6'+ objectPanel.idDefinition).setValue(false);
						
					}else if(dateType=="yearPay"){
						objectPanel.getCmpByName('payaccrualTypePrincipal1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal4'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualTypePrincipal5'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal6'+ objectPanel.idDefinition).setValue(false);
						
					}else if(dateType=="halfyearPay"){
						objectPanel.getCmpByName('payaccrualTypePrincipal1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal5'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualTypePrincipal6'+ objectPanel.idDefinition).setValue(true);
					}
					objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriodPrincipal').setDisabled(true);
					objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriodPrincipal').setValue(null);
				}
			}
			if(isAllReadOnly){
				objectPanel.getCmpByName('isStartDatePay1'+ objectPanel.idDefinition).setDisabled(true);
				objectPanel.getCmpByName('isStartDatePay2'+ objectPanel.idDefinition).setDisabled(true);
			}
		}
		
		//触发利率的修改和本金到期日期的更改
		var changeAccrualRate=function(accrualType,dateType,localValue,objectPanel){
			var yearModel = objectPanel.getCmpByName(objectPanel.defineForm+'.yearModel').getValue();
			var headTailModel = objectPanel.getCmpByName(objectPanel.defineForm+'.headTailModel').getValue();
			var startDate = objectPanel.getCmpByName(objectPanel.defineForm+'.startDate').getValue();
			var intentDate = objectPanel.getCmpByName(objectPanel.defineForm+'.intentDate').getValue();
			var sumAllDaynf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumAllDay');
			var days = 0;
			//计算合计利率
			var yearAllRatenf = objectPanel.getCmpByName('yearAllRate');
			var monthAllRatenf = objectPanel.getCmpByName('monthAllRate');
			var dayAllRatenf = objectPanel.getCmpByName('dayAllRate');
			var sumAllRatenf = objectPanel.getCmpByName('sumAllRate');
			var yearAllRate = 0;
			var monthAllRate = 0;
			var dayAllRate = 0;
			var sumAllRate = 0;
			if(accrualType=="changeDate"){//小计和合计有影响
				var payaccrualType = objectPanel.getCmpByName(objectPanel.defineForm+'.payaccrualType').getValue();
				var dayOfEveryPeriod = objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriod').getValue();
				var payintentPeriod = objectPanel.getCmpByName(objectPanel.defineForm+'.payintentPeriod').getValue();
				var intentDatePanel = objectPanel.getCmpByName(objectPanel.defineForm+'.intentDate');
				if(dateType == "startDate"){
					startDate = localValue;
				}
				if(dateType == "payintentPeriod"){
					payintentPeriod = localValue;
				}
				if(dateType == "dayOfEveryPeriod"){
					dayOfEveryPeriod = localValue;
				}
				if(dateType == "payaccrualType"){
					payaccrualType = localValue;
				}
				if(payaccrualType!=null&&payintentPeriod!=null&&startDate!=null&&payaccrualType!=""&&payintentPeriod!=""&&startDate!=""){
					if(payaccrualType == "owerPay"){
						if(dayOfEveryPeriod==null||dayOfEveryPeriod==""){
							 Ext.MessageBox.alert("提示","请输入自定义   每期/日");
							return false;
						}
					}
					Ext.Ajax.request({
						url : __ctxPath + "/common/loanTrial/getIntentDateLoanTrial.do",
						method : 'POST',
						scope:this,
						params : {
							payaccrualType:payaccrualType,
							dayOfEveryPeriod:dayOfEveryPeriod,
							payintentPeriod:payintentPeriod,
							startDate:startDate
						},
						success : function(response, request) {
							obj = Ext.util.JSON.decode(response.responseText);
							intentDate=obj.intentDate;
							intentDatePanel.setValue(intentDate);
							var days = obj.allDays;
							if(days!=0){
								if(headTailModel!=null&&headTailModel==0){
									days +=0;
								}else if(headTailModel!=null&&headTailModel==1){
									days +=1;
								}else if(headTailModel!=null&&headTailModel==2){
									days +=2;
								}
							}
							sumAllDaynf.setValue(days);
							var yearAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearAccrualRate').getValue();
							var sumAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumAccrualRate');
							sumAccrualRatenf.setValue((yearAccrualRate/ yearModel * days).toFixed(2));//小计利率
							
							var yearFinanceServiceOfRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearFinanceServiceOfRate').getValue();
							var sumFinanceServiceOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumFinanceServiceOfRate');
							sumFinanceServiceOfRatenf.setValue((yearFinanceServiceOfRate/ yearModel * days).toFixed(2));//小计服务费率
							
							var yearManagementConsultingOfRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearManagementConsultingOfRate').getValue();
							var sumManagementConsultingOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumManagementConsultingOfRate');
							sumManagementConsultingOfRatenf.setValue((yearManagementConsultingOfRate/ yearModel * days).toFixed(2));//小计咨询费率
							
							var sumAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.sumAccrualRate').getValue();
							var sumManagementConsultingRate = objectPanel.getCmpByName(objectPanel.defineForm+'.sumManagementConsultingOfRate').getValue();
							var sumFinanceServiceRate = objectPanel.getCmpByName(objectPanel.defineForm+'.sumFinanceServiceOfRate').getValue();
							if(sumAccrualRate!=null){
								sumAllRate += sumAccrualRate;
							}
							if(sumManagementConsultingRate!=null){
								sumAllRate += sumManagementConsultingRate;
							}
							if(sumFinanceServiceRate!=null){
								sumAllRate += sumFinanceServiceRate;
							}
							sumAllRatenf.setValue(sumAllRate.toFixed(2));//合计利率
							
						},
						failure : function(response,request) {
							Ext.ux.Toast.msg('操作信息', '查询任务完成时限操作失败!');
						}
					});
				}
			}else{
				
				Ext.Ajax.request({
					url : __ctxPath + "/common/loanTrial/getAllDaysLoanTrial.do",
					method : 'POST',
					scope:this,
					params : {
						startDate:startDate,
						intentDate:intentDate
					},
					success : function(response, request) {
						obj = Ext.util.JSON.decode(response.responseText);
						var days = obj.allDays;
						if(days!=0){
							if(headTailModel!=null&&headTailModel==0){
								days +=0;
							}else if(headTailModel!=null&&headTailModel==1){
								days +=1;
							}else if(headTailModel!=null&&headTailModel==2){
								days +=2;
							}
						}
						sumAllDaynf.setValue(days);
						if(accrualType=="accrualRateType"){
							var yearAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearAccrualRate').getValue();
							if(dateType=="yearAccrualRate"){
								yearAccrualRate = localValue;
							}else if(dateType=="monthAccrualRate"){
								yearAccrualRate = localValue*12;
							}else if(dateType=="dayAccrualRate"){
								yearAccrualRate = localValue*yearModel;
							}else if(dateType=="sumAccrualRate"){
								var dayAccrualRate = (localValue/days).toFixed(4);
								yearAccrualRate = dayAccrualRate*yearModel;
							}
							var yearAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.yearAccrualRate');
							var accrualnf = objectPanel.getCmpByName(objectPanel.defineForm+'.monthAccrualRate');
							var dayAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.dayAccrualRate');
							var sumAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumAccrualRate');
							yearAccrualRatenf.setValue(yearAccrualRate.toFixed(2));//年利率
							accrualnf.setValue((yearAccrualRate / 12).toFixed(2));//月利率
							dayAccrualRatenf.setValue((yearAccrualRate / yearModel).toFixed(4));//日利率
							sumAccrualRatenf.setValue((yearAccrualRate/ yearModel * days).toFixed(2));//合计利率
						}else if(accrualType=="managementConsultingOfRateType"){
							var yearAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearManagementConsultingOfRate').getValue();
							if(dateType=="yearAccrualRate"){
								yearAccrualRate = localValue;
							}else if(dateType=="monthAccrualRate"){
								yearAccrualRate = localValue*12;
							}else if(dateType=="dayAccrualRate"){
								yearAccrualRate = localValue*yearModel;
							}else if(dateType=="sumManagementConsultingOfRate"){
								var dayAccrualRate = (localValue/days).toFixed(4);
								yearAccrualRate = dayAccrualRate*yearModel;
							}
							var yearAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.yearManagementConsultingOfRate');
							var accrualnf = objectPanel.getCmpByName(objectPanel.defineForm+'.managementConsultingOfRate');
							var dayAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.dayManagementConsultingOfRate');
							var sumAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumManagementConsultingOfRate');
							yearAccrualRatenf.setValue(yearAccrualRate.toFixed(2));//年利率
							accrualnf.setValue((yearAccrualRate / 12).toFixed(2));//月利率
							dayAccrualRatenf.setValue((yearAccrualRate / yearModel).toFixed(4));//日利率
							sumAccrualRatenf.setValue((yearAccrualRate/ yearModel * days).toFixed(2));//合计利率
						}else if(accrualType=="financeServiceOfRateType"){
							var yearAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearFinanceServiceOfRate').getValue();
							if(dateType=="yearAccrualRate"){
								yearAccrualRate = localValue;
							}else if(dateType=="monthAccrualRate"){
								yearAccrualRate = localValue*12;
							}else if(dateType=="dayAccrualRate"){
								yearAccrualRate = localValue*yearModel;
							}else if(dateType=="sumFinanceServiceOfRate"){
								var dayAccrualRate = (localValue/days).toFixed(4);
								yearAccrualRate = dayAccrualRate*yearModel;
							}
							var yearAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.yearFinanceServiceOfRate');
							var accrualnf = objectPanel.getCmpByName(objectPanel.defineForm+'.financeServiceOfRate');
							var dayAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.dayFinanceServiceOfRate');
							var sumAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumFinanceServiceOfRate');
							yearAccrualRatenf.setValue(yearAccrualRate.toFixed(2));//年利率
							accrualnf.setValue((yearAccrualRate / 12).toFixed(2));//月利率
							dayAccrualRatenf.setValue((yearAccrualRate / yearModel).toFixed(4));//日利率
							sumAccrualRatenf.setValue((yearAccrualRate/ yearModel * days).toFixed(2));//合计利率
						}else if(accrualType=="yearModel"){//每日和小计有影响
							var yearAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearAccrualRate').getValue();
							var dayAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.dayAccrualRate');
							var sumAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumAccrualRate');
							dayAccrualRatenf.setValue((yearAccrualRate / yearModel).toFixed(4));//日利率
							sumAccrualRatenf.setValue((yearAccrualRate/ yearModel * days).toFixed(2));//合计利率
							
							var yearFinanceServiceOfRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearFinanceServiceOfRate').getValue();
							var dayFinanceServiceOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.dayFinanceServiceOfRate');
							var sumFinanceServiceOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumFinanceServiceOfRate');
							dayFinanceServiceOfRatenf.setValue((yearFinanceServiceOfRate / yearModel).toFixed(4));//日利率
							sumFinanceServiceOfRatenf.setValue((yearFinanceServiceOfRate/ yearModel * days).toFixed(2));//合计利率
							
							var yearManagementConsultingOfRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearManagementConsultingOfRate').getValue();
							var dayManagementConsultingOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.dayManagementConsultingOfRate');
							var sumManagementConsultingOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumManagementConsultingOfRate');
							dayManagementConsultingOfRatenf.setValue((yearManagementConsultingOfRate / yearModel).toFixed(4));//日管理费率
							sumManagementConsultingOfRatenf.setValue((yearManagementConsultingOfRate/ yearModel * days).toFixed(2));//小计管理费率
						}else if(accrualType=="headTailModel"){//小计有影响
							var yearAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearAccrualRate').getValue();
							var sumAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumAccrualRate');
							sumAccrualRatenf.setValue((yearAccrualRate/ yearModel * days).toFixed(2));//小计利率
							
							var yearFinanceServiceOfRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearFinanceServiceOfRate').getValue();
							var sumFinanceServiceOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumFinanceServiceOfRate');
							sumFinanceServiceOfRatenf.setValue((yearFinanceServiceOfRate/ yearModel * days).toFixed(2));//小计服务费率
							
							var yearManagementConsultingOfRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearManagementConsultingOfRate').getValue();
							var sumManagementConsultingOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumManagementConsultingOfRate');
							sumManagementConsultingOfRatenf.setValue((yearManagementConsultingOfRate/ yearModel * days).toFixed(2));//小计管理费率
						}
						
						var yearAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearAccrualRate').getValue();
						var yearManagementConsultingRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearManagementConsultingOfRate').getValue();
						var yearFinanceServiceRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearFinanceServiceOfRate').getValue();
						if(yearAccrualRate!=null){
							yearAllRate += yearAccrualRate;
						}
						if(yearManagementConsultingRate!=null){
							yearAllRate += yearManagementConsultingRate;
						}
						if(yearFinanceServiceRate!=null){
							yearAllRate += yearFinanceServiceRate;
						}
						yearAllRatenf.setValue(yearAllRate.toFixed(2));
						var accrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.monthAccrualRate').getValue();
						var managementConsultingRate = objectPanel.getCmpByName(objectPanel.defineForm+'.managementConsultingOfRate').getValue();
						var financeServiceRate = objectPanel.getCmpByName(objectPanel.defineForm+'.financeServiceOfRate').getValue();
						if(accrualRate!=null){
							monthAllRate += accrualRate;
						}
						if(managementConsultingRate!=null){
							monthAllRate += managementConsultingRate;
						}
						if(financeServiceRate!=null){
							monthAllRate += financeServiceRate;
						}
						monthAllRatenf.setValue(monthAllRate.toFixed(2));
						var dayAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.dayAccrualRate').getValue();
						var dayManagementConsultingRate = objectPanel.getCmpByName(objectPanel.defineForm+'.dayManagementConsultingOfRate').getValue();
						var dayFinanceServiceRate = objectPanel.getCmpByName(objectPanel.defineForm+'.dayFinanceServiceOfRate').getValue();
						if(dayAccrualRate!=null){
							dayAllRate += dayAccrualRate;
						}
						if(dayManagementConsultingRate!=null){
							dayAllRate += dayManagementConsultingRate;
						}
						if(dayFinanceServiceRate!=null){
							dayAllRate += dayFinanceServiceRate;
						}
						dayAllRatenf.setValue(dayAllRate.toFixed(4));
						var sumAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.sumAccrualRate').getValue();
						var sumManagementConsultingRate = objectPanel.getCmpByName(objectPanel.defineForm+'.sumManagementConsultingOfRate').getValue();
						var sumFinanceServiceRate = objectPanel.getCmpByName(objectPanel.defineForm+'.sumFinanceServiceOfRate').getValue();
						if(sumAccrualRate!=null){
							sumAllRate += sumAccrualRate;
						}
						if(sumManagementConsultingRate!=null){
							sumAllRate += sumManagementConsultingRate;
						}
						if(sumFinanceServiceRate!=null){
							sumAllRate += sumFinanceServiceRate;
						}
						sumAllRatenf.setValue(sumAllRate.toFixed(2));
						
					},
					failure : function(response,request) {
						Ext.ux.Toast.msg('操作信息', '查询任务完成时限操作失败!');
					}
				});
				
			}
		}
		LoanTrialFormPanelPrincipal.superclass.constructor.call(this, {
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true,
					labelWidth : leftlabel
				},
				items : [{
						layout : "column",
						border : false,
						scope : this,
						defaults : {
							anchor : '100%',
							columnWidth : 1,
							isFormField : true,
							labelWidth : leftlabel
						},
						items : [{
							columnWidth : 1,
							layout : 'column',
							items : [{
								columnWidth : .22, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 95,
								hidden : this.isProduct,
								items : [{
									fieldLabel : "本金总额:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
									style:{'text-align':'right'},
									labelSeparator : '',
									xtype : "moneyfield",
									allowBlank : this.isProduct,
									readOnly : this.isMoneyReadOnly,
									name:this.defineForm+".projectMoney",
									anchor : '100%',
									listeners : {
										scope : this,
										'change' : function() {}
									}

								}]
							},{
								columnWidth : .03, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 15,
								labelAlign : 'left',
								hidden : this.isProduct,
								items : [{
											fieldLabel : "元",
											labelSeparator : '',
											anchor : '100%'
										}]
							},{
								columnWidth :this.isProduct?.22: .15, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : this.isProduct?95:60,
								items : [{
									fieldLabel :this.isProduct?"贷款期数:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;":"贷款期数:",
									style:{'text-align':'right'},
									labelSeparator :'',
									xtype : "numberfield",
									vtype : "onlynum",
									fieldClass : 'field-align',
									allowBlank : this.isProduct,
									readOnly : this.isAllReadOnly,
									name : this.defineForm+".payintentPeriod",
									maxLength:3,//最多字符设置
									anchor : '100%',
									listeners : {
										scope : this,
										change : function(nf) {
											changeAccrualRate("changeDate","payintentPeriod",nf.getValue(),this);
										},  
										render: function (field, p) {
								              Ext.QuickTips.init();
								              Ext.QuickTips.register({
								                    target: field.el,
								                    text: '1、只能输入数字</br>'+'2、最多可输入3个字符'
								              })
										}
									}

								}]
							},{
								columnWidth : .03, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 15,
								labelAlign : 'left',
								items : [{
											fieldLabel : "期",
											labelSeparator : '',
											anchor : '100%'
										}]
							}, {
								columnWidth : .25,
								layout : 'form',
								labelWidth : 60,
								hidden : this.isProduct,
								items : [{
									fieldLabel : "放款日期",
									xtype : "datefield",
									name : this.defineForm+".startDate",
									readOnly : this.isStartDateReadOnly,
									allowBlank : this.isProduct,
									blankText : "放款日期不能为空，请正确填写!",
									format : 'Y-m-d',
									editable : false,
									anchor : '100%',
									listeners : {
										scope : this,
										afterrender : function(obj) {
										},
										select : function(nf) {
											changeAccrualRate("changeDate","startDate",nf.getValue(),this);
										}
									}
								}]
							}, {
								columnWidth : .22,
								layout : 'form',
								labelWidth : 60,
								hidden : this.isProduct,
								items : [{
									fieldLabel : "到期日期",
									xtype : "datefield",
									name : this.defineForm+".intentDate",
									readOnly : true,
									allowBlank : this.isProduct,
									anchor : '100%',
									format : 'Y-m-d'
								}]
							}]
						},{
							columnWidth : 1,
							layout : 'column',
							items : [{
								columnWidth : .1, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 65,
								labelAlign : 'right',
								items : [{
											fieldLabel : "还款方式",
											fieldClass : 'field-align',
											anchor : "100%"
										}]
							}, {
								columnWidth : 0.12,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '等额本金',
									name : 'accrualtype1'+ this.idDefinition,
									inputValue : false,
									anchor : "100%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = this.getCmpByName("accrualtype1"+ this.idDefinition).getValue();
											if (flag == true) {
												changeDisabled("accrualtype","sameprincipal",this);
											}
										}
									}
								}]
							}, {
								columnWidth : 0.12,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '等额本息',
									anchor : "100%",
									name : 'accrualtype2'+ this.idDefinition,
									inputValue : false,
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = this.getCmpByName("accrualtype2"+ this.idDefinition).getValue();
											if (flag == true) {
												changeDisabled("accrualtype","sameprincipalandInterest",this);
											}
										}
									}
								}]
							}, {
								columnWidth : 0.12,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '等本等息',
									anchor : "100%",
									name : 'accrualtype3'+ this.idDefinition,
									inputValue : false,
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = this.getCmpByName("accrualtype3"+ this.idDefinition).getValue();
											if (flag == true) {
												changeDisabled("accrualtype","sameprincipalsameInterest",this);
											}
										}
									}
								}]
							}, {
								columnWidth : 0.4,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '按期收息,期末收本',
									name : 'accrualtype4'+ this.idDefinition,
									inputValue : false,
									checked : true,
									anchor : "100%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = this.getCmpByName("accrualtype4"+ this.idDefinition).getValue();
											if (flag == true) {
												changeDisabled("accrualtype","singleInterest",this);
											}
										}
									}
								}]
							}, {
								xtype : "hidden",
								name : this.defineForm+".accrualtype",
								value : "singleInterest"
							}]
						},{
							columnWidth : 1,
							layout : 'column',
							items : [{
										columnWidth : .1, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 65,
										labelAlign : 'right',
										items : [{
													fieldLabel : "本金周期 ",
													fieldClass : 'field-align',
													anchor : "100%"
												}]
									}, {
										columnWidth : 0.12,
										labelWidth : 1,
										layout : 'form',
										hidden : true,
										items : [{
											xtype : 'radio',
											boxLabel : '日',
											name : "payaccrualTypePrincipal1" + this.idDefinition,
											inputValue : true,
											anchor : "100%",
											disabled : this.isAllReadOnly,
											listeners : {
												scope : this,
												check : function(obj, checked) {
													var flag = this.getCmpByName("payaccrualTypePrincipal1"+ this.idDefinition).getValue();
													if (flag == true) {
														changeDisabled("payaccrualTypePrincipal","dayPay",this);
														//changeAccrualRate("changeDate","payaccrualType","dayPay",this);
													} 
												}
											}
										}]
									}, {
										columnWidth : 0.12,
										labelWidth : 1,
										layout : 'form',
										items : [{
											xtype : 'radio',
											boxLabel : '月',
											name :"payaccrualTypePrincipal2" + this.idDefinition,
											inputValue : false,
											checked : true,
											anchor : "100%",
											disabled : this.isAllReadOnly,
											listeners : {
												scope : this,
												check : function(obj, checked) {
													var flag = this.getCmpByName("payaccrualTypePrincipal2"+ this.idDefinition).getValue();
													if (flag == true) {
														changeDisabled("payaccrualTypePrincipal","monthPay",this);
														//changeAccrualRate("changeDate","payaccrualType","monthPay",this);
													}
												}
											}
										}]
									}, {
										columnWidth : 0.12,
										labelWidth : 1,
										layout : 'form',
										items : [{
											xtype : 'radio',
											boxLabel : '季',
											name : "payaccrualTypePrincipal3" + this.idDefinition,
											inputValue : false,
											anchor : "100%",
											disabled : this.isAllReadOnly,
											listeners : {
												scope : this,
												check : function(obj, checked) {
													var flag = this.getCmpByName("payaccrualTypePrincipal3"+ this.idDefinition).getValue();
													if (flag == true) {
														changeDisabled("payaccrualTypePrincipal","seasonPay",this);
														//changeAccrualRate("changeDate","payaccrualType","seasonPay",this);
													}
												}
											}
										}]
									},{
										columnWidth : 0.12,
										labelWidth : 1,
										layout : 'form',
										items : [{
											xtype : 'radio',
											boxLabel : '半年',
											name : "payaccrualTypePrincipal6" + this.idDefinition,
											inputValue : false,
											anchor : "100%",
											disabled : this.isAllReadOnly,
											listeners : {
												scope : this,
												check : function(obj, checked) {
													var flag = this.getCmpByName("payaccrualTypePrincipal6"+ this.idDefinition).getValue();
													if (flag == true) {
														changeDisabled("payaccrualTypePrincipal","halfyearPay",this);
														//changeAccrualRate("changeDate","principalPayaccrualType","seasonPay",this);
													}
												}
											}
										}]
									}, {
										columnWidth : 0.12,
										labelWidth : 1,
										layout : 'form',
										items : [{
											xtype : 'radio',
											boxLabel : '年',
											name :"payaccrualTypePrincipal4" + this.idDefinition,
											inputValue : false,
											anchor : "100%",
											disabled : this.isAllReadOnly,
											listeners : {
												scope : this,
												check : function(obj, checked) {
													var flag = this.getCmpByName("payaccrualTypePrincipal4"+ this.idDefinition).getValue();
													if (flag == true) {
														changeDisabled("payaccrualTypePrincipal","yearPay",this);
														//changeAccrualRate("changeDate","payaccrualType","yearPay",this);
													}
												}
											}
										}]
									}, {
										columnWidth : .09,
										labelWidth : 1,
										layout : 'form',
										hidden : true,
										items : [{
											xtype : 'radio',
											boxLabel : '自定义',
											name : "payaccrualTypePrincipal5" + this.idDefinition,
											inputValue : false,
											anchor : "100%",
											disabled : this.isAllReadOnly,
											listeners : {
												scope : this,
												check : function(obj, checked) {
													var flag = this.getCmpByName("payaccrualTypePrincipal5"+ this.idDefinition).getValue();
													if (flag == true) {
														changeDisabled("payaccrualTypePrincipal","owerPay",this);
													} 
												}
											}
										}]
									}, {
										columnWidth : 0.1,
										labelWidth : 30,
										layout : 'form',
										hidden : true,
										items : [{
											xtype : 'numberfield',
											vtype : "onlynum",
											fieldLabel : "每期",
											anchor : "100%",
											readOnly : this.isAllReadOnly,
											fieldClass : 'field-align',
											name : this.defineForm+'.dayOfEveryPeriodPrincipal',
											maxLength:5,//最多字符设置
											disabled : true,
											listeners : {
												scope : this,
												change : function(nf) {
													//changeAccrualRate("changeDate","dayOfEveryPeriod",nf.getValue(),this);
												},  
												render: function (field, p) {
										              Ext.QuickTips.init();
										              Ext.QuickTips.register({
										                    target: field.el,
										                    text: '1、只能输入数字</br>'+'2、最多可输入5个字符'
										              })
												}
											}
										}]
									}, {
										columnWidth : 0.07,
										labelWidth : 20,
										layout : 'form',
										hidden : true,
										items : [{
													fieldLabel : "日",
													labelSeparator : '',
													anchor : "100%"
												}]
									}, {
											xtype : "hidden",
											name : this.defineForm+".payaccrualTypePrincipal",
											value : "monthPay"

										}]
							}, {
							columnWidth : 1,
							layout : 'column',
							items : [{
										columnWidth : .1, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 65,
										labelAlign : 'right',
										items : [{
													fieldLabel : "还款周期 ",
													fieldClass : 'field-align',
													anchor : "100%"
												}]
									}, {
										columnWidth : 0.12,
										labelWidth : 1,
										layout : 'form',
										items : [{
											xtype : 'radio',
											boxLabel : '日',
											name : "payaccrualType1" + this.idDefinition,
											inputValue : true,
											anchor : "100%",
											disabled : this.isAllReadOnly,
											listeners : {
												scope : this,
												check : function(obj, checked) {
													var flag = this.getCmpByName("payaccrualType1"+ this.idDefinition).getValue();
													if (flag == true) {
														changeDisabled("payaccrualType","dayPay",this);
														changeAccrualRate("changeDate","payaccrualType","dayPay",this);
													} 
												}
											}
										}]
									}, {
										columnWidth : 0.12,
										labelWidth : 1,
										layout : 'form',
										items : [{
											xtype : 'radio',
											boxLabel : '月',
											name :"payaccrualType2" + this.idDefinition,
											inputValue : false,
											checked : true,
											anchor : "100%",
											disabled : this.isAllReadOnly,
											listeners : {
												scope : this,
												check : function(obj, checked) {
													var flag = this.getCmpByName("payaccrualType2"+ this.idDefinition).getValue();
													if (flag == true) {
														changeDisabled("payaccrualType","monthPay",this);
														changeAccrualRate("changeDate","payaccrualType","monthPay",this);
													}
												}
											}
										}]
									}, {
										columnWidth : 0.12,
										labelWidth : 1,
										layout : 'form',
										items : [{
											xtype : 'radio',
											boxLabel : '季',
											name : "payaccrualType3" + this.idDefinition,
											inputValue : false,
											anchor : "100%",
											disabled : this.isAllReadOnly,
											listeners : {
												scope : this,
												check : function(obj, checked) {
													var flag = this.getCmpByName("payaccrualType3"+ this.idDefinition).getValue();
													if (flag == true) {
														changeDisabled("payaccrualType","seasonPay",this);
														changeAccrualRate("changeDate","payaccrualType","seasonPay",this);
													}
												}
											}
										}]
									}, {
										columnWidth : 0.12,
										labelWidth : 1,
										layout : 'form',
										items : [{
											xtype : 'radio',
											boxLabel : '年',
											name :"payaccrualType4" + this.idDefinition,
											inputValue : false,
											anchor : "100%",
											disabled : this.isAllReadOnly,
											listeners : {
												scope : this,
												check : function(obj, checked) {
													var flag = this.getCmpByName("payaccrualType4"+ this.idDefinition).getValue();
													if (flag == true) {
														changeDisabled("payaccrualType","yearPay",this);
														changeAccrualRate("changeDate","payaccrualType","yearPay",this);
													}
												}
											}
										}]
									}, {
										columnWidth : .09,
										labelWidth : 1,
										layout : 'form',
										items : [{
											xtype : 'radio',
											boxLabel : '自定义',
											name : "payaccrualType5" + this.idDefinition,
											inputValue : false,
											anchor : "100%",
											disabled : this.isAllReadOnly,
											listeners : {
												scope : this,
												check : function(obj, checked) {
													var flag = this.getCmpByName("payaccrualType5"+ this.idDefinition).getValue();
													if (flag == true) {
														changeDisabled("payaccrualType","owerPay",this);
													} 
												}
											}
										}, {
											xtype : "hidden",
											name : this.defineForm+".payaccrualType",
											value : "monthPay"

										}]
									}, {
										columnWidth : 0.1,
										labelWidth : 30,
										layout : 'form',
										items : [{
											xtype : 'numberfield',
											vtype : "onlynum",
											fieldLabel : "每期",
											anchor : "100%",
											readOnly : this.isAllReadOnly,
											fieldClass : 'field-align',
											name : this.defineForm+'.dayOfEveryPeriod',
											maxLength:5,//最多字符设置
											disabled : true,
											listeners : {
												scope : this,
												change : function(nf) {
													changeAccrualRate("changeDate","dayOfEveryPeriod",nf.getValue(),this);
												},  
												render: function (field, p) {
										              Ext.QuickTips.init();
										              Ext.QuickTips.register({
										                    target: field.el,
										                    text: '1、只能输入数字</br>'+'2、最多可输入5个字符'
										              })
												}
											}
										}]
									}, {
										columnWidth : 0.07,
										labelWidth : 20,
										layout : 'form',
										items : [{
													fieldLabel : "日",
													labelSeparator : '',
													anchor : "100%"
												}]
									}]
							}, {
								columnWidth : 1,
								layout : 'column',
								items : [{
									columnWidth : .1,
									layout : 'form',
									labelWidth : 65,
									labelAlign : 'right',
									items : [{
												fieldLabel : '贷款利率',
												fieldClass : 'field-align',
												anchor : "100%"
											}]
								}, {
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									items : [{
										fieldLabel : "每年",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : this.defineForm+".yearAccrualRate",
										readOnly : this.isAllReadOnly,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0,
										listeners : {
											scope : this,
											change : function(nf) {
												changeAccrualRate("accrualRateType","yearAccrualRate",nf.getValue(),this);
											},  
											render: function (field, p) {
									              Ext.QuickTips.init();
									              Ext.QuickTips.register({
									                    target: field.el,
									                    text: '1，首先设定年化利率：年化利率除以12得到月化利率；年化利率除以年模型得到日化利率；日化利率乘以总天数得到小计利率。</br>'
									                    	+'2，首先设定月化利率：月化利率乘以12得到年化利率；年化利率除以年模型得到日化利率；日化利率乘以总天数得到小计利率。</br>'
									                    	+'3，首先设定日化利率：日化利率乘以年模型得到年化利率；年化利率除以12得到月化利率；日化利率乘以总天数得到小计利率。</br>'
									                    	+'4，首先设定小计利率：小计利率除以总天数得到日化利率；日化利率乘以年模型得到年化利率；年化利率除以12得到月化利率。'
									              })
									         }
										}
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlign : 'left',
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								}, {
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									items : [{
										fieldLabel : "每月",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : this.defineForm+".monthAccrualRate",
										readOnly : this.isAllReadOnly,
										style : {
											imeMode : 'disabled'
										},
										decimalPrecision : 8,
										value : 0,
										listeners : {
											scope : this,
											'change' : function(nf) {
												changeAccrualRate("accrualRateType","monthAccrualRate",nf.getValue(),this);
											}
										}
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								}, {
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									items : [{
										fieldLabel : "每日",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : this.defineForm+".dayAccrualRate",
										readOnly : this.isAllReadOnly,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0,
										listeners : {
											scope : this,
											'change' : function(nf) {
												changeAccrualRate("accrualRateType","dayAccrualRate",nf.getValue(),this);
											}
										}
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								},{
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									hidden : this.isProduct,
									items : [{
										fieldLabel : "小计",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : this.defineForm+".sumAccrualRate",
										readOnly : this.isAllReadOnly,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0,
										listeners : {
											scope : this,
											change : function(nf) {
												changeAccrualRate("accrualRateType","sumAccrualRate",nf.getValue(),this);
											}
										}
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									hidden : this.isProduct,
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								},{
									columnWidth : .2,
									layout : 'form',
									labelWidth : 60,
									hidden :this.isSumReadOnly,
									items : [{
										fieldLabel : "收入小计",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'textfield',
										name : "sumAllAccrualRate",
										readOnly : true,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									hidden : this.isSumReadOnly,
									items : [{
												fieldLabel : "元",
												labelSeparator : '',
												anchor : "100%"
											}]
								}]
					}, {
						columnWidth : 1,
						layout : 'column',
						items : [{
									columnWidth : .1,
									layout : 'form',
									labelWidth : 65,
									labelAlign : 'right',
									items : [{
												fieldLabel : '咨询费率',
												fieldClass : 'field-align',
												anchor : "100%"
											}]
								}, {
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									items : [{
										fieldLabel : "每年",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : this.defineForm+".yearManagementConsultingOfRate",
										readOnly : this.isAllReadOnly,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0,
										listeners : {
											scope : this,
											change : function(nf) {
												changeAccrualRate("managementConsultingOfRateType","yearAccrualRate",nf.getValue(),this);
											},  
											render: function (field, p) {
									              Ext.QuickTips.init();
									              Ext.QuickTips.register({
									                    target: field.el,
									                    text: '1，首先设定年化利率：年化利率除以12得到月化利率；年化利率除以年模型得到日化利率；日化利率乘以总天数得到小计利率。</br>'
									                    	+'2，首先设定月化利率：月化利率乘以12得到年化利率；年化利率除以年模型得到日化利率；日化利率乘以总天数得到小计利率。</br>'
									                    	+'3，首先设定日化利率：日化利率乘以年模型得到年化利率；年化利率除以12得到月化利率；日化利率乘以总天数得到小计利率。</br>'
									                    	+'4，首先设定小计利率：小计利率除以总天数得到日化利率；日化利率乘以年模型得到年化利率；年化利率除以12得到月化利率。'
									              })
									         }
										}
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlign : 'left',
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								}, {
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									items : [{
										fieldLabel : "每月",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : this.defineForm+".managementConsultingOfRate",
										readOnly : this.isAllReadOnly,
										style : {
											imeMode : 'disabled'
										},
										decimalPrecision : 8,
										value : 0,
										listeners : {
											scope : this,
											'change' : function(nf) {
												changeAccrualRate("managementConsultingOfRateType","monthAccrualRate",nf.getValue(),this);
											}
										}
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								}, {
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									items : [{
										fieldLabel : "每日",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : this.defineForm+".dayManagementConsultingOfRate",
										readOnly : this.isAllReadOnly,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0,
										listeners : {
											scope : this,
											change : function(nf) {
												changeAccrualRate("managementConsultingOfRateType","dayAccrualRate",nf.getValue(),this);
											}
										}
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								},{
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									hidden : this.isProduct,
									items : [{
										fieldLabel : "小计",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : this.defineForm+".sumManagementConsultingOfRate",
										readOnly : this.isAllReadOnly,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0,
										listeners : {
											scope : this,
											change : function(nf) {
												changeAccrualRate("managementConsultingOfRateType","sumManagementConsultingOfRate",nf.getValue(),this);
											}
										}
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									hidden : this.isProduct,
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								},{
									columnWidth : .2,
									layout : 'form',
									labelWidth : 60,
									hidden : this.isSumReadOnly,
									items : [{
										fieldLabel : "收入小计",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'textfield',
										name : "sumAllManagementConsultingOfRate",
										readOnly : true,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									hidden : this.isSumReadOnly,
									items : [{
												fieldLabel : "元",
												labelSeparator : '',
												anchor : "100%"
											}]
								}]
					}, {
						columnWidth : 1,
						layout : 'column',
						items : [{
									columnWidth : .1,
									layout : 'form',
									labelWidth : 65,
									labelAlign : 'right',
									items : [{
												fieldLabel : '服务费率',
												fieldClass : 'field-align',
												anchor : "100%"
											}]
								}, {
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									items : [{
										fieldLabel : "每年",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : this.defineForm+".yearFinanceServiceOfRate",
										readOnly : this.isAllReadOnly,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0,
										listeners : {
											scope : this,
											change : function(nf) {
												changeAccrualRate("financeServiceOfRateType","yearAccrualRate",nf.getValue(),this);
											},  
											render: function (field, p) {
									              Ext.QuickTips.init();
									              Ext.QuickTips.register({
									                    target: field.el,
									                    text: '1，首先设定年化利率：年化利率除以12得到月化利率；年化利率除以年模型得到日化利率；日化利率乘以总天数得到小计利率。</br>'
									                    	+'2，首先设定月化利率：月化利率乘以12得到年化利率；年化利率除以年模型得到日化利率；日化利率乘以总天数得到小计利率。</br>'
									                    	+'3，首先设定日化利率：日化利率乘以年模型得到年化利率；年化利率除以12得到月化利率；日化利率乘以总天数得到小计利率。</br>'
									                    	+'4，首先设定小计利率：小计利率除以总天数得到日化利率；日化利率乘以年模型得到年化利率；年化利率除以12得到月化利率。'
									              })
									         }
										}
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlign : 'left',
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								}, {
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									items : [{
										fieldLabel : "每月",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : this.defineForm+".financeServiceOfRate",
										readOnly : this.isAllReadOnly,
										style : {
											imeMode : 'disabled'
										},
										decimalPrecision : 8,
										value : 0,
										listeners : {
											scope : this,
											'change' : function(nf) {
												changeAccrualRate("financeServiceOfRateType","monthAccrualRate",nf.getValue(),this);
											}
										}
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								}, {
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									items : [{
										fieldLabel : "每日",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : this.defineForm+".dayFinanceServiceOfRate",
										readOnly : this.isAllReadOnly,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0,
										listeners : {
											scope : this,
											'change' : function(nf) {
												changeAccrualRate("financeServiceOfRateType","dayAccrualRate",nf.getValue(),this);
											}
										}
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								},{
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									hidden : this.isProduct,
									items : [{
										fieldLabel : "小计",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : this.defineForm+".sumFinanceServiceOfRate",
										readOnly : this.isAllReadOnly,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0,
										listeners : {
											scope : this,
											change : function(nf) {
												changeAccrualRate("financeServiceOfRateType","sumFinanceServiceOfRate",nf.getValue(),this);
											}
										}
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									hidden : this.isProduct,
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								},{
									columnWidth : .2,
									layout : 'form',
									labelWidth : 60,
									hidden :this.isSumReadOnly,
									items : [{
										fieldLabel : "收入小计",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'textfield',
										name : "sumAllFinanceServiceOfRate",
										readOnly : true,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									hidden :this.isSumReadOnly,
									items : [{
												fieldLabel : "元",
												labelSeparator : '',
												anchor : "100%"
											}]
								}]
					},{
						columnWidth : 1,
						layout : 'column',
						hidden : this.isSumReadOnly,
						items : [{
									columnWidth : .1,
									layout : 'form',
									labelWidth : 65,
									labelAlign : 'right',
									items : [{
												fieldLabel : '收入合计',
												fieldClass : 'field-align',
												anchor : "100%"
											}]
								}, {
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									items : [{
										fieldLabel : "每年",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : "yearAllRate",
										readOnly : true,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlign : 'left',
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								}, {
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									items : [{
										fieldLabel : "每月",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : "monthAllRate",
										readOnly : true,
										style : {
											imeMode : 'disabled'
										},
										decimalPrecision : 8,
										value : 0
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								}, {
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									items : [{
										fieldLabel : "每日",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : "dayAllRate",
										readOnly : true,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								},{
									columnWidth : .12,
									layout : 'form',
									labelWidth : 30,
									items : [{
										fieldLabel : "合计",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'numberfield',
										name : "sumAllRate",
										readOnly : true,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									items : [{
												fieldLabel : "%",
												labelSeparator : '',
												anchor : "100%"
											}]
								},{
									columnWidth : .2,
									layout : 'form',
									labelWidth : 60,
									items : [{
										fieldLabel : "收入合计",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : 'textfield',
										name : "sumAllRateMoney",
										readOnly : true,
										allowBlank : !this.isProduct,
										hidden : this.isProduct,
										decimalPrecision : 8,
										style : {
											imeMode : 'disabled'
										},
										value : 0
									}]
								}, {
									columnWidth : .03,
									layout : 'form',
									labelWidth : 15,
									labelAlgin : 'left',
									hidden : this.isProduct,
									items : [{
												fieldLabel : "元",
												labelSeparator : '',
												anchor : "100%"
											}]
								}]
						}, {
							columnWidth : 1,
							layout : 'column',
							items : [{
										columnWidth : .1,
										layout : 'form',
										labelWidth : 65,
										labelAlign : 'right',
										items : [{
													fieldLabel : '还款选项',
													fieldClass : 'field-align',
													anchor : "100%"
												}]
									}, {
										columnWidth : .12, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 1,
										items : [{
											xtype : "checkbox",
											boxLabel : "前置付息",
											disabled : this.isAllReadOnly,
											anchor : "100%",
											name : "isPreposePayAccrualCheck",
											listeners : {
												scope : this,
												'check' : function(box, value) {
													if (value == true) {
														this.getCmpByName(this.defineForm+'.isPreposePayAccrual').setValue(1);
													} else {
														this.getCmpByName(this.defineForm+'.isPreposePayAccrual').setValue(0);
													}
												}
											}
										}, {
											xtype : 'hidden',
											name : this.defineForm+'.isPreposePayAccrual',
											value : 0
										}]
									}, {
										columnWidth : .12, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 1,
										items : [{
											xtype : "checkbox",
											boxLabel : "一次性付息",
											disabled : this.isAllReadOnly,
											anchor : "100%",
											name : "isInterestByOneTimeCheck",
											listeners : {
												scope : this,
												'check' : function(box, value) {
													if (value == true) {
														this.getCmpByName(this.defineForm+'.isInterestByOneTime').setValue(1);
													} else {
														this.getCmpByName(this.defineForm+'.isInterestByOneTime').setValue(0);
													}
												}
											}
										}, {
											xtype : 'hidden',
											name : this.defineForm+'.isInterestByOneTime',
											value : 0
										}]
									},{
										columnWidth : .12, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 1,
										items : [{
											xtype : "checkbox",
											boxLabel : "一次性付本",
											disabled : this.isAllReadOnly,
											anchor : "100%",
											name : "isPrincipalByOneTimeCheck",
											listeners : {
												scope : this,
												'check' : function(box, value) {
													if (value == true) {
														this.getCmpByName(this.defineForm+'.isPrincipalByOneTime').setValue(1);
													} else {
														this.getCmpByName(this.defineForm+'.isPrincipalByOneTime').setValue(0);
													}
												}
											}
										}, {
											xtype : 'hidden',
											name : this.defineForm+'.isPrincipalByOneTime',
											value : 0
										}]
									}, {
									columnWidth : 0.12,
									labelWidth : 1,
									layout : 'form',
									items : [{
										xtype : 'radio',
										boxLabel : '对日还款',
										name : "isStartDatePay2"+ this.idDefinition,
										inputValue : false,
										anchor : "100%",
										readOnly : this.isAllReadOnly,
										disabled : this.isAllReadOnly,
										checked : true,
										listeners : {
											scope : this,
											check : function(obj,checked) {
												var flag = this.getCmpByName("isStartDatePay2"+ this.idDefinition).getValue();
												if (flag == true) {
													changeDisabled("isStartDatePay","2",this);
												}
											}
										}
									}]
								},{
									columnWidth : 0.04,
									labelWidth :1,
									layout : 'form',
									items : [{
										xtype : 'radio',
										inputValue : false,
										name : "isStartDatePay1"+ this.idDefinition,
										anchor : "100%",
										readOnly : this.isAllReadOnly,
										disabled : this.isAllReadOnly,
										listeners : {
											scope : this,
											check : function(obj,checked) {
												var flag = this.getCmpByName("isStartDatePay1"+ this.idDefinition).getValue();
												if (flag == true) {
													changeDisabled("isStartDatePay","1",this);
												}
											}
										}

									}]
								}, {
									columnWidth : 0.15,
									labelWidth :1,
									layout : 'form',
									items : [{
										fieldClass : 'field-align',
										readOnly : this.isAllReadOnly,
										name : this.defineForm+".payintentPerioDate",
										xtype : 'combo',
										mode : 'local',
										disabled : true,
										displayField : 'name',
										valueField : 'id',
										editable : false,
										store : new Ext.data.SimpleStore(
												{
													fields : ["name","id"],
													data : obstorepayintentPeriod
												}),
										triggerAction : "all",
										hiddenName : this.defineForm+".payintentPerioDate",
										anchor : '100%',
										triggerAction : "all",
										listeners : {
											scope : this,  
										    afterrender:function(combo1){
										    	var combo1Value = combo1.getValue();
										    	if(combo1Value==null||combo1Value==""){
											      	var firstValue = combo1.store.getAt(4).get('name');
											       	var firstName = combo1.store.getAt(4).get('id');  
											     	combo1.setValue(firstName); 
											      	combo1.setRawValue(firstValue); 
										    	}
										   }  
										} 
									}]
								}, {
									xtype : "hidden",
									name : this.defineForm+".isStartDatePay",
									value : 2
								}]
							},{
								columnWidth : 1,
								layout : 'column',
								items : [{
									columnWidth : .1,
									layout : 'form',
									labelWidth : 65,
									labelAlign : 'right',
									items : [{
										fieldLabel : '模型设定',
										fieldClass : 'field-align',
										anchor : "100%"
									}]
								},{
									columnWidth : .21, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 30,
									labelAlign : 'right',
									items : [{
										xtype : "combo",
										fieldLabel : "头尾",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										readOnly : this.isAllReadOnly,
										hiddenName : this.defineForm+".headTailModel",
										mode : 'local',
										displayField : 'name',
										valueField : 'id',
										editable : false,
										store : new Ext.data.SimpleStore({
													fields : ["id", "name"],
													data : [[0,'不算头不算尾'],[1,'算头不算尾'],[2,'算头又算尾']]
												}),
										triggerAction : "all",
										listeners : {
											scope : this,  
										    afterrender:function(combo1){
										    	var combo1Value = combo1.getValue();
										    	if(combo1Value==null||combo1Value==""){
											      	var firstValue = combo1.store.getAt(1).get('name');
											       	var firstName = combo1.store.getAt(1).get('id');  
											     	combo1.setValue(firstName); 
											      	combo1.setRawValue(firstValue);
										    	}
										   },
										   'select' : function(nf) {
												changeAccrualRate("headTailModel","",nf.getValue(),this);
											}
										} 
									}]
								},{
									columnWidth : .17, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 65,
									items : [{
										fieldLabel : "合计天数",
										style:{'text-align':'right'},
										labelSeparator : '',
										xtype : "textfield",
										readOnly : true,
										name:this.defineForm+".sumAllDay",
										anchor : "100%",
										listeners : {
											scope : this,  
											render: function (field, p) {
								              Ext.QuickTips.init();
								              Ext.QuickTips.register({
								                    target: field.el,
								                    text: '以一年为例：</br>'
								                    	+'1，不算头不算尾（头尾日期差 -1）= 364天</br>'
								                    	+'2，算头不算尾（头尾日期差）= 365天</br>'
								                    	+'3，算头又算尾（头尾日期差 +1）= 366天</br>'
								              })
								           }
										} 
									}]
								},{
									columnWidth : .24, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 30,
									labelAlign : 'left',
									items : [{
										fieldLabel : "月息",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : "combo",
										readOnly : this.isAllReadOnly,
										hiddenName : this.defineForm+".monthModel",
										mode : 'local',
										displayField : 'name',
										valueField : 'id',
										editable : false,
										forceSelection :true, 
										store : new Ext.data.SimpleStore({
													fields : ["id", "name"],
													data : [[1,'按月化利率直接计算'],[2,'按日化利率乘以实际天数计算'],[3,'按日化利率乘以固定30天计算']]
												}),
										triggerAction : "all",
										listeners : {
											scope : this,  
										    afterrender:function(combo1){
										    	var combo1Value = combo1.getValue();
										    	if(combo1Value==null||combo1Value==""){
											      	var firstValue = combo1.store.getAt(0).get('name');
											       	var firstName = combo1.store.getAt(0).get('id');  
											     	combo1.setValue(firstName); 
											      	combo1.setRawValue(firstValue);
										    	}
										   }  
										} 
									}]
								} ,{
									columnWidth : .18, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 45,
									labelAlign : 'right',
									items : [{
										fieldLabel : "年模型",
										fieldClass : 'field-align',
										labelSeparator : '',
										anchor : "100%",
										xtype : "combo",
										readOnly : this.isAllReadOnly,
										hiddenName : this.defineForm+".yearModel",
										mode : 'local',
										displayField : 'name',
										valueField : 'id',
										editable : false,
										store : new Ext.data.SimpleStore({
													fields : ["id", "name"],
													data : [[360,'360天'],[365,'365天']]
												}),
										triggerAction : "all",
										listeners : {
											scope : this,  
										    afterrender:function(combo1){
										    	var combo1Value = combo1.getValue();
										    	if(combo1Value==null||combo1Value==""){
											      	var firstValue = combo1.store.getAt(0).get('name');
											       	var firstName = combo1.store.getAt(0).get('id');  
											     	combo1.setValue(firstName); 
											      	combo1.setRawValue(firstValue);
										    	}
										    },
										    select : function(nf) {
											   changeAccrualRate("yearModel","",nf.getValue(),this);
											},  
											render: function (field, p) {
									              Ext.QuickTips.init();
									              Ext.QuickTips.register({
									                    target: field.el,
									                    text: '1，日利率=年利率/360 或者 日利率=年利率/365'
									              })
									           }
										}
									}]
								}]
							}]
					}]
			}]
		});
	},
	initComponents : function() {
	}
});
Ext.reg('LoanTrialFormPanelPrincipal', LoanTrialFormPanelPrincipal);

