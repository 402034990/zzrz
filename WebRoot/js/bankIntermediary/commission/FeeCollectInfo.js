/**
 * 费用收取信息
 * 
 * @class BorrowingIntention
 * @extends Ext.Panel
 */
FeeCollectInfo = Ext.extend(Ext.Panel, {
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
		FeeCollectInfo.superclass.constructor.call(this, {
			items : [ {
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true,
				},
				items : [ {
					columnWidth : 0.5,
					layout : "form",
					labelWidth : labelWidth,
					items : [ {
						xtype : 'textfield',
						fieldLabel : '服务费率',
						anchor : '100%',
						readOnly : true,
						name : '33'
					} ]
				}, {
					columnWidth : 0.49,
					layout : "form",
					labelWidth : labelWidth + 45,
					labelAlign : 'right',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '服务费首款比例',
						readOnly : true,
						anchor : '100%',
						name : '33'
					} ]
				} ]
			} ]
		});
	},
	initUIComponents : function() {
	}

});