/**
 * 客户跟进
 * @class CustomerFollowView
 * @extends Ext.Window
 */
CustomerFollowView = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		CustomerFollowView.superclass.constructor.call(this, {
			id : 'CustomerFollowView',
			title:'客户跟进',
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
		//客户基本信息
		this.customerInfo = new CustomerInfo({
			isHiddenCustomerSource:false,//是否隐藏客户来源
			isHiddenTelephone:false, //是否隐藏联系电话
			isHiddenSeeDetails:true,//是否隐藏查看详情按钮
			isHiddenFile:true, //是否异常客户建档按钮
			isHiddenMerger:true,//是否隐藏客户合并按钮
			isHiddenFileInfo:false//是否隐藏客户档案按钮
		});
		//借款意向
		this.borrowingIntention = new BorrowingIntention();
		//历史沟通记录
		this.historicalCommunicationRecord = new HistoricalCommunicationRecord();
		//本次应沟通内容
		this.theCommunicationContent = new TheCommunicationContent();
		//沟通记录
		this.communicationRecordPanel = new CommunicationRecordPanel();
		//下次跟进设置
		this.nextFollowSettingPanel = new NextFollowSettingPanel();
		this.formPanel = new Ext.form.FormPanel({
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
				title : '历史沟通记录',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'historicalCommunicationRecord',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					this.historicalCommunicationRecord
				]
			},{
				xtype : 'fieldset',
				title : '本次应沟通内容',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'theCommunicationContent',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					this.theCommunicationContent
				]
			},{
				xtype : 'fieldset',
				title : '沟通记录',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'communicationRecordPanel',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					this.communicationRecordPanel
				]
			},{
				xtype : 'fieldset',
				title : '下次跟进设置',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'nextFollowSettingPanel',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					this.nextFollowSettingPanel
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