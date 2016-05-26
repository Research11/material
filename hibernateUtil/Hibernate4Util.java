package com.pb.utils;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

public class HibernateUtil {
	private static Configuration cfg=null;
	private static SessionFactory factory=null;
	private static Session session=null;
	static{
	cfg=new Configuration().configure();
	ServiceRegistry Registry=new StandardServiceRegistryBuilder().applySettings(cfg.getProperties()).build();
	factory=cfg.buildSessionFactory(Registry);
	}
	
	public static Session getSession(){
		if(factory!=null){
			return factory.openSession();
		}else{
			cfg=new Configuration().configure();
			ServiceRegistry Registry=new StandardServiceRegistryBuilder().applySettings(cfg.getProperties()).build();
			factory=cfg.buildSessionFactory(Registry);
			
			return factory.openSession();
					
		}
	}
	
	public static void closeSession(){
		if(session!=null&&session.isOpen()){
			session.close();
		}
	}
}
