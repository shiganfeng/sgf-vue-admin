<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="myiconName"></use>
    </svg>

</template>
<script>
export default {
    name: 'svgIcon',
    props: ['iconClass', 'className'],
    data(){
        return{

        }
    },
    created(){
    },
    computed:{
        myiconName: function(){
            return `#icon-${this.$props.iconClass}`
        },
        svgClass: function(){
            if(this.$props.className){
                return `svg-icon ${this.$props.className}`
            }else{
                return `svg-icon`
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.svg-icon{
    width: 1em;
    height: 1em;
    fill: currentColor;
    color: #fff;
    &.font12{
        font-size: 20px;
    }
}

</style>