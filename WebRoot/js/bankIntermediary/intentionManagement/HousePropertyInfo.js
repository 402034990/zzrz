/**
 * 房产信息
 * @class HousePropertyInfo
 * @extends Ext.Panel
 */
HousePropertyInfo = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		HousePropertyInfo.superclass.constructor.call(this, {
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					labelWidth : 100
				},
				items : [{
					xtype : 'hidden',
					name : ''
				}, {
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						xtype : "combo",
						fieldLabel : "是否有房",
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'text',
						store : new Ext.data.SimpleStore({
							fields : ['value','text'],
							data : [['1','有'],['2','无']]
						}),
						triggerAction : "all",
						hiddenName : '',
						anchor : "100%"
					}]
				}, {
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						fieldLabel : "房产状态",
						xtype : "combo",
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'text',
						store : new Ext.data.SimpleStore({
							fields : ['value','text'],
							data : [['1','抵押中']]
						}),
						triggerAction : "all",
						hiddenName : '',
						anchor : "100%"
					}]
				}, {
					columnWidth : .29, 
					layout : "form", 
					labelWidth : 70,
					items : [{
						xtype : "textfield",
						fieldLabel : "月供额",
						name : "",
						anchor : "100%"
					}]
				},{
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						fieldLabel : "房屋性质",
						xtype : "combo",
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'text',
						store : new Ext.data.SimpleStore({
							fields : ['value','text'],
							data : [['1','商品房']]
						}),
						triggerAction : "all",
						hiddenName : '',
						anchor : "100%"
					}]
				},{
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						fieldLabel : "房屋类型",
						xtype : "combo",
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'text',
						store : new Ext.data.SimpleStore({
							fields : ['value','text'],
							data : [['1','住宅']]
						}),
						triggerAction : "all",
						hiddenName : '',
						anchor : "100%"
					}]
				},{
					columnWidth : .29,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						fieldLabel : "房产权属",
						xtype : "combo",
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'text',
						store : new Ext.data.SimpleStore({
							fields : ['value','text'],
							data : [['1','本人名下']]
						}),
						triggerAction : "all",
						hiddenName : '',
						anchor : "100%"
					}]
				},{
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						xtype : "textfield",
						fieldLabel : "楼盘名称",
						// allowBlank : false,
						name : "",
						anchor : "100%"
					}]
				},{
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						xtype : "textfield",
						fieldLabel : "房产面积",
						// allowBlank : false,
						name : "",
						anchor : "100%"
					}]
				},{
					columnWidth : .29,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						xtype : "textfield",
						fieldLabel : "房产所在地",
						// allowBlank : false,
						name : "",
						anchor : "100%"
					}]
				}]
			}]
		});
	}
});