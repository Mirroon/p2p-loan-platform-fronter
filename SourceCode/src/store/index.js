import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/User'
import Letters from './modules/Letters'
import Credit from './modules/Credit'
import Guarantor from './modules/Guarantor'
import LoanRecords from './modules/LoanRecords'
import InvestmentRecords from './modules/InvestmentRecords'
import Guarantee from './modules/Guarantee'
import InvestmentList from './modules/InvestmentList'
import Overdue from './modules/Overdue'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        //以下是p2p
        User,
        Letters,
        Credit,
        Guarantor,
        LoanRecords,
        InvestmentRecords,
        Guarantee,
        InvestmentList,
        Overdue
    },
})
