/**
 * 	机构基本信息
 * @class InformationOfMechanismPanel
 * @extends Ext.Panel
 */
InformationOfMechanismPanel = Ext.extend(Ext.Panel ,{
	layout : "form",
	autoHeight : true,
	constructor:function(_cfg){
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this,_cfg);
		this.initUIComponents();
		InformationOfMechanismPanel.superclass.constructor.call(this,{
		defaults : {
			anchor: '100%',
			autoHeight:true,
			border : true
		},
		items :[{
			layout : 'column',
			items : [{
					columnWidth : 1,
					layout : 'form',
					labelWidth : 110,
					defaults : {
						anchor : '98.5%'
					},
					items : [{
							xtype : 'textfield',
							fieldLabel : '机构名称',
							name : 'resource.name',
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
						fieldLabel : "机构类型",
						allowBlank : false,
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'text',
						store : new Ext.data.SimpleStore({
									fields : ['value', 'text'],
									data : [['1', '类型001'],
											['2', '类型002']]
								}),
						triggerAction : "all",
						hiddenName : ''
					},{
					xtype : 'textfield',
					fieldLabel : '营业执照号码',
					name : 'resource.orderList',
					allowBlank : false,
					blankText : '必填信息'
				},{
					xtype : 'textfield',
					fieldLabel : '公司电话',
					name : 'resource.orderList',
					allowBlank : true,
					blankText : '必填信息'
				},{
					xtype : 'textfield',
					fieldLabel : '注册资本金',
					name : 'resource.orderList',
					allowBlank : true,
					blankText : '必填信息'
				},{
					fieldLabel : "合作公司开始时间",
					allowBlank : true,
					xtype : 'datefield',
					editable:false,
					style : {
						imeMode : 'disabled'
					},
					format : 'Y-m-d',
					name : ''
				},{
					xtype : "combo",
					fieldLabel : "渠道佣金类型",
					allowBlank : false,
					mode : 'local',
					valueField : 'value',
					editable : false,
					displayField : 'text',
					store : new Ext.data.SimpleStore({
								fields : ['value', 'text'],
								data : [['1', '类型001'],
										['2', '类型002']]
							}),
					triggerAction : "all",
					hiddenName : ''
				}]
			},{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 110,
				defaults : {anchor : anchor},
				items : [{ 
						xtype : "combo",
						fieldLabel : "机构来源",
						allowBlank : false,
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'text',
						store : new Ext.data.SimpleStore({
							fields : ['value','text'],
							data : [['1','产品001'],['2','产品002']]
						}),
						triggerAction : "all",
						hiddenName : ''
					},{
					xtype : 'textfield',
					fieldLabel : '组织机构号码',
					name : 'resource.orderList',
					allowBlank : false,
					blankText : '必填信息'
				},{
					xtype : 'textfield',
					fieldLabel : '传真',
					name : 'resource.orderList',
					allowBlank : true
				},{
					fieldLabel : "公司成立时间",
					allowBlank : true,
					xtype : 'datefield',
					editable:false,
					style : {
						imeMode : 'disabled'
					},
					format : 'Y-m-d',
					name : ''
				},{
					xtype : 'textfield',
					fieldLabel : '公司地址',
					name : 'resource.orderList',
					allowBlank : true
				},{
					xtype : 'textfield',
					fieldLabel : '渠道佣金利率',
					name : 'resource.orderList',
					allowBlank : false,
					blankText : '必填信息'
				}]
			},{
				columnWidth : 1,
				layout : 'form',
				labelWidth : 110,
				defaults : {
							anchor : '98.5%'
						   },
				items : [{
							fieldLabel : "公司简介",
							xtype : "textarea",
							name : ''
						}]
			}]
		}]

		});
	},
	initUIComponents:function(){
	}
	
});