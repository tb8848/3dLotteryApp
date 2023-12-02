/*
	content:打印内容
*/
/**

* 打印纸一行最大的字节

*/

const LINE_BYTE_SIZE = 32;

/**

* 打印三列时，中间一列的中心线距离打印纸左侧的距离

*/

const LEFT_LENGTH = 10;

const MID_LENGTH = 10;

/**

* 打印三列时，中间一列的中心线距离打印纸右侧的距离

*/

const RIGHT_LENGTH = 10;

const MAX_LINE_LENGTH = 30

/**

* 打印三列时，第一列汉字最多显示几个文字

*/

const LEFT_TEXT_MAX_LENGTH = 6;

function getStrLen(str,lang){
	var realLength = 0, len = str.length, charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
		if(lang=='lao'){
			realLength += 1;
		}else{
			if (charCode >= 0 && charCode <= 128)
	          realLength += 1;
	        else
	          realLength += 2;
		}			       
      }
      return realLength;
}


/**
* 打印三列
*
* @param leftText 左侧文字
* @param middleText 中间文字
* @param rightText 右侧文字
* @return
*/

export function printThreeData(leftText, middleText, rightText,lang) {
	var sb = "";
	// 左边最多显示 LEFT_TEXT_MAX_LENGTH 个汉字 + 两个点
	if (leftText.length > LEFT_TEXT_MAX_LENGTH) {
		leftText = leftText.substr(0, LEFT_TEXT_MAX_LENGTH);
	}
	const leftTextLength = getStrLen(leftText,lang);
	const middleTextLength = getStrLen(middleText,lang);
	const rightTextLength = getStrLen(rightText,lang);
	sb = sb + leftText;
	const leftSpace = LEFT_LENGTH - leftTextLength;
	for (var i = 0; i < leftSpace; i++) {
		sb+=" ";
	}
	sb+=middleText;
	const midSpace = MID_LENGTH-middleTextLength;
	for (var i = 0; i < midSpace; i++) {
		sb+=" ";
	}
	const rightSpace = RIGHT_LENGTH - rightTextLength;
	for (var i = 0; i < rightSpace; i++) {
		sb+=" ";
	}
	sb+=rightText
	// const halfMiddle = parseInt(middleTextLength/2);
	// // 计算左侧文字和中间文字的空格长度
	// const marginBetweenLeftAndMiddle = LEFT_LENGTH - leftTextLength - middleTextLength/2;
	// for (var i = 0; i < marginBetweenLeftAndMiddle; i++) {
	// 	sb+=" ";
	// }
	// sb+=middleText;
	// // 计算右侧文字和中间文字的空格长度
	// const marginBetweenMiddleAndRight = RIGHT_LENGTH - (middleTextLength-halfMiddle) - rightTextLength;
	// for (var i = 0; i < marginBetweenMiddleAndRight; i++) {
	// 	sb+=" ";
	// }
	// sb = sb.substr(0,sb.length - 1);
	// sb+=rightText;
	return sb;
}


export function printOneData(leftText,lang) {
	var sb = "";
	// 左边最多显示 LEFT_TEXT_MAX_LENGTH 个汉字 + 两个点
	if (leftText.length >MAX_LINE_LENGTH) {
		leftText = leftText.substr(0, MAX_LINE_LENGTH);
	}
	const leftTextLength = getStrLen(leftText,lang);
	sb = sb + leftText;
	const leftSpace = MAX_LINE_LENGTH - leftTextLength;
	for (var i = 0; i < leftSpace; i++) {
		sb+=" ";
	}
	return sb;
}