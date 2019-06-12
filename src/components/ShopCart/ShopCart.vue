<template>
    <div v-if="$route.path != '/login'">
        <transition name="shopcart">
            <div v-show="showShopCart" class="shopcart-content">
                <div class="bg-white shopcart border-right border-secondary">
                    <div v-show="books.length">
                        <ul class="container-fluid">
                            <li v-for="(book, index) in books" :key="index" class="list-unstyled mb-2 mt-1 ">
                                <div class="row mt-3">
                                    <div class="imgbox col-md-3">
                                        <img v-lazy="urls[index]" class="img-thumbnail">
                                    </div>
                                    <div class="col-md-6">
                                        <div class="col-md-12">
                                            <div class="mb-2">
                                                <div class="name">
                                                    {{ book.name }}
                                                </div>
                                                <div class="author">
                                                    {{ book.author }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <i class="iconfont icon-jian" @click="substract(book.count, index)" :style="book.count>1? 'cursor: pointer':''"
                                               :class="book.count>1? 'text-danger':''"></i>
                                            ×{{ book.count }}
                                            <i class="iconfont icon-jia"
                                               @click="add(book.count,index)"
                                               :style="true? 'cursor: pointer':''"
                                               :class="true? 'text-danger':''"></i>
                                        </div>
                                    </div>
                                    <div class="money col-md-2 ml-1">
                                        ￥{{ Math.round(book.money*100)/100 }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-10"></div>
                                    <div class="col-md-1">
                                        <i class="iconfont icon-shanchu text-danger" style="cursor: pointer" @click="deletebook(index)"></i>
                                    </div>
                                </div>
                                <hr>
                            </li>
                        </ul>
                        <div class="mt-3 mb-3 row" v-show="total.total_money!=0">
                            <div class="col-md-8 text-center mt-2">
                                <div class="container">
                                    <div class="row">
                                        <div class="totaltxt mt-1">总计</div>
                                        <div class="text-danger totalmoney">￥{{Math.round(total.total_money*100)/100}}</div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-danger col-md-3" @click="submitOrder">
                                提交订单
                            </button>
                        </div>
                    </div>
                    <div v-show="books.length === 0">
                        <div class="mt-4 text-center">
                            <i class="iconfont icon-gouwuche1"></i>
                            购物车为空
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="shopcart">
                <div  class="bg-danger float wrap" style="cursor: pointer"  @click="showShopCart = !showShopCart"
                      v-show="showShopCart">
                    <el-badge :value="total.total_books" class="center" :hidden="total.total_books === 0">
                        <i class="iconfont icon-gouwuche"></i>
                    </el-badge>
                </div>
        </transition>
        <transition name="float">
            <div  class="shopcart-float bg-danger wrap" style="cursor: pointer" @click="showShopCart = !showShopCart"
                  v-show="!showShopCart">
                <el-badge :value="total.total_books" class="center" :hidden="total.total_books === 0">
                    <i class="iconfont icon-gouwuche"></i>
                </el-badge>
            </div>
        </transition>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="选择收货地址" :label-width="formLabelWidth">
                    <el-select v-model="form.shippingId" placeholder="请选择收货地址" style="width: 300px">
                        <el-option v-for="(shipping,index) in shippingList" :key="index" :value="shipping.id" :label="shipping.receiverName+'/'+shipping.receiverPhone+'/'+shipping.receiverAddress">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {reqCreateOrder} from "../../api";

    export default {
        name: "ShopCart",
        data () {
            return {
                showShopCart: false,
                dialogFormVisible: false,
                form: {
                    shippingId:''
                },
                formLabelWidth: '200px'
            }
        },
        computed: {
            ...mapState({
                books: state => state.ShopCart.books,
                isLogin: state => state.Person.isLogin,
                shippingList:state=>state.Person.shippingList
            }),

            urls: function () {
                let urls = []
                for (let book of this.books) {
                    if (Object.keys(book).length != 0 && book.cover != null) {
                        let index = book.cover.lastIndexOf("\\")
                        let url = book.cover.slice(index+1, book.cover.length)
                        url = "/sell/images/"+url
                        urls.push(url)
                        continue
                    }

                    urls.push("./")
                }

                return urls
            },
            total () {
                let total_money = 0;
                let total_books = 0;
                this.books.forEach((book) => {
                    total_money += book.money
                    total_books += book.count
                })
                return {total_money,total_books}
            },

        },
        methods: {
            confirm()
            {
                if(this.form.shippingId==='')
                {
                    this.showShopCart=false
                    this.$message.error('请选择收货地址！')
                    return
                }
                else {
                    reqCreateOrder({
                        shippingId:this.form.shippingId
                    }).then((result)=>{
                        if(result.code===0)
                        {
                            this.$store.commit('ShopCart/clearCart')
                            this.showShopCart=false
                            this.form.shippingId=''
                            this.$message.success('成功提交订单!')
                            this.form.shippingId=''
                            this.dialogFormVisible = false
                            this.$router.push('/orders')
                        }
                        else
                        {
                            this.$message.error(result.msg)
                        }
                    })
                }

            },
            deletebook (index) {
                this.$store.commit('ShopCart/deletebook', index)
            },

            substract (count, index) {
                if (count > 1)
                    this.$store.commit('ShopCart/substract', index)
            },

            add (count, index) {
                    this.$store.commit('ShopCart/add', index)
            },

            submitOrder () {
                if(this.shippingList.length===0)
                {
                    this.$message.info('请先新建收货地址!')
                    this.showShopCart=false
                    this.$router.push('/users')
                    return
                }
                this.dialogFormVisible = true
            }
        }
    }
</script>

<style scoped>
    .shopcart{
        height: 100%;
        width: 360px;
        position: fixed;
        left: 0%;
        top: 0%;
        float: left;
        z-index: 999;
        overflow: auto;
    }

    .wrap{
        display: flex;
    }

    .center{
        margin: auto;
    }

    .float{
        width: 50px;
        height: 50px;
        border-radius: 50px;
        float: left;
        position: fixed;
        top: 50%;
        left: 360px;
        z-index: 999;
    }

    .shopcart-content{
        width:200px;
        height: 1200px;
        position: fixed;
        left: 0%;
        top: 0%;
        float: left;
        z-index: 999;
    }

    .shopcart-float{
        width: 50px;
        height: 50px;
        border-radius: 50px;
        float: left;
        position: fixed;
        top: 50%;
        left: 0%;
        z-index: 999;
    }

    .shopcart-enter-active {
        transition: all 0.5s ease;
    }
    .shopcart-leave-active {
        transition: all .5s ease;
    }
    .shopcart-enter, .shopcart-leave-to{
        transform: translateX(-50px);
        opacity: 0;
    }

    .float-enter-active {
        transition: all .8s ease;
    }

    .float-enter, .float-leave-to{
        transform: translateX(60px);
        opacity: 0;
    }

    .imgbox{
        font-size: 0;
        width: 80px;
        height: 80px;
        text-align: center;
    }
    .imgbox img{
        max-height: 100%;
        max-width: 100%;
        vertical-align: middle;
    }

    .name{
        font-family: 等线;
        font-size: 16px;
    }

    .author{
        font-family: 仿宋;
        font-size: 14px;
    }

    .money{
        font-family: tohoma,arial;
        font-size: 15px;
    }

    .totaltxt{
        font-family: 仿宋;
        font-size: 18px;
        padding-right: 10px;
        padding-left: 10px;
    }

    .totalmoney{
        font-weight: 700;
        font-size: 22px;
        font-family: tohoma,arial;
    }
</style>
