<template>
        <div>
            <img src="../../../../public/images/404.png" style="width: 100%" @click="handle">
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "Home",
        computed:{
            ...mapState({
                isGuarantorLogin: state=> state.Guarantor.isGuarantorLogin
            })
        },
        data() {
            return {
                imgUrl: '../../../public/images/home2.jpg'
            }
        },
        methods:{
            handle(){
                if(this.isGuarantorLogin){
                    this.$router.push('/guarantor/guarantee')
                }
                else{
                    this.$router.push('/')
                }
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
        weight: 100%;
        background:url('../../../../public/images/404.png');
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
