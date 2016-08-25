var  screenWidth =Ext.getBody().getViewSize().width-70;
if(Ext.getBody().getViewSize().width==0){
	screenWidth =1170;
}
var  eleWidth =(screenWidth+70)/2*0.6;

function disXtype(){
	var re=true; 
	Ext.ComponentMgr.all.each(function(cmp){  
	    var Type=cmp.getXType();  
	    if(Type=='textfield'||Type=='combo'||Type=='treecombo'||Type=='datefield'||Type=='numberfield'||Type=='textarea'||Type=='timefield'||Type=='trigger'||Type=='button'){ 
	    	if(Type=='button'){
	    		cmp.setVisible(false);
		    }else{
		    	if(cmp.getEl()!=null){
		    		cmp.getEl().dom.readOnly=true;
		    		cmp.style='background:#E6E6E6';
			    }
	    		cmp.readOnly=true;
	    		cmp.style='background:#E6E6E6';
			    
		    }
	     } 
		}
	); 
}
var query_store = new Ext.data.Store({
		url : 'customerCredit_policyId.action',
		autoLoad:true,
		baseParams : {
			id:pdi.policy.id
		},
		storeId : 'storeId',
		reader : new Ext.data.JsonReader({
					root : 'data',
					idProperty : 'id',
//					totalProperty : 'total',
					fields : [
							{name:'id'},					
							{name:'queryPersonType'},				
							{name:'personName'},				
							{name:'certifyNo'},				
							{name:'queryReason'},		
							{name:'queryTime'}				
					]
				})
	});

var colModel = new Ext.grid.ColumnModel( [ new Ext.grid.RowNumberer(), {
	header :"征信被查询人",
	width :120,
	sortable :true,
	dataIndex :"queryPersonType"
}, {
	header :"客户姓名",
	width :90,
	sortable :true,
	dataIndex :'personName'
}, {
	header :"证件号",
	width :150,
	sortable :true,
	dataIndex :'certifyNo'
}, {
	header :"查询原因 ",
	width :90,
	sortable :true,
	dataIndex :'queryReason'
}, {
	header :"查询时间",
	width :120,
	sortable :true,
	dataIndex :'queryTime'
} ]);

var grid21 = new Ext.grid.GridPanel( {
	width :1000,
	height :120,
	store :query_store,
	cm :colModel,
	stripeRows :true,
	title :'征信报告列表'
});

var ZXXX_Panel = new Ext.Panel( {
//	title :'征信信息',
	frame :true,
	border : false, 
	buttonAlign :'center'/*,
	buttons : [{
		xtype :'button',
		text :'保存征信信息',
		handler:function(){
			var form = Ext.getCmp('guarantorPanel');
			if (form.getForm().isValid()) {
				var data = Ext.util.JSON.encode(form.getForm().getValues(false));
			
				form.getForm().submit({
					method : "POST",
					url : "customerCredit_save.action",
					waitMsg : "正在提交数据...",
					params : {
						data : data
					},
					success : function(d, g) {
						var i = g.result.msg;
						var mes = "成功保存信息！";
						Ext.MessageBox.alert("操作信息", mes);
						if (i != null) {
							Ext.MessageBox.alert("操作信息", mes);
							form.getForm().reset();
						}
					},
					failure : function(d, e) {
						Ext.MessageBox.show({
							title : "操作信息",
							msg : "信息保存出错，请联系管理员！",
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
					}
				});
			}else{
				Ext.MessageBox.alert("操作信息", "请检查必填项是否填写！");
			}
			}
	}]*/,
	items : [ grid21, {
		xtype :'form',
		title :'投保人征信报告信息',
		frame :true,
		id :'guarantorPanel',
		items : [ {
			xtype :'fieldset',
			title :'贷款信息',
			layout :'column',
			collapsible :true,
			items : [ {
				layout :'form',
				columnWidth :.5,
				items : [ {
					xtype: 'numberfield',
			        name: 'overdueNumber',
			        width : eleWidth,
			        value:pdi.customerCredit.overdueNumber,
			        readOnly: true,
			        fieldLabel: '<span style="color:Red">*</span>当前逾期笔数',
			        allowDecimals:false,
			        anchor :'90%',
					allowBlank :false,
			        minValue: 0
				},{
			        xtype: 'hidden',
			        name: 'id',
			        value:pdi.customerCredit.id
			    },{
			        xtype: 'hidden',
			        name: 'customerId',
			        value:pdi.customer.id
			    }]
			}, {
				layout :'form',
				columnWidth :.5,
				items : [ {
					xtype: 'numberfield',
			        name: 'totalamountOverdue',
			        value:pdi.customerCredit.totalamountOverdue,
			        width : eleWidth,
			        readOnly: true,
			        fieldLabel: '<span style="color:Red">*</span>当前逾期总额',
			        anchor :'90%',
					allowBlank :false,
			        minValue: 0
				} ]
			}, {
				layout :'form',
				columnWidth :.5,
				items : [ {
					xtype: 'numberfield',
			        name: 'overduePeriod',
			        value:pdi.customerCredit.overduePeriod,
			        width : eleWidth,
			        readOnly: true,
			        fieldLabel: '<span style="color:Red">*</span>当前逾期期数',
			        anchor :'90%',
			        allowDecimals:false,
					allowBlank :false,
			        minValue: 0
				} ]
			}, {
				layout :'form',
				columnWidth :.5,
				items : [ {
					xtype: 'numberfield',
			        name: 'maxLateperiod',
			        width : eleWidth,
			        readOnly: true,
			        fieldLabel: '<span style="color:Red">*</span>连续最高逾期期数',
			        value:pdi.customerCredit.maxLateperiod,
			        anchor :'90%',
			        allowDecimals:false,
					allowBlank :false,
			        minValue: 0
				} ]
			}, {
				layout :'form',
				columnWidth :.5,
				items : [ {
					xtype: 'numberfield',
			        name: 'cumulativeOverdue',
			        value:pdi.customerCredit.cumulativeOverdue,
			        width : eleWidth,
			        readOnly: true,
			        fieldLabel: '<span style="color:Red">*</span>累计逾期次数',
			        anchor :'90%',
			        allowDecimals:false,
					allowBlank :false,
			        minValue: 0
				} ]
			} ]
		}, {
			xtype :'fieldset',
			title :'信用卡/贷款卡信息',
			layout :'column',
			collapsible :true,
			items : [ {
				layout :'form',
				columnWidth :.5,
				items : [ {
					xtype: 'numberfield',
			        name: 'maxLiabilities',
			        value:pdi.customerCredit.maxLiabilities,
			        readOnly: true,
			        fieldLabel: '<span style="color:Red">*</span>最大负债额',
			        width : eleWidth,
			        anchor :'90%',
					allowBlank :false,
			        minValue: 0
				} ]
			}, {
				layout :'form',
				columnWidth :.5,
				items : [ {
					xtype: 'numberfield',
			        name: 'notRepayment',
			        width : eleWidth,
			        readOnly: true,
			        fieldLabel: '<span style="color:Red">*</span>未按最低还款额还款次数',
			        value:pdi.customerCredit.notRepayment,
			        anchor :'90%',
			        allowDecimals:false,
					allowBlank :false,
			        minValue: 0
				} ]
			}, {
				layout :'form',
				columnWidth :.5,
				items : [ {
					xtype: 'numberfield',
			        name: 'defaultPeriod',
			        width : eleWidth,
			        readOnly: true,
			        fieldLabel: '<span style="color:Red">*</span>当前拖欠期数',
			        value:pdi.customerCredit.defaultPeriod,
			        anchor :'90%',
			        allowDecimals:false,
					allowBlank :false,
			        minValue: 0
				} ]
			} ]
		}, {
			xtype :'fieldset',
			title :'其他信息',
			layout :'column',
			collapsible :true,
			items : [ {
				layout :'form',
				columnWidth :.5,
				items : [ {
		                    xtype:          'combo',
		                    mode:           'local',
		                    triggerAction:  'all',
		                    forceSelection: true,
		                    editable:       false,
		                    width : eleWidth,
		                    anchor :'90%',
		                    readOnly: true,
		                    fieldLabel:     '有无社保',
		                    name:           'socialSecurity',
		                    value:pdi.customerCredit.socialSecurity,
		                    hiddenName:     'socialSecurity',
		                    displayField:   'name',
		                    valueField:     'value',
		                    store:          new Ext.data.JsonStore({
		                        fields : ['name', 'value'],
		                        data   : [
		                            {name : '有',   value: '1'},
		                            {name : '无',  value: '2'}
		                        ]
		                    })
                }]
			}, {
				layout :'form',
				columnWidth :.5,
				items : [ {
							xtype:          'combo',
		                    mode:           'local',
		                    triggerAction:  'all',
		                    forceSelection: true,
		                    editable:       false,
		                    width : eleWidth,
		                    anchor :'90%',
		                    readOnly: true,
		                    fieldLabel:     '公积金是否开户',
		                    name:           'fundAccount',
		                    value:pdi.customerCredit.fundAccount,
		                    hiddenName:     'fundAccount',
		                    displayField:   'name',
		                    valueField:     'value',
		                    store:          new Ext.data.JsonStore({
		                        fields : ['name', 'value'],
		                        data   : [
		                            {name : '是',   value: '1'},
		                            {name : '否',  value: '2'}
		                        ]
		                    })
				} ]
			}/*, {
				layout :'form',
				columnWidth :.5,
				items : [ {
		                    xtype:          'combo',
		                    mode:           'local',
		                    triggerAction:  'all',
		                    forceSelection: true,
		                    editable:       false,
		                    width : eleWidth,
		                    anchor :'90%',
		                    fieldLabel:     '社保状态',
		                    name:           'securityState',
		                    value:pdi.customerCredit.securityState,
		                    hiddenName:     'securityState',
		                    displayField:   'name',
		                    valueField:     'value',
		                    store:          new Ext.data.JsonStore({
		                        fields : ['name', 'value'],
		                        data   : [
		                            {name : '有5年以上稳定足额缴纳记录',   value: '1'},
		                            {name : '有3年到5年的稳定足额缴纳记录',   value: '2'},
		                            {name : '1年到3年稳定缴纳记录',   value: '3'},
		                            {name : '1年以内缴纳记录',   value: '4'}
		                        ]
		                    })
                }]
			}, {
				layout :'form',
				columnWidth :.5,
				items : [ {
							xtype:          'combo',
		                    mode:           'local',
		                    triggerAction:  'all',
		                    forceSelection: true,
		                    editable:       false,
		                    width : eleWidth,
		                    anchor :'90%',
		                    fieldLabel:     '公积金状态',
		                    name:           'fundState',
		                    value:pdi.customerCredit.fundState,
		                    hiddenName:     'fundState',
		                    displayField:   'name',
		                    valueField:     'value',
		                    store:          new Ext.data.JsonStore({
		                        fields : ['name', 'value'],
		                        data   : [
		                            {name : '有5年以上稳定足额缴纳记录',   value: '1'},
		                            {name : '有3年到5年的稳定足额缴纳记录',   value: '2'},
		                            {name : '1年到3年稳定缴纳记录',   value: '3'},
		                            {name : '1年以内缴纳记录',   value: '4'}
		                        ]
		                    })
				} ]
			}*/,{
				layout :'form',
				columnWidth :.5,
				items : [ {
					xtype :'textfield',
					width : eleWidth,
					readOnly: true,
					fieldLabel :'社保状态',
					maxLength: 5,
                    maxLengthText: '长度不大于5',
					value:pdi.customerCredit.securityState,
					anchor :'90%',
					name :'securityState'
				} ]
			}, {
				layout :'form',
				columnWidth :.5,
				items : [ {
					xtype :'textfield',
					width : eleWidth,
					readOnly: true,
					fieldLabel :'公积金状态',
					value:pdi.customerCredit.fundState,
					anchor :'90%',
					name :'fundState'
				} ]
			} ]
		} ]
	} ]
});
/*var ZXXX_Main_Panel = new Ext.Panel( {
	id :'C3',
	frame :true,
	autoScroll :true,
	items : [ZXXX_Panel ]
});*/

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
	
//	分公司核保岗查看当前页面
	if ('1'==pdi.policy.isFgshbg) {
//		禁用页面内所有组件
		var disPanel = Ext.getCmp('guarantorPanel');		
		 disXtype();
//		禁用页面内按钮
		for(var i=0;i<ZXXX_Panel.buttons.length;i++){
			var buttonItem = ZXXX_Panel.buttons[i];
			buttonItem.hide();
		}
	}
	var viewport = new Ext.Viewport({
		layout : 'fit',
		autoScroll:true,
		layoutConfig : {
			align : 'stretch',
			pack : 'start'
		},
		items : [ZXXX_Panel]
	});
	
});