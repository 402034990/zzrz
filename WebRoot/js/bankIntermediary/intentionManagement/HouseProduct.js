/**
 * 房产品
 * @class SeeHouseProduct
 * @extends Ext.Window
 */
HouseProduct = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		HouseProduct.superclass.constructor.call(this, {
			id : 'HouseProduct',
			title:'房产品信息',
			//iconCls : 'menu-cusLinkman',
			iconCls : 'menu-person',
			layout : 'form',
			items : this.formPanel,
			modal : true,
			frame:true,
			autoScroll:true,
			autoHeight:true,
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
		var customerInfo = new CustomerInfo({
			isHiddenCustomerSource:false,//是否隐藏客户来源
			isHiddenTelephone:false, //是否隐藏联系电话
			isHiddenSeeDetails:true,//是否隐藏查看详情按钮
			isHiddenFile:true, //是否异常客户建档按钮
			isHiddenMerger:true//是否隐藏客户合并按钮
		});
		//借款意向
		var borrowingIntention = new BorrowingIntention();
		//事业信息
		var careerInfo = new CareerInfo();
		//房产信息
		var housePropertyInfo = new HousePropertyInfo();
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
				title : '客户基本信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'customerBaseInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					customerInfo
				]
			},{
				xtype : 'fieldset',
				title : '事业信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'careerInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					careerInfo
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
					housePropertyInfo
				]
			},{
				xtype : 'fieldset',
				title : '借款意向',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'borrowingIntention',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					borrowingIntention
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