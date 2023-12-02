<template>
	<view>
		<view>这是标题</view>
		<web-view :src="srcUrl"></web-view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				viewerUrl: '../../static/pdf/web/viewer.html',
				srcUrl:''
			}
		},
		methods: {
			onLoad(option){
				var ps = decodeURIComponent(option.qs);
				console.log("===============ps",ps);
				var data = JSON.parse(ps);
				console.log("=====")
				let pdfUrl = data.pdfUrl; 
				pdfUrl = this.viewerUrl+"?file=" + pdfUrl;
				this.srcUrl = pdfUrl
			}
		}
	}
</script>

<style>

</style>
