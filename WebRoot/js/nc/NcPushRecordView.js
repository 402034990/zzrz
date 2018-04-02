/**
 * @author
 * @class NcPushRecordView
 * @extends Ext.Panel
 * @description [UPushRecord]管理
 * @company 智维软件
 * @createtime:
 */
NcPushRecordView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				NcPushRecordView.superclass.constructor.call(this, {
							id : 'NcPushRecordView',
							title : 'NC推送记录查询',
							region : 'center',
							layout : 'border',
							iconCls :'btn-team2',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				this.searchPanel=new HT.SearchPanel({
							layout : 'form',
							region : 'north',
							items:[
								{
									border : false,
									layout : 'column',
									items:[
										{
											columnWidth : .2,
											labelAlign : 'right',
											xtype : 'container',
											layout : 'form',
											labelWidth : 60,
											defaults : {
												anchor : '100%'
											},
											items:[{
												fieldLabel:'操作类型',
												name : 'serviceType',
												hiddenName: 'serviceType',
												xtype:'combo',
												mode : 'local',
											    displayField : 'itemName',
											    valueField : 'itemId',
											    triggerAction : "all",
											    editable : false,
												store:new Ext.data.SimpleStore({
													fields:["itemName","itemId"],
													data:[
														["放款","hry_1000"],
														["还款","hry_1001"],
														["保证金收取","hry_1002"],
														["保证金退还","hry_1003"],
														["手续费收取","hry_1004"],
														["客户新增","hry_1005"],
														["保证人新增","hry_1006"],
														["撤销记账","hry_1009"]
													]
												})
												}]
										},{	
											columnWidth : .2,
											labelAlign : 'right',
											xtype : 'container',
											layout : 'form',
											labelWidth : 60,
											defaults : {
												anchor : '100%'
											},
											items:[{
												fieldLabel:'创建时间',
												name : 'createDate',
												xtype:'datefield',
												format:'Y-m-d'
											}]
										},{
											columnWidth : .2,
											labelAlign : 'right',
											xtype : 'container',
											layout : 'form',
											labelWidth : 80,
											defaults : {
												anchor : '100%'
											},
											items:[{
												fieldLabel:'是否推送成功',
												name : 'returnCode',
												hiddenName: 'returnCode',
												xtype:'combo',
												mode : 'local',
											    displayField : 'itemName',
											    valueField : 'itemId',
											    triggerAction : "all",
											    editable : false,
												store:new Ext.data.SimpleStore({
													fields:["itemName","itemId"],
													data:[
														["成功","200"],
														["失败","400"],
														["已记账，不可删除","300"]
													]
												})
												}]
										},{
											columnWidth : .2,
											labelAlign : 'right',
											xtype : 'container',
											layout : 'form',
											labelWidth : 60,
											defaults : {
												anchor : '100%'
											},
											items:[{
												fieldLabel:'是否有效',
												name : 'state',
												hiddenName: 'state',
												xtype:'combo',
												mode : 'local',
											    displayField : 'itemName',
											    valueField : 'itemId',
											    triggerAction : "all",
											    editable : false,
												store:new Ext.data.SimpleStore({
													fields:["itemName","itemId"],
													data:[
														["无效","1"],
														["有效","2"]
													]
												})
												}]
										},{
											columnWidth : .1,
											xtype : 'container',
											layout : 'form',
											defaults : {
												xtype : 'button'
											},
											style : 'padding-left:10px;',
											items : [{
												text : '查询',
												scope : this,
												iconCls : 'btn-search',
												handler : this.search
											}]
											},{
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
										}
									]
								
								}
							]	
				});// end of searchPanel

				this.topbar = new Ext.Toolbar({
						items : [{
									iconCls : 'btn-autos',
									text : '手动推送',
									xtype : 'button',
									scope : this,
									handler : this.manualPush
								}]
				});
	
				this.gridPanel=new HT.GridPanel({
					region:'center',
					tbar:this.topbar,
					//使用RowActions
					id:'UPushRecordGrid',
					url : __ctxPath + "/nc/listAllNcPushRecord.do",
					fields : [{
						name : 'id',
						type : 'int'
					}
						,'serviceType'
						,'pushData'
						,'requestNo'
						,'pushNumber'
						,'pushUserName'
						,'pushUserId'
						,'createDate'
						,'updateDate'
						,'returnCode'
						,'returnMsg'
						,'returnDate'
						,'state'
						,'insideId'
					],
					columns:[
						{
							header : 'id',
							dataIndex : 'id',
							hidden : true
						},{
							header : '操作类型',	
							dataIndex : 'serviceType',
							renderer:function(v){
								if(v=='hry_1000'){
									return "放款";
								}else if(v=='hry_1001'){
									return "还款";
								}else if(v=='hry_1002'){
									return "保证金收取";
								}else if(v=='hry_1003'){
									return "保证金退还";
								}else if(v=='hry_1004'){
									return "手续费收取";
								}else if(v=='hry_1005'){
									return "客户新增";
								}else if(v=='hry_1006'){
									return "保证人新增";
								}else if(v=='hry_1009'){
									return "撤销记账";
								}else{
									return "未知";
								}
							}
						},{
							header : '推送数据包',	
							dataIndex : 'pushData'
						},{
							header : '请求流水号',	
							dataIndex : 'requestNo'
						},{
							header : '请求次数',	
							dataIndex : 'pushNumber'
						},{
							header : '推送人',	
							dataIndex : 'pushUserName'
						},{
							header : '创建日期',	
							dataIndex : 'createDate'
						},{
							header : '修改日期',	
							dataIndex : 'updateDate'
						},{
							header : '返回码',	
							dataIndex : 'returnCode'
						},{
							header : '是否推送成功',	
							dataIndex : 'returnCode',
							renderer:function(v){
								if(v==200){
									return "成功";
								}else if(v==400){
									return "失败";
								}else if(v==300){
									return "已记账，不可删除";
								}else{
									return "失败";
								}
							}
						},{
							header : '是否有效',	
							dataIndex : 'state',
							renderer:function(v){
								if(v==1){
									return "无效（撤销对账）";
								}else if(v==2){
									return "有效";
								}else{
									return "未知";
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
			},
			//创建记录
			createRs : function() {
				new NcPushRecordForm().show();
			},
			//编辑Rs
			editRs : function(record) {
				new NcushRecordForm({
					id : record.data.id
				}).show();
			},
			
			//手动推送NC
			manualPush : function(record){
				var grid = this.gridPanel;
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息', '请选中任何一条记录');
					return false;
				} else if (s.length > 1) {
					Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
					return false;
				} else {
					var id = s[0].data.id;
					if(s[0].data.returnCode != '200' && s[0].data.returnCode != '300'){
						Ext.Msg.confirm('信息确认', '确定要推送吗？', function(btn) {
							if (btn == 'yes') {
								Ext.MessageBox.wait('正在操作','请稍后...');//锁屏
								Ext.Ajax.request({
									url : __ctxPath+'/nc/manualPushNcPushRecord.do',
									params : {
										id : id
									},
									method : 'post',
									success : function(response, request) {
										var obj = Ext.util.JSON.decode(response.responseText);
										if(obj.success==true){
											Ext.ux.Toast.msg('提示', obj.msg);
										}
										grid.getStore().reload();
										Ext.MessageBox.hide();//解除锁屏
									},
									failure : function(response) {
										Ext.ux.Toast.msg('提示', '操作失败，请重试');
										Ext.MessageBox.hide();//解除锁屏
									}
								})
							}
						})
					}else{
						Ext.ux.Toast.msg('提示', '此记录为推送成功记录，不可再次推送！');
					}
				}
			}
});
