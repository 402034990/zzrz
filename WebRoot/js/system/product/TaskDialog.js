/**
 * 流程选择器
 * @class TaskDialog
 * @extends Ext.Window
 */
TaskDialog=Ext.extend(Ext.Window,{
	constructor:function(conf){
		Ext.applyIf(this,conf);
		
		this.scope=this.scope?this.scope:this;
		//默认为多单选择流程
		this.single=this.single!=null?this.single:true;
		this.companyId=this.companyId?this.companyId:"";
		this.initUI();
		TaskDialog.superclass.constructor.call(this,{
			typename:this.typename?this.typename:'流程选择器',
			height:450,
			width:800,
			maximizable : true,
			modal:true,
			layout:'border',
			items:[
				this.westPanel,
				this.gridPanel
			],
			buttonAlign:'center',
			buttons:[
			{
				text:'确定',
				iconCls:'btn-ok',
				scope:this,
				handler:this.confirm
			},{
				text:'取消',
				iconCls:'btn-cancel',
				scope:this,
				handler:this.close
			}
			]
		});
		if(this.isForFlow){
			Ext.getCmp('startUser').disabled = false;
		}
		if(!this.single){
			this.add(this.selGridPanel);
			this.doLayout();
		}
	},
	//按组织架构查找流程
	orgTreeClick:function(){
		var orgId=this.orgTreePanel.selectedNode.id;//app_user depId字段 add by gaoqingrui 
		var orgType=this.orgTreePanel.selectedNode.attributes.orgType
		var store = this.gridPanel.getStore();
		var baseParams=null;
		if(orgId!=0){	//若orgId==0,则代表为所有流程
			//baseParams = {'Q_orgs.orgId_L_EQ':orgId};
			baseParams={'typeId':orgId,'typeKey':'find'}
		}else{
			baseParams={};
		}
		baseParams.start = 0;
		baseParams.limit = store.baseParams.limit;
		store.baseParams=baseParams;
		this.gridPanel.getBottomToolbar().moveFirst();
	},
	//按职位查找流程
	posTreeClick:function(){
	 	var posId=this.posTreePanel.selectedNode.id;
		var store = this.gridPanel.getStore();
		var baseParams=null;
		if(posId!=0){	//若orgId==0,则代表为所有流程
			baseParams = {'Q_positions.posId_L_EQ':posId};
		}else{
			baseParams={};
		}
		baseParams.start = 0;
		baseParams.limit = store.baseParams.limit;
		store.baseParams=baseParams;
		this.gridPanel.getBottomToolbar().moveFirst();
	},
	//按角色查找流程
	roleTreeClick:function(){
		var roleId=this.rolePanel.selectedNode.id;
		var leaf=this.rolePanel.selectedNode.leaf;
		
		var store = this.gridPanel.getStore();
		var baseParams=null;
		if(roleId!=0){	//若orgId==0,则代表为所有流程
			baseParams = {'Q_roles.roleId_L_EQ':roleId,searchMethod:'role',leaf:leaf};
		}else{
			baseParams={};
		}
		baseParams.start = 0;
		baseParams.limit = store.baseParams.limit;
		store.baseParams=baseParams;
		this.gridPanel.getBottomToolbar().moveFirst();
	},
	//查找所有在线流程
	onlineClick:function(){
		
	},
	demensionSel:function(combo,record,index){
		var demId=combo.getValue();
		var companyId=this.companyId;
		this.orgTreePanel.loader=new Ext.tree.TreeLoader(
	    {
	        baseParams:{demId:demId,companyId:companyId},
	        dataUrl: __ctxPath+'/system/flowTreeGlobalType.do?catKey=FLOW',
	        requestMethod:'GET'
	    });
	    this.orgTreePanel.selectedNode=null;
	    this.orgTreePanel.root.reload();
	},
	/**
	 * 初始化UI
	 */
	initUI:function(){
		
		//按组织架构创建
		var orgTreePanelUrl=__ctxPath+'/system/flowTreeGlobalType.do?catKey=FLOW';
		//组织树Panel
		this.orgTreePanel=new zhiwei.ux.TreePanelEditor({
			border:false,
			url :orgTreePanelUrl,
			region:'center',
			scope:this,
			autoScroll:true,
			onclick:this.orgTreeClick
		});
		//岗位树Panel
		this.posTreePanel=new zhiwei.ux.TreePanelEditor({
			typename:'按岗位查找',
			border:false,
			url : __ctxPath+'/system/treePosition.do',
			scope : this,
			autoScroll:true,
			onclick:this.posTreeClick
		});
		
		this.orgPanel=new Ext.Panel({
			border:false,
			typename:'按组织架构查找',
			layout:'fit',
			items:[{
					xtype:'panel',
					layout:'border',
					border:false,
					items:[
						{
							xtype:'panel',
							region:'north',
							border:false,
							autoHeight:true,
							layout:'fit',
							items:this.demensionCombo
						},
						this.orgTreePanel
					]
				}
			]
		});
		//__ctxPath + '/system/treeAppRole.do'
		
		var roleUrl= __ctxPath + '/system/treeAppRole.do?type='+this.type;
		if(this.companyId!=""){
			roleUrl=__ctxPath + '/system/treeCompanyAppRole.do?type='+this.type+"&companyId="+this.companyId;
		}
		this.rolePanel=new zhiwei.ux.TreePanelEditor({
			border:false,
			typename:'按角色查找',
			url : roleUrl,
			scope:this,
			autoScroll:true,
			onclick:this.roleTreeClick
		});
		
		this.onlinePanel = new Ext.Panel({
			collapsible:false,
			border:false,
			autoScroll : true,
			iconCls : 'online-user',
			typename : '在线人员  ',
			listeners : {
				scope:this,
				'expand' : this.onlineClick
			}
		});
		
		//按逻辑代码创建
		
	 	this.westPanel=new Ext.Panel({
	 		split:true,
	 		collapsible : true,
			split : true,
			region:'west',
			header:false,
	 		//typename:'导航',
	 		width:185,
	 		layout : 'accordion',
	 		collapsible : true,
	 		items:[this.orgPanel,/*this.posTreePanel,*//*this.rolePanel*//*,this.onlinePanel,*/]
	 	});
	 	//可选择的流程列表
	 	this.gridPanel=new HT.GridPanel({
	 		singleSelect:this.single,
	 		typename:'可选流程',
	 		region:'center',
	 		isShowTbar:false,
	 		url:__ctxPath + '/flow/listByProTypeIdProDefinition.do?curDep=true&type=',//默认查找当前流程所在部门的流程
	 		fields :[{name : 'defId',type : 'long'}, 'defId', 'typename', 'name'],
	 		columns:[
	 			{
					header : "分类名称",
					dataIndex : 'typename',
					width : 60
				}, {
					width : 50,
						header : '流程名称',
						dataIndex : 'name'
					}
	 		]
	 	});

	 	if(!this.single){
	 		
	 		this.gridPanel.addListener('rowclick',this.gridPanelRowClick,this);
	 		
	 		//已选的流程列表
		 	this.selGridPanel = new HT.GridPanel({
		 		typename:'已选流程(双击行移除)',
		 		split:true,
				isShowTbar:false,
				region : 'east',
				width : 160,
				showPaging:false,
				autoScroll : true,
				store : new Ext.data.ArrayStore({
	    			fields : ['defId', 'name','typename']
				}),
				trackMouseOver : true,
				columns : [{
					header : "流程名称",
					dataIndex : 'name'
				}],
				listeners:{
		 			scope:this,
		 			'rowdblclick':this.selGridPanelRowDbClick
		 		}
			}); // end of this selectedUserGrid
		 	
		 	if(this.defIds&&this.defIds.length>0){
				var selStore = this.selGridPanel.getStore();
				var arrUserIds = this.defIds.split(',');
				var arrUserName = this.userName.split(',');
				for(var index=0;index<arrUserIds.length;index++){
					var newData = {defId: arrUserIds[index],name: arrUserName[index],typename:3};
					var newRecord = new selStore.recordType(newData);
					this.selGridPanel.stopEditing();
					selStore.add(newRecord);
				}
		 	}
	 	}
	 	
	 	
		
	},//end of initUI function
	selGridPanelRowDbClick:function(){
		var store = this.selGridPanel.getStore();
		var rows = this.selGridPanel.getSelectionModel().getSelections();
		for(var i =0; i<rows.length; i++){
			this.selGridPanel.stopEditing();
			store.remove(rows[i]);
		}
	},
	/**
	 * 流程GridPanel（中间的Grid)行点击
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} e
	 */
	gridPanelRowClick:function(grid,rowIndex,e){
		var selStore = this.selGridPanel.getStore();
		if(selStore.getCount()<1){
			var rows = this.gridPanel.getSelectionModel().getSelections();
			for(var i= 0 ; i<rows.length ; i++){
				var defId = rows[i].data.defId;
				var name = rows[i].data.name;
				var typename=rows[i].data.typename;
				var isExist = false;
				//查找是否存在该记录
				for(var j=0;j<selStore.getCount();j++){
					if(selStore.getAt(j).data.defId == defId){
						isExist = true;
						break;
					}
				}
				if(!isExist){
					var newData = {defId : defId,name : name,typename:typename};
					var newRecord = new selStore.recordType(newData);
					this.selGridPanel.stopEditing();
					selStore.add(newRecord);
				}
			}
		}else{
			Ext.Msg.alert('操作信息', '每个产品只能选择一个流程');
		}
	},
	/**
	 * 选择流程
	 */
	confirm:function(){
		var defIds = '';
		var names = '';
		//返回的流程集
		var users=[];
		if(this.single){//选择单个流程
			var rows = this.gridPanel.getSelectionModel().getSelections();
			for (var i = 0; i < rows.length; i++) {
				if (i > 0) {
					defIds += ',';
					names += ',';
				}
				defIds += rows[i].data.defId;
				names += rows[i].data.name;
				users.push(rows[i].data);
			}
		} else {
			var selStore = this.selGridPanel.getStore();
			for(var i = 0 ; i<selStore.getCount(); i++){
				if (i > 0) {
					defIds += ',';
					names += ',';
				}
				defIds += selStore.getAt(i).data.defId;
				names += selStore.getAt(i).data.name;
				users.push(selStore.getAt(i).data);
			}
		}

		if (this.callback){
			this.callback.call(this.scope, defIds, names,users);
		}
		this.close();
	}
});