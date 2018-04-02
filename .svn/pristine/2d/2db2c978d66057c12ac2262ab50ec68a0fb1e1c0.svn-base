/**
 * 推荐顾问
 * @class RecommendAdvisor
 * @extends Ext.Window
 */
RecommendAdvisor = Ext.extend(Ext.Panel, {
		layout : 'anchor',
		anchor : '100%',
		name:"recommendAdvisor",
		constructor : function(_cfg) {
			Ext.applyIf(this, _cfg);
			this.initUIComponents();
			RecommendAdvisor.superclass.constructor.call(this,{
						id:'RecommendAdvisor',
						//region : 'center',
						//layout : 'border',
						items : [ 
							{xtype:'panel',
							border:false,
							bodyStyle:'margin-bottom:5px'
							//html : '<B>推荐顾问：</B>'
							},
							this.gridPanel 
						]
					});
		},
		initUIComponents : function() {
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
										url:__ctxPath+ '',
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
						header : '坐席号',
						dataIndex : '',
						sortable : true
					},{
						header : '坐席状态',
						dataIndex : '',						
						sortable : true
					},{
						header : '接单数量',
						dataIndex : '',						
						sortable : true
					}]
              });
     }
});