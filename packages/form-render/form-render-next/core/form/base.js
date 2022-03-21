import Observer from "../observer";
import Proxy from '../proxy';
import { isObject } from "../utils";
import Store from './store';

export default class BaseForm extends Observer{
  _store = Store.getStore();

  _props = {
    formData: {},
    onChange: () => {},
    onValidate: () => {},
    showValidate: () => {},
    /** 数据分析接口，表单展示完成渲染时触发 */
    logOnMount: () => {},
    /** 数据分析接口，表单提交成功时触发，获得本次表单填写的总时长 */
    logOnSubmit: () => {},
  }

  /**
   * 外部通过 syncStuff 进行协议等同步
   */
  _context = {
    schema: {},
    locale: {},
    validateMessages: {},
    beforeFinish: {},
    removeHiddenData: {},
  }

  _namespace = {
    store: 'FormStore',
    props: 'FormProps',
    context: 'FormContext',
  }

  constructor({
    formData,
    onChange,
    onValidate,
    showValidate,
    logOnMount,
    logOnSubmit,
    onTrigger = () => {}
  } = {}) {
    super({ onTrigger })

    this._bootstrap({
      formData,
      onChange,
      onValidate,
      showValidate,
      logOnMount,
      logOnSubmit,
    });
  }

  _bootstrap(props) {
    this._initProps(props);
    this._initContext();
    this._initStore();
  }

  _initProps(props) {
    this._props = Proxy.proxyObject({
      namespace: this.namespace.props,
      target: props, 
    });
  }

  _initContext() {
    this._context = Proxy.proxyObject({
      namespace: this.namespace.context, 
      target: this._context
    });

    Proxy.settleReflect({
      namespace: this.namespace.context,
      src: this,
      target: this._context
    });
  }

  _initStore() {
    this._store = Proxy.proxyObject({
      namespace: this.namespace.store, 
      target: this._store
    });

    Proxy.settleReflect({
      namespace: this.namespace.store,
      src: this,
      target: this._store
    });
  }

  setState(states) {
    let newState = states;

    /**
     * e.g.
     * setState(({ errorFields }) => { errorFields })
     */
    if(typeof newState === 'function') {
      newState = states(this);
    }

    if(!isObject(newState)) return;
    Object.keys(newState).forEach((attr) => {
      this[attr] = newState[attr];
    })
  }

  syncProps(props = {}) {
    const {
      formData = {},
      onChange = () => {},
      onValidate = () => {},
      showValidate = () => {},
      logOnMount = () => {},
      logOnSubmit = () => {},
    } = props;

    this.props.formData = formData;
    this.props.onChange = onChange;
    this.props.onValidate = onValidate;
    this.props.showValidate = showValidate;
    this.props.logOnMount = logOnMount;
    this.props.logOnSubmit = logOnSubmit;
  }

  get store() {
    return this._store;
  }

  set store(newVal) {
    this._store  = newVal;
  }

  get props() {
    return this._props;
  }

  set props(newVal) {
    this._props = newVal;
  }

  get namespace() {
    return this._namespace;
  }

  set namespace(newVal) {
    this._namespace = newVal;
  }
}