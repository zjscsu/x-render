import { isFunction } from 'lodash-es';
import Proxy from './proxy';

export default class Observer {
  onTrigger = () => {};

  constructor({ onTrigger }) {
    if(isFunction(onTrigger)) {
      this.onTrigger = onTrigger;
    }
  }

  /**
   * 获取待观测的 Proxy 对象 value
   */
  getObservedArgs = (watchedValues = []) => {
    const triggerArgs = {
      _ctx: this,
    };
    const observeArgs = watchedValues.map((target) => {
      const key = target?.key;
      const value = target?.getValue();
      triggerArgs[key] = value;
      return value;
    });

    return [triggerArgs, observeArgs];
  }

  /**
   * 将待监听属性值加入队列
   */
  observe = (callback = () => {}, watchedValues = [], immediately = true) => {
    if(!Array.isArray(watchedValues)) {
      throw new TypeError(`invalid observe keys type, except: Array, accept: ${typeof keys}`);
    }

    const [,observeArgs] = this.getObservedArgs(watchedValues);
    // 首次默认执行
    immediately && callback(...observeArgs);

    watchedValues.forEach(target => {
      const triggerFn = () => {
        // 重新调用破除闭包的影响
        const [triggerArgs, observeArgs] = this.getObservedArgs(watchedValues);
        // 对于一个对象多次监听的情形，每次监听都会将参数列表传入
        callback(...observeArgs)
        // 通知外部属性变更钩子做回调
        this.onTrigger(triggerArgs);
      }

      Proxy.isProxy(target) && target.pushTask(triggerFn);
    })
  }
}