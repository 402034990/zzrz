/**
 * @author
 * @class AgentCreditInfoPanel
 * @extends Ext.Panel
 * @description [PlProjectArchives]管理
 * @company 智维软件
 * @createtime:
 */
/**
 * @author lisl
 * @extends Ext.Panel
 * @description 小贷项目管理
 * @company 智维软件
 * @createtime:
 */
AgentCreditInfoPanel = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	isCPLX : false,
	
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}else if(typeof(_cfg.isCPLX) != "undefined") {
			this.isCPLX = _cfg.isCPLX;
		}
		Ext.applyIf(this, _cfg);
		var leftlabel = 85;
		AgentCreditInfoPanel.superclass.constructor.call(
				this, {
					items : [{
						layout : "column",
						border : false,
						scope : this,
						defaults : {
							anchor : '100%',
							// columnWidth : 1,
							isFormField : true,
							labelWidth : leftlabel
						},
						items : [{
									xtype : 'hidden',
									name : 'agentAproval.id'
								}, {
									columnWidth : .7, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 90,
									items : [{
										fieldLabel : "授信编号",
										xtype : "textfield",
										readOnly : true,
										name : "agentAproval.aprovalProjectNumber",
										blankText : "授信编号不能为空，请正确填写!",
										anchor : "100%"// 控制文本框的长度
									}]
								}, {
									columnWidth :.3, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 90,
									labelAlign : 'right',
									items : [{
										fieldLabel : "申请人",
										xtype : "textfield",
										name : "agentAproval.cratePersonName",
										readOnly : true,
										blankText : "申请人不能为空，请正确填写!",
										anchor : "100%"
									}]
								},{
									columnWidth :.7, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 90,
									labelAlign : 'right',
									items : [{
										fieldLabel : "代理商名称",
										xtype : "textfield",
										name : "agentAproval.agentName",
										readOnly : true,
										blankText : "代理商名称不能为空，请正确填写!",
										anchor : "100%"
									}]
								},{
									columnWidth :.3, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 90,
									labelAlign : 'right',
									items : [{
										fieldLabel : "代理商编号",
										xtype : "textfield",
										name : "agentAproval.branchNO",
										readOnly : true,
										blankText : "代理商编号不能为空，请正确填写!",
										anchor : "100%"
									}]
								}, {
									columnWidth :.35, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 90,
									labelAlign : 'right',
									items : [{
										fieldLabel : "联系电话",
										xtype : "textfield",
										name : "agentAproval.telphone",
										readOnly : true,
										blankText : "联系电话不能为空，请正确填写!",
										anchor : "100%"
									}]
								},{
									columnWidth :.35, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 90,
									labelAlign : 'right',
									items : [{
										fieldLabel : "邮政编码",
										xtype : "textfield",
										name : "agentAproval.postCode",
										readOnly : true,
										blankText : "联系电话不能为空，请正确填写!",
										anchor : "100%"
									}]
								},{
									columnWidth :.3, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 90,
									labelAlign : 'right',
									items : [{
										fieldLabel : "法定代表人",
										xtype : "textfield",
										name : "agentAproval.legalpersonName",
										readOnly : true,
										blankText : "法定代表人不能为空，请正确填写!",
										anchor : "100%"
									}]
								},{
									columnWidth :1, // 该列在整行中所占的百分比
									layout : "form", // 从上往下的布局
									labelWidth : 90,
									labelAlign : 'right',
									items : [{
										fieldLabel : "地址",
										xtype : "textfield",
										name : "agentAproval.address",
										readOnly : true,
										blankText : "地址不能为空，请正确填写!",
										anchor : "100%"
									}]
								}]
					}]
				});
	}
});
