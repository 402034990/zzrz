BpProductModule_ProductDiscribe = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	frame : true,
	labelAlign : 'right',
	isAllReadOnly : false,
	isFlow : true,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (_cfg.isAllReadOnly) {
			this.isAllReadOnly = _cfg.isAllReadOnly;
		}
		Ext.applyIf(this, _cfg);
		BpProductModule_ProductDiscribe.superclass.constructor.call(this, {
			layout : 'anchor',
			frame : true,
			border : false,
			scope : this,
			defaults : {
				anchor : '98%',
				columnWidth : 1,
				isFormField : true,
				labelWidth :115
			},
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true,
					labelWidth : 90
				},
				items : [{
					columnWidth : .3, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 90,
					items : [{
						xtype : "combo",
						anchor : "100%",
						hiddenName : "bpProductParameter.businessType",
						displayField : 'itemName',
						valueField : 'itemId',
						triggerAction : 'all',
						readOnly : true,
						disable : true,
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath
									+ '/system/getTypeJsonByNodeKeyGlobalType.do?nodeKey=Business',
							fields : ['itemId', 'itemName']
						}),
						fieldLabel : "业务类别",
						blankText : "业务类别不能为空，请正确填写!",
						listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									var record = st.getAt(0);
									var v = record.data.itemId;
									combox.setValue(v);

										// combox.fireEvent("select",combox,
										// record);

									})
								combox.clearInvalid();
							},
							select : function(combox, record, index) {
								var v = record.data.itemId;
								var arrStore = new Ext.data.ArrayStore({

									url : __ctxPath
											+ '/system/getTypeJsonByNodeKeyGlobalType.do',
									fields : ['itemId', 'itemName'],
									baseParams : {
										nodeKey : v
									},
									autoLoad : true
								});
								var opr_obj = this.ownerCt.ownerCt
										.getCmpByName('bpProductParameter.operationType')
								opr_obj.clearValue();
								opr_obj.store = arrStore;
								arrStore.load({
											"callback" : test
										});
								function test(r) {
									if (opr_obj.view) { // 刷新视图,避免视图值与实际值不相符
										opr_obj.view.setStore(arrStore);
									}
									if (typeof(arrStore.getAt(0)) != "undefined") {
										var itmeId = arrStore.getAt(0).data.itemId;
										var itemName = arrStore.getAt(0).data.itemName;
										opr_obj.setRawValue(itemName);
										opr_obj.setValue(itmeId);
										var recordN = arrStore.getAt(0);
										opr_obj.fireEvent("select", opr_obj,
												arrStore.getAt(0), 0);
									}
								}

							}

						}
					}]
				}, {
					columnWidth : 0.7, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 90,
					items : [{
								name : 'bpProductParameter.id',
								xtype : 'hidden',
								value : this.id == null ? '' : this.id
							}, {
								fieldLabel : '产品名称',
								name : 'bpProductParameter.productName',
								xtype : 'textfield',
								allowBlank : false,
								readOnly : this.isEditReadOnly,
								anchor : '100%',
								maxLength : 255
							}]
				}, {
					columnWidth : 0.3, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 90,
					items : [{
								fieldLabel : '产品编号',
								name : 'bpProductParameter.productNumber',
								xtype : 'textfield',
								allowBlank : false,
								readOnly : this.isEditReadOnly,
								anchor : '100%',
								maxLength : 255
							}]
				}, {
					columnWidth : .7, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 90,
					items : [{
						xtype : "combo",
						triggerClass : 'x-form-search-trigger',
						hiddenName : "bpProductParameter.taskName",
						editable : false,
						fieldLabel : "流程名称",
						blankText : "项目主管不能为空，请正确填写!",
						allowBlank : false,
						readOnly : this.isAllReadOnly,
						anchor : "100%",
						onTriggerClick : function(cc) {
							var obj = this;
							var appuerIdObj = obj.nextSibling();
							var userIds = appuerIdObj.getValue();
							if (null == obj.getValue() || "" == obj.getValue()) {
								userIds = "";
							}
							new TaskDialog({
										defIds : userIds,
										userName : obj.getValue(),
										single : false,
										type : 'branch',
										title : "选择流程",
										callback : function(uId, uname) {
											obj.setValue(uname);
											// obj.setRawValue(uname);
											appuerIdObj.setValue(uId);
										}
									}).show();

						}
					}, {
						xtype : "hidden",
						name : "bpProductParameter.taskId"
					}]
				}, {
					columnWidth : .3, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 90,
					items : [{
						xtype : "dicIndepCombo",
						fieldLabel : "我方主体类型",
						emptyText : "请选择",
						nodeKey : 'ourmainType',
						anchor : "100%",
						allowBlank : false,
						readOnly : this.isAllReadOnly,
						editable : true,
						value : null,
						hiddenName : "bpProductParameter.mineType",
						scope : this,
						listeners : {
							change : function(combox, record, index) {
								var comboxValue = combox.getValue();
								var url = '';
								var store = null;
								var combo = this.ownerCt.ownerCt
										.getCmpByName('bpProductParameter.mineId');
								combo.clearValue();
								if (comboxValue == "company_ourmain") {// 企业
									url = __ctxPath
											+ '/creditFlow/ourmain/listSlCompanyMain.do';
									store = new Ext.data.Store({
										proxy : new Ext.data.HttpProxy({
													url : url
												}),
										reader : new Ext.data.JsonReader({
													root : 'result'
												}, [{
															name : 'itemName',
															mapping : 'corName'
														}, {
															name : 'itemValue',
															mapping : 'companyMainId'
														}])
									})
								} else if (comboxValue == "person_ourmain") { // 个人
									url = __ctxPath
											+ '/creditFlow/ourmain/listSlPersonMain.do';
									store = new Ext.data.Store({
										proxy : new Ext.data.HttpProxy({
													url : url
												}),
										reader : new Ext.data.JsonReader({
													root : 'result'
												}, [{
															name : 'itemName',
															mapping : 'name'
														}, {
															name : 'itemValue',
															mapping : 'personMainId'
														}])
									})
								}
								combo.store = store;
								combo.valueField = "itemValue";
								store.load();
								if (combo.view) { // 刷新视图,避免视图值与实际值不相符
									combo.view.setStore(combo.store);
								}
								this.fireEvent("afterrender", combo);
								/*
								 * var obj_n =
								 * this.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;
								 * ressetProjuect(obj_n);
								 */
							},
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
											var v = combox.getValue();
											combox.setValue(v);
										});
								combox.clearInvalid();
							},
							loadData : function(comp) {
								var st = comp.getStore();
								st.on("load", function() {
											comp.setValue(comp.getValue());
											comp.clearInvalid();
										})

								this.fireEvent("change", comp);
							}
						}
					}]
				}, {
					columnWidth : .7, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 90,
					items : [{
								fieldLabel : '我方主体名称',
								xtype : "combo",
								anchor : "100%",
								displayField : 'itemName',
								valueField : 'itemValue',
								emptyText : "请选择",
								allowBlank : false,
								readOnly : this.isAllReadOnly,
								editable : true,
								hiddenName : 'bpProductParameter.mineId',
								typeAhead : true,
								mode : 'local',
								editable : false,
								selectOnFocus : true,
								value : null,
								store : new Ext.data.JsonStore({}),
								triggerAction : 'all',
								blankText : "我方主体不能为空，请正确填写!",
								listeners : {
									afterrender : function(combox) {
										var st = combox.getStore();
										st.on("load", function() {
													var v = combox.getValue();
													combox.setValue(v);
												});
										combox.clearInvalid();
									}
								}
							}]
				}, {
					columnWidth : 1, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 90,
					items : [{
								xtype : 'textarea',
								anchor : '100%',
								fieldLabel : '产品描述',
								readOnly : this.isAllReadOnly,
								name : 'bpProductParameter.productDescribe'
							}]
				}]
			}]
		});
	}
});

BpProductModule_ProductFiancial = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	frame : true,
	labelAlign : 'right',
	isAllReadOnly : false,
	productId : 0,
	defination : "_productDefination_",
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (_cfg.isAllReadOnly) {
			this.isAllReadOnly = _cfg.isAllReadOnly;
		}
		if (_cfg.productId) {
			this.productId = _cfg.productId;
		}
		if (_cfg.defination) {
			this.defination = _cfg.defination;
		}
		Ext.applyIf(this, _cfg);
		// 每期还款日固定在
		var storepayintentPeriod = "[";
		for (var i = 1; i < 31; i++) {
			storepayintentPeriod = storepayintentPeriod + "[" + i + ", " + i
					+ "],";
		}
		storepayintentPeriod = storepayintentPeriod.substring(0,
				storepayintentPeriod.length - 1);
		storepayintentPeriod = storepayintentPeriod + "]";
		var obstorepayintentPeriod = Ext.decode(storepayintentPeriod);
		// 贷款期数
		var payintentPeriods = "[";
		for (var i = 1; i <= 36; i++) {
			payintentPeriods = payintentPeriods + "[" + i + ", " + i + "],";
		}
		payintentPeriods = payintentPeriods.substring(0,
				payintentPeriods.length - 1);
		payintentPeriods = payintentPeriods + "]";
		var obpayintentPeriods = Ext.decode(payintentPeriods);

		BpProductModule_ProductFiancial.superclass.constructor.call(this, {
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true,
					labelWidth : 135
				},
				items : [{
					columnWidth : 1,
					layout : 'column',
					items : [{
								columnWidth : .12, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelAlign : 'right',
								items : [{
											fieldLabel : "还款方式 ",
											fieldClass : 'field-align',
											anchor : "100%"
										}]
							}, {
								columnWidth : 0.14,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '等额本金',
									name : 'f1',
									id : "jixifs1" + this.defination
											+ this.productId,
									inputValue : false,
									anchor : "100%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = Ext.getCmp("jixifs1"
													+ this.defination
													+ this.productId)
													.getValue();
											if (flag == true) {
												this
														.getCmpByName('bpProductParameter.accrualtype')
														.setValue("sameprincipal");
												Ext.getCmp("jixizq1"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("jixizq2"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("jixizq3"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("jixizq4"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("jixizq6"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												this
														.getCmpByName('bpProductParameter.dayOfEveryPeriod')
														.setDisabled(true);
												Ext.getCmp("jixizq2"
														+ this.defination
														+ this.productId)
														.setValue(true);
												Ext.getCmp("jixizq1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												this
														.getCmpByName('bpProductParameter.payaccrualType')
														.setValue("monthPay");
												this
														.getCmpByName('bpProductParameter.payintentPeriod')
														.setDisabled(false);
												Ext.getCmp("jixifs2"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs5"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs3"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs6"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("meiqihkrq1"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
												Ext.getCmp("meiqihkrq2"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
											}
										}
									}
								}]
							}, {
								columnWidth : 0.14,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '等额本息',
									anchor : "100%",
									name : 'f1',
									id : "jixifs2" + this.defination
											+ this.productId,
									inputValue : false,
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = Ext.getCmp("jixifs2"
													+ this.defination
													+ this.productId)
													.getValue();
											if (flag == true) {
												this
														.getCmpByName('bpProductParameter.accrualtype')
														.setValue("sameprincipalandInterest");
												Ext.getCmp("jixizq1"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("jixizq2"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("jixizq3"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("jixizq4"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("jixizq6"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												this
														.getCmpByName('bpProductParameter.dayOfEveryPeriod')
														.setDisabled(true);
												Ext.getCmp("jixizq2"
														+ this.defination
														+ this.productId)
														.setValue(true);
												Ext.getCmp("jixizq1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												this
														.getCmpByName('bpProductParameter.payaccrualType')
														.setValue("monthPay");
												this
														.getCmpByName('bpProductParameter.payintentPeriod')
														.setDisabled(false);
												Ext.getCmp("jixifs1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs5"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs3"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs6"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("meiqihkrq1"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
												Ext.getCmp("meiqihkrq2"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
											}
										}
									}
								}]
							}, {
								columnWidth : 0.14,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '等本等息',
									anchor : "100%",
									name : 'f1',
									id : "jixifs5" + this.defination
											+ this.productId,
									inputValue : false,
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = Ext.getCmp("jixifs5"
													+ this.defination
													+ this.productId)
													.getValue();
											if (flag == true) {
												this
														.getCmpByName('bpProductParameter.accrualtype')
														.setValue("sameprincipalsameInterest");
												if (this.isAllReadOnly == true) {
													Ext.getCmp("jixizq1"
															+ this.defination
															+ this.productId)
															.setDisabled(true);
													Ext.getCmp("jixizq2"
															+ this.defination
															+ this.productId)
															.setDisabled(true);
													Ext.getCmp("jixizq3"
															+ this.defination
															+ this.productId)
															.setDisabled(true);
													Ext.getCmp("jixizq4"
															+ this.defination
															+ this.productId)
															.setDisabled(true);
													Ext.getCmp("jixizq6"
															+ this.defination
															+ this.productId)
															.setDisabled(true);
												} else {
													Ext.getCmp("jixizq1"
															+ this.defination
															+ this.productId)
															.setDisabled(false);
													Ext.getCmp("jixizq2"
															+ this.defination
															+ this.productId)
															.setDisabled(false);
													Ext.getCmp("jixizq3"
															+ this.defination
															+ this.productId)
															.setDisabled(false);
													Ext.getCmp("jixizq4"
															+ this.defination
															+ this.productId)
															.setDisabled(false);
													Ext.getCmp("jixizq6"
															+ this.defination
															+ this.productId)
															.setDisabled(false);
												}
												this
														.getCmpByName('bpProductParameter.dayOfEveryPeriod')
														.setDisabled(true);
												this
														.getCmpByName('bpProductParameter.payaccrualType')
														.setValue("monthPay");
												this
														.getCmpByName('bpProductParameter.payintentPeriod')
														.setDisabled(false);
												this
														.getCmpByName('bpProductParameter.payintentPerioDate')
														.setDisabled(true);
												Ext.getCmp("jixifs2"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs3"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs6"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("meiqihkrq1"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("meiqihkrq1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("meiqihkrq2"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("meiqihkrq2"
														+ this.defination
														+ this.productId)
														.setValue(true)
											}
										}
									}
								}]
							}, {
								columnWidth : 0.17,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '按期收息,到期还本',
									name : 'f1',
									id : "jixifs3" + this.defination
											+ this.productId,
									inputValue : false,
									checked : true,
									anchor : "100%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = Ext.getCmp("jixifs3"
													+ this.defination
													+ this.productId)
													.getValue();
											if (flag == true) {
												this
														.getCmpByName('bpProductParameter.accrualtype')
														.setValue("singleInterest");
												Ext.getCmp("jixizq1"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
												Ext.getCmp("jixizq2"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
												Ext.getCmp("jixizq3"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
												Ext.getCmp("jixizq4"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
												Ext.getCmp("jixizq6"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
												this
														.getCmpByName('bpProductParameter.dayOfEveryPeriod')
														.setDisabled(false);
												Ext.getCmp("jixifs2"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs5"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs6"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("meiqihkrq1"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
												Ext.getCmp("meiqihkrq2"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
											}
										}
									}
								}, {
									xtype : "hidden",
									name : "bpProductParameter.accrualtype",
									value : "singleInterest"
								}]
							}, {
								columnWidth : 0.15,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '其他还款方式',
									anchor : "100%",
									name : 'f1',
									id : "jixifs6" + this.defination
											+ this.productId,
									inputValue : false,
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = Ext.getCmp("jixifs6"
													+ this.defination
													+ this.productId)
													.getValue();
											if (flag == true) {
												this
														.getCmpByName('bpProductParameter.accrualtype')
														.setValue("otherMothod");
												if (this.isAllReadOnly == true) {
													Ext.getCmp("jixizq1"
															+ this.defination
															+ this.productId)
															.setDisabled(true);
													Ext.getCmp("jixizq2"
															+ this.defination
															+ this.productId)
															.setDisabled(true);
													Ext.getCmp("jixizq3"
															+ this.defination
															+ this.productId)
															.setDisabled(true);
													Ext.getCmp("jixizq4"
															+ this.defination
															+ this.productId)
															.setDisabled(true);
													Ext.getCmp("jixizq6"
															+ this.defination
															+ this.productId)
															.setDisabled(true);
												} else {
													Ext.getCmp("jixizq1"
															+ this.defination
															+ this.productId)
															.setDisabled(false);
													Ext.getCmp("jixizq2"
															+ this.defination
															+ this.productId)
															.setDisabled(false);
													Ext.getCmp("jixizq3"
															+ this.defination
															+ this.productId)
															.setDisabled(false);
													Ext.getCmp("jixizq4"
															+ this.defination
															+ this.productId)
															.setDisabled(false);
													Ext.getCmp("jixizq6"
															+ this.defination
															+ this.productId)
															.setDisabled(false);
												}
												this
														.getCmpByName('bpProductParameter.dayOfEveryPeriod')
														.setDisabled(true);
												Ext.getCmp("jixizq2"
														+ this.defination
														+ this.productId)
														.setValue(true);
												Ext.getCmp("jixizq1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												this
														.getCmpByName('bpProductParameter.payaccrualType')
														.setValue("monthPay");
												this
														.getCmpByName('bpProductParameter.payintentPeriod')
														.setDisabled(false);
												Ext.getCmp("jixifs2"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs5"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs3"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixifs1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("meiqihkrq1"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
												Ext.getCmp("meiqihkrq2"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
											}
										}
									}

								}]
							}]
				}, {
					columnWidth : 1,
					layout : 'column',
					items : [{
								columnWidth : .12, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelAlign : 'right',
								items : [{
											fieldLabel : "还款周期 "
										}]
							}, {
								columnWidth : 0.14,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '日',
									name : 'z1',
									id : "jixizq1" + this.defination
											+ this.productId,
									inputValue : true,
									anchor : "100%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = Ext.getCmp("jixizq1"
													+ this.defination
													+ this.productId)
													.getValue();
											if (flag == true) {
												this
														.getCmpByName('bpProductParameter.payaccrualType')
														.setValue("dayPay");
												Ext.getCmp("meiqihkrq1"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("meiqihkrq1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("meiqihkrq2"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("meiqihkrq2"
														+ this.defination
														+ this.productId)
														.setValue(true);
												Ext.getCmp("jixizq2"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq3"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq4"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq6"
														+ this.defination
														+ this.productId)
														.setValue(false);
												this
														.getCmpByName('bpProductParameter.isStartDatePay')
														.setValue("2");
											} else {
												Ext.getCmp("meiqihkrq1"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
												Ext.getCmp("meiqihkrq2"
														+ this.defination
														+ this.productId)
														.setDisabled(false);
												if (Ext.getCmp("meiqihkrq1"
														+ this.defination
														+ this.productId)
														.getValue() == true) {
													this
															.getCmpByName('bpProductParameter.payintentPerioDate')
															.setDisabled(false);
												}
											}
										}
									}
								}]
							}, {
								columnWidth : 0.14,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '月',
									name : 'z1',
									id : "jixizq2" + this.defination
											+ this.productId,
									inputValue : false,
									checked : true,
									anchor : "100%",
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = Ext.getCmp("jixizq2"
													+ this.defination
													+ this.productId)
													.getValue();
											if (flag == true) {
												this
														.getCmpByName('bpProductParameter.payaccrualType')
														.setValue("monthPay");
												Ext.getCmp("jixizq1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq3"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq4"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq6"
														+ this.defination
														+ this.productId)
														.setValue(false);
											}
										}
									}
								}, {
									xtype : 'hidden',
									name : "bpProductParameter.payaccrualType",
									value : "monthPay"
								}]
							}, {
								columnWidth : 0.14,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '季',
									name : 'z1',
									id : "jixizq3" + this.defination
											+ this.productId,
									inputValue : false,
									anchor : "100%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = Ext.getCmp("jixizq3"
													+ this.defination
													+ this.productId)
													.getValue();
											if (flag == true) {
												this
														.getCmpByName('bpProductParameter.payaccrualType')
														.setValue("seasonPay");
												Ext.getCmp("jixizq1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq2"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq4"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq6"
														+ this.defination
														+ this.productId)
														.setValue(false);
											}
										}
									}
								}]
							}, {
								columnWidth : 0.17,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '年',
									name : 'z1',
									id : "jixizq4" + this.defination
											+ this.productId,
									inputValue : false,
									anchor : "100%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = Ext.getCmp("jixizq4"
													+ this.defination
													+ this.productId)
													.getValue();
											if (flag == true) {
												this
														.getCmpByName('bpProductParameter.payaccrualType')
														.setValue("yearPay");
												Ext.getCmp("jixizq1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq3"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq2"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq6"
														+ this.defination
														+ this.productId)
														.setValue(false);
											}
										}
									}
								}]
							}, {
								columnWidth : .075,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'radio',
									boxLabel : '自定义周期',
									name : 'z1',
									id : "jixizq6" + this.defination
											+ this.productId,
									inputValue : false,
									anchor : "100%",
									disabled : this.isAllReadOnly,
									listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = Ext.getCmp("jixizq6"
													+ this.defination
													+ this.productId)
													.getValue();
											if (flag == true) {
												this
														.getCmpByName('bpProductParameter.payaccrualType')
														.setValue("owerPay");
												this
														.getCmpByName('bpProductParameter.dayOfEveryPeriod')
														.setDisabled(false);
												Ext.getCmp("meiqihkrq1"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("meiqihkrq1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("meiqihkrq2"
														+ this.defination
														+ this.productId)
														.setDisabled(true);
												Ext.getCmp("meiqihkrq2"
														+ this.defination
														+ this.productId)
														.setValue(true);
												Ext.getCmp("jixizq1"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq3"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq4"
														+ this.defination
														+ this.productId)
														.setValue(false);
												Ext.getCmp("jixizq2"
														+ this.defination
														+ this.productId)
														.setValue(false);
											} else {
												this
														.getCmpByName('bpProductParameter.dayOfEveryPeriod')
														.setDisabled(true);
												this
														.getCmpByName('bpProductParameter.dayOfEveryPeriod')
														.setValue("");
												if (Ext.getCmp("jixizq1"
														+ this.defination
														+ this.productId)
														.getValue() == false) {
													Ext.getCmp("meiqihkrq1"
															+ this.defination
															+ this.productId)
															.setDisabled(false);
													Ext.getCmp("meiqihkrq2"
															+ this.defination
															+ this.productId)
															.setDisabled(false);
													if (Ext.getCmp("meiqihkrq1"
															+ this.defination
															+ this.productId)
															.getValue() == true) {
														this
																.getCmpByName('bpProductParameter.payintentPerioDate')
																.setDisabled(false);
													}
												}
											}
										}
									}
								}]
							}, {
								columnWidth : 0.08,
								labelWidth : 1,
								layout : 'form',
								items : [{
									xtype : 'textfield',
									anchor : "100%",
									readOnly : this.isAllReadOnly,
									fieldClass : 'field-align',
									name : 'bpProductParameter.dayOfEveryPeriod'
								}]
							}, {
								columnWidth : 0.07,
								labelWidth : 32,
								layout : 'form',
								items : [{
											fieldLabel : "日/期",
											labelSeparator : '',
											anchor : "100%"
										}]
							}]
				}, {
					columnWidth : 1,
					layout : 'column',
					items : [{
								columnWidth : .12,
								layout : 'form',
								labelAlign : 'right',
								items : [{
											fieldLabel : '还款选项'
										}]
							}, {
								columnWidth : .14, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 1,
								items : [{
									xtype : "checkbox",
									boxLabel : "前置付息",
									disabled : this.isAllReadOnly,
									anchor : "100%",
									name : "isPreposePayAccrualCheck",
									checked : this.record == null
											|| this.record.data.isPreposePayAccrual == 0
											? null
											: true,
									listeners : {
										scope : this,
										'check' : function(box, value) {
											if (value == true) {
												this
														.getCmpByName('bpProductParameter.isPreposePayAccrual')
														.setValue(1);
											} else {
												this
														.getCmpByName('bpProductParameter.isPreposePayAccrual')
														.setValue(0);
											}
										}
									}
								}, {
									xtype : 'hidden',
									name : 'bpProductParameter.isPreposePayAccrual',
									value : 0
								}]
							}, {
								columnWidth : .14, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 1,
								items : [{
									xtype : "checkbox",
									boxLabel : "一次性支付全部利息",
									disabled : this.isAllReadOnly,
									anchor : "100%",
									name : "isInterestByOneTimeCheck",
									checked : this.record == null
											|| this.record.data.isInterestByOneTime == 0
											? null
											: true,
									listeners : {
										scope : this,
										'check' : function(box, value) {
											if (value == true) {
												this
														.getCmpByName('bpProductParameter.isInterestByOneTime')
														.setValue(1);
											} else {
												this
														.getCmpByName('bpProductParameter.isInterestByOneTime')
														.setValue(0);
											}
										}
									}
								}, {
									xtype : 'hidden',
									name : 'bpProductParameter.isInterestByOneTime',
									value : 0
								}]
							}, {
								columnWidth : .6,
								name : "mqhkri",
								layout : "column",
								items : [{
									columnWidth : 0.23,
									labelWidth : 1,
									layout : 'form',
									items : [{
										xtype : 'radio',
										boxLabel : '每期还款日固定在',
										name : 'q1',
										id : "meiqihkrq1" + this.defination+ this.productId,
										inputValue : false,
										checked : true,
										anchor : "100%",
										disabled : this.isAllReadOnly,
										listeners : {
											scope : this,
											check : function(obj, checked) {
												var flag = Ext.getCmp("meiqihkrq1"+ this.defination+ this.productId).getValue();
												if (flag == true) {
													this.getCmpByName('bpProductParameter.isStartDatePay').setValue("1");
													this.getCmpByName('bpProductParameter.payintentPerioDate').setDisabled(false);
												}
											}
										}
									}, {
										xtype : "hidden",
										name : "bpProductParameter.isStartDatePay"
									}]
								}, {
									columnWidth : 0.145,
									labelWidth : 1,
									layout : 'form',
									items : [{
										readOnly : this.isAllReadOnly,
										xtype : 'combo',
										mode : 'local',
										disabled : true,
										displayField : 'name',
										valueField : 'id',
										editable : true,
										store : new Ext.data.SimpleStore({
													fields : ["name", "id"],
													data : obstorepayintentPeriod
												}),
										triggerAction : "all",
										hiddenName : "bpProductParameter.payintentPerioDate",
										fieldLabel : "",
										anchor : '100%'
									}]
								}, {
									columnWidth : 0.129,
									labelWidth : 40,
									layout : 'form',
									items : [{
										fieldLabel : "号还款",
										labelSeparator : '',
										anchor : "100%"
									}]
								}, {
									columnWidth : 0.37,
									labelWidth : 10,
									layout : 'form',
									items : [{
										xtype : 'radio',
										boxLabel : '按实际放款日对日还款',
										name : 'q1',
										id : "meiqihkrq2" + this.defination
												+ this.productId,
										inputValue : true,
										checked : true,
										anchor : "100%",
										disabled : this.isAllReadOnly,
										listeners : {
											scope : this,
											check : function(obj, checked) {
												var flag = Ext
														.getCmp("meiqihkrq2"
																+ this.defination
																+ this.productId)
														.getValue();
												if (flag == true) {
													this
															.getCmpByName('bpProductParameter.isStartDatePay')
															.setValue("2");
													this
															.getCmpByName('bpProductParameter.payintentPerioDate')
															.setValue(null);
													this
															.getCmpByName('bpProductParameter.payintentPerioDate')
															.setDisabled(true);
												}
											}
										}
									}]
								}]
							}]
				}, {
					columnWidth : 1,
					layout : 'column',
					items : [{
								columnWidth : .12,
								layout : 'form',
								labelAlign : 'right',
								items : [{
									fieldLabel : '贷款信息'
								}]
							}, {
								columnWidth : .05,
								layout : 'form',
								labelWidth : 55,
								labelAlign : 'right',
								items : [{
									fieldLabel : "贷款期限",
									labelSeparator : ''
								}]
							}, {
								columnWidth : .13, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 85,
								labelAlign : 'right',
								items : [{
									hideLabel : true,
									xtype : "combo",
									readOnly : this.isAllReadOnly,
									hiddenName : "bpProductParameter.payintentPeriod",
									mode : 'local',
									displayField : 'name',
									valueField : 'id',
									editable : false,
									fieldClass : 'field-align',
									store : new Ext.data.SimpleStore({
										fields : ["name", "id"],
										data : obpayintentPeriods
									}),
									triggerAction : "all",
									anchor : "100%"
								}]
							}, {
								columnWidth : .065, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 20,
								items : [{
									fieldLabel : "期",
									labelSeparator : '',
									anchor : "100%"
								}]
							},{
								columnWidth : .24,
								layout : 'form',
								labelWidth : 97,
								items : [{
									fieldLabel : "主担保方式",
									xtype : "dickeycombo",
									hiddenName : 'bpProductParameter.assuretypeid',
									displayField : 'itemName',
									readOnly : this.isAllReadOnly,
									nodeKey : 'zdbfs',
									emptyText : "请选择",
									editable :false,
									anchor : "91%",
									allowBlank:false,
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
							},{
								columnWidth : .215,
								layout : 'form',
								labelWidth : 92,
								items : [{
									xtype : "combo",
									fieldLabel : '计息方式',
									hiddenName : "bpProductParameter.isActualDay",
									allowBlank:false,
									store:new Ext.data.JsonStore({
		                                fields : ['name', 'value'],
		                                data   : [
		                                    {name : '按实际天数算',   value: 'yes'},
		                                    {name : '按30天算',  value: 'no'}
		                                ]
		                            }),
		                            anchor : "100%",
									valueField : 'value',
									displayField : 'name',
									typeAhead : true,
									mode : 'local',
									triggerAction : 'all'
								}]
							}]
				}, {
					columnWidth : 1,
					layout : 'column',
					items : [{
								columnWidth : .12,
								layout : 'form',
								labelAlign : 'right',
								items : [{
											fieldLabel : '贷款利率'
										}]
							}, {
								columnWidth : .05,
								layout : 'form',
								labelWidth : 55,
								labelAlign : 'right',
								items : [{
									fieldLabel : "年化利率",
									labelSeparator : ''
								}]
							}, {
								columnWidth : .13,
								layout : 'form',
								items : [{
									hideLabel : true,
									xtype : 'numberfield',
									name : "bpProductParameter.yearAccrualRate",
									readOnly : this.isAllReadOnly,
									fieldClass : 'field-align',
									decimalPrecision : 5,
									anchor : '100%',
									style : {
										imeMode : 'disabled'
									},
									value : 0,
									listeners : {
										scope : this,
										'blur' : function(nf) {
											var accrualmonth = this.getCmpByName('bpProductParameter.accrual')
											var dayAccrualRate = this.getCmpByName('bpProductParameter.dayAccrualRate')
											var payintentPeriod = this.getCmpByName('bpProductParameter.payintentPeriod');
											accrualmonth.setValue((nf.getValue()/12).toFixed(5));
											dayAccrualRate.setValue((nf.getValue()/360).toFixed(5));
										}
									}
								}]
							}, {
								columnWidth : .095,
								layout : 'form',
								labelWidth : 20,
								labelAlign : 'left',
								items : [{
											fieldLabel : "%",
											labelSeparator : '',
											anchor : "100%"
										}]
							}, {
								columnWidth : .058,
								layout : 'form',
								labelWidth : 58,
								labelAlgin : 'right',
								items : [{
									fieldLabel : "月化利率",
									labelSeparator : ''
								}]
							}, {
								columnWidth : .13,
								layout : 'form',
								items : [{
									hideLabel : true,
									xtype : 'numberfield',
									name : "bpProductParameter.accrual",
									readOnly : true,
									fieldClass : 'field-align',
									style : {
										imeMode : 'disabled'
									},
									anchor : '100%',
									decimalPrecision : 5,
									value : 0
								}]
							}, {
								columnWidth : .05,
								layout : 'form',
								labelWidth : 20,
								labelAlgin : 'left',
								items : [{
											fieldLabel : "%",
											labelSeparator : '',
											anchor : "100%"
										}]
							}, {
								columnWidth : .058,
								layout : 'form',
								labelWidth : 58,
								labelAlgin : 'right',
								items : [{
											fieldLabel : "日化利率",
											labelSeparator : ''
										}]
							}, {
								columnWidth : .13,
								layout : 'form',
								items : [{
									hideLabel : true,
									xtype : 'numberfield',
									name : "bpProductParameter.dayAccrualRate",
									readOnly : true,
									fieldClass : 'field-align',
									anchor : '100%',
									decimalPrecision : 5,
									style : {
										imeMode : 'disabled'
									},
									value : 0
								}]
							}, {
								columnWidth : .05,
								layout : 'form',
								labelWidth : 20,
								labelAlgin : 'left',
								items : [{
											fieldLabel : "%",
											labelSeparator : '',
											anchor : "100%"
										}]
							}]
				}, {
					columnWidth : 1,
					layout : 'column',
					items : [{
						columnWidth : .12, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelAlign : 'right',
						items : [{
							fieldLabel : "逾期收取方式 ",
							fieldClass : 'field-align',
							anchor : "100%"
						}]
					}, {
						columnWidth : 0.14,
						labelWidth : 1,
						layout : 'form',
						items : [{
							xtype : 'radio',
							boxLabel : '按应还未还金额收取',
							name : 'overdueReceiveWay',
							id : "yqsqfs1" + this.defination+ this.productId,
							inputValue : false,
							checked : true,
							anchor : "90%",
							disabled : this.isAllReadOnly,
							listeners : {
								scope : this,
								check : function(obj, checked) {
									if (checked) {
										this.getCmpByName('bpProductParameter.overdueReceiveWay').setValue("0");
										Ext.getCmp("yqsqfs2"+ this.defination+ this.productId).setValue(false);
									}
								}
							}
						}, {
							xtype : "hidden",
							name : "bpProductParameter.overdueReceiveWay",
							value : "0"
						}]
					}, {
						columnWidth : 0.15,
						labelWidth : 1,
						layout : 'form',
						items : [{
							xtype : 'radio',
							boxLabel : '按合同金额收取',
							anchor : "90%",
							name : 'overdueReceiveWay',
							id : "yqsqfs2" + this.defination+ this.productId,
							inputValue : false,
							disabled : this.isAllReadOnly,
							listeners : {
								scope : this,
								check : function(obj, checked) {
									if (checked) {
										this.getCmpByName('bpProductParameter.overdueReceiveWay').setValue("1");
										Ext.getCmp("yqsqfs1"+ this.defination+ this.productId).setValue(false);
									}
								}
							}
						}]
					}]
				}, {
					columnWidth : 1,
					layout : 'column',
					items : [{
						columnWidth : .12, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelAlign : 'right',
						items : [{
							fieldLabel : "罚息收取方式 ",
							fieldClass : 'field-align',
							anchor : "100%"
						}]
					}, {
						columnWidth : 0.14,
						labelWidth : 1,
						layout : 'form',
						items : [{
							xtype : 'radio',
							boxLabel : '按应还未还金额收取',
							name : 'penaltyReceiveWay',
							id : "fxsqfs1" + this.defination+ this.productId,
							inputValue : false,
							checked : true,
							anchor : "90%",
							disabled : this.isAllReadOnly,
							listeners : {
								scope : this,
								check : function(obj, checked) {
									if (checked) {
										this.getCmpByName('bpProductParameter.penaltyReceiveWay').setValue("0");
										Ext.getCmp("fxsqfs2"+ this.defination+ this.productId).setValue(false);
									}
								}
							}
						}, {
							xtype : "hidden",
							name : "bpProductParameter.penaltyReceiveWay",
							value : "0"
						}]
					}, {
						columnWidth : 0.135,
						labelWidth : 1,
						layout : 'form',
						items : [{
							xtype : 'radio',
							boxLabel : '按合同金额收取',
							anchor : "100%",
							name : 'penaltyReceiveWay',
							id : "fxsqfs2" + this.defination+ this.productId,
							inputValue : false,
							disabled : this.isAllReadOnly,
							listeners : {
								scope : this,
								check : function(obj, checked) {
									if (checked) {
										this.getCmpByName('bpProductParameter.penaltyReceiveWay').setValue("1");
										Ext.getCmp("fxsqfs1"+ this.defination+ this.productId).setValue(false);
									}
								}
							}
						}]
					}, {
						columnWidth : .058,
						layout : 'form',
						labelWidth : 60,
						labelAlign : 'right',
						items : [{
							fieldLabel : '罚息利率',
							labelSeparator : ''
						}]
					}, {
						columnWidth : .13,
						layout : 'form',
						labelWidth : 90,
						items : [{
							hideLabel : true,
							xtype : 'numberfield',
							name : "bpProductParameter.penaltyReceiveRate",
							readOnly : this.isAllReadOnly,
							fieldClass : 'field-align',
							decimalPrecision : 5,
							anchor : '100%',
							style : {
								imeMode : 'disabled'
							},
							value : 0
						}]
					}, {
						columnWidth : .05,
						layout : 'form',
						labelWidth : 34,
						labelAlign : 'left',
						items : [{
							fieldLabel : "%/日",
							labelSeparator : '',
							anchor : "100%"
						}]
					}]
				},{
					columnWidth : 1,
					layout : 'column',
					items : [{
						columnWidth : .12, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelAlign : 'right',
						items : [{
							fieldLabel : "提前还款违约金收取方式",
							fieldClass : 'field-align',
							anchor : "100%"
						}]
					}, {
						columnWidth : 0.14,
						labelWidth : 1,
						layout : 'form',
						items : [{
							xtype : 'radio',
							boxLabel : '按提前还款金额',
							name : 'prepayMoney',
							id : "tqhkje1" + this.defination+ this.productId,
							inputValue : false,
							checked : true,
							anchor : "90%",
							disabled : this.isAllReadOnly,
							listeners : {
								scope : this,
								check : function(obj, checked) {
									if (checked) {
										this.getCmpByName('bpProductParameter.prepayMoney').setValue("0");
										Ext.getCmp("tqhkje2"+ this.defination+ this.productId).setValue(false);
									}
								}
							}
						}, {
							xtype : "hidden",
							name : "bpProductParameter.prepayMoney",
							value : "0"
						}]
					}, {
						columnWidth : 0.135,
						labelWidth : 1,
						layout : 'form',
						items : [{
							xtype : 'radio',
							boxLabel : '按合同金额收取',
							anchor : "100%",
							name : 'prepayMoney',
							id : "tqhkje2" + this.defination+ this.productId,
							inputValue : false,
							disabled : this.isAllReadOnly,
							listeners : {
								scope : this,
								check : function(obj, checked) {
									if (checked) {
										this.getCmpByName('bpProductParameter.prepayMoney').setValue("1");
										Ext.getCmp("tqhkje1"+ this.defination+ this.productId).setValue(false);
									}
								}
							}
						}]
					}, {
						columnWidth : .058,
						layout : 'form',
						labelWidth : 60,
						labelAlign : 'right',
						items : [{
							fieldLabel : '违约金比例',
							labelSeparator : ''
						}]
					}, {
						columnWidth : .13,
						layout : 'form',
						labelWidth : 90,
						items : [{
							hideLabel : true,
							xtype : 'numberfield',
							name : "bpProductParameter.prepayMoneyRate",
							readOnly : this.isAllReadOnly,
							fieldClass : 'field-align',
							decimalPrecision : 5,
							anchor : '100%',
							style : {
								imeMode : 'disabled'
							},
							value : 0
						}]
					}, {
						columnWidth : .02,
						layout : 'form',
						labelWidth : 20,
						labelAlign : 'left',
						items : [{
							fieldLabel : "%",
							labelSeparator : '',
							anchor : "100%"
						}]
					}]
				},{
					columnWidth : 1,
					layout : 'column',
					items : [{
						columnWidth : .12, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelAlign : 'right',
						items : [{
							fieldLabel : "提前还款利息收取方式 ",
							fieldClass : 'field-align',
							anchor : "100%"
						}]
					},{
						columnWidth : 0.05,
						labelWidth : 1,
						layout : 'form',
						bodyStyle:'padding-left:24px;padding-top:4px;',
						items : [{
							html : '不足',	
						    xtype:'label',
						    anchor : '100%'
						}]
					}, {
						columnWidth : 0.05,
						layout : 'form',
						items : [{
							xtype : 'numberfield',
							hideLabel:true,
							name : 'bpProductParameter.prepayRateTypeA',
							value:0,
							anchor : "100%",
							disabled : this.isAllReadOnly
						}]
					},{
						columnWidth : .19,
						layout : 'form',
						bodyStyle:'padding-top:4px;width:186px;',
						items : [{
							html : '天,按实际发生天数收,否则整月收',	
						    xtype:'label',
						    anchor : '90%'
						}]
					},{
						columnWidth : 0.044,
						labelWidth : 1,
						layout : 'form',
						bodyStyle:'padding-left:7px;padding-top:4px;',
						items : [{
							html : '最低收',	
						    xtype:'label',
						    anchor : '100%'
						}]
					}, {
						columnWidth : 0.05,
						layout : 'form',
						items : [{
							xtype : 'numberfield',
							hideLabel:true,
							name : 'bpProductParameter.prepayRateTypeB',
							value:0,
							anchor : "100%",
							disabled : this.isAllReadOnly
						}]
					},{
						columnWidth : .2,
						layout : 'form',
						bodyStyle:'padding-top:4px;width:186px;',
						items : [{
							html : '天利息',	
						    xtype:'label',
						    anchor : '90%'
						}]
					}]
				}, {
					columnWidth : 1,
					layout : 'column',
					items : [{
						columnWidth : .12, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelAlign : 'right',
						items : [{
							fieldLabel : "保证金释放方式 ",
							fieldClass : 'field-align',
							anchor : "100%"
						}]
					}, {
						columnWidth : 0.14,
						labelWidth : 1,
						layout : 'form',
						items : [{
							xtype : 'radio',
							boxLabel : '按还本金额释放',
							name : 'depositsReleaseWay',
							id : "release1" + this.defination+ this.productId,
							inputValue : false,
							checked : true,
							anchor : "90%",
							disabled : this.isAllReadOnly,
							listeners : {
								scope : this,
								check : function(obj, checked) {
									if (checked) {
										this.getCmpByName('bpProductParameter.depositsReleaseWay').setValue("0");
										Ext.getCmp("release2"+ this.defination+ this.productId).setValue(false);
									}
								}
							}
						}, {
							xtype : "hidden",
							name : "bpProductParameter.depositsReleaseWay",
							value : "0"
						}]
					}, {
						columnWidth : 0.12,
						labelWidth : 1,
						layout : 'form',
						items : [{
							xtype : 'radio',
							boxLabel : '按贷款结清',
							anchor : "100%",
							name : 'depositsReleaseWay',
							id : "release2" + this.defination+ this.productId,
							inputValue : false,
							disabled : this.isAllReadOnly,
							listeners : {
								scope : this,
								check : function(obj, checked) {
									if (checked) {
										this.getCmpByName('bpProductParameter.depositsReleaseWay').setValue("1");
										Ext.getCmp("release1"+ this.defination+ this.productId).setValue(false);
									}
								}
							}
						}]
					}]
				},{
					columnWidth : 1,
					layout : 'column',
					items : [{
						columnWidth : .12, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelAlign : 'right',
						items : [{
							fieldLabel : "授信释放方式 ",
							fieldClass : 'field-align',
							anchor : "100%"
						}]
					}, {
						columnWidth : 0.14,
						labelWidth : 1,
						layout : 'form',
						items : [{
							xtype : 'radio',
							boxLabel : '按还本金额释放',
							name : 'creditfreedType',
							id : "credit1" + this.defination+ this.productId,
							inputValue : false,
							checked : true,
							anchor : "90%",
							disabled : this.isAllReadOnly,
							listeners : {
								scope : this,
								check : function(obj, checked) {
									if (checked) {
										this.getCmpByName('bpProductParameter.creditfreedType').setValue("0");
										Ext.getCmp("credit2"+ this.defination+ this.productId).setValue(false);
									}
								}
							}
						}, {
							xtype : "hidden",
							name : "bpProductParameter.creditfreedType",
							value : "0"
						}]
					}, {
						columnWidth : 0.12,
						labelWidth : 1,
						layout : 'form',
						items : [{
							xtype : 'radio',
							boxLabel : '按贷款结清',
							anchor : "100%",
							name : 'creditfreedType',
							id : "credit2" + this.defination+ this.productId,
							inputValue : false,
							disabled : this.isAllReadOnly,
							listeners : {
								scope : this,
								check : function(obj, checked) {
									if (checked) {
										this.getCmpByName('bpProductParameter.creditfreedType').setValue("1");
										Ext.getCmp("credit1"+ this.defination+ this.productId).setValue(false);
									}
								}
							}
						}]
					}]
				}]
			}]
		});
	}
});