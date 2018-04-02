/**
 * 微信端意向分配
 * @class IntentionAssign
 * @extends Ext.Window
 */
IntentionAssign = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		IntentionAssign.superclass.constructor.call(this, {
			id : 'IntentionAssign',
			title:'分配',
			//iconCls : 'menu-cusLinkman',
			iconCls : 'menu-person',
			layout : 'form',
			items : [this.formPanel],
			modal : true,
			frame:true,
			autoScroll:true,
			autoHeight:true,
			width : 800,
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
		//推荐顾问
		var recommendAdvisor = new RecommendAdvisor();
		//顾问列表
		var advisorList = new AdvisorList();
		//查询
		var advisorListSearch = new AdvisorListSearch();
		this.formPanel = new Ext.form.FormPanel({
			//id : "",
			frame:true,
			border : false,
			monitorValid : true,
			autoScroll : true,
			anchor : "100%",
			bodyStyle : 'padding-left:0px;padding-top:14px',
			items:[{
				xtype : 'fieldset',
				title : '推荐顾问',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'recommendAdvisor',
				labelAlign : 'right',
				autoHeight : true,
				collapsible:false,//是否可折叠
				items : [ 
					recommendAdvisor
				]
			},{
				xtype : 'fieldset',
				title : '顾问列表',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'advisorList',
				labelAlign : 'right',
				autoHeight : true,
				collapsible:false,//是否可折叠
				items : [ 
					advisorListSearch,advisorList
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