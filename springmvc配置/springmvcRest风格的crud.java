package com.pb.helloword;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

//在web.xml文件中配置HiddenHttpMethodFilter才可以使用delete,put请求
//会用到jquery
@Controller
public class springmvctest1 {

	private static final String SUCCESS="success";
//查询	
@RequestMapping(value="/testget/{id}",method=RequestMethod.GET)
	public String testget(@PathVariable Integer id){		
		System.out.println("testget"+id);
		return SUCCESS;
	}

//添加
@RequestMapping(value="/testpost",method=RequestMethod.POST)
public String testpost(){
	
	System.out.println("testpost");
	return SUCCESS;
}

//删除
@RequestMapping(value="/testdelete/{id}" ,method=RequestMethod.DELETE)
public String testdelete(@PathVariable Integer id){	
	System.out.println("testdelete");
	return SUCCESS;
}

//修改
@RequestMapping(value="/testput/{id}",method=RequestMethod.PUT)
public String testput(@PathVariable Integer id){
	
	System.out.println("testput");
	return SUCCESS;
}

}
