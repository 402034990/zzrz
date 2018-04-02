/**
 * @author
 * @class BpDicAccountTitleSetIndexView
 * @extends Ext.Panel
 * @description [BpDicAccountTitleSetIndexView]管理
 * @company 互融软件
 * @createtime:
 */
BpDicAccountTitleSetIndexView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				BpDicAccountTitleSetIndexView.superclass.constructor.call(this, {
							id : 'BpDicAccountTitleSetIndexView',
							title : '财务账套管理',
							iconCls :'menu-flowManager',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				this.searchPanel=new HT.SearchPanel({
							layout : 'column',
							region : 'north',
							items : [{
								columnWidth : '.35',
								layout : 'form',
								border : false,
								labelAlign : 'right',
								labelWidth : 80,
								items:[{
									fieldLabel:'账套名称',
									name : 'listName',
									anchor : '98%',
									xtype : 'textfield'
								}]
							},{
								columnWidth : '.07',
								layout : 'form',
								border : false,
								items : [{
										xtype : 'button',
										text:'查询',
										scope:this,
										iconCls:'btn-search',
										handler:this.search
									}]
							},{
								columnWidth : '.07',
								layout : 'form',
								border : false,
								items : [{
									xtype : 'button',
									text:'重置',
									scope:this,
									iconCls:'btn-reset',
									handler:this.reset
								}]
							}]
				});// end of searchPanel

				this.topbar = new Ext.Toolbar({
						items : [{
									iconCls : 'btn-add',
									text : '添加账套',
									xtype : 'button',
									scope : this,
									handler : this.createRs
								},'-',{
									iconCls : 'btn-edit',
									text : '编辑账套',
									xtype : 'button',
									scope : this,
									handler : this.editRs
								},'-',{
									iconCls : 'btn-settings',
									text : '配置账套',
									xtype : 'button',
									scope : this,
									handler : this.configRs
								},'-',{
									iconCls : 'btn-del',
									text : '删除账套',
									xtype : 'button',
									scope:this,
									handler : this.removeSelRs
								}]
				});
	
				this.gridPanel=new HT.GridPanel({
					region:'center',
					tbar:this.topbar,
					id:'BpDicAccountTitleSetIndexGrid',
					url : __ctxPath + "/creditFlow/common/listBpDicAccountTitleSetIndex.do",
					fields : [{
									name : 'id',
									type : 'int'
								}
								,'listType','listName'
								,'remark','listCount'																																			],
					columns:[
								{
									header : 'id',
									dataIndex : 'id',
									hidden : true
								},{
									header : '账套类型',	
									dataIndex : 'listType',
									renderer:function(value){
					                if(value=='Customer'){
									   return '客户尽调专用账套'
								       }else if(value=='System'){
									    return '金融公司专用账套'
								   }
				                 }
								},{
									header : '账套名称',	
									dataIndex : 'listName'
								},{
									header : '科目数量',	
									dataIndex : 'listCount'
								},{
									header : '备注',	
									dataIndex : 'remark'
								}
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
	/*		//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new CsBankForm({bankid:rec.data.bankid,isAllReadOnly:false}).show();
				});
			},*/
			//创建记录
			createRs : function() {
				new BpDicAccountTitleSetIndexForm().show();
			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/creditFlow/common/multiDelBpDicAccountTitleSetIndex.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/creditFlow/common/multiBpDicAccountTitleSetIndex.do',
					grid:this.gridPanel,
					idName:'bankid'
				});
			},
			//查看Rs
			seeRs : function(record) {
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中任何一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					record=s[0]
					new BpDicAccountTitleSetIndexForm({
						listId : record.data.id,
						readOnly:true
					}).show();
				}
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
					new BpDicAccountTitleSetIndexForm({
						listId : record.data.id,
						readOnly:false
					}).show();
				}
			},
				//编辑Rs
			configRs : function(record) {
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中任何一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					record=s[0]
					new BpDicAccountTitleSetIndexForm({
						listId : record.data.id,
						isShowView:false,
						readOnly:false
					}).show();
				}
			}
			/*//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.bankid);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}*/
});
