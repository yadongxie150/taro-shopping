import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

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
        <View>图片</View>
        <View>标题</View>
        <View>价格</View>
        <View>
          <Button>收藏到清单</Button>
          <Button>去购买</Button>
        </View>
      </View>
    )
  }
}

export default GoodDetail
