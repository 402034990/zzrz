 /**
  * 查看借款意向
  * @class seeBorrowingIntentionsWindow
  * @extends Ext.Window
  */
seeBorrowingIntentionsWindow = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		seeBorrowingIntentionsWindow.superclass.constructor.call(this, {
			id : 'seeBorrowingIntentionsWindow',
			title:'查看借款意向',
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
		//客户基本信息
		this.customerInfo = new CustomerInfo({
			isHiddenCustomerSource:false,//是否隐藏客户来源
			isHiddenTelephone:false, //是否隐藏联系电话
			isHiddenSeeDetails:true,//是否隐藏查看详情按钮
			isHiddenFile:true, //是否异常客户建档按钮
			isHiddenMerger:true//是否隐藏客户合并按钮
		});
		//车辆信息
		this.vehicleInfo = new VehicleInfo();
		//借款意向
		this.borrowingIntention = new borrowingIntention();
		//房产信息
		this.housePropertyInfo = new HousePropertyInfo();
		//社保信息
		this.socialSecurityInfo = new SocialSecurityInfo();
		//保单信息
		this.policyInfo = new PolicyInfo();
		//公积金信息
		this.housingFundInfo = new HousingFundInfo();
		
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
				title : '借款意向',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'borrowingIntention',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					this.borrowingIntention
				]
			},{
				xtype : 'fieldset',
				title : '房产信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'housePropertyInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					this.housePropertyInfo
				]
			},{
				xtype : 'fieldset',
				title : '车辆信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'vehicleInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					this.vehicleInfo
				]
			},{
				xtype : 'fieldset',
				title : '保单信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'policyInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					this.policyInfo
				]
			},{
				xtype : 'fieldset',
				title : '公积金信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'socialSecurityInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					this.housingFundInfo
				]
			},{
				xtype : 'fieldset',
				title : '社保信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'socialSecurityInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					this.socialSecurityInfo
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