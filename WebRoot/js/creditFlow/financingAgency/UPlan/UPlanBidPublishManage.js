/**
 * @author
 * @createtime
 * @class PlOrReleaseListForm
 * @extends Ext.Window
 * @description PlOrRelease表单
 * @company 智维软件
 */
UPlanBidPublishManage = Ext.extend(Ext.Panel, {
	// 构造函数
	State:0,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		UPlanBidPublishManage.superclass.constructor.call(this, {
					id : 'UPlanBidPublishManage'+this.keystr+this.buttonType,
					layout : 'border',
					items : [this.gridPanel,this.searchPanel],
					modal : true,
					height : 550, 
					autoWidth : true,
					boder:0,
					maximizable : true,
					iconCls : 'btn-tree-team30',
					//title : this.titlePrefix ,
					buttonAlign : 'center'

				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel
		this.searchPanel = new HT.SearchPanel({
			        id:'UPlanBidPublishSearchPanel'+this.keystr+this.buttonType,
					layout : 'form',
					region : 'north',
					border : false,
					height : 65,
					anchor : '70%',
						items : [{
						border : false,
						layout : 'column',
						style : 'padding-left:5px;padding-right:0px;padding-top:5px;',
						items : [{
							columnWidth : .3,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : '100%'
							},
							items :[{
								fieldLabel : '计划编号',
								name : 'Q_mmNumber_S_LK',
								xtype : 'textfield'

							}]
						},{
							columnWidth : .3,
							labelAlign : 'right',
							xtype : 'container',
							layout : 'form',
							labelWidth : 80,
							defaults : {
								anchor : '100%'
							},
							items :[{
								fieldLabel : '计划名称',
								name : 'Q_mmName_S_LK',
								xtype : 'textfield'

							}]
						},{
							columnWidth : .1,
							xtype : 'container',
							layout : 'form',
							defaults : {
								xtype : 'button'
							},
							style : 'padding-left:50px;',
							items : [{
								text : '查询',
								scope : this,
								iconCls : 'btn-search',
								handler : this.search
						}]},{
							columnWidth : .1,
							xtype : 'container',
							layout : 'form',
							defaults : {
								xtype : 'button'
							},
							style : 'padding-left:10px;',
							items : [{
								text : '重置',
								scope : this,
								iconCls : 'btn-reset',
								handler : this.reset
							}]
						}]
					}]
				});// end of searchPanel

		this.topbar = new Ext.Toolbar({
					items : [{
								iconCls : 'btn-add',
								name:"publishmmplan",
								text : '发布',
								xtype : 'button',
								scope : this,
								hidden:(this.buttonType==1) ? false : true,
								handler : this.publish
							},{
								iconCls : 'btn-add',
								name:"startmmplan",
								text : '起息',
								xtype : 'button',
								scope : this,
								hidden : this.buttonType == 3 ? false : true,
								handler : this.start
							}, {
								iconCls : 'tipsClose',
								name:"closemmplan",
								text : '关闭',
								xtype : 'button',
								scope : this,
								hidden : this.buttonType == 2 ? false : true,
								handler : this.bidclose
							}, {
								iconCls : 'btn-add',
								text : '授权平台派息',
								xtype : 'button',
								name:"shouquanpaixi",
								scope : this,
								//hidden:(this.state==7) ? false : true,
								hidden : this.buttonType == 4 ? false : true,
								handler : this.shouquanpaixi
							}, {
								iconCls : 'btn-add',
								text : '完成',
								name:"fininsh",
								xtype : 'button',
								scope : this,
								hidden : this.buttonType == 7 ? false : true,
								handler : this.fininsh
							}/*,'->',{
								iconCls : 'btn-xls',
								text : '导出列表',
								xtype : 'button',
								scope : this,
								handler : this.toExcelPlan
							}*/,'->',(this.buttonType == 2 || this.buttonType == 3 || this.buttonType == 8) ? {
								iconCls : 'btn-detail',
								name:"seemmplan",
								text : '查看投标详细',
								xtype : 'button',
								scope : this,
								handler : this.seeMMplan
							} : {}]
				});

		this.gridPanel = new HT.GridPanel({
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			id : 'UPlanBidPublishgrid'+this.keystr+this.buttonType,
			url : __ctxPath
					+ "/creditFlow/financingAgency/listByKeystrPlManageMoneyPlan.do?Q_keystr_S_EQ="+this.keystr+'&buttonType='+this.buttonType,
			fields : [{
						name : 'mmplanId',
						type : 'int'
					}, 'mmName', 'mmNumber', 'manageMoneyTypeId', 'keystr',
					'investScope', 'benefitWay', 'buyStartTime', 'buyEndTime',
					'startMoney', 'riseMoney', 'limitMoney',
					'startinInterestCondition', 'expireRedemptionWay',
					'chargeGetway', 'guaranteeWay', 'yeaRate', 'investlimit',
					'sumMoney', 'state', 'startinInterestTime',
					'endinInterestTime', 'investedMoney', 'bidRemark',
					'htmlPath', 'createtime', 'updatetime','authorityStatus','lockingLimit','moneyReceiver','receiverType'],
			columns : [{
						header : 'mmplanId',
						dataIndex : 'mmplanId',
						hidden : true
					}, {
						header : this.keystr=='UPlan'? 'U计划编号':'D计划编号',
						dataIndex : 'mmNumber'
					}, {
						header :this.keystr=='UPlan'? 'U计划名称':'D计划名称',
						dataIndex : 'mmName'
					},{
						header : '收款类型',
						dataIndex : 'receiverType',
						renderer:function(v){
							if(v=='pt'){
							  return "平台账户"
							}else return "注册用户"
						}
					},{
						header : '收款专户',
						dataIndex : 'moneyReceiver'
					}, {
						header : '派息授权状态',
						dataIndex : 'authorityStatus',
						renderer:function(v){
							if(v==1){
							  return "是"
							}else return "否"
						}
					}, {
						header : '计划金额',
						dataIndex : 'sumMoney',
					    align : 'right',
						renderer:function(v){
							return Ext.util.Format.number(v,',000,000,000.00')+"元";
						}
						
					},{
						header : '已购买总金额',
						dataIndex : 'investedMoney',
					    align : 'right',
						renderer:function(v){
							return Ext.util.Format.number(v,',000,000,000.00')+"元";
						}
						
					}, {
						header : '预期年化收益率',
						dataIndex : 'yeaRate',
						align : 'right',
						renderer:function(v){
							return Ext.util.Format.number(v,',000,000,000.00')+"%";
						}
					}, {
						header : '投资期限',
						dataIndex : 'investlimit',
						align : 'right',
						renderer:function(v){
							return v+"月";
						}
					},{
						header : '锁定期限',
						dataIndex : 'lockingLimit',
						align : 'right',
						renderer:function(v){
							return v+"月";
						}
					},  {
						header : '购买放开时间',
						dataIndex : 'buyStartTime'
					}, {
						header : '购买截止时间',
						dataIndex : 'buyEndTime'
					}, {
						header : '创建时间',
						dataIndex : 'createtime',
						hidden:true
					},{
					   header : '状态',
					   dataIndex : 'state',
					   renderer:function(v){
					   		if(v=='0'){
					   		  return '未发布';
					   		}else if(v=='1'){
								return '招标中';
					   		}else if(v=='2'){
					   			return '已满标';
					   		}else if(v=='4'){
					   			return '已到期';
					   		}else if(v=='7'){
					   			return '还款中';
					   		}else if(v=='-1'){
					   			return '已关闭';
					   		}else if(v=='10'){
					   			return '已完成';
					   		}
						}
					}]
				// end of columns
			});

	},// end of the initComponents()
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
	
	// 关闭
	bidclose : function() {
		var selectRs = this.gridPanel.getSelectionModel().getSelections();
		if (selectRs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择记录!');
			return;
		} else if (selectRs.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选择一条记录!');
			return;
		} else {
			var record = selectRs[0];
			if(record.data.investedMoney>0 && record.data.startinInterestCondition=='1'){
				Ext.ux.Toast.msg('操作信息', '此计划已有投资人购买，且起息模式为 "投标日起息"，故不可流标！');
			}else if(record.data.investedMoney>0 && record.data.startinInterestCondition=='2'){
				Ext.ux.Toast.msg('操作信息', '此计划已有投资人购买，且起息模式为 "投标日+1起息"，故不可流标！');
			}else{
				var url =__ctxPath	+ "/creditFlow/financingAgency/bidClosePlManageMoneyPlan.do";
				Ext.Ajax.request({
							url : url,
							method : "post",
							scope:this,
							success : function(response, opts) {
									var res = Ext.util.JSON.decode(response.responseText);
									alert("关闭成功");
									var gp=Ext.getCmp('UPlanBidPublishgrid'+this.keystr+this.buttonType);
									gp.getStore().reload();
							},
							params : {
								mmplanId : record.data.mmplanId
							}
				})
			}
		}

	},
	
	start:function(){
	
	var selectRs = this.gridPanel.getSelectionModel().getSelections();
		if (selectRs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择记录!');
			return;
		} else if (selectRs.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选择一条记录!');
			return;
		} else {
			var record = selectRs[0];
		 var startinInterestCondition=record.data.startinInterestCondition;
		 if(''!=startinInterestCondition && (1==startinInterestCondition || 2==startinInterestCondition)){
		    Ext.ux.Toast.msg('操作信息', '投标日起息以及投标日+1起息的不能进行手动起息!');
			return;
		 }else{
		    		new UPlanForm({
						mmplanId : record.data.mmplanId,
						isAllReadOnly:true,
						isHidden:false,
						keystr:this.keystr,
						state:this.state,
						isPresale:this.isPresale
		 }).show();
		 }
		
		}

	},
	
	fininsh:function(){
	var gp = this.gridPanel;
	Ext.Msg.confirm("提示!", '确定要设置状态为 成完吗？', function(btn) {
	 	if (btn == "yes") {
			var selectRs = gp.getSelectionModel().getSelections();
			if (selectRs.length == 0) {
				Ext.ux.Toast.msg('操作信息', '请选择记录!');
				return;
			} else if (selectRs.length > 1) {
				Ext.ux.Toast.msg('操作信息', '只能选择一条记录!');
				return;
			} else {
				var record = selectRs[0];
				var url =__ctxPath
						+ "/creditFlow/financingAgency/updateStatePlManageMoneyPlan.do?state=10"
				Ext.Ajax.request({
							url : url,
							method : "post",
							scope:this,
							success : function(response, opts) {
									var obj=Ext.util.JSON.decode(response.responseText);
                            		if(obj.flag=="0"){					                            			
                            			Ext.ux.Toast.msg('操作信息',"该理财计划还未派完息，不能完成");
                            		}else{
									    gp.getStore().reload();
									    Ext.ux.Toast.msg('操作信息', '设置成功!');
                            		}
									
										
							},
							params : {
								mmplanId : record.data.mmplanId
							}
						})
			}
	 	}
	});
	
	},
	//授权平台派息
	shouquanpaixi:function(){
		var selectRs = this.gridPanel.getSelectionModel().getSelections();
		if (selectRs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择记录!');
			return;
		} else if (selectRs.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选择一条记录!');
			return;
		} else {
			var record = selectRs[0];
			//已授权的不能再次进行授权
			if(record.data.authorityStatus==1){
				Ext.ux.Toast.msg('操作信息', '已授权的不能进行再次授权！');
			}else{
				var url = __ctxPath
					+ "/creditFlow/financingAgency/autoAuthorityPlManageMoneyPlan.do?mmplanId="+record.data.mmplanId;
				window.open(url,'平台普通资金账户充值',
							'top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no',
							'_blank');
			}
		}
	},
	seeMMplan:function(){
		var keystr=this.keystr;
		var selectRs = this.gridPanel.getSelectionModel().getSelections();
			if (selectRs.length == 0) {
				Ext.ux.Toast.msg('操作信息', '请选择记录!');
				return;
			} else if (selectRs.length > 1) {
				Ext.ux.Toast.msg('操作信息', '只能选择一条记录!');
				return;
			} else {
				var record = selectRs[0];
					new UPlanForm({
							mmplanId : record.data.mmplanId,
							isAllReadOnly:true,
							isHidden:true,
							seeHidden:false,
							jxqrReadOnly:true,
							seeIsCreateIntent : true,
							keystr : keystr
			 		}).show();
			}
	},
		// 发布
	publish : function() {
		var gp = this.gridPanel;
		var selectRs = this.gridPanel.getSelectionModel().getSelections();
		if (selectRs.length == 0) {
			Ext.ux.Toast.msg('操作信息', '请选择记录!');
			return;
		} else if (selectRs.length > 1) {
			Ext.ux.Toast.msg('操作信息', '只能选择一条记录!');
			return;
		} else {
			var record = selectRs[0];
			var url =__ctxPath
					+ "/creditFlow/financingAgency/previewPublishPlManageMoneyPlan.do"
			Ext.Ajax.request({
						url : url,
						method : "post",
						scope:this,
						success : function(response, opts) {
								var res = Ext.util.JSON.decode(response.responseText);
								Ext.ux.Toast.msg('操作信息', "发布成功");
								gp.getStore().reload();
						},
						params : {
							mmplanId : record.data.mmplanId,
							isPublish:true
						}
			})
		}

	},
	//导出到Excel
	toExcelPlan : function(){
		debugger
		alert(this.State)
	    var keystr='UPlan';
		var state=this.State;
		var mmNumber=this.searchPanel.getCmpByName('mmNumber').getValue();
		var mmName=this.searchPanel.getCmpByName('mmName').getValue();
		window.open(__ctxPath + "/creditFlow/financingAgency/toExcelListPlManageMoneyPlanBuyinfo.do?"
		        +"keystr="+keystr
		        +"&state="+state
				+"&mmNumber="+mmNumber
				+"&mmName="+mmName
		);
	}
});
