function insuranceTypeSet(_insuranceType) {
    var _element = Ext.getCmp("carloan.carUseID");
    var _elementDownPayment = Ext.getCmp("carloan.downPayment");
    var _elementCleanPrice = Ext.getCmp('carloan.cleanPrice');
    var _elementFundSource = Ext.getCmp('carloan.fundSourceID');
    if (_insuranceType != '2205') {
        Ext.getCmp("carFieldSet").hide();
        Ext.getCmp("collateralFieldSet").show();
        _element.allowBlank = true;
        _elementDownPayment.allowBlank = true;
        _elementCleanPrice.allowBlank = true;
        _elementFundSource.allowBlank = true;
        Ext.getCmp("addPolicyFieldSet").show();
    }
    if (_insuranceType == '2205') {
        Ext.getCmp("carFieldSet").show();
        Ext.getCmp("collateralFieldSet").hide();
        Ext.getCmp("addPolicyFieldSet").hide();
        _element.allowBlank = false;
        _elementDownPayment.allowBlank = false;
        _elementCleanPrice.allowBlank = false;
        _elementFundSource.allowBlank = false;
    }
}

function checkInsuranceType(){
	var insuranceType= Ext.getCmp("policy.insuranceType").getValue();
	var customerCodeType= Ext.getCmp("customerCodeType").getValue();
	if("2206"==insuranceType&&"1"!=customerCodeType){
		Ext.MessageBox.alert("操作信息", "投保人必须为个人型客户!");
		return false;
	}else{
		return true;
	}
	
}

var projectStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        // 这里是参数可以顺便写,这个数据源是在第一个下拉框select的时候load的
        url: 'get_all_project .action?projectProduce=' + pdi.policy.mainClause
    }),
    reader: new Ext.data.JsonReader({
        root: "data",
        id: 'code'
    },
    ['code', 'name'])
});
/**
 * 
 * @param grid
 * @returns {Boolean}
 */
function checkEditorGrid(grid) {
    var bl = true;
    var gridBody = grid;
    var store = gridBody.getStore();
    var cm = gridBody.getColumnModel();
    var m = gridBody.getStore().getRange(0, store.getCount());
    /* 校验数据 */
    for (var i = 0; i < m.length; i++) {
        var record = m[i];
        var fields = record.store.fields.keys;
        for (var j = 0; j < fields.length; j++) {
            var name = fields[j];
            var value = record.data[name];
            var colIndex = cm.findColumnIndex(name);
            var rowIndex = store.indexOfId(record.id);
            // coIndex>0 否则getCellEditor报错
            try {
                if (colIndex >= 0 && null != cm.getCellEditor(colIndex) && null != cm.getCellEditor(colIndex).field) {
                    // 关键操作，获取editor，进行validateValue判断
                    var editor = cm.getCellEditor(colIndex).field;
                    if (!editor.validateValue(value)) {
                        if (editor.xtype != "datefield") {
                            Ext.Msg.alert('提示', '请确保输入的数据正确。',
                            function() {
                                gridBody.startEditing(rowIndex, colIndex);
                            });
                            bl = false;
                            return bl;
                        }
                    }
                }
            } catch(error) {

}
        }
    }
    return bl;
}
// ---------------引入功能-----------------
var screenWidth = Ext.getBody().getViewSize().width - 70;
var allowIds = new Array();
// 校验聚焦方法
function checkVtype() {
    var re = true;
    Ext.ComponentMgr.all.each(function(cmp) {
        var Type = cmp.getXType();
        if (Type == 'textfield' || Type == 'combo' || Type == 'treecombo' || Type == 'datefield' || Type == 'numberfield' || Type == 'textarea' || Type == 'timefield' || Type == 'trigger') {
            if (cmp.isVisible()) {
                var va = cmp.isValid();
                re = va ? re: va;
            }
        }
        if (!re) {
            var mes = "您输入的信息验证错误，请核对后再执行该操作!";
            Ext.MessageBox.alert("操作信息", mes,
            function() {
                cmp.focus(true, true);
            });
            return re;
        }
    });
}

var eleWidth = (screenWidth + 70) / 4 * 0.6 - 8;
// 引入用户
var setUser = function(record) {
    var sname = record.get('userName');
    var sid = record.get('id');
    var cmpName = Ext.getCmp("policy.salePersonName");
    var cmpId = Ext.getCmp("policy.salePerson");
    cmpId.setValue(sid);
    cmpName.setValue(sname);
};
// 车主引入
var setCarOwner = function(record) {
    var sname = record.customerName;
    var sid = record.id;
    var cmpName = Ext.getCmp("carloan.carOwnerName");
    var cmpId = Ext.getCmp("carloan.carOwner");
    Ext.getCmp("carloan.carOwnerEcifId").setValue(record.ecifId);
    cmpId.setValue(sid);
    cmpName.setValue(sname);
};
// 押品引入功能
var setCollateral = function(record) {
    var sname = record.collateralName;
    var sid = record.id;
    var scode = record.collateralCode;

    var p = new Ext.data.Record({
        collateralIdid: sid,
        collateralIdcollateralCode: scode,
        collateralIdcollateralName: sname
    });
    collateralGrid.stopEditing();
    collateralGrid.getStore().insert(0, p);
    collateralGrid.startEditing(0, 0);
};


var editCollateral = function(record) {
	var sm = collateralGrid.getSelectionModel(); // 得到表格的选择模型
    var cell = sm.getSelectedCell(); // 通过选择模型得到选择的单元格
	var recordRow = collateralGrid.getStore().getAt(cell[0]); // 得到store对应的Record
    var sname = record.collateralName;
    var sid = record.id;
    var scode = record.collateralCode;
    recordRow.set("collateralIdid",sid);
    recordRow.set("collateralIdcollateralCode",scode);
    recordRow.set("collateralIdcollateralName",sname);
    recordRow.commit();
};


// 部门引入
var setDept = function(record) {
    var sname = record.text;
    var sid = record.id;
    var cmpName = Ext.getCmp("policy.belongDeptName");
    var cmpId = Ext.getCmp("policy.belongDept");
    cmpId.setValue(sid);
    cmpName.setValue(sname);
};

// 投保人引入
var setPolicyHolder = function(record) {
    var sname = record.customerName;
    var sid = record.id;
    var stype = record.customerType;

    var cmpName = Ext.getCmp("policyPolicyHolderName");
    var cmpId = Ext.getCmp("policyPolicyHolder");
    var cmpType = Ext.getCmp("customerCodeType");

    cmpId.setValue(sid);
    cmpName.setValue(sname);
    cmpType.setValue(stype);
    Ext.getCmp("policyPolicyHolderEcifId").setValue(record.ecifId);
};
// 被保险人引入
var setAssuredCode = function(record) {

    var cmpName = Ext.getCmp("policyAssuredName");
    var cmpId = Ext.getCmp("policyAssuredCode");
    var cmpAssuredType = Ext.getCmp("policyAssuredType");

    var cmpOrgCode = Ext.getCmp("policy.orgCode");
    var cmpCreditCode = Ext.getCmp("policy.creditCode");

    var stype = record.customerType;
    var sorgCode = record.orgCode;
    var screditCode = record.creditCode;

    var sname = record.customerName;
    var sid = record.id;
    var sAssuredType = record.assuredType;

    if ("2" == stype) {
        cmpId.setValue(sid);
        cmpName.setValue(sname);
        cmpAssuredType.setValue(sAssuredType);
        cmpOrgCode.setValue(sorgCode);
        cmpCreditCode.setValue(screditCode);
        Ext.getCmp("policyAssuredCodeEcifId").setValue(record.ecifId);
        if ("1" == sAssuredType) {
            Ext.getCmp("policy.creditCode").enable();
            Ext.getCmp("policy.orgCode").enable();
        } else {
            Ext.getCmp("policy.creditCode").disable();
            Ext.getCmp("policy.orgCode").disable();
        }
    } else {
        //请选择企业
        Ext.MessageBox.alert("操作信息", "请选择企业!");
    }
};
// 挂靠单位引入
var setAffiliatedEntity = function(record) {
    var sname = record.customerName;
    var sid = record.id;
    var cmpName = Ext.getCmp("carloan.affiliatedEntityName");
    var cmpId = Ext.getCmp("carloan.affiliatedEntity");
    var stype = record.customerType;
    if ("2" == stype) {
        Ext.getCmp("carloan.affiliatedEntityEcifId").setValue(record.ecifId);
        cmpId.setValue(sid);
        cmpName.setValue(sname);
    } else {
        // 请选择企业
        Ext.MessageBox.alert("操作信息", "请选择企业!");
    }
};
// 担保人引入
var setGuarantorGrid = function(record) {
    var p = new Ext.data.Record({
        customerIdid: record.id,
        ecifId: record.ecifId,
        customerIdcustomerName: record.customerName,
        guarantorValue:Ext.getCmp('policyView').getForm().findField('policy.policyValue').getValue()
    });
    guarantorGrid.stopEditing();
    guarantorGrid.getStore().insert(0, p);
    guarantorGrid.startEditing(0, 0);
};
// -----------------------------
var policyPolicyData = Ext.decode(pdi.policysString);
var policyPolicyStore = new Ext.data.JsonStore({
    data: policyPolicyData,
    fields: ["id", "insuranceType", "mainClause", "policyCost", "policyValue", "policyRate", "remark", "regulationFactor"]
});
var policyPolicyColM = new Ext.grid.ColumnModel([{
    header: "<span style='color:Red'>*</span>条款名称",
    dataIndex: "mainClause",
    width: 400,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['mainClause'];
        for (var i = 0; i < accessoryRisk.size(); i++) {
            var obj = accessoryRisk[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'mainClause',
        hiddenName: 'mainClause',
        id: "gridMainClause",
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: accessoryRisk
        }),
        valueField: 'key',
        displayField: 'value',
        mode: 'local',
        triggerAction: 'all',
        editable: false,
        allowBlank: false,
        selectOnFocus: true
    })
},
{
    header: "<span style='color:Red'>*</span>保险金额(元)",
    dataIndex: "policyValue",
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        maxValue: 999999999999.99,
        minValue: 1,
        allowBlank: false,
        decimalPrecision: 2,
        // 小数点后位数,
        allowNegative: false
        // 是否允许负数
    })
},
{
    header: "<span style='color:Red'>*</span>费率(%)",
    dataIndex: "policyRate",
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        decimalPrecision: 2,
        // 小数点后位数,
        maxValue: 100,
        allowBlank: false,
        allowNegative: false
        // 是否允许负数
    })
},
{
    header: "<span style='color:Red'>*</span>调整系数",
    dataIndex: "regulationFactor",
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        allowBlank: false,
        decimalPrecision: 4,
        // 小数点后位数,
        allowNegative: false,
        // 是否允许负数
        maxValue: 100
    })
},
{
    header: "<span style='color:Red'>*</span>保费(元)",
    dataIndex: "policyCost",
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        maxValue: 999999999999.99,
        allowBlank: false,
        decimalPrecision: 2,
        // 小数点后位数,
        allowNegative: false
        // 是否允许负数
    })
},
{
    header: "条款",
    dataIndex: "remark",
    editor: new Ext.form.TextArea({
        widht: 250,
        maxLength: 600,
        maxLengthText: '长度不大于600'
    })
}]);
var policyPolicyGrid = new Ext.grid.GridPanel({//EditorGridPanel
    title: "保单附加险信息管理",
    height: 200,
    /*tbar: new Ext.Toolbar({
        autoWidth: true,
        autoShow: true,
        items: [{
            "text": "添加附加险",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Add",
            "handler": function() {
                var p = new Ext.data.Record({});
                policyPolicyGrid.stopEditing();
                policyPolicyGrid.getStore().insert(0, p);
                policyPolicyGrid.startEditing(0, 0);
            }
        },
        {
            "text": "删除附加险",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Delete",
            "handler": function() {
                Ext.Msg.confirm('信息', '确定要删除',
                function(btn) {
                    if (btn == 'yes') {
                        var sm = policyPolicyGrid.getSelectionModel(); // 得到表格的选择模型
                        var cell = sm.getSelectedCell(); // 通过选择模型得到选择的单元格
                        if (cell == null) {
                            Ext.MessageBox.alert("操作信息", "请选择一条记录!");
                            return;
                        }
                        var record = policyPolicyGrid.getStore().getAt(cell[0]); // 得到store对应的Record
                        policyPolicyGrid.getStore().remove(record);
                    }
                });
            }
        },
        {
            "text": "计算总保费",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Add",
            "handler": function() {
                var _valuePolicyCost = Ext.getCmp("policy.policyCost").getValue();
                var _value = 0;
                for (var i = 0,
                len = policyPolicyGrid.getStore().data.length; i < len; i++) {
                    var policyPolicyData = policyPolicyGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
                    _value = _value + policyPolicyData.policyCost;
                }
                _value = _value + _valuePolicyCost;
                var mes = "总保费为" + _value + "元！";
                Ext.MessageBox.alert("操作信息", mes);
            }
        },
        {
            "text": "计算总金额",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Add",
            "handler": function() {
                var _valuePolicyValue = Ext.getCmp("policy.policyValue").getValue();
                var _value = 0;
                for (var i = 0,
                len = policyPolicyGrid.getStore().data.length; i < len; i++) {
                    var policyPolicyData = policyPolicyGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
                    _value = _value + policyPolicyData.policyValue;
                }
                _value = _value + _valuePolicyValue;
                var mes = "总保金为" + _value + "元！";
                Ext.MessageBox.alert("操作信息", mes);
            }
        }]
    }),*/
    width: screenWidth,
    cm: policyPolicyColM,
    store: policyPolicyStore
});
var collateralData = Ext.decode(pdi.collateralsString);
var collateralStore = new Ext.data.JsonStore({
    data: collateralData,
    fields: [{
        name: 'collateralIdcollateralName',
        mapping: 'collateralId.collateralName',
        type: 'string'
    },
    {
        name: 'collateralIdid',
        mapping: 'collateralId.id',
        type: 'string'
    },
    {
        name: 'collateralIdcollateralCode',
        mapping: 'collateralId.collateralCode',
        type: 'string'
    },
    {
        name: 'collateralId',
        type: 'object'
    },
    {
        name: 'effectiveDate'
    },
    {
        name: 'mortgageRate'
    },
    {
        name: 'collateralCategory'
    },
    {
        name: 'contractNo'
    }]
});
var collateralColM = new Ext.grid.ColumnModel([{
    dataIndex: 'collateralIdid',
    hidden: true
},
{
    header: "押品编号",
    dataIndex: "collateralIdcollateralCode",
    sortable: true
},
{
    header: "押品名称",
    dataIndex: "collateralIdcollateralName"
},
{
    header: "押品生效时间",
    dataIndex: "effectiveDate",
    renderer: function(value) {
        if (value == null || value.time == null || value.time == 0) {
            if (value == null) return '';
            else if (value != '') return value.dateFormat('Y-m-d');
            else return '';
        } else {
            return Ext.util.Format.date(new Date(parseInt(value.time)), 'Y-m-d');
        }
    },
    editor: {
        xtype: 'datefield',
        allowBlank: true,
        format: 'Y-m-d',
        editable: false
    }
},
{
    header: "<span style='color:Red'>*</span>该次担保抵质押值(元)",
    dataIndex: "mortgageRate",
    width: 250,
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        maxValue: 999999999999.99,
        decimalPrecision: 2,
        allowBlank: false,
        minValue:1,
        // 小数点后位数,
        allowNegative: false
        // 是否允许负数
    })
},
{
    header: "抵质押方式",
    dataIndex: "collateralCategory",
    width: 200,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['collateralCategory'];
        for (var i = 0; i < collateralCategory.size(); i++) {
            var obj = collateralCategory[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'collateralCategory',
        hiddenName: 'collateralCategory',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: collateralCategory
        }),
        valueField: 'key',
        displayField: 'value',
        mode: 'local',
        triggerAction: 'all',
        editable: false,
        selectOnFocus: true
    })
}]);
var collateralGrid = new Ext.grid.GridPanel({
    title: "保单相关押品信息管理",
    height: 200,
    /*tbar: new Ext.Toolbar({
        autoWidth: true,
        autoShow: true,
        items: [{
            "text": "添加押品",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Add",
            "handler": function() {
                var collateralAddWin = yp.collateralAddWin(true, false, '1', setCollateral);
                collateralAddWin.show();
            }
        },
        {
            "text": "查看押品",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Add",
            "handler": function() {

                var sm = collateralGrid.getSelectionModel(); // 得到表格的选择模型
                var cell = sm.getSelectedCell(); // 通过选择模型得到选择的单元格
                if (cell == null) {
                    Ext.MessageBox.alert("操作信息", "请选择一条记录!");
                    return;
                }
                var record = collateralGrid.getStore().getAt(cell[0]); // 得到store对应的Record
                var collateralAddWin = yp.collateralAddWin(record.data.collateralIdid, false,'1',editCollateral);
                var basicInfo = Ext.getCmp('collateralAddWin_basicInfoId');
                Ext.Ajax.request({
                    url: 'collateral_detail.action',
                    method: 'POST',
                    params: {
                        id: record.data.collateralIdid
                    },
                    success: function(d, e) {
                        var result = Ext.decode(d.responseText);
                        if (result.success) {
                            basicInfo.getForm().loadRecord(result);
                            var typeCode = result.data.rootType.typeCode + "" + result.data.trunkType.typeCode;
                            basicInfo.getForm().findField("typeCode").setValue(typeCode);
                            var indxParam = Crt.fuc.getValueBy(typeCode, Crt.constants.typeMap);
                            var typeInfo = Ext.getCmp('collateralAddWin_' + indxParam + 'Id');
                            hiddenAllForm();
                            if (typeInfo) {
                                typeInfo.show();
                                Ext.Ajax.request({
                                    url: indxParam + '_listBycollaterId.action',
                                    method: 'POST',
                                    params: {
                                        collateralId: record.data.collateralIdid
                                    },
                                    success: function(d, e) {
                                        var result2 = Ext.decode(d.responseText);
                                        if (result2.success) {
                                            typeInfo.getForm().loadRecord(result2);
                                            if (result2.data) typeInfo.getForm().findField(indxParam + "Id").setValue(result2.data.id);
                                        } else {
                                            Ext.MessageBox.alert("提示", "分类信息加载失败！");
                                        }
                                    },
                                    failure: function(d, e) {
                                        Ext.MessageBox.alert("提示", "分类信息加载失败，请联系管理员！");
                                    }
                                });
                            }
                            
                            basicInfo.getForm().findField("belongByName").setValue(result.data.belongBy.customerName);
                            basicInfo.getForm().findField("belongBy").setValue(result.data.belongBy.id);
                            basicInfo.getForm().findField("rootTypeName").setValue(result.data.rootType.typeName);
                            basicInfo.getForm().findField("trunkTypeName").setValue(result.data.trunkType.typeName);
                            basicInfo.getForm().findField("leafTypeName").setValue(result.data.leafType.typeName);
                            if (result.data) {

                            }
                        } else {
                            Ext.MessageBox.alert("提示", "加载失败！");
                        }
                    },
                    failure: function(d, e) {
                        Ext.MessageBox.alert("提示", "加载失败，请联系管理员！");
                    }
                });
                basicInfo.getForm().findField("collateralId").setValue(record.data.collateralIdid);
                //加载处置信息
                var managerInfo = Ext.getCmp('collateralAddWin_managementInfoId');
                Ext.Ajax.request({
                    url: 'collateralHandle_listBycollaterId.action',
                    method: 'POST',
                    params: {
                        collateralId: record.data.collateralIdid
                    },
                    success: function(d, e) {
                        var result = Ext.decode(d.responseText);
                        if (result.success) {
                            managerInfo.getForm().loadRecord(result);
                            if (result.data) managerInfo.getForm().findField("collateralHandleId").setValue(result.data.id);
                        } else {
                            Ext.MessageBox.alert("提示", "处置信息加载失败！");
                        }
                    },
                    failure: function(d, e) {
                        Ext.MessageBox.alert("提示", "处置信息加载失败，请联系管理员！");
                    }
                });
                collateralAddWin.show();
            }
        },
        {
            "text": "删除押品",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Delete",
            "handler": function() {
                Ext.Msg.confirm('信息', '确定要删除',
                function(btn) {
                    if (btn == 'yes') {
                        var sm = collateralGrid.getSelectionModel(); // 得到表格的选择模型
                        var cell = sm.getSelectedCell(); // 通过选择模型得到选择的单元格
                        if (cell == null) {
                            Ext.MessageBox.alert("操作信息", "请选择一条记录!");
                            return;
                        }
                        var record = collateralGrid.getStore().getAt(cell[0]); // 得到store对应的Record
                        collateralGrid.getStore().remove(record);
                    }
                });
            }
        }]
    }),*/
    width: screenWidth,
    cm: collateralColM,
    store: collateralStore
});

var guarantorData = Ext.decode(pdi.guarantorsString);
var guarantorStore = new Ext.data.JsonStore({
    data: guarantorData,
    fields: ["id", {
        name: 'customerIdcustomerName',
        mapping: 'customerId.customerName',
        type: 'string'
    },
    {
        name: 'ecifId',
        mapping: 'customerId.ecifId',
        type: 'string'
    },
    {
        name: 'customerIdid',
        mapping: 'customerId.id',
        type: 'string'
    },
    {
        name: 'customerId',
        type: 'object'
    },
    "guarantorValue", "guarantorSequence", "guarantorType", "guarantorWay", "relationship"

    ]
});
var guarantorColM = new Ext.grid.ColumnModel([{
    header: "担保人编号",
    dataIndex: "customerIdid",
    sortable: true,
    hidden: true,
    width: 160
},
{
    header: "担保人编号",
    dataIndex: "ecifId",
    sortable: true,
    width: 160
},
{
    header: "担保人名称",
    dataIndex: "customerIdcustomerName",
    sortable: true,
    width: 100

},
{
    header: "担保金额(元)",
    dataIndex: "guarantorValue",
    width: 100,
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        maxValue: 999999999999.99,
        decimalPrecision: 2,
        // 小数点后位数,
        allowNegative: false
        // 是否允许负数
    })
},
{
    header: "担保人/企业类型",
    dataIndex: "guarantorType",
    width: 200,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['guarantorType'];
        for (var i = 0; i < humanNature.size(); i++) {
            var obj = humanNature[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'guarantorType',
        hiddenName: 'guarantorType',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: humanNature
        }),
        valueField: 'key',
        displayField: 'value',
        mode: 'local',
        triggerAction: 'all',
        editable: false,
        selectOnFocus: true
    })
},
{
    header: "与投保人关系",
    dataIndex: "relationship",
    width: 200,
    editor: new Ext.form.TextField({
        maxLength: 80
    })
},
{
    header: "担保人顺序",
    dataIndex: "guarantorSequence",
    width: 200,
    editor: new Ext.form.TextField({
        maxLength: 100
    })
},
{
    header: "担保方式",
    dataIndex: "guarantorWay",
    width: 200,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['guarantorWay'];
        for (var i = 0; i < guarantorWay.size(); i++) {
            var obj = guarantorWay[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'guarantorWay',
        hiddenName: 'guarantorWay',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: guarantorWay
        }),
        valueField: 'key',
        displayField: 'value',
        mode: 'local',
        triggerAction: 'all',
        editable: false,
        selectOnFocus: true
    })
}]);
var guarantorGrid = new Ext.grid.GridPanel({
    title: "保单相关担保人信息管理",
    height: 200,
    /*tbar: new Ext.Toolbar({
        autoWidth: true,
        autoShow: true,
        items: [{
            "text": "添加担保人",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Add",
            "handler": function() {
                xinzengallkehunew(setGuarantorGrid);
            }
        },
        {
            "text": "删除担保人",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Delete",
            "handler": function() {
                Ext.Msg.confirm('信息', '确定要删除',
                function(btn) {
                    if (btn == 'yes') {
                        var sm = guarantorGrid.getSelectionModel(); // 得到表格的选择模型
                        var cell = sm.getSelectedCell(); // 通过选择模型得到选择的单元格
                        if (cell == null) {
                            Ext.MessageBox.alert("操作信息", "请选择一条记录!");
                            return;
                        }
                        var record = guarantorGrid.getStore().getAt(cell[0]); // 得到store对应的Record
                        guarantorGrid.getStore().remove(record);
                    }
                });
            }
        },
        {
            "text": "查看担保人详细信息",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Update",
            "handler": function() {
                var sm = guarantorGrid.getSelectionModel(); // 得到表格的选择模型
                var cell = sm.getSelectedCell(); // 通过选择模型得到选择的单元格
                if (cell == null) {
                    Ext.MessageBox.alert("操作信息", "请选择担保人",
                    function() {
                        return;
                    });
                } else {
                    var record = guarantorGrid.getStore().getAt(cell[0]);
                    var userID = record.data.customerIdid;
                    if (userID == "" || userID == null) {
                        Ext.MessageBox.alert("操作信息", "该用户不存在或尚未选择用户");
                    } else {
                        chakan(userID);
                    }
                }
            }
        }]
    }),*/
    width: screenWidth,
    cm: guarantorColM,
    store: guarantorStore
});
/**
 * 保单新增 保存草稿
 */
function savePolicyCG() {
    setAllowBlankTrue();
    var b = Ext.getCmp('policyView');
    if (b.getForm().isValid()) {

        var data = Ext.util.JSON.encode(b.getForm().getValues(false));
        if (this.id == null && this.id == "") {
            data.id = null;
        }
        // 担保人信息获取
        var guarantorArray = new Array();
        for (var i = 0,
        len = guarantorGrid.getStore().data.length; i < len; i++) {
            var guarantorData = guarantorGrid.getStore().getAt(i).data;
            var gudata = {
                id: ""
            };
            gudata.id = guarantorData.customerIdid;
            var gp = {
                id: "",
                customerId: '',
                relationship: guarantorData.relationship,
                guarantorValue: guarantorData.guarantorValue,
                guarantorSequence: guarantorData.guarantorSequence,
                guarantorType: guarantorData.guarantorType,
                guarantorWay: guarantorData.guarantorWay
            };
            guarantorArray[i] = gp;
            guarantorArray[i].customerId = gudata;
        }
        var guarantorString = Ext.util.JSON.encode(guarantorArray);
        // 押品信息获取
        var collateralArray = new Array();
        for (var i = 0,
        len = collateralGrid.getStore().data.length; i < len; i++) {
            var collateralData = collateralGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
            var coldata = {
                id: ""
            };
            coldata.id = collateralData.collateralIdid;
            var p = {
                id: "",
                collateralId: '',
                effectiveDate: collateralData.effectiveDate,
                mortgageRate: collateralData.mortgageRate,
                collateralCategory: collateralData.collateralCategory,
                contractNo: collateralData.contractNo
            };
            collateralArray[i] = p;
            collateralArray[i].collateralId = coldata;
        }
        var collateralPolicyrelatString = Ext.util.JSON.encode(collateralArray);
        // 附加险信息获取
        var policyPolicyArray = new Array();
        if ("9901127" == Ext.getCmp('policyView').getForm().findField('policy.mainClause').getValue() || "9901296" == Ext.getCmp('policyView').getForm().findField('policy.mainClause').getValue() || "9901298" == Ext.getCmp('policyView').getForm().findField('policy.mainClause').getValue() || "9901301" == Ext.getCmp('policyView').getForm().findField('policy.mainClause').getValue()) {
            for (var i = 0,
            len = policyPolicyGrid.getStore().data.length; i < len; i++) {
                var policyPolicyData = policyPolicyGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
                policyPolicyArray[i] = policyPolicyData;
            }
        }
        var policyPolicyString = Ext.util.JSON.encode(policyPolicyArray);
        b.getForm().submit({
            method: "POST",
            url: "policy_save.action",
            clientValidation: false,
            waitMsg: "正在提交数据...",
            params: {
                policyStatus: '0',
                policyform: data,
                guarantorString: "gu#" + guarantorString,
                policypolicyString: "pp#" + policyPolicyString,
                collateralPolicyrelatString: "cp#" + collateralPolicyrelatString
            },

            success: function(d, g) {
                if (g.result.success) {
                    var mes = "成功保存信息,状态更新为草稿！";
                    Ext.MessageBox.alert("操作信息", mes,
                    function() {
                        parent.Ext.getCmp("policyEditWin").close();
                    });
                }
            },
            failure: function(d, e) {
                Ext.MessageBox.show({
                    title: "操作信息",
                    msg: "信息保存出错，请联系管理员！",
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    } else {
        checkVtype();
    }
}

/**
 * 保单新增 保存
 */

function savePolicy() {
	if(!checkInsuranceType()){
		return;
	}
    if (!Ext.getCmp("addPolicyFieldSet").hidden) {
        if (!checkEditorGrid(policyPolicyGrid)) {
            return;
        }
    }

    if (!Ext.getCmp("guarantorFieldSet").hidden) {
        if (!checkEditorGrid(guarantorGrid)) {
            return;
        }
    }
    if (!Ext.getCmp("collateralFieldSet").hidden) {
        if (!checkEditorGrid(collateralGrid)) {
            return;
        }
    }
    setAllowBlankFalse();
    var b = Ext.getCmp('policyView');
    var _value = Ext.getCmp("policyAssuredType").getValue();
    if (b.getForm().isValid()) {
        var data = Ext.util.JSON.encode(b.getForm().getValues(false));
        if (this.id == null && this.id == "") {
            data.id = null;
        }
        // 担保人信息获取
        var guarantorArray = new Array();
        for (var i = 0,
        len = guarantorGrid.getStore().data.length; i < len; i++) {
            var guarantorData = guarantorGrid.getStore().getAt(i).data;
            var gudata = {
                id: ""
            };
            gudata.id = guarantorData.customerIdid;
            var gp = {
                id: "",
                customerId: '',
                relationship: guarantorData.relationship,
                guarantorValue: guarantorData.guarantorValue,
                guarantorSequence: guarantorData.guarantorSequence,
                guarantorType: guarantorData.guarantorType,
                guarantorWay: guarantorData.guarantorWay
            };
            guarantorArray[i] = gp;
            guarantorArray[i].customerId = gudata;
        }
        var guarantorString = Ext.util.JSON.encode(guarantorArray);
        // 押品信息获取
        var collateralArray = new Array();
        for (var i = 0,
        len = collateralGrid.getStore().data.length; i < len; i++) {
            var collateralData = collateralGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
            var coldata = {
                id: ""
            };
            coldata.id = collateralData.collateralIdid;
            var p = {
                id: "",
                collateralId: '',
                effectiveDate: collateralData.effectiveDate,
                mortgageRate: collateralData.mortgageRate,
                collateralCategory: collateralData.collateralCategory,
                contractNo: collateralData.contractNo
            };
            collateralArray[i] = p;
            collateralArray[i].collateralId = coldata;
        }
        var collateralPolicyrelatString = Ext.util.JSON.encode(collateralArray);
        // 附加险信息获取
        var policyPolicyArray = new Array();
        if ("9901127" == Ext.getCmp('policyView').getForm().findField('policy.mainClause').getValue() || "9901296" == Ext.getCmp('policyView').getForm().findField('policy.mainClause').getValue() || "9901298" == Ext.getCmp('policyView').getForm().findField('policy.mainClause').getValue() || "9901301" == Ext.getCmp('policyView').getForm().findField('policy.mainClause').getValue()) {
            for (var i = 0,
            len = policyPolicyGrid.getStore().data.length; i < len; i++) {
                var policyPolicyData = policyPolicyGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
                policyPolicyArray[i] = policyPolicyData;
            }
        }
        var policyPolicyString = Ext.util.JSON.encode(policyPolicyArray);

        b.getForm().submit({
            method: "POST",
            url: "policy_save.action",
            waitMsg: "正在提交数据...",
            params: {
                policyStatus: '1',
                policyform: data,
                guarantorString: "gu#" + guarantorString,
                policypolicyString: "pp#" + policyPolicyString,
                collateralPolicyrelatString: "cp#" + collateralPolicyrelatString
            },

            success: function(d, g) {
                if (g.result.success) {
                    var mes = "成功保存信息,状态更新为待提交！";
                    if (pdi.policy.isSurvey == '1') {
                        mes = "成功保存信息";
                    }
                    Ext.MessageBox.alert("操作信息", mes,
                    function() {
                        if (parent.Ext.getCmp("policyEditWin") != null) {
                            parent.Ext.getCmp("policyEditWin").close();
                        }
                    });
                }
            },
            failure: function(d, e) {
                Ext.MessageBox.show({
                    title: "操作信息",
                    msg: "信息保存出错，请联系管理员！",
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    } else {
        checkVtype();
    }
}
/**
 * 保单提交
 */
function submitPolicy() {
    var b = Ext.getCmp('policyView');
    var _value = Ext.getCmp("policyAssuredType").getValue();
    if ("1" == _value) {
        if (Ext.getCmp("policy.creditCode").getValue().trim() == '' && Ext.getCmp("policy.orgCode").getValue().trim() == '') {
            Ext.MessageBox.alert("操作信息", "机构代码、机构信用代码不能全部为空,请修改被保险人客户信息并重新引入!",
            function() {
                Ext.getCmp("policy.creditCode").focus(true, true);
            });
            return;
        }
    }
    if (b.getForm().isValid()) {
        var data = Ext.util.JSON.encode(b.getForm().getValues(false));
        if (this.id == null && this.id == "") {
            data.id = null;
        }
        // 担保人信息获取
        var guarantorArray = new Array();
        for (var i = 0,
        len = guarantorGrid.getStore().data.length; i < len; i++) {
            var guarantorData = guarantorGrid.getStore().getAt(i).data;
            var gudata = {
                id: ""
            };
            gudata.id = guarantorData.customerIdid;
            var gp = {
                id: "",
                customerId: '',
                guarantorValue: guarantorData.guarantorValue,
                guarantorSequence: guarantorData.guarantorSequence,
                guarantorType: guarantorData.guarantorType
            };
            guarantorArray[i] = gp;
            guarantorArray[i].customerId = gudata;
        }
        var guarantorString = Ext.util.JSON.encode(guarantorArray);
        // 押品信息获取
        var collateralArray = new Array();
        for (var i = 0,
        len = collateralGrid.getStore().data.length; i < len; i++) {
            var collateralData = collateralGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
            var coldata = {
                id: ""
            };
            coldata.id = collateralData.collateralIdid;
            var p = {
                id: "",
                collateralId: '',
                effectiveDate: collateralData.effectiveDate,
                mortgageRate: collateralData.mortgageRate,
                collateralCategory: collateralData.collateralCategory,
                contractNo: collateralData.contractNo
            };
            collateralArray[i] = p;
            collateralArray[i].collateralId = coldata;
        }
        var collateralPolicyrelatString = Ext.util.JSON.encode(collateralArray);
        // 附加险信息获取
        var policyPolicyArray = new Array();
        for (var i = 0,
        len = policyPolicyGrid.getStore().data.length; i < len; i++) {
            var policyPolicyData = policyPolicyGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
            var pp = {
                id: '',
                insuranceType: "",
                mainClause: "",
                policyCost: "",
                policyValue: '',
                policyRate: '',
                remark: ''
            };
            policyPolicyArray[i] = pp;
            policyPolicyArray[i].insuranceType = policyPolicyData.insuranceType;
            policyPolicyArray[i].mainClause = policyPolicyData.mainClause;
            policyPolicyArray[i].policyValue = policyPolicyData.policyValue;
            policyPolicyArray[i].policyCost = policyPolicyData.policyCost;
            policyPolicyArray[i].policyRate = policyPolicyData.policyRate;
            policyPolicyArray[i].remark = policyPolicyData.remark;
        }
        var policyPolicyString = Ext.util.JSON.encode(policyPolicyArray);
        b.getForm().submit({
            method: "POST",
            url: "policy_submit.action",
            waitMsg: "正在提交数据...",
            params: {
                policyform: data,
                guarantorString: "gu#" + guarantorString,
                policypolicyString: "pp#" + policyPolicyString,
                collateralPolicyrelatString: "cp#" + collateralPolicyrelatString
            },

            success: function(d, g) {
                var mes = "成功保存信息！";
                Ext.MessageBox.alert("操作信息", mes,
                function() {
                    parent.Ext.getCmp("policyEditWin").close();
                });

            },
            failure: function(d, e) {
                Ext.MessageBox.show({
                    title: "操作信息",
                    msg: "信息保存出错，请联系管理员！",
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    } else {
        checkVtype();
    }

}
policyView = Ext.extend(Ext.form.FormPanel, {
    constructor: function(a) {
        Ext.applyIf(this, a);
        policyView.superclass.constructor.call(this, {
            id: "policyView",
            autoScroll: true,
            buttonAlign: 'center'
            /* buttons: [{
                text: "草稿",
                iconCls: "btn-save",
                hidden: pdi.policy.isSurvey == '1' ? true: false,
                handler: savePolicyCG

            },
            {
                text: "保存",
                iconCls: "btn-save",
                handler: savePolicy

            }*/
           /* {
                text: "取消",
                hidden: pdi.policy.isSurvey == '1' ? true: false,
                iconCls: "btn-cancel",
                handler: function() {
                    Ext.Msg.confirm("信息确认", "您确认要取消吗？",
                    function(c) {
                        if (c == "yes") {
                            window.parent.Ext.getCmp("policyEditWin").close();
                        }
                    });
                }
            }]*/,
            border: true,
            bodyStyle: "padding: 5px",
            frame: true,
            defaultType: "textfield",
            readOnly: true,
            items: [
            // 保险信息
            new Ext.form.FieldSet({
                title: '保险信息',
                columnWidth: .1,
                height: '100%',
                layout: 'column',
                border: true,
                anchor: '100%',
                labelWidth: 100,
                items: [{
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'policy.policyNo',
                        fieldLabel: '投保单号',
                        xtype: 'textfield',
                        disabled: false,
                        readOnly: true,
                        value: pdi.policy.policyNo,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'policy.mainClause',
                        fieldLabel: '产品',
                        hiddenName: 'policy.mainClause',
                        id: "policy.mainClauseName",
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: mainClause
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        allowBlank: false,
                        readOnly: true,
                        value: pdi.policy.mainClause,
                        width: eleWidth,
                        listeners: {
                            "change": function() {
                                policyPolicyGrid.getStore().removeAll();
                                var _value = Ext.getCmp('policyView').getForm().findField('policy.mainClause').getValue();
                                var _insuranceType = "";
                                for (var i = 0; i < mainClause.size(); i++) {
                                    var obj = mainClause[i];
                                    if (_value == obj[0]) {
                                        _insuranceType = obj[1];
                                        break;
                                    }
                                }
                                _insuranceType = _insuranceType.substr(0, 4);
                                /**
                                 * 设置险种以及可编辑列表的显示及隐藏
                                 */
                                insuranceTypeSet(_insuranceType);
                                Ext.getCmp("policy.insuranceType").setValue(_insuranceType);
                                /**
                                 * 根据产品判断是否有附加险
                                 */
                                if ("9901296" == _value || "9901127" == _value || "9901298" == _value || "9901301" == _value) {
                                    Ext.getCmp("addPolicyFieldSet").show();
                                } else {
                                    Ext.getCmp("addPolicyFieldSet").hide();
                                }
                                /**
								 * 根据产品重置附加险主条款
								 */
                                var gridMainClause = Ext.getCmp("gridMainClause");
                                var currentMainClause = [];
                                var i = 0;
                                if (_value == '9901296') {
                                    Ext.getCmp("carloan.payOffLong").allowBlank = true;
                                    for (var n = 0; n < accessoryRisk.length; n++) {
                                        if (accessoryRisk[n][0] == '9901297') {
                                            currentMainClause[i] = accessoryRisk[n];
                                            i = i + 1;
                                        }
                                    }
                                } else if (_value == "9901228") {
                                    Ext.getCmp("carloan.payOffLong").allowBlank = true;
                                } else if (_value == "9901127") {
                                    for (var n = 0; n < accessoryRisk.length; n++) {
                                        if (accessoryRisk[n][0] == '9901130' || accessoryRisk[n][0] == '9901129') {
                                            currentMainClause[i] = accessoryRisk[n];
                                            i = i + 1;
                                        }
                                    }
                                } else if (_value == "9901298") {
                                    for (var n = 0; n < accessoryRisk.length; n++) {
                                        if (accessoryRisk[n][0] == '9901299' || accessoryRisk[n][0] == '9901300') {
                                            currentMainClause[i] = accessoryRisk[n];
                                            i = i + 1;
                                        }
                                    }
                                } else if (_value == "9901301") {
                                    for (var n = 0; n < accessoryRisk.length; n++) {
                                        if (accessoryRisk[n][0] == '9901302' || accessoryRisk[n][0] == '9901303') {
                                            currentMainClause[i] = accessoryRisk[n];
                                            i = i + 1;
                                        }
                                    }
                                }
                                gridMainClause.reset();
                                gridMainClause.store.removeAll();
                                gridMainClause.store.loadData(currentMainClause, true);
                                /**
                                 * 必输项修改
                                 */
                                if ("9901298" == _value || "9901301" == _value) {
                                    Ext.getCmp('policyView').getForm().findField('policy.loanRate').allowBlank = false;
                                    Ext.getCmp('policyView').getForm().findField('policy.loanRate').show();
                                    Ext.getCmp("loanRateParent").show();
                                } else {
                                    Ext.getCmp('policyView').getForm().findField('policy.loanRate').allowBlank = true;
                                    Ext.getCmp('policyView').getForm().findField('policy.loanRate').hide();
                                    Ext.getCmp("loanRateParent").hide();
                                }

                                if (_value == '2205103') {
                                    Ext.getCmp("carloan.carUseID").setValue("0");
                                    Ext.getCmp("carloan.lineStabilityID").hide();
                                    Ext.getCmp("carloan.runAge").hide();
                                }
                                // 营业用车
                                else if (_value == '2205101' || _value == '2205102') {
                                    Ext.getCmp("carloan.carUseID").setValue("1");
                                    Ext.getCmp("carloan.lineStabilityID").show();
                                    Ext.getCmp("carloan.lineStabilityID").allowBlank = false;
                                    Ext.getCmp("carloan.runAge").show();
                                }
                                if (! (_value == '2205101' || _value == '2205102')) {
                                    Ext.getCmp("carloan.lineStabilityID").allowBlank = true;
                                }
                                // 清偿时间
                                if (_value == '2205101' || _value == '2205102' || _value == '2205103') {
                                    Ext.getCmp("carloan.payOffLong").allowBlank = false;
                                    Ext.getCmp("carloan.firstPaymentID").allowBlank = false;

                                } else {
                                    Ext.getCmp("carloan.payOffLong").allowBlank = true;
                                    Ext.getCmp("carloan.firstPaymentID").allowBlank = true;
                                }
                                Ext.getCmp('policyView').getForm().findField('policy.projectId').setValue("");
                            }
                        }
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                    	readOnly: true,
                        fieldLabel: '项目',
                        name: 'policy.projectId',
                        hiddenName: 'policy.projectId',
                        valueField: 'code',
                        displayField: 'name',
                        store: projectStore,
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: pdi.policy.projectId,
                        width: eleWidth,
                        listeners: {
                            focus: function() {
                                var value = Ext.getCmp('policyView').getForm().findField('policy.mainClause').getValue();
                                projectStore.proxy = new Ext.data.HttpProxy({
                                    url: 'get_relat_project.action?projectProduce=' + value
                                });
                                projectStore.load();
                            }
                        }
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [new Ext.form.ComboBox({
                        name: 'policy.policyCurrency',
                        readOnly: true,
                        fieldLabel: '币别 ',
                        hiddenName: 'policy.policyCurrency',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: ccyKey
                        }),
                        allowBlank: false,
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: pdi.policy.policyCurrency,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'policy.policyValue',
                        readOnly: true,
                        fieldLabel: '保险金额(元)',
                        id: "policy.policyValue",
                        xtype: 'numberfield',
                        allowBlank: false,
                        maxValue: 999999999999.99,
                        minValue: 1,
                        allowDecimals: true,
                        decimalPrecision: 2,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        value: pdi.policy.policyValue,
                        width: eleWidth,
                        listeners: {
                            "change": function() {
                                var _valuePolicyRate = Ext.getCmp('policy.policyRate').getValue();
                                var _valueRegulationFactor = Ext.getCmp('policy.regulationFactor').getValue();
                                var _valuePolicyValue = Ext.getCmp('policy.policyValue').getValue();
                                Ext.getCmp("policy.policyCost").setValue(_valuePolicyRate * _valueRegulationFactor * _valuePolicyValue / 100);
                            }
                        }
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'policy.policyRate',
                        id: "policy.policyRate",
                        readOnly: true,
                        fieldLabel: '费率(%)',
                        xtype: 'numberfield',
                        allowBlank: false,
                        allowDecimals: true,
                        decimalPrecision: 5,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        maxValue: 100,
                        value: pdi.policy.policyRate,
                        width: eleWidth,
                        listeners: {
                            "change": function() {
                                var _valuePolicyRate = Ext.getCmp('policy.policyRate').getValue();
                                var _valueRegulationFactor = Ext.getCmp('policy.regulationFactor').getValue();
                                var _valuePolicyValue = Ext.getCmp('policy.policyValue').getValue();
                                Ext.getCmp("policy.policyCost").setValue(_valuePolicyRate * _valueRegulationFactor * _valuePolicyValue / 100);
                            }
                        }
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'policy.regulationFactor',
                        readOnly: true,
                        fieldLabel: '调整系数',
                        xtype: 'numberfield',
                        allowDecimals: true,
                        allowBlank: false,
                        id: "policy.regulationFactor",
                        decimalPrecision: 4,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        maxValue: 100,
                        value: pdi.policy.regulationFactor,
                        width: eleWidth,
                        listeners: {
                            "change": function() {
                                var _valuePolicyRate = Ext.getCmp('policy.policyRate').getValue();
                                var _valueRegulationFactor = Ext.getCmp('policy.regulationFactor').getValue();
                                var _valuePolicyValue = Ext.getCmp('policy.policyValue').getValue();
                                Ext.getCmp("policy.policyCost").setValue(_valuePolicyRate * _valueRegulationFactor * _valuePolicyValue / 100);
                            }
                        }
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'policy.policyCost',
                        fieldLabel: '保费(元)',
                        xtype: 'numberfield',
                        allowBlank: false,
                        id: "policy.policyCost",
                        readOnly: true,
                        allowDecimals: true,
                        decimalPrecision: 2,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数,
                        value: pdi.policy.policyCost,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'policy.policyPeriod',
                        readOnly: true,
                        fieldLabel: '保险期间(月)',
                        id: 'policy.policyPeriod',
                        xtype: 'numberfield',
                        disabled: false,
                        editable: false,
                        vtype: 'vNum',
                        vtypeText: '请正确输入保险期间（整数）',
                        maxLength: 5,
                        minValue: 1,
                        maxLengthText: '长度不大于5',
                        value: pdi.policy.policyPeriod,
                        width: eleWidth,
                        listeners: {
                            "change": function() {
                                var _valuePolicyStart = Ext.getCmp('policy.policyStart').getValue();
                                if ("" != _valuePolicyStart && null != _valuePolicyStart) {
                                    var _valuePolicyPeriod = Ext.getCmp('policy.policyPeriod').getValue();
                                    _valuePolicyStart.setMonth(_valuePolicyStart.getMonth() + _valuePolicyPeriod);
                                    _valuePolicyStart.setDate(_valuePolicyStart.getDate() - 1);
                                    _valuePolicyStart.setHours(23);
                                    _valuePolicyStart.setMinutes(59);
                                    _valuePolicyStart.setSeconds(59);
                                    Ext.getCmp('policy.policyEnd').setValue(_valuePolicyStart);
                                }
                            }
                        }
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'policy.policyStart',
                        readOnly: true,
                        fieldLabel: '保险起期',
                        id: "policy.policyStart",
                        xtype: 'datefield',
                        format: 'Y-m-d',
                        emptyText: '',
                        editable: false,
                        altFormats: 'YYYY-mm-dd',
                        disabled: false,
                        value: pdi.policy.policyStart,
                        width: eleWidth,
                        listeners: {
                            "change": function() {
                                var _valuePolicyStart = Ext.getCmp('policy.policyStart').getValue();
                                var _valuePolicyPeriod = Ext.getCmp('policy.policyPeriod').getValue();
                                _valuePolicyStart.setMonth(_valuePolicyStart.getMonth() + _valuePolicyPeriod);
                                _valuePolicyStart.setDate(_valuePolicyStart.getDate() - 1);
                                _valuePolicyStart.setHours(23);
                                _valuePolicyStart.setMinutes(59);
                                _valuePolicyStart.setSeconds(59);
                                Ext.getCmp('policy.policyEnd').setValue(_valuePolicyStart);
                            }
                        }
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'policy.policyEnd',
                        id: 'policy.policyEnd',
                        fieldLabel: '保险止期',
                        xtype: 'datefield',
                        disabled: false,
                        editable: false,
                        format: 'Y-m-d',
                        emptyText: '',
                        readOnly: true,
                        value: pdi.policy.policyEnd,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'policy.deductibleFranchise',
                        readOnly: true,
                        fieldLabel: '绝对免赔率(%)',
                        xtype: 'numberfield',
                        allowDecimals: true,
                        //hidden:true,
                        decimalPrecision: 4,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        maxValue: 100,
                        //allowBlank : false,
                        value: pdi.policy.deductibleFranchise,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [new Ext.form.ComboBox({
                        name: 'policy.payMode',
                        readOnly: true,
                        fieldLabel: '保费缴纳方式 ',
                        hiddenName: 'policy.payMode',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: payMode
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: pdi.policy.payMode,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [new Ext.form.ComboBox({
                        name: 'policy.signCurrency',
                        readOnly: true,
                        fieldLabel: '签单币别 ',
                        hiddenName: 'policy.signCurrency',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: ccyKey
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        allowBlank: false,
                        value: pdi.policy.signCurrency,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [new Ext.form.ComboBox({
                        name: 'policy.standardMoney',
                       
                        fieldLabel: '本位币 ',
                        hiddenName: 'policy.standardMoney',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: ccyKey
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        readOnly: true,
                        editable: false,
                        allowBlank: false,
                        selectOnFocus: true,
                        value: pdi.policy.standardMoney,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'policy.bankCode',
                        id: "policy.bankCode",
                        readOnly: true,
                        fieldLabel: '贷款银行代码',
                        xtype: 'textfield',
                        maxLength: 12,
                        hidden: true,
                        value: pdi.policy.bankCode,
                        maxLengthText: "最大长度12",
                        allowBlank: true,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'policy.bankName',
                        readOnly: true,
                        fieldLabel: '贷款银行名称',
                        xtype: 'textfield',
                        maxLength: 120,
                        hidden: true,
                        maxLengthText: "最大长度120",
                        value: pdi.policy.bankName,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'policy.leaseTime',
                        readOnly: true,
                        fieldLabel: '贷款期限(月)',
                        xtype: 'numberfield',
                        value: pdi.policy.leaseTime,
                        allowDecimals: false,
                        hidden: true,
                        allowNegative: false,
                        // 是否允许负数
                        maxValue: 1000,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'policy.leaseContract',
                        readOnly: true,
                        fieldLabel: '借款合同号',
                        value: pdi.policy.leaseContract,
                        xtype: 'textfield',
                        maxLength: 32,
                        hidden: true,
                        maxLengthText: "贷款合同号大于32位",
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [new Ext.form.ComboBox({
                        name: 'policy.creditUse',
                        readOnly: true,
                        fieldLabel: '贷款用途 ',
                        hiddenName: 'policy.creditUse',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: creditUse
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        allowBlank: false,
                        triggerAction: 'all',
                        value: pdi.policy.creditUse,
                        editable: false,
                        selectOnFocus: true,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'policy.leaseValue',
                        readOnly: true,
                        fieldLabel: '贷款金额',
                        value: pdi.policy.leaseValue,
                        xtype: 'numberfield',
                        allowBlank: false,
                        allowDecimals: true,
                        maxValue: 999999999999.99,
                        minValue: 1,
                        decimalPrecision: 2,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    id: 'loanRateParent',
                    items: [{
                        name: 'policy.loanRate',
                        readOnly: true,
                        fieldLabel: '贷款年利率(%)',
                        xtype: 'numberfield',
                        allowBlank: false,
                        allowDecimals: true,
                        value: pdi.policy.loanRate,
                        decimalPrecision: 2,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        maxValue: 100,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'policy.loanScore',
                        readOnly: true,
                        fieldLabel: '贷款评分',
                        xtype: 'textfield',
                        value: pdi.policy.loanScore,
                        maxLength: 60,
                        maxLengthText: "最大长度60",
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [new Ext.form.ComboBox({
                        name: 'policy.repaymentMethod',
                        readOnly: true,
                        fieldLabel: '还款方式 ',
                        hiddenName: 'policy.repaymentMethod',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: repaymentMethod
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        allowBlank: false,
                        triggerAction: 'all',
                        value: pdi.policy.repaymentMethod,
                        editable: false,
                        selectOnFocus: true,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'policy.waitingPeriod',
                        readOnly: true,
                        fieldLabel: '还款等待期(天)',
                        xtype: 'numberfield',
                        maxLength: 5,
                        allowDecimals: false,
                        allowBlank: false,
                        allowNegative: false,
                        // 是否允许负数
                        maxLengthText: "还款等待期长度大于5",
                        value: pdi.policy.waitingPeriod,
                        width: eleWidth
                    }]
                },
                {
                    name: "policy.id",
                    xtype: "hidden",
                    value: pdi.policy.id
                }]
            }),
            // 保险信息结束
            // 附加险信息
            new Ext.form.FieldSet({
                title: '相关附加险信息',
                columnWidth: .1,
                id: "addPolicyFieldSet",
                height: 300,
                layout: 'column',
                border: true,
                anchor: '100%',
                labelWidth: 100,
                items: [policyPolicyGrid]
            }), 
            // 附加险信息结束
            // 车贷险专属信息
            new Ext.form.FieldSet({
                title: '车贷险专属信息',
                columnWidth: .1,
                height: "100%",
                layout: 'column',
                id: 'carFieldSet',
                border: true,
                anchor: '100%',
                labelWidth: 100,
                items: [{
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.distributorName',
                        fieldLabel: '汽车经销商',
                        id: 'carloan.distributorName',
                        value: pdi.carloan.distributorName,
                        maxLength: 100,
                        maxLengthText: "汽车经销商长度超过100",
                        xtype: 'textfield',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.distributorAddress',
                        readOnly: true,
                        fieldLabel: '地址',
                        id: 'carloan.distributorAddress',
                        value: pdi.carloan.distributorAddress,
                        maxLength: 100,
                        maxLengthText: "汽车经销商地址长度超过100",
                        xtype: 'textfield',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.distributorTel',
                        readOnly: true,
                        fieldLabel: '电话',
                        id: 'carloan.distributorTel',
                        regex: /^\d+$/,
                        regexText: "电话号码只能为数字",
                        maxLength: 20,
                        maxLengthText: '电话长度超过20位',
                        value: pdi.carloan.distributorTel,
                        xtype: 'textfield',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.labelType',
                        fieldLabel: '厂牌型号',
                        readOnly: true,
                        value: pdi.carloan.labelType,
                        maxLength: 100,
                        maxLengthText: "厂牌型号长度超过100",
                        xtype: 'textfield',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [new Ext.form.ComboBox({
                        name: 'carloan.trafficType',
                        fieldLabel: '车辆种类 ',
                        readOnly: true,
                        hiddenName: 'carloan.trafficType',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: trafficType
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: pdi.carloan.trafficType,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.tonnageSeat',
                        fieldLabel: '座位/吨位',
                        readOnly: true,
                        maxLength: 100,
                        maxLengthText: "座位/吨位长度超过100",
                        value: pdi.carloan.tonnageSeat,
                        xtype: 'textfield',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.cleanPrice',
                        id: 'carloan.cleanPrice',
                        fieldLabel: '新车净价格(元)',
                        readOnly: true,
                        value: pdi.carloan.cleanPrice,
                        xtype: 'numberfield',
                        allowDecimals: true,
                        allowBlank: false,
                        decimalPrecision: 2,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.downPayment',
                        fieldLabel: '首付比例(%)',
                        readOnly: true,
                        value: pdi.carloan.downPayment,
                        id: "carloan.downPayment",
                        xtype: 'numberfield',
                        allowDecimals: true,
                        decimalPrecision: 2,
                        // 小数点后位数,
                        allowNegative: false,
                        allowBlank: false,
                        // 是否允许负数
                        maxValue: 100,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [new Ext.form.ComboBox({
                        name: 'carloan.firstPayment',
                        id: "carloan.firstPaymentID",
                        fieldLabel: '首付款是否自有',
                        readOnly: true,
                        hiddenName: 'carloan.firstPayment',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: yesorno
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        value: pdi.carloan.firstPayment,
                        mode: 'local',
                        allowBlank: false,
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [new Ext.form.ComboBox({
                        name: 'carloan.fundSource',
                        id: 'carloan.fundSourceID',
                        fieldLabel: '主要资金来源',
                        readOnly: true,
                        hiddenName: 'carloan.fundSource',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: fundSource
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        allowBlank: false,
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: pdi.carloan.fundSource,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.payOffLong',
                        id: 'carloan.payOffLong',
                        fieldLabel: '清偿时间(月)',
                        readOnly: true,
                        xtype: 'numberfield',
                        allowDecimals: false,
                        allowNegative: false,
                        allowBlank: false,
                        // 是否允许负数
                        maxValue: 100,
                        value: pdi.carloan.payOffLong,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [new Ext.form.ComboBox({
                        name: 'carloan.carUse',
                        id: 'carloan.carUseID',
                        fieldLabel: '购车用途 ',
                        hiddenName: 'carloan.carUse',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: carUse
                        }),
                        valueField: 'key',
                        readOnly: true,
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        value: pdi.carloan.carUse,
                        selectOnFocus: true,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.runAge',
                        id: 'carloan.runAge',
                        fieldLabel: '经营年限',
                        readOnly: true,
                        maxLength: 10,
                        maxLengthText: "长度超过10",
                        xtype: 'numberfield',
                        allowDecimals: false,
                        allowNegative: false,
                        // 是否允许负数
                        value: pdi.carloan.runAge,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.trafficCode',
                        fieldLabel: '车牌号码',
                        readOnly: true,
                        value: pdi.carloan.trafficCode,
                        maxLength: 50,
                        maxLengthText: "车牌号码长度超过50",
                        xtype: 'textfield',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.engineCode',
                        fieldLabel: '发动机号',
                        readOnly: true,
                        value: pdi.carloan.engineCode,
                        maxLength: 50,
                        maxLengthText: "发动机号长度超过50",
                        xtype: 'textfield',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.vinCode',
                        fieldLabel: '车架号/VIN码',
                        readOnly: true,
                        value: pdi.carloan.vinCode,
                        maxLength: 50,
                        maxLengthText: "车架号/VIN码长度超过50",
                        xtype: 'textfield',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [new Ext.form.ComboBox({
                        name: 'carloan.lineStability',
                        id: 'carloan.lineStabilityID',
                        fieldLabel: '客货运线路稳定性 ',
                        readOnly: true,
                        hiddenName: 'carloan.lineStability',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: lineStability
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        value: pdi.carloan.lineStability,
                        selectOnFocus: true,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .8,
                    layout: 'table',
                    border: false,
                    layoutConfig: {
                        columns: 8
                    },
                    items: [{
                        text: "新增引入车主客户",
                        xtype: 'button',
                        iconCls: "lb-cmd-Add",
                        anchor: '10%',
                        listeners: {
                            "click": function() {
                                xinzengallkehunew(setCarOwner);
                            }
                        }
                    },
                    {
                        text: "重置",
                        xtype: 'button',
                        iconCls: "btn-reset",
                        anchor: '10%',
                        listeners: {
                            "click": function() {
                                Ext.getCmp("carloan.carOwnerName").setValue("");
                                Ext.getCmp("carloan.carOwner").setValue("");
                                Ext.getCmp("carloan.carOwnerEcifId").setValue("");
                            }
                        }
                    },
                    {
                        text: "查看车主信息",
                        xtype: 'button',
                        iconCls: "x-btn-text lb-btn-advSearch",
                        anchor: '10%',
                        xtype: 'button',
                        listeners: {
                            "click": function() {
                                var userID = Ext.getCmp("carloan.carOwner").getValue();
                                if (userID == "" || userID == null) {
                                    Ext.MessageBox.alert("操作信息", "该用户不存在或尚未选择用户");
                                } else {
                                    chakan(userID);
                                }
                            }
                        }
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        id: "carloan.carOwnerEcifId",
                        fieldLabel: '车主客户代码',
                        readOnly: true,
                        width: eleWidth,
                        value: pdi.carloan.carOwnerEcifId,
                        xtype: 'textfield'
                    }]
                },
                {
                    name: 'carloan.carOwner',
                    id: "carloan.carOwner",
                    value: pdi.carloan.carOwner,
                    xtype: 'textfield',
                    hidden: true
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.carOwnerName',
                        id: "carloan.carOwnerName",
                        fieldLabel: '车主姓名',
                        readOnly: true,
                        width: eleWidth,
                        value: pdi.carloan.carOwnerName,
                        xtype: 'textfield'
                    }]
                },
                {
                    columnWidth: .8,
                    layout: 'table',
                    border: false,
                    layoutConfig: {
                        columns: 8
                    },
                    items: [{
                        text: "新增引入挂靠单位",
                        xtype: 'button',
                        iconCls: "lb-cmd-Add",
                        anchor: '10%',
                        listeners: {
                            "click": function() {
                                xinzengallkehunew(setAffiliatedEntity);
                            }
                        }

                    },
                    {
                        text: "重置",
                        xtype: 'button',
                        iconCls: "btn-reset",
                        anchor: '10%',
                        listeners: {
                            "click": function() {
                                Ext.getCmp("carloan.affiliatedEntityName").setValue("");
                                Ext.getCmp("carloan.affiliatedEntity").setValue("");
                                Ext.getCmp("carloan.affiliatedEntityEcifId").setValue("");
                            }
                        }
                    },
                    {
                        text: "查看挂靠单位信息",
                        xtype: 'button',
                        iconCls: "x-btn-text lb-btn-advSearch",
                        anchor: '10%',
                        xtype: 'button',
                        listeners: {
                            "click": function() {
                                var userID = Ext.getCmp("carloan.affiliatedEntity").getValue();
                                if (userID == "" || userID == null) {
                                    Ext.MessageBox.alert("操作信息", "该用户不存在或尚未选择用户");
                                } else {
                                    chakanqy(userID, setAffiliatedEntity);
                                }
                            }
                        }
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        id: "carloan.affiliatedEntityEcifId",
                        fieldLabel: '挂靠单位客户代码',
                        value: pdi.carloan.affiliatedEntityEcifId,
                        readOnly: true,
                        xtype: 'textfield',
                        width: eleWidth
                    }]
                },
                {
                    name: 'carloan.affiliatedEntity',
                    id: "carloan.affiliatedEntity",
                    value: pdi.carloan.affiliatedEntity,
                    xtype: 'textfield',
                    hidden: true
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: false,
                    items: [{
                        name: 'carloan.affiliatedEntityName',
                        id: "carloan.affiliatedEntityName",
                        fieldLabel: '挂靠单位名称',
                        value: pdi.carloan.affiliatedEntityName,
                        readOnly: true,
                        xtype: 'textfield',
                        width: eleWidth
                    }]
                },
                {
                    name: "carloan.id",
                    xtype: "hidden",
                    value: pdi.carloan.id
                }]
            }),
            // 车贷险专属信息结束
            // ----------保单相关人员基本信息--------------
            new Ext.form.FieldSet({
                title: '保单相关人员基本信息',
                columnWidth: .1,
                height: '100%',
                layout: 'table',
                border: true,
                anchor: '100%',
                labelWidth: 100,
                layoutConfig: {
                    columns: 3
                },
                items: [{
                    columnWidth: .8,
                    layout: 'table',
                    border: false,
                    layoutConfig: {
                        columns: 8
                    }/*,
                    items: [{
                        text: "新增投保人",
                        xtype: 'button',
                        iconCls: "lb-cmd-Add",
                        anchor: '10%',
                        listeners: {
                            "click": function() {
                                xinzengallkehunew(setPolicyHolder);
                            }
                        }
                    },
                    {
                        text: "查看投保人信息",
                        xtype: 'button',
                        iconCls: "x-btn-text lb-btn-advSearch",
                        anchor: '10%',
                        xtype: 'button',
                        listeners: {
                            "click": function() {
                                var userID = Ext.getCmp("policyPolicyHolder").getValue();
                                if (userID == "" || userID == null) {
                                    Ext.MessageBox.alert("操作信息", "该用户不存在或尚未选择用户");
                                } else {
                                    Ext.Ajax.request({
                                        url: 'getCustomerBycustId.action',
                                        params: {
                                            userID: userID
                                        },
                                        method: "POST",
                                        success: function(d, e) {
                                            var sss = d.responseText;
                                            if ('1' == sss) {
                                                chakan(userID);
                                            } else {
                                                if ('2' == sss) {
                                                    chakanqy(userID, setPolicyHolder);
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    },
                    {
                        text: "重置",
                        xtype: 'button',
                        iconCls: "btn-reset",
                        anchor: '10%',
                        listeners: {
                            "click": function() {
                                Ext.getCmp("policyPolicyHolder").setValue("");
                                Ext.getCmp("policyPolicyHolderEcifId").setValue("");
                                Ext.getCmp("policyPolicyHolderName").setValue("");
                                Ext.getCmp("customerCodeType").setValue("");

                            }
                        }
                    }]*/
                },
                
                {
                    hidden: true,
                    xtype: 'textfield',
                    name: 'policy.policyHolder',
                    id: 'policyPolicyHolder',
                    value: pdi.policy.policyHolder
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        fieldLabel: '投保人客户代码',
                        xtype: 'textfield',
                        editable: false,
                        id: 'policyPolicyHolderEcifId',
                        allowBlank: false,
                        readOnly: true,
                        disabled: false,
                        value: pdi.policy.policyHolderEcifId,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    border: true,
                    items: [{
                        id: 'policyPolicyHolderName',
                        fieldLabel: '投保人姓名',
                        editable: false,
                        readOnly: true,
                        allowBlank: false,
                        xtype: 'textfield',
                        value: pdi.policy.policyHolderName,
                        width: eleWidth
                    }]
                },
                {},
                {
                    columnWidth: .8,
                    layout: 'table',
                    border: false,
                    layoutConfig: {
                        columns: 8
                    }/*,
                    items: [{
                        text: "新增被投保人",
                        xtype: 'button',
                        iconCls: "lb-cmd-Add",
                        anchor: '10%',
                        listeners: {
                            "click": function() {
                                xinzengallkehunew(setAssuredCode);
                            }
                        }
                    },
                    {
                        text: "复制",
                        iconCls: "lb-cmd-Add",
                        anchor: '10%',
                        xtype: 'button',
                        listeners: {
                            "click": function() {
                                var _value = Ext.getCmp("customerCodeType").getValue();
                                if (_value == "1") {
                                    Ext.MessageBox.alert("操作信息", "请选择企业!");
                                } else if (_value == "2") {
                                    Ext.getCmp("policyAssuredName").setValue(Ext.getCmp("policyPolicyHolderName").getValue());
                                    Ext.getCmp("policyAssuredCodeEcifId").setValue(Ext.getCmp("policyPolicyHolderEcifId").getValue());
                                    Ext.getCmp("policyAssuredCode").setValue(Ext.getCmp("policyPolicyHolder").getValue());
                                }
                            }
                        }
                    },
                    {
                        text: "查看被投保人信息",
                        xtype: 'button',
                        iconCls: "x-btn-text lb-btn-advSearch",
                        anchor: '10%',
                        xtype: 'button',
                        listeners: {
                            "click": function() {
                                var userID = Ext.getCmp("policyAssuredCode").getValue();
                                if (userID == "" || userID == null) {
                                    Ext.MessageBox.alert("操作信息", "该用户不存在或尚未选择用户");
                                } else {
                                    Ext.Ajax.request({
                                        url: 'getCustomerBycustId.action',
                                        params: {
                                            userID: userID
                                        },
                                        method: "POST",
                                        success: function(d, e) {
                                            var sss = d.responseText;
                                            if ('1' == sss) {
                                                chakan(userID);
                                            } else {
                                                if ('2' == sss) {
                                                    chakanqy(userID, setAssuredCode);
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    },
                    {
                        text: "重置",
                        xtype: 'button',
                        iconCls: "btn-reset",
                        anchor: '10%',
                        listeners: {
                            "click": function() {
                                Ext.getCmp("policyAssuredCode").setValue("");
                                Ext.getCmp("policyAssuredCodeEcifId").setValue("");
                                Ext.getCmp("policyAssuredName").setValue("");
                                Ext.getCmp("policyAssuredType").setValue("");
                            }
                        }
                    }]*/
                },
                {},
                {
                    hidden: true,
                    xtype: 'textfield',
                    name: 'policy.assuredCode',
                    id: 'policyAssuredCode',
                    value: pdi.policy.assuredCode
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        fieldLabel: '被保险人客户代码',
                        id: 'policyAssuredCodeEcifId',
                        editable: false,
                        xtype: 'textfield',
                        allowBlank: false,
                        value: pdi.policy.assuredCodeEcifId,
                        readOnly: true,
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        id: 'policyAssuredName',
                        name: 'policy.assuredName',
                        fieldLabel: '被保险人姓名',
                        allowBlank: false,
                        xtype: 'textfield',
                        readOnly: true,
                        value: pdi.policy.assuredCodeName,
                        editable: false,
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'policy.assuredType',
                        fieldLabel: '被保险人类型',
                        readOnly: true,
                        hiddenName: 'policy.assuredType',
                        id: "policyAssuredType",
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: assuredType
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        allowBlank: false,
                        width: eleWidth,
                        selectOnFocus: true,
                        value: pdi.policy.assuredType,
                        listeners: {
                            "change": function() {
                                var _value = Ext.getCmp("policyAssuredType").getValue();
                                if ("1" == _value) {
                                    Ext.getCmp("policy.creditCode").enable();
                                    Ext.getCmp("policy.orgCode").enable();
                                } else {
                                    Ext.getCmp("policy.creditCode").disable();
                                    Ext.getCmp("policy.orgCode").disable();
                                }
                            }
                        }
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'policy.creditCode',
                        fieldLabel: '机构信用代码',
                        xtype: 'textfield',
                        id: "policy.creditCode",
                        disabled: true,
                        hidden: true,
                        readOnly: true,
                        maxLength: 18,
                        maxLengthText: '长度超过18位',
                        value: pdi.policy.creditCode,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'policy.orgCode',
                        fieldLabel: '机构代码',
                        id: "policy.orgCode",
                        xtype: 'textfield',
                        readOnly: true,
                        hidden: true,
                        disabled: true,
                        value: pdi.policy.orgCode,
                        maxLength: 14,
                        maxLengthText: '长度超过14位',
                        width: eleWidth
                    }]
                },
                {
                    xtype: 'hidden',
                    id: "customerCodeType",
                    value: pdi.policy.customerCodeType
                },
                {
                    xtype: 'hidden',
                    id: "assuredCodeType"
                }]
            }),
            // ---------保单相关人员基本信息结束-------------
            // 担保人信息
            new Ext.form.FieldSet({
                title: '相关担保人信息',
                columnWidth: .1,
                id: "guarantorFieldSet",
                height: 300,
                layout: 'column',
                border: true,
                anchor: '100%',
                labelWidth: 100,
                items: [guarantorGrid]
            }),
            // 担保人信息结束
            new Ext.form.FieldSet({
                title: '保单其他信息',
                columnWidth: .1,
                height: '100%',
                layout: 'column',
                border: true,
                anchor: '100%',
                labelWidth: 100,
                items: [{
                    xtype: 'hidden',
                    id: 'policy.policyCode',
                    name: 'policy.policyCode',
                    value: pdi.policy.policyCode,
                    border: false

                },
                {
                    xtype: 'hidden',
                    id: 'policy.isSurvey',
                    name: 'policy.isSurvey',
                    value: pdi.policy.isSurvey
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    hidden: true,
                    items: [new Ext.form.ComboBox({
                        name: 'policy.insuranceType',
                        fieldLabel: '险种',
                        readOnly: true,
                        id: 'policy.insuranceType',
                        hiddenName: 'policy.insuranceType',
                        allowBlank: false,
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: insuranceType
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        hidden: true,
                        selectOnFocus: true,
                        value: pdi.policy.insuranceType,
                        width: eleWidth,
                        listeners: {
                            select: function(combo, record, index) {
                                var insuranceType = Ext.getCmp("policy.insuranceType").getValue();
                                var _element = Ext.getCmp("carloan.carUseID");
                                /*var _elementDistributorName = Ext.getCmp('carloan.distributorName');
												var _elementDistributorAddress = Ext.getCmp('carloan.distributorAddress');
												var _elementDistributorTel = Ext.getCmp('carloan.distributorTel');*/
                                var _elementDownPayment = Ext.getCmp("carloan.downPayment");
                                if (insuranceType != '2205') {
                                    Ext.getCmp("carFieldSet").hide();
                                    Ext.getCmp("collateralFieldSet").show();
                                    Ext.getCmp("addPolicyFieldSet").show();
                                    _element.allowBlank = true;
                                    /*_elementDistributorName.allowBlank = true;
													_elementDistributorAddress.allowBlank = true;
													_elementDistributorTel.allowBlank = true;*/
                                    _elementDownPayment.allowBlank = true;
                                }
                                if (insuranceType == '2205') {
                                    Ext.getCmp("carFieldSet").show();
                                    Ext.getCmp("collateralFieldSet").hide();
                                    Ext.getCmp("addPolicyFieldSet").hide();
                                    _element.allowBlank = false;
                                    /*_elementDistributorName.allowBlank = false;
													_elementDistributorAddress.allowBlank = false;
													_elementDistributorTel.allowBlank = false;*/
                                    _elementDownPayment.allowBlank = false;
                                }
                                // 主条款
                                var currentMainClauseName = Ext.getCmp('policy.mainClauseName');
                                var currentMainClause = [];
                                var i = 0;
                                if (insuranceType == '2205') {
                                    for (var n = 0; n < mainClause.length; n++) {
                                        if (mainClause[n][0].substr(0, 4) == '2205') {
                                            currentMainClause[i] = mainClause[n];
                                            i = i + 1;
                                        }
                                    }
                                } else {
                                    for (var n = 0; n < mainClause.length; n++) {
                                        if (mainClause[n][0].substr(0, 4) != '2205') {
                                            currentMainClause[i] = mainClause[n];
                                            i = i + 1;
                                        }
                                    }
                                }
                                currentMainClauseName.reset();
                                currentMainClauseName.store.removeAll();
                                currentMainClauseName.store.loadData(currentMainClause, true);
                                currentMainClauseName.setValue("");
                            }
                        }
                    })]
                },
                {
                    xtype: 'hidden',
                    id: 'policy.processId',
                    name: 'policy.processId',
                    value: pdi.policy.processId,
                    border: false
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    hidden: true,
                    items: [new Ext.form.ComboBox({
                        name: 'policy.coinsuranceFlag',
                        fieldLabel: '共保标识',
                        readOnly: true,
                        id: "policy.coinsuranceFlag",
                        hidden: true,
                        hiddenName: 'policy.coinsuranceFlag',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: coinsuranceFlag
                        }),
                        valueField: 'key',
                        value: pdi.policy.coinsuranceFlag,
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    hidden: true,
                    items: [new Ext.form.ComboBox({
                        name: 'policy.coinslinkedFlag',
                        fieldLabel: '联保标识',
                        readOnly: true,
                        hidden: true,
                        id: "policy.coinslinkedFlag",
                        hiddenName: 'policy.coinslinkedFlag',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: coinslinkedFlag
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        value: pdi.policy.coinslinkedFlag,
                        editable: false,
                        selectOnFocus: true,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'policy.renewalMark',
                        id: "policy.renewalMarkID",
                        fieldLabel: '续保标识',
                        readOnly: true,
                        hiddenName: 'policy.renewalMark',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: yesorno
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: pdi.policy.renewalMark,
                        width: eleWidth,
                        listeners: {
                            "change": function() {
                                var _value = Ext.getCmp("policy.renewalMarkID").getValue();
                                var _element = Ext.getCmp("policy.renewalCode");
                                if (_value == "0") {
                                    _element.el.dom.readOnly = false;
                                    _element.allowBlank = false;

                                } else if (_value == "1") {
                                    _element.setValue("");
                                    _element.allowBlank = true;
                                    _element.el.dom.readOnly = true;
                                }
                            }
                        }
                    })]
                },
                {
                	columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'policy.renewalCode',
                        id: "policy.renewalCode",
                        readOnly: true,
                        fieldLabel: '续保保单号',    
                      
                        xtype: 'textfield',
                        disabled: false,
                        maxLength: 30,
                        maxLengthText: '续保单单号长度不超过30位',
                        value: pdi.policy.renewalCode,
                        width: eleWidth
                    }
                    ]
                },
                {
                    columnWidth: .25,
                    layout: 'table',
                    items: [{
                        layout: 'form',
                        anchor: '70%',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '归属部门',
                            readOnly: true,
                            name: 'policy.belongDeptName',
                            id: 'policy.belongDeptName',
                            readOnly: true,
                            allowBlank: false,
                            value: pdi.policy.belongDeptName,
                            border: false
                        },
                        {
                            xtype: 'hidden',
                            id: 'policy.belongDept',
                            name: 'policy.belongDept',
                            value: pdi.policy.belongDept,
                            border: false

                        }]
                    },
                    {
                        text: "引入",
                        iconCls: "lb-cmd-Add",
                        anchor: '10%',
                        xtype: 'button',
                        /*listeners: {
                            "click": function() {
                                chooseDept(setDept);
                            }
                        }*/
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'table',
                    items: [{
                        layout: 'form',
                        anchor: '70%',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '业务员',
                            readOnly: true,
                            name: 'policy.salePersonName',
                            id: 'policy.salePersonName',
                            value: pdi.policy.salePersonName,
                            readOnly: true,
                            border: false
                        },
                        {
                            xtype: 'hidden',
                            id: 'policy.salePerson',
                            name: 'policy.salePerson',
                            value: pdi.policy.salePerson,
                            border: false

                        }]
                    },
                    {
                        text: "引入",
                        iconCls: "lb-cmd-Add",
                        anchor: '10%',
                        xtype: 'button',
                        /*listeners: {
                            "click": function() {
                                userChoose(setUser);
                            }
                        }*/
                    }]
                },
                {
                    xtype: 'hidden',
                    id: 'policy.addedSign',
                    name: 'policy.addedSign',
                    value: pdi.policy.addedSign,
                    border: false

                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'policy.policyDate',
                        fieldLabel: '投保日期',
                        readOnly: true,
                        xtype: 'datefield',
                        format: 'Y-m-d',
                        emptyText: '',
                        altFormats: 'YYYY-mm-dd',
                        disabled: false,
                        editable: false,
                        value: pdi.policy.policyDate,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'policy.policyStatus',
                        fieldLabel: '保单状态',
                        
                        hiddenName: 'policy.policyStatus',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: policyStatus
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        readOnly: true,
                        selectOnFocus: true,
                        value: pdi.policy.policyStatus,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'policy.remark',
                        fieldLabel: '备注',
                        readOnly: true,
                        xtype: 'textarea',
                        value: pdi.policy.remark,
                        maxLength: 600,
                        maxLengthText: '长度不大于600',
                        disabled: false,
                        width: eleWidth
                    }]
                }]
            }), new Ext.form.FieldSet({
                title: '相关押品信息',
                columnWidth: .1,
                id: 'collateralFieldSet',
                height: 300,
                layout: 'column',
                border: true,
                anchor: '100%',
                labelWidth: 100,
                items: [collateralGrid]
            })]
        });
    }
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
    var mainPanel = new policyView({
        flex: 1
    });
    var viewport = new Ext.Viewport({
        layout: 'fit',
        layoutConfig: {
            align: 'stretch',
            pack: 'start'
        },
        items: [mainPanel]
    });
    var insuranceType = pdi.policy.insuranceType;
    insuranceTypeSet(insuranceType);
    var _element = Ext.getCmp("carloan.carUseID");
    var _elementDownPayment = Ext.getCmp("carloan.downPayment");
    if (insuranceType != '2205') {
        Ext.getCmp("carFieldSet").hide();
        Ext.getCmp("collateralFieldSet").show();
        Ext.getCmp("addPolicyFieldSet").show();
        _element.allowBlank = true;
        _elementDownPayment.allowBlank = true;
    }
    if (insuranceType == '2205') {
        Ext.getCmp("carFieldSet").show();
        Ext.getCmp("collateralFieldSet").hide();
        Ext.getCmp("addPolicyFieldSet").hide();
        _element.allowBlank = false;
        _elementDownPayment.allowBlank = false;
    }
    // 主条款
    var currentMainClauseName = Ext.getCmp('policy.mainClauseName');

    var _value = Ext.getCmp('policyView').getForm().findField('policy.mainClause').getValue();
    /**
     * 必输项修改
     */
    if ("9901298" == _value || "9901301" == _value) {
        Ext.getCmp('policyView').getForm().findField('policy.loanRate').allowBlank = false;
        Ext.getCmp('policyView').getForm().findField('policy.loanRate').show();
        Ext.getCmp("loanRateParent").show();
    } else {
        Ext.getCmp('policyView').getForm().findField('policy.loanRate').allowBlank = true;
        Ext.getCmp('policyView').getForm().findField('policy.loanRate').hide();
        Ext.getCmp("loanRateParent").hide();
    }
    /**
     * 根据产品判断是否有附加险
     */
    if ("9901296" == _value || "9901127" == _value || "9901298" == _value || "9901301" == _value) {
        Ext.getCmp("addPolicyFieldSet").show();
    } else {
        Ext.getCmp("addPolicyFieldSet").hide();
    }
    /**
	 * 根据产品重置附加险主条款
	 */
    var gridMainClause = Ext.getCmp("gridMainClause");
    var currentMainClause = [];
    var i = 0;
    if (_value == '9901296') {
        Ext.getCmp("carloan.payOffLong").allowBlank = true;
        for (var n = 0; n < accessoryRisk.length; n++) {
            if (accessoryRisk[n][0] == '9901297') {
                currentMainClause[i] = accessoryRisk[n];
                i = i + 1;
            }
        }
    } else if (_value == "9901228") {
        Ext.getCmp("carloan.payOffLong").allowBlank = true;
    } else if (_value == "9901127") {
        for (var n = 0; n < accessoryRisk.length; n++) {
            if (accessoryRisk[n][0] == '9901130' || accessoryRisk[n][0] == '9901129') {
                currentMainClause[i] = accessoryRisk[n];
                i = i + 1;
            }
        }
    } else if (_value == "9901298") {
        for (var n = 0; n < accessoryRisk.length; n++) {
            if (accessoryRisk[n][0] == '9901299' || accessoryRisk[n][0] == '9901300') {
                currentMainClause[i] = accessoryRisk[n];
                i = i + 1;
            }
        }
    } else if (_value == "9901301") {
        for (var n = 0; n < accessoryRisk.length; n++) {
            if (accessoryRisk[n][0] == '9901302' || accessoryRisk[n][0] == '9901303') {
                currentMainClause[i] = accessoryRisk[n];
                i = i + 1;
            }
        }
    }
    gridMainClause.reset();
    gridMainClause.store.removeAll();
    gridMainClause.store.loadData(currentMainClause, true);
    if (_value == '2205103') {
        Ext.getCmp("carloan.carUseID").setValue("0");
        Ext.getCmp("carloan.lineStabilityID").hide();
        Ext.getCmp("carloan.runAge").hide();
    }
    // 营业用车
    else if (_value == '2205101' || _value == '2205102') {
        Ext.getCmp("carloan.carUseID").setValue("1");
        Ext.getCmp("carloan.lineStabilityID").show();
        Ext.getCmp("carloan.lineStabilityID").allowBlank = false;
        Ext.getCmp("carloan.runAge").show();
    }
    if (! (_value == '2205101' || _value == '2205102')) {
        Ext.getCmp("carloan.lineStabilityID").allowBlank = true;
    }
    // 清偿时间
    if (_value == '2205101' || _value == '2205102' || _value == '2205103') {
        Ext.getCmp("carloan.payOffLong").allowBlank = false;
        Ext.getCmp("carloan.firstPaymentID").allowBlank = false;

    } else {
        Ext.getCmp("carloan.payOffLong").allowBlank = true;
        Ext.getCmp("carloan.firstPaymentID").allowBlank = true;
    }
    Ext.getCmp('policyView').getForm().findField('policy.projectId').setRawValue(pdi.policy.projectIdName);
});

function setAllowBlankTrue() {
    Ext.ComponentMgr.all.each(function(cmp) {
        var Type = cmp.getXType();
        if (Type == 'textfield' || Type == 'combo' || Type == 'treecombo' || Type == 'datefield' || Type == 'numberfield' || Type == 'textarea' || Type == 'timefield' || Type == 'trigger') {
            if (cmp.allowBlank == false) {
                cmp.allowBlank = true;
                allowIds.push(cmp.id);
            }
        }
    });
}
function setAllowBlankFalse() {
    if (allowIds.length == 0) {
        return;
    }
    for (var n = 0; n < allowIds.length; n++) {
        Ext.getCmp(allowIds[n]).allowBlank = false;
    }
}