/**
 * @author
 * @class SlCarView
 * @extends Ext.Panel
 * @description [SlCar]管理
 * @company 智维软件
 * @createtime:
 */
VehicleCarForm = Ext.extend(Ext.Panel, {
	// 构造函数
	priceRead : true,
	id:null,
	constructor : function(_cfg) {
		Ext.applyIf(this,_cfg);
		if (typeof(_cfg.isReadOnly) != "undefined") {
			this.isReadOnly = _cfg.isReadOnly;
		}
		if (typeof(_cfg.priceRead) != "undefined") {
			this.priceRead = _cfg.priceRead;
		}
		if (typeof(_cfg.id) != "undefined") {
			this.id = _cfg.id;
		}
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		VehicleCarForm.superclass.constructor.call(this, {
			name:'VehicleCarForm',
			anchor : '95%',
			items : [{
				//layout : 'column',
				xtype : 'fieldset',
				title : '汽车网价行情',
				collapsible : true,
				autoHeight : true,				
				items : [{
					columnWidth : 1,
					//labelWidth : 70,
					layout : 'column',
					defaults : {
						anchor : '100%'
					},
					items : [{
						columnWidth : .33,
						layout : 'form',
						labelWidth :70,
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[/*{
							xtype : "dickeycombo2",
							nodeKey : 'pp',
							//url1:'/system/loadItemByNodeKey2Dictionary.do',
							//sign:'1',
							hiddenName : "procreditMortgageCar.manufacturer",
							id:'manufacturer',
							isDisplayItemName:true,
							//mortgageid: this.id,
							fieldLabel : "车辆品牌",
							emptyText : '请选择品牌',
							itemName : '品牌', // xx代表分类名称
							allowBlank:false,
							triggerAction : 'all',
							readOnly : this.isReadOnly,
							editable : false,
						    blankText : '必填信息',
							listeners : {
								scope:this,
								afterrender : function(combox) {
									var st = combox.getStore();
									st.on("load", function() {
										combox.setValue(combox.getValue());
										combox.clearInvalid();
									})
								},
								expand:function(combox,record,index){
									combox.clearValue(); 
				           			// 启用组件  
				           			combox.enable();  
							    },
							    select:function(combox){
							    	this.getCmpByName('procreditMortgageCar.manufacturerName').setValue(combox.getRawValue());
							    	var chexi=this.getCmpByName('procreditMortgageCar.carStypeId');
							    	chexi.clearValue();
							    	var chexing=this.getCmpByName('procreditMortgageCar.modelId');
							    	chexing.clearValue();
							    	
//							    	combox.ownerCt.getCmpByName('procreditMortgageCar.manufacturer').setValue(combox.getValue());
							    }
							}
						},{
							xtype:'hidden',
							name:'procreditMortgageCar.manufacturer'
						},{
							xtype:'hidden',
							name:'procreditMortgageCar.manufacturerName'
						}*/{
								xtype : 'textfield',
								fieldLabel : '车辆品牌',
								allowBlank:false,
								readOnly : this.isReadOnly,
								name : 'procreditMortgageCar.manufacturerName'
							}]
					},{
						columnWidth : .33,
						layout : 'form',
						labelWidth :70,
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[/*{
							
							xtype : "dickeycombo3",
							nodeKey : 'lx',
							//url1:'/system/loadItemByNodeKey2Dictionary.do',
							//sign:'1',
							hiddenName : "procreditMortgageCar.carStypeId",
							id:'carStyle',
							isDisplayItemName:true,
							//mortgageid: this.id,
							fieldLabel : "车辆版本",
							emptyText : '请选择车辆版本',
							itemName : '车辆版本', // xx代表分类名称
							allowBlank:false,
							triggerAction : 'all',
							readOnly : this.isReadOnly,
							editable : false,
						    blankText : '必填信息',
							listeners : {
								scope:this,
								afterrender : function(combox) {
									var st = combox.getStore();
									st.on("load", function() {
										combox.setValue(combox.getValue());
										combox.clearInvalid();
									})
								},
								expand:function(combox,record,index){
									combox.clearValue(); 
									var ppid=this.getCmpByName('procreditMortgageCar.manufacturer').getValue();
									 combox.store.load({  
				                         params : {  
				                            'ppid' : ppid
				                         }  
				                     });  
				           				 // 启用组件  
				           			 combox.enable();  
							    },
							    select:function(combox){
							    	this.getCmpByName('procreditMortgageCar.carXi').setValue(combox.getRawValue());
							    	var chexing=this.getCmpByName('procreditMortgageCar.modelId');
							    	chexing.clearValue();
//							    	combox.ownerCt.getCmpByName('procreditMortgageCar.carXi').setValue(combox.getRawValue());
							    }
							}
						},{
							xtype:'hidden',
							name:'procreditMortgageCar.carXi'
						}*/{
								xtype : 'textfield',
								fieldLabel : '车辆版本',
								allowBlank:false,
								readOnly : this.isReadOnly,
								name : 'procreditMortgageCar.carXi'
							}]
					},{  
								columnWidth : .33,
								layout : 'form',
								labelWidth :100,
								
								defaults : {
									anchor : '100%'
								},
								scope : this,
								items:[{
								xtype : 'textfield',
								fieldLabel : '车牌号',
								allowBlank:false,
								readOnly : this.isReadOnly,
								name : 'procreditMortgageCar.carNumber'
							}]
					}/*,{  
								columnWidth : .3,
								layout : 'form',
								labelWidth :70,
								
								defaults : {
									anchor : '100%'
								},
								scope : this,
								items:[{
									xtype : "dickeycombo4",
									nodeKey : 'cs',
									//url1:'/system/loadItemByNodeKey2Dictionary.do',
									//sign:'1',
									hiddenName : "procreditMortgageCar.zone",
									id:'zone',
									isDisplayItemName:true,
									//mortgageid: this.id,
									fieldLabel : "城市",
									emptyText : '请选择城市',
									itemName : '城市', // xx代表分类名称
									allowBlank:false,
									triggerAction : 'all',
									readOnly : this.isReadOnly,
									editable : true,
								    blankText : '必填信息',
									listeners : {
										scope:this,
										'beforequery':function(e){                
							                var combo = e.combo;    
							                if(!e.forceAll){    
								                var input = e.query;    
								                // 检索的正则  
								                var regExp = new RegExp(".*" + input + ".*");  
								                // 执行检索  
								                combo.store.filterBy(function(record,id){  
									                // 得到每个record的项目名称值  
									                var text = record.get(combo.displayField); 
									                return regExp.test(text);   
								                });  
								                combo.expand();    
								                return false;  
							                } 
							            },
										afterrender : function(combox) {
											var st = combox.getStore();
											st.on("load", function() {
												combox.setValue(combox.getValue());
												combox.clearInvalid();
											})
										},
										expand:function(combox,record,index){
										
											combox.clearValue(); 
											
											 combox.store.load({  
						                         params : {  
						                            'sign' : '1' 
						                         }  
						                     });  
						           				 // 启用组件  
						           			 combox.enable();  
									    },
									    select:function(combox){
									    	//combox.setValue(combox.getValue());
//									    	combox.ownerCt.getCmpByName('procreditMortgageCar.zone').setValue(combox.getValue());
									    	this.getCmpByName('procreditMortgageCar.zoneName').setValue(combox.getRawValue());
									    	//alert(combox.getRawValue());
									    }
									}
								},{
									xtype:'hidden',
									name:'procreditMortgageCar.zoneName'
								}]
					}*/]
				},{
					columnWidth : 1,
					//labelWidth : 70,
					layout : 'column',
					defaults : {
						anchor : '100%'
					},
					items : [{
						columnWidth : .99,
						layout : 'form',
						labelWidth :70,
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[/*{
							xtype : "dickeycombo5",
							nodeKey : 'chex',
							//url1:'/system/loadItemByNodeKey2Dictionary.do',
							//sign:'1',
							hiddenName : "procreditMortgageCar.modelId",
							id:'modelId',
							isDisplayItemName:true,
							//mortgageid: this.id,
							fieldLabel : "车型",
							emptyText : '请选择车型',
							itemName : '车型', // xx代表分类名称
							allowBlank:false,
							triggerAction : 'all',
							readOnly : this.isReadOnly,
							editable : false,
						    blankText : '必填信息',
							listeners : {
								scope:this,
								afterrender : function(combox) {
									var st = combox.getStore();
									st.on("load", function() {
										combox.setValue(combox.getValue());
										combox.clearInvalid();
									})
								},
								expand:function(combox,record,index){debugger
									combox.clearValue(); 
									var carStyleId=this.getCmpByName('procreditMortgageCar.carStypeId').getValue();
									 combox.store.load({  
				                         params : {  
				                            'carStyleId' : carStyleId
				                         }  
				                     });  
				           			 // 启用组件  
				           			 combox.enable();  
							    },
							    
							    select:function(combox,a,b,c,d){
							    	//combox.store.data.items
                                    //a.data.maxRegYear
//							    	combox.ownerCt.getCmpByName('procreditMortgageCar.modelId').setValue(combox.getValue());
							    	//Ext.getCmp('minDate').setValue(a.data.minRegYear);
							    	Ext.getCmp('maxDate').setValue(a.data.maxRegYear);
							    	combox.ownerCt.getCmpByName('procreditMortgageCar.modelName').setValue(combox.getRawValue());
							    }
							}
						},{
							xtype:'hidden',
							name:'procreditMortgageCar.modelName'
						}*/{
								xtype : 'textfield',
								fieldLabel : '车型',
								allowBlank:false,
								readOnly : this.isReadOnly,
								name : 'procreditMortgageCar.modelName'
							}]
					}/*,{  
								columnWidth : .33,
								layout : 'form',
								labelWidth :70,
								
								defaults : {
									anchor : '100%'
								},
								scope : this,
								items:[{
									xtype:'combo',
									name : 'procreditMortgageCar.workState',
									//anchor : '95%',
									fieldLabel:'车辆状况',
									allowBlank:false,
									readOnly : this.isReadOnly,
									//allowBlank :false,
									mode : 'local',
									forceSelection : true, 
									displayField : 'typeValue',
									valueField : 'typeId',
									editable : false,
									triggerAction : 'all',
									store : new Ext.data.SimpleStore({
										data : [['一般',0],['较好',1],['优秀',2]],
										fields:['typeValue','typeId']
									})
								}]
					}*//*,{  
								columnWidth : .3,
								layout : 'form',
								labelWidth :70,
								
								defaults : {
									anchor : '100%'
								},
								scope : this,
								items:[{
									xtype : 'numberfield',
									//allowBlank:false,
									fieldLabel : '预售价格',
//									readOnly : this.priceRead,
									name : 'procreditMortgageCar.marketPrice'
								}]
					}, {
						columnWidth : .06, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelWidth : 30,
						labelAlign:'left',
							items : [{
								fieldLabel : "万元",
								labelSeparator : '',
								anchor : "100%"
							}]
					}*/]
				},{
					
					columnWidth : 1,
					//labelWidth : 70,
					layout : 'column',
					defaults : {
						anchor : '100%'
					},
					items : [/*{  
								columnWidth : .33,
								layout : 'form',
								labelWidth :70,
								
								defaults : {
									anchor : '100%'
								},
								scope : this,
								items:[{
									xtype:'combo',
									name : 'procreditMortgageCar.workState',
									//anchor : '95%',
									fieldLabel:'工况状况',
									allowBlank:false,
									readOnly : this.isReadOnly,
									//allowBlank :false,
									mode : 'local',
									forceSelection : true, 
									displayField : 'typeValue',
									valueField : 'typeId',
									editable : false,
									triggerAction : 'all',
									store : new Ext.data.SimpleStore({
										data : [['优',0],['良',1],['中',2],['差',3]],
										fields:['typeValue','typeId']
									})
								}]
					},*/{  
						columnWidth : .33,
						layout : 'form',
						labelWidth :70,
						
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[{
							xtype : 'textfield',
							fieldLabel : '车辆颜色',
							//allowBlank:false,
							anchor : '95%',
							readOnly : this.isReadOnly,
							name : 'procreditMortgageCar.carColor'
						}/*{
							xtype:'combo',
							name : 'procreditMortgageCar.carColor',
							//anchor : '95%',
							fieldLabel:'车辆颜色',
							allowBlank:false,
							readOnly : this.isReadOnly,
							//allowBlank :false,
							mode : 'local',
							forceSelection : true, 
							displayField : 'typeValue',
							valueField : 'typeId',
							editable : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
								data : [['米色',0],['棕色',1],['金色',2],
								        ['紫色',3],['巧克力色',4],['黑色',5],
								        ['蓝色',6],['灰色',7],['绿色',8],
								        ['红色',9],['橙色',10],['白色',11],
								        ['香槟色',12],['银色',13],['黄色',14]],
                                fields:['typeValue','typeId']
							})
						}*/]
					}/*,{  
						columnWidth : .33,
						layout : 'form',
						labelWidth :70,
						
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[{
							xtype:'combo',
							id:'interior',
							name : 'procreditMortgageCar.interior',
							//anchor : '95%',
							fieldLabel:'内饰状况',
							allowBlank:false,
							readOnly : this.isReadOnly,
							//allowBlank :false,
							mode : 'local',
							forceSelection : true, 
							displayField : 'typeValue',
							valueField : 'typeId',
							editable : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
								data : [['优',0],['良',1],['中',2],['差',3]],
								fields:['typeValue','typeId']
							})
						}]
					},{  
						columnWidth : .33,
						layout : 'form',
						labelWidth :70,
						
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[{
							xtype:'combo',
							id:'surface',
							name : 'procreditMortgageCar.surface',
							//anchor : '95%',
							fieldLabel:'漆面状况',
							allowBlank:false,
							readOnly : this.isReadOnly,
							//allowBlank :false,
							mode : 'local',
							forceSelection : true, 
							displayField : 'typeValue',
							valueField : 'typeId',
							editable : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
								data : [['优',0],['良',1],['中',2],['差',3]],
								fields:['typeValue','typeId']
							})
						}]
					},{
							columnWidth : .3,
							layout : 'form',
							labelWidth :80,
							defaults : {
								anchor : '100%'
							},
							scope : this,
							items:[{
								xtype : 'numberfield',
								fieldLabel : '出厂日期',
								allowBlank:false,
								readOnly : this.isReadOnly,
								id :'minDate',
								name : 'procreditMortgageCar.minDate'
							}]
					}*/,{
						  
						columnWidth : .33,
						layout : 'form',
						//labelWidth :80,
						labelWidth :100,
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[/*{
							xtype : 'numberfield',
							//fieldLabel : '初次上牌日期',
							fieldLabel : '车辆初次登记日期',
							//allowBlank:false,
							readOnly : this.isReadOnly,
							id :'maxDate',
							name : 'procreditMortgageCar.maxDate'
						}*/{
									fieldLabel : "车辆初次登记日期",
									xtype : "datefield",
									name : 'procreditMortgageCar.listingDate',
									readOnly : this.isReadOnly,
									allowBlank : this.isProduct,
									blankText : "车辆初次登记日期不能为空，请正确填写!",
									format : 'Y-m-d',
									editable : false
								}]
					
					},{  
						columnWidth : .33,
						layout : 'form',
						labelWidth :100,
						
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[{
							xtype : 'textfield',
							fieldLabel : '车辆排量',
							allowBlank:false,
							readOnly : this.isReadOnly,
							name : 'procreditMortgageCar.carDisplacement'
						}]
					}]
				
				},{
					columnWidth : 1,
					//labelWidth : 70,
					layout : 'column',
					defaults : {
						anchor : '100%'
					},
					items : [/*{  
								columnWidth : .3,
								layout : 'form',
								labelWidth :100,
								
								defaults : {
									anchor : '100%'
								},
								scope : this,
								items:[{
									xtype : 'datefield',
									fieldLabel : '最近上牌日期',
									format : 'Y-m-d',
									allowBlank:false,
									readOnly : this.isReadOnly,
									name : 'procreditMortgageCar.regDate'
								}]
					},*/{
						columnWidth : .33, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelWidth : 70,
						labelAlign:'left',
							items : [{
								xtype : 'textfield',
								allowBlank:false,
								fieldLabel : "发动机号",
								readOnly : this.isReadOnly,
								name : 'procreditMortgageCar.engineNo',
								anchor : "100%"
							}]
					},{  
						columnWidth : .3,
						layout : 'form',
						labelWidth :70,
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[{
							xtype : 'numberfield',
							fieldLabel : '行驶里程',
							allowBlank:false,
							readOnly : this.isReadOnly,
							id :'mile',
							name : 'procreditMortgageCar.mile'
						}]
					}, {
						columnWidth : .1, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelWidth : 40,
						labelAlign:'left',
							items : [{
								fieldLabel : "万公里",
								labelSeparator : '',
								anchor : "100%"
							}]
					}]
				}/*,{
					columnWidth : 1,
					//labelWidth : 70,
					layout : 'column',
					defaults : {
						anchor : '100%'
					},
					items : [{  
								columnWidth : .3,
								layout : 'form',
								labelWidth :100,
								
								defaults : {
									anchor : '100%'
								},
								scope : this,
								items:[{
								xtype : 'textfield',
								fieldLabel : '车牌号',
								allowBlank:false,
								readOnly : this.isReadOnly,
								name : 'procreditMortgageCar.carNumber'
							}]
					},{  
						columnWidth : .3,
						layout : 'form',
						labelWidth :70,
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[{
							xtype:'combo',
							hiddenName : 'procreditMortgageCar.isMortgageMoney',
							//anchor : '95%',
							fieldLabel:'是否按揭',
							allowBlank:false,
							readOnly : this.isReadOnly,
							//allowBlank :false,
							mode : 'local',
							forceSelection : true, 
							displayField : 'typeValue',
							valueField : 'typeId',
							editable : false,
							triggerAction : 'all',
							store : new Ext.data.SimpleStore({
								data : [['否',0],['是',1]],
								fields:['typeValue','typeId']
//                                fields:['typeId','typeValue']
							})
						}]
					}, {
						columnWidth : .1, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelWidth : 40,
						labelAlign:'left',
							items : [{
								fieldLabel : "万公里",
								labelSeparator : '',
								anchor : "100%"
							}]
					},{
						columnWidth : .3, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelWidth : 70,
						labelAlign:'left',
							items : [{
								xtype : 'numberfield',
								allowBlank:false,
								fieldLabel : "发动机型号",
								readOnly : this.isReadOnly,
								name : 'procreditMortgageCar.engineNo',
								anchor : "100%"
							}]
					}]
				}*/,/*{  
					columnWidth : .33,
					layout : 'form',
					labelWidth :100,
					
					defaults : {
						anchor : '100%'
					},
					scope : this,
					items:[{
						xtype : 'textfield',
						fieldLabel : '车牌号',
						allowBlank:false,
						readOnly : this.isReadOnly,
						name : 'procreditMortgageCar.carNumber'
					}]
					},*/{  
						columnWidth : .33,
						layout : 'form',
						labelWidth :70,
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[{
							xtype : 'textfield',
							fieldLabel : '车架号',
							allowBlank:false,
							readOnly : this.isReadOnly,
							name : 'procreditMortgageCar.vin'
						}]
					}/*,{  
						columnWidth : .33,
						layout : 'form',
						labelWidth :70,
						
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[{
							xtype : 'textfield',
							fieldLabel : '厂牌型号',
							allowBlank:false,
							readOnly : this.isReadOnly,
							name : 'procreditMortgageCar.carModelrui'
						}]
					},{  
						columnWidth : .33,
						layout : 'form',
						labelWidth :70,
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[{
							xtype : 'textfield',
							fieldLabel : '所有权登记证书编号',
//							allowBlank:false,
							readOnly : this.isReadOnly,
							name : 'procreditMortgageCar.ownership'
						}]
					}*/,{
					columnWidth : 1,
					layout : 'column',
					defaults : {
						anchor : '100%'
					},
					items : [{  
						columnWidth : .99,
						layout : 'form',
						labelWidth :70,
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[{
							xtype : 'textarea',
							readOnly : this.isReadOnly,
							fieldLabel : '备注',
							name : 'procreditMortgageCar.carProduce'
						}]
					}]
				},{
					columnWidth : 1,
					//labelWidth : 70,
					layout : 'column',
					hidden : true,
					defaults : {
						anchor : '100%'
					},
					items : [{  
								columnWidth : .33,
								layout : 'form',
								labelWidth :70,
								
								defaults : {
									anchor : '100%'
								},
								scope : this,
								items:[{
									xtype:'numberfield',
									name : 'procreditMortgageCar.bookingPrice',
									id:'bookingPrice',
									//anchor : '95%',
									fieldLabel:'预售价格',
//									allowBlank:false,
									readOnly : true
								}]
					},{  
						columnWidth : .1,
						layout : 'form',
						labelWidth :30,
						
						defaults : {
							anchor : '100%'
						},
						scope : this,
						items:[{
				            fieldLabel : "万元",
							labelSeparator : '',
							anchor : "100%"
						}]
					}]
				
				},{
					xtype : 'hidden',
					name : 'procreditMortgageCar.id',
					value : this.id
				},{
					xtype : 'hidden',
					name : 'procreditMortgageCar.objectType',
					value : this.objectType
				},{
					xtype : 'hidden',
					name : 'procreditMortgageCar.carPhotoId'
				},{
					xtype : 'hidden',
					name : 'procreditMortgageCar.carPhotoExtendName'
				}]
			}]
		
			});
		if(null!=this.id && null!=this.type){
			var url=__ctxPath +'/credit/mortgage/getMortgageByType.do?mortgageid='+ this.id+'&typeid='+this.type+'&objectType='+this.objectType
			if(this.objectType=='pawn'){
				url=__ctxPath +'/creditFlow/pawn/pawnItems/getPawnItemTypePawnItemsList.do?mortgageid='+ this.id+'&typeid='+this.type+'&objectType='+this.objectType
			}
			this.loadData({
				url : url,
				root : 'data',
				preName : ['vCarDic'],
				scope : this,
				success : function(resp, options) {
					var obj=Ext.util.JSON.decode(resp.responseText);
					var so=obj.data.procreditMortgageCar;
//					Ext.getCmp('manufacturer').setValue(this.tempData.manufacturerName);
					//Ext.getCmp('manufacturer').setValue(so.manufacturerName);
					//Ext.getCmp('carStyle').setValue(so.carXi);
					//Ext.getCmp('carStyle').setValue(so.carStypeId);
					//Ext.getCmp('modelId').setValue(so.modelName);
					//Ext.getCmp('zone').setValue(so.zoneName);
//					Ext.getCmp('carStyle').setValue(this.tempData.carXi);
//					Ext.getCmp('modelId').setValue(this.tempData.modelName);
//					Ext.getCmp('zone').setValue(this.tempData.zoneName);
				}
			});
		}
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		

		//汽车参照
	returnCarMessageInfo = function(obj){
		/*Ext.getCmp('factoryName').setValue(obj.id);//制造商id
		Ext.getCmp('factoryName').setRawValue(obj.carFirmName);
		
		Ext.getCmp('carNumber').setValue(obj.carNumber);//车型编号
		Ext.getCmp('carStyleName').setValue(obj.carStyleName);//车系
		Ext.getCmp('carModelName').setValue(obj.carModelName);//车型
		Ext.getCmp('displacement').setValue(obj.displacementValue);//排量
		Ext.getCmp('configuration').setValue(obj.configuration);//配置
		Ext.getCmp('seating').setValue(obj.seatingValue);//座位数
*/	}
	}
});
