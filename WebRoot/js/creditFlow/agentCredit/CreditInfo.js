CreditInfo = Ext.extend(Ext.Panel ,{
	layout : "form",
	autoHeight : true,
	isAllReadOnly : this.isAllReadOnly,
	disALLabled : this.disALLabled,
	isDiligenceReadOnly : true,
	dltcCustom:false,
	constructor:function(_cfg){
		if (_cfg == null) {
			_cfg = {};
		}
		if (_cfg.isAllReadOnly) {
			this.isAllReadOnly = _cfg.isAllReadOnly;
			this.isDiligenceReadOnly=false;
		}
		if (_cfg.isDiligenceReadOnly) {
			this.isDiligenceReadOnly = _cfg.isDiligenceReadOnly;
		}
		if (_cfg.dltcCustom) {
			this.dltcCustom = _cfg.dltcCustom;
		}else if(App.isCustomized4DLTC()){
			this.dltcCustom = true;
		}
		Ext.applyIf(this,_cfg);
		this.initUIComponents();
		CreditInfo.superclass.constructor.call(this,{
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
							name : 'agentAproval.id'
						},{
							columnWidth : 1,
							layout : 'column',
							items :[{
							columnWidth : .3,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth :  90,
							items : [ {
									fieldLabel : '授信额度',
									xtype : 'numberfield',
									readOnly : this.isAllReadOnly,
									allowBlank : true,
									anchor:'100%',
									name : 'agentAproval.approvalMoney',
									maxLength : 50
							}]
						},{
							columnWidth : .03, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 22,
							items : [{
								fieldLabel : "<span style='margin-left:1px'>元</span> ",
								labelSeparator : '',
								anchor : "50%"
							}]
						},{
							columnWidth : .3,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth :  90,
							items : [ {
									fieldLabel : '保证金比例',
									xtype : 'numberfield',
									readOnly :this.isDiligenceReadOnly,
									readOnly : true,
									allowBlank : true,
									anchor:'100%',
									name : 'agentAproval.securityDeposit',
									maxLength : 50
							}]
						},{
							columnWidth : .03, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 11,
							items : [{
								fieldLabel : "<span style='margin-left:1px'>%</span> ",
								labelSeparator : '',
								anchor : "100%"
							}]
						}]
						},{
							columnWidth : .3,
							layout : 'form',
							labelWidth : 90,
							items : [{
								fieldLabel :"授信方式",
								xtype : "dickeycombo",
								hiddenName : 'agentAproval.approvalType',
								displayField : 'itemName',
								readOnly : this.isAllReadOnly,
								nodeKey : 'sxfs',
								emptyText : "请选择",
								editable :false,
								anchor : "100%",
								//allowBlank:false,
								listeners : {
									afterrender : function(combox) {
										var st = combox.getStore();
										st.on("load", function() {
											combox.setValue(combox.getValue());
											combox.clearInvalid();
										})
									}
		
								}
							}]
						},{
							columnWidth : .33,
							layout : 'form',
							labelWidth : 123,
							items : [{
								fieldLabel : '授信有效期',
								readOnly :this.isDiligenceReadOnly,
								readOnly : this.isAllReadOnly,
								//allowBlank : false,
								xtype : 'datefield',
								style : {
									imeMode : 'disabled'
								},
								format : 'Y-m-d',
								anchor:'100%',
								name : 'agentAproval.startApprovalTime'
							}]
						},{
							columnWidth : .3,
							layout : 'form',
							labelWidth : 35,
							items : [{
								fieldLabel : '至',
								readOnly :this.isDiligenceReadOnly,
								readOnly : this.isAllReadOnly,
								//allowBlank : false,
								xtype : 'datefield',
								style : {
									imeMode : 'disabled'
								},
								format : 'Y-m-d',
								anchor:'100%',
								name : 'agentAproval.endApprovalTime'
							}]
						}]
				}]
		});
	},
	initUIComponents:function(){
	}
	
});