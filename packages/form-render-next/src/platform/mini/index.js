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

      // FIX_ME 更完善的检查
      const formCorrect = !!form;

      if (formCorrect) {
        console.error(
          'form 为必填 props，<FormRender /> 没有接收到 form 属性!'
        );
      }
    },
  },
});
