
Page({
  data: {},
  onLoad(query) {},
  onInit() {},
  onReady() {
    const mockingMeta = {
      children: [
        { data: 'test meta1' },
        { data: 'test meta2' },
        {
          children: [
            { data: 'child test meta1' },
            { data: 'child test meta2' },
            { data: 'child test meta3' },
          ]
        },
        { data: 'test meta3' },
        {
          children: [
            { data: 'child test meta4' },
            { data: 'child test meta5' },
            { data: 'child test meta6' },
          ]
        },
      ]
    };

    this.setData({
      meta: mockingMeta,
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
      title: 'mini demo',
      desc: 'ini demo',
      path: 'pages/tree-view/index',
    };
  },
});
