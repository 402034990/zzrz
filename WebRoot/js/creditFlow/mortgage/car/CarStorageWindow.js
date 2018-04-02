CarStorageWindow = Ext.extend(Ext.Window, {
	layout : 'anchor',
	anchor : '100%',
	constructor : function(_cfg) {
		if (typeof(_cfg.carId) != "undefined") {
			this.carId = _cfg.carId;
			alert("this.carId===="+this.carId)
		}
		if (typeof(_cfg.typedata) != "undefined") {
			this.typedata = _cfg.typedata;
			alert("this.typedata===="+this.typedata)
		}
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		BanliMortgageWindow.superclass.constructor.call(this, {
			        width:'40%',
			        id:'CarStorageWindow',
			        buttonAlign:'center',
			        title:this.typedata==1?'车辆入库':'车辆出库',
			        modal:true,
					items : [this.transactPanel],
					buttons:[{
					    text : '保存',
						iconCls : 'btn-save',
						scope : this,
						handler : this.save
					},{
					    text : '关闭',
						iconCls : 'btn-cancel',
						scope : this,
						handler : function(){
							this.close();
						}
					}]
					
				})
	},
	initUIComponents : function() {
	   
//			var mortgageId = this.mortgageId;
//		    var businessType=this.businessType;
		   	this.transactPanel = new Ext.FormPanel( {
//				url: __ctxPath +'/credit/mortgage/addCarMessage.do',
				layout : 'column',
				monitorValid : true,
				region : 'north',
				height : 170,
				anchor : '100%',
				buttonAlign:'center',
				layoutConfig: {
	               align:'middle'
	            },
	            frame:true,
	            bodyStyle : 'padding:10px 10px 10px 10px',
	            border:false,
				items : [{
					  	 xtype:'hidden',
					   	 // id:"procreditMortgage.isTransact",
					   	 name:'csCarHanderMessage.id',
					   	 value:this.carId
			   }, {
				   columnWidth:0.5,
				   layout:'form',
				   border:false,
				   labelWidth:60,
				   labelAlign:'right',
				   items:[{
				   	  xtype:'hidden',
				   	 // id:"procreditMortgage.isTransact",
				   	  name:'csCarHanderMessage.type',
				   	  value:this.type
				   }]
				},{
				   columnWidth:0.7,
				   layout:'form',
				   border:false,
				   labelWidth:80,
				   labelAlign:'right',
				   items:[{
					   		xtype:"hidden",
					   		name:"csCarHanderMessage.handerId"
				   		},{
						fieldLabel : "经办人",
						xtype : "combo",
						editable : false,
						triggerClass : 'x-form-search-trigger',
						itemVale : creditkindDicId, // xx代表分类名称
						hiddenName : "csCarHanderMessage.handername",
						readOnly : this.isAllReadOnly,
					    anchor : "100%",
					    allowBlank:false,
					    onTriggerClick : function(cc) {
						     var obj = this;
						     var appuerIdObj=obj.previousSibling();
							 new UserDialog({
							 	userIds:appuerIdObj.getValue(),
							 	userName:obj.getValue(),
								single : false,
								title:"办理经办人",
								callback : function(uId, uname) {
									obj.setRawValue(uname);
									appuerIdObj.setValue(uId);
								}
							}).show();
						}
					}]
				},{
					columnWidth:0.7,
					layout:'form',
					border:false,
					labelWidth:80,
					labelAlign:'right',
					items:[{
						  xtype:'datefield',
					      format:'Y-m-d',
					      anchor : '100%',
					      fieldLabel:'办理时间',
					      allowBlank:false,
					      readOnly:this.isAllReadOnly,
					      name:'csCarHanderMessage.handertime'
					}]
				   },{
					columnWidth:0.7,
					layout:'form',
					border:false,
					labelWidth:80,
					labelAlign:'right',
					items:[{
						xtype:'textfield',
						anchor : '100%',
						fieldLabel:this.typedata==1?'入库编号':'出库编号',
						allowBlank:false,
						readOnly:this.isAllReadOnly,
						name:'csCarHanderMessage.handernum'
					}]
				},{
				   columnWidth:.9,
				   layout:'form',
				   border:false,
				   labelAlign:'right',
				   labelWidth:80,
				   items:[{
				       xtype:'textarea',
				       anchor : '100%',
				       fieldLabel:'备注',
				       allowBlank:false,
				       readOnly:this.isAllReadOnly,
				       name:'csCarHanderMessage.handermark'
				   }]
				}]
	
			})
	},
	save:function(){
		 
		var carId  = this.carId;
		var  type = this.typedata ;
		var  handerId =  this.getCmpByName('csCarHanderMessage.handerId').getValue();
		var  handername =  this.getCmpByName('csCarHanderMessage.handername').getValue();
		var  handertime =  this.getCmpByName('csCarHanderMessage.handertime').getValue();
		var  handernum =  this.getCmpByName('csCarHanderMessage.handernum').getValue();
		var  handermark =  this.getCmpByName('csCarHanderMessage.handermark').getValue();
		
		
		if(this.transactPanel.getForm().isValid()){
			Ext.Ajax.request({
				url: __ctxPath +'/credit/mortgage/addCarMessage.do',
				method : 'POST',
				success : function(response, request) {
				 
					 Ext.getCmp('CarMortgageManagementViewGrid').getStore().reload();
					 Ext.getCmp('CarStorageWindow').close();
				},
				failure : function(response) {
					Ext.ux.Toast.msg('操作提示', '对不起，数据操作失败！');
				},
				params:{
				   carId:carId,
				   type:type,
				   handerId:handerId,
				   handername:handername,
				   handertime:handertime,
				   handernum:handernum,
				   handermark:handermark
				}
		    }) 
		}
	}
});
