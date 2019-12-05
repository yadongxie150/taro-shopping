import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import GoodsListItem from './GoodsListItem'
import './index.scss'

class Recommend extends Component {
  render() {
    return (
      <View className="recommend">
        <GoodsListItem />
        <GoodsListItem />
        <GoodsListItem />
        <GoodsListItem />
        <GoodsListItem />
        <GoodsListItem />
        <GoodsListItem />
        <GoodsListItem />
      </View>
    )
  }
}

export default Recommend
