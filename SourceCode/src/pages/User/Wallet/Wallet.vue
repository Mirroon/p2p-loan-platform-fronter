<template>
  <div class="normal">
    <div class="leftline">
        <div class="leftlinetop">
            <div class="smallHeader"><img v-bind:src="userInfo.headerImgURL"/></div>
            <div class="username">
              <p style="color: #000000">{{userInfo.name}}</p>
            </div>
        </div>
        <div class="liftlinesection">
            <div class="inf">账户</div>
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            >
            <el-menu-item index="1" @click="handleCurrentChange(1)" href="javascript:location.reload()">
              <i class="el-icon-location"></i>
              <span slot="title">用户详情</span>
            </el-menu-item>
            <el-menu-item index="2" @click="handleCurrentChange(2)" href="javascript:location.reload()">
              <i class="el-icon-location"></i>
              <span slot="title">用户充值</span>
            </el-menu-item>
            <el-menu-item index="3" @click="handleCurrentChange(3)" href="javascript:location.reload()">
              <i class="el-icon-location"></i>
              <span slot="title">用户提现</span>
            </el-menu-item>
            <el-menu-item index="4" @click="handleCurrentChange(4)" href="javascript:location.reload()">
              <i class="el-icon-location"></i>
              <span slot="title">用户绑卡</span>
            </el-menu-item>
            <el-menu-item index="5" @click="handleCurrentChange(5)" href="javascript:location.reload()">
              <i class="el-icon-location"></i>
              <span slot="title">支付密码</span>
            </el-menu-item>
          </el-menu>
          </div>
        </div>
      <div class="rightline" v-show="itindex=='1'">
        <div class="rightlinetop">
          账户详情
        </div>
        <hr style="margin: 0px">
        <div class="rightlinebuttom">
          <div class="rest">
            V币余额
          </div>
          <div class="restmoney">
            <div class="resttext2">{{userInfo.balance}}</div>
          </div>
          <div class="boxbutton">
          </div>
          <div class="thriduserid">
              支付平台ID：{{userInfo.thirduser_id}}
            </div>
        </div>
       </div>
       <div class="rightline" v-show="itindex=='2'">
          <div class="rightlinetop">
            V币充值
          </div>
          <hr style="margin: 0px">
          <div class="rightlinebuttom">
            <div class="rest">
              充值金额
            </div>
            <div class="restmoney">
              <form id="recharge" target="iframe">
                <input class="resttext3" v-model="recharge_money"
                 type="text"
                 placeholder="充值金额(元)" style="border: none; font-size: 25px;outline: none"
                 maxlength="8"
                 title="Recharge"
                 >
              </form>
            </div>
            <div class="boxbutton">
              <button class="subbutton" type="submit" form="recharge" @click="confirmRecharge()">账户充值</button>
            </div>
          </div>
         </div>
         <el-dialog
          title="银行卡密码输入"
          :visible.sync="dialogVisible_recharge"
          width="30%"
          :before-close="handleClose"
          ><div>
              <el-input placeholder="请输入密码" v-model="userInfo.card_password" show-password></el-input>
          </div>
             <span slot="footer" class="dialog-footer">
               <el-button @click="handleClose()">取 消</el-button>
               <el-button type="primary" class="greenbutton" @click="modifyRecharge()">确认充值</el-button>
             </span>
          </el-dialog>

         <div class="rightline" v-show="itindex=='3'">
            <div class="rightlinetop">
              用户提现
            </div>
            <hr style="margin: 0px">
            <div class="rightlinebuttom">
              <div class="rest">
                提现金额
              </div>
              <div class="restmoney">
                <div class="resttext2"><form id="withdraw" target="iframe">
                    <input class="resttext3" v-model="withdraw_money"
                     type="text"
                     placeholder="提现金额(元)" style="border: none; font-size: 25px; outline: none"
                     maxlength="8"
                     title="Withdraw"
                     >
                  </form></div>

              </div>
              <div class="boxbutton">
                  <button class="subbutton" type="submit" form="withdraw" @click="confirmWithdraw()">用户提现</button>
              </div>
            </div>
           </div>
           <el-dialog
            title="支付密码输入"
            :visible.sync="dialogVisible_withdraw"
            width="30%"
            :before-close="handleClose"
            ><div>
               <el-input placeholder="请输入密码" v-model="userInfo.pay_password" show-password></el-input>
            </div>
               <span slot="footer" class="dialog-footer">
                 <el-button @click="handleClose()">取 消</el-button>
                 <el-button type="primary" class="greenbutton" @click="modifyWithdraw()">确认提现</el-button>
               </span>
           </el-dialog>
           <div class="rightline" v-show="itindex=='4'">
            <div class="rightlinetop">
              银行卡绑定
            </div>
            <hr style="margin: 0px">
            <div class="rightlinebuttom">
              <div class="rest">
                当前绑定银行卡信息
              </div>
              <div class="card" v-show="determination_card()">
                {{userInfo.card_info.substring(0,4)+'***********'+userInfo.card_info.substring(15,19)}}
              </div>
              <div class="card" v-show="!determination_card()">
                暂无绑定银行卡信息
              </div>
              <div class="cardbutton">
                  <el-button v-show="!determination_card()" class="greenbutton" @click="dialogVisible_card = true">用户绑卡</el-button>
                  <el-button v-show="determination_card()" class="greenbutton" @click="dialogVisible_card = true">用户解绑</el-button>
              </div>
            </div>
           </div>
           <el-dialog
            title="用户银行卡操作"
            :visible.sync="dialogVisible_card"
            width="30%"
            :before-close="handleClose"
            ><div>
               <el-input placeholder="请输入银行卡号" v-model="newcard_info" v-show="!determination_card()"></el-input>
               <el-input placeholder="请输入银行卡密码" v-model="newcard_pass" show-password style="margin-top: 10px"></el-input>
            </div>
               <span slot="footer" class="dialog-footer">
                 <el-button @click="handleClose()">取 消</el-button>
                 <el-button v-show="!determination_card()" type="primary" class="greenbutton" @click="modifyCard()">确认绑卡</el-button>
                 <el-button v-show="determination_card()" type="primary" class="greenbutton" @click="modifyDelCard()">确认解绑</el-button>
               </span>
           </el-dialog>
           <div class="rightline" v-show="itindex=='5'">
            <div class="rightlinetop">
              支付密码
            </div>
            <hr style="margin: 0px">
            <div class="rightlinebuttom">
              <div class="rest">
                当前密码
              </div>
              <div class="card" v-show='determination_paypassword()'>
                支付密码已设置
              </div>
              <div class="card" v-show='!determination_paypassword()'>
                支付密码未设置
              </div>
              <div class="cardbutton">
                  <el-button v-show='determination_paypassword()' class="greenbutton" @click="dialogVisible_pay = true">修改密码</el-button>
                  <el-button v-show='!determination_paypassword()' class="greenbutton" @click="dialogVisible_pay = true">设置密码</el-button>
              </div>
            </div>
           </div>
           <el-dialog
            title="支付密码"
            :visible.sync="dialogVisible_pay"
            width="30%"
            :before-close="handleClose"
           ><div>
              <el-input placeholder="请输入当前支付密码" v-model.trim="now_paypassword" show-password v-show="determination_paypassword()"></el-input>
              <el-input placeholder="请输入新的支付密码" v-model.trim="new_paypassword" show-password style="margin-top: 10px"></el-input>
              <el-input placeholder="请输入确认密码输入" v-model.trim="new_paypasswordcon" show-password style="margin-top: 10px"></el-input>
            </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose()">取 消</el-button>
                <el-button type="primary" class="greenbutton" @click="modifyPaypassword()" v-show="determination_paypassword()">确认修改</el-button>
                <el-button type="primary" class="greenbutton" @click="modifySetPaypassword()" v-show="!determination_paypassword()">确认设置</el-button>
              </span>
           </el-dialog>
           <iframe name="iframe" style="display: none"></iframe>
       </div>

</template>

<script>
  import {mapState} from 'vuex'

  //支付密码接口{设置密码，修改密码，查询密码是否存在}
  import {reqSetThirdPassword, reqModifyThirdPassword,reqVerifyThirdPassword} from "../../../api"
  //余额查询{}
  import {reqFindBalance} from "../../../api"
  //充值提现{充值，提现}
  import {reqRecharge, reqWithdraw} from "../../../api"
  //银行卡操作{绑定，查询已绑定银行卡，解绑}
  import {reqAddBankAccount, reqFindCard, reqUntieBankCard} from "../../../api"


  export default {
      name: "Wallet",
      computed: {
        ...mapState({
          user_message:state=>state.User.user_message,
          isLogin:state=>state.User.isLogin
        })
      },
      data(){
        return{
          itindex: '1',
          dialogVisible_recharge: false,
          dialogVisible_withdraw: false,
          dialogVisible_card: false,
          dialogVisible_pay: false,
          withdraw_money: '',
          recharge_money: '',
          password: '',
          newcard_info: '',
          new_paypassword: '',
          new_paypasswordcon: '',
          now_paypassword: '',
          newcard_pass: '',
          moneyoutNumber: '',
          userInfo: {
                    userID: -1,
                    name: '我的名字',
                    thirduser_id:'',
                    balance: 0,
                    card_password: '',
                    headerImgURL: require("../../../../public/images/headerImg/nullUser.jpeg"),
                    card_info: '',
                    password_status: false,
                },
            };
        },
      mounted () {
          if(!this.isLogin){
              this.$router.push('/')
              return
          }
            var user = {
                userID: this.user_message.user_id,
                name: this.user_message.name,
                thirduser_id: this.user_message.third_party_id,
                headerImgURL: require('../../../../public/images/headerImg/testUser.jpeg'),
                card_info: '',
            }

            if(user.userID>0){
                this.userInfo.userID = user.userID,
                this.userInfo.name = user.name,
                this.userInfo.thirduser_id= user.thirduser_id,
                this.userInfo.headerImgURL=user.headerImgURL,
                reqVerifyThirdPassword().then((response)=>{
                  if(response.code===0){
                    this.userInfo.password_status=response.data.isSet
                  }
                }).catch(()=>{
                    this.$message.error("查询失败，请检查网络连接")
                })

                reqFindCard().then((response)=>{
                  if(response.code===0){
                    this.userInfo.card_info=response.data.card_number
                  }
                }).catch(()=>{
                    this.$message.error("查询失败，请检查网络连接")
                })

                reqFindBalance().then((response)=>{
                  if(response.code===0){
                    this.userInfo.balance=response.data.balance
                  }
                  else{
                    this.$message.error(response.msg)
                    return false
                  }
                }).catch(()=>{
                    this.$message.error("查询失败，请检查网络连接")
                })



            }

        },
        methods: {
          handleClose(done) {
            this.userInfo.pay_password=''
            this.userInfo.card_password=''
            this.newcard_info=''
            this.newcard_pass=''
            this.now_paypassword=''
            this.new_password=''
            this.new_paypasswordcon=''
            this.new_paypassword=''
            this.dialogVisible_recharge=false,
            this.dialogVisible_withdraw=false,
            this.dialogVisible_card=false,
            this.dialogVisible_pay=false,
            done();
        },
          UntieBankCard(){
            reqUntieBankCard({
              payment_password: this.newcard_pass
            }).then((response)=>{
              if(response.code===0){
                this.$message.success(response.msg)
                reqFindCard().then((responses)=>{
                  if(responses.code===0){
                    this.userInfo.card_info=responses.data.card_number
                  }
                  else{
                    this.userInfo.card_info=''
                    return false
                  }
                }).catch(()=>{
                    this.$message.error("查询失败，请检查网络连接")
                })
                this.newcard_pass=''
                this.newcard_info=''
                this.dialogVisible_card = false
              }
              else
              {
                this.$message.error(response.msg)
                return false
              }
              }).catch(()=>{
                this.$message.error("解绑失败，请检查网络连接")
              })
          },
          Recharge(){
            reqRecharge({
              payment_password: this.userInfo.card_password,
              amount: this.recharge_money
            }).then((response)=>{
              if(response.code===0){
                this.$message.success(response.msg)
                reqFindBalance().then((responses)=>{
                  if(responses.code===0){
                    this.userInfo.balance=responses.data.balance
                    this.recharge_money=''
                    this.userInfo.card_password=''
                    this.dialogVisible_recharge = false
                  }
                  else{
                    return false
                  }
                })
              }
              else
              {
                this.$message.error(response.msg)
                return false
              }
              }).catch(()=>{
                this.$message.error("支付失败，请检查网络连接")
              })
          },
          Withdraw(){
            reqWithdraw({
              payment_password: this.userInfo.pay_password,
              amount: this.withdraw_money
            }).then((response)=>{
              if(response.code===0){
                this.$message.success(response.msg)
                reqFindBalance().then((responses)=>{
                  if(responses.code===0){
                    this.userInfo.balance=responses.data.balance
                    this.withdraw_money=''
                    this.userInfo.pay_password=''
                    this.dialogVisible_withdraw = false
                  }
                  else{
                    return false
                  }
                })
              }
              else
              {
                this.$message.error(response.msg)
                return false
              }
              }).catch(()=>{
                this.$message.error("提现失败，请检查网络连接")
              })
          },
          AddBankAccount(){
            reqAddBankAccount({
              card_id: this.newcard_info,
              payment_password: this.newcard_pass
            }).then((response)=>{
              if(response.code===0){
                this.$message.success(response.msg)
                reqFindCard().then((responses)=>{
                  if(responses.code===0){
                    this.userInfo.card_info=responses.data.card_number
                    this.newcard_info=''
                    this.newcard_pass=''
                    this.dialogVisible_card = false
                  }
                  else{
                    this.$message.error(responses.msg)
                    return false
                  }
                }).catch(()=>{
                    this.$message.error("银行卡查询失败，请检查网络连接")
                })
              }
              else
              {
                this.$message.error(response.msg)
                return false
              }
              }).catch(()=>{
                this.$message.error("绑定失败，请检查网络连接")
              })
          },

          SetThirdPassword(){
            reqSetThirdPassword({
              payment_password: this.new_paypassword
            }).then((response)=>{
              if(response.code===0){
                this.$message.success(response.msg)
                reqVerifyThirdPassword().then((response)=>{
                  if(response.code===0){
                    this.userInfo.password_status=response.data.isSet
                    this.new_paypassword=''
                    this.new_paypasswordcon=''
                    this.dialogVisible_pay = false
                  }
                  else{
                    this.$message.error(response.msg)
                    return false
                  }
                }).catch(()=>{
                    this.$message.error("查询失败，请检查网络连接")
                })
              }
              else
              {
                this.$message.error(response.msg)
                return false
              }
              }).catch(()=>{
                this.$message.error("密码设置失败，请检查网络连接")
              })
          },
          ModifyThirdPassword(){
            reqModifyThirdPassword({
              old_password: this.now_paypassword,
              new_password: this.new_paypassword
            }).then((response)=>{
              if(response.code===0){
                this.$message.success(response.msg)
                this.now_paypassword=''
                this.new_paypassword=''
                this.new_paypasswordcon=''
                this.dialogVisible_pay = false
            }
              else
              {
                this.$message.error(response.msg)
                return false
              }
              }).catch(()=>{
                this.$message.error("密码修改失败，请检查网络连接")
              })
          },

          handleCurrentChange(val){
            this.itindex=val;
          },

          cardInfoGet(){
            this.card_info='fei kai';
          },
          openRecharge(){

          },
          confirmRecharge(){
            const reg = /^[1-9][0-9]{0,7}$/

            if(this.userInfo.card_info===''){
                  this.$message.error('请先绑定银行卡')
                  return false
            }
            if(reg.test(this.recharge_money))
            {
                this.dialogVisible_recharge=true
                return true
            }
            else
            {
                this.$message.error('请输入合法充值金额')
                return false
            }
          },
          confirmWithdraw(){
            const reg = /^[1-9][0-9]{0,7}$/

            if(this.userInfo.card_info===''){
                  this.$message.error('请先绑定银行卡')
                  return false
            }
            if(!this.userInfo.password_status){
                  this.$message.error('请先设置支付密码')
                  return false
            }

            if(reg.test(this.withdraw_money))
            {
                this.dialogVisible_withdraw=true
                return true
            }
            else
            {
                this.$message.error('请输入合法提现金额')
                return false
            }
          },
          determination_card(){
            if(this.userInfo.card_info===''){
              return false
            }
            else{
              return true
            }
          },
          determination_paypassword(){
              return this.userInfo.password_status
          },
          modifySetPaypassword()
            {
                if(this.new_paypassword==='')
                {
                    this.$message.error('支付密码不能为空')
                    return
                }
                if(this.new_paypassword!=this.new_paypasswordcon)
                {
                    this.$message.error('请确保两次输入的支付密码相同')
                    return
                }
                this.SetThirdPassword()
            },
            modifyPaypassword()
            {
                if(this.new_paypassword==='')
                {
                    this.$message.error('新密码不能为空')
                    return
                }
                if(this.new_paypassword!=this.new_paypasswordcon)
                {
                    this.$message.error('请确保两次输入的新密码相同')
                    return
                }
                this.ModifyThirdPassword()
            },
            modifyRecharge(){
              const reg = /^[0-9]{6}$/
              if(this.userInfo.card_password==='')
                {
                    this.$message.error('银行卡密码不能为空')
                    return
                }
                if(!reg.test(this.userInfo.card_password))
                {
                    this.$message.error('非法银行卡密码输入')
                    return
                }
                this.Recharge()
            },
            modifyWithdraw(){
              if(this.userInfo.pay_password==='')
                {
                    this.$message.error('支付密码不能为空')
                    return
                }
                this.Withdraw()
            },
            modifyCard(){
              const reg1 = /^[0-9]{16,19}$/
              const reg2 = /^[0-9]{6}$/
                if(this.newcard_pass==='')
                {
                    this.$message.error('银行卡密码不能为空')
                    return
                }
                if(this.newcard_info==='')
                {
                    this.$message.error('银行卡账号不能为空')
                    return
                }
                if(!reg2.test(this.newcard_pass))
                {
                    this.$message.error('非法银行卡密码输入')
                    return
                }
                if(!reg1.test(this.newcard_info))
                {
                    this.$message.error('非法银行卡输入')
                    return
                }
                this.AddBankAccount()
            },
            modifyDelCard(){
              const reg2 = /^[0-9]{6}$/
                if(this.newcard_pass==='')
                {
                    this.$message.error('银行卡密码不能为空')
                    return
                }
                if(!reg2.test(this.newcard_pass))
                {
                    this.$message.error('非法银行卡密码输入')
                    return
                }
                this.UntieBankCard()
            },
          /*
          handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
            done();
            })
            .catch(_ => {});
          }*/

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
  .normal{
    width:1200px;
    background: #ffffff;
    height: 500px;
  }
  .leftline{
    float: left;
    width: 200px;
    margin: 40px;

  }
  .input.disabled{
    background-color: #ffffff;
    color:#000000;
  }
  .inf{
    margin-top:30px;
    border: 2px solid #e4e4e4;
    font-size: 20px;
    background: #eef2f4;
    text-align: center;

    border-radius: 4px;
  }
  .leftlinetop{
    height: 90px;
    font-size: 20px;
    border: 2px solid #e4e4e4;
    border-radius: 4px;

  }
  .leftlinesection{
    margin-top: 80px;
    border: 2px solid #e4e4e4;
    border-radius: 4px;

  }
  .rightline{
    float:left;
    width: 700px;
    margin: 40px;
    line-height: 40px;
    text-align: left;
    border: 2px solid #e4e4e4;
    border-radius: 4px;

  }
  .rightlinetop{
    padding: 20px;
    font-size: 27px;
    background: #eef2f4;
    color: #000000;
    border-radius:4px 4px 0 0;
  }
  .rightlinebuttom{
    height: 300px;
  }
  .rest{
    height: 40px;
    margin: 20px;
    font-size: 24px;
  }
  .restmoney{
    margin:20px;
    font-size: 40px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    height: 100px;
    width: 300px;
    float: left;
  }
  .thriduserid{
    height: 80px;
    margin-top: 120px;
    margin-left: 400px;
    text-align: left;
    font-size: 20px;
    line-height: 80px;
  }
  .card{
    margin:20px;
    font-size: 30px;
    text-align: center;
    line-height: 100px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    height: 100px;
  }
  .cardbutton{
    margin:20px;
    text-align: center;
    height: 100px;
  }
  .resttext1{
    line-height: 100px;
    margin-left: 10px;
    text-align: right;
    float: left;
  }
  .resttext2{
    line-height: 100px;
    width: 260px;
    text-align: right;
    float: left;
  }
  .resttext3{
    line-height: 95px;
    width: 200px;
    margin-left: 20px;

    float: left;
  }
  .boxbutton{
    float: left;
    margin:30px;
    margin-top:60px;

  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .smallHeader{
        margin: 10px;
        width: 60px;
        height: 60px;
        /*圆角*/
        border-radius: 50%;
        /*圆角外不显示*/
        overflow: hidden;
        text-align: center;
        float: left;
    }
    .username{
      float: left;
      margin-left: 10px;
      margin-top: 10px;
      font-size: 20px;
      height: 60px;
      line-height: 70px;

    }
    .subbutton{
      background-color: #1C745A !important;
      color:#FFF;
      border-color:#1C745A;
      outline:none;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
      box-sizing: border-box;
      padding: 0px 20px;
      border: 1px solid #1C745A;
      text-align: center;
    }
    .subbutton:focus, .subbutton:hover{
      color:#409eff;
      border-color:#c6e2ff;

    }
    .greenbutton{
        background-color: #1C745A !important;
        color:#FFF;
        border-color:#1C745A;
        outline:none;
    }

  </style>
