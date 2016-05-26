package com.pb.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;

import com.opensymphony.xwork2.conversion.impl.DefaultTypeConverter;

//类型转换器需要注册
public class DateTypeConverter extends DefaultTypeConverter{

	@Override
	public Object convertValue(Map<String, Object> context, Object value, Class toType) {
		SimpleDateFormat format=new SimpleDateFormat("yyyyMMdd");
		String paroms[]=(String[]) value;
		try {
			return format.parse(paroms[0]);
		} catch (ParseException e) {		
			throw new RuntimeException(e);			
		}		
	}
}
