import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import GoodsListItem from './GoodsListItem'
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
      const element = {name: '1212'}
      list.push(element)
    }
    return (
      <View className="home-recommend">
        {
          list.map((item, index) => (<GoodsListItem onClick={() => this.handleClick(item, index)} />))
        }
      </View>
    )
  }
}

export default Recommend
