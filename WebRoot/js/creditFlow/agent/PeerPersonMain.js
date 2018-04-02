// 小贷节点页面个人基本信息
PeerPersonMain.PeerPersonMainPanel = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	isAllReadOnly : true,
	isLoadShareequity : false,
	isHiddenCustomerDetailBtn : false,
	isPersonNameReadOnly : true,
	isEditPerson : false,
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
		if (typeof(_cfg.isPersonNameReadOnly) != "undefined") {
			this.isPersonNameReadOnly = _cfg.isPersonNameReadOnly;
		}
		if (_cfg.isHiddenCustomerDetailBtn) {
			this.isHiddenCustomerDetailBtn = _cfg.isHiddenCustomerDetailBtn;
		}
		if (typeof(_cfg.isEditPerson) != "undefined") {
			this.isEditPerson = _cfg.isEditPerson;
		}
		var bankAreaRootControl = false;
		if (_cfg.bankAreaRootControl) {
			bankAreaRootControl = _cfg.bankAreaRootControl;
		}
		Ext.applyIf(this, _cfg);
		PeerPersonMain.PeerPersonMainPanel.superclass.constructor.call(this, {
			items : [{
				columnWidth : 1,
				layout : "form",
				style : 'padding-left:17px',
				scope : this,
				items : [{
					layout : "form", // 从上往下的布局
					xtype : 'fieldset',
					title : '客户基本信息',
					items : [{
						layout : "column",
						defaults : {
							anchor : '100%',
							// columnWidth : 1,
							isFormField : true,
							labelWidth : 75
						},
						items : [{
									xtype : 'hidden',
									name : 'person.id'
								}, {
									columnWidth : 1, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
										xtype : 'combo',
										triggerClass : 'x-form-search-trigger',
										fieldLabel : "客户名称",
										name : "person.name",
								
										readOnly : this.isPersonNameReadOnly,
										allowBlank : false,
										editable:false,
										blankText : "客户名称不能为空，请正确填写!",
										anchor : "100%",
										onTriggerClick : function() {},
										resizable : true,
										mode : 'romote',
										
										lazyInit : false,
										typeAhead : true,
										minChars : 1,
									    triggerAction : 'all',
										listeners : {
											scope : this,
											'select' : function(combo, record,
													index) {
												selectCusCombo(record);
											},
											'blur' : function(f) {
											},
											'change' : function(combox, record,index) {
												var obj_n = combox.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;
												ressetProjuect(obj_n);
											}

										}

									}]
								},
									
                               {
									columnWidth : .5, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
										xtype:'textfield',
										fieldLabel : "客户编号",
									    hiddenName : 'person.sex',
										readOnly : this.isAllReadOnly,
										itemName : '客户编号', // xx代表分类名称
										allowBlank : false,
										emptyText : "请选择",
										editable : false,
									
										anchor : "100%",
										listeners : {}

									}]
								}, {
									columnWidth : .5, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
										xtype : "textfield",
										hiddenName : "person.marry",
										fieldLabel : "手机号码",
										
										allowBlank : false,
										editable : false,
										readOnly : this.isAllReadOnly,
										
										anchor : "100%",
										listeners : {}
									}]
								}, {
									columnWidth : .5, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
										xtype : "textfield",
										hiddenName : "person.cardtype",
									    fieldLabel : "保证金账户名",
									    allowBlank : false,
										editable : false,
									
										anchor : "100%",
										listeners : {}

									}]
								}, {
									columnWidth : .5, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
										xtype : "textfield",
										name : "person.cardnumber",
										allowBlank : false,
										fieldLabel : "保证金比例",
										
//										readOnly : this.isAllReadOnly,
										blankText : "证件号码不能为空，请正确填写!",
										anchor : "100%",
										listeners : {}
									}]
								}, {
									columnWidth : .5, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
												xtype : "textfield",
												fieldLabel : "开户人",
												
												allowBlank : false,
												readOnly : this.isAllReadOnly,
												anchor : "100%"
												
											}]
								}]
					}]
				}]
			}, {
				columnWidth : .1, // 该列在整行中所占的百分比
				layout : "form", // 从上往下的布局
				style : 'padding-left:17px',
				hidden : this.isHidden,
				items : [{
					layout : "form", // 从上往下的布局
					xtype : 'fieldset',
					title : '贷款账户信息',
					items : [{
						layout : "column",
						defaults : {
							anchor : '95%',
							columnWidth : 1,
							isFormField : true,
							labelWidth : 70
						},
						items : [{
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 70,
							items : [{
								xtype : 'combo',
								mode : 'local',
								displayField : 'name',
								valueField : 'id',
								editable : false,
								anchor : "100%",
								store : new Ext.data.SimpleStore({
											fields : ["name", "id"],
											data : [["个人", "0"], ["公司", "1"]]
										}),
								triggerAction : "all",
								hiddenName : "enterpriseBank.openType",
								fieldLabel : '开户类型',
								allowBlank : true,
								readOnly : true,
								hidden : this.isHidden,
								hideLabel : this.isHidden,
								name : 'enterpriseBank.openType',
								listeners : {
									scope : this,
									afterrender : function(combox) {
										var st = combox.getStore();
										combox.setValue(st.getAt(0).data.id);
										combox.fireEvent("select", combox, st
														.getAt(0), 0);
									},
									select : function(combox, record, index) {
										var v = record.data.id;
										var obj = this
												.getCmpByName('enterpriseBank.accountType');
										obj.enable();
										obj.setValue();
										obj.store.removeAll()
										if (v == 0) {
											arrStore = new Ext.data.SimpleStore(
													{
														fields : ["name", "id"],
														data : [["个人储蓄户", "0"],
																["基本户", "1"],
																["一般户", "2"]]
													});
											obj.store.insert(0, arrStore
															.getAt(0));
										} else {
											arrStore = new Ext.data.SimpleStore(
													{
														fields : ["name", "id"],
														data : [["个人储蓄户", "0"],
																["基本户", "1"],
																["一般户", "2"]]
													});
											obj.store.insert(0, arrStore
															.getAt(1));
											obj.store.insert(1, arrStore
															.getAt(2));
										}
									}

								}
							}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 70,
							items : [{
								xtype : 'combo',
								mode : 'local',
								displayField : 'name',
								valueField : 'id',
								editable : false,
								width : 70,
								triggerAction : "all",
								hiddenName : "enterpriseBank.accountType",
								fieldLabel : '账户类型',
								allowBlank : true,
								readOnly : this.isReadOnly,
								hidden : this.isHidden,
								hideLabel : this.isHidden,
								store : new Ext.data.SimpleStore({
											fields : ["name", "id"],
											data : [["个人储蓄户", "0"],
													["基本户", "1"], ["一般户", "2"]]
										}),
								name : 'enterpriseBank.accountType',
								anchor : "100%"
							}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 70,
							items : [{
										fieldLabel : '开户名称',
										name : 'enterpriseBank.name',
										xtype : 'textfield',
										readOnly : this.isReadOnly,
										hidden : this.isHidden,
										hideLabel : this.isHidden,
										allowBlank : true,
										anchor : "100%"
									}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 70,
							items : [{
										xtype : 'textfield',
										fieldLabel : '账号',
										hidden : this.isHidden,
										hideLabel : this.isHidden,
										allowBlank : true,
										name : 'enterpriseBank.accountnum',
										readOnly : this.isReadOnly,
										anchor : "100%"
									}]
						}, {
							columnWidth : .33,
							layout : 'form',
							labelWidth : 70,
							items : [{
										name : 'enterpriseBank.id',
										xtype : 'hidden'
									}, {
										fieldLabel : "银行名称",
										xtype : "combo",
										displayField : 'itemName',
										valueField : 'itemId',
										triggerAction : 'all',
										allowBlank : true,
										readOnly : this.isReadOnly,
										hidden : this.isHidden,
										hideLabel : this.isHidden,
										store : new Ext.data.ArrayStore({
											url : __ctxPath
													+ '/creditFlow/common/getBankListCsBank.do',
											fields : ['itemId', 'itemName'],
											autoLoad : true
										}),
										mode : 'remote',
										hiddenName : "enterpriseBank.bankid",
										editable : false,
										blankText : "银行名称不能为空，请正确填写!",
										anchor : "100%",
										listeners : {
											scope : this,
											afterrender : function(combox) {
												var st = combox.getStore();
												st.on("load", function() {
															combox
																	.setValue(combox
																			.getValue());

														})
												combox.clearInvalid();
											}

										}

									}]
						}, {
							columnWidth : .34,
							layout : 'form',
							items : [{
										fieldLabel : "网点名称",
										name : 'enterpriseBank.bankOutletsName',
										xtype : 'textfield',
										allowBlank : true,
										readOnly : this.isReadOnly,
										hidden : this.isHidden,
										hideLabel : this.isHidden,
										anchor : "100%"

									}]
						}, {
							columnWidth : .33,
							layout : 'form',
							items : [{
										name : 'enterpriseBank.areaId',
										xtype : 'hidden'
									}, {
										// id:'bankName',
										name : 'enterpriseBank.areaName',
										hiddenName : 'enterpriseBank.areaName',
										fieldLabel : '开户地区',
										anchor : '100%',
										// value : '中国银行',
										// submitValue:false,
										xtype : 'trigger',
										triggerClass : 'x-form-search-trigger',
										editable : false,
										allowBlank : true,
										readOnly : this.isReadOnly,
										hidden : this.isHidden,
										hideLabel : this.isHidden,
										scope : this,
										onTriggerClick : function() {
											var com = this
											var selectBankLinkMan = function(
													array) {
												var str = "";
												var idStr = ""
												for (var i = array.length - 1; i >= 0; i--) {
													str = str + array[i].text
															+ "-"
													idStr = idStr + array[i].id
															+ ","
												}
												if (str != "") {
													str = str.substring(0,
															str.length - 1);
												}
												if (idStr != "") {
													idStr = idStr.substring(0,
															idStr.length - 1)
												}
												com.previousSibling()
														.setValue(idStr)
												com.setValue(str);
											};
											// areaTree(selectBankLinkMan,bankAreaRootControl)
											selectDictionary('area',
													selectBankLinkMan);
										}

									}]
						}]
					}]
				}]
			}]
		});
	}
})

//企业信息2
PeerPersonMain.PeerMainInfoPanelMagin = Ext.extend(Ext.Panel, {
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
	isGudongDiseditable : true,// 高庆瑞新加,与isAllReadOnly相与，不影响之前配置的
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
		PeerPersonMain.PeerMainInfoPanelMagin.superclass.constructor.call(this, {
		items : [{
				layout : "column", // 定义该元素为布局为列布局方式
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true
				},
				border : false,
				scope : this,
				items : [{
					bodyStyle : 'padding-right:10px',
					columnWidth : 1, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'fieldset',
						title : '基本信息',
						layout : "column",
						defaults : {
							anchor : '100%',
							columnWidth : 1,
							isFormField : true,
							labelWidth : leftlabel
						},
						items : [{
							columnWidth : 1, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							items : [{
										xtype : 'hidden',
										name : 'enterprise.id'
									}, {
										xtype : 'combo',
										anchor : '100%',
										triggerClass : 'x-form-search-trigger',
										fieldLabel : "客户名称",
										name : "enterprise.enterprisename",
										readOnly : this.isEnterpriseNameReadOnly,
										blankText : "企业名称不能为空，请正确填写!",
										allowBlank : false,
										scope : this,
										onTriggerClick : function() {
											var op = this.ownerCt.ownerCt.ownerCt.ownerCt;
											var EnterpriseNameStockUpdateNew = function(obj) {
												op .getCmpByName('enterprise.enterprisename') .setValue("");
												op .getCmpByName('enterprise.id') .setValue("");
												op .getCmpByName('enterprise.enterpriseNumber') .setValue("");
												op .getCmpByName('enterprise.area') .setValue("");
												op .getCmpByName('enterprise.cciaa') .setValue("");
												op .getCmpByName('enterprise.organizecode') .setValue("");
												op .getCmpByName('enterprise.telephone') 	.setValue("");
												op .getCmpByName('enterprise.postcoding') .setValue("");
												op .getCmpByName('enterprise.hangyeType') .setValue("");
												op .getCmpByName('enterprise.hangyeName') .setValue("");
												op .getCmpByName('enterprise.documentType') .setValue("");
												op .getCmpByName('enterprise.taxnum') .setValue("");
												op.getCmpByName('person.id') .setValue("");
												op.getCmpByName('person.name') .setValue("");
												op.getCmpByName('person.sex') .setValue("");
												op .getCmpByName('person.cardtype') .setValue("");
												op .getCmpByName('person.cardnumber') .setValue("");
												op .getCmpByName('person.cellphone') .setValue("");
												op .getCmpByName('person.selfemail') .setValue("");
														

												if (obj.enterprisename != 0 && obj.enterprisename != "")
													op .getCmpByName('enterprise.enterprisename') .setValue(obj.enterprisename);
												if (obj.id != 0 && obj.id != "")
													op .getCmpByName('enterprise.id').setValue(obj.id);
												if (obj.enterpriseNumber != 0 && obj.enterpriseNumber != "")
													op .getCmpByName('enterprise.enterpriseNumber') .setValue(obj.enterpriseNumber);
												if (obj.area != 0 && obj.area != "")
													op .getCmpByName('enterprise.area') .setValue(obj.area);
												if (obj.cciaa != 0&& obj.cciaa != "")
													op .getCmpByName('enterprise.cciaa') 	.setValue(obj.cciaa);
												if (obj.organizecode != 0 && obj.organizecode != "")
													op .getCmpByName('enterprise.organizecode') .setValue(obj.organizecode);
												if (obj.telephone != 0 && obj.telephone != "")
													op .getCmpByName('enterprise.telephone') .setValue(obj.telephone);
															
												if (obj.postcoding != 0 && obj.postcoding != "")
													op .getCmpByName('enterprise.postcoding') .setValue(obj.postcoding);
												if (obj.hangyetype != 0 && obj.hangyetype != "") {
													op .getCmpByName('enterprise.hangyeType') .setValue(obj.hangyetype);
													op .getCmpByName('enterprise.hangyeName') .setValue(obj.hangyetypevalue);
												}
												
												if (obj.documentType != 0 && obj.documentType != ""){
													op.getCmpByName('enterprise.documentType').setValue(obj.documentType);
													var combo = op.getCmpByName('enterprise.organizecode');
													if(obj.documentType==1 ){
														var a = combo.el.parent().parent().first();
														combo.allowBlank=false;
										 				a.dom.innerHTML ="<font color='red'>*</font>社会信用代码";
										 				combo.fieldLabel = '社会信用代码';
														op.findById('cciaa11').setVisible(false);  
														op.findById('taxnum11').setVisible(false);  
													}else{
														var a = combo.el.parent().parent().first();
														combo.allowBlank=false;
										 				a.dom.innerHTML ="<font color='red'>*</font>组织机构代码";
										 				combo.fieldLabel = '组织机构代码';
														op.findById('cciaa11').setVisible(true);  
														op.findById('taxnum11').setVisible(true);
													}
												}
												if (obj.taxnum != 0 && obj.taxnum != "")
												op.getCmpByName('enterprise.taxnum').setValue(obj.taxnum);
												Ext.Ajax.request({
													url : __ctxPath
															+ '/creditFlow/customer/person/seeInfoPerson.do',
													method : "post",
													params : {
														id : obj.legalpersonid
													},
													success : function(d) {

														var c = Ext.util.JSON
																.decode(d.responseText);
														var id = c.data.id;
														var name = c.data.name;
														var sex = c.data.sex;
														var cardtype = c.data.cardtype;
														var cardnumber = c.data.cardnumber;
														var cellphone = c.data.cellphone;
														var selfemail = c.data.selfemail;
														if (id != 0 && id != "")
															op
																	.getCmpByName('person.id')
																	.setValue(id);
														if (name != 0
																&& name != "")
															op
																	.getCmpByName('person.name')
																	.setValue(name);
														if (sex != 0
																&& sex != "")
															op
																	.getCmpByName('person.sex')
																	.setValue(sex);
														if (cardtype != 0
																&& cardtype != "")
															op
																	.getCmpByName('person.cardtype')
																	.setValue(cardtype);
														if (cardnumber != 0
																&& cardnumber != "")
															op
																	.getCmpByName('person.cardnumber')
																	.setValue(cardnumber);
														if (cellphone != 0
																&& cellphone != "")
															op
																	.getCmpByName('person.cellphone')
																	.setValue(cellphone);
														if (selfemail != 0
																&& selfemail != "")
															op
																	.getCmpByName('person.selfemail')
																	.setValue(selfemail);
													}

												})
												// 
												/*var edGrid = op.ownerCt.ownerCt.getCmpByName('gudong_store').get(0).get(1);
												//var edGrid = Ext.getCmp(formPanelId).getCmpByName('gudong_store').get(0).get(1);
												var store = edGrid.getStore();
												var url = __ctxPath
														+ '/creditFlow/common/getShareequity.do?enterpriseId='
														+ obj.id;
												store.proxy.conn.url = url;
												store.load();*/
											}
											selectEnterprise(EnterpriseNameStockUpdateNew);

										},
										resizable : true,
										mode : 'romote',
										// editable : false,
										lazyInit : false,
										typeAhead : true,
										minChars : 1,
										triggerAction : 'all'
									}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							items : [{
										xtype : "textfield",
										anchor : '100%',
										name : "enterprise.enterpriseNumber",
										fieldLabel : "客户编号",

										
										blankText : "企业简称不能为空，请正确填写!"

									}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : rightlabel,
							items : [{
								xtype : "combo",
								triggerClass : 'x-form-search-trigger',
								name : "enterprise.hangyeName",
								fieldLabel : "法定代表人姓名",
								anchor : '100%',
								scope : this,
								readOnly : this.isAllReadOnly,
								onTriggerClick : function(e) {
									var obj = this;
									var oobbj = obj.ownerCt.ownerCt
											.getCmpByName("enterprise.hangyeType");
									selectTradeCategory(obj, oobbj);
								}
							}]
								/*
								 * columnWidth : 0.5, // 该列在整行中所占的百分比 layout :
								 * "form", // 从上往下的布局 labelWidth : rightlabel,
								 * items : [{ xtype : "combo", triggerClass :
								 * 'x-form-search-trigger', name :
								 * "enterprise.hangyeName", fieldLabel : "行业类别",
								 * anchor : '100%', scope : this, allowBlank :
								 * false,//客户添加页面这个为必填项 blankText :
								 * "行业类别不能为空，请正确填写!", readOnly :
								 * this.isAllReadOnly, onTriggerClick :
								 * function(e) { var obj = this; var oobbj =
								 * obj.ownerCt.ownerCt.getCmpByName("enterprise.hangyeType");
								 * var rootId
								 * =obj.ownerCt.ownerCt.getCmpByName("enterprise.rootHangYeType");
								 * var selectHangYe = function(array){
								 * oobbj.setValue(array[0].id)
								 * obj.setValue(array[0].text);
								 * rootId.setValue(array[array.length-1].id) };
								 * selectDictionary('hangye',selectHangYe); } }]
								 */
						}, {
									columnWidth : .5,
									layout : 'form',
									labelWidth : leftlabel,
									items : [{
										xtype : 'combo',
										fieldLabel : '手机号码',
										readOnly:this.isAllReadOnly,
										allowBlank : false,
										mode : 'local',
										displayField : 'typeValue',
						                valueField : 'typeId',
						                triggerAction : 'all',
										hiddenName : 'enterprise.documentType',
										anchor : '100%',
										store : new Ext.data.SimpleStore({
								        data : [['三证合一',1],['非三证合一',2]],
								        fields:['typeValue','typeId']
							            }),
										listeners : {}
									}]
								}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : rightlabel,
							items : [{
								xtype : "textfield",
								name : "enterprise.organizecode",
								allowBlank : false,
								fieldLabel : "保证金账户名",
								//regex : /^[A-Za-z0-9]{8}-[A-Za-z0-9]{1}/,
								regexText : '组织机构代码格式不正确',
								readOnly : this.isAllReadOnly,
								blankText : "组织机构代码不能为空，请正确填写!",
								anchor : "100%",
								listeners : {
									scope : this,
									'blur' : function(tf) {
										var organizecode = tf.getValue();
										var enterpriseId = this
												.getCmpByName("enterprise.id")
												.getValue();
										Ext.Ajax.request({
											url : __ctxPath
													+ '/creditFlow/customer/enterprise/verificationOrganizecodeEnterprise.do',
											method : 'POST',
											params : {
												organizecode : organizecode,
												enterpriseId : enterpriseId
											},
											success : function(response,
													request) {

												var obj = Ext.util.JSON
														.decode(response.responseText);
												if (obj.msg = "false") {

													Ext.ux.Toast.msg('操作信息',
															"该组织机构代码已存在，请重新输入");
													tf.setValue("");
												}
											}
										});
									}
								}
							}]
						}, {
							xtype : "hidden",
							name : 'enterprise.hangyeType'
						}, {
							xtype : "hidden",
							name : 'enterprise.rootHangYeType'
						},{
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							id:'cciaa11',
							items : [{
										xtype : "textfield",
										name : "enterprise.cciaa",
										fieldLabel : "保证金比例",
										readOnly : this.isAllReadOnly,
										blankText : "营业执照号码不能为空，请正确填写!",
										allowBlank : true,
										anchor : "100%"
									}]
						}, {
									columnWidth:.5,
									layout:'form',
									id:'taxnum11',
									labelWidth : leftlabel,
									items:[{
										xtype:'textfield',
								
										blankText : '开户人',
										readOnly:this.isAllReadOnly,
										allowBlank : true,
										regex : /^[0-9]*$/ ,
										regexText : '税务登记号码格式不正确',
										fieldLabel:'开户人',
										name:'enterprise.taxnum',
										anchor : "100%"
									}]
								}]
					}]

				},  {
					columnWidth : 1, // 该列在整行中所占的百分比
					bodyStyle : 'padding-right:2px',
					layout : "form", // 从上往下的布局
					hidden : this.isHidden,
					items : [{
						layout : "form", // 从上往下的布局
						xtype : 'fieldset',
						title : '贷款账户信息',
						items : [{
							layout : "column",
							defaults : {
								anchor : '100%',
								columnWidth : 1,
								isFormField : true,
								labelWidth : 75
							},
							items : [{
								columnWidth : 0.5, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								items : [{
									xtype : 'combo',
									mode : 'local',
									displayField : 'name',
									valueField : 'id',
									editable : false,
									anchor : "100%",
									store : new Ext.data.SimpleStore({
												fields : ["name", "id"],
												data : [["个人", "0"],
														["公司", "1"]]
											}),
									triggerAction : "all",
									hiddenName : "enterpriseBank.openType",
									fieldLabel : '开户类型',
									allowBlank : true,
									readOnly : this.isReadOnly,
									hidden : this.isHidden,
									hideLabel : this.isHidden,
									name : 'enterpriseBank.openType',
									listeners : {
										scope : this,
										afterrender : function(combox) {
											var st = combox.getStore();
											/*combox
													.setValue(st.getAt(1).data.id);
											combox.fireEvent("select", combox,
													st.getAt(1), 0);*/
										},
										select : function(combox, record, index) {
											var v = record.data.id;
											var obj = this
													.getCmpByName('enterpriseBank.accountType');
											obj.enable();
											obj.setValue();
											obj.store.removeAll()
											if (v == 0) {
												arrStore = new Ext.data.SimpleStore(
														{
															fields : ["name",
																	"id"],
															data : [
																	["个人储蓄户",
																			"0"],
																	["基本户", "1"],
																	["一般户", "2"]]
														});
												obj.store.insert(0, arrStore
																.getAt(0));
											} else {
												arrStore = new Ext.data.SimpleStore(
														{
															fields : ["name",
																	"id"],
															data : [
																	["个人储蓄户",
																			"0"],
																	["基本户", "1"],
																	["一般户", "2"]]
														});
												obj.store.insert(0, arrStore
																.getAt(1));
												obj.store.insert(1, arrStore
																.getAt(2));
											}
										}
										

									}
								}]
							}, {
								columnWidth : 0.5, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								items : [{
									xtype : 'combo',
									mode : 'local',
									displayField : 'name',
									valueField : 'id',
									editable : false,
									width : 70,
									triggerAction : "all",
									hiddenName : "enterpriseBank.accountType",
									fieldLabel : '账户类型',
									allowBlank : true,
									readOnly : this.isReadOnly,
									hidden : this.isHidden,
									hideLabel : this.isHidden,
									store : new Ext.data.SimpleStore({
												fields : ["name", "id"],
												data : [["个人储蓄户", "0"],
														["基本户", "1"],
														["一般户", "2"]]
											}),
									anchor : "100%",
									listeners : {
										scope : this,
										loadData : function(obj){
											var v =this.getCmpByName('enterpriseBank.openType').getValue();
											obj.enable();
											obj.store.removeAll()
											if (v == 0) {
												arrStore = new Ext.data.SimpleStore(
														{
															fields : ["name",
																	"id"],
															data : [
																	["个人储蓄户",
																			"0"],
																	["基本户", "1"],
																	["一般户", "2"]]
														});
												obj.store.insert(0, arrStore.getAt(0));
											} else {
												arrStore = new Ext.data.SimpleStore(
														{
															fields : ["name",
																	"id"],
															data : [
																	["个人储蓄户",
																			"0"],
																	["基本户", "1"],
																	["一般户", "2"]]
														});
												obj.store.insert(0, arrStore.getAt(1));
												obj.store.insert(1, arrStore.getAt(2));
											}
										}
									}
								}]
							}, {
								columnWidth : 0.5, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								items : [{
											fieldLabel : '开户名称',
											name : 'enterpriseBank.name',
											xtype : 'textfield',
											readOnly : this.isReadOnly,
											hidden : this.isHidden,
											hideLabel : this.isHidden,
											allowBlank : true,
											anchor : "100%"
										}]
							}, {
								columnWidth : 0.5, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								items : [{
											xtype : 'textfield',
											fieldLabel : '账号',
											hidden : this.isHidden,
											hideLabel : this.isHidden,
											allowBlank : true,
											name : 'enterpriseBank.accountnum',
											readOnly : this.isReadOnly,
											anchor : "100%"
										}]
							}, {
								columnWidth : .33,
								layout : 'form',
								labelWidth : 80,
								items : [{
											name : 'enterpriseBank.id',
											xtype : 'hidden'
										}, {
											fieldLabel : "银行名称",
											xtype : "combo",
											displayField : 'itemName',
											valueField : 'itemId',
											triggerAction : 'all',
											allowBlank : true,
											readOnly : this.isReadOnly,
											hidden : this.isHidden,
											hideLabel : this.isHidden,
											store : new Ext.data.ArrayStore({
												url : __ctxPath
														+ '/creditFlow/common/getBankListCsBank.do',
												fields : ['itemId', 'itemName'],
												autoLoad : true
											}),
											mode : 'remote',
											hiddenName : "enterpriseBank.bankid",
											editable : false,
											blankText : "银行名称不能为空，请正确填写!",
											anchor : "100%",
											listeners : {
												scope : this,
												afterrender : function(combox) {
													var st = combox.getStore();
													st.on("load", function() {
																combox
																		.setValue(combox
																				.getValue());

															})
													combox.clearInvalid();
												}

											}

										}]
							}, {
								columnWidth : .34,
								layout : 'form',
								items : [{
											fieldLabel : "网点名称",
											name : 'enterpriseBank.bankOutletsName',
											xtype : 'textfield',
											allowBlank : true,
											readOnly : this.isReadOnly,
											hidden : this.isHidden,
											hideLabel : this.isHidden,
											editable : true,
											anchor : "100%"

										}]
							}, {
								columnWidth : .33,
								layout : 'form',
								items : [{
											name : 'enterpriseBank.areaId',
											xtype : 'hidden'
										}, {
											// id:'bankName',
											name : 'enterpriseBank.areaName',
											hiddenName : 'enterpriseBank.areaName',
											fieldLabel : '开户地区',
											anchor : '100%',
											// value : '中国银行',
											// submitValue:false,
											xtype : 'trigger',
											triggerClass : 'x-form-search-trigger',
											editable : false,
											allowBlank : true,
											readOnly : this.isReadOnly,
											hidden : this.isHidden,
											hideLabel : this.isHidden,
											scope : this,
											onTriggerClick : function() {
												var com = this
												var selectBankLinkMan = function(
														array) {
													var str = "";
													var idStr = ""
													for (var i = array.length
															- 1; i >= 0; i--) {
														str = str
																+ array[i].text
																+ "-"
														idStr = idStr
																+ array[i].id
																+ ","
													}
													if (str != "") {
														str = str.substring(0,
																str.length - 1);
													}
													if (idStr != "") {
														idStr = idStr
																.substring(
																		0,
																		idStr.length
																				- 1)
													}
													com.previousSibling()
															.setValue(idStr)
													com.setValue(str);
												};
												// areaTree(selectBankLinkMan,bankAreaRootControl)
												selectDictionary('area',
														selectBankLinkMan,
														bankAreaRootControl);// add
																				// by
																				// gao
																				// extRootControl
																				// 只可以双击选择
																				// 23级
																				// 回填
											}

										}]
							}]
						}]
					}]
				}/*, {
					columnWidth : 1, // 该列占用的宽度，标识为50％
					border : false,
					name : "gudong_store",
					layout : "form",
					style : 'margin-top:10px',
					bodyStyle : 'padding-left: 0px;text-align:left;',
					hidden : this.isHideGudongInfo,
					scope : this,
					items : [new EnterpriseShareequity({
								type : this.isLoadShareequity,
								bussinessType : this.bussinessType,
								projectId : this.projectId,
								isHidden : this.isGudongDiseditable
										&& this.isAllReadOnly
							})]

				}*/]

			}]
		});
	}
})

//企业信息2
PeerPersonMain.PeerMainInfoPanelMagin = Ext.extend(Ext.Panel, {
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
	isGudongDiseditable : true,// 高庆瑞新加,与isAllReadOnly相与，不影响之前配置的
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
		PeerPersonMain.PeerMainInfoPanelMagin.superclass.constructor.call(this, {
		items : [{
				layout : "column", // 定义该元素为布局为列布局方式
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true
				},
				border : false,
				scope : this,
				items : [{
					bodyStyle : 'padding-right:10px',
					columnWidth : 1, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'fieldset',
						title : '基本信息',
						layout : "column",
						defaults : {
							anchor : '100%',
							columnWidth : 1,
							isFormField : true,
							labelWidth : leftlabel
						},
						items : [{
							columnWidth : 1, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							items : [{
										xtype : 'hidden',
										name : 'enterprise.id'
									}, {
										xtype : 'combo',
										anchor : '100%',
										triggerClass : 'x-form-search-trigger',
										fieldLabel : "客户名称",
										name : "enterprise.enterprisename",
										readOnly : this.isEnterpriseNameReadOnly,
										blankText : "企业名称不能为空，请正确填写!",
										allowBlank : false,
										scope : this,
										onTriggerClick : function() {
											/*var op = this.ownerCt.ownerCt.ownerCt.ownerCt;*/
											var EnterpriseNameStockUpdateNew = function(obj) {}
											selectEnterprise(EnterpriseNameStockUpdateNew);

										},
										resizable : true,
										mode : 'romote',
										// editable : false,
										lazyInit : false,
										typeAhead : true,
										minChars : 1,
										triggerAction : 'all'
									}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							items : [{
										xtype : "textfield",
										anchor : '100%',
										name : "enterprise.enterpriseNumber",
										fieldLabel : "客户编号",

										
										blankText : "企业简称不能为空，请正确填写!"

									}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : rightlabel,
							items : [{
								xtype : "combo",
								triggerClass : 'x-form-search-trigger',
								name : "enterprise.hangyeName",
								fieldLabel : "法定代表人姓名",
								anchor : '100%',
								scope : this,
								readOnly : this.isAllReadOnly,
								onTriggerClick : function(e) {
									var obj = this;
									var oobbj = obj.ownerCt.ownerCt
											.getCmpByName("enterprise.hangyeType");
									selectTradeCategory(obj, oobbj);
								}
							}]
								/*
								 * columnWidth : 0.5, // 该列在整行中所占的百分比 layout :
								 * "form", // 从上往下的布局 labelWidth : rightlabel,
								 * items : [{ xtype : "combo", triggerClass :
								 * 'x-form-search-trigger', name :
								 * "enterprise.hangyeName", fieldLabel : "行业类别",
								 * anchor : '100%', scope : this, allowBlank :
								 * false,//客户添加页面这个为必填项 blankText :
								 * "行业类别不能为空，请正确填写!", readOnly :
								 * this.isAllReadOnly, onTriggerClick :
								 * function(e) { var obj = this; var oobbj =
								 * obj.ownerCt.ownerCt.getCmpByName("enterprise.hangyeType");
								 * var rootId
								 * =obj.ownerCt.ownerCt.getCmpByName("enterprise.rootHangYeType");
								 * var selectHangYe = function(array){
								 * oobbj.setValue(array[0].id)
								 * obj.setValue(array[0].text);
								 * rootId.setValue(array[array.length-1].id) };
								 * selectDictionary('hangye',selectHangYe); } }]
								 */
						}, {
									columnWidth : .5,
									layout : 'form',
									labelWidth : leftlabel,
									items : [{
										xtype : 'combo',
										fieldLabel : '手机号码',
										readOnly:this.isAllReadOnly,
										allowBlank : false,
										mode : 'local',
										displayField : 'typeValue',
						                valueField : 'typeId',
						                triggerAction : 'all',
										hiddenName : 'enterprise.documentType',
										anchor : '100%',
										store : new Ext.data.SimpleStore({
								        data : [['三证合一',1],['非三证合一',2]],
								        fields:['typeValue','typeId']
							            }),
										listeners : {}
									}]
								}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : rightlabel,
							items : [{
								xtype : "textfield",
								name : "enterprise.organizecode",
								allowBlank : false,
								fieldLabel : "保证金账户名",
								//regex : /^[A-Za-z0-9]{8}-[A-Za-z0-9]{1}/,
								regexText : '组织机构代码格式不正确',
								readOnly : this.isAllReadOnly,
								blankText : "组织机构代码不能为空，请正确填写!",
								anchor : "100%",
								listeners : {
									scope : this,
									'blur' : function(tf) {
										var organizecode = tf.getValue();
										var enterpriseId = this
												.getCmpByName("enterprise.id")
												.getValue();
										Ext.Ajax.request({
											url : __ctxPath
													+ '/creditFlow/customer/enterprise/verificationOrganizecodeEnterprise.do',
											method : 'POST',
											params : {
												organizecode : organizecode,
												enterpriseId : enterpriseId
											},
											success : function(response,
													request) {

												var obj = Ext.util.JSON
														.decode(response.responseText);
												if (obj.msg = "false") {

													Ext.ux.Toast.msg('操作信息',
															"该组织机构代码已存在，请重新输入");
													tf.setValue("");
												}
											}
										});
									}
								}
							}]
						}, {
							xtype : "hidden",
							name : 'enterprise.hangyeType'
						}, {
							xtype : "hidden",
							name : 'enterprise.rootHangYeType'
						},{
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							id:'cciaa11',
							items : [{
										xtype : "textfield",
										name : "enterprise.cciaa",
										fieldLabel : "保证金比例",
										readOnly : this.isAllReadOnly,
										blankText : "营业执照号码不能为空，请正确填写!",
										allowBlank : true,
										anchor : "100%"
									}]
						}, {
									columnWidth:.5,
									layout:'form',
									id:'taxnum11',
									labelWidth : leftlabel,
									items:[{
										xtype:'textfield',
								
										blankText : '开户人',
										readOnly:this.isAllReadOnly,
										allowBlank : true,
										regex : /^[0-9]*$/ ,
										regexText : '税务登记号码格式不正确',
										fieldLabel:'开户人',
										name:'enterprise.taxnum',
										anchor : "100%"
									}]
								}]
					}]

				},  {
					columnWidth : 1, // 该列在整行中所占的百分比
					bodyStyle : 'padding-right:2px',
					layout : "form", // 从上往下的布局
					hidden : this.isHidden,
					items : [{
						layout : "form", // 从上往下的布局
						xtype : 'fieldset',
						title : '贷款账户信息',
						items : [{
							layout : "column",
							defaults : {
								anchor : '100%',
								columnWidth : 1,
								isFormField : true,
								labelWidth : 75
							},
							items : [{
								columnWidth : 0.5, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								items : [{
									xtype : 'combo',
									mode : 'local',
									displayField : 'name',
									valueField : 'id',
									editable : false,
									anchor : "100%",
									store : new Ext.data.SimpleStore({
												fields : ["name", "id"],
												data : [["个人", "0"],
														["公司", "1"]]
											}),
									triggerAction : "all",
									hiddenName : "enterpriseBank.openType",
									fieldLabel : '开户类型',
									allowBlank : true,
									readOnly : this.isReadOnly,
									hidden : this.isHidden,
									hideLabel : this.isHidden,
									name : 'enterpriseBank.openType',
									listeners : {
										scope : this,
										afterrender : function(combox) {
											var st = combox.getStore();
											/*combox
													.setValue(st.getAt(1).data.id);
											combox.fireEvent("select", combox,
													st.getAt(1), 0);*/
										},
										select : function(combox, record, index) {
											var v = record.data.id;
											var obj = this
													.getCmpByName('enterpriseBank.accountType');
											obj.enable();
											obj.setValue();
											obj.store.removeAll()
											if (v == 0) {
												arrStore = new Ext.data.SimpleStore(
														{
															fields : ["name",
																	"id"],
															data : [
																	["个人储蓄户",
																			"0"],
																	["基本户", "1"],
																	["一般户", "2"]]
														});
												obj.store.insert(0, arrStore
																.getAt(0));
											} else {
												arrStore = new Ext.data.SimpleStore(
														{
															fields : ["name",
																	"id"],
															data : [
																	["个人储蓄户",
																			"0"],
																	["基本户", "1"],
																	["一般户", "2"]]
														});
												obj.store.insert(0, arrStore
																.getAt(1));
												obj.store.insert(1, arrStore
																.getAt(2));
											}
										}
										

									}
								}]
							}, {
								columnWidth : 0.5, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								items : [{
									xtype : 'combo',
									mode : 'local',
									displayField : 'name',
									valueField : 'id',
									editable : false,
									width : 70,
									triggerAction : "all",
									hiddenName : "enterpriseBank.accountType",
									fieldLabel : '账户类型',
									allowBlank : true,
									readOnly : this.isReadOnly,
									hidden : this.isHidden,
									hideLabel : this.isHidden,
									store : new Ext.data.SimpleStore({
												fields : ["name", "id"],
												data : [["个人储蓄户", "0"],
														["基本户", "1"],
														["一般户", "2"]]
											}),
									anchor : "100%",
									listeners : {
										scope : this,
										loadData : function(obj){
											var v =this.getCmpByName('enterpriseBank.openType').getValue();
											obj.enable();
											obj.store.removeAll()
											if (v == 0) {
												arrStore = new Ext.data.SimpleStore(
														{
															fields : ["name",
																	"id"],
															data : [
																	["个人储蓄户",
																			"0"],
																	["基本户", "1"],
																	["一般户", "2"]]
														});
												obj.store.insert(0, arrStore.getAt(0));
											} else {
												arrStore = new Ext.data.SimpleStore(
														{
															fields : ["name",
																	"id"],
															data : [
																	["个人储蓄户",
																			"0"],
																	["基本户", "1"],
																	["一般户", "2"]]
														});
												obj.store.insert(0, arrStore.getAt(1));
												obj.store.insert(1, arrStore.getAt(2));
											}
										}
									}
								}]
							}, {
								columnWidth : 0.5, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								items : [{
											fieldLabel : '开户名称',
											name : 'enterpriseBank.name',
											xtype : 'textfield',
											readOnly : this.isReadOnly,
											hidden : this.isHidden,
											hideLabel : this.isHidden,
											allowBlank : true,
											anchor : "100%"
										}]
							}, {
								columnWidth : 0.5, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								items : [{
											xtype : 'textfield',
											fieldLabel : '账号',
											hidden : this.isHidden,
											hideLabel : this.isHidden,
											allowBlank : true,
											name : 'enterpriseBank.accountnum',
											readOnly : this.isReadOnly,
											anchor : "100%"
										}]
							}, {
								columnWidth : .33,
								layout : 'form',
								labelWidth : 80,
								items : [{
											name : 'enterpriseBank.id',
											xtype : 'hidden'
										}, {
											fieldLabel : "银行名称",
											xtype : "combo",
											displayField : 'itemName',
											valueField : 'itemId',
											triggerAction : 'all',
											allowBlank : true,
											readOnly : this.isReadOnly,
											hidden : this.isHidden,
											hideLabel : this.isHidden,
											store : new Ext.data.ArrayStore({
												url : __ctxPath
														+ '/creditFlow/common/getBankListCsBank.do',
												fields : ['itemId', 'itemName'],
												autoLoad : true
											}),
											mode : 'remote',
											hiddenName : "enterpriseBank.bankid",
											editable : false,
											blankText : "银行名称不能为空，请正确填写!",
											anchor : "100%",
											listeners : {
												scope : this,
												afterrender : function(combox) {
													var st = combox.getStore();
													st.on("load", function() {
																combox
																		.setValue(combox
																				.getValue());

															})
													combox.clearInvalid();
												}

											}

										}]
							}, {
								columnWidth : .34,
								layout : 'form',
								items : [{
											fieldLabel : "网点名称",
											name : 'enterpriseBank.bankOutletsName',
											xtype : 'textfield',
											allowBlank : true,
											readOnly : this.isReadOnly,
											hidden : this.isHidden,
											hideLabel : this.isHidden,
											editable : true,
											anchor : "100%"

										}]
							}, {
								columnWidth : .33,
								layout : 'form',
								items : [{
											name : 'enterpriseBank.areaId',
											xtype : 'hidden'
										}, {
											// id:'bankName',
											name : 'enterpriseBank.areaName',
											hiddenName : 'enterpriseBank.areaName',
											fieldLabel : '开户地区',
											anchor : '100%',
											// value : '中国银行',
											// submitValue:false,
											xtype : 'trigger',
											triggerClass : 'x-form-search-trigger',
											editable : false,
											allowBlank : true,
											readOnly : this.isReadOnly,
											hidden : this.isHidden,
											hideLabel : this.isHidden,
											scope : this,
											onTriggerClick : function() {
												var com = this
												var selectBankLinkMan = function(
														array) {
													var str = "";
													var idStr = ""
													for (var i = array.length
															- 1; i >= 0; i--) {
														str = str
																+ array[i].text
																+ "-"
														idStr = idStr
																+ array[i].id
																+ ","
													}
													if (str != "") {
														str = str.substring(0,
																str.length - 1);
													}
													if (idStr != "") {
														idStr = idStr
																.substring(
																		0,
																		idStr.length
																				- 1)
													}
													com.previousSibling()
															.setValue(idStr)
													com.setValue(str);
												};
												// areaTree(selectBankLinkMan,bankAreaRootControl)
												selectDictionary('area',
														selectBankLinkMan,
														bankAreaRootControl);// add
																				// by
																				// gao
																				// extRootControl
																				// 只可以双击选择
																				// 23级
																				// 回填
											}

										}]
							}]
						}]
					}]
				}/*, {
					columnWidth : 1, // 该列占用的宽度，标识为50％
					border : false,
					name : "gudong_store",
					layout : "form",
					style : 'margin-top:10px',
					bodyStyle : 'padding-left: 0px;text-align:left;',
					hidden : this.isHideGudongInfo,
					scope : this,
					items : [new EnterpriseShareequity({
								type : this.isLoadShareequity,
								bussinessType : this.bussinessType,
								projectId : this.projectId,
								isHidden : this.isGudongDiseditable
										&& this.isAllReadOnly
							})]

				}*/]

			}]
		});
	}
})

PeerPersonMain.CustomerTypeMargin = Ext.extend(Ext.form.FieldSet, {
	flag : false,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (_cfg.flag) {
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
		PeerPersonMain.CustomerTypeMargin.superclass.constructor.call(this, {
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
										title : '企业客户信息',
										collapsible : true,
										labelAlign : 'right',
										bodyStyle : 'padding-left:0px;',
										autoHeight : true,
										operationType:'SmallLoan_SmallLoanBusiness',
										name : 'customerInfo',
										items : [
											new PeerPersonMain.CustomerTypeMargin({
												flag : false
											}),
											new PeerPersonMain.PeerMainInfoPanelMagin({
												isHiddenCustomerDetailBtn : true,
												isAllReadOnly : false,
												isEditEnterprise : true,
												isEnterpriseNameReadOnly : false,
												isHidden : true
											})
										]
									});
									op.insert(0, testFieldSet);
									op.doLayout();
									return false;
								} else if (inputValue == 2) {
									var testFieldSet = new Ext.form.FieldSet({
										title : '个人客户信息',
										collapsible : true,
										labelAlign : 'right',
										bodyStyle : 'padding-left:0px;',
										autoHeight : true,
										operationType:'SmallLoan_PersonalCreditLoanBusiness',
										name : 'customerInfo',
										items : [
											new PeerPersonMain.CustomerTypeMargin({
												flag : true
											}), {
												xtype : 'peerPersonMainPanel',
												name : 'customerInfo',
												isHiddenCustomerDetailBtn : true,
												isAllReadOnly : false,
												isEditPerson : true,
												isPersonNameReadOnly : false,
												isHidden : true
											}]
									});
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


Ext.reg('peerPersonMainPanel',PeerPersonMain.PeerPersonMainPanel);