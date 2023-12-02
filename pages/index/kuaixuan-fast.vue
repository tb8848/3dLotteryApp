<template>
	<view>
		
		
		<view :style="{'margin-top':cssHeights.headerMarginTop+'rpx'}">
			<view style="display: flex;justify-content: flex-start;margin:20rpx;align-items: center;" >

					<view :class="[lotteryMethodId==item.id?'linerBtn':'gray',index==0?'lsFirst':'',index==lotterMethodList.length-1?'lsLast':'']" 
					class="lsItem" @click="changeRuleItem(item,index)" 
					v-for="(item,index) in lotterMethodList">{{item.bettingMethod}}</view>
				</view>
				
				<!-- <view v-for="(item,index) in lotterMethodList" 
					:class="lotteryMethodId==item.id?'ruleItem ruleItemSelected':'ruleItem'" 
					@click="changeRuleItem(item,index)">{{item.bettingMethod}}</view> -->
			
		</view>
		
		<view v-show="lotterMethodList.length>0">
		
		<view style="margin:10rpx;text-align:center" v-show="lotteryMethodId==2 || lotteryMethodId==3 || lotteryMethodId==4">
			<view>
				<radio-group>
					<radio :checked="buyMethod==1" @click="setBuyMethod(1)">按组数下注</radio>
					&nbsp;&nbsp;
					<radio :checked="buyMethod==0" @click="setBuyMethod(0)">按笔数下注</radio>
				</radio-group>
			</view>
			<view style="margin:20rpx;display: flex;justify-content: center;">
				<view><text>号码</text></view>
				<view><input class="locInput width120" type="digit" maxlength="10" 
					v-model="ncode" @input="delRepeatNum('ncode')" style="width: 240px;"/>
					</view>
			</view>
			
		</view>
		
		
		
		
		
		<view v-show="buyMethod==0">
		
		<!-- 定位置 -->
		<view v-if="lotteryMethodId==1 || lotteryMethodId==2 || lotteryMethodId==6 || lotteryMethodId==7">
			<view style="display: flex;justify-content: center;background-color: #f7f7f7;margin-top: 10rpx ;align-items: center;">
				<view style="display: flex;">
						<view style="padding: 10rpx"><text class="ruleNamelbl">{{$t('kuaixuan.fixed-position')}}</text></view>
						<view style="padding: 10rpx">{{$t('kuaixuan.except')}}<checkbox class="chkScale" :checked="rules.fixCode.excluded==1" value="fixCodeType0" @click="fixCodeTypeChange(1)"></checkbox></view>
						<view style="padding: 10rpx">{{$t('kuaixuan.take')}}<checkbox class="chkScale" :checked="rules.fixCode.included==1" value="fixCodeType1" @click="fixCodeTypeChange(2)"></checkbox></view>
				</view>
				
				<!-- <view style="display: flex;" v-if="ruleItemIndex>0">
					<view style="padding: 10rpx"><text class="ruleNamelbl">配数全转</text></view>
					<view style="padding: 10rpx">{{$t('kuaixuan.except')}}<checkbox class="chkScale" :checked="rules.matchCodes.excluded==1" value="matchFullRotate0" @click="matchFullRotateTypeChange(1)"></checkbox></view>
					<view style="padding: 10rpx">{{$t('kuaixuan.take')}}<checkbox class="chkScale" :checked="rules.matchCodes.included==1" value="matchFullRotate1" @click="matchFullRotateTypeChange(2)"></checkbox></view>
				</view> -->
				
			</view>
			
			<view style="display: flex;justify-content: center;margin:10rpx 0rpx" v-if="rules.fixCode.isShow">				
				<view class="locItem"><input class="locInput" placeholder="?" v-model="rules.fixCode.loc1" type="digit" maxlength="10" @input="delRepeatNum('fixLoc1')"  /><text class="locInputLbl" style="color: #999;">百</text></view>			
				<view class="locItem"><input class="locInput" placeholder="?" v-model="rules.fixCode.loc2" type="digit" maxlength="10" @input="delRepeatNum('fixLoc2')"/><text class="locInputLbl" style="color: #999;">十</text></view>
				<view class="locItem"><input class="locInput" placeholder="?" v-model="rules.fixCode.loc3" type="digit" maxlength="10" @input="delRepeatNum('fixLoc3')"/><text class="locInputLbl" style="color: #999;">个</text></view>
				<!-- <view class="locItem">
					<input class="locInput" placeholder="?" v-model="rules.fixCode.loc4" type="digit" 
					maxlength="10" @input="delRepeatNum('fixLoc4')"/>
					<text class="locInputLbl" style="color: #999;">4</text>
					</view>	 -->		
			</view>
		</view>
		
		<!-- 配数 -->
		<!-- <view style="display: flex;flex-direction: column;">
			<view v-if="isXian==1" style="display: flex;justify-content: center;background-color: #f7f7f7;margin-top: 10rpx ;align-items: center;">
				<view style="padding: 10rpx"><text class="ruleNamelbl">{{$t('kuaixuan.allotment')}}</text></view>
				<view style="padding: 10rpx">{{$t('kuaixuan.except')}}<checkbox class="chkScale" :checked="rules.matchCodes.excluded==1" @click="matchCodesTypeChange(1)"></checkbox></view>
				<view style="padding: 10rpx">{{$t('kuaixuan.take')}}<checkbox class="chkScale" :checked="rules.matchCodes.included==1"   @click="matchCodesTypeChange(2)"></checkbox></view>
			</view>
			<view style="display: flex;justify-content: center;margin:10rpx 0rpx" v-if="rules.matchCodes.isShow">				
				<view class="locItem" v-if="ruleItemIndex>0"><input  class="locInput" placeholder="" type="digit" v-model="rules.matchCodes.loc1" maxlength="10" @input="delRepeatNum('matchLoc1')"/><text class="locInputLbl" style="color: #999;">{{$t('kuaixuan.match')}}</text></view>			
				<view class="locItem" v-if="ruleItemIndex>0"><input class="locInput" placeholder="" type="digit" v-model="rules.matchCodes.loc2" maxlength="10" @input="delRepeatNum('matchLoc2')"/><text class="locInputLbl" style="color: #999;">{{$t('kuaixuan.match')}}</text></view>
				<view class="locItem" v-if="ruleItemIndex>1"><input  class="locInput" placeholder="" type="digit" v-model="rules.matchCodes.loc3" maxlength="10" @input="delRepeatNum('matchLoc3')"/><text class="locInputLbl" style="color: #999;">{{$t('kuaixuan.match')}}</text></view>
				<view class="locItem" v-if="ruleItemIndex>2"><input  class="locInput" placeholder="" type="digit" v-model="rules.matchCodes.loc4" maxlength="10" @input="delRepeatNum('matchLoc4')"/><text class="locInputLbl" style="color: #999;">{{$t('kuaixuan.match')}}</text></view>			
			</view>
		</view> -->
		
		
		<view>
			
			<!-- 定位合分 -->
			
			<view v-if="lotteryMethodId==1 || lotteryMethodId==2 || lotteryMethodId==7">
			
				<view style="display: flex;justify-content: center;background-color: #f7f7f7;margin-top: 10rpx ;align-items: center;">
					<view style="padding: 10rpx">
						<text style="margin-right: 20rpx;" class="ruleNamelbl">{{$t('kuaixuan.close')}}</text>
						<text style="margin-right: 20rpx;" class="ruleNamelbl">{{$t('kuaixuan.branch')}}</text>
					</view>
					<view style="padding: 10rpx">
							<checkbox class="chkScale" 
							@click="hefenChange(1)" :checked="rules.hefen.excluded==1"></checkbox>{{$t('kuaixuan.except')}}</view>
					<view style="padding: 10rpx"><checkbox class="chkScale" 
					@click="hefenChange(2)" :checked="rules.hefen.included==1"></checkbox>{{$t('kuaixuan.take')}}</view>
				</view>
				
				<!-- 定位合分 -->
				<view class="column-center" v-if="lotteryMethodId==1 || lotteryMethodId==2 || lotteryMethodId==7">
					<view style="display: flex;justify-content: center;margin-top:8rpx">
						<text class="ruleNamelbl">1.</text>
						<checkbox-group @change="hefenItemChange1">
							<checkbox class="chkScale" value="0" ></checkbox>
							<checkbox class="chkScale" value="1"></checkbox>
							<checkbox class="chkScale" value="2"></checkbox>
						<!-- 	<checkbox class="chkScale" value="3"></checkbox> -->
						</checkbox-group>
						<input class="locInput width120" maxlength="10" v-model="rules.hefen.binds[0].value" @input="delRepeatNum('hefenBind1')" type="digit"/>
					</view>
					<view style="display: flex;justify-content: center;margin-top:8rpx">
						<text class="ruleNamelbl">2.</text>
						<checkbox-group @change="hefenItemChange2">
							<checkbox class="chkScale" value="0"></checkbox>
							<checkbox class="chkScale" value="1"></checkbox>
							<checkbox class="chkScale" value="2"></checkbox>
							<!-- <checkbox class="chkScale" value="3"></checkbox>
							 -->
						</checkbox-group>
						<input class="locInput width120" maxlength="10" v-model="rules.hefen.binds[1].value" @input="delRepeatNum('hefenBind2')" type="digit"/>
					</view>
					<view style="display: flex;justify-content: center;margin-top:8rpx">
						<text class="ruleNamelbl">3.</text>
						<checkbox-group @change="hefenItemChange3">
							<checkbox class="chkScale" value="0"></checkbox>
							<checkbox class="chkScale" value="1"></checkbox>
							<checkbox class="chkScale" value="2"></checkbox>
							<!-- <checkbox class="chkScale" value="3"></checkbox> -->
						</checkbox-group>
						<input class="locInput width120" v-model="rules.hefen.binds[2].value" @input="delRepeatNum('hefenBind3')" type="digit"/>
						
					</view>
					<!-- <view style="display: flex;justify-content: center;margin-top:8rpx">
						<text class="ruleNamelbl">4.</text>
						<checkbox-group @change="hefenItemChange4">
							<checkbox class="chkScale" value="0"></checkbox>
							<checkbox class="chkScale" value="1"></checkbox>
							<checkbox class="chkScale" value="2"></checkbox>
							<checkbox class="chkScale" value="3"></checkbox>
						</checkbox-group>
						<input class="locInput width120" v-model="rules.hefen.binds[3].value" @input="delRepeatNum('hefenBind4')" type="digit"/>				
					</view> -->
				</view>
			
			</view>
			
			
			
			<!-- 不定位合分 -->
			<view class="row" v-if="lotteryMethodId==3 || lotteryMethodId==4">								
					<text class="ruleNamelbl">{{$t('kuaixuan.non-positioning-closing-and-opening')}}</text>
					<view style="margin:0px 10rpx">
						<checkbox class="chkScale" :checked="rules.sum2.included==1 && rules.sum2.sumType==2" 
							@click="changeSum2Rule(2)"></checkbox>
						<text>{{$t('kuaixuan.combination-of-two-numbers')}}</text>					
					</view>		
					<view>
						<checkbox class="chkScale" :checked="rules.sum2.included==1 && rules.sum2.sumType==3"
							@click="changeSum2Rule(3)"></checkbox>
						<text>
						<!-- 	三数和 -->{{$t("kuaixuan.sum3")}}
							</text>
					</view>
					<input class="locInput width120" @input="delRepeatNum('sum2')" type="digit" maxlength="10" v-model="rules.sum2.sum"/>								
			</view>
			
			
			<!-- 不定位合分 -->
			<!-- <view class="row" v-if="ruleItemIndex>0 && langType==1" style="display: flex;flex-direction: column;justify-content: flex-start;align-items: flex-start;">								
					<view><text class="ruleNamelbl">{{$t('kuaixuan.non-positioning-closing-and-opening')}}</text></view>
					<view style="display: flex;">
						<view style="margin:0px 10rpx;display: flex;">
							<checkbox class="chkScale" :checked="rules.sum2.included==1 && rules.sum2.sumType==2" 
								@click="changeSum2Rule(2)"></checkbox>
							<text>{{$t('kuaixuan.combination-of-two-numbers')}}</text>					
						</view>		
						<view v-if="ruleItemIndex>1" style="display: flex;">
							<checkbox class="chkScale" :checked="rules.sum2.included==1 && rules.sum2.sumType==3"
								@click="changeSum2Rule(3)"></checkbox>
							<text>{{$t("kuaixuan.sum3")}}</text>
						</view>
						<view>
							<input class="locInput width120" @input="delRepeatNum('sum2')" type="digit" maxlength="10" v-model="rules.sum2.sum"/>	
						</view>
					</view>
			</view>
			 -->
		
			
			<view v-if="lotteryMethodId==1 || lotteryMethodId==2 || lotteryMethodId==3 || lotteryMethodId==4 " class="row">
				<text class="ruleNamelbl"><!-- 值范围从 -->{{$t("kuaixuan.valueRange")}}{{$t("kuaixuan.from")}}</text>
				<input class="locInput width120" @input="delRepeatNum('valueRange1')" type="digit" 
					maxlength="10" v-model="rules.others.valueRange[0]"/>
				<text><!-- 值 -->{{$t("kuaixuan.value")}}&nbsp;<!-- 至 -->{{$t("kuaixuan.to")}}</text>	
				<input class="locInput width120" @input="delRepeatNum('valueRange2')" type="digit" 
					maxlength="10" v-model="rules.others.valueRange[1]"/>
				<text><!-- 值 -->{{$t("kuaixuan.value")}}</text>			
			</view>
			
			<!-- 乘号位置 -->			
			<view class="column-center" v-if="lotteryMethodId==1 || lotteryMethodId==2  || lotteryMethodId==6 || lotteryMethodId==7">
				<view style="display: flex;justify-content: flex-start;margin-top:8rpx" v-if="lotteryMethodId==1 || lotteryMethodId==2  || lotteryMethodId==7">
					<view style="display: flex;justify-content: flex-start;">
							<text class="ruleNamelbl">{{$t('kuaida.full-rotation')}}</text>
							<input class="locInput width120" v-model="rules.others.fullChange" maxlength="10" @input="delRepeatNum" type="digit"/>
					</view>
					<view style="display: flex;justify-content: flex-start;margin-left:10rpx">
							<text class="ruleNamelbl">{{$t('kuaixuan.award')}}</text>
							<input class="locInput width120" v-model="rules.others.shangJiang" maxlength="10" @input="delRepeatNum" type="digit"/>
					</view>					
				</view>		
				<view style="display: flex;justify-content: flex-start;margin:8rpx 0rpx" v-if="lotteryMethodId==1 || lotteryMethodId==2  || lotteryMethodId==7">
					<view style="display: flex;justify-content: flex-start;">
						<text class="ruleNamelbl">{{$t('kuaixuan.exclude')}}</text>
						<input class="locInput width120" v-model="rules.others.excludes" maxlength="10" @input="delRepeatNum('exclude')" type="digit"/>
					</view>
					<view style="display: flex;justify-content: flex-start;margin-left:10rpx" 
						v-if="lotteryMethodId==6 || lotteryMethodId==7">
						<text class="ruleNamelbl">{{$t('kuaixuan.multiplication-position')}}</text>
						<checkbox-group @change="xLocationChange">
							<checkbox class="chkScale" value="0" :checked="rules.others.locArr[0]==1"></checkbox>
							<checkbox class="chkScale" value="1" :checked="rules.others.locArr[1]==1"></checkbox>
							<checkbox class="chkScale" value="2" :checked="rules.others.locArr[2]==1"></checkbox>
							<!-- <checkbox class="chkScale" value="3" :checked="rules.others.locArr[3]==1"></checkbox> -->
						</checkbox-group>
					</view>					
				</view>		
			</view>
			
			<!-- 复式规则 -->		
			<view class="row" v-if="lotteryMethodId==1 || lotteryMethodId==3 || lotteryMethodId==4 || lotteryMethodId==7">
				<view style="margin-right:5rpx">
					<checkbox class="chkScale" :checked="rules.fushi.excluded==1" @click="fushiChange(1)"></checkbox>
					<text>{{$t('kuaixuan.except')}}</text>
				</view>
				<view>
					<checkbox class="chkScale" :checked="rules.fushi.included==1" @click="fushiChange(2)"></checkbox>
					<text>{{$t('kuaixuan.take')}}</text>
				</view>
				<view style="display: flex;justify-content: flex-start;margin-left:5rpx">
					<view style="display: flex;justify-content: flex-start;">
						<text class="ruleNamelbl">{{ruleName}}{{$t('kuaixuan.contain')}}</text>
						<input class="locInput width100" maxlength="10" v-model="rules.fushi.contains" @input="delRepeatNum('include')" type="digit"/>
					</view>
					<view style="display: flex;justify-content: flex-start;">
						<text class="ruleNamelbl">{{ruleName}}{{$t('kuaixuan.compound')}}</text>
						<input class="locInput width100" maxlength="10" v-model="rules.fushi.combines" @input="delRepeatNum('fushi')" type="digit"/>
					</view>										
				</view>	
			</view>
			
			
			<!-- 复式规则 -->
		<!-- 	<view class="row" v-if="ruleItemIndex>0 && langType==1" style="display: flex;flex-direction: column;">
				<view style="display: flex;">
					<view style="margin-right:5rpx">
						<checkbox class="chkScale" :checked="rules.fushi.excluded==1" @click="fushiChange(1)"></checkbox>
						<text>{{$t('kuaixuan.except')}}</text>
					</view>
					<view style="margin-right:15rpx">
						<checkbox class="chkScale" :checked="rules.fushi.included==1" @click="fushiChange(2)"></checkbox>
						<text>{{$t('kuaixuan.take')}}</text>
					</view>
					<view style="display: flex;justify-content: flex-start;">
						<text class="ruleNamelbl">{{ruleName}}{{$t('kuaixuan.contain')}}</text>
						<input class="locInput width100" maxlength="10" v-model="rules.fushi.contains" @input="delRepeatNum('include')" type="digit"/>
					</view>
				</view>
				<view style="display: flex;justify-content: flex-start;margin-left:5rpx">
					
					<view style="display: flex;justify-content: flex-start;">
						<text class="ruleNamelbl">{{ruleName}}{{$t('kuaixuan.compound')}}</text>
						<input class="locInput width100" maxlength="10" v-model="rules.fushi.combines" @input="delRepeatNum('fushi')" type="digit"/>
					</view>										
				</view>	
			</view>
			
			
			
			 -->
			<!-- 号码重复设置 -->
			<view class="row" style="flex-wrap: wrap;" v-if="lotteryMethodId!=6">
				<view style="display: flex;justify-content: flex-start;" v-if="lotteryMethodId==1 || lotteryMethodId==2 || lotteryMethodId==7">
					<view style="margin-right: 5rpx;">
						<checkbox class="chkScale" 
							:checked="rules.repeat.double1.excluded==1"
							@click="changeRepeatType(2,0)"></checkbox><text>{{$t('kuaixuan.except')}}</text></view>
					<view>
						<checkbox class="chkScale" 
							:checked="rules.repeat.double1.included==1"
							@click="changeRepeatType(2,1)"></checkbox><text>{{$t('kuaixuan.take')}}</text></view>
					<text class="ruleNamelbl">({{$t('kuaixuan.twofold')}})</text>		
				</view>
				
				<view 
					style="display: none;justify-content: flex-start;">
					<view style="margin-right: 5rpx;">
						<checkbox class="chkScale" 
							:checked="rules.repeat.triple.excluded==1"
							@click="changeRepeatType(22,0)"></checkbox><text>{{$t('kuaixuan.except')}}</text></view>
					<view >
						<checkbox class="chkScale" 
							:checked="rules.repeat.doubledouble.included==1"
							@click="changeRepeatType(22,1)"></checkbox><text>{{$t('kuaixuan.take')}}</text></view>
					<text class="ruleNamelbl">(<!-- 双双重 -->{{$t('kuaixuan.shuangshuangchong')}})</text>		
				</view>
				
				<view style="display: flex;justify-content: flex-start;" v-if="lotteryMethodId==1 || lotteryMethodId==2">
					<view style="margin-right: 5rpx;">
						<checkbox class="chkScale" 
							:checked="rules.repeat.triple.excluded==1"
							@click="changeRepeatType(3,0)"></checkbox><text>{{$t('kuaixuan.except')}}</text></view>
					<view>
						<checkbox class="chkScale" 
							:checked="rules.repeat.triple.included==1"
							@click="changeRepeatType(3,1)"></checkbox><text>{{$t('kuaixuan.take')}}</text></view>
					<text class="ruleNamelbl">({{$t('kuaixuan.triple')}})</text>		
				</view>
				<!-- <view style="display: flex;justify-content: flex-start;" v-if="ruleItemIndex>2">
					<view style="margin-right: 5rpx;">
						<checkbox class="chkScale" 
							:checked="rules.repeat.double2.excluded==1" 
							@click="changeRepeatType(4,0)"></checkbox><text>{{$t('kuaixuan.except')}}</text></view>
					<view>
						<checkbox class="chkScale" 
							:checked="rules.repeat.double2.included==1" 
							@click="changeRepeatType(4,1)"></checkbox><text>{{$t('kuaixuan.take')}}</text></view>
					<text class="ruleNamelbl">({{$t('kuaixuan.double-double')}})</text>		
				</view> -->
			</view>
			
			<!-- 兄弟号码设置 -->
			<view class="row" style="flex-wrap: wrap;" v-if="lotteryMethodId!=6">
				<view style="display: flex;justify-content: flex-start;">
					<view style="margin-right: 5rpx;">
						<checkbox :checked="rules.brothers.br2.excluded==1" 
							class="chkScale" @click="changeBrotherType(2,0)"></checkbox><text>{{$t('kuaixuan.except')}}</text></view>
					<view>
						<checkbox class="chkScale" :checked="rules.brothers.br2.included==1" @click="changeBrotherType(2,1)"></checkbox><text>{{$t('kuaixuan.take')}}</text></view>				
					<text class="ruleNamelbl">({{$t('kuaixuan.two-brothers')}})</text>	
				</view>
				<view style="display: flex;justify-content: flex-start;" v-if="lotteryMethodId!=3 && lotteryMethodId!=7">
					<view style="margin-right: 5rpx;">
						<checkbox :checked="rules.brothers.br3.excluded==1" @click="changeBrotherType(3,0)"
							class="chkScale"></checkbox><text>{{$t('kuaixuan.except')}}</text></view>
					<view>
						<checkbox :checked="rules.brothers.br3.included==1" @click="changeBrotherType(3,1)"
							class="chkScale"></checkbox><text>{{$t('kuaixuan.take')}}</text></view>				
					<text class="ruleNamelbl">({{$t('kuaixuan.three-brothers')}})</text>	
				</view>
				<!-- <view style="display: flex;justify-content: flex-start;" v-if="ruleItemIndex>2">
					<view style="margin-right: 5rpx;">
						<checkbox class="chkScale" :checked="rules.brothers.br4.excluded==1" @click="changeBrotherType(4,0)"></checkbox><text>{{$t('kuaixuan.except')}}</text></view>
					<view>
						<checkbox class="chkScale" :checked="rules.brothers.br4.included==1" @click="changeBrotherType(4,1)"></checkbox><text>{{$t('kuaixuan.take')}}</text></view>				
					<text class="ruleNamelbl">({{$t('kuaixuan.four-brothers')}})</text>	
				</view> -->
			</view>
			
			<!-- 对数设置 -->
			<view class="row" v-if="lotteryMethodId!=6">
				<view style="margin-right: 5rpx;"><checkbox class="chkScale" :checked="rules.pairs.excluded==1" @click="pairsChange(1)"></checkbox><text>{{$t('kuaixuan.except')}}</text></view>
				<view><checkbox class="chkScale" :checked="rules.pairs.included==1" @click="pairsChange(2)"></checkbox><text>{{$t('kuaixuan.take')}}</text></view>
				<text class="ruleNamelbl">({{$t('kuaixuan.logarithm')}})</text>	
				<view style="display: flex;justify-content: flex-start;">
					<input class="locInput width70" type="number" v-model="rules.pairs.pair1" maxlength="2" @input="delRepeatNum('pair1')"/>
					<input class="locInput width70" type="number" v-model="rules.pairs.pair2" maxlength="2" @input="delRepeatNum('pair2')"/>
					<input class="locInput width70" type="number" v-model="rules.pairs.pair3" maxlength="2" @input="delRepeatNum('pair3')"/>
					<!-- <input class="locInput width70" type="number" v-model="rules.pairs.pair4" maxlength="2" @input="delRepeatNum('pair4')"/>
					<input class="locInput width70" type="number" v-model="rules.pairs.pair5" maxlength="2" @input="delRepeatNum('pair5')"/> -->
				</view>
			</view>
			
			<!-- 单数 -->
			<view class="row">
				<view style="margin-right: 5rpx;"><checkbox class="chkScale" :checked="rules.singleNum.excluded==1" @click="singleNumChange(1)"></checkbox><text>{{$t('kuaixuan.except')}}</text></view>
				<view><checkbox class="chkScale" :checked="rules.singleNum.included==1" @click="singleNumChange(2)"></checkbox><text>{{$t('kuaixuan.take')}}</text></view>			
				<text class="ruleNamelbl">({{$t('kuaixuan.single')}})</text>
				<view style="margin-left:10rpx">
					<checkbox-group @change="singleNumLocChange">
						<checkbox class="chkScale" value="0" ></checkbox>
						<checkbox class="chkScale" value="1" ></checkbox>
						<checkbox class="chkScale" value="2" ></checkbox>
						<!-- <checkbox class="chkScale" value="3" ></checkbox>		 -->	
					</checkbox-group>
				</view>
			</view>
			
			<!-- 双数 -->
			<view class="row">
				<view style="margin-right: 5rpx;"><checkbox class="chkScale" :checked="rules.doubleNum.excluded==1" @click="doubleNumChange(1)"></checkbox><text>{{$t('kuaixuan.except')}}</text></view>
				<view><checkbox class="chkScale" :checked="rules.doubleNum.included==1" @click="doubleNumChange(2)"></checkbox><text>{{$t('kuaixuan.take')}}</text></view>
				<text class="ruleNamelbl">({{$t('kuaixuan.double')}})</text>
				<view style="margin-left:10rpx">
					<checkbox-group @change="doubleNumLocChange">					
						<checkbox class="chkScale" value="0"></checkbox>
						<checkbox class="chkScale" value="1"></checkbox>
						<checkbox class="chkScale" value="2"></checkbox>
						<!-- <checkbox class="chkScale" value="3"></checkbox>	 -->					
					</checkbox-group>
					
				</view>
			</view>
			
			<!-- 大数 -->
			<view class="row">
				<view style="margin-right: 5rpx;"><checkbox class="chkScale" :checked="rules.bigNum.excluded==1" @click="bigNumChange(1)"></checkbox><text>{{$t('kuaixuan.except')}}</text></view>
				<view><checkbox class="chkScale" :checked="rules.bigNum.included==1" @click="bigNumChange(2)"></checkbox><text>{{$t('kuaixuan.take')}}</text></view>
				<text class="ruleNamelbl">({{$t('kuaixuan.large')}})</text>
				<view style="margin-left:10rpx">
					<checkbox-group @change="bigNumLocChange">
						<checkbox class="chkScale" value="0"></checkbox>
						<checkbox class="chkScale" value="1"></checkbox>
						<checkbox class="chkScale" value="2"></checkbox>
						<!-- <checkbox class="chkScale" value="3"></checkbox> -->
					</checkbox-group>					
				</view>
			</view>
			
			<!-- 小数 -->
			<view class="row">				
				<view style="margin-right: 5rpx;"><checkbox class="chkScale" :checked="rules.smallNum.excluded==1" @click="smallNumChange(1)"></checkbox><text>{{$t('kuaixuan.except')}}</text></view>
				<view><checkbox class="chkScale" :checked="rules.smallNum.included==1" @click="smallNumChange(2)"></checkbox><text>{{$t('kuaixuan.take')}}</text></view>
				<text class="ruleNamelbl">({{$t('kuaixuan.small')}})</text>
				<view style="margin-left:10rpx">
					<checkbox-group @change="smallNumLocChange">
						<checkbox class="chkScale" value="0"></checkbox>
						<checkbox class="chkScale" value="1"></checkbox>
						<checkbox class="chkScale" value="2"></checkbox>
						<!-- <checkbox class="chkScale" value="3"></checkbox> -->
					</checkbox-group>
				</view>				
			</view>
			
			
			</view>
		</view>
		
			
		</view>
		
		<view style="padding-bottom: 60rpx;display: flex;justify-content: center;" v-if="openStatus==1">
			<view class="btnAll" @click="toCodeCreate()">{{$t('kuaixuan.generate')}}</view>
			<view class="btnAll" @click="clearRules()">{{$t('kuaixuan.reset')}}</view>				
		</view>
		<view style="padding-bottom: 60rpx;display: flex;justify-content: center;" v-else>
			<view class="btnAll" style="background-color: #909399;">{{$t('kuaixuan.generate')}}</view>
			<view class="btnAll" style="background-color: #909399;">{{$t('kuaixuan.reset')}}</view>				
		</view>
		
	</view>
</template>

<script>
	
	import { getResponseData,showToastTip} from '@/api/req.js';
	import { DeleteTheSameChar } from '@/static/common-tools.js';
	export default {
		data() {
			return {
				showMorePlay:false,
				openStatus:1,
				cssHeights:{
					headerMarginTop:0,
					headerHeight:0,
					contentMarginTop:0,
					contentHeight:0,
					langHeight:40
				},
				"isXian":0,
				"buyMethod":0,
				"ncode":"",
				"lotteryMethodId":1,
				"lotterMethodList":[
					{"id":1,"bettingMethod":"直选"},
					{"id":2,"bettingMethod":"复式"},
					{"id":3,"bettingMethod":"组三"},
					{"id":4,"bettingMethod":"组六"},				
					{"id":6,"bettingMethod":"1D"},
					{"id":7,"bettingMethod":"2D"},					
				],			
				"ruleItemIndex":1,			
				"rules":{
					"codes":"",
					"isXian":0,
					"count":1,
					"lotteryMethodId":2,
					"fixCode":{
						"name":'定位置',
						"included":1,
						"excluded":0,
						"loc1":"",
						"loc2":"",
						"loc3":"",
						"loc4":"",
						"isShow":true
					},
					"matchCodes":{
						"name":'配数',
						"included":0,
						"excluded":0,
						"loc1":"",
						"loc2":"",
						"loc3":"",
						"loc4":"",
						"isXian":0,
						"isShow":false
					},
					"repeat":{
						"double1":{
							"name":"双重",
							"included":0,
							"excluded":0,
							"nums":2,
						},
						"triple":{
							"name":"三重",
							"included":0,
							"excluded":0,
							"nums":3,
						},
						"double2":{
							"name":"四重",
							"included":0,
							"excluded":0,
							"nums":4,
						},
						"doubledouble":{
							"name":"双双重",
							"included":0,
							"excluded":0,
							"nums":22,
						}
					},
					"brothers":{
						"br2":{
							"name":"两兄弟",
							"included":0,
							"excluded":0,
							"nums":2, 
						},
						"br3":{
							"name":"三兄弟",
							"included":0,
							"excluded":0,
							"nums":3,
						},
						"br4":{
							"name":"四兄弟",
							"included":0,
							"excluded":0,
							"nums":4,
						}
					},
					"pairs":{
						"name":"对数",
						"included":0,
						"excluded":0,
						"pair1":"", 
						"pair2":"",
						"pair3":"",
						"pair4":"",
						"pair5":""
					},
					"singleNum":{
						"name":"单数",
						"included":0,
						"excluded":0,
						"locArr":[0,0,0],
					},
					"doubleNum":{
						"name":"双数",
						"included":0,
						"excluded":0,
						"locArr":[0,0,0],
					},
					"bigNum":{
						"name":"大数",
						"included":0,
						"excluded":0,
						"locArr":[0,0,0],
					},
					"smallNum":{
						"name":"小数",
						"included":0, //1:取
						"excluded":0, //1：除
						"locArr":[0,0,0],//位置,
						
					},
					"sum2":{
						"name":"两(或三)数合",
						"included":0, //1:取
						"excluded":0, //1：除
						"sum":"",
						"sumType":0, //2：两数和；3：三数和
					},
					"others":{
						"name":'其他规则',
						"fullChange":'', //全转
						"shangJiang":'', //上奖
						'excludes':'', //排除
						'locArr':[0,0,0],//乘号规则
						"valueRange":["",""] //值范围
					},
					"fushi":{
						"name":'复式规则',
						"included":0,
						"excluded":0,
						"contains":'', //含
						"combines":'' //复式
					},
					"hefen":{
						"name":'合分',
						"included":0,
						"excluded":0,
						"binds":[
							{
								"name":'',
								"value":'',
								"locArr":[0,0,0]
							},
							{
								"name":'',
								"value":'',
								"locArr":[0,0,0]
							},
							{
								"name":'',
								"value":'',
								"locArr":[0,0,0]
							},
							{
								"name":'',
								"value":'',
								"locArr":[0,0,0]
							}
						]						
					}
				},
				emptyRules:null,
				ruleName:'',
				langType:0 //0：中文，1：泰文
			}
		},
		created() {
			const topbarHeight = uni.getStorageSync("topbarHeight");
			const barHeight = uni.getStorageSync("statusBarH");
			this.cssHeights.headerMarginTop= topbarHeight+10;
			this.cssHeights.headerMarginTop= 10;
			const winH = uni.getStorageSync("winH");
			
			//this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop+this.cssHeights.headerHeight; //单位rpx;
			const lang = uni.getStorageSync("lang");
			if(lang=='tai'){
				this.langType = 1
				this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop+this.cssHeights.headerHeight + this.cssHeights.langHeight; //单位rpx;
			}else{
				this.langType = 0
				this.cssHeights.contentMarginTop = this.cssHeights.headerMarginTop+this.cssHeights.headerHeight;
			}
			this.cssHeights.contentHeight = winH - this.cssHeights.contentMarginTop;	
			this.emptyRules = JSON.stringify(this.rules);
			
			var that = this;
			uni.$on('drawOpenStatus',function(data){
				//console.log('监听到事件来自 drawOpenStatus ，携带参数 msg 为：' + data);
				var drawInfo = JSON.parse(data);
				that.openStatus = drawInfo.openStatus;
			})	
			
			uni.$on('clearRule',function(data){
				this.clearRules();
			
			})	
		
			uni.$on('langChange',function(data){
				if(data.lang=='tai'){
					that.langType = 1
					that.cssHeights.contentMarginTop = that.cssHeights.headerMarginTop+that.cssHeights.headerHeight + that.cssHeights.langHeight; //单位rpx;
				}else{
					that.langType = 0
					that.cssHeights.contentMarginTop = that.cssHeights.headerMarginTop+that.cssHeights.headerHeight; //单位rpx;
				}
				that.cssHeights.contentHeight = winH - that.cssHeights.contentMarginTop;	
				that.lotteryMethodsTrans();
			})	
			this.initData();
		},
		onShow(){
			this.clearRules();
			var lastBuyLmId = uni.getStorageSync("lastBuyLmId");
			if(lastBuyLmId){
				this.lotterMethodId = lastBuyLmId;
			}else{
				this.lotterMethodId = 2;
			}
			this.rules.lotteryMethodId = this.lotteryMethodId;
		},
		
		methods: {
			setBuyMethod(v){
				this.buyMethod=v;
			},
			 checkCreateCondition(){
				if(this.ncode.length>0){
					 return true;
				}
				var hasSetCondi = false;
				if(this.rules.fixCode.included==1 || this.rules.fixCode.excluded==1){
					if(this.rules.fixCode.loc1!="" || this.rules.fixCode.loc2!="" || this.rules.fixCode.loc3!="" || this.rules.fixCode.loc4!=""){
						return true;
					}
				}
				if(this.rules.matchCodes.included==1 || this.rules.matchCodes.excluded==1){
					if(this.rules.matchCodes.loc1!="" || this.rules.matchCodes.loc2!="" || this.rules.matchCodes.loc3!="" || this.rules.matchCodes.loc4!=""){
						return true;
					}
				}
				if(this.rules.brothers.br2.included==1 || this.rules.brothers.br2.excluded==1){
					return true;
				}
				if(this.rules.brothers.br3.included==1 || this.rules.brothers.br3.excluded==1){
					return true;
				}
				if(this.rules.brothers.br4.included==1 || this.rules.brothers.br4.excluded==1){
					return true;
				}
				if(this.rules.repeat.double1.included==1 || this.rules.repeat.double1.excluded==1){
					return true;
				}
				if(this.rules.repeat.double2.included==1 || this.rules.repeat.double2.excluded==1){
					return true;
				}
				if(this.rules.repeat.triple.included==1 || this.rules.repeat.triple.excluded==1){
					return true;
				}
				if(this.rules.repeat.doubledouble.included==1 || this.rules.repeat.doubledouble.excluded==1){
					return true;
				}
				if(this.rules.sum2.sumType==2 || this.rules.sum2.sumType==3){
					if(this.rules.sum2.sum!=""){
						return true;
					}
				}
				if(this.rules.others.fullChange!="" || this.rules.others.excludes!="" || this.rules.others.shangJiang!=""
					|| this.rules.others.locArr[0]==1 || this.rules.others.locArr[1]==1  || this.rules.others.locArr[2]==1
					 || (this.rules.others.valueRange[0]!="" && this.rules.others.valueRange[1]!="")){
						return true;
				}
				if(this.rules.singleNum.included==1 || this.rules.singleNum.excluded==1){
					if(this.rules.singleNum.locArr[0]==1 || this.rules.singleNum.locArr[1]==1
						|| this.rules.singleNum.locArr[2]==1 ) {
						return true;
					}
				}
				if(this.rules.doubleNum.included==1 || this.rules.doubleNum.excluded==1){
					if(this.rules.doubleNum.locArr[0]==1 || this.rules.doubleNum.locArr[1]==1
						|| this.rules.doubleNum.locArr[2]==1 ) {
						return true;
					}
				}
				if(this.rules.bigNum.included==1 || this.rules.bigNum.excluded==1){
					if(this.rules.bigNum.locArr[0]==1 || this.rules.bigNum.locArr[1]==1
						|| this.rules.bigNum.locArr[2]==1) {
						return true;
					}
				}
				if(this.rules.smallNum.included==1 || this.rules.smallNum.excluded==1){
					if(this.rules.smallNum.locArr[0]==1 || this.rules.smallNum.locArr[1]==1
						|| this.rules.smallNum.locArr[2]==1) {
						return true;
					}
				}
				if(this.rules.fushi.included==1 || this.rules.fushi.excluded==1){
					if(this.rules.fushi.contains!="" || this.rules.fushi.combines!=""){
						return true;
					}
				}
				if(this.rules.pairs.included==1 || this.rules.pairs.excluded==1){
					if(this.rules.pairs.pair1!=""){
						if(this.rules.pairs.pair1.length!=2){
							showToastTip("请输入差值为5的对数");
							return false;
						}
						var arr = this.rules.pairs.pair1.split("");
						var sum = parseInt(arr[0])-parseInt(arr[1]);
						if(sum!=5 && sum!=-5){
							showToastTip("请输入差值为5的对数");
							return false;
						}
					}
					if(this.rules.pairs.pair2!=""){
						if(this.rules.pairs.pair2.length!=2){
							showToastTip("请输入差值为5的对数");
							return false;
						}
						var arr = this.rules.pairs.pair2.split("");
						var sum = parseInt(arr[0])-parseInt(arr[1]);
						if(sum!=5 && sum!=-5){
							showToastTip("请输入差值为5的对数");
							return false;
						}
					}
					if(this.rules.pairs.pair3!=""){
						if(this.rules.pairs.pair3.length!=2){
							showToastTip("请输入差值为5的对数");
							return false;
						}
						var arr = this.rules.pairs.pair3.split("");
						var sum = parseInt(arr[0])-parseInt(arr[1]);
						if(sum!=5 && sum!=-5){
							showToastTip("请输入差值为5的对数");
							return false;
						}
					}
					hasSetCondi = true;
				}
	
				if(this.rules.hefen.included==1 || this.rules.hefen.excluded==1){
					for(var i=0;i<3;i++){
						if(this.rules.hefen.binds[i].locArr[i]==1 ){
							if(this.rules.hefen.binds[i].value!=""){
								return true;
							}
						}
					}
				}
	
				if(!hasSetCondi){
					showToastTip("请设置生成条件");
					return false;
				}
				return true;
			},
			        
			getUnopenPrizeInfo(){
				const _this = this;
				getResponseData("/code/unOpenPrize","get",{},function(res){
					if(res.code==0){
						if(res.data.draw!=null){
							var openStatus = res.data.draw.openStatus;
							_this.openStatus = openStatus;													
						}
					}
				})
			},
			hefenItemChange1(e){
				const locArr = e.detail.value;
				var arr = [0,0,0];
				locArr.forEach((v,idx)=>{
					arr[v]=1;
				})
				this.rules.hefen.binds[0].locArr = arr;
				console.log("hefenItemChange1 =",this.rules.hefen.binds[0].locArr);	
							
			},
			hefenItemChange2(e){
				const locArr = e.detail.value;
				var arr = [0,0,0];
				locArr.forEach((v,idx)=>{
					arr[v]=1;
				})
				this.rules.hefen.binds[1].locArr = arr;
				console.log("hefenItemChange2 =",this.rules.hefen.binds[1].locArr);	
							
			},
			hefenItemChange3(e){
				const locArr = e.detail.value;
				var arr = [0,0,0];
				locArr.forEach((v,idx)=>{
					arr[v]=1;
				})
				this.rules.hefen.binds[2].locArr = arr;
				console.log("hefenItemChange3 =",this.rules.hefen.binds[2].locArr);	
						
			},
			hefenItemChange4(e){
				const locArr = e.detail.value;
				var arr = [0,0,0];
				locArr.forEach((v,idx)=>{
					arr[v]=1;
				})
				this.rules.hefen.binds[3].locArr = arr;
				console.log("hefenItemChange4 =",this.rules.hefen.binds[3].locArr);	
						
			},
			xLocationChange(e){
				const locArr = e.detail.value;
				console.log("locArr ="+locArr);	
				var arr = [0,0,0];
				locArr.forEach((v,idx)=>{
					arr[v]=1;
				})
				this.rules.others.locArr = arr;
				console.log("xLocationChange ="+this.rules.others.locArr);	
			
			},
			lotteryMethodsTrans(){//此方法刷新玩法名称的国际化
				const that = this;
				this.lotterMethodList.forEach((item,idx)=>{
					switch(item.id){
						case "1":
							item.bettingMethod=that.$t("ziliao.fixed-bit")
							break;
						case "2":
							item.bettingMethod=that.$t("ziliao.ii-positioning")
							break;
						case "3":
							item.bettingMethod=that.$t("ziliao.iii-positioning")
							break;
						case "4":
							item.bettingMethod=that.$t("ziliao.iv-positioning")
							break;
						case "5":
							item.bettingMethod=that.$t("ziliao.two-word-cash")
							break;
						case "6":
							item.bettingMethod=that.$t("ziliao.three-word-present")
							break;
						case "7":
							item.bettingMethod=that.$t("ziliao.four-word-present")
							break;							
					}
				})
				this.ruleName = this.lotterMethodList[this.lotteryMethodId-1].bettingMethod;
			},
			
			
			
			initData(){
				const _this = this;
				_this.lotteryMethodId = _this.lotterMethodList[0].id;
				_this.rules.lotteryMethodId = _this.lotterMethodList[0].id;
				_this.ruleName = _this.lotterMethodList[0].bettingMethod;
				
				// getResponseData("/draw/lotteryMethods",'get',{
				// 	lotterType:1
				// },(res)=>{
				// 	if(res.code==0){
				// 		_this.lotterMethodList = res.data;
				// 		if(res.data.length>0){
				// 			_this.lotteryMethodsTrans();
				// 			_this.lotteryMethodId = _this.lotterMethodList[1].id
				// 			_this.rules.lotteryMethodId = _this.lotterMethodList[1].id
				// 			_this.ruleName = _this.lotterMethodList[1].bettingMethod;
							
				// 		}
				// 	}
				// })			
			},
			
			changeBrotherType(brType,isInclude){
				switch(brType){
					case 2:
						if(isInclude==0){
							this.rules.brothers.br2.excluded = (this.rules.brothers.br2.excluded==1?0:1);
							this.rules.brothers.br2.included = 0;
						}else if(isInclude==1){
							this.rules.brothers.br2.included = (this.rules.brothers.br2.included==1?0:1);
							this.rules.brothers.br2.excluded = 0;
						}
						break;
					case 3:
						if(isInclude==0){
							this.rules.brothers.br3.excluded = (this.rules.brothers.br3.excluded==1?0:1);
							this.rules.brothers.br3.included = 0;
						}else if(isInclude==1){
							this.rules.brothers.br3.included = (this.rules.brothers.br3.included==1?0:1);
							this.rules.brothers.br3.excluded = 0;
						}
						break;
					case 4:
						if(isInclude==0){
							this.rules.brothers.br4.excluded = (this.rules.brothers.br4.excluded==1?0:1);
							this.rules.brothers.br4.included = 0;
						}else if(isInclude==1){
							this.rules.brothers.br4.included = (this.rules.brothers.br4.included==1?0:1);
							this.rules.brothers.br4.excluded = 0;
						}
						break;
				}
				console.log("brothers = ",JSON.stringify(this.rules.brothers))
			},
			
			delRepeatNum(e){
				switch(e){
					case 'ncode':
						this.ncode =  DeleteTheSameChar(this.ncode);
						this.rules.codes = this.ncode;
						break;
					case 'sum2':
						this.rules.sum2.sum =  DeleteTheSameChar(this.rules.sum2.sum);
						break;
					case 'fixLoc1':
						this.rules.fixCode.loc1 =  DeleteTheSameChar(this.rules.fixCode.loc1);
						break;	
					case 'fixLoc2':
						this.rules.fixCode.loc2 =  DeleteTheSameChar(this.rules.fixCode.loc2);
						break;
					case 'fixLoc3':
						this.rules.fixCode.loc3 =  DeleteTheSameChar(this.rules.fixCode.loc3);
						break;
					case 'fixLoc4':
						this.rules.fixCode.loc4 =  DeleteTheSameChar(this.rules.fixCode.loc4);
						break;
					case 'matchLoc1':
						this.rules.matchCodes.loc1 = DeleteTheSameChar(this.rules.matchCodes.loc1);
						break;	
					case 'matchLoc2':
						this.rules.matchCodes.loc2 =  DeleteTheSameChar(this.rules.matchCodes.loc2);
						break;
					case 'matchLoc3':
						this.rules.matchCodes.loc3 =  DeleteTheSameChar(this.rules.matchCodes.loc3);
						break;
					case 'matchLoc4':
						this.rules.matchCodes.loc4 =  DeleteTheSameChar(this.rules.matchCodes.loc4);
						break;
					case 'pair1':
						this.rules.pairs.pair1 = DeleteTheSameChar(this.rules.pairs.pair1);
						break;	
					case 'pair2':
						this.rules.pairs.pair2 =  DeleteTheSameChar(this.rules.pairs.pair2);
						break;
					case 'pair3':
						this.rules.pairs.pair3 =  DeleteTheSameChar(this.rules.pairs.pair3);
						break;
					case 'pair4':
						this.rules.pairs.pair4 =  DeleteTheSameChar(this.rules.pairs.pair4);
						break;
					case 'pair5':
						this.rules.pairs.pair5 =  DeleteTheSameChar(this.rules.pairs.pair5);
						break;
					case 'valueRange1':
						this.rules.others.valueRange[0] =  DeleteTheSameChar(this.rules.others.valueRange[0]);
						break;
					case 'valueRange2':
						this.rules.others.valueRange[1] =  DeleteTheSameChar(this.rules.others.valueRange[1]);
						break;
					case 'hefenBind1':
						this.rules.hefen.binds[0].value =  DeleteTheSameChar(this.rules.hefen.binds[0].value);
						break;
					case 'hefenBind2':
						this.rules.hefen.binds[1].value =  DeleteTheSameChar(this.rules.hefen.binds[1].value);
						break;
					case 'hefenBind3':
						this.rules.hefen.binds[2].value =  DeleteTheSameChar(this.rules.hefen.binds[2].value);
						break;
					case 'hefenBind4':
						this.rules.hefen.binds[3].value =  DeleteTheSameChar(this.rules.hefen.binds[3].value);
						break;
					case 'exclude':
						this.rules.others.excludes =  DeleteTheSameChar(this.rules.others.excludes);
						break;
					case 'include':
						this.rules.fushi.contains =  DeleteTheSameChar(this.rules.fushi.contains);
						break;
					case 'fushi':
						this.rules.fushi.combines =  DeleteTheSameChar(this.rules.fushi.combines);
						break;
					default:
						break;

				}
				// if(e == "sum2"){
				// 	this.rules.sum2.sum =  DeleteTheSameChar(this.rules.sum2.sum);
				// }
				//console.log(JSON.stringify(e));
				//const v = DeleteTheSameChar(e.detail.value);
				
			},
			
			changeRepeatType(repeatType,isInclude){
				switch(repeatType){
					case 2:
						if(isInclude==0){
							this.rules.repeat.double1.excluded = (this.rules.repeat.double1.excluded==1?0:1);
							this.rules.repeat.double1.included = 0;
						}else if(isInclude==1){
							this.rules.repeat.double1.included = (this.rules.repeat.double1.included==1?0:1);
							this.rules.repeat.double1.excluded = 0;
						}
						break;
					case 3:
						if(isInclude==0){
							this.rules.repeat.triple.excluded = (this.rules.repeat.triple.excluded==1?0:1);
							this.rules.repeat.triple.included = 0;
						}else if(isInclude==1){
							this.rules.repeat.triple.included = (this.rules.repeat.triple.included==1?0:1);
							this.rules.repeat.triple.excluded = 0;
						}
						break;
					case 4:
						if(isInclude==0){
							this.rules.repeat.double2.excluded = (this.rules.repeat.double2.excluded==1?0:1);
							this.rules.repeat.double2.included = 0;
						}else if(isInclude==1){
							this.rules.repeat.double2.included = (this.rules.repeat.double2.included==1?0:1);
							this.rules.repeat.double2.excluded = 0;
						}
						break;
					case 22:
						if(isInclude==0){
							this.rules.repeat.doubledouble.excluded = (this.rules.repeat.doubledouble.excluded==1?0:1);
							this.rules.repeat.doubledouble.included = 0;
						}else if(isInclude==1){
							this.rules.repeat.doubledouble.included = (this.rules.repeat.doubledouble.included==1?0:1);
							this.rules.repeat.doubledouble.excluded = 0;
						}
						break;
				}
				console.log("repeat = ",JSON.stringify(this.rules.repeat))
			},
			
			toCodeCreate(){					
				const _this = this;
				var toNext = false;
				if(this.buyMethod==1){
					toNext = true;
				}else{
					const hasSetCondi = this.checkCreateCondition();
					if(hasSetCondi){
						toNext = true;
					}
				}
				if(toNext){
					var params = {
						"buyMethod":this.buyMethod,
						"ncode":this.ncode,
						"lotteryMethodId":_this.rules.lotteryMethodId,
						"isXian":_this.rules.isXian,
						"rules":_this.rules
					}
					uni.navigateTo({
						url:"/pages/index/kuaixuan/code_create?params="+encodeURIComponent(JSON.stringify(params)),					
					})
				}
				
				
				// 	console.log("==================this.rules",this.rules);
				// 	uni.showLoading({
				// 		title:_this.$t("kuaixuan.codeCreating") //'号码生成中...'
				// 	})
				// 	getResponseData("/code/create",'post',_this.rules,(res)=>{
				// 		if(res.code==0){
				// 			_this.counts = res.count;
				// 			if(_this.counts<1){
				// 				showToastTip(_this.$t("kuaixuan.noCodeFound"));//"未找到符合条件的号码"
				// 			}else{
				// 				const resData = res.data;
				// 				const params = {
				// 					"codes":resData,
				// 					"lotteryMethodId":_this.rules.lotteryMethodId,
				// 					"isXian":_this.rules.isXian,
				// 					"rules":_this.rules
				// 				}
				// 				uni.navigateTo({
				// 					url:"/pages/index/kuaixuan/code_create?params="+encodeURIComponent(JSON.stringify(params)),					
				// 				})
				// 			}
				// 		}
				// 	})
				
						
			},
			changeSum2Rule(stype){
				this.rules.sum2.included = (this.rules.sum2.included==1?0:1);
				this.rules.sum2.sumType = stype;
			},
			clearRules(){
				console.log("==============emptyRules",this.emptyRules)
				this.rules = JSON.parse(this.emptyRules);
				this.ncode = "";
				//this.rules.lotteryMethodId = this.lotteryMethodId
			},
			
			fushiChange(te){
				if(te==1){
					this.rules.fushi.excluded = (this.rules.fushi.excluded==1?0:1);
					this.rules.fushi.included = 0;
				}else if(te==2){
					this.rules.fushi.included = (this.rules.fushi.included==1?0:1);
					this.rules.fushi.excluded = 0;
				}
			},
			pairsChange(te){
				if(te==1){
					this.rules.pairs.excluded = (this.rules.pairs.excluded==1?0:1);
					this.rules.pairs.included = 0;
				}else if(te==2){
					this.rules.pairs.included = (this.rules.pairs.included==1?0:1);
					this.rules.pairs.excluded = 0;
				}
			},
			hefenChange(te){
				if(te==1){
					this.rules.hefen.excluded = (this.rules.hefen.excluded==1?0:1);
					this.rules.hefen.included = 0;
				}else if(te==2){
					this.rules.hefen.included = (this.rules.hefen.included==1?0:1);
					this.rules.hefen.excluded = 0;
				}
			},
			matchCodesTypeChange(te){
				if(te==1){
					this.rules.matchCodes.excluded = (this.rules.matchCodes.excluded==1?0:1);
					this.rules.matchCodes.included = 0;
				}else if(te==2){
					this.rules.matchCodes.included = (this.rules.matchCodes.included==1?0:1);
					this.rules.matchCodes.excluded = 0;
				}
			},
			changeRuleItem(item,idx){
				const mid = item.id;
				this.ruleName = item.bettingMethod;
				this.rules = JSON.parse(this.emptyRules);						
				this.lotteryMethodId = mid;
				this.rules.lotteryMethodId = mid;
				this.rules.count = idx;
				if(mid==1 ||  mid==6 || mid==7){
					this.buyMethod = 0;
				}
				uni.setStorageSync("lastBuyLmId",mid);
				
			},
			fixCodeTypeChange(te){
				if(te==1){
					this.rules.fixCode.excluded = (this.rules.fixCode.excluded==1?0:1);
					this.rules.fixCode.included = 0;
				}else if(te==2){
					this.rules.fixCode.included = (this.rules.fixCode.included==1?0:1);
					this.rules.fixCode.excluded = 0;
				}
				this.rules.matchCodes.included = 0;
				this.rules.matchCodes.excluded = 0;
				this.rules.matchCodes.isShow = false;
				this.rules.fixCode.isShow = true;
			},
			matchFullRotateTypeChange(te){//配数全转
				if(te==1){
					this.rules.matchCodes.excluded = (this.rules.matchCodes.excluded==1?0:1);
					this.rules.matchCodes.included = 0;
				}else if(te==2){
					this.rules.matchCodes.included = (this.rules.matchCodes.included==1?0:1);
					this.rules.matchCodes.excluded = 0;
				}
				this.rules.fixCode.included = 0;
				this.rules.fixCode.excluded = 0;
				this.rules.matchCodes.isXian = 0;
				this.rules.fixCode.isShow = false;
				this.rules.matchCodes.isShow = true;
			},
			smallNumChange(te){
				if(te==1){
					this.rules.smallNum.excluded = (this.rules.smallNum.excluded==1?0:1);
					this.rules.smallNum.included = 0;
				}else if(te==2){
					this.rules.smallNum.included = (this.rules.smallNum.included==1?0:1);
					this.rules.smallNum.excluded = 0;
				}
			},
			bigNumChange(te){
				if(te==1){
					this.rules.bigNum.excluded = (this.rules.bigNum.excluded==1?0:1);
					this.rules.bigNum.included = 0;
				}else if(te==2){
					this.rules.bigNum.included = (this.rules.bigNum.included==1?0:1);
					this.rules.bigNum.excluded = 0;
				}
			},
			singleNumChange(te){
				if(te==1){
					this.rules.singleNum.excluded = (this.rules.singleNum.excluded==1?0:1);
					this.rules.singleNum.included = 0;
				}else if(te==2){
					this.rules.singleNum.included = (this.rules.singleNum.included==1?0:1);
					this.rules.singleNum.excluded = 0;
				}
			},
			doubleNumChange(te){
				if(te==1){
					this.rules.doubleNum.excluded = (this.rules.doubleNum.excluded==1?0:1);
					this.rules.doubleNum.included = 0;
				}else if(te==2){
					this.rules.doubleNum.included = (this.rules.doubleNum.included==1?0:1);
					this.rules.doubleNum.excluded = 0;
				}
			},
			
			bigNumLocChange(e){
				const locArr = e.detail.value;
				var arr = [0,0,0];
				locArr.forEach((v,idx)=>{
					arr[v]=1;
				})
				this.rules.bigNum.locArr = arr;
				//console.log("bigNum.locArr =",this.rules.bigNum.locArr);	
				
			},
		
		
			smallNumLocChange(e){
				const locArr = e.detail.value;
				var arr = [0,0,0];
				locArr.forEach((v,idx)=>{
					arr[v]=1;
				})
				this.rules.smallNum.locArr = arr;
				//console.log("smallNum.locArr =",this.rules.smallNum.locArr);	

			},
				
			singleNumLocChange(e){				
				const locArr = e.detail.value;
				var arr = [0,0,0];
				locArr.forEach((v,idx)=>{
					arr[v]=1;
				})
				this.rules.singleNum.locArr = arr;
				//console.log("singleNum.locArr=",this.rules.singleNum.locArr);			
			},
			doubleNumLocChange(e){
				const locArr = e.detail.value;
				var arr = [0,0,0];
				locArr.forEach((v,idx)=>{
					arr[v]=1;
				})
				this.rules.doubleNum.locArr = arr;
				//console.log("doubleNum.locArr=",this.rules.doubleNum.locArr);	
			},								
		}
	}
</script>

<style>
	
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
	
	.chkScale{
		transform:scale(0.8)		
	}

	.ruleItem{
		width:23%;
		margin:0 1% 6rpx 1%;		
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;		
		background-color: #aaa;
		color:white;
	}
	
	.ruleItemSelected{	
		background-color: orangered;
	}
	
	.locItem{
		width:22%rpx;
		height: 80rpx;
		margin:10rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.locInput{
		border:1px solid #bbb;
		padding:2rpx;
		text-align: center;
		margin:0rpx 4rpx;
	}
	
	.width120{
		width:120rpx
	}
	
	.width100{
		width:100rpx
	}

.width120{
		width:120rpx
	}	
	.width80{
		width:80rpx
	}
	
	.width70{
		width:70rpx
	}
	
	.locInputLbl{
		text-align: center;
		margin-top:5rpx;
	}

	.row{
		display: flex;
		margin-bottom:10rpx;
		border-bottom: 1px solid #999;
		padding:8rpx;
	}
	
	.column-center{
		display: flex;
		flex-direction: column;
		margin:10rpx 0rpx;
		border-bottom: 1px solid #999;
		padding:8rpx;
	}
	
	.ruleNamelbl{
		color:blueviolet;
		margin-right: 10rpx;
	}
	
	

</style>
