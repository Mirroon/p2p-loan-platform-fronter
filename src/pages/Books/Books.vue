<template>
    <div class="container-fluid">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="所有类别" name="0"></el-tab-pane>
            <el-tab-pane v-for="(it,index) in categories" :key="index" :label="it.name" :name="it.id"></el-tab-pane>
        </el-tabs>

        <ul  class="mt-5">

            <li v-for="(book,index) in books" :key="index" class="list-unstyled mb-5">
                <el-card shadow="hover">
                    <Book :book="book" :index="index"></Book>
                </el-card>
            </li>
        </ul>
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
    </div>
</template>

<script>
    import Book from '../../components/Book/Book'
    import {mapState} from 'vuex'
    import {reqAddBook, reqDeleteImg} from '../../api'
    import axios from 'axios'

    export default {
        name: "Books",

        mounted() {
            this.$store.dispatch('Books/getAllBook',0)
            this.$store.dispatch('Books/getAllType')
        },

        components: {
            Book,
        },
        data () {
            return {
                dialogVisible: false,
                activeName: 0,
                fileList: [],
                currentPage:1,
                cate_id: 0,
                form: {
                    name: '',
                    author: '',
                    isbn: '',
                    outline: '',
                    price: undefined,
                    cover: '',
                    press: '',
                },
                imageUrl: '',
            }
        },
        computed: {
            ...mapState({
                isManager: state => state.Person.isManager,
                books: state => state.Books.books,
                categories: state=>state.Books.categories,
                books_total:state=>state.Books.books_total,
                books_pages:state=>state.Books.books_pages
            })
        },
        methods: {
            handleClick(tab)
            {
                this.cate_id=tab.name;
                this.currentPage=1;
                this.$store.dispatch('Books/getTypeBook',[this.cate_id,this.currentPage-1])
            },
            handleCurrentChange(val) {
                // 改变默认的页数
                this.currentPage=val
                // 切换页码时，要获取每页显示的条数
                if(this.cate_id===0)
                {
                    this.$store.dispatch('Books/getAllBook',val-1)
                }
                else
                {
                    this.$store.dispatch('Books/getTypeBook',[this.cate_id,this.currentPage-1])
                }

            },
        }
    }
</script>

<style scoped>
    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .c
    {
        text-align: center;
    }
</style>
