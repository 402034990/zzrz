/**
 * @author
 * @class SlFundIntentView
 * @extends Ext.Panel
 * @description [SlFundIntent]管理
 * @company 智维软件
 * @createtime:
 */
SlFundIntentprincipalIncomeOwe = Ext.extend(Ext.Panel, {
		// 构造函数
		constructor : function(_cfg) {
			if(typeof(_cfg.businessType)!="undefined"){
			      this.businessType=_cfg.businessType;
			}
			Ext.applyIf(this, _cfg);
			// 初始化组件
			this.initUIComponents();
			// 调用父类构造
			SlFundIntentprincipalIncomeOwe.superclass.constructor.call(this, {
				id : 'SlFundIntentprincipalIncomeOwe'+this.businessType+this.type,
				title : '欠收款项',
				region : 'center',
				layout : 'border',
				iconCls :'btn-team2',
				items : [this.searchPanel, this.gridPanel]
			});
		},// end of constructor
		// 初始化组件
		initUIComponents : function() {
			// 初始化搜索条件Panel
			var tabflag=this.tabflag;
			var labelsize=70;
			var labelsize1=115;
			var isShow=false;
			if(RoleType=="control"){
			  isShow=true;
			}
			
			this.searchPanel = new HT.SearchPanel({
				layout : 'column',
				style : 'padding-left:5px;padding-right:5px;padding-top:5px;',
				region : 'north',
				height : 20,
				anchor : '96%',
				keys : [{
					key : Ext.EventObject.ENTER,
					fn : this.search,
					scope : this
				}, {
					key : Ext.EventObject.ESC,
					fn : this.reset,
					scope : this
				}],
				layoutConfig: {
	               align:'middle',
	               padding : '5px'
	            },
				items : [ {   
					columnWidth : 0.25,
					layout : 'form',
					border : false,
					labelWidth : labelsize,
					labelAlign : 'right',
					hidden : true,
					items : [{
							fieldLabel : '业务类别',
							name : 'Q_operationType_N_EQ',
							hiddenName : "Q_operationType_N_EQ",
							flex : 1,
							editable : false,
							width:105,
							displayField : 'name',
						    valueField : 'id',
						    triggerAction : 'all',
							xtype : 'combo',
							mode : 'local',
							store : new Ext.data.SimpleStore({
								autoLoad : true,
								url : __ctxPath+ '/creditFlow/getBusinessTypeList1CreditProject.do',
								fields : ['id', 'name']
							}),
							anchor : '96%'
					}] 
				},{   
					columnWidth : 0.24,
					layout : 'form',
					border : false,
					labelWidth : labelsize1,
					labelAlign : 'right',
					items : [ {
						fieldLabel : '计划到账日：从',
						name : 'Q_intentDate_D_GE',
						labelSeparator : '',
						xtype : 'datefield',
						format : 'Y-m-d',
						anchor : '100%'
					},{
						fieldLabel : '实际到账日：从',
						name : 'startFactDate',
						labelSeparator : '',
						xtype : 'datefield',
						format : 'Y-m-d',
						anchor : '100%'
					}] 
				},{   
					columnWidth : 0.16,
					layout : 'form',
					border : false,
					labelWidth : 30,
					labelAlign : 'right',
					items : [ {
						fieldLabel : '到',
						name : 'Q_intentDate_D_LE',
						labelSeparator : '',
						xtype : 'datefield',
						format : 'Y-m-d',
						anchor : '100%'
					},{
						fieldLabel : '到',
						name : 'endFactDate',
						labelSeparator : '',
						xtype : 'datefield',
						format : 'Y-m-d',
						anchor : '100%'
					}] 
				},{   
					columnWidth : 0.2,
					layout : 'form',
					border : false,
					labelWidth : labelsize,
					labelAlign : 'right',
					items : [{
						fieldLabel : '项目名称',
						name : 'Q_proj_Name_N_EQ',
						flex : 1,
						editable : false,
						width:105,
						xtype :'textfield',
						anchor : '100%'
					}, {
						fieldLabel : '项目编号',
						name : 'Q_projNum_N_EQ',
						flex : 1,
						editable : false,
						width:105,
						xtype :'textfield',
						anchor : '100%'
					}]
				 }/*,{
					columnWidth : .2,
					layout : 'form',
					border : false,
					labelWidth : 80,
					labelAlign : 'right',
					items : [this.businessType=='SmallLoan'?{
						xtype : 'lovcombo',
						fieldLabel : '项目属性',
						anchor : '96%',
						hiddenName : 'projectProperties',
						triggerAction : 'all',
						editable :false,
						readOnly : false,
			            store :new Ext.data.ArrayStore({
			                autoLoad : true,
			                baseParams : {
			                    nodeKey : 'projectProperties'
			                },
			                url : __ctxPath + '/system/loadIndepItemsDictionaryIndependent.do',
			                fields : ['dicKey', 'itemValue']
			            }),
			            displayField : 'itemValue',
			            valueField : 'dicKey',
			            listeners :{
							afterrender : function(combox) {
								var st = combox.getStore();
							}
						}
					}:{border :false},isShow?{
						xtype : "combo",
						anchor : "96%",
						fieldLabel : '所属分公司',
						hiddenName : "companyId",
						displayField : 'companyName',
						valueField : 'companyId',
						triggerAction : 'all',
						store : new Ext.data.SimpleStore({
							autoLoad : true,
							url : __ctxPath+'/system/getControlNameOrganization.do',
							fields : ['companyId', 'companyName']
						})
						}:{border : false}]
					}*/,{
						columnWidth : .07,
						xtype : 'container',
						layout : 'form',
						defaults : {
							xtype : 'button'
						},
						style : 'padding-left:10px;',
						items : [{
							text : '查询',
							scope : this,
							iconCls : 'btn-search',
							handler : this.search
						},{
							text : '重置',
							scope : this,
							iconCls : 'btn-reset',
							handler : this.reset
						}]
					}]
				});// end of searchPanel

				this.topbar = new Ext.Toolbar({
					items : [{
			        	iconCls : 'btn-user-sel',
			        	text : '流水对账',
						xtype : 'button',
						scope : this,
						hidden : isGranted('_liushui_f_principalIncome_'+this.businessType)?false:true,
						handler : this.openliushuiwin
					},new Ext.Toolbar.Separator({
						hidden : isGranted('_liushui_f_principalIncome_'+this.businessType)?false:true
					}),{
						iconCls : 'btn-detail',
						text : '查看对账明细',
						xtype : 'button',
						scope : this,
						hidden : isGranted('_liushuisee_f_principalIncome_'+this.businessType)?false:true,
						handler : this.openliushuiwin1
					},new Ext.Toolbar.Separator({
						hidden : isGranted('_liushuisee_f_principalIncome_'+this.businessType)?false:true
					}),{
						iconCls : 'btn-ok',
						text :'核销',
						xtype : 'button',
						scope : this,
						hidden : isGranted('_ping_f_principalIncome_'+this.businessType)?false:true,
						handler : this.pingAccount
					},new Ext.Toolbar.Separator({
						hidden : isGranted('_ping_f_principalIncome_'+this.businessType)?false:true
					}) ,{
						iconCls : 'btn-tree-team28',
						text :'罚息对账',
						xtype : 'button',
						scope : this,
						type:0,
						hidden : isGranted('_fa_f_interestIncome_'+this.businessType)?false:true,
						handler : this.faxiAccount
					},new Ext.Toolbar.Separator({
						hidden : isGranted('_fa_f_interestIncome_'+this.businessType)?false:true
					}), {
						iconCls : 'btn-tree-team28',
						text : '逾期对账',
						xtype : 'button',
						scope : this,
						type:1,
						hidden : isGranted('_YQ_f_interestIncome_'+ this.businessType) ? false : true,
						handler : this.faxiAccount
					}, new Ext.Toolbar.Separator({
						hidden : isGranted('_YQ_f_interestIncome_'+ this.businessType) ? false : true
					}),{
						iconCls : 'slupIcon',
						text :'上传/下载凭证',
						xtype : 'button',
						scope : this,
						hidden : isGranted('_uploaddownpz_f_principalIncome_'+this.businessType)?false:true,
						handler : this.upload
					},new Ext.Toolbar.Separator({
						hidden : (isGranted('_uploaddownpz_f_principalIncome_'+this.businessType)?false:true)||(isGranted('_previewpz_f_'+this.businessType)?false:true)
					}),{
						iconCls : 'btn-setting',
						text :'预览凭证',
						xtype : 'button',
						scope : this,
						hidden : isGranted('_previewpz_f_principalIncome_'+this.businessType)?false:true,
						handler : this.preview
					},{
						iconCls : 'btn-setting',
						text :'借款人账户直接还款',
						xtype : 'button',
						hidden:true,
						scope : this,
						handler : this.borrowerToInvestor
					},{
						iconCls : 'btn-xls',
						text : '导出到Excel',
						xtype : 'button',
						scope : this,
						handler : this.exportExcel
					},{
						iconCls : 'btn-add',
						text : '提交至不良征信库',
						xtype : 'button',
						scope : this,
						hidden:isGranted('_addTo_badCredit_principalIncome_'+this.businessType)?false:true,
						handler : this.addToBadCredit
					}]
				});

				var summary = new Ext.ux.grid.GridSummary();
				function totalMoney(v, params, data) {
					return '总计';
				}
				
				this.gridPanel = new HT.GridPanel({
					bodyStyle : "width : 100%",
					region : 'center',
					tbar : this.topbar,
					plugins : [summary],
					viewConfig: {  
		            	forceFit:false  
		            },
					rowActions : false,
					loadMask : true,
					id : 'SlFundIntentGrid3principalincome',
					isautoLoad:true,
					url : __ctxPath + "/creditFlow/finance/listbyLedgerSlFundIntent.do?businessType="+this.businessType+this.getfundType()+"&typetab=owe",
					fields : [{
							name : 'fundIntentId',
							type : 'int'
						}, 'projectName','projectNumber', 'incomeMoney','fundTypeName', 'intentDate',
						'payMoney', 'factDate','fundType',
						'afterMoney', 'notMoney','flatMoney',
					    'accrualMoney','remark','overdureMoney','overdueAfterMoney',
						'businessType','projectId','orgName','overNotMoney','fxnotMoney',
						'companyId','faxiAfterMoney','payintentPeriod','amountPayable','continueInterest','continueDay','interestStarTime','interestEndTime','bidPlanId'],
					columns : [{
							header : 'fundIntentId',
							dataIndex : 'fundIntentId',
							hidden : true
						},{
							header : "所属分公司",
							sortable : true,
							width : 120,
							hidden:RoleType=="control"?false:true,
							dataIndex : 'orgName'
						}, {
							header : '项目名称',
							dataIndex : 'projectName',
							width : 150
						}, {
							header : '项目编号',
							dataIndex : 'projectNumber',
							width : 120
						}, {
							header : '资金类型',
							dataIndex : 'fundTypeName',
							summaryType : 'count',
							summaryRenderer : totalMoney,
							width : 130
						}, {
							header : '计划收入金额',
							dataIndex : 'incomeMoney',
							align : 'right',
							width : 100,
							summaryType: 'sum',
							renderer:function(v){
								return Ext.util.Format.number(v,',000,000,000.00')+"元"
                     	    }
						}, {
							header : '计划到账日',
							width : 100,
							dataIndex : 'intentDate',
							align : 'center'
						}, {
							header : '实际到账日',
							width : 100,
							dataIndex : 'factDate'
						}, {
							header : '计息开始日期',
							dataIndex : 'interestStarTime',
							format : 'Y-m-d',
							width : 80
						}, {
							header : '计息结束日期',
							dataIndex : 'interestEndTime',
							format : 'Y-m-d',
							width : 80
						}, {
							header : '已对账金额',
							dataIndex : 'afterMoney',
							width : 150,
							align : 'right',
							summaryType: 'sum',
							renderer:function(v){
								return Ext.util.Format.number(v,',000,000,000.00')+"元"
                     		}
						}, {
							header : '未对账金额',
							dataIndex : 'notMoney',
							align : 'right',
							width : 100,
							sortable:true,
							summaryType: 'sum',
							renderer : function(v) {
								return Ext.util.Format.number(v,',000,000,000.00')+"元"
							}
						}, {
							header : '核销金额',
							dataIndex : 'flatMoney',
							align : 'right',
							width : 150,
							summaryType: 'sum',
							renderer:function(v){
								return Ext.util.Format.number(v,',000,000,000.00')+"元"
                     		}
						},{
							header : '顺延至',
							dataIndex : 'continueDay',
							align : 'right',
							width : 100,
							renderer:function(v, metadata, record){
								var d0=record.get('intentDate');
								if(d0==v){
									return "无顺延";
								}else{
									return v;
								}
                     	     }
						}, {
							header : '罚息金额',
							dataIndex : 'amountPayable',
							align : 'right',
							width : 100,
							hidden:true,
							summaryType: 'sum',
							renderer:function(v){
								return Ext.util.Format.number(v,',000,000,000.00')+"元"
                     	    }
						}/*, {
							header : '顺延息',
							dataIndex : 'continueInterest',
							align : 'right',
							width : 80,
							summaryType: 'sum',
							renderer:function(v){
								return Ext.util.Format.number(v,',000,000,000.00')+"元"
                     		}
						}*/, {
							header : '罚息金额',
							width : 100,
							dataIndex : 'accrualMoney',
							align : 'right',
							summaryType: 'sum',
							renderer : function(value, metadata, record, rowIndex,colIndex){	
								if(value==0){
						 		    return Ext.util.Format.number(value,',000,000,000.00')+"元"
						 	    }else{
							        return "<a><u>"+Ext.util.Format.number(value,',000,000,000.00')+"元"+"</u></a>"
							    }
							}
						},{
							header : '罚息已对账金额',
							width : 100,
							dataIndex : 'faxiAfterMoney',
							align : 'right',
							summaryType: 'sum',
							renderer : function(value, metadata, record, rowIndex,colIndex){
								return Ext.util.Format.number(value,',000,000,000.00')+"元"
							}
						}, {
							header : '逾期总额',
							width : 100,
							dataIndex : 'overdureMoney',
							align : 'right',
							summaryType: 'sum',
							renderer : function(value, metadata, record, rowIndex,colIndex) {
								var flag = 0; //incomeMoney
								if (record.data.payMoney != 0 || record.data.fundType == "ToCustomGuarantMoney") { //payMoney
									flag = 1;
								}
								if (flag == 1) {
									return "";
								} else {
									if (value == 0) {
										return Ext.util.Format.number(value,',000,000,000.00')+ "元"
									} else {
										return "<a><u>"+ Ext.util.Format.number(value,',000,000,000.00') + "元"+ "</u></a>"
									}
								}
							}
						}, {
							header : '逾期已对账金额',
							width : 100,
							dataIndex : 'overdueAfterMoney',
							align : 'right',
							summaryType: 'sum',
							renderer : function(value, metadata, record, rowIndex,colIndex) {
								return Ext.util.Format.number(value,',000,000,000.00')+ "元"
							}
						}, {
							header : '备注',
							width : 150,
							dataIndex : 'remark',
							align : 'center',
							hidden : false
						}]
					});
			},// end of the initComponents()
			// 重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			search : function() {
				$search({
					searchPanel : this.searchPanel,
					gridPanel : this.gridPanel
				});
			},
			openliushuiwin : function() {
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中记录');
					return false;
				}
				var flag=true;
				for(var i=0;i<s.length;i++){
					var notMoney1=s[i].data.overNotMoney;
					if(notMoney1==null){
						notMoney1=0;
					}
					var notMoney2=s[i].data.fxnotMoney;
					if(notMoney2==null){
						notMoney2=0;
					}
					if(notMoney1>0 || notMoney2>0){
						Ext.ux.Toast.msg('操作信息', '所选记录存在未对账的罚息/逾期利息');
						flag=false;
						break;
					}
				}
				if(flag){
					if(s.length>1){
						this.manyInntentopenliushuiwin();
						
					}else if(s.length==1){
					   this.oneopenliushuiwin();
					}
				}
			},
			oneopenliushuiwin : function(){
				var s = this.gridPanel.getSelectionModel().getSelections();
				var	record=s[0];
			    var flag=0;            //incomeMoney
			    if(record.data.payMoney !=0){   //payMoney
			     	flag=1;
			    }
				new SlFundIntentForm({
					fundIntentId : record.data.fundIntentId,
					fundType : record.data.fundType,
					notMoney : record.data.notMoney,
					flag:flag,
					businessType :record.data.businessType,
					tabflag :"principalincome",
					companyId:record.data.companyId
				}).show();
			},
			manyInntentopenliushuiwin : function(){
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中记录');
					return false;
				}else{
			     	var company=s[0].data.companyId;
			     	for(var i=1;i<s.length;i++){
			    		if(s[i].data.companyId !=company){
			    			Ext.ux.Toast.msg('操作信息','请选中的记录分公司保持一致');
							return false;
			    		}
			    	}
				    var a=0;
				    var b=0;
				    var sumnotMoney=0;
				    for(var i=0;i<s.length;i++){
				    	if(s[i].data.payMoney >0)
				    	a++;
				    	if(s[i].data.incomeMoney >0)
					    b++;
				    	sumnotMoney=sumnotMoney+s[i].data.notMoney;
				    }
				    if(a>0 && b>0){
				    	Ext.ux.Toast.msg('操作信息','请选中的记录支出保持一致');
						return false;
				    }
					var ids = $getGdSelectedIds(this.gridPanel,'fundIntentId');
					var	record=s[0];
					var flag=0;            //incomeMoney
				    if(record.data.payMoney !=0){   //payMoney
				     	flag=1;
				    }
					new SlFundIntentForm1({
						ids : ids,
						flag:flag,
						fundType : record.data.fundType,
						sumnotMoney :sumnotMoney,
						tabflag :"principalincome",
						companyId:record.data.companyId
					}).show();
				}	
			},
			openliushuiwin1 : function(record,flag) {
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					var hidden=false;
					var flag=1;
					var	record=s[0];
					new detailView({
						fundIntentId : record.data.fundIntentId,
						fundType : record.data.fundType,
						flag : flag,
						hidden1 : true,
						hidden2 :false,
						businessType: record.data.businessType
					}).show();
				}	
			},
			
			//罚息弹窗
		    faxiAccount:function(v){
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{
					var	record=s[0];
					var accrualMoney = record.data.accrualMoney;
					var fundIntentId = record.data.fundIntentId;
					var businessType=this.businessType;
					if(accrualMoney !=0){
					 	new SlPunishInterestView({
						 	fundIntentId:fundIntentId,
						 	businessType:"Owe",
						 	type:v.type,
						 	FundType:"principal" //本金
						}).show();
					}else{
					 	Ext.ux.Toast.msg('操作信息','该项目未逾期！');
					}
				}
			},
	     	pingAccount:function(record){
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					var	record=s[0];
					new editAfterMoneyForm({
						fundIntentId : record.data.fundIntentId,
						afterMoney : record.data.afterMoney,
						notMoney : record.data.notMoney,
						flatMoney : record.data.flatMoney
					}).show();
				}
			},
			upload:function(record){
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					var	record=s[0];
					var	projectId =record.data.projectId;
					var businessType=record.data.businessType;
					var fundIntentId=record.data.fundIntentId;
					if(businessType=="Guarantee"){
						if(record.data.fundType=="ToCustomGuarantMoney"){
							var setname ='收取客户保证金凭证';
							var titleName ='收取客户保证金凭证';
							var tableName ='sl_fund_intent_customGuarantMoney';
							var typeisfile ='fundIntentId.'+fundIntentId;
						}
						if(record.data.fundType=="GuaranteeToCharge"){
							var setname ='收取保费凭证';
							var titleName ='收取保费凭证';
							var tableName ='sl_fund_intent_GuaranteeToCharge';
							var typeisfile ='fundIntentId.'+fundIntentId;
						}
						if(record.data.fundType=="BackCustomGuarantMoney"){
							var setname ='退还客户保证金凭证';
							var titleName ='退还客户保证金凭证';
							var tableName ='sl_fund_intent_backCustomGuarantMoney';
							var typeisfile ='fundIntentId.'+fundIntentId;
						}
						var mark=tableName+"."+projectId;
						uploadReportJS('上传/下载'+titleName+'文件',typeisfile,mark,15,null,null,null,projectId,businessType,setname);
					}else{
						var setname ='凭证';
						var titleName ='凭证';
						var tableName ='sl_fund_intent_'+record.data.fundType;
						var typeisfile ='fundIntentId.'+fundIntentId;
						var mark=tableName+"."+projectId;
						uploadReportJS('上传/下载'+titleName+'文件',typeisfile,mark,15,null,null,null,projectId,businessType,setname);
				    }
				}
			},
			preview:function(record){
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					var	record=s[0];
					var	projectId =record.data.projectId;
					var businessType=record.data.businessType;
					var fundIntentId=record.data.fundIntentId;
					if(businessType=="Guarantee"){
						if(record.data.fundType=="ToCustomGuarantMoney"){
							var setname ='收取客户保证金凭证';
							var titleName ='收取客户保证金凭证';
							var tableName ='sl_fund_intent_customGuarantMoney';
							var typeisfile ='typeisToCustomGuarantMoney';
						}
						if(record.data.fundType=="GuaranteeToCharge"){
							var setname ='收取保费凭证';
							var titleName ='收取保费凭证';
							var tableName ='sl_fund_intent_GuaranteeToCharge';
							var typeisfile ='typeisGuaranteeToCharge';
						}
						if(record.data.fundType=="BackCustomGuarantMoney"){
							var setname ='退还客户保证金凭证';
							var titleName ='退还客户保证金凭证';
							var tableName ='sl_fund_intent_backCustomGuarantMoney';
							var typeisfile ='typeisbackCustomGuarantMoney';
						}
						var mark=tableName+"."+projectId;
						var remark='fundIntentId.'+fundIntentId;
						picViewer(remark,false,typeisfile);
					}else{
						var tableName ='sl_fund_intent_'+record.data.fundType;
						var typeisfile ='fundIntentId.'+fundIntentId;
						var mark=tableName+"."+projectId;
						picViewer(mark,false,typeisfile,projectId);
				    }
				}
			},
			//借款人 直接还款
			borrowerToInvestor:function(record){
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					var	record=s[0];
					var fundIntentId=record.data.fundIntentId;
					var url =__ctxPath+ "/creditFlow/finance/borrowerToInvestorSlFundIntent.do?fundIntentId="+fundIntentId ;
					window.open(
							url,
							'放款审核',
							'top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no',
							'_blank');
				}
			},
			addToBadCredit:function(){
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息', '请选中一条记录');
					return false;
				} else if (s.length > 1) {
					Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
					return false;
				} else {
					var record = s[0];
					var fundIntentId=record.data.fundIntentId;
					new InternalBadCreditForm({
						type:'add',
						moneyId:fundIntentId,
						moneyType:'fund'
					}).show();
				}
			},
			getfundType : function(){
				var sqlstr="&fundType=('principalRepayment')";
				if(this.businessType!=null){
					businessType=this.businessType
					switch (businessType) {
					  	case "SmallLoan": sqlstr="&fundType=('principalRepayment')";
					    break;
					  	case "Financing": sqlstr=(this.type==1?"&fundType=('Financingborrow')":"&fundType=('FinancingInterestBack')");
					    break;
					  	case "Guarantee": sqlstr=" ";
					    break;
					  	case "Pawn": sqlstr="&fundType=('pawnPrincipalRepayment')";
					    break;
					  	case "Investment": sqlstr=" ";
					    break;
					  	default: sqlstr="&fundType=('principalRepayment')";
					}
				}
				return sqlstr
			},
			exportExcel:function(){
				var Q_proj_Name_N_EQ=this.getCmpByName("Q_proj_Name_N_EQ").getValue();//项目名称
				var Q_projNum_N_EQ=this.getCmpByName("Q_projNum_N_EQ").getValue();//项目编号
				var Q_intentDate_D_GE=this.getCmpByName("Q_intentDate_D_GE").getValue();//从日期开始
				Q_intentDate_D_GE=Ext.util.Format.date(Q_intentDate_D_GE, 'Y-m-d')
				var Q_intentDate_D_LE=this.getCmpByName("Q_intentDate_D_LE").getValue();//到日期结束
				Q_intentDate_D_LE=Ext.util.Format.date(Q_intentDate_D_LE, 'Y-m-d')
				var startFactDate = this.getCmpByName("startFactDate").getValue();//实际到账日
				startFactDate=Ext.util.Format.date(startFactDate, 'Y-m-d');
				var endFactDate= this.getCmpByName("endFactDate").getValue();//实际到账日
				endFactDate=Ext.util.Format.date(endFactDate, 'Y-m-d');
				var projectProperties = this.getCmpByName("projectProperties").getValue();
				
				window.open( __ctxPath + "/creditFlow/finance/intentDownLoadSlFundIntent.do?" +
					"businessType="+this.businessType+
					"&typetab=owe"+
					"&fundType=('principalRepayment')"+
					"&Q_proj_Name_N_EQ="+encodeURIComponent(encodeURIComponent(Q_proj_Name_N_EQ))+
					"&Q_projNum_N_EQ="+encodeURIComponent(encodeURIComponent(Q_projNum_N_EQ))+
					"&Q_intentDate_D_GE="+Q_intentDate_D_GE+
					"&Q_intentDate_D_LE="+Q_intentDate_D_LE+
					"&startFactDate="+startFactDate+
					"&endFactDate="+endFactDate+
					"&projectProperties="+projectProperties,
					'_blank');
			}
		});