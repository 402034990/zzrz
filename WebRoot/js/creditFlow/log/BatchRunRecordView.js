/**
 * @author
 * @class BatchRunRecordView
 * @extends Ext.Panel
 * @description [BatchRunRecord]管理
 * @company 智维软件
 * @createtime:
 */
BatchRunRecordView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				BatchRunRecordView.superclass.constructor.call(this, {
							id : 'BatchRunRecordView',
							title : '跑批处理日志',
							region : 'center',
							layout : 'border',
							iconCls :'menu-flowManager',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				this.searchPanel = new HT.SearchPanel({
							layout : 'form',
							region : 'north',
							items:[{
									border : false,
									layout : 'column',
									items:[{	
											columnWidth : .2,
											labelAlign : 'right',
											xtype : 'container',
											layout : 'form',
											labelWidth : 120,
											defaults : {
												anchor : '100%'
											},
											items:[{
												fieldLabel : '开始跑批时间',
												name : 'Q_startRunDate_D_EQ',
												xtype : 'datefield',
												format : 'Y-m-d'
											}]
										},{
											columnWidth : .1,
											xtype : 'container',
											layout : 'form',
											defaults : {
												xtype : 'button'
											},
											style : 'padding-left:10px;',
											items : [{
												text : '查询',
												scope : this,
												iconCls : 'btn-search',
												handler : this.search
											}]
											},{
											columnWidth : .1,
											xtype : 'container',
											layout : 'form',
											defaults : {
												xtype : 'button'
											},
											style : 'padding-left:10px;',
											items : [{
												text : '重置',
												scope : this,
												iconCls : 'btn-reset',
												handler : this.reset
											}]
										}
									]
								
								}
							]	
				});// end of searchPanel

				this.topbar = new Ext.Toolbar({
							items : [{
									iconCls : 'btn-setting',
									text : '手动跑批',
									xtype : 'button',
									scope : this,
									handler : this.createPunishByTiming
								}]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					//使用RowActions
					id : 'BatchRunRecordGrid',
					url : __ctxPath + "/creditFlow/log/listBatchRunRecord.do",
					fields : [{
								name : 'id',
								type : 'int'
							}, 'runType', 'appUserId', 'appUserName',
							'startRunDate', 'endRunDate', 'happenAbnorma',
							'totalNumber','ids'],
					columns : [{
								header : 'id',
								dataIndex : 'id',
								hidden : true
							}, {
								header : '跑批类型',
								dataIndex : 'runType'
							}, {
								header : '操作人',
								dataIndex : 'appUserName'
							}, {
								header : '开始时间',
								dataIndex : 'startRunDate'
							}, {
								header : '结束时间',
								dataIndex : 'endRunDate'
							}, {
								header : '是否出现异常',
								dataIndex : 'happenAbnorma'
							}, {
								header : '异常数据Id',
								dataIndex : 'ids'
							}]
						//end of columns
				});


			},// end of the initComponents()
			//重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			//按条件搜索
			search : function() {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			//GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new BatchRunRecordForm({
										id : rec.data.id
									}).show();
						});
			},
			//创建记录
			createRs : function() {
				new BatchRunRecordForm().show();
			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath
									+ '/creditFlow.log/multiDelBatchRunRecord.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath
									+ '/creditFlow.log/multiDelBatchRunRecord.do',
							grid : this.gridPanel,
							idName : 'id'
						});
			},
			//编辑Rs
			editRs : function(record) {
				new BatchRunRecordForm({
							id : record.data.id
						}).show();
			},
			createPunishByTiming :function(){
			//	Ext.MessageBox.wait('正在操作','请稍后...');//锁屏
				var grid = this.gridPanel;
				Ext.Msg.confirm('信息确认', '此任务启动执行时间长，确定要跑批吗？', function(btn) {
					if (btn == 'yes') {
						Ext.ux.Toast.msg('操作信息', '开始跑批，请勿重复点击');
						Ext.Ajax.request({
					    	url : __ctxPath+ "/creditFlow/finance/createPunishByTimingSlFundIntent.do",
						    method : 'post',
						    success : function(response, request) {
					//	    	Ext.MessageBox.hide();//解除锁屏
								grid.getStore().reload();
								Ext.ux.Toast.msg('操作信息', '跑批成功！');
							},
							params : {
								
							}
						});
						
					}
				})
			}
		});
