//ChangeProspertiveType.js
ChangeProspertiveType= Ext.extend(Ext.Window, {
	isLook : false,
	isRead : false,
	isflag : false,
	// 构造函数
	investPersonPanel : null,
	investPersonInfo:null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		};
		
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		var leftlabel = 75;
		ChangeProspertiveType.superclass.constructor.call(this, {
					layout : 'fit',
					autoScroll:true,
					items : this.formPanel,
					modal : true,
					height : 200,
					width : 500,
					maximizable : true,
					title : this.titleChange,
					buttonAlign : 'center',
					buttons : [{
								text : '保存',
								iconCls : 'btn-save',
								hidden : this.isLook,
								scope : this,
								handler : this.save
							}, {
								text : '取消',
								iconCls : 'btn-cancel',
								hidden : this.isLook,
								scope : this,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {

		this.formPanel = new Ext.form.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			autoScroll : true,
			frame : true,
			labelAlign : 'right',
			defaults : {
					anchor : '96%',
					columnWidth : 1,
					labelWidth : 60
				},
			items : [{
							xtype : "hidden",
							name : "bpCustProsperctive.perId",
							value:this.perId
					},{
							columnWidth : 1, // 该列在整行中所占的百分比
							layout : "form", // 从上往下的布局
							labelWidth : 60,
							labelAlign : 'right',
							items : [{
										xtype : 'combo',
										fieldLabel : '客户类型',
										mode : 'local',
										store : new Ext.data.SimpleStore({
											fields : ['itemName', 'itemId'],
											data : [['已转化正式客户', 1],['意向客户', 2],['已排除意向客户', 3]]
										}),
										hiddenName : "bpCustProsperctive.prosperctiveType",
										allowBlank : false,
										editable : false,
										displayField : 'itemName',// 显示字段值
										valueField : 'itemId',
										triggerAction : 'all',
										anchor : '100%',
										listeners : {
											afterrender : function(combox) {
												//combox.clearInvalid();
											}}
									}]
						},{
							columnWidth : 1,
							layout : 'form',
							labelWidth : 60,
							labelAlign : 'right',
							items : [{
								xtype : 'textarea',
								fieldLabel : '转化理由',
								name : 'bpCustProsperctive.conversionReason',
								anchor : '100%'
							}]
						}]
		});
				// 加载表单对应的数据
		if (this.perId != null && this.perId != 'undefined') {
			var panel=this
			this.formPanel.loadData({
						url:__ctxPath + "/creditFlow/customer/customerProsperctive/getBpCustProsperctive.do?perId="+this.perId,
						root : 'data',
						preName : ['bpCustProsperctive',"object"],
						success : function(resp, options) {
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
		var panel=this;
		var formPanel1 =this.formPanel
		var flashTargat=this.flashTargat
		if(formPanel1.getForm().isValid()){
			formPanel1.getForm().submit({
					url:__ctxPath+ '/creditFlow/customer/customerProsperctive/changePersonTypeBpCustProsperctive.do',
					params : {
						"perId":this.perId
					},
					method : 'post',
					waitMsg : '数据正在提交，请稍后...',
					scope: this,
					success : function(fp, action) {
						var object = Ext.util.JSON.decode(action.response.responseText)
						var flag =object.flag;
						var personId=panel.personId;
						Ext.ux.Toast.msg('操作信息', '保存信息成功!');
						panel.close();
						flashTargat.getStore().reload();
					},
					failure : function(fp, action) {
						Ext.MessageBox.show({
							title : '操作信息',
							msg : '信息保存出错，请联系管理员！',
							buttons : Ext.MessageBox.OK,
							icon : 'ext-mb-error'
						});
					}
				});
		}else{
			return;
		}
		}// end of save

});