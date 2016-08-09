package com.pb.entity;

public class UserBean {
	
	 private String userName;
	 private String password;
	 private Integer access;
	 private RoleBean role;
	     
	      /**
	     * @return the userName
	      */
	     public String getUserName() {
	        return userName;
	     }
	     /**
	       * @param userName the userName to set
	       */
	     public void setUserName(String userName) {
	         this.userName = userName;
	     }
	     /**
	       * @return the password
	       */
	      public String getPassword() {
	         return password;
	      }
	    /**
	      * @param password the password to set
	       */
	      public void setPassword(String password) {
	         this.password = password;
	      }
	     /**
	      * @return the access
	      */
	      public Integer getAccess() {
	        return access;
	     }
	     /**
	     * @param access the access to set
	      */
	     public void setAccess(Integer access) {
	         this.access = access;
	     }
	     /**
	      * @return the role
	      */
	     public RoleBean getRole() {
	         return role;
	    }
	
	     public void setRole(RoleBean role) {
	         this.role = role;
	    }
}
