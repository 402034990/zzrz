/**
 * 车辆信息
 * @class VehicleInfo
 * @extends Ext.Panel
 */
VehicleInfo = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		VehicleInfo.superclass.constructor.call(this, {
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
						fieldLabel : "是否有车",
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
						fieldLabel : "车辆品牌",
						xtype : "textfield",
						name : "",
						anchor : "100%"
					}]
				}, {
					columnWidth : .29, 
					layout : "form", 
					labelWidth : 70,
					items : [{
						xtype : "datefield",
						fieldLabel : "购买年份",
						// allowBlank : false,
						editable : false,
						format : 'Y-m-d',
						name : "",
						anchor : "100%"
					}]
				},{
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						fieldLabel : "已开公里数",
						xtype : "textfield",
						name : "",
						anchor : "100%"
					}]
				},{
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						fieldLabel : "裸车价格",
						xtype : "textfield",
						name : "",
						anchor : "100%"
					}]
				},{
					columnWidth : .29,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						fieldLabel : "车辆产权属",
						xtype : "combo",
						mode : 'local',
						valueField : 'value',
						editable : false,
						displayField : 'text',
						store : new Ext.data.SimpleStore({
							fields : ['value','text'],
							data : [['1','本人名下'],['2','公司']]
						}),
						triggerAction : "all",
						hiddenName : '',
						anchor : "100%"
					}]
				}]
			}]
		});
	}
});