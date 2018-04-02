CsPersonCreditRecordForm = Ext.extend(Ext.Panel, {
	pId : null,
	personId :null,
	isFlow:false,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (typeof(_cfg.projectId) != "undefined") {
			this.pId = _cfg.projectId;
		}
		if (typeof(_cfg.personId) != "undefined") {
			this.personId = _cfg.personId;
		}
		
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		CsPersonCreditRecordForm.superclass.constructor.call(this, {
					// layout:'fit',
					id:'CsPersonCreditRecordForm'+this.flag,
					layout : 'anchor',
					anchor : '100%',
					autoHeight : true,
					items : [this.topbar]
				});
	},
	initUIComponents : function() {
		
		this.topbar = new Ext.Toolbar({
			items : [{
						iconCls : 'btn-detail',
						text : '多次申请审核验证',
						xtype : 'button',
						//hidden : this.isHiddenAddBtn,
						scope : this,
						handler :this.moreApplyValidate
					}, {
						iconCls : 'btn-detail',
						text : '手机三要素验证',
						xtype : 'button',
						//hidden : this.isHiddenDelBtn,
						scope : this,
						handler : this.TelCheck
					}, {
						iconCls : 'btn-detail',
						text : '身份证二要素验证',
						xtype : 'button',
						scope : this,
						//hidden : this.isHiddenEdiBtn,
						handler : this.IdTwo_z
					}, {
						iconCls : 'btn-detail',
						text : '身份证号手机号归属地',
						xtype : 'button',
						scope : this,
						//hidden : this.isHiddenSeeBtn,
						handler : this.KeyAttribution
					}]
		});
				
	},
	moreApplyValidate:function(){
		var projectId=this.projectId;
		var personId=this.personId;
		Ext.Ajax.request({
				url : __ctxPath + '/creditFlow/creditRecord/getMoreApplyReportCsPersonCreditRecord.do',
			    mothed:'POST',
			    success : function(response,request){debugger
			    	var respText = response.responseText;
                 	var object = Ext.util.JSON.decode(respText);
                 	if(object.success){
                 		App.clickTopTab('CsPersonCreditRecordView',{id:1,json:object.result,title:'多次申请审核验证'});
                 	}else{
                 		Ext.ux.Toast.msg('操作提示', object.msg);
                 	}
			    },
		   		
			    params:{
			    	type : 'ApplyLoanMon',
					personId:personId,
					projectId : projectId
				}
			})
		
	},
	TelCheck:function(){
		var projectId=this.projectId;
		var personId=this.personId;
		Ext.Ajax.request({
				url : __ctxPath + '/creditFlow/creditRecord/getMoreApplyReportCsPersonCreditRecord.do',
			    mothed:'POST',
			    success : function(response,request){
			    	var respText = response.responseText;
                 	var object = Ext.util.JSON.decode(respText);
                 	if(object.success){
                 		App.clickTopTab('CsPersonCreditRecordView',{id:2,json:object.result,title:'手机三要素验证'});
                 	}else{
                 		Ext.ux.Toast.msg('操作提示', object.msg);
                 	}
			    },
		   		failure : function(fp, action) {
		   			var data = action.result.msg;
		   			if(data!=null && data!=''){
						Ext.ux.Toast.msg('操作提示', data);
					}
				},
			    params:{
			    	type : 'TelCheck',
					personId:personId,
					projectId : projectId
				}
			})
		
	},
	IdTwo_z:function(){
		var projectId=this.projectId;
		var personId=this.personId;
		Ext.Ajax.request({
				url : __ctxPath + '/creditFlow/creditRecord/getMoreApplyReportCsPersonCreditRecord.do',
			    mothed:'POST',
			    success : function(response,request){
			    	var respText = response.responseText;
                 	var object = Ext.util.JSON.decode(respText);
                 	if(object.success){
                 		App.clickTopTab('CsPersonCreditRecordView',{id:3,json:object.result,title:'身份证二要素验证'});
                 	}else{
                 		Ext.ux.Toast.msg('操作提示', object.msg);
                 	}
			    },
		   		failure : function(fp, action) {
		   			var data = action.result.msg;
		   			if(data!=null && data!=''){
						Ext.ux.Toast.msg('操作提示', data);
					}
				},
			    params:{
			    	type : 'IdTwo_z',
					personId:personId,
					projectId : projectId
				}
			})
		
	},
	KeyAttribution:function(){
		var projectId=this.projectId;
		var personId=this.personId;
		Ext.Ajax.request({
				url : __ctxPath + '/creditFlow/creditRecord/getMoreApplyReportCsPersonCreditRecord.do',
			    mothed:'POST',
			    success : function(response,request){
			    	var respText = response.responseText;
                 	var object = Ext.util.JSON.decode(respText);
                 	if(object.success){
                 		App.clickTopTab('CsPersonCreditRecordView',{id:4,json:object.result,title:'身份证号手机号归属地'});
                 	}else{
                 		Ext.ux.Toast.msg('操作提示', object.msg);
                 	}
			    },
		   		failure : function(fp, action) {
		   			var data = action.result.msg;
		   			if(data!=null && data!=''){
						Ext.ux.Toast.msg('操作提示', data);
					}
				},
			    params:{
			    	type : 'KeyAttribution',
					personId:personId,
					projectId : projectId
				}
			})
		
	},
	getGridDate : function() {
		var vRecords = this.gridPanel.getStore().getRange(0,
				this.gridPanel.getStore().getCount()); // 得到修改的数据（记录对象）
		var vCount = vRecords.length; // 得到记录长度
		var vDatas = '';
		if (vCount > 0) {
			// begin 将记录对象转换为字符串（json格式的字符串）
			for (var i = 0; i < vCount; i++) {
				if (vRecords[i].data.relationPersonId != null
						|| vRecords[i].data.relationPersonId != "") {
					st = {
						"id" : vRecords[i].data.id,
						"projectId" : this.projectId,
						"relationPersonId" : vRecords[i].data.relationPersonId,
						//"projectId" : vRecords[i].data.projectId,
						"isKnowLoan" : vRecords[i].data.isKnowLoan,
						"checkContent" : vRecords[i].data.checkContent,
						"appUserId" : vRecords[i].data.appUserId
					};
				}
				vDatas += Ext.util.JSON.encode(st) + '@';
			}
			vDatas = vDatas.substr(0, vDatas.length - 1);
		}
		return vDatas;
	}

})