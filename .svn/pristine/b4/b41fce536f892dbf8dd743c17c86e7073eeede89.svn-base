

CustomerTypeMargin = Ext.extend(Ext.form.FieldSet, {
	flag : true,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.flag) != "undefined") {
			this.flag = _cfg.flag;
		}
		var type = this.type;
		Ext.applyIf(this, _cfg);
		var conf = [{
			boxLabel : '企业',
			name : "rg",
			inputValue : "1",
			style : "margin-left:20px;",
            checked : this.flag?false:true
		},{
			boxLabel : '个人',
			name : "rg",
			inputValue : "2",
			style : "margin-left:20px;",
			checked : this.flag?true:false
		}];
		CustomerTypeMargin.superclass.constructor.call(this, {
			anchor : '100%',
			layout : "column",
			
			border : false,
			items : [
				new Ext.form.RadioGroup({
					fieldLabel : "radioGroup",
					items : conf,
					listeners : {
						"change" : function(com, checked) {
						  	var inputValue = com.getValue().inputValue;
						    var op = Ext.getCmp('CreateMarginFormPanel');
							var customerInfo = op.getCmpByName("customerInfo");
							op.remove(customerInfo, true);
							op.doLayout();
							if (inputValue == 1) {
									var testFieldSet = new Ext.form.FieldSet({
										title : '客户基本信息',
										collapsible : true,
										labelAlign : 'right',
										bodyStyle : 'padding-left:0px;',
										autoHeight : true,
										operationType:'SmallLoan_SmallLoanBusiness',
										name : 'customerInfo',
										items : [
										   new CustomerTypeMargin({
										     flag : false
										   }),
										   new PeerMainInfoPanelMagin({})]
									});
									op.insert(0, testFieldSet);
									op.doLayout();
									return false;
								} else if (inputValue == 2) {
									var testFieldSet = new Ext.form.FieldSet({
										title : '客户基本信息',
										collapsible : true,
										labelAlign : 'right',
										bodyStyle : 'padding-left:0px;',
										autoHeight : true,
										operationType:'SmallLoan_PersonalCreditLoanBusiness',
										name : 'customerInfo',
										items : [
										   new CustomerTypeMargin({
												flag : true
											}), 
										   new PeerPersonMainPanel({})
										]
									});
									op.removeAll();
									op.insert(0, testFieldSet);
									op.doLayout();
									return false;
								}
							}
						}
					})]
		});
	}
});


//企业信息ok
PeerMainInfoPanelMagin = Ext.extend(Ext.Panel, {
	layout : "form",
	border : false,
	autoHeight : true,
	labelAlign : 'right',
	projectId : null,
	isAllReadOnly : true,
	bussinessType : null,
	isHideGudongInfo : false,
	isLoadShareequity : false,
	isHiddenCustomerDetailBtn : false,
	isEditEnterprise : false,
	isEnterpriseNameReadOnly : true,
	isNewProjectFormId:null,
	isGudongDiseditable : true,
	constructor : function(_cfg) {
	
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.title) != "undefined") {
			this.title = _cfg.title;
		}
		if (typeof(_cfg.isAllReadOnly) != "undefined") {
			this.isAllReadOnly = _cfg.isAllReadOnly;
		}
		if (typeof(_cfg.bussinessType) != "undefined") {
			this.bussinessType = _cfg.bussinessType;
		}
		if (typeof(_cfg.isEnterpriseNameReadOnly) != "undefined") {
			this.isEnterpriseNameReadOnly = _cfg.isEnterpriseNameReadOnly;
		}
		if (typeof(_cfg.isNewProjectFormId) != "undefined") {
			this.isNewProjectFormId = _cfg.isNewProjectFormId;
		}
		if (typeof(_cfg.projectId) != "undefined") {
			this.projectId = _cfg.projectId;
			this.isLoadShareequity = true;
			this.isEnterpriseShortNameReadonly = true;
		}
		if (_cfg.isHideGudongInfo) {
			this.isHideGudongInfo = _cfg.isHideGudongInfo;
		}
		if (_cfg.isEnterprisenameReadonly) {
			this.isEnterprisenameReadonly = _cfg.isEnterprisenameReadonly;
		}
		if (_cfg.isEnterpriseShortNameReadonly) {
			this.isEnterpriseShortNameReadonly = _cfg.isEnterpriseShortNameReadonly;
		}
		if (_cfg.isHiddenCustomerDetailBtn) {
			this.isHiddenCustomerDetailBtn = _cfg.isHiddenCustomerDetailBtn;
		}
		if (typeof(_cfg.isEditEnterprise) != "undefined") {
			this.isEditEnterprise = _cfg.isEditEnterprise;
		}
		if (typeof(_cfg.isGudongDiseditable) != 'undefined') {
			this.isGudongDiseditable = _cfg.isGudongDiseditable;
		}
		Ext.applyIf(this, _cfg);
		var bankAreaRootControl = false;
		if (_cfg.bankAreaRootControl) {
			bankAreaRootControl = _cfg.bankAreaRootControl;
		}
		var leftlabel = 100;
		var rightlabel = 90
			var formPanelId = this.formPanelId;
		var createNewSLFunctionForm = this.createNewSLFunctionForm;
		PeerMainInfoPanelMagin.superclass.constructor.call(this, {
		items : [{
				layout : "column", 
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true
				},
				border : false,
				scope : this,
				items : [{
					bodyStyle : 'padding-right:10px',
					columnWidth : 1, 
					layout : "form", 
					items : [{
						xtype : 'fieldset',
						title : '企业客户基本信息',
						layout : "column",
						defaults : {
							anchor : '100%',
							columnWidth : 1,
							isFormField : true,
							labelWidth : leftlabel
						},
						items : [{
							columnWidth : 1, 
							layout : "form", 
							labelWidth : leftlabel,
							items : [{
										xtype : 'combo',
										triggerClass : 'x-form-search-trigger',
										fieldLabel : "客户姓名",
										name : "cashDeposit.custormerName",
										readOnly : this.isPersonNameReadOnly,
										editable : false,
										blankText : "客户名称不能为空，请正确填写!",
										anchor : "100%",
										onTriggerClick : function() {
											var op = this.ownerCt.ownerCt;
											var selectCusNew = function(obj) {
												//企业编号
												if (obj.enterpriseNumber != 0 && obj.enterpriseNumber != "") {
													op .getCmpByName('cashDeposit.custormerNum') .setValue(obj.enterpriseNumber);
												}
												//企业法人
												if (obj.legalpersonName != 0 && obj.legalpersonName != "") {
													op .getCmpByName('cashDeposit.cashLegalRepresentative').setValue(obj.legalpersonName);
												}
												//企业法人主键
												if (obj.legalpersonid != 0 && obj.legalpersonid != "") {
													op .getCmpByName('cashDeposit.cashLegalRepresentativeId').setValue(obj.legalpersonid);
												}
												//客户名称
												if (obj.enterprisename != 0 && obj.enterprisename != "") {
													op .getCmpByName('cashDeposit.custormerName') .setValue(obj.enterprisename);
												}
//												//联系方式
//												if (obj.cellphone != 0 && obj.cellphone != "") {
//													op .getCmpByName('cashDeposit.cashMobilphone') .setValue(obj.cellphone);
//												}
												//联系电话
												if (obj.telephone != 0 && obj.telephone != "") {
													op .getCmpByName('cashDeposit.cashMobilphone') .setValue(obj.telephone);
												}
												//保证金账户名
												
												if (obj.enterprisename != 0 && obj.enterprisename != "") {
													op .getCmpByName('cashDeposit.cashName') .setValue(obj.enterprisename);
												}
												//客户主键
												if (obj.id  != 0 && obj.id != "") {
													op .getCmpByName('cashDeposit.custormerId') .setValue(obj.id);
												}
												
											}
											selectEnterprise(selectCusNew);
										},
										resizable : true,
										mode : 'romote',
										lazyInit : false,
										typeAhead : true,
										minChars : 1,
										triggerAction : 'all',
										listeners : {}
									},{
										xtype : 'hidden',
										name : 'cashDeposit.custormerId'
									}]
					             	},{
										xtype : 'hidden',
										name : 'cashDeposit.custormerType'
									},{
										columnWidth : 0.5, 
										layout : "form", 
										labelWidth : leftlabel,
											items : [{
											xtype : "textfield",
											readOnly:true,
											anchor : '100%',
											name : "cashDeposit.custormerNum",
											allowBlank : false,
											fieldLabel : "客户编号"
										}]
									}, {
							columnWidth : 0.5, 
							layout : "form", 
							labelWidth : rightlabel,
							items : [{
								xtype:'textfield',
								fieldLabel : "法定代表人姓名",
								anchor : '100%',
								name:'cashDeposit.cashLegalRepresentative',
								readOnly:true,
								allowBlank : false,
								scope : this
							},{
								xtype:'hidden',
								name:'cashDeposit.cashLegalRepresentativeId'
							}]
						}, {
									columnWidth : .5,
									layout : 'form',
									labelWidth : leftlabel,
									items : [{
										xtype:'textfield',
										name:'cashDeposit.cashMobilphone',
										fieldLabel : '手机号码',
											readOnly:true,
									    allowBlank : false,
										mode : 'local',
									    valueField : 'typeId',
						                anchor : '100%'
									
							         
									}]
								}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : rightlabel,
							items : [{
								xtype : "textfield",
								name : "cashDeposit.cashName",
									readOnly:true,
								fieldLabel : "保证金账户名",
								allowBlank : false,
								anchor : "100%",
								listeners : {}
							}]
						},{
							columnWidth : 0.44, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							items : [{
										xtype : "textfield",
										name : "cashDeposit.cashrate",
										fieldLabel : "保证金比例",
									    allowBlank : false,
										anchor : "100%",
										listeners : {
											"change" : function(com, checked){
												var value = com.getValue();
												if(value>100){
														Ext.ux.Toast.msg('操作信息', '保证金比率不能大于100');
													com.setValue("");
												}
											}
										}
									}]
						}, {
							columnWidth : .06, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							defaults : {
								anchor : anchor
							},
							labelWidth :10,
							items : [{
								fieldLabel : "%",
								labelSeparator : ''
							}]
					    }, {
								
										columnWidth : .5, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 70,
										items : [{
											xtype : "combo",
											triggerClass : 'x-form-search-trigger',
											hiddenName : "cashDeposit.cashCount",
											editable : false,
											fieldLabel :  "开户人" ,
											blankText : "客户经理不能为空，请正确填写!",
											allowBlank : false,
//											readOnly : this.isAllReadOnly,
											anchor : "100%",
											listeners : {
												scope : this,
												// 设置默认用户
												'afterRender' : function(combo) {
													this.getCmpByName('cashDeposit.cashCount')
															.setValue(currentUserFullName);
													this.getCmpByName('cashDeposit.cashCountId')
															.setValue(currentUserId);
												}
											},
											onTriggerClick : function(cc) {
												var obj = this;
												var appuerIdObj = obj.nextSibling();
												var userIds = appuerIdObj.getValue();
												if (null == obj.getValue() || "" == obj.getValue()) {
													userIds = "";
												}
												new UserDialog({
															userIds : userIds,
															userName : obj.getValue(),
															single : false,
															type : 'branch',
															title : "选择项目经理",
															callback : function(uId, uname) {
																obj.setValue(uname);
																// obj.setRawValue(uname);
																appuerIdObj.setValue(uId);
															}
														}).show();
					
											}
										}, {
											xtype : "hidden",
											name : "cashDeposit.cashCountId"
										}]
								},{
									columnWidth : 0.5, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : leftlabel,
									items : [{
										 xtype:'datefield',
									     name:'cashDeposit.createDate',
									     anchor : "100%",
									     mode:'local',
									     allowBlank : false,
									     fieldLabel:'开户日期',
									     format: 'Y-m-d',
									     value: new Date()
									}]
								}]
					}]
				}]
			}]
		});
	}
});




// 小贷节点页面个人基本信息
PeerPersonMainPanel = Ext.extend(Ext.Panel, {
	layout : "form",
	border : false,
	autoHeight : true,
	labelAlign : 'right',
	projectId : null,
	isAllReadOnly : true,
	bussinessType : null,
	isHideGudongInfo : false,
	isLoadShareequity : false,
	isHiddenCustomerDetailBtn : false,
	isEditEnterprise : false,
	isEnterpriseNameReadOnly : true,
	isNewProjectFormId:null,
	isGudongDiseditable : true,
	constructor : function(_cfg) {
	
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.title) != "undefined") {
			this.title = _cfg.title;
		}
		if (typeof(_cfg.isAllReadOnly) != "undefined") {
			this.isAllReadOnly = _cfg.isAllReadOnly;
		}
		if (typeof(_cfg.bussinessType) != "undefined") {
			this.bussinessType = _cfg.bussinessType;
		}
		if (typeof(_cfg.isEnterpriseNameReadOnly) != "undefined") {
			this.isEnterpriseNameReadOnly = _cfg.isEnterpriseNameReadOnly;
		}
		if (typeof(_cfg.isNewProjectFormId) != "undefined") {
			this.isNewProjectFormId = _cfg.isNewProjectFormId;
		}
		if (typeof(_cfg.projectId) != "undefined") {
			this.projectId = _cfg.projectId;
			this.isLoadShareequity = true;
			this.isEnterpriseShortNameReadonly = true;
		}
		if (_cfg.isHideGudongInfo) {
			this.isHideGudongInfo = _cfg.isHideGudongInfo;
		}
		if (_cfg.isEnterprisenameReadonly) {
			this.isEnterprisenameReadonly = _cfg.isEnterprisenameReadonly;
		}
		if (_cfg.isEnterpriseShortNameReadonly) {
			this.isEnterpriseShortNameReadonly = _cfg.isEnterpriseShortNameReadonly;
		}
		if (_cfg.isHiddenCustomerDetailBtn) {
			this.isHiddenCustomerDetailBtn = _cfg.isHiddenCustomerDetailBtn;
		}
		if (typeof(_cfg.isEditEnterprise) != "undefined") {
			this.isEditEnterprise = _cfg.isEditEnterprise;
		}
		if (typeof(_cfg.isGudongDiseditable) != 'undefined') {
			this.isGudongDiseditable = _cfg.isGudongDiseditable;
		}
		Ext.applyIf(this, _cfg);
		var bankAreaRootControl = false;
		if (_cfg.bankAreaRootControl) {
			bankAreaRootControl = _cfg.bankAreaRootControl;
		}
		var leftlabel = 100;
		var rightlabel = 90
			var formPanelId = this.formPanelId;
		var createNewSLFunctionForm = this.createNewSLFunctionForm;
		PeerPersonMainPanel.superclass.constructor.call(this, {
		items : [{
				layout : "column", 
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true
				},
				border : false,
				scope : this,
				items : [{
					bodyStyle : 'padding-right:10px',
					columnWidth : 1, 
					layout : "form", 
					items : [{
						xtype : 'fieldset',
						title : '个人客户基本信息',
						layout : "column",
						defaults : {
							anchor : '100%',
							columnWidth : 1,
							isFormField : true,
							labelWidth : leftlabel
						},
						items : [{
							columnWidth : 1, 
							layout : "form", 
							labelWidth : leftlabel,
							items : [{
										xtype : 'combo',
										triggerClass : 'x-form-search-trigger',
										fieldLabel : "客户姓名",
										name : "cashDeposit.custormerName",
										readOnly : this.isPersonNameReadOnly,
										editable : false,
										blankText : "客户名称不能为空，请正确填写!",
										anchor : "100%",
										onTriggerClick : function() {
											var op = this.ownerCt.ownerCt;
											var selectCusNew = function(obj){
												//编号
												if (obj.personNumber != 0 && obj.personNumber != "") {
													op.getCmpByName('cashDeposit.custormerNum') .setValue(obj.personNumber);
												}
//												//企业法人
//												if (obj.legalpersonName != 0 && obj.legalpersonName != "") {
//													alert("obj.legalpersonName==========="+obj.legalpersonName);
//													op .getCmpByName('cashDeposit.cashLegalRepresentative').setValue(obj.legalpersonName);
//												}
//												//企业法人主键
//												if (obj.legalpersonid != 0 && obj.legalpersonid != "") {
//													alert("obj.legalpersonid==========="+obj.legalpersonid);
//													op .getCmpByName('cashDeposit.cashLegalRepresentativeId').setValue(obj.legalpersonid);
//												}
												//客户名称
												if (obj.name != 0 && obj.name != "") {
													op .getCmpByName('cashDeposit.custormerName') .setValue(obj.name);
												}
												//联系方式
												if (obj.cellphone != 0 && obj.cellphone != "") {
													op .getCmpByName('cashDeposit.cashMobilphone') .setValue(obj.cellphone);
												}
												//联系电话
												if (obj.telephone != 0 && obj.cellphone != "") {
													op .getCmpByName('cashDeposit.cashMobilphone') .setValue(obj.cellphone);
												}
												//保证金账户名
												if (obj.name != 0 && obj.name != "") {
													op .getCmpByName('cashDeposit.cashName') .setValue(obj.name);
												}
												//客户主键
												if (obj.id  != 0 && obj.id != "") {
													op .getCmpByName('cashDeposit.custormerId') .setValue(obj.id);
												}
											}
											selectPWName(selectCusNew, op);
										},
										resizable : true,
										mode : 'romote',
										lazyInit : false,
										typeAhead : true,
										minChars : 1,
										triggerAction : 'all',
										listeners : {}
									},{
										xtype : 'hidden',
										name : 'cashDeposit.custormerId'
									}] 
									}, { xtype : 'hidden',
										name : 'cashDeposit.custormerType',
										value:"1"
									},{
										columnWidth : 0.5, 
										layout : "form", 
										labelWidth : leftlabel,
										items : [{
											xtype : "textfield",
												readOnly:true,
											anchor : '100%',
											name : "cashDeposit.custormerNum",
											allowBlank : false,
											fieldLabel : "客户编号"
										}]
									}, {
											columnWidth : .5,
											layout : 'form',
											labelWidth : leftlabel,
											items : [{
												xtype:'textfield',
												name:'cashDeposit.cashMobilphone',
												fieldLabel : '手机号码',
													readOnly:true,
											    allowBlank : false,
												mode : 'local',
											    valueField : 'typeId',
								                anchor : '100%'
											}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							items : [{
								xtype : "textfield",
								name : "cashDeposit.cashName",
								fieldLabel : "保证金账户名",
								readOnly:true,
								allowBlank : false,
								anchor : "100%",
								listeners : {}
							}]
						},{
							columnWidth : 0.44, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							items : [{
										xtype : "textfield",
										name : "cashDeposit.cashrate",
										fieldLabel : "保证金比例",
									    allowBlank : false,
										anchor : "100%",
										listeners : {
											"change" : function(com, checked){
												var value = com.getValue();
												if(value>100){
														Ext.ux.Toast.msg('操作信息', '保证金比率不能大于100');
													com.setValue("");
												}
											}
										}
									}]
						}, {
							columnWidth : .06, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							defaults : {
								anchor : anchor
							},
							labelWidth :10,
							items : [{
								fieldLabel : "%",
								labelSeparator : ''
							}]
					    },  {
								
										columnWidth : .5, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										anchor : "100%",
										items : [{
											xtype : "combo",
											triggerClass : 'x-form-search-trigger',
											hiddenName : "cashDeposit.cashCount",
											editable : false,
											fieldLabel :  "开户人" ,
											blankText : "客户经理不能为空，请正确填写!",
											allowBlank : false,
//											readOnly : this.isAllReadOnly,
											anchor : "100%",
											listeners : {
												scope : this,
												// 设置默认用户
												'afterRender' : function(combo) {
													this.getCmpByName('cashDeposit.cashCount')
															.setValue(currentUserFullName);
													this.getCmpByName('cashDeposit.cashCountId')
															.setValue(currentUserId);
												}
											},
											onTriggerClick : function(cc) {
												var obj = this;
												var appuerIdObj = obj.nextSibling();
												var userIds = appuerIdObj.getValue();
												if (null == obj.getValue() || "" == obj.getValue()) {
													userIds = "";
												}
												new UserDialog({
													userIds : userIds,
													userName : obj.getValue(),
													single : false,
													type : 'branch',
													title : "选择项目经理",
													callback : function(uId, uname) {
														obj.setValue(uname);
														// obj.setRawValue(uname);
														appuerIdObj.setValue(uId);
													}
												 }).show();
											}
										}, {
											xtype : "hidden",
											name : "cashDeposit.cashCountId"
										}]
								},{
									columnWidth : 0.5, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : leftlabel,
									items : [{
										 xtype:'datefield',
									     name:'cashDeposit.createDate',
									     mode:'local',
									     allowBlank : false,
									     fieldLabel:'开户日期',
									     anchor : "100%",
									     format: 'Y-m-d',
									     value: new Date()
									}]
								}]
					}]

				}]

			}]
		});
	}
});
Ext.reg('customerType',PeerPersonMainInfoPanel);
