import { yymmdd } from './utils';

export default class Core {
  _options = null;
  _form = null;

  _proxy: {
    schema: {},
  }

  set proxy(val) {
    // if() {
    //   trigger();
    // }
    if(schema) {
      xxxxx
      if(setFirstMount) {
        
      }
    }
  }

  constructor(options = {}) {
    this._options = options;
    this.init(options);
  }

  /** 初始化表单核心 */
  init({
    id,
    widgets,
    mapping,
    form,
    className,
    style,
    beforeFinish,
    onFinish = defaultFinish,
    displayType = 'column',
    schema,
    debug,
    debugCss,
    locale = 'cn', // 'cn'/'en'
    debounceInput = false,
    size,
    configProvider,
    theme,
    validateMessages,
    watch = {},
    config,
    onMount,
    labelWidth,
    readOnly,
    disabled,
    allCollapsed = false,
    onValuesChange,
    column,
    removeHiddenData = false,
    globalProps = {},
    ...rest
  }) {
    this._form = form;
    
    // Schema最外层的type是object来判断，没有的话，认为schema没有传
    if (schema && schema.type) {
      this.form.setFirstMount(true);
      this.form.syncStuff({
        schema,
        locale,
        validateMessages,
        beforeFinish,
        onMount,
        removeHiddenData,
      });
    }

    const _column = (schema && schema.column) || column;
  }

  /** 表单组件装载完成后的回调 */
  logOnMount(...rest) {
    const { logOnMount } = this.form;
    const start = new Date().getTime();

    if (typeof logOnMount === 'function') {
      const logParams = {
        schema,
        url: location.href,
        formData: JSON.stringify(this.form.getValues()),
        formMount: yymmdd(start),
        ...rest,
      };
      if (id) {
        logParams.id = id;
      }
      logOnMount(logParams);
    }
  }

  get options () {
    return this._options;
  }

  get form() {
    return this._form;
  }
}