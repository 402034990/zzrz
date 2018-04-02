JiluMargin=Ext.extend(Ext.Window, {
	operateGrid:null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		 
		
		if (typeof(_cfg.cashId) != "undefined") {
			this.cashId = _cfg.cashId;
		}
	 
		this.initUIComponents();
		CreateMargin.superclass.constructor.call(this, {
					layout : 'border',
					items : [this.searchPanel,this.gridPanel],
					modal : true,
					height:400,
					width : 900,
					frame:true,
					maximizable : true,
					title : "保证金记录"
					
				
				});
	},//end of the constructor
	//初始化组件
	initUIComponents : function() {
		var pertitle="基本信息";
	this.searchPanel = new Ext.FormPanel( {
			layout : 'column',
			region : 'north',
			height : 40,
			anchor : '96%',
			border : false,
			keys : [{
				key : Ext.EventObject.ENTER,
				fn : this.search,
				scope : this
			}, {
				key : Ext.EventObject.ESC,
				fn : this.reset,
				scope : this
			}],
			layoutConfig: {
               align:'middle'
            },
             bodyStyle : 'padding:10px 10px 10px 10px',
			items : [{
						columnWidth :0.22,
						layout : 'form',
						border : false,
						labelWidth : 60,
						labelAlign : 'right',
					    items : [{
							xtype : 'datefield',
							fieldLabel : '创建日期',
							anchor:'100%',
							name : 'createDateBegin',
							 format: 'Y-m-d'
						}]
					}, {
						columnWidth :0.2,
						layout : 'form',
						border : false,
						labelWidth : 25,
						labelAlign : 'right',
						items : [ {
							xtype : 'datefield',
							fieldLabel : ' 至',
							anchor:'90%',
							name : 'createDateEnd',
							format: 'Y-m-d'
						}]
				    },{
						columnWidth : 0.15,
						layout : 'form',
		                labelAlign : 'right',
		                labelWidth : 40,
		                border : false,
						items : [ {
							xtype : 'textfield',
							fieldLabel: '金额',
							width:20,
							anchor:'100%',
							name:'moneyMin'
						 } ]
					} , {
						columnWidth : 0.15,
						layout : 'form',
						labelWidth : 25,
						labelAlign : 'right',
						border : false,
						items : [ {
							xtype : 'textfield',
							anchor:'90%',
							fieldLabel : ' 至',
							name:'moneyMax'
						}]
					},{
						columnWidth : 0.08,
						layout : 'form',
						border : false,
						labelAlign : 'right',
						items : [ {
							xtype : 'button',
							text : '查询',
							width : 60,
							scope : this,
							iconCls : 'btn-search',
							handler : this.search
						}]
					  },{
						columnWidth : 0.08,
						layout : 'form',
						border : false,
						labelAlign : 'right',
						items : [ {
							xtype : 'button',
							text : '重置',
							width : 60,
							scope : this,
						
							iconCls : 'btn-search',
							handler : this.reset
						 }]
					 }]

		})
		 this.gridPanel=new HT.GridPanel({
				    region:'center',
				    rowActions : false,
					loadMask : true,
					url : __ctxPath + "/deatil/listCashdetail.do?cashId="+this.cashId,
					fields : [{
								name : 'id',
								type : 'int'
							},'createDate','cashType','cashmoney','projectId','projectName','state','declibtion','projectNum','afterMoney','notMoney'],
					columns : [
							{
								header : '创建日期',
								width : 140,
								dataIndex : 'createDate'
							}, {
								header : '类型',
								dataIndex : 'cashType',
								renderer:function(v){
									if(v==1){
										return '收入'
									}else if(v==2){
										return '支出'	
									}else if(v==3){
										return '占用'
									}else if(v==4){
										return '释放'
									}
									return "";
								}
							}, {
								header : '金额',
								dataIndex : 'cashmoney'
							},{
								header : '已对账金额(元)',
								dataIndex : 'afterMoney',
								width : 140,
								renderer : function(v) {
									if (v != null) {
										return Ext.util.Format.number(v,',000,000,000.00')+ "元";
									} else {
										return v;
									}
								}
							},{
								header : '未对账金额(元)',
								dataIndex : 'notMoney',
								width : 140,
								renderer : function(v) {
									if (v != null) {
										return Ext.util.Format.number(v,',000,000,000.00')+ "元";
									} else {
										return v;
									}
								}
							},{
								header : '项目编号',
								align : 'right',
								sortable : true,
								dataIndex : 'projectNum'
							}, {
								header : '项目名称',
								align : 'right',
								sortable : true,
								dataIndex : 'projectName'
							}/*, {
								header : '状态',
								align : 'right',
								sortable : true,
								dataIndex : 'state',
								renderer:function(v){
									if(v==1){
									  return '成功'
									}else if(v==2){
										return '失败'
									}else if(v==0){
										return '未对账'
									}
								}
							}*/,{
								header : '备注',
								dataIndex : 'declibtion'
							}
					]
				});
	},
	//重置查询表单
			reset : function(){
				this.searchPanel.getForm().reset();
				$search({
					searchPanel:this.searchPanel,
					gridPanel:this.gridPanel
				});
			},
	
	//按条件搜索
			search : function() {
				$search({
					searchPanel:this.searchPanel,
					gridPanel:this.gridPanel
				});
			}
});