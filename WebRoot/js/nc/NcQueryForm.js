/**
 * @author
 * @createtime
 * @class BpProductParameterForm
 * @extends Ext.Window
 * @description BpProductParameter表单
 * @company 智维软件
 */
NcQueryForm = Ext.extend(Ext.Window, {
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
		NcQueryForm.superclass.constructor.call(this, {
					id : 'NcQueryForm',
					layout : 'fit',
					items : this.outPanel,
					modal : true,
					autoScroll:true,
					maximizable : true,
					frame:true,
					height : 180,
			        width :400,
					title : '新增产品',
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
		    items:[     {
								name : 'bpProductParameter.id',
								xtype : 'hidden',
								value : this.id == null ? '' : this.id
							},{
								fieldLabel : '产品名称',
								name : 'bpProductParameter.productName',
								xtype : 'textfield',
								allowBlank : false,
								anchor : '100%',
								maxLength : 255
							},{
								fieldLabel : '产品编号',
								name : 'bpProductParameter.productNumber',
								xtype : 'textfield',
								allowBlank : false,
								anchor : '100%',
								maxLength : 255
							},{
								hidden:true,
								name : 'bpProductParameter.businessType',
								xtype : 'textfield',
							    value:'SmallLoan'
							}]
		});
		

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
		var object=this.getCmpByName("bpProductParameter.productNumber");
		var productName=this.getCmpByName("bpProductParameter.productName");
		var productNumber=object.getValue();
		if(productName.getValue()==""){
			Ext.ux.Toast.msg('操作信息',"该产品名称不能为空");
			return false;
		}
		if(productNumber==""){
			Ext.ux.Toast.msg('操作信息',"该产品编号不能为空");
			return false;
		}
		Ext.Ajax.request({
			url : __ctxPath
					+ '/system/findProductNumberBpProductParameter.do',
			method : 'POST',
			scope : this,
			params : {
				productNumber : productNumber
			},
			success : function(response, request) {
				var obj = Ext.util.JSON
						.decode(response.responseText);
				if (obj.state == true) {
					Ext.ux.Toast.msg('操作信息',
							"该产品编号已存在，请重新输入");
					object.setValue("");
				} else {
					this.outPanel.getForm().submit({
			    clientValidation: false, 
				url : __ctxPath+ '/system/saveBpProductParameter.do',
				method : 'post',
				waitMsg : '数据正在提交，请稍后...',
				scope: this,
				params : {
				    businessType : "SmallLoan"
				},
				success : function(fp, action) {
					var gridPanel = Ext.getCmp('BpProductParameterGrid');
					if (gridPanel != null) {
						gridPanel.getStore().reload();
					}
					this.close();
				}
				});
				}
			}
			});
		
	}
});