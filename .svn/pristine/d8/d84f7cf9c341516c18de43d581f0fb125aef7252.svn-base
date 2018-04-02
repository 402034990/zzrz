/**
 * 重置密码
 */
var setPasswordForm = function(userId){
	var formPanel = new Ext.FormPanel({
				url : __ctxPath+ '/system/createPasswordAppUser.do',
				layout : 'form',
				id:'setPasswordForm',
				bodyStyle:'padding:15px',                                     
				border:false,
				defaults : {
					labelWidth : 75,
					anchor : '100%,100%'
				},
	        	defaultType : 'textfield',
				items : [{
							name : 'appUserUserId',
							id : 'appUserUserId',
							xtype:'hidden',
							value : userId
						}, 
						{
							fieldLabel : '重设密码',
							name:'newpassword',
							id:'newpassword',
							inputType : 'password',
							maxLength:18,
							maxLengthText:'密码不能超过0—18位',
							allowBlank : false,
							blankText : '密码不能少于8位!'
						},
						{
							fieldLabel : '确认密码',
							name:'password',
							id:'password',
							inputType : 'password',
							maxLength:18,
							maxLengthText:'密码不能超过0—18位',
							allowBlank : false,
							blankText : '密码不能少于8位!'
						}
						]
			});
			
	var setPassword = new Ext.Window({
		title:'重置密码',
		iconCls:'btn-password',
		width : 350,
		height : 145,
		modal: true,
		layout : 'fit',
		buttonAlign : 'center',
		items:[formPanel],
		buttons : [{
					text : '保存',
					iconCls:'btn-save',
					handler : function() {debugger
						var fp=Ext.getCmp('setPasswordForm');
						var firstPass=Ext.getCmp('newpassword').getValue();
						var secondPass=Ext.getCmp('password').getValue();
						if(firstPass==""){
							Ext.ux.Toast.msg('操作信息', '密码不能为空');
						}else if(secondPass==""){
							Ext.ux.Toast.msg('操作信息', '请再次输入密码');
						}else if(firstPass!=secondPass){
							Ext.ux.Toast.msg('操作信息', '两次密码不一致，请重新输入');
							Ext.getCmp('setPasswordForm').getForm().reset();
							return false;
						}else if(firstPass.length<8){
							Ext.ux.Toast.msg('操作信息', '密码至少8位以上');
							return false;
						}else if(/^[0-9]+$/.test(firstPass)){
							Ext.ux.Toast.msg('操作信息', '密码必须是不能只为数字');
							return false;
						}else if(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(firstPass)){
							Ext.ux.Toast.msg('操作信息', '密码必须有特殊字符');
							return false;
						}else{
							var newpassword=hex_md5(firstPass);
							var password=hex_md5(secondPass);
							var appUserUserId=userId;
							if (fp.getForm().isValid()) {
							 Ext.Ajax.request({
									url : __ctxPath + '/system/createPasswordAppUser.do',
									method : 'POST',
									scope:this,
									success :function(response, request){debugger
										var result = Ext.util.JSON.decode(response.responseText);
										if(result.failure){
										    Ext.ux.Toast.msg('错误提示', result.msg);
										}else {
											Ext.ux.Toast.msg('操作信息', '密码修改成功！');
										}
										setPassword.close();
									},
									params : {
										appUserUserId:userId,
										newpassword:newpassword,
										password:password
									}
						       })
							}
						}
					}
				}, {
					text : '取消',
					iconCls:'btn-cancel',
					handler : function() {
						setPassword.close();
					}
				}]
			});
	setPassword.show();
};
