/**
 * @author
 * @class SlFundintentUrgeView
 * @extends Ext.Panel
 * @description [SlFundintentUrge]管理
 * @company 智维软件
 * @createtime:
 */
TabLeaseFundIntentIncome= Ext.extend(Ext.Panel, {
			// 构造函数
	        
			constructor : function(_cfg) {
				Ext.apply(this, _cfg);
			
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				TabLeaseFundIntentIncome.superclass.constructor.call(this, {
							id : 'TabLeaseFundIntentIncome'+this.businessType+this.type,
							title : this.type=='marginCollection'?'保证金收取台账':(this.type='retentionFee'?'留购费收取台账':'资金收取台账'),
							iconCls : "btn-tree-team29",
							region : 'center',
							layout : 'border',
							items : [this.tabpanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var itemschange=[
			 	 new LeaseFundIntentIncomeAll({tabflag:'InterestIncomeAll',businessType:this.businessType,type:this.type}),
				 new LeaseFundIntentIncomeShould({tabflag:'InterestIncomeShould',businessType:this.businessType,type:this.type}),
			     new LeaseFundIntentIncomeOwe({tabflag:'InterestIncomeOwe',businessType:this.businessType,type:this.type}),
			     new LeaseFundIntentIncomeActual({tabflag:'InterestIncomeActual',businessType:this.businessType,type:this.type})
				];

				this.tabpanel = new Ext.TabPanel({
					resizeTabs : true, // turn on tab resizing
					minTabWidth : 115,
					tabWidth : 135,
					enableTabScroll : true,
					Active : 0,
					width : 600,
					defaults : {
						autoScroll : true
					},
					region : 'center', 
					//layout:'fit'
					deferredRender : true,
					activeTab :0, // first tab initially active
					xtype : 'tabpanel',
						items : itemschange
					});
					
			},// end of the initComponents()
			//重置查询表单
			reset : function(){
				this.searchPanel.getForm().reset();
			},
			//按条件搜索
			search : function() {
				$search({
					searchPanel:this.searchPanel,
					gridPanel:this.gridPanel
				});
			},
			//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new SlFundintentUrgeForm({slFundintentUrgeId:rec.data.slFundintentUrgeId}).show();
				});
			},
			//创建记录
			createRs : function() {
				new SlFundintentUrgeForm().show();
			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/creditFlow.finance/multiDelSlFundintentUrge.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/creditFlow.finance/multiDelSlFundintentUrge.do',
					grid:this.gridPanel,
					idName:'slFundintentUrgeId'
				});
			},
			//编辑Rs
			editRs : function(record) {
				new SlFundintentUrgeForm({
					slFundintentUrgeId : record.data.slFundintentUrgeId
				}).show();
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.slFundintentUrgeId);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			},
			getfundType : function(){
				var sqlstr="&fundType=('principalRepayment')";
				if(this.businessType!=null){
					businessType=this.businessType
					switch (businessType) {
					  case "SmallLoan": sqlstr="&fundType=('principalRepayment')";
					    break;
					  case "Financing": sqlstr="&fundType=('Financingborrow')";
					    break;
					  case "Guarantee": sqlstr=" ";
					    break;
					  case "Pawn": sqlstr=" ";
					    break;
					  case "Investment": sqlstr=" ";
					    break;
					  default: sqlstr="&fundType=('principalRepayment')";
					}
				}
				return sqlstr

			}
});
