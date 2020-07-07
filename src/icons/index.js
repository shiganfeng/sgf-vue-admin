import Vue from "vue"
import { Icon } from "element-ui"
import SvgIcon from "../icons/SvgIcon.vue"

Vue.component('svg-icon', SvgIcon)

const  req  =  require.context('./svg',  false,  /\.svg$/)
const  requireAll  =  requireContext  =>  {  
    return  requireContext.keys().map(requireContext)
}
requireAll(req)