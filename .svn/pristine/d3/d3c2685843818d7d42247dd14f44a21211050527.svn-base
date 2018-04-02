ExamineForm = Ext.extend(Ext.Panel ,{
	layout : "form",
	autoHeight : true,
	isReadOnly:false,
	constructor:function(_cfg){
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.isReadOnly) != "undefined") {
			this.isReadOnly = _cfg.isReadOnly;
		}
		Ext.applyIf(this,_cfg);
		this.initUIComponents();
		ExamineForm.superclass.constructor.call(this,{
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
				items : [{},{
							xtype : 'hidden',
							name : 'bpMoneyBorrowDemand.projectID'
						},{
							columnWidth : .2,
							layout : 'form',
							defaults : {
								anchor : '100%'
							},
							labelWidth : 85,
							items : [{
								fieldLabel : '风控终审金额',
								xtype : 'textfield',
								allowBlank :false,
								readOnly:this.isReadOnly,
								name : 'projectMoney2',
								anchor : '90%',
								unitText : '元',
								listeners : {
									scope : this,
									'change' : function(nf) {
										var value = nf.getValue();
										var projectMoney=Number(this.getOriginalContainer().getCmpByName('projectMoney1').getValue());
										if(value>projectMoney){
											Ext.ux.Toast.msg('操作信息', '审批金额不能超过贷款金额!');
											nf.setValue();
											nf.focus();
										}else{
											nf.setValue(Ext.util.Format.number(value, '0,000.00'));
											this.getCmpByName("slSmallloanProject.secondProjectMoney").setValue(value);
											this.getOriginalContainer().getCmpByName('comments').setValue("本次审批金额："+nf.getValue());
										}
									}
								}
							
							},{
								xtype : "hidden",
								name : "slSmallloanProject.secondProjectMoney"
							}]
						}]
				}]
		});
	},
	initUIComponents:function(){
	}
});