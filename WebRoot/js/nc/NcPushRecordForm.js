/**
 * @author 
 * @createtime 
 * @class UPushRecordForm
 * @extends Ext.Window
 * @description UPushRecord表单
 * @company 智维软件
 */
NcPushRecordForm = Ext.extend(Ext.Window, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				NcPushRecordForm.superclass.constructor.call(this, {
							id : 'NcPushRecordFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[UPushRecord]详细信息',
							buttonAlign : 'center',
							buttons : [
										{
											text : '保存',
											iconCls : 'btn-save',
											scope : this,
											handler : this.save
										}, {
											text : '重置',
											iconCls : 'btn-reset',
											scope : this,
											handler : this.reset
										}, {
											text : '取消',
											iconCls : 'btn-cancel',
											scope : this,
											handler : this.cancel
										}
							         ]
				});
			},//end of the constructor
			//初始化组件
			initUIComponents : function() {
				this.formPanel = new Ext.FormPanel({
							layout : 'form',
							bodyStyle : 'padding:10px',
							border : false,
							autoScroll:true,
							//id : 'UPushRecordForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'uPushRecord.id',
								xtype : 'hidden',
								value : this.id == null ? '' : this.id
							}
																																																	,{
																fieldLabel : '操作类型',	
								 								name : 'uPushRecord.optType'
								 																,xtype:'numberfield'
								 							}
																																										,{
																fieldLabel : '推送数据包',	
								 								name : 'uPushRecord.pushData'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '业务流水号',	
								 								name : 'uPushRecord.requestNo'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '推送次数',	
								 								name : 'uPushRecord.pushNumber'
								 																,xtype:'numberfield'
								 							}
																																										,{
																fieldLabel : '推送人员姓名',	
								 								name : 'uPushRecord.pushUserName'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '推送人员Id',	
								 								name : 'uPushRecord.pushUserId'
								 																,xtype:'numberfield'
								 							}
																																										,{
																fieldLabel : '创建时间',	
								 								name : 'uPushRecord.createDate'
								 																,xtype:'datefield',
								format:'Y-m-d',
								value:new Date()
								 							}
																																										,{
																fieldLabel : '修改时间',	
								 								name : 'uPushRecord.updateDate'
								 																,xtype:'datefield',
								format:'Y-m-d',
								value:new Date()
								 							}
																																										,{
																fieldLabel : '状态码',	
								 								name : 'uPushRecord.returnCode'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '返回信息说明',	
								 								name : 'uPushRecord.returnMsg'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '返回时间',	
								 								name : 'uPushRecord.returnDate'
								 																,xtype:'datefield',
								format:'Y-m-d',
								value:new Date()
								 							}
																																										,{
																fieldLabel : '是否有效',	
								 								name : 'uPushRecord.state'
								 																,xtype:'numberfield'
								 							}
																																										,{
																fieldLabel : '内部关联Id',	
								 								name : 'uPushRecord.insideId'
								 																,xtype:'numberfield'
								 							}
																																			]
						});
				//加载表单对应的数据	
				if (this.id != null && this.id != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/creditFlow.ourmain/getNcPushRecord.do?id='+ this.id,
								root : 'data',
								preName : 'uPushRecord'
							});
				}
				
			},//end of the initcomponents

			/**
			 * 重置
			 * @param {} formPanel
			 */
			reset : function() {
				this.formPanel.getForm().reset();
			},
			/**
			 * 取消
			 * @param {} window
			 */
			cancel : function() {
				this.close();
			},
			/**
			 * 保存记录
			 */
			save : function() {
				$postForm({
						formPanel:this.formPanel,
						scope:this,
						url:__ctxPath + '/creditFlow.ourmain/saveNcPushRecord.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('UPushRecordGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});