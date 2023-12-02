/*
	content:打印内容
*/
export function print(content) {
	//console.log(content);
	var bytes = plus.android.invoke(content, 'getBytes', 'UTF-8'); 
	//console.log("==============bytes=",bytes);
	//判断蓝牙打开状态
	const BluetoothAdapter = plus.android.importClass('android.bluetooth.BluetoothAdapter'); // 引入Java 蓝牙类
	const blueadapter = BluetoothAdapter.getDefaultAdapter(); //拿到默认蓝牙适配器方法
	if (blueadapter) {
		var bluetoothOk = false;
		//没有打开蓝牙
		if (!blueadapter.isEnabled()) {
			// 弹出提示框
			// uni.showModal({
			// 	title: '提示',
			// 	content: '蓝牙尚未打开，是否打开蓝牙',
			// 	showCancel: true,
			// 	cancelText: '取消',
			// 	confirmText: '确定',
			// 	success(res) {
			// 		if (res.confirm) {
			// 			// 点击确定后通过系统打开蓝牙
			// 			blueadapter.enable();
			// 			bluetoothOk = true;
			// 		} else {
			// 			// 点击取消什么也不做
			// 			console.log("取消打开蓝牙");
			// 		}
			// 	}
			// })
		}else{
			bluetoothOk = true;
		}
		
		// console.log("打开蓝牙了")
		
		//打开蓝牙后取存储中选中的蓝牙
		if(bluetoothOk){
			var paired = uni.getStorageSync("printerSelected");
			
			if(paired!=null && paired!=""){
				console.log("paired==",JSON.stringify(paired));
				console.log("获取到内存里的蓝牙")								
				var main = plus.android.runtimeMainActivity();
				var UUID = plus.android.importClass("java.util.UUID");  
				var uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
				var device = blueadapter.getRemoteDevice(paired.address); 
				plus.android.importClass(device);  
				var bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);  
				plus.android.importClass(bluetoothSocket);
				if (!bluetoothSocket.isConnected()) {
				    console.log('检测到设备未连接，尝试连接....');  
				    bluetoothSocket.connect();  
				}  
				console.log('设备已连接');  
				// setTimeout(function(){
					if (bluetoothSocket.isConnected()) {
						console.log("111111111111111111");
					    var outputStream = bluetoothSocket.getOutputStream();
					    plus.android.importClass(outputStream);
					    var string = content;
					    var bytes = plus.android.invoke(string, 'getBytes', 'UTF-8');  
					    outputStream.write(bytes);  
					    outputStream.flush();  
					    device = null //这里关键  
					    bluetoothSocket.close(); //必须关闭蓝牙连接否则意外断开的话打印错误  
						
						return {"code":0,"msg":"打印成功","data":""}
					}else{
						return {"code":-1,"msg":"打印失败","data":""}
					}
				// },300)
			}else{
				return {"code":1,"msg":"请先点击更多设置蓝牙","data":""}
				// uni.navigateTo({
				// 	url:"/pages/index/more/bluetooth"
				// })
			}
		}else{
			return {"code":2,"msg":"请先打开蓝牙","data":""}
		}
	}
  
}



export function printBytes(contentBytes) {
	//判断蓝牙打开状态
	const BluetoothAdapter = plus.android.importClass('android.bluetooth.BluetoothAdapter'); // 引入Java 蓝牙类
	const blueadapter = BluetoothAdapter.getDefaultAdapter(); //拿到默认蓝牙适配器方法
	if (blueadapter) {
		var bluetoothOk = false;
		if (!blueadapter.isEnabled()) {
			
		}else{
			bluetoothOk = true;
		}
		
		//打开蓝牙后取存储中选中的蓝牙
		if(bluetoothOk){
			var paired = uni.getStorageSync("printerSelected");
			
			if(paired!=null && paired!=""){
				console.log("paired==",JSON.stringify(paired));
				console.log("获取到内存里的蓝牙")								
				var main = plus.android.runtimeMainActivity();
				var UUID = plus.android.importClass("java.util.UUID");  
				var uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
				var device = blueadapter.getRemoteDevice(paired.address); 
				plus.android.importClass(device);  
				var bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);  
				plus.android.importClass(bluetoothSocket);
				if (!bluetoothSocket.isConnected()) {
				    console.log('检测到设备未连接，尝试连接....');  
				    bluetoothSocket.connect();  
				}  
				console.log('设备已连接');  
				// setTimeout(function(){
					if (bluetoothSocket.isConnected()) {
						console.log("111111111111111111");
					    var outputStream = bluetoothSocket.getOutputStream();
					    plus.android.importClass(outputStream);
					    //var string = content;
					    //var bytes = plus.android.invoke(string, 'getBytes', 'UTF-8');  
					    outputStream.write(contentBytes);  
					    outputStream.flush();  
					    device = null //这里关键  
					    bluetoothSocket.close(); //必须关闭蓝牙连接否则意外断开的话打印错误  
						
						return {"code":0,"msg":"打印成功","data":""}
					}else{
						return {"code":-1,"msg":"打印失败","data":""}
					}
				// },300)
			}else{
				return {"code":1,"msg":"请先点击更多设置蓝牙","data":""}
				// return {"code":500,"msg":"请先点击更多设置蓝牙","data":""}
				// uni.navigateTo({
				// 	url:"/pages/index/more/bluetooth"
				// })
			}
		}else{
			return {"code":2,"msg":"请先打开蓝牙","data":""}
			//return {"code":500,"msg":"请先打开蓝牙","data":""}
		}
	}
  
}




export function printTicket(content,barData) {
	// console.log(content,barData);
	//判断蓝牙打开状态
	const BluetoothAdapter = plus.android.importClass('android.bluetooth.BluetoothAdapter'); // 引入Java 蓝牙类
	const blueadapter = BluetoothAdapter.getDefaultAdapter(); //拿到默认蓝牙适配器方法
	if (blueadapter) {
		var bluetoothOk = false;
		if (!blueadapter.isEnabled()) {
			
		}else{
			bluetoothOk = true;
		}
		
		//打开蓝牙后取存储中选中的蓝牙
		if(bluetoothOk){
			
			//已选中打印机
			var paired = uni.getStorageSync("printerSelected");
			
			if(paired!=null && paired!=""){
				console.log("paired==",JSON.stringify(paired));
				console.log("获取到内存里的蓝牙")								
				var main = plus.android.runtimeMainActivity();
				var UUID = plus.android.importClass("java.util.UUID");  
				var uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
				var device = blueadapter.getRemoteDevice(paired.address); 
				plus.android.importClass(device);  
				var bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);  
				plus.android.importClass(bluetoothSocket);
				if (!bluetoothSocket.isConnected()) {
				    console.log('检测到设备未连接，尝试连接....');  
				    bluetoothSocket.connect();  
				}  
				console.log('设备已连接');  
				// setTimeout(function(){
					if (bluetoothSocket.isConnected()) {
					    var outputStream = bluetoothSocket.getOutputStream();
					    plus.android.importClass(outputStream);
					    var string = content;
						
						var bytes = "";
						var endLine = "";
						var lang = uni.getStorageSync("lang");
						var bold = [0x1b, 0x45, 0x01];//字体加粗
						var font = [0x1b, 0x21, 0x10];//字体放大倍数
						if(paired.name=="IposPrinter"){//Q1=IposPrinter，v2=InnerPrinter
							bytes = plus.android.invoke(string, 'getBytes', 'UTF-8');
							endLine = plus.android.invoke("--------------------------------\r\n", 'getBytes', 'UTF-8');
						}else{
							bold = [0x1b, 0x45, 0x00];//取消字体加粗
							font = [0x1d, 0x21, 0x00];//取消字体放大倍数
							if (lang == "tai"){
								bytes = plus.android.invoke(string, 'getBytes', 'UTF-8');
								endLine = plus.android.invoke("--------------------------------\r\n", 'getBytes', 'UTF-8');
							}else{
								bytes = plus.android.invoke(string, 'getBytes', 'gbk');
								endLine = plus.android.invoke("--------------------------------\r\n", 'getBytes', 'gbk');
							}
						}
						
						// console.log("条形码："+barData);
						var emptyLine = "                                 \n"; //31个空格
						// barData.forEach((item,idx)=>{
						// 	bytes.push(item);
						// })
						// outputStream.write([0x1b, 0x33]);
						// outputStream.write([0]);
						outputStream.write(font);
						outputStream.write(bold);
						outputStream.write(bytes); 
						outputStream.write(barData); 
						//outputStream.write(endLine); 
						outputStream.write(emptyLine+emptyLine+emptyLine); 
						outputStream.flush();  
						device = null //这里关键  
						bluetoothSocket.close(); //必须关闭蓝牙连接否则意外断开的话打印错误  
						
						return {"code":0,"msg":"打印成功","data":""}
					}else{
						return {"code":-1,"msg":"打印失败","data":""}
					}
				// },300)
			}else{
				return {"code":1,"msg":"请先点击更多设置蓝牙","data":""}
				// uni.navigateTo({
				// 	url:"/pages/index/more/bluetooth"
				// })
			}
		}else{
			return {"code":2,"msg":"请先打开蓝牙","data":""}
		}
	}
  
}
