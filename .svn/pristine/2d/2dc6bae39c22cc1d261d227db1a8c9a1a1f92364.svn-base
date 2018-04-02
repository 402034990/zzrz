/**
 * @author
 * @class SlMortgageCarGpsMaterialsView
 * @extends Ext.form.FieldSet
 * @description [SlProcreditMaterials]管理 贷款材料上传
 * @company 智维软件
 * @createtime:
 */
SlMortgageCarGpsMaterialsView = Ext.extend(Ext.Panel, {
	        projId:null,
	        gridPanel:null,
	        businessType:null,
	        isHidden_materials : false,
	        isHiddenAffrim : true,
	        isEditAffrim : false,
	        isHiddenEdit:true,
	        mortgageId:null,
	        isAllReadOnly:null,
	        isAutoHeight : true,
			constructor : function(_cfg) {
				if(typeof(_cfg.mortgageId)!="undefined"){
				      this.mortgageId=_cfg.mortgageId;
				}
				if(typeof(_cfg.projectId)!="undefined"){
				      this.projId=_cfg.projectId;
				}
				if(typeof(_cfg.isAllReadOnly)!="undefined"){
				      this.isAllReadOnly=_cfg.isAllReadOnly;
				}
				if(typeof(_cfg.businessType)!="undefined"){
					  this.businessType=_cfg.businessType;
				}
				if (typeof(_cfg.isHiddenEdit) != "undefined") {
				    this.isHiddenEdit = _cfg.isHiddenEdit;
			    }
			    if (typeof(_cfg.isHidden_materials) != "undefined") {
				  this.isHidden_materials = _cfg.isHidden_materials;
			    }
			    if(typeof(_cfg.isHiddenAffrim) != "undefined") {
			    	this.isHiddenAffrim = _cfg.isHiddenAffrim;
			    }
			    if(typeof(_cfg.isEditAffrim) != "undefined") {
			    	this.isEditAffrim = _cfg.isEditAffrim;
			    }
			    if (typeof(_cfg.isAutoHeight) != "undefined") {
					this.isAutoHeight = _cfg.isAutoHeight;
				}
				Ext.applyIf(this, _cfg);
				this.initUIComponents();
				SlMortgageCarGpsMaterialsView.superclass.constructor.call(this, {
							border : false,
						    layout:'anchor',
		  					anchor : '99%',
							modal : true,
							items : [this.gridPanel]
						});
			},
			
			initUIComponents : function() {
				var mortgageId=this.mortgageId;
				var projId = this.projId;
				var businessType = this.businessType;
				var obj=this.gridPanel;
				var isHidden=this.isHidden;
				var jsArr = [__ctxPath + '/js/creditFlow/smallLoan/materials/SlProcreditSmallLoanMaterialsForm.js',
				             __ctxPath + '/js/creditFlow/smallLoan/materials/SlProcreditGPSImageView.js'
				];
				$ImportSimpleJs(jsArr, null);
				this.topbar = new Ext.Toolbar({
					items : [{
						iconCls : 'btn-add',
						text : '增加',
						xtype : 'button',
						scope : this,
						hidden : this.isAllReadOnly?true:false,
						handler : this.createRs
					},'-',{
						iconCls : 'btn-delete',
						text : '隐藏',
						xtype : 'button',
						scope : this,
						hidden : this.isAllReadOnly?true:false,
						handler : this.updateRs
					},'-',{
						iconCls : 'btn-check',
						text : '全部预览',
						xtype : 'button',
						scope : this,
//						hidden : this.isAllReadOnly?true:false,
						handler : this.checkRs
					}]
				});
				this.confirmDatefield=new Ext.form.DateField({
					format : 'Y-m-d',					
					readOnly:!this.isEditAffrim,
					allowBlank : false
				})
				this.recieveDatefield=new Ext.form.DateField({
					format : 'Y-m-d',					
					readOnly:!this.isEditRecieve,
					allowBlank : false
				})
				var checkColumn = new Ext.grid.CheckColumn({
					hidden : this.isHiddenAffrim,
					editable : this.isEditAffrim,
					header : '是否已提交',
					dataIndex : 'isPigeonhole',
					width : 70
				});
				var recieveCheckColumn = new Ext.grid.CheckColumn({
					hidden : this.isHiddenRecieve,
					editable : this.isEditRecieve,
					header : '是否已收到',
					dataIndex : 'isReceive',
					width : 70
				});
				this.gridPanel=new HT.EditorGridPanel({
					 delayMS:10000,
					 isautoLoad:true,
					hiddenCm : this.isHidden_materials,
					plugins : [checkColumn,recieveCheckColumn],
					clicksToEdit : 1,
					border : false,
					region:'center',
					viewConfig : {
						forceFit : true,
						autoFill : true
					},
					defaults : {
						anchor : '99%'
					},
					showPaging:false,
					autoHeight : this.isAutoHeight,
					height : 375,
					tbar : this.isHidden_materials? null :this.topbar,
					isShowTbar : this.isHidden_materials?false : true,
					url : __ctxPath + "/materials/list2SlProcreditMaterials.do",
					fields : [
								'proMaterialsId',
								'projId'
								,'materialsId'
							    ,'materialsName'
								,'isReceive'
								,'isShow'
								,'datumNums'
								,'isPigeonhole'
								,'remark'
								,'archiveConfirmRemark'
								,'xxnums'
								,'recieveTime'
								,'confirmTime'
								,'recieveRemarks'
							],
					columns:[
								{
									header : 'proMaterialsId',
									dataIndex : 'proMaterialsId',
									hidden : true
								},{
									header : '文件名称',	
									width :　220,
									dataIndex : 'materialsName'
								},{
									header : '线上上传份数',	
									width : 75,
									dataIndex : 'datumNums'
								},{
									header : '线下材料份数',	
									width : 75,
									dataIndex : 'xxnums',
									editor: {
									   xtype:'numberfield',
									   readOnly : this.isHidden_materials? true:false
									}
								},{
									header : '备注',	
									dataIndex : 'remark',
									align : "center",
									width : this.isHiddenAffrim?200:100,
									editor :this.isHidden_materials?null:new Ext.form.TextField({
										selectOnFocus: true
									})
								},checkColumn,{
									header : '上传或下载',
									width : 70,
									dataIndex:'uploadOrDown',
									//hidden : this.isHidden_materials,
								    renderer:function(){
						                if(isHidden){
						                      return "<img src='"+__ctxPath+"/images/download-start.png'/>";
						                }else{
						                      return "<img src='"+__ctxPath+"/images/upload-start.png'/>";
						                }
				           			 }
								},{
									header : '预览',
									width : 60,
									dataIndex:'viewPic',
									renderer:this.imageView
								},
								{									
									header : '提交时间',
									format : 'Y-m-d',
									dataIndex : 'confirmTime',
									sortable : true,
							        width : 82,
							        hidden : true,
									editor : this.confirmDatefield,
									renderer : ZW.ux.dateRenderer(this.confirmDatefield)						
								},{
									header : '提交备注',	
									dataIndex : 'archiveConfirmRemark',
									width : 100,
									hidden : true,
									editor : new Ext.form.TextField({
										selectOnFocus: true,
										readOnly:!this.isEditAffrim
									})
								},/*recieveCheckColumn,*/{
									header : '收到时间',
									format : 'Y-m-d',
									dataIndex : 'recieveTime',
									sortable : true,
							        width : 82,
							        hidden : true,
									editor : this.recieveDatefield,
									renderer : ZW.ux.dateRenderer(this.recieveDatefield)
								},{
									
									header : '收到备注',	
									dataIndex : 'recieveRemarks',
									width : 100,
									hidden : true,
									editor : new Ext.form.TextField({
										selectOnFocus: true,
										hidden : this.isHiddenRecieve,
										readOnly:!this.isEditRecieve
									})
								
								}
					],
					baseParams:{
						projId : this.projId,
						show : true,
						businessType:this.businessType,
						mortgageId:this.mortgageId
					},
					scope:this,
					listeners : {
										   'cellclick' : function(grid,rowIndex,columnIndex,e){
										   	
										   	   var record = grid.getStore().getAt(rowIndex);   //Get the Record
                                               var fieldName = grid.getColumnModel().getDataIndex(columnIndex); //Get field name
                                     
										   	
											var loadData=function(size)
											{     
												 var oldSize=grid.getStore().getAt(rowIndex).get("datumNums");
												 grid.getStore().getAt(rowIndex).set("datumNums",size);
												 var e1={record:grid.getStore().getAt(rowIndex),field:'datumNums','value':size,'originalValue':oldSize}
												 grid.fireEvent("afteredit",e1);
												 return false;
											}
											if("uploadOrDown"==fieldName){
//												 if(this.ownerCt.isHidden_materials){
//												 return false;
//												 }
											     var mortgageId= this.ownerCt.mortgageId;
												 var markId=grid.getStore().getAt(rowIndex).get("proMaterialsId");
												 var talbeName="sl_commitment_materials_"+mortgageId+".";
												 var mark=talbeName+markId;
												 uploadfile("上传贷款资料",mark,null,null,null,loadData,projId,businessType);//uploadfile 方法多一个属性 1（可以写任意值）： 主要是为控制title是否显示 。不添加这个属性会正常显示title，添加这个属性则会让title显示
											}
											if("viewPic"==fieldName)
											{   
												 var mortgageId= this.ownerCt.mortgageId;
												 var markId=grid.getStore().getAt(rowIndex).get("proMaterialsId");
												 var talbeName="sl_commitment_materials_"+mortgageId+".";
												 var mark=talbeName+markId;
											     picViewer(mark,this.ownerCt.isHiddenEdit);
											}
										 },
										 afteredit : function(e) {
										 	var  gridObj=this;
											var args="";
											var value = e.value;
											var id = e.record.data['proMaterialsId'];
											if (e.originalValue != e.value) {//编辑行数据发生改变
												if(e.field == 'isPigeonhole') {
													args = {'slProcreditMaterials.isPigeonhole': value,'slProcreditMaterials.proMaterialsId': id};
												}
												if(e.field == 'remark') {
													args = {'slProcreditMaterials.remark': value,'slProcreditMaterials.proMaterialsId': id};
												}
												if(e.field == 'archiveConfirmRemark') {
													args = {'slProcreditMaterials.archiveConfirmRemark': value,'slProcreditMaterials.proMaterialsId': id};
												}
												if(e.field == 'datumNums') {
													args = {'slProcreditMaterials.datumNums': value,'slProcreditMaterials.proMaterialsId': id};
												}
												if(e.field == 'xxnums') {
													args = {'slProcreditMaterials.xxnums': value,'slProcreditMaterials.proMaterialsId': id};
												}
												if(e.field == 'recieveTime') {
													args = {'slProcreditMaterials.recieveTime': value,'slProcreditMaterials.proMaterialsId': id};
												}
												if(e.field == 'recieveRemarks') {
													args = {'slProcreditMaterials.recieveRemarks': value,'slProcreditMaterials.proMaterialsId': id};
												}
												if(e.field == 'confirmTime') {
													args = {'slProcreditMaterials.confirmTime': value,'slProcreditMaterials.proMaterialsId': id};
												}
												if(e.field == 'isReceive') {
													args = {'slProcreditMaterials.isReceive': value,'slProcreditMaterials.proMaterialsId': id};
												}
												Ext.Ajax.request({
													url : __ctxPath+'/materials/saveSlProcreditMaterials.do',
													method : 'POST',
													scope : this,
													success : function(response, request) {
														 e.record.commit();
													},
													failure : function(response) {
														Ext.Msg.alert('状态', '操作失败，请重试');
													},
													params : args
												})
											}
										}
									}
				})		
			},
			materialAffrimRenderer : function(v){
				return v == true?'<font color=green>是</font>' : '<font color=red>否</font>';
			},
			createRs : function() {
				new SlProcreditMaterialsForm({projectId : this.projId,operateObj:this.gridPanel,businessType:this.businessType,operationType:this.operationType}).show();
			},
			checkRs : function() {debugger
				 var talbeName="sl_commitment_materials.";
				 var mark=talbeName;
			    // picViewer(mark,this.ownerCt.isHiddenEdit);
				SlProcreditAllImageView(mark,this.ownerCt.isHiddenEdit,null,this.projId,this.businessType);
				
			},
			updateRs : function(){
				var proMaterialIds = "";
				var rows = this.gridPanel.getSelectionModel().getSelections();
				if (rows.length == 0) {
					Ext.ux.Toast.msg('操作信息', '请选择一条记录!');
					return;
				}
				for(var i=0;i<rows.length;i++){
					proMaterialIds = proMaterialIds+rows[i].get('proMaterialsId');
					if(i!=rows.length-1){
						proMaterialIds = proMaterialIds+','
					}
				}
				Ext.Ajax.request({
					url : __ctxPath + '/materials/updateShowSlProcreditMaterials.do',
					method : 'POST',
					scope : this,
					success : function(response, request) {
						this.gridPanel.store.reload();
					},
					failure : function(response) {
						Ext.ux.Toast.msg('操作提示', '对不起，数据操作失败！');
					},
					params : {
						'proMaterialIds' :proMaterialIds,
						'show' : false
					}
				})
			},
			imageUpload : function(){
				return "<img src='"+__ctxPath+"/images/upload-start.png'/>";	
			},
			imageView :  function(){
				return "<img src='"+__ctxPath+"/images/btn/read_document.png'>";
			},
			SlProcreditGPSImageView :  function(){
				return "<img src='"+__ctxPath+"/images/btn/read_document.png'>";
			}
	
});
