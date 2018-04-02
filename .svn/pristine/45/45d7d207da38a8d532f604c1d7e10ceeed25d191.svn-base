/**
 * 客户查询
 * @class IntentionCustomerQuery
 * @extends Ext.Window
 */
CustomerQuery = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		CustomerQuery.superclass.constructor.call(this, {
			id : 'CustomerQuery',
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
			title : '客户查询',
			iconCls : 'menu-person',
			buttonAlign : 'center'
		});
	},
	initComponents : function() {
		//客户基本信息
		var customerInfo = new CustomerInfo({
			isHiddenCustomerSource:true,//是否隐藏客户来源
			isHiddenTelephone:true //是否隐藏联系电话
		});
		//借款意向信息
		var borrowingIntentionInfo = new BorrowingIntentionInfo();
		//借款项目信息
		var loanItemInfo = new LoanItemInfo();
		//沟通记录信息
		var communicationRecordInfo = new CommunicationRecordInfo();
		this.formPanel = new Ext.form.FormPanel({
			//id : "",
			frame:true,
			border : false,
			monitorValid : true,
			autoScroll : true,
			anchor : "100%",
			bodyStyle : 'padding-left:0px;padding-top:14px',
			items:[/*{
				xtype : 'fieldset',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				labelAlign : 'right',
				autoHeight : true,
				items : [{
					id:'button2',
					xtype:'button',
           	 		border: true, 
           	 		text: '贷款产品',
           	 		scale: "large"
           	 		//handler:
				}]
			},*/{
				xtype : 'fieldset',
				title : '沟通内容',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				labelAlign : 'right',
				autoHeight : true,
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
					items:[{ 
						layout : "form", 
						labelWidth : 70,
						columnWidth : .8,
						items:[{
							 xtype:"textarea",  
		                    fieldLabel: '沟通内容',  
		                    anchor : "100%"
						}]
                    },{  
                    	layout : "form", 
						labelWidth : 70,
						columnWidth : .2,
						style : 'margin-top:10px;padding-top:10px;padding-left:20',
						//bodyStyle : 'padding-left: 0px;text-align:left;',
						items:[{
		                    xtype:"button",  
		                    text: '保存', 
		                    anchor : "10%"
		                    //handler:
						}]
                    }]
				}]
			},{
				xtype : 'fieldset',
				title : '借款客户信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'customerInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					customerInfo
				]
			}/*,{
				xtype : 'fieldset',
				title : '借款意向信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'borrowingIntentionInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					borrowingIntentionInfo
				]
			},{
				xtype : 'fieldset',
				title : '借款项目信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'loanItemInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					loanItemInfo
				]
			},{
				xtype : 'fieldset',
				title : '沟通记录信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'communicationRecordInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					communicationRecordInfo
				]
			}*/]
		});
	}
});