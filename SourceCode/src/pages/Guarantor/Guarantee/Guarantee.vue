<template>
    <el-container>

        <el-main>

            <el-tabs v-model="activeName" @tab-click="handleTabsClick">
                <el-tab-pane label="全部申请" name="totalGuarantee"></el-tab-pane>
                <el-tab-pane label="待通过申请" name="waitGuarantee"></el-tab-pane>
                <el-tab-pane label="已通过申请" name="passGuarantee"></el-tab-pane>
                <el-tab-pane label="未通过申请" name="rejectGuarantee"></el-tab-pane>
            </el-tabs>

            <div class="block">
                <el-table
                        :data="guaranteeRequestsCache"
                        style="width: 100%;"
                        :row-class-name="letterRowClassName">
                    <el-table-column
                            prop="application_id"
                            label="申请编号"
                    ></el-table-column>
                    <el-table-column
                            prop="borrower_name"
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
                            label="担保申请时间"
                    ></el-table-column>
                    <el-table-column
                            prop="status"
                            label="担保处理状态"
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
                            layout="total, prev, pager, next, jumper"
                            :current-page="current_page"
                            :page-size="page_size"
                            :total="guaranteeRequestsCacheNum">
                    </el-pagination>
                </div>


                <el-dialog
                        :title="guaranteeRequest.title"
                        :visible.sync="dialogVisible"
                        width="940px"
                        :before-close="handleDialogClose">
                    <!-- 详情页面 -->

                    <div class="invest-plan">
                            <div class="invest-left-info " >
                                <div class="invest-info-num">
                                    <table class="info">
                                        <tbody>
                                        <tr class="num">
                                            <td class="orange border-right"><strong>{{guaranteeRequest.interest_rate}}</strong>%</td>
                                            <td class="amount border-right"><strong>{{guaranteeRequest.amount}}</strong>元</td>
                                            <td class="months"><strong>{{guaranteeRequest.loan_month}}</strong>个月</td>
                                        </tr>
                                        <tr class="text">
                                            <td class="border-right">利率</td>
                                            <td class="border-right">投资金额</td>
                                            <td>回收时长</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="invest-info-data">
                                    <span style="margin: 0px 15px">编号<span>{{guaranteeRequest.application_id}}</span></span>
                                    <span style="margin: 0px 15px">创建时间:<span>{{guaranteeRequest.create_time}}</span></span>
                                    <span style="margin: 0px 15px">下架时间:<span>{{guaranteeRequest.purchase_deadline}}</span></span>
                                </div>
                            </div>
                            <div class="invest-right-info">
                                <div v-if="guaranteeRequest.status == '待通过'">
                                    <el-button type="success" round style="outline:none;margin: 20px;width: 60%" @click="handleDialogAcceptButton">确认担保</el-button>
                                    <el-button type="info" plain round style="outline:none;margin: 20px;width: 60%" @click="handleDialogRejectButton">拒绝担保</el-button>
                                </div>
                                <div v-else>
                                        <el-button type="info" round style="outline:none;margin: 20px;width: 60%">确认担保</el-button>
                                        <el-button type="info" round style="outline:none;margin: 20px;width: 60%">拒绝担保</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="invest-details" style="margin-top: 15px">

                            <el-tabs v-model="activeName2" type="border-card">
                                <el-tab-pane label="贷款人信息" name="first" >
                                    <div style="margin-left: 20px;margin-top: 10px;margin-bottom: 20px ">
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle" >姓名:</span>
                                            <span class="loanInfoContent">{{guaranteeUserInfo.name}}</span>
                                        </div>
                                        <div class="loanInfo">
                                                <span class="loanInfoTitle">电话:</span>
                                                <span class="loanInfoContent">{{guaranteeUserInfo.phone}}</span>
                                        </div>
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle">地址:</span>
                                            <span class="loanInfoContent">{{guaranteeUserInfo.address}}</span>
                                        </div>
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle">月收入:</span>
                                            <span class="money loanInfoContent">{{guaranteeUserInfo.month_income}}</span>
                                        </div>
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle">家庭年收入:</span>
                                            <span class="money loanInfoContent">{{guaranteeUserInfo.family_income}}</span>
                                        </div>
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle">资产:</span>
                                            <span class="money loanInfoContent">{{guaranteeUserInfo.assets}}</span>
                                        </div>
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle">家庭人数:</span>
                                            <span class="loanInfoContent">{{guaranteeUserInfo.family_number}}</span>
                                        </div>
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle">债务:</span>
                                            <span class="money loanInfoContent">{{guaranteeUserInfo.debts}}</span>
                                        </div>
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle">信用分:</span>
                                            <span class="loanInfoContent">{{guaranteeUserInfo.score}}</span>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="贷款项目信息" name="second">
                                    <div style="margin-left: 20px;margin-top: 10px;margin-bottom: 20px ">
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle" >项目名称:</span>
                                            <span class="loanInfoContent">{{guaranteeRequest.title}}</span>
                                        </div>
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle">金额:</span>
                                            <span class="money loanInfoContent">{{guaranteeRequest.amount}}</span>
                                        </div>
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle">利率:</span>
                                            <span class="percent loanInfoContent">{{guaranteeRequest.interest_rate}}%</span>
                                        </div>
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle">项目时长(总月数):</span>
                                            <span class=" loanInfoContent">{{guaranteeRequest.loan_month}}</span>
                                        </div>
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle">创建时间:</span>
                                            <span class=" loanInfoContent">{{guaranteeRequest.create_time}}</span>
                                        </div>
                                        <div class="loanInfo">
                                            <span class="loanInfoTitle">投资截止时间:</span>
                                            <span class="loanInfoContent">{{guaranteeRequest.purchase_deadline}}</span>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="被担保人借款记录" name="third">
                                    <el-table
                                        :data="guaranteeUserHistory"
                                        style="width: 100%">
                                        <el-table-column
                                            prop="purchase_id"
                                            label="订单编号">
                                        </el-table-column>
                                        <el-table-column
                                            prop="money"
                                            label="借款金额">
                                        </el-table-column>
                                        <el-table-column
                                            prop="time"
                                            label="借款时间">
                                        </el-table-column>
                                        <el-table-column
                                            prop="is_overdue"
                                            label="是否逾期">
                                        </el-table-column>
                                    </el-table>

                                    <el-pagination
                                        @current-change="handleDialogCurrentChange"
                                        layout="total, prev, pager, next, jumper"
                                        :current-page="dialog_current_page"
                                        :page-size="dialog_page_size"
                                        :total="guaranteeUserHistoryNum">

                                    </el-pagination>

                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    <!-- 详情页结束 -->

                </el-dialog>



            </div>
        </el-main>
    </el-container>
</template>

<script>
    import {mapState} from 'vuex'
    import {reqAcceptGuaranteeRequests, reqRejectGuaranteeRequests} from '../../../api'
    export default {
        name: "Guarantee",

        data () {
            return {
                activeName: 'totalGuarantee',
                activeName2: 'first',
                dialogVisible: false,
                guaranteeRequest: {},

            }
        },
        computed: {
            ...mapState({
                isGuarantorLogin: state=>state.Guarantor.isGuarantorLogin,
                guaranteeRequestsCache: state=>state.Guarantee.guaranteeRequestsCache,
                guaranteeRequestsCacheNum: state=>state.Guarantee.guaranteeRequestsCacheNum,

                current_page: state=>state.Guarantee.current_page,
                page_size: state=>state.Guarantee.page_size,
                guaranteeUserInfo: state=> state.Guarantee.guaranteeUserInfo,

                guaranteeUserHistory: state=> state.Guarantee.guaranteeUserHistory,
                guaranteeUserHistoryNum: state=>state.Guarantee.guaranteeUserHistoryNum,
                dialog_current_page: state=> state.Guarantee.dialog_current_page,
                dialog_page_size: state=>state.Guarantee.dialog_page_size
            })
        },
        mounted() {
            if(!this.isGuarantorLogin){
                this.$router.push('/')
                return
            }
            var totalGuarantee = {
                page_num:this.$store.state.Guarantee.current_page,
            }
            this.$store.dispatch('Guarantee/getTotalGuaranteeRequests', totalGuarantee)
        },
        methods:{
            //table相关函数
            letterRowClassName(){
            },

            //Tab栏相关函数
            handleTabsClick (tab, event){
                this.$store.commit('Guarantee/init')
                this.getContent()
            },

            //dialog相关函数
            handleDialogOpen(index, row){
                this.guaranteeRequest = row;

                this.$store.dispatch('Guarantee/getGuaranteeUserInfo', row.borrower_id)
                this.$store.commit('Guarantee/initDialog')
                var dialogData ={
                    user_id: row.borrower_id,
                    page_num: this.dialog_current_page,
                    page_size: this.dialog_page_size
                }
                this.$store.dispatch('Guarantee/getGuaranteeUserHistory', dialogData)

                // this.guaranteeRequest.interest_rate = row.interest_rate * 100
                this.dialogVisible = true;
            },
            handleDialogClose(done){
                this.dialogVisible = false;
                this.getContent()
            },
            handleDialogAcceptButton (){
                reqAcceptGuaranteeRequests(this.guaranteeRequest.application_id).then((respond) => {
                    if(respond.code == 0){
                        this.$message({
                            type: "success",
                            message: "已接受担保"
                        })
                        this.dialogVisible = false;
                        this.getContent()
                    }else{
                        this.$message.error(respond.msg)
                    }
                }).catch(()=>{
                    this.$message.error("登录失败，请检查网络连接")
                })
            },
            handleDialogRejectButton(){
                reqRejectGuaranteeRequests(this.guaranteeRequest.application_id).then((respond) => {
                    if(respond.code == 0){
                        this.$message({
                            type: "success",
                            message: "已拒绝担保"
                        })
                        this.dialogVisible = false;
                        this.getContent()
                    }else{
                        this.$message.error(respond.msg)
                    }
                }).catch(()=>{
                    this.$message.error("登录失败，请检查网络连接")
                })
            },
            handleDialogCloseButton(){
                this.dialogVisible = false;
                this.getContent()
            },
            handleCurrentChange(val){
                this.$store.commit('Guarantee/updateCurrentPage', val)
                this.getContent()
            },

            handleDialogCurrentChange(val){
                this.$store.commit('Guarantee/updateDialogCurrentPage', val)
                var dialog ={
                    user_id: this.guaranteeRequest.borrower_id,
                    page_num: this.dialog_current_page
                }
                this.$store.dispatch('Guarantee/updateGuaranteeUserHistory', dialog)
            },


            getContent(){
                if (this.activeName == 'totalGuarantee'){
                    var totalGuaranteeData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('Guarantee/getTotalGuaranteeRequests', totalGuaranteeData)
                }
                if (this.activeName == 'waitGuarantee'){
                    var waitGuaranteeData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('Guarantee/getWaitGuaranteeRequests', waitGuaranteeData)
                }
                if (this.activeName == 'passGuarantee'){
                    var passGuaranteeData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('Guarantee/getPassGuaranteeRequests', passGuaranteeData)
                }
                if (this.activeName == 'rejectGuarantee'){
                    var rejectGuaranteeData = {
                        page_num: this.current_page,
                    }
                    this.$store.dispatch('Guarantee/getRejectGuaranteeRequests', rejectGuaranteeData)
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


    /* 详情页css */

    /*投资计划左侧栏*/
    .invest-left-info {
        width: 65%;
        display: inline-block;
        border-right: 1px solid #e4e4e4;
    }
    /*投资计划右侧栏*/
    .invest-right-info{
        width: 35%;
        float: right;
        text-align: center;
        /*padding-top: 40px;*/
        margin-top: 40px;
    }


    /*左侧-数据*/
    .invest-info-num{
        padding: 0 4px;
        width: 100%;
        margin-top: 40px;
    }
    /*左侧-数据-表格总属性*/
    .info{
        width: 100%;
        margin: 0 auto;
        /*font-family: "microsoft yahei";*/
    }
    /*左侧-数据*/
    .num {
        font-size: 18px;
        padding: 7px 0;
    }
    .text{
        font-size: 14px;
        padding: 0px;
    }
    .border-right{
        border-right: 1px solid #e4e4e4;

    }

    .orange{
        color: #ff7200;
        font-size: 24px;
        /*font-family: "microsoft yahei";*/

    }
    .invest-info-data{
        margin: 40px 0px;
        width: 100%;
        display: inline-block;
        font-size: 14px;
        color: #696969;
        text-align: center;
    }

    table {
        border-collapse: collapse;
        border-spacing: 2px;
        table-layout: fixed;
        margin-top: 10px;
    }
    /*行标签属性*/
    tr{
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
    }
    /*标签单元格属性*/
    td{
        color: #696969;
        text-align:center;
    }
    strong{
        font-size: 50px;
    }
</style>
