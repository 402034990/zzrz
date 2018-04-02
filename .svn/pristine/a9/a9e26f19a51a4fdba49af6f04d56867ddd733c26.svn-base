/**
 * 业务办理
 * @class businessManagementFrom
 * @extends Ext.Window
 */
businessManagementFrom = Ext.extend(Ext.Window, {
	operationType:null,
	userId:null,
	userType:null,
	isAllReadOnly:false,
	isNameReadOnly:false,
	isProductReadOnly:false,
	productId:null,
	isHiddernShop:false,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.type) != "undefined") {
			 
			this.type = _cfg.type;
		}
		
		Ext.applyIf(this, _cfg);
		this.initComponents();
		businessManagementFrom.superclass.constructor.call(this, {
			id : 'businessManagementFrom'+this.operationType,
			iconCls : 'btn-tree-team30',
			layout : 'form',
			items : this.formPanel,
			modal : true,
			frame:true,
			autoScroll:true,
			autoHeight:true,
			width : 750,
			maximizable : true,
			frame:true,
			resizable:false,
			title : '业务办理',
			buttonAlign : 'center',
			buttons :[{
				text:'启动项目',
				iconCls : 'btn-ok1',
				handler : this.save.createCallback(this.formPanel, this)
			},'-', {
				text : '重置',
				iconCls : 'btn-reset',
				handler : this.reset.createCallback(this.formPanel)
			},'-', {
				text : '取消',
				iconCls : 'btn-cancel',
				handler : this.cancel.createCallback(this)
			}]
		});
	},
	initComponents : function() {
		//客户信息
		this.customerInformationPanel= new customerInformationPanel();
		
		//借款意向
		this.borrowingIntentionPanel = new borrowingIntentionPanel();
		
		//项目名称
		this.projectNamePanel = new projectNamePanel();
		
		this.formPanel = new Ext.form.FormPanel({
			id : "createNewSLFunctionForm",
			frame:true,
			border : false,
			monitorValid : true,
			autoScroll : true,
			anchor : "100%",
			url : __ctxPath + "/flow/saveProcessActivity.do",
			bodyStyle : 'padding-left:0px;padding-top:14px',
			items:[{
				xtype : 'hidden',
				name : 'preHandler',
				value : 'creditProjectService.startCreditP2PProjectFlow'
			},{
				xtype : 'fieldset',
				title : "客户信息",
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				id : 'CHXX',
				name : 'CHXX',
				labelAlign : 'right',
				autoHeight : true,
				items : [this.customerInformationPanel]
			},{
				xtype : 'fieldset',
				title : "借款意向",
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				id : 'JKYX',
				name : 'JKYX',
				labelAlign : 'right',
				autoHeight : true,
				items : [this.borrowingIntentionPanel]
			},{
				xtype : 'fieldset',
				title : "项目名称",
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				id : 'XMMC',
				name : 'XMMC',
				labelAlign : 'right',
				autoHeight : true,
				items : [this.projectNamePanel]
			}]
		});
	
		
	},
	/**
	 * 启动项目
	 */
	save : function(formPanel, window) {
	
	},
	reset : function(formPanel) {
		formPanel.getForm().reset();
	},
	cancel : function(win) {
		win.close()
	}
})