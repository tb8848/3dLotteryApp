//const baseUrl = "http://10.11.122.233:9998/vip"
//const baseUrl = "http://45.195.145.20:9092/vip"
//const wsUrl = "ws://45.195.145.20:9094/app"
//生产
// const baseUrl = "https://aa.3d11aa.com:9092/vip"
// const wsUrl = "wss://aa.3d11aa.com:9094/app"
//本地
const baseUrl = "http://192.168.1.52:9092/vip"
const wsUrl = "ws://192.168.1.52:9094/app"

//开放接口，验证域名，版本升级
//const openApi = "http://45.195.145.12:8888"
//const openApi = "http://192.168.1.21:8888"
const openApi = "http://hn3dhn01hk.com:8888"

export function getResponseData(url,method,params,successCallback) {
 
  if(method=='GET' || method=='get'){
	  let newurl = url + "?";
	  for (const propName of Object.keys(params)) {
	    const value = params[propName];
	    var part = encodeURIComponent(propName) + "=";
	    if (value !== null && typeof value !== "undefined") {
	      if (typeof value === "object") { 
	        for (const key of Object.keys(value)) {
	          let params = propName + "[" + key + "]";
	          var subPart = encodeURIComponent(params) + "=";
	          newurl += subPart + encodeURIComponent(value[key]) + "&";
	        }
	      } else {
	        newurl += part + encodeURIComponent(value) + "&";
	      }
	    }
	  }
	  newurl = newurl.slice(0, -1);
	  url = newurl;
	  params = {}
  }
  const token = uni.getStorageSync("token");
  const lang = uni.getStorageSync("lang");
 
  uni.request({
	url:baseUrl + url,
	method:method.toUpperCase(),
	data:params,
	fail:(e)=> {
		uni.hideLoading();
		//showToastTip("网络错误")
	},
	header:{
		"Content-Type":"application/json;charset=utf-8",
		"token":token,
		"lang":lang=='tai'?'th':'zh'
	},
	success: (e) => {
		const data = e.data;
		// console.log("==========",url)
		// console.log("==========",data)
		if(data.code==500){
			uni.showToast({
				title:data.msg,
				duration:3000,
				icon:"error"
			})
			
		}else if(data.code==403){
			uni.setStorageSync("token","");
			//getApp().closeWs();
			const err={
				code:2,
				msg:'会话失效，请重新登录',
				title:'登录提示'
			}			
			uni.reLaunch({
				url:"/pages/login?qs="+encodeURIComponent(JSON.stringify(err))
			})
		}else{
			successCallback(data);
		}
		
	},
	complete: () => {
		uni.hideLoading()
	}
  })
}


export function showToastTip(msg){
	plus.nativeUI.toast(msg,{
		'verticalAlign':'bottom'
	})
}

// export function showToastTip(msg,options){
// 	plus.nativeUI.toast(msg,{
// 		'verticalAlign':options.verticalAlign
// 	})
// }

export function getBaseUrl(){
	return baseUrl;
}

export function getWsUrl(){
	return wsUrl;
}

export function getOpenApiUrl(){
	return openApi;
}


/**
 * @param {Object} url 盘口地址
 * @param {Object} method  请求方法类型，如GET,POST
 * @param {Object} params 请求参数，JSON对象
 * @param {Object} successCallback 回调方法
 */
export function getRespDataWithUrl(url,method,params,successCallback) {
 
  if(method=='GET' || method=='get'){
	  let newurl = url + "?";
	  for (const propName of Object.keys(params)) {
	    const value = params[propName];
	    var part = encodeURIComponent(propName) + "=";
	    if (value !== null && typeof value !== "undefined") {
	      if (typeof value === "object") { 
	        for (const key of Object.keys(value)) {
	          let params = propName + "[" + key + "]";
	          var subPart = encodeURIComponent(params) + "=";
	          newurl += subPart + encodeURIComponent(value[key]) + "&";
	        }
	      } else {
	        newurl += part + encodeURIComponent(value) + "&";
	      }
	    }
	  }
	  newurl = newurl.slice(0, -1);
	  url = newurl;
	  params = {}
  }
  const token = uni.getStorageSync("token");
  const lang = uni.getStorageSync("lang");
 
  uni.request({
	url:url,
	method:method.toUpperCase(),
	data:params,
	fail:(e)=> {
		uni.hideLoading();
		const data = {
			code:-1,
			msg:"网络错误"
		}
		successCallback(data);
		//showToastTip("网络错误")
	},
	header:{
		"Content-Type":"application/json;charset=utf-8",
		"token":token,
		"lang":lang=='tai'?'th':'zh'
	},
	success: (e) => {
		const data = e.data;
		// console.log("==========",url)
		// console.log("==========",data)
		if(data.code==500){
			uni.showToast({
				title:data.msg,
				duration:3000,
				icon:"error"
			})
			
		}else if(data.code==403){
			// uni.setStorageSync("token","");
			//getApp().closeWs();
			const err={
				code:2,
				msg:'会话失效，请重新登录',
				title:'登录提示'
			}			
			// uni.reLaunch({
			// 	url:"/pages/multi_login_v2?qs="+encodeURIComponent(JSON.stringify(err))
			// })
		}else{
			successCallback(data);
		}
		
	},
	complete: () => {
		uni.hideLoading()
	}
  })
}

