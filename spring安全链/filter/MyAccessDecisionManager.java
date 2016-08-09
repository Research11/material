package com.pb.filter;

import java.util.Collection;
import java.util.Iterator;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.access.SecurityConfig;

/**
 * 自定义访问决策器，决定某个用户具有的角色，是否有足够的权限去访问某个资源 
  * @author wzhang
  *
  */
 public class MyAccessDecisionManager implements AccessDecisionManager {
 
    /**
      * 裁定当前用户对应权限authentication是否包含所请求资源所拥有的权限 如果成立 则通过裁定 否则发生异常
     */
     public void decide(Authentication authentication, Object object,
             Collection<ConfigAttribute> configAttributes)
             throws AccessDeniedException, InsufficientAuthenticationException {
         
         if (configAttributes == null) {
             return;
         }
 
         Iterator ite = configAttributes.iterator();
         Iterator localIterator1;
         for (; ite.hasNext(); localIterator1.hasNext()){
        	 
           ConfigAttribute ca = (ConfigAttribute)ite.next();
           String needRole = ((SecurityConfig)ca).getAttribute();
           localIterator1 = authentication.getAuthorities().iterator();
           GrantedAuthority ga = (GrantedAuthority)localIterator1.next();
          
           if (needRole.equals(ga.getAuthority())) {
             return;
           }
         }

         throw new AccessDeniedException("no right");
         
         // 所请求的资源拥有的权限(一个资源对多个权限)
         /*Iterator<ConfigAttribute> iterator = configAttributes.iterator();
         
         while (iterator.hasNext()) {
             ConfigAttribute configAttribute = iterator.next();
             
             // 访问所请求资源所需要的权限
            String needPermission = configAttribute.getAttribute();
            
             System.out.println("needPermission is " + needPermission);
            
             // 用户所拥有的权限authentication
             for (GrantedAuthority ga : authentication.getAuthorities()) {
            	 
            	 	System.out.println(needPermission.equals("ROLE_ADMIN"));
            	 	
                 if (needPermission.equals(ga.getAuthority())) {//needPermission.equals("")ga.getAuthority()
                     return;
                 }
             }
         }
 
         // 没有权限
         throw new AccessDeniedException(" No Access Dendied ");*/
 
     }
 
     public boolean supports(ConfigAttribute configAttribute) {
         return true;
     }
 
     public boolean supports(Class<?> clazz) {
         return true;
     }
 
 }