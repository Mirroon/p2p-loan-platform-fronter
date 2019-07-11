const state={
    isGuarantorLogin:false,
    guarantor_message:{}
}
//同步
const mutations ={
    changeLogin(state){
        state.isGuarantorLogin=!state.isGuarantorLogin
    },
    updateMessage(state,message){
        state.guarantor_message=message
        sessionStorage.setItem('guarantor_message',JSON.stringify(message))
        sessionStorage.setItem('isGuarantorLogin',state.isGuarantorLogin)
    },
    init(state){
        state.isGuarantorLogin=false
        state.guarantor_message={}
        if(sessionStorage.getItem('guarantor_message')){
            sessionStorage.removeItem('guarantor_message')
        }
        if(sessionStorage.getItem('isGuarantorLogin')){
            sessionStorage.removeItem('isGuarantorLogin')
        }
    },
    getSessionGuarantor(state){
        if(sessionStorage.getItem('guarantor_message')){
            state.guarantor_message=JSON.parse(sessionStorage.getItem('guarantor_message'))
        }
        if(sessionStorage.getItem('isGuarantorLogin')){
            state.isGuarantorLogin=sessionStorage.getItem('isGuarantorLogin')
        }
    }
}
//异步
const actions ={
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
