import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import { isObject } from './utils';

export default class Proxy {
  _value;

  _taskQueue = [];

  _key = '';

  _path = '';

  static _state = {};

  /**
   * 检测是否是 Proxy 实例
   */
  static isProxy(target) {
    return target instanceof Proxy;
  }

  /**
   * 针对对象进行批量代理
   */
  static proxyObject({ namespace, src = {}, target = {}, attrList = [], isBlackList = true }) {
    if (!target || !isObject(target) || !isObject(src)) return;

    Object.keys(target).forEach(attr => {
      if(attrList.length) {
        if(isBlackList && attrList.indexOf(attr) > -1) return
        if(!isBlackList && attrList.indexOf(attr) < 0) return;
      }

      const proxy = Proxy.insertProxyStore(namespace, attr, target[attr]);
      Object.defineProperty(src, attr, {
        enumerable: true,
        get() {
          return proxy.getValue();
        },
        set(newVal) {
          proxy.setValue(newVal);
        },
      });
    });

    return src;
  }

  /**
   * 向 proxy 仓库中插入 store 对象，不传入命名空间因子表示为全局存放
   */
  static insertProxyStore(namespace, attr, value) {
    if (namespace && !Proxy._state[namespace]) {
      Proxy._state[namespace] = {};
    }

    const proxy = new Proxy(value);
    proxy.key = attr;
    proxy.path = `${namespace}.${attr}`;

    if (namespace) Proxy._state[namespace][attr] = proxy;
    else Proxy._state[attr] = proxy;

    return proxy;
  }

  /**
   * 通过 “反射” 的形式获取到对象上的原始 proxy 对象
   */
  static reflect(namespace = '', attr) {
    if (!namespace) return get(Proxy._state, attr);
    return get(Proxy._state, `${namespace}.${attr}`);
  }

  /**
   * 提供将 proxy 对象集映射到普通对象上的方法，方便进行 getter/setter 的定义
   */
  static settleReflect({ namespace, src = {}, target = {}, attrList = [], isBlackList = true }) {
    if (!target || !isObject(target) || !isObject(src)) return;

    Object.keys(target).forEach(attr => {
      if(attrList.length) {
        if(isBlackList && attrList.indexOf(attr) > -1) return
        if(!isBlackList && attrList.indexOf(attr) < 0) return;
      }

      Object.defineProperty(src, attr, {
        enumerable: true,
        get() {
          return Proxy.reflect(namespace, attr)?.getValue();
        },
        set(newVal) {
          return Proxy.reflect(namespace, attr)?.setValue(newVal);
        },
      });
    });

    return src;
  }

  constructor(initValue, options = {}) {
    this._value = initValue;
    this._options = options;
    this.pushTask(options?.onValueChange);
  }

  /**
   * 一个对象可以在多个地方，被多次监听属性
   */
  pushTask(callback = () => {}) {
    if (isFunction(callback)) {
      this._taskQueue.push(callback);
    }
  }

  /**
   * 触发事件监听
   */
  trigger() {
    this._taskQueue.forEach(fn => fn());
  }

  getValue() {
    return this.value;
  }

  /**
   * 会影响变更监听的 setting，直接操作 setter
   */
  setValue(newVal) {
    this.value = newVal;
  }

  /**
   * 不会引起变更监听的 setting，直接修改私有属性
   */
  setValueSilence(newVal) {
    this._value = newVal;
  }

  get value() {
    return this._value;
  }

  set value(newVal) {
    if (newVal !== this._value) {
      this._value = newVal;
      this.trigger();
    }
  }

  get options() {
    return this._options;
  }

  /** 支持重新设置 options，例如某些情况下可以先构造 Proxy 对象，需要时再延迟设置 options */
  set options(newOptions = {}) {
    this._options = newOptions;
  }

  get key() {
    return this._key;
  }

  set key(newVal) {
    this._key = newVal;
  }

  get path() {
    return this._path;
  }

  set path(newVal) {
    this._path = newVal;
  }
}
