package com.pb.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class Test {
	
		 @RequestMapping(value="/login.do")  
		    public @ResponseBody Map<String,Object> login(HttpServletRequest request,HttpServletResponse response) throws IOException{  
		        System.out.println(request.getParameter("name"));  
		        Map<String,Object> map = new HashMap<String,Object>();  
		          
		        if(request.getParameter("name").equals("123")){  
		           // System.out.println("城东");  
		            map.put("msg", "成功");  
		        }else{  
		            //System.out.println("失败");  
		            map.put("msg", "用户名不存在！");  
		        }  
		        return map;   
	}

}
