/**
 * 借款意向
 * @class BorrowingIntention
 * @extends Ext.Panel
 */
BorrowingIntention = Ext.extend(Ext.Panel ,{
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		BorrowingIntention.superclass.constructor.call(this, {
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					labelWidth : 100
				},
				items : [{
					xtype : 'hidden',
					name : ''
				},{
					columnWidth : .3,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						xtype : "textfield",
						fieldLabel : "贷款金额",
						// allowBlank : false,
						name : "",
						anchor : "100%"
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
						},{
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						xtype : "datefield",
						fieldLabel : "用款时间",
						// allowBlank : false,
						editable : false,
						format : 'Y-m-d',
						name : "",
						anchor : "100%"
					}]
				},{
					columnWidth : .29,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						xtype : "textfield",
						fieldLabel : "用款期限",
						// allowBlank : false,
						name : "",
						anchor : "100%"
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
				},{
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						fieldLabel : "申请产品",
						xtype : 'combo',
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'value',
						store : new Ext.data.SimpleStore({
							fields : ["value"],
							data : [["123"], ["456"]]
						}),
						triggerAction : "all",
						name : '',
						fieldLabel : '客户类型',
						anchor : "91%"
					}]
				}]
			}]
		});
	}
});