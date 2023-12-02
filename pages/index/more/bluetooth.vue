<template>
	<view>
		<uni-nav-bar  :fixed="true" status-bar :title="$t('index.bluetooth-settings')"
		leftIcon="back" @clickLeft="backTo" backgroundColor="#8150CA"/> <!--蓝牙设置 -->
		
		<view style="padding-top: 5px;height: 90%;position: absolute;width: 100%;">
			<view style="background-color: #dfdfdf;font-size: 15px;padding: 5px 0;font-weight: bold;color: #5b5a5a;">
				{{$t('bluetooth.paired-devices')}}
			</view>
			<view class="yipeidui" style="height: 30%;">
				<view v-for="(item,index) in pairedList" style="display: flex;justify-content: space-between;border-bottom: 1px solid #dfdcdc;" @click="setSelectedPaired(item)">
					<view class="lanya">
						{{item.name ? item.name : item.address}}
						<span style="color: red;" v-if="item.isSelected==1">&nbsp;&nbsp;{{$t("bluetooth.hasSelect")}}</span>
						<span style="color: red;" v-else></span>
					</view>
					<view class="anniu" style="margin-top: 7px;margin-right: 5px;background-color: red;" @click.stop="removePaire(index)"><!-- 删除设备 -->{{$t("bluetooth.delDevice")}}</view>
				</view>
			</view>
			<view style="background-color: #dfdfdf;font-size: 14px;padding: 5px 0;font-weight: bold;color: #5b5a5a;">
				<view style="color: red;padding-bottom: 5px;">{{$t('bluetooth.explain')}}：{{$t('bluetooth.explain-detail')}}</view>
				<view>{{$t('bluetooth.unpaired-device')}}</view>
			</view>
			<view class="weipeidui" style="height: 50%;">
				<view v-for="(item,index) in unpairedList" style="border-bottom: 1px solid #dfdcdc;">
					<view class="lanya" @click="createBLEConnection(item.address)">{{item.name ? item.name : item.address}}</view>
				</view>
			</view>
			<view style="position: fixed;bottom: 5px;margin: 0 auto;width: 100%;">
				<view style="display: flex;">
					<view style="width: 33%;">
						<button class="anniu" @click="close($event)" style="background-color: red;">{{$t('bluetooth.close')}}</button>
					</view>
					<view style="width: 33%;">
						<view class="anniu" @click="blueTooth()" style="background-color: red;">{{bluetooth==1 ? turnOnBluetooth : turnOffBluetooth}}</view>
					</view>
					<view style="width: 33%;">
						<view class="anniu" :style="{'background-color':backgroundColor}" @click="openBluetoothAdapter()">{{$t('bluetooth.search-bluetooth')}}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				bluetooth:1,//1：打开蓝牙  2：关闭蓝牙
				turnOnBluetooth:this.$t('bluetooth.turn-on-bluetooth'), //打开蓝牙
				turnOffBluetooth:this.$t('bluetooth.turn-off-bluetooth'),//关闭蓝牙
				backgroundColor:"#cecece", //搜索蓝牙按钮背景颜色
				
				title: 'Hello',
				searchLoadingTxt:'',
				isBlueOk:false,
				bluetimestoper:null,
				startchecktimer:null,
				timeoutOfBlueScanFailure30s:300000,
				baseList:[],
				bluetoothIndex:[],
				targetDeviceName:'',
				_deviceId:'',			//蓝牙deviceId
				pairedList:[],			//已配对蓝牙
				pairedHeight:0,			//已配对蓝牙显示高度
				unpairedList:[],		//未配对蓝牙
				unpairedHeight:0,		//未配对蓝牙显示高度
				bluetoothSocket:{}
			}
		},
		onLoad() {
			//判断手机蓝牙打开状态
			this.bluetoothStatus();
			//定时器判断手机蓝牙状态
			
			//获取界面信息
			// uni.getSystemInfo({
			// 	success(res) {
			// 		//获取屏幕高度
			// 		const windowHeight = res.windowHeight;
			// 		const windowWidth = res.windowWidth;
			// 		console.log("屏幕高度："+windowHeight+" 屏幕宽度："+windowWidth);
			// 		this.pairedHeight = (windowHeight*0.3).toFixed(0);
			// 		this.nopairedHeight = (windowHeight*0.6).toFixed(0);
			// 		console.log("已配对："+this.pairedHeight+" 未配对："+this.nopairedHeight)
			// 	}
			// })
		},
		methods: {
			backTo(){
				uni.navigateBack({})
			},
			//关闭页面
			close(e){
				uni.navigateTo({
					url:'/pages/index/index'
				})
			},
			
			//删除已配对设备
			removePaire(index){
				var that = this;
				uni.showModal({
					title: that.$t("bluetooth.alertTitle") , //'提示',
					content: that.$t("bluetooth.delTip"), //'是否删除设备',
					showCancel: true,
					cancelText:  that.$t("bluetooth.cancel"),//'取消',
					confirmText: that.$t("bluetooth.confirm"), //'确定',
					success(res) {
						// 确定删除设备
						if (res.confirm) {
							
							//printerSelected = ;
							var address = uni.getStorageSync("printerSelected").address;
												
							if(that.pairedList[index].address == address 
								&& that.pairedList[index].isSelected==1){
								that.pairedList[0].isSelected=1;
								uni.setStorageSync("printerSelected",that.pairedList[0]);
							}
							that.pairedList.splice(index,1);
						} else {
							console.log("取消删除设备");
						}
					}
				})
				return false;
			},
			
			//设置已选中蓝牙
			setSelectedPaired(paired){
				var that = this;
				for(var i=0;i<that.pairedList.length;i++){
					if(that.pairedList[i].address == paired.address){
						that.pairedList[i].isSelected = 1;
					}else{
						that.pairedList[i].isSelected = 0;
					}
				}
				uni.showToast({
					title: that.$t("bluetooth.hasSelect"),//"已选中",
					icon:"success"
				})
				paired.isSelected = 1;
				//存储已选择打印机
				uni.setStorageSync("printerSelected",paired);
			},
			
			//判断蓝牙打开状态
			bluetoothStatus(){
				const BluetoothAdapter = plus.android.importClass('android.bluetooth.BluetoothAdapter'); // 引入Java 蓝牙类
				const blueadapter = BluetoothAdapter.getDefaultAdapter(); //拿到默认蓝牙适配器方法
				if (blueadapter) {
					// 判断蓝牙是否开启
					if (blueadapter.isEnabled()) {
						// 开启
						this.bluetooth = 0;
						this.backgroundColor = "#8A2BCF";
						//取内存里面已配对的蓝牙
						var printed = uni.getStorageSync("printerSelected");
						if (printed==null || printed=="" || printed==undefined){
							this.pairedList.push({
								name: 'Q1',
								address: '00:AA:11:BB:22:CC',
								isSelected:'1'
							 });
						}else{
							this.pairedList.push({
								name: printed.name,
								address: printed.address,
								isSelected:'1'
							 });
						}
					} else {
						// 关闭
						this.bluetooth = 1;
						this.backgroundColor = "#cecece";
						this.pairedList = [];
					}
					this.unpairedList = [];
				}
			},
			
			//打开蓝牙
			openBluetooth(){
				var that = this;
				// 弹出提示框
				uni.showModal({
					title:  that.$t("bluetooth.alertTitle"),//'提示',
					content: that.$t("bluetooth.openTip"), //'蓝牙尚未打开，是否打开蓝牙',
					showCancel: true,
					cancelText:  that.$t("bluetooth.cancel"),//'取消',
					confirmText: that.$t("bluetooth.confirm"), //'确定',
					success(res) {
						// 点击确定后通过系统打开蓝牙
						if (res.confirm) {
							const BluetoothAdapter = plus.android.importClass('android.bluetooth.BluetoothAdapter'); // 引入Java 蓝牙类
							const blueadapter = BluetoothAdapter.getDefaultAdapter();
							if (blueadapter != null) {
								that.bluetooth = 0;
								that.backgroundColor = "#8A2BCF";
								return blueadapter.enable();
							}
						} else {
							// 点击取消什么也不做
							console.log("取消打开蓝牙");
						}
					}
				})
			},
			
			//关闭蓝牙
			closeBluetooth(){
				var that = this;
				// 弹出提示框
				uni.showModal({
					title: that.$t("bluetooth.alertTitle"), //'提示',
					content: that.$t("bluetooth.closeTip"), //'蓝牙已打开，是否关闭蓝牙',
					showCancel: true,
					cancelText: that.$t("bluetooth.cancel"), //'取消',
					confirmText: that.$t("bluetooth.confirm"), //'确定',
					success(res) {
						// 点击确定后通过系统打开蓝牙
						if (res.confirm) {
							const BluetoothAdapter = plus.android.importClass('android.bluetooth.BluetoothAdapter'); // 引入Java 蓝牙类
							const blueadapter = BluetoothAdapter.getDefaultAdapter();
							if (blueadapter != null) {
								that.bluetooth = 1;
								that.backgroundColor = "#cecece";
								that.pairedList = [];
								that.unpairedList = [];
								return blueadapter.disable();
							}
						} else {
							// 点击取消什么也不做
							console.log("取消关闭蓝牙");
						}
					}
				})
			},
			
			//点击打开/关闭蓝牙按钮
			blueTooth(){
				if(this.bluetooth == 1){
					console.log("打开蓝牙");
					this.openBluetooth();
				}else{
					console.log("关闭蓝牙");
					this.closeBluetooth();
				}
			},
			
			//初始化蓝牙模块
			openBluetoothAdapter() {
				//未打开蓝牙点击搜索蓝牙提示弹窗
				if(this.bluetooth == 1){
					uni.showToast({
						title: that.$t("bluetooth.openFirst"),//"请先打开蓝牙",
						icon:"error"
					})
					return;
				}
				let system = uni.getSystemInfoSync(); // 获取系统信息
				if (system.platform === 'android') { // 判断平台
				  var that = this;
				  var context = plus.android.importClass("android.content.Context");
				  var locationManager = plus.android.importClass("android.location.LocationManager");
				  var main = plus.android.runtimeMainActivity();
				  var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
				  // 定位检测
				  if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
					  uni.showModal({
						title: that.$t("bluetooth.alertTitle"), //'提示',
						content: that.$t("bluetooth.gpsOpenTip"), //'请打开定位服务功能',
						showCancel: false, // 不显示取消按钮
						success() {
						  if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
							var Intent = plus.android.importClass('android.content.Intent');
							var Settings = plus.android.importClass('android.provider.Settings');
							var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
							main.startActivity(intent); // 打开系统设置GPS服务页面
						  } else {
							console.log('GPS功能已开启');
						}
					  }
				   });
				  return false
				  } else {
					console.log('GPS功能已开启');
					that.searchDevices()
					return true
				  }
				}
			},
			
			//搜索蓝牙
			searchDevices(){
				var that = this;
				that.unpairedList = [];  //未配对
				that.pairedList = []; // 已配对
				//取内存里面已配对的蓝牙
				var printed = uni.getStorageSync("printerSelected");
				if (printed==null || printed=="" || printed==undefined){
					that.pairedList.push({
						name: 'Q1',
						address: '00:AA:11:BB:22:CC',
						isSelected:'1'
					 });
				}else{
					that.pairedList.push({
						name: printed.name,
						address: printed.address,
						isSelected:'1'
					 });
				}
				// that.pairedList.push({
				// 	name: 'Q1',address: '00:AA:11:BB:22:CC',isSelected:'1'
				// });
				 //存储已选择打印机
				uni.setStorageSync("printerSelected",that.pairedList[0]);
				
				that.main = plus.android.runtimeMainActivity();
				var IntentFilter = plus.android.importClass('android.content.IntentFilter');
				var BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
				var BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice");
				var BAdapter = BluetoothAdapter.getDefaultAdapter();
				uni.showLoading({
				  title: that.$t("bluetooth.startSearch"), //'开始搜索设备'
				})
				
				var name = BAdapter.getName();
				var address = BAdapter.getAddress();
				console.log("本机蓝牙名称："+name+" 本机蓝牙地址："+address);
				
				var filter = new IntentFilter();
				var bdevice = new BluetoothDevice();
				BAdapter.startDiscovery(); //开启搜索  
				var receiver;
				receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {onReceive: function(context, intent) { //实现onReceiver回调函数  
					plus.android.importClass(intent); //通过intent实例引入intent类，方便以后的‘.’操作
					if (intent.getAction() == "android.bluetooth.adapter.action.DISCOVERY_FINISHED") {
						that.main.unregisterReceiver(receiver); //取消监听
						//去重
						for (let i = 0; i < that.unpairedList.length; i++) {
							for (let j = i+1; j < that.unpairedList.length; j++) {
								if(that.unpairedList[i] == that.unpairedList[j]){
									that.unpairedList.splice(j,1);//去重
								}
							}
						}
						console.log("搜索结束")
						console.log(that.unpairedList)
						console.log(that.pairedList)
						//把已配对的蓝牙存内存
						uni.setStorageSync("pairedList",that.pairedList);
						uni.hideLoading()
					} else {
						if (intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE).getBondState() === 10) {
							that.unpairedList.push({
								name: intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE).getName(),
								address: intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE).getAddress()
							})
						}else if (intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE).getBondState() === 12) {
							if(that.pairedList[0].address != intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE).getAddress()){
								that.pairedList.push({
									name: intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE).getName(),
									address: intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE).getAddress(),
									isSelected:'0'
								})
							}
						}
					}
				}});
				filter.addAction(bdevice.ACTION_FOUND);
				filter.addAction(BAdapter.ACTION_DISCOVERY_STARTED);
				filter.addAction(BAdapter.ACTION_DISCOVERY_FINISHED);
				filter.addAction(BAdapter.ACTION_STATE_CHANGED);
				that.main.registerReceiver(receiver, filter); //注册监听
			},
			
			//连接打印机
			createBLEConnection(mac_address){
				// mac_address为获取到蓝牙数据中的address字段
				if (!mac_address) {
				   mui.toast(this.$t("bluetooth.chooseTip")); //'请选择蓝牙打印机'
				   return;
				}
				
				this.main = plus.android.runtimeMainActivity();
				var BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
				var BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice");
				// console.log(BluetoothAdapter)
				var UUID = plus.android.importClass("java.util.UUID");
				// var uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
				var uuid = UUID.fromString("00001105-0000-1000-8000-00805f9B34FB");
				var BAdapter = BluetoothAdapter.getDefaultAdapter();
				// console.log(BAdapter)
				var device = BAdapter.getRemoteDevice(mac_address);
				plus.android.importClass(device);
				var bdevice = new BluetoothDevice();
				var that = this;
				//判断是否配对  
				if (device.getBondState() == bdevice.BOND_NONE) {  
					console.log("未配对蓝牙设备：" + device.getName() + '    ' + device.getAddress());  
					//参数如果跟取得的mac地址一样就配对  
					if (mac_address == device.getAddress()) {  
						// console.log("111")
						if (device.createBond()) { //配对命令.createBond() 
							console.log("配对成功")
							var cha = setInterval(function(){
								if (device.getBondState() == bdevice.BOND_BONDED) {  
									clearInterval(cha);
									//删除未配对蓝牙，添加到已配对
									for(var i=0;i<that.unpairedList.length;i++){
										if(that.unpairedList[i].address == mac_address){
											that.pairedList.push(that.unpairedList[i]);
											that.unpairedList.splice(i,1);
											break;
										}
									}
								}
							},1000)
						}
					}
				}
				// this.print(mac_address);
				// this.bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);
				// plus.android.importClass(this.bluetoothSocket);
				//    if (!this.bluetoothSocket.isConnected()) {
				// 		  uni.showLoading({
				// 			title: '检测到设备未连接，尝试连接....'
				// 		  })
				// 		  this.bluetoothSocket.connect();
				// 	}
				// uni.hideLoading()
				// console.log('设备已连接')
				// console.log(this.bluetoothSocket.isConnected())
				
				// if (this.bluetoothSocket.isConnected()) {
				// 	console.log("11111")
				//    uni.showLoading({
				//      title: '打印中，请稍后！'
				//    })
				//    var outputStream = this.bluetoothSocket.getOutputStream();
				//    plus.android.importClass(outputStream);
				//    var string = "! 0 200 200 418 1\r\n" +
				//             "LABEL\r\n" +
				//             "PW 575\r\n" +
				//             "TONE 0\r\n" +
				//             "SPEED 2\r\n" +
				//             "ON-FEED IGNORE\r\n" +
				//             "NO-PACE\r\n" +
				//             "BAR-SENSE\r\n" +
				//             "B QR 130 5 M 2 U 5\r\n" +
				//             "MA,e9b98ae6a1a5e4bb99c2b7e7baa4e4ba91e5bc84e5b7a7e5ae8be7a7a6e8a782e7baa4e4ba91e5bc84e5b7a7efbc8ce9a39ee6989fe4bca0e681a8efbc8ce993b6e6b189e8bfa2e8bfa2e69a97e5baa6e38082e98791e9a38ee78e89e99cb2e4b880e79bb8e980a2efbc8ce4bebfe8839ce58db4e4babae997b4e697a0e695b0e38082e69f94e68385e4bcbce6b0b4efbc8ce4bdb3e69c9fe5a682e6a2a6efbc8ce5bf8de9a1bee9b98ae6a1a5e5bd92e8b7afe38082e4b8a4e68385e88ba5e698afe4b985e995bfe697b6efbc8ce58f88e5b282e59ca8e69c9de69c9de69aaee69aaee38082\r\n" +
				//             "ENDQR\r\n" +
				//             "FORM\r\n" +
				//             "PRINT\r\n"
				//           var bytes = plus.android.invoke(string, 'getBytes', 'gbk');
				//           outputStream.write(bytes);
				//           outputStream.flush();
				//           device = null //这里关键
				//           uni.hideLoading()
				//           // bluetoothSocket.close(); //必须关闭蓝牙连接否则意外断开的话打印错误  
				// }
			},
			
			//打印
			print(mac_address) {  
			
			    if (!mac_address) {  
			        mui.toast(this.$t("bluetooth.chooseTip"));   //,'请选择蓝牙打印机'
			        return;  
			    }  
			
			    var main = plus.android.runtimeMainActivity();  
			    var BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");  
			    var UUID = plus.android.importClass("java.util.UUID");  
			    // var uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB"); 
				var uuid = UUID.fromString("00001105-0000-1000-8000-00805f9B34FB");
			    var BAdapter = BluetoothAdapter.getDefaultAdapter();  
			    var device = BAdapter.getRemoteDevice(mac_address);  
			    plus.android.importClass(device);  
			    var bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);  
			    plus.android.importClass(bluetoothSocket);  
			
			    if (!bluetoothSocket.isConnected()) {  
			        console.log('检测到设备未连接，尝试连接....');  
			        bluetoothSocket.connect();  
			    }  
			    // console.log('设备已连接');  
				setTimeout(function(){
					if (bluetoothSocket.isConnected()) {
						console.log("111111111111111111")
					    var outputStream = bluetoothSocket.getOutputStream();  
					    plus.android.importClass(outputStream);  
					    var string = "打印测试\r\n";  
					    var bytes = plus.android.invoke(string, 'getBytes', 'gbk');  
					    outputStream.write(bytes);  
					    outputStream.flush();  
					    device = null //这里关键  
					    bluetoothSocket.close(); //必须关闭蓝牙连接否则意外断开的话打印错误  
					}else{
						console.log("22222222222222222")
					}
				},30000)
			},
		},
	}
</script>

<style>
	.yipeidui,.weipeidui{
		overflow: auto;
	}
	.anniu{
		width: 100px;
		height: 40px;
		line-height: 40px;
		border-radius: 10rpx;
		text-align: center;
		background-color: #8A2BCF;
		color: white;
		font-weight: bold;
		margin-left: 15px;
	}
	.anniu:active{
		background-color: #ebeb75 !important;
	}
	.lanya{
		padding: 16px 0 16px 15px;
		font-size: 18px;
		color: #5b5a5a;
	}
	.lanya:active{
		background-color: #dfdfdf;
	}
</style>
