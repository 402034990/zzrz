/**
 * @author
 * @class SlFundIntentView
 * @extends Ext.Panel
 * @description [SlFundIntent]管理
 * @company 智维软件
 * @createtime:
 */
customerAnalysis= Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		if (typeof(_cfg.businessType) != "undefined") {
			this.businessType = _cfg.businessType;
		}
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		customerAnalysis.superclass.constructor.call(this, {
			id : 'customerAnalysis',
			title : '客户分析统计',
			region : 'center',
			layout : 'border',
			iconCls : 'btn-team2',
			items : [/*this.searchPanel,*/ this.gridPanel]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel
		this.searchPanel = new HT.SearchPanel({});// end of searchPanel
		this.topbar = new Ext.Toolbar({});
		this.gridPanel = new HT.GridPanel({
			bodyStyle : "width : 100%",
			region : 'center',
//			tbar : this.topbar,
//			plugins : [summary],
			rowActions : false,
			loadMask : true,
			id : 'customerAnalysisess',
			isautoLoad : true,
			url : __ctxPath+ "/project/customerAnaSlSmallloanProject.do",
			fields : [{
						name : 'projectId',
						type : 'Long'
					},'total','refusedPer','refusedSer','customerGroups'
					],
			columns : [{
						header : 'projectId',
						dataIndex : 'projectId',
						hidden : true
					},{
						header : "进件数",
						sortable : true,
						width : 120,
						dataIndex : 'total'
					}, {
						header : '客户群',
						dataIndex : 'customerGroups',
						width : 120,
						renderer: function(v){
							if(v==1){
								return"股东";
							}else if(v==2){
								return"个体";
							}else if(v==3){
								return"授薪人士";
							}else if(v==4){
								return"自由职业";
							}else {
								return"法人";
							}
						}
					}, {
						header : '通过率',
						dataIndex : 'refusedPer',
						width : 120
					}, {
						header : '放款率',
						dataIndex : 'refusedSer',
						width : 120
					}, {
						header : '件均',
						dataIndex : 'refusedPer',
						sortable : true,
//						align : 'right',
						width : 120
					}]
		});

//		this.gridPanel.addListener('cellclick', this.cellClick);

	}// end of the initComponents()
});