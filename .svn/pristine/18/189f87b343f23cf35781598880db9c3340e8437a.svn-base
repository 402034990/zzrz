/**
 * @author
 * @class BpMortgageCarConfigureStatusView
 * @extends Ext.Panel
 * @description [BpMortgageCarConfigureStatus]管理
 * @company 智维软件
 * @createtime:
 */
BpMortgageCarConfigureStatusView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				BpMortgageCarConfigureStatusView.superclass.constructor.call(this, {
							id : 'BpMortgageCarConfigureStatusView',
							title : '[BpMortgageCarConfigureStatus]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				this.searchPanel=new HT.SearchPanel({
							layout : 'form',
							region : 'north',
							colNums:3,
							items:[
																					 																																					 								{
									fieldLabel:'carDoorConfigure',
									name : 'Q_carDoorConfigure_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'siren',
									name : 'Q_siren_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'instrument',
									name : 'Q_instrument_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'tvMonitor',
									name : 'Q_tvMonitor_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'gasbag',
									name : 'Q_gasbag_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'steeringDevice',
									name : 'Q_steeringDevice_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'lockClosedDevice',
									name : 'Q_lockClosedDevice_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'airConditioning',
									name : 'Q_airConditioning_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'brake',
									name : 'Q_brake_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'electricChair',
									name : 'Q_electricChair_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'drainageSystem',
									name : 'Q_drainageSystem_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'carWindowDevice',
									name : 'Q_carWindowDevice_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'coolingSystem',
									name : 'Q_coolingSystem_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'soundDevice',
									name : 'Q_soundDevice_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'transmissionDevice',
									name : 'Q_transmissionDevice_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'carLamp',
									name : 'Q_carLamp_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'engine',
									name : 'Q_engine_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																													 								 								{
									fieldLabel:'mortgageid',
									name : 'Q_mortgageid_N_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'drMirror',
									name : 'Q_drMirror_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'machine',
									name : 'Q_machine_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'driveMachine',
									name : 'Q_driveMachine_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
															 							 							 															],
								buttons:[
									{
										text:'查询',
										scope:this,
										iconCls:'btn-search',
										handler:this.search
									},{
										text:'重置',
										scope:this,
										iconCls:'btn-reset',
										handler:this.reset
									}							
								]	
				});// end of searchPanel

				this.topbar = new Ext.Toolbar({
						items : [{
									iconCls : 'btn-add',
									text : '添加[BpMortgageCarConfigureStatus]',
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									text : '删除[BpMortgageCarConfigureStatus]',
									xtype : 'button',
									scope:this,
									handler : this.removeSelRs
								}]
				});
	
				this.gridPanel=new HT.GridPanel({
					region:'center',
					tbar:this.topbar,
					//使用RowActions
					rowActions:true,
					id:'BpMortgageCarConfigureStatusGrid',
					url : __ctxPath + "/creditFlow.mortgage.vehicle/listBpMortgageCarConfigureStatus.do",
					fields : [{
									name : 'id',
									type : 'int'
								}
																																																	,'carDoorConfigure'
																																										,'siren'
																																										,'instrument'
																																										,'tvMonitor'
																																										,'gasbag'
																																										,'steeringDevice'
																																										,'lockClosedDevice'
																																										,'airConditioning'
																																										,'brake'
																																										,'electricChair'
																																										,'drainageSystem'
																																										,'carWindowDevice'
																																										,'coolingSystem'
																																										,'soundDevice'
																																										,'transmissionDevice'
																																										,'carLamp'
																																										,'engine'
																																										,'mortgageid'
																																										,'drMirror'
																																										,'machine'
																																										,'driveMachine'
																																			],
					columns:[
								{
									header : 'id',
									dataIndex : 'id',
									hidden : true
								}
																																																								,{
																	header : 'carDoorConfigure',	
																	dataIndex : 'carDoorConfigure'
								}
																																																,{
																	header : 'siren',	
																	dataIndex : 'siren'
								}
																																																,{
																	header : 'instrument',	
																	dataIndex : 'instrument'
								}
																																																,{
																	header : 'tvMonitor',	
																	dataIndex : 'tvMonitor'
								}
																																																,{
																	header : 'gasbag',	
																	dataIndex : 'gasbag'
								}
																																																,{
																	header : 'steeringDevice',	
																	dataIndex : 'steeringDevice'
								}
																																																,{
																	header : 'lockClosedDevice',	
																	dataIndex : 'lockClosedDevice'
								}
																																																,{
																	header : 'airConditioning',	
																	dataIndex : 'airConditioning'
								}
																																																,{
																	header : 'brake',	
																	dataIndex : 'brake'
								}
																																																,{
																	header : 'electricChair',	
																	dataIndex : 'electricChair'
								}
																																																,{
																	header : 'drainageSystem',	
																	dataIndex : 'drainageSystem'
								}
																																																,{
																	header : 'carWindowDevice',	
																	dataIndex : 'carWindowDevice'
								}
																																																,{
																	header : 'coolingSystem',	
																	dataIndex : 'coolingSystem'
								}
																																																,{
																	header : 'soundDevice',	
																	dataIndex : 'soundDevice'
								}
																																																,{
																	header : 'transmissionDevice',	
																	dataIndex : 'transmissionDevice'
								}
																																																,{
																	header : 'carLamp',	
																	dataIndex : 'carLamp'
								}
																																																,{
																	header : 'engine',	
																	dataIndex : 'engine'
								}
																																																,{
																	header : 'mortgageid',	
																	dataIndex : 'mortgageid'
								}
																																																,{
																	header : 'drMirror',	
																	dataIndex : 'drMirror'
								}
																																																,{
																	header : 'machine',	
																	dataIndex : 'machine'
								}
																																																,{
																	header : 'driveMachine',	
																	dataIndex : 'driveMachine'
								}
																																								, new Ext.ux.grid.RowActions({
									header:'管理',
									width:100,
									actions:[{
											 iconCls:'btn-del',qtip:'删除',style:'margin:0 3px 0 3px'
										},{
											 iconCls:'btn-edit',qtip:'编辑',style:'margin:0 3px 0 3px'
										}
									],
									listeners:{
										scope:this,
										'action':this.onRowAction
									}
								})
					]//end of columns
				});
				
				this.gridPanel.addListener('rowdblclick',this.rowClick);
					
			},// end of the initComponents()
			//重置查询表单
			reset : function(){
				this.searchPanel.getForm().reset();
			},
			//按条件搜索
			search : function() {
				$search({
					searchPanel:this.searchPanel,
					gridPanel:this.gridPanel
				});
			},
			//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new BpMortgageCarConfigureStatusForm({id:rec.data.id}).show();
				});
			},
			//创建记录
			createRs : function() {
				new BpMortgageCarConfigureStatusForm().show();
			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/creditFlow.mortgage.vehicle/multiDelBpMortgageCarConfigureStatus.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/creditFlow.mortgage.vehicle/multiDelBpMortgageCarConfigureStatus.do',
					grid:this.gridPanel,
					idName:'id'
				});
			},
			//编辑Rs
			editRs : function(record) {
				new BpMortgageCarConfigureStatusForm({
					id : record.data.id
				}).show();
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.id);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
