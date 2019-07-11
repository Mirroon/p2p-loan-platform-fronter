<template>
        <div>
            <div class="invest-plan">
                <div class="invest-left-info " >
                    <div class="invest-info-num">
                        <table class="info">
                            <tbody>
                            <tr class="num">
                                <td class="orange border-right"><strong>{{request.interest_rate}}</strong>%</td>
                                <td class="amount border-right"><strong>{{request.amount}}</strong>元</td>
                                <td class="months"><strong>{{request.loan_month}}</strong>个月</td>
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
                        <span style="margin: 0px 15px">编号:<span>{{request.purchase_id}}</span></span>
                        <span style="margin: 0px 15px">购买时间:<span>{{request.create_time}}</span></span>
                        <!-- <span style="margin: 0px 15px">购买时间:<span>{{request.purchase_time}}</span></span> -->
                    </div>
                </div>
                <div class="invest-right-info">
                    <slot name="buttons"></slot>
                </div>
            </div>
            <div class="invest-details" style="margin-top: 15px">
                <slot name="details"></slot>
            </div>
        </div>
        <!-- 详情页1结束 -->
    </template>
    
    
    <script>
        export default{
            props:["request"],
            name: "InvestmentRecordsDetails",
            data(){
                return {
    
                }
            },
            computed: {
                
            },
            mounted() {
                
            },
            methods: {
                
            },
        }
    
    </script>
    
    
    <style scroped>
    
        /* 详情页css */
        
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
            /*padding-top: 40px;*/
            margin-top: 40px;
        }
    
    
        /*左侧-数据*/
        .invest-info-num{
            padding: 0 4px;
            width: 100%;
            margin-top: 40px;
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
    </style>