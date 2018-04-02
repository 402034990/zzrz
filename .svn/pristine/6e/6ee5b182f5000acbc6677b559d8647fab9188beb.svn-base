/**
 * @author
 * @createtime
 * @class BpDicAccountTitleSetForm
 * @extends Ext.Window
 * @description BpDicAccountTitleSetForm表单
 * @company 互融软件
 */
BpDicAccountTitleSetForm = Ext.extend(Ext.Window, {
	// 构造函数
	gridPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		if(typeof(_cfg.gridPanel)!='undefined'){
			this.gridPanel = _cfg.gridPanel;
		}
		// 必须先初始化组件
		this.initUIComponents();
		BpDicAccountTitleSetForm.superclass.constructor.call(this, {
					id : 'BpDicAccountTitleSetForm',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 200,
					width : 650,
					maximizable : true,
					title : '财务账套配置',
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								hidden:this.readOnly,
								handler : this.save
							},/*
								 * { text : '重置', iconCls : 'btn-reset', scope :
								 * this, handler : this.reset },
								 */{
								text : this.readOnly==true?'关闭':'取消',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			        bodyStyle : 'padding:10px 10px 10px 0',
					layout : 'form',
					autoScroll : true,
					frame : true,
					anchor : '100%',
					labelAlign : 'right',
					defaults : {
						anchor : '96%',
						labelWidth : 80
					},
					items : [{
								columnWidth : 1,
								layout : 'form',
								labelWidth : 80,
								labelAlign : 'right',
								border : false,
								items : [
										{
											layout : "column",
											border : false,
											scope : this,
											items:[
												{
													name : 'bpDicAccountTitleSet.id',
													xtype : 'hidden',
													value:this.id
												},
												{
													name : 'bpDicAccountTitleSet.listId',
													xtype : 'hidden',
													value:this.listId
												},
												
											   {
													columnWidth :.46,
													layout : 'form',
													labelWidth : 80,
													labelAlign : 'right',
													border : false,
													items : [{
													xtype : "combo",
													anchor : "100%",
													hiddenName : "bpDicAccountTitleSet.keyId",
													displayField : 'itemName',
													valueField : 'itemId',
													triggerAction : 'all',
													allowBlank : false,
													editable:false,
													readOnly : this.readOnly,
													disable : true,
													store : new Ext.data.SimpleStore({
															autoLoad : true,
															url :  __ctxPath+ '/creditFlow/customer/enterprise/getClassNameJsonBpDicAccountTitle.do',
																  fields : ['itemId', 'itemName']
															}),
															fieldLabel : "一级科目类别",
															blankText : "一级科目不能为空，请正确填写!",
															listeners : {
																	afterrender : function(combox) {
																		var st = combox.getStore();
																		st.on("load", function() {
																		    combox.setValue(combox
																					.getValue());
																			combox.clearInvalid();
																			var v = combox.lastSelectionText;
																			combox.fireEvent("select",combox, v, null);
																		})
						                                   },
																	select : function(combox, record, index) {
																		var opr_obj = this.ownerCt.ownerCt.getCmpByName('bpDicAccountTitleSet.keyName');
																		var v='';
																		if(index==null){
																		 v=record
																		}else{
																		  v = record.data.itemName;
																		  opr_obj.clearValue();
																		}
																		  opr_obj.getStore().baseParams.className=v;
																		  opr_obj.getStore().load();
																	}
																}
															}]
												},{
							                            columnWidth : .04, // 该列在整行中所占的百分比
							                            layout : "form", // 从上往下的布局
							                            labelWidth : 20,
							                            items : [{
										                fieldLabel : " ",
										                labelSeparator : '',
										                anchor : "100%"
									                   }]
						                       },{
													columnWidth :.46,
													layout : 'form',
													labelWidth : 110,
													labelAlign : 'right',
													border : false,
													items : [{
													fieldLabel : "一级科目名称",
													xtype : "combo",
													readOnly : this.readOnly,
													allowBlank : false,
													displayField : 'itemName',
													valueField : 'itemId',
													triggerAction : 'all',
													mode : 'remote',
													disable : true,
													hiddenName : "bpDicAccountTitleSet.keyName",
													editable : false,
													blankText : "一级科目名称不能为空，请正确填写!",
													anchor : "100%",
													store : new Ext.data.ArrayStore({
														url : __ctxPath+ '/creditFlow/customer/enterprise/getTitleJsonBpDicAccountTitle.do',
														fields : ['itemId','itemName'],
														autoLoad:true,
														baseParams : {
															className : ""
														}
													}),
													listeners : {
														scope : this,
														select : function(combox, record, index) {
														   v = record.data.itemName;
														   this.getCmpByName("bpDicAccountTitleSet.title").setValue(v);
														},
														afterrender : function(combox) {
														var st = combox.getStore();
														st.on("load", function() {
																		combox.setValue(combox
																					.getValue());
																			combox.clearInvalid();
																	})
									                  }
													}
												},{
					                                     xtype : "hidden",
						                                 name : "bpDicAccountTitleSet.title"
					                                  }]
												},{
							                            columnWidth : .04, // 该列在整行中所占的百分比
							                            layout : "form", // 从上往下的布局
							                            labelWidth : 20,
							                            items : [{
										                fieldLabel : " ",
										                labelSeparator : '',
										                anchor : "100%"
									                   }]
						                       },{
													columnWidth :.46,
													layout : 'form',
													labelWidth : 80,
													labelAlign : 'right',
													border : false,
													items : [{
															fieldLabel : '二级科目编号',
															readOnly : this.readOnly,
															allowBlank : true,
															name : 'bpDicAccountTitleSet.subKey',
															anchor : "100%",
															xtype : 'textfield'
													}]
												},	 {
							                            columnWidth : .04, // 该列在整行中所占的百分比
							                            layout : "form", // 从上往下的布局
							                            labelWidth : 20,
							                            items : [{
										                fieldLabel : " ",
										                labelSeparator : '',
										                anchor : "100%"
									                   }]
						                       },
						                       	{
													columnWidth :.46,
													layout : 'form',
													labelWidth : 110,
													labelAlign : 'right',
													border : false,
													items : [{
						                                    xtype : 'textfield',
						                                    fieldLabel : '二级科目名称',
						                                    name : 'bpDicAccountTitleSet.subTitle',
						                                    maxLength : 100,
						                                    blankText : "二级科目名称不能为空，请正确填写!",
						                                    allowBlank : false,
						                                    readOnly : this.readOnly,
						                                    anchor:'100%'
					                                      }]
												},
												 {
							                            columnWidth : .04, // 该列在整行中所占的百分比
							                            layout : "form", // 从上往下的布局
							                            labelWidth : 20,
							                            items : [{
										                fieldLabel : " ",
										                labelSeparator : '',
										                anchor : "100%"
									                   }]
						                       }
												
												
											]
										}
									]
									
								}]
				});
		// 加载表单对应的数据
		if (this.id != null && this.id != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath+ '/creditFlow/common/getBpDicAccountTitleSet.do?id='+this.id,
				root : 'data',
				preName : 'bpDicAccountTitleSet',
				success : function(response, options) {
					var respText = response.responseText;
					var alarm = Ext.util.JSON.decode(respText);
				}
			});
		}

	},// end of the initcomponents

	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
			formPanel : this.formPanel,
			scope : this,
			url : __ctxPath
					+ '/creditFlow/common/saveBpDicAccountTitleSet.do',
			callback : function(fp, action) {
				var gridPanel = this.gridPanel;
				if (gridPanel != null) {
					gridPanel.getStore().reload();
				}
				this.close();
			}
		});
	}// end of save

});