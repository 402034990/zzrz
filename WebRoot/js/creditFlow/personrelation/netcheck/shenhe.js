/**
 * @author
 * @class SlSupervisionRecord
 * @extends Ext.Panel
 * @description 网审信息
 * @company 智维软件
 * @createtime:
 */
shenhe = Ext.extend(Ext.Panel, {
	projectId : null,
	ides : null,
	constructor : function(_cfg) {
		if (typeof(_cfg.projectId) != "undefined") {
			this.projectId = _cfg.projectId;
		}
		if (typeof(_cfg.ides) != "undefined") {
			this.ides = _cfg.ides;
		}
		if (typeof(_cfg.businessType) != "undefined") {
			this.businessType = _cfg.businessType;
		}
		Ext.applyIf(this, _cfg);
		shenhe.superclass.constructor.call(this, {
			border : false,
			columnWidth : 1,
			layout : 'column',
			defaults : {
				anchor : '100%',
				columnWidth : .1
			},
			items : [/*{
					xtype : "hidden",
					name : "slSmallloanProject.id",
					value : this.ides
				},*/{
				columnWidth : 1,
				layout : 'column',
				items : [{
					layout : "form", // 从上往下的布局
					columnWidth : 1,
					items : [{
						fieldLabel : '面审情况',
						name : 'slSmallloanProject.faceAudit',
						xtype : 'textarea',
						anchor : '100%',
						allowBlank : false,
						readOnly:this.readOnly
					}]
				}]
			},{
				columnWidth : 1,
				layout : 'column',
				items : [{
					layout : "form", // 从上往下的布局
					columnWidth : 1,
					items : [{
						fieldLabel : '电核情况',
						name : 'slSmallloanProject.telephoneAudit',
						xtype : 'textarea',
						allowBlank : false,
						readOnly:this.readOnly,
						anchor : '100%'
					}]
				}]
			},{
				columnWidth : 1,
				layout : 'column',
				items : [{
					layout : "form", // 从上往下的布局
					columnWidth : 1,
					items : [{
						fieldLabel : '网查情况',
						name : 'slSmallloanProject.networkAudit',
						xtype : 'textarea',
						allowBlank : false,
						readOnly:this.readOnly,
						anchor : '100%'
					}]
				}]
			}]
		});
		if (this.projectId != null && this.projectId != 'undefined') {
			this.loadData({
						url : __ctxPath
								+ '/project/getSlSmallloanProject.do?projectId='
								+ this.projectId,
						root : 'data',
						preName : 'slSmallloanProject',
						scope : this
					});
		}
	},
	/**
	 * 重置
	 * 
	 * @param {}
	 *            formPanel
	 */
	reset : function() {
		this.formPanel.getForm().reset();
	},
	/**
	 * 取消
	 * 
	 * @param {}
	 *            window
	 */
	cancel : function() {
		var store = this.uploadViews.grid_UploadsPanel.getStore();
		if (store.getCount() > 0) {
			var fileid = store.getAt(0).get('fileid');
			Ext.Ajax.request({
				url : __ctxPath + '/creditFlow/fileUploads/DeleRsFileForm.do?fileid='
						+ fileid,
				method : 'POST',
				success : function() {

				},
				failure : function(result, action) {
				}
			});
		}
		Ext.Ajax.request({
			url : __ctxPath
//					+ "/project/cancleSuperviseRecordSlSmallloanProject.do",
					+ "/creditFlow/leaseFinance/project/cancleSuperviseRecordFlLeaseFinanceProject.do",
			params : {
				superviseId : this.superviseId
			},
			method : 'POST',
			scope : this,
			success : function(response) {
			}
		})
		this.close();
	},
	save : function() {
		var grid = this.grid;
		this.formPanel.getForm().submit({
			url : __ctxPath
//					+ "/project/saveSuperviseRecordSlSmallloanProject.do",
					+ "/slSmallloanProject/saveslSmallloanProject.do",
			params : {
				superviseId : this.superviseId,
				businessType:this.businessType
			},
			scope : this,
			method : 'POST',
			success : function(fp, action) {
				Ext.ux.Toast.msg('操作信息', '保存成功!');
				grid.getStore().reload();
				this.close();
			},
			failure : function(fp, action) {
				Ext.ux.Toast.msg('操作信息', '操作失败，请联系管理员!');
			}
		});
	}
});
