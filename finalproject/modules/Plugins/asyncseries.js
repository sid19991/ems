/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function abc() {
    this.value = [];
    this.result = [];
}
abc.prototype.addNew = function (fn) {
    this.value.push(fn);
}
abc.prototype.ex = function (fn, index, arr, cb) {
    var t = this;
    fn(function (err, result) {
        if (err) {
               cb(err,null);
        } else {
            if (!(index >= arr.length-1)) {
                t.result.push(result);
                t.ex(arr[index + 1], index + 1, arr, cb);
            }else{
                cb(null,result);
            }
        }
    });
}
abc.prototype.execAll = function (c, callback) {
    var i = 0;
    this.c = c;
    this.ex(this.value[i], i, this.value,callback);
}
module.exports = abc
