<template>
	<page-meta :page-style="'overflow:'+(overflowShow?'hidden':'visible')"></page-meta>
	
	<view>
		<view class="ziliaoHeader" :style="{'margin-top':(cssHeights.headerMarginTop)+'rpx'}">			
			<view style="padding-top: 10rpx;" v-if="langType==0">
				<view style="height: 80rpx;line-height: 80rpx;display: flex;justify-content: space-between;">
					<view style="width: 40%;padding-left: 10px;font-weight: bold;">{{$t('ziliao.credit-limit')}}：<span>{{edu}}</span></view>
					<view style="width: 60%;">						
							<view style="display: flex;justify-content:space-around;">
								<view><checkbox value="1" :checked="basicSetting.realOrTransformOdds==1" @click="changeOddsType(1)" color="#8150CA"/>{{$t('ziliao.actual-odds')}}</view>
								<view><checkbox value="0" :checked="basicSetting.realOrTransformOdds==0" @click="changeOddsType(0)" color="#8150CA"/>{{$t('ziliao.conversion-odds')}}</view>
							</view>					
					</view>
				</view>
				<view style="height: 80rpx;line-height: 80rpx;display: flex;justify-content: space-between;">
					<view style="padding-left: 10px;font-weight: bold;">
						<text>{{$t("ziliao.leftCredit")}}<!-- 剩余额度： --></text><span>{{leftEdu}}</span></view>				
				</view>
				<view style="display: flex;justify-content: space-between;height: 100rpx;border-top: 1px solid #c7bbc3;border-bottom: 1px solid #c7bbc3;">
					<view style="padding-left: 10px;line-height: 100rpx;font-weight: bold;width: 15%;">{{$t('ziliao.sales-office')}}</view>
					<view style="width: 80%;margin: 0 auto;">
						<input class="input-item" v-model="basicSetting.saleName" style="padding-left:5rpx"/>
					</view>
				</view>
				<view style="height: 80rpx;display: flex;justify-content: center;align-items: center;">
					<view class="submit linerBtn" @click="submit()">{{$t('ziliao.submit')}}</view>
				</view>	
			</view>
			
			<view style="padding-top: 10rpx;" v-if="langType==1">
				<view style="padding-left: 10px;">
						<view style="display: flex;justify-content:flex-start;">
							<view style="margin-right: 20rpx;"><checkbox value="1" :checked="basicSetting.realOrTransformOdds==1" @click="changeOddsType(1)"></checkbox>{{$t('ziliao.actual-odds')}}</view>
							<view><checkbox value="0" :checked="basicSetting.realOrTransformOdds==0" @click="changeOddsType(0)"></checkbox>{{$t('ziliao.conversion-odds')}}</view>
						</view>					
				</view>
				<view style="padding-left: 10px;font-weight: bold;">{{$t('ziliao.credit-limit')}}：<span>{{edu}}</span></view>
				<view style="height: 80rpx;line-height: 80rpx;display: flex;justify-content: space-between;">
					<view style="padding-left: 10px;font-weight: bold;">
						<text>{{$t("ziliao.leftCredit")}}<!-- 剩余额度： --></text><span>{{leftEdu}}</span></view>				
				</view>
				<view style="display: flex;justify-content: space-between;height: 100rpx;border-top: 1px solid #c7bbc3;border-bottom: 1px solid #c7bbc3;">
					<view style="padding-left: 10px;line-height: 100rpx;font-weight: bold;width: 15%;">{{$t('ziliao.sales-office')}}</view>
					<view style="width: 80%;margin: 0 auto;">
						<input class="input-item" v-model="basicSetting.saleName" style="padding-left:5rpx"/>
					</view>
				</view>
				<view style="height: 80rpx;display: flex;justify-content: center;align-items: center;">
					<view class="submit" @click="submit()">{{$t('ziliao.submit')}}</view>
				</view>		
			</view>				
					
		
		</view>
			
		<view :style="{'margin-top':cssHeights.contentMarginTop+'rpx'}" class="ziliaoContent"> 		
			<scroll-view :style="{'height':(cssHeights.contentHeight-cssHeights.bottomSaveArea)+'rpx'}" scroll-y="true"> 
				<view style="display: flex;justify-content: space-between;">
					<view class="tableCell tableCell4 thItem biaoti">{{$t('ziliao.category')}}</view>
					<view class="tableCell tableCell4 thItem biaoti">{{$t('ziliao.minimum-bet')}}</view>
					<view class="tableCell tableCell4 thItem biaoti">{{$t('ziliao.single-note-upper-limit')}}</view>
					<view class="tableCell tableCell4 thItem biaoti">{{$t('ziliao.backwater')}}</view>
					<view class="tableCell tableCell4 thItem biaoti">{{$t('kuaida.odds')}}</view>
				</view>
				
				<uni-load-more v-if="lotteryMethodList.length==0" iconType="circle" status="loading" />
				
				<view v-for="(item,index) in lotteryMethodList" :key="index" v-show="item.openFlag==1">
					<view v-if="item.lotterySettingList.length>1 && !disabledlotteryId.includes('lm-'+item.id)" 
						style="display: flex;justify-content: space-between;align-items: center;">
						<view class="tableCell tableCell4 tdItem typeName">{{item.bettingMethod}}</view>
						<view class="tableCell tableCell4 tdItem"></view>
						<view class="tableCell tableCell4 tdItem"></view>
						<view class="tableCell tableCell4 tdItem"></view>
						<view class="tableCell tableCell4 tdItem last"></view>
					</view>
					<view v-if="item.lotterySettingList.length==1 && !disabledlotteryId.includes('lm-'+item.id)" 
						style="display: flex;justify-content: space-between;align-items: center;">
						<view class="tableCell tableCell4 tdItem typeName">{{item.bettingMethod}}<!-- {{$t('ziliao.fixed-bit')}} --></view>
						<view class="tableCell tableCell4 tdItem">{{item.lotterySettingList[0].minBettingPrice}}</view>
						<view class="tableCell tableCell4 tdItem">{{item.lotterySettingList[0].maxBettingCount}}</view>
						<view class="tableCell tableCell4 tdItem tdTypeItem tanchuang" 
							@click="showHuiShuiProp(item.lotterySettingList[0],0)">					
						 	{{item.lotterySettingList[0].huiShui}}
						</view>
						<view class="tableCell tableCell4 tdItem tdTypeItem last" 
						style="font-size: 26rpx;">{{getFirstRate(item.lotterySettingList[0].vipPeiRate)}}</view>
					</view>
					<view v-if="item.lotterySettingList.length>1 && !disabledlotteryId.includes('lm-'+item.id)" v-for="(it1,idx) in item.lotterySettingList" 
						:key="idx" style="display: flex;justify-content: space-between;align-items: center;">
						<view class="tableCell tableCell4 tdItem" v-if="!disabledlotteryId.includes('ls-'+it1.id)">{{it1.bettingRule}}</view>
						<view class="tableCell tableCell4 tdItem" v-if="!disabledlotteryId.includes('ls-'+it1.id)">{{it1.minBettingPrice}}</view>
						<view class="tableCell tableCell4 tdItem" v-if="!disabledlotteryId.includes('ls-'+it1.id)">{{it1.maxBettingCount}}</view>
						<view class="tableCell tableCell4 tdItem tdTypeItem tanchuang" 
							@click="showHuiShuiProp(it1,idx)" v-if="!disabledlotteryId.includes('ls-'+it1.id)">{{it1.huiShui}}</view>
						<view class="tableCell tableCell4 tdItem tdTypeItem last" 
							style="font-size: 26rpx;text-overflow: ellipsis;" v-if="!disabledlotteryId.includes('ls-'+it1.id)">{{getFirstRate(it1.vipPeiRate)}}</view>				
					</view>
				</view>
					
			</scroll-view>
		</view>
		
		
			<!-- 弹窗 -->
			<uni-popup ref="huiShuiPopup" type="right" @change="popupChange">				 
				 <!-- <view :style="{height:this.rightPopHeight*0.5-200+'rpx'}"> -->
					<scroll-view class="hsPopup" scroll-y="true" 
						:style="{height:(rightPopHeight-60)+'rpx','margin-top':(barHeight+100)+'rpx'}">
						<view class="hsItem" v-for="(item,index) in huiShuiRange" 
							:class="{'hsItemActive':item.earnWater==huiShuiValue}" 
							@click="changeHuiShuiValue(item.earnWater)">{{item.earnWater}}</view>																
					</scroll-view>
				<!-- </view> -->
			</uni-popup>				
		
				
	</view>
</template>

<script>
	
	import { getResponseData, showToastTip,getRespDataWithUrl } from "@/api/req.js";
	
	export default {
		data() {
			return {
				overflowShow:false,
				edu:0,//信用额度
				leftEdu:0,
				value:1,
				shiji:true,//实际赔率是否选中
				zhuanhuan:false,//转换赔率是否选中
				salesLocation:"",//销售点
				lotteryMethods:[],
				currLotterySetting:null, //当前选中待修改的配置
				currLotterySettingIdx:'',//当前选中待修改的配置的位置
				huiShuiValue:0,
				huiShuiItemIdx:0,
				huiShuiRange:[],
				nickName:'',
				editSelectTypeLists:15,//每页笔数默认15
				rightPopHeight:0,
				modLotterySettings:[], //已修改的回水数据
				cssHeights:{
					headerMarginTop:0,
					headerHeight:350,
					contentMarginTop:0,
					contentHeight:0,
					bottomSaveArea:0,
					langHeight:50
				},
				barHeight:0,
				basicSetting:{},
				lotteryMethodList:[],
				langType:0,
				panUrl:"",
				disabledlotteryId:[],
				
			}
		},
		created() {
			const that = this;
			this.panUrl = uni.getStorageSync("panUrl");
			this.edu = uni.getStorageSync("leftCredit").totalCredit;
			this.leftEdu = uni.getStorageSync("leftCredit").surplusCredit;
			const topbarHeight = uni.getStorageSync("topbarHeight");
			const barHeight = uni.getStorageSync("statusBarH");
			//this.cssHeights.headerMarginTop= topbarHeight-barHeight;
			this.cssHeights.headerMarginTop = topbarHeight;
			const winH = uni.getStorageSync("winH");
			this.barHeight = barHeight;
			this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop+this.cssHeights.headerHeight; //单位rpx;
			this.cssHeights.contentHeight = winH+barHeight- this.cssHeights.contentMarginTop;
			this.rightPopHeight = winH-barHeight;		
			this.cssHeights.bottomSaveArea = uni.getStorageSync("bottomSaveArea");		
			const lang = uni.getStorageSync("lang");
			this.initLangType(lang);
			uni.$on('langChange',function(data){
				that.initLangType(data.lang);	
				that.lotteryMethodsTrans();
			})	
			
			this.initData();
			
			console.log("==================this.cssHeights.headerMarginTop0,",this.cssHeights.headerMarginTop);

		},
		methods: {
			initLangType(lang){
				const winH = uni.getStorageSync("winH");
				const topbarHeight = uni.getStorageSync("topbarHeight");
				var newHeaderHeight = 0;
				if(lang=='tai'){
					this.cssHeights.headerMarginTop = topbarHeight + this.cssHeights.langHeight;
					newHeaderHeight = this.cssHeights.headerHeight + 10;
					this.langType = 1
				}else{
					this.langType = 0
					this.cssHeights.headerMarginTop = topbarHeight;		
					newHeaderHeight = this.cssHeights.headerHeight;
					
				}
				this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop+newHeaderHeight; //单位 rpx
				this.cssHeights.contentHeight = winH+this.barHeight- this.cssHeights.contentMarginTop;		
				
			},
			initData(){
				uni.showLoading({
					title:'',
					mask:true
				})
				const _this = this;
				this.getBasicInfo();
				this.getSettingData();
			},
			getBasicInfo(){
				const _this = this;
				var reqUrl = this.panUrl + "vip/app/vipInfo/getVipBasicSetting"
				getRespDataWithUrl(reqUrl,'get',{},(res)=>{
					if(res.code==0){
						_this.basicSetting = res.data.basicSetting;
					}
				});
			},
			getSettingData(){//获取赚水信息
				const _this = this;
				var reqUrl = this.panUrl + "vip/app/vipInfo/selectList"
				getRespDataWithUrl(reqUrl,'get',{},(res)=>{
					if(res.code==0){
						_this.lotteryMethodList = res.data;
						_this.getPlaySetting();
					}
				});
			},
			
			getPlaySetting(){
				var that = this;
				var reqUrl = this.panUrl + "vip/verifyLogin"
				//获取玩法设置
				// getRespDataWithUrl(reqUrl,'get',{},(res)=>{
				// 	if(res.code==200){
				// 		var playSetting = res.data.playSetting;
				// 		 this.lotteryMethodList.forEach((item)=>{	
				// 			 switch(item.bettingMethod){
				// 				 case "直选":
				// 					if(playSetting.zx==0){
				// 						that.disabledlotteryId.push(item.id);								
				// 					}
				// 					item.lotterySettingList.forEach((item1)=>{
				// 						if(item1.bettingRule=="直选和值" || item1.bettingRule=="和值"){
				// 							if(playSetting.zxhz==0){
				// 								that.disabledlotteryId.push("ls-"+item1.id);
				// 							}									
				// 						}
				// 					})
				// 					break;
				// 				case "复式":
				// 				case "复试":
				// 				case "通选":
				// 					if(playSetting.fs==0){
				// 						that.disabledlotteryId.push("lm-"+item.id);
				// 					}
				// 					break;
				// 				case "组三":								
				// 					if(playSetting.z3==0){
				// 						that.disabledlotteryId.push("lm-"+item.id);									
				// 					}
				// 					item.lotterySettingList.forEach((item1)=>{
				// 						if(item1.bettingRule=="组三和值"  || item1.bettingRule=="和值"){
				// 							if(playSetting.z3hz==0){
				// 								that.disabledlotteryId.push("ls-"+item1.id);
				// 							}
				// 						}
				// 						if (playSetting.z3dt == 0 && item1.bettingRule.indexOf("码拖") != -1){
				// 							that.disabledlotteryId.push("ls-"+item1.id);
				// 						}
				// 					})
				// 					break;
				// 				case "组六":
				// 					if(playSetting.z6==0){
				// 						that.disabledlotteryId.push("lm-"+item.id);										
				// 					}
				// 					item.lotterySettingList.forEach((item1)=>{
				// 						if(item1.bettingRule=="组六和值"  || item1.bettingRule=="和值"){
				// 							if(playSetting.z6hz==0){
				// 								that.disabledlotteryId.push("ls-"+item1.id);
				// 							}											
				// 						}
				// 						if (playSetting.z6dt == 0 && item1.bettingRule.indexOf("码拖") != -1){
				// 							that.disabledlotteryId.push("ls-"+item1.id);
				// 						}
				// 					})
				// 					break;
				// 				case "包选":
				// 					if(playSetting.bx==0){
				// 						that.disabledlotteryId.push("lm-"+item.id);
				// 					}
				// 					break;
				// 				case "跨度":
				// 					if(playSetting.kd==0){
				// 						that.disabledlotteryId.push("lm-"+item.id);
				// 					}
				// 					break;
				// 				case "独胆":
				// 					if(playSetting.dd==0){
				// 						that.disabledlotteryId.push("lm-"+item.id);
				// 					}
				// 					break;
				// 				case "和数":
				// 					if(playSetting.hs==0){
				// 						that.disabledlotteryId.push("lm-"+item.id);
				// 					}
				// 					break;
				// 				case "拖拉机":
				// 					if(playSetting.tlj==0){
				// 						that.disabledlotteryId.push("lm-"+item.id);
				// 					}
				// 					break;
				// 				case "1D":
				// 					if(playSetting.d1==0){
				// 						that.disabledlotteryId.push("lm-"+item.id);
				// 					}
				// 					item.lotterySettingList.forEach((item1)=>{
				// 						if(item1.bettingRule=="猜1D"){
				// 							if(playSetting.c1d==0){
				// 								that.disabledlotteryId.push("ls-"+item1.id);
				// 							}											
				// 						}
				// 					})
				// 					break;
				// 				case "2D":
				// 					if(playSetting.d2==0){
				// 						that.disabledlotteryId.push("lm-"+item.id);
				// 					}
				// 					item.lotterySettingList.forEach((item1)=>{
				// 						if(item1.bettingRule=="猜2D"){
				// 							if(playSetting.c2d==0){
				// 								that.disabledlotteryId.push("ls-"+item1.id);
				// 							}											
				// 						}
				// 					})
				// 					break;
				// 				case "大小":
				// 					if(playSetting.dx==0){
				// 						that.disabledlotteryId.push("lm-"+item.id);
				// 					}
				// 					break;
				// 				case "奇偶":
				// 					if(playSetting.jo==0){
				// 						that.disabledlotteryId.push("lm-"+item.id);
				// 					}
				// 					break;
				// 				case "猜三同":
				// 				case "三同号":
				// 					if(playSetting.c3t==0){
				// 						that.disabledlotteryId.push("lm-"+item.id);
				// 					}
				// 					break;
				// 			 }
						
				// 		 });
					
				// 	}
				// });
				// $.ajax({
				        //     url: HOST+"verifyLogin",
				        //     success: function (res) {
				        //         console.log("============cccccc");
				        //         if(res.code == 200){
				        //             var playSetting = res.data.playSetting;
				        //             if(playSetting.z3hz==1){
				        //                 $("#btn-hz").show();
				        //             }else {
				        //                 $("#btn-hz").hide();
				        //             }
				        //         }
				        //     }
				        // })

			},
			getHuiShuiRange(lsId){
				const _this = this;			
				var reqUrl = this.panUrl + "vip/draw/getHuiShuiRange"
				getRespDataWithUrl(reqUrl,'get',{
					lotteryMethodId:lsId
				},(res)=>{
					if(res.code==0){
						_this.huiShuiRange = res.data;
						this.$refs.huiShuiPopup.open();
					}
				})
			},
			popupChange(e){			
				this.overflowShow = e.show						
			},
			replaceEmptyHuiShui(hs){
				if(hs==null || hs=='' || hs=='null'){
					return 0;
				}else{
					return hs;
				}
			},
			
			showHuiShuiProp(settingItem,idx){
				var peiRateRangeList = settingItem.peiRateRangeList;
				this.huiShuiRange = peiRateRangeList;
				this.huiShuiValue = settingItem.huiShui;
				this.$refs.huiShuiPopup.open();
				this.currLotterySetting = settingItem;
				this.currLotterySettingIdx = idx;
				// this.huiShuiValue = this.currLotterySetting.huiShui;
				console.log("idx=========================",idx);
				// this.getHuiShuiRange(settingItem.lotteryMethodId)						
			},
			
			updateHuiShuiValue(e){
				const hsValue = e.detail.value;
				this.changeHuiShuiValue(hsValue);
			},
			
			saveModLotterySettings(newSetting){//保存修改后的配置
				var newArr = this.modLotterySettings.copyWithin(0,0);
				if(this.modLotterySettings.length>0){
					var exist = false;
					this.modLotterySettings.forEach((ls,idx)=>{
						if(ls.id == newSetting.id){
							newArr[idx]=newSetting;
							exist = true;
						}
					})
					if(!exist){
						newArr.push(newSetting)
					}
				}else{
					newArr.push(newSetting);
				}	
				this.modLotterySettings = newArr;								
			},
			refreshLotteryMethod(newSetting){//刷新页面的显示值
				for(var i=0,len=this.lotteryMethodList.length;i<len;i++){
					const dd = this.lotteryMethodList[i];
					if(dd.id == newSetting.lotteryMethodId){					
						var settings = dd.lotterySettingList;
						for(var j=0,len1=settings.length;j<len1;j++){							
							var oneSetting = settings[j];
							//console.log(oneSetting.id+"="+newSetting.id)
							if(oneSetting.id == newSetting.id){
								settings[j]=newSetting;	
								break
							}															
						}
						dd.lotterySettingList = settings;
						this.lotteryMethodList[i] = dd;						
						break;
					}
				}
			},
			
			changeHuiShuiValue(hsValue){
				//选中的回水值
				const _this = this;
				this.huiShuiValue = hsValue;	
				this.$refs.huiShuiPopup.close();
				var selectItem = null;
				this.huiShuiRange.forEach((item,idx)=>{
					if(item.earnWater==hsValue){
						selectItem = item;
					}
				})
				if(selectItem!=null){
					var odds = selectItem.peiRate;
					if(this.currLotterySettingIdx!=0){
						//只影响单条记录		
						this.currLotterySetting.huiShui = hsValue;
						this.currLotterySetting.vipPeiRate = odds;	
						this.saveModLotterySettings(this.currLotterySetting);	
						this.refreshLotteryMethod(this.currLotterySetting);
					}else{
						for(var i=0,len=this.lotteryMethodList.length;i<len;i++){
							const dd = this.lotteryMethodList[i];
							if(dd.id == this.currLotterySetting.lotteryMethodId){					
								var settings = dd.lotterySettingList;
								for(var j=0,len1=settings.length;j<len1;j++){							
									var oneSetting = settings[j];	
									var prRange = oneSetting.peiRateRangeList;
									oneSetting.huiShui = hsValue;
									prRange.forEach((tt,ii)=>{
										if(tt.earnWater == hsValue){
											oneSetting.vipPeiRate = tt.peiRate;
										}
									})								
									this.lotteryMethodList[i].lotterySettingList[j]=oneSetting;		
									this.saveModLotterySettings(oneSetting);
								}
								dd.lotterySettingList = settings;
								this.lotteryMethodList[i] = dd;
								break;
							}
						}								
					}			
				}
			},
		
			
			getFirstRate(rate){//获取多重赔率的第一个值
				if(rate==null || rate==""){
					return rate;
				}				
				if(rate.indexOf("/")<0){
					return rate;
				}else{
					const rateArr = rate.split("/");
					if(rateArr.length>0){
						return rateArr[0];
					}
					return ""
				}
			},
			editRate(parentRate,initRate,addValue,vipRate){
				//计算新的赔率值:上级赔率-初始赔率*回水
				//parentRate 上级赔率
				//initRate 初始赔率
				//addValue 回水
				//vipRate 会员的原始赔率
				//console.log("parentRate="+parentRate+",initRate="+initRate+",addValue="+addValue+",vipRate="+vipRate);
				var isMultiRate = false;
				
				if(parentRate.indexOf("/")>0){
					var rateArr = [];
					rateArr = parentRate.split("/");
					if(rateArr.length>0){
						parentRate = rateArr[0];
						isMultiRate = true;
					}
				}
				if(initRate.indexOf("/")>0){
					var rateArr = [];
					rateArr = initRate.split("/");
					if(rateArr.length>0){
						initRate = rateArr[0];
					}
				}
							
				var maxPeiRate = parseFloat(parentRate);
				var mp = (parseFloat(addValue)*initRate)
				var newRate = maxPeiRate-mp;			
				if(isMultiRate){
					var rateArr = [];
					rateArr = vipRate.split("/");
					rateArr[0] = newRate;
					return rateArr.join("/");
				}else{
					return newRate+"";
				}				
			},
			//单选框
			changeOddsType(oddsType){
				this.basicSetting.realOrTransformOdds=oddsType;
			},
			//下拉列表
			selectTypeChange() {
				let index = this.$refs.addRequestState.value
				console.log("每页笔数：" + index)
			},
			//提交
			submit(){
				var that = this;
				// if(this.modLotterySettings.length<1){
				// 	showToastTip("无修改数据");
				// 	return;
				// }
				uni.setStorageSync("saleName",this.basicSetting.saleName);
				var params = [];
				if(this.modLotterySettings.length>0){
					this.modLotterySettings.forEach((item,idx)=>{
						params.push({
							lotterySettingId:item.id,
							earnWater:item.huiShui,
							peiRate:item.vipPeiRate
						});
					})
					this.basicSetting.prSetList = params;				
				}
				
				uni.showLoading({
					title:that.$t("chulizhong"), //'正在更新...'
					mask:true 
				})
				var reqUrl = this.panUrl + "vip/app/vipInfo/upBasicSetting"
				getRespDataWithUrl(reqUrl,'POST',that.basicSetting,(res)=>{
					if(res.code==0){
						uni.showToast({
							title:that.$t("updateSuccess"), //'更新完成'
						})
						that.modLotterySettings=[];
					}else{
						showToastTip(res.msg);
					}
				})
				console.log("点击提交了")
			},
		
			lotteryMethodsTrans(){//此方法刷新玩法名称的国际化
				const that = this;
				// this.lotteryMethodList.forEach((item,idx)=>{
				// 	switch(item.id){
				// 		case "1":
				// 			item.bettingMethod=that.$t("ziliao.fixed-bit")
				// 			break;
				// 		case "2":
				// 			item.bettingMethod=that.$t("ziliao.ii-positioning")
				// 			break;
				// 		case "3":
				// 			item.bettingMethod=that.$t("ziliao.iii-positioning")
				// 			break;
				// 		case "4":
				// 			item.bettingMethod=that.$t("ziliao.iv-positioning")
				// 			break;
				// 		case "5":
				// 			item.bettingMethod=that.$t("ziliao.two-word-cash")
				// 			break;
				// 		case "6":
				// 			item.bettingMethod=that.$t("ziliao.three-word-present")
				// 			break;
				// 		case "7":
				// 			item.bettingMethod=that.$t("ziliao.four-word-present")
				// 			break;							
				// 	}
				// })
				//this.ruleName = this.lotterMethodList[this.lotteryMethodId-1].bettingMethod;
			},
		}
	}
</script>

<style>
	
	.tanchuang:active{
		background-color: #ebeb75 !important;
	}
	
	.ziliaoHeader{
		position: fixed;
		top:0;
		width:100%;
		background-color: #fff;
		z-index:8;
		
	}
	
	.ziliaoContent{
		padding-top:10rpx
	}
	
	.hsItem{
		height: 60rpx;
		color:white;
		line-height: 60rpx;
		width: 100%;
		text-align: center;
	}
	
	.hsPopup{
		background-color: #C22E2E;
		width: 200rpx;
		margin-bottom: 60rpx;
	}

	.hsItemActive{
		background-color: blueviolet;
	}
	.submit{
		height: 30px;
		width: 90px;
		line-height: 30px;
		margin: 0 auto;	
		border-radius: 10rpx;
		text-align: center;
		color: white;
		background-color: #8A2BCF;
	}
	.submit:active{
		background-color: #ebeb75 !important;
	}
	.content{
		font-size: 15px;
		padding-bottom: 10rpx;
	}
	.input-item{
		background-color:#E6E2E1;
		height: 40px;
		line-height: 40px;
		border-radius: 10rpx;
		margin-top: 5px;
	}
	.kbrow{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-bottom:5rpx;
	}
	.kbkey{
		height: 70rpx;
		width:16%;
		/* width: 80rpx; */
		line-height: 70rpx;
		background-color: blueviolet;
		color:white;
		flex-grow:1;
		margin-right:1%;
		text-align: center;
	}
	.tableCell{
		height: 50rpx;
		line-height: 50rpx;
		flex-grow: 1;
		border-top:1px solid #c7bbc3;
		border-bottom:1px solid #c7bbc3;
		border-left:1px solid #c7bbc3;
		text-align: center;
	}
	.tableCell3{
		width:33.3%
	}
	.tableCell4{
		width:25%
	}
	.thItem{
		background-color: #eeeeee;
		font-weight: bold;
	}
	.tdItem{
		/* background-color: #f7f7f7; */
		background-color: white;
		border-top:none;
	}
	.tdTypeItem{
		background-color: #C22E2E;
		border-top:none;
		color: white;
	}
	.thlast,.tdlast{
		border-right:1px solid #c7bbc3;
	}
	.typeName{
		color: red;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	.biaoti{
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
</style>
