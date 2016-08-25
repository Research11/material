var  screenWidth =Ext.getBody().getViewSize().width-70;
if(Ext.getBody().getViewSize().width==0){
	screenWidth =700;
}
var  eleWidth =(screenWidth+70)/2*0.6;
var  columnWidth = 600;

var P_company_base_info = new Ext.FormPanel({
        frame:true,
        title: '1.1-企业基本信息',
        bodyStyle:'padding:5px 5px 0',
        width: 690,
        items: [{
            layout:'column',
            items:[{
                columnWidth:.5,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: '企业名称',readOnly: true,
                    readOnly: true,
                    value:CustInfo.customer.customerName,
                    width:eleWidth,
                    name: 'customerName',
                    width:eleWidth,anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: '组织机构代码',readOnly: true,
                    readOnly: true,
                    value:CustInfo.customerCompany.organizationCode,
                    name: 'organizationCode',
                    width:eleWidth,width:eleWidth,anchor:'95%'
                }]
            },{
                columnWidth:.5,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: '单位地址',readOnly: true,
                    readOnly: true,
                    name: 'CustInfo.customerCompany.registerAddress',
                    value: CustInfo.customerCompany.registerAddress,
                    width:eleWidth,width:eleWidth,anchor:'95%'
                },new Ext.form.ComboBox({
					name : 'CustInfo.customerCompany.industry',
					fieldLabel : '行业',readOnly: true,
					readOnly: true,
					hiddenName : 'CustInfo.customerCompany.industry',
					store : new Ext.data.SimpleStore({
						fields : [ 'key', 'value' ],
						data : industry
					}),
					valueField : 'key',
					displayField : 'value',
					mode : 'local',
					triggerAction : 'all',
					width:eleWidth,width:eleWidth,anchor:'95%',
					value : CustInfo.customerCompany.industry
				})]
            },{
                columnWidth:1,
                layout: 'form',
                items: [{
                    xtype: 'radiogroup',
                    labelWith:100,
                    columns:3,
                    width:columnWidth,
    				anchor : '95%',
                    fieldLabel: '企业类型',readOnly: true,
                    readOnly: true,
                    value:CustInfo.customerCompany.companyType,
                    items: [
                        { boxLabel: '上市股份有限公司', name: 'companyType',inputValue: '1'},
                        { boxLabel: '非上市股份有限公司', name: 'companyType',inputValue: '2'},
                        { boxLabel: '有限责任公司', name: 'companyType',inputValue: '3'},
                        { boxLabel: '私营合伙企业', name: 'companyType',inputValue: '4'},
                        { boxLabel: '私营独资企业', name: 'companyType',inputValue: '5' }
                    ]
                }]
            },{
                columnWidth:1,
                layout: 'form',
                items: [{
                    xtype: 'radiogroup',
//                    labelWith:100,
//                    columns:5,
                    width:columnWidth,
    				anchor : '95%',
                    value:CustInfo.customerCompany.ownerShip,
                    fieldLabel: '所有制类型',readOnly: true,
                    items: [
                        { boxLabel: '国有企业', name: 'ownerShip',inputValue: '1'},
                        { boxLabel: '三资企业', name: 'ownerShip',inputValue: '2'},
                        { boxLabel: '集体企业', name: 'ownerShip',inputValue: '3'},
                        { boxLabel: '私营企业', name: 'ownerShip',inputValue: '4'},
                        { boxLabel: '其他', name: 'ownerShip',inputValue: '5'}
                    ]
                }]
            },{
                columnWidth:.5,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: '企业成立时间',readOnly: true,
                    name: 'CustInfo.customerCompany.setTime',
                    value: CustInfo.customerCompany.setTime,
                    width:eleWidth,width:eleWidth,anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: '职工人数',readOnly: true,
                    name: 'CustInfo.customerCompany.staffNo',
                    value: CustInfo.customerCompany.staffNo,
                    width:eleWidth,width:eleWidth,anchor:'95%'
                }]
            },{
                columnWidth:.5,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: '注册资本',readOnly: true,
                    name: 'CustInfo.customerCompany.registerCapital',
                    value: CustInfo.customerCompany.registerCapital,
                    width:eleWidth,width:eleWidth,anchor:'95%'
                }]
            }]
        }]
    });
var P_company_legal_info = new Ext.FormPanel({
    frame:true,
    title: '1.2-企业法人代表信息',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '法人代表',readOnly: true,
                name: 'CustInfo.companyLagel.lagelName',
                value: CustInfo.companyLagel.customerIdName,
                width:eleWidth,width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '证件类型',readOnly: true,
                name: 'CustInfo.companyLagel.certNo',
                value:'身份证',
                width:eleWidth,width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '证件号码',readOnly: true,
                name: 'CustInfo.companyLagel.certifyNo',
                value: CustInfo.companyLagel.certifyNo,
                width:eleWidth,width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '证件有效期限',readOnly: true,
                name: 'first',
                //TODO
                value: '3',
                width:eleWidth,width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '行业从业年限',readOnly: true,
                name: 'CustInfo.companyLagel',
                width:eleWidth,width:eleWidth,anchor:'95%'
            },new Ext.form.ComboBox({
				name : 'companyLagel.personState',
				fieldLabel : '是否有效',readOnly: true,
				hiddenName : 'companyLagel.personState',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : yesorno
				}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				anchor : '95%',
				value : CustInfo.companyLagel.personState
			}),/*{
                xtype:'textfield',
                fieldLabel: '状态',
                name: 'last',
                width:eleWidth,width:eleWidth,anchor:'95%'
            },*/{
                xtype:'textfield',
                fieldLabel: '在任起始时间',readOnly: true,
                name: 'companyLagel.startDate',
                value: CustInfo.companyLagel.startDate,
                width:eleWidth,width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '在任截止时间',readOnly: true,
                name: 'companyLagel.endDate',
                value: CustInfo.companyLagel.endDate,
                width:eleWidth,anchor:'95%'
            }]
        }]
    }]
});
var P_company_related_info = new Ext.FormPanel({
    frame:true,
    title: '1.5-上下游关联企业',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                columnWidth:.5,
                layout: 'form',
                items: [{
                    xtype: 'radiogroup',
                    labelWith:100,
                    fieldLabel: '关系方类型',readOnly: true,
                    items: [
                        { boxLabel: '自然人股东', name: 'suportPower'},
                        { boxLabel: '法人股东', name: 'suportPower'}
                    ]
                },{
                    xtype:'textfield',
                    readOnly:true,
                    fieldLabel: '关系方名称',readOnly: true,
                    name: 'first',
                    width:eleWidth,anchor:'95%'
                },{
                    xtype:'textfield',
                    readOnly:true,
                    fieldLabel: '证件类型',readOnly: true,
                    name: 'first',
                    width:eleWidth,anchor:'95%'
                },{
                    xtype:'textfield',
                    readOnly:true,
                    fieldLabel: '证件号码',readOnly: true,
                    name: 'first',
                    width:eleWidth,anchor:'95%'
                },{
                    xtype:'textfield',
                    readOnly:true,
                    fieldLabel: '销售金额',readOnly: true,
                    name: 'first',
                    width:eleWidth,anchor:'95%'
                }]
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                fieldLabel: '上下游企业类型',readOnly: true,
                items: [
                    { boxLabel: '供应商', name: 'suportPower'},
                    { boxLabel: '销售商', name: 'suportPower'}
                ]
            },{
                xtype:'textfield',
                fieldLabel: '关系建立时间',readOnly: true,
                name: 'last',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '销售产品',readOnly: true,
                name: 'last',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '销售额币种',readOnly: true,
                name: 'last',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '销售比例',readOnly: true,
                name: 'last',
                width:eleWidth,anchor:'95%'
            }]
        }]
    }]
});

var P_finance_info = new Ext.FormPanel({
    frame:true,
    title: '2.1-财务信息',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '年末总资产',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '年营业收入',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '负债合计',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '资产利润率',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '资产负债率',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '流动比率',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '年初总资产',readOnly: true,
                name: 'last',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '净资产',readOnly: true,
                name: 'last',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '年净利润',readOnly: true,
                name: 'last',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '净资产利润率(ROE)',readOnly: true,
                name: 'last',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '总资产增长率',readOnly: true,
                name: 'last',
                width:eleWidth,anchor:'95%'
            }]
        }]
    }]
});

var P_keyMan_info = new Ext.FormPanel({
    frame:true,
    title: '关键人1',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '客户类型',readOnly: true,
                name: 'CustInfo.customerCompanys',
                value: CustInfo.customerCompanys.lagelName,
                width:columnWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',readOnly: true,
                fieldLabel: '客户名称',readOnly: true,
                name: 'last',
                value: CustInfo.customerCompanys.lagelName,
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '证件类型',readOnly: true,
                name: 'last',
                value:'身份证',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '证件号码',readOnly: true,
                name: 'CustInfo.customerCompanys.certifyNo',
                value: CustInfo.customerCompanys.certifyNo,
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '证件有限期限',readOnly: true,
                name: 'value: CustInfo.customerCompanys.certifyNo',
                value: CustInfo.customerCompanys.num1,
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '行业从业年限',readOnly: true,
                name: 'CustInfo.customerCompanys.workExperience',
                value:CustInfo.customerCompanys.workExperience,
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '状态',readOnly: true,
                name: 'CustInfo.customerCompanys.personState',
                value: CustInfo.customerCompanys.personState,
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '在任起始时间',readOnly: true,
                name: 'CustInfo.customerCompanys.startDate',
                value: CustInfo.customerCompanys.startDate,
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '在任截止时间',readOnly: true,
                name: 'CustInfo.customerCompanys.endDate',
                value: CustInfo.customerCompanys.endDate,
                width:eleWidth,anchor:'95%'
            }]
        }]
    }]
});
var P_sharholder_info = new Ext.FormPanel({
    frame:true,
    collapsible:true,
    title: '大股东1',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '股东证号',readOnly: true,
                name: 'CustInfo.shareholders.stockNo',
                value: CustInfo.shareholders.stockNo,
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '股东类型',readOnly: true,
                name: 'CustInfo.shareholders.stockType',
                value: CustInfo.shareholders.stockType,
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '股东名称',readOnly: true,
                name: 'CustInfo.shareholders.customerName',
                value: CustInfo.shareholders.lagelName,
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '股东证件类型',readOnly: true,
                name: 'certifyName',
                value:'身份证',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '股东证件号码',readOnly: true,
                name: 'CustInfo.shareholders.Number',
                value: CustInfo.shareholders.certifyNo,
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '出资方式',readOnly: true,
                name: 'CustInfo.shareholders.contributionWay',
                value: CustInfo.shareholders.contributionWay,
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '出资占比',readOnly: true,
                name: 'CustInfo.shareholders.contribution',
                value: CustInfo.shareholders.contribution,
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '增资时间',readOnly: true,
                name: 'CustInfo.shareholders.replenishmentDate',
                value: CustInfo.shareholders.replenishmentDate,
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '增资金额',readOnly: true,
                name: 'CustInfo.shareholders.replenishmentValue',
                value: CustInfo.shareholders.replenishmentValue,
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '累计增资金额',readOnly: true,
                name: 'CustInfo.shareholders.cumulativeAmount',
                value: CustInfo.shareholders.cumulativeAmount,
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '累计增次数',readOnly: true,
                name: 'CustInfo.shareholders.cumulativeNo',
                value: CustInfo.shareholders.cumulativeNo,
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                columns:2,
                width:columnWidth,
				anchor : '95%',
                fieldLabel: '股东背景/股东性质',readOnly: true,
                items: [
                    { boxLabel: '股东属全国范围大型绩优企业', name: 'suportPower'},
                    { boxLabel: '大股东实力较强，居省级行政区前列', name: 'suportPower'},
                    { boxLabel: '大股东业绩值得怀疑或财务实力较差', name: 'suportPower'},
                    { boxLabel: '其他金融资产', name: 'suportPower'},
                    { boxLabel: '其他', name: 'suportPower'}
                ]
            }]
        }]
    }]
});
var P_total_info = new Ext.FormPanel({
    frame:true,
    collapsible:true,
    title: '总体情况',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].reportPeriod :0,
                fieldLabel: '最新财报期次',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [new Ext.form.ComboBox({
			name : 'auditCertificate',
			hiddenName : 'auditCertificate',
			fieldLabel: '审计机构资质',readOnly: true,
			value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].auditCertificate :0,
			store : new Ext.data.SimpleStore({
				fields : [ 'key', 'value' ],
				data : auditCertificate
			}),
			valueField : 'key',
			displayField : 'value',
			mode : 'local',
			width:eleWidth,anchor:'95%',
			triggerAction : 'all'
		})]
        },{
            columnWidth:1,
            layout: 'form',
            items: [new Ext.form.ComboBox({
				name : 'auditOpinion',
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].auditOpinion :0,
                fieldLabel:"审计意见",readOnly: true,
				hiddenName : 'auditOpinion',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : auditOpinion
				}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				width:columnWidth, 
				anchor : '95%'
			})]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '资产合计',readOnly: true,
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].totalassets :0,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '负债合计',readOnly: true,
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].totalliabilities :0,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '年初营业收入',readOnly: true,
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].busiincome:0,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '利润总额用',readOnly: true,
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].totalprofits:0,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '主营业务收入',readOnly: true,
                value: CustInfo.businessFinance.length>0 ?CustInfo.businessFinance[0].mainbusireve:0,
                name: 'mainbusireve',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '流动资产',readOnly: true,
                value: CustInfo.businessFinance.length>0 ?CustInfo.businessFinance[0].currentassets:0,
                name: 'currentassets',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '存货',readOnly: true,
                value:CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].inventory:0,
                name: 'inventory',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].payfeeinfo:0,
                fieldLabel: '应收账款',readOnly: true,
                name: 'payfeeinfo',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '销售成本',readOnly: true,
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].costsales:0,
                name: 'costsales',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '息税前利润',readOnly: true,
                name: 'ebit',
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].ebit:0,
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '净资产',readOnly: true,
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].totalequity:0,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '年净利润',readOnly: true,
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].annualincome:0,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '营业利润',readOnly: true,
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].operatingprofit:0,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '销售收入',readOnly: true,
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].salesrevenue:0,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                value: CustInfo.businessFinance.length>0 ? CustInfo.businessFinance[0].ncffoa:0,
                fieldLabel: '经营活动现金流量净额',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                value:CustInfo.businessFinance.length>0 ?  CustInfo.businessFinance[0].currentliabilities:0,
                fieldLabel: '流动负债',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                value: CustInfo.businessFinance.length>0 ?  CustInfo.businessFinance[0].repaidexpenses:0,
                fieldLabel: '待摊费用',readOnly: true,
                name: 'repaidexpenses',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                value: CustInfo.businessFinance.length>0 ?  CustInfo.businessFinance[0].salesrevenue:0,
                fieldLabel: '销售收入净额',readOnly: true,
                name: 'salesrevenue',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                value: CustInfo.businessFinance.length>0 ?  CustInfo.businessFinance[0].inventory:0,
                readOnly:true,
                fieldLabel: '存货',readOnly: true,
                name: 'inventory',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                value:CustInfo.businessFinance.length>0 ?   CustInfo.businessFinance[0].financialexenses:0,
                readOnly:true,
                fieldLabel: '财务费用',readOnly: true,
                name: 'financialexenses',
                width:eleWidth,anchor:'95%'
            }]
        }]
    }]
});

var P_payAbility_info = new Ext.FormPanel({
    frame:true,
    collapsible:true,
    title: '偿债能力',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                value: CustInfo.zbReport.totalliabilitiesRise,
                readOnly:true,
                fieldLabel: '资产负债率',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                value: CustInfo.zbReport.guaranteeRise,
                readOnly:true,
                fieldLabel: '利息保障倍数',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        }]
    }]
});

var P_profyAbility_info = new Ext.FormPanel({
    frame:true,
    collapsible:true,
    title: '盈利能力',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                value: CustInfo.zbReport.ROA,
                readOnly:true,
                fieldLabel: 'ROA',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                value: CustInfo.zbReport.salesrevenueRise,
                fieldLabel: '销售净利率',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                value: CustInfo.zbReport.ROE,
                fieldLabel: 'ROE',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '主营业务利润率',readOnly: true,
                value: CustInfo.zbReport.getBusiincomeRise,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        }]
    }]
});
var P_mobility_info = new Ext.FormPanel({
    frame:true,
    collapsible:true,
    title: '流动性',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                value: CustInfo.zbReport.currentassetsRise,
                readOnly:true,
                fieldLabel: '流动比率',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '现金流量比率',readOnly: true,
                value: CustInfo.zbReport.operatingRise,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                value: CustInfo.zbReport.speedRise,
                fieldLabel: '速动比率',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        }]
    }]
});
var P_serviceAbility_info = new Ext.FormPanel({
    frame:true,
    collapsible:true,
    title: '营运能力',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                value: CustInfo.zbReport.totalTurnOver,
                fieldLabel: '总资产周转率',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                value: CustInfo.zbReport.currentassetsTurnOver,
                fieldLabel: '流动资产周转率',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '存货周转率',readOnly: true,
                value: CustInfo.zbReport.stockTurnOver,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                value: CustInfo.zbReport.debtRise,
                fieldLabel: '应收账款周转率',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        }]
    }]
});

var P_growAbility_info = new Ext.FormPanel({
    frame:true,
    collapsible:true,
    title: '成长能力',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '总资产增长率',readOnly: true,
                value: CustInfo.zbReport.totalRise,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '总收入增长率',readOnly: true,
                value: CustInfo.zbReport.totalIncomeRise,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        }]
    }]
});
var P_guarantor_history_info = new Ext.FormPanel({
    frame:true,
    collapsible:true,
    title: '3.1-保单历史信息',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'checkboxgroup',
                labelWith:100,
                fieldLabel: '保险种类',readOnly: true,
                width:columnWidth,
				anchor : '95%',
                value:CustInfo.customer.historyPtype,
                columns: 5,
                items: [
                    { boxLabel: '财产保险',inputValue:'1', name: 'customer.historyPtype'},
                    { boxLabel: '人寿保险',inputValue:'2', name: 'customer.historyPtype'},
                    { boxLabel: '机动车辆保险',inputValue:'3', name: 'customer.historyPtype'},
                    { boxLabel: '交强险',inputValue:'4', name: 'customer.historyPtype'},
                    { boxLabel: '盗抢险',inputValue:'5', name: 'customer.historyPtype'},
                    { boxLabel: '车损险',inputValue:'6', name: 'customer.historyPtype'},
                    { boxLabel: '第三者责任险',inputValue:'7', name: 'customer.historyPtype'},
                    { boxLabel: '火险',inputValue:'8', name: 'customer.historyPtype'},
                    { boxLabel: '全险',inputValue:'9', name: 'customer.historyPtype'},
                    { boxLabel: '在建工程险',inputValue:'10', name: 'customer.historyPtype'}
                ]
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                value : CustInfo.customer.historyCust,
                fieldLabel: '是否老客户',readOnly: true,
                items: [
                    { boxLabel: '是', inputValue:'1',name: 'suportPower'},
                    { boxLabel: '否', inputValue:'2',name: 'suportPower'}
                ]
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                value:CustInfo.customer.historyPCode,
                fieldLabel: '历史投保单号码',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        }]
    }]
});


var P_noRepayment_info = new Ext.FormPanel({
    frame:true,
    collapsible:true,
    title: '3.2-未还款信息',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                fieldLabel: '其他未清偿借贷情况',readOnly: true,
                columns: 1,
                width:columnWidth,
				anchor : '95%',
                value : CustInfo.customerCompany.noCreditInfo,
                items: [
						{ boxLabel: '存在在银行或其他借贷公司的贷款，数额足以影响其未来偿付能力', inputValue:'1',name: 'customerCompany.noCreditInfo'},
						{ boxLabel: '存在在银行或其他借贷公司的贷款，数额尚不足以影响其未来偿付能力', inputValue:'2',name: 'customerCompany.noCreditInfo'},
						{ boxLabel: '不存在在银行或其他借贷公司的贷款',inputValue:'3', name: 'customerCompany.noCreditInfo'}
                   
                ]
            },{
                xtype: 'radiogroup',
                labelWith:100,
                fieldLabel: '是否有负面事件',readOnly: true,
                columns: 1,
                anchor:'90%',
                value:CustInfo.customer.repayAbility,
                items: [
                    { boxLabel: '企业三年内无重大不利事件发生', inputValue:'1',name: 'customer.repayAbility'},
                    { boxLabel: '企业三年内发生过至少一次重大不利事件（欺诈、严重起诉、管理人员入狱、恶意收购、会计不合规、行政处罚等）',inputValue:'2', name: 'customer.repayAbility'}
                ]
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
					xtype:'numberfield',
					fieldLabel:'未偿还贷款(元)',readOnly: true,
					value:CustInfo.policy.repaymentValue,
					width:eleWidth,
					anchor : '95%',
					name:'policy.repaymentValue'			
				}]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                value:CustInfo.customer.externalAmount,
                fieldLabel: '当前对外担保额',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype:'textarea',
                readOnly:true,
                value:CustInfo.customer.repayAbilityremark,
                fieldLabel: '重大不利事件说明',readOnly: true,
                name: 'first',
                width:columnWidth,
				anchor : '95%'
            }]
        }]
    }]
});
var P_insure_info = new Ext.FormPanel({
    frame:true,
    title: '4.1-保险基本信息',
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [new Ext.form.ComboBox({
				name : 'policy.insuranceType',
				fieldLabel : '险种',readOnly: true,
				hiddenName : 'policy.insuranceType',
				allowBlank : false,
				store : new Ext.data.SimpleStore({
							fields : ['key', 'value'],
							data : insuranceType
						}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.policy.insuranceType,
                width:eleWidth,anchor:'95%'
			})/*{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '险种',
                name: 'first',
                width:eleWidth,anchor:'95%'
            }*/,{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '期限',readOnly: true,
                value : CustInfo.policy.policyPeriod,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '保险金额',readOnly: true,
                value : CustInfo.policy.policyValue,
                name: 'last',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '费率',readOnly: true,
                value : CustInfo.policy.policyRate,
                name: 'last',
                width:eleWidth,anchor:'95%'
            }]
        }]
    }]
});

var P_product_noCar_info = new Ext.FormPanel({
    frame:true,
    title: '非车贷险专属调查信息',
    collapsible:true,
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [new Ext.form.ComboBox({
				name : 'policy.creditUse',
				fieldLabel : '贷款用途 ',readOnly: true,
				hiddenName : 'policy.creditUse',
				store : new Ext.data.SimpleStore({
							fields : ['key', 'value'],
							data : creditUse
						}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.policy.creditUse,
                width:eleWidth,anchor:'95%'
			}),new Ext.form.ComboBox({
				name : 'customer.coreAdvantage',
				fieldLabel : '企业核心优势',readOnly: true,
				hiddenName : 'customer.coreAdvantage',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : coreAdvantage
				}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.customer.coreAdvantage,
                width:eleWidth,anchor:'95%'
			})]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [new Ext.form.ComboBox({
				name : 'customer.developProspect',
				fieldLabel : '企业发展前景',readOnly: true,
				hiddenName : 'customer.developProspect',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : developProspect
				}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.customer.developProspect,
                width:eleWidth,anchor:'95%'
			}),new Ext.form.ComboBox({
				name : 'customer.lifeCycle',
				fieldLabel : '企业生命周期',readOnly: true,
				hiddenName : 'customer.lifeCycle',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : lifeCycle
				}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.customer.lifeCycle,
                width:eleWidth,anchor:'95%'
			})]
        }]
    }]
});

/*var P_product_self_info = new Ext.FormPanel({
    frame:true,
    title: '4.2.1-车贷险专属调查信息-自用车辆显示',
    collapsible:true,
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '驾驶执照获取年限',
                value : CustInfo.custPerson.drivingLicense,
                name: 'first',
                width:eleWidth,anchor:'95%',
                listeners : {  
                    render : function(obj) {  
                        var font = document.createElement("font");  
                        font.setAttribute("color","black");  
                        var redStar = document.createTextNode('年');  
                        font.appendChild(redStar);  
                        obj.el.dom.parentNode.appendChild(font);  
                    }  
                }
            }]
        }]
    }]
});*/

var P_product_business_info = new Ext.FormPanel({
    frame:true,
    title: '4.2.2-车贷险专属调查信息-营业用车必输信息',
    collapsible:true,
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [new Ext.form.ComboBox({
				name : 'carloan.lineStability',
				fieldLabel : '线路稳定性 ',readOnly: true,
				hiddenName : 'carloan.lineStability',
				store : new Ext.data.SimpleStore({
							fields : ['key', 'value'],
							data : lineStability
						}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.carLoan.lineStability,
				width:eleWidth,anchor:'95%'
			})]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '客货运经营年限',readOnly: true,
                value : CustInfo.carLoan.runAge,
                name: 'runAge',
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '首付比例(%)',readOnly: true,
                value : CustInfo.carLoan.downPayment,
                name: 'downPayment',
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '清偿时间',readOnly: true,
                value : CustInfo.carLoan.payOffLong,
                name: 'payOffLong',
                width:eleWidth,anchor:'95%'
            }]
        }/*,{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype:'textarea',
                readOnly:true,
                fieldLabel: '备注说明',
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        }*/]
    }]
});


var P_ensure_guarantor1_info = new Ext.FormPanel({
    frame:true,
    title: '保证担保1',
    collapsible:true,
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '保证人名称',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        },{
			columnWidth : .5,
			layout : 'form',
			items : [ new Ext.form.ComboBox({
				name : 'customer.externalRate',
				fieldLabel : '保证人外部评级',readOnly: true,
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
				selectOnFocus : true,
                width:eleWidth,anchor:'95%'
			}) ]
		},{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                columns:1,
                fieldLabel: '保证人性质',readOnly: true,
                width:columnWidth,
				anchor : '95%',
                items: [
                    { boxLabel: '保证人为实力雄厚，资信记录良好的大中企业', name: 'suportPower'},
                    { boxLabel: '保证人为普通企业，实力一般，资信记录良好', name: 'suportPower'},
                    { boxLabel: '保证人为小企业，实力较差，无详细资信记录', name: 'suportPower'},
                    { boxLabel: '保证人为个人，资信记录良好', name: 'suportPower'},
                    { boxLabel: '无此种方式保证及其他情况', name: 'suportPower'}
                ]
            }]
        }]
    }]
});


var P_guarantorState_info = new Ext.FormPanel({
    frame:true,
    title: '担保状态定性指标',
    collapsible:true,
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                columns:3,
                width:columnWidth,
				anchor : '95%',
                value:CustInfo.policy.coverage,
                fieldLabel: '保证合同覆盖情况',readOnly: true,
                items: [
                    { boxLabel: '无条件全额保证', inputValue:'1',name: 'suportPower'},
                    { boxLabel: '覆盖率在80%以上',inputValue:'2', name: 'suportPower'},
                    { boxLabel: '覆盖率在80%以下', inputValue:'3',name: 'suportPower'},
                    { boxLabel: '无此种方式保证',inputValue:'4', name: 'suportPower'},
                    { boxLabel: '此类产品不适用保证方式',inputValue:'5', name: 'suportPower'}
                ]
            },{
                xtype:'textfield',
                readOnly:true,
                value:CustInfo.policy.collateralCoverage,
                fieldLabel: '抵押覆盖率(%)',readOnly: true,
//                style:'background:#E6E6E6',
                name: 'first',
                anchor:'50%'
            }]
        }]
    }]
});
var P_collateral_guarantor1_info = new Ext.FormPanel({
    frame:true,
    title: '抵质押担保1',
    collapsible:true,
    bodyStyle:'padding:5px 5px 0',
    width: 690,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '抵质押物类型',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '押品权属人',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '评估认定价值',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '抵质押物名称',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '所在地',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '担保金额',readOnly: true,
                name: 'first',
                width:eleWidth,anchor:'95%'
            }]
        }]
    }]
});
var P_all_keyMan_info = new Ext.Panel({
    title: '1.3-关键人信息',
    collapsible:true,
    width:690,
    items:[/*P_keyMan_info*/]
});
var P_all_sharholder_info = new Ext.Panel({
    title: '1.4-股东信息',
    collapsible:true,
    width:690,
    items:[/*P_sharholder_info*/]
});

var P_all_otherCompany_info = new Ext.Panel({
    title: '1.5-上下游关联企业',
    collapsible:true,
    width:690,
    items:[/*P_related_info*/]
});
var P_property_info = new Ext.Panel({
    title: '2.1-财报及审计信息',
    collapsible:true,
    width:690,
    items:[P_total_info,P_payAbility_info,P_profyAbility_info,P_mobility_info,P_serviceAbility_info,P_growAbility_info]
});
var P_product_info = new Ext.Panel({
    title: '4.2-产品专属调查信息',
    collapsible:true,
    width:690,
    items:[/*P_product_self_info,*/P_product_business_info,P_product_noCar_info]
});
var P_all_ensureGuarantor_info = new Ext.Panel({
    title: '5.1-保证担保',
    collapsible:true,
    width:690,
    items:[/*P_ensure_guarantor1_info*/]
});
var P_all_collateralGuarantor_info = new Ext.Panel({
    title: '5.2-抵押担保',
    collapsible:true,
    width:690,
    items:[/*P_collateral_guarantor1_info*/]
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
//	上下游关联企业
	if(CustInfo.companyRelats.length >=1){
		for(var q=0;q<CustInfo.companyRelats.length;q++){
			var companyNum = q+1;
			var companyTitle = "关联企业-"+companyNum;
			var P_companyRelated_info = new Ext.FormPanel({
			    frame:true,
			    title: companyTitle,
			    bodyStyle:'padding:5px 5px 0',
			    width: 690,
			    items: [{
			        layout:'column',
			        items:[{
			            columnWidth:.5,
			            layout: 'form',
			            items: [{
			                columnWidth:.5,
			                layout: 'form',
			                items: [{
			                    xtype: 'radiogroup',
			                    labelWith:100,
			                    fieldLabel: '关系方类型',readOnly: true,
			                    value:CustInfo.companyRelats[q].relatType,
			                    items: [
			                        { boxLabel: '自然人股东', inputValue:'1',name: 'relatType'},
			                        { boxLabel: '法人股东',inputValue:'2', name: 'relatType'}
			                    ]
			                },{
			                    xtype:'textfield',
			                    readOnly:true,
			                    fieldLabel: '关系方名称',readOnly: true,
			                    value:CustInfo.companyRelats[q].pcustomerIdName,
			                    name: 'first',
			                    width:eleWidth,anchor:'95%'
			                },{
			                    xtype:'textfield',
			                    readOnly:true,
			                    fieldLabel: '证件类型',readOnly: true,
			                    value:'组织机构号码',
			                    name: 'first',
			                    width:eleWidth,anchor:'95%'
			                },{
			                    xtype:'textfield',
			                    readOnly:true,
			                    fieldLabel: '证件号码',readOnly: true,
			                    value:CustInfo.companyRelats[q].pDocumentCode,
			                    name: 'first',
			                    width:eleWidth,anchor:'95%'
			                },{
			                    xtype:'textfield',
			                    readOnly:true,
			                    value:CustInfo.companyRelats[q].supplyValue,
			                    fieldLabel: '销售金额',readOnly: true,
			                    name: 'first',
			                    width:eleWidth,anchor:'95%'
			                }]
			            }]
			        },{
			            columnWidth:.5,
			            layout: 'form',
			            items: [{
			                xtype: 'radiogroup',
			                labelWith:100,
			                fieldLabel: '上下游企业类型',readOnly: true,
			                value:CustInfo.companyRelats[q].pcustomerType,
			                items: [
			                    { boxLabel: '供应商',inputValue:'1', name: 'pcustomerType'},
			                    { boxLabel: '销售商',inputValue:'2', name: 'pcustomerType'}
			                ]
			            },{
			                xtype:'textfield',
			                fieldLabel: '关系建立时间',readOnly: true,
			                value:CustInfo.companyRelats[q].relatDate,
			                name: 'last',
			                width:eleWidth,anchor:'95%'
			            },{
			                xtype:'textfield',
			                fieldLabel: '销售产品',readOnly: true,
			                value:CustInfo.companyRelats[q].supplyProduct,
			                name: 'last',
			                width:eleWidth,anchor:'95%'
			            },new Ext.form.ComboBox({
							name : 'supplyCurrency',
							hiddenName : 'supplyCurrency',
							fieldLabel: '销售额币种',readOnly: true,
							value:CustInfo.companyRelats[q].supplyCurrency,
							store : new Ext.data.SimpleStore({
								fields : [ 'key', 'value' ],
								data : ccyKey
							}),
							valueField : 'key',
							displayField : 'value',
							readOnly:true,
							mode : 'local',
							triggerAction : 'all',
			                width:eleWidth,anchor:'95%'
						})/*{
			                xtype:'textfield',
			                fieldLabel: '销售额币种',
			                value:CustInfo.companyRelats[q].supplyProduct,
			                name: 'last',
			                width:eleWidth,anchor:'95%'
			            }*/,{
			                xtype:'textfield',
			                fieldLabel: '销售比例',readOnly: true,
			                value:CustInfo.companyRelats[q].supplyRate,
			                name: 'last',
			                width:eleWidth,anchor:'95%'
			            }]
			        }]
			    }]
			});
			P_all_otherCompany_info.add(P_companyRelated_info);
		}
	}else{
		var P_company_related_Init = new Ext.FormPanel({
		    frame:true,
		    title: '1.5-上下游关联企业',
		    bodyStyle:'padding:5px 5px 0',
		    width: 690,
		    items: [{
		        layout:'column',
		        items:[{
		            columnWidth:.5,
		            layout: 'form',
		            items: [{
		                columnWidth:.5,
		                layout: 'form',
		                items: [{
		                    xtype: 'radiogroup',
		                    labelWith:100,
		                    fieldLabel: '关系方类型',readOnly: true,
		                    items: [
		                        { boxLabel: '自然人股东', name: 'suportPower'},
		                        { boxLabel: '法人股东', name: 'suportPower'}
		                    ]
		                },{
		                    xtype:'textfield',
		                    readOnly:true,
		                    fieldLabel: '关系方名称',readOnly: true,
		                    name: 'first',
		                    width:eleWidth,anchor:'95%'
		                },{
		                    xtype:'textfield',
		                    readOnly:true,
		                    fieldLabel: '证件类型',readOnly: true,
		                    name: 'first',
		                    width:eleWidth,anchor:'95%'
		                },{
		                    xtype:'textfield',
		                    readOnly:true,
		                    fieldLabel: '证件号码',readOnly: true,
		                    name: 'first',
		                    width:eleWidth,anchor:'95%'
		                },{
		                    xtype:'textfield',
		                    readOnly:true,
		                    fieldLabel: '销售金额',readOnly: true,
		                    name: 'first',
		                    width:eleWidth,anchor:'95%'
		                }]
		            }]
		        },{
		            columnWidth:.5,
		            layout: 'form',
		            items: [{
		                xtype: 'radiogroup',
		                labelWith:100,
		                fieldLabel: '上下游企业类型',readOnly: true,
		                items: [
		                    { boxLabel: '供应商', name: 'suportPower'},
		                    { boxLabel: '销售商', name: 'suportPower'}
		                ]
		            },{
		                xtype:'textfield',
		                fieldLabel: '关系建立时间',readOnly: true,
		                name: 'last',
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '销售产品',readOnly: true,
		                name: 'last',
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '销售额币种',readOnly: true,
		                name: 'last',
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '销售比例',readOnly: true,
		                name: 'last',
		                width:eleWidth,anchor:'95%'
		            }]
		        }]
		    }]
		});
		
		P_all_otherCompany_info.add(P_company_related_Init);
	}
	P_all_otherCompany_info.doLayout();
//	股东
	if(CustInfo.companyShareHold.length >=1){
		for(var w=0;w<CustInfo.companyShareHold.length;w++){
			var sharHoldNum = w+1;
			var sharHoldTitle = "股东-"+sharHoldNum;
			
			var P_sharHolder_Info = new Ext.FormPanel({
				frame:true,
				collapsible:true,
				title: sharHoldTitle,
				bodyStyle:'padding:5px 5px 0',
				width: 690,
				items: [{
					layout:'column',
					items:[{
						columnWidth:.5,
						layout: 'form',
						items: [{
							xtype:'textfield',
							readOnly:true,
							fieldLabel: '股东证号',readOnly: true,
							name: 'CustInfo.shareholders.stockNo',
							value: CustInfo.companyShareHold[w].stockNo,
							width:eleWidth,anchor:'95%'
						},new Ext.form.ComboBox({
							name : 'stockType',
							hiddenName : 'stockType',
							store : new Ext.data.SimpleStore({
								fields : [ 'key', 'value' ],
								data : stockType
							}),
							valueField : 'key',
							fieldLabel: '股东类型',readOnly: true,
							value: CustInfo.companyShareHold[w].stockType,
							displayField : 'value',
							mode : 'local',
							triggerAction : 'all',
							width:eleWidth,anchor:'95%'
						})/*{
							xtype:'textfield',
							readOnly:true,
							fieldLabel: '股东类型',
							name: 'CustInfo.shareholders.stockType',
							value: CustInfo.companyShareHold[w].stockType,
							width:eleWidth,anchor:'95%'
						}*/,{
							xtype:'textfield',
							readOnly:true,
							fieldLabel: '股东名称',readOnly: true,
							name: 'CustInfo.shareholders.customerName',
							value: CustInfo.companyShareHold[w].customerIdName,
							width:eleWidth,anchor:'95%'
						},{
							xtype:'textfield',
							fieldLabel: '股东证件类型',readOnly: true,
							name: 'certifyName',
							value:'身份证',
							width:eleWidth,anchor:'95%'
						},{
							xtype:'textfield',
							fieldLabel: '股东证件号码',readOnly: true,
							name: 'CustInfo.shareholders.Number',
							value: CustInfo.companyShareHold[w].idNumber,
							width:eleWidth,anchor:'95%'
						},{
							xtype: 'textfield',
							labelWith:100,
//							columns:2,
							value: CustInfo.companyShareHold[w].shareholderBackground,
							fieldLabel: '股东背景/性质',readOnly: true,
							width:eleWidth,anchor:'95%'/*,
							items: [
							        { boxLabel: '股东属全国范围大型绩优企业', name: 'suportPower'},
							        { boxLabel: '大股东实力较强，居省级行政区前列', name: 'suportPower'},
							        { boxLabel: '大股东业绩值得怀疑或财务实力较差', name: 'suportPower'},
							        { boxLabel: '其他金融资产', name: 'suportPower'},
							        { boxLabel: '其他', name: 'suportPower'}
							        ]*/
						}]
					},{
						columnWidth:.5,
						layout: 'form',
						items: [{
							xtype:'textfield',
							fieldLabel: '出资方式',readOnly: true,
							name: 'CustInfo.shareholders.contributionWay',
							value: CustInfo.companyShareHold[w].contributionWay,
							width:eleWidth,anchor:'95%'
						},{
							xtype:'textfield',
							fieldLabel: '出资占比',readOnly: true,
							name: 'CustInfo.shareholders.contribution',
							value: CustInfo.companyShareHold[w].contribution,
							width:eleWidth,anchor:'95%'
						},{
							xtype:'textfield',
							fieldLabel: '增资时间',readOnly: true,
							name: 'CustInfo.shareholders.replenishmentDate',
							value: CustInfo.companyShareHold[w].replenishmentDate,
							width:eleWidth,anchor:'95%'
						},{
							xtype:'textfield',
							fieldLabel: '增资金额',readOnly: true,
							name: 'CustInfo.shareholders.replenishmentValue',
							value: CustInfo.companyShareHold[w].replenishmentValue,
							width:eleWidth,anchor:'95%'
						},{
							xtype:'textfield',
							fieldLabel: '累计增资金额',readOnly: true,
							name: 'CustInfo.shareholders.cumulativeAmount',
							value: CustInfo.companyShareHold[w].cumulativeAmount,
							width:eleWidth,anchor:'95%'
						},{
							xtype:'textfield',
							fieldLabel: '累计增次数',readOnly: true,
							name: 'CustInfo.shareholders.cumulativeNo',
							value: CustInfo.companyShareHold[w].cumulativeNo,
							width:eleWidth,anchor:'95%'
						}]
					}/*,{
						columnWidth:.5,
						layout: 'form',
						items: [{
							xtype: 'textfield',
							labelWith:100,
//							columns:2,
							value: CustInfo.companyShareHold[w].shareholderBackground,
							fieldLabel: '股东背景/性质',
							items: [
							        { boxLabel: '股东属全国范围大型绩优企业', name: 'suportPower'},
							        { boxLabel: '大股东实力较强，居省级行政区前列', name: 'suportPower'},
							        { boxLabel: '大股东业绩值得怀疑或财务实力较差', name: 'suportPower'},
							        { boxLabel: '其他金融资产', name: 'suportPower'},
							        { boxLabel: '其他', name: 'suportPower'}
							        ]
						}]
					}*/]
				}]
			});
			P_all_sharholder_info.add(P_sharHolder_Info);
		}
	}else{
		var P_sharholder_Init = new Ext.FormPanel({
		    frame:true,
		    collapsible:true,
		    title: '大股东1',
		    bodyStyle:'padding:5px 5px 0',
		    width: 690,
		    items: [{
		        layout:'column',
		        items:[{
		            columnWidth:.5,
		            layout: 'form',
		            items: [{
		                xtype:'textfield',
		                readOnly:true,
		                fieldLabel: '股东证号',readOnly: true,
		                name: 'CustInfo.shareholders.stockNo',
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                readOnly:true,
		                fieldLabel: '股东类型',readOnly: true,
		                name: 'CustInfo.shareholders.stockType',
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                readOnly:true,
		                fieldLabel: '股东名称',readOnly: true,
		                name: 'CustInfo.shareholders.customerName',
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '股东证件类型',readOnly: true,
		                name: 'certifyName',
		                value:'身份证',
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '股东证件号码',readOnly: true,
		                name: 'CustInfo.shareholders.Number',
		                width:eleWidth,anchor:'95%'
		            }]
		        },{
		            columnWidth:.5,
		            layout: 'form',
		            items: [{
		                xtype:'textfield',
		                fieldLabel: '出资方式',readOnly: true,
		                name: 'CustInfo.shareholders.contributionWay',
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '出资占比',readOnly: true,
		                name: 'CustInfo.shareholders.contribution',
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '增资时间',readOnly: true,
		                name: 'CustInfo.shareholders.replenishmentDate',
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '增资金额',readOnly: true,
		                name: 'CustInfo.shareholders.replenishmentValue',
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '累计增资金额',readOnly: true,
		                name: 'CustInfo.shareholders.cumulativeAmount',
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '累计增次数',readOnly: true,
		                name: 'CustInfo.shareholders.cumulativeNo',
		                width:eleWidth,anchor:'95%'
		            }]
		        },{
		            columnWidth:1,
		            layout: 'form',
		            items: [{
		                xtype: 'textfield',
		                labelWith:100,
//		                columns:2,
		                width:eleWidth,
						anchor : '95%',readOnly: true,
		                fieldLabel: '股东背景/股东性质'/*,
		                items: [
		                    { boxLabel: '股东属全国范围大型绩优企业', name: 'suportPower'},
		                    { boxLabel: '大股东实力较强，居省级行政区前列', name: 'suportPower'},
		                    { boxLabel: '大股东业绩值得怀疑或财务实力较差', name: 'suportPower'},
		                    { boxLabel: '其他金融资产', name: 'suportPower'},
		                    { boxLabel: '其他', name: 'suportPower'}
		                ]*/
		            }]
		        }]
		    }]
		});
		P_all_sharholder_info.add(P_sharholder_Init);
	}
	P_all_sharholder_info.doLayout();
//	关键人
	if(CustInfo.companyCustFun.length >=1){
		
		for(var r=0;r<CustInfo.companyCustFun.length;r++){
			var keyManNum = r+1;
			var keyManTitle = "关键人-"+keyManNum;
			
			var P_keyMan_Info = new Ext.FormPanel({
				frame:true,
				title: keyManTitle,
				bodyStyle:'padding:5px 5px 0',
				width: 690,
				items: [{
					layout:'column',
					items:[/*{
						columnWidth:.5,
						layout: 'form',
						items: [{
							xtype:'textfield',
							fieldLabel: '客户类型',
							name: 'CustInfo.customerCompanys',
							value: CustInfo.companyCustFun[r].lagelName,
							width:eleWidth,anchor:'95%'
						}]
					},*/{
						columnWidth:.5,
						layout: 'form',
						items: [new Ext.form.ComboBox({
							name : 'personType',
							hiddenName : 'personType',
							fieldLabel: '人员类型',readOnly: true,
							value: CustInfo.companyCustFun[r].personType,
							store : new Ext.data.SimpleStore({
								fields : [ 'key', 'value' ],
								data : relatPersonType
							}),
							valueField : 'key',
							displayField : 'value',
							mode : 'local',
							triggerAction : 'all',
							width:eleWidth,anchor:'95%'
						}),{
							xtype:'textfield',
							fieldLabel: '客户名称',readOnly: true,
							name: 'last',
							value: CustInfo.companyCustFun[r].customerIdName,
							width:eleWidth,anchor:'95%'
						},{
							xtype:'textfield',
							fieldLabel: '证件类型',readOnly: true,
							name: 'last',
							value:'身份证',
							width:eleWidth,anchor:'95%'
						},{
							xtype:'textfield',
							fieldLabel: '在任起始时间',readOnly: true,
							name: 'CustInfo.customerCompanys.startDate',
							value: CustInfo.companyCustFun[r].startDate,
							width:eleWidth,anchor:'95%'
						}/*,{
							xtype:'textfield',
							fieldLabel: '证件有限期限',
							name: 'value: CustInfo.customerCompanys.certifyNo',
							width:eleWidth,anchor:'95%'
						}*/]
					},{
						columnWidth:.5,
						layout: 'form',
						items: [{
							xtype:'textfield',
							fieldLabel: '行业从业年限(年)',readOnly: true,
							name: 'CustInfo.customerCompanys.workExperience',
							value:CustInfo.companyCustFun[r].workExperience,
							width:eleWidth,anchor:'95%'
						},new Ext.form.ComboBox({
							name : 'reportState',
							fieldLabel: '是否有效',readOnly: true,
							hiddenName : 'reportState',
							value:CustInfo.companyCustFun[r].personState,
							store : new Ext.data.SimpleStore({
								fields : [ 'key', 'value' ],
								data : yesorno
							}),
							valueField : 'key',
							displayField : 'value',
							mode : 'local',
							triggerAction : 'all',
							width:eleWidth,anchor:'95%'
						})/*{
							xtype:'textfield',
							fieldLabel: '是否有效',
							name: 'CustInfo.customerCompanys.personState',
							value: CustInfo.companyCustFun[r].personState,
							width:eleWidth,anchor:'95%'
						}*/,{
							xtype:'textfield',
							fieldLabel: '证件号码',readOnly: true,
							name: 'CustInfo.customerCompanys.idNumber',
							value: CustInfo.companyCustFun[r].idNumber,
							width:eleWidth,anchor:'95%'
						},{
							xtype:'textfield',
							fieldLabel: '在任截止时间',readOnly: true,
							name: 'CustInfo.customerCompanys.endDate',
							value: CustInfo.companyCustFun[r].endDate,
							width:eleWidth,anchor:'95%'
						}]
					}]
				}]
			});
			
			P_all_keyMan_info.add(P_keyMan_Info);
		}
	}else{
		var P_keyMan_Init = new Ext.FormPanel({
		    frame:true,
		    title: '关键人1',
		    bodyStyle:'padding:5px 5px 0',
		    width: 690,
		    items: [{
		        layout:'column',
		        items:[/*{
		            columnWidth:.5,
		            layout: 'form',
		            items: [{
		                xtype:'textfield',
		                fieldLabel: '客户类型',
		                width:eleWidth,
						anchor : '95%',
		                name: 'CustInfo.customerCompanys'
		            }]
		        },*/{
		            columnWidth:.5,
		            layout: 'form',
		            items: [new Ext.form.ComboBox({
						name : 'personType',
						hiddenName : 'personType',
						fieldLabel: '人员类型',readOnly: true,
						store : new Ext.data.SimpleStore({
							fields : [ 'key', 'value' ],
							data : relatPersonType
						}),
						valueField : 'key',
						displayField : 'value',
						mode : 'local',
						triggerAction : 'all',
						width:eleWidth,anchor:'95%'
					}),{
		                xtype:'textfield',
		                fieldLabel: '客户名称',readOnly: true,
		                name: 'last',
//		                value: CustInfo.customerCompanys.lagelName,
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '证件类型',readOnly: true,
		                name: 'last',
		                value:'身份证',
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '证件号码',readOnly: true,
		                name: 'CustInfo.customerCompanys.certifyNo',
//		                value: CustInfo.customerCompanys.certifyNo,
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '证件有限期限',readOnly: true,
		                name: 'value: CustInfo.customerCompanys.certifyNo',
//		                value: CustInfo.customerCompanys.num1,
		                width:eleWidth,anchor:'95%'
		            }]
		        },{
		            columnWidth:.5,
		            layout: 'form',
		            items: [{
		                xtype:'textfield',
		                fieldLabel: '行业从业年限',readOnly: true,
		                name: 'CustInfo.customerCompanys.workExperience',
//		                value:CustInfo.customerCompanys.workExperience,
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '状态',
		                name: 'CustInfo.customerCompanys.personState',
//		                value: CustInfo.customerCompanys.personState,
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '在任起始时间',readOnly: true,
		                name: 'CustInfo.customerCompanys.startDate',
//		                value: CustInfo.customerCompanys.startDate,
		                width:eleWidth,anchor:'95%'
		            },{
		                xtype:'textfield',
		                fieldLabel: '在任截止时间',readOnly: true,
		                name: 'CustInfo.customerCompanys.endDate',
//		                value: CustInfo.customerCompanys.endDate,
		                width:eleWidth,anchor:'95%'
		            }]
		        }]
		    }]
		});
		P_all_keyMan_info.add(P_keyMan_Init);
	}
	P_all_keyMan_info.doLayout();
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
							fieldLabel : '保证人名称',readOnly: true,
							name : 'guarantors',
							value:CustInfo.guarantorsObj[ig].customerName,
							width:eleWidth,anchor : '95%'
						} ]
					},{
						columnWidth : .5,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							name : 'customer.externalRate',
							fieldLabel : '保证人外部评级',readOnly: true,
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
							selectOnFocus : true,
							width:eleWidth,anchor : '95%'
						}) ]
					},/* {
						columnWidth : .5,
						layout : 'form',
						items : [ {
							xtype : 'textfield',
							value:CustInfo.guarantorsObj[ig].externalRate,
							fieldLabel : '保证人外部评级',
							name : 'first',
							anchor : '95%'
						} ]
					}, */{
						columnWidth : 1,
						layout : 'form',
						items : [ new Ext.form.ComboBox({
							name : 'customer.humanNature',
							fieldLabel : '作为担保人性质',readOnly: true,
							hiddenName : 'customer.humanNature',
							store : new Ext.data.SimpleStore({
								fields : [ 'key', 'value' ],
								data : humanNature
							}),
							valueField : 'key',
							displayField : 'value',
							mode : 'local',
							triggerAction : 'all',
							value : CustInfo.guarantorsObj[ig].humanNature,
							width:columnWidth,anchor : '95%'
						})/*{
							xtype : 'radiogroup',
							labelWith : 100,
							columns : 1,
							fieldLabel : '保证人性质',
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
						}*/ ]
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
						fieldLabel : '保证人名称',readOnly: true,
						name : 'customerName',
						anchor : '95%'
					} ]
				}, {
					columnWidth : .5,
					layout : 'form',
					items : [ new Ext.form.ComboBox({
						name : 'customer.externalRate',
						fieldLabel : '保证人外部评级',readOnly: true,
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
						selectOnFocus : true,
						width:eleWidth,anchor : '95%'
					}) ]
				}, {
					columnWidth : 1,
					layout : 'form',
					items : [ {
						xtype : 'radiogroup',
						labelWith : 100,
						columns : 1,
						fieldLabel : '保证人性质',readOnly: true,
						width:columnWidth,anchor : '95%',
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
							fieldLabel : '抵质押物类型',readOnly: true,
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
							fieldLabel : '抵质押名称',readOnly: true,
							name : 'collateralName',
							value:CustInfo.collateralsObj[ic].collateralName,
							width:eleWidth,anchor : '95%'
							}]
					},{
						columnWidth : .5,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							fieldLabel : '押品权属人',readOnly: true,
							value:CustInfo.collateralsObj[ic].belongBy.customerName,
							name : 'belongBy',
							width:eleWidth,anchor : '95%'
							}]
					},{
						columnWidth : .5,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							fieldLabel : '所在地',readOnly: true,
							value:CustInfo.collateralsObj[ic].belongBy.address,
							name : 'address',
							width:eleWidth,anchor : '95%'
							}]
					},{
						columnWidth : .5,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							fieldLabel : '价值',readOnly: true,
							value:CustInfo.collateralsObj[ic].collateralValue,
							name : 'originalRmb',
							width:eleWidth,anchor : '95%'
							}]
					},{
						columnWidth : .5,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							fieldLabel : '担保金额',readOnly: true,
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
						fieldLabel : '抵质押物类型',readOnly: true,
						name : 'rootType.typeName',
						anchor : '95%'
						}]
				},{
					columnWidth : .5,
					layout : 'form',
					items : [{
						xtype : 'textfield',
						fieldLabel : '抵质押名称',readOnly: true,
						name : 'collateralName',
						anchor : '95%'
						}]
				 
			},{
				
					columnWidth : .5,
					layout : 'form',
					items : [{
						xtype : 'textfield',
						fieldLabel : '押品权属人',readOnly: true,
						name : 'belongBy',
						anchor : '95%'
						}]
				
			},{
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'textfield',
					fieldLabel : '所在地',readOnly: true,
					name : 'address',
					anchor : '95%'
					}]
		},{
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'textfield',
					fieldLabel : '评估认定价值',readOnly: true,
					name : 'originalRmb',
					anchor : '95%'
					}]
		},{
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'textfield',
					fieldLabel : '担保金额',readOnly: true,
					name : 'pledgeValue',
					anchor : '95%'
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
      	  xtype:'panel',
    	  width:690,
    	  title:'1-企业基本信息',
    	  autoScroll: false,
    	  layout:'form',
    	  items: [P_company_base_info,P_company_legal_info,P_all_keyMan_info,P_all_sharholder_info,P_all_otherCompany_info]
      },{
    	  xtype:'panel',
    	  width:690,
    	  title:'2-财务状况',
    	  autoScroll: false,
    	  layout:'form',
    	  items: [/*P_finance_info,*/P_property_info]
      },{
    	  xtype:'panel',
    	  width:690,
    	  title:'3-资信信息',
    	  autoScroll: false,
    	  layout:'form',
    	  items: [P_guarantor_history_info,P_noRepayment_info]
      },{
    	  xtype:'panel',
    	  width:690,
    	  title:'4-业务需求',
    	  autoScroll: false,
    	  layout:'form',
    	  items: [P_insure_info,P_product_info]
      },{
    	  xtype:'panel',
    	  width:690,
    	  title:'5-保证状况',
    	  autoScroll: false,
    	  layout:'form',
    	  items: [P_all_ensureGuarantor_info,P_all_collateralGuarantor_info,P_guarantorState_info]
      },{
    	  xtype:'panel',
    	  width:690,
    	  title:'6-人工判断及其他备注信息',
    	  autoScroll: false,
    	  frame:true,
    	  layout:'form',
    	  items: [new Ext.form.ComboBox({
				name : 'customerCompany.shareholderSupport',
				fieldLabel : '大股东支持力度',readOnly: true,
				hiddenName : 'customerCompany.shareholderSupport',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : shareholderSupport
				}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.customerCompany.shareholderSupport,
				anchor:'90%'
			}),new Ext.form.ComboBox({
				name : 'customerCompany.financeAbility',
				fieldLabel : '外部融资能力',readOnly: true,
				hiddenName : 'customerCompany.financeAbility',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : financeAbility
				}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.customerCompany.financeAbility,
	            anchor:'90%'
			}),new Ext.form.ComboBox({
				name : 'customerCompany.marketStatus',
				fieldLabel : '市场地位',readOnly: true,
				hiddenName : 'customerCompany.marketStatus',
				store : new Ext.data.SimpleStore({
					fields : [ 'key', 'value' ],
					data : marketStatus
				}),
				valueField : 'key',
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				value : CustInfo.customerCompany.marketStatus,
	            anchor:'90%'
			}),{
              xtype:'textfield',
              fieldLabel: '过去3年高管层变动次数',readOnly: true,
              value : CustInfo.customerCompany.changeTime,
              name: 'first',
              anchor:'50%'
          }]
      },{
    	  xtype:'panel',
    	  width:690,
    	  title:'7-调查结论',
    	  autoScroll: false,
    	  layout:'form',
    	  items: [{
        	xtype:'panel',
        	frame:true,
        	title:'7.1-调查信息及提供资料真实性',
        	items:[{
        		xtype:'textarea',
        		width:690,
				value:CustInfo.policy.infoTruth
        	}]
        },{
        	xtype:'panel',
        	frame:true,
        	title:'7.2-调查汇总及初步意见',
        	items:[{
		        xtype:'htmleditor',
		        value:CustInfo.policy.preliminary,
		        width:690
		        }]
        }]
      }]
	});
});