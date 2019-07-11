<template>
<div>
<!--    <div>
      {{$route.params.id}}
    </div>-->

      <!--产品名称等基本信息-->
<div class="invest-plan border shadow" >
    <div class="invest-left-info " >
        <div class="invest-title ">
        {{investTitle}}
        </div>
        <div class="invest-info-num">
            <table class="info">
                <tbody>
                    <tr class="num">
                        <td class="orange border-right"><strong>{{(num.interest_rate*100).toFixed(2)}}</strong>%</td>
                        <td class="amount border-right"><strong>{{num.amount}}</strong>元</td>
                        <td class="months"><strong>{{num.months}}</strong>个月</td>
                    </tr>
                    <tr class="text">
                        <td class="border-right">利率</td>
                        <td class="border-right">投资金额</td>
                        <td>回收时长</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="invest-info-data">
                <span style="margin: 0px 15px">编号<span>{{investInfo.id}}</span></span>
                <span style="margin: 0px 15px">创建时间<span>{{investInfo.time}}</span></span>
                <span style="margin: 0px 15px">下架时间<span>{{investInfo.failTime}}</span></span>
        </div>
    </div>

    <div class="invest-right-info ">
        <div class="income-text" style="font-size: 14px;color: #696969;">预期收益</div>
        <div class="invest-income" style="font-size: 30px">￥{{(num.amount*num.interest_rate).toFixed(2)}}</div>
        <div class="invest-button" style="padding: 0px;margin: auto;">
            <button class="i-button" @click="dialogVisible=true">确认投资</button>
        </div>
    </div>
</div>
    <el-dialog
            title="支付密码输入"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
    ><div>
        <el-input placeholder="请输入密码" v-model.trim="payment_password" show-password></el-input>
    </div>
        <span slot="footer" class="dialog-footer">
                 <el-button @click="handleClose">取 消</el-button>
                 <el-button type="primary" class="greenbutton" @click="handlePurchase()">确认支付</el-button>
               </span>
    </el-dialog>
  <!--详细辅助信息-->
<div class="invest-details-info">
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="投资周期" name="first" >
                <img src="../../../../public/images/investPeriod.png"/>
            </el-tab-pane>
            <el-tab-pane label="投资详情" name="second">
                <div class="item">
                    <div class="item-title">如何获得收益</div>
                    <div class="item-content">
                        1开始计息：根据您所持有的借款项目放款时间，就出借的某一借款项目而言，待该等借款项目向借款人账户划付后开始计算收益。 2获得收益：到期一次性还本付息。系统会根据您持有项目的实际还款情况，将收到的本息返还至您账户的可用余额。每次新增出借时，您所分配到的项目可能会有所不同，请以实际分配到项目的还款为准。 3本息再出借：本款产品不支持本息再出借，收到的项目回款会自动返还到您账户的可用余额。4提前还款：项目发生提前还款时，会提前归还您的出借本金及相应利息至“可用余额”。提前还款时，将根据实际借款期限，计算您应获得的利息收益。5逾期收益：逾期项目会由第三方负责处置全部逾期本息，逾期处置期间不会产生任何收益。视第三方处置速度，可能会存在几天的到账延迟。
                    </div>
                    <div class="item">
                        <div class="item-title">何时到期</div>
                        <div class="item-content">在借款项目到期后的1-5个工作日内，将所获得的还款本息返还至您账户的可用余额。由于第三方处置逾期项目的速度快慢，可能导致逾期项目的实际还款时间存在延迟。</div>
                    </div>
                    <div class="item">
                        <div class="item-title">如何退出</div>
                        <div class="item-content">本产品不支持债权转让退出，您所持有项目全部到期或被第三方全部处置后退出。</div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="投资合同" name="third" style="padding-bottom: 40px">
                <span style="position: relative;left:20px;top: 20px;" @click="$router.push('/contract')">点击查看个人贷款合同</span>
                </el-tab-pane>
            <el-tab-pane label="常见问题" name="fourth">
                    <ul>
                        <li v-for="(item,index) in qaArray" v-bind:key="item.id">
                            <p clsaa="q">{{index+1}}. {{item.q}}</p>
                            <p class="a">{{item.a}}</p>
                        </li>
                    </ul>
                </el-tab-pane>
        </el-tabs>
  </div>
</div>

</template>

<script>

  import {mapState} from 'vuex'
  import {reqGetInvesmentDetails,reqPurchase} from "../../../api";


  export default {
      name: "InvestmentDetails",
      computed:{
        ...mapState({
            isLogin:state=>state.User.isLogin
        })
      },
      mounted(){
          if(!this.isLogin){
              this.$router.push('/')
          }
          reqGetInvesmentDetails(this.$route.params.id).then((response)=>{
              if(response.code===0){
                  this.investTitle = response.data.title
                  this.num.amount = response.data.amount
                  this.num.interest_rate = response.data.interest_rate
                  this.num.months = response.data.loan_month
                  this.investInfo.time = new Date(response.data.create_time).toLocaleString('chinese',{hour12:false}).replace(/\//g, "-")
                  this.investInfo.failTime = new Date(response.data.purchase_deadline).toLocaleString('chinese',{hour12:false}).replace(/\//g, "-")
              }
              else
              {
                  this.$message.error(response.msg)
                  this.$router.push('/')
              }
          })
      },
      methods:{
          handleClose(){
              this.dialogVisible=false
              this.payment_password=''
          },
          handlePurchase(){
              if(this.payment_password===''){
                  this.$message.error('请输入支付密码')
                  return
              }
              reqPurchase({
                  application_id:this.investInfo.id,
                  payment_password:this.payment_password
              }).then((response)=>{
                  if(response.code===0){
                      this.$message.success('投资成功！')
                      this.dialogVisible=false
                      this.payment_password=''
                      this.$store.commit('InvestmentList/init')
                      this.$router.push('/')
                  }
                  else{
                      this.$message.error(response.msg)
                  }
              }).catch(()=>{
                  this.$message.error('请检查网络连接')
              })
          }
      },
      data () {
          return {
              activeName: 'first',
              status: false,
              payment_password:'',
              dialogVisible:false,
              investTitle:'超级赚钱投就对了',
              num:{
                  interest_rate: 4.8,
                  amount: 9600,
                  months:6,
              },
              investInfo:{
                  id: this.$route.params.id,
                  time:"2019-6-20",
                  failTime:"2019-9-20"
              },
              qaArray:[
                  {
                      q:'我加入某项目并出借1万元，到期后我能赚到多少钱？',
                      a:'项目收益为投资金额乘以利率，最终收益以实际还款为准。'
                  },
                  {
                      q:'投资项目安全吗？',
                      a:'借款项目担保方式为保证金担保，连带责任担保保障。'
                  },
                  {
                      q:'何时开始计息？我什么时候会收到本金和利息？',
                      a:'出借提交成功后，待您拟出借的借款项目向借款人账户划付后开始计算收益。出借某个借款项目收到的利息将先扣除居间服务费后（具体费用请参考《点融平台出借人费用表》），按出借人向借款人的出借金额比例支付利息。 投资项目为到期一次性还本付息的借款项目，项目到期后，会一并结算到期本息，预计1-5个工作日返还至您账户的“可用余额”。由于第三方在处置逾期项目可能存在时间差异，实际到账时间可能会根据您持有的项目情况有所不同或延迟。'
                  },
                  {
                      q:'我的钱投给了谁？我怎么知道还款情况如何？',
                      a:'VRB平台坚持向出借人披露每一笔资金的去向，和每一笔借款的还款情况。您可至“投资详情”查看详情。'
                  },
                  {
                      q:'我能否发起债权转让？',
                      a:'该项目不支持债权转让。到期后自动结算本息。'
                  }
              ]
              }
          },
  }
</script>

<style scoped>
    /*表格属性*/
    table {
        border-collapse: collapse;
        border-spacing: 2px;
        table-layout: fixed;
        margin-top: 10px;
    }
    /*行标签属性*/
    tr{
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
    }
    /*标签单元格属性*/
    td{
        color: #696969;
        text-align:center;
    }
    strong{
        font-size: 50px;
    }
    img{
        max-width: 1000px;
    }
    .invest-plan{
        background: #fff;
/*        margin-left: 120px;
        margin-right: 120px;
        margin-bottom: 50px;
        margin-top: 40px;*/
        margin: 40px 120px 40px 120px;
        /*height: 300px;*/
        display: inline-block;
        box-sizing: border-box;
        border: 1px solid #e4e4e4;
        font-size: 24px;
    }
    /*投资计划左侧栏*/
    .invest-left-info {
        width: 65%;
        display: inline-block;
        border-right: 1px solid #e4e4e4;
    }
    /*投资计划右侧栏*/
    .invest-right-info{
        width: 35%;
        float: right;
        text-align: center;
        padding-top: 40px;
    }
    /*左侧-标题*/
    .invest-title{
        height: 60px;
        padding-top: 15px;
        color: #696969;
        text-align: center;
    }
    /*左侧-数据*/
    .invest-info-num{
        padding: 0 4px;
        width: 100%;
    }
    /*左侧-数据-表格总属性*/
    .info{
        width: 100%;
        margin: 0 auto;
        /*font-family: "microsoft yahei";*/
    }
    /*左侧-数据*/
    .num {
        font-size: 18px;
        padding: 7px 0;
    }
    .text{
        font-size: 14px;
        padding: 0px;
    }
    .border-right{
        border-right: 1px solid #e4e4e4;

    }

    .orange{
        color: #ff7200;
        font-size: 24px;
        /*font-family: "microsoft yahei";*/

    }
    .invest-info-data{
        margin: 40px 0px;
        width: 100%;
        display: inline-block;
        font-size: 14px;
        color: #696969;
        text-align: center;
    }
    .i-button{
        background: #00bc8d;
        border-radius: 30px;
        border: 1px solid transparent;
        width: 200px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        margin-top: 40px;
        outline: none;
    }
    .invest-details-info{
        margin-left: 120px;
        margin-right: 120px;
        margin-bottom: 40px;
    }
    .invest-button {
        padding: 0 0 0 50px;
        background: #fff;
        width: 270px;
    }

    .item-title{
        color: #4a4a4a;
        font-size: 16px;
        margin: 20px 0 14px 10px;

    }
    .item-title::before{
        position: relative;
        top: 1px;
        left: -7px;
        content: ".";
        color: transparent;
        width: 3px;
        height: 16px;
        background-color: #ff6c03;
    }

    .item-content{
        color: #999999;
        font-size: 14px;
        padding: 0 40px 0 40px;
    }
    .a{
        color: #4a4a4a;
        font-size: 14px;
    }
    tabsPane {
        margin: 20px;
        padding: 10px;
        width: 832px;
        position: relative;
        float: left;
    }
    .shadow{
/*        -webkit-box-shadow: #666 0px 0px 10px;
        -moz-box-shadow: #666 0px 0px 10px;*/
        box-shadow: #e4e4e4 0px 0px 8px;
    }
    .greenbutton{
        background-color: #1C745A !important;
        color:#FFF;
        border-color:#1C745A;
        outline:none;
    }

</style>
