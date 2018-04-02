/**
 * @author penglili
 * @createtime
 * @class LoanTrialForm
 * @extends Ext.Window
 * @description LoanTrialForm表单
 * @company 互融软件
 */
CustomerToolForm = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		CustomerToolForm.superclass.constructor.call(this, {
			iconCls:'menu-product',
			border : false,
            title: "客户查询器", 
            autoScroll: true, 
            maximizable :true,
            height:200,
            width:500,  
            modal : false,
            labelWidth:45,  
            plain:true,  
            resizable:true,  
            frame:true,
            closable:true,
            items:[
	                 this.formPanel
	            ],
			buttonAlign : 'center',
			buttons : [{
				text : '查询',
				iconCls : 'btn-ok',
				handler : this.autocreate.createCallback(this.formPanel, this)
			}, '-' ,{
				text : '重置',
				iconCls : 'btn-reset',
				handler : this.reset.createCallback(this.formPanel)
			}]

		});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		
		var customerPanel= new CustomerToolFormPanel({
		});
		this.formPanel=  new Ext.FormPanel({
			modal : true,
			labelWidth : 100,
			frame:true,
			layout : 'form',
			border : false,
			autoHeight: true,  
			defaults : {
				anchor : '100%',
				xtype : 'fieldset',
				columnWidth : 1,
				labelAlign : 'right',
				collapsible : true,
				autoHeight : true
			},
			items : [{
				title : '查询条件',
				xtype : 'fieldset',
				autoHeight : true,
				name:"searchPanel",
				collapsible : true,
				width : '100%',
				bodyStyle : 'padding-left:8px',
				items : [customerPanel]
			}]
        })
	},
	//查询
	autocreate : function(formPanelData,thisPanel) {
		var intentobj=formPanelData.items.get(0).get(1);
		intentobj.autocreate();
	},
	//重置
	reset : function(formPanelData) {
		var financeObj=formPanelData.items.get(0).get(0);
		financeObj.getCmpByName("customerName").setValue(null);
		financeObj.getCmpByName("customerTelephone").setValue(null);
							
	}
});

