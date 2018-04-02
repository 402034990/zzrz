/**
 * 借款意向
 * 
 * @class BorrowingIntention
 * @extends Ext.Panel
 */
ProjectInfo = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		var labelWidth = 60;
		var readOnly = true;
		ProjectInfo.superclass.constructor.call(this, {
			items : [ {
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
					columnWidth : 0.66,
					layout : "form", 
					labelWidth : labelWidth,
					items:[{
						xtype : 'textfield',
						fieldLabel : '项目名称',
						anchor : '100%',
						readOnly : true,
						name : '33'
					}]
				},{
					columnWidth : 0.33,
					layout : "form", 
					labelWidth : labelWidth,
					labelAlign :'right',
					items:[{
						xtype : 'textfield',
						fieldLabel : '项目编号',
						anchor : '100%',
						readOnly : true,
						name : '33'
					}]
				}]
			} ]
		});
	},
	initUIComponents : function() {
	}

});