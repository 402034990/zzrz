chargeCollectionInfoPanel = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	isAllReadOnly : true,
	isWAD : true,
	userType : null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.hiddenchanpin) != "undefined") {
		 
			this.hiddenchanpin = _cfg.hiddenchanpin;
		}

		Ext.applyIf(this, _cfg);
		
		chargeCollectionInfoPanel.superclass.constructor.call(this, {
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					isFormField : true,
					labelWidth : 70
				},
				items : [{
						layout : "form", // 从上往下的布局
						columnWidth : .45,
						items : [{
							xtype : 'textfield',
							fieldLabel : '服务费率',
							hidden : false,
							hideLabel : false,
							allowBlank : false,// this.isHidden,
							name : 'enterpriseBank.accountnum',
							readOnly : true,
							anchor : "100%",
							listeners : {
								scope : this,
								'beforerender' : function(com) {
								},
								'blur' : function(f) {
								}
							}
						}]
					},{
							columnWidth : .05, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 20,
							items : [{
										fieldLabel : "%",
										labelSeparator : '',
										anchor : "100%"
									}]
						},{
						layout : "form", // 从上往下的布局
						columnWidth : .45,
						labelWidth : 100,
						items : [{
							xtype : 'textfield',
							fieldLabel : '服务器收款比例',
							hidden : false,
							hideLabel : false,
							allowBlank : false,// this.isHidden,
							name : 'enterpriseBank.accountnum',
							readOnly : true,
							anchor : "100%",
							listeners : {
								scope : this,
								'beforerender' : function(com) {
								},
								'blur' : function(f) {
								}
							}
						}]
					}, {
							columnWidth : .05, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 20,
							items : [{
										fieldLabel : "% ",
										labelSeparator : '',
										anchor : "100%"
									}]
						}]
			}]
		});
		// 加载
		//this.loadData();
	}
})