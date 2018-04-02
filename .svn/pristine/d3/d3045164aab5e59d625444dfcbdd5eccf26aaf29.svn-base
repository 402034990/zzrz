/**
 * @author lisl
 * @description 小额贷款结项
 * @extends Ext.Panel
 */
SlProjectFinished = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {debugger
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		SlProjectFinished.superclass.constructor.call(this, {
			id : 'SlProjectFinished_' + this.record.data.id,// id属性值前缀,通过是否包含"Edit"来区分查看和编辑页面
			title : "贷款结项-" + this.record.data.projectName,
			iconCls : '',
			tbar : this.toolbar,
			items : []
		});
	},
	initUIComponents : function() {
		var jsArr = [
				__ctxPath + '/js/creditFlow/report/SlReportView.js',
				__ctxPath + '/js/commonFlow/ExtUD.Ext.js',
				__ctxPath + '/js/creditFlow/smallLoan/quickenLoan/LendForm.js',//借款需求
				__ctxPath + '/js/creditFlow/smallLoan/quickenLoan/ExamineForm.js',//终审金额
				__ctxPath + '/js/creditFlow/customer/person/workcompany/workCompanyForm1.js',//个人所在公司信息
			    __ctxPath + '/js/creditFlow/customer/person/workcompany/workCompanyPrivateForm.js',//私营业主补填信息
			    __ctxPath + '/js/creditFlow/customer/person/person_branch_company.js',//个人旗下公司信息
			    __ctxPath + '/js/creditFlow/customer/person/relationPerson/RelationPersonView.js',//联系人信息
			    __ctxPath + '/js/creditFlow/finance/OwnFundIntentView.js',
			    __ctxPath+'/js/creditFlow/assuretenet/OurProcreditAssuretenetProductView.js',
			    __ctxPath+'/js/creditFlow/smallLoan/materials/OurProcreditMaterialsView.js',
			    __ctxPath + '/js/creditFlow/smallLoan/finance/BorrowerInfo.js',
			    __ctxPath + '/js/creditFlow/report/SlReportView.js',// 调查报告
			    __ctxPath + '/js/creditFlow/fund/project/ownFund.js',
			    __ctxPath+'/js/creditFlow/repaymentSource/RepaymentSource.js', //第一还款来源
			    __ctxPath + '/js/creditFlow/finance/SlActualToCharge.js',// 经办费用清单
			    __ctxPath + '/js/creditFlow/customer/person/relationPerson/RelationPersonView.js',//联系人信息
			    __ctxPath + '/js/creditFlow/smallLoan/project/loadDataCommon.js',// 加载页面表单数据JS
			    __ctxPath + '/js/creditFlow/agent/SeeBankCreditDetailWin.js',
			    __ctxPath + '/js/creditFlow/guarantee/materials/SlEnterPriseProcreditMaterialsView.js'
		];
		$ImportSimpleJs(jsArr, this.constructPanel, this);
		this.toolbar = new Ext.Toolbar({
			items : [{
				iconCls : 'btn-save',
				text : '提交',
				scope : this,
				handler : function() {
					var SlProjectId=this.record.data.projectId;
					var businessType = this.record.data.businessType;
					var fundProjectId=this.record.data.id
					var projectGridPanel=this.projectGridPanel
					Ext.Ajax.request({
						url : __ctxPath + '/project/loanFinishedSlSmallloanProject.do',
						params : {
							projectId : SlProjectId,
							businessType : businessType,
							fundProjectId:fundProjectId,
							fundType : 'principalRepayment'
						},
						method : 'post',
						success : function(resp, op) {
							var res = Ext.util.JSON.decode(resp.responseText);
							if (res.success) {
								Ext.ux.Toast.msg('信息提示', '结项成功');
								Ext.getCmp('centerTabPanel').remove('SlProjectFinished_'+ fundProjectId);//这个是关闭当前页面
								projectGridPanel.getStore().reload();
							}else{
								Ext.ux.Toast.msg('信息提示', '该项目有对账金额尚未结清,不能执行贷款结清操作！');
							}
							//ZW.refreshTaskPanelView();
						},
						failure : function() {
							Ext.ux.Toast.msg('信息提示', '出错，请联系管理员！');
						}
					})
				}
			}]
		})
	},// 初始化组件
	
	constructPanel : function() {
		this.businessType='SmallLoan';
		this.projectId = this.record.data.projectId;
		this.fundProjectId = this.record.data.id;
		this.oppositeType = this.record.data.oppositeType;//小贷项目用来判断是企业客户还是个人客户
		this.operationType = this.record.data.operationType;//用来判断是小贷项目还是微贷项目
		this.mainInfo = "";
		var isMicroLoan=true;
		
		//项目基本信息
		this.projectInfo = new ExtUD.Ext.CreditLoanProjectInfoPanel({
			readOnly:true,
			product:true,
			isCPLX:true,
			readOnly : true
		});
		
		//个人客户信息
		this.perMain1 = new ExtUD.Ext.CustomerInfoFastPanel({
			isEditPerson : false,
			isAllReadOnly:true,
			isRead:true,
			isHidden:true,
			isSpouseReadOnly: true,
			isNameReadOnly:true,
			isHiddenCustomerDetailBtn:false,
			loanId:this.loanId
		});
		
		//贷款账户信息
		this.bankAccountPanel=new ExtUD.Ext.BankAccountPanel({
			legalpersonid:this.personId,
			isReadOnly : true,
			projectId:this.projectId
		});
		
		//共同借款人信息
		this.borrowerInfo=new BorrowerInfo({
			projectId : this.projectId,
			isHidden : false,
			isHiddenAddBtn : true,
			isHiddenDelBtn:true
		});
		
		//借款需求
		this.LendForm = new LendForm({
			projectID : this.projectId,
			isAllReadOnly : true,
			isReadOnly:true
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
				}, {       
				    xtype : 'fieldset',
					title : '共同借款人信息',
					bodyStyle : 'padding-left:0px',
					collapsible : true,
					labelAlign : 'right',
					autoHeight : true,
					items : [this.borrowerInfo]
				}]
			})
			title="个人客户信息";
		} else if(this.oppositeType =="company_customer"){
			this.perMain = new  ExtUD.Ext.PeerMainInfoPanel({
				 projectId : this.projectId,
				 bussinessType:this.businessType,
				 isAllReadOnly : true,
				 isNameReadOnly:false,
				 isHidden : false,
				 isHiddenCustomerDetailBtn:true,
				 isEditEnterprise : false,
				 isReadOnly : true
			})
		}
	
		this.SlProcreditMaterialsView = new SlEnterPriseProcreditMaterialsView({
			projectId : this.projectId,
			businessType : this.businessType,
			isHidden:true,
			isHiddenArchive:false,
			isarchives:false,
			isHidden_materials : true,
			operationType : "SmallLoanBusiness"
		});
		
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
			isHiddenAddContractBtn:true,
			isHiddenDelContractBtn:true,
			isHiddenEdiContractBtn:true,
			isHiddenAddBtn:true,
			isHiddenDelBtn:true,
			isHiddenEdiBtn:true,
			isblHidden:false,
			isblEdit:false,
			isBl:false,
			isRecieveHidden:true,
			isRelieveEdit:true,//解除
			isHiddenRelieve:false,//是否解除
			isgdHidden:false,//是否已提交
			formPanel:this.LendForm
		}),
		//保证担保
		this.baozMortgageView= new BaozMortgageView({
			projectId : this.projectId,
			titleText : '保证担保',
			businessType : this.businessType,
			isHiddenAddContractBtn:true,
			isHiddenDelContractBtn:true,
			isHiddenEdiContractBtn:true,
			isHiddenAddBtn:true,
			isHiddenDelBtn:true,
			isHiddenEdiBtn:true,
			isHiddenRelieve:true,
			isRecieveHidden:true,
			isblEdit:true,
			isBl:true,//落实保证担保
			isblHidden:false,//是否落实
			isgdHidden:false,//是否已提交
			formPanel:this.LendForm
		})
		this.slContractView=new SlContractView({
		    projectId:this.fundProjectId,
		    isHiddenTbar:true,
		    contractUploadHidden:true,
		    isSignHidden:true,
		    isHiddenAffrim:true,
		    isHidden:false,
		    islcEdit:true,
	    	htType : 'loanContract',
	    	HTLX : 'loanContract',
		    businessType : this.businessType,
		    sprojectId:this.projectId,
		    isqsEdit:false,
		    isHiddenTbar:false
		});
		
		this.repaymentSource=new RepaymentSource({
			isHidden:true,
		    projectId:this.projectId
		})
		
		this.borrowerInfo=new BorrowerInfo({
			projectId : this.projectId,
			isHidden : true,
			isHiddenAddBtn : true,
			isHiddenDelBtn:true
		});
		
		this.SlReportView = new SlReportView({
			projectId : this.projectId,
			businessType : 'SmallLoan',
	    	isHidden_report : true
		});
		
		//授信信息
		this.bankcredtiTongyong= new ExtUD.Ext.bankcredtiTongyong({
			personId :this.personId,
			oppositeType:this.oppositeType,
			taskId:this.taskId,
			bianhaoReadOnly:true,//授信编号可读性
			disableIshidden:true, 
			shouxinreadOnly:true,
			isProductReadOnly:true,
			isAllReadOnly:true,
			isHiddencalculateBtn:true,
			isStartDateReadOnly:true,
			isHkReadOnly:false,
			isSomeReadOnly:true,
		 	projectId:this.projectId,
			idDefinition:'personLoanFlow'+this.taskId 
		});
		
		//保证人信息
		this.bondPanel= new ExtUD.Ext.bondPanel({
			personId :this.personId,
			oppositeType:this.oppositeType,
			baozhengrenTextReadOnly:true,//保证人控件可读性
			radioButtonDisable:true,//单选按钮可编辑性
			shouxinreadOnly:true,
			isProductReadOnly:true,
			isAllReadOnly:true,
			isHiddencalculateBtn:true,
			isStartDateReadOnly:true,
			isHkReadOnly:false,
			isSomeReadOnly:true,
		 	projectId:this.projectId,
			idDefinition:'personLoanFlow'+this.taskId 
		});
		
		//资金款项
		this.projectInfoFinance= new ExtUD.Ext.newProjectInfoFinancePanel({
			isAllReadOnly:true,
			isAllReadOnly:true,
			isHiddencalculateBtn:true,
			isHkReadOnly:true,
			isStartDateReadOnly:true,
			isSomeReadOnly:false,
		 	projectId:this.projectId,
			idDefinition:'personLoanFlowSee'+this.taskId 
		});
		
		//联系人信息(配偶或直系亲属)   PersonRelation  VPersonRelationperson
		this.relationPersonInfo0 = new RelationPersonView({
			personIdValue:this.personId,
			projectId:this.projectId,
			relationPersonType:575,
			flag:0,
			isHiddenAddBtn:true,
			isHiddenDelBtn:true,
			isHiddenEdiBtn:true
		});
		this.relationPersonInfo1 = new RelationPersonView({
			personIdValue:this.personId,
			projectId:this.projectId,
			relationPersonType:577,
			flag:1,
			isHiddenAddBtn:true,
			isHiddenDelBtn:true,
			isHiddenEdiBtn:true
		});
		this.relationPersonInfo2 = new RelationPersonView({
			personIdValue:this.personId,
			projectId:this.projectId,
			relationPersonType:576,
			flag:2,
			isHiddenAddBtn:true,
			isHiddenDelBtn:true,
			isHiddenEdiBtn:true
		});
		//借款需求
		this.ExamineForm = new ExamineForm({
			projectID : this.projectId,
			isReadOnly:true
		});
		//财务服务费
		this.actualToChange = new SlActualToCharge({
			projId : this.projectId,
			businessType : 'SmallLoan',// 小贷
			editor:false,
			serviceHidden:true,
			isHidden : true,
			productId:this.productId,
			comboType2 : false
		});
		
		//贷款结清文档
		this.LoanSettlementDocument=new SlReportView({
			businessType : 'SmallLoan',
			LBTemplate : 'LoanSettlement',
			projectId: this.projectId,
			isHidden:false,
			isHidden_report : false,
			titleText:'贷款结清文档'
		})
		this.outPanel = new Ext.Panel({
			frame : true,
			modal : true,
			labelWidth : 100,
			buttonAlign : 'center',
			layout : 'form',
			border : false,
			defaults : {
				anchor : '100%',
				xtype : 'fieldset',
				columnWidth : 1,
				collapsible : true,
				autoHeight : true,
				autoWidth : true
			},
			labelAlign : "right",
			items : [{
				title : '项目基本信息',
				items : [this.projectInfo]
			},{
				title : '授信信息',
				items : [this.bankcredtiTongyong]
			},{
				title : '保证金信息',
				items : [this.bondPanel]
			},{
				title : title,
				items : [this.perMain]
			},{
				title : '借款需求',
				items : [this.LendForm]
			},{
				title : '资金款项信息',
				name:'financeInfoFieldset',
				items : [this.projectInfoFinance]
			},{
				title : '终审金额',
				items : [this.ExamineForm]
			},(this.oppositeType=="company_customer")?{xtype:'hidden'}:{
				title : '联系人信息',
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
					title :'【联系人信息】工作证明人',
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
				title : '费用清单',
				items : [this.actualToChange]
			},{
				title : '贷款材料清单',
				items : [this.SlProcreditMaterialsView]
			},{
				title : '贷款必备条件',
				items : [this.ourProcreditAssuretenetProductView]
			},{
				title : '担保措施',
				items : [this.dYMortgageViewProduct,this.baozMortgageView]
			},{
				title : '申请资料上传',
				items : [this.SlReportView]
			},{
				title : '借款合同',
				items : [this.slContractView]
			}, {
				title : '贷款结清文档',
				items : [this.LoanSettlementDocument]
			}]

		});
		this.loadData({
			url : __ctxPath + '/project/getSmallLoanProjectInfoSlSmallloanProject.do?slProjectId='+this.projectId,
			preName : ['enterprise', 'person', 'slSmallloanProject',"enterpriseBank","spouse","financeInfo"],
			root : 'data',
			success : function(response, options) {
				var respText = response.responseText;
				var alarm_fields = Ext.util.JSON.decode(respText);
				
				if(alarm_fields.data.slSmallloanProject.bankCreditId==null){
					var isbankcredt=this.getCmpByName('isbankcredtiTongyong');
					isbankcredt.fireEvent('change',isbankcredt);
				}
				if(alarm_fields.data.slSmallloanProject.baozhengjinId==null){
					var iscash=this.getCmpByName('iscashDepositTongyong');
					iscash.fireEvent('change',iscash);
				}
				expandFieldSet(this.outPanel)
				this.getCmpByName('projectMoney1').setValue(Ext.util.Format.number(alarm_fields.data.slSmallloanProject.projectMoney, '0,000.00'))
				this.getCmpByName('projectMoney2').setValue(Ext.util.Format.number(alarm_fields.data.slSmallloanProject.secondProjectMoney, '0,000.00'))
				this.gridPanel = new OwnFundIntentView({
					projectId : this.projectId,
					object : this.projectInfoFinance,
					isHiddenAddBtn:true,
					isHiddenDelBtn:true,
					isHiddenExcel:true,
					isHiddenResBtn1:true,
					isHiddenautocreateBtn:true,
					isHiddenseeqlideBtn:true,
					isHiddenseesumqlideBtn:true,
					isFastOr:true,
					isHidden1 : true,
					comboType : true,
					businessType : 'SmallLoan'
				});
				
				this.getCmpByName('financeInfoFieldset').add(this.gridPanel);
				this.getCmpByName('financeInfoFieldset').doLayout()
				
				fillData(this,alarm_fields,'personLoanFlowSee'+this.taskId);
			}
		});
		this.add(this.outPanel);
		this.doLayout();
	}// 初始化UI结束
});