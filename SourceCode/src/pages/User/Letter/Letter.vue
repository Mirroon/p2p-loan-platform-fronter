<template>
        <el-container>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleTabsClick">
                    <el-tab-pane label="全部邮件" name="totalLetter"></el-tab-pane>
                    <el-tab-pane label="未读邮件" name="neverReadLetter" ></el-tab-pane>
                    <el-tab-pane label="已读邮件" name="beenReadLetter"></el-tab-pane>
                </el-tabs>
                <div class="block">
                    <el-table
                            v-bind:data="letterCache"
                            style="width: 100%"
                            :row-class-name="letterRowClassName">
                        <el-table-column
                                prop="notice_id"
                                label="信件编号"
                                ></el-table-column>
                        <el-table-column
                                prop="user_id"
                                label="收件人(工号)"
                                ></el-table-column>
                        <el-table-column
                                prop="time"
                                label="发送时间"
                                ></el-table-column>
                        <el-table-column
                                prop="title"
                                label="信件标题"
                                ></el-table-column>
                        <el-table-column
                                prop="status"
                                label="状态"
                                ></el-table-column>

                        <el-table-column>
                            <template slot-scope="scope">
                                <el-button type="primary" class="greenbutton" @click="handleDialogOpen(scope.$index, scope.row)">详细信息</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-dialog
                            :title="letter.title"
                            :visible.sync="dialogVisible"
                            width="940px"
                            :before-close="handleDialogClose">

                        <div class="letterDetails">

                            <div>
                                <div class="div-letter-details-inline">
                                    <h1>信件编号：</h1>
                                </div>
                                <div class="div-letter-details-inline">
                                    <span>{{letter.notice_id}}</span>
                                </div>
                            </div>

                            <div>
                                <div class="div-letter-details-inline">
                                    <h1>发件人：</h1>
                                </div>
                                <div class="div-letter-details-inline">
                                    <span>系统管理员</span>
                                </div>
                            </div>

                            <div>
                                <div class="div-letter-details-inline">
                                    <h1>收件人：</h1>
                                </div>
                                <div class="div-letter-details-inline">
                                    <span>{{letter.user_id}}</span>
                                </div>
                            </div>

                            <div>
                                <div class="div-letter-details-inline">
                                    <h1>发送日期：</h1>
                                </div>
                                <div class="div-letter-details-inline">
                                    <span>{{letter.time}}</span>
                                </div>
                            </div>

                            <div>
                                <div class="div-letter-details-inline">
                                    <h1>信件标题：</h1>
                                </div>
                                <div class="div-letter-details-inline">
                                    <span>{{letter.title}}</span>
                                </div>
                            </div>

                            <div>
                                <div class="div-letter-details-inline">
                                    <h1>内容：</h1>
                                </div>
                            </div>

                            <div class="div-letter-details-inline">
                                <textarea v-model="letter.content" readonly></textarea>
                            </div>


                        </div>

                        <span slot="footer" class="dialog-footer">
                                    <el-button @click="handleDialogDeleteButton">删 除</el-button>
                                    <el-button type="primary" class="greenbutton" @click="handleDialogCloseButton">关 闭</el-button>
                                </span>

                    </el-dialog>

                    <div class="right">
                        <el-pagination
                                @current-change="handleCurrentChange"
                                layout="total, prev, pager, next, jumper"
                                :current-page="current_page"
                                :page-size="page_size"
                                :total="letterCacheNum">
                        </el-pagination>
                    </div>

                </div>
            </el-main>
        </el-container>

</template>

<script>
    import {mapState} from 'vuex'
    import {reqDeleteLetters} from '../../../api/index.js'
    export default {
        name: "Letter",
        data () {
            return {
                activeName:'totalLetter',
                searchBar: '',
                letter:{},
                dialogVisible: false,
            }
        },
        computed:{
            ...mapState({
                isLogin:state => state.User.isLogin,
                letterCache:state=>state.Letters.letterCache,
                letterCacheNum: state => state.Letters.letterCacheNum,
                current_page: state=>state.Letters.current_page,
                page_size: state=> state.Letters.page_size,
            })
        },
        mounted(){
            if(!this.isLogin){
                this.$router.push('/')
                return
            }
            var totalLetter = {
                page_num:this.$store.state.Letters.current_page,
                page_size: this.$store.state.Letters.page_size,
            }
            this.$store.dispatch('Letters/getTotalLetters', totalLetter)
        },
        methods:{
            //table相关函数
            letterRowClassName(){},

            //dialog相关函数
            handleDialogOpen(index, row){
                this.letter = row;
                this.$store.dispatch('Letters/updateLetters', this.letter.notice_id)
                this.dialogVisible = true;
            },
            handleDialogClose(done){
                this.dialogVisible = false
                this.getContent()
            },
            handleDialogDeleteButton (){
                reqDeleteLetters(this.letter.notice_id).then((respond) =>{
                    if(respond.code == 0){
                        this.dialogVisible = false;
                        this.letter = {};
                        this.$message.success("删除成功。")
                        this.getContent()
                    }else {
                        this.$message.error(respond.msg)
                    }
                }).catch(()=>{
                    this.$message.error("登录失败，请检查网络连接")
                })
            },

            handleDialogCloseButton(){
                this.dialogVisible = false;
                this.getContent()
            },

            handleCurrentChange(val){
                this.$store.commit('Letters/updateCurrentPage', val)
                this.getContent()
            },


            //选项卡
            handleTabsClick(){
                this.$store.commit('Letters/init')
                this.getContent()
            },


            //获取页面内容
            getContent(){
                if (this.activeName == 'totalLetter'){
                    var totalData = {
                        page_num: this.current_page,
                        page_size:this.page_size
                    }
                    this.$store.dispatch('Letters/getTotalLetters', totalData)
                }
                if (this.activeName == 'neverReadLetter'){
                    var neverReadData = {
                        page_num: this.current_page,
                        page_size:this.page_size,
                        status: "0"
                    }
                    this.$store.dispatch('Letters/getNeverReadLetters', neverReadData)
                }
                if (this.activeName == 'beenReadLetter'){
                    var bennReadData = {
                        page_num: this.current_page,
                        page_size: this.page_size,
                        status: "1"
                    }
                    this.$store.dispatch('Letters/getBeenReadLetters', bennReadData)
                }
            }

        }
    }


</script>

<style scoped>

    .title{

    }
    .title h1{
        text-align: center;
        font-size: 48px;
    }

    .el-table .warning-row{
        blackground:oldlace;
    }

    .el-table .success-row{
        background:#f0f9eb;
    }

    .right{
        float:right;
    }
    .div-search-inline{
        float: right;
    }
    .letterDetails{
        font-size: 18px;
    }

    .div-letter-details-inline{
        display: inline-block;
        font-size: 18px;
    }

    .div-letter-details-inline h1{
        font-size: 18px;
        font-weight: bold;
    }

    .div-letter-details-inline span{
        text-decoration: underline;
    }

    .div-letter-details-inline textarea{
        display: block;
        font-size: 18px;
        font-weight: normal;
        width: 900px;
        min-height: 300px;
    }

    .greenbutton{
        background-color: #1C745A !important;
    }


</style>
