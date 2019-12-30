import { View, Text } from '@tarojs/components'

import './index.scss'

function ShopListItem(props) {
  const {
    listName,
    listPic,
    listDesc,
    goodCount,
    colectionCount,
    discountMoney,
    nickName,
  } = props.data
  return (
    <View className="ShopListItem" onClick={this.props.onClick}>
      <View className="ShopListItem-left">
        <Image src={listPic} />
      </View>
      <View className="ShopListItem-right">
        <View className="ShopListItem-right-item">
          <Text className="ShopListItem-right-title">{listName}</Text>
          <Text className="ShopListItem-right-des">{listDesc}</Text>
        </View>
        <View className="ShopListItem-right-item">
          <Text className="ShopListItem-right-content">
            {goodCount}件商品 · {colectionCount}人收藏 · 优惠 ¥{discountMoney}
          </Text>
          <Text className="ShopListItem-right-author">@{nickName}</Text>
        </View>
      </View>
    </View>
  )
}

export default ShopListItem

ShopListItem.defaultProps = {
  data: {},
}
