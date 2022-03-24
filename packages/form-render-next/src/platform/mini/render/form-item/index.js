import get from 'lodash/get';
import isFunction from 'lodash/isFunction';

const DisplayTypeEnum = ['column', 'row'];
const DefaultDisplayType = 'row';

Component({
  data: {
    // string('column' / 'row')
    displayType: DefaultDisplayType,
  },
  onInit() {
    const { form, displayType: propsDisplayType } = this.props;
    // displayType 可配置
    const schemaDisplayType = get(
      this.props,
      `proxy.context.artisanSchema.data.${form}.props.displayType`,
      DefaultDisplayType,
    );

    const displayType = propsDisplayType || schemaDisplayType;
    const finalDisplayType =
      DisplayTypeEnum.indexOf(displayType) > -1 ? displayType : DefaultDisplayType;

    this.setData({
      displayType: finalDisplayType,
    });
  },

  methods: {
    onCloseTip() {
      const { __refKey, schema } = this.props.data;
      const { onRemoveFieldTip } = this.props.proxy;
      if (isFunction(onRemoveFieldTip)) {
        onRemoveFieldTip(__refKey, schema);
      }
    },
  },
});
