Page({
  data: {
    componentList: [
      {
        components: [
          {
            type: '基础组件',
            list: [
              {
                name: 'Input',
                nameZN: '输入框',
                path: '/pages/Input/index',
              },
              {
                name: 'Selector',
                nameZN: '选择框',
                path: '/pages/Selector/index',
              },
            ]
          },
        ],
      },
    ],
  },
  onLoad() {
    const { componentList } = this.data;
    const elNodeList = [];
    componentList.forEach((listNode) => {
      listNode.components[0].list.forEach((elNode) => {
        elNodeList.push(elNode);
      });
    });
    this.setData({
      elNodeList,
    });
  },
  onShow() {
    this.setData({
      finding: false,
      searchResult: [],
    });
  },
  onClearSearch() {
    this.setData({
      finding: false,
      searchResult: [],
    });
  },
  onSearch(e) {
    const { elNodeList } = this.data;
    if (e.length > 0) {
      const result = [];
      elNodeList.forEach((searchKey) => {
        if (searchKey.name.toLowerCase().match(e)) {
          result.push(searchKey);
        }
      });
      this.setData({
        finding: true,
        searchResult: result,
      });
    } else {
      this.setData({
        finding: false,
        searchResult: [],
      });
    }
  },
  listPress(e) {
    my.navigateTo({
      url: e.currentTarget.dataset.url,
    });
  },
});
