import {reqGetAllBook, reqSearchBook,reqGetAllType,reqGetTypeBook} from '../../api'

const state = {
    books: [],
    categories: [],
    books_total:0,
    books_pages:0,
    filteredBooks: [],
}

const mutations = {
    updateBook(state, books) {
        state.books = books;
    },
    updateTotal(state,total)
    {
        state.books_total=total
    },
    updateCategory(state,categories)
    {
        state.categories=categories
    },
    updateFilteredBook(state, books) {
        state.filteredBooks = books
    }
}

const actions = {
    getAllBook({commit},num) {
        reqGetAllBook({
            page:num
        }).then( (result) => {
            commit('updateBook', result.data.records);
            commit('updateTotal',result.data.total)
        })
    },
    getTypeBook({commit},[categoryId,num]){
        reqGetTypeBook({
            categoryId:categoryId,
            page:num
        }).then((result)=>{
            commit('updateBook',result.data.records)
            commit('updateTotal',result.data.total)
        })
    },
    getAllType({commit})
    {
        reqGetAllType().then((result)=>{
            commit('updateCategory',result.data)
        })
    },

    searchBook({commit}, [filter,num]) {
        reqSearchBook({
            bookName:filter,
            page:num
        }).then((result) => {
            commit('updateFilteredBook', result.data.records)
            commit('updateTotal',result.data.total)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
