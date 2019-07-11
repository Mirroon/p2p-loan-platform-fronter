<template>
    <div>
        <div class="invest-plan border shadow" >
            <div class="invest-left-info " >
                <div class="invest-title ">
                    {{investTitle}}
                </div>
                <div class="invest-info-num">
                    <table class="info">
                        <tbody>
                        <tr class="num">
                            <td class="orange border-right"><strong>{{num.interest_rate}}</strong>%</td>
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
                <div class="invest-income" style="font-size: 30px">￥460</div>
                <div class="invest-button" style="padding: 0px;margin: auto;">
                    <button class="i-button">确认投资</button>
                </div>
            </div>
        </div>
        <!--详细辅助信息-->
        <div class="invest-details-info">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="投资周期" name="first" >
                    <img src="../../../../public/images/investPeriod.png"/>
                </el-tab-pane>
                <el-tab-pane label="投资详情" name="second">
                    <!--                    <ul>
                                            <li v-for="item in investArray" v-bind:key="item.id">
                                                <div class="item-title">{{item.itemTitle}}</div>
                                                <div class="item-content">{{item.itemContent}}</div>
                                            </li>
                                        </ul>-->
                    <div class="item">
                        <div class="item-title">如何获得收益</div>
                        <div class="item-content">
                            1开始计息：根据您所持有的借款项目放款时间，就出借的某一借款项目而言，待该等借款项目募集结束并完成向借款人账户划付后才会开始计算收益。 2获得收益：到期一次性还本付息。系统会根据您持有项目的实际还款情况，将收到的本息返还至您账户的可用余额。每次新增出借时，您所分配到的项目可能会有所不同，请以实际分配到项目的还款为准。 3本息再出借：本款产品不支持本息再出借，收到的项目回款会自动返还到您账户的可用余额。4提前还款：项目发生提前还款时，会提前归还您的出借本金及相应利息至“可用余额”。提前还款时，将根据实际借款期限，计算您应获得的利息收益。5逾期收益：逾期项目会由第三方负责处置全部逾期本息，逾期处置期间不会产生任何收益。视第三方处置速度，可能会存在几天的到账延迟。
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-title">退出手续费</div>
                        <div class="item-content">退出无手续费。</div>
                    </div>
                    <div class="item">
                        <div class="item-title">何时到期</div>
                        <div class="item-content">60天到期，在借款项目到期后的1-5个工作日内，将所获得的还款本息返还至您账户的可用余额。由于第三方处置逾期项目的速度快慢，可能导致逾期项目的实际还款时间存在延迟。</div>
                    </div>
                    <div class="item">
                        <div class="item-title">如何退出</div>
                        <div class="item-content">本产品不支持债权转让退出，您所持有项目全部到期或被第三方全部处置后退出。</div>
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


<style>
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
        margin-left: 120px;
        margin-right: 120px;
        margin-bottom: 50px;
        margin-top: 40px;
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

        box-shadow: #e4e4e4 0px 0px 8px;
    }
</style>