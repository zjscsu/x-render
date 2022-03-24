import Observer from '../observer';
import Proxy from '../proxy';
import { isObject } from '../utils';
import State from './state';
import Context from './context';
import Props from './props';
import Validator from '../validator';
import Store from '../store';

export default class BaseForm extends Observer {
  _validator = Validator.create();

  _state = State.create();

  _props = Props.create();

  /**
   * 外部通过 syncStuff 进行协议等同步
   */
  _context = Context.create();

  _namespace = {
    state: 'FormState',
    props: 'FormProps',
    context: 'FormContext',
  };

  /**
   * 存放全局所有表单对象的引用
   */
  _store = null;

  /**
   * 用来全局标识表单的 ID，从 0 开始自增，在用户 useForm 时不显式传入 id 的时候也会作为默认值
   */
  static $id = 0;

  constructor({
    id,
    formData,
    onChange,
    onValidate,
    showValidate,
    logOnMount,
    logOnSubmit,
  } = {}) {
    super();

    BaseForm.$id++;

    this._bootstrap({
      id: id || BaseForm.$id,
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
    this._initState();
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
      target: this._context,
    });

    Proxy.settleReflect({
      namespace: this.namespace.context,
      src: this,
      target: this._context,
    });
  }

  _initState() {
    this._state = Proxy.proxyObject({
      namespace: this.namespace.state,
      target: this._state,
    });

    Proxy.settleReflect({
      namespace: this.namespace.state,
      src: this,
      target: this._state,
    });
  }

  setState(states) {
    let newState = states;

    /**
     * e.g.
     * setState(({ errorFields }) => { errorFields })
     */
    if (typeof newState === 'function') {
      newState = states(this);
    }

    if (!isObject(newState)) return;
    Object.keys(newState).forEach(attr => {
      this[attr] = newState[attr];
    });
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

  /**
   * 回收存放在全局的表单实例
   */
  destroy = () => {
    if(this.store instanceof Store) {
      this.store.destroy(this.id);
    }
  }

  /**
   * 回收存放在全局的表单实例并删除 key
   */
  delete = () => {
    if(this.store instanceof Store) {
      this.store.delete(this.id);
    }
  }

  get state() {
    return this._state;
  }

  set state(newVal) {
    this._state = newVal;
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

  get validator() {
    return this._validator;
  }

  set validator(newVal) {
    this._validator = newVal;
  }

  get store() {
    return this._store;
  }

  set store(newVal) {
    this._store = newVal;
  }
}
