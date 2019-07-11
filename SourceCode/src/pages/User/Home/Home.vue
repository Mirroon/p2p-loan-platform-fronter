<template>
    <div class="container-fluid py-5 home"  lazy="loaded">
        <div class="row justify-content-center py-5">
            <div class="text-center col-md-12">
                <!--<div class="bigicon"><img src="../../../public/images/icon/smallicon.png"/></div>-->
                <div class="title">P2P小额贷平台</div>
                <div class="subtitle mb-5"></div>
<!--                <div class="text">一家书店温暖一座城市</div>-->
                <br /><br /><br /><br /><br />
            </div>
            <div class="mt-5">
<!--                <button class="btn btn-primary" @click="$router.push('/books')">开始探索</button>-->
                <el-row :gutter="250">
                    <el-col :span="12">
                    <el-button type="primary" style="width:200px;" @click="$router.push('/login')">登录</el-button>
                    </el-col>
                    <el-col :span="12">
                    <el-button type="primary" style="width:200px;" @click="$router.push('/register')">注册</el-button>
                    </el-col>
                </el-row>
                <br /><br /><br /><br /><br />
                <el-row :gutter="250">
                    <el-col :span="12">
                        <el-button type="primary" style="width:200px;" @click="$router.push('/credit')">我要借款</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button type="primary" style="width:200px;" @click="$router.push('/register')">我要还款</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button type="primary" style="width:200px;" @click="$router.push({name:'Information', params:{text_id:'123'}})">信息</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                imgUrl: '../../../public/images/home2.jpg'
            }
        }
    }
</script>

<style scoped>
    .title{
        font-family: Calibri;
        font: 72px bold;
        color: white;
    }

    .subtitle{
        font-size: 16px;
        font-family: 等线;
        color: white;
    }

    .text{
        font-size: 20px;
        color: white;
    }

    .home[lazy=loaded]{
        height: 1200px;
        background:url('../../../../public/images/home2.jpg');
        background-size:cover;
    }

    /*图片读取css*/
    img{
        width: auto;
        height: auto;
        max-height: 100%;
        max-width: 100%;
    }

    .bigicon{
        display: block;
        vertical-align: middle;
        width: 900px;
        height: 900px;
        float: left;
        left: 500px;
    }
</style>
