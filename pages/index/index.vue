<template>	
	<view >			
		<view class="globalTopHeader">
			<view :style="{'height':barHeight+'rpx'}">&nbsp;&nbsp;</view>
			<view class="toptitle" style="height: 80rpx;">
				<view class="more" style="background-color:#8150CA;"  @click="scan()"><uni-icons type="scan" size="28" color="#ffffff"></uni-icons>
					<!-- <text style="color: white;font-size: 32rpx;">扫一扫</text> -->
				</view>
				<view class="title">
					{{$t('index.account-number')}}:<span>{{username}}</span> {{$t('index.used')}}:<span>{{money}}</span>
				</view>
				<view class="more"  @click="more()">
					<text style="color: white;font-size: 32rpx;">{{$t('index.more')}}</text>
				</view>							
			</view>
			<view :class="[langType==1?'tips-tai':'tips']">
				<text style="font-weight: bold;">[{{lotteryName}}]</text>
				<text>{{$t('index.issue-no')}}:{{issueNo}}</text>
				<text v-if="openStatus==1" style="margin-left:20rpx">{{$t('index.departure-panel')}}:{{time}}</text>
				<text v-else-if="openStatus==3" style="margin-left:20rpx">离开盘:{{time}}</text>
				<text v-else style="margin-left:20rpx">{{openStatusDesc}}</text>
			</view>
			<index-tabbar :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex" ></index-tabbar>						
		</view>
		
		<view :style="{'margin-top':topHeaderHeight+'rpx'}">					
			<!-- 每个tab标题对应的具体组件内容 -->
			<component v-bind:is="currentTabComponent"></component>
		</view>
		
		<!-- <uni-drawer ref="showRight" mode="right" :mask-click="false" @change="changeDrawer($event,'showRight')">
			<scroll-view style="height: 100%;" scroll-y="true">
				<button @click="closeDrawer('showRight')" type="primary">关闭Drawer</button>
				<view class="gengduo" @click="remind()">{{$t('index.special-reminder')}}</view>
				<view class="gengduo" @click="lotteryNumber()">{{$t('index.lottery-number')}}</view>
				<view class="gengduo" @click="rule()">{{$t('index.rule-description')}}</view>
				<view class="gengduo" @click="quanjie()">{{$t('index.full-description')}}</view>
				<view class="gengduo" @click="updPassword()">{{$t('index.change-password')}}</view>
				<view class="gengduo" @click="bluetooth()">{{$t('index.bluetooth-settings')}}</view>
				<view class="gengduo" @click="setLanguage()">{{$t('index.language-settings')}}</view>
				<view class="gengduo" @click="version()">{{$t('index.version-no')}}</view>
				<view class="gengduo" @click="signOut()">{{$t('index.exit-the-system')}}</view>			
			</scroll-view>
		</uni-drawer> -->
		
		<view class="popup" :style="{'display':popup,'top':(barHeight+110)+'rpx'}">
			<view style="float: right;" :style="{'width':floatWidth+'rpx'}">
				<view class="gengduo" @click="remind()">{{$t('index.special-reminder')}}</view>
				<view class="gengduo" @click="lotteryNumber()">{{$t('index.lottery-number')}}</view>
				<view class="gengduo" @click="rule()">{{$t('index.rule-description')}}</view>
				<view class="gengduo" @click="quanjie()">{{$t('index.full-description')}}</view>
				<view class="gengduo" @click="updPassword()">{{$t('index.change-password')}}</view>
				<view class="gengduo" @click="bluetooth()">{{$t('index.bluetooth-settings')}}</view>
			<!-- 	<view class="gengduo" @click="setLanguage()">{{$t('index.language-settings')}}</view> -->
				<view class="gengduo" @click="version()">{{$t('index.version-no')}}</view>
				<view class="gengduo" @click="signOut()">{{$t('index.exit-the-system')}}</view>
			</view>
		</view>
		
		<uni-popup ref="versionPopup" background-color="#fff" >
			<view style="width: 300px;height: 190px;">
				<view style="text-align: center;padding-top: 15px;">
					<!-- <image src="../../static/logo.png" class="imgIcon"></image> -->
					<image src="../../static/3D.png" class="imgIcon"></image>
				</view>
				<view style="text-align: center;padding-top: 10px;">{{$t('index.version-no')}}&nbsp;&nbsp;<span>{{versionNo}}</span></view>
			</view>
		</uni-popup>
		
		<uni-popup ref="systemPopup" background-color="#fff" >
			<view style="width: 100%;">
				<view style="text-align: center;padding-top: 20px;font-weight: bold;color: #7E7E7E;">
					{{$t('index.exit-the-system')}}?
				</view>
				<view style="display: flex;width: 100%;justify-content: space-around;padding-top: 30px;font-weight: bold;">
					<view class="anniu" style="color: #7E7E7E;" @click="quxiao()">{{$t('mingxi.cancel')}}</view>
					<view class="anniu" style="color: #396AA3;" @click="queding()">{{$t('kuaida.determine')}}</view>
				</view>
			</view>
		</uni-popup>
						
		<luo-version-upgrade v-if="appUpgrade.upgrade" 
			:version="appUpgrade.remoteVer" :url="appUpgrade.url" 
			:describe="appUpgrade.describe" :is_force="appUpgrade.is_force">
		</luo-version-upgrade>
	</view>
	
</template>

<script>
	import indexTabbar from '../commons/TopBar.vue';
	//推荐选项卡  具体内容
	import KuaiDa from '../index/kuaida.vue';
	//关注选项卡  具体内容
	import MingXi from '../index/mingxi.vue';
	//日志选项卡  具体内容
	import Logs from '../index/logs.vue';
	//账单选项卡  具体内容
	import Bills from '../index/bills.vue';
	//资料选项卡  具体内容
	import ZiLiao from '../index/ziliao.vue';
	//快选选项卡  具体内容
	import KuaiXuan from '../index/kuaixuan-v2.vue';
	
	import versionUpgrade from "@/components/luo-version-upgrade/luo-version-upgrade.vue";
	
	import { getResponseData,showToastTip,getBaseUrl,getWsUrl,getRespDataWithUrl,getOpenApiUrl} from "@/api/req.js";
	
	import WebSocket from '@/static/js/socket/websocket.js'
	
	export default {
		components:{
			indexTabbar,
			KuaiDa,
			MingXi,
			Logs,
			Bills,
			ZiLiao,
			KuaiXuan,
			versionUpgrade
		}, 
		data() {
			return {
				showRight: false,
				langType:0, //0:中文，1：泰文
				floatWidth:200, //更多弹窗的宽度，不同语言设置不同的宽度
				lang:'',
				openStatus:0,
				openStatusDesc:'',
				title:"",
				username:"---",	//账号
				money:0,			//已用
				windowHeight: 0,	//屏幕高度
				windowWidth:0,		//屏幕宽度
				popup:'none',		//更多是否显示
				versionNo:'6.7',	//版本号
				issueNo: "---",		//期号
				time: '---',	//离停盘
				tabIndex: "KuaiXuan",
				stopTime:'',
				dayLeftTimer:null,
				openStatusTimer:null,
				topHeaderHeight:0,
				cssHeights:{
					headerMarginTop:0,
					headerHeight:210,
					contentMarginTop:0,
					contentHeight:0,
					langHeight:40
				},
				tabBars:[
					{
						// name: "明细",
						name: this.$t('index.detailed'),
						id: "MingXi"
					},
					{
						// name: "快打",
						name: this.$t('index.hurry-up'),
						id:"KuaiDa"
					},
					{
						// name: "快选",
						name: this.$t('index.quick-selection'),
						id: "KuaiXuan"
					},
					{
						// name: "资料",
						name: this.$t('index.data'),
						id: 'ZiLiao'
					},
					{
						// name: "账单",
						name: this.$t('index.bill'),
						id: "Bills"
					},
					{
						// name: "日志",
						name: this.$t('index.journal'),
						id: "Logs"
					}
				],
				currentTabComponent: "KuaiXuan",
				barHeight:25,
				bodyHeight:0,
				appUpgrade:{
					upgrade:false,
					url:'',
					localVer:'',
					remoteVer:'',
					describe:'',
					is_force:false
				},
				scanResult:'',
				textscan: this.$t('scanQr'), //'扫码'
				typescan: 'scan-listener',
				panUrl:"",
				lotteryName:"",
				ws:null
			}
		},
		onLoad(options) {
			const _this = this;
			//this.panUrl="http://192.168.8.21:9092/"
			this.panUrl = uni.getStorageSync("panUrl");
			this.lotteryName = uni.getStorageSync("lotteryName")
			//监听余额更新事件
			uni.$on('updateCredit',function(data){
				//console.log('监听到事件来自 updateCredit ，携带参数 msg 为：' + data);
				_this.updateCredit();
			})	
			
			uni.$on('langChange',function(data){//语言切换监听
				if(data.lang=='tai'){
					_this.langType = 1
					_this.floatWidth = 300
					_this.topHeaderHeight = _this.barHeight+_this.cssHeights.headerHeight+_this.cssHeights.langHeight; //单位 rpx
				}else{
					_this.langType = 0
					_this.floatWidth = 200
					_this.topHeaderHeight = _this.barHeight+_this.cssHeights.headerHeight; //单位 rpx
				}
				_this.upOpenStatus();
				//uni.setStorageSync("topbarHeight",_this.topHeaderHeight); //
				_this.tabBars=[
					{
						// name: "明细",
						name: _this.$t('index.detailed'),
						id: "MingXi"						
					},
					{
						// name: "快打",
						name: _this.$t('index.hurry-up'),
						id:"KuaiDa"						
					},
					{
						// name: "快选",
						name: _this.$t('index.quick-selection'),
						id: "KuaiXuan"					
					},
					{
						// name: "资料",
						name: _this.$t('index.data'),
						id: 'ZiLiao'						
					},
					{
						// name: "账单",
						name: _this.$t('index.bill'),
						id: "Bills"
					},
					{
						// name: "日志",
						name: _this.$t('index.journal'),
						id: "Logs"
					}
					
				]
			})
			
			//初始化已配对的蓝牙
			var pairedList = uni.getStorageSync("pairedList");
			if (pairedList==null || pairedList=="" || pairedList==undefined){
				pairedList = [];
				uni.setStorageSync("pairedList",pairedList);
			}
			
			//监听tab切换事件
			uni.$on('changeTabName',function(data){
				console.log('监听到事件来自 changeTabName ，携带参数 msg 为：' + JSON.stringify(data));
				const tabName = data.tabName;
				const drawNo = data.drawNo;
				const drawId = data.drawId; //期号主键ID
				uni.setStorageSync("billDrawNo",drawNo);
				uni.setStorageSync("billDrawId",drawId);
				_this.currentTabComponent = tabName;
				_this.tabIndex = tabName;
			})

			this.username = uni.getStorageSync("uname");
			const winH = uni.getStorageSync("winH");
			const statusBarH = uni.getStorageSync("statusBarH");
			this.barHeight = statusBarH;
			//this.topHeaderHeight = this.barHeight+this.cssHeights.headerHeight; //单位 rpx
			//uni.setStorageSync("topbarHeight",this.topHeaderHeight); //topbar的高度，单位px
			
			this.title=this.$t('index.account-number')+":"+this.username+this.$t('index.used')+":"+this.money;
			const lang = uni.getStorageSync("lang");
			if(lang=='tai'){
				this.langType = 1
				this.floatWidth = 300;
				this.topHeaderHeight = this.barHeight+this.cssHeights.headerHeight+this.cssHeights.langHeight; //单位 rpx
				
			}else{
				this.langType = 0
				this.floatWidth = 200;
				this.topHeaderHeight = this.barHeight+this.cssHeights.headerHeight; //单位 rpx
			}
			const topbarH = this.barHeight+this.cssHeights.headerHeight; //此高度为中文环境下的默认高度，保存在缓存中共享给其他页面用
			//console.log("============topbarHeight==========",topbarHeight);
			uni.setStorageSync("topbarHeight",topbarH); //topbar的高度，单位px
			this.bodyHeight = winH - this.topHeaderHeight;
			this.checkNewVersion();
			uni.showLoading({
				title:""
			})			
			this.getUnopenPrizeInfo();
			this.updateCredit();
			this.getXiaoShouDian();
			var that = this;
			uni.$on('drawOpenStatus',function(data){
				//console.log('监听到事件来自 drawOpenStatus ，携带参数 msg 为：' + data);
				var drawInfo = JSON.parse(data);
				if(drawInfo.drawNo!=that.issueNo){
					that.updateCredit();
				}
				that.openStatus = drawInfo.openStatus;
				that.issueNo = drawInfo.drawNo;
				that.stopTime = drawInfo.leftMillSeconds;
				that.time =drawInfo.leftTimeDesc;
				that.upOpenStatus();
				//_this.updateCredit();
			})	
			getApp().startWS();
			//this.startWs();
			
		},
	
		created() {
					
		},
		onUnload() {
			getApp().closeWs();
			//this.ws.close();
			uni.$off("drawOpenStatus");
			uni.$off("updateCredit");
			uni.$off("changeTabName");
			uni.$off("scan-listener");
		},
		onReady() {
			 uni.$on("scan-listener",(data)=>{
				 var isValid = true;
				 this.scanResult=data.result;					 
				 //判断扫码内容的合法性
				 if(this.scanResult.indexOf("http://")>-1 || this.scanResult.indexOf("https://")>-1){
					isValid = false;
				 }			 
				 if(isValid){
					 const params = encodeURIComponent(JSON.stringify({
						 batchNo:this.scanResult
					 }))
					 uni.navigateTo({
					 	url:"/pages/index/draw/index?params="+params
					 })
				 }else{
					 showToastTip(this.$t('scanResult')+this.scanResult);
				 }                                                                                        
				 				
			 })		 
		},
		methods: {
			getXiaoShouDian(){
				var reqUrl = this.panUrl + "vip/app/vipInfo/getVipBasicSetting"
				getRespDataWithUrl(reqUrl,'get',{},(res)=>{
					if(res.code==0){
						uni.setStorageSync("saleName",res.data.basicSetting.saleName);
					}else{
						uni.setStorageSync("saleName","");
					}
				});
			},
			// startWs(){
			// 	const wsUrl = uni.getStorageSync("wsUrl");
			// 	const token = uni.getStorageSync("token");
			// 	if(token && wsUrl){
			// 		var url = wsUrl+"?token="+token;
			// 		this.ws=  new WebSocket(url);//
			// 		let stompClient=Stomp.over(this.ws)
			// 		console.log('stompClient---',stompClient)					        
			// 		stompClient.connect({}, (success) => {                
			// 		    console.log("stompClient -websocket 连接成功1", success);
			// 		    stompClient.subscribe('/topic/drawOpenStatus', (res)=>{
			// 				//console.log('订阅-2--',res);	
			// 				uni.$emit("drawOpenStatus",res.body);														
			// 			});
			// 			stompClient.subscribe('/user/queue/logout', function(e){
			// 				console.log("收到下线消息啦.......");
			// 				console.log(e);
			// 				if (e.body=="强制下线"){
			// 					uni.setStorageSync("token","");
			// 					uni.setStorageSync('wsUrl',"");
			// 					uni.setStorageSync('lotteryName',"");
			// 					uni.setStorageSync('panUrl',"");
			// 					uni.setStorageSync("offline",1);
			// 					that.closeWs();
			// 					const err={
			// 						code:1,
			// 						msg:that.$t("login.offlineTip"), //'已在其他终端登录，如非本人操作，请重新登录',
			// 						title:that.$t("login.offlineTitle") // '下线提示'
			// 					}
			// 					uni.redirectTo({
			// 						url:"/pages/multi_login?qs="+encodeURIComponent(JSON.stringify(err))
			// 					})							
			// 				}							
			// 			});	
			// 		}, (error) => {
			// 		    console.log("websocket 连接失败3",error);				       
			// 		});
			// 	}				
			// },

			showDrawer(e) {
				this.$refs[e].open();
			},
			closeDrawer(e) {
				this.$refs[e].close();
			},
			changeDrawer(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},
			updateCredit(){
				const _this = this;
				var reqUrl = this.panUrl+"vip/admin/getCredits";
				getRespDataWithUrl(reqUrl,"post",{},(res)=>{
					if(res.code==0){
						_this.money = res.data.usedCredit;
						uni.setStorageSync("leftCredit",res.data);
					}
				})
			},	
			checkNewVersion(){
				var lang = uni.getStorageSync("lang");
				if(lang==null || lang=="" || lang==undefined){
					uni.setStorageSync("lang","zh-CN");
				}
				//请求服务器当前版本，如果高于本版本就更新
				var version = plus.runtime.version.split("\.").join("")*1;	// 应用版本名称		
				console.log("versionName =" + version);
				const baseUrl = getBaseUrl();
				const open_api_url = getOpenApiUrl();
				plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
					var ver = wgtinfo.versionCode;	// 应用版本号	
					var verName = wgtinfo.version; //应用版本
					this.versionNo=verName+" ("+ver+")";
					var reqUrl = open_api_url+"/soft/getNewest";
					getRespDataWithUrl(reqUrl,'POST',{//com.fc3d
						pakname:'com.caixian'
					},(res)=>{
						if(res.code==0){
							var newVer = res.data.versions;						
							if(newVer>ver){
								this.appUpgrade.upgrade = true;
								this.appUpgrade.remoteVer = newVer+'';
								this.appUpgrade.url=res.data.targetUrl;
								this.appUpgrade.is_force=res.data.forceUpgradeFlag==1;
								this.appUpgrade.describe = res.data.newContent;
							}else{
								
							}
						}
					})
				})
			},
			upOpenStatus(){
				switch(this.openStatus){
					case 0:
						this.openStatusDesc=this.$t('drawClose'); //'已封盘';								
						break;
					case 3:
						this.openStatusDesc=this.$t('drawOpening'); //'正在开盘中';
						this.showLeftDays();	
						break;
					case 2:
						this.openStatusDesc=this.$t('drawUnopen'); //'未开盘';
						break;
					default:
						this.openStatusDesc='';
						
						//this.showLeftDays();
						break;
																
				}
			},
			//获取最新一期未开奖的信息
			getUnopenPrizeInfo(){
				const _this = this;
				var reqUrl = this.panUrl+"vip/code/unOpenPrize";
				getRespDataWithUrl(reqUrl,"get",{},function(res){
					if(res.code==0){
						if(res.data.draw!=null){
							_this.issueNo = res.data.draw.drawId;
							_this.stopTime = res.data.leftMillSeconds;
							var openStatus = res.data.draw.openStatus;
							_this.openStatus = openStatus;
							_this.upOpenStatus();//更新开关盘状态		
						}
					}else{
						uni.showToast({
							title:res.msg
						})
					}
				})
			},
			//获取系统状态栏高度
			getSystemStatusBarHeight(){
				
				// #ifdef APP-PLUS
				var height = plus.navigator.getStatusbarHeight();
				this.barHeight = height;
				// #endif
				
				// #ifdef H5
				this.barHeight = 0;
				// #endif
				
				console.log("barHeight:",this.barHeight);
				
				this.topHeaderHeight = this.barHeight*2+270; //单位 rpx
				uni.setStorageSync("topbarHeight",this.topHeaderHeight); //topbar的高度，单位px
				
				
				
			},
			//右侧弹窗
			toggle() {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open('right')
			},
			//更多
			more(){
				if(this.popup == 'none'){
					this.popup = 'block';
				}else{
					this.popup = 'none';
				}
			},
			//特别提醒
			remind(){
				this.popup = 'none';
				uni.navigateTo({
					url:'/pages/index/more/remind'
				})
			},
			//开奖号码
			lotteryNumber(){
				this.popup = 'none';
				uni.navigateTo({
					url:'/pages/index/more/lotteryNumber'
				})
			},
			//规则说明
			rule(){
				this.popup = 'none';
				uni.navigateTo({
					url:'/pages/index/more/rule'
				})
			},
			//全截说明
			quanjie(){
				this.popup = 'none';
				uni.navigateTo({
					url:'/pages/index/more/quanjie'
				})
			},
			//修改密码
			updPassword(){
				this.popup = 'none';
				uni.navigateTo({
					url:'/pages/index/more/updPassword'
				})
			},
			//蓝牙设置
			bluetooth(){
				this.popup = 'none';
				uni.navigateTo({
					url:'/pages/bluetooth/index'
					// url:'/pages/index/more/bluetooth'
				})
			},
			//语言设置
			setLanguage(){
				this.popup = 'none';
				uni.navigateTo({
					url:'/pages/index/setup'
				})
			},
			//版本号
			version(){
				this.popup = 'none';
				this.$refs.versionPopup.open('center')
			},
			//退出系统
			signOut(){
				this.popup = 'none';
				this.$refs.systemPopup.open('center')
			},
			scan(){				
				uni.navigateTo({
					url: '/pages/index/plusScan/index?text=' + this.textscan + '&type=' + this.typescan,
				});
			},
			//取消退出系统
			quxiao(){
				this.$refs.systemPopup.close()
			},
			//确定退出系统
			queding(){
				uni.setStorageSync("token","");
				uni.setStorageSync("offline",-1);
				uni.setStorageSync("uname","");
				uni.setStorageSync("leftCredit",0);
				uni.setStorageSync('wsUrl',"");
				uni.setStorageSync('lotteryName',"");
				uni.setStorageSync('panUrl',"");
				//getApp().closeWs();
				//this.closeWs(); //关闭ws
				uni.redirectTo({
					url:'/pages/multi_login_v2'
				})
			},
			//切换目录
			TarData(item){
					//设置id，来显示选中那个标签，显示下划线
					uni.removeStorageSync("billDrawNo");
					uni.removeStorageSync("billDrawId");
					this.tabIndex = item.id;
					//显示标签对应的组件内容
					this.currentTabComponent = item.id			
			},
			showLeftDays(){			
				//获取从1970年1月1日到现在的时间的毫秒数
				if(this.stopTime>0){
					var nowTime = +new Date();
					//获取输入时间的毫秒数
					var putTime = +new Date(this.stopTime); 
					//剩余时间总的毫秒数 除以 1000 变为总秒数
					var dec =(putTime-nowTime)/ 1000;
						//得到天 格式化成前缀加零的样式
					var d =  parseInt(dec/60/60/24);
					if(d<0){
						d = 0;
					}
					d = d<10 ? '0'+ d : d;
					
					//得到小时 格式化成前缀加零的样式
					var h = parseInt(dec/60/60%24);
					if(h<0){
						h = 0;
					}
					h = h<10 ? '0'+ h : h;     
					
					//得到分钟 格式化成前缀加零的样式
					var m= parseInt(dec/60%60);
					if(m<0){
						m = 0;
					}
					m = m<10 ? '0'+ m: m;
							
					//得到秒 格式化成前缀加零的样式
					var s= parseInt(dec%60);
					if(s<0){
						s = 0;
					}
					s = s<10 ? '0'+ s : s;		
					this.time = d+this.$t('day')+h+this.$t('hour')+m+this.$t('minute')+s+this.$t('second');								
				}
				
			},
			
		
		}
	}
</script>

<style lang="less" scoped>
	::v-deep .uni-tab-item{
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	
	.globalTopHeader{
		position: fixed;
		top:0;
		width:100%;
		z-index: 9;
		background-color: white;
		//background-color: aquamarine;
	}
	.anniu{
		width: 50%;
		height: 40px;
		line-height: 40px;
		// border-radius: 10rpx;
		text-align: center;
		// margin-left: 15px;
		// background-color: #ebeb75;
	}
	.anniu:active{
		background-color: #ebeb75 !important;
	}
	.imgIcon{
		max-width: 230rpx;
		height: 220rpx;
		border-radius: 20rpx;
	}
	.popup{
		position: fixed;
		width: 100%;
		z-index: 100000;
		top:100rpx;
	}
	.tips{
		padding: 5px 0;
		font-size: 14px;
		text-align: center;
		height: 40rpx;
	}
	
	.tips-tai{
		padding: 5px 0;
		font-size: 14px;
		text-align: center;
		display: flex;
		flex-direction: column;
		height: 80rpx;
	}
	// .content{
	// 	display: flex;
	// 	justify-content: space-between;
	// 	height: 50px;
	// 	line-height: 50px;
	// 	background-color: #8A2BCF;
	// 	color: #E1EEA0;
	// }
	.kuaida{
		background-color: #54206B;
	}
	.caozuo{
		width: 25%;
		text-align: center;
	}
	  .container{
		  padding: 0px;
		  margin: 0px;
	  }
	  .popup-content{
		  width: 110px;
		  // background-color: #C61A28;
	  }
	  .gengduo{
		  padding: 15rpx;
		  color: white;
		  font-size: 16px;
		  font-weight: 700;
		  background-color: #C22E2E;
	  }
	  .toptitle{
		  display: flex;
		  justify-content: space-between;
		  font-size: 16px;
		  font-weight: 700;
		  color: #702293;
		  height: 80rpx;
		  line-height: 80rpx;
		  text-align: center;
	  }
	  .title{
		  width: 85%;
		  background-color: #8150CA;
		  color:#fff
	  }
	  .more{
		  width: 15%;
		  background-color: #C22E2E;
	  }
	  .more:active{
		  background-color: #ebeb75 !important;
	  }
	  .gengduo:active{
		  background-color: #ebeb75 !important;
	  }
	  .dianji:active{
		  background-color: #ebeb75 !important;
	  }
	  .jump{
		  height: 100%;
		  width: 100%;
		  border: none;
	  }
</style>

