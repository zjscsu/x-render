var Component = require("../../../../../../../../npm_modules/@ali/dslplus-mini-runtime-my-wx/dist/index.js").Component([[], [], 0]);

Component({
  methods: {
    onDismiss() {
      const {
        onDismiss
      } = this.props;
      onDismiss && onDismiss();
    },

    onChange(v) {
      const {
        onChange
      } = this.props;
      onChange && onChange();
    },

    onOk(v) {
      const {
        onOk
      } = this.props;
      onOk && onOk();
    },

    onFormat(v) {
      const {
        onFormat
      } = this.props;

      if (onFormat) {
        return onFormat();
      }

      return v.join('-');
    }

  }
});