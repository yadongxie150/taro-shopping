import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './shopTag.scss'

export default class shopTag extends Component {
  config = {
    navigationBarTitleText: 'shopTag',
    navigationBarBackgroundColor: '#F0F0F0',
  }

  render() {
    return (
      <View className='shopTag'>
        <View>目标用户</View>
        <View>时间点</View>
        <View>场景</View>
        <View>其他</View>
      </View>
    )
  }
}
