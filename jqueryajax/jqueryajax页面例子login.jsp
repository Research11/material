<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<!-- <script type="text/javascript" src="jquery/jquery.js"></script> -->
<!-- <link href="css/Page.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/Page.js"></script> -->
<script type="text/javascript" src="jquery/jquery.min.js"></script>  
<script type="text/javascript" language="javascript">
/* $(document).ready(function() {
    $("#pager").pager({ pagenumber: 1, pagecount: 15, buttonClickCallback: PageClick });
});

PageClick = function(pageclickednumber) {
    $("#pager").pager({ pagenumber: pageclickednumber, pagecount: 15, buttonClickCallback: PageClick });
    $("#result").html("Clicked Page " + pageclickednumber); //
} */


 function ajaxTest(){ 
     $.ajax({  
    data:"name="+$("#name").val(), 
    type:"post",  
    dataType: 'json',  
    url:"login.do", 
   // async:false, //设置同步假死 默认就是异步加载的
    error:function(bushiside){  
        alert("出错了！！:"+bushiside.msg);  //没有启动服务的时候会被执行
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
<!-- <table border="1" >
<tr><td>编号</td><td>姓名</td><td>年龄</td></tr>
<tr><td></td><td id="result"></td><td></td></tr>
</table> -->
 <h1 id="result">点击下面的页码</h1>
<div id="pager" ></div><br/><br/><br/><br/>
<form action="login.do" method="post">
姓名:<input type="text" name="name" id="name" onblur="ajaxTest();"/><span id="result"></span><br/>
密码:<input type="password" name="password"/><br/>
<input type="submit" value="登录" />
<input type="reset" value="重置"/>
</form>
 <div id="anhtml"></div> 
</body>
</html>