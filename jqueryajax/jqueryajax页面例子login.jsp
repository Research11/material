<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="jquery/jquery.js"></script>
<script type="text/javascript" src="jquery/jquery.min.js"></script>  
<script type="text/javascript">
function ajaxTest(){ 
    $.ajax({  
    data:"name="+$("#name").val(), 
    type:"post",  
    dataType: 'json',  
    url:"login.do", 
   // async:false, //设置同步假死 默认就是异步加载的
    error:function(bushiside){  
        alert("出错了！！:"+bushiside.msg);  
    },  
    success:function(bushiside){  
        alert("success:"+bushiside.msg);  
        $("#result").html(bushiside.msg) ;  
    }  
    });  
}  
</script>
</head>
<body>
<form action="login.do" method="post">
姓名:<input type="text" name="name" id="name" onblur="ajaxTest();"/><span id="result"></span><br/>
密码:<input type="password" name="password"/><br/>
<input type="submit" value="登录" />
<input type="reset" value="重置"/>
</form>
 <div id="result"></div> 
</body>
</html>