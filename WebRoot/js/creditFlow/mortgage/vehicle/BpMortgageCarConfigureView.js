/**
 * @author
 * @class BpMortgageCarConfigureView
 * @extends Ext.Panel
 * @description [BpMortgageCarConfigure]管理
 * @company 智维软件
 * @createtime:
 */
BpMortgageCarConfigureView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				BpMortgageCarConfigureView.superclass.constructor.call(this, {
							id : 'BpMortgageCarConfigureView',
							title : '[BpMortgageCarConfigure]管理',
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
									fieldLabel:'shift',
									name : 'Q_shift_S_EQ',
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
									fieldLabel:'fuel',
									name : 'Q_fuel_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'electricDoors',
									name : 'Q_electricDoors_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'electricMirror',
									name : 'Q_electricMirror_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'aluminiumAlloy',
									name : 'Q_aluminiumAlloy_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'remoteDoorLock',
									name : 'Q_remoteDoorLock_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'powerTurn',
									name : 'Q_powerTurn_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'addConfiguration',
									name : 'Q_addConfiguration_S_EQ',
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
									fieldLabel:'displacement',
									name : 'Q_displacement_S_EQ',
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
									text : '添加[BpMortgageCarConfigure]',
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									text : '删除[BpMortgageCarConfigure]',
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
					id:'BpMortgageCarConfigureGrid',
					url : __ctxPath + "/creditFlow.mortgage.vehicle/listBpMortgageCarConfigure.do",
					fields : [{
									name : 'id',
									type : 'int'
								}
																																																	,'shift'
																																										,'airConditioning'
																																										,'fuel'
																																										,'electricDoors'
																																										,'electricMirror'
																																										,'aluminiumAlloy'
																																										,'remoteDoorLock'
																																										,'powerTurn'
																																										,'addConfiguration'
																																										,'mortgageid'
																																										,'displacement'
																																			],
					columns:[
								{
									header : 'id',
									dataIndex : 'id',
									hidden : true
								}
																																																								,{
																	header : 'shift',	
																	dataIndex : 'shift'
								}
																																																,{
																	header : 'airConditioning',	
																	dataIndex : 'airConditioning'
								}
																																																,{
																	header : 'fuel',	
																	dataIndex : 'fuel'
								}
																																																,{
																	header : 'electricDoors',	
																	dataIndex : 'electricDoors'
								}
																																																,{
																	header : 'electricMirror',	
																	dataIndex : 'electricMirror'
								}
																																																,{
																	header : 'aluminiumAlloy',	
																	dataIndex : 'aluminiumAlloy'
								}
																																																,{
																	header : 'remoteDoorLock',	
																	dataIndex : 'remoteDoorLock'
								}
																																																,{
																	header : 'powerTurn',	
																	dataIndex : 'powerTurn'
								}
																																																,{
																	header : 'addConfiguration',	
																	dataIndex : 'addConfiguration'
								}
																																																,{
																	header : 'mortgageid',	
																	dataIndex : 'mortgageid'
								}
																																																,{
																	header : 'displacement',	
																	dataIndex : 'displacement'
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
					new BpMortgageCarConfigureForm({id:rec.data.id}).show();
				});
			},
			//创建记录
			createRs : function() {
				new BpMortgageCarConfigureForm().show();
			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/creditFlow.mortgage.vehicle/multiDelBpMortgageCarConfigure.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/creditFlow.mortgage.vehicle/multiDelBpMortgageCarConfigure.do',
					grid:this.gridPanel,
					idName:'id'
				});
			},
			//编辑Rs
			editRs : function(record) {
				new BpMortgageCarConfigureForm({
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
