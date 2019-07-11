import {reqGetUserMessage} from "../../api";

const state={
    isLogin:false,
    user_message:{}
}
//同步
const mutations ={
    changeLogin(state) {
        state.isLogin=!state.isLogin
    },
    updateUserMessage(state,message){
        state.user_message=message
        sessionStorage.setItem('user_message',JSON.stringify(state.user_message))
        sessionStorage.setItem('isLogin',state.isLogin)
    },
    init(state){
        state.isLogin=false;
        state.user_message={};
        if(sessionStorage.getItem('user_message')){
           sessionStorage.removeItem('user_message')
        }
        if(sessionStorage.getItem('isLogin')){
            sessionStorage.removeItem('isLogin')
        }
    },
    updatePhoneAddress(state,[phone,address]){
        state.user_message.phone=phone
        state.user_message.address=address
        sessionStorage.setItem('user_message',JSON.stringify(state.user_message))
        sessionStorage.setItem('isLogin',state.isLogin)
    },
    getSessionUser(state){
        if(sessionStorage.getItem('isLogin')){
            state.isLogin=sessionStorage.getItem('isLogin')
        }
        if(sessionStorage.getItem('user_message')){
            state.user_message=JSON.parse(sessionStorage.getItem('user_message'))
        }
    }
}
//异步
const actions ={
    getUserMessage({commit}){
        reqGetUserMessage().then((response)=>{
            if(response.code===0){
                commit('updateUserMessage',response.data)
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
