<template>
    <el-container>

        <el-main>

            <el-tabs v-model="activeName" @tab-click="handleTabsClick">
                <el-tab-pane label="全部投资" name="totalInvestment"></el-tab-pane>
                <el-tab-pane label="合约中投资" name="contractInvestment"></el-tab-pane>
                <el-tab-pane label="已完成投资" name="completeInvestment"></el-tab-pane>
            </el-tabs>

            <div class="block">
                <el-table
                        :data="investmentRecordsCache"
                        style="width: 100%"
                        :row-class-name="letterRowClassName">
                    <el-table-column
                            prop="purchase_id"
                            label="购买编号"
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
                            label="投资金额"
                    ></el-table-column>
                    <el-table-column
                            prop="loan_month"
                            label="期数"
                    ></el-table-column>
                    <el-table-column
                            prop="interest_rate"
                            label="利率(%)"
                    ></el-table-column>
                    <el-table-column
                            prop="create_time"
                            label="投资时间"
                    ></el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                    ></el-table-column>

                    <el-table-column>
                        <div slot-scope="scope">
                            <el-button @click="handleDialogOpen(scope.$index, scope.row)" class="greenbutton" type="primary"><span>详细信息</span></el-button>
                        </div>
                    </el-table-column>
                </el-table>

                <div class="right">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            layout="total, prev, pager, next, jumper"
                            :current-page="current_page"
                            :page-size="page_size"
                            :total="investmentRecordsCacheNum">
                    </el-pagination>
                </div>


                <el-dialog
                        :title="investmentRecord.title"
                        :visible.sync="dialogVisible"
                        width="940px"
                        :before-close="handleDialogClose">

                    <InvestmentRecordsDetails
                        v-bind:request="investmentRecord">
                        <div slot="buttons">
                            <div v-if="investmentRecord.status == '已投资'">
                                    <el-button type="success" round style="outline:none;margin: 20px;width: 60%">已投资</el-button>
                                    <el-button type="info" round style="outline:none;margin: 20px;width: 60%">取消投资</el-button>
                            </div>
                            <div v-if="investmentRecord.status == '已完成'">
                                    <el-button type="success" round style="outline:none;margin: 20px;width: 60%">已完成</el-button>
                                    <el-button type="info" round style="outline:none;margin: 20px;width: 60%">取消投资</el-button>
                            </div>
                        </div>
                        <div slot="details">
                            <div v-show="investmentRecord.status == '已投资'">
                                <el-tabs v-model="activeName2" type="border-card">
                                    <el-tab-pane label="资金回收计划" name="first">
                                        <el-table
                                            :data="invest_plan"
                                            style="width: 100%">
                                            <el-table-column
                                                prop="repay_date"
                                                label="回收日期">
                                            </el-table-column>
                                            <el-table-column
                                                prop="amount"
                                                label="回收金额">
                                            </el-table-column>
                                            <el-table-column
                                                prop="status"
                                                label="回收状态">
                                            </el-table-column>
                                        </el-table>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </div>
                    </InvestmentRecordsDetails>
                </el-dialog>



            </div>
        </el-main>
    </el-container>
</template>

<script>
    import {mapState} from 'vuex'
    import InvestmentRecordsDetails from '../../../components/Detail/InvestmentRecordsDetails.vue'
    export default {
        name: "InvestmentRecords",
        data () {
            return {
                activeName: 'totalInvestment',
                activeName2: "first",
                dialogVisible: false,
                investmentRecord:{}
            }
        },
        computed: {
            ...mapState({
                isLogin:state => state.User.isLogin,
                current_page: state=>state.InvestmentRecords.current_page,
                page_size: state=>state.InvestmentRecords.page_size,
                investmentRecordsCache: state=>state.InvestmentRecords.investmentRecordsCache,
                investmentRecordsCacheNum: state=>state.InvestmentRecords.investmentRecordsCacheNum,

                invest_plan:state => state.InvestmentRecords.invest_plan
            })
        },
        components:{
            InvestmentRecordsDetails
        },
        beforeMount(){
            this.$store.commit('User/getSessionUser')
            this.$store.commit('Credit/getSessionCredit')
        },
        mounted() {
            if(!this.isLogin){
                this.$router.push("/")
                return
            }
            var totalLoan = {
                page_num:this.$store.state.InvestmentRecords.current_page,
            }
            this.$store.dispatch('InvestmentRecords/getTotalInvestmentRecords', totalLoan)
        },
        methods:{
            //table相关函数
            letterRowClassName(){
            },

            //Tab栏相关函数
            handleTabsClick (tab, event){
                this.$store.commit('InvestmentRecords/init')
                this.getContent()
            },

            //dialog相关函数
            handleDialogOpen(index, row){
                this.investmentRecord = row;
                if(row.status = "已投资"){
                    var purchaseID = row.purchase_id
                    this.$store.dispatch("InvestmentRecords/getInvestPlan", purchaseID)
                }else{
                    this.$store.commit("InvestmentRecords/updateInvestPlan", [])
                }
                
                this.dialogVisible = true;
            },
            handleDialogClose(){
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
                this.$store.commit('InvestmentRecords/updateCurrentPage', val)
                this.getContent()
            },


            getContent(){
                if (this.activeName == 'totalInvestment'){
                    var totalInvestmentData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('InvestmentRecords/getTotalInvestmentRecords', totalInvestmentData)
                }
                if (this.activeName == 'contractInvestment'){
                    var contractInvestmentData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('InvestmentRecords/getContractInvestmentRecords', contractInvestmentData)
                }
                if (this.activeName == 'completeInvestment'){
                    var completeInvestmentData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('InvestmentRecords/getCompleteInvestmentRecords', completeInvestmentData)
                }
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
