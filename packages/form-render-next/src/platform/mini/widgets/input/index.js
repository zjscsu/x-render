import form from 'antd-mini/es/mixins/form';

Component({
  mixins: [form()],
  methods: {
    onChange(e) {
      console.log('change');

      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }
  }
})
