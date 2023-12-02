<template>
	<view>
		<view style="top:0px;height: 25px;background-color:#8A2BE2;z-index:111112;position:fixed;width: 100%;"></view>
		<view style="z-index:111111;position:fixed;width:100%;top:25px;height: 65px;display: flex;justify-content: space-around;align-items: center;background-color:#555;color: #fff;">
			<view style="font-size: 20px;"><text>网址和账号信息</text></view>
			<view class="btnLogin linerBtn" style="width: 80px;height: 40px;line-height: 40px;" @click="logout">退出登录</view>
		</view>
		<view style="height: calc(100%-90px);margin-top:90px;width: 100%;">
			<uni-grid :column="2"  :square="false" :showBorder="false" borderColor="purple">
				 
					<uni-grid-item v-for="(item,idx) in accountList" style="width: 50%;">
						<view class="grid-item-box" style="width: 94%;margin:5px auto;border:2px solid purple;border-radius: 10px;background-color: #BBA0E2;color:#fff">
							<view style="padding-bottom: 5px;padding-left: 5px;color:#555;font-size: 18px;">第{{idx+1}}</view>
							<view style="padding-bottom: 5px;padding-left: 5px;color:#555;font-size: 18px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.url}}</view>
							<view style="padding-bottom: 5px;padding-left: 5px;display: flex;">
								<view style="width:60px;color:#555;font-size: 18px;color:blue;padding-right: 5px;">{{item.typeName}}</view>
								<view style="color:#555;font-size: 18px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">账号:{{item.loginName}}</view>
							</view>
							<view style="padding-bottom: 5px;padding-left: 5px;display: flex;align-items: center;justify-content:center;">
									<view class="btnLogin linerBtn" @click="edit(item,idx+1)">设置</view>
									<view class="btnLogin linerBtn" style="margin-left:15px" @click="login(item)">登录</view>
							</view>
													
						</view>
					</uni-grid-item>
					
					<uni-grid-item v-for="(item,idx) in emptyGrids" style="width: 50%;">
						<view class="grid-item-box" style="width: 94%;margin:5px auto;border:2px solid #aaa;border-radius: 10px;background-color: #ccc;justify-content: center;">
							<view style="padding-bottom: 5px;padding-left: 5px;font-size: 18px;"><text>第{{idx+1+accountList.length}}公司</text></view>
							<view style="padding-bottom: 5px;padding-left: 5px;"><text style="color:#555;font-size: 18px;">&nbsp;</text></view>
							<view style="padding-bottom: 5px;padding-left: 5px;display: flex;">
								<view style="width:80px;color:#555;font-size: 18px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">账号:</view>
							</view>
							<view style="padding-bottom: 5px;display: flex;justify-content: center;align-items: center;">
								<view class="btnLogin linerBtn"  @click="addNew(idx+1+accountList.length)">设置</view>
								<view class="btnLogin cancelLiner" style="margin-left:15px">登录</view>
							</view>
						</view>
					</uni-grid-item>
					<!-- <view class="num"><text>{{idx+1}}</text></view>
					<view style="width: calc(100%-180);" @click="edit(item)">	
						<view class="title"><text>{{item.typeName}}</text></view>
						<view class="subTitle"><text>{{item.url}}</text></view>
					</view>
					<view style="display: flex;justify-content: center;align-items: center;">
						<view class="btnLogin" @click="login(item)"><text>登录</text></view>
						<view style="margin-right: 5px;" @click="delAccount(item)"><text>删除</text></view>
					</view> -->
				
				<!-- <view v-for="(item,idx) in emptyGrids" class="mylist">
					<view class="num" style="background-color: #C0C4CC;"><text>{{idx+1+accountList.length}}</text></view>
					<view>
						<view><text>待添加</text></view>
					</view>
					<view style="display: flex;justify-content: center;align-items: center;">
						<text class="btnLogin" @click="addNew">添加</text>
					</view>
				</view>		 -->	
			</uni-grid>
		</view>

	
	<!-- 		<view>
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
			</view> -->
		<luo-version-upgrade v-if="appUpgrade.upgrade"
			:version="appUpgrade.remoteVer" :url="appUpgrade.url" 
			:describe="appUpgrade.describe" :is_force="appUpgrade.is_force">
		</luo-version-upgrade>
	
	</view>
</template>

<script>
	
	import versionUpgrade from "@/components/luo-version-upgrade/luo-version-upgrade.vue";
	
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
				company:"",
				panId:"",
				popTitle:"添加盘口",
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
		onLoad(options){
			console.log("登录页面token："+uni.getStorageSync("token"))
			const that = this;
			var accounts = uni.getStorageSync("accountList");
			if(accounts){
				this.accountList = JSON.parse(accounts);
				this.emptyGrids = this.initGrids-this.accountList.length;
			}else{
				this.emptyGrids = this.initGrids;
			}
			this.checkNewVersion();
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
					// console.log("屏幕高度："+windowHeight+" 屏幕宽度："+windowWidth
					// +" 状态栏高度："+statusBarHeight+" osName:"+res.osName+" bottomSaveArea:"+bottomSaveArea);
				}
			})
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
								// showToastTip("已经是最新版本")
							}
						}
					})
				})
			},
			logout(){
				uni.redirectTo({
					url:"/pages/starter"
				})
			},
			addNew(numNo){
				// this.popTitle = "添加盘口"
				// this.$refs.addNewAccount.open();
				var params = encodeURIComponent(JSON.stringify({
					company:"第"+numNo,
					url:"",
					loginName:"",
					pwd:"",
					uuid:""
				}));
				uni.navigateTo({
					url:"/pages/set_url?qs="+params
				})
				// uni.navigateTo({
				// 	url:"/pages/set_url"
				// })
			},
			addOrUpdate(){
				if(this.panId==""){
					this.addAccount();
				}else{
					this.saveEdit();
				}
			},
			edit(one,numNo){
				this.popTitle = "修改盘口："+one.typeName;
				if(one.company==""){
					one.company == "第"+numNo
				}
				const params = encodeURIComponent(JSON.stringify(one));
				uni.navigateTo({
					url:"/pages/set_url?qs="+params
				})
				// this.url = one.url;
				// this.uname = one.loginName;
				// this.upwd = one.pwd;
				// this.panId = one.uuid;
				// this.$refs.addNewAccount.open();
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
				let vipUrl = item.url;
				if(vipUrl.indexOf("aa.3d11aa.com")>-1 || vipUrl.indexOf("aa.pai3aa11.com")>-1){
					if("/" == vipUrl.substring(vipUrl.length-1)){
						vipUrl = vipUrl.substring(0,vipUrl.length-1);
					}
					if(item.typeId==1){
						vipUrl = vipUrl+":9092/"
					}else if(item.typeId==2){
						vipUrl = vipUrl+":9292/"
					}
					//item.url = vipUrl;
				}
				// console.log("=====url ==",vipUrl);
				
				const reqUrl = vipUrl+"vip/login";
				getRespDataWithUrl(reqUrl,'POST',{
					uname:item.loginName,
					pwd:item.pwd
				},function(res){
					// console.log("login===="+JSON.stringify(res))
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
						// console.log("wsUrl>>>>>>>>>"+wsUrl+" vipUrl>>>>>>>>>"+vipUrl);
						// console.log("token>>>>>>>>>"+res.data.token);
						uni.setStorageSync('wsUrl',wsUrl);
						uni.setStorageSync('lotteryName',lotteryName);
						uni.setStorageSync('panUrl',vipUrl);
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
							typeId:0,
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
						typeId:0,
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
	
	.btnLog{
		background:linear-gradient(#8150CA,#7540C4);
	}
	
	.grid-item-box {
		flex: 1;
		/* // position: relative; */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		/* align-items:flex-start; */
		/* justify-content: flex-start; */
		/* padding: 5px; */
	}
	
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
	
	
	.btnLogin{
		line-height:30px;
		height: 30px;
		width: 40%;
		text-align: center;
		color:#fff;
		border-radius: 5px;
	}
	
	.btnLogin:active{
		background: #ebeb75 !important;
	}

</style>
