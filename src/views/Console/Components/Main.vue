<template>
    <div id="main-wrap">
        <div class="main-content">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
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
    -webkit-transition: all 0.3 ease 0s;
    box-sizing: border-box;
}
.content{
    width: 100%;
    height: 100%;
    padding: 3opx 30px 0 30px;
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
</style>padding-