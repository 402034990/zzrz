slActualToChargePanel = Ext.extend(Ext.Panel, {
	// 构造函数
	isHidden : false,
	constructor : function(_cfg) {
		if(typeof(_cfg)!="undefined"){
			if (typeof(_cfg.projId) != "undefined") {
				this.projectId = _cfg.projId;
			}
		}
		
		Ext.applyIf(this, _cfg);
		
		this.initUIComponents();
		slActualToChargePanel.superclass.constructor.call(this, {
			layout : 'anchor',
			anchor : '100%',
			items : [{
				xtype : 'panel',
				border : false,
				bodyStyle : 'margin-bottom:5px',
				hidden : this.isHiddenTitle
			}, this.gridPanel]
		});

	},
	initUIComponents : function() {
		var summary = new Ext.ux.grid.GridSummary();
		function totalMoney(v, params, data) {
			return '总计(元)';
		}
		this.ttbar = new Ext.Toolbar({
					items : [{
								text : '生成',
								iconCls : 'btn-add',
								scope : this,
								handler : this.createRs,
								hidden : this.isHidden
							},'-',
							{
								text : '对账',
								iconCls : 'btn-add',
								scope : this,
								handler : this.createRs,
								hidden : this.isHidden
							}]
				})
		this.datafield = new Ext.form.DateField({
					format : 'Y-m-d',
					readOnly : this.isHidden,
					allowBlank : false
				})
		this.comboType1 = new Ext.form.ComboBox({
					mode : 'local',
					displayField : 'name',
					valueField : 'id',
					editable : false,
					readOnly : this.isHidden,
					triggerAction : 'all',
					width : 70,
					autoload : false,
					store : new Ext.data.SimpleStore({
								fields : ["name", "id"],
								data : [["百分比 (%)", "0"], ["固定金额", "1"]]
							})
				})
				
		this.comboType2 = new Ext.form.ComboBox({
			displayField : 'name',
			valueField : 'plansTochargeId',
			triggerAction : 'all',
			readOnly : this.editor == null ? this.isHidden : !this.editor,
			store : new Ext.data.JsonStore({
				autoLoad : true,
				url : __ctxPath+ '/creditFlow/finance/getProductIdSlPlansToCharge.do?businessType='+ this.businessType+'&productId='+this.productId,
				fields : [{
							name : 'plansTochargeId'
						}, {
							name : 'name'
						}, {
							name : 'chargeStandard'
						}],
				root : 'root',
				totalProperty : 'totalCounts'
			}),
			listeners : {
				'select' : function(combo, record, index) {
					var grid = Ext.getCmp("SlActualToCharge");
					//费用标准
					grid.getSelectionModel().getSelected().data['chargeStandard'] = record.data.chargeStandard;
				}

			}

		})
		this.comboType2.store.reload();
		var url = __ctxPath
				+ "/creditFlow/finance/listbyprojectSlActualToCharge.do?projectId="
				+ this.projectId + "&isUnLoadData=" + this.isUnLoadData
				+ "&businessType=" + this.businessType;
		if (this.bidPlanId) {
			url = __ctxPath
					+ "/creditFlow/finance/listbyBidPlanIdSlActualToCharge.do?bidPlanId="
					+ this.bidPlanId + "&isUnLoadData=" + this.isUnLoadData;
		}
		if (this.isThisSuperviseRecord != null) {
			url = __ctxPath
					+ "/creditFlow/finance/listbySuperviseRecordSlActualToCharge.do?slSuperviseRecordId="
					+ this.slSuperviseRecordId + "&isThisSuperviseRecord="
					+ this.isThisSuperviseRecord + "&isUnLoadData="
					+ this.isUnLoadData + "&businessType=" + this.businessType
					+ "&projectId=" + this.projectId;
		}
		this.gridPanel = new HT.EditorGridPanel({
			border : false,
			clicksToEdit : 1,
			isShowTbar : this.isHidden ? false : true,
			showPaging : false,
			autoHeight : true,
			hiddenCm : this.isHidden,
			plugins : [summary],
			id : 'SlActualToCharge',
			url : url,
			fields : [{
						name : 'actualChargeId'
					}, {
						name : 'planChargeId'
					}, {
						name : 'typeName'
					}, {
						name : 'payMoney'
					}, {
						name : 'planCharges'
					}, {
						name : 'chargeStandard'
					}, {
						name : 'payMoney'
					}, {
						name : 'incomeMoney'
					}, {
						name : 'intentDate'
					}
					, {
						name : 'remark'
					}],
			tbar : this.isHidden ? null : this.ttbar,
			columns : [
			{
				header : '费用类型',
				dataIndex : 'planChargeId',
				editor : this.comboType2,
				width : 170,
				summaryType : 'count',
				summaryRenderer : totalMoney,
				renderer : function(value, metaData, record, rowIndex,colIndex, store) {
					var objcom = this.editor;
					var objStore = objcom.getStore();
					var idx = objStore.find("plansTochargeId", value);

					if (idx != "-1") {
						return objStore.getAt(idx).data.name;
					} else {
						if (record.data.typeName == "") {
							record.data.typeName = value
						} else {
							var x = store.getModifiedRecords();
							if (x != null && x != "") {
								record.data.typeName = value
							}
						}
						return record.get("typeName");
					}
				}

			}, {
				header : '费用标准',
				dataIndex : 'chargeStandard',
				editor : {
					readOnly : this.editor == null
							? this.isHidden
							: !this.editor,
					xtype : 'numberfield'
				},
				renderer : function(value) {
					if (value == null || typeof(value) == 'undefined') {
						return '0.00';
					} else {
						return Ext.util.Format.number(value, ',000,000,000.00');
								
					}
				}
			},{
				header : '金额',
				dataIndex : 'chargeStandard',
				editor : {
					readOnly : this.editor == null
							? this.isHidden
							: !this.editor,
					xtype : 'numberfield'
				},
				renderer : function(value) {
					if (value == null || typeof(value) == 'undefined') {
						return '0.00';
					} else {
						return Ext.util.Format.number(value, ',000,000,000.00');
								
					}
				}
			},{
				header : '计划到账日',
				format : 'Y-m-d',
				dataIndex : 'intentDate',
				width : 80,
				renderer : ZW.ux.dateRenderer(this.datafield),
				editor : this.datafield
			}],
			listeners : {}
			
		});

	},

	createRs : function() {
		this.datafield.setValue('');
		var newRecord = this.gridPanel.getStore().recordType;
		var newData = new newRecord({
					actualChargeId : '',
					planChargeId : '',
					chargeStandard : 0,
					planChargeId : '',
					payMoney : 0,
					incomeMoney : 0,
					intentDate : new Date(),
					//					factDate : '',
					remark : ''
				});
		this.gridPanel.stopEditing();
		this.gridPanel.getStore().insert(this.gridPanel.getStore().getCount(),
				newData);
		this.gridPanel.getView().refresh();
		this.gridPanel.getSelectionModel().selectRow((this.gridPanel.getStore()
				.getCount() - 1));
		this.gridPanel.startEditing(0, 0);

	},

	createRsNew : function() {
		this.datafield.setValue('');
		var gridadd = this.gridPanel;
		var storeadd = this.gridPanel.getStore();
		var keys = storeadd.fields.keys;
		var p = new Ext.data.Record();
		p.data = {};
		for (var i = 1; i < keys.length; i++) {
			p.data[keys[i]] = null
		}
		var count = storeadd.getCount() + 1;
		gridadd.stopEditing();
		storeadd.addSorted(p);
		gridadd.getView().refresh();

	},
	getGridDate : function() {
		var vRecords = this.gridPanel.getStore().getRange(0,
				this.gridPanel.getStore().getCount()); // 得到修改的数据（记录对象）
		var vCount = vRecords.length; // 得到记录长度
		var vDatas = '';
		if (vCount > 0) {
			// begin 将记录对象转换为字符串（json格式的字符串）
			for (var i = 0; i < vCount; i++) {
				if (vRecords[i].data.planChargeId != null
						&& vRecords[i].data.planChargeId != "") {
						st = {
							"planChargeId" : vRecords[i].data.planChargeId,
							"actualChargeId" :( vRecords[i].data.actualChargeId==''?null:vRecords[i].data.actualChargeId),
							"chargeStandard" : vRecords[i].data.chargeStandard,
							"incomeMoney" : vRecords[i].data.incomeMoney,
							"payMoney" : vRecords[i].data.payMoney,
							"intentDate" : vRecords[i].data.intentDate,
							"remark" : vRecords[i].data.remark,
							"bidPlanId":this.bidPlanId,
							"slSuperviseRecordId":this.slSuperviseRecordId
						};
					vDatas += Ext.util.JSON.encode(st) + '@';
				}
			}
			vDatas = vDatas.substr(0, vDatas.length - 1);
		}
		return vDatas;
	},
	saveRs : function() {
		var data = this.getGridDate();
		Ext.Ajax.request({
			url : __ctxPath + '/creditFlow/finance/savejsonSlActualToCharge.do',
			method : 'POST',
			scope : this,
			params : {
				slPlansToChargeJson : data,
				projectId : this.projectId,
				businessType : this.businessType
			},
			success : function(response, request) {
				this.comboType2.store.reload();
				this.gridPanel.getStore().reload();

			}
		});

	},
	comboTypereload : function() {
		this.comboType2.store.reload();
	},
	savereload : function() {
		this.comboType2.store.reload();
		this.gridPanel.getStore().reload();
	},
	services:function(){
		var projectId = this.bidPlanId;
						var smallProjectId=this.projId;
						
						window.open(
							__ctxPath + '/project/confirmLoanSlSmallloanProject.do?bidType=service&bidId=' + projectId+'&projectId='+smallProjectId,
							'付款审核',
							'top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no',
							'_blank');
	},
	removeSelRs : function() {
		var fundIntentGridPanel = this.gridPanel;
		var deleteFun = function(url, prame, sucessFun, i, j) {
			Ext.Ajax.request({
				url : url,
				method : 'POST',
				success : function(response) {
					if (response.responseText.trim() == '{success:true}') {
						if (i == (j - 1)) {
							Ext.ux.Toast.msg('操作信息', '删除成功!');
						}
						sucessFun();
					} else if (response.responseText.trim() == '{success:false}') {
						Ext.ux.Toast.msg('操作信息', '删除失败!');
					}
				},
				params : prame
			});
		};
		var a = fundIntentGridPanel.getSelectionModel().getSelections();
		if (a <= 0) {
			Ext.ux.Toast.msg('操作信息', '请选择要删除的记录');
			return false;
		};
		Ext.Msg.confirm("提示!", '确定要删除吗？', function(btn) {

			if (btn == "yes") {
				var s = fundIntentGridPanel.getSelectionModel().getSelections();

				for (var i = 0; i < s.length; i++) {
					var row = s[i];
					if (row.data.actualChargeId == null
							|| row.data.actualChargeId == '') {
						fundIntentGridPanel.getStore().remove(row);
					} else {
						deleteFun(
								__ctxPath
										+ '/creditFlow/finance/deleteSlActualToCharge.do',
								{
									actualChargeId : row.data.actualChargeId,
									businessType : this.businessType
								}, function() {
									fundIntentGridPanel.getStore().remove(row);
									fundIntentGridPanel.getStore().reload();
								}, i, s.length);

					}

				}

			}

		});

	}

});