<template>
	<view>
		<!-- 44rpx -->
		<uni-nav-bar dark :fixed="true" shadow status-bar :title="$t('kuaixuan.createCode')" backgroundColor="blueviolet" leftIcon="back" @clickLeft="backTo"/><!--生成号码-->
		
		<view style="margin-bottom: 120rpx;">
			<scroll-view scroll-y="true" :style="{height:this.winHeight*0.9+'rpx'}" @scrolltolower="scrollLoad" lower-threshold="10">
				<view  v-if="buyMethod==0" style="display:flex;justify-content: space-evenly;flex-wrap: wrap;">
					<view class="codeBox"
						v-for="(item,index) in showList">{{item}}</view>
				</view>
				<view v-else style="text-align: center;padding:20rpx">
					{{showList[0]}}
				</view>
			</scroll-view>
		</view>
		
		<view class="fixBottom" v-if="langType==0">
			<view style="display: flex;justify-content: flex-start;width: 100%;align-items: center;">
				<text style="font-size: 40rpx;margin-right: 10rpx;color: white;">{{$t('kuaida.money')}}</text>
				<input type="digit" v-model="data.bm" maxlength="5" @input="calTotalMoney" style="font-size:40rpx;width: 160rpx;border-bottom: 2px solid #666;margin-left:10rpx;margin-right: 10rpx;color:red">
				<view @click="toBuy" class="btnBuy">{{$t('codeCreate.betting')}}</view>
				<view style="display: flex;flex-direction: column;justify-content: center;">
					<text style="color: white;">{{$t('kuaida.number-of-transactions')}}:{{data.buyAmount}}</text>
					<text style="color: white;">{{$t('kuaida.money')}}:{{data.totalMoney}}</text>
				</view>
			</view>
		</view>
		
		<view class="fixBottom-tai" v-if="langType==1">
			<view style="display: flex;justify-content: space-around;width: 100%;align-items: center;">
				<view style="display: flex;flex-direction: column;align-items: flex-start;">
					<text style="font-size: 40rpx;margin-right: 10rpx;color: white;">{{$t('kuaida.money')}}</text>
					<input type="digit" v-model="data.bm" maxlength="10" @input="calTotalMoney" style="font-size:40rpx;font-weight:bolder;width: 160rpx;border-bottom: 2px solid red;margin-left:10rpx;margin-right: 10rpx;color:red">
				</view>
				<view @click="toBuy" class="btnBuy">{{$t('codeCreate.betting')}}</view>
				<view style="display: flex;flex-direction: column;justify-content: center;">
					<text style="color: white;">{{$t('kuaida.number-of-transactions')}}:{{data.buyAmount}}</text>
					<text style="color: white;">{{$t('kuaida.money')}}:{{data.totalMoney}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import { getResponseData,showToastTip,getRespDataWithUrl } from '@/api/req.js'
	import { createPeirateSettingCode} from '@/static/js/kuaixuan-fastbuy-utils.js'
	import { changeDigitToChinese} from '@/static/common-tools.js';
	export default {
		data() {
			return {
				buyMethod:0,
				ncode:"",
				"panUrl":"",
				"data":{
					"codeList":[],
					"lotteryMethodId":"",
					"isXian":0,
					"bm":"",
					"totalMoney":"",
					"buyMoney":0,
					"rules":null,
					"codesFrom":2,
					"batchCodesList":[]
				},				
				"winHeight":0,
				"showList":[],
				"pager":{
					limit:210,
					pages:0,
					currpage:1
				},
				cssHeights:{
					headerMarginTop:0,
					headerHeight:0,
					contentMarginTop:0,
					contentHeight:0,
					fixBottom:120
				},
				langType:0,
				xzuuid:""
			}
		},
		onLoad(option){
						
			this.panUrl = uni.getStorageSync("panUrl");
			
			const _this = this;
			const params = JSON.parse(decodeURIComponent(option.params));
			//this.data.batchCodesList = params.codes; //号码数据中带有分类ID字段
			this.data.lotteryMethodId = params.lotteryMethodId	
			this.data.isXian = params.isXian;
			this.data.rules = params.rules;
			this.buyMethod = params.buyMethod;
			this.ncode = params.ncode;
			//this.data.buyAmount = params.codes.length;	
			// var codesList = [];
			// params.codes.forEach((item,idx)=>{
			// 	codesList.push(item.buyCode);
			// })
			// this.showList =  codesList;
			const barHeight = uni.getStorageSync("statusBarH");
			uni.getSystemInfo({
				success(res) {
					//获取屏幕高度
					_this.winHeight = res.windowHeight*2-_this.cssHeights.fixBottom-barHeight;
					console.log("滚动区域屏幕高度："+_this.winHeight+"rpx");
				}
			});	
			
			const lang = uni.getStorageSync("lang");
			this.initLangType(lang)
			
			uni.$on('langChange',function(data){
				_this.initLangType(data.lang)				
			})	
			//this.getuuid();
			this.toCodeCreate();
			//this.showCodes();
		},
		
		methods: {	
			getuuid(){
				const that = this;
				getResponseData("/app/getUUid",'get',{},function(res){
					if(res.code==0){
						that.xzuuid = res.data.appSaveXZ;
					}
				})
			},
			initLangType(lang){
				if(lang=='tai'){
					this.langType = 1
				}else{
					this.langType = 0
				}
			},
			toCodeCreate(){
				const _this = this;		
				uni.showLoading({
					title:_this.$t("kuaixuan.codeCreating") //'号码生成中...'
				})
				
				if(this.buyMethod==1){
					if(this.data.lotteryMethodId==3 || this.data.lotteryMethodId==4 || this.data.lotteryMethodId==2){
						var prefix = this.data.lotteryMethodId==4?"组六":this.data.lotteryMethodId==3?"组三":"复式";
						var nlen = this.ncode.length;
						var buyDesc = prefix+changeDigitToChinese(nlen,"码")+"(组):"+this.ncode;
						_this.data.buyAmount = 1;
						_this.showList = [buyDesc];
					}
				}else{
					const resData = createPeirateSettingCode(this.data.rules,this.data.lotteryMethodId ,1);
					_this.data.buyAmount = resData.length;
					
					if(resData.length<1){
						showToastTip(_this.$t("kuaixuan.noCodeFound"));//"未找到符合条件的号码"
						return;
					}
					_this.data.batchCodesList = resData;
					resData.forEach((item,idx)=>{
						_this.data.codeList.push(item.buyCode);
					})
					var emptyBox = _this.data.batchCodesList.length%7;
					for(var i=0;i<7-emptyBox;i++){
						_this.data.codeList.push("");
					}
					const len = _this.data.codeList.length;
					_this.showList = _this.data.codeList;
				}
				
				
				// getResponseData("/code/create",'post',_this.data.rules,(res)=>{
				// 	if(res.code==0){
				// 		_this.data.buyAmount = res.count;
				// 		if(_this.counts<1){
				// 			showToastTip(_this.$t("kuaixuan.noCodeFound"));//"未找到符合条件的号码"
				// 		}else{
				// 			const resData = res.data;
				// 			_this.data.batchCodesList = resData;
				// 			resData.forEach((item,idx)=>{
				// 				_this.data.codeList.push(item.buyCode);
				// 			})
				// 			var emptyBox = _this.data.batchCodesList.length%7;
				// 			for(var i=0;i<7-emptyBox;i++){
				// 				_this.data.codeList.push("");
				// 			}
				// 			const len = _this.data.codeList.length;
				// 			_this.pager.pages = Math.ceil(len/_this.pager.limit);
				// 			if(_this.pager.pages>1){
				// 				const st = 0;
				// 				const et = (_this.pager.limit);
				// 				_this.showList =  _this.data.codeList.slice(st,et);
				// 			}else{
				// 				_this.showList =  _this.data.codeList;
				// 			}
							
				// 			// const params = {
				// 			// 	"codes":resData,
				// 			// 	"lotteryMethodId":_this.rules.lotteryMethodId,
				// 			// 	"isXian":_this.rules.isXian,
				// 			// 	"rules":_this.rules
				// 			// }
				// 			// uni.navigateTo({
				// 			// 	url:"/pages/index/kuaixuan/code_create?params="+encodeURIComponent(JSON.stringify(params)),					
				// 			// })
				// 		}
				// 	}
				// })
						
			},
			
			scrollLoad(){
				const that = this;
				if(this.pager.currpage<this.pager.pages){
					this.pager.currpage++;
					const st = (this.pager.currpage-1)*(this.pager.limit);
					const et = (this.pager.currpage)*(this.pager.limit);
					if(et>this.data.codeList.length){
						et = this.data.codeList.length;
					}
					const pageData = this.data.codeList.slice(st,et);
					pageData.forEach((item,idx)=>{
						that.showList.push(item);
					})
				}
			},
			backTo(){
				uni.navigateBack()
			},
			showCodes(){				
				var emptyBox = this.data.batchCodesList.length%7;
				for(var i=0;i<7-emptyBox;i++){
					this.showList.push("");
				}
			},
			calTotalMoney(e){
				
				const that = this;
				const bm = e.detail.value;
				if(bm.length>0){
					var money = parseFloat(bm);
					this.data.buyMoney = money
					this.data.totalMoney = money*this.data.buyAmount;					
				}else{
					this.data.buyMoney = 0
					this.data.totalMoney = 0;		
				}
			}, 
			buyNow(e){
				if(this.totalMoney==""){
					showToastTip(this.$t("kuaixuan.noMoneyInput")); //"请输入金额
					return;
				}
				const leftCredit = uni.getStorageSync("leftCredit");
				if(leftCredit<this.data.totalMoney){
					showToastTip(this.$t("kuaixuan.balanceNotEnough"))  //"信用额度不足"
					return;
				}
				uni.showLoading({
					title: this.$t("kuaixuan.chulizong") //'正在处理中...'
				})
				
				
				const _this = this;
				getResponseData("/codes/v1/app/batchBuy?xzuuid="+_this.xzuuid,"POST",_this.data,(res)=>{
					if(res.code==0){
						uni.redirectTo({
							url:'/pages/index/index'
						})
					}else{
						showToastTip(res.msg)		
					}
				})
			},
			
			buyBaozu(){
				var that = this;
				var buyList = [];
				var ls3 = [4,5,6,7,8,9,10,11,12];
				var ls6 = [4,5,6,7,8,9,10,11];
				var ls1 = [1,2,3,4,5,6,7,8];
				
				var numLen = this.ncode.length;
				var buyDesc = "";
				var typeId = "";
				var lmId = 0;
				var ready = false;
				var zuValue = this.ncode;
				if(this.data.lotteryMethodId==4 && this.buyMethod==1){		
					ready = true;
					typeId = ls6[numLen-3];
					lmId = 200;
					if(numLen==10){
						buyDesc = "组六全包"
					}else{
						buyDesc = '组六'+changeDigitToChinese(numLen,"码")
					}
					buyDesc +=":"+zuValue;

				}

				if(this.data.lotteryMethodId==3 && this.buyMethod==1){
					ready = true;
					typeId = ls3[numLen-2];
					lmId = 100;
					if(numLen==10){
						buyDesc = "组三全包"
					}else{
						buyDesc = '组三'+changeDigitToChinese(numLen,"码")
					}
					buyDesc +=":"+zuValue;
					
				}

				if(this.data.lotteryMethodId==2 && this.buyMethod==1){
					ready = true;
					lmId = 300;
					typeId = ls1[numLen-3];
			
					if(numLen==10){
						buyDesc = "复式全包"
					}else{
						buyDesc = '复式'+changeDigitToChinese(numLen,"码")
					}
				
					buyDesc +=":"+zuValue;
				
				}
				
				if(ready){
					buyList.push({
						
						huizongName:buyDesc,
						value:zuValue,
						buyCodes:zuValue,
						bai:zuValue,
						shi:"",
						ge:"",
						buyAmount:1,
						lmId:lmId,
						lsTypeId:typeId,
						buyMoney:that.data.buyMoney,
						codeList:[zuValue],
						buyDesc:buyDesc,
						typeFlag:1,
						buyMethod:1
					})
					
					uni.showLoading({
						title: this.$t("kuaixuan.chulizong") //'正在处理中...'
					})
					
					var reqUrl = this.panUrl+"vip/draw/pc/buy3d"
					getRespDataWithUrl(reqUrl,"POST",buyList,(res)=>{
						if(res.code==0){
							uni.$emit('updateCredit',{data:''})
							uni.navigateBack();
							// uni.redirectTo({
							// 	url:'/pages/index/index'
							// })
						}else{
							showToastTip(res.msg)		
						}
					})
				}
				
				
		


		},
				   
		
		
			
			toBuy(){
				var that = this;
				if(this.totalMoney==""){
					showToastTip(this.$t("kuaixuan.noMoneyInput")); //"请输入金额
					return;
				}
			     const leftCredit = uni.getStorageSync("leftCredit");
			     if(leftCredit<this.totalMoney){
			     	showToastTip(this.$t("kuaixuan.balanceNotEnough"))  //"信用额度不足"
			     	return;
			     } 
						   
				var selectList = [];
			
			     if(this.data.buyAmount>0) {
			                    		
					if((this.data.lotteryMethodId=="2" || this.data.lotteryMethodId=="3" || this.data.lotteryMethodId=="4") && this.buyMethod==1){
						this.buyBaozu();
						return;
					}		
					var hzname="";
					if(this.data.lotteryMethodId=="1" || this.data.lotteryMethodId==1){
						hzname = '直选快选';
					}else if(this.data.lotteryMethodId=="3" || this.data.lotteryMethodId==3){						
						hzname = '组三快选';							
					}else if(this.data.lotteryMethodId=="4" || this.data.lotteryMethodId==4){						
						hzname = '组六快选';			
					}else if(this.lotteryMethodId=="6" || this.lotteryMethodId==6){					
						hzname = '1D快选';					
					}else if(this.lotteryMethodId=="7" || this.lotteryMethodId==7){				
						hzname = '2D快选';					
					}else if(this.lotteryMethodId=="2" || this.lotteryMethodId==2){
						hzname = '复式快选';					
					}
					
					var codeList = [];
					//删除无效的空字符串
					that.data.codeList.forEach((item,idx)=>{
						if(item.length>1){
							codeList.push(item);
						}
					})
					
					selectList.push({
						huizongName: hzname,
						value: codeList.join(","),
						buyCodes: "",
						buyAmount: codeList.length,
						lmId: that.data.lotteryMethodId,
						lsTypeId: 1,
						buyMoney: that.data.buyMoney,
						rules: that.data.rules,
						buyDesc: hzname,
						codeList:codeList,
					})
					
					if (selectList.length < 1) {
						showToastTip("请选择号码"); 
						return;
					}
					uni.showLoading({
						title: this.$t("kuaixuan.chulizong") //'正在处理中...'
					})
					var reqUrl = this.panUrl+"vip/draw/pc/buy3d/fast"
					getRespDataWithUrl(reqUrl,"POST",selectList,(res)=>{
						if(res.code==0){
							showToastTip("下注成功"); 
							uni.$emit('updateCredit',{data:''}) 
							uni.navigateBack();
						
						}else{
							showToastTip(res.msg)		
						}
					})
				}
			}
		}
	}
</script>

<style>
	
	.fixBottom{
		position: fixed;
		width: 100%;
		bottom: 0;
		height: 100rpx;
		background-color: blueviolet;
		padding: 10rpx;
	}
	
.fixBottom-tai{
		position: fixed;
		width: 100%;
		bottom: 0;
		height: 120rpx;
		background-color: blueviolet;
		padding: 10rpx;
	}
	
	.fixTop{
		width:100%;
		position: absolute;
		top: 0;
		margin-bottom: 150rpx;
	}
	
	.codeBox{
		width:12.5%;
		height: 50rpx;
		line-height: 50rpx;
		border: 1px solid #eee;
		text-align: center;
		font-size:24rpx;
		/* margin:2rpx; */
	}

	.btnAll:active,.btnBuy:active{
		background-color: #ebeb75 !important;
	}
	
	.btnBuy{
		text-align:center;
		margin:0rpx 10rpx;
		height: 80rpx;
		width: 160rpx;
		line-height: 80rpx;
		background-color:brown;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: white;
		font-size: 40rpx;
	}
</style>
