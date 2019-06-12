<template>
    <div class="container-fluid">
        <div class="row mt-5">
            <div class="mt-2">
                <i class="iconfont icon-sousuo col-md-9"></i>
            </div>
            <input placeholder="输入书名来搜索" type="text" class="form-control col-md-10" v-model="filter">
            <button class="btn btn-primary btn-block ml-2 col-md-1" @click="searchBook">搜索</button>
        </div>
        <div v-show="!init">
            <ul class="mt-5" v-show="books.length > 0">
                <li v-for="(book, index) in books" :key="index" class="list-unstyled mb-5">
                    <Book :book="book" :index="index"></Book>
                </li>
                <div class="c">
                    <br />
                    <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="30"
                            layout="total, prev, pager, next, jumper"
                            :pager-count="11"
                            :total="books_total">
                    </el-pagination>
                    <br /><br />
                </div>
            </ul>
            <div v-show="books.length === 0" class="container mt-5">
                <div class="row">
                    <div style="font-family: 等线" v-show="!init">
                        暂时没有您要搜索的书籍~
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Book from '../../components/Book/Book'

    export default {
        name: "Search",
        components: {
            Book,
        },
        mounted() {
            this.filter = ""
            this.$store.dispatch('Books/searchBook', this.filter)
            this.init = true
        },
        data() {
            return {
                filter: "",
                init: true,
                currentPage:1
            }
        },
        computed: {
            ...mapState({
                books: state => state.Books.filteredBooks,
                books_total:state=>state.Books.books_total
            }),
        },
        methods: {
            searchBook() {
                this.$store.dispatch('Books/searchBook', [this.filter,0])
                this.init = false
                this.currentPage=1
            },
            handleCurrentChange(val) {
                // 改变默认的页数
                this.currentPage=val
                this.$store.dispatch('Books/searchBook',[this.filter,val-1])
            }
        }
    }
</script>

<style scoped>
    .c
    {
        text-align: center;
    }
</style>
