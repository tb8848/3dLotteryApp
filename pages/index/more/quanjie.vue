<template>
	<view>
		<uni-nav-bar dark  :fixed="true" status-bar :title="$t('index.full-description')"
		leftIcon="back" @clickLeft="backTo" backgroundColor="#8150CA"/> <!--全截说明 -->
		
		<view class="rule-box">
			<div class="desc">{{$t("quanjie.tip1")}}<!-- 比如:”截图”：单页截图分享给客户；”全截”：全部注单截图分享给客户 --></div>
			<div class="desc">
				<b>{{$t("quanjie.pc")}}<!-- 电脑版 --></b>
				<span>{{$t("quanjie.tip2")}}<!-- →小票截图→点击全截→弹出下载窗口→选择下载路径→桌面或（C或D盘）→下载完成后→找到下载的档案→打开文件→核对内容后分享客户 --></span></div>
			<div class="desc">
				<b>{{$t("quanjie.wap")}}<!-- 手机版 --></b>
				<span>{{$t("quanjie.tip3")}}<!-- →小票截图→点击全截→弹出下载窗口→点击下载→完成后→选择 WPS office 打开（如果找不到WPS，在桌面找或手机屏幕往右滑动搜索中输入（WP）找到 WPS office）→点击进入后→点击打开找到PDF进入→找到下载的档案→打开文件→核对内容后分享客户 --></span></div>
			<div class="desc">
				<b>{{$t("quanjie.app")}}<!-- APP版 --></b>
				<span>{{$t("quanjie.tip4")}}<!-- →小票截图→点击全截→下载完成后→选择 WPS office 打开（如果找不到WPS，在桌面找或手机屏幕往右滑动搜索中输入（WP）找到 WPS office）→点击进入后→点击打开找到PDF进入→找到下载的档案→打开文件→核对内容后分享客户 --></span></div>
			 <div class="desc"><span>{{$t("quanjie.tip5")}}<!-- 以上如果是使用 --></span><a><!-- 截图 -->{{$t("quanjie.jietu")}}</a>{{$t("quanjie.tip6")}}<!-- 功能，能直接将 --><a>{{$t("quanjie.tip7")}}<!-- 图片(*.jpg) --></a>{{$t("quanjie.tip8")}}<!-- 分享给客户 --></div>
			 <div class="desc">
				 <div>{{$t("quanjie.tip11")}}<!-- 图档名称规则：总笔数_分页笔数_yyyymmddhhmmss_编号_页码.jpg --></div>
				 <div>{{$t("quanjie.tip12")}}<!-- 图档可以使用 --><a><b>{{$t("quanjie.bianhao")}}<!-- “编号” --></b></a>{{$t("quanjie.tip13")}}<!-- 在手机内搜寻 --></div> 
				 <div>{{$t("quanjie.tip14")}}<!-- 有使用 --><a><b>{{$t("quanjie.wechat")}}<!-- 微信 --></b></a>{{$t("quanjie.tip15")}}<!-- 的可以直接点选截图 --><a>
				 <b>{{$t("quanjie.share")}}<!-- “分享按钮” --></b></a>{{$t("quanjie.tip16")}}<!-- 直接分享给客户 --></div>
				 <div>
					 <div>{{$t("quanjie.tip17")}}<!-- 默认使用 --><a><b>500</b></a>{{$t("quanjie.tip18")}}<!-- 笔截图模糊时，建议使用 --><a><b>100</b>
					 </a>{{$t("quanjie.huo")}}<!-- 或 --><a><b>200</b></a>{{$t("quanjie.tip19")}}<!-- 分页笔数 -->
					 </div>
				</div>
			</div>
			 
			 
			 
			 <!-- <table class="t-1">
			    <thead> <tr class="bg1"> <td>截图说明</td> </tr> </thead>
			      <tbody> <tr> <td> <div class="bd"> <h3><a>比如:”截图”：单页截图分享给客户；”全截”：全部注单截图分享给客户</a></h3>
			                <p><b>电脑版</b>→小票截图→点击全截→弹出下载窗口→选择下载路径→桌面或（C或D盘）→下载完成后→找到下载的档案→打开文件→核对内容后分享客户</p>
			                <p><b>手机版</b>→小票截图→点击全截→弹出下载窗口→点击下载→完成后→选择 WPS office 打开（如果找不到WPS，在桌面找或手机屏幕往右滑动搜索中输入（WP）找到 WPS office）→点击进入后→点击打开找到PDF进入→找到下载的档案→打开文件→核对内容后分享客户</p>
			                <p><b>奖王版</b>→小票截图→点击全截→下载完成后→选择 WPS office 打开（如果找不到WPS，在桌面找或手机屏幕往右滑动搜索中输入（WP）找到 WPS office）→点击进入后→点击打开找到PDF进入→找到下载的档案→打开文件→核对内容后分享客户</p>
			                <p>以上如果是使用<a>截图</a>功能，能直接将<a>图片(*.jpg)</a>分享给客户</p> <br>
			                <p><b>※奖王版截图建议事项</b></p> <ol> <li><p>截图后的图档会存在手机<a><b>DCIM\screenshots</b></a>内</p></li>
			                     </ol> </div> </td> </tr> </tbody> </table> </div> </div> </div>

 -->
			<!-- <mp-html :content="ruleText" /> -->
		</view>
	</view>
</template>

<script>
	import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html.vue'
	export default {
		components: {
			mpHtml
		},
		data() {
			return {
				//全截说明
				ruleText:'',
				// ruleText:'<span>啦啦啦啦</span>'
			}
		},
		onLoad() {
			var that = this;
			// return new Promise((resolve, reject) => {
			// 	uni.request({
			// 		url:'http://127.0.0.1:8080/ppgoods/getGoodsInfoByIdxcx?gid=1591000977052356611&userid=-1',
			// 		success(res) {
			// 			that.ruleText = res.data.data[0].gdetail;
			// 		}
			// 	})
			// })
		},
		methods:{
			backTo(){
				uni.navigateBack({})
			}
		}
	}
</script>

<style>
	.desc{
		padding: 20rpx;
	}
</style>
