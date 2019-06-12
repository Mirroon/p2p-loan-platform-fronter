<template>
    <div class="container-fluid">
        <div class="row">
            <div class="imgbox col-md-2" style="cursor: pointer" @click="showDetail">
                <img v-lazy="cover" :key="cover" class="img-thumbnail" alt="Responsive image">
            </div>
            <div class="col-md-6" style="cursor: pointer"  @click="showDetail">
                <div class="card-link link">
                    <div class="name mt-3 mb-2">{{book.name}}</div>
                    <div class="author mb-1">作者:{{book.author}}</div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="price">{{book.price}}元</div>
            </div>
            <div class="col-md-2" v-if="!isManager">
                <div class="row mt-5 mb-2">
                    <i class="iconfont icon-jian col-md-3"
                       @click="substract"
                       :style="count>1? 'cursor: pointer':''"
                       :class="count>1?'text-danger':''"></i>
                    <div class="col-md-6 text-center">{{count}}</div>
                    <i class="iconfont icon-jia col-md-3"
                       @click="add"
                       :style="true? 'cursor: pointer':''"
                       :class="true?'text-danger':''"></i>
                </div>
                <button class="btn btn-danger btn-block mt-1" @click="addtocart">
                    加入购物车
                </button>
            </div>
            <div class="col-md-2" v-else>
                <button class="btn btn-primary btn-block mt-5" @click="showDetail">
                    修改信息
                </button>
                <button class="btn btn-danger btn-block mt-5" @click="deleteBook">
                    删除书籍
                </button>
            </div>
        </div>
        <hr>
        <el-dialog
                :title="isManager? '书籍信息修改':'书籍详情'"
                :visible.sync="dialogVisible"
                width="60%">
            <div v-if="!isManager">
                <div class="mt-2">
                    <div class="row mb-3">
                        <div class="imgbox col-md-4">
                            <img v-lazy="cover" class="img-thumbnail">
                        </div>
                        <div class="col-md-8">
                            <div class="name">
                                书名：{{detail.name}}
                            </div>
                            <div class="mt-1">
                                作者：{{detail.author}}
                            </div>
                            <div class="mt-1">
                                ISBN：{{detail.isbn}}
                            </div>
                            <div class="mt-1">
                                出版社:{{detail.publishingHouse}}
                            </div>
                            <div class="mt-1">
                                出版日期:{{detail.publishingDate}}
                            </div>
                        </div>
                    </div>
                    <div class="outline mt-1 ml-5 mr-5">
                        简介：{{detail.briefIntroduction}}
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-row>
                        <el-col :span="6" :offset="18">
                            <el-input-number v-model="count" controls-position="right" :min="1"  size="mini"></el-input-number>
                            <el-button type="danger" class="mr-2" @click="addtocart">加入购物车</el-button>
                        </el-col>
                    </el-row>
                </span>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {reqModifyBook, reqDeleteImg, reqGetBookDetail, reqDeleteBook} from "../../api"
    import axios from 'axios'

    export default {
        name: "Book",
        props: {
            book: Object,
            index: Number,
        },

        mounted() {
            if (this.book.icon != null && this.book.icon != "") {
                this.fileList = []
                this.fileList.push({
                    name: this.book.icon,
                    url : "/sell/images/"+this.book.icon
                })
            }
        },
        data() {
            return {
                count: 1,
                dialogVisible: false,
                fileList: [],
                detail: {
                },
                form: {
                    name: this.book.name,
                    author: this.book.author,
                    isbn: this.book.isbn,
                    briefIntroduction: this.book.briefIntroduction,
                    id: this.book.id,
                    price: this.book.price,
                },
                newisbn: this.book.isbn,
                cover_return: null,
            }
        },
        methods: {
            substract () {
                if (this.count > 1)
                    this.count--
            },

            add () {
                    this.count++

            },

            addtocart () {
                if(!this.isLogin)
                {
                    this.$router.push('/login')
                    this.$message.info('请先登录！')
                    return
                }
                this.$store.dispatch('ShopCart/addtocart', {
                    cover: this.book.icon,
                    name: this.book.name,
                    author: this.book.author,
                    // isbn: this.book.isbn,
                    count: this.count,
                    price: this.book.price,
                    money: this.count*this.book.price,
                    id: this.book.id
                }).then(() => {
                    this.$message.success("成功加入购物车")
                }).catch(() => {
                    this.$message.error("超过库存，无法加入购物车")
                })
            },

            formUpdate() {
                this.form.name = this.book.name
                this.form.author=this.book.author
                this.form.isbn=this.book.isbn
                this.newisbn=this.book.isbn
                this.form.briefIntroduction=this.book.briefIntroduction
                this.form.stock=this.book.stock
                this.form.price=this.book.price
                this.cover_return = null

                if (this.book.icon != null && this.book.icon != "") {
                    let fileList = []
                    fileList.push({
                        name:this.book.icon,
                        url : "/sell/images/"+this.book.icon
                    })
                    this.fileList = fileList
                }
            },

            // ajax显示书籍详情
            showDetail () {
                reqGetBookDetail({
                    bookId:this.book.id
                }).then((result)=>
                {
                    this.detail = result.data
                    this.dialogVisible = !this.dialogVisible
                })
            },

            deleteBook () {
                reqDeleteBook(this.book.isbn).then((data) => {
                    if (data == "删除成功") {
                        this.$store.dispatch('Books/getAllBook').then(() => {
                            this.$message.success(data)
                        })
                    } else {
                        this.$message.error(data)
                    }
                }).catch((data) => {
                    this.$message.error(data)
                })
            }
        },
        computed: {
            ...mapState({
                isManager: state => state.Person.isManager,
                isLogin: state=> state.Person.isLogin
            }),
            cover: function () {
                if (this.book.icon != null) {
                    let cover = "/sell/images/"+ this.book.icon
                    return cover
                }
                return "./"
            },
        },

        watch: {
            book() {
                this.formUpdate()
            },
        }
    }
</script>

<style scoped>
    .imgbox{
        font-size: 0;
        width: 200px;
        height: 200px;
        text-align: center;
    }
    .imgbox img{
        max-height: 100%;
        max-width: 100%;
        vertical-align: middle;
    }

    .name{
        font-family: 黑体;
        font-size: 24px;
    }

    .author{
        font-family: 仿宋;
        font-size: 15px;
    }

    .outline{
        font-family: 等线;
        font-size: 12px;
        opacity: 0.6;
    }

    .isbn{
        font-size:10px;
        font-family: Arial;
    }

    .stock{
        font-size:15px;
        font-family: 仿宋;
    }

    .price{
        font-size: 20px;
        font-family: 黑体;
    }

    .link:hover{
        color: steelblue;
    }

</style>
