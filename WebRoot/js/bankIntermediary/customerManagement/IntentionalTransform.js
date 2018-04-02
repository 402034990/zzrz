/**
 * 意向转化
 * @class IntentionalTransform
 * @extends Ext.Panel
 */
IntentionalTransform = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',

	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		IntentionalTransform.superclass.constructor.call(this, {
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
				items : [{
					xtype : 'hidden',
					name : ''
				}, {
					columnWidth : .5, 
					layout : "form", 
					labelWidth : 70,
					items : [{
						xtype : 'combo',
						fieldLabel : "转换类型",
						name : "",
						editable : false,
						displayField: 'exchangeType',
						valueField: 'id',
						store: new Ext.data.ArrayStore({
               				 fields: ['id', 'exchangeType'],
                	 		 data: [[1, '不转化(意向客户)'], [2, '转接(意向客户)'], [3, '排除(排除客户)'],[3, '正式(正式客户)']]
           				 }),
						//blankText : "转换类型不能为空，请正确填写!",
						anchor : "100%",
						mode : 'local',
						triggerAction : 'all',
						value:2
					}]
				}, {
					columnWidth : .45, 
					layout : "form", 
					labelWidth : 70,
					items : [{
						xtype : 'combo',
						fieldLabel : "标记",
						name : "",
						editable : false,
						displayField: 'sign',
						valueField: 'id',
						store: new Ext.data.ArrayStore({
               				 fields: ['id', 'sign'],
                	 		 data: [[1, '骚扰'], [2, '诈骗'], [3, '推销']]
           				 }),
						//blankText : "标记不能为空，请正确填写!",
						anchor : "100%",
						mode : 'local',
						triggerAction : 'all',
						value:1
					}]
				}, {					
					columnWidth : .5, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 70,
					items : [{
						xtype : "combo",
						triggerClass : 'x-form-search-trigger',
						hiddenName : "",
						editable : false,
						fieldLabel : "金融顾问",
						blankText : "金融顾问不能为空，请正确填写!",
						allowBlank : false,
						// readOnly : this.isAllReadOnly,
						anchor : "100%",
						listeners : {
							scope : this,
							// 设置默认用户
							'afterRender' : function(combo) {
								
							}
						},
						onTriggerClick : function(cc) {
							/*new UserDialog({
								single : false,
								type : 'branch',
								title : "选择金融顾问",
								callback : function(uId, uname) {
									obj.setValue(uname);
									// obj.setRawValue(uname);
								}
							}).show();*/
							new FinancialAdviser().show();
						}
					}]
				}, {
					columnWidth : 1,
					layout : "form", 
					labelWidth : 70,
					items : [{ 
						xtype : "textarea",
						fieldLabel : "原因说明",
						//allowBlank : false,
						name : "",
						anchor : "95%"
					}]
				}]
			}]
		});
	}
});