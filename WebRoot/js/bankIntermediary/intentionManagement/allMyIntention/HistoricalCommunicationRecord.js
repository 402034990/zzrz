/**
 * 历史沟通记录
 * @class HistoricalCommunicationRecord
 * @extends Ext.Panel
 */
HistoricalCommunicationRecord = Ext.extend(Ext.Panel, {
		layout : 'anchor',
		anchor : '100%',
		constructor : function(_cfg) {
			
			Ext.applyIf(this, _cfg);
			
			this.initUIComponents();
			HistoricalCommunicationRecord.superclass.constructor.call(this,{
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
			this.toolBar = new Ext.Toolbar({
				items : [
					/*{
						iconCls : 'btn-add',
						text : '增加',
						xtype : 'button',
						scope : this
						//handler : this.
							
					},*/{
						iconCls : 'btn-readdocument',
						text : '查看',
						xtype : 'button',			
						scope : this,
						buttonAlign:'right'
						//handler:this.
					},{
						iconCls : 'btn-readdocument',
						text : '编辑',
						xtype : 'button',			
						scope : this,
						buttonAlign:'right'
						//handler:this.
					},{
						iconCls : 'btn-sibling',
						text : '听取录音',
						xtype : 'button',			
						scope : this,
						buttonAlign:'right',
						handler:this.listenRecording
					},{
						iconCls : 'btn-sibling',
						text : '聊天记录',
						xtype : 'button',			
						scope : this,
						buttonAlign:'right',
						handler:this.chatRecord
					},{
						iconCls : 'btn-sibling',
						text : '短信记录',
						xtype : 'button',			
						scope : this,
						buttonAlign:'right'
						//handler:this.
					}]
				});
	var url="";
	//this.gridPanel = new HT.EditorGridPanel(
	this.gridPanel = new HT.GridPanel(
			{
				border : false,
				region:'center',
				showPaging:false,
				tbar : this.toolBar,
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
						header : '沟通人',
						dataIndex : '',						
						sortable : true
					},
					{
						header : '沟通时间',
						dataIndex : '',
						sortable : true
					},{
						header : '沟通方式',
						dataIndex : '',						
						sortable : true
					},{
						header : '沟通情况',
						dataIndex : '',
						sortable : true
					}, {
						header : '沟通内容',
						width : 100,
						dataIndex : '',
						sortable : true
					},{
						header : '点评人',
						dataIndex : '',						
						sortable : true
					}]

              });
     },
     //听取录音
     listenRecording:function(){
     	new ListenRecording().show();
     },
     //聊天记录
     chatRecord:function(){
     	new ChatRecord().show();
     }
});
