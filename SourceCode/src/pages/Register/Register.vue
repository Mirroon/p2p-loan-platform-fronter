<template>
    <body class="text-center">
    <div class="center">
        <el-form v-show="true" :model="signUp" status-icon :rules="rules" ref="signUp" label-width="7em">
            <el-form-item>
                <h1 class="h2 font-weight-normal mb-3">注册</h1>
            </el-form-item>
            <el-form-item label="工号" prop="user_id">
                <el-input placeholder="请输入工号" v-model.trim="signUp.user_id"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input placeholder="请输入密码" v-model.trim="signUp.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirm_password">
                <el-input placeholder="请再次输入密码" v-model.trim="signUp.confirm_password" show-password></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input placeholder="请输入姓名" v-model.trim="signUp.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="id_card">
                <el-input placeholder="请输入身份证号" v-model.trim="signUp.id_card"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input placeholder="请输入手机号" v-model.trim="signUp.phone"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input placeholder="请输入地址" v-model.trim="signUp.address"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="department_id">
                <el-select v-model.trim="signUp.department_id" placeholder="请选择部门" style="width:100%">
                    <el-option  v-for="(item,index) in department_id_option" :key=index :label=item.label  :value=item.value></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支付平台账号" prop="third_party_id">
                <el-input placeholder="请输入支付平台账号" v-model.trim="signUp.third_party_id"></el-input>
            </el-form-item>
            <el-form-item>
                    <el-button class="greenbutton" type="primary" icon="el-icon-upload" @click.prevent="register('signUp')">
                        确认注册
                    </el-button>
                    <el-button  icon="el-icon-upload" @click="$router.push('/login')">
                        返回登录
                    </el-button>
            </el-form-item>
        </el-form>
    </div>
    </body>
</template>

<script>
    import {mapState} from 'vuex'
    import {reqSignup} from "../../api/index";

    export default {
        name: "Register",
        mounted () {
            if(this.isLogin){
                this.$router.push('/')
            }
            if(this.isGuarantorLogin){
                this.$router.push('/guarantor/guarantee')
            }
        },
        data(){
            var checkUser_id = (rule, value, callback) => {
                const reg = /^\d{12}$/
                if (value === ''){
                    callback(new Error('工号不能为空'));
                } else if(reg.test(value)){
                    callback()
                }
                else{
                    callback(new Error('请输入12位数字工号'))
                }
            }
            var checkPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.signUp.confirm_password !== '') {
                        this.$refs.signUp.validateField('confirm_password');
                    }
                     callback();
                }
            };
            var checkConfirmPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.signUp.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var checkName = (rule, value, callback) =>{
                if(value === ''){
                    callback(new Error('姓名不能为空'));
                }
                else if(value.length>4){
                    callback(new Error('姓名长度不能超过4'));
                }else{
                    callback()
                }
            };
            var checkId_card = (rule, value, callback)=>{
                const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                if(value === ''){
                    callback(new Error('身份证不能为空'))
                }
                else if(reg.test(value))
                {
                    callback()
                }
                else
                {
                    callback('请填写合法的身份证号')
                }
            };
            var checkPhone = (rule, value, callback)=> {
                const reg = /^1[3|4|5|7|8]\d{9}$/
                if (value=='')
                {
                    callback(new Error('手机号不能为空'))
                }
                else if(reg.test(value))
                {
                    callback();
                }
                else
                {
                    callback(new Error('请输入合法的手机号'))
                }
            }
            var checkAddress = (rule, value, callback)=> {
                if(value==='')
                {
                    callback(new Error('地址不能为空'));

                }
                else
                {
                    callback();
                }
            }
            var checkDepartment = (rule, value, callback)=> {
                if(value==='')
                {
                    callback(new Error('部门不能为空'));

                }
                else
                {
                    callback();
                }
            }
            var checkThird= (rule, value, callback) => {
                const reg = /^\d{12}$/
                if (value === ''){
                    callback(new Error('支付平台账户不能为空'));
                } else if(reg.test(value)){
                    callback()
                }
                else{
                    callback(new Error('请输入12位数字的账户'))
                }
            }
            return {
                department_id_option:[{value:'1',label:'财务部'},{value:'2',label:'人事部'},
                    {value:'3',label:'策划部'},{value:'4',label:'营销部'},
                    {value:'5',label:'技术部'},{value:'6',label:'管理部'}],
                signUp: {
                    user_id: '',
                    password: '',
                    confirm_password: '',
                    name: '',
                    id_card: '',
                    phone:'',
                    address:'',
                    department_id:'',
                    third_party_id:'',
                },
                rules: {
                    user_id: [
                        {validator: checkUser_id, trigger: 'change'},
                    ],
                    password: [
                        {validator: checkPassword, trigger: 'change'}
                    ],
                    confirm_password: [
                        {validator: checkConfirmPassword, trigger: 'change'}
                    ],
                    name: [
                        { validator: checkName, trigger: 'change'}
                    ],
                    id_card: [
                        { validator: checkId_card, trigger: 'change'}
                    ],
                    phone:[
                        { validator: checkPhone, trigger: 'change'}
                    ],
                    address:[
                        { validator: checkAddress, trigger: 'change'}
                    ],
                    department_id:[
                        { validator: checkDepartment, trigger: 'change'}
                    ],
                    third_party_id: [
                        {validator: checkThird, trigger: 'change'},
                    ],
                }
            }
        },
        methods:{
            clearSignUp()
            {
              this.signUp={
                  user_id: '',
                  password: '',
                  confirm_password: '',
                  name: '',
                  id_card: '',
                  phone:'',
                  address:''
              }
            },
            register(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid) {
                        reqSignup({
                            user_id:this.signUp.user_id,
                            password:this.signUp.password,
                            password_repeat:this.signUp.confirm_password,
                            name:this.signUp.name,
                            id_card:this.signUp.id_card,
                            phone:this.signUp.phone,
                            address:this.signUp.address,
                            department_id:this.signUp.department_id,
                            third_party_id:this.signUp.third_party_id
                        }).then((response)=>{
                            if(response.code===0){
                                this.$message.success("注册成功")
                                this.clearSignUp()
                                this.$router.push('/login')
                            }
                            else{
                                this.$message.error(response.msg)
                                return false
                            }
                        }).catch(()=>{
                            this.$message.error("注册失败，请检查网络连接")
                        })
                    }
                    else {
                        this.$message.error("注册失败，请填写合法的注册信息！")
                        return false;
                    }
                })

            }
        },
        computed:{
            ...mapState({
                isLogin:state=>state.User.isLogin,
                isGuarantorLogin:state=>state.Guarantor.isGuarantorLogin
            })
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
