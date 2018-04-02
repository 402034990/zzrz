
/**
 * 修改密码
 */
var ResetPasswordForm = function(userId){
	var formPanel = new Ext.FormPanel({
		url : __ctxPath+ '/system/resetPasswordAppUser.do',
		layout : 'form',
		id:'setPasswordForm',
		frame : false,
		model : true,
		bodyStyle : 'padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;',
		defaults : {
			widht : 400,
			anchor : '99%,99%'
		},
    	defaultType : 'textfield',
		items : [{
			name : 'appUserUserId',
			id : 'appUserUserId',
			xtype:'hidden',
			value : userId
		}, {
			fieldLabel : '旧密码',
			name : 'oldPassword',
			id : 'oldPassword',
			inputType : 'password',
			allowBlank : false
		}, {
			fieldLabel : '新密码',
			name : 'newPassword',
			id : 'newPassword',
			inputType : 'password',
			allowBlank : false,
			regex : /[^\s]+/,
			regexText : '新密码不能包含空格！'
		}, {
			fieldLabel : '再输入',
			name : 'againPassword',
			id : 'againPassword',
			inputType : 'password',
			regex : /[^\s]+/,
			regexText : '确认密码中不能包含空格！',
			allowBlank : false
		}]
	});
			
	var setPassword = new Ext.Window({
		title:'修改密码',
		iconCls:'btn-password',
		width : 300,
		height : 155,
		minWidth : 300,
		minHeight : 155,
		maximizable : true,
		modal: true,
		layout : 'fit',
		buttonAlign : 'center',
		anchor : '99%,99%',
		items:[formPanel],
		buttons : [{
			text : '保存',
			iconCls:'btn-save',
			handler : function() {
				var fp=Ext.getCmp('setPasswordForm');
				if (fp.getForm().isValid()) {
					var oldPwd = fp.getCmpByName('newPassword').getValue();
					var oldPwds = fp.getCmpByName('againPassword').getValue();
					if(oldPwd == '' || oldPwd == ' '){
						Ext.ux.Toast.msg('操作提示','输入密码不能为空！');
						return;
					}
					if(oldPwds == '' || oldPwds == ' '){
						Ext.ux.Toast.msg('操作提示','输入确认密码不能为空！');
						return;
					}
					if(oldPwd != oldPwds ){
						Ext.ux.Toast.msg('操作提示', '新密码和确认密码不一致，请重新输入！');
						return;
					}
					if(oldPwd.length<8){
						Ext.ux.Toast.msg('操作信息', '密码至少8位以上');
						return false;
					}
					if(/^[0-9]+$/.test(oldPwd)){
						Ext.ux.Toast.msg('操作信息', '密码必须是不能只为数字');
						return false;
					}
					if(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(oldPwd)){
						Ext.ux.Toast.msg('操作信息', '密码必须有特殊字符');
						return false;
					}
					var oldPassword=hex_md5(fp.getCmpByName('oldPassword').getValue());
					var newPassword=hex_md5(fp.getCmpByName('newPassword').getValue());
					var againPassword=hex_md5(fp.getCmpByName('againPassword').getValue());
			       Ext.Ajax.request({
								url : __ctxPath + '/system/resetPasswordAppUser.do',
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
									oldPassword:oldPassword,
									newPassword:newPassword,
									againPassword:againPassword
								}
					       })
//					fp.getForm().submit({
//						method: 'post',
//						waitMsg : '正在提交数据...',
//						success : function(fp,action) {
//							Ext.ux.Toast.msg('操作信息', '密码修改成功！');
//							setPassword.close();
//						},
//						failure : function(fp,action) {
//							Ext.ux.Toast.msg('错误提示',action.result.msg);
//							Ext.getCmp('setPasswordForm').getForm().reset();
//						}
//					});
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
