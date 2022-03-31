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
  onReady() {
    // 页面加载完成

    const schema = {
      type: 'object',
      properties: {
        input1: {
          title: '简单输入框',
          type: 'string',
          required: true,
          disabled: true,
          rules: [
            {
              "pattern": "^[0-9]+$",
              "message": "只允许数字 "
            }
          ],
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
              title: '简单输入框',
              type: 'string',
              required: true,
            },
            select4: {
              title: '单选',
              type: 'string',
              enum: ['a', 'b', 'c'],
              enumNames: ['早', '中', '晚'],
            },
          },
        }
      },
    };

    const form = useForm({
      useStore: true,
    });

    this.setData({
      schema,
      form: form.id,
    });

    this.setData({
      text: 'tt'
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
});
