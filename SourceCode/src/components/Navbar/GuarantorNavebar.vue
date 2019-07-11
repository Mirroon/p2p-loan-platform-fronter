<template>
    <div class="NavBar">
        <div id="head-pic" v-bind:class="{homePage:($route.path==='/index'), otherPage:!($route.path==='/index')}">
            <div id="header">
                <div class="smallicon"><img src="../../../public/images/icon/smallicon.png"/></div>
                <div>
                        <div v-if="isGuarantorLogin" style="display: inline-block">
                        <button class="textbutton" @click="guaranee" v-bind:class="($route.path==='/guarantor/guarantee')? 'textbuttonborder': 'none'"><span>担保</span></button>
                        <button class="textbutton" @click="overdue" v-bind:class="($route.path==='/guarantor/overdue')? 'textbuttonborder': 'none'"><span>逾期</span></button>
                        </div>
                </div>

                <div class="dropdown">
                    <!--小头像-->
                    <div class="smallHeader">
                        <div v-if="userInfo.headerImgURL==null||!isGuarantorLogin">
                            <img src="../../../public/images/headerImg/nullUser.jpeg"/>
                        </div>
                        <div v-else>
                            <img v-bind:src="userInfo.headerImgURL"/>
                        </div>
                    </div>

                    <div v-if="!isGuarantorLogin">
                        <!--用户未登录，需要先登陆-->
                        <div class="dropdown-content-notLogin" v-bind:class="{alpha:($route.path==='/index'), notAlpha:!($route.path==='/index')}">
                            <div class="notLogin">
                                <span>请先注册或登陆。</span>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="dropdown-content" v-bind:class="{alpha:($route.path==='/index'), notAlpha:!($route.path==='/index')}">
                                <!--用户已登录，有用户id-->
                                <div class="one-third">
                                    <div class="half">
                                        <!--大头像-->
                                        <div v-if="userInfo.headerImgURL==null">
                                            <div class="bigHeader"> <img src="../../../public/images/headerImg/nullUser.jpeg"/></div>
                                        </div>
                                        <div v-else>
                                            <div class="bigHeader"> <img v-bind:src="userInfo.headerImgURL"/></div>
                                        </div>

                                    </div>
                                    <div class="half">
                                        <div class="table">
                                            <div class="table-cell">
                                                <!--用户姓名-->

                                                <div v-if="guarantor_message.name==null">
                                                    <div class="text-enter"><span>姓名：<br>担保人</span></div>
                                                </div>
                                                <div v-else>
                                                    <div class="text-enter"><span>姓名：<br>{{guarantor_message.name}}</span></div>
                                                </div>

                                            </div><!--table-cell-->
                                            <div class="table-cell">
                                                <!--用户工号-->
                                                <div v-if="!isGuarantorLogin">
                                                    <div class="text-enter"><span>工号：<br>我的工号</span></div>
                                                </div>
                                                <div v-else>
                                                    <div class="text-enter"><span>工号：<br>{{guarantor_message.user_id}}</span></div>
                                                </div>
                                            </div><!--table-cell-->
                                        </div><!--table-->
                                    </div><!--half-->
                                </div><!--one-third-->


                                <div class="one-third-small">
                                    <span>----------------------------------------------</span>
                                    <el-row>
                                        <el-col :span="1" :offset="18">
                                            <button class="greenbutton greenbuttoncycle" @click="logout"><div class="logout">退出登录</div></button>
                                        </el-col>
                                    </el-row>
                                </div><!--one-third-->
                        </div><!--dropdown-content-->
                    </div><!-- v-else -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {reqLogout} from "../../api";
    export default {
        name: "GuarantorNavBar",
        beforeMount(){
            this.$store.commit('User/getSessionUser')
            this.$store.commit('Credit/getSessionCredit')
            this.$store.commit('Guarantor/getSessionGuarantor')
        },
        data() {
            return {
                userInfo: {
                    userID: 0,
                    name: '我的名字',
                    headerImgURL: require("../../../public/images/headerImg/testUser.jpeg"),
                },
            };
        },
        computed:{
            ...mapState({
                isGuarantorLogin: state=> state.Guarantor.isGuarantorLogin,
                guarantor_message: state=> state.Guarantor.guarantor_message
            })
        },
        mounted () {
        },
        methods: {
            investmentRecords () {
                this.$router.push('/investmentRecords');
            },
            home () {
              this.$router.push('/index');
            },
            loanRecords () {
                this.$router.push('/loanRecords');
            },
            logout () {
                this.$store.commit('Guarantee/init')
                this.$store.commit('InvestmentRecords/init')
                this.$store.commit('Letters/init')
                this.$store.commit('LoanRecords/init')
                this.$store.commit('User/init')
                this.$store.commit('Credit/init')
                this.$store.commit('Guarantor/init')
                this.$store.commit('Overdue/init')
                this.$store.commit('InvestmentList/init')
                reqLogout()
                this.$router.push('/index');
                this.$message({
                    type: 'success',
                    message: '登出成功。'
                })
            },
            guaranee () {
                this.$router.push('/guarantor/guarantee');
            },
            overdue () {
                this.$router.push('/guarantor/overdue');
            },
        },
    }
</script>

<style scoped>
    .NavBar{

    }
    /*图片读取css*/
    img{
        width: auto;
        height: auto;
        max-height: 100%;
        max-width: 100%;
    }


    .smallHeader{
        width: 60px;
        height: 60px;
        /*圆角*/
        border-radius: 50%;
        /*圆角外不显示*/
        overflow: hidden;
    }

    /*大头像*/
    .bigHeader{
        position: absolute;
        width: 90px;
        height: 90px;
        right: 200px;
        border-radius: 50%;
        overflow: hidden;
        top: 12px;
        left: 30px;
    }

    /*下拉菜单出发处（小头像）*/
    .dropdown {
        position: absolute;
        display: inline-block;
        right: 0px;
        top:0px;
    }

    /*登录后的下拉菜单*/
    .dropdown-content {
        display: none;
        position: absolute;
        min-width: 300px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 5px 5px;
        left: -250px;
        /*background-color: rgba(255,255,255,0.2);*/
        z-index: 3;
    }
    /*鼠标事件*/
    .dropdown:hover .dropdown-content {
        display: block;
    }

    /*未登录时的下拉菜单*/
    .dropdown-content-notLogin{
        display: none;
        position: absolute;
        /*background-color: #f9f9f9;*/
        min-width: 100px;
        /*min-height: 600px;*/
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 5px 5px;
        left: -78px;
        /*background-color: rgba(255,255,255,0.2);*/
        z-index: 3;
    }

    /*登录后其他页面的不透明下拉菜单*/
    .notAlpha {
        background-color: rgba(255,255,255,1);
    }

    /*登录后主页的透明下拉菜单*/
    .alpha {
        background-color: rgba(255,255,255,0.5);
    }

    /*鼠标事件*/
    .dropdown:hover .dropdown-content-notLogin{
        display: block;
    }

    /*三分之一的格子*/
    .one-third{
        width: 300px;
        height: 100px;
        /*border: black solid 2px;*/
    }
    /*最后一个三分之一格子*/
    .one-third-small{
        width: 300px;
        height: 75px;

    }
    /*三分之一的二分之一格子*/
    .half{
        width: 50%;
        height: 100%;
        display: inline-block;
        /*margin-right: 0px;*/
        vertical-align: top;
        /*border: 2px solid yellow;*/
    }

    /*二分之一格子的表单*/
    .table{
        width: 50%;
        height: 100%;
        display: table;
    }
    .table-cell{
        display: table-row;
        /*border: 2px solid red;*/
    }
    .text-enter{
        vertical-align: middle;
    }

    /*透明css*/
    #head-pic{
        z-index: 0;
        height: 60px;
        width: 100%;
        /*background-image:url(../../../public/images/home.jpg) ;*/
    }

    #header{
        width: 100%;
        height: 60px;
        z-index: 1;
        background-color: hsla(0,0%,100%,.1);
        display:flex;/*Flex布局*/
        display: -webkit-flex; /* Safari */
        align-items:center;/*指定垂直居中*/
    }
    #header:after{
        background-color: rgba(255,255,255,0.4);
        filter:blur(5px);
    }

    /*退出登录按钮字体*/
    .logout{
        font-size:12px;
    }

    .homePage{
        background-color: hsla(0,0%,100%,.1);
    }

    .otherPage{
        /*background-color: #1C745A;*/
        background-color: rgba(28,116,90,0.8);
        background-image: none;
    }

    .buttonLoc{
        float: left;
        left: 5px;
    }

    .textbutton{
        margin-right: 5px;
        margin-left: 5px;
        background-color: hsla(0,0%,100%,.0);
        border: none;
        height: 56px;
        width: 60px;
        outline: none;
    }

    .textbuttonborder{
        border-bottom: forestgreen solid 5px;
    }
    .textbutton span{
        font-size: 20px;
        font-weight: lighter;
        color: white;
        font-family: "DengXian";
    }

    .greenbutton{
        display: inline-block;
        border: solid 4px #1C745A;
        border-radius: 4px;
        background-color: #1C745A !important;
        text-align: center;
        -webkit-writing-mode: horizontal-tb !important;
        font: 400 13.3333px Arial;
        text-rendering: auto;
        letter-spacing: normal;
        text-transform: none;
        text-indent: 0px;
        text-shadow: none;
        align-items: flex-start;
        font-weight: 500;
        transition: .1s;
        color: white;
        font-size: 14px;
        width: 100px;
        height: 40px;
        text-align: center;
    }

    .greenbuttoncycle{
        width: 80px;
        height: 30px;
        border-radius: 25px;
    }

    .smallicon{
        width: 61px;
        height: 61px;
    }
</style>
