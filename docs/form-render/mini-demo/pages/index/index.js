import useForm from '../../../../../packages/form-render-next/lib/core';

Page({
  data: {
    schema: {},
    form: undefined,
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onInit() {},
  onReady() {
    // 页面加载完成

    const mockingSchema = {
      type: 'object',
      properties: {
        input1: {
          title: '简单输入框',
          type: 'string',
          rules: [
            {
              pattern: '^[0-9]+$',
              message: '只允许数字 ',
            },
          ],
        },
        switch_d7W0Ij: {
          title: '开关',
          type: 'boolean',
          widget: 'switch',
          extra: {
            text: '这是一个开关， (额外信息)',
          },
        },

        select1: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          required: true,
        },
        testObj: {
          type: 'object',
          properties: {
            input3: {
              title: '子层级输入框',
              type: 'string',
              disabled: true,
            },
            select4: {
              title: '子层级单选',
              type: 'string',
              enum: ['a', 'b', 'c'],
              enumNames: ['早', '中', '晚'],
            },
          },
        },
        'my-input1': {
          title: '自定义输入组件',
          widget: 'my-input',
          type: 'string',
          rules: [
            {
              pattern: '^[0-9]+$',
              message: '只允许数字 ',
            },
          ],
        },
      },
    };

    const form = useForm({
      useStore: true,
    });

    this.formInstance = form;

    this.setData({
      schema: mockingSchema,
      form: form.id,
      widgets: {
        checkbox: 'checkbox',
        switch: 'switch',
        'my-select': 'my-select',
        'my-input': 'my-input',
      },
    });

    this.setData({
      text: 'tt',
    });
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
    //
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  onSubmit() {
    if (this.formInstance) {
      console.log(this.formInstance);
      this.formInstance
        .submit()
        .then( result => {
          console.log('result ==============');
          console.log(result);
        });
      ;
    }
  }
});
