import { sortedUniqBy, clone, set } from 'lodash-es';
import BaseForm from './base';
import Proxy from '../proxy';
import {
  generateDataSkeleton,
  flattenSchema,
  schemaContainsExpression,
  parseAllExpression,
  isObjType,
} from '../utils';
import { processData, transformDataWithBind2 } from '../utils/processData';
import { validateAll } from '../validator';

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
      Proxy.reflect(this.namespace.props, 'formData'),
      Proxy.reflect(this.namespace.context, 'schema'),
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
      Proxy.reflect(this.namespace.store, 'innerErrorFields'),
      Proxy.reflect(this.namespace.store, 'outErrorFields'),
    ]);

    // 扁平化处理 schema
    this.observe(() => {
      if (this.schema && this.firstMount) {
        const flatten = flattenSchema(this.schema);
        const flattenArr = Object.values(clone(flatten))
          .map(obj => {
            if ('order' in obj.schema === false) {
              obj.schema.order = -1;
            }
            return obj;
          })
          .sort((a, b) => a.schema?.order - b.schema?.order);
        const _simpleFlattenArr = flattenArr.filter(
          obj => !obj.children.length
        );
        this.setState({ flatten, flattenArr, _simpleFlattenArr });
      }
    }, [
      Proxy.reflect(this.namespace.context, 'schema'),
      Proxy.reflect(this.namespace.store, 'firstMount'),
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
      Proxy.reflect(this.namespace.store, 'flatten'),
      Proxy.reflect(this.namespace.store, 'formData'),
      Proxy.reflect(this.namespace.store, 'firstMount'),
    ]);
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
  }) => {
    this.schema = schema;
    this.locale = locale;
    this.validateMessages = validateMessages;
    this.beforeFinish = beforeFinish;
    this.removeHiddenData = removeHiddenData;
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
    return validateAll({
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
}
