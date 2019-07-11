<template>
    <div style="background-color:  #f5f5f5">
      <div class='outline'></div>
      <div class="main-about-us">
      <el-tabs :tab-position="tabPosition" v-model="this.$route.params.text_id">
        <el-tab-pane label="借款流程" name="borrow-process">
            <div class="main-about-us-right-part" style="background-color: white">
                <h5 style="height: 60px; line-height: 70px;padding-left: 10px">借款流程</h5>
                <div class="network-post">
                    <img src="../../../public/images/investPeriod.png" style="width: 100%">
                </div>
            </div>
        </el-tab-pane>

        <el-tab-pane label="投资流程" name=investment-process>
            <div class="main-about-us-right-part" style="background-color: white">
                <h5 style="height: 60px; line-height: 70px;padding-left: 10px">投资流程</h5>
                <div class="network-post">
                    <img  src="../../../public/images/investPeriod.png" style="width: 100%">
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="投资风险" name="investment-risk">
            <div class="main-about-us-right-part" style="background-color: white">
                <h5 style="height: 60px; line-height: 70px;padding-left: 10px">投资风险</h5>
                <div style="margin: 20px 40px 60px 40px;font-size: 14px;color: #696969;">
                    根据有关法律法规，网络借贷信息中介机构做出如下风险揭示及声明：

                    <h6 class='h_title'>一、政策风险： </h6>
                    因国家宏观政策和相关法律法规规则发生变化以及监管部门对金融市场和网贷行业监管政策的调整，可能影响VRB平台系统实时匹配交易功能服务的正常提供，亦可能影响借款的资金成本和履约表现，从而产生本息损失的风险。

                    <h6 class='h_title'>二、信用风险：</h6>
                    VRB平台不对借款项目本金和收益提供任何保证或承诺。借款项目中的任何其他交易方无力或无意愿按时足额履约产生的风险由相关方自行承担，与VRB平台无涉。在发生不利情况下（可能但并不一定发生），可能不利于出借人实现借款项目的预期收益甚至本金遭受损失。

                    <h6 class='h_title'>三、宏观经济及市场风险：</h6>
                    由于宏观经济形势变化、市场供求关系、利率变动、资产价值波动等不确定的未来市场变化，在发生不利情况下（可能但并不一定发生），可能不利于出借人实现借款项目的预期收益甚至本金遭受损失。

                    <h6 class='h_title'>四、提前终止风险：</h6>
                    根据市场环境变化以及监管部门的要求，VRB平台有权停止系统实时匹配交易功能，在提前终止情形下，出借人面临丧失投资及再投资机会的风险，借款人面临需另行寻找资金以及机会损失的风险。

                    <h6 class='h_title'>五、信息传递风险：</h6>
                    VRB平台将按协议约定进行信息披露，出借人/借款人应充分关注并及时主动查询借款项目相关信息，如未及时查询，或由于通讯故障、系统故障以及其他不可抗力等因素的影响使得无法及时了解借款项目信息，由此产生责任和风险应由出借人/借款人自行承担。

                    <h6 class='h_title'>六、不可抗力及意外事件风险：</h6>
                    包括但不限于自然灾害、金融市场危机、战争、黑客攻击、病毒感染等不能预见、不能避免、不能克服的不可抗力事件，对于由于不可抗力及意外事件风险导致的任何损失，出借人/借款人须自行承担。

                    <h6 class='h_title'>七、促成失败风险：</h6>
                    每次借款的促成需符合相关法律法规的规定和相关协议/规则的约定，可能存在不能满足成立条件从而无法成立的风险。

                    <h6 class='h_title'>八、退出风险：</h6>
                    出借人提前退出某一借款项目的申请经VRB平台确认后方可进行，经确认后出借人持有的借款项目将以债权转让方式通过VRB平台进行转让。VRB平台不对债权转让完成的时间以及债权转让能否全部成功实现做出任何承诺，出借人因债权转让申请未成功完成将面临资金不能变现、丧失其他投资机会的风险。

                    <h6 class='h_title'>九、税收风险: </h6>
                    对于借款项目所适用的税务政策，中国财政机关和税务机关尚未制定统一、完善的税务法律体系，且由于各地方政府税务机关存在执行不统一、稳定性差、缺乏足够的政策支持等特点，出借人的利息收入可能会因相应的税收政策的变化而受到不利影响。

                    <h6 class='h_title'>十、管理风险: </h6>
                    网络借贷信息中介机构的知识、经验、判断、决策、技能等，会影响其对信息的搜集、信息交互和对借款人的资信评估，将会影响出借人的利息收入，从而产生风险。



                    特别提示

                    前述风险提示不能穷尽全部风险及市场的全部情形。
                </div>
            </div>

        </el-tab-pane>
        <el-tab-pane label="风险管理" name="risk-management">
        <div class="module" style="background-color: #32cb9f ;">
            <div class="icon">
                <img style="position: relative;left: 120px;top:100px" src="../../../public/images/dispersion.png">
            </div>
            <div class="info" style="width: 640px;color: white;position:relative;left: 300px;float: left;margin-right: 40px">
                <h3 style="margin-bottom: 20px">高度分散</h3>
                <p>创新系统实时匹配交易技术，帮助出借人将资金向大量借款项目完成出借，分散出借风险。</p>
            </div>
        </div>
        <div class="module" style="background-color: white ;">
            <div class="info" style="color: #141d26;display: inline-block;float: left;position: relative;top: 105px;margin-left: 80px">
                <h3 style="margin-bottom: 20px;">严谨的风控管理系统</h3>
                <p>结合高效信审及实地审核，标准化风险定价，有效控制风险。</p>
            </div>
            <div class="icon">
                <img style="position: relative;left: 700px;top:0px" src="../../../public/images/control.png">
            </div>
        </div>
        <div class="module" style="background-color: antiquewhite ;">
            <div class="icon">
                <img style="position: relative;left: 120px;top:100px" src="../../../public/images/tech.png">
            </div>
            <div class="info" style="width:640px;color: #696969;display: inline-block;float: right;margin-right: 40px">
                <h3 style="margin-bottom: 20px">技术保障</h3>
                <p>业界领先的分布式平台架构和核心技术功能（包括电子钱包、用户交易体系、结算清算等底层功能）。</p>
            </div>
        </div>
        <div class="module" style="background-color: #32cb9f ;">
            <div class="info" style="width:440px;color:white;display: inline-block;float: left;position: relative;top: 105px;margin-left: 80px">
                <h3 style="margin-bottom: 20px;">法律保障</h3>
                <p>点融平台及业务受法律保护，透明合规，强大的法务团队为点融用户提供法律支持及保障。</p>
            </div>
            <div class="icon">
                <img style="position: relative;left: 200px;top:100px" src="../../../public/images/legal.png">
            </div>
        </div>
        <div class="module" style="background-color: white ;">
            <div class="icon">
                <img style="position: relative;left: 120px;top:100px" src="../../../public/images/privacy.png">
            </div>
            <div class="info" style="width:640px;color: black;display: inline-block;float: right;margin-right: 40px">
                <h3 style="margin-bottom: 20px">隐私保障</h3>
                <p>用户输入信息在应用层、网络层均进行加密，使用https进行加密传输，防止信息在传输过程中被窃听或泄露。</p>
            </div>
        </div>
        <div class="module" style="background-color: antiquewhite ;">
            <div class="info" style="width:440px;color: #696969;display: inline-block;float: left;position: relative;top: 105px;margin-left: 80px">
                <h3 style="margin-bottom: 20px;">资金存管</h3>
                <p>客户资金已完全在存管银行进行存管，目前存管银行是百信银行。</p>
            </div>
            <div class="icon">
                <img style="position: relative;left: 200px;top:100px" src="../../../public/images/money.png">
            </div>
        </div>

        </el-tab-pane>


        <el-tab-pane label="公司信息" name=company-information>
            <div class="main-about-us-right-part" style="background-color: white">
                <h5 style="height: 60px; line-height: 70px;padding-left: 10px" class="border-bottom">公司信息</h5>
                <div class="network-post">
                    VRB平台，是一个立志于做B组的实训A组。
                </div>
                <h5 style="height: 60px; line-height: 70px;padding-left: 10px" class="border-bottom">经营范围</h5>
                <div class="network-post">
                    金融信息服务、计算机网络专业领域内的技术开发、技术咨询、技术服务、技术转让，计算机系统集成、及软硬件开发、销售（除计算机信息系统安全专用产品），数据处理服务，电子商务（不得从事增值电信、金融业务），市场信息咨询与调查（不得从事社会调查、社会调研、民意调查、民意测验），会展服务，企业管理咨询，投资咨询（以上咨询除经纪），企业形象策划，广告的设计、制作，公关活动策划，营销策划。【依法须经批准的项目，经相关部门批准后方可开展经营活动】
                </div>
                <h5 style="height: 60px; line-height: 70px;padding-left: 10px" class="border-bottom">从业机构及其各分支机构经营场所</h5>
                <div class="network-post">
                    华南地区-广东 广州-SCUT C10 fishpond
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="联系我们" name="contact-us">
            <h5 style="height: 60px; line-height: 70px;padding-left: 10px" class="border-bottom">联系我们</h5>
            <div class="network-post">
                <p>tel: 100-34710110</p>
                <p>add: 华南地区-广东 广州-SCUT C10 fishpond</p>
            </div>
        </el-tab-pane>
        <el-tab-pane label="常见问题" name="common-problem">
            <h5 style="height: 60px; line-height: 70px;padding-left: 10px" class="border-bottom">联系我们</h5>
            <div class="network-post">
                <ul>
                    <li v-for="(item,index) in qaArray" v-bind:key="item.id">
                        <p clsaa="q">{{index+1}}. {{item.q}}</p>
                        <p class="a">{{item.a}}</p>
                    </li>
                </ul>
            </div>
        </el-tab-pane>


        <el-tab-pane label="法律法规" name=related-laws>
            <h5 style="height: 60px; line-height: 70px;padding-left: 10px" class="border-bottom">法律法规</h5>
            <div>
                <p>1. 中华人民共和国合同法</p>

                <p>2. 中华人民共和国电子签名法</p>

                <p>3. 中华人民共和国网络安全法</p>

                <p>4. 中华人民共和国反洗钱法</p>

                <p>5. 最高人民法院关于审理民间借贷案件适用法律若干问题的规定</p>

                <p>6. 网络借贷信息中介机构业务活动管理暂行办法</p>

                <p>7. 中国人民银行等十部委发布《关于促进互联网金融健康发展的指导意见》</p>

                <p>8.网络借贷信息中介机构备案登记管理指引</p>

                <p>9. 网络借贷资金存管业务指引</p>

                <p>10. 中国互联网金融协会《互联网金融 信息披露 个体网络借贷》</p>

                <p>11. 中国银行业监督管理委员会《网络借贷信息中介机构业务活动信息披露指引》</p>
            </div>
        </el-tab-pane>
        <el-tab-pane label="风控策略" name="risk-control-strategy">
            <h5 style="height: 60px; line-height: 70px;padding-left: 10px" class="border-bottom">风险管理架构</h5>
            <img style="width: 80%" src="../../../public/images/feng1.png">
            <h5 style="height: 60px; line-height: 70px;padding-left: 10px" class="border-bottom">风险评估流程</h5>
            <img style="width: 70%;margin-left: 60px" src="../../../public/images/feng2.png">
        </el-tab-pane>
          <el-tab-pane label="协议模板" name="contract">
              <h5 style="height: 60px; line-height: 70px;padding-left: 10px" class="border-bottom">协议模板</h5>
              <p style="position: relative;left:20px;top: 20px;" @click="$router.push('/contract')">点击查看个人贷款合同</p>
          </el-tab-pane>


      </el-tabs>
      </div>
      <div class="outline"></div>
    </div>
</template>

<script>
    export default {
        name: "Information",
        data() {
            return {
                tabPosition: 'left',
                qaArray: [
                    {
                        q: '我加入某项目并出借1万元，到期后我能赚到多少钱？',
                        a: '项目收益为投资金额乘以利率，最终收益以实际还款为准。'
                    },
                    {
                        q: '投资项目安全吗？',
                        a: '借款项目担保方式为保证金担保，连带责任担保保障。'
                    },
                    {
                        q: '何时开始计息？我什么时候会收到本金和利息？',
                        a: '出借提交成功后，待您拟出借的借款项目向借款人账户划付后开始计算收益。出借某个借款项目收到的利息将先扣除居间服务费后（具体费用请参考《点融平台出借人费用表》），按出借人向借款人的出借金额比例支付利息。 投资项目为到期一次性还本付息的借款项目，项目到期后，会一并结算到期本息，预计1-5个工作日返还至您账户的“可用余额”。由于第三方在处置逾期项目可能存在时间差异，实际到账时间可能会根据您持有的项目情况有所不同或延迟。'
                    },
                    {
                        q: '我的钱投给了谁？我怎么知道还款情况如何？',
                        a: 'VRB平台坚持向出借人披露每一笔资金的去向，和每一笔借款的还款情况。您可至“投资详情”查看详情。'
                    },
                    {
                        q: '我能否发起债权转让？',
                        a: '该项目不支持债权转让。到期后自动结算本息。'
                    }
                ]
            }
        }
    };
</script>

<style scoped>
    .h_title{
        margin-top: 5px;
        font-weight: 600;
        color:#696969;
    }
    .module{
        height: 300px;
    }
    .icon img{
        width: 100px;
    }
    .main-about-us {
        padding: 0;
        background: #fff;
        margin: 40px auto;
        margin-top: 0px;
        margin-bottom: 0px;
        border: 1px solid #e4e4e4;
        width: 1140px;
    }
    .main-about-us-right-part {
        width: 932px;
        min-height: 650px;
        float: left;
    }
    .outline{
        width: 100%;
        height: 60px;
    }

    .network-container h1{
        nt-family: 楷体;
        margin-top:30px;
        margin-left: 40px;
        width: 1200px;
        text-align: left;
    }

    .network-post {
        clear: both;
        margin: 0 60px;
        text-align: left;
    }
    .network-post .post-item {
        padding: 20px 40px;
    }
    .network-post .item {
        float: left;
        width: 55px;
        height: 70px;
    }
    .network-post .post-item p {
        margin-left: 0px;
        font-size: 18px;
        color: #666;
        margin-top: 25px;
    }


</style>
