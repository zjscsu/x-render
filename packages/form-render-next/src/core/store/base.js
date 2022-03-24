import Proxy from '../proxy';

export default class BaseStore {
  static create(Store, namespace, ...args) {
    const values = new Store(...args);
    const store = new BaseStore(namespace);
    store.values = values;
    return store;
  }

  _namespace;

  _values = {};

  constructor(namespace) {
    this.namespace = namespace;
  }

  setupProxy = (target) => {
    return Proxy.proxyObject({
      namespace: this.namespace,
      target: target || this.values,
    });
  }

  /**
   * 向目标对象 merge proxy 属性，在 Store 类中默认源为当前对象
   */
  setupReflect = (src, target) => {
    return Proxy.settleReflect({
      namespace: this.namespace,
      src,
      target: target || this.values,
    });
  }

  get namespace() {
    return this._namespace;
  }

  set namespace(newVal) {
    this._namespace = newVal;
  }

  get values () {
    return this._values;
  }

  set values (newVal) {
    this._values = newVal;
  }

}