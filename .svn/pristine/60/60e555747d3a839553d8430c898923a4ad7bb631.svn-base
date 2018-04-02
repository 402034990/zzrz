/**
 * @extends Ext.Panel
 * @description 贷款本息实收明细表
 */
ReportPlBidIntentExpire = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ReportPlBidIntentExpire.superclass.constructor.call(this, {
			id : 'ReportPlBidIntentExpire'+this.reportKey,
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
						url : __ctxPath + '/system/intentExpireInternetReport.do?reportKey='+reportKey,
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
		var endDate = new Date(firstDate);
		endDate.setMonth(firstDate.getMonth()+1);
		endDate.setDate(0);

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
				items : [ {
					labelWidth:70,    
					fieldLabel : '查询日期起',
					name : 'intentDate_GE',
					xtype :'datefield',
					anchor : '100%',
					format : 'Y-m-d',
					value:firstDate
				}] 
			},{ 
				columnWidth : .15,
				layout : 'form',
				border : false,
				labelAlign : 'right',
				style : 'padding-left:15px;',
				labelWidth:15,
				items : [{
					fieldLabel : '至',
					name : 'intentDate_LE',
					xtype :'datefield',
					anchor : '90%',
					format : 'Y-m-d',
					value:endDate
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
							Ext.getCmp('reportSearchPanel'+this.reportKey).getForm().submit({
								waitMsg : '正在提交查询',
								url : __ctxPath + '/system/intentExpireInternetReport.do?reportKey='+reportKey,
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
					}
				}]
			}]
		});
		
		var panel=Ext.getCmp('reportSearchPanel'+reportKey);
		
		pdfButton.on('click', function(xlsButton) {
			if (panel.getForm().isValid()) {
				panel.getForm().submit({
					waitMsg : '正在提交查询',
					url : __ctxPath + '/system/intentExpireInternetReport.do?reportKey='+reportKey,
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
					url : __ctxPath + '/system/intentExpireInternetReport.do?reportKey='+reportKey,
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
					url : __ctxPath + '/system/intentExpireInternetReport.do?reportKey='+reportKey,
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