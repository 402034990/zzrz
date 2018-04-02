/**
 * 下次跟进设置
 * @class NextFollowSettingPanel
 * @extends Ext.Panel
 */
NextFollowSettingPanel = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		
		Ext.applyIf(this, _cfg);
		NextFollowSettingPanel.superclass.constructor.call(this, {
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true,
					labelWidth : 100
				},
				items : [{
					xtype : 'hidden',
					name : ''
				},{
					columnWidth : .5,
					layout : "form",
					labelWidth : 75,
					labelAlign : 'right',
					items : [{ 
						xtype : "datetimefield",
						fieldLabel : "下次跟进时间",
						name : "",
						editable : false,
						format:'Y-m-d H:i:s',
						anchor : "95%"
					}]
				},{
					columnWidth : .5,
					layout : "form",
					labelWidth : 75,
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
						anchor : "90%"
					}]
				},{
					columnWidth : 1,
					layout : "form",
					labelWidth : 75,
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
						anchor : "47.5%"
					}]
				},{
					columnWidth : 1,
					layout : "form",
					labelWidth : 75,
					labelAlign : 'right',
					items : [{ 
						fieldLabel : '下次沟通内容',
						xtype:'textarea',
						anchor : "95%"
					}]
				},{
					columnWidth : 1,
					height:40,
					layout : "form",
					labelWidth : 75,
					items : [{ 
						fieldLabel : "<span style='margin-left:1px;'><B>提醒操作人</B></span> ",
						labelSeparator : ''
					}]
				},{
					columnWidth : .5,
					layout : "form",
					labelWidth : 75,
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
					columnWidth : .5,
					layout : "form",
					labelWidth : 75,
					labelAlign : 'right',
					items : [{ 
						xtype : "datetimefield",
						fieldLabel : "提醒时间",
						name : "",
						editable : false,
						format:'Y-m-d H:i:s',
						anchor : "90%"
					}]
				}]
			}]
		});
	}
});