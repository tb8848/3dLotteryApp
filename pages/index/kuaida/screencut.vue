<template>
	
	<view class="kdcontent">
		
		<uni-nav-bar dark :fixed="true" shadow status-bar  :right-text="$t('index.full-description')"
					:title="$t('quanjie.title1')" @clickRight="toCutFullDesc" backgroundColor="#8150CA" leftIcon="back" @clickLeft="backTo"/> <!--小票截图 -->
					
		<view style="display:flex;justify-content:flex-end;margin:10rpx">
			<view @click="canvasImage.generateImage" class="btnAll" style="background-color: #8150CA;">{{$t("kuaida.screenshot")}}</view>
			<view class="btnAll" @click="fullCut" style="background-color: #8150CA;">{{$t("index.quanjie")}}<!-- 全截 --></view>
		</view>
		<view style="display: flex;flex-direction:column;justify-content: center;padding:10rpx 15%" id="pageCut">
	
		
				<view style="text-align: right;"><text>{{$t('index.unit.desc')}}<!-- 单位: 元 --></text></view>
				<view style="border:1px solid #666666;flex-grow: 1;">
					<view style="text-align: center;">
						<text style="color:orangered">{{lotteryName}}</text>
						<text style="font-size: 28rpx;">({{$t('kuaida.section')}}{{printInfo.screenCutCount}}{{$t('kuaida.screencut.times')}})</text>
					</view>
					<view style="margin-bottom: 30rpx;">
						<view><text>{{$t('kuaida.time')}}:{{printInfo.printTime}}</text></view>
						<view><text>{{$t('kuaida.member')}}:{{uname}}</text></view>
						<view><text>{{$t('kuaida.bianhao')}}:{{printInfo.batchNo}}</text></view>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view class="tableCell tableCell40 thItem" style="width: 30%;">{{$t('kuaida.number')}}</view>
						<view class="tableCell tableCell40 thItem" style="width: 30%;">{{$t('kuaida.odds')}}</view>
						<view class="tableCell tableCell5 thItem last" style="width: 40%;">{{$t('kuaida.money')}}</view>
					</view>
					
					<view>
						<view v-if='printInfo.dataList.length>0' v-for="(item,index) in printInfo.dataList" style="display: flex;justify-content: space-between;align-items: center;">
							<view class="tableCell tableCell40 tdItem" style="display: flex;justify-content: center;width: 30%;">
								<text>{{getCodeName(item,"-")}}</text>
								<text v-if="item.hasOneFlag==1" style="color: orangered;">{{$t('mingxi.present')}}</text></view>
							<view class="tableCell tableCell40 tdItem" style="width: 30%;">{{item.param3}}</view>
							<view class="tableCell tableCell5 tdItem last" style="width: 40%;">{{item.buyMoney}}</view>
						</view>	
						<view v-if='(defaultPrintCount-printInfo.dataList.length)>0' v-for="index in (defaultPrintCount-printInfo.dataList.length)" >
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view class="tableCell tableCell40 tdItem" style="width: 30%;">--</view>
								<view class="tableCell tableCell40 tdItem" style="width: 30%;">--</view>
								<view class="tableCell tableCell5 tdItem last" style="width: 40%;">--</view>
							</view>
						</view>
					</view>

					<view style="display: flex;justify-content: left;align-items: center;" v-if="langType==0">
						<text>{{$t('kuaida.number-of-transactions')}}:{{printInfo.dataList.length}}</text>
						<text style="margin-left:5rpx">{{$t('kuaida.total-amount')}}:{{printInfo.totalMoney}}</text>
					</view>	
					
					<view style="display: flex;justify-content: left;align-items: flex-start;flex-direction: column;" v-if="langType==1">
						<text>{{$t('kuaida.number-of-transactions')}}:{{printInfo.dataList.length}}</text>
						<text style="margin-left:5rpx">{{$t('kuaida.total-amount')}}:{{printInfo.totalMoney}}</text>
					</view>	
					
					
					<view style="display: flex;justify-content: center;align-items: center;">
						<view class="btnAll" @click="clearCache()" style="background-color: #8150CA;">{{$t('kuaida.empty')}}</view>
					</view>	<!-- 60 -->	
											
				</view>
								
				<view style="display: flex;justify-content: left;align-items: center;" v-if="langType==0">
					<text>{{$t('kuaida.section')}} {{issueNo}} {{$t('kuaida.stage')}}</text>
					<text>3{{$t('kuaida.valid-within-days')}}！</text>					
				</view>	
				
				<view style="display: flex;justify-content: left;align-items: flex-start;flex-direction: column;" v-if="langType==1">
					<text>{{$t('kuaida.section')}} {{issueNo}} {{$t('kuaida.stage')}}</text>
					<text>3{{$t('kuaida.valid-within-days')}}！</text>					
				</view>	
		
		</view>

	</view>
	
</template>

<script>
	
	import { getResponseData, showToastTip,getBaseUrl,getRespDataWithUrl } from "@/api/req.js";
	import { pathToBase64, base64ToPath } from '../../../static/js/image-tools.js';
	export default {
		data() {
			return {
				langType:0,
				drawId:"",
				issueNo:"------",
				uname:"",
				codeList:[],				
				defaultPrintCount:3,	
				printInfo:{
					printCount:1,
					screenCutCount:1,
					printTime:'',
					printNo:'',
					printCacheId:'',
					totalAmount:"",
					totalMoney:"",
					dataList:[],
				},
				pager:{
					currpage:1,
					limit:500
				},
				cssHeights:{
					headerMarginTop:0,
					headerHeight:0,
					contentMarginTop:0,
					contentHeight:0
				},
				posterUrl:"",
				panUrl:"",
				lotteryName:''
			}
		},
		onLoad(option) {
			this.lotteryName = uni.getStorageSync("lotteryName")
			this.panUrl = uni.getStorageSync("panUrl");
			this.uname = uni.getStorageSync("uname");
			const qs = JSON.parse(decodeURIComponent(option.qs));
			this.drawId=qs.drawId;
			this.issueNo = qs.issueNo;
			this.pager.currpage = qs.currpage;
			this.pager.limit = qs.limit;
			
			this.getPrintCacheCodeList();
			
			const lang = uni.getStorageSync("lang");
			this.initLangType(lang)
		},
		methods: {
			initLangType(lang){
				if(lang=='tai'){
					this.langType = 1		
				}else{
					this.langType = 0
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
			
			getPrintCacheCodeList(){//打印缓存号码
				const _this = this;
				uni.showLoading({
					title: _this.$t('kuaida.dataLoading'),//"数据加载中",
					mask:true
				});
				var reqUrl = this.panUrl +"vip/v1/draw/printCacheList"
				getRespDataWithUrl(reqUrl,"POST",{
					pageNo:_this.pager.currpage,
					pageSize:_this.pager.limit,
					drawId:_this.drawId
				},function(res){
					if(res.code==0){							
						_this.printInfo.dataList = res.data.dataList;
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
					}
				})
			},
			clearCache(){//清空打印缓存信息
				const _this = this;
				var reqUrl = this.panUrl+"vip/draw/clearPrint";
				getRespDataWithUrl(reqUrl,'POST',{
					drawId:_this.drawId
				},(res)=>{
					if(res.code==0){
						_this.printInfo.printNo='';
						_this.printInfo.printTime = '';
						_this.printInfo.printCount=1;
						_this.printInfo.dataList=[];
						_this.printInfo.totalMoney=0
						_this.printInfo.screenCutCount=1;
					}
				})
			},
			toCutFullDesc(){
				uni.navigateTo({
					url:"/pages/index/more/quanjie"
				})
			},
			fullCut(){
				const _this = this;
				uni.showLoading({
					title: _this.$t('kuaida.fileReading'),//"正在读取文件",
					mask:true
				});
				var curUrl = "/screencut/fullCut";
				if(this.langType==1){
					curUrl = "/screencut/fullCut2";
				}
				var reqUrl = this.panUrl+"vip"+curUrl;
				getRespDataWithUrl(reqUrl,"POST",{},(res)=>{
					if(res.code==0){
						var pdfName = res.data;
						var baseUrl = getBaseUrl();
						// var urlStr = baseUrl+"/screencut/getPdf?imgName="+pdfName;
						// if(this.langType==1){
						var urlStr = baseUrl+"/screencut/getPdf2?imgName="+pdfName;
						// }
						console.log("======================fileUrl==",urlStr)
						uni.downloadFile({
							url: urlStr,//文件地址
							success(res) {
								if (res.statusCode === 200) {
									uni.showToast({
										title:  _this.$t('kuaida.fileDownSuccess')//'下载成功！'
									})
									console.log(res.tempFilePath)
									_this.printInfo.screenCutCount=_this.printInfo.screenCutCount+1;
									_this.subScreenCut()
									uni.saveImageToPhotosAlbum({
										  filePath: res.tempFilePath,
										  success: function() {
											uni.showToast({
											  title:  _this.$t('kuaida.savePathTip'),//"文件已保存至/DCIM/CAMERA文件夹下",
											  icon: "none"
											})
											
											setTimeout(function() {
											  // 预览pdf文件
											  uni.openDocument({
												filePath: res.tempFilePath,
												showMenu: true,
												success: function(file) {
												  console.log("file-success", file)
												},
												fail:function(err){
													showToastTip(_this.$t('kuaida.fileOpenFail')); //"无法打开pdf文件，请确认是否已安装了WPS Office app"
												}
											  })
											}, 1500)
										  },
										  fail: function() {
											uni.showToast({
											  title:  _this.$t('kuaida.saveError'),//"保存失败，请稍后重试！",
											  icon: "none"
											})
										  }
									})
								}
							},
							fail(err) {
								console.log(err)
							}
						})
					}
				})
			},
			backTo(){
				uni.navigateBack()
			},
			subScreenCut(){
				if(this.printInfo.printCacheId!=''){
					const _this = this;
					//uni.showLoading({})
					var reqUrl = this.panUrl +"vip/draw/saveScreenCut"
					getRespDataWithUrl(reqUrl,"POST",{
						id:_this.printInfo.printCacheId,
					},(res)=>{
						if(res.code==0){
							showToastTip(_this.$t('kuaida.screencut.success')) //"截图成功"
							_this.printInfo.screenCutCount=_this.printInfo.screenCutCount+1;
						}
					})
				}
				
			},
			/* 将base64 位的图片路径转换为 临时路径 */
			loadBase64Url() {
			  const imageStr = this.posterUrl;
			  base64ToPath(imageStr)
			    .then(path => {
			      this.saveImage(path);
			    })
			    .catch(error => {
			      console.error('临时路径转换出错了：', error);
			    });
			},
			
			// 保存图片到手机相册
			saveImage(filePath) {
				var _this = this;
			  uni.saveImageToPhotosAlbum({
			    filePath, // 需要临时文件路径，base64无法保存
			    success: () => {
			      this._showToast(_this.$t('kuaida.saveImgSuccess')); //'保存图片成功'
				  this.subScreenCut();
			    },
			    fail: () => {
			      this._showToast(_this.$t('kuaida.saveError')); //'保存失败，请重试'
			    }
			  });
			},
			
			// 将图片转为base 64 位url
			turnBase64Image(img, key) {
			  uni.getImageInfo({
			    src: img,
			    success: image => {
			      pathToBase64(image.path)
			        .then(base64 => {
			          this[key] = base64;
			        })
			        .catch(error => {
			          console.log('转换失败：', error);
			        });
			    },
			    fail: err => {
			      console.log('将本地图片转为base 64报错:', err);
			    }
			  });
			},
			
			// 获取生成的base64 图片路径
			receiveRenderData(val) {
			  this.posterUrl = val.replace(/[\r\n]/g, ''); // 去除base64位中的空格
			  if(this.posterUrl!=""){
				  this.loadBase64Url();
			  }
			},
			
			// 显示loading
			_showLoading() {
				var that = this;
			  this.posterUrl = '';
			  uni.showLoading({
			    title: this.$t("kuaida.imgCreating")
			  });
			},
			
			// 隐藏loading
			_hideLoading() {
			  uni.hideLoading();
			
			  // #ifdef H5
			  this._showToast('长按保存图片');
			  // #endif
			},
			
			// 报错alert
			_errAlert(content) {
				var _this = this;
			  uni.showModal({
			    title: _this.$t('bluetooth.alertTitle'), //'提示',
			    content: content,
				showCancel:false,
				confirmText:_this.$t('bluetooth.confirm')
			  });
			},
			
			// 提示弹窗
			_showToast(msg) {
			  uni.showToast({
			    title: msg,
			    icon: 'none'
			  });
			}
		}
	}
</script>


<script lang="renderjs" module="canvasImage">
import html2canvas from '../../../static/js/html2canvas.js'
export default {
  methods: {
    // 生成图片需要调用的方法
    generateImage(e, ownerFun) {
      ownerFun.callMethod('_showLoading',"") // 生成图片的 loading 提示 //'正在生成图片'
      setTimeout(() => {
        const dom = document.getElementById('pageCut') // 需要生成图片内容的 dom 节点
        html2canvas(dom, {
          width: dom.clientWidth, //dom 原始宽度
          height: dom.clientHeight,
          scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
          scrollX: 0,
          useCORS: true, //支持跨域
          // scale: 2, // 设置生成图片的像素比例，默认是1，如果生成的图片模糊的话可以开启该配置项
        }).then((canvas) => {
          // 生成成功
          // html2canvas 生成成功的图片链接需要转成 base64位的url
          ownerFun.callMethod('receiveRenderData', canvas.toDataURL('image/png'))
        }).catch(err=>{
          // 生成失败 弹出提示弹窗
          ownerFun.callMethod('_errAlert',`【生成图片失败，请重试】${err}`)
        })
      }, 300)
    }
  }
}
</script>

<style>
	
	
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
	.kdcontent{
		/* padding: 10rpx; */
		/* position: fixed;
		width:100%;
		top:0;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding-top:10rpx; */
	}
	
	.tableCell5{
		width:20%
	}
	
	.tableCell40{
		width:40%
	}
	
	.tableCell{
		height: 60rpx;
		line-height: 60rpx;
		flex-grow: 1;
		border-top:1px solid gray;
		border-bottom:1px solid gray;
		border-left:1px solid gray;
		text-align: center;
	}
	.tableCell3{
		width:33.3%;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	.tableCell4{
		width:25%
	}
	.thItem{
		background-color: #eeeeee;
	}
	.tdItem{
		background-color: #f7f7f7;
		border-top:none;
	}
	.thlast,.tdlast{
		border-right:1px solid gray;
	}
	
	
	.btnAll{
		width: 120rpx;
		height: 56rpx;
		line-height:56rpx;
		background-color: blueviolet;
		border-radius: 10rpx;
		margin: 2rpx 10rpx;
		text-align: center;
		color:white
	}
	.btnAll:active{
		background-color: #ebeb75 !important;
	}
</style>
