import Observer from '../observer';
import { isObject } from '../utils';
import Store from '../store';
import Validator from '../validator';
import BaseStore from '../store/base';
import State from '../store/state';
import Context from '../store/context';
import Props from '../store/props';

export default class BaseForm extends Observer {
  /**
   * 用来全局标识表单的 ID，从 0 开始自增，在用户 useForm 时不显式传入 id 的时候也会作为默认值
   */
  static $id = 0;

  static namespace = {
    State: 'FormState',
    Props: 'FormProps',
    Context: 'FormContext',
  }

  _validator = Validator.create();

  _store = {
    stateStore: BaseStore.create(State, BaseForm.namespace.State),
    propsStore: BaseStore.create(Props, BaseForm.namespace.Props),
    contextStore: BaseStore.create(Context, BaseForm.namespace.Context),
    formStore: null,
  }

  _state = {};

  _props = {};

  /**
   * 外部通过 syncStuff 进行协议等同步
   */
  _context = {};

  _id;

  constructor(props = {}) {
    super(props);

    BaseForm.$id++;
    this.id = props.id || BaseForm.$id;
    this._bootstrap(props);
  }

  _bootstrap(props) {
    this._initProps();
    this._initContext();
    this._initState();
    this.syncProps(props);
  }

  _initProps() {
    const { propsStore } = this.store;
    const proxyProps = propsStore.setupProxy();
    this.props = proxyProps;
  }

  _initContext() {
    const { contextStore } = this.store;
    const proxyContext = contextStore.setupProxy();
    contextStore.setupReflect(this, proxyContext);
    this.context = proxyContext;
  }

  _initState() {
    const { stateStore } = this.store;
    const proxyState = stateStore.setupProxy();
    stateStore.setupReflect(this, proxyState);
    this.state = proxyState;
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
    if(this.formStore instanceof Store) {
      this.formStore.destroy(this.id);
    }
  }

  /**
   * 回收存放在全局的表单实例并删除 key
   */
  delete = () => {
    if(this.formStore instanceof Store) {
      this.formStore.delete(this.id);
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

  get context() {
    return this._context;
  }

  set context(newVal) {
    this._context = newVal;
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

  get propsStore() {
    return this.store.propsStore.namespace;
  }

  set propsStore(newVal) {
    return this.store.propsStore.namespace = newVal;
  }

  get stateStore() {
    return this.store.stateStore.namespace;
  }

  set stateStore(newVal) {
    return this.store.stateStore.namespace = newVal;
  }

  get contextStore() {
    return this.store.contextStore.namespace;
  }

  set contextStore(newVal) {
    return this.store.contextStore.namespace = newVal;
  }

  get formStore() {
    return this.store.formStore;
  }

  set formStore(newVal) {
    return this.store.formStore = newVal;
  }

  get id() {
    return this._id;
  }

  set id(newVal) {
    this._id = newVal;
  }
}
