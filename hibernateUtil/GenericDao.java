package com.pb.base.dao;

import java.io.Serializable;
import java.util.List;

import com.pb.domain.Page;

public interface GenericDao<T,ID extends Serializable> {
	
	         
	void save(T entity);
	void delete(T entity);
	void update(T entity);
	T findById(ID id);
	List<T> findAll();
	
	Page findByPage(int currentPage,T entity);

}
