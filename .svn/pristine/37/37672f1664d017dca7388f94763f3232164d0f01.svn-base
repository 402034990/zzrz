var jStorePersonWin;
var BankCreditSelect= function(funName,type,personId,oppositeType) {
	var anchor = '96.5%';
	jStorePersonWin = new Ext.data.JsonStore({
        url : __ctxPath + "/agentAproval/listSelectBankCredit.do?type="+type+"&personId="+personId+"&oppositeType="+oppositeType,
		totalProperty : 'totalProperty', 
		root : 'result',
		fields : [{
						name : 'id',
						type : 'int'
					}, 'userNum', 'userName', 'bankCreditNum', 'creditMoney',
					'useMoney', 'shengyuMoney', 'appUserName',
					'createtime', 'status', 'endTime',
					'beginTime','ceditTypeId'],
			remoteSort: true//服务器端排序 by chencc
		});
	
		var BankCreditSelectColumnModel = new Ext.grid.ColumnModel([
				new Ext.grid.RowNumberer({
							header : '序号',
							width : 40
						}), {
						header : 'id',
						dataIndex : 'id',
						hidden : true
					},/*  {
						header : '机构类型',
						dataIndex : 'type'
					},*/ {
						header : '客户编号',
						dataIndex : 'userNum'
					}, {
						header : '客户名称',
						dataIndex : 'userName'
					}, {
						header : '授信编号',
						dataIndex : 'bankCreditNum'
					}, {
						header : '授信金额',
						align : 'right',
						sortable : true,
						dataIndex : 'creditMoney',
						renderer : function(value) {
							if(value ==null ||value == "" ) {
								return "0元";
							}else {
								return Ext.util.Format.number(value,',000,000,000.00')+"元";
							}
						}
					},  {
						header : '占用额度',
						align : 'right',
						sortable : true,
						dataIndex : 'useMoney',
						renderer : function(value) {
							if(value ==null ||value == "" ) {
								return "0元";
							}else {
								return Ext.util.Format.number(value,',000,000,000.00')+"元";
							}
						}
					}, {
						header : '剩余额度',
						align : 'right',
						sortable : true,
						dataIndex : 'shengyuMoney',
						renderer : function(value) {
							if(value ==null ||value == "" ) {
								return "0元";
							}else {
								return Ext.util.Format.number(value,',000,000,000.00')+"元";
							}
						}
					}, {
						header : '授信开始时间',
						align : 'right',
						dataIndex : 'beginTime',
						format : 'Y-m-d H:m:s'
					}, {
						header : '授信结束时间',
						align : 'right',
						dataIndex : 'endTime',
						format : 'Y-m-d H:m:s'
					} ]);
		var pagingBar = new Ext.PagingToolbar({
			pageSize : 15,
			store : jStorePersonWin,
			autoWidth : true,
			hideBorders : true,
			displayInfo : true,
			displayMsg : '当前第{0} - {1}条，共 {2} 条记录',
			emptyMsg : "没有符合条件的记录······"
		});
		var personStore=jStorePersonWin;
		var myMask = new Ext.LoadMask(Ext.getBody(), {
			msg : "正在加载数据中······,请稍候······"
		});
		var button_add = new Ext.Button({});	
		var button_fastadd = new Ext.Button({});	
		var button_update = new Ext.Button({});
		var button_see = new Ext.Button({});
		
		
		
		var BankCreditSelectGrid = new Ext.grid.GridPanel({
			id : 'BankCreditSelectGrid',
			store : jStorePersonWin,
			colModel : BankCreditSelectColumnModel,
//			autoExpandColumn : 7,
			//selModel : new Ext.grid.RowSelectionModel(),
			stripeRows : true,
			loadMask : true,
			bbar : pagingBar,
			tbar : [],
			listeners : {																																							
				'rowdblclick' : function(grid, index, e) {
					var selected = grid.getStore().getAt(index) ;
					callbackFun(selected,funName);
					personWin.destroy();
				 }
			}
		});
		
		var personWin = new Ext.Window({
			title : '授信列表',
			border : false,
			width: (screen.width-180)*0.75,
			height : 425,
			constrainHeader : true ,
			layout : 'fit',
			buttonAlign : 'center',
			items : [BankCreditSelectGrid],
			modal : true,
			buttonAlign : 'center'
		});
		//加载框开始就加载开始  by chencc
		personWin.show();
		jStorePersonWin.load({
			params : {
				start : 0,
				limit : 15
			}
		});
		//加载框开始就加载结束  by chencc
		var searchByCondition = function() {
			jStorePersonWin.load({
						params : {
							start : 0,
							limit : 15
						}
		});
		}
		
	var callbackFun = function(selected,funName){
		personJsonObj = {
			id : selected.get('id'),
			userNum : selected.get('userNum'),
			userName:selected.get('userName'),
			bankCreditNum:selected.get('bankCreditNum'),
			creditMoney:selected.get('creditMoney'),
			useMoney:selected.get('useMoney'),
			shengyuMoney:selected.get('shengyuMoney'),
			appUserName:selected.get('appUserName'),
			createtime:selected.get('createtime'),
			status:selected.get('status'),
			endTime:selected.get('endTime'),
			beginTime:selected.get('beginTime'),
			ceditTypeId:selected.get('ceditTypeId')
		}
		funName(personJsonObj);
	}
	var formSave = function(formPanelId ,winObj ,storeObj){
		var formObj = Ext.getCmp(formPanelId);
		formObj.getForm().submit({
			method : 'POST',
			waitTitle : '连接',
			waitMsg : '消息发送中...',
			formBind : true,
			success : function(form ,action) {
				Ext.ux.Toast.msg('状态', '保存成功!');
					storeObj.reload();
					if(null != winObj){
						winObj.destroy();
					}
			},
			failure : function(form, action) {
				Ext.ux.Toast.msg('状态','保存失败!可能数据没有填写完整');
			}
		})
	}
}

