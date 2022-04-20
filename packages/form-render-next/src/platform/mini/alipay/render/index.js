import { formStore } from '../../../../../lib/core/useForm';
import Proxy from '../../../../../lib/core/proxy';
import { sortedUniqBy, clone, set, result } from 'lodash-es';

const setValueByPath = (formInstance, path, value) => {
  // FIX_ME
  const newFormData = clone(formInstance.formData);
  set(newFormData, path, value);
  formInstance.setValues(newFormData);
};

console.test = {
  testSubmit: ()=> {
    console.log('test submit');
  }
}

Component({
  props: {
    schema: {},
    form: undefined,
    /**
     * 自定义组件和 widget 的映射关系： 
     * 比如：
     *  {
     *    'string:my-input': 'my-input'
     *  }
     */
    widgets: {},
  },

  data: {
    /**
      formField 的结构:
      interface FormField{
        schema: {};
        value: {};
        error: {};
      }

      formFields 为 FormField 的数组形式
    */
    formFields: [],

    /**
      将所有的 form 的相关的状态统一放在 formData 中
      该对象的结构如下所示：
      @type Array<{
        field: {
          schema: {},
        },
        errors: string[], 
        tip: string,
      }>
    */
    formDataList: [], 

    formString: '',
  },

  didMount() {},

  didUnMount() {
    this.unBindForm();
  },

  didUpdate(prevProps, prevData) {
    if (prevProps.schema !== this.props.schema) {
      if (this.props.form) {
        const formInstance = formStore.getItem(this.props.form);
        formInstance.syncStuff({
          schema: this.props.schema,
          widgets: this.props.widgets,
        });
      }
    }

    if (prevProps.form !== this.props.form) {
      // form 变动， 重新 bind form
      const formInstance = formStore.getItem(this.props.form);
      this.bindForm(formInstance);
    }
  },

  methods: {
    getFormRef(ref) {
      this.formRef = ref;
    },
    onValuesChange(changeValues) {
      const formInstance = this.formInstance;

      if (!formInstance) {
        return;
      }

      const changedKey = Object.keys(changeValues)[0];
      formInstance.touchKey(changedKey);
      setValueByPath(formInstance, changedKey, changeValues[changedKey]);

      // validate
      formInstance.validator.validateField({
        path: changedKey,
        formData: formInstance.formData,
        flatten: formInstance.finalFlatten,
      })
        .then( errors => {
          if (! errors.length) {
            return;
          }

          /** 
          * @type Array<{name: string; error: Array<string>;}>
          */
          const currentErrors =  formInstance.errorFields || [];

          const newErrors = currentErrors.map(error => error);

          const findIndex = newErrors.findIndex(error => error.name === changedKey)

          if (findIndex > -1) {
            // FIX_ME errors is a list
            newErrors[findIndex] = errors[0];
          } else {
            newErrors.push(errors[0]);
          }

          formInstance.setState({
            errorFields: newErrors,
          });
        });
    },

    /**
     * 所有视图层面的数据的更新在这里统一处理 
     * TODO 需要性能优化, 性能优化的方向： 防抖处理,脏值检查，以及进行更加细粒度的状态控制
     */
    updateView(formInstance) {

      if (this.formRef) {
        // TODO: 
        // const flattedFormData = formInstance.flattenFormData();
        // this.formRef.setFieldsValue(this.props.form, flattedFormData);
      }

      /** 
      * @type Array<{name: string; error: Array<string>;}>
      */
      const errors = formInstance.errorFields;

      const tempErrorsMap = {};

      errors.forEach(error => {
        tempErrorsMap[error.name] = error;
      });

      const formDataList = formInstance.simpleFlattenArr
        .map(field => ({
          field,
          error: tempErrorsMap[field.schema.$id] || [],
          // TODO:  tip
        }));

      this.setData({
        formDataList,
      });
    },

    bindForm(formInstance) {
      // 先释放对之前的 form 的监听
      this.unBindForm();

      this.formInstance = formInstance;

      console.test.testSubmit = () => {
        console.log('submit:');
        formInstance.submit()
          .then(result => {
            this.updateView(formInstance);
            console.log('submit result : ');
            console.log(result);
          });
      };

      // 监听任何 form 属性的变化
      formInstance._setTrigger(() => {
        this.updateView(formInstance);
      });

      const unBindSchema = formInstance.observe(() => {
        this.updateView(formInstance);
      }, [Proxy.reflect('schema', formInstance.store)]);


      const unBindErrorFields = formInstance.observe(() => {
        this.updateView(formInstance);
      }, [Proxy.reflect('errorFields', formInstance.stateStore)]);


      // set unBind handler;
      this.handleUnBind = () => {
        formInstance._setTrigger(() => {});
        unBindSchema();
        unBindErrorFields();
        this.formInstance = null;
      };
    },

    unBindForm() {
      if (this.handleUnBind) {
        this.handleUnBind();
        this.handleUnBind = null;
      }
    },
  },
});
