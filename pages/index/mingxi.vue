<template>
	<view>
		<view class="mingxiHeader" :style="{'margin-top':cssHeights.headerMarginTop+'rpx'}">
			<view style="display: flex;justify-content: center;padding:5rpx 0rpx;height: 80rpx;align-items: center;" v-if="langType==0">
				<view v-if="isBillDetail">
					<text v-if="mingxiType==1">{{$t("kuaida.section")}}{{search.drawId==''?drawNo:search.drawId}}{{$t("kuaida.stage")}}{{$t("xiazhu.detail")}}</text>
					<text v-else>{{$t("kuaida.section")}}{{search.drawId==''?drawNo:search.drawId}}{{$t("kuaida.stage")}}{{$t("zhongjiang.detail")}}</text>
				</view>
				<view v-else>
					<text v-if="mingxiType==1">{{$t('mingxi.current-betting-details')}}</text>
					<text v-else>{{$t('mingxi.details-of-current-lottery-winners')}}</text>
				</view>
				<view class="btnStyle linerBtn" @click="toSearch()" >{{$t('mingxi.search')}}</view>
				<view class="btnStyle linerBtn" @click="showPrizeWinList()" >{{$t('mingxi.win-a-prize')}}</view>
				<view class="btnStyle linerBtn" @click="backoutCode()" v-if="!isBillDetail" >{{$t('kuaida.backout')}}</view>
			</view>
			
			<view style="display: flex;flex-direction:column;justify-content: center;padding:5rpx 0rpx;height: 120rpx;align-items: center;" v-if="langType==1">
				<view v-if="isBillDetail">
					<text v-if="mingxiType==1">{{$t("kuaida.section")}}{{search.drawId==''?drawNo:search.drawId}}{{$t("kuaida.stage")}}{{$t("xiazhu.detail")}}</text>
					<text v-else>{{$t("kuaida.section")}}{{search.drawId==''?drawNo:search.drawId}}{{$t("kuaida.stage")}}{{$t("zhongjiang.detail")}}</text>
				</view>
				<view v-else>
					<text v-if="mingxiType==1">{{$t('mingxi.current-betting-details')}}</text>
					<text v-else>{{$t('mingxi.details-of-current-lottery-winners')}}</text>
				</view>
				<view style="display: flex;justify-content: center;">
					<view class="btnStyle linerBtn" @click="toSearch()">{{$t('mingxi.search')}}</view>
					<view class="btnStyle linerBtn" @click="showPrizeWinList()">{{$t('mingxi.win-a-prize')}}</view>
					<view class="btnStyle linerBtn" @click="backoutCode()" v-if="!isBillDetail">{{$t('kuaida.backout')}}</view>
				</view>
			</view>
			
			<view style="height: 60rpx;">
				<view style="display: flex;justify-content: space-between;align-items: center;background-color: #eee;">
					<view class="colHeadItem">{{$t('kuaida.number')}}</view>
					<view class="colHeadItem">{{$t('kuaida.money')}}</view>
					<view class="colHeadItem">{{$t('kuaida.odds')}}</view>
					<view class="colHeadItem">{{$t('mingxi.win-a-prize')}}</view>
					<view class="colHeadItem">{{$t('mingxi.state')}}
						<checkbox style="transform: scale(0.8);" @click="selectAll()" :checked="selectAllFlag" v-if="!isBillDetail"></checkbox>
						</view>
				</view>
			</view>			
		</view>
		
		
		<scroll-view class="dataView" :style="{'margin-top':(cssHeights.contentMarginTop)+'rpx','height':(cssHeights.contentHeight-cssHeights.bottomSaveArea)+'rpx'}" scroll-y="true" @scrolltolower="nextPage" lower-threshold="0">
			<checkbox-group @change="addBackoutCodes">
				<view v-for="(item,index) in datalist">	
						<view class="colItem-bp-title" :class="[index==0?'topLine':'',item.backCodeFlag==1?'dataRow codeBackRow':'dataRow']" v-show="item.huizongFlag==1">
							<text style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.huizongName}}</text>
						</view>
						<view :class="[item.backCodeFlag==1?'dataRow codeBackRow':'dataRow']" style="display: flex;">
							<view :class="[index==0?'topLine':'']" class="colItem" style="display: flex;overflow-x: scroll;">
								<text v-show="item.huizongFlag==0 || item.huizongFlag==-1" style="margin: auto;">{{getCodeName(item,"|")}}</text>	
								<text v-show="item.huizongFlag==1" style="text-decoration: underline;color:#0A84FF;font-size: 28rpx;margin: auto;" @click="toBpDetail(item)">查看号码</text>	
							</view>
							<view :class="[index==0?'topLine':'']" class="colItem"><text>{{item.param1}}</text></view>
							<view :class="[index==0?'topLine':'']" class="colItem">
								<text v-show="item.huizongFlag==0 || item.huizongFlag==-1">{{item.param3}}</text>
								<text v-show="item.huizongFlag==1" @click="toBpDetail(item)" style="text-decoration: underline;color:#0A84FF;font-size: 28rpx;">查看赔率</text>
							</view>
							<view :class="[index==0?'topLine':'']" class="colItem"><text>{{item.drawMoney}}</text></view>
							<view :class="[index==0?'topLine':'']" class="colItem">					
									<text v-if="item.backCodeFlag!=1" style="color: blueviolet;"><!-- 成功 -->{{$t("mingxi.success")}}</text>
									<text v-if="item.backCodeFlag==1"><!-- 已退码 -->{{$t("kuaida.codeBack")}}</text>
									<checkbox style="transform: scale(0.8);" :value="item.id"
										v-if="item.codesFrom!=10 && item.backCodeFlag!=1 && item.backCodeStatus==1 && !isBillDetail && openStatus==1" :checked="item.checked"></checkbox>
							</view>	
						</view>
				</view>
			</checkbox-group>
			<!-- 此处增加分页加载提示 -->
			<uni-load-more v-if="loadMore" iconType="circle" :status="loadingStatus" />
			<view v-else-if="datalist.length==0" style="text-align: center;margin-top: 10rpx;">
				<text><!-- 暂无数据 -->{{$t("noData")}}</text>
			</view>
		</scroll-view>
		
		
		<!-- 弹窗 -->
		<uni-popup ref="searchPopup" type="dialog" background-color="#fff">
			<view style="padding: 20rpx 10rpx;">
				<view style="margin-bottom: 10rpx;border-bottom:1px solid #f7f7f7 ;text-align: center;"><text>{{$t('mingxi.detail-search')}}</text></view>
				<view style="display: flex;flex-direction: column;justify-content: center;">
					<view class="searchCondiRow">
						<view style="color: #666666;"><text>{{$t('mingxi.look-up-the-number')}}</text></view>
						<view style="margin-left: 10rpx;"><input v-model="search.buyCodes" class="rangeInput"></view>											
					</view>
					
					<view class="searchCondiRow" v-if="langType==0">
						<view style="color: #666666;"><text>{{$t('mingxi.list')}}</text></view>
						<view style="margin-left: 10rpx;">
							<picker mode="selector" :range="colTypeArray" range-key="name" :value="search.colType" 
								@change="changeColType">
								<view class="uni-input">{{colTypeArray[search.colType].name}}<uni-icons type="bottom" size="20"></uni-icons></view>										
							</picker>
						</view>
						<view style="display: flex;justify-content:  flex-start;margin-left: 20rpx;">
							<input v-model="search.minValue" class="rangeInput">&nbsp;&nbsp;<text>-</text>&nbsp;&nbsp;<input v-model="search.maxValue" class="rangeInput">
						</view>
					</view>
					
					<view class="searchCondiRow" v-if="langType==1" style="flex-direction: column;align-items: flex-start;">
						<view style="color: #666666;display: flex;">
							<view style=""><text>{{$t('mingxi.list')}}</text></view>
							
							<view style="margin-left: 20rpx;">
								<picker mode="selector" :range="colTypeArray" range-key="name" :value="search.colType"
									@change="changeColType">
									<view class="uni-input">{{colTypeArray[search.colType].name}}<uni-icons type="bottom" size="20"></uni-icons></view>										
								</picker>
							</view>
						</view>
						<view style="margin-top:10rpx">
							<view style="display: flex;justify-content:  flex-start;">
								<input v-model="search.minValue" class="rangeInput">&nbsp;&nbsp;<text>-</text>&nbsp;&nbsp;<input v-model="search.maxValue" class="rangeInput">
							</view>
						</view>
						
					</view>
					
					
					<view class="searchCondiRow">
						<view style="color:#666666"><text>{{$t('mingxi.classification')}}</text></view>
						<view style="margin-left: 10rpx;">
							<picker mode="selector" :range="dataTypeArray" range-key="name" :value="search.itemOptType" 
							@change="changeDataType">
							<view class="uni-input">{{dataTypeArray[search.itemOptType].name}}<uni-icons type="bottom" size="20"></uni-icons></view>	
							
						</picker>
						</view>
					</view>
					<view style="display: flex;justify-content: flex-end;padding: 10rpx 0rpx">
						<view @click="hideSearchPopup" class="anniu" style="margin-right: 40rpx;"><text>{{$t('mingxi.cancel')}}</text></view>
						<view @click="saveSearchCondi" class="anniu" style="margin-right: 20rpx;color:blueviolet"><text>{{$t('kuaida.determine')}}</text></view>
					</view>
				</view>
			</view>
		</uni-popup>
	
	</view>
</template>

<script>
	import { getResponseData, showToastTip,getRespDataWithUrl } from "@/api/req.js"
	export default {
		data() {
			return {
				"mingxiType":1, //1：下注；2：中奖
				"backoutCodesList":[],
				"datalist":[], //明细列表
				"search":{
					"buyCodes":"",
					"colType":0,
					"dataType":0,
					"minValue":'',
					"maxValue":'',
					"drawId":'',
					"lotterySettingsId":"",
					"lotteryMethodId":"",
					"codeWinType":0,
					"pageNo":1,
					"pageSize":30,
					"itemOptType":0
				},
				"colTypeArray":[
					{"id":0,"name":this.$t("kuaida.odds")}, //"赔率"
					{"id":1,"name":this.$t("kuaida.money")},//"金额"
					{"id":2,"name":this.$t("kuaida.backout")}//"退码"
				],
				"otherTypeArr":[],
				"dataTypeArray":[
						
				],
				drawId:'',
				drawNo:'',
				openStatus:1,
				totalPages:0,
				loadMore:true,
				loadingStatus:'',
				loadMoreTip:'',
				cssHeights:{
					barHeight:0,
					headerMarginTop:0,
					headerHeight:150,
					contentMarginTop:0,
					contentHeight:0,
					bottomSaveArea:0,
					cellWidth:60,
					langHeight:40
				},
				selectAllFlag:false,
				isBillDetail:false,
				langType:0,
				billDrawNo:'',
				panUrl:""
			}
		},
		created(){
			this.panUrl = uni.getStorageSync("panUrl");
			const topbarHeight = uni.getStorageSync("topbarHeight");
			const barHeight = uni.getStorageSync("statusBarH");
			this.cssHeights.headerMarginTop = topbarHeight;
			this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop + this.cssHeights.headerHeight;
			const winH = uni.getStorageSync("winH");
			const winW = uni.getStorageSync("winW");
			this.cssHeights.cellWidth = winW/5
			this.cssHeights.contentHeight = winH+barHeight-this.cssHeights.contentMarginTop; //单位rpx;
			this.cssHeights.bottomSaveArea = uni.getStorageSync("bottomSaveArea");
			
			this.billDrawNo = uni.getStorageSync("billDrawNo");
			const billDrawId = uni.getStorageSync("billDrawId");
			if(null!=this.billDrawNo && undefined!=this.billDrawNo && 'undefined'!=this.billDrawNo){
				this.search.drawId = this.billDrawNo;
				if(this.drawNo == this.billDrawNo){
					this.isBillDetail = false;
				}else{
					this.isBillDetail = true;
				}
			}else{
				this.isBillDetail = false
			}
			this.getUnopenPrizeInfo();
			
			const that = this;
			uni.$on('drawOpenStatus',function(data){
				//console.log('监听到事件来自 drawOpenStatus ，携带参数 msg 为：' + data);
				var drawInfo = JSON.parse(data);
				var dno = drawInfo.drawNo;
				that.openStatus = drawInfo.openStatus;
				
				if(dno!=that.drawNo){
					if(that.openStatus==2 || that.openStatus==3){
						that.drawNo = dno;
						that.drawId = drawInfo.id;		
						that.datalist=[];
						that.search.pageNo = 1;
						that.search.codeWinType=0;
						that.getLotterySettings();
						that.sendSearchReq();
					}
				}
				if(dno == that.billDrawNo){
					that.isBillDetail = false;
				}
			})	
			
			const lang = uni.getStorageSync("lang");
			this.initLangType(lang)
			uni.$on('langChange',function(data){
				that.initLangType(data.lang);	
				that.getLotterySettings();
				//that.lotteryMethodsTrans();
			})
			
		},
		onUnload() {
		},
		methods: {
			
			getCodeName(item,splitChar){
				switch(item.lotteryMethodId){
					case '1':
						return 'ZX'+splitChar+item.buyCodes;
					case '2':
						return 'TX'+splitChar+item.buyCodes;
					case '3':
						return 'Z3'+splitChar+item.buyCodes;
					case '4':
						return 'Z6'+splitChar+item.buyCodes;
					case '8':
						return 'BX'+splitChar+item.buyCodes;
					case '6':
						return '1D'+splitChar+item.buyCodes;
					case '7':
						return '2D'+splitChar+item.buyCodes;
					case '5':
						return 'HS'+splitChar+item.buyCodes;
					case '13':
						return 'KD'+splitChar+item.buyCodes;
					case '13':
						return 'DD'+splitChar+item.buyCodes;

					default:
						return item.buyCodes;
				}
			},
			initLangType(lang){
				const topbarHeight = uni.getStorageSync("topbarHeight");
				const winH = uni.getStorageSync("winH");
				const barHeight = uni.getStorageSync("statusBarH");
				if(lang=='tai'){
					this.cssHeights.headerMarginTop= topbarHeight + this.cssHeights.langHeight
					this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop+this.cssHeights.headerHeight + 40; 
					this.langType = 1			
				}else{
					this.langType = 0
					this.cssHeights.headerMarginTop= topbarHeight
					this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop+this.cssHeights.headerHeight; //单位 rpx
				}				
				
				this.cssHeights.contentHeight = winH+barHeight-this.cssHeights.contentMarginTop;		
			
			},
			
			//获取最新一期未开奖的信息
			getUnopenPrizeInfo(){
				const _this = this;
				var reqUrl = this.panUrl +"vip/code/unOpenPrize";
				getRespDataWithUrl(reqUrl,"get",{},function(res){
					if(res.code==0){
						if(res.data.draw!=null){
							_this.drawNo = res.data.draw.drawId;
							_this.drawId = res.data.draw.id;	
							_this.openStatus = res.data.draw.openStatus;
							//_this.search.drawId = _this.drawNo;
							_this.getLotterySettings();
							_this.sendSearchReq();							
						}
					}
				})
			},
			selectAll(){
				var that = this;
				var counts = 0;
				this.selectAllFlag = !this.selectAllFlag;
				this.datalist.forEach((item,idx)=>{
					item.checked=that.selectAllFlag;
				})	
				this.backoutCodesList = [];
				if(this.selectAllFlag){
					this.datalist.forEach((item,idx)=>{
						if(item.backCodeFlag!=1 && item.backCodeStatus==1){
							that.backoutCodesList.push(item.id);
						}
					})	
				}
			},
			addBackoutCodes(e){//添加选中的号码
				this.backoutCodesList = e.detail.value;
				var totalChecks = 0;
				this.datalist.forEach((item,idx)=>{
					if(item.backCodeFlag!=1 && item.backCodeStatus==1){
						totalChecks++;
					}
				})	
				if(totalChecks==this.backoutCodesList.length){
					this.selectAllFlag = true;
				}else{
					this.selectAllFlag = false;
				}			
			},
			showPrizeWinList(){//展示中奖的明细
				this.mingxiType = 2;
				this.search.colType = 0;	
				this.search.pageNo = 1;
				this.search.codeWinType=1;
				this.loadMore = true;
				this.loadingStatus='more'
				this.datalist=[]
				this.sendSearchReq();
			},
			backoutCode(){//退码
				var that = this;
				if(this.backoutCodesList.length<1){
					uni.showToast({
						title:that.$t("kuaida.noCodeSelect"), //'未选择号码'
						icon:"error"
					})
					return;
				}
				uni.showLoading({
					title:that.$t("chulizhong")
				})
				const _this = this;
				var reqUrl = this.panUrl+"vip/draw/delUnbuyCode"
				getRespDataWithUrl(reqUrl,'POST',{
					idArr:_this.backoutCodesList,
					drawId:_this.drawNo+""
				},(res)=>{
					if(res.code==0){
						if(res.count>0){
							uni.showToast({
								title:_this.$t("kuaida.backError"), //'部分号码无法退回'
								icon:"error"
							})
						}
						uni.$emit('updateCredit',{data:''})
						_this.search.pageNo=1;
						_this.datalist=[];
						_this.backoutCodesList=[];
						_this.selectAllFlag = false;
						this.loadingStatus='more'
						this.loadMore = true;
						_this.sendSearchReq();
					}else{
						showToastTip(res.msg)
					}
				})
			},
			toSearch(){
				//this.search.codeWinType=0;
				this.$refs.searchPopup.open()
			},
			hideSearchPopup(){
				this.$refs.searchPopup.close()
			},
			saveSearchCondi(){
				//调用接口获取数据
				this.search.pageNo=1;
				this.loadingStatus='more'
				this.loadMore = true;
				this.datalist=[];
				this.sendSearchReq();
				this.$refs.searchPopup.close()			
			},
			changeDataType(e){ //数据分类
				const idx = e.detail.value;
				const da = this.dataTypeArray[idx];
				if(da.type==-1){
					this.search.lotteryMethodId = da.id;
					this.search.lotterySettingsId ='';
					this.search.dataType=-1
				}else if(da.type==-2){
					this.search.lotteryMethodId = "";
					this.search.lotterySettingsId = da.id;
					this.search.dataType=-1
				}else{
					this.search.lotterySettingsId ='';
					this.search.lotteryMethodId = "";
					this.search.dataType = da.type;	
				}
				this.search.itemOptType = idx;
							
			},
			changeColType(e){
				console.log(e.detail.value);
				this.search.colType = e.detail.value;
			},
			sendSearchReq(){
				const _this = this;
				_this.loadingStatus='loading'	
				var reqUrl = this.panUrl+"vip/v1/draw/searchByPageV1"
				getRespDataWithUrl(reqUrl,'POST',_this.search,(res)=>{
					if(res.code==0){					
						_this.totalPages = Math.ceil(res.count/_this.search.pageSize);
						const dl = res.data.dataList;
						dl.forEach((item,idx)=>{
							item.checked=false;
							_this.datalist.push(item);
						})	
						if(_this.totalPages>1){
							if(_this.search.pageNo>=_this.totalPages){
								_this.loadMore = false;
								_this.loadingStatus='noMore'
								_this.loadMoreTip = _this.$t("noDataLoad"); //'没有数据了'
							}else{
								_this.loadMore = true;
								_this.loadingStatus='more'
							}
						}else{
							_this.loadingStatus='more'
							_this.loadMore = false;
						}
					}else{
						
					}
				})								
								
			},
			checkPrizeWin(item){//是否中奖
				if(item.drawStatus!=0){
					return item.drawMoney;
				}else{
					return "--"
				}
			},
			nextPage(){
				if(this.loadMore){
					this.search.pageNo++;
					this.sendSearchReq()
				}		
			},
		
			getLotterySettings(){
				const _this = this;
				this.dataTypeArray = [{"id":0,"name":this.$t("all"),"type":0,"idx":0}]; //全部
				var reqUrl = this.panUrl+"vip/draw/lotterySettings"
				getRespDataWithUrl(reqUrl,"get",{
					lotterType:1
				},(res)=>{
					var settingList = [];
					if(res.code==0){
						res.data.forEach((item,idx)=>{
							var bmName = "";
							if(item.openFlag==1){
								_this.dataTypeArray.push({
									id:item.id,
									name:item.bettingMethod,
									type:-1,
									idx:_this.dataTypeArray.length
								})
								if(item.lotterySettingList.length>1){
									item.lotterySettingList.forEach((it,ix)=>{
										_this.dataTypeArray.push({
											id:it.id,
											name:it.bettingRule,
											type:-2,
											idx:_this.dataTypeArray.length
										})
									})
								}
							}															
						})
						_this.otherTypeArr.forEach((item,idx)=>{
							_this.dataTypeArray.push(item)
						})
						//_this.lotteryMethodsTrans();
					}					
				})
			},
			lotteryMethodsTrans(){//此方法刷新玩法名称的国际化
			// 	var that = this;
			// 	this.dataTypeArray.forEach((item,idx)=>{
			// 		if(item.type==-1){
			// 			switch(item.id){
			// 				case "1":
			// 					item.name=that.$t("ziliao.fixed-bit")
			// 					break;
			// 				case "2":
			// 					item.name=that.$t("ziliao.ii-positioning")
			// 					break;
			// 				case "3":
			// 					item.name=that.$t("ziliao.iii-positioning")
			// 					break;
			// 				case "4":
			// 					item.name=that.$t("ziliao.iv-positioning")
			// 					break;
			// 				case "5":
			// 					item.name=that.$t("ziliao.two-word-cash")
			// 					break;
			// 				case "6":
			// 					item.name=that.$t("ziliao.three-word-present")
			// 					break;
			// 				case "7":
			// 					item.name=that.$t("ziliao.four-word-present")
			// 					break;	
			// 				case 0:
			// 					item.name = that.$t("all")
			// 					break;
			// 			}
			// 		}else if(item.type==2){
			// 			item.name = that.$t("index.hurry-up")
			// 		}else if(item.type==3){
			// 			item.name = that.$t("index.quick-selection")
			// 		}	else if(item.type==5){
			// 			item.name = that.$t("index.import")
			// 		}	else if(item.type==6){
			// 			item.name = that.$t("index.erding")
			// 		}	else if(item.type==7){
			// 			item.name = that.$t("index.huizongbiao")
			// 		}				
			// 	})
			
			// 	this.colTypeArray=[
			// 		{"id":0,"name":this.$t("kuaida.odds")}, //"赔率"
			// 		{"id":1,"name":this.$t("kuaida.money")},//"金额"
			// 		{"id":2,"name":this.$t("kuaida.backout")}//"退码"
			// 	]
				
				// "otherTypeArr":[
				// 	{"id":2,"name":this.$t("index.hurry-up"),"type":2,"idx":2}, //"快打"
				// 	{"id":3,"name":this.$t("index.quick-selection"),"type":3,"idx":3}, //"快选"
				// 	{"id":5,"name":this.$t("index.import"),"type":5,"idx":5}, //"导入"
				// 	{"id":6,"name":this.$t("index.erding"),"type":6,"idx":6}, //"二字定"
				// 	{"id":7,"name":this.$t("index.huizongbiao"),"type":7,"idx":7}, //"汇总表"
				// ],
			},	
		
			toBpDetail(item){//包牌号码明细	
				const params = {
					baopaiId:item.id,
					drawId:this.search.drawId,
					bpGroup:item.huizongName					
				}
				uni.navigateTo({
					url:'/pages/index/mingxi/bpCodes?ps='+encodeURIComponent(JSON.stringify(params))
				})
			}
		}
	}
</script>

<style>
	
	.mingxiHeader{
		position: fixed;
		top:0;
		width:100%;
		background-color: #fff;
		z-index:8;
	}

	.dataRow{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
	}
	
	.codeBackRow{
		background-color:orangered;
		color: white;
	}
	
	.searchCondiRow{
		display: flex;
		justify-content: flex-start;
		padding:20rpx 0rpx;
		border-bottom:1px solid #aaaaaa;
	}
	
	.rangeInput{
		border:1px solid #f7f7f7;
		background-color: bisque;
		width:140rpx;
		padding:3rpx;
		
	}
	.colHeadItem{
		width:20%;
		border-right:1px solid #999999;
		border-top:1px solid #999999;
		border-bottom: 1px solid #999999;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.colItem{
		width:20%;
		border-right:1px solid #999999;	
		border-bottom: 1px solid #999999;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;

	}
	
	.colItem-bp{
		width:20%;
		border-right:1px solid #999999;	
		border-bottom: 1px solid #999999;
		text-align: center;
		height: 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.colItem-bp-title{
		width:100%;
		border-right:1px solid #999999;	
		border-bottom: 1px solid #999999;
		text-align: left;
		height: 60rpx;
		line-height: 60rpx;
		font-weight: bolder;
		padding-left:10rpx;
	}
	
	.topLine{
		border-top:1px solid #999999;
	}
	
	.btnStyle{
		height: 60rpx;
		width:100rpx;
		line-height: 60rpx;
		background-color: blueviolet;
		margin-left:10rpx;
		border-radius: 5px;
		color: white;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.btnStyle:active{
		background-color: #ebeb75 !important;
	}
	.anniu:active{
		/* background-color: #ebeb75 !important; */
		color: red;
	}
	
	>>>.uni-popup .uni-popup__wrapper {
	    width: 80% !important;
	    /* padding: 40rpx; */
	}

</style>
