function loanTrialLoadData(mainObj, alarm_fields, idDefinition,defineForm) {
	var isInterestByOneTimeObj = mainObj.getCmpByName('isInterestByOneTimeCheck');//是否一次性付息
	var isInterestByOneTime = alarm_fields.isInterestByOneTime;
	if (isInterestByOneTime == 1) {
		if (null != isInterestByOneTimeObj){
			isInterestByOneTimeObj.setValue(true);
		}
	} else {
		if (null != isInterestByOneTimeObj){
			isInterestByOneTimeObj.setValue(false);
		}
	}
	var isPrincipalByOneTimeObj = mainObj.getCmpByName('isPrincipalByOneTimeCheck');//是否一次性付本
	var isPrincipalByOneTime = alarm_fields.isPrincipalByOneTime;
	if (isPrincipalByOneTime == 1) {
		if (null != isPrincipalByOneTimeObj){
			isPrincipalByOneTimeObj.setValue(true);
		}
	} else {
		if (null != isPrincipalByOneTimeObj){
			isPrincipalByOneTimeObj.setValue(false);
		}
	}
	var isPreposePayConsultingCheckObj = mainObj.getCmpByName('isPreposePayAccrualCheck');//是否前置付息
	var isPreposePayConsultingCheck = alarm_fields.isPreposePayAccrual;
	if (isPreposePayConsultingCheck == 1) {
		if (null != isPreposePayConsultingCheckObj)
		{
			isPreposePayConsultingCheckObj.setValue(true);
		}
	} else {
		if (null != isPreposePayConsultingCheckObj){
			isPreposePayConsultingCheckObj.setValue(false);
		}
	}
	var accrualtype = alarm_fields.accrualtype;
	if (accrualtype == "sameprincipal") {
		if(mainObj.getCmpByName('accrualtype1'+ idDefinition)){
			mainObj.getCmpByName('accrualtype1'+ idDefinition).setValue(true);
		}
		if(mainObj.getCmpByName('accrualtype2'+ idDefinition)){
			mainObj.getCmpByName('accrualtype2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('accrualtype3'+ idDefinition)){
			mainObj.getCmpByName('accrualtype3'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('accrualtype4'+ idDefinition)){
			mainObj.getCmpByName('accrualtype4'+ idDefinition).setValue(false);
		}
	} else if (accrualtype == "sameprincipalandInterest") {
		if(mainObj.getCmpByName('accrualtype1'+ idDefinition)){
			mainObj.getCmpByName('accrualtype1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('accrualtype2'+ idDefinition)){
			mainObj.getCmpByName('accrualtype2'+ idDefinition).setValue(true);
		}
		if(mainObj.getCmpByName('accrualtype3'+ idDefinition)){
			mainObj.getCmpByName('accrualtype3'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('accrualtype4'+ idDefinition)){
			mainObj.getCmpByName('accrualtype4'+ idDefinition).setValue(false);
		}
	} else if (accrualtype == "sameprincipalsameInterest") {
		if(mainObj.getCmpByName('accrualtype1'+ idDefinition)){
			mainObj.getCmpByName('accrualtype1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('accrualtype2'+ idDefinition)){
			mainObj.getCmpByName('accrualtype2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('accrualtype3'+ idDefinition)){
			mainObj.getCmpByName('accrualtype3'+ idDefinition).setValue(true);
		}
		if(mainObj.getCmpByName('accrualtype4'+ idDefinition)){
			mainObj.getCmpByName('accrualtype4'+ idDefinition).setValue(false);
		}
	} else if (accrualtype == "singleInterest") {
		if(mainObj.getCmpByName('accrualtype1'+ idDefinition)){
			mainObj.getCmpByName('accrualtype1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('accrualtype2'+ idDefinition)){
			mainObj.getCmpByName('accrualtype2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('accrualtype3'+ idDefinition)){
			mainObj.getCmpByName('accrualtype3'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('accrualtype4'+ idDefinition)){
			mainObj.getCmpByName('accrualtype4'+ idDefinition).setValue(true);
		}
	}
	
	var payaccrualType = alarm_fields.payaccrualType;
	if (payaccrualType == "dayPay") {
		if(mainObj.getCmpByName('payaccrualType1'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType1'+ idDefinition).setValue(true);
		}
		if(mainObj.getCmpByName('payaccrualType2'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType3'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType3'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType4'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType4'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType5'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType5'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType6'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType6'+ idDefinition).setValue(false);
		}
	} else if (payaccrualType == "monthPay") {
		if(mainObj.getCmpByName('payaccrualType1'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType2'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType2'+ idDefinition).setValue(true);
		}
		if(mainObj.getCmpByName('payaccrualType3'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType3'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType4'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType4'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType5'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType5'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType6'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType6'+ idDefinition).setValue(false);
		}
	} else if (payaccrualType == "seasonPay") {
		if(mainObj.getCmpByName('payaccrualType1'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType2'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType3'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType3'+ idDefinition).setValue(true);
		}
		if(mainObj.getCmpByName('payaccrualType4'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType4'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType5'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType5'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType6'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType6'+ idDefinition).setValue(false);
		}
	} else if (payaccrualType == "halfYearPay") {
		if(mainObj.getCmpByName('payaccrualType1'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType2'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType3'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType3'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType4'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType4'+ idDefinition).setValue(true);
		}
		if(mainObj.getCmpByName('payaccrualType5'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType5'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType6'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType6'+ idDefinition).setValue(false);
		}
	} else if (payaccrualType == "yearPay") {
		if(mainObj.getCmpByName('payaccrualType1'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType2'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType3'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType3'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType4'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType4'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType5'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType5'+ idDefinition).setValue(true);
		}
		if(mainObj.getCmpByName('payaccrualType6'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType6'+ idDefinition).setValue(false);
		}
	} else if (payaccrualType == "owerPay") {
		if(mainObj.getCmpByName('payaccrualType1'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType2'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType3'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType3'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType4'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType4'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType5'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType5'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualType6'+ idDefinition)){
			mainObj.getCmpByName('payaccrualType6'+ idDefinition).setValue(true);
		}
	}
	if(mainObj.getCmpByName(defineForm+'.dayOfEveryPeriod')){
		if(payaccrualType != "owerPay"){
			mainObj.getCmpByName(defineForm+'.dayOfEveryPeriod').setDisabled(true);
			mainObj.getCmpByName(defineForm+'.dayOfEveryPeriod').setValue(null);
		}else{
			mainObj.getCmpByName(defineForm+'.dayOfEveryPeriod').setDisabled(false);
		}
	}
	
	
	var payaccrualTypePrincipal = alarm_fields.payaccrualTypePrincipal;
	if (payaccrualTypePrincipal == "dayPay") {
		if(mainObj.getCmpByName('payaccrualTypePrincipal1'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal1'+ idDefinition).setValue(true);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal2'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal3'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal3'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal4'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal4'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal5'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal5'+ idDefinition).setValue(false);
		}
	} else if (payaccrualTypePrincipal == "monthPay") {
		if(mainObj.getCmpByName('payaccrualTypePrincipal1'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal2'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal2'+ idDefinition).setValue(true);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal3'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal3'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal4'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal4'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal5'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal5'+ idDefinition).setValue(false);
		}
	} else if (payaccrualTypePrincipal == "seasonPay") {
		if(mainObj.getCmpByName('payaccrualTypePrincipal1'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal2'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal3'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal3'+ idDefinition).setValue(true);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal4'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal4'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal5'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal5'+ idDefinition).setValue(false);
		}
	} else if (payaccrualTypePrincipal == "yearPay") {
		if(mainObj.getCmpByName('payaccrualTypePrincipal1'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal2'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal3'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal3'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal4'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal4'+ idDefinition).setValue(true);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal5'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal5'+ idDefinition).setValue(false);
		}
	} else if (payaccrualTypePrincipal == "owerPay") {
		if(mainObj.getCmpByName('payaccrualTypePrincipal1'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal2'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal3'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal3'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal4'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal4'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('payaccrualTypePrincipal5'+ idDefinition)){
			mainObj.getCmpByName('payaccrualTypePrincipal5'+ idDefinition).setValue(true);
		}
	}
	if(mainObj.getCmpByName(defineForm+'.dayOfEveryPeriodPrincipal')){
		if(payaccrualTypePrincipal != "owerPay"){
			mainObj.getCmpByName(defineForm+'.dayOfEveryPeriodPrincipal').setDisabled(true);
			mainObj.getCmpByName(defineForm+'.dayOfEveryPeriodPrincipal').setValue(null);
		}else{
			mainObj.getCmpByName(defineForm+'.dayOfEveryPeriodPrincipal').setDisabled(false);
		}
	}
	
	var isStartDatePay = alarm_fields.isStartDatePay;
	if(isStartDatePay == "1") {
		if(mainObj.getCmpByName('isStartDatePay2'+ idDefinition)){
			mainObj.getCmpByName('isStartDatePay2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('isStartDatePay1'+ idDefinition)){
			mainObj.getCmpByName('isStartDatePay1'+ idDefinition).setValue(true);
		}
		
	}else{
		if(mainObj.getCmpByName('isStartDatePay1'+ idDefinition)){
			mainObj.getCmpByName('isStartDatePay1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('isStartDatePay2'+ idDefinition)){
			mainObj.getCmpByName('isStartDatePay2'+ idDefinition).setValue(true);
		}
		if(mainObj.getCmpByName(defineForm+'.payintentPerioDate')!=null){
			mainObj.getCmpByName(defineForm+'.payintentPerioDate').setDisabled(true);
		}
	}
	
	var overdueReceiveWay = alarm_fields.overdueReceiveWay;//逾期计算方式
	if(overdueReceiveWay == 0) {
		if(mainObj.getCmpByName('overdueReceiveWay2')){
			mainObj.getCmpByName('overdueReceiveWay2').setValue(false);
		}
		if(mainObj.getCmpByName('overdueReceiveWay1')){
			mainObj.getCmpByName('overdueReceiveWay1').setValue(true);
		}
	}else{
		if(mainObj.getCmpByName('overdueReceiveWay1')){
			mainObj.getCmpByName('overdueReceiveWay1').setValue(false);
		}
		if(mainObj.getCmpByName('overdueReceiveWay2')){
			mainObj.getCmpByName('overdueReceiveWay2').setValue(true);
		}
	}
	
	var penaltyReceiveWay = alarm_fields.penaltyReceiveWay;//罚息计算方式
	if(penaltyReceiveWay == 0) {
		if(mainObj.getCmpByName('penaltyReceiveWay2')){
			mainObj.getCmpByName('penaltyReceiveWay2').setValue(false);
		}
		if(mainObj.getCmpByName('penaltyReceiveWay1')){
			mainObj.getCmpByName('penaltyReceiveWay1').setValue(true);
		}
	}else{
		if(mainObj.getCmpByName('penaltyReceiveWay1')){
			mainObj.getCmpByName('penaltyReceiveWay1').setValue(false);
		}
		if(mainObj.getCmpByName('penaltyReceiveWay2')){
			mainObj.getCmpByName('penaltyReceiveWay2').setValue(true);
		}
	}
	
	var prepayMoney = alarm_fields.prepayMoney;//违约金计算方式
	if(prepayMoney == 0) {
		if(mainObj.getCmpByName('prepayMoney2')){
			mainObj.getCmpByName('prepayMoney2').setValue(false);
		}
		if(mainObj.getCmpByName('prepayMoney1')){
			mainObj.getCmpByName('prepayMoney1').setValue(true);
		}
	}else{
		if(mainObj.getCmpByName('prepayMoney1')){
			mainObj.getCmpByName('prepayMoney1').setValue(false);
		}
		if(mainObj.getCmpByName('prepayMoney2')){
			mainObj.getCmpByName('prepayMoney2').setValue(true);
		}
	}
	
	var depositsReleaseWay = alarm_fields.depositsReleaseWay;//保证金释放方式
	if(depositsReleaseWay == 0) {
		if(mainObj.getCmpByName('depositsReleaseWay2')){
			mainObj.getCmpByName('depositsReleaseWay2').setValue(false);
		}
		if(mainObj.getCmpByName('depositsReleaseWay1')){
			mainObj.getCmpByName('depositsReleaseWay1').setValue(true);
		}
	}else{
		if(mainObj.getCmpByName('depositsReleaseWay1')){
			mainObj.getCmpByName('depositsReleaseWay1').setValue(false);
		}
		if(mainObj.getCmpByName('depositsReleaseWay2')){
			mainObj.getCmpByName('depositsReleaseWay2').setValue(true);
		}
	}
	
	var creditfreedType = alarm_fields.creditfreedType;//授信释放方式
	if(creditfreedType == 0) {
		if(mainObj.getCmpByName('creditfreedType2')){
			mainObj.getCmpByName('creditfreedType2').setValue(false);
		}
		if(mainObj.getCmpByName('creditfreedType1')){
			mainObj.getCmpByName('creditfreedType1').setValue(true);
		}
	}else{
		if(mainObj.getCmpByName('creditfreedType1')){
			mainObj.getCmpByName('creditfreedType1').setValue(false);
		}
		if(mainObj.getCmpByName('creditfreedType2')){
			mainObj.getCmpByName('creditfreedType2').setValue(true);
		}
	}
	
	
	var chargeType = alarm_fields.chargeType;
	if(chargeType == "1" || chargeType == null) {
		if(mainObj.getCmpByName('chargeType2'+ idDefinition)){
			mainObj.getCmpByName('chargeType2'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('chargeType1'+ idDefinition)){
			mainObj.getCmpByName('chargeType1'+ idDefinition).setValue(true);
		}
		
	}else if(chargeType == "2"){
		if(mainObj.getCmpByName('chargeType1'+ idDefinition)){
			mainObj.getCmpByName('chargeType1'+ idDefinition).setValue(false);
		}
		if(mainObj.getCmpByName('chargeType2'+ idDefinition)){
			mainObj.getCmpByName('chargeType2'+ idDefinition).setValue(true);
		}
	}
}
