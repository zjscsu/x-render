export default class Context {
  /**
   * 表单协议
   */
   schema = {};

  /**
   * 本地化配置
   */
   locale = 'cn';

  /**
   * 校验信息配置
   */
   validateMessages = {};

  /**
   * 提交 finish 前钩子
   */
   beforeFinish = () => {};

  /**
   * 合并后的内部和外部错误信息
   */
   removeHiddenData = false;

  /**
   * 是否在提交状态
   */
   mapping = {};

  /**
   * 是否开始外部校验，没有外部校验回传的场景，一直是false)
   */
   widgets = {};

  /**
   * 是否正在提交中
   */
   readOnly = false;

  /**
   * 构造 Context 实例
   */
  static create() {
    return new Context();
  }
}
