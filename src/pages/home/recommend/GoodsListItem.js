import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './GoodsListItem.scss'

const data = {
  title: '清单名称',
  des: '清单描述当时发生的范德萨发',
  content: {
    goods: 12,
    collect: 14,
    discount: 114,
  },
  author: '爵士舞',
}

function GoodsListItem() {
  const {
    title,
    des,
    content: { goods, collect, discount },
    author,
  } = data
  return (
    <View className="GoodsListItem">
      <View className="GoodsListItem-left">
        <Text>image</Text>
      </View>
      <View className="GoodsListItem-right">
        <View className="GoodsListItem-right-item">
          <Text className="GoodsListItem-right-title">{title}</Text>
          <Text className="GoodsListItem-right-des">{des}</Text>
        </View>
        <View className="GoodsListItem-right-item">
          <Text className="GoodsListItem-right-content">{goods}件商品 · {collect}人收藏 · 优惠 ¥{discount}</Text>
          <Text className="GoodsListItem-right-author">@{author}</Text>
        </View>
      </View>
    </View>
  )
}

export default GoodsListItem
