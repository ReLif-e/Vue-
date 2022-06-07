import PageTool from '@/components/PageTool'
import UploadExcel from './UploadExcel'
import UploadImg from './UploadImg'

// 全局的组件
export default {
  install(Vue) {
    Vue.component('PageTool', PageTool)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('UploadImg', UploadImg)
  }
}
