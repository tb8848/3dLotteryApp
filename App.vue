<script>
  import { getResponseData,showToastTip,getBaseUrl,getWsUrl} from "@/api/req.js";	
  import websocket from '@/static/js/socket/websocket-uni.js';
  
  export default {
    onLaunch: function() {
	  plus.screen.lockOrientation("portrait-primary");//禁止转动屏幕
      console.log('App Launch')
	  uni.setStorageSync("wsStarted",0);
	  uni.setStorageSync("offline",-1);
	  uni.setStorageSync("wsUrl","")
	  //uni.setStorageSync("token","");
    },
    onShow: function() {
  //       console.log('App Show');
		// //uni.setStorageSync("accountList","");
		// const token = uni.getStorageSync("token");
		// if(token!=null && token!="" && null == websocket.client){
		// 	console.log("0=================websocket client 为 null , 启动ws");
		// 	uni.getStorageSync("wsStarted",1);
		// 	this.startWS();
		// }
		//this.startWS();
    },
    onHide: function() {
      console.log('App Hide');
	  //this.closeWs();
    },
	methods:{
		startWS(){
			var that = this;
			const wsUrl = uni.getStorageSync("wsUrl");
			const token = uni.getStorageSync("token");
			if(token && wsUrl){
				var url = wsUrl+"?token="+token;
				// if(websocket.baseURL==""){
					//首次连接
					function subscribe(client){
						console.log("===============subscribe");
						client.subscribe('/topic/drawOpenStatus', function(e){
							uni.$emit("drawOpenStatus",e.body);			
						});	
										
						client.subscribe('/user/queue/logout', function(e){
							console.log("收到下线消息啦.......");
							console.log(e);
							if (e.body=="强制下线"){
								uni.setStorageSync("token","");
								uni.setStorageSync('wsUrl',"");
								uni.setStorageSync('lotteryName',"");
								uni.setStorageSync('panUrl',"");
								uni.setStorageSync("offline",1);
								that.closeWs();
								const err={
									code:1,
									msg:that.$t("login.offlineTip"), //'已在其他终端登录，如非本人操作，请重新登录',
									title:that.$t("login.offlineTitle") // '下线提示'
								}
								uni.redirectTo({
									url:"/pages/starter?qs="+encodeURIComponent(JSON.stringify(err))
								})							
							}							
						});												
					}							
					var uuid = "ws-"+Math.random();
					websocket.init(url,uuid).then(client => {
						//执行订阅函数
						console.log("========================exec subscribe 1");
						websocket.execSubscrip(subscribe);					
					});  
				//}
				//websocket.baseURL = url;
				//if(websocket.baseURL==""){
					//var wsurl = getWsUrl();					
					 
											
				// }else if(!websocket.isConnected){	
				// 	console.log("========================exec reconnect 1");
				// 	websocket.isInitiative=false;
				// 	websocket.reconnect();
				// }			
			}	
		},
		closeWs(){
			if(websocket && websocket.isConnect){
				console.log("close=================ws")
				websocket.disconnect();
				websocket.baseURL = "";
				//websocket.client = null;
				uni.$off("drawOpenStatus");       
				uni.setStorageSync("wsStarted",0);
			}		
		},
		
		restartWs(){
			if(null == websocket.client){
				console.log("1=================websocket client 为 null , 启动ws")
				this.startWS();
			}
		},
	
	}
  }
</script>

<style>
  .container {
    padding: 15px;
  }

  button {
    margin-bottom: 15px;
  }
  
  .checkbox .uni-checkbox-input{
	  border: 1px solid #9a9a9a;
	  border-radius: 50%;
	  width: 40rpx; 
	  height: 40rpx; 
	  box-sizing:border-box;
  }
  
  
  .cancelLiner{
  	background:linear-gradient(#D1D0D3,#98959D);	
  }
  
  .linerBtn{
  	background:linear-gradient(#8354CB,#6836B2);
	color:#fff
  }
  
  .linerBtn:active{
  	background: #ebeb75 !important;
  }
  
</style>
