/**
 * @author 
 * @createtime 
 * @class CsPersonCreditRecordForm
 * @extends Ext.Window
 * @description CsPersonCreditRecord表单
 * @company 智维软件
 */
CsPersonCreditRecordForm = Ext.extend(Ext.Window, {
	//构造函数
	constructor : function(_cfg) {
		if (typeof(_cfg.id) != "undefined") {
			this.id = _cfg.id;
		}
		if (typeof(_cfg.json) != "undefined") {
			this.json = _cfg.json;
		}
		Ext.applyIf(this, _cfg);
		//必须先初始化组件
		this.initUIComponents();
		CsPersonCreditRecordForm.superclass.constructor.call(this, {
					id : 'CsPersonCreditRecordFormWin'+this.id,
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 400,
					width : 550,
					maximizable : true,
					//title : '[CsPersonCreditRecord]详细信息',
					title : '百融金融返回源码',
					buttonAlign : 'center',
					buttons : [/*{
								text : '保存',
								iconCls : 'btn-save',
								scope : this,
								handler : this.save
							}, {
								text : '重置',
								iconCls : 'btn-reset',
								scope : this,
								handler : this.reset
							}, {
								text : '取消',
								iconCls : 'btn-cancel',
								scope : this,
								handler : this.cancel
							}*/]
				});
	},//end of the constructor
	//初始化组件
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
					layout : 'form',
					bodyStyle : 'padding:10px',
					border : false,
					autoScroll : true,
					//id : 'CsPersonCreditRecordForm',
					defaults : {
						anchor : '96%,96%'
					},
					defaultType : 'textfield',
					items : [{
								fieldLabel : '项目编号',
								name : 'csPersonCreditRecord.projectId',
								value:this.json.projectId
							}, {
								fieldLabel : '接口类型',
								name : 'csPersonCreditRecord.personId',
								value:this.json.type
							}, {
								fieldLabel : '接口名称',
								name : 'csPersonCreditRecord.nameKey',
								value:this.json.interfaceSign
							},{
								fieldLabel:'请求时间',
								value:this.json.reqDate
							}, {
								fieldLabel : '接口参数',
								name : 'csPersonCreditRecord.nameValue',
								xtype : 'textarea',
								height:200,
								maxLength : 65535,
								value:this.json.nameValue,
								renderer : function(v){
									return JSON.stringify(JSON.parse(v), null, 4);
								},
								listeners : {
									scope : this,
									afterrender : function(obj) {
									
										this.getCmpByName('csPersonCreditRecord.nameValue').setValue(JSON.stringify(JSON.parse(obj.value), null, 4));
									}
								}
							}]
				});
		//加载表单对应的数据	
		/*if (this.id != null && this.id != 'undefined') {
			this.formPanel.loadData({
				url : __ctxPath
						+ '/creditFlow/creditRecord/getCsPersonCreditRecord.do?id='
						+ this.id,
				root : 'data',
				preName : 'csPersonCreditRecord'
			});
		}*/

	},//end of the initcomponents

	/**
	 * 重置
	 * @param {} formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * @param {} window
	 */
	cancel : function() {
		this.close();
	},
	/**
	 * 保存记录
	 */
	save : function() {
		$postForm({
					formPanel : this.formPanel,
					scope : this,
					url : __ctxPath
							+ '/creditFlow/creditRecord/saveCsPersonCreditRecord.do',
					callback : function(fp, action) {
						var gridPanel = Ext.getCmp('CsPersonCreditRecordGrid');
						if (gridPanel != null) {
							gridPanel.getStore().reload();
						}
						this.close();
					}
				});
	}//end of save

});