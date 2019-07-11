import {
    reqGetTotalOverdue
} from '../../api'
const state = {
    totalOverdue : [],
    totalOverdueNum : 0,
    page_size: 10,
    current_page:1
}

var timestamp
const mutations = {
    init(state){
        state.totalOverdue = []
        state.totalOverdueNum = 0
        state.page_size = 10
        state.current_page = 1
    },

    updateCurrentPage(state, current_page){
        state.current_page = current_page
    },

    updateTotalOverdue(state, data){
        state.totalOverdue = data
        for(var cnt = 0; cnt < state.totalOverdue.length; cnt++){
            timestamp = new Date(state.totalOverdue[cnt].create_time);
            state.totalOverdue[cnt].create_time = timestamp.toLocaleString('chinese',{hour12:false}).replace(/\//g, "-");
            timestamp = new Date(state.totalOverdue[cnt].purchase_deadline);
            state.totalOverdue[cnt].update_time = timestamp.toLocaleString('chinese',{hour12:false}).replace(/\//g, "-");
        }
    },

    updateTotalOverdueNum(state, data){
        state.totalOverdueNum = data
    },

}

const actions = {
    getTotalOverdue({commit}, data){
        reqGetTotalOverdue(data).then((respond) => {
            if(respond.code == 0){
                commit('updateTotalOverdue', respond.data.list)
                commit('updateTotalOverdueNum', respond.data.total)
            }else{
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