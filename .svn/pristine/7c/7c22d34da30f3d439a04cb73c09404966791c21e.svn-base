/**
 * 导航－金融中介管理
 * 	   ---审批项目查看----导航页面
 * @extends Ext.Panel
 */
ApproveProjectInfoNavigation = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		ApproveProjectInfoNavigation.superclass.constructor.call(this, {
			region : 'center',
			layout : 'anchor',
			items : []
		});
	},
	initUIComponents : function() {
		var jsArr = [
				__ctxPath + '/js/creditFlow/common/ProjectPathChange.js',// 流程跳转
				__ctxPath + '/js/creditFlow/smallLoan/project/SlProcessRunView.js',// 意见与说明记录
				
				__ctxPath + '/js/creditFlow/smallLoan/project/SlVoteSignForm.js',// 会签投票
				__ctxPath + '/js/creditFlow/smallLoan/project/SlExecutiveOpinionForm.js',// 主管意见记录
				__ctxPath + '/js/creditFlow/smallLoan/project/SlMeetingSummary.js',// 上传纪要
				
				__ctxPath + '/js/creditFlow/smallLoan/project/SlFilingRecordView.js',// 归档记录
				__ctxPath + '/js/creditFlow/common/ProjectTaskHandler.js',// 项目换人
				
				__ctxPath + '/js/creditFlow/smallLoan/project/SlBreachDetailView.js',// 违约处理详情
				__ctxPath + '/js/creditFlow/smallLoan/project/SlEarlyrepaymentRecordView.js',// 提前还款记录
				__ctxPath + '/js/creditFlow/smallLoan/finance/EarlyRepaymentSlFundIntent.js',// 提前还款
				__ctxPath + '/js/creditFlow/smallLoan/project/SlEarlyrepaymentDetailView.js',
				__ctxPath + '/js/creditFlow/finance/SlActualToCharge.js',// 经办费用清单
				__ctxPath + '/js/creditFlow/smallLoan/project/SlAlterAccrualRecordView.js',// 利率变更记录
				__ctxPath + '/js/creditFlow/smallLoan/project/SlAlterAccrualDetailView.js',// 利率变更详情
				__ctxPath + '/js/creditFlow/smallLoan/finance/AlterAccrualSlFundIntent.js',// 利率变更款项
				__ctxPath + '/js/creditFlow/smallLoan/project/DesignSupervisionManagePlan.js',// 监管计划
				__ctxPath + '/js/creditFlow/smallLoan/project/SlSupervisonRecordView.js',// 监管
				__ctxPath + '/js/creditFlow/smallLoan/finance/BorrowerInfo.js',//共同借款人信息
				__ctxPath + '/js/creditFlow/smallLoan/materials/SlProcreditSmallLoanMaterialsView.js',// 贷款材料清单
				
				__ctxPath + '/js/creditFlow/smallLoan/finance/FinanceEarlyRepaymentPanel.js',
				__ctxPath + '/js/creditFlow/smallLoan/finance/FinanceAlterAccrualPanel.js',
				__ctxPath + '/js/creditFlow/guarantee/contract/LetterAndBookView.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/PostponedProjectInfo.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/PostponedProjectInfoPanel.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/PostponedProjectInfoEdit.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/PostponedProjectInfoEdit.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/PostponedProjectInfoEditPanel.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/PostponedProjectInfoNavigation.js',//展期编辑
				__ctxPath + '/js/creditFlow/smallLoan/project/SlAlterAccrualRecordEditInfo.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/SlAlterAccrualRecordSeeInfo.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/SlAlterAccrualRecordEditInfoView.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/SlAlterAccrualRecordNavigation.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/SlEarlyrepaymentRecordEditInfo.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/SlEarlyrepaymentRecordSeeInfo.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/SlEarlyrepaymentRecordEditInfoView.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/SlEarlyrepaymentRecordNavigation.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/StatisticalElementsSmallloan.js',
				__ctxPath + '/js/creditFlow/smallLoan/project/SlMeetingSummary.js'
		];
		$ImportSimpleJs(jsArr, this.constructPanel, this);
	},// 初始化组件
	constructPanel : function() {
		this.oppositeType = this.record.data.oppositeType;
		this.oppositeID = this.record.data.oppositeId;
		this.projectId = this.record.data.projectId;
		this.projectStatus = this.record.data.projectStatus;
		this.projectMoney = this.record.data.projectMoney;
		this.payProjectMoney = this.record.data.payProjectMoney;
		this.expectedRepaymentDate = this.record.data.expectedRepaymentDate;
		this.payintentPeriod = this.record.data.payintentPeriod;
		this.businessType = this.record.data.businessType;
		this.runId = this.record.data.runId;
		this.taskId = this.record.data.taskId;
		this.operationType=this.record.data.operationType
		if(this.operationType=='MicroLoanBusiness'){
			this.isHidden=false;
		}else{
			this.isHidden=true;
		}

		this.panel = new Ext.Panel({
			border : false,
			layout : 'column',
			defaults : {
				anchor : '100%'
			},
			items : [{
				columnWidth : 1,
				layout : 'column',
				defaults : {
					anchor : '100%',
					style : "margin-left:5px;margin-top:5px",
					columnWidth : .1
				},
				items : [{
					layout : "form", // 从上往下的布局
					columnWidth : .08,
					items : [{
						xtype : 'panel',
						border : false,
						bodyStyle : 'margin-left:0px;margin-top:5px',
						width : 95,
						html : '<B><font class="x-myZW-fieldset-title">【项目信息】：</font></B>'
					}]
				}, {
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						text : '01项目基本信息',
						anchor : '100%',
						scope : this,
						handler : function() {
							location.href = "#sl_projectInfo_"+ this.flag + this.projectId;
						}
					}]
				},/*{
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						text : '02授信信息',
						anchor : '100%',
						scope : this,
						handler : function() {
							location.href = "#sl_bankcredtiTongyong_"+ this.flag + this.projectId;
						}
					}]
				},{
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						text : '03保证金信息',
						anchor : '100%',
						scope : this,
						handler : function() {
							location.href = "#sl_bondPanel_"+ this.flag + this.projectId;
						}
					}]
				},*/{
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						text : '04客户信息',
						anchor : '100%',
						scope : this,
						handler : function() {
							location.href = "#sl_personalCustomerInfo_"+ this.flag + this.projectId;
						}
					}]
				},{
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						text : '05借款需求',
						anchor : '100%',
						scope : this,
						handler : function() {
							location.href = "#sl_loandemand_"+ this.flag + this.projectId;
						}
					}]
				},{
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						text : '06资金款项信息',
						anchor : '100%',
						scope : this,
						handler : function() {
							location.href = "#sl_financeInfo_"+ this.flag + this.projectId;
						}
					}]
				},{
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						text : '07联系人信息',
						anchor : '100%',
						scope : this,
						handler : function() {
							location.href = "#sl_contactPersonInfo_"+ this.flag + this.projectId;
						}
					}]
				},{
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						text : '08费用清单',
						anchor : '100%',
						scope : this,
						handler : function() {
							location.href = "#sl_actualToChange_"+ this.flag + this.projectId;
						}
					}]
				},{
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						text : '09贷款材料清单',
						anchor : '100%',
						scope : this,
						handler : function() {
							location.href = "#sl_loanmaterial_"+ this.flag + this.projectId;
						}
					}]
				}]
			},{
				columnWidth : 1,
				layout : 'column',
				defaults : {
					anchor : '100%',
					style : "margin-left:5px;margin-top:5px",
					columnWidth : .1
				},
				items : [{
					layout : "form", // 从上往下的布局
					columnWidth : .08,
					items : [{
						xtype : 'panel',
						border : false,
						bodyStyle : 'margin-left:0px;margin-top:5px',
						width : 95,
						html : ''
					}]
				},{
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						text : '10贷款必备条件',
						anchor : '100%',
						scope : this,
						handler : function() {
							location.href = "#sl_loanrequire_"+ this.flag + this.projectId;
						}
					}]
				},{
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						text : '11担保措施',
						anchor : '100%',
						scope : this,
						handler : function() {
							location.href = "#sl_guaranteeInfo_"+ this.flag + this.projectId;
						}
					}]
				},{
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						text : '12贷款材料上传',
						anchor : '100%',
						scope : this,
						handler : function() {
							location.href = "#sl_checkreport_"+ this.flag + this.projectId;
						}
					}]
				},{
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						text : '13贷款合同',
						anchor : '100%',
						scope : this,
						handler : function() {
							location.href = "#sl_slContractView_"+ this.flag + this.projectId;
						}
					}]
				}]
			}, {
				columnWidth : 1,
				layout : 'column',
				defaults : {
					anchor : '100%',
					style : "margin-left:5px;margin-top:5px",
					columnWidth : .1
				},
				items : [{
					layout : "form", // 从上往下的布局
					columnWidth : .08,
					items : [{
						xtype : 'panel',
						border : false,
						bodyStyle : 'margin-left:0px;margin-top:5px',
						width : 95,
						html : '<B><font class="x-myZW-fieldset-title">【流程控制】：</font></B>'
					}]
				}, {
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						iconCls : 'btn-example',
						anchor : '100%',
						text : '流程示意图',
						scope : this,
						handler : function() {
							showFlowImgWin(this.record.data.runId);
						}
					}]
				}, {
					layout : "form", // 从上往下的布局
					items : [{
						xtype : 'button',
						iconCls : 'btn-detail',
						anchor : '100%',
						text : '意见与说明记录',
						scope : this,
						handler : function() {
							new SlProcessRunView({
								runId : this.runId,
								projectStatus : this.projectStatus,
								businessType : "SmallLoan",
								isAutoHeight : false
							}).show();
						}
					}]
				}]
			}]
		});
		this.add(this.panel);
		this.doLayout();
	}
});