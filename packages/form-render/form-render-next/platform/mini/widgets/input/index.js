Component({
  methods: {
    onInputChange(v) {
      const {
        onChange
      } = this.props;

      onChange && onChange(v);
    },
    onInputClear(v) {
      const {
        onClear
      } = this.props;

      onClear && onClear(v);
    }
  }
})
