/**
 * 录音记录
 * @class RecordingPanel
 * @extends Ext.Panel
 */
RecordingPanel = Ext.extend(Ext.Panel, {
		layout : 'anchor',
		anchor : '100%',
		constructor : function(_cfg) {
			
			Ext.applyIf(this, _cfg);
			
			this.initUIComponents();
			RecordingPanel.superclass.constructor.call(this,{
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
	var url="";
	//this.gridPanel = new HT.EditorGridPanel(
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
				store : new Ext.data.Store(
						{
							proxy : new Ext.data.HttpProxy(
									{
										url:url,
										method : "POST"
									}),
							reader : new Ext.data.JsonReader({
								fields : Ext.data.Record.create( [
									

							]),
							root : 'result'
						})
			}),
				columns : [
					{
						header : '录音时间',
						dataIndex : '',						
						sortable : true
					},
					{
						header : '收听录音',
						dataIndex : '',
						sortable : true
					},{
						header : '下载录音',
						dataIndex : '',						
						sortable : true
					}]

              });
     }
});
