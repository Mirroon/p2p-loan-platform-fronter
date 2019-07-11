<template>
    <div>
        <footer class="footer">
            <div class="clearfix"></div>
            <div class="icon-row">
                <div class="footer-icon">
                    <h5 class="footer-icon-child"></h5>
                    <span class="footer-icon-text">高度分散，严谨风控</span>
                </div>
                <div class="footer-icon">
                    <h5 class="footer-icon-child footer-icon-child-2"></h5>
                    <span class="footer-icon-text">领先技术，法律保障</span>
                </div>
                <div class="footer-icon">
                    <h5 class="footer-icon-child footer-icon-child-3"></h5>
                    <span class="footer-icon-text">隐私加密，防止窃听</span>
                </div>
                <div class="footer-icon">
                    <h5 class="footer-icon-child footer-icon-child-4"></h5>
                    <span class="footer-icon-text">银行存管，资金安全</span>
                </div>
            </div>
            <div class="service-intro">
                <div class="servece-type">
                    <div class="servece-type-info" v-for="(guide, index) in guideArr" :key="index" style="text-align: center">
                        <ul>
                            <li v-for="(item, index) in guide" :key="index">
                              <div @click="acllcationTextId(item,index)">{{item.name}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="friend-link">
                    <div class="friend-link-item">
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="copyright">
                    <p>Copyright © 2019  <span>借贷有风险，投资需谨慎</span></p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data () {
            return {
                linkItemClass: 'link-item',
                guideArr: [
                    [ {name:'我要借款',label:1}, {name:'借款流程',label:'borrow-process'},{name:'前往登陆',label:'login'},
                      {name:'前往注册',label:'register'}],

                    [ {name:'我要投资',label:2}, {name:'投资流程', label:'investment-process'},{name:'投资风险', label:'investment-risk'},
                      {name:'风险管理',label:'risk-management'}],

                    [ {name:'关于我们',label:3}, {name:'公司信息', label:'company-information'},{name:'联系我们', label:'contact-us'},
                      {name:'常见问题',label:'common-problem'}],

                    [ {name:'相关政策',label:4}, {name:'法律法规', label:'related-laws'}, {name:'风控策略',label:'risk-control-strategy'},
                      {name:'协议模板',label:'contract'}]
                ]
            };
        },
        methods: {
          acllcationTextId(item, index){
            if(index==0){
              return
            }
            else{
              if(item.label=='login'){
                return this.$router.push('/login')
              }
              else if(item.label=='register'){
                return this.$router.push('/register')
              }
              return this.$router.push({name:'Information', params:{text_id:item.label}})
            }
          }

        },


    }
</script>

<style scoped>
    .footer {
        width: 100%;
        height: 390px;
        /*margin-top: 30px;*/
        background-color: #eaeaea;
    }
    .icon-row {
        margin: auto;
        margin-top: 0px;
        margin-bottom: 8px;
        padding-top: 8px;
        padding-bottom: 8px;
        width: 1000px;
        height: 64px;
    }
    .footer-icon {
        margin-left: 17px;
        margin-right: 17px;
        float: left;
    }
    .footer-icon-child {
        margin-top: 10px;
        overflow: hidden;
        position: absolute;
        width: 36px;
        height: 42px;
        /*background-image: url("../../../static/img/footer/ico_service.png");*/
        text-indent: -999px;
    }
    .footer-icon-child-2 {
        background-position: 0 -43px;
    }
    .footer-icon-child-3 {
        background-position: 0 -86px;
    }
    .footer-icon-child-4 {
        background-position: 0 -129px;
    }
    .footer-icon-text {
        margin-left: 45px;
        color: #444444;
        font-size: 18px;
        font-weight: bold;
        line-height: 64px;
    }
    .service-intro {
        width: 100%;
        border-top: 1px solid #b2dfdb;
    }
    .servece-type {
        margin: 15px auto;
        height: 150px;
        width: 800px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .servece-type-info {
        color: #666666;
    }
    .servece-type-info ul {
        list-style: none;
    }
    .servece-type-info li {
        font-size: 14px;
        cursor: pointer;
        line-height: 26px;
        margin-bottom: 7px;
    }
    .servece-type-info li:first-child {
        font-size: 16px;
        line-height: 28px;
        font-weight: bold;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .friend-link {
        display: flex;
        align-items: center;
        width: 908px;
        height: 30px;
        margin: 0px auto;
        color: #666;
        border-top: 1px solid #b2dfdb;
    }
    .friend-link-item {
        margin: 0px auto;
    }
    .friend-link-item ul {
        list-style: none;
    }
    .friend-link-item li {
        padding: 5px 0px;
        float: left;
    }
    .link-item {
        padding: 0px 8px;
        cursor: pointer;
        border-right: 1px solid #ccc;
    }
    .link-last-item {
        border: none;
    }
    .copyright {
        width: 100%;
        color: #666;
        line-height: 30px;
        text-align: center;
    }
    .copyright a{
        color: #232323;
        font-size: 20px;
    }
</style>
