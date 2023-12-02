<template>
	<view>
		<uni-nav-bar dark  :fixed="true" status-bar :title="$t('index.lottery-number')"
		leftIcon="back" @clickLeft="backTo" backgroundColor="#8150CA"/> <!--开奖号码 -->
		
		<view style="display: flex;justify-content: space-between;">
			<view class="tableCell tableCell4 thItem">{{$t('kuaida.time')}}</view>
			<!-- <view class="tableCell tableCell2 thItem">{{$t('index.issue-no')}}</view> -->
			<view class="tableCell tableCell4 thItem">佰</view>
			<view class="tableCell tableCell4 thItem">拾</view>
			<view class="tableCell tableCell4 thItem">个</view>
		</view>
		<view v-for="(item,index) in dataList" :key="index" style="display: flex;justify-content: space-between;align-items: center;">
			<view class="tableCell tableCell4 tdItem time">{{item.time}}</view>
			<!-- <view class="tableCell tableCell2 tdItem">{{item.drawId}}</view> -->
			<view class="tableCell tableCell4 tdItem" style="display: flex;justify-content: center;">
				<view :class="item.drawStatus!=0?'hongse yuanquan':'yuanquan huise'">{{item.num1}}</view>
			</view>
			<view class="tableCell tableCell4 tdItem" style="display: flex;justify-content: center;">
				<view :class="item.drawStatus!=0?'zise yuanquan':'yuanquan huise'">{{item.num2}}</view>
			</view>
			<view class="tableCell tableCell4 tdItem" style="display: flex;justify-content: center;">
				<view :class="item.drawStatus!=0?'hongse yuanquan':'yuanquan huise'">{{item.num3}}</view>
			</view>
		
		</view>
		
	</view>
</template>

<script>
	
	import { getResponseData,getRespDataWithUrl } from "@/api/req.js";
	
	export default {
		data() {
			return {
				curPageNo:1,
				pageSize:70,
				dataList:[],
				panUrl:""
			}
		},
		onLoad(){
			this.panUrl = uni.getStorageSync("panUrl");
			uni.showLoading({
				title:""
			})
			this.getDataByPage();			
		},
		methods: {
			backTo(){
				uni.navigateBack({})
			},
			getDataByPage(){
				const _this = this;
				var reqUrl = this.panUrl+"vip/code/opened"
				getRespDataWithUrl(reqUrl,"GET",{
					"pageNo":_this.curPageNo,
					"pageSize":_this.pageSize
				},function(res){
					if(res.code==0 && res.count>0){	
						var len = res.data.length;
						for(var i=0;i<len;i++){
							const item = res.data[i];
							const drawResult = item.drawResult;
							if(null!=drawResult){
								var resultArr = [];
								if(item.drawStatus!=0){
									resultArr = drawResult.split("");
								}
								_this.dataList.push({
									'time':item.drawDate,
									'drawId':item.drawId,															
									'drawStatus':item.drawStatus,
									'num1':item.drawStatus != 0 ? resultArr[0] : "",
									'num2':item.drawStatus != 0 ? resultArr[1] : "",
									'num3':item.drawStatus != 0 ? resultArr[2] : "",
								})
							}else{
								_this.dataList.push({
									'time':item.drawDate,
									'drawId':item.drawId,																
									'drawStatus':item.drawStatus,
									'num1': "",
									'num2':"",
									'num3':""
							
								})
							}
							
						}											
					}			
				})
			}
		}
	}
</script>

<style>
	.tableCell{
		height: 60rpx;
		line-height: 60rpx;
		flex-grow: 1;
		border-top:1px solid gray;
		border-bottom:1px solid gray;
		border-left:1px solid gray;
		text-align: center;
		padding:5rpx 0rpx;
	}
	.last{
		border-right: 1px solid gray;
	}
	.tableCell1{
		width:80%
	}
	.tableCell2{
		width:50%
	}
	.tableCell4{
		width:25%
	}
	.thItem{
		background-color: #eeeeee;
		font-weight: bold;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	.tdItem{
		background-color: white;
		border-top:none;
		text-align: center;
	}
	.thlast,.tdlast{
		border-right:1px solid gray;
	}
	.time{
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		/* display: -webkit-box; */
		-webkit-box-orient: vertical;
	}
	.yuanquan{
		border-radius: 30rpx;
		width: 60rpx;
		height: 60rpx;
		margin: 5rpx;
	}
	.hongse{
		background-color: #C22E2E;
		color: white;
	}
	.zise{
		background-color: #8A2BCF;
		color: white;
	}
	.huise{
		background-color: #cfcfcf;
		color: black;
	}
</style>
