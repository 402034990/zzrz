
LoanTrialProductFormPanel = Ext.extend(Ext.Panel, {
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
	isModelHidden : false,//模型设定行
	isManagerHidden : false,//随期费率1行
	isFinaceHidden : false,//随期费率2行
	isCheckHidden : false,//还款选项
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
		if (typeof(_cfg.isModelHidden) != "undefined") {
			this.isModelHidden = _cfg.isModelHidden;
		}
		if (typeof(_cfg.isManagerHidden) != "undefined") {
			this.isManagerHidden = _cfg.isManagerHidden;
		}
		if (typeof(_cfg.isFinaceHidden) != "undefined") {
			this.isFinaceHidden = _cfg.isFinaceHidden;
		}
		if (typeof(_cfg.isCheckHidden) != "undefined") {
			this.isCheckHidden = _cfg.isCheckHidden;
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		var leftlabel = 100;
		var centerlabel = 100;
		var rightlabel = 100;
		var firstColumnWidth = 0.1;
		var middleColumnWidth = 0.21;
		if(!this.isProduct){
			 middleColumnWidth = 0.17;
		}
		var firstLableWidth = 95;
		var everyRadioColumnWidth = 0.14;
		if(!this.isProduct){
			 everyRadioColumnWidth = 0.15;
		}
		var onlyColumnWidth = everyRadioColumnWidth+.025;
		if(!this.isProduct){
			 onlyColumnWidth = 0.09;
		}
		var lastColumnWidth = 0.245;
		if(!this.isProduct){
			 lastColumnWidth = 0.19;
		}
		var labelColumnWidth = 0.22;
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
				objectPanel.getCmpByName(objectPanel.defineForm+'.payaccrualType').setValue(dateType);
				if(dateType=="dayPay"||dateType=="owerPay"){
					objectPanel.getCmpByName(objectPanel.defineForm+'.isStartDatePay').setValue("2");
					objectPanel.getCmpByName('isStartDatePay1'+ objectPanel.idDefinition).setDisabled(true);
					objectPanel.getCmpByName('isStartDatePay1'+ objectPanel.idDefinition).setValue(false);
					objectPanel.getCmpByName('isStartDatePay2'+ objectPanel.idDefinition).setDisabled(true);
					objectPanel.getCmpByName('isStartDatePay2'+ objectPanel.idDefinition).setValue(true);
					if(dateType=="owerPay"){
						objectPanel.getCmpByName('payaccrualType1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType5'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType6'+ objectPanel.idDefinition).setValue(true);
						
						objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriod').setDisabled(false);
					}else{
						objectPanel.getCmpByName('payaccrualType1'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualType2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType5'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType6'+ objectPanel.idDefinition).setValue(false);
						
						objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriod').setDisabled(true);
						objectPanel.getCmpByName(objectPanel.defineForm+'.dayOfEveryPeriod').setValue(null);
					}
				}else{
					if(dateType=="monthPay"){
						objectPanel.getCmpByName('payaccrualType1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType2'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualType3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType5'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType6'+ objectPanel.idDefinition).setValue(false);
					}else if(dateType=="seasonPay"){
						objectPanel.getCmpByName('payaccrualType1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType3'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualType4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType5'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType6'+ objectPanel.idDefinition).setValue(false);
					}else if(dateType=="halfYearPay"){
						objectPanel.getCmpByName('payaccrualType1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType4'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualType5'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType6'+ objectPanel.idDefinition).setValue(false);
					}else if(dateType=="yearPay"){
						objectPanel.getCmpByName('payaccrualType1'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType2'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType3'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType4'+ objectPanel.idDefinition).setValue(false);
						objectPanel.getCmpByName('payaccrualType5'+ objectPanel.idDefinition).setValue(true);
						objectPanel.getCmpByName('payaccrualType6'+ objectPanel.idDefinition).setValue(false);
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
			}else if(selectType=="overdueReceiveWay"){
				objectPanel.getCmpByName(objectPanel.defineForm+'.overdueReceiveWay').setValue(dateType);
				if(dateType==0){//逾期计算方式
					objectPanel.getCmpByName('overdueReceiveWay1').setValue(true);
					objectPanel.getCmpByName('overdueReceiveWay2').setValue(false);
				}else if(dateType==1){
					objectPanel.getCmpByName('overdueReceiveWay1').setValue(false);
					objectPanel.getCmpByName('overdueReceiveWay2').setValue(true);
				}
			}else if(selectType=="penaltyReceiveWay"){
				objectPanel.getCmpByName(objectPanel.defineForm+'.penaltyReceiveWay').setValue(dateType);
				if(dateType==0){//罚息计算方式
					objectPanel.getCmpByName('penaltyReceiveWay1').setValue(true);
					objectPanel.getCmpByName('penaltyReceiveWay2').setValue(false);
				}else if(dateType==1){
					objectPanel.getCmpByName('penaltyReceiveWay1').setValue(false);
					objectPanel.getCmpByName('penaltyReceiveWay2').setValue(true);
				}
			}else if(selectType=="prepayMoney"){
				objectPanel.getCmpByName(objectPanel.defineForm+'.prepayMoney').setValue(dateType);
				if(dateType==0){//违约金计算方式
					objectPanel.getCmpByName('prepayMoney1').setValue(true);
					objectPanel.getCmpByName('prepayMoney2').setValue(false);
				}else if(dateType==1){
					objectPanel.getCmpByName('prepayMoney1').setValue(false);
					objectPanel.getCmpByName('prepayMoney2').setValue(true);
				} 
			}else if(selectType=="depositsReleaseWay"){
				objectPanel.getCmpByName(objectPanel.defineForm+'.depositsReleaseWay').setValue(dateType);
				if(dateType==0){//保证金释放方式
					objectPanel.getCmpByName('depositsReleaseWay1').setValue(true);
					objectPanel.getCmpByName('depositsReleaseWay2').setValue(false);
				}else if(dateType==1){
					objectPanel.getCmpByName('depositsReleaseWay1').setValue(false);
					objectPanel.getCmpByName('depositsReleaseWay2').setValue(true);
				}
			}else if(selectType=="creditfreedType"){
				objectPanel.getCmpByName(objectPanel.defineForm+'.creditfreedType').setValue(dateType);
				if(dateType==0){//授信释放方式
					objectPanel.getCmpByName('creditfreedType1').setValue(true);
					objectPanel.getCmpByName('creditfreedType2').setValue(false);
				}else if(dateType==1){
					objectPanel.getCmpByName('creditfreedType1').setValue(false);
					objectPanel.getCmpByName('creditfreedType2').setValue(true);
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
			if(yearModel==null||yearModel==""){
				yearModel = 360;
			}
			var headTailModel = objectPanel.getCmpByName(objectPanel.defineForm+'.headTailModel').getValue();
			if(headTailModel==null||headTailModel==""){
				headTailModel = 1;
			}
			
			var sumAllDaynf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumAllDay');
			var days = 0;
			//计算合计利率
			var yearAllRatenf = objectPanel.getCmpByName('yearAllRate');
			var monthAllRatenf = objectPanel.getCmpByName('monthAllRate');
			var dayAllRatenf = objectPanel.getCmpByName('dayAllRate');
			var sumAllRatenf = objectPanel.getCmpByName('sumAllRate');
			var fixedAllMoneynf = objectPanel.getCmpByName('sumAllfixedMoney');
			var yearAllRate = 0;
			var monthAllRate = 0;
			var dayAllRate = 0;
			var sumAllRate = 0;
			var fixedAllMoney = 0;
			var startDate = objectPanel.getCmpByName(objectPanel.defineForm+'.startDate').getValue();
			var intentDate = objectPanel.getCmpByName(objectPanel.defineForm+'.intentDate').getValue();
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
							//sumAllDaynf.setValue(days);
							var yearAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearAccrualRate').getValue();
							var sumAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumAccrualRate');
							sumAccrualRatenf.setValue((yearAccrualRate/ yearModel * days).toFixed(4));//小计利率
							
							var yearFinanceServiceOfRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearFinanceServiceOfRate').getValue();
							var sumFinanceServiceOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumFinanceServiceOfRate');
							sumFinanceServiceOfRatenf.setValue((yearFinanceServiceOfRate/ yearModel * days).toFixed(4));//小计服务费率
							
							var yearManagementConsultingOfRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearManagementConsultingOfRate').getValue();
							var sumManagementConsultingOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumManagementConsultingOfRate');
							sumManagementConsultingOfRatenf.setValue((yearManagementConsultingOfRate/ yearModel * days).toFixed(4));//小计咨询费率
							
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
							sumAllRatenf.setValue(sumAllRate.toFixed(4));//合计利率
							
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
						//sumAllDaynf.setValue(days);
						if(accrualType=="accrualRateType"){
							var yearAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearAccrualRate').getValue();
							if(dateType=="yearAccrualRate"){
								yearAccrualRate = localValue;
							}else if(dateType=="accrual"){
								yearAccrualRate = localValue*12;
							}else if(dateType=="dayAccrualRate"){
								yearAccrualRate = localValue*yearModel;
							}else if(dateType=="sumAccrualRate"){
								var dayAccrualRate = (localValue/days).toFixed(4);
								yearAccrualRate = dayAccrualRate*yearModel;
							}
							var yearAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.yearAccrualRate');
							var accrualnf = objectPanel.getCmpByName(objectPanel.defineForm+'.accrual');
							var dayAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.dayAccrualRate');
							var sumAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumAccrualRate');
							var fixedAccrualRatenf = objectPanel.getCmpByName('fixedAccrualRate1');
							var overdueRateLoannf = objectPanel.getCmpByName(objectPanel.defineForm+'.overdueRateLoan');//逾期利率
							if(dateType=="fixedAccrualRate"){
								yearAccrualRatenf.setValue(0);//年利率
								accrualnf.setValue(0);//月利率
								dayAccrualRatenf.setValue(0);//日利率
								sumAccrualRatenf.setValue(0);//合计利率
								overdueRateLoannf.setValue(0);//逾期利率
							}else{
								fixedAccrualRatenf.setValue(0);//合计利率
								fixedAccrualRatenf.hiddenField.value = 0;
								yearAccrualRatenf.setValue(yearAccrualRate.toFixed(4));//年利率
								accrualnf.setValue((yearAccrualRate / 12).toFixed(4));//月利率
								dayAccrualRatenf.setValue((yearAccrualRate / yearModel).toFixed(4));//日利率
								sumAccrualRatenf.setValue((yearAccrualRate/ yearModel * days).toFixed(4));//合计利率
								overdueRateLoannf.setValue((yearAccrualRate / yearModel).toFixed(4));//逾期利率
							}
						}else if(accrualType=="managementConsultingOfRateType"){
							var yearAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearManagementConsultingOfRate').getValue();
							if(dateType=="yearAccrualRate"){
								yearAccrualRate = localValue;
							}else if(dateType=="accrual"){
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
							var fixedAccrualRatenf = objectPanel.getCmpByName('fixedManagementConsultingOfRate1');
							if(dateType=="fixedManagementConsultingOfRate"){
								yearAccrualRatenf.setValue(0);//年利率
								accrualnf.setValue(0);//月利率
								dayAccrualRatenf.setValue(0);//日利率
								sumAccrualRatenf.setValue(0);//合计利率
							}else{
								fixedAccrualRatenf.setValue(0);//合计利率
								fixedAccrualRatenf.hiddenField.value = 0;
								yearAccrualRatenf.setValue(yearAccrualRate.toFixed(4));//年利率
								accrualnf.setValue((yearAccrualRate / 12).toFixed(4));//月利率
								dayAccrualRatenf.setValue((yearAccrualRate / yearModel).toFixed(4));//日利率
								sumAccrualRatenf.setValue((yearAccrualRate/ yearModel * days).toFixed(4));//合计利率
							}
						}else if(accrualType=="financeServiceOfRateType"){
							var yearAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearFinanceServiceOfRate').getValue();
							if(dateType=="yearAccrualRate"){
								yearAccrualRate = localValue;
							}else if(dateType=="accrual"){
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
							var fixedAccrualRatenf = objectPanel.getCmpByName('fixedFinanceServiceOfRate1');
							if(dateType=="fixedFinanceServiceOfRate"){
								yearAccrualRatenf.setValue(0);//年利率
								accrualnf.setValue(0);//月利率
								dayAccrualRatenf.setValue(0);//日利率
								sumAccrualRatenf.setValue(0);//合计利率
							}else{
								fixedAccrualRatenf.setValue(0);//合计利率
								fixedAccrualRatenf.hiddenField.value = 0;
								yearAccrualRatenf.setValue(yearAccrualRate.toFixed(4));//年利率
								accrualnf.setValue((yearAccrualRate / 12).toFixed(4));//月利率
								dayAccrualRatenf.setValue((yearAccrualRate / yearModel).toFixed(4));//日利率
								sumAccrualRatenf.setValue((yearAccrualRate/ yearModel * days).toFixed(4));//合计利率
							}
						}else if(accrualType=="yearModel"){//每日和小计有影响
							var yearAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearAccrualRate').getValue();
							var dayAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.dayAccrualRate');
							var sumAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumAccrualRate');
							dayAccrualRatenf.setValue((yearAccrualRate / yearModel).toFixed(4));//日利率
							sumAccrualRatenf.setValue((yearAccrualRate/ yearModel * days).toFixed(4));//合计利率
							
							var yearFinanceServiceOfRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearFinanceServiceOfRate').getValue();
							var dayFinanceServiceOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.dayFinanceServiceOfRate');
							var sumFinanceServiceOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumFinanceServiceOfRate');
							dayFinanceServiceOfRatenf.setValue((yearFinanceServiceOfRate / yearModel).toFixed(4));//日利率
							sumFinanceServiceOfRatenf.setValue((yearFinanceServiceOfRate/ yearModel * days).toFixed(4));//合计利率
							
							var yearManagementConsultingOfRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearManagementConsultingOfRate').getValue();
							var dayManagementConsultingOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.dayManagementConsultingOfRate');
							var sumManagementConsultingOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumManagementConsultingOfRate');
							dayManagementConsultingOfRatenf.setValue((yearManagementConsultingOfRate / yearModel).toFixed(4));//日管理费率
							sumManagementConsultingOfRatenf.setValue((yearManagementConsultingOfRate/ yearModel * days).toFixed(4));//小计管理费率
							
						}else if(accrualType=="headTailModel"){//小计有影响
							var yearAccrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearAccrualRate').getValue();
							var sumAccrualRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumAccrualRate');
							sumAccrualRatenf.setValue((yearAccrualRate/ yearModel * days).toFixed(4));//小计利率
							
							var yearFinanceServiceOfRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearFinanceServiceOfRate').getValue();
							var sumFinanceServiceOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumFinanceServiceOfRate');
							sumFinanceServiceOfRatenf.setValue((yearFinanceServiceOfRate/ yearModel * days).toFixed(4));//小计服务费率
							
							var yearManagementConsultingOfRate = objectPanel.getCmpByName(objectPanel.defineForm+'.yearManagementConsultingOfRate').getValue();
							var sumManagementConsultingOfRatenf = objectPanel.getCmpByName(objectPanel.defineForm+'.sumManagementConsultingOfRate');
							sumManagementConsultingOfRatenf.setValue((yearManagementConsultingOfRate/ yearModel * days).toFixed(4));//小计管理费率
							
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
						yearAllRatenf.setValue(yearAllRate.toFixed(4));
						var accrualRate = objectPanel.getCmpByName(objectPanel.defineForm+'.accrual').getValue();
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
						monthAllRatenf.setValue(monthAllRate.toFixed(4));
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
						sumAllRatenf.setValue(sumAllRate.toFixed(4));
						
						var fixedAccrualRate = objectPanel.getCmpByName('fixedAccrualRate1').value;
						var fixedManagementConsultingRate = objectPanel.getCmpByName('fixedManagementConsultingOfRate1').value;
						var fixedFinanceServiceRate = objectPanel.getCmpByName('fixedFinanceServiceOfRate1').value;
						if(fixedAccrualRate!=null){
							fixedAllMoney += parseFloat(fixedAccrualRate);
						}
						if(fixedManagementConsultingRate!=null){
							fixedAllMoney += parseFloat(fixedManagementConsultingRate);
						}
						if(fixedFinanceServiceRate!=null){
							fixedAllMoney += parseFloat(fixedFinanceServiceRate);
						}
						if(fixedAllMoneynf){
							fixedAllMoneynf.setValue(Ext.util.Format.number(fixedAllMoney,'0,000.00'));
						}
					},
					failure : function(response,request) {
						Ext.ux.Toast.msg('操作信息', '查询任务完成时限操作失败!');
					}
				});
				
			}
		}
		LoanTrialProductFormPanel.superclass.constructor.call(this, {
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
							layout : 'column',
							labelWidth : leftlabel
						},
						items : [{
							defaults : {
								anchor : '100%',
								layout : "form", // 从上往下的布局
								labelAlign : 'left'
							},
							items : [{
								columnWidth : firstColumnWidth+.17, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : firstLableWidth+15,
								hidden : this.isProduct,
								items : [{
									fieldLabel : "贷款金额:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
									style:{'text-align':'right'},
									labelSeparator : '',
									xtype : "moneyfield",
									allowBlank : this.isProduct,
									readOnly : this.isMoneyReadOnly,
									name:this.defineForm+".projectMoney",
									anchor : '90%',
									unitText : '元'
								}]
							}, {
								xtype : "hidden",
								name : this.defineForm+".projectMoneyPass"
							},{
								columnWidth : this.isProduct?(firstColumnWidth+.17):(labelColumnWidth), // 该列在整行中所占的百分比
								labelWidth : this.isProduct?(firstLableWidth+15):60,
								items : [{
									fieldLabel :this.isProduct?"贷款期数:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;":"贷款期数:",
									labelSeparator :'',
									xtype : "numberfield",
									vtype : "onlynum",
									fieldClass : 'field-align',
									allowBlank : this.isProduct,
									readOnly : this.isAllReadOnly,
									name : this.defineForm+".payintentPeriod",
									maxLength:3,//最多字符设置
									anchor : '90%',
									unitText : '期',
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
							}, {
								columnWidth : labelColumnWidth,
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
										select : function(nf) {
											changeAccrualRate("changeDate","startDate",nf.getValue(),this);
										}
									}
								}]
							}, {
								columnWidth : labelColumnWidth+.02,
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
							defaults : {
								anchor : '100%',
								layout : "form", // 从上往下的布局
								labelAlign : 'left'
							},
							items : [{
								columnWidth : firstColumnWidth, // 该列在整行中所占的百分比
								labelWidth : firstLableWidth,
								labelAlign : 'right',
								items : [{
									fieldLabel : "还款方式",
									fieldClass : 'field-align',
									anchor : "100%"
								}]
							}, {
								columnWidth : everyRadioColumnWidth,
								labelWidth : 1,
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
											if (checked) {
												changeDisabled("accrualtype","sameprincipal",this);
											}
										}
									}
								}]
							}, {
								columnWidth : everyRadioColumnWidth,
								labelWidth : 1,
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
											if (checked) {
												changeDisabled("accrualtype","sameprincipalandInterest",this);
											}
										}
									}
								}]
							}, {
								columnWidth : everyRadioColumnWidth,
								labelWidth : 1,
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
											if (checked) {
												changeDisabled("accrualtype","sameprincipalsameInterest",this);
											}
										},  
										render: function (field, p) {
								              Ext.QuickTips.init();
								              Ext.QuickTips.register({
								                    target: field.el,
								                    text: '又叫“等额平息”'
								              })
								         }
									}
								}]
							}, {
								columnWidth : everyRadioColumnWidth,
								labelWidth : 1,
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
											if (checked) {
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
						}, {
							defaults : {
								anchor : '100%',
								layout : "form", // 从上往下的布局
								labelAlign : 'left'
							},
							items : [{
								columnWidth : firstColumnWidth, // 该列在整行中所占的百分比
								labelWidth : firstLableWidth,
								labelAlign : 'right',
								items : [{
											fieldLabel : "还款周期 ",
											fieldClass : 'field-align',
											anchor : "100%"
										}]
							}, {
								columnWidth : everyRadioColumnWidth,
								labelWidth : 1,
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
											if (checked) {
												changeDisabled("payaccrualType","dayPay",this);
												changeAccrualRate("changeDate","payaccrualType","dayPay",this);
											} 
										}
									}
								}]
							}, {
								columnWidth : everyRadioColumnWidth,
								labelWidth : 1,
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
											if (checked) {
												changeDisabled("payaccrualType","monthPay",this);
												changeAccrualRate("changeDate","payaccrualType","monthPay",this);
											}
										}
									}
								}]
							}, {
								columnWidth : everyRadioColumnWidth,
								labelWidth : 1,
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
											if (checked) {
												changeDisabled("payaccrualType","seasonPay",this);
												changeAccrualRate("changeDate","payaccrualType","seasonPay",this);
											}
										}
									}
								}]
							}, {
								columnWidth : everyRadioColumnWidth,
								labelWidth : 1,
								items : [{
									xtype : 'radio',
									boxLabel : '半年',
									name :"payaccrualType4" + this.idDefinition,
									inputValue : false,
									anchor : "100%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											if (checked) {
												changeDisabled("payaccrualType","halfYearPay",this);
												changeAccrualRate("changeDate","payaccrualType","halfYearPay",this);
											}
										}
									}
								}]
							}, {
								columnWidth : everyRadioColumnWidth-0.04,
								labelWidth : 1,
								items : [{
									xtype : 'radio',
									boxLabel : '年',
									name :"payaccrualType5" + this.idDefinition,
									inputValue : false,
									anchor : "100%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											if (checked) {
												changeDisabled("payaccrualType","yearPay",this);
												changeAccrualRate("changeDate","payaccrualType","yearPay",this);
											}
										}
									}
								}]
							}, {
								columnWidth : everyRadioColumnWidth-0.08,
								labelWidth : 1,
								items : [{
									xtype : 'radio',
									boxLabel : '自定义',
									name : "payaccrualType6" + this.idDefinition,
									inputValue : false,
									anchor : "100%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											if (checked) {
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
								columnWidth : onlyColumnWidth,
								labelWidth : 30,
								items : [{
									xtype : 'numberfield',
									vtype : "onlynum",
									fieldLabel : "每期",
									readOnly : this.isAllReadOnly,
									fieldClass : 'field-align',
									name : this.defineForm+'.dayOfEveryPeriod',
									maxLength:5,//最多字符设置
									disabled : true,
									anchor : '80%',
									unitText : '日',
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
							}]
						}, {
							defaults : {
								anchor : '100%',
								layout : "form", // 从上往下的布局
								labelAlign : 'left'
							},
							items : [{
								columnWidth : firstColumnWidth,
								labelWidth : firstLableWidth,
								labelAlign : 'right',
								items : [{
											fieldLabel : '贷款利率',
											fieldClass : 'field-align',
											anchor : "100%"
										}]
							}, {
								columnWidth : middleColumnWidth,
								labelWidth : 30,
								items : [{
									fieldLabel : "每年",
									fieldClass : 'field-align',
									labelSeparator : '',
									xtype : 'numberfield',
									name : this.defineForm+".yearAccrualRate",
									readOnly : this.isAllReadOnly,
									anchor : '90%',
									unitText : '%',
									decimalPrecision : 4,
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
								columnWidth : middleColumnWidth,
								labelWidth : 30,
								items : [{
									fieldLabel : "每月",
									fieldClass : 'field-align',
									labelSeparator : '',
									xtype : 'numberfield',
									name : this.defineForm+".accrual",
									readOnly : this.isAllReadOnly,
									anchor : '90%',
									unitText : '%',
									decimalPrecision : 4,
									value : 0,
									listeners : {
										scope : this,
										change : function(nf) {
											changeAccrualRate("accrualRateType","accrual",nf.getValue(),this);
										}
									}
								}]
							}, {
								columnWidth : middleColumnWidth,
								labelWidth : 30,
								items : [{
									fieldLabel : "每日",
									fieldClass : 'field-align',
									labelSeparator : '',
									xtype : 'numberfield',
									name : this.defineForm+".dayAccrualRate",
									readOnly : this.isAllReadOnly,
									anchor : '90%',
									unitText : '%',
									decimalPrecision : 4,
									value : 0,
									listeners : {
										scope : this,
										change : function(nf) {
											changeAccrualRate("accrualRateType","dayAccrualRate",nf.getValue(),this);
										}
									}
								}]
							},{
								columnWidth :middleColumnWidth,
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
									anchor : '90%',
									unitText : '%',
									decimalPrecision : 4,
									value : 0,
									listeners : {
										scope : this,
										change : function(nf) {
											changeAccrualRate("accrualRateType","sumAccrualRate",nf.getValue(),this);
										}
									}
								}]
							},{
								columnWidth : lastColumnWidth,
								labelWidth : 60,
								items : [{
									fieldLabel : "固定金额",
									fieldClass : 'field-align',
									labelSeparator : '',
									anchor : "100%",
									xtype : 'moneyfield',
									name : this.defineForm+".fixedAccrualRate",
									readOnly : this.isAllReadOnly,
									anchor : '90%',
									unitText : '元',
									value : 0,
									listeners : {
										scope : this,
										change : function(nf) {
											changeAccrualRate("accrualRateType","fixedAccrualRate",nf.getValue(),this);
										}
									}
								}]
							}]
						},{
						defaults : {
								anchor : '100%',
								layout : "form", // 从上往下的布局
								labelAlign : 'left'
							},
						hidden:this.isManagerHidden,
						items : [{
							columnWidth : firstColumnWidth,
							labelWidth : firstLableWidth,
							labelAlign : 'right',
							items : [{
										fieldLabel : '随期收费1',
										fieldClass : 'field-align',
										anchor : "100%"
									}]
						}, {
							columnWidth : middleColumnWidth,
							labelWidth : 30,
							items : [{
								fieldLabel : "每年",
								fieldClass : 'field-align',
								labelSeparator : '',
								xtype : 'numberfield',
								name : this.defineForm+".yearManagementConsultingOfRate",
								readOnly : this.isAllReadOnly,
								anchor : '90%',
								unitText : '%',
								decimalPrecision : 4,
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
							columnWidth :middleColumnWidth,
							labelWidth : 30,
							items : [{
								fieldLabel : "每月",
								fieldClass : 'field-align',
								labelSeparator : '',
								xtype : 'numberfield',
								name : this.defineForm+".managementConsultingOfRate",
								readOnly : this.isAllReadOnly,
								anchor : '90%',
								unitText : '%',
								decimalPrecision : 4,
								value : 0,
								listeners : {
									scope : this,
									'change' : function(nf) {
										changeAccrualRate("managementConsultingOfRateType","accrual",nf.getValue(),this);
									}
								}
							}]
						}, {
							columnWidth : middleColumnWidth,
							labelWidth : 30,
							items : [{
								fieldLabel : "每日",
								fieldClass : 'field-align',
								labelSeparator : '',
								xtype : 'numberfield',
								name : this.defineForm+".dayManagementConsultingOfRate",
								readOnly : this.isAllReadOnly,
								anchor : '90%',
								unitText : '%',
								decimalPrecision : 4,
								value : 0,
								listeners : {
									scope : this,
									change : function(nf) {
										changeAccrualRate("managementConsultingOfRateType","dayAccrualRate",nf.getValue(),this);
									}
								}
							}]
						},{
							columnWidth : middleColumnWidth,
							labelWidth : 30,
							hidden : this.isProduct,
							items : [{
								fieldLabel : "小计",
								fieldClass : 'field-align',
								labelSeparator : '',
								xtype : 'numberfield',
								name : this.defineForm+".sumManagementConsultingOfRate",
								readOnly : this.isAllReadOnly,
								anchor : '90%',
								unitText : '%',
								decimalPrecision : 4,
								value : 0,
								listeners : {
									scope : this,
									change : function(nf) {
										changeAccrualRate("managementConsultingOfRateType","sumManagementConsultingOfRate",nf.getValue(),this);
									}
								}
							}]
						},{
							columnWidth :lastColumnWidth,
							labelWidth : 60,
							items : [{
								fieldLabel : "固定金额",
								fieldClass : 'field-align',
								labelSeparator : '',
								xtype : 'moneyfield',
								name : this.defineForm+".fixedManagementConsultingOfRate",
								readOnly : this.isAllReadOnly,
								anchor : '90%',
								unitText : '元',
								value : 0,
								listeners : {
									scope : this,
									change : function(nf) {
										changeAccrualRate("managementConsultingOfRateType","fixedManagementConsultingOfRate",nf.getValue(),this);
									}
								}
							}]
						}]
					}, {
						defaults : {
							anchor : '100%',
							layout : "form", // 从上往下的布局
							labelAlign : 'left'
						},
						hidden : this.isFinaceHidden,
						items : [{
							columnWidth : firstColumnWidth,
							labelWidth : firstLableWidth,
							labelAlign : 'right',
							items : [{
								fieldLabel : '随期收费2',
								fieldClass : 'field-align',
								anchor : "100%"
							}]
						}, {
							columnWidth : middleColumnWidth,
							labelWidth : 30,
							items : [{
								fieldLabel : "每年",
								fieldClass : 'field-align',
								labelSeparator : '',
								xtype : 'numberfield',
								name : this.defineForm+".yearFinanceServiceOfRate",
								readOnly : this.isAllReadOnly,
								anchor : '90%',
								unitText : '%',
								decimalPrecision : 4,
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
							columnWidth : middleColumnWidth,
							labelWidth : 30,
							items : [{
								fieldLabel : "每月",
								fieldClass : 'field-align',
								labelSeparator : '',
								xtype : 'numberfield',
								name : this.defineForm+".financeServiceOfRate",
								readOnly : this.isAllReadOnly,
								anchor : '90%',
								unitText : '%',
								decimalPrecision : 4,
								value : 0,
								listeners : {
									scope : this,
									change : function(nf) {
										changeAccrualRate("financeServiceOfRateType","accrual",nf.getValue(),this);
									}
								}
							}]
						}, {
							columnWidth : middleColumnWidth,
							labelWidth : 30,
							items : [{
								fieldLabel : "每日",
								fieldClass : 'field-align',
								labelSeparator : '',
								anchor : "100%",
								xtype : 'numberfield',
								name : this.defineForm+".dayFinanceServiceOfRate",
								readOnly : this.isAllReadOnly,
								anchor : '90%',
								unitText : '%',
								decimalPrecision : 4,
								value : 0,
								listeners : {
									scope : this,
									change : function(nf) {
										changeAccrualRate("financeServiceOfRateType","dayAccrualRate",nf.getValue(),this);
									}
								}
							}]
						},{
							columnWidth : middleColumnWidth,
							labelWidth : 30,
							hidden : this.isProduct,
							items : [{
								fieldLabel : "小计",
								fieldClass : 'field-align',
								labelSeparator : '',
								xtype : 'numberfield',
								name : this.defineForm+".sumFinanceServiceOfRate",
								readOnly : this.isAllReadOnly,
								anchor : '90%',
								unitText : '%',
								decimalPrecision : 4,
								value : 0,
								listeners : {
									scope : this,
									change : function(nf) {
										changeAccrualRate("financeServiceOfRateType","sumFinanceServiceOfRate",nf.getValue(),this);
									}
								}
							}]
						},{
							columnWidth : lastColumnWidth,
							labelWidth : 60,
							items : [{
								fieldLabel : "固定金额",
								fieldClass : 'field-align',
								labelSeparator : '',
								anchor : "100%",
								xtype : 'moneyfield',
								name : this.defineForm+".fixedFinanceServiceOfRate",
								readOnly : this.isAllReadOnly,
								anchor : '90%',
								unitText : '元',
								value : 0,
								listeners : {
									scope : this,
									change : function(nf) {
										changeAccrualRate("financeServiceOfRateType","fixedFinanceServiceOfRate",nf.getValue(),this);
									}
								}
							}]
						}]
					}, {
						defaults : {
							anchor : '100%',
							layout : "form", // 从上往下的布局
							labelAlign : 'left'
						},
						hidden : this.isFinaceHidden,
						items : [{
							columnWidth : firstColumnWidth,
							labelWidth : firstLableWidth,
							labelAlign : 'right',
							items : [{
								fieldLabel : '手续费',
								fieldClass : 'field-align',
								anchor : "100%"
							}]
						}, {
							columnWidth : middleColumnWidth,
							labelWidth : 60,
							items : [{
								fieldLabel : "手续费率",
								fieldClass : 'field-align',
								labelSeparator : '',
								xtype : 'numberfield',
								name : this.defineForm+".serviceChargeOfRate",
								readOnly : this.isAllReadOnly,
								anchor : '90%',
								unitText : '%',
								decimalPrecision : 4,
								value : 0
							}]
						}]
					},{
						defaults : {
							anchor : '100%',
							layout : "form", // 从上往下的布局
							labelAlign : 'left'
						},
						hidden : this.isSumReadOnly,
						items : [{
							columnWidth : firstColumnWidth,
							labelWidth : firstLableWidth,
							labelAlign : 'right',
							items : [{
								fieldLabel : '收入合计',
								fieldClass : 'field-align',
								anchor : "100%"
							}]
						}, {
							columnWidth : middleColumnWidth,
							labelWidth : 30,
							items : [{
								fieldLabel : "每年",
								fieldClass : 'field-align',
								labelSeparator : '',
								xtype : 'numberfield',
								name : "yearAllRate",
								readOnly : true,
								anchor : '90%',
								unitText : '%',
								decimalPrecision : 4,
								value : 0
							}]
						}, {
							columnWidth : middleColumnWidth,
							labelWidth : 30,
							items : [{
								fieldLabel : "每月",
								fieldClass : 'field-align',
								labelSeparator : '',
								xtype : 'numberfield',
								name : "monthAllRate",
								readOnly : true,
								anchor : '90%',
								unitText : '%',
								decimalPrecision : 4,
								value : 0
							}]
						}, {
							columnWidth :middleColumnWidth,
							labelWidth : 30,
							items : [{
								fieldLabel : "每日",
								fieldClass : 'field-align',
								labelSeparator : '',
								xtype : 'numberfield',
								name : "dayAllRate",
								readOnly : true,
								anchor : '90%',
								unitText : '%',
								decimalPrecision : 4,
								value : 0
							}]
						},{
							columnWidth :middleColumnWidth,
							labelWidth : 30,
							hidden : this.isProduct,
							items : [{
								fieldLabel : "合计",
								fieldClass : 'field-align',
								labelSeparator : '',
								xtype : 'numberfield',
								name : "sumAllRate",
								readOnly : true,
								anchor : '90%',
								unitText : '%',
								decimalPrecision : 4,
								value : 0
							}]
						},{
							columnWidth : middleColumnWidth-0.045,
							labelWidth : 60,
							items : [{
								fieldLabel : "固定总额",
								fieldClass : 'field-align',
								labelSeparator : '',
								anchor : "100%",
								xtype : 'moneyfield',
								name : "sumAllfixedMoney",
								readOnly : true,
								allowBlank : !this.isProduct,
								anchor : '90%',
								unitText : '元',
								value : 0
							}]
						}]
					}, {
						defaults : {
							anchor : '100%',
							layout : "form", // 从上往下的布局
							labelAlign : 'left'
						},
						hidden : this.isCheckHidden,
						items : [{
							columnWidth : firstColumnWidth,
							labelWidth : firstLableWidth,
							labelAlign : 'right',
							items : [{
									fieldLabel : '还款选项',
									fieldClass : 'field-align',
									anchor : "100%"
								}]
							}, {
							columnWidth : everyRadioColumnWidth, // 该列在整行中所占的百分比
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
							columnWidth : everyRadioColumnWidth, // 该列在整行中所占的百分比
							labelWidth : 1,
							items : [{
								xtype : "checkbox",
								boxLabel : "一次性付息",
								disabled : this.isAllReadOnly,
								anchor : "100%",
								name : "isInterestByOneTimeCheck",
								listeners : {
									scope : this,
									check : function(box, value) {
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
							columnWidth : everyRadioColumnWidth, // 该列在整行中所占的百分比
							labelWidth : 1,
							items : [{
								xtype : "checkbox",
								boxLabel : "一次性付本",
								disabled : this.isAllReadOnly,
								anchor : "100%",
								name : "isPrincipalByOneTimeCheck",
								listeners : {
									scope : this,
									check : function(box, value) {
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
						columnWidth :everyRadioColumnWidth,
						labelWidth : 1,
						items : [{
							xtype : 'radio',
							boxLabel : '对日还款',
							name : "isStartDatePay2"+ this.idDefinition,
							inputValue : true,
							checked : true,
							anchor : "100%",
							readOnly : this.isAllReadOnly,
							disabled : this.isAllReadOnly,
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
							defaults : {
								anchor : '100%',
								layout : "form", // 从上往下的布局
								labelAlign : 'left'
							},
							hidden :　this.isModelHidden,
							items : [{
								columnWidth : firstColumnWidth,
								labelWidth : firstLableWidth,
								labelAlign : 'right',
								items : [{
									fieldLabel : '模型设定',
									fieldClass : 'field-align',
									anchor : "100%"
								}]
							},{
								columnWidth : labelColumnWidth, // 该列在整行中所占的百分比
								labelWidth : 30,
								items : [{
									xtype : "combo",
									fieldLabel : "头尾",
									fieldClass : 'field-align',
									labelSeparator : '',
									anchor : "90%",
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
									   select : function(nf) {
											changeAccrualRate("headTailModel","",nf.getValue(),this);
										}
									} 
								}]
							},{
								columnWidth : labelColumnWidth, // 该列在整行中所占的百分比
								labelWidth :30,
								items : [{
									fieldLabel : "月息",
									fieldClass : 'field-align',
									labelSeparator : '',
									anchor : "90%",
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
								columnWidth : labelColumnWidth, // 该列在整行中所占的百分比
								labelWidth : 45,
								items : [{
									fieldLabel : "年模型",
									fieldClass : 'field-align',
									labelSeparator : '',
									anchor : "90%",
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
										   //changeAccrualRate("yearModel","",nf.getValue(),this);
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
						}, {
							defaults : {
								anchor : '100%',
								layout : "form", // 从上往下的布局
								labelAlign : 'left'
							},
							hidden : !this.isProduct,
							items : [{
								columnWidth : firstColumnWidth,
								labelWidth : firstLableWidth,
								labelAlign : 'right',
								items : [{
									fieldLabel : '逾期',
									fieldClass : 'field-align',
									anchor : "100%"
								}]
							}, {
								columnWidth : everyRadioColumnWidth,
								labelWidth : 1,
								items : [{
									xtype : 'radio',
									boxLabel : '按应还未还金额收取',
									name : 'overdueReceiveWay1',
									inputValue : false,
									checked : true,
									anchor : "90%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											if (checked) {
												changeDisabled("overdueReceiveWay",0,this);
											} 
										}
									}
								}]
							}, {
								columnWidth : everyRadioColumnWidth,
								labelWidth : 1,
								items : [{
									xtype : 'radio',
									boxLabel : '按合同金额收取',
									anchor : "90%",
									name : 'overdueReceiveWay2',
									inputValue : false,
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											if(checked) {
												changeDisabled("overdueReceiveWay",1,this);
											}
										}
									}
								}]
							}, {
									xtype : "hidden",
									name : this.defineForm+".overdueReceiveWay",
									value : 0
							},{
								columnWidth : lastColumnWidth,
								labelWidth : 60,
								items : [{
									fieldLabel : "逾期利率",
									fieldClass : 'field-align',
									labelSeparator : '',
									anchor : "80%",
									xtype : 'numberfield',
									readOnly : this.isAllReadOnly,
									name : this.defineForm+".overdueRateLoan",
									decimalPrecision : 8,
									unitText : '%/日',
									value : 0
								}]
							}]
						}, {
							defaults : {
								anchor : '100%',
								layout : "form", // 从上往下的布局
								labelAlign : 'left'
							},
							hidden : !this.isProduct,
							items : [{
								columnWidth : firstColumnWidth,
								labelWidth : firstLableWidth,
								labelAlign : 'right',
								items : [{
									fieldLabel : '罚息',
									fieldClass : 'field-align',
									anchor : "100%"
								}]
							}, {
								columnWidth : everyRadioColumnWidth,
								labelWidth : 1,
								items : [{
									xtype : 'radio',
									boxLabel : '按应还未还金额收取',
									name : 'penaltyReceiveWay1',
									inputValue : false,
									checked : true,
									anchor : "90%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											if(checked) {
												changeDisabled("penaltyReceiveWay",0,this);
											}
										}
									}
								}]
							}, {
								columnWidth : everyRadioColumnWidth,
								labelWidth : 1,
								items : [{
									xtype : 'radio',
									boxLabel : '按合同金额收取',
									anchor : "100%",
									name : 'penaltyReceiveWay2',
									inputValue : false,
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											if (checked) {
												changeDisabled("penaltyReceiveWay",1,this);
											}
										}
									}
								}]
							}, {
								xtype : "hidden",
								name : this.defineForm+".penaltyReceiveWay",
								value : 0
							},{
								columnWidth : lastColumnWidth,
								labelWidth : 60,
								items : [{
									fieldLabel : "罚息利率",
									fieldClass : 'field-align',
									labelSeparator : '',
									anchor : "80%",
									xtype : 'numberfield',
									name : this.defineForm+".penaltyReceiveRate",
									readOnly : this.isAllReadOnly,
									unitText : '%/日',
									value : 0
								}]
							}]
						},{
							defaults : {
								anchor : '100%',
								layout : "form", // 从上往下的布局
								labelAlign : 'left'
							},
							hidden : !this.isProduct,
							items : [{
								columnWidth : firstColumnWidth,
								layout : 'form',
								labelWidth : firstLableWidth,
								labelAlign : 'right',
								items : [{
									fieldLabel : '提前还款违约金',
									fieldClass : 'field-align',
									anchor : "100%"
								}]
						}, {
							columnWidth : everyRadioColumnWidth,
							labelWidth : 1,
							items : [{
								xtype : 'radio',
								boxLabel : '按提前还款金额',
								name : 'prepayMoney1',
								inputValue : false,
								checked : true,
								anchor : "90%",
								disabled : this.isAllReadOnly,
								listeners : {
									scope : this,
									check : function(obj, checked) {
										if(checked) {
											changeDisabled("prepayMoney",0,this);
										}
									}
								}
							}]
						}, {
							columnWidth :everyRadioColumnWidth,
							labelWidth : 1,
							items : [{
								xtype : 'radio',
								boxLabel : '按合同金额收取',
								anchor : "100%",
								name : 'prepayMoney2',
								inputValue : false,
								disabled : this.isAllReadOnly,
								listeners : {
									scope : this,
									check : function(obj, checked) {
										if (checked) {
											changeDisabled("prepayMoney",1,this);
										}
									}
								}
							}]
						}, {
							xtype : "hidden",
							name : this.defineForm+".prepayMoney",
							value : 0
						},{
							columnWidth : lastColumnWidth,
							labelWidth : 60,
							items : [{
								fieldLabel : "违约金比例",
								fieldClass : 'field-align',
								labelSeparator : '',
								anchor : "80%",
								xtype : 'numberfield',
								readOnly : this.isAllReadOnly,
								name : this.defineForm+".prepayMoneyRate",
								unitText : '%',
								value : 0
							}]
						}]
					},{
						defaults : {
							anchor : '100%',
							layout : "form", // 从上往下的布局
							labelAlign : 'left'
						},
						hidden : !this.isProduct,
						items : [{
							columnWidth : firstColumnWidth,
							labelWidth : firstLableWidth,
							labelAlign : 'right',
							items : [{
								fieldLabel : '提前还款利息',
								fieldClass : 'field-align',
								anchor : "100%"
							}]
						}, {
							columnWidth : everyRadioColumnWidth+everyRadioColumnWidth,
							labelWidth : 30,
							items : [{
								fieldLabel : "不足",
								fieldClass : 'field-align',
								labelSeparator : '',
								anchor : "30%",
								xtype : 'numberfield',
								name : this.defineForm+".prepayRateTypeA",
								readOnly :  this.isAllReadOnly,
								unitText : '天,按实际发生天数收,否则整月收',
								value : 0
							}]
						},{
							columnWidth : lastColumnWidth,
							labelWidth : 60,
							items : [{
								fieldLabel : "最低收",
								fieldClass : 'field-align',
								labelSeparator : '',
								anchor : "80%",
								xtype : 'numberfield',
								readOnly : this.isAllReadOnly,
								name : this.defineForm+".prepayRateTypeB",
								unitText : '天利息',
								value : 0
							}]
						}]
					}, {
						defaults : {
							anchor : '100%',
							layout : "form", // 从上往下的布局
							labelAlign : 'left'
						},
						hidden : !this.isProduct,
						items : [{
							columnWidth : firstColumnWidth,
							labelWidth : firstLableWidth,
							labelAlign : 'right',
							items : [{
									fieldLabel : '保证金释放方式',
									fieldClass : 'field-align',
									anchor : "100%"
								}]
						}, {
							columnWidth : everyRadioColumnWidth,
							labelWidth : 1,
							items : [{
									xtype : 'radio',
									boxLabel : '按还本金额释放',
									name : 'depositsReleaseWay1',
									inputValue : false,
									checked : true,
									anchor : "90%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											if (checked) {
												changeDisabled("depositsReleaseWay",0,this);
											}
										}
									}
								}]
						}, {
							columnWidth :everyRadioColumnWidth,
							labelWidth : 1,
							items : [{
								xtype : 'radio',
								boxLabel : '按贷款结清',
								anchor : "100%",
								name : 'depositsReleaseWay2',
								inputValue : false,
								disabled : this.isAllReadOnly,
								listeners : {
									scope : this,
									check : function(obj, checked) {
										if (checked) {
											changeDisabled("depositsReleaseWay",1,this);
										}
									}
								}
							}]
						}, {
							xtype : "hidden",
							name : this.defineForm+".depositsReleaseWay", 
							value : 0
						}]
				},{
					defaults : {
						anchor : '100%',
						layout : "form", // 从上往下的布局
						labelAlign : 'left'
					},
					hidden : !this.isProduct,
					items : [{
							columnWidth : firstColumnWidth,
							labelWidth : firstLableWidth,
							labelAlign : 'right',
							items : [{
								fieldLabel : '授信释放方式',
								fieldClass : 'field-align',
								anchor : "100%"
							}]
						}, {
							columnWidth : everyRadioColumnWidth,
							labelWidth : 1,
							items : [{
								xtype : 'radio',
								boxLabel : '按还本金额释放',
								name : 'creditfreedType1',
								inputValue : false,
								checked : true,
								anchor : "90%",
								disabled : this.isAllReadOnly,
								listeners : {
									scope : this,
									check : function(obj, checked) {
										if (checked) {
											changeDisabled("creditfreedType",0,this);
										}
									}
								}
							}]
						}, {
							columnWidth : everyRadioColumnWidth,
							labelWidth : 1,
							items : [{
								xtype : 'radio',
								boxLabel : '按贷款结清',
								anchor : "100%",
								name : 'creditfreedType2',
								inputValue : false,
								disabled : this.isAllReadOnly,
								listeners : {
									scope : this,
									check : function(obj, checked) {
										if (checked) {
											changeDisabled("creditfreedType",1,this);
										}
									}
								}
							}]
						}, {
							xtype : "hidden",
							name : this.defineForm+".creditfreedType",
							value : 0
						}]
					}]
				}]
			}]
		});
	},
	initComponents : function() {
	}
});
Ext.reg('LoanTrialProductFormPanel', LoanTrialProductFormPanel);

