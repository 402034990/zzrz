/**
 * 查看详情
 * @class SeeDetails
 * @extends Ext.Window
 */
SeeDetails = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		SeeDetails.superclass.constructor.call(this, {
			id : 'SeeDetails',
			title:'详情查看',
			//iconCls : 'menu-cusLinkman',
			iconCls : 'menu-person',
			layout : 'form',
			items : this.formPanel,
			modal : true,
			frame:true,
			autoScroll:true,
			autoHeight:true,
			width : 1000,
			//height:600,
			maximizable : true,
			frame:true,
			resizable:false,
			buttonAlign : 'center',
			buttons :[ {
				text : '关闭',
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
		//借款意向
		this.borrowingIntention = new BorrowingIntention();
		//历史沟通记录
		this.historicalCommunicationRecord = new HistoricalCommunicationRecord();
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
					this.customerInfo
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
					this.borrowingIntention
				]
			},{
				xtype : 'fieldset',
				title : '推荐产品',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'RecommendProduct',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					
				]
			},{
				xtype : 'fieldset',
				title : '历史沟通记录',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'historicalCommunicationRecord',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					this.historicalCommunicationRecord
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