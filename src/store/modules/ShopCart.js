import {reqSyncCart, reqInitCart} from '../../api'
const state = {
    books: [],
    updateArr:[]
}

const mutations = {
    deletebook(state, index) {
        state.books.splice(index, 1)
        state.updateArr.splice(index, 1)
        reqSyncCart({
            cart:JSON.stringify(state.updateArr)
        })
    },

    add(state, index){
        state.books[index].count++
        state.books[index].money+= state.books[index].price
        state.updateArr[index].bookQuantity++
        reqSyncCart({
            cart:JSON.stringify(state.updateArr)
        })
    },

    substract(state, index){
        state.books[index].count--
        state.books[index].money-= state.books[index].price
        state.updateArr[index].bookQuantity--
        reqSyncCart({
            cart:JSON.stringify(state.updateArr)
        })
    },
    initCart(state)
    {
        reqInitCart().then((result)=>{
            if(result.data.length>0)
            {
                for(let i=0;i<result.data.length;i++)
                {
                    state.books.push({
                        cover: result.data[i].bookIcon,
                        name: result.data[i].bookName,
                        author:result.data[i].bookAuthor,
                        count:result.data[i].bookQuantity,
                        price:result.data[i].bookPrice,
                        money:result.data[i].bookPrice * result.data[i].bookQuantity,
                        id:result.data[i].bookId
                    })
                    state.updateArr.push({
                        bookId: result.data[i].bookId,
                        bookQuantity: result.data[i].bookQuantity
                    })
                }
            }
        })
    },
    clearCart (state) {
        state.books = []
        state.updateArr=[]
    }
}

const actions = {
    addtocart({state}, book) {

        return new Promise((resolve, reject) => {
            let repeat = false;
            let counter = 0;
            state.books.forEach((item) => {
                if (book.name === item.name && book.author === item.author) {
                    item.money += book.money
                    item.count += book.count
                    state.updateArr[counter].bookQuantity+=book.count
                    repeat = true
                }
                counter=counter+1
            })

            if (!repeat) {
                state.books.push(book)
                state.updateArr.push({
                    bookId: book.id,
                    bookQuantity: book.count
                })
            }
            reqSyncCart({
                cart:JSON.stringify(state.updateArr)
            }).then((result)=>
            {
                if(result.code!=0)
                {
                    reject("exceed")
                }
            })
            resolve("succeed")
        })
    },
    clear({state})
    {
        state.books=[]
        state.updateArr=[]
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
