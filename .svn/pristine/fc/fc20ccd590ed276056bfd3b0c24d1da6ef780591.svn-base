/**
 * 客户快速查询
 * @class quickPerson
 * @extends Ext.Window
 */
quickPerson = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.applyIf(this, _cfg);
		this.initComponents();
		telephoneNO.superclass.constructor.call(this, {
			id : 'quickPerson',
			layout : 'form',
			items : this.formPanel,
			modal : true,
			frame:true,
			autoScroll:true,
			autoHeight:true,
			width : 300,
			maximizable : true,
			frame:true,
			resizable:false,
			title : '',
			buttonAlign : 'center'
			/*buttons :[{
				text:'确定',
				iconCls : 'btn-ok',
				handler : this.save.createCallback(this.formPanel, this)
			},'-', {
				text : '取消',
				iconCls : 'btn-cancel',
				handler : this.cancel.createCallback(this)
			}]*/
		});
	},
	initComponents : function() {
		this.formPanel = new Ext.FormPanel({
			//id : "",
			frame:true,
			border : false,
			monitorValid : true,
			autoScroll : true,
			anchor : "100%",
			bodyStyle : 'padding-left:0px;padding-top:14px',
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
					layout : "form",
					columnWidth : 1,
					labelWidth : 60,
					items:[{  
						id:'telephoneNumber',
						name : "telephone",
	                    xtype:"textfield",  
	                    fieldLabel: '电话号码',  
	                    anchor : "98%",
	                    style:'height:30px;'
                    }]  
				},{
					//title: '',
					columnWidth : .33,
					id:'button1',
					xtype:'button',
           	 		border: true, 
            		//html: ''
           	 		text: '1',
           	 		//value:1,
           	 		scale: "large",
           	 		handler:function(){
						var tele = Ext.getCmp('quickPerson').getCmpByName('telephone').getValue();
						if (typeof(tele) != "undefined") {
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue(tele+'1');
						}else{
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue('1');
						}
           	 		}
				},{
					//title: '',
					columnWidth : .33,
					id:'button2',
					xtype:'button',
           	 		border: true, 
            		//html: ''
           	 		text: '2',
           	 		//value:2,
           	 		scale: "large",
           	 		handler:function(){
           	 			var tele = Ext.getCmp('quickPerson').getCmpByName('telephone').getValue();
						if (typeof(tele) != "undefined") {
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue(tele+'2');
						}else{
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue('2');
						}
           	 		}
				},{
					//title: '',
					columnWidth : .33,
					id:'button3',
					xtype:'button',
           	 		border: true, 
            		//html: ''
           	 		text: '3',
           	 		//value:3,
           	 		scale: "large",
           	 		handler:function(){
           	 			var tele = Ext.getCmp('quickPerson').getCmpByName('telephone').getValue();
						if (typeof(tele) != "undefined") {
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue(tele+'3');
						}else{
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue('3');
						}
           	 		}
				},{
					//title: '',
					columnWidth : .33,
					id:'button4',
					xtype:'button',
           	 		border: true, 
            		//html: ''
           	 		text: '4',
           	 		//value:4,
           	 		scale: "large",
           	 		handler:function(){
           	 			var tele = Ext.getCmp('quickPerson').getCmpByName('telephone').getValue();
						if (typeof(tele) != "undefined") {
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue(tele+'4');
						}else{
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue('4');
						}
           	 		}
				},{
					//title: '',
					columnWidth : .33,
					id:'button5',
					xtype:'button',
           	 		border: true, 
            		//html: ''
           	 		text: '5',
           	 		//value:5,
           	 		scale: "large",
           	 		handler:function(){
           	 			var tele = Ext.getCmp('quickPerson').getCmpByName('telephone').getValue();
						if (typeof(tele) != "undefined") {
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue(tele+'5');
						}else{
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue('5');
						}
           	 		}
				},{
					//title: '',
					columnWidth : .33,
					id:'button6',
					xtype:'button',
           	 		border: true, 
            		//html: ''
           	 		text: '6',
           	 		//value:6,
           	 		scale: "large",
           	 		handler:function(){
           	 			var tele = Ext.getCmp('quickPerson').getCmpByName('telephone').getValue();
						if (typeof(tele) != "undefined") {
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue(tele+'6');
						}else{
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue('6');
						}
           	 		}
				},{
					//title: '',
					columnWidth : .33,
					id:'button7',
					xtype:'button',
           	 		border: true, 
            		//html: ''
           	 		text: '7',
           	 		//value:7,
           	 		scale: "large",
           	 		handler:function(){
           	 			var tele = Ext.getCmp('quickPerson').getCmpByName('telephone').getValue();
						if (typeof(tele) != "undefined") {
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue(tele+'7');
						}else{
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue('7');
						}
           	 		}
				},{
					//title: '',
					columnWidth : .33,
					id:'button8',
					xtype:'button',
           	 		border: true, 
            		//html: ''
           	 		text: '8',
           	 		//value:8,
           	 		scale: "large",
           	 		handler:function(){
           	 			var tele = Ext.getCmp('quickPerson').getCmpByName('telephone').getValue();
						if (typeof(tele) != "undefined") {
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue(tele+'8');
						}else{
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue('8');
						}
           	 		}
				},{
					//title: '',
					columnWidth : .33,
					id:'button9',
					xtype:'button',
           	 		border: true, 
            		//html: ''
           	 		text: '9',
           	 		//value:9,
           	 		scale: "large",
           	 		handler:function(){
           	 			var tele = Ext.getCmp('quickPerson').getCmpByName('telephone').getValue();
						if (typeof(tele) != "undefined") {
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue(tele+'9');
						}else{
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue('9');
						}
           	 		}
				},{
					//title: '',
					columnWidth : .33,
					id:'button10',
					xtype:'button',
           	 		border: true, 
            		//html: ''
           	 		text: '-',
           	 		//value:'-',
           	 		scale: "large",
           	 		handler:function(){
           	 			var tele = Ext.getCmp('quickPerson').getCmpByName('telephone').getValue();
						if (typeof(tele) != "undefined") {
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue(tele+'-');
						}else{
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue('-');
						}
           	 		}
				},{
					//title: '',
					columnWidth : .33,
					id:'button0',
					xtype:'button',
           	 		border: true, 
            		//html: ''
           	 		text: '0',
           	 		//value:0,
           	 		scale: "large",
           	 		handler:function(){
           	 			var tele = Ext.getCmp('quickPerson').getCmpByName('telephone').getValue();
						if (typeof(tele) != "undefined") {
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue(tele+'0');
						}else{
							Ext.getCmp('quickPerson').getCmpByName('telephone').setValue('0');
						}
           	 		}
				},{
					columnWidth : .33,
					id:'queryId',
					xtype:'button',
					scale: "large",//large,medium
					style:'color:red',
           	 		border: false, 
           	 		text: '查询',
           	 		handler:this.query
				},{
					columnWidth : 1,
					id:'newCustomers',
					xtype:'button',
					scale: "large",//large,medium
					style:'color:red',
           	 		border: false, 
           	 		text: '新建客户',
           	 		handler:this.newCustomers
				}]
			}]
		});
	},
	query : function( ) {
		//此处要做的事情是根据呼入进来的号码去查询,判断客户是意向/正式客户或是新客户，以弹出不同的页面进行处理
		var telephoneNumber = Ext.getCmp('telephoneNumber');
		//new telephoneNO().show();//手机号未检测到
		//Ext.getCmp('quickPerson').close();
		new CustomerQuery().show();//客户页面
	},
	newCustomers:function(){
		new telephoneNO().show();//手机号未检测到，新建客户
	},
	characterSplice : function() {
		//var tele = Ext.getCmp('telephoneNumber').value;
		//var tele = this.formPanel.getCmpByName('telephone');
		var tele = Ext.getCmp('telephoneNumber').value;
		var telephoneNumber = Ext.getCmp('telephoneNumber');
		if(tele != 'undefined'){
			telephoneNumber.setValue(tele);
		}else{
			telephoneNumber.setValue();
		}
		
		/*var button1 = Ext.getCmp('button1').value;
		var button2 = Ext.getCmp('button2').value;
		var button3 = Ext.getCmp('button3').value;
		var button4 = Ext.getCmp('button4').value;
		var button5 = Ext.getCmp('button5').value;
		var button6 = Ext.getCmp('button6').value;
		var button7 = Ext.getCmp('button7').value;
		var button8 = Ext.getCmp('button8').value;
		var button9 = Ext.getCmp('button9').value;
		var button10 = Ext.getCmp('button10').value;
		var button0 = Ext.getCmp('button0').value;
		if(button1 != 'undefined'){
			var tele = Ext.getCmp('telephoneNumber').value;
			var telephoneNumber = Ext.getCmp('telephoneNumber');
			telephoneNumber.setValue(1+telephoneNumber);
		}
		if(button2 != 'undefined'){
			var tele = Ext.getCmp('telephoneNumber').value;
			var telephoneNumber = Ext.getCmp('telephoneNumber');
			telephoneNumber.setValue(1+telephoneNumber);
		}*/
		//new telephoneNO().show();
	},
	save : function(formPanel, window) {},
	reset : function(formPanel) {
		formPanel.getForm().reset();
	},
	cancel : function(win) {
		win.close();
	}
});