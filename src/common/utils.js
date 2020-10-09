export const strLength = str => {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        // console.log(str.charCodeAt(i));
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
};

String.prototype.othersubstr = function(start, len) {
    if (!this || !len) {
        return "";
    }
    //预期计数：中文2字节，英文1字节
    var a = 0;
    //存放最后截取后的字符串的
    var temp = "";
    var num = 0;
    for (var i = 0; i < start; i++) {
        if (this.charCodeAt(i) > 255) {
            //算出真是的启始位置，还原成不区分中英文的
            start -= 1;
        }
    }
    for (start; start < this.length; start++) {
        if (this.charCodeAt(start) > 255) {
            //按照预期计数增加2
            a += 2;
        } else {
            a++;
        }
        //如果增加计数后长度大于限定长度，就直接返回临时字符串
        if (a > len) {
            return temp;
        }
        //将当前内容加到临时字符串
        temp += this.charAt(start);
        //  console.log(temp);
    }

    return temp;
};
