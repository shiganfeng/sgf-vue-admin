<template>
    <div id="header-wrap">
        <div class="pull-left header-icon"  @click="navMenuState">
            <svg-icon iconClass="menu" className="menu" />
        </div>
        <div class="pull-right">
            <div class="pull-left user-info">
                {{username}}
            </div>
            <div class="pull-left header-icon" @click="exit">
                <svg-icon iconClass="exit" className="exit" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        navMenuState(){
            console.log('111')
            this.$store.commit('app/SET_COLLAPSE')
        },
        //退出
        exit(){
            this.$store.dispatch('app/exit').then( () => {
                //路由跳转
                this.$router.push({
                    name: 'Login'
                })
            })
        }
    },
    computed: {
        username: function(){
            return this.$store.state.app.username
        }
    }
    
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap{
    position: fixed;
    left: $navMenu;
    right: 0;
    top: 0;
    height: 75px;
    background-color: #fff;
    line-height: 75px;
    -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
    -webkit-transition: all 0.3 ease 0s;
}
.header-icon{
    padding: 0 32px;
    svg{
        color: gray;
        margin-bottom: -8px;
        font-size: 25px;
        cursor: pointer;
    }
}
.user-info{
    height: 100%;
    padding: 0 32px;
    border-right: 1px solid #ededed;
    + .header-icon{
        padding: 0 28px;
    }
}

.open{
    #header-wrap{
        left: $navMenu;
    }
}

.close{
    #header-wrap{
        left: $navMenuMin;
    }
}
</style>