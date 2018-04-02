/**
 * 借款意向信息
 * @class BorrowingIntentionInfo
 * @extends Ext.Panel
 */
BorrowingIntentionInfo = Ext.extend(Ext.Panel, {
		layout : 'anchor',
		anchor : '100%',
		constructor : function(_cfg) {
			
			Ext.applyIf(this, _cfg);
			
			this.initUIComponents();
			BorrowingIntentionInfo.superclass.constructor.call(this,{
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
						text : '增加',
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
						header : '用款金额',
						dataIndex : '',						
						sortable : true,
						editor : {
							xtype : 'numberfield'
						},
						renderer : function(value,metaData, record,rowIndex, colIndex,store) {
						
							return Ext.util.Format.number(value,'0,000.00')+"元"	;
						}
					},
					{
						header : '用款期限',
						dataIndex : '',
						sortable : true,
						editor : {
							xtype : 'textfield'
						}
					},{
						header : '用款时间',
						dataIndex : '',						
						sortable : true,
						editor : {
							xtype : 'datefield',
							format: 'Y-m-d h:i:s'
						}
					},
					{
						header : '贷款方式',
						dataIndex : '',
						sortable : true,
						width : 100,
						editor : {
							xtype : 'textfield'
						}
					}, {
						header : '贷款产品',
						width : 100,
						dataIndex : '',
						sortable : true,
						editor : {
							xtype : 'textfield'
						}
					},{
						header : '创建时间',
						dataIndex : '',						
						sortable : true,
						editor : {
							xtype : 'datefield',
							format: 'Y-m-d h:i:s'
						}
					}, {
						header : '当前状态',
						dataIndex : 'remarks',
						sortable : true,
						editor : {
							xtype : 'textfield'
						}
					}]

              });
     }
});
