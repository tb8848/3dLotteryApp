<template>
	<view>
		<uni-nav-bar dark :fixed="true" shadow status-bar
					:title="title" backgroundColor="#8150CA" leftIcon="back" @clickLeft="backTo"/> <!--包牌号码 -->
					
		<view>
			<view style="height: 60rpx;">
				<view style="display: flex;justify-content: space-between;align-items: center;background-color: #eee;">
					<view class="colHeadItem">{{$t('kuaida.number')}}</view>
					<view class="colHeadItem">{{$t('kuaida.money')}}</view>
					<view class="colHeadItem">{{$t('kuaida.odds')}}</view>
					<view class="colHeadItem">{{$t('mingxi.win-a-prize')}}</view>
					<view class="colHeadItem">{{$t('mingxi.state')}}</view>
				</view>
			</view>			
		</view>
		
		<scroll-view class="dataView" :style="{'height':(cssHeights.contentHeight-cssHeights.bottomSaveArea)+'rpx'}" 
			scroll-y="true" @scrolltolower="nextPage" lower-threshold="0">
			
			<view v-for="(item,index) in datalist" 
				:class="[item.backCodeFlag==1?'dataRow codeBackRow':'dataRow']">
			
					<view class="colItem" :class="[index==0?'topLine':'']"><text>{{item.buyCodes}}</text></view>
					<view class="colItem" :class="[index==0?'topLine':'']"><text>{{item.buyMoney}}</text></view>
					<view class="colItem" :class="[index==0?'topLine':'']"><text>{{item.param3}}</text></view>
					<view class="colItem" :class="[index==0?'topLine':'']"><text>{{item.drawMoney}}</text></view>
					<view class="colItem" :class="[index==0?'topLine':'']">					
							<text v-if="item.backCodeFlag!=1" style="color: blueviolet;"><!-- 成功 -->{{$t("mingxi.success")}}</text>
							<text v-if="item.backCodeFlag==1"><!-- 已退码 -->{{$t("kuaida.codeBack")}}</text>
					</view>					
			</view>
		
			<!-- 此处增加分页加载提示 -->
			<uni-load-more v-if="loadMore" iconType="circle" :status="loadingStatus" />
			<view v-else-if="datalist.length==0" style="text-align: center;margin-top: 10rpx;"><text><!-- 暂无数据 -->{{$t("noData")}}</text></view>
		</scroll-view>
		
					
	</view>
</template>

<script>
	import { getResponseData, showToastTip,getRespDataWithUrl } from "@/api/req.js"
	export default {
		data() {
			return {
				datalist:[],
				title:'',
				drawNo:'',
				bpGroup:'',
				search:{
					drawId:'',
					baopaiId:'',
					pageNo:1,
					pageSize:30,
					pages:0,
					total:0
				},
				loadMore:true,
				loadingStatus:'',
				loadMoreTip:'',
				cssHeights:{
					headerMarginTop:0,
					headerHeight:60,
					contentMarginTop:0,
					contentHeight:0,
					bottomSaveArea:0,
					cellWidth:60,
					langHeight:40,
					panUrl:""
				},
			}
		},
		onLoad(options) {
			this.panUrl = uni.getStorageSync("panUrl");
			const params = JSON.parse(decodeURIComponent(options.ps));
			const baopaiId = params.baopaiId;
			const drawNo = params.drawId;
			var bpGroup = params.bpGroup;
			this.search.baopaiId = baopaiId;
			this.search.drawId = drawNo;
			this.title = bpGroup;
			const topbarHeight = uni.getStorageSync("topbarHeight");
			const barHeight = uni.getStorageSync("statusBarH");
			this.cssHeights.headerMarginTop = topbarHeight;
			this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop + this.cssHeights.headerHeight;
			const winH = uni.getStorageSync("winH");
			const winW = uni.getStorageSync("winW");
			this.cssHeights.cellWidth = winW/5
			this.cssHeights.contentHeight = winH+barHeight-this.cssHeights.contentMarginTop; //单位rpx;
			this.cssHeights.bottomSaveArea = uni.getStorageSync("bottomSaveArea");
			
			this.sendSearchReq();
		},
		methods: {
			backTo(){
				uni.navigateBack({
					
				})
			},
			nextPage(){
				if(this.loadMore){
					this.loadingStatus="loading"
					this.search.pageNo++;
					this.sendSearchReq()
				}			
			},					
			sendSearchReq(){
				const _this = this;
				_this.loadingStatus='loading'
				var reqUrl = this.panUrl+"vip/v1/draw/bpcodes"
				getRespDataWithUrl(reqUrl,'POST',_this.search,(res)=>{
					if(res.code==0){						
						const dl = res.data;
						_this.search.total = res.count;
						_this.search.pages = Math.ceil(res.count/_this.search.pageSize);
						if(_this.search.pages>1){
							_this.loadMore = true;
							if(_this.search.pageNo>=_this.search.pages){
								_this.loadMore = false;
								_this.loadingStatus='noMore'
								_this.loadMoreTip = _this.$t("noDataLoad"); //'没有数据了'
							}else{
								_this.loadingStatus='more'
							}
						}else{
							_this.loadMore = false;
						}
						
						dl.forEach((item,idx)=>{
							_this.datalist.push(item);
						})																		
					}else{
						showToastTip(res.msg);
					}
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
		background-color:indianred;
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
	}
	
	.topLine{
		border-top:1px solid #999999;
	}
	
	.btnStyle{
		height: 60rpx;
		width:80rpx;
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
