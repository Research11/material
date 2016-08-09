package com.pb.entity;

public class RoleBean {
	
	private int roleId;
	private String roleName;
	private String roleDesc;
	     
	    public RoleBean() {
	         super();
	         // TODO Auto-generated constructor stub
	    }
	    
	    public RoleBean(int roleId, String roleName, String roleDesc) {
	         super();
	         this.roleId = roleId;
	         this.roleName = roleName;
	         this.roleDesc = roleDesc;
	    }
	      /**
	       * @return the roleId
	       */
	      public int getRoleId() {
	          return roleId;
	      }
	      
	      public void setRoleId(int roleId) {
	          this.roleId = roleId;
	      }
	      /**
	       * @return the roleName
	       */
	      public String getRoleName() {
	          return roleName;
	      }
	      /**
	       * @param roleName the roleName to set
	       */
	      public void setRoleName(String roleName) {
	          this.roleName = roleName;
	      }
	      /**
	       * @return the roleDesc
	       */
	      public String getRoleDesc() {
	          return roleDesc;
	      }
	      /**
	      * @param roleDesc the roleDesc to set
	       */
	     public void setRoleDesc(String roleDesc) {
	          this.roleDesc = roleDesc;
	      }
}
