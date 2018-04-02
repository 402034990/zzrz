/**
 * 保单信息
 * @class PolicyInfo
 * @extends Ext.Panel
 */
PolicyInfo = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		PolicyInfo.superclass.constructor.call(this, {
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
				}, {
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						xtype : "textfield",
						fieldLabel : "保险人名称",
						// allowBlank : false,
						name : "",
						anchor : "100%"
					}]
				}, {
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						xtype : "textfield",
						fieldLabel : "保险公司",
						// allowBlank : false,
						name : "",
						anchor : "100%"
					}]
				}, {
					columnWidth : .29, 
					layout : "form", 
					labelWidth : 70,
					items : [{
						xtype : "textfield",
						fieldLabel : "已缴费年数",
						name : "",
						anchor : "100%"
					}]
				},{
					columnWidth : .33, 
					layout : "form", 
					labelWidth : 70,
					items : [{
						xtype : "textfield",
						fieldLabel : "缴费金额",
						name : "",
						anchor : "100%"
					}]
				}]
			}]
		});
	}
});