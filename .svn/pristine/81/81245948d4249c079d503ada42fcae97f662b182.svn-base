/**
 * @author 
 * @createtime 
 * @class BpMortgageCarSurfaceForm
 * @extends Ext.Window
 * @description BpMortgageCarSurface表单
 * @company 智维软件
 */
BpMortgageCarSurfaceForm = Ext.extend(Ext.Window, {
			//构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				BpMortgageCarSurfaceForm.superclass.constructor.call(this, {
							id : 'BpMortgageCarSurfaceFormWin',
							layout : 'fit',
							items : this.formPanel,
							modal : true,
							height : 400,
							width : 500,
							maximizable : true,
							title : '[BpMortgageCarSurface]详细信息',
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
							//id : 'BpMortgageCarSurfaceForm',
							defaults : {
								anchor : '96%,96%'
							},
							defaultType : 'textfield',
							items : [{
								name : 'bpMortgageCarSurface.id',
								xtype : 'hidden',
								value : this.id == null ? '' : this.id
							}
																																																	,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.leftFrontWheel'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.rightFrontWheel'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.leftAfterWheel'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.rightAfterWheel'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.frontSecureBar'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.leftFrontPlate'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.engine'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.rightFrontPlate'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.leftFrontDoor'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.rightFrontDoor'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.leftAfterDoor'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.rightAfterDoor'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.leftAfterPlate'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.rightAfterPlate'
								 																 								,maxLength: 50
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.afterSecureBar'
								 																 								,maxLength: 255
								 							}
																																										,{
																fieldLabel : '',	
								 								name : 'bpMortgageCarSurface.mortgageid'
								 																,xtype:'numberfield'
								 							}
																																			]
						});
				//加载表单对应的数据	
				if (this.id != null && this.id != 'undefined') {
					this.formPanel.loadData({
								url : __ctxPath + '/creditFlow.mortgage.vehicle/getBpMortgageCarSurface.do?id='+ this.id,
								root : 'data',
								preName : 'bpMortgageCarSurface'
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
						url:__ctxPath + '/creditFlow.mortgage.vehicle/saveBpMortgageCarSurface.do',
						callback:function(fp,action){
							var gridPanel = Ext.getCmp('BpMortgageCarSurfaceGrid');
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							this.close();
						}
					}
				);
			}//end of save

		});