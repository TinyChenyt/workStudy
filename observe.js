/**
 * 观察者模式
 * 角色： 观察者：n 目标对象：1
 * 观察者可以接受目标对象发布的信息（update），然后根据信息作出对应的反应
 * 目标对象可以被观察者进行订阅，或者说是目标对象新增（接纳）新的观察者 ===> addObserver
 * 目标对象可以发布任务给当前的观察者队列 ===> notify
 */
// 观察者类
class Observer {
    constructor(name) {
        this.name = name;
    }
    // 获取目标对象的信息
    update({ type, info }) {
        console.log(type, info);
        this.go(info);
    }
    // 观察者的动作
    go(info) {
        console.log(`${this.name} get ${info}`);
    }
}
// 目标对象类
class Subject {
    constructor() {
        this.observeList = [];
    }
    // 新增观察者
    addObserver(observe) {
        this.observeList.push(observe);
    }
    // 发布任务
    notify(task) {
        this.observeList.forEach(observer => observer.update(task));
    }
}

const subject = new Subject();
const observer1 = new Observer('one');
const observer2 = new Observer('two');

// 新增观察者
subject.addObserver(observer1);
subject.addObserver(observer2);

const task1 = {
    type: 'testType',
    info: 'testInfo'
}

subject.notify(task1);
