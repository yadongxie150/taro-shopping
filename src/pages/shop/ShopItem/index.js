import { View, Image } from '@tarojs/components'

import './index.scss'

// function component 必须首字母大写
export default function ShopItem(props) {
  const { data: {name} } = props
  return (
    <View className="shopItem">
      <View className="shopItem-header">
        <View className="shopItem-header-left"></View>
        <View className="shopItem-header-right">
          <View className="shopItem-header-right-title">{name}</View>
          <View className="shopItem-header-right-content">公开 · 14件商品 · 284人收藏</View>
        </View>
      </View>
      <View className="shopItem-body">
        <View className="shopItem-body-item"></View>
        <View className="shopItem-body-item"></View>
        <View className="shopItem-body-item"></View>
        {/* <View className="shopItem-body-item"></View> */}
      </View>
    </View>
  )
}


ShopItem.defaultProps = {
  data: {},
}
