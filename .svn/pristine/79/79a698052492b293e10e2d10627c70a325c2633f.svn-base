//CreateNewProjectFrom.js
CreateNewProjectFromCredit = Ext.extend(Ext.Window, {
	formPanel : null,
	title:"",
	operationType:null,
	userId:null,
	userType:null,
	isAllReadOnly:false,
	isNameReadOnly:false,
	isProductReadOnly:false,
	productId:null,
	isHiddernShop:false,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.type) != "undefined") {
		 
			this.type = _cfg.type;
		}
		if (typeof(_cfg.operationType) != "undefined") {
			this.operationType = _cfg.operationType;
		}
		if (typeof(_cfg.history) != "undefined") {
			this.history = _cfg.history;
		}
		if (typeof(_cfg.userId) != "undefined") {
			this.userId = _cfg.userId;
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
		this.isHiddernShop=isGranted('_isUpdateShop') ? false : true
		if(this.operationType=="SmallLoan_SmallLoanBusiness"){
			this.title="贷款申请";
			
			if(this.history=='dir'){
				this.title="C2P借款登记流程"
			}else if(this.history=='or'){
				this.title="CA2P借款登记流程"
			}else if(this.history=='entSmall'){
				this.title="企业客户小贷申请"
			}else if(this.history=='entHistory'){
				this.title="企贷历史补录流程"
			}else if(this.history=='mmproduceOr'){
				this.title="企业债权补录-理财产品"
			}else if(this.history=='mmproduceOr'){
				this.title="企业债权补录-理财产品"
			}else if(this.history=='mmplanOr'){
				this.title="企业债权补录-理财计划"
			}
		}else if(this.operationType=="SmallLoan_PersonalCreditLoanBusiness"){
			this.title="贷款申请"
			if(this.history=='bankCriet'){
				this.title="授信申请";
			}
			if(this.history=='dir'){
				this.title="P2P借款登记流程"
			}else if(this.history=='or'){
				this.title="PA2P借款登记流程"
			}else if(this.history=='personSmall'){
				this.title="个人客户小贷申请"
			}else if(this.history=='personHistory'){
				this.title="个贷历史补录流程"
			}else if(this.history=='mmproduceOr'){
				this.title="个人债权补录-理财产品"
			}else if(this.history=='mmplanOr'){
				this.title="个人债权补录-理财计划"
			}
		}else{
			this.title="贷款申请"
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		CreateNewProjectFromCredit.superclass.constructor.call(this, {
			id : 'CreateNewProjectFromCredit'+this.operationType,
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
		var pertitle="客户基本信息";
		if (this.operationType=="SmallLoan_PersonalCreditLoanBusiness") {
			this.perMain = new ExtUD.Ext.PeerPersonMainInfoPanel({
				 //projectId : this.projectId,
				isHiddenArchives:(this.history=='personSmall'?false:true),
				 isAllReadOnly :this.isAllReadOnly,
				 isNameReadOnly:this.isNameReadOnly,
				 isSpouseReadOnly: true,
				 isHidden : true,
				 isPersonNameReadOnly:this.isNameReadOnly,
				 isHiddenCustomerDetailBtn:true,
				 isEditPerson : false
			});
			pertitle="个人客户信息";
		} else if(this.operationType=="SmallLoan_SmallLoanBusiness"){
			     this.perMain = new ExtUD.Ext.PeerMainInfoPanel({
				 projectId : this.projectId,
				 bussinessType:this.businessType,
				 isAllReadOnly : this.isAllReadOnly,
				 isNameReadOnly:this.isNameReadOnly,
				 isHidden : true,
				 isEnterpriseNameReadOnly:this.isNameReadOnly,
				 isHiddenCustomerDetailBtn:true,
				 formPanelId:'CreateNewProjectFrom'+this.operationType,
				 isEditEnterprise : false
			});
		     pertitle="企业客户信息";
		}
		
		
		this.formPanel = new Ext.form.FormPanel({
			id : "CreateNewProjectFromCredit",
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
			},this.history=='bankCriet'?{
				xtype : 'fieldset',
				title : '项目基本信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'projectBaseInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
						new ExtUD.Ext.newProjectBaseInfo({
							hiddenchanpin:this.history=='bankCriet'?true:false,
							operationType:this.operationType,
							userType:this.userType,
							isProductReadOnly:this.isProductReadOnly,
							isHiddernShop:this.isHiddernShop
						})
					]
			}:{
				xtype : 'fieldset',
				title : '项目基本信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'projectBaseInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
						new ExtUD.Ext.bankCreditInfo({
							wofangzhutiHidden:true,
							operationType:this.operationType,
							userType:this.userType,
							isProductReadOnly:this.isProductReadOnly,
							isHiddernShop:this.isHiddernShop
						})
					]
			},{
				xtype : 'fieldset',
				title : pertitle,
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				id : 'person',
				name : 'customerInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [new ExtUD.Ext.CustomerType({
									flag : true
								}), /*new ExtUD.Ext.PeerMainInfoPanel({
									isHiddenCustomerDetailBtn : true,
									isAllReadOnly : false,
									isEditEnterprise : true,
									isEnterpriseNameReadOnly : false,
									isHidden : true,
									flag:false
								})*/{
											xtype : 'peerPersonMainInfoPanel',
											isHiddenCustomerDetailBtn : true,
											isAllReadOnly : false,
											isEditPerson : true,
											isPersonNameReadOnly : false,
											isHidden : true
										}]
			}]
		});
		if (this.userId != null && this.userId != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath+ '/p2p/getApplyUserInfoBpFinanceApplyUser.do?userId='+ this.userId+"&userType="+this.userType+"&productId="+this.productId,
				root : 'data',
				preName : ['person','enterprise'],
				success : function(response, options) {
					var respText = response.responseText;
					var alarm_fields = Ext.util.JSON.decode(respText);
					this.getCmpByName('slSmallloanProject.productName').setValue(alarm_fields.data.productName);
					this.getCmpByName('slSmallloanProject.productId').setValue(alarm_fields.data.productId);
				}
			});
		}
	},
	/**
	 * 启动项目
	 */
	save : function(formPanel, window) {
/*			if (formPanel.getForm().isValid()) {
				if(Ext.getCmp("NewProjectFormSSZZ").getCmpByName('person.cardtype').getValue()==309){
					if(validateIdCard(Ext.getCmp("NewProjectFormSSZZ").getCmpByName

('person.cardnumber').getValue())==1){
						Ext.Msg.alert('身份证号码验证','证件号码不正确,请仔细核对')
						return;
					}else if(validateIdCard(Ext.getCmp("NewProjectFormSSZZ").getCmpByName

('person.cardnumber').getValue())==2){
						Ext.Msg.alert('身份证号码验证','证件号码地区不正确,请仔细核对')
						return;
					}else if(validateIdCard(Ext.getCmp("NewProjectFormSSZZ").getCmpByName

('person.cardnumber').getValue())==3){
						Ext.Msg.alert('身份证号码验证','证件号码生日日期不正确,请仔细核对')
						return;
					}
				}  
			}*/
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
		/*var tabs = Ext.getCmp('centerTabPanel');
		if (formPanel != null) {
			tabs.remove('NewProjectFormEnterPrise');
		}*/
	}
})