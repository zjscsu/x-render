import { sortedUniqBy, clone, set } from 'lodash-es';
import BaseForm from './base';
import Proxy from '../proxy';
import {
  generateDataSkeleton,
  flattenSchema,
  schemaContainsExpression,
  parseAllExpression,
  flattenFormDataByPathList,
} from '../utils';
import { processData, transformDataWithBind2 } from '../utils/processData';
import {
  mapping as defaultMapping,
  getWidgetName,
  extraSchemaList,
} from '../mapping';

export default class Form extends BaseForm {
  constructor(props = {}) {
    super(props);
    this._initObserver();
  }

  _initObserver = () => {
    // 根据 schema 和 props formData 计算表单值
    this.observe(() => {
      let formData = {};
      if (this.schema) {
        formData = generateDataSkeleton(this.schema, this.props.formData);
      }
      this.setState({ formData });
    }, [
      Proxy.reflect(this.propsStore, 'formData'),
      Proxy.reflect(this.contextStore, 'schema'),
    ]);

    // 进行内外部错误合并
    this.observe(() => {
      let errorFields = [];
      if (
        Array.isArray(this.innerErrorFields) &&
        Array.isArray(this.outErrorFields) &&
        this.outErrorFields.length > 0
      ) {
        const mergeErrors = [...this.innerErrorFields, ...this.outErrorFields];
        errorFields = sortedUniqBy(mergeErrors, item => item.name);
      } else {
        errorFields = this.innerErrorFields;
      }
      this.setState({ errorFields });
    }, [
      Proxy.reflect(this.stateStore, 'innerErrorFields'),
      Proxy.reflect(this.stateStore, 'outErrorFields'),
    ]);

    // 扁平化处理 schema
    this.observe(() => {
      if (this.schema && this.firstMount) {
        const flatten = flattenSchema(this.schema);
        // 计算组件名
        Object.values(flatten).forEach(obj => {
          if (!obj.children.length) {
            const widgetName = this.getWidgetName(obj.schema, this.mapping);
            const extraSchema = extraSchemaList[widgetName];
            obj.schema.widget = widgetName;
            obj.schema = {
              ...obj.schema,
              ...extraSchema,
            };
          }
        });

        // 将协议树转换为数组，方便某些场景下（如小程序）直接进行渲染而不用进行递归
        const flattenArr = Object.values(clone(flatten))
          .map(obj => {
            if ('order' in obj.schema === false) {
              obj.schema.order = -1;
            }
            return obj;
          })
          .sort((a, b) => a.schema?.order - b.schema?.order);

        // 协议数组进一步简化，只保留叶子节点（最终将会被渲染的节点）适用于某些极简场景（如不考虑父级嵌套的样式）
        const simpleFlattenArr = flattenArr.filter(obj => !obj.children.length);
        this.setState({ flatten, flattenArr, simpleFlattenArr });
      }
    }, [
      Proxy.reflect(this.contextStore, 'schema'),
      Proxy.reflect(this.contextStore, 'mapping'),
      Proxy.reflect(this.contextStore, 'widgets'),
      Proxy.reflect(this.stateStore, 'firstMount'),
    ]);

    // 统一的处理expression
    this.observe(() => {
      if (this.firstMount) {
        return;
      }

      let newFlatten = clone(this.flatten);
      Object.entries(this.flatten).forEach(([path, info]) => {
        if (schemaContainsExpression(info.schema)) {
          const arrayLikeIndex = path.indexOf(']');
          const isArrayItem =
            arrayLikeIndex > -1 && arrayLikeIndex < path.length - 1;
          const hasRootValue =
            JSON.stringify(info.schema).indexOf('rootValue') > -1;
          if (isArrayItem && hasRootValue) {
            // do nothing
          } else {
            newFlatten[path].schema = parseAllExpression(
              info.schema,
              this.formData,
              path
            );
          }
        }
      });

      this.setState({ finalFlatten: newFlatten });
    }, [
      Proxy.reflect(this.stateStore, 'flatten'),
      Proxy.reflect(this.stateStore, 'formData'),
      Proxy.reflect(this.stateStore, 'firstMount'),
    ]);
  };

  // 获取组件名
  getWidgetName = (schema, mapping) => {
    let widgetName = getWidgetName(schema, mapping);
    const readOnly =
      this.readOnly !== undefined ? this.readOnly : schema.readOnly;
    const customName = schema.widget || schema['ui:widget'];
    const readOnlyName = schema.readOnlyWidget || 'html';

    if (customName && this.widgets[customName]) {
      widgetName = customName;
    }

    if (readOnly && !isObjType(schema) && !isListType(schema)) {
      widgetName = readOnlyName;
    }

    if (!widgetName) {
      widgetName = 'input';
    }

    return widgetName;
  };

  // All form methods are down here ----------------------------------------------------------------
  // 两个兼容 0.x 的函数
  _setData = data => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(data);
    } else {
      this.setState({ formData: data });
    }
  };

  // Allow function to get the old value
  _setErrors = errors => {
    const { onValidate } = this.props;
    if (typeof onValidate === 'function') {
      const oldFormatErrors = errors ? errors.map(item => item.name) : [];
      onValidate(oldFormatErrors);
    }
    if (typeof errors === 'function') {
      this.setState(({ errorFields }) => {
        return { errorFields: errors(errorFields) };
      });
    } else {
      this.setState({ errorFields: errors });
    }
  };

  setFirstMount = value => {
    this.setState({ firstMount: value });
  };

  touchKey = key => {
    if (this.touchedKeys.indexOf(key) > -1) {
      return;
    }
    const newKeyList = [...this.touchedKeys, key];
    this.setState({ touchedKeys: newKeyList });
  };

  removeTouched = key => {
    let newTouch = this.touchedKeys.filter(item => {
      return item.indexOf(key) === -1;
    });
    this.setState({ touchedKeys: newTouch });
  };

  changeTouchedKeys = newTouchedKeys => {
    this.setState({ touchedKeys: newTouchedKeys });
  };

  setEditing = isEditing => {
    this.setState({ isEditing });
  };

  onItemChange(path, value) {
    if (typeof path !== 'string') return;
    if (path === '#') {
      this._setData({ ...value });
      return;
    }
    set(this.formData, path, value);
    this._setData({ ...this.formData });
  }

  syncStuff = ({
    schema,
    locale,
    validateMessages,
    beforeFinish,
    removeHiddenData,
    mapping = {},
    widgets = {},
    readOnly = false,
  }) => {
    this.schema = schema;
    this.locale = locale;
    this.validateMessages = validateMessages;
    this.beforeFinish = beforeFinish;
    this.removeHiddenData = removeHiddenData;
    // 以下为新增的同步属性
    this.mapping = { ...defaultMapping, ...mapping };
    this.widgets = widgets;
    this.readOnly = readOnly;
  };

  setSchema = settings => {
    const newFlatten = clone(this.flatten);
    try {
      Object.keys(settings).forEach(path => {
        if (!this.flatten[path]) {
          console.error(`path：'${path}' 不存在(form.setSchemaByPath)`);
        } else {
          const newSchema = settings[path];
          const _newSchema =
            typeof newSchema === 'function'
              ? newSchema(newFlatten[path].schema)
              : newSchema;
          newFlatten[path].schema = {
            ...newFlatten[path].schema,
            ..._newSchema,
          };
        }
      });
      this.setState({ flatten: newFlatten });
    } catch (error) {
      console.error(error, 'setSchema');
    }
  };

  setSchemaByPath = (path, newSchema) => {
    if (!this.flatten[path]) {
      console.error(`path：'${path}' 不存在(form.setSchemaByPath)`);
      return;
    }
    const newFlatten = clone(this.flatten);

    try {
      const _newSchema =
        typeof newSchema === 'function'
          ? newSchema(newFlatten[path].schema)
          : newSchema;
      newFlatten[path].schema = { ...newFlatten[path].schema, ..._newSchema };
      this.setState({ flatten: newFlatten });
    } catch (error) {
      console.error(error, 'setSchemaByPath');
    }
  };

  getSchemaByPath = path => {
    try {
      return this.flatten[path].schema;
    } catch (error) {
      console.log(error, 'getSchemaByPath');
      return {};
    }
  };

  setErrorFields = error => {
    let newErrorFields = [];
    if (Array.isArray(error)) {
      newErrorFields = [...error, ...this.outErrorFields];
    } else if (error && error.name) {
      newErrorFields = [error, ...this.outErrorFields];
    } else {
      console.log('error format is wrong');
    }
    newErrorFields = sortedUniqBy(newErrorFields, item => item.name);
    this.setState({ outErrorFields: newErrorFields });
  };

  removeErrorField = path => {
    let newError = this.errorFields.filter(item => {
      return item.name.indexOf(path) === -1;
    });

    let newOutError = this.outErrorFields.filter(item => {
      return item.name.indexOf(path) === -1;
    });
    this.setState({ errorFields: newError, outErrorFields: newOutError });
  };

  getValues = () => {
    return processData(this.formData, this.finalFlatten, this.removeHiddenData);
  };

  setValues = newFormData => {
    const newData = transformDataWithBind2(newFormData, this.flatten);
    this._setData(newData);
  };

  submit = () => {
    this.setState({
      isValidating: true,
      allTouched: true,
      isSubmitting: false,
    });
    //  https://formik.org/docs/guides/form-submission
    return this.validator.validateAll({
      formData: this.formData,
      flatten: this.finalFlatten,
      options: {
        locale: this.locale,
        validateMessages: this.validateMessages,
      },
    })
      .then(errors => {
        this.setState({ errorFields: errors });

        const _errors = sortedUniqBy(
          [...(errors || []), ...this.outErrorFields],
          item => item.name
        );

        if (typeof this.beforeFinish === 'function') {
          return Promise.resolve(
            processData(this.formData, this.finalFlatten, this.removeHiddenData)
          ).then(res => {
            this.setState({
              isValidating: true,
              isSubmitting: false,
              outsideValidating: true,
              submitData: res,
            });
            return { data: res, errors: _errors };
          });
        }

        return Promise.resolve(
          processData(this.formData, this.finalFlatten, this.removeHiddenData)
        ).then(res => {
          this.setState({
            isValidating: false,
            isSubmitting: true,
            submitData: res,
          });
          return { data: res, errors: _errors };
        });
      })
      .catch(err => {
        // 不应该走到这边的
        console.log('submit error:', err);
        return err;
      });
  };

  resetFields = options => {
    this.setState({
      formData: options?.formData || {},
      submitData: options?.submitData || {},
      errorFields: options?.errorFields || [],
      touchedKeys: options?.touchedKeys || [],
      allTouched: options?.allTouched || false,
    });
  };

  endValidating = () => {
    this.setState({
      isValidating: false,
      outsideValidating: false,
      isSubmitting: true,
    });
  };

  endSubmitting = () => {
    this.setState({
      isSubmitting: false,
      isValidating: false,
      outsideValidating: false,
    });
  };

  flattenFormData() {
    if (!this.formData) {
      return {};
    }

    console.log('debug');
    console.log(this.formData);

    const pathList = this.simpleFlattenArr
      .map(field => field.schema.$id);

    return flattenFormDataByPathList(this.formData, pathList);
  }
}
