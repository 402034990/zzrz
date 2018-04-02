/**
 * 本次沟通内容
 * @class TheCommunicationContent
 * @extends Ext.Panel
 */
TheCommunicationContent = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		
		Ext.applyIf(this, _cfg);
		TheCommunicationContent.superclass.constructor.call(this, {
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
					layout : "form",
					labelWidth : 75,
					labelAlign : 'right',
					items : [{ 
						fieldLabel : '本次沟通内容',
						xtype:'textarea',
						anchor : "95%"
					}]
				}]
			}]
		});
	}
});