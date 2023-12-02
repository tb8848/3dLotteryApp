<template>
	<view style="padding: 0px 0px 30px 0px;height: 100%;">
		<view>
			<view v-for="(item,idx) in accountList"  class="mylist" style="background-color: #FFE4C4;">
				<view class="num"><text>{{idx+1}}</text></view>
				<view style="width: calc(100%-180);" @click="edit(item)">	
					<view class="title"><text>{{item.typeName}}</text></view>
					<view class="subTitle"><text>{{item.url}}</text></view>
				</view>
				<view style="display: flex;justify-content: center;align-items: center;">
					<view class="btnLogin" @click="login(item)"><text>登录</text></view>
					<view style="margin-right: 5px;" @click="delAccount(item)"><text>删除</text></view>
				</view>
			</view>
			
			<view v-for="(item,idx) in emptyGrids" class="mylist">
				<view class="num" style="background-color: #C0C4CC;"><text>{{idx+1+accountList.length}}</text></view>
				<view>
					<view><text>待添加</text></view>
				</view>
				<view style="display: flex;justify-content: center;align-items: center;">
					<text class="btnLogin" @click="addNew">添加</text>
				</view>
			</view>
			
		</view>
		<uni-popup ref="addNewAccount" type="top" backgroundColor="#ccc">
			<view style="padding: 15px;">
				<view style="padding-bottom: 5px;border-bottom: 1px solid #DCDCDC;text-align: center;">{{popTitle}}</view>
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
				<view class="form-item" @click="addOrUpdate()">
					<view class="login-btn" style="width: 100%;"><text style="color: white;font-size: 32rpx;">确定</text></view>
				</view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	
	import { getRespDataWithUrl, showToastTip,getBaseUrl,getWsUrl,getOpenApiUrl} from "@/api/req.js";
	
	import { guid,parseUrl} from "@/api/tools.js";
	
	export default {
		data() {
			return {
				accountList:[
				// 	{
				// 	typeName:"福彩3D",
				// 	url:"http://192.168.1.118:9092/",
				// 	loginName:"zxj05",
				// 	pwd:'123456'
				// },
				// {
				// 	typeName:"排列三",
				// 	url:"http://192.168.1.118:9092/",
				// 	loginName:"zxj05",
				// 	pwd:'123456'
				// },
				],
				initGrids:20,
				emptyGrids:0,
				url:"",
				uname:"",
				upwd:"",
				panId:"",
				popTitle:"添加盘口"
			}
		},
		onLoad(options){
			const that = this;
			var accounts = uni.getStorageSync("accountList");
			if(accounts){
				this.accountList = JSON.parse(accounts);
				this.emptyGrids = this.initGrids-this.accountList.length;
			}else{
				this.emptyGrids = this.initGrids;
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
		},
		methods: {
			addNew(){
				this.popTitle = "添加盘口"
				this.$refs.addNewAccount.open();
			},
			addOrUpdate(){
				if(this.panId==""){
					this.addAccount()
				}else{
					this.saveEdit();
				}
			},
			edit(one){
				this.popTitle = "修改盘口："+one.typeName
				this.url = one.url;
				this.uname = one.loginName;
				this.upwd = one.pwd;
				this.panId = one.uuid;
				this.$refs.addNewAccount.open();
			},
			delAccount(one){
				//this.panId = one.uuid;
				var accounts = uni.getStorageSync("accountList");
				var existList = [];
				if(accounts){	
					existList = JSON.parse(accounts);
					for(var i=0,len=existList.length;i<len;i++){
						var item = existList[i];
						if(item.uuid == one.uuid){
							existList.splice(i,1);
							break;
						}
					}
					uni.setStorageSync("accountList",JSON.stringify(existList));
					this.accountList = existList;	
				}	
			},
			saveEdit(){
				const that = this;
				if(this.url==""){
					showToastTip("请输入盘口地址"); //"请输入登录账号"	
					return;
				}
				if(this.uname==""){
					showToastTip("请输入登录账号"); //"请输入登录账号"	
					return;
				}
				if(this.upwd==""){
					showToastTip("请输入登录密码");
					return;
				}
				if(!this.url.startsWith("http://") && !this.url.startsWith("https://")){
					this.url = "http://"+this.url;
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
			login(item){
				const that = this;
				uni.showLoading({
					title:this.$t("login.isLoging"),  //"登录中...",
					mask:true
				})
				const reqUrl = item.url+"vip/login"
				getRespDataWithUrl(reqUrl,'POST',{
					uname:item.loginName,
					pwd:item.pwd
				},function(res){
					console.log("login===="+JSON.stringify(res))
					if(res.code==0){
						const lotteryName = res.data.lotteryName;
						item.typeName = lotteryName;
						that.updateAccountStorage(item)					
						var wsUrl = item.wsHost+":"+item.wsPort+"/app"
						// var wsHost = res.data.wsHost;
						// var wsPort = res.data.wsPort;
						// if(wsHost!=""){
						// 	wsUrl+=wsHost;
						// }
						// if(wsPort!=""){
						// 	wsUrl+=":"+wsPort+"/app";
						// }
						console.log("wsUrl>>>>>>>>>"+wsUrl);
						uni.setStorageSync('wsUrl',wsUrl);
						uni.setStorageSync('lotteryName',lotteryName);
						uni.setStorageSync('panUrl',item.url);
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
			addAccount(){
				const that = this;
				if(this.url==""){
					showToastTip("请输入盘口地址"); //"请输入登录账号"	
					return;
				}
				if(this.uname==""){
					showToastTip("请输入登录账号"); //"请输入登录账号"	
					return;
				}
				if(this.upwd==""){
					showToastTip("请输入登录密码");
					return;
				}
				if(!this.url.startsWith("http://") && !this.url.startsWith("https://")){
					this.url = "http://"+this.url;
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
							url:that.url,
							loginName:that.uname,
							pwd:that.upwd,
							wsHost:"",
							wsPort:""
						}						
					}					
				}else{		
					newOne = {
						uuid:guid(),
						typeName:"未知",
						url:that.url,
						loginName:that.uname,
						pwd:that.upwd,
						wsHost:"",
						wsPort:""
					}					
				}
				if(null!=newOne){
					this.checkUrl(newOne,existList,true);
				}
						
			},
			updateAccountStorage(one){
				var accounts = uni.getStorageSync("accountList");
				var existList = [];
				if(accounts){					
					existList = JSON.parse(accounts);
					for(var i=0,len=existList.length;i<len;i++){
						var item = existList[i];
						if(item.uuid == one.uuid){
							existList[i] = one;
							break;
						}
					}
					uni.setStorageSync("accountList",JSON.stringify(existList));
					this.accountList = existList;	
				}	
			},
			
			checkUrl(obj,existList,isAdd){
				const that = this;			
				const domainCheckUrl = getOpenApiUrl()+"/checkDomain?url="+this.url;
				getRespDataWithUrl(domainCheckUrl,'GET',{},function(res){
					if(res.code==200){
						const data = res.data
						if(data.productType==0){
							showToastTip("不支持的网址："+that.url)
						}else{
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
							that.$refs.addNewAccount.close();
							that.url = "";
							that.uname = "";
							that.upwd = "";
							that.panId = "";
							that.accountList = existList;
						}						
					}else{
						showToastTip(res.msg)										
					}					
				})																
			}
			
		}
	}
</script>

<style scoped>
	
	.mylist{
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* padding: 15px; */
		border-bottom: 1px solid #E4E7ED;
	}
	
	.mylist .num{
		background-color: orangered;
		width: 60px;
		height: 40px;
		font-size: 24px;
		color:#fff;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.mylist .title{
		font-weight: bold;
		font-size: 16px;
		padding: 5px ;
		display: flex;
		justify-content: flex-start;
	}
	
	.mylist .subTitle{
		font-size: 13px;
		color: #808080;
		padding: 0px 0px 5px 5px;
		display: flex;
		justify-content: flex-start;
	}
	
	.mylist .btnLogin{
		width: 60px;
		height: 30px;
		border-radius: 5px;
		background-color: red;
		color: #fff;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	}
	
	.form-item{
		margin-top: 30rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center
	}
	.input-item-title{
		padding: 10rpx 0rpx;
	}
	.input-item{
		background-color:#EBEEF5;
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 10rpx;
		border-radius: 10rpx;
		margin-left:10rpx
	}
	
	.login-btn{
		height: 80rpx;
		border-radius: 10rpx;
		text-align: center;
		background-color: red;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.oneRow{
		padding:5px
	}
	
	.ruleItem{
		width:49%;
		border:1px solid #aaa;		
		height: 120px;	
		/* background-color: #fff; */
		/* color:white; */
	}
	
	.ruleItemSelected{	
		background-color: red;
	}

</style>
