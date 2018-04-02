/**
 * 顾问列表
 * @class AdvisorList
 * @extends Ext.Window
 */
AdvisorList = Ext.extend(Ext.Panel, {
		layout : 'anchor',
		anchor : '100%',
		constructor : function(_cfg) {
			Ext.applyIf(this, _cfg);
			this.initUIComponents();
			AdvisorList.superclass.constructor.call(this,{
						id:'AdvisorList',
						//region : 'center',
						//layout : 'border',
						items : [ 
							{xtype:'panel',
							border:false,
							bodyStyle:'margin-bottom:5px'
							//html : '<B>顾问列表：</B>'
							},
							this.gridPanel 
						]
					});
		},
		initUIComponents : function() {
		/*this.searchPanel = new HT.SearchPanel({
			layout : 'form',
			region : 'north',
			colNums : 3,
			items : [{
				fieldLabel : '姓名',
				name : ''
			}],
			buttons : [{
				text : '查询',
				scope : this,
				iconCls : 'btn-search',
				handler : this.search
			}, {
				text : '重置',
				scope : this,
				iconCls : 'btn-reset',
				handler : this.reset
			}]
		});*/	
		this.gridPanel = new HT.GridPanel(
			{
				border : false,
				region:'center',
				showPaging:false,
				autoHeight : true,
				clicksToEdit :1,
				stripeRows : true,
				viewConfig : {
					forceFit : true
				},
				sm : new Ext.grid.CheckboxSelectionModel({}),
				store : new Ext.data.Store(
						{
							proxy : new Ext.data.HttpProxy(
									{
										url:url=__ctxPath+'' ,
										method : "POST"
									}),
							reader : new Ext.data.JsonReader({
							fields : Ext.data.Record.create( [
									
							]),
							root : 'result'
						})
			}),
				columns : [{
						header : '顾问姓名',
						dataIndex : '',
						sortable : true
					},{
						header : '意向客户数量',
						dataIndex : '',
						sortable : true
					},{
						header : '正式客户数量',
						dataIndex : '',						
						sortable : true
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
