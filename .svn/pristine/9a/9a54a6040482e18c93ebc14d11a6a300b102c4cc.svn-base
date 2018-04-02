EnterpriseRelation = Ext.extend(Ext.Panel,{
	isReadOnly:false,
	enterpriseId:null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if(typeof(_cfg.isReadOnly)!="undefined"){
			this.isReadOnly=_cfg.isReadOnly;
		}
		if(typeof(_cfg.enterpriseId)!="undefined"){
			this.enterpriseId=_cfg.enterpriseId;
		}
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		EnterpriseRelation.superclass.constructor.call(this, {
			region : 'center',
			layout : 'anchor',
			anchor : '100%',
			items : [this.gridPanel]
		});
	},
	// 初始化组件
	initUIComponents : function(){
		var pageSize = 10 ;
		var anchor = '100%';
		var enterpriseId=this.enterpriseId;
		
		var jStore_relationPerson = new Ext.data.JsonStore( {
			autoLoad:true,
			url : __ctxPath + '/creditFlow/customer/enterprise/queryListRelationPersonEnterpriseRelationPerson.do',
			totalProperty : 'totalProperty',
			root : 'topics',
			fields : [{name : 'id'},{name : 'relationName'},{name : 'relationJob'},{name : 'relationFixedPhone'},{name : 'relationMovePhone'},{name : 'relationFamilyAddress'},{name : 'bossName'},{name : 'bossPhone'},{name : 'remarks'},{name : 'mark'}],
			baseParams : {
				eid : enterpriseId
			}
		});
		
		var button_add = new CS.button.AButton({
			handler : function() {
				var addRelationPersonPanel = new Ext.form.FormPanel({
					url : __ctxPath + '/creditFlow/customer/enterprise/addRelationPersonEnterpriseRelationPerson.do',
					monitorValid : true,
					bodyStyle:'padding:10px',
					autoScroll : true ,
					labelAlign : 'right',
					buttonAlign : 'center',
					layout : 'column',
					width : 488,
					height : 270,
					frame : true ,
					items : [{
						columnWidth : .5,
						layout : 'form',
						labelWidth : 90,
						defaults : {anchor : anchor},
						items : [{
							xtype : 'textfield',
							fieldLabel : '联系人姓名',
							name : 'relationPerson.relationName',
							allowBlank : false 
						},{
							xtype : 'textfield',
							fieldLabel : '固定电话',
							name : 'relationPerson.relationFixedPhone'
						},{
							xtype: 'radiogroup',
			                fieldLabel: '是否主联系人',
			                allowBlank : false ,
		                	blankText : '必选内容',
			                items: [
			                    {boxLabel: '是', name: 'relationPerson.mark', inputValue: true,checked:true},
			                    {boxLabel: '否', name: 'relationPerson.mark', inputValue: false}
			                ]
						}]
					},{
						columnWidth : .5,
						layout : 'form',
						labelWidth : 90,
						defaults : {anchor : anchor},
						items : [{
							xtype : 'textfield',
							fieldLabel : '职务',
							name : 'relationPerson.relationJob'
						},{
							xtype : 'textfield',
							fieldLabel : '移动电话',
							name : 'relationPerson.relationMovePhone'
						}/*,{
							xtype : 'textfield',
							fieldLabel : '企业联系人姓名',
							name : 'relationPerson.bossName'
						},{
							xtype : 'textfield',
							fieldLabel : '企业联系人电话',
							name : 'relationPerson.bossPhone'
						}*/]
					},{
						columnWidth : 1,
						layout : 'form',
						labelWidth : 90,
						defaults : {anchor : anchor},
						items : [{
							xtype : 'textfield',
							fieldLabel : '家庭地址',
							name : 'relationPerson.relationFamilyAddress'
						},{
							xtype : 'textarea',
							fieldLabel : '备注',
							name : 'relationPerson.remarks'
						}]
					},{
						xtype : 'hidden',
						name : 'relationPerson.enterpriseid',
						value : enterpriseId
					}],
					buttons : [{
						id : 'submit',
						text : '保存',
						iconCls : 'submitIcon',
						formBind : true,
						handler : function() {
							addRelationPersonPanel.getForm().submit({
								method : 'POST',
								waitTitle : '连接',
								waitMsg : '消息发送中...',
								success : function(form ,action) {
									obj = Ext.util.JSON.decode(action.response.responseText);
									if(obj.sign == false){
										Ext.ux.Toast.msg('状态', obj.msg);
									}else{
										Ext.ux.Toast.msg('状态', '保存成功!');
										jStore_relationPerson.reload();
										Ext.getCmp('win_add_new').destroy();
									}
								},
								failure : function(form, action) {
									if(action.response.status==0){
										Ext.ux.Toast.msg('状态','连接失败，请保证服务已开启');
									}else if(action.response.status==-1){
										Ext.ux.Toast.msg('状态','连接超时，请重试!');
									}else{
										Ext.ux.Toast.msg('状态','添加失败!');		
									}
								}
							});
						}
					}]
				})
					
				var win_add = new Ext.Window({
					id : 'win_add_new',
					title: '新增企业联系人信息',
					layout : 'fit',
					width :(screen.width-180)*0.5 - 20,
					height : 310,
					closable : true,
					constrainHeader : true ,
					collapsible : true,
					resizable : true,
					plain : true,
					border : false,
					autoScroll : true ,
					modal : true,
					bodyStyle:'overflowX:hidden',
					buttonAlign : 'right',
					items :[addRelationPersonPanel]
				}).show();
			}
		});
			
		var button_update = new CS.button.UButton({
			handler : function() {
				var selected = gridPanel.getSelectionModel().getSelected();
				if (null == selected) {
					Ext.ux.Toast.msg('状态', '请选择一条记录!');
				}else{
					var id = selected.get('id');
					Ext.Ajax.request({
						url : __ctxPath + '/creditFlow/customer/enterprise/seeRelationPersonEnterpriseRelationPerson.do',
						method : 'POST',
						success : function(response,request) {
							var obj = Ext.util.JSON.decode(response.responseText);
							var relationPersonData = obj.data ;
							var updateRelationPersonPanel = new Ext.form.FormPanel({
								url : __ctxPath + '/creditFlow/customer/enterprise/updateRelationPersonEnterpriseRelationPerson.do',
								monitorValid : true,
								bodyStyle:'padding:10px',
								autoScroll : true ,
								labelAlign : 'right',
								buttonAlign : 'center',
								layout : 'column',
								width : 488,
								height : 270,
								frame : true ,
								items : [{
									columnWidth : .5,
									layout : 'form',
									labelWidth : 90,
									defaults : {anchor : anchor},
									items : [{
										xtype : 'textfield',
										fieldLabel : '联系人姓名',
										name : 'relationPerson.relationName',
										value : relationPersonData.relationName,
										allowBlank : false 
									},{
										xtype : 'textfield',
										fieldLabel : '固定电话',
										name : 'relationPerson.relationFixedPhone',
										value : relationPersonData.relationFixedPhone
									},{
										xtype: 'radiogroup',
						                fieldLabel: '是否主联系人',
						                allowBlank : false ,
					                	blankText : '必选内容',
						                items: [
						                    {boxLabel: '是', name: 'relationPerson.mark', inputValue: true, checked: relationPersonData.mark},
						                    {boxLabel: '否', name: 'relationPerson.mark', inputValue: false, checked: !(relationPersonData.mark)}
						                ]
									}]
								},{
									columnWidth : .5,
									layout : 'form',
									labelWidth : 90,
									defaults : {anchor : anchor},
									items : [{
										xtype : 'textfield',
										fieldLabel : '职务',
										name : 'relationPerson.relationJob',
										value : relationPersonData.relationJob
									},{
										xtype : 'textfield',
										fieldLabel : '移动电话',
										name : 'relationPerson.relationMovePhone',
										value : relationPersonData.relationMovePhone
									}/*,{
										xtype : 'textfield',
										fieldLabel : '企业联系人姓名',
										name : 'relationPerson.bossName',
										value : relationPersonData.bossName
									},{
										xtype : 'textfield',
										fieldLabel : '企业联系人电话',
										name : 'relationPerson.bossPhone',
										value : relationPersonData.bossPhone
									}*/]
								},{
									columnWidth : 1,
									layout : 'form',
									labelWidth : 90,
									defaults : {anchor : anchor},
									items : [{
										xtype : 'textfield',
										fieldLabel : '家庭地址',
										name : 'relationPerson.relationFamilyAddress',
										value : relationPersonData.relationFamilyAddress
									},{
										xtype : 'textarea',
										fieldLabel : '备注',
										name : 'relationPerson.remarks',
										value : relationPersonData.remarks
									}]
								},{
									xtype : 'hidden',
									name : 'relationPerson.enterpriseid',
									value : relationPersonData.enterpriseid
								},{
									xtype : 'hidden',
									name : 'relationPerson.id',
									value : relationPersonData.id
								}],
								buttons : [{
									id : 'submit',
									text : '保存',
									iconCls : 'submitIcon',
									formBind : true,
									handler : function() {
										updateRelationPersonPanel.getForm().submit({
											method : 'POST',
											waitTitle : '连接',
											waitMsg : '消息发送中...',
											success : function(form ,action) {
												obj = Ext.util.JSON.decode(action.response.responseText);
												if(obj.sign == false){
													Ext.ux.Toast.msg('状态', obj.msg);
												}else{
													Ext.ux.Toast.msg('状态', '保存成功!');
													jStore_relationPerson.reload();
													Ext.getCmp('win_update_new').destroy();
												}
											},
											failure : function(form, action) {
												if(action.response.status==0){
													Ext.ux.Toast.msg('状态','连接失败，请保证服务已开启');
												}else if(action.response.status==-1){
													Ext.ux.Toast.msg('状态','连接超时，请重试!');
												}else{
													Ext.ux.Toast.msg('状态','添加失败!');		
												}
											}
										});
									}
								}]
							})
							
							var window_update = new Ext.Window({
								id : 'win_update_new',
								title: '编辑企业联系人信息',
								layout : 'fit',
								width :(screen.width-180)*0.5 - 20,
								height : 310,
								closable : true,
								resizable : true,
								constrainHeader : true ,
								collapsible : true, 
								plain : true,
								border : false,
								modal : true,
								autoScroll : true ,
								bodyStyle:'overflowX:hidden',
								buttonAlign : 'right',
								items :[updateRelationPersonPanel]
							}).show();
						},
						failure : function(response) {					
								Ext.ux.Toast.msg('状态','操作失败，请重试');		
						},
						params: { id: id }
					});	
				}
			}
		});
		
		var button_delete = new CS.button.DButton({
			handler : function() {
				var selected = gridPanel.getSelectionModel().getSelected();
				if (null == selected) {
					Ext.ux.Toast.msg('状态', '请选择一条记录!');
				}else{
					var id = selected.get('id');
					Ext.MessageBox.confirm('确认删除', '是否确认执行删除 ', function(btn) {
						if (btn == 'yes') {
							Ext.Ajax.request({
								url : __ctxPath + '/creditFlow/customer/enterprise/deleteRelationPersonEnterpriseRelationPerson.do',
								method : 'POST',
								success : function() {
									Ext.ux.Toast.msg('状态', '删除成功!');
									jStore_relationPerson.reload() ;
								},
								failure : function(result, action) {
									if(response.status==0){
										Ext.ux.Toast.msg('状态','连接失败，请保证服务已开启');
									}else if(response.status==-1){
										Ext.ux.Toast.msg('状态','连接超时，请重试!');
									}else{
										Ext.ux.Toast.msg('状态','删除失败!');
									}
								},
								params: { id: id }
							});
						}
					});
				}
			}
		});
			
		var button_see = new CS.button.SButton({
			handler : function() {
				var selected = gridPanel.getSelectionModel().getSelected();
				if (null == selected) {
					Ext.ux.Toast.msg('状态', '请选择一条记录!');
				}else{
					var id = selected.get('id');
					seeRelationPerson(id);
				}
			}
		});
		
		var seeRelationPerson = function(id){
			Ext.Ajax.request({
				url : __ctxPath + '/creditFlow/customer/enterprise/seeRelationPersonEnterpriseRelationPerson.do',
				method : 'POST',
				success : function(response,request) {
					var obj = Ext.util.JSON.decode(response.responseText);
					var relationPersonData = obj.data ;
					var seeRelationPersonPanel = new Ext.form.FormPanel({
						bodyStyle:'padding:10px',
						autoScroll : true ,
						labelAlign : 'right',
						buttonAlign : 'center',
						layout : 'column',
						width : 488,
						height : 260,
						frame : true ,
						items : [{
							columnWidth : .5,
							layout : 'form',
							labelWidth : 80,
							defaults : {anchor : anchor},
							items : [{
								xtype : 'textfield',
								fieldLabel : '联系人姓名',
								value : relationPersonData.relationName,
								readOnly  : true,
								allowBlank : false ,
								cls : 'readOnlyClass'
							},{
								xtype : 'textfield',
								fieldLabel : '固定电话',
								value : relationPersonData.relationFixedPhone,
								readOnly  : true,
								cls : 'readOnlyClass'
							},{
								xtype: 'textfield',
				                fieldLabel: '是否主联系人',
				                value : (relationPersonData.mark == true) ? '是' : '否',
				                readOnly  : true,
								cls : 'readOnlyClass'
							}]
						},{
							columnWidth : .5,
							layout : 'form',
							labelWidth : 90,
							defaults : {anchor : anchor},
							items : [{
								xtype : 'textfield',
								fieldLabel : '职务',
								value : relationPersonData.relationJob,
								readOnly  : true,
								cls : 'readOnlyClass'
							},{
								xtype : 'textfield',
								fieldLabel : '移动电话',
								value : relationPersonData.relationMovePhone,
								readOnly  : true,
								cls : 'readOnlyClass'
							}/*,{
								xtype : 'textfield',
								fieldLabel : '企业联系人姓名',
								value : relationPersonData.bossName,
								readOnly  : true,
								cls : 'readOnlyClass'
							},{
								xtype : 'textfield',
								fieldLabel : '企业联系人电话',
								value : relationPersonData.bossPhone,
								readOnly  : true,
								cls : 'readOnlyClass'
							}*/]
						},{
							columnWidth : 1,
							layout : 'form',
							labelWidth : 80,
							defaults : {anchor : anchor},
							items : [{
								xtype : 'textfield',
								fieldLabel : '家庭地址',
								value : relationPersonData.relationFamilyAddress,
								readOnly  : true,
								cls : 'readOnlyClass'
							},{
								xtype : 'textarea',
								fieldLabel : '备注',
								value : relationPersonData.remarks,
								readOnly  : true,
								cls : 'readOnlyClass'
							}]
						}]
					})
					var window_see = new Ext.Window({
						title: '查看企业联系人信息',
						layout : 'fit',
						closable : true,
						resizable : true,
						constrainHeader : true ,
						collapsible : true, 
						plain : true,
						border : false,
						modal : true,
						width :(screen.width-180)*0.5 - 20,
						height : 300,
						autoScroll : true ,
						bodyStyle:'overflowX:hidden',
						buttonAlign : 'right',
						items :[seeRelationPersonPanel]
					}).show();			
				},
				failure : function(response) {
						Ext.ux.Toast.msg('状态','操作失败，请重试');	
				},
				params: { id: id }
			});	
		}
		
		var cModel_relationPerson = new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(),new Ext.grid.CheckboxSelectionModel({singleSelect:true}),{
				header : "联系人姓名",
				width : 100,
				sortable : true,
				dataIndex : 'relationName'
			}, {
				header : "职务",
				width : 100,
				sortable : true,
				dataIndex : 'relationJob'
			}, {
				header : "固定电话",
				width : 120,
				sortable : true,
				dataIndex : 'relationFixedPhone'
			}, {
				header : "移动电话",
				width : 120,
				sortable : true,
				dataIndex : 'relationMovePhone'
			},{
				header : "是否主联系人",
				width : 100,
				sortable : true,
				dataIndex : 'mark',
				renderer : function(r){
					if (r == true) {
						return '是';
					} else if (r == false) {
						return '否';
					} 
				}
			},{
				header : "家庭住址",
				width : 180,
				sortable : true,
				dataIndex : 'relationFamilyAddress'
			}]);
		
		var gridPanel = new Ext.grid.GridPanel( {
			pageSize : pageSize,
			store : jStore_relationPerson,
			autoWidth : true,
			border : false ,
//			height:110,
			autoHeight:true,
			autoScroll:true,
			autoExpandColumn:6,
			colModel : cModel_relationPerson,
			tbar : this.isReadOnly?[button_see]:[button_add,button_see,button_update,button_delete]
		});
		this.gridPanel=gridPanel;
	}
});