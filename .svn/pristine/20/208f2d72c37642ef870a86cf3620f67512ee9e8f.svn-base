/**
 * @author 
 * @createtime 
 * @class SlFundDetailForm
 * @extends Ext.Window
 * @description SlFundDetail表单
 * @company 智维软件
 */
punishEditQlideCheck = Ext.extend(Ext.Window, {
			//构造函数
			constructor : function(_cfg) {
				if(typeof(_cfg.punishInterestId)!="undefined")
						{
						      this.punishInterestId=_cfg.punishInterestId;
						}
							if(typeof(_cfg.editqlideMoney)!="undefined")
						{
						      this.editqlideMoney=_cfg.editqlideMoney;
						}
							if(typeof(_cfg.notMoney)!="undefined")
						{
						      this.notMoney=_cfg.notMoney;
						}
				Ext.applyIf(this, _cfg);
				//必须先初始化组件
				this.initUIComponents();
				punishEditQlideCheck.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					height : 150,
					width : 320,
					//maximizable : true,
					resizable:false,
					title : '填写金额',
					buttonAlign : 'center',
					buttons : [{
						text : '对账',
						iconCls : 'btn-save',
						scope : this,
						handler : this.save
					}, {
						text : '取消',
						iconCls : 'btn-cancel',
						scope : this,
						handler : this.cancel
					}]
				});
			},//end of the constructor
			//初始化组件
			initUIComponents : function() {
				var editqlideMoney=this.editqlideMoney
				var notMoney=this.notMoney
		
				this.formPanel = new Ext.FormPanel({
					layout : 'form',
					bodyStyle : 'padding:10px',
					border : false,
					autoScroll:true,
					items : [{
						name : 'slFundQlide.fundQlideId',
						xtype : 'hidden',
						value : this.fundQlideId == null ? '' : this.fundQlideId
					},{                                
						fieldLabel : '本次对账金额(元)',	
						labelAlign :'right',
						name : 'slFundQlide.notMoney',
						xtype:'numberfield',
						id : 'editqlied',
						value : this.notMoney
					//	value :this.editqlideMoney
						/*listeners: {  
							blur: function(p){
								if(p.getValue()<0){
									Ext.Msg.alert('状态', "金额不能为负数");
								}
								if(p.getValue()>editqlideMoney){
									Ext.Msg.alert('状态', "金额不能大于流水的未对账金额");
								}
								if(p.getValue()>notMoney){
									Ext.Msg.alert('状态', "金额不能大于款项的未对账金额");
								}
							}																									
						}*/
					}]
				});
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
				var tabflag=this.tabflag;
				var money = Ext.getCmp('editqlied');
				if(money.getValue()>this.notMoney){
					Ext.Msg.alert('状态', "金额不能大于款项的未对账金额");
					return null;
				}
				if(money.getValue()>this.editqlideMoney){
					Ext.Msg.alert('状态', "金额不能大于流水的未对账金额");
					return null;
				}
				if(money.getValue()<0){
					Ext.Msg.alert('状态', "金额不能为负数");
					return null;
				}
				
				this.formPanel.getForm().submit({
		            scope : this,
		            url :  __ctxPath + '/creditFlow/finance/editQlideCheckSlPunishInterest.do',
		            method : 'post',
		            params : {
			            fundQlideId : this.fundQlideId,
			            punishInterestId : this.punishInterestId
		            },
		            waitMsg : '正在提交数据...',
		            success : function(fp, action) {
		                Ext.ux.Toast.msg('操作信息', '对账成功！');
						var gridPanel = Ext.getCmp('SlPunishInterestGrid');
		                if (gridPanel != null) {
				        	gridPanel.getStore().reload();
		             	}
						this.close()
	            	}
	            })
			}//end of save
		});