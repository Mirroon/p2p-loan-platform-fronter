<template>
    <div class="index" lazy="loaded">
        <el-container>
            <el-main>
                    <!-- <div align="center" style="margin-top: 30px"> -->
                        <!-- <div class="logo">
                            <img src="../../../public/images/icon/bigIcon.png"/>
                        </div> -->
                    <!-- </div> -->
                    <div class="title">
                        <!--<h1>VRB</h1>-->
                        <h2>P2P小额贷款平台</h2>
                    </div>

                    <div class="buttons" v-if="!isLogin" >
                        <el-row>
                            <el-col :span="1" :offset="4">
                                <el-button type="primary" class="greenButton" round @click="login"><span>登录</span></el-button>
                            </el-col>
                            <el-col :span="1" :offset="10">
                                <el-button type="primary" class="greenButton" round @click="registry"><span>注册</span></el-button>
                            </el-col>
                        </el-row>
                    </div>
                <div class="buttons" v-if="isLogin">
                    <el-row>
                        <el-col :span="1" :offset="4">
                            <el-button type="primary" class="greenButton" round @click="loan"><span>借款</span></el-button>
                        </el-col>
                        <el-col :span="1" :offset="10">
                            <el-button type="primary" class="greenButton" round @click="investment"><span>投资</span></el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "Index",
        data(){
            return{
                userInfo:{
                    userID: 0,
                    name: '我的名字',
                    headerImgURL: require("../../../public/images/headerImg/nullUser.jpeg"),
                },
                imgUrl: '../../public/images/home.jpg'
            }
        },
        computed: {
            ...mapState({
                isLogin: state=> state.User.isLogin,
            })
        },
        methods:{
            login(){
                this.$router.push('/login');
            },
            registry(){
                this.$router.push('/register');
            },
            loan(){
                this.$router.push('credit');
            },
            investment(){
                this.$router.push('/investment');
            }
        }
    }
</script>

<style scoped>
    .index[lazy="loaded"]{
        height: 1000px;
        background-color: hsla(0,0%,100%,0);
        /*background:url('../../../public/images/background/background.jpg');*/
        background-size:cover;
    }
    .title{
        /*margin-top: 10px;*/
        display: block;
        vertical-align: center;
        text-align: center;
        margin-bottom: 200px;
        margin-top: 200px
    }

    .title h1{
        font-family: Arial;
        font-size: 128px;
        color: #1C745A;
        font-weight: bold;
    }
    .title h2{
        font-family: Arial;
        font-size: 64px;
        color: white;
        font-weight: bold;
    }

    .greenButton{
        background-color: #1C745A !important;
        outline: none;
        width: 250px;
        height: 70px;
        outline: none;
    }

    .buttons span{
        font-size: 48px;
        font-weight: lighter;
        font-family: dengxian;
    }
    /*图片读取css*/
    img{
        width: auto;
        height: auto;
        max-height: 100%;
        max-width: 100%;
    }

    .logoPart{
        display: block;
        vertical-align: center;
        text-align: center;
    }
    /*小头像css*/
    .logo{
        width: 500px;
        height: 500px;
        /*filter: alpha(opacity=50);*/
        /*opacity: 0.5;*/
    }
</style>
