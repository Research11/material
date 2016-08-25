var ZXDC_Panel = new Ext.form.FormPanel({
	frame : true,
	autoScroll: true,
	buttonAlign : 'center',
	/*buttons: [{
        text: '保存',
        handler: function() {
			var form = ZXDC_Panel;
			if (form.getForm().isValid()) {
				var data = Ext.util.JSON.encode(form.getForm().getValues(false));
				form.getForm().submit({
					method : "POST",
					url : "houseSurveyInfo_save.action",
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
							form.reset();
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
			}
			
		}},{
        text: '评分',
        handler: function() {
			Ext.Ajax.request({
				url : 'modelCalculation.action',
				params : {
					id : CustInfo.policy.id
				},
				method : "POST",
				success : function(response, opts) {
					var data = Ext.decode(response.responseText);
					Ext.MessageBox.alert(data.msg);
				},
				failure : function(response, opts) {
					Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
				}
			});
		}}
	],*/
    items: [{ xtype:'panel',
        title: '资信调查',
        frame : true,
        items:[{
	        xtype:'fieldset',
	        title: '农户基本信息',
	        layout:'column', 
	        items :[{
                	layout:'form',
                	columnWidth:.5,
					items:[{
							xtype:'textfield',
							fieldLabel:'姓名',readOnly: true,
							disabled:true,
							allowBlank :false,
							anchor:'90%',
							name : 'customer.customerName',
		    				value : CustInfo.customer.customerName						
							},{
						        xtype: 'hidden',
						        name: 'policy.id',
						        value : CustInfo.policy.id
						    },{
						        xtype: 'hidden',
						        name: 'policy.policyHolder',
						        value : CustInfo.policy.policyHolder
						    }]
                },{
                	layout:'form',
                	columnWidth:.5,
					items:[{
							xtype:'textfield',
							anchor:'90%',
							fieldLabel:'身份证号码',readOnly: true,
							disabled:true,
							allowBlank :false,
							name : 'customer.documentCode',
							value : CustInfo.customer.documentCode					
							}]
                }]
	    },{
	        xtype:'fieldset',
	        title: '农户基本信息',
	        layout:'column', 
	        items :[{
            	layout:'form',
				columnWidth:.5,
				items:[{
                    xtype: 'radiogroup',
                    labelWith:100,
                    fieldLabel: '是否有不良记录',readOnly: true,
                    columns: 2,
                    allowBlank :false,
                    items: [
                        { boxLabel: '有', name: 'custPerson.badness'},
                        { boxLabel: '没有', name: 'custPerson.badness'}
                    ]
                }]
            },{
                	layout:'form',
                	columnWidth:.5,
					items:[{
							xtype:'textfield',
							fieldLabel:'具体说明',readOnly: true,
							allowBlank :false,
							name:'custPerson.badSpecify'								
							}]
                },{
                	layout:'form',
                	columnWidth:.5,
					items:[{
							xtype:'textfield',
							fieldLabel:'储蓄额',readOnly: true,
							allowBlank :false,
							name:'custPerson.saving'							
							}]
                },{
                	layout:'form',
                	columnWidth:.5,
					items:[{
							xtype:'textfield',
							fieldLabel:'负债额',readOnly: true,
							allowBlank :false,
							name:'custPerson.liabilities'								
							}]
                },{
                	layout:'form',
                	columnWidth:.5,
					items:[{
							xtype:'textfield',
							fieldLabel:'名下财产估值',readOnly: true,
							allowBlank :false,
							name:'custPerson.otherassetValue'								
							}]
                },{
                	layout:'form',
    				columnWidth:1,
    				items:[{
                        xtype: 'radiogroup',
                        labelWith:100,
                        fieldLabel: '投保情况',readOnly: true,
                        columns: 3,
                        allowBlank :false,
                        items: [
                            { boxLabel: '农业保险', name: 'custPerson.insurance'},
                            { boxLabel: '养老保险', name: 'custPerson.insurance'},
                            { boxLabel: '其他', name: 'custPerson.insurance'}
                        ]
                    }]
                },{
                	layout:'form',
                	columnWidth:1,
					items:[{
							xtype:'textfield',
							fieldLabel:'居住村庄情况',readOnly: true,
							anchor:'90%',
							value : CustInfo.custPerson.villageCredit,
							allowBlank :false,
							name:'custPerson.villageCredit'
							}]
                }]
	    },{
	        xtype:'fieldset',
	        title: '种植养殖大户专属信息',
	        layout:'column', 
	        items :[{
                	layout:'form',
                	columnWidth:.5,
					items:[{
							xtype:'textfield',
							fieldLabel:'面积',readOnly: true,
							disabled:true,
							value : CustInfo.custPerson.gardenArea,
							allowBlank :false,
							name:'custPerson.gardenArea'								
							}]
                },{
                	layout:'form',
                	columnWidth:.5,
					items:[{
							xtype:'textfield',
							fieldLabel:'年产值',readOnly: true,
							disabled:true,
							value : CustInfo.custPerson.gardenAnnualvalue,
							allowBlank :false,
							name:'custPerson.gardenAnnualvalue'
							}]
                },{
                	layout:'form',
                	columnWidth:.5,
					items:[{
							xtype:'textfield',
							fieldLabel:'园主年收入',readOnly: true,
							disabled:true,
							value : CustInfo.custPerson.gardenAnnualincome,
							allowBlank :false,
							name:'custPerson.gardenAnnualincome'								
							}]
                },{
                	layout:'form',
                	columnWidth:.5,
					items:[{
							xtype:'textfield',
							fieldLabel:'雇佣人数',readOnly: true,
							disabled:true,
							value : CustInfo.custPerson.employeeCount,
							allowBlank :false,
							name:'custPerson.employeeCount'			
							}]
                }]
	    },{
		        	xtype:'form',
		        	title:'人行资信记录',
		        	allowBlank :false,
		        	items:[{
		        		xtype:'textarea',
		        		hideLabel : true,
		        		name:'custPerson.personCreditLog',
		        		width:850
		        	}]
		        },{
		        	xtype:'form',
		        	title:'实地调查信用状况',
		        	allowBlank :false,
		        	items:[{
		        		xtype:'textarea',
		        		hideLabel : true,
		        		name:'policy.infoTruth',
		        		width:850
		        	}]
		        },{
		        	xtype:'form',
		        	title:'综合调查结果及意见',
		        	items:[{
				        xtype:'htmleditor',
				        hideLabel : true,
				        name:'policy.preliminary',
//				        width:850,
				        title: '调查汇总及初步意见'
				        }]
		        }]
    }]
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
		layout : 'anchor',
		autoScroll:true,
		layoutConfig : {
			align : 'stretch',
			pack : 'start'
		},
		items : [ZXDC_Panel]
	});
});