/**
 * @author
 * @createtime
 * @class ProcreditMortgageCarGpsForm
 * @extends Ext.Window
 * @description ProcreditMortgageCarGpsForm表单
 * @company 互融软件
 */
ProcreditMortgageCarGpsForm = Ext.extend(Ext.Window, {
	businessType : 'SmallLoan',
	operationType : 'SmallLoanBusiness',
	proType : null,
	proIdupload : null,
	isAllReadOnly:null,
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		if(_cfg.proType != 'underfined'){
			this.proType=_cfg.proType
		}
		if(_cfg.isAllReadOnly != 'underfined'){
			this.isAllReadOnly=_cfg.isAllReadOnly
		}
		if(_cfg.mortgageId != 'underfined'){
			this.mortgageId=_cfg.mortgageId
		}
		if(_cfg.projectId != 'underfined'){
			this.projectId=_cfg.projectId
		}
		if(_cfg.proIdupload != 'underfined'){
			this.proIdupload=_cfg.proIdupload
		}
		// 必须先初始化组件
		this.initUIComponents();
		ProcreditMortgageCarGpsForm.superclass.constructor.call(this, {
					id : 'ProcreditMortgageCarGpsFormWin',
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					autoScroll : true,
					height : 300,
					width : 660,
					maximizable : true,
					title : 'GPS信息',
					buttonAlign : 'center',
					buttons : [{
								text : '提交',
								iconCls : 'btn-save',
								scope : this,
								hidden:this.isAllReadOnly,
								handler : this.submit
							}, {
								text : '保存',
								iconCls : 'btn-reset',
								scope : this,
								hidden:this.isAllReadOnly,
								handler : this.save
							}, {
								text : this.isAllReadOnly=true?'关闭':'取消',
								iconCls : 'btn-cancel',
								scope : this,
								hidden:false,
								handler : this.cancel
							}]
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
	
	    /* this.carGpsForm = new CarGpsForm({
					projectId : this.projectId,
					isAllReadOnly : this.isAllReadOnly
				});*/
		
		this.carGpsView = new CarGpsView({
			projectId : this.projectId,
			mortgageId : this.mortgageId,
			isEite:this.isEite,
//			gpsAdd:this.gpsAdd,
			isAllReadOnly : this.isAllReadOnly
		});
		this.SlMortgageCarGps = new SlMortgageCarGpsMaterialsView({
					projectId : this.projectId,
					isHidden :this.isHidden,
					mortgageId:this.mortgageId,
					businessType : this.businessType,
					isAllReadOnly :this.isAllReadOnly,
					objectType : 'mortgage'
				});
	
		this.formPanel = new Ext.FormPanel({
			id : 'ProcreditMortgageCarGpsForm',
			//title : 'GPS信息',
			autoHeight : true,
			autoWidth : true,
			layout : 'column',
			bodyStyle : 'padding:10px',
			border : false,
			autoScroll : true,
			frame : true,
			labelAlign : 'right',
			defaults : {
				anchor : '96%',
				labelWidth : 60
			},
			items : [{
						xtype : 'fieldset',
						collapsible : true,
						autoHeight : true,
						bodyStyle : 'padding: 5px',
						title : 'GPS安装',
						columnWidth : 1, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						items : [this.carGpsView]
					}/*,{
						xtype : 'fieldset',
						collapsible : true,
						autoHeight : true,
						bodyStyle : 'padding: 5px',
						title : '承诺函上传',
						columnWidth : 1, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						items : [this.SlMortgageCarGps]
					}*/]
		});
		// 加载表单对应的数据
			if(null!=this.projectId && null!=this.businessType && null!=this.isIntentionCar){
			var url=__ctxPath +'/credit/mortgage/getMortgageByCar.do?projectId='+ this.projectId+'&businessType='+this.businessType+'&mortgageId='+this.mortgageId
			this.loadData({
				url : url,
				root : 'data',
				preName : ['procreditMortgageCar','procreditMortgage'],
				scope : this,
				success : function(response, options) {
					var respText = response.responseText;
				    var alarm_fields = Ext.util.JSON.decode(respText);
				}
			});
		}

	},// end of the initcomponents

	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	save : function() {
		    var gridPanel = this.gp;
		   	this.formPanel.getForm().submit({
		    clientValidation: false, 
			url : __ctxPath +'/credit/mortgage/saveMortgage.do',
			params : {
				'projectId':this.projectId
			},
			method : 'post',
			waitMsg : '数据正在提交，请稍后...',
			scope: this,
			success : function(fp, action) {
				var object = Ext.util.JSON.decode(action.response.responseText)
				Ext.ux.Toast.msg('操作信息', '保存信息成功!');
				
				this.destroy();
				if(null!=gridPanel){
					gridPanel.getStore().reload();
				}
			},
			failure : function(fp, action) {
				Ext.MessageBox.show({
					title : '操作信息',
					msg : '信息保存出错，请联系管理员！',
					buttons : Ext.MessageBox.OK,
					icon : 'ext-mb-error'
				});
			}
		});
		
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		this.close();
	},
	/**
	 * 保存记录
	 */
	submit : function() {
	        var  formPanel=this.formPanel;
		    var  projectId=this.projectId;
		    var  type=this.type;
		    var  gridPanel = this.gp;
		    var win=this;
			Ext.Msg.confirm('信息确认', '是否确认提交', function(btn) {
		    if (btn == 'yes') {
		    	formPanel.getForm().submit({
		        clientValidation: false, 
			    url : __ctxPath + '/credit/mortgage/saveMortgage.do',
			    params : {
				'projectId':projectId,
				'type':type,
				'flag':0
			 },
			   method : 'post',
			   waitMsg : '数据正在提交，请稍后...',
			   scope: this,
			  success : function(fp, action) {
				var object = Ext.util.JSON.decode(action.response.responseText)
				Ext.ux.Toast.msg('操作信息', '保存信息成功!');
			/*	if(null!=gridPanel && typeof(gridPanel)!="undefined"){
					gridPanel.save()
				}
				if(null!=conGridPanel && typeof(conGridPanel)!='undefined'){
					conGridPanel.getStore().reload()
				}*/
				win.destroy();
				if(null!=gridPanel){
					gridPanel.getStore().reload();
				}
			},
			failure : function(fp, action) {
				Ext.MessageBox.show({
					title : '操作信息',
					msg : '信息保存出错，请联系管理员！',
					buttons : Ext.MessageBox.OK,
					icon : 'ext-mb-error'
				});
			}
		});
								
					       		 }
 								})
		
	}
  

});