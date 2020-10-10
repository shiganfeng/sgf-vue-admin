<template>
    <div>
        <el-row :gutter='20'>
            <el-col :span='4'>
                <div class="label-wrap category">
                    <label>分类：</label>
                    <div class="wrap-content">
                        <el-select v-model="category_value" style="width:120px;"> 
                            <el-option 
                            v-for="item in options.category"
                            :key="item.id"
                            :label="item.category_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span='8'>
                <div class="label-wrap category">
                    <label>日期：</label>
                    <div class="wrap-content">
                        <el-date-picker
                        v-model="date_value"
                        type="datetimerange"
                        align="right"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00', '08:00:00']"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>
            <el-col :span='3'>
                <div class="label-wrap category">
                    <label>关键字：</label>
                    <div class="wrap-content">
                        <el-select v-model="search_key" style="width:100px;"> 
                            <el-option
                            v-for="item in searchOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span='4'>
                <el-input v-model="search_keyWork" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span='2'>
                <el-button type="danger" @click="search">搜索</el-button>
            </el-col>
            <el-col :span='2'>
                <el-button type="danger" class="pull-right" @click="dialog_value = true">新增</el-button>
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
            <el-table-column prop="title" label="标题" width="750"></el-table-column>
            <el-table-column prop="categoryId" label="类别" width="130" ></el-table-column>
            <el-table-column prop="createDate" label="日期" width="237" :formatter="toData"></el-table-column>
            <el-table-column prop="user" label="管理员" width="115"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
                    <el-button size="mini" type="success" @click="editInfo(scope.row.id)">编辑</el-button>
                    <!-- <router-link :to="`/infoDetailed/:id=${scope.row.id}`">
                        <el-button size="mini" type="success">编辑详情</el-button>
                    </router-link>               -->
                    <el-button size="mini" type="success" @click="xiangqing(scope.row.id)">编辑详情</el-button>
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
        <DialogInfo :flag="dialog_value" @close="fatherClose" :category="options.category"/>
        <!--编辑弹窗-->
        <DialogEditInfo :flag="dialog_value_edit" :id="infoId" @close="fatherClose" :category="options.category"/>
    </div>
</template>
<script>
import moment from 'moment'
import DialogInfo from "./dialog/info";
import DialogEditInfo from "./dialog/edit";
import { GetCategory, GetList, DeleteInfo } from '../../api/news.js';
export default {
    name: 'InfoIndex',
    components: { DialogInfo, DialogEditInfo },
    data(){
        return{
        total: 0,
        date_value: '',
        search_keyWork: '',
        dialog_value: false,
        dialog_value_edit : false,
        loadingData: false,
        infoId: '',
        deleteInfoId: [],
        page: {
            pageNumber: 1,
            pageSize: 5,
        },
        options: {
            category: []
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
        this.getList()
    },
    methods: {
        //编辑
        xiangqing(rowid){
            this.$router.push({
                name: '信息详情',
                params: {id : rowid}
            })
        },
        editInfo(id){
            this.dialog_value_edit = true
            this.infoId = id
        },
        //处理数据
        formatData(){
            let requestData = {
                pageNumber: this.page.pageNumber,
                pageSize: this.page.pageSize
            }
            //分类id
            if(this.category_value){ requestData.categoryId = this.category_value}
            //日期
            if(this.date_value.length > 0){
                requestData.startTiem = this.date_value[0]
                requestData.endTime = this.date_value[1]
            }
            //关键字
            if(this.search_key){
                requestData[this.search_key] = this.search_keyWork
            }

            return requestData
        },
        //搜索
        search(){
            console.log(this.tableData)
            let requestData = this.formatData()
            console.log(requestData)
            this.getList()
        },
        //时间戳转换为年月日
        toData(row){
            return moment.unix(parseInt(row.createDate)).format('YYYY-MM-DD HH:mm:ss')
        },
        //根据id匹配类别
        toCategoryId(row){
            let categoryId = row.categoryId
            let categoryData = this.options.category.filter( item => item.id == categoryId)[0]
            return categoryData.category_name
        },
        //获取信息列表
        getList(){
            let requestData = this.formatData()
            // console.log(requestData)
            this.loadingData = true
            GetList(requestData).then( response => {
                let data = response.data.data.data
                console.log(data)
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
        this.getList()
      },
      //第几页
        handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page.pageNumber = val
        this.getList()
      },
      handleSelectionChange(val){
          let id = val.map( item => item.id)
          this.deleteInfoId = id
      },
      fatherClose(){
          this.dialog_value = false
          this.dialog_value_edit = false
          console.log("fatherClose")
          this.getList()
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
          DeleteInfo(requestData).then( response => {
              console.log(response)
              this.deleteInfoId = []
              this.getList()
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