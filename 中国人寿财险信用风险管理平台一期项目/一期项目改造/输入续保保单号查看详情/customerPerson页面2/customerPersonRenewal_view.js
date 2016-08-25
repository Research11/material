function getRightDate(date) {
	if(""!=date&&date!=null&&"0NaN-NaN-NaN"!=date){
	    if (date.time == null) {
	        return Ext.util.Format.date(date, 'Y-m-d');
	    } else {
	        var time = new Date(date.time);
	        return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
	    }
    }else{
    	return "";
    }
}

//根据身份证获取生日


function getBirthdayByIdCard(idCard, form, name) {
    var birthday = "";
    if (idCard != null && idCard != "") {
        if (idCard.length == 15) {
            birthday = "19" + idCard.substr(6, 6);
        } else if (idCard.length == 18) {
            birthday = idCard.substr(6, 8);
        }
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
    }
    //return birthday;
    form.getForm().findField(name).setValue(birthday);
}

// 自雇人士
var _TheArrayA = new Array("registeredCapitalSelf", "enterpriseTypeSelf", "employeeCountSelf", "setTimeSelf", "coreAdvantageSelf", "developProspectSelf", "lifeCycleSelf", "businessAgeSelf", "businessPlaceSelf");
// 农户
var _TheArrayB = new Array("customerPerson.nonlaborPopulation", "customerPerson.saving", "customerPerson.liabilities", "employeeCountFarmer", "customerPerson.gardenArea", "customerPerson.gardenAnnualvalue", "customerPerson.gardenAnnualincome");
// 受薪人士
var _TheArrayC = new Array("workUnitSalary", "unitAddressSalary", "workPhoneSalary", "professionSalary", "positionSalary", "payPeriod", "workExperienceSalary");

//--------------------------------------
var screenWidth = Ext.getBody().getViewSize().width - 70;
if (Ext.getBody().getViewSize().width == 0) {
    screenWidth = 1170;
}
/**
 * 校验编辑表格
 * @param grid
 * @returns {Boolean}
 */
function checkEditorGrid(grid) {
    var bl = true;
    var gridBody = grid;
    var store = gridBody.getStore();
    var cm = gridBody.getColumnModel();
    var m = gridBody.getStore().getRange(0, store.getCount());
    /*校验数据*/
    for (var i = 0; i < m.length; i++) {
        var record = m[i];
        var fields = record.store.fields.keys;
        for (var j = 0; j < fields.length; j++) {
            var name = fields[j];
            var value = record.data[name];
            var colIndex = cm.findColumnIndex(name);
            var rowIndex = store.indexOfId(record.id);
            //coIndex>0 否则getCellEditor报错
            try {
                if (colIndex >= 0 && null != cm.getCellEditor(colIndex) && null != cm.getCellEditor(colIndex).field) {
                    //关键操作，获取editor，进行validateValue判断
                    var editor = cm.getCellEditor(colIndex).field;
                    if (!editor.validateValue(value)) {
                        if (editor.xtype != "datefield") {
                            Ext.Msg.alert('提示', '请确保输入的数据正确。',
                            function() {
                                gridBody.startEditing(rowIndex, colIndex);
                            });
                            bl = false;
                            return bl;
                        }else{
                       	 /*if((name=="documentStart" || name=="documentEnd")&&value==""){
                       		 Ext.Msg.alert('提示', '请确保输入的数据正确。',
                                function() {
                                    gridBody.startEditing(rowIndex, colIndex);
                                });
                                bl = false;
                                return bl;
                       	 }*/
                        }
                    }
                }
            } catch(error) {

            }
        }
    }
    return bl;
}

function disXtype() {
    var re = true;
    Ext.ComponentMgr.all.each(function(cmp) {
        var Type = cmp.getXType();
        if (Type == 'textfield' || Type == 'combo' || Type == 'treecombo' || Type == 'datefield' || Type == 'numberfield' || Type == 'textarea' || Type == 'timefield' || Type == 'trigger' || Type == 'button') {
            if (Type == 'button') {
                cmp.setVisible(false);
            } else {
                if (cmp.getEl() != null) {
                    cmp.getEl().dom.readOnly = true;
                    cmp.style = 'background:#E6E6E6';
                }
                cmp.readOnly = true;
                cmp.style = 'background:#E6E6E6';
            }
        }
    });
}

//校验聚焦方法
function checkVtype() {
    var re = true;
    Ext.ComponentMgr.all.each(function(cmp) {
        var Type = cmp.getXType();
        if (Type == 'textfield' || Type == 'combo' || Type == 'treecombo' || Type == 'datefield' || Type == 'numberfield' || Type == 'textarea' || Type == 'timefield' || Type == 'trigger') {
            if (!cmp.hidden) {
                if (cmp.isVisible()) {
                    var va = cmp.isValid();
                    re = va ? re: va;
                }
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
//配偶信息的引入
var setSpouse = function(record) {
    var sname = record.customerName;
    var sid = record.id;
    var cmpName = Ext.getCmp("customerPerson.spouseIdName");
    var cmpId = Ext.getCmp("customerPerson.spouseId");
    var cmpEcifId = Ext.getCmp("customerPerson.spouseEcifId");
    cmpId.setValue(sid);
    cmpName.setValue(sname);
    cmpEcifId.setValue(record.ecifId);
};
//--------------------------------------
//添加黑名单公共查询
if (cpf.blackPublics == "[]") {
    cpf.blackPublics = '[{"urlName":"公检法黑名单","url":"01"},{"urlName":"法院黑名单","url":"02"},{"urlName":"工商黑名单","url":"03"},{"urlName":"北京市地方税务局","url":"04"},{"urlName":"欠税户查询","url":"05"},{"urlName":"非正常户查询","url":"06"},{"urlName":"税务登记违法户查询","url":"07"},{"urlName":"税务登记失效户查询","url":"08"},{"urlName":"全国融资租赁企业管理信","url":"09"}]';
}
var blackPublicData = Ext.decode(cpf.blackPublics);
//alert(cpf.blackPublics);
var blackPublicStore = new Ext.data.JsonStore({
    data: blackPublicData,
    fields: [{
        name: 'id'
    },
    {
        name: 'customerId'
    },
    {
        name: 'urlName'
    },
    {
        name: 'url'
    },
    {
        name: 'result'
    },
    {
        name: 'checkTime'
    },
    {
        name: 'remark'
    }]
});
var blackPublicColM = new Ext.grid.ColumnModel([{
    header: '黑名单公共查询网点名称',
    dataIndex: "urlName",
    width: 160
},
{
    header: '黑名单公共查询网址',
    dataIndex: "url",
    width: 250,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['url'];
        for (var i = 0; i < blackWeb.size(); i++) {
            var obj = blackWeb[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    }
},

{
    header: '黑名单公共查询日期',
    dataIndex: "checkTime",
    width: 200,
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
        xtype: 'datefield',//'1' == cpf.customer.isFgshbg ? 'textfield': 'datefield',
        disabled: '1' == cpf.customer.isFgshbg ? true: false,
        allowBlank: true,
        format: 'Y-m-d'
    }
},
{
    header: '<span style="color:Red">*</span>是否黑名单(查询结果)',
    dataIndex: "result",
    width: 200,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['result'];
        for (var i = 0; i < yesorno.size(); i++) {
            var obj = yesorno[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'result',
        hiddenName: 'result',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: yesorno
        }),
        valueField: 'key',
        displayField: 'value',
        mode: 'local',
        triggerAction: 'all',
        allowBlank: false,
        editable: false,
        selectOnFocus: true
    })
},
{
    header: "备注",
    dataIndex: "remark",
    width: 200,
    editor: new Ext.form.TextField({
        maxLength: 60
    })
}]);
var blackPublicGrid = new Ext.grid.GridPanel({
    title: "客户黑名单公共查询管理",
    height: 200,
   /* tbar: new Ext.Toolbar({
        autoWidth: true,
        autoShow: true,
        items: [*/
        //		          {
        //			"text" : "添加黑名单公共查询",
        //			"recType" : 1,
        //			"popup" : true,
        //			"select" : true,
        //			"type" : 1,
        //			"iconCls" : "lb-cmd-Add",
        //			"handler" : function() {
        //					var p = new Ext.data.Record({
        //						customerId : '',
        //						documentCode : '',
        //						documentType : '',
        //						documentStart : "",
        //						documentEnd : ""
        //					});
        //					blackPublicGrid.stopEditing();
        //					blackPublicGrid.getStore().insert(0, p);
        //					blackPublicGrid.startEditing(0, 0);
        //			}
        //		},
      /*  {
            "text": "打开网页",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Add",
            "handler": function() {
                var sm = blackPublicGrid.getSelectionModel(); // 得到表格的选择模型
                var cell = sm.getSelectedCell(); // 通过选择模型得到选择的单元格
                if (cell == null) {
                    Ext.MessageBox.alert("操作信息", "请选择一条记录!");
                    return;
                }
                var record = blackPublicGrid.getStore().getAt(cell[0]); // 得到store对应的Record
                var url = "";
                for (var i = 0; i < blackWeb.size(); i++) {
                    var obj = blackWeb[i];
                    if (record.data.url == obj[0]) {
                        url = obj[1];
                        break;
                    }
                }
                window.open(url, "", "fullscreen=1");
            }
        },
        {
            "text": "删除黑名单公共查询",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Delete",
            "handler": function() {
                Ext.Msg.confirm('信息', '确定要删除',
                function(btn) {
                    if (btn == 'yes') {
                        var mes = "保存后生效！";
                        Ext.MessageBox.alert("操作信息", mes);
                        var sm = blackPublicGrid.getSelectionModel(); // 得到表格的选择模型
                        var cell = sm.getSelectedCell(); // 通过选择模型得到选择的单元格
                        if (cell == null) {
                            Ext.MessageBox.alert("操作信息", "请选择一条记录!");
                            return;
                        }
                        var record = blackPublicGrid.getStore().getAt(cell[0]); // 得到store对应的Record
                        blackPublicGrid.getStore().remove(record);
                    }
                });
            }
        }]
    }),*/
    width: screenWidth,
    cm: blackPublicColM,
    store: blackPublicStore
});
//------------添加黑名单公共查询结束----------------
// --------------------------------------
//添加证件
var certificateData = Ext.decode(cpf.certificates);
var certificateStore = new Ext.data.JsonStore({
    data: certificateData,
    fields: ["id", "customerId", "documentCode", "documentType", "documentStart", "documentEnd"]
});
var certificateColM = new Ext.grid.ColumnModel([{
    header: "证件类型",
    dataIndex: "documentType",
    width: 100,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['documentType'];
        for (var i = 0; i < personDocumentType.size(); i++) {
            var obj = personDocumentType[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'documentType',
        hiddenName: 'documentType',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: personDocumentType
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
    header: "证件号",
    dataIndex: "documentCode",
    width: 100,
    editor: new Ext.form.TextField({
        maxLength: 20
    })
},
{
    header: '证件有效起期',
    dataIndex: "documentStart",
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
        xtype: 'datefield',//'1' == cpf.customer.isFgshbg ? 'textfield': 'datefield',
        disabled: '1' == cpf.customer.isFgshbg ? true: false,
        allowBlank: true,
        format: 'Y-m-d'
    }
},
{
    header: '证件有效止期',
    dataIndex: "documentEnd",
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
        xtype: 'datefield',//'1' == cpf.customer.isFgshbg ? 'textfield': 'datefield',
        disabled: '1' == cpf.customer.isFgshbg ? true: false,
        allowBlank: true,
        format: 'Y-m-d'
    }
}]);
var certificateGrid = new Ext.grid.GridPanel({
    title: "客户证件管理",
    height: 200,
  /*  tbar: new Ext.Toolbar({
        autoWidth: true,
        autoShow: true,
        items: [{
            "text": "添加证件",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Add",
            "handler": function() {
                var p = new Ext.data.Record({
                    customerId: '',
                    documentCode: '',
                    documentType: '',
                    documentStart: "",
                    documentEnd: ""
                });
                certificateGrid.stopEditing();
                certificateGrid.getStore().insert(0, p);
                certificateGrid.startEditing(0, 0);
            }
        },
        {
            "text": "删除证件",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Delete",
            "handler": function() {
                Ext.Msg.confirm('信息', '确定要删除',
                function(btn) {
                    if (btn == 'yes') {
                        var mes = "保存后生效！";
                        Ext.MessageBox.alert("操作信息", mes);
                        var sm = certificateGrid.getSelectionModel(); // 得到表格的选择模型
                        var cell = sm.getSelectedCell(); // 通过选择模型得到选择的单元格
                        if (cell == null) {
                            Ext.MessageBox.alert("操作信息", "请选择一条记录!");
                            return;
                        }
                        var record = certificateGrid.getStore().getAt(cell[0]); // 得到store对应的Record
                        certificateGrid.getStore().remove(record);
                    }
                });
            }
        }]
    }),*/
    width: screenWidth,
    cm: certificateColM,
    store: certificateStore
});
//------------添加证件结束----------------
//--------------------------------------
//添加信用卡贷款卡
var creditCardData = Ext.decode(cpf.customerCards);
var creditCardStore = new Ext.data.JsonStore({
    data: creditCardData,
    fields: ["id", "customerId", {
        name: 'cardType'
    },
    {
        name: 'cardNo'
    },
    {
        name: 'cardMax'
    },
    {
        name: 'cardBank'
    },
    {
        name: 'customerLevel'
    }]
});
var creditCardColM = new Ext.grid.ColumnModel([{
    header: "办卡银行",
    dataIndex: "cardBank",
    width: 200,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['cardBank'];
        for (var i = 0; i < bank.size(); i++) {
            var obj = bank[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'cardBank',
        hiddenName: 'cardBank',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: bank
        }),
        listWidth: 400,
        valueField: 'key',
        displayField: 'value',
        mode: 'local',
        typeAhead: true,
        triggerAction: 'all',
        selectOnFocus: true,
        listeners: {
            'beforequery': function(e) {
                var combo = e.combo;
                if (!e.forceAll) {
                    var value = e.query;
                    combo.store.filterBy(function(record, id) {
                        var text = record.get(combo.displayField); // 用自己的过滤规则,如写正则式
                        return (text.indexOf(value) != -1);
                    });
                    combo.expand();
                    return false;
                }
            }
        }
    })
},
{
    header: "客户等级",
    dataIndex: "customerLevel",
    width: 160,
    editor: new Ext.form.TextField({
        maxLength: 120
    })

},
{
    header: "卡类型",
    dataIndex: "cardType",
    width: 100,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['cardType'];
        for (var i = 0; i < cardType.size(); i++) {
            var obj = cardType[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'cardType',
        hiddenName: 'cardType',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: cardType
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
    header: "卡号",
    dataIndex: "cardNo",
    width: 160,
    editor: new Ext.form.TextField({
        maxLength: 30
    })
},
{
    header: "所持信用卡/贷款卡最大额度(元)",
    dataIndex: "cardMax",
    width: 200,
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        decimalPrecision: 2,
        // 小数点后位数,
        allowNegative: false // 是否允许负数
    })
}]);
var creditCardGrid = new Ext.grid.GridPanel({
    title: "客户所持信用卡/贷款卡管理",
    height: 200,
   /* tbar: new Ext.Toolbar({
        autoWidth: true,
        autoShow: true,
        items: [{
            "text": "添加信用卡/贷款卡信息",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Add",
            "handler": function() {
                var p = new Ext.data.Record({});
                creditCardGrid.stopEditing();
                creditCardGrid.getStore().insert(0, p);
                creditCardGrid.startEditing(0, 0);
            }
        },
        {
            "text": "删除信用卡/贷款卡信息",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Delete",
            "handler": function() {
                Ext.Msg.confirm('信息', '确定要删除',
                function(btn) {
                    if (btn == 'yes') {
                        var mes = "保存后生效！";
                        Ext.MessageBox.alert("操作信息", mes);
                        var sm = creditCardGrid.getSelectionModel(); // 得到表格的选择模型
                        var cell = sm.getSelectedCell(); // 通过选择模型得到选择的单元格
                        if (cell == null) {
                            Ext.MessageBox.alert("操作信息", "请选择一条记录!");
                            return;
                        }
                        var record = creditCardGrid.getStore().getAt(cell[0]); // 得到store对应的Record
                        creditCardGrid.getStore().remove(record);
                    }
                });
            }
        }]
    }),*/
    width: screenWidth,
    cm: creditCardColM,
    store: creditCardStore
});
//------------添加信用卡贷款卡结束----------------
//------------房屋资产---------------------
var customerAssetData = Ext.decode(cpf.customerAssets);
var customerAssetStore = new Ext.data.JsonStore({
    data: customerAssetData,
    fields: ["id", "customerId", "assetType", "carOwner", "carModel", "vinCode", "motorCode", "fundSource", "runAge", "lineStability", "buyDate", "residenceValue", "collateralState", "paymentState", , "coinsuranceNum", "partOwner", "houseType", "area", "address", "assetValue", "houseOwner"]
});
var customerAssetColM = new Ext.grid.ColumnModel([{
    header: "房屋类型",
    dataIndex: "houseType",
    width: 100,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['houseType'];
        for (var i = 0; i < houseType.size(); i++) {
            var obj = houseType[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'houseType',
        hiddenName: 'houseType',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: houseType
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
    header: "面积(平方米)",
    dataIndex: "area",
    width: 100,
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        maxValue: 999999999999.99,
        decimalPrecision: 2,
        // 小数点后位数,
        allowNegative: false // 是否允许负数
    })
},
{
    header: "地址",
    dataIndex: "address",
    editor: new Ext.form.TextField({
        maxLength: 25
    })
},
{
    header: '<span style="color:Red">*</span>房屋估值(元)',
    dataIndex: "assetValue",
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        allowBlank: false,
        maxValue: 999999999999.99,
        decimalPrecision: 2,
        // 小数点后位数,
        allowNegative: false // 是否允许负数
    })
},
{
    header: '<span style="color:Red">*</span>购房主要资金来源',
    dataIndex: "fundSource",
    width: 150,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['fundSource'];
        for (var i = 0; i < fundSource.size(); i++) {
            var obj = fundSource[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'fundSource',
        hiddenName: 'fundSource',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: fundSource
        }),
        valueField: 'key',
        displayField: 'value',
        mode: 'local',
        triggerAction: 'all',
        allowBlank: false,
        editable: false,
        selectOnFocus: true
    })
},
{
    header: '<span style="color:Red">*</span>房屋产权',
    dataIndex: "houseOwner",
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['houseOwner'];
        for (var i = 0; i < houseOwner.size(); i++) {
            var obj = houseOwner[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'houseOwner',
        hiddenName: 'houseOwner',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: houseOwner
        }),
        valueField: 'key',
        displayField: 'value',
        mode: 'local',
        triggerAction: 'all',
        allowBlank: false,
        editable: false,
        selectOnFocus: true
    })
},
{
    header: "购入日期",
    dataIndex: "buyDate",
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
        xtype:'datefield',// '1' == cpf.customer.isFgshbg ? 'textfield': 'datefield',
        disabled: '1' == cpf.customer.isFgshbg ? true: false,
        allowBlank: true,
        format: 'Y-m-d'
    }
},
{
    header: "购入价值(元)",
    dataIndex: "residenceValue",
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        maxValue: 999999999999.99,
        decimalPrecision: 2,
        // 小数点后位数,
        allowNegative: false // 是否允许负数
    })
},
{
    header: "抵押状态",
    dataIndex: "collateralState",
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['collateralState'];
        for (var i = 0; i < yesorno.size(); i++) {
            var obj = yesorno[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'collateralState',
        hiddenName: 'collateralState',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: yesorno
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
    header: "付款情况",
    dataIndex: "paymentState",
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['paymentState'];
        for (var i = 0; i < paymentState.size(); i++) {
            var obj = paymentState[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'paymentState',
        hiddenName: 'paymentState',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: paymentState
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
    header: "共有人数",
    dataIndex: "coinsuranceNum",
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        maxValue: 1000,
        decimalPrecision: 0,
        // 小数点后位数,
        allowNegative: false // 是否允许负数
    })
},
{
    header: "共有人",
    dataIndex: "partOwner",
    editor: new Ext.form.TextField({
        maxLength: 2000
    })
}]);
var customerAssetGrid = new Ext.grid.GridPanel({
    title: "客户房屋资产管理",
    height: 200,
    /*tbar: new Ext.Toolbar({
        autoWidth: true,
        autoShow: true,
        items: [{
            "text": "添加资产信息",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Add",
            "handler": function() {
                var p = new Ext.data.Record({});
                customerAssetGrid.stopEditing();
                customerAssetGrid.getStore().insert(0, p);
                customerAssetGrid.startEditing(0, 0);
            }
        },
        {
            "text": "删除资产信息",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Delete",
            "handler": function() {
                Ext.Msg.confirm('信息', '确定要删除',
                function(btn) {
                    if (btn == 'yes') {
                        var sm = customerAssetGrid.getSelectionModel(); // 得到表格的选择模型
                        var cell = sm.getSelectedCell(); // 通过选择模型得到选择的单元格
                        if (cell == null) {
                            Ext.MessageBox.alert("操作信息", "请选择一条记录!");
                            return;
                        }
                        var record = customerAssetGrid.getStore().getAt(cell[0]); // 得到store对应的Record
                        customerAssetGrid.getStore().remove(record);
                    }
                });
            }
        }]
    }),*/
    width: screenWidth,
    cm: customerAssetColM,
    store: customerAssetStore
});
//--------------------房屋资产结束--------------
//其他资产
var customerOtherAssetData = Ext.decode(cpf.customerOtherAssets);
var customerOtherAssetStore = new Ext.data.JsonStore({
    data: customerOtherAssetData,
    fields: ["id", "customerId", "assetType", "carOwner", "carModel", "vinCode", "motorCode", "fundSource", "runAge", "lineStability", "buyDate", "residenceValue", "collateralState", "paymentState", , "coinsuranceNum", "partOwner", "houseType", "area", "address", "assetValue", "houseOwner", "otherType", "remark"]
});
var customerOtherAssetColM = new Ext.grid.ColumnModel([{
    header: "其他资产类型",
    dataIndex: "otherType",
    width: 100,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['otherType'];
        for (var i = 0; i < otherassetType.size(); i++) {
            var obj = otherassetType[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'houseType',
        hiddenName: 'houseType',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: otherassetType
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
    header: "备注",
    dataIndex: "remark",
    width: 100,
    editor: new Ext.form.TextField({
        maxLength: 2000
    })
},
{
    header: '<span style="color:Red">*</span>资产估值(元)',
    dataIndex: "assetValue",
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        allowBlank: false,
        maxValue: 999999999999.99,
        decimalPrecision: 2,
        // 小数点后位数,
        allowNegative: false // 是否允许负数
    })
}]);
var customerOtherAssetGrid = new Ext.grid.GridPanel({
    title: "客户其他资产管理",
    height: 200,
/*    tbar: new Ext.Toolbar({
        autoWidth: true,
        autoShow: true,
        items: [{
            "text": "添加资产信息",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Add",
            "handler": function() {
                var p = new Ext.data.Record({});
                customerOtherAssetGrid.stopEditing();
                customerOtherAssetGrid.getStore().insert(0, p);
                customerOtherAssetGrid.startEditing(0, 0);
            }
        },
        {
            "text": "删除资产信息",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Delete",
            "handler": function() {
                Ext.Msg.confirm('信息', '确定要删除',
                function(btn) {
                    if (btn == 'yes') {
                        var sm = customerOtherAssetGrid.getSelectionModel(); // 得到表格的选择模型
                        var cell = sm.getSelectedCell(); // 通过选择模型得到选择的单元格
                        if (cell == null) {
                            Ext.MessageBox.alert("操作信息", "请选择一条记录!");
                            return;
                        }
                        var record = customerOtherAssetGrid.getStore().getAt(cell[0]); // 得到store对应的Record
                        customerOtherAssetGrid.getStore().remove(record);
                    }
                });
            }
        }]
    }),*/
    width: screenWidth,
    cm: customerOtherAssetColM,
    store: customerOtherAssetStore
});
//其他资产------结束

//汽车资产
var customerCarAssetData = Ext.decode(cpf.customerCarAssets);
var customerCarAssetStore = new Ext.data.JsonStore({
    data: customerCarAssetData,
    fields: ["id", "customerId", "assetType", "carOwner", "carModel", "vinCode", "motorCode", "fundSource", "runAge", "lineStability", "buyDate", "residenceValue", "collateralState", "paymentState", , "coinsuranceNum", "partOwner", "houseType", "area", "address", "assetValue", "houseOwner"]
});
var customerCarAssetColM = new Ext.grid.ColumnModel([{
    header: "车辆权属",
    dataIndex: "carOwner",
    width: 100,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['carOwner'];
        for (var i = 0; i < carOwner.size(); i++) {
            var obj = carOwner[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'carOwner',
        hiddenName: 'carOwner',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: carOwner
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
    header: '<span style="color:Red">*</span>车辆估值(元)',
    width: 100,
    dataIndex: "assetValue",
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        allowBlank: false,
        maxValue: 999999999999.99,
        decimalPrecision: 2,
        // 小数点后位数,
        allowNegative: false // 是否允许负数
    })
},
{
    header: "厂牌型号",
    dataIndex: "carModel",
    width: 100,
    editor: new Ext.form.TextField({
        maxLength: 200
    })
},
{
    header: "车架号/VIN码",
    dataIndex: "vinCode",
    editor: new Ext.form.TextField({
        maxLength: 200
    })
},
{
    header: "发动机号",
    dataIndex: "motorCode",
    editor: new Ext.form.TextField({
        maxLength: 100
    })
},
{
    header: "购车主要资金来源",
    dataIndex: "fundSource",
    width: 150,
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['fundSource'];
        for (var i = 0; i < fundSource.size(); i++) {
            var obj = fundSource[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'fundSource',
        hiddenName: 'fundSource',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: fundSource
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
    header: "汽车经营年限(年)",
    dataIndex: "runAge",
    editor: new Ext.form.NumberField({
        maxValue: 100,
        allowDecimals: true,
        decimalPrecision: 0,
        // 小数点后位数,
        allowNegative: false // 是否允许负数
    })
},
{
    header: '<span style="color:Red">*</span>购入日期',
    dataIndex: "buyDate",
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
        allowBlank: false,
        format: 'Y-m-d',
        editable: false
    }
},
{
    header: "购入价值(元)",
    dataIndex: "residenceValue",
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        maxValue: 999999999999.99,
        decimalPrecision: 2,
        // 小数点后位数,
        allowNegative: false // 是否允许负数
    })
},
{
    header: "抵押状态",
    dataIndex: "collateralState",
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['collateralState'];
        for (var i = 0; i < yesorno.size(); i++) {
            var obj = yesorno[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'collateralState',
        hiddenName: 'collateralState',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: yesorno
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
    header: "付款情况",
    dataIndex: "paymentState",
    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var r = record.data['paymentState'];
        for (var i = 0; i < paymentState.size(); i++) {
            var obj = paymentState[i];
            if (r == obj[0]) {
                r = obj[1];
                break;
            }
        }
        return r;
    },
    editor: new Ext.form.ComboBox({
        name: 'paymentState',
        hiddenName: 'paymentState',
        store: new Ext.data.SimpleStore({
            fields: ['key', 'value'],
            data: paymentState
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
    header: "共有人数",
    dataIndex: "coinsuranceNum",
    editor: new Ext.form.NumberField({
        allowDecimals: true,
        maxValue: 100,
        decimalPrecision: 0,
        // 小数点后位数,
        allowNegative: false // 是否允许负数
    })
},
{
    header: "共有人",
    dataIndex: "partOwner",
    editor: new Ext.form.TextField({
        maxLength: 1000
    })
}]);
var customerCarAssetGrid = new Ext.grid.GridPanel({
    title: "客户汽车资产管理",
    height: 200,
  /*  tbar: new Ext.Toolbar({
        autoWidth: true,
        autoShow: true,
        items: [{
            "text": "添加资产信息",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Add",
            "handler": function() {
                var p = new Ext.data.Record({

});
                customerCarAssetGrid.stopEditing();
                customerCarAssetGrid.getStore().insert(0, p);
                customerCarAssetGrid.startEditing(0, 0);
            }
        },
        {
            "text": "删除资产信息",
            "recType": 1,
            "popup": true,
            "select": true,
            "type": 1,
            "iconCls": "lb-cmd-Delete",
            "handler": function() {
                Ext.Msg.confirm('信息', '确定要删除',
                function(btn) {
                    if (btn == 'yes') {
                        var sm = customerCarAssetGrid.getSelectionModel(); // 得到表格的选择模型
                        var cell = sm.getSelectedCell(); // 通过选择模型得到选择的单元格
                        if (cell == null) {
                            Ext.MessageBox.alert("操作信息", "请选择一条记录!");
                            return;
                        }
                        var record = customerCarAssetGrid.getStore().getAt(cell[0]); // 得到store对应的Record
                        customerCarAssetGrid.getStore().remove(record);
                    }
                });
            }
        }]
    }),*/
    width: screenWidth,
    cm: customerCarAssetColM,
    store: customerCarAssetStore
});

function savePerson() {
    if (!checkEditorGrid(blackPublicGrid)) {
        return;
    }
    if (!checkEditorGrid(creditCardGrid)) {
        return;
    }
    if (!checkEditorGrid(certificateGrid)) {
        return;
    }
    if (!checkEditorGrid(customerOtherAssetGrid)) {
        return;
    }
    if (!checkEditorGrid(customerCarAssetGrid)) {
        return;
    }
    if (!checkEditorGrid(customerAssetGrid)) {
        return;
    }
    var b = Ext.getCmp('customerView');
    if (b.getForm().isValid()) {
        var data = Ext.util.JSON.encode(b.getForm().getValues(false));
        if (this.id == null && this.id == "") {
            data.id = null;
        }
        // 证件附加险信息获取
        var certificateArray = new Array();
        for (var i = 0,
        len = certificateGrid.getStore().data.length; i < len; i++) {
            var certificateData = certificateGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
            certificateArray[i] = certificateData;
            certificateArray[i].documentStart = getRightDate(certificateData.documentStart);
            certificateArray[i].documentEnd = getRightDate(certificateData.documentEnd);
        }
        var certificateString = Ext.util.JSON.encode(certificateArray);

        // 黑名单公共查询信息获取
        var blackPublicArray = new Array();
        for (var i = 0,
        len = blackPublicGrid.getStore().data.length; i < len; i++) {
            var blackPublicData = blackPublicGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
            blackPublicArray[i] = blackPublicData;
            blackPublicArray[i].checkTime = getRightDate(blackPublicData.checkTime);
        }
        var blackPublicString = Ext.util.JSON.encode(blackPublicArray);

        //所持卡信息获取
        var creditCardArray = new Array();
        for (var i = 0,
        len = creditCardGrid.getStore().data.length; i < len; i++) {
            var creditCardData = creditCardGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
            creditCardArray[i] = creditCardData;
        }
        var creditCardString = Ext.util.JSON.encode(creditCardArray);

        // 房产信息
        var customerAssetArray = new Array();
        for (var i = 0,
        len = customerAssetGrid.getStore().data.length; i < len; i++) {
            var customerAssetData = customerAssetGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
            customerAssetArray[i] = customerAssetData;
            customerAssetArray[i].buyDate = getRightDate(customerAssetData.buyDate);
        }
        var customerAssetString = Ext.util.JSON.encode(customerAssetArray);
        // 车产信息
        var customerCarAssetArray = new Array();
        for (var i = 0,
        len = customerCarAssetGrid.getStore().data.length; i < len; i++) {
            var customerCarAssetData = customerCarAssetGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
            customerCarAssetArray[i] = customerCarAssetData;
            customerCarAssetArray[i].buyDate = getRightDate(customerCarAssetData.buyDate);
        }
        var customerCarAssetString = Ext.util.JSON.encode(customerCarAssetArray);
        // 其他资产信息
        var customerOtherAssetArray = new Array();
        for (var i = 0,
        len = customerOtherAssetGrid.getStore().data.length; i < len; i++) {
            var customerOtherAssetData = customerOtherAssetGrid.getStore().getAt(i).data; // data就是对应record的一个一个的对象
            customerOtherAssetArray[i] = customerOtherAssetData;
        }
        var customerOtherAssetString = Ext.util.JSON.encode(customerOtherAssetArray);
        b.getForm().submit({
            method: "POST",
            url: "customerPersonData_save.action",
            waitMsg: "正在提交数据...",
            params: {
                data: data,
                certificateString: certificateString,
                customerAssetString: customerAssetString,
                customerCarAssetString: customerCarAssetString,
                customerOtherAssetString: customerOtherAssetString,
                creditCardString: creditCardString,
                blackPublicString: blackPublicString
            },
            success: function(d, g) {
                var mes = "成功保存信息！";
                var result = g.result.myResult;
                if (result != "success") {
                    Ext.MessageBox.alert("操作信息", result);
                } else {
                    Ext.MessageBox.alert("操作信息", mes,
                    function() {
                        if ('1' != cpf.customer.isFgshbg && parent.Ext.getCmp("customerAddWin")!=null) {
                            parent.Ext.getCmp("customerAddWin").close();
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
customerView = Ext.extend(Ext.form.FormPanel, {
    constructor: function(a) {
        Ext.applyIf(this, a);
        customerView.superclass.constructor.call(this, {
            id: "customerView",
            autoScroll: true,
            border: true,
            buttonAlign: 'center',
            buttons: [/*{
                text: "保存",
                iconCls: "btn-save",
                handler: savePerson
            },*/
            //			{
            //				text : "黑名单查询",
            //				iconCls : "lb-cmd-Update",
            //				handler : function(){ 
            //				      var b = Ext.getCmp('customerView');
            //				      if (b.getForm().isValid()) {
            //				  		var data = Ext.util.JSON.encode(b.getForm().getValues(false));
            //				  		if (this.id == null && this.id == "") {
            //				  			data.id = null;
            //				  		}
            //				      b.getForm().submit({
            //							method : "POST",
            //							url : "blackCustPerson_Check.action",
            //							waitMsg : "正在提交数据...",
            //							params : {
            //								data : data
            //							},
            //							success : function(d, g) {
            //								var mes = "成功保存信息！";
            //								var result=g.result.myResult;
            //								if(result=="NO"){
            //									Ext.MessageBox.alert("操作信息", "该客户不是黑名单客户!");
            //								}else if(result=="YES"){
            //									var blackCust=g.result.blackCust;
            //									alert(blackCust.state);
            //								}
            //								return;
            //								if(result!="success"){
            //									Ext.MessageBox.alert("操作信息", result);
            //								}else{
            //									Ext.MessageBox.alert("操作信息", mes,function(){
            //										parent.Ext.getCmp("customerAddWin").close();
            //									});
            //								}
            //							},
            //							failure : function(d, e) {
            //								Ext.MessageBox.show({
            //									title : "操作信息",
            //									msg : "信息保存出错，请联系管理员！",
            //									buttons : Ext.MessageBox.OK,
            //									icon : Ext.MessageBox.ERROR
            //								});
            //							}
            //						}
            //				    		  );
            //				      }else{
            //				    	  Ext.MessageBox.alert("操作信息", "请输入完整信息！");
            //				    	  return;
            //				      }
            //				
            //				}
            //			},
            {
                text: "取消",
                iconCls: "btn-cancel",
                hidden: cpf.customer.isSurvey == '1' ? true: false,
                handler: function() {
                    Ext.Msg.confirm("信息确认", "您确认要取消吗？",
                    function(c) {
                        if (c == "yes") {
                            parent.Ext.getCmp("customerAddWin").close();
                        }
                    });
                }
            }],
            bodyStyle: "padding: 5px;",
            frame: true,
            defaultType: "textfield",
            items: [new Ext.form.FieldSet({
                title: '客户个人类型信息',
                height: '100%',
                layout: 'column',
                anchor: '100%',
                labelWidth: 100,
                items: [{
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.customerName',
                        readOnly: true,
                        fieldLabel: '客户姓名',
                        xtype: 'textfield',
                        value: cpf.customer.customerName,
                        disabled: false,
                        allowBlank: false,
                        maxLength: 40,
                        maxLengthText: '客户姓名长度超过40位',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.englishName',
                        readOnly: true,
                        fieldLabel: '客户英文名称',
                        xtype: 'textfield',
                        value: cpf.customer.englishName,
                        disabled: false,
                        regex: /^[a-zA-Z]+$/,
                        regexText: '请输入英文字母',
                        maxLength: 100,
                        maxLengthText: '客户英文名称长度超过100位',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.customerType',
                        fieldLabel: '客户类型',
                        hiddenName: 'customer.customerType',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: customerType
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: 1,
                        //value : cpf.customer.customerType
                        readOnly: true,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.ecifId',
                        
                        fieldLabel: '客户编号',
                        xtype: 'textfield',
                        value: cpf.customer.ecifId,
                        readOnly: true,
                        emptyText: '系统自动生成',
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.idNumber',
                        readOnly: true,
                        fieldLabel: '身份证号码',
                        xtype: 'textfield',
                        id: "customerPerson.idNumber",
                        value: cpf.customer.documentCode,
                        regex: /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/,
                        regexText: '输入正确的身份号码',
                        allowBlank: false,
                        disabled: false,
                        readOnly: cpf.customer.id == null ? false: true,
                        validateOnChange: false,
                        validator: function() {
                            //ajax 提交同步数据
                            var _value = Ext.getCmp("customerPerson.idNumber").getValue();
                            var re = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
                            var _flag = true;
                            _flag = re.test(_value);
                            if (_flag) {
                                if (!Ext.isEmpty(_value)) {
                                    Ext.Ajax.request({
                                        async: false,
                                        url: "customerUnique.action",
                                        method: "POST",
                                        params: {
                                            documentCode: _value,
                                            customerType: "1"
                                        },
                                        success: function(response, opts) {
                                            _flag = Ext.decode(response.responseText);
                                            if (_flag) { //帐号不存在
                                            	getBirthdayByIdCard(_value, Ext.getCmp('customerView'),'customerPerson.birthDate');
                                                return true;
                                            } else {
                                                if (cpf.customer.id != null) {
                                                    return true;
                                                } else {
                                                    this.markInvalid("此客户已存在！");
                                                    return false;
                                                }
                                            }
                                        },
                                        scope: this
                                    });
                                } else {
                                    this.markInvalid("身份证不能为空!");
                                    return false;
                                }
                            } else {
                                this.markInvalid("输入正确的身份号码!");
                                return false;
                            }
                        },
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.personType',
                        readOnly: true,
                        fieldLabel: '客户分类',
                        hiddenName: 'customerPerson.personType',
                        id: 'customerPerson.personTypeID',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: personType
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        allowBlank: false,
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.personType,
                        width: eleWidth,
                        listeners: {
                            select: function(combo, record, index) {
                                var personType = Ext.getCmp("customerPerson.personTypeID").getValue();
                                //自雇人士 
                                if (personType == '1') {
                                    Ext.getCmp("selfEmployedFieldSet").show();
                                    //var t = Ext.getCmp("selfEmployedFieldSet").down("textfield");
                                    Ext.getCmp("employeeCountSelf").enable();
                                    Ext.getCmp("farmerFieldSet").hide();
                                    Ext.getCmp("salariedFieldSet").hide();
                                    Ext.getCmp("employeeCountFarmer").disable();

                                    for (var i = 0; i < _TheArrayA.length; i++) {
                                        Ext.getCmp(_TheArrayA[i]).allowBlank = false;
                                    }
                                    for (var i = 0; i < _TheArrayB.length; i++) {
                                        Ext.getCmp(_TheArrayB[i]).allowBlank = true;
                                    }
                                    for (var i = 0; i < _TheArrayC.length; i++) {
                                        Ext.getCmp(_TheArrayC[i]).allowBlank = true;
                                    }

                                } else if (personType == '2') {
                                    Ext.getCmp("salariedFieldSet").show();
                                    Ext.getCmp("selfEmployedFieldSet").hide();
                                    Ext.getCmp("farmerFieldSet").hide();
                                    Ext.getCmp("employeeCountSelf").disable();
                                    Ext.getCmp("employeeCountFarmer").disable();
                                    for (var i = 0; i < _TheArrayA.length; i++) {
                                        Ext.getCmp(_TheArrayA[i]).allowBlank = true;
                                    }
                                    for (var i = 0; i < _TheArrayB.length; i++) {
                                        Ext.getCmp(_TheArrayB[i]).allowBlank = true;
                                    }
                                    for (var i = 0; i < _TheArrayC.length; i++) {
                                        Ext.getCmp(_TheArrayC[i]).allowBlank = false;
                                    }
                                }
                                //农户 
                                else if (personType == '3') {
                                    Ext.getCmp("selfEmployedFieldSet").hide();
                                    Ext.getCmp("salariedFieldSet").hide();
                                    Ext.getCmp("farmerFieldSet").show();
                                    Ext.getCmp("employeeCountSelf").disable();
                                    Ext.getCmp("employeeCountFarmer").enable();

                                    for (var i = 0; i < _TheArrayA.length; i++) {
                                        Ext.getCmp(_TheArrayA[i]).allowBlank = true;
                                    }
                                    for (var i = 0; i < _TheArrayB.length; i++) {
                                        Ext.getCmp(_TheArrayB[i]).allowBlank = false;
                                    }
                                    for (var i = 0; i < _TheArrayC.length; i++) {
                                        Ext.getCmp(_TheArrayC[i]).allowBlank = true;
                                    }
                                }
                            }
                        }
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.gender',
                        readOnly: true,
                        fieldLabel: '性别',
                        hiddenName: 'customerPerson.gender',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: gender
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        allowBlank: false,
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.gender,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.birthDate',
                        readOnly: true,
                        fieldLabel: '出生日期',
                        value: cpf.customerPerson.birthDate,
                        xtype: 'datefield',
                        allowBlank: false,
                        format: 'Y-m-d',
                        emptyText: '',
                        altFormats: 'YYYY-mm-dd',
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.politicalAffiliation',
                        readOnly: true,
                        fieldLabel: '政治面貌',
                        hiddenName: 'customerPerson.politicalAffiliation',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: politicalAffiliation
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.politicalAffiliation,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.ethnicGroup',
                        readOnly: true,
                        fieldLabel: '民族',
                        xtype: 'textfield',
                        value: cpf.customerPerson.ethnicGroup,
                        maxLength: 30,
                        maxLengthText: '长度超过30位',
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.localDomiciliary',
                        readOnly: true,
                        fieldLabel: '是否本地户籍',
                        hiddenName: 'customerPerson.localDomiciliary',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: yesorno
                        }),
                        allowBlank: false,
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.localDomiciliary,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.domiciliaryType',
                        readOnly: true,
                        fieldLabel: '户籍类型',
                        hiddenName: 'customerPerson.domiciliaryType',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: domiciliaryType
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.domiciliaryType,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.domicilePlace',
                        readOnly: true,
                        fieldLabel: '户籍所在地',
                        xtype: 'textfield',
                        allowBlank: false,
                        value: cpf.customerPerson.domicilePlace,
                        maxLength: 60,
                        maxLengthText: '长度超过60位',
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.maritalStatus',
                        readOnly: true,
                        fieldLabel: '婚姻状况',
                        hiddenName: 'customerPerson.maritalStatus',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: maritalStatus
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        allowBlank: false,
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.maritalStatus,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.residentialStatus',
                        readOnly: true,
                        fieldLabel: '居住状况',
                        hiddenName: 'customerPerson.residentialStatus',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: residentialStatus
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.residentialStatus,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.educationLevel',
                        readOnly: true,
                        fieldLabel: '最高学历',
                        hiddenName: 'customerPerson.educationLevel',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: educationLevel
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        allowBlank: false,
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.educationLevel,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.drivingLicense',
                        readOnly: true,
                        fieldLabel: '驾驶执照获取年限(年)',
                        value: cpf.customerPerson.drivingLicense,
                        disabled: false,
                        xtype: 'numberfield',
                        allowDecimals: true,
                        allowBlank: false,
                        decimalPrecision: 0,
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
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.healthCondition',
                        readOnly: true,
                        fieldLabel: '健康状况',
                        hiddenName: 'customerPerson.healthCondition',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: healthCondition
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        allowBlank: false,
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.healthCondition,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.industry',
                        readOnly: true,
                        fieldLabel: '行业',
                        hiddenName: 'customerPerson.industry',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: industry
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        allowBlank: false,
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.industry,
                        width: eleWidth
                    })]
                },
                {
                    name: "customerPerson.id",
                    xtype: "hidden",
                    value: cpf.customerPerson.id
                }]
            }), new Ext.form.FieldSet({
                title: '客户账户信息',
                height: '100%',
                id: 'accountFieldSet',
                layout: 'column',
                readOnly: true,
                items: [{
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.accountCode',
                        readOnly: true,
                        fieldLabel: '账户号',
                        xtype: 'textfield',
                        value: cpf.customer.accountCode,
                        disabled: false,
                        allowBlank: false,
                        maxLength: 30,
                        maxLengthText: '账户长度超过30位',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.bankVip',
                        readOnly: true,
                        fieldLabel: '银行VIP客户',
                        hiddenName: 'customer.bankVip',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: yesorno
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        allowBlank: false,
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customer.bankVip,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.customerValidity',
                        readOnly: true,
                        fieldLabel: '账户有效性',
                        hiddenName: 'customer.customerValidity',
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
                        value: cpf.customer.customerValidity,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.expiryDate',
                        fieldLabel: '账户失效日期',
                        readOnly: true,
                        value: cpf.customer.expiryDate,
                        xtype: 'datefield',
                        format: 'Y-m-d',
                        emptyText: '',
                        altFormats: 'YYYY-mm-dd',
                        disabled: false,
                        width: eleWidth,
                        editable: false
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.depositaryBank',
                        readOnly: true,
                        fieldLabel: '开户银行',
                        hiddenName: 'customer.depositaryBank',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: bank
                        }),
                        listWidth: 400,
                        valueField: 'key',
                        displayField: 'value',
                        id: 'customer.depositaryBankID',
                        mode: 'local',
                        typeAhead: true,
                        triggerAction: 'all',
                        selectOnFocus: true,
                        value: cpf.customer.depositaryBank,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.headBank',
                        fieldLabel: '银行总行名称',
                        readOnly: true,
                        xtype: 'textfield',
                        value: cpf.customer.headBank,
                        maxLength: 60,
                        maxLengthText: '银行总行名称长度超过60位',
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.accountProperty',
                        readOnly: true,
                        fieldLabel: '账户属性',
                        hiddenName: 'customer.accountProperty',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: accountProperty
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customer.accountProperty,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.accountName',
                        readOnly: true,
                        fieldLabel: '开户名称',
                        xtype: 'textfield',
                        value: cpf.customer.accountName,
                        disabled: false,
                        maxLength: 60,
                        maxLengthText: '开户名称长度超过60位',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.accountCurrency',
                        readOnly: true,
                        fieldLabel: '账户币别',
                        hiddenName: 'customer.accountCurrency',
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
                        value: 'CNY',
                        readOnly: true,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.accountProvince',
                        id: 'customer.accountProvinceID',
                        readOnly: true,
                        fieldLabel: '收款账户省份',
                        hiddenName: 'customer.accountProvince',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: province
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customer.accountProvince,
                        width: eleWidth,
                        listeners: {
                            select: function(combo, record, index) {
                                var data = Ext.getCmp('customer.accountProvinceID').getValue();
                                var currentAccountCity = Ext.getCmp('customer.accountCityID');
                                var currentCity = [];
                                if (data.length > 4) {
                                    var i = 0;
                                    for (var n = 0; n < city.length; n++) {
                                        if (city[n][0].substr(0, 2) == data.substr(0, 2)) {
                                            currentCity[i] = city[n];
                                            i = i + 1;
                                        }
                                    }
                                }
                                currentAccountCity.reset();
                                currentAccountCity.store.removeAll();
                                currentAccountCity.store.loadData(currentCity, true);
                            }
                        }
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.accountCity',
                        id: 'customer.accountCityID',
                        readOnly: true,
                        fieldLabel: '收款账户城市',
                        hiddenName: 'customer.accountCity',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: city
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customer.accountCity,
                        width: eleWidth,
                        listeners: {
                            expand: function(combo) {
                                var data = Ext.getCmp('customer.accountProvinceID').getValue();
                                var currentAccountCity = Ext.getCmp('customer.accountCityID');
                                var currentCity = [];
                                if (data.length > 4) {
                                    var i = 0;
                                    for (var n = 0; n < city.length; n++) {
                                        if (city[n][0].substr(0, 2) == data.substr(0, 2)) {
                                            currentCity[i] = city[n];
                                            i = i + 1;
                                        }
                                    }
                                }
                                currentAccountCity.reset();
                                currentAccountCity.store.removeAll();
                                currentAccountCity.store.loadData(currentCity, true);
                            }
                        }

                    })]
                }]
            }), new Ext.form.FieldSet({
                title: '客户收入信息',
                height: '100%',
                id: 'incomeFieldSet',
                layout: 'column',
                readOnly: true,
                items: [{
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.annualIncome',
                        readOnly: true,
                        fieldLabel: '个人年收入(元)',
                        value: cpf.customerPerson.annualIncome,
                        xtype: 'numberfield',
                        allowDecimals: true,
                        allowBlank: false,
                        decimalPrecision: 4,
                        // 小数点后位数,
                        maxValue: 999999999999999,
                        allowNegative: false,
                        // 是否允许负数
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.householdIncome',
                        readOnly: true,
                        fieldLabel: '家庭年收入(元)',
                        value: cpf.customerPerson.householdIncome,
                        disabled: false,
                        xtype: 'numberfield',
                        allowDecimals: true,
                        allowBlank: false,
                        maxValue: 999999999999999,
                        decimalPrecision: 4,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.monthHouseincome',
                        readOnly: true,
                        fieldLabel: '家庭月收入(元)',
                        value: cpf.customerPerson.monthHouseincome,
                        disabled: false,
                        xtype: 'numberfield',
                        allowDecimals: true,
                        maxValue: 999999999999999,
                        decimalPrecision: 4,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.otherIncome',
                        readOnly: true,
                        fieldLabel: '其他收入来源',
                        hiddenName: 'customerPerson.otherIncome',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: otherIncome
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.otherIncome,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.incomeStability',
                        readOnly: true,
                        fieldLabel: '收入稳定性',
                        hiddenName: 'customerPerson.incomeStability',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: incomeStability
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        allowBlank: false,
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.incomeStability,
                        width: eleWidth
                    })]
                }]
            }), new Ext.form.FieldSet({
                title: '客户联系信息',
                height: '100%',
                id: 'contactFieldSet',
                layout: 'column',
                readOnly: true,
                items: [{
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.telephone',
                        readOnly: true,
                        fieldLabel: '手机',
                        xtype: 'textfield',
                        value: cpf.customerPerson.telephone,
                        regex: /^[1]\d{10}$/,
                        disabled: false,
                        allowBlank: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.address',
                        readOnly: true,
                        fieldLabel: '地址',
                        xtype: 'textfield',
                        value: cpf.customer.address,
                        disabled: false,
                        allowBlank: false,
                        maxLength: 40,
                        maxLengthText: '地址长度超过40位',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.zipCode',
                        readOnly: true,
                        fieldLabel: '邮编',
                        xtype: 'textfield',
                        value: cpf.customer.zipCode,
                        maxLength: 20,
                        maxLengthText: '邮编长度超过20位',
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.cellPhone',
                        readOnly: true,
                        fieldLabel: '电话',
                        xtype: 'textfield',
                        value: cpf.customer.cellPhone,
                        regex: /^\d+$/,
                        regexText: "电话号码只能为数字",
                        maxLength: 20,
                        maxLengthText: '电话长度超过20位',
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.faxNo',
                        readOnly: true,
                        fieldLabel: '传真',
                        xtype: 'textfield',
                        value: cpf.customer.faxNo,
                        disabled: false,
                        maxLength: 30,
                        maxLengthText: '传真长度超过30位',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.email',
                        readOnly: true,
                        fieldLabel: 'EMAIL',
                        xtype: 'textfield',
                        value: cpf.customer.email,
                        vtype: 'email',
                        vtypeText: '请正确输入邮箱地址',
                        maxLength: 100,
                        maxLengthText: 'EMAIL长度超过100位',
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.contactPerson',
                        readOnly: true,
                        fieldLabel: '联系人',
                        xtype: 'textfield',
                        value: cpf.customerPerson.contactPerson,
                        allowBlank: false,
                        disabled: false,
                        maxLength: 40,
                        maxLengthText: '长度超过40位',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.contactTele',
                        readOnly: true,
                        fieldLabel: '联系人电话',
                        xtype: 'textfield',
                        value: cpf.customerPerson.contactTele,
                        regex: /^\d+$/,
                        regexText: "电话号码只能为数字",
                        maxLength: 20,
                        maxLengthText: '电话长度超过20位',
                        disabled: false,
                        allowBlank: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.contactAddress',
                        readOnly: true,
                        fieldLabel: '联系人地址',
                        xtype: 'textfield',
                        value: cpf.customerPerson.contactAddress,
                        maxLength: 60,
                        allowBlank: false,
                        maxLengthText: '长度超过60位',
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.contactCode',
                        readOnly: true,
                        fieldLabel: '联系人邮编',
                        xtype: 'textfield',
                        allowBlank: false,
                        value: cpf.customerPerson.contactCode,
                        disabled: false,
                        maxLength: 20,
                        width: eleWidth
                    }]
                }]
            }), new Ext.form.FieldSet({
                title: '客户家庭及配偶信息',
                height: '100%',
                id: 'familyFieldSet',
                layout: 'column',
                readOnly: true,
                items: [{
                    columnWidth: .25,
                    layout: 'form',
                    hidden: true,
                    items: [{
                        id: 'customerPerson.spouseId',
                        name: 'customerPerson.spouseId',
                        readOnly: true,
                        fieldLabel: '配偶客户ID',
                        xtype: 'textfield',
                        value: cpf.customerPerson.spouseId,
                        disabled: false,
                        hidden: true,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        id: 'customerPerson.spouseEcifId',
                        name: 'customerPerson.spouseEcifId',
                        fieldLabel: '配偶客户编号',
                        xtype: 'textfield',
                        readOnly: true,
                        value: cpf.customerPerson.spouseEcifId,
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        id: 'customerPerson.spouseIdName',
                        name: 'customerPerson.spouseIdName',
                        fieldLabel: '配偶姓名',
                        readOnly: true,
                        xtype: 'textfield',
                        value: cpf.customerPerson.spouseIdName,
                        disabled: false,
                        width: eleWidth
                    }]
                },
                /*{
                    columnWidth: .25,
                    layout: 'table',
                    border: false,
                    layoutConfig: {
                        columns: 8
                    },
                    items: [{
                        text: "新增引入配偶客户",
                        xtype: 'button',
                        iconCls: "lb-cmd-Add",
                        anchor: '10%',
                        listeners: {
                            "click": function() {
                                xinzengallkehunew(setSpouse);
                            }
                        }
                    },
                    {
                        text: "重置",
                        iconCls: "btn-reset",
                        anchor: '10%',
                        xtype: 'button',
                        listeners: {
                            "click": function() {
                                var cmpName = Ext.getCmp("customerPerson.spouseIdName");
                                var cmpId = Ext.getCmp("customerPerson.spouseId");
                                Ext.getCmp("customerPerson.spouseEcifId").setValue("");
                                cmpId.setValue("");
                                cmpName.setValue("");
                            }
                        }

                    },
                    {
                        text: "查看客户配偶",
                        xtype: 'button',
                        iconCls: "x-btn-text lb-btn-advSearch",
                        anchor: '10%',
                        xtype: 'button',
                        listeners: {
                            "click": function() {
                                var userID = Ext.getCmp("customerPerson.spouseId").getValue();
                                if (userID == "" || userID == null) {
                                    Ext.MessageBox.alert("操作信息", "该用户不存在或尚未选择用户");
                                } else {
                                    chakan(userID);
                                }
                            }
                        }
                    }]
                },*/
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.familyPopulation',
                        readOnly: true,
                        fieldLabel: '家庭人口数',
                        value: cpf.customerPerson.familyPopulation,
                        xtype: 'numberfield',
                        allowDecimals: true,
                        decimalPrecision: 0,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        disabled: false,
                        allowBlank: false,
                        maxValue: 100,
                        width: eleWidth
                    }]
                }]
            }), new Ext.form.FieldSet({
                title: '客户其他信息',
                height: '100%',
                layout: 'column',
                items: [{
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.relationState',
                        readOnly: true,
                        fieldLabel: '是否关联方',
                        hiddenName: 'customer.relationState',
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
                        value: cpf.customer.relationState,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.externalRate',
                        readOnly: true,
                        fieldLabel: '保证人外部评级',
                        hiddenName: 'customer.externalRate',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: guarantorLevel
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        allowBlank: false,
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customer.externalRate,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.humanNature',
                        readOnly: true,
                        fieldLabel: '作为担保人性质',
                        hiddenName: 'customer.humanNature',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: humanNature
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        allowBlank: false,
                        selectOnFocus: true,
                        value: cpf.customer.humanNature,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.externalAmount',
                        readOnly: true,
                        fieldLabel: '当前对外担保额(元)',
                        xtype: 'numberfield',
                        allowDecimals: true,
                        decimalPrecision: 4,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        value: cpf.customer.externalAmount,
                        disabled: false,
                        maxValue: 999999999999999,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    hidden: true,
                    items: [new Ext.form.ComboBox({
                        name: 'customer.assuredType',
                        readOnly: true,
                        fieldLabel: '作为被保险人类型',
                        hiddenName: 'customer.assuredType',
                        id: "customer.assuredType",
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: assuredType
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        hidden: true,
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customer.assuredType,
                        width: eleWidth
                    })]
                },
                {
                    name: "customer.id",
                    xtype: "hidden",
                    id: 'customerRootId',
                    value: cpf.customer.id
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.repayAbility',
                        readOnly: true,
                        fieldLabel: '发生重大不利事件',
                        hiddenName: 'customer.repayAbility',
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
                        width: eleWidth,
                        value: cpf.customer.repayAbility
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.repayAbilityremark',
                        readOnly: true,
                        fieldLabel: '重大不利事件说明',
                        xtype: 'textarea',
                        value: cpf.customer.repayAbilityremark,
                        disabled: false,
                        maxLength: 600,
                        maxLengthText: '长度超过600位',
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customer.remark',
                        readOnly: true,
                        fieldLabel: '备注',
                        xtype: 'textarea',
                        value: cpf.customer.remark,
                        maxLength: 600,
                        maxLengthText: '备注长度超过600位',
                        disabled: false,
                        width: eleWidth
                    }]
                }]
            }),

            new Ext.form.FieldSet({
                title: '受薪人士基本信息',
                height: '100%',
                id: 'salariedFieldSet',
                layout: 'column',
                items: [{
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.workUnit',
                        id: 'workUnitSalary',
                        readOnly: true,
                        fieldLabel: '工作单位',
                        xtype: 'textfield',
                        value: cpf.customerPerson.workUnit,
                        maxLength: 20,
                        maxLengthText: '长度大于20!',
                        disabled: false,
                        allowBlank: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.unitAddress',
                        id: 'unitAddressSalary',
                        readOnly: true,
                        fieldLabel: '工作单位地址',
                        xtype: 'textfield',
                        value: cpf.customerPerson.unitAddress,
                        maxLength: 25,
                        maxLengthText: '长度大于25!',
                        disabled: false,
                        allowBlank: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.workPhone',
                        id: 'workPhoneSalary',
                        readOnly: true,
                        fieldLabel: '工作单位电话',
                        xtype: 'textfield',
                        value: cpf.customerPerson.workPhone,
                        regex: /^\d+$/,
                        regexText: "电话号码只能为数字",
                        maxLength: 20,
                        maxLengthText: '电话长度超过20位',
                        disabled: false,
                        allowBlank: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.profession',
                        id: 'professionSalary',
                        readOnly: true,
                        fieldLabel: '职业',
                        hiddenName: 'customerPerson.profession',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: profession
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        allowBlank: false,
                        value: cpf.customerPerson.profession,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.position',
                        id: 'positionSalary',
                        readOnly: true,
                        fieldLabel: '职务',
                        hiddenName: 'customerPerson.position',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: position
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        allowBlank: false,
                        value: cpf.customerPerson.position,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.workExperience',
                        id: 'workExperienceSalary',
                        readOnly: true,
                        fieldLabel: '行业从业年限',
                        value: cpf.customerPerson.workExperience,
                        xtype: 'numberfield',
                        allowDecimals: true,
                        decimalPrecision: 0,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        disabled: false,
                        allowBlank: false,
                        maxValue: 100,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.securityNumber',
                        readOnly: true,
                        fieldLabel: '社保账号',
                        xtype: 'textfield',
                        value: cpf.customerPerson.securityNumber,
                        disabled: false,
                        maxValue: 30,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.securityMonth',
                        readOnly: true,
                        fieldLabel: '社保月缴额(元)',
                        xtype: 'textfield',
                        value: cpf.customerPerson.securityMonth,
                        disabled: false,
                        maxValue: 999999999999999,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.payPeriod',
                        id: 'payPeriod',
                        readOnly: true,
                        fieldLabel: '养老保险/公积金缴纳情况',
                        hiddenName: 'customerPerson.payPeriod',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: fundAccount
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        allowBlank: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.payPeriod,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.fundAccount',
                        readOnly: true,
                        fieldLabel: '公积金账户',
                        xtype: 'textfield',
                        value: cpf.customerPerson.fundAccount,
                        maxLength: 30,
                        maxLengthText: '长度超过30位',
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.fundMonth',
                        readOnly: true,
                        fieldLabel: '公积金月缴额(元)',
                        xtype: 'textfield',
                        value: cpf.customerPerson.fundMonth,
                        disabled: false,
                        maxValue: 999999999999999,
                        width: eleWidth
                    }]
                }]
            }), new Ext.form.FieldSet({
                title: '自雇人士企业基本信息',
                height: '100%',
                id: 'selfEmployedFieldSet',
                layout: 'column',
                items: [{
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.registeredCapital',
                        id: 'registeredCapitalSelf',
                        readOnly: true,
                        fieldLabel: '注册资金(元)',
                        value: cpf.customerPerson.registeredCapital,
                        xtype: 'numberfield',
                        allowBlank: false,
                        allowDecimals: true,
                        decimalPrecision: 4,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        disabled: false,
                        maxValue: 999999999999999,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.enterpriseType',
                        id: 'enterpriseTypeSelf',
                        readOnly: true,
                        fieldLabel: '企业类型',
                        hiddenName: 'customerPerson.enterpriseType',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: companyType
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        allowBlank: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.enterpriseType,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.employeeCount',
                        id: 'employeeCountSelf',
                        readOnly: true,
                        fieldLabel: '雇员人数',
                        xtype: 'numberfield',
                        allowDecimals: true,
                        allowBlank: false,
                        decimalPrecision: 0,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        value: cpf.customerPerson.employeeCount,
                        disabled: true,
                        maxValue: 9999999999,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.setTime',
                        id: 'setTimeSelf',
                        readOnly: true,
                        fieldLabel: '成立时间',
                        value: cpf.customerPerson.setTime,
                        xtype: 'datefield',
                        allowBlank: false,
                        format: 'Y-m-d',
                        emptyText: '',
                        altFormats: 'YYYY-mm-dd',
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.coreAdvantage',
                        id: 'coreAdvantageSelf',
                        readOnly: true,
                        fieldLabel: '经营企业核心优势',
                        hiddenName: 'customer.coreAdvantage',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: coreAdvantage
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        allowBlank: false,
                        selectOnFocus: true,
                        value: cpf.customer.coreAdvantage,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.developProspect',
                        id: 'developProspectSelf',
                        readOnly: true,
                        fieldLabel: '经营企业发展前景',
                        hiddenName: 'customer.developProspect',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: developProspect
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        allowBlank: false,
                        selectOnFocus: true,
                        value: cpf.customer.developProspect,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customer.lifeCycle',
                        id: 'lifeCycleSelf',
                        readOnly: true,
                        fieldLabel: '经营企业生命周期',
                        hiddenName: 'customer.lifeCycle',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: lifeCycle
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        allowBlank: false,
                        selectOnFocus: true,
                        value: cpf.customer.lifeCycle,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.businessAge',
                        id: 'businessAgeSelf',
                        readOnly: true,
                        fieldLabel: '经营年限(年)',
                        value: cpf.customerPerson.businessAge,
                        disabled: false,
                        allowBlank: false,
                        xtype: 'numberfield',
                        allowDecimals: true,
                        decimalPrecision: 0,
                        // 小数点后位数,
                        maxValue: 9999999999,
                        allowNegative: false,
                        // 是否允许负数
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.businessPlace',
                        id: 'businessPlaceSelf',
                        readOnly: true,
                        fieldLabel: '是否有固定经营场所',
                        hiddenName: 'customerPerson.businessPlace',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: yesorno
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        allowBlank: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.businessPlace,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.stockProportion',
                        readOnly: true,
                        fieldLabel: '股份占比(%)',
                        value: cpf.customerPerson.stockProportion,
                        disabled: false,
                        xtype: 'numberfield',
                        allowDecimals: true,
                        decimalPrecision: 4,
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
                    items: [{
                        name: 'customerPerson.monthTax',
                        readOnly: true,
                        fieldLabel: '月均纳税额(元)',
                        xtype: 'numberfield',
                        allowDecimals: true,
                        decimalPrecision: 4,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        value: cpf.customerPerson.monthTax,
                        maxValue: 99999999999999999999,
                        disabled: false,
                        width: eleWidth
                    }]
                }]
            }), new Ext.form.FieldSet({
                title: '农户类型专属信息',
                height: '100%',
                id: 'farmerFieldSet',
                layout: 'column',
                items: [{
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.nonlaborPopulation',
                        id: "customerPerson.nonlaborPopulation",
                        readOnly: true,
                        fieldLabel: '非劳动力人口数',
                        xtype: 'textfield',
                        value: cpf.customerPerson.nonlaborPopulation,
                        disabled: false,
                        allowBlank: false,
                        maxValue: 999,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.headHousehold',
                        readOnly: true,
                        fieldLabel: '是否户主',
                        hiddenName: 'customerPerson.headHousehold',
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
                        value: cpf.customerPerson.headHousehold,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.familyType',
                        readOnly: true,
                        fieldLabel: '家庭经营类型',
                        hiddenName: 'customerPerson.familyType',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: familyType
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.familyType,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.yearHouseincome',
                        readOnly: true,
                        fieldLabel: '家庭人均年收入(元)',
                        xtype: 'numberfield',
                        allowDecimals: true,
                        decimalPrecision: 4,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        value: cpf.customerPerson.yearHouseincome,
                        disabled: false,
                        maxValue: 999999999999999,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.saving',
                        id: "customerPerson.saving",
                        readOnly: true,
                        fieldLabel: '储蓄额(元)',
                        xtype: 'numberfield',
                        allowBlank: false,
                        allowDecimals: true,
                        decimalPrecision: 4,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        value: cpf.customerPerson.saving,
                        disabled: false,
                        maxValue: 999999999999999,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.liabilities',
                        readOnly: true,
                        fieldLabel: '负债额(元)',
                        xtype: 'numberfield',
                        id: "customerPerson.liabilities",
                        allowDecimals: true,
                        allowBlank: false,
                        decimalPrecision: 4,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        value: cpf.customerPerson.liabilities,
                        maxValue: 999999999999999,
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [new Ext.form.ComboBox({
                        name: 'customerPerson.villageCredit',
                        readOnly: true,
                        fieldLabel: '村庄信用情况',
                        hiddenName: 'customerPerson.villageCredit',
                        store: new Ext.data.SimpleStore({
                            fields: ['key', 'value'],
                            data: villageCredit
                        }),
                        valueField: 'key',
                        displayField: 'value',
                        mode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        selectOnFocus: true,
                        value: cpf.customerPerson.villageCredit,
                        width: eleWidth
                    })]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.employeeCount',
                        readOnly: true,
                        fieldLabel: '雇员人数',
                        xtype: 'numberfield',
                        allowBlank: false,
                        allowDecimals: true,
                        decimalPrecision: 0,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        id: 'employeeCountFarmer',
                        value: cpf.customerPerson.employeeCount,
                        disabled: true,
                        maxValue: 9999999999,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.gardenArea',
                        readOnly: true,
                        fieldLabel: '种植养殖园-面积（亩）',
                        id: "customerPerson.gardenArea",
                        xtype: 'numberfield',
                        allowDecimals: true,
                        allowBlank: false,
                        decimalPrecision: 4,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        value: cpf.customerPerson.gardenArea,
                        disabled: false,
                        maxValue: 999999,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.gardenAnnualvalue',
                        id: "customerPerson.gardenAnnualvalue",
                        readOnly: true,
                        fieldLabel: '种植养殖园-年产值（万元）',
                        xtype: 'numberfield',
                        allowDecimals: true,
                        allowBlank: false,
                        decimalPrecision: 4,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        value: cpf.customerPerson.gardenAnnualvalue / 10000,
                        maxValue: 99999999999,
                        disabled: false,
                        width: eleWidth
                    }]
                },
                {
                    columnWidth: .25,
                    layout: 'form',
                    items: [{
                        name: 'customerPerson.gardenAnnualincome',
                        id: "customerPerson.gardenAnnualincome",
                        readOnly: true,
                        fieldLabel: '种植养殖园-年净收入（万元）',
                        xtype: 'numberfield',
                        allowDecimals: true,
                        allowBlank: false,
                        decimalPrecision: 4,
                        // 小数点后位数,
                        allowNegative: false,
                        // 是否允许负数
                        value: cpf.customerPerson.gardenAnnualincome / 10000,
                        maxValue: 99999999999,
                        disabled: false,
                        width: eleWidth
                    }]
                }]
            }), new Ext.form.FieldSet({
                title: '客户房产信息列表',
                height: '100%',
                layout: 'column',
                items: [customerAssetGrid]
            }), new Ext.form.FieldSet({
                title: '客户汽车资产信息列表',
                height: '100%',
                layout: 'column',
                items: [customerCarAssetGrid]
            }), new Ext.form.FieldSet({
                title: '客户其他资产列表',
                height: '100%',
                layout: 'column',
                items: [customerOtherAssetGrid]
            }), new Ext.form.FieldSet({
                title: '客户其他证件列表',
                height: '100%',
                layout: 'column',
                items: [certificateGrid]
            }), new Ext.form.FieldSet({
                title: '客户所持信用卡/贷款卡列表',
                height: '100%',
                layout: 'column',
                items: [creditCardGrid]
            })

            , new Ext.form.FieldSet({
                title: '客户黑名单公共查询',
                height: '100%',
                layout: 'column',
                items: [blackPublicGrid]
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
    var mainPanel = new customerView({
        flex: 1
    });
    //	分公司核保岗查看当前页面
    if ('1' == cpf.customer.isFgshbg) {
        //		禁用页面内所有组件
        var hbcsPanel = Ext.getCmp('customerView');
        disXtype();
        //		隐藏页面内按钮
        for (var i = 0; i < hbcsPanel.buttons.length; i++) {
            var buttonItem = hbcsPanel.buttons[i];
            buttonItem.hide();
        }

    }
    var viewport = new Ext.Viewport({
        layout: 'fit',
        // vbox//fit
        layoutConfig: {
            align: 'stretch',
            pack: 'start'
        },
        items: [mainPanel]
    });
    var personType = cpf.customerPerson.personType;
    //自雇人士 
    //	Ext.getCmp("farmerFieldSet").setDisabled(true); 
    Ext.getCmp("farmerFieldSet").hide();
    //	Ext.getCmp("selfEmployedFieldSet").setDisabled(true);
    Ext.getCmp("selfEmployedFieldSet").hide();
    //	Ext.getCmp("salariedFieldSet").setDisabled(true);
    Ext.getCmp("salariedFieldSet").hide();

    Ext.getCmp("employeeCountSelf").disable();
    Ext.getCmp("employeeCountFarmer").disable();
    if (personType == '1') {
        Ext.getCmp("selfEmployedFieldSet").show();
        Ext.getCmp("employeeCountSelf").enable();
        Ext.getCmp("farmerFieldSet").hide();
        Ext.getCmp("employeeCountFarmer").disable();
        for (var i = 0; i < _TheArrayA.length; i++) {
            Ext.getCmp(_TheArrayA[i]).allowBlank = false;
        }
        for (var i = 0; i < _TheArrayB.length; i++) {
            Ext.getCmp(_TheArrayB[i]).allowBlank = true;
        }
        for (var i = 0; i < _TheArrayC.length; i++) {
            Ext.getCmp(_TheArrayC[i]).allowBlank = true;
        }
    } else if (personType == '2') {
        Ext.getCmp("salariedFieldSet").show();
        Ext.getCmp("employeeCountSelf").disable();
        Ext.getCmp("employeeCountFarmer").disable();
        for (var i = 0; i < _TheArrayA.length; i++) {
            Ext.getCmp(_TheArrayA[i]).allowBlank = true;
        }
        for (var i = 0; i < _TheArrayB.length; i++) {
            Ext.getCmp(_TheArrayB[i]).allowBlank = true;
        }
        for (var i = 0; i < _TheArrayC.length; i++) {
            Ext.getCmp(_TheArrayC[i]).allowBlank = false;
        }
    }
    //农户
    else if (personType == '3') {
        Ext.getCmp("selfEmployedFieldSet").hide();
        Ext.getCmp("farmerFieldSet").show();
        Ext.getCmp("employeeCountSelf").disable();
        Ext.getCmp("employeeCountFarmer").enable();
        for (var i = 0; i < _TheArrayA.length; i++) {
            Ext.getCmp(_TheArrayA[i]).allowBlank = true;
        }
        for (var i = 0; i < _TheArrayB.length; i++) {
            Ext.getCmp(_TheArrayB[i]).allowBlank = false;
        }
        for (var i = 0; i < _TheArrayC.length; i++) {
            Ext.getCmp(_TheArrayC[i]).allowBlank = true;
        }
    }
    var combo = Ext.getCmp('customer.depositaryBankID');
    combo.on('beforequery',
    function(e) {
        var combo = e.combo;
        if (!e.forceAll) {
            var value = e.query;
            combo.store.filterBy(function(record, id) {
                var text = record.get(combo.displayField); // 用自己的过滤规则,如写正则式
                return (text.indexOf(value) != -1);
            });
            combo.expand();
            return false;
        }
    });
    if (("" == cpf.customerPerson.birthDate || null == cpf.customerPerson.birthDate) && (null != cpf.customer.documentCode && "" != cpf.customer.documentCode)) {
        //生日初始值set
    	getBirthdayByIdCard(cpf.customer.documentCode, Ext.getCmp('customerView'),'customerPerson.birthDate');
    }
});