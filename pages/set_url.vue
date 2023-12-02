<template>
	<view>	
		<view style="z-index:111111;position:fixed;width:100%;height: 90px;top:0px">
			<view style="height:25px;background-color:#8A2BE2;width: 100%;">&nbsp;</view>
			<view style="font-size: 20px;height: 65px;background-color:#555;color: #fff;align-items: center;padding:0px 5px;display: flex;"><text>网址和账号信息</text></view>
		</view>
		<view style="height: calc(100%-90px);margin-top:90px;width: 100%;">
			<view style="padding: 15px;">
				<view class="form-item">
					<view class="input-item-title">公司:</view>
					<view><input focus placeholder="请输入公司名称" class="input-item" v-model="company"/></view>
				</view>
				<view class="form-item">
					<view class="input-item-title">网址:</view>
					<view><input focus placeholder="http://" class="input-item" v-model="url"/></view>
				</view>
				<view class="form-item">
					<view class="input-item-title">账号:</view>
					<view><input placeholder="请输入账号" class="input-item" v-model="uname"/></view>
				</view>
				<view class="form-item">
					<view class="input-item-title">密码:</view>
					<view><input placeholder="请输入密码" password="true" class="input-item" v-model="upwd"/></view>
				</view>
				<view class="form-item" style="margin-top: 30px;">
					<view class="cancel-btn cancelLiner" style="width: 100%;"><text style="color: white;font-size: 32rpx;" @click="cancel">取消</text></view>
					<view class="login-btn linerBtn" style="width: 100%;"><text style="color: white;font-size: 32rpx;" @click="clear">清空</text></view>
					<view class="login-btn linerBtn" style="width: 100%;"><text style="color: white;font-size: 32rpx;" @click="addOrUpdate">确定</text></view>
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
				url:"",
				uname:"",
				upwd:"",
				company:"",
				panId:'',
				statusBarHeight:50,
				isClear:false
			}
		},
		onLoad(option){
			const that = this;
			const qs = JSON.parse(decodeURIComponent(option.qs));
			this.panId = qs.uuid;
			this.uname = qs.loginName;
			this.upwd = qs.pwd;
			this.company = qs.company;
			this.url = qs.url;
			//获取界面信息
			uni.getSystemInfo({
				success(res) {
					//获取屏幕高度
					const windowHeight = res.windowHeight*2+'rpx';
					const windowWidth = res.windowWidth*2+'rpx';
					that.statusBarHeight = res.statusBarHeight*2+'rpx';
				}
			})
		},
		methods: {
			addOrUpdate(){
				if(this.panId==""){
					this.addAccount()
				}else{
					if(this.isClear){
						this.delAccount();
					}else{
						this.saveEdit();
					}					
				}
				
			},
			cancel(){
				uni.redirectTo({
					url:"/pages/multi_login_v2"
				})
			},
			delAccount(){
				const that = this;
				var accounts = uni.getStorageSync("accountList");
				var existList = [];
				if(accounts){	
					existList = JSON.parse(accounts);
					for(var i=0,len=existList.length;i<len;i++){
						var item = existList[i];
						if(item.uuid == that.panId){
							existList.splice(i,1);
							break;
						}
					}
					uni.setStorageSync("accountList",JSON.stringify(existList));
					that.cancel();
				}	
			},
			
			clear(){
				this.company = "";
				this.url = "";
				this.upwd="";
				this.uname="";
				this.isClear = true;
			},
			addAccount(){
				const that = this;
				if(this.company!=""){
					if(this.company.length>3){
						showToastTip("公司名称不超过三个汉字"); //"请输入登录账号"
						return;
					}				
				}
				if(this.url=="" || this.url.length<10){
					showToastTip("请认真输入网址"); //"请输入登录账号"	
					return;
				}
				if(this.uname=="" || this.uname.length<3){
					showToastTip("账号太短了"); //"请输入登录账号"	
					return;
				}
				if(this.upwd=="" || this.upwd.length<5){
					showToastTip("密码太短了");
					return;
				}
				if(!this.url.startsWith("http://") && !this.url.startsWith("https://")){
					this.url = "https://"+this.url;
				}
				if(!this.url.endsWith("/")){
					this.url = this.url+"/";
				}
				var newOne = null;
				var accounts = uni.getStorageSync("accountList");
				var existList = [];
				if(accounts){				
					existList = JSON.parse(accounts);
					var exist = false;
					existList.forEach((item,idx)=>{
						if(item.url == that.url && item.loginName==that.uname){
							exist = true;
						}
					})
					if(exist){
						showToastTip("账号已存在");
					}else{
						newOne = {	
							uuid:guid(),
							typeName:"未知",
							typeId:0,
							url:that.url,
							loginName:that.uname,
							pwd:that.upwd,
							company:that.company,
							wsHost:"",
							wsPort:""
						}						
					}					
				}else{		
					newOne = {
						uuid:guid(),
						typeName:"未知",
						typeId:0,
						url:that.url,
						loginName:that.uname,
						pwd:that.upwd,
						company:that.company,
						wsHost:"",
						wsPort:""
					}					
				}
				if(null!=newOne){
					this.checkUrl(newOne,existList,true);
				}
						
			},
			checkUrl(obj,existList,isAdd){
				uni.showLoading({
					title:""
				})
				const that = this;			
				const domainCheckUrl = getOpenApiUrl()+"/checkDomain?url="+this.url;
				getRespDataWithUrl(domainCheckUrl,'GET',{},function(res){
					if(res.code==200){
						const data = res.data
						if(data.productType==0){
							showToastTip("不支持的网址："+that.url)
						}else{
							obj.typeId = data.productType;
							if(data.productType==1){
								obj.typeName = "福彩3D"
							}else if(data.productType==2){
								obj.typeName = "排列三"
							}
							obj.wsHost = data.wsUrl;
							obj.wsPort = data.wsPort;
							if(isAdd){
								existList.push(obj);
							}else{
								existList.forEach((item,idx)=>{
									if(obj.uuid == item.uuid){							
										item = obj;							
									}
								})	
							}								
							uni.setStorageSync("accountList",JSON.stringify(existList));						
							that.url = "";
							that.uname = "";
							that.upwd = "";
							that.panId = "";
							that.company="";
							that.cancel();
						}						
					}else{
						showToastTip(res.msg)										
					}					
				})																
			},
			saveEdit(){
				const that = this;
				if(this.company!=""){
					if(this.company.length>3){
						showToastTip("公司名称不超过三个汉字"); //"请输入登录账号"
						return;
					}				
				}
				
				if(this.url=="" || this.url.length<10){
					showToastTip("请认真输入网址"); //"请输入登录账号"	
					return;
				}
				if(this.uname=="" || this.uname.length<5){
					showToastTip("账号太短了"); //"请输入登录账号"	
					return;
				}
				if(this.upwd=="" || this.upwd.length<5){
					showToastTip("密码太短了");
					return;
				}
				
				if(!this.url.startsWith("http://") && !this.url.startsWith("https://")){
					this.url = "https://"+this.url;
				}
				if(!this.url.endsWith("/")){
					this.url = this.url+"/";
				}
				
				var accounts = uni.getStorageSync("accountList");
				var existList = [];
				if(accounts){					
					existList = JSON.parse(accounts);
					var exist = false;
					for(var i =0;i<existList.length;i++){
						var item = existList[i];
						if(item.uuid == that.panId){
							item.url = that.url;
							item.loginName = that.uname;
							item.pwd = that.upwd;
							that.checkUrl(item,existList,false);	
							break;
						}
					}		
				}else{
					showToastTip("数据错误");
				}	
			},
		}
	}
</script>

<style scoped>

	.form-item{
		margin-top: 30rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
	}
	.input-item-title{
		padding: 10rpx 0rpx;
		font-size: 18px;
	}
	.input-item{
		background-color:#ddd;
		height: 100rpx;
		line-height: 100rpx;
		padding-left: 10rpx;
		border-radius: 10rpx;
		margin-left:10rpx
	}
	
	.login-btn{
		height: 80rpx;
		border-radius: 10rpx;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
		font-weight: bold;
	}
	
	.cancel-btn{
		height: 80rpx;
		border-radius: 10rpx;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
		font-weight: bold;
	}
	
	
	
	.login-btn:active,.cancel-btn:active{
		background: #ebeb75 !important;
	}
	
</style>
