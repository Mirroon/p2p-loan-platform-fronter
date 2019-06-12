<template>
    <div>
        <div class="container">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="receiverName"
                    label="收货人姓名"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="receiverPhone"
                    label="收货人电话"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="receiverAddress"
                    label="收货人地址"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>
            <div style="margin-top: 20px">
                <el-button @click="toggleAdd()">新增</el-button>
                <el-button @click="toggleDelete()">删除</el-button>
                <el-button @click="toggleSelectAll()">全选</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
            </div>
        </div>
        <el-dialog title="新增收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="收货人姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收货人电话" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收货人地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm()">确 定</el-button>
            </div>
        </el-dialog>
        {{msg}}
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {reqShippingAdd,reqShippingDelete} from '../../api'

    export default {
        name: "Users",
        data () {
            return {
                multipleSelection: [],
                // dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    phone: '',
                    address: ''
                },
                formLabelWidth: '120px',
            }
        },
        computed: {
            ...mapState({
                tableData: state => state.Person.shippingList,
                isLogin: state=>state.Person.isLogin
            })
        },
        methods: {
            confirm()
            {
                this.addShipping([this.form.name,this.form.phone,this.form.address])
                this.form.name=''
                this.form.phone=''
                this.form.address=''
                this.dialogFormVisible = false
            },
            addShipping([name,phone,address])
            {
                reqShippingAdd({
                    receiverName:name.replace(/(^\s*)|(\s*$)/g, ""),
                    receiverPhone:phone,
                    receiverAddress:address.replace(/(^\s*)|(\s*$)/g, "")
                }).then((result)=>{
                    if(result.code===0)
                    {
                        this.$store.commit('Person/pushShippingList',result.data)
                        this.$message.success(result.msg)
                    }
                    else
                    {
                        this.$message.error(result.msg)
                    }
                })
            },
            deleteShipping(shippingIdArr)
            {
                shippingIdArr.forEach((item)=>
                {
                    reqShippingDelete({
                        shippingId:item
                    }).then((result)=>{
                        if(result.code===0)
                        {
                            this.$store.commit('Person/deleteShippingList',item)
                            this.$message.success(result.msg)
                        }
                        else {
                            this.$message.error(result.msg)
                        }
                    })
                })
            },
            toggleAdd(){
                this.dialogFormVisible = true
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            toggleDelete()
            {
                let shippingIdArr=[]
                for(let i=0;i<this.multipleSelection.length;i++)
                {
                    shippingIdArr.push(this.multipleSelection[i].id)
                }
                this.deleteShipping(shippingIdArr)
            },
            toggleSelectAll()
            {
                this.tableData.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        mounted() {
            if(!this.isLogin)
            {
                this.$router.push('/login')
                return
            }
            if(this.tableData.length==0)
            {
                this.$store.dispatch('Person/getShippingList')
            }
        }
    }
</script>

<style scoped>
    .user_state{
        height: 28px;
    }
</style>
