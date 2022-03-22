import Core from '../../core';

Component({
  onInit() {
    this.init();
  },

  didUpdate() {
    // this.init();
  },

  didMount() {
    this.formCore.logOnMount();
  },

  methods: {
    init() {
      const { form } = this.props;

      // 检查 form 实例是否存在
      try {
        const _ = form.submit;
      } catch (error) {
        console.error(
          'form 为必填 props，<FormRender /> 没有接收到 form 属性!'
        );
      }

      const formCore = new Core(this.props);
      this.formCore = formCore;
    },
  },
});
