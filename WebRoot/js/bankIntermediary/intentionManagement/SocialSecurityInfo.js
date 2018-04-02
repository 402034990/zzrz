/**
 * 社保信息
 * @class SocialSecurityInfo
 * @extends Ext.Panel
 */
SocialSecurityInfo = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		SocialSecurityInfo.superclass.constructor.call(this, {
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
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						fieldLabel : "社保卡号",
						xtype : "textfield",
						name : "",
						anchor : "100%"
					}]
				},{
					columnWidth : .33,
					layout : "form",
					labelWidth : 90,
					items : [{ 
						fieldLabel : "社保缴存基金数",
						xtype : "textfield",
						name : "",
						anchor : "100%"
					}]
				},{
					columnWidth : .29,
					layout : "form",
					labelWidth : 80,
					items : [{ 
						fieldLabel : "连续缴存时间",
						xtype : "textfield",
						name : "",
						anchor : "100%"
					}]
				}]
			}]
		});
	}
});