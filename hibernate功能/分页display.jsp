<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<form action="" method="post">
	姓名：<input type="text" name="" />
	年龄：<input type="text" name="" />
	<input type="submit" value="查询"/>
</form>
<table border="1">
<tr><th>编号</th><th>姓名</th><th>年龄</th><th>邮箱</th><th>生日</th><th>操作</th></tr>
	<c:forEach var="person" items="${pagebean.list}" varStatus="Status">
		<tr>
			<th>${person.id}</th>
			<th>${person.name}</th>
			<th>${person.age}</th>
			<th>${person.email}</th>			
			<th><fmt:formatDate value="${person.birthday}" pattern="yyyy-MM-dd HH:mm:ss"/></th>		
			<th><a href="editor?id=${person.id}">编辑</a>&nbsp;<a href="">查看</a>&nbsp;<a href="delete?id=${person.id}">删除</a></th>	
		</tr>	
	</c:forEach>
</table>
<a href="add">添加</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<c:if test="${pagebean.currentPage>1}">
	<a href="login?currentPage=${1}">首页</a>
	<a href="login?currentPage=${pagebean.currentPage-1}">上一页</a>
</c:if>

<c:forEach var="num" begin="1" end="${pagebean.totalPage}">
	<a href="login?currentPage=${num}">${num}</a>
</c:forEach>

<c:if test="${pagebean.currentPage<pagebean.totalPage}">
	<a href="login?currentPage=${pagebean.currentPage+1}">下一页</a>
	<a href="login?currentPage=${pagebean.totalPage}">末页</a>
</c:if>
第${pagebean.currentPage}/${pagebean.totalPage}页共${pagebean.totalPage}页
第<input type="text" size="2"/>页
</body>
</html>