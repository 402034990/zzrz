//var formulatestore = new HT.JsonStore({
//	url : __ctxPath + "/finance/listSlFundIntent.do"	
//});

superviseSlFundIntent = Ext.extend(Ext.Panel,
				{ 
						slSuperviseRecordId : null,
						isUnLoadData :false,
						isThisSuperviseRecord :null,
					// 构造函数
					constructor : function(_cfg) {
						if(typeof(_cfg.projId)!="undefined")
						{
						      this.projectId=_cfg.projId;
						}
						if(typeof(_cfg.businessType)!="undefined")
						{
						      this.businessType=_cfg.businessType;
						}
						if (typeof (_cfg.slSuperviseRecordId) != "undefined") {
						this.slSuperviseRecordId = _cfg.slSuperviseRecordId;
						}
						if(typeof(_cfg.isUnLoadData)!="undefined")
						{
						      this.isUnLoadData=_cfg.isUnLoadData;
						}
						if(typeof(_cfg.isThisSuperviseRecord)!="undefined")
						{
						      this.isThisSuperviseRecord=_cfg.isThisSuperviseRecord;
						}
						if(typeof(_cfg.isHidddenautocreate)!="undefined")
						{
						      this.isHidddenautocreate=_cfg.isHidddenautocreate;
						}
						if(typeof(_cfg.object)!="undefined")
						{
						      this.object=_cfg.object;
						}
//					  this.businessType="Financing";
						Ext.applyIf(this, _cfg);
						// 必须先初始化组件
						this.initUIComponents();
						superviseSlFundIntent.superclass.constructor
								.call(this, {
									layout:'anchor',
		  					        anchor : '100%',
									items : [
										{xtype:'panel',border:false,bodyStyle:'margin-bottom:5px',html : '<br/><B><font class="x-myZW-fieldset-title">【'+this.titleText+'】:</font></B>'},
										this.gridPanel
									]
								});

					},// end of the constructor
					// 初始化组件

					initUIComponents : function() {
						var summary = new Ext.ux.grid.GridSummary();
						function totalMoney(v, params, data) {
							return '总计(元)';
						}
						this.ttbar=new Ext.Toolbar({
						    items: [ 
							{
								text : '增加',
								iconCls : 'btn-add',
								scope : this,
								handler : this.createRs
							}, '-', {
								iconCls : 'btn-del',
								scope : this,
								text : '删除',
								handler : this.removeSelRs
							}
							, '-', {
								iconCls : 'btn-info-add',
								scope : this,
								text : '生成',
								handler : this.autocreate
							}
							]
						});
						this.datafield=new Ext.form.DateField( {
									format : 'Y-m-d',
									allowBlank : false,
									readOnly:this.isHidden
								})
						var fundTypenodekey=""; 
						if(this.businessType=="Financing"){
						fundTypenodekey="finaning_fund";
						}	
						if(this.businessType=="SmallLoan"){
						fundTypenodekey="financeType";
						}
						this.comboType= new DicIndepCombo({
									editable : false,
									readOnly:this.isHidden,
									lazyInit : false,
									forceSelection : false,
									nodeKey : fundTypenodekey
								})
								this.comboType.store.reload();
					var params1={
										projectId : this.projectId,
									     flag1:1,
									     businessType:this.businessType
									};
				url=__ctxPath+ "/creditFlow/finance/listbySuperviseRecordSlFundIntent.do?slSuperviseRecordId="+this.slSuperviseRecordId+"&isThisSuperviseRecord="+this.isThisSuperviseRecord+"&isUnLoadData="+this.isUnLoadData;
						this.gridPanel = new HT.EditorGridPanel( {
							border : false,
							clicksToEdit : 1,
							isShowTbar : this.isHidden?false:true,
							showPaging : false,
							autoHeight : true,
							hiddenCm :this.isHidden,
				         	plugins: [summary],
							// 使用RowActions
							// rowActions : true,
							id : 'FundIntent_formulate_editGrid',
							url :url,
							baseParams :params1,
							fields : [ {
								name : 'fundIntentId'
							}, {
								name : 'fundType'
							}, {
								name : 'fundTypeName'
							}, {
								name : 'intentDate'
							}, {
								name : 'payMoney'
							}, {
								name : 'incomeMoney'
							}, {
								name : 'remark'
							},{
								name : 'dayOfEveryPeriod'} ],
							tbar : this.isHidden?null:this.ttbar,
							columns : [ {
								header : '资金类型',
								dataIndex : 'fundType',
								width : 170,
								summaryType: 'count',
								summaryRenderer: totalMoney,
								editor :this.comboType,
								renderer : function(value,metaData, record,rowIndex, colIndex,store) {
									var objcom = this.editor;
									var objStore = objcom.getStore();
						
									var idx = objStore.find("dicKey", value);
									
									if (idx != "-1") {

										return objStore.getAt(idx).data.itemValue;
									} else {
								        
										if(record.data.fundTypeName==""){
											
											record.data.fundTypeName=value
											
										}else{
											var x = store.getModifiedRecords();
											if(x!=null && x!=""){
												record.data.fundTypeName=value
											}
										}
										
										 return record.get("fundTypeName")
									}
									
						     }
								
							}, {
								header : '计划到账日',
//								xtype : 'datecolumn',
								format : 'Y-m-d',
								dataIndex : 'intentDate',
								sortable : true,
								width : 80,
								renderer : ZW.ux.dateRenderer(this.datafield),
								editor :this.datafield
							}, {
								header : '计划收入金额',
								dataIndex : 'incomeMoney',
								align : 'right',
								width : 127,
								summaryType: 'sum',
								editor : {
								xtype : 'numberfield',
								readOnly:this.isHidden,
								listeners : {
								   blur : function(v){
								  if(v.getValue()==""){
								    v.setValue("0.00")
								  }
								   
								   }
									
								}
								},
								renderer : function(value,metaData, record,rowIndex, colIndex,store){
									 
													return Ext.util.Format.number(value,',000,000,000.00')+"元"
												  
								}
							}, {
								header : '计划支出金额',
								dataIndex : 'payMoney',
								align : 'right',
								width : 127,
								summaryType: 'sum',
								editor : {
								xtype : 'numberfield',
								readOnly:this.isHidden,
								listeners : {
								   blur : function(v){
								  if(v.getValue()==""){
								    v.setValue("0.00")
								  }
								   
								   }
									
								}
								},
								renderer : function(value,metaData, record,rowIndex, colIndex,store){
													return Ext.util.Format.number(value,',000,000,000.00')+"元"
												  
								}
							
							}, {
								header : '备注',
								dataIndex : 'remark',
								align : 'center',
								width : 568,
								editor : new Ext.form.TextField( {
									allowBlank : false,
									readOnly:this.isHidden
								})
							}/*, { 
								
								header :'',
								dataIndex : '',
								scope : this,
								editor : new Ext.form.TextField( {
									id : 'fundIntentJsonData2',
									name : 'fundIntentJsonData',
									allowBlank : true
								})
							} */],
							listeners : {
								afteredit : function(e) {
										if(e.record.data['fundType'] !='principalLending'){
												e.record.set('payMoney',0);
												e.record.commit()
										}
										if(e.record.data['fundType'] =='principalLending'){
											e.record.set('incomeMoney',0);
											e.record.commit();
								}
							  }
							}
						// end of columns
								});

					},
				autocreate : function() { 
					var gridPanel1=this.gridPanel
					 var operationType=null;//
					 var accrualtype=null;
					 var payaccrualType=null;
					 var continuationMoney=null;
					 var isStartDatePay=null;
					 var startDate=null;
					 var payintentPerioDate=null;
					 var continuationRate=null;
					 var financeServiceOfRate=null;   
					 var managementConsultingOfRate=null;
					 var payintentPeriod=null;
					 var payintentPerioddays=null;//
					 var endDate=null;
					 var dayOfEveryPeriod=null;
					 if(this.businessType=="SmallLoan"){
					  	accrualtype=this.object.getCmpByName("slSuperviseRecord.accrualtype").getValue();
					   	payaccrualType=this.object.getCmpByName("slSuperviseRecord.payaccrualType").getValue();
					    continuationMoney=this.object.getCmpByName("slSuperviseRecord.continuationMoney").getValue();
					   	isStartDatePay=this.object.getCmpByName("slSuperviseRecord.isStartDatePay").getValue();
					   	startDate=this.object.getCmpByName("slSuperviseRecord.startDate").getValue();
					   	payintentPerioDate=this.object.getCmpByName("slSuperviseRecord.payintentPerioDate").getValue();
					   	continuationRate=this.object.getCmpByName("slSuperviseRecord.continuationRate").getValue();
					    managementConsultingOfRate=this.object.getCmpByName("slSuperviseRecord.managementConsultingOfRate").getValue();
					   	financeServiceOfRate=this.object.getCmpByName("slSuperviseRecord.financeServiceOfRate").getValue();
					   	payintentPeriod=this.object.getCmpByName("slSuperviseRecord.payintentPeriod").getValue();
					   	endDate=this.object.getCmpByName("slSuperviseRecord.endDate").getValue();
		       			dayOfEveryPeriod=this.object.getCmpByName("slSuperviseRecord.dayOfEveryPeriod").getValue();
					 }
					 
					   var calcutype=this.businessType;  //业务品种
					   var projId=this.projectId;
					   var isPreposePayAccrualsupervise=this.object.getCmpByName("isPreposePayAccrualsupervise").getValue();
					   var message="";
					   if(accrualtype=="请选择" || accrualtype==null || accrualtype==""){
					     message="计息方式";
					   }else if(payaccrualType=="请选择" || payaccrualType==null){
					   	 message="付息方式";
					   } else if(managementConsultingOfRate ===""  || managementConsultingOfRate==null){
							    	 message="管理咨询费率";
					  } else if(financeServiceOfRate ==="" || financeServiceOfRate==null){
							   message="财务服务费率";
					  }
							   
			
				 if(calcutype=="SmallLoan"){
							   
							    if(continuationMoney=="" || continuationMoney==null){
							    	message="展期金额";
							   }
							   
							   if(startDate=="" || startDate==null){
							   	 message="展期开始日期";
							   }
							    if(payintentPeriod=="" || payintentPeriod==null ){
							   	 message="展期期限";
							   }
							    if(continuationRate=="" || continuationRate==null){
							    	message="展期利率";
							   }
							   if(accrualtype=="ontTimeAccrual"){
							   
							   	   if(endDate=="" || endDate==null){
								   	 message="展期结束日期";
								   }
							   	
							   }else{
								    if(isStartDatePay=="1"){
								    
								    	if(payintentPerioDate=="" || payintentPerioDate==null){
									   	 message="固定在几号还款";
									   }
								    }
							       endDate=startDate;
							       if(payaccrualType=="owerPay"){
							       if(dayOfEveryPeriod=="" || dayOfEveryPeriod==null){
							        message="自定义周期";
							       }
							     }
							   
							   }
							 
					    }
					    
			
			 if(message !=""){   
							  Ext.MessageBox.show({
		                    title : '操作信息',
		                    msg : message+'不能为空',
		                    buttons : Ext.MessageBox.OK,
		                    icon : 'ext-mb-error'
		                });
		                 return null;
			    	}
				
				
				
 
				
			
	        	 if(calcutype=="SmallLoan" &&payaccrualType=="ontTimeAccrual" && endDate <= startDate){
	        	 
	        	 	   message="展期结束日期必须在展期开始日期之后"; 
		               Ext.MessageBox.show({
		                    title : '操作信息',
		                    msg : message,
		                    buttons : Ext.MessageBox.OK,
		                    icon : 'ext-mb-error'
		                });
		                 return null;
	        	 	
	        	 	
	        	 }
					   var isPreposePayAccrual=0;
					   if(isPreposePayAccrualsupervise == true){
					     var isPreposePayAccrual=1;
					   }
					    gridPanel1.getStore().setBaseParam('projectId',projId) ; 
					     gridPanel1.getStore().setBaseParam('slSuperviseRecord.accrualtype', accrualtype);
					      gridPanel1.getStore().setBaseParam('slSuperviseRecord.isPreposePayAccrualsupervise', isPreposePayAccrual);
					    gridPanel1.getStore().setBaseParam('slSuperviseRecord.payaccrualType', payaccrualType);
					     gridPanel1.getStore().setBaseParam('slSuperviseRecord.continuationMoney', continuationMoney);
					    gridPanel1.getStore().setBaseParam('slSuperviseRecord.startDate', startDate);
					       gridPanel1.getStore().setBaseParam('slSuperviseRecord.isStartDatePay', isStartDatePay);
					         gridPanel1.getStore().setBaseParam('slSuperviseRecord.endDate', endDate);
					    gridPanel1.getStore().setBaseParam('slSuperviseRecord.payintentPerioDate', payintentPerioDate);
					     gridPanel1.getStore().setBaseParam('slSuperviseRecord.continuationRate', continuationRate);
					    gridPanel1.getStore().setBaseParam('slSuperviseRecord.operationType',  this.businessType);
					     gridPanel1.getStore().setBaseParam('slSuperviseRecord.financeServiceOfRate', financeServiceOfRate);
					    gridPanel1.getStore().setBaseParam('slSuperviseRecord.managementConsultingOfRate', managementConsultingOfRate);
					    gridPanel1.getStore().setBaseParam('slSuperviseRecord.payintentPeriod', payintentPeriod);
					    gridPanel1.getStore().setBaseParam('slSuperviseRecord.dayOfEveryPeriod', dayOfEveryPeriod);
					    gridPanel1.getStore().setBaseParam('calcutype', calcutype);
					    this.gridPanel.getStore().setBaseParam('flag1',0) ; 
						gridPanel1.getStore().reload();

							

					},

					createRs : function() {
						this.datafield.setValue('');
						var newRecord = this.gridPanel.getStore().recordType;
						var newData = new newRecord( {
							fundIntentId : '',
							fundType : '',
							payMoney : 0,
							incomeMoney : 0,
							intentDate : new Date(),
							remark : ''
						});
						this.gridPanel.stopEditing();
						this.gridPanel.getStore().insert(this.gridPanel.getStore().getCount(), newData);
						this.gridPanel.getView().refresh();
						this.gridPanel.getSelectionModel().selectRow((this.gridPanel.getStore().getCount()-1));
						this.gridPanel.startEditing(0, 0);

					},

					getGridDate : function() {
						var vRecords = this.gridPanel.getStore().getRange(0,
								this.gridPanel.getStore().getCount()); // 得到修改的数据（记录对象）
						var vCount = vRecords.length; // 得到记录长度
						var vDatas = '';
						if (vCount > 0) {
						var st="";
							for ( var i = 0; i < vCount; i++) {
								if(vRecords[i].data.fundType !=null && vRecords[i].data.fundType !=""){
							//		 if(vRecords[i].data.fundIntentId == null || vRecords[i].data.fundIntentId == "")  {
											  st={"fundType":vRecords[i].data.fundType,"incomeMoney":vRecords[i].data.incomeMoney,"payMoney":vRecords[i].data.payMoney,"intentDate":vRecords[i].data.intentDate,"remark":vRecords[i].data.remark};
											vDatas += Ext.util.JSON
													.encode(st) + '@';
//									 }else{
//									     st={"fundIntentId":vRecords[i].data.fundIntentId,"fundType":vRecords[i].data.fundType,"incomeMoney":vRecords[i].data.incomeMoney,"payMoney":vRecords[i].data.payMoney,"intentDate":vRecords[i].data.intentDate,"remark":vRecords[i].data.remark};
//											vDatas += Ext.util.JSON
//													.encode(st) + '@';
//									 
//									 }
							   }
							}
							vDatas = vDatas.substr(0, vDatas.length - 1);
						}
						//Ext.getCmp('fundIntentJsonData2').setValue(vDatas);
//						this.gridPanel.getColumnsgetEditor().getCmpByName('fundIntentJsonData').setValue(vDatas);
						return vDatas;
					},
					saveRs : function() {
						var data = this.getGridDate();
						Ext.Ajax
								.request( {
									url : __ctxPath + '/creditFlow/finance/savejsonSlFundIntent.do',
									method : 'POST',
									scope : this,
									params : {
										slFundIentJson : data,
										projectId : this.projectId,
										businessType :this.businessType
									},
									success : function(response, request) {
										this.gridPanel.getStore().setBaseParam('flag1',1) ; 
										this.gridPanel.getStore().reload();

									}
								});

					},
					save : function(){
						this.gridPanel.getStore().setBaseParam('flag1',1) ; 
						this.gridPanel.getStore().reload();

					},
					removeSelRs : function() {
						var fundIntentGridPanel = this.gridPanel;
						var projId=this.projectId
						var deleteFun = function(url, prame, sucessFun,i,j) {
							Ext.Ajax
									.request( {
										url : url,
										method : 'POST',
										success : function(response) {
											if (response.responseText.trim() == '{success:true}') {
													if(i==(j-1)){
												    Ext.ux.Toast.msg('操作信息', '删除成功!');
												}
												sucessFun();
											} else if (response.responseText
													.trim() == '{success:false}') {
												Ext.ux.Toast.msg('操作信息', '删除失败!');
											}
										},
										params : prame
									});
						};
                    var  a= fundIntentGridPanel.getSelectionModel().getSelections();
                          if (a <= 0) {
												Ext.ux.Toast.msg('操作信息','请选择要删除的记录');
												return false;
											};
						Ext.Msg
								.confirm("提示!",
										'确定要删除吗？',
										function(btn) {

											if (btn == "yes") {
												//	grid_sharteequity.stopEditing();
										var s = fundIntentGridPanel.getSelectionModel().getSelections();
										for ( var i = 0; i < s.length; i++) {
											var row = s[i];
											if (row.data.fundIntentId == null || row.data.fundIntentId == '') {
												fundIntentGridPanel.getStore().remove(row);
											} else {
												deleteFun(
													__ctxPath + '/creditFlow/finance/deleteSlFundIntent.do',
													{
														fundIntentId : row.data.fundIntentId,
														projectId : projId,
														businessType : this.businessType
													},
													function() {
														fundIntentGridPanel.getStore().remove(row);
														fundIntentGridPanel.getStore().reload();
													},i,s.length);

									}

										}

									}

								});

					}

				});