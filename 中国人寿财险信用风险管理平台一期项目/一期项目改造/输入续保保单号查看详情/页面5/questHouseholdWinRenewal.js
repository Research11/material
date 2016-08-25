var P_guarantor_info = new Ext.FormPanel({
        frame:true,
        title: '1.1-投保人信息',
        bodyStyle:'padding:5px 5px 0',
        width: 750,
        items: [{
            layout:'column',
            items:[{
                columnWidth:.5,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    readOnly:true,
                    fieldLabel: '姓名',
                    name : 'CustInfo.customer.customerName',
    				value : CustInfo.customer.customerName,
                    anchor:'95%'
                }]
            },{
                columnWidth:.5,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: '身份证号码',readOnly: true,
                    name : 'CustInfo.customer.documentCode',
    				value : CustInfo.customer.documentCode,
                    anchor:'95%'
                }]
            },{
                columnWidth:1,
                layout: 'form',
                items: [{
                    xtype: 'radiogroup',
                    labelWith:100,
//                    columns:4,
                    fieldLabel: '婚姻状况',readOnly: true,
                    items: [
                        { boxLabel: '未婚', name: 'suportPower'},
                        { boxLabel: '已婚有子女', name: 'suportPower'},
                        { boxLabel: '已婚无子女', name: 'suportPower'},
                        { boxLabel: '其他', name: 'suportPower'}
                    ]
                }]
            },{
                columnWidth:1,
                layout: 'form',
                items: [{
                    xtype: 'radiogroup',
                    labelWith:100,
//                    columns:5,
                    fieldLabel: '最高学历',readOnly: true,
                    items: [
                        { boxLabel: '博士及以上', name: 'suportPower'},
                        { boxLabel: '硕士', name: 'suportPower'},
                        { boxLabel: '本科', name: 'suportPower'},
                        { boxLabel: '专科', name: 'suportPower'},
                        { boxLabel: '高中及以下', name: 'suportPower'}
                    ]
                }]
            },{
                columnWidth:.5,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: '户籍地址',readOnly: true,
                    name: 'first',
                    anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: '家庭住址',readOnly: true,
                    name: 'first',
                    anchor:'95%'
                }]
            },{
                columnWidth:.5,
                layout: 'form',
                items: [{
                    xtype: 'radiogroup',
                    labelWith:100,
                    columns:2,
                    fieldLabel: '户籍状况',readOnly: true,
                    items: [
                        { boxLabel: '本地户籍', name: 'suportPower'},
                        { boxLabel: '非本地户籍', name: 'suportPower'}
                    ]
                },{
                    xtype:'textfield',
                    fieldLabel: '家庭电话',readOnly: true,
                    name: 'last',
                    anchor:'95%'
                }]
            },{
                columnWidth:1,
                layout: 'form',
                items: [{
                    xtype: 'radiogroup',
                    labelWith:100,
//                    columns:1,
                    fieldLabel: '健康状况',readOnly: true,
                    items: [
                        { boxLabel: '健康', name: 'suportPower'},
                        { boxLabel: '一般', name: 'suportPower'},
                        { boxLabel: '较差', name: 'suportPower'},
                        { boxLabel: '有病历', name: 'suportPower'}
                    ]
                }]
            }]
        }]
    });

var P_wife_info = new Ext.FormPanel({
    frame:true,
    title: '1.2-配偶信息',
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '姓名',readOnly: true,
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '身份证',readOnly: true,
                name: 'first',
                anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '工作单位',readOnly: true,
                name: 'last',
                anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '联系电话',readOnly: true,
                name: 'last',
                anchor:'95%'
            }]
        }]
    }]
});

var P_salary_info = new Ext.FormPanel({
    frame:true,
    title: '1.3-受薪人士专属信息',
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '工作单位',readOnly: true,
                name: 'first',
                anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '工作地址',readOnly: true,
                name: 'last',
                anchor:'95%'
            }]
        },{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                columns:2,
                fieldLabel: '职业',readOnly: true,
                items: [
                    { boxLabel: '各类专业技术人员', name: 'suportPower'},
                    { boxLabel: '国家机关党群组织企事业单位负责人', name: 'suportPower'},
                    { boxLabel: '办事人员和有关人员', name: 'suportPower'},
                    { boxLabel: '商业工作人员', name: 'suportPower'},
                    { boxLabel: '服务性人员', name: 'suportPower'},
                    { boxLabel: '农林牧鱼劳动者', name: 'suportPower'},
                    { boxLabel: '生产工作运输工作和部分体力劳动者', name: 'suportPower'},
                    { boxLabel: '不便分类的其他劳动者', name: 'suportPower'}
                ]
            }]
        },{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                fieldLabel: '职务',readOnly: true,
                items: [
                    { boxLabel: '高级领导', name: 'suportPower'},
                    { boxLabel: '中级领导', name: 'suportPower'},
                    { boxLabel: '一般员工', name: 'suportPower'},
                    { boxLabel: '其他', name: 'suportPower'},
                    { boxLabel: '未知', name: 'suportPower'}
                ]
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '职业从业年限',readOnly: true,
                name: 'last',
                anchor:'95%',
                listeners : {  
                    render : function(obj) {  
                        var font = document.createElement("font");  
                        font.setAttribute("color","black");  
                        var redStar = document.createTextNode('年');  
                        font.appendChild(redStar);  
                        obj.el.dom.parentNode.appendChild(font);  
                    }  
                } 
            },{
                xtype:'textfield',
                fieldLabel: '养老保险,公积金缴纳历史',readOnly: true,
                name: 'last',
                anchor:'95%',
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
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '单位电话',readOnly: true,
                name: 'last',
                anchor:'95%'
            }]
        }]
    }]
});

var P_company_info = new Ext.FormPanel({
    frame:true,
    title: '1.4-经营企业信息',
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '公司名称',readOnly: true,
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '成立时间',readOnly: true,
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '年营业额',readOnly: true,
                name: 'first',
                anchor:'95%'
            },{
                xtype: 'radiogroup',
                labelWith:100,
                fieldLabel: '是否有固定经营场所',readOnly: true,
                items: [
                    { boxLabel: '是', name: 'suportPower'},
                    { boxLabel: '否', name: 'suportPower'}
                ]
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '资产总额',readOnly: true,
                name: 'last',
                anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '所属行业',readOnly: true,
                name: 'last',
                anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '年净利润',readOnly: true,
                name: 'last',
                anchor:'95%'
            }]
        }]
    }]
});
var P_income_info = new Ext.FormPanel({
    frame:true,
    title: '2.1-收入状况',
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '个人工资收入',readOnly: true,
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '其他年收入',readOnly: true,
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '家庭年收入合计',readOnly: true,
                name: 'first',
                anchor:'85%',
                listeners : {  
                    render : function(obj) {  
                        var font = document.createElement("font");  
                        font.setAttribute("color","black");  
                        var redStar = document.createTextNode('(必输)');  
                        font.appendChild(redStar);  
                        obj.el.dom.parentNode.appendChild(font);  
                    }  
                }
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '租赁年收入',readOnly: true,
                name: 'last',
                anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '个人年收入合计',readOnly: true,
                name: 'last',
                anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '家庭人口数',readOnly: true,
                name: 'last',
                anchor:'85%',
                listeners : {  
                    render : function(obj) {  
                        var font = document.createElement("font");  
                        font.setAttribute("color","black");  
                        var redStar = document.createTextNode('(必输)');  
                        font.appendChild(redStar);  
                        obj.el.dom.parentNode.appendChild(font);  
                    }  
                }
            }]
        }]
    }]
});

var P_plant_info = new Ext.FormPanel({
    frame:true,
    title: '1.3.2-种植养殖大户专属信息',
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '种植面积',readOnly: true,
                name: 'last',
                anchor:'90%',
                listeners : {  
                    render : function(obj) {  
                        var font = document.createElement("font");  
                        font.setAttribute("color","black");  
                        var redStar = document.createTextNode('公顷');  
                        font.appendChild(redStar);  
                        obj.el.dom.parentNode.appendChild(font);  
                    }  
                }
            },{
                xtype:'textfield',
                fieldLabel: '原主年收入',readOnly: true,
                name: 'last',
                anchor:'90%',
                listeners : {  
                    render : function(obj) {  
                        var font = document.createElement("font");  
                        font.setAttribute("color","black");  
                        var redStar = document.createTextNode('万元');  
                        font.appendChild(redStar);  
                        obj.el.dom.parentNode.appendChild(font);  
                    }  
                }
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '年产值',readOnly: true,
                name: 'last',
                anchor:'90%',
                listeners : {  
                    render : function(obj) {  
                        var font = document.createElement("font");  
                        font.setAttribute("color","black");  
                        var redStar = document.createTextNode('万元');  
                        font.appendChild(redStar);  
                        obj.el.dom.parentNode.appendChild(font);  
                    }  
                }
            },{
                xtype:'textfield',
                fieldLabel: '雇佣人数',readOnly: true,
                name: 'last',
                anchor:'90%',
                listeners : {  
                    render : function(obj) {  
                        var font = document.createElement("font");  
                        font.setAttribute("color","black");  
                        var redStar = document.createTextNode('人');  
                        font.appendChild(redStar);  
                        obj.el.dom.parentNode.appendChild(font);  
                    }  
                }
            }]
        }]
    }]
});


var P_household_info = new Ext.FormPanel({
    frame:true,
    title: '1.3.1-农户基本信息',
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '储蓄额',readOnly: true,
                name: 'last',
                anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '名下财产评估价值',readOnly: true,
                name: 'last',
                anchor:'95%'
            },{
                xtype: 'radiogroup',
                labelWith:100,
                columns:3,
                fieldLabel: '是否有犯罪记录',readOnly: true,
                items: [
                    { boxLabel: '是', name: 'suportPower'},
                    { boxLabel: '否', name: 'suportPower'}
                ]
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '具体说明',readOnly: true,
                name: 'last',
                anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '负债额',readOnly: true,
                name: 'last',
                anchor:'95%'
            },{
                xtype: 'radiogroup',
                labelWith:100,
                fieldLabel: '投保情况',readOnly: true,
                items: [
                    { boxLabel: '农业保险', name: 'suportPower'},
                    { boxLabel: '养老保险', name: 'suportPower'},
                    { boxLabel: '其他', name: 'suportPower'}
                ]
            }]
        },{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '居住村庄情况',readOnly: true,
                name: 'last',
                anchor:'95%'
            }]
        }]
    }]
});
var P_car1_info = new Ext.FormPanel({
    frame:true,
    collapsible:true,
    title: '车辆1',
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                fieldLabel: '车辆权属人',readOnly: true,
                items: [
                    { boxLabel: '自有无贷款', name: 'suportPower'},
                    { boxLabel: '自有有贷款', name: 'suportPower'},
                    { boxLabel: '租赁', name: 'suportPower'},
                    { boxLabel: '其他', name: 'suportPower'}
                ]
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '车牌品牌',readOnly: true,
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '发动机号',readOnly: true,
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '购置日期',readOnly: true,
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '车辆抵押情况',readOnly: true,
                name: 'last',
                anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '车辆型号',readOnly: true,
                name: 'last',
                anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '车架号',readOnly: true,
                name: 'last',
                anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '购买金额',readOnly: true,
                name: 'last',
                anchor:'95%'
            }]
        }]
    }]
});
var P_other1_info = new Ext.FormPanel({
    frame:true,
    collapsible:true,
    title: '其他资产1',
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                fieldLabel: '其他资产类型',readOnly: true,
                items: [
                    { boxLabel: '存款', name: 'suportPower'},
                    { boxLabel: '股票', name: 'suportPower'},
                    { boxLabel: '基金', name: 'suportPower'},
                    { boxLabel: '其他金融资产', name: 'suportPower'},
                    { boxLabel: '其他', name: 'suportPower'}
                ]
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '其他资产估值',readOnly: true,
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textarea',
                readOnly:true,
                fieldLabel: '资产信息备注',readOnly: true,
                name: 'first',
                anchor:'95%'
            }]
        }]
    }]
});


var P_guarantor_history_info = new Ext.FormPanel({
    frame:true,
    collapsible:true,
    title: '3.1-保单历史信息',
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                columns:5,
                fieldLabel: '保险种类',readOnly: true,
                items: [
                    { boxLabel: '财产保险', name: 'suportPower'},
                    { boxLabel: '人寿保险', name: 'suportPower'},
                    { boxLabel: '机动车辆保险', name: 'suportPower'},
                    { boxLabel: '交强险', name: 'suportPower'},
                    { boxLabel: '盗抢险', name: 'suportPower'},
                    { boxLabel: '车损险', name: 'suportPower'},
                    { boxLabel: '第三者责任险', name: 'suportPower'},
                    { boxLabel: '火险', name: 'suportPower'},
                    { boxLabel: '全险', name: 'suportPower'},
                    { boxLabel: '在建工程险', name: 'suportPower'}
                ]
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                fieldLabel: '是否老客户',readOnly: true,
                items: [
                    { boxLabel: '是', name: 'suportPower'},
                    { boxLabel: '否', name: 'suportPower'}
                ]
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '历史投保单号码',readOnly: true,
                name: 'first',
                anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '生效起止日期',readOnly: true,
                name: 'first',
                anchor:'95%'
            }]
        }]
    }]
});
var P_noRepayment_info = new Ext.FormPanel({
    frame:true,
    collapsible:true,
    title: '3.2-未还款信息',
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                fieldLabel: '是否有其他未偿还贷款',readOnly: true,
                items: [
                    { boxLabel: '是', name: 'suportPower'},
                    { boxLabel: '否', name: 'suportPower'}
                ]
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '未还款金额',readOnly: true,
                name: 'first',
                anchor:'90%',
                listeners : {  
                    render : function(obj) {  
                        var font = document.createElement("font");  
                        font.setAttribute("color","black");  
                        var redStar = document.createTextNode('万元');  
                        font.appendChild(redStar);  
                        obj.el.dom.parentNode.appendChild(font);  
                    }  
                }
            }]
        }]
    }]
});
var P_insure_info = new Ext.FormPanel({
    frame:true,
    title: '4.1-保险基本信息',
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '险种',readOnly: true,
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '期限',readOnly: true,
                name: 'first',
                anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                fieldLabel: '保险金额',readOnly: true,
                name: 'last',
                anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '费率',readOnly: true,
                name: 'last',
                anchor:'95%'
            }]
        }]
    }]
});

var P_product_base_info = new Ext.FormPanel({
    frame:true,
    title: '车贷险专属调查信息-基本信息',
    collapsible:true,
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '所购车辆价值',readOnly: true,
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                fieldLabel: '首付比例%',readOnly: true,
                name: 'last',
                anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '首付款是否自有',readOnly: true,
                name: 'first',
                anchor:'95%'
            }]
        }]
    }]
});

var P_product_self_info = new Ext.FormPanel({
    frame:true,
    title: '4.2.1-车贷险专属调查信息-自用车辆显示',
    collapsible:true,
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '驾驶执照获取年限',readOnly: true,
                name: 'first',
                anchor:'95%',
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
});

var P_product_business_info = new Ext.FormPanel({
    frame:true,
    title: '4.2.2-车贷险专属调查信息-营业用车显示',
    collapsible:true,
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                fieldLabel: '购车资金来源',readOnly: true,
                items: [
                    { boxLabel: '自有资金为主', name: 'suportPower'},
                    { boxLabel: '合伙', name: 'suportPower'},
                    { boxLabel: '贷款资金为主', name: 'suportPower'},
                    { boxLabel: '其他来源', name: 'suportPower'}
                ]
            }]
        },{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '客货运驾驶执照获取年限',readOnly: true,
                name: 'first',
                anchor:'95%',
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
        },{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype:'textarea',
                readOnly:true,
                fieldLabel: '备注说明',readOnly: true,
                name: 'first',
                anchor:'95%'
            }]
        }]
    }]
});


var P_ensure_guarantor1_info = new Ext.FormPanel({
    frame:true,
    title: '保证担保1',
    collapsible:true,
    bodyStyle:'padding:5px 5px 0',
    width: 750,
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
                anchor:'95%'
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
                anchor:'95%'
			}) ]
		},{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                columns:1,
                fieldLabel: '保证人性质',readOnly: true,
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


var P_collateral_guarantor1_info = new Ext.FormPanel({
    frame:true,
    title: '抵(质)押担保1',
    collapsible:true,
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                labelWith:100,
                columns:3,
                fieldLabel: '保证合同覆盖情况',readOnly: true,
                items: [
                    { boxLabel: '无条件全额保证', name: 'suportPower'},
                    { boxLabel: '覆盖率在80%以上', name: 'suportPower'},
                    { boxLabel: '覆盖率在80%以下', name: 'suportPower'},
                    { boxLabel: '无此种方式保证', name: 'suportPower'},
                    { boxLabel: '此类产品不适用保证方式', name: 'suportPower'}
                ]
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '抵押覆盖率',readOnly: true,
                name: 'first',
                anchor:'50%'
            },{
                xtype: 'radiogroup',
                labelWith:100,
                columns:3,
                fieldLabel: '收入稳定性',readOnly: true,
                items: [
                    { boxLabel: '职业稳定，收入来源多样化', name: 'suportPower'},
                    { boxLabel: '职业较稳定，收入来源较单一', name: 'suportPower'},
                    { boxLabel: '职业不稳定，收入来源单一', name: 'suportPower'}
                ]
            },{
                xtype:'textarea',
                readOnly:true,
                fieldLabel: '其他事项备注',
                name: 'first',
                anchor:'95%'
            }]
        }]
    }]
});
var P_guarantorState_info = new Ext.FormPanel({
    frame:true,
    title: '保单状态定性指标',
    collapsible:true,
    bodyStyle:'padding:5px 5px 0',
    width: 750,
    items: [{
        layout:'column',
        items:[{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '抵质押物类型',
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '押品权属人',
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '评估认定价值',
                name: 'first',
                anchor:'95%'
            }]
        },{
            columnWidth:.5,
            layout: 'form',
            items: [{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '抵质押物名称',
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '所在地',
                name: 'first',
                anchor:'95%'
            },{
                xtype:'textfield',
                readOnly:true,
                fieldLabel: '担保金额',
                name: 'first',
                anchor:'95%'
            }]
        }]
    }]
});
var P_all_house_info = new Ext.Panel({
    title: '1.3-农户信息',
    collapsible:true,
    width:800,
    items:[P_household_info,P_plant_info]
});
var P_all_car_info = new Ext.Panel({
    title: '2.2.2-车辆',
    collapsible:true,
    width:800,
    items:[P_car1_info]
});

var P_all_other_info = new Ext.Panel({
    title: '2.2.3-其他资产',
    collapsible:true,
    width:800,
    items:[P_other1_info]
});
var P_property_info = new Ext.Panel({
    title: '2.2-家庭财产状况',
    collapsible:true,
    width:800,
    items:[P_all_house_info,P_all_car_info,P_all_other_info]
});
var P_product_info = new Ext.Panel({
    title: '4.2-产品专属调查信息',
    collapsible:true,
    width:800,
    items:[P_product_base_info,P_product_business_info]
});
var P_all_ensureGuarantor_info = new Ext.Panel({
    title: '5.1-保证担保',
    collapsible:true,
    width:800,
    items:[P_ensure_guarantor1_info]
});
var P_all_collateralGuarantor_info = new Ext.Panel({
    title: '5.2-抵押担保信息',
    collapsible:true,
    width:800,
    items:[P_collateral_guarantor1_info]
});
/*var HouseholdWin = new Ext.Window({
          title:'调查表',
          modal: true,
          autoScroll: true,
          width:800,
          closeAction : 'hide',
          height: 500,
          items: [{
        	  xtype:'panel',
        	  width:753,
        	  title:'1-投保人基本情况',
        	  autoScroll: true,
        	  layout:'form',
        	  items: [P_guarantor_info,P_wife_info,P_all_house_info]
          },{
        	  xtype:'panel',
        	  width:753,
        	  title:'2-收入资产情况',
        	  autoScroll: true,
        	  layout:'form',
        	  items: [P_income_info,P_property_info]
          },{
        	  xtype:'panel',
        	  width:753,
        	  title:'4-业务需求',
        	  autoScroll: true,
        	  layout:'form',
        	  items: [P_insure_info]
          },{
        	  xtype:'panel',
        	  width:753,
        	  title:'5-调查结论',
        	  autoScroll: true,
        	  layout:'form',
        	  frame:true,
        	  items: [
        	          {
		    	        	xtype:'textarea',
		    	        	fieldLabel: '人行资信记录',
		  	        		width:750
          	        	},{
		    	        	xtype:'textarea',
		    	        	fieldLabel: '使用调查信用状况',
		  	        		width:750
          	        	},{
					        xtype:'htmleditor',
					        width:750,
					        fieldLabel: '综合调查结果及建议'
			        }]
          }],
          buttons: [{
              text: '打印调查表',
              scope:this,
              handler: function(b, e){
          			window.print(e.getEvents());
				}
          }]
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
	var viewport = new Ext.Viewport({
		layout : 'anchor',
		autoScroll:true,
		layoutConfig : {
			align : 'stretch',
			pack : 'start'
		},
		items : [{
      	  xtype:'panel',
    	  width:753,
    	  title:'1-投保人基本情况',
    	  autoScroll: true,
    	  layout:'form',
    	  items: [P_guarantor_info,P_wife_info,P_all_house_info]
      },{
    	  xtype:'panel',
    	  width:753,
    	  title:'2-收入资产情况',
    	  autoScroll: true,
    	  layout:'form',
    	  items: [P_income_info,P_property_info]
      },{
    	  xtype:'panel',
    	  width:753,
    	  title:'4-业务需求',
    	  autoScroll: true,
    	  layout:'form',
    	  items: [P_insure_info]
      },{
    	  xtype:'panel',
    	  width:753,
    	  title:'5-调查结论',
    	  autoScroll: true,
    	  layout:'form',
    	  frame:true,
    	  items: [
    	          {
	    	        	xtype:'textarea',
	    	        	fieldLabel: '人行资信记录',readOnly: true,
	  	        		width:750
      	        	},{
	    	        	xtype:'textarea',
	    	        	fieldLabel: '使用调查信用状况',readOnly: true,
	  	        		width:750
      	        	},{
				        xtype:'htmleditor',
				        width:750,
				        fieldLabel: '综合调查结果及建议',readOnly: true,
		        }]
      }]
	});
});