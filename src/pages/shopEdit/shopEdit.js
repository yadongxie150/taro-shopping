import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Textarea, Switch } from '@tarojs/components'

import './shopEdit.scss'

export default class shopEdit extends Component {
  config = {
    navigationBarTitleText: '编辑清单',
    navigationBarBackgroundColor: '#F0F0F0',
  }

  render() {
    return (
      <View className="shopEdit fontsize-24">
        <View className="shopEdit-top">
          <View className="shopEdit-top-item">
            <Text className="label">名称</Text>
            <Input placeholder="请输入清单名称" />
          </View>
          <View className="shopEdit-top-item">
            <Text>封面</Text>
            <Input placeholder="请选择清单封面" />
          </View>
          <View className="shopEdit-top-item">
            <View>
              <View>公开清单</View>
              <View className="des">非公开清单仅自己可见</View>
            </View>
            <Switch />
          </View>
          <View className="shopEdit-top-item">
            <Text>权限管理</Text>
          </View>
        </View>
        <View className="shopEdit-middle">清单标签</View>
        <View className="shopEdit-bottom">
          <View className="label">介绍</View>
          <Textarea className="textarea" placeholder="对清单进行描述" />
        </View>
      </View>
    )
  }
}
