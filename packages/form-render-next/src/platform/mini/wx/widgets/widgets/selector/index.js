var Component = require("../../../../../../../../npm_modules/@ali/dslplus-mini-runtime-my-wx/dist/index.js").Component([[], ["items", "multiple", "title", "value", "onChange"], 4]);

Component({
  methods: {
    onSelectorChange(v) {
      const {
        onChange
      } = this.props;
      onChange && onChange(v);
    }

  }
});