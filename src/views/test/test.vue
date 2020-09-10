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
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"   background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4">订单管理</el-menu-item>
        </el-menu>
        <!-- <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
        <el-tree
        :data="newdata"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
        </el-tree>

        <div class="buttons">
            <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="getCheckedKeys">通过 key 获取</el-button>
            <el-button @click="setCheckedNodes">通过 node 设置</el-button>
            <el-button @click="setCheckedKeys">通过 key 设置</el-button>
            <el-button @click="resetChecked">清空</el-button>
        </div>
        <div class="block">
            <p>使用 scoped slot</p>
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <el-tree
            :data="newdata"
            show-checkbox
            node-key="id"
            default-expand-all
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            ref="tree"
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                <el-button
                    type="text"
                    size="mini"
                    @click="() => append(data)">
                    Append
                </el-button>
                <el-button
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)">
                    Delete
                </el-button>
                </span>
            </span>
            </el-tree>
        </div>
    </div>
</template>
<script>
    let id = 1000
    export default {
        data() {
            return {
                imageUrl: '',
                activeName: '1',
                activeIndex: '1',
                filterText: '',
                treeData: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                        label: '三级 1-1-1'
                        },{
                        label: '三级 1-1-2'
                        }]
                    }]
                    }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                        label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                        label: '三级 2-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                newdata: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                    id: 9,
                    label: '三级 1-1-1'
                    }, {
                    id: 10,
                    label: '三级 1-1-2'
                    }]
                }]
                }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
                }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
                }],
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
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
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleNodeClick(data) {
                console.log(data);
            },
            getCheckedNodes() {
                console.log(this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
            },
            setCheckedNodes() {
                this.$refs.tree.setCheckedNodes([{
                id: 5,
                label: '二级 2-1'
                }, {
                id: 9,
                label: '三级 1-1-1'
                }]);
            },
            setCheckedKeys() {
                this.$refs.tree.setCheckedKeys([3]);
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            },
            append(data) {
                console.log("data:", data)
                const newChild = { id: id++, label: 'testtest', children: [] };
                if (!data.children) {
                this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },

            remove(node, data) {
                console.log("node:",node)
                console.log("data:",data)
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleDragStart(node, ev) {
                console.log('drag start', node);
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log('tree drag enter: ', dropNode.label);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                console.log('tree drag leave: ', dropNode.label);
            },
            handleDragOver(draggingNode, dropNode, ev) {
                console.log('tree drag over: ', dropNode.label);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                console.log('tree drag end: ', dropNode && dropNode.label, dropType);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                console.log('tree drop: ', dropNode.label, dropType);
            },
            allowDrop(draggingNode, dropNode, type) {
                // if (dropNode.data.label === '二级 3-1') {
                // return type !== 'inner';
                // } else {
                // return true;
                // }
                return true
            },
            allowDrag(draggingNode) {
                // return draggingNode.data.label.indexOf('三级 3-2') === -1;
                return true
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