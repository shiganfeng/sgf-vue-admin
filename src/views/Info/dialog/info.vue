<template>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="childrenClose" width="580px" @opened="openDialog">
        <el-form :model="form" ref="categoryForm" :rules="rules">
            <el-form-item label="类别：" :label-width="formLabelWidth" prop="category">
                <el-select v-model="form.category" placeholder="请选择活动区域">
                    <el-option v-for="item in categoryOptions" :label="item.category_name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题：" :label-width="formLabelWidth" prop="title">
                <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="概况：" :label-width="formLabelWidth" prop="content">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="childrenClose">取 消</el-button>
            <el-button type="danger" @click="submit" :loading="submitLoading">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { AddInfo } from '../../../api/news.js'
export default {
    name: 'dialogInfo',
    data(){
        return{
            dialog_info_flag: false,
            submitLoading: false,
            form: {
                category: '',
                title: '',
                content: ''
                },
            categoryOptions: [],
            formLabelWidth: '70px',
            rules: {
                category: {
                    required: true,
                    message: '请选择类别',
                    trigger: 'blur'
                }
            }
        }
    },
    methods: {
        childrenClose(){
            console.log("childrenClose")
            this.dialog_info_flag = false
            this.$emit('close', false)
        },
        openDialog(){
            console.log(this.$props.category)
            this.categoryOptions = this.$props.category
        },
        submit(){
            this.submitLoading = true
            let requestData = {      	
                categoryId: this.form.category,
                title: this.form.title,
                imgUrl: "http://********",
                createDate: "2020-02-02 12:00:00",
                content: this.form.content
            }
            AddInfo(requestData).then( response => {
                console.log(response.data)
                this.$message({
                    message: response.data.message,
                    type: 'success',
                    duration: 2000
                })
                this.submitLoading = false
                this.$refs.categoryForm.resetFields()
            }).catch( error => {
                this.submitLoading = false
                this.$refs.categoryForm.resetFields()
            })
        }
    },
    //单向数据流，父级->子级
    props:{
        flag: {
            type: Boolean,
            default: false
        },
        category: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        flag: {
            handler(newValue, oldValue){
                this.dialog_info_flag = newValue
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>