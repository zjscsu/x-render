export default class Props {
  /**
   * 外界传入，用来标识表单唯一的 ID
   */
  id = '';

  /**
   * 从外部传入的初始化表单数据
   */
   formData = {};

  /**
   * 表单字段变化回调
   */
   onChange = () => {};

  /**
   * 校验信息配置
   */
   onValidate = () => {};

  /**
   *  旧版折中升级方案里，旧的api的软兼容
   */
   showValidate;

  /**
   * 数据分析接口，表单展示完成渲染时触发
   */
   logOnMount = () => {};

  /**
   * 数据分析接口，表单提交成功时触发，获得本次表单填写的总时长
   */
   logOnSubmit =() => {};
}
