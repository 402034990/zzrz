/**
 * 未接听记录
 * @class NoAnswerRecord
 * @extends Ext.Panel
 */
NoAnswerRecord = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				NoAnswerRecord.superclass.constructor.call(this, {
							id : 'NoAnswerRecord',
							title : '未接听记录',
							//iconCls : 'menu-cusLinkman',
							region : 'center',
							layout : 'border',
							items : [/*this.searchPanel,*/ this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				var anchor = '100%';
				// 初始化搜索条件Panel
				this.searchPanel = new HT.SearchPanel({
					layout : 'form',
					border : false,
					region : 'north',
					height : 43,
					anchor : '70%',
					keys : [{
						key : Ext.EventObject.ENTER,
						fn : this.search,
						scope : this
					}, {
						key : Ext.EventObject.ESC,
						fn : this.reset,
						scope : this
					}],
					items : [{
						border : false,
						layout : 'column',
						style : 'padding-left:5px;padding-right:5px;padding-top:10px;',
						layoutConfig : {
							align : 'middle',
							padding : '5px'
						},
						defaults : {
							xtype : 'label',
							anchor : anchor
						},
						items : [/*{
							columnWidth : .33,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								xtype : 'combo',
								mode : 'local',
								valueField : 'value',
								editable : false,
								displayField : 'value',
								store : new Ext.data.SimpleStore({
									fields : ["value"],
									data : [["400"], ["线下"]]
								}),
								triggerAction : "all",
								name : '',
								fieldLabel : '客户类型'
		
							}]
						},*/ {
							columnWidth : .23,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								fieldLabel : '客户标签',
								name : '',
								xtype : 'textfield'
							}]
						},{
							columnWidth : .23,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								xtype : 'datefield',
								name:'',
								fieldLabel : '创建时间'
							}]
						},{
							columnWidth : .23,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								xtype : 'datefield',
								name:'',
								fieldLabel : '至'
							}]
						},{
							columnWidth : .09,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 5,
							defaults : {
								xtype : 'button'
							},
							// style : 'padding-left:60px;',
							items : [{
								text : '查询',
								fieldLabel : ' ',
								labelSeparator : "",
								scope : this,
								iconCls : 'btn-search',
								handler : this.search
							}]
						},{
							columnWidth : .23,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								fieldLabel : '客户名称',
								name : '',
								xtype : 'textfield'
							}]
						},{
							columnWidth : .23,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								xtype : 'datefield',
								name:'',
								fieldLabel : '待跟进时间'
							}]
						},{
							columnWidth : .23,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								xtype : 'datefield',
								name:'',
								fieldLabel : '至'
							}]
						}, {
							columnWidth : .09,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 5,
							defaults : {
								xtype : 'button'
							},
							items : [{
								text : '重置',
								fieldLabel : '',
								labelSeparator : "",
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}]
						}]
					}]
				});

				this.topbar = new Ext.Toolbar({
							items : [/*{
										iconCls : 'btn-user-sel',
										text : '添加',
										xtype : 'button',
										scope : this,
										handler : this.createRs
									},{
										iconCls : 'btn-mode',
										text : '查看',
										xtype : 'button',
										scope : this,
										handler : this.seeRs
									},{
										iconCls : 'btn-readdocument',
										text : '编辑',
										xtype : 'button',
										scope : this,
										handler : this.seeRs
									}, {
										iconCls : 'btn-people',
										text : '转化',
										xtype : 'button',
										scope : this,
										handler : this.exchangeRs
									},*/{
										iconCls : 'btn-people',
										text : '跟进',
										xtype : 'button',
										scope : this,
										handler : this.followRs
									}/*,{
										iconCls : 'btn-people',
										text : '设置下次跟进时间',
										xtype : 'button',
										scope : this,
										handler : this.nextFollowTimeRs
									}*/]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					// 不适用RowActions
		
					rowActions : false,
					url : __ctxPath + "/project/projectListSlSmallloanProject.do",
					baseParams : {
						'projectStatus' : 1,
						'isCapitalUnexpired' : this.isCapitalUnexpired,
						'isGrantedShowAllProjects' : this.isGrantedShowAllProjects,
						'keyWord' : this.keyWord
					},
					fields : [{
						name : 'runId',
						type : 'int'
					}, 'projectId','orgName', 'subject', 'creator', 'userId', 'projectName',
							'projectNumber', 'defId', 'runStatus', 'projectMoney',
							'oppositeType', 'oppositeTypeValue', 'customerName',
							'projectStatus', 'operationType', 'operationTypeValue',
							'taskId', 'activityName', 'oppositeId', 'businessType',
							'startDate', 'endDate', 'superviseOpinionName',
							'loanStartDate', 'expectedRepaymentDate', 'processName',
							'businessManagerValue', 'superviseDateTime',
							'payProjectMoney', 'accrualtype', 'payintentPeriod','isOtherFlow'],
					columns : [{
						header : '',
						dataIndex : '',
						hidden : true
					}, {
						header : '客户姓名',
						dataIndex : ''
					}, {
						header : '主叫客户',
						dataIndex : ''
					}, {
						header : '主叫号码',
						dataIndex : ''
					}, {
						header : '下次跟进时间',
						dataIndex : ''
					},{
						header : '被叫号码',
						dataIndex : ''
					}, {
						header : '通话类型',
						dataIndex : ''
					}, {
						header : '振铃时间',
						dataIndex : ''
					}, {
						header : '接通时间',
						dataIndex : ''
					}, {
						header : '结束时间',
						dataIndex : ''
					}, {
						header : '处理坐席',
						dataIndex : ''
					}, {
						header : '通话记录状态',
						dataIndex : ''
					}]
				});
			},
			// 重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			search : function() {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			//添加
			createRs:function(){
				new telephoneNO().show();
			},
			//查看
			seeRs:function(){
				new SeeDetails().show();
			},
			//转化
			exchangeRs:function(){
				new CustomerTransfer().show();
			},
			//跟进
			followRs:function(){
				new CustomerFollowView().show();
			},
			//设置下次跟进时间
			nextFollowTimeRs:function(){
				new NextFollowTime().show();
			}
			
		});