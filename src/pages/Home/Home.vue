<template>
    <div class="container-fluid py-5 home"  lazy="loaded">
        <div class="row justify-content-center py-5">
            <div class="text-center col-md-12">
                <div class="title">有间书店</div>
                <div class="subtitle mb-5"></div>
                <div class="text">一家书店温暖一座城市</div>
            </div>
            <div class="mt-4">
                <button class="btn btn-primary" @click="$router.push('/books')">开始探索</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                imgUrl: '../../../public/images/home.jpg'
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
        background:url('../../../public/images/home.jpg');
        background-size:cover;
    }
</style>
