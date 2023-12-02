<template>
  <view class="container">
	  <uni-nav-bar  :fixed="true" status-bar :title="$t('index.language-settings')" 
	  leftIcon="back" @clickLeft="backTo"/> <!--语言设置 -->
	  			
    <view class="languageInfo">{{$t('index.language-info')}}</view>
    <view class="list-item">
      <text class="k">{{$t('index.system-language')}}:</text>
      <text class="v">{{systemLocale}}</text>
    </view>
    <view class="list-item">
      <text class="k">{{$t('index.application-language')}}:</text>
      <text class="v">{{applicationLocale}}</text>
    </view>
    <view class="locale-setting">{{$t('index.language')}}</view>
    <view class="locale-list">
      <view class="locale-item" v-for="(item, index) in locales" :key="index" @click="onLocaleChange(item)">
        <text class="text">{{item.text}}</text>
        <text class="icon-check" v-if="item.code == applicationLocale"></text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        systemLocale: '',
        applicationLocale: ''
      }
    },
    computed:{
      locales() {
        return [
		  // {
    //         text: this.$t('locale.auto'),
    //         code: 'auto'
    //       }, {
    //         text: this.$t('locale.en'),
    //         code: 'en'
    //       },
    //       {
    //         text: this.$t('locale.zh-hans'),
    //         code: 'zh-Hans'
    //       },
		  
		  {
		    text: this.$t('locale.zh-hans'),
		    code: 'zh-CN'
		  },
		  // {
    //         text: this.$t('locale.zh-hans'),
    //         code: 'zh-Hans'
    //       },		 
	{
		    text: this.$t('locale.tai'),
		    code: 'tai'
		  }
          // {
          //   text: this.$t('locale.zh-hant'),
          //   code: 'zh-Hant'
          // },
          // {
          //   text: this.$t('locale.ja'),
          //   code: 'ja'
          // }
        ]
      }
    },
    onLoad() {
      let systemInfo = uni.getSystemInfoSync();
      this.systemLocale = systemInfo.language;
	  let appLang = uni.getStorageSync("lang");
		  console.log("===============", appLang);
	  if(null!=appLang && "undefined"!=appLang && appLang!=undefined && appLang!=""){
		  this.applicationLocale = appLang;
	  }else{
		  this.applicationLocale = this.systemLocale;
	  }
	  console.log("===============", this.systemLocale);
      //this.applicationLocale = this.systemLocale;
      this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
      uni.onLocaleChange((e) => {
        this.applicationLocale = e.locale;
      })
    },
    methods: {
		backTo(){
			uni.navigateBack({})
		},
        onLocaleChange(e) {
		  uni.setStorageSync("lang",e.code)
		  this.applicationLocale = e.code;
		  if(e.code=='zh-CN'){
			  this.$i18n.locale ="zh";
			   //uni.setLocale(e.code);
		  }else{
			  this.$i18n.locale = e.code;	
			  //uni.setLocale("th");
		  }
		  uni.$emit("langChange",{lang:e.code})
		  
      }
    }
  }
</script>

<style>
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .description {
    font-size: 14px;
    opacity: 0.6;
    margin-bottom: 15px;
  }

  .detail-link {
    font-size: 14px;
    word-break: break-all;
  }

  .link {
    color: #007AFF;
    margin-left: 10px;
  }

  .locale-setting {
    font-size: 16px;
    font-weight: bold;
    margin-top: 25px;
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .languageInfo{
	  font-size: 16px;
	  font-weight: bold;
	  margin-top:10rpx;
	  margin-bottom: 5px;
	  padding-bottom: 5px;
	  border-bottom: 1px solid #f0f0f0;
  }

  .list-item {
    font-size: 14px;
    padding: 10px 0;
  }

  .list-item .v {
    margin-left: 5px;
  }

  .locale-item {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
  }

  .locale-item .text {
    flex: 1;
  }

  .icon-check {
    margin-right: 5px;
    border: 2px solid #007aff;
    border-left: 0;
    border-top: 0;
    height: 12px;
    width: 6px;
    transform-origin: center;
    /* #ifndef APP-NVUE */
    transition: all 0.3s;
    /* #endif */
    transform: rotate(45deg);
  }
</style>
