/**
 * @author
 * @class AgentBailManagerView
 * @extends Ext.Panel
 * @description [PlProjectArchives]管理
 * @company 智维软件
 * @createtime:
 */
/**
 * @author lisl
 * @extends Ext.Panel
 * @description 小贷项目管理
 * @company 智维软件
 * @createtime:
 */
AgentBailManagerView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				AgentBailManagerView.superclass.constructor.call(this, {
							id : 'AgentBailManagerView'+this.businessType,
							title : '保证金管理',
							region : 'center',
							layout : 'border',
							iconCls : this.tabIconCls==null?'btn-tree-team2':this.tabIconCls,
							items : [ this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
			this.searchPanel = new Ext.FormPanel( {
			layout : 'column',
			region : 'north',
			height : 40,
			anchor : '96%',
			border : false,
			keys : [{
				key : Ext.EventObject.ENTER,
				fn : this.search,
				scope : this
			}, {
				key : Ext.EventObject.ESC,
				fn : this.reset,
				scope : this
			}],
			layoutConfig: {
               align:'middle'
            },
             bodyStyle : 'padding:10px 10px 10px 10px',
			items : []

		})

			this.topbar = new Ext.Toolbar( {
			items : [{
				iconCls : 'btn-add',
				text : '创建保证金账户',
				xtype : 'button',
				scope:this,
				hidden : isGranted('_Agent_create')?false:true,
				handler : this.createAccount
			},{
				iconCls : 'btn-readdocument',
				text : '查看保证金账户',
				xtype : 'button',
				scope:this,
				hidden : isGranted('_Agent_see')?false:true,
				handler : this.seeAccount
			},{
				iconCls : 'btn-add',
				text : '增加保证金',
				xtype : 'button',
				scope:this,
				hidden : isGranted('_Agent_add')?false:true,
				handler : this.agentAdd
			},{
				iconCls : 'btn-draw',
				text : '保证金支取',
				xtype : 'button',
				scope:this,
				hidden : isGranted('_Agent_get')?false:true,
				handler : this.archivessee
			},{
				iconCls : 'btn-log',
				text : '保证金记录',
				xtype : 'button',
				scope:this,
				hidden : isGranted('_Agent_result')?false:true,
				handler : this.seeProjectInfo
			}]
		});
				
			 this.gridPanel=new HT.GridPanel({
					id : 'PlProjectArchivesGrid',
					region:'center',
					tbar:this.topbar,
					rowActions : false,
					loadMask : true,
					url : __ctxPath+ '/entityhbm/listCashDep.do',
					fields : [{
								name : 'id',
								type : 'int'
							}, 'custormerNum','custormerName','custormerId','custormerType','cashName','cashmoney','cashzhanyong','cashshengyu','cashCount'],
					columns : [{
								header : '客户编号',
								dataIndex : 'custormerNum'
							}, {
								header : '客户名称',
								dataIndex : 'custormerName'
							}, {
								header : '保证金账户名',
								dataIndex : 'cashName'
							},
//							{
//								header : '保证金金额（元）',
//								align : 'right',
//								sortable : true,
//								dataIndex : 'cashmoney',
//								renderer : function(value) {
//									if(value ==null ||value == "" ) {
//										return "";
//									}else {
//										return Ext.util.Format.number(value,',000,000,000.00')+"元";
//									}
//								}
//							}, 
								{
								header : '已占用金额（元）',
								align : 'right',
								sortable : true,
								dataIndex : 'cashzhanyong',
								renderer : function(value) {
									if(value ==null ||value == "" ) {
										return "0.00元";
									}else {
										return Ext.util.Format.number(value,',000,000,000.00')+"元";
									}
								}
							}, {
								header : '剩余金额（元）',
								align : 'right',
								sortable : true,
								dataIndex : 'cashshengyu',
								renderer : function(value) {
									if(value ==null ||value == "" ) {
											return "0.00元";
									}else {
										return Ext.util.Format.number(value,',000,000,000.00')+"元";
									}
								}
							},{
								header : '开户人',
								dataIndex:'cashCount'
							}
					]//end of columns
				});
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
			archivessave :function(){
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中任何一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					var record=s[0];
				    var projectId = record.get('projectId');
					var businessType = record.get('businessType');
					Ext.Ajax.request({
						url : __ctxPath + '/creditFlow/archives/getbyprojectIdPlProjectArchives.do',
						params : {
							businessType : businessType,
							projectId : projectId
						},
						method : 'post',
						success : function(resp, op) {
							if(resp.responseText.replace(/(^\s*)|(\s*$)/g, "")=="{success:true,data:}"){
								 new PlProjectArchivesForm({
								      readonly :false,
								      businessType : businessType,
									  projectId : projectId
								 }).show();
							}else{
							   Ext.ux.Toast.msg('操作信息','此项目已经归档');
							}
						},
						failure : function() {
							Ext.ux.Toast.msg('信息提示', '出错，请联系管理员！');
						}
					});
				}
			},
			archivessee :function(){
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中任何一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					  var record=s[0];
					  var id = record.get('id');
				      new zhiquMargin({
				     	id:id,
				     	type:2
				      }).show();
				}
			},
			seeProjectInfo:function(){
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中任何一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					var record=s[0];
				    var id = record.get('id');
				 	new JiluMargin({
	               	    cashId :id
	               }).show();
				}
		},
		//进行保证金添加的操作
		agentAdd: function(){
		 
			var s = this.gridPanel.getSelectionModel().getSelections();
			if (s <= 0) {
				Ext.ux.Toast.msg('操作信息','请选中任何一条记录');
				return false;
			}else if(s.length>1){
				Ext.ux.Toast.msg('操作信息','只能选中一条记录');
				return false;
			}else{	
					var record=s[0];
				    var id = record.get('id');
				new AgentCreditAddFrom({ 
				   id:id,
				   type:1
				}).show();
			}
		},createAccount: function(){
			new CreateMargin({ }).show();
		},seeAccount: function(){
			var s = this.gridPanel.getSelectionModel().getSelections();
			if (s <= 0) {
				Ext.ux.Toast.msg('操作信息','请选中任何一条记录');
				return false;
			}else if(s.length>1){
				Ext.ux.Toast.msg('操作信息','只能选中一条记录');
				return false;
			}else{
				var record=s[0];
				var  customerType = record.get('custormerType');//客户类型
				var  id = record.get('id');//保证金主键
				new SeeCahsDetailWin({ 
					customerType:customerType,
					id:id
				}).show();
				 
			}
			
		}
});
