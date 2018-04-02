/**
 * @author
 * @class AgentCreditView
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
AgentCreditView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				AgentCreditView.superclass.constructor.call(this, {
							id : 'AgentCreditView',
							title : '授信记录',
							region : 'center',
							layout : 'border',
							iconCls : this.tabIconCls==null?'btn-tree-team2':this.tabIconCls,
							items : [this.searchPanel, this.gridPanel]
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
//			keys : [{
//				key : Ext.EventObject.ENTER,
//				fn : this.search,
//				scope : this
//			}, {
//				key : Ext.EventObject.ESC,
//				fn : this.reset,
//				scope : this
//			}],
			layoutConfig: {
               align:'middle'
            },
             bodyStyle : 'padding:10px 10px 10px 10px',
			items : [
				{
				columnWidth :0.2,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
			
				items : [ {
					xtype : 'textfield',
					fieldLabel : '客户编号',
					anchor : '100%',
					name : 'userNum'
				}]
			}, {
				columnWidth :0.2,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '客户名称',
					anchor : '100%',
					name : 'userName'
				}  ]
			},{
					labelAlign:'right',
					columnWidth : .2, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 85,
					border : false,
					items : [{
						labelWidth : 85,
						xtype : "combo",
						mode : 'local',
						triggerAction : 'all',
						hiddenName : "ceditTypeId",
						displayField : 'productName',
						valueField : 'id',
						fieldLabel : "授信状态",
						anchor : "100%",
						store : new Ext.data.SimpleStore({
							fields :["id", "productName"],
							data :  [["1", "启动授信"], ["2", "授信成功"],
									["3", "授信失败"]]
						})
					}]
			},{
				columnWidth : 0.08,
				layout : 'form',
				border : false,
				labelAlign : 'right',
				items : [ {
					xtype : 'button',
					text : '查询',
					width : 60,
					scope : this,
					style:'margin-left:30',
					iconCls : 'btn-search',
					handler : this.search
				} ]
			}, {
				columnWidth : 0.08,
				layout : 'form',
				border : false,

				labelAlign : 'right',
				items : [ {
					xtype : 'button',
					text : '重置',
					width : 60,
					scope : this,
					style:'margin-left:1',
					iconCls : 'btn-reset',
					handler : this.reset
				} ]
			} ]

		})

			this.topbar = new Ext.Toolbar( {
				items : [
//				{
//					iconCls : 'btn-readdocument',
//					text : '授信审批',
//					xtype : 'button',
//					scope:this,
//					hidden : isGranted('_Credit_examine')?false:true,
//					handler : this.creditExamine
//				},
//					{
//					iconCls : 'btn-readdocument',
//					text : '授信记录',
//					xtype : 'button',
//					scope:this,
//					hidden : isGranted('_Credit_log')?false:true,
//					handler : this.seeProjectInfo
//				},
				{
					iconCls : 'btn-readdocument',
					text : '授信使用记录',
					xtype : 'button',
					scope:this,
					hidden : isGranted('_Credit_used_log')?false:true,
					handler : this.seeProjectInfo
				},{
					iconCls : 'btn-readdocument',
					text : '查看授信信息',
					xtype : 'button',
					scope:this,
					hidden : isGranted('_Credit_log_see')?false:true,
					handler : this.seeBankCreditDetail
				},{
					iconCls : 'btn-example',
					text : '流程示意图',
					xtype : 'button',
					scope : this,
					hidden : isGranted('_Credit_showFlowImg') ? false : true,
					handler : this.showFlowImg
				}]
			});
				
				this.gridPanel=new HT.GridPanel({
					id : 'AgentCreditViewGrid',
					region:'center',
					tbar:this.topbar,
					//不适用RowActions
					rowActions : false,
					loadMask : false,
					url : __ctxPath + "/agentAproval/listBankCredit.do?isAll="+isGranted('_Credit_All'),
					fields : [{
								name : 'id',
								type : 'int'
							}, 'userNum','userName','bankCreditNum','creditMoney','useMoney','shengyuMoney',
							'appUserName','createtime','status','endTime','beginTime','taskId','oppositeType','oppositeID'],
					columns : [{
								header : '客户编号',
								dataIndex : 'userNum'
							}, {
								header : '客户名称',
								dataIndex : 'userName'
							}, {
								header : '授信编号',
								align : 'right',
								sortable : true,
								dataIndex : 'bankCreditNum'
							}, {
								header : '授信金额（元）',
								align : 'right',
								sortable : true,
								dataIndex : 'creditMoney',
								renderer : function(value) {
									if(value ==null ||value == "" ) {
										return "0元";
									}else {
										return Ext.util.Format.number(value,',000,000,000.00')+"元";
									}
								}
							}, {
								header : '占用额度（元）',
								align : 'right',
							 
								sortable : true,
								dataIndex : 'useMoney',
								renderer : function(value) {
									if(value ==null ||value == "" ) {
										return "0元";
									}else {
										return Ext.util.Format.number(value,',000,000,000.00')+"元";
									}
								}
							},{
								header : '剩余额度',
								align : 'right',
								sortable : true,
								dataIndex : 'shengyuMoney',
								renderer : function(value) {
									if(value ==null ||value == "" ) {
										return "0元";
									}else {
										return Ext.util.Format.number(value,',000,000,000.00')+"元";
									}
								}
							},{
								header : '客户经理',
								align : 'right',
								sortable : true,
								dataIndex : 'appUserName'
							},{
								header : '授信开始时间',
								align : 'right',
								dataIndex : 'beginTime',
								format : 'Y-m-d H:m:s'
							},{
								header : '授信结束时间',
								align : 'right',
								dataIndex : 'endTime',
								format : 'Y-m-d H:m:s'
							},{
								header : '授信时间',
								align : 'right',
								dataIndex : 'createtime',
								format : 'Y-m-d H:m:s'
							},{
								header : '授信状态',
								align : 'left',
								width:70,
								dataIndex : 'status',
							 	renderer:function(v){
							 		if(v==1){
							 			return "启动授信";
							 		}else  if(v==2){
							 			return  "授信成功";
							 		}else if(v==3){
							 			return  "授信终止";
							 		}else{
							 			return "启动授信";
							 		}
							 	}
							}
					]//end of columns
				});
			},// end of the initComponents()
			//重置查询表单
			reset : function(){
				this.searchPanel.getForm().reset();
				$search({
					searchPanel:this.searchPanel,
					gridPanel:this.gridPanel
				});
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
									//	var record1 = Ext.util.JSON.decode(resp.responseText);//JSON对象，root为data,通过record对象取数据必须符合"record.data.name"格式
								},
								failure : function() {
									Ext.ux.Toast.msg('信息提示', '出错，请联系管理员！');
								}
							});
			} },
			archivessee :function(){
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中任何一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					var  record=s[0];
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
								
									Ext.ux.Toast.msg('操作信息','此项目还没归档');
								}else{
									var record1 = Ext.util.JSON.decode(resp.responseText);//JSON对象，root为data,通过record对象取数据必须符合"record.data.name"格式
									 new PlProjectArchivesForm({
								      readonly :false,
								      projtoarchiveId :record1.data.projtoarchiveId,
								      businessType : businessType,
									  projectId : projectId
								    }).show();
								    
								    }
								},
								failure : function() {
									Ext.ux.Toast.msg('信息提示', '出错，请联系管理员！');
								}
							});
			   
			   }
			},
			//授信详情
			seeBankCreditDetail:function(){
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s<=0) {
					Ext.ux.Toast.msg('状态', '请选择一条记录!');
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{
					var  record=s[0];
//					   var agentId = record.get('orgId');
				       var taskId = record.get('taskId');
				       var id = record.get('id');
				       var oppositeType = record.get('oppositeType');
				       var oppositeID = record.get('oppositeID');
					new SeeBankCreditDetailWin({
					   taskId:taskId,
					   id:id,
					   oppositeType:oppositeType,
					   oppositeID:oppositeID
					}).show();
				}
			},
			
			
			seeProjectInfo:function(){
				var s = this.gridPanel.getSelectionModel().getSelections();
					if (s<=0) {
						Ext.ux.Toast.msg('状态', '请选择一条记录!');
					}else if(s.length>1){
						Ext.ux.Toast.msg('操作信息','只能选中一条记录');
						return false;
					}else{
						 var  shengyuMoneyStr ="";
						var  record=s[0];
						var  i=0;
						var  commerName= record.get('userName');
					    var  bankCreditNum = record.get('bankCreditNum');
					    var  shengyuMoney = record.get('shengyuMoney');
						if(commerName==""){
							i++;
						}
						if(bankCreditNum==""){
							i++;
						}
						if(shengyuMoney==""){
							i++;
						}
					 
					    var agentId = record.get('id');
					  if(i>0){
					  	
					  }else{
							shengyuMoneyStr	 =commerName+"，授信编号："+bankCreditNum+ "，目前剩余额度："+shengyuMoney+"元";
					  }
						new CreditUserLongWin({
							shengyuMoneyStr:shengyuMoneyStr,
							history:'agent',
							agentId : agentId
						}).show();
					
				}
			},
			
			
		creditExamine: function(){
			var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中任何一条记录');
					return false;
				}else if(s.length>1){
					Ext.ux.Toast.msg('操作信息','只能选中一条记录');
					return false;
				}else{	
					var  record=s[0];
			        var orgId = record.get('orgId');
						new AgentCreditStartUpFrom({
						operationType:'agent_AprovalFlow',
						history:'agent',
						orgId : orgId
						}).show();
				}
		
		},// 显示项目流程图
	showFlowImg : function() {
		var selRs = this.gridPanel.getSelectionModel().getSelections();
		if (selRs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择记录！');
			return;
		}
		if (selRs.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选择一条记录！');
			return;
		}
		
		Ext.Ajax.request({
			url : __ctxPath + '/flow/getByTaskIdProcessRun.do',
			params : {
				taskId : selRs[0].get('taskId')
			},
			method : 'post',
			success : function(response, request) {
				obj = Ext.util.JSON.decode(response.responseText);
				if(obj.success){
					var runId = obj.data.runId;
					var businessType = obj.data.businessType;
					var flowImagePanel = new Ext.Panel({
					autoHeight : true,
					border : false,
					html : '<img src="' + __ctxPath + '/jbpmImage?runId='
							+ runId
							+ '&rand=' + Math.random() + '"/>'
				});

			var panel = new Ext.Panel({
						autoHeight : true,
						layout : 'form',
						border : false,
						items : [flowImagePanel]
					});

			// 若当前为子流程，则显示子流程
			if (this.isSubFlow) {
				panel.add({
							xtype : 'panel',
							autoHeight : true,
							border : false,
							html : '<img src="' + __ctxPath + '/jbpmImage?runId='
									+ runId
									+ '&isSubFlow=true&rand=' + Math.random()
									+ '"/>'
						});
				panel.doLayout();
			}

			new Ext.Window({
						autoScroll : true,
						iconCls : 'btn-flow-chart',
						bodyStyle : 'background-color:white',
						maximizable : true,
						title : '流程示意图',
						width : 800,
						height : 600,
						modal : true,
						layout : 'fit',
						items : panel
					}).show();
					}else{
						Ext.ux.Toast.msg('操作信息', '查询runId、businessType操作失败!');
					}
			},
			failure : function() {
				Ext.ux.Toast.msg('信息提示', '出错，请联系管理员！');
			}
		})
	}
});
