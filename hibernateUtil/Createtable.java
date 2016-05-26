package com.pb.common;

import org.hibernate.cfg.Configuration;
import org.hibernate.tool.hbm2ddl.SchemaExport;

public class Createtable {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Configuration cfg=new Configuration().configure();
		
		SchemaExport export=new SchemaExport(cfg);
		
			export.create(true, true);
	}

}
