/**
 * @author
 * @class BpDicAccountTitleSetIndexForm
 * @extends Ext.Panel
 * @description [BpDicAccountTitleSetIndexForm]管理
 * @company 互融软件
 * @createtime:
 */
BpDicAccountTitleSetIndexForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		BpDicAccountTitleSetIndexForm.superclass.constructor.call(this, {
					id : 'BpDicAccountTitleSetIndexForm',
					title :'财务账套',
					region : 'center',
					layout : 'border',
					width : 700,
					height : this.isShowView==false?500:250,
					constrainHeader : true,
					collapsible : true,
					frame : true,
					border : false,
					resizable : true,
					layout : 'fit',
					autoScroll : true,
					bodyStyle : 'overflowX:hidden',
					constrain : true,
					closable : true,
					modal : true,
					items : [this.formPanel],
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								hidden : this.readOnly,
								handler : this.save
							}, {
								text : '关闭',
								iconCls : 'btn-cancel',
								scope : this,
								handler : function() {
									this.close();
								}
							}]
				});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		 this.BpDicAccountTitleSetView=new BpDicAccountTitleSetView({listId:this.listId,isHiddenAdd:this.readOnly,isHiddenEdit:this.readOnly,isHiddenDel:this.readOnly});
		 this.formPanel = new Ext.FormPanel({
			monitorValid : true,
			bodyStyle : 'padding:10px',
			autoScroll : true,
			labelAlign : 'right',
			layout : "form",
			frame : true,
			border : false,
			items : [{
					layout : 'column',
					border : false,
					items : [              {
												name:"bpDicAccountTitleSetIndex.id",
												xtype : "hidden",
												value : this.id

											},{
									       columnWidth : .5,
									       layout : "form", // 从上往下的布局
								           labelWidth : 110,
								         
									       items : [{
												xtype : 'combo',
												mode : 'local',
												valueField : 'id',
												editable : false,
												readOnly : this.readOnly,
												allowBlank : false,
												displayField : 'value',
												store : new Ext.data.SimpleStore({
															fields : ["value", "id"],
															data : [["客户尽调专用账套", "Customer"],
																	["金融公司专用账套", "System"]]
														}),
												triggerAction : "all",
												hiddenName : 'bpDicAccountTitleSetIndex.listType',
												anchor : "100%",
												fieldLabel : '账套类型'
										}]

								},{
									       columnWidth : .5,
									       layout : "form", // 从上往下的布局
								           labelWidth : 100,
									       items : [{
												fieldLabel : '账套名称',
												readOnly : this.readOnly,
												allowBlank : false,
												name : 'bpDicAccountTitleSetIndex.listName',
												anchor : "90%",
												xtype : 'textfield'
										}]

								},{
									columnWidth : 1,
									layout : "form", // 从上往下的布局
								    labelWidth : 110,
									items : [{
												xtype : "textarea",
												fieldLabel : "备注",
												name:"bpDicAccountTitleSetIndex.remark",
												readOnly : this.readOnly,
												
												anchor:"95%"

											}]

								}

					,{
								columnWidth : 1, // 该列在整行中所占的百分比
								layout : "form", // 从上往下的布局
								 labelWidth : 80,
								 hidden:this.isShowView==false?false:true,
								items : [
							     this.BpDicAccountTitleSetView
							]
							}]
				}]
		})
		if(!Ext.isEmpty(this.listId)){
			this.formPanel.loadData({
							url : 	__ctxPath + '/creditFlow/common/getBpDicAccountTitleSetIndex.do?id='+ this.listId,
								root : 'data',
								preName : 'bpDicAccountTitleSetIndex',
								scope:this,
								success:function(resp,options){
								}
							});
					
		}			
				
		
	}// end of the initComponents()
	,save:function(){
	
			this.formPanel.getForm().submit({
					url : 	__ctxPath + '/creditFlow/common/saveBpDicAccountTitleSetIndex.do',
					method : 'POST',
					scope :this,
					params : {
										/*FianceIndexValuelistData : FianceIndexValuelistData*/
									},
					waitTitle : '连接',
					waitMsg : '消息发送中...',
					success : function(form ,action) {
						Ext.getCmp("BpDicAccountTitleSetIndexGrid").store.reload();
						this.close();
						
					},
					failure : function(fp, action) {
					}
				});
					
	}

});
