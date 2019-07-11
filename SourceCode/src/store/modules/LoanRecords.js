import {
    reqGetTotalLoanRequests,
    reqGetNeverReadLoanRequests,
    reqGetPassLoanRequests,
    reqGetRejectLoanRequests,
    reqGetContractLoanRequests,
    reqGetCompleteLoanRequests,
    reqGetExpiredLoanRequests,
    reqGetRepayPlan,
    reqCancelLoanRequest
} from "../../api"

var timestamp

const state = {
    loanRequestsCache: [],
    loanRequestsCacheNum: 0,

    current_page: 1,
    page_size: 10,
    
    repay_plan: []
}


const mutations = {
    init(state){
        state.current_page = 1
        state.page_size = 10

        state.loanRequestsCache = []
        state.loanRequestsCacheNum = 0

        state.repay_plan = []
    },

    updateCurrentPage(state, current_page){
        state.current_page = current_page
    },

    
    updateLoanRequestsCache(state, data){
        state.loanRequestsCache = data
        for(var cnt = 0; cnt < state.loanRequestsCache.length; cnt++){
            timestamp = new Date(state.loanRequestsCache[cnt].create_time);
            state.loanRequestsCache[cnt].create_time = timestamp.toLocaleString('chinese',{hour12:false}).replace(/\//g, "-");
            timestamp = new Date(state.loanRequestsCache[cnt].purchase_deadline);
            state.loanRequestsCache[cnt].purchase_deadline = timestamp.toLocaleString('chinese',{hour12:false}).replace(/\//g, "-");
            state.loanRequestsCache[cnt].interest_rate = (state.loanRequestsCache[cnt].interest_rate * 100).toFixed(2)
            switch(state.loanRequestsCache[cnt].status){
                case 0:{
                    state.loanRequestsCache[cnt].status = "未审核"
                    break
                }
                case 1:{
                    state.loanRequestsCache[cnt].status = "已接受"
                    break
                }
                case 2:{
                    state.loanRequestsCache[cnt].status = "已被拒"
                    break
                }
                case 3:{
                    state.loanRequestsCache[cnt].status = "已合约"
                    break
                }
                case 4:{
                    state.loanRequestsCache[cnt].status = "已弃用"
                    break
                }
                case 5: {
                    state.loanRequestsCache[cnt].status = "已逾期"
                    break
                }
                case 6:{
                    state.loanRequestsCache[cnt].status = "已完成"
                    break
                }
            }
        }
    },
    updateLoanRequestsCacheNum(state, data){
        state.loanRequestsCacheNum = data
    },


    updateRepayPlan(state, data){
        state.repay_plan = data
        for(var cnt = 0; cnt < state.repay_plan.length; cnt++){
            timestamp = new Date(state.repay_plan[cnt].repay_date);
            state.repay_plan[cnt].repay_date = timestamp.toLocaleDateString().replace(/\//g, "-");
            switch(state.repay_plan[cnt].status){
                case 0 :{
                    state.repay_plan[cnt].status = "未还款"
                    break
                }
                case 1: {
                    state.repay_plan[cnt].status = "已还款"
                    break
                }
                case 2: {
                    state.repay_plan[cnt].status = "已逾期"
                    break
                }
                case 3: {
                    state.repay_plan[cnt].status = "担保人暂时垫付"
                    break
                }
                case 4: {
                    state.repay_plan[cnt].status = "逾期还款成功"
                    break
                }
            }
        }
    }
}


const actions = {
    getTotalLoanRequests({commit}, data){
        reqGetTotalLoanRequests(data).then((respond) => {
            if(respond.code == 0){
                commit('updateLoanRequestsCache', respond.data.list)
                commit('updateLoanRequestsCacheNum', respond.data.total)
            }
            else{
                window.console.log(respond.msg)
                this.$message.error(respond.msg)
            }
            
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },

    getNeverReadLoanRequests({commit}, data){
        reqGetNeverReadLoanRequests(data).then((respond) => {
            if(respond.code == 0){
                commit('updateLoanRequestsCache', respond.data.list)
                commit('updateLoanRequestsCacheNum', respond.data.total)
            }
            else{
                window.console.log(respond.msg)
                this.$message.error(respond.msg)
            }
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },


    getPassLoanRequests({commit}, data){
        reqGetPassLoanRequests(data).then((respond) => {
            if(respond.code == 0){
                commit('updateLoanRequestsCache', respond.data.list)
                commit('updateLoanRequestsCacheNum', respond.data.total)
            }
            else{
                window.console.log(respond.msg)
                this.$message.error(respond.msg)
            }
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },


    getRejectLoanRequests({commit}, data){
        reqGetRejectLoanRequests(data).then((respond) => {
            if(respond.code == 0){
                commit('updateLoanRequestsCache', respond.data.list)
                commit('updateLoanRequestsCacheNum', respond.data.total)
            }
            else{
                window.console.log(respond.msg)
                this.$message.error(respond.msg)
            }
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },


    getContractLoanRequests({commit}, data){
        reqGetContractLoanRequests(data).then((respond) => {
            if(respond.code == 0){
                commit('updateLoanRequestsCache', respond.data.list)
                commit('updateLoanRequestsCacheNum', respond.data.total)
            }
            else{
                window.console.log(respond.msg)
                this.$message.error(respond.msg)
            }
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },


    getCompleteLoanRequests({commit}, data){
        reqGetCompleteLoanRequests(data).then((respond) => {
            if(respond.code == 0){
                commit('updateLoanRequestsCache', respond.data.list)
                commit('updateLoanRequestsCacheNum', respond.data.total)
            }
            else{
                window.console.log(respond.msg)
                this.$message.error(respond.msg)
            }
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },


    getExpiredLoanRequests({commit}, data){
        reqGetExpiredLoanRequests(data).then((respond) => {
            if(respond.code == 0){
                commit('updateLoanRequestsCache', respond.data.list)
                commit('updateLoanRequestsCacheNum', respond.data.total)
            }
            else{
                window.console.log(respond.msg)
                this.$message.error(respond.msg)
            }
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },

    getRepayPlan({commit}, data){
        reqGetRepayPlan(data).then((respond) => {
            if(respond.code == 0){
                commit('updateRepayPlan', respond.data.repay_plans)
            }
            else{
                window.console.log(respond.msg)
                this.$message.error(respond.msg)
            }
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },

    cancelLoanRequest({commit}, data){
        reqCancelLoanRequest(data).then((respond) => {
            if(respond.code == 0){
                this.$message.success(respond.msg)
            }
            else{
                this.$message.error(respond.msg)
            }
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    }

}

const getters = {

}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}