/**
 * @author
 * @class BpCustMemberView
 * @extends Ext.Panel
 * @description [BpCustMember]管理
 * @company 智维软件
 * @createtime:
 */
BpCustMemberView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				BpCustMemberView.superclass.constructor.call(this, {
							id : 'BpCustMemberView_'+this.isForBidType,
							title : this.isForBidType==1?'禁用用户管理':'注册会员管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				this.searchPanel=new HT.SearchPanel({
							layout : 'column',
							autoScroll : true,
							region : 'north',
							
							border : false,
							height : 50,
							anchor : '80%',
							layoutConfig: {
				               align:'middle'
				            },
				             bodyStyle : 'padding:10px 10px 10px 10px',
							items:[{
					     		columnWidth :.2,
								layout : 'form',
								labelWidth : 80,
								labelAlign : 'right',
								border : false,
								items : [{
											fieldLabel:'用户名',
											name : 'Q_loginname_S_LK',
											flex:1,
											anchor : "90%",
											xtype : 'textfield'
											}]
					     	},{
					     		columnWidth :.2,
								layout : 'form',
								labelWidth : 80,
								labelAlign : 'right',
								border : false,
								items : [{
											fieldLabel:'真实姓名',
											name : 'Q_truename_S_LK',
											flex:1,
											anchor : "90%",
											xtype : 'textfield'
										}]
				     	},{
				     		columnWidth :.2,
							layout : 'form',
							labelWidth : 80,
							labelAlign : 'right',
							border : false,
							items : [{
											fieldLabel:'手机号码',
											name : 'Q_telphone_S_LQ',
											flex:1,
											anchor : "90%",
											xtype : 'textfield'
										}]
				     	},{
			     		columnWidth :.2,
						layout : 'form',
						labelWidth : 80,
						labelAlign : 'right',
						border : false,
						items : [{
										fieldLabel:'证件号码',
										name : 'Q_cardcode_S_LQ',
										flex:1,
										anchor : "90%",
										xtype : 'textfield'
									}]
			     	},{
		     			columnWidth :.1,
						layout : 'form',
						border : false,
						labelWidth :50,
						items :[{
							text : '查询',
							xtype : 'button',
							scope : this,
							style :'margin-left:30px',
							anchor : "90%",
							iconCls : 'btn-search',
							handler : this.search
						}]
		     		},{
		     			columnWidth :.1,
						layout : 'form',
						border : false,
						labelWidth :50,
						items :[{
							text : '重置',
							style :'margin-left:30px',
							xtype : 'button',
							scope : this,
							//width : 40,
							anchor : "90%",
							iconCls : 'btn-reset',
							handler : this.reset
						}]
		     		}]
								
				});// end of searchPanel

				this.topbar = new Ext.Toolbar({
						items : [ {
									iconCls : 'btn-del',
									text : '修改密码',
									xtype : 'button',
									scope:this,
									hidden:this.isForBidType==1?true:false,
									handler : this.updatePassword
								},{
									iconCls : 'btn-edit',
									text : '禁用用户',
									xtype : 'button',
									scope:this,
									hidden:this.isForBidType==1?true:false,
									handler : this.forbiddenSelRs
								},{
									iconCls : 'btn-edit',
									text : '解除禁用',
									xtype : 'button',
									scope:this,
									hidden:this.isForBidType==1?false:true,
									handler : this.refrshforbidden
								}]
				});
	
				this.gridPanel=new HT.GridPanel({
					region:'center',
					tbar:this.topbar,
					autoScroll : true,
					viewConfig:{
						   forceFit:false,
						   width:500,   //固定宽度
						   autoScroll:true
						},


					
					//使用RowActions
					//rowActions:true,
					id:'BpCustMemberGrid',
					url : __ctxPath + "/p2p/listBpCustMember.do?isForBidType="+this.isForBidType,
					fields : [{
									name : 'id',
									type : 'int'
								}
								,'loginname'
								,'truename'
								,'password'
								,'plainpassword'
								,'telphone'
								,'email'
								,'type'
								,'sex'
								,'sexname'
								,'cardtype'
								,'cardtypename'
								,'cardcode'
								,'birthday'
								,'headImage'
								,'nativePlaceProvice'
								,'nativePlaceCity'
								,'nation'
								,'homePhone'
								,'relationAddress'
								,'postCode'
								,'QQ'
								,'MSN'
								,'paymentCode'
								,'securityQuestion'
								,'securityAnswer'
								,'roleId'
								,'registrationDate'
								,'liveProvice'
								,'liveCity'
								,'marry'
								,'fax'
								,'memberOrderId'
								,'isDelete'
								,'isForbidden'
								,'memberGrade'
								,'directReferralsName'
								,'indirectReferenceName'
								,'score'
								,'categoryName'
                                ,'registrationDate'
                                ,'levelMark'
																																			],
					columns:[
								{
									header : 'id',
									dataIndex : 'id',
									hidden : true
								},{
									header : '登录名',	
									dataIndex : 'loginname'
										,width:100	

								},{
									header : '真实姓名',	
									dataIndex : 'truename'
										,width:70
								},{
									header : '手机号码',	
									dataIndex : 'telphone'
										,width:100
								},{
									header : '性别',	
									dataIndex : 'sexname'
										,width:40
								},{
									header : '证件类型',	
									dataIndex : 'cardtypename'
										,width:70
								},{
									header : '证件号码',	
									dataIndex : 'cardcode'
										,width:140
								},{
									header : '出生日期',	
									dataIndex : 'birthday',
									
									format : 'Y-m-d'
										,width:120
								},{
									header : '民族',	
									dataIndex : 'nation',
									hidden : true
									
									,width:50
								},{
									header : '家庭电话',	
									dataIndex : 'homePhone',
									hidden : true
								},{
									header : '是否禁用',	
									dataIndex : 'isForbidden',
									renderer:function(v){
										if(eval(v)==eval(1)){
											return "是";
										}else{
											return "否";
										}
										
								    },
								   width:70
								}/*,{
									header : '会员类别',	
									dataIndex : 'categoryName'
										,width:70
								}*/,{
									header : '会员等级',	
									dataIndex : 'levelMark'
										,width:100
								},{
									header : '会员积分',	
									dataIndex : 'score'
										,width:70
								},{
									header : '一级推荐人',	
									dataIndex : 'directReferralsName'
										,width:70
								},{
									header : '二级推荐人',	
									dataIndex : 'indirectReferenceName'
										,width:70
								},{
									header : '注册时间',	
									dataIndex : 'registrationDate'
										,width:120
								}
																																								, new Ext.ux.grid.RowActions({
									/*header:'管理',
									width:100,
									actions:[{
											 iconCls:'btn-del',qtip:'删除',style:'margin:0 3px 0 3px'
										},{
											 iconCls:'btn-edit',qtip:'编辑',style:'margin:0 3px 0 3px'
										},{
											 iconCls:'btn-forbidden',qtip:'禁用',style:'margin:0 3px 0 3px'
										}
									],
									listeners:{
										scope:this,
										'action':this.onRowAction
									}*/
								})
					]//end of columns
				});
				
				//this.gridPanel.addListener('rowdblclick',this.rowClick);
					
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
			//GridPanel行点击处理事件
			/*rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new BpCustMemberForm({id:rec.data.id}).show();
				});
			},*/
			//创建记录
			createRs : function() {
				new BpCustMemberForm().show();
			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/p2p/multiDelBpCustMember.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/p2p/multiDelBpCustMember.do',
					grid:this.gridPanel,
					idName:'id'
				});
			},
			//按ID禁用记录
			forbiddenRs : function(id) {
				$postForbi({
					url:__ctxPath+ '/p2p/multiForbiBpCustMember.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID禁用
			forbiddenSelRs : function() {
				var  flashPanel=this.gridPanel;
				var  isForBidType=this.isForBidType;
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息', '请选中任何一条记录');
					return false;
				} else if (s.length > 1) {
					Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
					return false;
				} else {
					Ext.Msg.confirm('确认信息', '您真的要将'+s[0].data.loginname+"用户禁用", function(btn) {
						if (btn == 'yes') {
							Ext.Ajax.request({
						url : __ctxPath + '/p2p/multiForbiBpCustMember.do',
						method : 'POST',
						scope:this,
						success :function(response, request){
							flashPanel.getStore().reload();
						},
						params : {
							ids:s[0].data.id,
							isForBidType:1
						}
			       })
						}
					})
				}
			},
			updatePassword:function(){
				var  flashPanel=this.gridPanel;
				var  isForBidType=this.isForBidType;
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息', '请选中任何一条记录');
					return false;
				} else if (s.length > 1) {
					Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
					return false;
				} else {
					new UpdatePassword({record:s[0].data}).show();
				}
			},
			//把选中ID禁用
			refrshforbidden : function() {
				var  flashPanel=this.gridPanel;
				var  isForBidType=this.isForBidType;
				var s = this.gridPanel.getSelectionModel().getSelections();
				if (s <= 0) {
					Ext.ux.Toast.msg('操作信息', '请选中任何一条记录');
					return false;
				} else if (s.length > 1) {
					Ext.ux.Toast.msg('操作信息', '只能选中一条记录');
					return false;
				} else {
					Ext.Msg.confirm('确认信息', '您真的要将'+s[0].data.loginname+"用户解除禁用", function(btn) {
						if (btn == 'yes') {
							Ext.Ajax.request({
						url : __ctxPath + '/p2p/multiForbiBpCustMember.do',
						method : 'POST',
						scope:this,
						success :function(response, request){
							flashPanel.getStore().reload();
						},
						params : {
							ids:s[0].data.id,
							isForBidType:0
						}
			       })
						}
					})
				}
			},
			//编辑Rs
			editRs : function(record) {
				new BpCustMemberForm({
					id : record.data.id
				}).show();
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.id);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					case 'btn-forbidden' :
						this.forbiddenRs.call(this,record.data.id);
						break;
					default :
						break;
				}
			}
});
