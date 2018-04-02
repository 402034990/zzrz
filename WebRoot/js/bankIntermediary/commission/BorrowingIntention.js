/**
 * 借款意向
 * @class BorrowingIntention
 * @extends Ext.Panel
 */
BorrowingIntention = Ext.extend(Ext.Panel ,{
	layout : "form",
	autoHeight : true,
	constructor:function(_cfg){
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this,_cfg);
		this.initUIComponents();
		var labelWidth = 60;
		var readOnly=true;
		BorrowingIntention.superclass.constructor.call(this,{
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
				columnWidth : 0.33,
				layout : "form", 
				labelWidth : labelWidth,
				labelAlign : 'right',
				items:[{
					anchor : '100%',
					xtype : 'textfield',
					fieldLabel : '借款金额',
					readOnly : readOnly,
					name : '33'
				}]
			},{
				columnWidth : 0.33,
				layout : "form", 
				labelWidth : labelWidth,
				labelAlign :'right',
				items:[{
					anchor : '100%',
					xtype : 'textfield',
					fieldLabel : '借款期限',
					readOnly : readOnly,
					name : '33'
				}]
			},{
				columnWidth : 0.33,
				layout : "form", 
				labelWidth : labelWidth,
				labelAlign :'right',
				items:[{
					xtype : 'textfield',
					anchor : '100%',
					fieldLabel : '借款产品',
					readOnly : readOnly,
					name : '33'
				}]
			},{
				columnWidth : 0.33,
				layout : "form", 
				labelWidth : labelWidth,
				labelAlign :'right',
				items:[{
					xtype : 'textfield',
					anchor : '100%',
					fieldLabel : '用款时间',
					readOnly : readOnly,
					name : '33'
				}]
			},{
				columnWidth : 0.33,
				layout : "form", 
				labelWidth : labelWidth,
				labelAlign :'right',
				items:[{
					anchor : '100%',
					xtype : 'textfield',
					fieldLabel : '贷款方式',
					readOnly : readOnly,
					name : '33'
				}]
			},{
				columnWidth : 0.99,
				layout : 'form',
				defaults : {
					anchor : '100%'
				},
				labelWidth : labelWidth,
				items : [{
					fieldLabel : "备注说明",
					xtype : "textarea",
					name : '123',
					readOnly : readOnly,
					anchor : "100%"
				}]
			}
			
		]
				}]
		});
	},
	initUIComponents:function(){
	}
	
});