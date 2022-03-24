Page({
  data: {
    items1: [{
        text: '选项一',
        value: '1'
      },
      {
        text: '选项二',
        value: '2'
      },
      {
        text: '选项三',
        value: '3'
      }
    ],
    imageUrl: 'https://gw.alipayobjects.com/mdn/rms_226d75/afts/img/A*kmxPTqiUpxsAAAAAAAAAAAAAARQnAQ',
    value: '1',
    multiValue: ['1', '2']
  },
  onChange(v) {
    this.setData({
      value: v
    });
  },
  onMultiChange(v) {
    this.setData({
      multiValue: v
    });
  }
})
