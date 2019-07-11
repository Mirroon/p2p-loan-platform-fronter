<template>
    <div class="container-fluid">
        <ul class="mt-5">
            <li v-for="(item,index) in investmentList" :key='index' class="list-unstyled mb-5">
                <el-card shadow="hover">
                  <Item :item="item"></Item>
                </el-card>
             </li>
        </ul>
        <div class="c">
            <br />
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="size"
                layout="total, prev, pager, next, jumper"
                :pager-count="11"
                :total="total">
        </el-pagination>
            <br /><br />
        </div>
    </div>
</template>

<script>
  import Item from '../../../components/Item/Item'
  import { mapState } from 'vuex'

  export default {
    name: "Investment",
    mounted() {
        if(!this.isLogin){
            this.$router.push('/')
        }
        this.$store.dispatch('InvestmentList/LoanApplicationList',1)
    },
    components: {
      Item,
    },
    data() {
      return {
        currentPage: 1,
      }
    },
    computed: {
      ...mapState({
          isLogin:state=>state.User.isLogin,
          investmentList:state=>state.InvestmentList.list,
          size:state=>state.InvestmentList.size,
          total:state=>state.InvestmentList.total,
      })
    },
    methods: {
      handleCurrentChange(val) {
        // 改变默认的页数
          this.currentPage = val
          this.$store.dispatch('InvestmentList/LoanApplicationList',val)
      },
    }
  }
</script>

<style scoped>
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .c {
    text-align: center;
  }
</style>
