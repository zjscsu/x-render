const getFormRenderMixin = () => ({
  // 表单回调

  methods: {
    validateAll(){
      console.log('validateAll');
      console.log(this);
    },
    getValues(){},
    setErrors(){},
    setErrorsAsync(){},
    removeErrorField(){},
    setValueByPath(value, path){
      const formId = this.props.form;
      console.log('formId:');
      console.log(formId);
    },
    updateContext(){},
    updateFormData(){},
    updateFormContext(){},
    destroyFormContext(){},
    addCustomValidatorByRefKey(){},
    removeCustomValidatorByRefKey(){},
    removeFieldTip(){},
    getFieldGroupData(){},

    // 快捷方法

    getFormInstance() {},
  },
});

export default getFormRenderMixin;
