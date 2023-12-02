<template>
	<view style="display: flex;flex-direction: column;justify-content:space-between;height: 100%;">
		<uni-nav-bar dark :fixed="true" shadow status-bar
					:title="$t('fangda.stopCode')" backgroundColor="#8150CA" @clickLeft="backTo()" leftIcon="back"/>
		<view style="align-items: flex-start;padding-top:5rpx;" 
			:style="{'height':dynamicCss.winH*0.5+'rpx'}">			
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view class="tableCell tableCell3 thItem" style="width: 45%;">方案</view>
				<view class="tableCell tableCell3 thItem" style="width: 20%;">号码</view>
				<view class="tableCell tableCell3 thItem" style="width: 20%;">金额</view>
				
				<view class="tableCell tableCell3 thItem last" style="width: 15%;">
					<checkbox-group @change="chooseAll">
						<checkbox style="transform: scale(0.8);" value="all" :checked="undelCodesObj.selectedAll"></checkbox>
					</checkbox-group>
				</view>
			</view>
			<scroll-view :style="{height:(defaultRows*60+defaultRows*2)+'rpx'}" scroll-y="true" @scrolltolower="unDelNextPage" lower-threshold="0">
				<checkbox-group  @change="chooseOne">
					<view v-if="undelCodesObj.dataList.length>0" v-for="(item,index) in undelCodesObj.dataList"
						style="display: flex;justify-content: space-between;align-items: center;">
						<view class="tableCell tableCell3 thItem" style="width: 45%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{item.fanganName}}</view>
						<view class="tableCell tableCell3 tdItem" style="width: 20%;">{{item.codes}}</view>	
						<view class="tableCell tableCell3 tdItem" style="width: 20%;">{{item.buyMoney}}</view>
						
						<view class="tableCell tableCell3 tdItem last" style="width: 15%;">
							<checkbox style="transform: scale(0.8);" :value="item.id" :checked="undelCodesObj.selectedIdArr.includes(String(item.id))"></checkbox></view>
					</view>
					<view v-if="defaultRows-undelCodesObj.dataList.length>0" v-for="index in (defaultRows-undelCodesObj.dataList.length)" style="display: flex;justify-content: space-between;align-items: center;">
						<view class="tableCell tableCell3 tdItem" style="width: 45%;">--</view>
						<view class="tableCell tableCell3 tdItem" style="width: 20%;">--</view>
						<view class="tableCell tableCell3 tdItem last" style="width: 20%;">--</view>
						<view class="tableCell tableCell3 tdItem last" style="width: 15%;">--</view>
					</view>										
				</checkbox-group>
			</scroll-view>
			<view style="display: flex;justify-content: left;align-items: center;padding-left: 10rpx;">
				<text>{{$t('kuaida.number-of-transactions')}}:{{undelCodesObj.dataList.length}}</text>
				<text style="margin-left:5rpx">{{$t('kuaida.total-amount')}}:{{undelCodesObj.totalMoney}}</text>
			</view>
			<view style="display: flex;justify-content: center;align-items: center;">
				<!-- <view class="btnAll" @click="closePage">{{$t('bluetooth.close')}}</view> -->
				<view class="btnAll" @click="delCodes" style="background-color: #8150CA;">{{$t('kuaida.delete')}}</view>
			</view>
		</view>
		
		<view style="display:flex;flex-direction:column;justify-content:flex-start;padding-top: 5rpx;" 
			:style="{'height':dynamicCss.winH*0.5+'rpx'}">
			<!-- 保留区-->
			<view style="padding-left: 10rpx;"><text>{{$t('fangda.sctyhmblq')}}</text></view>
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view class="tableCell tableCell3 thItem" style="width: 60%;">方案</view>
				<view class="tableCell tableCell2 thItem" style="width: 20%;">{{$t('kuaida.number')}}</view>
				<view class="tableCell tableCell2 thItem" style="width: 20%;">{{$t('kuaida.money')}}</view>
			</view>
			<scroll-view :style="{height:(defaultRows*60+defaultRows*2)+'rpx'}" scroll-y="true" @scrolltolower="delNextPage" lower-threshold="0">
				<view v-if="delCodesObj.dataList.length>0" v-for="(item,index) in delCodesObj.dataList" 
					style="display: flex;justify-content: space-between;align-items: center;">
					<view class="tableCell tableCell3 thItem" style="width: 60%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{item.fanganName}}</view>
					<view class="tableCell tableCell2 tdItem" style="width: 20%;">{{item.codes}}</view>
					<view class="tableCell tableCell2 tdItem" style="width: 20%;">{{item.buyMoney}}</view>
				</view>
				<view v-if="defaultRows-delCodesObj.dataList.length>0" 
					v-for="index in (defaultRows-delCodesObj.dataList.length)" 
					style="display: flex;justify-content: space-between;align-items: center;">
					<view class="tableCell tableCell2 tdItem" style="width: 60%;">--</view>
					<view class="tableCell tableCell2 tdItem" style="width: 20%;">--</view>
					<view class="tableCell tableCell2 tdItem" style="width: 20%;">--</view>
				</view>				
			</scroll-view>
			<view style="display: flex;justify-content: left;align-items: center;padding-left: 10rpx;">
				<text>{{$t('kuaida.number-of-transactions')}}:{{delCodesObj.dataList.length}}</text>
				<text style="margin-left:5rpx">{{$t('kuaida.total-amount')}}:{{delCodesObj.totalMoney}}</text>
			</view>		
			
		</view>
		
	</view>
</template>

<script>
	import { getResponseData,showToastTip,getRespDataWithUrl } from '@/api/req.js'
	export default {
		data() {
			return {
				drawId:'',
				defaultRows:6,
				delCodesObj:{
					dataList:[],
					totalMoney:'',
					search:{
						drawId:'',
						deleteFlag:1,
						pageNo:1,
						pageSize:15,
						loadMore:true,
						totalMoney:''
					}
				},
				undelCodesObj:{
					dataList:[],
					totalMoney:'',
					selectedAll:false,
					selectedIdArr:[],
					search:{
						drawId:'',
						deleteFlag:0,
						pageNo:1,
						pageSize:15,
						loadMore:true,
						totalMoney:''
					}
				},
				dynamicCss:{
					barHeight:0,
					winH:0
				},
				panUrl:""
			}
		},
		onLoad(option) {
			this.panUrl = uni.getStorageSync("panUrl")
			const ps = JSON.parse(decodeURIComponent(option.ps));
			this.drawId = ps.drawId;
			const barHeight = uni.getStorageSync("statusBarH");
			this.dynamicCss.barHeight= barHeight
			const winH = uni.getStorageSync("winH");
			this.dynamicCss.winH=winH-barHeight-44*2; //自定义导航栏的高度默认为44px
			
			const maxRows = parseInt((this.dynamicCss.winH*0.5-180)/60);
			this.defaultRows = maxRows;
			uni.showLoading({
				title:''
			})
			this.getUndelList();
			this.getDeleteList();
		},
		methods: {
			backTo(){
				uni.navigateBack()
			},
			delCodes(){
				const _this = this;
				if(this.undelCodesObj.selectedIdArr.length<1){
					showToastTip(this.$t("fangda.noCodeSelect")); //"未选择要删除的停押号码"
					return;
				}
				uni.showLoading({
					title:this.$t("chulizhong"), //'正在处理',
					mask:true
				})
				var reqUrl = this.panUrl+"vip/stopBuyCodes/delete"
				getRespDataWithUrl(reqUrl,"POST",{
					idList:_this.undelCodesObj.selectedIdArr					
				},(res)=>{
					if(res.code==0){
						_this.undelCodesObj.selectedIdArr=[]
						_this.undelCodesObj.selectedAll=false;
						_this.undelCodesObj.dataList=[];
						_this.delCodesObj.dataList=[];
						_this.getUndelList();
						_this.getDeleteList();
					}else{
						showToastTip(res.msg);
					}
				})
			},
			chooseAll(e){//全选
				const checkItem = e.detail.value;
				if(checkItem[0]=="all"){
					this.undelCodesObj.selectedAll = true;
					for(let item of this.undelCodesObj.dataList){
						let itval = String(item.id);
						if(!this.undelCodesObj.selectedIdArr.includes(itval)){
							this.undelCodesObj.selectedIdArr.push(itval);
						}
					}
				}else{
					this.undelCodesObj.selectedAll = false;
					this.undelCodesObj.selectedIdArr=[];
				}
			},
			chooseOne(e){
				this.undelCodesObj.selectedIdArr = e.detail.value;
				let selectedLen = this.undelCodesObj.selectedIdArr.length;
				if(selectedLen>0 && selectedLen==this.undelCodesObj.dataList.length){
					this.undelCodesObj.selectedAll = true;
				}else{
					this.undelCodesObj.selectedAll = false;
				}
			},
			
			getDeleteList(){
				const _this = this;
				const searchps = this.delCodesObj.search;
				searchps.drawId = this.drawId;		
				var reqUrl = this.panUrl+"vip/v1/stopBuyCodes/listByPage"
				getRespDataWithUrl(reqUrl,"post",searchps,(res)=>{
					if(res.code==0){
						const dl = res.data;
						const len = dl.length;
						if(len>0){
							dl.forEach((item,idx)=>{
								_this.delCodesObj.dataList.push(item);
							})
						}							
						var money = 0;
						_this.delCodesObj.dataList.forEach((item,idx)=>{
							money = money + parseFloat(item.buyMoney)
						})
						_this.delCodesObj.totalMoney = money
						if(len<searchps.pageSize){
							_this.delCodesObj.search.loadMore = false;
						}else{
							_this.delCodesObj.search.loadMore = true;
						}
					}
				})								
			},
			
			unDelNextPage(){
				if(this.undelCodesObj.search.loadMore){
					this.undelCodesObj.search.pageNo++;
				}
			},
			getUndelList(){
				const _this = this;
				const searchps = this.undelCodesObj.search;
				searchps.drawId = this.drawId;		
				var reqUrl = this.panUrl+"vip/v1/stopBuyCodes/listByPage"
				getRespDataWithUrl(reqUrl,"post",searchps,(res)=>{
					if(res.code==0){
						const dl = res.data;
						const len = dl.length;
						dl.forEach((item,idx)=>{
							_this.undelCodesObj.dataList.push(item);
						})	
						if(len<searchps.pageSize){
							_this.undelCodesObj.search.loadMore = false;
						}else{
							_this.undelCodesObj.search.loadMore = true;
						}
						var money = 0;
						_this.undelCodesObj.dataList.forEach((item,idx)=>{
							money = money + parseFloat(item.buyMoney)
						})
						_this.undelCodesObj.totalMoney = money
					}
				})
								
			},
			delNextPage(){
				if(this.delCodesObj.search.loadMore){
					this.delCodesObj.search.pageNo++;
				}
			},
		
		
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
	}
	
	.thItem{
		background-color: #eeeeee;
	}
	.tdItem{
		
		border-top:none;
	}
	.thlast,.tdlast{
		border-right:1px solid gray;
	}
	.thfirst,.tdfirst{
		border-left:1px solid gray;
	}
	.tableCell3{
		width:33.3%
	}
	.tableCell2{
		width:50%
	}
	.btnAll{
		width: 120rpx;
		height: 56rpx;
		line-height:56rpx;
		background-color: blueviolet;
		border-radius: 10rpx;
		margin: 6rpx 10rpx;
		text-align: center;
		color:white
	}
	.btnAll:active{
		background-color: #ebeb75 !important;
	}
	
</style>
