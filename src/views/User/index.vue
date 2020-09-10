<template>
    <div>
        <el-row :gutter="16">
            <el-col :span="20">
                <div class="label-wrap category">
                    <label>关键字:</label>
                    <div class="wrap-content">
                        <el-row :gutter="16">
                            <el-col :span="3">
                                <el-select v-model="selectValue" @change="selectData">
                                    <el-option
                                    v-for="item in data.option"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="search_key" placeholder="请输入关键字"></el-input>
                            </el-col>
                            <el-col :span="16">
                                <el-button type="danger" @click="search">搜索</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <el-button type="danger" class="pull-right" @click="addUser">添加用户</el-button>
            </el-col>
        </el-row>
        <div class="black-space-30"></div>
        <!--表格数据-->
        <el-table
            :data="tableData"
            border
            v-loading="loadingData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="username" label="邮箱/用户名" width="200"></el-table-column>
            <el-table-column prop="truename" label="真实姓名" width="130" ></el-table-column>
            <el-table-column prop="phone" label="手机号" width="237"></el-table-column>
            <el-table-column prop="region" label="地区" width="360"></el-table-column>
            <el-table-column prop="role" label="角色" width="115"></el-table-column>
            <el-table-column prop="status" label="禁启用状态" width="115">
                <template slot-scope="scope">
                    <el-switch @change="handlerSwitch(scope.row)" v-model="scope.row.status" active-value="2" inactive-value="1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>          
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
                    <el-button size="mini" type="success" @click="editInfo(scope.row)">编辑</el-button>            
                </template>
            </el-table-column>
        </el-table>
        <div class="black-space-30"></div>
        <!--底部分页-->
        <el-row>
            <el-col :span="12">
                <el-button size="medium" @click="deleteAll">批量删除</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination
                background
                class="pull-right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5,10,15,20]"
                layout="total,sizes, prev, pager, next, jumper"
                :page-size="page.pageSize"
                :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <!--新增弹窗-->
        <DialogAdd :flag="dialog_value" @close="fatherClose" :editData="editData"/>
    </div>
</template>
<script>
import moment from 'moment'
import DialogAdd from './dialog/add'
import { GetCategory, GetList, DeleteInfo } from '../../api/news.js';
import { GetUserList, UserDelete, UserActive, GetSystem} from '../../api/user.js';
export default {
    name: 'UserIndex',
    components: { DialogAdd },
    data(){
        return{
            userStatusFlag: false,
            editData: {},
            selectValue: '',
            searchKey: '',
            selectObj: {},
            data: {
                option: [
                    {value: 'name', label: '姓名'},
                    {value: 'phone', label: '手机号'},
                    {value: 'email', label: '邮箱'}
                    ]
            },
            total: 0,
            date_value: '',
            search_keyWork: '',
            dialog_value: false,
            loadingData: false,
            deleteInfoId: [],
            page: {
                pageNumber: 1,
                pageSize: 5,
            },
            searchOption: [{
                value: 'id',
                label: 'Id'
            },{
                value: 'title',
                label: '标题'
            }],
            tableData: [],
            category_value: '',
            search_key: ''
        }
    },
    mounted(){
        this.getCategory()
        this.getUserList()
    },
    methods: {
        selectData(val){
            this.selectObj= this.data.option.filter( item => item.value == val)[0]
        },
        handlerSwitch(row){
            if(this.userStatusFlag){return false}
            this.userStatusFlag = true
            let requestData = {
                id: row.id,
                status: row.status
            }
            UserActive(requestData).then( response => {
                console.log(response.data.message)
                this.userStatusFlag = false
            }).catch( error => {
                this.userStatusFlag = false
            })
        },
        addUser(){
            this.dialog_value = true
            this.editData = {
                username: '',
                truename: '',
                password: '',
                phone: '',
                region: '',
                status: '1',
                role: []
            }
        },
        editInfo(row){
            console.log(row)
            this.dialog_value = true
            this.editData = row
        },
        //处理数据
        formatData(){
            let requestData = {
                pageNumber: this.page.pageNumber,
                pageSize: this.page.pageSize
            }
            //username
            // if(this.username){ requestData.username = this.username}
            //truename
            // if(this.truename){ requestData.truename = this.truename}
            //phone
            // if(this.phone){ requestData.truename = this.truename}

            return requestData
        },
        //搜索
        search(){
                let selValue = {
                    [this.selectObj.value] : this.search_key
                }
                console.log(selValue)
                let requestData = 	{
                username: selValue.name,
                truename: '',
                phone: selValue.phone,
                pageNumber: 1,
                pageSize: 10
            }
            // console.log(requestData)
            this.loadingData = true
            GetUserList(requestData).then( response => {
                console.log(response.data)
                let data = response.data.data.data
                this.tableData = data
                this.total = response.data.data.total
                this.loadingData = false
            }).catch( error => {
                this.loadingData = false
            })

        },
        //根据id匹配类别
        toCategoryId(row){
            let categoryId = row.categoryId
            let categoryData = this.options.category.filter( item => item.id == categoryId)[0]
            return categoryData.category_name
        },
        //获取用户信息列表
        getUserList(){
            let requestData = 	{
                username: '',
                truename: '',
                phone: '',
                pageNumber: this.page.pageNumber,
                pageSize: this.page.pageSize
            }
            // console.log(requestData)
            this.loadingData = true
            GetUserList(requestData).then( response => {
                console.log(response.data)
                let data = response.data.data.data
                this.tableData = data
                this.total = response.data.data.total
                this.loadingData = false
            }).catch( error => {
                this.loadingData = false
            })
        },
        //获取分类
        getCategory(){
            GetCategory({}).then(response => {
                let data = response.data.data.data
                this.options.category = data
            }).catch(error => {

            })
        },
        //每页多少条
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.page.pageSize = val
        this.getUserList()
      },
      //第几页
        handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page.pageNumber = val
        this.getUserList()
      },
      handleSelectionChange(val){
          let id = val.map( item => item.id)
          this.deleteInfoId = id
      },
      fatherClose(){
          this.dialog_value = false
          this.dialog_value_edit = false
          this.getUserList()
      },
      deleteItem(id){
          this.deleteInfoId = [id]
          this.myConfirm({
              content: '是否删除当前项',
              fn: this.confirmDelete,
          })
      },
      deleteAll(){
          if(!this.deleteInfoId || this.deleteInfoId.length == 0){
              this.$message({
                  message: '请选择要删除得数据！！',
                  type: 'error',
                  duration: 2000
              })
              return false
          }
          this.myConfirm({
              content: '是否删除所选项',
              fn: this.confirmDelete,
          })
      },
      confirmDelete(value){
          let requestData = {
              id: this.deleteInfoId
          }
          UserDelete(requestData).then( response => {
              console.log(response)
              this.$message({
                  message: response.data.message,
                  type: 'success',
                  duration: 2000
              })
              console.log(response)
              this.deleteInfoId = []
              this.getUserList()
          }).catch( error => {

          })
      }
    }
}
</script>
<style lang="scss" scoped>
.label-wrap{
    label{
        float: left;
        line-height: 40px;
        width: 60px;
    }
    .wrap-content{
        margin-left: 60px;
    }
}
</style>