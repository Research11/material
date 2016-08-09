package com.pb.dao;

import java.util.HashMap;
import java.util.Map;

import com.pb.common.RoleConstants;

public class ResourceDaoImpl implements ResourceDao{

	@Override
	public Map<String, String> getResources() {
		Map<String, String> map = new HashMap<String, String>();
        map.put("/admin**", RoleConstants.ROLE_ADMIN);
        map.put("/index**", RoleConstants.ROLE_USER);
        return map;
		
	}

}
