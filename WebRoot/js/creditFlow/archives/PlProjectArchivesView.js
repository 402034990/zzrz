/**
 * @author
 * @class PlProjectArchivesView
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
PlProjectArchivesView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				PlProjectArchivesView.superclass.constructor.call(this, {
							id : 'PlProjectArchivesView'+this.businessType,
							title : '项目归档管理',
							region : 'center',
							layout : 'border',
							iconCls : this.tabIconCls==null?'btn-tree-team2':this.tabIconCls,
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
			var isShow=false;//判断是否为管控角色  如果是管控角色则为true  显示所属分公司查询条件
				if(RoleType=="control"){
				  isShow=true;
				}
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
			items : [
 /*{
				name : 'isPledge',
				xtype : 'hidden',
				value : 0
			},*/
				isShow?{
						   columnWidth : .168,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : '100%'
							},
								border : false,
								items : [
								{
										xtype : "combo",
										fieldLabel : '所属分公司',
										hiddenName : "companyId",
										displayField : 'companyName',
										valueField : 'companyId',
										triggerAction : 'all',
										store : new Ext.data.SimpleStore({
											autoLoad : true,
											url : __ctxPath+'/system/getControlNameOrganization.do',
											fields : ['companyId', 'companyName']
										})
								}
							]}:{columnWidth : 0.001,
				border : false},{
				columnWidth : isShow?0.168:0.2,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
			
				items : [ {
					xtype : 'textfield',
					fieldLabel : '项目编号',
					anchor : '100%',
					name : 'projectNum'
				}]
			}, {
				columnWidth :  isShow?0.168:0.2,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '项目名称',
					anchor : '100%',
					name : 'projectName'
				}  ]
			},{
				columnWidth :  isShow?0.168:0.2,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '产品名称',
					anchor : '100%',
					name : 'productName'
				}  ]
			}, /*{
				columnWidth :  isShow?0.168:0.2,
				layout : 'form',
				border : false,
				labelWidth : 70,
				labelAlign : 'right',
				hidden:true,
				items : [ {
					xtype : "combo",
					hiddenName : "businessType",
				//	id:'businessType',
					displayField : 'itemName',
					valueField : 'itemId',
					triggerAction : 'all',
					store : new Ext.data.SimpleStore({
						autoLoad : true,
						url : __ctxPath
								+ '/creditFlow/getBusinessTypeList1CreditProject.do',
						fields : ['itemId', 'itemName']
					}),
					fieldLabel : "业务类型",
					anchor : '100%',
					listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
											var record = st.getAt(0);
											var v = record.data.itemId;	
											combox.setValue(v);
										})
								combox.clearInvalid();
							}
					}
				}]
			}, {
				columnWidth : isShow?0.168:0.2,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
				items : [{
									xtype : 'combo',
									mode : 'local',
									valueField : 'value',
									editable : false,
									displayField : 'value',
									store : new Ext.data.SimpleStore({
												fields : ["value"],
												data : [["企业"],
														["个人"]]
											}),
									triggerAction : "all",
									name : 'oppositeTypeValue',
									fieldLabel : '客户类别',
									anchor : '100%'
									
								}]
			},*/ {
				columnWidth :  isShow?0.168:0.2,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
				items : [{
									xtype : 'combo',
									mode : 'local',
									displayField : 'name',
		                            valueField : 'id',
									editable : false,
					  			   store : new Ext.data.SimpleStore({
							        fields : ["name", "id"],
						            data : [
						                    ["是", "1"],
									     	["否", "0"]]
					              	}),
									triggerAction : "all",
									name : 'isArchives',
									fieldLabel : '是否归档',
									hiddenName:"isArchives",
									anchor : '100%'
									
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
//			{
//				iconCls : 'btn-readdocument',
//				text : '归档办理',
//				xtype : 'button',
//				scope : this,
//				handler : this.archivessave
//			}, {
//				iconCls : 'btn-readdocument',
//				text : '查看归档详情',
//				xtype : 'button',
//				scope : this,
//				handler : this.archivessee
//			},
			{
				iconCls : 'btn-solve',
				text : '办理归档',
				xtype : 'button',
				scope:this,
				hidden : isGranted('_Archives_add_'+this.businessType)?false:true,
				handler : this.projectfile
			}, new Ext.Toolbar.Separator({
				hidden : !isGranted('_Archives_add_'+this.businessType)||!isGranted('_Archivesproj_see_'+this.businessType)
			}), {
				iconCls : 'btn-readdocument',
				text : '查看项目详情',
				xtype : 'button',
				scope:this,
				hidden : isGranted('_Archivesproj_see_'+this.businessType)?false:true,
				handler : this.seeProjectInfo
			}, 
//				{
//				iconCls : 'btn-readdocument',
//				text : '入库办理',
//				xtype : 'button',
//				scope:this,
//				hidden : isGranted('_Archivesproj_see')?false:true,
//				handler : this.putInStorage
//			},
				{
				iconCls : 'btn-solve',
				text : '批量归档',
				xtype : 'button',
				scope:this,
				hidden : isGranted('_Archivesproj_some_'+this.businessType)?false:true,
				handler : this.putInStorage
			}]
		});
				
				this.gridPanel=new HT.GridPanel({
					id : 'PlProjectArchivesGrid',
					region:'center',
					tbar:this.topbar,
					//不适用RowActions
					rowActions : false,
//					loadMask : true,
					url : __ctxPath + "/creditFlow/archives/projectlistVProjectArchives.do?businessType="+this.businessType,
					/*baseParams:{
						'businessType' : this.businessType
					},*/
					fields : [{
								name : 'runId',
								type : 'int'
							}, 'handerName','projectId', 'projectName', 'projectNumber','productName',
							'projectMoney','oppositeType','oppositeTypeValue','operationType',
							'operationTypeValue','activityName','businessType',
							'isArchives','projectStatus','bmStatus','orgName','companyId','appUserName','createDate','fundProjectId','projtoarchiveId','isIntStroage'],
					columns : [
							/*{
								header : "所属分公司",
								sortable : true,
								width : 120,
								hidden:RoleType=="control"?false:true,
								dataIndex : 'orgName'
							},*/{
								header : '项目编号',
								width : 130,
								dataIndex : 'projectNumber'
							}, {
								header : '项目名称',
								width : 350,
								dataIndex : 'projectName'
							}, {
								header : '产品名称',
								width : 118,
								dataIndex : 'productName'
							}, {
								header : '金额',
								align : 'right',
								width : 110,
								sortable : true,
								dataIndex : 'projectMoney',
								renderer : function(value) {
									if(value ==null ||value == "" ) {
										return "";
									}else {
										return Ext.util.Format.number(value,',000,000,000.00')+"元";
									}
								}
							}, {
								header : '业务经理',
								width : 140,
								dataIndex : 'appUserName'
							}/*, {
								header : '项目阶段',
								width : 118,
								hidden : this.isHiddenAn,
								dataIndex : 'activityName'
							}*/, {
								//xtype:'dateField',
								header : '归档时间',
								width : 76,
								hidden : this.isHiddenBd,
								dataIndex : 'createDate',
								//format : 'Y-m-d H:i:s',
								sortable : true
							},
//							{
//							
//								//xtype:'dateField',
//								header : '启动时间',
//								width : 76,
//								hidden : this.isHiddenBd,
//								dataIndex : 'createDate',
//								//format : 'Y-m-d H:i:s',
//								sortable : true
//							
//							
//							},
									{
								header : '是否归档',
								width : 76,
								align : 'center',
								hidden : this.isHiddenBd,
								dataIndex : 'isArchives',
								renderer:function(isArchives){
									  if(isArchives ==null || isArchives==0){
									     	return "否";
									  }
									  if(isArchives !=null&& isArchives==1){
									    	return "是";
									  }
								}
							},
//								{
//								header : '是否入库',
//								width : 76,
//								align : 'center',
//								hidden : this.isHiddenBd,
//								dataIndex : 'isIntStroage',
//								renderer:function(isIntStroage){
//									  if(isIntStroage ==null || isIntStroage==0){
//									    	return "否";
//									  }
//									  if(isIntStroage !=null&& isIntStroage==1){
//									    	return "是";
//									  }
//								}
//							},
								{
								header : '处理人',
								width : 80,
								dataIndex : 'handerName'
//								renderer:function(v){
//									alert(v);
//									if(v==null || v==""){
//										return ''
//									}else{
//										return v
//									}
//								}
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
			seeProjectInfo:function(){
			var selected = this.gridPanel.getSelectionModel().getSelected();
				if (null == selected) {
					Ext.ux.Toast.msg('状态', '请选择一条记录!');
				}else{
				var projectId = selected.get('projectId');
				var businessType = selected.get('businessType');

					var idPrefix = "";
					if (businessType == 'SmallLoan') {
						idPrefix = "SmallLoanProjectInfo_";
						projectId = selected.get('fundProjectId');
					} else if (businessType == 'Financing') {
						idPrefix = "FinancingProjectInfo_";
					} else if (businessType == 'Guarantee') {
						idPrefix = "GuaranteeProjectInfo_";
					}else if (businessType == 'LeaseFinance') {
						idPrefix = "LeaseFinanceProjectInfo_";
					}else if (businessType == 'Pawn') {
						idPrefix = "PlPawnProjectInfo_";
					}
					Ext.Ajax.request({
						url : __ctxPath + '/creditFlow/getProjectViewObjectCreditProject.do',
						params : {
							businessType : businessType,
							projectId : projectId
						},
						method : 'post',
						success : function(resp, op) {
							var record = Ext.util.JSON.decode(resp.responseText);//JSON对象，root为data,通过record对象取数据必须符合"record.data.name"格式
							showProjectInfoTab(record, idPrefix)
						},
						failure : function() {
							Ext.ux.Toast.msg('信息提示', '出错，请联系管理员！');
						}
					})
				
			}
		},
		putInStorage: function(){
			var s = this.gridPanel.getSelectionModel().getSelections();
			var projectIds="";
			var businessTypes="";
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息','请选中记录');
					return false;
				}else{
					var dataInt = 0;
					for(var i=0;i<s.length;i++){
						var  record=s[i];
						var businessType = record.get('businessType');
					  	var projectId = record.get('projectId');
	                	if(businessType=='SmallLoan'){
	                		projectId = record.get('fundProjectId');
	                	}
	                	if(i==s.length-1){
	                		projectIds=projectIds+projectId;
	                	}else{
	                		projectIds=projectIds+projectId+",";
	                	}
	                	if(i==s.length-1){
	                		businessTypes=businessTypes+businessType;
	                	}else{
	                		businessTypes=businessTypes+businessType+",";
	                	}
	                	if(record.get('isArchives')==1){
	                		dataInt++
	                	}
					}
					if(dataInt>0){
						Ext.ux.Toast.msg('信息提示', '包含已经归档的信息，请重新选择');
						return  ;
					}else{
						new putInStorage({
						   businessTypes : businessTypes,
						   projectIds : projectIds
						}).show();
					}
						
	                	/*Ext.Ajax.request({
								url : __ctxPath + '/creditFlow/archives/putInStoragePlProjectArchives.do',
								params : {
									businessType : businessType,
									projectIds : projectIds
								},
								method : 'post',
								success : function(resp, op) {
								
								
								},
								failure : function() {
									Ext.ux.Toast.msg('信息提示', '出错，请联系管理员！');
								}
							});*/
				}
		
		},
		projectfile: function(){
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
						var businessType = this.businessType;
						var oppositeType = record.get('oppositeType');
						var projectStatus = record.get('projectStatus');
						var bmStatus = record.get('bmStatus');
						var companyId = record.get('companyId');
						var operationType=record.get('operationType');
	                	var tabs = Ext.getCmp('centerTabPanel');
	                	/*if(businessType=='SmallLoan'){
	                		projectId = record.get('fundProjectId');
	                	}*/
	                	projtoarchiveId =record.data.projtoarchiveId;
								      if (businessType == 'Guarantee') {
								      	idPrefix="GuaranteeProjectarchives_";
											var gpObj=new GuaranteeArchives({
											   businessType : businessType,
											   projectId : projectId,
											   oppositeType :oppositeType,
											   projtoarchiveId:projtoarchiveId,
											   flag :"edit"
											});
									  }else  if (businessType == 'SmallLoan') {
									  	idPrefix="SmallLoanProjectarchives_";
											var gpObj=new SmallLoanArchives({
											   businessType : businessType,
											   projectId : projectId,
											   sprojectId : record.get('projectId'),
											   oppositeType :oppositeType,
											   projtoarchiveId:projtoarchiveId,
											   flag :"edit",
											   companyId:companyId
											});
								     }else if (businessType == 'LeaseFinance') {
								     	idPrefix="LeaseFinanceProjectarchives_";
										var gpObj=new LeaseFinanceArchives({
										   businessType : businessType,
										   projectId : projectId,
										   oppositeType :oppositeType,
										   operationType : operationType,
										   flag :"edit", 
										   companyId:companyId
										});
									}else if (businessType == 'Pawn') {
								     	idPrefix="PawnProjectarchives_";
										var gpObj=new PawnArchives({
										   businessType : businessType,
										   projectId : projectId,
										   oppositeType :oppositeType,
										   operationType : operationType,
										   flag :"edit", 
										   companyId:companyId
										});
									}else{
									       return null;
									     }
									tabs.add(gpObj);
									tabs.setActiveTab(idPrefix + projectId);
								  /*  }
								},
								failure : function() {
									Ext.ux.Toast.msg('信息提示', '出错，请联系管理员！');
								}
							});*/
				}
		
		}
});
