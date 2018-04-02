/**
 * 已排除意向
 * @class ExclusionIntention
 * @extends Ext.Panel
 */
ExclusionIntention = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				ExclusionIntention.superclass.constructor.call(this, {
							id : 'ExclusionIntention',
							title : '已排除意向',
							//iconCls : 'menu-cusLinkman',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
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
						items : [{
							columnWidth : .33,
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
						}, {
							columnWidth : .33,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								fieldLabel : '联系电话',
								name : '',
								xtype : 'textfield'
							}]
						},{					
							columnWidth : .33,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								xtype : "combo",
								triggerClass : 'x-form-search-trigger',
								hiddenName : "slSmallloanProject.appUserName",
								editable : false,
								fieldLabel : "负责人",
								//blankText : "负责人不能为空，请正确填写!",
								//allowBlank : false,
								anchor : "100%",
								/*listeners : {
								scope : this,
								// 设置默认用户
								'afterRender' : function(combo) {
									this.getCmpByName('slSmallloanProject.appUserName')
											.setValue(currentUserFullName);
									this.getCmpByName('slSmallloanProject.appUserId')
											.setValue(currentUserId);
								}
							},*/
							onTriggerClick : function(cc) {
								var obj = this;
								var appuerIdObj = obj.nextSibling();
								var userIds = appuerIdObj.getValue();
								if (null == obj.getValue() || "" == obj.getValue()) {
									userIds = "";
								}
								new UserDialog({
											userIds : userIds,
											userName : obj.getValue(),
											single : false,
											type : 'branch',
											title : "选择项负责人",
											callback : function(uId, uname) {
												obj.setValue(uname);
												// obj.setRawValue(uname);
												appuerIdObj.setValue(uId);
											}
										}).show();
	
							}
							}, {
								xtype : "hidden",
								name : "slSmallloanProject.appUserId"
							}]
						},{
							columnWidth : .33,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								fieldLabel : '最后跟进时间',
								name : '',
								editable : false,
								xtype : 'datefield'
							}]
						},{
							columnWidth : .33,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : anchor
							},
							items : [{
								fieldLabel : '至',
								name : '',
								editable : false,
								xtype : 'datefield'
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
						}, {
							columnWidth : .05,
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
							items : [{
										iconCls : 'btn-mode',
										text : '查看',
										xtype : 'button',
										scope : this,
										//handler : this.seeRs
									},{
										iconCls : 'btn-readdocument',
										text : '撤销',
										xtype : 'button',
										scope : this,
										//handler : this.seeRs
									}, {
										iconCls : 'btn-people',
										text : '转接',
										xtype : 'button',
										scope : this,
										handler : this.assign
									}]
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
						header : '负责人',
						dataIndex : ''
					}, {
						header : '客户名称',
						dataIndex : ''
					},{
						header : '创建人',
						dataIndex : ''
					}, {
						header : '创建时间',
						dataIndex : ''
					}, {
						header : '最后跟进时间',
						dataIndex : ''
					}, {
						header : '跟进次数',
						dataIndex : ''
					}, {
						header : '排除原因',
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
			//查看
			seeRs:function(){
				new SeeDetails().show();
			},
			//分配
			assign:function(){
				//new RecommendAdvisor().show();
				new IntentionAssign().show();
			}
		});