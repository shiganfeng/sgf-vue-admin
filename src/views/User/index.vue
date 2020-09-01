<template>
    <div>
        <el-row :gutter="16">
            <el-col :span="20">
                <div class="label-wrap category">
                    <label>关键字:</label>
                    <div class="wrap-content">
                        <el-row :gutter="16">
                            <el-col :span="3">
                                <el-select v-model="selectValue">
                                    <el-option
                                    v-for="item in data.option"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="searchKey" placeholder="请输入关键字"></el-input>
                            </el-col>
                            <el-col :span="16">
                                <el-button type="danger">搜索</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <el-button type="danger" class="pull-right">添加用户</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'UserIndex',
    data(){
        return{
            selectValue: '',
            searchKey: '',
            data: {
                option: [
                    {value: 'name', label: '姓名'},
                    {value: 'phone', label: '手机号'},
                    {value: 'email', labek: '邮箱'}
                    ]
            }
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