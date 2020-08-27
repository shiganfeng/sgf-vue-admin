<template>
    <el-dialog title="编辑" :visible.sync="dialog_info_flag" @close="childrenClose" width="580px" @opened="openDialog">
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
import { AddInfo, GetList, EditInfo } from '../../../api/news.js'
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
        getInfo(){
            let requestData = {
                pageNumber: 1,
                pageSize: 1,
                id: this.$props.id
            }
            GetList(requestData).then( response => {
                let data = response.data.data.data[0]
                console.log(data)
                this.form = {
                category: data.categoryId,
                title: data.title,
                content: data.content
                }
            }).catch( error => {

            })
        },
        childrenClose(){
            console.log("childrenClose")
            this.dialog_info_flag = false
            this.$emit('close', false)
            this.$refs.categoryForm.resetFields()
        },
        openDialog(){
            console.log(this.$props.category)
            this.categoryOptions = this.$props.category
            this.getInfo()
        },
        submit(){
            this.submitLoading = true
            let requestData = {
                id: this.$props.id,      	
                categoryId: this.form.category,
                title: this.form.title,
                content: this.form.content
            }
            console.log(requestData)
            EditInfo(requestData).then( response => {
                console.log(response.data)
                this.$message({
                    message: response.data.message,
                    type: 'success',
                    duration: 2000
                })
                this.submitLoading = false
                // this.$refs.categoryForm.resetFields()
            }).catch( error => {
                this.submitLoading = false
                // this.$refs.categoryForm.resetFields()
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
        },
        id: {
            type: String,
            default: ''
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