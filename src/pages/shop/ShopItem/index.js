import { View, Image } from '@tarojs/components'

import './index.scss'

// function component 必须首字母大写
export default function ShopItem(props) {
  const {
    data: { listName, goodCount, avatar },
    onClick,
  } = props
  return (
    <View className="shopItem" onClick={onClick}>
      <View className="shopItem-header">
        <Image className="shopItem-header-left" src={avatar} />
        <View className="shopItem-header-right">
          <View className="shopItem-header-right-title">{listName}</View>
          <View className="shopItem-header-right-content">
            公开 · {goodCount}件商品 · {colectionCount}人收藏
          </View>
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
