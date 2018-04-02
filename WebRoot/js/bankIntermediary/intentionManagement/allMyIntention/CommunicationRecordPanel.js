/**
 * 沟通记录
 * @class CommunicationRecordPanel
 * @extends Ext.Panel
 */
CommunicationRecordPanel = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		
		Ext.applyIf(this, _cfg);
		CommunicationRecordPanel.superclass.constructor.call(this, {
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
					columnWidth : .33,
					layout : "form",
					labelWidth : 75,
					items : [{ 
						fieldLabel : '沟通方式',
						xtype : 'combo',
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'value',
						store : new Ext.data.SimpleStore({
							fields : ["value"],
							data : [["电话"], ["短信"],["邮件"],["上门拜访"],["微信"],["聊天室"]]
						}),
						triggerAction : "all",
						name : '',
						anchor : "100%"
					}]
				},{
					columnWidth : .21,
					layout : "form", 
					labelWidth : 5,
					items : [{ 
						xtype : "button",
						text : "呼出",
						style:'padding-left:20px',
						anchor : "100%",
						width:'30',
						height:'20'
						//scale: "large"
						//handler:
					}]
				},{
					columnWidth : .2,
					layout : "form", 
					labelWidth : 5,
					items : [{ 
						xtype : "button",
						text : "三方通话",
						style:'padding-left:15px',
						anchor : "100%",
						width:'20',
						height:'20'
						//scale: "large"
						//handler:
					}]
				},{
					columnWidth : .21,
					layout : "form", 
					labelWidth : 5,
					items : [{ 
						xtype : "button",
						text : "转接",
						style:'padding-left:20px',
						anchor : "100%",
						width:'30',
						height:'20'
						//scale: "large"
						//handler:
					}]
				},{
					columnWidth : 1,
					layout : "form", 
					labelWidth : 75,
					items : [{ 
						xtype : "datetimefield",
						fieldLabel : "沟通时间",
						name : "",
						editable : false,
						format:'Y-m-d H:i:s',
						anchor : "33%"
					}]
				},{
					columnWidth : 1,
					layout : "form", 
					labelWidth : 75,
					items : [{ 
						xtype : "textarea",
						fieldLabel : "沟通内容",
						name : "",
						anchor : "95%"
					}]
				}]
			}]
		});
	}
});