/**
 * 听取录音
 * @class ListenRecording
 * @extends Ext.Window
 */
ListenRecording = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		ListenRecording.superclass.constructor.call(this, {
			id : 'CustomerFollowView',
			title:'听取录音',
			//iconCls : 'menu-cusLinkman',
			iconCls : 'menu-person',
			layout : 'form',
			items : this.formPanel,
			modal : true,
			frame:true,
			autoScroll:true,
			//autoHeight:true,
			height:600,
			width : 1000,
			maximizable : true,
			frame:true,
			resizable:false,
			buttonAlign : 'center',
			buttons :[{
				text:'确定',
				iconCls : 'btn-ok',
				handler : this.save.createCallback(this.formPanel, this)
			},'-', {
				text : '取消',
				iconCls : 'btn-cancel',
				handler : this.cancel.createCallback(this)
			}]
		});
	},
	initComponents : function() {
		//录音记录
		this.recordingPanel = new RecordingPanel();
		this.formPanel = new Ext.form.FormPanel({
			frame:true,
			border : false,
			monitorValid : true,
			autoScroll : true,
			anchor : "100%",
			bodyStyle : 'padding-left:0px;padding-top:14px',
			items:[{
				xtype : 'fieldset',
				title : '录音记录',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'recordingPanel',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					this.recordingPanel
				]
			}]
		});
	},
	save : function(formPanel, window) {},
	reset : function(formPanel) {
		formPanel.getForm().reset();
	},
	cancel : function(win) {
		win.close();
	}
});