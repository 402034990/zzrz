UpdateDzyMortgageWin = Ext.extend(Ext.Window, {
	layout : 'anchor',
	anchor : '100%',
	constructor : function(_cfg) {

		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		UpdateDzyMortgageWin.superclass.constructor.call(this, {
			        buttonAlign:'center',
			        title:'抵质押物信息',
			        iconCls : 'btn-add',
					width : (screen.width-180)*0.6,
					height : 460,
					constrainHeader : true ,
					collapsible : true, 
					frame : true ,
					border : false ,
					resizable : true,
					layout:'fit',
					autoScroll : true ,
					bodyStyle:'overflowX:hidden',
					constrain : true ,
					closable : true,
					modal : true,
					maximizable :true,
					items : [this.formPanel],
					buttons:[/*{
					    text : '车300查询',
						iconCls : 'btn-readdocument',
						scope : this,
						hidden:this.isReadOnly,
						handler : this.queryPrice 
					},*/{
					    text : '保存',
						iconCls : 'btn-save',
						scope : this,
						hidden:this.isReadOnly,
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
		    var businessType=this.businessType
			function selectCustomer(obj) {
				if (obj.enterprisename) {//企业
					Ext.getCmp('enterpriseNameMortgage').setValue(obj.id);
					Ext.getCmp('enterpriseNameMortgage').setRawValue(obj.enterprisename) ;
				} else if (obj.name) {//个人
					Ext.getCmp('enterpriseNameMortgage').setValue(obj.id);
					Ext.getCmp('enterpriseNameMortgage').setRawValue(obj.name) ;
				}
			
			}
		
			function selectSlCompany(obj) {
				Ext.getCmp('enterpriseNameMortgage').setValue(obj.companyMainId);
				Ext.getCmp('enterpriseNameMortgage').setRawValue(obj.corName) ;
			}
			
			function selectSlPerson(obj){
				Ext.getCmp('enterpriseNameMortgage').setValue(obj.personMainId);
				Ext.getCmp('enterpriseNameMortgage').setRawValue(obj.name) ;
			}
         if(this.type ==1){
			this.otherPanel=new VehicleCarForm({id:this.id,type:this.type,objectType:'mortgage',isReadOnly:this.isReadOnly})
		}else if(this.type==2){
			this.otherPanel=new StockownershipForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==5){
			this.otherPanel=new MachineinfoForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==6){
			this.otherPanel=new ProductForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==7 || this.type==15 || this.type==16 || this.type==17){
			this.otherPanel=new HouseForm({mortgageId:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==8){
			this.otherPanel=new OfficeBuildingForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==9){
			this.otherPanel=new HousegroundForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==10){
			this.otherPanel=new BusinessForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==11){
			this.otherPanel=new BusinessandliveForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==12){
			this.otherPanel=new EducationForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==13){
			this.otherPanel=new IndustryForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==14){
			this.otherPanel=new DroitForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type==18){
			this.otherPanel=new ReceivablesForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type ==19){
			this.otherPanel=new VehicleQualifiedForm({id:this.id,type:this.type,objectType:'mortgage'})
		}else if(this.type ==20){
			this.otherPanel=new VehicleNoQualifiedForm({id:this.id,type:this.type,objectType:'mortgage'})
		}
 	   var data = [['车辆车易贷(有合格证)',19],['车辆车易贷(无合格证)',20],['车辆',1],['股权',2],['机器设备',5],['存货/商品',6],['无形权利',14],['住宅',7],['商铺写字楼',8],['住宅用地',9],['商业用地',10],['商住用地',11],/*['教育用地',12],*/['工业用地',13],['公寓',15],['联排别墅',16],['独栋别墅',17]];
	   this.formPanel = new Ext.FormPanel( {
			url : __ctxPath +'/credit/mortgage/addMortgageOfDY.do',
			monitorValid : true,
			bodyStyle:'padding:10px',
			autoScroll : true ,
			labelAlign : 'right',
			buttonAlign : 'center',
			frame : true ,
			border : false,
			items : [{
				layout : 'column',
				xtype:'fieldset',
	            title: '填写<抵质押物>基础信息',
	            collapsible: true,
	            autoHeight:true,
	            anchor : '95%',
				items : [{
					columnWidth : .5,
					layout : 'form',
					labelWidth : 105,
					defaults : {anchor : '100%'},
					items : [{
		        		xtype : 'hidden',
		        		name : 'procreditMortgage.projid',
		        		value : this.projectId
		        	},{
		        		xtype : 'hidden',
		        		name : 'procreditMortgage.businessType',
		        		value : this.businessType
		        	},{
		        		xtype : 'hidden',
		        		name : 'procreditMortgage.id'
		        	},{
		        		xtype : 'hidden',
		        		name : 'procreditMortgage.createTime'
		        	},{
		        		
						xtype : "dickeycombo",
						nodeKey : 'dblx',
						hiddenName : "procreditMortgage.assuretypeid",
						fieldLabel : "担保类型",
						itemName : '担保类型', // xx代表分类名称
						allowBlank :false,
						readOnly : true,
						listeners : {
							scope:this,
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									combox.setValue(combox
											.getValue());
									combox.clearInvalid();
								})
							}
						}
					
					},{
						id : 'persontype_id',
						xtype : "dickeycombo",
						nodeKey : 'syrlx',
						hiddenName : "procreditMortgage.personType",
						fieldLabel : "所有人类型",
						itemName : '所有人类型', // xx代表分类名称
						allowBlank :false,
						readOnly:this.isReadOnly,
						editable : false,
						listeners : {
							scope:this,
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									combox.setValue(combox
											.getValue());
									combox.clearInvalid();
								})
							},
							'select' : function(combo,record, index){
								Ext.getCmp('enterpriseNameMortgage').setValue('')
							}
						}
					}]
				},{
					columnWidth : .5,
					labelWidth : 110,
					layout : 'form',
					defaults : {anchor : '95%'},
					items : [{
					xtype:'combo',
					id:'mortgagenametypeid',
					hiddenName : 'procreditMortgage.mortgagenametypeid',
					anchor : '95%',
					fieldLabel:'抵质押物类型',
					allowBlank :false,
					mode : 'local',
					forceSelection : true, 
					displayField : 'typeValue',
					valueField : 'typeId',
					editable : false,
					triggerAction : 'all',
					readOnly:true,
					store : new Ext.data.SimpleStore({
						data : data,
						fields:['typeValue','typeId']
					})
				},{
				    xtype:'hidden',
				    name:'procreditMortgage.mortgagepersontypeforvalue'
				},{
					xtype:'textfield',
					readOnly:this.isReadOnly,
					fieldLabel : '与债务人的关系',
					name : 'procreditMortgage.relation',
					maxLength : 50,
					maxLengthText : '最大输入长度50'
				}]
				},{
					columnWidth : 1,
					labelWidth : 105,
					layout : 'form',
					defaults : {anchor : '97.5%'},
					items : [{
						id : 'enterpriseNameMortgage',
						readOnly:this.isReadOnly,
						xtype : 'combo',
						triggerClass :'x-form-search-trigger',
						hiddenName : 'customerEnterpriseName',
						fieldLabel : '<font color=red>*</font>所有权人',
						editable:false,
						onTriggerClick : function(){
							if(businessType=='Financing'){
								if(Ext.getCmp('persontype_id').getValue()==602){
									selectSlCompanyMain(selectSlCompany);
								}else if(Ext.getCmp('persontype_id').getValue()==603){
									selectSlPersonMain(selectSlPerson);
								}
							}else{
								if(Ext.getCmp('persontype_id').getValue()==602){
									selectEnterprise(selectCustomer);
								}else if(Ext.getCmp('persontype_id').getValue()==603){
									selectPWName(selectCustomer);
								}
								
							}
	                   },
						mode : 'romote',
						lazyInit : true,
						allowBlank : false,
						typeAhead : true,
						forceSelection :true,
						minChars : 1,
						listWidth : 230,
						store: new Ext.data.JsonStore({}),
						/*store : getStoreByBusinessType(this.businessType,'enterprise'),
						displayField : businessType=="Financing"?'corName':'enterprisename',
						valueField : businessType=="Financing"?'companyMainId':'id',*/
						triggerAction : 'all'
					}]
				}/*,{
					columnWidth : 1,
					labelWidth : 105,
					layout : 'form',
					defaults : {anchor : '97.5%'},
					items : [{
						xtype : 'textfield',
						fieldLabel : '<font color=red>*</font>抵质押物名称',
						name : 'procreditMortgage.mortgagename',
						maxLength : 50,
						maxLengthText : '最大输入长度50',
						blankText : '为必填内容'
					}]
				}*/,{
					columnWidth : .32,
					layout : 'form',
					labelWidth : 105,
					defaults : {xtype : 'numberfield',anchor : '100%'},
					items : [{
						fieldLabel : '评估价值',
						readOnly:this.isReadOnly,
						maxLength : 23,
						maxLengthText : '最大输入长度23',
						allowBlank : false,
						fieldClass : 'field-align',
						style : {
							imeMode : 'disabled'
						},
						name : 'procreditMortgage.finalprice'/*,// 控制文本框的长度
						listeners : {
							scope : this,
							afterrender : function(obj) {
								obj.on("keyup")
							},
							change : function(nf) {

								var value = nf.getValue();
								var index = value.indexOf(".");
								if (index <= 0) { // 如果第一次输入
													// 没有进行格式化
									nf.setValue(Ext.util.Format.number(value,'0,000.00'))
								
								} else {

									if (value.indexOf(",") <= 0) {
										var ke = Ext.util.Format.number(value,'0,000.00')
										nf.setValue(ke);
										
									} else {
										var last = value.substring(index+ 1,value.length);
										if (last == 0) {
											var temp = value.substring(0,index);
											temp = temp.replace(/,/g,"");
										
										} else {
											var temp = value.replace(/,/g,"");
		
										}
									}

								}
							}
						}*/
					}]
				}, {
					columnWidth : .05, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 30,
					items : [{
						fieldLabel : "万元 ",
						labelSeparator : '',
						anchor : "100%"
					}]
				},{
					columnWidth : .26,
					layout : 'form',
					labelWidth : 80,
					labelAlign:'right',
					defaults : {xtype : 'numberfield',anchor : '100%'},
					items : [{
						//fieldLabel : '市场价值',
						fieldLabel : '新车指导价',
						maxLength : 23,
						readOnly:this.isReadOnly,
						maxLengthText : '最大输入长度23',
						allowBlank : false,
						fieldClass : 'field-align',
						style : {
							imeMode : 'disabled'
						},
						name : 'procreditMortgage.finalCertificationPrice',
						listeners :{
							scope : this,
							'blur':function(field){
								var com=this.formPanel.getCmpByName('procreditMortgage.assuremoney')
								var finalCertificationPrice=field.getValue()
								if(this.projectMoney==null || this.projectMoney=="" || typeof(this.projectMoney)=='undefined'  || finalCertificationPrice==null || finalCertificationPrice==""){
									com.setValue(0)
								}else{									
									com.setValue((this.projectMoney/finalCertificationPrice*100).toFixed(2))
								}
							}
						}
					}]
				}, {
					columnWidth : .05, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 30,
					items : [{
						fieldLabel : "万元 ",
						labelSeparator : '',
						anchor : "100%"
					}]
				}/*,{
					columnWidth : .05, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 20,
					items : [{
						fieldLabel : "至",
						labelSeparator : '',
						anchor : "100%"
					}]
				},{
					columnWidth : .22,
					layout : 'form',
					labelWidth : 30,
					defaults : {
							xtype : 'numberfield',
							anchor : '100%'
							},
					items : [{
						fieldLabel : '',
						readOnly:this.isReadOnly,
						fieldClass : 'field-align',
						style : {
							imeMode : 'disabled'
						},
						name : 'procreditMortgage.finalCertificationPriceMax'
					}]
				}*/,{
					columnWidth : .26,
					layout : 'form',
					labelWidth : 45,
					defaults : {xtype : 'numberfield',anchor : '100%'},
					items : [{
						fieldLabel : '折旧价',
						fieldClass : 'field-align',
						readOnly:this.isReadOnly,
						style : {
							imeMode : 'disabled'
						},
						name : 'procreditMortgage.depreciationPrice'
					}]
				},{
					columnWidth : .05, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 30,
					items : [{
						fieldLabel : "万元",
						labelSeparator : '',
						anchor : "100%"
					}]
				}/*,{
					columnWidth : .32,
					layout : 'form',
					labelWidth : 105,
					labelAlign:'right',
					defaults : {xtype : 'numberfield',anchor : '100%'},
					items : [{
						fieldLabel : '车牌价格',
						readOnly:this.isReadOnly,
						allowBlank : false,
//						maxLength : 23,
//						maxLengthText : '最大输入长度23',
						fieldClass : 'field-align',
						style : {
							imeMode : 'disabled'
						},
						name : 'procreditMortgage.carNumberMoney'
					}]
				}, {
					columnWidth : .05, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 30,
					items : [{
						fieldLabel : "万元",
						labelSeparator : '',
						anchor : "100%"
					}]
				},{
					columnWidth : .5,
					layout : 'form',
					labelWidth : 105,
					defaults : {xtype : 'numberfield',anchor : '100%'},
					items : [{
						xtype:'textfield',
						fieldLabel : '市场价值获取方式',
						readOnly:this.isReadOnly,
						width : 90,
						name : 'procreditMortgage.valuationMechanism'
					}]
				},{
					columnWidth : .5,
					layout : 'form',
					labelWidth : 105,
					defaults : {xtype : 'numberfield',anchor : '95%'},
					items : [{
						xtype:'datefield',
						readOnly:this.isReadOnly,
						fieldLabel : '获取时间',
						format:'Y-m-d',
						name : 'procreditMortgage.valuationTime'
					}]
				},{
					columnWidth : 1,
					layout : 'form',
					labelWidth : 105,
					defaults : {anchor : '97.5%'},
					items : [{
						xtype : 'textarea',
						readOnly:this.isReadOnly,
						fieldLabel : '备注',
						maxLength : 100,
						maxLengthText : '最大输入长度100',
						name : 'procreditMortgage.mortgageRemarks'
					}]
				}*/]
			},{
			   anchor:'95%',
			   items:[this.otherPanel]
			}]
		})

		if(null!=this.id && null!=this.type){
			this.formPanel.loadData({
				url : __ctxPath +'/credit/mortgage/getMortgageByType.do?mortgageid='
						+ this.id,
				root : 'data',
				preName : ['procreditMortgage','assureofname'],
				scope : this,
				success : function(resp, options) {
					var obj=Ext.util.JSON.decode(resp.responseText)
					Ext.getCmp('enterpriseNameMortgage').setValue(obj.data.procreditMortgage.assureofname)
					Ext.getCmp('enterpriseNameMortgage').setRawValue(obj.data.assureofname)
					
				}
			});
		}

	},
	save:function(){
	    var mortgagenametypeid=this.getCmpByName('procreditMortgage.mortgagenametypeid').getValue();
	    var customerName=this.getCmpByName('customerEnterpriseName').getValue();

	    var win=this
	    var gridPanel=this.gridPanel
	   /* if(mortgagenametypeid==1){
	    	var factoryName = Ext.getCmp('factoryName').getValue();
			if(factoryName == ""){
				Ext.ux.Toast.msg('状态','请选择<制造商>后再保存!');
				return;
			}
	    }else*/ if(mortgagenametypeid==2){
	    	var targetEnterpriseName = Ext.getCmp('targetEnterpriseName').getValue();
	    	if(targetEnterpriseName==""){
				Ext.ux.Toast.msg('状态','请选择<目标公司名称>后再保存!');
				return;
			}
	    }else if(mortgagenametypeid==4){
	    	var card_number = Ext.getCmp('card_number').getValue();
	    	if(card_number == ""){
				Ext.ux.Toast.msg('状态','<证件号码>不能为空!');
				return;
			}
	    }
		if(customerName==''){
			Ext.ux.Toast.msg('状态','请选择<所有权人>后再保存!');
			return;
		}else{
			this.formPanel.getForm().submit({
				method : 'POST',
				waitTitle : '连接',
				waitMsg : '消息发送中...',
				success : function(form, action) {
					Ext.ux.Toast.msg('操作信息', '保存成功!');
					win.destroy();
					gridPanel.getStore().reload()
				},
				failure : function(form, action) {
					Ext.ux.Toast.msg('操作信息', '保存失败!');
				}
			});				
		}		    
	},	
	queryPrice:function(){
             var manufacturer=this.formPanel.getCmpByName("procreditMortgageCar.manufacturer").getValue();
             var modelId=this.formPanel.getCmpByName("procreditMortgageCar.modelId").getValue();
             var mile=this.formPanel.getCmpByName("procreditMortgageCar.mile").getValue();
             var zone=this.formPanel.getCmpByName("procreditMortgageCar.zone").getValue();
             var carColor=this.formPanel.getCmpByName("procreditMortgageCar.carColor").getValue();
             var surface=this.formPanel.getCmpByName("procreditMortgageCar.surface").getValue();
             var interior=this.formPanel.getCmpByName("procreditMortgageCar.interior").getValue();
             var workState=this.formPanel.getCmpByName("procreditMortgageCar.workState").getValue();
             var regDate=this.formPanel.getCmpByName("procreditMortgageCar.regDate").getValue();
             var ss=Ext.util.Format.date(regDate,'Y-m');
			Ext.Ajax.request({
				url : __ctxPath + '/credit/mortgage/getBycarTypeView.do',
				method : 'POST',
				scope:this,
				success :function(response){
//				var obj = Ext.util.JSON.decode(action.response.responseText);
				var obj=Ext.util.JSON.decode(response.responseText);
				if(obj.success ==true){debugger
					if(typeof(obj.msg)!="undefined"){
						var bookingPrice=obj.msg;
						Ext.ux.Toast.msg('操作信息', obj.msg);
						this.formPanel.getCmpByName("procreditMortgageCar.carProduce")
						this.formPanel.getCmpByName("procreditMortgageCar.bookingPrice").setValue(bookingPrice);
					}
				}else{
					Ext.ux.Toast.msg('操作信息', '保存失败!');
				}
			},
			params : {
				regDate:regDate,
				workState:workState,
				interior:interior,
				surface:surface,
				carColor:carColor,
				zone:zone,
				mile:mile,
				modelId:modelId,
				manufacturer:manufacturer,
				ss:ss
				
					}
	   })
	        var formPanel1=this.formPanel;
			/*formPanel1.getForm().submit({
				url : __ctxPath + '/credit/mortgage/getBycarTypeView.do',
				method : 'POST',
				scope: this,
				waitMsg : '消息发送中...',
				success : function(form, action) {
					var obj = Ext.util.JSON.decode(action.response.responseText);
					if(obj.success ==true){
						if(typeof(obj.msg)!="undefined"){
							Ext.ux.Toast.msg('操作信息', obj.msg);
						}
					}else{
						Ext.ux.Toast.msg('操作信息', '操作失败!');
					}
				},
				failure : function(form, action) {
					Ext.ux.Toast.msg('操作信息', '操作失败失败!');
				}
			});	*/			
		/*debugger
	    var procreditMortgageCar=this.VehicleCarForm.getGridDate()
//		var procreditMortgageCar=getNetCheckInfoData(this.VehicleCarForm);
		formPanel.getCmpByName('VehicleCarForm').setValue(procreditMortgageCar);
			formPanel.getForm().submit({
			    clientValidation: false, 
				url : __ctxPath + '/credit/mortgage/getBycarTypeView.do',
				params : {
					'comments':formPanel.comments
				},
				method : 'post',
				waitMsg : '数据正在提交，请稍后...',
				scope: this,
				success : function(fp, action) {
					var object = Ext.util.JSON.decode(action.response.responseText)
					Ext.ux.Toast.msg('操作信息', '保存信息成功!');
					this.VehicleCarForm.gridPanel.store.reload();
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
//		Ext.Ajax.request({
//				url : __ctxPath + '/credit/mortgage/getBycarTypeView.do',
//				method : 'POST',
//				scope:this,
//				success :function(form, action){debugger
//				var obj = Ext.util.JSON.decode(action.response.responseText);
//				if(obj.success ==true){
//					if(typeof(obj.msg)!="undefined"){
//						Ext.ux.Toast.msg('操作信息', obj.msg);
//					}else{
//						form.items.items[0].setValue(obj.data.procreditMortgage.id);
//						gridPanel.getStore().reload()
//					}
//				}else{
//					Ext.ux.Toast.msg('操作信息', '保存失败!');
//				}
//			},
//			params : {
//					}
//	   })
	*/}
});
