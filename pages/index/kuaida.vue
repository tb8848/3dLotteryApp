<template>
	
	<view>
	
	<view class="kdcontent" :style="{'margin-top':(cssHeights.headerMarginTop)+'rpx'}" v-if="langType==0">		
	
		<view style="display: flex;justify-content: space-between;height:600rpx;" >
			
			<view style="flex-grow: 1;display: flex;flex-direction: column;justify-content: flex-start;width: 38%;">
				<view style="margin-bottom:50rpx;padding:0rpx 10rpx;height: 60rpx;line-height: 60rpx;text-align: center;background-color: #eee;display: flex;justify-content: space-around;">
					<text>{{$t('kuaida.currently-suspended')}}</text>
					
				</view><!-- 100 -->
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view class="tableCell tableCell40 thItem" style="width: 35%;text-align: center;">{{$t('kuaida.number')}}</view>
					<view class="tableCell tableCell40 thItem" style="width: 30%;text-align: center;">{{$t('kuaida.money')}}</view>
					<view class="tableCell tableCell5 thItem last">
						<checkbox-group @change="chooseAllStopCodes">
							<checkbox style="transform: scale(0.8);" 
								:checked="stopCodes.selectedAll" value="all"></checkbox>
						</checkbox-group>
					</view>
				</view><!-- 60 -->
				<scroll-view style="height: 315rpx;" scroll-y="true">
					<checkbox-group @change="chooseOneStopCode">
						<view v-if="stopCodes.dataList.length>0" v-for="(item,index) in stopCodes.dataList" 
							style="display: flex;justify-content: space-between;align-items: center;">
							<view class="tableCell tableCell40 tdItem" style="width: 35%;text-align: center;">{{getCodeName(item.lotteryMethodId,"-",item.codes)}}</view>							
							<view class="tableCell tableCell40 tdItem" style="width: 30%;text-align: center;">{{item.buyMoney}}</view>
							<view class="tableCell tableCell5 tdItem last">
								<checkbox style="transform: scale(0.8);" :value="item.id" :checked="stopCodes.selectedIdArr.includes(String(item.id))"></checkbox></view>
						</view>
					</checkbox-group>
					<view v-if="(defaultShowCount-stopCodes.dataList.length)>0" v-for="index in (defaultShowCount-stopCodes.dataList.length)" style="display: flex;justify-content: space-between;align-items: center;">
						<view class="tableCell tableCell40 tdItem" style="width: 35%;text-align: center;">--</view>
						<view class="tableCell tableCell40 tdItem" style="width: 30%;text-align: center;">--</view>
						<view class="tableCell tableCell5 tdItem last">--</view>
					</view>
				</scroll-view><!-- 315 -->
				<view style="display: flex;justify-content: left;align-items: center;height: 60rpx;">
					<text>{{$t('kuaida.number-of-transactions')}}:{{stopCodes.dataList.length}}</text>
					<text style="margin-left:5rpx">{{$t('kuaida.total-amount')}}:{{stopCodes.totalMoney}}</text>
				</view><!-- 60 -->
				<view style="display: flex;justify-content: center;align-items: center;">
					<view class="btnPrint" @click="toFangDa()">{{$t('kuaida.enlarge')}}</view>
					<view class="btnPrint" @click="delStopCodes">{{$t('kuaida.delete')}}</view>
				</view><!-- 60 -->
			</view>
			
			<view>
				<view style="border:1px solid #666666;flex-grow: 1;">
					<view style="text-align: center;margin-bottom:20rpx;height: 50rpx;">
						<text style="color:orangered">{{lotteryName}}</text>
						<text style="font-size: 28rpx;">({{$t('kuaida.section')}}{{printInfo.printCount}}{{$t('kuaida.secondary-printing')}})</text>
					</view>
					<view style="height: 120rpx;margin-bottom:30rpx;" >
						<view><text>{{$t('kuaida.time')}}:{{printInfo.printTime}}</text></view>
						<view><text>{{$t('kuaida.member')}}:{{uname}}</text></view>
						<view><text>{{$t('kuaida.bianhao')}}:{{printInfo.batchNo}}</text></view>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view class="tableCell tableCell40 thItem" style="width:20%">{{$t('kuaida.number')}}</view>
						<view class="tableCell tableCell40 thItem" style="width:20%">{{$t('kuaida.odds')}}</view>
						<view class="tableCell tableCell5 thItem last">{{$t('kuaida.money')}}</view>
					</view><!-- 60 -->
					
					<scroll-view style="height: 160rpx;" scroll-y="true"  @scrolltolower="scrollLoad" lower-threshold="10">
						<view v-if='printInfo.dataList.length>0' v-for="(item,index) in scrollPager.pageData" 
							style="display: flex;justify-content: space-between;align-items: center;">
							<view class="tableCell tableCell40 tdItem" style="display: flex;width:20%;overflow-x: scroll;" v-if="item.buyCodes.length > 6"><!-- justify-content: center;  -->
								<text>{{getCodeName(item.lotteryMethodId,"-",item.buyCodes)}}</text></view>
							<view class="tableCell tableCell40 tdItem" style="display: flex;justify-content: center;width:20%;" v-else>
								<text>{{getCodeName(item.lotteryMethodId,"-",item.buyCodes)}}</text></view>
							<view class="tableCell tableCell40 tdItem" style="width:20%">{{item.param3}}</view>
							<view class="tableCell tableCell5 tdItem last">{{item.buyMoney}}</view>
						</view>	
						<view v-if='(defaultPrintCount-printInfo.dataList.length)>0' v-for="index in (defaultPrintCount-printInfo.dataList.length)" >
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view class="tableCell tableCell40 tdItem" style="width:20%">--</view>
								<view class="tableCell tableCell40 tdItem" style="width:20%">--</view>
								<view class="tableCell tableCell5 tdItem last">--</view>
							</view>
						</view>
					</scroll-view>
					<view style="display: flex;justify-content: left;align-items: center;">
						<text>{{$t('kuaida.number-of-transactions')}}:{{printInfo.totalAmount}}</text>
						<text style="margin-left:5rpx">{{$t('kuaida.total-amount')}}:{{printInfo.totalMoney}}</text>
					</view>	<!-- 60 -->
				
					<view style="display: flex;justify-content: center;align-items: center;">
						<view class="btnPrint" @click="clearCache()">{{$t('kuaida.empty')}}</view>
						<view class="btnPrint" @click="toScreenCut()">{{$t('kuaida.screenshot')}}</view>
						<view class="btnPrint" @click="toPrint()">{{$t('kuaida.print')}}</view>
					</view>	<!-- 60 -->		
				</view>
								
				<view style="display: flex;justify-content: left;align-items: center;height: 50rpx;" >
					<text>{{$t('kuaida.section')}} {{issueNo}} {{$t('kuaida.stage')}}</text>
					<text>3{{$t('kuaida.valid-within-days')}}!</text>	
					<text v-if="pager.pages>1 && pager.currpage<pager.pages" @click="changeCurrpage" 
						style="color:blueviolet;font-weight: bold;font-size: 26rpx;margin-right: 4rpx;">{{$t('kuaida.nextPage')}}
						<!-- 下一页 -->
						</text>
					<text v-if="pager.pages>1 && pager.currpage==pager.pages" @click="changeCurrpage" 
						style="color:blueviolet;font-weight: bold;font-size: 26rpx;margin-right: 4rpx;">{{$t('kuaida.prevPage')}}<!--上一页--></text>
				</view>	<!-- 50 -->		
			</view>
		
		</view>
		
		<view v-if="openStatus!=1">
			<view style="height:200rpx;text-align: center;font-size: 60rpx;line-height: 200rpx;font-weight: bolder;background-color: #E4E7ED;">
				{{openStatusDesc}}
			</view>
		</view>
		
		<view v-if="openStatus==1">
			<view style="display: flex;justify-content: space-between;">
				<view class="tableCell tableCell4 thItem">{{$t('kuaida.number')}}</view>
				<view class="tableCell tableCell4 thItem">{{$t('kuaida.odds')}}</view>
				<view class="tableCell tableCell4 thItem">{{$t('kuaida.money')}}</view>
				<view class="tableCell tableCell4 thItem" style="display: flex;justify-content: center;">
					<view class="btnBackcode" @click="doBackoutCodes()">{{$t('kuaida.backout')}}</view>
				</view>
			</view><!-- 60 -->
			<scroll-view :style="{height: defaultChooseCount*60+'rpx'}" scroll-y="true">
				<checkbox-group @change="addBackoutCodes">
					<view v-if="buyCodes.dataList.length>0" v-for="(item,index) in buyCodes.dataList" >
						<view class="dataRow">
							<view class="tableCell tableCell4 tdItem" 
								:style="{'color':(item.backCodeFlag==1?'white':'black'),'background-color':(item.backCodeFlag==1?'orangered':'white')}">{{getCodeName(item.lotteryMethodId,"-",item.buyCodes)}}</view>
							<view class="tableCell tableCell4 tdItem" 
								:style="{'color':(item.backCodeFlag==1?'white':'black'),'background-color':(item.backCodeFlag==1?'orangered':'white')}">{{item.param3}}</view>
							<view class="tableCell tableCell4 tdItem" 
								:style="{'color':(item.backCodeFlag==1?'white':'black'),'background-color':(item.backCodeFlag==1?'orangered':'white')}">{{item.buyMoney}}</view>
							<view class="tableCell tableCell4 tdItem last" 
								:style="{'color':(item.backCodeFlag==1?'white':'black'),'background-color':(item.backCodeFlag==1?'orangered':'white')}">
									<checkbox style="transform: scale(0.8);" :value="item.id"  
										v-if="item.codesFrom!=10 && item.backCodeStatus==1 && item.backCodeFlag!=1"></checkbox>
									<text v-else-if="item.backCodeFlag==1">{{$t('kuaida.codeBack')}}<!--已退码--></text>
									<text v-else>--</text>								
							</view>	
						</view>
					</view>
				</checkbox-group>
				<view v-if="10-buyCodes.dataList.length>0" v-for="index in (10-buyCodes.dataList.length)" class="dataRow">
					<view class="tableCell tableCell4 tdItem">--</view>
					<view class="tableCell tableCell4 tdItem">--</view>
					<view class="tableCell tableCell4 tdItem">--</view>
					<view class="tableCell tableCell4 tdItem last">--</view>
				</view>
				
			</scroll-view>		
		</view>
		
		
<!-- 		<view v-if="smallScreen && openStatus==1">
			<view style="display: flex;justify-content: space-between;">
				<view class="tableCell tableCell4 thItem">{{$t('kuaida.number')}}</view>
				<view class="tableCell tableCell4 thItem">{{$t('kuaida.odds')}}</view>
				<view class="tableCell tableCell4 thItem">{{$t('kuaida.money')}}</view>
				<view class="tableCell tableCell4 thItem" style="display: flex;justify-content: center;">
					<view class="btnBackcode" @click="doBackoutCodes()">{{$t('kuaida.backout')}}</view>
				</view>
			</view>
			
			<scroll-view style="height: 60rpx;" scroll-y="true">
				<checkbox-group @change="addBackoutCodes">
					<view v-if="buyCodes.dataList.length>0" class="dataRow" v-for="(item,idx) in buyCodes.dataList">						
						<view class="tableCell tableCell4 tdItem" style="display: flex;justify-content: center;" >
							<text>{{getCodeName(item)}}</text>
						</view>
						<view class="tableCell tableCell4 tdItem" >{{item.param3}}</view>
						<view class="tableCell tableCell4 tdItem">{{item.buyMoney}}</view>
						<view class="tableCell tableCell4 tdItem last">
								<checkbox style="transform: scale(0.8);" :value="item.id"  
									v-if="item.backCodeStatus==1 && item.backCodeFlag!=1"></checkbox>
								<text v-else-if="item.backCodeFlag==1" style="color: orangered;">{{$t('kuaida.codeBack')}}</text>
								<text v-else>--</text>								
						</view>	
					</view>
				</checkbox-group>
				<view v-if="buyCodes.dataList.length==0" style="display: flex;justify-content: space-between;align-items: center;">
					<view class="tableCell tableCell4 tdItem">--</view>
					<view class="tableCell tableCell4 tdItem">--</view>
					<view class="tableCell tableCell4 tdItem">--</view>
					<view class="tableCell tableCell4 tdItem last">--</view>
				</view>
			</scroll-view>	
			
		</view> -->
			
		<!-- <view class="moneyInput" v-if="buyMoney.length>4">
			<text>{{$t('kuaida.money')}}：</text>
			<text>{{buyMoney}}</text>
		</view> -->
		
	<!-- 	<div class="kbContainer" :style="{'bottom':(cssHeights.bottomSaveArea+5)+'rpx'}" v-if="openStatus==1">
			
			<view style="width:98%;margin:5rpx 1%;display: flex;justify-content: space-between;align-items: center;">
				
				<view style="display: flex;justify-content: flex-start;align-items: center;">
					<view style="display: flex;flex-direction: column;justify-content: left;margin-right: 20rpx;">
						<view>
							<input v-model="buyCode" :class="[clickLoc==1?'haoma inputActive':'haoma']"
								maxlength="4" disabled="disabled" @click="clearInput(1)" />
						</view>
						<view>
							<text>{{$t('kuaida.number')}}</text>
							<text v-if="hasOneCode==1" style="margin-left: 10rpx;color: orangered;">{{$t('mingxi.present')}}</text>
						</view>
					</view>
					<view style="display: flex;flex-direction: column;justify-content: left;margin-right: 20rpx;">
						<view>
							<input v-model="buyMoney" :class="[clickLoc==2?'jine inputActive':'jine',buyMoney.length>4 ? 'daliuwei' : 'xiaoliuwei']" disabled="disabled" maxlength="10"  @click="clearInput(2)"/>
						</view>
						<text>{{$t('kuaida.money')}}</text>
					</view>
					<view style="display:flex;flex-direction:column;justify-content:left;">
						<view>{{$t('kuaida.odds')}}：<text>{{peiRate}}</text></view>
						<view>{{$t('kuaida.downloadable')}}：<text>{{leftBuy}}</text></view>
					</view>	
				</view>	
					
				<view style="margin-right:10rpx;text-align: right;">
					<view>
						
						<text>{{$t('kuaida.four-word-present')}}</text>
						<checkbox :checked="sizixian==1" @click="changMethodType(1)" style="transform: scale(0.8);"></checkbox>
					</view>
					<view>
						
						<text>{{$t('kuaida.full-rotation')}}</text>
						<checkbox :checked="quanzhuan==1" @click="changMethodType(2)" style="transform: scale(0.8);"></checkbox>
					</view>
					
				</view>	
			</view>

			<view style="width:98%;margin:0px 1%;height: 150rpx;">
				<view class="kbrow">
					<view class="kbkey" @click="getKeyValue('5')">5</view>
					<view class="kbkey" @click="getKeyValue('4')">4</view>
					<view class="kbkey" @click="getKeyValue('3')">3</view>
					<view class="kbkey" @click="getKeyValue('2')">2</view>
					<view class="kbkey" @click="getKeyValue('1')">1</view>
					<view class="kbkey" @click="getKeyValue(specialKey)">{{specialKey}}</view>
				</view>
				<view class="kbrow">
					<view class="kbkey" @click="getKeyValue('6')">6</view>
					<view class="kbkey" @click="getKeyValue('7')">7</view>
					<view class="kbkey" @click="getKeyValue('8')">8</view>
					<view class="kbkey" @click="getKeyValue('9')">9</view>
					<view class="kbkey" @click="getKeyValue('0')">0</view>
					<view class="kbkey" @click="toBuy()">{{$t('kuaida.determine')}}</view>
				</view>
			</view>
		</div>
		 -->
	</view>
	

<!-- 弹窗 -->
		<uni-popup ref="chooseLangPopup" type="dialog" background-color="#fff">
				
			<view style="padding: 20rpx 10rpx;">
				<view style="margin-bottom: 10rpx;border-bottom:1px solid #f7f7f7 ;text-align: center;">
					<text>{{$t('kuaida.print.title')}}<!-- 打印设置 --></text>
				</view>
				<view style="display: flex;flex-direction: column;justify-content: center;">
					<view class="searchCondiRow" v-if="langType==0">
						<view style="color: #666666;"><text>{{$t('kuaida.printLang')}}<!-- 打印语言 --></text></view>
						<view style="margin-left: 10rpx;">
							<radio-group @change="setPrintLang">
								<view style="display: flex;justify-content: center;">
									
										<view style="margin:10rpx 20rpx 10rpx 0rpx">
											<radio :checked="printLang=='zh'" value="zh"></radio>
											<text>{{$t('locale.zh-hans')}}<!-- 中文 --></text>
										</view>
										
										<view style="margin:10rpx 0rpx 10rpx 20rpx">
											<radio :checked="printLang=='lao'" value="lao"></radio>
											<text>{{$t('locale.lao')}}<!-- 老挝文 --></text>
											</view>
														
								</view>		
							</radio-group>	
						</view>		
					</view>
					<view class="searchCondiRow" v-if="langType==1" style="flex-direction: column;align-items: flex-start;padding-left:10rpx">
						<view style="color: #666666;"><text>{{$t('kuaida.printLang')}}<!-- 打印语言 --></text></view>
						<view style="margin-left: 10rpx;">
							<radio-group @change="setPrintLang">
								<view style="display: flex;justify-content: center;">
									
										<view style="margin:10rpx 20rpx 10rpx 0rpx">
											<radio :checked="printLang=='zh'" value="zh"></radio>
											<text>{{$t('locale.zh-hans')}}<!-- 中文 --></text>
										</view>
										
										<view style="margin:10rpx 0rpx 10rpx 20rpx">
											<radio :checked="printLang=='lao'" value="lao"></radio>
											<text>{{$t('locale.lao')}}<!-- 老挝文 --></text>
											</view>
														
								</view>		
							</radio-group>	
						</view>		
					</view>

				</view>
				<view style="display: flex;justify-content: flex-end;padding: 10rpx 0rpx">
					<view @click="controlLangPopup()" class="anniu" 
						style="margin-right: 20rpx;color:blueviolet"><text>{{$t('kuaida.determine')}}</text>
					</view>
				</view>
			</view>
			
		</uni-popup>
			
	</view>

</template>

<script>
	
	import { getResponseData, showToastTip,getRespDataWithUrl } from "@/api/req.js";
	import { print,printBytes,printTicket } from "@/api/print.js";
	import { printThreeData,printOneData } from "@/api/printUtil.js";
	import { hexToBytes,fillChars } from "@/api/tools.js";
	export default {
		data() {
			return {
				startBuy:false,
				langType:0, //0：中文；1：泰文
				scrollPager:{
					pages:0,
					currpage:1,
					limit:20,
					pageData:[]
				},
				sizixian:0,
				quanzhuan:0,
				openStatus:1,
				openStatusDesc:"",
				errmsg:'',
				curPrintTimes:1,
				drawId:"",
				issueNo:"------",
				uname:"",
				codeList:[],
				stopBuyList:[],
				printCacheCodeList:[],
				totalMoney:0,
				defaultShowCount:6,
				defaultPrintCount:3,
				defaultChooseCount:2,
				peiRate:"", //赔率
				leftBuy:"", //可下注
				maxBuyLimit:'', //单注金额上限
				minBuyLimit:'',//单注金额下限
				buyCode:"",
				buyMoney:"",
				hasOneCode:0 ,//是否选择现字玩法
				price:0,
				clickLoc:1,
				isPoint:0,
				specialKey:'X',
				settingId:'',
				backoutCodeList:[],
				barHeight:0,	
				printLang:'zh',
				printInfo:{
					printCount:1,
					screenCutCount:1,
					printTime:'',
					printNo:'',
					printCacheId:'',
					totalAmount:"",
					totalMoney:"",
					dataList:[],
					batchNo:''
				},
				cssHeights:{
					headerMarginTop:0,
					headerHeight:0,
					contentMarginTop:0,
					contentHeight:0,
					bottomSaveArea:0,	
					buyBtnRight:5
				},
				stopCodes:{
					dataList:[],
					selectedIdArr:[],
					selectedAll:false,
					totalMoney:""
				},
				buyCodes:{
					dataList:[],
					selectedIdArr:[],
					selectedAll:false					
				},
				"searchUndel":{
					drawId:'',
					deleteFlag:0,
					pageNo:1,
					pageSize:10,
					loadMore:true
				},
				smallScreen:false,
				pager:{
					currpage:1,
					pages:0,
					totals:0,
					limit:500,
					pageRange:[]
				},
				search:{
					pageNo:1,
					pageSize:10,
					currpage:1,
					pages:0
				},
				moneyHeight:5,
				xzuuid:"",
				panUrl:"",
				lotteryName:''
			}
		},
		created() {		
			this.lotteryName = uni.getStorageSync("lotteryName")
			this.panUrl = uni.getStorageSync("panUrl")
			this.uname = uni.getStorageSync("uname");			
			const topbarHeight = uni.getStorageSync("topbarHeight");
			const barHeight = uni.getStorageSync("statusBarH");
			this.cssHeights.headerMarginTop= topbarHeight
			const winH = uni.getStorageSync("winH");
			const winW = uni.getStorageSync("winW");
			this.cssHeights.buyBtnRight = (winW-90)/2;
			this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop+this.cssHeights.headerHeight; //单位rpx;
			this.cssHeights.contentHeight = winH - this.cssHeights.contentMarginTop;
			const winInfo = uni.getWindowInfo();
			if(winInfo.screenHeight<600){
				this.smallScreen = true;
			}
			this.cssHeights.bottomSaveArea = winInfo.safeAreaInsets.bottom;
			const maxRows = Math.floor((this.cssHeights.contentHeight-600)/60);
			this.defaultChooseCount = maxRows;	
			
			const lang = uni.getStorageSync("lang");	
			if(lang=='tai'){
				this.langType=1;
				this.printLang = 'lao';	
			}else{
				this.langType=0;
				this.printLang = 'zh';	
			}
			
			//计算下注列表最多可以显示的行数
			
			// const maxRows = Math.floor((this.cssHeights.contentHeight-600-260-60)/70);
			// this.defaultChooseCount = maxRows;	
			this.getuuid();
			this.initData();	
			var that = this;
			uni.$on('drawOpenStatus',function(data){
				//console.log('监听到事件来自 drawOpenStatus ，携带参数 msg 为：' + data);
				var drawInfo = JSON.parse(data);				
				that.openStatus = drawInfo.openStatus;
				that.changeOpenStatus();
				var dno = drawInfo.drawNo;
				if(dno!=that.issueNo){
					that.issueNo = drawInfo.drawNo;
					that.initData();	
				}
			})	
			
			uni.$on("langChange",function(data){
				if(data.lang=='tai'){
					that.langType=1;
					that.printLang = 'lao';
				}else{
					that.langType=0;
					that.printLang = 'zh';
				}
				that.changeOpenStatus();
			})
		},
		methods: {
			getCodeName(lmId,splitChar,code){
				switch(lmId){
					case '1':
						return 'ZX'+splitChar+code;
					case '2':
						return 'TX'+splitChar+code;
					case '3':
						return 'Z3'+splitChar+code;
					case '4':
						return 'Z6'+splitChar+code;
					case '8':
						return 'BX'+splitChar+code;
					case '6':
						return '1D'+splitChar+code;
					case '7':
						return '2D'+splitChar+code;
					case '5':
						return 'HS'+splitChar+code;
					case '13':
						return 'KD'+splitChar+code;
					case '14':
						return 'DD'+splitChar+code;
					default:
						return code;
				}
			},
			
			getuuid(){
				const that = this;
				var reqUrl = this.panUrl+"vip/app/getUUid";
				getRespDataWithUrl(reqUrl,'get',{},function(res){
					if(res.code==0){
						that.xzuuid = res.data.appSaveXZ;
					}
				})
			},
			toStartBuy(){
				this.startBuy = true;
			},
			stopBuy(){
				this.startBuy = false;
			},
			scrollLoad(){
				if(this.scrollPager.currpage<this.scrollPager.pages){
					this.scrollPager.currpage++;
					this.initScrollPageData();
				}
			},
			initScrollPageData(){
				var that = this;
				var st = (this.scrollPager.currpage-1)*this.scrollPager.limit;
				var et = this.scrollPager.currpage*this.scrollPager.limit;
				if(et>this.printInfo.dataList.length){
					et = this.printInfo.dataList.length;
				}
				var pageData = this.printInfo.dataList.slice(st,et);
				pageData.forEach((item,idx)=>{
					that.scrollPager.pageData.push(item);
				})
			},
			changeCurrpage(e){
		
				if(this.pager.currpage==this.pager.pages){
					this.pager.currpage--;
					if(this.pager.currpage<1){
						this.pager.currpage =1
					}
				}else{
					this.pager.currpage++;
					if(this.pager.currpage>this.pager.pages){
						this.pager.currpage = this.pager.pages;
					}
				}
			
				uni.showLoading({
					title:'数据加载中'
				})
				this.getPrintCacheCodeList();
			},
			changeOpenStatus(){
				switch(this.openStatus){
					case 0:
						this.openStatusDesc=this.$t("drawClose"); //'已封盘';
						break;
					case 3:
						this.openStatusDesc=this.$t('drawOpening') ; //'正在开盘中';
						break;
					case 2:
						this.openStatusDesc=this.$t('drawUnopen'); //'未开盘';
						break;
					default:
						this.openStatusDesc='';							
				}
			},
			setPrintLang(e){
				console.log(e)
				this.printLang = e.detail.value;
			},
			controlLangPopup(){
				this.$refs.chooseLangPopup.close();
				this.doPrint();
			},
			
			nextPage(){
				if(this.search.pages>1){
					this.search.pageNo++;
					if(this.search.pageNo<=this.search.pages){
						this.getCodesList()
					}					
				}			
			},
			
			chooseAllStopCodes(e){//全选
				const checkItem = e.detail.value;
				if(checkItem[0]=="all"){
					this.stopCodes.selectedAll = true;
					for(let item of this.stopCodes.dataList){
						let itval = String(item.id);
						if(!this.stopCodes.selectedIdArr.includes(itval)){
							this.stopCodes.selectedIdArr.push(itval);
						}
					}
				}else{
					this.stopCodes.selectedAll = false;
					this.stopCodes.selectedIdArr=[];
				}
			},
			chooseOneStopCode(e){
				this.stopCodes.selectedIdArr = e.detail.value;
				let selectedLen = this.stopCodes.selectedIdArr.length;
				if(selectedLen>0 && selectedLen==this.stopCodes.dataList.length){
					this.stopCodes.selectedAll = true;
				}else{
					this.stopCodes.selectedAll = false;
				}
			},
			
			getPrintIdList(){
				var idArr = [];
				this.codeList.forEach((item,idx)=>{
					idArr.push(item.id);
				})
				return idArr;
			},
			toPrint(){
				const _this = this;				
				const hasPrintCount = this.printInfo.printCount-1;
				const tips = _this.$t('kuaida.print.timesTip').replace("XXX",hasPrintCount);
				if(hasPrintCount>0){
					uni.showModal({
						title: _this.$t('kuaida.print.title1'),//"打印提示",
						content:tips,
						confirmText:_this.$t("kuaida.print.continue"),
						cancelText:_this.$t("mingxi.cancel"), //'取消',
						cancelColor:'#aaa', 
						success: (res) => {
							if(res.confirm){
								//this.$refs.chooseLangPopup.open()
								this.doPrint();
							}							
						}
					})
				}else{
					//his.$refs.chooseLangPopup.open()
					this.doPrint();
				}
			},
			
			createPrintTextBJ(lang){
				const that = this;
				var emptyLine = this.fillSpace(0,'',16)+"\r\n";
				var saleName = uni.getStorageSync("saleName");
				var content = "";
				var headerStr = this.fillSpace(1,this.lotteryName+" 第("+this.printInfo.printCount+")次打印",16)+"\r\n";
				content = content+headerStr;
				content = content+emptyLine;
				content = content+this.fillSpace(1,"时间:"+this.printInfo.printTime,31)+"\r\n";
				if(saleName!=null && saleName!="" && saleName!=undefined){
					content = content+this.fillSpace(1,"销售点:"+saleName,16)+"\r\n";
				}
				content = content+this.fillSpace(1,"会员:"+this.uname,16)+"\r\n";
				content = content+emptyLine;
				content = content+ fillChars("*",16)+"\r\n";
				content = content+emptyLine;
				content = content+this.fillSpace(1,"号码",5)+this.fillSpace(1,"赔率",5)+this.fillSpace(1,"金额",5)+"\r\n";
				// content = content+printThreeData("号码","赔率","金额\n",this.printLang)
				content = content+emptyLine;
				this.printInfo.dataList.forEach((item,idx)=>{
					var codes = that.getCodeName(item.lotteryMethodId,"-",item.buyCodes);
					var plv = item.param3;
					var bm = item.buyMoney;
					//content = content+this.fillSpace(1,codes.toUpperCase(),10)+this.fillSpace(1,plv,10)+this.fillSpace(1,bm,9)+"\r\n";
					if(codes.length > 4){
						content = content+this.fillSpace(1,codes,16)+"\r\n";
						content = content+this.fillSpace(1,"",5)+this.fillSpace(1,plv,5)+this.fillSpace(1,bm,5)+"\r\n";
						// content = content+printThreeData("",plv,bm+'\n',this.printLang);
					}else{
						content = content+this.fillSpace(1,codes,5)+this.fillSpace(1,plv,5)+this.fillSpace(1,bm,5)+"\r\n";
						// content = content+printThreeData(codes,plv,bm+'\n',this.printLang);
					}
				}); 
				content = content+emptyLine;
				content = content+ fillChars("*",16)+"\r\n";
				content = content+emptyLine;
				var bishu = "笔数:"+this.printInfo.dataList.length+" 总金额:"+this.printInfo.totalMoney;
				content = content+this.fillSpace(1,bishu,31)+"\r\n";
				content = content+emptyLine;
				content = content+ fillChars("*",16)+"\r\n";
				content = content+emptyLine;
				content = content+this.fillSpace(1,"第"+this.issueNo+"期 3天内有效",16)+"\r\n";
				if(this.pager.pages>1){
					content = content+this.fillSpace(1,"第"+this.pager.currpage+"/"+this.pager.pages+"页",16)+"\r\n";
				}
				content = content+emptyLine;
				return content;
			},
			
			createPrintText(lang){
				const that = this;
				var emptyLine = this.fillSpace(0,'',31)+"\r\n";
				var saleName = uni.getStorageSync("saleName");
				if(lang == 'zh'){
					var content = "";
					var headerStr = this.fillSpace(1,this.lotteryName+" 第("+this.printInfo.printCount+")次打印",31)+"\r\n";
					content = content+headerStr;
					content = content+emptyLine;
					content = content+this.fillSpace(1,"时间:"+this.printInfo.printTime,31)+"\r\n";
					if(saleName!=null && saleName!="" && saleName!=undefined){
						content = content+this.fillSpace(1,"销售点:"+saleName,31)+"\r\n";
					}
					content = content+this.fillSpace(1,"会员:"+this.uname,31)+"\r\n";
					//content = content+emptyLine;				
					content = content+ fillChars("*",31)+"\r\n";
					// content = content+this.fillSpace(1,"号码",10)+this.fillSpace(1,"赔率",10)+this.fillSpace(1,"金额",9)+"\r\n";
					content = content+printThreeData("号码","赔率","金额\n",this.printLang)
					
					this.printInfo.dataList.forEach((item,idx)=>{
						var codes = that.getCodeName(item.lotteryMethodId,"-",item.buyCodes);
						var plv = item.param3;
						var bm = item.buyMoney;
						//content = content+this.fillSpace(1,codes.toUpperCase(),10)+this.fillSpace(1,plv,10)+this.fillSpace(1,bm,9)+"\r\n";
						if(codes.length > 6){
							content = content+this.fillSpace(1,codes,31)+"\r\n";
							content = content+printThreeData("",plv,bm+'\n',this.printLang);
						}else{
							content = content+printThreeData(codes,plv,bm+'\n',this.printLang);
						}
					}); 
					content = content+ fillChars("*",31)+"\r\n";	
					var bishu = "笔数:"+this.printInfo.dataList.length+" 总金额:"+this.printInfo.totalMoney;
					content = content+this.fillSpace(1,bishu,31)+"\r\n";
					content = content+ fillChars("*",31)+"\r\n";				
					content = content+this.fillSpace(1,"第"+this.issueNo+"期 3天内有效",31)+"\r\n";
					if(this.pager.pages>1){
						content = content+this.fillSpace(1,"第"+this.pager.currpage+"/"+this.pager.pages+"页",31)+"\r\n";
					}
					content = content+emptyLine;
					return content;
				}else if('lao'==lang){
					//return "ຊ່ວຍຄວາມຈຳ\r\n";
					//return this.fillSpace(1,"ຊ່ວຍຄວາມຈຳ:"+this.uname,31)+"\r\n"
					
					var content = "";
					var headerStr = "หวยลาว ส่วนที่("+this.printInfo.printCount+")การพิมพ์รอง";
					//this.fillSpace(1,"หวยลาว ส่วนที่("+this.printInfo.printCount+")การพิมพ์รอง",31)+"\n";
					content = content+printOneData(headerStr)+'\n';
					content = content+emptyLine;
					const time = "เวลา:"+this.printInfo.printTime
					const vipName = "สมาชิก:"+this.uname
					content = content + printOneData(time)+'\r\n';
					if(saleName!=null && saleName!="" && saleName!=undefined){
						content = content + printOneData("ສູງຂໍ້ມູນ:"+saleName)+'\r\n';
					}
					content = content + printOneData(vipName)+'\r\n';
					
					//content = content+this.fillSpace(1,"เวลา:"+this.printInfo.printTime,31)+"\n";
					//content = content+this.fillSpace(1,"สมาชิก:"+this.uname,31)+"\n";
					//content = content+emptyLine;				
					content = content+ fillChars("*",31)+"\r\n";
					//号码/金额/赔率
					// content = content+
					// 	this.fillSpace(1,"ເລກໂຕເລກ",10)+this.fillSpace(1,"ໂຕອັດ",12)+this.fillSpace(1,"ເສລີດ",9)+"\r\n";
						
					content = content+printThreeData("หมายเลข","อัตราต่อรอง","จำนวนเงิน"+'\n',this.printLang);
					
					this.printInfo.dataList.forEach((item,idx)=>{
						var codes = item.buyCodes;
						if(item.hasOneFlag==1){
							codes = codes+"#"
						}
						var plv = "1:"+item.peiRate;
						var bm = item.buyMoney;
						// content = content+
						// 	this.fillSpace(1,codes.toUpperCase(),10)+this.fillSpace(1,plv,12)+this.fillSpace(1,bm,9)+"\r\n";
						content = content+printThreeData(codes.toUpperCase(),plv,bm+'\n',this.printLang);
					}); 
					content = content+ fillChars("*",31)+"\n";	
					//笔数和总金额
					const bishu = "จำนวนธุรกรรม:"+this.printInfo.dataList.length;
					const totalMoney =" จำนวนทั้งหมด:"+this.printInfo.totalMoney;
					content = content+printOneData(bishu)+"\n"; //this.fillSpace(1,bishu,31)
					content = content+printOneData(totalMoney)+"\n"; //this.fillSpace(1,totalMoney,31)
					content = content+ fillChars("*",31)+"\n";	
					//期号
					const qihao = "ส่วนที่"+this.issueNo+"คาดหวัง"
					const validDays = "3ใช้ได้ภายในวัน";
					content = content+this.fillSpace(1,qihao,31)+"\n";
					content = content+this.fillSpace(1,validDays,31)+"\n";
					if(this.pager.pages>1){
						content = content+this.fillSpace(1,"ส่วนที่"+this.pager.currpage+"/"+this.pager.pages,31)+"\r\n";
					}
					content = content+emptyLine;
					return content;
				}
				
			},

			doPrint(){
				
				const _this = this;
				
				//已选中打印机
				var paired = uni.getStorageSync("printerSelected");
				if(paired==null || paired=="" || paired==undefined){
					showToastTip(_this.$t('bluetooth.unset'))	;
				}else{
					uni.showLoading({
						title:  _this.$t('kuaida.print.getData')//'正在获取打印数据',
					})
					// const textData = this.createPrintText(this.printLang);
					var textData = "";
					if(paired.name=="IposPrinter"){
						textData = this.createPrintTextBJ(this.printLang);
					}else{
						textData = this.createPrintText(this.printLang);
					}
					var reqUrl = this.panUrl+"vip/print/getBarCode";
					getRespDataWithUrl(reqUrl,'post',{
						id:_this.printInfo.printCacheId,
						screenCutCount:paired.name=="IposPrinter" ? '1' : (paired.name=="InnerPrinter" || paired.name=="V2" ? '2' : '0')
					},function(res){
						if(res.code==0){
							const bytesData = res.data.data;						
							var bytes = hexToBytes(bytesData); 
							uni.showLoading({
								title:  _this.$t('kuaida.printing')//'正在打印中...',
							})
							var data = printTicket(textData,bytes);
							uni.hideLoading();
							if(data.code==0){//打印成功
								var reqUrl = _this.panUrl+"vip/print/upPrintCount";
								getRespDataWithUrl(reqUrl,"post",{
									drawId:_this.drawId,
									id:_this.printInfo.printCacheId
								},function(res){
									if(res.code==0){
										_this.printInfo.printCount = _this.printInfo.printCount+1;
									}else{
										showToastTip(res.msg)						
									}
								});	
							}else{
								if(data.code==-1){
									showToastTip(_this.$t('print.fail'))	
								}else if(data.code==1){
									showToastTip(_this.$t('bluetooth.unset'))	
								}else if(data.code==2){
									showToastTip(_this.$t('bluetooth.openFirst'))	
								}
								//showToastTip(data.msg)	
							}
						}
					})
				}				
			},
			toScreenCut(){//截图
				const params = {
					drawId:this.drawId,
					issueNo:this.issueNo,
					currpage:this.pager.currpage,
					limit:this.pager.limit
					//printInfo:this.printInfo
				};
				const qs = encodeURIComponent(JSON.stringify(params));
				uni.navigateTo({
					url:'/pages/index/kuaida/screencut?qs='+qs
				})
			},
			initData(){//初始化数据
				const _this = this;
				var reqUrl = this.panUrl+"vip/code/unOpenPrize"
				getRespDataWithUrl(reqUrl,"get",{},function(res){
					if(res.code==0){
						if(res.data.draw!=null){
							_this.issueNo = res.data.draw.drawId;
							_this.drawId = res.data.draw.id;
						    _this.openStatus = res.data.draw.openStatus;
							switch(_this.openStatus){
								case 0:
									_this.openStatusDesc=_this.$t('drawClose'); //'已封盘';
									break;
								case 3:
									_this.openStatusDesc=_this.$t('drawOpening'); //'正在开盘中';
									break;
								case 2:
									_this.openStatusDesc=_this.$t('drawUnopen'); //'未开盘';
									break;
								defalut:
									_this.openStatusDesc='';
									break;
							}
							_this.getCodesList();
							_this.getPrintCacheCodeList();
							_this.getUndelList();
						}					
					}else{
						uni.showToast({
							title:_this.$t('kuaida.noDrawNo'), //'期号不存在',
							icon:'error'
						})
					}
				});		
			},
			getCodesList(){//本期下注号码(展示最新10条)
				const _this = this;
				var reqUrl = this.panUrl+"vip/v1/draw/searchBuyRecord";
				getRespDataWithUrl(reqUrl,'POST',_this.search,(res)=>{
					if(res.code==0){
						_this.buyCodes.dataList = res.data.dataList;
					}else{
						
					}
				})								
			},
			getPrintCacheCodeList(){//打印缓存号码
				const _this = this;
				var reqUrl = this.panUrl+"vip/v1/draw/printCacheList";
				getRespDataWithUrl(reqUrl,"POST",{
					pageNo:_this.pager.currpage,
					pageSize:_this.pager.limit,
					drawId:_this.drawId
				},function(res){
					if(res.code==0){							
						_this.printInfo.dataList = res.data.dataList;
						_this.pager.totals = res.count;
						_this.initPager();
						if(res.data.printCache!=null){
							_this.printInfo.printNo = res.data.printCache.lastPrintNo;
							_this.printInfo.printTime = res.data.printCache.printTime;
							_this.printInfo.printCount = res.data.printCache.printCount+1;
							_this.printInfo.printCacheId = res.data.printCache.id;
							_this.printInfo.screenCutCount = res.data.printCache.screenCutCount+1;
							_this.printInfo.batchNo = res.data.printCache.batchNo;
						}						
						_this.printInfo.totalAmount = res.data.dataList.length;
						_this.printInfo.totalMoney = res.data.totalMoney;	
														
						_this.scrollPager.pages = Math.ceil(_this.printInfo.dataList.length/_this.scrollPager.limit);
						_this.scrollPager.currpage = 1;
						_this.scrollPager.pageData=[];
						_this.initScrollPageData();
						
					}
				})
			},
			initPager(){
				this.pager.pages = Math.ceil(this.pager.totals/this.pager.limit);
				// this.pager.pageRange=[];
				// if(this.pager.pages>0){
				// 	for(var i=1;i<=this.pager.pages;i++){
				// 		this.pager.pageRange.push({
				// 			"pno":i,
				// 			"idx":i-1
				// 		});
				// 	}
				// }
				
				
			},
			doBackoutCodes(){//退码
				const _this = this;
				if(this.buyCodes.selectedIdArr.length<1){
					uni.showToast({
						title: _this.$t('kuaida.noCodeSelect'),//'未选择号码',
						icon:'error'
					})
					return;
				}
				uni.showLoading({
					title:_this.$t('chulizhong') //'处理中...'
				})
				var reqUrl = this.panUrl +"vip/draw/delUnbuyCode"
				getRespDataWithUrl(reqUrl,'POST',{
					idArr:_this.buyCodes.selectedIdArr,
					drawId:_this.issueNo+""
				},(res)=>{
					if(res.code==0){
						if(res.data.failSet.length>0){
							showToastTip(_this.$t('kuaida.backError'))
						}
						uni.$emit('updateCredit',{data:''}) //触发信用额度更新事件
						_this.buyCodes.selectedIdArr=[];
						_this.initData();
					}else{
						uni.showToast({
							title:res.msg,
							icon:'error'
						})
					}
					_this.getuuid();
				})
			},
			addBackoutCodes(e){
				this.buyCodes.selectedIdArr = e.detail.value;
			},
			calBuyTotalMoney(tp){
				var money = 0;
				if(tp==1){
					this.buyCodes.codeList.forEach((item,idx)=>{
						money = money + parseFloat(item.buyMoney);
					})							
					return money;
				}else if(tp==2){
					this.printInfo.dataList.forEach((item,idx)=>{
						money = money + parseFloat(item.buyMoney);
					})	
					return money;
				}else if(tp==3){
					this.stopCodes.dataList.forEach((item,idx)=>{
						money = money + parseFloat(item.buyMoney);
					})	
					return money;
				}
				
			},
			calStopTotalMoney(){
				var money = 0;
				this.stopBuyList.forEach((item,idx)=>{
					money = money + parseFloat(item.buyMoney);
				})
				return money;
			},
			clearInput(loc){
				this.clickLoc = loc;
				this.moneyHeight = 5;
				if(loc==1){
					this.buyCode = '';
					this.isPoint = 0;
					this.specialKey='X';
					this.hasOneCode = 0;
					this.peiRate = '';
					this.leftBuy = '';
					this.buyMoney = '';
				}else{
					this.buyMoney = ''
					this.isPoint = 1;
					this.specialKey='.';
				}
			},
			getKeyValue(v){						
				if(this.clickLoc==1){//点击号码
					if(v=="X"){
						//this.hasOneCode=0;	
						//this.quanzhuan=0;
						//this.sizixian = 0;
					}
					this.buyCode = this.buyCode+v;	
					if(this.buyCode.length==4){
						//this.sizixian = 0;
						//this.hasOneCode=0;	
						this.clickLoc =2;
						this.isPoint = 1;
						this.specialKey='.';
					}
					this.getPeiRate();
				}else{
					this.buyMoney = this.buyMoney+v;
					// if(this.buyMoney.length>6){
					// 	this.moneyHeight = 68;
					// }
					if(this.buyMoney.length>20){
						this.buyMoney = this.buyMoney.substr(0,20);
					}
				}
			},
			changMethodType(chkType){
				if(chkType==1){
					this.quanzhuan = 0;
					this.sizixian = this.sizixian==0?1:0;						
				}else{
					this.sizixian = 0;
					this.quanzhuan = this.quanzhuan==0?1:0
				}
				if(this.sizixian==1){
					this.hasOneCode = 1;
				}else{
					this.hasOneCode = 0;
				}	
				if(this.buyCode.length>0){
					this.getPeiRate();
				}
				// if(this.buyCode.length==4 && (this.buyCode.indexOf("X")<0 || this.buyCode.indexOf("x")<0)){
				// 	if(this.sizixian==1){
				// 		this.hasOneCode = 1;
				// 	}else{
				// 		this.hasOneCode = 0;
				// 	}			
				// }
				
				
			},
			toFangDa(){
				const params = encodeURIComponent(JSON.stringify({
					drawId:this.drawId
				}))
				uni.navigateTo({
					url:"/pages/index/kuaida/fangda?ps="+params
				})
			},
			toBuy(){//确定购买
			
				const _this = this;
				
				if(this.settingId==''){
					return;
				}
				this.buyCode = this.buyCode.toUpperCase();
				if(this.drawId==''){
					showToastTip(this.$t('kuaida.noOpenBuy')) //"暂未开放购买"
					return;
				}
				if(this.buyCode=='XXXX'){
					showToastTip(this.$t('kuaida.noSuchCode')) //"没有该号码"
					return;
				}
				if(this.buyCode.indexOf('X')>-1 && this.buyCode.length!=4){
					showToastTip(this.$t('kuaida.noSuchCode')) //"没有该号码"
					return;
				}
				if(this.buyCode.indexOf('X')<0 && this.buyCode.length<2){
					showToastTip(this.$t('kuaida.noSuchCode'))
					return;
				}

				if(this.buyMoney=='' || this.buyMoney.charAt(0)=='.'){
					showToastTip(this.$t('kuaida.noMoneyInput')); //"请输入购买金额"
					return;
				}
				const leftCredit = uni.getStorageSync("leftCredit");
				if(parseInt(leftCredit)<this.buyMoney){
					showToastTip(this.$t('kuaixuan.balanceNotEnough')) //"信用额度不足"
					return;
				}
				if(parseFloat(this.buyMoney)<this.minBuyLimit){
					showToastTip(this.$t('kuaida.money.tip1')+this.minBuyLimit)
					return;
				}
				var isXian = 0;
				if(this.buyCode.indexOf('X')<0){
					if(this.buyCode.length==4){
						if(this.sizixian==1){
							isXian = 1;
						}else{
							isXian = 0;
						}
					}else{
						isXian = 1;
					}			
				}
				//this.hasOneCode = 0;
				//调用接口更改会员额度后，
				uni.showLoading({
					title:_this.$t('chulizhong'), //'正在处理...',
					mask:true
				});
				var reqUrl = this.panUrl+'vip/v1/draw/app/buy?xzuuid='+_this.xzuuid
				getRespDataWithUrl(reqUrl,"POST",{
					"buyCodes":_this.buyCode,
					"buyMoney":_this.buyMoney,
					"hasOneFlag":isXian,
					"lotterSettingId":_this.settingId,
					"codesFrom":1,
					"buyMoney":_this.buyMoney,
					"drawId":_this.drawId,
					"quanzhuan":_this.quanzhuan
				},(res)=>{
					if(res.code==0){
						if(res.data.errcode==-1){
							showToastTip(res.msg)
						}else{
							showToastTip(_this.$t('kuaida.buySuccess')); //'购买成功'
							uni.$emit('updateCredit',{data:''}) 
							//_this.printInfo.printNo = res.data.printCache.batchNo;
							//_this.printInfo.printTime = res.data.printCache.printTime;							
						}	
						_this.buyCode = "";
						_this.buyMoney = "";
						_this.peiRate = "";
						_this.leftBuy = "";
						_this.clickLoc = 1;
						_this.hasOneCode = 0;
						_this.sizixian = 0;
						_this.quanzhuan = 0;
						_this.specialKey = 'X';
						_this.search.currpage=1;
						_this.getCodesList();
						_this.getPrintCacheCodeList();
						_this.getUndelList();
						
					}else if(res.code==1){
						showToastTip(res.msg)
					}else{
						showToastTip(res.msg)
					}
					_this.getuuid();
				})														
			},
			getPeiRate(){
				const _this = this;				
				if(this.buyCode!=""){
					var bc = this.buyCode.toUpperCase();
					var isXian = 0;
					if(bc.indexOf("X")<0){//不包含定位
						if(bc.length<2){
							return;
						}
						if(bc.length==4){
							if(this.sizixian==1){
								this.hasOneCode=1;
								isXian=1;
								//this.quanzhuan=0;
							}else{
								this.hasOneCode=0;
								isXian=0;
							}
						}else{
							isXian = 1;
							this.hasOneCode=1;
							//this.quanzhuan=0;
						}						
					}else{
						//this.quanzhuan=0;
						//this.hasOneCode=0;
						if(this.sizixian==1){
							this.hasOneCode=1;
						}else{
							this.hasOneCode=0;
						}
						if(bc=='XXXX'){
							return;
						}
						if(bc.length<4){
							return;
						}
											
					}
					//调用接口获取赔率和可下注数
					var reqUrl = this.panUrl+"vip/draw/getPeiRate"
					getRespDataWithUrl(reqUrl,"POST",{
						"buyCodes":bc,
						"hasOneFlag":isXian,
						"drawId":_this.drawId
					},(res)=>{
						if(res.code==0){
							_this.minBuyLimit = res.data.minMoney;
							_this.maxBuyLimit = res.data.maxBettingCount;
							_this.price = res.data.minMoney;
							_this.peiRate = res.data.peiRate;
							_this.leftBuy = res.data.maxNumberTypeCount>0?res.data.maxNumberTypeCount:0;	
							_this.settingId = res.data.settingId;
						}else{
							_this.peiRate = '';
							_this.leftBuy ='';
							_this.settingId = '';
							_this.price='';
							_this.minBuyLimit = '';
							_this.maxBuyLimit='';
						}
					})
				}
			},
		
			clearCache(){//清空打印缓存信息
				const _this = this;
				uni.showLoading({
					title:_this.$t('doClear') //'正在清除中...'
				})
				var reqUrl = this.panUrl+"vip/draw/clearPrint"
				getRespDataWithUrl(reqUrl,'POST',{
					drawId:_this.drawId
				},(res)=>{
					if(res.code==0){
						_this.printInfo.printNo='';
						_this.printInfo.printTime = '';
						_this.printInfo.printCount=1;
						_this.printInfo.dataList=[];
						_this.printInfo.totalMoney=0;
						_this.printInfo.batchNo = '';
					}
				})
			},
			getUndelList(){//未删除的停押号码列表
				const _this = this;
				this.searchUndel.drawId = this.drawId;
				if(this.searchUndel.loadMore){
					var reqUrl = this.panUrl+"vip/v1/stopBuyCodes/listByPage"
					getRespDataWithUrl(reqUrl,"post",_this.searchUndel,(res)=>{
						if(res.code==0){
							_this.stopCodes.dataList = res.data;
							var money = 0;
							_this.stopCodes.dataList.forEach((item,idx)=>{
								money = money + parseFloat(item.buyMoney)
							})
							_this.stopCodes.totalMoney = money
						}
					})
				}				
			},
			delStopCodes(){//删除停押号码
				const _this = this;
				if(this.stopCodes.selectedIdArr.length<1){
					showToastTip(_this.$t('fangda.noCodeSelect')); //"未选择要删除的停押号码"
					return;
				}
				uni.showLoading({
					title:_this.$t('chulizhong'), //'正在处理...',
					mask:true
				})
				var reqUrl = this.panUrl+"vip/stopBuyCodes/delete"
				getRespDataWithUrl(reqUrl,"POST",{
					idList:_this.stopCodes.selectedIdArr
					
				},(res)=>{
					if(res.code==0){
						_this.stopCodes.selectedAll=false;
						_this.getUndelList();
					}else{
						showToastTip(res.msg);
					}
				})
			},										
			
			getStrLen(str){
				var realLength = 0, len = str.length, charCode = -1;
			      for (var i = 0; i < len; i++) {
			        charCode = str.charCodeAt(i);
					if(this.printLang=='lao'){
						realLength += 1;
					}else{
						if (charCode >= 0 && charCode <= 128)
				          realLength += 1;
				        else
				          realLength += 2;
					}			       
			      }
			      return realLength;
			},
			
			fillSpace(loc,content,totalLen){//填充空格
				var clen = this.getStrLen(content);
				var newContent = "";
				if(totalLen>clen){
					newContent = content;
					for(var i=0;i<(totalLen-clen);i++){
						if(loc==0){//左填充空格
							newContent = " "+newContent;
						}else if(loc==1){//右边填充空格
							newContent = newContent+" ";
						}
					}
					return newContent;
				}else{
					return content.substr(0,totalLen+1);
				}
			}
			
		}
	}
</script>

<style>
	
	.buyBtn{
		z-index:10;
		bottom:5rpx;
		right: 5rpx;
		width: 90rpx;
		height: 90rpx;
		border-radius: 45rpx;
		line-height: 90rpx;
		background-color: blueviolet;
		color:white;
		position: fixed;
		text-align: center;
	}
	.haoma{
		border-bottom: 3px solid #aaaaaa;
		width:120rpx;
		color: red;
		font-size: 23px;
		font-weight: bold;
		text-align: center;
	}
	.jine{
		border-bottom: 3px solid #aaaaaa;
		width:120rpx;
		color: red;
		font-weight: bold;
		text-align: center;
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
	.kbkey:active{
		background-color: #ebeb75 !important;
	}
	
	.dataRow{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.codeBackRow{
		background-color: red;
		/* color: #C22E2E;
		 */
	}
	
	.kdcontent{
		/* padding: 10rpx; */
		/* position: fixed; */
		width:100%;
		/* top:0; */
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding-top:10rpx;
		height: 100%;
	}
	
	.tableCell{
		height: 50rpx;
		line-height: 50rpx;
		flex-grow: 1;
		border-top:1px solid gray;
		border-bottom:1px solid gray;
		border-left:1px solid gray;
		text-align: center;
	}
	.tableCell3{
		width:33.3%;
		/* overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical; */
	}
	.tableCell4{
		width:25%
	}
	.tableCell5{
		width:20%
	}
	
	.tableCell40{
		width:40%
	}
	.thItem{
		background-color: #eeeeee;
	}
	.tdItem{
		/* background-color: #f7f7f7; */
		border-top:none;
	}
	.thlast,.tdlast{
		border-right:1px solid gray;
	}
		
	.btnAll{
		width: 120rpx;
		height: 50rpx;
		line-height:50rpx;
		background-color: #8150CA;
		border-radius: 10rpx;
		margin: 2rpx 10rpx;
		text-align: center;
		color:white;
	}
	
	.btnPrint{
		width: 120rpx;
		height: 50rpx;
		line-height:50rpx;
		background-color: #8150CA;
		border-radius: 10rpx;
		margin: 2rpx 10rpx;
		text-align: center;
		color:white;
	}
	
	.btnPrint:active,.btnAll:active{
		background-color: #ebeb75 !important;
	}
	
	.btnBackcode{
		width: 90rpx;
		height: 45rpx;
		line-height: 45rpx;
		margin:2rpx;
		background-color: #8150CA;
		border-radius: 10rpx;
		text-align: center;
		color:white;
		font-size: 26rpx;
	}
	.btnBackcode:active{
		background-color: #ebeb75 !important;
	}
	
	.kbContainer{
		/* padding-bottom:env(safe-area-inset-bottom); */
		background-color:white; 
		height:260rpx;
		display: flex;
		flex-direction: column;
		position: fixed;
		width: 100%;
		z-index:20;
	}
	
	.searchCondiRow{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding:20rpx 0rpx;
		border-bottom:1px solid #aaaaaa;
	}
	
	.inputActive{
		border-bottom: 3px solid orangered;
	}
	
	.daliuwei{
		font-size: 15px;
		padding: 6px 0 4px 0;
	}
	.xiaoliuwei{
		font-size: 23px;
	}
	.moneyInput{
		color: red;
		background-color: white;
		padding-left: 10px;
		font-size: 23px;
		font-weight: bold;
		position: fixed;
		z-index: 9999;
		bottom:260rpx;
		width: 100%;
	}
</style>
