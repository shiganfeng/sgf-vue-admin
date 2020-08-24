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
                        :default-time="['12:00:00', '08:00:00']">
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
                <el-input v-model="searck_keyWork" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span='2'>
                <el-button type="danger">搜索</el-button>
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
            style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="title" label="标题" width="830"></el-table-column>
            <el-table-column prop="category" label="类别" width="130"></el-table-column>
            <el-table-column prop="date" label="日期" width="237"></el-table-column>
            <el-table-column prop="user" label="管理员" width="115"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="deleteItem">删除</el-button>
                    <el-button size="mini" type="success">编辑</el-button>
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
                :page-sizes="[10,20,50,100]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="1000">
                </el-pagination>
            </el-col>
        </el-row>
        <!--新增弹窗-->
        <DialogInfo :flag="dialog_value" @close="fatherClose" :category="options.category"/>
    </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import { GetCategory } from '../../api/news.js';
export default {
    name: 'InfoIndex',
    components: { DialogInfo },
    data(){
        return{
        date_value: '',
        searck_keyWork: '',
        dialog_value: false,
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
        tableData: [{
          title: '标题1',
          category: '国内信息',
          date: '2020-08-11 15:03:33',
          user: '管理员'
        },{
          title: '标题2',
          category: '国内信息',
          date: '2020-08-11 15:03:33',
          user: '李四'
        },{
          title: '标题3',
          category: '国内信息',
          date: '2020-08-11 15:03:33',
          user: '李四'
        },{
          title: '标题4',
          category: '国内信息',
          date: '2020-08-11 15:03:33',
          user: '李四'
        }],
        category_value: '',
        search_key: ''
        }
    },
    mounted(){
        this.getCategory()
    },
    methods: {
        //获取分类
        getCategory(){
            GetCategory({}).then(response => {
                console.log(response)
                let data = response.data.data.data
                console.log(data)
                this.options.category = data
            }).catch(error => {

            })
        },
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
        handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      fatherClose(){
          this.dialog_value = false
          console.log("fatherClose")
      },
      deleteItem(){
          this.myConfirm({
              content: '是否删除当前项',
              fn: this.confirmDelete,
              id: '111'
          })
      },
      deleteAll(){
          this.myConfirm({
              content: '是否全部删除'
          })
      },
      confirmDelete(value){
          console.log(value)
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