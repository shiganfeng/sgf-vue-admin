<template>
    <div id="main-wrap">
        <div class="main-content">
            <div class="content">
                <!-- 此处放置el-tabs代码 -->
                <div >
                <el-tabs
                    v-model="activeIndex"
                    type="card"
                    closable
                    @tab-click='tabClick'
                    @tab-remove='tabRemove'
                    >
                    <el-tab-pane
                    :key="item.path"
                    v-for="(item, index) in openTab"
                    :label="item.route"
                    :name="item.route"
                    >
                    <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
                    </el-tab-pane>
                </el-tabs>
                <!-- <div>
                    <div v-for="(item, index) in openTab">
                      <div>{{item.route == activeIndex}}</div>
                      <div>item.route:{{item.route}}</div>
                      <div>activeIndex:{{activeIndex}}</div>
                      <div>openTab:{{openTab}}</div>
                    </div>
                </div> -->
                <keep-alive :include="['index','InfoIndex','category','UserIndex','infoDetailder']">
                  <router-view></router-view>
                </keep-alive>
                <!-- <keep-alive>
                  <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view> -->
                </div>
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
    methods:{
    //tab标签点击时，切换相应的路由
    tabClick(tab){
      console.log('active',this.activeIndex);
      this.$router.push({path: this.activeIndex});
      // this.$router.push({name: '信息详情'});
    },
    //移除tab标签
    tabRemove(targetName){
      //首页不删
      if(targetName == '/'||targetName == '/index'){
        return
      }
      this.$store.commit('tabSwitch/delete_tabs', targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
          console.log('=============',this.openTab[this.openTab.length-1].route)
          this.$store.commit('tabSwitch/set_active_index', this.openTab[this.openTab.length-1].route);
          this.$router.push({path: this.activeIndex});
        } else {
          this.$router.push({path: '/'});
        }
      }
    }
  },
  mounted () {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    // this.openTab = JSON.parse(localStorage.getItem('tabSwitch'))
    // console.log(JSON.parse(localStorage.getItem('tabSwitch')))
    // if (this.$route.path !== '/' && this.$route.path !== '/console') {
    //   console.log('1');
    //   this.$store.commit('tabSwitch/add_tabs', {route: '/console' , name: 'Console'});
    // //   this.$store.commit('tabSwitch/add_tabs', {route: this.$route.path , name: this.$route.name });
    //   this.$store.commit('tabSwitch/set_active_index', this.$route.path);
    // } else {
    //   console.log('2');
    //   this.$store.commit('tabSwitch/add_tabs', {route: '/console', name: 'Console'});
    //   this.$store.commit('tabSwitch/set_active_index', '/console');
    //   this.$router.push('/console');
    // }
    // console.log(this.$store.state.tabSwitch.openTab)

    console.log(localStorage.getItem('activeIndex'))
    this.activeIndex = localStorage.getItem('activeIndex')
  },
  computed: {
    openTab : {
        get(){
            return this.$store.state.tabSwitch.openTab;
        },
        set(){

        }
    },
    activeIndex:{
      get () {
        return this.$store.state.tabSwitch.activeIndex;
      },
      set (val) {
        this.$store.commit('tabSwitch/set_active_index', val);
      }
    }
  },
  watch:{
    '$route'(to,from){
        //判断路由是否已经打开
        //已经打开的 ，将其置为active
        //未打开的，将其放入队列里
        // console.log(this.openTab)
        let flag = false;
        for(let item of this.openTab){
          // console.log("item.name",item.name)
          // console.log("to.name",to.name)
          // console.log(item)
          // console.log(to)

          if(item.route === to.fullPath){
            console.log('to.path',to.path);
            this.$store.commit('tabSwitch/set_active_index',to.path)
            flag = true;
            break;
          }
        }
        if(!flag){
          console.log('to.path',to.path);
          this.$store.commit('tabSwitch/add_tabs', {route: to.path, name: to.name});
          this.$store.commit('tabSwitch/set_active_index', to.path);
        }
        localStorage.setItem('tabSwitch',JSON.stringify(this.openTab))
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap{
    height: 100vh;
    // position: fixed;
    // left: $navMenu;
    // top: 75px;
    // bottom: 0;
    // right: 0;
    // border: 30px solid #f7f7f7;
    // border-bottom: none;
    // background-color: #fff;
    // -webkit-box-sizing: border;
    // -webkit-transition: all 0.3 ease 0s;
}
.main-content{
    width: 100%;
    height: 100%;
    padding-top: 105px;
    padding-right: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.content{
    // width: 100%;
    height: 100%;
    padding: 30px 30px 30px 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
}

.open{
    .main-content{
        padding-left: $navMenu + 30;
    }
}

.close{
    .main-content{
        padding-left: $navMenuMin + 30;    
        
    }
}
</style>