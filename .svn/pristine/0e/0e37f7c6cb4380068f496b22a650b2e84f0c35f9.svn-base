/**
 * @author
 * @class AgentCreditInfo
 * @extends Ext.Panel
 * @description [PlProjectArchives]管理
 * @company 智维软件
 * @createtime:
 */
/**
 * @author lisl
 * @extends Ext.Panel
 * @description 小贷项目管理
 * @company 智维软件
 * @createtime:
 */
AgentCreditInfo = Ext.extend(Ext.Window, {
			agentId:null,
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				if (typeof(_cfg.agentId) != "undefined") {
					this.agentId = _cfg.agentId;
				}
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				AgentCreditInfo.superclass.constructor.call(this, {
							id : 'AgentCreditInfo'+this.businessType,
							title : '授信记录',
							width : 1100,
							height : 425,
							region : 'center',
							layout : 'border',
							iconCls : this.tabIconCls==null?'btn-tree-team33':this.tabIconCls,
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
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
			items : [
			
				{
				columnWidth :0.2,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
				items : [ {
				     	fieldLabel : '创建日期:从',
						name : 'startDate',
						labelSeparator : '',
						xtype : 'datefield',
						format : 'Y-m-d',
						anchor : '100%'
						
					} ]
			}, {
				columnWidth :0.15,
				layout : 'form',
				border : false,
				labelWidth : 20,
				labelAlign : 'right',
				items : [ {
				     	fieldLabel : '至',
						name : 'endDate',
						labelSeparator : '',
						xtype : 'datefield',
						format : 'Y-m-d',
						anchor : '100%'
						
					}  ]
			},{	
				columnWidth :0.15,
				layout : 'form',
				border : false,
				labelWidth : 50,
				labelAlign : 'right',
				items : [ {
						fieldLabel : '类型',
						xtype : 'combo',
						mode : 'local',
						displayField : 'name',
						valueField : 'id',
						editable : false,
						store : new Ext.data.SimpleStore({
									fields : ["name", "id"],
									data : [["授信增加", "0"], ["授信释放", "1"], ["授信占用", "2"]]
						}),
						triggerAction : "all",
						hiddenName : "aprovalType",
						name : 'aprovalType',
						anchor : '100%'
				}  ]
				},
				{
				columnWidth :0.15,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
				items : [ {
				     	fieldLabel : '授信额度:',
						name : 'approvalMoneyMin',
						labelSeparator : '',
						xtype : 'numberfield',
						anchor : '100%'
						
					} ]
			}, {
				columnWidth :0.15,
				layout : 'form',
				border : false,
				labelWidth : 20,
				labelAlign : 'right',
				items : [ {
				     	fieldLabel : '至',
						name : 'approvalMoneyMax',
						labelSeparator : '',
						xtype : 'numberfield',
						anchor : '100%'
						
					}  ]
			}
				,{
				columnWidth : 0.1,
				layout : 'form',
				border : false,

				labelAlign : 'right',
				items : [ {
					xtype : 'button',
					text : '查询',
					width : 60,
					scope : this,
					style:'margin-left:30',
					iconCls : 'btn-search',
					handler : this.search
				} ]
			}, {
				columnWidth : 0.1,
				layout : 'form',
				border : false,

				labelAlign : 'right',
				items : [ {
					xtype : 'button',
					text : '重置',
					width : 60,
					scope : this,
					style:'margin-left:1',
					iconCls : 'btn-reset',
					handler : this.reset
				} ]
			} ]

		})
				this.gridPanel=new HT.GridPanel({
					id : 'PlProjectArchivesGrid',
					region:'center',
					//不适用RowActions
					rowActions : false,
					loadMask : true,
					url : __ctxPath + "/agentAproval/listByAnentIdAgentAproval.do?agentId="+this.agentId,
					fields : [{
								name : 'id',
								type : 'int'
							}, 'id','createTime','aprovalType','aprovalProjectNumber','approvalMoney','startApprovalTime','endApprovalTime','projectStatue'],
					columns : [
							{
								header : '创建日期',
								width : 70,
								dataIndex : 'createTime',
								format : 'Y-m-d',
								renderer : ZW.ux.dateRenderer(this.datafield)
							},{
								header : '类型',
								align : 'center',
								width : 70,
								dataIndex : 'aprovalType',
								renderer : function(v) {
									switch (v) {
										case 0 :
											return '授信增加';
											break;
										case 1 :
											return '授信释放';
											break;
										case 2 :
											return '授信占用';
											break;

									}
								}
								
							},
							{
								header : '授信编号',
								align : 'center',
								width : 130,
								sortable : true,
								dataIndex : 'aprovalProjectNumber'
							}, {
								header : '授信额度',
								align : 'center',
								width : 110,
								sortable : true,
								dataIndex : 'approvalMoney',
								renderer : function(value) {
									if(value ==null ||value == "" ) {
										return "";
									}else {
										return Ext.util.Format.number(value,',000,000,000.00')+"元";
									}
								}
							}, {
								header : '授信起日',
								dataIndex : 'startApprovalTime',
								format : 'Y-m-d',
								width : 70,
								renderer : ZW.ux.dateRenderer(this.datafield)
							}, {
								header : '授信止日',
								dataIndex : 'endApprovalTime',
								format : 'Y-m-d',
								width : 70,
								renderer : ZW.ux.dateRenderer(this.datafield)
							}
							,{
								header : '授信状态',
								align : 'center',
								width : 70,
								dataIndex : 'projectStatue',
								renderer : function(v) {
									switch (v) {
										case 0 :
											return '审批中';
											break;
										case 1 :
											return '审批打回';
											break;
										case 2 :
											return '审批通过';
											break;
									}
								}
							}
					]//end of columns
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
			}
		
});
