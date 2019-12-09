import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import Categary from './categary'
import './index.scss'
import '../home.scss'

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
        <View className="home-feature-header-name">
          <Text>精选清单</Text>
        </View>
        <View className="home-feature-header-action">
          <Text>更多</Text>
        </View>
      </View>
      <View className="home-feature-body">
        {
          list.map(item => (
            <Categary />
          ))
        }
      </View>
    </View>
  )
}

export default Feature
