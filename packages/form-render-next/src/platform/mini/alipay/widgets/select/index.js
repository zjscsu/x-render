import getFormRenderMixin from '../../render/mixin'
import form from 'antd-mini/es/mixins/form';

Component({
  data: {
    items: []
  },
  props: {},
  mixins: [form(), getFormRenderMixin()],



  didMount() {
    this.setItems(this.props.data);
  },

  didUpdate(prevProps, prevData) {
    if ( prevProps.data !== this.props.data) {
      this.setItems(this.props.data);
    }
  },

  methods: {
    setItems(data) {
      const items = [];
      const enums = this.props.data.field.schema.enum;
      const enumNames = this.props.data.field.schema.enumNames;

      if (enumNames.length === undefined || enums.length === undefined) {
        console.error('schema 有问题')
      } else {
        enumNames.forEach( (name, index)=> {
          items.push({
            text: name,
            value: enums[index],
          })
        });
      }

      this.setData ({
        items,
      });
    },
  }
});

