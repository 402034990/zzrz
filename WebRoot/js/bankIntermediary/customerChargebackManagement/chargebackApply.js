/** 退单申请 */
chargebackApply = Ext.extend(Ext.Panel,{
	// 构造函数
	constructor : function(_cfg) {

		if (_cfg == null) {
			_cfg = {};
		}
		;

		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		chargebackApply.superclass.constructor.call(this,
				{
					id : 'chargebackApply',
					layout : 'fit',
					autoScroll : true,
					items : this.formPanel,
					modal : true,
					height : 600,
					width : 1000,
					maximizable : true,
					title : '退单申请',
					buttonAlign : 'center',
					buttons : [ {
						text : '保存',
						iconCls : 'btn-save',
						hidden : this.isLook,
						scope : this,
						handler : this.save
					} ]
				});
	},

	// 初始化组件
	initUIComponents : function() {
		var labelWidth = 60;
		// 项目基本信息
		var projectInfo = new ProjectInfo();
		// 借款意向
		var borrowingIntentions = new BorrowingIntention();
		// 客户基本信息
		var customerInfo = new CustomerInfo();
		// 退单费用收取信息
		var commissionInfo = new CommissionInfo();
		// 当前业务
		var currentBusiness = new CurrentBusiness();

		this.formPanel = new Ext.form.FormPanel({
			layout : 'form',
			bodyStyle : 'padding:10px',
			autoScroll : true,
			frame : true,
			id : '',
			labelAlign : 'right',
			defaults : {
				anchor : '100%',
				bodyStyle : 'padding-left:0px;',
				collapsible : true,
				labelAlign : 'right',
				autoHeight : true
			},
			items : [ {
				xtype : 'fieldset',
				title : '项目信息',
				items : [ projectInfo ]
			}, {
				xtype : 'fieldset',
				title : '客户信息',
				items : [ customerInfo ]
			}, {
				xtype : 'fieldset',
				title : '借款意向',
				items : [ borrowingIntentions ]
			},  {
				xtype : 'fieldset',
				title : '费用收取信息',
				items : [ commissionInfo ]
			}, {
				xtype : 'fieldset',
				title : '目前业务',
				collapsible : true,
				autoHeight : true,
				bodyStyle : 'padding-left: 0px',
				items : [currentBusiness]
			}, {
				xtype : 'fieldset',
				title : '合同文件',
				collapsible : true,
				autoHeight : true,
				bodyStyle : 'padding-left: 0px'
			// items : [this.persoormPanel7]
			}]
		});

		// 加载表单对应的数据
		this.formPanel
				.loadData({
					url : __ctxPath
							+ '/creditFlow/creditAssignment/customer/getMoneyInfoCsInvestmentperson.do',
					params : {
						investPersonId : this.investPersonId
					},
					root : 'data',
					preName : [ 'enterpriseBank', 'blance',
							'csInvestmentperson',
							'obSystemAccount' ],
					success : function(response, options) {
						var respText = response.responseText;
						var alarm_fields = Ext.util.JSON
								.decode(respText);

					}
				});
	},

	/**
	 * 保存记录
	 */
	save : function() {
	}// end of save

});