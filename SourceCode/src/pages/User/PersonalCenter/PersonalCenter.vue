<template>
<el-container style="height: 100%;box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);">
    <el-aside width="180px">
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @select="handleItem"
                background-color="#1c745a"
                text-color="#fff"
                active-text-color="#ffd04b"
                style="height: 100%">
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">我的信息</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">修改信息</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-menu"></i>
                <span slot="title">修改密码</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title">征信资料</span>
            </el-menu-item>
            <el-menu-item index="5">
                <i class="el-icon-document"></i>
                <span slot="title">借款记录</span>
            </el-menu-item>
            <el-menu-item index="6">
                <i class="el-icon-document"></i>
                <span slot="title">投资记录</span>
            </el-menu-item>
            <el-menu-item index="7">
                <i class="el-icon-message"></i>
                <span slot="title">我的邮件</span>
            </el-menu-item>
            <el-menu-item index="8">
                <i class="el-icon-tickets"></i>
                <span slot="title">支付平台</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
    <el-main v-if="select_item==='1'">
        <div class="smallHeader" style="margin: 0 auto">
            <img src="../../../../public/images/headerImg/testUser.jpeg"/>
        </div>
        <el-form class="center1" label-width="8em" size="mini">
            <el-form-item label="工号：" >
                <span style="font-size: 14px;color: #606266;">{{information_form.user_id}}</span>
            </el-form-item>
            <el-form-item label="姓名：" >
                <span style="font-size: 14px;color: #606266;">{{information_form.name}}</span>
            </el-form-item>
            <el-form-item label="身份证号：" >
                <span style="font-size: 14px;color: #606266;">
                    {{information_form.id_card.substring(0,4)+id_card_instead+information_form.id_card.substring(14,18)}}
                </span>
            </el-form-item>
            <el-form-item label="部门：" >
                <span style="font-size: 14px;color: #606266;">{{department_name_option[information_form.department_id]}}</span>
            </el-form-item>
            <el-form-item label="支付平台账号：" >
                <span style="font-size: 14px;color: #606266;">{{information_form.third_party_id}}</span>
            </el-form-item>
            <el-form-item label="手机号：" >
                <span style="font-size: 14px;color: #606266;">
                   {{information_form.phone.substring(0,3)+'****'+information_form.phone.substring(7,11)}}
                </span>
            </el-form-item>
            <el-form-item label="地址：" >
                <span style="font-size: 14px;color: #606266;">{{information_form.address}}</span>
            </el-form-item>
        </el-form>
    </el-main>
    <el-main v-if="select_item==='2'">
        <div class="smallHeader" style="margin: 0 auto">
            <img src="../../../../public/images/headerImg/testUser.jpeg"/>
        </div>
        <el-form class="center1" label-width="8em" size="mini">
            <el-form-item label="工号：" >
                <span style="font-size: 14px;color: #606266;">{{information_form.user_id}}</span>
            </el-form-item>
            <el-form-item label="姓名：" >
                <span style="font-size: 14px;color: #606266;">{{information_form.name}}</span>
            </el-form-item>
            <el-form-item label="身份证号：" >
                <span style="font-size: 14px;color: #606266;">
                    {{information_form.id_card.substring(0,4)+id_card_instead+information_form.id_card.substring(14,18)}}
                </span>
            </el-form-item>
            <el-form-item label="部门：">
                <span style="font-size: 14px;color: #606266;">{{department_name_option[information_form.department_id]}}</span>
            </el-form-item>
            <el-form-item label="支付平台账号：" >
                <span style="font-size: 14px;color: #606266;">{{information_form.third_party_id}}</span>
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input :placeholder="information_form.phone.substring(0,3)+'****'+information_form.phone.substring(7,11)" v-model.trim="modify_form.modify_phone"></el-input>
            </el-form-item>
            <el-form-item label="地址：">
                <el-input :placeholder="information_form.address" v-model.trim="modify_form.modify_address"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" class="greenbutton" @click="save">
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </el-main>
    <el-main v-if="select_item==='3'">
        <el-form label-width="7em" style="padding-left: 30%; padding-right: 30%">
            <el-form-item>
                <h1 class="h2 font-weight-normal mb-3">修改密码</h1>
            </el-form-item>
            <el-form-item label="原密码：">
                <el-input placeholder="请输入原密码" v-model.trim="modify_password.old_password" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码：">
                <el-input placeholder="请输入新密码" v-model.trim="modify_password.new_password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认新密码：">
                <el-input placeholder="请再次输入新密码" v-model.trim="modify_password.confirm_password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" class="greenbutton" @click="modifyPassword">
                    确认修改密码
                </el-button>
            </el-form-item>
        </el-form>
    </el-main>
    <el-main v-if="select_item==='4'">
        <el-form label-width="7em" style="padding-left: 27%;padding-right: 30%">
            <el-form-item>
                <h1 class="h2 font-weight-normal mb-3">征信资料</h1>
            </el-form-item>
            <el-form-item label="月收入">
                <el-input placeholder="请输入月收入" v-model.trim="credit_form.income"></el-input>
            </el-form-item>
            <el-form-item label="家庭月收入">
                <el-input placeholder="请输入家庭月收入" v-model.trim="credit_form.family_income"></el-input>
            </el-form-item>
            <el-form-item label="家庭成员人数">
                <el-input placeholder="请输入家庭成员人数" v-model.trim="credit_form.family_number"></el-input>
            </el-form-item>
            <el-form-item label="总资产">
                <el-input placeholder="请输入总资产" v-model.trim="credit_form.assets"></el-input>
            </el-form-item>
            <el-form-item label="债务">
                <el-input placeholder="请输入债务" v-model.trim="credit_form.debt"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" class="greenbutton" @click="saveCredit">
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </el-main>
</el-container>
</template>

<script>
    import {mapState} from 'vuex'
    import {reqUpdateCreditInfo,reqUpdateUserMessage,reqUpdateUserPassword} from "../../../api";

    export default {
        name: "PersonalCenter",
        mounted() {
            if(!this.isLogin){
                this.$router.push('/')
                return
            }
            if(JSON.stringify(this.user_message)!='{}'){
                this.information_form=JSON.parse(JSON.stringify(this.user_message))
            }

        },
        computed:{
            ...mapState({
                user_message:state=>state.User.user_message,
                isLogin:state=>state.User.isLogin,
                credit_info:state=>state.Credit.credit_info
            })
        },
        data() {
            return{
                select_item:'1',
                department_name_option:{'1':'财务部','2':'人事部',
                    '3':'策划部','4':'营销部',
                    '5':'技术部','6':'管理部'},
                information_form:{
                    name:'老王',
                    user_id:'123456789012',
                    phone:'13860129087',
                    id_card:'123456789012345678',
                    address:'华工',
                    third_party_id:'123456789012',
                    department_id:'1',
                },
                id_card_instead:'**********',
                modify_form:{
                    modify_phone:'',
                    modify_address:'',
                },
                modify_password:{
                    old_password:'',
                    new_password:'',
                    confirm_password:''
                },
                credit_form:{
                    income:'',
                    family_income:'',
                    family_number:'',
                    assets:'',
                    debt:'',
                }
            }
        },
        methods:{
            getInfo(){
                this.credit_form ={
                    income:this.credit_info.income,
                    family_income:this.credit_info.family_income,
                    family_number:this.credit_info.family_number,
                    assets:this.credit_info.assets,
                    debt:this.credit_info.debt,
                }
            },
            save()
            {
                const reg=/^1[3|4|5|7|8]\d{9}$/;
                if(this.modify_form.modify_phone==='')
                {
                    this.$message.error('手机号不能为空')
                    return
                }
                else if(!reg.test(this.modify_form.modify_phone))
                {
                    this.$message.error('请输入合法的手机号')
                    return
                }
                if(this.modify_form.modify_address==='')
                {
                    this.$message.error('地址不能为空')
                    return
                }
                reqUpdateUserMessage({
                    phone:this.modify_form.modify_phone,
                    address:this.modify_form.modify_address
                }).then((response)=>{
                    if(response.code===0){
                        this.$store.commit('User/updatePhoneAddress',[this.modify_form.modify_phone,this.modify_form.modify_address])
                        if(JSON.stringify(this.user_message)!='{}'){
                            this.information_form=JSON.parse(JSON.stringify(this.user_message))
                        }
                        this.modify_form.modify_address=''
                        this.modify_form.modify_phone=''
                        this.$message.success('成功保存')
                    }
                    else{
                        this.$message.error(response.msg)
                    }
                })
            },
            saveCredit(){
                const num_reg=/^(0|[1-9]([0-9]{1,5})?)(\.\d{1,2})?$/
                const num1_reg=/^(0|[1-9]([0-9]{1,6})?)(\.\d{1,2})?$/
                const num2_reg=/^(0|[1-9]([0-9]{1,7})?)(\.\d{1,2})?$/
                const reg=/^(0|[1-9]([0-9]{1,2})?)$/
                if(this.credit_form.income==='')
                {
                    this.$message.error('月收入不能为空')
                    return
                }
                else if(!num_reg.test(this.credit_form.income)){
                    this.$message.error('请填写合法的月收入金额')
                    return
                }

                if(this.credit_form.family_income==='')
                {
                    this.$message.error('家庭月收入不能为空')
                    return
                }
                else if(!num1_reg.test(this.credit_form.family_income))
                {
                    this.$message.error('请填写合法的家庭月收入金额')
                    return
                }
                if(this.credit_form.family_number==='')
                {
                    this.$message.error('家庭成员人数不能为空')
                    return
                }
                else if(!reg.test(this.credit_form.family_number))
                {
                    this.$message.error('请填写合法的家庭成员人数')
                    return
                }
                if(this.credit_form.assets==='')
                {
                    this.$message.error('总资产不能为空')
                    return
                }
                else if(!num2_reg.test(this.credit_form.assets)){
                    this.$message.error('请填写合法的总资产金额')
                    return
                }
                if(this.credit_form.debt==='')
                {
                    this.$message.error('债务不能为空')
                    return
                }
                else if(!num_reg.test(this.credit_form.debt)){
                    this.$message.error('请填写合法的债务金额')
                    return
                }
                reqUpdateCreditInfo({
                    income:this.credit_form.income,
                    family_income:this.credit_form.family_income,
                    assets:this.credit_form.assets,
                    family_number:this.credit_form.family_number,
                    debt:this.credit_form.debt
                }).then((response)=>{
                    if(response.code===0){
                        this.$store.commit('Credit/updateCreditInfo', JSON.parse(JSON.stringify(this.credit_form)))
                        this.$store.commit('Credit/updateQuota',response.data.quota)
                        this.$message.success('成功保存')
                    }
                    else{
                        this.$message.error(response.msg)
                    }
                })
            },
            modifyPassword()
            {
                if(this.modify_password.old_password==='')
                {
                    this.$message.error('原密码不能为空')
                    return
                }
                if(this.modify_password.new_password==='')
                {
                    this.$message.error('新密码不能为空')
                    return
                }
                if(this.modify_password.new_password!=this.modify_password.confirm_password)
                {
                    this.$message.error('请确保两次输入的新密码相同')
                    return
                }
                reqUpdateUserPassword({
                    old_password:this.modify_password.old_password,
                    password:this.modify_password.new_password,
                    password_repeat:this.modify_password.confirm_password
                }).then((response)=>{
                    if(response.code===0){
                        this.modify_password.old_password=''
                        this.modify_password.new_password=''
                        this.modify_password.confirm_password=''
                        this.$message.success('成功修改密码')
                    }
                    else{
                        this.$message.error(response.msg)
                    }
                }).catch(()=>{
                    this.$message.error('请检查网络连接')
                })
            },
            handleItem(key)
            {
                this.select_item=key
                if(key==='4'){
                    if(JSON.stringify(this.credit_info)!='{}'){
                        this.getInfo()
                    }
                }
                switch (this.select_item) {
                    case "5":this.$router.push('/loanRecords');break;
                    case "6":this.$router.push('/investmentRecords');break;
                    case "7":this.$router.push('/letter');break;
                    case "8":this.$router.push('/wallet');break;
                    default:break;
                }
            }
        },
    }
</script>

<style scoped>
    /*图片读取css*/
    img{
        width: auto;
        height: auto;
        max-height: 100%;
        max-width: 100%;
    }
    /*小头像css*/
    .smallHeader{
        width: 120px;
        height: 120px;
        /*圆角*/
        border-radius: 50%;
        /*圆角外不显示*/
        overflow: hidden;
    }
    .center{
        padding-left: 38%;
        padding-top: 5%;
    }
    .center1{
        padding-left: 38%;
        padding-right: 30%;
        padding-top: 3%;
    }

    .greenbutton{
        background-color: #1C745A !important;
        color:#FFF;
        border-color:#1C745A;
        outline:none;
    }
</style>
