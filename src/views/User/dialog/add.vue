<template>
    <el-dialog :title="title" :visible.sync="dialog_info_flag" @close="childrenClose" width="700px" @opened="openDialog" @open="switchTitle">
        <el-form :model="form" ref="userForm" :rules="rules">
            <el-form-item label="用户名：" :label-width="formLabelWidth" prop="username">
                <el-input v-model="form.username" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" :label-width="formLabelWidth" prop="truename">
                <el-input v-model="form.truename" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="地区：" :label-width="formLabelWidth" prop="region">
                <CityPicker :cityPickerData.sync="cityPickerData" @cityChanged="cityChanged"/>
                {{cityPickerData}}
            </el-form-item>
            <el-form-item label="是否启用：" :label-width="formLabelWidth" prop="status">
                <el-radio v-model="form.status" label="1">禁用</el-radio>
                <el-radio v-model="form.status" label="2">启用</el-radio>
            </el-form-item>
            <el-form-item label="角色：" :label-width="formLabelWidth" prop="role">
                <el-checkbox-group v-model="form.role">
                    <el-checkbox v-for="item in roleItem" :key="item.role" :label="item.name"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="按钮权限：" :label-width="formLabelWidth" prop="role">
                <el-checkbox-group v-model="form.btnPerm">
                    <el-checkbox v-for="item in btnPerm" :key="item.name" :label="item.name"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="childrenClose">取 消</el-button>
            <el-button type="danger" @click="submit('userForm')" :loading="submitLoading">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { AddInfo } from '../../../api/news.js'
import { GetRole, UserAdd, UserEdit, GetSystem, GetPermButton } from '../../../api/user.js'
import  CityPicker  from '../../Console/Components/CityPicker/city.vue'
import { provide } from '@vue/composition-api'
import {stripscript,validateEmail,validateMyPassword,validateMyCode} from '../../../utils/validate.js'
export default {
    name: 'dialogInfo',
    components: { CityPicker },
    data(){
        //验证用户名为邮箱
      var validateUsername = (rule, value, callback) => {
        // let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (value === '') {
            callback(new Error('请输入用户名'));
        }else if(validateEmail(value)){
            callback(new Error('用户名格式有误'));
        } else {
        //   if (this.ruleForm.username !== '') {
        //     this.$refs.ruleForm.validateField('username');
        //   }
          callback();//返回true
          
        }
      };
      //验证密码字母+数字6-20位
      var validatePassword = (rule, value, callback) => {
          if(this.form.id && !value){
              callback()
          }

          if((this.form.id && value) || !this.form.id){
            if(value){
                //过滤后得数据
            this.form.password = stripscript(value)
            value = this.form.password
          }
        // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (validateMyPassword(value)) {
          callback(new Error('密码格式不正确（字母+数字6-20位）'));
        } else {
          callback();
        }
        }
      };
        //角色
      var validateRole = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择角色'));
        } else {
          callback();
        }
      };
        return{
            title: '新增',
            cityPickerData: {},
            roleStatus: '1',
            roleCode: [],
            roleItem: [],
            btnPerm: [],
            dialog_info_flag: false,
            submitLoading: false,
            form: {
                username: '',
                truename: '',
                password: '',
                phone: '',
                region: '',
                status: '1',
                role: [],
                btnPerm: []
                },
            formLabelWidth: '100px',
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          role: [
              {validator: validateRole, trigger: 'blur' }
          ]
        }
        }
    },
    methods: {
        cityChanged(msg){
            this.cityPickerData = msg
            console.log(this.cityPickerData)
        },
        getSystem(){
            GetSystem().then(response => {
                this.roleItem = response.data.data
            }).catch(error => {

            })
        },
        getRole(){
            // GetRole().then(response => {
            //     this.roleItem = response.data.data
            // }).catch(error => {

            // })
            GetPermButton().then(response => {
                this.btnPerm = response.data.data
                console.log(this.btnPerm)
            }).catch(error => {

            })
        },
        childrenClose(){
            this.dialog_info_flag = false
            this.$emit('close', false)
            this.$refs.userForm.resetFields()
        },
        switchTitle(){
            if(this.$props.editData.id){
                this.title = '编辑'
            }else{
                this.title = '新增'
            }
        },
        openDialog(){
            this.getSystem()
            this.getRole()
            console.log(this.$props.editData)
            let editData = this.$props.editData
            if(editData.id){
                //编辑
                editData.role = editData.role ? editData.role.split(',') : []
                editData.btnPerm = editData.btnPerm ? editData.btnPerm.split(',') : []
                //循环JSON对象
                for(let key in editData){
                    this.form[key] = editData[key]
                }
            }else{
                //添加
                // this.form.id && delete this.form.id
            }
            console.log(this.form)
        },
        userAdd(requestData){
                UserAdd(requestData).then( response => {
                console.log(response.data)
                this.$message({
                    message: response.data.message,
                    type: 'success',
                    duration: 2000
                })
                this.submitLoading = false
                this.$refs.userForm.resetFields()
                this.cityPickerData = {}
                this.form.status = '1'
                this.$emit('close', false)
            }).catch( error => {
                this.submitLoading = false
                this.$refs.userForm.resetFields()
                this.cityPickerData = {}
                this.form.status = '1'
            })
        },
        userEdit(requestData){
                UserEdit(requestData).then( response => {
                console.log(response.data)
                this.$message({
                    message: response.data.message,
                    type: 'success',
                    duration: 2000
                })
                this.submitLoading = false
                this.$refs.userForm.resetFields()
                this.cityPickerData = {}
                this.form.status = '1'
                this.$emit('close', false)
            }).catch( error => {
                this.submitLoading = false
                this.$refs.userForm.resetFields()
                this.cityPickerData = {}
                this.form.status = '1'
            })

        },
        submit(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
            this.submitLoading = true
            //深拷贝转为前拷贝
            // let requestData = {      	
            //     username: this.form.username,
            //     truename: this.form.truename,
            //     password: this.form.password,
            //     phone: this.form.phone,
            //     region: this.form.region,
            //     status: this.form.status,
            //     role: this.form.role.join(',')

            // }
            //深拷贝JSON.parse(JSON.stringify(this.form)) //先是字符串，再转换为json对象  //深拷贝如果有function，undefined,Symbol()则会丢失
            //浅拷贝Object.assign({},this.form) //拷贝出来的就是一个对象
            let requestData = JSON.parse(JSON.stringify(this.form))
            requestData.role = requestData.role.join()
            requestData.btnPerm = requestData.btnPerm.join()
            requestData.region = JSON.stringify(this.cityPickerData)
            console.log(requestData)
            if(requestData.id){  
                requestData.password ? requestData.password : delete requestData.password
                console.log(requestData)
                this.userEdit(requestData)
            }else{
                console.log(requestData)
                this.userAdd(requestData)
            }
            } else {
                console.log('error submit!!');
                return false;
            }
            });
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
        editData: {
            type: Object,
            default: () => {}
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