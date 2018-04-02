AdvisorListSearch = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		AdvisorListSearch.superclass.constructor.call(this, {
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					labelWidth : 100
				},
				items : [{
					columnWidth : .33,
					layout : "form",
					labelWidth : 30,
					items : [{ 
						xtype : "textfield",
						fieldLabel : "姓名",
						name : "",
						anchor : "100%"
					}]
				},{
					columnWidth : .29, 
					layout : "form", 
					labelWidth : 90,
					items : [{
						xtype : "button",
						width:50,  
		            	text:'查询',
						handler:function(){  
		            	
		            	}  
					}]
				}]
			}]
		});
	}
});
