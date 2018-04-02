

function SelectArticleCategoryWin (funName) {
	var jStore = new Ext.data.JsonStore({
				url : __ctxPath+ '/p2p/listArticlecategory.do?Q_parentId_L_GT=0',
				totalProperty : 'totalCounts',
				root : 'result',
				fields : [{
							name : 'id'
						},{
							name : 'createDate'
						}, {
							name : 'modifyDate'
						}, {
							name : 'metaDescription'
						}, {
							name : 'metaKeywords'
						}, {
							name : 'orderList'
						}, {
							name : 'name'
						}, {
							name : 'path'
						}, {
							name : 'parentId'
						}, {
							name : 'webKey'
						}, {
							name : 'path'
						}, {
							name : 'parentId'
						}, {
							name : 'webKey'
						}, {
							name : 'isShow'
						}, {
							name : 'cateKey'
						}],
				remoteSort : true
			});
	var anchor = '100%';
	var pageSize = 15;
	var listWindowWidth = 550;
	var listWindowHeight = 465;
	var detailWindowWidth = 480;
	var detailWindowHeight = 370;
	var defaultLabelWidth = 100;// 默认标签的宽度
	var defaultTextfieldWidth = 135;// 默认文本输入域宽度
	var jsonObj;
	jStore.addListener('load', function() {
				gPanel.getSelectionModel().selectFirstRow();
			}, this);
	jStore.addListener('loadexception', function(proxy,
					options, response, err) {
				Ext.ux.Toast.msg('提示', '数据加载失败，请保证网络畅通！');
			}, this);
	//var sm = new Ext.grid.CheckboxSelectionModel();
	var cModel = new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer({
						header : '序号',
						width : 35
					}), {
						header : 'id',
						dataIndex : 'id',
						hidden : true
					}, {
						header : '分类名称',
						dataIndex : 'name'
					}, {
						header : '站点类别',
						dataIndex : 'webKey',
						renderer:function(value){
							if(value=="YunGou"){
								return "云购";
							}else if(value=="P2P"){
								return "互联网金融";
							}else if(value=="Crowdfunding"){
								return "众筹";
							}
						}
					}, {
						header : '分类key值',
						dataIndex : 'cateKey'
					}, {
						header : '分类关键字',
						dataIndex : 'metaKeywords'
					}, {
						header : '分类描述',
						dataIndex : 'metaDescription'
					}, {
						header : '是否使用',
						dataIndex : 'isShow',
						renderer:function(value){
							if(value=="0"){
								return "不显示";
							}else if(value=="1"){
								return "显示";
							}
						}
					}]);
	var pagingBar = new Ext.PagingToolbar({
				pageSize : pageSize,
				store : jStore,
				autoWidth : true,
				hideBorders : true,
				displayInfo : true,
				displayMsg : '当前第{0} - {1}条，共 {2} 条记录',
				emptyMsg : "没有符合条件的记录······"
			});
	var myMask = new Ext.LoadMask(Ext.getBody(), {
				msg : "正在加载数据中······,请稍候······"
	});

	var gPanel = new Ext.grid.GridPanel({
		id : 'gPanel',
		store : jStore,
		colModel : cModel,
		//autoExpandColumn : 'enterpriseName',
		//selModel : new Ext.grid.RowSelectionModel(),
		stripeRows : true,
		loadMask : true,
		bbar : pagingBar,
		listeners : {
			'rowdblclick' : function(grid, rowIndex, e) {
				var selected = grid.getStore().getAt(rowIndex);
				callbackFun(selected, funName);
				window.destroy();
				myMask.hide();
			}
		}
	});
	var window = new Ext.Window({
				title : '选择分类类别',
				border : false,
				width : (screen.width - 180) * 0.5,
				height : listWindowHeight - 30,
				collapsible : true,
				modal : true,
				constrainHeader : true,
				items : [gPanel],
				layout : 'fit',
				buttonAlign : 'center'
			});
	window.show();
	jStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
	});


	var callbackFun = function(selected, funName) {
		jsonObj = {
			parentId : selected.get('id'),
			name : selected.get('name'),
			webKey:selected.get('webKey')
			
		}
		funName(jsonObj);
	}
}