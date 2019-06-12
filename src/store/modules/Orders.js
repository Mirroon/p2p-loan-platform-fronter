import {reqGetOrderList,reqGetOrderDetail} from "../../api";

const state = {
    orders: [],
    orderDetail:[]
}

const mutations = {
    updateOrder(state, orders) {
        state.orders = orders
    },
    updateOrderDetail(state,detail)
    {
        state.orderDetail=detail
    }
}

const actions = {
    getOrderList({commit},page)
    {
        reqGetOrderList({
            page:page
        }).then((result)=>{
            let records=[]
            for (let i=0;i<result.data.records.length;i++)
            {
                let unixTimestamp = new Date(result.data.records[i].createTime* 1000)
                let commonTime = unixTimestamp.toLocaleString()
                let status=''
                switch (result.data.records[i].orderStatus) {
                    case 0: status='未支付';break;
                    case 1: status='已完成';break;
                    case 2: status='已取消';break;
                    default: status='异常';
                }
                records.push({
                    orderId:result.data.records[i].id,
                    receiverName:result.data.records[i].receiverName,
                    receiverPhone:result.data.records[i].receiverPhone,
                    receiverAddress:result.data.records[i].receiverAddress,
                    orderStatus: status,
                    statusNum:result.data.records[i].orderStatus,
                    creatTime:commonTime
                })
            }
            commit('updateOrder',records)
        })
    },
    getOrderDetail({commit},orderId)
    {
        reqGetOrderDetail({
            orderId:orderId
        }).then((result)=>{
            let detail=[]
            for(let i=0;i<result.data.orderDetailList.length;i++)
            {
                detail.push({
                    name:result.data.orderDetailList[i].bookName,
                    author:result.data.orderDetailList[i].bookAuthor,
                    price:result.data.orderDetailList[i].bookPrice,
                    count:result.data.orderDetailList[i].bookQuantity,
                    cover:result.data.orderDetailList[i].bookIcon,
                    total:result.data.orderDetailList[i].bookPrice*result.data.orderDetailList[i].bookQuantity
                })
            }
            commit('updateOrderDetail',detail)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
