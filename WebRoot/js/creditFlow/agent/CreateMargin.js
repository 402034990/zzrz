/**
 * @author 
 * @createtime 
 * @class OurProcreditMaterialsForm
 * @extends Ext.Window
 * @description OurProcreditMaterials表单
 * @company 智维软件
 */


CreateMargin = Ext.extend(Ext.Window, {
	operateGrid:null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		if(_cfg.operateGrid)
		this.operateGrid=_cfg.operateGrid;
		this.initUIComponents();
		CreateMargin.superclass.constructor.call(this, {
					layout : 'fit',
					items : [this.formPanel],
					modal : true,
					height:400,
					width : 900,
					id:'CreateMarginWin',
					frame:true,
					maximizable : true,
					title : "基本信息",
					buttonAlign : 'center',
					buttons : [{
						text : '提交',
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
	},//end of the constructor
	//初始化组件
	initUIComponents : function() {
		var pertitle="客户基本信息";
		this.formPanel = new Ext.FormPanel({
			id : "CreateMarginFormPanel",
			frame:true,
		    items : [{
				xtype : 'fieldset',
				title : pertitle,
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				name : 'customerInfo',
				border : false,
				labelAlign : 'right',
				autoHeight : false,
				collapsed : false,
				items : [
					new CustomerTypeMargin({
					}),
					new PeerPersonMainPanel({
					})
				]}]
		});
	},

	/**
	 * 重置
	 * @param {} formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * @param {} window
	 */
	cancel : function() {
		this.close();
	},
	save : function() {
	 
		 var  custormerName =  this.getCmpByName('cashDeposit.custormerName').getValue();//缴纳保证金时间
		 var  cashrate =  this.getCmpByName('cashDeposit.cashrate').getValue();//缴纳保证金时间、
		 var  cashCount =  this.getCmpByName('cashDeposit.cashCount').getValue();//缴纳保证金时间、
		
		 if(custormerName=="" ||　custormerName==null){
		 	Ext.ux.Toast .msg('警告', '客户名称不能为空');
			return;
		 }
		 if(cashrate=="" ||　cashrate==null){
		 	Ext.ux.Toast .msg('警告', '保证金比例不能为空');
			return;
		 }
		 if(cashCount=="" ||　cashCount==null){
		 	Ext.ux.Toast .msg('警告', '开户人不能为空');
			return;
		 }
	    this.formPanel.getForm().submit({
		    clientValidation: true, 
			url : __ctxPath+ '/entityhbm/saveCashDep.do',
			method : 'post',
			waitMsg : '数据正在提交，请稍后...',
			scope: this,
			success : function(fp, action) {
				 
				Ext.getCmp('PlProjectArchivesGrid').getStore().reload();
				Ext.ux.Toast.msg('操作信息', '保存成功');
				Ext.getCmp('CreateMarginWin').close();
//				var obj = Ext.util.JSON.decode(action.response.responseText)
//				Ext.getCmp('plManageMoneyPlan.mmplanId').setValue(obj.id)
//		        Ext.getCmp('plManageMoneyPlan.mmplanId').getValue();
			}
		});
		
	}

});