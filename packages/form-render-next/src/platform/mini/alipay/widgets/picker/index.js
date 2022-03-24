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
})
