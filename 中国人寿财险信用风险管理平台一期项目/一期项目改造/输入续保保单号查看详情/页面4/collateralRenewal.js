
var BDYPstore = new Ext.data.Store({
	autoDestroy : true,
	url : 'policy_collateral_list.action',
	autoLoad:true,
	baseParams : {
		loadStore :true,
		start :0,
		limit :10,
		policyId :policy.id
	},
	storeId : 'policy_collateral_storeId',
	reader : new Ext.data.JsonReader({
				root : 'data',
				idProperty : 'id',
				totalProperty : 'total',
				fields : [
						{name:'id'}
							,
							{name:'collateralCode'}
							,
							{name:'collateralName'}
							,{name:'collateralNum'},
							{name:'rootType'}
							,
							{
								name : 'rootTypeName',
								mapping : 'rootType',
								 convert : function(c) {
								if (Ext.type(c) == 'object') {return c.typeName;}}
							},
							{
								name : 'rootTypeCode',
								mapping : 'rootType',
								 convert : function(c) {
								if (Ext.type(c) == 'object') {return c.typeCode;}}
							},
							{name:'trunkType'}
							,
							{
								name : 'trunkTypeName',
								mapping : 'trunkType',
								 convert : function(c) {
								if (Ext.type(c) == 'object') {return c.typeName;}}
							},
							{
								name : 'trunkTypeCode',
								mapping : 'trunkType',
								 convert : function(c) {
								if (Ext.type(c) == 'object') {return c.typeCode;}}
							},
							{name:'leafType'}
							,
							{
								name : 'leafTypeName',
								mapping : 'leafType',
								 convert : function(c) {
								if (Ext.type(c) == 'object') {return c.typeName;}}
							},
							{
								name : 'leafTypeCode',
								mapping : 'leafType',
								 convert : function(c) {
								if (Ext.type(c) == 'object') {return c.typeCode;}}
							},
							{name:'customerName'}
							,{name:'customerId'}
							,{name:'customerType'}
							,{name:'documentCode'}
							,{name:'documentType'}
							,{name:'customerBankCard'}
							,{name:'auditStaffCode'}
							,{name:'auditDate'}
							,{name:'originalValue'}
							,{name:'originalCurrency'}
							,{name:'originalRmb'}
							,{name:'creditInterest'}
							,{name:'collateralCurrency'}
							,{name:'collateralValue'}
							,{name:'pledgeCurrency'}
							,{name:'formalityState'}
							,{name:'loantovalueRatio'}
							,{name:'insuranceState'}
							,{name:'registrateCode'}
							,{name:'codeType'}
							,{name:'registrateStart'}
							,{name:'valuationMethod'},{name:'ownership'}
							,{name:'confirmedValue'},
							{
								name : 'belongBy',
								mapping : 'belongBy',
								 convert : function(c) {
								if (Ext.type(c) == 'object') {return c.id;}}
							},
							{
								name : 'belongByName',
								mapping : 'belongBy',
								 convert : function(c) {
								if (Ext.type(c) == 'object') {return c.customerName;}}
							},
							{name:'collateralStateName',mapping :'collateralState',convert : function(a) {
								for ( var i = 0; i < collateralState.size(); i++) {
									var obj = collateralState[i];
									if (a == obj[0]) {
										a = obj[1];
										break;
									}
								}
								return a;
							}},
							{name:'collateralState'}
							,
							{name:'pledgeValue'}
							,
							{name:'remark'}
							,
							{name:'registrateBy'},
							{name:'registrateDate'}
				]
			})
});

var YPXX_Panel = new Ext.grid.GridPanel({
//	title:'保单下押品信息',
	frame : true,
	id:"collateralGridId",
	store:BDYPstore,
	height:700,
	stripeRows : true,
	bbar :new Ext.PagingToolbar({
		pageSize : 20,
		pageNo : 1,
		store : BDYPstore,
		prependButtons : true,
		displayInfo : true,
		items : [ '->' ]
	}),
	/*tbar: [*/
	       /*{ 
	    	   xtype: 'button', 
	    	   text: '新增',
	    	   hidden : '1'==policy.isFgshbg ? true : false,
	    	   iconCls : "lb-cmd-Add",
			   handler :  function(m){
				   var PolicyId = policy.id;
	    	   		var collateralAddWin =yp.collateralAddWin(true,false,'1',PolicyId);
					collateralAddWin.show();
	       		}
	       },*/
	       /*{ xtype: 'button', 
	    	 text: '查看',
	    	 iconCls : "lb-cmd-Import",
	    	 handler :  function(m){
	    			var a = YPXX_Panel.getSelectionModel().getSelections();
					if (a.length == 0) {
						Ext.MessageBox.alert("信息", "请选择要删除的记录！");
						return;
					}
	    			var recored = a[0];
	    			var collateralAddWin =yp.collateralAddWin(recored.data.id,false);
	    			var basicInfo = Ext.getCmp('collateralAddWin_basicInfoId');
	    			basicInfo.getForm().loadRecord(recored);
	    			basicInfo.getForm().findField("collateralId").setValue(recored.data.id);
	    			//加载分类信息
	    			var typeCode = recored.data.rootTypeCode+""+recored.data.trunkTypeCode;
	    			basicInfo.getForm().findField("typeCode").setValue(typeCode);
	    			var indxParam  = Crt.fuc.getValueBy(typeCode,Crt.constants.typeMap);
	    			var typeInfo = Ext.getCmp('collateralAddWin_'+indxParam+'Id');
	    			hiddenAllForm();
	    			if(typeInfo){
	    				typeInfo.show();
	    				Ext.Ajax.request({
	    						url:indxParam+'_listBycollaterId.action',
	    						method:'POST',
	    						params:{
	    							collateralId:recored.data.id
	    						},
	    						success : function(d, e) {
	    							var result=Ext.decode(d.responseText);
	    						if(result.success){
//	    							Ext.MessageBox.alert("提示", "操作成功！");
	    							typeInfo.getForm().loadRecord(result);
	    							if(result.data)
	    							typeInfo.getForm().findField(indxParam+"Id").setValue(result.data.id);
	    						}else{
	    							Ext.MessageBox.alert("提示","分类信息加载失败！")				
	    						}
	    					},
	    					failure : function(d, e) {
	    						Ext.MessageBox.alert("提示","分类信息加载失败，请联系管理员！");
	    					}	
	    					});
	    			}	
	    			//加载处置信息
	    			var managerInfo = Ext.getCmp('collateralAddWin_managementInfoId');
	    			Ext.Ajax.request({
	    				url:'collateralHandle_listBycollaterId.action',
	    				method:'POST',
	    				params:{
	    					collateralId:recored.data.id
	    				},
	    				success : function(d, e) {
	    					var result=Ext.decode(d.responseText);
	    				if(result.success){
//	    					Ext.MessageBox.alert("提示", "操作成功！");
	    					managerInfo.getForm().loadRecord(result);
	    					if(result.data)
	    					managerInfo.getForm().findField("collateralHandleId").setValue(result.data.id);
	    				}else{
	    					Ext.MessageBox.alert("提示","处置信息加载失败！")				
	    				}
	    			},
	    			failure : function(d, e) {
	    				Ext.MessageBox.alert("提示","处置信息加载失败，请联系管理员！");
	    			}	
	    			});
	    			collateralAddWin.show();
	    		}
	       },
	       { xtype: 'button', 
		    	 text: '删除',
		    	 hidden : '1'==policy.isFgshbg ? true : false,
		    	 iconCls : "lb-cmd-Delete",
				   handler :  function(m){
					   var a = YPXX_Panel.getSelectionModel().getSelections();
						if (a.length == 0) {
							Ext.MessageBox.alert("信息", "请选择要删除的记录！");
							return;
						}
						
					   Ext.Msg.confirm("信息确认", "您确认要删除所选记录吗？", function(c) {
							if (c == "yes") {
								Ext.Ajax.request({
									url : 'collateral_policyrelat_delete.action',
									params : {
										policyId : policy.id,
										collateralId : a[0].data.id
									},
									method : "POST",
									success : function(d, e) {
										Ext.MessageBox.alert("操作信息", "删除成功！");
										YPXX_Panel.getStore().reload();
									},
									failure : function(d, e) {
										Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
									}
								});
							}
						});
				   }
		       }
	       ],*/
	autoScroll: true,
	columns: [
	            {
	                header   : '押品编号', 
	                width    : 170, 
	                sortable : true, 
	                dataIndex: 'collateralCode'
	            },
	            {
	                header   : '押品名称', 
	                width    : 70, 
	                sortable : true, 
	                dataIndex: 'collateralName'
	            },
	            {
	                header   : '押品类别', 
	                width    : 70, 
	                sortable : true, 
	                dataIndex: 'rootTypeName'
	            },
	            {
	                header   : '质物价值', 
	                width    : 100, 
	                sortable : true, 
	                dataIndex: 'collateralValue'
	            },
	            {
	                header   : '押品状态', 
	                sortable : true, 
	                dataIndex: 'collateralStateName'
	            },
	            {
	                header   : '登记人', 
	                width    : 75, 
	                sortable : true, 
	                dataIndex: 'registrateBy'
	            },
	            {
	                header   : '登记日期', 
	                width    : 75, 
	                sortable : true, 
	                dataIndex: 'registrateDate'
	            }
	        ]
});

function getCookie(b) {
	var d = b + "=";
	var e = document.cookie.indexOf(d);
	if (e == -1) {
		return null;
	}
	var a = document.cookie.indexOf(";", e + d.length);
	if (a == -1) {
		a = document.cookie.length;
	}
	var c = document.cookie.substring(e + d.length, a);
	return unescape(c);
};
Ext.onReady(function() {
	var storeTheme = getCookie('theme');
	if (storeTheme == null || storeTheme == '') {
		storeTheme = 'ext-all-css04';
	}
	Ext.util.CSS.swapStyleSheet("theme", "jsp/ext3/ext3.4/resources/css/"
			+ storeTheme + ".css");
	var panelsize = Ext.getBody().getHeight();
	if (panelsize < 80)
		panelsize = 80;
	Ext.QuickTips.init();
	try {
		Ext.get('loading').remove();
		Ext.get('loading-mask').remove();
	} catch (e) {
	}
	var viewport = new Ext.Viewport({
		layout : 'fit',
//		autoScroll:true,
		layoutConfig : {
			align : 'stretch',
			pack : 'start'
		},
		items : [YPXX_Panel]
	});
	
});