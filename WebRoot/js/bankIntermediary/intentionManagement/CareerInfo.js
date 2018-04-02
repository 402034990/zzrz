/**
 * 事业信息
 * @class CareerInfo
 * @extends Ext.Panel
 */
CareerInfo = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		CareerInfo.superclass.constructor.call(this, {
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
						fieldLabel : "行业分类",
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
						fieldLabel : "单位分类",
						// allowBlank : false,
						name : "",
						anchor : "100%"
					}]
				}, {
					columnWidth : .29, 
					layout : "form", 
					labelWidth : 90,
					items : [{
						xtype : "textfield",
						fieldLabel : "月收入/月营业额",
						name : "",
						anchor : "100%"
					}]
				}]
			}]
		});
	}
});