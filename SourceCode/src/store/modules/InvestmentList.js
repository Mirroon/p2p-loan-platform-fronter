import {reqLoanApplicationList} from "../../api";

const state={
    pages:0,//总页数
    total:0,//总条目数
    size:0,//每页的条目数
    current_page:0,//当前页面
    list:[]
    //list用到的属性
    //application_id
    //amount
    //title
    //interest_rate
    //loan_month
}
//同步
const mutations ={
    init(state){
        state.pages=0
        state.total=0
        state.size=0
        state.current_page=0
        state.list=[]
    },
    updatePages(state,pages){
        state.pages=pages
    },
    updateTotal(state,total){
        state.total=total
    },
    updateSize(state,size){
        state.size=size
    },
    updateCurrentPage(state,page){
        state.current_page=page
    },
    updateList(state,list){
        state.list=list
    }
}
//异步
const actions ={
   LoanApplicationList({commit},num){
       reqLoanApplicationList({
           page_num:num
       }).then((response)=>{
           if(response.code===0){
               commit('updatePages',response.data.pages)
               commit('updateTotal',response.data.total)
               commit('updateSize',response.data.size)
               commit('updateCurrentPage',response.data.current_page)
               commit('updateList',response.data.list)
           }
       })
   }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
