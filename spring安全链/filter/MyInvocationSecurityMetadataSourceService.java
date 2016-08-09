package com.pb.filter;

import java.util.ArrayList;
 import java.util.Collection;
 import java.util.HashMap;
 import java.util.Iterator;
 import java.util.Map;
 import java.util.Map.Entry;
 
 import org.apache.log4j.Logger;
 import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
 import org.springframework.security.web.FilterInvocation;
 import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
 import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;

import com.pb.dao.ResourceDao;
import com.pb.dao.ResourceDaoImpl;

 /**
 * 资源源数据定义，即定义某一资源可以被哪些角色访问
 * @author wzhang
 *
  */
 public class MyInvocationSecurityMetadataSourceService implements FilterInvocationSecurityMetadataSource  {

 
    private static Map<String, Collection<ConfigAttribute>> resourceMap = null;
    
    private PathMatcher pathMatcher = new AntPathMatcher();
    
    private ResourceDao resourceDao;    
    	//
    public MyInvocationSecurityMetadataSourceService(ResourceDao resourceDao ){
        this.resourceDao =resourceDao;
        //通过有参构造方法给静态map集合赋值
       resourceMap = loadResourceMatchAuthority();
     }
    
     public Collection<ConfigAttribute> getAllConfigAttributes() {
 
        return null;
    }
 
     public MyInvocationSecurityMetadataSourceService() {
        super();
        this.resourceDao  = new ResourceDaoImpl();
        //通过无参构造方法给静态map集合赋值
         resourceMap = loadResourceMatchAuthority();
    }
 
    /**
      * 加载资源与权限的映射关系
     * 
      * @return
      */
     private Map<String, Collection<ConfigAttribute>> loadResourceMatchAuthority() {
 
        Map<String, Collection<ConfigAttribute>> map = new HashMap<String, Collection<ConfigAttribute>>();

        // 获取资源权限映射key：url，value：role，就是resourceDao接口的map集合
        Map<String, String> configs = resourceDao.getResources();
         for (Entry<String, String> entry : configs.entrySet()) {
             Collection<ConfigAttribute> list = new ArrayList<ConfigAttribute>();
             String[] vals = entry.getValue().split(",");
            for (String val : vals) {
                 ConfigAttribute config = new SecurityConfig(val);
                 list.add(config);
             }
             map.put(entry.getKey(), list);
        }
 
         return map;
 
     }
 
     public Collection<ConfigAttribute> getAttributes(Object object)
             throws IllegalArgumentException {
         String url = ((FilterInvocation) object).getRequestUrl();
 
        System.out.println("requestUrl is(请求的url是)：" + url);
         //logger.info("requestUrl is " + url);
         
         if (resourceMap == null) {
             loadResourceMatchAuthority();
         }
         //比较url是否存在
         Iterator<String> ite = resourceMap.keySet().iterator();
         while (ite.hasNext()) {
             String resURL = ite.next();
            if (pathMatcher.match(resURL,url)) {//url的值为：/admin /index
                 return resourceMap.get(resURL);
             }
         }
         
         System.out.println("resourceMap.get(url)(应该是list集合的引用):"+resourceMap.get(url));
         return resourceMap.get(url);//得到的是list集合的引用
     }
 
     public boolean supports(Class<?> clazz) {
         return true;
     }
 }
