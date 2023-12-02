<template>
	<view >
		
		
		
		<view class="logsHeader" :style="{'margin-top':cssHeights.headerMarginTop+'rpx'}">	
			<view>
				<view style="display: flex;justify-content: flex-start;flex-wrap: wrap;padding-top:15rpx" >
					<view @click="showAll()" :class="search.lotteryMethodId==''?'ruleItem ruleItemSelected':'ruleItem'">全部</view>
					<view v-for="(item,index) in lotterMethodList" v-show="item.openFlag==1"
						:class="search.lotteryMethodId==item.id?'ruleItem ruleItemSelected':'ruleItem'" 
						@click="changeRuleItem(item,index)">{{item.bettingMethod}}</view>					
				</view>
			</view>
			<view v-if="lotterMethodList.length>0" style="display: flex;justify-content: space-between;">
				<view class="tableCell tableCell4 thItem">
					<text style="line-height: 60rpx;">{{$t('kuaida.number-of-transactions')}}</text>
				</view>
				<view class="tableCell tableCell4 thItem">
					<text style="line-height: 60rpx;">{{$t('kuaida.money')}}</text></view>
				<view class="tableCell tableCell4 thItem">
					<text style="line-height: 60rpx;">{{$t('logs.detailed')}}</text></view>
				<view class="tableCell tableCell4 thItem">
					<text style="line-height: 60rpx;">{{$t('kuaixuan.generate')}}</text></view>
				<!-- <view class="tableCell tableCell5 thItem" style="display: flex;justify-content: center;">					
					<view class="btnAll" @click="setCommonUse" style="background-color: red;">{{$t('logs.common')}}</view>					
				</view> -->
			</view>
		</view>
		
		<view :style="{'margin-top':cssHeights.contentMarginTop+'rpx'}">
			<scroll-view :style="{'height':(cssHeights.contentHeight-cssHeights.bottomSaveArea)+'rpx'}" 
				scroll-y="true" 
				@scrolltolower="nextPage" lower-threshold="0">
				<checkbox-group @change="chooseOne">
					<view v-for="(item,index) in logList" 
						style="display: flex;justify-content: center;align-items: center;width: 100%;">
						<view class="tableCell tableCell4 tdItem " :class="[index==0?'topLine':'']">
							<text style="line-height: 60rpx;">{{item.buyAmount}}</text></view>
						<view class="tableCell tableCell4 tdItem " :class="[index==0?'topLine':'']">
							<text style="line-height: 60rpx;">{{item.buyMoney}}</text></view>
						<view class="tableCell tableCell4 tdItem " :class="[index==0?'topLine':'']">
							<view class="tdBtn" @click="showDetail(item)"><!-- 查看 -->{{$t("logs.view")}}</view></view>
						<view class="tableCell tableCell4 tdItem " :class="[index==0?'topLine':'']">
							<view view class="tdBtn" @click="createCode(item)"><!-- 生成 -->{{$t("logs.create")}}</view></view>
						<!-- <view class="tableCell tableCell5 last" :class="[index==0?'topLine':'']">
							<checkbox style="transform: scale(0.8);" :checked="item.isCommon==1" :value="item.id"></checkbox>
						</view> -->
					</view>
				</checkbox-group>
				<uni-load-more v-if="showLoadTip" iconType="circle" :status="loadingStatus" />				
				<view v-if="logList.length==0" style="text-align: center;margin-top: 10rpx;"><text></text></view>
			</scroll-view>
		</view>
		
		
		<!--弹窗-->
		<uni-popup ref="createPopup" type="dialog" background-color="#fff">
			<view style="padding: 20rpx 10rpx;">
				<view style="margin-bottom: 10rpx;border-bottom:1px solid #f7f7f7 ;text-align: center;"><text>号码列表</text></view>
				<scroll-view style="height: 300rpx;border:1px solid #FFE4C4" scroll-y="true">
					<view class="searchCondiRow" v-for="(item,idx) in selectList">
						<view style="margin-left: 10rpx;">
							<text>{{item.buyDesc}}</text>
							<!-- <text>{{item.value}}</text> -->
							<text>[{{item.buyAmount}}注]</text>
						</view>											
					</view>					
				</scroll-view>	
				<view class="searchCondiRow">
					<view style="margin-left: 10rpx;">
						<text>总笔数：{{totalAmount}}</text>
						<text style="margin-left: 10rpx;">总金额：{{totalMoney}}</text>					
					</view>											
				</view>			
				<view style="display: flex;justify-content: flex-end;padding: 10rpx 0rpx">
					<view @click="hideCreatePopup" class="anniu" style="margin-right: 40rpx;"><text>取消</text></view>
					<view @click="toBuy" class="anniu" style="margin-right: 20rpx;color:red"><text>确定</text></view>
				</view>
			</view>
		</uni-popup>
			
	</view>
</template>

<script>
	import indexTabbar from '../commons/TopBar.vue';
	import { getResponseData, showToastTip,getRespDataWithUrl} from '@/api/req.js';
	export default {
		components:{
			indexTabbar
		},
		data() {
			return {
				lmId:'0',
				langType:0,
				cssHeights:{
					headerMarginTop:0,
					headerHeight:270,
					contentMarginTop:0,
					contentHeight:0,
					bottomSaveArea:0,
					langHeight:40
				},
				search:{
					lotteryMethodId:"",
					pageNo:1,
					pageSize:30,
					loadMore:true
				},
				rules:null,
				commonUseIdArr:[],
				selectedIdArr:[],
				loadingStatus:'loading',
				lotterMethodList:[],
				logList:[],
				tabIndex: 0,
				tabBars:[],
				popContent:'',
				checkAll:false,
				totalPages:1,
				showLoadTip:true,
				selectList:[],
				totalAmount:0,
				totalMoney:0,
				panUrl:""
			}
		},
		created() {
			const that = this;
			this.panUrl = uni.getStorageSync("panUrl");
			const topbarHeight = uni.getStorageSync("topbarHeight");
			const barHeight = uni.getStorageSync("statusBarH");
			this.cssHeights.headerMarginTop= topbarHeight
			const winH = uni.getStorageSync("winH");
			
			this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop+this.cssHeights.headerHeight; //单位rpx;
			const lang =  uni.getStorageSync("lang");
			this.initLangType(lang);
			uni.$on('langChange',function(data){
				that.initLangType(data.lang);		
				that.lotteryMethodsTrans();
			})
			
			this.cssHeights.contentHeight = winH+barHeight- this.cssHeights.contentMarginTop;
			const winInfo = uni.getWindowInfo();
			console.log(winInfo);
			this.cssHeights.bottomSaveArea = winInfo.safeAreaInsets.bottom;
			
			uni.showLoading({
				title:''
			})
			this.initData();
		},
		onReady() {},
		methods: {
			initLangType(lang){
				const topbarHeight = uni.getStorageSync("topbarHeight");
				const winH = uni.getStorageSync("winH");
				if(lang=='tai'){
					this.cssHeights.headerMarginTop= topbarHeight + this.cssHeights.langHeight
					this.langType = 1			
				}else{
					this.langType = 0
					this.cssHeights.headerMarginTop= topbarHeight
				}				
				this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop+this.cssHeights.headerHeight; //单位 rpx
				this.cssHeights.contentHeight = winH+this.barHeight- this.cssHeights.contentMarginTop;	
				// setTimeout(function(){
				// 	that.$router.go(0);
				// },500)
			},
			lotteryMethodsTrans(){//此方法刷新玩法名称的国际化
				const that = this;
				this.methodList.forEach((rowItem,idx)=>{
					var colItems = rowItem.row1;
					colItems.forEach((item,ii)=>{
						var bmName = "";
						switch(item.id){
							case '1':
								bmName = that.$t("ziliao.fixed-bit");
								break;
							case '2':
								bmName = that.$t("ziliao.ii-positioning");
								break;
							case '3':
								bmName = that.$t("ziliao.iii-positioning");
								break;
							case '4':
								bmName = that.$t("ziliao.iv-positioning");
								break;
							case '5':
								bmName = that.$t("ziliao.two-word-cash");
								break;
							case '6':
								bmName = that.$t("ziliao.three-word-present");
								break;
							case '7':
								bmName = that.$t("ziliao.four-word-present");
								break;
							case '0':
								bmName = that.$t("all")
								break;							
						}
						item.name = bmName;
					})
					
				})
				//this.ruleName = this.lotterMethodList[this.lotteryMethodId-1].bettingMethod;
			},
			createCode(item){
				const that = this;
				this.selectList = JSON.parse(item.contentJson);
				that.totalAmount = item.buyAmount;
				that.totalMoney = item.buyMoney
				if(this.selectList.length>0){				
					this.$refs.createPopup.open()	
				}

			},
			hideCreatePopup(){
				this.$refs.createPopup.close()
			},
			toBuy(){
				const that = this;
				this.$refs.createPopup.close()	
				if(this.selectList.length>0){
					uni.showLoading({
						title: '正在处理中...'
					})
					if(this.lmId=="5" || this.lmId=="13"){
						var reqUrl = this.panUrl+"vip/draw/pc/buy3d/hs";
						getRespDataWithUrl(reqUrl,"POST",that.selectList,(res)=>{
							if(res.code==0){
								showToastTip("下注成功")														
							}else{
								showToastTip(res.msg)		
							}
							that.selectList = [];
						})
					}else{
						var reqUrl = this.panUrl+"vip/draw/pc/buy3d";
						getRespDataWithUrl(reqUrl,"POST",that.selectList,(res)=>{
							if(res.code==0){
								showToastTip("下注成功")	
							}else{
								showToastTip(res.msg)		
							}
							that.selectList = [];
						})
					}					
				}						
			},
			
			setCommonUse(){//更改常用标识
				const _this = this;
				if(_this.selectedIdArr.length<1){
					showToastTip(_this.$t("未选中任何记录"));
				}
				var reqUrl = this.panUrl+"vip/betlog/setCommonUse"
				getRespDataWithUrl(reqUrl,'post',{
					idList:_this.selectedIdArr
				},(res)=>{
					if(res.code==0){
						// _this.search.pageNo = 1;
						// _this.logList=[];
						// _this.getLogs()
						showToastTip(_this.$t('logs.setSuccess')); //设置成功
					}
				})
			},
			chooseOne(e){//复选框选中事件
				this.selectedIdArr = e.detail.value;
			},
			initData(){
				const _this = this;
				var reqUrl = this.panUrl+"vip/draw/lotteryMethods"
				getRespDataWithUrl(reqUrl,'get',{
					lotterType:1
				},(res)=>{
					if(res.code==0){
						_this.lotterMethodList = res.data;
						if(res.data.length>0){							
							//_this.lotteryMethodId = _this.lotterMethodList[0].id
							//_this.rules.lotteryMethodId = _this.lotterMethodList[0].id
							//_this.ruleName = _this.lotterMethodList[0].bettingMethod;
							_this.getLogs();
						}
					}
				})	
			},
			showAll(){
				this.search.lotteryMethodId="";
				this.reloadLogs();
			},
			changeRuleItem(item,idx){
				this.search.lotteryMethodId = item.id;
				this.reloadLogs();
			},
			reloadLogs(){
				this.search.pageNo=1;
				this.logList = [];
				this.showLoadTip = true;
				this.loadingStatus='loading'
				this.getLogs()
			},
			
			getLogs(){				
				const _this = this;		
				var reqUrl = this.panUrl+"vip/betlog/listByPage"
				getRespDataWithUrl(reqUrl,"POST",_this.search,(res)=>{
					if(res.code==0){
						if(res.count>_this.search.pageNo){
							_this.showLoadTip = true;
							_this.search.loadMore = true;
							_this.loadingStatus='more'
						}else{
							_this.showLoadTip = false;
							_this.search.loadMore = false;
							_this.loadingStatus='noMore'
						}
						if(res.data.length>0){
							res.data.forEach((item,idx)=>{
								if(item.isCommon==1){
									_this.commonUseIdArr.push(item.id)
								}
								_this.logList.push(item);
							})
						}
					}
				});				
			},
			nextPage(){
				if(this.search.loadMore){
					this.loadingStatus = "loading"
					this.search.pageNo++;
					this.getLogs();
				}
			},
			showDetail(item){		
				const that = this;
				var content = item.content;
				if(this.langType ==1){
					content = item.contentTh;
				}
				uni.showModal({
					title: that.$t("logs.optContent"), //'操作内容'
					content: content,
					confirmText:that.$t("bluetooth.confirm"),
					showCancel:false,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})			
			},
			
		},
	}
</script>

<style lang="less" scoped>
	
	.ruleItem{
		width:19%;
		margin:0 0.5% 6rpx 0.5%;		
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;		
		background-color: #C0C0C0;
		color:white;
	}
	
	.ruleItemSelected{	
		background-color: #C22E2E;
	}
	
	.tabs{
		background-color: #FCE8E7;
	}
	::v-deep .uni-tab-item-title{
		font-size: 14px;
		width: 100rpx;
		color: #555356;
	}
	::v-deep .tabActive{
		color: red;
	}
	::v-deep .tabActive .tab-item-title-line{
		border: none;
	}
	
	.typeItem{
		height: 50rpx;
		border:1px solid #eee;
		width: 23%;
		margin:5rpx 1%;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.logsHeader{
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
		height: 60rpx;
		flex-grow: 1;
		//border-top:1px solid gray;
		border-bottom:1px solid gray;
		border-left:1px solid gray;
		text-align: center;
	}
	
	.topLine{
		border-top:1px solid gray;
	}
	.tableCell3{
		width:33.3%
	}
	.tableCell4{
		width:25%
	}
	
	.tableCell5{
		width:20%
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
		// border-bottom:none;
	}
	.thlast,.tdlast{
		border-right:1px solid gray;
	}
	.btnAll{
		width: 90rpx;
		height: 45rpx;
		line-height: 45rpx;
		background-color: blueviolet;
		border-radius: 10rpx;
		text-align: center;
		color:white;
		font-size: 26rpx;
	}
	
	.tdBtn{
		height: 50rpx;
		line-height:50rpx;
		//background-color: blueviolet;
		border-radius: 10rpx;
		margin: 5rpx auto;
		text-align: center;
		color:blueviolet;
	}
	
	.tdBtn:active{
		color: red;
	}

</style>
