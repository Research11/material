//投保人引入
var setPolicyHolder = function(record) {
	var sname = record.get('customerName');
	var sid = record.get('id');
	var cmpName = Ext.getCmp("searchPolicyHolderName");
	var cmpId = Ext.getCmp("searchPolicyHolder");
	cmpId.setValue(sid);
	cmpName.setValue(sname);
};
//被保险人引入
var setAssuredCode = function(record) {
	var cmpName = Ext.getCmp("searchAssuredCodeName");
	var cmpId = Ext.getCmp("searchAssuredCode");
	var sname = record.get('customerName');
	var sid = record.get('id');
	cmpId.setValue(sid);
	cmpName.setValue(sname);
};
var adSearch = "";
GridPanel = function(config) {
	Ext.apply(this, config);
	LBUI.store = new Ext.data.Store({
		autoDestroy : true,
		url : 'statistical_list.action',
		baseParams : {
			loadStore : true,
			start : 0,
			limit : 0,
			adSearch : adSearch
		},
		storeId : 'storeId',
		reader : new Ext.data.JsonReader({
			root : 'data',
			idProperty : 'id',
			totalProperty : 'total',
			fields : [
			{
				name : 'id'
			}, {
				name : 'insuranceType'
			}, {
				name : 'processId'
			}, {
				name : 'policyCode'
			}, {
				name : 'policyNo'
			}, {
				name : 'protocolNo'
			}, {
				name : 'renewalMark'
			}, {
				name : 'renewalCode'
			}, {
				name : 'coinsuranceSign'
			}, {
				name : 'unproforSign'
			}, {
				name : 'policyType'
			}, {
				name : 'shareholderSign'
			}, {
				name : 'bigSign'
			}, {
				name : 'belongDept'
			}, {
				name : 'salePerson'
			}, {
				name : 'agentPerson'
			}, {
				name : 'agencyAgreement'
			}, {
				name : 'relatPolicy'
			}, {
				name : 'investigateBy'
			}, {
				name : 'agricultureSign'
			}, {
				name : 'addedSign'
			}, {
				name : 'policyDate'
			}, {
				name : 'buildDate'
			}, {
				name : 'policyPeriod'
			}, {
				name : 'solveWay'
			}, {
				name : 'policyHolder'
			}, {
				name : 'guarantorSign'
			}, {
				name : 'guarantorCode'
			}, {
				name : 'assuredCode'
			}, {
				name : 'assuredType'
			}, {
				name : 'collateralId'
			}, {
				name : 'processState'
			}, {
				name : 'policyStatus'
			}, {
				name : 'coverage'
			}, {
				name : 'refuseReason'
			}, {
				name : 'refuseDate'
			}, {
				name : 'policyStart'
			}, {
				name : 'policyEnd'
			}, {
				name : 'deductibleFranchise'
			}, {
				name : 'policyValue'
			}, {
				name : 'policyCost'
			}, {
				name : 'policyRate'
			}, {
				name : 'creditEnd'
			}, {
				name : 'creditStart'
			}, {
				name : 'creditPeriod'
			}, {
				name : 'repaymentMethod'
			}, {
				name : 'repaymentPlan'
			}, {
				name : 'creditUse'
			}, {
				name : 'leaseContract'
			}, {
				name : 'payMode'
			}, {
				name : 'leaseValue'
			}, {
				name : 'insuranceObject'
			}, {
				name : 'mainClause'
			}, {
				name : 'policyCurrency'
			}, {
				name : 'signCurrency'
			}, {
				name : 'regulationFactor'
			}, {
				name : 'standardMoney'
			}, {
				name : 'risksIdentify'
			}, {
				name : 'createdBy'
			}, {
				name : 'updatedBy'
			}, {
				name : 'createdDate'
			}, {
				name : 'updatedDate'
			}, {
				name : 'policyHolderName'
			}, {
				name : 'assuredCodeName'
			}, {
				name : 'salePersonName'
			}, {
				name : 'belongDeptName'
			} ]
		})
	});
	var gridCM = new LBUI.grid.ColumnModel([
			{
				header : '投保单号 ',
				width : 200,
				dataIndex : 'policyNo',
				id : 'policyNo',
				resizable : true,
				sortable : true
			}
			,{
				header : '保单编号 ',
				width : 200,
				dataIndex : 'policyCode',
				id : 'policyCode',
				resizable : true,
				sortable : true
			},{
				header : '产品',
				width : 200,
				dataIndex : 'mainClause',
				id : 'mainClause',
				resizable : true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store) {
					var r = record.data['mainClause'];
					for ( var i = 0; i < mainClause.size(); i++) {
						var obj = mainClause[i];
						if (r == obj[0]) {
							r = obj[1];
							break;
						}
					}
					return r;
				},
				sortable : true
			},		
			{
				header : '保单状态 ',
				width : 100,
				dataIndex : 'policyStatus',
				id : 'policyStatus',
				resizable : true,
				renderer : function(value, metadata, record, rowIndex,
						colIndex, store) {
					var r = record.data['policyStatus'];
					for ( var i = 0; i < policyStatus.size(); i++) {
						var obj = policyStatus[i];
						if (r == obj[0]) {
							r = obj[1];
							break;
						}
					}
					return r;
				},
				sortable : true
			},
			{
				header : '归属部门',
				width : 100,
				dataIndex : 'belongDeptName',
				id : 'belongDeptName',
				resizable : true,
				sortable : true
			},
			{
				header : '业务员/产险专员',
				width : 100,
				dataIndex : 'salePersonName',
				id : 'salePersonName',
				resizable : true,
				sortable : true
			},{
				header : '投保日期',
				width : 100,
				dataIndex : 'policyDate',
				id : 'policyDate',
				resizable : true,
				sortable : true
			},{
				header : '保险期间(月)',
				width : 100,
				dataIndex : 'policyPeriod',
				id : 'policyPeriod',
				resizable : true,
				sortable : true
			},{
				header : '投保人客户名称',
				width : 100,
				dataIndex : 'policyHolderName',
				id : 'policyHolderName',
				resizable : true,
				sortable : true
			},{
				header : '被保险人名称',
				width : 100,
				dataIndex : 'assuredCodeName',
				id : 'assuredCodeName',
				resizable : true,
				sortable : true
			}]);
	var gridView = null;
	GridPanel.superclass.constructor.call(this, {
		store : LBUI.store,
		layout : 'fit',
		border : true,
		view : gridView,
		cm : gridCM,
		sm : new LBUI.grid.RowSelectionModel({
			singleSelect : true,
			listeners : {
				beforerowselect : function(sm, row, rec) {
					var record = sm.getSelected();
					if (record != null && record != undefined) {
						record.data.checkbox = false;
						var a = this.grid.getView();
						a.refreshRow(record);
					}
				},
				rowselect : function(sm, row, rec) {
					LBUI.selectRow(rec.id);
				},
				selectionclear : function(sm) {
					LBUI.clearSelection();
				}
			}
		}),
		stripeRows : true,
		bbar : new LBUI.PagingToolbar({
			pageSize : 20,
			pageNo : 1,
			store : LBUI.store,
			prependButtons : true,
			displayInfo : true,
			items : ['->' ]
		})
	});
	var grid = this;
	LBUI.doQuery = LBUI.fun.ajaxQuery;
	LBUI.getSelectId = function() {
		var sm = grid.getSelectionModel();
		var select = sm.getSelected();// 返回首个选择的记录.
		if (select)
			return select.data.id;
		return null;
	};
	LBUI.store.on('beforeload', function() {
		if (adSearch == "groupSearch") {
			Ext.apply(this.baseParams);
		} else if (adSearch == "quickSearch") {
			var a = Ext.getCmp("paramBar");
			var o = a.getForm().getValues(false);
			o['adSearch'] = adSearch;
			o['start'] = this.baseParams.start;
			o['limit'] = this.baseParams.limit;
			this.baseParams = o;
		} else if (adSearch == "") {
			Ext.apply(this.baseParams);
		} else {
			var o = {};
			o['adSearch'] = adSearch;
			o['start'] = this.baseParams.start;
			o['limit'] = this.baseParams.limit;
			this.baseParams = o;
		}

	});
	grid.on({
		'rowdblclick' : function() {
			if (LBUI.store && LBUI.store.writer)
				return; // --可编辑表格模式不支持双击执行默认操作功能
			LBUI.doDefCmd();
		}
	});
	LBUI.store.load();
};
Ext.extend(GridPanel, LBUI.GridPanel, {});
MainPanel = function(config) {
	Ext.apply(this, config);
	this.grid = new GridPanel({
		region : 'center',
		border : true
	});
	MainPanel.superclass.constructor.call(this, {
		id : 'main-panel',
		layout : 'border',
		border : false,
		items : [ this.grid ]

	});
};
Ext.extend(MainPanel, Ext.Panel, {
	moveDetail : function(m, e) {
		var right = Ext.getCmp('right-detail');
		var bot = Ext.getCmp('bottom-detail');
		var detail = this.detail;
		switch (m.value) {
		case 'bottom':
			right.hide();
			bot.add(detail);
			bot.show();
			bot.ownerCt.doLayout();
			break;
		case 'right':
			bot.hide();
			right.add(detail);
			right.show();
			right.ownerCt.doLayout();
			break;
		case 'hidden':
			detail.ownerCt.hide();
			detail.ownerCt.ownerCt.doLayout();
			break;
		}
	}
});
LBUI.selectRow = function(idstr, params) {
};
LBUI.clearSelection = function() {
};
policyOpinionWin = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initUIComponents();
		policyWin.superclass.constructor.call(this, {
			id : "policyOpinionWin",
			iconCls : "btn-add-contact",
			layout : "fit",
			items : this.formPanel,
			modal : true,
			width : 600,
			height : 462,
			maximizable : true,
			closeAction : "hide",
			title : "保单业务意见详细信息",
			buttonAlign : "center",
			buttons : this.buttons,
			listeners : {
				"hide" : function() {
					this.formPanel.getForm().reset();
				}
			}
		});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.form.FormPanel({
			border : true,
			url : 'policy_save.action',
			layout : "form",
			defaults : {
				anchor : "100%,100%"
			},
			bodyStyle : "padding:5px;",
			defaultType : "textfield",
			id : "policyForm",
			frame : true,
			defaultType : "textfield",
			items : [ {
				name : 'processId',
				fieldLabel : '审批人',
				xtype : 'textfield'
			}, {
				id : 'updatedDate',
				name : 'updatedDate',
				fieldLabel : '审批意见',
				xtype : 'textarea'
			} ]
		});
		this.buttons = [ {
			text : "关闭",
			iconCls : "btn-cancel",
			handler : this.cancel.createCallback(this)
		} ];
	},
	cancel : function(a) {
		a.formPanel.getForm().reset();
		a.hide();
	}
});
Ext.onReady(function() {
			Ext.QuickTips.init();
			var panelsize = Ext.getBody().getViewSize().height - 135;
			if (panelsize < 80)
				panelsize = 80;
			try {
				Ext.get('loading').remove();
				Ext.get('loading-mask').remove();
			} catch (e) {
			}
			var onCmd = function(m) {
				LBUI.fun.onCmd(m);
			};
			var policyWindow = null;
			// 新增
			var onCmdAdd = function(m) {
				var height = document.body.clientHeight - 50;
				var heightIframe = height - 44;
				var win = new Ext.Window(
						{
							title : "新增保单信息",
							autoScroll : true,
							id : "policyAddWin",
							width : document.body.clientWidth,
							height : height,
							maximizable : true,
							modal : true,
							items : [ {
								html : "<iframe frameborder='no' scrolling='yes' border='0' marginwidth='0' marginheight='0' width=100% height="
										+ heightIframe
										+ " src='policy_add.action';>"
							} ]
						});
				win.show();
				win.on("close",function(){
					   gridSearch();
					     });
			};
			// 修改
			var onCmdEdit = function(m) {
				var height = document.body.clientHeight - 50;
				var heightIframe = height - 44;
				var sl = mainPanel.grid.getSelectionModel().getSelected();
				if (sl.data.policyStatus != '1'&&sl.data.policyStatus != '0') {
					var win = new Ext.Window(
							{
								title : "保单信息查看",
								autoScroll : true,
								id : "policyEditWin",
								width : document.body.clientWidth,
								height : height,
								maximizable : true,
								modal : true,
								items : [ {
									html : "<iframe frameborder='no' scrolling='yes' border='0' marginwidth='0' marginheight='0' width=100% height="
											+ heightIframe
											+ " src='SPpolicy_view.action?id="
											+ sl.id + "';>"
								} ]

							});
					win.show();
				} else {//草稿状态与待提交状态为编辑页面
					var win = new Ext.Window(
							{
								title : "保单信息编辑",
								autoScroll : true,
								id : "policyEditWin",
								width : document.body.clientWidth,
								height : height,
								maximizable : true,
								modal : true,
								items : [ {
									html : "<iframe frameborder='no' scrolling='yes' border='0' marginwidth='0' marginheight='0' width=100% height="
											+ heightIframe
											+ " src='policy_view.action?id="
											+ sl.id + "';>"
								} ]

							});
					win.show();
					win.on("close",function(){
						   gridSearch();
						     });
				}
			};
			// 删除
			var onCmdDel = function(m) {
				var a = mainPanel.grid.getSelectionModel().getSelections();
				var policyStatus = a[0].data.policyStatus;
				var canDel = false;
				if(policyStatus =='1' || policyStatus =='0'){
					canDel = true;
				}
				if(!canDel){
					Ext.MessageBox.alert("信息", "业务正在审批中或审批已结束，不可删除！");
					return;
				}
				if (a.length == 0) {
					Ext.MessageBox.alert("信息", "请选择要删除的记录！");
					return;
				}
				var data = Array();
				for ( var index = 0; index < a.length; index++) {
					data.push(a[index].data.id);
				}
				Ext.Msg.confirm("信息确认", "您确认要删除所选记录吗？", function(c) {
					if (c == "yes") {
						Ext.Ajax.request({
							url : 'policy_delete.action',
							params : {
								data : data
							},
							method : "POST",
							success : function(d, e) {
								var result=Ext.decode(d.responseText).myResult;
								Ext.MessageBox.alert("操作信息", result);
								mainPanel.grid.getStore().reload();
							},
							failure : function(d, e) {
								Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
							}
						});
					}
				});
			};
			var onCmdSearch = function(m) {
				var sl = mainPanel.grid.getSelectionModel().getSelected();
				if (sl != null && sl != undefined) {
					policyWindow = Ext.getCmp("policyOpinionWin");
					if (policyWindow == null)
						policyWindow = new policyOpinionWin({
							store : mainPanel.grid.store,
							notNeedButton : false
						});
					var sl = mainPanel.grid.getSelectionModel().getSelected();
					policyWindow.formPanel.getForm().reset();
					policyWindow.show();
					policyWindow.formPanel.getForm().loadRecord(sl);
					var controls = policyWindow.formPanel.items;
					var updateDate = controls.items[controls.items.length - 1];
					var createDate = controls.items[controls.items.length - 2];
					createDate.enable();
					updateDate.enable();
					createDate.setReadOnly(true);
					updateDate.setReadOnly(true);
				}
			};
            var onCmdSub = function(m){
            	var a = mainPanel.grid.getSelectionModel().getSelections();
				if(a[0].data.policyStatus!='1'){
						Ext.MessageBox.alert("信息", "该状态保单信息不可提交！");
						return;
				}else{
					var data = Array();
					for ( var index = 0; index < a.length; index++) {
						data.push(a[index].data.id);
					}
					Ext.Msg.confirm("信息确认", "您确认要提交所选记录吗？", function(c) {
						if (c == "yes") {
			            	var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"正在提交，请稍后..."});
				        	myMask.show();
							Ext.Ajax.request({
								url : 'policy_SubById.action',
								params : {
									policyId : data
								},
								method : "POST",
								success : function(d, e) {
									myMask.hide();
									var result=Ext.decode(d.responseText).myResult;
									Ext.MessageBox.alert("操作信息", result);
									mainPanel.grid.getStore().reload();
								},
								failure : function(d, e) {
									myMask.hide();
									Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
								}
							});
						}
					});}
            }
          //生成承保意向书
            var onCmdGenContractIntent = function(m){
            	var a = mainPanel.grid.getSelectionModel().getSelections();
        		if (a.length != 1) {
        			Ext.MessageBox.alert("信息", "请选择一条记录！");
        			return;
        		}
        		var policyStatus = mainPanel.grid.getSelectionModel().getSelected().get(
				'policyStatus');
        		var boo = false;
        		if(policyStatus == '8' || policyStatus == '11'  || policyStatus == '13'){
        			boo = true;
        		}
        		if(!boo){
        			Ext.MessageBox.alert("信息", "该保单还没有审批通过！");
        			return;
        		}
        	   var id = LBUI.getSelectId();
            	var contractPanel = new Ext.Panel({
            		border:false,
        			frame : false,
        			html: "<iframe id = 'printContract' frameborder ='0'  marginwidth='0' marginheight='0' width='650' height='700' scrolling='yes' " + " src='general_contract_book.action?id="+id+"';>"
        		});
            	var contractWin = new Ext.Window({
                    title:'承保意向书',
                    width:700,
                    closeAction : 'hide',
                    autoScroll:true,
                    height:600,
                    items: [contractPanel],
                    buttons: [{
                        text:'打印承保意向书',
                        scope:this,
                        handler: function(b, e){
                        	var id = LBUI.getSelectId();
                        	Ext.Msg.confirm("信息确认", "您确认要打印该承保意向书吗？", function(c) {
        						if (c == "yes") {
        							Ext.Ajax.request({
                        				url : 'print_policy_update.action',
                        				params : {
                        					policyId : id
                        				},
                        				method : "POST",
                        				success : function(d, e) {
                        					var iframe = document.getElementById("printContract");
                        					iframe.contentWindow.focus();//IE will print parent window without this statement.
                        					iframe.contentWindow.print();
                        				},
                        				failure : function(d, e) {
                        					Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
                        				}
                        			});
        						}
        					});
                        }
                    },{
                        text: '返回',
                        scope:this,
                        handler: function(b, e){
                    		contractWin.hide();
        				}
                    }]
                });
            	contractWin.show();
            };
            function showResult(btn){
            	if (btn == 'yes'){
            		var id = LBUI.getSelectId();
            		Ext.Ajax.request({
        				url : 'print_policy_cancel.action',
        				params : {
        					policyId : id
        				},
        				method : "POST",
        				success : function(d, e) {
        					Ext.MessageBox.alert("操作信息", "已作该废承保意向书！");
        				},
        				failure : function(d, e) {
        					Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
        				}
        			});
                }
            };
            //作废承保意向书
            var onCmdCancelContractIntent = function(m){
            	var a = mainPanel.grid.getSelectionModel().getSelections();
          	   
        		if (a.length != 1) {
        			Ext.MessageBox.alert("信息", "请选择一条记录！");
        			return;
        		}
            	Ext.MessageBox.confirm('提示', '确认作废选中的承保意向书？', showResult);
            };
            //影像扫描
            var onCmdImageScan = function(m){
            		var a = mainPanel.grid.getSelectionModel().getSelections();
        			if (a.length != 1) {
        				Ext.MessageBox.alert("信息", "请选择一条记录！");
        				return;
        			}
        			if("0"==a[0].data.policyStatus){
        				Ext.MessageBox.alert("信息", "草稿信息不能进行影像扫描！");
        				return;
        			}
        	   		var id = LBUI.getSelectId();
            		Ext.Ajax.request({
        							url : "getyingxiang.action",
        							params : {
        								policyId:id
        							},
        							success : function(response) {
        								var strs= new Array(); //定义一数组 
        								strs=response.responseText.split(";;"); //字符分割 
        								openPostWindow(strs[0], encodeURI(strs[1]),"影像扫描");
        							},
        							scope : this
        						});    	
            };
            //查看影像
            var chakanimage = function(m){
            		var a = mainPanel.grid.getSelectionModel().getSelections();
         	   
        			if (a.length != 1) {
        				Ext.MessageBox.alert("信息", "请选择一条记录！");
        				return;
        			}
        			if("0"==a[0].data.policyStatus){
        				Ext.MessageBox.alert("信息", "草稿信息不能进行影像查看！");
        				return;
        			}
        	   		var id = LBUI.getSelectId();
            		Ext.Ajax.request({
        							url : "chakangetyingxiang.action",
        							params : {
        								policyId:id
        							},
        							success : function(response) {
        								var strs= new Array(); //定义一数组 
        								strs=response.responseText.split(";;"); //字符分割 
        								openPostWindow(strs[0], encodeURI(strs[1]),"影像查询");
        							},
        							scope : this
        						});    	
            };
        	function openPostWindow(url, data, name){  
                var tempForm = document.createElement("form");  
                tempForm.id="tempForm1";  
                tempForm.method="post";  
                tempForm.action=url;  
                tempForm.target=name;  
                var hideInput = document.createElement("input");  
               hideInput.type="hidden";  
               hideInput.name= "queryXml";
               hideInput.value= data;
               tempForm.appendChild(hideInput);   
               document.body.appendChild(tempForm);  
               tempForm.submit();
               document.body.removeChild(tempForm);
          }  
			// 查看意见
			var onCmdSee = function(m) {
				var slv = mainPanel.grid.getSelectionModel().getSelected().get(
						'id');
				if (slv == null || slv == '') {
					Ext.MessageBox.alert("提示信息", "请先选择保单！");
				} else {
					var shenpiyijianColM = new Ext.grid.ColumnModel([ {
						header : "建议金额",
						dataIndex : "recommendAmount",
						width : 120
					}, {
						header : "建议费率",
						dataIndex : "recommendRate",
						width : 120
					}, {
						header : "建议期限",
						dataIndex : "recommendPeriod",
						width : 120
					}, {
						header : "审批结果",
						dataIndex : "approvalResult",
						width : 120
					}, {
						header : "审批人",
						dataIndex : "createdby",
						width : 120
					}, {
						header : "审批意见",
						dataIndex : "remark",
						width : 200
					},{
						header : "审批时间",
						dataIndex : "createdDate",
						resizable : true,
						sortable : true,
						width : 200,
						renderer : function(value) {
							if(null!=value&&value.length>4)
							{
								return  value.substring(0,value.length-4);
							}
							else{
								return  "";
				                }
						}
					}]);
					var shenpiyijianStore = new Ext.data.Store({
						autoDestroy : true,
						url : 'verifyinfo_policy.action',
						autoLoad : true,
						baseParams : {
							loadStore : true,
							bdID : slv,
							flag : '1'
						},
						storeId : 'storeId',
						reader : new Ext.data.JsonReader({
							root : 'data',
							idProperty : 'id',
							fields : [ {
								name:'createdDate'
							},{
								name : 'id'
							}, {
								name : 'recommendAmount'
							}, {
								name : 'recommendRate'
							}, {
								name : 'recommendPeriod'
							}, {
								name : 'approvalResult'
							}, {
								name : 'createdby'
							}, {
								name : 'remark'
							} ]
						})
					});
					var spyjgrid = new Ext.grid.GridPanel({
						store : shenpiyijianStore,
						cm : shenpiyijianColM,
						region : 'center',
						border : false
					});

					var shenpiwindow = new Ext.Window({
						title : '审批意见',
						height : 300,
						width : 800,
						frame : true,
						layout : "border",
						border : false,
						items : spyjgrid
					});
					shenpiwindow.show();
				}
			};
			var mainPanel = new MainPanel({
				flex : 1
			});
			function gridSearch() {
				var a = Ext.getCmp("paramBar");
				adSearch = 'quickSearch';
				if (a.getForm().isValid()) {
					a.getForm().submit({
						method : "POST",
						waitMsg : "正在提交数据...",
						params : {
							limit : 0,
							adSearch : adSearch
						},
						success : function(d, g) {
							mainPanel.grid.getStore().loadData(g.result);
						},
						failure : function(d, e) {
							Ext.MessageBox.show({
								title : "操作信息",
								msg : "查询出错，请联系管理员！",
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
						}
					});
				}
			}
			var paraFormPanel = null;
			paraFormPanel = new Ext.form.FormPanel(
					{
						url : 'policy_list.action',
						id : 'paramBar',
						frame : true,
						width : '100%',
						height:150,
						border : "form",
						buttonAlign : 'center',
						title : '查询条件',
						layout : "form",
						items : [ {
							layout : 'column',
							items : [ {
								layout : 'form',
								columnWidth : .33,
								items : [ {
									xtype : 'textfield',
									fieldLabel : '保单编号',
									name : 'policyCode',
									border : false
								} ]
							}, {
								layout : 'form',
								columnWidth : .33,
								items : [ {
									xtype : 'textfield',
									fieldLabel : '投保单号',
									name : 'policyNo',
									border : false
								} ]
							}, {
								columnWidth : .33,
								layout : 'form',
								items : [ new Ext.form.ComboBox({
									name : 'mainClause',
									fieldLabel : '产品',
									hiddenName : 'mainClause',
									store : new Ext.data.SimpleStore({
										fields : [ 'key', 'value' ],
										data : mainClause
									}),
									valueField : 'key',
									displayField : 'value',
									mode : 'local',
									triggerAction : 'all',
									listWidth:400,
									editable : false,
									selectOnFocus : true,
									width : 123
								}) ]
							}, {
								columnWidth : .33,
								layout : 'table',
								items : [ {
									layout : 'form',
									anchor : '70%',
									items : [ {
										xtype : 'textfield',
										fieldLabel : '投保人',
										name : 'policyHolderName',
										id : 'searchPolicyHolderName',
										border : false
									}, {
										xtype : 'hidden',
										id : 'searchPolicyHolder',
										name : 'policyHolder',
										border : false
									} ]
								}]
							}, {
								columnWidth : .33,
								layout : 'table',
								items : [ {
									layout : 'form',
									anchor : '70%',
									items : [ {
										xtype : 'textfield',
										fieldLabel : '被保险人',
										name : 'assuredCodeName',
										id : 'searchAssuredCodeName',
										border : false
									}, {
										xtype : 'hidden',
										name : 'assuredCode',
										id : 'searchAssuredCode',
										border : false
									} ]
								}]
							}, {
								columnWidth : .25,
								layout : 'form',
								items : [ {
									name : 'policyDate',
									fieldLabel : '投保日期',
									xtype : 'datefield',
									format : 'Y-m-d',
									emptyText : '',
									altFormats : 'YYYY-mm-dd',
									disabled : false,
									width : 123
								} ]
							} ,{
								columnWidth : .25,
								layout : 'form',
								items : [ new Ext.form.ComboBox({
									name : 'policyStatus',
									fieldLabel : '保单状态',
									hiddenName : 'policyStatus',
									store : new Ext.data.SimpleStore({
										fields : [ 'key', 'value' ],
										data : policyStatus
									}),
									valueField : 'key',
									displayField : 'value',
									mode : 'local',
									triggerAction : 'all',
									width : 123,
									editable : false,
									selectOnFocus : true
								}) ]
							}]
						} ],
						buttons : [
								{
									text : '查询',
									iconCls : 'search',
									scope : this,
									handler : function() {
										var searchForm = Ext.getCmp('paramBar');
										adSearch = "quickSearch";
										if (searchForm.getForm().isValid()) {
											searchForm.getForm().submit(
															{
																method : "POST",
																waitMsg : "正在提交数据...",
																params : {
																	limit : 0,
																	adSearch : adSearch
																},
																success : function(d, g) {
																	mainPanel.grid.getStore().loadData(g.result);
																},
																failure : function(d, e) {
																	Ext.MessageBox.show({
																				title : "操作信息",
																				msg : "查询出错，请联系管理员！",
																				buttons : Ext.MessageBox.OK,
																				icon : Ext.MessageBox.ERROR
																			});
																}
															});
										}
									}
								},
								{
									text : '重置',
									iconCls : "btn-reset",
									handler : function() {
										var searchForm = Ext.getCmp('paramBar');
										searchForm.getForm().reset();
									},
									scope : this
								} ]
					});
			LBUI.doDefCmd = function() {
				try {
					var tb = Ext.getCmp('toolBar');
					if (tb) {
						for ( var i = 0; i < tb.items.length; i++) {
							var ti = tb.items.itemAt(i);
							if (ti && ti.handler && ti.defCmd) {
								ti.handler.call(ti.scope || ti, ti);
								break;
							}
						}
					}
				} catch (e) {
				}
			};
			var toggleBarFun = function(btn, bid) {
				var bar = Ext.getCmp(bid);
				if (btn.pressed)
					bar.show();
				else
					bar.hide();
				viewport.doLayout();
			};
			new Ext.Button({
				renderTo : 'paramBtn',
				cls : 'flatBtn',
				iconCls : 'paramBtn',
				enableToggle : true,
				pressed : true,
				handler : function(b, e) {
					toggleBarFun(b, 'paramBar');
				},
				text : '查询'
			});
			var viewport = new Ext.Panel({
				id : "viewport",
				layout : {
					type : 'vbox',
					align : 'stretch'
				},
				renderTo : 'layout',
				viewConfig : {
					forceFit : true
				},
				border : false,
				height : panelsize,
				items : [ {
					xtype : 'box',
					el : 'titleBarDiv',
					id : 'titleBar',
					border : false
				}, paraFormPanel, 
				
				new Ext.Toolbar({
					id : 'toolBar',
					items : [ {
						
						"text" : "查看意见",
						"recType" : 1,
						"popup" : true,
						"select" : true,
						"type" : 1,
						"iconCls" : "x-btn-text lb-btn-advSearch",
						"handler" : onCmdSee
						
						/*"text" : "业务申请",
						"recType" : 1,
						"popup" : true,
						"select" : true,
						"type" : 1,
						"iconCls" : "lb-cmd-Add",
						"handler" : onCmdAdd*/
					}]
				}),
					
					/*, {
						"text" : "投保单删除",
						"recType" : 1,
						"popup" : true,
						"select" : true,
						"type" : 1,
						"iconCls" : "lb-cmd-Delete",
						"handler" : onCmdDel
					}, {
						"text" : "投保单修改/查看",
						"recType" : 1,
						"popup" : true,
						"select" : true,
						"type" : 1,
						"iconCls" : "lb-cmd-Update",
						"handler" : onCmdEdit
					}, {
						"text" : "业务提交",
						"recType" : 1,
						"popup" : true,
						"select" : true,
						"type" : 1,
						"iconCls" : "lb-cmd-Add",
						"handler" : onCmdSub
					},{
						"text" : "查看意见",
						"recType" : 1,
						"popup" : true,
						"select" : true,
						"type" : 1,
						"iconCls" : "x-btn-text lb-btn-advSearch",
						"handler" : onCmdSee
					},{
						"text" : "生成承保意向书",
						"recType" : 1,
						"popup" : true,
						"select" : true,
						"type" : 1,
						"iconCls" : "lb-cmd",
						"handler" : onCmdGenContractIntent
					}, 
					 {
						"text" : "作废承保意向书",
						"recType" : 1,
						"popup" : true,
						"select" : true,
						"type" : 1,
						"iconCls" : "lb-cmd",
						"handler" : onCmdCancelContractIntent
					} ,{
						"text" : "影像扫描",
						"recType" : 1,
						"popup" : true,
						"select" : true,
						"type" : 1,
						"iconCls" : "lb-cmd",
						"handler" : onCmdImageScan
					},
					{
						"text" : "查看影像",
						"recType" : 1,
						"popup" : true,
						"select" : true,
						"type" : 1,
						"iconCls" : "lb-cmd",
						"handler" : chakanimage
					}]
				}),*/
				mainPanel ]
			});
		});