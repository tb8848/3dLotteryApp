<template>
	<view>
		
		<uni-nav-bar dark :fixed="true" shadow status-bar
					:title="$t('draw.xiaopiaohexiao')" backgroundColor="#8150CA" leftIcon="back" @clickLeft="backTo"/> <!--小票核销 -->
					
		<view v-if="getData">
			
			<view v-if="noData" style="margin-top:30rpx;text-align: center;font-size: 36rpx;">{{$t('draw.noFound')}}<!-- 未找到小票相关信息 --></view>
			
			<view v-else>
						
				<view v-if="drawStatus">
					
					<view style="padding: 30rpx;display: flex;justify-content:space-between;align-items: center;">
						<view style="display: flex;flex-direction: column;justify-content: flex-start;">
							<view>{{$t('kuaida.section')}}<text style="color:red;margin:0rpx 10rpx;font-size:40rpx">{{drawNo}}</text>{{$t('kuaida.stage')}}</view>
							<view><text style="font-size: 48rpx;color: red;">{{drawStatusText}}</text></view>												
						</view>
						<view v-if="needCheck && drawStatus && isValid==1" @click="drawCheck" class="btnHX linerBtn">{{$t('draw.hexiao')}}<!-- 核销此票 --></view>
						<view v-if="needCheck && drawStatus && isValid==0" class="hxTip">{{$t('draw.invalid')}}<!-- 已过期 --></view>
						<view v-if="!needCheck && drawStatus" class="hxTip">{{$t('draw.yihexiao')}}<!-- 已核销 --></view>				
					</view>
					
					<view style="margin: 10rpx 0rpx;">
						<view style="display: flex;justify-content: space-around;">
							<view v-for="(code,idx) in drawCode" style="text-align: center;" class="codeball">
								<text style="font-size: 60rpx;font-weight: bolder;color:white" >{{code}}</text>
							</view>
						</view>
					</view>
					
					
					<view v-if="totalDrawMoney<=0" class="noPrizeTip">{{$t('draw.noDraw')}}<!-- 很遗憾，未中奖 --></view>
					<view v-else>
						<view style="background-color:red;color:white;font-size:40rpx;text-align: center;margin:30rpx;border-radius: 10rpx;">
							<view><text>{{$t('draw.drawMoney')}}<!-- 本票中奖金额 --></text></view>
							<view style="font-size: 50rpx;text-align: center;font-weight: bold;"><text>{{totalDrawMoney}}</text></view>
						</view>
					</view>
														
					<view style="background-color: #eee;padding:30rpx;margin-top: 20rpx;">
						<view>{{$t('draw.ticketCode')}}<!-- 小票号码 --></view>
						<view style="">{{$t('kuaida.number-of-transactions')}}：{{totalBuyAmount}} {{$t('kuaida.total-amount')}}：{{totalBuyMoney}}</view>
					</view>
					<view>
						<view class="rowItem" style="border-top: 2rpx solid #eee;">
							<view class="colItem rightLine" style="width: 20%;"><text>{{$t('kuaida.number')}}<!-- 号码 --></text></view>
							<view class="colItem rightLine" style="width: 30%;"><text class="txtOneLine">{{$t('kuaida.odds')}}<!-- 赔率 --></text></view>
							<view class="colItem rightLine" style="width: 30%;text-align: center;"><text>{{$t('kuaida.money')}}/{{$t('mingxi.win-a-prize')}}<!-- 金额/中奖 --></text></view>
							<view class="colItem rightLine" style="width: 20%;"><text>{{$t('mingxi.state')}}<!-- 状态 --></text></view>
						</view>
						<scroll-view style="height: 400rpx;" scroll-y="true" @scrolltolower="nextPage" lower-threshold="0">
							<view v-for="(item,idx) in pager.pageData" :class="[item.drawStatus==1?'rowItem drawRow':'rowItem']" >
								<view class="colItem rightLine" style="width: 20%;"><text>{{getCodeName(item,"-")}}</text></view>
								<view class="colItem rightLine" style="width: 30%;"><text>{{item.param3}}</text></view>
								<view class="colItem rightLine" style="width: 30%;text-align: center;"><text>{{item.buyMoney}}</text>/<text>{{item.drawMoney>0?item.drawMoney:'-'}}</text></view>						
								<view class="colItem rightLine" style="width: 20%;">
									<text v-if="item.drawStatus==1 && item.prizeTakeFlag==1" style="color: yellow;" class="txtOneLine">{{$t('draw.hasDui')}}<!-- 已兑奖 --></text>
									<text v-else-if="item.drawStatus==1 && item.prizeTakeFlag!=1">{{$t('draw.noDui')}}<!-- 未兑奖 --></text>
									<text v-else>/</text>
								</view>
								<!-- <view class="colItem"><text>{{item.drawMoney>0?item.drawMoney:'/'}}</text></view> -->
							</view>
							<uni-load-more v-if="loadMore" iconType="circle" :status="loadingStatus" />
						</scroll-view>
					</view>
				
				</view>
				
				<view v-else>
					<view  v-if="!noData" style="padding: 30rpx;display: flex;flex-direction:column;justify-content: center;align-items: center;">				
							<view>{{$t('kuaida.section')}}<!-- 第 --><text style="color:orangered;margin:0rpx 10rpx;font-size:40rpx">{{drawNo}}</text>{{$t('kuaida.stage')}}<!-- 期 --></view>
							<view style="margin-top:30rpx"><text style="font-size: 48rpx;color: orangered;">{{drawStatusText}}</text></view>																					
					</view>
				</view>
			</view>
			
		</view>
		<view v-else style="text-align: center;padding:10rpx">
			<text>{{drawStatusText}}</text>
		</view>
				
		
	</view>
</template>

<script>
	import { getResponseData, showToastTip ,getRespDataWithUrl} from "@/api/req.js";
	
	export default {
		data() {
			return {
				loadMore:true,
				loadingStatus:'loading',
				title:'',
				batchNo:'',
				printCacheId:'',
				drawNo:'',
				drawCode:[],
				drawStatusText:'',
				drawStatus:false,
				drawCodesList:[],
				allCodesList:[],
				totalDrawMoney:'',
				totalBuyMoney:'',
				totalBuyAmount:'',
				noData:false,
				needCheck:false ,//是否需要核销,
				getData:false,
				isValid:1,
				pager:{
					currpage:1,
					limit:30,
					pages:0,
					total:0,
					pageData:[],
				},
				panUrl:""
			}
		},
		onLoad(option) {
			const params = JSON.parse(decodeURIComponent(option.params));
			this.panUrl = uni.getStorageSync("panUrl");
			this.batchNo = params.batchNo;
			const year = new Date().getFullYear();
			const bhStart = (year+"").substr(3,4);
			if(this.batchNo.substr(0,1)==bhStart){
				this.initData();
			}else{
				const tips = this.$t('ticketNo.error').replace("XXX",this.batchNo);
				this.drawStatusText = tips;
			}
			
		},
		methods: {
			nextPage(){
				if(this.pager.currpage<this.pager.pages){
					this.pager.currpage++;
					this.getPagerData();
					this.loadMore = true;
					if(this.pager.currpage>=this.pager.pages){
						this.loadMore = false
						this.loadingStatus = "noMore"
					}
				}else{
					this.loadMore = false
					this.loadingStatus = "noMore"
				}
			},
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
					default:
						return item.buyCodes;
				}
			},
			getPagerData(){
				const that = this;
				that.loadingStatus='loading'	
				var reqUrl = this.panUrl+"vip/v1/print/getBuyList";
				getRespDataWithUrl(reqUrl,'post',{
					printCacheId:that.printCacheId,
					page:that.pager.currpage,
					limit:that.pager.limit
				},function(res){
					if(res.code==0){
						that.pager.pages = res.count; //总页数；
						var dataList = res.data;
						if(dataList.length>0){
							dataList.forEach((item,idx)=>{
								that.pager.pageData.push(item);
							})							
						}	
						if(res.count==1){
							that.loadMore = false;
						}
					}
				})
			},
			initData(){
				const _this  = this;
				uni.showLoading({
					title:_this.$t("kuaida.dataLoading")
				})		
				var reqUrl = this.panUrl+"vip/v1/print/getDrawInfo";
				getRespDataWithUrl(reqUrl,'post',{
					batchNo:_this.batchNo,
				},function(res){
					_this.pager.currpage=1;
					_this.pager.pageData=[];
					if(res.code==0){
						const drawStatus = res.data.drawStatus;
						_this.drawNo = res.data.drawNo;
						_this.printCacheId = res.data.printCacheId;
						//_this.drawCodesList = res.data.dataList;
						//_this.allCodesList = res.data.allCodesList;
						_this.totalBuyMoney = res.data.totalBuyMoney;
						_this.totalDrawMoney = res.data.totalDrawMoney;
						_this.totalBuyAmount = res.data.totalBuyAmount;
						_this.isValid = res.data.isValid;
						if(res.data.noTake>0){
							_this.needCheck = true;
						}else{
							_this.needCheck = false;
						}
						if(drawStatus==3 || drawStatus==1){
							const drawCodes = res.data.drawCode;
							_this.drawCode = drawCodes.split("");
							_this.drawStatusText = _this.$t('draw.hasOpen'); //"已开奖";
							_this.drawStatus = true;
							_this.getPagerData(); 
						}else{
							_this.drawStatusText = _this.$t('draw.noOpen'); //"等待开奖"
							_this.drawStatus = false;
						}
					}else{
						_this.noData = true;
						//showToastTip(res.msg);
					}
					_this.getData = true;
				})
			},
			backTo(){
				uni.navigateBack();
			},
			drawCheck(){
				const _this = this;
				uni.showModal({
					title:_this.$t('draw.xiaopiaohexiao') , //'核销小票',
					content:_this.$t('draw.tip'), //'是否确定核销？',
					confirmText: _this.$t('bluetooth.confirm'), //'确定',
					cancelText:_this.$t('bluetooth.cancel'), //'取消',
					cancelColor:'#bbbbbb',
					success: (res) => {
						if(res.confirm){
							uni.showLoading({
								title: _this.$t('chulizhong') //'正在处理...'
							})
							var reqUrl = this.panUrl+"vip/print/checkDraw";
							getRespDataWithUrl(reqUrl,'post',{
								batchNo:_this.batchNo
							},function(res){
								if(res.code==0){
									_this.initData();
								}else{
									showToastTip(res.msg);
								}
							})
						}
					}
					
				})
			}
		}
	}
</script>

<style>
	
	.txtOneLine{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
	}

	.colItem{
		width: 25%;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.rowItem{
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #eee;
	}
	
	.noPrizeTip{
		background-color:#eee;
		font-size:40rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		margin: 20rpx;
		border-radius: 10rpx;
		box-shadow: white;
		
	}
	
	.drawRow{
		background-color: orangered;
		color:white;
	}
	
	.rightLine{
		border-right: 1px solid #eee;
	}
	
	.btnHX{
		padding:10rpx;
		border: 1px solid #eee;
		text-align: center;
		color: white;
		border-radius: 10rpx;
	}
	
	.hxTip{
		padding:10rpx;
		font-size:40rpx;
		border: 1px solid #bbb;
		text-align: center;
		color: orangered;
		font-weight: bold;
		border-radius: 10rpx;
	}
	
	.codeball{
		background-image: url(../../../static/images/bg-ball2.gif);
		background-repeat: no-repeat;
		background-size: cover;
		width:75rpx;
		height:92rpx;
		
	}
	
</style>
