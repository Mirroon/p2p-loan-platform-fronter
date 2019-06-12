import {reqGetUserState,reqShippingList} from '../../api'

const state = {
    isManager: false,
    isLogin: false,
    account: '',
    userStates: [],
    shippingList:[],
}

const mutations = {
    changeManager (state) {
        state.isManager = !state.isManager
    },
    changeLogin (state) {
        state.isLogin = !state.isLogin
    },

    updateUserState (state, userStates) {
        state.userStates = userStates
    },

    setAccount (state, account) {
        state.account = account
    },

    updateShippingList(state,list)
    {
        state.shippingList=list
    },
    pushShippingList(state,element)
    {
        state.shippingList.push(element)
    },
    deleteShippingList(state,shippingId)
    {
        for(let i=0;i<state.shippingList.length;i++)
        {
            if(state.shippingList[i].id===shippingId)
            {
                state.shippingList.splice(i,1)
                break
            }
        }
    },
    clearShippingList(state)
    {
        state.shippingList=[]
    }
}

const actions = {
    getUerState ({commit}) {
        reqGetUserState().then((data) => {
            commit('updateUserState', data)
        })
    },
    getShippingList({commit}){
        reqShippingList().then((result)=>{
            if(result.code===0)
            {
                commit('updateShippingList',result.data)
            }
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
