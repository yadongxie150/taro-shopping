import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

import Categary from './categary'
import './index.scss'
import '../home.scss'

function toShopList() {
  console.log('to shop list')
  Taro.navigateTo({
    url: `/pages/shopList/shopList?type=1`,
  })
}

function toShopDetail(id) {
  Taro.navigateTo({
    url: `/pages/shopDetail/shopDetail?id=${id}`,
  })
}

export default function Feature(props) {
  if (props && props.data && !props.data.length) {
    return null
  }

  return (
    <View className="home-feature">
      <View className="home-feature-header">
        <View className="home-feature-header-name">精选清单</View>
        <Button className="home-feature-header-action" onClick={toShopList}>
          更多
        </Button>
      </View>
      <View className="home-feature-body">
        {props.data.map(item => (
          <Categary
            onClick={() => toShopDetail(item.listId)}
            data={item}
            key={item.id}
          />
        ))}
      </View>
    </View>
  )
}

Feature.defaultProps = {
  data: [],
}
