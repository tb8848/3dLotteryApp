<template>
	<view>	
		<view style="z-index:111111;position:fixed;width:100%;height: 90px;top:0px">
			<view style="height:25px;background-color:#8A2BE2;width: 100%;">&nbsp;</view>
			<view style="font-size: 20px;height: 65px;background-color:#555;color: #fff;align-items: center;padding:0px 5px;display: flex;"><text>设置密码</text></view>
		</view>
		<view style="height: calc(100%-90px);margin-top:90px;width: 100%;">
			<view style="padding: 15px;">
				<view class="form-item" v-show="enter.oldcheck">
					<view class="input-item-title">进入原密码:</view>
					<view><input class="input-item" v-model="enter.oldpwd" type="password"/></view>
				</view>
				<view class="form-item">
					<view class="input-item-title">进入新密码:</view>
					<view><input  class="input-item" v-model="enter.newpwd" type="password"/></view>
				</view>
				<view class="form-item">
					<view class="input-item-title">确认新密码:</view>
					<view><input class="input-item" v-model="enter.newpwd1" type="password"/></view>
				</view>
				<view class="form-item" style="margin-top: 30px;">
					<view class="btnConfirm linerBtn" style="width: 100%;"><text style="color: white;font-size: 32rpx;" @click="setOk">确定</text></view>
					<view class="btnCancel cancelLiner" style="width: 100%;"><text style="color: white;font-size: 32rpx;" @click="cancel()">取消</text></view>
					
				</view>			
			</view>		
			
			
			<view style="padding: 15px;">
				<view class="form-item" v-show="destroy.oldcheck">
					<view class="input-item-title">销毁原密码:</view>
					<view><input class="input-item" v-model="destroy.oldpwd" type="password"/></view>
				</view>
				<view class="form-item">
					<view class="input-item-title">销毁新密码:</view>
					<view><input class="input-item" v-model="destroy.newpwd" type="password"/></view>
				</view>
				<view class="form-item">
					<view class="input-item-title">确认销毁新密码:</view>
					<view style="width: 60%;"><input class="input-item" v-model="destroy.newpwd1" type="password"/></view>
				</view>
				<view class="form-item" style="margin-top: 30px;">
					<view class="btnConfirm linerBtn" style="width: 100%;"><text style="color: white;font-size: 32rpx;" @click="destroyOk">确定</text></view>
					<view class="btnCancel cancelLiner" style="width: 100%;"><text style="color: white;font-size: 32rpx;" @click="cancel()">取消</text></view>				
				</view>			
			</view>		
		</view>
				
	</view>
</template>

<script>
	import { getRespDataWithUrl, showToastTip,getBaseUrl,getWsUrl,getOpenApiUrl} from "@/api/req.js";
	
	import { guid,parseUrl} from "@/api/tools.js";
	export default {
		data() {
			return {
				enter:{
					oldpwd:'',
					newpwd:'',
					newpwd1:'',
					oldcheck:false
				},
				destroy:{
					newpwd:'',
					newpwd1:'',
					oldpwd:'',
					oldcheck:false
				}				
			}
		},
		onLoad(option){
			const that = this;
			//const qs = JSON.parse(decodeURIComponent(option.qs));		
			const lockPwd = uni.getStorageSync("lockPwd");
			if(lockPwd){
				this.enter.oldcheck=true;
			}	
			const destroyPwd = uni.getStorageSync("destroyPwd");
			if(destroyPwd){
				this.destroy.oldcheck=true;
			}	
		},
		methods: {
			setOk(){
				if(this.enter.oldcheck){
					if(this.enter.oldpwd==""){
						showToastTip("请输入进入原密码"); //"请输入登录账号"
						return;
					}
					const lockPwd = uni.getStorageSync("lockPwd");
					if(this.enter.oldpwd!=lockPwd){
						showToastTip("进入原密码错误");
						return;
					}					
				}
				if(this.enter.newpwd==""){
					showToastTip("请输入进入新密码"); 
					return;
				}
				if(this.enter.newpwd.length<6){
					showToastTip("进入新密码长度不能小于6位"); 
					return;
				}
				if(this.enter.newpwd1==""){
					showToastTip("请再次输入进入新密码"); 
					return;
				}
				if(this.enter.newpwd!=this.enter.newpwd1){
					showToastTip("两次输入的进入新密码不一样"); 
					return;
				}
				const destroyPwd = uni.getStorageSync("destroyPwd");
				if(destroyPwd){
					if(this.enter.newpwd == destroyPwd){
						showToastTip("进入密码不能与销毁密码相同哦");
						return;
					}
				}
				uni.setStorageSync("lockPwd",this.enter.newpwd);
				showToastTip("设置进入密码成功，请记住哦"); 
				this.cancel();
			
			},
			
			cancel(){
				uni.navigateBack();
			},
			destroyOk(){
				if(this.destroy.oldcheck){
					if(this.destroy.oldpwd==""){
						showToastTip("请输入销毁原密码"); //"请输入登录账号"
						return;
					}
					const destroyPwd = uni.getStorageSync("destroyPwd");
					if(this.destroy.oldpwd!=destroyPwd){
						showToastTip("销毁原密码错误");
						return;
					}					
				}
				if(this.destroy.newpwd==""){
					showToastTip("请输入销毁新密码"); 
					return;
				}
				if(this.destroy.newpwd.length<6){
					showToastTip("销毁新密码长度不能小于6位"); 
					return;
				}
				if(this.destroy.newpwd1==""){
					showToastTip("请再次输入销毁新密码"); 
					return;
				}
				if(this.destroy.newpwd!=this.destroy.newpwd1){
					showToastTip("两次输入的销毁新密码不一样"); 
					return;
				}
				const lockPwd = uni.getStorageSync("lockPwd");
				if(lockPwd){
					if(this.destroy.newpwd == lockPwd){
						showToastTip("销毁密码不能与进入密码相同哦");
						return;
					}
				}
				uni.setStorageSync("destroyPwd",this.destroy.newpwd);
				showToastTip("设置销毁密码成功，请记住哦"); 
				this.cancel();
		
			},
		
		
		}
	}
</script>

<style scoped>

	.form-item{
		margin-top: 30rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}
	.input-item-title{
		padding: 10rpx 0rpx;
		font-size: 16px;
	}
	.input-item{
		background-color:#aaaa;
		height: 60rpx;
		line-height: 60rpx;
		padding-left: 10rpx;
		border-radius: 10rpx;
		margin-left:10rpx
	}
	
	.btnConfirm{
		height: 80rpx;
		border-radius: 10rpx;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
		font-weight: bold;
	}
	
	.btnCancel{
		height: 80rpx;
		border-radius: 10rpx;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
		font-weight: bold;
	}
	
	
	
	.btnConfirm:active,.btnCancel:active{
		background-color: #ebeb75 !important;
	}
	
</style>
