/**
 * 角色选择器
 * @class RolerDialog
 * @extends Ext.Window
 */
RolerDialog=Ext.extend(Ext.Window,{
	constructor:function(conf){
		Ext.applyIf(this,conf);
		
		this.scope=this.scope?this.scope:this;
		//默认为多单选择角色
		this.single=this.single!=null?this.single:true;
		this.companyId=this.companyId?this.companyId:"";
		this.initUI();
		RolerDialog.superclass.constructor.call(this,{
			typeroleName:this.typeroleName?this.typeroleName:'角色选择器',
			height:450,
			width:800,
			maximizable : true,
			modal:true,
			layout:'border',
			items:[
				//this.westPanel,
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
	//按组织架构查找角色
	orgTreeClick:function(){
		var orgId=this.orgTreePanel.selectedNode.id;//app_user depId字段 add by gaoqingrui 
		var orgType=this.orgTreePanel.selectedNode.attributes.orgType
		var store = this.gridPanel.getStore();
		var baseParams=null;
		if(orgId!=0){	//若orgId==0,则代表为所有角色
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
	//按职位查找角色
	posTreeClick:function(){
	 	var posId=this.posTreePanel.selectedNode.id;
		var store = this.gridPanel.getStore();
		var baseParams=null;
		if(posId!=0){	//若orgId==0,则代表为所有角色
			baseParams = {'Q_positions.posId_L_EQ':posId};
		}else{
			baseParams={};
		}
		baseParams.start = 0;
		baseParams.limit = store.baseParams.limit;
		store.baseParams=baseParams;
		this.gridPanel.getBottomToolbar().moveFirst();
	},
	//按角色查找角色
	roleTreeClick:function(){
		var roleId=this.rolePanel.selectedNode.id;
		var leaf=this.rolePanel.selectedNode.leaf;
		
		var store = this.gridPanel.getStore();
		var baseParams=null;
		if(roleId!=0){	//若orgId==0,则代表为所有角色
			baseParams = {'Q_roles.roleId_L_EQ':roleId,searchMethod:'role',leaf:leaf};
		}else{
			baseParams={};
		}
		baseParams.start = 0;
		baseParams.limit = store.baseParams.limit;
		store.baseParams=baseParams;
		this.gridPanel.getBottomToolbar().moveFirst();
	},
	//查找所有在线角色
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
			typeroleName:'按岗位查找',
			border:false,
			url : __ctxPath+'/system/treePosition.do',
			scope : this,
			autoScroll:true,
			onclick:this.posTreeClick
		});
		
		this.orgPanel=new Ext.Panel({
			border:false,
			typeroleName:'按组织架构查找',
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
			typeroleName:'按角色查找',
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
			typeroleName : '在线人员  ',
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
	 		//typeroleName:'导航',
	 		width:185,
	 		layout : 'accordion',
	 		collapsible : true,
	 		items:[/*this.orgPanel,*//*this.posTreePanel,*//*this.rolePanel*//*,this.onlinePanel,*/]
	 	});
	 	//可选择的角色列表
	 	this.gridPanel=new HT.GridPanel({
	 		singleSelect:this.single,
	 		typeroleName:'可选角色',
	 		region:'center',
	 		isShowTbar:false,
	 		url:__ctxPath + '/system/listForOneAppRole.do?dir=desc&sort=roleId',//默认查找当前角色所在部门的角色
	 		fields :[{roleName : 'roleId'}, 'roleId', 'roleName', 'roleDesc'],
	 		columns:[
	 			{
					header : "角色名称",
					dataIndex : 'roleName',
					width : 60
				}, {
					width : 50,
						header : '角色描述',
						dataIndex : 'roleDesc'
					}
	 		]
	 	});

	 	if(!this.single){
	 		
	 		this.gridPanel.addListener('rowclick',this.gridPanelRowClick,this);
	 		
	 		//已选的角色列表
		 	this.selGridPanel = new HT.GridPanel({
		 		typeroleName:'已选角色(双击行移除)',
		 		split:true,
				isShowTbar:false,
				region : 'east',
				width : 160,
				showPaging:false,
				autoScroll : true,
				store : new Ext.data.ArrayStore({
	    			fields : ['roleId', 'roleName','roleDesc']
				}),
				trackMouseOver : true,
				columns : [{
					header : "角色名称",
					dataIndex : 'roleName'
				}],
				listeners:{
		 			scope:this,
		 			'rowdblclick':this.selGridPanelRowDbClick
		 		}
			}); // end of this selectedUserGrid
		 	
		 	if(this.roleIds&&this.roleIds.length>0){
				var selStore = this.selGridPanel.getStore();
				var arrUserIds = this.roleIds.split(',');
				var arrUserName = this.userName.split(',');
				for(var index=0;index<arrUserIds.length;index++){
					var newData = {roleId: arrUserIds[index],roleName: arrUserName[index],typeroleName:3};
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
	 * 角色GridPanel（中间的Grid)行点击
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} e
	 */
	gridPanelRowClick:function(grid,rowIndex,e){
		var selStore = this.selGridPanel.getStore();
			var rows = this.gridPanel.getSelectionModel().getSelections();
			for(var i= 0 ; i<rows.length ; i++){
				var roleId = rows[i].data.roleId;
				var roleName = rows[i].data.roleName;
				var typeroleName=rows[i].data.typeroleName;
				var isExist = false;
				//查找是否存在该记录
				for(var j=0;j<selStore.getCount();j++){
					if(selStore.getAt(j).data.roleId == roleId){
						isExist = true;
						break;
					}
				}
				if(!isExist){
					var newData = {roleId : roleId,roleName : roleName,typeroleName:typeroleName};
					var newRecord = new selStore.recordType(newData);
					this.selGridPanel.stopEditing();
					selStore.add(newRecord);
				}
			}
	},
	/**
	 * 选择角色
	 */
	confirm:function(){
		var roleIds = '';
		var roleNames = '';
		//返回的角色集
		var users=[];
		if(this.single){//选择单个角色
			var rows = this.gridPanel.getSelectionModel().getSelections();
			for (var i = 0; i < rows.length; i++) {
				if (i > 0) {
					roleIds += ',';
					roleNames += ',';
				}
				roleIds += rows[i].data.roleId;
				roleNames += rows[i].data.roleName;
				users.push(rows[i].data);
			}
		} else {
			var selStore = this.selGridPanel.getStore();
			for(var i = 0 ; i<selStore.getCount(); i++){
				if (i > 0) {
					roleIds += ',';
					roleNames += ',';
				}
				roleIds += selStore.getAt(i).data.roleId;
				roleNames += selStore.getAt(i).data.roleName;
				users.push(selStore.getAt(i).data);
			}
		}

		if (this.callback){
			this.callback.call(this.scope, roleIds, roleNames,users);
		}
		this.close();
	}
});