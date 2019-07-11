<template>
    <el-container>
        <el-main>
            <el-tabs v-model="activeName" @tab-click="handleTabsClick">
                <el-tab-pane label="全部借款" name="totalLoan"></el-tab-pane>
                <el-tab-pane label="未审核借款" name="neverReadLoan"></el-tab-pane>
                <el-tab-pane label="已通过借款" name="passLoan"></el-tab-pane>
                <el-tab-pane label="未通过借款" name="rejectLoan"></el-tab-pane>
                <el-tab-pane label="合约中借款" name="contractLoan"></el-tab-pane>
                <el-tab-pane label="已完成借款" name="completeLoan"></el-tab-pane>
                <el-tab-pane label="已弃用借款" name="expiredLoan"></el-tab-pane>
            </el-tabs>

            <div class="block">
                    <el-table
                            v-bind:data="loanRequestsCache"
                            style="width: 100%"
                            :row-class-name="letterRowClassName">
                        <el-table-column
                                prop="application_id"
                                label="申请编号"
                        ></el-table-column>
                        <el-table-column
                                prop="borrower_id"
                                label="借款人"
                        ></el-table-column>
                        <el-table-column
                                prop="title"
                                label="借款标题"
                        ></el-table-column>
                        <el-table-column
                                prop="amount"
                                label="借款金额"
                        ></el-table-column>
                        <el-table-column
                                prop="loan_month"
                                label="还款期数"
                        ></el-table-column>
                        <el-table-column
                                prop="interest_rate"
                                label="利率(%)"
                        ></el-table-column>
                        <el-table-column
                                prop="create_time"
                                label="申请时间"
                        ></el-table-column>
                        <el-table-column
                                prop="status"
                                label="申请状态"
                        ></el-table-column>

                        <el-table-column>
                            <template slot-scope="scope">
                                <el-button type="primary" class="greenbutton" @click="handleDialogOpen(scope.$index, scope.row)">详细信息</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                <div class="right">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="current_page"
                            layout="total, prev, pager, next, jumper"
                            :page-size="page_size"
                            :total="loanRequestsCacheNum">
                    </el-pagination>
                </div>


                <el-dialog
                        :title="loanRequest.title"
                        :visible.sync="dialogVisible"
                        width="940px"
                        :before-close="handleDialogClose">

                    <!-- 详情页1开始 -->
                        <LoanRecordsDetails
                            v-bind:request="loanRequest">
                            <div slot="buttons">
                                <div v-if="loanRequest.status == '未审核'">
                                    <el-button type="success" round style="outline:none;margin: 20px;width: 60%">借款未审核</el-button>
                                    <el-button type="success" round style="outline:none;margin: 20px;width: 60%" @click="cancelLoanRequest">取消借款</el-button>
                                </div>
                                <div v-if="loanRequest.status == '已接受'">
                                    <el-button type="success" round style="outline:none;margin: 20px;width: 60%">借款已通过</el-button>
                                    <el-button type="info" round style="outline:none;margin: 20px;width: 60%">取消借款</el-button>
                                </div>
                                <div v-else-if="loanRequest.status == '已被拒'">
                                    <el-button type="info" round style="outline:none;margin: 20px;width: 60%">借款未通过</el-button>
                                    <el-button type="info" round style="outline:none;margin: 20px;width: 60%">取消借款</el-button>
                                </div>
                                <div v-else-if="loanRequest.status == '已合约' || loanRequest.status == '已逾期'">
                                        <el-button type="info" round style="outline:none;margin: 20px;width: 60%">借款已合约</el-button>
                                        <el-button type="info" round style="outline:none;margin: 20px;width: 60%">取消借款</el-button>
                                </div>
                                <div v-else-if="loanRequest.status == '已完成'">
                                        <el-button type="info" round style="outline:none;margin: 20px;width: 60%">借款已完成</el-button>
                                        <el-button type="info" round style="outline:none;margin: 20px;width: 60%">取消借款</el-button>
                                </div>
                                <div v-else-if="loanRequest.status == '已弃用'">
                                    <el-button type="info" round style="outline:none;margin: 20px;width: 60%">借款已取消</el-button>
                                    <el-button type="info" round style="outline:none;margin: 20px;width: 60%">取消借款</el-button>
                                </div>
                            </div>

                            <div slot="details">
                                <div v-show="loanRequest.status == '已合约' || loanRequest.status == '已逾期' ">
                                    <el-tabs v-model="activeName2" type="border-card">
                                        <el-tab-pane label="还款计划" name="first">
                                            <el-table
                                                :data="repay_plan"
                                                style="width: 100%">
                                                <el-table-column
                                                    prop="repay_date"
                                                    label="还款日期">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="amount"
                                                    label="还款金额">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="status"
                                                    label="还款状态">
                                                </el-table-column>
                                            </el-table>
                                        </el-tab-pane>
                                    </el-tabs>
                                </div>
                            </div>

                        </LoanRecordsDetails>
                   <!--  -->
                </el-dialog>

            </div>
        </el-main>
    </el-container>
</template>

<script>
    import {mapState} from 'vuex'
    import LoanRecordsDetails from '../../../components/Detail/LoanRecordsDetails.vue'
    export default {
        name: "LoanRecords",
        data () {
            return {
                activeName:'totalLoan',
                activeName2: "first",
                dialogVisible: false,
                dialogTwoVisible: false,
                loanRequest:{},
            }
        },
        computed:{
            ...mapState({
                isLogin:state => state.User.isLogin,
                user_message: state=> state.User.user_message,

                loanRequestsCache: state=>state.LoanRecords.loanRequestsCache,
                loanRequestsCacheNum: state=>state.LoanRecords.loanRequestsCacheNum,

                current_page: state=>state.LoanRecords.current_page,
                page_size: state=>state.LoanRecords.page_size,

                repay_plan : state=>state.LoanRecords.repay_plan

            })
        },
        mounted(){
            if(!this.isLogin){
                this.$router.push("/")
                return
            }
            var totalLoan = {
                page_num:this.$store.state.LoanRecords.current_page,
            }
            this.$store.dispatch('LoanRecords/getTotalLoanRequests', totalLoan)
        },
        components:{
            LoanRecordsDetails
        },
        methods:{
            //table相关函数
            letterRowClassName(){

            },

            //Tab栏相关函数
            handleTabsClick (tab, event){
                this.$store.commit('LoanRecords/init')
                this.getContent()
            },

            //dialog相关函数
            handleDialogOpen(index, row){
                this.loanRequest = row;
                if(row.status == '已合约' || row.status == '已逾期'){
                    var appData = {
                        application_id: row.application_id
                    }
                    this.$store.dispatch("LoanRecords/getRepayPlan", appData)
                }
                else{
                    this.$store.commit("LoanRecords/updateRepayPlan", [])
                }
                this.dialogVisible = true;
            },
            handleDialogClose(done){
                this.dialogVisible = false;
                this.getContent()
            },
            handleDialogDeleteButton (){

            },
            handleDialogCloseButton(){
                this.dialogVisible = false;
                this.getContent()
            },
            handleCurrentChange(val){
                this.$store.commit('LoanRecords/updateCurrentPage', val)
                this.getContent()
            },



            //获取页面内容
            getContent(){
                if (this.activeName == 'totalLoan'){
                    var totalData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('LoanRecords/getTotalLoanRequests', totalData)
                }
                if (this.activeName == 'neverReadLoan'){
                    var neverReadData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('LoanRecords/getNeverReadLoanRequests', neverReadData)
                }
                if (this.activeName == 'passLoan'){
                    var passLoanData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('LoanRecords/getPassLoanRequests', passLoanData)
                }
                if (this.activeName == 'rejectLoan'){
                    var rejectLoanData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('LoanRecords/getRejectLoanRequests', rejectLoanData)
                }
                if (this.activeName == 'contractLoan'){
                    var contractLoanData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('LoanRecords/getContractLoanRequests', contractLoanData)
                }
                if (this.activeName == 'completeLoan'){
                    var completeLoanData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('LoanRecords/getCompleteLoanRequests', completeLoanData)
                }
                if (this.activeName == 'expiredLoan'){
                    var expiredLoanData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('LoanRecords/getExpiredLoanRequests', expiredLoanData)
                }
            },

            //取消借款
            cancelLoanRequest(){
                var cancel = {
                    application_id: this.loanRequest.application_id
                }
                this.$store.dispatch("LoanRecords/cancelLoanRequest", cancel)
                this.dialogVisible = false;
                this.getContent()
                location.reload()
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
