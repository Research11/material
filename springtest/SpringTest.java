package com.pb.common;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.pb.dao.StudentDao;
import com.pb.domain.Student;

public class SpringTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		
		ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext.xml");
		StudentDao studentdao=(StudentDao) context.getBean("studentDao");
		
		
		/*Student stu=new Student();
		stu.setName("zhangsan");
		stu.setEmail("zhangsan@126.com");
		stu.setBirthday(new Date());
		studentdao.svae(stu);*/
		
		Student student=studentdao.findBid(2);
		System.out.println(student.getName());
		
		List<Student> list=studentdao.list();
		
		for(Student stu:list){
			System.out.println(stu.getName());
		}
	}

}
