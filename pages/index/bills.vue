<template>
	<view>
		
		<view class="billsHeader" :style="{'margin-top':cssHeights.headerMarginTop+'rpx'}">
			<view style="padding:5rpx;font-size: 28rpx;color:red;">{{$t('bills.tip')}}<!--提示：点击每行可查看每期的账单数据--></view>
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view class="tableCell tableCell4 thItem">{{$t('index.issue-no')}}</view>
				<view class="tableCell tableCell4 thItem">{{$t('kuaida.money')}}</view>
				<view class="tableCell tableCell4 thItem">{{$t('ziliao.backwater')}}</view>
				<view class="tableCell tableCell4 thItem">{{$t('mingxi.win-a-prize')}}</view>
				<view class="tableCell tableCell4 thItem">{{$t('bills.profit-and-loss')}}</view>
			</view>
		</view>
		
		<scroll-view :style="{'height':(cssHeights.contentHeight-cssHeights.bottomSaveArea)+'rpx','margin-top':cssHeights.contentMarginTop+'rpx'}" 
			scroll-y="true" @scrolltolower="nextPage" lower-threshold="0">
			<view v-for="(item, index) in dataList" :key="index" 
				style="display: flex;justify-content: space-between;align-items: center;" >
				<view class="tableCell tableCell4 tdItem start" :style="{'width':cssHeights.cellWidth+'rpx'}" @click="toMingXi(item)">{{item.drawId}}</view>
				<view class="tableCell tableCell4 tdItem" :style="{'width':cssHeights.cellWidth+'rpx'}" @click="showDetail(item,0)">{{item.totalMoney}}</view>
				<view class="tableCell tableCell4 tdItem" :style="{'width':cssHeights.cellWidth+'rpx'}" @click="showDetail(item,0)">{{item.huishui}}</view>
				<view class="tableCell tableCell4 tdItem" :style="{'width':cssHeights.cellWidth+'rpx'}" @click="showDetail(item,0)">{{item.drawMoney}}</view>
				<view class="tableCell tableCell4 tdItem last" :style="{'width':cssHeights.cellWidth+'rpx'}" @click="showDetail(item,0)">{{item.yingkui}}</view>
			</view>	
			<view style="display: flex;justify-content: space-between;align-items: center;"  @click="showDetail(null,1)">
				<view class="tableCell tableCell4 tdItem" :style="{'width':cssHeights.cellWidth+'rpx'}">{{$t('bills.total')}}</view>
				<view class="tableCell tableCell4 tdItem" :style="{'width':cssHeights.cellWidth+'rpx'}">{{heji.totalMoney}}</view>
				<view class="tableCell tableCell4 tdItem" :style="{'width':cssHeights.cellWidth+'rpx'}">{{heji.totalHs}}</view>
				<view class="tableCell tableCell4 tdItem" :style="{'width':cssHeights.cellWidth+'rpx'}">{{heji.drawMoney}}</view>
				<view class="tableCell tableCell4 tdItem last" :style="{'width':cssHeights.cellWidth+'rpx'}">{{heji.totalEarn}}</view>						
			</view>
		</scroll-view>
		
	</view>
	
	<!-- 弹窗 -->
	<uni-popup ref="drawInfoPopup" type="dialog" background-color="#fff">
		<view style="padding: 20rpx 10rpx;">
			<view style="margin-bottom: 10rpx;border-bottom:1px solid #f7f7f7 ;text-align: center;">
				<text v-if="popHeji">{{$t('bills.total')}}</text>
				<text v-else>{{drawInfo.drawId}}</text>
			</view>
			<view style="display: flex;flex-direction: column;justify-content: center;">
				<view class="searchCondiRow">
					<view style="color: #666666;"><text>{{$t('kuaida.money')}}</text></view>
					<view style="margin-left: 10rpx;">
						<text v-if="popHeji">{{heji.totalMoney}}</text>
						<text v-else>{{drawInfo.totalMoney}}</text>
					</view>						
				</view>
				<view class="searchCondiRow">
					<view style="color: #666666;"><text>{{$t('ziliao.backwater')}}</text></view>
					<view style="margin-left: 10rpx;">
						<text v-if="popHeji">{{heji.totalHs}}</text>
						<text v-else>{{drawInfo.huishui}}</text>
					</view>						
				</view>
				<view class="searchCondiRow">
					<view style="color: #666666;"><text>{{$t('mingxi.win-a-prize')}}</text></view>
					<view style="margin-left: 10rpx;">
						<text v-if="popHeji">{{heji.drawMoney}}</text>
						<text v-else>{{drawInfo.drawMoney}}</text>
					</view>						
				</view>
				<view class="searchCondiRow">
					<view style="color: #666666;"><text>{{$t('bills.profit-and-loss')}}</text></view>
					<view style="margin-left: 10rpx;">
						<text v-if="popHeji">{{heji.totalEarn}}</text>
						<text v-else>{{drawInfo.yingkui}}</text>
					</view>						
				</view>
			</view>
		</view>
	</uni-popup>
		
	
</template>

<script>
	import { getResponseData,showToastTip,getRespDataWithUrl  } from '@/api/req.js'
	export default {
		data() {
			return {
				langType:0,
				cssHeights:{
					headerMarginTop:0,
					headerHeight:100,
					contentMarginTop:0,
					contentHeight:0,
					bottomSaveArea:0,
					cellWidth:60,
					langHeight:40
				},
				loadingStatus:'more',
				dataList:[],
				tmpList:[],
				search:{
					pageSize:30,
					pageNo:1,
					pages:0
				},
				showMoreFlag:false,
				heji:{
					total:'',
					money:'',
					huishui:'',
					zhongjiang:'',
					yingkui:''
				},
				drawInfo:null,
				popHeji:false
			}
		},
		created() {
			const that = this;
			const topbarHeight = uni.getStorageSync("topbarHeight");
			const barHeight = uni.getStorageSync("statusBarH");
			this.cssHeights.headerMarginTop= topbarHeight+10;
			const winH = uni.getStorageSync("winH");
			const winW = uni.getStorageSync("winW");
			this.cssHeights.cellWidth = winW/5
			this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop+this.cssHeights.headerHeight; //单位rpx;
			this.cssHeights.contentHeight = winH+barHeight-this.cssHeights.contentMarginTop;
			this.cssHeights.bottomSaveArea = uni.getStorageSync("bottomSaveArea");
			const lang = uni.getStorageSync("lang");
			this.initLangType(lang);
			uni.$on('langChange',function(data){
				that.initLangType(data.lang);				
			})	
			this.getData();		
		},
		methods: {
			initLangType(lang){
				const winH = uni.getStorageSync("winH");
				const topbarHeight = uni.getStorageSync("topbarHeight");
				if(lang=='tai'){
					this.cssHeights.headerMarginTop =  topbarHeight+10+this.cssHeights.langHeight;
					this.cssHeights.headerHeight = 140;
					this.langType = 1			
				}else{
					this.langType = 0
					this.cssHeights.headerMarginTop =  topbarHeight+10;
					this.cssHeights.headerHeight = 100;
							
				}	
				this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop+this.cssHeights.headerHeight; //单位 rpx			
				this.cssHeights.contentHeight = winH+this.barHeight- this.cssHeights.contentMarginTop;		
			},
			toMingXi(item){
				uni.$emit("changeTabName",{tabName:'MingXi','drawNo':item.drawId,"drawId":item.id})
			},
			showDetail(item,isHeji){
				if(isHeji){
					this.popHeji = true;
					this.drawInfo = this.heji;
				}else{
					this.popHeji = false;
					this.drawInfo = item;
				}				
				this.$refs.drawInfoPopup.open()
			},
			getData(){
				const _this = this;
				var panUrl = uni.getStorageSync("panUrl");
				var reqUrl = panUrl+"vip/bill/list"
				getRespDataWithUrl(reqUrl,'POST',{},(res)=>{
					if(res.code==0){
						const list = res.data.dataList;		
						_this.heji = res.data.heji
						list.forEach((item,idx)=>{
							_this.dataList.push(item);
							_this.tmpList.push(item);
						});
					}
				})
			},
			nextPage(){
				if(this.search.pageNo>this.search.pages){
					this.loadingStatus="noMore";	
				}else{
					this.search.pageNo++;
					this.loadingStatus = "loading";
					this.getData();
				}
			}
		}
	}
</script>

<style>
	
	.billsHeader{
		position: fixed;
		top:0;
		width:100%;
		background-color: #fff;
		z-index:8;
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
		height: 80rpx;
		line-height: 80rpx;
		/* //height: 80rpx; */
		/* //line-height: 80rpx; */
		flex-grow: 1;
		border-top:1px solid gray;
		border-bottom:1px solid gray;
		border-left:1px solid gray;
		text-align: center;
		text-overflow: ellipsis;
	}
	.tableCell3{
		width:33.3%
	}
	.tableCell4{
		width:25%;
		text-overflow: ellipsis;
	}
	.thItem{
		background-color: #eeeeee;
		font-weight: bold;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	.tdItem{
		background-color: #f7f7f7;
		border-top:none;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.thlast,.tdlast{
		border-right:1px solid gray;
	}
	.start{
		color: red;
	}
</style>
