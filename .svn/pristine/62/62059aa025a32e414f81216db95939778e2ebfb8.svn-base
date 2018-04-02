/**
 * 借款意向
 * @class borrowingIntention
 * @extends Ext.Panel
 */
borrowingIntention = Ext.extend(Ext.Panel ,{
	layout : "form",
	autoHeight : true,
	constructor:function(_cfg){
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this,_cfg);
		this.initUIComponents();
		borrowingIntention.superclass.constructor.call(this,{
		defaults : {
			anchor: '97%',
			autoHeight:true,
			border : true
		},
		items :[{
			layout : 'column',
			items:[{
				columnWidth : .45,
				layout : 'form',
				labelWidth : 75,
				defaults : {anchor : anchor},
				items : [{
					xtype : 'textfield',
					fieldLabel : '用款金额',
					name : 'resource.name',
					allowBlank : false,
					blankText : '必填信息'
				},{
					xtype : 'textfield',
					fieldLabel : '用款期限',
					name : 'resource.orderList',
					allowBlank : false,
					blankText : '必填信息'
				},{ 
					xtype : "combo",
					fieldLabel : "贷款产品",
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
					xtype : 'hidden',
					id : 'id_isSystem',
					name : 'resource.isSystem',
					value : false
				}]
			},{
				columnWidth : .05,
				layout : 'form',
				labelWidth : 75,
				defaults : {anchor : anchor},
				items : [{
					columnWidth : .03, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 10,
					items : [{
						fieldLabel : "<span style='margin-left:1px'>元</span> ",
						labelSeparator : '',
						anchor : "50%"
					}]
				},{
					columnWidth : .03, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 10,
					items : [{
						fieldLabel : "<span style='margin-left:1px'>月</span> ",
						labelSeparator : '',
						anchor : "50%"
					}]
				}]
			},{
				columnWidth : .485,
				layout : 'form',
				labelWidth : 75,
				defaults : {anchor : anchor},
				items : [{
						fieldLabel : "用款时间",
						xtype : 'datefield',
						editable:false,
						style : {
							imeMode : 'disabled'
						},
						format : 'Y-m-d',
						name : ''
					}, {
						fieldLabel : "贷款方式",
						xtype : "dickeycombo",
						hiddenName : '',
						displayField : 'itemName',
						nodeKey : 'customer_channel',
						emptyText : "请选择",
						editable : false,
						listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
											combox
													.setValue(combox
															.getValue());
											combox
													.clearInvalid();
										});
							}
						}
					},{
					xtype : 'hidden',
					id : 'id_parentId',
					name : 'resource.parent.id',
					disabled : false,
					value : 0
				}]
			},{
				columnWidth : 1,
				layout : 'form',
				labelWidth : 75,
				defaults : {anchor : anchor},
				items : [{
							fieldLabel : "备注说明",
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