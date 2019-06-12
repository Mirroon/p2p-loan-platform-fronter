<template>
    <div class="container">
        <el-table
                :data="orders"
                border
                style="width: 100%">
            <el-table-column
                    prop="creatTime"
                    label="时间">
            </el-table-column>
            <el-table-column
                    prop="receiverName"
                    label="收货人姓名">
            </el-table-column>
            <el-table-column
                    prop="receiverPhone"
                    label="收货人电话">
            </el-table-column>
            <el-table-column
                    prop="receiverAddress"
                    label="收货人地址">
            </el-table-column>
            <el-table-column
                    prop="orderStatus"
                    label="订单状态">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="210">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            v-if="scope.row.statusNum==0"
                            @click="handleCancel(scope.$index, scope.row)">取消</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.statusNum==0"
                            @click="handlePay(scope.$index, scope.row)">支付</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="c">
        <br />
        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="30"
                layout="total, prev, pager, next, jumper"
                :pager-count="11"
                :total="orders.length">
        </el-pagination>
        <br /><br />
        </div>
        <el-dialog title="订单详情" :visible.sync="detailDialogVisible">
            <Order :order="order"></Order>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="detailDialogVisible = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Order from '../../components/Order/Order'
    import {reqCancelOrder,reqPayOrder} from "../../api"

    export default {
        name: "Orders",
        mounted() {
            if(!this.isLogin)
            {
                this.$router.push('/login')
                return
            }
            this.$store.dispatch('Orders/getOrderList',0)
        },
        data() {
            return {
                filter: '',
                fuck:'',
                currentPage:1,
                detailDialogVisible:false
            }
        },
        components: {
            Order
        },
        computed: {
            ...mapState({
                orders: state => state.Orders.orders,
                isLogin: state=> state.Person.isLogin,
                order: state=>state.Orders.orderDetail
            })
        },
        methods: {
            handleCurrentChange(val) {
                // 切换页码时，要获取每页显示的条数
                this.$store.dispatch('Orders/getOrderList',val-1)
                // 改变默认的页数
                this.currentPage=val
            },
            handleDetail(index, row) {
                this.$store.dispatch('Orders/getOrderDetail',row.orderId)
                this.detailDialogVisible=true
            },
            handlePay(index, row) {
                reqPayOrder({
                    orderId:row.orderId
                }).then((result)=>{
                    if(result.code===0)
                    {
                        this.$store.dispatch('Orders/getOrderList',0)
                        this.$message.success(result.msg)
                    }
                    else {
                        this.$message.error(result.msg)
                    }
                })
            },
            handleCancel(index, row) {
                reqCancelOrder({
                    orderId:row.orderId
                }).then((result)=>{
                    if(result.code===0)
                    {
                        this.$store.dispatch('Orders/getOrderList',0)
                        this.$message.success(result.msg)
                    }
                    else {
                        this.$message.error(result.msg)
                    }
                })
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
