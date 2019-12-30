import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './goodDetail.scss'

class GoodDetail extends Component {
  config = {
    navigationBarTitleText: '商品详情页',
    navigationBarBackgroundColor: '#F0F0F0',
  }

  componentDidMount() {
    const { id } = this.$router.params
    // todo: 商品详情页
    console.log('商品Id：', id)
  }

  handleCollect = () => {
    console.log('collect')
  }

  handleBuy = e => {
    e.stopPropagation()
    console.log('buy')
  }

  render() {
    return (
      <View className="goodDetail">
        <View className="goodDetail-image">图片</View>
        <View className="goodDetail-content">
          <View className="goodDetail-content-title">标题</View>
          <View className="goodDetail-content-des">
            <View>京东价 ¥168.00</View>
            <View>评论数 15</View>
            <View>好评率 100%</View>
          </View>
          <View className="goodDetail-content-price">
            <View>
              卷后价¥{' '}
              <Text className="goodDetail-content-price-num">68.00</Text>
            </View>
            <View className="goodDetail-content-price-discount">
              优惠卷¥100
            </View>
          </View>
          <View className="goodDetail-content-footer">
            <View>京东商品</View>
            <View>品质保证</View>
            <View>无忧售后</View>
          </View>
        </View>
        <View className="goodDetail-num">商品编号：000000</View>
        <View className="goodDetail-action">
          <View className="goodDetail-action-box">
            <View
              className="goodDetail-action-collect"
              onClick={this.handleCollect}
            >
              收藏到清单
            </View>
            <View className="goodDetail-action-buy" onClick={this.handleBuy}>
              去购买
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default GoodDetail
