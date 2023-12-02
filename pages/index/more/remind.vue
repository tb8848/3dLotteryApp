<template>
	<view>
		<uni-nav-bar dark  :fixed="true" status-bar :title="$t('index.special-reminder')"
		leftIcon="back" @clickLeft="backTo" backgroundColor="#8150CA"/> <!--特别提醒 -->
		
		<view style="font-weight: bold;text-align: center;padding-top: 10px;color: #545154;">
			{{$t('index.special-reminder')}}
		</view>
		<view style="display: flex;justify-content: space-between;padding: 20px 10px;">
			<view style="color: purple;" class="biaoti">{{$t('remind.problem')}}：</view>
			<view style="width: 80%;color: grey;">{{$t('remind.problem-detail')}}</view>
		</view>
		<view style="display: flex;justify-content: space-between;padding: 0 10px;">
			<view style="color: red;" class="biaoti">{{$t('remind.solve')}}：</view>
			<view style="width: 80%;color: grey;">{{$t('remind.solve-detail')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			backTo(){
				uni.navigateBack({})
			},
		}
	}
</script>

<style>
	.biaoti{
		width: 20%;
		font-weight: bold;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
</style>
