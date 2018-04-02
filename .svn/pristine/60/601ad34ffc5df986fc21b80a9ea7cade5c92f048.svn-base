/**
 * @author
 * @createtime
 * @class ArticleForm
 * @extends Ext.Window
 * @description Article表单
 * @company 智维软件
 */
SeeBankCreditDetailWin = Ext.extend(Ext.Window, {
	 oppositeType : 'person_customer',
	// 构造函数
	constructor : function(_cfg) {
		if (typeof(_cfg.taskId) != "undefined") {
			this.taskId = _cfg.taskId;
		}
		if (typeof(_cfg.id) != "undefined") {
			this.id = _cfg.id;
		}  
		if (typeof(_cfg.oppositeType) != "undefined") {
			this.oppositeType = _cfg.oppositeType;
		}
		if (typeof(_cfg.oppositeID) != "undefined") {
			this.oppositeID = _cfg.oppositeID;
		}
		 
		// 必须先初始化组件
		this.initUIComponents();
		SeeBankCreditDetailWin.superclass.constructor.call(this, {
			id : 'SeeBankCreditDetailWin',
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			frame:true,
			height:500,
			border : false,
			width : 1000,
			maximizable : true,
			title : '查看授信详细信息',
			buttonAlign : 'center'
		});
	},// 初始化组件
	initUIComponents : function() {
		
		var jsArr = [
				__ctxPath + '/js/commonFlow/ExtUD.Ext.js',//客户信息 项目基本信息
			    __ctxPath + '/js/creditFlow/smallLoan/quickenLoan/LendForm.js',//借款需求
			    __ctxPath + '/js/creditFlow/smallLoan/quickenLoan/ExamineForm.js',//借款需求
			    __ctxPath + '/js/creditFlow/customer/person/PersonFinanceInfo.js',//房产信息
			    __ctxPath + '/js/creditFlow/customer/person/workcompany/workCompanyForm1.js',//个人所在公司信息
			    __ctxPath + '/js/creditFlow/customer/person/workcompany/workCompanyPrivateForm.js',//私营业主补填信息
			    __ctxPath + '/js/creditFlow/customer/person/person_branch_company.js',//个人旗下公司信息
			    __ctxPath + '/js/creditFlow/customer/person/relationPerson/RelationPersonView.js',//联系人信息
			    __ctxPath + '/js/creditFlow/report/SlReportView.js',
			    __ctxPath + '/js/creditFlow/finance/SlActualToCharge.js',
			    __ctxPath+'/js/creditFlow/assuretenet/OurProcreditAssuretenetProductView.js',
			    __ctxPath+'/js/creditFlow/smallLoan/materials/OurProcreditMaterialsView.js',
			    __ctxPath+'/js/creditFlow/smallLoan/project/loadDataCommon.js',
			    __ctxPath + '/js/creditFlow/customer/enterprise/addEnterprise.js',
			    __ctxPath + '/js/creditFlow/guarantee/materials/SlEnterPriseProcreditMaterialsView.js',// 贷
			   	__ctxPath + '/js/creditFlow/smallLoan/materials/SlProcreditMaterialsView.js',// 贷款材料
				__ctxPath + '/js/commonFlow/NewProjectForm.js',
				__ctxPath + '/js/p2p/BpCustMemberForm.js',
				__ctxPath + '/js/creditFlow/report/SlReportViewSeeWin.js',
				__ctxPath + '/js/creditFlow/personrelation/netcheck/BpPersonNetCheckInfoView.js'//网审信息
		];
		$ImportSimpleJs(jsArr, this.formPanel, this);
		//授信项目基本信息
		this.bankCrditbaseInfo = new ExtUD.Ext.bankCreditInfo({
			xiangmujingli:true,
			wofangzhutiHiddenReadOnly:true,//我方主体的只读行
			wofangzhutiHidden:false,//我方主体的隐藏
			shouxinbianhaoHidden:false,
			shouxinleixingeditable:false,
			operationType:this.operationType,
			userType:this.userType,
			isProductReadOnly:this.isProductReadOnly,
			isAllReadOnly:true,
			isHiddernShop:true,
			shouxinleixingeditable:true,//授信类型可编辑性
			isProductReadOnly:true//授信类型的只读
		});
		//授信信息			
		this.bankcredtiMessage = new  ExtUD.Ext.bankcredtiPanel({
			bankCreditReadOnly:true
		});
		
		//抵质押物
		this.dYMortgageViewProduct=new DZYMortgageView({
			projectId :this.id,
//			projectId :61,
			titleText : '抵质押担保',
//			businessType : '$!businessType',
			businessType : 'BankCredit',
			isHiddenAddBtn:true,
			isHiddenDelBtn:true,
			isHiddenEdiBtn:true,
			isHiddenRelieve:true,
			isblHidden:false,
			isblEdit:false,
			isBl:true,
			isRecieveHidden:true,
			isgdHidden:true,
			formPanel:this.projectInfoFinance
		}),
		//保证担保
		this.baozMortgageView= new BaozMortgageView({
			projectId : this.id,
//			projectId : 61,
			titleText : '保证担保',
//			businessType : '$!businessType',
			businessType : 'BankCredit',
			isHiddenAddBtn:true,
			isHiddenDelBtn:true,
			isHiddenEdiBtn:true,
			isHiddenRelieve:false,
			isRecieveHidden:false,
			isblHidden:false,
			isblEdit:false,
			isBl:true,
			isgdHidden:true,
			formPanel:this.LendForm
		})
			//资料上传
		this.onceCheckReportView = new SlReportView({
			isHiddenAffrim_report:true,
			isHidden_report:true,
			hiddenDownLoad:true,//下载按钮不显示
			hiddenUpLoad:false,
			hiddenDownLoad:false,
			projectId : this.id,
//			projectId : this.projectId,
			businessType : 'SmallLoan',
			Template:'ReportTemplate',
			isHidden_report : true
		});
		//联系人信息(配偶或直系亲属)   PersonRelation  VPersonRelationperson
		this.relationPersonInfo0 = new RelationPersonView({
			personIdValue:this.oppositeID,
//			projectId:this.projectId,
			projectId:this.id,
			relationPersonType:575,
			flag:0,
			isHiddenAddBtn:true,
			isHiddenDelBtn:true,
			isHiddenEdiBtn:true
		});
		this.relationPersonInfo1 = new RelationPersonView({
			personIdValue:this.oppositeID,
//			projectId:this.projectId,
			projectId:this.id,
			relationPersonType:577,
			flag:1,
			isHiddenAddBtn:true,
			isHiddenDelBtn:true,
			isHiddenEdiBtn:true
		});
		this.relationPersonInfo2 = new RelationPersonView({
			personIdValue:this.oppositeID,
//			projectId:this.projectId,
			projectId:this.id,
			relationPersonType:576,
			flag:2,
			isHiddenAddBtn:true,
			isHiddenDelBtn:true,
			isHiddenEdiBtn:true
		});
		//合同
		this.slContractView=new SlContractView({
//		 	projectId:this.projectId,
			projectId:this.id,
		    bidPlanId:this.bidPlanId,
		    isHiddenAddBtn : true,
		    isCreateContractHidden:true,//合同制作按钮的显隐
		    isAffixUpHidden:true,
		    isHiddenDelBtn : true,
		    isHiddenEdiBtn : true,
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
		
		 
		 this.store = new Ext.data.GroupingStore({
					proxy : new Ext.data.HttpProxy({
//						url : __ctxPath
//								+ '/creditFlow/runListCreditProject.do?taskId='
//								+ this.taskId + '&filterableNodeKeys='
//								+ filterableNodeKeys// + this.safelevel// ,
								url : __ctxPath
								+ '/creditFlow/runListCreditProject.do?taskId='+this.taskId+'&filterableNodeKeys='+ filterableNodeKeys// + this.safelevel// ,
							// url : __ctxPath +
							// '/flow/processRunDetail.do?taskId='+ this.taskId
							// + "&safeLevel=3"// + this.safelevel// ,
							// nocache: true
						}),
					baseParams : {
						RunType : 1
					},
					reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',
								fields : ['activityName', 'creatorName',
										'status', 'createtime', 'endtime',
										'durTimes', 'comments', 'safeLevel','formId','taskSequenceNodeKey']
							}),
					remoteSort : true,
					groupField : 'taskSequenceNodeKey'
				});
		this.store.load();
		this.progressRunGridPanel = new Ext.grid.GridPanel({
			store :  this.store ,
			defaults : {
				anchor : '96%'
			},
			viewConfig : {
				forceFit : true,
				autoFill : true
			},
			stripeRows : true,
			autoExpandColumn : 'comments',
			border : true,
			name : "progressRunGridPanel",
			stateful : true,
			showPaging : false,
			autoHeight : true,
		//	plugins : this.expanderFlow,
			// collapsible: true,
			animCollapse : false,
			view : new Ext.grid.GroupingView({
				forceFit : true,
				groupTextTpl : '{text}'
			
			}),
			cm : new Ext.grid.ColumnModel({
				defaults : {
					width : 130,
					sortable : false
				},
				// columns : [this.expanderFlow, new Ext.grid.RowNumberer({
				columns : [new Ext.grid.RowNumberer({
									width : 30
								}), {
							id : 'activityName',
							header : '节点名称',
							width : 140,
							sortable : true,
							hidden : true,
							dataIndex : 'taskSequenceNodeKey',
							renderer : function(data, metadata, record, rowIndex, columnIndex, store){
	                    		return record.data.activityName
	                  	  }
						}, {
							header : '执行人',
							width : 70,
							dataIndex : 'creatorName',
							renderer : function(val) {
								if (val == null || val == 'null') {
									return '<span style="color:red;">暂无执行人</span>';
								} else {
									return val;
								}
							}
						}, {
							header : '开始时间',
							width : 136,
							// xtype : 'datecolumn',
							// format : 'M d, Y',
							dataIndex : 'createtime'
						}, {
							// xtype : 'datecolumn',
							// format : 'M d, Y',
							width : 136,
							header : '结束时间',
							dataIndex : 'endtime',
							renderer : function(val) {
								if (val == null || val == 'null') {
									return '';
								} else {
									return val;
								}
							}
						}, {
							header : '耗时',
							width : 145,
							dataIndex : 'durTimes',
							renderer : function(val) {
								var days = parseInt(val / 86400000);
								var hours = parseInt((val - days * 86400000)
										/ 3600000);
								var minute = parseInt((val - days * 86400000 - hours
										* 3600000)
										/ 60000);
								var second = (val - days * 86400000 - hours
										* 3600000 - minute * 60000)
										/ 1000;

								return '<span style="color:gray;">' + days
										+ '天' + hours + '小时' + minute + '分'
										+ second + '秒' + '</span>';;

							}
						}, {
							header : '意见与说明',
							width : 300,
							dataIndex : 'comments',
							renderer : function(value, metadata, record,
									rowIndex, colIndex) {
								// var safeLevel=record.data.safeLevel;
								// var activityName=record.data.activityName;

								/*
								 * if(safeLevel==3&&level!=3&&"总裁审批"!=activityName&&"审保会决议确认"!=activityName){
								 * return '您无权查看该意见与说明!'; }else
								 */
								if (value == null || value == ''
										|| value == 'null') {
									return '';
								} else {
									metadata.attr = 'style="white-space:normal;"';
									re = /u000a/g; // 创建正则表达式模式。
									r = value.replace(re, "<br>"); // 用"<br>"替换"\n"。
									return (r);// 返回替换后的字符串。
								}
								/*
								 * var safeLevel=record.data.safeLevel; var
								 * activityName=record.data.activityName;
								 * metadata.attr =
								 * 'style="white-space:normal;"';
								 * if(safeLevel==3&&level!=3&&"总裁审批"!=activityName&&"审保会决议确认"!=activityName){
								 * return '您无权查看该意见与说明!'; }else{ re = /u000a/g; //
								 * 创建正则表达式模式。 r = value.replace(re, "<br>"); //
								 * 用 "<br>"替换 "\n"。 return (r);// 返回替换后的字符串。 }
								 */
							}
						}, {
							header : '审批状态',
							align : "center",
							width : 70,
							dataIndex : 'status',
							renderer : function(val) {
								if (val == 1) {
									return '<span style="color:green;">审批通过</span>';
								} else if (val == -1) {
									return '<span style="color:red;">驳回</span>';
								} else if (val == 2) {
									return '<span style="color:orange;">流程跳转</span>';
								} else if (val == 3) {
									return '<span style="color:red;">打回重做</span>';
								} else if (val == 4) {
									return '<span style="color:red;">任务追回</span>';
								} else if (val == 5) {
									return '<span style="color:orange;">任务换人</span>';
								} else if (val == 6) {
									return '<span style="color:orange;">项目换人</span>';
								} else if (val == 7) {
									return '<span style="color:orange;">项目完成</span>';
								}
								return "未审批";
							}
						}]
			})
		});
		
		  this.bigprogressRunGridPanel = new Ext.form.FieldSet({
			layout : 'form',
			autoHeight : true,
			collapsed : false,
			collapsible : true,
			name : 'commentsRecords',
			title : "任务处理历史",
			items : [this.progressRunGridPanel]
		})
		this.formPanel = new Ext.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			frame:true,
			// id : 'ArticleForm',
			defaults : {
				anchor : '100%'
			},
			defaultType : 'textfield',
			items:[{
				xtype : 'fieldset',
				name:'projectInfo',
				title : '项目基本信息 ',
				collapsible : true,
				autoHeight : true,
				labelAlign : 'right',
				collapsed : false,
				items : [this.bankCrditbaseInfo]
			} ,{
				xtype : 'fieldset',
				title : this.oppositeType =='person_customer'?"个人客户信息":"企业客户信息",
				bodyStyle : 'padding-left:0px',
				collapsible : true,
				labelAlign : 'right',
				autoHeight : true,
				items : [
					this.oppositeType=='person_customer'?new SeeBankPeerPersonMainInfoPanel({}):new SeebankCreditMainInfoPanel({})
				]
			},{
				xtype : 'fieldset',
				name:'bankcredtiMessage',
				title : '授信信息 ',
				collapsible : true,
				autoHeight : true,
				labelAlign : 'right',
				collapsed : false,
				items : [this.bankcredtiMessage]
			},
				{
				xtype : 'fieldset',
				title :'担保措施',
				bodyStyle : 'padding-left:0px',
				collapsible : true,
				labelAlign : 'right',
				autoHeight : true,
				//collapsed : true,
				items : [this.dYMortgageViewProduct,this.baozMortgageView]
			},{
				xtype : 'fieldset',
				title :'申请资料上传',
				bodyStyle : 'padding-left:0px',
				collapsible : true,
				labelAlign : 'right',
				autoHeight : true,
				//collapsed : true,
				items : [this.onceCheckReportView]
			},
				{
				xtype : 'fieldset',
				title :'联系人信息',
				bodyStyle : 'padding-left:0px',
				collapsible : true,
				labelAlign : 'right',
				autoHeight : true,
				collapsed : false,
				items :[{
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
			}, {
				xtype : 'fieldset',
				title :'授信合同',
				bodyStyle : 'padding-left:0px',
				collapsible : true,
				labelAlign : 'right',
				autoHeight : true,
				collapsed : false,
				name : 'contractView',
				items : [this.slContractView]
			} , this.bigprogressRunGridPanel
			]
		});
		this.formPanel.loadData({
 
//			url : __ctxPath + '/agentAproval/getInfoBankCredit.do?slProjectId='+this.projectId+'&slTaskId='+this.taskId+"&isOnlineApply="+this.isOnlineApply,			
 
			url : __ctxPath + '/agentAproval/getInfoBankCredit.do?slProjectId='+this.id+'&slTaskId='+this.taskId,			
 
			method : "POST",
			preName : ['person','bankCredit', 'slSmallloanProject','bpProductParameter','workCompany','bpMoneyBorrowDemand','creditRating',"enterpriseBank"],
			root : 'data'
//			success : function(response, options) {
//				var respText = response.responseText;
//				var alarm_fields = Ext.util.JSON.decode(respText);
////				expandFieldSet(this.formPanel)
//				var  cashzhanyong =  alarm_fields.data.cashzhanyong;
//				if(cashzhanyong == null ||  cashzhanyong=="" || cashzhanyong=='undefined'){
//				 	this.getCmpByName('cashDeposit.cashzhanyong').setValue(0)
//				}else{
//					this.getCmpByName('cashDeposit.cashzhanyong').setValue(Ext.util.Format.number(cashzhanyong, '0,000.00'))
//				}
//				var  cashshengyu =  alarm_fields.data.cashshengyu;
//				
//				if(cashshengyu == null || cashshengyu==""||cashshengyu=='undefined'){
//				 	this.getCmpByName('cashDeposit.cashshengyu').setValue(0)
//				}else{
//					this.getCmpByName('cashDeposit.cashshengyu').setValue(Ext.util.Format.number(cashshengyu, '0,000.00'))
//				}
//				
//				
////				this.getCmpByName('creditMoney1').setValue(Ext.util.Format.number(alarm_fields.data.bankCredit.creditMoney, '0,000.00'))
//////				this.getCmpByName('slSmallloanProject.projectMoney1').setValue(Ext.util.Format.number(alarm_fields.data.slSmallloanProject.projectMoney, '0,000.00'))
////				fillData(this,alarm_fields,'personLoanFlow'+this.taskId);
//			}
			
			
		});
//		this.add(this.formPanel);
		this.doLayout();
//		this.formPanel.on('render', this.onGetTaskInfo.call(this,this.taskId));
	}
	
//	onGetTaskInfo : function(taskId){
//		Ext.Ajax.request({
//			url : __ctxPath + "/creditFlow/getTaskInfoCreditProject.do",
//			method : 'POST',
//			scope:this,
//			success : function(response, request) {
//				obj = Ext.util.JSON.decode(response.responseText);
//				var projectName = obj.data.projectName;
//				var createTime = obj.data.createTime;
//				var dueTime = obj.data.dueTime;
//				var creator = obj.data.creator;
//				if(obj.success==true){
//					this.ownerCt.ownerCt.getCmpByName('commentsRecords').setTitle('任务处理历史【任务分配时间：'+createTime+'&nbsp;&nbsp;任务完成时限：'+dueTime+'&nbsp;&nbsp;当前处理人：'+creator+'】');
//				}else{
//					Ext.ux.Toast.msg('操作信息', '查询任务完成时限操作失败!');
//				}
//			},
//			failure : function(response,request) {
//				Ext.ux.Toast.msg('操作信息', '查询任务完成时限操作失败!');
//			},
//			params : {
////				taskId : taskId,
//				taskId : 8460090,
//				businessType : '$!businessType',
////				projectId:'$!projectId'
//					projectId:61
//			}
//		});
//	}
});


// 小贷节点页面个人基本信息
SeeBankPeerPersonMainInfoPanel = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this, _cfg);
		ExtUD.Ext.PeerPersonMainInfoPanel.superclass.constructor.call(this, {
			items : [{
				columnWidth : 1,
				layout : "form",
				style : 'padding-left:17px',
				scope : this,
				items : [{
					layout : "form", // 从上往下的布局
					xtype : 'fieldset',
					title : '客户基本信息',
					items : [{
						layout : "column",
						defaults : {
							anchor : '100%',
							// columnWidth : 1,
							isFormField : true,
							labelWidth : 75
						},
						items : [{
									xtype : 'hidden',
									name : 'person.id'
								}, {
									columnWidth : .33, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
										xtype : 'combo',
										triggerClass : 'x-form-search-trigger',
										fieldLabel : "客户姓名",
										name : "person.name",
										// readOnly : true,
										readOnly : true,
										allowBlank : false,
										editable : false,
										blankText : "客户名称不能为空，请正确填写!",
										anchor : "100%",
										resizable : true,
										mode : 'romote',
										// editable : false,
										lazyInit : false,
										typeAhead : true,
										minChars : 1,
										triggerAction : 'all'
									}]
								},

								 {
									 columnWidth : .33, // 该列在整行中所占的百分比
									 layout : "form", // 从上往下的布局
									 labelWidth : 70,
									 items : [{
											 xtype : "textfield",
											 fieldLabel : "客户编号",
											 name : "person.personNumber",
											 readOnly : true,
											 anchor : "99%"
									 }]
								 },
																	
								{
									columnWidth : .33, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
										fieldLabel : "客户性别",
										xtype : "diccombo",
										hiddenName : 'person.sex',
										readOnly : true,
										itemName : '性别', // xx代表分类名称
										allowBlank : false,
										emptyText : "请选择",
										editable : false,
										blankText : "性别不能为空，请正确填写!",
										anchor : "100%"
									}]
								}, {
									columnWidth : .33, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
										xtype : "diccombo",
										hiddenName : "person.marry",
										fieldLabel : "婚姻状况",
										itemName : '婚姻状况', // xx代表分类名称
										allowBlank : false,
										editable : false,
										readOnly :true,
										blankText : "婚姻状况不能为空，请正确填写!",
										anchor : "100%"
										 
									}]
								}, {
									columnWidth : .33, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
										xtype : "diccombo",
										hiddenName : "person.cardtype",
										itemName : '证件类型', // xx代表分类名称
										fieldLabel : "证件类型",
										readOnly : true,
										allowBlank : false,
										editable : false,
										emptyText : "请选择",
										blankText : "证件类型不能为空，请正确填写!",
										anchor : "100%",
										listeners : {
											scope : this,
											afterrender : function(combox) {
												combox.clearInvalid();
												var st = combox.getStore();
												st.on("load", function() {
															combox
																	.setValue(combox
																			.getValue());
														})
											}
										}

									}]
								}, {
									columnWidth : .33, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
										xtype : "textfield",
										name : "person.cardnumber",
										allowBlank : false,
										fieldLabel : "证件号码",
										readOnly : true,
										blankText : "证件号码不能为空，请正确填写!",
										anchor : "100%"
										 
									}]
								}, {
									columnWidth : .33, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
												xtype : "textfield",
												fieldLabel : "手机号码",
												name : "person.cellphone",
												allowBlank : false,
												readOnly : true,
												anchor : "100%",
												regex : /^[1][34578][0-9]{9}$/,
												regexText : '手机号码格式不正确'
											}]
								}, {
									columnWidth : .33, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
												xtype : "textfield",
												name : "person.postcode",
												fieldLabel : "邮政编码",
												readOnly :true,
												blankText : "邮政编码不能为空，请正确填写!",
												regex : /^[0-9]{6}$/,
												regexText : '邮政编码格式不正确',
												anchor : "100%"
											}]
								}, {
									columnWidth : .33, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{
										xtype : "textfield",
										name : "person.selfemail",
										fieldLabel : "电子邮箱",
										anchor : "100%",
										readOnly :true,
										regex : /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
										regexText : '电子邮箱格式不正确'
									}]
								}, {
									columnWidth : 1,
									layout : "form", // 从上往下的布局
									labelWidth : 70,
									items : [{ // 上面是第三行
										xtype : "textfield",
										fieldLabel : "通讯地址",
										readOnly : true,
										allowBlank : false,
										name : "person.postaddress",
										anchor : "99%"// 控制文本框的长度

									}]
								}, {
									columnWidth : .33,
									layout : 'form',
									labelWidth : 70,
									labelAlign : 'right',
									hidden :true,
									items : [{
										xtype : "dickeycombo",
										hiddenName : "person.archivesBelonging",
										nodeKey : 'archivesBelonging', // xx代表分类名称
										fieldLabel : "档案归属地",
										readOnly : this.isRead,
										editable : false,
										anchor : "100%"
										 

									}]
								}]
					}]
				}]
			}, {
				columnWidth : .1, // 该列在整行中所占的百分比
				layout : "form", // 从上往下的布局
				style : 'padding-left:17px',
				items : [{
					layout : "form", // 从上往下的布局
					xtype : 'fieldset',
					hidden : true,
					title : '贷款账户信息',
					items : [{
						layout : "column",
						defaults : {
							anchor : '95%',
							columnWidth : 1,
							isFormField : true,
							labelWidth : 70
						},
						items : [{
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 70,
							items : [{
								xtype : 'combo',
								mode : 'local',
								displayField : 'name',
								valueField : 'id',
								editable : false,
								anchor : "100%",
								store : new Ext.data.SimpleStore({
											fields : ["name", "id"],
											data : [["个人", "0"], ["公司", "1"]]
										}),
								triggerAction : "all",
								hiddenName : "enterpriseBank.openType",
								fieldLabel : '开户类型',
								allowBlank : true,
								readOnly : true,
								hidden : this.isHidden,
								hideLabel : this.isHidden,
								name : 'enterpriseBank.openType',
								listeners : {
									scope : this,
									afterrender : function(combox) {
										var st = combox.getStore();
										combox.setValue(st.getAt(0).data.id);
										combox.fireEvent("select", combox, st
														.getAt(0), 0);
									},
									select : function(combox, record, index) {
										var v = record.data.id;
										var obj = this
												.getCmpByName('enterpriseBank.accountType');
										obj.enable();
										obj.setValue();
										obj.store.removeAll()
										if (v == 0) {
											arrStore = new Ext.data.SimpleStore(
													{
														fields : ["name", "id"],
														data : [["个人储蓄户", "0"],
																["基本户", "1"],
																["一般户", "2"]]
													});
											obj.store.insert(0, arrStore
															.getAt(0));
										} else {
											arrStore = new Ext.data.SimpleStore(
													{
														fields : ["name", "id"],
														data : [["个人储蓄户", "0"],
																["基本户", "1"],
																["一般户", "2"]]
													});
											obj.store.insert(0, arrStore
															.getAt(1));
											obj.store.insert(1, arrStore
															.getAt(2));
										}
									}

								}
							}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 70,
							items : [{
								xtype : 'combo',
								mode : 'local',
								displayField : 'name',
								valueField : 'id',
								editable : false,
								width : 70,
								triggerAction : "all",
								hiddenName : "enterpriseBank.accountType",
								fieldLabel : '账户类型',
								allowBlank : true,
								readOnly : true,
								hidden :false,
								hideLabel : false,
								store : new Ext.data.SimpleStore({
											fields : ["name", "id"],
											data : [["个人储蓄户", "0"],
													["基本户", "1"], ["一般户", "2"]]
										}),
								name : 'enterpriseBank.accountType',
								anchor : "100%"
							}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 70,
							items : [{
										fieldLabel : '开户名称',
										name : 'enterpriseBank.name',
										xtype : 'textfield',
										readOnly : true,
										hidden : false,
										hideLabel : false,
										allowBlank : true,
										anchor : "100%"
									}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 70,
							items : [{
										xtype : 'textfield',
										fieldLabel : '账号',
										hidden :false,
										hideLabel : false,
										allowBlank : true,
										name : 'enterpriseBank.accountnum',
										readOnly : true,
										anchor : "100%"
									}]
						}, {
							columnWidth : .33,
							layout : 'form',
							labelWidth : 70,
							items : [{
										name : 'enterpriseBank.id',
										xtype : 'hidden'
									}, {
										fieldLabel : "银行名称",
										xtype : "combo",
										displayField : 'itemName',
										valueField : 'itemId',
										triggerAction : 'all',
										allowBlank : true,
										readOnly : true,
										hidden : false,
										hideLabel :false,
										store : new Ext.data.ArrayStore({
											url : __ctxPath
													+ '/creditFlow/common/getBankListCsBank.do',
											fields : ['itemId', 'itemName'],
											autoLoad : true
										}),
										mode : 'remote',
										hiddenName : "enterpriseBank.bankid",
										editable : false,
										blankText : "银行名称不能为空，请正确填写!",
										anchor : "100%",
										listeners : {
											scope : this,
											afterrender : function(combox) {
												var st = combox.getStore();
												st.on("load", function() {
															combox
																	.setValue(combox
																			.getValue());

														})
												combox.clearInvalid();
											}

										}

									}]
						}, {
							columnWidth : .34,
							layout : 'form',
							items : [{
										fieldLabel : "网点名称",
										name : 'enterpriseBank.bankOutletsName',
										xtype : 'textfield',
										allowBlank : true,
										readOnly : true,
										hidden : false,
										hideLabel : false,
										anchor : "100%"

									}]
						}, {
							columnWidth : .33,
							layout : 'form',
							items : [{
										name : 'enterpriseBank.areaId',
										xtype : 'hidden'
									}, {
										// id:'bankName',
										name : 'enterpriseBank.areaName',
										hiddenName : 'enterpriseBank.areaName',
										fieldLabel : '开户地区',
										anchor : '100%',
										// value : '中国银行',
										// submitValue:false,
										xtype : 'trigger',
										triggerClass : 'x-form-search-trigger',
										editable : false,
										allowBlank : true
//										readOnly : this.isReadOnly,
//										hidden : this.isHidden,
//										hideLabel : this.isHidden,
									}]
						}]
					}]
				}]
			}]
		});
	}
})


SeebankCreditMainInfoPanel = Ext.extend(Ext.Panel, {
	layout : "form",
	border : false,
	autoHeight : true,
	labelAlign : 'right',
//	projectId : null,
//	isAllReadOnly : true,
//	bussinessType : null,
//	isHideGudongInfo : false,
//	isLoadShareequity : false,
//	isHiddenCustomerDetailBtn : false,
//	isEditEnterprise : false,
//	isEnterpriseNameReadOnly : true,
//	isNewProjectFormId : null,
	isGudongDiseditable : true,// 高庆瑞新加,与isAllReadOnly相与，不影响之前配置的
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
//		if (typeof(_cfg.title) != "undefined") {
//			this.title = _cfg.title;
//		}
//		if (typeof(_cfg.isAllReadOnly) != "undefined") {
//			this.isAllReadOnly = _cfg.isAllReadOnly;
//		}
//		if (typeof(_cfg.bussinessType) != "undefined") {
//			this.bussinessType = _cfg.bussinessType;
//		}
//		if (typeof(_cfg.isEnterpriseNameReadOnly) != "undefined") {
//			this.isEnterpriseNameReadOnly = _cfg.isEnterpriseNameReadOnly;
//		}
//		if (typeof(_cfg.isNewProjectFormId) != "undefined") {
//			this.isNewProjectFormId = _cfg.isNewProjectFormId;
//		}
//		if (typeof(_cfg.projectId) != "undefined") {
//			this.projectId = _cfg.projectId;
//			this.isLoadShareequity = true;
//			this.isEnterpriseShortNameReadonly = true;
//		}
//		if (_cfg.isHideGudongInfo) {
//			this.isHideGudongInfo = _cfg.isHideGudongInfo;
//		}
//		if (_cfg.isEnterprisenameReadonly) {
//			this.isEnterprisenameReadonly = _cfg.isEnterprisenameReadonly;
//		}
//		if (_cfg.isEnterpriseShortNameReadonly) {
//			this.isEnterpriseShortNameReadonly = _cfg.isEnterpriseShortNameReadonly;
//		}
//		if (_cfg.isHiddenCustomerDetailBtn) {
//			this.isHiddenCustomerDetailBtn = _cfg.isHiddenCustomerDetailBtn;
//		}
//		if (typeof(_cfg.isEditEnterprise) != "undefined") {
//			this.isEditEnterprise = _cfg.isEditEnterprise;
//		}
//		if (typeof(_cfg.isGudongDiseditable) != 'undefined') {
//			this.isGudongDiseditable = _cfg.isGudongDiseditable;
//		}
		Ext.applyIf(this, _cfg);
		var bankAreaRootControl = false;
		if (_cfg.bankAreaRootControl) {
			bankAreaRootControl = _cfg.bankAreaRootControl;
		}
		var leftlabel = 100;
		var rightlabel = 90
		var formPanelId = this.formPanelId;
		var createNewSLFunctionForm = this.createNewSLFunctionForm;
		ExtUD.Ext.PeerMainInfoPanel.superclass.constructor.call(this, {
			items : [{
				layout : "column", // 定义该元素为布局为列布局方式
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true
				},
				border : false,
				scope : this,
				items : [{
					bodyStyle : 'padding-right:10px',
					columnWidth : .6, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'fieldset',
						title : '基本信息',
						layout : "column",
						defaults : {
							anchor : '100%',
							columnWidth : 1,
							isFormField : true,
							labelWidth : leftlabel
						},
						items : [{
							columnWidth : 1, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							items : [{
										xtype : 'hidden',
										name : 'enterprise.id'
									}, {
										xtype : 'combo',
										anchor : '100%',
										triggerClass : 'x-form-search-trigger',
										fieldLabel : "企业名称",
										name : "enterprise.enterprisename",
										readOnly : true,
										blankText : "企业名称不能为空，请正确填写!",
										allowBlank : false,
										scope : this,
										onTriggerClick : function() {
//											var op = this.ownerCt.ownerCt.ownerCt.ownerCt;
//											var EnterpriseNameStockUpdateNew = function(
//													obj) {
//												op
//														.getCmpByName('enterprise.enterprisename')
//														.setValue("");
//												op
//														.getCmpByName('enterprise.id')
//														.setValue("");
//												op
//														.getCmpByName('enterprise.enterpriseNumber')
//														.setValue("");
//												op
//														.getCmpByName('enterprise.area')
//														.setValue("");
//												op
//														.getCmpByName('enterprise.cciaa')
//														.setValue("");
//												op
//														.getCmpByName('enterprise.organizecode')
//														.setValue("");
//												op
//														.getCmpByName('enterprise.telephone')
//														.setValue("");
//												op
//														.getCmpByName('enterprise.postcoding')
//														.setValue("");
//												op
//														.getCmpByName('enterprise.hangyeType')
//														.setValue("");
//												op
//														.getCmpByName('enterprise.hangyeName')
//														.setValue("");
//												op
//														.getCmpByName('enterprise.documentType')
//														.setValue("");
//												op
//														.getCmpByName('enterprise.taxnum')
//														.setValue("");
//												op.getCmpByName('person.id')
//														.setValue("");
//												op.getCmpByName('person.name')
//														.setValue("");
//												op.getCmpByName('person.sex')
//														.setValue("");
//												op
//														.getCmpByName('person.cardtype')
//														.setValue("");
//												op
//														.getCmpByName('person.cardnumber')
//														.setValue("");
//												op
//														.getCmpByName('person.cellphone')
//														.setValue("");
//												op
//														.getCmpByName('person.selfemail')
//														.setValue("");
//
//												if (obj.enterprisename != 0
//														&& obj.enterprisename != "")
//													op
//															.getCmpByName('enterprise.enterprisename')
//															.setValue(obj.enterprisename);
//												if (obj.id != 0 && obj.id != "")
//													op
//															.getCmpByName('enterprise.id')
//															.setValue(obj.id);
//												if (obj.enterpriseNumber != 0
//														&& obj.enterpriseNumber != "")
//													op
//															.getCmpByName('enterprise.enterpriseNumber')
//															.setValue(obj.enterpriseNumber);
//												if (obj.area != 0
//														&& obj.area != "")
//													op
//															.getCmpByName('enterprise.area')
//															.setValue(obj.area);
//												if (obj.cciaa != 0
//														&& obj.cciaa != "")
//													op
//															.getCmpByName('enterprise.cciaa')
//															.setValue(obj.cciaa);
//												if (obj.organizecode != 0
//														&& obj.organizecode != "")
//													op
//															.getCmpByName('enterprise.organizecode')
//															.setValue(obj.organizecode);
//												if (obj.telephone != 0
//														&& obj.telephone != "")
//													op
//															.getCmpByName('enterprise.telephone')
//															.setValue(obj.telephone);
//
//												if (obj.postcoding != 0
//														&& obj.postcoding != "")
//													op
//															.getCmpByName('enterprise.postcoding')
//															.setValue(obj.postcoding);
//												if (obj.hangyetype != 0
//														&& obj.hangyetype != "") {
//													op
//															.getCmpByName('enterprise.hangyeType')
//															.setValue(obj.hangyetype);
//													op .getCmpByName('enterprise.hangyeName') .setValue(obj.hangyetypevalue);
//												}
//
//												if (obj.documentType != 0 && obj.documentType != "") {
//													op .getCmpByName('enterprise.documentType') .setValue(obj.documentType);
//													var combo = op .getCmpByName('enterprise.organizecode');
//													if (obj.documentType == 1) {
//														var a = combo.el .parent() .parent() .first();
//														combo.allowBlank = false;
//														a.dom.innerHTML = "<font color='red'>*</font>社会信用代码";
//														combo.fieldLabel = '社会信用代码';
//														op
//																.findById('cciaa11')
//																.setVisible(false);
//														op
//																.findById('taxnum11')
//																.setVisible(false);
//													} else {
//														var a = combo.el
//																.parent()
//																.parent()
//																.first();
//														combo.allowBlank = false;
//														a.dom.innerHTML = "<font color='red'>*</font>组织机构代码";
//														combo.fieldLabel = '组织机构代码';
//														op
//																.findById('cciaa11')
//																.setVisible(true);
//														op
//																.findById('taxnum11')
//																.setVisible(true);
//													}
//												}
//												if (obj.taxnum != 0
//														&& obj.taxnum != "")
//													op
//															.getCmpByName('enterprise.taxnum')
//															.setValue(obj.taxnum);
//												Ext.Ajax.request({
//													url : __ctxPath
//															+ '/creditFlow/customer/person/seeInfoPerson.do',
//													method : "post",
//													params : {
//														id : obj.legalpersonid
//													},
//													success : function(d) {
//
//														var c = Ext.util.JSON
//																.decode(d.responseText);
//														var id = c.data.id;
//														var name = c.data.name;
//														var sex = c.data.sex;
//														var cardtype = c.data.cardtype;
//														var cardnumber = c.data.cardnumber;
//														var cellphone = c.data.cellphone;
//														var selfemail = c.data.selfemail;
//														if (id != 0 && id != "")
//															op
//																	.getCmpByName('person.id')
//																	.setValue(id);
//														if (name != 0
//																&& name != "")
//															op
//																	.getCmpByName('person.name')
//																	.setValue(name);
//														if (sex != 0
//																&& sex != "")
//															op
//																	.getCmpByName('person.sex')
//																	.setValue(sex);
//														if (cardtype != 0
//																&& cardtype != "")
//															op
//																	.getCmpByName('person.cardtype')
//																	.setValue(cardtype);
//														if (cardnumber != 0
//																&& cardnumber != "")
//															op
//																	.getCmpByName('person.cardnumber')
//																	.setValue(cardnumber);
//														if (cellphone != 0
//																&& cellphone != "")
//															op
//																	.getCmpByName('person.cellphone')
//																	.setValue(cellphone);
//														if (selfemail != 0
//																&& selfemail != "")
//															op
//																	.getCmpByName('person.selfemail')
//																	.setValue(selfemail);
//													}
//
//												})
//												// 
//												/*
//												 * var edGrid =
//												 * op.ownerCt.ownerCt.getCmpByName('gudong_store').get(0).get(1);
//												 * //var edGrid =
//												 * Ext.getCmp(formPanelId).getCmpByName('gudong_store').get(0).get(1);
//												 * var store =
//												 * edGrid.getStore(); var url =
//												 * __ctxPath +
//												 * '/creditFlow/common/getShareequity.do?enterpriseId=' +
//												 * obj.id; store.proxy.conn.url =
//												 * url; store.load();
//												 */
//											}
//											selectEnterprise(EnterpriseNameStockUpdateNew);

										},
										resizable : true,
										mode : 'romote',
										// editable : false,
										lazyInit : false,
										typeAhead : true,
										minChars : 1,
										triggerAction : 'all'
									}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							items : [{
										xtype : "textfield",
										anchor : '100%',
										name : "enterprise.enterpriseNumber",
										fieldLabel : "企业编号",
										readOnly : true,
										blankText : "企业简称不能为空，请正确填写!"

									}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : rightlabel,
							items : [{
								xtype : "combo",
								triggerClass : 'x-form-search-trigger',
								name : "enterprise.hangyeName",
								fieldLabel : "行业类别",
								anchor : '100%',
								scope : this,
								readOnly : true,
								onTriggerClick : function(e) {
									var obj = this;
									var oobbj = obj.ownerCt.ownerCt
											.getCmpByName("enterprise.hangyeType");
									selectTradeCategory(obj, oobbj);
								}
							}] 
						}, {
							columnWidth : .5,
							layout : 'form',
							labelWidth : leftlabel,
							items : [{
								xtype : 'combo',
								fieldLabel : '证件类型',
								readOnly : true,
								allowBlank : false,
								mode : 'local',
								displayField : 'typeValue',
								valueField : 'typeId',
								triggerAction : 'all',
								hiddenName : 'enterprise.documentType',
								anchor : '100%',
								store : new Ext.data.SimpleStore({
											data : [['三证合一', 1], ['非三证合一', 2]],
											fields : ['typeValue', 'typeId']
										}),
								listeners : {
									scope : this,
									afterrender : function(combox) {
										var combo = this
												.getCmpByName('enterprise.organizecode');
										if (combox.getValue() == 1) {
											// var a =
											// combo.el.parent().parent().first();
											// a.dom.innerHTML ="<font
											// color='red'>*</font>社会信用代码";
											combo.allowBlank = false;
											combo.fieldLabel = '社会信用代码';
											this.findById('cciaa11')
													.setVisible(false);
											this.findById('taxnum11')
													.setVisible(false);
										} else {
											// var a =
											// combo.el.parent().parent().first();
											// a.dom.innerHTML ="<font
											// color='red'>*</font>组织机构代码";
											combo.allowBlank = false;
											combo.fieldLabel = '组织机构代码';
											this.findById('cciaa11')
													.setVisible(true);
											this.findById('taxnum11')
													.setVisible(true);
										}
									}
								}
							}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : rightlabel,
							items : [{
								xtype : "textfield",
								name : "enterprise.organizecode",
								allowBlank : false,
								fieldLabel : "组织机构代码",
								// regex : /^[A-Za-z0-9]{8}-[A-Za-z0-9]{1}/,
								regexText : '组织机构代码格式不正确',
									readOnly : true,
								blankText : "组织机构代码不能为空，请正确填写!",
								anchor : "100%" 
							}]
						}, {
							xtype : "hidden",
							name : 'enterprise.hangyeType'
						}, {
							xtype : "hidden",
							name : 'enterprise.rootHangYeType'
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							id : 'cciaa11',
							items : [{
										xtype : "textfield",
										name : "enterprise.cciaa",
										fieldLabel : "营业执照号码",
											readOnly : true,
										blankText : "营业执照号码不能为空，请正确填写!",
										allowBlank : true,
										anchor : "100%"
									}]
						}, {
							columnWidth : .5,
							layout : 'form',
							id : 'taxnum11',
							labelWidth : leftlabel,
							items : [{
										xtype : 'textfield',
										// emptyText : '请输入税务登记号码',
										blankText : '税务登记号码不允许空',
											readOnly : true,
										allowBlank : true,
										regex : /^[0-9]*$/,
										regexText : '税务登记号码格式不正确',
										fieldLabel : '税务登记号码',
										name : 'enterprise.taxnum',
										anchor : "100%"
									}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							items : [{
								xtype : "textfield",
								name : "enterprise.telephone",
								allowBlank : false,
								fieldLabel : "联系电话",
									readOnly : true,
								blankText : "联系电话不能为空，请正确填写!",
								// regex :
								// /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
								// regexText : '联系电话格式不正确',
								anchor : "100%",
								regex : /^[1][34578][0-9]{9}$/,
								regexText : '联系电话格式不正确，应为手机号' 
							}]
						}, {
							columnWidth : 0.5, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : rightlabel,
							items : [{
										xtype : "textfield",
										// allowBlank : false,
										name : "enterprise.postcoding",
										fieldLabel : "邮政编码",
											readOnly : true,
										blankText : "邮政编码不能为空，请正确填写!",
										regex : /^[0-9]{6}$/,
										regexText : '邮政编码格式不正确',
										anchor : "100%"
									}]
						}, {
							columnWidth : 1, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : leftlabel,
							items : [{
										xtype : "textfield",
										fieldLabel : "通讯地址",
											readOnly : true,
										// allowBlank : false,
										name : "enterprise.area",
										anchor : '100%'
									}]
						}]
					}]

				}, {
					columnWidth : .4, // 该列在整行中所占的百分比
					bodyStyle : 'padding-right:2px',
					layout : "form", // 从上往下的布局
					items : [{
						layout : "form", // 从上往下的布局
						xtype : 'fieldset',
						title : '法定代表人信息',
						items : [{
							layout : "column",
							defaults : {
								anchor : '100%',
								columnWidth : 1,
								isFormField : true,
								labelWidth : 75
							},
							items : [/*
										 * { xtype : 'hidden', name :
										 * 'person.marry' },
										 */{
										xtype : 'hidden',
										name : 'person.id'
									}, {
										columnWidth : 1, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 110,
										items : [{
													xtype : "textfield",
													fieldLabel : "法定代表人姓名",
													name : "person.name",
													readOnly : true,
													allowBlank : false,
													anchor : '100%',
													blankText : "法定代表人姓名不能为空，请正确填写!"
												}]
									}, {
										columnWidth : 0.5, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 110,
										items : [{
											fieldLabel : "法定代表人性别",
											xtype : "diccombo",
											hiddenName : 'person.sex',
											displayField : 'itemName',
												readOnly : true,
											itemName : '性别', // xx代表分类名称
											allowBlank : false,
											// emptyText : "请选择",
											editable : false,
											blankText : "性别不能为空，请正确填写!",
											anchor : "100%",
											listeners : {
												afterrender : function(combox) {
													var st = combox.getStore();
													st.on("load", function() {
																combox
																		.setValue(combox
																				.getValue());
																combox
																		.clearInvalid();
															})
												}
											}
										}]
									}, {
										columnWidth : 0.5, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 65,
										items : [{
											xtype : "diccombo",
											hiddenName : "person.cardtype",
											fieldLabel : "证件类型",
											readOnly : true,
											itemName : '证件类型', // xx代表分类名称
											allowBlank : false,
											editable : false,
											// emptyText : "请选择",
											blankText : "证件类型不能为空，请正确填写!",
											anchor : "100%",
											listeners : {
												scope : this,
												afterrender : function(combox) {
													var st = combox.getStore();
													st.on("load", function() {
														if (combox.getValue() == ''
																|| combox
																		.getValue() == null) {
															combox
																	.setValue(st
																			.getAt(0).data.itemId);
															combox
																	.clearInvalid();
														} else {
															combox
																	.setValue(combox
																			.getValue());
														}
													})
												}
											}
										}]
									}, {
										columnWidth : 1, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 110,
										items : [{
											xtype : "textfield",
											name : "person.cardnumber",
											allowBlank : false,
											fieldLabel : "证件号码",
												readOnly : true,
											blankText : "证件号码不能为空，请正确填写!",
											anchor : "100%"
											 
										}]
									}, {
										columnWidth : this.isHiddenCustomerDetailBtn
												? 1
												: .5, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : 110,
										items : [{
													xtype : "textfield",
													name : "person.cellphone",
														readOnly : true,
													fieldLabel : "手机号码",
													anchor : "100%",
													regex : /^[1][34578][0-9]{9}$/,
													regexText : '手机号码格式不正确'
												}]
									}, {
										columnWidth : this.isHiddenCustomerDetailBtn ? 1 : .5, // 该列在整行中所占的百分比
										layout : "form", // 从上往下的布局
										labelWidth : this.isHiddenCustomerDetailBtn
												? 110
												: 65,
										items : [{
											xtype : "textfield",
											name : "person.selfemail",
												readOnly : true,
											fieldLabel : "电子邮箱",
											anchor : "100%",
											regex : /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
											regexText : '电子邮箱格式不正确'
											 
										}]
									}]
						}]
					}, {
						border : false,
						layout : "form",
						scope : this,
						items : [{
							xtype : 'button',
//							text : this.isEditEnterprise ? '编辑客户资料' : '查看客户资料',
							iconCls : 'btn-customer',
							width : 110,
							hidden :true,
							scope : this,
							handler : function() {
//								var oppositeId = this
//										.getCmpByName('enterprise.id')
//										.getValue();
//								var flag = "detail";
//								if (this.isEditEnterprise == true) {
//									flag = "edit";
//								}
//								if (flag == "detail") {
//									seeCustomer("company_customer", oppositeId);
//								} else if (flag == "edit") {
//									editCustomer("company_customer",
//											oppositeId, this);
//								}
							}
						}]
					}]
				}, {
					columnWidth : 1, // 该列在整行中所占的百分比
					bodyStyle : 'padding-right:2px',
					layout : "form", // 从上往下的布局
					hidden : true,
					items : [{
						layout : "form", // 从上往下的布局
						xtype : 'fieldset',
						title : '贷款账户信息',
						items : [{
							layout : "column",
							defaults : {
								anchor : '100%',
								columnWidth : 1,
								isFormField : true,
								labelWidth : 75
							},
							items : [{
								columnWidth : 0.5, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								items : [{
									xtype : 'combo',
									mode : 'local',
									displayField : 'name',
									valueField : 'id',
									editable : false,
									anchor : "100%",
									store : new Ext.data.SimpleStore({
												fields : ["name", "id"],
												data : [["个人", "0"],
														["公司", "1"]]
											}),
									triggerAction : "all",
									hiddenName : "enterpriseBank.openType",
									fieldLabel : '开户类型',
									allowBlank : true,
//									readOnly : this.isReadOnly,
//									hidden : this.isHidden,
//									hideLabel : this.isHidden,
									name : 'enterpriseBank.openType',
									listeners : {
										scope : this,
										afterrender : function(combox) {
											var st = combox.getStore();
										}
									}
								}]
							}, {
								columnWidth : 0.5, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								items : [{
									xtype : 'combo',
									mode : 'local',
									displayField : 'name',
									valueField : 'id',
									editable : false,
									width : 70,
									triggerAction : "all",
									hiddenName : "enterpriseBank.accountType",
									fieldLabel : '账户类型',
									allowBlank : true,
//									readOnly : this.isReadOnly,
//									hidden : this.isHidden,
//									hideLabel : this.isHidden,
									store : new Ext.data.SimpleStore({
												fields : ["name", "id"],
												data : [["个人储蓄户", "0"],
														["基本户", "1"],
														["一般户", "2"]]
											}),
									anchor : "100%",
									listeners : {
										scope : this,
										loadData : function(obj) {
											var v = this
													.getCmpByName('enterpriseBank.openType')
													.getValue();
											obj.enable();
											obj.store.removeAll()
											if (v == 0) {
												arrStore = new Ext.data.SimpleStore(
														{
															fields : ["name",
																	"id"],
															data : [
																	["个人储蓄户",
																			"0"],
																	["基本户", "1"],
																	["一般户", "2"]]
														});
												obj.store.insert(0, arrStore
																.getAt(0));
											} else {
												arrStore = new Ext.data.SimpleStore(
														{
															fields : ["name",
																	"id"],
															data : [
																	["个人储蓄户",
																			"0"],
																	["基本户", "1"],
																	["一般户", "2"]]
														});
												obj.store.insert(0, arrStore
																.getAt(1));
												obj.store.insert(1, arrStore
																.getAt(2));
											}
										}
									}
								}]
							}, {
								columnWidth : 0.5, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								items : [{
											fieldLabel : '开户名称',
											name : 'enterpriseBank.name',
											xtype : 'textfield',
//											readOnly : this.isReadOnly,
//											hidden : this.isHidden,
//											hideLabel : this.isHidden,
											allowBlank : true,
											anchor : "100%"
										}]
							}, {
								columnWidth : 0.5, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								labelWidth : 80,
								items : [{
											xtype : 'textfield',
											fieldLabel : '账号',
//											hidden : this.isHidden,
//											hideLabel : this.isHidden,
											allowBlank : true,
											name : 'enterpriseBank.accountnum',
//											readOnly : this.isReadOnly,
											anchor : "100%"
										}]
							}, {
								columnWidth : .33,
								layout : 'form',
								labelWidth : 80,
								items : [{
											name : 'enterpriseBank.id',
											xtype : 'hidden'
										}, {
											fieldLabel : "银行名称",
											xtype : "combo",
											displayField : 'itemName',
											valueField : 'itemId',
											triggerAction : 'all',
											allowBlank : true,
//											readOnly : this.isReadOnly,
//											hidden : this.isHidden,
//											hideLabel : this.isHidden,
											store : new Ext.data.ArrayStore({
												url : __ctxPath
														+ '/creditFlow/common/getBankListCsBank.do',
												fields : ['itemId', 'itemName'],
												autoLoad : true
											}),
											mode : 'remote',
											hiddenName : "enterpriseBank.bankid",
											editable : false,
											blankText : "银行名称不能为空，请正确填写!",
											anchor : "100%",
											listeners : {
												scope : this,
												afterrender : function(combox) {
													var st = combox.getStore();
													st.on("load", function() {
																combox
																		.setValue(combox
																				.getValue());

															})
													combox.clearInvalid();
												}

											}

										}]
							}, {
								columnWidth : .34,
								layout : 'form',
								items : [{
											fieldLabel : "网点名称",
											name : 'enterpriseBank.bankOutletsName',
											xtype : 'textfield',
											allowBlank : true,
//											readOnly : this.isReadOnly,
//											hidden : this.isHidden,
//											hideLabel : this.isHidden,
											editable : true,
											anchor : "100%"

										}]
							}, {
								columnWidth : .33,
								layout : 'form',
								items : [{
											name : 'enterpriseBank.areaId',
											xtype : 'hidden'
										}, {
											// id:'bankName',
											name : 'enterpriseBank.areaName',
											hiddenName : 'enterpriseBank.areaName',
											fieldLabel : '开户地区',
											anchor : '100%',
											// value : '中国银行',
											// submitValue:false,
											xtype : 'trigger',
											triggerClass : 'x-form-search-trigger',
											editable : false,
											allowBlank : true,
//											readOnly : this.isReadOnly,
//											hidden : this.isHidden,
//											hideLabel : this.isHidden,
											scope : this
										 

										}]
							}]
						}]
					}]
				} ]

			}]
		});
	}
})
 