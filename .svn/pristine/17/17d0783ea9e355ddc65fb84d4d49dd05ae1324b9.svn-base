/**
 * @author
 * @class SlCarView
 * @extends Ext.Panel
 * @description [SlCar]管理
 * @company 互融软件
 * @createtime:
 */
VehicleNoQualifiedForm = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		VehicleNoQualifiedForm.superclass.constructor.call(this, {
			anchor : '95%',
			items : [{
				layout : 'column',
				xtype : 'fieldset',
				title : '填写<车辆车易贷(无合格证)>详细信息',
				collapsible : true,
				autoHeight : true,				
				items : [{
					columnWidth : 1,
					labelWidth : 110,
					layout : 'form',
					defaults : {
						anchor : '97.5%'
					},
					items : [{
								xtype : 'textfield',
								fieldLabel : '制造商',
								allowBlank : false,
								name : 'procreditMortgageCar.carManufacturer'//accidenttimes
							}]
				}, {
					columnWidth : .5,
					layout : 'form',
					labelWidth : 110,
					defaults : {
						xtype : 'textfield',
						anchor : '100%'
					},
					items : [{
								xtype : 'textfield',
								fieldLabel : '车型',
								allowBlank : false,
								name : 'procreditMortgageCar.carModel'
							},{
								xtype : 'textfield',
								allowBlank : false,
								fieldLabel : '数量',
								name : 'procreditMortgageCar.carCount'
							}]
				}, {
					columnWidth : .5,
					layout : 'form',
					labelWidth : 110,
					defaults : {
						xtype : 'textfield',
						anchor : '95%'
					},
					items : [{
						       xtype : 'combo',
						       mode : 'local',
						       valueField : 'id',
						       editable : false,
						       readOnly : false,
						       allowBlank : false,
						       displayField : 'value',
						       value:1,
						       store : new Ext.data.SimpleStore({
							   fields : ["value","id"],
							   data : [["是",1], ["否",0]]
						       }),
						      triggerAction : "all",
						      hiddenName : 'procreditMortgageCar.isImport',
						      anchor : "100%",
						      fieldLabel : '是否进口车'
					},{
								xtype : "dickeycombo",
								nodeKey : 'clys',
								hiddenName : "procreditMortgageCar.carColor",
								fieldLabel : "车辆颜色",
								itemName : '车辆颜色', // xx代表分类名称
								listeners : {
									afterrender : function(combox) {
										var st = combox.getStore();
										st.on("load", function() {
													combox.setValue(combox.getValue());
													combox.clearInvalid();
												})
									}
								}
							},{
								xtype : 'hidden',
								name : 'procreditMortgageCar.objectType',
								value : this.objectType
							},{
								xtype : 'hidden',
								name : 'procreditMortgageCar.id'
							}]
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
				preName : ['procreditMortgageCar','vCarDic'],
				scope : this,
				success : function(resp, options) {
			}
			});
		}
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
	}
});
