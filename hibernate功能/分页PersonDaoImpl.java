package com.pb.dao;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;

import com.pb.domain.PageBean;
import com.pb.domain.Person;

public class PersonDaoImpl extends HibernateTemplate implements PersonDao{
	
	@Override
	public void save(Person person) {
		super.save(person);		
	}

	@Override
	public void delete(Person person) {
		super.delete(person);
	}

	@Override
	public void update(Person person) {
	super.update(person);
		
	}

	@Override
	public Person findByid(Integer id) {
		return super.get(Person.class, id);	
	}

	@Override
	public List<Person> PersonAll() {
		
		//super.loadAll(Person.class);
		return super.find("from Person");
	}

	@Override
	public List queryByPage(final String hql,final int offset,final int pageSize) {
		
		
		List list=super.executeFind(new HibernateCallback() {

			@Override
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
	            query.setFirstResult(offset);
	            query.setMaxResults(pageSize);
	           List list = query.list();
				return list;
			}
		});
		
		return list;
	}
	
	@Override
	public int getAllRowCount(String hql) {
		 int allRows = 0;
		 allRows=super.find(hql).size();
		 
		return allRows;
	}

	//pageSize代表一页显示的条数   page 代表当前页
	 public PageBean getPageBean(int pageSize, int page){
		 
	        PageBean pageBean = new PageBean();
	        
	        String hql = "from Person";
	        
	        int allRows = getAllRowCount(hql);
	        
	        int totalPage = pageBean.getTotalPages(pageSize, allRows);
	        
	        int currentPage = pageBean.getCurPage(page);
	        
	        int offset = pageBean.getCurrentPageOffset(pageSize, currentPage);
	        
	        List<Person> list =queryByPage(hql, offset, pageSize);
	        
	        pageBean.setList(list);
	        pageBean.setAllRows(allRows);
	        pageBean.setCurrentPage(currentPage);
	        pageBean.setTotalPage(totalPage);
	        
	        return pageBean;
	    }

	
	@Override
	public List<Person> fuzzy(String name, Integer age) {
		List<Person> list=super.find("from Person where 1=1 and name like '%"+name+"%' or age like '%"+age+"%'");	
			
		return list;
	}

	 	
}
