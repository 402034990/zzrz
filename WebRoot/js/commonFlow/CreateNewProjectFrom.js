//CreateNewProjectFrom.js
CreateNewProjectFrom = Ext.extend(Ext.Window, {
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
		CreateNewProjectFrom.superclass.constructor.call(this, {
			id : 'CreateNewProjectFrom'+this.operationType,
			iconCls : 'btn-tree-team2',
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
				iconCls : 'btn-ok',
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
				 carNohidde:false,
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
				 carNohidde:false,
				 isEnterpriseNameReadOnly:this.isNameReadOnly,
				 isHiddenCustomerDetailBtn:true,
				 formPanelId:'CreateNewProjectFrom'+this.operationType,
				 isEditEnterprise : false
			});
		     pertitle="企业客户信息";
		}
		
		var baseInfo = {};
		if(this.history!='bankCriet'){
			baseInfo = new ExtUD.Ext.newProjectBaseInfo({
				hiddenchanpin:false,
				operationType:this.operationType,
				userType:this.userType,
				isDeptReadOnly:false,
				isProductReadOnly:this.isProductReadOnly
			})
		}else{
			baseInfo = new ExtUD.Ext.bankCreditInfo({
				hiddenchanpin: true,
				wofangzhutiHidden:true,
				operationType:this.operationType,
				userType:this.userType,
				isDeptReadOnly:false,
				isAllReadOnly:false,
				isProductReadOnly:this.isProductReadOnly
			})
		}
		
		this.formPanel = new Ext.form.FormPanel({
			id : "createNewSLFunctionForm",
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
				xtype : 'hidden',
				name : 'huicongFlowKey'
			},{
				xtype : 'fieldset',
				title : '项目基本信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'projectBaseInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
					baseInfo
				]
			},/*{
				hidden: this.history=='bankCriet'?false:true,
				xtype : 'fieldset',
				title : '项目基本信息',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name:'projectBaseInfo',
				labelAlign : 'right',
				autoHeight : true,
				items : [ 
						new ExtUD.Ext.bankCreditInfo({
							hiddenchanpin: this.history=='bankCriet'?true:false,
							wofangzhutiHidden:true,
							operationType:this.operationType,
							userType:this.userType,
							isDeptReadOnly:false,
							isProductReadOnly:this.isProductReadOnly
						})
					]
			},*/{
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
					}),{
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
	save : function(formPanel, window) {debugger
	  if(formPanel.items.items[6].getCmpByName('oppositeType').getValue()=="person_customer"){/*
		var pcarNo = formPanel.items.items[6].getCmpByName('person.carNo').getValue();
		var ptemporaryCarNo = formPanel.items.items[6].getCmpByName('person.temporaryCarNo').getValue();
		if(pcarNo==""&&ptemporaryCarNo==""){
		   alert('请输入车牌号或临时车牌号!');
		   return;
		}
	  */}else {/*
		var ctemporaryCarNo=formPanel.items.items[6].getCmpByName('enterprise.temporaryCarNo').getValue();
		var ccarNo=formPanel.items.items[6].getCmpByName('enterprise.carNo').getValue();
		if(ccarNo==""&&ctemporaryCarNo==""){
		   alert('请输入车牌号或临时车牌号!');
		   return;
		}
	  */}
		//对授信流程的操作-- 开始
		var flowKey=formPanel.getCmpByName('history').getValue();
		if('bankCriet' == flowKey){
			flowKey = 'BankCeditFlow';
		}
		//对授信流程的操作-- 结束
		var flowId=formPanel.getCmpByName('huicongFlowKey').getValue();
		Ext.Ajax.request({
			url : __ctxPath +"/flow/isStartProDefinition.do",
			params : {flowId:flowId,flowKey:flowKey},
			method : 'POST',
			success : function(response) {
				var obj=Ext.util.JSON.decode(response.responseText);
				if(obj.status==0){//禁用
					Ext.ux.Toast.msg('操作信息','该流程已被禁用!');
				}else if(obj.status==2){//没有对应的流程记录
					Ext.ux.Toast.msg('操作信息','请确认该流程是否存在!');
				}else{
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
								//保存授信信息---开始
								var  history  =  Ext.getCmp('createNewSLFunctionForm').getCmpByName('history').getValue();
								if(history=='bankCriet'){
									Ext.Ajax.request({
										url : __ctxPath+"/agentAproval/updatebkBankCredit.do?id="+data.projectId+"&taskId="+data.taskId,
										method : 'POST',
										success : function(response, request) {
										},
										failure : function(response) {
											Ext.ux.Toast.msg('操作提示', '对不起，数据操作失败！');
										}
							    	}) 
								}
								//保存授信信息---结束
								window.close();
								if(gridPanel){
									gridPanel.getStore().reload();
								}
							},
							failure : function(fp, action) {
								Ext.MessageBox.hide();
								alert('启动项目失败,请联系管理员!');
							}
						});
					}
				}
			}
		})
	},
	reset : function(formPanel) {
		formPanel.getForm().reset();
	},
	cancel : function(win) {
		win.close()
	}
})