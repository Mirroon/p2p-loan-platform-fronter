<template>
  <div class="container-fluid">
    <div class="row" @click="$router.push({name:'InvestmentDetails', params:{id:item.application_id}})">
      <div class="col-md-4" style="cursor: pointer">
          <div class="plan-name plan-line">
              <p class="prop-value">{{item.title}}</p>
          </div>
      </div>
      <div class="col-md-2" style="cursor: pointer">
          <div class="plan-rate plan-line">
              <p class="rate">{{(item.interest_rate*100).toFixed(2)}}<small>%</small></p>
              <p class="words">利率</p></div>
      </div>
      <div class="col-md-2" style="cursor: pointer">
          <div class="plan-name plan-line">
              <p class="prop-value">￥{{item.amount}}</p>
              <p class="words">出借金额</p></div>
          </div>
      <div class="col-md-2">
          <div class="plan-name plan-line">
              <p class="prop-value">{{item.loan_month}}个月</p>
              <p class="words">借款时长</p></div>
      </div>
      <div class="col-md-2" style="margin-top: 40px;">
          <button class="btn mt-1 button">
            产品投资
          </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Item',
    props: {
      item: Object,
      index: Number
    },

    mounted() {
    },
    data() {
      return {
      }
    },
    methods: {

    },
    computed: {
      ...mapState({
      })
    },

    watch: {
    }
  }
</script>

<style scoped>
  button{text-decoration-line: none}
  .imgbox {
    font-size: 0;
    width: 0px;
    height: 180px;
    text-align:left
  }

  .imgbox img {
    max-height: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  .name {
    font-family: 黑体;
    font-size: 24px;
  }

  .author {
    font-family: 仿宋;
    font-size: 15px;
  }
  .button{
      background: #00bc8d;
      border-radius: 30px;
      width: 130px;
      color: #fff;
      font-size: 15px;
      text-align: center;
      cursor: pointer;
  }

  .outline {
    font-family: 等线;
    font-size: 12px;
    opacity: 0.6;
  }

  .isbn {
    font-size: 10px;
    font-family: Arial;
  }

  .stock {
    font-size: 15px;
    font-family: 仿宋;
  }

  .price {
    font-size: 20px;
    font-family: 黑体;
  }

  .link:hover {
    color: steelblue;
  }
  .plan-name {
      width: 25%;
      padding-top: 40px;
   }
  .plan-line {
      display: table-cell;
      vertical-align: middle;
  }
  .prop-value {
      font-size: 24px;
      color: #333;
      line-height: 22px;
      margin: 6px 0 20px;
  }
  .plan-rate {
      width: 24%;
      padding-top: 40px;
  }
  .rate {
      font-size: 30px;
      color: #ff6c03;
      line-height: 33px;
      display: inline-block;
      margin-bottom: 5px;
  }
  .words {
      font-size: 16px;
      color: #999;
      line-height: 14px;
  }
</style>
