 /**
  * 合作企业档案管理
  * @class enterpriseFileManagement
  * @extends Ext.Window
  */
enterpriseFileManagement = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		enterpriseFileManagement.superclass.constructor.call(this, {
			id : 'enterpriseFileManagement',
			title:'合作企业档案管理',
			//iconCls : 'menu-cusLinkman',
			iconCls : 'menu-person',
			layout : 'form',
			items : this.formPanel,
			modal : true,
			frame:true,
			autoScroll:true,
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
		
		//机构基本信息
		this.InformationOfMechanismPanel = new InformationOfMechanismPanel();
		//主联系人信息
		this.primaryContactInformation = new primaryContactInformation();
		//材料清单
		this.uploads = new uploads({
		    	projectId : this.projectId,
		    	isHidden : false,
		    	businessType :this.businessType,
		    	isNotOnlyFile : false,
		    	isHiddenColumn : false,
		    	isDisabledButton : false,
		    	setname :'担保责任解除函',
		    	titleName :'担保责任解除函',
		    	tableName :'typeisdbzrjchsmj',
		    	uploadsSize :1,
		    	isHiddenOnlineButton :true,
		    	isDisabledOnlineButton :true
		    });
		
		this.formPanel = new Ext.form.FormPanel({
			frame:true,
			border : false,
			monitorValid : true,
			autoScroll : true,
			autoWidth:true,
			anchor : "100%",
			bodyStyle : 'padding-left:0px;padding-top:14px',
			items:[{
				xtype : 'fieldset',
				title : '机构基本信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'borrowingIntention',
				labelAlign : 'right',
				autoHeight : true,
				items : [this.InformationOfMechanismPanel]
			},{
				xtype : 'fieldset',
				title : '主联系人',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'housePropertyInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [this.primaryContactInformation]
			},{
				xtype : 'fieldset',
				title : '材料清单',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'vehicleInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [this.uploads]
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