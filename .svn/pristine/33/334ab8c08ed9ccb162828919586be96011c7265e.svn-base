MortgageStoreWindow = Ext.extend(Ext.Window, {
	layout : 'anchor',
	anchor : '100%',
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		MortgageStoreWindow.superclass.constructor.call(this, {
	        width:'40%',
	        buttonAlign:'center',
	        title:this.flag==0?'入库办理':'出库办理',
	        modal:true,
	        resizable:false,
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
		
	   this.transactPanel = new Ext.FormPanel( {
			url: __ctxPath +'/credit/mortgage/multiSaveCsProcreditMortgageRecord.do',
			layout : 'column',
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
			   columnWidth:0.5,
			   layout:'form',
			   border:false,
			   labelWidth:60,
			   labelAlign:'right',
			   items:[{
			      	xtype:'datefield',
			      	format:'Y-m-d',
			      	anchor : '100%',
			      	fieldLabel:this.flag==0?'入库时间':'出库时间',
			      	allowBlank:false,
			      	readOnly:this.isAllReadOnly,
			      	name:'csProcreditMortgageRecord.storehouseDate'
			   },{
			   	  xtype:'hidden',
			   	  name:'csProcreditMortgageRecord.storehouseStatus',
			   	  value:this.flag==0?1:2
			   },{
			   	  xtype:'hidden',
			   	  value:this.ids,
			   	  name:'ids'
			   }]
			},{
			   columnWidth:0.5,
			   layout:'form',
			   border:false,
			   labelWidth:60,
			   labelAlign:'right',
			   items:[{
			   		xtype:"hidden",
			   		name:"csProcreditMortgageRecord.storehousePersonId",
			   		value:currentUserId
			   	},{
					fieldLabel : "办理人",
					xtype : "combo",
					editable : false,
					triggerClass : 'x-form-search-trigger',
					itemVale : creditkindDicId, // xx代表分类名称
					hiddenName : "storehousePerson",
					readOnly : true,
				    anchor : "100%",
				    allowBlank:false,
				    value:currentUserFullName
				   /*,onTriggerClick : function(cc) {
					     var obj = this;
					     var appuerIdObj=obj.previousSibling();
						 new UserDialog({
						 	userIds:appuerIdObj.getValue(),
						 	userName:obj.getValue(),
							single : false,
							title:"办理人",
							callback : function(uId, uname) {
								obj.setRawValue(uname);
								appuerIdObj.setValue(uId);
							}
						}).show();
					}*/
				}]
			},{
				columnWidth:1,
				layout:'form',
				border:false,
				labelWidth:60,
				labelAlign:'right',
				hidden:this.flag==1?true:false,
				disabled:this.flag==1?true:false,
				items:[{
					xtype:'textfield',
					anchor : '100%',
					fieldLabel:'存放位置',
					allowBlank:this.flag==1?true:false,
					readOnly:this.isAllReadOnly,
					name:'csProcreditMortgageRecord.storehouseSite'
				}]
			},{
			   columnWidth:1,
			   layout:'form',
			   border:false,
			   labelAlign:'right',
			   labelWidth:60,
			   items:[{
			       xtype:'textarea',
			       anchor : '100%',
			       fieldLabel:'备注',
			       readOnly:this.isAllReadOnly,
			       name:'csProcreditMortgageRecord.storehouseRemark'
			   }]
			}]
		})
	},
	save:function(){
	    var grid=this.gridPanel;
	    var window=this;
	    this.transactPanel.getForm().submit({
			method : 'POST',
			waitTitle : '连接',
			waitMsg : '消息发送中...',
			success : function(form ,action) {
				Ext.ux.Toast.msg('操作信息','提交成功');
				window.close()
				grid.getStore().reload()
			},
			failure : function(form, action) {
				Ext.ux.Toast.msg('操作信息','提交失败！');		
			}
		})
	}
});