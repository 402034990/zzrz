/**
 * 推荐产品
 * @class RecommendedProducts
 * @extends Ext.Window
 */
RecommendedProducts = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		RecommendedProducts.superclass.constructor.call(this, {
					title : '推荐产品',
					width : 1000,
					height : 425,
					modal : true,
					//iconCls : 'menu-person',
					autoScroll : true,
					maximizable : true,
					//layout : 'fit',
					region : 'center',
					layout : 'border',
					items : [this.gridPanel]

				});
	},
	initUIComponents : function() {
		
		this.gridPanel = new HT.GridPanel({
			region : 'center',
			rowActions : false,
			tbar:this.topbar,
//			loadMask : true,
			store : this.store,
			defaults : {
				anchor : '96%'
			},
			//url : __ctxPath + "",
			baseParams : {
				
			},
			//fields : [],
			border : false,
			columns : [{
					id : '',
					header : '贷款机构',
					sortable : true,
					dataIndex : ''
				}, {
					header : '贷款产品',
					dataIndex : ''
				}, {
					header : '产品标签',
					dataIndex : ''
				}, {
					header : '产品描述',
					dataIndex : ''
				}, {
					header : '产品手册',
					dataIndex : ''
				}]
		});
	},
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
		$search({
			searchPanel : this.searchPanel,
			gridPanel : this.gridPanel
		});
	},
	// 按条件搜索
	search : function() {
		$search({
			searchPanel : this.searchPanel,
			gridPanel : this.gridPanel
		});
	}
});