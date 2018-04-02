/**
 * 借款意向
 * @class BorrowingIntention
 * @extends Ext.Panel
 */
BorrowingIntention = Ext.extend(Ext.Panel ,{
	layout : "form",
	autoHeight : true,
	constructor:function(_cfg){
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this,_cfg);
		this.initUIComponents();
		BorrowingIntention.superclass.constructor.call(this,{
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true,
					labelWidth : 100
				},
				items : [{
							xtype : 'hidden',
							name : ''
						},{
							columnWidth : 1,
							layout : 'column',
							items :[{
							columnWidth : .5,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth : 70,
							items : [{
								fieldLabel : "客户标签",
								xtype : "dickeycombo",
								hiddenName : '',
								displayField : 'itemName',
								itemName : '客户标签',
								nodeKey : 'smallloan_purposeType',	
								emptyText : "请选择",
								editable : false,
								anchor : "100%",
								//allowBlank : false,
								listeners : {
									scope : this,
									afterrender : function(combox) {
										var st = combox.getStore();
										st.on("load", function() {
											if (combox.getValue() == 0
														|| combox.getValue() == 1
														|| combox.getValue() == ""
														|| combox.getValue() == null) {
												combox.setValue("");
											} else {
												combox.setValue(combox.getValue());
											}
											combox.clearInvalid();
										});
									}
								}
							}]
						},{
							columnWidth : .45,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth :  70,
							items : [ {
									fieldLabel : '用款金额',
									xtype : 'numberfield',
									//allowBlank : true,
									anchor:'100%',
									name : '',
									maxLength : 50
							}]
						},{
							columnWidth : .03, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 22,
							items : [{
								fieldLabel : "<span style='margin-left:1px'>元</span> ",
								labelSeparator : '',
								anchor : "50%"
							}]
						}]
						},{
							
							columnWidth : 1,
							layout : 'column',
							items :[{
							columnWidth : .5,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth : 70,
							items : [{
								fieldLabel : "贷款产品",
								xtype : "dickeycombo",
								hiddenName : '',
								displayField : 'itemName',
								itemName : '贷款产品',
								nodeKey : 'smallloan_purposeType',	
								emptyText : "请选择",
								editable : false,
								anchor : "100%",
								//allowBlank : false,
								listeners : {
									scope : this,
									afterrender : function(combox) {
										var st = combox.getStore();
										st.on("load", function() {
											if (combox.getValue() == 0
														|| combox.getValue() == 1
														|| combox.getValue() == ""
														|| combox.getValue() == null) {
												combox.setValue("");
											} else {
												combox.setValue(combox.getValue());
											}
											combox.clearInvalid();
										});
									}
								}
							}]
						},{
							columnWidth : .45,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth :  70,
							items : [ {
									fieldLabel : '用款期限',
									xtype : 'numberfield',
									//allowBlank : true,
									anchor:'100%',
									name : '',
									maxLength : 50
							}]
							},{
								columnWidth : .03, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 22,
								items : [{
									fieldLabel : "<span style='margin-left:1px'>月</span> ",
									labelSeparator : '',
									anchor : "50%"
								}]
							}]
						},{
							
							
							columnWidth : 1,
							layout : 'column',
							items :[{
							columnWidth : .5,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth : 70,
							items : [{
								fieldLabel : "用款时间",
								xtype : 'datefield',
								style : {
									imeMode : 'disabled'
								},
								format : 'Y-m-d',
								anchor:'100%',
								name : ''
							}]
						},{
							columnWidth : .45,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth :  70,
							items : [ {
									fieldLabel : "贷款方式",
									xtype : "dickeycombo",
									hiddenName : '',
									displayField : 'itemName',
									nodeKey : 'customer_channel',
									emptyText : "请选择",
									editable : false,
									anchor : "100%",
									listeners : {
										afterrender : function(combox) {
											var st = combox.getStore();
											st.on("load", function() {
												combox.setValue(combox.getValue());
												combox.clearInvalid();
											});
										}
									}
								}]
							}]
						
						},{
							columnWidth : 1,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth : 70,
							items : [{
								fieldLabel : "备注说明",
								xtype : "textarea",
								name : '',
								anchor : "95%"
							}]
						}]
				}]
		});
	},
	initUIComponents:function(){
	}
	
});