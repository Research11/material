package com.pb.controller;


import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;
import org.springframework.expression.ParseException;
import org.springframework.stereotype.Component;

@Component
public class DateConverter implements Converter<String, Date> {    
@Override    
public Date convert(String source) {    
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");    
       
       
        try {
			return dateFormat.parse(source);
		} catch (java.text.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;   
                 
}    

}	


