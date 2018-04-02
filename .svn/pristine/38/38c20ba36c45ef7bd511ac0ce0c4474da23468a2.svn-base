/**
 * @author lisl
 * @description 小额贷款项目信息
 * @extends Ext.Panel
 */

SmallLoanProjectInfoEdit = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		SmallLoanProjectInfoEdit.superclass.constructor.call(this, {
			autoScroll : true,
			height : document.body.clientHeight - 280,
			tbar : this.toolbar,
			border : false,
			items : []
		});
	},
	initUIComponents : function() {
		var jsArr = [
				 __ctxPath + '/js/creditFlow/smallLoan/project/SlEarlyrepaymentRecordView.js',// 提前还款记录
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
			    __ctxPath + '/js/creditFlow/smallLoan/project/SlAlterAccrualRecordView.js',// 利率变更记录
			    __ctxPath + '/js/creditFlow/smallLoan/finance/SlSuperviseRecordListView.js',
			 //   __ctxPath + '/js/creditFlow/smallLoan/project/loadDataCommonCredit.js'// 加载数据JS
			    __ctxPath + '/js/creditFlow/smallLoan/project/loadDataCommon.js',// 加载页面表单数据JS
			    __ctxPath + '/js/creditFlow/agent/SeeBankCreditDetailWin.js',
			    __ctxPath+'/js/creditFlow/archives/projectArchives.js'
				]
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
		this.oppositeType = this.record.data.oppositeType;
		this.oppositeID = this.record.data.oppositeID;
		this.projectStatus = this.record.data.projectStatus;
		this.activityName = this.record.data.activityName;
		this.runId = this.record.data.runId;
		this.taskId = this.record.data.taskId;
		this.operationType = this.record.data.operationType;
		this.fundProjectId=this.record.data.id
		this.productId=this.record.data.productId
		this.businessType=this.record.data.businessType
		this.personId=this.record.data.oppositeID
		this.mainInfo = "";
		this.customerTitle = "客户信息";
		
		//项目基本信息
		this.projectInfo = new ExtUD.Ext.CreditLoanProjectInfoPanel({
			readOnly:false,
			product:true,
			isCPLX:true
		});
		
		//个人客户信息
		this.perMain1 = new ExtUD.Ext.CustomerInfoFastPanel({
			isEditPerson : true,
			isAllReadOnly:false,
			isViews:true,
			isRead:false,
			isHidden:true,
			isSpouseReadOnly: true,
			isNameReadOnly:true,
			isHiddenCustomerDetailBtn:false,
			loanId:this.loanId
		});
		
		//贷款账户信息
		this.bankAccountPanel=new ExtUD.Ext.BankAccountPanel({
			legalpersonid:this.personId,
			isReadOnly : false,
			projectId:this.projectId
		});
		
		//共同借款人信息
		this.borrowerInfo=new BorrowerInfo({
			projectId : this.projectId,
			isHidden : false,
			isHiddenAddBtn : false,
			isHiddenDelBtn:false
		});
		
		//借款需求
		this.LendForm = new LendForm({
			projectID : this.projectId,
			isAllReadOnly : false,
			isReadOnly:false
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
					}
				]
				
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
						 isEditEnterprise : false
					})
		}
	
		this.SlProcreditMaterialsView = new SlEnterPriseProcreditMaterialsView({
			projectId : this.projectId,
			businessType : this.businessType,
			isHidden:true,
			isHiddenArchive:false,
			isarchives:true,
			isHidden_materials : false,
			operationType : "SmallLoanBusiness"
		});
		/*//资金款项
		this.projectInfoFinance= new ownFund({
			isAllReadOnly:true,
			isReadOnly:true,
			isHiddencalculateBtn:true,
		 	projectId:this.projectId,
		 	isStartDateReadOnly:true,
			idDefinition:'tongyongliucheng1See'+this.taskId
		});
		this.gridPanel = new OwnFundIntentView({
			projectId : this.projectId,
			preceptId:this.fundProjectId,
			object : this.projectInfoFinance,
			isHiddenTitle:true,
			isHiddenAddBtn:true,
			isHiddenDelBtn:true,
			isHiddenExcel:false,
			isHiddenResBtn1:true,
			isHiddenseeqlideBtn:true,
			isHiddenseesumqlideBtn:true,
			isHiddenautocreateBtn:true,
			isFastOr:false,
			businessType : 'SmallLoan'
		});*/
		/*this.slActualToCharge = new SlActualToCharge({
			projId : this.projectId,
			businessType :'SmallLoan',
			isHiddenTitle:true,
			isHidden:true,
			productId : this.productId//小贷
			
		});*/
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
			isHiddenAddContractBtn:false,
			isHiddenDelContractBtn:false,
			isHiddenEdiContractBtn:false,
			isHiddenAddBtn:false,
			isHiddenDelBtn:false,
			isHiddenEdiBtn:false,
			isHiddenRelieve:false,
			
			isblHidden:false,
			isblEdit:false,
			isBl:false,
			isRecieveHidden:true,
			isgdHidden:true,
			formPanel:this.LendForm
		}),
		//保证担保
		this.baozMortgageView= new BaozMortgageView({
			projectId : this.projectId,
			titleText : '保证担保',
			businessType : this.businessType,
			isHiddenAddContractBtn:false,
			isHiddenDelContractBtn:false,
			isHiddenEdiContractBtn:false,
			isHiddenAddBtn:false,
			isHiddenDelBtn:false,
			isHiddenEdiBtn:false,
			isHiddenRelieve:false,
			isRecieveHidden:false,
			isblHidden:false,
			isblEdit:false,
			isBl:false,
			formPanel:this.LendForm
		})
		this.slContractView=new SlContractView({
		   	projectId:this.projectId,
		    bidPlanId:this.bidPlanId,
		    isHiddenAddBtn : false,
		    isHiddenDelBtn : false,
		    isHiddenEdiBtn : false,
		    isCreateContractHidden:false,
		    isAffixUpHidden: true,
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
	    	isHidden_report : false,
			hiddenUpLoad : false
		});
		
		this.SlEarlyrepaymentRecordView=new SlEarlyrepaymentRecordView({
				businessType : 'SmallLoan',
				projectId : this.projectId,
				fundProjectId:this.fundProjectId,
				oppositeType:this.oppositeType,
				projectStatus:this.projectStatus,
				isEditHidden:true
		})
		this.slSuperviseRecordListView=new SlSuperviseRecordListView({
			businessType : 'SmallLoan',
			projectId : this.projectId,
			fundProjectId:this.fundProjectId,
			projectRecord:this.record,
			isHidden:true
		})
		this.SlAlterAccrualRecordView=new SlAlterAccrualRecordView({
			businessType : 'SmallLoan',
			projectId : this.projectId,
			oppositeType:this.oppositeType,
			fundProjectId:this.fundProjectId,
			isEditHidden : true
		})
		
		
		//授信信息
		this.bankcredtiTongyong= new ExtUD.Ext.bankcredtiTongyong({
			personId :this.oppositeID,
			oppositeType:this.oppositeType,
			taskId:this.taskId,
			bianhaoReadOnly:false,//授信编号可读性
			disableIshidden:true, 
			shouxinreadOnly:true,
			isProductReadOnly:true,
			isAllReadOnly:false,
			isHiddencalculateBtn:true,
			isStartDateReadOnly:true,
			isHkReadOnly:false,
			isSomeReadOnly:true,
		 	projectId:this.projectId,
			idDefinition:'personLoanFlowEdit'+this.taskId 
		});
		
		//保证人信息
		this.bondPanel= new ExtUD.Ext.bondPanel({
			personId :this.oppositeID,
			oppositeType:this.oppositeType,
			baozhengrenTextReadOnly:false,//保证人控件可读性
			radioButtonDisable:true,//单选按钮可编辑性
			shouxinreadOnly:true,
			isProductReadOnly:true,
			isAllReadOnly:false,
			isHiddencalculateBtn:true,
			isStartDateReadOnly:true,
			isHkReadOnly:false,
			isSomeReadOnly:true,
		 	projectId:this.projectId,
			idDefinition:'personLoanFlowEdit'+this.taskId 
		});
		
		/*//资金款项
		this.projectInfoFinance= new ExtUD.Ext.newProjectInfoFinancePanel({
			isAllReadOnly:true,
			isAllReadOnly:true,
			isHiddencalculateBtn:true,
			isHkReadOnly:true,
			isStartDateReadOnly:true,
			isSomeReadOnly:true,
		 	projectId:this.projectId,
			idDefinition:'personLoanFlowEdit'+this.taskId 
		});*/
		//资金款项
		this.projectInfoFinance = new LoanTrialFormPanel({
			isModelHidden:false,
		   	isAllReadOnly:true,
		   	isMoneyReadOnly:true,
			isStartDateReadOnly:true,
			costEditor : true,
			typeCheck : true,
			radioType : true,
		 	projectId:this.projectId,
			idDefinition:'personLoanFlow'+this.taskId ,
			defineForm :'slSmallloanProject'
	    });
		//借款需求
		this.ExamineForm = new ExamineForm({
			projectID : this.projectId,
			isReadOnly:false
		});
		//联系人信息(配偶或直系亲属)   PersonRelation  VPersonRelationperson
		this.relationPersonInfo0 = new RelationPersonView({
			personIdValue:this.oppositeID,
			projectId:this.projectId,
			relationPersonType:575,
			flag:0,
			isHiddenAddBtn:false,
			isHiddenDelBtn:false,
			isHiddenEdiBtn:false
		});
		this.relationPersonInfo1 = new RelationPersonView({
			personIdValue:this.oppositeID,
			projectId:this.projectId,
			relationPersonType:577,
			flag:1,
			isHiddenAddBtn:false,
			isHiddenDelBtn:false,
			isHiddenEdiBtn:false
		});
		this.relationPersonInfo2 = new RelationPersonView({
			personIdValue:this.oppositeID,
			projectId:this.projectId,
			relationPersonType:576,
			flag:2,
			isHiddenAddBtn:false,
			isHiddenDelBtn:false,
			isHiddenEdiBtn:false
		});
		
		//财务服务费
		this.actualToChange = new SlActualToCharge({
			projId : this.projectId,
			businessType : 'SmallLoan',// 小贷
			editor:true,
			serviceHidden:true,
			isHidden : false,
			productId:this.productId,
			comboType2 : true
		});
		
		this.projectArchives= new projectArchives({
	      	readonly :false,
	      	projtoarchiveId :null,
	      	businessType : this.businessType,
		  	projectId : this.projectId
	    }).show();
	    
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
				autoHeight : true,
				collapsed:true
			},
			labelAlign : "right",
			items : [{
				xtype:'hidden',
				name:'slSmallloanProject.projectStatus'//添加它为了通过loadData前台赋值，保存时直接获取，否则报错 by gao
			},{
				title : '<a name="sl_projectInfo_edit' + this.projectId
						+ '"><font color="red">01</font>项目基本信息</a>',
				items : [this.projectInfo]
			},/*{
				title : '<a name="sl_bankcredtiTongyong_edit'+ this.projectId
						+ '"><font color="red">02</font>授信信息</a>',
				items : [this.bankcredtiTongyong]
			},{
				title : '<a name="sl_bondPanel_edit' + this.projectId
						+ '"><font color="red">03</font>保证金信息</a>',
				items : [this.bondPanel]
			},*/{
				title : '<a name="sl_customerInfo_edit' + this.projectId
						+ '"><font color="red">04</font>'+title+'</a>',
				items : [this.perMain]
			},{
				title : '<a name="sl_lendForm_edit' + this.projectId
						+ '"><font color="red">05</font>借款需求</a>',
				items : [this.LendForm]
			},{
				title : '<a name="sl_financeInfo_edit' + this.projectId
						+ '"><font color="red">06</font>资金款项信息</a>',
				name:'financeInfoFieldset',
				items : [this.projectInfoFinance]
			},/*{
				title : '<a name="sl_financeInfo_see' + this.projectId
						+ '"><font color="red">07</font>终审金额</a>',
				name:'financeInfoFieldset',
				items : [this.ExamineForm]
			},*/(this.oppositeType=="company_customer")?{xtype:'hidden'}:{
				title : '<a name ="sl_contactPersonInfo_edit'+ this.projectId
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
				title : '<a name="sl_actualToChange_edit' + this.projectId
						+ '"><font color="red">09</font>费用清单</a>',
				items : [this.actualToChange]
			},{
				title : '<a name="sl_procreditMaterials_edit' + this.projectId
						+ '"><font color="red">10</font>贷款材料清单</a>',
				items : [this.SlProcreditMaterialsView]
			},{
				title : '<a name="sl_procreditAssuretenet_edit' + this.projectId
						+ '"><font color="red">11</font>贷款必备条件</a>',
				items : [this.ourProcreditAssuretenetProductView]
			},{
				title : '<a name="sl_mortgage_edit' + this.projectId
						+ '"><font color="red">12</font>担保措施</a>',
				items : [this.dYMortgageViewProduct,this.baozMortgageView]
			},{
				title : '<a name="sl_report_edit' + this.projectId
						+ '"><font color="red">13</font>申请资料上传</a>',
				items : [this.SlReportView]
			},{
				title : '<a name="sl_superviseRecord_edit' + this.projectId
						+ '"><font color="red">14</font>展期记录</a>',
				items : [this.slSuperviseRecordListView]
			},{
				title : '<a name="sl_earlyrepaymentRecord_edit' + this.projectId
						+ '"><font color="red">15</font>提前还款记录</a>',
				items : [this.SlEarlyrepaymentRecordView]
			},{
				title : '<a name="sl_aflterAccrualRecord_edit' + this.projectId
						+ '"><font color="red">16</font>利率变更记录</a>',
				items : [this.SlAlterAccrualRecordView]
			},{
				title : '<a name="sl_loanContract_edit' + this.projectId
						+ '"><font color="red">17</font>借款合同</a>',
				items : [this.slContractView]
			},{
				title : '<a name="sl_projectGD_see' + this.projectId
						+ '"><font color="red">18</font>项目归档</a>',
				items : [this.projectArchives]
			},{
				xtype:'hidden',
			    id:'bankCreditId',
			    disabled:true,
			    value:null
			}]
		});
		this.loadData({
		
			url : __ctxPath + '/project/getSmallLoanProjectInfoSlSmallloanProject.do?slProjectId='+this.projectId,
			preName : ['enterprise', 'person', 'slSmallloanProject',
					'businessType',"enterpriseBank","spouse","financeInfo"],
			root : 'data',
			success : function(response, options) {
				var respText = response.responseText;
				var alarm_fields = Ext.util.JSON.decode(respText);
				
				if(alarm_fields.data.slSmallloanProject.bankCreditId==null){
					var isbankcredt=this.getCmpByName('isbankcredtiTongyong');
//					isbankcredt.fireEvent('change',isbankcredt);
				}
				if(alarm_fields.data.slSmallloanProject.baozhengjinId==null){
					var iscash=this.getCmpByName('iscashDepositTongyong');
//					iscash.fireEvent('change',iscash);
				}
					if(this.oppositeType=="person_customer"){
				// 个人客户授权人
				this.formPanel.getCmpByName('belongedName').setValue(alarm_fields.data.person.belongedName);
				this.ownerCt.ownerCt.getCmpByName('homelandProvince').setValue(alarm_fields.data.person.parentHomeland);
				if(alarm_fields.data.person.personSFZZUrl){
					this.getCmpByName('shenfenzheng-z').html=function(){
						return '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px;"><img src="'
								+ __ctxPath
								+ '/'
								+ alarm_fields.data.person.personSFZZUrl
								+ '" ondblclick=showPic("'
								+ alarm_fields.data.person.personSFZZUrl
								+ '") width =140 height=80  /></div>';
					}()
					
				}else{
					this.getCmpByName('shenfenzheng-z').html=function(){
						return '<img src="'+ __ctxPath+ '/images/nopic.jpg" width =140 height=80 />';
					}()
				}
				if(alarm_fields.data.person.personSFZFUrl){
					this.getCmpByName('shenfenzheng-f').html=function(){
						return '<div style="width:144px; height:84px; margin:10px 0px 0px 20px; padding:1px 1px 1px 1px;"><img src="'
								+ __ctxPath
								+ '/'
								+ alarm_fields.data.person.personSFZFUrl
								+ '" ondblclick=showPic("'
								+ alarm_fields.data.person.personSFZFUrl
								+ '") width =140 height=80  /></div>';
					}()
					
				}else{
					this.getCmpByName('shenfenzheng-f').html=function(){
						return '<img src="'+ __ctxPath+ '/images/nopic.jpg" width =140 height=80 />';
					}()
				}
//				this.ownerCt.ownerCt.getCmpByName('shenfenzheng-z').setValue(alarm_fields.data.person.personSFZZId);
//				this.ownerCt.ownerCt.getCmpByName('person.homeland').setValue(alarm_fields.data.person.homeland);
				}
				expandFieldSet(this.outPanel)
				this.getCmpByName('projectMoney1').setValue(Ext.util.Format.number(alarm_fields.data.slSmallloanProject.projectMoney, '0,000.00'))
				//this.getCmpByName('projectMoney2').setValue(Ext.util.Format.number(alarm_fields.data.slSmallloanProject.secondProjectMoney, '0,000.00'))
				this.gridPanel = new OwnFundIntentView({
					projectId : this.projectId,
					object : this.projectInfoFinance,
					isHiddenAddBtn:false,
					isHiddenDelBtn:false,
					isHiddenExcel:false,
					isHiddenResBtn1:false,
					isHiddenautocreateBtn:false,
					isHiddenseeqlideBtn:true,
					isHiddenseesumqlideBtn:true,
					isFastOr:true,
					isHidden1 : false,
					comboType : false,
					businessType : 'SmallLoan'
				});
				
				this.getCmpByName('financeInfoFieldset').add(this.gridPanel);
				this.getCmpByName('financeInfoFieldset').doLayout()
				
				//fillData(this,alarm_fields,'personLoanFlowEdit'+this.taskId);
				loanTrialLoadData(this,alarm_fields.data.slSmallloanProject,'personLoanFlow'+this.taskId);
				Ext.getCmp('bankCreditId').setValue(alarm_fields.data.bankCredit.id);
				
				if(alarm_fields.data.plProjectArchives){
					if(alarm_fields.data.plProjectArchives.isArchives==1){
						this.getCmpByName('isArchives').setValue(1);
					}
				}
			}
		});
		this.formPanel = new Ext.FormPanel();
		this.formPanel.add(this.outPanel);
		this.add(this.formPanel);
		this.doLayout();
	},// 初始化UI结束
	saveAllDatas : function() {
		var oppType = this.oppositeType;
		var vDates = "";
		var source = "";
		var borrowerInfo="";
		var oppType = this.oppositeType;
		var fundIntentJsonData = this.gridPanel.getGridDate();
		var gridPanel=this.gridPanel
		var  slActualToChargeJsonData = this.actualToChange.getGridDate();
		var slActualToCharge=this.actualToChange
		 if(this.oppositeType=="company_customer")
		        {
		           var eg=this.customerInfo.getCmpByName('gudong_store').get(0).get(1);
		           vDates=getGridDate(eg);
		           if(vDates!=""){
		              var arrStr=vDates.split("@");
					  for(var i=0;i<arrStr.length;i++){
						  var str=arrStr[i];
						  var object = Ext.util.JSON.decode(str)
						 if(object.personid==""){
							 Ext.ux.Toast.msg('操作信息','股东名称不能为空，请选择股东名称');
							 return;
						 }
						  if(object.shareholdertype==""){
								 Ext.ux.Toast.msg('操作信息','股东类别不能为空，请选择股东类别');
								 return;
							 }
					  }
				  }
				  var op=this.getCmpByName('person.id')
				  source = getSourceGridDate(this.repaymentSource.get(0));
				  var repaymentSource=this.repaymentSource
				  borrowerInfo=getBorrowerInfoData(this.borrowerInfo.get(0));
				  var borrowerInfoGrid=this.borrowerInfo.get(0)
				  var enterpriseBank=this.getCmpByName("enterpriseBank.id")
		        }else{/*
		        	var workCompany=this.getCmpByName('workCompany.id');
					var bpMoneyBorrowDemand=this.getCmpByName('bpMoneyBorrowDemand.borrowid');
					var personMarry=this.getCmpByName('person.marry');
					if(personMarry!=null && personMarry!="" && personMarry==317){
						var spouse=this.getCmpByName('spouse.spouseId')
					}
		        */}
		this.formPanel.getForm().submit({
			clientValidation : false,
			url : __ctxPath + '/project/saveSmallProjectInfoSlSmallloanProject.do',
			params : {
				"gudongInfo" : vDates,
				"fundIntentJsonData" : fundIntentJsonData,
				"chargeJson" : slActualToChargeJsonData,
				"fundProjectId":this.fundProjectId,
				"borrowerInfo" : borrowerInfo,
				"repaymentSource" : source
			},
			method : 'post',
			waitMsg : '数据正在提交，请稍后...',
			success : function(fp, action) {
				var object = Ext.util.JSON.decode(action.response.responseText)
				Ext.ux.Toast.msg('操作信息', '保存信息成功!');
				
				
				if (oppType == 'company_customer') {
					eg.getStore().reload();
					op.setValue(object.legalpersonid)
					repaymentSource.grid_RepaymentSource.getStore().reload();
					enterpriseBank.setValue(object.enterpriseBankId);
					
					borrowerInfoGrid.getStore().reload();
				}else{/*
					if(personMarry!=null && personMarry!="" && personMarry==317){
						spouse.setValue(object.spouseId)
					}
					workCompany.setValue(object.workCompanyId);
					bpMoneyBorrowDemand.setValue(object.borrowid);
				*/}
				
				gridPanel.save();
				slActualToCharge.savereload();
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