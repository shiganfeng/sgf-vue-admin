<template>
    <div id="layout" :class="[menuStatus ? 'close':'open']">
        <LayoutHeader></LayoutHeader>
        <LayoutMain></LayoutMain>
        <LayoutNav></LayoutNav>
    </div>
</template>
<script>
import LayoutHeader from '../Console/Components/Header.vue'
import LayoutNav from '../Console/Components/Nav.vue'
import LayoutMain from '../Console/Components/Main.vue'
export default {
    name: 'layout',
    components: {LayoutHeader,LayoutNav,LayoutMain},
    data(){
        return{

        }
    },
    computed: {
        menuStatus: function(){
            return this.$store.state.app.isCollapse
        }
    }
}
</script>
<style lang="scss" scoped>

</style>