projectNamePanel = Ext.extend(Ext.Panel, {
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
		
		projectNamePanel.superclass.constructor.call(this, {
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true,
					labelWidth : 60
				},
				items : [{
							layout : "form", // 从上往下的布局
							items:[{
							xtype : "textfield",
							anchor : '100%',
							labelWidth : 60,
							name : "slSmallloanProject.projectName",
							id : 'slSmallloanProjectProjectName',
							fieldLabel : "项目名称",
							allowBlank : false,
							readOnly : false,
							blankText : "项目名称不能为空，请正确填写!",
							listeners : {
								render : function() {
									Ext.fly(this.el).on('click', function(e, t) {
										
									}
									);
							}
						  }
						}]}]
			}]
		});
		// 加载
		//this.loadData();
	}
})