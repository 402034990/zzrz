/**
 * 目前业务
 * @class CurrentBusiness
 * @extends Ext.Panel
 */
CurrentBusiness = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		if(typeof(_cfg.legalPersonId)!="undefined"){
			this.legalPersonId=_cfg.legalPersonId;
		}
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		CurrentBusiness.superclass.constructor.call(this, {
			id : 'CurrentBusiness',
			title : '目前业务',
			region : 'center',
			layout : 'border',
			iconCls :'menu-company',
			items : [this.gridPanel ]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		this.topbar = new Ext.Toolbar({
			items : [ {
						iconCls : 'btn-detail',
						text : '查看企业详细',
						xtype : 'button',
						scope : this,
						hidden : isGranted('_loanAccept_flow')? false: true,
						handler : this.seeEnterpriseInfo
					}]
		});

		this.gridPanel = new HT.GridPanel( {
			region : 'center',
			hiddenCm:true,
			//tbar:this.topbar,
			showPaging:false,
			url :  __ctxPath +"/creditFlow/common/getEntByLegalPersonIdShareequity.do?personid="+this.legalPersonId,
			fields : [ {
				name : 'id',
				type : 'int'
			}, 'organizecode',
			'cciaa',
			'enterprisename',
			'ownership',
			'registermoney'
			],
			columns : [ {
				header : 'id',
				dataIndex : 'id',
				hidden : true
			}, {
				header : '贷款产品',
				dataIndex : ''
			}, {
				header : '贷款机构',
				dataIndex : ''
			}, {
				header : '办理状态',
				dataIndex : ''
			}, {
				header : '进件日期',
				dataIndex : ''
			},{
				header : '放款日期',
				dataIndex : ''
			}, {
				header : '放款金额',
				dataIndex : '',
				align:'right',
				renderer : function(value,metaData, record,rowIndex, colIndex,store) {
				
					return Ext.util.Format.number(value,'0,000.00')+"元"	;
				}
			},{
				header : '备注',
				dataIndex : ''
			}]
		//end of columns
				});
	},// end of the initComponents()
	seeEnterpriseInfo : function() {
		var selected = this.gridPanel.getSelectionModel().getSelected();
		if (null == selected) {
			Ext.ux.Toast.msg('状态', '请选择一条记录!');
		}else{
			seeEnterpriseCustomer(selected.get('id'));
		}
	}
});
