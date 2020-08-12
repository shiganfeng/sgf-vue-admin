import { MessageBox } from 'element-ui'
export default {
    install(Vue, options) {
        Vue.prototype.myConfirm = function(params) {
            this.$confirm(params.content, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                if (params.fn) {
                    params.fn(params.id)
                }
            }).catch(() => {});
        }
    }
}