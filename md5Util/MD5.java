package com.pb.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import sun.misc.BASE64Encoder;

public class MD5 {
	public static String EncoderPwdByMd5(String str){  
        // 确定计算方法  
        MessageDigest md5;
        String newstr=null;
		try {
			md5 = MessageDigest.getInstance("MD5");
			BASE64Encoder base64en = new BASE64Encoder();  
			newstr = base64en.encode(md5.digest(str.getBytes("utf-8")));  
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
        
        
        return newstr;  
    }  
}
