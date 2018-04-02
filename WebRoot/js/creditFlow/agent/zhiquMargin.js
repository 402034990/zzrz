zhiquMargin=Ext.extend(Ext.Window, {
	operateGrid:null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		if (typeof(_cfg.id) != "undefined") {
			this.id = _cfg.id;
		}
		//保证金支出类型 2 
		if (typeof(_cfg.type) != "undefined") {
			this.type = _cfg.type;
		}
		 
		this.initUIComponents();
		CreateMargin.superclass.constructor.call(this, {
					layout : 'fit',
					items : [this.formPanel],
					modal : true,
					id : 'CreateMarginWin',
					height:400,
					width : 900,
					frame:true,
					maximizable : true,
					title : "保证金支取",
					buttonAlign : 'center',
					buttons : [{
						text : '提交',
						iconCls : 'btn-save',
						scope : this,
						handler : this.save
					}, {
						text : '重置',
						iconCls : 'btn-reset',
						scope : this,
						handler : this.reset
					}, {
						text : '取消',
						iconCls : 'btn-cancel',
						scope : this,
						handler : this.cancel
					}]
				});
	},
	
	initUIComponents : function() {
		var pertitle="基本信息";
		this.formPanel = new Ext.FormPanel({
		     frame:true,
		    items : [{
				xtype : 'fieldset',
				title : pertitle,
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				id : 'person',
				border : false,
				name : 'customerInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [{
				columnWidth : 1,
				layout : "form",
				style : 'padding-left:17px',
				scope : this,
				items : [{
					layout : "form", 
					xtype : 'fieldset',
					title : '客户基本信息',
					items : [{
						layout : "column",
						defaults : {
							anchor : '100%',
							isFormField : true,
							labelWidth : 75
						},
						items : [{
									xtype : 'hidden',
									name : 'cashDeposit.type',
									value:this.type
								},{
									xtype : 'hidden',
									name : 'cashDeposit.id'
								},{
									xtype:'hidden',
									name:'cashDeposit.cashzhanyong'
								},{
								   xtype:'hidden',
								   name:'cashDeposit.cashshengyu'
								},{
									xtype : 'hidden',
									name : 'person.id'
								}, {
									columnWidth : 1, 
									layout : "form", 
									labelWidth : 85,
									items : [{
										xtype : "textfield",
										fieldLabel : "客户名称",
										name : "cashDeposit.custormerName",
                                        allowBlank : false,
                                        readOnly:true,
										editable:false,
										blankText : "客户名称不能为空，请正确填写!",
										anchor : "100%",
									    resizable : true
									}]
								},
								{
									columnWidth : .5, 
									layout : "form", 
									labelWidth : 85,
									items : [{
										fieldLabel : "客户编号",
										readOnly:true,
										xtype:'textfield',
										name:'cashDeposit.custormerNum',
										itemName : '客户编号', 
										allowBlank : false,
									    editable : false,
									    anchor : "100%"
									}]
								}, {
									columnWidth : .5, 
									layout : "form", 
									labelWidth : 85,
									items : [{
										xtype : "textfield",
										name:'cashDeposit.cashMobilphone',
										fieldLabel : "手机号码",
									    allowBlank : false,
									    readOnly:true,
										editable : false,
									    anchor : "100%"
									}]
								}, {
									columnWidth : .5, 
									layout : "form", 
									labelWidth : 85,
									items : [{
										xtype:'textfield',
									    name:'cashDeposit.cashName',
										fieldLabel : "保证金账户名",
										allowBlank : false,
										editable : false,
										readOnly:true,
									    anchor : "100%"
									}]
								}, {
									columnWidth : .4, 
									layout : "form",
									labelWidth : 85,
									items : [{
										xtype : "textfield",
										name : "cashDeposit.cashrate",
										allowBlank : false,
										readOnly:true,
										fieldLabel : "保证金比例",
									    anchor : "100%"
									}]
								}, {
										columnWidth : .06, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										defaults : {
											anchor : anchor
										},
										labelWidth :10,
										items : [{
											fieldLabel : "%",
											labelSeparator : ''
										}]
								}, {
									columnWidth : .5, 
									layout : "form", 
									labelWidth : 85,
									items : [{
										xtype : "textfield",
										fieldLabel : "开户人",
										name : "cashDeposit.cashCount",
										allowBlank : false,
										readOnly :true,
										anchor : "100%"
									}]
								}]
					}]
				}]
			}, {
				columnWidth : 1, 
				layout : "form", 
				style : 'padding-left:17px',
				hidden : this.isHidden,
				items : [{
					layout : "form", 
					xtype : 'fieldset',
					title : '保证金',
					items : [{
						layout : "column",
						defaults : {
							anchor : '95%',
							columnWidth : 1,
							isFormField : true,
							labelWidth : 85
						},
						items : [{
							columnWidth : 0.27,
							layout : "form", 
							labelWidth : 85,
							items : [{
							   xtype:"textfield",
							   mode:'local',
							   anchor:'100%',
							   allowBlank : false,
							   name:'cashDetail.cashmoney',
							   fieldLabel : '支取金额',
							   listeners : {
									"change" : function(com, checked){
										var  shengyuMoney = this.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.getCmpByName('cashDeposit.cashshengyu').getValue();
										var zhiquMoney = com.getValue();
										if(shengyuMoney*1<zhiquMoney*1){
											Ext.ux.Toast.msg('操作信息', '保证金的支取金额不能大于保证金的剩余金额');
											com.setValue("");
										}
									}
								}
							  }]
						},{
							columnWidth : .06, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							defaults : {
								anchor : anchor
							},
							border:false,
							labelWidth :10,
							items : [{
								border:false,
								fieldLabel : "元",
								labelSeparator : ''
							}]
						}, {
							columnWidth : 0.33, 
							layout : "form", 
							labelWidth : 85,
							items : [{
							     xtype:'datefield',
							     allowBlank : false,
							     name:'cashDetail.createDate',
							     mode:'local',
							     format: 'Y-m-d',
							     fieldLabel:'计划支取日期',
							     value: new Date()
							 }]
						}, {
										columnWidth : .33, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 70,
										items : [{
											xtype : "combo",
											triggerClass : 'x-form-search-trigger',
											hiddenName : "cashDetail.oprateName",
											editable : false,
											fieldLabel :  "操作人" ,
											blankText : "操作人不能为空，请正确填写!",
											allowBlank : false,
//											readOnly : this.isAllReadOnly,
											anchor : "100%",
											listeners : {
												scope : this,
												// 设置默认用户
												'afterRender' : function(combo) {
													this.getCmpByName('cashDetail.oprateName')
															.setValue(currentUserFullName);
													this.getCmpByName('cashDetail.oprateNameId')
															.setValue(currentUserId);
												}
											},
											onTriggerClick : function(cc) {
												var obj = this;
												var appuerIdObj = obj.nextSibling();
												var userIds = appuerIdObj.getValue();
												if (null == obj.getValue() || "" == obj.getValue()) {
													userIds = "";
												}
												new UserDialog({
															userIds : userIds,
															userName : obj.getValue(),
															single : false,
															type : 'branch',
															title : "选择项目经理",
															callback : function(uId, uname) {
																obj.setValue(uname);
																// obj.setRawValue(uname);
																appuerIdObj.setValue(uId);
															}
														}).show();
					
											}
										}, {
											xtype : "hidden",
											name : "cashDetail.oprateNameId"
										}]
								
						}]
					}]
				}]
			}]
				 }]
		});
		
		if (this.id != null && this.id != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath	+ '/entityhbm/getCashDep.do?id='+ this.id,
				root : 'data',
				preName : 'cashDeposit'
			});
		}

	},

	/**
	 * 重置
	 * @param {} formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * @param {} window
	 */
	cancel : function() {
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
	    var  cashmoney =  this.getCmpByName('cashDetail.cashmoney').getValue();//缴纳保证金时间
		var  createDate =  this.getCmpByName('cashDetail.createDate').getValue();//缴纳保证金时间、
		var  oprateName =  this.getCmpByName('cashDetail.oprateName').getValue();//缴纳保证金时间、
		 
		 
		 if(cashmoney=="" ||　cashmoney==null){
		 	Ext.ux.Toast .msg('警告', '支取金额不能为空');
			return;
		 }
		 if(createDate=="" ||　createDate==null){
		 	Ext.ux.Toast .msg('警告', '支取日期不能为空');
			return;
		 }
		 if(oprateName=="" ||　oprateName==null){
		 	Ext.ux.Toast .msg('警告', '操作人不能为空');
			return;
		 }
	    this.formPanel.getForm().submit({
			    clientValidation: true, 
				url : __ctxPath+ '/entityhbm/saveDetailCashDep.do',
				method : 'post',
				waitMsg : '数据正在提交，请稍后...',
				scope: this,
				success : function(fp, action) {
					Ext.getCmp('PlProjectArchivesGrid').getStore().reload();
					Ext.ux.Toast.msg('操作信息', '支取申请成功,请手动进行对账!');
					Ext.getCmp('CreateMarginWin').close();
	//				var obj = Ext.util.JSON.decode(action.response.responseText)
	//				Ext.getCmp('plManageMoneyPlan.mmplanId').setValue(obj.id)
	//		        Ext.getCmp('plManageMoneyPlan.mmplanId').getValue();
				}
		});
				
	  }
				
				

});