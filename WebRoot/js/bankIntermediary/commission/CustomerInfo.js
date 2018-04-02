/**
 * 借款意向
 * 
 * @class BorrowingIntention
 * @extends Ext.Panel
 */
CustomerInfo = Ext.extend(Ext.Panel, {
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
		CustomerInfo.superclass.constructor.call(this, {
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
					columnWidth : 0.33,
					layout : "form",
					labelWidth : labelWidth,
					labelAlign : 'right',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '客户姓名',
						anchor : '100%',
						readOnly : true,
						name : '33'
					} ]
				}, {
					columnWidth : 0.33,
					layout : "form",
					labelWidth : labelWidth,
					labelAlign : 'right',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '客户性别',
						anchor : '100%',
						readOnly : true,
						name : '33'
					} ]
				}, {
					columnWidth : 0.33,
					layout : "form",
					labelWidth : labelWidth,
					labelAlign : 'right',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '地区',
						anchor : '100%',
						readOnly : true,
						name : '33'
					} ]
				}, {
					columnWidth : 0.99,
					layout : "form",
					labelWidth : labelWidth + 80,
					labelAlign : 'right',
					items : [ {
						xtype : 'button',
						text : '查看客户信息',
						iconCls : 'btn-search',
						width : 60,
						handler : function() {
							// this.searchByCondition();
						}
					} ]
				} ]
			} ]
		});
	},
	initUIComponents : function() {
	}

});