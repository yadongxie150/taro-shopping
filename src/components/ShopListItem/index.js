import { View, Text } from '@tarojs/components'

import './index.scss'

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

function ShopListItem() {
  const {
    title,
    des,
    content: { goods, collect, discount },
    author,
  } = data
  return (
    <View className="ShopListItem" onClick={this.props.onClick}>
      <View className="ShopListItem-left">
        <Text>image</Text>
      </View>
      <View className="ShopListItem-right">
        <View className="ShopListItem-right-item">
          <Text className="ShopListItem-right-title">{title}</Text>
          <Text className="ShopListItem-right-des">{des}</Text>
        </View>
        <View className="ShopListItem-right-item">
          <Text className="ShopListItem-right-content">
            {goods}件商品 · {collect}人收藏 · 优惠 ¥{discount}
          </Text>
          <Text className="ShopListItem-right-author">@{author}</Text>
        </View>
      </View>
    </View>
  )
}

export default ShopListItem
