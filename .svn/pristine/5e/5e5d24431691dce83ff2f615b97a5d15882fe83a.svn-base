/**
 * 下次跟进设置
 * @class NextFollowTime
 * @extends Ext.Window
 */
NextFollowTime = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.type) != "undefined") {
			 
			this.type = _cfg.type;
		}
		
		Ext.applyIf(this, _cfg);
		this.initComponents();
		NextFollowTime.superclass.constructor.call(this, {
			id : 'NextFollowTime',
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
			title : '跟进设置',
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
					height:30,
					layout : "form",
					labelWidth : 85,
					items : [{ 
						fieldLabel : "<span style='margin-left:1px;'><B>下次跟进设置</B></span> ",
						labelSeparator : ''
					}]
				},{
					columnWidth : 1,
					layout : "form",
					labelWidth : 85,
					labelAlign : 'right',
					items : [{ 
						xtype : "datetimefield",
						fieldLabel : "下次跟进时间",
						name : "",
						editable : false,
						allowBlank : false,
						format:'Y-m-d H:i:s',
						anchor : "95%"
					}]
				},{
					columnWidth : 1,
					layout : "form",
					labelWidth : 85,
					labelAlign : 'right',
					items : [{ 
						xtype : 'combo',
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'value',
						store : new Ext.data.SimpleStore({
							fields : ["value"],
							data : [["短信"], ["电话"],["邮件"]]
						}),
						triggerAction : "all",
						name : '',
						fieldLabel : '下次沟通方式',
						anchor : "95%"
					}]
				},{
					columnWidth : 1,
					height:40,
					layout : "form",
					labelWidth : 85,
					labelAlign : 'right',
					items : [{ 
						fieldLabel : '短信模板',
						xtype : 'combo',
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'value',
						store : new Ext.data.SimpleStore({
							fields : ["value"],
							data : [["模板1"], ["模板2"],["模板3"]]
						}),
						triggerAction : "all",
						name : '',
						anchor : "95%"
					}]
				},{
					columnWidth : 1,
					height:40,
					layout : "form",
					labelWidth : 85,
					items : [{ 
						fieldLabel : "<span style='margin-left:1px;'><B>提醒操作人</B></span> ",
						labelSeparator : ''
					}]
				},{
					columnWidth : 1,
					layout : "form",
					labelWidth : 85,
					labelAlign : 'right',
					items : [{ 
						fieldLabel : '提醒方式',
						xtype : 'combo',
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'value',
						store : new Ext.data.SimpleStore({
							fields : ["value"],
							data : [["站内消息"], ["短信"]]
						}),
						triggerAction : "all",
						name : '',
						anchor : "95%"
					}]
				},{
					columnWidth : 1,
					layout : "form",
					labelWidth : 85,
					labelAlign : 'right',
					items : [{ 
						xtype : "datetimefield",
						fieldLabel : "提醒时间",
						name : "",
						editable : false,
						format:'Y-m-d H:i:s',
						anchor : "95%"
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