<template>
	<view style="background: #8150CA;min-height: 100%;width: 100%;background-size: 100%;padding-top:25px">
		<view style="background-color: #fff;">
			<view style="padding-top: 50px;display: flex;justify-content: center;align-items: center;">
				<view class="logo">
					<image src="../static/3D.png" class="image"></image>
				</view>
			</view>
			<view class="title"><!-- 幸运3+3 --></view>
			<view style="margin-top: 30px;">
				<view class="input-wrapper">
					<view style="width: 50px;text-align: center;"><uni-icons type="staff-filled" size="20" color="white"></uni-icons></view>
					<view style="width: 70%;">
						<input placeholder="请输入密码" v-model="lockPwd" placeholder-style="color:#fff" style="color: #fff;font-size: 16px;" type="password"/>
					</view>
				</view>
				<view style="margin: 30px auto;display: flex;justify-content: center;align-items: center;width: 90%;">
					<view class="btn linerBtn"><text  @click="toSet">设置密码</text></view>
					<view class="btn linerBtn"><text  @click="clear">清空</text></view>
					<view class="btn linerBtn"><text  @click="toLogin">登录</text></view>
				</view>	
			</view>
		</view>
		
		<luo-version-upgrade v-if="appUpgrade.upgrade"
			:version="appUpgrade.remoteVer" :url="appUpgrade.url" 
			:describe="appUpgrade.describe" :is_force="appUpgrade.is_force">
		</luo-version-upgrade>
		
	</view>
</template>


<script>
	
	import versionUpgrade from "@/components/luo-version-upgrade/luo-version-upgrade.vue";
	
	import { getRespDataWithUrl, showToastTip,getWsUrl,getOpenApiUrl} from "@/api/req.js";
	
	import { guid,parseUrl} from "@/api/tools.js";
	
	export default {
			
		data() {
			return {
				appName:'',
				lockPwd:'',
				appUpgrade:{
					upgrade:false,
					url:'',
					localVer:'',
					remoteVer:'',
					describe:'',
					is_force:false
				},
			}
		},
		onLoad() {
			var lockPwd = uni.getStorageSync("lockPwd");
			var distoryPwd = uni.getStorageSync("distoryPwd");
			this.lockPwd = lockPwd;	
			this.checkNewVersion();
		},
		methods: {
			checkNewVersion(){
				var lang = uni.getStorageSync("lang");
				if(lang==null || lang=="" || lang==undefined){
					uni.setStorageSync("lang","zh-CN");
				}
				//请求服务器当前版本，如果高于本版本就更新
				var version = plus.runtime.version.split("\.").join("")*1;	// 应用版本名称		
				console.log("versionName =" + version);			
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
								showToastTip("已经是最新版本")
							}
						}
					})
				})
			},
			toSet(){
				uni.navigateTo({
					url:"/pages/start/setPwd"
				})
			},
			clear(){
				this.lockPwd = "";
			},
			toDestroy(){
				uni.setStorageSync("accountList","");
				uni.navigateTo({
					url:"/pages/multi_login_v2"
				})
			},
			doLogin(){
				const rightPwd = uni.getStorageSync("lockPwd");
				if(rightPwd){
					if(this.lockPwd == rightPwd){
						uni.navigateTo({
							url:"/pages/multi_login_v2"
						})
					}else{
						showToastTip("密码错误");
						return;
					}
				}else{
					showToastTip("请先设置密码");
					return;
				}
				
			},
			toLogin(){
				if(this.lockPwd){
					const distoryPwd = uni.getStorageSync("distoryPwd");				
					if(distoryPwd){
						if(this.lockPwd == distoryPwd){
							this.toDestroy();
						}else{
							this.doLogin()
						}
					}else{
						this.doLogin()
					}
				}else{
					showToastTip("请输入密码");
					return;
				}
			}
		}
	}
</script>

<style scoped>
	.input-wrapper{
		background-color: #C43C35;
		width: 80%;
		height: 50px;
		margin: 0 auto;
		border-radius: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		line-height: 50px;
	}
	
	.btn{
		width: 120px;
		height: 40px;
		line-height: 40px;
		border-radius: 5px;
		margin-right: 15px;
		text-align: center;
		font-weight: bold;
		font-size: 18px;
	}
	
	
	uni-page-body {
	  height: 100%;
	}
	.logo{
		width: 100px;
		height: 100px;
		border-radius: 10px;
		overflow: visible;
		opacity: 1;
		transition: opacity 0.5s ease-in-out 0s;
		background-color: transparent;
		position: relative;
	}
	.image{
		width: 100%;
		height: 100%;
		border-radius: 0px;
		will-change: transform;
		display: inline-block;
		overflow: hidden;
		position: relative;
		border-radius: 5px;
	}
	.title{
		display: flex;justify-content: center;align-items: center;font-size: 26px;color: white;margin-top: 6px;
	}
	.tips{
		height: auto;
		background: transparent;
		margin-bottom: 0px;
		margin-top: 0px;
		padding-top: 50px;
		width: 100%;
		position: relative;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		flex-direction: row;
		font-size: 12px;
		color: white;
	}
	.pwd{
		width: 18px;
		height: 18px;
		border-radius: 0px;
		overflow: visible;
		opacity: 1;
		transition: opacity 0.5s ease-in-out 0s;
		background-color: transparent;
		position: relative;
		margin-right: 2px;
	}
</style>

