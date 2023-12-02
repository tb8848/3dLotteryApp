<template>
	<view class="versionUpgrade" v-if="show">
		<view class="versionUpgradeView">
			<view class="versionUpgradeViewV1">
				<image class="img" src="./icon/upgrade.png" mode="aspectFill"></image>
				<text class="v-text">{{title}}</text>
			</view>
			<view class="versionUpgradeViewV2">
				<text class="content-text">{{describe}}</text>
				<view class="versionUpgradeViewIs_force0" v-if="is_force==false&&start==false&&lang=='zh-CN'">
					<text class="text butClose" @click="close">{{nextTime}}</text>
					<text class="text download" @click="downUpdate()">{{upgradeNow}}</text>
				</view>
				
				<view class="versionUpgradeViewIs_force1" v-if="is_force==false&&start==false&&lang=='tai'">
					<text class="text butClose" @click="close">{{nextTime}}</text>
					<text class="text download" @click="downUpdate()">{{upgradeNow}}</text>
				</view>
				
				<view class="versionUpgradeViewIs_force0" v-if="is_force==true&&start==false">
					<text class="downloadIs_force1" @click="downUpdate()">{{upgradeNow}}</text>
				</view>
				<view class="versionUpgradeViewStartTrue" v-if="start!=false">
					<text class="title">{{downPercent}}</text>
					<progress :percent="startP" activeColor="#FF5722" show-info="true" stroke-width="6" ></progress>
				</view>
				<view class="versionUpgradeViewStartTrue" v-if="start!=false">
					<text class="btn-text downloadStartTrue" v-if="startP>=100" @click="install()">{{installNow}}</text>
					<text class="btn-text downloadStartFalse" v-else>{{installNow}}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	
	let platform
	setTimeout(() => {
		platform = uni.getSystemInfoSync().platform
	}, 16)
	
	// import {
	// 	initVueI18n
	// } from '@dcloudio/uni-i18n'
	// import messages from './i18n/index.js'
	// const {
	// 	t
	// } = initVueI18n(messages)
	
	export default {
		name: 'luo-version-upgrade',
		props: {
			version: {
				type: String,
				default () {
					return '1.0.0';
				}
			},
			versionType: {
				type: String,
				default () {
					return 'android';
				}
			},
			url: {
				type: String,
				default () {
					return '';
				}
			},
			describe:{
				type: String,
				default () {
					return '有新版本出现~为了给您带来更好的体验，我们建议您现在进行升级！';
				}
			},
			is_force:{
				type: Boolean,
				default () {
					return false;
				}
			}
		},
		data() {
			return {
				show:false,
				start:false,
				startP:0,
				installPath:'',
				lang:'zh',
				title:this.$t("upgrade.title"),
				nextTime:this.$t("upgrade.nextTime"),
				upgradeNow:this.$t("upgrade.upgradeNow"),
				installNow:this.$t("upgrade.installNow"),
				downPercent:this.$t("upgrade.percent")	
				
			};
			
		},
		mounted() {
			const that = this;
			this.lang = uni.getStorageSync("lang");
			console.log("===========lang==",this.lang);
			uni.$on('langChange',function(data){
				console.log("===========lang==",data.lang);
				that.lang = data.lang
				that.textTrans();
			})
			this.textTrans();
		},
		watch:{
			'version': {
				handler (newVal) { 
				    if(newVal!='1.0.0'){
						this.getVerison();
					}
				},
				deep: true,
				immediate: true,
			}
		},
		computed:{
			versionTypes(){ 
				return this.getPlatform(); //版本获取
			}
		},
		methods:{
			textTrans(){
				this.title=this.$t("upgrade.title");
				this.nextTime=this.$t("upgrade.nextTime")
				this.upgradeNow=this.$t("upgrade.upgradeNow")
				this.installNow=this.$t("upgrade.installNow")
				this.downPercent=this.$t("upgrade.percent")				
			},
			/* 版本比较是否需要更新 */
			getVerison:function(){
				if(this.version=='1.0.0'||this.url==''){return;}
				
				var iosTip = this.$t("upgrade.iostip");
				var alertTitle = this.$t("alertTitle");
				//ios端判断
				if(this.versionType=='ios'||this.versionTypes=='ios'){
					plus.nativeUI.alert(iosTip,alertTitle);
					return;
				}
				if(this.versionType=='android'&&this.versionTypes=='android'){this.update();}
			},
			// 升级检测
			update:function() {
				let self = this;
				/* 5+环境锁定屏幕方向 */
				plus.screen.lockOrientation('portrait-primary'); //锁定
				//客户端信息
				plus.runtime.getProperty(plus.runtime.appid,function(res){
					let isupdate = self.isUpdate(res.version, self.version);
					if (isupdate) {self.versionShow();return;}
				})
			},
			/**
			 * 比较版本大小，如果新版本nv大于旧版本ov则返回true，否则返回false
			 * @param {String} ov
			 * @param {String} nv
			 * @return {Boolean}
			 */
			isUpdate:function(ov, nv) {
				if (!ov || !nv || ov == "" || nv == "") {return false;}
				var b = false,
					ova = ov.replace("V", "").replace("v", "").replace(" ", '').split(".", 4),
					nva = nv.replace("V", "").replace("v", "").replace(" ", '').split(".", 4);
				for (var i = 0; i < ova.length && i < nva.length; i++) {
					var so = ova[i],
						no = parseInt(so),
						sn = nva[i],
						nn = parseInt(sn);
					if (nn > no || sn.length > so.length) {
						return true;
					} else if (nn < no) {
						return false;
					}
				}
				if (nva.length > ova.length && 0 == nv.indexOf(ov)) {
					return true;
				} else {return false;}
			},
			/* 获取版本类别 android/ios */
			getPlatform:function(){
				return uni.getSystemInfoSync().platform.toLowerCase();
			},
			/* 开启升级 */
			versionShow:function(){
				this.show = true;
				uni.hideTabBar();
			},
			/* 取消升级 */
			close:function(){ 
				this.show = false;
				uni.showTabBar();
				//uni.$emit("doUpgrade",{up:false})
			},
			downUpdate:function() {
				//uni.$emit("doUpgrade",{up:true})
				//平台判断
				var iosTip = this.$t('upgrade.iostip');
				var alertTitle = this.$t('alertTitle');
				if (this.versionTypes=='ios') {
					plus.nativeUI.alert(iosTip,alertTitle);
					this.close();
					return; 
				}
				//检测是否下载过更新
				let self = this;
				self.installPath = uni.getStorageSync('update_path');
				plus.io.resolveLocalFileSystemURL(
					self.installPath,
					function(entry) {self.install();return;},
					function(err) {
						const dtask = plus.downloader.createDownload(self.url,{filename: '_downloads/'});
						dtask.addEventListener("statechanged", onStateChanged, false);
						dtask.start();
						self.start=true;						
					}
				);
				//下载状态
				function onStateChanged(download, status){
					let totalSize = download.totalSize;
					let useSize = download.downloadedSize;
					if(totalSize>0 && useSize>0){
						self.startP = (useSize/totalSize*100).toFixed(0);
					}
					// 下载完成 
					if(download.state == 4 && status == 200){
						self.installPath = download.filename;
						uni.setStorageSync('update_path', self.installPath);
						//需要用户点击立即安装才能安装去掉注释掉self.install();
						//self.install();
					}  
				}
			},
			//安装提示
			install:function() {
				this.close();
				var installing = this.$t('upgrade.installing');
				var alertTitle = this.$t('alertTitle');
				plus.nativeUI.showWaiting(installing);
				plus.runtime.install(this.installPath,{},(res)=>{
					plus.nativeUI.closeWaiting();
					plus.runtime.restart();
					uni.removeStorageSync("update_path");
				},(err)=>{
					plus.nativeUI.closeWaiting();
					plus.nativeUI.alert('error '+err.code,'',alertTitle);
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.versionUpgrade{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999999;
		background: rgba(0, 0, 0, 0.3);
		.versionUpgradeView{
			z-index: 9999999;
			margin: 500rpx 60rpx 0 60rpx;
			min-height: 200rpx;
			max-height: 800rpx;
			background: #FFFFFF;
			border-radius: 30rpx;
			display: flex;
			flex-direction: column !important;
			//padding: 30rpx;
			overflow: hidden;
			.versionUpgradeViewV1{
				display: flex;
				flex-direction: row !important;
				justify-content: center;
				align-items: center;
				// background: #FF5722;
				background:#8150CA;
				padding: 10rpx 0;
				color: #FFFFFF;
				.img{
					width: 60rpx;
					height: 60rpx;
				}
				.v-text{font-size: 16px;margin-left: 10rpx;}
			}
			.versionUpgradeViewV2{
				display: flex;
				flex-direction: column !important;
				padding: 30upx; 
				.content-text{
					font-size: 14px;
					color: #626262;
				}
				.versionUpgradeViewIs_force0{
					display: flex;
					flex-direction: row !important;
					justify-content: space-between;
					padding: 30rpx 0 0 0;
					.text{
						padding: 10rpx 70rpx;
						border-radius: 30rpx;
						font-size: 16px;
						color: #FFFFFF;
					}
					.butClose{
						background: #d2d2d2;
					}
					.download{
						// background: #FF5722;
						background:#8150CA
					}
					.downloadIs_force1{
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 10rpx 0;
						border-radius: 30rpx;
						font-size: 16px; 
						color: #FFFFFF;
						// background: #FF5722;
						background:#8150CA;
					}
				}
				
				
				.versionUpgradeViewIs_force1{
					display: flex;
					flex-direction: row !important;
					justify-content: space-between;
					padding: 30rpx 0 0 0;
					.text{
						padding: 10rpx 50rpx;
						border-radius: 30rpx;
						font-size: 16px;
						color: #FFFFFF;
					}
					.butClose{
						background: #e2e2e2;
					}
					.download{
						// background: #FF5722;
						background:#8150CA;
					}
					.downloadIs_force1{
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 10rpx 0;
						border-radius: 30rpx;
						font-size: 16px; 
						color: #FFFFFF;
						// background: #FF5722;
						background:#8150CA;
					}
					
				}
				
				.versionUpgradeViewStartTrue{
					display: flex;
					flex-direction: column !important;
					padding: 30rpx 0 0 0;
					.title{
						font-size: 14px;
						color: #626262;
						padding: 10rpx 0;
					}
					.btn-text{
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 10rpx 0;
						border-radius: 30rpx;
						font-size: 16px; 
						color: #FFFFFF;
					}
					.downloadStartTrue{
						// background: #FF5722;
						background:#8150CA;
					}
					.downloadStartFalse{background: #e2e2e2;}
				}
			}
		}
	}
</style>
