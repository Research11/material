var  screenWidth =Ext.getBody().getViewSize().width-70;
if(Ext.getBody().getViewSize().width==0){
	screenWidth =690;
}
var  eleWidth =(screenWidth+70)/2*0.6;
var  columnWidth = 600;
var P_guarantor_info = new Ext.FormPanel({
	frame : true,
	title : '1.1-投保人信息',
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				distabled : true,
				readOnly: true,
				fieldLabel : '姓名',
				name : 'customer.customerName',
				width:eleWidth,anchor : '95%',
				value : CustInfo.customer.customerName
			} ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				distabled : true,
				fieldLabel : '身份证号码',
				readOnly: true,
				name : 'customer.documentCode',
				value : CustInfo.customer.documentCode,
				width:eleWidth,anchor : '95%'
			} ]
		}, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'radiogroup',
				labelWith : 100,
				columns:4,
				width:columnWidth,
				anchor : '95%',
				value:CustInfo.custPerson.maritalStatus,
				readOnly: true,
				fieldLabel : '婚姻状况',
				
				items : [ {
					boxLabel : '未婚',
					name : 'maritalStatus',
					inputValue: '1'
				}, {
					boxLabel : '已婚有子女',
					name : 'maritalStatus',
					inputValue: '2'
				}, {
					boxLabel : '已婚无子女',
					name : 'maritalStatus',
					inputValue: '3'
				}, {
					boxLabel : '其他',
					name : 'maritalStatus',
					inputValue: '6'
				} ]
			} ]
		}, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'radiogroup',
				labelWith : 100,
				 columns:5,
				width:columnWidth,
				anchor : '95%',
				value:CustInfo.custPerson.educationLevel,
				readOnly: true,
				fieldLabel : '最高学历',
				
				items : [ {
					boxLabel : '博士及以上',
					name : 'educationLevel',
					inputValue: '1'
				}, {
					boxLabel : '硕士',
					name : 'educationLevel',
					inputValue: '2'
				}, {
					boxLabel : '本科',
					name : 'educationLevel',
					inputValue: '3'
				}, {
					boxLabel : '专科',
					name : 'educationLevel',
					inputValue: '4'
				}, {
					boxLabel : '高中及以下',
					name : 'educationLevel',
					inputValue: '5'
				} ]
			} ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				readOnly: true,
				fieldLabel : '户籍地址',
				
				width:eleWidth,
				name : 'custPerson.domicilePlace',
				value:CustInfo.custPerson.domicilePlace,
				width:eleWidth,anchor : '95%'
			}, {
				xtype : 'textfield',
				readOnly: true,
				fieldLabel : '家庭住址',
				
				width:eleWidth,
				name : 'custPerson.domicilePlace',
				value:CustInfo.custPerson.domicilePlace,
				anchor : '95%'
			} ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'radiogroup',
				labelWith : 100,
				columns : 2,
				fieldLabel : '户籍状况',
				readOnly: true,
				
				width:eleWidth,
				anchor : '95%',
				value:CustInfo.custPerson.domiciliaryType,
				items : [ {
					boxLabel : '本地户籍',
					name : 'domiciliaryType',
					inputValue: '1'
				}, {
					boxLabel : '非本地户籍',
					name : 'domiciliaryType',
					inputValue: '2'
				} ]
			}, {
				xtype : 'textfield',
				fieldLabel : '家庭电话',
				readOnly: true,
				name : 'custPerson.contactTele',
				width:eleWidth,
//				anchor : '95%',
				value : CustInfo.custPerson.contactTele,
				anchor : '95%'
			} ]
		}, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'radiogroup',
				labelWith : 100,
				// columns:1,
				width:columnWidth,
				anchor : '95%',
				value : CustInfo.custPerson.healthCondition,
				fieldLabel : '健康状况',
				readOnly: true,
				items : [ {
					boxLabel : '健康',
					name : 'healthCondition',
					inputValue: '1'
				}, {
					boxLabel : '一般',
					name : 'healthCondition',
					inputValue: '2'
				}, {
					boxLabel : '较差,有病历',
					name : 'healthCondition',
					inputValue: '3'
				}]
			} ]
		} ]
	} ]
});

var P_wife_info = new Ext.FormPanel({
	frame : true,
	title : '1.2-配偶信息',
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				width:eleWidth,
				anchor : '95%',
				value : CustInfo.custSpouse.spouseName,
				fieldLabel : '姓名',
				readOnly: true,
				name : 'first'
			},{
				xtype : 'textfield',
				fieldLabel : '工作单位',
				readOnly: true,
				value : CustInfo.custSpouse.workUnit,
				name : 'workUnit',
				width:eleWidth,
				anchor : '95%'
			} ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [{
				xtype : 'textfield',
				value : CustInfo.custSpouse.idNumber,
				fieldLabel : '身份证',
				readOnly: true,
				name : 'first',
				width:eleWidth,
				anchor : '95%'
			},{
				xtype : 'textfield',
				fieldLabel : '联系电话',
				readOnly: true,
				value : CustInfo.custSpouse.telephone,
				name : 'cellPhone',
				width:eleWidth,
				anchor : '95%'
			} ]
		} ]
	} ]
});

var P_salary_info = new Ext.FormPanel({
	frame : true,
	title : '1.3-受薪人士专属信息',
	autoScroll : false,
	bodyStyle : 'padding:5px 5px 0',
	hidden:CustInfo.custPerson.personType=='2' ? false : true, 
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				value : CustInfo.custPerson.workUnit,
				fieldLabel : '工作单位',
				readOnly: true,
				name : 'custPerson.workUnit',
				width:eleWidth,
				anchor : '95%'
			} ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				value : CustInfo.custPerson.unitAddress,
				fieldLabel : '工作地址',
				readOnly: true,
				name : 'unitAddress',
				width:eleWidth,
				anchor : '95%'
			} ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ new Ext.form.ComboBox({
				name : 'customerPerson.profession',
				fieldLabel : '职业',
				readOnly: true,
				hiddenName : 'customerPerson.profession',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : profession
				}),
				anchor : '95%',
				width:eleWidth,
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.custPerson.profession
			}) ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ new Ext.form.ComboBox({
				name : 'customerPerson.position',
				fieldLabel : '职务',
				readOnly: true,
				hiddenName : 'customerPerson.position',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : position
				}),
				valueField : 'key',
				width:eleWidth,
				anchor : '95%',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.custPerson.position
			}) ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '职业从业年限',
				readOnly: true,
				name : 'workExperience',
				value : CustInfo.custPerson.workExperience,
				anchor : '90%',
				width:eleWidth,
				listeners : {
					render : function(obj) {
						var font = document.createElement("font");
						font.setAttribute("color", "black");
						var redStar = document.createTextNode('年');
						font.appendChild(redStar);
						obj.el.dom.parentNode.appendChild(font);
					}
				}
			}, new Ext.form.ComboBox({
				name : 'customerPerson.payPeriod',
				anchor : '90%',
				width:eleWidth,
				fieldLabel : '养老保险/公积金缴纳情况',
				readOnly: true,
				hiddenName : 'customerPerson.payPeriod',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : fundAccount
				}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.custPerson.payPeriodh
			}) ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '单位电话',
				readOnly: true,
				value : CustInfo.custPerson.workPhone,
				name : 'unitTell',
				width:eleWidth,
				anchor : '95%'
			} ]
		} ]
	} ]
});

var P_company_info = new Ext.FormPanel({
	frame : true,
	title : '1.4-经营企业信息',
	bodyStyle : 'padding:5px 5px 0',
	hidden:CustInfo.custPerson.personType=='1' ? false : true, 
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				value : CustInfo.custPerson.companyName,
				fieldLabel : '公司名称',
				readOnly: true,
				name : 'companyName',
				width:eleWidth,
				anchor : '95%'
			}, {
				xtype : 'textfield',
				fieldLabel : '成立时间',
				readOnly: true,
				value : CustInfo.custPerson.setTime,
				name : 'first',
				width:eleWidth,
				anchor : '95%'
			}, {
				xtype : 'textfield',
				fieldLabel : '年营业额',
				readOnly: true,
				value : CustInfo.custPerson.yearlysalary,
				name : 'yearlysalary',
				width:eleWidth,
				anchor : '95%'
			}, new Ext.form.ComboBox({
				name : 'customerPerson.businessPlace',
				fieldLabel : '是否有固定经营场所',
				readOnly: true,
				hiddenName : 'customerPerson.businessPlace',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : yesorno
				}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				anchor : '95%',
				width:eleWidth,
				value : CustInfo.custPerson.businessPlace
			}) ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '资产总额',
				readOnly: true,
				value : CustInfo.custPerson.totalAsset,
				name : 'totalAsset',
				width:eleWidth,
				anchor : '95%'
			}, /*{
				columnWidth : .33,
				layout : 'form',
				items : [ new Ext.form.ComboBox({
					name : 'insuranceType',
					fieldLabel : '所属行业',
					hiddenName : 'insuranceType',
					store : new Ext.data.SimpleStore({
						fields : [ 'key', 'value' ],
						data : industry
					}),
					valueField : 'key',
					displayField : 'value',
					mode : 'local',
					triggerAction : 'all',
					editable : false,
					selectOnFocus : true,
					width : 130
				}) ]
			},*/{
				xtype : 'textfield',
				fieldLabel : '所属行业',
				readOnly: true,
				value : CustInfo.custPerson.industry,
				name : 'industry',
				width:eleWidth,
				anchor : '95%'
			}, {
				xtype : 'textfield',
				fieldLabel : '年净利润',
				readOnly: true,
				value : CustInfo.custPerson.yearlyRent,
				name : 'yearlyRent',
				width:eleWidth,anchor : '95%'
			} ]
		} ]
	} ]
});
var P_income_info = new Ext.FormPanel({
	frame : true,
	title : '2.1-收入状况',
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '个人工资收入',
				readOnly: true,
				value : CustInfo.custPerson.annualSale,
				name : 'custPerson.annualSale',
				width:eleWidth,anchor : '95%'
			}, {
				xtype : 'textfield',
				value : CustInfo.custPerson.annualNet,
				fieldLabel : '其他年收入',
				readOnly: true,
				name : 'custPerson.annualNet',
				width:eleWidth,anchor : '95%'
			}, {
				xtype : 'textfield',
				value : CustInfo.custPerson.householdIncome,
				fieldLabel : '家庭年收入合计',
				readOnly: true,
				name : 'custPerson.householdIncome',
				width:eleWidth,anchor : '95%'
			} ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ /*{
				xtype : 'textfield',
				value : CustInfo.custPerson.annualNet,
				fieldLabel : '租赁年收入',
				name : 'custPerson.annualNet',
				width:eleWidth,anchor : '95%'
			},*/ {
				xtype : 'textfield',
				fieldLabel : '个人年收入合计',
				readOnly: true,
				value : CustInfo.custPerson.annualIncome,
				name : 'custPerson.annualIncome',
				width:eleWidth,anchor : '95%'
			}, {
				xtype : 'textfield',
				fieldLabel : '家庭人口数',
				readOnly: true,
				value : CustInfo.custPerson.familyPopulation,
				name : 'custPerson.familyPopulation',
				width:eleWidth,anchor : '95%'
			} ]
		} ]
	} ]
});

var P_other1_info = new Ext.FormPanel({
	frame : true,
	collapsible : true,
	title : '其它资产1',
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : .5,
			layout : 'form',
			//value:CustInfo.custPerson.otherassetType,
			items : [new Ext.form.ComboBox({
				name : 'houseType',
				hiddenName : 'houseType',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : otherassetType
				}),
				valueField : 'key',
				width:eleWidth,anchor : '95%',
				displayField : 'value',
				value:CustInfo.custPerson.otherassetType,
				mode : 'local',
				triggerAction : 'all'
			}), {
				xtype : 'textfield',
				fieldLabel : '其他资产估值',
				readOnly: true,
				value:CustInfo.custPerson.otherassetValue,
				name : 'first',
				width:eleWidth,anchor : '95%'
			}, {
				xtype : 'textarea',
				fieldLabel : '资产信息备注',
				readOnly: true,
				value:CustInfo.custPerson.otherassetRemark,
				name : 'first',
				width:eleWidth,anchor : '95%'
			} ]
		} ]
	} ]
});

var P_guarantor_history_info = new Ext.FormPanel({
	frame : true,
	collapsible : true,
	title : '3.1-保单历史信息',
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
                xtype: 'checkboxgroup',
                labelWith:100,
                width:columnWidth,
				anchor : '95%',
                fieldLabel: '保险种类',
                readOnly: true,
                value : CustInfo.customer.historyPtype,
                columns: 5,
                items:[
                    { boxLabel: '财产保险',inputValue:'1', name: 'customer.historyPtype'},
                    { boxLabel: '人寿保险', inputValue:'2',name: 'customer.historyPtype'},
                    { boxLabel: '机动车辆保险', inputValue:'3',name: 'customer.historyPtype'},
                    { boxLabel: '交强险', inputValue:'4',name: 'customer.historyPtype'},
                    { boxLabel: '盗抢险',inputValue:'5', name: 'customer.historyPtype'},
                    { boxLabel: '车损险', inputValue:'6',name: 'customer.historyPtype'},
                    { boxLabel: '第三者责任险', inputValue:'7',name: 'customer.historyPtype'},
                    { boxLabel: '火险', inputValue:'8',name: 'customer.historyPtype'},
                    { boxLabel: '全险', inputValue:'9',name: 'customer.historyPtype'},
                    { boxLabel: '在建工程险', inputValue:'10',name: 'customer.historyPtype'}
                ]
            }]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'radiogroup',
				labelWith : 100,
				fieldLabel : '是否老客户',
				readOnly: true,
				value:CustInfo.customer.historyCust,
				items : [ {
					boxLabel : '是',
					inputValue:'0',
					name : 'suportPower'
				}, {
					boxLabel : '否',
					inputValue:'1',
					name : 'suportPower'
				} ]
			}, {
				xtype : 'textfield',
				value:CustInfo.customer.historyPCode,
				fieldLabel : '历史投保单号码',
				readOnly: true,
				name : 'policyNo',
				width:eleWidth,anchor : '95%'
			} ]
		} ]
	} ]
});
var P_noRepayment_info = new Ext.FormPanel({
	frame : true,
	collapsible : true,
	title : '3.2-未还款信息',
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
                xtype: 'radiogroup',
                labelWith:100,
                width:columnWidth,
				anchor : '95%',
                fieldLabel: '其他未清偿借贷情况',
                readOnly: true,
                columns: 1,
                allowBlank:false,
                value : CustInfo.custPerson.noCreditInfo,
                items: [
                    { boxLabel: '存在在银行或其他借贷公司的贷款，数额足以影响其未来偿付能力', inputValue:'1',name: 'custPerson.noCreditInfo'},
                    { boxLabel: '存在在银行或其他借贷公司的贷款，数额尚不足以影响其未来偿付能力', inputValue:'2',name: 'custPerson.noCreditInfo'},
                    { boxLabel: '不存在在银行或其他借贷公司的贷款',inputValue:'3', name: 'custPerson.noCreditInfo'}
                ]
            } ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				value:CustInfo.policy.repaymentValue,
				fieldLabel : '未还款金额',
				readOnly: true,
				name : 'repaymentValue',
				anchor : '90%',
				listeners : {
					render : function(obj) {
						var font = document.createElement("font");
						font.setAttribute("color", "black");
						var redStar = document.createTextNode('元');
						font.appendChild(redStar);
						obj.el.dom.parentNode.appendChild(font);
					}
				}
			} ]
		} ]
	} ]
});
var P_insure_info = new Ext.FormPanel({
	frame : true,
	title : '4.1-保险基本信息',
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : .5,
			layout : 'form',
			anchor : '95%',
			items : [ new Ext.form.ComboBox({
				name : 'policy.insuranceType',
				fieldLabel : '险种',
				readOnly: true,
				hiddenName : 'policy.insuranceType',
				store : new Ext.data.SimpleStore({
							fields : ['key', 'value'],
							data : insuranceType
						}),
				width:eleWidth,anchor : '95%',
				valueField : 'key',
				value:CustInfo.policy.insuranceType,
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all'
			})/*{
				xtype : 'textfield',
				fieldLabel : '险种',
				value:CustInfo.policy.insuranceType,
				name : 'insuranceType',
				width:eleWidth,anchor : '95%'
			}*/, {
				xtype : 'textfield',
				value:CustInfo.policy.policyPeriod,
				fieldLabel : '期限(月)',
				readOnly: true,
				name : 'leaseTime',
				width:eleWidth,anchor : '95%'
			} ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				value:CustInfo.policy.policyValue,
				fieldLabel : '保险金额',
				readOnly: true,
				name : 'policyValue',
				width:eleWidth,anchor : '95%'
			}, {
				xtype : 'textfield',
				fieldLabel : '费率',
				readOnly: true,
				value:CustInfo.policy.policyRate,
				name : 'policyRate',
				width:eleWidth,anchor : '95%'
			} ]
		} ]
	} ]
});
var P_product_base_info = new Ext.FormPanel({
	frame : true,
	title : '车贷险专属调查信息-基本信息',
	collapsible : true,
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [{
			columnWidth : .5,
			layout : 'form',
			items : [{
				xtype : 'textfield',
				fieldLabel : '新车净价格(元)',
				readOnly: true,
				value:CustInfo.carLoan.cleanPrice,
				name : 'cleanPrice',
				width:eleWidth,anchor : '95%'
			}, {
				xtype : 'textfield',
				fieldLabel : '首付比例%',
				readOnly: true,
				value:CustInfo.carLoan.downPayment,
				name : 'downPayment',
				width:eleWidth,anchor : '95%'
			} ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [new Ext.form.ComboBox({
				name : 'carloan.firstPayment',
				fieldLabel : '首付款是否自有',
				readOnly: true,
				value:CustInfo.carLoan.firstPayment,
				hiddenName : 'carloan.firstPayment',
				store : new Ext.data.SimpleStore({
							fields : ['key', 'value'],
							data : yesorno
						}),
				width:eleWidth,anchor : '95%',
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all'
			})/* {
				xtype : 'textfield',
				value:CustInfo.carLoan.selfOwn,
				fieldLabel : '首付款是否自有',
				name : 'selfOwn',
				width:eleWidth,anchor : '95%'
			} */]
		} ]
	} ]
});

var P_product_self_info = new Ext.FormPanel({
	frame : true,
	title : '车贷险专属调查信息-自用车辆显示',
	collapsible : true,
	hidden : CustInfo.policy.mainClause == "2205103" ? false:true,
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '驾驶执照获取年限',
				readOnly: true,
				value : CustInfo.custPerson.drivingLicense,
				name : 'first',
				anchor : '92%',
				listeners : {
					render : function(obj) {
						var font = document.createElement("font");
						font.setAttribute("color", "black");
						var redStar = document.createTextNode('年');
						font.appendChild(redStar);
						obj.el.dom.parentNode.appendChild(font);
					}
				}
			} ]
		} ]
	} ]
});
//var 
var P_product_business_info = new Ext.FormPanel({
	frame : true,
	title : '车贷险专属调查信息-营业用车显示',
	hidden : CustInfo.policy.mainClause == "2205101" ||CustInfo.policy.mainClause == "2205102" ? false:true,
	collapsible : true,
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ new Ext.form.ComboBox({
				name : 'carloan.fundSource',
				value:CustInfo.carLoan.fundSource,
				fieldLabel : '主要购车资金来源',
				readOnly: true,
				width:columnWidth,
				anchor : '95%',
				hiddenName : 'carloan.fundSource',
				store : new Ext.data.SimpleStore({
							fields : ['key', 'value'],
							data : fundSource
						}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all'
			}) ]
		}/*, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '客货运驾驶执照获取年限',
				value:CustInfo.carLoan.fundSource,
				name : 'first',
				anchor : '95%',
				listeners : {
					render : function(obj) {
						var font = document.createElement("font");
						font.setAttribute("color", "black");
						var redStar = document.createTextNode('年');
						font.appendChild(redStar);
						obj.el.dom.parentNode.appendChild(font);
					}
				}
			} ]
		}, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textarea',
				fieldLabel : '备注说明',
				name : 'first',
				anchor : '95%'
			} ]
		}*/ ]
	} ]
});
var P_no_car2_info = new Ext.FormPanel({
	frame : true,
	title : '自雇人士必填信息',
	hidden:CustInfo.custPerson.personType=='1' ? false : true, 
	collapsible : true,
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [/*{
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'radiogroup',
				labelWith : 100,
				fieldLabel : '贷款用途明细',
				items : [ {
					boxLabel : '购买物料',
					name : 'useMoney'
				}, {
					boxLabel : '资金周转',
					name : 'useMoney'
				}, {
					boxLabel : '扩大生产',
					name : 'useMoney'
				}, {
					boxLabel : '其他',
					name : 'useMoney'
				} ]
			}]
		},*/{
			columnWidth : .5,
			layout : 'form',
			items : [ new Ext.form.ComboBox({
				name : 'customer.developProspect',
				fieldLabel : '经营企业发展前景',
				readOnly: true,
				hiddenName : 'customer.developProspect',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : developProspect
				}),
				width:eleWidth,anchor : '95%',
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.customer.developProspect
			})]
		},{
			columnWidth : .5,
			layout : 'form',
			items : [ new Ext.form.ComboBox({
				name : 'customer.lifeCycle',
				fieldLabel : '经营企业生命周期',
				readOnly: true,
				hiddenName : 'customer.lifeCycle',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : lifeCycle
				}),
				valueField : 'key',
				width:eleWidth,anchor : '95%',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.customer.lifeCycle
			})]
		},{
			columnWidth : .5,
			layout : 'form',
			items : [ new Ext.form.ComboBox({
				name : 'customer.coreAdvantage',
				fieldLabel : '经营企业核心优势',
				readOnly: true,
				hiddenName : 'customer.coreAdvantage',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : coreAdvantage
				}),
				width:eleWidth,anchor : '95%',
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.customer.coreAdvantage
			})]
		}]
	} ]
});
var P_no_car1_info = new Ext.FormPanel({
	frame : true,
	title : '受薪人士必填信息',
	hidden:CustInfo.custPerson.personType=='2' ? false : true, 
	collapsible : true,
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [/* {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'radiogroup',
				labelWith : 100,
				fieldLabel : '贷款用途',
				items : [ {
					boxLabel : '购物',
					name : 'suportPower'
				}, {
					boxLabel : '装修',
					name : 'suportPower'
				}, {
					boxLabel : '留学',
					name : 'suportPower'
				}, {
					boxLabel : '其它',
					name : 'suportPower'
				} ]
			} ]
		},{
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'radiogroup',
				labelWith : 100,
				fieldLabel : '是否银行VIP客户',
				items : [ {
					boxLabel : '是',
					name : 'isOld'
				}, {
					boxLabel : '否',
					name : 'isOld'
				}]
			}]
		}, */{
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '银行名称1',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			}]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '信用卡额度',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			}]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '银行名称2',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			}]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '信用卡额度',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			}]
		},{
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				width:columnWidth,
				anchor : '95%',
				fieldLabel : '所持银行信用卡额度情况',
				readOnly: true,
				name : 'first'
			}]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '银行名称1',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			}]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '信用卡额度',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			}]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '银行名称2',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			}]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '信用卡额度',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			}]
		}]
	}]
});

var P_ensure_guarantor1_info = new Ext.FormPanel({
	frame : true,
	title : '保证担保1',
	collapsible : true,
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '保证人名称',
				readOnly: true,
				name : 'guarantors',
				//value:CustInfo.collaterals.customerName,
				width:eleWidth,anchor : '95%'
			} ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ new Ext.form.ComboBox({
				name : 'customer.externalRate',
				fieldLabel : '保证人外部评级',
				readOnly: true,
				hiddenName : 'customer.externalRate',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : guarantorLevel
				}),
				valueField : 'key',
				width:eleWidth,anchor : '95%',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all'
			}) ]
		}, {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'radiogroup',
				labelWith : 100,
				columns : 1,
				width:columnWidth,
				anchor : '95%',
				fieldLabel : '保证人性质',
				readOnly: true,
				items : [ {
					boxLabel : '保证人为实力雄厚，资信记录良好的大中企业',
					name : 'suportPower'
				}, {
					boxLabel : '保证人为普通企业，实力一般，资信记录良好',
					name : 'suportPower'
				}, {
					boxLabel : '保证人为小企业，实力较差，无详细资信记录',
					name : 'suportPower'
				}, {
					boxLabel : '保证人为个人，资信记录良好',
					name : 'suportPower'
				}, {
					boxLabel : '无此种方式保证及其他情况',
					name : 'suportPower'
				} ]
			} ]
		} ]
	} ]
});

/*var P_collateral_guarantor1_info = new Ext.FormPanel({
	frame : true,
	title : '抵(质)押担保1',
	collapsible : true,
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : 1,
			layout : 'form',
			items : [ {
				xtype : 'radiogroup',
				labelWith : 100,
				columns : 3,
				fieldLabel : '保证合同覆盖情况',
				items : [ {
					boxLabel : '无条件全额保证',
					name : 'suportPower'
				}, {
					boxLabel : '覆盖率在80%以上',
					name : 'suportPower'
				}, {
					boxLabel : '覆盖率在80%以下',
					name : 'suportPower'
				}, {
					boxLabel : '无此种方式保证',
					name : 'suportPower'
				}, {
					boxLabel : '此类产品不适用保证方式',
					name : 'suportPower'
				} ]
			}, {
				xtype : 'textfield',
				fieldLabel : '抵押覆盖率',
				name : 'first',
				anchor : '50%'
			}, {
				xtype : 'radiogroup',
				labelWith : 100,
				columns : 3,
				fieldLabel : '收入稳定性',
				items : [ {
					boxLabel : '职业稳定，收入来源多样化',
					name : 'suportPower'
				}, {
					boxLabel : '职业较稳定，收入来源较单一',
					name : 'suportPower'
				}, {
					boxLabel : '职业不稳定，收入来源单一',
					name : 'suportPower'
				} ]
			}, {
				xtype : 'textarea',
				fieldLabel : '其他事项备注',
				name : 'first',
				width:eleWidth,anchor : '95%'
			}]
		} ]
	} ]
});*/
var P_guarantorState_info = new Ext.FormPanel({
	frame : true,
	title : '保单状态定性指标',
	collapsible : true,
	bodyStyle : 'padding:5px 5px 0',
	width : 690,
	items : [ {
		layout : 'column',
		items : [ {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '抵质押物类型',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			}, {
				xtype : 'textfield',
				fieldLabel : '押品权属人',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			}, {
				xtype : 'textfield',
				fieldLabel : '评估认定价值',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			} ]
		}, {
			columnWidth : .5,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '抵质押物名称',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			}, {
				xtype : 'textfield',
				fieldLabel : '所在地',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			}, {
				xtype : 'textfield',
				fieldLabel : '担保金额',
				readOnly: true,
				name : 'first',
				width:eleWidth,anchor : '95%'
			} ]
		} ]
	} ]
});
var P_all_house_info = new Ext.Panel({
	title : '2.2.1-房产',
	collapsible : true,
	width : 690,
	autoScroll : false,
	items : [ /*P_house1_info*/ ]
});
var P_all_car_info = new Ext.Panel({
	title : '2.2.2-车辆',
	collapsible : true,
	width : 690,
	autoScroll : false,
	items : [ /*P_car1_info*/ ]
});

var P_all_other_info = new Ext.Panel({
	title : '2.2.3-其他资产',
	collapsible : true,
	width : 690,
	autoScroll : false,
	items : [ /*P_other1_info*/ ]
});
var P_property_info = new Ext.Panel({
	title : '2.2-家庭财产状况',
	collapsible : true,
	width : 690,
	autoScroll : false,
	items : [ P_all_house_info, P_all_car_info, P_all_other_info ]
});
var P_carInsurance_info = new Ext.Panel({
	title : '4.2.1-车贷险专属信息',
	hidden:CustInfo.policy.insuranceType=='2205' ? false:true,
	collapsible : true,
	width : 690,
	autoScroll : false,
	items : [ P_product_base_info, P_product_self_info , P_product_business_info ]
});
var P_otherInsurance_info = new Ext.Panel({
	title : '4.2.2-非车贷险专属调查信息',
	hidden:CustInfo.policy.insuranceType=='2205' ? true:false,
	collapsible : true,
	autoScroll : false,
	width : 690,
	items : [P_no_car1_info,P_no_car2_info]
});
var P_product_info = new Ext.Panel({
	title : '4.2-产品专属调查信息',
	collapsible : true,
	autoScroll : false,
	width : 690,
	items : [P_carInsurance_info,P_otherInsurance_info]
});

var P_all_ensureGuarantor_info = new Ext.Panel({
	title : '5.1-保证担保',
	collapsible : true,
	autoScroll : false,
	width : 690,
	items : [ /*P_ensure_guarantor1_info */]
});
var P_all_collateralGuarantor_info = new Ext.Panel({
	title : '5.2-抵押担保信息',
	collapsible : true,
	autoScroll : false,
	width : 690,
	items : [ /*P_collateral_guarantor1_info */]
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
function addPanel(){
	if(CustInfo.housesObj.length>=1){
		for(var i =0;i<CustInfo.housesObj.length;i++){
			var num = i+1;
			var title = "房产"+num;
			var panelName = new Ext.FormPanel({
				frame : true,
				title : title,
				bodyStyle : 'padding:5px 5px 0',
				width : 690,
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : 1,
						layout : 'form',
						items : [ {
							xtype : 'radiogroup',
							labelWith : 100,
							columns : 3,
							width:columnWidth,
							anchor : '95%',
							fieldLabel : '房屋产权',
							readOnly: true,
							value:CustInfo.housesObj[i].houseOwner,
							items : [ {
								boxLabel : '自有无贷款',
								name : 'houseOwner',
								inputValue:'1'
							}, {
								boxLabel : '自有有贷款',
								name : 'houseOwner',
								inputValue:'2'
							}, {
								boxLabel : '农村小产权',
								name : 'houseOwner',
								inputValue:'3'
							}, {
								boxLabel : '父母或单位所有',
								name : 'houseOwner',
								inputValue:'4'
							}, {
								boxLabel : '租赁',
								name : 'houseOwner',
								inputValue:'5'
							}, {
								boxLabel : '其他',
								name : 'houseOwner',
								inputValue:'6'
							} ]
						} ]
					}, {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'radiogroup',
							labelWith : 100,
							columns : 2,
							width:eleWidth,
							anchor : '95%',
							value:CustInfo.housesObj[i].coinsuranceNum,
							fieldLabel : '是否共有产权',
							readOnly: true,
							items : [ {
								boxLabel : '是',
								name : 'coinsuranceNum'
							}, {
								boxLabel : '否',
								name : 'coinsuranceNum'
							} ]
						},{
							xtype : 'textfield',
							value:CustInfo.housesObj[i].partOwner,
							fieldLabel : '产权共有人',
							readOnly: true,
							name : 'partOwner',
							width:columnWidth,anchor : '95%'
						} ]
					}/*, {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							value:CustInfo.housesObj[i].partOwner,
							fieldLabel : '产权共有人',
							name : 'partOwner',
							width:eleWidth,anchor : '95%'
						} ]
					}*/, {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							fieldLabel : '拥有产权比例%',
							readOnly: true,
							value:CustInfo.housesObj[i].partOwner,
							name : 'partOwner',
							width:eleWidth,anchor : '95%'
						} ]
					}, {
						columnWidth : 1,
						layout : 'form',
						items : [ {
							xtype : 'radiogroup',
							labelWith : 100,
							width:columnWidth,
							anchor : '95%',
							value:CustInfo.housesObj[i].houseType,
							columns : 3,
							fieldLabel : '房屋类型',
							readOnly: true,
							items : [ {
								boxLabel : '别墅/公寓',
								name : 'houseType',
								inputValue:'1'
							}, {
								boxLabel : '5年以下普通住宅',
								name : 'houseType',
								inputValue:'2'
							}, {
								boxLabel : '使用时间15年以上的普通城市住宅,平房',
								name : 'houseType',
								inputValue:'3'
							}, {
								boxLabel : '农村自建房',
								name : 'houseType',
								inputValue:'4'
							}, {
								boxLabel : '其他',
								name : 'houseType',
								inputValue:'5'
							}, {
								boxLabel : '无住房',
								name : 'houseType',
								inputValue:'6'
							} ]
						} ]
					}, {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							fieldLabel : '房屋面积',
							readOnly: true,
							value:CustInfo.housesObj[i].area,
							name : 'area',
							width:eleWidth,anchor : '95%'
						}, {
							xtype : 'textfield',
							value:CustInfo.housesObj[i].assetValue,
							fieldLabel : '估算价值',
							readOnly: true,
							name : 'assetValue',
							width:eleWidth,anchor : '95%'
						}, {
							xtype : 'textfield',
							fieldLabel : '购置日期',
							readOnly: true,
							value:CustInfo.housesObj[i].buyDate,
							name : 'buyDate',
							width:eleWidth,anchor : '95%'
						} ]
					}, {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							fieldLabel : '房屋地址',
							readOnly: true,
							name : 'address',
							value:CustInfo.housesObj[i].address,
							width:eleWidth,anchor : '95%'
						}, {
							xtype : 'textfield',
							fieldLabel : '房产抵押情况',
							readOnly: true,
							value:CustInfo.housesObj[i].collateralState,
							name : 'collateralState',
							width:eleWidth,anchor : '95%'
						}, {
							xtype : 'radiogroup',
							labelWith : 100,
							fieldLabel : '付款情况',
							readOnly: true,
							value:CustInfo.housesObj[i].paymentState,
							items : [ {
								boxLabel : '已付清全款',
								name : 'paymentState',
								inputValue:'1'
							}, {
								boxLabel : '按揭中',
								name : 'paymentState',
								inputValue:'2'
							} ]
						} ]
					} ]
				} ]
			});
			
			P_all_house_info.add(panelName);
		}
//		P_all_house_info.doLayout();
	}else{
		var P_house_init = new Ext.FormPanel({
			frame : true,
			title : '房产1',
			bodyStyle : 'padding:5px 5px 0',
			width : 690,
			items : [ {
				layout : 'column',
				items : [ {
					columnWidth : 1,
					layout : 'form',
					items : [ {
						xtype : 'radiogroup',
						labelWith : 100,
						columns : 3,
						width:columnWidth,
						anchor : '95%',
						fieldLabel : '房屋产权',
						readOnly: true,
						items : [ {
							boxLabel : '自有无贷款',
							name : 'houseOwner',
							inputValue:'1'
						}, {
							boxLabel : '自有有贷款',
							name : 'houseOwner',
							inputValue:'2'
						}, {
							boxLabel : '农村小产权',
							name : 'houseOwner',
							inputValue:'3'
						}, {
							boxLabel : '父母或单位所有',
							name : 'houseOwner',
							inputValue:'4'
						}, {
							boxLabel : '租赁',
							name : 'houseOwner',
							inputValue:'5'
						}, {
							boxLabel : '其他',
							name : 'houseOwner',
							inputValue:'6'
						} ]
					} ]
				}, {
					columnWidth : 1,
					layout : 'form',
					items : [ {
						xtype : 'radiogroup',
						labelWith : 100,
						columns : 2,
						width:columnWidth,
						anchor : '95%',
						fieldLabel : '是否共有产权',
						readOnly: true,
						items : [ {
							boxLabel : '是',
							name : 'coinsuranceNum'
						}, {
							boxLabel : '否',
							name : 'coinsuranceNum'
						} ]
					} ]
				}, {
					columnWidth : .5,
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '产权共有人',
						readOnly: true,
						name : 'partOwner',
						width:eleWidth,anchor : '95%'
					} ]
				}, {
					columnWidth : .5,
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '拥有产权比例%',
						readOnly: true,
						name : 'partOwner',
						width:eleWidth,anchor : '95%'
					} ]
				}, {
					columnWidth : 1,
					layout : 'form',
					items : [ {
						xtype : 'radiogroup',
						labelWith : 100,
						columns : 3,
						width:columnWidth,
						anchor : '95%',
						fieldLabel : '房屋类型',
						readOnly: true,
						items : [ {
							boxLabel : '别墅/公寓',
							name : 'houseType',
							inputValue:'1'
						}, {
							boxLabel : '5年以下普通住宅',
							name : 'houseType',
							inputValue:'2'
						}, {
							boxLabel : '使用时间15年以上的普通城市住宅,平房',
							name : 'houseType',
							inputValue:'3'
						}, {
							boxLabel : '农村自建房',
							name : 'houseType',
							inputValue:'4'
						}, {
							boxLabel : '其他',
							name : 'houseType',
							inputValue:'5'
						}, {
							boxLabel : '无住房',
							name : 'houseType',
							inputValue:'6'
						} ]
					} ]
				}, {
					columnWidth : .5,
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '房屋面积',
						readOnly: true,
						name : 'area',
						width:eleWidth,anchor : '95%'
					}, {
						xtype : 'textfield',
						fieldLabel : '估算价值',
						readOnly: true,
						name : 'assetValue',
						width:eleWidth,anchor : '95%'
					}, {
						xtype : 'textfield',
						fieldLabel : '购置日期',
						readOnly: true,
						name : 'buyDate',
						width:eleWidth,anchor : '95%'
					} ]
				}, {
					columnWidth : .5,
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '房屋地址',
						readOnly: true,
						name : 'address',
						width:eleWidth,anchor : '95%'
					}, {
						xtype : 'textfield',
						fieldLabel : '房产抵押情况',
						readOnly: true,
						name : 'collateralState',
						width:eleWidth,anchor : '95%'
					}, {
						xtype : 'radiogroup',
						labelWith : 100,
						fieldLabel : '付款情况',
						readOnly: true,
						items : [ {
							boxLabel : '已付清全款',
							name : 'paymentState',
							inputValue:'1'
						}, {
							boxLabel : '按揭中',
							name : 'paymentState',
							inputValue:'2'
						} ]
					} ]
				} ]
			} ]
		});
		P_all_house_info.add(P_house_init);
	}
	P_all_house_info.doLayout();
	
	if(CustInfo.carsObj.length>=1){
		for(var j =0;j<CustInfo.housesObj.length;j++){
			var carNum = j+1;
			var carTitle = "车辆"+carNum;
			var carName = new Ext.FormPanel({
				frame : true,
				collapsible : true,
				title : carTitle,
				bodyStyle : 'padding:5px 5px 0',
				width : 690,
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : 1,
						layout : 'form',
						items : [ {
							xtype : 'radiogroup',
							labelWith : 100,
							width:columnWidth,
							anchor : '95%',
							value:CustInfo.carsObj[j].carOwner,
							fieldLabel : '车辆权属人',
							readOnly: true,
							items : [ {
								boxLabel : '自有无贷款',
								name : 'carOwner',
								inputValue:'1'
							}, {
								boxLabel : '自有有贷款',
								name : 'carOwner',
								inputValue:'2'
							}, {
								boxLabel : '租赁',
								name : 'carOwner',
								inputValue:'3'
							}, {
								boxLabel : '其他',
								name : 'carOwner',
								inputValue:'4'
							} ]
						} ]
					}, {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							value:CustInfo.carsObj[j].carModel,
							fieldLabel : '车牌品牌',
							readOnly: true,
							name : 'carModel',
							width:eleWidth,anchor : '95%'
						}, {
							xtype : 'textfield',
							value:CustInfo.carsObj[j].motorCode,
							fieldLabel : '发动机号',
							readOnly: true,
							name : 'motorCode',
							width:eleWidth,anchor : '95%'
						}, {
							xtype : 'textfield',
							fieldLabel : '购置日期',
							readOnly: true,
							value:CustInfo.carsObj[j].buyDate,
							name : 'buyDate',
							width:eleWidth,anchor : '95%'
						}, {
							xtype : 'textfield',
							fieldLabel : '车辆抵押情况',
							readOnly: true,
							value:CustInfo.carsObj[j].collateralState,
							name : 'collateralState',
							width:eleWidth,anchor : '95%'
						} ]
					}, {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							fieldLabel : '车辆型号',
							readOnly: true,
							value:CustInfo.carsObj[j].carModel,
							name : 'carModel',
							width:eleWidth,anchor : '95%'
						}, {
							xtype : 'textfield',
							fieldLabel : '车架号',
							readOnly: true,
							value:CustInfo.carsObj[j].vinCode,
							name : 'vinCode',
							width:eleWidth,anchor : '95%'
						}, {
							xtype : 'textfield',
							fieldLabel : '购买金额',
							readOnly: true,
							value:CustInfo.carsObj[j].residenceValue,
							name : 'residenceValue',
							width:eleWidth,anchor : '95%'
						} ]
					} ]
				} ]
			});
			P_all_car_info.add(carName);
	}
	}else{
		var P_carInit_info = new Ext.FormPanel({
			frame : true,
			collapsible : true,
			title : '车辆1',
			bodyStyle : 'padding:5px 5px 0',
			width : 690,
			items : [ {
				layout : 'column',
				items : [ {
					columnWidth : 1,
					layout : 'form',
					items : [ {
						xtype : 'radiogroup',
						labelWith : 100,
						width:columnWidth,
						anchor : '95%',
						fieldLabel : '车辆权属人',
						readOnly: true,
						items : [ {
							boxLabel : '自有无贷款',
							name : 'carOwner',
							inputValue:'1'
						}, {
							boxLabel : '自有有贷款',
							name : 'carOwner',
							inputValue:'2'
						}, {
							boxLabel : '租赁',
							name : 'carOwner',
							inputValue:'3'
						}, {
							boxLabel : '其他',
							name : 'carOwner',
							inputValue:'4'
						} ]
					} ]
				}, {
					columnWidth : .5,
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '车牌品牌',
						readOnly: true,
						name : 'carModel',
						width:eleWidth,anchor : '95%'
					}, {
						xtype : 'textfield',
						fieldLabel : '发动机号',
						readOnly: true,
						name : 'motorCode',
						width:eleWidth,anchor : '95%'
					}, {
						xtype : 'textfield',
						fieldLabel : '购置日期',
						readOnly: true,
						name : 'buyDate',
						width:eleWidth,anchor : '95%'
					}, {
						xtype : 'textfield',
						fieldLabel : '车辆抵押情况',
						readOnly: true,
						name : 'collateralState',
						width:eleWidth,anchor : '95%'
					} ]
				}, {
					columnWidth : .5,
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '车辆型号',
						readOnly: true,
						name : 'carModel',
						width:eleWidth,anchor : '95%'
					}, {
						xtype : 'textfield',
						fieldLabel : '车架号',
						readOnly: true,
						name : 'vinCode',
						width:eleWidth,anchor : '95%'
					}, {
						xtype : 'textfield',
						fieldLabel : '购买金额',
						readOnly: true,
						name : 'residenceValue',
						width:eleWidth,anchor : '95%'
					} ]
				} ]
			} ]
		});
		P_all_car_info.add(P_carInit_info);
	}
	P_all_car_info.doLayout();
	
	if(CustInfo.otherObj.length >=1){
		for(var k=0;k<CustInfo.otherObj.length;k++){
			var otherNum = k+1;
			var otherTitle = "其它资产信息"+otherNum;
			var otherName = new Ext.FormPanel({
				frame : true,
				collapsible : true,
				title : otherTitle,
				bodyStyle : 'padding:5px 5px 0',
				width : 690,
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : 1,
						layout : 'form',
						items : [ {
							xtype : 'radiogroup',
							labelWith : 100,
							width:columnWidth,
							anchor : '95%',
							fieldLabel : '其他资产类型',
							readOnly: true,
							value:CustInfo.otherObj[k].otherType,
							items : [ {
								boxLabel : '存款',
								name : 'otherType',
								inputValue:'1'
							}, {
								boxLabel : '股票',
								name : 'otherType',
								inputValue:'2'
							}, {
								boxLabel : '基金',
								name : 'otherType',
								inputValue:'3'
							}, {
								boxLabel : '其他金融资产',
								name : 'otherType',
								inputValue:'4'
							}, {
								boxLabel : '其他',
								name : 'otherType',
								inputValue:'5'
							} ]
						}, {
							xtype : 'textfield',
							fieldLabel : '其他资产估值',
							readOnly: true,
							value:CustInfo.otherObj[k].assetValue,
							name : 'first',
							width:eleWidth,anchor : '95%'
						}, {
							xtype : 'textarea',
							fieldLabel : '资产信息备注',
							readOnly: true,
							value:CustInfo.otherObj[k].remark,
							name : 'first',
							width:eleWidth,anchor : '95%'
						} ]
					} ]
				} ]
			});
			
			P_all_other_info.add(otherName);
		}
	}else{
		var P_other1_info = new Ext.FormPanel({
			frame : true,
			collapsible : true,
			title : '其它资产1',
			bodyStyle : 'padding:5px 5px 0',
			width : 690,
			items : [ {
				layout : 'column',
				items : [ {
					columnWidth : 1,
					layout : 'form',
					items : [ {
						xtype : 'radiogroup',
						labelWith : 100,
						width:columnWidth,
						anchor : '95%',
						fieldLabel : '其他资产类型',
						readOnly: true,
						items : [ {
							boxLabel : '存款',
							name : 'otherType'
						}, {
							boxLabel : '股票',
							name : 'otherType'
						}, {
							boxLabel : '基金',
							name : 'otherType'
						}, {
							boxLabel : '其他金融资产',
							name : 'otherType'
						}, {
							boxLabel : '其他',
							name : 'otherType'
						} ]
					}, {
						xtype : 'textfield',
						fieldLabel : '其他资产估值',
						readOnly: true,
						name : 'assetValue',
						width:eleWidth,anchor : '95%'
					}, {
						xtype : 'textarea',
						fieldLabel : '资产信息备注',
						readOnly: true,
						name : 'remark',
						width:eleWidth,anchor : '95%'
					} ]
				} ]
			} ]
		});
		
		P_all_other_info.add(P_other1_info);
	}
	P_all_other_info.doLayout();
	
//	担保人
	if(CustInfo.guarantorsObj.length >=1){
		for(var ig=0;ig<CustInfo.guarantorsObj.length;ig++){
			var guaNum = ig+1;
			var guaTitle = "保证担保"+guaNum;
			var guaName = new Ext.FormPanel({
				frame : true,
				title : guaTitle,
				collapsible : true,
				bodyStyle : 'padding:5px 5px 0',
				width : 690,
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							fieldLabel : '保证人名称',
							readOnly: true,
							name : 'guarantors',
							value:CustInfo.guarantorsObj[ig].customerName,
							width:eleWidth,anchor : '95%'
						} ]
					},{
						columnWidth : .5,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							name : 'customer.externalRate',
							fieldLabel : '保证人外部评级',
							readOnly: true,
							hiddenName : 'customer.externalRate',
							store : new Ext.data.SimpleStore({
								fields : [ 'key', 'value' ],
								data : guarantorLevel
							}),
							valueField : 'key',
							displayField : 'value',
							mode : 'local',
							triggerAction : 'all',
							value:CustInfo.guarantorsObj[ig].externalRate,
							editable : false,
							width:eleWidth,anchor : '95%'
						}) ]
					}/*, {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							value:CustInfo.guarantorsObj[ig].externalRate,
							fieldLabel : '保证人外部评级',
							name : 'first',
							width:eleWidth,anchor : '95%'
						} ]
					}*/, {
						columnWidth : 1,
						layout : 'form',
						items : [ {
							xtype : 'radiogroup',
							labelWith : 100,
							columns : 1,
							width:columnWidth,
							anchor : '95%',
							fieldLabel : '保证人性质',
							readOnly: true,
							items : [ {
								boxLabel : '保证人为实力雄厚，资信记录良好的大中企业',
								name : 'guaNature'
							}, {
								boxLabel : '保证人为普通企业，实力一般，资信记录良好',
								name : 'guaNature'
							}, {
								boxLabel : '保证人为小企业，实力较差，无详细资信记录',
								name : 'guaNature'
							}, {
								boxLabel : '保证人为个人，资信记录良好',
								name : 'guaNature'
							}, {
								boxLabel : '无此种方式保证及其他情况',
								name : 'guaNature'
							} ]
						} ]
					} ]
				} ]
			});
			P_all_ensureGuarantor_info.add(guaName);
		}
	}else{
		var P_gua_init = new Ext.FormPanel({
			frame : true,
			title : "保证担保1",
			collapsible : true,
			bodyStyle : 'padding:5px 5px 0',
			width : 690,
			items : [ {
				layout : 'column',
				items : [ {
					columnWidth : .5,
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '保证人名称',
						readOnly: true,
						name : 'customerName',
						width:eleWidth,anchor : '95%'
					} ]
				}, {
					columnWidth : .5,
					layout : 'form',
					items : [ new Ext.form.ComboBox({
						name : 'customer.externalRate',
						fieldLabel : '保证人外部评级',
						readOnly: true,
						hiddenName : 'customer.externalRate',
						store : new Ext.data.SimpleStore({
							fields : [ 'key', 'value' ],
							data : guarantorLevel
						}),
						valueField : 'key',
						displayField : 'value',
						mode : 'local',
						triggerAction : 'all',
						editable : false,
						width:eleWidth,anchor : '95%'
					}) ]
				}, {
					columnWidth : 1,
					layout : 'form',
					items : [ {
						xtype : 'radiogroup',
						labelWith : 100,
						columns : 1,
						width:columnWidth,
						anchor : '95%',
						fieldLabel : '保证人性质',
						readOnly: true,
						items : [ {
							boxLabel : '保证人为实力雄厚，资信记录良好的大中企业',
							name : 'guaNature'
						}, {
							boxLabel : '保证人为普通企业，实力一般，资信记录良好',
							name : 'guaNature'
						}, {
							boxLabel : '保证人为小企业，实力较差，无详细资信记录',
							name : 'guaNature'
						}, {
							boxLabel : '保证人为个人，资信记录良好',
							name : 'guaNature'
						}, {
							boxLabel : '无此种方式保证及其他情况',
							name : 'guaNature'
						} ]
					} ]
				} ]
			} ]
		});
		P_all_ensureGuarantor_info.add(P_gua_init);
	}
	P_all_ensureGuarantor_info.doLayout();
	
//	押品
	if(CustInfo.collateralsObj.length >=1){
		for(var ic=0;ic<CustInfo.collateralsObj.length;ic++){
			var cNum = ic+1;
			var cTitle = "抵(质)押担保"+cNum;
			var cName = new Ext.FormPanel({
				frame : true,
				title : cTitle,
				collapsible : true,
				bodyStyle : 'padding:5px 5px 0',
				width : 690,
				items : [ {
					layout : 'column',
					items : [ {
						columnWidth : .5,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							fieldLabel : '抵质押物类型',
							readOnly: true,
//							value:CustInfo.collateralsObj[ic].rootType.typeName,
							value:CustInfo.collateralsObj[ic].rootType.typeName,
							name : 'rootType',
							width:eleWidth,anchor : '95%'
							}]
					},{
						columnWidth : .5,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							fieldLabel : '抵质押名称',
							readOnly: true,
							name : 'collateralName',
							value:CustInfo.collateralsObj[ic].collateralName,
							width:eleWidth,anchor : '95%'
							}]
					},{
						columnWidth : .5,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							fieldLabel : '押品权属人',
							readOnly: true,
							value:CustInfo.collateralsObj[ic].belongBy.customerName,
							name : 'belongBy',
							width:eleWidth,anchor : '95%'
							}]
					},{
						columnWidth : .5,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							fieldLabel : '所在地',
							readOnly: true,
							value:CustInfo.collateralsObj[ic].belongBy.address,
							name : 'address',
							width:eleWidth,anchor : '95%'
							}]
					},{
						columnWidth : .5,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							fieldLabel : '评估认定价值',
							readOnly: true,
							value:CustInfo.collateralsObj[ic].collateralValue,
							name : 'originalRmb',
							width:eleWidth,anchor : '95%'
							}]
					},{
						columnWidth : .5,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							fieldLabel : '担保金额',
							readOnly: true,
							value:CustInfo.collateralsObj[ic].pledgeValue,
							name : 'pledgeValue',
							width:eleWidth,anchor : '95%'
							}]
					}]
				}]
			});
			P_all_collateralGuarantor_info.add(cName);
		}
	}else{
		var P_collateral_guarantor1_info = new Ext.FormPanel({
			frame : true,
			title : '抵(质)押担保1',
			collapsible : true,
			bodyStyle : 'padding:5px 5px 0',
			width : 690,
			items : [{
				layout : 'column',
				items : [ {
					columnWidth : .5,
					layout : 'form',
					items : [{
						xtype : 'textfield',
						fieldLabel : '抵质押物类型',
						readOnly: true,
						name : 'rootType.typeName',
						width:eleWidth,anchor : '95%'
						}]
				},{
					columnWidth : .5,
					layout : 'form',
					items : [{
						xtype : 'textfield',
						fieldLabel : '抵质押名称',
						readOnly: true,
						name : 'collateralName',
						width:eleWidth,anchor : '95%'
						}]
				 
			},{
				
					columnWidth : .5,
					layout : 'form',
					items : [{
						xtype : 'textfield',
						fieldLabel : '押品权属人',
						readOnly: true,
						name : 'belongBy',
						width:eleWidth,anchor : '95%'
						}]
				
			},{
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'textfield',
					fieldLabel : '所在地',
					readOnly: true,
					name : 'address',
					width:eleWidth,anchor : '95%'
					}]
		},{
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'textfield',
					fieldLabel : '评估认定价值',
					readOnly: true,
					name : 'originalRmb',
					width:eleWidth,anchor : '95%'
					}]
		},{
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'textfield',
					fieldLabel : '担保金额',
					readOnly: true,
					name : 'pledgeValue',
					width:eleWidth,anchor : '95%'
					}]
		} ]
			}]
		});
	
		P_all_collateralGuarantor_info.add(P_collateral_guarantor1_info);
	}
	P_all_collateralGuarantor_info.doLayout();
}
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
	addPanel();
	var viewport = new Ext.Viewport({
		layout : 'anchor',
		autoScroll:true,
		layoutConfig : {
			align : 'stretch',
			pack : 'start'
		},
		items : [{
			xtype : 'panel',
			width : 690,
			title : '1-投保人基本情况',
			autoScroll : false,
			layout : 'form',
			items : [ P_guarantor_info, P_wife_info, P_salary_info,
					P_company_info ]
		},
		{
			xtype : 'panel',
			width : 690,
			title : '2-收入资产情况',
			autoScroll : false,
			layout : 'form',
			items : [ P_income_info, P_property_info ]
		},
		{
			xtype : 'panel',
			width : 690,
			title : '3-资信信息',
			autoScroll : false,
			layout : 'form',
			items : [ P_guarantor_history_info, P_noRepayment_info ]
		},
		{
			xtype : 'panel',
			width : 690,
			title : '4-业务需求',
			autoScroll : false,
			layout : 'form',
			items : [ P_insure_info, P_product_info ]
		},
		{
			xtype : 'panel',
			width : 690,
			title : '5-保证状况',
			autoScroll : false,
			layout : 'form',
			items : [ P_all_ensureGuarantor_info,
					P_all_collateralGuarantor_info ]
		},{
			xtype : 'panel',
			width : 690,
			title : '6-调查结论',
			autoScroll : false,
			layout : 'form',
			items : [ {
				xtype : 'panel',
				width : 690,
				title : '6.1-调查信息及提供资料真实性',
				items : [ {
					xtype : 'textarea',
					width : 690,
					value:CustInfo.policy.infoTruth
				} ]
			}, {
				xtype : 'panel',
				width : 690,
				title : '6.2-调查汇总及初步意见',
				autoScroll : false,
				items : [ {
					xtype : 'htmleditor',
					value:CustInfo.policy.preliminary,
					width : 690,
					title : '6.2.1-调查汇总及初步意见'
				} ]
			} ]
		}]
	});
});