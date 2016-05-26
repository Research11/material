package com.pb.controller;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pb.dao.PersonDao;
import com.pb.domain.PageBean;
import com.pb.domain.Person;

@Controller
public class PersonController {
	ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext.xml");
	PersonDao persondao=(PersonDao) context.getBean("personDao");
	
	/*@RequestMapping(value="/login")
	public String login(Model model){	
		List<Person> list=persondao.PersonAll();
		System.out.println(list.size());
		 model.addAttribute("list", list);
		return "display";
		
	}	*/
	
	@RequestMapping(value="/login")
	public String login(Integer currentPage,Model model){	
		System.out.println(currentPage);
		PageBean pagebean=null;
		if(currentPage!=null){
			 pagebean=persondao.getPageBean(10,currentPage);
		}else{
			 pagebean=persondao.getPageBean(10,1);
		}
	
		model.addAttribute("pagebean", pagebean);
		return "display";
		
	}	
	
	@RequestMapping(value="/editor")
	public String editor(@RequestParam(value="id") Integer id,Model model){
		Person person=persondao.findByid(id);
		model.addAttribute("person", person);
		return "editor";
	}
	
	@RequestMapping(value="/updateperson")
	public String updatepe(Person person){
		System.out.println(person.getBirthday());
		persondao.update(person);
		return "redirect:login";
	}
	
	@RequestMapping(value="/delete")
	public String deleteperson(@RequestParam(value="id")Integer id){
		System.out.println(id);
		Person person=persondao.findByid(id);	
		persondao.delete(person);
		return "redirect:login";
	}
	
	@RequestMapping("/add")
	public String addPerson(){		
		return "add";
	}
	
	@RequestMapping(value="/save")
	public String savePerson(Person person){
		persondao.save(person);
		 return "redirect:login";
	}
  
	@RequestMapping("/fuzzy")
	public String fuzzy(){
		
		
		
		return null;
	}
}
