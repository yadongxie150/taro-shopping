import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import ShopListItem from '../../../components/ShopListItem'
import './index.scss'

class Recommend extends Component {
  handleClick = (data, index) => {
    console.log(data, index)
    Taro.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${index}`
    })
  }
  render() {
    const list = []
    for (let index = 0; index < 10; index++) {
      const element = { name: '1212' }
      list.push(element)
    }
    return (
      <View className="home-recommend">
        <View className="home-recommend-header">
          <View className="home-recommend-header-item active">推荐</View>
          <View className="home-recommend-header-item">官方</View>
          <View className="home-recommend-header-item">最近</View>
          <View className="home-recommend-header-item">人气</View>
          <View className="fresh">刷新</View>
        </View>
        <View className="home-recommend-body">
          {
            list.map((item, index) => (<ShopListItem onClick={() => this.handleClick(item, index)} />))
          }
        </View>
      </View>
    )
  }
}

export default Recommend
