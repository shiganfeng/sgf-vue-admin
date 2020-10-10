<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="信息分类:">
            <el-select v-model="form.categoryId" style="width:120px;"> 
                <el-option 
                v-for="item in form.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="新闻标题:">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="缩略图:">
            缩略图
        </el-form-item>
        <el-form-item label="发布日期:">
            <el-date-picker
            v-model="form.createDate"
            type="date"
            placeholder="发布日期"
            disabled>
            </el-date-picker>
        </el-form-item>
        <el-form-item label="详细内容:">
            <template>
                <quillEditor v-model="form.content" ref="myQuillEditor" :options="form.editorOption"/>
            </template>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import moment from 'moment'
import { GetCategory, GetList, EditInfo } from "../../api/news.js"
//富文本编辑器
import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
  
export default {
    name: 'infoDetailder',
    components: { quillEditor },
    data(){
        return{
            form: {
                categoryId: '',
                category: [],
                title: '',
                createDate: '',
                content: '',
                editorOption: {}
            },
            submitLoading: false
        }
    },
    created(){
        console.log('creted')
        let id = this.$route.params.id
        console.log(id)
        this.$store.commit('infoDetailed/SET_ID', id)
        this.getCategory()
        this.getInfo()
    },
    activated(){
        console.log('activated')
        let id = this.$route.params.id
        this.$store.commit('infoDetailed/SET_ID', id)
        this.getCategory()
        this.getInfo()
    },
    methods: {
        //获取分类
        getCategory(){
            GetCategory({}).then(response => {
                let data = response.data.data.data
                this.form.category = data
            }).catch(error => {

            })
        },
        //获取id对应内容
        getInfo(){
            let requestData = {
                pageNumber: 1,
                pageSize: 1,
                id: this.$route.params.id || this.$store.getters['infoDetailed/id']
            }
            console.log(requestData.id)
            GetList(requestData).then( response => {
                let data = response.data.data.data[0]
                console.log(data)
                this.form.categoryId = data.categoryId
                this.form.title = data.title
                this.form.createDate = moment.unix(parseInt(data.createDate)).format('YYYY-MM-DD')
                this.form.content = data.content
            }).catch( error => {

            })
        },
        //保存
        submit(){
            this.submitLoading = true
            let requestData = {
                id: this.$route.params.id,      	
                categoryId: this.form.categoryId,
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
    }
}
</script>
<style lang="scss" scoped>

</style>