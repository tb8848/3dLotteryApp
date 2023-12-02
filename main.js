import App from './App'
import messages from './locale/index'

var localeLang = uni.getStorageSync("lang");
if(null!=localeLang && "undefined"!=localeLang && localeLang!=undefined && localeLang!=""){
	if(localeLang == 'zh-CN'){
		localeLang = 'zh'
	}
}else{
	let systemInfo = uni.getSystemInfoSync();
	localeLang = systemInfo.language;
	if(localeLang == 'zh-CN'){
		localeLang = 'zh'
	}
}
	  

let i18nConfig = {
  locale: localeLang,
  messages,
  globalInjection:true,
  legacy:false
}

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false
App.mpType = 'app' 

const app = new Vue({
  i18n,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import Vue from 'vue'
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
const i18n = createI18n(i18nConfig)
export function createApp() {
  const app = createSSRApp(App)
  app.use(i18n)
  return {
    app
  }
}
// #endif
