/**
 * @author
 * @createtime
 * @class BpProductParameterForm
 * @extends Ext.Window
 * @description BpProductParameter表单
 * @company 智维软件
 */
BpProductParameterForm = Ext.extend(Ext.Window, {
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
		BpProductParameterForm.superclass.constructor.call(this, {
					id : 'BpProductParameterFormWin'+this.productId,
					layout : 'form',
					items : this.outPanel,
					modal : true,
					autoScroll:true,
					height : 600,
					width :(screen.width)*0.9,
					maximizable : true,
					frame:true,
					title : '产品信息',
					buttonAlign : 'center',
					buttons :this.isHideBtns?null: [{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
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
		//贷款材料清单
		this.ourProcreditMaterialsView=new OurProcreditMaterialsViewProduct({
			isProduct:true,
			productId:this.productId,
			businessType:this.businessType,
			operationType:this.operationType,
			isReadOnly:true,
			hiddenDel:this.hiddenDel,
			hiddenedit:this.hiddenedit,
			hiddenAdd:this.hiddenAdd,
			isAllReadOnly:this.isAllReadOnly
		});
		//贷款准入原则
		this.ourProcreditAssuretenetProductView = new OurProcreditAssuretenetProductView({
			isProduct:true,
			productId:this.productId,
			businessType:this.businessType,
			operationType:this.operationType,
			isBiBeiReadOnly:true,
			hiddenDel:this.hiddenDel,
			hiddenedit:this.hiddenedit,
			hiddenAdd:this.hiddenAdd,
			isAllReadOnly:this.isAllReadOnly
		});
		
		//手续费用
		this.SlPlanToToChargeProduct= new SlPlanToChargeProduct({
			productId : this.productId,
			businessType:this.businessType,
			isFlow:false,
			isReadOnly:true, 
			hiddenDel:this.hiddenDel,
			hiddenedit:this.hiddenedit,
			hiddenAdd:this.hiddenAdd,
			isProduct:true
		});
		this.formPanel1=new BpProductModule_ProductDiscribe({
			isAllReadOnly :this.isAllReadOnly,
			isEditReadOnly:this.isEditReadOnly
		});
		this.OurArchivesMaterialsProductView=new OurArchivesMaterialsProductView({
			isProduct:true,
			productId:this.productId,
			businessType:this.businessType,
			operationType:this.operationType,
			isBiBeiReadOnly:true,
			hiddenDel:this.hiddenDel,
			hiddenedit:this.hiddenedit,
			hiddenAdd:this.hiddenAdd,
			isAllReadOnly:this.isAllReadOnly
		});
		/*this.formPanel2 = new BpProductModule_ProductFiancial({
		   	isAllReadOnly :this.isAllReadOnly,
		   	defination:"_productDefination_",
		   	productId:this.productId
		   	
	    });*/
	     this.formPanel2 = new LoanTrialProductFormPanel({
		   	isAllReadOnly :this.isAllReadOnly,
		 	productId:this.productId,
			idDefinition:'_productDefination_',
			defineForm :'bpProductParameter',
			isProduct :true
	    });
		this.SlContractListView=new SlContractListView({
			productId:this.productId,
		    isHiddenAddBtn : false,
		    isHiddenDelBtn : false,
		    isHiddenEdiBtn : false,
		    contractUploadHidden:true,
		    sprojectId:this.projectId,
		    isSignHidden:true,
		    isHiddenAffrim:true,
		    isHidden:true,
		    isHiddenToFtp:true,
	    	htType : 'loanContract',
	    	HTLX : 'loanContract',
		    businessType : this.businessType,
		    isqsEdit:false,
		    isHiddenTbar:false
		 });
		this.outPanel = new Ext.form.FormPanel({
			modal : true,
			labelWidth : 100,
			frame:true,
			monitorValid : true,
			buttonAlign : 'center',
			layout : 'form',
			border : false,
			width :(screen.width)*0.875,
			defaults : {
				anchor : '100%',
				xtype : 'fieldset',
				columnWidth : 1,
				labelAlign : 'right',
				autoHeight : true
		    },
		    labelAlign : "right",
		    items:[{
				xtype : 'fieldset',
				border : false,
				title : '产品简介',
				collapsible : false,
				autoHeight : true,
				labelAlign : 'right',
				items : [this.formPanel1]
		    },{
				xtype : 'fieldset',
				title : '款项信息',
				collapsible : false,
				border : false,
				autoHeight : true,
				labelAlign : 'right',
				items : [this.formPanel2]
		    },{
				xtype : 'fieldset',
				title : '费用收取清单',
				collapsible : false,
				border : false,
				labelAlign : 'right',
				items : [this.SlPlanToToChargeProduct]
		    },{
				xtype : 'fieldset',
				title : '贷款材料清单',
				collapsible : false,
				border : false,
				labelAlign : 'right',
				items : [this.ourProcreditMaterialsView]
		    },{
				xtype : 'fieldset',
				title : '贷款必备条件',
				collapsible : false,
				border : false,
				labelAlign : 'right',
				items : [this.ourProcreditAssuretenetProductView]
		    },{
				xtype : 'fieldset',
				title : '贷款归档材料清单',
				collapsible : false,
				border : false,
				labelAlign : 'right',
				items : [this.OurArchivesMaterialsProductView]
		    }
//		    ,
//		    	{
//				xtype : 'fieldset',
//				title :'合同管理',
//				collapsible : false,
//				border : false,
//				labelAlign : 'right',
//				name : 'contractView',
//				items : [this.SlContractListView]
//			}
			]
		});
		// 加载表单对应的数据
		if (this.productId != null && this.productId != 'undefined') {
			var productId=this.productId;
			this.outPanel.loadData({
				url : __ctxPath+ '/system/getBpProductParameter.do?id='+ this.productId,
				success : function(response, options) {
					var respText = response.responseText;
					var alarm_fields = Ext.util.JSON.decode(respText);
					loanTrialLoadData(this,alarm_fields.data.bpProductParameter,"_productDefination_","bpProductParameter");
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
		var SlPlansToChargeDates=this.SlPlanToToChargeProduct.getSlPlansGridDate();
		if (this.outPanel.getForm().isValid()) {
			this.outPanel.getForm().submit({
				    clientValidation: false, 
					url : __ctxPath+ '/system/saveBpProductParameter.do',
					method : 'post',
					waitMsg : '数据正在提交，请稍后...',
					params : {
							"SlPlansToChargeDates" : SlPlansToChargeDates
					},
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
	}
});