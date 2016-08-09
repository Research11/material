package com.pb.filter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.pb.common.RoleConstants;
import com.pb.dao.UserDao;
import com.pb.dao.UserDaoImpl;
import com.pb.entity.UserBean;

/**
21  * 自定义用户与权限的关系
22  * @author wzhang
23  *
24  */
public class MyUserDetailService implements UserDetailsService {
    protected static Logger logger = Logger.getLogger("service");
    private UserDao userDAO = new UserDaoImpl();
    
    /**
30      * 根据用户名获取用户-权限等用户信息
31      */
     public UserDetails loadUserByUsername(String username)
             throws UsernameNotFoundException {
        System.out.println("输入的用户名为："+username);
        
        UserDetails user = null;
        try {
             UserBean dbUser = userDAO.getUser(username);
             user = new User(dbUser.getUserName(), dbUser.getPassword().toLowerCase(), true, true, true, true,getAuthorities(dbUser));
         } catch (Exception e) {
            logger.error("Error in retrieving user");  
            throw new UsernameNotFoundException("Error in retrieving user"); 
         }
         return user;
     }
     
      /** 
47      * 获得访问角色权限 
48      *  
49      * @param access 
50      * @return 
51      */  
     private Collection<GrantedAuthority> getAuthorities(UserBean dbUser) {  
   
         List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>(2);  
   
         // 所有的用户默认拥有ROLE_USER权限  
         logger.debug("Grant ROLE_USER to this user");  
         authList.add(new  SimpleGrantedAuthority(RoleConstants.ROLE_USER));  
  
         // 如果参数access为1.则拥有ROLE_ADMIN权限  
         if (dbUser.getRole().getRoleName().equals(RoleConstants.ROLE_ADMIN)) {  
             logger.debug("Grant ROLE_ADMIN to this user");  
             authList.add(new  SimpleGrantedAuthority(RoleConstants.ROLE_ADMIN));  
         }  
   
         return authList;  
    }      
 
 }
