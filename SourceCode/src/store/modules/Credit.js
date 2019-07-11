import {reqGetCreditInfo} from "../../api";

const state={
    reachLoanDetail:false,
    credit_info:{},
    quota:''
}
//同步
const mutations ={
    changeReach(state){
        state.reachLoanDetail=!state.reachLoanDetail
    },
    updateCreditInfo(state,info){
        state.credit_info=info
        sessionStorage.setItem('credit_info',JSON.stringify(state.credit_info))
    },
    updateQuota(state,quota){
      state.quota=quota
    },
    clearCreditInfo(state) {
        state.credit_info = {}
    },
    init(state){
        state.reachLoanDetail=false
        state.quota=''
        state.credit_info={}
        if(sessionStorage.getItem('credit_info')){
            sessionStorage.removeItem('credit_info')
        }
    },
    getSessionCredit(state){
        if(sessionStorage.getItem('credit_info')){
            state.credit_info=JSON.parse(sessionStorage.getItem('credit_info'))
        }
    }
}
//异步
const actions ={
    getCreditInfo({commit}){
        reqGetCreditInfo().then((response)=>{
            if(JSON.stringify(response.data)!='{}') {
                commit('updateCreditInfo',response.data)
            }
        }).catch(()=>{
            this.$message.error("请检查网络连接")
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
