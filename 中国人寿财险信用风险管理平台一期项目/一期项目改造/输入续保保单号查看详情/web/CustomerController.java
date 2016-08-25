package org.ibas.credit.customer.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.ibas.credit.Constants;
import org.ibas.credit.accept.entity.Policy;
import org.ibas.credit.accept.service.PolicyService;
import org.ibas.credit.cust.entity.BlackCust;
import org.ibas.credit.customer.entity.Customer;
import org.ibas.credit.customer.entity.CustomerCompany;
import org.ibas.credit.customer.entity.CustomerCompanyForm;
import org.ibas.credit.customer.entity.CustomerPerson;
import org.ibas.credit.customer.entity.CustomerPersonForm;
import org.ibas.credit.customer.entity.LoginUser;
import org.ibas.credit.customer.entity.MyTreeNode;
import org.ibas.credit.customer.service.CustomerCompanyService;
import org.ibas.credit.customer.service.CustomerPersonService;
import org.ibas.credit.customer.service.CustomerService;
import org.ibas.framework.core.base.orm.Page;
import org.ibas.framework.core.base.security.springsecurity.SpringSecurityUtils;
import org.ibas.framework.core.base.utils.StringHelper;
import org.ibas.framework.core.sys.entity.SearchModel;
import org.ibas.framework.core.sys.entity.TEntityReferTab;
import org.ibas.framework.core.sys.service.TEntityReferTabService;
import org.ibas.framework.core.util.JSONUtil;
import org.ibas.framework.core.web.EntityController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Customer Dao.
 * 
 * 实现领域对象客户基本信息表的页面后台处理.
 * 
 * @author IBAS
 */

@Controller
public class CustomerController extends EntityController<Customer> {
    private static final String PATH = "/jsp/ext3/credit/customer/";
    @Value("#{app.yxsc_url}")
    private String YXSC_URL;//影像上传地址
    @Value("#{app.yxck_url}")
    private String YXCK_URL;//影像查看地址
    @Autowired
    private CustomerService customerService;
    @Autowired
    private PolicyService policyService;
    @Autowired
    private CustomerPersonService customerPersonService;
    @Autowired
    private CustomerCompanyService customerCompanyService;
    @Autowired
    private TEntityReferTabService tEntityReferTabService;

    /**
     * 客户基本信息表 列表页面
     */
    @RequestMapping(value = "customer_list_view.action")
    public String customerListView() {
        return PATH + "customer";
    }

    /**
     * 客户基本信息表 关联明细列表
     */
    @RequestMapping(value = "customer_detail_tabs.action")
    public @ResponseBody Map<String, ? extends Object> customerDetailTabs(@RequestParam String ID) throws Exception {
        try {
            List<TEntityReferTab> list = tEntityReferTabService.getEntityReferTabDaoByEntityId(ID);
            TEntityReferTab tab = new TEntityReferTab();
            tab.setActive(1);
            tab.setEntityId(ID);
            tab.setName("detail");
            tab.setTitle("客户基本信息表明细信息");
            tab.setUrl("customer_view.action");
            list.add(0, tab);
            return getTabMap(list);
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError(SELECT_ERROR);
        }
    }

    /**
     * 客户基本信息表 列表
     */
    @RequestMapping(value = "customer_list.action")
    public @ResponseBody Map<String, ? extends Object> customerList(@RequestParam String adSearch, Integer start, Integer limit, Customer data) throws Exception {
        //只查询有效的用户
        data.setEffectiveState("0");
        data.setNewMark("1");
        if (limit == null)
            limit = 20;
        Page<Customer> page = new Page<Customer>(limit);
        if (start != null)
            page.setPageNo((start) / limit + 1);
        Page<Customer> customers = null;
        try {
            if (null != adSearch && StringUtils.isNotEmpty(adSearch)) {
                if (adSearch.equals("columnSearch")) {
                    customers = customerService.searchData(page, data);
                } else if (adSearch.equals("quickSearch")) {
                    customers = customerService.searchData(page, data);
                } else if (adSearch.equals("groupSearch")) {
                    customers = customerService.searchData(page, data);
                } else {
                    SearchModel o = (SearchModel) JSONUtil.getDTO(adSearch, SearchModel.class);
                    String reStr = " from CustomerInfos where " + StringHelper.replaceChart(JSONUtil.toBeans(o));
                    customers = customerService.searchData(page, reStr);
                }
            } else {
                customers = customerService.searchData(page, data);
            }
            return getMap(customers);
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError(SELECT_ERROR);
        }
    }

    /**
     * 客户基本信息表 删除
     */
    @RequestMapping(value = "customer_delete.action")
    public @ResponseBody Map<String, ? extends Object> customerDelete(@RequestParam Object data) throws Exception {
        try {
            String result = customerService.deleteCustomer(data);
            Map<String, Object> map = getMap();
            map.put("delResult", result);
            return map;
        } catch (Exception e) {
            return getModelMapError("在删除客户基本信息表过程中出现错误.");
        }
    }

    /**
     * 客户基本信息表 明细
     */
    @RequestMapping(value = "customer_detail.action")
    public @ResponseBody Map<String, ? extends Object> customerView(@RequestParam("id") String id) throws Exception {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        try {
            Customer customer = customerService.get(id);
            modelMap.put("data", customer);
            modelMap.put("success", true);
            return modelMap;
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError(SELECT_ERROR);
        }
    }

    /**
     * 客户基本信息表 个人客户 查看页面
     */
    @RequestMapping(value = "customerPersonEdit_view.action")
    public String customerPersonEdit(@RequestParam("id") String id, String isSurvey, String isFgshbg, ModelMap model,@RequestParam(required=false,defaultValue="0") String tag) {
    	
    	if (id != null && !"null".equals(id)) {
            CustomerPersonForm cpf = customerService.getCustomerPersonForm(id);
            Customer customer = customerService.get(id);
            if (StringUtils.isNotBlank(isSurvey) && Constants.IS_SURVEY_TRUE.equals(isSurvey)) {
                customer.setIsSurvey(isSurvey);
            }
            if (StringUtils.isNotBlank(isFgshbg) && Constants.IS_FGSHBG_TRUE.equals(isFgshbg)) {
                customer.setIsFgshbg(isFgshbg);
            }
            cpf.setCustomer(customer);
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonCustomer = null;
            try {
                jsonCustomer = objectMapper.writeValueAsString(cpf);
            } catch (Exception e) {
                e.printStackTrace();
            }
            model.addAttribute("cpf", jsonCustomer);
        } else {
            CustomerPersonForm cpf = new CustomerPersonForm();
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonCustomer = null;
            try {
                jsonCustomer = objectMapper.writeValueAsString(cpf);
            } catch (Exception e) {
                e.printStackTrace();
            }
            model.addAttribute("cpf", jsonCustomer);
        }
        
        if(tag.equals("1")){
        	
        	return PATH + "customerPerson/customerPersonRenewal_view";
        	
        }else{
        	
        	 return PATH + "customerPerson/customerPerson_view";
        }
        	
    }
    
    /**
     * 个人类型 客户基本信息保存
     */
    @RequestMapping(value = "customerPersonData_save.action")
    public @ResponseBody Map<String, ? extends Object> customerPersionSave(CustomerPersonForm data, String certificateString, String customerAssetString, String customerCarAssetString,
            String customerOtherAssetString, String creditCardString, String blackPublicString) throws Exception {
        try {
            data.setCustomerAssets(customerAssetString);
            data.setCertificates(certificateString);
            data.setCustomerCarAssets(customerCarAssetString);
            data.setCustomerOtherAssets(customerOtherAssetString);
            data.setCustomerCards(creditCardString);
            data.setBlackPublics(blackPublicString);
            String result = customerService.customerPersonSave(data);
            Map<String, Object> map = getMap();
            map.put("myResult", result);
            return map;
        } catch (Exception e) {
            return getModelMapError("在保存客户基本信息过程中出现错误.");
        }
    }

    /**
     * 客户基本信息表 个人客户 查看页面
     */
    @RequestMapping(value = "customerCompanyEdit_view.action")
    public String customerCompanyEdit(String id, String isSurvey, String isFgshbg, ModelMap model) {
      
    	if (id != null && !"null".equals(id)) {
            CustomerCompanyForm ccf = customerService.getCustomerCompanyForm(id);
            Customer customer = customerService.get(id);
            if (StringUtils.isNotBlank(isSurvey) && Constants.IS_SURVEY_TRUE.equals(isSurvey)) {
                customer.setIsSurvey(isSurvey);
            }
            if (StringUtils.isNotBlank(isFgshbg) && Constants.IS_FGSHBG_TRUE.equals(isFgshbg)) {
                customer.setIsFgshbg(isFgshbg);
            }
            ccf.setCustomer(customer);
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonCustomer = null;
            try {
                jsonCustomer = objectMapper.writeValueAsString(ccf);
            } catch (Exception e) {
                e.printStackTrace();
            }
            model.addAttribute("ccf", jsonCustomer);
        } else {
            CustomerCompanyForm ccf = new CustomerCompanyForm();
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonCustomer = null;
            try {
                jsonCustomer = objectMapper.writeValueAsString(ccf);
            } catch (Exception e) {
                e.printStackTrace();
            }
            model.addAttribute("ccf", jsonCustomer);
        }
        
        	return PATH + "customerCompany/customerCompany_view";
       
        
    }

    /**
     * 类型 企业客户基本信息保存
     */
    @RequestMapping(value = "customerCompanyData_save.action")
    public @ResponseBody Map<String, ? extends Object> customerCompangySave(CustomerCompanyForm data, String customerCompanyrelatString, String companyCustomerString, String businessFinanceString,
            String certificateString, String creditCardString, String blackPublicString) {
        try {
            data.setBusinessFinances(businessFinanceString);
            data.setCustomerPersons(companyCustomerString);
            data.setCustomerCompanys(customerCompanyrelatString);
            data.setCertificates(certificateString);
            data.setCustomerCards(creditCardString);
            data.setBlackPublics(blackPublicString);
            String result = customerService.customerCompanySave(data);
            Map<String, Object> map = getMap();
            map.put("myResult", result);
            return map;
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError("在保存客户基本信息过程中出现错误.");
        }
    }

    /**
     * 客户基本信息表 列表
     */
    @RequestMapping(value = "customerPo_list.action")
    public @ResponseBody Map<String, ? extends Object> customerPoList(@RequestParam String adSearch, Integer start, Integer limit) throws Exception {
        //System.out.println("方法");
        Customer data = new Customer();
        data.setCustomerType("1");

        if (limit == null)
            limit = 20;
        Page<Customer> page = new Page<Customer>(limit);
        if (start != null)
            page.setPageNo((start) / limit + 1);
        Page<Customer> customers = null;
        try {
            if (null != adSearch && StringUtils.isNotEmpty(adSearch)) {
                if (adSearch.equals("columnSearch")) {
                    customers = customerService.searchData(page, data);
                } else if (adSearch.equals("quickSearch")) {
                    customers = customerService.searchData(page, data);
                } else if (adSearch.equals("groupSearch")) {
                    customers = customerService.searchData(page, data);
                } else {
                    SearchModel o = (SearchModel) JSONUtil.getDTO(adSearch, SearchModel.class);
                    String reStr = " from CustomerInfos where " + StringHelper.replaceChart(JSONUtil.toBeans(o));
                    customers = customerService.searchData(page, reStr);
                }
            } else {
                customers = customerService.searchData(page, data);
            }
            return getMap(customers);
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError(SELECT_ERROR);
        }
    }

    /**
     * 个人类型 客户基本信息保存
     */
    @RequestMapping(value = "customerPersonData_savePo.action")
    public @ResponseBody Map<String, ? extends Object> customerPersionSavePo(HttpServletRequest request, HttpServletResponse response, CustomerPersonForm data) throws Exception {
        String userID = request.getParameter("userID");
        data.getCustomer().setEffectiveState("0");
        if (userID != null) {
            //分别设置customer的ID 和对应person的ID
            data.getCustomer().setId(userID);
            //查找customerperson
            String cpID = customerPersonService.getCustomerPersonByCustomerId(userID).getId();
            data.getCustomerPerson().setId(cpID);
        }

        try {
            Map<String, Object> result = customerService.customerPersonSavePo(data);
            Map<String, Object> map = getMap();
            Customer customer = (Customer) result.get("customer");
            String myInfoResult = (String) result.get("result");
            map.put("myResult", customer);
            map.put("myInfoResult", myInfoResult);
            return map;
            //return getMap();
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError("在保存客户基本信息过程中出现错误.");
        }
    }

    /**
     * 根据客户类型和证件号码的唯一性校验
     * 
     * @param customer
     * @return
     */
    @RequestMapping(value = "customerUnique.action")
    public @ResponseBody boolean getCustomerByDocumentCodeAndType(String documentCode, String customerType) {
        boolean bl = true;
        Customer customer = new Customer();
        customer.setCustomerType(customerType);
        customer.setDocumentCode(documentCode);
        Customer customerResult = customerService.getCustomerByDocumentCodeAndType(customer);
        if (customerResult == null) {
            bl = true;
        } else {
            bl = false;
        }
        return bl;
    }

    /**
     * 新增，引入 查看 Popup使用
     */
    @RequestMapping(value = "customerPoScanss_list.action")
    public String customerPoScanss_list(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String userID = request.getParameter("userID");
        List<String> slist = customerService.getCustomerByID(userID);
        String json = "{customerName:\"" + slist.get(0) + "\",idNumber:\"" + slist.get(1) + "\",personType:\"" + slist.get(2) + "\",gender:\"" + slist.get(3) + "\",domiciliaryType:\"" + slist.get(4)
                + "\",contactAddress:\"" + slist.get(5) + "\",contactCode:\"" + slist.get(6) + "\",telephone:\"" + slist.get(7) + "\",assuredType:\"" + slist.get(8) + "\",creditCode:\""
                + slist.get(9) + "\",orgCode:\"" + slist.get(10) + "\"}";
        json = json.replaceAll("null", "");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().print(json);
        return null;
    }

    /**
     * 查看用户列表
     */
    @RequestMapping(value = "loginUser_listByCon.action")
    public @ResponseBody Map<String, ? extends Object> loginUserListByCondition(Integer start, Integer limit, HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 查询用的参数
        String userName = request.getParameter("userName");
        StringBuffer sb = new StringBuffer();
        if (userName != null && !"".equals(userName)) {
            sb.append(" and u.USER_NAME like " + "'%" + userName + "%' ");
        }
        if (limit == null) {
            limit = 20;
        }
        Map<String, Object> map = customerService.getLoginUserByCondition(start, limit, sb.toString());
        @SuppressWarnings("unchecked")
        List<LoginUser> panList = (List<LoginUser>) map.get("data");
        Map<String, Object> modelMap = new HashMap<String, Object>(3);
        int pageTotal = (Integer) map.get("total");
        modelMap.put("total", pageTotal);
        modelMap.put("data", panList);
        modelMap.put("success", Boolean.valueOf(true));
        return modelMap;
    }

    /**
     * 资信调查管理 根据保单号查询客户信息
     * 
     * @param policyId
     */
    @RequestMapping(value = "getCustomerByPolicyId.action")
    public @ResponseBody Map<String, ? extends Object> getCustomerByPlicyId(@RequestParam String policyId) {
    	
    
    	
        Map<String, Object> map = new HashMap<String, Object>();
        Policy policy = policyService.get(policyId);
        if (policy != null && StringUtils.isNotBlank(policy.getPolicyHolder())) {
            Customer customer = customerService.get(policy.getPolicyHolder());
            map.put("data", customer);
            map.put("success", true);
        } else {
            map.put("success", false);
            map.put("msg", "投保客户不存在!");
        }
        return map;
    }

    /**
     * 测试
     */
    @RequestMapping(value = "customer_Test_win.action")
    public String customerTestWin() {
        return PATH + "customerTest";
    }

    /**
     * 选中部门 以树结构显示
     */
    @RequestMapping(value = "mytree.action")
    public String mytree(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //System.out.println("mytree开始了");
        String nodeId = request.getParameter("nodeId");
        //System.out.println("当前点击的节点为====" + nodeId);
        String json = "";
        if ("source".equals(nodeId)) {
            nodeId = "-1";
            // 查询子节点集合
            List<MyTreeNode> li = customerService.getChildrenByID(nodeId);
            // 遍历集合 设置每一个节点是否是叶子节点
            for (int i = 0; i < li.size(); i++) {
                li.get(i).setLeaf(false);
            }
            JSONArray jsonArray = JSONArray.fromObject(li);
            json = jsonArray.toString();
        } else {//
                // 查询总公司的下属公司
            boolean res1 = customerService.hasChild(nodeId);// 是否有子节点
            // 如果有 才去查询
            if (res1) {
                // 查询子节点集合
                List<MyTreeNode> li = customerService.getChildrenByID(nodeId);
                // 遍历集合 设置每一个节点是否是叶子节点
                for (int i = 0; i < li.size(); i++) {
                    String myid = li.get(i).getId();
                    boolean sdd = customerService.hasChild(myid);
                    if (li.get(i).getId().equals("0")) {
                        li.get(i).setLeaf(true);
                    } else {
                        if (sdd) {
                            li.get(i).setLeaf(false);
                        } else {
                            li.get(i).setLeaf(true);
                        }
                    }
                }
                JSONArray jsonArray = JSONArray.fromObject(li);
                json = jsonArray.toString();
                //System.out.println("出问题的json是====" + json);
            }
        }
        response.setContentType("text/plain");// ContentType = "text/plain";
        response.getWriter().print(json);
        return null;
    }

    /**
     * 选择角色 以树结构显示
     */
    @RequestMapping(value = "myRoletree.action")
    public String myRoletree(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //System.out.println("myRoletree开始了");
        String nodeId = request.getParameter("nodeId");
        //System.out.println("当前点击的节点为====" + nodeId);
        String json = "";
        if ("source".equals(nodeId)) {
            nodeId = "0";
            // 查询子节点集合
            List<MyTreeNode> li = customerService.getAllroleTree();
            JSONArray jsonArray = JSONArray.fromObject(li);
            json = jsonArray.toString();
            //System.out.println("出问题的json是====" + json);
        }
        response.setContentType("text/plain");// ContentType = "text/plain";
        response.getWriter().print(json);
        return null;
    }

    /**
     * 个人类型 客户基本信息保存
     */
    @RequestMapping(value = "customerPersonData_UpdatePo.action")
    public @ResponseBody Map<String, ? extends Object> customerPersonData_UpdatePo(HttpServletRequest request, HttpServletResponse response, CustomerPersonForm data) throws Exception {
        String userID = request.getParameter("userID");
        String cupoid = customerPersonService.getCustomerPersonByCustomerId(userID).getId();
        try {
            customerService.customerPersonUpdatePo(data, userID, cupoid);
            return getMap();
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError("在保存客户基本信息过程中出现错误.");
        }
    }

    /**
     * 个人类型客户黑名单校验
     * 
     * @param data
     * @return
     * @throws IllegalAccessException
     * @throws InstantiationException
     */
    @RequestMapping(value = "blackCustPerson_Check.action")
    public @ResponseBody Map<String, ? extends Object> blackCustPerson_Check(CustomerPersonForm data, String certificateString) throws InstantiationException, IllegalAccessException {
        data.setCertificates(certificateString);
        BlackCust bc = customerService.blackCustPerson_Check(data);
        Map<String, Object> map = getMap();
        if (bc == null) {
            map.put("myResult", "NO");
        } else {
            map.put("myResult", "YES");
            map.put("blackCust", bc);
        }
        return map;
    }

    /**
     * 企业型客户黑名单校验
     * 
     * @param data
     * @return
     * @throws IllegalAccessException
     * @throws InstantiationException
     */
    @RequestMapping(value = "blackCustCompany_Check.action")
    public @ResponseBody Map<String, ? extends Object> blackCustCompany_Check(CustomerCompanyForm data, String certificateString) throws InstantiationException, IllegalAccessException {
        data.setCertificates(certificateString);
        BlackCust bc = customerService.blackCustCompany_Check(data);
        Map<String, Object> map = getMap();
        if (bc == null) {
            map.put("myResult", "NO");
        } else {
            map.put("myResult", "YES");
            map.put("blackCust", bc);
        }
        return map;
    }

    /**
     * 新增，引入 查看
     */
    @RequestMapping(value = "customerPoScanssqy_list.action")
    public String customerPoScanssqy_list(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String userID = request.getParameter("userID");
        //System.out.println("数据源中的userid=" + userID);
        List<String> slist = customerService.getCustomerPersonByID(userID);

        String json = "{customerName:\"" + slist.get(0) + "\",organizationCode:\"" + slist.get(1) + "\",registerAddress:\"" + slist.get(2) + "\",registerzipCode:\"" + slist.get(3) + "\",taxCode:\""
                + slist.get(4) + "\",licenceCode:\"" + slist.get(5) + "\",assuredType:\"" + slist.get(6) + "\",creditCode:\"" + slist.get(7) + "\",orgCode:\"" + slist.get(8) + "\"}";
        json = json.replaceAll("null", "");
        System.out.println("我的json输出===" + json);
        response.setCharacterEncoding("UTF-8");
        // response.Write(json);
        // response.setContentType("text/plain");//ContentType = "text/plain";
        response.getWriter().print(json);
        return null;
    }

    /**
     * 企业类型 客户基本信息保存
     */
    @RequestMapping(value = "customerCompanyData_UpdatePo.action")
    public @ResponseBody Map<String, ? extends Object> customerCompanyData_UpdatePo(HttpServletRequest request, HttpServletResponse response, CustomerCompanyForm data) throws Exception {
        String userID = request.getParameter("userID");
        String cupoid = customerCompanyService.getCustomerCompanyByCustomerId(userID).getId();
        try {
            customerService.customerCompanyUpdatePo(data, userID, cupoid);
            CustomerResult cr = new CustomerResult();
            cr.setCustomer(customerService.get(userID));
            cr.setCustomerCompany(customerCompanyService.getCustomerCompanyByCustomerId(userID));
            Map<String, Object> map = getMap();
            map.put("myCustomerInfo", cr);
            return map;
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError("在保存客户基本信息过程中出现错误.");
        }
    }

    /**
     * 类型 企业客户基本信息保存
     */
    @RequestMapping(value = "customerPersonData_savePoqy.action")
    public @ResponseBody Map<String, ? extends Object> customerPersonData_savePoqy(CustomerCompanyForm data) {
        try {
            data.getCustomer().setEffectiveState("0");
            Map<String, Object> result = customerService.customerPersonData_savePoqy(data);
            Map<String, Object> map = getMap();
            Customer customer = (Customer) result.get("customer");
            String myInfoResult = (String) result.get("result");
            map.put("myResult", customer);
            map.put("myInfoResult", myInfoResult);
            return map;
        } catch (Exception e) {
            return getModelMapError("在保存客户基本信息过程中出现错误.");
        }
    }

    /**
     * 根据客户id查看客户信息
     * 
     * @param policyId
     * @throws IOException
     */
    @RequestMapping(value = "getCustomerBycustId.action")
    public String getCustomerBycustId(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String result = "";
        String id = request.getParameter("userID");
        // Map<String, Object> map = new HashMap<String, Object>();
        Customer customer = customerService.get(id);
        result = customer.getCustomerType();//客户类型
        response.setCharacterEncoding("UTF-8");
        // response.Write(json);
        // response.setContentType("text/plain");//ContentType = "text/plain";
        response.getWriter().print(result);
        return null;
    }

    /**
     * 根据客户id查看客户信息
     * 
     * @param policyId
     * @throws IOException
     */
    @RequestMapping(value = "getyingxiang.action")
    public String getyingxiang(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //String userId = SpringSecurityUtils.getCurrentUserId();
        String username = SpringSecurityUtils.getCurrentUserName();
        String policyId = request.getParameter("policyId");
        Policy policy = policyService.get(policyId);
        String policy_no = policy.getPolicyNo();
        Customer customer1 = customerService.get(policy.getAssuredCode());// 被保险人
        Customer customer2 = customerService.get(policy.getPolicyHolder());// 保险人

        String endor_type = "2";// （1-表示批单,2-表示保单）
        String pro_name = customer2.getCustomerName();// 投保人姓名

        String pro_ident_type = "";// 投保人证件类型
        if ("1".equals(customer2.getCustomerType())) {
            pro_ident_type = "身份证";
        } else {
            pro_ident_type = "组织机构";
        }
        String pro_ident_no = customer2.getDocumentCode();// 投保人证件号码

        String ins_name = customer1.getCustomerName();// 被保险人姓名
        if (ins_name.length() > 5) {
            ins_name = ins_name.substring(0, 5) + "...";
        }
        String ins_ident_type = "";// 被保险人证件类型
        if ("1".equals(customer1.getCustomerType())) {
            ins_ident_type = "身份证";
        } else {
            ins_ident_type = "组织机构";
        }

        String ins_ident_no = customer1.getDocumentCode();// 被保险人证件号码
        String riskcode = policy.getInsuranceName();// 险种
        String system = "信用风险管理系统";// 来源系统

        if ("1".equals(customer1.getCustomerType())) {
            // 个人
            customer1.getDocumentCode();// 身份证号码
        }

        // String policy.getInsuranceType();//险种
        StringBuffer s = new StringBuffer();
        s.append(YXSC_URL + ";;");
        s.append("<ROOT>");
        s.append("<BASE_DATA>");
        s.append("<ORG_NUM>00000000</ORG_NUM>");
        s.append("<COM_CODE>00000000</COM_CODE>");
        s.append("<OP_ID>" + username + "</OP_ID>");
        s.append("<OP_USER>" + username + "</OP_USER>");
        s.append("<DEL_RIGHT>0</DEL_RIGHT>");
        s.append("</BASE_DATA>");

        s.append("<META_DATAS>");

        s.append("<META_DATA>");
        //邱实 改  s.append("<APP_CODE>E_POLICY</APP_CODE>");
        s.append("<APP_CODE>NOCAR_PRPALL</APP_CODE>");
        s.append("<CLASSIFY_LIMIT>0</CLASSIFY_LIMIT>");
        s.append("<CHECK_TYPE>0</CHECK_TYPE>");
        // 以下是索引信息
        /*
         * 批单号 ENDOR_NO 保单号 POLICY_NO 类型 ENDOR_TYPE （1-表示批单,2-表示保单） 投保人姓名
         * PRO_NAME 投保人证件类型 PRO_IDENT_TYPE 投保人证件号码 PRO_IDENT_NO 被保险人姓名 INS_NAME
         * 被保险人证件类型 INS_IDENT_TYPE 被保险人证件号码 INS_IDENT_NO 险类 CLASSCODE 险种
         * RISKCODE 来源系统 SYSTEM
         */
        // policy_no=policy_no.substring(1,policy_no.length());
        s.append("<POLICY_NO>" + policy_no + "</POLICY_NO>");
        //qiushi 改 开始
        s.append("<PRO_NO>" + policy_no + "</PRO_NO>");
        //s.append("<BUSI_NO>" + policy_no + "</BUSI_NO>");
        //qiushi 改 结束
        s.append("<ENDOR_TYPE>" + endor_type + "</ENDOR_TYPE>");
        s.append("<PRO_NAME>" + pro_name + "</PRO_NAME>");
        s.append("<PRO_IDENT_TYPE>" + pro_ident_type + "</PRO_IDENT_TYPE>");
        s.append("<PRO_IDENT_NO>" + pro_ident_no + "</PRO_IDENT_NO>");
        s.append("<INS_NAME>" + ins_name + "</INS_NAME>");
        s.append("<INS_IDENT_TYPE>" + ins_ident_type + "</INS_IDENT_TYPE>");
        s.append("<INS_IDENT_NO>" + ins_ident_no + "</INS_IDENT_NO>");
        s.append("<RISKCODE>" + riskcode + "</RISKCODE>");
        s.append("<SYSTEM>" + system + "</SYSTEM>");
        s.append("</META_DATA>");
        s.append("</META_DATAS>");
        s.append("</ROOT>");
        //System.out.println("影像拼接的数据：" + s.toString());
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/plain");// ContentType = "text/plain";
        response.getWriter().print(s.toString());
        return null;
    }

    /**
     * 根据客户id查看客户信息
     * 
     * @param policyId
     * @throws IOException
     */
    @RequestMapping(value = "chakangetyingxiang.action")
    public String chakanyingxiang(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //String userId = SpringSecurityUtils.getCurrentUserId();
        String username = SpringSecurityUtils.getCurrentUserName();
        String policyId = request.getParameter("policyId");
        Policy policy = policyService.get(policyId);
        String policy_no = policy.getPolicyNo();
        Customer customer1 = customerService.get(policy.getAssuredCode());// 被保险人
        //Customer customer2 = customerService.get(policy.getPolicyHolder());// 保险人

        //String endor_type = "2";// （1-表示批单,2-表示保单）
        // String pro_name = customer2.getCustomerName();// 投保人姓名
        //        String pro_ident_type = "";// 投保人证件类型
        //        if ("1".equals(customer2.getCustomerType())) {
        //            pro_ident_type = "身份证";
        //        } else {
        //            pro_ident_type = "组织机构";
        //        }
        //String pro_ident_no = customer2.getDocumentCode();// 投保人证件号码

        //String ins_name = customer1.getCustomerName();// 被保险人姓名
        //        String ins_ident_type = null;// 被保险人证件类型
        //        if ("1".equals(customer1.getCustomerType())) {
        //            ins_ident_type = "身份证";
        //        } else {
        //            ins_ident_type = "组织机构";
        //        }

        // String ins_ident_no=customer1.getDocumentCode();//被保险人证件号码
        //String riskcode = policy.getInsuranceName();// 险种
        //System.out.println("险种为======" + riskcode);
        // String system="信用风险管理系统";//来源系统

        if ("1".equals(customer1.getCustomerType())) {
            // 个人
            customer1.getDocumentCode();// 身份证号码
        }

        StringBuffer s = new StringBuffer();
        s.append(YXCK_URL + ";;");
        s.append("<ROOT>");
        s.append("<BASE_DATA>");
        s.append("<ORG_NUM>00000000</ORG_NUM>");
        s.append("<COM_CODE>00000000</COM_CODE>");
        s.append("<OP_ID>" + username + "</OP_ID>");
        s.append("<OP_USER>" + username + "</OP_USER>");
        s.append("<DEL_RIGHT>0</DEL_RIGHT>");
        s.append("</BASE_DATA>");

        s.append("<META_DATAS>");
        s.append("<META_DATA>");
        //qiushi 改
        //s.append("<APP_CODE>E_POLICY</APP_CODE>");
        s.append("<APP_CODE>NOCAR_PRPALL</APP_CODE>");
        s.append("<POLICY_NO>" + policy_no + "</POLICY_NO>");
        s.append("<PRO_NO>" + policy_no + "</PRO_NO>");
        //s.append("<BUSI_NO>" + policy_no + "</BUSI_NO>");
        //qiushi 改 结束
        s.append("</META_DATA>");
        s.append("</META_DATAS>");

        s.append("</ROOT>");

        response.setCharacterEncoding("UTF-8");

        response.setContentType("text/plain");// ContentType = "text/plain";
        response.getWriter().print(s.toString());

        return null;
    }

    /**
     * 根据保单号 影像查看
     * 
     * @param policyId
     * @throws IOException
     */
    @RequestMapping(value = "chakangetyingxiang_personLoan.action")
    public String chakanyingxiangPersonLoan(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = SpringSecurityUtils.getCurrentUserName();
        String policyId = request.getParameter("policyId");
        Policy policy = policyService.get(policyId);
        String policy_no = policy.getPolicyNo();
        StringBuffer s = new StringBuffer();
        s.append(YXCK_URL + ";;");
        s.append("<ROOT>");
        s.append("<BASE_DATA>");
        s.append("<ORG_NUM>00000000</ORG_NUM>");
        s.append("<COM_CODE>00000000</COM_CODE>");
        s.append("<OP_ID>" + username + "</OP_ID>");
        s.append("<OP_USER>" + username + "</OP_USER>");
        s.append("<DEL_RIGHT>0</DEL_RIGHT>");
        s.append("</BASE_DATA>");
        s.append("<META_DATAS>");
        s.append("<META_DATA>");
        s.append("<APP_CODE>NOCAR_PRPALL</APP_CODE>");
        s.append("<POLICY_NO>" + policy_no + "</POLICY_NO>");
        s.append("<PRO_NO>" + policy_no + "</PRO_NO>");
        s.append("</META_DATA>");
        s.append("</META_DATAS>");
        s.append("</ROOT>");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/plain");
        response.getWriter().print(s.toString());
        return null;
    }

    /**
     * 个贷 根据客户id 影像扫描
     * 
     * @param policyId
     * @throws IOException
     */
    @RequestMapping(value = "getyingxiang_personLoan.action")
    public String getyingxiangPersonLoan(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //String userId = SpringSecurityUtils.getCurrentUserId();
        String username = SpringSecurityUtils.getCurrentUserName();
        String policyId = request.getParameter("policyId");
        Policy policy = policyService.get(policyId);
        String policy_no = policy.getPolicyNo();
        Customer customer1 = customerService.get(policy.getAssuredCode());// 被保险人
        Customer customer2 = customerService.get(policy.getPolicyHolder());// 保险人

        String endor_type = "2";// （1-表示批单,2-表示保单）
        String pro_name = customer2.getCustomerName();// 投保人姓名

        String pro_ident_type = "身份证";// 投保人证件类型
        String pro_ident_no = customer2.getDocumentCode();// 投保人证件号码

        String ins_name = customer1.getCustomerName();// 被保险人姓名
        if (ins_name.length() > 5) {
            ins_name = ins_name.substring(0, 5) + "...";
        }
        String ins_ident_type = "";// 被保险人证件类型
        if ("1".equals(customer1.getCustomerType())) {
            ins_ident_type = "身份证";
        } else {
            ins_ident_type = "组织机构";
        }

        String ins_ident_no = customer1.getDocumentCode();// 被保险人证件号码
        String riskcode = policy.getInsuranceName();// 险种
        String system = "信用风险管理系统";// 来源系统

        // String policy.getInsuranceType();//险种
        StringBuffer s = new StringBuffer();
        s.append(YXSC_URL + ";;");
        s.append("<ROOT>");
        s.append("<BASE_DATA>");
        s.append("<ORG_NUM>00000000</ORG_NUM>");
        s.append("<COM_CODE>00000000</COM_CODE>");
        s.append("<OP_ID>" + username + "</OP_ID>");
        s.append("<OP_USER>" + username + "</OP_USER>");
        s.append("<DEL_RIGHT>0</DEL_RIGHT>");
        s.append("</BASE_DATA>");

        s.append("<META_DATAS>");

        s.append("<META_DATA>");
        s.append("<APP_CODE>NOCAR_PRPALL</APP_CODE>");
        s.append("<CLASSIFY_LIMIT>0</CLASSIFY_LIMIT>");
        s.append("<CHECK_TYPE>0</CHECK_TYPE>");
        // 以下是索引信息
        /*
         * 批单号 ENDOR_NO 保单号 POLICY_NO 类型 ENDOR_TYPE （1-表示批单,2-表示保单） 投保人姓名
         * PRO_NAME 投保人证件类型 PRO_IDENT_TYPE 投保人证件号码 PRO_IDENT_NO 被保险人姓名 INS_NAME
         * 被保险人证件类型 INS_IDENT_TYPE 被保险人证件号码 INS_IDENT_NO 险类 CLASSCODE 险种
         * RISKCODE 来源系统 SYSTEM
         */
        // policy_no=policy_no.substring(1,policy_no.length());
        s.append("<POLICY_NO>" + policy_no + "</POLICY_NO>");
        //qiushi 改 开始
        s.append("<PRO_NO>" + policy_no + "</PRO_NO>");
        //s.append("<BUSI_NO>" + policy_no + "</BUSI_NO>");
        //qiushi 改 结束
        s.append("<ENDOR_TYPE>" + endor_type + "</ENDOR_TYPE>");
        s.append("<PRO_NAME>" + pro_name + "</PRO_NAME>");
        s.append("<PRO_IDENT_TYPE>" + pro_ident_type + "</PRO_IDENT_TYPE>");
        s.append("<PRO_IDENT_NO>" + pro_ident_no + "</PRO_IDENT_NO>");
        s.append("<INS_NAME>" + ins_name + "</INS_NAME>");
        s.append("<INS_IDENT_TYPE>" + ins_ident_type + "</INS_IDENT_TYPE>");
        s.append("<INS_IDENT_NO>" + ins_ident_no + "</INS_IDENT_NO>");
        s.append("<RISKCODE>" + riskcode + "</RISKCODE>");
        s.append("<SYSTEM>" + system + "</SYSTEM>");
        s.append("</META_DATA>");
        s.append("</META_DATAS>");
        s.append("</ROOT>");
        //System.out.println("影像拼接的数据：" + s.toString());
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/plain");// ContentType = "text/plain";
        response.getWriter().print(s.toString());
        return null;
    }

    class CustomerResult {
        private Customer customer;
        private CustomerPerson customerPerson;
        private CustomerCompany customerCompany;

        public CustomerResult() {
        }

        public CustomerPerson getCustomerPerson() {
            return customerPerson;
        }

        public void setCustomerPerson(CustomerPerson customerPerson) {
            this.customerPerson = customerPerson;
        }

        public Customer getCustomer() {
            return customer;
        }

        public void setCustomer(Customer customer) {
            this.customer = customer;
        }

        public CustomerCompany getCustomerCompany() {
            return customerCompany;
        }

        public void setCustomerCompany(CustomerCompany customerCompany) {
            this.customerCompany = customerCompany;
        }
    }

    /**
     * 根据客户类型和证件号码的唯一性校验
     * 
     * @param customer
     * @return
     */

    @RequestMapping(value = "customerGet.action")
    public @ResponseBody CustomerResult getCustomerEntityByDocumentCodeAndType(String documentCode, String customerType) {
        Customer customer = new Customer();
        customer.setCustomerType(customerType);
        customer.setDocumentCode(documentCode);
        Customer customerResult = customerService.getCustomerByDocumentCodeAndType(customer);
        if (customerResult == null) {
            return null;
        } else {
            CustomerPerson customerPerson = customerPersonService.getCustomerPersonByCustomerId(customerResult.getId());
            CustomerCompany customerCompany = customerCompanyService.getCustomerCompanyByCustomerId(customerResult.getId());
            CustomerResult cpr = new CustomerResult();
            cpr.setCustomer(customerResult);
            cpr.setCustomerPerson(customerPerson);
            cpr.setCustomerCompany(customerCompany);
            return cpr;
        }
    }

    /**
     * 根据客户id查看客户信息
     * 
     * @param policyId
     * @throws IOException
     */
    @RequestMapping(value = "getmyenum.action")
    public String getmyenum(HttpServletRequest request, HttpServletResponse response) throws IOException {
        StringBuffer jsonStr = new StringBuffer();
        Map<String, String> map = customerService.getEnum("assuredType", "3");
        jsonStr.append("[");
        for (Map.Entry<String, String> entry : map.entrySet()) {
            jsonStr.append("{key:'" + entry.getKey() + "',value:'" + entry.getValue() + "'}");
            jsonStr.append(",");
        }
        String finaljson = jsonStr.toString().substring(0, jsonStr.toString().length() - 1);
        finaljson = finaljson + "]";
        response.setCharacterEncoding("UTF-8");
        response.getWriter().print(finaljson);
        return null;
    }

}
