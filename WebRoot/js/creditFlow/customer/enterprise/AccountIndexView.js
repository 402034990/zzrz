AccountIndexView = Ext.extend(Ext.Window, {
	layout : 'anchor',
	anchor : '100%',
	constructor : function(_cfg) {

		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		AccountIndexView.superclass.constructor.call(this, {
					id:'AccountIndexView',
			        buttonAlign:'center',
			        title:'财务汇总表',
			     //   iconCls : 'btn-add',
					height : 500,
					width : 1000,
					constrainHeader : true ,
					collapsible : true, 
					frame : true ,
					border : false ,
					resizable : true,
					layout:'fit',
					autoScroll : true ,
					bodyStyle:'overflowX:hidden',
					constrain : true ,
					closable : true,
					modal : true,
					items : [this.gridPanel],
					buttons:[/*{
					    text : '保存',
						iconCls : 'btn-save',
						scope : this,
						hidden : this.isReadOnly,
						handler : this.save
					},*/{
					    text : '关闭',
						iconCls : 'btn-cancel',
						scope : this,
						handler : function(){
							this.close();
						}
					}]
					
				})
	},
	initUIComponents : function() {
		
			this.topbar = new Ext.Toolbar({
					items : [{
								iconCls : 'btn-add',
								text : '新增',
								xtype : 'button',
								scope : this,
								hidden:this.isReadOnly,
								handler : this.createRs
							},new Ext.Toolbar.Separator({
								hidden:this.isReadOnly
									}),{
								iconCls : 'btn-edit',
								text : '编辑',
								xtype : 'button',
								scope : this,
								hidden:this.isReadOnly,
								handler : this.editRs
							},new Ext.Toolbar.Separator({
								hidden:this.isReadOnly
									}), {
								iconCls : 'btn-del',
								text : '删除',
								xtype : 'button',
								scope : this,
								hidden:this.isReadOnly,
								handler : this.removeSelRs
							},/*new Ext.Toolbar.Separator({
								hidden:this.isReadOnly
									})
							, {
								iconCls : 'slupIcon',
								text : '导入',
								xtype : 'button',
								scope : this,
								hidden:this.isReadOnly,
								handler : this.excelimport
							},new Ext.Toolbar.Separator({
								hidden:this.isReadOnly
									})
							, {
								iconCls : 'sldownIcon',
								text : '下载导入模板',
								xtype : 'button',
								scope : this,
								hidden:this.isReadOnly,
								handler : this.loadtotempt
							},*/new Ext.Toolbar.Separator({
								hidden:this.isReadOnly
									})
							, {
								iconCls : 'btn-detail',
								text : '查看',
								xtype : 'button',
								scope : this,
								handler : this.seeSelRs
							}/*,new Ext.Toolbar.Separator({
									}), {
								iconCls : 'btn-xls',
								text : '导出excel',
								xtype : 'button',
								scope : this,
								handler : this.toexcel
							},new Ext.Toolbar.Separator({
									}), {
								iconCls : 'btn-pdf',
								text : '导出pdf',
								xtype : 'button',
								scope : this,
								handler : this.topdf
							}*/]
				});
			this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar :this.topbar,
			// 使用RowActions
			id : 'BpCustEntAccountIndexGrid',
			url : __ctxPath
					+ "/creditFlow/customer/enterprise/listBpCustEntAccountSumIndex.do?Q_customerId_L_EQ="+this.enterpriseId+"&Q_customerType_S_EQ="+this.customerType,
			fields : [{
						name : 'id',
						type : 'int'
					}, 'customerType', 'customerId', 'year', 'month','remark',
					'createrId', 'createrName','updateDate','remark','startDate','endDate'],
			columns : [{
						header : 'id',
						dataIndex : 'id',
						hidden : true
					}, {
						header : '报表周期开始日期',
						dataIndex : 'startDate'
					}, {
						header : '报表周期结束日期',
						dataIndex : 'endDate'
					},  {
						header : '备注',
						dataIndex : 'remark'
					}, {
						header : '录入人',
						dataIndex : 'createrName'
					}, {
						header : '录入时间',
						dataIndex : 'updateDate'
					},{
						header : 'customerType',
						dataIndex : 'customerType',
						hidden:true
					}, {
						header : 'customerId',
						dataIndex : 'customerId',
						hidden:true
					}]
				// end of columns
		});
	},	// 创建记录
	createRs : function() {
			new AccountIndexForm({
			customerType:this.customerType,
			customerId:this.enterpriseId,
			readOnly:false
			}).show();
	},
	editRs : function() {
			var s = this.gridPanel.getSelectionModel().getSelections();
			if (s <= 0) {
				Ext.ux.Toast.msg('操作信息','请选中任何一条记录');
				return false;
			}else if(s.length>1){
				Ext.ux.Toast.msg('操作信息','只能选中一条记录');
				return false;
			}else{	
				record=s[0];
				new AccountIndexForm({
						indexId : record.data.id,
						readOnly:false
					}).show();
			}	
			
		}
	,

		// 把选中ID删除
	removeSelRs : function() {
		$delGridRs({
			url : __ctxPath
					+ '/creditFlow/customer/enterprise/multiDelBpCustEntAccountSumIndex.do',
			grid : this.gridPanel,
			idName : 'id'
		});
	},
/*	seeSelRs:function(){
		var s = this.gridPanel.getSelectionModel().getSelections();
			if (s <= 0) {
				Ext.ux.Toast.msg('操作信息','请选中记录');
				return false;
			}else{	
				var s = this.gridPanel.getSelectionModel().getSelections();
				 var ids = $getGdSelectedIds(this.gridPanel,'reportYearId');
				 new FianceIndexValueSeeReport({
				    ids:ids,
				   reportKey: this.reportKey,
				   type:this.type,
				   title:this.title
				 }).show();
			}
	
	},*/
	seeSelRs:function(){
		var s = this.gridPanel.getSelectionModel().getSelections();
			if (s <= 0) {
				Ext.ux.Toast.msg('操作信息','请选中任何一条记录');
				return false;
			}else if(s.length>1){
				Ext.ux.Toast.msg('操作信息','只能选中一条记录');
				return false;
			}else{	
				record=s[0];
				new AccountIndexForm({
						indexId : record.data.id,
						readOnly:true
					}).show();
			}
	
	},
	toexcel:function(){
		var s = this.gridPanel.getSelectionModel().getSelections();
		 var ids = $getGdSelectedIds(this.gridPanel,'reportYearId');
	var reportKey=this.reportKey;
          Ext.Ajax.request({
						waitMsg : '正在提交查询',
						url : __ctxPath + '/system/submitCustomFinanceReportTemplate.do?reportKey='+reportKey,
						method : 'post',
						success : function(response, request) {
							var object = Ext.util.JSON
									.decode(response.responseText)
							document.location.href = __ctxPath
										+ '/report/report.jsp?reportId='
										+ object.reportId
										+ encodeURI(encodeURI(object.data))
										+ '&reportType=xls';
						},
						failure : function(response, request) {
							
						},
						params:{
						   ids:ids,
						   type:this.type
						   
						}
        })
	},
	topdf:function(){
		var s = this.gridPanel.getSelectionModel().getSelections();
		 var ids = $getGdSelectedIds(this.gridPanel,'reportYearId');
	var reportKey=this.reportKey;
	var type=this.type;
          Ext.Ajax.request({
						waitMsg : '正在提交查询',
						url : __ctxPath + '/system/submitCustomFinanceReportTemplate.do?reportKey='+reportKey,
						method : 'post',
						success : function(response, request) {
							var object = Ext.util.JSON
									.decode(response.responseText)
							document.location.href = __ctxPath
										+ '/report/report.jsp?reportId='
										+ object.reportId
										+ encodeURI(encodeURI(object.data))
										+ '&reportType=pdf';
						},
						failure : function(response, request) {
							
						},
						params:{
						   ids:ids,
						   type:type
						}
        })
	},
	excelimport:function(){
			var type=this.type;
		var entId=this.enterpriseId
		var gridPanel=this.gridPanel;
		new Ext.Window({
		id : 'importEnterpriseWin',
		title : '导入数据',
		layout : 'fit',
		width : (screen.width - 180) * 0.6 - 150,
		height : 130,
		closable : true,
		resizable : true,
		plain : false,
		bodyBorder : false,
		border : false,
		modal : true,
		constrainHeader : true,
		bodyStyle : 'overflowX:hidden',
		buttonAlign : 'center',
		items : [new Ext.form.FormPanel({
			id : 'importEnterpriseFrom',
			monitorValid : true,
			labelAlign : 'right',
			url :  __ctxPath +'/creditFlow/customer/enterprise/batchImportEFinaceReportBatchImportDatabase.do',
			buttonAlign : 'center',
			enctype : 'multipart/form-data',
			fileUpload : true,
			layout : 'column',
			frame : true,
			items : [{
				columnWidth : 1,
				layout : 'form',
				labelWidth : 90,
				defaults : {
					anchor : '95%'
				},
				items : [{}, {
					xtype : 'textfield',
					fieldLabel : '请选择文件',
					allowBlank : false,
					blankText : '文件不能为空',
					inputType : 'file',
					id : 'fileBatch',
					name : 'fileBatch'
				}]
			}]
		})],
		buttons : [{
			text : '导入',
			iconCls : 'uploadIcon',
			formBind : true,
			handler : function() {
				Ext.getCmp('importEnterpriseFrom').getForm().submit({
					method : 'POST',
					waitTitle : '连接',
					waitMsg : '消息发送中...',
					success : function(form, action) {
						Ext.ux.Toast.msg('状态', '导入成功!');
						Ext.getCmp('importEnterpriseWin').destroy();
						gridPanel.store.reload();
							
					},
					failure : function(form, action) {
						Ext.ux.Toast.msg('状态', '导入失败!');
					},
					params:{
						   type:type,
                           entId:entId
					}
				});
			}
		}]
	}).show();
	
	},
	loadtotempt:function(){

	window.open(__ctxPath + '/creditFlow/customer/enterprise/outputExcelBpCustEntFianceIndexSetting.do?type='+this.type,'_blank');
	
	
	}
});
