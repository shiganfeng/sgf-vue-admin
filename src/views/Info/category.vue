<template>
    <div id="category">
        <el-button type="danger" @click="addFirst({type: 'category_first_add'})">添加一级分类</el-button>
        <el-row style="margin-top: 21px;margin-bottom: 21px;">
            <el-divider></el-divider>
        </el-row>
        <div>
            <el-row :gutter="30">
                <el-col :span="8">
                    <div class="category-wrap">
                        <div class="category" v-for="firstItem in category" :key="firstItem.id">
                            <!--一级菜单-->
                            <h4>
                                <svg-icon icon-class="add"></svg-icon>
                                {{firstItem.category_name}}
                                <div class="button-group">
                                    <el-button type="danger" round size="mini" @click="editCategory({data: firstItem, type: 'category_first_edit'})">编辑</el-button>
                                    <el-button type="success" round size="mini">添加子级</el-button>
                                    <el-button round size="mini" @click="deleteCategory(firstItem.id)">删除</el-button>
                                </div>
                            </h4>
                            <!--二级菜单-->
                            <ul v-if="firstItem.children">
                                <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">{{childrenItem.category_name}}
                                    <div class="button-group">
                                        <el-button type="danger" round size="mini">编辑</el-button>
                                        <el-button round size="mini">删除</el-button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <h4 class="menu-title">一级分类编辑</h4>
                    <el-form :model="form" label-width="142px" class="form-wrap" ref="categoryForm">
                        <el-form-item label="一级分类名称" prop="categoryName" v-if="category_first_input">
                            <el-input v-model="form.categoryName" :disabled="category_first_disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称" prop="secCategoryName" v-if="category_children_input">
                            <el-input v-model="form.secCategoryName" :disabled="category_children_disabled"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="submit" :loading="submit_btn_loading" :disabled="submit_btn_disabled">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import { AddFirstCategory, GetCategory, DeleteCategory, EditCategory } from '../../api/news.js';

export default {
    name: 'category',
    data(){
        return{
        form: {
          categoryName: '',
          secCategoryName: ''
        },
        submit_button_type: '',
        category_first_input: true,
        category_children_input: true,
        submit_btn_loading: false,
        category_first_disabled: true,
        category_children_disabled: true,
        submit_btn_disabled: true,
        category: [],
        current: {}
        }
    },
    mounted(){
        this.getCategory()
    },
    methods: {
        submit(){
            if(this.submit_button_type == 'category_first_add'){
                this.addFirstCategory()
            }else if(this.submit_button_type == 'category_first_edit'){
                this.editFirstCategory()
            }
        },
        addFirstCategory(){
            if(!this.form.categoryName){
                this.$message({
                    message: '分类名称不能为空',
                    type: 'error',
                    duration: 3000
                })
                return false;
            }
            this.submit_btn_loading = true
            AddFirstCategory({categoryName: this.form.categoryName}).then(response => {
                console.log(response.data.data)
                if(response.data.resCode === 0){
                    this.$message({
                    message: response.data.message,
                    type: 'success',
                    duration: 3000
                })
                }
                this.category.push(response.data.data)
                this.submit_btn_loading = false
                this.$refs.categoryForm.resetFields()
            }).catch(error => {
                this.submit_btn_loading = false
                this.$refs.categoryForm.resetFields()
            })
        },
        editFirstCategory(){
            console.log(this.current)
            let arr = Object.keys(this.current)
            console.log(arr.length)
            if(arr.length == 0){
                this.$message({
                    message: '未选择分类',
                    type: 'error',
                    duration: 2000
                })
                return false
            }
            let requestData = {
                id: this.current.id,
                categoryName: this.form.categoryName
            }
            EditCategory(requestData).then(response => {
                console.log(response)
                this.$message({
                    message: response.data.message,
                    type: 'success',
                    duration: 2000
                })
                let index = this.category.findIndex( item => item.id == this.current.id)
                this.category[index].category_name = response.data.data.data.categoryName
                this.form.categoryName = ''
                this.current = {}
            }).catch(error => {

            })
        },
        addFirst(params){
            this.category_first_input = true
            this.category_children_input = false
            this.category_first_disabled = false
            this.submit_btn_disabled = false
            this.submit_button_type = params.type
            console.log(this.submit_button_type)
        },
        getCategory(){
            GetCategory({}).then(response => {
                console.log(response)
                this.category = response.data.data.data
            }).catch(error => {

            })
        },
        async deleteCategory(categoryId){
            const confirm  = await this.$confirm('是否确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(() => {

            })
            if(confirm){
                DeleteCategory({categoryId: categoryId}).then(response => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        duration: 2000
                    })
                let index = this.category.findIndex( item => item.id == categoryId)
                console.log(index)
                console.log(response)
                this.category.splice(index,1)
            }).catch(error => {
                console.log('error')
            })
            }else{
                console.log('取消')
            }
        },
        editCategory(params){
            console.log(params)
            this.category_first_disabled = false
            this.category_children_input = false
            this.submit_btn_disabled = false
            this.form.categoryName = params.data.category_name
            this.submit_button_type = params.type
            console.log(this.submit_button_type)
            this.current = params.data
            console.log(this.current)
        }
    }
}
</script>
<style lang="scss" scoped>
.category-wrap{
    div:first-child{
        &:before{
            top: 20px;
        }
    }
    div:last-child{
        &:before{
            bottom: 21px;
        }
    }
}
.menu-title{
    line-height: 44px;
    padding-left: 22px;
    background-color: #f3f3f3;
}
.category{
    position: relative;
    line-height: 44px;
    cursor: pointer;
    &::before{
            content: '';
            position: absolute;
            left: 22px;
            top: 0;
            bottom: 0;
            border-left: 1px dotted #000;
        }
    h4{
        position: relative;
        padding-left: 40px;
        svg{
            position: absolute;
            left: 14px;
            top: 15px;
            color: black;
            background-color: #fff;
            font-size: 17px;
        }
    }
    li{
        position: relative;
        padding-left: 36px;
        margin-left: 24px;
        &::before{
            content: '';
            position: absolute;
            left: 0;
            top: 22px;
            width: 32px;
            border-bottom: 1px dotted #000;
        }
    }
    li, h4{
        &:hover{
            background-color: #f3f3f3;
            .button-group{
                display: block;
            }
        }
    }
}
.button-group{
    position: absolute;
    display: none;
    right: 11px;
    top: -1px;
    button{
        font-size: 12px;
    }
}
.form-wrap{
    width: 410px;
    padding-top: 26px;
}
</style>