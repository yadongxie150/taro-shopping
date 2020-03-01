import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './shopPermission.scss'

export default class shopPermission extends Component {
  config = {
    navigationBarTitleText: 'shopPermission',
    navigationBarBackgroundColor: '#F0F0F0',
  }

  render() {
    return (
      <View className="shopPermission">
        <View>
          编辑权限
          <View>仅自己</View>
          <View>管理员</View>
          <View>所有人</View>
        </View>
        <View>
          分享权限
          <View>仅自己</View>
          <View>管理员</View>
          <View>所有人</View>
        </View>
        <View>
          管理员
          <View>用户名1</View>
          <View>用户名2</View>
          <View>用户名3</View>
        </View>
      </View>
    )
  }
}
