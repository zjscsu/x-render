import Proxy from '../proxy';

export default class Observer {
  /**
   * 将待监听属性值加入队列
   */
  observe(callback = () => {}, watchedValues = [], immediately = true) {
    if(!Array.isArray(watchedValues)) {
      throw new TypeError(`invalid observe keys type, except: Array, accept: ${typeof keys}`);
    }

    const args = watchedValues.map(target => target);

    // 首次默认执行
    immediately && callback(...args);

    watchedValues.forEach(target => {
      const triggerFn = () => {
        // 对于一个对象多次监听的情形，每次监听都会将参数列表传入
        const callbackValues = args.map((p) => p);
        callback(...callbackValues)
      }

      Proxy.isProxy(target) && target.pushTask(triggerFn);
    })
  }
}