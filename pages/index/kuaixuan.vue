<template>
	<view>
		
		<view :style="{'margin-top':cssHeights.headerMarginTop+'rpx'}">
			<view style="display: flex;justify-content: flex-start;flex-wrap: wrap;padding-top:10rpx" >
				<view v-for="(item,index) in lotterMethodList" v-show="item.openFlag==1"
					:class="lotteryMethodId==item.id?'ruleItem ruleItemSelected':'ruleItem'" 
					@click="changeRuleItem(item,index)">{{item.bettingMethod}}</view>
			</view>
			
		</view>
		
		<view style="text-align: center;" v-if="loading && openStatus==1">
			<image src="/static/images/load.gif"></image>
		</view>
		
		<view v-if="openStatus!=1">
			<view style="height: 300rpx;line-height: 300rpx; display:flex;flex-direction: column;justify-content: center;align-items: center;background-color: #E4E7ED;">
				<text style="font-size: 60rpx;font-weight: bolder;">{{openStatusDesc}}</text>
			</view>
		</view>
		
		<view v-if="lotterMethodList.length>0 && openStatus==1">
		
		
		
		<!-- 直选-->
		<view v-show="lotteryMethodId==1 || lotteryMethodId=='1'">
			<view style="display: flex;justify-content: flex-start;margin:20rpx;">
				<view :class="[lsTypeId==1?'red':'gray']" class="lsItem" @click="changeLsType(1)">普通</view>
				<view :class="[lsTypeId==2?'red':'gray']" class="lsItem last" @click="changeLsType(2)">和值</view>
			</view>
			<view v-show="lsTypeId==1">
				<view style="margin:10rpx;padding-bottom:5rpx;">				
					<view class="ballLabel">百位</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol">
								<view class="oneBall" :class="[bai.includes(0)?'red':'gray']" @click="selectBall(0,'bai')">0</view></view>
							<view class="ballCol">
								<view class="oneBall" :class="[bai.includes(1)?'red':'gray']" @click="selectBall(1,'bai')">1</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(2)?'red':'gray']" @click="selectBall(2,'bai')">2</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(3)?'red':'gray']" @click="selectBall(3,'bai')">3</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(4)?'red':'gray']" @click="selectBall(4,'bai')">4</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(5)?'red':'gray']" @click="selectBall(5,'bai')">5</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(6)?'red':'gray']" @click="selectBall(6,'bai')">6</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(7)?'red':'gray']" @click="selectBall(7,'bai')">7</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(8)?'red':'gray']" @click="selectBall(8,'bai')">8</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(9)?'red':'gray']" @click="selectBall(9,'bai')">9</view></view>						
					</view>	
				
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">十位</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol"><view class="oneBall" :class="[shi.includes(0)?'red':'gray']" @click="selectBall(0,'shi')">0</view></view>
							<view class="ballCol"><view class="oneBall" :class="[shi.includes(1)?'red':'gray']" @click="selectBall(1,'shi')">1</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(2)?'red':'gray']" @click="selectBall(2,'shi')">2</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(3)?'red':'gray']" @click="selectBall(3,'shi')">3</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(4)?'red':'gray']" @click="selectBall(4,'shi')">4</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(5)?'red':'gray']" @click="selectBall(5,'shi')">5</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(6)?'red':'gray']" @click="selectBall(6,'shi')">6</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(7)?'red':'gray']" @click="selectBall(7,'shi')">7</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(8)?'red':'gray']" @click="selectBall(8,'shi')">8</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(9)?'red':'gray']" @click="selectBall(9,'shi')">9</view></view>						
					</view>	
				
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">个位</view>
					<view style="width: 100%;" class="ballsRow">					
							<view class="ballCol"><view class="oneBall" :class="[ge.includes(0)?'red':'gray']" @click="selectBall(0,'ge')">0</view></view>
							<view class="ballCol"><view class="oneBall" :class="[ge.includes(1)?'red':'gray']" @click="selectBall(1,'ge')">1</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(2)?'red':'gray']" @click="selectBall(2,'ge')">2</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(3)?'red':'gray']" @click="selectBall(3,'ge')">3</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(4)?'red':'gray']" @click="selectBall(4,'ge')">4</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(5)?'red':'gray']" @click="selectBall(5,'ge')">5</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(6)?'red':'gray']" @click="selectBall(6,'ge')">6</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(7)?'red':'gray']" @click="selectBall(7,'ge')">7</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(8)?'red':'gray']" @click="selectBall(8,'ge')">8</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(9)?'red':'gray']" @click="selectBall(9,'ge')">9</view></view>						
					</view>										
				</view>
			</view>
			
			<view v-show="lsTypeId==2">
				<view style="margin:30rpx 10rpx 10rpx 10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">号码</view>
					<view style="width: 100%;margin-bottom: 10rpx;" class="ballsRow">					
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(0)?'red':'gray']" @click="selectBall(0,'hz')">0</view></view>
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(1)?'red':'gray']" @click="selectBall(1,'hz')">1</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(2)?'red':'gray']" @click="selectBall(2,'hz')">2</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(3)?'red':'gray']" @click="selectBall(3,'hz')">3</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(4)?'red':'gray']" @click="selectBall(4,'hz')">4</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(5)?'red':'gray']" @click="selectBall(5,'hz')">5</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(6)?'red':'gray']" @click="selectBall(6,'hz')">6</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(7)?'red':'gray']" @click="selectBall(7,'hz')">7</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(8)?'red':'gray']" @click="selectBall(8,'hz')">8</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(9)?'red':'gray']" @click="selectBall(9,'hz')">9</view></view>											
					</view>
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view style="width: 100%;margin-bottom: 10rpx;" class="ballsRow">					
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(10)?'red':'gray']" @click="selectBall(10,'hz')">10</view></view>
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(11)?'red':'gray']" @click="selectBall(11,'hz')">11</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(12)?'red':'gray']" @click="selectBall(12,'hz')">12</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(13)?'red':'gray']" @click="selectBall(13,'hz')">13</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(14)?'red':'gray']" @click="selectBall(14,'hz')">14</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(15)?'red':'gray']" @click="selectBall(15,'hz')">15</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(16)?'red':'gray']" @click="selectBall(16,'hz')">16</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(17)?'red':'gray']" @click="selectBall(17,'hz')">17</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(18)?'red':'gray']" @click="selectBall(18,'hz')">18</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(19)?'red':'gray']" @click="selectBall(19,'hz')">19</view></view>							
					</view>
				</view>
				<view style="margin:10rpx;padding:5rpx 0rpx;">
					<view style="width: 100%;justify-content: flex-start;margin-bottom: 10rpx;" class="ballsRow">					
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(20)?'red':'gray']" @click="selectBall(20,'hz')">20</view></view>
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(21)?'red':'gray']" @click="selectBall(21,'hz')">21</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(22)?'red':'gray']" @click="selectBall(22,'hz')">22</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(23)?'red':'gray']" @click="selectBall(23,'hz')">23</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(24)?'red':'gray']" @click="selectBall(24,'hz')">24</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(25)?'red':'gray']" @click="selectBall(25,'hz')">25</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(26)?'red':'gray']" @click="selectBall(26,'hz')">26</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(27)?'red':'gray']" @click="selectBall(27,'hz')">27</view></view>		
					</view>
				</view>
							
			</view>	
		
		</view>
		
		
		<!-- 通选-->
		<view v-show="lotteryMethodId==2 || lotteryMethodId=='2'">
			<!-- <view style="display: flex;justify-content: flex-start;margin:20rpx;">
				<view :class="[lsTypeId==1?'red':'gray']" style="width: 100rpx;border-right: 1px solid #E4E7ED;height: 60rpx;line-height: 60rpx;text-align: center;" @click="changeLsType(1)">通选</view>
			</view> -->
			<view v-show="lsTypeId==1">
				<view style="margin:10rpx;padding-bottom:5rpx;">				
					<view class="ballLabel">百位</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol">
								<view class="oneBall" :class="[bai.includes(0)?'red':'gray']" @click="selectBall(0,'bai')">0</view></view>
							<view class="ballCol">
								<view class="oneBall" :class="[bai.includes(1)?'red':'gray']" @click="selectBall(1,'bai')">1</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(2)?'red':'gray']" @click="selectBall(2,'bai')">2</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(3)?'red':'gray']" @click="selectBall(3,'bai')">3</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(4)?'red':'gray']" @click="selectBall(4,'bai')">4</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(5)?'red':'gray']" @click="selectBall(5,'bai')">5</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(6)?'red':'gray']" @click="selectBall(6,'bai')">6</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(7)?'red':'gray']" @click="selectBall(7,'bai')">7</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(8)?'red':'gray']" @click="selectBall(8,'bai')">8</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(9)?'red':'gray']" @click="selectBall(9,'bai')">9</view></view>						
					</view>	
				
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">十位</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol">
								<view class="oneBall" :class="[shi.includes(0)?'red':'gray']" @click="selectBall(0,'shi')">0</view></view>
							<view class="ballCol">
								<view class="oneBall" :class="[shi.includes(1)?'red':'gray']" @click="selectBall(1,'shi')">1</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(2)?'red':'gray']" @click="selectBall(2,'shi')">2</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(3)?'red':'gray']" @click="selectBall(3,'shi')">3</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(4)?'red':'gray']" @click="selectBall(4,'shi')">4</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(5)?'red':'gray']" @click="selectBall(5,'shi')">5</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(6)?'red':'gray']" @click="selectBall(6,'shi')">6</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(7)?'red':'gray']" @click="selectBall(7,'shi')">7</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(8)?'red':'gray']" @click="selectBall(8,'shi')">8</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(9)?'red':'gray']" @click="selectBall(9,'shi')">9</view></view>						
					</view>	
				
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">个位</view>
					<view style="width: 100%;" class="ballsRow">					
							<view class="ballCol">
								<view class="oneBall" :class="[ge.includes(0)?'red':'gray']" @click="selectBall(0,'ge')">0</view></view>
							<view class="ballCol">
								<view class="oneBall" :class="[ge.includes(1)?'red':'gray']" @click="selectBall(1,'ge')">1</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(2)?'red':'gray']" @click="selectBall(2,'ge')">2</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(3)?'red':'gray']" @click="selectBall(3,'ge')">3</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(4)?'red':'gray']" @click="selectBall(4,'ge')">4</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(5)?'red':'gray']" @click="selectBall(5,'ge')">5</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(6)?'red':'gray']" @click="selectBall(6,'ge')">6</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(7)?'red':'gray']" @click="selectBall(7,'ge')">7</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(8)?'red':'gray']" @click="selectBall(8,'ge')">8</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(9)?'red':'gray']" @click="selectBall(9,'ge')">9</view></view>						
					</view>										
				</view>
			</view>
		</view>
		
		<!-- 组三 -->
		<view v-show="lotteryMethodId==3 || lotteryMethodId=='3'">
			<view style="display: flex;justify-content: flex-start;margin:20rpx;">
				<view :class="[lsTypeId==1?'red':'gray']" class="lsItem" @click="changeLsType(1)">普通</view>
				<view :class="[lsTypeId==2?'red':'gray']" class="lsItem" @click="changeLsType(2)">胆拖</view>
				<view :class="[lsTypeId==3?'red':'gray']" class="lsItem last" @click="changeLsType(3)">和值</view>
			</view>
			<view v-show="lsTypeId==1">
				<view style="margin:10rpx;padding-bottom:5rpx;">				
					<view class="ballLabel">号码</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol">
								<view class="oneBall" :class="[bai.includes(0)?'red':'gray']" @click="selectBall(0,'bai')">0</view></view>
							<view class="ballCol">
								<view class="oneBall" :class="[bai.includes(1)?'red':'gray']" @click="selectBall(1,'bai')">1</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(2)?'red':'gray']" @click="selectBall(2,'bai')">2</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(3)?'red':'gray']" @click="selectBall(3,'bai')">3</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(4)?'red':'gray']" @click="selectBall(4,'bai')">4</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(5)?'red':'gray']" @click="selectBall(5,'bai')">5</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(6)?'red':'gray']" @click="selectBall(6,'bai')">6</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(7)?'red':'gray']" @click="selectBall(7,'bai')">7</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(8)?'red':'gray']" @click="selectBall(8,'bai')">8</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(9)?'red':'gray']" @click="selectBall(9,'bai')">9</view></view>		
					</view>					
				</view>
			</view>
			<view v-show="lsTypeId==2">
				<view style="margin:10rpx;padding-bottom:5rpx;">				
					<view class="ballLabel">胆码</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol" >						
								<view class="oneBall" :class="[shi.includes(0)?'red':'gray']" @click="selectBall(0,'dm')">0</view>
							</view>
							
							<view class="ballCol">							
								<view class="oneBall" :class="[shi.includes(1)?'red':'gray']" @click="selectBall(1,'dm')">1</view>
							</view>
							<view class="ballCol">						
								<view class="oneBall " :class="[shi.includes(2)?'red':'gray']" @click="selectBall(2,'dm')">2</view>
							</view>
							<view class="ballCol">					
								<view  class="oneBall " :class="[shi.includes(3)?'red':'gray']" @click="selectBall(3,'dm')">3</view>
							</view>
							<view class="ballCol">							
								<view class="oneBall " :class="[shi.includes(4)?'red':'gray']" @click="selectBall(4,'dm')">4</view>
							</view>
							<view class="ballCol">							
								<view class="oneBall " :class="[shi.includes(5)?'red':'gray']" @click="selectBall(5,'dm')">5</view>
								</view>
							<view class="ballCol">
								
								<view  class="oneBall " :class="[shi.includes(6)?'red':'gray']" @click="selectBall(6,'dm')">6</view></view>
							<view class="ballCol">
							
								<view class="oneBall " :class="[shi.includes(7)?'red':'gray']" @click="selectBall(7,'dm')">7</view></view>
							<view class="ballCol">
								
								<view  class="oneBall " :class="[shi.includes(8)?'red':'gray']" @click="selectBall(8,'dm')">8</view></view>
							<view class="ballCol">
								
								<view  class="oneBall " :class="[shi.includes(9)?'red':'gray']" @click="selectBall(9,'dm')">9</view></view>						
					</view>	
				
				</view>
			
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">拖码</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol">
								<view class="oneBall" :class="[ge.includes(0)?'red':'gray']" @click="selectBall(0,'tm')">0</view></view>
							<view class="ballCol">
								<view class="oneBall" :class="[ge.includes(1)?'red':'gray']" @click="selectBall(1,'tm')">1</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(2)?'red':'gray']" @click="selectBall(2,'tm')">2</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(3)?'red':'gray']" @click="selectBall(3,'tm')">3</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(4)?'red':'gray']" @click="selectBall(4,'tm')">4</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(5)?'red':'gray']" @click="selectBall(5,'tm')">5</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(6)?'red':'gray']" @click="selectBall(6,'tm')">6</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(7)?'red':'gray']" @click="selectBall(7,'tm')">7</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(8)?'red':'gray']" @click="selectBall(8,'tm')">8</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(9)?'red':'gray']" @click="selectBall(9,'tm')">9</view></view>						
					</view>	
				
				</view>

			</view>
			<view v-show="lsTypeId==3">
				<view style="margin:30rpx 10rpx 10rpx 10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">号码</view>
					<view style="width: 100%;margin-bottom: 10rpx;" class="ballsRow">					
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(1)?'red':'gray']" @click="selectBall(1,'hz')">1</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(2)?'red':'gray']" @click="selectBall(2,'hz')">2</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(3)?'red':'gray']" @click="selectBall(3,'hz')">3</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(4)?'red':'gray']" @click="selectBall(4,'hz')">4</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(5)?'red':'gray']" @click="selectBall(5,'hz')">5</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(6)?'red':'gray']" @click="selectBall(6,'hz')">6</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(7)?'red':'gray']" @click="selectBall(7,'hz')">7</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(8)?'red':'gray']" @click="selectBall(8,'hz')">8</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(9)?'red':'gray']" @click="selectBall(9,'hz')">9</view></view>	
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(10)?'red':'gray']" @click="selectBall(10,'hz')">10</view></view>
					</view>
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view style="width: 100%;margin-bottom: 10rpx;" class="ballsRow">											
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(11)?'red':'gray']" @click="selectBall(11,'hz')">11</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(12)?'red':'gray']" @click="selectBall(12,'hz')">12</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(13)?'red':'gray']" @click="selectBall(13,'hz')">13</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(14)?'red':'gray']" @click="selectBall(14,'hz')">14</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(15)?'red':'gray']" @click="selectBall(15,'hz')">15</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(16)?'red':'gray']" @click="selectBall(16,'hz')">16</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(17)?'red':'gray']" @click="selectBall(17,'hz')">17</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(18)?'red':'gray']" @click="selectBall(18,'hz')">18</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(19)?'red':'gray']" @click="selectBall(19,'hz')">19</view></view>	
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(20)?'red':'gray']" @click="selectBall(20,'hz')">20</view></view>
					</view>
				</view>
				<view style="margin:10rpx;padding:5rpx 0rpx;">
					<view style="width: 100%;justify-content: flex-start;margin-bottom: 10rpx;" class="ballsRow">												
						<view class="ballCol"><view class="oneBall" :class="[hz.includes(21)?'red':'gray']" @click="selectBall(21,'hz')">21</view></view>
						<view class="ballCol"><view class="oneBall " :class="[hz.includes(22)?'red':'gray']" @click="selectBall(22,'hz')">22</view></view>
						<view class="ballCol"><view class="oneBall " :class="[hz.includes(23)?'red':'gray']" @click="selectBall(23,'hz')">23</view></view>
						<view class="ballCol"><view class="oneBall " :class="[hz.includes(24)?'red':'gray']" @click="selectBall(24,'hz')">24</view></view>
						<view class="ballCol"><view class="oneBall " :class="[hz.includes(25)?'red':'gray']" @click="selectBall(25,'hz')">25</view></view>
						<view class="ballCol"><view class="oneBall " :class="[hz.includes(26)?'red':'gray']" @click="selectBall(26,'hz')">26</view></view>	
					</view>
				</view>
							
			</view>	
					
		</view>
		
		
		<!-- 组六-->
		<view v-show="lotteryMethodId==4 || lotteryMethodId=='4'">
			<view style="display: flex;justify-content: flex-start;margin:20rpx;">
				<view :class="[lsTypeId==1?'red':'gray']" class="lsItem" @click="changeLsType(1)">普通</view>
				<view :class="[lsTypeId==2?'red':'gray']" class="lsItem" @click="changeLsType(2)">胆拖</view>
				<view :class="[lsTypeId==3?'red':'gray']" class="lsItem last" @click="changeLsType(3)">和值</view>
			</view>
			<view v-show="lsTypeId==1">
				<view style="margin:10rpx;padding-bottom:5rpx;">				
					<view class="ballLabel">号码</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol">
								<view class="oneBall" :class="[bai.includes(0)?'red':'gray']" @click="selectBall(0,'bai')">0</view></view>
							<view class="ballCol">
								<view class="oneBall" :class="[bai.includes(1)?'red':'gray']" @click="selectBall(1,'bai')">1</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(2)?'red':'gray']" @click="selectBall(2,'bai')">2</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(3)?'red':'gray']" @click="selectBall(3,'bai')">3</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(4)?'red':'gray']" @click="selectBall(4,'bai')">4</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(5)?'red':'gray']" @click="selectBall(5,'bai')">5</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(6)?'red':'gray']" @click="selectBall(6,'bai')">6</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(7)?'red':'gray']" @click="selectBall(7,'bai')">7</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(8)?'red':'gray']" @click="selectBall(8,'bai')">8</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(9)?'red':'gray']" @click="selectBall(9,'bai')">9</view></view>		
					</view>
					
				</view>
		
			</view>
			<view v-show="lsTypeId==2">
				<view style="margin:10rpx;padding-bottom:5rpx;">				
					<view class="ballLabel">胆码</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol">
								<view class="oneBall" :class="[shi.includes(0)?'red':'gray']" @click="selectBall(0,'dm')">0</view></view>
							<view class="ballCol">
								<view class="oneBall" :class="[shi.includes(1)?'red':'gray']" @click="selectBall(1,'dm')">1</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(2)?'red':'gray']" @click="selectBall(2,'dm')">2</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(3)?'red':'gray']" @click="selectBall(3,'dm')">3</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(4)?'red':'gray']" @click="selectBall(4,'dm')">4</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(5)?'red':'gray']" @click="selectBall(5,'dm')">5</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(6)?'red':'gray']" @click="selectBall(6,'dm')">6</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(7)?'red':'gray']" @click="selectBall(7,'dm')">7</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(8)?'red':'gray']" @click="selectBall(8,'dm')">8</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[shi.includes(9)?'red':'gray']" @click="selectBall(9,'dm')">9</view></view>						
					</view>	
				
				</view>
			
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">拖码</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol">
								<view class="oneBall" :class="[ge.includes(0)?'red':'gray']" @click="selectBall(0,'tm')">0</view></view>
							<view class="ballCol">
								<view class="oneBall" :class="[ge.includes(1)?'red':'gray']" @click="selectBall(1,'tm')">1</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(2)?'red':'gray']" @click="selectBall(2,'tm')">2</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(3)?'red':'gray']" @click="selectBall(3,'tm')">3</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(4)?'red':'gray']" @click="selectBall(4,'tm')">4</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(5)?'red':'gray']" @click="selectBall(5,'tm')">5</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(6)?'red':'gray']" @click="selectBall(6,'tm')">6</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(7)?'red':'gray']" @click="selectBall(7,'tm')">7</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(8)?'red':'gray']" @click="selectBall(8,'tm')">8</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[ge.includes(9)?'red':'gray']" @click="selectBall(9,'tm')">9</view></view>						
					</view>					
				</view>	
			</view>
			<view v-show="lsTypeId==3">
				<view style="margin:30rpx 10rpx 10rpx 10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">号码</view>
					<view style="width: 100%;margin-bottom: 10rpx;" class="ballsRow">					
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(3)?'red':'gray']" @click="selectBall(3,'hz')">3</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(4)?'red':'gray']" @click="selectBall(4,'hz')">4</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(5)?'red':'gray']" @click="selectBall(5,'hz')">5</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(6)?'red':'gray']" @click="selectBall(6,'hz')">6</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(7)?'red':'gray']" @click="selectBall(7,'hz')">7</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(8)?'red':'gray']" @click="selectBall(8,'hz')">8</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(9)?'red':'gray']" @click="selectBall(9,'hz')">9</view></view>	
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(10)?'red':'gray']" @click="selectBall(10,'hz')">10</view></view>
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(11)?'red':'gray']" @click="selectBall(11,'hz')">11</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(12)?'red':'gray']" @click="selectBall(12,'hz')">12</view></view>
					</view>
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view style="width: 100%;margin-bottom: 10rpx;" class="ballsRow">					
							
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(13)?'red':'gray']" @click="selectBall(13,'hz')">13</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(14)?'red':'gray']" @click="selectBall(14,'hz')">14</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(15)?'red':'gray']" @click="selectBall(15,'hz')">15</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(16)?'red':'gray']" @click="selectBall(16,'hz')">16</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(17)?'red':'gray']" @click="selectBall(17,'hz')">17</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(18)?'red':'gray']" @click="selectBall(18,'hz')">18</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(19)?'red':'gray']" @click="selectBall(19,'hz')">19</view></view>	
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(20)?'red':'gray']" @click="selectBall(20,'hz')">20</view></view>
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(21)?'red':'gray']" @click="selectBall(21,'hz')">21</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(22)?'red':'gray']" @click="selectBall(22,'hz')">22</view></view>
					</view>
				</view>
				<view style="margin:10rpx;padding:5rpx 0rpx;">
					<view style="width: 100%;justify-content: flex-start;margin-bottom: 10rpx;" class="ballsRow">					
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(23)?'red':'gray']" @click="selectBall(23,'hz')">23</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(24)?'red':'gray']" @click="selectBall(24,'hz')">24</view></view>	
					</view>
				</view>
							
			</view>	
					
		</view>
		
		<!-- 和数 -->
		<view v-show="lotteryMethodId==5 || lotteryMethodId=='5'">
			<!-- <view style="display: flex;justify-content: flex-start;margin:20rpx;">
				<view :class="[lsTypeId==1?'red':'gray']" style="width: 100rpx;border-right: 1px solid #E4E7ED;height: 60rpx;line-height: 60rpx;text-align: center;" @click="changeLsType(1)">和数</view>
			</view> -->
			<view v-show="lsTypeId==1">
				<view style="margin:30rpx 10rpx 10rpx 10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">号码</view>
					<view style="width: 100%;margin-bottom: 10rpx;" class="ballsRow">					
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(0)?'red':'gray']" @click="selectBall(0,'hz')">0</view></view>
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(1)?'red':'gray']" @click="selectBall(1,'hz')">1</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(2)?'red':'gray']" @click="selectBall(2,'hz')">2</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(3)?'red':'gray']" @click="selectBall(3,'hz')">3</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(4)?'red':'gray']" @click="selectBall(4,'hz')">4</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(5)?'red':'gray']" @click="selectBall(5,'hz')">5</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(6)?'red':'gray']" @click="selectBall(6,'hz')">6</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(7)?'red':'gray']" @click="selectBall(7,'hz')">7</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(8)?'red':'gray']" @click="selectBall(8,'hz')">8</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(9)?'red':'gray']" @click="selectBall(9,'hz')">9</view></view>											
					</view>
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view style="width: 100%;margin-bottom: 10rpx;" class="ballsRow">					
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(10)?'red':'gray']" @click="selectBall(10,'hz')">10</view></view>
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(11)?'red':'gray']" @click="selectBall(11,'hz')">11</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(12)?'red':'gray']" @click="selectBall(12,'hz')">12</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(13)?'red':'gray']" @click="selectBall(13,'hz')">13</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(14)?'red':'gray']" @click="selectBall(14,'hz')">14</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(15)?'red':'gray']" @click="selectBall(15,'hz')">15</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(16)?'red':'gray']" @click="selectBall(16,'hz')">16</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(17)?'red':'gray']" @click="selectBall(17,'hz')">17</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(18)?'red':'gray']" @click="selectBall(18,'hz')">18</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(19)?'red':'gray']" @click="selectBall(19,'hz')">19</view></view>							
					</view>
				</view>
				<view style="margin:10rpx;padding:5rpx 0rpx;">
					<view style="width: 100%;margin-bottom: 10rpx;display: flex;justify-content: flex-start;" class="ballsRow">					
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(20)?'red':'gray']" @click="selectBall(20,'hz')">20</view></view>
							<view class="ballCol"><view class="oneBall" :class="[hz.includes(21)?'red':'gray']" @click="selectBall(21,'hz')">21</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(22)?'red':'gray']" @click="selectBall(22,'hz')">22</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(23)?'red':'gray']" @click="selectBall(23,'hz')">23</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(24)?'red':'gray']" @click="selectBall(24,'hz')">24</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(25)?'red':'gray']" @click="selectBall(25,'hz')">25</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(26)?'red':'gray']" @click="selectBall(26,'hz')">26</view></view>
							<view class="ballCol"><view class="oneBall " :class="[hz.includes(27)?'red':'gray']" @click="selectBall(27,'hz')">27</view></view>		
					</view>
				</view>
							
			</view>	
					
		</view>
		
		<view v-show="lotteryMethodId==13 || lotteryMethodId=='13'">
			<!-- <view style="display: flex;justify-content: flex-start;margin:20rpx;">
				<view :class="[lsTypeId==1?'red':'gray']" style="width: 100rpx;border-right: 1px solid #E4E7ED;height: 60rpx;line-height: 60rpx;text-align: center;" @click="changeLsType(1)">和数</view>
			</view> -->
			<view v-show="lsTypeId==1">
				<view style="margin:30rpx 10rpx 10rpx 10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">号码</view>
					<view style="width: 100%;margin-bottom: 10rpx;" class="ballsRow">					
							<view class="ballCol"><view class="oneBall" :class="[cz.includes(0)?'red':'gray']" @click="selectBall(0,'hz')">0</view></view>
							<view class="ballCol"><view class="oneBall" :class="[cz.includes(1)?'red':'gray']" @click="selectBall(1,'hz')">1</view></view>
							<view class="ballCol"><view class="oneBall " :class="[cz.includes(2)?'red':'gray']" @click="selectBall(2,'hz')">2</view></view>
							<view class="ballCol"><view class="oneBall " :class="[cz.includes(3)?'red':'gray']" @click="selectBall(3,'hz')">3</view></view>
							<view class="ballCol"><view class="oneBall " :class="[cz.includes(4)?'red':'gray']" @click="selectBall(4,'hz')">4</view></view>
							<view class="ballCol"><view class="oneBall " :class="[cz.includes(5)?'red':'gray']" @click="selectBall(5,'hz')">5</view></view>
							<view class="ballCol"><view class="oneBall " :class="[cz.includes(6)?'red':'gray']" @click="selectBall(6,'hz')">6</view></view>
							<view class="ballCol"><view class="oneBall " :class="[cz.includes(7)?'red':'gray']" @click="selectBall(7,'hz')">7</view></view>
							<view class="ballCol"><view class="oneBall " :class="[cz.includes(8)?'red':'gray']" @click="selectBall(8,'hz')">8</view></view>
							<view class="ballCol"><view class="oneBall " :class="[cz.includes(9)?'red':'gray']" @click="selectBall(9,'hz')">9</view></view>											
					</view>
				</view>						
			</view>	
					
		</view>
		
		
		
		<!-- 1D -->
		<view v-show="lotteryMethodId==6 || lotteryMethodId=='6'">
			<view style="display: flex;justify-content: flex-start;margin:20rpx;">
				<view :class="[lsTypeId==1?'red':'gray']" class="lsItem" @click="changeLsType(1)">1D</view>
				<view :class="[lsTypeId==2?'red':'gray']" class="lsItem last" @click="changeLsType(2)">猜1D</view>
			</view>
			<view v-show="lsTypeId==1">
				<view style="margin:10rpx;padding-bottom:5rpx;">				
					<view class="ballLabel">百位</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol">
								<view class="oneBall" :class="[bai.includes(0)?'red':'gray']" @click="selectBall(0,'bai')">0</view></view>
							<view class="ballCol">
								<view class="oneBall" :class="[bai.includes(1)?'red':'gray']" @click="selectBall(1,'bai')">1</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(2)?'red':'gray']" @click="selectBall(2,'bai')">2</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(3)?'red':'gray']" @click="selectBall(3,'bai')">3</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(4)?'red':'gray']" @click="selectBall(4,'bai')">4</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(5)?'red':'gray']" @click="selectBall(5,'bai')">5</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(6)?'red':'gray']" @click="selectBall(6,'bai')">6</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(7)?'red':'gray']" @click="selectBall(7,'bai')">7</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(8)?'red':'gray']" @click="selectBall(8,'bai')">8</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(9)?'red':'gray']" @click="selectBall(9,'bai')">9</view></view>						
					</view>	
				
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">十位</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol"><view class="oneBall" :class="[shi.includes(0)?'red':'gray']" @click="selectBall(0,'shi')">0</view></view>
							<view class="ballCol"><view class="oneBall" :class="[shi.includes(1)?'red':'gray']" @click="selectBall(1,'shi')">1</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(2)?'red':'gray']" @click="selectBall(2,'shi')">2</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(3)?'red':'gray']" @click="selectBall(3,'shi')">3</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(4)?'red':'gray']" @click="selectBall(4,'shi')">4</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(5)?'red':'gray']" @click="selectBall(5,'shi')">5</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(6)?'red':'gray']" @click="selectBall(6,'shi')">6</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(7)?'red':'gray']" @click="selectBall(7,'shi')">7</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(8)?'red':'gray']" @click="selectBall(8,'shi')">8</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(9)?'red':'gray']" @click="selectBall(9,'shi')">9</view></view>						
					</view>	
				
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">个位</view>
					<view style="width: 100%;" class="ballsRow">					
							<view class="ballCol"><view class="oneBall" :class="[ge.includes(0)?'red':'gray']" @click="selectBall(0,'ge')">0</view></view>
							<view class="ballCol"><view class="oneBall" :class="[ge.includes(1)?'red':'gray']" @click="selectBall(1,'ge')">1</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(2)?'red':'gray']" @click="selectBall(2,'ge')">2</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(3)?'red':'gray']" @click="selectBall(3,'ge')">3</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(4)?'red':'gray']" @click="selectBall(4,'ge')">4</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(5)?'red':'gray']" @click="selectBall(5,'ge')">5</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(6)?'red':'gray']" @click="selectBall(6,'ge')">6</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(7)?'red':'gray']" @click="selectBall(7,'ge')">7</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(8)?'red':'gray']" @click="selectBall(8,'ge')">8</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(9)?'red':'gray']" @click="selectBall(9,'ge')">9</view></view>						
					</view>										
				</view>
			</view>
			
			<view v-show="lsTypeId==2">
				<view style="margin:10rpx;padding-bottom:5rpx;">				
					<view class="ballLabel">号码</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol">
								<view class="oneBall" :class="[nums.includes(0)?'red':'gray']" @click="selectBall(0,'c1d')">0</view></view>
							<view class="ballCol">
								<view class="oneBall" :class="[nums.includes(1)?'red':'gray']" @click="selectBall(1,'c1d')">1</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(2)?'red':'gray']" @click="selectBall(2,'c1d')">2</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(3)?'red':'gray']" @click="selectBall(3,'c1d')">3</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(4)?'red':'gray']" @click="selectBall(4,'c1d')">4</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(5)?'red':'gray']" @click="selectBall(5,'c1d')">5</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(6)?'red':'gray']" @click="selectBall(6,'c1d')">6</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(7)?'red':'gray']" @click="selectBall(7,'c1d')">7</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(8)?'red':'gray']" @click="selectBall(8,'c1d')">8</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(9)?'red':'gray']" @click="selectBall(9,'c1d')">9</view></view>						
					</view>	
				
				</view>
			</view>
			
		</view>
		
		<!-- 2D -->
		<view v-show="lotteryMethodId==7 || lotteryMethodId=='7'">
			<view style="display: flex;justify-content: flex-start;margin:20rpx;">
				<view :class="[lsTypeId==1?'red':'gray']" class="lsItem" @click="changeLsType(1)">2D</view>
				<view :class="[lsTypeId==2?'red':'gray']" class="lsItem last" @click="changeLsType(2)">猜2D</view>
			</view>
			<view v-show="lsTypeId==1">
				<view style="margin:10rpx;padding-bottom:5rpx;">				
					<view class="ballLabel">百位</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol">
								<view class="oneBall" :class="[bai.includes(0)?'red':'gray']" @click="selectBall(0,'bai')">0</view></view>
							<view class="ballCol">
								<view class="oneBall" :class="[bai.includes(1)?'red':'gray']" @click="selectBall(1,'bai')">1</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(2)?'red':'gray']" @click="selectBall(2,'bai')">2</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(3)?'red':'gray']" @click="selectBall(3,'bai')">3</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(4)?'red':'gray']" @click="selectBall(4,'bai')">4</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(5)?'red':'gray']" @click="selectBall(5,'bai')">5</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(6)?'red':'gray']" @click="selectBall(6,'bai')">6</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(7)?'red':'gray']" @click="selectBall(7,'bai')">7</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(8)?'red':'gray']" @click="selectBall(8,'bai')">8</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[bai.includes(9)?'red':'gray']" @click="selectBall(9,'bai')">9</view></view>						
					</view>	
				
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">十位</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol"><view class="oneBall" :class="[shi.includes(0)?'red':'gray']" @click="selectBall(0,'shi')">0</view></view>
							<view class="ballCol"><view class="oneBall" :class="[shi.includes(1)?'red':'gray']" @click="selectBall(1,'shi')">1</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(2)?'red':'gray']" @click="selectBall(2,'shi')">2</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(3)?'red':'gray']" @click="selectBall(3,'shi')">3</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(4)?'red':'gray']" @click="selectBall(4,'shi')">4</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(5)?'red':'gray']" @click="selectBall(5,'shi')">5</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(6)?'red':'gray']" @click="selectBall(6,'shi')">6</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(7)?'red':'gray']" @click="selectBall(7,'shi')">7</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(8)?'red':'gray']" @click="selectBall(8,'shi')">8</view></view>
							<view class="ballCol"><view class="oneBall " :class="[shi.includes(9)?'red':'gray']" @click="selectBall(9,'shi')">9</view></view>						
					</view>	
				
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">个位</view>
					<view style="width: 100%;" class="ballsRow">					
							<view class="ballCol"><view class="oneBall" :class="[ge.includes(0)?'red':'gray']" @click="selectBall(0,'ge')">0</view></view>
							<view class="ballCol"><view class="oneBall" :class="[ge.includes(1)?'red':'gray']" @click="selectBall(1,'ge')">1</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(2)?'red':'gray']" @click="selectBall(2,'ge')">2</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(3)?'red':'gray']" @click="selectBall(3,'ge')">3</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(4)?'red':'gray']" @click="selectBall(4,'ge')">4</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(5)?'red':'gray']" @click="selectBall(5,'ge')">5</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(6)?'red':'gray']" @click="selectBall(6,'ge')">6</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(7)?'red':'gray']" @click="selectBall(7,'ge')">7</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(8)?'red':'gray']" @click="selectBall(8,'ge')">8</view></view>
							<view class="ballCol"><view class="oneBall " :class="[ge.includes(9)?'red':'gray']" @click="selectBall(9,'ge')">9</view></view>						
					</view>										
				</view>
			</view>
			
			<view v-show="lsTypeId==2">
				<view style="margin:10rpx;padding-bottom:5rpx;">				
					<view class="ballLabel">号码</view>
					<view style="width: 100%;" class="ballsRow">
							<view class="ballCol">
								<view class="oneBall" :class="[nums.includes(0)?'red':'gray']" @click="selectBall(0,'c2d')">0</view></view>
							<view class="ballCol">
								<view class="oneBall" :class="[nums.includes(1)?'red':'gray']" @click="selectBall(1,'c2d')">1</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(2)?'red':'gray']" @click="selectBall(2,'c2d')">2</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(3)?'red':'gray']" @click="selectBall(3,'c2d')">3</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(4)?'red':'gray']" @click="selectBall(4,'c2d')">4</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(5)?'red':'gray']" @click="selectBall(5,'c2d')">5</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(6)?'red':'gray']" @click="selectBall(6,'c2d')">6</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(7)?'red':'gray']" @click="selectBall(7,'c2d')">7</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(8)?'red':'gray']" @click="selectBall(8,'c2d')">8</view></view>
							<view class="ballCol">
								<view class="oneBall " :class="[nums.includes(9)?'red':'gray']" @click="selectBall(9,'c2d')">9</view></view>						
					</view>	
				
				</view>
			</view>
			
			
		</view>
		
		<!-- 包选 -->
		<view v-show="lotteryMethodId==8 || lotteryMethodId=='8'">
			<view style="display: flex;justify-content: flex-start;margin:20rpx;">
				<view :class="[lsTypeId==1?'red':'gray']" class="lsItem" @click="changeLsType(1)">包选三</view>
				<view :class="[lsTypeId==2?'red':'gray']" class="lsItem last" @click="changeLsType(2)">包选六</view>
			</view>
			<view v-show="lsTypeId==1">
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">百位</view>
					<view style="width: 100%;" class="ballsRow">					
							<view class="ballCol" v-if="!rules.bx.b3.forbit.bai.includes(0)">
								<view class="oneBall" :class="[rules.bx.b3.bai.includes(0)?'red':'gray']" @click="selectBall(0,'bai')">0</view></view>
							<view class="ballCol" v-else><view class="oneBall">0</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b3.forbit.bai.includes(1)">
								<view class="oneBall" :class="[rules.bx.b3.bai.includes(1)?'red':'gray']" @click="selectBall(1,'bai')">1</view></view>
							<view class="ballCol" v-else><view class="oneBall">1</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.bai.includes(2)">
								<view class="oneBall" :class="[rules.bx.b3.bai.includes(2)?'red':'gray']" @click="selectBall(2,'bai')">2</view></view>
							<view class="ballCol" v-else><view class="oneBall">2</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.bai.includes(3)">
								<view class="oneBall" :class="[rules.bx.b3.bai.includes(3)?'red':'gray']" @click="selectBall(3,'bai')">3</view></view>
							<view class="ballCol" v-else><view class="oneBall">3</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b3.forbit.bai.includes(4)">
								<view class="oneBall" :class="[rules.bx.b3.bai.includes(4)?'red':'gray']" @click="selectBall(4,'bai')">4</view></view>
							<view class="ballCol" v-else><view class="oneBall">4</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.bai.includes(5)">
								<view class="oneBall" :class="[rules.bx.b3.bai.includes(5)?'red':'gray']" @click="selectBall(5,'bai')">5</view></view>
							<view class="ballCol" v-else><view class="oneBall">5</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b3.forbit.bai.includes(6)">
								<view class="oneBall" :class="[rules.bx.b3.bai.includes(6)?'red':'gray']" @click="selectBall(6,'bai')">6</view></view>
							<view class="ballCol" v-else><view class="oneBall">6</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.bai.includes(7)">
								<view class="oneBall" :class="[rules.bx.b3.bai.includes(7)?'red':'gray']" @click="selectBall(7,'bai')">7</view></view>
							<view class="ballCol" v-else><view class="oneBall">7</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b3.forbit.bai.includes(8)">
								<view class="oneBall" :class="[rules.bx.b3.bai.includes(8)?'red':'gray']" @click="selectBall(8,'bai')">8</view></view>
							<view class="ballCol" v-else><view class="oneBall">8</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.bai.includes(9)">
								<view class="oneBall" :class="[rules.bx.b3.bai.includes(9)?'red':'gray']" @click="selectBall(9,'bai')">9</view></view>
							<view class="ballCol" v-else><view class="oneBall">9</view></view>	
																						
					</view>
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">十位</view>
					<view style="width: 100%;" class="ballsRow">					
							<view class="ballCol" v-if="!rules.bx.b3.forbit.shi.includes(0)">
								<view class="oneBall" :class="[rules.bx.b3.shi.includes(0)?'red':'gray']" @click="selectBall(0,'shi')">0</view></view>
							<view class="ballCol" v-else><view class="oneBall">0</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b3.forbit.shi.includes(1)">
								<view class="oneBall" :class="[rules.bx.b3.shi.includes(1)?'red':'gray']" @click="selectBall(1,'shi')">1</view></view>
							<view class="ballCol" v-else><view class="oneBall">1</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.shi.includes(2)">
								<view class="oneBall" :class="[rules.bx.b3.shi.includes(2)?'red':'gray']" @click="selectBall(2,'shi')">2</view></view>
							<view class="ballCol" v-else><view class="oneBall">2</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.shi.includes(3)">
								<view class="oneBall" :class="[rules.bx.b3.shi.includes(3)?'red':'gray']" @click="selectBall(3,'shi')">3</view></view>
							<view class="ballCol" v-else><view class="oneBall">3</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b3.forbit.shi.includes(4)">
								<view class="oneBall" :class="[rules.bx.b3.shi.includes(4)?'red':'gray']" @click="selectBall(4,'shi')">4</view></view>
							<view class="ballCol" v-else><view class="oneBall">4</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.shi.includes(5)">
								<view class="oneBall" :class="[rules.bx.b3.shi.includes(5)?'red':'gray']" @click="selectBall(5,'shi')">5</view></view>
							<view class="ballCol" v-else><view class="oneBall">5</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b3.forbit.shi.includes(6)">
								<view class="oneBall" :class="[rules.bx.b3.shi.includes(6)?'red':'gray']" @click="selectBall(6,'shi')">6</view></view>
							<view class="ballCol" v-else><view class="oneBall">6</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.shi.includes(7)">
								<view class="oneBall" :class="[rules.bx.b3.shi.includes(7)?'red':'gray']" @click="selectBall(7,'shi')">7</view></view>
							<view class="ballCol" v-else><view class="oneBall">7</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b3.forbit.shi.includes(8)">
								<view class="oneBall" :class="[rules.bx.b3.shi.includes(8)?'red':'gray']" @click="selectBall(8,'shi')">8</view></view>
							<view class="ballCol" v-else><view class="oneBall">8</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.shi.includes(9)">
								<view class="oneBall" :class="[rules.bx.b3.shi.includes(9)?'red':'gray']" @click="selectBall(9,'shi')">9</view></view>
							<view class="ballCol" v-else><view class="oneBall">9</view></view>	
					</view>
				</view>
				<view style="margin:10rpx;padding:5rpx 0rpx;">
					<view class="ballLabel">个位</view>
					<view style="width: 100%;" class="ballsRow">					
							<view class="ballCol" v-if="!rules.bx.b3.forbit.ge.includes(0)">
								<view class="oneBall" :class="[rules.bx.b3.ge.includes(0)?'red':'gray']" @click="selectBall(0,'ge')">0</view></view>
							<view class="ballCol" v-else><view class="oneBall">0</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b3.forbit.ge.includes(1)">
								<view class="oneBall" :class="[rules.bx.b3.ge.includes(1)?'red':'gray']" @click="selectBall(1,'ge')">1</view></view>
							<view class="ballCol" v-else><view class="oneBall">1</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.ge.includes(2)">
								<view class="oneBall" :class="[rules.bx.b3.ge.includes(2)?'red':'gray']" @click="selectBall(2,'ge')">2</view></view>
							<view class="ballCol" v-else><view class="oneBall">2</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.ge.includes(3)">
								<view class="oneBall" :class="[rules.bx.b3.ge.includes(3)?'red':'gray']" @click="selectBall(3,'ge')">3</view></view>
							<view class="ballCol" v-else><view class="oneBall">3</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b3.forbit.ge.includes(4)">
								<view class="oneBall" :class="[rules.bx.b3.ge.includes(4)?'red':'gray']" @click="selectBall(4,'ge')">4</view></view>
							<view class="ballCol" v-else><view class="oneBall">4</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.ge.includes(5)">
								<view class="oneBall" :class="[rules.bx.b3.ge.includes(5)?'red':'gray']" @click="selectBall(5,'ge')">5</view></view>
							<view class="ballCol" v-else><view class="oneBall">5</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b3.forbit.ge.includes(6)">
								<view class="oneBall" :class="[rules.bx.b3.ge.includes(6)?'red':'gray']" @click="selectBall(6,'ge')">6</view></view>
							<view class="ballCol" v-else><view class="oneBall">6</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.ge.includes(7)">
								<view class="oneBall" :class="[rules.bx.b3.ge.includes(7)?'red':'gray']" @click="selectBall(7,'ge')">7</view></view>
							<view class="ballCol" v-else><view class="oneBall">7</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b3.forbit.ge.includes(8)">
								<view class="oneBall" :class="[rules.bx.b3.ge.includes(8)?'red':'gray']" @click="selectBall(8,'ge')">8</view></view>
							<view class="ballCol" v-else><view class="oneBall">8</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b3.forbit.ge.includes(9)">
								<view class="oneBall" :class="[rules.bx.b3.ge.includes(9)?'red':'gray']" @click="selectBall(9,'ge')">9</view></view>
							<view class="ballCol" v-else><view class="oneBall">9</view></view>	
					</view>
				</view>
						
			</view>	
			
			<view v-show="lsTypeId==2">
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">百位</view>
					<view style="width: 100%;" class="ballsRow">					
							<view class="ballCol" v-if="!rules.bx.b6.forbit.bai.includes(0)">
								<view class="oneBall" :class="[rules.bx.b6.bai.includes(0)?'red':'gray']" @click="selectBall(0,'bai')">0</view></view>
							<view class="ballCol" v-else><view class="oneBall">0</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b6.forbit.bai.includes(1)">
								<view class="oneBall" :class="[rules.bx.b6.bai.includes(1)?'red':'gray']" @click="selectBall(1,'bai')">1</view></view>
							<view class="ballCol" v-else><view class="oneBall">1</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.bai.includes(2)">
								<view class="oneBall" :class="[rules.bx.b6.bai.includes(2)?'red':'gray']" @click="selectBall(2,'bai')">2</view></view>
							<view class="ballCol" v-else><view class="oneBall">2</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.bai.includes(3)">
								<view class="oneBall" :class="[rules.bx.b6.bai.includes(3)?'red':'gray']" @click="selectBall(3,'bai')">3</view></view>
							<view class="ballCol" v-else><view class="oneBall">3</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b6.forbit.bai.includes(4)">
								<view class="oneBall" :class="[rules.bx.b6.bai.includes(4)?'red':'gray']" @click="selectBall(4,'bai')">4</view></view>
							<view class="ballCol" v-else><view class="oneBall">4</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.bai.includes(5)">
								<view class="oneBall" :class="[rules.bx.b6.bai.includes(5)?'red':'gray']" @click="selectBall(5,'bai')">5</view></view>
							<view class="ballCol" v-else><view class="oneBall">5</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b6.forbit.bai.includes(6)">
								<view class="oneBall" :class="[rules.bx.b6.bai.includes(6)?'red':'gray']" @click="selectBall(6,'bai')">6</view></view>
							<view class="ballCol" v-else><view class="oneBall">6</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.bai.includes(7)">
								<view class="oneBall" :class="[rules.bx.b6.bai.includes(7)?'red':'gray']" @click="selectBall(7,'bai')">7</view></view>
							<view class="ballCol" v-else><view class="oneBall">7</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b6.forbit.bai.includes(8)">
								<view class="oneBall" :class="[rules.bx.b6.bai.includes(8)?'red':'gray']" @click="selectBall(8,'bai')">8</view></view>
							<view class="ballCol" v-else><view class="oneBall">8</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.bai.includes(9)">
								<view class="oneBall" :class="[rules.bx.b6.bai.includes(9)?'red':'gray']" @click="selectBall(9,'bai')">9</view></view>
							<view class="ballCol" v-else><view class="oneBall">9</view></view>	
																						
					</view>
				</view>
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view class="ballLabel">十位</view>
					<view style="width: 100%;" class="ballsRow">					
							<view class="ballCol" v-if="!rules.bx.b6.forbit.shi.includes(0)">
								<view class="oneBall" :class="[rules.bx.b6.shi.includes(0)?'red':'gray']" @click="selectBall(0,'shi')">0</view></view>
							<view class="ballCol" v-else><view class="oneBall">0</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b6.forbit.shi.includes(1)">
								<view class="oneBall" :class="[rules.bx.b6.shi.includes(1)?'red':'gray']" @click="selectBall(1,'shi')">1</view></view>
							<view class="ballCol" v-else><view class="oneBall">1</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.shi.includes(2)">
								<view class="oneBall" :class="[rules.bx.b6.shi.includes(2)?'red':'gray']" @click="selectBall(2,'shi')">2</view></view>
							<view class="ballCol" v-else><view class="oneBall">2</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.shi.includes(3)">
								<view class="oneBall" :class="[rules.bx.b6.shi.includes(3)?'red':'gray']" @click="selectBall(3,'shi')">3</view></view>
							<view class="ballCol" v-else><view class="oneBall">3</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b6.forbit.shi.includes(4)">
								<view class="oneBall" :class="[rules.bx.b6.shi.includes(4)?'red':'gray']" @click="selectBall(4,'shi')">4</view></view>
							<view class="ballCol" v-else><view class="oneBall">4</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.shi.includes(5)">
								<view class="oneBall" :class="[rules.bx.b6.shi.includes(5)?'red':'gray']" @click="selectBall(5,'shi')">5</view></view>
							<view class="ballCol" v-else><view class="oneBall">5</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b6.forbit.shi.includes(6)">
								<view class="oneBall" :class="[rules.bx.b6.shi.includes(6)?'red':'gray']" @click="selectBall(6,'shi')">6</view></view>
							<view class="ballCol" v-else><view class="oneBall">6</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.shi.includes(7)">
								<view class="oneBall" :class="[rules.bx.b6.shi.includes(7)?'red':'gray']" @click="selectBall(7,'shi')">7</view></view>
							<view class="ballCol" v-else><view class="oneBall">7</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b6.forbit.shi.includes(8)">
								<view class="oneBall" :class="[rules.bx.b6.shi.includes(8)?'red':'gray']" @click="selectBall(8,'shi')">8</view></view>
							<view class="ballCol" v-else><view class="oneBall">8</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.shi.includes(9)">
								<view class="oneBall" :class="[rules.bx.b6.shi.includes(9)?'red':'gray']" @click="selectBall(9,'shi')">9</view></view>
							<view class="ballCol" v-else><view class="oneBall">9</view></view>	
					</view>
				</view>
				<view style="margin:10rpx;padding:5rpx 0rpx;">
					<view class="ballLabel">个位</view>
					<view style="width: 100%;" class="ballsRow">					
							<view class="ballCol" v-if="!rules.bx.b6.forbit.ge.includes(0)">
								<view class="oneBall" :class="[rules.bx.b6.ge.includes(0)?'red':'gray']" @click="selectBall(0,'ge')">0</view></view>
							<view class="ballCol" v-else><view class="oneBall">0</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b6.forbit.ge.includes(1)">
								<view class="oneBall" :class="[rules.bx.b6.ge.includes(1)?'red':'gray']" @click="selectBall(1,'ge')">1</view></view>
							<view class="ballCol" v-else><view class="oneBall">1</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.ge.includes(2)">
								<view class="oneBall" :class="[rules.bx.b6.ge.includes(2)?'red':'gray']" @click="selectBall(2,'ge')">2</view></view>
							<view class="ballCol" v-else><view class="oneBall">2</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.ge.includes(3)">
								<view class="oneBall" :class="[rules.bx.b6.ge.includes(3)?'red':'gray']" @click="selectBall(3,'ge')">3</view></view>
							<view class="ballCol" v-else><view class="oneBall">3</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b6.forbit.ge.includes(4)">
								<view class="oneBall" :class="[rules.bx.b6.ge.includes(4)?'red':'gray']" @click="selectBall(4,'ge')">4</view></view>
							<view class="ballCol" v-else><view class="oneBall">4</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.ge.includes(5)">
								<view class="oneBall" :class="[rules.bx.b6.ge.includes(5)?'red':'gray']" @click="selectBall(5,'ge')">5</view></view>
							<view class="ballCol" v-else><view class="oneBall">5</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b6.forbit.ge.includes(6)">
								<view class="oneBall" :class="[rules.bx.b6.ge.includes(6)?'red':'gray']" @click="selectBall(6,'ge')">6</view></view>
							<view class="ballCol" v-else><view class="oneBall">6</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.ge.includes(7)">
								<view class="oneBall" :class="[rules.bx.b6.ge.includes(7)?'red':'gray']" @click="selectBall(7,'ge')">7</view></view>
							<view class="ballCol" v-else><view class="oneBall">7</view></view>	
							
							<view class="ballCol" v-if="!rules.bx.b6.forbit.ge.includes(8)">
								<view class="oneBall" :class="[rules.bx.b6.ge.includes(8)?'red':'gray']" @click="selectBall(8,'ge')">8</view></view>
							<view class="ballCol" v-else><view class="oneBall">8</view></view>	
								
							<view class="ballCol" v-if="!rules.bx.b6.forbit.ge.includes(9)">
								<view class="oneBall" :class="[rules.bx.b6.ge.includes(9)?'red':'gray']" @click="selectBall(9,'ge')">9</view></view>
							<view class="ballCol" v-else><view class="oneBall">9</view></view>	
					</view>
				</view>
						
			</view>	
			
			
		</view>
		
		
		<!-- 大小 -->
		<view v-show="lotteryMethodId==9 || lotteryMethodId=='9'">
			<!-- <view style="display: flex;justify-content: flex-start;margin:20rpx;">
				<view :class="[lsTypeId==1?'red':'gray']" style="width: 100rpx;border-right: 1px solid #E4E7ED;height: 60rpx;line-height: 60rpx;text-align: center;" @click="changeLsType(1)">大小</view>
			</view> -->
			<view v-show="lsTypeId==1">
				<view style="margin:10rpx;padding-bottom:5rpx;">
					<view style="margin:30rpx;">
						<view class="ballsRow"  style="width: 100%;justify-content: center;">			
							<view style="display: flex;justify-content: center;width:50%"><view class="oneBall-large" :class="[rules.dx.xiao?'red':'gray']" @click="selectBall(0,'xiao')">小</view></view>
							<view style="display: flex;justify-content: center;width:50%"><view class="oneBall-large" :class="[rules.dx.da?'red':'gray']" @click="selectBall(1,'da')">大</view></view>
															
						</view>
					</view>
				</view>
										
			</view>	
			
		</view>
		
		<!-- 奇偶 -->
		<view v-show="lotteryMethodId==10 || lotteryMethodId=='10'">
			<!-- <view style="display: flex;justify-content: flex-start;margin:20rpx;">
				<view :class="[lsTypeId==1?'red':'gray']" style="width: 100rpx;border-right: 1px solid #E4E7ED;height: 60rpx;line-height: 60rpx;text-align: center;" 
				@click="changeLsType(1)">奇偶</view>
			</view> -->
			<view v-show="lsTypeId==1">
				<view style="margin:30rpx;">
					<view class="ballsRow"  style="width: 100%;justify-content: center;">					
						<view style="display: flex;justify-content: center;width:50%"><view class="oneBall-large" :class="[rules.jo.ji?'red':'gray']" @click="selectBall(1,'ji')">奇</view></view>
						<view style="display: flex;justify-content: center;width:50%"><view class="oneBall-large" :class="[rules.jo.ou?'red':'gray']" @click="selectBall(0,'ou')">偶</view></view>										
					</view>
				</view>
										
			</view>	
			
		</view>
		
		
		<!-- 猜三同 -->
		<view v-show="lotteryMethodId==11 || lotteryMethodId=='11'">
			<!-- <view style="display: flex;justify-content: flex-start;margin:20rpx;">
				<view :class="[lsTypeId==1?'red':'gray']" style="width: 100rpx;border-right: 1px solid #E4E7ED;height: 60rpx;line-height: 60rpx;text-align: center;" @click="changeLsType(1)">猜三同</view>
			</view> -->
			<view v-show="lsTypeId==1">
				<view :class="[rules.c3t.isSelect?'border-active':'border-inactive']" @click="selectBall(0,'c3t')" style="margin: 30rpx;">
					<view style="display: flex; width: 98%;padding:3% 1%;">					
						<view style="display: flex;justify-content: center;width:20%"><view style="font-weight: bold;font-size: 32rpx;">000</view></view>
						<view style="display: flex;justify-content: center;width:20%"><view style="font-weight: bold;font-size: 32rpx;">111</view></view>
						<view style="display: flex;justify-content: center;width:20%"><view style="font-weight: bold;font-size: 32rpx;">222</view></view>
						<view style="display: flex;justify-content: center;width:20%"><view style="font-weight: bold;font-size: 32rpx;">333</view></view>
						<view style="display: flex;justify-content: center;width:20%"><view style="font-weight: bold;font-size: 32rpx;">444</view></view>											
					</view>
					<view style="display: flex; width: 98%;padding:3% 1%;">
						<view style="display: flex;justify-content: center;width:20%"><view style="font-weight: bold;font-size: 32rpx;">555</view></view>
						<view style="display: flex;justify-content: center;width:20%"><view style="font-weight: bold;font-size: 32rpx;">666</view></view>
						<view style="display: flex;justify-content: center;width:20%"><view style="font-weight: bold;font-size: 32rpx;">777</view></view>
						<view style="display: flex;justify-content: center;width:20%"><view style="font-weight: bold;font-size: 32rpx;">888</view></view>
						<view style="display: flex;justify-content: center;width:20%"><view style="font-weight: bold;font-size: 32rpx;">999</view></view>											
					</view>
				</view>
										
			</view>	
			
		</view>
		
		<!-- 拖拉机 -->
		<view v-show="lotteryMethodId==12 || lotteryMethodId=='12'">
			<!-- <view style="display: flex;justify-content: flex-start;margin:20rpx;">
				<view :class="[lsTypeId==1?'red':'gray']" style="width: 100rpx;border-right: 1px solid #E4E7ED;height: 60rpx;line-height: 60rpx;text-align: center;" @click="changeLsType(1)">拖拉机</view>
			</view> -->
			<view v-show="lsTypeId==1">
				<view :class="[rules.tlj.isSelect?'border-active':'border-inactive']" @click="selectBall(0,'tlj')" style="margin: 10%;">
					<view style="display: flex; width: 90%;padding:1%;5%;justify-content: space-between;">		
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">012</view>
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">123</view>
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">234</view>
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">345</view>
					</view>	
					<view style="display: flex; width: 90%;padding:1%;5%;justify-content: space-between;">
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">456</view>
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">567</view>
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">678</view>
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">789</view>
					</view>	
					<view style="display: flex; width: 90%;padding:1%;5%;justify-content: space-between;">		
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">210</view>
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">321</view>
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">432</view>
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">543</view>
					</view>
					<view style="display: flex; width: 90%;padding:1%;5%;justify-content: space-between;">
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">654</view>
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">765</view>
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">876</view>
						<view style="font-weight: bold;font-size: 32rpx;width:20%;text-align: center;">987</view>
					</view>
				</view>
			</view>										
		</view>				
		
		
		
		<view style="text-align: center;display: flex;justify-content: center;margin:20rpx">
			<view>
				<text>您选了</text><text style="color:red;font-weight: bold;font-size: 36rpx;padding:0rpx 5rpx">{{selectCount}}</text><text>注</text>
			</view>
			<view class="red" style="width: 160rpx;margin-left:20rpx;height: 60rpx;line-height: 60rpx;border-radius: 10rpx;" @click="selectOk">确定选号</view>
			<view style="margin-left:20rpx;color:blue" @click="clearAllBalls()">清除选号</view>
			
			
		</view>
		
		<view style="margin:30rpx 30rpx 130rpx 30rpx">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view>下注列表</view>
				<view style="color:blue" @click="clearSelectList()">清空</view>
			</view>
			<view style="border:2px solid #D8D8D8;border-radius: 10rpx;">			
				<scroll-view style="height: 200rpx;" scroll-y="true">
						<view v-for="(item,idx) in selectList" style="border-bottom:1px dashed #EBEBEB">
							<view style="font-size:30rpx;text-align: left;padding:5rpx 10rpx;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">{{item.huizongName}}&nbsp;{{item.value}}</view>							
							<view style="display: flex;justify-content: space-between;padding:0rpx 10rpx 5rpx 10rpx;align-items: center;">
								<text style="color:red;font-size:28rpx;">[{{item.buyAmount}}注]</text>
								<view style="color:blue"  @click="delSelect(item)">删除</view>
							</view>						
						</view>
						
				</scroll-view>
			</view>
		</view>
		
		
		
		
	</view>	
	
	<view class="fixBottom" v-if="openStatus==1">
		<view style="display: flex;justify-content: flex-start;width: 96%;align-items: center;padding:0rpx 2%" v-if="openStatus==1">
			<view style="display: flex;justify-content: flex-start;align-items: center;width: 80%;">
				<text style="font-size: 40rpx;margin-right: 10rpx;color: white;">{{$t('kuaida.money')}}</text>
				<input type="digit" v-model="buyMoney" maxlength="5" @input="calTotalMoney" style="font-size:40rpx;width: 160rpx;border-bottom: 2px solid #666;margin-left:10rpx;margin-right: 10rpx;color:white">
			
				<view style="display: flex;flex-direction: column;justify-content: center;">
					<text style="color: white;">{{$t('kuaida.number-of-transactions')}}:{{totalAmount}}</text>
					<text style="color: white;">{{$t('kuaida.money')}}:{{totalMoney}}</text>
				</view>
			</view>
			<view @click="buyNow" class="btnBuy" style="width: 16%;">{{$t('codeCreate.betting')}}</view>
		</view>
		
	</view>
</view>
</template>

<script>
	
	import { getResponseData,showToastTip,getRespDataWithUrl} from '@/api/req.js';
	import { DeleteTheSameChar,create3DCodes,z3Codes,z3DtCode,z6Codes,z6DtCode,create2DCodes,createB3Code,createB6Code,createC2DCodes} from '@/static/common-tools.js';
	export default {
		data() {
			return {
				loading:true,
				allCodesList:[],
				openStatusDesc:'',
				openStatus:1,
				cssHeights:{
					headerMarginTop:0,
					headerHeight:0,
					contentMarginTop:0,
					contentHeight:0,
					langHeight:40
				},
				"isXian":0,
				lotteryMethodId:"1",
				lsTypeId:1,
				"lotterMethodList":[],
				"ruleItemIndex":1,			
				"rules":{
					"isXian":0,
					"count":1,
					"lotteryMethodId":"1",
					"zx":{
						pt:{
							bai:[],
							shi:[],
							ge:[],
							totals:0
						},
						hz:{
							sums:[],
							totals:0,
						}
					},
					"tx":{
						bai:[],
						shi:[],
						ge:[],
						totals:0
					},
					z3:{
						"pt":{
							bai:[],
							totals:0,
							codeList:[]
						},
						"hz":{
							sums:[],
							totals:0
						},
						"dt":{
						  dm:[],
						  tm:[],
						  totals:0,
						  allTCode:0,
						  codeList:[]
						}
					},
					z6:{
						"pt":{
							bai:[],
							totals:0,
							codeList:[]
						},
						"hz":{
							sums:[],
							totals:0
						},
						"dt":{
						  dm:[],
						  tm:[],
						  totals:0,
						  allTCode:0,
						  codeList:[]
						}
					},
					"hs":{
						sums:[],
						totals:0
					},
					"kd":{
						sums:[],
						totals:0
					},
					"bx":{
						"b3":{
							forbit:{
								bai:[],
								shi:[],
								ge:[]
							},
							bai:[],
							shi:[],
							ge:[],
							totals:0,
							codeList:[]
						},
						"b6":{
							forbit:{
								bai:[],
								shi:[],
								ge:[]
							},
							bai:[],
							shi:[],
							ge:[],
							totals:0,
							codeList:[]
						}
					},
					"tlj":{
						totals:0,
						isSelect:false
					},
					"c3t":{
						totals:0,
						isSelect:false
					},
					"dx":{
						totals:0,
						da:false,
						xiao:false
					},
					"jo":{
						totals:0,
						ji:false,
						ou:false
					},
					"d1":{
						"d1":{
							bai:'',
							shi:'',
							ge:'',
							totals:0,
							codeList:[]
						},
						"c1d":{
							bai:'',
							totals:0
						}
					},
					"d2":{
						"d2":{
							bai:'',
							shi:'',
							ge:'',
							totals:0,
							codeList:[]
						},
						"c2d":{
							bai:'',
							totals:0,
							codeList:[]
						}
					}
				},
				emptyRules:null,
				ruleName:'',
				langType:0 ,//0：中文，1：泰文
				buyMoney:'',
				bai:[],
				shi:[],
				ge:[],
				hz:[],
				cz:[],
				nums:[],
				forbit:[],
				selectCount:0,
				selectList:[],
				totalAmount:0,
				totalMoney:0,
				panUrl:"",
				playSetting:null
			}
		
		},
		created() {
			this.panUrl = uni.getStorageSync("panUrl");
			const topbarHeight = uni.getStorageSync("topbarHeight");
			const barHeight = uni.getStorageSync("statusBarH");
			this.cssHeights.headerMarginTop= topbarHeight+10;
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
				//监听开关盘状态和玩法开放状态
				//console.log('监听到事件来自 drawOpenStatus ，携带参数 msg 为：' + data);
				var drawInfo = JSON.parse(data);
				that.openStatus = drawInfo.openStatus;
				that.changeOpenStatus();
				that.playSetting = drawInfo.playSetting;
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
			this.getDrawInfo();
			
		},

		methods: {
		
			clearSelectList(){
				this.selectList = [];
				this.totalAmount = 0;				
				this.totalMoney = 0;			
			},
			getDrawInfo(){
				const _this = this;
				var reqUrl = this.panUrl+"vip/code/unOpenPrize"
				getRespDataWithUrl(reqUrl,"get",{},function(res){
					if(res.code==0){
						if(res.data.draw!=null){
							_this.openStatus = res.data.draw.openStatus;
							_this.changeOpenStatus();
							_this.initData();
							_this.allCodesList = create3DCodes();
						}					
					}else{
						uni.showToast({
							title:_this.$t('kuaida.noDrawNo'), //'期号不存在',
							icon:'error'
						})
					}
				});		
			
			},
			changeOpenStatus(){
				switch(this.openStatus){
					case 0:
						this.openStatusDesc='已封盘'; //'已封盘';
						break;
					case 3:
						this.openStatusDesc='正在开盘中' ; //'正在开盘中';
						break;
					case 2:
						this.openStatusDesc='未开盘'; //'未开盘';
						break;
					default:
						this.openStatusDesc='';							
				}
			},
			delSelect(selItem) { //删除
				if(this.selectList.length>0){
					var newList = [];
					for(var i=0;i<this.selectList.length;i++) {
						var item = this.selectList[i];
						if(item.uuid!=selItem.uuid){
							newList.push(item);
						}
					}
					this.selectList = newList;
					this.calcuTotalAmount();
				}
			},
			buyNow(){
				const that = this;
				if(this.selectList.length<1){
					showToastTip("请选择号码");
					return;
				}
				if(this.buyMoney==""){
					showToastTip("请输入下注金额");
					return;
				}
				this.selectList.forEach((item,idx)=>{
					item.buyMoney = that.buyMoney;
				})
				uni.showLoading({
					title: this.$t("kuaixuan.chulizong") //'正在处理中...'
				})
				if(this.lotteryMethodId=="5" || this.lotteryMethodId=="13"){
					var reqUrl = this.panUrl+"vip/draw/pc/buy3d/hs"
					getRespDataWithUrl(reqUrl,"POST",that.selectList,(res)=>{
						if(res.code==0){
							showToastTip("下注成功")	
							that.clearSelectList();							
						}else{
							showToastTip(res.msg)		
						}
					})
				}else{
					var reqUrl = this.panUrl+"vip/draw/pc/buy3d"
					getRespDataWithUrl(reqUrl,"POST",that.selectList,(res)=>{
						if(res.code==0){
							showToastTip("下注成功")	
							that.clearSelectList();		
							uni.$emit('updateCredit',{data:''}) 
							// uni.redirectTo({
							// 	url:'/pages/index/index'
							// })
						}else{
							showToastTip(res.msg)		
						}
					})
				}
				
			},
			calTotalMoney(e){
				const that = this;
				const bm = e.detail.value;
				if(bm.length>0){
					var money = parseFloat(bm);
					this.buyMoney = money
					this.totalMoney = money*this.totalAmount;					
				}else{
					this.buyMoney =''
					this.totalMoney = 0;		
				}
			}, 
			selectBall(num,loc){
				switch(this.lotteryMethodId){
					case '12':
						this.rules.tlj.isSelect = !this.rules.tlj.isSelect;
						if(this.rules.tlj.isSelect){
							this.selectCount = 1;
							this.rules.tlj.totals=1;
						}else{
							this.selectCount = 0;
							this.rules.tlj.totals=0;
						}
						break;
					case '11':
						this.rules.c3t.isSelect = !this.rules.c3t.isSelect;
						if(this.rules.c3t.isSelect){
							this.selectCount = 1;
							this.rules.c3t.totals=1;
						}else{
							this.selectCount = 0;
							this.rules.c3t.totals=0;
						}
						break;
					case '9':
						if(loc=="xiao"){
							this.rules.dx.xiao = !this.rules.dx.xiao;
							if(this.rules.dx.xiao){
								this.rules.dx.totals+=1;
							}else{
								//this.selectCount = 0;
								this.rules.dx.totals-=1;
							}
						}else if(loc=='da'){
							this.rules.dx.da = !this.rules.dx.da;
							if(this.rules.dx.da){
								this.rules.dx.totals+=1;
							}else{
								//this.selectCount = 0;
								this.rules.dx.totals-=1;
							}							
						}
						this.selectCount = this.rules.dx.totals;
						break;
					case '10':
						if(loc=="ji"){
							this.rules.jo.ji = !this.rules.jo.ji;
							if(this.rules.jo.ji){
								this.rules.jo.totals+=1;
							}else{
								//this.selectCount = 0;
								this.rules.jo.totals-=1;
							}
						}else if(loc=='ou'){
							this.rules.jo.ou = !this.rules.jo.ou;
							if(this.rules.jo.ou){
								this.rules.jo.totals+=1;
							}else{
								//this.selectCount = 0;
								this.rules.jo.totals-=1;
							}							
						}
						this.selectCount = this.rules.jo.totals;
						break;
					case "1":
						if(loc=='ge'){
							if(this.ge.includes(num)){
								this.ge.splice(this.ge.indexOf(num),1);
							}else{
								this.ge.push(num);
							}
						}
						else if(loc=='shi'){
							if(this.shi.includes(num)){
								this.shi.splice(this.shi.indexOf(num),1);
							}else{
								this.shi.push(num);
							}
						}else if(loc=='bai'){
							if(this.bai.includes(num)){
								this.bai.splice(this.bai.indexOf(num),1);
							}else{
								this.bai.push(num);
							}
						}else if(loc=='hz'){
							if(this.hz.includes(num)){
								this.hz.splice(this.hz.indexOf(num),1);
							}else{
								this.hz.push(num);
							}
							this.rules.zx.hz.sums = this.hz;
						}						
						break;
					case '2':
						if(loc=='ge'){
							if(this.ge.includes(num)){
								this.ge.splice(this.ge.indexOf(num),1);
							}else{
								this.ge.push(num);
							}
						}
						else if(loc=='shi'){
							if(this.shi.includes(num)){
								this.shi.splice(this.shi.indexOf(num),1);
							}else{
								this.shi.push(num);
							}
						}else if(loc=='bai'){
							if(this.bai.includes(num)){
								this.bai.splice(this.bai.indexOf(num),1);
							}else{
								this.bai.push(num);
							}
						}
						break;
					case '3': //组三
					case '4':
						if(this.lsTypeId==1){
							if(loc=='bai'){
								if(this.bai.includes(num)){
									this.bai.splice(this.bai.indexOf(num),1);
								}else{
									this.bai.push(num);
								}
							}
						}else if(this.lsTypeId==2){
							if(loc=='dm'){ //用变量shi存储胆码
								if(this.shi.includes(num)){
									this.shi.splice(this.shi.indexOf(num),1);
								}else{
									if(this.lotteryMethodId=='4'){
										if(this.shi.length>=2){
											showToastTip("最多选2个胆码");										
											return;
										}else{
											this.shi.push(num);
											if(this.ge.includes(num)){
												this.ge.splice(this.ge.indexOf(num),1);
											}
										}
									}else if(this.lotteryMethodId=='3'){
										if(this.shi.length>=1){
											showToastTip("最多选1个胆码");										
											return;
										}else{
											this.shi.push(num);
											if(this.ge.includes(num)){
												this.ge.splice(this.ge.indexOf(num),1);
											}
										}
									}																		
								}
							
							}else if(loc=="tm"){//用变量ge存储拖码
								if(this.ge.includes(num)){
									this.ge.splice(this.ge.indexOf(num),1);
								}else{
									this.ge.push(num);
									if(this.shi.includes(num)){
										this.shi.splice(this.shi.indexOf(num),1);
									}
								}
							}	
							if(this.lotteryMethodId=="3"){
								this.rules.z3.dt.dm = this.shi;
								this.rules.z3.dt.tm = this.ge
							}else if(this.lotterMethodId=="4"){
								this.rules.z6.dt.dm = this.shi;
								this.rules.z6.dt.tm = this.ge
							}
						}else if(this.lsTypeId==3){
							//和值
							if(this.hz.includes(num)){
								this.hz.splice(this.hz.indexOf(num),1);
							}else{
								this.hz.push(num);
							}						
							if(this.lotteryMethodId=="3"){								
								this.rules.z3.hz.sums = this.hz;
							}else if(this.lotteryMethodId=="4"){
								this.rules.z6.hz.sums = this.hz;
							}							
						}						
						break;
					case '5':
						if(this.hz.includes(num)){
							this.hz.splice(this.hz.indexOf(num),1);
						}else{
							this.hz.push(num);
						}	
						this.rules.hs.sums = this.hz;	
						break;
					case '13':
						if(this.cz.includes(num)){
							this.cz.splice(this.cz.indexOf(num),1);
						}else{
							this.cz.push(num);
						}	
						this.rules.kd.sums = this.cz;	
						break;
					case '6':
						//1D
						if(this.lsTypeId==1){
							if(loc=='ge'){
								if(this.ge.includes(num)){
									this.ge.splice(this.ge.indexOf(num),1);
								}else{
									this.ge.push(num);
								}
							}
							else if(loc=='shi'){
								if(this.shi.includes(num)){
									this.shi.splice(this.shi.indexOf(num),1);
								}else{
									this.shi.push(num);
								}
							}else if(loc=='bai'){								 
								if(this.bai.includes(num)){
									this.bai.splice(this.bai.indexOf(num),1);
								}else{
									this.bai.push(num);
								}
							}							
						}else if(this.lsTypeId==2){
							if(this.nums.includes(num)){
								this.nums.splice(this.nums.indexOf(num),1);
							}else{
								this.nums.push(num);
							}
						}
						break;
					case '7':
						//2D
						if(this.lsTypeId==1){
							if(loc=='ge'){
								if(this.ge.includes(num)){
									this.ge.splice(this.ge.indexOf(num),1);
								}else{
									this.ge.push(num);
								}
							}
							else if(loc=='shi'){
								if(this.shi.includes(num)){
									this.shi.splice(this.shi.indexOf(num),1);
								}else{
									this.shi.push(num);
								}
							}else if(loc=='bai'){								 
								if(this.bai.includes(num)){
									this.bai.splice(this.bai.indexOf(num),1);
								}else{
									this.bai.push(num);
								}
							}							
						}else if(this.lsTypeId==2){
							if(this.nums.includes(num)){
								this.nums.splice(this.nums.indexOf(num),1);
							}else{
								this.nums.push(num);
							}
						}
						break;
					case '8':
						if(this.lsTypeId==1){
							if(loc=='bai'){
								if(!this.rules.bx.b3.forbit.bai.includes(num)){
									if(this.rules.bx.b3.shi.includes(num) && this.rules.bx.b3.ge.includes(num)){
										this.rules.bx.b3.forbit.bai.push(num)										
									}else{
										if(this.rules.bx.b3.bai.includes(num)){
											this.rules.bx.b3.bai.splice(this.rules.bx.b3.bai.indexOf(num),1);
											this.rules.bx.b3.forbit.ge.includes(num) && this.rules.bx.b3.forbit.ge.splice(this.rules.bx.b3.forbit.ge.indexOf(num),1);
											this.rules.bx.b3.forbit.shi.includes(num) && this.rules.bx.b3.forbit.shi.splice(this.rules.bx.b3.forbit.shi.indexOf(num),1);
										}else{
										    this.rules.bx.b3.bai.push(num);							
											if(this.rules.bx.b3.shi.includes(num)){
												this.rules.bx.b3.forbit.ge.includes(num)==false && this.rules.bx.b3.forbit.ge.push(num);
											}else if(this.rules.bx.b3.ge.includes(num)){
												this.rules.bx.b3.forbit.shi.includes(num)==false && this.rules.bx.b3.forbit.shi.push(num);
											}
										}									 
									}									
								}																							
							}else if(loc=='shi'){
								if(!this.rules.bx.b3.forbit.shi.includes(num)){
									if(this.rules.bx.b3.bai.includes(num) && this.rules.bx.b3.ge.includes(num)){
										!this.rules.bx.b3.forbit.shi.includes(num) && this.rules.bx.b3.forbit.shi.push(num)							
									}else{
										if(this.rules.bx.b3.shi.includes(num)){
											this.rules.bx.b3.shi.splice(this.rules.bx.b3.shi.indexOf(num),1);
											this.rules.bx.b3.forbit.ge.includes(num) && this.rules.bx.b3.forbit.ge.splice(this.rules.bx.b3.forbit.ge.indexOf(num),1);
											this.rules.bx.b3.forbit.bai.includes(num) && this.rules.bx.b3.forbit.bai.splice(this.rules.bx.b3.forbit.bai.indexOf(num),1);
										}else{
										    this.rules.bx.b3.shi.push(num);							
											if(this.rules.bx.b3.bai.includes(num)){
												this.rules.bx.b3.forbit.ge.includes(num)==false && this.rules.bx.b3.forbit.ge.push(num);
											}else if(this.rules.bx.b3.ge.includes(num)){
												this.rules.bx.b3.forbit.bai.includes(num)==false && this.rules.bx.b3.forbit.bai.push(num);
											}
										}									 
									}									
								}															
							}else if(loc=='ge'){
								if(!this.rules.bx.b3.forbit.ge.includes(num)){
									if(this.rules.bx.b3.bai.includes(num) && this.rules.bx.b3.shi.includes(num)){
										!this.rules.bx.b3.forbit.ge.includes(num) && this.rules.bx.b3.forbit.ge.push(num)							
									}else{
										if(this.rules.bx.b3.ge.includes(num)){
											this.rules.bx.b3.ge.splice(this.rules.bx.b3.ge.indexOf(num),1);
											this.rules.bx.b3.forbit.shi.includes(num) && this.rules.bx.b3.forbit.shi.splice(this.rules.bx.b3.forbit.shi.indexOf(num),1);
											this.rules.bx.b3.forbit.bai.includes(num) && this.rules.bx.b3.forbit.bai.splice(this.rules.bx.b3.forbit.bai.indexOf(num),1);
										}else{
										    this.rules.bx.b3.ge.push(num);							
											if(this.rules.bx.b3.bai.includes(num)){
												this.rules.bx.b3.forbit.shi.includes(num)==false && this.rules.bx.b3.forbit.shi.push(num);
											}else if(this.rules.bx.b3.shi.includes(num)){
												this.rules.bx.b3.forbit.bai.includes(num)==false && this.rules.bx.b3.forbit.bai.push(num);
											}
										}									 
									}									
								}																
							}
						}else if(this.lsTypeId==2){
							if(loc=='bai'){
								if(!this.rules.bx.b6.forbit.bai.includes(num)){
									if(this.rules.bx.b6.shi.includes(num) || this.rules.bx.b6.ge.includes(num)){
										!this.rules.bx.b6.forbit.bai.includes(num) && this.rules.bx.b6.forbit.bai.push(num)										
									}else{
										if(this.rules.bx.b6.bai.includes(num)){
											this.rules.bx.b6.bai.splice(this.rules.bx.b6.bai.indexOf(num),1);
											this.rules.bx.b6.forbit.ge.includes(num) && this.rules.bx.b6.forbit.ge.splice(this.rules.bx.b6.forbit.ge.indexOf(num),1);
											this.rules.bx.b6.forbit.shi.includes(num) && this.rules.bx.b6.forbit.shi.splice(this.rules.bx.b6.forbit.shi.indexOf(num),1);
										}else{
										    this.rules.bx.b6.bai.push(num);		
											this.rules.bx.b6.forbit.ge.includes(num)==false && this.rules.bx.b6.forbit.ge.push(num);
											this.rules.bx.b6.forbit.shi.includes(num)==false && this.rules.bx.b6.forbit.shi.push(num);								
										}									 
									}									
								}																							
							}else if(loc=='shi'){
								if(!this.rules.bx.b6.forbit.shi.includes(num)){
									if(this.rules.bx.b6.bai.includes(num) || this.rules.bx.b6.ge.includes(num)){
										!this.rules.bx.b6.forbit.shi.includes(num) && this.rules.bx.b6.forbit.shi.push(num)							
									}else{
										if(this.rules.bx.b6.shi.includes(num)){
											this.rules.bx.b6.shi.splice(this.rules.bx.b6.shi.indexOf(num),1);
											this.rules.bx.b6.forbit.ge.includes(num) && this.rules.bx.b6.forbit.ge.splice(this.rules.bx.b6.forbit.ge.indexOf(num),1);
											this.rules.bx.b6.forbit.bai.includes(num) && this.rules.bx.b6.forbit.bai.splice(this.rules.bx.b6.forbit.bai.indexOf(num),1);
										}else{
										    this.rules.bx.b6.shi.push(num);		
											this.rules.bx.b6.forbit.ge.includes(num)==false && this.rules.bx.b6.forbit.ge.push(num);
											this.rules.bx.b6.forbit.bai.includes(num)==false && this.rules.bx.b6.forbit.bai.push(num);								
										}									 
									}									
								}															
							}else if(loc=='ge'){
								if(!this.rules.bx.b6.forbit.ge.includes(num)){
									if(this.rules.bx.b6.bai.includes(num) || this.rules.bx.b6.shi.includes(num)){
										!this.rules.bx.b6.forbit.ge.includes(num) && this.rules.bx.b6.forbit.ge.push(num)							
									}else{
										if(this.rules.bx.b6.ge.includes(num)){
											this.rules.bx.b6.ge.splice(this.rules.bx.b6.ge.indexOf(num),1);
											this.rules.bx.b6.forbit.shi.includes(num) && this.rules.bx.b6.forbit.shi.splice(this.rules.bx.b6.forbit.shi.indexOf(num),1);
											this.rules.bx.b6.forbit.bai.includes(num) && this.rules.bx.b6.forbit.bai.splice(this.rules.bx.b6.forbit.bai.indexOf(num),1);
										}else{
										    this.rules.bx.b6.ge.push(num);																		
											this.rules.bx.b6.forbit.shi.includes(num)==false && this.rules.bx.b6.forbit.shi.push(num);
											this.rules.bx.b6.forbit.bai.includes(num)==false && this.rules.bx.b6.forbit.bai.push(num);										
										}									 
									}									
								}																
							}
						}
						break;
				}
									
				this.calcuSelectCount();			
			},
			changeLsType(lsTypeId){
				this.clearAllBalls();
				this.lsTypeId = lsTypeId;
				
			},
			
			clearAllBalls(){
				this.cz=[];
				this.hz=[];
				this.bai=[];
				this.ge=[];
				this.shi=[];
				this.nums=[];
				this.selectCount = 0;
				switch(this.lotteryMethodId){
					case '9':
						this.rules.dx.da=false;
						this.rules.dx.xiao=false;
						break;
					case '10':
						this.rules.jo.ji=false;
						this.rules.jo.ou=false;
						break;
					case '11':
						this.rules.c3t.isSelect=false;
						break;
					case '12':
						this.rules.tlj.isSelect=false;
						break;
					case '8':
						if(this.lsTypeId==1){
							this.rules.bx.b3.bai=[]
							this.rules.bx.b3.shi=[]
							this.rules.bx.b3.ge=[];
							this.rules.bx.b3.forbit.bai=[]
							this.rules.bx.b3.forbit.shi=[]
							this.rules.bx.b3.forbit.ge=[];
						}else if(this.lsTypeId==2){
							this.rules.bx.b6.bai=[]
							this.rules.bx.b6.shi=[]
							this.rules.bx.b6.ge=[];
							this.rules.bx.b6.forbit.bai=[]
							this.rules.bx.b6.forbit.shi=[];
							this.rules.bx.b6.forbit.ge=[];
						}						
						break;
					case '7':
						if(this.lsTypeId==1){
							this.rules.d2.d2.totals=0;
						}else if(this.lsTypeId==2){
							this.rules.d2.d2.totals=0;
							this.rules.d2.c2d.codeList=[];
						}
						break;
					case '6':
						if(this.lsTypeId==1){
							
						}else if(this.lsTypeId==2){
							this.nums='';
						}
						break;
					case '5':
						this.rules.hs.sums=[];
						break;
					case '4':
						this.rules.z6.dt.dm='';
						this.rules.z6.dt.tm='';
						this.rules.z6.hz.sums=[];
						break;
					case '3':
						this.rules.z3.dt.dm='';
						this.rules.z3.dt.tm='';
						this.rules.z3.hz.sums=[];
						break;
					default:break;
					
				}
			},
			
			calcuSelectCount(){
				const that = this;
				switch(this.lotteryMethodId){
					case '1':
						if(this.lsTypeId==1){
							if(this.bai.length>0 && this.shi.length>0 && this.ge.length>0){
								this.selectCount = this.bai.length * this.shi.length * this.ge.length;
							}else{
								this.selectCount = 0;
							}
						}else if(this.lsTypeId==2){
							if(this.hz.length>0){
								var buyCodes = [];
								this.hz.forEach((hz,idx)=>{
									that.allCodesList.forEach((obj,idx1)=>{
										if(obj.sum == parseInt(hz)){
											buyCodes.push(buyCodes);
										}
									})
								})
								this.selectCount = buyCodes.length;
							}else{
								this.selectCount = 0;
							}
							this.rules.zx.hz.totals = this.selectCount
						}
						break;
					case "2":
						if(this.lsTypeId==1){
							if(this.bai.length>0 && this.shi.length>0 && this.ge.length>0){
								this.selectCount = this.bai.length * this.shi.length * this.ge.length;
							}else{
								this.selectCount = 0;
							}
						}
						break;
					case '3':
						
						if(this.lsTypeId == 1){
							if(this.bai.length>0){
								var baiNums = this.bai.join("");
								let codeList = z3Codes(baiNums);
								this.selectCount = codeList.length;
								this.rules.z3.pt.totals = codeList.length;
								this.rules.z3.pt.codeList = codeList;
							}else{
								this.selectCount = 0;
								this.rules.z3.pt.totals = 0;
								this.rules.z3.pt.codeList = [];
							}
						}else if(this.lsTypeId==2){
							if(this.ge.length>0){
								var dm = this.shi.join("");
								var tm = this.ge.join("");
								var clist = z3DtCode(dm,tm);
								this.rules.z3.dt.codeList = clist;
								this.rules.z3.dt.totals=clist.length;
								this.selectCount = clist.length;
							}
						}else if(this.lsTypeId==3){
							if(this.hz.length>0){
								var buyCodes = [];
								var len = that.allCodesList.length;
								this.hz.forEach((hz,idx)=>{
									for(var i=0;i<len;i++){
										//按三字现的号码规则，且三个号码各不相同
										var obj = that.allCodesList[i];
										var arr = [obj.bai,obj.shi,obj.ge];
										arr.sort(function (n1,n2) {
											return n1-n2;
										});
										var code = arr.join("");
										if(arr[0]==arr[1] && arr[1]==arr[2]){
											continue;
										}
										if(arr[0]==arr[1] || arr[1]==arr[2]) {
											if (obj.sum == parseInt(hz) && !buyCodes.includes(code)) {
												buyCodes.push(code);
											}
										}
									}
								})
								this.selectCount = buyCodes.length;
							}else{
								this.selectCount = 0;
							}
							this.rules.z3.hz.totals = this.selectCount
						}
						break;
					case '4':
						if(this.lsTypeId == 1){
							if(this.bai.length>0){
								var baiNums = this.bai.join("");
								let codeList = z6Codes(baiNums);
								this.selectCount = codeList.length;
								this.rules.z6.pt.totals = codeList.length;
								this.rules.z6.pt.codeList = codeList;
							}else{
								this.selectCount = 0;
								this.rules.z6.pt.totals = 0;
								this.rules.z6.pt.codeList = [];
							}
							
						}else if(this.lsTypeId==2){
							if(this.ge.length>0){
								var dm = this.shi.join("");
								var tm = this.ge.join("");
								var clist = z6DtCode(dm,tm);
								this.rules.z6.dt.codeList = clist;
								this.rules.z6.dt.totals=clist.length;
								this.selectCount = clist.length;
							}
							this.rules.z6.dt.dm = this.shi.join("");
							this.rules.z6.dt.tm = this.ge.join("");
							
						}else if(this.lsTypeId==3){
							if(this.hz.length>0){
								var buyCodes = [];
								var len = that.allCodesList.length;
								this.hz.forEach((hz,idx)=>{
									for(var i=0;i<len;i++){
										let obj = that.allCodesList[i];
										//按三字现的号码规则，且三个号码各不相同
										var arr = [obj.bai,obj.shi,obj.ge];
										arr.sort(function (n1,n2) {
											return n1-n2;
										});
										var code = arr.join("");
										if(arr[0]!=arr[1] && arr[1]!=arr[2]){
											if(obj.sum == parseInt(hz) && !buyCodes.includes(code)){
												buyCodes.push(code);
											}
										}
									}
								})
								this.selectCount = buyCodes.length;								
							}else{
								this.selectCount = 0;
							}
							this.rules.z6.hz.totals = this.selectCount;
							
						}
						break;
					case '5':
						if(this.hz.length>0){
							this.selectCount = this.hz.length;								
						}else{
							this.selectCount = 0;
						}
						this.rules.hs.totals =  this.selectCount;
						break;
					case '13':
						if(this.cz.length>0){
							this.selectCount = this.cz.length;								
						}else{
							this.selectCount = 0;
						}
						this.rules.kd.totals =  this.selectCount;
						break;
					case '6':
						if(this.lsTypeId==1){
							this.selectCount = this.bai.length + this.shi.length + this.ge.length;
							this.rules.d1.d1.totals= this.selectCount;
						}else if(this.lsTypeId==2){
							this.selectCount = this.nums.length;
							this.rules.d1.c1d.totals= this.selectCount;
						}
						break;
					case '7':
						if(this.lsTypeId==1){
							var bai = this.bai.join("");
							var shi = this.shi.join("");
							var ge =  this.ge.join("");
							var clist = create2DCodes(bai,shi,ge);
							this.selectCount = clist.length;
							this.rules.d2.d2.totals= this.selectCount;
						}else if(this.lsTypeId==2){
							let bai = this.nums.join("");
							var clist = createC2DCodes(bai)
							this.selectCount = clist.length;
							this.rules.d2.c2d.totals= clist.length;
							this.rules.d2.c2d.codeList = clist;
							this.rules.d2.c2d.bai = this.nums.join("");
						}
						break;		
					case '8':
						if(this.lsTypeId==1){
							var bai = this.rules.bx.b3.bai.join("");
							var shi = this.rules.bx.b3.shi.join("");
							var ge =  this.rules.bx.b3.ge.join("");
							var clist = createB3Code(bai,shi,ge);
							this.selectCount = clist.length;
							this.rules.bx.b3.totals= this.selectCount;
							this.rules.bx.b3.codeList=clist;
						}else if(this.lsTypeId==2){
							var bai = this.rules.bx.b6.bai.join("");
							var shi = this.rules.bx.b6.shi.join("");
							var ge =  this.rules.bx.b6.ge.join("");
							var clist = createB6Code(bai,shi,ge);
							this.selectCount = clist.length;
							this.rules.bx.b6.totals= this.selectCount;
							this.rules.bx.b6.codeList=clist;
						}
						break;
				}
			},
			
			selectOk(){
				const that = this;
				switch(this.lotteryMethodId){
					case '1':
						if(this.lsTypeId==1){
							if(this.bai.length>0 && this.shi.length>0 && this.ge.length>0){
								this.zxptSelect()
							}
						}else if(this.lsTypeId==2){
							if(this.hz.length>0){
								this.zxHzSelect()
							}
						}
						break;
					case '12':
						if(this.rules.tlj.isSelect){
							this.selectList.push({
								uuid:this.guid(),
								huizongName:'拖拉机单式',
								buyAmount:this.rules.tlj.totals,
								value:'拖拉机',
								lmId:this.lotteryMethodId,
								lsTypeId:this.lsTypeId,
								buyMoney:""
							})
							this.rules.tlj.isSelect = false;
						}
						
						break;
					case '11':
						if(this.rules.c3t.isSelect){
							this.selectList.push({
								uuid:this.guid(),
								huizongName:'猜三同单式',
								buyAmount:this.rules.c3t.totals,
								value:'三同号',
								lmId:this.lotteryMethodId,
								lsTypeId:this.lsTypeId,
								buyMoney:""
							})
							this.rules.c3t.isSelect = false;
						}
						break;
					case '10':
						this.joSelect()
						break;
					case '9':
						this.dxSelect()
						break;
					case '2':
						if(this.lsTypeId==1){
							if(this.bai.length>0 && this.shi.length>0 && this.ge.length>0){
								this.txSelect()
							}
						}
						break;
					case '3':
						if(this.lsTypeId == 1){
							this.z3ptSelect();
						}else if(this.lsTypeId==2){
							this.z3dtSelect();
						}else if(this.lsTypeId==3){
							if(this.rules.z3.hz.sums.length>0){
								this.selectList.push({
									uuid:that.guid(),
									huizongName:'组三和值',
									hzList:that.rules.z3.hz.sums,
									value:that.rules.z3.hz.sums.join(","),
									buyAmount:that.rules.z3.hz.totals,
									lmId:that.lotteryMethodId,
									lsTypeId:that.lsTypeId,
									buyMoney:""
								})
							}
						}
						break;
					case '4':
						if(this.lsTypeId == 1){
							this.z6ptSelect();
						}else if(this.lsTypeId==2){
							this.z6dtSelect();
						}else if(this.lsTypeId==3){
							if(this.rules.z6.hz.sums.length>0){
								this.selectList.push({
									uuid:this.guid(),
									huizongName:'组六和值',
									hzList:this.rules.z6.hz.sums,
									value:this.rules.z6.hz.sums.join(","),
									buyAmount:this.rules.z6.hz.totals,
									lmId:this.lotteryMethodId,
									lsTypeId:this.lsTypeId,
									buyMoney:""
								})
							}
						}
						break;		
					case '5':
						if(this.rules.hs.sums.length>0){
							var huizongName = this.rules.hs.sums.length==1?'和数单式':'和数复式';
							this.selectList.push({
								uuid:this.guid(),
								huizongName:huizongName,
								hzList:this.rules.hs.sums,
								value:this.rules.hs.sums.join(","),
								buyAmount:this.rules.hs.sums.length,
								lmId:this.lotteryMethodId,
								lsTypeId:1,
								buyMoney:""
							})
						}
						break;
					case '13':
						if(this.rules.kd.sums.length>0){
							var huizongName = "跨度";
							this.selectList.push({
								uuid:this.guid(),
								huizongName:huizongName,
								hzList:this.rules.kd.sums,
								value:this.rules.kd.sums.join(","),
								buyAmount:this.rules.kd.sums.length,
								lmId:this.lotteryMethodId,
								lsTypeId:1,
								buyMoney:""
							})
						}
						break;
					case '6':
						if(this.lsTypeId==1){
							this.ding1Select();
						}else if(this.lsTypeId==2){
							if(this.nums.length>0) {
								var size = this.nums.length;
								var hzname = size == 1 ? '猜1D单式' : '猜1D复式'
								this.selectList.push({
									uuid:this.guid(),
									huizongName: hzname,
									value: this.nums.join(""),
									buyCode: '',
									buyCodes:this.nums.join(""),
									buyAmount: size,
									lmId:this.lotteryMethodId,
									lsTypeId:this.lsTypeId,
									buyMoney: ""
								})
							}
						}
						break;
					case '7':
						if(this.lsTypeId==1){
							this.ding2Select();
						}else if(this.lsTypeId==2){
							var hzname = '猜2D单式'
							this.rules.d2.c2d.codeList.forEach((code,idx)=>{
								that.selectList.push({
									uuid:that.guid(),
									huizongName: hzname,
									value: code,
									buyCodes:code,
									buyAmount: 1,
									lmId:that.lotteryMethodId,
									lsTypeId:that.lsTypeId,
									buyMoney: ""
								})
							})						
						}
						break;
					case '8':
						if(this.lsTypeId==1){
							if(this.rules.bx.b3.totals>0){
								if(this.rules.bx.b3.codeList.length>0){
									this.rules.bx.b3.codeList.forEach((code,idx)=>{
										var arr = code.split("");
										that.selectList.push({
											uuid:that.guid(),
											huizongName:'包选三单式',
											value:arr.join(","),
											buyCodes:code,
											bai:arr[0],
											shi:arr[1],
											ge:arr[2],
											buyAmount:1,
											lmId:that.lotteryMethodId,
											lsTypeId:that.lsTypeId,
											buyMoney:""
										})
									})
								}
							}
						}else if(this.lsTypeId==2){
							if(this.rules.bx.b6.totals>0){
								if(this.rules.bx.b6.codeList.length>0){
									this.rules.bx.b6.codeList.forEach((code,idx)=>{
										var arr = code.split("");
										that.selectList.push({
											uuid:that.guid(),
											huizongName:'包选六单式',
											value:arr.join(","),
											buyCodes:code,
											bai:arr[0],
											shi:arr[1],
											ge:arr[2],
											buyAmount:1,
											lmId:that.lotteryMethodId,
											lsTypeId:that.lsTypeId,
											buyMoney:""
										})
									})
								}							
							}					
						}
						break;
				}
				this.clearAllBalls();
				this.calcuTotalAmount();
			},
			
			ding2Select(){
				if(this.rules.d2.d2.totals>0){
					var hzname = this.rules.d2.d2.totals == 1 ? '2D单式' : '2D复式';					
					var bai = this.bai.length==0?'-':this.bai.join("");
					var shi = this.shi.length==0?'-':this.shi.join("");
					var ge = this.ge.length==0?'-':this.ge.join("");
					this.selectList.push({
						uuid:this.guid(),
						huizongName: hzname,
						value: bai + ","+shi+","+ge,
						bai:this.bai.join(""),
						shi:this.shi.join(""),
						ge:this.ge.join(""),
						buyCodes:'',
						buyAmount: this.rules.d2.d2.totals,
						lmId:this.lotteryMethodId,
						lsTypeId:this.lsTypeId,
						buyMoney: ""
					})
				}
			},
					
			ding1Select(){
				if(this.bai.length>0) {
					var baiCode = this.bai.join("");
					var size = this.bai.length;
					var hzname = size == 1 ? '1D单式' : '1D复式'
					this.selectList.push({
						uuid:this.guid(),
						huizongName: hzname,
						value: baiCode + ",-,-",
						bai:baiCode,
						shi:"-",
						ge:"-",
						buyCodes: '',
						buyAmount: size,
						lmId: this.lotteryMethodId,
						lsTypeId: this.lsTypeId,
						buyMoney: ""
					})
				}
				if(this.shi.length>0) {
					var shiCode = this.shi.join("");
					var size = this.shi.length;
					var hzname = size == 1 ? '1D单式' : '1D复式'
					this.selectList.push({
						uuid:this.guid(),
						huizongName: hzname,
						value: "-,"+shiCode + ",-",
						bai:'-',
						shi:shiCode,
						ge:"-",
						buyCodes: '',
						buyAmount: size,
						lmId: this.lotteryMethodId,
						lsTypeId: this.lsTypeId,
						buyMoney: ""
					})
				}

				if(this.ge.length>0) {
					var geCode = this.ge.join("");
					var size = this.ge.length;
					var hzname = size == 1 ? '1D单式' : '1D复式'
					this.selectList.push({
						uuid:this.guid(),
						huizongName: hzname,
						value: "-,-,"+geCode,
						buyCodes: '',
						buyAmount: size,
						bai:'-',
						shi:'-',
						ge:geCode,
						lmId: this.lotteryMethodId,
						lsTypeId: this.lsTypeId,
						buyMoney: ""
					})
				}
			},
			
			zxptSelect(){
				var hzname = "";
				var baiNums = this.bai.join("");
				var shiNums = this.shi.join("");
				var geNums = this.ge.join("");
				let sum = this.bai.length * this.shi.length * this.ge.length;
				if(sum==1){
					hzname = "直选单式"
				}else{
					hzname = "直选复式"
				}
				this.selectList.push({									
					uuid:this.guid(),
					huizongName:hzname,
					bai:baiNums,
					shi:shiNums,
					ge:geNums,
					buyAmount:sum,
					value:baiNums+","+shiNums+","+geNums,
					lmId:this.lotteryMethodId,
					lsTypeId:this.lsTypeId,									                
					buyMoney:""
				})
			},
			
			txSelect(){
				var hzname = "";
				var baiNums = this.bai.join("");
				var shiNums = this.shi.join("");
				var geNums = this.ge.join("");
				let sum = this.bai.length * this.shi.length * this.ge.length;
				if(sum==1){
					hzname = "通选单式"
				}else{
					hzname = "通选复式"
				}
				this.selectList.push({									
					uuid:this.guid(),
					huizongName:hzname,
					bai:baiNums,
					shi:shiNums,
					ge:geNums,
					buyAmount:sum,
					value:baiNums+","+shiNums+","+geNums,
					lmId:this.lotteryMethodId,
					lsTypeId:this.lsTypeId,									                
					buyMoney:""
				})
			},
			
			zxHzSelect(){
				const that = this;
				let sum = this.hz.length;
				let hzname = "直选和值";	
				this.selectList.push({
					uuid:this.guid(),
					huizongName:hzname,
					hzList:this.rules.zx.hz.sums,
					value:this.rules.zx.hz.sums.join(","),
					buyAmount:this.rules.zx.hz.totals,
					lmId:this.lotteryMethodId,
					lsTypeId:this.lsTypeId,	
					buyMoney:""
				})
			},
			
			joSelect(){
				if(this.rules.jo.ji){
					this.selectList.push({
						uuid:this.guid(),
						huizongName:'奇偶单式',
						buyAmount:1,
						value:'奇',
						lmId:this.lotteryMethodId,
						lsTypeId:this.lsTypeId,
						buyMoney:""
					})
					this.rules.jo.ji = false;
					this.rules.jo.totals-=1;
				}
				if(this.rules.jo.ou){
					this.selectList.push({
						uuid:this.guid(),
						huizongName:'奇偶单式',
						buyAmount:1,
						value:'偶',
						lmId:this.lotteryMethodId,
						lsTypeId:this.lsTypeId,
						buyMoney:""
					})
					this.rules.jo.totals-=1;
					this.rules.jo.ou = false;							
				}
			},
			dxSelect(){
				if(this.rules.dx.da){
					this.selectList.push({
						uuid:this.guid(),
						huizongName:'大小单式',
						buyAmount:1,
						value:'大',
						lmId:this.lotteryMethodId,
						lsTypeId:this.lsTypeId,
						buyMoney:""
					})
					this.rules.dx.da = false;
					this.rules.dx.totals-=1;
				}
				if(this.rules.dx.xiao){
					this.selectList.push({
						uuid:this.guid(),
						huizongName:'大小单式',
						buyAmount:1,
						value:'小',
						lmId:this.lotteryMethodId,
						lsTypeId:this.lsTypeId,
						buyMoney:""
					})
					this.rules.dx.totals-=1;
					this.rules.dx.xiao = false;							
				}
			},
			
			z3ptSelect(){
				const that = this;
				if(this.bai.length<2){
					showToastTip("请至少选择2个号码");
					return false;
				}
				if(this.rules.z3.pt.codeList.length>0){
					this.rules.z3.pt.codeList.forEach((code,idx)=>{
						var arr = code.split("");
						that.selectList.push({
							uuid:that.guid(),
							huizongName:'组三单式',
							value:arr.join(","),
							buyCodes:code,
							bai:arr[0],
							shi:arr[1],
							ge:arr[2],
							buyAmount:1,
							lmId:that.lotteryMethodId,
							lsTypeId:that.lsTypeId,								
							buyMoney:""
						})
					})
				}
			},
			z3dtSelect(){
				const that = this;
				if(this.rules.z3.dt.dm.length==1 && this.rules.z3.dt.tm.length==0){
					showToastTip("请至少选择1个拖码");
					return false;
				}
				if(this.rules.z3.dt.dm.length==0 && this.rules.z3.dt.tm.length<2){
					showToastTip("请至少选择1个胆码");
					return false;
				}
				if(this.rules.z3.dt.totals>0){
					this.rules.z3.dt.codeList.forEach((code,idx)=>{
						var arr = code.split("");
						arr.sort();
						that.selectList.push({
							uuid:that.guid(),
							huizongName:'组三单式',
							bai:arr[0],
							shi:arr[1],
							ge:arr[2],
							value:arr.join(","),
							buyCodes:code,
							buyAmount:1,
							lmId:that.lotteryMethodId,
							lsTypeId:that.lsTypeId,
							buyMoney:""
						})
					})
				}
			},
			
			z6ptSelect(){
				const that = this;
				if(this.bai.length<3){
					showToastTip("请至少选择3个号码");
					return false;
				}
				if(this.rules.z6.pt.codeList.length>0){
					this.rules.z6.pt.codeList.forEach((code,idx)=>{
						var arr = code.split("");
						arr.sort();
						this.selectList.push({
							uuid:that.guid(),
							huizongName:'组六单式',
							value:arr.join(","),
							buyCodes:code,
							bai:arr[0],
							shi:arr[1],
							ge:arr[2],
							buyAmount:1,
							lmId:that.lotteryMethodId,
							lsTypeId:that.lsTypeId,
							buyMoney:""
						})
					})
				}
			},
			z6dtSelect(){
				const that = this;
				if(this.rules.z6.dt.dm.length==2 && this.rules.z6.dt.tm.length==0){
					showToastTip("请至少选择1个拖码");
					return false;
				}
				if(this.rules.z6.dt.dm.length==0 && this.rules.z6.dt.tm.length<3){
					showToastTip("请至少选择1个胆码");
					return false;
				}
				if(this.rules.z6.dt.dm.length==1 && this.rules.z6.dt.tm.length<2){
					showToastTip("请选择2个拖码");
					return false;
				}
				if(this.rules.z6.dt.totals>0){
					this.rules.z6.dt.codeList.forEach((code,idx)=>{
						var arr = code.split("");
						arr.sort();
						this.selectList.push({
							uuid:that.guid(),
							huizongName:'组六单式',
							value:arr.join(","),
							buyCodes:code,
							bai:arr[0],
							shi:arr[1],
							ge:arr[2],
							buyAmount:1,
							lmId:that.lotteryMethodId,
							lsTypeId:that.lsTypeId,
							buyMoney:""
						})
					})
				}
			},
			
			
			
			calcuTotalAmount(){
				var that = this;
				let buyAmount = 0;
				that.selectList.forEach((item,idx)=>{
					buyAmount +=item.buyAmount;
				})
				that.totalAmount=buyAmount;
				if(this.buyMoney!=""){
					this.totalMoney = this.buyMoney*1*this.totalAmount;
				}
			},
			
			guid() {
			    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			        var r = Math.random() * 16 | 0,
			            v = c == 'x' ? r : (r & 0x3 | 0x8);
			        return v.toString(16);
			    });
			},
			        
			getUnopenPrizeInfo(){
				const _this = this;
				var reqUrl = this.panUrl+"vip/code/unOpenPrize"
				getRespDataWithUrl(reqUrl,"get",{},function(res){
					if(res.code==0){
						if(res.data.draw!=null){
							var openStatus = res.data.draw.openStatus;
							_this.openStatus = openStatus;													
						}
					}
				})
			},
			
			lotteryMethodsTrans(){//此方法刷新玩法名称的国际化
				const that = this;
				this.ruleName = this.lotterMethodList[this.lotteryMethodId-1].bettingMethod;
			},
			
			initData(){
				const _this = this;
				var reqUrl = this.panUrl+"vip/draw/lotteryMethods"
				getRespDataWithUrl(reqUrl,'get',{
					lotterType:1
				},(res)=>{
					_this.loading = false;
					if(res.code==0){
						_this.lotterMethodList = res.data;
						if(res.data.length>0){
							_this.lotteryMethodsTrans();
							_this.lotteryMethodId = _this.lotterMethodList[0].id
							_this.rules.lotteryMethodId = _this.lotterMethodList[0].id
							_this.ruleName = _this.lotterMethodList[0].bettingMethod;
							
						}
					}else{
						showToastTip("数据加载失败");
					}
				})	
			},
		
			changeRuleItem(item,idx){
				const mid = item.id;
				this.ruleName = item.bettingMethod;
				this.rules = JSON.parse(this.emptyRules);
				this.selectList = [];
				this.clearAllBalls();
				this.totalAmount = 0;
				this.totalMoney = 0;
				this.lotteryMethodId = mid;
				this.rules.lotteryMethodId = mid;
				this.rules.count = idx;
				this.lsTypeId = 1;
			},						
		}
	
	}
</script>

<style>
	
	.ballLabel{
		padding-right: 10rpx;
		text-align:right;
		color:red;
		font-size: 28rpx;
		font-weight: bolder;
	}
	.lsItem{
		width: 120rpx;
		height: 60rpx;
		border-right: 1px solid #E4E7ED;
		line-height: 60rpx;
		text-align: center;
	}

	.lsItem .last{
		border-right: none;
	}
	
	.ballCol{
		display: flex;
		justify-content: center;
		width:10%
	}
	
	.border-active{
		border:1px solid red;
	}
	
	.border-inactive{
		border:1px solid #E4E7ED;
	}
	
	.fixBottom{
		position: fixed;
		width: 100%;
		bottom: 0;
		height: 100rpx;
		background-color: red;
		padding: 10rpx;
		z-index:10000;
	}
	
	.hide{
		display: none;
	}
	
	.ballsRow{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.ballsRow .oneBall{
		border-radius: 30rpx;
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		
	}
	
	.ballsRow .oneBall-large{
		border-radius: 60rpx;
		width: 120rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		font-weight: bolder;
		font-size: 40rpx;
		
	}
	
	.red{
		background-color: red;
		color: white;
	}
	
	.red:active{
		background-color: #ebeb75 !important;
	}
	
	.zise{
		background-color: #8A2BCF;
		color: white;
	}
	.gray{
		background-color: #cfcfcf;
		color: black;
	}
	
	.ls_title{
		padding:20rpx;
		color:red;
		border-bottom:3px solid orangered;
	}
	
	.tableCell10{
		width:10%
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
	
	.chkScale{
		transform:scale(0.8)		
	}

	.ruleItem{
		width:18%;
		margin:0 1% 6rpx 1%;		
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;		
		background-color: #aaa;
		color:white;
	}
	
	.ruleItemSelected{	
		background-color: red;
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
	
	
	.content {
			padding: 15px;
		}
	
		.text {
			font-size: 14px;
			color: #666;
			line-height: 20px;
		}
		
		.btnBuy{
			text-align:center;
			margin:0rpx 10rpx;
			height: 70rpx;
			width: 140rpx;
			line-height: 70rpx;
			background-color:#A52A2A;
			border-radius: 10rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			color: white;
			font-size: 36rpx;
		}
		
		.btnAll:active,.btnBuy:active{
			background-color: #ebeb75 !important;
		}
	
	

</style>
