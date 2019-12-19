import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {AtButton} from 'taro-ui'

import { add } from '../../actions/counter'

import './goodDetail.scss'

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  }
}))
class GoodDetail extends Component {

  config = {
    navigationBarTitleText: '商品详情页',
    navigationBarBackgroundColor: '#F0F0F0',
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='goodDetail'>
        <View className="goodDetail-image">图片</View>
        <View className="goodDetail-content">
          <View className="goodDetail-content-title">标题dsfsdfdsf</View>
          <View className="goodDetail-content-des">
            <View>京东价 ¥168.00</View>
            <View>评论数 15</View>
            <View>好评率 100%</View>
          </View>
          <View className="goodDetail-content-price">
            <View>卷后价 ¥68.00</View>
            <View>优惠卷 ¥100</View>
          </View>
          <View className="goodDetail-content-footer">
            <View>京东商品</View>
            <View>品质保证</View>
            <View>无忧售后</View>
          </View>
        </View>
        <View className="goodDetail-num">商品编号：000000</View>
        <View className="goodDetail-action">
          <View className="goodDetail-action-collect">收藏到清单</View>
          <View className="goodDetail-action-buy">去购买</View>
        </View>
      </View>
    )
  }
}

export default GoodDetail
