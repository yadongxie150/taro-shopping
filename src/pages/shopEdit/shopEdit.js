import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtForm, AtInput, AtSwitch, AtTextarea, AtImagePicker } from 'taro-ui'

import './shopEdit.scss'

export default class shopEdit extends Component {
  config = {
    navigationBarTitleText: '编辑清单',
    navigationBarBackgroundColor: '#F0F0F0',
  }

  render() {
    return (
      <View className="shopEdit">
        <AtForm>
          <AtInput clear title="名称" placeholder="请输入名称" />
          封面 <AtImagePicker />
          <AtSwitch title="公开清单" />
          介绍 <AtTextarea />
        </AtForm>

        <View>
          <View>名称 input</View>
          <View>封面 image upload</View>
          <View>公开清单 radio</View>
          <View>权限管理：shopPermission</View>
        </View>
        <View>清单标签 tag + shopTag</View>
        <View>介绍： textarea</View>
      </View>
    )
  }
}
