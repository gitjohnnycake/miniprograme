// components/v-select/v-select.js
Component({
  options: {
    styleIsolation: 'isolated'
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {/* 
    isShow: false,
    choseValue: '',
    current: '智能排序',
    option: [
      {
        "name": "智能排序"
      },
      {
        "name": "距离最近"
      },
      {
        "name": "好评优先"
      },
      {
        "name": "使用最多"
      }
    ] */
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /* openClose() {
      this.setData({
        isShow: !this.data.isShow
      })
      this.triggerEvent('choseValue', [
        "",
        this.data.isShow
      ])
    },
    choseOption(e) {
      this.setData({
        choseValue: e.target.dataset.name,
        current: e.target.dataset.name,
        isShow: false
      })
      this.triggerEvent('choseValue', [
        e.target.dataset.name,
        this.data.isShow
      ])
    } */
  }
})
