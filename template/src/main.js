import './publicPath'
import Vue from 'vue'
import App from './App.vue'
{{#router}}
import router from './router'
{{/router}}
{{#store}}
import store from './store'
{{/store}}
import ElementUI from 'element-ui'
import MicroApp from '@winning/micro-app'

export * from '@winning/micro-app'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.use(MicroApp, {
  {{#router}}
  router,
  {{/router}}
  {{#store}}
  store,
  {{/store}}
  render: h => h(App),
  bootstrap: (props) => {
    console.log('bootstrap')
  },
  mount: (props) => { },
  unmount: (props) => { }
})
