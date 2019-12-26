import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'

import './index.scss'

export default class searchTop extends Component {
  render() {
    const { value, onChange, onFocus, onSearch } = this.props
    return (
      <View className="searchTop">
        <AtSearchBar
          showActionButton
          placeholder="输入清单/商品名称"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onActionClick={onSearch}
        />
      </View>
    )
  }
}
