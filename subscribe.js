/**
 * 发布订阅者模式
 * 角色： 发布者 事件中心 订阅者
 * 发布者给每一种类型的任务新建一个事件处理中心 ===> 订阅方法
 * 发布者可以发布不同类型的任务 ===> 发布任务
 * 对应的任务类型会由对应的事件中心进行处理 ===> 订阅方法的函数参数
 */

class Subscribe {
    constructor() {
        // 事件中心
        this.subscribeCenter = new Map();
    }
    // 订阅方法
    on(type, fn) {
        // 如果这个事件中心不存在，那就新增这个事件中心
        if (!this.subscribeCenter.has(type)) {
            this.subscribeCenter.set(type, []);
        }
        // 防止重复订阅
        if (!this.subscribeCenter.get(type).find(itemFn => itemFn === fn)) {
            this.subscribeCenter.get(type).push(fn);
        }
    }
    // 发布
    publish(type, data) {
        if (this.subscribeCenter.has(type)) {
            const fnList = this.subscribeCenter.get(type);

            fnList.forEach(fn => {
                fn(data);
            });
        }
    }
    // 取消订阅
    unsubscribe(type, fn) {
        if (this.subscribeCenter.has(type)) {
            const fnList = this.subscribeCenter.get(type);
            if (fnList.length) {
                for (let i = 0; i < fnList.length; i++) {
                    if (fnList[i] === fn) {
                        fnList.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
    // 取消全部订阅
    unsubscribeAll(type) {
        if (this.subscribeCenter.has(type)) {
            delete this.subscribeCenter.get(type);
        }
    }
}

let subscribe = new Subscribe();
subscribe.on('game', function (event) {
    console.log(`game is ${event}`);
})

subscribe.on('learn', function (event) {
    console.log(`learn is ${event}`);
});
// 发布任务
subscribe.publish('game', "打游戏")
subscribe.publish('learn', "学习")
