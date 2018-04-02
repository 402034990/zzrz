/**
 * @author
 * @class 业务员级别管理
 * @extends Ext.Panel
 * @company 智维软件
 * @createtime:
 */
employeeLevelManage = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				employeeLevelManage.superclass.constructor.call(this, {
							//id : 'CsBankView',
							title : '业务员级别管理',
							region : 'center',
							layout : 'border',
							items : [ this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
			

				this.topbar = new Ext.Toolbar({
						items : [{
									iconCls : 'btn-add',
									text : '添加',
									xtype : 'button',
									scope : this,
									handler : this.createRs
								},/*'-',{
									iconCls : 'btn-detail',
									text : '查看',
									xtype : 'button',
									scope : this,
									handler : this.seeRs
								},*/'-',{
									iconCls : 'btn-edit',
									text : '编辑',
									xtype : 'button',
									scope : this,
									handler : this.editRs
								},'-', {
									iconCls : 'btn-del',
									text : '删除',
									xtype : 'button',
									scope:this,
									handler : this.removeSelRs
								}]
				});
	
				this.gridPanel=new HT.GridPanel({
					region:'center',
					tbar:this.topbar,
					id:'CsBankGrid',
					url : __ctxPath + "/creditFlow/common/listCsBank.do",
					fields : [{
									name : 'bankid',
									type : 'int'
								}
								,'bankname'
								,'remarks'																																			],
					columns:[
								{
									header : 'bankid',
									dataIndex : 'bankid',
									hidden : true
								},{
									header : '级别',	
									dataIndex : 'bankname1'
								},{
									header : '最低',	
									dataIndex : 'remarks1'
								},{
									header : '最高(不包含)',	
									dataIndex : 'remarks1'
								}
					]//end of columns
				});
				
					
			},// end of the initComponents()
			
						//创建记录
			createRs : function() {
				new LevelInfo().show();
			},
			//按ID删除记录
			removeRs : function(id) {
				/*$postDel({
					url:__ctxPath+ '/creditFlow/common/multiDelCsBank.do',
					ids:id,
					grid:this.gridPanel
				});*/
			},
			//把选中ID删除
			removeSelRs : function() {
				/*$delGridRs({
					url:__ctxPath + '/creditFlow/common/multiDelCsBank.do',
					grid:this.gridPanel,
					idName:'bankid'
				});*/
			},
			//编辑Rs
			editRs : function(record) {
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中任何一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					record=s[0]
					new LevelInfo({
						bankid : record.data.bankid,
						isAllReadOnly:false
					}).show();
				}
			}
			
});
