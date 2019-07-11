import ajax from './ajax'

const BASE_URL = '/api'

// 1、登录
export const reqLogin = ({user_id, password,user_type}) => ajax(BASE_URL+'/user/login', {user_id, password,user_type}, 'POST')

// 2、注册
export const reqSignup = ({user_id, password, password_repeat,name,id_card,phone,address,department_id,third_party_id}) => ajax(BASE_URL+'/user/signup', {user_id, password, password_repeat,name,id_card,phone,address,department_id,third_party_id}, 'POST')

// 3、查询征信资料
export  const reqGetCreditInfo = () => ajax(BASE_URL+'/credit/get_credit_info')

// 4、更新征信资料
export const reqUpdateCreditInfo =({income,family_income,assets,family_number,debt})=>ajax(BASE_URL+'/credit/update_credit_info',{income,family_income,assets,family_number,debt},'POST')

// 5、得到用户资料
export const reqGetUserMessage = () => ajax(BASE_URL+'/user/user_message')

// 6、更新用户资料
export const reqUpdateUserMessage =({phone,address})=>ajax(BASE_URL+'/user/update_user',{phone,address},'POST')

// 7、修改密码
export const reqUpdateUserPassword =({old_password,password,password_repeat})=>ajax(BASE_URL+'/user/update_password',{old_password,password,password_repeat},'POST')

// 8、设置支付密码
export const reqSetThirdPassword =({payment_password})=>ajax(BASE_URL+'/third_party/set_password',{payment_password},'PUT')

// 9、修改支付密码
export const reqModifyThirdPassword =({old_password, new_password})=>ajax(BASE_URL+'/third_party/modify_password',{old_password, new_password}, 'PUT')

// 10、检验支付密码是否已设置
export const reqVerifyThirdPassword =()=>ajax(BASE_URL+'/third_party/verify_password_set')

// 11、查询余额
export const reqFindBalance =()=>ajax(BASE_URL+'/third_party/find_balance')

// 12、用户银行卡充值
export const reqRecharge =({payment_password, amount})=>ajax(BASE_URL+'third_party/recharge', {payment_password, amount}, 'PUT')

// 13、绑定银行卡
export const reqAddBankAccount =({card_id, payment_password})=>ajax(BASE_URL+'/third_party/add_bank_account', {card_id, payment_password}, 'POST')

// 14、提现到所绑定银行卡
export const reqWithdraw =({payment_password, amount})=>ajax(BASE_URL+'/third_party/withdraw', {payment_password, amount}, 'PUT')

// 15、查询已绑定银行卡
export const reqFindCard =()=>ajax(BASE_URL+'/third_party/find_card')

// 16、解绑银行卡
export const reqUntieBankCard =({payment_password})=>ajax(BASE_URL+'/third_party/untie_bank_card',{payment_password},'DELETE')

// 17、借款套餐月数利率
export const reqLoanConfig = () => ajax(BASE_URL+'/loan_application/new/config')

// 18、新建贷款
export const reqNewLoan = ({title,amount, interest_rate,loan_month,purchase_deadline}) => ajax(BASE_URL+'/loan_application/new',{title,amount, interest_rate,loan_month,purchase_deadline},'POST')

// 19、上架商品列表
export const reqLoanApplicationList =({page_num})=>ajax(BASE_URL+'/loan_application/onsale',{page_num})

// 20、投资人认购
export const reqPurchase = ({application_id,payment_password})=>ajax(BASE_URL+'/purchase/subscribe',{application_id,payment_password},'POST')

// 21、邮箱
// 21-1、获取所有邮件
export const reqTotalLetters = ({page_num, page_size}) => ajax(BASE_URL + 'notice/get', {page_num, page_size})
// 21-2、获取未读邮件
export const reqNeverReadLetters = ({page_num, page_size, status}) => ajax(BASE_URL + 'notice/get', {page_num, page_size, status})
// 21-3、获取已读邮件
export const reqBeenReadLetters = ({page_num, page_size, status}) => ajax(BASE_URL + 'notice/get', {page_num, page_size, status})
// 21-4、删除邮件
export const reqDeleteLetters = (notice_id) => ajax(BASE_URL + 'notice/delete', {notice_id})
// 21-5、更改为已读邮件
export const reqUpdateLetterStatus = (notice_id) => ajax(BASE_URL + 'notice/update', {notice_id})


// 22借款记录
// 22-1、获取所有借款记录
export const reqGetTotalLoanRequests = ({page_num}) => ajax(BASE_URL + '/loan_application/user_applications/all', {page_num})
// 22-2、获取未审核借款
export const reqGetNeverReadLoanRequests = ({page_num}) => ajax(BASE_URL + '/loan_application/user_applications/reviewing', {page_num})
// 22-3、获取已通过借款
export const reqGetPassLoanRequests = ({page_num}) => ajax(BASE_URL + '/loan_application/user_applications/review_passed', {page_num})
// 22-4、获取未通过借款
export const reqGetRejectLoanRequests = ({page_num}) => ajax(BASE_URL + '/loan_application/user_applications/review_rejected', {page_num})
// 22-5、获取合约中借款
export const reqGetContractLoanRequests = ({page_num}) => ajax(BASE_URL + '/loan_application/user_applications/subscribed', {page_num})
// 22-6、获取已完成借款
export const reqGetCompleteLoanRequests = ({page_num}) => ajax(BASE_URL + '/loan_application/user_applications/accomplished', {page_num})
// 22-7、获取已弃用借款
export const reqGetExpiredLoanRequests = ({page_num}) => ajax(BASE_URL + '/loan_application/user_applications/expired', {page_num})
// 22-8、借款人获取还款计划
export const reqGetRepayPlan = ({application_id}) => ajax(BASE_URL + "/purchase/detail", {application_id} )
// 22-9、取消借款申请
export const reqCancelLoanRequest = ({application_id}) => ajax(BASE_URL + "/loan_application/cancel", {application_id})


// 23投资记录
// 23-1、获取所有投资
export const reqGetTotalInvestmentRecords = ({page_num}) => ajax(BASE_URL + '/purchase/user_purchases/invest/all', {page_num})
// 23-2、获取合约中的投资
export const reqGetContractInvestmentRecords = ({page_num}) => ajax(BASE_URL + '/purchase/user_purchases/invest/subscribed', {page_num})
// 23-3、获取结束的投资
export const reqGetCompleteInvestmentRecords = ({page_num}) => ajax(BASE_URL + '/purchase/user_purchases/invest/finished', {page_num})
// 23-4、根据投资id获取产品详情
export const reqGetInvesmentDetails = (application_id) => ajax(BASE_URL+'/loan_application/detail/'+application_id.toString())
// 23-5、投资人获取回收计划
export const reqGetInvestPlan = (purchaseId) => ajax(BASE_URL + "/repay_plan/" + purchaseId.toString())

// 24担保记录
// 24-1、获取所有担保记录
export const reqGetTotalGuaranteeRequests = ({page_num}) => ajax(BASE_URL + '/guarantor/guarantee/all', {page_num})
// 24-2、获取未审核的担保记录
export const reqGetWaitGuaranteeRequests = ({page_num}) => ajax(BASE_URL + '/guarantor/guarantee/unreviewed', {page_num})
// 24-3、获取已通过的担保记录
export const reqGetPassGuaranteeRequests = ({page_num}) => ajax(BASE_URL + '/guarantor/guarantee/review_passed', {page_num})
// 24-4、获取已拒绝的担保记录
export const reqGetRejectGuaranteeRequests = ({page_num}) => ajax(BASE_URL + '/guarantor/guarantee/review_rejected', {page_num})
// 24-5、同意担保
export const reqAcceptGuaranteeRequests = (application_id) => ajax(BASE_URL + '/guarantor/guarantee/pass', {application_id})
// 24-6、拒绝担保
export const reqRejectGuaranteeRequests = (application_id) => ajax(BASE_URL + '/guarantor/guarantee/reject', {application_id})
// 24-7、获取被担保人信息
export const reqGetGuaranteeUserInfo = (user_id) => ajax(BASE_URL + '/guarantor/guarantee/userInfo', {user_id})
// 24-8、获取被担保人借款记录
export const reqGetGuaranteeUserHistory = ({user_id, page_num, page_size}) => ajax(BASE_URL + '/guarantor/guarantee/user_history', {user_id, page_num, page_size})
// 24-9、获取逾期记录
export const reqGetTotalOverdue = (current_page) => ajax(BASE_URL + "/guarantor/overdue", {current_page})

// 25、退出登录
export const reqLogout = () => ajax(BASE_URL+'/user/logout')
