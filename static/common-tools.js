
export function DeleteTheSameChar(str) {
   var newStr = "";
   for (var i = 0; i<str.length; i++) {
     if (newStr.indexOf(str.charAt(i)) == -1) {
       newStr += str.charAt(i);
     }
   }
   console.log("newStr="+newStr);
   return newStr;
}


export function create3DCodes() {
    var allCodesArr = [];
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            for(var k=0;k<10;k++){
                var code = i+""+j+""+k;
                allCodesArr.push({
                    code:code,
                    sum:(i+j+k),
                    bai:i,
                    shi:j,
                    ge:k
                });
            }
        }
    }
    return allCodesArr;
}

//组三号码
export function z3Codes(nums) { 
	var codeList = []
	var arr = nums.split("");
	arr.sort();
	for(var i=0;i<arr.length-1;i++){
		for(var j=i+1;j<arr.length;j++){
			var code1 = arr[i]+""+arr[i]+""+arr[j];
			var code2 = arr[i]+""+arr[j]+""+arr[j];
			codeList.push(code1);
			codeList.push(code2);
		}
	}
	return codeList;
}



//组三胆拖
export function z3DtCode(dm,tm) { //胆码
	console.log("===============组三胆码=="+dm,tm);
	var codeList = []
	if(dm.length>0){
		var arr = tm.split("");
		for(var i=0;i<arr.length;i++){
			var carr = [dm,dm,arr[i]];
			carr.sort();
			var code1 = carr.join("");
			if(!codeList.includes(code1)){
				codeList.push(code1);
			}				
			carr = [dm,arr[i],arr[i]];
			carr.sort();
			code1 = carr.join("");
			if(!codeList.includes(code1)){
				codeList.push(code1);
			}	
		}
	}else{
		var arr = tm.split("");
		for(var i=0;i<arr.length-1;i++){
			for(var j=i+1;j<arr.length;j++){
				var carr = [arr[i],arr[i],arr[j]];
				carr.sort();
				var code1 = carr.join("");
				if(!codeList.includes(code1)){
					codeList.push(code1);
				}					
				carr = [arr[i],arr[j],arr[j]];
				carr.sort();
				code1 = carr.join("");
				if(!codeList.includes(code1)){
					codeList.push(code1);
				}	
			}
		}
	}
	return codeList;
}


//组六胆拖
export function z6DtCode(dm,tm) { //胆码
	var codeList = []
	if(dm.length==1){
		var arr = tm.split("");
		for(var i=0;i<arr.length-1;i++){
			for(var j=i+1;j<arr.length;j++) {
				var carr = [dm,arr[i],arr[j]];
				carr.sort();
				var code1 = carr.join("");
				if(!codeList.includes(code1)){
					codeList.push(code1);
				}			
			}
		}
	}else if(dm.length==2){
		var dmArr = dm.split("");
		var arr = tm.split("");
		for(var i=0;i<arr.length;i++){
			var carr = [dmArr[0],dmArr[1],arr[i]];
			carr.sort();
			var code1 = carr.join("");
			if(!codeList.includes(code1)){
				codeList.push(code1);
			}
		}
	}else{
		codeList = z6Codes(tm)
	}
	return codeList;
}


//组六号码
export function z6Codes(nums) {
	console.log("===============组6号码=="+nums);
	var codeList = []
	var arr = nums.split("");
	arr.sort();
	for(var i=0;i<arr.length-2;i++){
		for(var j=i+1;j<arr.length-1;j++){
			for(var k=j+1;k<arr.length;k++) {
				var code1 = arr[i] + "" + arr[j] + "" + arr[k];
				codeList.push(code1);
			}
		}
	}
	return codeList;
}


//生成2d号码
export function create2DCodes(bai,shi,ge) {
	var codeArr = [];
	var baiArr = bai.split("");
	var shiArr = shi.split("");
	var geArr = ge.split("");
	if(baiArr.length>0 && shiArr.length>0 && geArr.length>0){
		for(var i=0;i<baiArr.length;i++){
			for(var j=0;j<shiArr.length;j++){
				for(var k=0;k<geArr.length;k++) {
					var code1 = baiArr[i] + shiArr[j]+"X";
					var code2 = baiArr[i] + "X"+geArr[k];
					var code3 = "X" + shiArr[j]+geArr[k];
					if(!codeArr.includes(code1)){
						codeArr.push(code1);
					}
					if(!codeArr.includes(code2)){
						codeArr.push(code2);
					}
					if(!codeArr.includes(code3)){
						codeArr.push(code3);
					}
				}
			}
		}
	}else if(baiArr.length>0 && shiArr.length>0){
		for(var i=0;i<baiArr.length;i++){
			for(var j=0;j<shiArr.length;j++){
				var code = baiArr[i]+shiArr[j]+"X";
				codeArr.push(code);
			}
		}
	}else if(baiArr.length>0 && geArr.length>0){
		for(var i=0;i<baiArr.length;i++){
			for(var j=0;j<geArr.length;j++){
				var code = baiArr[i]+"X"+geArr[j];
				codeArr.push(code);
			}
		}
	}else if(shiArr.length>0 && geArr.length>0){
		for(var i=0;i<shiArr.length;i++){
			for(var j=0;j<geArr.length;j++){
				var code = "X"+shiArr[i]+geArr[j];
				codeArr.push(code);
			}
		}
	}
	console.log("==============codeArr==",codeArr);
	return codeArr;


}


    /**
     *
     * 猜2D号码，
     * 参考二字现
     * @param bai
     * @returns {[]}
     */
export function createC2DCodes(bai) {
	var codeArr = [];
	var baiArr = bai.split("");
	if(baiArr.length>0){
		for(var i=0;i<baiArr.length;i++){
			for(var j=0;j<baiArr.length;j++){
				var arr = [baiArr[i],baiArr[j]];
				arr.sort(function (n1,n2) {
					return n1-n2;
				})
				var code = arr.join("");
				if(!codeArr.includes(code)){
					codeArr.push(code);
				}
			}
		}
	}
	return codeArr;

}


export function createB3Code(bai,shi,ge){
	var codeList = [];
	var baiArr = bai.split("");
	var shiArr = shi.split("");
	var geArr = ge.split("");
	if(baiArr.length>0 && shiArr.length>0 && geArr.length>0){
		baiArr.forEach((bv,i1)=>{
			shiArr.forEach((sv,i2)=>{
				geArr.forEach((gv,i3)=>{
					if(bv==sv || sv==gv || bv==gv){
						codeList.push(bv+''+sv+''+gv)
					}
				})
			})
		})
	}
	return codeList;
}

export function createB6Code(bai,shi,ge){
	var codeList = [];
	var baiArr = bai.split("");
	var shiArr = shi.split("");
	var geArr = ge.split("");
	if(baiArr.length>0 && shiArr.length>0 && geArr.length>0){
		baiArr.forEach((bv,i1)=>{
			shiArr.forEach((sv,i2)=>{
				geArr.forEach((gv,i3)=>{
					if(bv!=sv && sv!=gv){
						codeList.push(bv+''+sv+''+gv)
					}
				})
			})
		})
	}
	return codeList;
}



/**
 * 将阿拉伯数字转换成中文数字
 * @param dig
 * @returns {boolean}
 */
export function changeDigitToChinese(dig,unit) {
    switch(dig){
        case 1:
        case "1":
            return "一"+unit;
        case 2:
        case "2":
            return "两"+unit;
        case 3:
        case "3":
            return "三"+unit;
        case 4:
        case "4":
            return "四"+unit;
        case 5:
        case "5":
            return "五"+unit;
        case 6:
        case "6":
            return "六"+unit;
        case 7:
        case "7":
            return "七"+unit;
        case 8:
        case "8":
            return "八"+unit;
        case 9:
        case "9":
            return "九"+unit;
        case 0:
        case "0":
            return "零"+unit;
        case 10:
        case "10":
            return "全包";
        default:
            return "";
    }
    return "";
}


//组三双飞
export function z3SFCodeBy(nums) {
    var codeList = []
    var arr = nums.split("");
    arr.sort();
	for(var i=0;i<arr.length;i++){
		var code0 = arr[i]+""+arr[i]+""+arr[i];
		if(!codeList.includes(code0)){
			codeList.push(code0);
		}
	}
	for(var i=0;i<arr.length-1;i++){
		for(var j=i+1;j<arr.length;j++){
			var code1 = arr[i]+""+arr[i]+""+arr[j];
			if(!codeList.includes(code1)){
				codeList.push(code1);
			}
			var code2 = arr[i]+""+arr[j]+""+arr[j];
			if(!codeList.includes(code2)){
				codeList.push(code2);
			}
		}
	}
	return codeList;
}



export function z6SFCodeBy(nums) { //重号
    var codeList = []
    var arr = nums.split("");
    arr.sort();
	for(var i=0;i<10;i++){
		var cc = i+"";
		if(cc!=arr[0] && cc!=arr[1]){
			var carr = [cc,arr[0],arr[1]];
			carr.sort();
			var code0 = carr.join("");
			if(!codeList.includes(code0)){
				codeList.push(code0);
			}
		}
	}
	return codeList;
}