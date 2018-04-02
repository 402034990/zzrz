/**
 * 
 * @class detailView
 * @extends Ext.Window
 */
BailFundDetail = Ext.extend(Ext.Window, {
	// 构造函数
	constructor : function(_cfg) {
		if (_cfg.type) {
			this.type = _cfg.type;
		}
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		BailFundDetail.superclass.constructor.call(this, {
			layout : 'fit',
			items : this.gridPanel,
			modal : true,
			height : 500,
			width : screen.width - 252,
			autoScroll : true,
			maximizable : true,
			title : '资金明细'
		});
	},// end of the constructor
	// 初始化组件

	initUIComponents : function() {
		var fundType = this.fundType;
		var url = __ctxPath+"/deatil/getCheckDetailCashdetail.do?cashdepositid="+this.cashdepositid;

		var summary = new Ext.ux.grid.GridSummary();
		function totalMoney(v, params, data) {
			return '总计(元)';
		}

		this.gridPanel = new HT.GridPanel({
			border : false,
			rowActions : false,
			bbar : false,
			plugins : [summary],
			url : url,
			fields : [ 'myAccount','currency','factDate','incomeMoney','payMoney'],
			columns : [{
				header : '我方账号',
				summaryRenderer : totalMoney,
				width : 160,
				dataIndex : 'myAccount'

			}, {
				header : '币种',
				dataIndex : 'currency',
				width : 50
			}, {
				header : '到账时间',
				dataIndex : 'factDate',
				sortable : true,
				width : 76
			}, {
				header : '收入金额',
				width : 105,
				dataIndex : 'incomeMoney',
				align : 'right',
				renderer : function(v) {
					if (v != null) {
						return Ext.util.Format.number(v,',000,000,000.00')+ "元"
					} else {
						return v
					}
				}
			}, {
				header : '支出金额',
				width : 105,
				align : 'right',
				dataIndex : 'payMoney',
				renderer : function(v) {
					if (v != null) {
						return Ext.util.Format.number(v,',000,000,000.00')+ "元"
						return v + "元"
					} else {
						return v
					}
				}
			}]
	});
	}
});