let socketOpen = false;

import {getStomp} from './stomp.js';

//import Stomp from "./stomp-v2.js"
	  uuid:null,
	  stomp:null,
	  subscriptions:[],

		uuid:that.uuid,  
		  if(!socketOpen){
			  console.log('WebSocket连接已打开！', res);
			  that.isCreate = true;
			  socketOpen = true;
			  that.isConnect = true
			  clearInterval(that.heartbeatTimer)
			  clearTimeout(that.reconnectTimer)
			  // 打开心跳检测
			  that.heartbeatCheck();
			  ws && ws.onopen && ws.onopen();
			  
			  for (let i = 0; i < socketMsgQueue.length; i++) {
			    ws && ws.send(socketMsgQueue[i]);
			  }
			  socketMsgQueue = [];
		  }
		if(that.client){
			that.client.disconnect();
			that.client = null;
			socketOpen = false;
			that.isConnect = false
			that.reconnect();//重连		
		}
		//that.client.unsubscribeAll();
		console.log(">>>>>>client close >>>",that.client);
		if(that.client){
			
			//that.client.unsubscribeAll();
			that.client.disconnect();
			that.client = null;
			that.baseURL = "";
			that.isConnect = false;
			that.stomp = null;
			socketOpen = false;	
			console.log('WebSocket 已关闭！', res);
			//that.client.ws = null;
		}
	  //const Stomp = this.stomp = sto;
	  const Stomp  = this.stomp = getStomp();
	  console.log("client>>>>>>>>>>>>>>>>>>>>",client);
      client.connect({}, function() {
		var c = this;
		console.log('---------stomp connected----------------',c);
		resolve(client)		
	  
	 //this.client.disconnect();
	_this.subscriptions=[];
	
	uni.closeSocket({
			 success:(res)=> {
			 	console.log('================关闭 WebSocket 成功')
			 },
			 fail: (res) => {
			 	console.log('================关闭 WebSocket 失败')
			 }
	});
	  var that = this;
	  socketMsgQueue.length = 0;
	    console.log('重连中...')
			  that.client = c;
			  that.subscriptions.forEach(function(f) {
			      f(c);
			  });
		  });
		var funExsist = false;
		this.subscriptions.forEach(function(e){
		if (e.toString()==subscribe.toString())
		 {
			  funExsist = true;
														 
		 }
		});
		
		if (funExsist==false){
			//把订阅保存到数组
			this.subscriptions.push(fun);							
			//执行订阅
			fun(this.client);	  	
		}
								            		
	}


