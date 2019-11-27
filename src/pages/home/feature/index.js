import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import Categary from './categary'
import './index.scss'

function Feature() {
  const list = [
    {
      title: '',
      src: '',
    },
    {
      title: '',
      src: '',
    },
    {
      title: '',
      src: '',
    },
  ]
  return (
    <View className="home-feature">
      <View className="home-feature-header">
        <View>
          <Text>精选清单</Text>
        </View>
        <View>
          <Text>更多</Text>
        </View>
      </View>
      <View className="home-feature-body">
        {
          list.map(item => (
            <View>
              <Categary />
            </View>
          ))
        }
      </View>
    </View>
  )
}

export default Feature
