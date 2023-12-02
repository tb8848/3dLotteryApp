<template>
	<view>
		
		<uni-nav-bar dark  :fixed="true" status-bar :title="$t('index.rule-description')"
		leftIcon="back" @clickLeft="backTo" backgroundColor="#8150CA"/> <!--规则说明 -->
		
		<view class="rule-box" style="padding:10rpx">
			<mp-html :content="ruleText" />
		</view>
	</view>
</template>

<script>
	
	//第二章　游戏方法
	
	import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html.vue';
	import { getResponseData,showToastTip,getRespDataWithUrl } from '@/api/req.js';
	export default {
		components: {
			mpHtml
		},
		data() {
			return {
				//规则说明
				ruleText:'',
				// ruleText:'<span>啦啦啦啦</span>'
			}
		},
		onLoad() {
			var that = this;
			const panUrl = uni.getStorageSync("panUrl");
			var reqUrl = panUrl+"vip/statictext/getOne"
			getRespDataWithUrl(reqUrl,"get","",function(res){
				if(res.code==0){
					if(res.count==1){
						that.ruleText = res.data.ruleDescrib
					}else{
						showToastTip("未获取到数据");
					}
				}else{
					showToastTip(res.msg);
				}
			})
		},
		methods:{
			backTo(){
				uni.navigateBack({
					
				})
			}
		}
	}
	
</script>

<style>

</style>
