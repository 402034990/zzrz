/**
 * @author
 * @class AccountIndexForm
 * @extends Ext.Panel
 * @description [AccountIndexForm]管理
 * @company 互融软件
 * @createtime:
 */
AccountIndexForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		AccountIndexForm.superclass.constructor.call(this, {
					id : 'AccountIndexForm',
					title :'财务汇总',
					region : 'center',
					layout : 'border',
					width : 700,
					height :!Ext.isEmpty(this.indexId)?500:300,
					constrainHeader : true,
					collapsible : true,
					frame : true,
					border : false,
					resizable : true,
					layout : 'fit',
					autoScroll : true,
					bodyStyle : 'overflowX:hidden',
					constrain : true,
					closable : true,
					modal : true,
					items : [this.formPanel],
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								hidden : this.readOnly,
								handler : this.save
							}, {
								text : '关闭',
								iconCls : 'btn-cancel',
								scope : this,
								handler : function() {
									this.close();
								}
							}]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		 this.AccountSumView=new AccountSumView({indexId:this.indexId,isHiddenAdd:this.readOnly,isHiddenEdit:this.readOnly,isHiddenDel:this.readOnly});
		 var customerId=this.customerId;
		 var customerType=this.customerType;
		this.formPanel = new Ext.FormPanel({
			monitorValid : true,
			bodyStyle : 'padding:10px',
			autoScroll : true,
			labelAlign : 'right',
			layout : "form",
			frame : true,
			border : false,
			items : [{
					layout : 'column',
					border : false,
					items : [               {
												name:"bpCustEntAccountSumIndex.customerId",
												xtype : "hidden",
												value:customerId

											}, {
												name:"bpCustEntAccountSumIndex.customerType",
												xtype : "hidden",
												value:customerType

											}, {
												name:"bpCustEntAccountSumIndex.id",
												xtype : "hidden",
												value : this.id

											},{
									       columnWidth : .5,
									       layout : "form", // 从上往下的布局
								           labelWidth : 110,
								         
									       items : [{
												xtype : "datefield",
						                        format:"Y-m-d",
												fieldLabel : "报表周期开始日期",
												readOnly : this.readOnly,
												anchor:"90%",
												name:"bpCustEntAccountSumIndex.startDate"
											}]

								},{
									       columnWidth : .5,
									       layout : "form", // 从上往下的布局
								           labelWidth : 100,
									       items : [{
												xtype : "datefield",
						                        format:"Y-m-d",
												fieldLabel : "报表周期结束日期",
												readOnly : this.readOnly,
											//	minValue:new Date(),
												anchor:"90%",
												name:"bpCustEntAccountSumIndex.endDate"
											}]

								},{
									       columnWidth : .5,
									       layout : "form", // 从上往下的布局
								           labelWidth : 110,
									       items : [{
													xtype : "combo",
													anchor : "90%",
													hiddenName : "bpCustEntAccountSumIndex.listId",
													displayField : 'itemName',
													valueField : 'itemId',
													triggerAction : 'all',
													allowBlank : false,
													editable:false,
													readOnly : !Ext.isEmpty(this.indexId)?true:false,
													disable : true,
													store : new Ext.data.SimpleStore({
															autoLoad : true,
															url :  __ctxPath+ '/creditFlow/common/getTypeJsonBpDicAccountTitleSetIndex.do',
																  fields : ['itemId', 'itemName']
															}),
															fieldLabel : "财务账套",
															blankText : "财务账套不能为空，请正确填写!",
															listeners : {
																	afterrender : function(combox) {
																		var st = combox.getStore();
																		st.on("load", function() {
																		    combox.setValue(combox
																					.getValue());
																		})
						                                           }
																}
															}]

								},{
									columnWidth : 1,
									layout : "form", // 从上往下的布局
								    labelWidth : 110,
									items : [{
												xtype : "textarea",
												fieldLabel : "分析说明",
												name:"bpCustEntAccountSumIndex.remark",
												readOnly : this.readOnly,
												anchor:"95%"

											}]

								}

					,{
								columnWidth : 1, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								 labelWidth : 80,
								 hidden:!Ext.isEmpty(this.indexId)?false:true,
								items : [
							 this.AccountSumView
							]
							}]
				}]
		})
		if(!Ext.isEmpty(this.indexId)){
			this.formPanel.loadData({
							url : 	__ctxPath + '/creditFlow/customer/enterprise/getBpCustEntAccountSumIndex.do?id='+ this.indexId,
								root : 'data',
								preName : 'bpCustEntAccountSumIndex',
								scope:this,
								success:function(resp,options){
									/*var opr_obj = this.getCmpByName('bpCustEntAccountIndex.endDate');
									var dtStr = "2016-06-06";
                                    var dtArr = dtStr.split("-");
									opr_obj.setMaxValue(new Date(dtArr[0], dtArr[1], dtArr[2]));*/
								}
							});
					
		}			
				
		
	}// end of the initComponents()
	,save:function(){
	
			this.formPanel.getForm().submit({
					url : 	__ctxPath + '/creditFlow/customer/enterprise/saveBpCustEntAccountSumIndex.do',
					method : 'POST',
					scope :this,
					params : {
										/*FianceIndexValuelistData : FianceIndexValuelistData*/
									},
					waitTitle : '连接',
					waitMsg : '消息发送中...',
					success : function(form ,action) {
						Ext.getCmp("BpCustEntAccountIndexGrid").store.reload();
						this.close();
						
					},
					failure : function(fp, action) {
					}
				});
					/*		       Ext.Ajax.request( {
									url : 	+ '/creditFlow/customer/enterprise/saveBpCustEntFianceReport.do',
									method : 'POST',
									scope : this,
									params : {
										FianceIndexValuelistData : FianceIndexValuelistData
									},
									success : function(response, request) {},
									checkfail:function(response, request) {}
								});*/
	}

});
