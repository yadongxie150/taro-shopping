import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import Categary from './categary'
import './index.scss'
import '../home.scss'

function toShopList() {
  console.log('to shop list')
  Taro.navigateTo({
    url: `/pages/shopList/shopList`,
  })
}

function toShopDetail() {
  console.log('to shop detail')
  Taro.navigateTo({
    url: `/pages/shopDetail/shopDetail`,
  })
}

function Feature() {
  const list = [
    {
      title: '',
      src: 'http://yanxuan.nosdn.127.net/65091eebc48899298171c2eb6696fe27.jpg',
    },
    {
      title: '',
      src: 'http://yanxuan.nosdn.127.net/65091eebc48899298171c2eb6696fe27.jpg',
    },
    {
      title: '',
      src: 'http://yanxuan.nosdn.127.net/65091eebc48899298171c2eb6696fe27.jpg',
    },
  ]

  return (
    <View className="home-feature">
      <View className="home-feature-header">
        <View className="home-feature-header-name">精选清单</View>
        <View className="home-feature-header-action" onClick={toShopList}>更多</View>
      </View>
      <View className="home-feature-body">
        {
          list.map(item => (
            <Categary onClick={toShopDetail} />
          ))
        }
      </View>
    </View>
  )
}

export default Feature
