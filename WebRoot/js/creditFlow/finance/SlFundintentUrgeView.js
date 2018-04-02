/**
 * @author
 * @class SlFundintentUrgeView
 * @extends Ext.Panel
 * @description [SlFundintentUrge]管理
 * @company 智维软件
 * @createtime:
 */
SlFundintentUrgeView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				SlFundintentUrgeView.superclass.constructor.call(this, {
							id : 'SlFundintentUrgeView'+this.tabflag+this.businessType,
							title : this.tabflagtitle,
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				//this.businessType="all";
				var tabflag=this.tabflag;
				var onclickflag=this.onclickflag;
				var onclickisInterent=this.onclickisInterent;
				  var date5=new Date();
				   var time=date5.getTime();
					time+=1000*60*60*24*5;
					date5.setTime(time);
					 var datemonth=new Date();
				   var timemonth=datemonth.getTime();
					timemonth+=1000*60*60*24*30;
					datemonth.setTime(timemonth);
					
				 var isShow=false;
				if(RoleType=="control"){
				  isShow=true;
				}
				this.showBtnFlag =(this.businessType=='SmallLoan' || this.businessType=='Pawn'||this.businessType=='LeaseFinance')?false:true;//add by gao
				var comboType = new Ext.form.ComboBox({
									 	labelWidth:70,    
										fieldLabel : '款项类型',
//										xtype : 'combo',
										mode : 'local',
										displayField : 'name',
										valueField : 'id',
										editable : false,
										store : new Ext.data.SimpleStore({
													fields : ["name", "id"],
													data : [["本金或利息", "0"], ["本金", "1"], ["利息", "2"]]
				
												}),
										value :onclickflag ==0?0:onclickisInterent,		
										triggerAction : "all",
										hiddenName : "Q_intentType_SN_EQ",
										name : 'Q_intentType_SN_EQ',
										anchor : '96%'
						});
				if("LeaseFinance"==this.businessType){
					comboType = new DicIndepCombo({
						labelWidth:70,    
						fieldLabel : '款项类型',
						editable : true,
						lazyInit : false,
						forceSelection : false,
						anchor : '96%',
						hiddenName : "Q_intentType_SN_EQ",
						name : 'Q_intentType_SN_EQ',
						nodeKey : "leaseFundType"
					})
					comboType.store.reload();
				}
				this.isAll = isGranted('_seeAllPro_p7');// 是否授权显示所有项目记录
				if(this.businessType=='Pawn'){
					this.isAll = isGranted('_seeAllPawnPro_p1');
				}else if(this.businessType=='Financing'){
					this.isAll = isGranted('_seeAllPro_f1');
				}else if(this.businessType=='LeaseFinance'){
					this.isAll = isGranted('_seeAllPro_fl10');
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
				 //            bodyStyle : 'padding:10px 10px 10px 10px',
							items : [
							{   columnWidth : 0.2,
								layout : 'form',
								border : false,
								labelWidth : 60,
								labelAlign : 'right',
								items : [{
									 labelWidth:70,    
										fieldLabel : '项目名称',
										name : 'Q_proj_Name_N_EQ',
										flex : 1,
										editable : false,
										width:105,
										xtype :'textfield',
										anchor : '96%'
										
								}, {
									 labelWidth:70,    
										fieldLabel : '客户名称',
										name : 'Q_oppositeName_N_EQ',
										flex : 1,
										editable : false,
										width:105,
										xtype :'textfield',
										anchor : '96%'
	
									
								
								} ] 
								      
							},{   columnWidth : 0.2,
								layout : 'form',
								border : false,
								labelWidth : 60,
								labelAlign : 'right',
								items : [ {
									 labelWidth:70,    
										fieldLabel : '项目编号',
										name : 'Q_projNum_N_EQ',
										flex : 1,
										editable : false,
										width:105,
										//forceSelection : false,
										xtype :'textfield',
										anchor : '96%'
										
								}, comboType ] 
								      
							},
							{   columnWidth : 0.21,
								layout : 'form',
								border : false,
								labelWidth : 100,
								labelAlign : 'right',
								items : [ {
									labelWidth:70,   
									fieldLabel : '金额范围:从',
									labelSeparator : '',
									width:100,
									xtype : 'textfield',
						          	name : 'Q_incomemoney_S_GE',
						          	anchor : '96%'
								},  {
								     	fieldLabel : '计划到账日期:从',
										name : 'Q_intentDate_D_GE',
										labelSeparator : '',
										//id :'Q_intentDate_D_GE'+tabflag,
										xtype : 'datefield',
										format : 'Y-m-d',
										anchor : '96%',
										value :(onclickflag ==0 || onclickflag ==4)?null:new Date()
										
									}  ] 
								      
									}
									,
									{
										columnWidth : 0.14,
										layout : 'form',
										border : false,
										labelWidth : 20,
										labelAlign : 'right', 
										items : [
											     
											{
												fieldLabel : '到',
												name : 'Q_incomemoney_D_LE',
												labelSeparator : '',
												xtype : 'textfield',
												anchor : '96%'
												
											},{
												fieldLabel : '到',
												name : 'Q_intentDate_D_LE',
												labelSeparator : '',
												//id : 'Q_intentDate_D_LE'+tabflag,
												xtype : 'datefield',
												format : 'Y-m-d',
												anchor : '96%',
												value :onclickflag ==0?null:(onclickflag ==1?new Date():(onclickflag ==2?date5:(onclickflag ==3?datemonth:new Date)))
												
											},{
												name : 'isAll',
												xtype : 'hidden',
												value : this.isAll
											}]
										
										
									},{
						   columnWidth : .17,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 70,
							defaults : {
								anchor : '100%'
							},
								border : false,
								items : [
								isShow?{
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
								}:{border : false},{
										name : 'businessManager',
										xtype : 'trigger',
										fieldLabel : '客户经理',
										submitValue : true,
										triggerClass : 'x-form-search-trigger',
										editable : false,
										scope : this,
										anchor : "98%",
										onTriggerClick : function() {
											var obj = this;
											var appuerIdObj = obj.nextSibling();
											var userIds = appuerIdObj.getValue();
											if ("" == obj.getValue()) {
												userIds = "";
											}
											new UserDialog({
												userIds : userIds,
												userName : obj.getValue(),
												single : false,
												title : "选择客户经理",
												callback : function(uId, uname) {
													obj.setValue(uId);
													obj.setRawValue(uname);
													appuerIdObj.setValue(uId);
												}
											}).show();
				
										}
									}, {
										xtype : "hidden",
										name : 'Q_businessManager_S_LK'
									}
							]}, {
										columnWidth : .06,
										xtype : 'container',
										layout : 'form',
										defaults : {
											xtype : 'button'
										},
										style : 'padding-left:10px;',
										items : [{
											text : '查询',
											iconCls : 'btn-search',
											scope : this,
											handler : this.search
										}]
									}, {
										columnWidth : .08,
										xtype : 'container',
										layout : 'form',
										defaults : {
											xtype : 'button'
										},
										style : 'padding-left:10px;padding-top:8px',
										items : [ {
											text : '重置',
											scope : this,
											iconCls : 'btn-reset',
											handler : this.reset
										}]
									}
									
									

							]

						});// end of searchPanel
	             if(tabflag=="coming"){
					this.topbar = new Ext.Toolbar({
					items : [{
						iconCls : 'btn-clock',
						text :'到期通知',
						xtype : 'button',
						scope : this,
						hidden :this.showBtnFlag,
                        handler : function(){
						   this.createAllRs("coming")		
						}	
						
					},new Ext.Toolbar.Separator({
						hidden :this.showBtnFlag
					}) ,/*{
						iconCls : 'btn-print',
						text :'打印到期通知',
						xtype : 'button',
						scope : this,
						hidden :this.showBtnFlag,
						handler : function(){
							var thisPanel = this.gridPanel;
							var selected = this.gridPanel.getSelectionModel().getSelected();
							if (null == selected) {
								Ext.ux.Toast.msg('状态', '请选择一条记录！');
							} else {
								var window = new OperateKxcsContractWindow({
												businessType : selected.get('businessType'),
												piKey : selected.get('projectId'),
												//htType : 'DunningLetter',
												htType : 'baozContract',
												thisPanel : thisPanel
											});
									window.show();
									window.addListener({
										'close' : function() {
											thisPanel.getStore().reload();
										}
									});
							}
							//this.createLetterAndBook(0,0,"","LoanExpirationNotice")
						}
					},new Ext.Toolbar.Separator({
						hidden :this.showBtnFlag
					}) ,*/{
						iconCls : 'btn-xls',
						text :'导出到Excel',
						xtype : 'button',
						scope : this,
						hidden :this.showBtnFlag,
						handler : function() {
							var projectName=this.getCmpByName("Q_proj_Name_N_EQ").getValue();//项目名称
							var oppositeName=this.getCmpByName("Q_oppositeName_N_EQ").getValue();//客户名称
							var intentType=this.getCmpByName("Q_intentType_SN_EQ").getValue();//款项类型
							var projNum=this.getCmpByName("Q_projNum_N_EQ").getValue();//项目编号
							var incomemoney_S=this.getCmpByName("Q_incomemoney_S_GE").getValue();//从金额开始
							var incomemoney_D=this.getCmpByName("Q_incomemoney_D_LE").getValue();//到金额结束
							var intentDate_S=this.getCmpByName("Q_intentDate_D_GE").getValue();//从日期开始
								intentDate_S=Ext.util.Format.date(intentDate_S, 'Y-m-d')
							var intentDate_D_LE=this.getCmpByName("Q_intentDate_D_LE").getValue();//到日期结束
								intentDate_D_LE=Ext.util.Format.date(intentDate_D_LE, 'Y-m-d')
							//var companyId=this.getCmpByName("companyId").getValue();//
							window.open( __ctxPath + "/creditFlow/finance/outToExcelSlFundIntent.do?businessType="+this.businessType+"&tabflag="+this.tabflag+"&projectName="+encodeURIComponent(encodeURIComponent(projectName))+"&oppositeName="+encodeURIComponent(encodeURIComponent(oppositeName))+"&intentType="+intentType+"&projNum="+encodeURIComponent(encodeURIComponent(projNum))+"&incomemoney_S="+incomemoney_S+"&incomemoney_D="+incomemoney_D+"&intentDate_S="+intentDate_S+"&intentDate_D_LE="+intentDate_D_LE+"&isAll="+this.isAll,'_blank');
						}
			
					},'->',
						{
							xtype:'radio',
							scope : this,
							boxLabel : '今日到期',
							id:"11"+tabflag,
							name : '1',
							checked:onclickflag==1?true:false,
							listeners:{
								scope :this,
							    check :function(){
							    var flag=Ext.getCmp("11"+tabflag).getValue();
							     if(flag==true){ 
							     	this.getCmpByName("Q_intentDate_D_GE").setValue(new Date);
							     	 var now=new Date();
									 var time=now.getTime();
									 now.setTime(time);
									 this.getCmpByName("Q_intentDate_D_LE").setValue(now);
									 this.search();
							     }
							    }
							}
						},' ',' ', {
							xtype:'radio',
							boxLabel : '三天内到期',
							name : '1',
							id:"13"+tabflag,
							checked :onclickflag==2?true:false,
							 listeners:{
							 	scope :this,
							    check :function(){
							     var flag=Ext.getCmp("13"+tabflag).getValue();
							     if(flag==true){
							     	  this.getCmpByName("Q_intentDate_D_GE").setValue(new Date);
									    var now=new Date();
									   var time=now.getTime();
										time+=1000*60*60*24*3;
										now.setTime(time);
										this.getCmpByName("Q_intentDate_D_LE").setValue(now);
							      this.search();
							    }
							    }
							}
						},' ',' ',{
							xtype:'radio',
							boxLabel : '五天内到期',
							id:"12"+tabflag,
							name : '1',
							checked :onclickflag==3?true:false,
					//		style : "margin-bottom : 7px",
					//		labelStyle : "margin-top : 4px",
							listeners:{
								scope :this,
							    check :function(){
							   var flag=Ext.getCmp("12"+tabflag).getValue();
							     if(flag==true){
							     	 this.getCmpByName("Q_intentDate_D_GE").setValue(new Date);
									    var now=new Date();
									   var time=now.getTime();
										time+=1000*60*60*24*5;//加上5天
										now.setTime(time);
										 this.getCmpByName("Q_intentDate_D_LE").setValue(now);
									      this.search();
							    }
							    }
							}
						},' ',' ',' ',' '
		
					]
				});
				
			}else{
			   this.topbar = new Ext.Toolbar({
				items : [{
						iconCls : 'btn-clock',
						text :'催收流程',
						xtype : 'button',
						scope : this,
						hidden :this.showBtnFlag,
						handler : function(){
						var s = this.gridPanel.getSelectionModel().getSelections();
						if (s <= 0) {
							Ext.ux.Toast.msg('操作信息', '请选中任何一条记录');
							return false;
						} else if (s.length > 1) {
							Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
							return false;
						} else {      //isOtherFlow==0表示当前没有办理任何贷后流程()
								var record = s[0];
								Ext.Ajax.request({
									url : __ctxPath +"/flow/isStartProDefinition.do",
									params : {flowKey:'rbjrSettlementFlow'},
									method : 'POST',
									success : function(response) {
										var obj=Ext.util.JSON.decode(response.responseText);
										if(obj.status==0){//禁用
											Ext.ux.Toast.msg('操作信息','该流程已被禁用!');
										}else if(obj.status==2){//没有对应的流程记录
											Ext.ux.Toast.msg('操作信息','请确认该流程是否存在!');
										}else{
											var gridPanel=this.gridPanel
			 								Ext.Msg.confirm('信息确认', '是否启动催收流程', function(btn) {
								       		 	if (btn == 'yes') {
								       		 		var loadMarsk = new Ext.LoadMask(document.body, {    
													    msg:'正在处理数据，请稍候......',    
													    removeMask:true // 完成后移除    
													});
													loadMarsk.show();  //显示
													Ext.Ajax.request( {
														url : __ctxPath +"/project/StartRbjrSettlementFlowSlSmallloanProject.do",
														params : {projectId:record.data.projectId,businessType:record.data.businessType,
														          processType:"rbjrCollectionFlow",fundId:record.data.id},
														method : 'POST',
														success : function(response) {
															Ext.ux.Toast.msg('操作信息','申请成功!');
															//debugger;
															//gridPanel.getStore().reload()
															loadMarsk.hide();  //隐藏
															var obj=Ext.util.JSON.decode(response.responseText)
															var contentPanel = App.getContentPanel();
															if(obj.taskId==1){
																Ext.ux.Toast.msg('操作信息','您不是结清流程流程中任务<风控助理确认费用及预期天数>的处理人!');
																return;
															}else{
																var formView = contentPanel.getItem('ProcessNextForm' + obj.taskId);
																if (formView == null) {
																	formView = new ProcessNextForm({
																		taskId : obj.taskId,
																		activityName : obj.activityName,
																		projectName : obj.projectName,
																		agentTask : true
																	});
																	contentPanel.add(formView);
																}
																contentPanel.activate(formView);
															 }
															gridPanel.getStore().reload()
														},
												   		failure : function(fp, action) {
												   			loadMarsk.hide();  //隐藏
															Ext.MessageBox.show({
																title : '操作信息',
																msg : '信息保存出错，请联系管理员！',
																buttons : Ext.MessageBox.OK,
																icon : 'ext-mb-error'
															});
														}
													});
								       		 	}
			 								})
										}
									}
								});
						 }
					}
					  },new Ext.Toolbar.Separator({
						hidden :this.showBtnFlag
					}),/*{
						iconCls : 'btn-clock',
						text :'单笔款项催收',
						xtype : 'button',
						scope : this,
						hidden :this.showBtnFlag,
						handler : this.createRs
			
					},new Ext.Toolbar.Separator({
						hidden :this.showBtnFlag
					}) ,{
						iconCls : 'btn-clock',
						text :'还款催收',
						xtype : 'button',
						scope : this,
						hidden :this.showBtnFlag,
						 handler : function(){
						   this.createAllRs("overdue")		
						}	
					},new Ext.Toolbar.Separator({
						hidden :this.showBtnFlag
					}) ,{
						iconCls : 'btn-print',
						text :'打印催收通知单',
						xtype : 'button',
						scope : this,
						hidden :this.showBtnFlag,
						handler : function(){
							var thisPanel = this.gridPanel;
							var selected = this.gridPanel.getSelectionModel().getSelected();
							if (null == selected) {
								Ext.ux.Toast.msg('状态', '请选择一条记录！');
							} else {
								var htType = 'DunningLetter';//小贷默认值
								if("LeaseFinance" == selected.get('businessType')){
									htType = "flDunningLetter";
								}else if("Pawn" == selected.get("businessType")){
									htType = "plDunningLetter";
								}
								var window = new OperateKxcsContractWindow({
												businessType : selected.get('businessType'),
												piKey : selected.get('projectId'),
												htType : htType,
												thisPanel : thisPanel
											});
									window.show();
									window.addListener({
										'close' : function() {
											thisPanel.getStore().reload();
										}
									});
							}
						//this.createLetterAndBook(0,0,"","LoanOverdueUrgeNotice")
					}
			        	
			
					},new Ext.Toolbar.Separator({
					}) ,*/{
						iconCls : 'btn-xls',
						text :'导出到Excel',
						xtype : 'button',
						scope : this,
						handler : function() {
							var projectName=this.getCmpByName("Q_proj_Name_N_EQ").getValue();//项目名称
							var oppositeName=this.getCmpByName("Q_oppositeName_N_EQ").getValue();//客户名称
							var intentType=this.getCmpByName("Q_intentType_SN_EQ").getValue();//款项类型
							var projNum=this.getCmpByName("Q_projNum_N_EQ").getValue();//项目编号
							var incomemoney_S=this.getCmpByName("Q_incomemoney_S_GE").getValue();//从金额开始
							var incomemoney_D=this.getCmpByName("Q_incomemoney_D_LE").getValue();//到金额结束
							var intentDate_S=this.getCmpByName("Q_intentDate_D_GE").getValue();//从日期开始
							intentDate_S=Ext.util.Format.date(intentDate_S, 'Y-m-d')
							var intentDate_D_LE=this.getCmpByName("Q_intentDate_D_LE").getValue();//到日期结束
							intentDate_D_LE=Ext.util.Format.date(intentDate_D_LE, 'Y-m-d')
							//var companyId=this.getCmpByName("companyId").getValue();//
							window.open( __ctxPath + "/creditFlow/finance/outToExcelSlFundIntent.do?businessType="+this.businessType+"&tabflag="+this.tabflag+"&projectName="+encodeURIComponent(encodeURIComponent(projectName))+"&oppositeName="+encodeURIComponent(encodeURIComponent(oppositeName))+"&intentType="+intentType+"&projNum="+encodeURIComponent(encodeURIComponent(projNum))+"&incomemoney_S="+incomemoney_S+"&incomemoney_D="+incomemoney_D+"&intentDate_S="+intentDate_S+"&intentDate_D_LE="+intentDate_D_LE+"&isAll="+this.isAll,'_blank');
						}
					},/*{
						iconCls : 'btn-xls',
						text :'提交到法务部处理',
						xtype : 'button',
						hidden:this.tabflag==null?true:(this.tabflag=="overdue"?false:true),
						scope : this,
						handler : function() {
							var thisPanel = this.gridPanel;
							var selected = this.gridPanel.getSelectionModel().getSelected();
							if(selected==null){
								Ext.ux.Toast.msg('状态', '请选择一条记录！');
							}else{
								var fundIntentId = selected.data.fundIntentId;
								Ext.Ajax.request({
									url:__ctxPath + '/creditFlow/finance/getUrgeCustomSlFundintentUrge.do?projectId='+record.data.projectId+'&businessType='+record.data.businessType,
									method : 'POST',
									success : function(response, request) {
									
									}
								});
							}
							
						}
					},*/'->',
						{
							xtype:'radio',
							scope : this,
							boxLabel : '逾期小于30天',
							id:"11overdue1",
							hidden:this.tabflag==null?true:(this.tabflag=="overdue"?false:true),
							name : '1',
							checked:onclickflag==1?true:false,
							listeners:{
								scope :this,
							    check :function(){
							    var flag=Ext.getCmp("11overdue1").getValue();
							     if(flag==true){ 
							     	 this.getCmpByName("Q_intentDate_D_LE").setValue(new Date);
							     	 var now=new Date();
									 var time=now.getTime();
									 time -= 1000*60*60*24*30;
									 now.setTime(time);
									 this.getCmpByName("Q_intentDate_D_GE").setValue(now);
									 this.search();
							     }
							    }
							}
						},'','',{
							xtype:'radio',
							scope : this,
							boxLabel : '逾期30~60(包含)天',
							id:"13overdue1",
							hidden:this.tabflag==null?true:(this.tabflag=="overdue"?false:true),
							name : '1',
							checked:onclickflag==1?true:false,
							listeners:{
								scope :this,
							    check :function(){
							    var flag=Ext.getCmp("13overdue1").getValue();
							     if(flag==true){ 
							     	 var now=new Date();
							     	 var date1 = new Date();
							     	 var date2 = new Date();
							     	 var time1 = date1.setDate(date1.getDate()-30);
							     	 var time2 = date2.setDate(date2.getDate()-60);
							     	 date1.setTime(time1);
							     	 date2.setTime(time2);
							     	this.getCmpByName("Q_intentDate_D_GE").setValue(date2);
									 this.getCmpByName("Q_intentDate_D_LE").setValue(date1);
									 this.search();
							     }
							    }
							}
						},'','',{
							xtype:'radio',
							scope : this,
							boxLabel : '逾期60~100(包含)天',
							id:"14overdue1",
							hidden:this.tabflag==null?true:(this.tabflag=="overdue"?false:true),
							name : '1',
							checked:onclickflag==1?true:false,
							listeners:{
								scope :this,
							    check :function(){
							    var flag=Ext.getCmp("14overdue1").getValue();
							     if(flag==true){ 
							     	var now=new Date();
							     	 var date1 = new Date();
							     	 var date2 = new Date();
							     	 var time1 = date1.setDate(date1.getDate()-60);
							     	 var time2 = date2.setDate(date2.getDate()-100);
							     	 date1.setTime(time1);
							     	 date2.setTime(time2);
							     	this.getCmpByName("Q_intentDate_D_GE").setValue(date2);
									 this.getCmpByName("Q_intentDate_D_LE").setValue(date1);
									 this.search();
							     }
							    }
							}
						},'','',{
							xtype:'radio',
							scope : this,
							boxLabel : '逾期大于100天',
							id:"15overdue1",
							hidden:this.tabflag==null?true:(this.tabflag=="overdue"?false:true),
							name : '1',
							checked:onclickflag==1?true:false,
							listeners:{
								scope :this,
							    check :function(){
							    var flag=Ext.getCmp("15overdue1").getValue();
							     if(flag==true){ 
							     	var now=new Date();
							     	 var date1 = new Date();
							     	 var date2 = new Date();
							     	 var time1 = date1.setDate(date1.getDate()-100);
							     	 date1.setTime(time1);
							     	this.getCmpByName("Q_intentDate_D_LE").setValue(date1);
									// this.getCmpByName("Q_intentDate_D_LE").setValue(now.setTime(time1));
							     	this.search();
							     }
							    }
							}
						}]})
					
				}
				this.gridPanel = new HT.GridPanel({
					bodyStyle : "width : 100%",
					region : 'center',
					tbar : ((this.businessType=='SmallLoan' || this.businessType=='Pawn'||this.businessType=="LeaseFinance") || (this.businessType=='Financing' && tabflag=="coming") ) ?this.topbar:null,
					viewConfig:this.tabflag=="overdue"?{}: {  
		            	forceFit:false,
		            	getRowClass: function(record, index,rp,ds) {
		            	 	var v=record.get('factDate');
		            	 	if(v!=null){
           						return ""
		            	 	}else {
		            	 		var intentDate=record.get('intentDate');
		            	 		var nowDays=new Date().format("Y-m-d");//今天日期
								var date1 = new Date(Date.parse(intentDate.replace(/-/g,"/")));
			                    var date2 = new Date(Date.parse(nowDays.replace(/-/g,"/")));
			                    if(date1<date2){
			                    	return 'x-grid-record-red';
			                    }else{
			                    	return ""
			                    }
		            	 	}
				        }  
			        },
					// 使用RowActions
					rowActions : false,
					id : 'SlFundIntentGrid'+this.tabflag,
					url :onclickflag==0? (__ctxPath + "/creditFlow/finance/listbyurgeSlFundIntent.do?businessType="+this.businessType+"&tabflag="+this.tabflag+"&isAll="+this.isAll):null,
					fields : [{
								name : 'fundIntentId',
								type : 'int'
							}, 'projectName','projectNumber', 'incomeMoney','fundTypeName', 'intentDate',
							'payMoney', 'payInMoney', 'factDate','fundType',
							'afterMoney', 'notMoney','flatMoney', 'isOverdue',
							'overdueRate', 'status','remark','businessType','projectId',
							'lastslFundintentUrgeTime','oppositeName','opposittelephone','accrualMoney','overdureMoney',
							'projectStartDate','orgName'],
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
								header : '项目编号',
								dataIndex : 'projectNumber',
								width : 100
							}
							, {
								header : '客户名称',
								dataIndex : 'oppositeName',
								width : 100
							}
							, {
								header : '联系电话',
								dataIndex : 'opposittelephone',
								width : 120
							}, {
								header : '资金类型',
								dataIndex : 'fundTypeName',
								width : 130
							}, {
								header :this.businessType=='SmallLoan'?'计划收入金额':'计划支出金额',
								dataIndex : this.businessType=='SmallLoan'?'incomeMoney':'payMoney',
								align : 'right',
								width : 150,
								renderer:function(v){
									return Ext.util.Format.number(v,',000,000,000.00')+"元"
                         	     }
							
							}, {
								header : '未对账金额',
								dataIndex : 'notMoney',
								align : 'right',
								width : 150,
							//	sortable:true,
								renderer : function(v) {
									return Ext.util.Format.number(v,',000,000,000.00')+"元"
								}
							}, {
							
								header : '逾期金额',
								dataIndex : 'overdureMoney',
								align : 'right',
								width : 150,
							//	sortable:true,
								renderer : function(v) {
									if(v==null  || v==""){
										return '0.00元' 
									}else{
										return Ext.util.Format.number(v,',000,000,000.00')+"元"
									}
								}
							},{
								header : '罚息金额',
								dataIndex : 'accrualMoney',
								align : 'right',
								width : 150,
							//	sortable:true,
								renderer : function(v) {
									return Ext.util.Format.number(v,',000,000,000.00')+"元"
								}
							},{
								header : '计划到账日',
								width : 100,
								dataIndex : 'intentDate',
								align : 'center'
						//		sortable:true
							}, {
								header : '实际到账日',
								width : 100,
								dataIndex : 'factDate'
						//		sortable:true
							}, {
								header : '最后催收时间',
								dataIndex : 'lastslFundintentUrgeTime',
								width : 150,
								align : 'center'
								
							}
							
						]

						// end of columns
					});

			//	 this.gridPanel.addListener('rowdblclick',this.rowClick);
				 
					
			},// end of the initComponents()
			//重置查询表单
			reset : function(){
				this.searchPanel.getForm().reset();
				if (typeof (Ext.getCmp('11'+this.tabflag)) != "undefined") {
					Ext.getCmp('11'+this.tabflag).setValue(false);
				}
				if (typeof (Ext.getCmp('12'+this.tabflag)) != "undefined") {
					Ext.getCmp('12'+this.tabflag).setValue(false);
				}
				if (typeof (Ext.getCmp('13'+this.tabflag)) != "undefined") {
					Ext.getCmp('13'+this.tabflag).setValue(false);
				}
				
				if (typeof (Ext.getCmp('11overdue1')) != "undefined") {
					Ext.getCmp('11overdue1').setValue(false);
				}
				if (typeof (Ext.getCmp('13overdue1')) != "undefined") {
					Ext.getCmp('13overdue1').setValue(false);
				}
				if (typeof (Ext.getCmp('14overdue1')) != "undefined") {
					Ext.getCmp('14overdue1').setValue(false);
				}
				if (typeof (Ext.getCmp('15overdue1')) != "undefined") {
					Ext.getCmp('15overdue1').setValue(false);
				}
				this.gridPanel.getStore().proxy=new Ext.data.HttpProxy({url: __ctxPath + "/creditFlow/finance/listbyurgeSlFundIntent.do?businessType="+this.businessType+"&tabflag="+this.tabflag});
				$search({
					searchPanel:this.searchPanel,
					gridPanel:this.gridPanel
				});
			},
			//按条件搜索
			search : function() {
				this.gridPanel.getStore().proxy=new Ext.data.HttpProxy({url: __ctxPath + "/creditFlow/finance/listbyurgeSlFundIntent.do?businessType="+this.businessType+"&tabflag="+this.tabflag});
				$search({
					searchPanel:this.searchPanel,
					gridPanel:this.gridPanel
				});
			},
			//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new SlFundintentUrgeForm({slFundintentUrgeId:rec.data.slFundintentUrgeId}).show();
				});
			},
			//创建记录
			createRs : function() {
				var s = this.gridPanel.getSelectionModel().getSelections();
				var tabflag=this.tabflag
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					var	record=s[0];
						Ext.Ajax.request({
						url:__ctxPath + '/creditFlow/finance/getUrgeCustomSlFundintentUrge.do?projectId='+record.data.projectId+'&businessType='+record.data.businessType,
						method : 'POST',
						success : function(response, request) {
							var tabs = Ext.getCmp('centerTabPanel');
							var gpObj = document.getElementById('SlFundintentUrgeFormWin'+record.data.fundIntentId);
						if (gpObj == null) {
							var obj= Ext.util.JSON.decode(response.responseText);
							var custom = obj.data;
						    if(obj.oppositeType=="company_customer"){
						  	var custonname=custom.enterprisename;
							var email=custom.email;
							var area=custom.area;
							var telephone=custom.telephone;
							var receiveMail=custom.receiveMail;
							var postcoding=custom.postcoding;
							
							 gpObj= new SlFundintentUrgeForm({
							 	tabflag:tabflag,
							 	fundIntentobj:record.data,
								  fundIntentId : record.data.fundIntentId,
								  projectId : record.data.projectId,
								  businessType:record.data.businessType,
								   custonname:custonname,
								   email:email,
								   area:area,
								   telephone:telephone,
								   receiveMail:receiveMail,
								   postcoding:postcoding,
								   oppositeType:obj.oppositeType,
								   oppositeID:obj.oppositeID,
								   enterpriseId:custom.id,
								   gridPanel:this.gridPanel
								   }).show();
							
							}else{
							var custonname=custom.name;
							var email=custom.selfemail;
							var area=custom.postaddress;
							var telephone=custom.cellphone;
							var receiveMail=custom.name;
							var postcoding=custom.postcode;
							
							gpObj=  new SlFundintentUrgeForm({
								tabflag:tabflag,
								fundIntentobj:record.data,
								  fundIntentId : record.data.fundIntentId,
								  projectId : record.data.projectId,
								  businessType:record.data.businessType,
								   custonname:custonname,
								   email:email,
								   area:area,
								   telephone:telephone,
								   receiveMail:receiveMail,
								   postcoding:postcoding,
								   oppositeType:obj.oppositeType,
								   oppositeID:obj.oppositeID,
								   personIdValue:custom.id,
								   gridPanel:this.gridPanel
								   }).show();
							
							}
							 tabs.add(gpObj);
						  }
						 
						  tabs.setActiveTab("SlFundintentUrgeFormWin"+record.data.fundIntentId);
						}
						
					})
				 
				}
				
			},
			createAllRs : function(istype){
				var s = this.gridPanel.getSelectionModel().getSelections();
				var tabflag=this.tabflag
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					var	record=s[0];
						Ext.Ajax.request({
						url:__ctxPath + '/creditFlow/finance/getUrgeCustomSlFundintentUrge.do?projectId='+record.data.projectId+'&businessType='+record.data.businessType,
						method : 'POST',
						success : function(response, request) {
							var tabs = Ext.getCmp('centerTabPanel');
							var gpObj = document.getElementById('SlFundintentUrgeAllFormWin'+record.data.fundIntentId+istype);
							
						if (gpObj == null) {
							var obj= Ext.util.JSON.decode(response.responseText);
							var custom = obj.data;
						    if(obj.oppositeType=="company_customer"){
						  	var custonname=custom.enterprisename;
							var email=custom.email;
							var area=custom.area;
							var telephone=custom.telephone;
							var receiveMail=custom.receiveMail;
							var postcoding=custom.postcoding;
							
							 gpObj= new SlFundintentUrgeAllForm({
							 	tabflag:tabflag,
							 	fundIntentobj:record.data,
								  fundIntentId : record.data.fundIntentId,
								  projectId : record.data.projectId,
								  businessType:record.data.businessType,
								  projectName : record.data.projectName,
								  projectNumber : record.data.projectNumber,
								   custonname:custonname,
								   email:email,
								   area:area,
								   telephone:telephone,
								   receiveMail:receiveMail,
								   postcoding:postcoding,
								   oppositeType:obj.oppositeType,
								   oppositeID:obj.oppositeID,
								   enterpriseId:custom.id,
								   istype:istype,
								   gridPanel:this.gridPanel
								   }).show();
							
							}else{
							var custonname=custom.name;
							var email=custom.selfemail;
							var area=custom.postaddress;
							var telephone=custom.cellphone;
							var receiveMail=custom.name;
							var postcoding=custom.postcode;
							
							gpObj=  new SlFundintentUrgeAllForm({
								tabflag:tabflag,
								fundIntentobj:record.data,
								  fundIntentId : record.data.fundIntentId,
								  projectId : record.data.projectId,
								  businessType:record.data.businessType,
								  projectName : record.data.projectName,
								  projectNumber : record.data.projectNumber,
								   custonname:custonname,
								   email:email,
								   area:area,
								   telephone:telephone,
								   receiveMail:receiveMail,
								   postcoding:postcoding,
								   oppositeType:obj.oppositeType,
								   oppositeID:obj.oppositeID,
								   personIdValue:custom.id,
								   istype:istype,
								   gridPanel:this.gridPanel
								   
								   }).show();
							
							}
							 tabs.add(gpObj);
						  }
						 
						  tabs.setActiveTab("SlFundintentUrgeAllFormWin"+record.data.fundIntentId+istype);
						}
						
					})
				 
				}
				
			},
			//打印催收通知单
			urgenotice : function(id) {
				
				var s = this.gridPanel.getSelectionModel().getSelections();
				var tabflag=this.tabflag
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					var	record=s[0];
					args ={
							fundIntentId : record.data.fundIntentId 
					}
				   Ext.Ajax.request({
							url : __ctxPath+'/contract/makeIntentUrgeProduceHelper.do',
							method : 'POST',
							scope : this,
							success : function(response, request) {
								var obj = Ext.util.JSON.decode(response.responseText);
								if(obj.success == true){
									
								
									Ext.ux.Toast.msg('状态', '合同生成成功！');
								}else{
									Ext.ux.Toast.msg('状态', '合同生成失败，可能未上传合同模板，请重试！');
									pbar.getDialog().close();
								}
							},
							failure : function(response) {
								Ext.ux.Toast.msg('状态', '合同生成失败，请重试！');
								pbar.getDialog().close();
							},
							params : args
						})
			}
			},
			createLetterAndBook : function(categoryId,contractId,titleText,LBTemplate){
			
				var s = this.gridPanel.getSelectionModel().getSelections();
				var tabflag=this.tabflag
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					var	record=s[0];
				
					var projId=record.data.projectId;
					var businessType=record.data.businessType;
					
					
						var pbar = Ext.MessageBox.wait(titleText+'下载中...','请等待',{
								interval:200,
						    	increment:15
							});
						Ext.Ajax.request({
							url : __ctxPath+'/contract/createAssureIntentBookProduceHelper.do',
							method : 'GET',
							success : function(response, request) {
								var obj = Ext.util.JSON.decode(response.responseText);
								if(obj.success==true){
							//		Ext.ux.Toast.msg('状态', '生成'+titleText+'成功！');
								//	alert(obj.data.id);
									var categoryId=obj.data.id
									pbar.getDialog().close();
									window.open(__ctxPath+"/contract/downloadProduceHelper.do?categoryId="+categoryId,'_blank');
								}else{
									Ext.ux.Toast.msg('状态', '未上传'+titleText+'模板！');
									pbar.getDialog().close();
								}
							},
							failure : function(response) {
								Ext.ux.Toast.msg('状态', '操作失败，请重试！');
								pbar.getDialog().close();
							},
							params : {
								projId : projId,
								businessType : businessType,
								mark : LBTemplate,
								htType : LBTemplate,
								categoryId :categoryId ==null?0:categoryId,
								contractId :contractId
								
							}
						})
				}
			}
});
