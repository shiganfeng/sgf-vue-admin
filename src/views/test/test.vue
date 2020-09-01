<template>
    <!-- <div>
        <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div> -->
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" closable @tab-remove="tabRemove">
            <el-tab-pane label="用户管理" name="1">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="2">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="3">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="4">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                imageUrl: '',
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            tabRemove(tagname){
                console.log(tagname)
            },
            handleClick(tab, event) {
                console.log(this.activeName)
                // console.log(tab.name);
                // this.$router.push({
                //     name: tab.name
                // })
            }
        }
    }
</script>
<style lang="scss">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>