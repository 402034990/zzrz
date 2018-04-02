/**
 * 主联系人信息
 * @class primaryContactInformation.js
 * @extends Ext.Panel
 */
primaryContactInformation = Ext.extend(Ext.Panel ,{
	layout : "form",
	autoHeight : true,
	constructor:function(_cfg){
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this,_cfg);
		this.initUIComponents();
		primaryContactInformation.superclass.constructor.call(this,{
		defaults : {
			anchor: '100%',
			autoHeight:true,
			border : true
		},
		items :[{
			layout : 'column',
			items : [{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 110,
				defaults : {anchor : anchor},
				items : [{
					xtype : 'textfield',
					fieldLabel : '联系人',
					name : 'resource.orderList',
					allowBlank : false,
					blankText : '必填信息'
				},{
					xtype : 'textfield',
					fieldLabel : '联系人电话',
					name : 'resource.orderList',
					allowBlank : false,
					blankText : '必填信息'
				},{
					xtype : 'textfield',
					fieldLabel : '联系人邮箱',
					name : 'resource.orderList',
					allowBlank : false,
					blankText : '必填信息'
				}]
			},{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 110,
				defaults : {anchor : anchor},
				items : [{ 
						xtype : "combo",
						fieldLabel : "性别",
						allowBlank : false,
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'text',
						store : new Ext.data.SimpleStore({
							fields : ['value','text'],
							data : [['1','男'],['2','女'],['3','其他']]
						}),
						triggerAction : "all",
						hiddenName : ''
					},{
					xtype : 'textfield',
					fieldLabel : '称谓',
					name : 'resource.orderList',
					allowBlank : true,
					blankText : '必填信息'
				},{
					xtype : 'textfield',
					fieldLabel : '身份证号码',
					name : 'resource.orderList',
					allowBlank : false
				}]
			}]
		}]

		});
	},
	initUIComponents:function(){
	}
	
});