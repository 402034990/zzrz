/**
 * 客户转化
 * @class CustomerTransfer
 * @extends Ext.Window
 */
CustomerTransfer = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.type) != "undefined") {
			 
			this.type = _cfg.type;
		}
		
		Ext.applyIf(this, _cfg);
		this.initComponents();
		CustomerTransfer.superclass.constructor.call(this, {
			id : 'CustomerTransfer',
			//iconCls : 'btn-tree-team30',
			iconCls : 'menu-person',
			layout : 'form',
			items : this.formPanel,
			modal : true,
			frame:true,
			autoScroll:true,
			autoHeight:true,
			width : 500,
			maximizable : true,
			frame:true,
			resizable:false,
			title : '客户转化',
			buttonAlign : 'center',
			buttons :[{
				text:'确定',
				iconCls : 'btn-ok'
				//handler : 
			},{
				text : '关闭',
				iconCls : 'btn-cancel',
				handler : this.cancel.createCallback(this)
			}]
		});
	},
	initComponents : function() {
		this.formPanel = new Ext.form.FormPanel({
			frame:true,
			border : false,
			monitorValid : true,
			autoScroll : true,
			anchor : "100%",
			bodyStyle : 'padding-left:0px;padding-top:14px',
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					labelWidth : 100
				},
				items : [{
							columnWidth : 1,
							layout : "form",
							labelWidth : 70,
							items : [{
								fieldLabel : '转换类型',
								xtype : 'combo',
								mode : 'local',
								valueField : 'value',
								editable : false,
								displayField : 'value',
								allowBlank : false,
								blankText:'转化类型不能为空',
								store : new Ext.data.SimpleStore({
									fields : ["value"],
									data : [["正式"], ["排除"]]
								}),
								triggerAction : "all",
								name : '',
								anchor : "100%"
							}]
						},{
					columnWidth : 1,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						xtype : "textfield",
						fieldLabel : "客户姓名",
						name : "",
						allowBlank : false,
						anchor : "100%"
					}]
				},{
					columnWidth : 1,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						xtype : "textfield",
						fieldLabel : "身份证号",
						name : "",
						allowBlank : false,
						anchor : "100%"
					}]
				},{
					columnWidth : 1,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						xtype : "textarea",
						fieldLabel : "转化理由",
						name : "",
						//allowBlank : false,
						anchor : "100%"
					}]
				}]
			}]
		});
	
		
	},
	
	reset : function(formPanel) {
		formPanel.getForm().reset();
	},
	cancel : function(win) {
		win.close()
	}
});