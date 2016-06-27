<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="Extjs/resources/css/ext-all.css">
<script type="text/javascript" src="Extjs/ext-all.js"></script>
<script type="text/javascript" src="Extjs/ext-lang-zh_CN.js"></script>
<script type="text/javascript">
Ext.onReady(function(){
	  var newFormWin;
	  var userform;
var store = new Ext.data.JsonStore({
root: 'pageResult',
totalProperty: 'totalRecords',
idProperty: 'userid',
remoteSort: true,
fields: [
  'useremail', 
  'userage', 
  'useraddress', 
  'country',
  'usersex',
  'city',
  'province',
  'race',
  'userphone',
  'username',
  'userid'
],


proxy: new Ext.data.HttpProxy({
  url:'dispaly',
  /* type:'ajax',
  reader:{
	  type:'json'
  } */
})
});
var checkBox = Ext.create('Ext.selection.CheckboxModel');
var grid = new Ext.grid.GridPanel({
autoFill : false,
autoHeight : true,
width:700,
renderTo:Ext.getBody(),
//height:300,//高度
title:'用户信息表',
store: store,
//trackMouseOver:false,
//disableSelection:true,
//加载的图标是否显示
//loadMask: true,
selModel :checkBox,
//sm: new Ext.grid.CheckboxSelectionModel ({ singleSelect: false }),
columns:[
//new Ext.grid.CheckboxSelectionModel({singleSelect : false}),
{
  id: 'userid', 
  header: "编号",
  dataIndex: 'userid',
  //align: 'center',
  sortable: false
},
{
  id: 'userName', 
  header: "用户名",
  dataIndex: 'username',
  //align: 'center',
  sortable: false
},{
  header: "年龄",
  dataIndex: 'userage',
  //align: 'center',
  sortable: false
},{
  header: "email",
  dataIndex: 'useremail',
  //align: 'center',
  sortable: false
},{
  header: "电话",
  dataIndex: 'userphone',
  //align: 'center',
  sortable: false
}],
// customize view config
viewConfig: {
  forceFit:true,//True表示为自动展开/缩小列的宽度以适应grid的宽度，这样就不会出现水平的滚动条。
  enableRowBody:true,//True表示为在每一数据行的下方加入一个TR的元素
  showPreview:true,
   getRowClass : function(record, rowIndex, p, store){                 
          return 'x-grid3-row-expanded';
          
  } 
},
// 添加内陷的按钮
tbar : [ {
  id : 'addUserForm',
  text : ' 新建  ',
  tooltip : '新建一个表单',
  iconCls : 'add',
  handler : function() {
         add_btn();
  }
}, '-', {
  id : 'editUserForm',
  text : '修改',
  tooltip : '修改',
  iconCls : 'edit',
  handler : function() {
      edit_btn();
  }
}, '-', {
   text : '删除',
   tooltip : '删除被选择的内容',
   iconCls : 'remove',
   handler : function() {
       handleDelete();
   }

}],
// paging bar on the bottom分页按钮
bbar: new Ext.PagingToolbar({
  pageSize: 10,//每页条数
  store: store,//数据
  displayInfo: true,
  displayMsg: '从{0}条到{1}条  总共 {2}条',
  emptyMsg: "没有数据"
})
});
// render it显示的层
//grid.render('user-grid');
// trigger the data store load  加载用户
store.load({params:{start:0, limit:10}});

//添加用户按钮
var add_btn = function() {
addFormWin();
};

var userForm = new Ext.FormPanel( {
  // collapsible : true,// 是否可以展开
  labelWidth : 75, // label settings here cascade unless overridden
  frame : true,
  bodyStyle : 'padding:5px 5px 0',
  waitMsgTarget : true,
  //reader : _jsonFormReader,
  defaults : {
      width : 230
  },
  defaultType : 'textfield',
  items : [{
      fieldLabel : '编号',
      name : 'userid',
      emptyText: 'id',
      hidden: true, 
      hideLabel:true,
     // allowBlank : true
  }, {
      fieldLabel : '用户名',
      name : 'username',
      emptyText: '用户名',
      //allowBlank : false
  }, {
      fieldLabel : '年龄',
      name : 'userage',
      emptyText: '年龄',
        xtype : 'numberfield',
      //allowBlank : false
  }, 
  new Ext.form.RadioGroup({
      fieldLabel : '性别',
      name:'usersex',
      items:[
          {boxLabel: '男', name: 'usersex', inputValue: 1},
              {boxLabel: '女', name: 'usersex', inputValue: 2}
                ]  
  }), {
      fieldLabel : '种族',
      name : 'race',
      emptyText: '民族',
      //allowBlank : false
  }, {
      fieldLabel : '电话',
      name : 'userphone',
      emptyText: '联系电话',
      //allowBlank : false
  }, {
      fieldLabel : 'Email',
      name : 'useremail',
      //vtype:'email',
      //vtypeText:"不是有效的邮箱地址",
        //allowBlank : false
  }, {
      fieldLabel : '国家',
      name : 'country',
      emptyText: '国家',
     // allowBlank : false
  },{
      fieldLabel : '省市',
      name : 'province',
      emptyText: '省市',
      //allowBlank : false
  }, {
      fieldLabel : '城市',
      name : 'city',
      emptyText: '城市',
      //allowBlank : false
  }, {
      fieldLabel : '地址',
      name : 'useraddress',
      
      emptyText: '地址',
      //allowBlank : false
  }]          
});

var addFormWin = function() {
  // create the window on the first click and reuse on subsequent
  // clicks 判断此窗口是否已经打开了，防止重复打开
  if (!newFormWin) {
      newFormWin = new Ext.Window( {
          el : 'topic-win',
          layout : 'fit',
          width : 400,
          height : 400,
          closeAction : 'hide',
          plain : true,
          title : '添加用户',
          items : userForm,
          buttons : [ {
              text : '保存',
              disabled : false,
              handler :
                  addBtnsHandler
              }, {
              text : '取消',
              handler : function() {
                  userForm.form.reset();//清空表单
                  newFormWin.hide();
              }
          }]
      });
  }
  newFormWin.show('addUserForm');//显示此窗口
}
//添加操作按钮
function addBtnsHandler() {
  if (userForm.form.isValid()) {
        userForm.form.submit( {
            url : 'addData', 
            waitMsg : '正在保存数据，稍后...',
            success : function(form, action) {
                      Ext.Msg.alert('保存成功', '添加用户信息成功！');
                      userForm.form.reset();//清空表单
                      grid.getStore().reload();
                      newFormWin.hide();
            },
            failure : function(form, action) {
                        Ext.Msg.alert('保存失败', '添加人员信息失败！');
            }
        });
  }
  else {
       Ext.Msg.alert('信息', '请填写完成再提交!');
  }                
}
//添加操作结束========================================================================================================================== 

//修改操作开始==========================================================================================================================    
//点击修改按钮加载数据   
function edit_btn(){
  var selectedKeys = grid.getSelectionModel().getSelection(); // grid.selModel.selections.keys;//returns array of selected rows ids only　　　　　　
  //判断是否选中一行数据 没有选中提示没有选中，选中加载信息
  if(selectedKeys.length != 1){
      Ext.MessageBox.alert('提示','请选择一条记录！');
      }//加载数据　
      else{
          var EditUserWin = new Ext.Window({
          title: '修改员工资料',//题头　　　　　　　
          layout:'fit',//布局方式　　　　　　　　
          width:400,//宽度　　　　　
          height:400,//高度　　　　　　　　
          plain: true,//渲染　　　　　　　　
          items:userForm,
          //按钮
          buttons: [{
              text:'保存',
              handler:function(){
                  updateHandler(EditUserWin);
              }
          },{
              text: '取消',
              handler: function(){
                  EditUserWin.hide();
              }
          }]
      });
      EditUserWin.show("editUserForm");
          loadUser();
      }
}     
 //加载数据
 function loadUser(){
     var selectedKeys = grid.getSelectionModel().getSelection();//returns array of selected rows ids only
     userForm.form.load({                    
          waitMsg : '正在加载数据请稍后',//提示信息                
          waitTitle : '提示',//标题                
          url : 'update',            
          params:{userid:userForm.form.findField('userid').getValue()},                
          method:'POST',//请求方式  
          success:function(form,action){
              Ext.Msg.alert('提示','数据加载成功');
          },
          failure:function(form,action){//加载失败的处理函数                    
              Ext.Msg.alert('提示','数据加载失败');                
          }            
     });        
 }
//修改按钮操作
 function updateHandler(w){
  if (userForm.form.isValid()) {
      userForm.form.submit({                    
          clientValidation:true,//进行客户端验证                
          waitMsg : '正在提交数据请稍后...',//提示信息                    
          waitTitle : '提示',//标题                
          url : 'addData',//请求的url地址                    
          method:'POST',//请求方式                    
          success:function(form,action){//加载成功的处理函数    
               w.hide();
               userForm.form.reset();//清空表单
               grid.getStore().reload();                    
               Ext.Msg.alert('提示','修改信息成功');                    
          },
          failure:function(form,action){//加载失败的处理函数                        
               Ext.Msg.alert('提示','ID不能修改');
               Ext.Msg.alert('提示','修改信息失败');                    
          }                
      });    
  }else {
      Ext.Msg.alert('信息', '请填写完成再提交!');  
  }
 }
//修改操作结束==========================================================================================================================  
 
 
//删除操作开始==========================================================================================================================
function handleDelete(){
    var selectedKeys = grid.getSelectionModel().getSelection(); //returns array of selected rows ids only　　　　　　
     if(selectedKeys.length > 0){
      Ext.MessageBox.confirm('提示','您确实要删除选定的记录吗？', deleteRecord);
  }else{
      Ext.MessageBox.alert('提示','请至少选择一条记录！');
     }//end
}
//删除记录　　　

function deleteRecord(btn){
if(btn=='yes'){
    //var selectedRows = grid.selModel.selections.items;//returns record objects for selected rows (all info for row)　获得整行数据　　　　　　　
        var selectedKeys = grid.selModel.selections.keys;//选中的行的值id
    Ext.MessageBox.show({ 
        msg: '正在请求数据, 请稍侯',
        progressText: '正在请求数据', 
        width:300,
        wait:true,
        waitConfig: {interval:200}
    });
    Ext.Ajax.request({
       url: 'delete', //url to server side script　　　　　　　　　　　　
       method: 'POST',
       params:{USER_ID:selectedKeys},//the unique id(s)　　　　　　　　　　　　　　　　　　　　　　　
       failure:function(){
            Ext.MessageBox.hide();
            Ext.MessageBox.alert("警告","出现异常错误！请联系管理员！");
       },
       success:function(){
            Ext.MessageBox.hide();
Ext.MessageBox.alert("成功","删除成功！");
            store.reload();
       }
    })// end Ajax request
}
}

});

</script>
</head>
<body>

</body>
</html>