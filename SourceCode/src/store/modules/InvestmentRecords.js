import{
    reqGetTotalInvestmentRecords, 
    reqGetContractInvestmentRecords,
    reqGetCompleteInvestmentRecords,
    reqGetInvestPlan
} from '../../api'

var timestamp
const state = {
    investmentRecordsCache: [],
    investmentRecordsCacheNum: 0,

    page_size: 10,
    current_page:1,

    invest_plan:[]
}


const mutations = {
    init(state){
        state.investmentRecordsCache = [];
        state.investmentRecordsCacheNum = 0;

        state.current_page = 1;
        state.page_size = 10
        state.invest_plan = []
    },

    updateCurrentPage(state, current_page){
        state.current_page = current_page
    },

    updataInvestmentRecordsCache(state, data){
        state.investmentRecordsCache = data
        for(var cnt = 0; cnt < state.investmentRecordsCache.length; cnt++){
            timestamp = new Date(state.investmentRecordsCache[cnt].create_time);
            state.investmentRecordsCache[cnt].create_time = timestamp.toLocaleString('chinese',{hour12:false}).replace(/\//g, "-");
            state.investmentRecordsCache[cnt].interest_rate = (state.investmentRecordsCache[cnt].interest_rate * 100).toFixed(2)
            timestamp = new Date(state.investmentRecordsCache[cnt].purchase_time);
            state.investmentRecordsCache[cnt].purchase_time = timestamp.toLocaleString('chinese',{hour12:false}).replace(/\//g, "-");
            switch(state.investmentRecordsCache[cnt].status){
                case 3 :{
                    state.investmentRecordsCache[cnt].status = "已投资"
                    break
                }
                case 5 :{
                    state.investmentRecordsCache[cnt].status = "逾期"
                    break
                }
                case 6: {
                    state.investmentRecordsCache[cnt].status = "已完成"
                    break
                }
            }
        }
    },
    
    updateInvestmentRecordsCacheNum(state, data){
        state.investmentRecordsCacheNum = data;
    },

    updateInvestPlan(state, data){
        state.invest_plan = data
        for(var cnt = 0; cnt < state.invest_plan.length; cnt ++){
            timestamp = new Date(state.invest_plan[cnt].repay_date)
            state.invest_plan[cnt].repay_date = timestamp.toLocaleDateString().replace(/\//g, "-");
            switch(state.invest_plan[cnt].status){
                case 0 :{
                    state.invest_plan[cnt].status = "未收款"
                    break
                }
                case 2: {
                    state.invest_plan[cnt].status = "已逾期"
                    break
                }
                default:{
                    state.invest_plan[cnt].status = "已收款"
                    break
                }
            }
        }
    }
}


const actions = {
    getTotalInvestmentRecords({commit}, data){
        reqGetTotalInvestmentRecords(data).then((respond) => {
            if(respond.code == 0){
                commit('updataInvestmentRecordsCache', respond.data.list)
                commit('updateInvestmentRecordsCacheNum', respond.data.total)
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

    getContractInvestmentRecords({commit}, data){
        reqGetContractInvestmentRecords(data).then((respond) => {
            if(respond.code == 0){
                commit('updataInvestmentRecordsCache', respond.data.list)
                commit('updateInvestmentRecordsCacheNum', respond.data.total)
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

    getCompleteInvestmentRecords({commit}, data){
        reqGetCompleteInvestmentRecords(data).then((respond) => {
            if(respond.code == 0){
                commit('updataInvestmentRecordsCache', respond.data.list)
                commit('updateInvestmentRecordsCacheNum', respond.data.total)
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

    getInvestPlan({commit}, data){
        reqGetInvestPlan(data).then((respond) => {
            if(respond.code == 0){
                commit('updateInvestPlan', respond.data)
            }
            else{
                window.console.log(respond.msg)
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