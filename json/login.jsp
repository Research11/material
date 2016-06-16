<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="js/jquery-2.1.3.js"></script>  
<script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>  
<script type="text/javascript">
function ajaxTest(){  
    $.ajax({  
    data:"name="+$("#name").val(),  
    type:"GET",  
    dataType: 'json',  
    url:"login",  
    error:function(data){  
        alert("出错了！！:"+data.msg);  
    },  
    success:function(data){  
        alert("success:"+data.msg);  
        $("#result").html(data.msg) ;  
    }  
    });  
}  
</script>
</head>
<body>
<form action="login" method="post">
<input type="text" name="name" id="name" onblur="ajaxTest();"/><br/>
<input type="password" name="password"/><br/>
<input type="submit" value="登录" />
<input type="reset" value="重置"/>
</form>
 <div id="result"></div> 
</body>
</html>