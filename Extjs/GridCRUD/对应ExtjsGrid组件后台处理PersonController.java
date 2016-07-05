package com.pb.controller;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.pb.dao.PersonDao;
import com.pb.domain.PageBean;
import com.pb.domain.Person;
import com.pb.util.ExtHelper;

@SessionAttributes(value={"name"})
@Controller
public class PersonController {
	ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext.xml");
	PersonDao persondao=(PersonDao) context.getBean("personDao");
	
	@RequestMapping(value="/login1")
	@ResponseBody
	public Map<String,Object> login(String name,String password){	
		System.out.println("用户名："+name+"密码"+password);
		Map<String,Object>map=new HashMap<String,Object>();		
		map.put("success", true);		
		return map;
		
	}
	
	@RequestMapping(value="/hello")
	public String getPersonAll(HttpServletResponse response ) throws IOException{
		System.out.println("zhixinglemie");
		List<Person>person=persondao.PersonAll();
		String xml=ExtHelper.parseNodeToXML(person);
		response.setContentType("application/xml;charset=utf-8");
		response.getWriter().write(xml);
		System.out.println(xml);
		return null;
	}
	
//Extjs数据显示	
@RequestMapping(value="/selectperson.action")
public @ResponseBody Map<String,Object> PersonAll(Integer start,Integer limit,String name){
				System.out.println(name);
	Map<String,Object>map=new HashMap<String,Object>();
	int number=start/limit+1;//start第一次load为0,第二次为start+limit,而getPageBean要的参数为当前页
	PageBean pagebean=null;
	if(name==null){
		pagebean=persondao.getPageBean(limit,number,"");
	}else{
		pagebean=persondao.getPageBean(limit,number,name);	
	}
	
	List<Object> list=pagebean.getList();
		map.put("success",true);
		map.put("data",list);
		map.put("total", pagebean.getAllRows());
	return map;
}

//Extjs添加保存
@RequestMapping(value="/saperson.action")
@ResponseBody
public Map<String,Object> savPerso(String name,Integer age,String email,Date birthday){	
	Map<String,Object>map=new HashMap<String,Object>();
	System.out.println("save方法执行....");
	Person person=new Person();
	person.setName(name);
	person.setAge(age);
	person.setEmail(email);
	person.setBirthday(birthday);	
	persondao.save(person);
	map.put("success",true);
	return map;
}

//Extjs修改加载数据
@RequestMapping(value="/displayperson.action")
@ResponseBody
public Map<String,Object> updatePerson(Integer id){
	System.out.println(id);
	Map<String,Object>map=new HashMap<String,Object>();
	Person person=persondao.findByid(id);
	map.put("data", person);
	map.put("success",true);
	return map;
}

/*@ModelAttribute
public void getPerson(@RequestParam(value="id",required=false)Integer id,Map<String,Object>map){
	if(id!=null){
		Person per=persondao.findByid(id);
		map.put("person", per);
	}
}*/

@RequestMapping(value="/saveupdate.action")
@ResponseBody
public Map<String,Object> suPersion(Integer id,String name,Integer age,String email,Date birthday){
	Map<String,Object>map=new HashMap<String,Object>();
	Person person=new Person();
	person.setId(id);
	person.setName(name);
	person.setAge(age);
	person.setEmail(email);
	person.setBirthday(birthday);	
	//persondao.save(person);
	persondao.update(person);
	map.put("success",true);
	return map;
}
//Extjs删除
@RequestMapping(value="/deleteper.action")
@ResponseBody
public Map<String,Object> deleteperson1(Integer id){
	System.out.println("页面参数"+id);
	Map<String,Object>map=new HashMap<String,Object>();
	Person person=persondao.findByid(id);
	persondao.delete(person);
	map.put("success",true);
	return map;
}


//��ģ���ѯ�ķ�ҳ
	@RequestMapping(value="/login")
	public String login(Integer currentPage, String name,Model model){	
		System.out.println(currentPage+"页面跳转");
		
		PageBean pagebean=null;
		
		if(currentPage!=null&&name.trim()!=null){
			
			 pagebean=persondao.getPageBean(10,currentPage,name);
		}else{
			
			 pagebean=persondao.getPageBean(10,1,"");
		}
	
		model.addAttribute("pagebean", pagebean);
		
		model.addAttribute("name", name);
		return "display";
		
	}	
	
	
	
//��ת���޸�ҳ��
	@RequestMapping(value="/editor")
	public String editor(@RequestParam(value="id") Integer id,Model model){
		Person person=persondao.findByid(id);
		model.addAttribute("person", person);
		return "editor";
	}

//�޸ĺ�����������޸ģ��޸���Ϻ���ת����ҳ
	@RequestMapping(value="/updateperson")
	public String updatepe(Person person){
		System.out.println(person.getBirthday());
		persondao.update(person);
		return "redirect:login";
	}
	
//ɾ�����
	@RequestMapping(value="/delete")
	public String deleteperson(@RequestParam(value="id")Integer id){
		System.out.println(id);
		Person person=persondao.findByid(id);	
		persondao.delete(person);
		return "redirect:login";
	}

//��ת�����ҳ��	
	@RequestMapping("/add")
	public String addPerson(){		
		return "add";
	}
	
	
//ִ���걣���˷������б����������������Ժ�ص���ҳ	
	@RequestMapping(value="/save")
	public String savePerson( Person person){
		persondao.save(person);
		 return "redirect:login";
	}
  
	@RequestMapping("/fuzzy")
	public String Fuzzy(String name,Integer age,Model model){
	//	List<Person> list=persondao.fuzzy(name, age);		
	//	model.addAttribute("list", list);
		
		return null;
	}
}
