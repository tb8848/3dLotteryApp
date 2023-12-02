<template>
	<view>
		<uni-nav-bar dark  :fixed="true" status-bar :title="$t('index.change-password')"
		leftIcon="back" @clickLeft="backTo" v-show="!isFirstUpdate" backgroundColor="#8150CA"/> <!--修改密码 -->
		
		<uni-nav-bar  :fixed="true" status-bar :title="$t('index.change-password')"
		 v-show="isFirstUpdate"/> <!--修改密码 -->
		
		<view style="width: 90%;margin: 0 auto;padding-top: 10px;">
			<input focus :placeholder="$t('updPassword.original-password')" type="password" class="input-item" v-model="oldPassword"/>
		</view>
		<view style="width: 90%;margin: 0 auto;padding-top: 10px;">
			<input focus :placeholder="$t('updPassword.new-password')" type="password" class="input-item" v-model="newPassword"/>
		</view>
		<view style="width: 90%;margin: 0 auto;padding-top: 10px;">
			<input focus :placeholder="$t('updPassword.confirm-new-password')" type="password" class="input-item" v-model="password"/>
		</view>
		<view style="margin-top: 10px;"></view>
		<view class="beizhu">
			<view style="color: red;margin: 0 auto;padding: 5px 0 0 10px;">{{$t('updPassword.system-prohibits-unavailable-passwords')}}：a12345，ab1234，</view>
			<view style="color: red;margin: 0 auto;padding: 0 0 5px 10px;">abc123，a1b2c3，123qwe，aaa111</view>
		</view>
		<view style="display: flex;justify-content: space-around;margin-top: 15px;">
			<view class="quxiao cancelLiner" @click="quxiao()" v-show="!isFirstUpdate" style="color:#000000">{{$t('mingxi.cancel')}}</view>
			<view class="queding linerBtn" @click="queding()" >{{$t('kuaida.determine')}}</view>
		</view>
	</view>
</template>

<script>
	
	import { getResponseData,getRespDataWithUrl } from "@/api/req.js";
	
	export default {
		data() {
			return {
				oldPassword:'',
				newPassword:'',
				password:'',
				isFirstUpdate:false
			}
		},
		onLoad(option){
			const _this = this;
			const params = JSON.parse(decodeURIComponent(option.params));
			//this.data.batchCodesList = params.codes; //号码数据中带有分类ID字段
			const  isFirst = params.isFirst	
			this.isFirstUpdate = isFirst==1?true:false;
		},
		methods: {
			backTo(){
				uni.navigateBack({})
			},
			//取消
			quxiao(){
				uni.navigateTo({
					url:'/pages/index/index'
				})
			},
			//确定
			queding(){
				var that = this;
				if(this.oldPassword==""){
					uni.showToast({
						title:that.$t("pwd.inputOld"), //"请输入原密码",
						duration:3000,
						icon:'error'
					});
					return;
				}
				if(this.newPassword==""){
					uni.showToast({
						title:that.$t("pwd.inputNew"), //"请输入新密码",
						duration:3000,
						icon:'error'
					});
					return;
				}
				if(this.password==""){
					uni.showToast({
						title:that.$t("pwd.inputNewAgain"), //
						duration:3000,
						icon:'error'
					});
					return;
				}
				uni.showLoading({
					title: that.$t("chulizhong") , //'正在处理...',
					mask:true
				});
				var panUrl = uni.getStorageSync("panUrl");
				var reqUrl = panUrl+"vip/changePwd"
				getRespDataWithUrl(reqUrl,"POST",{
						pwd:this.oldPassword,
						newPwd:this.newPassword,
					},function(res){
						if(res.code==0){
							uni.showToast({
								title:that.$t("pwd.modifySuccess") , 
								duration:2000
							})
							getApp().closeWs();
							uni.setStorageSync("token","");
							uni.setStorageSync("token","");
							uni.setStorageSync('wsUrl',"");
							uni.setStorageSync('lotteryName',"");
							uni.setStorageSync('panUrl',"");
							uni.redirectTo({
								url:'/pages/multi_login_v2'
							})
							//uni.navigateBack()
						}else{
							uni.showToast({
								title:data.msg,
								duration:2000
							})
						}
					})
				
			}
		}
	}
</script>

<style lang="less" scoped>
	::v-deep .uni-input-input{
		
	}
	.input-item{
		height: 40px;
		line-height: 40px;
		border-radius: 10rpx;
		border: 1px solid #E6E2E1;
		background-color: #F7F7F7;
		padding-left: 10px;
	}
	.beizhu{
		width: 90%;
		margin: 0 auto;
		border-radius: 10rpx;
		border: 1px solid #E6E2E1;
		background-color: #F7F7F7;
	}
	.quxiao,.queding{
		width: 110px;
		height: 40px;
		line-height: 40px;
		border-radius: 10rpx;
		text-align: center;
		background-color: #8A2BCF;
		color: white;
		font-weight: bold;
	}
	.quxiao:active{
		background-color: #ebeb75 !important;
	}
	.queding:active{
		background-color: #ebeb75 !important;
	}
</style>
