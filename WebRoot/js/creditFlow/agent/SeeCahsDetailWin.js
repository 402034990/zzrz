/**
 * @author
 * @createtime
 * @class ArticleForm
 * @extends Ext.Window
 * @description Article表单
 * @company 智维软件
 */
SeeCahsDetailWin = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		if (typeof(_cfg.id) != "undefined") {
			this.cashId = _cfg.id;
		}
		if (typeof(_cfg.customerType) != "undefined") {
			this.customerType = _cfg.customerType;
		}
		// 必须先初始化组件
		this.initUIComponents();
		SeeCahsDetailWin.superclass.constructor.call(this, {
			id : 'SeeCahsDetailWin',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			frame:true,
			height:230,
			border : false,
			width : 600,
			maximizable : true,
			title : '保证金账户信息',
			buttonAlign : 'center'
		});
	},// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			frame:true,
			// id : 'ArticleForm',
			defaults : {
				anchor : '100%'
			},
			defaultType : 'textfield',
			items:[
			      this.customerType =='person_customer'?new SeeCahsPeerPersonMainPanel({}):new SeeCahsPeerMainInfoPanelMagin({})
			]
		});
//		// 加载表单对应的数据
//		if (this.cashId != null && this.cashId != 'undefined') {
//			this.formPanel.getForm().load({ 
////				deferredRender : false,
//				url : __ctxPath + '/entityhbm/getCashDep.do?id=' + this.cashId,
//				root : 'data',
//				preName : 'cashDeposit',
//				waitMsg : '正在载入数据...',
//				success : function(form, action) { 
//					alert(123213)
//				
//				},
//				failure : function(form, action) {
//					Ext.ux.Toast.msg('编辑', '载入失败');
//				}
//			});
//		}
		this.formPanel.loadData({
			url : __ctxPath + '/entityhbm/getCashDep.do?id=' + this.cashId,
			root : 'data',
			preName : 'cashDeposit',
			success : function(response, options) {
				var respText = response.responseText;
				var alarm_fields = Ext.util.JSON.decode(respText);
//				expandFieldSet(this.formPanel)
				var  cashzhanyong =  alarm_fields.data.cashzhanyong;
				if(cashzhanyong == null ||  cashzhanyong=="" || cashzhanyong=='undefined'){
				 	this.getCmpByName('cashDeposit.cashzhanyong').setValue(0)
				}else{
					this.getCmpByName('cashDeposit.cashzhanyong').setValue(Ext.util.Format.number(cashzhanyong, '0,000.00'))
				}
				var  cashshengyu =  alarm_fields.data.cashshengyu;
				
				if(cashshengyu == null || cashshengyu==""||cashshengyu=='undefined'){
				 	this.getCmpByName('cashDeposit.cashshengyu').setValue(0)
				}else{
					this.getCmpByName('cashDeposit.cashshengyu').setValue(Ext.util.Format.number(cashshengyu, '0,000.00'))
				}
				
				
//				this.getCmpByName('creditMoney1').setValue(Ext.util.Format.number(alarm_fields.data.bankCredit.creditMoney, '0,000.00'))
////				this.getCmpByName('slSmallloanProject.projectMoney1').setValue(Ext.util.Format.number(alarm_fields.data.slSmallloanProject.projectMoney, '0,000.00'))
//				fillData(this,alarm_fields,'personLoanFlow'+this.taskId);
			}
		});
	}
});



//企业信息ok
SeeCahsPeerMainInfoPanelMagin = Ext.extend(Ext.Panel, {
	layout : "form",
	border : false,
	autoHeight : true,
	labelAlign : 'right',
	frame:true,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		var leftlabel = 100;
		var rightlabel = 90
		Ext.applyIf(this, _cfg);
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
							columnWidth : 1, 
							layout : "form", 
							labelWidth : leftlabel,
							border : false,
							items : [{
										xtype : 'combo',
										triggerClass : 'x-form-search-trigger',
										fieldLabel : "客户姓名",
										name : "cashDeposit.custormerName",
										readOnly : true,
										anchor : "100%",
										lazyInit : false,
										typeAhead : true,
										minChars : 1,
										triggerAction : 'all'
									}]},{
										columnWidth : 0.5, 
										layout : "form", 
										labelWidth : leftlabel,
										border : false,
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
										labelWidth : leftlabel,
										border : false,
										items : [{
											xtype:'textfield',
											fieldLabel : "法定代表人姓名",
											anchor : '100%',
											name:'cashDeposit.cashLegalRepresentative',
											readOnly:true,
											allowBlank : false,
											scope : this
										}]
								    }, {
										columnWidth : .5,
										layout : 'form',
										labelWidth : leftlabel,
										border : false,
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
										border : false,
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
										border : false,
										items : [{
											xtype : "textfield",
											fieldClass : 'field-align',
											name : "cashDeposit.cashrate",
											fieldLabel : "保证金比例",
										    allowBlank : false,
										    readOnly:true,
											anchor : "100%",
											border:false
										}]
									}, {
										columnWidth : .06, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										defaults : {
											anchor : "100%"
										},
										border:false,
										labelWidth :10,
										items : [{
											border:false,
											fieldLabel : "%",
											labelSeparator : ''
										}]
								    }, {
										columnWidth : .5, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										border : false,
										labelWidth : leftlabel,
										items : [{
											xtype : "combo",
											triggerClass : 'x-form-search-trigger',
											hiddenName : "cashDeposit.cashCount",
											editable : false,
											readOnly:true,
											fieldLabel :  "开户人" ,
											allowBlank : false,
											anchor : "100%"
										}]
								},{
									columnWidth : 0.5, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : leftlabel,
									border : false,
									items : [{
										 xtype:'datefield',
									     name:'cashDeposit.cashdate',
									     anchor : "100%",
									     readOnly:true,
									     allowBlank : false,
									     format: 'Y-m-d',
									     fieldLabel:'开户日期'
									}]
								},{
									columnWidth : 0.4, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : leftlabel,
									border : false,
									items : [{
										 xtype:'textfield',
										 fieldClass : 'field-align',
									     name:'cashDeposit.cashzhanyong',
									     anchor : "100%",
									     readOnly:true,
									     allowBlank : false,
									     fieldLabel:'已占用金额'
									}]
								},{
									columnWidth : .06, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									defaults : {
										anchor : "100%"
									},
									border:false,
									labelWidth :10,
									items : [{
										border:false,
										fieldLabel : "元",
										labelSeparator : ''
									}]
							    },{
									columnWidth : 0.4, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : leftlabel,
									border : false,
									items : [{
										fieldClass : 'field-align',
										 xtype:'textfield',
									     name:'cashDeposit.cashshengyu',
									     anchor : "100%",
									     readOnly:true,
									     allowBlank : false,
									     fieldLabel:'剩余金额'
									}]
								}, {
									columnWidth : .06, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									defaults : {
										anchor :"100%"
									},
									border:false,
									labelWidth :10,
									items : [{
										border:false,
										fieldLabel : "元",
										labelSeparator : ''
									}]
					   		 }]
			}]
		});
	}
});


// 小贷节点页面个人基本信息
SeeCahsPeerPersonMainPanel = Ext.extend(Ext.Panel, {
	layout : "form",
	border : false,
	autoHeight : true,
	labelAlign : 'right',
	frame:true,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this, _cfg);
		var bankAreaRootControl = false;
		var leftlabel = 100;
		var rightlabel = 90
		SeeCahsPeerPersonMainPanel.superclass.constructor.call(this, {
			items : [{
				layout : "column", 
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true
				},
				scope : this,
				items : [{
							columnWidth : 1, 
							layout : "form", 
							labelWidth : leftlabel,
							border : false,
							items : [{
										xtype : 'combo',
										triggerClass : 'x-form-search-trigger',
										fieldLabel : "客户姓名",
										name : "cashDeposit.custormerName",
										readOnly : true,
										editable : false,
										blankText : "客户名称不能为空，请正确填写!",
										anchor : "100%",
										resizable : true,
										mode : 'romote',
										lazyInit : false,
										typeAhead : true
									}] 
									},{
										columnWidth : 0.5, 
										layout : "form", 
										border : false,
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
											border : false,
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
							border : false,
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
							border : false,
							items : [{
								xtype : "textfield",
								fieldClass : 'field-align',
								name : "cashDeposit.cashrate",
								fieldLabel : "保证金比例",
							    allowBlank : false,
							    readOnly:true,
							    border:false,
								anchor : "100%"
							}]
						}, {
							columnWidth : .06, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							defaults : {
								anchor : anchor
							},
							border:false,
							labelWidth :10,
							items : [{
								border:false,
								fieldLabel : "%",
								labelSeparator : ''
							}]
					    },  {
								columnWidth : .5, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								anchor : "100%",
								border : false,
								labelWidth : leftlabel,
								items : [{
									xtype : "combo",
									triggerClass : 'x-form-search-trigger',
									hiddenName : "cashDeposit.cashCount",
									editable : false,
									fieldLabel :  "开户人" ,
									blankText : "客户经理不能为空，请正确填写!",
									allowBlank : false,
									readOnly : true,
									anchor : "100%"
								}]
							},{
									columnWidth : 0.5, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : leftlabel,
									border : false,
									items : [{
										 xtype:'datefield',
									     name:'cashDeposit.cashdate',
									     readOnly:true,
									     allowBlank : false,
									     fieldLabel:'开户日期',
									     format: 'Y-m-d',
									     anchor : "100%"
									     
									}]
								},{
									columnWidth : 0.4, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : leftlabel,
									border : false,
									items : [{
										 xtype:'textfield',
										 fieldClass : 'field-align',
									     name:'cashDeposit.cashzhanyong',
									     anchor : "100%",
									     readOnly:true,
									     allowBlank : false,
									     fieldLabel:'已占用金额'
									}]
								}, {
									columnWidth : .1, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									defaults : {
										anchor : anchor
									},
									border:false,
									labelWidth :10,
									items : [{
										border:false,
										fieldLabel : "元",
										labelSeparator : ''
									}]
							    },{
									columnWidth : 0.4, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : leftlabel,
									border : false,
									items : [{
										fieldClass : 'field-align',
										 xtype:'textfield',
									     name:'cashDeposit.cashshengyu',
									     readOnly:true,
									     anchor : "100%",
									     allowBlank : false,
									     fieldLabel:'剩余金额'
									}]
								}, {
									columnWidth : .06, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									defaults : {
										anchor : anchor
									},
									border:false,
									labelWidth :10,
									items : [{
										border:false,
										fieldLabel : "元",
										labelSeparator : ''
									}]
							    } ]
			}]
		});
	}
});