package com.pb.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class RunProcedure {
	public void execute() {
		// 需要做的事情
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd :HH : mm : ss");
		String dqsj = sdf.format(new Date());
		System.out.println("定时任务=====当前时间为=" + dqsj);
		//调用存储过程
		//baseContentToMapper.runProcedure();
		
		//log.error("quartz");
	}
}
