/**
 * 费用收取信息明细
 * @extends Ext.Panel
 */
FeeCollectInfos = Ext.extend(Ext.Panel, {
		layout : 'anchor',
		anchor : '100%',
		constructor : function(_cfg) {
			
			Ext.applyIf(this, _cfg);
			
			this.initUIComponents();
			FeeCollectInfos.superclass.constructor.call(this,{
						items : [{
							xtype:'panel',
							border:false,
							bodyStyle:'margin-bottom:5px'
						},
						this.gridPanel 
						]
					});
		},
		initUIComponents : function() {

		var url = "";
		this.gridPanel = new HT.GridPanel({
			border : false,
			region : 'center',
			showPaging : false,
			autoHeight : true,
			clicksToEdit : 1,
			stripeRows : true,
			viewConfig : {
				forceFit : true
			},
			store : new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : url,
					method : "POST"
				}),
				reader : new Ext.data.JsonReader({
					fields : Ext.data.Record.create([

					]),
					root : 'result'
				})
			}),
			columns : [ {
				header : '费用类型',
				dataIndex : '',
				sortable : true
			}, {
				header : '收支类型',
				dataIndex : '',
				sortable : true
			}, {
				header : '金额',
				dataIndex : '',
				sortable : true
			}, {
				header : '计划到账日期',
				dataIndex : '',
				sortable : true
			} ]

		});
	}
});
