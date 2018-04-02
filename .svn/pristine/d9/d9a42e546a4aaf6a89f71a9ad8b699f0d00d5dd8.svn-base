borrowingIntentionPanel = Ext.extend(Ext.Panel, {
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
		
		borrowingIntentionPanel.superclass.constructor.call(this, {
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 0.333,
					isFormField : true,
					labelWidth : 60
				},
				items : [{
						layout : "form", // 从上往下的布局
						items : [{
						xtype : "combo",
						triggerClass : 'x-form-search-trigger',
						hiddenName : "slSmallloanProject.appUserName",
						editable : false,
						fieldLabel : "借款金额",
						allowBlank : false,
						anchor : "100%", 
						listeners : {
							scope : this,
							'afterRender' : function(combo) {
							}
						},
						onTriggerClick : function() {
							
							var op = this.ownerCt.ownerCt.ownerCt.ownerCt;
							//使用回调函数
							var borrowingntentionInfoStockUpdateNew = function(obj) {
								if (null != obj.name && "" != obj.name)
									op.getCmpByName('person.name').setValue(obj.name);
								if (null != obj.sex && "" != obj.sex)
									op.getCmpByName('person.sex').setValue(obj.sex);
								if (null != obj.address && "" != obj.address)
									op.getCmpByName('person.address').setValue(obj.address);
							}
							//客户信息选择窗口
							borrowingntentionInfoSelectWin(borrowingntentionInfoStockUpdateNew);
						}
					}]
					},{
						layout : "form", // 从上往下的布局
						items : [{
							xtype : 'textfield',
							fieldLabel : '借款期限',
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
						layout : "form", // 从上往下的布局
						items : [{
							xtype : 'textfield',
							fieldLabel : '借款产品',
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
					}]
			}]
		});
		// 加载
		//this.loadData();
	}
})