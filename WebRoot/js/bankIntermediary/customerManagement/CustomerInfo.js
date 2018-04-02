/**
 * 客户基本信息
 * 
 * @class CustomerInfo
 * @extends Ext.Panel
 */
CustomerInfo = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	isHiddenCustomerSource:false,//是否隐藏客户来源
	isHiddenTelephone:false,//是否隐藏联系电话
	isHiddenSeeDetails:false,//是否隐藏查看详情按钮
	isHiddenFile:false,//是否异常客户建档按钮
	isHiddenMerger:false,//是否隐藏客户合并按钮
	isHiddenFileInfo:false,//是否隐藏客户档案按钮
	constructor : function(_cfg) {
		if (typeof(_cfg.isHiddenCustomerSource) != "undefined") {
			this.isHiddenCustomerSource = _cfg.isHiddenCustomerSource;
		}
		if (typeof(_cfg.isHiddenTelephone) != "undefined") {
			this.isHiddenTelephone = _cfg.isHiddenTelephone;
		}
		if (typeof(_cfg.isHiddenSeeDetails) != "undefined") {
			this.isHiddenSeeDetails = _cfg.isHiddenSeeDetails;
		}
		if (typeof(_cfg.isHiddenFile) != "undefined") {
			this.isHiddenFile = _cfg.isHiddenFile;
		}
		if (typeof(_cfg.isHiddenMerger) != "undefined") {
			this.isHiddenMerger = _cfg.isHiddenMerger;
		}
		if (typeof(_cfg.isHiddenFileInfo) != "undefined") {
			this.isHiddenFileInfo = _cfg.isHiddenFileInfo;
		}
		Ext.applyIf(this, _cfg);
		CustomerInfo.superclass.constructor.call(this, {
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true,
					labelWidth : 100
				},
				items : [{
					xtype : 'hidden',
					name : 'person.id'
				}, {
					columnWidth : .33, 
					layout : "form", 
					labelWidth : 70,
					items : [{
						xtype : 'combo',
						triggerClass : 'x-form-search-trigger',
						fieldLabel : "客户类型",
						name : "person.name",
						allowBlank : false,
						editable : false,
						blankText : "客户类型不能为空，请正确填写!",
						anchor : "100%",
						mode : 'romote',
						triggerAction : 'all'
					}]
				}, {
					columnWidth : .33, 
					layout : "form", 
					labelWidth : 70,
					hidden:this.isHiddenCustomerSource,
					items : [{
						fieldLabel : "客户来源",
						xtype : "diccombo",
						hiddenName : '',
						itemName : '客户来源', 
						// allowBlank : false,
						emptyText : "请选择",
						editable : false,
						blankText : "客户来源不能为空，请正确填写!",
						anchor : "100%",
						listeners : {
							afterrender : function(combox) {
								combox.clearInvalid();
								var st = combox.getStore();
								st.on("load", function() {
									combox.setValue(combox.getValue());
									combox.clearInvalid();
								});
							}
						}
					}]
				}, {
					columnWidth : .29, 
					layout : "form", 
					labelWidth : 85,
					hidden:this.isHiddenTelephone,
					items : [{
						xtype : "textfield",
						fieldLabel : "联系电话",
						name : "person.cellphone",
						allowBlank : false,
						anchor : "100%"
						// regex : /^[1][34578][0-9]{9}$/,
						// regexText : '手机号码格式不正确'
					}]
				}, {
					columnWidth : .33,
					layout : "form",
					labelWidth : 70,
					items : [{ 
						xtype : "textfield",
						fieldLabel : "地区",
						// allowBlank : false,
						name : "person.postaddress",
						anchor : "100%"
					}]
				}, {
					columnWidth : .33,
					layout : "form", 
					labelWidth : 70,
					items : [{ 
						xtype : "textfield",
						fieldLabel : "客户姓名",
						allowBlank : false,
						name : "person.name",
						anchor : "100%"
					}]
				},{
					columnWidth : 1,
					layout : "form", 
					labelWidth : 70,
					hidden:this.isHiddenSeeDetails,
					items : [{ 
						xtype : "button",
						text : "查看详情",
						anchor : "15%",
						style : 'margin-left:92%',
						handler:this.customerFileInfo
					}]
				},/*{
					columnWidth : 1,
					layout : "form", 
					labelWidth : 70,
					hidden:this.isHiddenFile,
					items : [{ 
						xtype : "button",
						text : "客户建档",
						anchor : "15%",
						handler:this.customerFile,
						style : 'margin-left:92%'
						
					}]
				},*/{
					columnWidth : 1,
					layout : "form", 
					labelWidth : 70,
					hidden:this.isHiddenMerger,
					items : [{ 
						xtype : "button",
						text : "客户合并",
						anchor : "15%",
						style : 'margin-left:92%',
						handler:this.customerMerger
					}]
				}/*,{
					columnWidth : 1,
					layout : "form", 
					labelWidth : 70,
					hidden:this.isHiddenFileInfo,
					items : [{ 
						xtype : "button",
						text : "客户档案",
						anchor : "15%",
						style : 'margin-left:92%',
						handler:this.customerFileInfo
					}]
				}*/]
			}]
		});
	},
	//客户合并
	customerMerger:function(){
		new CustomerMerger().show();//客户合并页面
		//Ext.getCmp('CustomerQuery').close();
	},
	//客户建档
	customerFile:function(){
		new telephoneNO().show();//
		Ext.getCmp('CustomerQuery').close();
	},
	//客户档案信息
	customerFileInfo:function(){
		//obj = Ext.util.JSON.decode(response.responseText);
		//var personData = obj.data;
		var randomId = rand(100000);
		//var id = "see_person" + randomId;
		var anchor = '100%';
		var window_see = new Ext.Window({
			title : '查看个人客户详细信息',
			layout : 'fit',
			width : (screen.width - 180) * 0.7+ 160,
			maximizable : true,
			height : 460,
			closable : true,
			modal : true,
			plain : true,
			border : false,
			items : [new personObj({
				url : null,
				//id : id,
				//personData : personData,
				isReadOnly : true
			})],
			listeners : {
				'beforeclose' : function(panel) {
				 	window_see.destroy();
				 }
			}
		});
		window_see.show();
	}
});