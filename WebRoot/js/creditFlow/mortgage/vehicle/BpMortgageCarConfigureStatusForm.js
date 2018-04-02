/**
 * @author 
 * @createtime 
 * @class BpMortgageCarConfigureStatusForm
 * @extends Ext.Window
 * @description BpMortgageCarConfigureStatus表单
 * @company 智维软件
 */
BpMortgageCarConfigureStatusForm = Ext.extend(Ext.Window, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				BpMortgageCarConfigureStatusForm.superclass.constructor.call(this, {
							id : 'BpMortgageCarConfigureStatusFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[BpMortgageCarConfigureStatus]详细信息',
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
							//id : 'BpMortgageCarConfigureStatusForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'bpMortgageCarConfigureStatus.id',
								xtype : 'hidden',
								value : this.id == null ? '' : this.id
							}
																																																	,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.carDoorConfigure'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.siren'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.instrument'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.tvMonitor'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.gasbag'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.steeringDevice'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.lockClosedDevice'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.airConditioning'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.brake'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.electricChair'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.drainageSystem'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.carWindowDevice'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.coolingSystem'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.soundDevice'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.transmissionDevice'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.carLamp'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.engine'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.mortgageid'
								 																,xtype:'numberfield'
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.drMirror'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.machine'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarConfigureStatus.driveMachine'
								 																 								,maxLength: 255
								 							}
																																			]
						});
				//加载表单对应的数据	
				if (this.id != null && this.id != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/creditFlow.mortgage.vehicle/getBpMortgageCarConfigureStatus.do?id='+ this.id,
								root : 'data',
								preName : 'bpMortgageCarConfigureStatus'
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
						url:__ctxPath + '/creditFlow.mortgage.vehicle/saveBpMortgageCarConfigureStatus.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('BpMortgageCarConfigureStatusGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});