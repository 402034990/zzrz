/**
 * 提成信息
 * @extends Ext.Panel
 */
PercentageInfo = Ext.extend(Ext.Panel, {
		layout : 'anchor',
		anchor : '100%',
		constructor : function(_cfg) {
			Ext.applyIf(this, _cfg);
			this.initUIComponents();
			PercentageInfo.superclass.constructor.call(this,{
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
						iconCls : 'btn-readdocument',
						text : '计算',
						xtype : 'button',			
						scope : this,
						buttonAlign:'right'
						//handler:this.
					}]
				});
	var url="";
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
				columns : [
					{
						header : '费用类型',
						dataIndex : '',						
						sortable : true
					},
					{
						header : '收支类型',
						dataIndex : '',
						sortable : true
					},{
						header : '金额',
						dataIndex : '',						
						sortable : true
					},{
						header : '计划到账日期',
						dataIndex : '',
						sortable : true
					}]

              });
     }
});
