import { formStore } from '../../../../../lib/core/useForm';
import Proxy from '../../../../../lib/core/proxy';
import { sortedUniqBy, clone, set } from 'lodash-es';

const setValueByPath = (formInstance, path, value) => {
  // FIX_ME
  const newFormData = clone(formInstance.formData);
  set(newFormData, path, value);
  formInstance.setValues(newFormData);
};

Component({
  props: {
    schema: {},
    form: undefined,
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
    * 将所有的 form 的相关的状态统一放在 formData 中
    */
    formData: {},

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
    onValuesChange(changeValues) {
      const formInstance = this.formInstance;

      if (!formInstance) {
        return;
      }

      console.log('formInstance:');
      console.log(formInstance);

      const changedKey = Object.keys(changeValues)[0];
      formInstance.touchKey(changedKey);
      setValueByPath(formInstance, changedKey, changeValues[changedKey]);

      // TODO validate
      // TODO set error fields

      console.log('changed values:');
      console.log(changeValues);

      console.log(formInstance.validator);
      console.log(formInstance.validator.getAllPaths());
    },

    onClick() {},

    bindForm(formInstance) {
      // 先释放对之前的 form 的监听
      this.unBindForm();

      this.formInstance = formInstance;

      console.log('formInstance');
      console.log(formInstance);
  
      // 监听任何 form 属性的变化
      formInstance._setTrigger(() => {
        console.log('formInstance============');
        console.log(formInstance);

        const serializedForm = JSON.stringify(formInstance);
        
        // 这里 formInstance上的
        this.setData({
          formData: formInstance,
        });

        console.log(this.data);
      });

      const unBindSchema = formInstance.observe(() => {
        const formFields = formInstance.simpleFlattenArr;

        this.setData({
          formFields,
        });
      }, [Proxy.reflect('schema', formInstance.store)]);

      const unBindFormData = formInstance.observe(() => {
        console.log('formData changed.....');
      }, [Proxy.reflect('formData', formInstance.store)]);

      // set unBind handler;
      this.handleUnBind = () => {
        formInstance._setTrigger(() => {});
        unBindSchema();
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
