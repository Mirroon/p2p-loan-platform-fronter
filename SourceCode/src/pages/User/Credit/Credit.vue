<template>
    <body class="text-center">
    <div class="center">
        <el-form v-show="true" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="7em">
            <el-form-item>
                <h1 class="h2 font-weight-normal mb-3">征信资料填写</h1>
            </el-form-item>
            <el-form-item label="月收入" prop="income">
                <el-input v-model.trim="ruleForm.income" placeholder="请输入月收入（单位：元）"></el-input>
            </el-form-item>
            <el-form-item label="家庭月收入" prop="family_income">
                <el-input v-model.trim="ruleForm.family_income" placeholder="请输入家庭月收入（单位：元）"></el-input>
            </el-form-item>
            <el-form-item label="家庭成员人数" prop="family_number">
                <el-input v-model.trim="ruleForm.family_number" placeholder="请输入家庭成员人数"></el-input>
            </el-form-item>
            <el-form-item label="总资产" prop="assets">
                <el-input v-model.trim="ruleForm.assets" placeholder="请输入总资产（单位：元）"></el-input>
            </el-form-item>
            <el-form-item label="债务" prop="debt">
                <el-input v-model.trim="ruleForm.debt" placeholder="请输入债务（单位：元）"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="greenbutton" type="primary" icon="el-icon-upload" @click.prevent="submit('ruleForm')">
                    确认并提交
                </el-button>
                <el-button  icon="el-icon-upload" @click="$router.push('/')">
                    取消
                </el-button>
            </el-form-item>
        </el-form>
    </div>
    </body>
</template>

<script>
    import {mapState} from 'vuex'
    import {reqUpdateCreditInfo} from "../../../api";

    export default {
        name: "Credit",
        mounted(){
            if(JSON.stringify(this.credit_info)!='{}'){
                this.getInfo()
            }
        },
        computed:{
          ...mapState({
              credit_info:state=>state.Credit.credit_info,
          })
        },
        data()
        {
            var checkIncome = (rule, value, callback)=> {
                const reg=/^(0|[1-9]([0-9]{1,5})?)(\.\d{1,2})?$/
                if(value==='')
                {
                    callback(new Error('请填写月收入'));

                }
                else if(reg.test(value))
                {
                    callback();
                }
                else {
                    callback(new Error('请填写合法的金额'))
                }
            }
            var checkFamilyIncome = (rule, value, callback)=> {
                const reg=/^(0|[1-9]([0-9]{1,6})?)(\.\d{1,2})?$/
                if(value==='')
                {
                    callback(new Error('请填写家庭月收入'));

                }
                else if(reg.test(value))
                {
                    callback();
                }
                else {
                    callback(new Error('请填写合法的金额'))
                }
            }
            var checkFamilyNumber = (rule, value, callback)=> {
                const reg=/^(0|[1-9]([0-9]{1,2})?)$/
                if(value==='')
                {
                    callback(new Error('请填写家庭成员人数'));

                }
                else if(reg.test(value))
                {
                    callback();
                }
                else {
                    callback(new Error('请填写有效的数字'))
                }
            }
            var checkAssets = (rule, value, callback)=> {
                const reg=/^(0|[1-9]([0-9]{1,7})?)(\.\d{1,2})?$/
                if(value==='')
                {
                    callback(new Error('请填写总资产'));

                }
                else if(reg.test(value))
                {
                    callback();
                }
                else {
                    callback(new Error('请填写合法的金额'))
                }
            }
            var checkDebt = (rule, value, callback)=> {
                const reg=/^(0|[1-9]([0-9]{1,5})?)(\.\d{1,2})?$/
                if(value==='')
                {
                    callback(new Error('请填写债务'));

                }
                else if(reg.test(value))
                {
                    callback();
                }
                else {
                    callback(new Error('请填写合法的金额'))
                }
            }
            return{
                ruleForm: {
                    income:'',
                    family_income:'',
                    family_number:'',
                    assets:'',
                    debt:'',
                },
                rules: {
                    income: [
                        {validator: checkIncome, trigger: 'change'},
                    ],
                    family_income: [
                        {validator: checkFamilyIncome, trigger: 'change'},
                    ],
                    family_number:[
                        {validator: checkFamilyNumber, trigger: 'change'}
                    ],
                    assets: [
                        {validator: checkAssets, trigger: 'change'},
                    ],
                    debt: [
                        {validator: checkDebt, trigger: 'change'},
                    ],
                }
            }
        },
        methods:{
            getInfo(){
                this.ruleForm={
                    income:this.credit_info.income,
                    family_income:this.credit_info.family_income,
                    family_number:this.credit_info.family_number,
                    assets:this.credit_info.assets,
                    debt:this.credit_info.debt,
                }
            },
            clearRuleForm()
            {
                this.ruleForm={
                    income:'',
                    family_income:'',
                    family_number:'',
                    assets:'',
                    debt:'',
                }
            },
            submit(formName)
            {
                this.$refs[formName].validate((valid)=>{
                    if(valid) {
                        reqUpdateCreditInfo({
                            income:this.ruleForm.income,
                            family_income:this.ruleForm.family_income,
                            assets:this.ruleForm.assets,
                            family_number:this.ruleForm.family_number,
                            debt:this.ruleForm.debt
                        }).then((response)=>{
                            if(response.code===0){
                                this.$store.commit('Credit/updateCreditInfo', JSON.parse(JSON.stringify(this.ruleForm)))
                                this.$store.commit('Credit/changeReach')
                                this.$store.commit('Credit/updateQuota',response.data.quota)
                                this.$message.success("提交征信资料成功")
                                this.$router.push('/loanDetail')
                            }
                            else{
                                this.$message.error(response.msg)
                            }
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
