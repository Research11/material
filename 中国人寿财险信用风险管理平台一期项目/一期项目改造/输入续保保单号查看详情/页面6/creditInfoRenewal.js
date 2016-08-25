var screenWidth = Ext.getBody().getViewSize().width - 70;
if (Ext.getBody().getViewSize().width == 0) {
    screenWidth = 690;
}
var eleWidth = (screenWidth + 70) / 2 * 0.7;
var columnWidth = 800;

var mypath = window.location.href;
var adSearch = "";
var warningStore = new Ext.data.Store({
    autoDestroy: true,
    url: 'earlyWarning_list.action',
    autoLoad: true,
    baseParams: {
        loadStore: true,
        start: 0,
        limit: 20,
        adSearch: adSearch,
        policyId: score.policyId
    },
    storeId: 'storeId',
    reader: new Ext.data.JsonReader({
        root: 'data',
        idProperty: 'id',
        totalProperty: 'total',
        fields: [{
            name: 'id'
        },
        {
            name: 'warningIndex'
        },
        {
            name: 'warningInformation'
        },
        {
            name: 'warningType'
        }]
    })
});

var warningGridCM = new Ext.grid.ColumnModel([{
    dataIndex: 'id',
    hidden: true
},
{
    header: "预警指标 ",
    dataIndex: 'warningIndex',
    align: 'center',
    width: 300
},
{
    header: "提示信息",
    dataIndex: 'warningInformation',
    align: 'center',
    width: 280
},
{
    header: "预警级别",
    dataIndex: 'warningType',
    align: 'center',
    renderer: function(v) {
        if (v == '3') {
            return "<span style='color:red;font-weight:bold;'>一票否决</span>";
        }
        if (v == '2') {
            return "<span style='color:yellow;font-weight:bold;'>高危预警</span>";
        } else {
            return "<span style='color:blue;font-weight:bold;'>普通预警</span>";
        }
    }
}]);

var warningGrid = new Ext.grid.GridPanel({
    store: warningStore,
    height: 200,
    cm: warningGridCM
});

//	审核列表
var companyColM = new Ext.grid.ColumnModel([{
    header: "建议金额",
    dataIndex: "recommendAmount",
    width: 165
},
{
    header: "建议费率",
    dataIndex: "recommendRate",
    width: 165
},
{
    header: "建议期限",
    dataIndex: "recommendPeriod",
    width: 166
},
{
    header: "审核人",
    dataIndex: "createdby",
    width: 166
},
{
    header: "审核结果",
    dataIndex: "approvalResult",
    width: 166
},
{
    header: "审核意见",
    dataIndex: "remark",
    width: 166
},
{
    header: "审核时间",
    dataIndex: "createdDate",
    resizable: true,
    sortable: true,
    width: 200,
    renderer: function(value) {
        if (null != value && value.length > 4) {
            return value.substring(0, value.length - 4);
        } else {
            return "";
        }
    }

}

]);

var companyStore = new Ext.data.Store({
    autoDestroy: true,
    url: 'verifyinfo_policy.action',
    autoLoad: true,
    //waitMsg : "正在提交数据...",
    baseParams: {
        loadStore: true,
        bdID: score.policyId
    },
    reader: new Ext.data.JsonReader({
        root: 'data',
        idProperty: 'id',
        fields: [{
            name: 'createdDate'
        },
        {
            name: 'recommendAmount'
        },
        {
            name: 'recommendRate'
        },
        {
            name: 'recommendPeriod'
        },
        {
            name: 'createdby'
        },
        {
            name: 'approvalResult'
        },
        {
            name: 'remark'
        }]
    })
});
var companygrid = new Ext.grid.GridPanel({
    title: '审批意见',
    store: companyStore,
    hidden: '1' == score.isFgshbg ? false: true,
    cm: companyColM,
    layout: 'fit',
    region: 'center',
    height: 200,
    border: false
});
//评分步骤列表
var scoreStepColM = new Ext.grid.ColumnModel([{
    header: "评分项目",
    dataIndex: "name",
    width: 165
},
{
    header: "原始得分(最高10分)",
    dataIndex: "originalScore",
    width: 165
},
{
    header: "权重",
    dataIndex: "weight",
    width: 165
},
{
    header: "得分",
    dataIndex: "score",
    width: 165
},
{
    header: "备注",
    dataIndex: "description",
    width: 166
}]);

var scoreStepStore = new Ext.data.Store({
    autoDestroy: true,
    url: 'scorestep_nopage_list.action',
    autoLoad: true,
    baseParams: {
        loadStore: true,
        policyId: score.policyId
    },
    reader: new Ext.data.JsonReader({
        root: 'data',
        idProperty: 'id',
        fields: [{
            name: 'createdDate'
        },
        {
            name: 'name'
        },
        {
            name: 'description'
        },
        {
            name: 'score'
        },
        {
            name: 'createdby'
        },
        {
            name: 'weight'
        },
        {
            name: 'originalScore'
        }]
    })
});
var scoreStepgrid = new Ext.grid.GridPanel({
    title: '评级详情',
    store: scoreStepStore,
    hidden: '1' == score.isZgshbg ? false: true,
    cm: scoreStepColM,
    layout: 'fit',
    region: 'center',
    height: 200,
    border: false
});

//	warningStore.reload(true);
var ZXPF_Detail_Panel = new Ext.form.FormPanel({
    frame: true,
    autoScroll: true,
    buttonAlign: 'center',
    /*buttons: [{
        text: "放弃任务",
        hidden: '1' == score.isFgshbg ? false: true,
        handler: function() {
            Ext.Msg.confirm("信息确认", "您确定放弃该任务吗？",
            function(c) {
                if (c == "yes") {
                    var panel = ZXPF_Detail_Panel;
                    var myMask = new Ext.LoadMask(Ext.getBody(), {
                        msg: "正在提交，请稍后..."
                    });
                    myMask.show();
                    Ext.Ajax.request({
                        url: 'process_activiti_removeTask.action',
                        params: {
                            PolicyId: score.policyId
                        },
                        method: "POST",
                        success: function(response, opts) {
                            myMask.hide();
                            if (Ext.decode(response.responseText).success) {
                                Ext.MessageBox.alert("操作信息", Ext.decode(response.responseText).mes,
                                function(id) {
                                    if ("ok" == id) {
                                        var reloadMask = new Ext.LoadMask(Ext.getBody(), {
                                            msg: "正在加载页面，请稍后..."
                                        });
                                        reloadMask.show();
                                        top.location.reload();
                                    }
                                });
                            } else {
                                Ext.MessageBox.alert("信息", Ext.decode(response.responseText).mes);
                            }
                        },
                        failure: function(d, e) {
                            myMask.hide();
                            Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
                        }
                    });
                } else {
                    return;
                }
            });
        }
    },
    {
        text: "退回至资信调查",
        hidden: '1' == score.isFgshbg ? false: true,
        handler: function() {
            Ext.Msg.confirm("信息确认", "您把该订单退回至资信调查吗？",
            function(c) {
                if (c == "yes") {
                    var panel = ZXPF_Detail_Panel;
                    if (panel.getForm().isValid()) {
                        var jybxje = panel.getForm().findField('recommendAmount').getValue(); //建议金额
                        var jybxqx = panel.getForm().findField('recommendPeriod').getValue(); //建议期限
                        var jybxfl = panel.getForm().findField('recommendRate').getValue(); //建议费率
                        var spbcyj = panel.getForm().findField('remark').getValue(); //审批意见;
                        var myMask = new Ext.LoadMask(Ext.getBody(), {
                            msg: "正在提交，请稍后..."
                        });
                        myMask.show();
                        Ext.Ajax.request({
                            url: 'process_activiti_returnToZXDC.action',
                            params: {
                                PolicyId: score.policyId,
                                recommendAmount: jybxje,
                                recommendPeriod: jybxqx,
                                recommendRate: jybxfl,
                                approvalResult: '2',
                                remark: spbcyj
                            },
                            method: "POST",
                            success: function(response, opts) {
                                myMask.hide();
                                if (Ext.decode(response.responseText).success) {
                                    Ext.MessageBox.alert("操作信息", Ext.decode(response.responseText).mes,
                                    function(id) {
                                        if ("ok" == id) {
                                            var reloadMask = new Ext.LoadMask(Ext.getBody(), {
                                                msg: "正在加载页面，请稍后..."
                                            });
                                            reloadMask.show();
                                            top.location.reload();
                                        }
                                    });
                                } else {
                                    Ext.MessageBox.alert("信息", Ext.decode(response.responseText).mes);
                                }
                            },
                            failure: function(d, e) {
                                myMask.hide();
                                Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
                            }
                        });
                    }
                } else {
                    return;
                }
            })
        }
    },
    {
        text: "退回下级",
        hidden: '1' == score.isFgshbg ? false: true,
        handler: function() {
            Ext.Msg.confirm("信息确认", "您把该订单退回下级吗？",
            function(c) {
                if (c == "yes") {
                    var panel = ZXPF_Detail_Panel;
                    if (panel.getForm().isValid()) {
                        var jybxje = panel.getForm().findField('recommendAmount').getValue(); //建议金额
                        var jybxqx = panel.getForm().findField('recommendPeriod').getValue(); //建议期限
                        var jybxfl = panel.getForm().findField('recommendRate').getValue(); //建议费率
                        var spbcyj = panel.getForm().findField('remark').getValue(); //审批意见;
                        var myMask = new Ext.LoadMask(Ext.getBody(), {
                            msg: "正在提交，请稍后..."
                        });
                        myMask.show();
                        Ext.Ajax.request({
                            url: 'process_activiti_reject.action',
                            params: {
                                PolicyId: score.policyId,
                                recommendAmount: jybxje,
                                recommendPeriod: jybxqx,
                                recommendRate: jybxfl,
                                approvalResult: '2',
                                remark: spbcyj
                            },
                            method: "POST",
                            success: function(d, e) {
                                myMask.hide();
                                var result = d.responseText;
                                if ("true" == result) {
                                    Ext.MessageBox.alert("操作信息", "审核已退回！",
                                    function(id) {
                                        if ("ok" == id) {
                                            var reloadMask = new Ext.LoadMask(Ext.getBody(), {
                                                msg: "正在加载页面，请稍后..."
                                            });
                                            reloadMask.show();
                                            top.location.reload();
                                        }
                                    });
                                }
                                if ("false" == result) {
                                    Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
                                }
                            },
                            failure: function(d, e) {
                                myMask.hide();
                                Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
                            }
                        });
                    } else {
                        Ext.MessageBox.alert("操作信息", "请检查页面必填项！");
                    }
                } else {
                    return;
                }
            })
        }
    },
    {
        text: '保存',
        //hidden:'1' ==score.isFgshbg ? true : false,
        hidden: true,
        handler: function() {
            var form = ZXPF_Detail_Panel;
            if (form.getForm().isValid()) {
                var data = Ext.util.JSON.encode(form.getForm().getValues(false));
                form.getForm().submit({
                    method: "POST",
                    url: "verifyinfo_save.action",
                    waitMsg: "正在提交数据...",
                    params: {
                        data: data
                    },
                    success: function(d, g) {
                        var i = g.result.msg;
                        var mes = "成功保存信息！";
                        Ext.MessageBox.alert("操作信息", mes);
                        if (i != null) {
                            Ext.MessageBox.alert("操作信息", mes);
                        }
                    },
                    failure: function(d, e) {
                        Ext.MessageBox.show({
                            title: "操作信息",
                            msg: e.result.msg,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });
            } else {
                Ext.MessageBox.alert("操作信息", "请检查页面必填项！");
            }

        }
    },
    {
        text: '审核通过',
        handler: function() {
            Ext.Msg.confirm("信息确认", "您该保单审核通过吗？",
            function(c) {
                if (c == "yes") {
                    var panel = ZXPF_Detail_Panel;
                    if (panel.getForm().isValid()) {
                        var jybxje = panel.getForm().findField('recommendAmount').getValue(); //建议金额
                        var jybxqx = panel.getForm().findField('recommendPeriod').getValue(); //建议期限
                        var jybxfl = panel.getForm().findField('recommendRate').getValue(); //建议费率
                        var spbcyj = panel.getForm().findField('remark').getValue(); //审批意见;
                        var manCustomerlevel = panel.getForm().findField('manCustomerlevel').getValue(); //调整等级
                        var surveyOpinion = panel.getForm().findField('surveyOpinion').getValue(); //调整意见
                        var myMask = new Ext.LoadMask(Ext.getBody(), {
                            msg: "正在提交，请稍后..."
                        });
                        myMask.show();
                        Ext.Ajax.request({
                            url: 'process_activiti_agree.action',
                            params: {
                                PolicyId: score.policyId,
                                recommendAmount: jybxje,
                                recommendPeriod: jybxqx,
                                recommendRate: jybxfl,
                                approvalResult: '1',
                                remark: spbcyj,
                                manCustomerlevel: manCustomerlevel,
                                surveyOpinion: surveyOpinion
                            },
                            method: "POST",
                            success: function(response, opts) {
                                myMask.hide();
                                if (Ext.decode(response.responseText).success) {
                                    Ext.MessageBox.alert("操作信息", Ext.decode(response.responseText).mes,
                                    function(id) {
                                        if ("ok" == id) {
                                            var reloadMask = new Ext.LoadMask(Ext.getBody(), {
                                                msg: "正在加载页面，请稍后..."
                                            });
                                            reloadMask.show();
                                            top.location.reload();
                                        }
                                    });
                                } else {
                                    Ext.MessageBox.alert("信息", Ext.decode(response.responseText).mes);
                                }
                            },
                            failure: function(d, e) {
                                myMask.hide();
                                Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
                            }
                        });
                    } else {
                        Ext.MessageBox.alert("操作信息", "请检查页面必填项！");
                    }

                }
            });
        }
    },{
        text: '废弃',
        hidden:'1' ==score.isFgshbg ? true : false,
        handler: function(button, event) {
            Ext.Msg.confirm("信息确认", "您废弃该保单吗？",
            function(c) {
                if (c == "yes") {
                    var panel = ZXPF_Detail_Panel;
                    if (panel.getForm().isValid()) {
                        var jybxje = panel.getForm().findField('recommendAmount').getValue(); //建议金额
                        var jybxqx = panel.getForm().findField('recommendPeriod').getValue(); //建议期限
                        var jybxfl = panel.getForm().findField('recommendRate').getValue(); //建议费率
                        var spbcyj = panel.getForm().findField('remark').getValue(); //审批意见;
                        var manCustomerlevel = panel.getForm().findField('manCustomerlevel').getValue(); //调整等级
                        var surveyOpinion = panel.getForm().findField('surveyOpinion').getValue(); //调整意见
                        var myMask = new Ext.LoadMask(Ext.getBody(), {
                            msg: "正在提交，请稍后..."
                        });
                        myMask.show();
                        Ext.Ajax.request({
                            url: 'process_activiti_agree.action',
                            params: {
                                PolicyId: score.policyId,
                                recommendAmount: jybxje,
                                recommendPeriod: jybxqx,
                                recommendRate: jybxfl,
                                approvalResult: '0',
                                remark: spbcyj,
                                manCustomerlevel: manCustomerlevel,
                                surveyOpinion: surveyOpinion
                            },
                            method: "POST",
                            success: function(d, e) {
                                myMask.hide();
                                var result = d.responseText;
                                if (Ext.decode(d.responseText).success) {
                                    Ext.MessageBox.alert("操作信息", "该订单已废弃！",
                                    function(id) {
                                        if ("ok" == id) {
                                            var reloadMask = new Ext.LoadMask(Ext.getBody(), {
                                                msg: "正在加载页面，请稍后..."
                                            });
                                            reloadMask.show();
                                            top.location.reload();
                                        }
                                    });
                                }
                                if (!Ext.decode(d.responseText).success) {
                                    Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
                                }
                            },
                            failure: function(d, e) {
                                myMask.hide();
                                Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
                            }
                        });
                    } else {
                        Ext.MessageBox.alert("操作信息", "请检查页面必填项！");
                    }
                }
            });
        }
    },
    {
        text: '审核不通过',
        handler: function(button, event) {
            Ext.Msg.confirm("信息确认", "您该保单审核不通过吗？",
            function(c) {
                if (c == "yes") {
                    var panel = ZXPF_Detail_Panel;
                    if (panel.getForm().isValid()) {
                        var jybxje = panel.getForm().findField('recommendAmount').getValue(); //建议金额
                        var jybxqx = panel.getForm().findField('recommendPeriod').getValue(); //建议期限
                        var jybxfl = panel.getForm().findField('recommendRate').getValue(); //建议费率
                        var spbcyj = panel.getForm().findField('remark').getValue(); //审批意见;
                        var manCustomerlevel = panel.getForm().findField('manCustomerlevel').getValue(); //调整等级
                        var surveyOpinion = panel.getForm().findField('surveyOpinion').getValue(); //调整意见
                        var myMask = new Ext.LoadMask(Ext.getBody(), {
                            msg: "正在提交，请稍后..."
                        });
                        myMask.show();
                        Ext.Ajax.request({
                            url: 'process_activiti_agree.action',
                            params: {
                                PolicyId: score.policyId,
                                recommendAmount: jybxje,
                                recommendPeriod: jybxqx,
                                recommendRate: jybxfl,
                                approvalResult: '0',
                                remark: spbcyj,
                                manCustomerlevel: manCustomerlevel,
                                surveyOpinion: surveyOpinion
                            },
                            method: "POST",
                            success: function(d, e) {
                                myMask.hide();
                                var result = d.responseText;
                                if (Ext.decode(d.responseText).success) {
                                    Ext.MessageBox.alert("操作信息", "审核不通过！",
                                    function(id) {
                                        if ("ok" == id) {
                                            var reloadMask = new Ext.LoadMask(Ext.getBody(), {
                                                msg: "正在加载页面，请稍后..."
                                            });
                                            reloadMask.show();
                                            top.location.reload();
                                        }
                                    });
                                }
                                if (!Ext.decode(d.responseText).success) {
                                    Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
                                }
                            },
                            failure: function(d, e) {
                                myMask.hide();
                                Ext.MessageBox.alert("操作信息", "操作出错，请联系管理员！");
                            }
                        });
                    } else {
                        Ext.MessageBox.alert("操作信息", "请检查页面必填项！");
                    }
                }
            });
        }
    }],*/
    items: [warningGrid, scoreStepgrid, {
        xtype: 'fieldset',
        title: '查看评分结果',
        layout: 'column',
        items: [{
            layout: 'form',
            columnWidth: .5,
            items: [{
                xtype: 'textfield',
                name: 'customerLevel',
                disabled: false,
                readOnly: true,
                style: 'background:#E6E6E6;',
                width: eleWidth,
                value: score.customerLevel,
                fieldLabel: '评分结果为'
            },
            {
                xtype: 'hidden',
                value: score.policyId,
                name: 'policyid'
            },
            {
                xtype: 'hidden',
                value: score.id,
                name: 'scoreId'
            },
            /*{
                xtype: 'radiogroup',
                fieldLabel: '调整评级结果',
                hidden: '1' == score.isFgshbg ? true: false,
                //		                    width:'90%', 
                width: eleWidth,
                columns: 5,
                items: [{
                    boxLabel: '是',
                    inputValue: '1',
                    name: 'isAdjust',
                    checked: score.customerLevel != score.manCustomerlevel
                },
                {
                    boxLabel: '否',
                    inputValue: '2',
                    name: 'isAdjust',
                    checked: score.customerLevel == score.manCustomerlevel
                }],
                listeners: {
                    'change': function(form, newvalue, oldvalue, opts) {
                        var panel = ZXPF_Detail_Panel;
                        var obj = form.getValue();
                        var obj1 = panel.getForm().findField('surveyOpinion');
                        var obj2 = panel.getForm().findField('manCustomerlevel');
                        var _value = panel.getForm().findField('customerLevel').getValue();
                        obj2.getEl().dom.readOnly = false;
                        if (obj.boxLabel == '是') {
                            obj1.allowBlank = false;
                            obj1.setDisabled(false);
                            obj2.setDisabled(false);
                        } else {
                            obj1.allowBlank = true;
                            obj1.setDisabled(true);
                            obj2.setDisabled(true);
                            obj1.setValue("");
                            obj2.setValue(_value);
                        }

                    }
                }
            },
            {
                xtype: 'combo',
                name: 'manCustomerlevel',
                fieldLabel: '调整评分结果为',
                hidden: false,
                //'1' ==score.isFgshbg ? true : false,
                allowBlank: false,
                hiddenName: 'manCustomerlevel',
                store: new Ext.data.SimpleStore({
                    fields: ['key', 'value'],
                    data: rateLevel
                }),
                valueField: 'key',
                displayField: 'value',
                //等于1的时候不是资信调查岗
                disabled: '1' == score.isFgshbg || score.customerLevel != score.manCustomerlevel ? false: true,
                readOnly: '1' == score.isFgshbg ? true: false,
                style: '1' == score.isFgshbg ? 'background:#E6E6E6;': 'background:#FFFFFF',
                mode: 'local',
                triggerAction: 'all',
                editable: false,
                selectOnFocus: true,
                value: score.manCustomerlevel,
                width: eleWidth
            }]
        },
        {
            layout: 'form',
            columnWidth: 1,
            items: [{
                xtype: 'textarea',
                fieldLabel: '<span style="color:Red">*</span>调整原因',
                width: screenWidth * 0.85,
                allowBlank: true,
                disabled: '1' == score.isFgshbg || score.customerLevel != score.manCustomerlevel ? false: true,
                readOnly: '1' == score.isFgshbg ? true: false,
                style: '1' == score.isFgshbg ? 'background:#E6E6E6;': 'background:#FFFFFF',
                value: score.surveyOpinion,
                name: 'surveyOpinion'
            }*/]
        }]
    },
    {
        xtype: 'fieldset',
        layout: 'column',
        title: '审批建议',
        items: [{
            layout: 'form',
            columnWidth: .5,
            items: [{
                xtype: 'numberfield',
                name: 'recommendAmount',
                value: score.recommendAmount,
                width: eleWidth,
                readOnly: true,
                fieldLabel: '建议金额(元)',
                allowDecimals: true,
                minValue: 0
            },
            {
                xtype: 'numberfield',
                name: 'recommendRate',
                value: score.recommendRate,
                width: eleWidth,
                readOnly: true,
                fieldLabel: '建议费率(%)',
                allowDecimals: true,
                minValue: 0
            }]
        },
        {
            layout: 'form',
            columnWidth: .5,
            items: [{
                xtype: 'numberfield',
                name: 'recommendPeriod',
                value: score.recommendPeriod,
                width: eleWidth,
                readOnly: true,
                fieldLabel: '建议期限(月)',
                allowDecimals: false,
                minValue: 0
            },
            {
                xtype: 'textfield',
                name: 'remark',
                value: score.remark,
                minLength: 10,
                maxLength: 600,
                allowBlank: false,
                width: eleWidth,
                readOnly: true,
                fieldLabel: '<span style="color:Red">*</span>审批意见'
            }]
        }]
    },
    companygrid]
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
    Ext.util.CSS.swapStyleSheet("theme", "jsp/ext3/ext3.4/resources/css/" + storeTheme + ".css");
    var panelsize = Ext.getBody().getHeight();
    if (panelsize < 80) panelsize = 80;
    Ext.QuickTips.init();
    try {
        Ext.get('loading').remove();
        Ext.get('loading-mask').remove();
    } catch(e) {}
    var viewport = new Ext.Viewport({
        layout: 'fit',
        //			autoScroll:true,
        layoutConfig: {
            align: 'stretch',
            pack: 'start'
        },
        items: [ZXPF_Detail_Panel]
    });
});