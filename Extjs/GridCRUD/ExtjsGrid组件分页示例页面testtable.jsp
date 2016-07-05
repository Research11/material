<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="Ext/resources/css/ext-all.css">
<script type="text/javascript" src="Ext/ext-all-debug.js"></script>
<script type="text/javascript" src="Ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript">
Ext.onReady(function(){
	var form1=new Ext.FormPanel({
	    renderTo:Ext.getBody(),
	    title: '用户信息查询',
	    id: 'paramBar',
	    //width:700,
	    layout: 'column',
	    frame: true,
	    buttonAlign: 'center',	    
		items:[
		       {xtype:'textfield',fieldLabel: '姓名',id:'test',name:'name',labelAlign: 'right'},
		       {xtype:'textfield',fieldLabel: '邮箱',id:'memail',name:'email',labelAlign: 'right'}		       
		       ],
		buttons:[
		         {text:'查询'/* ,handler:query */,handler:function(){
		        	store.load({		        			
		                 params : {
		                 		autoLoad: true,
		                        start : 0,
		                        limit : 15,                 
		                        'name':Ext.getCmp('test').getValue()
		                 }
		     		})
		         }},{
		          text:'重置',handler:function(){
		        	  form1.form.reset();		        	  
		          }}]
	});
	
	/* function query() {
		
		store.load({
		
            params : {
            		autoLoad: true,
                   start : 0,
                   limit : 15,                 
                   'name':Ext.getCmp('test').getValue()
            }
		})
	} */
	  var newFormWin;
	  var userform; 
	  var adSearch = "";
	  Ext.define('model', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name:'id'},   
		         {name:'name'},
		         {name:'age'},
		         {name:'email'},
		         {name:'birthday'}
		     ]
		 });
	  
		 var store = Ext.create('Ext.data.JsonStore',{
			 autoDestroy: true,
		     model: 'model',
		     pageSize: 15,
		     baseParams: {
		         loadStore: true,
		         start: 0,
		         limit: 15,
		         adSearch: adSearch
		     },
		     proxy: {
		         type: 'ajax',
		         url: 'selectperson.action',
		         reader: {
		             type: 'json',
		             root: 'data',
		             totalProperty : 'total' 
		         } ,
		         extraParams: {
		                showDel: 'true'
		            } 
		     },
		     autoLoad: true
		 });

Ext.ClassManager.setAlias('Ext.selection.CheckboxModel','selection.checkboxmodel');
var grid = new Ext.grid.GridPanel({
autoFill : false,
autoHeight : true,
//width:700,
renderTo:Ext.getBody(),
title:'用户信息表',
store: store,
frame:true,
//forceFit: true, //列表宽度自适应
selModel:{
	selType:'checkboxmodel'
},
columns:[
{
  id: 'userid', 
  header: "编号",
  dataIndex: 'id',
  align: 'center',
  sortable: false
},
{
  id: 'userName', 
  header: "用户名",
  dataIndex: 'name',
  align: 'center',
  sortable: false
},{
  header: "年龄",
  dataIndex: 'age',
  align: 'center',
  sortable: false
},{
  header: "Email",
  dataIndex: 'email',
  align: 'center',
  sortable: false,
  width:200
},{
  header: "日期",
  dataIndex: 'birthday',
  align: 'center',
  sortable: false,
  //render : Ext.util.Format.dateRenderer('Y-m-d'),
  width:200
}],

viewConfig: {
	autoFill: true,
	scrollOffset: 2 
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
bbar: new Ext.PagingToolbar({
 // pageSize: 10,//每页条数
  store: store,//数据
  displayInfo: true,
  displayMsg: '从{0}条到{1}条  总共 {2}条',
  emptyMsg: "没有数据"
})
});

store.load();//{params:{start:0, limit:10,loadStore: true}}只是分页

//添加用户按钮
var add_btn = function() {
addFormWin();
};

var userForm = new Ext.FormPanel( {
  // collapsible : true,// 是否可以展开
  labelWidth : 75,
  frame : true,
  bodyStyle : 'padding:5px 5px 0',
  waitMsgTarget : true,
  defaults : {
      width : 230
  },
  defaultType : 'textfield',
  items : [{	  
      fieldLabel : '编号',
      name : 'id',
      emptyText: 'id',
      hidden: true, 
      hideLabel:true,
     // allowBlank : true
  }, {
      fieldLabel : '用户名',
      name : 'name',
      emptyText: '用户名',
      //allowBlank : false
  }, {
      fieldLabel : '年龄',
      name : 'age',
      emptyText: '年龄',
      xtype : 'numberfield',
      //allowBlank : false
  },{
      fieldLabel : 'Email',
      name : 'email',
      //vtype:'email',
      //vtypeText:"不是有效的邮箱地址",
        //allowBlank : false
  },{
      fieldLabel : '日期',
      name : 'birthday',
      xtype:'datefield',
      //emptyText: '2016-1-2',
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
          height : 200,
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
                  newFormWin.close();
              }
          }]
      });
  }
  newFormWin.show('addUserForm');//显示此窗口
}
//添加操作按钮
function addBtnsHandler() {
  if (userForm.form.isValid()) {
        userForm.form.submit({        	
            url :'saperson.action', 
            method:'GET',
            //params:{data:data},
            waitMsg : '正在保存数据，稍后...',
            success : function(form, action) {
                      Ext.Msg.alert('保存成功', '添加用户信息成功！');
                      userForm.form.reset();//清空表单
                      grid.getStore().reload();
                      newFormWin.close();
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
   
function edit_btn(){
  var selectedKeys = grid.getSelectionModel().getSelection(); 
  if(selectedKeys.length != 1){
      Ext.MessageBox.alert('提示','请选择一条记录！');
      }//加载数据　
      else{
          var EditUserWin = new Ext.Window({
          title: '修改员工资料',//题头　　　　　　　
          layout:'fit',//布局方式　　　　　　　　
          width:400,//宽度　　　　　
          height:200,//高度　　　　　　　　
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
                  EditUserWin.close();
              }
          }]
      });
      EditUserWin.show("editUserForm");    
          loadUser();
      }
}     
 //加载数据
 function loadUser(){
     var selectedKeys = grid.getSelectionModel().getSelection();
     var myid=selectedKeys[0].get('id');
     userForm.form.load({                    
          waitMsg : '正在加载数据请稍后',//提示信息                
          waitTitle : '提示',//标题                
          url : 'displayperson.action',            
          params:{id:myid},                
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
          url : 'saveupdate.action',//请求的url地址                    
          method:'POST',//请求方式                    
          success:function(form,action){//加载成功的处理函数                  
               userForm.form.reset();//清空表单
               grid.getStore().reload();                    
               Ext.Msg.alert('提示','修改信息成功');   
               w.close();
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
    /* var msg=selectedKeys[0].get('id');
    alert(msg); */
    if(selectedKeys.length > 0){
      Ext.MessageBox.confirm('提示','您确实要删除选定的记录吗？', deleteRecord);
  }else{
      Ext.MessageBox.alert('提示','请至少选择一条记录！');
     }//end
}
//删除记录　　　

function deleteRecord(btn){
	var selectedKeys = grid.getSelectionModel().getSelection();
    var myid=selectedKeys[0].get('id');
if(btn=='yes'){
    Ext.MessageBox.show({ 
        msg: '正在请求数据, 请稍侯',
        progressText: '正在请求数据', 
        width:300,
        wait:true,
        waitConfig: {interval:200}
    });
    Ext.Ajax.request({
       url: 'deleteper.action', 
       method: 'POST',
       params:{id:myid},
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