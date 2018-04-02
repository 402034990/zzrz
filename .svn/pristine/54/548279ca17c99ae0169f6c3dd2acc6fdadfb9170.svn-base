customerInformationPanel = Ext.extend(Ext.Panel, {
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
		
		customerInformationPanel.superclass.constructor.call(this, {
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
						hiddenName : "person.name",
						editable : false,
						fieldLabel : "客户姓名",
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
							var cutomerInfoStockUpdateNew = function(obj) {
								if (null != obj.name && "" != obj.name)
									op.getCmpByName('person.name').setValue(obj.name);
								if (null != obj.sex && "" != obj.sex)
									op.getCmpByName('person.sex').setValue(obj.sex);
								if (null != obj.address && "" != obj.address)
									op.getCmpByName('person.address').setValue(obj.address);
							}
							//客户信息选择窗口
							customerInfoSelectWin(cutomerInfoStockUpdateNew);
							

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
							name : 'person.sex',
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
							name : 'person.address',
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