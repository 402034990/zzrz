//AgentCreditStartUpFrom.js
AgentCreditStartUpFrom = Ext.extend(Ext.Window, {
	formPanel : null,
	title:"",
	operationType:null,
	orgId:null,
	userType:null,
	isAllReadOnly:false,
	isNameReadOnly:false,
	isProductReadOnly:false,
	productId:null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.operationType) != "undefined") {
			this.operationType = _cfg.operationType;
		}
		if (typeof(_cfg.history) != "undefined") {
			this.history = _cfg.history;
		}
		if (typeof(_cfg.orgId) != "undefined") {
			this.orgId = _cfg.orgId;
		}
		if (typeof(_cfg.userType) != "undefined") {
			this.userType = _cfg.userType;
		}
		if (typeof(_cfg.productId) != "undefined") {
			this.productId = _cfg.productId;
		}
		if (typeof(_cfg.isAllReadOnly) != "undefined") {
			this.isAllReadOnly = _cfg.isAllReadOnly;
		}
		if (typeof(_cfg.isNameReadOnly) != "undefined") {
			this.isNameReadOnly = _cfg.isNameReadOnly;
		}
		if (typeof(_cfg.isProductReadOnly) != "undefined") {
			this.isProductReadOnly = _cfg.isProductReadOnly;
		}
			this.title="代理商授信申请"
		Ext.applyIf(this, _cfg);
		this.initComponents();
		AgentCreditStartUpFrom.superclass.constructor.call(this, {
			id : 'AgentCreditStartUpFrom'+this.operationType,
			iconCls : 'btn-tree-team30',
			layout : 'form',
			items : this.formPanel,
			modal : true,
			frame:true,
			autoScroll:true,
			autoHeight:true,
			width : 1000,
			maximizable : true,
			frame:true,
			resizable:false,
			title : this.title,
			buttonAlign : 'center',
			buttons :[{
				text:'启动项目',
				iconCls : 'btn-ok1',
				handler : this.save.createCallback(this.formPanel, this)
			},'-', {
				text : '重置',
				iconCls : 'btn-reset',
				handler : this.reset.createCallback(this.formPanel)
			},'-', {
				text : '取消',
				iconCls : 'btn-cancel',
				handler : this.cancel.createCallback(this)
			}]
		});
	},
	initComponents : function() {
		var pertitle="企业客户基本信息";
		this.formPanel = new Ext.form.FormPanel({
			id : "createNewSLFunctionForm"+this.operationType,
			frame:true,
			border : false,
			monitorValid : true,
			autoScroll : true,
			anchor : "100%",
			url : __ctxPath + "/flow/saveProcessActivity.do",
			bodyStyle : 'padding-left:0px;padding-top:14px',
			items:[{
				xtype : 'hidden',
				name : 'preHandler',
				value : 'creditProjectService.startCreditP2PProjectFlow'
			},{
				xtype : 'hidden',
				name:"operationType",
				value : this.operationType
			},{
				xtype : 'hidden',
				name : 'history',
				value : this.history
			},{
				xtype : 'hidden',
				name : 'loanId',
				value : this.loanId
			},{
				xtype : 'fieldset',
				title : '项目基本信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'projectBaseInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ {
					layout : "column",
					border : false,
					scope : this,
					defaults : {
						anchor : '100%',
						columnWidth : 1,
						isFormField : true,
						labelWidth : 80
					},
					items : [{
						columnWidth : 1,
						layout : 'form',
						labelWidth:80,
						border:false,
						defaults : {
							anchor : anchor
						},
						items : [{
							xtype : 'combo',
							fieldLabel : '代理商名称',
							allowBlank : false,
							readOnly:true,
							triggerClass : 'x-form-search-trigger',
							hiddenName : 'organization.agentName',
							scope:this,
							onTriggerClick : function(com) {
								var tempPlane=this.ownerCt.ownerCt;
							   var amselectLegalorganization1 = function(obj) {
								    tempPlane.getCmpByName('organization.agentName').setValue(obj.enterprisename);
									tempPlane.getCmpByName('organization.organizecode').setValue(obj.organizecode);
									tempPlane.getCmpByName('organization.cciaa').setValue(obj.cciaa);
									tempPlane.getCmpByName('organization.taxnum').setValue(obj.taxnum);
									tempPlane.getCmpByName('organization.legalpersonName').setValue(obj.legalpersonName);
									tempPlane.getCmpByName('organization.telephone').setValue(obj.telephone);
									tempPlane.getCmpByName('organization.documentType').setValue(obj.documentType);
									tempPlane.getCmpByName('organization.factaddress').setValue(obj.factaddress);
									tempPlane.getCmpByName('organization.postcoding').setValue(obj.postcoding);
									tempPlane.getCmpByName('organization.legalpersonid').setValue(obj.legalpersonid);
									tempPlane.getCmpByName('organization.selfemail').setValue(obj.selfemail);
									tempPlane.getCmpByName('organization.cardnumber').setValue(obj.cardnumber);
									tempPlane.getCmpByName('organization.cellphone').setValue(obj.cellphone);
									tempPlane.getCmpByName('organization.legalpersonSex').setValue(obj.legalpersonSex);
									tempPlane.getCmpByName('organization.legalpersonCardType').setValue(obj.legalpersonCardType);
								}
							   selectEnterPriseName(amselectLegalorganization1);
							},
							resizable : true,
							mode : 'romote',
							editable : true,
							lazyInit : false,
							typeAhead : true,
							minChars : 1,
							width : 60,
							store : new Ext.data.JsonStore({
								url : getRootPath()	+ '/creditFlow/customer/person/ajaxQueryForComboPerson.do?isAll='+isGranted('_detail_sygrkh'),
								root : 'topics',
								autoLoad : true,
								fields : [{
											name : 'id'
										}, {
											name : 'name'
										}],
								listeners : {
									'load' : function(s, r, o) {
										if (s.getCount() == 0) {
											Ext.getCmp('amlegalorganizationName')
													.markInvalid('没有查找到匹配的记录');
										}
									}
								}
							}),
							displayField : 'name',
							valueField : 'id',
							triggerAction : 'all',
							listeners : {
								'select' : function(combo, record, index) {
									Ext.getCmp('amlegalorganizationId').setValue(record.get('id'));
									Ext.getCmp('amlegalorganizationName').setValue(record.get('name'));
											
								},
								'blur' : function(f) {
									if (f.getValue() != null
											&& f.getValue() != '') {
										Ext.getCmp('amlegalorganizationId')
												.setValue(f.getValue());
									}
								},
							   'afterrender':function(com){
										    com.clearInvalid();
										}
									
							}
						}, {
							name : 'organization.legalpersonid',
							xtype : 'hidden'
						},{
							name : 'organization.orgId',
							xtype : 'hidden'
						},{
							name : 'organization.securityDeposit',
							xtype : 'hidden'
						},{
							name : 'gudongInfo',
							xtype : 'hidden',
							value:null
						},{
							name : 'organization.legalorganizationid',
							xtype : 'hidden'
						}]
					}, {
							columnWidth : .5,
							layout : 'form',
							border:false,
							defaults : {
								anchor : anchor
							},
							labelWidth : 80,
							items : [{
										 fieldLabel : '联系电话',
										 xtype : 'textfield',
										// readOnly:isReadOnly,
										 allowBlank : false,
										 blankText : '联系电话不允许空',
										 emptyText : '请输入联系电话',
										 name : 'organization.telephone',
										regex : /^[1][34578][0-9]{9}$/,
									    regexText : '联系电话格式不正确，应为手机号'	,
										listeners : {
											scope:this,
									        'blur' : function(f) {
										     var reg=/^[1][34578][0-9]{9}$/;
										     var flag=reg.test(this.getCmpByName('organization.telephone').getValue());
										     if(!flag){
										     Ext.Msg.alert('操作信息','联系电话格式不正确，应为手机号');
											 this.getCmpByName('organization.telephone').setValue(null);
										}
									}
									}
									}]
						},{
							columnWidth :0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 120,
							border : false,
							items : [{
								fieldLabel : '代理商编号',
								xtype:'textfield',
								labelAlign:'left',
								allowBlank : false,
								name : 'organization.branchNO',
								anchor : "94%"// 控制文本框的长度

						}]
						},{
							columnWidth : .5,
							layout : 'form',
							border:false,
							defaults : {
								anchor : anchor
							},
							labelWidth : 80,
							items : [{
										fieldLabel : '邮政编码',
										xtype : 'textfield',
										labelAlign:"left",
										//readOnly:isReadOnly,
										allowBlank : false,
										regex : /^[0-9]{6}$/,
										regexText : '邮政编码格式不正确',
										name : 'organization.postcoding'
									}]
						},{
							columnWidth :0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 120,
							border : false,
							items : [{
								fieldLabel : '法定代表人姓名',
								xtype:'textfield',
								labelAlign:"left",
								allowBlank : false,
								name : 'organization.legalpersonName',
								anchor : "94%"// 控制文本框的长度

						}]
						},{
							columnWidth : 1,
							layout : 'form',
							labelWidth : 80,
							border:false,
							defaults : {
								anchor : anchor
							},
							items : [{
										xtype : 'textfield',
										fieldLabel : '地址',
										//readOnly:isReadOnly,
										name : 'organization.factaddress'
									}]
						}	]
				}]
			}]
		});
		if (this.orgId != null && this.orgId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath	+ '/system/getOrganization.do?orgId='+ this.orgId,
				root : 'data',
				preName : 'organization'
			});
		}
	},
	/**
	 * 启动项目
	 */
	save : function(formPanel, window) {
			var gridPanel =  Ext.getCmp('BpFinanceApplyUserView_4');
			var vDates = "";
			if(window.operationType=="SmallLoan_SmallLoanBusiness"){
				var edGrid=formPanel.getCmpByName('gudong_store').get(0).get(1);
				vDates=getGridDate(edGrid);
			 }
			Ext.MessageBox.wait('正在提交数据, 请稍侯 ...', '提示');
			if(formPanel.getForm().isValid()){
				formPanel.getForm().submit({
					method : 'POST',
					params : {
						"gudongInfo" : vDates
					},
					success : function(fp, action) {
						Ext.MessageBox.hide();
						var data = action.result.data;
						//Ext.ux.Toast.msg('操作信息', "启动成功");
						AppUtil.removeTab('NewProjectForm');
						var tabs = Ext.getCmp('centerTabPanel');
						var contentPanel = App.getContentPanel();
						var formView = contentPanel.getItem('ProcessNextForm' + data.taskId);
						if (formView == null) {
							formView = new ProcessNextForm({
								taskId : data.taskId,
								activityName : data.activityName,
								projectName : data.projectName,
								agentTask : true
							});
							contentPanel.add(formView);
						}
						contentPanel.activate(formView);
						ZW.refreshTaskPanelView();
						var obj=document.getElementById("taskCount");//手动刷新右上角待办任务数目
						ZW.refreshTaskCount(obj);
						window.close();
						gridPanel.getStore().reload();
					},
					failure : function(fp, action) {
						Ext.MessageBox.hide();
						alert('启动项目失败,请联系管理员!');
					}
				});
			}
			
	},
	reset : function(formPanel) {
		formPanel.getForm().reset();
	},
	cancel : function(win) {
		win.close()
	}
})