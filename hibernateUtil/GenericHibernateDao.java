package com.pb.base.dao;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.pb.domain.Page;

public class GenericHibernateDao<T, ID extends Serializable> extends
		HibernateDaoSupport implements GenericDao<T, ID> {

	public GenericHibernateDao() {
		entityClass = (Class<?>) ((ParameterizedType) getClass()
				.getGenericSuperclass()).getActualTypeArguments()[0];

	}

	protected Class entityClass;

	public Class getEntityClass() {
		return entityClass;
	}

	public void setEntityClass(Class entityClass) {
		this.entityClass = entityClass;
	}

	@Override
	public void save(T entity) {
		getHibernateTemplate().save(entity);

	}

	@Override
	public void delete(T entity) {
		getHibernateTemplate().delete(entity);

	}

	@Override
	public void update(T entity) {
		getHibernateTemplate().update(entity);

	}

	@Override
	public T findById(ID id) {
		// TODO Auto-generated method stub

		T entity = null;

		entity = (T) getHibernateTemplate().load(getEntityClass(), id);

		return entity;
	}

	@Override
	public List<T> findAll() {
		// TODO Auto-generated method stub

		return getHibernateTemplate()
				.find("from " + getEntityClass().getName());

	}

	@Override
	public Page findByPage(int currentPage, T entity) {
		// TODO Auto-generated method stub
		StringBuffer sb = createSQL(entity);

		final String countSQL = " select count(*) " + sb.toString();
		final String listSQL = sb.toString();

		int totalNumber = 0;
		int totalPage = 0;
		Session session = null;
		List list = null;

		final int from = (currentPage - 1) * 10;
		// try {
		//
		// session = HibernateUtil.getSessionFactory().getCurrentSession();
		//
		// session.beginTransaction();

		Long count = (Long) getHibernateTemplate().execute(
				new HibernateCallback() {

					@Override
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						// TODO Auto-generated method stub
						return session.createQuery(countSQL).uniqueResult();
					}
				});

		list=getHibernateTemplate().executeFind(new HibernateCallback() {

			@Override
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				// TODO Auto-generated method stub
				return session.createQuery(listSQL).setFirstResult(from)
						.setMaxResults(10);
			}
		});

		// session = HibernateUtil.getSession();
		// Long count = (Long) session.createQuery(countSQL).uniqueResult();
		//
		// totalNumber = count.intValue();
		// list = session.createQuery(listSQL).setFirstResult(from)
		// .setMaxResults(10).list();

		// session.getTransaction().commit();

		// } catch (HibernateException e) {
		// // TODO Auto-generated catch block
		// session.getTransaction().rollback();
		// e.printStackTrace();
		// }
		// TODO Auto-generated method stub
		totalPage = totalNumber % 10 == 0 ? totalNumber / 10
				: totalNumber / 10 + 1;

		Page page = new Page();
		page.setCurrentPage(currentPage);
		page.setTotalNumber(totalNumber);
		page.setList(list);
		page.setTotalPage(totalPage);
		return page;
	}

	protected StringBuffer createSQL(T entity) {
		// TODO Auto-generated method stub
		return new StringBuffer(" from " + getEntityClass().getName());
	}

}
