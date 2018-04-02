
CustomerToolFormPanel = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		var leftlabel = 100;
		var centerlabel = 100;
		var rightlabel = 100;
		var firstColumnWidth = 0.8;
		var middleColumnWidth = 0.1;
		
		CustomerToolFormPanel.superclass.constructor.call(this, {
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true,
					labelWidth : leftlabel
				},
				items : [{
						layout : "column",
						border : false,
						scope : this,
						defaults : {
							anchor : '100%',
							columnWidth : 1,
							isFormField : true,
							labelWidth : leftlabel
						},
						items : [{
							columnWidth : 1,
							layout : 'column',
							height:40,
							items : [{
								columnWidth : firstColumnWidth, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								hidden : this.isProduct,
								items : [{
									fieldLabel : "客户名称",
									xtype : "textfield",
									allowBlank : false,
									readOnly : false,
									name:"customerName",
									anchor : '100%',
									listeners : {
										scope : this,
										'change' : function() {}
									}

								}]
							}]
						}]
					},{
						layout : "column",
						border : false,
						scope : this,
						defaults : {
							anchor : '100%',
							columnWidth : 1,
							isFormField : true,
							labelWidth : leftlabel
						},
						items : [{
							columnWidth : 1,
							layout : 'column',
							items : [{
								columnWidth : firstColumnWidth, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								hidden : this.isProduct,
								items : [{
									fieldLabel : "客户手机号",
									xtype : "textfield",
									allowBlank : false,
									readOnly : false,
									name:"customerTelephone",
									anchor : '100%',
									listeners : {
										scope : this,
										'change' : function() {}
									}

								}]
							}]
						}]
					}]
			}]
		});
	},
	initComponents : function() {
	}
});
Ext.reg('CustomerToolFormPanel', CustomerToolFormPanel);

