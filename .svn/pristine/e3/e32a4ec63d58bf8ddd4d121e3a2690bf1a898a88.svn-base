/**
 * 社保和公积金
 * @class SocialSecurityFund
 * @extends Ext.Panel
 */
SocialSecurityFund = Ext.extend(Ext.Panel ,{
	layout : "form",
	autoHeight : true,
	constructor:function(_cfg){
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this,_cfg);
		this.initUIComponents();
		SocialSecurityFund.superclass.constructor.call(this,{
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
						},{
							columnWidth : .33,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth : 90,
							items : [{
								fieldLabel : "社保卡号",
								xtype : "textfield",
								name : '',
								anchor : "100%"
							}]
						},{
							columnWidth : .33,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth : 90,
							items : [{
								fieldLabel : "社保缴存基数",
								xtype : "textfield",
								name : '',
								anchor : "100%"
							}]
						},{
							columnWidth : .33,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth : 115,
							items : [{
								fieldLabel : "社保连续缴存时间",
								xtype : "textfield",
								name : '',
								anchor : "100%"
							}]
						},{
							columnWidth : .33,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth : 90,
							items : [{
								fieldLabel : "公积金卡号",
								xtype : "textfield",
								name : '',
								anchor : "100%"
							}]
						},{
							columnWidth : .33,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth : 90,
							items : [{
								fieldLabel : "公积金缴存基数",
								xtype : "textfield",
								name : '',
								anchor : "100%"
							}]
						},{
							columnWidth : .33,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth : 115,
							items : [{
								fieldLabel : "公积金连续缴存时间",
								xtype : "textfield",
								name : '',
								anchor : "100%"
							}]
						}]
				}]
		});
	},
	initUIComponents:function(){
	}
	
});