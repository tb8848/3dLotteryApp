<template>
	<view class="content" v-if="!isLogin">
		<view class="mainbody">
			<view style="margin-bottom: 15px;display: flex;justify-content: end;" @click="setLanguage()">{{$t('index.language-settings')}}</view>
			<view style="text-align: center;">
				<image src="../static/3D.png" style="width:120rpx;height: 120rpx;border-radius: 20rpx;" draggable="false"></image>
			</view>
			<view class="loginwin"></view>
			<view class="form-item">
				<view class="input-item-title">{{$t('index.account-number')}}</view>
				<input focus :placeholder="$t('login.noAccountInput')" class="input-item" v-model="uname"/>
			</view>
			<view class="form-item">
				<view class="input-item-title">{{$t('login.password')}}</view>
				<input :placeholder="$t('login.noPwdInput')" password="true" class="input-item" v-model="upwd"/>
			</view>
			<view class="form-item" @click="doLogin()">
				<view class="login-btn">
				<text style="color: white;font-size: 32rpx;">{{$t('login.sign-in')}}</text></view>
			</view>
			<!-- <view><input class="uni-input" placeholder="请输入账号" /></view>
			<view><input type="safe-password" placeholder="请输入密码"></view>
			<view><button></button> type="safe-password" placeholder="请输入密码"></view> -->
		</view>
	</view>

</template>

<script>
	
	import { getResponseData, showToastTip,getBaseUrl,getWsUrl} from "@/api/req.js";
	
	export default {
		data() {
			return {
				"loginButtonText":this.$t('login.sign-in'),
				"uname":'',
				"upwd":'',
				"isLogin":true
			}
		},
		onLoad(options){
			const that = this;
			var err = decodeURIComponent(options.qs);
			if(null!=err && undefined!=err && "null"!=err && "undefined"!=err){
				err = JSON.parse(err);
				if(err.code==2){
					uni.showModal({
						showCancel:false,
						confirmText:that.$t("bluetooth.confirm"),
						title:that.$t("login.offlineTitle"),
						content:that.$t("login.relogin") //err.msg
					})
				}else{
					uni.showModal({
						showCancel:false,
						title:err.title,
						content:err.msg,
						confirmText:that.$t("bluetooth.confirm")
					})
				}
				
			}
			//获取界面信息
			uni.getSystemInfo({
				success(res) {
					//获取屏幕高度
					const windowHeight = res.windowHeight*2+'rpx';
					const windowWidth = res.windowWidth*2+'rpx';
					const statusBarHeight = res.statusBarHeight*2+'rpx';
					const bottomSaveArea = res.safeAreaInsets.bottom;
					uni.setStorageSync("winH",res.windowHeight*2)
					uni.setStorageSync("winW",res.windowWidth*2)
					uni.setStorageSync("statusBarH",res.statusBarHeight*2)
					uni.setStorageSync("osName",res.osName);
					uni.setStorageSync("bottomSaveArea",bottomSaveArea);
					console.log("屏幕高度："+windowHeight+" 屏幕宽度："+windowWidth
					+" 状态栏高度："+statusBarHeight+" osName:"+res.osName+" bottomSaveArea:"+bottomSaveArea);
				}
			})
			const token = uni.getStorageSync("token");
			if(token!=null && token!="" ){
				uni.redirectTo({
					url:"/pages/index/index",
				});				
			}else{
				this.isLogin = false;
			}
		},
		methods: {
			doLogin(){
				const that = this;
				if(this.uname==""){
					showToastTip(this.$t("login.noAccountInput")); //"请输入登录账号"	
					return;
				}
				if(this.upwd==""){
					showToastTip(this.$t("login.noPwdInput"));//请输入登录密码				
					return;
				}
				uni.showLoading({
					title:this.$t("login.isLoging"),  //"登录中...",
					mask:true
				})
				getResponseData("/login",'POST',{
					uname:this.uname,
					pwd:this.upwd
				},function(res){
					console.log("login===="+JSON.stringify(res))
					if(res.code==0){
						//getApp().startWS();
						uni.setStorageSync('token',res.data.token);
						uni.setStorageSync('uid',res.data.uid);
						uni.setStorageSync('uname',res.data.uname);
						uni.setStorageSync('leftCredit',res.data.leftCredit)						
						uni.setStorageSync("offline",0);
						const needUpdatePwd = res.data.needUpdatePwd;
						if(needUpdatePwd==0){
							var params = {
								isFirst:1
							}
							//首次修改密码
							uni.redirectTo({
								url:"/pages/index/more/updPassword?params="+encodeURIComponent(JSON.stringify(params)),
							});
						}else{
							uni.redirectTo({
								url:"/pages/index/index",
							});
						}
						
					}else{
						showToastTip(res.msg)	
						that.upwd = "";						
					}
				})				
			},
			//语言设置
			setLanguage(){
				uni.navigateTo({
					url:'/pages/index/setup'
				})
			},
		}
	}
</script>

<style>
	.content{
		/* background-color: #f7f7f7; */
		padding: 60rpx;
		padding-top:120rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.mainbody{
		border-radius: 20rpx;
		background-color:#f7f7f7;
		padding:60rpx
	}
	
	.form-item{
		margin-top: 30rpx;
	}
	.input-item-title{
		padding: 10rpx 0rpx;
	}
	.input-item{
		background-color:white;
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 10rpx;
		border-radius: 10rpx;
	}
	.login-btn{
		height: 80rpx;
		border-radius: 10rpx;
		text-align: center;
		background-color: red;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.login-btn:active{
		background-color: #ebeb75 !important;
	}
</style>
