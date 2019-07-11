import {
    reqTotalLetters,
    reqNeverReadLetters,
    reqBeenReadLetters,
    reqDeleteLetters,
    reqUpdateLetterStatus,
} from "../../api";

var timestamp
const state = {
    totalLetters: [],
    totalLettersNum: 1,
    neverReadLetters: [],
    neverReadLettersNum: 0,
    beenReadLetters:[],
    beenReadLettersNum: 0,

    letterCache:[],
    letterCacheNum: 0,

    current_page: 1,
    page_size: 10,
}

const mutations = {
    init(state){
        state.current_page = 1
        state.page_size = 10
        state.letterCache = []
        state.letterCacheNum = 0

    },
    updateCurrentPage(state, current_page){
        state.current_page = current_page
    },

    updateLetterCache(state, data){
        state.letterCache = data
        for(var cnt = 0; cnt < state.letterCache.length; cnt++){
            timestamp = new Date(state.letterCache[cnt].time);
            state.letterCache[cnt].time = timestamp.toLocaleString('chinese',{hour12:false}).replace(/\//g, "-");
            switch(state.letterCache[cnt].status){
                case 0 :{
                    state.letterCache[cnt].status = "未读"
                    break
                }
                case 1 :{
                    state.letterCache[cnt].status = "已读"
                    break
                }
            }
        }
    },

    updateLetterCacheNum(state, data){
        state.letterCacheNum = data
    },
}


const actions = {
    getTotalLetters({commit}, data){
        reqTotalLetters(data).then((respond) => {
            commit('updateLetterCache', respond.data.list)
            commit('updateLetterCacheNum', respond.data.total)
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },

    getNeverReadLetters({commit}, data){
        reqNeverReadLetters(data).then((respond) => {
            commit('updateLetterCache', respond.data.list)
            commit('updateLetterCacheNum', respond.data.total)
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },

    getBeenReadLetters({commit}, data){
        reqBeenReadLetters(data).then((respond) => {
            commit('updateLetterCache', respond.data.list)
            commit('updateLetterCacheNum', respond.data.total)
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },

    deleteLetters({commit}, notice_id){
        reqDeleteLetters(notice_id).then((respond) =>{
            if(respond.code == 0){
                this.$message.success("删除成功。")
            }else {
                this.$message.error(respond.msg)
            }
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    },

    updateLetters({commit}, notice_id){
        reqUpdateLetterStatus(notice_id).then((respond)=>{
        }).catch(()=>{
            window.console.log("失败，请检查网络连接")
            // this.$message.error("失败，请检查网络连接")
        })
    }
}

const getters = {
    getTotalLetters(){

    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
