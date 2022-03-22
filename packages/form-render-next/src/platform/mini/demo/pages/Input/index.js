Page({
  data: {
    imageUrl: 'https://gw.alipayobjects.com/mdn/rms_226d75/afts/img/A*kmxPTqiUpxsAAAAAAAAAAAAAARQnAQ',
    value: ''
  },

  onChange(v) {
    console.log('input onChange后内容为：', v);
    this.setData({
      value: v
    });
  },

  onClear(v) {
    this.onChange(v);
  }
})
