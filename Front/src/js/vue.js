import "@babel/polyfill"
import Vue from 'vue/dist/vue.common.dev'

Vue.mixin({
    props: {
        "pay_redirection_url": {
            type: String,
            required: false,
            default: "nothing"
        }
    }
})

//Vue set-up
Vue.config.devtools = true;

window.Vue = Vue;

export default Vue
