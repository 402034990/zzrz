/**
 * @author penglili
 * @createtime
 * @class LoanTrialFormGrid
 * @extends Ext.Panel
 * @description LoanTrialFormGrid表单
 * @company 互融软件
 */
LoanTrialFormGrid = Ext.extend(Ext.Panel,{
	// 构造函数
	defineForm:'bpFundIntentInitParameter',
	businessType :'SmallLoan',
	hiddenGrid : false,
	hiddenbbar : false,
	allReadOnly : true,
	isThisSuperviseRecord : null,
	isThisEarlyPaymentRecord : null,
	isThisAlterAccrualRecord : null,
	fundTypenodekey : 'financeType',
	isHiddenResBtn1 : true,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		if (typeof(_cfg.defineForm) != "undefined") {
			this.defineForm = _cfg.defineForm;
		}
		if (typeof(_cfg.businessType) != "undefined") {
			this.businessType = _cfg.businessType;
		}
		if (typeof(_cfg.projectId) != "undefined") {
			this.projectId = _cfg.projectId;
		}
		if (typeof(_cfg.hiddenGrid) != "undefined") {
			this.hiddenGrid = _cfg.hiddenGrid;
		}
		if (typeof(_cfg.isHiddenResBtn1) != "undefined") {
			this.isHiddenResBtn1 = _cfg.isHiddenResBtn1;
		}		
		if (typeof(_cfg.hiddenbbar) != "undefined") {
			this.hiddenbbar = _cfg.hiddenbbar;
		}
		if (typeof(_cfg.isHiddenautocreateBtn) != "undefined") {
			this.isHiddenautocreateBtn = _cfg.isHiddenautocreateBtn;
		}
		if (typeof(_cfg.isHiddenAddBtn) != "undefined") {
			this.isHiddenAddBtn = _cfg.isHiddenAddBtn;
		}
		if (typeof(_cfg.isHiddenDelBtn) != "undefined") {
			this.isHiddenDelBtn = _cfg.isHiddenDelBtn;
		}
		if (typeof(_cfg.allReadOnly) != "undefined") {
			this.allReadOnly = _cfg.allReadOnly;
		}
		if (typeof(_cfg.fundTypenodekey) != "undefined") {
			this.fundTypenodekey = _cfg.fundTypenodekey;
		}
		// 必须先初始化组件
		this.initUIComponents();
		LoanTrialFormGrid.superclass.constructor.call(this, {
			layout:'anchor',
			region : 'center',
	        anchor : '100%',
	        hidden:this.hiddenGrid,
			items : [
			{
				xtype : 'panel',
				border : false,
				bodyStyle : 'margin-bottom:5px',
				html : this.isChangeTitle == true
						? '<br/><font class="x-myZW-fieldset-title">（</font>颜色预警：<font color=red>逾期款项</font>&nbsp;&nbsp<font style="line-height:20px">未结清项</font>&nbsp;&nbsp<font color=gray>已结清项</font><font class="x-myZW-fieldset-title" >）：</font>'
						: '<br/><B><font class="x-myZW-fieldset-title">【借款人放款收息表】</font></B><font class="x-myZW-fieldset-title">（</font>颜色预警：<font color=red>逾期款项</font>&nbsp;&nbsp<font style="line-height:20px">未结清项</font>&nbsp;&nbsp<font color=gray>已结清项</font><font class="x-myZW-fieldset-title" >）：</font>',
				hidden : this.isHiddenTitle
			},
				this.gridPanel
			]
		});

	},// end of the constructor
	// 初始化组件

	initUIComponents : function() {
		this.topbar = new Ext.Toolbar({
			items : [{
				iconCls : 'btn-add',
				text : '生成',
				xtype : 'button',
				scope : this,
				hidden : this.isHiddenautocreateBtn,
				handler : this.autocreate
			}, new Ext.Toolbar.Separator({
				hidden : this.isHiddenautocreateBtn
			}),{
				iconCls : 'btn-add',
				text : '增加',
				xtype : 'button',
				scope : this,
				hidden : this.isHiddenAddBtn,
				handler : this.createRs
			}, new Ext.Toolbar.Separator({
				hidden : this.isHiddenAddBtn
			}), {
				iconCls : 'btn-del',
				text : '删除',
				xtype : 'button',
				scope : this,
				hidden : this.isHiddenDelBtn,
				handler : this.removeSelRs
			}, new Ext.Toolbar.Separator({
				hidden : this.isHiddenDelBtn
			}), {
				iconCls : 'btn-details',
				text : '导出Excel',
				xtype : 'button',
				hidden : this.isHiddenExcel,
				scope : this,
				handler : function() {
					this.toExcel();
				}
			}, new Ext.Toolbar.Separator({
				hidden : this.isHiddenExcel
			}),{
				iconCls : 'btn-reset',
				text : '手动对账',
				xtype : 'button',
				scope : this,
				hidden : this.isHiddenResBtn1,
				handler : this.openliushuiwin
			}]
		});
		var summary = new Ext.ux.grid.GridSummary();
		function totalMoney(v, params, data) {
			return '总计(元)';
		}
		var isThisSuperviseRecord = this.isThisSuperviseRecord;
		var isThisEarlyPaymentRecord = this.isThisEarlyPaymentRecord;
		var isThisAlterAccrualRecord = this.isThisAlterAccrualRecord;
		this.datafield=new Ext.form.DateField( {
					format : 'Y-m-d',
					allowBlank : false,
					readOnly:this.allReadOnly
				})
		var fundTypenodekey=this.fundTypenodekey; 
		this.comboType= new DicIndepCombo({
					editable : false,
					readOnly:this.allReadOnly,
					lazyInit : false,
					forceSelection : false,
					nodeKey : fundTypenodekey
				})
		this.comboType.store.reload();
		var params1={
					     flag1:1,
					     businessType:this.businessType,
					     projectId:this.projectId
					};
		this.gridPanel = new HT.EditorGridPanel( {
			border : false,
			clicksToEdit : 1,
			showPaging : false,
			autoHeight : true,
			autoLoad : false, 
         	plugins: [summary],
         	bbar : false,
			tbar : this.hiddenbbar==true?null:this.topbar,
			url :__ctxPath + '/creditFlow/finance/getListLoanTrialSlFundIntent.do',	
			baseParams :params1,
			fields : [{
				name : 'fundIntentId'
			},{
				name : 'fundType'
			}, {
				name : 'fundTypeName'
			}, {
				name : 'intentDate'
			}, {
				name : 'payMoney'
			}, {
				name : 'incomeMoney'
			},{
				name : 'interestStarTime'
			}, {
				name : 'interestDays'
			},{
				name : 'interestEndTime'
			},{
				name : 'payintentPeriod'
			},{
				name : 'factDate'
			},{
				name : 'afterMoney'
			}, {
				name : 'notMoney'
			}, {
				name : 'accrualMoney'
			}, {
				name : 'isValid'
			}, {
				name : 'flatMoney'
			}, {
				name : 'overdueRate'
			}, {
				name : 'isOverdue'
			}, {
				name : 'companyId'
			},{
			    name:'businessType'
			},{
				name :'slSuperviseRecordId'
			}],
			columns : [{
				dataIndex : 'fundIntentId',
				hidden : true
			},{
				header : '资金类型',
				dataIndex : 'fundType',
				editor : this.comboType,
				width : 107,
				summaryType : 'count',
				summaryRenderer : totalMoney,
				renderer : function(value, metaData, record, rowIndex,colIndex, store) {
					var objcom = this.editor;
					var objStore = objcom.getStore();
					var idx = objStore.find("dicKey", value);
					var flag1 = 0; // incomeMoney
					if (record.data.payMoney != 0) { // payMoney
						flag1 = 1;
					}
					if (idx != "-1") {
						if (isThisSuperviseRecord != null || isThisEarlyPaymentRecord != null || isThisAlterAccrualRecord != null) {
							if ((flag1 == 1) || (flag1 == 0 && record.data.incomeMoney == record.data.afterMoney)) {
								
							} else {
								if (record.data.isValid == 1) {
									return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + objStore.getAt(idx).data.itemValue + "</font>"
								} 
							}
						}
						if (record.data.isValid == 1) {
							return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + objStore.getAt(idx).data.itemValue + "</font>"
						} else {
							if (record.data.notMoney == 0) {
								return '<font style="color:gray">' + objStore.getAt(idx).data.itemValue + "</font>";
							}
							if (record.data.isOverdue == "是" && flag1 != 1) {
								return '<font style="color:red">' + objStore.getAt(idx).data.itemValue + "</font>";
							}
							if (record.data.afterMoney == 0) {
								return objStore.getAt(idx).data.itemValue;
							}
							return objStore.getAt(idx).data.itemValue;
						}
					} else {
						/*if (record.data.fundTypeName == "") {
							record.data.fundTypeName = value
						} else {
							var x = store.getModifiedRecords();
							if (x != null && x != "") {
								record.data.fundTypeName = value
							}
						}*/
						if (isThisSuperviseRecord != null || isThisEarlyPaymentRecord != null || isThisAlterAccrualRecord != null) {
							if ((flag1 == 1)|| (flag1 == 0 && record.data.incomeMoney == record.data.afterMoney)) {
								
							} else {
								if (record.data.isValid == 1) {
									return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + record.get("fundTypeName") + "</font>"
								} else {
									return  record.get("fundTypeName")/*'<font style="font-style:italic;text-decoration: line-through">'
											+ record.get("fundTypeName")
											+ "</font>"*/
								}
							}
						}
						if (record.data.isValid == 1) {
							return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + record.get("fundTypeName") + "</font>"
						} else {
							if (record.data.notMoney == 0) {
								return '<font style="color:gray">' + record.get("fundTypeName") + "</font>";
							}
							if (record.data.isOverdue == "是" && flag1 != 1) {
								return '<font style="color:red">' + record.get("fundTypeName") + "</font>";
							}
							if (record.data.afterMoney == 0) {
								return record.get("fundTypeName");
							}
							return record.get("fundTypeName");
						}
					}
				}
			},{
				header : '期数',
				dataIndex : 'payintentPeriod',
				editor : new Ext.form.ComboBox({
				    triggerAction: 'all',
				    readOnly : this.isHidden1,
				    store: new Ext.data.SimpleStore({
						autoLoad : true,
						url : __ctxPath+ '/project/getPayIntentPeriodSlSmallloanProject.do',
						fields : ['itemId', 'itemName'],
						baseParams : {payintentPeriod:typeof(this.object)!='undefined'?this.object.getCmpByName('flLeaseFinanceProject.payintentPeriod').getValue():0,projectId:this.projectId,businessType:this.businessType}
					}),
				    valueField: 'itemId',
				    displayField: 'itemName'
		
				}),
				renderer : function(value, metaData, record, rowIndex,colIndex, store){
					if (record.data.isValid == 1) {
						if(null==record.data.slSuperviseRecordId ){
							return '<font style="font-style:italic;text-decoration: line-through;color:gray">第'+value+'期</font>';
						}else if(null!=record.data.slSuperviseRecordId){
							return '<font style="font-style:italic;text-decoration: line-through;color:gray">展期第'+value+'期</font>'
						}else{
							if(null!=value){
								return '<font style="font-style:italic;text-decoration: line-through;color:gray">'+value+'</font>'
							}
						}
					}else{
						if (record.data.notMoney == 0) {
							if(null==record.data.slSuperviseRecordId ){
								return '<font style="color:gray">第'+value+'期</font>';
							}else if(null!=record.data.slSuperviseRecordId){
								return '<font style="color:gray">展期第'+value+'期</font>'
							}else{
								if(null!=value){
									return '<font style="color:gray">'+value+'</font>'
								}
							}
						}else{
							if(null==record.data.slSuperviseRecordId ){
								return '第'+value+'期';
							}else if(null!=record.data.slSuperviseRecordId){
								return '展期第'+value+'期'
							}else{
								if(null!=value){
									return value
								}
							}
						}
					}
				}
			}, {
				header : '计息开始日期',
				dataIndex : 'interestStarTime',
				format : 'Y-m-d',
				editor :this.datafield,
				renderer : function(value, metaData, record, rowIndex, colIndex, store) {
					var flag1 = 0; // incomeMoney
					if (record.data.payMoney != 0) { // payMoney
						flag1 = 1;
					}
					var v;
					try {
						if (typeof(value) == "string") {
							v = value;
							//return v;
						}else{
							v= Ext.util.Format.date(value, 'Y-m-d');
						}
					} catch (err) {
						v = value;
						return v;
					}
					if (isThisSuperviseRecord != null || isThisEarlyPaymentRecord != null || isThisAlterAccrualRecord != null) {
						if ((flag1 == 1) || (flag1 == 0 && record.data.incomeMoney == record.data.afterMoney)) {
							
						} else {
							if (record.data.isValid == 1) {
								return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + v + "</font>";
							} 
						}
					}
					if (record.data.isValid == 1) {
						return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + v + "</font>";
					} else {
						if (record.data.notMoney == 0) {
							return '<font style="color:gray">' + v + "</font>";
						}
						if (record.data.isOverdue == "是" && flag1 != 1) {
							return '<font style="color:red">' + v + "</font>";
						}
						if (record.data.afterMoney == 0) {
							return v;
						}
						return v;
					}
				}
			}, {
				header : '计息结束日期',
				dataIndex : 'interestEndTime',
				format : 'Y-m-d',
				editor :this.datafield,
				renderer : function(value, metaData, record, rowIndex, colIndex, store) {
					var flag1 = 0; // incomeMoney
					if (record.data.payMoney != 0) { // payMoney
						flag1 = 1;
					}
					var v;
					try {
						if (typeof(value) == "string") {
							v = value;
							//return v;
						}else{
							v= Ext.util.Format.date(value, 'Y-m-d');
						}
					} catch (err) {
						v = value;
						return v;
					}
					if (isThisSuperviseRecord != null || isThisEarlyPaymentRecord != null || isThisAlterAccrualRecord != null) {
						if ((flag1 == 1) || (flag1 == 0 && record.data.incomeMoney == record.data.afterMoney)) {
							
						} else {
							if (record.data.isValid == 1) {
								return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + v + "</font>";
							} 
						}
					}
					if (record.data.isValid == 1) {
						return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + v + "</font>";
					} else {
						if (record.data.notMoney == 0) {
							return '<font style="color:gray">' + v + "</font>";
						}
						if (record.data.isOverdue == "是" && flag1 != 1) {
							return '<font style="color:red">' + v + "</font>";
						}
						if (record.data.afterMoney == 0) {
							return v;
						}
						return v;
					}
				}
			}, {
				header : '计息天数',
				dataIndex : 'interestDays',
				summaryType: 'sum',
				width :50,
				editor : {
					xtype : 'numberfield',
					readOnly:true
				},
				renderer : function(value,metaData, record,rowIndex, colIndex,store){
					var flag1 = 0; // incomeMoney
					if (record.data.payMoney != 0) { // payMoney
						flag1 = 1;
					}
					if(value != null){
						if (record.data.isValid == 1) {
							return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + value + "天</font>";
						} else {
							if (record.data.notMoney == 0) {
								return '<font style="color:gray">' + value + "天</font>";
							}
							if (record.data.isOverdue == "是" && flag1 != 1) {
								return '<font style="color:red">' + value + "天</font>";
							}
							if (record.data.afterMoney == 0) {
								return value+"天";
							}
							return value+"天";
						}
					}
				}
			}, {
				header : '计划到账日',
				dataIndex : 'intentDate',
				format : 'Y-m-d',
				editor : this.datafield,
				width : 80,
				renderer : function(value, metaData, record, rowIndex, colIndex, store) {
					var flag1 = 0; // incomeMoney
					if (record.data.payMoney != 0) { // payMoney
						flag1 = 1;
					}
					var v;
					try {
						if (typeof(value) == "string") {
							v = value;
							//return v;
						}else{
							v= Ext.util.Format.date(value, 'Y-m-d');
						}
					} catch (err) {
						v = value;
						return v;
					}
					if (isThisSuperviseRecord != null || isThisEarlyPaymentRecord != null || isThisAlterAccrualRecord != null) {
						if ((flag1 == 1) || (flag1 == 0 && record.data.incomeMoney == record.data.afterMoney)) {
							
						} else {
							if (record.data.isValid == 1) {
								return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + v + "</font>";
							} 
						}
					}
					if (record.data.isValid == 1) {
						return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + v + "</font>";
					} else {
						if (record.data.notMoney == 0) {
							return '<font style="color:gray">' + v + "</font>";
						}
						if (record.data.isOverdue == "是" && flag1 != 1) {
							return '<font style="color:red">' + v + "</font>";
						}
						if (record.data.afterMoney == 0) {
							return v;
						}
						return v;
					}
				}
			},{
				header : '实际到账日',
				dataIndex : 'factDate',
				format : 'Y-m-d',
				hidden : this.isHiddenMoney,
				// editor :this.datafield1,
				width : 80,
				renderer : function(value, metaData, record, rowIndex, colIndex, store) {
					var flag1 = 0; // incomeMoney
					if (record.data.payMoney != 0) { // payMoney
						flag1 = 1;
					}
					var v;
					try {
						if (typeof(value) == "string") {
							v = value;
					//		return v;
						} else{
							v= Ext.util.Format.date(value, 'Y-m-d');
						}
					} catch (err) {
						v = value;
						return v;
					}
					if (v != null) {
						if (isThisSuperviseRecord != null || isThisEarlyPaymentRecord != null || isThisAlterAccrualRecord != null) {
							if ((flag1 == 1) || (flag1 == 0 && record.data.incomeMoney == record.data.afterMoney)) {
								
							} else {
								if (record.data.isValid == 1) {
									return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + v + "</font>";
								} 
							}
						}
						if (record.data.isValid == 1) {
							return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + v + "</font>";
						} else {
							if (record.data.notMoney == 0) {
								return '<font style="color:gray">' + v + "</font>";
							}
							if (record.data.isOverdue == "是" && flag1 != 1) {
								return '<font style="color:red">' + v + "</font>";
							}
							if (record.data.afterMoney == 0) {
								return v;
							}
							return v;
						}
					} else {
						return "";
					}
				}
			}, {
				header : '计划收入金额',
				dataIndex : 'incomeMoney',
				summaryType : 'sum',
				align : 'right',
				editor : {
					xtype : 'numberfield',
					allowBlank : false,
					readOnly : this.isHidden1
				},
				renderer : function(value, metaData, record, rowIndex,colIndex, store) {
					var flag1 = 0; // incomeMoney
					if (record.data.payMoney != 0) { // payMoney
						flag1 = 1;
					}
					if (isThisSuperviseRecord != null || isThisEarlyPaymentRecord != null || isThisAlterAccrualRecord != null) {
						if ((flag1 == 1)
								|| (flag1 == 0 && record.data.incomeMoney == record.data.afterMoney)) {
						} else {
							if (record.data.isValid == 1) {
								return '<font style="font-style:italic;text-decoration: line-through;color:gray">'+ Ext.util.Format.number(value,',000,000,000.00') + "元</font>"
							} 
						}
					}
					if (record.data.isValid == 1) {
						return '<font style="font-style:italic;text-decoration: line-through;color:gray">'+ Ext.util.Format.number(value,',000,000,000.00') + "元</font>"
					} else {
						if (record.data.notMoney == 0) {
							return '<font style="color:gray">'+ Ext.util.Format.number(value,',000,000,000.00') + "元" + "</font>";
						}
						if (record.data.isOverdue == "是" && flag1 != 1) {
							return '<font style="color:red">'+ Ext.util.Format.number(value,',000,000,000.00') + "元"+ "</font>";
						}
						if (record.data.afterMoney == 0) {
							return Ext.util.Format.number(value,',000,000,000.00')+ "元"
						}
						return Ext.util.Format.number(value, ',000,000,000.00')+ "元";
					}
				}
			}, {
				header : '计划支出金额',
				dataIndex : 'payMoney',
				align : 'right',
				summaryType : 'sum',
				editor : {
					xtype : 'numberfield',
					allowBlank : false,
					readOnly : this.isHidden1
				},
				renderer : function(value, metaData, record, rowIndex, colIndex, store) {
					var flag1 = 0; // incomeMoney
					if (record.data.payMoney != 0) { // payMoney
						flag1 = 1;
					}
					if (isThisSuperviseRecord != null || isThisEarlyPaymentRecord != null || isThisAlterAccrualRecord != null) {
						if ((flag1 == 1) || (flag1 == 0 && record.data.incomeMoney == record.data.afterMoney)) {
							
						} else {
							if (record.data.isValid == 1) {
								return '<font style="font-style:italic;text-decoration: line-through;color:gray">'+ Ext.util.Format.number(value,',000,000,000.00') + "元</font>"
							}
						}
					}
					if (record.data.isValid == 1) {
						return '<font style="font-style:italic;text-decoration: line-through;color:gray">'+ Ext.util.Format.number(value,',000,000,000.00') + "元</font>"
					} else {
						if (record.data.notMoney == 0) {
							return '<font style="color:gray">'+ Ext.util.Format.number(value,',000,000,000.00') + "元"+ "</font>";
						}
						if (record.data.isOverdue == "是" && flag1 != 1) {
							return '<font style="color:red">'+ Ext.util.Format.number(value,',000,000,000.00') + "元"+ "</font>";
						}
						if (record.data.afterMoney == 0) {
							return Ext.util.Format.number(value,',000,000,000.00')+ "元";
						}
						return Ext.util.Format.number(value, ',000,000,000.00')+ "元";
					}
				}
			},{
				header : '已对账金额',
				dataIndex : 'afterMoney',
				align : 'right',
				summaryType : 'sum',
				hidden : this.isHiddenMoney,
				renderer : function(value, metaData, record, rowIndex, colIndex, store) {
					var flag1 = 0; // incomeMoney
					if (record.data.payMoney != 0) { // payMoney
						flag1 = 1;
					}
					if (value != null) {
						if (isThisSuperviseRecord != null || isThisEarlyPaymentRecord != null || isThisAlterAccrualRecord != null) {
							if ((flag1 == 1) || (flag1 == 0 && record.data.incomeMoney == record.data.afterMoney)) {
								
							} else {
								if (record.data.isValid == 1) {
									return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + Ext.util.Format.number(value, ',000,000,000.00') + "元</font>"
								} 
							}
						}
						if (record.data.isValid == 1) {
							return '<font style="font-style:italic;text-decoration: line-through;color:gray">' + Ext.util.Format.number(value, ',000,000,000.00') + "元</font>"
						} else {
							if (record.data.notMoney == 0) {
								return '<font style="color:gray">' + Ext.util.Format.number(value, ',000,000,000.00') + "元" + "</font>";
							}
							if (record.data.isOverdue == "是" && flag1 != 1) {
								return '<font style="color:red">' + Ext.util.Format.number(value, ',000,000,000.00') + "元" + "</font>";
							}
							if (record.data.afterMoney == 0) {
								return Ext.util.Format.number(value, ',000,000,000.00') + "元";
							}
							return Ext.util.Format.number(value, ',000,000,000.00') + "元"
						}
					} else
						return "";
				}
			}]
		});
		
		
	},// end of the initComponents()

	createRs : function() {
		var  parentObject = this.ownerCt.get(0);
		var payintentPeriod  = parentObject.getCmpByName(this.defineForm+'.payintentPeriod').getValue();  //贷款期限
		this.datafield.setValue('');
		var newRecord = this.gridPanel.getStore().recordType;
		var newData = new newRecord({
			fundIntentId : '',
			fundType : '',
			payMoney : 0,
			incomeMoney : 0,
			flatMoney : 0,
			afterMoney : 0,
			intentDate : new Date(),
			factDate : '',
			payintentPeriod:payintentPeriod
		});
		var combox=new Ext.form.ComboBox({
		    triggerAction: 'all',
		    store: new Ext.data.SimpleStore({
				autoLoad : true,
				url : __ctxPath+ '/common/loanTrial/getPayIntentPeriodLoanTrial.do',
				fields : ['itemId', 'itemName'],
				baseParams : {payintentPeriod:payintentPeriod}
			}),
		    valueField: 'itemId',
		    displayField: 'itemName'

		})
		this.gridPanel.getColumnModel().setEditor(1,combox);		
		this.gridPanel.stopEditing();
		this.gridPanel.getStore().insert(this.gridPanel.getStore().getCount(),
				newData);
		this.gridPanel.getView().refresh();
		this.gridPanel.getSelectionModel().selectRow((this.gridPanel.getStore()
				.getCount() - 1));
		this.gridPanel.startEditing(0, 0);
	},
	removeSelRs : function() {
		var gridPanel = this.gridPanel;
		var projId = this.projectId;
		var businessType = this.businessType;
		var selRs = gridPanel.getSelectionModel().getSelections();
		if (selRs <= 0) {
			Ext.ux.Toast.msg('操作信息', '请选择要删除的记录');
			return false;
		};
		var deleteFun = function(url, prame, sucessFun, i, j) {
			Ext.Ajax.request({
				url : url,
				method : 'POST',
				success : function(response) {
					if (response.responseText.trim() == '{success:true}') {
						if (i == (j - 1)) {
							Ext.ux.Toast.msg('操作信息', '删除成功!');
						}
						sucessFun();

					} else if (response.responseText.trim() == '{success:false}') {
						Ext.ux.Toast.msg('状态', '删除失败!');
					}
				},
				params : prame
			});
		};
		Ext.Msg.confirm("提示!", '确定要删除吗？', function(btn) {
			if (btn == "yes") {
				var s = gridPanel.getSelectionModel().getSelections();
				for (var i = 0; i < s.length; i++) {
					var row = s[i];
					if (row.data.fundIntentId == null
							|| row.data.fundIntentId == '') {
						gridPanel.getStore().remove(row);
					} else {
						deleteFun(__ctxPath
								+ '/creditFlow/finance/deleteSlFundIntent.do',
								{
									fundIntentId : row.data.fundIntentId,
									projectId : projId,
									businessType : this.businessType
								}, function() {
									gridPanel.getStore().remove(row);
									gridPanel.getStore().reload();
								}, i, s.length);
					}
				}
			}
		});
	},
	autocreate : function() {
		var parentObject = this.ownerCt.ownerCt.ownerCt.get(0);
		var gridPanel1 = this.gridPanel;
		var	startDate = null;//贷款开始日期
		var projectMoney = null;  //贷款金额
		var payIntentPeriod = null;  //贷款期限
		var intentDate = null;  //贷款截至日期
		var endDate = null;//贷款结束日期
		var yearModel = null;//月模型
		var monthModel = null;//年模型
		var headTailModel = null;//还款模型
		var accrualtype = null;//还款方式
		var payaccrualType = null;//还款周期 
		var dayOfEveryPeriod = null;//自定义周期天数
		var isPreposePayAccrual = null;//前置付息
		var isInterestByOneTime = null;//一次性支付全部利息
		var isStartDatePay = null;//计划还款日类型
		var payintentPerioDate = null;//固定日
		var yearAccrualRate = null;//年化利率
		var fixedAccrualRate = null;//利息固定金额
		var yearManagementConsultingOfRate = null;//管理咨询费率
		var fixedManagementConsultingOfRate = null;//管理费固定金额
		var yearFinanceServiceOfRate = null;//财务服务费率
		var fixedFinanceServiceOfRate = null;//服务费固定金额
		var serviceChargeOfRate = null;//手续费率
		var chargeType = null;//手续费收取方式   1:前置  2:后置
		var  afterMoney=null; // 已对账金额
		if(parentObject){
			startDate = parentObject.getCmpByName(this.defineForm+'.startDate').getValue();//贷款开始日期
			projectMoney = parentObject.getCmpByName(this.defineForm+'.projectMoney').getValue();  //贷款金额
			payintentPeriod = parentObject.getCmpByName(this.defineForm+'.payintentPeriod').getValue();  //贷款期限
			intentDate = parentObject.getCmpByName(this.defineForm+'.intentDate').getValue();  //贷款截至日期
			yearModel = parentObject.getCmpByName(this.defineForm+'.yearModel').getValue();//年华
			monthModel = parentObject.getCmpByName(this.defineForm+'.monthModel').getValue();//月息
			headTailModel = parentObject.getCmpByName(this.defineForm+'.headTailModel').getValue();//头尾
			accrualtype = parentObject.getCmpByName(this.defineForm+'.accrualtype').getValue();//还款方式
			payaccrualType = parentObject.getCmpByName(this.defineForm+'.payaccrualType').getValue();//还款周期 
			dayOfEveryPeriod = parentObject.getCmpByName(this.defineForm+'.dayOfEveryPeriod').getValue();//自定义周期天数
			isPreposePayAccrual = parentObject.getCmpByName(this.defineForm+'.isPreposePayAccrual').getValue();//前置付息
			isInterestByOneTime = parentObject.getCmpByName(this.defineForm+'.isInterestByOneTime').getValue();//一次性支付全部利息
			isStartDatePay = parentObject.getCmpByName(this.defineForm+'.isStartDatePay').getValue();//计划还款日类型
			payintentPerioDate = parentObject.getCmpByName(this.defineForm+'.payintentPerioDate').getValue();//固定日
			yearAccrualRate = parentObject.getCmpByName(this.defineForm+'.yearAccrualRate').getValue();//年化利率
			fixedAccrualRate = parentObject.getCmpByName(this.defineForm+'.fixedAccrualRate').getValue();  //利息固定金额
			yearManagementConsultingOfRate = parentObject.getCmpByName(this.defineForm+'.yearManagementConsultingOfRate').getValue();//管理咨询费率
			fixedManagementConsultingOfRate = parentObject.getCmpByName(this.defineForm+'.fixedManagementConsultingOfRate').getValue();  //管理费固定金额
			yearFinanceServiceOfRate = parentObject.getCmpByName(this.defineForm+'.yearFinanceServiceOfRate').getValue();//财务服务费率
			fixedFinanceServiceOfRate = parentObject.getCmpByName(this.defineForm+'.fixedFinanceServiceOfRate').getValue();  //服务费固定金额
			serviceChargeOfRate = parentObject.getCmpByName(this.defineForm+'.serviceChargeOfRate').getValue();  //手续费率
			chargeType = parentObject.getCmpByName(this.defineForm+'.chargeType').getValue();  //手续费收取方式   1:前置  2:后置
			afterMoney=0.00;//查询要用到这个金额 不传后台aftermoney 是null 就查不出来还款催收数据
		}
		var message = "";
		if (projectMoney == "" || projectMoney == null) {
			message += "本金总额、";
		}
		if (payintentPeriod == "" || payintentPeriod == null) {
			message += "贷款期数、";
		}
		if (startDate == "" || startDate == null) {
			message += "放款日期、";
		}
		if (intentDate == "" || intentDate == null) {
			message += "到期日期、";
		}
		if (yearModel == "" || yearModel == null) {
			message += "年模型、";
		}
		if (monthModel == "" || monthModel == null) {
			message += "月模型、";
		}
		if ((headTailModel == "" || headTailModel == null)&&headTailModel!=0) {
			message += "还款模型、";
		}
		if (accrualtype == "" || accrualtype == null) {
			message += "还款方式、";
		}
		if (payaccrualType == "" || payaccrualType == null) {
			message += "还款周期 、";
		}
		if (isStartDatePay == "" || isStartDatePay == null) {
			message += "计划还款日类型、";
		}else{
			if (isStartDatePay == 1) {
				if (payintentPerioDate == "" || payintentPerioDate == null) {
					message += "固定日、";
				}
			}
		}
		if (message != "") {
			Ext.MessageBox.show({
				title : '操作信息',
				msg : message + '不能为空',
				buttons : Ext.MessageBox.OK,
				icon : 'ext-mb-error'
			});
			return null;
		}
		var params1 = {
			'bpFundIntentInitParameter.startDate' : startDate,
			'bpFundIntentInitParameter.projectMoney' : projectMoney,
			'bpFundIntentInitParameter.intentDate' : intentDate,
			'bpFundIntentInitParameter.payintentPeriod' : payintentPeriod,
			'bpFundIntentInitParameter.businessType' : 'SmallLoan',
			'bpFundIntentInitParameter.yearModel' :yearModel,//月模型
			'bpFundIntentInitParameter.monthModel' :monthModel,//年模型
			'bpFundIntentInitParameter.headTailModel' :headTailModel,//还款模型
			'bpFundIntentInitParameter.accrualtype' :accrualtype,//还款方式
			'bpFundIntentInitParameter.payaccrualType' :payaccrualType,//还款周期 
			'bpFundIntentInitParameter.dayOfEveryPeriod' :dayOfEveryPeriod,//自定义周期天数
			'bpFundIntentInitParameter.isPreposePayAccrual' :isPreposePayAccrual,//前置付息
			'bpFundIntentInitParameter.isInterestByOneTime' :isInterestByOneTime,//一次性支付全部利息
			'bpFundIntentInitParameter.isStartDatePay' :isStartDatePay,//计划还款日类型
			'bpFundIntentInitParameter.payintentPerioDate' :payintentPerioDate,//固定日
			'bpFundIntentInitParameter.yearAccrualRate' :yearAccrualRate,//年化利率
			'bpFundIntentInitParameter.fixedAccrualRate' :fixedAccrualRate,//利息固定金额
			'bpFundIntentInitParameter.yearManagementConsultingOfRate' :yearManagementConsultingOfRate,//管理咨询费率
			'bpFundIntentInitParameter.fixedManagementConsultingOfRate' :fixedManagementConsultingOfRate,//管理费固定金额
			'bpFundIntentInitParameter.yearFinanceServiceOfRate' :yearFinanceServiceOfRate,//财务服务费率
			'bpFundIntentInitParameter.fixedFinanceServiceOfRate' :fixedFinanceServiceOfRate,//服务费固定金额
			'bpFundIntentInitParameter.serviceChargeOfRate' :serviceChargeOfRate,//手续费率
			'bpFundIntentInitParameter.chargeType' :chargeType,//手续费收取方式   1:前置  2:后置
			'bpFundIntentInitParameter.afterMoney' :afterMoney//已对账金额
		}
		var gridstore = gridPanel1.getStore();
		gridstore.on('beforeload', function(gridstore, o) {
					Ext.apply(o.params, params1);
				});
		var url = __ctxPath+ "/common/loanTrial/createFundListLoanTrial.do";
		gridstore.proxy.conn.url = url;
		gridPanel1.getStore().reload();
		gridstore.on('load', function(gridstore, o) {
			var vRecords = gridstore.getRange(0,gridstore.getCount());
			var vCount = vRecords.length; // 得到记录长度
			if (vCount > 0) {/*
				
				var interestMoney=0;
				var consultationMoney=0;
				var serviceMoney=0;
				var allMoney=0;
				for ( var i = 0; i < vCount; i++) {
					 if(vRecords[i].data.fundType=='loanInterest'){
					 	interestMoney=interestMoney+vRecords[i].data.incomeMoney;
					 }
					 if(vRecords[i].data.fundType=='consultationMoney'){
						 consultationMoney=consultationMoney+vRecords[i].data.incomeMoney;
					 }
					 if(vRecords[i].data.fundType=='serviceMoney'){
					 	serviceMoney=serviceMoney+vRecords[i].data.incomeMoney;
					 }
				}
				allMoney = parseFloat(interestMoney)+parseFloat(consultationMoney)+parseFloat(serviceMoney);
				if(parentObject.getCmpByName('sumAllAccrualRate')){
					parentObject.getCmpByName('sumAllAccrualRate').setValue(Ext.util.Format.number(interestMoney, '0,000.00'));
				}
				if(parentObject.getCmpByName('sumAllManagementConsultingOfRate')){
					parentObject.getCmpByName('sumAllManagementConsultingOfRate').setValue(Ext.util.Format.number(consultationMoney, '0,000.00'));
				}
				if(parentObject.getCmpByName('sumAllFinanceServiceOfRate')){
					parentObject.getCmpByName('sumAllFinanceServiceOfRate').setValue(Ext.util.Format.number(serviceMoney, '0,000.00'));
				}
				if(parentObject.getCmpByName('sumAllRateMoney')){
					parentObject.getCmpByName('sumAllRateMoney').setValue(Ext.util.Format.number(allMoney, '0,000.00'));
				}
			*/}
		});
	},
	autocreatePrincipal : function() {
		var  parentObject = this.ownerCt.get(0);
		var gridPanel1 = this.gridPanel;
		var	startDate = null;//贷款开始日期
		var projectMoney = null;  //贷款金额
		var payIntentPeriod = null;  //贷款期限
		var intentDate = null;  //贷款截至日期
		var endDate = null;//贷款结束日期
		var yearModel = null;//月模型
		var monthModel = null;//年模型
		var headTailModel = null;//还款模型
		var accrualtype = null;//还款方式
		var payaccrualType = null;//还款周期 
		var dayOfEveryPeriod = null;//自定义周期天数
		var isPreposePayAccrual = null;//前置付息
		var isInterestByOneTime = null;//一次性支付全部利息
		var isStartDatePay = null;//计划还款日类型
		var payintentPerioDate = null;//固定日
		var yearAccrualRate = null;//年化利率
		var fixedAccrualRate = null;//利息固定金额
		var yearManagementConsultingOfRate = null;//管理咨询费率
		var fixedManagementConsultingOfRate = null;//管理费固定金额
		var yearFinanceServiceOfRate = null;//财务服务费率
		var fixedFinanceServiceOfRate = null;//服务费固定金额
		var payaccrualTypePayPrincipal = null;//本金还款周期 
		var dayOfEveryPeriodPayPrincipal = null;//本金自定义周期天数
		if(parentObject){
			startDate = parentObject.getCmpByName(this.defineForm+'.startDate').getValue();//贷款开始日期
			projectMoney = parentObject.getCmpByName(this.defineForm+'.projectMoney').getValue();  //贷款金额
			payintentPeriod = parentObject.getCmpByName(this.defineForm+'.payintentPeriod').getValue();  //贷款期限
			intentDate = parentObject.getCmpByName(this.defineForm+'.intentDate').getValue();  //贷款截至日期
			yearModel = parentObject.getCmpByName(this.defineForm+'.yearModel').getValue();//年华
			monthModel = parentObject.getCmpByName(this.defineForm+'.monthModel').getValue();//月息
			headTailModel = parentObject.getCmpByName(this.defineForm+'.headTailModel').getValue();//头尾
			accrualtype = parentObject.getCmpByName(this.defineForm+'.accrualtype').getValue();//还款方式
			payaccrualType = parentObject.getCmpByName(this.defineForm+'.payaccrualType').getValue();//还款周期 
			dayOfEveryPeriod = parentObject.getCmpByName(this.defineForm+'.dayOfEveryPeriod').getValue();//自定义周期天数
			isPreposePayAccrual = parentObject.getCmpByName(this.defineForm+'.isPreposePayAccrual').getValue();//前置付息
			isInterestByOneTime = parentObject.getCmpByName(this.defineForm+'.isInterestByOneTime').getValue();//一次性支付全部利息
			isStartDatePay = parentObject.getCmpByName(this.defineForm+'.isStartDatePay').getValue();//计划还款日类型
			payintentPerioDate = parentObject.getCmpByName(this.defineForm+'.payintentPerioDate').getValue();//固定日
			yearAccrualRate = parentObject.getCmpByName(this.defineForm+'.yearAccrualRate').getValue();//年化利率
			fixedAccrualRate = parentObject.getCmpByName(this.defineForm+'.fixedAccrualRate').getValue();  //利息固定金额
			yearManagementConsultingOfRate = parentObject.getCmpByName(this.defineForm+'.yearManagementConsultingOfRate').getValue();//管理咨询费率
			fixedManagementConsultingOfRate = parentObject.getCmpByName(this.defineForm+'.fixedManagementConsultingOfRate').getValue();  //管理费固定金额
			yearFinanceServiceOfRate = parentObject.getCmpByName(this.defineForm+'.yearFinanceServiceOfRate').getValue();//财务服务费率
			fixedFinanceServiceOfRate = parentObject.getCmpByName(this.defineForm+'.fixedFinanceServiceOfRate').getValue();  //服务费固定金额
			payaccrualTypePrincipal = parentObject.getCmpByName(this.defineForm+'.payaccrualTypePrincipal').getValue();//本金还款周期 
			dayOfEveryPeriodPrincipal = parentObject.getCmpByName(this.defineForm+'.dayOfEveryPeriodPrincipal').getValue();//本金自定义周期天数
		}
		var message = "";
		if (projectMoney == "" || projectMoney == null) {
			message += "本金总额、";
		}
		if (payintentPeriod == "" || payintentPeriod == null) {
			message += "贷款期数、";
		}
		if (startDate == "" || startDate == null) {
			message += "放款日期、";
		}
		if (intentDate == "" || intentDate == null) {
			message += "到期日期、";
		}
		if (yearModel == "" || yearModel == null) {
			message += "年模型、";
		}
		if (monthModel == "" || monthModel == null) {
			message += "月模型、";
		}
		if ((headTailModel == "" || headTailModel == null)&&headTailModel!=0) {
			message += "还款模型、";
		}
		if (accrualtype == "" || accrualtype == null) {
			message += "还款方式、";
		}
		if (payaccrualType == "" || payaccrualType == null) {
			message += "还款周期 、";
		}
		if (isStartDatePay == "" || isStartDatePay == null) {
			message += "计划还款日类型、";
		}else{
			if (isStartDatePay == 1) {
				if (payintentPerioDate == "" || payintentPerioDate == null) {
					message += "固定日、";
				}
			}
		}
		if (payaccrualTypePrincipal == "" || payaccrualTypePrincipal == null) {
			message += "本金还款周期 、";
		}else{
			if (payaccrualTypePrincipal == "owerPay") {
				if (dayOfEveryPeriodPrincipal == "" || dayOfEveryPeriodPrincipal == null) {
					message += "本金自定义   每期/日、";
				}
			}
		}
		if (message != "") {
			Ext.MessageBox.show({
				title : '操作信息',
				msg : message + '不能为空',
				buttons : Ext.MessageBox.OK,
				icon : 'ext-mb-error'
			});
			return null;
		}
		var params1 = {
			'bpFundIntentInitParameter.startDate' : startDate,
			'bpFundIntentInitParameter.projectMoney' : projectMoney,
			'bpFundIntentInitParameter.intentDate' : intentDate,
			'bpFundIntentInitParameter.payintentPeriod' : payintentPeriod,
			'bpFundIntentInitParameter.businessType' : 'SmallLoan',
			'bpFundIntentInitParameter.yearModel' :yearModel,//月模型
			'bpFundIntentInitParameter.monthModel' :monthModel,//年模型
			'bpFundIntentInitParameter.headTailModel' :headTailModel,//还款模型
			'bpFundIntentInitParameter.accrualtype' :accrualtype,//还款方式
			'bpFundIntentInitParameter.payaccrualType' :payaccrualType,//还款周期 
			'bpFundIntentInitParameter.dayOfEveryPeriod' :dayOfEveryPeriod,//自定义周期天数
			'bpFundIntentInitParameter.isPreposePayAccrual' :isPreposePayAccrual,//前置付息
			'bpFundIntentInitParameter.isInterestByOneTime' :isInterestByOneTime,//一次性支付全部利息
			'bpFundIntentInitParameter.isStartDatePay' :isStartDatePay,//计划还款日类型
			'bpFundIntentInitParameter.payintentPerioDate' :payintentPerioDate,//固定日
			'bpFundIntentInitParameter.yearAccrualRate' :yearAccrualRate,//年化利率
			'bpFundIntentInitParameter.fixedAccrualRate' :fixedAccrualRate,//利息固定金额
			'bpFundIntentInitParameter.yearManagementConsultingOfRate' :yearManagementConsultingOfRate,//管理咨询费率
			'bpFundIntentInitParameter.fixedManagementConsultingOfRate' :fixedManagementConsultingOfRate,//管理费固定金额
			'bpFundIntentInitParameter.yearFinanceServiceOfRate' :yearFinanceServiceOfRate,//财务服务费率
			'bpFundIntentInitParameter.fixedFinanceServiceOfRate' :fixedFinanceServiceOfRate,//服务费固定金额
			'bpFundIntentInitParameter.payaccrualTypePrincipal' :payaccrualTypePrincipal,//本金还款周期 
			'bpFundIntentInitParameter.dayOfEveryPeriodPrincipal' :dayOfEveryPeriodPrincipal,//本金自定义周期天数
			'bpFundIntentInitParameter.principalLendingType' :"rentalCostsPaid",//本金发放类型
			'bpFundIntentInitParameter.principalRepaymentType' :"leasePrincipalRepayment",//本金回收类型
			'bpFundIntentInitParameter.accrualRateType' :"leaseFeeCharging",//利息类型
			'bpFundIntentInitParameter.managementConsultingOfRateType' :"rentalFeeCharging",//管理咨询费类型
			'bpFundIntentInitParameter.managementConsultingOfRateMoney' :100,//管理咨询费金额
			'bpFundIntentInitParameter.isOneManagementConsultingOfRate' :"yes",//是否一次性支付咨询管理费
			'bpFundIntentInitParameter.financeServiceOfRateType' :"marginCollection",//财务服务费类型
			'bpFundIntentInitParameter.financeServiceOfRateMoney' :100,//财务服务费金额
			'bpFundIntentInitParameter.isOneFinanceServiceOfRate' :"yes",//是否一次性支付财务服务费
			'bpFundIntentInitParameter.leaseObjectRetentionFeeMoney' :100//名义留购价
		}


		var gridstore = gridPanel1.getStore();
		gridstore.on('beforeload', function(gridstore, o) {
					Ext.apply(o.params, params1);
				});
		var url = __ctxPath+ "/common/loanTrial/createPrincipalFundListLoanTrial.do";
		gridstore.proxy.conn.url = url;
		gridPanel1.getStore().reload();
		gridstore.on('load', function(gridstore, o) {
			var vRecords = gridstore.getRange(0,gridstore.getCount());
			var vCount = vRecords.length; // 得到记录长度
			if (vCount > 0) {
				var interestMoney=0;
				var consultationMoney=0;
				var serviceMoney=0;
				var allMoney=0;
				for ( var i = 0; i < vCount; i++) {
					 if(vRecords[i].data.fundType=='loanInterest'){
					 	interestMoney=interestMoney+vRecords[i].data.incomeMoney;
					 }
					 if(vRecords[i].data.fundType=='consultationMoney'){
						 consultationMoney=consultationMoney+vRecords[i].data.incomeMoney;
					 }
					 if(vRecords[i].data.fundType=='serviceMoney'){
					 	serviceMoney=serviceMoney+vRecords[i].data.incomeMoney;
					 }
				}
				allMoney = parseFloat(interestMoney)+parseFloat(consultationMoney)+parseFloat(serviceMoney);
				if(parentObject.getCmpByName('sumAllAccrualRate')){
					parentObject.getCmpByName('sumAllAccrualRate').setValue(Ext.util.Format.number(interestMoney, '0,000.00'));
				}
				if(parentObject.getCmpByName('sumAllManagementConsultingOfRate')){
					parentObject.getCmpByName('sumAllManagementConsultingOfRate').setValue(Ext.util.Format.number(consultationMoney, '0,000.00'));
				}
				if(parentObject.getCmpByName('sumAllFinanceServiceOfRate')){
					parentObject.getCmpByName('sumAllFinanceServiceOfRate').setValue(Ext.util.Format.number(serviceMoney, '0,000.00'));
				}
				if(parentObject.getCmpByName('sumAllRateMoney')){
					parentObject.getCmpByName('sumAllRateMoney').setValue(Ext.util.Format.number(allMoney, '0,000.00'));
				}
			}
		});

	},
	toExcelautocreate : function() {
		var  parentObject = this.ownerCt.get(0);
		var gridPanel1 = this.gridPanel
		var	startDate = null;//贷款开始日期
		var projectMoney = null;  //贷款金额
		var payIntentPeriod = null;  //贷款期限
		var intentDate = null;  //贷款截至日期
		var endDate = null;//贷款结束日期
		var yearModel = null;//月模型
		var monthModel = null;//年模型
		var headTailModel = null;//还款模型
		var accrualtype = null;//还款方式
		var payaccrualType = null;//还款周期 
		var dayOfEveryPeriod = null;//自定义周期天数
		var isPreposePayAccrual = null;//前置付息
		var isInterestByOneTime = null;//一次性支付全部利息
		var isStartDatePay = null;//计划还款日类型
		var payintentPerioDate = null;//固定日
		var yearAccrualRate = null;//年化利率
		var yearManagementConsultingOfRate = null;//管理咨询费率
		var yearFinanceServiceOfRate = null;//财务服务费率
		if(parentObject){
			startDate = parentObject.getCmpByName(this.defineForm+'.startDate').getValue();//放款日期
			projectMoney = parentObject.getCmpByName(this.defineForm+'.projectMoney').getValue();  //贷款金额
			payintentPeriod = parentObject.getCmpByName(this.defineForm+'.payintentPeriod').getValue();  //贷款期限
			intentDate = parentObject.getCmpByName(this.defineForm+'.intentDate').getValue();  //还款日期
			yearModel = parentObject.getCmpByName(this.defineForm+'.yearModel').getValue();//年模型
			monthModel = parentObject.getCmpByName(this.defineForm+'.monthModel').getValue();//月模型
			headTailModel = parentObject.getCmpByName(this.defineForm+'.headTailModel').getValue();//还款模型
			accrualtype = parentObject.getCmpByName(this.defineForm+'.accrualtype').getValue();//还款方式
			payaccrualType = parentObject.getCmpByName(this.defineForm+'.payaccrualType').getValue();//还款周期 
			dayOfEveryPeriod = parentObject.getCmpByName(this.defineForm+'.dayOfEveryPeriod').getValue();//自定义周期天数
			isPreposePayAccrual = parentObject.getCmpByName(this.defineForm+'.isPreposePayAccrual').getValue();//前置付息
			isInterestByOneTime = parentObject.getCmpByName(this.defineForm+'.isInterestByOneTime').getValue();//一次性支付全部利息
			isStartDatePay = parentObject.getCmpByName(this.defineForm+'.isStartDatePay').getValue();//计划还款日类型
			payintentPerioDate = parentObject.getCmpByName(this.defineForm+'.payintentPerioDate').getValue();//固定日
			yearAccrualRate = parentObject.getCmpByName(this.defineForm+'.yearAccrualRate').getValue();//年化利率
			yearManagementConsultingOfRate = parentObject.getCmpByName(this.defineForm+'.yearManagementConsultingOfRate').getValue();//管理咨询费率
			yearFinanceServiceOfRate = parentObject.getCmpByName(this.defineForm+'.yearFinanceServiceOfRate').getValue();//财务服务费率
		}
		var message = "";
		if (projectMoney == "" || projectMoney == null) {
			message += "本金总额、";
		}
		if (payintentPeriod == "" || payintentPeriod == null) {
			message += "贷款期数、";
		}
		if (startDate == "" || startDate == null) {
			message += "放款日期、";
		}
		if (intentDate == "" || intentDate == null) {
			message += "到期日期、";
		}
		if (yearModel == "" || yearModel == null) {
			message += "年模型、";
		}
		if (monthModel == "" || monthModel == null) {
			message += "月模型、";
		}
		if ((headTailModel == "" || headTailModel == null)&&headTailModel!=0) {
			message += "还款模型、";
		}
		if (accrualtype == "" || accrualtype == null) {
			message += "还款方式、";
		}
		if (payaccrualType == "" || payaccrualType == null) {
			message += "还款周期 、";
		}
		if (isStartDatePay == "" || isStartDatePay == null) {
			message += "计划还款日类型、";
		}
		if (message != "") {
			Ext.MessageBox.show({
						title : '操作信息',
						msg : message + '不能为空',
						buttons : Ext.MessageBox.OK,
						icon : 'ext-mb-error'
					});
			return null;
		}
		if(startDate!=null&&startDate!=""){
			startDate = startDate.format("Y-m-d");
		}
		if(intentDate!=null&&intentDate!=""){
			intentDate = intentDate.format("Y-m-d");
		}
		window.open(__ctxPath + '/common/loanTrial/toExcelCreateFundListLoanTrial.do?' +
				'bpFundIntentInitParameter.startDate='+startDate +
				'&bpFundIntentInitParameter.projectMoney='+projectMoney +
				'&bpFundIntentInitParameter.intentDate='+intentDate  +
				'&bpFundIntentInitParameter.payintentPeriod='+payintentPeriod +
				'&bpFundIntentInitParameter.businessType="SmallLoan"'+
				'&bpFundIntentInitParameter.yearModel='+yearModel +//月模型
				'&bpFundIntentInitParameter.monthModel='+monthModel +//年模型
				'&bpFundIntentInitParameter.headTailModel='+headTailModel +//还款模型
				'&bpFundIntentInitParameter.accrualtype='+accrualtype +//还款方式
				'&bpFundIntentInitParameter.payaccrualType='+payaccrualType +//还款周期 
				'&bpFundIntentInitParameter.dayOfEveryPeriod='+dayOfEveryPeriod +//自定义周期天数
				'&bpFundIntentInitParameter.isPreposePayAccrual='+isPreposePayAccrual +//前置付息
				'&bpFundIntentInitParameter.isInterestByOneTime='+isInterestByOneTime +//一次性支付全部利息
				'&bpFundIntentInitParameter.isStartDatePay='+isStartDatePay +//计划还款日类型
				'&bpFundIntentInitParameter.payintentPerioDate='+payintentPerioDate +//固定日
				'&bpFundIntentInitParameter.yearAccrualRate='+yearAccrualRate +//年化利率
				'&bpFundIntentInitParameter.yearManagementConsultingOfRate='+yearManagementConsultingOfRate +//管理咨询费率
				'&bpFundIntentInitParameter.yearFinanceServiceOfRate='+yearFinanceServiceOfRate//财务服务费率
				,'_blank');
		
		
	},
	getGridDate : function() {debugger
		var vRecords = this.gridPanel.getStore().getRange(0,
		this.gridPanel.getStore().getCount()); // 得到修改的数据（记录对象）
		var vCount = vRecords.length; // 得到记录长度
		var vDatas = '';
		if (vCount > 0) {
			var st="";
			for ( var i = 0; i < vCount; i++) {
				if(vRecords[i].data.fundType !=null && vRecords[i].data.fundType !=""){
					if(null==vRecords[i].data.afterMoney || vRecords[i].data.afterMoney==0)  {
						st={"fundIntentId":vRecords[i].data.fundIntentId,"fundType":vRecords[i].data.fundType,"incomeMoney":vRecords[i].data.incomeMoney,
						    "payMoney":vRecords[i].data.payMoney,"intentDate":vRecords[i].data.intentDate,"payintentPeriod":vRecords[i].data.payintentPeriod,
						    "interestStarTime":vRecords[i].data.interestStarTime,"interestEndTime":vRecords[i].data.interestEndTime,
						    "interestDays":vRecords[i].data.interestDays,"afterMoney":vRecords[i].data.afterMoney};
						vDatas += Ext.util.JSON.encode(st) + '@';
					}
				}
			}
			vDatas = vDatas.substr(0, vDatas.length - 1);
		}
		return vDatas;
	},
	toExcel : function() {
		var projectId = this.projectId;
		var businessType = this.businessType;
		window.open(__ctxPath + "/creditFlow/finance/downloadSlFundIntent.do?projectId=" + projectId + "&businessType=" + businessType,'_blank');
	},
	openliushuiwin : function() {
		var s = this.gridPanel.getSelectionModel().getSelections();
		if (s <= 0) {
			Ext.ux.Toast.msg('操作信息','请选中记录');
			return false;
		}else if(s.length>1){
			this.manyInntentopenliushuiwin();
			
		}else if(s.length==1){
		   this.oneopenliushuiwin();
		}
	},
	manyInntentopenliushuiwin : function(){
		
		var s = this.gridPanel.getSelectionModel().getSelections();
		if (s <= 0) {
			Ext.ux.Toast.msg('操作信息','请选中记录');
			return false;
		}else{
	    var a=0;
	    var b=0;
	    var sumnotMoney=0;
	    for(var i=0;i<s.length;i++){
	    	if(s[i].data.payMoney >0)
	    	a++;
	    	if(s[i].data.incomeMoney >0)
		    b++;
	    	sumnotMoney=sumnotMoney+s[i].data.notMoney;
	    }
	    if(a>0 && b>0){
	    	Ext.ux.Toast.msg('操作信息','请选中的记录支出保持一致');
			return false;
	    	
	    }
	    
			var ids = $getGdSelectedIds(this.gridPanel,'fundIntentId');
			var	record=s[0];
			var flag=0;            //incomeMoney
		     if(record.data.payMoney !=0){   //payMoney
		     	flag=1;
		     } 
		     var count=0;
		     for(var i=0;i<ids.length;i++){
		       if(s[i].data.fundIntentId ==null)count++;
		     }
		     
		     if(count>0){
		     		Ext.ux.Toast.msg('操作信息','请先保存');
		     }else{
				new SlFundIntentForm1({
					ids : ids,
					flag:flag,
					fundType : record.data.fundType,
					sumnotMoney :sumnotMoney,
					companyId:record.data.companyId,
					otherPanel:this.gridPanel
				}).show();
		     }
		}	
		
	},
	oneopenliushuiwin : function(){debugger
		var s = this.gridPanel.getSelectionModel().getSelections();
		var	record=s[0];
	     var flag=0;            //incomeMoney
	     if(record.data.payMoney !=0){   //payMoney
	     	flag=1;
	     }
	     if(record.data.fundIntentId ==null){
	     		Ext.ux.Toast.msg('操作信息','请先保存');
	     }else{
			new SlFundIntentForm({
				fundIntentId : record.data.fundIntentId,
				fundType : record.data.fundType,
				notMoney : record.data.notMoney,
				flag:flag,
				businessType :record.data.businessType,
				companyId:record.data.companyId,
				otherPanel : this.gridPanel
			}).show();
	     }
		
	}
});