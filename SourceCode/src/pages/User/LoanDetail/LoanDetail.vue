<template>
    <body class="text-center">
    <div class="center">
        <el-form v-show="true" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="7em">
            <el-form-item>
                <h1 class="h2 font-weight-normal mb-3">借款资料填写</h1>
            </el-form-item>
            <el-form-item>
                <h2 class="h5 font-weight-normal mb-3">最大借款额度：{{quota}}</h2>
            </el-form-item>
            <el-form-item label="借款金额" prop="amount">
                <el-input v-model.trim="ruleForm.amount" placeholder="请输入借款金额（单位：元）"></el-input>
            </el-form-item>
            <el-form-item label="借款月数" prop="loan_month">
                <el-select v-model.trim="ruleForm.loan_month" placeholder="请选择借款月数" style="width: 100%">
                    <el-option  v-for="(item,index) in loan_month_option" :key=index :label=item  :value=item.toString()></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="借款利率" prop="interest_rate">
                <el-select v-model.trim="ruleForm.interest_rate" placeholder="请选择借款利率" style="width: 100%">
                    <el-option  v-for="(item,index) in interest_rate_option" :key=index :label="(item*100).toFixed(2)+'%'"  :value=item.toString()></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="借款投放标题" prop="loan_title">
                <el-input v-model.trim="ruleForm.loan_title" placeholder="请输入借款投放标题"></el-input>
            </el-form-item>
            <el-form-item label="投放截止日期" prop="purchase_deadline">
                <el-date-picker
                        v-model.trim="choose_deadline" :editable="false"
                        type="date" placeholder="请选择截止日期" style="width: 100%;"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button class="greenbutton" type="primary" icon="el-icon-upload" @click.prevent="submit('ruleForm')">
                    确认并提交审核
                </el-button>
                <el-button  icon="el-icon-upload" @click="$router.push('/')">
                    取消借款
                </el-button>
            </el-form-item>
        </el-form>
    </div>
    </body>
</template>

<script>
    import {mapState} from 'vuex'
    import {reqLoanConfig,reqNewLoan} from "../../../api";

    export default {
        name: "LoanDetail",
        mounted(){
            if(!this.reachLoanDetail){
                this.$router.push('/')
            }
            else{
                this.$store.commit('Credit/changeReach')
            }
            reqLoanConfig().then((response)=>{
                if(response.code===0){
                    this.loan_month_option=response.data.loan_months;
                    this.interest_rate_option=response.data.interest_rates
                }else{
                    this.$message.error(response.msg)
                }
            })
        },
        computed:{
            ...mapState({
                reachLoanDetail:state=>state.Credit.reachLoanDetail,
                quota:state=>state.Credit.quota,
                isLogin:state=>state.User.isLogin
            })
        },
        data()
        {
            var checkAmount = (rule, value, callback)=> {
                const reg=/^([1-9]\d*)(\.\d{1,2})?$/
                if(value==='')
                {
                    callback(new Error('请填写借款金额'));

                }
                else if(reg.test(value))
                {
                    let testNum=Number(value)
                    if(testNum>this.quota)
                    {
                        callback(new Error('请勿超过最大借款额度'))
                    }
                    callback();
                }
                else {
                    callback(new Error('请填写合法的金额'))
                }
            }
            var checkLoanMonth = (rule, value, callback)=> {
                if(value==='')
                {
                    callback(new Error('请填写借款月数'));
                }
                else {
                    callback()
                }
            }
            var checkInterestRate = (rule, value, callback)=> {
                if(value==='')
                {
                    callback(new Error('请选择借款利率'));
                }
                else {
                    callback()
                }
            }
            var checkDeadline = (rule, value, callback)=>{
                if(value==='')
                {
                    callback(new Error('请选择借款投放截止日期'))
                }
                else {
                   callback()
                }
            }
            var checkLoanTitle = (rule, value, callback)=> {
            if(value==='')
            {
                callback(new Error('请填写借款投放标题'));
            }
            else if(value.length<=20){
                callback()
            }
            else {
                callback(new Error('标题不能超过20个字'))
                }
            }
            return {
                loan_month_option:[],
                interest_rate_option:[],
                ruleForm: {
                    amount:'',
                    loan_month:'',
                    loan_title:'',
                    interest_rate:'',
                    purchase_deadline:''
                },
                choose_deadline:'',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                rules: {
                    interest_rate:[
                        {validator: checkInterestRate, trigger: 'change'}
                    ],
                    amount: [
                        {validator: checkAmount, trigger: 'change'},
                    ],
                    loan_month: [
                        {validator: checkLoanMonth, trigger: 'change'},
                    ],
                    loan_title: [
                        {validator: checkLoanTitle, trigger: 'change'},
                    ],
                    purchase_deadline: [
                        {validator: checkDeadline, trigger: 'change'},
                    ],
                }
            }
        },
        watch:{
            choose_deadline:function (val) {
                if(val)
                {
                    let temp=val.toLocaleDateString()
                    if(temp.match(/[/][1-9][/]/))
                    {
                        temp=temp.replace('/','/0')
                    }
                    if(temp.match(/[/][1-9]$/)){
                        temp=temp.substring(0,temp.length-1)+'0'+temp.charAt(temp.length-1)
                    }
                    this.ruleForm.purchase_deadline=temp
                }
                else {
                    this.ruleForm.purchase_deadline=''
                }
            }
        },
        methods:{
            submit(formName)
            {
                this.$refs[formName].validate((valid)=>{
                    if(valid) {
                        reqNewLoan({
                            title:this.ruleForm.loan_title,
                            amount:this.ruleForm.amount,
                            interest_rate:this.ruleForm.interest_rate,
                            loan_month:this.ruleForm.loan_month,
                            purchase_deadline:this.ruleForm.purchase_deadline
                        }).then((response)=>{
                            if(response.code===0){
                                this.$message.success("借款资料提交成功，等待担保人审核！")
                                this.$router.push('/')
                            }
                            else{
                                this.$message.error(response.msg)
                            }
                        }).catch(()=>{
                            this.$message.error('请检查网络连接')
                        })
                    }
                    else {
                        this.$message.error("提交征信资料失败，请填写合法的征信资料！")
                        return false;
                    }
                })
            }
        }

    }
</script>

<style scoped>
    .center{
        padding-left: 27%;
        padding-right: 30%;
        padding-top: 5%;
    }
    .greenbutton{
        background-color: #1C745A !important;
        color:#FFF;
        border-color:#1C745A;
        outline:none;
    }

</style>
