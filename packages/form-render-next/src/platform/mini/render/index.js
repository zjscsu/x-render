import Core from '../../../../lib/core';

Component({
  props: {
    schema: {},
    form: null,
  },

  data: {
    formFields: [],
  },

  didMount() {
    console.log('mount------------------');
    const { form } = this.props;

    // 检查 form 实例是否存在
    try {
      const _ = form.submit;
    } catch (error) {
      console.error('form 为必填 props，<form-render /> 没有接收到 form 属性!');
    }

    console.log('form: use '); console.log(form);

    console.log('schema from renderer:');
    console.log(this.props.schema);

    this.setData({
      formFields: ['input', 'select', 'select', 'select', 'input'],
    });
  },

  didUnMount() {
    this.unBindForm();
  },

  didUpdate(prevProps, prevData) {
    if (prevProps.schema !== this.props.schema) {
      console.log('new schema');
      if (this.props.form) {
        this.props.form.schema = this.props.schema;
      }
      console.log(this.props.schema);
      console.log('props.form -------');
      console.log(this.props.form);
    }
  },

  methods: {
    onValuesChange(value) {
      console.log('value change:');
      console.log(value);
    },
    onClick() {},

    bindForm(form) {
      // 先释放对之前的 form 的监听
      this.unBindForm();

      const unBindSchema = form.observe(() => {
        // set schema
      },[schema]);

      const unBindValue = form.observe(() => {
        // set schema
      },[value]);

      // set unBind function;
      this.handleUnBind = () => {
        unBindSchema();
        unBindValue();
      };
    },

    unBindForm() {
      if (this.handleUnBind) {
        this.handleUnBind();
      }
      // TODO 
    },
  },
});
