/**
 * @author
 * @class BpMortgageCarSurfaceView
 * @extends Ext.Panel
 * @description [BpMortgageCarSurface]管理
 * @company 智维软件
 * @createtime:
 */
BpMortgageCarSurfaceView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				BpMortgageCarSurfaceView.superclass.constructor.call(this, {
							id : 'BpMortgageCarSurfaceView',
							title : '[BpMortgageCarSurface]管理',
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
									fieldLabel:'leftFrontWheel',
									name : 'Q_leftFrontWheel_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'rightFrontWheel',
									name : 'Q_rightFrontWheel_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'leftAfterWheel',
									name : 'Q_leftAfterWheel_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'rightAfterWheel',
									name : 'Q_rightAfterWheel_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'frontSecureBar',
									name : 'Q_frontSecureBar_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'leftFrontPlate',
									name : 'Q_leftFrontPlate_S_EQ',
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
									fieldLabel:'rightFrontPlate',
									name : 'Q_rightFrontPlate_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'leftFrontDoor',
									name : 'Q_leftFrontDoor_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'rightFrontDoor',
									name : 'Q_rightFrontDoor_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'leftAfterDoor',
									name : 'Q_leftAfterDoor_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'rightAfterDoor',
									name : 'Q_rightAfterDoor_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'leftAfterPlate',
									name : 'Q_leftAfterPlate_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'rightAfterPlate',
									name : 'Q_rightAfterPlate_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'afterSecureBar',
									name : 'Q_afterSecureBar_S_EQ',
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
									text : '添加[BpMortgageCarSurface]',
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									text : '删除[BpMortgageCarSurface]',
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
					id:'BpMortgageCarSurfaceGrid',
					url : __ctxPath + "/creditFlow.mortgage.vehicle/listBpMortgageCarSurface.do",
					fields : [{
									name : 'id',
									type : 'int'
								}
																																																	,'leftFrontWheel'
																																										,'rightFrontWheel'
																																										,'leftAfterWheel'
																																										,'rightAfterWheel'
																																										,'frontSecureBar'
																																										,'leftFrontPlate'
																																										,'engine'
																																										,'rightFrontPlate'
																																										,'leftFrontDoor'
																																										,'rightFrontDoor'
																																										,'leftAfterDoor'
																																										,'rightAfterDoor'
																																										,'leftAfterPlate'
																																										,'rightAfterPlate'
																																										,'afterSecureBar'
																																										,'mortgageid'
																																			],
					columns:[
								{
									header : 'id',
									dataIndex : 'id',
									hidden : true
								}
																																																								,{
																	header : 'leftFrontWheel',	
																	dataIndex : 'leftFrontWheel'
								}
																																																,{
																	header : 'rightFrontWheel',	
																	dataIndex : 'rightFrontWheel'
								}
																																																,{
																	header : 'leftAfterWheel',	
																	dataIndex : 'leftAfterWheel'
								}
																																																,{
																	header : 'rightAfterWheel',	
																	dataIndex : 'rightAfterWheel'
								}
																																																,{
																	header : 'frontSecureBar',	
																	dataIndex : 'frontSecureBar'
								}
																																																,{
																	header : 'leftFrontPlate',	
																	dataIndex : 'leftFrontPlate'
								}
																																																,{
																	header : 'engine',	
																	dataIndex : 'engine'
								}
																																																,{
																	header : 'rightFrontPlate',	
																	dataIndex : 'rightFrontPlate'
								}
																																																,{
																	header : 'leftFrontDoor',	
																	dataIndex : 'leftFrontDoor'
								}
																																																,{
																	header : 'rightFrontDoor',	
																	dataIndex : 'rightFrontDoor'
								}
																																																,{
																	header : 'leftAfterDoor',	
																	dataIndex : 'leftAfterDoor'
								}
																																																,{
																	header : 'rightAfterDoor',	
																	dataIndex : 'rightAfterDoor'
								}
																																																,{
																	header : 'leftAfterPlate',	
																	dataIndex : 'leftAfterPlate'
								}
																																																,{
																	header : 'rightAfterPlate',	
																	dataIndex : 'rightAfterPlate'
								}
																																																,{
																	header : 'afterSecureBar',	
																	dataIndex : 'afterSecureBar'
								}
																																																,{
																	header : 'mortgageid',	
																	dataIndex : 'mortgageid'
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
					new BpMortgageCarSurfaceForm({id:rec.data.id}).show();
				});
			},
			//创建记录
			createRs : function() {
				new BpMortgageCarSurfaceForm().show();
			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/creditFlow.mortgage.vehicle/multiDelBpMortgageCarSurface.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/creditFlow.mortgage.vehicle/multiDelBpMortgageCarSurface.do',
					grid:this.gridPanel,
					idName:'id'
				});
			},
			//编辑Rs
			editRs : function(record) {
				new BpMortgageCarSurfaceForm({
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
