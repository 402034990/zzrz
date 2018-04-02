/**
 * @author
 * @createtime
 * @class BpProductParameterForm
 * @extends Ext.Window
 * @description BpProductParameter表单
 * @company 智维软件
 */
EmpowerBpProduct = Ext.extend(Ext.Window, {
	// 构造函数
	isAllReadOnly:false,
	productId:null,
	constructor : function(_cfg) {
		if(typeof(_cfg.isAllReadOnly)!="undefined"){
			this.isAllReadOnly=_cfg.isAllReadOnly;
		}
		if(typeof(_cfg.productId)!="undefined"){
			this.productId=_cfg.productId;
		}
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		EmpowerBpProduct.superclass.constructor.call(this, {
					id : 'EmpowerBpProductWin',
					layout : 'fit',
					items : this.outPanel,
					modal : true,
					autoScroll:true,
					maximizable : true,
					frame:true,
					height : 180,
			        width :400,
					title : '授权产品',
					buttonAlign : 'center',
					buttons :this.isHideBtns?null: [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : '重置',
								iconCls : 'btn-reset',
								scope : this,
								handler : this.reset
							}, {
								text : '取消',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		this.outPanel = new Ext.form.FormPanel({
			modal : true,
			labelWidth : 70,
			
			frame:true,
			buttonAlign : 'center',
			layout : 'form',
			items:[	{
						name : 'bpProductParameter.id',
						xtype : 'hidden',
						value : this.id == null ? '' : this.id
					}, {
						fieldLabel : '产品名称',
						name : 'bpProductParameter.productName',
						xtype : 'textfield',
						allowBlank : false,
						readOnly:true,
						anchor : '100%',
						maxLength : 255
					},{
						columnWidth : 1, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelWidth : 70,
						items : [{
							xtype : "combo",
							triggerClass : 'x-form-search-trigger',
							hiddenName : "bpProductParameter.rolerName",
							editable : false,
							fieldLabel : "角色名称",
							blankText : "角色名称不能为空，请正确填写!",
							allowBlank : false,
							//readOnly : this.isAllReadOnly,
							anchor : "100%",
							onTriggerClick : function(cc) {
								var obj = this;
								var appuerIdObj = obj.nextSibling();
								var userIds = appuerIdObj.getValue();
								if (null == obj.getValue() || "" == obj.getValue()) {
									userIds = "";
								}
								new RolerDialog({
											roleIds : userIds,
											userName : obj.getValue(),
											single : false,
											type : 'branch',
											title : "选择角色",
											callback : function(roleId, roleName) {
												obj.setValue(roleName);
												appuerIdObj.setValue(roleId);
											}
										}).show();

							}
						}, {
							xtype : "hidden",
							name : "bpProductParameter.roleId"
						}]
					}]
		});
		// 加载表单对应的数据
		if (this.productId != null && this.productId != 'undefined') {
			var productId=this.productId;
			this.outPanel.loadData({
				url : __ctxPath+ '/system/getBpProductParameter.do?id='+ this.productId,
				root : 'data',
				preName : 'bpProductParameter',
				success : function(response, options) {
					var respText = response.responseText;
					var alarm_fields = Ext.util.JSON.decode(respText);
					var rolerName = alarm_fields.data.rolerName;
					var rolerId = alarm_fields.data.rolerId;
					this.getCmpByName("bpProductParameter.roleId").setValue(rolerId);
					this.getCmpByName("bpProductParameter.rolerName").setValue(rolerName);
					//设置产品名称
					var   productName = alarm_fields.data.bpProductParameter.productName;
					this.getCmpByName("bpProductParameter.productName").setValue(productName);
					//设置产品的主键
					var  aaaid = alarm_fields.data.bpProductParameter.id;
					this.getCmpByName("bpProductParameter.id").setValue(aaaid);
					fillProductData(this,alarm_fields,"_productDefination_",productId);
					var contractView=this.getCmpByName('contractView');
					contractView.add(this.SlContractListView)
					contractView.doLayout();
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
		var productId= this.getCmpByName("bpProductParameter.id");
		this.outPanel.getForm().submit({
			    clientValidation: false, 
				url : __ctxPath+ '/system/saveBpProductParameter.do',
				method : 'post',
				waitMsg : '数据正在提交，请稍后...',
				scope: this,
				success : function(fp, action) {
					var gridPanel = Ext.getCmp('BpProductParameterGrid');
					if (gridPanel != null) {
						gridPanel.getStore().reload();
					}
					this.close();
				}
		});
	}
});