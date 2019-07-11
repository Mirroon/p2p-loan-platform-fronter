import{
    reqGetTotalGuaranteeRequests,
    reqGetWaitGuaranteeRequests,
    reqGetPassGuaranteeRequests,
    reqGetRejectGuaranteeRequests,
    reqGetExpiredGuaranteeRequests,
    reqAcceptGuaranteeRequests,
    reqRejectGuaranteeRequests,
    reqGetGuaranteeUserInfo,
    reqGetGuaranteeUserHistory
} from '../../api'

var timestamp
const state = {

    guaranteeRequestsCache: [],
    guaranteeRequestsCacheNum: 0,
    
    guaranteeUserInfo: {},
    guaranteeUserHistory: [],
    guaranteeUserHistoryNum: 0,
    dialog_current_page: 1,
    page_size: 10,
    current_page: 1,
    dialog_page_size: 5
}

const mutations = {
    init(state){
        state.current_page = 1
        state.page_size = 10

        state.guaranteeRequestsCache= [],
        state.guaranteeRequestsCacheNum= 0
    },
    initDialog(){
        state.guaranteeUserHistory= []
        state.guaranteeUserHistoryNum= 0
        state.dialog_current_page= 1
    },

    updateDialogCurrentPage(state, dialog_current_page){
        state.dialog_current_page = dialog_current_page
    },

    updateCurrentPage(state, current_page){
        state.current_page = current_page
    },

    updateGuaranteeUserInfo(state, guaranteeUserInfo){
        state.guaranteeUserInfo = guaranteeUserInfo
    },

    updateGuaranteeUserHistory(state, data){
        state.guaranteeUserHistory = data
        for(var cnt = 0; cnt < state.guaranteeUserHistory.length; cnt++){
            timestamp = new Date(state.guaranteeUserHistory[cnt].time);
            state.guaranteeUserHistory[cnt].time = timestamp.toLocaleDateString().replace(/\//g, "-");
        }
    },

    updateGuaranteeUserHistoryNum(state, data){
        state.guaranteeUserHistoryNum = data
    },

    updateGuaranteeRequestsCache(state, data){
        state.guaranteeRequestsCache = data
        for(var cnt = 0; cnt < state.guaranteeRequestsCache.length; cnt++){
            timestamp = new Date(state.guaranteeRequestsCache[cnt].create_time);
            state.guaranteeRequestsCache[cnt].create_time = timestamp.toLocaleString('chinese',{hour12:false}).replace(/\//g, "-");
            timestamp = new Date(state.guaranteeRequestsCache[cnt].purchase_deadline);
            state.guaranteeRequestsCache[cnt].purchase_deadline = timestamp.toLocaleString('chinese',{hour12:false}).replace(/\//g, "-");
            state.guaranteeRequestsCache[cnt].interest_rate = (state.guaranteeRequestsCache[cnt].interest_rate * 100).toFixed(2)
            switch(state.guaranteeRequestsCache[cnt].status){
                case 0: {
                    state.guaranteeRequestsCache[cnt].status = "待通过"
                    break
                }
                case 1: {
                    state.guaranteeRequestsCache[cnt].status = "已通过"
                    break
                }
                case 2: {
                    state.guaranteeRequestsCache[cnt].status = "未通过"
                    break
                }
                case 5: {
                    state.guaranteeRequestsCache[cnt].status = "已过期"
                    break
                }
            }
        }
    },
    updateGuaranteeRequestsCacheNum(state, data){
        state.guaranteeRequestsCacheNum = data
    },
}


const actions ={
    getGuaranteeUserInfo({commit}, data){
        reqGetGuaranteeUserInfo(data).then((respond) => {
            if(respond.code == 0){
                commit('updateGuaranteeUserInfo', respond.data)
            }else{
                window.console.log(respond.msg)
            }
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },

    getGuaranteeUserHistory({commit}, data){
        reqGetGuaranteeUserHistory(data).then((respond) => {
            if(respond.code == 0){
                commit('updateGuaranteeUserHistory', respond.data.list)
                commit('updateGuaranteeUserHistoryNum', respond.data.total)

            }else{
                window.console.log(respond.msg)
            }
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },

    getTotalGuaranteeRequests({commit}, data){
        reqGetTotalGuaranteeRequests(data).then((respond) => {
            if(respond.code == 0){
                commit('updateGuaranteeRequestsCache', respond.data.list)
                commit('updateGuaranteeRequestsCacheNum', respond.data.total)
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

    getWaitGuaranteeRequests({commit}, data){
        reqGetWaitGuaranteeRequests(data).then((respond) => {
            if(respond.code == 0){
                commit('updateGuaranteeRequestsCache', respond.data.list)
                commit('updateGuaranteeRequestsCacheNum', respond.data.total)
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


    getPassGuaranteeRequests({commit}, data){
        reqGetPassGuaranteeRequests(data).then((respond) => {
            if(respond.code == 0){
                commit('updateGuaranteeRequestsCache', respond.data.list)
                commit('updateGuaranteeRequestsCacheNum', respond.data.total)
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


    getRejectGuaranteeRequests({commit}, data){
        reqGetRejectGuaranteeRequests(data).then((respond) => {
            if(respond.code == 0){
                commit('updateGuaranteeRequestsCache', respond.data.list)
                commit('updateGuaranteeRequestsCacheNum', respond.data.total)
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

    acceptGuaranteeRequests(application_id){
        reqAcceptGuaranteeRequests(application_id).then((respond) => {
            if(respond.code == 0){
                window.console.log(respond.msg)
                this.$message.success(respond.msg)
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
    rejectGuaranteeRequests(application_id){
        reqRejectGuaranteeRequests(application_id).then((respond) => {
            if(respond.code == 0){
                window.console.log(respond.msg)
                this.$message.success(respond.msg)
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
}

const getters = {

}

export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}