customerInfoPanel = Ext.extend(Ext.Panel, {
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
		
		customerInfoPanel.superclass.constructor.call(this, {
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					isFormField : true,
					labelWidth : 70,
					columnWidth : .33
				},
				items : [{
					layout : "form", // 从上往下的布局
					items : [{
						xtype : "combo",
						triggerClass : 'x-form-search-trigger',
						hiddenName : "slSmallloanProject.appUserName",
						editable : false,
						fieldLabel : "客户姓名",
						allowBlank : false,
						anchor : "100%",
						listeners : {
							scope : this,
							'afterRender' : function(combo) {
							}
						},
						onTriggerClick : function(cc) {
							var obj = this;
							var appuerIdObj = obj.nextSibling();
							var userIds = appuerIdObj.getValue();
							if (null == obj.getValue() || "" == obj.getValue()) {
								userIds = "";
							}
							new UserDialog({
										userIds : userIds,
										userName : obj.getValue(),
										single : false,
										type : 'branch',
										title : "选择客户",
										callback : function(uId, uname) {
											obj.setValue(uname);
											appuerIdObj.setValue(uId);
										}
									}).show();

						}
					}]
				},{
						layout : "form", // 从上往下的布局
						items : [{
							xtype : 'textfield',
							fieldLabel : '客户性别',
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
							fieldLabel : '客户地区',
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
			},{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					isFormField : true,
					labelWidth : 70,
					columnWidth : 1
				},
				items : [{
							layout : 'form',
							columnWidth : 1,
							border : false,
							labelWidth : 80,
							items : [{
										xtype : 'button',
										text : '查看客户信息',
										scope : this,
										style :'margin-left:91.8%',
										anchor : "5%",
										handler : this.search
									}]
						}]
			}]
		});
		// 加载
		//this.loadData();
	}
})