/*
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-09 17:56:55
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-09 18:14:26
 * @FilePath: \workStudy\cloneDeep.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 检查拷贝的数据类型 并转换为小写
const checkType = (target) => Object.prototype.toString.call(target).replace(/\[object (\w+)\]/, "$1").toLowerCase();

const cloneDeep = (target, hash = new WeakMap) => {
    let result;
    let type = checkType(target);
    // 如果类型为对象，设置result为空对象，如果类型为数组，设置result为空数组，如果是基础数据类型，直接返回target
    if(type === 'object') {
        result = {};
    }else if(type === 'array') {
        result = [];
    }else {
        return target;
    }
    // 如果hash中已经存在target，直接返回target
    if(hash.has(target)) {
        return target
    }
    let copyObj = new target.constructor();
    // 将target以及target的原型存入hash
    hash.set(target, copyObj);
    for(let key in target) {
        // 如果target的下一层还是对象或者数组，则调用cloneDeep，实现递归
        if(checkType(target[key]) === 'object' || checkType(target[key]) === 'array') {
            result[key] = cloneDeep(target[key],hash);
        } else {
            result[key] = target[key];
        }
    }
    return result;
}
let obj = {
    name: 'xi',
    age: 19
}
let newObj = cloneDeep(obj)
obj.age = 20
console.log(newObj);