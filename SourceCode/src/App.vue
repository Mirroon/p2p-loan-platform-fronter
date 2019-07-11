<template>
  <div id="app" v-bind:class="{homePage: ($route.path == '/index'),none: !($route.path == '/index')}">
    <div v-if="isGuarantorLogin">
        <GuarantorNavBar></GuarantorNavBar>
    </div>
    <div v-else>
        <Navbar></Navbar>
    </div>
      <router-view/>
      <Footer></Footer>
  </div>
</template>

<script>
    import GuarantorNavBar from './components/Navbar/GuarantorNavebar.vue'
    import Navbar from './components/Navbar/Navbar'
    import Footer from './components/Footer/Footer'
    import {mapState} from 'vuex'

export default {
    name: 'app',
    computed:{
        ...mapState({
            isGuarantorLogin: state=> state.Guarantor.isGuarantorLogin,
        })
    },
    mounted () {

    },
    components:{
        Navbar,
        Footer,
        GuarantorNavBar
    },
}
</script>

<style>
#app {
    height: 100%;
}
.homePage{
    background-image: url("../public/images/background/background.jpg");
}

::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
</style>
