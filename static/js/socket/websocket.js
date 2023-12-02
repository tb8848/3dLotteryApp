// import socket from 'plus-websocket'
// class WebSocketPolyfill {
//   constructor(url) {

//     // 创建连接
//     socket.connectSocket({
//       url: url , //这是域名
//       success:function(res){
//           console.log('res-创建连接-1-',res)
//       }
//     });

//     // 连接开启
//     socket.onSocketOpen((res) => {
//       this.onopen(res);
//     });

//     // 连接关闭
//     socket.onSocketClose((res) => {
// 		console.log(">>>>>onSocketClose",res);
//       this.onclose(res);
//     });

//     // 连接异常
//     socket.onSocketError((res) => {
//       this.onerror(res);
//     });

//     // 接收消息
//     socket.onSocketMessage((res) => {
//       this.onmessage(res);
//     });
//   }

//   /**
//    * 连接开启
//    */
//   onopen(res) {}

//   /**
//    * 连接关闭
//    */
//   onclose(res) {}

//   /**
//    * 连接异常
//    */
//   onerror(res) {}

//   /**
//    * 接收消息
//    */
//   onmessage(res) {}

//   /**
//    * 发送消息
//    */
//   send(data) {
//     socket.sendSocketMessage({
//       data: data,
//     });
//   }

//   /**
//    * 关闭连接
//    */
//   close() {
// 	console.log("=========关闭ws")
//     socket.closeSocket();
	
//   }
// }

// export default WebSocketPolyfill;