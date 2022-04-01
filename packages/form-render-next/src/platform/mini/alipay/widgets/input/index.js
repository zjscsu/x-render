import getFormRenderMixin from '../../render/mixin'
import form from 'antd-mini/es/mixins/form';

Component({
  props: {},
  // TODO 对于第三方组件来说， 使用 mixin 将会让第三方组件变得不太纯
  // 粹， mixin 的代码会和第三方组件拥有过多的耦合, 应该考虑换一个方式实现。
  mixins: [form(), getFormRenderMixin()],

  didMount() {},

  methods: {}
});

