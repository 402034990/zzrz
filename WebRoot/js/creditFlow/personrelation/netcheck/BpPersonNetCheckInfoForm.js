/**
 * @author
 * @class SlSupervisionRecord
 * @extends Ext.Panel
 * @description 网审信息
 * @company 智维软件
 * @createtime:
 */
BpPersonNetCheckInfoForm = Ext.extend(Ext.Panel, {
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
		if (typeof(_cfg.isAllReadOnly) != "undefined") {
			this.isAllReadOnly = _cfg.isAllReadOnly;
		}
		Ext.applyIf(this, _cfg);
		BpPersonNetCheckInfoForm.superclass.constructor.call(this, {
			border : false,
			columnWidth : 1,
			layout : 'column',
			defaults : {
				anchor : '100%',
				columnWidth : .1
			},
			items : [{/*
					xtype : "hidden",
					name : "slSmallloanProject.projectId",
					value : this.projectId
				*/}/*,{
				columnWidth : 1,
				layout : 'column',
				items : [{
					layout : "form", // 从上往下的布局
					columnWidth : .25,
					items : [{
						fieldLabel : '监管人',
						name : 'bpPersonNetCheckInfo.superviseManagerName',
						value : currentUserFullName,
						xtype : 'textfield',
						anchor : '100%',
						readOnly : true
					}, {
						xtype : "hidden",
						name : "bpPersonNetCheckInfo.superviseManager",
						value : currentUserId
					}]
				}, {
					layout : "form", // 从上往下的布局
					columnWidth : .25,
					items : [{
						fieldLabel : '监管时间',
						name : 'bpPersonNetCheckInfo.superviseManageTime',
						xtype : 'datefield',
						format : 'Y-m-d',
						value : new Date(),
						allowBlank : false,
						anchor : '100%'
					}]
				}]
			}, */,{
				columnWidth : 1,
				layout : 'column',
				readOnly:this.isAllReadOnly,
				items : [{
					layout : "form", // 从上往下的布局
					columnWidth : .25,
					items : [{
						fieldLabel : '过户次数',
						readOnly:this.isAllReadOnly,
						name : 'slSmallloanProject.nameNumeber',
						xtype : 'textfield',
						anchor : '100%'
					
						/*
						xtype : "diccombo",
						fieldLabel : '监管方式',
						hiddenName : 'bpPersonNetCheckInfo.superviseManageMode',
						itemName : '监管方式', // xx代表分类名称
						isDisplayItemName : false,
						allowBlank : false,
						editable : false,
						value : null,
						emptyText : "请选择",
						anchor : '100%',
						listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									combox.clearInvalid();
									if (combox.getValue() > 0) {
										combox.setValue(combox.getValue());
									}
								})
							}
						}
					*/}]
				}, {
					columnWidth : .03, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 22,
					items : [{
						fieldLabel : "<span style='margin-left:1px'>次</span> ",
						labelSeparator : '',
						anchor : "50%"
					}]
						},{
					layout : "form", // 从上往下的布局
					columnWidth : .25,
					items : [{
						fieldLabel : '抵押次数',
						readOnly:this.isAllReadOnly,
						name : 'slSmallloanProject.violationsNumber',
						xtype : 'textfield',
						anchor : '100%'
					/*
						xtype : "diccombo",
						fieldLabel : '监管意见',
						hiddenName : 'bpPersonNetCheckInfo.superviseManageOpinion',
						itemName : '监管意见', // xx代表分类名称
						isDisplayItemName : false,
						allowBlank : false,
						editable : false,
						value : null,
						emptyText : "请选择",
						anchor : '100%',
						listeners : {
							afterrender : function(combox) {
								var st = combox.getStore();
								st.on("load", function() {
									combox.clearInvalid();
									if (combox.getValue() > 0) {
										combox.setValue(combox.getValue());
									}
								})
							}
						}
					*/}]
				},{
					columnWidth : .03, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 22,
					items : [{
						fieldLabel : "<span style='margin-left:1px'>次</span> ",
						labelSeparator : '',
						anchor : "50%"
					}]
						}]
			}/*, {
				columnWidth : 1,
				layout : 'column',
				items : [{
					layout : "form", // 从上往下的布局
					columnWidth : 1,
					items : [{
						fieldLabel : '备注',
						name : 'bpPersonNetCheckInfo.superviseManageRemark',
						xtype : 'textarea',
						anchor : '100%'
					}]
				}]
			}*/]
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
	cancel : function() {/*
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
	*/},
	save : function() {/*
		var grid = this.grid;
		this.formPanel.getForm().submit({
			url : __ctxPath
//					+ "/project/saveSuperviseRecordSlSmallloanProject.do",
					+ "/bpPersonNetCheckInfo/saveBpPersonNetCheckInfo.do",
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
	*/}
});
