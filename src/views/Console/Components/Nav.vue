<template>
    <div id="nav-wrap">
        <h1 class="logo"><img src="../../../assets/logo.png"></h1>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#fff"
        router>
        <template v-for="(item, index) in routers" >
            <el-submenu index="1" v-if="!item.hidden" :key="item.id" :index="index + ''">
                <!--一级菜单-->
                <template slot="title">
                <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"/>
                <span slot="title">{{item.meta.name}}</span>
                </template>
                    <!--子菜单-->
                    <template v-for="subItem in item.children">
                        <el-menu-item :index="subItem.path"  v-if="!subItem.hidden" :key="subItem.id">{{subItem.meta.name}}</el-menu-item>
                    </template>
            </el-submenu>
        </template>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: 'navMenu',
    data(){
        return{
            routers: this.$router.options.routes
        }
    },
    computed: {
        isCollapse: function(){
            return this.$store.state.app.isCollapse
        }
    },
    methods:{
    },
    created(){
    }
    
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: $navMenu;
    background-color: #344a5f;
    -webkit-transition: all 0.3 ease 0s;
    svg{
        font-size: 20px;
        margin-right: 10px;
    }
    .logo{
        img{
            margin: 28px auto 25px;
            width: 92px;
            -webkit-transition: all 0.3 ease 0s;
        }
    }
}

.open{
    #nav-wrap{
        width: $navMenu;
    }
}

.close{
    #nav-wrap{
        width: $navMenuMin;
        .logo img{
            width: 70%;
        }
    }
}
</style>