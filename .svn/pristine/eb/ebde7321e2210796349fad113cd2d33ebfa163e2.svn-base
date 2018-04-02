/**
 * 沟通记录信息
 * @class CommunicationRecordInfo
 * @extends Ext.Panel
 */
CommunicationRecordInfo = Ext.extend(Ext.Panel, {
		layout : 'anchor',
		anchor : '100%',
		constructor : function(_cfg) {
			
			Ext.applyIf(this, _cfg);
			
			this.initUIComponents();
			CommunicationRecordInfo.superclass.constructor.call(this,{
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
					{
						iconCls : 'btn-add',
						text : '新增',
						xtype : 'button',
						scope : this
						//handler : this.
							
					},{
						iconCls : 'btn-readdocument',
						text : '查看全部',
						xtype : 'button',			
						scope : this,
						buttonAlign:'right'
						//handler:this.
					}]
				});
	var url="";
	this.gridPanel = new HT.EditorGridPanel(
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
						header : '项目名称',
						dataIndex : '',						
						sortable : true
					},
					{
						header : '项目金额',
						dataIndex : '',
						sortable : true
					},{
						header : '贷款方式',
						dataIndex : '',						
						sortable : true
					},{
						header : '贷款产品',
						dataIndex : '',
						sortable : true
					}, {
						header : '放款时间',
						width : 100,
						dataIndex : '',
						sortable : true
					},{
						header : '当前状态',
						dataIndex : '',						
						sortable : true
					}]

              });
     }
});
