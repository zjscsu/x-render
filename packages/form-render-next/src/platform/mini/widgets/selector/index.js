Component({
  methods: {
    onSelectorChange(v) {
      const {
        onChange
      } = this.props;
      onChange && onChange(v);
    }
  }
})
