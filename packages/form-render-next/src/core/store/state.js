export default class State {
  /**
   * 表单数据
   */
  formData = {};

  /**
   * 提交的数据信息，包括错误校验信息和表单数据
   */
  submitData = {};

  /**
   * 内部错误信息
   */
  innerErrorFields = [];

  /**
   * 外部错误信息
   */
  outErrorFields = [];

  /**
   * 合并后的内部和外部错误信息
   */
  errorFields = [];

  /**
   * 是否在提交状态
   */
  isValidating = false;

  /**
   * 是否开始外部校验，没有外部校验回传的场景，一直是false)
   */
  outsideValidating = false;

  /**
   * 是否正在提交中
   */
  isSubmitting = false;

  /**
   * 是否在编辑状态。主要用于优化体验，用户编辑时减少不必要的运算
   */
  isEditing = false;

  /**
   * 是否所有表单元素都被碰过了（一键开关，用于提交的时候，默认所有都被touch了）
   */
  allTouched = false;

  /**
   * 碰过的key（用于submit之前，判断哪些被碰过了）
   */
  touchedKeys = [];

  /**
   * schema 的转换结构，便于处理
   */
  flatten = {};

  /**
   * 将 flatten 转换成数组，并根据 order 排序
   */
  flattenArr = [];

  /**
   * 将 flatten 转换成数组，并根据 order 排序，同时去掉非叶子节点
   */
  simpleFlattenArr = [];

  /**
   * 表达式等被处理过的flatten，用于渲染
   */
  finalFlatten = {};

  /**
   * 是否首次加载
   */
  firstMount = true;
}
