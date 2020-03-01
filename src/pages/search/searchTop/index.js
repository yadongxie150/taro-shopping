import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'

import './index.scss'

export default class searchTop extends Component {
  render() {
    const {
      value,
      onChange,
      onFocus,
      onSearch,
      onClear,
      showActionButton,
      disabled = false,
      fixed = false,
    } = this.props
    return (
      <View className="searchTop">
        <AtSearchBar
          fixed={fixed}
          disabled={disabled}
          showActionButton={showActionButton}
          placeholder="输入清单/商品名称"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onConfirm={onSearch}
          onActionClick={onSearch}
          onClear={onClear}
        />
      </View>
    )
  }
}
