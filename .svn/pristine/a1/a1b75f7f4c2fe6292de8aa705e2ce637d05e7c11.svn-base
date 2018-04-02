/**
 * @extends Ext.Panel
 * @description 线下推荐明细表(一级、二级)
 */
Recommend = Ext.extend(Ext.Panel, {
	// 构造函数
	url:null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		this.url=__ctxPath + '/system/recommendOfflineRecommend.do?reportKey='+this.reportKey;
		Recommend.superclass.constructor.call(this, {
			id : 'Recommend'+this.reportKey,
			title : this.title,
			region : 'center',
			layout : 'anchor',
			iconCls : 'menu-report',
			items : [searchPanel,this.toolbar,{
				id : 'reportTemp' + this.reportKey,
				autoHeight : false,
				autoWidth : false,
				autoScroll : true,
				border : false,
				xtype : 'panel',
				height : 478
			}],
			listeners : {
				'afterrender' : function(v) {
					var reportKey=this.reportKey;
					Ext.getCmp('reportSearchPanel'+this.reportKey).getForm().submit({
						waitMsg : '正在提交查询',
						url : this.url,
						method : 'post',
						success : function(form, action) {
							var object = Ext.util.JSON.decode(action.response.responseText)
							var temp = Ext.getCmp('reportTemp' + reportKey);
							temp.body.update('<iframe src="'+ __ctxPath+ '/report/reportTemplate.jsp?'
							+ encodeURI(encodeURI(object.data))+ '" height="98%" width="98%" scrolling="auto"></iframe>');
						}
					});
				}
			}
		});
	},
	// 初始化组件
	initUIComponents : function() {
		var firstDate = new Date();
		firstDate.setDate(1);

		var reportKey=this.reportKey;
		
		var pdfButton = new Ext.Button({
			text : 'pdf',
			iconCls : 'btn-pdf'
		});
		var htmlButton = new Ext.Button({
			text : 'html',
			iconCls : 'btn-ie'
		});
		var xlsButton = new Ext.Button({
			text : 'excel',
			iconCls : 'btn-xls'
		});
		
		this.toolbar = new Ext.Toolbar({
			autoWidth : true,
			layout : 'hbox',
			defaults : {
				anchor : '10%,10%'
			},
			items : [pdfButton,xlsButton, htmlButton]
		});

		searchPanel = new HT.SearchPanel({
			id : 'reportSearchPanel' + reportKey,
			layout : 'column',
			region : 'north',
			height : 20,
			anchor : '100%',
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
			items : [{ 
				columnWidth : .2,
				layout : 'form',
				border : false,
				labelAlign : 'right',
				labelWidth:40,    
				items : [ {
					fieldLabel : '姓名',
					name : 'userName',
					xtype :'textfield',
					anchor : '100%'
				}] 
			},{ 
				columnWidth : .2,
				layout : 'form',
				border : false,
				labelAlign : 'right',
				labelWidth:40,    
				items : [ {
					fieldLabel : '推荐码',
					name : 'plainpassword',
					xtype :'textfield',
					anchor : '100%'
				}] 
			},{ 
				columnWidth : .2,
				layout : 'form',
				border : false,
				labelAlign : 'right',
				labelWidth:60,    
				items : [ {
					fieldLabel : '查询日期',
					name : 'investDateGE',
					xtype :'datefield',
					anchor : '100%',
					format : 'Y-m-d',
					value:firstDate
				}] 
			},{ 
				columnWidth : .18,
				layout : 'form',
				border : false,
				labelAlign : 'right',
				style : 'padding-left:15px;',
				labelWidth:20,
				items : [{
					fieldLabel : '至',
					name : 'investDateLE',
					xtype :'datefield',
					anchor : '100%',
					format : 'Y-m-d',
					value:firstDate
				}] 
			},{
				columnWidth : .07,
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
					handler:function(){
						if (Ext.getCmp('reportSearchPanel'+this.reportKey).getForm().isValid()) {
							var investDateGE=this.getCmpByName('investDateGE');
							var investDateLE=this.getCmpByName('investDateLE');
							if(""==investDateGE.getValue() || ""==investDateLE.getValue()){
								Ext.ux.Toast.msg('操作信息', '日期条件不能为空,请重新填写!');
								return false;
							}
							Ext.getCmp('reportSearchPanel'+this.reportKey).getForm().submit({
								waitMsg : '正在提交查询',
								url :this.url,
								method : 'post',
								success : function(form, action) {
									var object = Ext.util.JSON.decode(action.response.responseText)
									var temp = Ext.getCmp('reportTemp' + reportKey);
									temp.body.update('<iframe src="'+ __ctxPath+ '/report/reportTemplate.jsp?'
									+ encodeURI(encodeURI(object.data))+ '" height="98%" width="98%" scrolling="auto"></iframe>');
								}
							});
						}
					}
				}]
			},{
				columnWidth : .07,
				xtype : 'container',
				layout : 'form',
				defaults : {
					xtype : 'button'
				},
				style : 'padding-left:10px;',
				items : [{
					text : '重置',
					scope : this,
					iconCls : 'reset',
					handler:function(){
						Ext.getCmp('reportSearchPanel'+this.reportKey).getForm().reset();
						var investDateGE=this.getCmpByName('investDateGE');
						var investDateLE=this.getCmpByName('investDateLE');
						investDateGE.setValue(firstDate);
						investDateLE.setValue(firstDate);
					}
				}]
			}]
		});
		
		var panel=Ext.getCmp('reportSearchPanel'+reportKey);
		
		pdfButton.on('click', function(xlsButton) {
			if (panel.getForm().isValid()) {
				panel.getForm().submit({
					waitMsg : '正在提交查询',
					url : this.url,
					method : 'post',
					success : function(form, action) {
						var object = Ext.util.JSON.decode(action.response.responseText)
						document.location.href = __ctxPath+ '/report/reportTemplate.jsp?'
								+ encodeURI(encodeURI(object.data))+ '&reportType=pdf';
					}
				});
			}
		}, this);
			
		htmlButton.on('click', function(htmlButton) {
			if (panel.getForm().isValid()) {
				panel.getForm().submit({
					waitMsg : '正在提交查询',
					url : this.url,
					method : 'post',
					success : function(form, action) {
						var object = Ext.util.JSON.decode(action.response.responseText)
						window.open(__ctxPath+ '/report/reportTemplate.jsp?'
						+ encodeURI(encodeURI(object.data))+ '&reportType=html','blank');
					}
				});
			}
		 }, this);
			
		 xlsButton.on('click', function(xlsButton) {
			if (panel.getForm().isValid()) {
				panel.getForm().submit({
					waitMsg : '正在提交查询',
					url : this.url,
					method : 'post',
					success : function(form, action) {
						var object = Ext.util.JSON.decode(action.response.responseText)
						document.location.href = __ctxPath+ '/report/reportTemplate.jsp?'
								+ encodeURI(encodeURI(object.data))+ '&reportType=xls';
					}
				});
			}
		}, this);
	}
});