import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/User/Home/Home.vue'
import Index from '../pages/Index/Index.vue'
import Login from '../pages/Login/Login.vue'
import Register from '../pages/Register/Register.vue'
import Credit from '../pages/User/Credit/Credit.vue'
import Investment from '../pages/User/Investment/Investment.vue'
import InvestmentDetails from '../pages/User/InvestmentDetails/InvestmentDetails.vue'
import LoanDetail from '../pages/User/LoanDetail/LoanDetail.vue'
import Letter from '../pages/User/Letter/Letter.vue'
import Information from '../pages/Information/Information.vue'
import LoanRecords from '../pages/User/LoanRecords/LoanRecords.vue'
import InvestmentRecords from '../pages/User/InvestmentRecords/InvestmentRecords.vue'
import Guarantee from '../pages/Guarantor/Guarantee/Guarantee.vue'
import Overdue from '../pages/Guarantor/Overdue/Overdue.vue'
import PersonalCenter from '../pages/User/PersonalCenter/PersonalCenter.vue'
import Wallet from '../pages/User/Wallet/Wallet.vue'
import Contract from "../pages/Information/Contract.vue";

Vue.use(VueRouter)

export default new VueRouter({
    // 所有路由
    routes: [
        {
          path: '/index',
          component: Index,
          meta:{
              showNavDetail:false,
          }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                showNavDetail: false,
            }
        },
        {
          path: '/wallet',
          component: Wallet,
          meta: {
            showNavDetail: true,
          }
        },
        {
          path: '/investmentDetails/:id',
          name: 'InvestmentDetails',
          component: InvestmentDetails,
          meta: {
            showNavDetail: true
          }
        },
        {
          path: '/investment',
          component: Investment,
          meta: {
            showNavDetail: true
          }
        },
        {
            path: '/personalCenter',
            component: PersonalCenter,
            meta: {
                showNavDetail: true
            }
        },
        {
            path: '/information/:text_id',
            name: 'Information',
            component: Information,
            meta: {
                showNavDetail: true
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                showNavDetail: true,
            }
        },
        {
            path: '/credit',
            component: Credit,
            meta: {
                showNavDetail: true,
            }
        },
        {
            path: '/loanDetail',
            component: LoanDetail,
            meta: {
                showNavDetail: true,
            }
        },
        {
            path: '*',
            component: Home,
            meta: {
                showNavDetail: true,
            }
        },
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/letter',
            component: Letter
        },
        {
            path: '/loanRecords',
            component: LoanRecords
        },
        {
            path: '/investmentRecords',
            component: InvestmentRecords
        },
        {
            path:'/guarantor/guarantee',
            component: Guarantee
        },
        {
                path:'/guarantor/overdue',
            component: Overdue
        },
        {
            path:'/contract',
            component: Contract
        }
    ]
})

