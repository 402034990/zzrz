/**
 * @author
 * @createtime
 * @class AccountSumForm
 * @extends Ext.Window
 * @description SlCreditReportForm表单
 * @company 互融软件
 */
AccountSumForm = Ext.extend(Ext.Window, {
	// 构造函数
	gridPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		if(typeof(_cfg.gridPanel)!='undefined'){
			this.gridPanel = _cfg.gridPanel;
		}
		// 必须先初始化组件
		this.initUIComponents();
		AccountSumForm.superclass.constructor.call(this, {
					id : 'AccountSumForm',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 350,
					width : 650,
					maximizable : true,
					title : '财务汇总录入',
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								hidden:this.readOnly,
								handler : this.save
							},/*
								 * { text : '重置', iconCls : 'btn-reset', scope :
								 * this, handler : this.reset },
								 */{
								text : this.readOnly==true?'关闭':'取消',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			        bodyStyle : 'padding:10px 10px 10px 0',
					layout : 'form',
					autoScroll : true,
					frame : true,
					anchor : '100%',
					labelAlign : 'right',
					defaults : {
						anchor : '96%',
						labelWidth : 80
					},
					// id : 'CsCooperationEnterpriseForm',
					items : [{
								columnWidth : 1,
								layout : 'form',
								labelWidth : 80,
								labelAlign : 'right',
								border : false,
								items : [
										{
											layout : "column",
											border : false,
											scope : this,
											items:[
												{
													name : 'bpCustEntAccountSum.id',
													xtype : 'hidden',
													value:this.id
												},
												{
													name : 'bpCustEntAccountSum.indexId',
													xtype : 'hidden',
													value:this.indexId
												},
												{
													name : 'bpCustEntAccountSum.createrId',
													xtype : 'hidden',
													value:currentUserId
												},
											   {
													columnWidth :.46,
													layout : 'form',
													labelWidth : 80,
													labelAlign : 'right',
													border : false,
													items : [{
													xtype : "combo",
													anchor : "100%",
													hiddenName : "bpCustEntAccountSum.keyId",
													displayField : 'itemName',
													valueField : 'itemId',
													triggerAction : 'all',
													allowBlank : false,
													editable:false,
													readOnly : this.readOnly,
													disable : true,
													store : new Ext.data.SimpleStore({
															autoLoad : true,
															url :  __ctxPath+ '/creditFlow/customer/enterprise/getClassNameJsonBpDicAccountTitle.do',
																  fields : ['itemId', 'itemName']
															}),
															fieldLabel : "一级科目类别",
															blankText : "一级科目类别不能为空，请正确填写!",
															listeners : {
																	afterrender : function(combox) {
																		var st = combox.getStore();
																		st.on("load", function() {
																		    combox.setValue(combox
																					.getValue());
																			combox.clearInvalid();
																			var v = combox.lastSelectionText;
																			combox.fireEvent("select",combox, v, null);
																		})
						                                   },
																	select : function(combox, record, index) {
																		var opr_obj = this.ownerCt.ownerCt.getCmpByName('bpCustEntAccountSum.keyName');
																		var v='';
																		if(index==null){
																		 v=record
																		}else{
																		  v = record.data.itemName;
																		  opr_obj.clearValue();
																		}
																		  opr_obj.getStore().baseParams.className=v;
																		  opr_obj.getStore().load();
																	}
																}
															}]
												},{
							                            columnWidth : .04, // 该列在整行中所占的百分比
							                            layout : "form", // 从上往下的布局
							                            labelWidth : 20,
							                            items : [{
										                fieldLabel : " ",
										                labelSeparator : '',
										                anchor : "100%"
									                   }]
						                       },{
													columnWidth :.46,
													layout : 'form',
													labelWidth : 110,
													labelAlign : 'right',
													border : false,
													items : [{
													fieldLabel : "一级科目名称",
													xtype : "combo",
													readOnly : this.readOnly,
													allowBlank : false,
													displayField : 'itemName',
													valueField : 'itemId',
													triggerAction : 'all',
													mode : 'remote',
													disable : true,
													hiddenName : "bpCustEntAccountSum.keyName",
													editable : false,
													blankText : "一级科目名称不能为空，请正确填写!",
													anchor : "100%",
													store : new Ext.data.ArrayStore({
														url : __ctxPath+ '/creditFlow/customer/enterprise/getTitleJsonBpDicAccountTitle.do',
														fields : ['itemId','itemName'],
														autoLoad:true,
														baseParams : {
															className : ""
														}
													}),
													listeners : {
														scope : this,
														select : function(combox, record, index) {
														   v = record.data.itemName;
														   this.getCmpByName("bpCustEntAccountSum.title").setValue(v);
														},
														afterrender : function(combox) {
														var st = combox.getStore();
														st.on("load", function() {
																		combox.setValue(combox
																					.getValue());
																			combox.clearInvalid();
																		
																	})
									                  }
													}
												},{
					                                     xtype : "hidden",
						                                 name : "bpCustEntAccountSum.title"
					                                  }]
												},{
							                            columnWidth : .04, // 该列在整行中所占的百分比
							                            layout : "form", // 从上往下的布局
							                            labelWidth : 20,
							                            items : [{
										                fieldLabel : " ",
										                labelSeparator : '',
										                anchor : "100%"
									                   }]
						                       },{
													columnWidth :.46,
													layout : 'form',
													labelWidth : 80,
													labelAlign : 'right',
													border : false,
													items : [{
						                                    xtype : 'textfield',
						                                    fieldLabel : '期初余额',
						                                    name : 'startMoney1',
						                                    maxLength : 100,
						                                    allowNegative: false, // 允许负数 
					                                        style: {imeMode:'disabled'},
						                                    blankText : "金额不能为空，请正确填写!",
						                                    allowBlank : false,
						                                    readOnly : this.readOnly,
						                                    anchor:'100%',
						                                    listeners : {
					    	                                scope:this,
							                                afterrender : function(obj) {
								                                         obj.on("keyup")
							                                            },
							                                            change  :function(nf) {
								                                        var value= nf.getValue();
								                                       {
									                                    nf.setValue(Ext.util.Format.number(value,'0,000.00'))
									                                     this.getCmpByName("bpCustEntAccountSum.startMoney").setValue(value);
								                                       }
							                                           }
					                                            }
					                                      },{
					                                     xtype : "hidden",
						                                 name : "bpCustEntAccountSum.startMoney"
					                                  }]
												},
												 {
							                            columnWidth : .04, // 该列在整行中所占的百分比
							                            layout : "form", // 从上往下的布局
							                            labelWidth : 20,
							                            items : [{
										                fieldLabel : "元 ",
										                labelSeparator : '',
										                anchor : "100%"
									                   }]
						                       },
						                       	{
													columnWidth :.46,
													layout : 'form',
													labelWidth : 110,
													labelAlign : 'right',
													border : false,
													items : [{
						                                    xtype : 'textfield',
						                                    fieldLabel : '期末余额',
						                                    name : 'endMoney1',
						                                    maxLength : 100,
						                                    allowNegative: false, // 允许负数 
					                                        style: {imeMode:'disabled'},
						                                    blankText : "金额不能为空，请正确填写!",
						                                    allowBlank : false,
						                                    readOnly : this.readOnly,
						                                    anchor:'100%',
						                                    listeners : {
					    	                                scope:this,
							                                afterrender : function(obj) {
								                                         obj.on("keyup")
							                                            },
							                                            change  :function(nf) {
								                                        var value= nf.getValue();
								                                       {
									                                    nf.setValue(Ext.util.Format.number(value,'0,000.00'))
									                                     this.getCmpByName("bpCustEntAccountSum.endMoney").setValue(value);
								                                       }
							                                           }
					                                            }
					                                      },{
					                                     xtype : "hidden",
						                                 name : "bpCustEntAccountSum.endMoney"
					                                  }]
												},{
							                            columnWidth : .04, // 该列在整行中所占的百分比
							                            layout : "form", // 从上往下的布局
							                            labelWidth : 20,
							                            items : [{
										                fieldLabel : "元 ",
										                labelSeparator : '',
										                anchor : "100%"
									                   }]
						                       },{
													columnWidth :.46,
													layout : 'form',
													labelWidth : 80,
													labelAlign : 'right',
													border : false,
													items : [{
						                                    xtype : 'textfield',
						                                    fieldLabel : '二级科目名称',
						                                    name : 'bpCustEntAccountSum.subTitle',
						                                    maxLength : 100,
						                                    blankText : "金额不能为空，请正确填写!",
						                                    allowBlank : false,
						                                    readOnly : this.readOnly,
						                                    anchor:'100%'
					                                      }]
												},
												 {
							                            columnWidth : .04, // 该列在整行中所占的百分比
							                            layout : "form", // 从上往下的布局
							                            labelWidth : 20,
							                            items : [{
										                fieldLabel : " ",
										                labelSeparator : '',
										                anchor : "100%"
									                   }]
						                       },
												{
													columnWidth :.46,
													layout : 'form',
													labelWidth : 110,
													labelAlign : 'right',
													border : false,
													items : [{
															fieldLabel : '办理人',
															readOnly : true,
															allowBlank : true,
															name : 'bpCustEntAccountSum.createrName',
															anchor : "100%",
															value:currentUserFullName,
															xtype : 'textfield'
													}]
												},	 {
							                            columnWidth : .04, // 该列在整行中所占的百分比
							                            layout : "form", // 从上往下的布局
							                            labelWidth : 20,
							                            items : [{
										                fieldLabel : " ",
										                labelSeparator : '',
										                anchor : "100%"
									                   }]
						                       },{
				                                   columnWidth : 0.99, // 该列在整行中所占的百分比
				                                   layout : "form", // 从上往下的布局
				                                   labelWidth : 80,
				                                   border : false,
				                                   items : [{
							                               fieldLabel : '备注',
							                               name : 'bpCustEntAccountSum.remark',
							                               xtype : 'textarea',
							                               maxLength : 500,
							                               height:90,
							                               readOnly : this.readOnly,
							                               anchor : "100%"
						                                  }]
			                                     }
												
												
											]
										}
									]
									
								}]
				});
		// 加载表单对应的数据
		if (this.id != null && this.id != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath+ '/creditFlow/customer/enterprise/getBpCustEntAccountSum.do?id='+this.id,
				root : 'data',
				preName : 'bpCustEntAccountSum',
				success : function(response, options) {
					var respText = response.responseText;
					var alarm = Ext.util.JSON.decode(respText);
					this.getCmpByName('startMoney1').setValue(Ext.util.Format.number(alarm.data.startMoney, '0,000.00'));
					this.getCmpByName('endMoney1').setValue(Ext.util.Format.number(alarm.data.endMoney, '0,000.00'));
				}
			});
		}

	},// end of the initcomponents

	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
			formPanel : this.formPanel,
			scope : this,
			url : __ctxPath
					+ '/creditFlow/customer/enterprise/saveBpCustEntAccountSum.do',
			callback : function(fp, action) {
				var gridPanel = this.gridPanel;
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				this.close();
			}
		});
	}// end of save

});