<template>
    <el-container>

        <el-main>

            <el-tabs v-model="activeName" @tab-click="handleTabsClick">
                <el-tab-pane label="全部逾期" name="totalOverdue"></el-tab-pane>
            </el-tabs>

            <div class="block">
                <el-table
                        :data="totalOverdue"
                        style="width: 100%"
                        :row-class-name="letterRowClassName">
                    <el-table-column
                            prop="purchase_id"
                            label="投资编号"
                    ></el-table-column>
                    <el-table-column
                            prop="borrower_id"
                            label="借资人"
                    ></el-table-column>
                    <el-table-column
                            prop="investor_id"
                            label="投资人"
                    ></el-table-column>
                    <el-table-column
                            prop="title"
                            label="标题"
                    ></el-table-column>
                    <el-table-column
                            prop="amount"
                            label="逾期金额"
                    ></el-table-column>
                    <!-- <el-table-column
                            prop="update_time"
                            label="逾期开始时间"
                    ></el-table-column> -->
                </el-table>

                <div class="right">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="current_page"
                            layout="total, prev, pager, next, jumper"
                            :page-size="page_size"
                            :total="totalOverdueNum">
                    </el-pagination>
                </div>

            </div>
        </el-main>
    </el-container>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "Overdue",
        data () {
            return {
                activeName: 'totalOverdue',
                currentPage:1,
                dialogVisible: false,

            }
        },
        computed: {
            ...mapState({
                isGuarantorLogin: state=>state.Guarantor.isGuarantorLogin,
                totalOverdue: state=>state.Overdue.totalOverdue,
                totalOverdueNum:state=>state.Overdue.totalOverdueNum,
                page_size: state=>state.Overdue.page_size,
                current_page:state=>state.Overdue.current_page
            })
        },
        mounted(){
            if(!this.isGuarantorLogin){
                this.$router.push('/')
                return
            }
            var totalOverdueData = {
                current_page: this.$store.state.Overdue.current_page
            }
            this.$store.dispatch("Overdue/getTotalOverdue", totalOverdueData)
        },
        methods:{
            //table相关函数
            letterRowClassName(){
            },

            handleCurrentChange(val){
                this.$store.state.Overdue.current_page = val
                var totalOverdueChange = {
                current_page: this.$store.state.Overdue.current_page
                }
                this.$store.dispatch("Overdue/getTotalOverdue", totalOverdueChange)
            },
            handleTabsClick(){

            }
        }
    }

</script>

<style scoped>

    .title{

    }
    .title h1{
        text-align: center;
        font-size: 48px;
    }

    .el-table .warning-row{
        blackground:oldlace;
    }

    .el-table .success-row{
        background:#f0f9eb;
    }

    .right{
        float:right;
    }
    .div-search-inline{
        float: right;
    }
    .letterDetails{
        font-size: 18px;
    }

    .div-letter-details-inline{
        display: inline-block;
        font-size: 18px;
    }

    .div-letter-details-inline h1{
        font-size: 18px;
        font-weight: bold;
    }

    .div-letter-details-inline span{
        text-decoration: underline;
    }

    .div-letter-details-inline textarea{
        display: block;
        font-size: 18px;
        font-weight: normal;
        width: 900px;
        min-height: 300px;
    }

    .greenbutton{
        background-color: #1C745A !important;
    }



</style>
