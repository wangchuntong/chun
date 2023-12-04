import * as Echarts5 from 'echarts'
import Vue from 'vue'

Vue.use({
    install(Vue){
        Vue.prototype.$echarts = Echarts5;
    },
});
export default Echarts5;