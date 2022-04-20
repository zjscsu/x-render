//////////////////////////////////////////////////
/**

author: 竹弦

RenderCore  相关的接口规范:

RenderCore 作为一个与具体的视图无关的纯逻辑的模块， 应该
具备以下基本能力：

1. 管理表单相关的状态(比如： schema、form data、errors等)
2. 表单相关状态变化的时候的事件通知
3. 表单校验能力
4. 联动逻辑

对于 renderer 来说， 视图应该是由 render core 中的状态驱
动的，view 会监听 core 中的 state 的变化， 然后根据 state 
来渲染视图。

同时， 在 view 发生用户输入事件后， 会去设置 core 中的 
state， 因此， core 模块需要提供一个 setState 方法， 用于
更新 state.
*/
//////////////////////////////////////////////////

interface IFormStruct {
  [fieldName: string]: {};
}

interface ISchema<FORM_STRUCT>{
  // TODO
}

interface IError {
  name: string;
  error: Array<string>;
}

interface IRenderCoreState<FORM_STRUCT extends IFormStruct> {
  errors?: IError[];

  schema?: ISchema<FORM_STRUCT>;

  formData?: FORM_STRUCT;
}

type StateChangeListener = <FORM_STRUCT extends IFormStruct = {}>(changedState: IRenderCoreState<FORM_STRUCT>) => void;

interface IRenderCore {
  /** 
   *  listen to core, and observe when state changed
   */
  addStateChangeListener: (listener: StateChangeListener) => {};

  removeStateChangeListener: (listener: StateChangeListener) => {};
  
  /**
   * set state values
   */
  setState: <FORM_STRUCT extends IFormStruct>(state: IRenderCoreState<FORM_STRUCT>) => Promise<void>;

  getState: <FORM_STRUCT extends IFormStruct>() => IRenderCoreState<FORM_STRUCT>;

  validateField: (fieldId: string) => Promise<{ errors: IError[] }>;

  validateAll: () => Promise<{ errors: IError[] }>;

  submit: () => Promise<{ data: {}; errors: IError[] }>

  getFormId: () => string;
}

interface IUseFormParams {
  
  /**
   * if set 'true', the render core instance will save to 
   */
  saveToGlobal?: boolean;
}

type useForm = () => IRenderCore;
