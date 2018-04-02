/**
 * @author
 * @class CarWarningInfoView
 * @extends Ext.Panel
 * @description [CarWarningInfo]管理
 * @company 智维软件
 * @createtime:
 */
CarWarningInfoView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				CarWarningInfoView.superclass.constructor.call(this, {
							id : 'CarWarningInfoView',
							title : '[CarWarningInfo]管理',
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
									fieldLabel:'deviceNumber',
									name : 'Q_deviceNumber_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'warningInfoType',
									name : 'Q_warningInfoType_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'warningOccurLongitude',
									name : 'Q_warningOccurLongitude_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'warningOccurDimension',
									name : 'Q_warningOccurDimension_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'warningOccurDate',
									name : 'Q_warningOccurDate_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'warningRelieveDate',
									name : 'Q_warningRelieveDate_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'warningHandleResult',
									name : 'Q_warningHandleResult_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'remarks',
									name : 'Q_remarks_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'remarks1',
									name : 'Q_remarks1_D_EQ',
									flex:1,
																		xtype:'datefield',
									format:'Y-m-d'
																	}
																,
															 							 																																					 								{
									fieldLabel:'remarks2',
									name : 'Q_remarks2_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'remarks3',
									name : 'Q_remarks3_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'projectId',
									name : 'Q_projectId_L_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'carProjectId',
									name : 'Q_carProjectId_L_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'carLicenseNumber',
									name : 'Q_carLicenseNumber_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'customerName',
									name : 'Q_customerName_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'awayLineStatus',
									name : 'Q_awayLineStatus_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																													 								 								{
									fieldLabel:'sumAwayLine',
									name : 'Q_sumAwayLine_N_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
																,
															 							 																													 								 								{
									fieldLabel:'isRelieve',
									name : 'Q_isRelieve_N_EQ',
									flex:1,
																		xtype:'numberfield'
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
									text : '添加[CarWarningInfo]',
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									text : '删除[CarWarningInfo]',
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
					id:'CarWarningInfoGrid',
					url : __ctxPath + "/creditFlow.car/listCarWarningInfo.do",
					fields : [{
									name : 'id',
									type : 'int'
								}
																																																	,'deviceNumber'
																																										,'warningInfoType'
																																										,'warningOccurLongitude'
																																										,'warningOccurDimension'
																																										,'warningOccurDate'
																																										,'warningRelieveDate'
																																										,'warningHandleResult'
																																										,'remarks'
																																										,'remarks1'
																																										,'remarks2'
																																										,'remarks3'
																																										,'projectId'
																																										,'carProjectId'
																																										,'carLicenseNumber'
																																										,'customerName'
																																										,'awayLineStatus'
																																										,'sumAwayLine'
																																										,'isRelieve'
																																			],
					columns:[
								{
									header : 'id',
									dataIndex : 'id',
									hidden : true
								}
																																																								,{
																	header : 'deviceNumber',	
																	dataIndex : 'deviceNumber'
								}
																																																,{
																	header : 'warningInfoType',	
																	dataIndex : 'warningInfoType'
								}
																																																,{
																	header : 'warningOccurLongitude',	
																	dataIndex : 'warningOccurLongitude'
								}
																																																,{
																	header : 'warningOccurDimension',	
																	dataIndex : 'warningOccurDimension'
								}
																																																,{
																	header : 'warningOccurDate',	
																	dataIndex : 'warningOccurDate'
								}
																																																,{
																	header : 'warningRelieveDate',	
																	dataIndex : 'warningRelieveDate'
								}
																																																,{
																	header : 'warningHandleResult',	
																	dataIndex : 'warningHandleResult'
								}
																																																,{
																	header : 'remarks',	
																	dataIndex : 'remarks'
								}
																																																,{
																	header : 'remarks1',	
																	dataIndex : 'remarks1'
								}
																																																,{
																	header : 'remarks2',	
																	dataIndex : 'remarks2'
								}
																																																,{
																	header : 'remarks3',	
																	dataIndex : 'remarks3'
								}
																																																,{
																	header : 'projectId',	
																	dataIndex : 'projectId'
								}
																																																,{
																	header : 'carProjectId',	
																	dataIndex : 'carProjectId'
								}
																																																,{
																	header : 'carLicenseNumber',	
																	dataIndex : 'carLicenseNumber'
								}
																																																,{
																	header : 'customerName',	
																	dataIndex : 'customerName'
								}
																																																,{
																	header : 'awayLineStatus',	
																	dataIndex : 'awayLineStatus'
								}
																																																,{
																	header : 'sumAwayLine',	
																	dataIndex : 'sumAwayLine'
								}
																																																,{
																	header : 'isRelieve',	
																	dataIndex : 'isRelieve'
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
					new CarWarningInfoForm({id:rec.data.id}).show();
				});
			},
			//创建记录
			createRs : function() {
				new CarWarningInfoForm().show();
			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/creditFlow.car/multiDelCarWarningInfo.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/creditFlow.car/multiDelCarWarningInfo.do',
					grid:this.gridPanel,
					idName:'id'
				});
			},
			//编辑Rs
			editRs : function(record) {
				new CarWarningInfoForm({
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
