/**
 * 导航－金融中介管理
 * 	   ---审批项目查看页面详细信息
 * @extends Ext.Panel
 */
/**
 * @author lisl
 * @description 小额贷款项目信息
 * @extends Ext.Panel
 */
ApproveProjectInfo = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		
		if (typeof(_cfg.readOnly) != "undefined") {
			this.readOnly = _cfg.readOnly;
		}
		this.initUIComponents();
		ApproveProjectInfo.superclass.constructor.call(this, {
			autoScroll : true,
			height : document.body.clientHeight - 200,
			tbar : this.readOnly?null:this.toolbar,
			items : []
		});
	},
	initUIComponents : function() {
		var jsArr = [
				__ctxPath + '/js/commonFlow/ExtUD.Ext.js',//客户信息 项目基本信息
			    __ctxPath + '/js/creditFlow/smallLoan/quickenLoan/LendForm.js',//借款需求
			      __ctxPath + '/js/creditFlow/smallLoan/quickenLoan/ExamineForm.js',//终审金额
			    __ctxPath + '/js/creditFlow/customer/person/relationPerson/RelationPersonView.js',//联系人信息
			    __ctxPath+'/js/creditFlow/assuretenet/OurProcreditAssuretenetProductView.js',
			    __ctxPath + '/js/creditFlow/customer/enterprise/addEnterprise.js',
			    __ctxPath + '/js/creditFlow/guarantee/materials/SlEnterPriseProcreditMaterialsView.js',// 贷
//				__ctxPath + '/js/creditFlow/personrelation/netcheck/BpPersonNetCheckInfoView.js',//网审信息
				__ctxPath + '/js/creditFlow/smallLoan/contract/OperateContractWindow.js',
				__ctxPath + '/js/commonFlow/ExtUD.Ext.js',
				__ctxPath + '/js/creditFlow/finance/detailView.js',// 资金流水详细
				__ctxPath + '/js/creditFlow/smallLoan/project/loadDataCommon.js',// 加载页面表单数据JS
				__ctxPath + '/js/creditFlow/report/SlReportView.js',// 尽职调查报告
				__ctxPath + '/js/creditFlow/finance/SlActualToCharge.js',
				__ctxPath + '/js/creditFlow/smallLoan/finance/BorrowerInfo.js',//共同借款人信息
				__ctxPath + '/js/creditFlow/smallLoan/finance/loadDataExtension.js',
				__ctxPath + '/js/creditFlow/finance/OwnFundIntentView.js',
				__ctxPath + '/js/creditFlow/smallLoan/quickenLoan/ExamineForm.js',
				__ctxPath + '/js/creditFlow/finance/SlActualToCharge.js',
				__ctxPath + '/js/creditFlow/agent/SeeBankCreditDetailWin.js'
				
				
		];
		$ImportSimpleJs(jsArr, this.constructPanel, this);
		this.toolbar = new Ext.Toolbar({
			items : ['->', {
				iconCls : 'btn-save',
				text : '保存',
				scope : this,
				handler : this.saveAllDatas
			}]
		})
	},// 初始化组件
	constructPanel : function() {
		this.projectId = this.record.data.projectId;
		this.businessType = this.record.data.businessType;
		this.oppositeType = this.record.data.oppositeType;
		if(typeof(this.record.data.oppositeType)=='undefined' || null==this.record.data.oppositeType){
			this.oppositeType=this.record.data.oppositeType;
		}
		this.projectStatus = this.record.data.projectStatus;
		this.operationType = this.record.data.operationType;
		this.taskId = this.record.data.taskId;
		this.personId = this.record.data.oppositeID;
		this.customerInfo = "";
		this.customerTitle = "客户信息";
		
		
		//项目基本信息
		this.projectInfo = new ExtUD.Ext.CreditLoanProjectInfoPanel({
			readOnly:this.readOnly,
			product:true,
			isCPLX:true
		});
		
		//借款需求
		this.LendForm = new LendForm({
			projectID : this.projectId,
			isAllReadOnly : this.readOnly,
			isReadOnly:this.readOnly
		});
		
		//个人客户信息
		this.perMain1 = new ExtUD.Ext.CustomerInfoFastPanel({
			isEditPerson : !this.readOnly,
			isAllReadOnly:this.readOnly,
			isRead:this.readOnly,
			isHidden:true,
			isSpouseReadOnly: true,
			isNameReadOnly:true,
			isHiddenCustomerDetailBtn:false,
			loanId:this.loanId
		});
		
		//贷款账户信息
		this.bankAccountPanel=new ExtUD.Ext.BankAccountPanel({
			legalpersonid:this.personId,
			isReadOnly : this.readOnly,
			projectId:this.projectId
		});
		
		//共同借款人信息
		this.borrowerInfo=new BorrowerInfo({
			projectId : this.projectId,
			isHidden : false,
			isHiddenAddBtn : this.readOnly,
			isHiddenDelBtn:this.readOnly
		});
		
		this.perMain = "";
		var title="企业客户信息";
		if (this.oppositeType =="person_customer") {//个人客户信息
			this.perMain = new Ext.Panel({
				items :[{
						xtype : 'fieldset',
						title :'基本信息',
						bodyStyle : 'padding-left:0px',
						collapsible : true,
						labelAlign : 'right',
						autoHeight : true,
						items :[this.perMain1]
					},{
						xtype : 'fieldset',
						title :'贷款账户信息',
						bodyStyle : 'padding-left:0px',
						collapsible : true,
						labelAlign : 'right',
						autoHeight : true,
						items :[this.bankAccountPanel]
					}/*, {       
					    xtype : 'fieldset',
						title : '共同借款人信息',
						bodyStyle : 'padding-left:0px',
						collapsible : true,
						labelAlign : 'right',
						autoHeight : true,
						items : [this.borrowerInfo]
					}*/
				]
				
			})
			title="个人客户信息";
		} else if(this.oppositeType =="company_customer"){
			this.perMain = new  ExtUD.Ext.PeerMainInfoPanel({
						 projectId : this.projectId,
						 bussinessType:this.businessType,
						 isAllReadOnly : this.readOnly,
						 isNameReadOnly:false,
						 isHidden : false,
						 isHiddenCustomerDetailBtn:true,
						 isEditEnterprise : !this.readOnly,
						 isReadOnly : this.readOnly
					})
		}
	
		
		//联系人信息(配偶或直系亲属)   PersonRelation  VPersonRelationperson
		this.relationPersonInfo0 = new RelationPersonView({
			personIdValue:this.personId,
			projectId:this.projectId,
			relationPersonType:575,
			flag:0,
			isHiddenAddBtn:this.readOnly,
			isHiddenDelBtn:this.readOnly,
			isHiddenEdiBtn:this.readOnly
		});
		this.relationPersonInfo1 = new RelationPersonView({
			personIdValue:this.personId,
			projectId:this.projectId,
			relationPersonType:577,
			flag:1,
			isHiddenAddBtn:this.readOnly,
			isHiddenDelBtn:this.readOnly,
			isHiddenEdiBtn:this.readOnly
		});
		this.relationPersonInfo2 = new RelationPersonView({
			personIdValue:this.personId,
			projectId:this.projectId,
			relationPersonType:576,
			flag:2,
			isHiddenAddBtn:this.readOnly,
			isHiddenDelBtn:this.readOnly,
			isHiddenEdiBtn:this.readOnly
		});
		
		//贷款材料清单
   		this.SlProcreditMaterialsView = new SlEnterPriseProcreditMaterialsView({
			projectId : this.projectId,
			businessType : this.businessType,
			isHiddenEdit : false,
			isHidden:this.readOnly,
			isHidden_materials : this.readOnly,
			operationType : "SmallLoanBusiness"
		});
		//贷款必备条件	
		this.ourProcreditAssuretenetProductView = new OurProcreditAssuretenetProductView({
			isProduct:true,
			productId:this.productId,
			isAllReadOnly:true,
			isReadOnly:true,
			hiddenAdd:true,
			isShowBar:false,
			isHiddentbar:true,
			hiddenDel:true
		});
		//抵质押物
		this.dYMortgageViewProduct=new DZYMortgageView({
			projectId : this.projectId,
			titleText : '抵质押担保',
			businessType : this.businessType,
			isHiddenAddContractBtn:this.readOnly,
			isHiddenDelContractBtn:this.readOnly,
			isHiddenEdiContractBtn:this.readOnly,
			isHiddenRelieve:false,//是否解除
			isgdHidden:false,//是否已提交
			isRelieveEdit:!this.readOnly,//解除
			isgdEdit:!this.readOnly,
			isblHidden:this.readOnly,
			isRecieveHidden:this.readOnly,
			isHiddenAddBtn : this.readOnly,
			isHiddenDelBtn : this.readOnly,
			isHiddenEdiBtn : this.readOnly,
			formPanel:this.LendForm,
			isAllReadOnly:this.readOnly
		}),
		//保证担保
		this.baozMortgageView= new BaozMortgageView({
			projectId : this.projectId,
			titleText : '保证担保',
			businessType : this.businessType,
			isHiddenAddContractBtn:this.readOnly,
			isHiddenDelContractBtn:this.readOnly,
			isHiddenEdiContractBtn:this.readOnly,
			isHiddenRelieve:this.readOnly,
			isRecieveHidden:this.readOnly,
			isblHidden:false,//是否落实
			isgdHidden:false,//是否已提交
			isgdEdit:!this.readOnly,
			isHiddenAddBtn : this.readOnly,
			isHiddenDelBtn : this.readOnly,
			isHiddenEdiBtn : this.readOnly,
			formPanel:this.LendForm,
			isblEdit:!this.readOnly,
			isBl:true
		})
		/*//网审信息
		this.netCheckInfoView = new BpPersonNetCheckInfoView({
			projectId:this.projectId,
			personId:this.personId,
			isReadOnly : this.readOnly
		});*/
		
		/*//资金款项
		this.projectInfoFinance= new ExtUD.Ext.newProjectInfoFinancePanel({
			isAllReadOnly:true,
			isAllReadOnly:true,
			isHiddencalculateBtn:true,
			isHkReadOnly:false,
			isStartDateReadOnly:true,
			isSomeReadOnly:!this.readOnly,
		 	projectId:this.projectId,
		 	isHkReadOnly:true,
			idDefinition:'personLoanFlow'+this.flag+this.taskId 
		});*/
		//资金款项
		this.projectInfoFinance = new LoanTrialFormPanel({
			isModelHidden:false,
		   	isAllReadOnly:this.readOnly,
		   	isMoneyReadOnly:this.readOnly,
			isStartDateReadOnly:this.readOnly,
			costEditor : this.readOnly,
			typeCheck : this.readOnly,
			radioType : this.readOnly,
		 	projectId:this.projectId,
			idDefinition:'personLoanFlow'+this.taskId ,
			defineForm :'slSmallloanProject'
	    });
		
		//授信信息
		this.bankcredtiTongyong= new ExtUD.Ext.bankcredtiTongyong({
			personId :this.personId,
			oppositeType:this.oppositeType,
			taskId:this.taskId,
			shouxinreadOnly:false,
			isProductReadOnly:false,
			isAllReadOnly:this.readOnly,
			isHiddencalculateBtn:true,
			isStartDateReadOnly:true,
			isHkReadOnly:false,
			isSomeReadOnly:true,
			bianhaoReadOnly : this.readOnly,
		 	projectId:this.projectId,
			idDefinition:'personLoanFlow'+this.flag+this.taskId 
		});
		
		//借款需求
		this.ExamineForm = new ExamineForm({
			projectID : this.projectId,
			isReadOnly:this.readOnly
		});
		//保证人信息
		this.bondPanel= new ExtUD.Ext.bondPanel({
			personId :this.personId,
			oppositeType:this.oppositeType,
			shouxinreadOnly:true,
			isProductReadOnly:true,
			isAllReadOnly:this.readOnly,
			isHiddencalculateBtn:true,
			isStartDateReadOnly:true,
			isHkReadOnly:false,
			isSomeReadOnly:true,
			baozhengrenTextReadOnly : this.readOnly,
		 	projectId:this.projectId,
			idDefinition:'personLoanFlow'+this.flag+this.taskId 
		});
		
		//财务服务费
		this.actualToChange = new SlActualToCharge({
			projId : this.projectId,
			businessType : 'SmallLoan',// 小贷
			editor:!this.readOnly,
			serviceHidden:true,
			isHidden : this.readOnly,
			productId:this.productId,
			comboType2 : !this.readOnly
		});
		//上传资料
		this.onceCheckReportView = new SlReportView({
			projectId : this.projectId,
			hiddenDownLoad:true,//下载按钮不显示
			businessType : 'SmallLoan',
			isShouxin:true,
			Template:'ReportTemplate',
			isHidden_report : this.readOnly,
			hiddenUpLoad : this.readOnly
		});
			//贷款合同
		this.slContractView=new SlContractView({
		 	projectId:this.projectId,
		    bidPlanId:this.bidPlanId,
		    isHiddenAddBtn : this.readOnly,
		    isHiddenDelBtn : this.readOnly,
		    isHiddenEdiBtn : this.readOnly,
		    isCreateContractHidden:this.readOnly,
		    isAffixUpHidden: !this.readOnly,
		    isHiddenBZ:false,
		    isHiddenDZY:false,
		    isSignHidden:true,
		    isHiddenAffrim:true,
		    contractUploadHidden:true,
		    isHidden:true,
		    isHiddenToFtp : true,
	    	htType : 'loanContract',
	    	HTLX : 'loanContract',
		    businessType : this.businessType,
		    isqsEdit:false,
		    isHiddenTbar:false
		});
		this.outPanel = new Ext.Panel({
			modal : true,
			buttonAlign : 'center',
			layout : 'form',
			border : false,
			frame : true,
			defaults : {
				anchor : '100%',
				xtype : 'fieldset',
				columnWidth : 1,
				collapsible : true,
				collapsed:true,
				autoHeight : true
			},
			labelAlign : "right",
			items : [{
				title : '<a name="sl_projectInfo_' +  this.flag + this.projectId
						+ '"><font color="red">01</font>项目基本信息</a>',
				items : [this.projectInfo]
			},/*{
				title : '<a name="sl_bankcredtiTongyong_' +  this.flag + this.projectId
						+ '"><font color="red">02</font>授信信息</a>',
				items : [this.bankcredtiTongyong],
				name:  'bankcredtiTongyong'
			},{
				title : '<a name="sl_bondPanel_' +  this.flag + this.projectId
						+ '"><font color="red">03</font>保证金信息</a>',
				items : [this.bondPanel],
				name:   'bondPanel'
			},*/{
				title : '<a name="sl_personalCustomerInfo_' +  this.flag + this.projectId
						+ '"><font color="red">04</font>'+((this.oppositeType=="person_customer")?'个人':'企业') +'客户信息</a>',
				items : [this.perMain]
			},{
				title : '<a name="sl_loandemand_' +  this.flag + this.projectId
						+ '"><font color="red">05</font>借款需求</a>',
				items : [this.LendForm]
			},{
				title : '<a name="sl_financeInfo_' + this.flag + this.projectId
						+ '"><font color="red">06</font>资金款项信息</a>',
				items : [this.projectInfoFinance],
				name:'financeInfoFieldset'
			},/*{
				title : '<a name="sl_financeInfo_' + this.flag + this.projectId
						+ '"><font color="red">07</font>终审金额</a>',
				items : [this.ExamineForm],
				name:'financeInfoFieldset'
			},*/(this.oppositeType=="company_customer")?{xtype:'hidden'}:{
				
				title : '<a name ="sl_contactPersonInfo_' + this.flag + this.projectId
						+ '"><font color="red">08</font>联系人信息</a>',
				items : [{
					xtype : 'fieldset',
					title :'【联系人信息】家庭联系人',
					bodyStyle : 'padding-left:0px',
					collapsible : true,
					labelAlign : 'right',
					autoHeight : true,
					items : [this.relationPersonInfo0]
				},{
					xtype : 'fieldset',
					title :'【联系人信息】其他联系人',
					bodyStyle : 'padding-left:0px',
					collapsible : true,
					labelAlign : 'right',
					autoHeight : true,
					items : [this.relationPersonInfo1]
				},{
					xtype : 'fieldset',
					title :'【联系人信息】紧急联系人',
					bodyStyle : 'padding-left:0px',
					collapsible : true,
					labelAlign : 'right',
					autoHeight : true,
					items : [this.relationPersonInfo2]
				}]
			},{
				title : '<a name="sl_actualToChange_' + this.flag + this.projectId
						+ '"><font color="red">09</font>费用清单</a>',
				items : [this.actualToChange]
			},{
				title : '<a name="sl_loanmaterial_' + this.flag + this.projectId
						+ '"><font color="red">10</font>贷款材料清单</a>',
				items : [this.SlProcreditMaterialsView]
			},{
				title : '<a name="sl_loanrequire_' + this.flag + this.projectId
						+ '"><font color="red">11</font>贷款必备条件</a>',
				items : [this.ourProcreditAssuretenetProductView]
			},{
				title : '<a name="sl_guaranteeInfo_' + this.flag + this.projectId
						+ '"><font color="red">12</font>担保措施</a>',
				items : [this.dYMortgageViewProduct,this.baozMortgageView]
			},{
				title : '<a name="sl_checkreport_' + this.flag + this.projectId
						+ '"><font color="red">13</font>付款材料清单上传</a>',
				items : [this.onceCheckReportView]
			},{
				title : '<a name="sl_slContractView_' + this.flag + this.projectId
						+ '"><font color="red">14</font>贷款合同</a>',
				items : [this.slContractView]
			},{
				 xtype:'hidden',
			     id:'bankCreditId',
			     disabled:true,
			     value:null
			}]
		});

		this.loadData({
			url : __ctxPath + '/project/getSmallLoanProjectInfoSlSmallloanProject.do?slProjectId='+this.projectId,
			method : "POST",
			preName : ['person', 'slSmallloanProject','bpProductParameter','workCompany','bpMoneyBorrowDemand','creditRating'],
			root : 'data',
			success : function(response, options) {
				var respText = response.responseText;
				var alarm_fields = Ext.util.JSON.decode(respText);
			    expandFieldSet(this.outPanel)
				this.getCmpByName('projectMoney1').setValue(Ext.util.Format.number(alarm_fields.data.slSmallloanProject.projectMoney, '0,000.00'))
			    //this.getCmpByName('projectMoney2').setValue(Ext.util.Format.number(alarm_fields.data.slSmallloanProject.secondProjectMoney, '0,000.00'))
			
			    /*if(alarm_fields.data.slSmallloanProject.bankCreditId==null){
					var isbankcredt=this.getCmpByName('isbankcredtiTongyong');
					isbankcredt.fireEvent('change',isbankcredt);
				}
				if(alarm_fields.data.slSmallloanProject.baozhengjinId==null){
					var iscash=this.getCmpByName('iscashDepositTongyong');
					iscash.fireEvent('change',iscash);
				}*/
				/*if(alarm_fields.data.slSmallloanProject.operationType=='PersonalCreditLoanBusiness' || 
				   alarm_fields.data.slSmallloanProject.operationType=='SmallLoanBusiness' ){
					this.getCmpByName('bankcredtiTongyong').hide();
					this.getCmpByName('bondPanel').hide();
				}*/
				
				this.gridPanel = new OwnFundIntentView({
					projectId : this.projectId,
					object : this.projectInfoFinance,
					//preceptId:alarm_fields.data.ownBpFundProject.id,
					isHiddenAddBtn:this.readOnly,
					isHiddenDelBtn:this.readOnly,
					isHiddenExcel:this.readOnly,
					isHiddenResBtn1:this.readOnly,
					isHiddenautocreateBtn:this.readOnly,
					isHiddenseeqlideBtn:true,
					isHiddenseesumqlideBtn:true,
					isFastOr:true,
					isHidden1 : this.readOnly,
					comboType : !this.readOnly,
					businessType : 'SmallLoan'
				});
				
				this.getCmpByName('financeInfoFieldset').add(this.gridPanel);
				this.getCmpByName('financeInfoFieldset').doLayout()
				
				//fillData(this,alarm_fields,'personLoanFlow'+this.flag+this.taskId);
				loanTrialLoadData(this,alarm_fields.data.slSmallloanProject,'personLoanFlow'+this.taskId);
				Ext.getCmp('bankCreditId').setValue(alarm_fields.data.bankCredit.id);
			}
		});
		this.formPanel = new Ext.FormPanel();
		this.formPanel.add(this.outPanel);
		this.add(this.formPanel);
		this.doLayout();
	}// 初始化UI结束
	,
	saveAllDatas : function() {
		var oppType = this.oppositeType;
		var vDates = "";
		var source = "";
		
		var fundIntentJsonData = this.gridPanel.getGridDate();
		var gridPanel=this.gridPanel
		var  slActualToChargeJsonData = this.actualToChange.getGridDate();
		var slActualToCharge=this.actualToChange
		
		this.formPanel.getForm().submit({
			clientValidation : false,
			url : __ctxPath + '/project/saveSmallProjectInfoSlSmallloanProject.do',
			params : {
				"fundIntentJsonData" : fundIntentJsonData,
				"chargeJson" : slActualToChargeJsonData
			},
			method : 'post',
			waitMsg : '数据正在提交，请稍后...',
			success : function(fp, action) {
				var object = Ext.util.JSON.decode(action.response.responseText)
				gridPanel.save();
				slActualToCharge.savereload();
				Ext.ux.Toast.msg('操作信息', '保存信息成功!');
			},
			failure : function(fp, action) {
				Ext.MessageBox.show({
					title : '操作信息',
					msg : '信息保存出错，请联系管理员！',
					buttons : Ext.MessageBox.OK,
					icon : 'ext-mb-error'
				});
			}
		});

	}
});