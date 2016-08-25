var screenWidth = Ext.getBody().getViewSize().width - 70;
if (Ext.getBody().getViewSize().width == 0) {
	screenWidth = 1170;
}
var eleWidth = (screenWidth + 70) / 2 * 0.6;

function disXtype() {
	var re = true;
	Ext.ComponentMgr.all.each(function(cmp) {
		var Type = cmp.getXType();
		if (Type == 'textfield' || Type == 'htmleditor' || Type == 'combo'
				|| Type == 'treecombo' || Type == 'datefield'
				|| Type == 'numberfield' || Type == 'textarea'
				|| Type == 'timefield' || Type == 'trigger' || Type == 'button') {
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

/**
 * 保存资信调查信息
 */
function saveCreditSurvey() {
	var form = ZXDC_Panel;
	if(form.getForm().findField('policy.preliminary').getValue().length >1200){
		Ext.MessageBox.alert("操作信息", "调查汇总及初步意见长度超过1200");
		return;
	}
	if (form.getForm().isValid()) {
		var data = Ext.util.JSON.encode(form.getForm().getValues(false));
		form.getForm().submit({
					method : "POST",
					url : "surveyCompanyInfo_save.action",
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
	} else {
		Ext.MessageBox.alert("操作信息", "请检查必填项是否填写！");
	}
}

/**
 * 保存资信调查信息并且评分
 */
function saveAndScore() {
	var form = ZXDC_Panel;
	if(form.getForm().findField('policy.preliminary').getValue().length >1200){
		Ext.MessageBox.alert("操作信息", "调查汇总及初步意见长度超过1200");
		return;
	}
	if (form.getForm().isValid()) {
		var data = Ext.util.JSON.encode(form.getForm().getValues(false));
		form.getForm().submit({
					method : "POST",
					url : "surveyCompanyInfo_save.action",
					waitMsg : "正在提交数据...",
					params : {
						data : data
					},
					success : function(d, g) {
						var myMask = new Ext.LoadMask(Ext.getBody(), {
									msg : "正在评分，请稍后..."
								});
						myMask.show();
						Ext.Ajax.request({
									url : 'modelCalculation.action',
									params : {
										id : CustInfo.policy.id
									},
									method : "POST",
									success : function(response, opts) {
										myMask.hide();
										var msg = Ext
												.decode(response.responseText);
										if (!msg) {
											msg = "评分出错，请联系管理员!";
										}
										Ext.MessageBox.alert("操作信息", msg);
									},
									failure : function(response, opts) {
										myMask.hide();
										Ext.MessageBox.alert("操作信息",
												"操作出错，请联系管理员！");
									}
								});
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
	} else {
		Ext.MessageBox.alert("操作信息", "请检查必填项是否填写！");
	}
}

var ZXDC_Panel = new Ext.form.FormPanel({
	frame : true,
	autoScroll : true,
	buttonAlign : 'center',
	/*buttons : [{
				text : '保存',
				handler : function() {
					saveCreditSurvey();
				}
			}, {
				text : '评分',
				handler : function() {
					saveAndScore();
				}
			}],*/
	items : [{
		xtype : 'panel',
		title : '资信调查',
		frame : true,
		items : [{
			xtype : 'fieldset',
			title : '企业基本信息',
			layout : 'column',
			items : [{
						layout : 'form',
						columnWidth : .5,
						items : [{
									xtype : 'textfield',
									fieldLabel : '企业名称',
									readOnly : true,
									style : 'background:#E6E6E6;',
									width : eleWidth,
									anchor : '90%',
									value : CustInfo.customer.customerName,
									name : 'customer.customerName'
								}, {
									xtype : 'hidden',
									name : 'policy.id',
									value : CustInfo.policy.id
								}, {
									xtype : 'hidden',
									name : 'policy.policyHolder',
									value : CustInfo.policy.policyHolder
								}]
					}, {
						layout : 'form',
						columnWidth : .5,
						items : [{
									xtype : 'textfield',
									fieldLabel : '单位地址',
									width : eleWidth,
									readOnly : true,
									style : 'background:#E6E6E6;',
									anchor : '90%',
									name : 'customerCompany.registerAddress',
									value : CustInfo.customerCompany.registerAddress
								}]
					}]
		}, {
			xtype : 'fieldset',
			title : '保单历史信息',
			layout : 'column',
			items : [{
						layout : 'form',
						columnWidth : .5,
						items : [{
									xtype : 'radiogroup',
									labelWith : 100,
									width : eleWidth,
									value : CustInfo.customer.historyCust,
									fieldLabel : '<span style="color:Red">*</span>老客户',
									readOnly: true,
									allowBlank : false,
									anchor : '90%',
									columns : 2,
									items : [{
												boxLabel : '是',
												inputValue : '1',
												name : 'customer.historyCust'
											}, {
												boxLabel : '否',
												inputValue : '2',
												name : 'customer.historyCust'
											}]
								}]
					}, {
						layout : 'form',
						columnWidth : .5,
						items : [{
									xtype : 'textfield',
									fieldLabel : '历史投保单号码',
									readOnly: true,
									width : eleWidth,
									anchor : '90%',
									value : CustInfo.customer.historyPCode,
									name : 'customer.historyPCode'
								}]
					}, {
						layout : 'form',
						columnWidth : 1,
						items : [{
									xtype : 'checkboxgroup',
									labelWith : 100,
									fieldLabel : '保险种类',
									readOnly: true,
									width : 1100,
									anchor : '90%',
									value : CustInfo.customer.historyPtype,
									columns : 10,
									items : [{
												boxLabel : '财产保险',
												inputValue : '1',
												name : 'customer.historyPtype'
											}, {
												boxLabel : '人寿保险',
												inputValue : '2',
												name : 'customer.historyPtype'
											}, {
												boxLabel : '机动车辆保险',
												inputValue : '3',
												name : 'customer.historyPtype'
											}, {
												boxLabel : '交强险',
												inputValue : '4',
												name : 'customer.historyPtype'
											}, {
												boxLabel : '盗抢险',
												inputValue : '5',
												name : 'customer.historyPtype'
											}, {
												boxLabel : '车损险',
												inputValue : '6',
												name : 'customer.historyPtype'
											}, {
												boxLabel : '第三者责任险',
												inputValue : '7',
												name : 'customer.historyPtype'
											}, {
												boxLabel : '火险',
												inputValue : '8',
												name : 'customer.historyPtype'
											}, {
												boxLabel : '全险',
												inputValue : '9',
												name : 'customer.historyPtype'
											}, {
												boxLabel : '在建工程险',
												inputValue : '10',
												name : 'customer.historyPtype'
											}]
								}]
					}]
		}, {
			xtype : 'fieldset',
			title : '其他资信信息',
			layout : 'column',
			items : [{
				layout : 'form',
				columnWidth : 1,
				items : [{
							xtype : 'radiogroup',
							labelWith : 100,
							width : 1100,
							fieldLabel : '<span style="color:Red">*</span>其他未清偿借贷情况',
							readOnly: true,
							columns : 3,
							allowBlank : false,
							value : CustInfo.customerCompany.noCreditInfo,
							items : [{
										boxLabel : '存在在银行或其他借贷公司的贷款，数额足以影响其未来偿付能力',
										inputValue : '1',
										name : 'customerCompany.noCreditInfo'
									}, {
										boxLabel : '存在在银行或其他借贷公司的贷款，数额尚不足以影响其未来偿付能力',
										inputValue : '2',
										name : 'customerCompany.noCreditInfo'
									}, {
										boxLabel : '不存在在银行或其他借贷公司的贷款',
										inputValue : '3',
										name : 'customerCompany.noCreditInfo'
									}

							]
						}]
			}, {
				layout : 'form',
				columnWidth : 1,
				items : [{
							xtype : 'numberfield',
							fieldLabel : '未偿还贷款(元)',
							readOnly: true,
							width : eleWidth,
							value : CustInfo.policy.repaymentValue,
							anchor : '50%',
							name : 'policy.repaymentValue'
						}]
			}, {
				layout : 'form',
				columnWidth : 1,
				items : [{
					xtype : 'radiogroup',
					labelWith : 100,
					width : 1000,
					fieldLabel : '<span style="color:Red">*</span>是否有负面事件',
					readOnly: true,
					columns : 2,
					allowBlank : false,
					anchor : '90%',
					value : CustInfo.customer.repayAbility,
					items : [{
								boxLabel : '企业三年内无重大不利事件发生',
								inputValue : '1',
								name : 'customer.repayAbility'
							}, {
								boxLabel : '企业三年内发生过至少一次重大不利事件（欺诈、严重起诉、管理人员入狱、恶意收购、会计不合规、行政处罚等）',
								inputValue : '2',
								name : 'customer.repayAbility'
							}]
				}]
			}, {
				defaultType : 'textfield',
				layout : 'form',
				columnWidth : 1,
				items : [{
							fieldLabel : '负面事件说明',
							readOnly: true,
							// width : eleWidth,
							anchor : '90%',
							value : CustInfo.customer.repayAbilityremark,
							name : 'customer.repayAbilityremark'
						}]
			}, {
				layout : 'form',
				columnWidth : 1,
				items : [{
							xtype : 'radiogroup',
							labelWith : 100,
							width : 1000,
							fieldLabel : '<span style="color:Red">*</span>人行资信记录',
							readOnly: true,
							columns : 3,
							allowBlank : false,
							anchor : '90%',
							value : CustInfo.customer.personCreditLog,
							items : [{
										boxLabel : '近3年内有多次贷款逾期等不良资信记录',
										inputValue : '1',
										name : 'customer.personCreditLog'
									}, {
										boxLabel : '近3年内有1次贷款逾期等不良资信记录',
										inputValue : '2',
										name : 'customer.personCreditLog'
									}, {
										boxLabel : '近3年内无贷款逾期等不良资信记录',
										inputValue : '3',
										name : 'customer.personCreditLog'
									}]
						}]
			}]
		}, {
			xtype : 'fieldset',
			title : '担保状态定性指标',
			layout : 'column',
			items : [{
				layout : 'form',
				columnWidth : 1,
				items : [{
							xtype : 'radiogroup',
							fieldLabel : '<span style="color:Red">*</span>保证合同覆盖情况',
							readOnly: true,
							width : 1000,
							value : CustInfo.policy.coverage,
							allowBlank : false,
							columns : 5,
							vertical : true,
							items : [{
										boxLabel : '无条件全额保证',
										inputValue : '1',
										name : 'policy.coverage'
									}, {
										boxLabel : '覆盖率在80%以上',
										inputValue : '2',
										name : 'policy.coverage'
									}, {
										boxLabel : '覆盖率在80%以下',
										inputValue : '3',
										name : 'policy.coverage'
									}, {
										boxLabel : '无此种方式保证',
										inputValue : '4',
										name : 'policy.coverage'
									}, {
										boxLabel : '此类产品不适用保证方式',
										inputValue : '5',
										name : 'policy.coverage'
									}]
						}]
			}, {
				layout : 'form',
				columnWidth : 1,
				items : [{
							xtype : 'numberfield',
							fieldLabel : '抵押覆盖率(%)',
							readOnly: true,
							width : eleWidth,
							anchor : '50%',
							decimalPrecision: 2,
							style : 'background:#E6E6E6',
							readOnly : true,
							value : CustInfo.policy.collateralCoverage,
							name : 'policy.collateralCoverage'
						}]
			}]
		}, {
			xtype : 'panel',
			title : '调查信息及提供资料真实性',
			items : [{
						xtype : 'textarea',
						value : CustInfo.policy.infoTruth,
						name : 'policy.infoTruth',
						width : screenWidth
					}]
		}, {
			xtype : 'panel',
			title : '调查汇总及初步意见',
			items : [{
						xtype : 'htmleditor',
						value : CustInfo.policy.preliminary,
						name : 'policy.preliminary',
						width : screenWidth,
						title : '调查汇总及初步意见'
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
			Ext.util.CSS.swapStyleSheet("theme",
					"jsp/ext3/ext3.4/resources/css/" + storeTheme + ".css");
			var panelsize = Ext.getBody().getHeight();
			if (panelsize < 80)
				panelsize = 80;
			Ext.QuickTips.init();
			try {
				Ext.get('loading').remove();
				Ext.get('loading-mask').remove();
			} catch (e) {
			}
			// 分公司核保岗查看当前页面
			if ('1' == CustInfo.customer.isFgshbg) {
				// 禁用页面内所有组件
				disXtype();
				// 隐藏页面内按钮
				for (var i = 0; i < ZXDC_Panel.buttons.length; i++) {
					var buttonItem = ZXDC_Panel.buttons[i];
					buttonItem.hide();
				}
			}
			var viewport = new Ext.Viewport({
						layout : 'anchor',
						autoScroll : true,
						layoutConfig : {
							align : 'stretch',
							pack : 'start'
						},
						items : [ZXDC_Panel]
					});
		});