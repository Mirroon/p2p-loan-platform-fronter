<template>
    <body class="text-center">
    <div class="center">
        <el-form v-show="true" :model="signIn" status-icon :rules="rules" ref="signIn" label-width="7em">
        <el-form-item>
            <h1 class="h2 font-weight-normal mb-3">登录</h1>
        </el-form-item>
        <el-form-item label="工号" prop="user_id">
            <el-input placeholder="请输入工号" v-model.trim="signIn.user_id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" v-model.trim="signIn.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="账户类型" prop="user_type">
            <el-select v-model.trim="signIn.user_type" placeholder="请选择用户类型" style="width:100%">
                <el-option  v-for="(item,index) in user_type_option" :key=index :label=item.label  :value=item.value></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button class="greenbutton" type="primary" icon="el-icon-upload" @click.prevent="login('signIn')">
                登录
            </el-button>
            <el-button  icon="el-icon-upload" @click="$router.push('/register')">
                返回注册
            </el-button>
        </el-form-item>
    </el-form>
    </div>
    </body>
</template>

<script>
    import {mapState} from 'vuex'
    import {reqLogin} from "../../api";

    export default {
        name: "Login",
        mounted(){
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
                    callback();
                }
            };
            var checkUserType = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择用户类型'));
                } else {
                    callback();
                }
            };
            return {
                user_type_option:[{label:'普通用户',value:'1'},{label:'担保用户',value:'2'}],
                signIn: {
                    user_id: '',
                    password: '',
                    user_type:''
                },
                rules: {
                    user_id: [
                        {validator: checkUser_id, trigger: 'change'},
                    ],
                    password: [
                        {validator: checkPassword, trigger: 'change'}
                    ],
                    user_type:[
                        {validator:checkUserType,trigger: 'change'}
                    ]
                }
            }
        },
        methods:{
            clearSignIn()
            {
              this.signIn = {
                  user_id: '',
                  password: '',
                  user_type:'',
              }
            },
            login(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid) {
                        reqLogin({
                            // user_id:'123456789012',
                            // password:'123456',
                            // user_type:'1'
                            user_id:this.signIn.user_id,
                            password:this.signIn.password,
                            user_type:this.signIn.user_type
                        }).then((response)=>{
                            if(response.code===0)
                            {
                                if(this.signIn.user_type==='1'){
                                    this.$store.commit('User/changeLogin')
                                    this.$store.dispatch('Credit/getCreditInfo')
                                    this.$store.dispatch('User/getUserMessage')
                                    this.$message.success("登录成功")
                                    this.$router.push('/')
                                }
                                else if(this.signIn.user_type==='2'){
                                    this.$store.commit('Guarantor/changeLogin')
                                    this.$store.commit('Guarantor/updateMessage',response.data)
                                    this.$message.success("登录成功")
                                    this.$router.push('/guarantor/guarantee')
                                }
                            }
                            else
                            {
                                this.$message.error(response.msg)
                                return false
                            }
                        }).catch(()=>{
                            this.$message.error("登录失败，请检查网络连接")
                        })
                    }
                    else {
                        this.$message.error("登录失败，请填写合法的登录信息！")
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
