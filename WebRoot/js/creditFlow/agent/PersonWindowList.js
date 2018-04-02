var personData;
var jStorePersonWin;
var selectPerson = function(funName) {
	var anchor = '96.5%';
	jStorePersonWin = new Ext.data.JsonStore({
		url : __ctxPath+'/creditFlow/customer/enterprise/entListEnterprise.do?isAll='+isGranted('_detail_sygrkh'),
		totalProperty : 'totalProperty',
		root : 'topics',
		fields : [{
				name : 'id'
			}, {
				name : 'enterprisename'
			}, {
				name : 'organizecode'
			}, {
				name : 'cciaa'
			}, {
				name : 'taxnum'
			}, {
				name : 'legalpersonName'
			}, {
				name : 'registermoney'
			},{
				name : 'telephone'
			},{
				name : 'documentType'
			},{
				name : 'factaddress'
			},{
				name : 'postcoding'
			},{
				name : 'selfemail'
			},{
				name : 'cardnumber'
			},{
				name : 'cellphone'
			},{
				name : 'legalpersonSex'
			},{
				name : 'legalpersonCardType'
			},{
				name : 'legalpersonid'
			}
			],
			remoteSort: true//服务器端排序 by chencc
		});
	
		
		var cModelPersonWin = new Ext.grid.ColumnModel([
				new Ext.grid.RowNumberer({
							header : '序号',
							width : 40
						}), {
					header : "企业名称",
					sortable : true,
					dataIndex : 'enterprisename'
				}, {
					header : "组织机构代码",
					sortable : true,
					dataIndex : 'organizecode'
				}, {
					header : "营业执照号码",
					sortable : true,
					dataIndex : 'cciaa',
				}, {
					header : "税务登记号",
					sortable : true,
					dataIndex : 'taxnum'
				}, {
					header : "法人",
					sortable : true,
					dataIndex : 'legalpersonName'
				}, {
					header : "注册资金",
					sortable : true,
					dataIndex : 'registermoney'

				},{
					header : "联系电话",
					sortable : true,
					dataIndex : 'telephone'	
				}]);
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
		var gPanelPersonWin = new Ext.grid.GridPanel({
			id : 'gPanelPersonWin',
			store : jStorePersonWin,
			colModel : cModelPersonWin,
//			autoExpandColumn : 7,
			//selModel : new Ext.grid.RowSelectionModel(),
			stripeRows : true,
			loadMask : true,
			bbar : pagingBar,
			tbar : [new Ext.form.Label({text : '企业名称：'}),new Ext.form.TextField({id:'personNameRefer',width:180}), new Ext.form.Label({text : '法人：'}),{id:'personSexRefer',width:180,xtype : "dickeycombo",
						nodeKey :'sex_key'},{text:'查找',iconCls : 'btn-search'}],
			listeners : {																																							
				'rowdblclick' : function(grid, index, e) {
					var selected = grid.getStore().getAt(index) ;
					callbackFun(selected,funName);
					personWin.destroy();
				}
			}
		});
		Ext.getCmp('personNameRefer').on('blur',function(field){
			var value = Ext.get('personNameRefer').dom.value;
			jStorePersonWin.baseParams.name = value ;
			jStorePersonWin.load({
				params : {
					start : 0,
					limit : 15
				}
			});
		});
		Ext.getCmp('personSexRefer').on('blur',function(field){
			var value = Ext.get('personSexRefer').dom.value;
			jStorePersonWin.baseParams.sexvalue = value ;
			jStorePersonWin.load({
				params : {
					start : 0,
					limit : 15
				}
			});
		});
		var personWin = new Ext.Window({
			title : '企业列表',
			border : false,
			width: (screen.width-180)*0.75,
			height : 425,
			constrainHeader : true ,
			layout : 'fit',
			buttonAlign : 'center',
			items : [gPanelPersonWin],
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
					enterprisename : selected.get('enterprisename'),
					organizecode : selected.get('organizecode'),
					cciaa : selected.get('cciaa'),
					taxnum : selected.get('taxnum'),
					legalpersonName : selected.get('legalpersonName'),
					registermoney : selected.get('registermoney'),
					telephone : selected.get('telephone'),
					documentType:selected.get('documentType'),
					factaddress:selected.get('factaddress'),
					postcoding:selected.get('postcoding'),
					selfemail:selected.get('selfemail'),
					cardnumber:selected.get('cardnumber'),
					cellphone:selected.get('cellphone'),
					legalpersonSex:selected.get('legalpersonSex'),
					legalpersonCardType:selected.get('legalpersonCardType'),
					legalpersonid:selected.get('legalpersonid')
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
var selectDictionaryByPerson=function(val,funName){
	Ext.onReady(function() {
	var anchor = '96.5%';
	Ext.BLANK_IMAGE_URL = basepath()+'ext3/resources/images/default/s.gif';
	Ext.QuickTips.init();
	//Ext.form.Field.prototype.msgTarget = 'under';
	var treeLoader = new Ext.tree.TreeLoader({
		dataUrl :__ctxPath+'/creditFlow/multiLevelDic/getDictionaryTreeWindowAreaDic.do',
		baseParams : {lable : val}
	});
	var businessTree = new Ext.tree.TreePanel({
		border : false,
		iconCls : 'icon-nav',
		rootVisible : false,
		autoScroll : true,
		loader : treeLoader,
		root : new Ext.tree.AsyncTreeNode({
			id: '-1',
			text:'根'})
	});
	var ondblclicktree = function(n){
		var objArray = new Array();
		var node = n;
		for(i=0;;i++){
			objArray[i] = node;
			node = node.parentNode;
			if(node.id == '-1')
				break;
		}
		funName(objArray);
		dictionaryWindow.destroy();
	}
	businessTree.addListener('dblclick',ondblclicktree);
	var permissionmanager = new Ext.Panel({
		id : 'permissionmanager',
		height : 400,
		frame : true,
		autoScroll : true ,
		titleCollapse : true,
		expandDefaults: {
			duration:.85
			},
			collapseDefaults: {
			duration:.85
			},
			items : businessTree
	});
	var dictionaryWindow = new Ext.Window({
		width: (screen.width-180)*0.4,
		title : '数据字典',
		height : 400 ,
		collapsible : true,
		layout : 'form',
		buttonAlign : 'center',
		modal : true,
		resizable : false,
		items : [permissionmanager]
	});
	dictionaryWindow.show();
});
}

