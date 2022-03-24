var Component = require("../../../../../../../../npm_modules/@ali/dslplus-mini-runtime-my-wx/dist/index.js").Component([[], ["placeholder", "onChange", "onClear"], 1]);

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
});