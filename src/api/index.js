import ajax from './ajax'

const BASE_URL = '/sell'

// 1、登录
export const reqLogin = ({username, password}) => ajax(BASE_URL+'/user/login', {username, password}, 'POST')

// 2、注册
export const reqSignup = ({username, password, repeatPassword}) => ajax(BASE_URL+'/user/register', {username, password, repeatPassword}, 'POST')

// 3、获取所有书籍
export const reqGetAllBook = ({page}) => ajax(BASE_URL+'/book/list',  {page})

//4: 获得特定类别书籍
export const reqGetTypeBook = ({categoryId,page}) =>ajax(BASE_URL+'/book/list',{categoryId,page})

//5: 获得书籍所有类别
export const reqGetAllType = ()=>ajax(BASE_URL+'/book/category')

//6: 同步购物车
export const reqSyncCart = ({cart})=>ajax(BASE_URL+'/user/cart/sync',{cart},'POST')

//7: 初始化购物车
export const reqInitCart =()=>ajax(BASE_URL+'/user/cart/list')

//8: 新增收货地址
export const reqShippingAdd=({receiverName,receiverPhone,receiverAddress})=>ajax(BASE_URL+'/user/shipping/add',{receiverName,receiverPhone,receiverAddress},'POST')

//9: 删除收货地址
export const reqShippingDelete=({shippingId})=>ajax(BASE_URL+'/user/shipping/delete',{shippingId})

//10: 收货地址列表
export const reqShippingList=()=>ajax(BASE_URL+'/user/shipping/list')

// 11、创建订单(plus)
export const reqCreateOrder = ({shippingId}) => ajax(BASE_URL+'/user/order/create', {shippingId}, 'POST')

// 12、获得订单列表(plus)
export const reqGetOrderList = ({page}) => ajax(BASE_URL+'/user/order/list',{page})

// 13: 获得订单详情
export const reqGetOrderDetail = ({orderId}) => ajax(BASE_URL+'/user/order/detail',{orderId})

// 14: 取消订单
export const reqCancelOrder = ({orderId}) => ajax(BASE_URL+'/user/order/cancel',{orderId}, 'POST')

// 15: 支付订单
export const reqPayOrder= ({orderId}) => ajax(BASE_URL+'/user/order/pay',{orderId}, 'POST')

// 16、搜索书籍(plus)
export const reqSearchBook = ({bookName,page}) => ajax(BASE_URL+'/book/search', {bookName,page})

// 17、获得书籍详情(plus)
export const reqGetBookDetail = ({bookId}) => ajax(BASE_URL+'/book/detail', {bookId})

// 18、判断用户最近是否登录
export const reqInitLogin = () => ajax(BASE_URL+'/user/init')

// 19、用户登出(plus)
export const reqLogout = () => ajax(BASE_URL+'/user/logout')
