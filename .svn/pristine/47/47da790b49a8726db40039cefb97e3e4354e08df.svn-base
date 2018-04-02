Ext.ns('SlContractListView');
/**
 * @author: chencc
 * @class SlContractListView
 * @extends Ext.Panel
 * @description [SlContractListView]管理
 * @company 北京互融时代软件有限公司
 * @createtime:
 */
SlContractListView = Ext.extend(Ext.Panel, {
	isHiddenTbar : false,
	islcEdit : false,
	isHiddenAddBtn : true,
	isHiddenDelBtn : true,
	isHiddenEdiBtn : true,
	HeTongsc : true,
	isHiddenContractNO:false,
	isSignHidden : true,
    type:null,
	constructor : function(_cfg) {
		var jsCtArr = [		
			__ctxPath + '/js/system/product/SlGenerationContractList.js',
			__ctxPath + '/js/creditFlow/smallLoan/contract/ContractMake.js',
			__ctxPath + '/js/creditFlow/smallLoan/contract/SlDownsFiles.js',
			__ctxPath + '/js/creditFlow/smallLoan/contract/ContractMakeWay.js',
			__ctxPath + '/js/creditFlow/smallLoan/contract/CreateContractWin.js'//@HT_version3.0
  		];
  		if (typeof(_cfg.type) != "undefined") {
			this.type = _cfg.type;
		}
		if (_cfg.isChange) {
			this.isChange = _cfg.isChange;
		}
		if(typeof(_cfg.isHiddenContractNO)!="undefined"){
			this.isHiddenContractNO = _cfg.isHiddenContractNO;
		}
		if (typeof(_cfg.productId) != "undefined") {
			this.productId = _cfg.productId;
		}
		if (typeof(_cfg.HTLX) != "undefined") {
			this.HTLX = _cfg.HTLX;
		}
		if(typeof(_cfg.isqsEdit)!="undefined")
		{
		      this.isqsEdit=_cfg.isqsEdit;
		}else{
			this.isqsEdit = false
		}
		if(typeof(_cfg.isSignHidden)!="undefined")
		{
		      this.isSignHidden=_cfg.isSignHidden;
		}else{
			this.isSignHidden = true
		}
		if(typeof(_cfg.isHiddenAffrim)!="undefined")
		{
		      this.isHiddenAffrim=_cfg.isHiddenAffrim;
		}else{
			this.isHiddenAffrim = true
		}
		if(typeof(_cfg.isgdEdit)!="undefined")
		{
		      this.isgdEdit=_cfg.isgdEdit;
		}else{
			this.isgdEdit = false
		}
		if(_cfg.isHiddenTbar){
			this.isHiddenTbar=_cfg.isHiddenTbar;
		}
		if(_cfg.islcEdit){
			this.islcEdit=_cfg.islcEdit;
		}
		if(_cfg.HeTongsc){
			this.HeTongsc=_cfg.HeTongsc;
		}
		if (typeof(_cfg.isHiddenAddBtn) != "undefined") {
			this.isHiddenAddBtn = _cfg.isHiddenAddBtn;
		}
		if (typeof(_cfg.isHiddenDelBtn) != "undefined") {
			this.isHiddenDelBtn = _cfg.isHiddenDelBtn;
		}
		if (typeof(_cfg.isHiddenEdiBtn) != "undefined") {
			this.isHiddenEdiBtn = _cfg.isHiddenEdiBtn;
		}
		if (typeof(_cfg.isHidden) != "undefined") {
			this.isHidden = _cfg.isHidden;
		}else{
			this.isHidden = false
		}
		Ext.applyIf(this, _cfg);
		$ImportSimpleJs(jsCtArr, this.initUIComponents, this);

		// 调用父类构造
		SlContractListView.superclass.constructor.call(this, {
			// id : 'SlContractListView',
			// title : '合同确认',
			region : 'center',
			layout : 'anchor'
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		var PERSON_FINANCE_CONTRACT = 0;// 个人贷款合同,暂时没用
		var bidPlanId = this.bidPlanId;
		var rows = 0;
		var cols = 0;
		var srows = 0;
		var selectids = Array();
		var htlxid = 0;// 合同类型id
		var htlxname = null;
		var HTLX = this.HTLX;// 合同类型ID
		// var GRDKHT ="91";//个人贷款合同
		var templateId = 0;// 模板ID
		var productId = this.productId;
		var piKey = this.productId;
		var businessType = this.businessType;// 小额贷,企业贷，业务品种
		var cfileCount = this.isHiddenAddBtn==false?15:0;
		// var productId = this.productId;
		// var piKey = this.productId;
		if(this.isHiddenDelBtn == true && this.isHiddenAddBtn == true && this.isHiddenEdiBtn == true) {
			this.isHiddenTbar = true;
		}
		if(this.isqsEdit ==true){
			this.isHiddenTbar = false;
		}
		var checkColumn = new Ext.grid.CheckColumn({
			header : '是否法务确认',
			width : 90,
			fixed : true,
			hidden : this.isHidden,
			editable : !this.islcEdit,
			dataIndex : 'isLegalCheck'
		});
		var qsCheckColumn = new Ext.grid.CheckColumn({
			header : '是否签署并检验合格',
			editable : this.isqsEdit,
			hidden : this.isHidden,
			dataIndex : 'issign',
			width : 128,
			fixed : true
		});
		var affrimCheckColumn = new Ext.grid.CheckColumn({
			hidden : this.isHiddenAffrim,
			header : '是否归档',
			editable :this.isgdEdit,
			dataIndex : 'isRecord',
			fixed : true,
			width : 70
		});
		
		this.render_contractInfo = Ext.data.Record.create([{
				name : 'id'
			}, {
				name : 'parentId'
			}, {
				name : 'contractCategoryTypeText'
			}, {
				name : 'number'
			}, {
				name : 'productId'
			}, {
				name : 'mortgageId'
			}, {
				name : 'isOld'
			}, {
				name : 'remark'
			}, {
				name : 'isUpload'
			}, {
				name : 'issign'
			}, {
				name : 'isAgreeLetter'
			}, {
				name : 'isSeal'
			}, {
				name : 'contractCategoryText'
			}, {
				name : 'contractId'
			}, {
				name : 'contractName'
			}, {
				name : 'contractNumber'
			}, {
				name : 'text'
			}, {
				name : 'draftName'
			}, {
				name : 'draftDate'
			}, {
				name : 'localParentId'
			}, {
				name : 'templateId'
			}, {
				name : 'isLegalCheck'
			}, {
				name : 'verifyExplain'
			}, {
				name : 'orderNum'
			}, {
				name : 'fileCount'
			}, {
				name : 'temptId'
			},{
				name : 'issign'
			},{
				name : 'signDate'
			},{
			    name : 'isRecord'
			},{
			    name : 'recordRemark'
			},{
			    name : 'searchRemark'
			},{
				name : 'htType'
			},{
				name : 'mortgagename'
			},{
				name : 'mortgageTypeValue'
			},{
				name : 'leaseObjectId'
			}]);
		this.jStore_contractCategroy = new Ext.data.GroupingStore({
			proxy : new Ext.data.HttpProxy({
				url : __ctxPath+ '/system/getContractBpProductParameter.do'
			}),
			reader : new Ext.data.JsonReader({
				fields : this.render_contractInfo,
				totalProperty : 'totalProperty',
				root : 'topics'
			}),
			groupField : 'contractCategoryTypeText'
	 	});
        this.jStore_contractCategroy.load({
			params : {
				productId : this.type==null?productId:bidPlanId
			}
		});
		this.contractcategroysm = new Ext.grid.CheckboxSelectionModel({
			header : '序号'
		});

		this.contractcategroy = new Ext.Toolbar({
			items : [{
				iconCls : 'btn-add',
				text : '增加',
				xtype : 'button',
				scope : this,
				hidden : this.isHiddenAddBtn,
				handler : function(){
					
					if(this.HTLX=='CREDITJKRHT' || this.HTLX=='P2PJKRHT' || this.HTLX=='C2PJKRHT' || this.HTLX=='PA2PJKRZQHT' || this.HTLX=='CA2PJKRZQHT'){
						new CreateContractWin({
							parentGridPanel:this.grid_contractPanel,
							productId:this.productId,
							bidPlanId:this.bidPlanId,
							businessType:this.businessType,
							htType:this.HTLX
						}).show();
					}else{
						this.addContract(businessType, piKey,productId);
					}
				}
			},new Ext.Toolbar.Separator({
				hidden : this.isHiddenDelBtn
			}), {
				iconCls : 'btn-del',
				text : '删除',
				xtype : 'button',
				//id : "contractremoveBtn",
				scope : this,
				hidden : this.isHiddenDelBtn,
				handler : function(panel) {
					var selRs = this.grid_contractPanel.getSelectionModel().getSelections();
					var thisPanel = this.grid_contractPanel;
					if(selRs.length==0){
					   Ext.ux.Toast.msg('操作信息','请选择一条记录！');
					   return;
					}
					var productId=(this.type==null?this.productId:bidPlanId);
					Ext.Msg.confirm("提示!", '确定要删除吗？', function(btn) {
						if (btn == "yes") {
							var tempPanel=panel.ownerCt.ownerCt;
							tempPanel.stopEditing();
							var s = tempPanel.getSelectionModel().getSelections();
							var templateIds="";
							for (var i = 0; i < s.length; i++) {
								templateIds+=s[i].data.templateId+",";
							}
							templateIds=templateIds.substring(0,templateIds.length-1);
							Ext.Ajax.request({
								url : __ctxPath+ '/system/deleteContractBpProductParameter.do',
								method : 'POST',
								success : function(response, request) {
									obj = Ext.util.JSON.decode(response.responseText);
									Ext.ux.Toast.msg('状态', '删除成功！');
									tempPanel.getStore().reload();
								},
								params : {
									contractId : templateIds,
									productId : productId
								}
							});
							
							/*SlContractListView.deleteFun(__ctxPath+ '/system/deleteContractBpProductParameter.do',{
								contractId : row.data.templateId,
								productId : this.type==null?productId:bidPlanId
							});*/
						}
					})
				}
			},new Ext.Toolbar.Separator({
				hidden : this.isHiddenEdiBtn
			})]
		}),

		this.grid_contractPanel = new HT.EditorGridPanel({
			name:'contractPanel_view',
			border : false,
			store : this.jStore_contractCategroy,
			autoExpandColumn : 'changContent',
			autoScroll : true,   
			autoWidth : true,
			layout : 'anchor',
			clicksToEdit : 1,
			viewConfig : {
				forceFit : true
			},
			plugins : [checkColumn,qsCheckColumn,affrimCheckColumn],
			bbar : false,
			showPaging : false,
			stripeRows : true,
			plain : true,
			loadMask : true,
			autoHeight : true,
			isShowTbar : this.isHiddenTbar?false : true,
			tbar : this.isHiddenTbar?null : this.contractcategroy,
			hiddenCm : this.isHiddenTbar?true : false,
			sm : this.contractcategroysm,
			listeners : {
				scope : this,
				afteredit : function(e) {
					if (e.originalValue != e.value) {
						var args ;
						if(e.field =='isLegalCheck'){
							args = {
								'procreditContract.isLegalCheck' : e.value,
								'procreditContract.id' : e.record.data['id'],
								productId : productId,
								businessType : businessType
							}
						}else if(e.field =='issign'){
							args = {
								'procreditContract.issign':  e.value,
								'procreditContract.id': e.record.data['id'],
								productId : productId,
								businessType :businessType
							}
						}else if(e.field == 'signDate'){
							args = {
								'procreditContract.signDate': e.value,
								'procreditContract.id': e.record.data['id'],
								productId : productId,
								businessType :businessType
							}
						}else if(e.field == 'isRecord'){
							args = {
								'procreditContract.isRecord': e.value,
								'procreditContract.id': e.record.data['id'],
								productId : productId,
								businessType :businessType
							}
						}else if(e.field == 'recordRemark'){
							args = {
								'procreditContract.recordRemark': e.value,
								'procreditContract.id': e.record.data['id'],
								productId : productId,
								businessType :businessType
							}
						}else if(e.field == 'contractNumber'){
							args = {
								'procreditContract.contractNumber': e.value,
								'procreditContract.id': e.record.data['id'],
								productId : productId,
								businessType :businessType
							}
						}
						if(e.field =='isLegalCheck' || e.field =='issign'||e.field == 'signDate'||e.field == 'isRecord'||e.field == 'recordRemark' || e.field == 'contractNumber'){
							if(e.record.data['id'] == 0){
								Ext.ux.Toast.msg('提示', '操作无效，请先生成合同！');
								this.grid_contractPanel.getStore().reload();
							}else{
								Ext.Ajax.request({
									url : __ctxPath+'/contract/updateProcreditContractByIdProduceHelper.do',
									method : 'POST',
									scope :this,
									success : function(response, request) {
										e.record.commit();
									},
									failure : function(response) {
										Ext.ux.Toast.msg('状态', '操作失败，请重试！');
									},
									params: args
								})
							}
						}
					}
				}
			},
			columns : [{
				header : '合同类型',
				width : 143,
				dataIndex : 'contractCategoryTypeText'
			}, {
				header : '合同名称',
				dataIndex : 'contractCategoryText',
				width : 140
			}]
		});
		slDownsFiles = function(contractId,piKey,businessType,cfileCount){
			var reloadStore = function(){tPanel.getStore().reload();}
			var mark = "cs_procredit_contract."+contractId;
			var thisPanel = this.grid_contractPanel;
			var reloadStore = function(){thisPanel.getStore().reload();}
			new SlDownsFiles({
				mark : mark,
				cfileCount : cfileCount,
				contractId : contractId,
				reloadStore : reloadStore,
				businessType : businessType,
				piKey : piKey
			}).show();
		}
		this.add(this.grid_contractPanel)
		this.doLayout();
	},
	getGridDate : function(){
		var vDatas ='';
		var selects = this.grid_contractPanel.getSelectionModel().getSelections(); // 得到修改的数据（记录对象）
		if(selects.length == 0){
			Ext.ux.Toast.msg('状态', '请至少选择一条您需要批量签署的记录！');
			return false;
		}else{
			for (var i = 0; i < selects.length; i++) {
				vDatas += selects[i].data.id+",";
			}
		}
		return vDatas;
	},
	contractRenderer : function(v) {
		if (v == '' || v == null) {
			return '<font color=red>否</font>';
		} else if (v == true) {
			return '<font color=green>是</font>';
		} else if (v == false) {
			return '<font color=red>否</font>';
		} else {
			return v;
		}
	},
	//添加合同
	addContract : function(businessType, piKey,productId){
		
		var thisPanel = this.grid_contractPanel;
        var thisbidPlanId=this.bidPlanId;
        var dzygridPanel=null;
		var bzgridPanel=null
		var CustomerName="";
		if(typeof(this.ownerCt.ownerCt)!="undefined"){
		 	dzygridPanel=this.ownerCt.ownerCt.getCmpByName('dzymortgageGridPanel')
		 	bzgridPanel=this.ownerCt.ownerCt.getCmpByName('baozmortgageGridPanel')
		}
	   //新制作
		var window = new SlGenerationContractList({
			businessType : businessType,
			piKey : piKey,
			htType : this.htType,
			thisPanel : thisPanel,
			dzygridPanel:dzygridPanel,
			bzgridPanel:bzgridPanel,
			isHiddenBZ: this.isHiddenBZ,
			isHiddenDZY:this.isHiddenDZY,
			isHiddenDW:this.isHiddenDW,
			isHiddenRZZLHT:this.isHiddenRZZLHT,
			productId : productId,
			isHiddenContractNO:this.isHiddenContractNO,
			projectNumber : this.projectNumber,
			clauseId:this.clauseId, 
			sproductId:this.sproductId,
			bidPlanId:thisbidPlanId
		});
		window.show();
		window.addListener({
			'close' : function() {
				thisPanel.getStore().reload();
			}
		});
	},
	//编辑合同
	editContract : function(businessType, piKey,productId){
		var CustomerName="";
		var thisPanel = this.grid_contractPanel;
		var selected = thisPanel.getSelectionModel().getSelected();
		if (null == selected) {
			Ext.ux.Toast.msg('状态', '请选择一条记录！');
		} else {
			var id = selected.get('id');
			var temptId = selected.get('temptId');
			var contractId = selected.get('id');
			var title = selected.get('contractCategoryText');
			var htType = selected.get('htType');
			var mortgagename = selected.get('mortgagename');
			var mortgageTypeValue = selected.get('mortgageTypeValue');
			var thirdRalationId = selected.get('mortgageId');
			var remark = selected.get('contractNumber');
			var contractCategoryTypeText=selected.get('contractCategoryTypeText');
			var contractCategoryText=selected.get('contractCategoryText');
			var leaseObjectId=selected.get('leaseObjectId');
		}
	    //新制作
		var window = new SlGenerationContractList({
			businessType : businessType,
			piKey : piKey,
			htType : htType,
			thisPanel : thisPanel,
			productId : productId,
			sproductId:this.sproductId,
			title : title,
			isHiddenBZ: this.isHiddenBZ,
			isHiddenDZY:this.isHiddenDZY,
			contractId : id,
			thirdRalationId : thirdRalationId,
			remark : remark,
			contractCategoryTypeText :contractCategoryTypeText,
			contractCategoryText : contractCategoryText,
			leaseObjectId:leaseObjectId,
			mortgageTypeValue :mortgageTypeValue,
			mortgagename : mortgagename
		});
		window.show();
		window.addListener({
			'close' : function() {
				thisPanel.getStore().reload();
			}
		});
	},
	operateContract : function(businessType, piKey) {
		var selected = this.grid_contractPanel.getSelectionModel().getSelected();
		var thisPanel = this.grid_contractPanel;
		if (null == selected) {
			Ext.ux.Toast.msg('状态', '请选择一条记录！');
		} else {
			var id = selected.get('id');
			var temptId = selected.get('temptId');
			var contractId = selected.get('contractId');
			var title = selected.get('contractCategoryText');
			var htType = selected.get('htType');
			var mortgagename = selected.get('mortgagename');
			var mortgageTypeValue = selected.get('mortgageTypeValue');
			var thirdRalationId = selected.get('mortgageId');
			var searchRemark = selected.get('searchRemark');
			var window = new OperateContractWindow({
				title : title,
				categoryId : id,
				temptId : temptId,
				businessType : businessType,
				piKey : piKey,
				contractId : contractId,
				thisPanel : thisPanel,
				htType : htType,
				searchRemark : searchRemark,
				mortgageTypeValue :mortgageTypeValue,
				mortgagename : mortgagename,
				thirdRalationId : thirdRalationId,
				productId : this.productId
			});
			window.show();
			window.addListener({
				'close' : function() {
					thisPanel.getStore().reload();
				}
			});
		}
	}
});
SlContractListView.deleteFun = function(url, prame, sucessFun) {
	Ext.Ajax.request({
		url : url,
		method : 'POST',
		success : function(response, request) {
			obj = Ext.util.JSON.decode(response.responseText);
			Ext.ux.Toast.msg('状态', '删除成功！');
		},
		params : prame
	});
};