import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtSearchBar} from 'taro-ui'

import './index.scss'

export default class searchTop extends Component {
  render() {
    return (
      <View className="searchTop">
        <AtSearchBar onFocus={this.props.onFocus} showActionButton placeholder="输入清单/商品名称" />
      </View>
    )
  }
}
