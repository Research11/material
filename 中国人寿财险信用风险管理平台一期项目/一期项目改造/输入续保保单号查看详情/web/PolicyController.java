package org.ibas.credit.accept.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.task.Task;
import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.hibernate.criterion.Order;
import org.ibas.credit.Constants;
import org.ibas.credit.accept.entity.Policy;
import org.ibas.credit.accept.entity.PolicyDetailInfo;
import org.ibas.credit.accept.entity.PolicyForm;
import org.ibas.credit.accept.entity.Verifyinfo;
import org.ibas.credit.accept.service.PolicyService;
import org.ibas.credit.accept.service.VerifyinfoService;
import org.ibas.credit.constant.EnumUtil;
import org.ibas.credit.constant.RiskType;
import org.ibas.credit.personloan.store.entity.ProfessionInfo;
import org.ibas.credit.personloan.store.service.ProfessionInfoService;
import org.ibas.credit.util.CalcUtil;
import org.ibas.framework.core.base.orm.Page;
import org.ibas.framework.core.base.security.springsecurity.SpringSecurityUtils;
import org.ibas.framework.core.sys.entity.TEntityReferTab;
import org.ibas.framework.core.sys.service.TEntityReferTabService;
import org.ibas.framework.core.web.EntityController;
import org.ibas.process.dao.hibernate.impl.TaskProxyDAOImpl;
import org.ibas.process.service.impl.ProcessServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Policy Dao.
 * 
 * 实现领域对象保单业务表的页面后台处理.
 * 
 * @author IBAS
 */
@Controller
public class PolicyController extends EntityController<Policy> {
    private static final String PATH = "/jsp/ext3/credit/accept/";
    
    /**							
     * author:wangshihai 业务模块：资信调查 内容
     */
    private static final String SURVEY_PATH = "/jsp/ext3/credit/accptancesurvey/";
    @Autowired
    private PolicyService policyService;
    @Autowired
    private ProfessionInfoService professionInfoService;
    @Autowired
    private VerifyinfoService verifyinfoService;
    @Autowired
    private TaskProxyDAOImpl taskProxyDAOImpl;
    @Autowired
    private ProcessServiceImpl processServiceImpl;
    @Autowired
    private ProcessEngine processEngine;
    @Autowired
    private TEntityReferTabService tEntityReferTabService;

    @RequestMapping(value = "policy_list_view.action")
    public String policyListView() {
        return PATH + "policy";
    }

    @RequestMapping(value = "statistical_list_view.action")
    public String statisticalListView(){    	
    	return PATH +"statistical";
    }
    
    /**			  statistical	
     * 业务模块：资信调查
     * 内容：菜单跳转路径
     * 
     * @return string
     */
    @RequestMapping(value = "policySurvey_list_view.action")
    public String policySurveyListView(@RequestParam("id") String id, String isFgshbg, ModelMap model) {
    	String userId = SpringSecurityUtils.getCurrentUserId();
        //只有资信调查可以编辑该页面
        List<String> roleNameList = taskProxyDAOImpl.getroleNamebyUserId(userId);
        if (roleNameList != null && roleNameList.size() > 0) {
            for (int i = 0; i < roleNameList.size(); i++) {
                String roleName = roleNameList.get(i);
                if (Constants.PROCESS_ROLE_F_CJHBG.equals(roleName) || Constants.PROCESS_ROLE_F_GJHBG.equals(roleName) || Constants.PROCESS_ROLE_Z_CJHBG.equals(roleName)
                        || Constants.PROCESS_ROLE_Z_GJHBG.equals(roleName)) {
                    isFgshbg = "1";
                    break;
                }
            }
        }
        model.addAttribute("id", id);
        /**
         * 一人多个角色，根据当前任务节点角色判断角色,如果是资信调查岗，侧页面是资信调查岗角色
         * 核保岗标示 1 是 null 不是
         */
        String currentRoleCode = null;
        if (StringUtils.isNotBlank(id)) {
            Policy policy = policyService.get(id);
            Task mytask = processEngine.getTaskService().createTaskQuery().processInstanceId(policy.getProcessId()).singleResult();
            String mytaskID = mytask.getId();
            //获取节点角色
            Map<String, String> map2 = processServiceImpl.getFlowLogo(mytaskID);
            currentRoleCode = map2.get(Constants.ROLE_LOCATION_CURRENT);//本节点角色
        }
        if (StringUtils.isNotBlank(isFgshbg)) {
            if (StringUtils.isNotBlank(currentRoleCode) && Constants.PROCESS_ROLE_ZXDC.equals(currentRoleCode)) {
                isFgshbg = "0";
            }
            model.addAttribute("isFgshbg", isFgshbg);
        } else {
            model.addAttribute("isFgshbg", 0);
        }
        return SURVEY_PATH + "policySurvey";
    }

    
    /**
     * 业务模块：资信调查
     * 内容：菜单跳转路径
     * 
     * @return string
     */
    @RequestMapping(value = "person_loan_primary.action")
    public @ResponseBody Map<String, ? extends Object> personLoanPrimary(@RequestParam("id") String id, ModelMap model) {
        Map<String, Object> map = new HashMap<String, Object>();
        String isFgshbg = "0";
        Policy policy = policyService.get(id);
        String currentRoleCode = null;
        if (StringUtils.isNotBlank(id)) {
            Task mytask = processEngine.getTaskService().createTaskQuery().processInstanceId(policy.getProcessId()).singleResult();
            String mytaskID = mytask.getId();
            //获取节点角色
            Map<String, String> map2 = processServiceImpl.getFlowLogo(mytaskID);
            currentRoleCode = map2.get(Constants.ROLE_LOCATION_CURRENT);//本节点角色
            if (Constants.PROCESS_ROLE_GYWCS.equals(currentRoleCode)) {
                isFgshbg = "1";
            }
        }
        policy.setIsFgshbg(isFgshbg);
        map.put("data", policy);
        map.put("success", true);
        return map;
    }

    @RequestMapping(value = "policy_Survey.action")
    public @ResponseBody String surveyPolisy(@RequestParam("id") String id, ModelMap model) {
        if (StringUtils.isBlank(id)) {
            model.addAttribute("pdi", null);
            model.addAttribute("verifyinfo", null);
            return SURVEY_PATH + "policySurvey";
        }
        PolicyDetailInfo pdi = policyService.getPolicyDetailInfoById(id);
        String userId = SpringSecurityUtils.getCurrentUserId();
        Verifyinfo verifyinfo = verifyinfoService.getverifyinfoByPolicyIdAndUserId(id, userId);
        ObjectMapper objectMapper = new ObjectMapper();
        String pdiJson = null;
        String verifyinfoJson = null;
        try {
            pdiJson = objectMapper.writeValueAsString(pdi);
            verifyinfoJson = objectMapper.writeValueAsString(verifyinfo);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("pdi", pdiJson);
        model.addAttribute("verifyinfo", verifyinfoJson);
        return SURVEY_PATH + "policySurvey";
    }

    /**
     * 
     * 内容：险种下拉框数据源
     */
    @RequestMapping(value = "get_constant_risk.action")
    public @ResponseBody Map<String, Object> getRiskType() throws ClassNotFoundException {
        return EnumUtil.outEnum(RiskType.class.getName());
    }

    /**
     * 保单业务表 关联明细列表
     */
    @RequestMapping(value = "policy_detail_tabs.action")
    public @ResponseBody Map<String, ? extends Object> policyDetailTabs(@RequestParam String ID) throws Exception {
        try {
            List<TEntityReferTab> list = tEntityReferTabService.getEntityReferTabDaoByEntityId(ID);
            TEntityReferTab tab = new TEntityReferTab();
            tab.setActive(1);
            tab.setEntityId(ID);
            tab.setName("detail");
            tab.setTitle("保单业务表明细信息");
            tab.setUrl("policy_view.action");
            list.add(0, tab);
            return getTabMap(list);
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError(SELECT_ERROR);
        }
    }

    /**
     * 保单业务表 列表
     */
    @RequestMapping(value = "policy_list.action")
    public @ResponseBody Map<String, ? extends Object> policyList(@RequestParam String adSearch, Integer start, Integer limit, Policy data) throws Exception {
        System.out.println(data.getSalePersonName());
    	if (limit == null || 0 == limit) {
            limit = 20;
        }
        //附加险标识  非附加险
        data.setAddedSign("1");
        //权限
        String userId = SpringSecurityUtils.getCurrentUserId();
        
        System.out.println("当前登录用户id:"+userId);
        
        data.setSalePerson(userId);//8a8291924d2cf639014d2d13c0ee0323
        Page<Policy> page = new Page<Policy>(limit);
        if (start != null)
            page.setPageNo((start) / limit + 1);
        Page<Policy> policys = null;
        try {
        	
            if (null != adSearch && StringUtils.isNotEmpty(adSearch)) {
                if (adSearch.equals("columnSearch")) {
                    policys = policyService.searchData(page, data);
                } else if (adSearch.equals("quickSearch")) {
                    policys = policyService.searchOrderQs(page, data, Order.desc("createdDate"));
                } else if (adSearch.equals("groupSearch")) {
                    policys = policyService.searchData(page, data);
                } else {
                    policys = policyService.searchOrderQs(page, data, Order.desc("createdDate"));
                }
            } else {
                policys = policyService.searchOrderQs(page, data, Order.desc("createdDate"));
            }
        	
            return getMap(policys);
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError(SELECT_ERROR);
        }
    }

    /*
     * 统计查询列表
     * 
     * 
    */
    
    @RequestMapping(value ="statistical_list.action")
    public @ResponseBody Map<String, ? extends Object> statisticalList(@RequestParam String adSearch, Integer start, Integer limit, Policy data) throws Exception {
        System.out.println(data.getSalePersonName());
    	if (limit == null || 0 == limit) {
            limit = 20;
        }
        //附加险标识  非附加险
        data.setAddedSign("1");
        //权限
        @SuppressWarnings("unused")
		String userId = SpringSecurityUtils.getCurrentUserId();
        data.setSalePerson("8a8291924d2cf639014d2d13c0ee0323");
        Page<Policy> page = new Page<Policy>(limit);
        if (start != null)
            page.setPageNo((start) / limit + 1);
        Page<Policy> policys = null;
        try {
            /*if (null != adSearch && StringUtils.isNotEmpty(adSearch)) {
                if (adSearch.equals("columnSearch")) {
                    policys = policyService.searchData(page, data);
                } else if (adSearch.equals("quickSearch")) {
                    policys = policyService.searchOrderQs(page, data, Order.desc("createdDate"));
                } else if (adSearch.equals("groupSearch")) {
                    policys = policyService.searchData(page, data);
                } else {
                    policys = policyService.searchOrderQs(page, data, Order.desc("createdDate"));
                }
            } else {
                policys = policyService.searchOrderQs(page, data, Order.desc("createdDate"));
            }*/
        	
        	policys = policyService.searchOrderQs(page, data, Order.desc("createdDate"));
        	
            return getMap(policys);
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError(SELECT_ERROR);
        }
    }
    
    
    /**
     * 调查保单业务表 列表
     */
    @RequestMapping(value = "policy_survey_list.action")
    public @ResponseBody Map<String, ? extends Object> policy_survey_List(@RequestParam String adSearch, Integer start,Integer limit, String id, String isFgshbg, Policy data) throws Exception {
    		
    	if (limit == null || 0 == limit) {
            limit = 20;
        }
        //附加险标识
        data.setAddedSign("1");
        // 流程直接跳转定位到当前数据
        if (StringUtils.isNotBlank(id)) {
            data.setId(id);
        }
        //权限
        String userId = SpringSecurityUtils.getCurrentUserId();
        Page<Policy> page = new Page<Policy>(limit);
        if (start != null)
            page.setPageNo((start) / limit + 1);
        Page<Policy> policys = null;
        try {
            //        	分公司核保岗
            if ("1".equals(isFgshbg)) {
                policys = new Page<Policy>();
                Policy policy = null;
                List<Policy> policyArr = new ArrayList<Policy>();
                if (StringUtils.isNotBlank(id)) {
                    policy = policyService.get(id);
                    policyArr.add(policy);
                }
                policys.setAutoCount(true);
                policys.setPageNo(1);
                policys.setPageSize(1);
                policys.setTotalCount(1L);
                policys.setResult(policyArr);
            } else {
                policys = policyService.getPolicyByUserId(userId, data, page);
            }
            return getMap(policys);
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError(SELECT_ERROR);
        }
    }
    
    //根据续保保单号查询
    @RequestMapping(value = "renewal_survey_list.action")
    public @ResponseBody Map<String, ? extends Object> renewal_survey_List(@RequestParam String adSearch, Integer start,Integer limit, String id,Policy data) throws Exception {
    	
    	System.out.println("续保保单号为:"+data.getRenewalCode());
    	   	
    	if (limit == null || 0 == limit) {	//adSearch='' id=''
            limit = 20;
        }
        //附加险标识
        data.setAddedSign("1");
        // 流程直接跳转定位到当前数据
        if (StringUtils.isNotBlank(id)) {
            data.setId(id);
        }
        Page<Policy> page = new Page<Policy>(limit);
        if (start != null)
            page.setPageNo((start) / limit + 1);
        Page<Policy> policys = null;
        try {
               policys = policyService.getRenewalByUserId(data, page);
            return getMap(policys);
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError(SELECT_ERROR);
        }
    }
    
    /**
     * 资信调查 列表
     * 
     */
    @RequestMapping(value = "policySurvey_list.action")
    public @ResponseBody Map<String, ? extends Object> policySurveyList(@RequestParam String adSearch, Integer start, Integer limit, Policy data) throws Exception {
        Page<Policy> policys = null;
        if (limit == null || 0 == limit) {
            limit = 20;
        }
        Page<Policy> page = new Page<Policy>(limit);
        if (start != null)
            page.setPageNo((start) / limit + 1);
        policys = policyService.getPolicySurveyList(page, data);
        if (policys != null) {
            return getMap(policys);
        }
        return null;
    }

    /**
     * 保单业务表 删除
     */
    @RequestMapping(value = "policy_delete.action")
    public @ResponseBody Map<String, ? extends Object> policyDelete(@RequestParam Object data) throws Exception {
        try {
            boolean bl = policyService.deletePolicy(data);
            Map<String, Object> map = getMap();
            if (bl) {
                map.put("myResult", "删除成功");
            } else {
                map.put("myResult", "删除失败，请检查删除数据状态或联系管理员!");
            }
            return map;
        } catch (Exception e) {
            return getModelMapError("在删除保单业务表过程中出现错误.");
        }
    }

    /**
     * 保单业务表 明细
     */
    @RequestMapping(value = "policy_detail.action")
    public @ResponseBody Map<String, ? extends Object> policyView(@RequestParam("id") String id) throws Exception {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        try {
            Policy policy = policyService.get(id);
            modelMap.put("data", policy);
            modelMap.put("success", true);
            return modelMap;
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError(SELECT_ERROR);
        }
    }

    /**
     * 保单业务表 查看页面
     */
    @RequestMapping(value = "policy_view.action")
    public String policyView(String id, String isSurvey, ModelMap model) {
        // 没接收到ID 跳转至添加页面
        if (id == null) {
            return PATH + "policy/policy_add";
        }
        // 跳转至编辑页面
        else {
            ObjectMapper objectMapper = new ObjectMapper();
            String pdiJson = null;
            try {
                PolicyDetailInfo pdi = policyService.getPolicyDetailInfoById(id);
                Policy currentPolicy = pdi.getPolicy();
                if (StringUtils.isNotBlank(isSurvey) && Constants.IS_SURVEY_TRUE.equals(isSurvey)) {
                    //更新保单状态：调查受理中
                    currentPolicy.setPolicyStatus(Constants.P_STAT_SLDC_DCSLZ);
                    currentPolicy.setIsSurvey(isSurvey);
                }
                pdi.setPolicy(policyService.save(currentPolicy));
                pdiJson = objectMapper.writeValueAsString(pdi);
            } catch (Exception e) {
                e.printStackTrace();
            }
            model.addAttribute("pdi", pdiJson);
            return PATH + "policy/policy_edit";
        }
    }

    //个人修改
    @RequestMapping(value = "policyRenewal_view.action")
    public String policRenewalyView(String id, String isSurvey, ModelMap model) {
        // 没接收到ID 跳转至添加页面
        if (id == null) {
            return PATH + "policy/policy_add";
        }
        // 跳转至编辑页面
        else {
            ObjectMapper objectMapper = new ObjectMapper();
            String pdiJson = null;
            try {
                PolicyDetailInfo pdi = policyService.getPolicyDetailInfoById(id);
                Policy currentPolicy = pdi.getPolicy();
                if (StringUtils.isNotBlank(isSurvey) && Constants.IS_SURVEY_TRUE.equals(isSurvey)) {
                    //更新保单状态：调查受理中
                    currentPolicy.setPolicyStatus(Constants.P_STAT_SLDC_DCSLZ);
                    currentPolicy.setIsSurvey(isSurvey);
                }
                pdi.setPolicy(policyService.save(currentPolicy));
                pdiJson = objectMapper.writeValueAsString(pdi);
            } catch (Exception e) {
                e.printStackTrace();
            }
            model.addAttribute("pdi", pdiJson);
            return PATH + "policy/policyRenewal_edit";
        }
    }
    
    /**
     * 保单业务表 查看页面
     */
    @RequestMapping(value = "policy_viewcb_downLoadFirefox.action")
    public String policyViewCB(String proposalNo, ModelMap model) {
        // 跳转至编辑页面
        PolicyDetailInfo pdi = null;
        Policy policy = policyService.getPolicyByPolicyNo(proposalNo);
        String id = policy.getId();
        pdi = policyService.getPolicyDetailInfoById(id);
        ObjectMapper objectMapper = new ObjectMapper();
        String pdiJson = null;
        try {
            pdiJson = objectMapper.writeValueAsString(pdi);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("pdi", pdiJson);
        //		model.addAttribute("success", "true");
        return PATH + "policy/sppolicy_edit";
    }

    /**
     * 跳转至保单新增页面
     */
    @RequestMapping(value = "policy_add.action")
    public String policyAdd() {
        return PATH + "policy/policy_add";// /jsp/ext3/credit/accept/
    }

    /**
     * 保单业务表 保存
     */
    @RequestMapping(value = "policy_save.action")
    public @ResponseBody Map<String, ? extends Object> policySave(PolicyForm policyform, String collateralPolicyrelatString, String policypolicyString, String guarantorString, String policyStatus)
            throws Exception {
        try {
            policyform.setGuarantorString(guarantorString.substring(3, guarantorString.length()));
            policyform.setCollateralPolicyrelatString(collateralPolicyrelatString.substring(3, collateralPolicyrelatString.length()));
            policyform.setPolicypolicyString(policypolicyString.substring(3, policypolicyString.length()));
            //保单新增或修改时，增加草稿状态，因前台代码无法更新状态所以传入policyStatus(0草稿,1待提交)参数用于后台更改  
            if (StringUtils.isBlank(policyStatus)) {
                policyform.getPolicy().setPolicyStatus(Constants.P_STAT_YWSL_SLDTJ);
            } else {
                if (!"1".equals(policyform.getPolicy().getIsSurvey())) {
                    policyform.getPolicy().setPolicyStatus(policyStatus);
                }
            }
            policyService.savePolicyForm(policyform);//policyform=data
            
            
            return getMap();
        } catch (Exception e) {
            return getModelMapError("在保存保单过程中出现错误.");
        }
    }

    /**
     * 
     * @param data
     * @return
     * @throws Exception
     *             保单提交
     */
    @RequestMapping(value = "policy_submit.action")
    public @ResponseBody Map<String, ? extends Object> policySubmit(PolicyForm policyform, String collateralPolicyrelatString, String policypolicyString, String guarantorString) throws Exception {
        try {
            policyform.setGuarantorString(guarantorString.substring(3, guarantorString.length()));
            policyform.setCollateralPolicyrelatString(collateralPolicyrelatString.substring(3, collateralPolicyrelatString.length()));
            policyform.setPolicypolicyString(policypolicyString.substring(3, policypolicyString.length()));
            policyService.submitPolicy(policyform);
            return getMap();
        } catch (Exception e) {
            //System.out.println(e);
            return getModelMapError("在保存保单过程中出现错误.");
        }
    }

    /**
     * 根据保单ID 提交保单
     * 
     * @param policyId
     * @return
     * @throws Exception
     * 业务提交按钮
     */
    @RequestMapping(value = "policy_SubById.action")
    public @ResponseBody Map<String, ? extends Object> policySubById(String policyId) throws Exception {
        
    	Map<String, Object> map = getMap();
        try {
            boolean bl = policyService.submitPolicy(policyId);
            if (bl) {
                map.put("myResult", "提交成功");
            } else {
                map.put("myResult", "提交失败，请检查提交保单状态或联系管理员!");
            }
            return map;
        } catch (Exception e) {
            map.put("myResult", "提交失败，请检查提交保单状态或联系管理员!");
            e.printStackTrace();
            return map;
        }
    }

    /**
     * 根据流程ID查询保单信息
     */
    @RequestMapping(value = "policy_by_processid.action")
    public @ResponseBody Map<String, ? extends Object> policyListbyprocessid(String processId) throws Exception {
        return getMap(policyService.getPolicyByProcessId(processId));
    }

    /**
     * 审批时查看保单页面(SPpolicy_view)
     */
    @RequestMapping(value = "SPpolicy_view.action")
    public String SPpolicyView(@RequestParam("id") String id, ModelMap model) {
        PolicyDetailInfo pdi = policyService.getPolicyDetailInfoById(id);
        ObjectMapper objectMapper = new ObjectMapper();
        String pdiJson = null;
        try {
            pdiJson = objectMapper.writeValueAsString(pdi);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("pdi", pdiJson);
        return PATH + "policy/sppolicy_edit";
    }

    /**
     * 根据保单ID 提交保单到个贷流程
     * 
     * @param policyId
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "policyyw_submit.action")
    public @ResponseBody Map<String, ? extends Object> policyyw_submit(String policyId) throws Exception {
        Map<String, Object> map = getMap();
        try {
            boolean bl = policyService.submitPolicyForGD(policyId);
            System.out.println("保单ID=" + policyId);
            if (bl) {
                map.put("myResult", "提交成功");
            } else {
                map.put("myResult", "提交失败，请检查提交保单状态或联系管理员!");
            }
            map.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
        }
        return map;
    }

    /**
     * 根据保单号查询保单
     * 
     * @param policyNo
     * @param model
     * @return
     */
    @RequestMapping(value = "get_policy.action")
    public @ResponseBody Map<String, ? extends Object> getVerifyinfoPolicyId(@RequestParam("policyNo") String policyNo, ModelMap model) {
        Policy policy = policyService.getPolicyByPolicyNo(policyNo);
        try {
            return getModelMap(policy);
        } catch (Exception e) {
            e.printStackTrace();
            return getModelMapError(SELECT_ERROR);
        }
    }

    /**
     * 核实收入计算方法
     * 
     * @param policy
     * @param professionInfo
     * @return
     */
    @RequestMapping(value = "calculate_income.action")
    public @ResponseBody Map<String, ? extends Object> verifyIncome(@RequestParam("policyNo") String policyNo) {
        Policy policy = policyService.getPolicyByPolicyNo(policyNo);
        ProfessionInfo professionInfo = professionInfoService.getProfessionInfoByCustomerId(policy.getPolicyHolder());
        Double verifyIncome = 0d;
        String loanType = policy.getLoanType();//贷款类型
        String propertyCertificate = policy.getPropertyCertificate();//是否有物业
        Double incomeCertificate = policy.getIncomeCertificate();//收入证明[网银，现金]
        incomeCertificate = incomeCertificate == null ? 0d : incomeCertificate;
        Double monthTotalIncome = policy.getMonthTotalIncome();//银行代发
        monthTotalIncome = monthTotalIncome == null ? 0d : monthTotalIncome;
        Double applyIncome = CalcUtil.add(professionInfo.getMonthlySalary(), professionInfo.getOtherMonthlySalary());//手动填写录入/申请表总收入
        Double phoneIncome = policy.getPhoneIncome();//电核收入
        phoneIncome = phoneIncome == null ? 0d : phoneIncome;
        Double companyAccountAVG = policy.getCompanyAccountAVG();//最近 3 个月的对公银行流水平均入帐
        companyAccountAVG = companyAccountAVG == null ? 0d : companyAccountAVG;
        Double personAccountAVG = policy.getPersonAccountAVG();//最近 3 个月的个人银行流水平均入帐
        personAccountAVG = personAccountAVG == null ? 0d : personAccountAVG;
        Double proportionEquity = professionInfo.getProportionEquity();//股权占比
        proportionEquity = proportionEquity == null ? 0d : proportionEquity;
        /**
         * 薪金贷
         */
        if (Constants.PERSON_LOAN_TYPE_SALARY.equals(loanType)) {
            if ("1".equals(propertyCertificate)) {//有物业
                if ("1".equals(incomeCertificate)) {//网银
                    verifyIncome = CalcUtil.compareNumber(incomeCertificate, monthTotalIncome, "L");
                } else {//现金
                    verifyIncome = incomeCertificate;
                }
            } else {
                if ("1".equals(incomeCertificate)) {//网银
                    if (incomeCertificate > monthTotalIncome) {
                        verifyIncome = (monthTotalIncome + (incomeCertificate - monthTotalIncome) * 0.7);
                    } else {
                        verifyIncome = incomeCertificate;
                    }
                } else {//现金
                    verifyIncome = incomeCertificate * 0.7;
                }
            }
        } else if (Constants.PERSON_LOAN_TYPE_PRIVATELY.equals(loanType)) {//私营贷
            verifyIncome = (companyAccountAVG + personAccountAVG) * 0.1 * proportionEquity * 0.01;
            if ("1".equals(propertyCertificate)) {//有物业
                verifyIncome = CalcUtil.compareNumber(applyIncome * 0.7, verifyIncome, "L");
            }
        } else {//其他
            verifyIncome = CalcUtil.compareNumber(applyIncome * 0.7, phoneIncome, null);
        }
        return getModelMap(verifyIncome);
    }
}
